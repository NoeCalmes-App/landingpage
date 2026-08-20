# AGENTS.md — Landing Page Noe Calmes

Landing page publique de Noe Calmes, expert en application mobile. Le site sert a convertir du trafic Instagram / LinkedIn / SEO vers un audit gratuit et une prise de contact WhatsApp (canal unique depuis le 22/06/2026 ; Calendly retire de la landing). Ne pas confondre avec Nowork, qui reste l'admin CRM/devis.

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
| Architecture landing page, routes, SEO technique, maquettes | `documentation/architecture/landing-page.md` |
| Etat SEO, Search Console, publier un article | `documentation/strategy/seo/README.md` |
| Rediger un nouvel article de blog | `documentation/strategy/seo/idees-articles.md` puis `modele-article.md` |
| Audit app, funnel, questions, verdict IA, Firebase audit | `documentation/architecture/audit-app.md` |
| Assets, images, icones, fonts, documents PDF | `documentation/architecture/assets.md` |
| Espace client public `/espace-client/...` | `documentation/architecture/client-space-public.md` |
| Strategie commerciale, call, objections | `documentation/strategy/strategie-commerciale.md` |
| Instagram, LinkedIn, tunnel d'acquisition | `documentation/strategy/tunnel.md` |
| Rediger un post / carrousel LinkedIn | `documentation/strategy/linkedin-posts.md` |
| Stories, posts, briefs creatifs | `content/README.md` puis le fichier de brief concerne |

## Funnel business

Trafic Instagram / LinkedIn / SEO -> `noecalmes.fr/audit-app` -> audit en plusieurs etapes -> recap IA -> prise de contact WhatsApp -> ajout/suivi dans Nowork CRM -> devis / cahier des charges / relances.

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
- `scripts/generate-routes.js` genere des pages SEO dans `dist` apres le build, **et genere `dist/sitemap.xml`** (il n'y a plus de `public/sitemap.xml`).
- Toute URL interne porte la barre finale. Passer par `lienInterne()` / `urlPublique()` de `src/seo.js`. Le build echoue sur un lien sans barre : voir `documentation/architecture/landing-page.md`.
- Les `metaTitle` / `description` ont une source unique (`src/Blog.jsx`, `src/PagesSeo.jsx`, `src/Quiz.jsx`). `generate-routes.js` les lit, ne les redefinit pas.
- `/maquette/...` est une route landing page pour les maquettes HTML faites a la main.
- `/maquette-visuel/...` appartient a Nowork et passe par une facade landing page vers `/nowork`.
- Le backend audit app utilise le projet Firebase `manychatia-82692`.
- Le panel admin des audits est lu depuis Nowork via `auditStatsAdmin`, avec authentification Firebase `devis-app-8e216`.

## Reference maquettes

Quand Noe demande de creer une maquette pour un nouveau projet, utiliser la page Aretha comme reference de structure :

- Route publique de reference : `https://noecalmes.fr/maquette/aretha/`
- Code local de reference : `src/ArethaMockups.jsx` et `src/aretha-mockups.css`
- Structure attendue : page autonome sans navbar/footer landing, hero simple, galerie de maquettes, cartes de presentation, frames mobile propres, rendu premium et coherent.
- Pour un nouveau projet, reprendre la structure et le niveau de finition, mais jamais le contenu, les fonctionnalites, les couleurs ou la marque Aretha si le projet est different.
- Les maquettes HTML vivent dans `landing-page` sur une route `/maquette/{slug}`. Le devis et le cahier des charges restent geres cote Nowork.

En-tete standard a conserver pour les routes `/maquette/...` :

- Eyebrow : `Proposition d'accompagnement`
- Titre : `Maquettes visuelles`
- Reference : `[Nom du projet] · [reference ou nom provisoire]`
- Disclaimer : `Aperçu rapide pour visualiser l'idée, toutes les pages ne sont pas illustrées et le design n'est pas définitif (couleurs, logo, typo). Non contractuel.`
- En dessous : galerie de cartes avec titre/sous-titre, puis frames mobile ou desktop selon le projet.

## Verification avant livraison

Apres modification d'assets ou chemins :

```bash
rg -n "src/assets|assets/lib|assets/app/|assets/appicon|assets/person|assets/contact|assets/docs|assets/font|/node_modules/geist|/document\\.pdf|/favicon\\.png|/new-og-image\\.png|/audit-app-og\\.png|/cgv/" -g '!node_modules' -g '!dist'
npm run build
```
