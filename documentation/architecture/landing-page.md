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
- `/projets` — page de confiance principalement consultée sur téléphone après un premier appel (`src/Projets.jsx`, styles `src/projets.css`) : deux captures fixes (SmoothRide et WakeUp), cadres propres inclinés sur un halo violet, résultats contextualisés, avis clients, prise en charge et suivi, puis cadre du devis. Les chiffres ne sont pas répétés dans une barre séparée. Plouff Habitudes est présenté en 30 jours du design au lancement (Noé, 19/10/2026) ; ce cas précis ne modifie pas le délai moyen du site. Pas de prix d'appel sur cette page : le montant dépend du projet, le devis et le cahier des charges précisent livrables, calendrier et prix avant engagement. Pas de nouvelle promesse de maquette ici. La méthode détaille les décisions produit, la réalisation et la poursuite de la collaboration après les 30 jours de corrections incluses (`strategie-commerciale.md`). Le contact final reste discret (écrire ou rappeler), le prospect ayant déjà le numéro de Noé. Les avis restent partagés avec l'accueil (`src/AvisClients.jsx`).
- `/audit-app` — audit gratuit d'idee d'application
- `/rendez-vous` — section contact WhatsApp de la home (`#contact`)
- `/rdv/` — page publique autonome des invitations de rendez-vous Nowork (`public/rdv/index.html`). Le jeton est dans le fragment `#` de l'URL courte partagée ; la page lit la fonction Firebase `meetingInvite`, puis propose le lien Meet, Google Agenda et un fichier `.ics`. Elle est exclue de l'indexation et ne doit pas être confondue avec `/rendez-vous`.
- `/avis` — les avis clients de la home, sous le bouton du contact (`#avis-clients`)
- **Ancres de l'accueil** (11/10/2026) : chaque id est le libellé de sa section, en minuscules et sans accents : `#realisations`, `#etapes-et-tarif`, `#pour-qui`, `#contact`, `#avis-clients`, `#faq`, `#audit`, `#instagram`. Lisibles dans l'adresse, et dans les liens « Aller à » que Google affiche parfois sous un résultat. Les anciens noms (`#calories-proof`, `#offre`, `#confiance`, `#contact-section`, et `#avis`, qui était l'id de la section Instagram et mène maintenant aux avis comme la route /avis), déjà partagés, mènent toujours au bon endroit : `ANCIENNES_ANCRES` dans `src/App.jsx`, lu par l'effet « ancre à l'arrivée », qui fait aussi défiler jusqu'à la section quand on arrive par une adresse en « # » (le navigateur ne le fait pas seul, la page étant construite après son arrivée). Une nouvelle section prend un id de ce genre ; si un id change, l'ancien va dans `ANCIENNES_ANCRES`.
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

La page `/projets/` et son message WhatsApp utilisent un ton neutre (sans tutoiement ni vouvoiement). Le bloc « Budget & collaboration » est distingué par un fond violet clair et des icônes euro, devis et poignée de main. Il évoque une collaboration dans la durée : « Une réduction est proposée sur les devis suivants » (Noé, 19/10/2026), sans pourcentage affiché. Les deux icônes sont centrées verticalement sur la ligne de leur titre, indépendamment du paragraphe. Son image de partage dédiée, `projets-og.jpg`, est aussi servie pour l'alias `/projet/` et les ancres. Elle reprend le style abstrait des aperçus espace client et maquettes ; les autres routes conservent leur image habituelle. Les métadonnées de cette image sont déclarées dans `src/Projets.jsx`, lues au build, puis rétablies en navigation par `src/seo.js`.

`scripts/generate-routes.js` genere des dossiers SEO dans `dist` pour les routes importantes apres le build, **et genere aussi `dist/sitemap.xml`**.

### Regles SEO non negociables (MaJ 20/08/2026)

Ces trois regles sont verifiees automatiquement : le build echoue si l'une est violee. Ne pas les contourner.

1. **Toute URL interne porte la barre finale.** Les pages sont ecrites en `chemin/index.html`, donc GitHub Pages sert `/chemin/` et repond a `/chemin` par une 301. Une canonique ou un lien sans barre envoie Google dans une boucle de redirection : c'est ce qui a tenu 27 pages hors de l'index de mars a aout 2026. Utiliser `lienInterne()` / `urlPublique()` de `src/seo.js`, jamais un chemin ecrit a la main.
2. **Une seule source par meta.** `metaTitle` et `description` des articles vivent dans `src/Blog.jsx`, celles des pages SEO dans `src/PagesSeo.jsx`, celles des quizz dans `src/Quiz.jsx`. `generate-routes.js` les LIT, il ne les redefinit pas. Les redefinir les ferait diverger du DOM rendu, qui est la version que Google indexe.
3. **Chaque article a au moins 2 liens entrants**, declares dans la table `ARTICLES_LIES` de `src/Blog.jsx`.

Deux consequences pratiques :

- Le **sitemap est genere**, plus maintenu a la main. `public/sitemap.xml` a ete supprime. Une nouvelle page indexable entre au sitemap parce qu'elle appelle `declarerSitemap()`, pas parce qu'on a pense a editer un fichier.
- Le **bloc pre-rendu** (`[data-seo-prerender]`) est retire du DOM des que React est monte (`retirerPrerender()`), pour ne pas laisser un second `<h1>` et un pave de texte cache dans la page rendue.
- Les **entites du JSX** (`&nbsp;`, `&apos;`, `&amp;`...) sont decodees avant d'ecrire le texte des robots (`decoderEntites` dans `scripts/generate-routes.js`, 11/10/2026). Avant, elles etaient echappees une seconde fois et les robots lisaient « d'euros&nbsp;: » en toutes lettres, douze fois sur l'accueil. Un paragraphe de moins de cinq mots n'entre pas dans ce texte (« Je connais ce milieu », par exemple) : c'est voulu, la phrase suivante porte le sens.

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
  reconnaît ; « Discuter avec Noé » n'a tenu que la journée du 10/10). Pas de ligne dessous : « C'est moi
  qui réponds, sur WhatsApp · gratuit », essayée le 10/10, répétait la barre du haut (photo de Noé) et
  « gratuit » était de trop (Noé, 11/10/2026). Plus grand sur ordinateur et
  sur une seule ligne jusqu'à 320 px. Il mène à la section contact, « Parlons de ton projet », dont le
  bouton, qui ouvre WhatsApp, dit « Discuter avec Noé » : à cet endroit, le visiteur s'attend à parler à
  quelqu'un (Noé, 10/10/2026), comme le lien du pied de page. Le bouton qui suit « Comment ça se passe ? »
  dit aussi « Discuter avec Noé » (11/10/2026 : la suite de l'étape « On en parle »). La barre du haut et le menu sur téléphone disent « J'ai une idée » (plus court,
  comme Ikovaline), sur l'accueil, le blog, les quiz et les pages /expertise, /creation-application-mobile
  et /faq. Liens de la barre (`NAV_LINKS`, 11/10/2026) : « Réalisations », « Étapes et tarif », « Avis clients »
  (« Qui je suis » le matin du 11/10 ; avant : « Preuves », « Méthode », « Audit »), dans l'ordre de la page, les petits titres des sections où ils
  mènent, mot pour mot. « Et tarif » : le prix est la première question de la cible, on doit voir d'un coup
  d'œil où le trouver. Ces liens mènent dans la page : ils ne jouent pas sur le référencement (les liens
  vers les pages SEO sont dans le pied de page et le pré-rendu).
  Plus d'audit dans la barre : « c'est un plus », Noé ne veut pas le pousser ; il reste en bas de page, dans
  le pied de page et sur la route /audit. Les trois tiennent dès 1024 px.
- Le fond de la barre est blanc à 92 % (`#fffefceb`) depuis le 11/10/2026, sur toutes les pages : à 24 %, le
  texte des sections passait au travers en défilant (Noé : « la navbar transparente, pas ouf »).
- Au survol, tous les boutons de l'accueil ont le reflet de la fin du film (« Audit offert ») : un trait
  de lumière penché comme un « / », de haut à droite vers bas à gauche, qui les traverse et passe sous le
  texte (`.btn-reflet` dans `src/index.css`). Les boutons violets (« J'ai une idée d'application » en haut,
  « Discuter avec Noé » après les étapes et dans la section contact, « Voir mon Instagram » tout en bas) et les boutons noirs (« J'ai une idée » en haut, le bouton du menu sur
  téléphone), où le même trait blanc se voit comme un reflet gris clair (demande de Noé du
  10/10/2026 : « tous les autres boutons », « travailler en noir »). Seulement à la souris, et pas quand
  moins d'animations sont demandées.
- Espacement (demandes de Noé du 10 et du 11/10/2026 : plus d'air au-dessus du titre, la vidéo plus bas) :
  sur ordinateur (1024 px et plus), 112 px entre la barre du haut et le titre (titre à 200 px du haut,
  `lg:pt-50` ; 176 px avant le 11/10), puis 28 px jusqu'à la phrase, 40 px jusqu'au bouton et 80 px jusqu'à
  la vidéo (« la vidéo un peu plus bas », 10/10/2026). Sur téléphone : 20, 32 et 40 px. Le hero reste centré
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
  peu d'éléments) : le fond blanc du film (celui de « En 2026, un vrai pari »), « Ton application va
  décoller. » (« Ton app va décoller. » jusqu'au 11/10/2026, Noé : « mets plutôt ton application ») centré en haut (« décoller. » dans le dégradé violet, comme dans le film) et une courbe qui reste à plat
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
  l'écran. Il joue alors seul et en boucle, depuis le début. Pourquoi : au chargement, on lit le
  titre ; s'il partait tout de suite, on raterait son début.
- **Ce premier départ essaie le son** (Noé, 11/10/2026 : « Ikovaline met le son direct ; force le son, et si
  ça ne marche pas, affiche le son comme maintenant »). C'est le navigateur qui décide, pas le site : il
  accepte quand la personne a déjà touché la page, ou sur un ordinateur où elle a souvent écouté des vidéos
  du site (c'est pour ça qu'Ikovaline parle chez Noé) ; il refuse toujours sur iPhone et dans le navigateur
  d'Instagram ou de Facebook, sans un geste. Donc la plupart des visiteurs des pubs voient encore la vidéo
  partir muette, avec « Activer le son ». Refusé même muet : le gros bouton « Lancer la vidéo ». Code :
  `demarrer` dans `src/HeroVideo.jsx`.
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

**Un petit titre au-dessus de chaque section** (violet, en capitales, 11/10/2026) : « Réalisations »,
« Étapes et tarif », « Avis clients » (« Qui je suis » jusqu'au 11/10/2026), « Pour qui », « Questions fréquentes », « Instagram ». Noé trouvait bizarre qu'une section n'en ait
pas ; les liens de la barre du haut reprennent les trois premiers. « Parlons de ton projet » a la pastille des
places à la place.

**Sur ordinateur, de l'air** (« c'est serré », Noé, 11/10/2026) : 112 px en haut et en bas de chaque
section (`md:py-28`), 104 px pour « Ce que j'ai déjà construit », 32 px entre les cartes.

**90 % des visiteurs arrivent sur téléphone, depuis les pubs Instagram et Facebook** (Noé, 11/10/2026) :
chaque texte se juge d'abord sur un écran de téléphone, en phrases courtes. Une réponse de FAQ tient en
deux ou trois phrases qui expliquent : trop long, on ne lit pas (« c'est trop long ») ; trop court, on
n'explique rien (« c'est très court, on explique pas »), Noé, 11/10/2026.

**Une chose n'est dite qu'une fois sur la page** (Noé, 11/10/2026 : « relis tout, si c'est un doublon, si c'est
répétitif, pas le mettre »). La barre du haut et la vidéo comptent : la barre affiche en permanence « Noé Calmes,
Expert en applications mobiles & web », et la vidéo, lancée sans le son, écrit à l'écran ce que dit la voix (« une
dizaine d'idées par semaine », « ils reviennent chaque jour, ils paient chaque mois »). Avant d'ajouter une phrase,
chercher si la page la dit déjà, même avec d'autres mots. Deux exceptions admises : la FAQ, repliée, qui peut
reprendre le prix et le délai pour ceux qui y vont directement. (La comparaison avec une agence, qui redisait le
tarif et le délai, n'existe plus en tableau : le chiffre d'une agence est sous le tarif et le délai des étapes.)

1. **Hero et vidéo** (voir plus haut).
2. **« Ce que j'ai déjà construit »** (`#realisations`, lien « Réalisations » de la barre du haut) : « Des
   applications publiées, utilisées, et qui rapportent. », puis quatre chiffres fournis par Noé, en 2 × 2 :
   +13 000 € par mois pour Calorie (sur un marché déjà saturé ; le « + » demandé par Noé le 11/10/2026), +300 000 utilisateurs pour Hush App (avec
   sa première version), +900 000 téléchargements (toutes ses applications), +20 applications publiées. À
   côté, le carrousel des écrans, chacun avec une légende qui dit à quoi il sert : la stratégie se voit au
   lieu d'être annoncée. Remplace la barre de preuve, « Une stratégie derrière chaque écran » (ses cinq
   pastilles) et « Mon métier ». Styles : `src/app-showcase.css`.
3. **« Comment ça se passe ? »** (`#etapes-et-tarif`, sous « Étapes et tarif », lien du même nom dans la barre) : trois cartes, étapes 1 « On en parle » et
   2 « On cadre » avec la pastille verte « Offert », étape 3 « Je construis » (« On construit ensemble »
   jusqu'au 11/10/2026 : « c'est un peu faux, l'objectif c'est que je m'occupe de tout », Noé). Son texte
   commence par « À partir de ta maquette, je crée le design final… » (« Je reprends la maquette sur mesure »
   ne voulait rien dire pour Noé, 11/10/2026) et finit par « Je reste disponible après la mise en ligne. » (Noé,
   11/10/2026, à la place de « Ensuite, je t'accompagne pour la faire évoluer »). Pas de phrase
   au-dessus qui redise « offert » (retirée le 11/10/2026, Noé : « est-ce qu'on le met deux fois ? »). Les
   textes des étapes sont ceux validés par Noé le 10/10/2026, sans le « offert » de l'étape 2 (« je t'envoie un
   cahier des charges, une première maquette et un devis clair ») : la pastille le dit déjà (11/10/2026). Les illustrations sont celles que Noé avait
   choisies (`meetingdev.svg`, `devmobile.svg`, `post.svg` dans `public/assets/images/illustrations/`) : il
   les a redemandées le 11/10/2026 (« plus design, plus compréhensible ») après deux essais refusés, une
   conversation avec de vraies maquettes et des dessins mélangés, puis des cartes de petites lignes de texte
   (« pas lisible du tout »). Sur téléphone, l'illustration (128 × 118 px, 100 × 92 sous 350 px) se met à
   droite du début du texte au lieu de prendre toute la largeur au-dessus (`.process-…` dans `src/App.css`).
   Au survol sur ordinateur, la carte passe en violet. Sous les étapes, le tarif et le délai
   (`.etape-tarif`), deux repères avec chacun son icône dans un carré violet pâle (Noé, 11/10/2026 : en une seule
   ligne de texte, « c'était fade ») : « À partir de 5 000 € », puis « Le prix dépend de ton application. Tu le
   connais avant de commencer, sans surprise : stratégie, design, développement et mise en ligne compris » ;
   « 45 jours en moyenne », puis « Pour une application mobile ou web (SaaS) ». « Le prix dépend de ton
   application » remplace « Tarif fixe » : à côté de « à partir de 5 000 € », « tarif fixe » se lisait « toutes
   les applications à 5 000 € » pour une cible qui n'y connaît rien (Noé, 11/10/2026). Pour dire que le prix ne
   grimpe pas en route, « Tu le connais avant de commencer, sans surprise » (question de Noé le même soir :
   « pas de compteur qui tourne », « prix fixe » ?) : « prix fixe » refait le piège du « tarif fixe », et
   « compteur qui tourne » parle à qui a déjà payé une agence au temps passé, pas à la cible (la FAQ le garde,
   pour qui va plus loin). « Compris » en fin de liste : sans lui, la liste se lisait comme ce qui est « fixé »,
   pas comme ce que le prix contient. « Design » et pas « maquette » : la maquette est
   offerte avant de payer, elle n'est pas dans le prix. « (SaaS) » derrière « web » : la seule occurrence de la
   page, jamais seule (`documentation/context/vocabulaire-mobile-web.md`, règle 6 bis).
   **Le prix dit « à partir de 5 000 € », comme la pub et le formulaire Meta** (Noé, 11/10/2026
   au soir ; avant : « en général une dizaine de milliers d'euros », ici et dans la FAQ). Depuis le formulaire du
   11 octobre, les leads arrivent sur cette page par le bouton « Voir la vidéo » de l'écran de fin, juste avant le
   premier message de Noé : un autre chiffre que celui de la pub se lit comme un prix qui monte, et un lead déjà
   gagné ne répond plus. L'ordre de grandeur réel (8 000 à 12 000 € pour un projet complet) se donne à l'appel ;
   le tri des petits budgets est fait par la question budget du formulaire. Les articles du blog gardent leurs
   fourchettes par périmètre : c'est du contenu pour qui cherche un prix, pas la page des leads.
   Côte à côte sur ordinateur, l'un sous l'autre sur téléphone. **45 jours partout, jamais « première version »**
   (Noé, 11/10/2026 ; la page avait dit 30 jours du 10 au 11/10). « SaaS » seul, que Noé proposait, a été écarté :
   il ne s'écrit jamais seul (`documentation/context/vocabulaire-mobile-web.md`, règle 6 bis) ; depuis le 11/10/2026
   au soir il suit « web », entre parenthèses.
   Sous chacun, en gris, le chiffre d'une agence : « En agence : à partir de 20 000 € » (15 000 jusqu'au 11/10/2026, Noé : « 20 000 partout ») et « En agence : 3 à 6
   mois » (11/10/2026, à la place du tableau « Une agence / Avec moi » : le contraste se lit au moment où on lit le
   prix). Le tarif et le délai sont aussi dans la FAQ, mais la FAQ est repliée : ceux-ci se voient, et trient les
   budgets avant WhatsApp (question de Noé du 11/10/2026, gardés pour ça). Sur ordinateur, 40 px au-dessus du bouton
   « Discuter avec Noé » et 80 px sous lui (au lieu de 48 et 112) : il flottait au milieu de 224 px vides avant
   « Avis clients » (Noé, 11/10/2026). Pas de « tu paies ici » : on ne paie pas à la mise en ligne, il y a un
   acompte au démarrage. Puis le bouton « Discuter avec Noé » (11/10/2026, la suite de « On en parle » ; il
   mène à « Parlons de ton projet », comme celui du haut). Absorbe « Avant de payer un euro, je t'offre ».
4. **« On est faits pour travailler ensemble ? »** (`#pour-qui`, sous « Pour qui » ; « C'est pour toi ? »
   jusqu'au 11/10/2026, trop simple pour Noé) : deux « oui » et deux « non » qui se répondent, le budget et le rôle.
   « Oui, si… » : une idée d'application et un budget prévu pour la lancer ; un résultat, sans avoir à t'occuper
   de la technique. « Non, si… » : juste un développeur qui exécute tes consignes ; le prix le plus bas. Écarte
   avant WhatsApp ceux que Noé ne prend pas. Retirés le 11/10/2026 : « Tu cherches un site vitrine » (Noé en fait
   quand il le faut), « une seule personne s'occupe de tout » (« il veut un résultat, il s'en fout si un ou
   plusieurs », Noé), « une application qui te rapporte des revenus chaque mois » (la promesse du hero et de la
   vidéo, redite), « tu vois ton application comme une dépense, pas comme un investissement » (« ça va pas les
   faire fuir ? », Noé : ça fait la leçon, et ça redit « le prix le plus bas ») et « quelqu'un pour faire ta
   publicité » (la FAQ y répond, avec la nuance de Noé : il conseille sur la façon de faire connaître
   l'application). Remplace « Ce que je fais / Ce que je ne fais pas ». Suit directement les étapes depuis que les
   avis sont descendus (11/10/2026) : fond blanc, et 80 px au-dessus sur ordinateur.
5. **« Parlons de ton projet »** (`#contact`, route /rendez-vous) : la pastille des disponibilités
   (son fond n'apparaît qu'avec le texte des places ; pendant « Vérification des disponibilités… », pas de
   fond, Noé 11/10/2026),
   le bouton WhatsApp « Discuter avec Noé » (suivi `home_contact`) et « Tu bosses direct avec moi ».
   Placée avant la FAQ le 11/10/2026 (Noé). Fond gris depuis le 11/10/2026 (les fonds alternent).
   **Puis, sous le bouton, les avis clients** : « Ce que disent mes clients » (`#avis-clients`, sous « Avis
   clients », lien du même nom dans la barre ; la route /avis y mène ; `scroll-mt-24` pour que la barre ne le
   cache pas), séparé du bouton par un filet. Descendus ici le 11/10/2026 (Noé : « les avis, je les verrais en
   bas ») : tous les boutons de la page (« J'ai une idée », « Discuter avec Noé ») mènent à cette section, donc
   celui qui hésite au moment d'écrire trouve les clients juste dessous, avant la FAQ. On ne met pas les avis
   sous la FAQ : la FAQ répond aux questions, les avis rassurent au moment de cliquer.
   Des avis depuis le 11/10/2026 (Noé : « il veut de la preuve sociale »). Le titre était « Pourquoi me faire
   confiance ? » jusqu'au 11/10/2026 à 14 h (Noé : « le titre est bon ? ») : une question fait douter avant de
   rassurer et annonce un argument, alors qu'on montre des messages. Puis « Ce qu'en disent mes clients », le
   titre de /projets, l'après-midi : « c'est pas français » (Noé, le soir). Depuis : « Ce que disent mes
   clients », ses mots, sur les deux pages, sous le petit titre « Avis clients » (le lien de la barre). Trois
   messages WhatsApp réels (confirmé par Noé), ceux du surligné
   « Témoignages » de son Instagram (il n'y en a pas d'autres pour l'instant). **La même partie que sur
   /projets, une seule source : `src/AvisClients.jsx`**, affiché par l'accueil et par /projets (Noé,
   11/10/2026 : « je veux la même partie que dans projets, c'est plus propre ») : les visuels de Noé, format
   story (titre en capitales avec des mots en violet, la conversation, papier quadrillé), dans
   `public/assets/images/avis/temoignage-…webp` ; l'un sous l'autre sur téléphone, côte à côte et ceux des bords
   légèrement penchés sur ordinateur. Le nom du client est recouvert d'une barre noire sur deux d'entre eux (il
   était lisible sur /projets jusqu'au 11/10/2026 ; le troisième, Noé l'avait déjà effacé). Sur le premier, la
   phrase du bas de la story, « Merci pour vos retours ! », est effacée (Noé, 11/10/2026 : elle parlait aux
   clients, pas au visiteur). Puis la première et la troisième image ont été raccourcies (Noé : « l'image n'est
   pas si longue ») : le bas vide est coupé, il reste sous la conversation la marge du haut. Trois hauteurs, donc,
   la plus haute au milieu : sur ordinateur, les cartes sont centrées en hauteur. Le titre de chaque
   carte est dans l'image, le texte `alt` le reprend : « D'une simple idée à une app qui tourne », « Une app qui
   existait, mais qui ne rapportait pas », « Livré dans les délais, 100 % satisfait ». Le deuxième répond à
   « pourquoi moi et pas une agence » et prouve les écrans qui font payer, sans redire la vidéo. Dessous, une note
   courte : « Noms masqués par discrétion. » (« Messages reçus sur WhatsApp, noms masqués. » jusqu'au 11/10/2026 au
   soir, Noé : « raccourcis le texte ») ; elle explique les barres noires et rassure celui qui a peur qu'on dévoile
   son idée. Le contenu des avis est dans le texte `alt` de chaque image, que `scripts/generate-routes.js` sert aux
   robots de l'accueil.
   Essai refusé le même jour : des cartes recadrées sur la conversation, avec le titre écrit en texte, en rangée
   qu'on fait glisser sur téléphone (« c'est plus propre » dans /projets). Ajouter un avis : n'y mettre que des
   messages réels, avec l'accord de la personne, son nom masqué.
   Essais retirés le même jour : la carte avec la photo de Noé (sa tête deux fois avec la barre du haut), « Je
   connais ce milieu, j'ai lancé mes propres applications » (« et alors ? », Noé), le tableau « Une agence / Avec
   moi » (deux tableaux croix/coche à la suite avec « Pour qui », et « un chef de projet entre vous » : « il s'en
   fout, il veut un résultat »). **Le tableau ne revient pas sous les avis** (question de Noé, 11/10/2026 à
   14 h : « ça me paraissait bien, voir si on ne dit pas pareil ») : ses trois lignes disaient pareil, le
   chiffre d'une agence est déjà sous le tarif et sous le délai des étapes, « Moi, directement » est « Tu bosses
   direct avec moi » juste au-dessus des avis, et le deuxième avis raconte l'agence par la bouche d'un client, ce
   qui convainc mieux qu'un tableau fait par Noé. S'il revenait un jour, ce serait à la place des deux lignes
   grises « En agence : … » des étapes, jamais en plus. Ses applications à lui ne sont nommées nulle part comme
   telles : le titre du carrousel « Ce que j'ai déjà construit » est vrai pour toutes ; ne jamais écrire qu'elles
   sont à des clients.

6. **FAQ « Pour y voir plus clair »** (`#faq`, sous « Questions fréquentes » : la cible ne connaît pas
   forcément « FAQ ») : les 4 premières questions de `FAQ_ITEMS`
   (`src/PagesSeo.jsx`), les vraies objections, en deux ou trois phrases chacune :
   - combien : « À partir de 5 000 €. Le prix dépend de ton application et il est fixé avant de commencer :
     stratégie, design, développement et mise en ligne compris, sans compteur qui tourne. Tu le connais avant
     de payer quoi que ce soit, et tu vois ta maquette avant de décider. » (11/10/2026 au soir ; avant : « en
     général une dizaine de milliers d'euros », raison au point 3 sur le tarif) ;
   - en combien de temps : « En moyenne, 45 jours pour une application mobile ou web, du cadrage à la mise en
     ligne. Le délai exact est fixé dans le devis, selon les fonctionnalités prévues au cahier des charges. »
     (45 jours et pas « première version » depuis le 11/10/2026 ; Noé refuse « on cale le délai ensemble », pas
     assez pro). La page « Ma méthode » et le texte des robots (`/creation-application-mobile`, `/faq`,
     `llms.txt`), le quiz, les boutons de l'audit et les articles du blog disent la même chose (11/10/2026,
     « vérifie partout », Noé) : « 4 à 6 semaines » n'y reste que comme le temps de développement à l'intérieur
     des 45 jours, les tableaux de prix n'ont plus de colonne délai, et « 6 à 9 mois pour une application
     complète » est devenu « une plateforme plus lourde se compte en mois, son délai est fixé dans le devis ».
     L'audit, lui, estime un délai par projet (de 5 à 9 semaines selon la complexité, dans
     `src/audit-app/backend/prompts.ts`) : pas touché, il demande un redéploiement ;
   - « je n'y connais rien » : « c'est le cas de la plupart de mes clients », « je suis là pour
     t'aiguiller et te conseiller », « une idée suffit pour commencer ensemble » ;
   - pour trouver des utilisateurs : Noé ne fait pas la publicité, son travail est que les utilisateurs
     qui arrivent deviennent des clients qui paient chaque mois, mais il conseille sur la façon la plus
     pertinente de faire connaître l'application.

   Retirées le 11/10/2026 par Noé : « Application mobile ou web : laquelle choisir ? », « À qui appartient
   l'application ? » (« c'est logique, il paye ») et « Est-ce que mon application va vraiment générer des
   revenus ? ». `NB_FAQ_ACCUEIL` vaut 4 dans `src/App.jsx` et dans `scripts/generate-routes.js` (balisage
   FAQPage de l'accueil) : changer les deux ensemble. /faq garde la liste complète (10 questions). La FAQ vient
   après « Parlons de ton projet » depuis le 11/10/2026 (décision de Noé : le bouton WhatsApp d'abord, la FAQ
   ensuite pour ceux qui hésitent encore). Sous les questions, « Une autre question ? Écris-moi sur
   WhatsApp. » ouvre directement WhatsApp avec le suivi `home_faq`.
7. **« Je décortique tout ça sur mon Insta »** (`#instagram`, sous « Instagram ») : la section d'avant la
   refonte, remise en bas le 11/10/2026 à la demande de Noé (« à la fin, remets la section Insta »), même
   texte et même post intégré (`instagram.com/p/DZS67wXiPRM/embed`), bouton « Voir mon Instagram ». Retirée
   le 10/10 parce qu'elle faisait quitter la page avant le bouton WhatsApp ; elle vient maintenant après le
   bouton, les avis et la FAQ : celui qui arrive au bout sans avoir écrit peut suivre Noé. Son id était
   `avis` (la route /avis y menait) : `#avis` mène désormais aux avis clients.
8. **L'audit, en dernier** (`#audit`, route /audit) : « Pas encore prêt à écrire ? Teste ton idée : potentiel,
   budget et délai, en 2 minutes. », avec un bouton au contour violet « Lancer mon audit », jamais plein, et
   sans petit titre (un rappel, pas une section de plus). Sous Instagram depuis le 11/10/2026 (Noé ; il était
   sous la FAQ) : la dernière chose avant le pied de page garde le visiteur sur le site au lieu de l'envoyer
   sur Instagram. Noé ne veut pas le pousser (« c'est un plus ») et avait peur d'y perdre ceux qui allaient
   écrire, l'audit étant plus long qu'un message : il est donc après tout le reste, pour ceux qui ne sont
   toujours pas prêts.

Retirés le 10/10/2026 : la barre de preuve, « Mon métier », « Avant de payer un euro, je t'offre », le
grand tableau Agences et l'ancienne section audit. La section Instagram, retirée aussi, est revenue le
11/10/2026 en bas (point 7). Les illustrations `meetingdev.svg`, `devmobile.svg` et `post.svg`,
retirées le 10/10, sont revenues dans les étapes le 11/10 (point 3).

Fonds, de haut en bas (11/10/2026) : le hero violet, blanc (réalisations), gris clair (étapes et tarif), blanc
(pour qui), gris clair (contact et avis), blanc (FAQ), gris clair (Instagram), blanc (audit), puis le pied de
page violet.

### Le carrousel des écrans

Neuf captures fournies par Noé, converties en WebP de 660 px sous
`public/assets/images/apps/captures/` (environ 459 Ko au total). Ajoutées le 11/10/2026 : le premier écran de
Bailora (« Vos SCI, enfin simples », `bailora-bienvenue.webp`, légende « Une porte pour le propriétaire, une autre
pour le locataire : personne ne se perd. ») et l'écran d'abonnement de Plouff Habitudes (`plouff-abonnement.webp`,
choisi parmi six captures de son bureau : c'est l'écran qui fait payer, celui qui prouve « une application conçue
pour rapporter » ; légende « L'offre annuelle mise en avant, 7 jours d'essai : le curieux devient abonné. »). Il
affiche « Salut Noe » et « Soutenir un développeur français indé » : à refaire avec un autre prénom si Noé veut
qu'on devine moins que Plouff Habitudes est à lui. Prix en euros depuis la capture du 11/10/2026 (la première
était en dollars). Noé prévoit un deuxième écran de Sonora.

**L'ordre** (Noé, 11/10/2026 : « montrer 3 écrans différents ») : les trois téléphones visibles montrent
toujours trois applications différentes, jamais deux écrans de la même côte à côte. Deux tours, dans le même
ordre d'applications (SmoothRide, Bailora, WakeUp Alarme, Sonora, Plouff Habitudes ; WakeUp avant Plouff à la
demande de Noé) : d'abord un écran de chacune, le plus parlant, puis le deuxième écran de chacune. Deux écrans
par application au plus : au-delà, personne ne les voit (dix écrans font déjà 55 secondes). Plouff Habitudes
raconte à elle seule la promesse de la vidéo : l'écran du jour au premier tour (ils reviennent chaque jour),
l'abonnement au second (ils paient chaque mois). Le deuxième écran de Sonora ira entre ceux de WakeUp Alarme et
de Plouff Habitudes au second tour ; les deux applications de Noé ne se suivront alors plus nulle part. Deux
légendes ne disent jamais la même chose. En développement, la console avertit si trois écrans qui se suivent ne
viennent pas de trois applications différentes.

Le nombre d'écrans est libre : seules les positions -1, 0 et 1 se voient, les autres sont rangées cachées à -2
ou 2 (`position` dans `src/AppShowcase.jsx`). Avant le 11/10/2026, à 8 écrans, celui d'en face (position 4)
n'avait pas de style et s'affichait par-dessus le téléphone du milieu.

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
- Attendu : page autonome, hero sobre, galerie de cartes, frames mobile ou ordinateur propres selon le support (application mobile, application web ou les deux), titre et sous-titre pour chaque ecran, finition visuelle coherente.
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
- La redirection `/nowork/...` doit conserver la query string et le fragment : le bouton « Script » du CRM transmet le prénom, la date de création et l'idée du lead dans l'URL. Les perdre affiche les repères `[Prénom]` et `[jour du formulaire]` au lieu des valeurs.
- `/app-devis/...` doit rester redirige vers `/nowork/...` pour compatibilite avec les anciens liens.
- `/maquette-visuel/...` appartient a Nowork mais reste affiche sans `/nowork` via une facade landing page.
- `/espace-client/...` est une route publique landing page, sans afficher `/nowork`.
