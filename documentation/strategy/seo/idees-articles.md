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

## Le rituel hebdo, en 6 étapes

1. Prendre le premier brief non publié de la file.
2. Écrire le corps en suivant `modele-article.md` (900 à 1 300 mots).
3. Remplir `tldr`, `pourQui`, `pasPourQui`, `faq`. Ces champs ne sont pas
   optionnels : ce sont eux qui font rester le lecteur.
4. Ajouter le slug dans `ARTICLES_LIES` : 3 sortants, et le citer dans 2 autres
   entrées.
5. `npm run build`, vérifier les 4 lignes vertes.
6. Push, puis demander l'indexation dans Search Console.

Compte 2 h la première fois, 1 h ensuite.

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

Statut : `à écrire` → `rédigé` → `publié`.

---

### 1. Créer une application sans savoir coder : les vraies options
**Statut** : à écrire · **Format** : comparaison · **Mot-clé** : créer une application sans savoir coder

Requête massive de ton ICP. Trois options honnêtes : no-code, IA, expert. Ce
que chacune coûte vraiment, jusqu'où elle va, et le mur qu'on rencontre avec
chacune. Ne pas dénigrer le no-code : dire précisément où il s'arrête (paiement
récurrent, publication sur les stores, performance, propriété du code).

FAQ à couvrir : le no-code peut-il gérer un abonnement · peut-on migrer du
no-code vers du sur-mesure · combien coûte chaque option sur trois ans.
Liens : `/blog/creer-application-avec-ia/`, `/blog/combien-coute-application-mobile/`.

---

### 2. Combien de clients faut-il pour rentabiliser ton application
**Statut** : à écrire · **Format** : calcul · **Mot-clé** : rentabiliser une application combien de clients

Le calcul que se fait tout acheteur avant de signer. Poser la formule : coût de
l'application ÷ (prix mensuel net × durée moyenne d'abonnement). Dérouler trois
scénarios chiffrés (8 000 €, 15 000 €, 25 000 €). Insister sur le net après
commission des stores et TVA. Utiliser un `<div class="chiffre">` pour le
résultat central.

Liens : `/blog/combien-rapporte-application-mobile/`, `/blog/combien-coute-application-mobile/`.

---

### 3. Application sur mesure ou no-code : ce que ça change dans deux ans
**Statut** : à écrire · **Format** : comparaison · **Mot-clé** : application sur mesure ou no-code

L'angle qui différencie : tout le monde compare au moment de l'achat, personne
ne compare à deux ans. Coût de sortie, propriété du code, plafond de
performance, dépendance à une plateforme qui peut changer ses tarifs.

---

### 4. Transformer ta formation en application mobile
**Statut** : à écrire · **Format** : sectoriel · **Mot-clé** : transformer sa formation en application

Formateurs et organismes. Ce que l'application change par rapport à une
plateforme : la fréquence, la notification, le suivi. Le calcul de rentabilité
sur une promo de 30 apprenants. Attention au piège de l'application qui n'est
qu'un lecteur vidéo.

---

### 5. Combien de temps pour créer une application mobile
**Statut** : à écrire · **Format** : question fermée · **Mot-clé** : combien de temps pour créer une application mobile

Requête à fort volume, objection classique. Répondre 4 à 6 semaines dès le
TL;DR, puis détailler ce qui allonge : nombre de types d'utilisateurs, temps
réel, validation des stores. Un encadré `attention` sur les délais de
validation Apple, première source de retard imprévu.

---

### 6. Application mobile pour salle de sport et studio
**Statut** : à écrire · **Format** : sectoriel · **Mot-clé** : application mobile salle de sport

Réservation de cours, suivi des membres, abonnement, réduction du taux de
résiliation. Le calcul sur une salle de 200 adhérents. Requête locale et
sectorielle, concurrence faible.

---

### 7. Cahier des charges d'application mobile : ce qu'il faut vraiment écrire
**Statut** : à écrire · **Format** : guide · **Mot-clé** : cahier des charges application mobile

Requête très proche de l'achat : la personne prépare sa consultation. Angle
contre-intuitif et honnête : un cahier des charges écrit trop tôt fige de
mauvaises décisions. Donner la trame minimale qui suffit réellement (problème,
cible, ce qui est payant, contraintes), et dire que le reste se cadre ensemble.
Excellent article pour capter des gens qui vont demander des devis dans la
semaine.

---

### 8. Freelance, agence ou expert indépendant
**Statut** : à écrire · **Format** : comparaison · **Mot-clé** : freelance ou agence application mobile

Attention : vérifier le recoupement avec `/blog/choisir-expert-application-mobile/`
avant d'écrire. À ne faire que si l'angle est nettement plus comparatif, avec un
vrai tableau et des fourchettes de prix par profil. Sinon, enrichir l'article
existant plutôt que d'en créer un second qui le cannibalise.

---

### 9. Application mobile pour ton entreprise : dans quels cas ça se justifie
**Statut** : à écrire · **Format** : question fermée · **Mot-clé** : application mobile pour entreprise

Requête large mais acheteuse. Répondre franchement : dans la majorité des cas
un site suffit. Détailler les quatre situations où l'application se justifie
vraiment. Renvoyer vers `/quiz/ai-je-besoin-application-mobile/`.

---

### 10. Application mobile pour artisan et commerçant
**Statut** : à écrire · **Format** : sectoriel · **Mot-clé** : application mobile artisan

Secteur très peu travaillé en SEO. Fidélité, réservation, devis, suivi de
chantier. Attention à rester honnête : pour beaucoup d'artisans une fiche
Google Business et un site suffisent. Le dire renforce la crédibilité.

---

### 11. Application mobile pour consultant et indépendant
**Statut** : à écrire · **Format** : sectoriel · **Mot-clé** : application mobile consultant

Vendre autre chose que ton temps. Espace client, livrables, suivi, abonnement
au conseil. ICP direct.

---

### 12. Ce que j'ai appris en publiant 20 applications
**Statut** : à écrire · **Format** : retour d'expérience · **Mot-clé** : longue traîne, marque

Le format que personne ne peut copier. Ce qui a marché, ce qui a échoué, les
chiffres réels. Peu de volume de recherche, mais fort taux de partage, bon
générateur de liens entrants, et c'est l'article qui construit l'autorité.
À sortir quand la file manque d'énergie.

---

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
- **Un sujet déjà couvert par un quizz** : besoin réel, application ou site
  web, budget. L'article ferait doublon avec la page de test.

## Quand la file sera vide

Trois options, dans cet ordre :

1. **Mettre à jour les articles existants.** Un article rafraîchi avec des
   chiffres à jour reprend souvent des positions plus vite qu'un article neuf,
   pour une fraction du travail.
2. **Approfondir le cluster monétisation** avec des cas chiffrés réels.
3. **Reprendre ce fichier** en repartant des requêtes réelles de Search
   Console : celles qui ont des impressions mais peu de clics sont des sujets
   déjà validés par Google, il ne manque que la page.
