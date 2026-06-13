/**
 * Types et schemas Zod — dedie a /verdictWeb.
 *
 * V3 (refonte JSON enrichi multi-sections) :
 *  - Le verdict n'est plus 3 gros paragraphes mais un objet structure
 *    (pitch, concurrents[], plan_action[], prix, delai, etc.)
 *  - Le frontend rend chaque champ comme une section/card distincte
 *  - Le LLM doit produire ce JSON strictement
 */

import { z } from "zod";

// ===== Tags =====

export const BudgetTagSchema = z.enum(["HIGH", "MID", "LOW", "OUT"]);
export const BranchSchema = z.enum(["A", "C"]);

export type BudgetTag = z.infer<typeof BudgetTagSchema>;
export type Branch = z.infer<typeof BranchSchema>;

// ===== /verdictWeb input =====

export const VerdictRequestSchema = z.object({
  first_name: z.string().min(1).max(50),
  // Identifiant de session genere cote navigateur. Permet de transformer
  // le doc partiel `partial_{sessionId}` en audit completed au lieu de
  // creer un doublon "abandonné" + "complété".
  session_id: z.string().min(8).max(80).optional(),
  // Type d'app choisi par le prospect : "Une application mobile." / "...web." / "...mobile et web."
  app_type: z.string().max(120).default(""),
  budget_tag: BudgetTagSchema.optional(),
  q1_answer: z.string().max(500).default(""),
  q2_answer: z.string().max(500).default(""),
  q3_answer: z.string().max(500).default(""),
  q4_answer: z.string().max(500).default(""),
  project_stage_answer: z.string().max(500).default(""),
  // Plafond 12000 chars (~2000 mots) — descriptions tres detaillees,
  // pastes de paragraphes, dictee vocale longue.
  idea_text: z.string().max(12000).default(""),
  // Concurrents que le prospect connait (passe brut au LLM)
  known_competitors: z.string().max(800).default(""),
  // Texte extrait des fichiers joints (cumul, si multi-fichiers cote front).
  // Plafond 150000 chars (~25000 mots) — un brief complet de 50+ pages.
  // Largement sous la capacite LLM (Gemini Pro accepte 2M tokens).
  attached_content: z.string().max(150000).default(""),
  subscriber_id: z.string().optional(),
  free_text_budget: z.boolean().optional(),
});

export type VerdictRequest = z.infer<typeof VerdictRequestSchema>;

// ===== /verdictWeb output (V3) =====

/**
 * Un concurrent analyse dans le verdict.
 * 4 dimensions OBLIGATOIRES pour apporter de la valeur :
 *  - positionnement : ce que fait l'app en 1 phrase
 *  - force : pourquoi elle gagne
 *  - faille : sa vulnerabilite / ce qu'elle ne sert pas
 *  - votre_angle : comment le prospect peut s'engouffrer dans la faille
 */
export interface VerdictCompetitor {
  nom: string;
  positionnement: string;
  force: string;
  faille: string;
  votre_angle: string;
}

/**
 * Verdict V3 — toutes les sections que le LLM peut renvoyer.
 *
 * Adaptation aux cas (definie dans le prompt) :
 *  - Cas 1 (idee precise) : tous les champs remplis
 *  - Cas 2 (idee partielle) : ce_qui_manque non vide, concurrents possible
 *  - Cas 3 (idee vague) : concurrents/differenciation = [], ce_qui_manque rempli
 *  - Branch C (budget OUT) : prix_indicatif = null, plan_action minimal
 */
export interface VerdictBody {
  // Bandeau pro tout en haut du verdict — 1 phrase courte
  pincettes_disclaimer: string;

  // "Si je comprends bien, votre app vise X pour Y..." — 1 a 3 phrases
  pitch_reformule: string;

  // Bullets — points forts identifies dans les reponses
  ce_qui_est_solide: string[];

  // Bullets — infos manquantes pour aller plus loin (vide en Cas 1)
  ce_qui_manque: string[];

  // 0 a 4 concurrents nommes, vide si verticale non identifiable (Cas 3)
  concurrents: VerdictCompetitor[];

  // Bullets — angles ou le prospect peut se differencier
  differenciation: string[];

  // 1 phrase — le defi specifique au cas du prospect
  defi_principal: string;

  // 3 a 5 bullets — actions ultra-specifiques (pas de generique)
  plan_action: string[];

  // Texte libre, ex "7 000 a 13 000 EUR" OU "Pas chiffrable sur 5 questions"
  // null pour la branche C (budget OUT)
  prix_indicatif: string | null;

  // Texte libre, ex "6 a 10 semaines"
  delai_indicatif: string;

  // Texte du bloc d'invitation final (different selon branch A/C)
  cta_message: string;
}

// Sortie complete renvoyee par l'API
export interface VerdictResponse extends VerdictBody {
  branch: Branch;
  budget_tag?: BudgetTag;
}

// ===== AI Provider abstraction =====

export interface VerdictGenerated extends VerdictBody {
  budget_tag?: BudgetTag;
}

export interface AIProvider {
  name: string;
  generate(input: VerdictRequest, branch: Branch): Promise<VerdictGenerated>;
}

export interface AIConfig {
  // Gemini : couvre Gemini 2.5 Pro (qualite max) + Flash (fallback)
  geminiApiKey?: string;
  // Groq : Llama 3.3 70B, gratuit ~14400 req/jour, OpenAI-compatible
  groqApiKey?: string;
  // Optionnels payants — gardes pour quand tu auras les cles
  openaiApiKey?: string;
  anthropicApiKey?: string;
}
