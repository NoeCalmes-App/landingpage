# AGENTS.md — Landing Page Noe Calmes

Landing page publique de Noe Calmes, expert en application mobile. Le site sert a convertir du trafic Instagram / LinkedIn / SEO vers un audit gratuit, WhatsApp ou un appel Calendly. Ne pas confondre avec Nowork, qui reste l'admin CRM/devis.

## Stack

- React + Vite
- Tailwind CSS v4
- Routes SPA maison dans `src/App.jsx`
- Assets publics dans `public/assets`
- Backend audit app dans `src/audit-app/backend` deploye sur Firebase Functions projet `manychatia-82692`
- Chatbot public branche sur une Cloud Function du projet `devis-app-8e216`

## Lire la bonne doc

Lire seulement la doc utile au sujet demande.

| Sujet demande | Doc a lire en premier |
|---|---|
| Positionnement, ton, offre, expertise Noe | `documentation/context/positionnement.md` |
| Architecture landing page, routes, SEO, maquettes | `documentation/architecture/landing-page.md` |
| Audit app, funnel, questions, verdict IA, Firebase audit | `documentation/architecture/audit-app.md` |
| Assets, images, icones, fonts, documents PDF | `documentation/architecture/assets.md` |
| Espace client public `/espace-client/...` | `documentation/architecture/client-space-public.md` |
| Strategie commerciale, call, objections | `documentation/strategy/strategie-commerciale.md` |
| Instagram, LinkedIn, tunnel d'acquisition | `documentation/strategy/tunnel.md` |
| Stories, posts, briefs creatifs | `content/README.md` puis le fichier de brief concerne |

## Funnel business

Trafic Instagram / LinkedIn / SEO -> `noecalmes.fr/audit-app` -> audit en plusieurs etapes -> recap IA -> appel Calendly ou prise de contact WhatsApp -> ajout/suivi dans Nowork CRM -> devis / cahier des charges / relances.

L'audit app ne doit pas devenir un devis automatique complet. Il donne de la valeur, qualifie le lead, puis pousse vers la conversation avec Noe.

## Documentation vs supports

`documentation/` contient les sources de verite et les archives explicatives.

`content/` contient des supports creatifs (stories, posts, storyboard). Ce n'est pas une documentation produit : a utiliser seulement quand la question porte sur du contenu Instagram / creative.

## Assets

Tous les fichiers images, icones, fonts et PDF publics sont ranges sous `public/assets`.

Ne pas recreer des dossiers `img`, `src/assets/app`, `src/assets/lib`, `src/assets/font`, etc. Pour les nouveaux fichiers, utiliser :

- `public/assets/images/apps`
- `public/assets/images/app-icons`
- `public/assets/images/people`
- `public/assets/images/profile`
- `public/assets/images/illustrations`
- `public/assets/images/meta`
- `public/assets/icons`
- `public/assets/fonts`
- `public/assets/documents`

Les fichiers sous `public` se referencent avec une URL absolue depuis la racine, par exemple `/assets/images/profile/me.webp`.

## Points sensibles

- `public/404.html` gere les redirects GitHub Pages.
- Les pages HTML statiques dans `public/` peuvent aussi referencer des assets. Les verifier apres tout deplacement.
- `scripts/generate-routes.js` genere des pages SEO dans `dist` apres le build.
- `/maquette/...` est une route landing page pour les maquettes HTML faites a la main.
- `/maquette-visuel/...` appartient a Nowork et passe par une facade landing page vers `/nowork`.
- Le backend audit app utilise le projet Firebase `manychatia-82692`.
- Le panel admin des audits est lu depuis Nowork via `auditStatsAdmin`, avec authentification Firebase `devis-app-8e216`.

## Verification avant livraison

Apres modification d'assets ou chemins :

```bash
rg -n "src/assets|assets/lib|assets/app/|assets/appicon|assets/person|assets/contact|assets/docs|assets/font|/node_modules/geist|/document\\.pdf|/favicon\\.png|/new-og-image\\.png|/audit-app-og\\.png|/cgv/" -g '!node_modules' -g '!dist'
npm run build
```
