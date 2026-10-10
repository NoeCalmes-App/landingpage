# Images de partage (aperçu des liens WhatsApp, iMessage, LinkedIn)

Quatre images, toutes dans `public/assets/images/meta/`, et aucune autre :

| Image | Où elle s'affiche | Source ici |
|---|---|---|
| `accueil-og.jpg` | `noecalmes.fr` et tous les liens, sauf les trois lignes suivantes | `accueil-og.html` + `accueil-og-fond.png` |
| `maquette-og.png` | `/maquette` et toutes les `/maquette/...` | `maquette-og.html` |
| `espace-client-og.png` | `/espace-client` | `espace-client-og.html` |
| `audit-og.png` | `/audit-app` | `audit-og.html` |

Qui les pose : `accueil-og.jpg` est dans `index.html` (donc héritée par toutes
les pages générées) et `public/legal/index.html`. Les trois autres sont posées
par `scripts/generate-routes.js` (fonction `poserApercuPartage`), et l'audit
aussi par `src/audit-app/AuditApp.jsx`.

Poids : chaque image doit rester sous 300 Ko, au-delà WhatsApp n'affiche pas
toujours l'aperçu.

⚠️ Les liens `/espace-client/{client}/{jeton}` et `/maquette-visuel/...` n'ont
pas de page à eux sur GitHub Pages : ils répondent 404 aux robots de partage,
puis `public/404.html` les rattrape en JavaScript pour le visiteur. Les robots
n'exécutent pas ce JavaScript, donc ces liens-là n'ont pas d'aperçu dédié.

Titre de Noé dans ces images et partout ailleurs : « Expert en applications
mobiles & web ». Pas de « SaaS » dans un titre (décision du 10/10/2026) : le mot
n'est compris que d'une partie de la cible, il s'écrit dans les phrases, expliqué.

## Image par défaut

En JPEG (environ 90 Ko) et pas en PNG : le grain du fond faisait monter le PNG
à 700 Ko, et WhatsApp n'affiche pas toujours un aperçu au-delà d'environ
300 Ko. Rendre `accueil-og.html` en PNG puis convertir en JPEG qualité 90.

C'est l'image d'origine (ex `new-og-image.png`) avec trois retouches seulement,
décidées par Noé le 10/10/2026 : « votre idée » devient « ton idée » (refait
avec les lettres mêmes de l'image d'origine, police identique), le contenu est
centré (155 px de marge de chaque côté), et les bulles changent. `MVP · Flutter · IOS & Android · Produit` sont devenues
`Stratégie · Design · Mobile & web · Mise en ligne` (Flutter et MVP sont
interdits en public). `accueil-og-fond.png` est l'image d'origine retouchée,
bulles effacées ; `accueil-og.html` pose les bulles par-dessus, en Inter normal.

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
  "file://$PWD/scripts/og/accueil-og.html" public/assets/images/meta/accueil-og.jpg
```

Ou à la main : ouvrir `maquette-og.html` dans Chrome, outils de développement,
mode appareil, 1200 × 630, capture d'écran, puis remplacer le PNG.

## Vérifier l'aperçu une fois en ligne

WhatsApp garde en cache l'aperçu d'un lien déjà partagé : tester avec une
adresse jamais envoyée, ou coller le lien dans
https://developers.facebook.com/tools/debug/ et cliquer « Scrape again ».
