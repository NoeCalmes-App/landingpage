# Architecture — Audit App

## Role business

`/audit-app` est un funnel d'acquisition gratuit. Il aide un prospect a clarifier son idee d'application, puis l'incite a contacter Noe via WhatsApp. WhatsApp est le **seul** canal de contact : le CTA secondaire Calendly sous le verdict a ete retire le 22/06/2026 (voir `documentation/strategy/tunnel.md`).

Flux voulu :

Instagram / LinkedIn / Meta Ads / SEO / landing page -> `/audit-app` -> questions -> recap IA -> WhatsApp -> suivi dans Nowork CRM -> devis / cahier des charges / relances.

L'audit donne de la valeur, mais ne remplace pas un devis ni un cahier des charges complet.

## Frontend

Fichiers principaux :

- `src/audit-app/AuditApp.jsx` — machine d'etat hero -> formulaire -> verdict.
- `src/audit-app/AuditAppHero.jsx` — premiere page du funnel.
- `src/audit-app/AuditAppForm.jsx` — formulaire multi-etapes.
- `src/audit-app/AuditAppVerdict.jsx` — rendu du recap IA.
- `src/audit-app/config.js` — questions, options, endpoint API (`CALENDLY_URL` encore present mais inutilise depuis le retrait de Calendly).
- `src/audit-app/api.js` — POST final vers `VITE_AUDIT_API_URL`.
- `src/audit-app/storage.js` — persistence locale de l'etat du tunnel.

Regle hero :

- CTA principal : lancer l'audit.
- Sortie secondaire : petit lien gris/souligne sous le CTA (`Je préfère discuter avec Noé`) vers WhatsApp.
- Pas de CTA WhatsApp dans la navbar du hero : la barre sert a la confiance, le lien sous le bouton sert de porte de sortie pour les visiteurs qui refusent le test.
- Pendant le formulaire, aucun raccourci WhatsApp visible : focus sur la completion.

Tracking Meta :

- bouton `Lancer mon audit gratuit` -> `AuditStart` ;
- lien WhatsApp avant l'audit -> `Lead` avec source `audit_skip` ;
- verdict affiche -> `AuditComplete` + `QualifiedAuditComplete` si budget >= 3 500 EUR, ou `LowBudgetAudit` si budget < 3 500 EUR ;
- premier clic WhatsApp apres verdict qualifie -> `WhatsAppClick` + `Lead` + `QualifiedAuditLead` ;
- premier clic WhatsApp apres verdict petit budget -> `WhatsAppClick` + `LowBudgetLead`, sans `Lead`.

`Lead` est le signal positif commun utilise par les campagnes landing et audit. Un contact WhatsApp direct reste un `Lead` avec qualification inconnue, car l'intention est forte meme sans audit. `QualifiedAuditLead` distingue le parcours ou le prospect a fourni son projet, son stade et un budget suffisant avant de cliquer. Un budget inferieur a 3 500 EUR ne declenche jamais `Lead`. Aucun de ces evenements ne prouve que le message WhatsApp a ete envoye ; cette confirmation necessiterait WhatsApp Business Platform et un webhook.

## Questions collectees

Les questions sont declarees dans `src/audit-app/config.js` :

1. Type d'app : mobile, web, mobile & web.
2. Idee : texte libre, dictee vocale possible, piece jointe possible.
3. Stade du projet : pret a demarrer, financement en cours, budget/delai a estimer, validation de l'idee.
4. Marche : concurrents payants / gratuits / aucune solution.
5. References concurrentes connues, conditionnel.
6. Cible : nombre de personnes interrogees.
7. Modele economique : abonnement, achat unique, commission, freemium, inconnu.
8. Budget : plus de 12k, 7.5k-12k, 3.5k-7.5k, moins de 3.5k.

## Backend Firebase audit

Le backend vit dans `src/audit-app/backend`.

Projet Firebase : `manychatia-82692`.

Functions :

- `verdictWeb` — endpoint final appele par le front, genere le verdict IA et sauvegarde l'audit finalise.
- `auditPartial` — endpoint pour capturer les abandons du tunnel.
- `auditStatsAdmin` — endpoint admin lu depuis Nowork, protege par token Firebase du projet `devis-app-8e216`.

Collection Firestore : `audits`.

Un audit finalise contient notamment :

- `firstName`
- `sessionId`
- `appType`
- `ideaText`
- `projectStageAnswer`
- `knownCompetitors`
- `q1Answer` a `q4Answer`
- `attachment`
- `verdict`
- `branch`
- `budgetTag`
- `leadTemperature` (`hot`, `warm`, `cold`, `unknown`) calcule a partir du stade projet et du budget.
- `aiProvider`
- `status`
- `createdAt`, `submittedAt`, `completedAt`

## IA

Le prompt et la generation vivent dans :

- `src/audit-app/backend/prompts.ts`
- `src/audit-app/backend/orchestrator.ts`
- `src/audit-app/backend/branch.ts`
- `src/audit-app/backend/types.ts`

Cascade actuelle documentee dans le code : Gemini / Groq, avec fallback selon configuration.

## Branchement commercial

La logique de branche est dans `src/audit-app/backend/branch.ts`.

- Budget inferieur a 3 500 EUR -> branche C : pas de push fort vers la conversation commerciale, message plus franc.
- Autres budgets -> branche A : WhatsApp en CTA principal. (Le CTA Calendly secondaire de cette branche a ete retire le 22/06/2026 ; le commentaire dans `branch.ts` peut encore le mentionner.)

## Lien avec Nowork

Nowork ne stocke pas directement les audits dans son Firestore. Il lit les audits du projet `manychatia-82692` via la function `auditStatsAdmin`, qui verifie un token Firebase du projet historique `devis-app-8e216`.

But cote admin : voir les audits termines, les dates, les reponses et le verdict, puis creer/suivre le prospect dans le CRM Nowork.

## Positionnement

Pour les questions de copywriting ou de strategie autour de l'audit, lire aussi :

- `documentation/context/positionnement.md`
- `documentation/strategy/funnel-instagram-profil.md`
- `documentation/archive/funnels/diagnostic-audit-app.md` (archive historique, a verifier avant usage)
