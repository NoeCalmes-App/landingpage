# Architecture — Audit App

## Role business

`/audit-app` est un funnel d'acquisition gratuit. Il aide un prospect a clarifier son idee d'application, puis l'incite a contacter Noe via WhatsApp ou a prendre un appel.

Flux voulu :

Instagram / LinkedIn / SEO -> `/audit-app` -> questions -> recap IA -> appel ou WhatsApp -> suivi dans `devis-app` CRM -> devis / cahier des charges / relances.

L'audit donne de la valeur, mais ne remplace pas un devis ni un cahier des charges complet.

## Frontend

Fichiers principaux :

- `src/audit-app/AuditApp.jsx` — machine d'etat hero -> formulaire -> verdict.
- `src/audit-app/AuditAppHero.jsx` — premiere page du funnel.
- `src/audit-app/AuditAppForm.jsx` — formulaire multi-etapes.
- `src/audit-app/AuditAppVerdict.jsx` — rendu du recap IA.
- `src/audit-app/config.js` — questions, options, URL Calendly, endpoint API.
- `src/audit-app/api.js` — POST final vers `VITE_AUDIT_API_URL`.
- `src/audit-app/storage.js` — persistence locale de l'etat du tunnel.

## Questions collectees

Les questions sont declarees dans `src/audit-app/config.js` :

1. Type d'app : mobile, web, mobile & web.
2. Idee : texte libre, dictee vocale possible, piece jointe possible.
3. Marche : concurrents payants / gratuits / aucune solution.
4. References concurrentes connues, conditionnel.
5. Cible : nombre de personnes interrogees.
6. Modele economique : abonnement, achat unique, commission, freemium, inconnu.
7. Budget : plus de 12k, 7.5k-12k, 3.5k-7.5k, moins de 3.5k.

## Backend Firebase audit

Le backend vit dans `src/audit-app/backend`.

Projet Firebase : `manychatia-82692`.

Functions :

- `verdictWeb` — endpoint final appele par le front, genere le verdict IA et sauvegarde l'audit finalise.
- `auditPartial` — endpoint pour capturer les abandons du tunnel.
- `auditStatsAdmin` — endpoint admin lu depuis `devis-app`, protege par token Firebase du projet `devis-app-8e216`.

Collection Firestore : `audits`.

Un audit finalise contient notamment :

- `firstName`
- `sessionId`
- `appType`
- `ideaText`
- `knownCompetitors`
- `q1Answer` a `q4Answer`
- `attachment`
- `verdict`
- `branch`
- `budgetTag`
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

- Budget inferieur a 3 500 EUR -> branche C : pas de Calendly direct, message plus franc.
- Autres budgets -> branche A : Calendly propose.

## Lien avec `devis-app`

`devis-app` ne stocke pas directement les audits dans son Firestore. Il lit les audits du projet `manychatia-82692` via la function `auditStatsAdmin`, qui verifie un token Firebase du projet `devis-app-8e216`.

But cote admin : voir les audits termines, les dates, les reponses et le verdict, puis creer/suivre le prospect dans le CRM `devis-app`.

## Positionnement

Pour les questions de copywriting ou de strategie autour de l'audit, lire aussi :

- `documentation/context/positionnement.md`
- `documentation/strategy/funnel-instagram-profil.md`
- `documentation/archive/funnels/diagnostic-audit-app.md` (archive historique, a verifier avant usage)
