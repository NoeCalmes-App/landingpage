# Vidéo hero (motion design, 16 s, muette)

Version 4 du 2026-10-08. Elle tourne en boucle, muette, sous le bouton du hero.

## Script (texte à l'écran)

1. Moi, c'est Noé.
2. Je *crée* des applications mobiles / web / SaaS
3. qui génèrent des revenus. (vraies captures de tes applications, 13 000 € par mois, 300 000 utilisateurs)
4. 8 sur 10 : des applications ne dépassent jamais 1 000 $ par mois (applications à abonnement, RevenueCat 2024 : 17,2 % atteignent 1 000 $ de revenu mensuel)
5. Un développeur la *code*. (camembert 20 %)
6. Le reste la fait *rapporter*. (camembert jusqu'à 100 % : parcours, premier écran, paiement, fidélité)
7. Moi, je fais les 100 %.
8. Noé Calmes · Applications mobiles & web · +20 applications publiées · 13 000 € par mois pour l'une d'elles

Codes du site repris : Plus Jakarta Sans ExtraBold, mot en Libre Baskerville gras italique gris (#4b4b4b) comme « transforme », dégradé violet (#6760ff → #9e94ff) comme « génère des revenus ».

## Fichiers

- `web/hero-film-1080.mp4` (2 Mo) et `web/hero-film-720.mp4` (1,2 Mo) : sans piste son.
- `web/hero-poster.jpg` : image affichée avant la lecture.
- `src/film.html` : l'animation. Elle charge les captures depuis `assets/` (copier `public/assets/images/apps/captures/*.webp` et `src/avatar.png` dans `src/assets/`).
- `src/render.cjs` : rendu image par image avec 8 sous-images (flou de mouvement).
- `v3-voix/` : l'ancienne version avec voix de synthèse et musique, abandonnée.

## Refaire le rendu

1. Dans `src/` : `npm install @fontsource/plus-jakarta-sans@5.1.1 @fontsource-variable/libre-baskerville@5.3.0 @fontsource/geist-mono@5.1.1 playwright`
2. `echo '{"end": 16}' > cues.json && node render.cjs "$PWD/film.html" "$PWD/frames" "$PWD/cues.json" 30 8 0.5 0 1`
3. `ffmpeg -framerate 240 -i frames/%06d.jpg -filter_complex "[0:v]tmix=frames=8,select='eq(mod(n\,8)\,7)',setpts=N/(30*TB),format=yuv420p[v]" -map "[v]" -r 30 -c:v libx264 -crf 23 -movflags +faststart -an hero-film-1080.mp4`
