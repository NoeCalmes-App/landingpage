# Architecture — Landing Page

## Role

Site public `noecalmes.fr` pour vendre le positionnement de Noe Calmes : expert en application mobile, de la strategie au lancement. Le site sert a convertir le trafic en audit gratuit, WhatsApp ou appel Calendly.

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
- `/rendez-vous` — section Calendly de la home
- `/documents` et routes documents
- `/blog` et `/blog/...`
- `/espace-client/:clientSlug/:token` et `/espace-client/:token` — facade publique vers l'espace client de Nowork, URL propre sans `/nowork` visible
- `/maquette-visuel/:clientSlug/:quoteId` — facade publique vers les maquettes de Nowork, URL propre sans `/nowork` visible
- `/maquette/smoothride`
- `/maquette/aretha`
- `/maquette/pac-assist`, `/maquette/cvc-assist`
- `/merci`, `/contactnoe`, `/legal`, `/mentions`, `/privacy`, `/cgv`

`scripts/generate-routes.js` genere des dossiers SEO dans `dist` pour les routes importantes apres le build.

## Maquettes

Les maquettes HTML faites a la main vivent dans la landing page avec des routes `/maquette/...`.

Ne pas confondre avec Nowork :

- `/maquette/smoothride`, `/maquette/aretha`, `/maquette/cvc-assist` = pages landing page.
- `/maquette-visuel/{clientSlug}/{quoteId}` = galerie publique generee par Nowork.

Pour les URLs collees dans un devis, preferer des slugs minuscules et stables :

- `https://noecalmes.fr/maquette/smoothride/`
- `https://noecalmes.fr/maquette/aretha/`
- `https://noecalmes.fr/maquette/cvc-assist/`

## Calendly

Le widget Calendly est charge depuis `src/App.jsx`. Le CTA de l'audit peut renvoyer vers la section rendez-vous de la home.

URL configuree dans `src/audit-app/config.js` :

`https://calendly.com/noecalmes-app/appel-app-mobile?primary_color=645cff`

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
