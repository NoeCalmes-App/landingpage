import { useState, useEffect, lazy, Suspense } from 'react'
import './App.css'
import Accueil from './Accueil.jsx'
import Documents, { DOCUMENTS } from './Documents.jsx'
import { ROUTE_DOCUMENTS, ROUTE_APP_MOBILE, ROUTE_APP_WEB, estRouteDocuments, estRouteAppMobile, estRouteAppWeb, trouverDocument } from './routesDocuments.js'
import ContactNoe from './ContactNoe.jsx'
import Footer from './Footer.jsx'
import ClientSpaceBridge from './ClientSpaceBridge.jsx'
import MaquetteVisualBridge from './MaquetteVisualBridge.jsx'
import { lienInterne, appliquerMeta, retirerPrerender } from './seo.js'

// ─── Chargement differe des pages hors accueil (21/09/2026) ──────────────────
//
// Les 16 maquettes, l'audit et la page projets etaient importes statiquement,
// donc livres a tout visiteur de l'accueil qui ne les ouvrira jamais. A elles
// seules les maquettes pesaient 491 Ko de source dans un bundle de 1 286 Ko.
//
// React.lazy demande a Vite de produire un fichier par page et de ne l'envoyer
// qu'au moment ou elle est demandee. Le rendu est inchange : ces pages sont
// affichees par des retours anticipes, jamais par l'accueil.
// Charges a la demande depuis le 09/11/2026 : le blog (28 articles), les quiz,
// les pages SEO et les pages legales pesaient dans le fichier principal que
// l'accueil telecharge. Chaque module arrive quand on ouvre sa page.
const BlogList = lazy(() => import('./Blog.jsx').then((m) => ({ default: m.BlogList })))
const BlogArticleRoute = lazy(() => import('./Blog.jsx').then((m) => ({ default: m.BlogArticleRoute })))
const PageQuizHub = lazy(() => import('./Quiz.jsx').then((m) => ({ default: m.PageQuizHub })))
const QuizRoute = lazy(() => import('./Quiz.jsx').then((m) => ({ default: m.QuizRoute })))
const PageExpertise = lazy(() => import('./PagesSeo.jsx').then((m) => ({ default: m.PageExpertise })))
const PageMethode = lazy(() => import('./PagesSeo.jsx').then((m) => ({ default: m.PageMethode })))
const PageSurMesure = lazy(() => import('./PagesSeo.jsx').then((m) => ({ default: m.PageSurMesure })))
const PageWebSurMesure = lazy(() => import('./PagesSeo.jsx').then((m) => ({ default: m.PageWebSurMesure })))
const PageRefonte = lazy(() => import('./PagesSeo.jsx').then((m) => ({ default: m.PageRefonte })))
const PageFaq = lazy(() => import('./PagesSeo.jsx').then((m) => ({ default: m.PageFaq })))
const PageAPropos = lazy(() => import('./PagesSeo.jsx').then((m) => ({ default: m.PageAPropos })))
const CGV = lazy(() => import('./CGV.jsx'))
const PolitiqueConfidentialite = lazy(() => import('./PolitiqueConfidentialite.jsx'))
const MentionsLegales = lazy(() => import('./MentionsLegales.jsx'))
const Legales = lazy(() => import('./Legales.jsx'))
const Document = lazy(() => import('./Document.jsx'))
const DocumentsIndex = lazy(() => import('./DocumentsIndex.jsx'))
const DocumentsWeb = lazy(() => import('./DocumentsWeb.jsx'))
const SmoothRideMockups = lazy(() => import('./SmoothRideMockups.jsx'))
const ArethaMockups = lazy(() => import('./ArethaMockups.jsx'))
const PacAssistMockups = lazy(() => import('./PacAssistMockups.jsx'))
const CoachAppMockups = lazy(() => import('./CoachAppMockups.jsx'))
const BlushMockups = lazy(() => import('./BlushMockups.jsx'))
const MoovYeMockups = lazy(() => import('./MoovYeMockups.jsx'))
const ConvoiPiloteMockups = lazy(() => import('./ConvoiPiloteMockups.jsx'))
const ColocoolMockups = lazy(() => import('./ColocoolMockups.jsx'))
const PetSolidariteMockups = lazy(() => import('./PetSolidariteMockups.jsx'))
const SonoraMockups = lazy(() => import('./SonoraMockups.jsx'))
const BagSitterMockups = lazy(() => import('./BagSitterMockups.jsx'))
const JuridikMockups = lazy(() => import('./JuridikMockups.jsx'))
const BailoraMockups = lazy(() => import('./BailoraMockups.jsx'))
const GuestRideMockups = lazy(() => import('./GuestRideMockups.jsx'))
const ImmoMatchMockups = lazy(() => import('./ImmoMatchMockups.jsx'))
const VietCollabMockups = lazy(() => import('./VietCollabMockups.jsx'))
const PulsoMockups = lazy(() => import('./PulsoMockups.jsx'))
const AuditApp = lazy(() => import('./audit-app/AuditApp.jsx'))
const Projets = lazy(() => import('./Projets.jsx'))

// Le numéro WhatsApp de Noé, pour la route /whatsapp (fin du formulaire Meta). Le lien WhatsApp de l'accueil vit dans
// src/Accueil.jsx (icône de la barre du haut).
const WHATSAPP_NUMBER = '33658308210'

const SECTION_ROUTES = {
  // /avis mène aux avis clients, sous le bouton de « Parlons de ton projet » (11/10/2026).
  '/avis': {
    id: 'avis-clients',
    title: 'Avis clients — Noé Calmes, expert en applications mobiles & web',
    description: 'Ce que disent les clients qui ont fait confiance à Noé Calmes pour créer, reprendre ou faire évoluer leur application mobile ou web.',
  },
  '/audit': {
    id: 'audit',
    title: "Tester ton idée d'application en 2 minutes | Noé Calmes",
    description: "Teste ton idée d'application en 2 minutes : potentiel, budget à prévoir et délai, gratuit et sans engagement.",
  },
  '/rendez-vous': {
    id: 'contact',
    // Depuis le nouvel accueil (27/11/2026), #contact est le calendrier de réservation, plus un bouton WhatsApp.
    title: 'Réserver un appel avec Noé | Noé Calmes',
    description: "30 minutes au téléphone avec Noé, pas un commercial : tu racontes ton idée d'application, tu repars avec ses conseils et une fourchette de prix.",
  },
}

// Meta de la page d'accueil, alignees sur celles ecrites dans index.html.
// Necessaires parce que les pages internes ecrivent leurs propres meta : sans
// ca, revenir sur la home en navigation SPA laissait le titre et la canonique
// de la page precedente.
const META_HOME = {
  path: '/',
  // LE TITRE ET LA DESCRIPTION (27/11/2026, Noé : « le titre Google, c'est toi l'expert ») : plus de promesse de
  // revenus (offre du Drive : « je ne promets pas des revenus », ça attire ceux qui veulent de l'argent sans budget).
  // Le titre garde le mot cherché (« application mobile ou web ») et dit ce qu'aucun concurrent ne dit : on la voit
  // avant de payer. Sans « & » : le contrôle du build compte « &amp; » pour cinq caractères (limite 65). La description parle à la cible du Drive, le professionnel qui a déjà son activité et ses
  // clients, avec le délai de l'accueil. Même texte dans index.html (title, description, og, twitter).
  // Avant : « Application mobile & web qui génère des revenus » et « Je transforme ton idée en application qui
  // rapporte vraiment… ». Le titre du haut de page (Accueil.jsx) n'a pas changé : c'est l'accroche de Noé.
  title: 'Ton application mobile ou web, vue avant de payer | Noé Calmes',
  description: "Tu as déjà ton activité et tes clients ? En 1 à 2 mois, ton application est en ligne, et tu la vois avant de payer. Réserve un appel gratuit de 30 minutes.",
}

// L'ACCUEIL (27/11/2026, Noé : « remplace la landing page par accueiltest, puis supprime accueiltest ») : la page
// construite sur /accueiltest est l'accueil de noecalmes.fr, dans src/Accueil.jsx. L'ancien accueil, qui vivait plus
// bas dans ce fichier, est supprimé (dernier état complet : commit c8a13b3). /accueiltest renvoie à l'accueil.

// LES ANCRES DE L'ACCUEIL (11/10/2026) : chaque id est le libellé de sa section, en minuscules et sans accents
// (#realisations, #etapes-et-tarif, #avis-clients, #contact, #pour-qui, #faq, #audit, #instagram), lisible dans
// l'adresse et dans les liens « Aller à » que Google affiche parfois sous un résultat. Les anciens noms, déjà partagés
// ou publiés, mènent toujours au bon endroit : l'effet « ancre à l'arrivée » de App les traduit. « avis » était l'id
// de la section Instagram (la route /avis y menait) : il mène maintenant aux vrais avis, comme /avis.
const ANCIENNES_ANCRES = {
  'calories-proof': 'realisations',
  offre: 'etapes-et-tarif',
  confiance: 'avis-clients',
  'contact-section': 'contact',
  avis: 'avis-clients',
}


function App() {
  const [legalReturnPath, setLegalReturnPath] = useState('/')
  const [currentDoc, setCurrentDoc] = useState(() => {
    const path = sessionStorage.getItem('redirect') || window.location.pathname
    return trouverDocument(DOCUMENTS, path)
  })
  const [page, setPage] = useState(() => {
    const redirect = sessionStorage.getItem('redirect')
    if (redirect) {
      sessionStorage.removeItem('redirect')
      history.replaceState(null, '', redirect)
    }
    const path = (redirect || window.location.pathname).replace(/\/$/, '') || '/'
    // /accueiltest était la page test du nouvel accueil (25 au 27/11/2026) : l'adresse renvoie à l'accueil.
    if (path === '/accueiltest') {
      history.replaceState(null, '', '/')
      return 'home'
    }
    // Redirection directe vers WhatsApp (message pré-rempli). Utilisée comme
    // URL de fin du formulaire Meta (les formulaires instantanés refusent les
    // liens wa.me, mais acceptent noecalmes.fr/whatsapp).
    if (path === '/whatsapp' || path === '/wa') {
      window.location.replace(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          "Bonjour Noé, je viens de remplir ton formulaire pour mon projet d'application."
        )}`
      )
      return 'home'
    }
    // Alias vers /espace-client : les gens tapent /espace, /panel, etc. de
    // mémoire. On corrige l'URL en /espace-client SANS recharger — un
    // `location.replace` refait tout le cycle 404 → app une seconde fois.
    // `history.replaceState` réécrit l'URL en place, l'écran client s'affiche
    // au premier chargement, et le pont (qui lit `location.pathname` pour
    // construire l'iframe) voit bien /espace-client.
    // Uniquement les chemins EXACTS — un vrai lien /espace-client/{token}
    // ne doit surtout pas être capturé ici.
    if (['/espace', '/espaceclient', '/panelclient', '/panel-client', '/panel'].includes(path.replace(/\/+$/, ''))) {
      history.replaceState(null, '', '/espace-client')
      return 'client-space'
    }
    if (path === '/espace-client' || path.startsWith('/espace-client/')) return 'client-space'
    if (path === '/maquette-visuel' || path.startsWith('/maquette-visuel/')) return 'maquette-visual'
    // Deux écrans documents : le sommaire `/documents`, puis les accès à créer
    // sous `/documents/app-mobile`. Chacun avec ses alias — le singulier et les
    // abréviations viennent tout seuls, et l'adresse se recopie d'un PDF. Les
    // listes vivent dans `routesDocuments.js`, à côté des adresses canoniques.
    // `history.replaceState` remet la bonne adresse dans la barre sans
    // recharger : un lien copié depuis la page est alors le bon.
    if (estRouteDocuments(path)) {
      if (path.toLowerCase() !== ROUTE_DOCUMENTS) {
        history.replaceState(null, '', lienInterne(ROUTE_DOCUMENTS))
      }
      return 'documents-index'
    }
    if (estRouteAppMobile(path)) {
      if (path.toLowerCase() !== ROUTE_APP_MOBILE) {
        history.replaceState(null, '', lienInterne(ROUTE_APP_MOBILE))
      }
      return 'documents'
    }
    if (estRouteAppWeb(path)) {
      if (path.toLowerCase() !== ROUTE_APP_WEB) {
        history.replaceState(null, '', lienInterne(ROUTE_APP_WEB))
      }
      return 'documents-web'
    }
    if (path === '/contactnoe') return 'contact'
    if (path === '/legal') return 'legal'
    if (path === '/audit-app') return 'audit-app'
    if (path === '/cgv') return 'cgv'
    if (path === '/mentions') return 'mentions'
    if (path === '/privacy') return 'privacy'
    // Vraies pages, contenu unique. Elles rendaient la home avant le
    // 20/08/2026, ce qui dupliquait la page d'accueil sur 3 URLs du sitemap.
    if (path === '/expertise') return 'page-expertise'
    if (path === '/creation-application-mobile' || path === '/etapes') return 'page-methode'
    if (path === '/application-mobile-sur-mesure') return 'page-sur-mesure'
    if (path === '/application-web-sur-mesure') return 'page-web-sur-mesure'
    if (path === '/refonte-application-mobile') return 'page-refonte'
    if (path === '/faq') return 'page-faq'
    if (path === '/a-propos') return 'page-a-propos'
    if (path === '/quiz') return 'quiz-hub'
    if (path.startsWith('/quiz/')) return 'quiz'
    if (path === '/blog') return 'blog'
    if (path.startsWith('/blog/')) return 'blog-article'
    if (path.toLowerCase() === '/projets' || path.toLowerCase() === '/projet') return 'projets'
    // Maquettes SmoothRide — page autonome (sans navbar/footer landing-page).
    // Restreint à /maquette/smoothride (case-insensitive) uniquement. Toute
    // autre URL /maquette/xxx retombe sur la home (pas de leak vers SmoothRide
    // pour un slug inconnu).
    if (path.toLowerCase() === '/maquette/smoothride') return 'smoothride-mockups'
    if (path.toLowerCase() === '/maquette/aretha') return 'aretha-mockups'
    if (path.toLowerCase() === '/maquette/vietcollab') return 'vietcollab-mockups'
    if (path.toLowerCase() === '/maquette/pulso') return 'pulso-mockups'
    if (['/maquette/pac-assist', '/maquette/cvc-assist', '/maquette/pacassist', '/maquette/cvcassist'].includes(path.toLowerCase())) return 'pac-assist-mockups'
    if (['/maquette/kingfit-coach', '/maquette/kingfit', '/maquette/coach-app', '/maquette/app-coach'].includes(path.toLowerCase())) return 'coach-app-mockups'
    if (['/maquette/blush', '/maquette/blush-rencontre', '/maquette/blushrencontre'].includes(path.toLowerCase())) return 'blush-mockups'
    if (['/maquette/moovye', '/maquette/moov-ye'].includes(path.toLowerCase())) return 'moovye-mockups'
    if (['/maquette/convoipilote', '/maquette/convoi-pilote'].includes(path.toLowerCase())) return 'convoipilote-mockups'
    if (['/maquette/colocool', '/maquette/coloccool'].includes(path.toLowerCase())) return 'colocool-mockups'
    if (['/maquette/pet-solidarite', '/maquette/petsolidarite', '/maquette/pet-solidarité'].includes(path.toLowerCase())) return 'pet-solidarite-mockups'
    if (['/maquette/sonora'].includes(path.toLowerCase())) return 'sonora-mockups'
    if (['/maquette/bagsitter', '/maquette/bag-sitter'].includes(path.toLowerCase())) return 'bagsitter-mockups'
    if (['/maquette/juridik', '/maquette/juridique'].includes(path.toLowerCase())) return 'juridik-mockups'
    if (path.toLowerCase() === '/maquette/bailora') return 'bailora-mockups'
    if (['/maquette/guestride', '/maquette/guest-ride'].includes(path.toLowerCase())) return 'guestride-mockups'
    if (['/maquette/immomatch', '/maquette/immo-match'].includes(path.toLowerCase())) return 'immomatch-mockups'
    // Les guides, adresse actuelle ou ancienne. Une ancienne adresse ouvre le
    // bon guide PUIS se réécrit en canonique : les liens des devis déjà
    // envoyés continuent de marcher sans figer l'ancienne arborescence.
    const documentTrouve = trouverDocument(DOCUMENTS, path)
    if (documentTrouve) {
      if (documentTrouve.route !== path) {
        history.replaceState(null, '', lienInterne(documentTrouve.route))
      }
      return 'document-viewer'
    }
    if (path in SECTION_ROUTES) return 'home'
    return 'home'
  })
  // Depuis le 09/11/2026, App ne garde que les slugs : les donnees des quiz et
  // des articles vivent dans des modules charges a la demande (QuizRoute,
  // BlogArticleRoute), qui retrouvent l'objet a partir du slug.
  const [currentQuizSlug, setCurrentQuizSlug] = useState(() => {
    const path = (sessionStorage.getItem('redirect') || window.location.pathname).replace(/\/+$/, '')
    return path.startsWith('/quiz/') ? path.replace('/quiz/', '') : null
  })
  const [currentSlug, setCurrentSlug] = useState(() => {
    const path = (sessionStorage.getItem('redirect') || window.location.pathname).replace(/\/$/, '')
    return path.startsWith('/blog/') ? path.replace('/blog/', '') : null
  })
  // Le pre-rendu cache (`[data-seo-prerender]`) n'est la que pour les robots
  // qui n'executent pas le JavaScript. Une fois le vrai contenu affiche, il
  // duplique le <h1> et laisse un pave de texte en `left:-10000px`. On le
  // retire pour que le DOM rendu, celui que Google indexe, soit propre.
  useEffect(() => {
    retirerPrerender()
  }, [])

  // Meta de la home au retour de navigation. Les routes de section
  // (/avis, /audit, /rendez-vous) sont traitees par l'effet suivant.
  useEffect(() => {
    if (page !== 'home') return
    const chemin = window.location.pathname.replace(/\/+$/, '') || '/'
    if (chemin in SECTION_ROUTES) return
    appliquerMeta(META_HOME)
  }, [page])

  // Auto-scroll vers la section et mise à jour des meta tags si on arrive sur une route de section
  useEffect(() => {
    const path = window.location.pathname.replace(/\/$/, '') || '/'
    const section = SECTION_ROUTES[path]
    if (section) {
      const canonicalPath = section.canonicalPath || path
      // appliquerMeta ecrit la canonique AVEC la barre finale. Ecrire l'URL a
      // la main ici reintroduirait la boucle de redirection (voir src/seo.js).
      appliquerMeta({ path: canonicalPath, title: section.title, description: section.description })
      // Scroll vers la section une fois le DOM prêt
      // Réessayer plusieurs fois car le contenu peut mettre du temps à se charger
      const scrollToSection = () => {
        const el = document.getElementById(section.id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return true
        }
        return false
      }
      const tryScroll = (attempts = 0) => {
        if (scrollToSection() || attempts >= 10) return
        setTimeout(() => tryScroll(attempts + 1), 300)
      }
      // Essayer immédiatement, puis réessayer après le rendu
      requestAnimationFrame(() => tryScroll())
      window.addEventListener('load', () => setTimeout(scrollToSection, 100), { once: true })
    }
  }, [])

  // Ancre à l'arrivée (11/10/2026) : une adresse comme noecalmes.fr/#avis-clients ouvre l'accueil sur la bonne
  // section. Le navigateur ne le fait pas seul : la section n'existe pas encore quand il lit l'adresse. Les anciens
  // noms (ANCIENNES_ANCRES) sont traduits, et l'adresse affichée prend le nouveau. Un « # » suivi d'un chemin
  // (« #/… », espace client) n'est pas une ancre : on n'y touche pas.
  useEffect(() => {
    if (page !== 'home') return
    let brut = ''
    try { brut = decodeURIComponent((window.location.hash || '').slice(1)) } catch { return }
    if (!brut || brut.includes('/')) return
    const id = ANCIENNES_ANCRES[brut] || brut
    if (id !== brut) history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${id}`)
    let essais = 0
    const aller = () => {
      const el = document.getElementById(id)
      if (el) return el.scrollIntoView({ block: 'start' })
      if (++essais < 10) setTimeout(aller, 150)
    }
    requestAnimationFrame(aller)
  }, [page])

  // LE BOUTON « PRÉCÉDENT » DU NAVIGATEUR, pour le seul parcours documents.
  //
  // L'app change d'écran avec `history.pushState` et n'écoute pas `popstate` :
  // reculer réécrit l'URL sans changer l'affichage. Partout ailleurs on s'en
  // accommode, mais pas ici : ces pages sont ouvertes par un client qui vient
  // de signer, souvent sur son téléphone, et qui recule au pouce par réflexe.
  // Il se retrouvait sur le guide avec /documents/app-mobile dans la barre,
  // sans plus aucun moyen de sortir.
  //
  // L'ÉCOUTEUR EST BORNÉ À CE PARCOURS (`page` dans la garde) : ailleurs, rien
  // ne change. Et pour toute destination hors documents, on RECHARGE au lieu
  // de recopier la table des routes — elle fait quarante lignes, un double
  // affaibli aurait divergé au premier ajout.
  useEffect(() => {
    if (page !== 'documents' && page !== 'documents-web' && page !== 'documents-index' && page !== 'document-viewer') return

    const reculer = () => {
      const chemin = window.location.pathname.replace(/\/+$/, '').toLowerCase() || '/'
      const doc = trouverDocument(DOCUMENTS, chemin)
      if (doc) { setCurrentDoc(doc); setPage('document-viewer'); window.scrollTo(0, 0); return }
      if (estRouteAppMobile(chemin)) { setPage('documents'); window.scrollTo(0, 0); return }
      if (estRouteAppWeb(chemin)) { setPage('documents-web'); window.scrollTo(0, 0); return }
      if (estRouteDocuments(chemin)) { setPage('documents-index'); window.scrollTo(0, 0); return }
      window.location.reload()
    }

    window.addEventListener('popstate', reculer)
    return () => window.removeEventListener('popstate', reculer)
  }, [page])

  // L'ONGLET QUI APPELLE AU RETOUR. Quand le visiteur part sur un autre
  // onglet, le titre alterne entre deux messages au bout de quelques
  // minutes ; il revient au vrai titre dès que l'onglet est rouvert.
  //
  // ⚠️ SEULEMENT SUR LES PAGES DE VENTE. Un client qui consulte son espace,
  // une maquette ou un guide ne doit pas lire « Ton idée t'attend » : il a
  // déjà signé. Et rien ne touche au titre tant que l'onglet est visible,
  // donc les robots et le référencement voient le vrai titre.
  //
  // Le vrai titre est relu au moment du départ, pas mémorisé une fois pour
  // toutes : chaque page écrit le sien en navigation (appliquerMeta).
  useEffect(() => {
    const pagesDeVente = ['home', 'blog', 'blog-article', 'audit-app', 'page-expertise', 'page-methode', 'page-sur-mesure', 'page-web-sur-mesure', 'page-refonte', 'page-faq', 'page-a-propos', 'quiz-hub', 'quiz', 'projets']
    if (!pagesDeVente.includes(page)) return

    // « Maquette offerte pour ton app » retiré le 27/11/2026 : la maquette ne s'annonce plus comme un cadeau, elle se
    // propose à l'appel (plan de la nouvelle page d'accueil, validé par Noé).
    const MESSAGES = ['Parlons de ton idée d’app']
    let vraiTitre = document.title
    let depart = null
    let alternance = null

    const arreter = () => {
      clearTimeout(depart)
      clearInterval(alternance)
      depart = null
      alternance = null
    }

    const auChangement = () => {
      if (document.hidden) {
        vraiTitre = document.title
        depart = setTimeout(() => {
          let i = 0
          document.title = MESSAGES[i]
          alternance = setInterval(() => {
            i = (i + 1) % MESSAGES.length
            document.title = MESSAGES[i]
          }, 60000)
        }, 60000)
      } else {
        arreter()
        document.title = vraiTitre
      }
    }

    document.addEventListener('visibilitychange', auChangement)
    return () => {
      document.removeEventListener('visibilitychange', auChangement)
      if (depart || alternance) {
        arreter()
        document.title = vraiTitre
      }
    }
  }, [page])

  const goHome = () => { setPage('home'); history.pushState(null, '', '/'); window.scrollTo(0, 0) }

  const goDocuments = () => { setPage('documents'); history.pushState(null, '', lienInterne(ROUTE_APP_MOBILE)); window.scrollTo(0, 0) }

  const goDocumentsWeb = () => { setPage('documents-web'); history.pushState(null, '', lienInterne(ROUTE_APP_WEB)); window.scrollTo(0, 0) }

  /** Le sommaire ouvre la famille cliquée, pas toujours la même. */
  const goFamille = (id) => (id === 'app-web' ? goDocumentsWeb() : goDocuments())

  const goBlog = () => { setPage('blog'); history.pushState(null, '', lienInterne('/blog')); window.scrollTo(0, 0) }

  const goAuditApp = () => { setPage('audit-app'); history.pushState(null, '', lienInterne('/audit-app')); window.scrollTo(0, 0) }

  // Point de passage commun a tous les CTA de contact de la landing. Depuis
  // une page secondaire, on remonte la home avant de scroller vers la section.
  const goBookCall = (event) => {
    event?.preventDefault?.()
    setPage('home')
    history.pushState(null, '', lienInterne('/rendez-vous'))

    const scrollToContact = (attempts = 0) => {
      const section = document.getElementById(SECTION_ROUTES['/rendez-vous'].id)
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      if (attempts < 10) setTimeout(() => scrollToContact(attempts + 1), 50)
    }

    requestAnimationFrame(() => scrollToContact())
  }

  const openLegal = (target, returnPath = window.location.pathname) => {
    const path = returnPath || '/'
    setLegalReturnPath(path === '/cgv' || path === '/mentions' || path === '/privacy' ? '/' : path)
    setPage(target)
    history.pushState(null, '', lienInterne(`/${target}`))
    window.scrollTo(0, 0)
  }

  const goLegalBack = () => {
    if (legalReturnPath === '/audit-app') {
      setPage('audit-app')
      history.pushState(null, '', lienInterne('/audit-app'))
      window.scrollTo(0, 0)
      return
    }

    setPage('home')
    history.pushState(null, '', lienInterne(legalReturnPath || '/'))

    const section = SECTION_ROUTES[legalReturnPath]
    if (section) {
      setTimeout(() => {
        document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } else {
      window.scrollTo(0, 0)
    }
  }

  const allerVers = (chemin) => {
    history.pushState(null, '', lienInterne(chemin))
    if (chemin === '/expertise') return setPage('page-expertise')
    if (chemin === '/creation-application-mobile') return setPage('page-methode')
    if (chemin === '/application-mobile-sur-mesure') return setPage('page-sur-mesure')
    if (chemin === '/application-web-sur-mesure') return setPage('page-web-sur-mesure')
    if (chemin === '/refonte-application-mobile') return setPage('page-refonte')
    if (chemin === '/faq') return setPage('page-faq')
    if (chemin === '/a-propos') return setPage('page-a-propos')
    if (chemin === '/quiz') return setPage('quiz-hub')
    if (chemin.startsWith('/quiz/')) { setCurrentQuizSlug(chemin.replace('/quiz/', '')); setPage('quiz'); window.scrollTo(0, 0); return }
    if (chemin === '/projets') return setPage('projets')
    if (chemin === '/blog') return setPage('blog')
    if (chemin.startsWith('/blog/')) { setCurrentSlug(chemin.replace('/blog/', '')); setPage('blog-article'); window.scrollTo(0, 0); return }
    if (chemin === '/audit-app') return setPage('audit-app')
    setPage('home')
  }

  const propsPageSeo = {
    onAccueil: goHome,
    onBookCall: goBookCall,
    onAuditApp: goAuditApp,
    onNaviguer: allerVers,
  }

  if (page === 'page-expertise') return <Suspense fallback={null}><PageExpertise {...propsPageSeo} /></Suspense>
  if (page === 'page-methode') return <Suspense fallback={null}><PageMethode {...propsPageSeo} /></Suspense>
  if (page === 'page-sur-mesure') return <Suspense fallback={null}><PageSurMesure {...propsPageSeo} /></Suspense>
  if (page === 'page-web-sur-mesure') return <Suspense fallback={null}><PageWebSurMesure {...propsPageSeo} /></Suspense>
  if (page === 'page-refonte') return <Suspense fallback={null}><PageRefonte {...propsPageSeo} /></Suspense>
  if (page === 'page-faq') return <Suspense fallback={null}><PageFaq {...propsPageSeo} /></Suspense>
  if (page === 'page-a-propos') return <Suspense fallback={null}><PageAPropos {...propsPageSeo} /></Suspense>
  if (page === 'quiz-hub') return <Suspense fallback={null}><PageQuizHub onAccueil={goHome} onBookCall={goBookCall} onNaviguer={allerVers} /></Suspense>
  if (page === 'quiz' && currentQuizSlug) return (
    <Suspense fallback={null}><QuizRoute slug={currentQuizSlug} onAccueil={goHome} onBookCall={goBookCall} onAuditApp={goAuditApp} onNaviguer={allerVers} /></Suspense>
  )
  if (page === 'blog') return (
    <>
    <Suspense fallback={null}>
    <BlogList
      onBack={goHome}
      onBookCall={goBookCall}
      onAuditApp={goAuditApp}
      onNaviguer={allerVers}
      onArticle={(article) => {
        setCurrentSlug(article.slug)
        setPage('blog-article')
        history.pushState(null, '', lienInterne(`/blog/${article.slug}`))
      }}
    />
    </Suspense>
    <Footer allerVers={allerVers} onLegal={(p) => openLegal(p, '/blog')} />
    </>
  )
  if (page === 'blog-article' && currentSlug) return (
    <>
    <Suspense fallback={null}>
    <BlogArticleRoute
      slug={currentSlug}
      onBack={goBlog}
      onBookCall={goBookCall}
      onAuditApp={goAuditApp}
      onArticle={(article) => {
        setCurrentSlug(article.slug)
        history.pushState(null, '', lienInterne(`/blog/${article.slug}`))
        window.scrollTo(0, 0)
      }}
      onAccueil={goHome}
      onNaviguer={allerVers}
    />
    </Suspense>
    <Footer allerVers={allerVers} onLegal={(p) => openLegal(p, `/blog/${currentSlug}`)} />
    </>
  )
  if (page === 'client-space') return <ClientSpaceBridge />
  if (page === 'maquette-visual') return <MaquetteVisualBridge />
  if (page === 'smoothride-mockups') return <Suspense fallback={null}><SmoothRideMockups /></Suspense>
  if (page === 'aretha-mockups') return <Suspense fallback={null}><ArethaMockups /></Suspense>
  if (page === 'vietcollab-mockups') return <Suspense fallback={null}><VietCollabMockups /></Suspense>
  if (page === 'pulso-mockups') return <Suspense fallback={null}><PulsoMockups /></Suspense>
  if (page === 'pac-assist-mockups') return <Suspense fallback={null}><PacAssistMockups /></Suspense>
  if (page === 'coach-app-mockups') return <Suspense fallback={null}><CoachAppMockups /></Suspense>
  if (page === 'blush-mockups') return <Suspense fallback={null}><BlushMockups /></Suspense>
  if (page === 'moovye-mockups') return <Suspense fallback={null}><MoovYeMockups /></Suspense>
  if (page === 'convoipilote-mockups') return <Suspense fallback={null}><ConvoiPiloteMockups /></Suspense>
  if (page === 'colocool-mockups') return <Suspense fallback={null}><ColocoolMockups /></Suspense>
  if (page === 'pet-solidarite-mockups') return <Suspense fallback={null}><PetSolidariteMockups /></Suspense>
  if (page === 'sonora-mockups') return <Suspense fallback={null}><SonoraMockups /></Suspense>
  if (page === 'bagsitter-mockups') return <Suspense fallback={null}><BagSitterMockups /></Suspense>
  if (page === 'juridik-mockups') return <Suspense fallback={null}><JuridikMockups /></Suspense>
  if (page === 'bailora-mockups') return <Suspense fallback={null}><BailoraMockups /></Suspense>
  if (page === 'guestride-mockups') return <Suspense fallback={null}><GuestRideMockups /></Suspense>
  if (page === 'immomatch-mockups') return <Suspense fallback={null}><ImmoMatchMockups /></Suspense>
  if (page === 'projets') return <Suspense fallback={null}><Projets onBack={goHome} /></Suspense>
  if (page === 'contact') return <ContactNoe />
  if (page === 'legal') return <Suspense fallback={null}><Legales /></Suspense>
  if (page === 'audit-app') return <Suspense fallback={null}><AuditApp onBack={goHome} onLegal={(p) => openLegal(p, '/audit-app')} /></Suspense>
  if (page === 'privacy') return <Suspense fallback={null}><PolitiqueConfidentialite onBack={goLegalBack} /></Suspense>
  if (page === 'mentions') return <Suspense fallback={null}><MentionsLegales onBack={goLegalBack} /></Suspense>
  if (page === 'cgv') return <Suspense fallback={null}><CGV onBack={goLegalBack} /></Suspense>
  if (page === 'documents-index') return <Suspense fallback={null}><DocumentsIndex onOuvrirFamille={goFamille} /></Suspense>
  // Les deux familles ouvrent un document de la même façon : c'est la fiche
  // elle-même qui porte son adresse, et le retour la ramène chez elle.
  const ouvrirDocument = (doc) => {
    setCurrentDoc(doc)
    setPage('document-viewer')
    history.pushState(null, '', lienInterne(doc.route))
    window.scrollTo(0, 0)
  }
  if (page === 'documents') return <Documents onOpenDocument={ouvrirDocument} />
  if (page === 'documents-web') return <Suspense fallback={null}><DocumentsWeb onOpenDocument={ouvrirDocument} /></Suspense>
  // ⚠️ LE RETOUR SUIT LA FAMILLE DU DOCUMENT. Sans ça, la flèche du guide
  // « Nom de domaine » du site web ramenait sur les accès d'un projet mobile —
  // une page de comptes Apple et Google devant quelqu'un qui n'en crée aucun.
  if (page === 'document-viewer' && currentDoc) {
    return <Suspense fallback={null}><Document doc={currentDoc} onBack={currentDoc.famille === 'app-web' ? goDocumentsWeb : goDocuments} /></Suspense>
  }

  // Tout ce qui n'a pas sa page plus haut est l'accueil (src/Accueil.jsx, en ligne depuis le 27/11/2026).
  return <Accueil />
}

export default App
