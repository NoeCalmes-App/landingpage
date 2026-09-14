# Vérification Google du domaine — texte à ajouter aux guides « Nom de domaine »

**À coller à la fin des DEUX guides**, dans l'outil où les PDF ont été faits :

- `public/assets/documents/guides/Achat nom de domaine.pdf` (famille app-mobile)
- `public/assets/documents/guides/Achat nom de domaine - site web.pdf` (famille app-web)

## Pourquoi ce fichier existe

⚠️ **LES DEUX GUIDES SONT DES PDF SANS SOURCE DANS LE DÉPÔT.** Trois pages,
six polices embarquées, des captures d'écran. On ne peut donc ni les relire ni
les corriger depuis ici, et une page ajoutée par un outil tiers sortirait dans
une autre typographie, visiblement rapportée. Le texte vit donc ici, en clair :
c'est le seul endroit où il se corrige, se compare et se retrouve.

⚠️ **ET PAS DANS LA PAGE WEB QUI AFFICHE LE PDF.** `src/Document.jsx` redirige
les téléphones vers le fichier lui-même : tout ce qui est écrit autour du
lecteur est invisible sur mobile, là où les clients lisent. Ce qui doit être lu
doit être DANS le PDF.

## Pourquoi cette étape existe

Google Play, pour un compte d'**organisation**, demande de valider le site de
l'entreprise. Le formulaire le dit mot pour mot : *« Prouvez que ce site Web
appartient à votre organisation en envoyant une demande de validation au
propriétaire enregistré dans la Google Search Console. »*

Play Console ne regarde donc pas le site : il regarde **qui est propriétaire du
domaine dans Search Console**, et envoie la demande à cette personne. Sans
propriétaire déclaré, il n'y a personne à qui l'envoyer, et le compte reste
bloqué sur « Action requise ».

⚠️ **CETTE ÉTAPE NE DÉPEND PAS DU SITE.** La vérification lit la zone DNS,
jamais les pages. Elle se fait donc **dès l'achat du domaine**, avant même que
le site existe — et c'est tout l'intérêt : le client ouvre sa zone OVH UNE
FOIS, pour les entrées A et pour ce TXT. Lui redemander trois semaines plus
tard coûte une relance, une explication, et souvent une semaine d'attente.

---

## Le texte à coller

> ### Dernière étape : prouver à Google que le domaine est à vous
>
> Google demande cette preuve pour publier une application au nom de votre
> entreprise. Elle se fait une seule fois, et elle ne dépend pas du site : vous
> pouvez la faire maintenant, même si le site n'est pas encore en ligne.
>
> **1.** Allez sur **search.google.com/search-console** et connectez-vous avec
> votre compte Google.
>
> **2.** Cliquez sur **Ajouter une propriété**.
>
> **3.** Deux choix s'affichent. Prenez celui de gauche, **Domaine**. C'est le
> seul qui couvre votre site en entier. Ignorez « Préfixe de l'URL ».
>
> **4.** Saisissez votre nom de domaine **sans https:// et sans www**, par
> exemple `monsite.fr`. Puis **Continuer**.
>
> **5.** Google affiche une ligne qui commence par
> `google-site-verification=`, suivie d'une longue suite de lettres et de
> chiffres. **Copiez-la en entier.** Laissez cette fenêtre ouverte.
>
> **6.** Dans un autre onglet, connectez-vous sur **ovh.com**, avec les
> identifiants créés à l'achat du domaine.
>
> **7.** En haut à gauche, cliquez sur **Tableau de bord**, puis sur votre nom
> de domaine dans la liste.
>
> **8.** Ouvrez l'onglet **Zone DNS**, puis **Ajouter une entrée**.
>
> **9.** Choisissez le type **TXT**.
>
> **10.** Laissez le champ **Sous-domaine** complètement **vide**.
>
> **11.** Dans **Valeur**, collez la ligne copiée à l'étape 5. N'ajoutez pas de
> guillemets : OVH les met tout seul.
>
> **12.** Validez. Attendez deux ou trois minutes.
>
> **13.** Revenez sur l'onglet Google Search Console et cliquez sur
> **VALIDER**.
>
> S'il répond qu'il ne trouve rien, ne retouchez à rien : attendez dix minutes
> et recliquez sur Valider.
>
> **Deux choses à ne jamais faire ensuite :**
>
> - Ne supprimez jamais cette ligne. Google revérifie de temps en temps, et la
>   retirer ferait perdre la validation plusieurs semaines plus tard, sans
>   prévenir.
> - Ne touchez pas à la ligne qui commence par `v=spf1`, déjà présente dans
>   votre zone. C'est elle qui fait fonctionner votre adresse e-mail.

---

## Ce qui change selon la famille

Rien. Le texte est identique dans les deux guides : un site seul comme une
application se valident de la même façon. Seule la suite diffère, et elle n'est
pas dans ce document : pour une application, la validation débloque « Valider
le site Web de votre organisation » dans Google Play Console.

## Qui reçoit la demande de Play Console

**Le propriétaire déclaré dans Search Console.** Si c'est le compte de Noé, la
demande arrive chez Noé, qui l'approuve. Si c'est le client, elle arrive chez
lui. Les deux marchent — mais il faut savoir lequel avant de chercher l'e-mail
pendant une heure.

Pour passer la propriété au client plus tard : Search Console → Paramètres →
Utilisateurs et autorisations → Ajouter un utilisateur → rôle **Propriétaire**.
⚠️ **NE RETIRE PAS LE TXT EXISTANT en le faisant.** Plusieurs lignes
`google-site-verification` cohabitent sans se gêner ; retirer celle qui portait
la validation la fait tomber, et la validation Play Console avec elle.
