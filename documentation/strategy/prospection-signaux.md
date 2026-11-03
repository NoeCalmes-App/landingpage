# Prospection par signaux : trouver les entrepreneurs qui lancent une application

> Créé le 02/11/2026. Version gratuite de la méthode de Dimitri Cayrou (agence Prosper, ex-Leadmapp), que Noé ne prend pas.
> Outils : `scripts/prospection/signaux-bodacc.mjs` et `scripts/prospection/campagnes-ulule.mjs`. Les listes sortent dans `prospects-signaux/`, ignoré par git : **le dépôt est public, aucun nom de prospect ne doit y entrer.**

---

## 1. L'idée en deux phrases

On ne cherche pas des gens « qui pourraient vouloir une application ». On cherche des gens qui viennent **d'écrire eux-mêmes**, dans un registre public, qu'ils lancent une application. Ils ont un projet, ils démarrent maintenant, et personne ne les a encore contactés.

## 2. Comment Dimitri a fait (lu le 02/11/2026 dans son Sheet « prospects_noe_calmes »)

Rien de secret. Sur ses 5 prospects :
- 3 annonces publiques **Codeur** (le client poste son projet, 88 à 160 indépendants répondent) ;
- 1 annonce **cofondateur.fr** ;
- 1 application payante avec de mauvais avis **Trustpilot** ;
- les emails trouvés avec **lemlist** (un sur deux faux, il l'a vu).

Son vrai travail : une ligne « angle d'approche » par prospect, bien écrite. C'est ce qu'on reproduit, avec une source qu'il n'utilisait pas.

## 3. La cible (Noé, 02/11/2026)

> « Des entrepreneurs qui ont déjà un business à côté, qui n'ont pas de business d'application. Des restaurateurs, des gens dans le coaching sportif, qui ont déjà une audience. Ils veulent diversifier leurs sources, ils ont une idée. Ils ont l'argent, ils veulent faire appel à un pro. »

Trois conditions, toutes nécessaires :
1. **De l'argent** : une entreprise qui tourne, un capital, ou un financement. Noé, le 03/11 : « si elle a une entreprise à côté, donc elle a de l'argent, ça veut rien dire ». Il faut des preuves fortes, voir la règle de la partie 6.
2. **Démarrer bientôt** : il vient de créer ou de modifier sa société pour ce projet.
3. **Pas de technique** : s'il sait coder, il la fera lui-même.

Ordres de grandeur donnés par Noé le 02/11 : application web à partir de 5 000 à 7 000 €, application mobile autour de 8 000 à 10 000 € et plus, le plus gros projet à 17 000 €.

## 4. Les sources, de la meilleure à la moins bonne

| Source | Ce que ça dit | Coût | Comment |
|---|---|---|---|
| **BODACC, ajout d'activité** | Une entreprise en activité ajoute « exploitation d'une application… » à son objet | Gratuit | Automatique, script |
| **BODACC, création** | Une société est créée pour exploiter une application | Gratuit | Automatique, script |
| **BODACC, hausse de capital** | Une entreprise d'application vient de remettre de l'argent dans sa société. Pour toutes les pistes, une hausse depuis deux ans est une preuve d'argent | Gratuit | Automatique, script |
| **Ulule, campagnes réussies** | Un porteur a collecté de l'argent pour son application, et dit souvent ce que l'argent va payer | Gratuit | Automatique, script |
| **Bibliothèques de pubs Meta et Google** | La piste paie déjà de la publicité : elle dépense pour grandir | Gratuit | À la main, pour les pistes retenues |
| Annonces « je cherche » | Codeur, Comeup, cofondateur.fr, posts LinkedIn « je cherche un développeur », groupes Facebook et Reddit d'entrepreneurs | Gratuit | À la main, 15 min par semaine |
| Journal de Monaco | Rubrique des insertions légales : les sociétés monégasques qui se créent | Gratuit | À la main, pas encore automatisé |
| Lauréats de prêts d'honneur et d'incubateurs | Initiative France, Réseau Entreprendre et les incubateurs publient leurs promotions | Gratuit | À la main |
| Mauvais avis d'applications payantes | Trustpilot, stores : une application qui perd ses abonnés | Gratuit | À la main, pour « reprendre » ou « faire évoluer » |

**Ce qui ne marche pas, vérifié le 03/11/2026.**
- **Reddit** refuse la lecture sans compte.
- **Les groupes Facebook** demandent une connexion.
- **Malt** bloque.
- **Codeur** masque le client, et un projet y reçoit 80 à 100 devis dans la journée.
- **cofondateur.fr** : des porteurs qui offrent des parts, pas un budget.

On ne cherche pas non plus les pseudonymes des gens : c'est peu fiable et hors du cadre de la prospection entre professionnels.

**L'astuce Codeur.** Une annonce Codeur ne montre pas qui l'a postée. Mais le même projet est souvent déclaré au BODACC avec les mêmes mots (« marketplace BTP », « mise en relation particuliers et artisans »). Une recherche de ces mots dans le CSV retrouve parfois l'entreprise, et donc un contact direct.

**Pappers et societe.com** revendent les données publiques de l'annuaire officiel, y compris les autres mandats des dirigeants et les comptes publiés. Le script les lit à la source, gratuitement, sans abonnement.

## 5. Ce que fait le script

```bash
node scripts/prospection/signaux-bodacc.mjs
```

Par défaut, les 7 derniers jours. `--jours 30` ou `--depuis 2026-10-01` pour remonter plus loin.

1. Il lit au BODACC toutes les créations et tous les changements d'activité qui parlent d'application, de plateforme ou de logiciel en ligne.
2. Il écarte le bruit : livreurs Uber Eats, revendeurs Vinted, streamers, « application de résine ».
3. Il écarte les **concurrents** : développeurs, agences web, sociétés informatiques.
4. Il interroge l'annuaire officiel des entreprises : dirigeants, date de création, métier actuel, salariés, établissements, chiffre d'affaires quand il est publié. Il garde une mémoire locale, donc le lancement de la semaine suivante est rapide.
5. Il écarte les personnes qui ont **refusé la diffusion** de leurs données : on ne les prospecte pas.
6. **Le profil du fondateur.** Pour chaque dirigeant, il cherche toutes les autres entreprises actives qu'il dirige, avec le même nom, le même prénom et le même mois de naissance. Si une holding préside la piste, il ouvre la holding pour trouver la personne derrière et ses filiales. Il range ces entreprises en commerce, holding, immobilier ou informatique, et les décrit dans la colonne « Autres entreprises du fondateur ».
7. **La hausse de capital.** Il lit aussi les hausses de capital de la semaine, et relit tout l'historique BODACC de chaque piste, 100 entreprises par appel. L'annonce de hausse donne le nouveau capital, l'ancien est dans une annonce précédente.
   - Une hausse depuis deux ans d'au moins 5 000 € rapporte 2 points, ou 3 si le capital a au moins doublé.
   - Une entreprise dont l'activité est une application et qui vient d'augmenter son capital devient une piste « Hausse de capital ». On écarte les sociétés civiles, les grands groupes au-delà d'un million, les holdings et les sociétés de programmation.
   - La colonne « Preuves d'argent (registres) » liste ce que les registres prouvent : hausse de capital, capital d'au moins 10 000 €, chiffre d'affaires d'au moins 100 000 €, salariés, établissements. « Le fondateur dirige une autre entreprise » n'y figure pas.
8. **L'App Store.** Pour les 60 meilleures pistes, il cherche si une application existe déjà sous le nom de l'entreprise ou du dirigeant. Le résultat va dans la colonne « App déjà en ligne ? ».
9. Il note chaque piste et explique la note en clair dans la colonne « Pourquoi ».
   - **Ce qui fait monter la note :**
     - une entreprise déjà en activité, avec un autre métier, qui ajoute une application : **la cible numéro un** ;
     - un projet précis, comme « mise en relation entre X et Y », plutôt qu'un objet social vague ;
     - un modèle de revenus déclaré : abonnement, commission, réservation ;
     - un secteur proche des clients de Noé ;
     - une société avec du capital ;
     - une hausse de capital depuis deux ans.
   - **L'argent du fondateur** fait aussi monter la note :
     - il dirige déjà d'autres entreprises, encore plus si l'une a plus de trois ans ;
     - il a une holding ou du patrimoine immobilier ;
     - une de ses entreprises a des salariés, plusieurs établissements, ou au moins 100 000 € de chiffre d'affaires publié.
   - **Ce qui fait baisser la note :**
     - un objet social fourre-tout ;
     - une micro-entreprise toute neuve ;
     - un fondateur qui dirige une société informatique, signalé dans la colonne « Fondateur technique ? » ;
     - une application déjà sur l'App Store.
10. Il écrit `prospects-signaux/signaux-du-AAAA-MM-JJ-au-AAAA-MM-JJ.csv`, trié par note, avec des colonnes vides pour le suivi : contact, canal, message envoyé, relance, réponse, statut.

Durée : environ 4 minutes, car l'App Store limite le rythme des recherches. `--sans-app-store` va plus vite.

**Les campagnes Ulule** ont leur propre script :

```bash
node scripts/prospection/campagnes-ulule.mjs
```

Il lit l'API publique d'Ulule, sans clé, et garde les campagnes de France lancées depuis 12 mois (`--mois 6` pour moins) :
- le nom ou le sous-titre parle d'une application ;
- au moins 3 000 € collectés ;
- l'objectif atteint, ou à moitié pour une campagne en cours.

Il écrit `prospects-signaux/ulule-AAAA-MM-JJ.csv` avec ce que finance l'argent et qui porte le projet. La colonne « Nouvelle ? » marque les campagnes jamais vues. Environ 2 minutes. Premier passage le 03/11/2026 : 17 campagnes.

**Ouvrir dans Google Sheets** : Fichier, Importer, Importer, choisir le CSV, « Insérer de nouvelles feuilles ».

## 6. La routine du lundi

**Côté Claude, environ 20 minutes.** Dans Claude Code, ouvert sur landing-page, Noé demande « lance la prospection du lundi ». La commande `qualifier-signaux` (`.claude/skills/qualifier-signaux/`) :
1. lance les deux scripts, BODACC et Ulule ;
2. choisit les pistes jamais qualifiées, avec `scripts/prospection/choisir-pistes.mjs` : les 16 meilleures notes du BODACC et 4 campagnes Ulule ;
3. fouille le web pour chacune : l'application existe-t-elle, faite sans code ou par une équipe ? Le fondateur est-il technique ? Quelles preuves d'argent et quels signes de démarrage ? Quels contacts professionnels publics ?
4. lit LinkedIn, Instagram et Facebook dans le Chrome de Noé, pour les pistes retenues. Lecture seule, 15 pages au plus, lentement, car LinkedIn interdit les robots et c'est le compte de Noé ;
5. regarde les pubs de ces pistes dans les bibliothèques publiques de Meta et de Google ;
6. donne un verdict, « À contacter », « À creuser » ou « À écarter », avec une accroche, et rédige les messages ;
7. fait entrer les « À contacter » dans Nowork, avec `nowork/scripts/importer-prospects-signaux.mjs`. Chaque piste devient une fiche « Nouveau », provenance « Prospection », en tête de « À faire maintenant ».
   - Cinq **pastilles**, lues au survol comme celles d'un lead Meta : pourquoi lui, son projet, l'argent, le démarrage, comment je l'ai trouvé. Le descriptif reste vide pour Noé.
   - Le **bloc-notes** donne le message prêt et tout le dossier.
   - Une piste déjà dans Nowork, par son SIREN, son téléphone ou son email, est sautée.
   - Rien n'est envoyé à personne ;
8. livre `prospects-signaux/qualifies-AAAA-MM-JJ.csv`, qui garde aussi les « À creuser » et les « À écarter ».

**La règle « À contacter », depuis le 03/11/2026.** Cinq conditions, toutes nécessaires :
1. Au moins **deux preuves d'argent fortes**. Les preuves fortes :
   - une hausse de capital ;
   - un capital d'au moins 10 000 € ;
   - au moins 100 000 € de chiffre d'affaires publié ;
   - des salariés ou plusieurs établissements ;
   - une levée de fonds, un prêt d'honneur ou un incubateur ;
   - une collecte réussie ;
   - un commerce de plus de trois ans avec au moins 50 avis Google ;
   - de la publicité payée.

   « Le fondateur dirige une autre entreprise », une holding, l'ancienneté ou des abonnés ne comptent jamais seuls.
2. Au moins **un signe de démarrage** de moins de six mois. L'annonce légale seule ne suffit pas.
3. **Personne de technique** dans l'équipe.
4. **Aucune application ni prestataire** qui ferait déjà le travail.
5. **Un contact professionnel public.**

Il manque une condition : « À creuser ».

**Côté Noé, environ 30 minutes.**
1. **Ouvrir Nowork.** Les « À contacter » sont en tête de « À faire maintenant ». Dans chaque fiche, les pastilles disent pourquoi lui et comment il a été trouvé, et le bloc-notes donne le message prêt et le canal. Vérifier en un clic le site et le message.
2. **Envoyer, un par un.** WhatsApp si un mobile professionnel est publié, sinon email, sinon LinkedIn. Jamais un envoi groupé.
3. **Survoler les « À creuser ».** Le plus souvent, on attend : le lieu n'est pas encore ouvert, ou le contact manque.
4. **Relancer** une fois à J+4 et une fois à J+10, puis s'arrêter.
5. **Suivre dans Nowork**, comme un lead du formulaire : qualification, appel 1 puis visio 2. Le bouton « Premier message » ne s'affiche pas sur ces fiches, parce que son texte parle du formulaire : copier le message du bloc-notes.

**Ce que la qualification sait, et d'où.**

| Question | Comment on le sait | Fiabilité |
|---|---|---|
| A-t-il de l'argent ? | Automatique : hausse de capital, capital, salariés, chiffre d'affaires publié, collecte Ulule. Recherche web : avis Google, levée de fonds, incubateur. À la main : pubs Meta et Google. Les autres entreprises du fondateur ne sont qu'un indice | Bonne pour une société, faible pour une micro-entreprise neuve |
| Est-il technique ? | Une société informatique à son nom : automatique. Son LinkedIn et celui de ses associés, lus dans le Chrome de Noé | Très bonne |
| L'application existe-t-elle ? | L'App Store au nom de l'entreprise : automatique. Site, Google Play, outil sans code : recherche web | Bonne |
| Démarre-t-il bientôt ? | La date de l'annonce légale. Une bêta, un salon, une page « bientôt » : recherche web | Moyenne |
| A-t-il une audience ? | Abonnés et derniers posts Instagram et Facebook, lus dans le Chrome de Noé | Bonne |
| Comment le joindre ? | Mentions légales, fiche Google, fiche App Store, email affiché sur Facebook ou Instagram | Environ une piste sur deux |

**Premier essai, le 02/11/2026.** Sur les 16 meilleures pistes de la semaine, la recherche a donné 1 piste à contacter, 7 à creuser et 8 à écarter. Elle a attrapé ce que le registre ne dit pas :
- un président développeur Android, dont l'application était déjà en ligne ;
- une équipe qui a déjà un CTO ;
- deux projets déjà montés sans code, sur Lovable et Base44.

Une première version sans code est un bon signal : l'idée est testée, et il faudra la vraie version.

Les réseaux, lus ensuite dans le Chrome de Noé, ont changé 6 verdicts sur 7. Ils ont révélé un cofondateur ancien développeur, une audience de 29 abonnés, un lancement annoncé et une halle gourmande en travaux avec son email. Bilan final : 4 pistes à contacter, 1 à creuser, 11 à écarter.

## 7. Le message

Principes :
- **Vouvoiement** : premier échange individuel (voir `documentation/context/positionnement.md`, Tonalité).
- **Parler de son projet à lui**, tel qu'il l'a déclaré, pas de Noé.
- **Donner quelque chose d'utile tout de suite** : une remarque juste sur son modèle de revenus, et l'offre d'une maquette de l'écran principal. Pas de vidéo générique, pas de lien vers le site en premier.
- **Court** : moins de 100 mots. **Pas de tiret cadratin.**
- **Une sortie claire** : la CNIL l'impose et ça rassure.

### Email

> **Objet :** [Nom du projet] : une idée pour vos premiers clients
>
> Bonjour [Prénom],
>
> J'ai vu que vous lanciez [Nom du projet], [ce qu'il a déclaré, en une phrase simple].
>
> Je conçois des applications mobiles et web pensées pour rapporter. Un point sur votre projet : [remarque utile, voir la liste ci-dessous].
>
> Si ça peut vous aider, je vous prépare gratuitement la maquette de l'écran principal de [Nom du projet], pour voir votre application avant de vous lancer. Ça vous intéresse ?
>
> Noé Calmes · Expert en applications mobiles & web · noecalmes.fr
>
> Si ce n'est pas le moment, dites-le-moi et je ne vous écrirai plus.

### Message LinkedIn (300 caractères maximum)

> Bonjour [Prénom], j'ai vu le lancement de [Nom du projet]. Je conçois des applications pensées pour rapporter et j'ai une idée sur [son modèle : la commission, l'abonnement…]. Je vous prépare la maquette de l'écran principal, offerte ? Noé

### Relance (J+4)

> Bonjour [Prénom], je reviens vers vous pour la maquette de [Nom du projet]. Je peux vous l'envoyer cette semaine. Un simple oui suffit.

### Remarques utiles, selon le modèle déclaré

- **Mise en relation** : le plus dur est d'avoir de l'offre avant la demande. Commencer par un seul côté et une seule ville.
- **Abonnement** : tout se joue sur le moment où l'on demande de payer. Montrer la valeur avant l'écran de paiement.
- **Réservation** : un acompte ou un rappel la veille fait chuter les absences, et c'est ce que le professionnel paiera.
- **Fidélité pour commerçants** : c'est le commerçant qui paie. L'application doit lui prouver un retour chaque mois.
- **Entreprise avec une clientèle** (restaurant, coach, salle) : ses clients actuels sont ses premiers abonnés. L'application transforme une clientèle en revenu récurrent.

## 8. Règles à respecter

- **CNIL, prospection entre professionnels** : pas besoin d'accord préalable si le message concerne le métier de la personne. Chaque message dit qui écrit et permet de refuser la suite. Source : [CNIL, la prospection commerciale par courrier électronique](https://www.cnil.fr/fr/la-prospection-commerciale-par-courrier-electronique).
- **WhatsApp et SMS** : même règle que l'email entre professionnels. Le message doit porter sur le métier de la personne, dire qui écrit et permettre de refuser la suite. Source : [CNIL, la prospection commerciale par SMS et MMS](https://www.cnil.fr/fr/la-prospection-commerciale-par-sms-mms).
- **Appel à froid** : la règle n'a pas été vérifiée ici. Premier contact par écrit, puis appel quand la personne répond.
- **Courrier papier** : seulement à l'adresse commerciale d'une société, jamais à un entrepreneur individuel.
- **Coordonnées professionnelles seulement.** Jamais l'adresse personnelle d'un entrepreneur individuel, même si le BODACC la publie. Jamais un email deviné.
- **Aucun contournement** : pas de faux navigateur ni de passage forcé d'une page bloquée pendant la recherche.
- **Personnes en non-diffusion** : écartées par le script, ne pas les chercher à la main.
- **Aucune liste dans git.** Le dossier `prospects-signaux/` est ignoré ; ne jamais le forcer.
- **Quelqu'un qui dit non** : on le note dans le Sheet et on ne lui écrit plus jamais.

## 9. Mesurer

Chaque lundi, une ligne : pistes vues, messages envoyés, réponses, appels, devis, signatures.
Bilan après 4 semaines. La question : est-ce que ça amène au moins un appel avec quelqu'un de prêt à démarrer, par semaine, pour une heure de travail ?

## 10. Plus tard

- **Google Places**, pour avoir en automatique le téléphone, le site et le nombre d'avis Google de chaque commerce. Il faut une clé créée par Noé dans Google Cloud, que Claude ne manipule pas. La gratuité mensuelle et la gamme de prix du champ téléphone restent à vérifier sur la grille de Google.
- Lancer le script tout seul chaque lundi et envoyer le CSV.
- Automatiser le Journal de Monaco.
