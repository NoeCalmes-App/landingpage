# Dossier SEO — Noé Calmes (manager)

> Tout le SEO au même endroit. Ce fichier est le tableau de bord : ce qui est fait, ce qui tourne en automatique, ce qui reste à faire. Les détails sont dans les fichiers du dossier.

MàJ : 20/08/2026

## Les fichiers du dossier

- `roadmap.md` : la stratégie complète et l'ordre de priorité (le plan d'ensemble).
- `content-plan.md` : la file des sujets, les mots-clés cibles et les règles de rédaction.
- `modele-article.md` : le FORMAT d'un article (champs obligatoires, blocs visuels, structure). À lire avant de rédiger.
- `idees-articles.md` : **la banque de briefs prêts à écrire.** C'est le fichier à ouvrir chaque semaine : tu prends le brief du haut, tu écris.
- `google-business.md` : le pas-à-pas de la fiche Google Business + tous les textes prêts à coller.
- `drafts/` : les brouillons d'articles écrits chaque semaine, à relire.

## Identité (à réutiliser partout)

- **Nom d'entreprise (Google Business)** : Noé Calmes (sans mots-clés ajoutés, sinon suspension).
- **Catégorie Google Business** : Développeur de logiciels (principale) + Consultant en informatique, Conception de sites Internet (secondaires).
- **Lien WhatsApp (Google Business, leads froids)** : `https://wa.me/33658308210?text=Salut%20No%C3%A9%2C%20j'ai%20un%20projet%20d'application%20mobile%20et%20j'aimerais%20en%20discuter.%20En%202%20mots%2C%20mon%20id%C3%A9e%20%3A%20`
- **Description Google Business** : voir `google-business.md`.
- **Angle SEO** : on possède la niche « application qui rapporte / monétisation » + le local « Toulouse / Occitanie ». On ne se bat pas sur « développeur mobile » (ingagnable).

## Ce qui est fait (technique, en attente de déploiement)

- [x] Meta, titres, descriptions, JSON-LD réécrits vers l'angle revenus, en « tu », sans tiret cadratin (index.html).
- [x] Pages section (generate-routes.js) + hero pré-rendu de la home resynchronisés.
- [x] Schema `Article` ajouté aux pages de blog.
- [x] Liens internes ajoutés sur les pages pré-rendues (Google en voyait 0).
- [x] `/avis` et `/rendez-vous` passés en noindex + retirés du sitemap (contenu dupliqué / page vide).
- [x] Page locale créée : `/blog/creation-application-mobile-toulouse`.
- [x] Sitemap rafraîchi (14 URLs, dates à jour).

> ⚠️ Rien n'est en ligne tant que Noé n'a pas fait `git add` + commit + `git push` (le GitHub Action build et déploie).
>
> ⚠️ Cette liste date du 24/06 et **décrit un correctif qui n'était appliqué
> qu'au HTML servi**. Lire la section « Chantier du 20 août 2026 » plus bas
> avant de s'y fier.

## Ce qui tourne en automatique

- **Tâche programmée `seo-blog-hebdo`** (chaque lundi ~9h) : rédige 1 brouillon d'article du cluster monétisation dans `drafts/`, met à jour `content-plan.md`, et donne l'URL + le rappel d'indexation. Ne publie rien : Noé relit et publie. Tourne en continu (génère de nouveaux sujets quand les 12 sont faits).

## État réel constaté dans Search Console — 8 août 2026

**Le diagnostic qui change tout : ce n'était pas un problème de contenu, mais
d'accès.** 7 pages indexées sur 45. Sur les 38 non indexées, 27 étaient en
« erreur liée à des redirections » — dont `/audit-app`, `/blog` et la quasi
totalité des articles. Googlebot échouait depuis le 21 mars ; dernière
tentative le 24 juin, PUIS les correctifs pré-rendus ont été déployés. Le test
en direct du 8 août répond « Google a accès à cette URL » : **le site est
réparé, Google ne le savait juste pas** (après des mois d'échecs, il espace
ses visites).

**LA CAUSE RACINE, trouvée le soir même : une boucle de canonique.** Les pages
sont des dossiers (`chemin/index.html`), donc GitHub Pages les sert à
`/chemin/` (avec barre) et répond à `/chemin` par une 301. Or canoniques et
sitemap disaient `/chemin` sans barre : Google suivait le sitemap → 301 →
lisait la page → la canonique le renvoyait sur l'URL qui redirige → boucle →
« erreur liée à des redirections ». C'est pour ça que des crawls du 3 août
échouaient encore alors que le site marchait pour les humains, et que le test
en direct passait (il ne vérifie pas la canonique). **Correctif dans
`scripts/generate-routes.js`** (`urlPublique()` : canonique, og:url,
breadcrumbs, mainEntityOfPage, liens du pré-rendu) **et `public/sitemap.xml`**
(21 URLs en forme `/chemin/`, lastmod 2026-08-08). Règle pour la suite : une
URL absolue écrite dans ces fichiers porte TOUJOURS la barre finale.

Fait le 8 août dans Search Console :
- [x] Test en direct de `/audit-app` : accessible, indexable.
- [x] « Demander une indexation » sur `/audit-app` (file prioritaire).
- [x] « Valider la correction » sur l'erreur de redirections → Google
      re-crawle les 17 pages (délai : quelques jours à 2 semaines).
- [x] Sitemap vérifié : un seul (`noecalmes.fr/sitemap.xml`), lu le 7 août,
      21 pages découvertes, 0 erreur. Le doublon www n'existe plus.
- Les 4 pages « noindex » sont volontaires (`/avis`, `/rendez-vous`…), rien à faire.

**Google Business : les fiches EXISTENT — mais en DOUBLE, et c'est un risque.**
Le gestionnaire montre deux établissements validés :
1. « Noé Calmes » — Toulouse (une modification en attente sur le crayon).
2. « Noé Calmes — Création d'application mobile (Flutter) » — France/Paris/Toulouse.

La fiche 2 viole la règle notée plus haut dans CE fichier (« sans mots-clés
ajoutés, sinon suspension ») et fait doublon : Google peut suspendre les deux.
Décision à prendre par Noé : garder « Noé Calmes » (Toulouse), supprimer ou
fusionner l'autre. Ne pas créer de troisième fiche.

## Chantier du 20 août 2026 — le correctif d'août n'était appliqué qu'à moitié

**Le point le plus important de ce fichier.** Le 8 août, la boucle de canonique
a été corrigée dans `scripts/generate-routes.js`. Elle ne l'avait PAS été dans
le JavaScript de l'application. Or Google exécute le JavaScript : le HTML servi
était correct, puis React réécrivait la balise canonique **sans** la barre
finale à l'hydratation. Vérifié en direct sur le site en ligne le 20/08 :

| | Canonique |
|---|---|
| HTML servi | `/blog/rentabiliser-application-mobile/` correct |
| DOM rendu, ce que Google indexe | `/blog/rentabiliser-application-mobile` cassé |

C'est très probablement pourquoi la validation Search Console lancée le 8 août
n'a pas tout débloqué : le site paraissait réparé, mais la version rendue
retombait dans la boucle.

Cinq autres problèmes trouvés au même moment, tous vérifiés sur le site en
ligne :

- **Le blog n'avait aucun lien crawlable vers ses articles.** Les cartes de
  `/blog/` étaient des `<button onClick>`, pas des liens. Sur la page en ligne :
  19 boutons, 2 liens. **11 des 17 articles ne recevaient aucun lien entrant** :
  Google les découvrait par le sitemap, ne leur transmettait aucune autorité et
  les recrawlait rarement.
- **5 URLs servaient la page d'accueil.** `/expertise/`, `/creation-application-mobile/`,
  `/faq/`, `/projets/`, `/etapes/` rendaient les mêmes 599 mots que la home,
  seuls le titre et la description changeaient. Du contenu dupliqué pur, sur des
  URLs déjà dans le sitemap.
- **Double `<h1>` sur toutes les pages** : celui du pré-rendu caché plus celui
  de React, plus un pavé de texte en `left:-10000px` que Google déprécie.
- **Titres et descriptions écrits en double** dans `Blog.jsx` et
  `generate-routes.js`, qui avaient divergé sur 6 articles sur 17. Des titres
  raccourcis exprès pour tenir dans les résultats Google étaient re-rallongés au
  rendu, donc tronqués quand même.
- **Le `FAQPage` de la home était recopié sur les 40+ pages générées**, y compris
  les articles de blog et les mentions légales. Google demande que le contenu
  balisé soit visible sur la page : un balisage orphelin est ignoré au mieux.

### Ce qui a été fait

- Module `src/seo.js` : `lienInterne()`, `urlPublique()`, `appliquerMeta()`,
  `retirerPrerender()`. Plus aucune URL n'est écrite à la main.
- Canonique, Open Graph et **hreflang** (`fr-fr` + `x-default`, auto-référents)
  alignés sur la même URL, côté HTML servi **et** côté DOM rendu.
- Cartes du blog passées en `<a href>`. Bloc « À lire aussi » sur chaque
  article, piloté par la table `ARTICLES_LIES` : chaque article a 3 liens
  sortants et au moins 2 entrants. Plus aucun orphelin.
- `/expertise`, `/creation-application-mobile` et `/faq` sont devenues de
  vraies pages, contenu unique (`src/PagesSeo.jsx`), avec `FAQPage` propre sur
  `/faq`. La navbar de la home fait défiler vers ses sections via une ancre
  (`/#offre`), elle ne pousse plus ces URLs. **Le visuel de la landing est
  inchangé** ; seul le pied de page gagne des liens et devient le plan du site.
- Pages quizz (`src/Quiz.jsx`) : `/quiz/` plus 3 tests sur des requêtes
  d'acheteur, chacun avec 300+ mots de contenu indexable indépendants du quizz.
- Dette SEO des 6 vieux articles soldée : titres et descriptions dans les
  limites, voix en « tu ».
- Balisage `ProfessionalService` avec `areaServed` sur la page Toulouse.
- **Sitemap généré au build** (28 URLs). `public/sitemap.xml` supprimé.

### Cinq garde-fous qui font échouer le build

Le sujet ne peut plus revenir en silence. `npm run build` s'arrête si :

1. un article existe dans `BLOG_ARTICLES` mais n'a **pas de route** dans
   `blogRoutes` ;
2. un article publié a moins de 2 liens entrants ;
3. un `metaTitle` dépasse 65 caractères ou une description 155 ;
4. un article n'a pas de `finalCta` explicite (`'audit'` ou `'whatsapp'`) ;
5. **une seule page générée contient un lien interne sans barre finale.**

Le garde-fou n°4 vient d'un constat de cohérence du 20/08/2026 : l'audit
(`/audit-app`) demande « décris ton idée d'application », c'est un outil de
validation d'**idée**. Or trois articles s'adressent à quelqu'un qui a **déjà**
une application en ligne (reprise, évolution, « mon application ne rapporte
rien »). Les y envoyer revenait à leur demander de décrire une idée qu'ils ont
déjà construite. Ces trois-là pointent maintenant vers WhatsApp, sur les deux
appels à l'action.

Le garde-fou n°1 a été ajouté après un test réel du 20/08/2026 : en simulant
l'ajout d'un article, **le build passait au vert alors que l'index du blog
pointait vers une URL en 404.** L'article apparaissait dans la grille, son lien
était bien un `<a href>` crawlable, mais aucune page n'était générée. C'est le
scénario « j'ai ajouté l'article et oublié la route », le plus fréquent, et il
n'était pas couvert.

Sortie attendue d'un build sain :

```
✓ Maillage interne verifie : 17 articles, tous avec >= 2 liens entrants
✓ Meta verifiees : 17 articles dans les limites (65 / 155)
✓ FAQ articles : 17 articles avec balisage FAQPage
✓ Sitemap genere : 28 URLs
✓ Liens internes verifies : 58 pages, aucune redirection interne
```

### Ce que le test d'ajout d'article a validé

Le parcours complet a été joué de bout en bout, puis annulé :

| Étape | Résultat |
|---|---|
| Article ajouté à `BLOG_ARTICLES` seul | Build **refusé** : lien vers une 404 |
| Route ajoutée, maillage absent | Build **refusé** : 0 lien entrant |
| Maillage ajouté au détriment d'autres articles | Build **refusé** : deux articles existants passaient sous le seuil |
| Maillage correct | Build vert, sitemap passé à 29 URLs **tout seul** |

Le troisième cas est le plus utile : ajouter un article en recâblant des liens
existants peut orpheliner un article déjà publié. Le build le voit.

### À faire dans Search Console après le déploiement

1. **Demander l'indexation** des 5 nouvelles URLs : `/quiz/`, les 3 pages de
   test, et vérifier `/projets/` qui n'avait jamais été dans le sitemap.
2. **Renvoyer le sitemap** (il est passé de 22 à 28 URLs).
3. **Relancer « Valider la correction »** sur l'erreur de redirections. La
   validation d'août portait sur un site encore cassé au rendu ; celle-ci porte
   sur un site réellement réparé.
4. Sous 2 à 3 semaines, vérifier que `/expertise/`, `/creation-application-mobile/`
   et `/faq/` ne sont plus signalées comme dupliquées.

## Refonte du blog (20/08/2026)

Le SEO technique était réparé, mais les pages restaient des murs de texte. Un
lecteur qui arrive de Google ne connaît pas Noé : il scanne, il ne lit pas.
Chaque article porte maintenant six blocs, tous automatiques ou alimentés par
des champs de `src/Blog.jsx` :

- **Fil d'Ariane** `Accueil / Blog / titre` à la place du bouton « Retour ».
- **Ligne d'auteur** avec date, **Noé Calmes, expert en application mobile**, et
  temps de lecture. Le nom de l'auteur manquait totalement : c'est le signal
  E-E-A-T le plus direct pour Google.
- **En bref** sous le titre : le verdict en deux phrases, puis 4 repères
  (sujet, pour qui, à retenir, preuve).
- **Sommaire** construit depuis les `<h2>`, avec des ancres que Google peut
  proposer comme liens de saut dans ses résultats.
- **Appel à l'action au premier tiers**, pas seulement en bas de page : un
  CTA en fin d'article n'est vu que par les 10 à 20 % qui vont au bout. La
  position est calculée sur le nombre de sections : fixée à « après la 2e »,
  elle tombait à 66 % sur un article court, soit quasiment la fin.
- **Bloc auteur placé AVANT l'appel à l'action final** : on établit la
  légitimité, puis on demande. L'inverse faisait tomber la demande sur un
  lecteur qui ne savait pas encore à qui il avait affaire.
- **4 articles repassés sur l'audit** (`combien-coute`, `creer-guide`, `mvp`,
  `choisir-expert`). Ils n'avaient pas de `finalCta` et tombaient donc dans la
  branche WhatsApp, alors que ce sont les articles à plus forte intention
  d'achat. `reprendre` et `faire-evoluer` restent sur WhatsApp : leur lecteur a
  déjà une application, l'audit teste une idée.
- **Pour qui / pas pour qui** en vert et rouge. C'est le bloc de
  positionnement : il écarte explicitement le chasseur de prix bas.
- **FAQ par article** (3 questions), avec balisage FAQPage sur les 17 articles.
- **Bloc auteur** avec photo, preuves, LinkedIn et Instagram.
- **Résumer cet article avec ChatGPT, Claude, Grok ou Gemini** : de plus en
  plus de lecteurs passent par un assistant plutôt que par Google. Le bouton
  ouvre l'assistant avec une consigne pointant sur l'URL, ce qui fait citer
  l'article comme source. Présent sur toutes les pages de contenu, pas
  seulement les articles.

  > Le logo Grok n'existe ni dans `react-icons` ni dans Simple Icons. Le tracé
  > utilisé vient du favicon officiel de grok.com, dont seul le glyphe a été
  > conservé (`LogoGrok` dans `src/BlogUI.jsx`). Ne pas le redessiner à la main.
  >
  > Réserve connue : ChatGPT, Claude et Grok acceptent un texte pré-rempli dans
  > l'URL. **Gemini ne le documente pas** : le lien ouvrira Gemini, la consigne
  > ne sera peut-être pas reprise.
- **Barre de progression** et **retour en haut**.

Dans le corps du texte : titres à barre d'accent, encadrés (astuce, attention
en rouge, à retenir en vert), chiffres mis en avant, tableaux qui défilent sur
mobile. Huit encadrés ont été placés sur les six articles les plus stratégiques.

**L'index `/blog/`** a aussi été repris : article pilier mis en avant, filtre
par thème (6 thèmes), et cartes portant une **icône de thème** plus une
**accroche courte** (55 à 75 caractères) à la place de la méta description. La
description est écrite pour Google, pas pour une carte : 17 pavés de 150
caractères côte à côte donnaient une grille où rien ne ressortait et où rien
n'invitait au clic. Les 17 liens restent de vrais `<a href>` avec barre finale,
le correctif SEO central n'a pas bougé.

## Ce qui reste à faire (par priorité)

1. **[Noé] Déployer le chantier du 20/08** : `git add -A`, commit, `git push`.
   Rien n'est en ligne avant ça, et tout le reste en dépend.
2. **[Noé] Trancher le doublon Google Business** (garder la fiche sobre
   Toulouse, supprimer la fiche à mots-clés) et publier la modification en
   attente sur la fiche gardée.
3. **Surveiller la validation Search Console** (10-15 jours) après le
   déploiement. Si la validation échoue encore, c'est un signal différent : le
   rendu est réparé cette fois, il faudra chercher ailleurs.
4. **Backlinks** : profils, annuaires, fiche Google Business, post « app à 13 000 €/mois ».
   C'est devenu le principal levier restant : le technique est traité, le
   contenu tourne, l'autorité externe est ce qui manque.
5. **Contenu** : le cluster continue via la tâche hebdo (sujets 14 à 19).
6. **Technique (non urgent)** : optimiser le poids des images (webp).
7. **Page locale Toulouse** : c'est aujourd'hui un article de blog
   (`/blog/creation-application-mobile-toulouse/`) avec le balisage local. Si la
   requête décolle, envisager une vraie page service hors `/blog/`. Ne pas créer
   la seconde page tant que la première n'a pas de clics : deux pages sur la
   même requête se cannibalisent.

## Process pour publier un brouillon

Le process a changé le 20/08/2026 : **l'étape sitemap a disparu** (il est
généré), et deux nouvelles étapes sont désormais obligatoires.

1. Relire le fichier dans `drafts/`.
2. Coller l'objet dans `BLOG_ARTICLES` (`src/Blog.jsx`). C'est la **seule**
   source du `metaTitle` (≤ 65 caractères) et de la `description` (≤ 155).
3. **Ajouter le slug dans la table `ARTICLES_LIES`** (`src/Blog.jsx`) : ses 3
   liens sortants, ET le citer dans au moins 2 autres entrées pour qu'il
   reçoive des liens entrants. Sans ça, le build échoue.
4. Ajouter la route dans `scripts/generate-routes.js` (tableau `blogRoutes`) :
   seulement `path`, `heading` et `content`. **Ne pas y remettre `title` ni
   `description`**, ils sont lus depuis `Blog.jsx` et seraient ignorés.
5. `npm run build`. Vérifier les 4 lignes de contrôle (maillage, meta, sitemap,
   liens). Si l'une échoue, le message dit quoi corriger.
6. Commit, push, puis demander l'indexation de la nouvelle URL dans Search
   Console. L'URL porte **toujours** la barre finale.

> Le sitemap se met à jour tout seul : l'article y entre parce qu'il est généré,
> pas parce qu'on a pensé à éditer un fichier.
