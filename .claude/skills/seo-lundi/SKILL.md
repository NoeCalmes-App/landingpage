---
name: seo-lundi
description: Le SEO du lundi pour Noé. Relève Search Console (28 jours) dans son Chrome, compare aux pages du site, choisit UNE action de la semaine (page d'offre, enrichissement ou article sur une requête d'acheteur), la publie de bout en bout, met la file et le tableau de bord à jour et termine par la ligne d'indexation. À utiliser quand Noé demande « seo de la semaine », « le seo du lundi », « on fait la page de la semaine », « analyse search console » ou « qu'est-ce qu'on publie cette semaine ».
---

# Le SEO du lundi

Livrable : une page ou un article en ligne et vérifié, le relevé Search Console
dans `documentation/strategy/seo/README.md`, la file `idees-articles.md` à jour,
et la ligne d'indexation à donner à Noé. Compte deux heures, pas plus : la
stratégie arrêtée le 16/11/2026 (section « Stratégie arrêtée » du README) dit
que les clients rapides viennent d'ailleurs, le SEO construit l'actif.

## Avant tout

Lire dans cet ordre, sans en sauter :

1. `documentation/strategy/seo/README.md`, section « Stratégie arrêtée le 16/11/2026 » : ce qu'on vise (requêtes d'acheteur, pages d'offre, liens entrants), ce qu'on ne fait pas (gros mots-clés d'agences, pages par ville).
2. `documentation/strategy/seo/idees-articles.md` : la file, les chantiers ouverts, les briefs abandonnés et pourquoi.
3. `documentation/strategy/seo/publier-un-article.md` : le runbook, phases 0 à 8. Il s'applique aussi à une page d'offre (phase 0 anti-doublon, garde-fous du build, vérification en ligne, ligne d'indexation).
4. `documentation/context/vocabulaire-mobile-web.md` : avant d'écrire une ligne.
5. `documentation/context/positionnement.md` : la cible, les fourchettes de prix du moment (section « Ma promesse client »), les trois cas d'usage.

## Étape 1 : le relevé Search Console (15 minutes)

Dans le Chrome de Noé (outils `claude-in-chrome`), ouvrir :

```
https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Anoecalmes.fr&num_of_days=28&breakdown=query&metrics=CLICKS%2CIMPRESSIONS%2CPOSITION
```

Mettre 250 lignes par page, puis lire le tableau par JavaScript (les lignes
`table tr`, colonnes requête, clics, impressions, position). Refaire la même
chose avec `breakdown=page`. Noter dans le README, sous la stratégie, une ligne
datée : clics, impressions, position moyenne, et les trois mouvements notables.

Ce qu'on cherche, dans l'ordre :

- **Une requête d'acheteur sans page** : « sur mesure », « devis », « prix »,
  « expert », « faire développer », « application web », « logiciel pour mon
  entreprise », « refonte », « reprendre ». Même dix impressions. C'est l'action
  de la semaine si elle existe.
- **Une page en première page sans clic** (position 5 à 12, CTR nul) : titre
  avec un chiffre, réponse exacte en première phrase.
- **Une page qui monte** après une refonte : la pousser (liens depuis la page
  Claude, l'accueil, les pages d'offre).
- **Une requête web** : le site est presque entièrement « mobile », la moitié
  de l'offre est web ; toute requête web est prioritaire.

On ignore : les gros mots-clés génériques en position 30 et plus (« création
application mobile »), les requêtes de pairs (paywall, churn, MRR), les villes.

## Étape 2 : choisir UNE action

| Constat | Action |
|---|---|
| Requête d'acheteur sans page | Page d'offre dans `src/PagesSeo.jsx` (modèle : `PageSurMesure`) : prix, délai, méthode, bouton |
| Angle informationnel non couvert, tapé par un acheteur | Article, runbook complet |
| Un H2 couvre l'angle, mal | Enrichir l'article (`dateMaj`), pas un second article |
| Page en première page sans clic | Titre et première phrase |

Pas deux actions. Si la page d'offre de la semaine est faite en une heure, la
deuxième heure va à un lien entrant (relance JDN, crédit sur un site client,
annuaire de qualité), jamais à un second article.

## Étape 3 : publier de bout en bout

Pour une page d'offre, les six endroits à câbler (voir le commit de
`/application-mobile-sur-mesure` du 16/11/2026 comme modèle) :

1. `src/PagesSeo.jsx` : le composant, `appliquerMeta` (title 65, description 155), `LIENS_MAILLAGE`.
2. `src/App.jsx` : import `lazy`, résolution du chemin, `allerVers`, rendu, liste `pagesDeVente`.
3. `src/Footer.jsx` : le lien.
4. `scripts/generate-routes.js` : `corpsSeoPages`, `sectionRoutes`, `siteNav`, `navHome` + `libelles`, llms.txt.
5. `npm run build` puis `npm test` : six garde-fous au vert, sinon corriger avant de commiter (le build qui échoue ne bloque pas `git push`, donc vérifier la sortie).
6. Push, attendre `gh run watch`, vérifier en ligne (`curl` du `<title>`).

Pour un article : phases 0 à 8 du runbook, sans exception.

## Étape 4 : consigner et terminer

- `idees-articles.md` : le chantier passe en ✅ avec la date, ce qui a été appris, et « à mesurer le » (un mois).
- `README.md` : une ligne dans la section de la semaine.
- Mémoire (`.claude/projects/.../memory/`) seulement si Noé a donné une règle ou un chiffre nouveau.
- Terminer par la ligne d'indexation, toujours :

```
Il te reste à indexer la page : https://noecalmes.fr/CHEMIN/

Search Console → « Inspecter une URL » → coller l'URL → « Demander une indexation ».
Barre finale comprise, sans renvoyer le sitemap, jamais une URL déjà indexée.
```

## Règles absolues

- Tout en français, tutoiement, pas de tiret cadratin.
- Jamais « site » pour une application web, jamais « SaaS » seul, jamais « le web coûte moins cher » (le périmètre fait le prix ; les moyennes du positionnement se présentent comme des moyennes).
- Aucun chiffre qui n'est pas déjà sur le site ou dans `positionnement.md`.
- Jamais le nom de l'application confidentielle (voir la mémoire du 09/11).
- Ne pas renommer un slug indexé. Ne pas créer de page par ville.
- Pas d'article « pour le volume » : chaque page vise quelqu'un qui peut acheter une application.
