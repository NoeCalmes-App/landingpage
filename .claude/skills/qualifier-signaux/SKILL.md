---
name: qualifier-signaux
description: Prospection du lundi pour Noé. Sort les entrepreneurs qui viennent de déclarer une application ou d'augmenter leur capital au BODACC, et les campagnes Ulule réussies pour une application. Qualifie les meilleures pistes par recherche web et par les bibliothèques de pubs Meta et Google (preuves d'argent, fondateur technique, application déjà faite, contacts professionnels publics), rédige les premiers messages, les fait entrer dans Nowork et livre un tableau. À utiliser quand Noé demande « les signaux », « la prospection du lundi », « qualifie les pistes », « trouve-moi des prospects » ou « lance la prospection ».
---

# Qualifier les signaux

Livrable : `prospects-signaux/qualifies-AAAA-MM-JJ.csv`, environ 30 pistes avec un verdict, les contacts professionnels publics, une accroche, et un message prêt pour chaque piste « À contacter ». Noé n'a plus qu'à envoyer.

Contexte, cible et messages : `documentation/strategy/prospection-signaux.md`. Le lire avant de rédiger un message.

## Règles absolues

- **Ne jamais envoyer de message**, ni remplir un formulaire, ni créer un compte. Noé envoie lui-même.
- **Rien de `prospects-signaux/` dans git.** Le dépôt est public.
- **Coordonnées professionnelles publiées par l'entreprise elle-même**, seulement. Jamais l'adresse d'un entrepreneur individuel, jamais un email deviné, jamais un annuaire de particuliers ni une base fuitée.
- **Aucun contournement** : pas de faux navigateur, pas de passage forcé d'une page anti-robot. Une page bloquée se note et on passe.
- **Pas de tiret cadratin** dans les messages.

## Étapes

1. **Sortir les signaux.** Lancer les deux commandes en arrière-plan, en même temps :
   - `node scripts/prospection/signaux-bodacc.mjs` lit les 7 derniers jours : créations, ajouts d'activité et hausses de capital. Il relit l'historique BODACC de chaque piste pour trouver une hausse de capital depuis deux ans, et cherche dans les listes de l'AFNIC si la piste vient de réserver son domaine .fr. Compter environ 5 minutes, car l'App Store limite le rythme.
   - `node scripts/prospection/campagnes-ulule.mjs` sort les campagnes Ulule réussies pour une application, sur 12 mois. Compter environ 2 minutes.
   - `node scripts/prospection/signaux-etranger.mjs` lit la Feuille officielle suisse du commerce et le Journal de Monaco, sur 7 jours. Compter environ 2 minutes.
2. **Revoir le vivier.** `node scripts/prospection/revoir-vivier.mjs` refait les vérifications gratuites sur toutes les « À creuser » des semaines passées : nouvelle annonce BODACC, domaine .fr réservé, salariés ou chiffre d'affaires apparus, application sortie. Il écrit `prospects-signaux/vivier-<jour>.csv` et `vivier.json` avec celles qui ont bougé. Pour chacune, lancer la passe 2 de la consigne avec un agent, en lui donnant l'ancienne fiche et ce qui a bougé, et écrire la nouvelle fiche dans le dossier du jour (`fiches-V.json`). Compter environ 4 secondes par piste.
3. **Choisir les pistes.** `node scripts/prospection/choisir-pistes.mjs` écrit `prospects-signaux/qualification-<jour>/pistes.json` :
   - 24 pistes BODACC au plus, note 7 ou plus, sans les pistes déjà qualifiées, les fondateurs informaticiens et les applications déjà sur l'App Store ;
   - puis 4 campagnes Ulule au plus, jamais qualifiées, avec un identifiant `ulule-…` à la place du SIREN ;
   - puis 3 pistes de Suisse ou de Monaco au plus, note 6 ou plus, identifiants `ch-…` et `mc-…`.
4. **Fouiller le web, en parallèle.** Lancer un agent `general-purpose` par paquet de 4 pistes, tous dans un seul message, avec le modèle `sonnet` : 8 agents pour 31 pistes, d'index 0-3, 4-7, et ainsi de suite jusqu'à la fin de `pistes.json`. Chaque agent travaille en deux passes : un tri en 4 recherches, puis 12 recherches de plus sur les pistes qui restent (argent public, recrutements, presse, avis). Le brief de chaque agent est `consigne-recherche.md`, à recopier en remplaçant `{PISTES}`, `{INDEX}` et `{SORTIE}` par le chemin de `pistes.json`, les index et `.../fiches-A.json`, puis `fiches-B.json`, et ainsi de suite.
5. **Relire les « À contacter ».** Ouvrir le site cité et vérifier trois choses :
   - c'est bien la même entreprise ;
   - le numéro est publié par elle ;
   - la règle est tenue : au moins deux preuves d'argent fortes dans `preuves_argent`, et un signe de démarrage de moins de six mois. « Le fondateur dirige une autre entreprise » n'est pas une preuve.

   Au moindre doute, passer la piste en « À creuser ».
6. **Lire les réseaux dans le Chrome de Noé**, pour chaque piste « À contacter » ou « À creuser ». Utiliser les outils Claude in Chrome, où Noé est connecté.
   - **Quoi regarder :**
     - le LinkedIn des fondateurs, pour savoir s'il y a un développeur ou un CTO ;
     - l'Instagram et la page Facebook de l'entreprise : abonnés, derniers posts, annonce d'ouverture ou de sortie, email affiché.
   - **Lecture seule.** Ne jamais suivre, aimer, commenter, se connecter à quelqu'un ni écrire. Déplier un « En voir plus » est permis.
   - **Doucement.** LinkedIn interdit les robots, et c'est le compte de Noé qui est en jeu :
     - 15 pages au plus par lundi ;
     - 3 à 5 secondes entre deux pages ;
     - un seul onglet, fermé à la fin.
   - **Noter** dans le champ `reseaux` la source, la date et ce qui a été vu. Seulement le parcours professionnel, rien de personnel.
   - **Revoir le verdict** avec ces informations.
7. **Regarder les pubs et les avis Google, dans le navigateur intégré.** Pour chaque piste « À contacter » ou « À creuser », ouvrir trois pages publiques. Elles se lisent sans connexion et ne comptent pas dans les 15 pages LinkedIn.
   - **Meta :** `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=FR&q=%22NOM%22&search_type=keyword_exact_phrase`. La recherche remonte aussi d'autres annonceurs : ne compter que les pubs dont l'annonceur porte le nom de l'entreprise ou de sa marque. Noter le nombre de pubs, leurs dates, et si elles sont actives.
   - **Google :** `https://adstransparency.google.com/?region=FR&domain=SITE.fr`. Noter le nombre d'annonces et le nom de l'annonceur validé.
   - **Google Maps**, pour un commerce, un restaurant, une salle ou un cabinet : `https://www.google.com/maps/search/NOM+VILLE`. À la première visite, une page de consentement s'affiche : cliquer « Tout refuser », le navigateur s'en souvient. Attendre que le panneau se charge, puis lire la note et le nombre d'avis dans les `aria-label` (« 5,0 étoiles », « 9 avis »), avec le téléphone et le site affichés. Au moins 50 avis sur un commerce de plus de trois ans : preuve d'argent forte.
   - **Noter le résultat** dans le champ `pubs` de la fiche pour les pubs, et dans `signes_argent` pour les avis, avec la date de la vérification, même s'il n'y a rien.
   - **Revoir le verdict.** De la pub payée ou beaucoup d'avis sont des preuves d'argent fortes : elles peuvent faire passer une piste « À creuser » en « À contacter ».
8. **Préparer les messages.** Lire d'abord « Approcher quelqu'un qui ne te connaît pas », partie 7 de la marche à suivre. Pour chaque fiche « À contacter », vérifier et compléter ces champs :
   - `canal_ligne` : « WhatsApp au 06… » si un mobile est publié, sinon « Email à … », sinon « LinkedIn à … », sinon « Instagram à … » ;
   - `source_contact` : où le contact est publié, en mots simples, « votre site », « votre LinkedIn » ;
   - `compliment` : une phrase courte et vraie sur ce qu'il a construit, avec un fait qu'il a publié lui-même ;
   - `question` : une question qui se répond en trois mots, sur son projet ;
   - `projet` si le nom de marque diffère de `nom`, `qui_cest` en deux lignes pour Noé.

   Puis `node scripts/prospection/ecrire-messages.mjs prospects-signaux/qualification-<jour>`. Le script écrit tout le reste, mot pour mot : le premier message, le SMS, la relance, les réponses. Ne jamais les réécrire à la main. Le premier message reste sous 40 mots, sans offre, sans idée sur son projet : Noé a refusé toutes les versions plus longues. Le reste du dossier sert à l'appel.
9. **Assembler.** `node scripts/prospection/fusionner-qualification.mjs prospects-signaux/qualification-<jour>`, puis `node scripts/prospection/recap-a-envoyer.mjs prospects-signaux/qualification-<jour>`, qui écrit `prospects-signaux/a-envoyer-<jour>.md` : les messages à envoyer, et sous chacun, qui est la personne.
10. **Faire entrer les « À contacter » dans Nowork.** Depuis le dossier `nowork` :
   - `node scripts/importer-prospects-signaux.mjs` simule et liste ce qui serait créé ;
   - vérifier que chaque piste a son contact, son téléphone ou son email, et son canal ;
   - `node scripts/importer-prospects-signaux.mjs --apply` crée les fiches.
   Une piste jointe seulement par LinkedIn ou Instagram entre aussi : le lien est dans la note, le message dans le bloc-notes. Chaque fiche arrive en « Nouveau », en tête de « À faire maintenant », avec la provenance « Prospection », en bleu clair partout. Dans son panneau, une seule bulle se lit au survol, comme celles d'un lead Meta : pourquoi lui, son projet, l'argent, le démarrage, comment je l'ai trouvé. Un clic copie tout le dossier et le message, pour les coller à une IA. Le descriptif reste vide pour Noé. Le message prêt et tout le dossier sont dans son bloc-notes. Une piste déjà dans Nowork, par son SIREN, son téléphone ou son email, est sautée sans rien toucher. Le script n'envoie rien à personne.
11. **Livrer.**
   - Envoyer `a-envoyer-<jour>.md` à Noé avec SendUserFile, puis le CSV. C'est le récapitulatif qu'il attend chaque lundi : il ne lit pas le reste.
   - Dire que les « À contacter » sont dans Nowork.
   - Dire en trois lignes combien de pistes ont chaque verdict.
   - Dire qui contacter en premier, et pourquoi.
   - Dire ce qui reste à vérifier à la main.

## Le jeudi

Même commande, en plus court : `node scripts/prospection/signaux-bodacc.mjs --jours 4`, puis les étapes 3 à 11 sur les pistes nouvelles. Une annonce du mardi n'attend plus six jours.

## Leçons du premier lancement (02/11/2026)

- Sur les 16 meilleures pistes, le verdict a donné 1 « À contacter », 7 « À creuser » et 8 « À écarter ». La note du script trie, mais ne qualifie pas : la recherche web reste indispensable.
- **Ce qui fait écarter :**
  - un fondateur développeur, repéré sur Malt, Viadeo ou LinkedIn ;
  - un CTO dans l'équipe ;
  - une application déjà publiée ;
  - une micro-entreprise de quelques semaines, sans aucune trace en ligne.
- **Un signal précieux : une première version faite sans code**, sur Lovable, Base44 ou Bubble. L'idée est testée et le fondateur a besoin de la vraie version. L'angle est alors « reprendre et solidifier », pas « créer ».
- **Les réseaux changent tout.** Lus dans le Chrome de Noé, ils ont changé 6 verdicts sur 7 :
  - un cofondateur ancien développeur dans un grand groupe ;
  - une audience de 29 abonnés seulement ;
  - un fondateur de l'automobile qui annonce sa sortie prochaine ;
  - une halle gourmande en travaux, avec son email public.

  Bilan final : 4 à contacter, 1 à creuser, 11 à écarter.
- **Les sources qui répondent :**
  - le site de l'entreprise, surtout les mentions légales et les CGU ;
  - l'API publique `recherche-entreprises.api.gouv.fr` ;
  - l'App Store ;
  - societe.com, lu avec WebFetch.

  La recherche web trouve peu de chose sur les noms de personnes.

## Leçons du 03/11/2026

- **« A une autre entreprise » ne prouve pas l'argent.** Noé l'a dit, d'où la règle des deux preuves fortes.
- **La hausse de capital est la meilleure preuve des registres.** Elle est rare : sur une semaine, 3 pistes sont sorties par ce signal, et 6 avaient une hausse depuis deux ans. Exemple : une plateforme d'annonces passée de 30 000 € à 91 000 € de capital en février 2026.
- **Ulule trouve des porteurs qui ont l'argent et le disent.** Sur 12 mois, 17 campagnes ont réussi pour une application. Une professeure de piano y détaille ce qu'elle va payer à un développeur.
- **Bibliothèque Meta :** la recherche par mot-clé remonte des dizaines d'annonceurs sans rapport. Seul compte l'annonceur au nom de l'entreprise. Une piste avait 60 pubs Meta et 4 annonces Google : elle dépense en marketing.
- **Sources testées le 03/11 et abandonnées :** la base des marques de l'INPI n'affiche aucun résultat dans le navigateur, même pour « doctolib » ; la recherche de phrases comme « notre application arrive » dans la bibliothèque Meta ne sort qu'une pub, en Tunisie. Les offres d'emploi se cherchent par WebSearch (`site:welcometothejungle.com`, `site:indeed.fr`), pas sur les sites eux-mêmes.
- **Sources qui marchent :** les listes quotidiennes de l'AFNIC donnent le domaine .fr réservé par une piste (automatique) ; Google Maps donne la note, le nombre d'avis, le téléphone et le site d'un commerce, dans le navigateur intégré.
- **Ulule, le 03/11 :** les 4 campagnes réussies qualifiées avaient toutes leur application déjà sortie. Il faut arriver pendant la campagne, ou juste après : le script ne garde plus que les campagnes en cours ou finies depuis moins de 60 jours.
- **Résultat du 03/11, nouvelle méthode :** sur 20 pistes, 2 à contacter, 6 à creuser, 12 à écarter. Les réseaux lus dans le Chrome de Noé ont tranché 4 verdicts : un directeur général « CTO » (écarté), un ancien commercial à la tête d'un réseau de dépôts, avec son mobile publié (à contacter), un diagnostiqueur énergétique joignable sur LinkedIn (à contacter), deux banquiers sans signe de démarrage (à creuser).
- **Un domaine au même nom n'est pas une preuve.** Le 03/11, un domaine au nom de la marque, titulaire masqué, a été compté comme signe de démarrage alors que l'agent l'avait signalé comme non rattaché. Ne jamais remonter un fait que la fiche marque « non confirmé ».
