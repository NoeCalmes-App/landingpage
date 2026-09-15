# Guides clients « Nom de domaine »

Les deux guides ne sont plus des PDF orphelins : **leur texte est du code**, et
le PDF se refabrique.

```bash
npm run generer-guides
```

| Fichier | Famille | Pages |
| --- | --- | --- |
| `Achat nom de domaine.pdf` | app-mobile | 2 |
| `Achat nom de domaine - site web.pdf` | app-web | 2 |

- **Le texte** : `scripts/guides/contenu.mjs`
- **La mise en page** : `scripts/generer-guides.mjs`
- **La sortie** : `public/assets/documents/guides/`

## ⚠️ Pourquoi ils ont été refaits

Les deux guides sortaient d'un outil de mise en page, **sans aucune source dans
le dépôt** : trois pages, six polices embarquées, des captures. On ne pouvait ni
les relire, ni les comparer, ni corriger une faute sans rouvrir un outil qu'on
ne retrouvait pas. Une erreur dans un guide client se voyait chez le client et y
restait.

Chrome imprime maintenant du HTML en PDF, avec **les polices d'origine** (Plus
Jakarta Sans pour les titres, Lato pour le texte) : le document reste dans la
même famille visuelle que les cinq autres de l'espace client, et son contenu se
relit en clair.

## Ce qui a changé le 15 septembre 2026

**TOUTE LA SECTION « BRANCHER LE DOMAINE SUR LE SITE » A DISPARU.**

Elle faisait poser au client **huit enregistrements DNS** à la main, après avoir
supprimé les deux entrées de parking d'OVH. C'était le passage le plus cher du
dossier : des jours d'aller-retour, des entrées à moitié posées, un domaine qui
répond une fois sur cinq, et GitHub qui refuse le domaine sans dire pourquoi.

⚠️ **UN CLIENT N'A NI LE VOCABULAIRE D'UNE ZONE DNS, NI LE MOYEN DE VÉRIFIER SON
TRAVAIL.** Il accorde maintenant un accès, une fois, et c'est Noé qui pose les
entrées en deux minutes et les vérifie.

À la place, trois gestes qu'un non-technicien sait faire :

1. **Vérifier l'adresse e-mail de son profil OVH.** ⚠️ En premier, et ce n'est
   pas décoratif : OVH envoie le code de confirmation à l'adresse du PROFIL, pas
   à celle qu'il utilise tous les jours. Sur un compte ouvert il y a huit ans
   elle est morte, le message part dans le vide, et les deux côtés attendent
   sans savoir pourquoi. C'est le blocage numéro un.
2. **Ajouter Noé en contact technique sur la ligne « Zone DNS ».** ⚠️ Pas sur la
   ligne « Domaine » : chez OVH ce sont deux services, chaque domaine apparaît
   sur trois lignes, et c'est l'erreur la plus fréquente.
3. **Envoyer son domaine** (et l'adresse e-mail pro, sur un projet mobile).

Et **l'encadré qui fait accepter au lieu de reporter** : l'accès ne permet ni
transfert, ni revente, ni changement de titulaire, ni accès aux factures, et se
retire en un clic.

## ⚠️ Le temps annoncé est passé de 20 à 10 minutes

La moitié servait à poser les huit entrées. Laisser « 20 min » aurait fait
reporter la lecture d'un quart d'heure qu'on ne demande plus.

## ⚠️ Le nichandle ne doit JAMAIS pouvoir se couper

`cn440614-ovh` est écrit en dur dans `contenu.mjs` : il ne change jamais et vaut
pour tous les clients.

**Bogue réel, corrigé le 15/09 :** sans `white-space: nowrap`, l'identifiant se
coupait en fin de ligne sur le trait d'union, et **le trait disparaissait à
l'extraction du texte**. Un client qui copie collait `cn440614ovh`, un
identifiant qui n'existe pas, et la procédure entière échouait sans que personne
comprenne pourquoi. Le style est vérifié à chaque génération : après toute
modification, relire le PDF produit et confirmer que `cn440614-ovh` en ressort
d'un seul tenant.

## Ce que Noé fait ensuite, seul

La liste complète vit dans **nowork** : fiche client, étape Comptes, bouton
« À faire », onglet « Nom de domaine et Google ». Elle porte les 8 adresses IP,
le TXT de Search Console, et la marche à suivre Google Play.

## Passe de dégraissage du 15 septembre 2026, après relecture de Noé

Les deux guides étaient justes mais bavards. Ce qui est parti, et pourquoi :

- **Le bandeau « Entreprise · Temps estimé »** se répétait sur chaque feuille.
  ⚠️ Répétée, une durée se lit comme le temps de CHAQUE page : le lecteur
  croyait en avoir pour une demi-heure. Elle qualifie le document, elle
  s'affiche **une fois**, en haut à droite. Et sans « Entreprise », qui ne
  disait rien à personne.
- **L'encadré « Ce que cet accès permet, et ce qu'il ne permet pas ».**
  ⚠️ C'était la réponse écrite à la peur du client. Retiré sur décision de Noé,
  qui la donne de vive voix : il prend ses clients au téléphone à cette
  étape-là. **Si un client se met un jour à repousser cette autorisation sans
  expliquer pourquoi, c'est le premier texte à remettre.**
- **La note « les trois lignes se ressemblent ».** L'étape dit déjà en gras que
  c'est la ligne « Zone DNS » qu'il faut : le redire à côté ne se lisait plus.
- **L'explication du refus Apple et Google** en fin de document. La consigne
  reste (« attendez ma confirmation »), la démonstration part.
- **« Sans lui, le site ne peut pas être publié »** et **« Privilégiez le .fr,
  sinon le .com »**.

Ce qui est arrivé :

- **Un objectif en tête de document** : « Acheter un nom de domaine (exemple :
  monapp.fr), ici », avec le lien. Ce qu'on vient faire, avant toute
  explication.
- **« Conseil : .fr, .com ou .app »**. ⚠️ L'ancienne formule fermait la porte au
  `.app`, l'extension naturelle d'un projet d'application, que des clients
  demandent d'eux-mêmes. Une recommandation qui interdit se fait contourner en
  silence, et on l'apprend après l'achat. L'étape « Choisir le nom » a été
  alignée dans le même mouvement : elle répétait l'ancienne règle trois lignes
  plus bas, et la contredisait.
- **« Forfait 1, 2 ou 3 ans, à vous de choisir »** au lieu de « 1 an, le moins
  cher ».

Les deux guides tiennent maintenant en **2 pages** au lieu de 3.

## Passage au tutoiement, 15 septembre 2026

Décision de Noé. Ses clients sont des artisans et des dirigeants de TPE qu'il a
au téléphone avant de leur envoyer le document : un « vous » sonnait plus
distant à l'écrit que la voix qu'ils venaient d'entendre.

⚠️ **TOUTE PHRASE AJOUTÉE ICI DOIT TUTOYER.** Un seul « vous » oublié fait lire
le document comme un copier-coller.

### ⚠️ SAUF LES LIBELLÉS CITÉS D'UNE INTERFACE

La bascule a mordu sur un message affiché par OVH : le guide disait d'attendre
que **« Ton produit est disponible »** soit coché, alors que la page de suivi de
commande affiche **« Votre produit est disponible »**. Le client cherchait à
l'écran un texte qui n'y est pas.

**Un libellé cité n'est pas notre phrase, c'est une CAPTURE.** Nom de bouton,
d'onglet, de champ, de case à cocher, message de confirmation : ça se recopie
tel quel, vouvoiement compris. La règle est aussi écrite en commentaire dans
`contenu.mjs`, à l'endroit exact où la faute s'est produite.

### La section « vérifier votre adresse e-mail » a été retirée

Elle occupait une sous-section entière avec un encadré d'avertissement, pour une
précaution. Trop de texte.

⚠️ **MAIS LE FAIT RESTE VRAI, ET LA CONSIGNE A DÉMÉNAGÉ, ELLE N'A PAS DISPARU.**
OVH envoie le lien de confirmation à l'adresse du PROFIL, pas à celle qu'on
relève tous les jours, et tant que le client n'a pas cliqué, la demande reste en
attente **sans que personne soit prévenu**. La phrase vit maintenant dans
l'étape où l'e-mail est censé arriver, en une ligne, lue seulement par qui en a
besoin. Ne pas la supprimer : sans elle, un compte OVH ouvert il y a huit ans
bloque le dossier en silence.

### Relecture par trois lentilles

Neuf corrections proposées, six retenues. Les deux écartées, et pourquoi :

- **« Répliquer cette modification de contact sur le service Domaine associé »**,
  qu'un relecteur voulait tronquer par prudence sur le libellé exact. ⚠️ Noé a
  lu cette phrase sur son propre écran OVH et l'a recopiée mot pour mot : la
  citation est juste, c'est le relecteur qui doutait à tort.
- **« E-mails » à écrire « Emails »**, par cohérence avec la ligne des contacts.
  Le PDF d'origine, fait à partir de captures réelles, écrivait « E-mails » : on
  ne corrige pas un libellé relevé à l'écran sur la foi d'une supposition.

Les six retenues : le libellé OVH rétabli, « son compte » devenu « ton compte »,
« les quatre cases » devenu « toutes les cases » (le nombre varie selon la
commande, et un client qui en compte trois croit s'être trompé d'écran), la
partie avant le @ explicitée pour la redirection, « vers l'adresse » clarifiée
(on pouvait comprendre qu'il fallait créer une NOUVELLE boîte, payante et
inutile), et le champ « Contact technique » nommé au lieu d'être compté.
