/**
 * Persistance Firestore des audits soumis sur noecalmes.fr/audit-app.
 *
 * Strategie :
 *  - un seul document est cree apres le verdict IA reussi
 *  - Nowork ne lit donc que des audits finalises (`status=completed`)
 *
 * Toute la lecture/ecriture passe par l'Admin SDK -> regles cote client 100%
 * fermees (cf. firestore.rules).
 */

import { getApps, initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import * as logger from "firebase-functions/logger";

import { Branch, BudgetTag, VerdictBody } from "./types";

if (getApps().length === 0) {
  initializeApp();
}

const db = getFirestore();
const COLLECTION = "audits";
type LeadTemperature = "hot" | "warm" | "cold" | "unknown";

function computeLeadTemperature(input: {
  projectStageAnswer?: string | null;
  q4Answer?: string | null;
}): LeadTemperature {
  const stage = (input.projectStageAnswer || "").toLowerCase();
  const budget = (input.q4Answer || "").toLowerCase();

  const budgetOut =
    budget.includes("inférieur") ||
    budget.includes("moins de 3") ||
    budget.includes("moins de 3500");

  if (budgetOut) return "cold";
  if (stage.includes("prêt") || stage.includes("pret")) return "hot";
  if (stage.includes("financement")) return "warm";
  if (stage.includes("budget") && stage.includes("estimer")) return "warm";
  if (stage.includes("valider") || stage.includes("fonctionner")) return "cold";
  if (budget.includes("12 000") || budget.includes("7 500") || budget.includes("3 500")) return "warm";
  return "unknown";
}

export interface PendingAuditPayload {
  firstName: string;
  sessionId: string | null;
  ideaText: string;
  appType: string | null;
  projectStageAnswer: string;
  knownCompetitors: string | null;
  q1Answer: string;
  q2Answer: string;
  q3Answer: string;
  q4Answer: string;
  attachment: {
    hasAttachment: boolean;
    extractedChars: number;
  } | null;
}

export interface RequestMeta {
  userAgent: string | null;
  origin: string | null;
}

export interface CompletedAuditPayload {
  verdict: VerdictBody;
  branch: Branch;
  budgetTag: BudgetTag | null;
  aiProvider: string;
  startedAtMs: number;
}

export async function createCompletedAudit(
  payload: PendingAuditPayload,
  meta: RequestMeta,
  data: CompletedAuditPayload
): Promise<string> {
  const doc = {
    ...payload,
    verdict: data.verdict,
    branch: data.branch,
    budgetTag: data.budgetTag,
    leadTemperature: computeLeadTemperature(payload),
    aiProvider: data.aiProvider,
    status: "completed",
    errorMessage: null,
    createdAt: FieldValue.serverTimestamp(),
    submittedAt: FieldValue.serverTimestamp(),
    completedAt: FieldValue.serverTimestamp(),
    durationMs: Date.now() - data.startedAtMs,
    userAgent: meta.userAgent,
    origin: meta.origin,
    schemaVersion: 1,
  };

  const ref = await db.collection(COLLECTION).add(doc);
  return ref.id;
}

// ============ PARTIAL AUDITS (capture des abandons) ============

export interface PartialAuditPayload {
  sessionId: string;
  firstName: string;
  stepIndex: number;
  totalSteps: number;
  appType: string | null;
  projectStageAnswer: string;
  ideaText: string;
  knownCompetitors: string | null;
  q1Answer: string;
  q2Answer: string;
  q3Answer: string;
  q4Answer: string;
  hasAttachment: boolean;
  userAgent: string | null;
  origin: string | null;
}

/**
 * Upsert d'un audit "partiel" (l'utilisateur a entré au moins son prénom
 * mais n'a pas encore soumis le formulaire). Identifié par sessionId
 * généré côté client (nanoid en localStorage).
 *
 * Premier appel  → CREATE  : status='partial', createdAt = now
 * Appels suivants → UPDATE : maj du stepIndex et des réponses, updatedAt
 *
 * Si l'utilisateur termine, /verdictWeb crée un AUTRE doc (avec auto-id).
 * On ne fusionne PAS les deux : les partiels servent à voir le funnel
 * d'abandons, les complétés sont les vrais leads.
 *
 * ID du document : `partial_${sessionId}` (pour éviter toute collision
 * théorique avec les auto-IDs des audits complétés).
 */
export async function upsertPartialAudit(
  payload: PartialAuditPayload,
): Promise<void> {
  const docId = `partial_${payload.sessionId}`;
  const ref = db.collection(COLLECTION).doc(docId);
  const snap = await ref.get();

  // Garde-fou anti-race-condition : un POST /auditPartial en keepalive peut
  // arriver apres la soumission finale. Dans ce cas, on ne doit jamais
  // repasser un audit pending/completed/failed en partial.
  if (snap.exists) {
    const currentStatus = snap.get("status");
    if (currentStatus && currentStatus !== "partial") return;
  }

  const base = {
    sessionId: payload.sessionId,
    firstName: payload.firstName,
    stepIndex: payload.stepIndex,
    totalSteps: payload.totalSteps,
    appType: payload.appType,
    projectStageAnswer: payload.projectStageAnswer,
    ideaText: payload.ideaText,
    knownCompetitors: payload.knownCompetitors,
    q1Answer: payload.q1Answer,
    q2Answer: payload.q2Answer,
    q3Answer: payload.q3Answer,
    q4Answer: payload.q4Answer,
    hasAttachment: payload.hasAttachment,
    userAgent: payload.userAgent,
    origin: payload.origin,
    status: "partial",
    verdict: null,
    branch: null,
    budgetTag: null,
    leadTemperature: computeLeadTemperature(payload),
    aiProvider: null,
    errorMessage: null,
    schemaVersion: 1,
  };
  if (snap.exists) {
    await ref.update({ ...base, updatedAt: FieldValue.serverTimestamp() });
  } else {
    await ref.set({
      ...base,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      completedAt: null,
      durationMs: null,
      attachment: payload.hasAttachment
        ? { hasAttachment: true, extractedChars: 0 }
        : null,
    });
  }
}

/**
 * Wrapper safe : on ne fait JAMAIS planter la requete HTTP a cause de
 * Firestore. La priorite c'est de renvoyer le verdict au client.
 */
export async function safeFirestore<T>(
  label: string,
  op: () => Promise<T>
): Promise<T | null> {
  try {
    return await op();
  } catch (err) {
    logger.error(`Firestore ${label} failed`, {
      error: err instanceof Error ? err.message : String(err),
    });
    return null;
  }
}
