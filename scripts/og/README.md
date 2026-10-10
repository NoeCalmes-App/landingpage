# Images de partage (aperçu des liens WhatsApp, iMessage, LinkedIn)

Les trois images vivent dans `public/assets/images/meta/` et il n'y en a pas
d'autre :

| Image | Où elle s'affiche | Source ici |
|---|---|---|
| `accueil-og.png` | `noecalmes.fr` et toutes les pages, sauf les deux lignes suivantes | `accueil-og.html` |
| `maquette-og.png` | `noecalmes.fr/maquette` et toutes les `/maquette/...` | `maquette-og.html` |
| `audit-app-og.png` | `/audit-app` | pas de source, faite à la main |

`accueil-og.png` est déclarée dans `index.html` (donc héritée par toutes les
pages générées) et dans `public/legal/index.html`. `maquette-og.png` est posée
par `scripts/generate-routes.js` (bloc « Client mockup routes »).
`audit-app-og.png` par le même script et par `src/audit-app/AuditApp.jsx`.

Titre de Noé dans ces images et partout ailleurs : « Expert en applications
mobiles & web ». Pas de « SaaS » dans un titre (décision du 10/10/2026) : le mot
n'est compris que d'une partie de la cible, il s'écrit dans les phrases, expliqué.

## Image des maquettes

Texte imposé par `documentation/context/positionnement.md`, section Tonalité,
« Aperçu partagé des maquettes » : « L'idée prend forme » / « Place à la
maquette », sans pronom, sans portrait, adapté à une application comme à un
site. Polices : Plus Jakarta Sans du dépôt, Libre Baskerville italique copiée
ici (`LibreBaskerville-Italic.woff2`, licence OFL).

## Regénérer une image après une retouche du HTML

Dans un terminal, depuis la racine du dépôt :

```bash
npx --yes playwright@1.47.0 install chromium   # une seule fois
npx --yes playwright@1.47.0 screenshot --viewport-size="1200,630" \
  "file://$PWD/scripts/og/maquette-og.html" public/assets/images/meta/maquette-og.png
npx --yes playwright@1.47.0 screenshot --viewport-size="1200,630" \
  "file://$PWD/scripts/og/accueil-og.html" public/assets/images/meta/accueil-og.png
```

Ou à la main : ouvrir `maquette-og.html` dans Chrome, outils de développement,
mode appareil, 1200 × 630, capture d'écran, puis remplacer le PNG.

## Vérifier l'aperçu une fois en ligne

WhatsApp garde en cache l'aperçu d'un lien déjà partagé : tester avec une
adresse jamais envoyée, ou coller le lien dans
https://developers.facebook.com/tools/debug/ et cliquer « Scrape again ».
