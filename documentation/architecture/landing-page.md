# Architecture — Landing Page

## Role

Site public `noecalmes.fr` pour vendre le positionnement de Noe Calmes : expert en application mobile, de la strategie au lancement. Le site sert a convertir le trafic en appel reserve sur l'accueil (calendrier Cal.com, section `#contact`, depuis le 27/11/2026), audit gratuit et conversation WhatsApp.

Le chemin prioritaire pour les visiteurs qui se posent une question de prix/budget est : landing page -> `/audit-app` -> verdict -> WhatsApp. Depuis le 27/11/2026, les boutons de l'accueil menent au calendrier Cal.com ; WhatsApp reste ouvert par l'icone de la barre du haut et par la route `/whatsapp` (fin du formulaire Meta).

## Stack

- React + Vite
- Tailwind CSS v4
- Routes SPA maison dans `src/App.jsx`
- Build : `npm run build` puis `scripts/generate-routes.js`
- Hebergement GitHub Pages / domaine `noecalmes.fr`

## Routes principales

Routes gerees dans `src/App.jsx` :

- `/` — l'accueil (`src/Accueil.jsx`, depuis le 27/11/2026). `/accueiltest`, sa page test, renvoie a `/`
- `/expertise` — page SEO autonome : ce que je fais qu'un developpeur ne fait pas (`src/PagesSeo.jsx`)
- `/creation-application-mobile` — page SEO autonome : la methode en 5 etapes (`src/PagesSeo.jsx`)
- `/faq` — page SEO autonome + donnees structurees FAQPage (`src/PagesSeo.jsx`)
- `/quiz` et `/quiz/{slug}` — pages quizz SEO (`src/Quiz.jsx`)
- `/projets` — page de confiance principalement consultée sur téléphone après un premier appel (`src/Projets.jsx`, styles `src/projets.css`) : deux captures fixes (SmoothRide et WakeUp), cadres propres inclinés sur un halo violet, résultats contextualisés, avis clients, prise en charge et suivi, puis cadre du devis. Les chiffres ne sont pas répétés dans une barre séparée. Plouff Habitudes est présenté en 30 jours du design au lancement (Noé, 19/10/2026) ; ce cas précis ne modifie pas le délai moyen du site. Pas de prix d'appel sur cette page : le montant dépend du projet, le devis et le cahier des charges précisent livrables, calendrier et prix avant engagement. Pas de nouvelle promesse de maquette ici. La méthode détaille les décisions produit, la réalisation et la poursuite de la collaboration après les 30 jours de corrections incluses (`strategie-commerciale.md`). Le contact final reste discret (écrire ou rappeler), le prospect ayant déjà le numéro de Noé. Les avis restent partagés avec l'accueil (`src/AvisClients.jsx`).
- `/audit-app` — audit gratuit d'idee d'application
- `/rendez-vous` — la reservation d'un appel de l'accueil (`#contact`, calendrier Cal.com)
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

- **`/projets` n'est plus indexee** (26/11/2026, decision de Noe) : c'est le support envoye apres un premier appel, pas une page d'acquisition. `scripts/generate-routes.js` lui pose `noindex, follow` (et a son alias `/projet`), ne la declare plus au sitemap et ne la cite plus dans `llms.txt`. Les liens internes vers elle restent. La carte Calorie en est retiree le meme jour. La page entiere est refaite le meme jour (`src/Projets.jsx`, `src/projets.css`) : la messagerie au million, quatre applications au meme format (ecran d'ordinateur et telephone), les avis, une seule question pour finir ; essayee d'abord sur `/projetstest`, supprimee une fois validee.
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

## L'accueil (depuis le 27/11/2026)

**noecalmes.fr affiche depuis le 27/11/2026 la page construite sur `/accueiltest`** (Noé : « remplace la landing page
noecalmes.fr par accueiltest », puis « supprime l'ancienne, accueiltest devient la page d'accueil »). L'adresse est
`noecalmes.fr/`, rien d'autre.

- **Le code** : `src/Accueil.jsx` et `src/accueil.css` (classes préfixées `at-`), prise de rendez-vous
  `src/ReserverAppel.jsx` (section « Prise de rendez-vous par Cal.com » plus bas). `src/App.jsx` rend `Accueil` pour
  `/` et pour toute adresse sans page propre.
- **L'ancien accueil est supprimé** : son code dans `App.jsx` (et le carrousel `src/AppShowcase.jsx`, qui ne servait
  qu'à lui ; ses styles `app-showcase.css` restent, `ExemplesMetier` et `/projets` s'en servent). Dernier état
  complet : commit `c8a13b3`. Sa documentation est archivée : `documentation/archive/architecture/ancien-accueil-2026-10.md`.
- **`/accueiltest`** n'existe plus : l'adresse renvoie à `noecalmes.fr/` (`history.replaceState`).
- **Pour les robots**, `scripts/generate-routes.js` lit `src/Accueil.jsx` : texte du composant, puis ses tableaux
  `ETAPES`, `ENGAGEMENTS` et `QUESTIONS` (rendus par des `.map()`, lus par `lireTableauAccueil`, jamais recopiés),
  titre « Je transforme ton idée en application qui rapporte vraiment. ». La FAQ balisée de l'accueil reprend ses dix
  `QUESTIONS`.
- **Retiré à la mise en ligne** : le titre d'onglet « Page test » et la balise `noindex, nofollow` que la page posait
  elle-même.
- **Le bloc « Ce que rapporte l'application d'un client » (18 450 € en décembre 2025, nom masqué) est MASQUÉ**
  depuis le 27/11/2026 au soir, à la demande de Noé (« masque, on réactive plus tard »), après quelques heures en
  ligne le même jour. Rien n'est supprimé : `src/ApercuResultat.jsx` reste, et `Accueil.jsx` le réaffiche après
  « Pourquoi moi » dès que `AFFICHER_RESULTAT` repasse à `true`. Ne pas le réactiver sans que Noé le demande. Hors du
  texte servi aux robots. Si l'application ne fait plus ces montants, écrire le mois ou retirer le bloc.
- **La preuve Calorie (« 13 000 €/mois ») a quitté tout le site le 27/11/2026** (section suivante).
- **`/rendez-vous`** (noindex) s'appelle « Réserver un appel avec Noé » et descend au calendrier.
- **L'onglet qui appelle au retour** ne dit plus « Maquette offerte pour ton app », seulement « Parlons de ton idée
  d'app » (la maquette se propose à l'appel, plus sur le site).
- **Ni bouton WhatsApp flottant ni chatbot** sur l'accueil : WhatsApp passe par l'icône de la barre du haut.
- **« Pas encore prêt à écrire ? »** (le lien vers le test de l'idée, en bas de page) est **masqué** depuis le
  27/11/2026 (Noé : « juste masque, peut-être plus tard je rajoute »). Le bloc vit dans `src/AccueilAudit.jsx`, hors
  du texte servi aux robots ; pour le remettre, poser `<AccueilAudit />` avant `<Footer />` dans `Accueil.jsx`.
- **La carte « Coaching sportif » du carrousel** porte la pastille « Maquette d'application » (27/11/2026, Noé :
  « pour application »), pas « Application » : le projet n'est pas construit (devis envoyé, pas signé). Ses images
  montrent le nom et le logo « Pulso » d'un projet de prospect : il a donné son accord (Noé, 27/11/2026).

## L'offre du Drive sur tout le site (27/11/2026)

Noé : « dans la landing page, positionnement, cible et prix, mets tout à jour en fonction du Drive Banger Offer », et
« passe à 30 min partout ». Source : le dossier Drive « Création de l'offre » (« Offre : ce qu'il faudra changer après
validation », partie « Le site », et « Mon offre sur une page »). Ce qui vaut partout, accueil compris :

- **Le prix : un seul chiffre**, « autour de 10 000 € », selon la taille et la complexité du projet ; en agence,
  « autour de 30 000 € » (médiane du baromètre 2026 de La Fabrique du Net). Jamais « à partir de » (il attirait des
  personnes hors cible et a fait peur à un prospect qui l'était), jamais une fourchette (le visiteur retient le chiffre
  du bas), jamais un prix par support. « Ta fourchette dès le premier appel, ton prix fixe dans ton devis. » Les
  tableaux de paliers de `/application-mobile-sur-mesure`, `/application-web-sur-mesure`, `/refonte-application-mobile`
  et des articles sont retirés ; ce qui fait varier le prix reste, sans chiffre. Les scénarios de calcul du blog (« une
  application à 8 000 € se rembourse avec… ») restent : ce ne sont pas des prix de Noé.
- **Le délai : « 1 à 2 mois »** (environ 1 mois sur le web, 2 mois sur mobile, 2 mois et demi pour les deux), avec sa
  condition quand la place le permet : le développement ne prend pas de retard, ce qui allonge, c'est la société et la
  validation des comptes par Apple et Google. Plus de « 45 jours », ni de « 4 à 6 semaines de développement ».
  L'article MVP s'appelle « MVP d'application mobile : lancer ton idée en 1 à 2 mois ».
- **La cible : le professionnel qui a déjà son activité et ses clients.** Les blocs « Pour qui, et pour qui pas » des
  pages d'offre reprennent les lignes du Drive : pas pour celui qui cherche le prix le plus bas, qui veut juste un
  développeur qui exécute, ou dont le budget n'est pas prêt.
- **La preuve : la messagerie au million de téléchargements, sans son nom** (« j'ai conçu la première version d'une
  application qui dépasse aujourd'hui le million de téléchargements »). Seule `/projets`, non indexée et envoyée par Noé
  lui-même, garde le nom Hush (décision de Noé du 26/11/2026).
- **Calorie : plus de nom nulle part.** Retirée des pages ; dans les articles qui reposent sur l'exemple, au passé et sans
  nom, avec la formule du Drive : « une application que j'ai conçue a généré jusqu'à 13 000 € par mois ».
- **La maquette n'est plus un cadeau** : jamais « gratuite » ni « offerte ». On dit « tu vois ton application avant de
  payer », et « tu ne paies rien avant d'avoir vu ton application et signé ton devis ».
- **L'appel : 30 minutes, partout.**
- **Le titre Google de l'accueil** (Noé : « c'est toi l'expert, tu ferais quoi ? ») : « Ton application mobile ou web, vue
  avant de payer | Noé Calmes » (62 caractères ; sans « & », que le contrôle du build compte « &amp; », cinq
  caractères, sur une limite de 65). Le mot cherché reste, la promesse de revenus sort (le Drive : « je ne promets pas des revenus », elle attire ceux qui veulent de l'argent sans budget), et
  il dit ce qu'aucun concurrent ne dit. Description : « Tu as déjà ton activité et tes clients ? En 1 à 2 mois, ton
  application est en ligne, et tu la vois avant de payer. Réserve un appel gratuit de 30 minutes. » (`META_HOME` et
  `index.html`). Avant : « Application mobile & web qui génère des revenus ». **Le titre du haut de page ne change
  pas** (« Je transforme ton idée en application qui rapporte vraiment. », « une nouvelle source de revenus ») :
  c'est l'accroche de Noé, que le Drive veut travailler avec le coach.

Pas encore aligné :

- **L'audit de `/audit-app`** calcule ses estimations avec une IA, dont les consignes vivent dans
  `src/audit-app/backend/prompts.ts` (projet Firebase à part, déployé à part) : elles disent encore « autour de 5 000 à
  6 000 € » pour un projet simple, et `orchestrator.ts` a ses propres textes de repli. Le site n'a changé que le texte de
  repli de l'écran (`AuditAppVerdict.jsx`).
- **Les documents de `documentation/strategy/`** gardent l'ancien discours, sauf le script d'appel et la prospection
  Meta, passés à 30 minutes : ce sont des archives de travail.

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

Calendly a ete retire de la landing le 22/06/2026. **Depuis le 27/11/2026, l'accueil se reserve par Cal.com** (section suivante). WhatsApp reste : l'icone de la barre du haut de l'accueil (message pre-rempli avec la page d'origine, `src/Accueil.jsx`) et la route `/whatsapp`, fin du formulaire Meta (`WHATSAPP_NUMBER` dans `src/App.jsx`). Ce qui suit decrit l'ancien accueil.

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

### Prise de rendez-vous par Cal.com, sur l'accueil (construite le 26/11/2026, en ligne le 27/11/2026)

Decision de Noe : un seul agenda pour le site et la pub Meta. **En ligne sur l'accueil depuis le 27/11/2026.** Essais du meme jour abandonnes (Calendly, puis un formulaire sur mesure avant le calendrier) : dans l'historique git.

- **Le parcours** (`src/ReserverAppel.jsx`, section `#contact`) : le widget en ligne officiel de Cal.com (`app.cal.com/embed/embed.js`), seul. Le visiteur choisit son creneau, puis Cal.com lui demande nom, e-mail, telephone et six questions. Aucun tri par le budget : tout le monde peut reserver.
- **L'evenement** : « Appel decouverte », `cal.com/noecalmes-app/appel`, lieu « numero de telephone du participant » (Noe appelle, son numero n'est jamais affiche ; c'etait le cas avec le lieu « appel telephonique » de depart). Questions, avec leurs identifiants (lus par Nowork dans le webhook), toutes a choix en **liste deroulante** (« Choisis une reponse », choix de Noe) sauf l'idee en texte libre : `activite`, `idee`, `stade` (« Ou en est ton projet ? » : j'y reflechis, j'ai besoin d'aide pour le structurer / mon cahier des charges est pret / mon projet est defini, je cherche quelqu'un pour le lancer ; idee reprise du formulaire d'Ikovaline, raccourcie et tutoyee), `lancement`, `budget` (« Tu as un budget en tete pour ton projet ? » : moins de 5 000 €, de 5 000 a 10 000 €, de 10 000 a 15 000 €, de 15 000 a 20 000 €, plus de 20 000 € ; les tranches de la pub Meta plus « moins de 5 000 € », choix de Noe), `source`, `confidentialite` (Oui / Non obligatoire, « Oui (je t'envoie par e-mail un accord a signer avant l'appel) » : l'accord part par e-mail, a la main pour l'instant). « Notes supplementaires » et « Ajouter des invites » masques.
- **La couleur** : la couleur de marque est payante chez Cal.com (offre Equipes). L'integration impose le violet du site (`cssVarsPerTheme`, `src/reserverAppel.js`) : sur le site, le jour choisi et les boutons sont violets.
- **Agenda et messages** : disponibilites 9 h 45 - 18 h 45 en semaine, 10 h - 15 h le samedi, un creneau toutes les 15 minutes (sinon Cal.com aligne sur l'heure et la demi-heure, et le premier creneau tombait a 10 h au lieu de 9 h 45), preavis minimum de 2 h. Les agendas « Agenda de Noe » (Google) et « Noe Apple perso » bloquent les heures deja prises ; chaque reservation s'ajoute dans « Agenda de Noe ». Cal.com envoie la confirmation (e-mail et invitation d'agenda). Workflow « Rappel 1 h avant l'appel » (pas 24 h : le prospect reserve souvent pour le jour meme ou le lendemain) : un e-mail (texte standard de Cal.com, au vouvoiement : le texte personnalise est payant ; expediteur « Noé Calmes ») et un SMS « Bonjour {prenom}, c'est Noé. Je t'appelle aujourd'hui a {heure} pour parler de ton projet d'application. Je t'attends ! », qui ne part que si le compte a des credits SMS (solde a 0 le 26/11/2026 ; 1 credit = 0,01 $, prix Twilio + 80 %, par segment de 160 caracteres).
- **Sur ordinateur**, l'iframe de Cal.com garde 520 px (`!important`, Cal.com ecrit sa hauteur en style en ligne) : c'est Cal.com qui defile a l'interieur, horaires puis formulaire, comme chez Mirim (mirim-agency.fr). Sur telephone, il prend toute sa hauteur.
- **Titre de l'evenement Cal.com** : « Appel strategique » (choix de Noe, 26/11/2026 au soir, sur le modele de Mirim), avec une description en programme (« Voici le programme : », trois lignes, « En 30 minutes, et c'est gratuit. ») ; « Parlons de ton idee d'application » et « Appel conseil gratuit » essaye le meme jour, refuse par Noe ; avant « Discuter de ton projet d'application », puis « Appel decouverte »). « Audit » ne parle pas a tout le monde (Noe). C'est aussi l'objet des e-mails de Cal.com. L'adresse reste `noecalmes-app/appel`. L'appel dure **30 minutes** : la page le dit partout (etape 1 et son dessin).
- **Haut de page (26/11/2026, en vue de la video face camera)** : sur telephone, la video, puis « Regarde la video avant de reserver ton appel. », puis le bouton ; sur ordinateur, le bouton reste au-dessus de la video. Le bouton dit « Reserver mon appel gratuit » et n'est jamais bloque tant que la video n'est pas vue. Styles `.at-hero-bas` dans `accueil.css`.
- **Au-dessus du calendrier** (26/11/2026, tard) : le titre « 30 minutes avec Noe. Pas un commercial. » et la phrase « Je prends un seul nouveau projet par mois. Reserve ton appel : » (voulue par Noe). Le message WhatsApp de l'icone de la barre finit par « Depuis la page : » et l'adresse de la page, puis « Mon idee : ». La question « Depuis combien de temps tu as cette idee ? » et la pastille sont retirees (Noe ne comprenait plus la question sans sa chute).
- **Pas de bouton WhatsApp flottant** sur l'accueil : il faisait concurrence au calendrier et a ses questions.
- **Plus de SMS dans le workflow de rappel (27/11/2026)** : l'action « Envoyer un SMS au participant » est supprimee du workflow « Rappel 1 h avant l'appel ». C'est elle qui faisait afficher sous le numero de telephone « En saisissant votre numero de telephone, vous consentez a recevoir des SMS… Des frais de SMS peuvent s'appliquer », qui pouvait faire fuir (Noe). Le rappel par e-mail reste. Ne pas remettre d'action SMS sans accepter le retour de cette mention.
- **La question « Comment tu m'as connu ? » est masquee dans Cal.com (27/11/2026, Noe : « enlever »)** : interrupteur de la question dans Formulaire de reservation, etiquette « Masque ». Elle n'est pas supprimee : son identifiant `source` existe toujours, le visiteur ne la voit plus. Il reste six questions visibles.
- **Une seule reservation a venir par personne (27/11/2026, Noe : « la meme personne a max une reservation »)** : Cal.com › Appel strategique › Limites et delais › « Limiter le nombre de reservations a venir par utilisateur » = 1, avec « Proposer de reprogrammer la derniere reservation au nouveau creneau » coche. Essayee en vrai le 27/11/2026 : la deuxieme reservation est refusee, mais APRES que la personne a rempli tout le formulaire, avec un message brut de Cal.com (« Le rendez-vous n'a pas pu etre reserve. Vous avez atteint la limite de 1 reservations a venir », code 400) et sans proposition de deplacement. **Limite retiree le 27/11/2026** (Noe : « c'est toi l'expert, je te laisse faire ») : Nowork range deja deux reservations d'une meme personne sur une seule fiche, la plus recente compte. Elle supprime en pratique le cas relevé cote Nowork (deux reservations vivantes pour une meme fiche).
- **Mesure Meta (26/11/2026)** : a la confirmation de Cal.com (`bookingSuccessfulV2`), `trackCallBooked` envoie l'evenement standard « Schedule » (« Planifier » dans le gestionnaire de publicites), une fois par visite, sans aucune donnee du visiteur. C'est l'evenement sur lequel regler une campagne de rendez-vous. Le clic sur l'icone WhatsApp de la barre envoie « Lead », comme les autres boutons WhatsApp du site. Apres la reservation, le visiteur reste sur la page (confirmation de Cal.com dans le cadre, bandeau « C'est reserve ») : pas de page de remerciement, la redirection de Cal.com est payante et la mesure n'en a pas besoin. Teste par `src/metaTracking.test.js`.
- **Les etapes avant la reservation (26/11/2026)**, en evenements personnalises, une fois par visite, sans donnee du visiteur : `BookingClick` (un bouton qui mene au calendrier), `CalendarViewed` (le haut du calendrier a depasse le tiers bas de l'ecran), `CalendarUsed` (un vrai clic dans le cadre du calendrier : jour, mois ou creneau, voir `ReserverAppel.jsx`), `BookingRescheduled`, `BookingCancelled`. Elles servent a voir ou les visiteurs s'arretent, et a regler une campagne sur une etape plus frequente tant que les reservations sont rares. ⚠️ En local, le pixel est charge : un clic de test part vraiment chez Meta.
- **Verification complete du 26/11/2026 (nuit)**, trois defauts trouves et corriges : `CalendarViewed` ne partait jamais sur telephone (il attendait la moitie d'un bloc de 2 400 px a l'ecran) ; `CalendarUsed` partait tout seul au chargement (le signal `__routeChanged` de Cal.com, remplace par la perte de focus vers le cadre) ; sur telephone, les boutons descendaient sur le calendrier en cachant le titre (ils visent maintenant `#reserver-titre`). Ajoutes : la silhouette de chargement de Cal.com (`cal.embed.pageType`), la marge de la barre sous 360 px, et le bouton sous les etapes qui dit « Reserver mon appel gratuit » comme celui du haut. Mesure sur 320, 360, 375, 390, 412, 430, 768, 1024, 1366 et 1440 px de large : aucun debordement horizontal.
- **30 minutes partout sur le site (26/11/2026)** : la page test et les trois pages d'offre (`PagesSeo.jsx`, « On s'appelle 30 minutes »). Dans Nowork, l'appel 1 apres un formulaire Meta reste a 15 minutes : le modele Meta valide promet « une quinzaine de minutes ».
- **Le webhook Cal.com vers Nowork est en service depuis le 27/11/2026** (fiche du prospect avec ses reponses, dans le CRM au jour du rendez-vous ; doc de Nowork : `documentation/systems/lead-auto-import.md`). Sans formulaire sur la page, celui qui ne reserve pas ne laisse aucune trace.

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

Le widget public est dans `src/chatbot/Widget.jsx`. **Il n'est plus affiche nulle part depuis le 27/11/2026** : seul l'ancien accueil le montait (en mode WhatsApp). Le code reste, pret a etre rebranche ou supprime.

Le backend chatbot n'est pas dans ce repo : il appelle la Cloud Function du projet `devis-app-8e216`, configuree par `VITE_CHATBOT_API_URL`.

## Redirect GitHub Pages

`public/404.html` gere les chemins directs non resolus par GitHub Pages.

Cas sensible :

- `/nowork/...` doit renvoyer vers l'application admin.
- La redirection `/nowork/...` doit conserver la query string et le fragment : le bouton « Script » du CRM transmet le prénom, la date de création et l'idée du lead dans l'URL. Les perdre affiche les repères `[Prénom]` et `[jour du formulaire]` au lieu des valeurs.
- `/app-devis/...` doit rester redirige vers `/nowork/...` pour compatibilite avec les anciens liens.
- `/maquette-visuel/...` appartient a Nowork mais reste affiche sans `/nowork` via une facade landing page.
- `/espace-client/...` est une route publique landing page, sans afficher `/nowork`.
