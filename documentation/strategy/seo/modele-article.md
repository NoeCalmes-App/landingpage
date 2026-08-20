# Modèle d'article — spécification de production

> Source de vérité du FORMAT d'un article. `content-plan.md` décide **de quoi**
> on parle, ce fichier décide **comment** l'article est construit.
>
> Créé le 20/08/2026, en même temps que la refonte du blog.

## Pourquoi ce fichier existe

Avant la refonte, un article était un titre, une date, puis un mur de
paragraphes. Aucun point d'accroche, aucune preuve d'auteur, aucun moyen de
savoir en trois secondes si l'article te concerne.

Un lecteur qui arrive de Google **ne connaît pas Noé et ne lit pas : il
scanne.** S'il ne trouve aucune prise dans les cinq premières secondes, il
repart, et Google enregistre ce retour comme un signal négatif.

Chaque bloc du modèle répond à une question que le lecteur se pose sans la
formuler :

| Question du lecteur | Bloc qui y répond |
|---|---|
| « C'est long ? » | Sommaire + temps de lecture |
| « Ça parle de quoi ? » | En bref (TL;DR) |
| « C'est pour moi ? » | Pour qui / pas pour qui |
| « C'est qui, lui ? » | Bloc auteur + preuves |
| « Et concrètement ? » | Appel à l'action au milieu |
| « Il me reste une question » | FAQ de fin |

## Les champs d'un article

Objet à coller dans `BLOG_ARTICLES` (`src/Blog.jsx`). Ordre imposé, le build
lit ce fichier par expression régulière.

```js
{
  slug: 'mot-cle-principal-en-tirets',
  title: "Le titre affiché en H1, formulé comme la requête",
  metaTitle: "Titre Google, 65 caractères MAXIMUM | Noé Calmes",
  description: "Description Google, 155 caractères MAXIMUM, en « tu ».",
  date: '2026-08-20',
  readTime: '6 min',
  finalCta: 'audit',   // ou omis, voir la règle ci-dessous
  categorie: 'Monétisation',
  accroche: "L'accroche de la carte, 55 à 75 caractères. Pas la description.",
  tldr: {
    verdict: "La réponse à la question du titre, en 2 phrases. Pas de teasing.",
    points: [
      { label: 'Le sujet', valeur: "Ce que couvre l'article" },
      { label: 'Pour qui', valeur: "La situation du lecteur concerné" },
      { label: 'À retenir', valeur: "L'idée qui change sa décision" },
      { label: 'Preuve', valeur: "Un chiffre réel, quand c'est pertinent" },
    ],
  },
  pourQui: ["3 phrases", "au présent", "situation concrète"],
  pasPourQui: ["3 phrases", "dont au moins une écarte", "le chasseur de prix bas"],
  faq: [
    { q: "Question annexe que l'article ne traite pas de front", a: "Réponse de 2 à 4 phrases, autonome." },
  ],
  content: `...`,
}
```

### Règles par champ

- **`categorie`** : une des six existantes, jamais une nouvelle sans raison.
  `Monétisation`, `Budget`, `Créer`, `Ton activité`, `Reprendre`, `Toulouse`.
  Elle alimente le filtre de `/blog/`, le badge de l'article **et l'icône de la
  carte** (table `ICONES_THEME` dans `src/BlogUI.jsx`). Une septième catégorie à
  un seul article crée un onglet vide de sens et une icône par défaut.
- **`accroche`** : **55 à 75 caractères.** C'est le texte de la carte sur
  `/blog/`, et il n'a rien à voir avec `description`. La description est écrite
  pour Google : longue, riche en mots-clés. L'accroche est écrite pour un humain
  qui décide de cliquer. Mettre la description sur la carte produit un pavé que
  personne ne lit, et 17 pavés côte à côte donnent une grille où rien ne
  ressort. Écris-la comme une promesse concrète, pas comme un résumé :
  « Six causes, aucune technique. Et cinq se corrigent. »
- **`tldr.verdict`** : donne la réponse tout de suite. Contre-intuitif mais
  vérifié : donner la réponse augmente la lecture, parce que le lecteur sait ce
  qu'il gagne à continuer. Le teasing fait partir.
- **`tldr.points`** : 4 lignes, jamais plus. Le label tient en 2 mots.
- **`pasPourQui`** : c'est le bloc de positionnement, pas un avertissement
  poli. **Au moins une ligne doit écarter le chasseur de prix bas** (« tu
  cherches juste un développeur pas cher », « ton seul critère est le prix »).
  Écarter les mauvais prospects noir sur blanc rend l'offre crédible auprès des
  bons.
- **`finalCta`** : **obligatoire et explicite**, `'audit'` ou `'whatsapp'`. Il
  pilote les **deux** appels à l'action de l'article, celui du milieu et celui
  de fin. Le build échoue si le champ manque.

  **La règle tient en une question : le lecteur a-t-il déjà une application ?**

  | Réponse | Valeur | Pourquoi |
  |---|---|---|
  | Non, il a une idée | `'audit'` | L'audit demande « décris ton idée d'application », puis marché, cible et budget. C'est un outil de validation d'idée, et il qualifie le lead avant la conversation. |
  | Oui, elle est en ligne | `'whatsapp'` | Lui demander de décrire son idée n'a aucun sens : il l'a déjà construite. La conversation part de ce qui existe. |

  Répartition actuelle : **14 en `'audit'`**, **3 en `'whatsapp'`**
  (`reprendre-application-mobile-existante`, `faire-evoluer-application-mobile`,
  `pourquoi-applications-ne-rapportent-rien`).

  > Le champ était facultatif jusqu'au 20/08/2026, et son absence tombait
  > silencieusement sur WhatsApp. Six articles à forte intention d'achat y sont
  > restés des mois, dont `combien-coute-application-mobile`. C'est pour ça
  > qu'il est devenu obligatoire.
- **`faq`** : 3 questions. Elles capturent de la longue traîne et rendent la
  page éligible aux résultats enrichis. Elles doivent porter sur autre chose
  que le corps de l'article, sinon c'est du remplissage. Le balisage FAQPage est
  généré automatiquement depuis ce champ.

## Le HTML du champ `content`

Balises autorisées : `<p>`, `<h2>`, `<h3>`, `<strong>`, `<ul>`, `<li>`,
`<ol>`, `<a>`, `<blockquote>`, `<table>`.

### Blocs visuels disponibles

Ils sont stylés dans `src/index.css` et cassent le mur de texte. **Deux à
quatre par article, pas plus** : au-delà, l'œil ne les distingue plus et tout
redevient du texte.

```html
<!-- Conseil, raccourci, règle pratique -->
<div class="encadre astuce">
  <span class="encadre-titre">La règle en une phrase</span>
  <p>Le conseil.</p>
</div>

<!-- Piège qui coûte de l'argent. Rouge. À utiliser avec parcimonie. -->
<div class="encadre attention">
  <span class="encadre-titre">Le piège le plus cher</span>
  <p>Ce que le lecteur risque, et pourquoi.</p>
</div>

<!-- Ce qu'il faut retenir d'une section longue. Vert. -->
<div class="encadre cle">
  <span class="encadre-titre">Ce qu'il faut retenir</span>
  <p>La synthèse.</p>
</div>

<!-- Preuve chiffrée isolée du texte -->
<div class="chiffre">
  <span class="chiffre-valeur">13 000 €</span>
  <span class="chiffre-texte">ce que ce chiffre veut dire, en une phrase.</span>
</div>

<!-- Tableau comparatif : toujours dans un conteneur qui défile sur mobile -->
<div class="table-scroll">
  <table><thead>…</thead><tbody>…</tbody></table>
</div>
```

Trois intentions, trois couleurs, jamais une quatrième.

### Ce qui est automatique, à ne pas écrire à la main

- **Le sommaire** : construit depuis les `<h2>` du contenu. Les ancres
  (`id="section-N"`) sont posées au rendu. Ne pas écrire d'`id` soi-même.
- **L'appel à l'action du milieu** : inséré au **premier tiers** de l'article,
  calculé sur le nombre de sections (jamais avant la 1re, jamais dans la
  dernière). Ne pas en ajouter un dans le texte.
- **Le bloc auteur, le résumé par IA, « À lire aussi », la FAQ, le CTA final** :
  tous rendus par le modèle.
- **Le balisage Article et FAQPage** : généré au build.
- **L'icône de la carte** : déduite de `categorie`. Ne pas en choisir une par
  article, c'est ce qui garde la grille cohérente au lieu d'en faire une
  planche d'autocollants.
- **Le bloc « Résumer cet article avec »** (ChatGPT, Claude, Grok, Gemini) :
  présent sur toutes les pages de contenu.

## L'ordre des blocs sur la page

Il est géré par le modèle, tu n'as rien à placer. Il est documenté ici parce
qu'il n'est pas arbitraire :

1. Fil d'Ariane, catégorie, titre, ligne d'auteur
2. **En bref** : la réponse tout de suite
3. **Sommaire** (à partir de 4 sections)
4. Contenu, premier tiers
5. **Appel à l'action** : le lecteur a reçu de la valeur, il n'est pas fatigué
6. Contenu, suite
7. **Pour qui / pas pour qui** : qualification, juste avant la demande
8. **FAQ** : les dernières objections
9. **Bloc auteur** : la légitimité
10. **Appel à l'action final** : on demande APRÈS avoir prouvé
11. **Résumer avec une IA**, puis **À lire aussi** en dernier, pour garder le
    lecteur sur le site

Le point 9 avant le point 10 est délibéré : l'appel à l'action tombait avant sur
un lecteur qui ne savait pas encore à qui il avait affaire.

## Structure recommandée du corps

1. **Accroche (2 à 3 paragraphes)** : le problème du lecteur, formulé dans ses
   mots. Une phrase de légitimité (« j'ai publié plus de 20 applications »).
2. **5 à 8 sections `<h2>`**, chacune répondant à une sous-question réelle.
3. **Un `<h2>` de périmètre honnête** quand le sujet touche à l'acquisition :
   Noé fait le marketing DANS l'application, pas la publicité qui amène les
   utilisateurs. Ne jamais promettre du trafic.
4. **Un `<h2>` final « Par où commencer »** : 3 actions concrètes.

Longueur : 900 à 1 300 mots dans `content`. Les blocs du modèle ajoutent
environ 300 mots.

## Règles de rédaction

Elles complètent celles de `content-plan.md`, qui restent la référence.

- **« Tu » partout.** Jamais « vous ».
- **Zéro emoji dans le corps. Zéro tiret cadratin (—).** Virgules, deux-points,
  points.
- Mots en entier : « application », « développeur ».
- Paragraphes de 40 mots en moyenne, 80 au maximum. Jamais deux gros blocs qui
  se suivent.
- Dès qu'une phrase énumère trois éléments ou plus, la passer en `<ul>` avec
  une amorce finissant par deux points.
- **Liens internes avec la barre finale** : `/blog/slug/`, `/audit-app/`.
  Sans elle, le build échoue.
- 2 à 4 liens internes dans le corps, dont un vers la page pilier
  `/blog/rentabiliser-application-mobile/`.

## Avant de publier

1. Le slug est ajouté à `ARTICLES_LIES` avec 3 liens sortants, **et cité dans
   au moins 2 autres entrées**.
2. La route est ajoutée à `blogRoutes` (`scripts/generate-routes.js`), avec
   seulement `path`, `heading` et `content`.
3. `npm run build` affiche les cinq contrôles au vert. Si tu oublies l'étape 2,
   le build refuse de passer et te dit exactement quoi corriger.
4. Commit, push, puis indexation dans Search Console.
