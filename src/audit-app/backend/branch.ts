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
  "Audit etabli en 2 minutes sur la base de 5 reponses. Il sert a poser un cadre, pas a chiffrer precisement votre projet.";

export const FALLBACK_VERDICTS: Record<Branch, VerdictBody> = {
  A: {
    pincettes_disclaimer: PINCETTES,
    pitch_reformule:
      "Sur la base de vos reponses, je vois les contours d'un cas qui peut tenir la route business. Pour aller plus loin, il faut creuser ensemble.",
    ce_qui_est_solide: [
      "Vous avez engage la demarche : c'est deja un signal d'intention serieuse.",
    ],
    ce_qui_manque: [
      "Notre IA n'a pas pu generer un audit detaille a l'instant, nous reglerons cela au telephone.",
    ],
    concurrents: [],
    differenciation: [],
    defi_principal:
      "Le defi principal a votre stade : trancher rapidement les arbitrages MVP pour ne pas exploser le budget en V1.",
    plan_action: [
      "Prendre un appel 30 minutes pour qu'on regarde votre projet ensemble.",
    ],
    prix_indicatif:
      "Impossible de donner un prix honnete sans cadrer precisement votre application. Le tarif depend du perimetre a developper, du niveau de design attendu, des integrations et du niveau de finition souhaite. Le bon reflexe est de prendre rendez-vous pour transformer cet audit en devis clair.",
    delai_indicatif:
      "A premiere vue, comptez environ 7 semaines pour construire une version serieuse. Le planning exact se valide en appel, une fois le perimetre et le niveau de finition clarifies.",
    cta_message:
      "Le plus simple, c'est qu'on en discute 30 minutes ensemble. On rentrera dans le detail de votre projet, puis je vous enverrai un devis ferme avec un prix et un planning clairs.",
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
      "Votre budget annonce semble encore trop fragile pour lancer une application dans de bonnes conditions. A ce stade, donner un prix serait malhonnete sans cadrer votre idee, votre modele de revenus et votre perimetre. Prenez le temps de stabiliser votre budget et de valider votre idee aupres de votre cible. Quand le moment sera juste, le plus simple sera d'en parler avec moi pour transformer votre idee en projet clair.",
  },
};
