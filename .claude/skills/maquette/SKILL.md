---
name: maquette
description: Produire une charte graphique et des maquettes d'application mobile a partir d'un cahier des charges et d'un devis. A utiliser des qu'un nouveau projet client demande une direction visuelle, une charte, des ecrans de maquette ou une refonte visuelle d'une maquette existante. Couvre la derivation de l'identite, la validation des couleurs sur cas reels, la construction des ecrans et la checklist de sortie.
---

# Maquette projet

Produit une charte et des maquettes qui ont **l'identite du projet**, pas la moyenne
statistique d'un modele. Ce skill ne fige aucun style : il fige la methode qui en
derive un, different a chaque fois.

## Regle qui prime sur tout le reste

Ne jamais ouvrir une galerie d'inspiration avant l'etape 2. Les bibliotheques
(shadcn, Mobbin, Dribbble) servent uniquement aux ecrans **deja resolus** :
parametres, compte, paywall, historique. Sur l'ecran qui porte la valeur du
produit, il n'existe rien a copier, et copier produit du generique.

## 0. Lire les sources

Cahier des charges et devis, en entier. En extraire, par ecrit, avant de dessiner :

- La cible reelle, dans ses mots a elle, pas « les utilisateurs ».
- L'ecran qui porte la valeur. Il y en a un seul.
- La liste contractuelle des ecrans et le modele economique.
- Les contraintes techniques imposees (carte, SDK, plateformes).

Signaler toute incoherence entre les deux documents avant de continuer.
Un chiffre ou un delai qui differe entre CDC et devis se corrige maintenant.

## 1. Deriver l'identite des contraintes d'usage

Ecrire noir sur blanc les conditions de lecture reelles, puis en deduire les
decisions. C'est cette etape qui remplace l'inspiration.

| Question | Ce qu'elle decide |
|---|---|
| Ou et comment l'ecran est-il lu ? | Taille de base, contraste, densite |
| Combien de temps dure un regard ? | Nombre d'elements par ecran, ecart de hierarchie |
| Une main ou deux ? En mouvement ? | Zone d'atteinte, taille des cibles |
| Qu'est-ce que l'utilisateur regarde vraiment ? | Ce qui domine, ce qui s'efface |
| Quelle donnee est le produit ? | Ce qui merite le plus gros corps de l'ecran |

Exemple SmoothRide : lu au volant, coup d'oeil sous une seconde, une main, la
carte occupe tout, la donnee produit est un ecart chiffre. D'ou : chrome
flottante, peu d'elements, cibles a 48 px, chiffres tabulaires, mode sombre.

Cinq lignes, et 80 % des decisions sont prises sans avoir regarde une seule app.

## 2. Trouver le signe signature

**Une identite, c'est un signe que le produit est seul a pouvoir revendiquer.**
Chercher la chose que cette app mesure, montre ou transforme, et la dessiner.

- SmoothRide mesure une vibration verticale, donc deux profils de secousse
  alignes sur le meme axe : l'un tressaute, l'autre est lisse.
- Une app de sommeil montre une duree continue, donc un arc.
- Une app de depenses montre une repartition, donc une masse.

Si aucun signe n'emerge, c'est que l'etape 0 a rate la valeur du produit.
Un signe copiable par un concurrent sans copier le produit n'est pas une signature.

## 3. La charte, validee sur cas reel

Creer `/charte/<projet>` (page autonome, noindex, ajoutee dans
`scripts/generate-routes.js`). Voir `SmoothRideCharte.jsx` comme reference.

Obligatoire :

- **Palette sourcee, jamais inventee.** Partir de Radix Colors, tweakcn ou
  Material Theme Builder. Construire cinq gris a la main donne toujours du plat.
- **Contraste WCAG calcule dans la page**, pas estime.
- **Ecart CIEDE2000 entre les couleurs semantiques.** Le WCAG mesure un texte
  sur un fond ; il ne dit rien de deux signaux poses cote a cote. Seuils de
  travail : 40 pour deux signaux a distinguer sans les regarder, 25 en dessous
  duquel la confusion est acquise. Ce sont des conventions, pas des normes :
  le classement compte plus que le chiffre.
- **Le banc d'essai sur le support reel.** Une couleur de trace se juge sur une
  vraie carte, une couleur de graphe sur de vraies donnees. Jamais sur fond blanc.
- **Un verdict ecrit par option testee.** Une charte sans verdict est une planche
  de couleurs, pas une decision.
- **Echelle typo, rayons, espacements figes** avant de dessiner le moindre ecran.
  Deux rayons maximum, une seule regle d'elevation, un pas d'espacement.

## 4. L'ecran cle, seul

Construire uniquement l'ecran qui porte la valeur, et le finir. S'il est evident
et beau, tout le reste en decoule. Commencer par l'onboarding est l'erreur type :
on peaufine trois ecrans sans interet avant de decouvrir que le coeur ne marche pas.

Sur cet ecran :

- La donnee produit est le plus gros element apres l'image de fond.
- Un seul point d'entree pour l'oeil. Deux elements accentues = zero accentuation.
- Ce qui sert de reference doit s'effacer (opacite, desaturation), pas concurrencer.
- Le signe signature de l'etape 2 est present.

## 5. Les autres ecrans, et surtout les etats

Etendre au perimetre contractuel. Les etats ne sont pas optionnels, ce sont eux
qui separent une maquette professionnelle d'une jolie image :

vide, chargement, erreur reseau, permission refusee, resultat nul,
limite atteinte, hors ligne.

## 5 bis. Ce qui fait qu'une maquette mobile sonne vraie

Ces points sont ceux qui manquent quand une maquette ressemble a une planche
de specification plutot qu'a une app. Ils sont invisibles un par un et
decisifs ensemble.

- **Materiau, pas carton.** Une feuille posee sur une carte ou une photo est
  translucide (`backdrop-filter: blur`), avec un liseré clair d'un pixel sur
  l'arete haute. Un rectangle opaque a bordure 1px se lit comme du carton colle.
- **Gaine sous les traces.** Toute ligne de couleur posee sur une carte a un
  contour sombre plus large en dessous. Sans elle, la couleur se dissout dans
  le fond. C'est le premier detail qui trahit une fausse app de navigation.
- **Rayons concentriques.** Rayon interieur = rayon exterieur moins le padding.
  Un 12 dans un 22 avec 14 de padding se voit, meme sans savoir pourquoi.
- **Safe area et indicateur home.** Sans eux, ce n'est pas un ecran iOS.
- **Ratio contenu / contexte.** Si l'app est portee par une carte, une photo ou
  un graphe, la feuille de decision ne depasse pas la moitie de l'ecran.
  Verifier au pixel, pas a l'oeil : c'est le defaut le plus frequent.
- **Cadrer le media sur la zone visible.** Une carte centree sur son contenu
  place ce contenu au milieu de l'image, donc derriere la feuille. Decaler la
  camera pour que l'essentiel tombe dans la bande reellement visible.
- **Verifier l'echelle du cadre.** Un cadre de maquette a 290 px pour un ecran
  de 393 pt applique un facteur 0,74. Juger une taille sans convertir mene a
  des conclusions fausses dans les deux sens.

## 6. Checklist de sortie

Refuser de livrer tant qu'un point echoue.

- [ ] Aucune couleur inventee a la main ; toutes issues d'une echelle sourcee.
- [ ] Gris non lineaires.
- [ ] Deux rayons maximum sur tout le produit.
- [ ] Une seule regle d'ombre, pas une ombre douce sur chaque bloc.
- [ ] Aucun degrade bleu-violet decoratif.
- [ ] Au moins deux graisses de typo reellement utilisees.
- [ ] Tous les espacements sont des multiples du pas defini.
- [ ] Chiffres en `tabular-nums` partout ou une valeur se met a jour.
- [ ] Cibles tactiles conformes au contexte d'usage.
- [ ] Le signe signature est present sur l'ecran cle.
- [ ] Tous les etats de l'etape 5 existent.
- [ ] Feuilles sur media : materiau translucide, pas fond opaque.
- [ ] Traces sur carte : gaine sombre presente.
- [ ] Rayons interieurs concentriques avec les exterieurs.
- [ ] Safe area basse et indicateur home presents.
- [ ] La feuille de decision occupe la moitie de l'ecran au maximum.
- [ ] Test du coup d'oeil : une seconde de regard sur une capture, l'action
      principale est evidente.
- [ ] `npx vite build` passe.

## Conventions du depot

- Un fichier `<Projet>Mockups.jsx` + un `<projet>-mockups.css` par projet.
- Tokens CSS nommes **par role** (`--accent`, `--danger`), jamais par couleur.
  Changer de theme doit se faire sans toucher un ecran.
- Routes maquette et charte declarees dans `scripts/generate-routes.js`, noindex.
- Commentaires en francais, expliquant **pourquoi** une decision a ete prise,
  pas ce que fait la ligne.
