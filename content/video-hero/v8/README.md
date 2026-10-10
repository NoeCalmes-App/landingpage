# Vidéo hero v8

Film de 26 secondes en motion design, sous le bouton « J'ai une idée d'application » du hero.
Voix off et bruitages, pas de musique. C'est la version en ligne sur le site.

## Fichiers

- `hero-film-v8.mp4` : la vidéo finale en 1080p, avec la voix off et les bruitages.
- Sur le site : `public/assets/videos/hero-v8-1080.mp4` (ordinateur), `hero-v8-720.mp4` (mobile), et les deux affiches `hero-v8-poster.jpg` et `hero-v8-poster-960.jpg`.
- `son/` : la voix off seule, les bruitages seuls, le mix final et les scripts du son.
- `src/` : la source de l'animation (`film-v8.html`, repères de la voix inclus), les repères (`cues-v8.json`) et les scripts de rendu. Pour l'ouvrir : mettre les polices `@fontsource/plus-jakarta-sans`, `@fontsource-variable/libre-baskerville` et `@fontsource/geist-mono` dans un `node_modules` à côté du fichier.

## Le texte dit par la voix

« Créer ton application mobile ou ton SaaS en 2026 est un vrai pari. Aujourd'hui, huit applications sur dix… peinent à rapporter mille euros par mois. On les ouvre une fois… puis plus jamais. Noé, lui, voit passer une dizaine d'idées par semaine. Il sait si la tienne a du potentiel… et comment la faire décoller. Grâce à une stratégie et des écrans pensés pour que tes utilisateurs reviennent chaque jour… et paient chaque mois. Un audit personnalisé de ton idée est offert au premier appel. »

Le prénom n'est dit qu'une fois (« Noé, lui… ») : la dernière phrase ne le répète plus.

## Ce qu'on voit

1. « Créer ton application mobile ou ton SaaS » avec un site et une application, puis « En 2026, un vrai pari. » : le site et l'application s'en vont, puis deux dés sont lancés, rebondissent et s'arrêtent.
2. Fond violet : « 8 apps sur 10 » en grand, et 10 applications en une ligne. Sur « peinent », 8 deviennent grises et 2 restent blanches. Dessous : « peinent à rapporter 1 000 € par mois. », avec « 1 000 € par mois » surligné.
3. « Ouvertes une fois. Jamais rouvertes. » (deux lignes centrées, « une fois » et « Jamais » surlignés) : l'application est ouverte une fois, fermée, puis son icône s'éteint.
4. Fond blanc : Noé, une dizaine d'idées qui passent, puis « Ton idée ». Quand la voix dit « potentiel », une jauge « Potentiel » se remplit sous l'idée, puis une courbe « Revenus » décolle.
5. « Sa méthode : Stratégie + écrans ». L'application se transforme, puis « Ils reviennent chaque jour. » (la semaine s'allume) et, à la même place, « Ils paient chaque mois. » (3 abonnements renouvelés).
6. Fond violet : « Audit offert, personnalisé, au premier appel. Sans engagement. »

Règles de montage : chaque scène sort entièrement avant que la suivante arrive, juste après le dernier mot de sa phrase. Une seule idée à l'écran à la fois. Ce qu'il faut retenir est surligné au moment où la voix le dit (bloc blanc, texte violet) ; sur fond blanc, ce sont les mots en dégradé violet.

## Le son

La voix d'abord. Un bruitage pour chaque entrée et chaque sortie, calé sur l'image la plus rapide du mouvement. « 8 apps sur 10 » : un souffle quand le violet monte, un impact court et net sur le titre, un petit clic sec par application (même hauteur, pas de mélodie), un souffle qui descend quand 8 deviennent grises. La jauge « Potentiel » : un petit pop et un souffle qui monte pendant qu'elle se remplit. Un trait de feutre léger pour chaque surlignage. Pas de suites de notes. Mixés 11 LU sous la voix, le tout à -16 LUFS.

Voix : MiniMax Speech 2.8 HD, voix française « Casual Man », émotion Happy, vitesse 1,12, générée sur minimax.io. Le t de « vingt-six », avalé par la synthèse, a été remis au montage. La dernière phrase vient d'une prise séparée (la plus proche du timbre du reste parmi six), raccordée dans le silence après « mois ».

Source du chiffre « 8 sur 10 » (pas affichée à l'écran) : RevenueCat, State of Subscription Apps 2024, applications à abonnement (17,2 % dépassent 1 000 $ par mois).
