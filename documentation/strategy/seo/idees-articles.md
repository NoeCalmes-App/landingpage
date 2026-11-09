# Banque de briefs — un article par semaine

> Tu écris un article par semaine. Ce fichier existe pour que tu n'aies plus
> jamais à te demander sur quoi. Tu prends le brief du haut, tu écris, tu le
> passes en « publié », tu descends d'un cran.
>
> - **Quoi écrire** : ce fichier.
> - **Comment le formater** : `modele-article.md`.
> - **Pourquoi cette stratégie** : `content-plan.md`.
>
> Créé le 20/08/2026.

## Le rituel hebdo

**La procédure complète est dans `publier-un-article.md`**, huit phases à suivre
dans l'ordre. Ce fichier-ci ne sert qu'à choisir le sujet.

Le résumé, pour mémoire :

1. Prendre le premier brief non publié de la file.
2. **Phase 0 du runbook : vérifier que le territoire est libre.** Lister les H2
   et les FAQ des articles voisins, pas leurs titres. Cinq minutes, et c'est
   l'étape qui évite d'écrire un concurrent interne.
3. Écrire en suivant `modele-article.md` (900 à 1 300 mots).
4. Câbler les liens entrants avec le script du runbook, pas de tête.
5. `npm run build` et `npm test`, six garde-fous au vert.
6. Push, vérification en ligne, puis **donner la ligne d'indexation à Noé**.

Compte 2 h la première fois, 1 h ensuite.

> Les étapes 2 et 6 sont celles qu'on saute quand on est pressé, et ce sont
> exactement les deux qui coûtent le plus cher : la première fait perdre une
> heure de rédaction inutile, la seconde fait attendre l'article des semaines.

## La règle qui décide de tout

Avant d'écrire, un seul test : **la personne qui tape cette requête peut-elle
m'acheter une application ?**

Un sujet peut être passionnant et parfaitement dans ta niche, et rester
inutile commercialement. Si la requête est tapée par quelqu'un qui a déjà une
application et la gère lui-même, c'est un pair, pas un client. Le trafic monte,
les leads non. Le détail est dans le « Filtre d'intention » de `content-plan.md`.

## Les 6 formats qui marchent

Varier le format compte autant que varier le sujet : 17 guides construits à
l'identique finissent par se ressembler, pour le lecteur comme pour Google.

### 1. La comparaison (le format le plus rentable)

C'est celui qui convertit le mieux, parce que quelqu'un qui compare est déjà
en train d'acheter. Structure qui fonctionne :

1. La vraie question derrière la comparaison (ce n'est presque jamais le prix).
2. Un tableau comparatif, dans un `<div class="table-scroll">`.
3. « Choisis A si… » / « Choisis B si… », deux listes franches.
4. Le cas où les deux sont une mauvaise réponse. C'est ce paragraphe qui rend
   l'article crédible, parce que personne d'autre ne l'écrit.

Comparaisons à écrire, par ordre d'intérêt :

- **Application sur mesure ou no-code** (Bubble, Glide, FlutterFlow)
- **Freelance, agence ou expert indépendant** (angle honnête sur les trois)
- **Application native ou une seule base de code**
- **MVP ou application complète pour démarrer**
- **Application ou plateforme de formation** (pour les formateurs)
- **Abonnement ou achat unique** (déjà partiellement couvert, à ne faire que si
  l'angle est nettement différent du modèle économique)

Règle : ne jamais comparer deux choses dont une est absurde. Une comparaison
truquée se sent, et elle décrédibilise le reste.

### 2. Le calcul

« Combien de clients pour rentabiliser », « combien rapporte ». On pose une
formule, on la déroule avec des chiffres prudents, on donne la fourchette. Le
lecteur repart avec un nombre qu'il peut vérifier. Format très partagé.

### 3. La question fermée

« Faut-il une application pour mon entreprise », « est-ce que ça vaut le
coup ». On répond OUI ou NON dès le TL;DR, puis on explique les conditions.
Répondre franchement dès le début augmente la lecture.

### 4. Le sectoriel

« Application mobile pour salle de sport », « pour artisan », « pour
formateur ». Concurrence faible, intention d'achat forte. Toujours ancrer dans
le métier du lecteur : ses tâches, ses clients, sa saisonnalité.

### 5. L'anti-guide

« Les erreurs qui… », « pourquoi 90 % de… ». Fort taux de clic, et c'est le
format où ton expertise se voit le plus. Attention à ne pas en abuser : un
blog qui ne fait que dire ce qu'il ne faut pas faire devient fatigant.

### 6. Le retour d'expérience chiffré

Le format que personne ne peut copier, parce qu'il demande d'avoir fait la
chose. C'est ton avantage : une application à 13 000 € par mois, plus de 20
applications publiées, Hush et ses 300 000 utilisateurs. À sortir quand la file
manque d'énergie, c'est toujours celui qui marche.

## La file de briefs

### ✅ Publié — Lovable, Base44 : est-ce que ça marche pour une application mobile ?
**Publié le 31/08/2026** · **Format** : comparaison · **Mot-clé** : lovable base44 application mobile

L'angle qui fait la force de cet article : il ne dit jamais que ces outils sont
mauvais. Il constate un fait vérifiable, **ils produisent une application web,
pas une application iOS ou Android**, et il en tire la conséquence business :
la règle 4.2 d'Apple rejette les sites réempaquetés, donc pas d'App Store, donc
pas d'abonnement encaissé par les stores.

> **Leçon à réutiliser sur les prochaines comparaisons.** La version « Lovable
> c'est nul » aurait moins bien classé et moins bien converti. Google récompense
> la profondeur argumentée, pas l'invective, et `positionnement.md` dit
> explicitement de ne pas dénigrer l'IA. Un fait précis est plus dur à
> contredire qu'une opinion, et il positionne Noé en expert plutôt qu'en
> concurrent aigri.
>
> Deuxième règle : **reconnaître honnêtement ce que le concurrent fait bien**
> (section « Quand ces outils sont le bon choix »). C'est ce qui rend crédible
> tout le reste, et ça évite le procès d'intention.
>
> Troisième règle : **ne jamais titrer sur « Noé Calmes vs X »**. Personne ne
> cherche le nom de Noé. On se positionne sur le nom de l'outil, que des
> milliers de gens tapent déjà.

Statut : `à écrire` → `rédigé` → `publié`.

---

### 1. Créer une application sans savoir coder : les vraies options
**Statut** : ✅ publié le 30/08/2026 · **Format** : comparaison · **Mot-clé** : créer une application sans savoir coder

Requête massive de ton ICP. Trois options honnêtes : no-code, IA, expert. Ce
que chacune coûte vraiment, jusqu'où elle va, et le mur qu'on rencontre avec
chacune. Ne pas dénigrer le no-code : dire précisément où il s'arrête (paiement
récurrent, publication sur les stores, performance, propriété du code).

FAQ à couvrir : le no-code peut-il gérer un abonnement · peut-on migrer du
no-code vers du sur-mesure · combien coûte chaque option sur trois ans.
Liens : `/blog/creer-application-avec-ia/`, `/blog/combien-coute-application-mobile/`.

---

### 2. Combien de clients faut-il pour rentabiliser ton application
**Statut** : ✅ publié le 14/09/2026 · **Format** : calcul · **Mot-clé** : rentabiliser une application combien de clients

Le calcul que se fait tout acheteur avant de signer. Poser la formule : coût de
l'application ÷ (prix mensuel net × durée moyenne d'abonnement). Dérouler trois
scénarios chiffrés (8 000 €, 15 000 €, 25 000 €). Insister sur le net après
commission des stores et TVA. Utiliser un `<div class="chiffre">` pour le
résultat central.

Liens : `/blog/combien-rapporte-application-mobile/`, `/blog/combien-coute-application-mobile/`.

> **Ce que la rédaction a révélé, et qui a servi au-delà de l'article.** Deux
> articles déjà en ligne chiffraient le remboursement en **brut**, sans déduire
> la TVA ni la commission du store : 68 abonnés pour 9 000 €, 45 pour 8 000 €.
> Les vrais chiffres sont 96 et 63. Les six mentions ont été corrigées et
> renvoient désormais vers l'article de calcul.
>
> Règle à garder : dès qu'un article avance un chiffre de rentabilité, il part
> du **net**, jamais du prix affiché. Compter environ 70 % du prix TTC.

---

### 3. ~~Application sur mesure ou no-code : ce que ça change dans deux ans~~
**Statut** : ❌ abandonné le 21/09/2026, déjà couvert · **Mot-clé** : application sur mesure ou no-code

**Ne pas écrire.** La vérification faite avant rédaction a montré que
`/blog/creer-application-sans-savoir-coder/` traite déjà exactement cet angle :
il contient un H2 intitulé « Le vrai comparatif se fait à deux ans », plus les
FAQ « Qui possède le code dans chaque cas ? » et « Est-ce que je peux commencer
en no-code et migrer ensuite ? ». Coût de sortie, propriété du code et
dépendance à la plateforme y sont donc déjà traités.

> **Leçon de méthode.** Un brief écrit il y a un mois peut avoir été absorbé
> entre-temps par un article qui a grossi en cours de rédaction. Avant d'écrire,
> lister les H2 et les FAQ des articles voisins, pas seulement leurs titres :
> c'est au niveau des sections que la cannibalisation se joue. La commande qui
> a servi est dans le rituel hebdo, étape 2.
>
> Si ce mot-clé doit être travaillé un jour, ce sera en enrichissant l'article
> existant, jamais en créant une seconde page.

---

### 4. ~~Transformer ta formation en application mobile~~
**Statut** : ❌ abandonné le 28/09/2026, déjà couvert · **Mot-clé** : transformer sa formation en application

**Ne pas écrire.** La phase 0 a montré que
`/blog/application-mobile-coach-formateur/` traite déjà l'angle du brief : sa
FAQ « Application ou plateforme de formation existante ? » est exactement la
comparaison prévue ici, et sa section « À partir de quand c'est rentable »
couvre le calcul sur une promo d'apprenants.

> **Deuxième brief abandonné en deux semaines**, après le n°3. Ce n'est pas un
> problème de file, c'est le signe que le site est devenu dense : les articles
> ont absorbé les angles prévus en grossissant. La phase 0 du runbook fait
> exactement son travail.
>
> Si ce mot-clé doit être travaillé, ce sera en ajoutant un H2 dédié dans
> l'article coach-formateur, jamais en créant une seconde page.

Formateurs et organismes. Ce que l'application change par rapport à une
plateforme : la fréquence, la notification, le suivi. Le calcul de rentabilité
sur une promo de 30 apprenants. Attention au piège de l'application qui n'est
qu'un lecteur vidéo.

---

### 5. Combien de temps pour créer une application mobile
**Statut** : ✅ publié le 21/09/2026 · **Format** : question fermée · **Mot-clé** : combien de temps pour créer une application mobile

Requête à fort volume, objection classique. Répondre 4 à 6 semaines dès le
TL;DR, puis détailler ce qui allonge : nombre de types d'utilisateurs, temps
réel, validation des stores. Un encadré `attention` sur les délais de
validation Apple, première source de retard imprévu.

> **Ce que la rédaction a changé par rapport au brief.** Le brief annonçait la
> validation Apple comme première source de retard. C'est faux, et l'article dit
> l'inverse : la validation est rapide, souvent moins de deux jours, et le vrai
> risque est le refus, pas la durée. La première cause de retard constatée est
> le **délai de réponse du client**, une semaine d'attente valant un sixième
> d'un planning de six semaines. L'encadré `attention` a donc été déplacé sur ce
> point, qui est à la fois plus vrai et plus utile au lecteur.
>
> Deuxième apport : l'article réconcilie publiquement les deux chiffres du site,
> « 4 à 6 semaines » et « 45 jours ». Ils coexistaient dans six articles sans
> qu'aucun n'explique qu'ils mesurent deux choses différentes, le temps de
> travail et le temps calendaire. C'est désormais une question de la FAQ.
>
> Règle à garder : quand deux chiffres du site semblent se contredire, ne pas en
> supprimer un. Expliquer ce que chacun mesure, dans une FAQ. Un site qui
> explique ses propres écarts inspire plus confiance qu'un site lissé.
>
> **Depuis le 11/10/2026** (décision de Noé) : le chiffre annoncé partout est « 45 jours en moyenne pour
> une application », du cadrage à la mise en ligne, jamais « première version ». « 4 à 6 semaines »
> n'apparaît plus que comme le temps de développement à l'intérieur de ces 45 jours. Les tableaux de prix
> n'ont plus de colonne délai, et « 6 à 9 mois pour une application complète » est devenu « une plateforme
> plus lourde se compte en mois, son délai est fixé dans le devis ».

---

### 6. Application mobile pour salle de sport et studio
**Statut** : ✅ publié le 05/10/2026 · **Format** : sectoriel · **Mot-clé** : application mobile salle de sport

Réservation de cours, suivi des membres, abonnement, réduction du taux de
résiliation. Le calcul sur une salle de 200 adhérents. Requête locale et
sectorielle, concurrence faible.

**Ce que la phase 0 a tranché.** Le contrôle vocabulaire a sorti
`application-mobile-coach-formateur` avec 4 mentions, et deux passages
inquiétants dans son corps : « Coaching, formation, accompagnement, studio,
consulting » et « La réservation : créneaux, séances, salles ». Vérification
faite, ce sont deux énumérations : **aucun H2, aucune FAQ** n'y traite la salle.
Territoire libre, donc écrit.

**L'angle trouvé en écrivant, et qui vaut pour les prochains sectoriels.**
Le brief parlait de réservation. C'est justement la mauvaise entrée : une salle
encaisse déjà son abonnement par prélèvement, donc l'application **ne crée pas
de revenu, elle en retient**. Le calcul porte sur les départs évités, pas sur
des inscriptions. Et le levier n'est pas la réservation (que font les fidèles,
ceux qui n'allaient pas partir) mais **la détection de l'absence**.
À chercher pour chaque secteur : où est le revenu déjà encaissé, et qu'est-ce
qui le fait fuir. C'est plus fort que la liste de fonctionnalités.

**Angle laissé de côté** : l'application pour les coachs *employés* de la salle
(suivi de leurs clients, planning). Autre cible, autre acheteur, à ne pas mélanger.

---

### 7. Cahier des charges d'application mobile : ce qu'il faut vraiment écrire
**Statut** : ✅ publié le 28/09/2026 · **Format** : guide · **Mot-clé** : cahier des charges application mobile

Requête très proche de l'achat : la personne prépare sa consultation. Angle
contre-intuitif et honnête : un cahier des charges écrit trop tôt fige de
mauvaises décisions. Donner la trame minimale qui suffit réellement (problème,
cible, ce qui est payant, contraintes), et dire que le reste se cadre ensemble.
Excellent article pour capter des gens qui vont demander des devis dans la
semaine.

> **Ce que la rédaction a apporté au-delà du brief.** Le brief prévoyait la
> trame minimale. L'article y ajoute deux choses qui valent d'être réutilisées.
>
> D'abord un usage du document auquel personne ne pense : **la façon dont un
> prestataire répond à ta page en dit plus long que ses références.** Celui qui
> interroge ton modèle de revenus a compris l'enjeu, celui qui chiffre sans
> rien demander a chiffré ses propres hypothèses, celui qui réclame trente
> pages te fait faire son cadrage.
>
> Ensuite une section qui reconnaît les cas où le document long est justifié,
> appel d'offres public, contrainte réglementaire, reprise d'existant, équipes
> multiples. C'est la règle « reconnaître ce que l'autre fait bien » appliquée
> à une pratique plutôt qu'à un concurrent : sans elle, l'article passerait
> pour une position de confort.

---

### 8. ~~Freelance, agence ou expert indépendant~~
**Statut** : ❌ abandonné le 11/10/2026, déjà couvert · **Mot-clé** : freelance ou agence application mobile

> **Ce que la phase 0 a tranché.** `choisir-expert-application-mobile` porte déjà un
> H2 « Les 3 profils principaux » et une FAQ « Agence ou indépendant ? », avec 10
> mentions d'agence, 7 de prestataire, 4 de freelance. Le brief l'anticipait
> (« à ne faire que si l'angle est nettement plus comparatif »). Le seul apport
> possible, un tableau de fourchettes par profil, est un enrichissement de
> l'article existant, pas un article : à faire le jour où on rafraîchit
> `choisir-expert`, pas en doublon.

Attention : vérifier le recoupement avec `/blog/choisir-expert-application-mobile/`
avant d'écrire. À ne faire que si l'angle est nettement plus comparatif, avec un
vrai tableau et des fourchettes de prix par profil. Sinon, enrichir l'article
existant plutôt que d'en créer un second qui le cannibalise.

---

### 9. Application mobile pour ton entreprise : dans quels cas ça se justifie
**Statut** : ✅ publié le 11/10/2026 · **Format** : question fermée · **Mot-clé** : application mobile pour entreprise

**Le brief a été réaligné à l'écriture, et c'est à retenir pour les suivants.**
Il disait « dans la majorité des cas un site suffit ». Depuis le repositionnement
d'octobre (`vocabulaire-mobile-web.md`), « site » ne désigne jamais une
application web, et la réponse honnête pour une entreprise est « souvent une
application **web**, pas mobile ». L'article garde « mobile » dans le titre et
le slug (c'est la requête), et le corps applique le test du prédicat : quatre
cas justifient le mobile, sinon c'est une application web, et un site vitrine
n'est ni l'un ni l'autre. Les briefs 10 et 11 (artisan, consultant) sont dans
la même situation : les relire avec cette grille avant d'écrire, parce qu'un
artisan sur chantier est un cas mobile net, et un consultant devant son écran un
cas web net.

**Maillage** : un lien sortant vers `combien-coute-application-mobile`, qui est
« explorée, actuellement non indexée » au 11/10 (voir `README.md`), pour lui
donner un entrant depuis une page neuve.

Requête large mais acheteuse. Répondre franchement : dans la majorité des cas
un site suffit. Détailler les quatre situations où l'application se justifie
vraiment. Renvoyer vers `/quiz/ai-je-besoin-application-mobile/`.

---

### 10. Application mobile pour artisan et commerçant
**Statut** : ✅ publié le 19/10/2026 · **Format** : sectoriel · **Mot-clé** : application mobile artisan

**L'angle trouvé en écrivant.** Le brief parlait de « fidélité, réservation,
devis, suivi de chantier » comme d'une seule application. Il y en a deux, et ce
n'est pas la même : l'outil de l'artisan (devis sur place, photos, suivi) et
l'application pour ses clients (à installer, donc seulement s'ils reviennent).
L'article les sépare, met l'outil d'abord, et réserve l'application client au
commerce dont la clientèle repasse. Le suivi de chantier côté client se fait
par un lien web, sans installation : c'est le cas « les deux » de la doctrine,
dit sans comparer les prix.

**Le brief disait « une fiche Google Business et un site suffisent ».** Réaligné
sur `vocabulaire-mobile-web.md` : fiche Google, avis, photos. Le mot « site »
n'apparaît que pour le site vitrine refusé.

**Le calcul propre à l'artisan** : deux devis promis par semaine qui ne partent
jamais, 1 500 € de panier moyen, un sur trois aurait signé, soit 1 000 € par
semaine de chiffre, et le remboursement se calcule sur la marge, un tiers, jamais sur le chiffre (règle de la phase 1, rappelée par la relecture). C'est le levier que les sectoriels suivants peuvent reprendre : chercher
le revenu qui s'échappe par habitude, pas la fonctionnalité qui impressionne.

Secteur très peu travaillé en SEO. Fidélité, réservation, devis, suivi de
chantier. Attention à rester honnête : pour beaucoup d'artisans une fiche
Google Business et un site suffisent. Le dire renforce la crédibilité.

---

### 11. ~~Application mobile pour consultant et indépendant~~
**Statut** : ❌ abandonné le 26/10/2026, déjà couvert et hors cible · **Mot-clé** : application mobile consultant

> **Ce que la phase 0 a tranché.** `application-mobile-coach-formateur` a le
> consultant **dans son titre** (« coach, formateur ou consultant »), son TL;DR dit
> déjà « vendre autre chose que ton temps » (« quand ton temps est devenu le
> plafond de tes revenus »), et ses H2 couvrent les formats et la rentabilité.
> Deuxième raison, plus forte : le brief disait « ICP direct », ce qui était vrai
> avant le 05/10/2026. Depuis le repositionnement, coachs, formateurs et
> consultants sont une « opportunité secondaire, très peu dans les faits »
> (`positionnement.md`). On n'écrit pas un sectoriel pour une cible qu'on ne
> construit plus.
>
> **À faire à la place, le jour où on rafraîchit `coach-formateur`** : il contient
> « là où une plateforme web est consultée une fois puis oubliée », phrase
> antérieure au repositionnement qui dévalorise le web. À reformuler selon
> `vocabulaire-mobile-web.md`. L'espace client et les livrables d'un consultant
> sont d'ailleurs un cas web net.

Vendre autre chose que ton temps. Espace client, livrables, suivi, abonnement
au conseil. ICP direct.

---

### 12. Ce que j'ai appris en publiant 20 applications
**Statut** : ✅ publié le 26/10/2026 · **Format** : retour d'expérience · **Mot-clé** : longue traîne, marque

**Règle suivie, à garder pour tout retour d'expérience** : aucun fait qui ne soit
déjà écrit ailleurs sur le site. Les cinq faits utilisés viennent de
`positionnement.md` (Proof points) et d'articles publiés : plus de 20
applications, plus de 1,3 million de téléchargements (le chiffre de l'accueil depuis le 19/10, `positionnement.md` mis à jour le 26/10), Hush à 300 000 utilisateurs sans
modèle de revenu, Calorie à 13 000 € par mois sur un marché saturé, Wake Up
Alarme et Plouff Habitudes comme applications personnelles. Hush et Calorie sont
des applications **clients** dont Noé a conçu la première version, et l'article
le dit : la relecture d'authenticité a attrapé une phrase qui en faisait « mon
application », faute à ne jamais refaire. Aucune date, aucun
nom d'application en échec, aucun montant d'échec n'a été inventé.

**L'angle** : les leçons existaient déjà en principes (« pourquoi 90 % ne
rapportent rien », la leçon IA de `lovable-base44`). Cet article raconte
l'histoire qui les a produites, chronologiquement, et renvoie vers elles au lieu
de les répéter. Fil conducteur : « la question de Hush », où et quand
l'utilisateur sort sa carte.

**Si Noé veut l'enrichir d'épisodes personnels** (une application qui a échoué,
un projet refusé, un pivot vers le web avec le contexte), il les dicte et on les
insère : c'est le seul article du blog qui gagne à être plus personnel, et le
seul où je ne peux rien ajouter sans lui.

Le format que personne ne peut copier. Ce qui a marché, ce qui a échoué, les
chiffres réels. Peu de volume de recherche, mais fort taux de partage, bon
générateur de liens entrants, et c'est l'article qui construit l'autorité.
À sortir quand la file manque d'énergie.

---

## Nouvelle file, construite le 02/11/2026 depuis Search Console

**Les chiffres de départ** (3 mois au 30/10/2026, Search Console, recherche Web) :
27 clics, 3 010 impressions, CTR 0,9 %, position moyenne 30. Ce n'est pas le
nombre d'articles qui manque (28 en ligne), c'est le classement des pages qui
existent déjà. La file part donc des pages, pas des idées.

| Page | Impressions | Position | Clics | Lecture |
|---|---|---|---|---|
| `application-mobile-avec-claude` | 1 023 | 8,5 | 11 | La page la plus forte du site, de loin |
| `combien-coute-application-mobile` | 599 | 68,9 | 0 | 20 % des impressions du site, enterrée |
| `combien-de-temps-creer-application-mobile` | 268 | 9,7 | 0 | En première page, sans clic |
| `creer-application-mobile-guide` | 244 | 77,2 | 0 | Requêtes « comment créer », enterrée |
| `mvp-application-mobile` | 169 | 11,6 | 1 | Capte aussi « idée d'application » |
| `application-mobile-pour-entreprise` | 129 | 46,2 | 0 | Publiée le 11/10, elle monte |

### 1. ✅ Le guide « comment créer une application mobile », refondu le 02/11/2026
244 impressions en position 77 sur « comment créer une application mobile »,
« faire une application mobile », « conception application mobile ». Le texte
datait d'avril, d'avant le repositionnement : Swift, Kotlin, « cross-platform »,
seulement les stores. Réécrit en 1 200 mots selon la doctrine (l'arbitrage
mobile ou web devient l'étape 1, le modèle de revenu l'étape 2), slug inchangé,
date mise à jour. Il reçoit désormais un lien de l'article Claude, la page la
plus forte du site, qui n'y renvoyait pas. **À mesurer le 30/11** : position du
guide sur « comment créer une application mobile ».

### 0. Les liens entrants, avant tout le reste (09/11/2026)
Le rapport « Liens » de Search Console ne compte qu'**un seul lien externe**
(smoothride.fr). C'est la cause principale du classement, et aucun article ne la
corrige. La liste des sources et le suivi : `liens-entrants.md`. Tant que ce
total ne monte pas, les chantiers ci-dessous auront un effet limité.

### 2. Le prix d'une application, en position 69
`combien-coute-application-mobile` porte 599 impressions sur « prix application
mobile » (176), « combien coûte une application mobile » (134), « coût d'une
application mobile » (105), « prix d'une application mobile » (134 en deux
graphies). C'est la plus grosse demande du site, et la page est 69ᵉ. Le 02/11,
elle a reçu deux liens (article Claude, article délai). **Prochaine étape** :
regarder les dix premiers résultats Google sur « prix application mobile » et
comprendre ce qu'ils ont qu'elle n'a pas ; vérifier aussi qu'aucune page du site
ne lui fait concurrence (`/faq/`, le quiz budget, `pour-entreprise`, `artisan`,
qui parlent tous de prix). Enrichir plutôt que créer.

### 3. Les pages déjà en première page qui n'ont aucun clic
`combien-de-temps-creer-application-mobile` (268 impressions, position 9,7),
`creer-application-sans-savoir-coder` (73, 9,1), `creation-application-mobile`
(64, 10,7), `combien-rapporte-application-mobile` (55, 9,3). En dixième
position, peu de clics est normal : le gain ne viendra pas du titre seul mais
de la remontée vers le top 5. Leviers : liens depuis la page Claude et l'accueil,
et une réponse plus nette en tête d'article à la question exacte tapée
(« temps développement application mobile » est la première requête du délai).

### 4. « Idée d'application mobile » : bien placé, sur la mauvaise page
28 impressions en position 3 à 4, zéro clic : Google y montre l'article **MVP**,
pas `idee-application-business-rentable`. Problème d'intention, pas de
classement. À faire : donner à `idee-application-business-rentable` un titre
qui dit « idée d'application » dans les mots du chercheur, et ajouter dans
l'article MVP une phrase et un lien vers lui.

### 5. Refonte d'application, aucune page ne répond
« refonte application » (25), « refonte application mobile », « refonte d'une
application », « refonte applicative » : une trentaine d'impressions en
position 78 à 84. `faire-evoluer-application-mobile` a déjà un H2 « Évolution
vs refonte », et `reprendre-application-mobile-existante` un « Reprendre ou
reconstruire ? ». **Ne pas créer d'article** : enrichir `faire-evoluer` (titre
qui contient « refonte », section développée), c'est un des trois cas d'usage
de Noé et un client qui a déjà un budget.

### 6. ✅ Article sœur de la page Claude, publié le 09/11/2026
`creer-application-web-avec-claude` : « Créer une application web avec Claude :
le code marche, l'argent ne rentre pas ». Phase 0 :
l'article mobile écarte explicitement le lecteur « outil web », et personne ne
couvrait hébergement, comptes, paiement par carte et sécurité d'un logiciel
généré. Angle de Noé : le code n'a jamais fait le revenu, c'est le design du
parcours, la stratégie et le lancement. Liens dans les deux sens avec l'article
mobile (relais, pas concurrence). `finalCta: 'whatsapp'` (le lecteur a déjà du
code). **À mesurer le 07/12** : impressions sur « application web avec Claude »,
« logiciel avec Claude », et que la page mobile ne baisse pas.

Les requêtes « avec Claude » font environ 70 impressions visibles en position
10 (créer une application, un logiciel, Claude Code), et la page Claude en
reçoit 1 023 au total. Un article sur « créer une application web ou un
logiciel avec Claude » prolongerait le seul sujet où le site est fort, et colle
au repositionnement web. **Risque principal** : cannibaliser la page qui
marche. Phase 0 stricte avant d'écrire.

### 7. Les deux retouches notées sur les briefs abandonnés
`coach-formateur` : la phrase « une plateforme web est consultée une fois puis
oubliée » dévalorise le web, à reformuler. `choisir-expert` : le tableau des
fourchettes par profil (agence, freelance, indépendant) noté au brief 8.

### À ne pas toucher pour l'instant
`application-mobile-pour-entreprise` (107 impressions sur « application mobile
entreprise », position 48, publiée le 11/10) et `application-mobile-artisan`
(position 33) sont jeunes et montent. Les revoir fin novembre.

## Idées à ne PAS écrire

Elles reviennent régulièrement à l'esprit, et elles sont mauvaises.

- **Tout ce qui contient** paywall, onboarding, churn, MRR, ARPU, rétention
  D30 : vocabulaire d'éditeur d'application, donc lecteurs qui gèrent déjà leur
  produit. Ce sont des pairs, pas des clients.
- **« Les 10 meilleures applications de… »** : aucun rapport avec ton offre,
  attire du trafic sans intention, et te positionne comme média.
- **Les tendances technologiques** (« l'IA en 2027 », « le futur du mobile ») :
  aucun acheteur ne tape ça avant de commander une application.
- **Une page locale par grande ville** sans présence réelle : Google traite ça
  comme du contenu dupliqué de faible qualité, et ça affaiblit la page Toulouse.
- **Un sujet déjà couvert par un quizz**, à une exception près détaillée
  ci-dessous : besoin réel, budget.

> **Levée du 05/10/2026 sur le sujet « application web ou mobile ».** Cette règle
> interdisait l'article d'arbitrage au motif qu'il doublonnait le quizz
> `/quiz/application-ou-site-web`. Le motif ne tient plus, pour deux raisons.
>
> D'abord, l'ancien quizz n'arbitrait pas le même sujet : il opposait une
> application mobile à un **site vitrine**, sur des critères de visibilité
> Google, et il présentait le web comme l'option « pour une fraction du
> budget ». Il n'a jamais traité l'application web comme un produit.
>
> Ensuite, il a été refondu le 05/10 et rend désormais quatre verdicts
> (application mobile · application web · les deux · site vitrine, que Noé
> refuse). Le quizz et l'article ne se font donc pas concurrence, **ils se
> relaient** :
>
> | | Ce qu'il fait |
> |---|---|
> | **Le quizz** | Donne un verdict personnalisé en 6 questions. Il tranche. |
> | **L'article** | Explique le raisonnement, capte la requête informationnelle, et renvoie vers le quizz. |
>
> Les deux doivent se lier l'un à l'autre. Règle générale qui en découle : un
> quizz et un article peuvent coexister sur un même territoire **si l'article
> explique ce que le quizz se contente de trancher**.

## Quand la file sera vide

Trois options, dans cet ordre :

1. **Mettre à jour les articles existants.** Un article rafraîchi avec des
   chiffres à jour reprend souvent des positions plus vite qu'un article neuf,
   pour une fraction du travail.
2. **Approfondir le cluster monétisation** avec des cas chiffrés réels.
3. **Reprendre ce fichier** en repartant des requêtes réelles de Search
   Console : celles qui ont des impressions mais peu de clics sont des sujets
   déjà validés par Google, il ne manque que la page.

## Observatoire des chiffres (09/11/2026) : brief transformé en enrichissement

Idée issue de la recherche GEO du 09/11 : une page de données originales, que la
presse et les IA citent. Contrôle anti-doublon (phase 0) : les chiffres
disponibles (plus de 20 applications, 1,3 million de téléchargements, Hush à
300 000 utilisateurs, Calorie à 13 000 €/mois avec environ 30 000
téléchargements et 3 % de payants, 45 jours, 30 jours pour Plouff, 70 % contre
78 %) ont chacun déjà une section dans `ce-que-j-ai-appris-20-applications`, et
l'exemple des 13 000 € est aussi dans `combien-rapporte-application-mobile`.
Une page à part aurait concurrencé les deux. **Décision : enrichir.** Un tableau
« Les chiffres, en un tableau » (chiffre, ce qu'il mesure, ce qu'il ne dit pas)
a été ajouté en tête de `ce-que-j-ai-appris-20-applications`, avec `dateMaj`.
À ne rouvrir que si Noé apporte des chiffres nouveaux (répartition clients et
propres applications, nombre d'applications qui rapportent, délais par projet).
