# Vidéo hero v11

Le film de 26 secondes du hero, avec le début recalé sur la voix. C'est la version en ligne sur le site
(`public/assets/videos/hero-v11-1080.mp4` et `hero-v11-720.mp4`), et celle du Reel Instagram (`reel/`).

## Différence avec la v10

Demande de Noé du 10/10/2026 : « quand on dit en 2026, on est toujours sur le premier design (SaaS et
mobile) ; quand on dit un vrai pari, ça doit mettre le texte un vrai pari et les dés ». Dans la v10, le site
et l'application restaient jusqu'au milieu de « 2026 », puis « En 2026, un vrai pari. » et les dés arrivaient
ensemble, une demi-seconde après la voix.

Dans la v11, chaque élément arrive avec la voix :

- le titre, le site et l'application partent à la fin de « …ou ton SaaS » (1,58 s au lieu de 2,35 s) ;
- « En 2026, » arrive quand la voix dit « en 2026 » (1,90 s) ;
- « un vrai pari. » arrive quand la voix le dit (2,95 s), sur la même ligne ;
- les dés partent sur « un vrai pari » (2,86 s), un peu plus vite (85 % du temps de la v10), pour avoir le
  temps de se poser avant que le violet monte.

Le son suit : les souffles des mots et la sortie du projet sont recalés, « un vrai pari. » a son propre souffle,
et les chocs des dés tombent sur les nouveaux rebonds, 6 dB plus bas pour ne pas couvrir « un vrai pari ».
Dans « deux mille vingt-six », le « t » recollé au montage de la v10 partait d'un silence numérique, d'un coup,
ce qui faisait un clic (« la voix est un peu cassée au début », Noé) : son attaque est adoucie.

Tout le reste (images après 4,7 s, voix, autres bruitages) est exactement celui de la v10.

## Fichiers

- `hero-film-v11.mp4` : le film final en 1080p, avec la voix et les bruitages (pas versionné).
- Sur le site : `public/assets/videos/hero-v11-1080.mp4` (ordinateur) et `hero-v11-720.mp4` (mobile).
  La miniature reste `hero-v10-miniature.webp` : elle ne change pas.
- `src/film-v11.html` et `src/cues-v11.json` : l'animation et ses repères, tirés de `../v10/src/film-v10.html`
  par `src/film_v11_patch.py` (nouveaux repères `x1m`, `c1b`, `c1p`, `dice`, `dscale`).
- `son/bruitages-v11.py` : les bruitages (celui de la v10, scène 1 modifiée). Le souffle de « un vrai pari. » a son
  propre tirage au hasard : tous les bruitages suivants sont identiques à ceux de la v10.
- `son/son-v11.py` : le son final. Il part du mix de la v10 (`../v10/son/mix-final.wav`) et n'y change que la
  scène 1 : les nouveaux bruitages sont posés au même niveau et avec la même baisse sous la voix que dans la v10
  (gain retrouvé dans le mix : +3,78 dB, -6,97 dB à pleine voix), et le « t » est adouci. Résultat :
  `son/mix-final-v11.wav` (pas versionné), -16 LUFS comme la v10.
- `reel/` : le même film en vertical pour un Reel Instagram, avec les sous-titres. Voir `reel/README.md`.

## Refaire le film

1. `python3 src/film_v11_patch.py ../v10/src/film-v10.html src/film-v11.html` (écrit aussi `src/cues-v11.json`).
2. `python3 son/bruitages-v11.py src/cues-v11.json son/bruitages-v11.wav`, puis
   `python3 son/son-v11.py ../v10/son/mix-final.wav ../v10/son/voix-off.wav ../v10/son/bruitages.wav son/bruitages-v11.wav son/mix-final-v11.wav`.
3. Les images : seules les 141 premières (0 à 4,7 s) changent. `F0=0 F1=141 FAST=2.80-3.85 FASTSUB=24 node
   ../v10/src/render2.cjs "$PWD/src/film-v11.html" sub 25.54 30 8 0.5 0 2` (et `1 2` en parallèle), puis
   `python3 ../v10/src/blend2.py sub bl 2` ; les images suivantes sont celles de la v10.
4. Site : `ffmpeg -framerate 30 -i images/%05d.png -i son/mix-final-v11.wav -frames:v 766 -c:v libx264 -preset slow
   -crf 21 -pix_fmt yuv420p -c:a aac -b:a 160k -movflags +faststart -shortest hero-v11-1080.mp4`, et pour le
   mobile `-vf scale=1280:720:flags=lanczos -crf 23 -b:a 128k` (hero-v11-720.mp4).
