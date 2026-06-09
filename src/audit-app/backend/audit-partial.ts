/**
 * Endpoint Firebase /auditPartial — capture les audits "abandonnés".
 *
 * Logique :
 *   - L'utilisateur entre son prénom + commence le formulaire
 *   - À chaque transition d'étape, le frontend POST ici un snapshot
 *   - On upsert dans Firestore un document avec status='partial'
 *   - Si l'utilisateur termine, le flow `/verdictWeb` prend le relais
 *     et écrit un AUTRE document avec status='completed' (les 2 sont
 *     distincts, identifiés par sessionId vs auto-id)
 *
 * Garde-fou : on REFUSE si firstName est vide ou trop court. La capture
 * ne démarre que quand l'utilisateur a explicitement donné son prénom
 * (RGPD-friendly : il a manifesté son intention de continuer).
 *
 * Coût : 1 write Firestore par étape franchie (5-6 max par session).
 * Sur le free tier (20k writes/jour), tolère des centaines d'audits/jour.
 */

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { z } from "zod";

import {
  safeFirestore,
  upsertPartialAudit,
} from "./firestore";

// ============ CORS ALLOWLIST (mêmes origines que /verdictWeb) ============

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

function isAllowedCorsOrigin(origin: string): boolean {
  return ALLOWED_ORIGINS.has(origin);
}

// ============ SCHEMA DE VALIDATION ============

const PartialAuditSchema = z.object({
  sessionId: z.string().min(8).max(40),
  firstName: z.string().min(2).max(80),
  stepIndex: z.number().int().min(0).max(20),
  totalSteps: z.number().int().min(1).max(20),
  appType: z.string().max(120).optional().default(""),
  ideaText: z.string().max(160000).optional().default(""),
  knownCompetitors: z.string().max(2000).optional().nullable(),
  q1Answer: z.string().max(8000).optional().default(""),
  q2Answer: z.string().max(8000).optional().default(""),
  q3Answer: z.string().max(8000).optional().default(""),
  q4Answer: z.string().max(8000).optional().default(""),
  hasAttachment: z.boolean().optional().default(false),
});

type PartialAuditInput = z.infer<typeof PartialAuditSchema>;

// ============ RATE LIMIT (en memoire, partagé par instance) ============
//
// Plus permissif que /verdictWeb car appelé sur chaque étape — on autorise
// 30 saves/IP/10min (couvre largement un utilisateur qui hésite, navigue
// entre étapes, etc.).

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 30;
const rateMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): { ok: boolean } {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true };
  }
  if (entry.count >= RATE_LIMIT_MAX) return { ok: false };
  entry.count += 1;
  return { ok: true };
}

// ============ ENDPOINT ============

export const auditPartial = onRequest(
  {
    region: "europe-west1",
    cors: false,
    memory: "256MiB",
    timeoutSeconds: 30,
    maxInstances: 10,
  },
  async (req, res): Promise<void> => {
    const origin = req.header("origin") || "";
    const isAllowedOrigin = isAllowedCorsOrigin(origin);

    if (req.method === "OPTIONS") {
      if (isAllowedOrigin) {
        res.set("Access-Control-Allow-Origin", origin);
        res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.set("Access-Control-Allow-Headers", "Content-Type");
        res.set("Access-Control-Max-Age", "3600");
      }
      res.status(204).send("");
      return;
    }

    if (!isAllowedOrigin) {
      res.status(403).json({ error: "Forbidden origin" });
      return;
    }
    res.set("Access-Control-Allow-Origin", origin);
    res.set("Vary", "Origin");

    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const ip =
      (req.header("x-forwarded-for") || "").split(",")[0].trim() ||
      req.ip ||
      "unknown";

    if (!checkRateLimit(ip).ok) {
      res.status(429).json({ error: "Rate limit" });
      return;
    }

    const parsed = PartialAuditSchema.safeParse(req.body);
    if (!parsed.success) {
      // On répond 400 mais on ne log pas trop pour éviter de polluer les logs
      // (le frontend peut envoyer prématurément, c'est OK de rejeter en silence).
      res.status(400).json({ error: "Invalid input" });
      return;
    }

    const data: PartialAuditInput = parsed.data;

    const result = await safeFirestore("upsertPartialAudit", () =>
      upsertPartialAudit({
        sessionId: data.sessionId,
        firstName: data.firstName,
        stepIndex: data.stepIndex,
        totalSteps: data.totalSteps,
        appType: data.appType || null,
        ideaText: data.ideaText,
        knownCompetitors: data.knownCompetitors ?? null,
        q1Answer: data.q1Answer,
        q2Answer: data.q2Answer,
        q3Answer: data.q3Answer,
        q4Answer: data.q4Answer,
        hasAttachment: data.hasAttachment,
        userAgent: req.header("user-agent") || null,
        origin,
      }),
    );

    if (result === null) {
      // Firestore a échoué — pas grave côté utilisateur, on renvoie 200
      // pour ne pas casser l'expérience. L'erreur est loggée côté serveur.
      logger.warn("auditPartial : Firestore write failed (ignored client-side)");
    }

    res.status(200).json({ ok: true });
  },
);
