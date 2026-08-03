# Plan de contenu SEO — cluster « application qui rapporte »

> Source de vérité de la stratégie de contenu SEO. La tâche programmée hebdo lit ce fichier, prend le prochain sujet `pending`, rédige un brouillon, et passe le sujet en `done`. Noé relit et publie lui-même.

## La stratégie en une phrase

On ne se bat PAS sur les têtes de gondole d'agence (« créer une application mobile », « développeur mobile »). On **possède l'angle monétisation** : personne n'écrit sur « comment une application génère des revenus » depuis quelqu'un qui a une app à 13 000 €/mois. Faible concurrence + bonne intention (entrepreneurs avec budget) + ça renforce le positionnement.

## Architecture (pillar + cluster)

- **Page pilier** (à créer en priorité) : « Comment rentabiliser une application mobile » — page longue qui chapeaute le sujet et lie vers tous les articles satellites.
- **Articles satellites** : un par mot-clé long-tail ci-dessous, chacun reliant vers la page pilier et vers 1-2 autres articles (maillage interne).

## Règles de rédaction (NON négociables)

- **« Tu » partout.** Jamais « vous ».
- **Zéro emoji. Zéro tiret cadratin (—).** Utiliser virgules, deux-points, points.
- **Mots en entier** : « application » (pas « app » sauf citation), « développeur » (pas « dev »).
- **Preuve réelle, jamais en frime** : intégrer naturellement « une application que j'ai conçue génère 13 000 €/mois », « +20 applications publiées », Hush (1ʳᵉ version, 300 000 utilisateurs) quand pertinent. Mener par l'expertise, le chiffre suit.
- **Périmètre honnête** : Noé fait le marketing DANS l'app (conversion des utilisateurs en clients), PAS la publicité qui ramène les utilisateurs. Ne jamais promettre de l'acquisition/trafic.
- **Contenu vraiment utile** (E-E-A-T) : conseils concrets, exemples, pas de remplissage. Google pénalise le contenu généré en masse sans valeur.
- **Format** : HTML simple (`<p>`, `<h2>`, `<strong>`), comme les articles existants dans `src/Blog.jsx` (constante `BLOG_ARTICLES`). 700 à 1100 mots.
- **CTA de fin** : `finalCta: 'audit'` (vers l'audit gratuit), comme les articles existants.
- **Maillage interne** : lier vers la page pilier + 1-2 articles du cluster.

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
| 6 | done | non | Pourquoi 90 % des applications ne rapportent rien (et comment éviter ça) | L'angle fort de Noé : la différence c'est l'expertise |
| 7 | pending | non | Freemium ou abonnement : quel modèle pour ton application | Comparatif décisionnel |
| 8 | pending | non | Comment fixer le prix d'un abonnement dans une application | Pricing, tactique concrète |
| 9 | pending | non | Onboarding d'application : convertir tes utilisateurs en clients | Le marketing DANS l'app, coeur du métier de Noé |
| 10 | pending | non | Comment une application transforme une audience en revenus récurrents | Pour ceux qui ont déjà une communauté |
| 11 | pending | non | Application mobile pour entrepreneurs et coachs : transformer ton expertise en revenus | Cible ICP directe |
| 12 | pending | non | Les erreurs qui empêchent une application de générer des revenus | Liste d'erreurs + comment les corriger |

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

À reprendre quand la file de sujets sera vidée : raccourcir les metaTitle et descriptions, passer en « tu », recentrer sur l'angle revenus.

## Comment intégrer un brouillon (côté Noé)

1. Ouvrir le brouillon dans `documentation/strategy/seo/drafts/`.
2. Relire, ajuster la voix si besoin.
3. Copier l'objet article dans la constante `BLOG_ARTICLES` de `src/Blog.jsx` (slug, title, metaTitle, description, date, readTime, finalCta, content).
4. Ajouter la route correspondante dans `scripts/generate-routes.js` (tableau `blogRoutes`) pour la meta + le pré-rendu SEO.
5. Ajouter l'URL dans `public/sitemap.xml`.
6. `npm run build`, vérifier, commit, push, déployer.

> Quand les 12 sont `done`, prévenir Noé pour planifier la vague suivante (ou approfondir/mettre à jour les articles existants).
