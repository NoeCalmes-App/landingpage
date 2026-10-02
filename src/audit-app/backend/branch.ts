/**
 * Logique de branchement simplifiee.
 *
 * Regle unique : le budget determine l'eligibilite commerciale.
 * - budget OUT (< 5000 EUR) -> branche C : pas de push fort, message franc
 * - tout le reste -> branche A : WhatsApp principal, Calendly secondaire
 *
 * V3 : les FALLBACK_VERDICTS retournent le nouveau schema enrichi
 * (utilises si TOUS les providers IA echouent — cas extreme).
 */

import { Branch, BudgetTag, VerdictBody } from "./types";

export function computeBranch(budget: BudgetTag): Branch {
  return budget === "OUT" ? "C" : "A";
}

const PINCETTES =
  "Audit établi en 2 minutes sur la base de 5 réponses. Il sert à poser un cadre, pas à chiffrer précisément ton projet.";

export const FALLBACK_VERDICTS: Record<Branch, VerdictBody> = {
  // Memes regles que le verdict genere : tutoiement, pas de tiret cadratin,
  // pas de « devis ferme » ni de duree d'appel imposee.
  A: {
    pincettes_disclaimer: PINCETTES,
    pitch_reformule:
      "Sur la base de tes réponses, je vois les contours d'un cas qui peut tenir la route. Pour aller plus loin, il faut creuser ensemble.",
    ce_qui_est_solide: [
      "Tu as engagé la démarche : c'est déjà un signal d'intention sérieuse.",
    ],
    ce_qui_manque: [
      "Mon IA n'a pas pu générer un audit détaillé à l'instant, on réglera ça de vive voix.",
    ],
    concurrents: [],
    differenciation: [],
    defi_principal:
      "Le défi principal à ton stade : trancher rapidement le périmètre de la première version pour ne pas faire exploser le budget.",
    plan_action: [
      "Cadrer ton projet en détail avec moi.",
    ],
    prix_indicatif:
      "Impossible de donner un prix honnête sans cadrer précisément ton application. Le tarif dépend du périmètre à développer, du niveau de design attendu, des intégrations et du niveau de finition souhaité. Le plus simple, c'est qu'on en parle directement pour transformer cet audit en devis clair.",
    delai_indicatif:
      "À première vue, compte environ 7 semaines pour construire une version sérieuse. Le délai exact se cale en appel, une fois le périmètre et le niveau de finition clarifiés.",
    cta_message:
      "Avec seulement 5 questions, je peux déjà te donner de bons repères, mais pour un prix fixe et un délai précis, je dois d'abord bien comprendre ton projet. Pour avoir un vrai prix, écris-moi sur WhatsApp : on en parle, puis je te fais un devis avec une maquette de ton app.",
  },
  C: {
    pincettes_disclaimer: PINCETTES,
    pitch_reformule:
      "Sur la base de tes réponses, partir en développement serait prématuré compte tenu du budget annoncé.",
    ce_qui_est_solide: [],
    ce_qui_manque: [
      "Un budget de départ suffisant pour livrer une application pensée comme un vrai produit.",
    ],
    concurrents: [],
    differenciation: [],
    defi_principal:
      "Le risque à ce niveau d'investissement : livrer une première version qui ne tient pas la route en production, faute de cadrage, de design sérieux et de code maintenable.",
    plan_action: [
      "Continuer à valider ton idée auprès de ta cible.",
      "Structurer un budget réaliste avant de relancer un projet de développement.",
    ],
    prix_indicatif: null,
    delai_indicatif:
      "Sans cadre budgétaire sérieux, il est prématuré de parler de délai.",
    cta_message:
      "Avec ce budget, c'est encore un peu juste pour faire une application qui tienne la route, et je préfère te le dire franchement. Une app qui doit te rapporter, ce n'est pas que du code : il faut concevoir comment elle transforme tes utilisateurs en clients. Ça demande juste un budget de départ un peu plus solide. Prends le temps de le consolider, et reviens quand c'est prêt, on en parle.",
  },
};
