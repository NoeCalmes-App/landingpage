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

Construit comme celui d'Ikovaline (ikovaline.com), à la demande de Noé : un grand titre, une ligne, un
bouton, puis la vidéo, le plus haut possible.

- Titre : « Je transforme ton idée en application qui génère des revenus » (« app » sur ordinateur pour
  tenir en deux lignes). Grand sur ordinateur (jusqu'à 4,15 rem) ; sur téléphone, les tailles sont
  mesurées pour garder trois lignes sans débordement jusqu'à 320 px.
- Ligne sous le titre : « Stratégie, design et développement : je m'occupe de tout, de l'idée à la mise
  en ligne. » Elle ne répète pas la vidéo (qui dit déjà « pour qu'elle rapporte ») : elle dit ce que la
  cible numéro un achète, un seul interlocuteur qui fait tout.
- Bouton « J'ai une idée d'application », sans icône, plus grand sur ordinateur. Il mène à la section
  contact, dont le bouton porte le même texte et ouvre WhatsApp. La barre du haut dit « J'ai une idée »
  (plus court, comme Ikovaline), sur l'accueil, le blog et les quiz.
- La pastille « +20 applications déjà publiées » est passée sous la vidéo, pour que la vidéo remonte.
- Fond : le violet monte jusqu'au bouton et entoure la vidéo dès le premier écran ; le haut reste blanc
  derrière la barre et le titre (`.hero-bg` dans `src/index.css`).

## Film du hero

Sous le bouton « J'ai une idée d'application » du hero, un film de 26 secondes en motion design
(voix off et bruitages, pas de musique). Code : `src/HeroVideo.jsx` et `src/hero-video.css`.
Fichiers : `public/assets/videos/hero-v10-1080.mp4` (ordinateur), `hero-v10-720.mp4` (mobile,
connexion lente, économiseur de données) et deux affiches `hero-v10-poster*.jpg`. Les sources du film
(textes, voix, réglages) sont dans `content/video-hero/v10/`. Pour publier un nouveau montage,
changer le numéro dans les noms de fichiers (v11…) : le navigateur ne ressert pas l'ancien film en cache.

Le lecteur reprend celui d'Ikovaline (ikovaline.com), à la demande de Noé :

- La page s'affiche d'abord avec l'affiche (une vraie image, la bonne taille choisie par le navigateur),
  la vidéo ne se charge que 0,7 s après. Elle joue alors seule, muette et en boucle, dès que 15 % est à
  l'écran (sur un portable 1366×768, on en voit à peu près la moitié au chargement).
- Une barre reste toujours visible en bas de la vidéo : lecture/pause, avancement (clic ou glisser),
  « Activer le son », plein écran. Un clic sur la vidéo la met en pause ou la relance. Clavier : espace,
  M, F, flèches. À la fin, elle reprend au début (boucle), comme chez Ikovaline.
- En plus d'Ikovaline : le premier « Activer le son » (ou un premier clic sur la vidéo, ou le plein écran)
  repart du début, pour entendre le film en entier. Ensuite, le bouton coupe et remet le son sans revenir
  en arrière.
- Muette, elle se met en pause hors de l'écran et dans un onglet masqué. Avec le son, elle continue.
- Plein écran : le bloc entier sur ordinateur, Android et iPad (la barre s'efface quand la souris ne
  bouge plus) ; le lecteur natif sur iPhone.
- Lecture automatique refusée (iPhone en mode économie d'énergie, Safari ou Firefox réglés pour bloquer,
  navigateur intégré d'une application) ou non souhaitée (`prefers-reduced-motion`, économiseur de
  données) : l'affiche reste, avec un gros bouton « Lancer la vidéo », qui la lance avec le son.

## Galerie d’interfaces sur l’accueil

La section `#calories-proof` est portée par `src/AppShowcase.jsx` et
`src/app-showcase.css`. Elle présente la stratégie produit en une phrase et
cinq pastilles : premiers écrans, essai gratuit, habitude, abonnement/commission,
revenus récurrents. Calorie (13 000 €/mois) reste un exemple secondaire de marché
concurrentiel. La barre de preuve affiche +900k téléchargements cumulés,
+300k utilisateurs pour Hush et +20 applications, chiffres fournis par Noé.

Le carrousel utilise sept captures fournies par Noé, converties en WebP de
660 px sous `public/assets/images/apps/captures/` (environ 375 Ko au total).
Les fichiers originaux restent inchangés. Les captures contiennent déjà
l’encoche et la barre d’état : le cadre CSS ajoute seulement la coque et les
boutons. La liste `SCREENS` définit l’ordre et les descriptions accessibles
(application/maquette) ; aucune légende visible ne surcharge les écrans.

Trois téléphones visibles, défilement toutes les 3,5 secondes, glissement,
flèches et clavier. La première capture reste affichée jusqu’à ce qu’au moins
la moitié de la galerie entre dans l’écran ; le défilement démarre alors et se
suspend dès que la galerie repasse sous ce seuil. Un clic sur une flèche ou un glissement suspend le défilement
30 secondes avant reprise automatique. Aucun bouton pause n’est affiché.
L’animation se suspend tant que le focus clavier est dans le carrousel, hors écran,
pendant un glissement et dans un onglet masqué. `prefers-reduced-motion`
désactive l’automatisme et les transitions. Les illustrations vectorielles des
livrables sont dans `src/DeliverableVisual.jsx` et `src/App.css` : format compact
(80 px sur ordinateur, 64 px sur mobile), illustrations en violet de marque ;
seuls les fonds des pastilles coche/euro et le curseur utilisent le bleu foncé
du texte (`--color-text`), avec détails blancs.
Références de conception : [Embla, exemples](https://www.embla-carousel.com/docs/v8/examples/predefined),
[Swiper, coverflow](https://swiperjs.com/demos), [W3C, carrousels accessibles](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/).

## Livrables et fin de page d’accueil

La section « Avant de payer un euro, je t’offre : » présente d’abord la maquette offerte sur fond violet
pâle, puis le cahier des charges. Sur ordinateur, ces deux cartes sont côte à
côte ; le devis forme une ligne compacte en dessous. Les cartes n’ont pas
d’ombre ni de déplacement au survol.

Sur mobile, les cartes « Comment ça se passe ? » placent une illustration de 128 × 118 px
à droite du début du texte pour rapprocher le numéro, le titre et la description.
La fin de page suit l’ordre : contact WhatsApp, FAQ, Instagram, audit express,
pied de page. La FAQ s’intitule « Pour y voir plus clair », sur fond blanc avec
un espacement supérieur réduit sur mobile. Sous les trois questions, « Une autre
question ? Écris-moi sur WhatsApp. » ouvre directement WhatsApp avec le suivi
`home_faq`. Instagram et l’audit partagent un
fond gris clair.

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
