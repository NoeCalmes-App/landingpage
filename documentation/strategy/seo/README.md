# Dossier SEO — Noé Calmes (manager)

> Tout le SEO au même endroit. Ce fichier est le tableau de bord : ce qui est fait, ce qui tourne en automatique, ce qui reste à faire. Les détails sont dans les fichiers du dossier.

MàJ : 24/06/2026

## Les fichiers du dossier

- `roadmap.md` : la stratégie complète et l'ordre de priorité (le plan d'ensemble).
- `content-plan.md` : la file des 12 sujets d'articles + les règles de rédaction.
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

## Ce qui reste à faire (par priorité)

1. **[Noé] Trancher le doublon Google Business** (garder la fiche sobre
   Toulouse, supprimer la fiche à mots-clés) et publier la modification en
   attente sur la fiche gardée.
2. **Surveiller la validation Search Console** (10-15 jours) : les 17 pages
   doivent passer en « indexées ». Si la validation échoue, me le dire.
3. **Contenu** : page pilier « rentabiliser une application » (à écrire) + le cluster via la tâche hebdo.
4. **Backlinks** : profils, annuaires, fiche Google Business, post « app à 13 000 €/mois ».
5. **Technique (non urgent)** : optimiser le poids des images (webp).

## Process pour publier un brouillon

Relire le fichier dans `drafts/` → coller l'objet dans `BLOG_ARTICLES` (`src/Blog.jsx`) → ajouter la route dans `scripts/generate-routes.js` → ajouter l'URL dans `public/sitemap.xml` → `npm run build` → commit + push → demander l'indexation de la nouvelle URL dans Search Console.
