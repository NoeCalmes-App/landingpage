# Plan de contenu SEO — cluster « application qui rapporte »

> Source de vérité de la stratégie de contenu SEO. La tâche programmée hebdo lit ce fichier, prend le prochain sujet `pending`, rédige un brouillon, et passe le sujet en `done`. Noé relit et publie lui-même.

## La stratégie en une phrase

On ne se bat PAS sur les têtes de gondole d'agence (« créer une application mobile », « développeur mobile »). On **possède l'angle monétisation** : personne n'écrit sur « comment une application génère des revenus » depuis quelqu'un qui a une app à 13 000 €/mois. Faible concurrence + bonne intention (entrepreneurs avec budget) + ça renforce le positionnement.

## Architecture (pillar + cluster)

- **Page pilier** (à créer en priorité) : « Comment rentabiliser une application mobile » — page longue qui chapeaute le sujet et lie vers tous les articles satellites.
- **Articles satellites** : un par mot-clé long-tail ci-dessous, chacun reliant vers la page pilier et vers 1-2 autres articles (maillage interne).

## Où trouver le prochain sujet

> La file opérationnelle est dans **`idees-articles.md`** : 12 briefs prêts,
> avec le format, l'angle, les questions de FAQ et les liens à poser. Ce
> fichier-ci garde la stratégie et les mots-clés ; le brief hebdo est là-bas.

## Format d'un article

> Le format complet (champs obligatoires, blocs visuels, structure du corps)
> est dans **`modele-article.md`**. À lire avant de rédiger : depuis la refonte
> du 20/08/2026, un article ne se résume plus à un titre et du texte.

## Règles de rédaction (NON négociables)

- **« Tu » partout.** Jamais « vous ».
- **Zéro emoji. Zéro tiret cadratin (—).** Utiliser virgules, deux-points, points.
- **Mots en entier** : « application » (pas « app » sauf citation), « développeur » (pas « dev »).
- **Preuve réelle, jamais en frime** : intégrer naturellement « une application que j'ai conçue génère 13 000 €/mois », « +20 applications publiées », Hush (1ʳᵉ version, 300 000 utilisateurs) quand pertinent. Mener par l'expertise, le chiffre suit.
- **Périmètre honnête** : Noé fait le marketing DANS l'app (conversion des utilisateurs en clients), PAS la publicité qui ramène les utilisateurs. Ne jamais promettre de l'acquisition/trafic.
- **Contenu vraiment utile** (E-E-A-T) : conseils concrets, exemples, pas de remplissage. Google pénalise le contenu généré en masse sans valeur.
- **Format** : HTML simple (`<p>`, `<h2>`, `<strong>`, `<ul>`, `<li>`), comme les articles existants dans `src/Blog.jsx` (constante `BLOG_ARTICLES`). 700 à 1100 mots.
- **Lisibilité (règle du 03/08/2026)** : la longueur n'est pas le problème, la densité si. Paragraphes de 40 mots en moyenne, 80 au maximum, jamais deux gros blocs qui se suivent. Dès qu'une phrase énumère trois éléments ou plus (signaux, indicateurs, options, erreurs), la transformer en `<ul>` avec une phrase d'amorce finissant par deux points. Objectif : l'article doit rester scannable sur un écran de téléphone.
- **CTA de fin** : `finalCta: 'audit'` (vers l'audit gratuit), comme les articles existants.
- **Maillage interne** : lier vers la page pilier + 1-2 articles du cluster.
  **Tous les liens internes écrits dans le corps de l'article portent la barre
  finale** (`/blog/rentabiliser-application-mobile/`, `/audit-app/`). Sans elle,
  chaque lien coûte une redirection 301 à chaque passage de robot, et le build
  échoue. En plus de ces liens dans le texte, l'article reçoit automatiquement
  un bloc « À lire aussi » alimenté par `ARTICLES_LIES`.
- **Quizz** : trois pages de test existent (`/quiz/`), sur des requêtes
  d'acheteur (besoin réel, application ou site web, budget). Un article peut
  renvoyer vers le test pertinent, c'est un bon relais avant l'audit.
- **Restitution à Noé** : dans le message final, toujours donner le titre puis **le corps complet de l'article en texte lisible** (pas seulement un résumé, pas de balises HTML), pour qu'il puisse le relire directement dans la conversation sans ouvrir le brouillon. Ensuite seulement, le chemin du fichier et l'URL.

## Filtre d'intention (règle du 10/08/2026, à appliquer AVANT de rédiger)

Un sujet peut être parfaitement dans l'angle « monétisation » et rester inutile commercialement. Le test n'est pas « est-ce que ça parle de revenus », c'est : **est-ce que la personne qui tape cette requête peut m'acheter une application ?**

La cible (voir `documentation/context/positionnement.md`) : entrepreneur non technique ou semi-technique, avec une idée, des clients ou une audience, budget 5 000 à 30 000 €. Il n'a PAS encore d'application. C'est ça qui décide de tout.

| Requête d'acheteur (à écrire) | Requête d'éditeur (à éviter) |
|---|---|
| « application mobile pour coach sportif » | « fixer le prix d'un abonnement in-app » |
| « combien coûte une application » | « optimiser son onboarding » |
| « transformer sa formation en application » | « améliorer son taux de rétention D30 » |
| « faut-il une application pour mon entreprise » | « A/B tester un paywall » |

Un sujet d'éditeur attire des gens qui ont déjà une application et la gèrent eux-mêmes : ce sont des pairs, pas des clients. Le trafic monte, les leads non.

Deux tests rapides avant de rédiger :

- **Test du prospect** : est-ce que quelqu'un qui tape ça pourrait finir sur `/audit-app` et remplir le formulaire ? Si non, changer de sujet.
- **Test du vocabulaire** : le mot-clé contient-il un terme de métier (paywall, onboarding, churn, MRR, ARPU) ? Si oui, il est mal ciblé. Ces notions peuvent être expliquées DANS un article, elles ne doivent pas en être le mot-clé.

Bon réflexe : ancrer le sujet dans l'activité du lecteur (coach, formateur, salle, consultant, créateur, commerçant) ou dans sa décision d'investissement (coût, potentiel, délai, risque), pas dans la mécanique produit.

## File de sujets (le prochain `pending` est rédigé chaque semaine)

Deux colonnes, deux choses différentes. Ne pas les confondre.

- **Statut** : pilote la tâche programmée. `pending` = pas encore rédigé, `done` = brouillon écrit dans `drafts/`. Seule la tâche modifie cette colonne.
- **En ligne** : est-ce que l'article est publié sur le site (présent dans `Blog.jsx` + `generate-routes.js` + `sitemap.xml`) ? `non` = brouillon en attente de relecture. C'est Noé qui passe cette colonne à `oui` après avoir intégré et déployé.

Un sujet peut donc être `done` et `non` en même temps : le brouillon existe, mais rien n'est publié.

| # | Statut | En ligne | Titre / mot-clé cible | Intention |
|---|--------|----------|------------------------|-----------|
| 1 | done | oui | Comment rentabiliser une application mobile (PAGE PILIER) | Le hub du cluster, vue d'ensemble des modèles de revenus |
| 2 | done | oui | Combien rapporte une application mobile en 2026 | Curiosité + chiffres réels + preuve Calories |
| 3 | done | oui | Modèle économique d'une application mobile : lequel choisir | Abonnement vs freemium vs achats in-app vs pub |
| 4 | done | oui | Application par abonnement : comment ça marche et combien ça rapporte | Le modèle le plus rentable, expliqué |
| 5 | done | oui | Comment transformer une idée d'application en business rentable | De l'idée au revenu, la méthode |
| 6 | done | oui | Pourquoi 90 % des applications ne rapportent rien (et comment éviter ça) | L'angle fort de Noé : la différence c'est l'expertise |
| 7 | ~~pending~~ A REFORMULER | non | ~~Freemium ou abonnement : quel modèle pour ton application~~ | Risque de cannibalisation avec les sujets 3 et 4, qui traitent déjà cet arbitrage. Ne pas rédiger tel quel. |
| 8 | ~~done~~ HORS CIBLE | non | ~~Comment fixer le prix d'un abonnement dans une application~~ | Brouillon écrit le 10/08/2026 puis écarté : requête d'éditeur d'application, pas d'acheteur de prestation. Voir « Filtre d'intention » ci-dessous. Ne pas publier tel quel, ou le réécrire côté acheteur (« combien facturer l'abonnement de ton application »). |
| 9 | ~~pending~~ A REQUALIFIER | non | ~~Onboarding d'application : convertir tes utilisateurs en clients~~ | Même problème que le 8 : « onboarding » est un mot d'éditeur. À réécrire en requête acheteur, par exemple « pourquoi les gens désinstallent ton application ». |
| 10 | done | non | Comment une application transforme une audience en revenus récurrents | Pour ceux qui ont déjà une communauté. Rédigé le 17/08/2026. |
| 11 | done | non | Application mobile pour coach, formateur ou consultant : transformer ton expertise en revenus | Cible ICP directe. Rédigé le 10/08/2026 en remplacement du sujet 8. |
| 12 | ~~pending~~ SUPPRIME | non | ~~Les erreurs qui empêchent une application de générer des revenus~~ | Doublon direct du sujet 6, dont les six raisons sont déjà une liste d'erreurs. Ne pas rédiger. |
| 13 | done | oui | Créer une application avec l'IA : la pire idée si tu veux qu'elle rapporte | Mot-clé chaud « application IA / vibe coding ». Sujet ajouté hors file le 03/08/2026. |
| 14 | pending | non | Transformer ta formation en application mobile : ce que ça change pour tes revenus | Formateurs et organismes. Requête acheteur : « transformer sa formation en application ». |
| 15 | pending | non | Application mobile pour salle de sport et studio : à quoi elle sert vraiment | Salles, studios, box. Requête acheteur locale et sectorielle. |
| 16 | pending | non | Application ou site web : lequel rapporte le plus pour ton activité | Arbitrage classique avant achat, forte intention. |
| 17 | pending | non | Créer une application sans savoir coder : les vraies options et ce qu'elles coûtent | Requête massive de l'ICP non technique, angle honnête sur no-code et IA. |
| 18 | pending | non | Combien de clients faut-il pour rentabiliser une application mobile | Calcul de retour sur investissement, la question que se pose l'acheteur. |
| 19 | pending | non | Application mobile pour consultant et indépendant : vendre autrement que ton temps | ICP direct, angle revenus non horaires. |

## Mots-clés cibles (établi le 20/08/2026)

> Ce tableau remplace le choix de sujet au feeling. Chaque ligne a passé les
> deux tests du filtre d'intention ci-dessus : la personne qui tape ça peut
> acheter une application, et le mot-clé ne contient aucun terme de métier.

**La logique de priorisation.** On ne classe pas par volume de recherche. On
classe par **distance à l'achat**. Une requête à 200 recherches par mois tapée
par quelqu'un qui a un budget vaut mieux que 5 000 recherches de curieux. C'est
tout l'inverse du réflexe habituel, et c'est ce qui rend la niche gagnable.

### Priorité 1 — décision d'investissement (le lecteur a un budget)

| Mot-clé cible | Intention | État |
|---|---|---|
| combien coûte une application mobile | Prix, comparaison de devis | En ligne |
| créer une application sans savoir coder | ICP non technique, angle honnête sur no-code et IA | À écrire (sujet 17) |
| combien de clients pour rentabiliser une application | Calcul de retour sur investissement | À écrire (sujet 18) |
| cahier des charges application mobile | Prépare son projet, très proche de l'achat | **À ajouter** |
| combien de temps pour créer une application mobile | Délai, objection fréquente | **À ajouter** |
| application mobile sur mesure ou no-code | Arbitrage avant achat | **À ajouter** |

### Priorité 2 — le lecteur a une activité à transformer

| Mot-clé cible | Intention | État |
|---|---|---|
| application mobile pour coach / formateur / consultant | ICP direct | En ligne |
| transformer sa formation en application | Formateurs, organismes | À écrire (sujet 14) |
| application mobile pour salle de sport | Salles, studios, box | À écrire (sujet 15) |
| application mobile pour son entreprise | Requête large mais acheteuse | **À ajouter** |
| application mobile pour artisan / commerçant | Secteur peu travaillé, concurrence faible | **À ajouter** |

### Priorité 3 — monétisation (la niche qu'on possède)

Le cluster est déjà bien couvert. Ne pas en rajouter tant que les priorités 1
et 2 ne sont pas traitées : on y est déjà, chaque article de plus se
cannibalise avec les précédents.

### Priorité 4 — local

| Mot-clé cible | Intention | État |
|---|---|---|
| application mobile Toulouse | Requête n°1 du site en impressions | En ligne |
| création application mobile Occitanie | Élargissement régional | **À ajouter, après Toulouse** |

Ne pas créer de page pour Montpellier, Bordeaux ou Paris. Sans présence réelle
ni avis locaux, ce sont des pages vides que Google traite comme du contenu
dupliqué de faible qualité, et elles affaiblissent la page Toulouse.

### Requêtes à NE PAS viser

- « développeur mobile », « créer une application mobile », « agence
  application mobile » : têtes de gondole tenues par des sites à très forte
  autorité, ingagnables pour un site jeune.
- « développeur Flutter », « application React Native » : requêtes de
  recruteurs et de techniciens, pas d'acheteurs.
- Tout ce qui contient paywall, onboarding, churn, MRR, ARPU, rétention D30 :
  requêtes d'éditeurs d'applications, donc de pairs, pas de clients.

### Couverture par les quizz

Trois requêtes d'arbitrage sont désormais traitées par des pages de test
plutôt que par des articles, parce que le format y répond mieux :

- « faut-il une application pour mon entreprise » → `/quiz/ai-je-besoin-application-mobile/`
- « application ou site web » → `/quiz/application-ou-site-web/`
- « quel budget pour une application » → `/quiz/budget-application-mobile/`

Ne pas écrire d'article sur ces trois sujets, il ferait doublon.

## Dette SEO sur les anciens articles (audit du 03/08/2026)

Les articles du cluster « monétisation » (1 à 5) respectent les limites : metaTitle ≤ 65 caractères, description ≤ 155. Les articles plus anciens, écrits avant cette stratégie, dépassent et se font tronquer dans les résultats Google. Ils sont aussi en « vous » et sur un angle générique d'agence, pas sur la cible entrepreneurs.

| Article | metaTitle | description |
|---------|-----------|-------------|
| application-mobile-meilleur-investissement | 77 | 142 |
| combien-coute-application-mobile | 78 | 162 |
| creer-application-mobile-guide | 73 | 182 |
| reprendre-application-mobile-existante | 68 | 171 |
| faire-evoluer-application-mobile | 74 | 184 |
| choisir-expert-application-mobile | 76 | 175 |

**Soldée le 20/08/2026.** Les 7 articles concernés (les 6 ci-dessus plus
`mvp-application-mobile`) ont été repris : metaTitle ≤ 65, description ≤ 155,
voix en « tu ». Le tableau ci-dessus est conservé comme trace de l'audit.

Deux choses avaient été découvertes en les corrigeant, qui expliquent pourquoi
raccourcir les titres n'avait servi à rien jusque-là :

- Les titres et descriptions existaient **en double**, dans `src/Blog.jsx` et
  dans `scripts/generate-routes.js`, et avaient divergé sur 6 articles sur 17.
  Google exécutant le JavaScript, c'est la version de `Blog.jsx` qui gagnait :
  des titres raccourcis exprès dans le script étaient re-rallongés au rendu.
- `src/Blog.jsx` est désormais la **seule** source. Le build échoue si une
  limite est dépassée, donc la dette ne peut plus se reconstituer en silence.

## Comment intégrer un brouillon (côté Noé)

> Process modifié le 20/08/2026. L'étape sitemap a disparu, une étape de
> maillage est devenue obligatoire, et le build refuse maintenant un article
> mal intégré.

1. Ouvrir le brouillon dans `documentation/strategy/seo/drafts/`.
2. Relire, ajuster la voix si besoin.
3. Copier l'objet article dans la constante `BLOG_ARTICLES` de `src/Blog.jsx`
   (slug, title, metaTitle, description, date, readTime, finalCta, content).
   **`metaTitle` ≤ 65 caractères, `description` ≤ 155.** C'est la seule source :
   ne pas les redéfinir ailleurs.
4. **Ajouter le slug à la table `ARTICLES_LIES` de `src/Blog.jsx`** : lui donner
   3 liens sortants, et le citer dans au moins 2 autres entrées pour qu'il
   reçoive des liens entrants. Un article sans lien entrant est un cul-de-sac
   pour Google ; c'était le cas de 11 articles sur 17 avant cette date.
5. Ajouter la route dans `scripts/generate-routes.js` (tableau `blogRoutes`),
   avec **seulement** `path`, `heading` et `content` pour le pré-rendu.
6. `npm run build`. Le build s'arrête et explique quoi corriger si le maillage,
   les longueurs de meta ou les liens internes ne passent pas.
7. Commit, push, déployer, puis demander l'indexation de l'URL (avec la barre
   finale) dans Search Console.

Le sitemap n'est plus à toucher : il est généré à partir des pages réellement
produites.

> Quand les 12 sont `done`, prévenir Noé pour planifier la vague suivante (ou approfondir/mettre à jour les articles existants).
