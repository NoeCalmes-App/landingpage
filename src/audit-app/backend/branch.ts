/**
 * Logique de branchement simplifiee.
 *
 * Regle unique : le budget determine l'eligibilite au call.
 * - budget OUT (< 3500 EUR) -> branche C : pas de Calendly, message franc
 * - tout le reste -> branche A : Calendly propose
 *
 * V3 : les FALLBACK_VERDICTS retournent le nouveau schema enrichi
 * (utilises si TOUS les providers IA echouent — cas extreme).
 */

import { Branch, BudgetTag, VerdictBody } from "./types";

export function computeBranch(budget: BudgetTag): Branch {
  return budget === "OUT" ? "C" : "A";
}

const PINCETTES =
  "Audit etabli en 2 minutes sur la base de 5 reponses — il sert a poser un cadre, pas a chiffrer precisement votre projet.";

export const FALLBACK_VERDICTS: Record<Branch, VerdictBody> = {
  A: {
    pincettes_disclaimer: PINCETTES,
    pitch_reformule:
      "Sur la base de vos reponses, je vois les contours d'un cas qui peut tenir la route business. Pour aller plus loin, il faut creuser ensemble.",
    ce_qui_est_solide: [
      "Vous avez engage la demarche : c'est deja un signal d'intention serieuse.",
    ],
    ce_qui_manque: [
      "Notre IA n'a pas pu generer un audit detaille a l'instant — nous reglerons cela au telephone.",
    ],
    concurrents: [],
    differenciation: [],
    defi_principal:
      "Le defi principal a votre stade : trancher rapidement les arbitrages MVP pour ne pas exploser le budget en V1.",
    plan_action: [
      "Prendre un appel 30 minutes pour qu'on regarde votre projet ensemble.",
    ],
    prix_indicatif:
      "Difficile a estimer sans rentrer dans le detail — on en parle ensemble.",
    delai_indicatif:
      "Pour un MVP, comptez generalement 4 a 10 semaines selon la complexite.",
    cta_message:
      "Le plus simple, c'est qu'on en discute 30 minutes ensemble — gratuit, sans engagement. On rentrera dans le detail de votre projet.",
  },
  C: {
    pincettes_disclaimer: PINCETTES,
    pitch_reformule:
      "Sur la base de vos reponses, partir en developpement serait premature compte tenu du budget annonce.",
    ce_qui_est_solide: [],
    ce_qui_manque: [
      "Un budget structure suffisant pour livrer une application pensee comme un produit rentable.",
    ],
    concurrents: [],
    differenciation: [],
    defi_principal:
      "Le risque a ce niveau d'investissement : livrer une V1 qui ne tient pas la route en production, faute de cadrage strategique, design serieux et dev maintenable.",
    plan_action: [
      "Continuer a valider votre idee aupres de votre cible.",
      "Structurer un budget realiste avant de relancer un projet de developpement.",
    ],
    prix_indicatif: null,
    delai_indicatif:
      "Sans cadre budgetaire serieux, il est premature de parler de delai.",
    cta_message:
      "Mon accompagnement complet — strategie, design, developpement, lancement — demarre a 3 500 EUR. C'est le seuil pour livrer une application pensee comme un produit rentable, pas du code livre et oublie. Ma demarche detaillee est sur noecalmes.fr.",
  },
};
