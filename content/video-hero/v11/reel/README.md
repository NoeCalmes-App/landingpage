# Reel Instagram de la vidéo du hero (v11)

Le film du hero (26 secondes, motion design) refait en vertical pour un Reel Instagram, à la demande de
Noé le 10/10/2026 : « refaite en vertical », avec les sous-titres de la voix.

C'est le même film : même voix, mêmes bruitages, même minutage (les repères du film ne bougent pas). Seule
la mise en page change pour l'écran du téléphone.

## Fichiers

- `reel-noecalmes-v2.mp4` : le Reel, 1080 × 1920, 30 images/s, H.264 et AAC (pas versionné, comme les
  autres vidéos de `content/video-hero/`). La v1 (tirée du film v10) empilait les phrases ; la v2 est tirée du
  film v11 (début recalé sur la voix) et montre une phrase à la fois.
- `couverture-reel.jpg` : la couverture à choisir dans Instagram, dans le style de la miniature du site
  (le fond blanc du film, « Ton app va décoller. » et une courbe qui monte). Tout tient dans le 3:4 du milieu,
  ce que montre la grille du profil.
- `legende.md` : la légende du post.
- `src/` : de quoi refaire le Reel (voir plus bas).

## Ce qui change par rapport au film en 16:9

- Les textes sont plus gros et coupés en lignes courtes (« En 2026, » puis « un vrai pari. », chacun quand
  la voix le dit, comme dans le film v11).
- Une seule phrase à l'écran à la fois, celle que dit la voix (demande de Noé après la v1 : « quand ça parle,
  ça fait trop de texte ») : « On les ouvre une fois… » sort avant « puis plus jamais. », qui prend sa place ;
  « Il sait si la tienne a du potentiel… » sort avant « et comment la faire décoller. ». « 8 apps sur 10 /
  peinent à rapporter 1 000 € par mois. » reste ensemble : c'est une seule phrase.
- « Audit offert » sur une seule ligne, plus petit (Noé), puis « personnalisé, / au premier appel. ».
- Les 10 applications de « 8 apps sur 10 » sont sur deux rangées de cinq ; les deux qui rapportent ne sont
  pas l'une sous l'autre.
- Scène « Noé » : la photo et le prénom en haut, les phrases au milieu, puis « Ton idée » à gauche de la
  courbe « Revenus ».
- Scène « Sa méthode » : le téléphone est au milieu, puis il glisse à gauche quand arrivent la semaine et
  les abonnements.
- Le violet de « Audit offert » naît toujours du téléphone, puis remplit l'écran.

## Les zones d'Instagram

- En haut (jusqu'à 250 px) : l'en-tête des Reels. Aucun texte au-dessus de 260 px.
- En bas (à partir de 1 500 px) : la légende, le nom du compte et la musique. Le bas de l'image reste vide.
- À droite (à partir de 950 px, sous 1 000 px de haut) : les boutons j'aime, commentaire, partage.
- Le contenu tient entre 260 et 1 290 px ; les sous-titres sont juste en dessous, vers 1 350 à 1 430 px.

## Le son

Celui du film v11 (`../son/mix-final-v11.wav`) : même voix et mêmes bruitages que le site, avec le début
recalé, les dés plus bas sous « un vrai pari » et le « t » de « vingt-six » adouci (voir `../README.md`).

## Les sous-titres

Une ligne courte à la fois (2 à 5 mots), dans une pastille bleu nuit, le mot dit par la voix en violet clair.
Les chiffres sont écrits en chiffres (« 8 applications sur 10… », « 1 000 € par mois. »). Ils sont hors de la
« caméra » du film : ils ne tremblent pas avec l'image.

Le calage vient de la voix du film elle-même : `src/mots.py` (faster-whisper, modèle medium, un horodatage
par mot) sur le son du film, et `src/mots_debut.py` pour la première phrase, que whisper sautait sur la
piste entière. `src/sous_titres.py` découpe en morceaux et écrit `src/sous_titres.json`.

## Refaire le Reel

Dans le dossier du film (`content/video-hero/v11/src/`, avec les polices dans `node_modules`, comme pour
le film) :

1. `python3 ../reel/src/reel_patch.py film-v11.html reel.html ../reel/src/sous_titres.json` : le film en
   vertical, avec les sous-titres.
2. `node ../reel/src/render_reel.cjs "$PWD/reel.html" reel_sub 25.54 30 8 0.5 0 2` (et la même commande
   avec `1 2` à la place de `0 2`, en parallèle), avec `FAST=2.80-3.85,16.95-18.20,19.25-20.20,20.80-22.40
   FASTSUB=32` dans l'environnement : 8 sous-images par image, 32 dans les passages rapides.
3. `python3 ../../v10/src/blend2.py reel_sub reel_bl 2` : le flou de mouvement.
4. `ffmpeg -framerate 30 -i reel_bl/%05d.png -i ../son/mix-final-v11.wav -map 0:v -map 1:a -frames:v 766
   -c:v libx264 -preset slow -crf 17 -pix_fmt yuv420p -profile:v high -level 4.1 -c:a aac -b:a 192k
   -movflags +faststart -shortest reel-noecalmes-v2.mp4`.

La couverture : `node ../reel/src/couverture_reel.cjs reel.html couverture.png`.
