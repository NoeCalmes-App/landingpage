/**
 * Parser commun pour tous les providers IA — V3 JSON enrichi multi-sections.
 *
 * Tolerant aux fences markdown que certains modeles ajoutent malgre les instructions.
 * Defensive : si un champ manque ou est mal type, on remplit avec un fallback safe
 * plutot que de throw — le frontend doit toujours avoir quelque chose a afficher.
 */

import { BudgetTag, VerdictCompetitor, VerdictGenerated } from "../types";

const VALID_BUDGET_TAGS: BudgetTag[] = ["HIGH", "MID", "LOW", "OUT"];

const DEFAULT_PINCETTES =
  "Audit etabli en 2 minutes sur la base de 5 reponses — il sert a poser un cadre, pas a chiffrer precisement votre projet.";

export function parseVerdictJson(raw: string): VerdictGenerated {
  let cleaned = raw.trim();

  // Strip markdown fences si presents
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
    cleaned = cleaned.trim();
  }

  // Extraction du JSON si du texte parasite l'entoure
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace > 0 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    throw new Error(`Failed to parse JSON from provider: ${err}`);
  }

  if (typeof parsed !== "object" || parsed === null) {
    throw new Error("Provider response is not a JSON object");
  }

  const obj = parsed as Record<string, unknown>;

  // Sanitization helpers
  const asString = (v: unknown, max = 1200): string => {
    if (typeof v !== "string") return "";
    return v.trim().slice(0, max);
  };

  const asStringArray = (v: unknown, maxItems = 6, maxLen = 500): string[] => {
    if (!Array.isArray(v)) return [];
    return v
      .filter((x): x is string => typeof x === "string")
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .slice(0, maxItems)
      .map((s) => s.slice(0, maxLen));
  };

  const asCompetitors = (v: unknown): VerdictCompetitor[] => {
    if (!Array.isArray(v)) return [];
    const out: VerdictCompetitor[] = [];
    for (const item of v) {
      if (!item || typeof item !== "object") continue;
      const r = item as Record<string, unknown>;
      const nom = asString(r.nom, 80);
      const positionnement = asString(r.positionnement, 400);
      const force = asString(r.force, 400);
      const faille = asString(r.faille, 400);
      const votre_angle = asString(r.votre_angle, 400);
      // On accepte le concurrent meme si certains champs sont vides — c'est au
      // frontend de masquer les champs vides. Mais si tout est vide, on jette.
      if (nom && (positionnement || force || faille || votre_angle)) {
        out.push({ nom, positionnement, force, faille, votre_angle });
      }
      if (out.length >= 5) break;
    }
    return out;
  };

  // Budget tag (optionnel)
  let budgetTag: BudgetTag | undefined;
  if (typeof obj.budget_tag === "string") {
    const upper = obj.budget_tag.toUpperCase().trim();
    if (VALID_BUDGET_TAGS.includes(upper as BudgetTag)) {
      budgetTag = upper as BudgetTag;
    }
  }

  // prix_indicatif peut etre null (branche C) OU string
  let prixIndicatif: string | null = null;
  if (typeof obj.prix_indicatif === "string") {
    const s = obj.prix_indicatif.trim();
    if (s.length > 0) prixIndicatif = s.slice(0, 600);
  }

  return {
    pincettes_disclaimer: asString(obj.pincettes_disclaimer, 300) || DEFAULT_PINCETTES,
    pitch_reformule: asString(obj.pitch_reformule, 800),
    ce_qui_est_solide: asStringArray(obj.ce_qui_est_solide, 5, 400),
    ce_qui_manque: asStringArray(obj.ce_qui_manque, 5, 400),
    concurrents: asCompetitors(obj.concurrents),
    differenciation: asStringArray(obj.differenciation, 5, 400),
    defi_principal: asString(obj.defi_principal, 500),
    plan_action: asStringArray(obj.plan_action, 8, 500),
    prix_indicatif: prixIndicatif,
    delai_indicatif: asString(obj.delai_indicatif, 400),
    cta_message: asString(obj.cta_message, 800),
    ...(budgetTag ? { budget_tag: budgetTag } : {}),
  };
}
