# Feuille de route SEO — viser le top sur SA niche

> Le plan complet pour ranker. Source de vérité stratégie. Le détail des articles est dans `content-plan.md`.

## L'objectif réaliste (lis ça d'abord)

On ne vise PAS « développeur mobile » ni « créer une application mobile » : ce sont des têtes de gondole d'agences avec une autorité énorme, ingagnables pour un site jeune. On vise **être n°1 sur deux terrains qu'on peut réellement gagner** :

1. **La niche monétisation** : « rentabiliser une application », « combien rapporte une app », « modèle économique application », etc. Personne ne les travaille avec ta preuve (une app à 13 000 €/mois).
2. **Le local** : « application mobile Toulouse » et environs. Tu as déjà 97 impressions dessus sans rien faire. Le local est 10x plus facile que le national.

**Délai honnête : 6 à 12 mois.** Le SEO est cumulatif, pas un interrupteur. Note actuelle : ~3/10 en ligne, ~5/10 une fois mes changements déployés. Le top (8-9/10) se construit avec les 4 priorités ci-dessous.

---

## Priorité 1 — Indexation (débloque tout le reste)

Tant que Google n'indexe pas tes pages, rien ne peut ranker. Tu as 8 pages indexées sur ~15.

- [ ] **[Toi] Déployer mes changements** : `git add -A` + commit + `git push`. Le GitHub Action build et met en ligne tout seul.
- [ ] **[Toi] Search Console : supprimer le sitemap `www.noecalmes.fr/sitemap.xml`** (doublon). Garder uniquement `noecalmes.fr/sitemap.xml`.
- [ ] **[Toi] Search Console : forcer l'indexation des pages qui comptent.** Outil « Inspection de l'URL », coller chaque URL, cliquer « Demander l'indexation » : accueil, /expertise, /audit-app, /creation-application-mobile, et les 7 articles de blog.
- [ ] **[Toi] Vérifier les « Pages non indexées »** : si une VRAIE page (section ou article) est dans « redirection » ou « 404 », me le dire. Si ce sont de vieilles URLs (/a-propos, /offre, /contact…), c'est normal, on ignore.
- [x] **[Moi] Sitemap complet + balises canoniques propres** (déjà en place).

---

## Priorité 2 — Google Business Profile (le meilleur ROI local)

Fiche gratuite qui te fait apparaître sur Google Maps + sur « application mobile Toulouse », et qui te donne un backlink fort.

- [ ] **[Toi] Créer la fiche** sur google.com/business (je te donne le pas-à-pas quand tu attaques).
- [ ] Catégorie : « Développeur de logiciels » / « Service informatique ». Zone : Toulouse + Occitanie.
- [ ] Mettre le lien vers `noecalmes.fr`, des photos, la description positionnement (revenus).

---

## Priorité 3 — Contenu d'angle (le moteur de trafic)

- [ ] **[Moi] Page pilier** « Comment rentabiliser une application mobile » (chapeaute tout le cluster).
- [ ] **[Moi] Page locale** « Création d'application mobile à Toulouse » (capte le filon local).
- [x] **[Auto] Tâche hebdo** : 1 article du cluster par semaine, à relire (voir `content-plan.md`).
- [ ] **[Toi] Relire + intégrer + push** chaque brouillon.

---

## Priorité 4 — Autorité / backlinks

Des liens d'autres sites = des votes de confiance pour Google.

- [ ] **[Toi] Liens depuis ton LinkedIn et ton Instagram** vers `noecalmes.fr`.
- [ ] **[Toi] Annuaires FR** (je te ferai une liste : Google Business, annuaires de freelances, etc.).
- [ ] **[Toi] Ton histoire « app à 13 000 €/mois »** en post LinkedIn long / article : très partageable, attire des liens naturels.

---

## Audit technique (24/06/2026) — résultat

Rien de cassé. Librairies lourdes en lazy-load (OK), images avec alt (OK), données structurées valides (OK), liens internes corrigés (OK), robots/canoniques OK. `/avis` et `/rendez-vous` passés en noindex (contenu dupliqué / page vide). Reste un seul point technique :

- [ ] **[Moi, quand tu veux] Optimiser les images** : convertir en webp + compresser les PNG de 0,7 à 1,4 Mo (snapmaster, lavender-sphere, off, icônes). Améliore la vitesse (Core Web Vitals). Non urgent.

Le gros sujet de fond restant : transformer les sections (ancres sur une seule page) en **vraies pages séparées** avec contenu unique. Gros chantier de contenu, à planifier plus tard.

## Mesure (toutes les 2-4 semaines)

Search Console : suivre les impressions, la position moyenne et les clics sur « application mobile toulouse » et sur les requêtes monétisation. On ajuste les titres des pages qui ont des impressions mais peu de clics.
