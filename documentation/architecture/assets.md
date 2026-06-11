# Architecture — Assets

## Regle

Tous les fichiers publics images, icones, fonts et PDF sont sous `public/assets`.

Les references doivent utiliser des URLs absolues depuis la racine :

```txt
/assets/images/profile/me.webp
/assets/icons/app/favicon.png
/assets/fonts/geist/Geist-Bold.woff2
```

Ne pas utiliser `/src/assets/...` dans le code ou les HTML publics.

## Arborescence

```txt
public/assets/
  documents/
    cgv/
    guides/
  fonts/
    geist/
    plus-jakarta/
  icons/
    app/
    brands/
    frameworks/
    ui/
  images/
    app-icons/
    apps/
    contact/
    illustrations/
    meta/
    people/
    profile/
    social/
    ui/
```

## Ou mettre les prochains fichiers

- Apps/projets publics : `public/assets/images/apps`
- Icones d'apps : `public/assets/images/app-icons`
- Photo de Noe : `public/assets/images/profile`
- Photos testimonials/personas : `public/assets/images/people`
- Illustrations SVG : `public/assets/images/illustrations`
- OG/meta images : `public/assets/images/meta`
- QR code/contact : `public/assets/images/contact`
- Icônes marque/framework/UI : `public/assets/icons/...`
- Fonts : `public/assets/fonts/...`
- PDF publics : `public/assets/documents/...`

## Fichiers statiques a surveiller

Ces fichiers peuvent referencer directement des assets :

- `index.html`
- `public/stories.html`
- `public/slides-matchup.html`
- `public/proposition-matchup.html`
- `public/audit-app-og.html`
- `public/legal/index.html`
- `scripts/generate-routes.js`

## Verification

Apres tout deplacement :

```bash
find . -path './node_modules' -prune -o -path './dist' -prune -o -type f \\( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.webp' -o -iname '*.svg' -o -iname '*.gif' -o -iname '*.ttf' -o -iname '*.otf' -o -iname '*.woff' -o -iname '*.woff2' -o -iname '*.pdf' \\) -print | sort

rg -n "src/assets|assets/lib|assets/app/|assets/appicon|assets/person|assets/contact|assets/docs|assets/font|/node_modules/geist|/document\\.pdf|/favicon\\.png|/new-og-image\\.png|/audit-app-og\\.png|/cgv/" -g '!node_modules' -g '!dist'

npm run build
```

