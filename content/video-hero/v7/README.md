# Vidéo hero v7

Film de 26 secondes en motion design, sous le bouton « J'ai une idée d'application » du hero.
Voix off et bruitages, pas de musique. C'est la version en ligne sur le site.

## Fichiers

- `hero-film-v7.mp4` : la vidéo finale en 1080p, avec la voix off et les bruitages.
- Sur le site : `public/assets/videos/hero-v7-1080.mp4` (ordinateur), `hero-v7-720.mp4` (mobile), et les deux affiches `hero-v7-poster.jpg` et `hero-v7-poster-960.jpg`.
- `son/` : la voix off seule, les bruitages seuls, le mix final et les scripts du son.
- `src/` : la source de l'animation (`film-v7.html`, repères de la voix inclus), les repères (`cues-v7.json`, calculés par `timeline.py`) et les scripts de rendu. Pour l'ouvrir : mettre les polices `@fontsource/plus-jakarta-sans`, `@fontsource-variable/libre-baskerville` et `@fontsource/geist-mono` dans un `node_modules` à côté du fichier.

## Le texte dit par la voix

« Créer ton application mobile ou ton SaaS en 2026 est un vrai pari. Aujourd'hui, huit applications sur dix… peinent à rapporter mille euros par mois. On les ouvre une fois… puis plus jamais. Noé, lui, voit passer une dizaine d'idées par semaine. Il sait si la tienne a du potentiel… et comment la faire décoller. Grâce à une stratégie et des écrans pensés pour que tes utilisateurs reviennent chaque jour… et paient chaque mois. Noé t'offre un audit personnalisé de ton idée au premier appel. »

On garde « Noé t'offre » à la fin : « Il t'offre » s'entend comme « Ils t'offrent » (les utilisateurs de la phrase d'avant), et finir sur son nom signe l'offre.

## Ce qu'on voit

1. « Créer ton application mobile ou ton SaaS » avec un site et une application, puis « En 2026, un vrai pari. » : le site et l'application s'en vont, puis deux dés sont lancés, rebondissent et s'arrêtent.
2. Fond violet : « 8 sur 10 applications peinent à rapporter 1 000 € par mois. » 10 points blancs apparaissent, 2 seulement s'allument.
3. « Ouvertes une fois. Jamais rouvertes. » (deux lignes centrées) : l'application est ouverte une fois, fermée, puis son icône s'éteint.
4. Fond blanc : Noé, une dizaine d'idées qui passent, puis « Ton idée » et une courbe « Revenus » qui décolle.
5. « Sa méthode : Stratégie + écrans ». L'application se transforme, puis « Ils reviennent chaque jour. » (la semaine s'allume) et, à la même place, « Ils paient chaque mois. » (3 abonnements renouvelés).
6. Fond violet : « Audit offert, personnalisé, au premier appel. Sans engagement. »

Règle de montage : chaque scène sort entièrement avant que la suivante arrive, juste après le dernier mot de sa phrase. Une seule idée à l'écran à la fois.

## Le son

La voix d'abord. Un bruitage pour chaque entrée et chaque sortie, calé sur l'image la plus rapide du mouvement (début d'une entrée, fin d'une sortie). « 8 sur 10 » : un souffle quand le violet monte, un impact court et net sur le chiffre, un petit clic sec par point (même hauteur, pas de mélodie), un seul « ding » doux pour les 2 qui réussissent. Les dés claquent à chaque rebond. Pas de suites de notes. Mixés 11 LU sous la voix, le tout à -16 LUFS.

Voix : MiniMax Speech 2.8 HD, voix française « Casual Man », émotion Happy, vitesse 1,12, générée sur minimax.io. Le t de « vingt-six », avalé par la synthèse, a été remis au montage. La dernière phrase vient d'une prise séparée, raccordée au même timbre.

Source du chiffre « 8 sur 10 » (plus affichée à l'écran) : RevenueCat, State of Subscription Apps 2024, applications à abonnement (17,2 % dépassent 1 000 $ par mois).
