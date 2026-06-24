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

## Ce qui reste à faire (par priorité)

1. **Indexation** : déployer, puis dans Search Console supprimer le sitemap www, et demander l'indexation des pages clés (dont `/blog/creation-application-mobile-toulouse`). Détail dans `roadmap.md`.
2. **Google Business** : créer et vérifier la fiche (`google-business.md`).
3. **Contenu** : page pilier « rentabiliser une application » (à écrire) + le cluster via la tâche hebdo.
4. **Backlinks** : profils, annuaires, fiche Google Business, post « app à 13 000 €/mois ».
5. **Technique (non urgent)** : optimiser le poids des images (webp).

## Process pour publier un brouillon

Relire le fichier dans `drafts/` → coller l'objet dans `BLOG_ARTICLES` (`src/Blog.jsx`) → ajouter la route dans `scripts/generate-routes.js` → ajouter l'URL dans `public/sitemap.xml` → `npm run build` → commit + push → demander l'indexation de la nouvelle URL dans Search Console.
