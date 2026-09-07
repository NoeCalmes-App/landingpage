# Journal SEO

> Trace de ce qui a été fait, quand, et surtout **pourquoi**. Le « pourquoi »
> est le seul contenu qui ne se retrouve pas en lisant le code ou `git log`.
>
> Ordre antéchronologique : le plus récent en haut.
> Une ligne par chantier, avec son commit. Ne pas y mettre de projets à venir,
> ils vivent dans `roadmap.md` et `idees-articles.md`.

---

## 07/09/2026 · Article Claude, et une leçon de méthode

**Commits** : `3ea325a` puis `97fd66f`

Article « Créer une application mobile avec Claude ». Demande initiale : titrer
« oui c'est bien » puis dire le contraire dans le corps.

**Arbitrage rendu** : refusé sous cette forme. Un titre qui promet une réponse
et livre l'inverse produit un retour aux résultats de recherche, que Google
mesure. La version retenue tient le « oui » honnêtement, puis déplace le sujet
sur ce qui vient après le code.

**Angle trouvé** : les trois articles IA du blog attaquent l'IA sur ce qu'elle
*produit*. Aucun de ces arguments ne tient contre Claude, qui écrit du vrai code
natif. L'article dit donc oui sans réserve, puis traite un territoire jamais
couvert : la chaîne d'identité, de contrat et d'encaissement entre un projet qui
compile et une application publiable.

Le fait qui sert de charnière : Claude pilote un **simulateur**, jamais un vrai
iPhone. Un simulateur ne demande ni signature ni compte vérifié. La frontière
est exactement là.

**Ce qui a été écarté après vérification en source primaire** :

- « Apple annonce le support du Claude Agent SDK » : le mot SDK est absent de la
  page d'Apple. C'est une reformulation de la presse.
- Deux échéances de SDK que le premier plan citait étaient **déjà passées**.
  L'article aurait été faux le jour de sa publication.
- Plusieurs dates issues de sites tiers et non d'Anthropic.

**Leçon de méthode, à appliquer aux prochains articles.** Deux passes de
recherche ont précédé la rédaction, c'était trop, et Noé l'a signalé deux fois.
Le bon ordre est : **écrire d'abord avec les faits stables, vérifier ensuite pour
enrichir.** Un article sans date ni statistique périssable est publiable
immédiatement et ne se périme pas ; la vérification sert alors à ajouter du
poids, pas à débloquer la rédaction.

---

## 31/08/2026 · Article Lovable / Base44

**Commit** : `f53010a`

Première comparaison nommant des outils concurrents. Demande initiale : titrer
« Noé Calmes vs Base44 » et dire que ces outils sont nuls.

**Arbitrage rendu** : refusé sur les deux points.

- Personne ne cherche le nom de Noé. On se positionne sur le nom de l'outil.
- « C'est nul » classe moins bien (Google récompense la profondeur argumentée),
  est juridiquement inconfortable quand on nomme des entreprises, et contredit
  `positionnement.md`, qui interdit explicitement de dénigrer l'IA.

**Angle retenu, factuel et plus dur à contredire** : ces outils produisent une
application *web*. La règle 4.2 d'Apple rejette explicitement les sites
réempaquetés. Donc pas d'App Store, donc pas d'abonnement encaissé par les
stores. L'article reconnaît aussi honnêtement ce que ces outils font bien, ce
qui rend le reste crédible.

---

## 20/08/2026 · Le gros chantier : canonique, maillage, refonte du blog

**Commits** : `810fc04`, `3e041c6`, `219104d`

Le correctif du 08/08 n'avait été appliqué **qu'au HTML servi**. Google exécutant
le JavaScript, React réécrivait la canonique sans barre finale à l'hydratation,
et la boucle repartait. Search Console l'a confirmé : validation lancée le 08/08,
**échec le 11/08**, 14 URLs concernées, toutes sans barre finale.

Cinq autres problèmes trouvés au même moment :

- L'index du blog n'avait **aucun lien crawlable** vers ses articles (cartes en
  `<button>`). 11 articles sur 17 ne recevaient aucun lien entrant.
- 5 URLs servaient la page d'accueil (`/expertise/`, `/faq/`…), contenu dupliqué.
- Double `<h1>` sur toutes les pages, plus un pavé de texte caché.
- Titres et descriptions écrits en double, divergents sur 6 articles sur 17.
- Le `FAQPage` de la home recopié sur les 40+ pages générées.

**Livré** : module `src/seo.js`, hreflang, vraies pages autonomes, pages quizz,
refonte complète de l'article (En bref, sommaire, appel à l'action au premier
tiers, pour qui, FAQ, bloc auteur, résumé par IA), sitemap généré au build, et
les 7 derniers articles passés au tutoiement.

**Ce qui protège durablement** : cinq garde-fous font échouer `npm run build`.
Article sans route, moins de 2 liens entrants, `finalCta` absent, meta hors
limites, lien interne sans barre finale. Détail dans `README.md`.

---

## Comment tenir ce journal

Une entrée par chantier qui change la stratégie ou corrige un problème de fond.
Pas d'entrée pour une publication d'article de routine, sauf si elle a produit
un arbitrage réutilisable.

Chaque entrée répond à trois questions : **ce qui a été fait**, **pourquoi ce
choix plutôt qu'un autre**, et **ce qu'on en retient pour la prochaine fois**.
La troisième est la plus utile et c'est celle qu'on oublie.
