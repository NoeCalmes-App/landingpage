/**
 * Persistance Firestore des audits soumis sur noecalmes.fr/audit-app.
 *
 * Strategie en 2 temps :
 *  1. createPendingAudit() : doc cree avant l'appel IA (status=pending)
 *     -> capture le lead meme si l'IA crashe / rate-limit / panne
 *  2. updateAuditWithVerdict() / markAuditFailed() : enrichi apres
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

export interface PendingAuditPayload {
  firstName: string;
  ideaText: string;
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

export async function createPendingAudit(
  payload: PendingAuditPayload,
  meta: RequestMeta
): Promise<string> {
  const ref = await db.collection(COLLECTION).add({
    ...payload,
    verdict: null,
    branch: null,
    budgetTag: null,
    aiProvider: null,
    status: "pending",
    errorMessage: null,
    createdAt: FieldValue.serverTimestamp(),
    completedAt: null,
    durationMs: null,
    userAgent: meta.userAgent,
    origin: meta.origin,
    schemaVersion: 1,
  });
  return ref.id;
}

export async function updateAuditWithVerdict(
  id: string,
  data: CompletedAuditPayload
): Promise<void> {
  await db.collection(COLLECTION).doc(id).update({
    verdict: data.verdict,
    branch: data.branch,
    budgetTag: data.budgetTag,
    aiProvider: data.aiProvider,
    status: "completed",
    completedAt: FieldValue.serverTimestamp(),
    durationMs: Date.now() - data.startedAtMs,
  });
}

export async function markAuditFailed(
  id: string,
  errorMessage: string,
  startedAtMs: number
): Promise<void> {
  await db.collection(COLLECTION).doc(id).update({
    status: "failed",
    errorMessage: errorMessage.slice(0, 1000),
    completedAt: FieldValue.serverTimestamp(),
    durationMs: Date.now() - startedAtMs,
  });
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
