/**
 * Orchestrateur multi-provider IA pour /verdictWeb.
 *
 * Cascade : Gemini -> OpenAI -> Claude. Si tous echouent, fallback statique
 * (defini en bas de fichier).
 *
 * Chaque provider retourne un VerdictGenerated valide (schema Zod local).
 * L'orchestrateur calcule la branch a partir de budget_tag puis renvoie
 * VerdictResponse.
 */

import * as logger from "firebase-functions/logger";
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";

import {
  AIConfig,
  AIProvider,
  Branch,
  BudgetTag,
  BudgetTagSchema,
  VerdictBody,
  VerdictGenerated,
  VerdictRequest,
  VerdictResponse,
} from "./types";
import { SYSTEM_PROMPT, buildUserPrompt } from "./prompts";

// ============ ZOD SCHEMA LOCAL POUR VALIDATION DU LLM ============

const VerdictGeneratedSchema = z.object({
  pincettes_disclaimer: z.string(),
  pitch_reformule: z.string(),
  ce_qui_est_solide: z.array(z.string()).default([]),
  ce_qui_manque: z.array(z.string()).default([]),
  concurrents: z
    .array(
      z.object({
        nom: z.string(),
        positionnement: z.string(),
        force: z.string(),
        faille: z.string(),
        votre_angle: z.string(),
      })
    )
    .default([]),
  differenciation: z.array(z.string()).default([]),
  defi_principal: z.string().default(""),
  plan_action: z.array(z.string()).default([]),
  prix_indicatif: z.string().nullable().default(null),
  delai_indicatif: z.string().default(""),
  cta_message: z.string(),
  budget_tag: BudgetTagSchema,
});

// ============ BRANCH & FALLBACK (locaux a ce backend) ============

function computeBranch(budget: BudgetTag): Branch {
  return budget === "OUT" ? "C" : "A";
}

const FALLBACK_VERDICTS: Record<Branch, VerdictGenerated> = {
  // TUTOIEMENT, comme le prompt et la landing. Ces textes sont affiches a un
  // vrai prospect quand tous les fournisseurs IA echouent : ils doivent
  // respecter les memes regles que le verdict genere (tu, pas de tiret
  // cadratin, pas de « devis ferme », pas de duree d'appel imposee).
  A: {
    pincettes_disclaimer:
      "Cet audit est généré à partir de 5 questions. Il te donne des repères, mais il ne remplace pas une discussion pour creuser ton cas précis.",
    pitch_reformule:
      "Sur la base des éléments fournis, ton projet mérite d'être creusé. Pour te donner une analyse vraiment personnalisée, j'ai besoin d'échanger directement avec toi.",
    ce_qui_est_solide: [
      "Tu as pris le temps de remplir cet audit, c'est déjà un signal de sérieux.",
    ],
    ce_qui_manque: [
      "Le profil exact de ta cible et son comportement actuel",
      "La mécanique centrale de l'application en une phrase",
      "Tes contraintes business : timing, ressources, équipe",
    ],
    concurrents: [],
    differenciation: [],
    defi_principal:
      "Sans plus de précision sur ton projet, le défi principal à clarifier est : qu'est-ce qui te rend unique par rapport aux acteurs déjà en place ?",
    plan_action: [
      "Cadrer ton projet en détail avec moi",
      "Identifier ta cible exacte et son comportement actuel",
      "Définir la mécanique centrale de la première version",
      "Établir un budget réaliste et un délai cohérent avec tes contraintes",
    ],
    prix_indicatif:
      "Pour une première version sérieuse, compte une estimation large, autour de 6 000 à 10 000 € selon le périmètre. La fourchette est large parce que c'est une estimation sans cadrage précis. Pour un vrai prix et un délai exact, le plus simple, c'est qu'on en parle directement.",
    delai_indicatif:
      "À première vue, compte environ 7 semaines pour construire une version sérieuse. Le délai exact se cale en appel, une fois le périmètre et le niveau de finition clarifiés.",
    cta_message:
      "Avec seulement 5 questions, je peux déjà te donner de bons repères, mais pour un prix fixe et un délai précis, je dois d'abord bien comprendre ton projet. Pour avoir un vrai prix, écris-moi sur WhatsApp : on en parle, puis je te fais un devis avec une maquette de ton app.",
    budget_tag: "MID",
  },
  C: {
    pincettes_disclaimer:
      "Cet audit est généré à partir de 5 questions. Il te donne des repères généraux.",
    pitch_reformule:
      "Sur la base de ce que tu décris, ton projet est dans une phase trop en amont pour que je puisse t'accompagner sérieusement dans son développement.",
    ce_qui_est_solide: [
      "Tu prends le temps de réfléchir avant d'investir, c'est déjà mieux que la majorité des fondateurs.",
    ],
    ce_qui_manque: [],
    concurrents: [],
    differenciation: [],
    defi_principal:
      "Le vrai défi à ton stade : sécuriser un budget réaliste et valider ton idée auprès de ta cible avant tout développement.",
    plan_action: [
      "Continuer à valider ton idée en parlant à 10 personnes minimum de ta cible",
      "Construire une page de présentation simple pour tester la prévente",
      "Stabiliser ton budget pour pouvoir investir sérieusement",
      "Revenir vers moi quand tu es prêt",
    ],
    prix_indicatif: null,
    delai_indicatif: "",
    cta_message:
      "Avec ce budget, c'est encore un peu juste pour faire une application qui tienne la route, et je préfère te le dire franchement. Une app qui doit te rapporter, ce n'est pas que du code : il faut concevoir comment elle transforme tes utilisateurs en clients. Ça demande juste un budget de départ un peu plus solide. Prends le temps de le consolider, et reviens quand c'est prêt, on en parle.",
    budget_tag: "OUT",
  },
};

// ============ PARSING & SANITIZATION ============

function parseVerdictJson(raw: string): VerdictGenerated {
  let cleaned = raw.trim();

  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
    cleaned = cleaned.trim();
  }

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace > 0 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    throw new Error(`JSON parse failed: ${err}`);
  }

  const result = VerdictGeneratedSchema.safeParse(parsed);
  if (!result.success) {
    const issues = result.error.errors
      .slice(0, 3)
      .map((e: z.ZodIssue) => `${e.path.join(".")}: ${e.message}`)
      .join(" | ");
    throw new Error(`Schema invalid: ${issues}`);
  }

  return sanitize(result.data);
}

function sanitize(p: VerdictGenerated): VerdictGenerated {
  const trim = (s: string, max: number): string => s.trim().slice(0, max);
  return {
    pincettes_disclaimer: trim(p.pincettes_disclaimer, 400),
    pitch_reformule: trim(p.pitch_reformule, 800),
    ce_qui_est_solide: p.ce_qui_est_solide
      .map((s: string) => trim(s, 400))
      .slice(0, 5),
    ce_qui_manque: p.ce_qui_manque.map((s: string) => trim(s, 400)).slice(0, 6),
    concurrents: p.concurrents
      .map((c: VerdictBody["concurrents"][number]) => ({
        nom: trim(c.nom, 80),
        positionnement: trim(c.positionnement, 300),
        force: trim(c.force, 300),
        faille: trim(c.faille, 300),
        votre_angle: trim(c.votre_angle, 300),
      }))
      .slice(0, 5),
    differenciation: p.differenciation
      .map((s: string) => trim(s, 400))
      .slice(0, 5),
    defi_principal: trim(p.defi_principal, 800),
    plan_action: p.plan_action.map((s: string) => trim(s, 400)).slice(0, 6),
    prix_indicatif: p.prix_indicatif ? trim(p.prix_indicatif, 800) : null,
    delai_indicatif: trim(p.delai_indicatif, 400),
    cta_message: trim(p.cta_message, 1000),
    budget_tag: p.budget_tag,
  };
}

// ============ PROVIDERS ============

/**
 * Gemini 2.5 PRO — qualite maximale, free tier ~50 req/jour.
 * Thinking ACTIVE pour raisonnement profond sur l'audit business.
 */
class GeminiProProvider implements AIProvider {
  readonly name = "gemini-2.5-pro";
  constructor(private apiKey: string) {}

  async generate(input: VerdictRequest, _branch: Branch): Promise<VerdictGenerated> {
    const genAI = new GoogleGenerativeAI(this.apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-pro",
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 6000,
        responseMimeType: "application/json",
        // Thinking budget modere : permet a Pro de raisonner sur la
        // viabilite business sans exploser la latence.
        // @ts-expect-error - thinkingConfig pas encore type
        thinkingConfig: { thinkingBudget: 2000 },
      },
    });
    const userPrompt = buildUserPrompt(input);
    const result = await model.generateContent(userPrompt);
    const text = result.response.text().trim();
    return parseVerdictJson(text);
  }
}

/**
 * Gemini 2.5 FLASH — fallback rapide quand Pro a epuise son quota journalier.
 * Free tier ~1500 req/jour. Thinking off pour rester veloce.
 */
class GeminiFlashProvider implements AIProvider {
  readonly name = "gemini-2.5-flash";
  constructor(private apiKey: string) {}

  async generate(input: VerdictRequest, _branch: Branch): Promise<VerdictGenerated> {
    const genAI = new GoogleGenerativeAI(this.apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4000,
        responseMimeType: "application/json",
        // @ts-expect-error - thinkingConfig pas encore type
        thinkingConfig: { thinkingBudget: 0 },
      },
    });
    const userPrompt = buildUserPrompt(input);
    const result = await model.generateContent(userPrompt);
    const text = result.response.text().trim();
    return parseVerdictJson(text);
  }
}

/**
 * Groq — Llama 3.3 70B Versatile, free tier ~14400 req/jour, inference la plus
 * rapide du marche (<1s). API OpenAI-compatible.
 */
class GroqProvider implements AIProvider {
  readonly name = "groq-llama-3.3-70b";
  constructor(private apiKey: string) {}

  async generate(input: VerdictRequest, _branch: Branch): Promise<VerdictGenerated> {
    const client = new OpenAI({
      apiKey: this.apiKey,
      baseURL: "https://api.groq.com/openai/v1",
    });
    const userPrompt = buildUserPrompt(input);
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 4000,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
    });
    const text = completion.choices[0]?.message?.content?.trim() || "";
    if (!text) {
      throw new Error("Groq returned empty response");
    }
    return parseVerdictJson(text);
  }
}

/**
 * OpenAI GPT-4o-mini — payant, garde comme option premium.
 */
class OpenAIProvider implements AIProvider {
  readonly name = "openai";
  constructor(private apiKey: string) {}

  async generate(input: VerdictRequest, _branch: Branch): Promise<VerdictGenerated> {
    const openai = new OpenAI({ apiKey: this.apiKey });
    const userPrompt = buildUserPrompt(input);
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 4000,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
    });
    const text = completion.choices[0]?.message?.content?.trim() || "";
    if (!text) {
      throw new Error("OpenAI returned empty response");
    }
    return parseVerdictJson(text);
  }
}

/**
 * Anthropic Claude Haiku — payant, garde comme option premium.
 */
class ClaudeProvider implements AIProvider {
  readonly name = "claude";
  constructor(private apiKey: string) {}

  async generate(input: VerdictRequest, _branch: Branch): Promise<VerdictGenerated> {
    const client = new Anthropic({ apiKey: this.apiKey });
    const userPrompt = buildUserPrompt(input);
    const message = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 4000,
      temperature: 0.7,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });
    const block = message.content[0];
    if (!block || block.type !== "text") {
      throw new Error("Claude returned no text block");
    }
    return parseVerdictJson(block.text.trim());
  }
}

// ============ ORCHESTRATION ============

export interface GenerateVerdictResult {
  response: VerdictResponse;
  aiProvider: string;
}

export async function generateVerdict(
  config: AIConfig,
  input: VerdictRequest
): Promise<GenerateVerdictResult> {
  const providers = buildProviderChain(config);

  if (providers.length === 0) {
    logger.warn("No AI provider configured, returning static fallback");
    const fallback = FALLBACK_VERDICTS.A;
    return {
      response: { ...fallback, branch: computeBranch(fallback.budget_tag ?? "MID") },
      aiProvider: "fallback-static",
    };
  }

  for (const provider of providers) {
    const result = await tryProvider(provider, input);
    if (result) {
      const budget: BudgetTag = result.budget_tag ?? "MID";
      const branch = computeBranch(budget);
      logger.info("Verdict generated", {
        provider: provider.name,
        budget_tag: budget,
        branch,
        first_name: input.first_name,
        concurrents_count: result.concurrents.length,
        plan_action_count: result.plan_action.length,
      });
      return {
        response: { ...result, branch, budget_tag: budget },
        aiProvider: provider.name,
      };
    }
  }

  logger.error("All providers failed, using static fallback", {
    providers_tried: providers.map((p) => p.name),
  });

  const fallbackKey: Branch = guessBudgetIsOut(input) ? "C" : "A";
  const fallback = FALLBACK_VERDICTS[fallbackKey];
  return {
    response: { ...fallback, branch: computeBranch(fallback.budget_tag ?? "MID") },
    aiProvider: "fallback-static",
  };
}

function guessBudgetIsOut(input: VerdictRequest): boolean {
  const q4 = (input.q4_answer || "").toLowerCase();
  if (!q4) return false;
  if (
    q4.includes("moins de 5") ||
    q4.includes("inferieur a 5") ||
    q4.includes("inférieur à 5")
  ) {
    return true;
  }
  const match = q4.match(/(\d{1,2}[ ]?\d{3}|\d{4})/);
  if (match) {
    const n = parseInt(match[0].replace(/\s/g, ""), 10);
    if (!isNaN(n) && n < 5000) return true;
  }
  return false;
}

/**
 * Cascade par puissance decroissante : on tente le plus intelligent d'abord,
 * et si echec (quota epuise, erreur reseau, JSON invalide), on bascule sur
 * le suivant. Garantit qualite maxi + tolerance aux pannes.
 *
 * Ordre :
 *   1. Gemini 2.5 Pro (~50/jour gratuit, qualite premium avec raisonnement)
 *   2. Gemini 2.5 Flash (~1500/jour gratuit, prend le relais de Pro)
 *   3. Groq Llama 3.3 70B (~14400/jour gratuit, ultra-rapide)
 *   4. OpenAI GPT-4o-mini (payant, optionnel)
 *   5. Anthropic Claude Haiku (payant, optionnel)
 */
function buildProviderChain(config: AIConfig): AIProvider[] {
  const chain: AIProvider[] = [];
  if (config.geminiApiKey) {
    chain.push(new GeminiProProvider(config.geminiApiKey));
    chain.push(new GeminiFlashProvider(config.geminiApiKey));
  }
  if (config.groqApiKey) chain.push(new GroqProvider(config.groqApiKey));
  if (config.openaiApiKey) chain.push(new OpenAIProvider(config.openaiApiKey));
  if (config.anthropicApiKey) chain.push(new ClaudeProvider(config.anthropicApiKey));
  return chain;
}

async function tryProvider(
  provider: AIProvider,
  input: VerdictRequest
): Promise<VerdictGenerated | null> {
  const MAX_ATTEMPTS = 1;
  const PROVIDER_TIMEOUT_MS = 25_000;
  const tentativeBranch: Branch = "A";
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const start = Date.now();
      const result = await withTimeout(
        provider.generate(input, tentativeBranch),
        PROVIDER_TIMEOUT_MS,
        provider.name
      );
      logger.info(`Provider ${provider.name} OK`, {
        attempt,
        durationMs: Date.now() - start,
      });
      return result;
    } catch (err) {
      const isLast = attempt === MAX_ATTEMPTS;
      logger.warn(`Provider ${provider.name} echec (${attempt}/${MAX_ATTEMPTS})`, {
        error: err instanceof Error ? err.message : String(err),
        willRetry: !isLast,
      });
      if (isLast) return null;
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  return null;
}

function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  label: string
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new Error(`Provider ${label} timeout after ${ms}ms`));
    }, ms);
  });

  return Promise.race([promise, timeout]).finally(() => {
    if (timer) clearTimeout(timer);
  });
}
