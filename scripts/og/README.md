# Image de partage des maquettes

`maquette-og.html` est la source de `public/assets/images/meta/maquette-og.png`,
l'image que WhatsApp, iMessage et LinkedIn affichent quand un lien
`noecalmes.fr/maquette/...` est partagé. Elle est posée sur ces pages par
`scripts/generate-routes.js` (bloc « Client mockup routes »). Toutes les autres
pages gardent l'image de l'accueil (`new-og-image.png`), sauf `/audit-app`
(`audit-app-og.png`).

Texte imposé par `documentation/context/positionnement.md`, section Tonalité,
« Aperçu partagé des maquettes » : « L'idée prend forme » / « Place à la
maquette », sans pronom, sans portrait, adapté à une application comme à un
site. Polices : Plus Jakarta Sans du dépôt, Libre Baskerville italique copiée
ici (`LibreBaskerville-Italic.woff2`, licence OFL).

## Regénérer l'image après une retouche du HTML

Dans un terminal, depuis la racine du dépôt :

```bash
npx --yes playwright@1.47.0 install chromium   # une seule fois
npx --yes playwright@1.47.0 screenshot --viewport-size="1200,630" \
  "file://$PWD/scripts/og/maquette-og.html" public/assets/images/meta/maquette-og.png
```

Ou à la main : ouvrir `maquette-og.html` dans Chrome, outils de développement,
mode appareil, 1200 × 630, capture d'écran, puis remplacer le PNG.

## Vérifier l'aperçu une fois en ligne

WhatsApp garde en cache l'aperçu d'un lien déjà partagé : tester avec une
adresse jamais envoyée, ou coller le lien dans
https://developers.facebook.com/tools/debug/ et cliquer « Scrape again ».
