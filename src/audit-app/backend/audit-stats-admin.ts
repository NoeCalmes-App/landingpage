/**
 * Endpoint admin /auditStatsAdmin.
 *
 * Le backend audit ecrit dans le projet Firebase `manychatia-82692`, alors
 * que Nowork est authentifie sur le projet historique `devis-app-8e216`. Cette function sert
 * de pont securise : elle lit les audits via Admin SDK, mais renvoie les
 * donnees uniquement si l'appelant fournit un ID token Firebase valide du
 * Nowork.
 */

import { getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

if (getApps().length === 0) {
  initializeApp();
}

const db = getFirestore();
const COLLECTION = "audits";
const NOWORK_FIREBASE_PROJECT_ID = "devis-app-8e216";
const NOWORK_AUTH_APP_NAME = "nowork-auth";

const ALLOWED_ORIGINS = new Set<string>([
  "https://noecalmes.fr",
  "https://www.noecalmes.fr",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:4173",
  "http://localhost:4174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:5175",
]);

type AuditStatus = "pending" | "completed" | "failed" | "partial";
type AuditBranch = "A" | "B" | "C" | "unknown";

function noworkAuthApp() {
  return (
    getApps().find((app) => app.name === NOWORK_AUTH_APP_NAME) ||
    initializeApp({ projectId: NOWORK_FIREBASE_PROJECT_ID }, NOWORK_AUTH_APP_NAME)
  );
}

function isAllowedCorsOrigin(origin: string): boolean {
  return ALLOWED_ORIGINS.has(origin);
}

function setCors(res: { set(name: string, value: string): void }, origin: string) {
  res.set("Access-Control-Allow-Origin", origin);
  res.set("Vary", "Origin");
}

function timestampToIso(value: unknown): string | null {
  if (!value) return null;
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (
    typeof value === "object" &&
    value !== null &&
    typeof (value as { toDate?: unknown }).toDate === "function"
  ) {
    return (value as { toDate: () => Date }).toDate().toISOString();
  }
  return null;
}

function normalizeStatus(value: unknown): AuditStatus {
  if (value === "completed" || value === "failed" || value === "partial" || value === "pending") {
    return value;
  }
  return "pending";
}

function normalizeBranch(value: unknown): AuditBranch {
  if (value === "A" || value === "B" || value === "C") return value;
  return "unknown";
}

function dateKey(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function readMax(raw: unknown): number {
  const n = Number(raw);
  if (!Number.isFinite(n)) return 200;
  return Math.min(Math.max(Math.round(n), 20), 500);
}

function publicAudit(id: string, data: FirebaseFirestore.DocumentData) {
  return {
    id,
    firstName: data.firstName || "",
    sessionId: data.sessionId || null,
    appType: data.appType || null,
    ideaText: data.ideaText || "",
    projectStageAnswer: data.projectStageAnswer || "",
    knownCompetitors: data.knownCompetitors || null,
    q1Answer: data.q1Answer || "",
    q2Answer: data.q2Answer || "",
    q3Answer: data.q3Answer || "",
    q4Answer: data.q4Answer || "",
    attachment: data.attachment || (data.hasAttachment ? { hasAttachment: true, extractedChars: 0 } : null),
    verdict: data.verdict || null,
    branch: data.branch || null,
    budgetTag: data.budgetTag || null,
    leadTemperature: data.leadTemperature || null,
    aiProvider: data.aiProvider || null,
    status: normalizeStatus(data.status),
    errorMessage: data.errorMessage || null,
    createdAt: timestampToIso(data.createdAt),
    submittedAt: timestampToIso(data.submittedAt),
    completedAt: timestampToIso(data.completedAt),
    updatedAt: timestampToIso(data.updatedAt),
    durationMs: typeof data.durationMs === "number" ? data.durationMs : null,
    userAgent: data.userAgent || null,
    origin: data.origin || null,
    schemaVersion: typeof data.schemaVersion === "number" ? data.schemaVersion : 1,
    stepIndex: typeof data.stepIndex === "number" ? data.stepIndex : null,
    totalSteps: typeof data.totalSteps === "number" ? data.totalSteps : null,
  };
}

function buildStats(audits: ReturnType<typeof publicAudit>[]) {
  const now = new Date();
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);
  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(startOfWeek.getDate() - 7);
  const startOfMonth = new Date(startOfToday);
  startOfMonth.setDate(startOfMonth.getDate() - 30);

  const daily: Record<string, number> = {};
  for (let i = 29; i >= 0; i--) {
    const d = new Date(startOfToday);
    d.setDate(d.getDate() - i);
    daily[dateKey(d)] = 0;
  }

  const byBranch: Record<AuditBranch, number> = {
    A: 0,
    B: 0,
    C: 0,
    unknown: 0,
  };
  const byProvider: Record<string, number> = {};

  let today = 0;
  let week = 0;
  let month = 0;

  for (const audit of audits) {
    const createdAt = audit.createdAt ? new Date(audit.createdAt) : null;
    if (!createdAt || Number.isNaN(createdAt.getTime())) continue;

    if (createdAt >= startOfToday) today++;
    if (createdAt >= startOfWeek) week++;
    if (createdAt >= startOfMonth) {
      month++;
      const key = dateKey(createdAt);
      if (key in daily) daily[key]++;
    }

    const branch = normalizeBranch(audit.branch);
    byBranch[branch] = (byBranch[branch] ?? 0) + 1;
    const provider = audit.aiProvider || "unknown";
    byProvider[provider] = (byProvider[provider] ?? 0) + 1;
  }

  return {
    allTotal: audits.length,
    allToday: today,
    allWeek: week,
    allMonth: month,
    total: audits.length,
    today,
    week,
    month,
    partialTotal: 0,
    partialToday: 0,
    failedTotal: 0,
    failedToday: 0,
    pendingTotal: 0,
    daily: Object.entries(daily)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date)),
    byStatus: { pending: 0, completed: audits.length, failed: 0, partial: 0 },
    byBranch,
    byProvider,
  };
}

export const auditStatsAdmin = onRequest(
  {
    region: "europe-west1",
    cors: false,
    memory: "256MiB",
    timeoutSeconds: 30,
    maxInstances: 5,
  },
  async (req, res): Promise<void> => {
    const origin = req.header("origin") || "";
    const isAllowedOrigin = isAllowedCorsOrigin(origin);

    if (req.method === "OPTIONS") {
      if (isAllowedOrigin) {
        setCors(res, origin);
        res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
        res.set("Access-Control-Allow-Headers", "Authorization, Content-Type");
        res.set("Access-Control-Max-Age", "3600");
      }
      res.status(204).send("");
      return;
    }

    if (!isAllowedOrigin) {
      res.status(403).json({ error: "Forbidden origin" });
      return;
    }
    setCors(res, origin);

    if (req.method !== "GET") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const authHeader = req.header("authorization") || "";
    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    if (!match) {
      res.status(401).json({ error: "Missing bearer token" });
      return;
    }

    try {
      await getAuth(noworkAuthApp()).verifyIdToken(match[1]);
    } catch (err) {
      logger.warn("auditStatsAdmin : invalid Nowork token", {
        error: err instanceof Error ? err.message : String(err),
      });
      res.status(401).json({ error: "Invalid token" });
      return;
    }

    const max = readMax(req.query.max);
    const snap = await db
      .collection(COLLECTION)
      .orderBy("createdAt", "desc")
      .limit(Math.min(Math.max(max, 300), 1000))
      .get();

    const audits = snap.docs
      .map((doc) => publicAudit(doc.id, doc.data()))
      .filter((audit) => audit.status === "completed")
      .slice(0, max);

    res.status(200).json({
      audits,
      stats: buildStats(audits),
    });
  }
);
