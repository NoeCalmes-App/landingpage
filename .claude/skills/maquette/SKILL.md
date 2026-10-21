---
name: maquette
description: Produire une charte graphique et des maquettes d'application mobile ou web a partir d'un cahier des charges et d'un devis. A utiliser des qu'un nouveau projet client (application mobile, application web, ou les deux) demande une direction visuelle, une charte, des ecrans de maquette ou une refonte visuelle d'une maquette existante. Couvre le choix du support, la derivation de l'identite, la validation des couleurs sur cas reels, la construction des ecrans et la checklist de sortie.
---

# Maquette projet

Produit une charte et des maquettes qui ont **l'identite du projet**, pas la moyenne
statistique d'un modele. Ce skill ne fige aucun style : il fige la methode qui en
derive un, different a chaque fois.

La methode est la meme pour une application mobile et pour une application web.
Seuls changent des details, toujours ranges de la meme facon aux etapes 3, 5,
5 bis et 6 : « Pour les deux supports », puis « Application mobile », puis
« Application web ». Un projet qui a les deux suit les trois blocs. Le
vocabulaire et le critere qui decide du support sont dans
`documentation/context/vocabulaire-mobile-web.md`.

## Ce skill et les guides Nowork

Ce skill donne la methode de conception, la meme pour toute maquette et tout
support : identite tiree de l'usage, signe signature, charte validee sur cas
reel, ecran cle d'abord, etats, realisme, regles propres au web. Le guide
Nowork de la version fixe le reste, et ce skill n'en recopie rien : perimetre
des ecrans, ordre des etapes, page client (en-tete, reference, mise en scene,
ce qui ne s'y montre pas), cadre de telephone et ses regles chiffrees, message
ephemere, ecrans que les stores encadrent, logo et icone.

- V1, gratuite, jointe au devis :
  `/Users/noecalmes/Dev/WEB/nowork/documentation/guides/creation-maquette.md`
- V2, apres signature, sur la meme adresse :
  `/Users/noecalmes/Dev/WEB/nowork/documentation/guides/creation-maquette-v2.md`

Savoir d'abord laquelle on produit ; dans le doute, demander a Noe avant de
dessiner. Sur ce que le guide fixe, le guide s'applique. Pour une application
mobile, les ecrans que les stores encadrent suivent le guide V2 des qu'ils sont
dessines, meme dans une V1 ; le message ephemere aussi, pour les deux
supports. Un ecart entre ce skill, le guide et le prompt qui a lance le travail
ne se tranche pas en silence : il se signale a Noe, dans le brief en V2, avant
la livraison en V1.

## Les galeries constatent, elles ne dessinent pas

Une galerie d'applications (Mobbin par son MCP, et les seules autres ressources
de la section « Ressources externes autorisees » du guide V2) sert a constater
ce que fait le secteur : structure d'un parcours, densite, fond clair ou
sombre, place de la photo. Elle ne donne jamais un ecran a decalquer, ni le
signe signature de l'etape 2, qui se tire du produit.

Quand l'ouvrir : en V2, dans l'ordre du guide (avant le brief, ecran qui porte
la valeur compris, puis pendant la production) ; en V1, apres l'etape 2, pour
verifier les ecrans deja resolus (connexion, compte, historique). Sur un ecran
que les stores encadrent, elle montre la mise en page du secteur ; ce qui doit
y figurer vient du guide V2.

## 0. Lire les sources

Cahier des charges et devis, en entier. En extraire, par ecrit, avant de dessiner :

- La cible reelle, dans ses mots a elle, pas « les utilisateurs ».
- Le support : application mobile, application web, ou les deux. Le devis le
  dit ; s'il ne le dit pas, le trancher avec le critere d'arbitrage de
  `vocabulaire-mobile-web.md` et le signaler. Les deux a la fois : une seule
  identite, deux jeux d'ecrans, chacun dans son cadre.
- Les profils : un seul type d'utilisateur, ou plusieurs roles aux droits
  differents. Chaque role dont l'ecran change a ses propres ecrans.
- L'ecran qui porte la valeur. Il y en a un seul (un par role au plus).
- La liste contractuelle des ecrans et le modele economique.
- Les contraintes techniques imposees (carte, SDK, plateformes, navigateurs).

Signaler toute incoherence entre les deux documents avant de continuer.
Un chiffre ou un delai qui differe entre CDC et devis se corrige maintenant.

## 1. Deriver l'identite des contraintes d'usage

Ecrire noir sur blanc les conditions de lecture reelles, puis en deduire les
decisions. Elle dit ce que l'usage impose ; les conventions constatees dans une
galerie disent ce que fait le secteur. Les deux nourrissent les decisions.

| Question | Ce qu'elle decide |
|---|---|
| Ou et comment l'ecran est-il lu ? | Taille de base, contraste, densite |
| Combien de temps dure un regard, ou une session ? | Nombre d'elements par ecran, ecart de hierarchie |
| Une main ou deux ? En mouvement ? Doigt, ou souris et clavier ? | Zone d'atteinte, taille des cibles |
| Qu'est-ce que l'utilisateur regarde vraiment ? | Ce qui domine, ce qui s'efface |
| Quelle donnee est le produit ? | Ce qui merite le plus gros corps de l'ecran |

Exemple mobile, SmoothRide : lu au volant, coup d'oeil sous une seconde, une
main, la carte occupe tout, la donnee produit est un ecart chiffre. D'ou :
chrome flottante, peu d'elements, cibles larges (48 px dans le cadre, environ
59 pt), chiffres tabulaires, mode sombre.

Exemple web, un logiciel de facturation en ligne : lu au bureau, sessions
longues, souris et clavier, la donnee produit est ce qui reste a encaisser.
D'ou : densite elevee, liste ou tableau comme ecran cle, navigation fixe,
statuts en pastilles, montants tabulaires alignes a droite.

Cinq lignes, et la plupart des decisions sont prises par l'usage, avant d'etre
confrontees aux applications du secteur.

## 2. Trouver le signe signature

**Une identite, c'est un signe que le produit est seul a pouvoir revendiquer.**
Chercher la chose que cette application mesure, montre ou transforme, et la dessiner.

- SmoothRide mesure une vibration verticale, donc deux profils de secousse
  alignes sur le meme axe : l'un tressaute, l'autre est lisse.
- Une app de sommeil montre une duree continue, donc un arc.
- Une app de depenses montre une repartition, donc une masse.
- Un logiciel de facturation montre de l'argent attendu, donc un reste qui se vide.

Si aucun signe n'emerge, c'est que l'etape 0 a rate la valeur du produit.
Un signe copiable par un concurrent sans copier le produit n'est pas une signature.

Ailleurs (prompts V1 de Nowork, bibliotheque de themes du guide V2), le mot
« signature » designe aussi un habillage : degrade sur les boutons, sticker,
badge, effet de theme. Ce n'est pas le signe de cette etape, il ne coche pas la
case « Le signe signature est present », et il reste soumis a la checklist
(aucun degrade bleu-violet decoratif). Si un prompt demande un tel degrade,
l'ecart se signale a Noe.

## 3. La charte, validee sur cas reel

La charte ouvre la page de maquette, avant les ecrans, et cette page est lue
par le client : elle montre le sens des choix, jamais la technique. Ce qui s'y
montre et ce qui en est exclu (logo, hex, px, noms de tokens, notes
explicatives) est fixe par le guide V2, section « La page parle au CLIENT ».
Exemple de contenu : `DirectionArtistique` de `src/BailoraMockups.jsx`.
Exemple de code : le composant `Charte` de `src/SmoothRideMockups.jsx`, dont
les echantillons prennent leurs valeurs dans les tokens au lieu de les
recopier (le reste de ce fichier n'est pas un modele : voir « Conventions du
depot »).

Les preuves exigees ci-dessous (contraste, signaux, banc d'essai, verdicts) se
calculent et se tranchent, mais ne s'affichent pas sur cette page : elles
s'ecrivent en commentaire en tete du CSS de charte, et dans le brief en V2
quand elles decident du theme. Aucune maquette du depot ne les produit encore :
la premiere qui le fait devient la reference.

Obligatoire, pour les deux supports :

- **Palette sourcee, jamais inventee.** Partir de Radix Colors, tweakcn ou
  Material Theme Builder. Construire cinq gris a la main donne toujours du plat.
- **Contraste WCAG calcule sur le rendu**, pas estime, a la taille reelle sur
  l'appareil (voir « Verifier l'echelle du cadre », 5 bis). Seuils : 4,5:1 pour
  le texte courant ; 3:1 pour le grand texte (24 px, ou 18,7 px en gras) ; 3:1
  contre la couleur qui le touche pour le contour de focus, une icone ou un
  trait qui porte une information, et le bord d'un champ quand rien d'autre ne
  le signale (WCAG 1.4.3 et 1.4.11). Un etat desactive en est dispense. Sur un
  materiau translucide, le calcul se fait sur le fond compose (5 bis).
- **Signaux distinguables, et jamais portes par la seule couleur.** Deux
  signaux qui se touchent (segments d'un graphe, traces qui se croisent)
  tiennent 3:1 entre eux, ou sont separes par une bordure ou une gaine qui
  l'atteint (WCAG 1.4.11). Chaque statut porte aussi une forme, une icone ou un
  mot (WCAG 1.4.1) : le rouge et le vert, la paire de l'alerte et du succes, se
  confondent pour un daltonien. Regarder la palette en simulation de
  daltonisme. Un ecart CIEDE2000 aide a reperer la paire la plus proche, sans
  seuil : la formule est faite pour les petits ecarts et, au dela d'une dizaine
  d'unites, ne fait pas mieux qu'un simple ecart CIELAB.
- **Le banc d'essai sur le support reel.** Une couleur de trace se juge sur une
  vraie carte, une couleur de graphe sur de vraies donnees, une couleur de
  statut dans un vrai tableau rempli. Jamais sur fond blanc vide. Il peut
  figurer sur la planche s'il se montre sans chiffre (une vraie ligne de liste
  avec ses pastilles).
- **Un verdict ecrit par option testee.** Une charte sans verdict est une planche
  de couleurs, pas une decision. Il s'ecrit avec les preuves, pas sur la page.
- **Echelle typo, rayons, ombres, hauteurs et espacements figes** en tokens
  nommes par role, avant de dessiner le moindre ecran. Les limites sont celles
  des « Regles chiffrees » du guide V2 (pour un ecran web, toutes sauf celles
  du cadre de telephone) ; le rayon d'un element imbrique est un role a part
  entiere (rayons concentriques, 5 bis).
- **Le message ephemere** (ce qui apparait apres une action, se dit et s'en
  va) est un composant de la charte des qu'il apparait, et toujours en V2 :
  tons, position unique, durees, planche « Messages » et ce qui change sur le
  web suivent la section « Le message ephemere » du guide V2.
- **Application mobile en plus : ecran et pouce figes.** L'ecran de reference,
  les zones sures, la marge basse et l'ecart entre deux cibles sont ceux des
  « Regles chiffrees » du guide V2. S'y ajoutent la hauteur de la barre
  d'onglets et la cible minimale : 44 pt sur iOS, 48 dp sur Android.
- **Application web en plus : largeur, densite et cibles figees.** Largeur
  maximale du contenu, points de rupture (ordinateur, tablette, telephone),
  hauteur d'une ligne de tableau, cible minimale : 24 x 24 px a la souris
  (WCAG 2.5.8), 44 px au doigt a largeur de telephone ou de tablette. Une icone
  plus petite garde une zone cliquable a cette taille.

## 4. L'ecran cle, seul

Construire uniquement l'ecran qui porte la valeur, et le finir. S'il est evident
et beau, tout le reste en decoule. Commencer par l'onboarding ou par la page de
connexion est l'erreur type : on peaufine trois ecrans sans interet avant de
decouvrir que le coeur ne marche pas.

Sur cet ecran :

- La donnee produit est le plus gros element, apres l'image de fond s'il y en a une.
- Un seul point d'entree pour l'oeil. Deux elements accentues = zero accentuation.
- Ce qui sert de reference doit s'effacer (opacite, desaturation), pas concurrencer.
- Le signe signature de l'etape 2 est present.

## 5. Les autres ecrans, et surtout les etats

Etendre au perimetre que fixe le guide de la version (voir « Ce skill et les
guides Nowork »). Les etats ne sont pas optionnels, ce sont eux qui separent
une maquette professionnelle d'une jolie image.

Pour les deux supports : vide, chargement, erreur reseau, resultat nul,
limite atteinte, acces refuse a un role quand il y en a plusieurs, et lien ou
code expire ou deja utilise quand l'application en envoie par e-mail
(invitation, mot de passe oublie, connexion sans mot de passe).

Application mobile en plus : permission refusee, hors connexion. Les ecrans
que les stores encadrent ne se copient ni sur une galerie ni sur une ancienne
maquette : des qu'ils sont dessines, ils suivent leur section du guide V2. Ce
sont l'ecran Reglages et ses interrupteurs d'autorisations, l'ecran
d'abonnement et l'issue de l'achat, l'ecran de connexion iOS et l'icone
Android (« Le logo », point 5).

Application mobile nee de l'app modele (cas courant depuis le 19/10/2026) :
AUCUN ecran ne precede une fenetre du systeme. Elle s'ouvre au toucher de
l'interrupteur de la section « Autorisations » des Reglages, ou de la
fonction qui en a besoin ; rien avant (ni explication, ni « Autoriser », ni
« Plus tard »), rien apres un refus qu'un message « Reglages ». Un projet qui
garde un tel ecran par exception : un seul bouton « Continuer », ni croix ni
fleche de retour. Les choix qui changent des ecrans (mode d'entree du compte,
Apple et Google, abonnements, notifications, autorisations et leur raison,
questions d'inscription en pages, messages de connexion precis ou neutres,
site des pages legales, identite de l'editeur d'apres le Kbis) se posent dans
le brief, AVANT le premier ecran, et la fin de session rend le bloc JSON pour
la fiche Nowork : guide V2, « Les choix du projet ».
Les elements communs se dessinent une fois et se montrent sur la page :
messages ephemeres (succes, avertissement, erreur, information, avec et sans
action, dont « Reessayer » et « Reglages »), fenetre de confirmation normale
et destructive, interrupteurs des autorisations, pages de questions
(« Terminer » a la derniere, fleche vers la page precedente des la deuxieme),
chargement, vide, erreur sous un champ, bandeau hors ligne en haut avec sa
croix. Regles du modele : jamais d'erreur technique a l'ecran, pas de case des
CGU (la ligne « En continuant, tu acceptes… »), ni « Se deconnecter » ni
« Supprimer mon compte » sur les pages de questions, une fin de session est un
message d'information et jamais une page fixe, ni « Licences » ni « Offres et
nouveautes » dans les Reglages (sauf la categorie promotions), prenom et nom
jamais obligatoires apres Apple.

Application web en plus : session expiree, page introuvable (adresse inconnue
ou element supprime), erreur de saisie sur un formulaire long, et paiement
refuse ou non abouti si l'application encaisse par carte.

Application web qui vend un abonnement a des particuliers (le devis le dit) :
l'ecran d'achat porte, avant le bouton, le prix TTC et sa periodicite, la
reconduction, le lien vers les CGV et l'information sur la retractation. Le
bouton dit le paiement sans ambiguite (« Commande avec obligation de
paiement » ou « Payer et m'abonner », jamais « Valider » ni « Commander »
seul). Le compte montre « Resilier votre contrat », puis un recapitulatif, puis
le bouton qui notifie la resiliation. C'est le droit de la consommation
(articles L221-14 et L215-1-1), pas une regle de store : ni « Restaurer un
achat », ni renvoi vers Apple ou Google. Ces ecrans se dessinent meme absents
du CDC, et l'ajout se dit a Noe. Entre professionnels, rien de ce bloc n'est
impose a l'ecran.

## 5 bis. Ce qui fait qu'une maquette sonne vraie

Ces points sont ceux qui manquent quand une maquette ressemble a une planche
de specification plutot qu'a une application. Ils sont invisibles un par un et
decisifs ensemble.

Pour les deux supports :

- **Materiau, pas carton.** Ce qui flotte sur une carte ou une photo (barre,
  bouton, feuille, panneau) est un materiau (`backdrop-filter: blur`), avec un
  lisere clair d'un pixel sur l'arete haute. Un rectangle opaque a bordure 1px
  se lit comme du carton colle. Une feuille ou un panneau qui porte du texte
  prend un materiau epais, presque opaque (la feuille de SmoothRide est a 94 %),
  et son contraste se calcule sur le fond compose : la surface a son opacite,
  posee sur la zone la plus claire puis la plus sombre du media reel. Le
  message ephemere, lui, est opaque (guide V2).
- **Gaine sous les traces.** Toute ligne de couleur posee sur une carte a un
  contour sombre plus large en dessous. Sans elle, la couleur se dissout dans
  le fond. C'est le premier detail qui trahit une fausse app de navigation.
- **Rayons concentriques.** Rayon interieur = rayon exterieur moins le padding.
  Un 12 dans un 22 avec 14 de padding se voit, meme sans savoir pourquoi.
- **Cadrer le media sur la zone visible.** Une carte centree sur son contenu
  place ce contenu au milieu de l'image, donc derriere la feuille ou le panneau.
  Decaler la camera pour que l'essentiel tombe dans la zone reellement visible.
- **Le credit de la carte reste visible.** Le logo et l'attribution du
  fournisseur (Mapbox, Google Maps, OpenStreetMap) restent dans la partie
  visible de la carte, hors de la feuille ou du panneau, ni reduits ni
  estompes : c'est une condition du fournisseur, pas un choix de design. Une
  feuille qui monte les remonte avec elle.
- **Verifier l'echelle du cadre.** Facteur = largeur de l'ecran dessine /
  largeur de reference. L'ecran dessine exclut la coque : bordure d'un cadre en
  `border-box`, ou padding d'une coque exterieure. SmoothRide : cadre de 336 px
  a bordure de 9 px, donc 318 px pour son ecran de 393 pt, 0,81 (et non le
  0,855 de son CSS, mesure sur la coque). Bailora : 304 px pour 390 pt, 0,78.
  Web : une page de 1440 px dans une fenetre de 960 px, 0,67. Toute taille, et
  d'abord toute cible, se convertit avant d'etre comparee a un minimum. Juger
  sans convertir mene a des conclusions fausses dans les deux sens.

Application mobile :

- **Un vrai ecran de telephone.** Barre d'etat (heure, reseau, batterie), safe
  area et indicateur home. Sans eux, ce n'est pas un ecran de telephone.
- **Navigation a portee du pouce.** Barre d'onglets en bas, l'element actif
  marque ; l'action principale en bas de l'ecran, pas en haut.
- **Ratio contenu / contexte.** Si l'app est portee par une carte, une photo ou
  un graphe, la feuille de decision ne depasse pas la moitie de l'ecran.
  Verifier au pixel, pas a l'oeil : c'est le defaut le plus frequent.
- **Le formulaire avec son clavier.** Au moins un formulaire montre clavier
  ouvert, le champ actif visible au-dessus.
- **Le detail par-dessus la liste.** Sur telephone, la decision s'ouvre en
  plein ecran avec un retour, ou dans une feuille posee sur la liste.

Application web :

- **Une vraie fenetre de navigateur, sur l'appareil de la cible.** Le cadre
  suit l'etape 1 : fenetre d'ordinateur pour un usage au bureau, cadre de
  telephone pour un usage surtout sur telephone (une administration reste sur
  ordinateur). Dans les deux, la barre d'adresse porte le nom de domaine du
  produit : c'est elle qui distingue la page d'une application a installer, et
  sans elle une page web se lit comme une affiche. Pas de cadenas : Safari
  (depuis 18.4) et Chrome (depuis 117) n'en affichent plus pour un site en
  HTTPS. Cadres a reprendre : « Conventions du depot ».
- **Navigation persistante.** Barre laterale ou barre haute, l'element actif
  marque, le compte et son role toujours visibles.
- **Densite d'outil de travail.** Recherche, filtres, tri et pagination sur les
  listes ; une hauteur de ligne fixe ; les montants alignes a droite. Une liste
  de trois lignes aerees ne ressemble a aucun outil reel : la remplir.
- **Le glisser a son double sans glisser.** Un tableau Kanban, un planning ou
  une liste triable montre aussi un menu « Deplacer vers » ou des fleches,
  actionnables par simples clics (WCAG 2.5.7). Au doigt, c'est souvent le seul
  geste fiable.
- **Survol et focus visibles, jamais indispensables.** Un bouton sans etat de
  survol ni contour de focus clavier n'est pas fini. Le survol decore, il ne
  cache rien : une action de ligne est visible en permanence ou rangee dans un
  menu « ... » visible, y compris a largeur de telephone, ou il n'y a pas de
  survol. Une info-bulle ne porte rien d'indispensable et s'ouvre aussi au
  focus clavier.
- **Le formulaire se lit sans deviner.** Chaque champ a son libelle visible
  au-dessus, jamais le seul texte indicatif, qui disparait a la saisie. Un
  champ facultatif porte « (facultatif) ». Une erreur s'ecrit contre son champ,
  en texte et avec une icone, et dit quoi faire ; un long formulaire en erreur
  ouvre sur un recapitulatif dont chaque ligne mene a son champ. Rien ne se
  ressaisit : une information deja donnee est reprise ou proposee. La connexion
  accepte le collage et le gestionnaire de mots de passe.
- **Largeur de lecture.** Le texte courant ne depasse pas 70 caracteres par
  ligne ; le contenu ne s'etire pas sur toute la largeur d'un grand ecran.
- **Le detail a cote de la liste.** Sur ordinateur, la decision s'ouvre dans un
  panneau lateral ou une fenetre, et la liste dont elle vient reste visible.
- **La meme page sur telephone.** Une application web s'ouvre aussi depuis un
  telephone : montrer au moins l'ecran cle et un formulaire a 390 px de large.
  A 320 px (un ordinateur zoome a 400 %, WCAG 1.4.10), rien ne defile
  horizontalement, sauf un tableau dans son propre cadre : ses lignes passent
  en cartes, ou il defile seul ; le titre, la recherche, les filtres et la
  pagination autour de lui passent a la ligne.

## 6. Checklist de sortie

Refuser de livrer tant qu'un point echoue.

Pour les deux supports :

- [ ] Aucune couleur inventee a la main ; toutes issues d'une echelle sourcee.
- [ ] Gris non lineaires.
- [ ] Contrastes tenus a taille reelle, aux seuils de l'etape 3 ; aucun statut
      porte par la seule couleur.
- [ ] Rayons, ombres, hauteurs et espacements en tokens, dans les limites des
      « Regles chiffrees » du guide V2 ; aucune valeur posee au juge dans un
      ecran.
- [ ] Aucun degrade bleu-violet decoratif.
- [ ] Au moins deux graisses de typo reellement utilisees.
- [ ] Chiffres en `tabular-nums` partout ou une valeur se met a jour ou s'aligne.
- [ ] Cibles et ecarts aux minimums de l'etape 3 pour le support concerne,
      mesures apres conversion a l'echelle du cadre.
- [ ] Le signe signature est present sur l'ecran cle.
- [ ] Tous les etats de l'etape 5 existent pour le support concerne.
- [ ] Message ephemere conforme au guide V2 des qu'il apparait ; en V2, planche
      « Messages » reliee depuis la page.
- [ ] Feuilles et panneaux sur media : materiau (flou et lisere), epais des
      qu'ils portent du texte, contraste verifie sur la zone la plus claire et
      la plus sombre du media.
- [ ] Traces sur carte : gaine sombre presente.
- [ ] Carte : logo et attribution du fournisseur visibles hors de la feuille ou
      du panneau, ni reduits ni estompes.
- [ ] Rayons interieurs concentriques avec les exterieurs.
- [ ] Un ecran par role la ou ce qu'on voit change.
- [ ] Test du coup d'oeil : une seconde de regard sur une capture, l'action
      principale est evidente.
- [ ] `npm run build` passe (Vite puis `scripts/generate-routes.js` ;
      `npx vite build` saute ce second script), et
      `dist/maquette/<slug>/index.html` existe avec `noindex, nofollow`, de
      meme pour chaque alias.

Application mobile :

- [ ] Barre d'etat, safe area basse et indicateur home presents ; marge basse
      conforme au guide V2.
- [ ] Barre d'onglets en bas, element actif marque.
- [ ] La feuille de decision occupe la moitie de l'ecran au maximum.
- [ ] Un formulaire montre clavier ouvert, champ actif visible.
- [ ] Ecrans que les stores encadrent (abonnement et issue de l'achat,
      Reglages, connexion iOS, icone Android) conformes au guide V2, quand ils
      sont dessines.
- [ ] App nee de l'app modele : aucun ecran avant une autorisation ; interrupteurs
      de la section « Autorisations » dessines dans leurs etats (eteint, allume,
      refus definitif avec sa ligne d'action) ; message « Reglages » dessine.
- [ ] App nee de l'app modele : choix du projet poses au brief et valides, page
      « Choix du projet » sur le dossier de conception, bloc JSON rendu a Noe
      dans le chat (jamais sur la page publiee : il porte le Kbis).
- [ ] Elements communs montres une fois : messages, confirmations, pages de
      questions, etats, bandeau hors ligne.

Application web :

- [ ] Cadre de navigateur avec le nom de domaine du produit, sans cadenas.
- [ ] Navigation persistante, element actif marque, compte et role visibles.
- [ ] Listes remplies avec recherche, filtres, tri et pagination ; hauteur de
      ligne fixe, montants alignes a droite.
- [ ] Etats de survol et de focus dessines ; aucune action ni information
      accessible seulement au survol.
- [ ] Tout glisser-deposer a son equivalent en simples clics.
- [ ] Formulaires : libelle visible sur chaque champ, « (facultatif) » sur les
      champs optionnels, erreur ecrite contre son champ et qui dit quoi faire.
- [ ] Texte courant a 70 caracteres par ligne au maximum.
- [ ] L'ecran cle et un formulaire montres aussi a 390 px ; a 320 px, aucun
      defilement horizontal hors du cadre d'un tableau.
- [ ] Abonnement vendu a des particuliers : ecran d'achat et resiliation de
      l'etape 5.

Projet mobile et web :

- [ ] Une seule identite : meme palette, meme typo, meme signe signature sur
      les deux jeux d'ecrans.
- [ ] Chaque ecran est dans le cadre du support que le devis lui donne, et
      chaque jeu passe sa propre liste ci-dessus.

## Conventions du depot

- Un fichier `<Projet>Mockups.jsx` + un `<projet>-mockups.css` par projet, ecrans
  mobiles et web dans le meme fichier quand le projet a les deux.
- References du depot, a reprendre pour la structure et la finition, jamais
  pour les couleurs ni le contenu :
  - page de maquette (hero, galerie, routage) et cadre de telephone : Aretha
    (`src/ArethaMockups.jsx`), refaite sur l'architecture de Bailora ;
  - base de code (composants partages, `FLOWS`, `goTo()`, tokens) : Bailora
    (`src/BailoraMockups.jsx`), point de depart impose par le guide V2 ;
  - planche de charte : contenu de `DirectionArtistique` (Bailora), code de
    `Charte` (`src/SmoothRideMockups.jsx`), qui lit ses valeurs dans les tokens ;
  - fenetre d'ordinateur : `VC_EXTRA_DESKS` de `src/vietcollab-extra-screens.js`
    (classes `.vd-*`) ; page web sur telephone : le `PhoneFrame` de
    `src/VietCollabMockups.jsx`, barre d'adresse en bas (`vc-browser-chrome`).
    VietCollab est ecrit en chaine HTML : en reprendre la structure, pas la
    forme de code.
- Ce qui n'est PAS un modele dans ces references (dessine avant les regles des
  stores) : dans `src/SmoothRideMockups.jsx`, la carte « Le logo », les hex, les
  px et les notes de la planche `Charte`, ses tokens nommes par couleur
  (`--jade`, `--rouge`), l'ecran Permission (« Autoriser », « Plus tard » et
  fleche de retour, motif refuse par Apple le 15/10/2026 ; et, pour une app
  nee de l'app modele, l'ecran Permission lui-meme : il n'existe plus,
  19/10/2026), l'ecran Abonnement
  (prix en dur, « Restaurer un achat » sous le bouton, phrases rassurantes,
  aucun lien legal), l'ecran Compte (ni suppression du compte ni version) et la
  carte a l'attribution Mapbox reduite ou masquee (exception acceptee pour ce
  projet seul) ; le cadenas des barres d'adresse d'Aretha et de VietCollab.
- Tokens CSS nommes **par role** (`--accent`, `--danger`), jamais par couleur.
  Changer de theme doit se faire sans toucher un ecran.
- Route `/maquette/<slug>` declaree dans `src/App.jsx` par trois ajouts, sur le
  modele des maquettes voisines : import `lazy`, detection de l'adresse, rendu
  dans `Suspense`. Rien a ajouter dans `scripts/generate-routes.js`, meme si
  une consigne plus ancienne parle d'un tableau `mockupRoutes` : il lit chaque
  `'/maquette/...'` d'App.jsx et genere sa page en noindex, a condition que
  l'adresse soit entre apostrophes droites, en minuscules, chiffres et tirets.
  Sans cette page, le lien partage n'a pas d'apercu.
- Commentaires en francais, expliquant **pourquoi** une decision a ete prise,
  pas ce que fait la ligne.
