# Tribune gratuite : Journal du Net (remplace La Fabrique du Net)

> Créé le 09/11/2026. **Pourquoi** : le relevé IA du 09/11 (`suivi-ia.md`) montre que
> ChatGPT cite La Fabrique du Net comme seule source sur le prix d'une application.
> Sa rubrique « Tribunes » est en fait un article sponsorisé à 900 € HT : écarté.
> Le Journal du Net (JDN) ouvre ses chroniques gratuitement aux experts, avec un
> compte auteur et un profil public qui porte un lien vers le site de l'auteur.
> C'est un domaine très lu par les IA et par Google : un lien depuis une page du
> JDN vaut plus que tous les annuaires réunis.

## Ce que Noé fait (10 minutes)

1. Créer le compte auteur : https://www.journaldunet.com/account/signup
   (email pro, nom « Noé Calmes », fonction « Concepteur d'applications mobiles et
   web, Toulouse », site `https://noecalmes.fr`, photo de profil LinkedIn).
2. Une fois connecté, menu du compte → « Gérer mes chroniques »
   (https://www.journaldunet.com/chroniqueur/article/list/) → nouvelle chronique.
3. Coller le titre, le chapô et le texte ci-dessous. Rubrique : Web & Tech ou
   Management / Entrepreneuriat, selon ce que propose le formulaire.
4. Le JDN relit et publie sous quelques jours. Ne pas ajouter de lien dans le corps
   du texte (la rédaction les retire) : le lien utile est celui du profil auteur.
5. Quand c'est publié : ajouter l'URL dans `liens-entrants.md`, et mettre la
   chronique dans « Vu dans » de la page À propos si Noé le souhaite.

Même texte réutilisable pour Maddyness (formulaire https://www.maddyness.com/contactez-nous/,
« proposer un sujet à la rédaction ») si le JDN refuse. Ne pas publier le même
texte aux deux : Google n'aime pas le contenu dupliqué, et le JDN non plus.

## Règles respectées

- Aucun chiffre nouveau : tout vient du tableau de l'article « 20 applications »
  (`src/Blog.jsx`), à jour au 09/11/2026.
- Vocabulaire : « application mobile ou web », « téléphone ou ordinateur », jamais
  « site » pour une application web, jamais « SaaS » seul.
- Pas de tiret cadratin. Pas d'auto-promotion dans le corps : la tribune convainc
  par le raisonnement, la signature fait le reste.
- Longueur : environ 750 mots, le format habituel des chroniques JDN.

---

## Titre

**La question que personne ne pose avant de construire une application : où et quand l'utilisateur paie**

## Chapô

Une application qui dépasse 300 000 utilisateurs et ne rapporte presque rien. Une autre qui en a dix fois moins et génère 13 000 € par mois. J'ai conçu les deux. La différence ne tient ni à l'idée, ni au code, ni au budget.

## Texte

J'ai conçu et publié plus de vingt applications mobiles, les miennes et celles de mes clients, qui cumulent 1,3 million de téléchargements. C'est le chiffre que je mets en avant, parce qu'il impressionne et parce qu'il est vrai. Mais c'est aussi celui qui m'a le plus trompé.

Un téléchargement, c'est quelqu'un qui a appuyé sur un bouton gratuit. Il n'a rien promis. Pourtant, c'est le chiffre que les stores affichent, celui que les investisseurs demandent, celui que les fondateurs répètent. Et c'est le chiffre qui a failli me faire passer à côté de ce qui compte.

### 300 000 utilisateurs, et presque pas de chiffre d'affaires

J'ai conçu la première version d'une messagerie pour ses créateurs. Elle a dépassé les 300 000 utilisateurs. Sur le papier, c'est le genre de succès qu'on raconte en conférence. Dans la réalité, elle ne rapportait presque rien.

La raison est d'une banalité qui fait mal : personne, moi compris, n'avait décidé au départ à quel moment l'application demanderait à être payée, ni pour quoi. On s'était dit que ça viendrait avec le volume. Ça ne vient pas avec le volume. Un modèle de revenu ajouté après coup, sur un produit que des centaines de milliers de personnes utilisent gratuitement, se heurte à une habitude déjà prise. On ne reprend pas ce qu'on a offert.

Depuis, je ne commence plus un projet sans poser la même question, le premier jour, pas en fin de cadrage : où et quand l'utilisateur sort sa carte ? Si la réponse n'existe pas, le projet n'est pas prêt. Et je le dis, avant qu'il ait coûté quoi que ce soit.

### 13 000 € par mois sur un marché saturé

À l'inverse, j'ai conçu pour un client une application de suivi nutritionnel. L'idée est banale, le marché était déjà pris, il en existe des dizaines. Elle rapporte aujourd'hui environ 13 000 € par mois par abonnement, avec environ 30 000 téléchargements et 3 % d'utilisateurs payants.

Pas parce que l'idée était meilleure. Parce que tout, dans l'application, est construit autour de deux moments : celui où l'utilisateur comprend ce qu'elle lui apporte, et celui où on lui propose de payer. Les premiers écrans l'amènent à la valeur vite. L'écran d'abonnement arrive quand il a déjà une raison de dire oui.

Deux applications avec la même idée peuvent avoir des revenus sans aucun rapport, et la différence ne se voit pas sur la liste des fonctionnalités. Elle se voit dans le parcours. Le volume ne fait pas le revenu : la conversion et la rétention le font.

### Ce que l'IA change, et ce qu'elle ne change pas

Les outils qui génèrent une application à partir d'une phrase sont arrivés, et beaucoup de fondateurs y voient la fin du problème : le code devient presque gratuit. Je m'en sers tous les jours pour écrire du code, et je confirme qu'ils vont vite.

Mais le code n'a jamais été ce qui coûte cher dans une application. Ce qui coûte cher, c'est tout ce qui a été décidé avant, et tout ce qui est mesuré après. Si une machine écrit le code en une heure, ça ne change rien à la question : où et quand l'utilisateur paie. Personne ne tape ça dans une phrase. Et un produit généré en une heure sans cette réponse est un produit qui perd de l'argent plus vite.

### Téléphone ou ordinateur : la question que le fondateur ne doit pas trancher seul

Il reste une décision qu'on prend trop souvent par réflexe. « Une application », pour la plupart des gens, c'est une application mobile. Or une partie des projets n'ont rien à faire sur un téléphone : des professionnels qui travaillent assis devant un écran, plusieurs profils, un espace d'administration. C'est une application web, qui se sert sur ordinateur, sans la commission de 30 % des stores. Sur une application mobile, le créateur touche environ 70 % du prix affiché après TVA et commission ; sur une application web, environ 78 %. À l'échelle d'un abonnement, c'est la marge.

À l'inverse, un produit qu'on utilise debout, dans la rue, plusieurs fois par jour, avec des notifications, n'existe que sur un téléphone. La bonne réponse dépend de l'usage, pas de la mode, et elle devrait être donnée avant le devis, pas après.

### Trois questions avant la première ligne de code

Si vous portez un projet d'application, mobile ou web, voici les trois questions auxquelles je vous conseille de répondre avant de dépenser un euro :

1. **Où et quand l'utilisateur paie-t-il ?** Pas « un jour », pas « quand il y aura du volume ». Quel écran, quel moment, quel prix.
2. **Que fait-il le lendemain ?** Le téléchargement flatte ; le retour du lendemain renseigne. Si rien ne le fait revenir, rien ne le fera payer.
3. **Téléphone ou ordinateur ?** Décidez-le d'après l'usage réel de vos clients, et d'après ce que vous gardez sur chaque euro.

Le travail d'un concepteur d'applications commence par ce qu'il refuse de construire. C'est la chose que j'aurais eu le plus de mal à expliquer à celui que j'étais à mes débuts, et c'est celle qui a le plus changé les résultats de mes clients.

## Signature (profil auteur)

Noé Calmes conçoit des applications mobiles et web pensées pour générer des revenus. Plus de 20 applications publiées, 1,3 million de téléchargements. noecalmes.fr
