import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import './App.css'
import PhoneCarousel from './AppShowcase.jsx'
import HeroVideo from './HeroVideo.jsx'
import PolitiqueConfidentialite from './PolitiqueConfidentialite.jsx'
import MentionsLegales from './MentionsLegales.jsx'
import CGV from './CGV.jsx'
import Document from './Document.jsx'
import Documents, { DOCUMENTS } from './Documents.jsx'
import DocumentsIndex from './DocumentsIndex.jsx'
import DocumentsWeb from './DocumentsWeb.jsx'
import { ROUTE_DOCUMENTS, ROUTE_APP_MOBILE, ROUTE_APP_WEB, estRouteDocuments, estRouteAppMobile, estRouteAppWeb, trouverDocument } from './routesDocuments.js'
import ContactNoe, { EmailModal } from './ContactNoe.jsx'
import Footer from './Footer.jsx'
import Legales from './Legales.jsx'
import { BlogList, BlogArticlePage, BLOG_ARTICLES } from './Blog.jsx'
import ClientSpaceBridge from './ClientSpaceBridge.jsx'
import MaquetteVisualBridge from './MaquetteVisualBridge.jsx'
import ChatbotWidget from './chatbot/Widget'
import { trackDirectWhatsAppLead } from './metaTracking.js'
import { lienInterne, appliquerMeta, retirerPrerender } from './seo.js'
import { PageExpertise, PageMethode, PageFaq, FAQ_ITEMS } from './PagesSeo.jsx'
import { PageQuiz, PageQuizHub, quizParSlug } from './Quiz.jsx'

// ─── Chargement differe des pages hors accueil (21/09/2026) ──────────────────
//
// Les 16 maquettes, l'audit et la page projets etaient importes statiquement,
// donc livres a tout visiteur de l'accueil qui ne les ouvrira jamais. A elles
// seules les maquettes pesaient 491 Ko de source dans un bundle de 1 286 Ko.
//
// React.lazy demande a Vite de produire un fichier par page et de ne l'envoyer
// qu'au moment ou elle est demandee. Le rendu est inchange : ces pages sont
// affichees par des retours anticipes, jamais par l'accueil.
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
const AuditApp = lazy(() => import('./audit-app/AuditApp.jsx'))
const Projets = lazy(() => import('./Projets.jsx'))

const meetingSvg = '/assets/images/illustrations/meetingdev.svg'
const devSvg = '/assets/images/illustrations/devmobile.svg'
const postSvg = '/assets/images/illustrations/post.svg'
const mePhoto = '/assets/images/profile/me.webp'
const calorieIcon = '/assets/images/apps/calorie.webp'
const hushIcon = '/assets/images/apps/hushapp.webp'
const purgeIcon = '/assets/images/apps/purge.webp'
const snapIcon = '/assets/images/apps/snapmaster.webp'

// Canal de contact unique : WhatsApp (message pré-rempli pour amorcer la qualif).
// Les CTA de la landing passent d'abord par /rendez-vous. Seuls le bouton de
// cette section, le lien sous la FAQ et le bouton flottant ouvrent WhatsApp directement.
const WHATSAPP_NUMBER = '33658308210'
// Le message pré-rempli ne demande RIEN au prospect : il doit pouvoir partir
// en un seul tap. Toute question posée ici (« ton idée en 2 mots ») ajoute de
// la friction au moment où la personne est la plus motivée, et fait fuir ceux
// qui craignent de dévoiler leur idée à un inconnu. La qualification se fait
// dans la première réponse de Noé, pas dans le message pré-rempli.
const WHATSAPP_PREFILL =
  "Bonjour Noé, j'ai un projet d'application, on peut en parler ?"
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`

const SECTION_ROUTES = {
  // Depuis la refonte du 10/10/2026, /avis mène à « Pourquoi me faire confiance ? », où iront les avis clients
  // (la section Instagram qui portait l'id « avis » a été retirée).
  '/avis': {
    id: 'confiance',
    title: 'Avis clients — Noé Calmes, expert en applications mobiles & web',
    description: 'Ce que disent les clients qui ont fait confiance à Noé Calmes pour créer, reprendre ou faire évoluer leur application mobile.',
  },
  '/audit': {
    id: 'audit',
    title: 'Audit gratuit de ton application mobile | Noé Calmes',
    description: 'Fais auditer ton application mobile : analyse rapide et recommandations concrètes pour repartir sur de bonnes bases.',
  },
  '/rendez-vous': {
    id: 'contact-section',
    title: 'Écrire à Noé sur WhatsApp — Application mobile | Noé Calmes',
    description: 'Un projet d\'application mobile ? Écris directement à Noé sur WhatsApp : c\'est lui qui répond, on voit en 2 messages si ton projet tient la route. Sans engagement.',
  },
}

// Meta de la page d'accueil, alignees sur celles ecrites dans index.html.
// Necessaires parce que les pages internes ecrivent leurs propres meta : sans
// ca, revenir sur la home en navigation SPA laissait le titre et la canonique
// de la page precedente.
const META_HOME = {
  path: '/',
  title: 'Application mobile & web qui génère des revenus | Noé Calmes',
  description: "Je ne fais pas que développer ton application mobile : je la conçois pour qu'elle génère des revenus. Une application que j'ai conçue fait 13 000 €/mois.",
}

// Pastille « +20 applications déjà publiées » au-dessus du titre du hero : masquée pour l'instant
const MONTRER_PASTILLE_HERO = false

// Barre du haut (11/10/2026) : des mots que la cible comprend, qui disent ce qu'on trouve en cliquant.
// « Preuves » → « Réalisations », « Méthode » → « Étapes » (là où sont aussi le prix et le délai),
// « Audit » → « Audit express » (le nom de la carte où il mène ; « Tester mon idée » collait trop au bouton « J'ai une
// idée » juste à côté). Courts : les trois tiennent à côté du bouton dès 1024 px.
const NAV_LINKS = [
  { ancre: 'calories-proof', label: 'Réalisations' },
  { ancre: 'offre', label: 'Étapes' },
  { ancre: 'audit', label: 'Audit express' },
]

// « Pourquoi me faire confiance ? » : la comparaison avec une agence, resserrée (refonte du 10/10/2026).
const COMPARAISON_AGENCE = [
  ['À partir de 15 000 €', 'Tarif fixe, connu d’avance'],
  ['Rien à voir avant de payer', 'Ta maquette, offerte'],
  ['Un chef de projet entre vous', 'Moi, directement, 6 jours sur 7'],
  ['3 à 6 mois de développement', 'Première version : 30 jours en moyenne'],
  ['Projet livré, débrouille-toi', 'Je reste là après la mise en ligne'],
]

// Avis clients de « Pourquoi me faire confiance ? ». Vide tant que Noé n'en a pas envoyé : la section n'affiche
// alors rien de plus. Forme d'un avis : { texte: '…', nom: 'Prénom N.', application: 'Nom de l'application' }.
// N'ajouter que des avis réels, avec l'accord de la personne.
const AVIS_CLIENTS = []

// `trigger` permet de re-attacher l'observer quand la page change.
// Indispensable car les elements .reveal de la home n'existent pas tant
// qu'on est sur /audit-app, /blog, etc. Sans ce re-attachement ils
// resteraient en opacity:0 (etat CSS par defaut) au retour sur la home.
function useScrollReveal(trigger) {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const targets = root.querySelectorAll('.reveal, .reveal-stagger')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [trigger])

  return ref
}

// La home affiche les 4 premieres questions (les vraies objections, depuis la refonte du 10/10/2026), /faq
// affiche la liste complete. Une seule source (FAQ_ITEMS dans PagesSeo.jsx) : les reponses ne peuvent plus
// diverger entre les deux pages. Le balisage FAQPage de la home (scripts/generate-routes.js) prend le meme
// nombre : changer les deux ensemble.
const NB_FAQ_ACCUEIL = 4
const faqItems = FAQ_ITEMS.slice(0, NB_FAQ_ACCUEIL)

const AVAILABILITY_CHECK_DELAY_MS = 2200

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="reveal max-w-170 mx-auto flex flex-col gap-4">
      {faqItems.map(({ q, a }, i) => (
        <details
          key={q}
          open={openIndex === i}
          className="group bg-card border border-card-border rounded-[15px] px-6 py-1"
          onToggle={(e) => {
            if (e.target.open) setOpenIndex(i)
            else if (openIndex === i) setOpenIndex(null)
          }}
        >
          <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer text-text font-semibold text-[0.95rem] md:text-base">
            {q}
            <span className="text-brand text-xl shrink-0 w-6 text-center group-open:hidden">+</span>
            <span className="text-brand text-xl shrink-0 w-6 text-center hidden group-open:block">&minus;</span>
          </summary>
          <p className="pb-5 text-grey text-[0.9rem] md:text-[0.93rem] leading-relaxed">
            {a}
          </p>
        </details>
      ))}
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [spotsLoaded, setSpotsLoaded] = useState(false)
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
    if (path === '/faq') return 'page-faq'
    if (path === '/quiz') return 'quiz-hub'
    if (path.startsWith('/quiz/') && quizParSlug(path.replace('/quiz/', ''))) return 'quiz'
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
  const [currentQuiz, setCurrentQuiz] = useState(() => {
    const path = (sessionStorage.getItem('redirect') || window.location.pathname).replace(/\/+$/, '')
    return path.startsWith('/quiz/') ? quizParSlug(path.replace('/quiz/', '')) : null
  })
  const [currentArticle, setCurrentArticle] = useState(() => {
    const path = (sessionStorage.getItem('redirect') || window.location.pathname).replace(/\/$/, '')
    if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '')
      return BLOG_ARTICLES.find((a) => a.slug === slug) || null
    }
    return null
  })
  // page en trigger : quand on bascule de audit-app/blog/etc. vers home,
  // l'observer doit etre re-attache aux nouveaux elements .reveal sinon
  // ils restent invisibles (opacity: 0 par defaut dans le CSS).
  const scrollRef = useScrollReveal(page)

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

  useEffect(() => {
    // Déclenche l'indicateur de disponibilités de la section contact :
    //   - immédiatement si on arrive sur /rendez-vous (la section est forcément vue)
    //   - sinon quand la section approche du viewport (rootMargin 600px)
    // Re-run quand `page` change : si l'utilisateur bascule sur la home depuis
    // une autre page, on a besoin de remonter l'observer car la section
    // #contact-section n'existait pas au mount initial.
    if (page !== 'home') return

    if (window.location.pathname.replace(/\/$/, '') === '/rendez-vous') {
      setTimeout(() => setSpotsLoaded(true), AVAILABILITY_CHECK_DELAY_MS)
      return
    }

    const target = document.getElementById('contact-section')
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setSpotsLoaded(true), AVAILABILITY_CHECK_DELAY_MS)
          observer.disconnect()
        }
      },
      { rootMargin: '600px' }
    )

    observer.observe(target)
    return () => observer.disconnect()
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
    const pagesDeVente = ['home', 'blog', 'blog-article', 'audit-app', 'page-expertise', 'page-methode', 'page-faq', 'quiz-hub', 'quiz', 'projets']
    if (!pagesDeVente.includes(page)) return

    const MESSAGES = ['Maquette offerte pour ton app', 'Parlons de ton idée d’app']
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
    if (chemin === '/faq') return setPage('page-faq')
    if (chemin === '/quiz') return setPage('quiz-hub')
    if (chemin.startsWith('/quiz/')) {
      const quiz = quizParSlug(chemin.replace('/quiz/', ''))
      if (quiz) { setCurrentQuiz(quiz); setPage('quiz'); window.scrollTo(0, 0); return }
    }
    if (chemin === '/projets') return setPage('projets')
    if (chemin === '/blog') return setPage('blog')
    if (chemin.startsWith('/blog/')) {
      const article = BLOG_ARTICLES.find((a) => a.slug === chemin.replace('/blog/', ''))
      if (article) {
        setCurrentArticle(article)
        setPage('blog-article')
        window.scrollTo(0, 0)
        return
      }
    }
    if (chemin === '/audit-app') return setPage('audit-app')
    setPage('home')
  }

  const propsPageSeo = {
    onAccueil: goHome,
    onBookCall: goBookCall,
    onAuditApp: goAuditApp,
    onNaviguer: allerVers,
  }

  if (page === 'page-expertise') return <PageExpertise {...propsPageSeo} />
  if (page === 'page-methode') return <PageMethode {...propsPageSeo} />
  if (page === 'page-faq') return <PageFaq {...propsPageSeo} />
  if (page === 'quiz-hub') return <PageQuizHub onAccueil={goHome} onBookCall={goBookCall} onNaviguer={allerVers} />
  if (page === 'quiz' && currentQuiz) return (
    <PageQuiz quiz={currentQuiz} onAccueil={goHome} onBookCall={goBookCall} onAuditApp={goAuditApp} onNaviguer={allerVers} />
  )
  if (page === 'blog') return (
    <>
    <BlogList
      onBack={goHome}
      onBookCall={goBookCall}
      onAuditApp={goAuditApp}
      onNaviguer={allerVers}
      onArticle={(article) => {
        setCurrentArticle(article)
        setPage('blog-article')
        history.pushState(null, '', lienInterne(`/blog/${article.slug}`))
      }}
    />
    <Footer allerVers={allerVers} onLegal={(p) => openLegal(p, '/blog')} />
    </>
  )
  if (page === 'blog-article' && currentArticle) return (
    <>
    <BlogArticlePage
      article={currentArticle}
      onBack={goBlog}
      onBookCall={goBookCall}
      onAuditApp={goAuditApp}
      onArticle={(article) => {
        setCurrentArticle(article)
        history.pushState(null, '', lienInterne(`/blog/${article.slug}`))
        window.scrollTo(0, 0)
      }}
      onAccueil={goHome}
      onNaviguer={allerVers}
    />
    <Footer allerVers={allerVers} onLegal={(p) => openLegal(p, `/blog/${currentArticle.slug}`)} />
    </>
  )
  if (page === 'client-space') return <ClientSpaceBridge />
  if (page === 'maquette-visual') return <MaquetteVisualBridge />
  if (page === 'smoothride-mockups') return <Suspense fallback={null}><SmoothRideMockups /></Suspense>
  if (page === 'aretha-mockups') return <Suspense fallback={null}><ArethaMockups /></Suspense>
  if (page === 'vietcollab-mockups') return <Suspense fallback={null}><VietCollabMockups /></Suspense>
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
  if (page === 'legal') return <Legales />
  if (page === 'audit-app') return <Suspense fallback={null}><AuditApp onBack={goHome} onLegal={(p) => openLegal(p, '/audit-app')} /></Suspense>
  if (page === 'privacy') return <PolitiqueConfidentialite onBack={goLegalBack} />
  if (page === 'mentions') return <MentionsLegales onBack={goLegalBack} />
  if (page === 'cgv') return <CGV onBack={goLegalBack} />
  if (page === 'documents-index') return <DocumentsIndex onOuvrirFamille={goFamille} />
  // Les deux familles ouvrent un document de la même façon : c'est la fiche
  // elle-même qui porte son adresse, et le retour la ramène chez elle.
  const ouvrirDocument = (doc) => {
    setCurrentDoc(doc)
    setPage('document-viewer')
    history.pushState(null, '', lienInterne(doc.route))
    window.scrollTo(0, 0)
  }
  if (page === 'documents') return <Documents onOpenDocument={ouvrirDocument} />
  if (page === 'documents-web') return <DocumentsWeb onOpenDocument={ouvrirDocument} />
  // ⚠️ LE RETOUR SUIT LA FAMILLE DU DOCUMENT. Sans ça, la flèche du guide
  // « Nom de domaine » du site web ramenait sur les accès d'un projet mobile —
  // une page de comptes Apple et Google devant quelqu'un qui n'en crée aucun.
  if (page === 'document-viewer' && currentDoc) {
    return <Document doc={currentDoc} onBack={currentDoc.famille === 'app-web' ? goDocumentsWeb : goDocuments} />
  }

  return (
    <div ref={scrollRef}>
      {/* ========== NAVBAR ========== */}
      <nav className="anim-nav fixed inset-x-0 top-2.5 md:top-[18px] z-50 flex justify-center px-4 md:px-6">
        <div className="w-full max-w-210">
          <div
            className={`backdrop-blur-[12px] border border-[#70707029] shadow-[0_1px_3px_#00000017] overflow-hidden rounded-[40px] transition-[background-color] duration-300 ease-in-out ${
              menuOpen ? 'bg-[#ffffffee]' : 'bg-[#fffefc3d]'
            }`}
          >
            {/* Bar */}
            <div className="flex items-center justify-between h-[68px] px-6 md:px-7">
              {/* Brand */}
              <a href="#" className="flex items-center gap-3 min-w-0">
                <img
                  src={mePhoto}
                  alt="Noé Calmes"
                  width="40"
                  height="40"
                  className="h-10 w-10 rounded-full object-cover shrink-0"
                />
                <span className="flex flex-col gap-[5px] min-w-0">
                  <span className="font-jakarta text-text font-extrabold text-lg md:text-1xl leading-none tracking-tight truncate">
                    Noé Calmes
                  </span>
                  <span className="text-grey text-[0.68rem] md:text-[0.75rem] leading-none font-normal truncate">
                    Expert en applications mobiles & web
                  </span>
                </span>
              </a>

              {/* Desktop links (lg+) */}
              <div className="hidden lg:flex items-center gap-6">
                {NAV_LINKS.map(({ ancre, label }) => (
                  <a key={label} href={`/#${ancre}`} className="text-text text-[0.95rem] font-semibold hover:text-brand transition-colors"
                    onClick={(e) => { e.preventDefault(); document.getElementById(ancre)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); history.pushState(null, '', `/#${ancre}`) }}>
                    {label}
                  </a>
                ))}
              </div>

              {/* Right — CTA + Hamburger */}
              <div className="flex items-center gap-3">
                <a
                  href={lienInterne('/rendez-vous')}
                  onClick={goBookCall}
                  className="btn-reflet hidden sm:inline-block bg-[#131313] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-black transition-colors cursor-pointer whitespace-nowrap"
                >
                  J'ai une idée
                </a>

                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1 cursor-pointer focus:outline-none"
                >
                  <span className={`block h-[3px] w-6 rounded-full bg-text transition-all duration-300 origin-center ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
                  <span className={`block h-[3px] w-6 rounded-full bg-text transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                  <span className={`block h-[3px] w-6 rounded-full bg-text transition-all duration-300 origin-center ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
                </button>
              </div>
            </div>

            {/* Mobile menu — smooth slide down via grid-rows */}
            <div
              className={`lg:hidden grid transition-[grid-template-rows] duration-300 ease-in-out ${
                menuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-black/5 px-6 pb-5 pt-4 flex flex-col gap-3">
                  {NAV_LINKS.map(({ ancre, label }) => (
                    <a
                      key={label}
                      href={`/#${ancre}`}
                      className="text-text text-base font-medium hover:text-brand transition-colors"
                      onClick={(e) => { e.preventDefault(); setMenuOpen(false); document.getElementById(ancre)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); history.pushState(null, '', `/#${ancre}`) }}
                    >
                      {label}
                    </a>
                  ))}
                  <a
                    href={lienInterne('/rendez-vous')}
                    className="btn-reflet sm:hidden text-center bg-[#131313] text-white font-medium text-sm px-5 py-2.5 rounded-full mt-1 cursor-pointer"
                    onClick={(event) => { setMenuOpen(false); goBookCall(event) }}
                  >
                    J'ai une idée
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ========== HERO (plein écran avec gradient) ========== */}
      <section
        className="hero-bg relative min-h-screen flex items-center justify-center text-center px-3 sm:px-5 md:px-10 lg:px-16 pt-36 pb-16 sm:pt-40 md:pt-44 md:pb-24 overflow-hidden"
      >
        <div className="hero-visual" aria-hidden="true" />

        <div className="hero-content anim-hero relative z-10 max-w-4xl mx-auto w-full">
          {/* Pill — preuve apps réelles. Masquée à la demande de Noé (octobre 2026), le code reste : passer
              MONTRER_PASTILLE_HERO à true pour la remettre. */}
          {MONTRER_PASTILLE_HERO && <div className="flex justify-center mb-6 md:mb-7">
            <div className="inline-flex items-center gap-2.5 sm:gap-3 rounded-full bg-white/70 backdrop-blur-sm border border-brand-pale pl-1.5 pr-3.5 sm:pl-2 sm:pr-4 py-1 sm:py-1.5 shadow-[0_2px_14px_rgba(102,93,255,0.13)]">
              <div className="flex items-center">
                {[snapIcon, calorieIcon, purgeIcon, hushIcon].map((icon, i) => (
                  <img
                    key={i}
                    src={icon}
                    alt=""
                    width="30"
                    height="30"
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-[28%] object-cover"
                    style={{ marginLeft: i === 0 ? 0 : '-7px', zIndex: i }}
                  />
                ))}
              </div>
              <p className="text-text text-[0.74rem] sm:text-[0.82rem] md:text-[0.88rem] font-medium">
                <span className="text-brand font-bold">+20 applications</span><span className="sm:hidden"> publiées</span><span className="hidden sm:inline"> déjà publiées</span>
              </p>
            </div>
          </div>}

          {/* Titre — même direction desktop/mobile, avec des retours adaptés aux petits écrans */}
          <h1 className="font-heading text-[1.72rem] min-[360px]:text-[1.78rem] min-[375px]:text-[1.86rem] min-[414px]:text-[2.02rem] min-[430px]:text-[2.12rem] min-[480px]:text-[2.28rem] sm:text-[2.4rem] md:text-[2.85rem] lg:text-[3.3rem] font-extrabold text-text tracking-tight leading-[1.15] sm:leading-[1.16] text-balance sm:text-pretty w-full max-w-none sm:w-auto sm:max-w-none mx-auto mb-5 md:mb-7">
            <span className="sm:hidden text-text font-bold" style={{ fontFamily: "'Plus Jakarta Sans Local', 'Plus Jakarta Sans', sans-serif" }}>
              Je <span className="inline-block mx-1 text-[#4b4b4b] italic font-bold tracking-normal" style={{ fontFamily: "'Libre Baskerville', serif" }}>transforme</span> ton<br />
              idée en application qui<br />
              <span className="inline-block whitespace-nowrap bg-[linear-gradient(90deg,#6760ff,#7b73ef,#9e94ff)] bg-clip-text text-transparent py-1 -my-1">
                génère des revenus
              </span>
            </span>
            <span className="hidden sm:inline text-text font-bold" style={{ fontFamily: "'Plus Jakarta Sans Local', 'Plus Jakarta Sans', sans-serif" }}>
              Je <span className="inline-block mx-1.5 text-[#4b4b4b] italic font-bold tracking-normal" style={{ fontFamily: "'Libre Baskerville', serif" }}>transforme</span> ton idée en<br />
              app qui{' '}
              <span className="inline-block whitespace-nowrap bg-[linear-gradient(90deg,#6760ff,#7b73ef,#9e94ff)] bg-clip-text text-transparent py-1 -my-1">
                génère des revenus
              </span>
            </span>
          </h1>

          {/* Sous-titre */}
          <p className="text-grey text-[0.95rem] sm:text-[1.08rem] md:text-[1.18rem] leading-relaxed max-w-[54rem] mx-auto mb-8 md:mb-10 text-balance">
            Stratégie, design et développement&nbsp;: je&nbsp;m'occupe de tout, de l'idée à la mise en ligne.
          </p>

          {/* Bouton principal. « J'ai une idée d'application » : c'est le visiteur qui parle, il se reconnaît (refonte du
              10/10/2026, à la place de « Discuter avec Noé »). Pas de ligne dessous : « C'est moi qui réponds, sur
              WhatsApp · gratuit » répétait la barre du haut (Noé, 11/10/2026). */}
          <div className="flex flex-col items-center">
            <a
              href={lienInterne('/rendez-vous')}
              onClick={goBookCall}
              className="btn-reflet group inline-flex items-center gap-2 min-[360px]:gap-2.5 whitespace-nowrap bg-brand text-surface font-semibold text-[0.95rem] min-[360px]:text-[1rem] sm:text-[1.06rem] md:text-[1.15rem] px-5 min-[360px]:px-8 py-3.5 sm:px-9 md:px-11 md:py-[1.05rem] rounded-full cursor-pointer shadow-[0_10px_28px_-8px_rgba(102,93,255,0.55)] hover:bg-[#5a50f5] transition-colors"
            >
              J'ai une idée d'application
              <svg className="shrink-0 w-[18px] h-[18px] min-[360px]:w-[22px] min-[360px]:h-[22px] transition-transform duration-300 group-hover:translate-x-1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          {/* Film de présentation, lecteur sur le modèle d'Ikovaline : lecture auto muette, barre toujours visible */}
          <HeroVideo />
        </div>
      </section>

      {/* ========== CE QUE J'AI DÉJÀ CONSTRUIT ========== */}
      {/* Refonte du 10/10/2026. Juste après la vidéo, la preuve de ce qu'elle promet : les chiffres (l'ancienne barre
          de preuve) et les écrans, chacun légendé par son rôle (src/AppShowcase.jsx). Remplace la barre de preuve,
          « Une stratégie derrière chaque écran » et « Mon métier », qui redisaient le titre et la vidéo. L'id reste
          « calories-proof » : c'est le lien « Preuves » de la barre du haut. Le texte est écrit ici, en JSX : le
          pré-rendu pour les robots (scripts/generate-routes.js) ne lit que le texte du JSX de App. */}
      <section className="app-proof" id="calories-proof" aria-labelledby="app-proof-title">
        <div className="app-proof-inner">
          <div className="app-proof-main">
            <div className="app-proof-copy">
              <h2 id="app-proof-title" className="reveal">Ce que j'ai <span>déjà construit</span></h2>
              <p className="reveal app-proof-intro">Des applications publiées, utilisées, et qui rapportent.</p>
              <ul className="reveal-stagger app-proof-stats">
                <li>
                  <span className="app-proof-stat-icone"><img src={calorieIcon} alt="" width="36" height="36" loading="lazy" /></span>
                  <strong>13&nbsp;000&nbsp;€</strong>
                  <span>par mois pour <b>Calorie</b>, sur un marché déjà saturé</span>
                </li>
                <li>
                  <span className="app-proof-stat-icone"><img src={hushIcon} alt="" width="36" height="36" loading="lazy" /></span>
                  <strong>+300&nbsp;000</strong>
                  <span>utilisateurs pour <b>Hush App</b>, avec sa première version</span>
                </li>
                <li>
                  <span className="app-proof-stat-icone">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 16v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4" /></svg>
                  </span>
                  <strong>+900&nbsp;000</strong>
                  <span>téléchargements, toutes mes applications</span>
                </li>
                <li>
                  <span className="app-proof-stat-icone">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
                  </span>
                  <strong>+20</strong>
                  <span>applications publiées, sur les stores et en ligne</span>
                </li>
              </ul>
            </div>
            <PhoneCarousel />
          </div>
        </div>
      </section>

      {/* ========== COMMENT ÇA SE PASSE ========== */}
      {/* Refonte du 10/10/2026 : « Avant de payer un euro, je t'offre » et les étapes ne font plus qu'un. La maquette,
          le cahier des charges et le devis apparaissaient trois fois sur la page ; ils sont l'étape 2, offerte (pastille
          verte « Offert » aux étapes 1 et 2, sans phrase qui le redise au-dessus). Les illustrations sont celles que Noé
          avait choisies (meetingdev, devmobile, post) : il les a redemandées le 11/10/2026 après deux essais refusés
          (une conversation, une vraie maquette et des dessins mélangés, puis des cartes de petites lignes de texte, « pas
          lisible »). Sur téléphone, l'illustration se met à droite du début du texte, pour ne pas prendre toute la place
          (`.process-…` dans src/App.css). Les textes des étapes sont ceux validés par Noé le 10/10/2026 ; le titre de l'étape 3 est « Je
          construis » depuis le 11/10/2026 (« c'est moi qui m'occupe de tout », Noé ; avant : « On construit ensemble »). Sous les étapes,
          le prix en une ligne : il trie les budgets avant WhatsApp (la réponse de la FAQ est repliée, celle-ci se voit).
          Le bouton dit « Discuter avec Noé », la suite de l'étape 1 « On en parle ». Id « offre » : lien « Étapes ». */}
      <section className="py-14 md:py-28 px-5 bg-card" id="offre">
        <div className="max-w-275 mx-auto">
          <h2 className="reveal font-jakarta text-text text-2xl md:text-[2.1rem] font-extrabold tracking-tight text-center mb-8 md:mb-14">
            Comment <span className="text-brand">ça se passe ?</span>
          </h2>

          <ol className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-3.5 md:gap-8 max-w-262 mx-auto">
            <li className="process-card group bg-surface border border-card-border rounded-[15px] p-8 md:p-10 text-left flex flex-col transition-colors duration-300 hover:bg-brand hover:border-brand cursor-default">
              <img src={meetingSvg} alt="" loading="lazy" width="280" height="160" className="process-illustration w-full h-32 md:h-40 object-contain mb-6" />
              <div className="process-copy flex flex-col justify-start flex-1">
                <span className="process-pastilles flex items-center gap-2 mb-3">
                  <span className="text-brand text-[0.8rem] font-semibold bg-brand/10 px-3 py-1 rounded-full transition-colors duration-300 group-hover:bg-white/20 group-hover:text-white">Étape 1</span>
                  <span className="process-offert text-[#15803d] text-[0.8rem] font-bold bg-[#e7f7ed] px-3 py-1 rounded-full transition-colors duration-300 group-hover:bg-white">Offert</span>
                </span>
                <h3 className="font-heading text-text text-[1.05rem] md:text-[1.1rem] font-bold mb-2.5 transition-colors duration-300 group-hover:text-white">On en parle</h3>
                <p className="text-grey text-[0.9rem] md:text-[0.93rem] leading-relaxed transition-colors duration-300 group-hover:text-white/80">
                  Au premier appel, on discute de ton idée et je te donne des conseils concrets pour bien la lancer. Tu repars avec un avis clair, même si on ne travaille pas ensemble.
                </p>
              </div>
            </li>
            <li className="process-card group bg-surface border border-card-border rounded-[15px] p-8 md:p-10 text-left flex flex-col transition-colors duration-300 hover:bg-brand hover:border-brand cursor-default">
              <img src={devSvg} alt="" loading="lazy" width="280" height="160" className="process-illustration w-full h-32 md:h-40 object-contain mb-6" />
              <div className="process-copy flex flex-col justify-start flex-1">
                <span className="process-pastilles flex items-center gap-2 mb-3">
                  <span className="text-brand text-[0.8rem] font-semibold bg-brand/10 px-3 py-1 rounded-full transition-colors duration-300 group-hover:bg-white/20 group-hover:text-white">Étape 2</span>
                  <span className="process-offert text-[#15803d] text-[0.8rem] font-bold bg-[#e7f7ed] px-3 py-1 rounded-full transition-colors duration-300 group-hover:bg-white">Offert</span>
                </span>
                <h3 className="font-heading text-text text-[1.05rem] md:text-[1.1rem] font-bold mb-2.5 transition-colors duration-300 group-hover:text-white">On cadre</h3>
                <p className="text-grey text-[0.9rem] md:text-[0.93rem] leading-relaxed transition-colors duration-300 group-hover:text-white/80">
                  Après l'appel, je t'envoie un cahier des charges offert, une première maquette et un devis clair. Tu sais ce que tu vas avoir, quand, et pour combien.
                </p>
              </div>
            </li>
            <li className="process-card group bg-surface border border-card-border rounded-[15px] p-8 md:p-10 text-left flex flex-col transition-colors duration-300 hover:bg-brand hover:border-brand cursor-default">
              <img src={postSvg} alt="" loading="lazy" width="280" height="160" className="process-illustration w-full h-32 md:h-40 object-contain mb-6" />
              <div className="process-copy flex flex-col justify-start flex-1">
                <span className="process-pastilles flex items-center gap-2 mb-3">
                  <span className="text-brand text-[0.8rem] font-semibold bg-brand/10 px-3 py-1 rounded-full transition-colors duration-300 group-hover:bg-white/20 group-hover:text-white">Étape 3</span>
                </span>
                <h3 className="font-heading text-text text-[1.05rem] md:text-[1.1rem] font-bold mb-2.5 transition-colors duration-300 group-hover:text-white">Je construis</h3>
                <p className="text-grey text-[0.9rem] md:text-[0.93rem] leading-relaxed transition-colors duration-300 group-hover:text-white/80">
                  À partir de ta maquette, je crée le design final, je développe ton application et je la publie sur les stores ou sur le web. Après la mise en ligne, je reste disponible pour la faire évoluer.
                </p>
              </div>
            </li>
          </ol>

          {/* Le prix et le délai, sous les trois étapes : une seule ligne d'information pour tout le parcours (dans
              l'étape 3, il la rendait deux fois plus haute que les autres) */}
          <p className="reveal etape-tarif">
            <strong>Tarif fixe</strong>, en général une dizaine de milliers d'euros&nbsp;: stratégie, maquette, développement et mise en ligne. <strong>Première version en 30&nbsp;jours</strong> en moyenne.
          </p>

          <div className="reveal flex flex-col items-center mt-8 md:mt-12">
            <a
              href={lienInterne('/rendez-vous')}
              onClick={goBookCall}
              className="btn-reflet group inline-flex items-center gap-2 min-[360px]:gap-2.5 whitespace-nowrap bg-brand text-surface font-semibold text-[0.95rem] md:text-base px-5 min-[360px]:px-8 py-3.5 md:px-10 md:py-4 rounded-full cursor-pointer"
            >
              Discuter avec Noé
              <svg className="shrink-0 w-[18px] h-[18px] min-[360px]:w-[22px] min-[360px]:h-[22px] transition-transform duration-300 group-hover:translate-x-1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ========== POURQUOI ME FAIRE CONFIANCE ========== */}
      {/* Refonte du 10/10/2026 : la vraie réponse à la question, c'est Noé lui-même (photo, ce qu'il fait, ses propres
          applications), puis la comparaison avec une agence, resserrée. Les avis clients iront dans AVIS_CLIENTS (vide
          pour l'instant : rien n'est affiché). Id « confiance » : la route /avis y mène. */}
      <section className="py-16 md:py-28 px-5" id="confiance">
        <div className="max-w-275 mx-auto">
          <p className="reveal text-brand font-semibold text-[0.78rem] tracking-widest uppercase text-center mb-3">
            Qui je suis
          </p>
          <h2 className="reveal font-jakarta text-text text-2xl md:text-[2.1rem] font-extrabold tracking-tight text-center mb-8 md:mb-14">
            Pourquoi me faire <span className="text-brand">confiance ?</span>
          </h2>

          <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-262 mx-auto">
            <div className="rounded-[20px] bg-brand-wash border border-brand/20 p-6 md:p-8">
              <div className="flex items-center gap-4 mb-6">
                <img src={mePhoto} alt="Noé Calmes" width="80" height="80" loading="lazy" className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover shadow-sm shrink-0" />
                <div>
                  <p className="font-jakarta text-text font-extrabold text-[1.2rem] md:text-[1.3rem] tracking-tight leading-tight">Noé Calmes</p>
                  <p className="text-grey text-[0.85rem] mt-0.5">Expert en applications mobiles &amp; web</p>
                </div>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-text text-[0.93rem] md:text-[0.95rem] leading-relaxed">
                  <svg className="shrink-0 mt-0.5 text-brand" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                  <span><strong>Je fais tout moi-même&nbsp;:</strong> la stratégie, les écrans et le développement.</span>
                </li>
                <li className="flex items-start gap-3 text-text text-[0.93rem] md:text-[0.95rem] leading-relaxed">
                  <svg className="shrink-0 mt-0.5 text-brand" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                  <span><strong>Je vois passer une dizaine d'idées par semaine.</strong> Je sais vite ce qui peut marcher.</span>
                </li>
                <li className="flex items-start gap-3 text-text text-[0.93rem] md:text-[0.95rem] leading-relaxed">
                  <svg className="shrink-0 mt-0.5 text-brand" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                  <span><strong>Mes propres applications sont en ligne&nbsp;:</strong> WakeUp Alarme et Plouff Habitudes.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-[20px] border border-card-border bg-surface overflow-hidden flex flex-col">
              <div className="grid grid-cols-2 text-[0.85rem] md:text-[0.9rem] font-bold">
                <p className="px-4 md:px-6 py-3.5 text-grey bg-card">Une agence</p>
                <p className="px-4 md:px-6 py-3.5 text-brand bg-brand/6">Avec moi</p>
              </div>
              {COMPARAISON_AGENCE.map(([agence, moi]) => (
                <div key={moi} className="grid grid-cols-2 border-t border-card-border flex-1">
                  <p className="flex items-start gap-2 px-4 md:px-6 py-3.5 text-grey text-[0.82rem] md:text-[0.88rem] leading-snug">
                    <svg className="shrink-0 mt-px text-red-text" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    {agence}
                  </p>
                  <p className="flex items-start gap-2 px-4 md:px-6 py-3.5 text-text font-semibold text-[0.82rem] md:text-[0.88rem] leading-snug bg-brand/3">
                    <svg className="shrink-0 mt-px text-brand" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                    {moi}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {AVIS_CLIENTS.length > 0 && (
            <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-262 mx-auto mt-4 md:mt-8">
              {AVIS_CLIENTS.map(({ texte, nom, application }) => (
                <figure key={nom} className="rounded-[20px] border border-card-border bg-surface p-6 text-left">
                  <blockquote className="text-text text-[0.95rem] leading-relaxed">« {texte} »</blockquote>
                  <figcaption className="mt-4 text-grey text-[0.85rem]"><strong className="text-text">{nom}</strong>, {application}</figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========== ON EST FAITS POUR TRAVAILLER ENSEMBLE ? ========== */}
      {/* Refonte du 10/10/2026, titre et lignes revus le 11/10/2026 avec Noé : remplace « Ce que je fais / Ce que je ne
          fais pas ». Écarte avant WhatsApp ceux que Noé ne prend pas. Pas de « site vitrine » dans les « non » : Noé en
          fait quand il le faut. Pas de « une seule personne » : le client veut un résultat, peu lui importe combien de
          personnes y travaillent. */}
      <section className="py-14 md:py-28 px-5 bg-card" id="pour-qui">
        <div className="max-w-240 mx-auto">
          <p className="reveal text-brand font-semibold text-[0.78rem] tracking-widest uppercase text-center mb-3">
            Pour qui
          </p>
          <h2 className="reveal font-jakarta text-text text-2xl md:text-[2.1rem] font-extrabold tracking-tight text-center mb-8 md:mb-14">
            On est faits pour <span className="text-brand">travailler ensemble ?</span>
          </h2>
          <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="bg-surface border border-brand/25 rounded-[18px] p-6 md:p-8">
              <p className="text-brand font-bold text-[1.05rem] mb-5">Oui, si…</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-text text-[0.95rem] font-medium leading-relaxed">
                  <svg className="shrink-0 mt-0.5 text-brand" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                  Tu as une idée d'application et un budget prévu pour la lancer.
                </li>
                <li className="flex items-start gap-3 text-text text-[0.95rem] font-medium leading-relaxed">
                  <svg className="shrink-0 mt-0.5 text-brand" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                  Tu veux une application qui te rapporte des revenus chaque mois.
                </li>
                <li className="flex items-start gap-3 text-text text-[0.95rem] font-medium leading-relaxed">
                  <svg className="shrink-0 mt-0.5 text-brand" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                  Tu veux un résultat, sans avoir à t'occuper de la technique.
                </li>
              </ul>
            </div>
            <div className="bg-surface border border-card-border rounded-[18px] p-6 md:p-8">
              <p className="text-grey font-bold text-[1.05rem] mb-5">Non, si…</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-grey text-[0.95rem] font-medium leading-relaxed">
                  <svg className="shrink-0 mt-0.5 text-red-text" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  Tu veux juste un développeur qui exécute tes consignes.
                </li>
                <li className="flex items-start gap-3 text-grey text-[0.95rem] font-medium leading-relaxed">
                  <svg className="shrink-0 mt-0.5 text-red-text" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  Tu cherches le prix le plus bas.
                </li>
                <li className="flex items-start gap-3 text-grey text-[0.95rem] font-medium leading-relaxed">
                  <svg className="shrink-0 mt-0.5 text-red-text" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  Tu vois ton application comme une dépense, pas comme un investissement.
                </li>
                <li className="flex items-start gap-3 text-grey text-[0.95rem] font-medium leading-relaxed">
                  <svg className="shrink-0 mt-0.5 text-red-text" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  Tu cherches quelqu'un pour faire ta publicité.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="py-14 md:py-28 px-5 bg-white" id="faq">
        <div className="max-w-275 mx-auto">
          <p className="reveal text-brand font-semibold text-[0.78rem] tracking-widest uppercase text-center mb-3">
            Questions fréquentes
          </p>
          <h2 className="reveal font-jakarta text-text text-2xl md:text-[2.1rem] font-extrabold tracking-tight text-center mb-6 md:mb-14">
            Pour y voir <span className="text-brand">plus clair</span>
          </h2>
          <FaqAccordion />
          <p className="reveal mt-6 text-center text-grey text-[0.9rem] leading-relaxed">
            Une autre question ?{' '}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackDirectWhatsAppLead('home_faq')}
              className="inline-block font-semibold text-brand underline underline-offset-4 decoration-brand/40 hover:decoration-brand focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-4"
            >
              Écris-moi sur WhatsApp.
            </a>
          </p>
        </div>
      </section>

      {/* ========== DERNIER APPEL : WHATSAPP, PUIS L'AUDIT ========== */}
      {/* Refonte du 10/10/2026 : le contact et l'audit dans la même section, à la fin. L'audit passe en second choix
          (« Pas encore prêt à écrire ? »), sous le bouton WhatsApp ; il garde l'id « audit » (lien « Audit » de la barre
          du haut, route /audit). La section Instagram, qui faisait quitter la page juste avant la fin, est retirée :
          l'icône reste dans le pied de page. */}
      <section className="py-16 md:py-28 px-5 bg-card" id="contact-section">
        <div className="max-w-275 mx-auto text-center">
          {/* Les disponibilités, dans une pastille au fond léger (même style que « Audit express · 2 min ») */}
          {/* Le fond de la pastille n'apparaît qu'avec le texte des places : pendant la vérification, on ne voyait que le fond
              (Noé, 11/10/2026) */}
          <p className="reveal flex justify-center mb-4 min-h-[1.85rem]">
            <span className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.72rem] md:text-[0.78rem] leading-none transition-colors duration-300 ${spotsLoaded ? 'bg-brand/6 border-brand/12' : 'bg-transparent border-transparent'}`}>
              {spotsLoaded ? (
                <>
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                  </span>
                  <strong className="text-text font-semibold animate-fadeIn">2 projets par mois · 1 place disponible en {new Date().toLocaleString('fr-FR', { month: 'long' })}</strong>
                </>
              ) : (
                <span className="inline-flex gap-1.5 items-center text-grey/60">
                  <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                  Vérification des disponibilités…
                </span>
              )}
            </span>
          </p>
          <h2 className="reveal font-jakarta text-text text-2xl md:text-[2.1rem] font-extrabold tracking-tight mb-3 md:mb-4">
            Parlons de <span className="text-brand">ton projet</span>
          </h2>
          <p className="reveal text-grey text-[0.95rem] md:text-[1.05rem] leading-relaxed max-w-130 mx-auto mb-2">
            Une idée, ou une application déjà en ligne&nbsp;? Écris-moi&nbsp;: je regarde ton projet et je te dis comment avancer.
          </p>
          <div className="reveal flex flex-col items-center gap-3 mt-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackDirectWhatsAppLead('home_contact')}
              className="btn-reflet group inline-flex items-center gap-2 min-[360px]:gap-2.5 whitespace-nowrap bg-brand text-surface font-semibold text-[0.95rem] md:text-base px-5 min-[360px]:px-8 py-3.5 md:px-10 md:py-4 rounded-full cursor-pointer"
            >
              <svg className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.057 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.562-5.338 11.897-11.9 11.897a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.82 9.82 0 001.5 5.211l-.999 3.648 3.998-1.171z"/></svg>
              <span>Discuter avec Noé</span>
            </a>
            <div className="flex items-center gap-3 mt-6 max-w-xs sm:max-w-md mx-auto px-2 text-left">
              <img src={mePhoto} alt="Noé Calmes" loading="lazy" width="40" height="40" className="w-10 h-10 rounded-full object-cover shadow-sm shrink-0" />
              <span className="text-grey text-xs md:text-sm">
                <strong className="text-text">Tu bosses direct avec moi.</strong> C&apos;est moi qui réponds, pas un bot, pas un commercial.
              </span>
            </div>
          </div>

          <div id="audit" className="reveal relative overflow-hidden mt-16 md:mt-20 max-w-150 mx-auto rounded-[24px] md:rounded-[28px] border border-brand/10 bg-white px-5 py-8 md:px-10 md:py-9 shadow-[0_20px_55px_-44px_rgba(102,93,255,0.55)]">
            <div className="pointer-events-none absolute -top-24 -right-24 w-60 h-60 rounded-full bg-[#665dff] opacity-[0.1] blur-[58px]" />
            <div className="relative">
              <p className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/6 border border-brand/12 mb-4">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
                </span>
                <span className="font-jakarta text-text text-[0.7rem] font-extrabold tracking-widest uppercase">Audit express · 2 min</span>
              </p>
              <p className="font-jakarta text-text font-extrabold text-[1.3rem] md:text-[1.55rem] tracking-tight leading-tight mb-2">
                Pas encore prêt à écrire&nbsp;?
              </p>
              <p className="text-grey text-[0.92rem] md:text-[0.98rem] leading-relaxed max-w-110 mx-auto mb-6">
                Teste ton idée&nbsp;: potentiel, budget et délai, en 2 minutes, sans appel.
              </p>
              <button
                type="button"
                onClick={goAuditApp}
                className="btn-reflet group inline-flex items-center gap-2.5 bg-[#131313] text-white font-semibold text-[0.92rem] md:text-[0.95rem] px-7 py-3 md:px-8 md:py-3.5 rounded-full cursor-pointer"
              >
                Lancer mon audit
                <svg className="transition-transform duration-300 group-hover:translate-x-1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              <p className="text-grey/60 text-[0.78rem] mt-3">Gratuit · résultat immédiat</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <Footer allerVers={allerVers} onLegal={openLegal} />

      {/* Widget flottant : le systeme IA reste disponible dans ChatbotWidget,
          mais on teste actuellement un bouton qui ouvre WhatsApp directement. */}
      <ChatbotWidget onBookCall={goBookCall} contactMode="whatsapp" />

    </div>
  )
}

export default App
