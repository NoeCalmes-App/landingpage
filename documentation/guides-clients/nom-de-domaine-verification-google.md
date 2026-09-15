# Guides « Nom de domaine » — le texte à jour

**À coller dans les DEUX guides**, dans l'outil où les PDF ont été faits :

- `public/assets/documents/guides/Achat nom de domaine.pdf` (famille app-mobile)
- `public/assets/documents/guides/Achat nom de domaine - site web.pdf` (famille app-web)

Le texte est **identique dans les deux** : un site seul et une application se
préparent de la même façon.

## Pourquoi ce fichier existe

⚠️ **LES DEUX GUIDES SONT DES PDF SANS SOURCE DANS LE DÉPÔT.** Trois pages, six
polices embarquées, des captures d'écran. On ne peut ni les relire ni les
corriger depuis ici, et une page ajoutée par un outil tiers sortirait dans une
autre typographie. Le texte vit donc ici, en clair : c'est le seul endroit où il
se corrige, se compare et se retrouve.

⚠️ **ET PAS DANS LA PAGE WEB QUI AFFICHE LE PDF.** `src/Document.jsx` redirige
les téléphones vers le fichier lui-même : tout ce qui entoure le lecteur est
invisible sur mobile, là où les clients lisent. Ce qui doit être lu doit être
DANS le PDF.

## Le changement du 15 septembre 2026

**TOUTE LA PARTIE « CONFIGURATION DE LA ZONE DNS » SORT DU GUIDE.**

Elle demandait au client de poser lui-même huit enregistrements A, de supprimer
les entrées de parking du registrar, et de ne pas se tromper de type. C'est le
passage qui coûtait le plus cher : des jours d'aller-retour, des entrées à
moitié posées, un domaine qui répond une fois sur cinq, et GitHub qui refuse le
domaine sans dire pourquoi.

⚠️ **UN CLIENT N'A RIEN À FAIRE DANS UNE ZONE DNS.** Il n'a ni le vocabulaire,
ni les moyens de vérifier son travail. À la place il accorde un accès, une fois,
en cinq minutes, et c'est Noé qui pose les entrées en deux minutes, sans se
tromper, et qui les vérifie.

Ce qui reste dans le guide : acheter le domaine, donner l'accès, envoyer deux
informations, attendre. Rien d'autre.

---

## Le texte à coller

> ### Ce qu'il vous reste à faire, en 5 minutes
>
> Votre nom de domaine est acheté. Il reste trois choses, et vous n'aurez aucun
> réglage technique à faire : c'est moi qui m'en occupe.
>
> ---
>
> #### 1. Vérifiez l'adresse e-mail de votre compte OVH
>
> OVH va vous envoyer un message de confirmation à l'étape suivante. Il part à
> l'adresse enregistrée dans votre **profil OVH**, qui n'est pas toujours celle
> que vous utilisez tous les jours.
>
> Dans votre espace client OVH, cliquez sur votre nom en haut à droite, puis sur
> votre profil, et vérifiez que l'adresse affichée est bien une adresse que vous
> relevez. Corrigez-la si besoin.
>
> **Ne sautez pas cette étape.** C'est de loin la cause numéro un de blocage :
> le message part dans le vide, et on attend tous les deux sans savoir pourquoi.
>
> ---
>
> #### 2. Autorisez-moi à configurer votre domaine
>
> Toujours dans votre espace client OVH :
>
> 1. Cliquez sur votre nom en haut à droite, puis sur **Mes contacts**.
>    Adresse directe : `https://www.ovh.com/manager/#/account/contacts/services`
> 2. Vous voyez la liste de vos services. Votre domaine y apparaît sur
>    **plusieurs lignes** : une ligne « Domaine », une ligne « Emails », et une
>    ligne **« Zone DNS »**.
>
>    **C'est la ligne « Zone DNS » qu'il vous faut.** C'est l'erreur la plus
>    fréquente : les lignes se ressemblent, regardez bien la colonne du milieu.
> 3. Tout à droite de cette ligne, cliquez sur les **trois petits points**, puis
>    sur **Modifier les contacts**.
> 4. Trois champs s'affichent. **Ne changez que celui du milieu**, « Contact
>    technique », et remplacez ce qu'il contient par :
>
>    **[NICHANDLE DE NOÉ]**
>
>    Ne touchez ni au contact administrateur, ni au contact de facturation.
> 5. Cochez la case **« Répliquer cette modification de contact sur le service
>    Domaine associé »**, puis validez.
> 6. Vous recevez un e-mail d'OVH avec un lien de confirmation : cliquez dessus.
>    Je reçois de mon côté un message séparé, avec un code différent du vôtre,
>    et je confirme aussi. Tant que l'un des deux manque, rien ne se passe.
>
> **Ce que cet accès permet, et ce qu'il ne permet pas.** Votre nom de domaine
> reste à 100 % à votre nom, vous en restez propriétaire. Je ne peux ni le
> transférer, ni le revendre, ni changer son titulaire. Je n'ai accès ni à vos
> factures ni à vos moyens de paiement. Et vous pouvez me retirer cet accès
> quand vous voulez, en un clic, depuis ce même écran.
>
> **Ne m'envoyez jamais votre mot de passe OVH.** Je n'en ai pas besoin, et OVH
> le déconseille.
>
> ---
>
> #### 3. Envoyez-moi deux informations
>
> Par message, simplement :
>
> - **Votre nom de domaine**, exactement comme vous l'avez acheté
> - **L'adresse e-mail** de votre compte OVH
>
> C'est tout. Je m'occupe du reste : la configuration technique du domaine, la
> mise en ligne du site, et la vérification auprès de Google.
>
> ---
>
> ### Et ensuite ?
>
> **Attendez que je vous confirme que le site est en ligne** avant de passer à
> l'achat des licences Apple Developer et Google Play.
>
> Ce n'est pas une formalité d'ordre : Apple et Google vérifient que le site de
> votre entreprise répond vraiment, avec du contenu, sur votre nom de domaine.
> Ouvrir le dossier avant que le site soit en ligne, c'est le faire refuser, et
> un dossier refusé se rouvre beaucoup plus difficilement qu'il ne s'ouvre.
>
> Je vous préviens dès que c'est prêt. Vous n'avez rien à surveiller.

---

## Ce que Noé fait ensuite, seul

Pour mémoire, et parce que c'est ce qui a disparu du guide client :

1. Les 8 enregistrements A de GitHub Pages, et la suppression des entrées de
   parking du registrar
2. Le TXT de vérification Google Search Console, dans la même visite
3. La propriété Google Search Console en type **« Domaine »**, jamais
   « Préfixe de l'URL » : le préfixe ne couvre qu'une adresse exacte, et Google
   Play n'interroge que la propriété Domaine quand il valide le site d'un compte
   d'organisation

La liste complète, avec les valeurs exactes, vit dans nowork : fiche client,
bouton « À faire » de l'étape Comptes.

## Le nichandle

`[NICHANDLE DE NOÉ]` est à remplacer par l'identifiant OVH réel, de la forme
`ab12345-ovh`. Il ne change jamais : c'est le même pour tous les clients, comme
un numéro de téléphone. Il se lit dans le profil OVH.
