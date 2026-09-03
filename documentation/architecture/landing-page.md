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

### Donnees structurees

`index.html` sert de gabarit a toutes les pages generees. Attention : tout JSON-LD ajoute dans `index.html` se retrouve **sur chaque page generee**. C'est pour ca que `generate-routes.js` retire le bloc `FAQPage` partout sauf sur la home et `/faq`, ou il est regenere depuis `FAQ_ITEMS`. Une page qui declare une FAQ invisible enfreint les regles de Google.

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

Pour les CTA prix/budget, preferer `/audit-app` : exemple dans la section comparaison, `Tarif fixe, sans surprise` puis lien secondaire `Combien coûterait mon app ?` vers `/audit-app`, qui finit lui aussi sur WhatsApp.

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
