/**
 * Endpoint Firebase /verdictWeb — appele depuis noecalmes.fr/audit-app.
 *
 * Protections :
 *  - CORS active uniquement pour les origines de l'allowlist (noecalmes.fr + dev local)
 *  - Pas de secret webhook (impossible a cacher dans un navigateur)
 *  - Rate limit basique en memoire : 5 requetes / IP / 10 min
 *
 * Retourne un VerdictResponse (JSON enrichi consomme par la UI).
 */

import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import * as logger from "firebase-functions/logger";

import {
  VerdictRequest,
  VerdictRequestSchema,
} from "./types";
import { generateVerdict } from "./orchestrator";
import {
  createCompletedAudit,
  safeFirestore,
} from "./firestore";

// Cascade IA : Gemini Pro -> Gemini Flash -> Groq -> OpenAI -> Anthropic
//
// GEMINI_API_KEY et GROQ_API_KEY sont configures (gratuits).
// OpenAI/Anthropic restent optionnels (payants).
const GEMINI_API_KEY = defineSecret("GEMINI_API_KEY");
const GROQ_API_KEY = defineSecret("GROQ_API_KEY");
// const OPENAI_API_KEY = defineSecret("OPENAI_API_KEY");
// const ANTHROPIC_API_KEY = defineSecret("ANTHROPIC_API_KEY");

// ============ CORS ALLOWLIST ============

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

// ============ RATE LIMIT (en memoire) ============

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): { ok: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true };
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return { ok: false, retryAfterSec: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count += 1;
  return { ok: true };
}

// ============ ENDPOINT ============

export const verdictWeb = onRequest(
  {
    region: "europe-west1",
    secrets: [GEMINI_API_KEY, GROQ_API_KEY],
    cors: false,
    memory: "256MiB",
    timeoutSeconds: 120,
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
      logger.warn("verdictWeb : origin rejetee", { origin });
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
    const limit = checkRateLimit(ip);
    if (!limit.ok) {
      logger.warn("verdictWeb : rate limit hit", { ip });
      res.set("Retry-After", String(limit.retryAfterSec ?? 60));
      res.status(429).json({
        error: "Trop de requetes. Reessayez plus tard.",
        retry_after_sec: limit.retryAfterSec,
      });
      return;
    }

    const parsed = VerdictRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      logger.warn("verdictWeb : invalid input", { errors: parsed.error.errors });
      res.status(400).json({
        error: "Invalid input",
        details: parsed.error.errors,
      });
      return;
    }

    const startedAtMs = Date.now();
    const attachedContent = parsed.data.attached_content || "";
    const hasAttachment = attachedContent.length > 0;
    const requestMeta = {
      userAgent: req.header("user-agent") || null,
      origin: origin || null,
    };

    try {
      // Injection du document joint dans idea_text si present.
      // Plafonds genereux : Gemini Pro accepte 2M tokens (~8M chars), on
      // est largement sous la capacite. Le filtre serveur protege juste
      // contre l'abus.
      const enrichedIdea = hasAttachment
        ? `${parsed.data.idea_text}\n\n--- DOCUMENT JOINT ---\n${attachedContent.slice(0, 140000)}`
        : parsed.data.idea_text;

      const input: VerdictRequest = {
        ...parsed.data,
        idea_text: enrichedIdea.slice(0, 160000),
        attached_content: "", // deja injecte dans idea_text
        free_text_budget: true,
      };

      const { response: verdictResp, aiProvider } = await generateVerdict(
        {
          geminiApiKey: safeRead(GEMINI_API_KEY),
          groqApiKey: safeRead(GROQ_API_KEY),
          // openaiApiKey: safeRead(OPENAI_API_KEY),
          // anthropicApiKey: safeRead(ANTHROPIC_API_KEY),
        },
        input
      );

      const auditId = await safeFirestore("createCompletedAudit", () =>
        createCompletedAudit(
          {
            firstName: parsed.data.first_name,
            sessionId: parsed.data.session_id ?? null,
            ideaText: parsed.data.idea_text,
            appType: parsed.data.app_type || null,
            knownCompetitors: parsed.data.known_competitors || null,
            q1Answer: parsed.data.q1_answer,
            q2Answer: parsed.data.q2_answer,
            q3Answer: parsed.data.q3_answer,
            q4Answer: parsed.data.q4_answer,
            attachment: hasAttachment
              ? { hasAttachment: true, extractedChars: attachedContent.length }
              : null,
          },
          requestMeta,
          {
            verdict: verdictResp,
            branch: verdictResp.branch,
            budgetTag: verdictResp.budget_tag ?? null,
            aiProvider,
            startedAtMs,
          }
        )
      );

      logger.info("verdictWeb : verdict retourne", {
        first_name: parsed.data.first_name,
        budget_tag: verdictResp.budget_tag,
        branch: verdictResp.branch,
        ai_provider: aiProvider,
        audit_id: auditId,
        has_attachment: hasAttachment,
        concurrents_count: verdictResp.concurrents.length,
        ip,
      });

      res.status(200).json(verdictResp);
    } catch (err) {
      logger.error("verdictWeb : erreur inattendue", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

function safeRead(secret: ReturnType<typeof defineSecret>): string | undefined {
  try {
    const v = secret.value();
    return v && v.trim().length > 0 ? v : undefined;
  } catch {
    return undefined;
  }
}
