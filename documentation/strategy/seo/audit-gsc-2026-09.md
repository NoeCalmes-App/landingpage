# Audit Search Console — 90 jours (19/06 → 18/09/2026)

> Données relevées le 21/09/2026 dans Search Console, propriété
> `sc-domain:noecalmes.fr`. Période de 90 jours complète.
>
> Chaque chiffre de ce fichier vient de l'interface, aucun n'est estimé.

## Vue d'ensemble

| Métrique | Valeur |
|---|---|
| Clics | **20** |
| Impressions | **1 030** |
| CTR moyen | 1,9 % |
| Position moyenne | **47,3** |
| Pages dans l'index | 30 |
| Pages non indexées | 36, réparties en 7 motifs |

**Ce que ces quatre nombres disent.** Le site est vu (1 030 impressions) mais
presque jamais cliqué (20 clics), parce qu'il est presque toujours affiché trop
bas (position 47 en moyenne, soit la page 5). Le problème n'est donc pas le
taux de clic, c'est le classement. Optimiser des titres ne servirait à rien
tant que les pages sont en page 5.

**Concentration extrême.** L'accueil fait **18 des 20 clics**, soit 90 %. Les 22
articles du blog réunis en font 2.

---

## Le fait le plus important de tout l'audit

Une seule page concentre **580 impressions sur 1 030**, soit **56 % de toute la
visibilité du site**, et elle fait **zéro clic**.

| Page | Clics | Impressions | Position |
|---|---|---|---|
| `/blog/combien-coute-application-mobile/` | **0** | **580** | **69,9** |

Ces 580 impressions viennent d'une grappe de requêtes qui demandent toutes la
même chose, le prix :

| Requête | Impressions | Position |
|---|---|---|
| prix application mobile | 173 | 69,8 |
| combien coute une application mobile | 131 | 68,5 |
| cout d'une application mobile | 104 | 74,1 |
| prix d'une application mobile | 67 | 69,2 |
| prix d une application mobile | 66 | 69,2 |
| combien coûte une application mobile | 7 | 67,1 |
| cout application mobile | 7 | 71,6 |
| prix application | 5 | 66,6 |
| cout d une application mobile | 5 | 74,0 |
| prix app mobile | 4 | 66,8 |
| tarif application mobile | 3 | 62,7 |
| prix d une application | 3 | 70,0 |
| créer une application mobile prix | 2 | 53,5 |
| combien coute une application | 2 | 69,5 |
| prix pour creer une application mobile | 1 | 57,0 |
| coût application mobile | 1 | 68,0 |

**Lecture.** Google sait que cette page parle du prix des applications, il la
propose massivement, et il la classe en position 69, c'est-à-dire page 7. À
cette position, le nombre de clics est structurellement nul, quel que soit le
titre.

C'est la seule requête du site avec un volume réel. Tout le reste du blog
cumule moins d'impressions que cette page seule.

---

## Les requêtes entre les positions 4 et 20

C'est ce qui était demandé : les requêtes où le site est proche de la page 1 et
peut y entrer avec un effort raisonnable.

| Requête | Impr. | Position | Page concernée |
|---|---|---|---|
| **application mobile toulouse** | 20 | **8,6** | `/blog/creation-application-mobile-toulouse/` |
| **mvp application mobile** | 12 | **10,8** | `/blog/mvp-application-mobile/` |
| **combien rapporte une application mobile gratuite** | 7 | **13,1** | `/blog/combien-rapporte-application-mobile/` |
| **mvp application** | 14 | **18,4** | `/blog/mvp-application-mobile/` |
| **expert application mobile** | 3 | **8,3** | `/expertise/` |
| mvp format app | 2 | 11,0 | `/blog/mvp-application-mobile/` |
| app mvp | 1 | 11,0 | `/blog/mvp-application-mobile/` |

**Le constat honnête.** Ces requêtes sont bien placées mais pèsent peu : 59
impressions à elles toutes, soit un vingtième de la grappe « prix ». Les gagner
entièrement rapporterait quelques clics par mois.

Elles restent intéressantes pour une raison différente : ce sont les seules où
le site est déjà crédible aux yeux de Google. Les pousser en page 1 est rapide,
et une page 1 acquise renforce le domaine entier.

**Quatre requêtes sur sept pointent vers le même article, le MVP.** C'est le
second actif du site après la page prix.

---

## Les pages qui perdent du trafic

**Il n'y en a pas, et la question ne peut pas être tranchée à ce volume.**

Avec 20 clics sur 90 jours, une variation d'un clic représente 5 % du total.
Aucune analyse de tendance n'est statistiquement lisible à cette échelle, et
prétendre le contraire serait inventer.

Ce que la courbe montre en revanche : les impressions **montent**, avec un pic
marqué autour du 18 au 28 août, qui correspond à la refonte SEO. Le site gagne
en visibilité, il n'en perd pas.

---

## L'état de l'indexation, motif par motif

| Motif | Pages | Lecture |
|---|---|---|
| Page avec redirection | 14 | Normal, ce sont les URLs sans barre finale |
| Exclue par `noindex` | 4 | Voulu, pages légales |
| Introuvable (404) | 1 | À vérifier |
| Autre page avec balise canonique correcte | 1 | Normal, `/projet/` |
| **Explorée, actuellement non indexée** | **3** | **Google a vu et a écarté** |
| **Détectée, actuellement non indexée** | **2** | **Google sait, n'a jamais exploré** |
| **Erreur liée à des redirections** | **11** | **Validation lancée le 20/08, toujours ouverte** |

### Explorée, actuellement non indexée

| URL | Dernière exploration |
|---|---|
| `/avis` | 18 sept. 2026 |
| `/blog/choisir-expert-application-mobile/` | 21 juil. 2026 |
| `/blog/creer-application-mobile-guide/` | **26 avr. 2026** |

**La date est le diagnostic.** Le guide a été exploré pour la dernière fois le
26 avril, soit **avant la refonte SEO d'août**. Google a jugé la version
ancienne, courte et sans structure, puis n'est jamais revenu. La page actuelle
n'a jamais été évaluée.

### Détectée, actuellement non indexée

| URL | Dernière exploration |
|---|---|
| `/blog/application-mobile-avec-claude/` | Sans objet |
| `/blog/reprendre-application-mobile-existante/` | Sans objet |

« Sans objet » signifie **jamais explorée**. Google connaît ces URLs par le
sitemap et les liens internes, mais n'a pas dépensé de budget d'exploration
dessus.

### Erreur liée à des redirections

Onze URLs, toutes **sans barre finale**, validation commencée le 20/08/2026 et
toujours en cours un mois plus tard :

`/audit-app` · `/blog` · `/blog/reprendre-application-mobile-existante` ·
`/blog/creer-application-mobile-guide` ·
`/blog/application-mobile-meilleur-investissement` ·
`/creation-application-mobile` · `/etapes` · `/blog/flutter-vs-natif-quel-choix` ·
`/contact` · `/offre` · et une onzième.

**Le recoupement qui explique tout.** `creer-application-mobile-guide` et
`reprendre-application-mobile-existante` apparaissent **deux fois** dans ce
rapport : leur version sans barre est en erreur de redirection, leur version
avec barre est non indexée. Google est bloqué entre les deux formes et
n'indexe ni l'une ni l'autre.

### Le dédoublement d'URL, vérifié dans les données

| URL | Clics | Impr. | Position |
|---|---|---|---|
| `/blog/combien-rapporte-application-mobile` (sans barre) | **1** | **44** | 9,0 |
| `/blog/combien-rapporte-application-mobile/` (avec barre) | 0 | 14 | 7,5 |

La mauvaise URL capte trois fois plus d'impressions que la bonne. Même schéma,
plus discret, sur `/blog/creer-application-avec-ia` (2 impressions sans barre).

---

## Le plan priorisé

Classé par gain attendu rapporté à l'effort.

### 1. Refondre `combien-coute-application-mobile`

| | |
|---|---|
| **Page** | `/blog/combien-coute-application-mobile/` |
| **Requête** | prix application mobile, et 15 variantes · **580 impressions** |
| **Problème** | Position 69,9. L'article fait 793 mots sur la requête la plus concurrentielle de la niche. Il est trop mince pour le classement visé. |
| **Action** | Le porter à 1 800–2 200 mots. Fourchettes par type d'application, tableau comparatif, ce qui fait varier le prix, ce qui est inclus et ce qui ne l'est pas. Traiter « prix application mobile » comme requête principale, pas « combien coûte ». |

C'est la seule action de la liste qui peut changer l'ordre de grandeur du
trafic. Toutes les autres rapportent quelques clics.

### 2. Relancer la validation des 11 erreurs de redirection

| | |
|---|---|
| **Pages** | 11 URLs sans barre finale, dont `/blog` et `/audit-app` |
| **Problème** | Validation lancée le 20/08, toujours ouverte un mois après. Deux articles non indexés sont bloqués par ce conflit. |
| **Action** | Search Console → Indexation → « Erreur liée à des redirections » → **Valider la correction**. La cause a été corrigée côté site, seule la revalidation manque. |

### 3. Forcer la réexploration du guide

| | |
|---|---|
| **Page** | `/blog/creer-application-mobile-guide/` |
| **Problème** | Dernière exploration le **26 avril**, avant la refonte. Google juge une version qui n'existe plus. 6 liens entrants, donc ce n'est pas un problème de maillage. |
| **Action** | Inspection d'URL → Demander une indexation. C'est la seule façon de forcer une réexploration. |

### 4. Même opération sur les trois autres pages bloquées

| | |
|---|---|
| **Pages** | `choisir-expert-application-mobile`, `application-mobile-avec-claude`, `reprendre-application-mobile-existante` |
| **Problème** | Une explorée en juillet et écartée, deux jamais explorées. |
| **Action** | Demander l'indexation des trois. Quota journalier limité, étaler si nécessaire. |

### 5. Gagner la page 1 sur « application mobile toulouse »

| | |
|---|---|
| **Page** | `/blog/creation-application-mobile-toulouse/` |
| **Requête** | application mobile toulouse · 20 impressions · **position 8,6** |
| **Problème** | Bas de page 1, donc quasi invisible. Le gain de deux à trois places change tout à cet endroit précis. |
| **Action** | Requête locale à faible concurrence. Enrichir avec des éléments géographiques réels, et créer la fiche Google Business si elle n'existe pas : c'est le levier le plus fort sur une requête locale. |

### 6. Consolider le cluster MVP

| | |
|---|---|
| **Page** | `/blog/mvp-application-mobile/` |
| **Requêtes** | mvp application (18,4), mvp application mobile (10,8), mvp format app (11,0), app mvp (11,0) · 29 impressions |
| **Problème** | Quatre requêtes, aucune en page 1, toutes proches. La page ne fait que 559 mots. |
| **Action** | L'allonger et couvrir les quatre formulations. C'est le deuxième actif du site et il est à portée. |

### 7. Supprimer le dédoublement d'URL

| | |
|---|---|
| **Page** | `/blog/combien-rapporte-application-mobile/` |
| **Problème** | La version sans barre capte 44 impressions et l'unique clic du blog, la version canonique n'en a que 14. L'autorité est coupée en deux. |
| **Action** | Se résout avec l'action 2. À vérifier ensuite : une seule des deux formes doit subsister dans le rapport Pages. |

### 8. Retirer l'année du titre de la page prix

| | |
|---|---|
| **Page** | `/blog/combien-coute-application-mobile/` |
| **Problème** | Le titre affiché est « Combien coûte une application mobile en 2026 ? Prix & fourchettes... ». Il est tronqué dans les résultats, et « 2026 » se périme dans trois mois. |
| **Action** | Titre plus court, sans année, centré sur « prix application mobile ». À faire en même temps que l'action 1. |

### 9. Traiter les deux pages fantômes

| | |
|---|---|
| **Pages** | `/avis` et `/rendez-vous/` |
| **Problème** | `/avis` est explorée et non indexée. `/rendez-vous/` apparaît en position 3,0 avec 2 impressions alors qu'elle n'est pas au sitemap. |
| **Action** | Décider pour chacune : page réelle à assumer et à mettre au sitemap, ou `noindex`. Une page ni assumée ni exclue consomme du budget d'exploration. |

### 10. Combler le trou GEO des pages commerciales

| | |
|---|---|
| **Pages** | Accueil, `/expertise/`, `/faq/`, `/creation-application-mobile/` |
| **Problème** | Elles servent 55 à 94 mots aux robots sans JavaScript, contre 233 à 811 mots pour Google. Le correctif du 10/09 n'a été appliqué qu'au blog. |
| **Action** | Étendre le pré-rendu complet aux pages hors blog. Sans effet sur Google, qui exécute JavaScript. Effet direct sur ChatGPT, Claude et Perplexity, qui ne l'exécutent pas. |

---

## Ce que je retiens en trois phrases

Le site n'a pas un problème de taux de clic, il a un problème de classement :
position moyenne 47, soit la page 5.

Une seule page porte 56 % de la visibilité et elle est en page 7 ; la refondre
vaut plus que les neuf autres actions réunies.

Quatre articles sont bloqués par un conflit d'URL vieux d'un mois dont la
correction est déjà en place côté site : il ne manque qu'un clic sur
« Valider la correction ».

---

## À refaire

Ce relevé est à reprendre dans 90 jours, soit **vers le 21/12/2026**, avec la
même méthode : vue d'ensemble, requêtes en position 4 à 20, rapport
d'indexation motif par motif. Comparer les deux fichiers dira si les actions
ont porté.
