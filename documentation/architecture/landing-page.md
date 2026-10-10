# Architecture — Landing Page

## Role

Site public `noecalmes.fr` pour vendre le positionnement de Noe Calmes : expert en application mobile, de la strategie au lancement. Le site sert a convertir le trafic en audit gratuit et conversation WhatsApp via la section `/rendez-vous`.

Le chemin prioritaire pour les visiteurs qui se posent une question de prix/budget est : landing page -> `/audit-app` -> verdict -> WhatsApp. WhatsApp est le canal de contact unique : tous les CTA y menent (Calendly retire depuis le 22/06/2026, voir `documentation/strategy/tunnel.md`).

## Stack

- React + Vite
- Tailwind CSS v4
- Routes SPA maison dans `src/App.jsx`
- Build : `npm run build` puis `scripts/generate-routes.js`
- Hebergement GitHub Pages / domaine `noecalmes.fr`

## Routes principales

Routes gerees dans `src/App.jsx` :

- `/` — home landing page
- `/expertise` — page SEO autonome : ce que je fais qu'un developpeur ne fait pas (`src/PagesSeo.jsx`)
- `/creation-application-mobile` — page SEO autonome : la methode en 5 etapes (`src/PagesSeo.jsx`)
- `/faq` — page SEO autonome + donnees structurees FAQPage (`src/PagesSeo.jsx`)
- `/quiz` et `/quiz/{slug}` — pages quizz SEO (`src/Quiz.jsx`)
- `/projets` — realisations (`src/Projets.jsx`)
- `/audit-app` — audit gratuit d'idee d'application
- `/rendez-vous` — section contact WhatsApp de la home (`#contact-section`)
- `/documents` — sommaire des familles de documents (`src/DocumentsIndex.jsx`). Adresse generique et stable : elle NE redirige PAS vers l'application mobile, pour rester juste le jour ou une deuxieme famille arrive. Alias reecrits en canonique : `/document`, `/docs`, `/doc`.
- `/documents/app-mobile` — les acces a creer avant developpement (`src/Documents.jsx`), et ses guides `/documents/app-mobile/{nom-de-domaine,new-membre,google-play-console,apple-developer,flutter-firebase}`. **`nom-de-domaine` ouvre la liste**, et pas par gout de l'ordre : le compte Apple Developer reclame un site au nom de la societe et une adresse e-mail a ce domaine, donc un client qui commence par Apple se fait arreter au milieu du formulaire le plus long. Son PDF se regenere (`python3 scripts/guides/generer-guide.py`, texte et captures dans `scripts/guides/`) ; les trois guides plus anciens, composes a la main, n'ont pas de source. Alias : `/documents/appmobile`, `/mobile`. Les anciennes adresses des guides (`/new-membre`, `/google-play-console`, `/apple-developer`, `/documents/flutter-firebase`) ouvrent le bon guide puis se reecrivent en canonique : ces liens sont colles dans des devis deja envoyes.
- Toutes ces adresses sont definies dans `src/routesDocuments.js`, jamais ecrites a la main ailleurs.
- `/blog` et `/blog/...`
- `/espace-client/:clientSlug/:token` et `/espace-client/:token` — facade publique vers l'espace client de Nowork, URL propre sans `/nowork` visible
- `/maquette-visuel/:clientSlug/:quoteId` — facade publique vers les maquettes de Nowork, URL propre sans `/nowork` visible
- `/maquette/smoothride`
- `/maquette/aretha`
- `/maquette/kingfit-coach`
- `/maquette/pac-assist`, `/maquette/cvc-assist`
- `/contactnoe`, `/legal`, `/mentions`, `/privacy`, `/cgv`

`scripts/generate-routes.js` genere des dossiers SEO dans `dist` pour les routes importantes apres le build, **et genere aussi `dist/sitemap.xml`**.

### Regles SEO non negociables (MaJ 20/08/2026)

Ces trois regles sont verifiees automatiquement : le build echoue si l'une est violee. Ne pas les contourner.

1. **Toute URL interne porte la barre finale.** Les pages sont ecrites en `chemin/index.html`, donc GitHub Pages sert `/chemin/` et repond a `/chemin` par une 301. Une canonique ou un lien sans barre envoie Google dans une boucle de redirection : c'est ce qui a tenu 27 pages hors de l'index de mars a aout 2026. Utiliser `lienInterne()` / `urlPublique()` de `src/seo.js`, jamais un chemin ecrit a la main.
2. **Une seule source par meta.** `metaTitle` et `description` des articles vivent dans `src/Blog.jsx`, celles des pages SEO dans `src/PagesSeo.jsx`, celles des quizz dans `src/Quiz.jsx`. `generate-routes.js` les LIT, il ne les redefinit pas. Les redefinir les ferait diverger du DOM rendu, qui est la version que Google indexe.
3. **Chaque article a au moins 2 liens entrants**, declares dans la table `ARTICLES_LIES` de `src/Blog.jsx`.

Deux consequences pratiques :

- Le **sitemap est genere**, plus maintenu a la main. `public/sitemap.xml` a ete supprime. Une nouvelle page indexable entre au sitemap parce qu'elle appelle `declarerSitemap()`, pas parce qu'on a pense a editer un fichier.
- Le **bloc pre-rendu** (`[data-seo-prerender]`) est retire du DOM des que React est monte (`retirerPrerender()`), pour ne pas laisser un second `<h1>` et un pave de texte cache dans la page rendue.

### Visibilite dans les moteurs de reponse (GEO)

Les robots des IA generatives **n'executent pas le JavaScript**. GPTBot,
ClaudeBot et PerplexityBot telechargent parfois les fichiers .js mais ne les
lancent jamais (etude Vercel/MERJ sur des centaines de millions de requetes).
Google et Copilot font exception : ils heritent du rendu de Googlebot et Bingbot.

Consequence mesuree le 10/09/2026, avant correction : un article de 2 044 mots
avec 12 sections n'exposait que **165 mots et zero `<h2>`** dans le HTML servi.
Google voyait l'article entier, ChatGPT et Claude voyaient un resume.

Trois regles en decoulent, toutes appliquees au build :

1. Le corps COMPLET de l'article est servi dans le `<noscript>`, pas seulement
   un resume. C'est la que les robots des IA lisent.
2. **Un seul `<h1>` dans le HTML servi.** Le meme bloc etait auparavant emis a
   l'identique dans la div masquee et dans le `<noscript>`, ce qui en donnait
   deux. La div masquee ne porte plus de `<h1>`, seulement un resume.
3. `llms.txt` et `robots.txt` sont **generes**, jamais ecrits a la main. Le
   premier oriente les moteurs de reponse, le second nomme explicitement les
   robots des IA. Ne pas recreer `public/robots.txt`, il serait ecrase.

### Donnees structurees

`index.html` sert de gabarit a toutes les pages generees. Attention : tout JSON-LD ajoute dans `index.html` se retrouve **sur chaque page generee**. C'est pour ca que `generate-routes.js` retire le bloc `FAQPage` partout sauf sur la home et `/faq`, ou il est regenere depuis `FAQ_ITEMS`. Une page qui declare une FAQ invisible enfreint les regles de Google.

## Hero

Inspiré de celui d'Ikovaline (ikovaline.com) : le titre, une phrase, un bouton, puis la vidéo.

- Pastille « +20 applications déjà publiées » : masquée à la demande de Noé (octobre 2026), le code
  reste. Pour la remettre au-dessus du titre, passer `MONTRER_PASTILLE_HERO` à `true` dans `src/App.jsx`.
- Titre : « Je transforme ton idée en application qui génère des revenus » (« app » sur ordinateur pour
  tenir en deux lignes), un peu plus grand qu'avant (3,3 rem sur ordinateur). Noé a trouvé 4,15 rem
  « trop gros ». Sur téléphone, les tailles sont mesurées pour garder trois lignes jusqu'à 320 px.
- Phrase sous le titre : « Stratégie, design et développement : je m'occupe de tout, de l'idée à la mise
  en ligne. » Noé l'a préférée à l'ancienne (« Je conçois ton application mobile & web pour qu'elle
  rapporte vraiment… »).
- Bouton « J'ai une idée d'application » (refonte du 10/10/2026 : c'est le visiteur qui parle, il se
  reconnaît ; « Discuter avec Noé » n'a tenu que la journée du 10/10). Dessous, en petit, la photo de Noé et
  « C'est moi qui réponds, sur WhatsApp · gratuit », qui garde le côté humain. Plus grand sur ordinateur et
  sur une seule ligne jusqu'à 320 px. Il mène à la section contact, « Parlons de ton projet », dont le
  bouton, qui ouvre WhatsApp, dit « Discuter avec Noé » : à cet endroit, le visiteur s'attend à parler à
  quelqu'un (Noé, 10/10/2026), comme le lien du pied de page. Le bouton qui suit « Comment ça se passe ? »
  dit « J'ai une idée d'application », comme celui du haut. La barre du haut et le menu sur téléphone disent « J'ai une idée » (plus court,
  comme Ikovaline), sur l'accueil, le blog, les quiz et les pages /expertise, /creation-application-mobile
  et /faq.
- Au survol, tous les boutons de l'accueil ont le reflet de la fin du film (« Audit offert ») : un trait
  de lumière penché comme un « / », de haut à droite vers bas à gauche, qui les traverse et passe sous le
  texte (`.btn-reflet` dans `src/index.css`). Les boutons violets (« J'ai une idée d'application » en haut
  et après les étapes, « Discuter avec Noé » dans la section contact) et les boutons noirs (« J'ai une idée » en haut, le bouton du menu sur téléphone,
  « Lancer mon audit »), où le même trait blanc se voit comme un reflet gris clair (demande de Noé du
  10/10/2026 : « tous les autres boutons », « travailler en noir »). Seulement à la souris, et pas quand
  moins d'animations sont demandées.
- Espacement (demande de Noé du 10/10/2026 : plus d'air au-dessus du titre, la vidéo plus bas) : sur
  ordinateur, 88 px entre la barre du haut et le titre, puis 28 px jusqu'à la phrase, 40 px jusqu'au
  bouton et 80 px jusqu'à la vidéo (titre à 176 px du haut, vidéo à 544 px sur l'écran de Noé, 1710 ×
  951 : « la vidéo un peu plus bas », 10/10/2026). Sur téléphone : 20, 32 et 40 px. Le hero reste centré
  en hauteur quand l'écran est plus haut que son contenu. Sur un ordinateur bas (hauteur 820 px ou
  moins : portables 1366×768, 1280×720), l'air est réduit (48, 20, 32, 40 px) pour que la miniature de
  la vidéo se voie dès l'arrivée (`src/index.css`).
- Fond (`.hero-bg` dans `src/index.css`) : une lueur violette en arc de cercle. Un grand cercle blanc
  centré en haut (blanc jusqu'à 34 % du rayon, fondu jusqu'à 70 %) laisse le violet monter haut sur les
  côtés, descendre doucement vers le milieu et remonter de l'autre côté ; il entoure la vidéo. Même
  forme sur téléphone et tablette, sans la tache violette en haut à droite.

## Film du hero

Sous le bouton « J'ai une idée d'application » du hero, un film de 26 secondes en motion design
(voix off et bruitages, pas de musique). Code : `src/HeroVideo.jsx` et `src/hero-video.css`.
Fichiers : `public/assets/videos/hero-v11-1080.mp4` (ordinateur), `hero-v11-720.mp4` (mobile,
connexion lente, économiseur de données) et la miniature `hero-v10-miniature.webp` (et `-960`).
Les sources du film
(textes, voix, réglages) sont dans `content/video-hero/v11/` (la v11 recale le début sur la voix : « En 2026, »
quand la voix le dit, puis « un vrai pari. » et les dés ; base et voix dans `v10/`). Pour publier un nouveau montage,
changer le numéro dans les noms de fichiers (v12…) : le navigateur ne ressert pas l'ancien film en cache.

Le lecteur reprend celui d'Ikovaline (ikovaline.com), à la demande de Noé :

- Tant que la vidéo n'a rien montré, une miniature est posée dessus, comme chez Ikovaline (une « diapo »,
  peu d'éléments) : le fond blanc du film (celui de « En 2026, un vrai pari »), « Ton app va décoller. »
  centré en haut (« décoller. » dans le dégradé violet, comme dans le film) et une courbe qui reste à plat
  puis monte vers le haut à droite jusqu'à un point violet, avec un léger dégradé dessous. La phrase est
  plus petite que le titre du hero, pour qu'il reste le plus gros de la page. Tout tient dans les deux
  tiers du haut : sur ordinateur, on ne voit que le haut de la vidéo à l'arrivée, et en descendant on la
  lance (« mets-toi à la place de l'utilisateur », Noé) ; sur téléphone, la barre du lecteur couvre le
  dernier tiers. Choisie par Noé le 10/10/2026 (« l'image courbe 1 ») parmi trois : la courbe, des barres
  qui montent, la carte « Revenus » du film. Sa demande : « un graphique qui monte, pour faire ressentir
  ton app va décoller », sur ce fond blanc, sans les dés ni le texte. Refusés avant : une vraie image du
  film (« Ils paient chaque mois. », le téléphone et trois abonnements, sur violet puis sur blanc : « trop
  de design, trop d'éléments »), « Et si ton idée décollait ? » avec une courbe fine en flèche (« pas
  beau »), l'image « 8 apps sur 10 » (« ça donne pas envie de regarder »), une couverture avec sa photo
  et « Regarde la vidéo » (« pas ma tête »), le titre du hero répété. Source :
  `content/video-hero/v10/src/miniature.cjs`.
- Le film se charge en fond 0,7 s après l'affichage, mais ne démarre que quand on fait défiler la page
  jusqu'à lui (demande de Noé, octobre 2026) : au moins 24 px de défilement et la moitié de la vidéo à
  l'écran. Il joue alors seul, muet et en boucle, depuis le début. Pourquoi : au chargement, on lit le
  titre ; s'il partait tout de suite, on raterait son début.
- Une barre reste toujours visible en bas de la vidéo : lecture/pause, avancement (clic ou glisser),
  « Activer le son », plein écran. Un clic sur la vidéo la met en pause ou la relance. Clavier : espace,
  M, F, flèches. À la fin, elle reprend au début (boucle), comme chez Ikovaline.
- En plus d'Ikovaline : le premier geste pour la regarder (lecture, « Activer le son », clic sur la
  vidéo, plein écran) la lance avec le son, depuis le début, pour entendre le film en entier. Ensuite,
  le bouton coupe et remet le son sans revenir en arrière.
- Une fois partie, elle se met en pause sous 15 % à l'écran, même avec le son, et reprend là où elle
  était quand elle revient. Si elle est sortie entièrement de l'écran, la miniature revient, et au retour
  le film repart du début, sans le son, quand on en voit la moitié (demande de Noé du 10/10/2026 : « si
  je reviens, ça revient au début »). Sans le son, on n'a pas une voix qui surgit en remontant la page ;
  « Activer le son » le relance avec le son, depuis le début. Dans un onglet masqué : en pause si elle est
  muette, elle continue avec le son.
- Plein écran : le bloc entier sur ordinateur, Android et iPad (la barre s'efface quand la souris ne
  bouge plus) ; le lecteur natif sur iPhone.
- Lecture automatique refusée (iPhone en mode économie d'énergie, Safari ou Firefox réglés pour bloquer,
  navigateur intégré d'une application) ou non souhaitée (`prefers-reduced-motion`, économiseur de
  données, rien n'est chargé d'avance) : l'affiche reste, avec un gros bouton « Lancer la vidéo », qui la
  lance avec le son.

## L'accueil, section par section (refonte du 10/10/2026)

Question de Noé : « il a vu la vidéo ; s'il fait défiler, on lui montre quoi ? » La page d'avant répétait la
vidéo (« Une stratégie derrière chaque écran », « Mon métier : transformer tes utilisateurs en clients »,
« Tu amènes les gens, je les transforme en clients »), montrait trois fois la maquette, le cahier des
charges et le devis, posait « Pourquoi me faire confiance ? » sur un simple tableau contre les agences,
et envoyait vers Instagram juste avant la fin. Principe retenu : après la vidéo, le visiteur cherche des
preuves, pas des promesses. Chaque section répond à une seule de ses questions, dans l'ordre où il se les
pose (c'est vrai ? qu'est-ce que je risque ? c'est qui ? c'est pour moi ?), puis vient le bouton. Onze
sections deviennent sept. Le texte des sections est écrit dans le JSX de `App` (pas dans des tableaux) :
c'est ce que lit le pré-rendu pour les robots (`scripts/generate-routes.js`).

**90 % des visiteurs arrivent sur téléphone, depuis les pubs Instagram et Facebook** (Noé, 11/10/2026) :
chaque texte se juge d'abord sur un écran de téléphone, en phrases courtes. Une réponse de FAQ tient en
deux ou trois phrases qui expliquent : trop long, on ne lit pas (« c'est trop long ») ; trop court, on
n'explique rien (« c'est très court, on explique pas »), Noé, 11/10/2026.

1. **Hero et vidéo** (voir plus haut).
2. **« Ce que j'ai déjà construit »** (`#calories-proof`, lien « Preuves » de la barre du haut) : « Des
   applications publiées, utilisées, et qui rapportent. », puis quatre chiffres fournis par Noé, en 2 × 2 :
   13 000 € par mois pour Calorie (sur un marché déjà saturé), +300 000 utilisateurs pour Hush App (avec
   sa première version), +900 000 téléchargements (toutes ses applications), +20 applications publiées. À
   côté, le carrousel des écrans, chacun avec une légende qui dit à quoi il sert : la stratégie se voit au
   lieu d'être annoncée. Remplace la barre de preuve, « Une stratégie derrière chaque écran » (ses cinq
   pastilles) et « Mon métier ». Styles : `src/app-showcase.css`.
3. **« Comment ça se passe ? »** (`#offre`, lien « Méthode ») : « Les deux premières étapes sont
   offertes. » Étape 1 « On en parle » et étape 2 « On cadre » portent la pastille verte « Offert ». Les
   textes des étapes sont ceux validés par Noé le 10/10/2026. Les visuels (refaits le 11/10/2026) : à
   l'étape 1, la conversation (« Bonjour Noé, j'ai un projet d'application », le début du message
   WhatsApp pré-rempli, et « Raconte-moi ton idée »), que Noé aimait ; à l'étape 2, les trois documents
   en grandes illustrations avec leur nom (maquette, cahier des charges, devis) ; à l'étape 3,
   l'application en ligne (téléphone, courbe qui monte, flèche qui décolle). Illustrations :
   `src/DeliverableVisual.jsx` (types `mockup`, `brief`, `quote`, `launch`). Refusés par Noé : une vraie
   capture d'écran mélangée aux dessins (« design mélangé ») et des cartes de petites lignes de texte
   (« pas lisible du tout », « ça va jamais convertir »). Sous les étapes, une ligne d'information pour
   tout le parcours (`.etape-tarif`) : « Tarif fixe, en général une dizaine de milliers d'euros : stratégie,
   maquette, développement et mise en ligne. Première version en 30 jours en moyenne. » (Noé, 11/10/2026 : « une dizaine de milliers d'euros » plutôt que
   « 5 000 à 12 000 € », et 30 jours plutôt que 45). Pas de « tu paies ici » : on ne paie pas à la mise en
   ligne, il y a un acompte au démarrage. Absorbe « Avant de payer un euro, je t'offre ». Puis le bouton.
   Styles : `.etape…` dans `src/App.css`.
4. **« Pourquoi me faire confiance ? »** (`#confiance`, sous « Qui je suis » ; la route /avis y mène) : la
   photo de Noé, « Expert en applications mobiles & web », puis trois faits (il fait tout lui-même ; une
   dizaine d'idées par semaine ; ses propres applications, WakeUp Alarme et Plouff Habitudes, sont en
   ligne). À côté, la comparaison avec une agence en cinq lignes (`COMPARAISON_AGENCE` dans
   `src/App.jsx`). Les avis clients iront dans `AVIS_CLIENTS` : vide tant que Noé n'en a pas (rien n'est
   affiché), n'y mettre que des avis réels, avec l'accord de la personne.
5. **« C'est pour toi ? »** (`#pour-qui`) : « Oui, si… » (une idée et un budget prévu, une seule personne
   pour tout, une application qui rapporte) et « Non, si… » (site vitrine, juste un développeur qui exécute,
   le prix le plus bas, quelqu'un pour faire sa publicité). Écarte avant WhatsApp ceux que Noé ne prend
   pas. Remplace « Ce que je fais / Ce que je ne fais pas ». « Une application qui te rapporte des revenus
   chaque mois » (Noé, 11/10/2026, à la place de « qui rapporte, pas juste une application qui existe »).
6. **FAQ « Pour y voir plus clair »** (`#faq`) : les 4 premières questions de `FAQ_ITEMS`
   (`src/PagesSeo.jsx`), les vraies objections, en deux ou trois phrases chacune :
   - combien : un tarif fixe, « en général une dizaine de milliers d'euros, comprenant la stratégie, la
     maquette sur mesure, le développement et la mise en ligne » ;
   - en combien de temps : une première version en 30 jours en moyenne ; pour une application complète,
     « le délai est fixé dans le devis, selon les fonctionnalités prévues au cahier des charges » (Noé
     refuse « on cale le délai ensemble », pas assez pro) ;
   - « je n'y connais rien » : « c'est le cas de la plupart de mes clients », « je suis là pour
     t'aiguiller et te conseiller », « une idée suffit pour commencer ensemble » ;
   - pour trouver des utilisateurs : Noé ne fait pas la publicité, son travail est que les utilisateurs
     qui arrivent deviennent des clients qui paient chaque mois, mais il conseille sur la façon la plus
     pertinente de faire connaître l'application.

   Retirées le 11/10/2026 par Noé : « Application mobile ou web : laquelle choisir ? », « À qui appartient
   l'application ? » (« c'est logique, il paye ») et « Est-ce que mon application va vraiment générer des
   revenus ? ». `NB_FAQ_ACCUEIL` vaut 4 dans `src/App.jsx` et dans `scripts/generate-routes.js` (balisage
   FAQPage de l'accueil) : changer les deux ensemble. /faq garde la liste complète (10 questions). La FAQ
   reste avant « Parlons de ton projet » (choix du 11/10/2026, Noé hésitait) : elle lève les dernières
   objections juste avant le bouton ; après, la page finirait sur des questions au lieu du bouton. Sous les
   questions, « Une autre question ? Écris-moi sur WhatsApp. » ouvre directement WhatsApp avec le suivi
   `home_faq`.
7. **« Parlons de ton projet »** (`#contact-section`, route /rendez-vous) : la pastille des disponibilités,
   le bouton WhatsApp « Discuter avec Noé » (suivi `home_contact`), « Tu bosses direct avec moi », puis l'audit en second choix
   dans une carte blanche (`#audit`, lien « Audit », route /audit) : « Pas encore prêt à écrire ? Teste ton
   idée : potentiel, budget et délai, en 2 minutes, sans appel. », bouton noir « Lancer mon audit ».

Retirés le 10/10/2026 : la barre de preuve, « Mon métier », « Avant de payer un euro, je t'offre », le
grand tableau Agences, la section Instagram (elle faisait quitter la page juste avant la fin ; l'icône
reste dans le pied de page) et l'ancienne section audit. Les illustrations `meetingdev.svg`,
`devmobile.svg` et `post.svg` ne servent plus à l'accueil.

Fonds, de haut en bas : le hero violet, blanc, gris clair, blanc, gris clair, blanc, gris clair, puis le
pied de page violet.

### Le carrousel des écrans

Sept captures fournies par Noé, converties en WebP de 660 px sous
`public/assets/images/apps/captures/` (environ 375 Ko au total). Les captures contiennent déjà l'encoche
et la barre d'état : le cadre CSS ajoute seulement la coque et les boutons. La liste `SCREENS`
(`src/AppShowcase.jsx`) définit l'ordre, le type (maquette ou application, affiché à côté du nom : une
maquette n'est jamais présentée comme une application publiée) et la légende de chaque écran, qui dit à
quoi il sert (rédigées le 10/10/2026, à faire relire par Noé). Sonora est une application (plus une
maquette) depuis le 10/10/2026. La légende change avec l'écran du milieu.

Trois téléphones visibles, défilement toutes les 5,5 secondes (3,5 avant les légendes : le temps de les
lire), glissement, flèches et clavier. La première capture reste affichée jusqu'à ce qu'au moins la
moitié de la galerie entre dans l'écran ; le défilement démarre alors et se suspend dès que la galerie
repasse sous ce seuil. Un clic sur une flèche ou un glissement suspend le défilement 30 secondes avant
reprise automatique. Aucun bouton pause n'est affiché. L'animation se suspend tant que le focus clavier
est dans le carrousel, hors écran, pendant un glissement et dans un onglet masqué. `prefers-reduced-motion`
désactive l'automatisme et les transitions.
Références de conception : [Embla, exemples](https://www.embla-carousel.com/docs/v8/examples/predefined),
[Swiper, coverflow](https://swiperjs.com/demos), [W3C, carrousels accessibles](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/).

## Maquettes

Les maquettes HTML faites a la main vivent dans la landing page avec des routes `/maquette/...`.

Ne pas confondre avec Nowork :

- `/maquette/smoothride`, `/maquette/aretha`, `/maquette/cvc-assist` = pages landing page.
- `/maquette/kingfit-coach` = page de maquettes pour l'application coach/salle de sport.
- `/maquette-visuel/{clientSlug}/{quoteId}` = galerie publique generee par Nowork.

Pour les URLs collees dans un devis, preferer des slugs minuscules et stables :

- `https://noecalmes.fr/maquette/smoothride/`
- `https://noecalmes.fr/maquette/aretha/`
- `https://noecalmes.fr/maquette/kingfit-coach/`
- `https://noecalmes.fr/maquette/cvc-assist/`

### Reference de structure pour nouvelles maquettes

Quand une nouvelle maquette client doit etre creee, prendre Aretha comme reference de structure, pas comme contenu a copier.

- Reference publique : `https://noecalmes.fr/maquette/aretha/`
- Fichiers locaux : `src/ArethaMockups.jsx` et `src/aretha-mockups.css`
- Attendu : page autonome, hero sobre, galerie de cartes, frames mobile propres, titre et sous-titre pour chaque ecran, finition visuelle coherente.
- Adapter a chaque projet : parcours, ecrans, style, couleurs, illustrations, textes et niveau de detail doivent rester propres au client.
- Si le client demande un lien dans le devis, coller l'URL `/maquette/{slug}` generee dans ce dossier, pas une galerie `/maquette-visuel/...` sauf si les images viennent de Nowork.

## Contact WhatsApp

Calendly a ete retire de la landing le 22/06/2026 (embed, script et preconnexions supprimes). Le contact passe desormais par **WhatsApp** : constante `WHATSAPP_URL` (numero + message pre-rempli) dans `src/App.jsx`.

Tous les CTA de contact de la home et des pages de contenu renvoient d'abord vers `/rendez-vous`, qui affiche la section `#calendly-section`. Seuls deux acces ouvrent WhatsApp directement :

- le bouton principal dans la section `/rendez-vous` ;
- le bouton flottant WhatsApp.

### Les messages pre-remplis (MaJ 04/08/2026)

**Regle absolue : le message pre-rempli ne demande RIEN au prospect.** Il doit
pouvoir partir en un seul tap. Les anciennes versions finissaient par « ton idee
en 2 mots : » — c'etait un devoir a faire au moment ou la personne est la plus
motivee, et ca faisait fuir ceux qui craignent de devoiler leur idee a un
inconnu. La qualification se fait dans la **premiere reponse de Noe**, jamais
dans le message pre-rempli.

Tous commencent par **`Bonjour Noé`** (et non plus `Salut`).

Chaque point d'entree a sa propre formulation, pour que Noe sache d'ou vient le
contact sans rien demander :

| Point d'entree | Fichier | Message |
|---|---|---|
| Section contact + bouton flottant | `src/App.jsx` (`WHATSAPP_PREFILL`) | Bonjour Noé, j'ai un projet d'application, on peut en parler ? |
| Page `/contactnoe` | `src/ContactNoe.jsx` (`WHATSAPP_URL`) | Bonjour Noé, j'ai un projet d'application, on peut en parler ? |
| Chatbot | `src/chatbot/Widget.jsx` (`DEFAULT_WHATSAPP_URL`) | Bonjour Noé, j'ai une question sur mon projet d'application. |
| Haut de `/audit-app` | `src/audit-app/AuditAppHero.jsx` (`DIRECT_WHATSAPP_URL`) | Bonjour Noé, j'ai un projet d'application et j'aimerais ton avis. |
| Fin d'audit | `src/audit-app/AuditAppVerdict.jsx` (`buildWhatsAppUrl`) | Bonjour Noé, moi c'est {prenom}. Je viens de faire ton audit… |
| Retour formulaire Meta (`/whatsapp`, `/wa`) | `src/App.jsx` (route) | Bonjour Noé, je viens de remplir ton formulaire pour mon projet d'application. |

Le tutoiement reste la regle **dans la conversation** (cf. `nowork` /
`whatsapp-conversations.md`), il n'y a que la salutation qui passe en « Bonjour ».

> Si un prospect refuse de decrire son idee (« c'est secret »), **ne pas sortir
> le NDA en reponse** : ca formalise sa peur et alourdit l'echange. Repondre
> qu'on n'a pas besoin de l'idee, poser une question factuelle (activite
> existante ? delai ?) et proposer l'appel. Le NDA s'annonce au moment de
> proposer l'appel, comme rassurance, jamais comme condition.

Pour les CTA prix/budget, `/audit-app` reste le chemin des pages de contenu. Exception dans la section comparaison de l'accueil : le lien secondaire `Combien coûterait mon app ?` mene a `/rendez-vous` (section WhatsApp) depuis le 02/10/2026, a la demande de Noe ; il pointait vers `/audit-app` avant.

Le code Calendly a ete entierement retire du repo (07/2026) : plus de `CALENDLY_URL`, plus de no-op `loadCalendlyScript`, la section contact s'appelle `#contact-section` (ancien id `#calendly-section`). La route `/merci` (page post-RDV Calendly) et `src/Merci.jsx` ont ete supprimes ; `/merci` reste prerendu en noindex pour les vieilles URLs indexees. Detail du retrait : `documentation/archive/funnels/funnel-calendly-2026-06.md` et l'historique git.

## Tracking Meta

Le Pixel Meta est initialise dans `index.html`. Les evenements frontend sont centralises dans `src/metaTracking.js` et dedupliques par session :

- `Lead` (`Prospect` dans Meta) : premier clic WhatsApp direct de la session, ou clic WhatsApp apres un audit dont le budget est d'au moins 5 000 EUR. Un clic post-audit avec un budget inferieur ne declenche jamais cet evenement positif.
- `DirectWhatsAppLead` : clic WhatsApp sans qualification budget prealable (landing, bouton flottant ou sortie avant l'audit). Il reste compte comme `Lead`, car l'intention de contact est forte, mais porte le statut `unknown`.
- `AuditStart` : demarrage du formulaire `/audit-app`.
- `AuditComplete` : affichage du verdict, avec `budget_tier`.
- `QualifiedAuditComplete` : verdict affiche avec un budget d'au moins 5 000 EUR.
- `LowBudgetAudit` : verdict affiche avec un budget inferieur a 5 000 EUR.
- `WhatsAppClick` : tout clic WhatsApp apres verdict, quelle que soit la qualification.
- `QualifiedAuditLead` : clic WhatsApp apres verdict avec un budget d'au moins 5 000 EUR, en plus du `Lead` commun.
- `LowBudgetLead` : evenement historique conserve dans le code de tracking ; les nouveaux verdicts inferieurs a 5 000 EUR ne proposent plus de CTA WhatsApp commercial.

Le Pixel voit l'ouverture de WhatsApp, pas l'envoi reel du message. Suivre automatiquement les messages recus demanderait WhatsApp Business Platform avec webhook et Conversions API. L'application WhatsApp Business seule reste utile pour les reponses rapides et les libelles, mais ne remonte pas l'envoi au Pixel.

## Chatbot

Le widget public est dans `src/chatbot/Widget.jsx`.

Le backend chatbot n'est pas dans ce repo : il appelle la Cloud Function du projet `devis-app-8e216`, configuree par `VITE_CHATBOT_API_URL`.

## Redirect GitHub Pages

`public/404.html` gere les chemins directs non resolus par GitHub Pages.

Cas sensible :

- `/nowork/...` doit renvoyer vers l'application admin.
- `/app-devis/...` doit rester redirige vers `/nowork/...` pour compatibilite avec les anciens liens.
- `/maquette-visuel/...` appartient a Nowork mais reste affiche sans `/nowork` via une facade landing page.
- `/espace-client/...` est une route publique landing page, sans afficher `/nowork`.
