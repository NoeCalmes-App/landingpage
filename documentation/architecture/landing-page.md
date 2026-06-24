# Architecture — Landing Page

## Role

Site public `noecalmes.fr` pour vendre le positionnement de Noe Calmes : expert en application mobile, de la strategie au lancement. Le site sert a convertir le trafic en audit gratuit et conversation WhatsApp via la section `/rendez-vous`.

Le chemin prioritaire pour les visiteurs qui se posent une question de prix/budget est : landing page -> `/audit-app` -> verdict -> WhatsApp. WhatsApp est le canal de contact unique : tous les CTA y menent (Calendly retire depuis le 22/06/2026, voir `documentation/strategy/tunnel.md`).

## Stack

- React + Vite
- Tailwind CSS v4
- Routes SPA maison dans `src/App.jsx`
- Build : `npm run build` puis `scripts/generate-routes.js`
- Hebergement GitHub Pages / domaine `noecalmes.fr`

## Routes principales

Routes gerees dans `src/App.jsx` :

- `/` — home landing page
- `/audit-app` — audit gratuit d'idee d'application
- `/rendez-vous` — section contact WhatsApp de la home (id historique `#calendly-section`)
- `/documents` et routes documents
- `/blog` et `/blog/...`
- `/espace-client/:clientSlug/:token` et `/espace-client/:token` — facade publique vers l'espace client de Nowork, URL propre sans `/nowork` visible
- `/maquette-visuel/:clientSlug/:quoteId` — facade publique vers les maquettes de Nowork, URL propre sans `/nowork` visible
- `/maquette/smoothride`
- `/maquette/aretha`
- `/maquette/kingfit-coach`
- `/maquette/pac-assist`, `/maquette/cvc-assist`
- `/merci`, `/contactnoe`, `/legal`, `/mentions`, `/privacy`, `/cgv`

`scripts/generate-routes.js` genere des dossiers SEO dans `dist` pour les routes importantes apres le build.

## Maquettes

Les maquettes HTML faites a la main vivent dans la landing page avec des routes `/maquette/...`.

Ne pas confondre avec Nowork :

- `/maquette/smoothride`, `/maquette/aretha`, `/maquette/cvc-assist` = pages landing page.
- `/maquette/kingfit-coach` = page de maquettes pour l'application coach/salle de sport.
- `/maquette-visuel/{clientSlug}/{quoteId}` = galerie publique generee par Nowork.

Pour les URLs collees dans un devis, preferer des slugs minuscules et stables :

- `https://noecalmes.fr/maquette/smoothride/`
- `https://noecalmes.fr/maquette/aretha/`
- `https://noecalmes.fr/maquette/kingfit-coach/`
- `https://noecalmes.fr/maquette/cvc-assist/`

### Reference de structure pour nouvelles maquettes

Quand une nouvelle maquette client doit etre creee, prendre Aretha comme reference de structure, pas comme contenu a copier.

- Reference publique : `https://noecalmes.fr/maquette/aretha/`
- Fichiers locaux : `src/ArethaMockups.jsx` et `src/aretha-mockups.css`
- Attendu : page autonome, hero sobre, galerie de cartes, frames mobile propres, titre et sous-titre pour chaque ecran, finition visuelle coherente.
- Adapter a chaque projet : parcours, ecrans, style, couleurs, illustrations, textes et niveau de detail doivent rester propres au client.
- Si le client demande un lien dans le devis, coller l'URL `/maquette/{slug}` generee dans ce dossier, pas une galerie `/maquette-visuel/...` sauf si les images viennent de Nowork.

## Contact WhatsApp

Calendly a ete retire de la landing le 22/06/2026 (embed, script et preconnexions supprimes). Le contact passe desormais par **WhatsApp** : constante `WHATSAPP_URL` (numero + message pre-rempli) dans `src/App.jsx`.

Tous les CTA de contact de la home et des pages de contenu renvoient d'abord vers `/rendez-vous`, qui affiche la section `#calendly-section`. Seuls deux acces ouvrent WhatsApp directement :

- le bouton principal dans la section `/rendez-vous` ;
- le bouton flottant WhatsApp.

Le message pre-rempli commence par `Bonjour Noé`.

Pour les CTA prix/budget, preferer `/audit-app` : exemple dans la section comparaison, `Tarif fixe, sans surprise` puis lien secondaire `Combien coûterait mon app ?` vers `/audit-app`, qui finit lui aussi sur WhatsApp.

`CALENDLY_URL` reste defini dans `src/audit-app/config.js` mais n'est plus utilise (conserve pour reactivation eventuelle). Detail du retrait : `documentation/archive/funnels/funnel-calendly-2026-06.md`.

## Tracking Meta

Le Pixel Meta est initialise dans `index.html`. Les evenements frontend sont centralises dans `src/metaTracking.js` et dedupliques par session :

- `Lead` (`Prospect` dans Meta) : premier clic WhatsApp direct de la session, ou clic WhatsApp apres un audit dont le budget est d'au moins 3 500 EUR. Un clic post-audit avec un budget inferieur ne declenche jamais cet evenement positif.
- `DirectWhatsAppLead` : clic WhatsApp sans qualification budget prealable (landing, bouton flottant ou sortie avant l'audit). Il reste compte comme `Lead`, car l'intention de contact est forte, mais porte le statut `unknown`.
- `AuditStart` : demarrage du formulaire `/audit-app`.
- `AuditComplete` : affichage du verdict, avec `budget_tier`.
- `QualifiedAuditComplete` : verdict affiche avec un budget d'au moins 3 500 EUR.
- `LowBudgetAudit` : verdict affiche avec un budget inferieur a 3 500 EUR.
- `WhatsAppClick` : tout clic WhatsApp apres verdict, quelle que soit la qualification.
- `QualifiedAuditLead` : clic WhatsApp apres verdict avec un budget d'au moins 3 500 EUR, en plus du `Lead` commun.
- `LowBudgetLead` : clic WhatsApp apres verdict avec un budget inferieur a 3 500 EUR. Cet evenement est mesure, mais n'envoie pas `Lead` et n'alimente donc pas l'optimisation positive de la campagne.

Le Pixel voit l'ouverture de WhatsApp, pas l'envoi reel du message. Suivre automatiquement les messages recus demanderait WhatsApp Business Platform avec webhook et Conversions API. L'application WhatsApp Business seule reste utile pour les reponses rapides et les libelles, mais ne remonte pas l'envoi au Pixel.

## Chatbot

Le widget public est dans `src/chatbot/Widget.jsx`.

Le backend chatbot n'est pas dans ce repo : il appelle la Cloud Function du projet `devis-app-8e216`, configuree par `VITE_CHATBOT_API_URL`.

## Redirect GitHub Pages

`public/404.html` gere les chemins directs non resolus par GitHub Pages.

Cas sensible :

- `/nowork/...` doit renvoyer vers l'application admin.
- `/app-devis/...` doit rester redirige vers `/nowork/...` pour compatibilite avec les anciens liens.
- `/maquette-visuel/...` appartient a Nowork mais reste affiche sans `/nowork` via une facade landing page.
- `/espace-client/...` est une route publique landing page, sans afficher `/nowork`.
