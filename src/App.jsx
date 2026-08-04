import { useState, useEffect, useRef } from 'react'
import './App.css'
import PolitiqueConfidentialite from './PolitiqueConfidentialite.jsx'
import MentionsLegales from './MentionsLegales.jsx'
import CGV from './CGV.jsx'
import Document from './Document.jsx'
import Documents, { DOCUMENTS } from './Documents.jsx'
import ContactNoe, { EmailModal } from './ContactNoe.jsx'
import Legales from './Legales.jsx'
import { BlogList, BlogArticlePage, BLOG_ARTICLES } from './Blog.jsx'
import AuditApp from './audit-app/AuditApp.jsx'
import SmoothRideMockups from './SmoothRideMockups.jsx'
import ArethaMockups from './ArethaMockups.jsx'
import PacAssistMockups from './PacAssistMockups.jsx'
import CoachAppMockups from './CoachAppMockups.jsx'
import BlushMockups from './BlushMockups.jsx'
import MoovYeMockups from './MoovYeMockups.jsx'
import ConvoiPiloteMockups from './ConvoiPiloteMockups.jsx'
import ColocoolMockups from './ColocoolMockups.jsx'
import PetSolidariteMockups from './PetSolidariteMockups.jsx'
import SonoraMockups from './SonoraMockups.jsx'
import BagSitterMockups from './BagSitterMockups.jsx'
import BailoraMockups from './BailoraMockups.jsx'
import GuestRideMockups from './GuestRideMockups.jsx'
import Projets from './Projets.jsx'
import ClientSpaceBridge from './ClientSpaceBridge.jsx'
import MaquetteVisualBridge from './MaquetteVisualBridge.jsx'
import ChatbotWidget from './chatbot/Widget'
import { trackDirectWhatsAppLead } from './metaTracking.js'
import { ExternalLink } from 'lucide-react'

const meetingSvg = '/assets/images/illustrations/meetingdev.svg'
const devSvg = '/assets/images/illustrations/devmobile.svg'
const postSvg = '/assets/images/illustrations/post.svg'
const mePhoto = '/assets/images/profile/me.webp'
const calorieIcon = '/assets/images/apps/calorie.webp'
const hushIcon = '/assets/images/apps/hushapp.webp'
const purgeIcon = '/assets/images/apps/purge.webp'
const snapIcon = '/assets/images/apps/snapmaster.png'
const calorieVisuel = '/assets/images/apps/calorievisuelle.png'

// Canal de contact unique : WhatsApp (message pré-rempli pour amorcer la qualif).
// Les CTA de la landing passent d'abord par /rendez-vous. Seuls le bouton de
// cette section et le bouton flottant ouvrent WhatsApp directement.
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
  '/expertise': {
    id: 'calories-proof',
    title: 'Pourquoi travailler avec Noé Calmes — Expert en applications mobiles',
    description: 'Expert en applications mobiles indépendant. Création, reprise et évolution d\'applications iOS et Android — de la stratégie au lancement, pour les entreprises en France.',
  },
  '/creation-application-mobile': {
    id: 'offre',
    title: 'Méthode de création d\'application mobile | Noé Calmes',
    description: 'Découvre ma méthode pour créer ton application mobile : cadrage clair, développement, puis lancement sur l\'App Store et Google Play.',
  },
  '/etapes': {
    id: 'offre',
    title: 'Méthode de création d\'application mobile | Noé Calmes',
    description: 'Découvre ma méthode pour créer ton application mobile : cadrage clair, développement, puis lancement sur l\'App Store et Google Play.',
    canonicalPath: '/creation-application-mobile',
  },
  '/avis': {
    id: 'avis',
    title: 'Avis clients — Noé Calmes, expert en applications mobiles',
    description: 'Ce que disent les clients qui ont fait confiance à Noé Calmes pour créer, reprendre ou faire évoluer leur application mobile.',
  },
  '/faq': {
    id: 'faq',
    title: 'FAQ — Création d\'application mobile | Noé Calmes',
    description: 'Questions fréquentes sur la création, la reprise et l\'évolution d\'application mobile : délais, tarifs, livraison et suivi après mise en ligne.',
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

const NAV_LINKS = [
  { href: '/expertise', label: 'Preuves' },
  { href: '/creation-application-mobile', label: 'Méthode' },
  { href: '/audit', label: 'Audit' },
]

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

const faqItems = [
  { q: 'Comment fonctionne la tarification ?', a: 'Tarif fixe, défini avant de commencer : en général 5 à 12k en mobile selon la complexité. Pas de compteur qui tourne, tu sais exactement ce que tu paies. Et tu vois une maquette de ton application avant de décider quoi que ce soit.' },
  { q: 'Combien de temps faut-il pour avoir une application mobile ?', a: 'Une première version en 4 à 6 semaines en moyenne. Pour une application complète, le délai dépend du périmètre, on le cale ensemble.' },
  { q: 'Après la livraison de l\'application ?', a: 'Je disparais pas après la mise en ligne : corrections, mises à jour, évolutions, accompagnement, je reste dispo. On définit ensemble ce qui est nécessaire selon comment ton app évolue.' },
]

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
  const [footerEmailOpen, setFooterEmailOpen] = useState(false)
  const [legalReturnPath, setLegalReturnPath] = useState('/')
  const [currentDoc, setCurrentDoc] = useState(() => {
    const path = sessionStorage.getItem('redirect') || window.location.pathname
    return DOCUMENTS.find((d) => d.route === path) || null
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
    if (path === '/espace-client' || path.startsWith('/espace-client/')) return 'client-space'
    if (path === '/maquette-visuel' || path.startsWith('/maquette-visuel/')) return 'maquette-visual'
    if (path === '/documents') return 'documents'
    if (path === '/contactnoe') return 'contact'
    if (path === '/legal') return 'legal'
    if (path === '/audit-app') return 'audit-app'
    if (path === '/cgv') return 'cgv'
    if (path === '/mentions') return 'mentions'
    if (path === '/privacy') return 'privacy'
    if (path === '/blog') return 'blog'
    if (path.startsWith('/blog/')) return 'blog-article'
    if (path.toLowerCase() === '/projets' || path.toLowerCase() === '/projet') return 'projets'
    // Maquettes SmoothRide — page autonome (sans navbar/footer landing-page).
    // Restreint à /maquette/smoothride (case-insensitive) uniquement. Toute
    // autre URL /maquette/xxx retombe sur la home (pas de leak vers SmoothRide
    // pour un slug inconnu).
    if (path.toLowerCase() === '/maquette/smoothride') return 'smoothride-mockups'
    if (path.toLowerCase() === '/maquette/aretha') return 'aretha-mockups'
    if (['/maquette/pac-assist', '/maquette/cvc-assist', '/maquette/pacassist', '/maquette/cvcassist'].includes(path.toLowerCase())) return 'pac-assist-mockups'
    if (['/maquette/kingfit-coach', '/maquette/kingfit', '/maquette/coach-app', '/maquette/app-coach'].includes(path.toLowerCase())) return 'coach-app-mockups'
    if (['/maquette/blush', '/maquette/blush-rencontre', '/maquette/blushrencontre'].includes(path.toLowerCase())) return 'blush-mockups'
    if (['/maquette/moovye', '/maquette/moov-ye'].includes(path.toLowerCase())) return 'moovye-mockups'
    if (['/maquette/convoipilote', '/maquette/convoi-pilote'].includes(path.toLowerCase())) return 'convoipilote-mockups'
    if (['/maquette/colocool', '/maquette/coloccool'].includes(path.toLowerCase())) return 'colocool-mockups'
    if (['/maquette/pet-solidarite', '/maquette/petsolidarite', '/maquette/pet-solidarité'].includes(path.toLowerCase())) return 'pet-solidarite-mockups'
    if (['/maquette/sonora'].includes(path.toLowerCase())) return 'sonora-mockups'
    if (['/maquette/bagsitter', '/maquette/bag-sitter'].includes(path.toLowerCase())) return 'bagsitter-mockups'
    if (path.toLowerCase() === '/maquette/bailora') return 'bailora-mockups'
    if (['/maquette/guestride', '/maquette/guest-ride'].includes(path.toLowerCase())) return 'guestride-mockups'
    if (DOCUMENTS.some((d) => d.route === path)) return 'document-viewer'
    if (path in SECTION_ROUTES) return 'home'
    return 'home'
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

  // Auto-scroll vers la section et mise à jour des meta tags si on arrive sur une route de section
  useEffect(() => {
    const path = window.location.pathname.replace(/\/$/, '') || '/'
    const section = SECTION_ROUTES[path]
    if (section) {
      const canonicalPath = section.canonicalPath || path
      document.title = section.title
      document.querySelector('meta[name="description"]')?.setAttribute('content', section.description)
      document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://noecalmes.fr${canonicalPath}`)
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', section.title)
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', section.description)
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', `https://noecalmes.fr${canonicalPath}`)
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

  const goHome = () => { setPage('home'); history.pushState(null, '', '/'); window.scrollTo(0, 0) }

  const goDocuments = () => { setPage('documents'); history.pushState(null, '', '/documents'); window.scrollTo(0, 0) }

  const goBlog = () => { setPage('blog'); history.pushState(null, '', '/blog'); window.scrollTo(0, 0) }

  const goAuditApp = () => { setPage('audit-app'); history.pushState(null, '', '/audit-app'); window.scrollTo(0, 0) }

  // Point de passage commun a tous les CTA de contact de la landing. Depuis
  // une page secondaire, on remonte la home avant de scroller vers la section.
  const goBookCall = (event) => {
    event?.preventDefault?.()
    setPage('home')
    history.pushState(null, '', '/rendez-vous')

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
    history.pushState(null, '', `/${target}`)
    window.scrollTo(0, 0)
  }

  const goLegalBack = () => {
    if (legalReturnPath === '/audit-app') {
      setPage('audit-app')
      history.pushState(null, '', '/audit-app')
      window.scrollTo(0, 0)
      return
    }

    setPage('home')
    history.pushState(null, '', legalReturnPath || '/')

    const section = SECTION_ROUTES[legalReturnPath]
    if (section) {
      setTimeout(() => {
        document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } else {
      window.scrollTo(0, 0)
    }
  }

  if (page === 'blog') return (
    <BlogList
      onBack={goHome}
      onBookCall={goBookCall}
      onArticle={(article) => {
        setCurrentArticle(article)
        setPage('blog-article')
        history.pushState(null, '', `/blog/${article.slug}`)
      }}
    />
  )
  if (page === 'blog-article' && currentArticle) return (
    <BlogArticlePage
      article={currentArticle}
      onBack={goBlog}
      onBookCall={goBookCall}
      onAuditApp={goAuditApp}
    />
  )
  if (page === 'client-space') return <ClientSpaceBridge />
  if (page === 'maquette-visual') return <MaquetteVisualBridge />
  if (page === 'smoothride-mockups') return <SmoothRideMockups />
  if (page === 'aretha-mockups') return <ArethaMockups />
  if (page === 'pac-assist-mockups') return <PacAssistMockups />
  if (page === 'coach-app-mockups') return <CoachAppMockups />
  if (page === 'blush-mockups') return <BlushMockups />
  if (page === 'moovye-mockups') return <MoovYeMockups />
  if (page === 'convoipilote-mockups') return <ConvoiPiloteMockups />
  if (page === 'colocool-mockups') return <ColocoolMockups />
  if (page === 'pet-solidarite-mockups') return <PetSolidariteMockups />
  if (page === 'sonora-mockups') return <SonoraMockups />
  if (page === 'bagsitter-mockups') return <BagSitterMockups />
  if (page === 'bailora-mockups') return <BailoraMockups />
  if (page === 'guestride-mockups') return <GuestRideMockups />
  if (page === 'projets') return <Projets onBack={goHome} />
  if (page === 'contact') return <ContactNoe />
  if (page === 'legal') return <Legales />
  if (page === 'audit-app') return <AuditApp onBack={goHome} onLegal={(p) => openLegal(p, '/audit-app')} />
  if (page === 'privacy') return <PolitiqueConfidentialite onBack={goLegalBack} />
  if (page === 'mentions') return <MentionsLegales onBack={goLegalBack} />
  if (page === 'cgv') return <CGV onBack={goLegalBack} />
  if (page === 'documents') return (
    <Documents
      onBack={goHome}
      onOpenDocument={(doc) => {
        setCurrentDoc(doc)
        setPage('document-viewer')
        history.pushState(null, '', doc.route)
        window.scrollTo(0, 0)
      }}
    />
  )
  if (page === 'document-viewer' && currentDoc) return <Document doc={currentDoc} onBack={goDocuments} />

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
                    Expert en applications mobiles
                  </span>
                </span>
              </a>

              {/* Desktop links (lg+) */}
              <div className="hidden lg:flex items-center gap-6">
                {NAV_LINKS.map(({ href, label }) => (
                  <a key={label} href={href} className="text-text text-[0.95rem] font-semibold hover:text-brand transition-colors"
                    onClick={(e) => { e.preventDefault(); document.getElementById(SECTION_ROUTES[href].id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); history.pushState(null, '', href) }}>
                    {label}
                  </a>
                ))}
              </div>

              {/* Right — CTA + Hamburger */}
              <div className="flex items-center gap-3">
                <a
                  href="/rendez-vous"
                  onClick={goBookCall}
                  className="hidden sm:inline-block bg-[#131313] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-black transition-colors cursor-pointer"
                >
                  Discuter avec Noé
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
                  {NAV_LINKS.map(({ href, label }) => (
                    <a
                      key={label}
                      href={href}
                      className="text-text text-base font-medium hover:text-brand transition-colors"
                      onClick={(e) => { e.preventDefault(); setMenuOpen(false); document.getElementById(SECTION_ROUTES[href].id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); history.pushState(null, '', href) }}
                    >
                      {label}
                    </a>
                  ))}
                  <a
                    href="/rendez-vous"
                    className="min-[480px]:hidden text-center bg-[#131313] text-white font-medium text-sm px-5 py-2.5 rounded-full mt-1 cursor-pointer"
                    onClick={(event) => { setMenuOpen(false); goBookCall(event) }}
                  >
                    Discuter avec Noé
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ========== HERO (plein écran avec gradient) ========== */}
      <section
        className="hero-bg relative min-h-screen flex items-center justify-center text-center px-3 sm:px-5 md:px-10 lg:px-16 pt-28 pb-28 md:pt-40 md:pb-32 overflow-hidden"
      >
        <div className="hero-visual" aria-hidden="true" />

        <div className="hero-content anim-hero relative z-10 max-w-3xl mx-auto w-full">
          {/* Pill — preuve apps réelles */}
          <div className="flex justify-center mb-7 md:mb-9">
            <div className="inline-flex items-center gap-2.5 sm:gap-3 rounded-full bg-white/70 backdrop-blur-sm border border-brand-pale pl-1.5 pr-3.5 sm:pl-2 sm:pr-4 py-1 sm:py-1.5 shadow-[0_2px_14px_rgba(102,93,255,0.13)]">
              <div className="flex items-center">
                {[snapIcon, calorieIcon, purgeIcon, hushIcon].map((icon, i) => (
                  <img
                    key={i}
                    src={icon}
                    alt=""
                    width="30"
                    height="30"
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-[28%] border border-white object-cover"
                    style={{ marginLeft: i === 0 ? 0 : '-7px', zIndex: i }}
                  />
                ))}
              </div>
              <p className="text-text text-[0.74rem] sm:text-[0.82rem] md:text-[0.88rem] font-medium">
                <span className="text-brand font-bold">+20 applications</span><span className="sm:hidden"> publiées</span><span className="hidden sm:inline"> déjà publiées</span>
              </p>
            </div>
          </div>

          {/* Titre — même direction desktop/mobile, avec des retours adaptés aux petits écrans */}
          <h1 className="font-heading text-[1.72rem] min-[375px]:text-[1.8rem] min-[414px]:text-[1.95rem] min-[430px]:text-[2.05rem] min-[480px]:text-[2.2rem] sm:text-[2.34rem] md:text-[2.72rem] lg:text-[3.08rem] font-extrabold text-text tracking-tight leading-[1.15] sm:leading-[1.16] text-balance sm:text-pretty w-full max-w-none sm:w-auto sm:max-w-none mx-auto mb-4 md:mb-8">
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
          <p className="text-grey text-[0.92rem] sm:text-[1.08rem] md:text-[1.18rem] leading-relaxed max-w-xl mx-auto mb-9 md:mb-11">
            Je conçois ton application iOS et Android pour transformer tes utilisateurs en clients.
          </p>

          {/* Flux idée → application → revenus */}
          <div className="flex items-center justify-center gap-3 sm:gap-5 mb-9 md:mb-11 flex-wrap">
            {[
              { label: 'Ton idée', strong: false, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 22h4" /><path d="M12 2a7 7 0 00-4 12.7c.6.5 1 1.2 1 2h6c0-.8.4-1.5 1-2A7 7 0 0012 2z" /></svg> },
              { label: 'Ton application', strong: false, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M11 18h2" /></svg> },
              { label: 'Des revenus', strong: true, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 17 9 11 13 15 21 7" /><polyline points="15 7 21 7 21 13" /></svg> },
            ].map((node, i, arr) => (
              <div key={node.label} className="flex items-center gap-3 sm:gap-5">
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl border bg-white shadow-sm flex items-center justify-center ${node.strong ? 'border-brand/40 text-brand' : 'border-card-border text-text'}`}>
                    {node.icon}
                  </div>
                  <span className={`text-[0.78rem] sm:text-[0.92rem] font-semibold ${node.strong ? 'text-brand' : 'text-text'}`}>{node.label}</span>
                </div>
                {i < arr.length - 1 && (
                  <svg className="text-brand/40 shrink-0 mb-7" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                )}
              </div>
            ))}
          </div>

          {/* CTA mobile */}
          <div className="flex justify-center mb-3 sm:hidden">
            <a
              href="/rendez-vous"
              onClick={goBookCall}
              className="group inline-flex items-center gap-2 md:gap-3 bg-brand text-surface font-semibold text-[0.9rem] md:text-base px-7 py-3 md:px-9 md:py-4 rounded-full cursor-pointer"
            >
              <svg className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.057 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.562-5.338 11.897-11.9 11.897a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.82 9.82 0 001.5 5.211l-.999 3.648 3.998-1.171z"/></svg>
              <span>Écrire à Noé sur WhatsApp</span>
            </a>
          </div>

          {/* Microcopy mobile */}

          {/* CTA desktop */}
          <div className="hidden sm:flex justify-center mt-8 md:mt-10 mb-3 md:mb-5">
            <a
              href="/rendez-vous"
              onClick={goBookCall}
              className="group inline-flex items-center gap-2 md:gap-3 bg-brand text-surface font-semibold text-[0.9rem] md:text-base px-7 py-3 md:px-9 md:py-4 rounded-full cursor-pointer"
            >
              <svg className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.057 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.562-5.338 11.897-11.9 11.897a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.82 9.82 0 001.5 5.211l-.999 3.648 3.998-1.171z"/></svg>
              <span>Écrire à Noé sur WhatsApp</span>
            </a>
          </div>

        </div>
      </section>

      {/* ========== BARRE DE PREUVE ========== */}
      <section className="py-10 md:py-12 px-5 bg-card">
        <div className="max-w-275 mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-white border border-card-border shadow-sm flex items-center justify-center mb-4">
              <svg className="text-brand" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 17 9 11 13 15 21 7" /><polyline points="15 7 21 7 21 13" /></svg>
            </div>
            <p className="font-jakarta text-text font-bold text-[1.3rem] md:text-[1.55rem] tracking-tight leading-none">13 000 €/mois</p>
            <p className="text-grey text-[0.85rem] md:text-[0.92rem] font-medium mt-2">Application Calories</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-white border border-card-border shadow-sm flex items-center justify-center mb-4">
              <svg className="text-brand" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.2" /><path d="M3.5 19a5.5 5.5 0 0111 0" /><path d="M16 5.5a3 3 0 010 5.8M20.5 19a5.5 5.5 0 00-3-4.9" /></svg>
            </div>
            <p className="font-jakarta text-text font-bold text-[1.3rem] md:text-[1.55rem] tracking-tight leading-none">300k utilisateurs</p>
            <p className="text-grey text-[0.85rem] md:text-[0.92rem] font-medium mt-2">Application Hush · 1ère version</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-white border border-card-border shadow-sm flex items-center justify-center mb-4">
              <svg className="text-brand" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
            </div>
            <p className="font-jakarta text-text font-bold text-[1.3rem] md:text-[1.55rem] tracking-tight leading-none">+20 applications</p>
            <p className="text-grey text-[0.85rem] md:text-[0.92rem] font-medium mt-2">publiées sur les stores</p>
          </div>
        </div>
      </section>

      {/* ========== PREUVE CALORIES ========== */}
      <section className="py-16 md:py-22 px-5" id="calories-proof">
        <div className="max-w-275 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
            <div className="reveal shrink-0">
              <img src={calorieVisuel} alt="Calories, application rentable" loading="lazy" className="w-full max-w-[195px] md:max-w-[270px] rounded-[28px] mx-auto" />
            </div>
            <div className="reveal max-w-[520px]">
              <h2 className="font-jakarta text-text text-2xl md:text-[2.1rem] font-extrabold tracking-tight mb-5 leading-[1.15]">
                Une idée banale. Une petite application. <span className="text-brand">13 000 €/mois.</span>
              </h2>
              <p className="text-grey text-[0.95rem] md:text-[1.05rem] leading-relaxed mb-3">
                Marché saturé, idée pas révolutionnaire, peu de téléchargements.
              </p>
              <p className="text-grey text-[0.95rem] md:text-[1.05rem] leading-relaxed mb-7">
                Et pourtant elle rapporte. La différence&nbsp;: la façon dont elle est conçue pour convertir.
              </p>
              <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2 md:gap-x-2 md:gap-y-3">
                {['Arrivée', 'Onboarding', 'Essai gratuit', 'Habitude', 'Abonnement', 'Revenu récurrent'].map((step, i, arr) => (
                  <span key={step} className={`flex items-center gap-2 ${i === arr.length - 1 ? 'md:w-full md:basis-full md:mt-1' : ''}`}>
                    <span className={`inline-flex items-center gap-1 md:gap-1.5 text-[0.85rem] md:text-[0.95rem] font-semibold rounded-full px-3.5 py-2 md:px-4 md:py-2 border ${i === arr.length - 1 ? 'bg-brand text-white border-brand' : 'bg-card text-text border-card-border'}`}>
                      {i === arr.length - 1 && (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 014-4h14" /><path d="M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 01-4 4H3" /></svg>
                      )}
                      {step}
                    </span>
                    {i < arr.length - 1 && (
                      <svg className="text-grey/40 shrink-0 w-3 h-3 md:w-4 md:h-4" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CE QUE JE FAIS / PAS ========== */}
      <section className="py-16 md:py-22 px-5 bg-card" id="metier">
        <div className="max-w-230 mx-auto">
          <h2 className="reveal font-jakarta text-text text-2xl md:text-[2.1rem] font-extrabold tracking-tight text-center mb-10 md:mb-12">
            Mon métier&nbsp;: transformer tes utilisateurs <span className="text-brand">en clients</span>
          </h2>
          <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-brand/5 border border-brand/25 rounded-[15px] p-7 md:p-8">
              <p className="text-brand font-bold text-[1.05rem] mb-5">Ce que je fais</p>
              <ul className="space-y-4">
                {['Concevoir ton application pour qu\'elle transforme tes visiteurs en clients : premiers pas, essai, abonnement, fidélité.', 'Penser la monétisation avant la première ligne de code.'].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-text text-[0.95rem] font-medium leading-relaxed">
                    <svg className="shrink-0 mt-0.5 text-brand" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-surface border border-card-border rounded-[15px] p-7 md:p-8">
              <p className="text-grey font-bold text-[1.05rem] mb-5">Ce que je ne fais pas</p>
              <ul className="space-y-4">
                {['Ta communication ou ta publicité pour ramener du monde.', 'Te promettre des utilisateurs par magie.'].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-grey text-[0.95rem] font-medium leading-relaxed">
                    <svg className="shrink-0 mt-0.5 text-red-text" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="reveal text-center text-text font-semibold text-[1rem] md:text-[1.1rem] mt-7 mb-3">
            Tu amènes les gens. Je les transforme en clients.
          </p>
        </div>
      </section>

      {/* ========== AVANT DE PAYER (offre) ========== */}
      <section className="py-16 md:pt-28 md:pb-22 px-5" id="offre-livrables">
        <div className="max-w-275 mx-auto">
          <h2 className="reveal font-jakarta text-text text-2xl md:text-[2.1rem] font-extrabold tracking-tight text-center mb-10 md:mb-12">
            Avant de payer un euro, <span className="text-brand">tu repars avec</span>
          </h2>
          <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 max-w-230 mx-auto">
            <div className="bg-surface border border-card-border rounded-[15px] p-5 md:p-8 text-left flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0">
              <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center shrink-0 md:mb-5"><svg className="text-brand" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2h9l5 5v15H6z" /><path d="M14 2v6h6M9 13h6M9 17h6" /></svg></div>
              <div>
                <h3 className="font-heading text-text text-[1.05rem] font-bold mb-1 md:mb-2">Un cahier des charges</h3>
                <p className="text-grey text-[0.92rem] leading-relaxed">Ton application cadrée noir sur blanc.</p>
              </div>
            </div>
            <div className="bg-surface border border-card-border rounded-[15px] p-5 md:p-8 text-left flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0">
              <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center shrink-0 md:mb-5"><svg className="text-brand" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12l-8 8-9-9V3h8z" /><path d="M7.5 7.5h.01" /></svg></div>
              <div>
                <h3 className="font-heading text-text text-[1.05rem] font-bold mb-1 md:mb-2">Un devis clair</h3>
                <p className="text-grey text-[0.92rem] leading-relaxed">Tarif et délai fixes, définis d'avance.</p>
              </div>
            </div>
            <div className="bg-surface border border-card-border rounded-[15px] p-5 md:p-8 text-left flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0">
              <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center shrink-0 md:mb-5"><svg className="text-brand" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M11 18h2" /></svg></div>
              <div>
                <h3 className="font-heading text-text text-[1.05rem] font-bold mb-1 md:mb-2">Une maquette offerte</h3>
                <p className="text-grey text-[0.92rem] leading-relaxed">Tu vois ton application avant de décider.</p>
              </div>
            </div>
          </div>
          <p className="reveal text-center text-text font-semibold text-[1rem] md:text-[1.1rem] mt-7 mb-3">
            Comme une agence, en mieux. Sans l'intermédiaire, sans les délais.
          </p>
        </div>
      </section>

      {/* ========== LA DIFFÉRENCE ========== */}
      <section className="py-16 md:py-22 px-5 bg-card" id="difference">
        <div className="max-w-275 mx-auto">
          <p className="reveal text-brand font-semibold text-[0.78rem] tracking-widest uppercase text-center mb-3">
            La différence
          </p>
          <h2 className="reveal font-jakarta text-text text-2xl md:text-[2.1rem] font-extrabold tracking-tight text-center mb-8 md:mb-12">
            Pourquoi me faire <span className="text-brand">confiance ?</span>
          </h2>
          <div className="reveal max-w-[1040px] mx-auto grid grid-cols-1 sm:grid-cols-2 rounded-2xl border border-card-border overflow-hidden mb-10 md:mb-14">
            {/* Agences */}
            <div className="p-8 md:p-10 bg-card">
              <p className="text-text font-bold text-[1.1rem] mb-7">Agences</p>
              <ul className="space-y-5">
                {[
                  'Projet livré, débrouille-toi',
                  'Pas de maquette avant de payer',
                  'À partir de 15 000 €',
                  'Difficile à joindre',
                  '3 à 6 mois de développement',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3.5 text-grey text-[0.95rem] font-semibold leading-relaxed">
                    <svg className="shrink-0 text-red-text" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Noé */}
            <div className="p-8 md:p-10 border-t sm:border-t-0 sm:border-l border-card-border">
              <p className="text-brand font-bold text-[1.1rem] mb-7">Noé Calmes</p>
              <ul className="space-y-5">
                {[
                  'Pensé pour transformer tes utilisateurs en clients',
                  'Maquette offerte avant de payer',
                  'Tarif fixe, à partir de 5 000 €',
                  'Joignable directement 6j/7',
                  'Livraison en 4 à 6 semaines',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3.5 text-text text-[0.95rem] font-semibold leading-relaxed">
                    <svg className="shrink-0 text-brand" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item === 'Tarif fixe, à partir de 5 000 €' ? (
                      <span>
                        {item}.{' '}
                        <a
                          href="/audit-app"
                          onClick={(e) => { e.preventDefault(); goAuditApp() }}
                          className="inline-flex items-center gap-1 text-[0.9rem] text-[#2563eb] underline underline-offset-4 decoration-[#2563eb]/50 hover:text-brand hover:decoration-brand transition-colors"
                        >
                          Combien coûterait mon app&nbsp;?
                          <ExternalLink size={14} strokeWidth={2.4} aria-hidden="true" />
                        </a>
                      </span>
                    ) : item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="reveal text-center mt-6 md:mt-4">
            <a
              href="/rendez-vous"
              onClick={goBookCall}
              className="group inline-flex items-center gap-2.5 bg-brand text-surface font-semibold text-[0.95rem] md:text-base px-8 py-3.5 md:px-10 md:py-4 rounded-full cursor-pointer"
            >
               Discuter de mon projet
              <svg className="transition-transform duration-300 group-hover:translate-x-1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <p className="text-grey/60 text-[0.8rem] mt-3">Réponse directe · 100% gratuit</p>
          </div>
        </div>
      </section>

      {/* ========== PROCESS ========== */}
      <section className="py-16 md:py-22 px-5" id="offre">
        <div className="max-w-275 mx-auto">
          <h2 className="reveal font-jakarta text-text text-2xl md:text-[2.1rem] font-extrabold tracking-tight text-center mb-10 md:mb-12">
            Comment <span className="text-brand">ça se passe ?</span>
          </h2>

          <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 max-w-230 mx-auto">
            {[
              { num: '1', title: 'On cadre', desc: 'Tu me présentes ton idée. Je te fais un cahier des charges offert, une première maquette et un devis clair.', img: meetingSvg },
              { num: '2', title: 'Je conçois et développe', desc: 'Je construis ton application pour qu\'elle convertisse, pas juste pour qu\'elle existe.', img: devSvg },
              { num: '3', title: 'Tu lances', desc: 'En ligne sur l\'App Store et Google Play. Je reste dispo après.', img: postSvg },
            ].map(({ num, title, desc, img }) => (
              <div key={num} className="group bg-surface border border-card-border rounded-[15px] p-8 md:p-10 text-left flex flex-col transition-colors duration-300 hover:bg-brand hover:border-brand cursor-default">
                <img src={img} alt={title} loading="lazy" width="280" height="160" className="w-full h-32 md:h-40 object-contain mb-6" />
                <div className="flex flex-col justify-center flex-1">
                  <span className="self-start text-brand text-[0.8rem] font-semibold bg-brand/10 px-3 py-1 rounded-full mb-3 transition-colors duration-300 group-hover:bg-white/20 group-hover:text-white">
                    Étape {num}
                  </span>
                  <h3 className="font-heading text-text text-[1.05rem] md:text-[1.1rem] font-bold mb-2.5 transition-colors duration-300 group-hover:text-white">{title}</h3>
                  <p className="text-grey text-[0.9rem] md:text-[0.93rem] leading-relaxed transition-colors duration-300 group-hover:text-white/80">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CONTACT WHATSAPP ========== */}
      <section className="pt-16 md:pt-22 pb-0 md:pb-0 px-5 bg-card" id="contact-section">
        <div className="max-w-275 mx-auto text-center">
          <p className="reveal flex items-center justify-center gap-2 text-xs md:text-sm text-grey mb-3 min-h-[1.5rem]">
            {spotsLoaded ? (
              <>
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <strong className="text-text font-semibold animate-fadeIn">2 projets par mois · 1 place disponible en {new Date().toLocaleString('fr-FR', { month: 'long' })}</strong>
              </>
            ) : (
              <span className="inline-flex gap-1 items-center text-grey/50 text-xs">
                <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                Vérification des disponibilités…
              </span>
            )}
          </p>
          <h2 className="reveal font-jakarta text-text text-2xl md:text-[2.1rem] font-extrabold tracking-tight mb-3 md:mb-4">
            Parlons de <span className="text-brand">ton application</span>
          </h2>
          <p className="reveal text-grey text-[0.95rem] md:text-[1.05rem] leading-relaxed max-w-130 mx-auto mb-2">
            Une idée, ou une application déjà en ligne&nbsp;? Écris-moi&nbsp;: je regarde ton projet et je te dis comment avancer.
          </p>
          <div className="reveal flex flex-col items-center gap-3 mt-4 pb-16 md:pb-20">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackDirectWhatsAppLead('home_contact')}
              className="group inline-flex items-center gap-2.5 bg-brand text-surface font-semibold text-[0.95rem] md:text-base px-8 py-3.5 md:px-10 md:py-4 rounded-full cursor-pointer"
            >
              <svg className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.057 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.562-5.338 11.897-11.9 11.897a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.82 9.82 0 001.5 5.211l-.999 3.648 3.998-1.171z"/></svg>
              <span>Écrire à Noé sur WhatsApp</span>
            </a>
            <div className="flex items-center gap-3 mt-8 mb-4 max-w-xs sm:max-w-md mx-auto px-2 text-left">
              <img src={mePhoto} alt="Noé Calmes" loading="lazy" width="40" height="40" className="w-10 h-10 rounded-full object-cover shadow-sm shrink-0" />
              <span className="text-grey text-xs md:text-sm">
                <strong className="text-text">Tu bosses direct avec moi.</strong> C&apos;est moi qui réponds, pas un bot, pas un commercial.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========== INSTA (remplace les anciens témoignages en attendant un vrai client) ========== */}
      <section className="py-16 md:py-22 px-5" id="avis">
        <div className="max-w-275 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-8 md:gap-14 items-center">
            <div className="reveal text-center md:text-left">
              <h2 className="font-jakarta text-text text-2xl md:text-[2.1rem] font-extrabold tracking-tight mb-4">
                Je décortique tout ça <span className="text-brand">sur mon Insta</span>
              </h2>
              <p className="text-grey text-[0.95rem] md:text-[1.05rem] leading-relaxed mb-8">
                Comment une application rapporte, combien coûte un vrai projet, pourquoi 90&nbsp;% des apps ne gagnent rien.
              </p>
              <a href="https://www.instagram.com/noecalmes.app/" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2.5 bg-brand text-surface font-semibold text-[0.95rem] md:text-base px-8 py-3.5 md:px-10 md:py-4 rounded-full cursor-pointer">
                <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                <span>Voir mon Instagram</span>
              </a>
            </div>
            <div className="reveal flex justify-center md:justify-end">
              <div className="w-full max-w-[400px] overflow-hidden rounded-2xl border border-card-border bg-white" style={{ aspectRatio: '1 / 1.16' }}>
                <iframe
                  src="https://www.instagram.com/p/DZS67wXiPRM/embed"
                  title="Post Instagram de Noé Calmes"
                  className="w-full h-full block"
                  scrolling="no"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== AUDIT GRATUIT ========== */}
      <section className="pt-2 pb-12 md:pt-2 md:pb-14 px-4 md:px-6" id="audit">
        <div className="max-w-210 mx-auto">
          <div className="reveal relative overflow-hidden rounded-[28px] md:rounded-[34px] border border-brand/10 bg-white px-5 py-11 md:px-10 md:py-12 text-center shadow-[0_20px_55px_-44px_rgba(102,93,255,0.55)]">
            <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#665dff] opacity-[0.12] blur-[58px]" />

            <div className="relative">
              {/* Badge glassmorphism */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/6 border border-brand/12 mb-7 md:mb-8">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
                </span>
                <span className="font-jakarta text-text text-[0.72rem] font-extrabold tracking-widest uppercase">
                  Audit express · 2 min
                </span>
              </div>

              <h2 className="font-jakarta text-text text-[1.95rem] sm:text-[2.35rem] md:text-[2.85rem] font-extrabold tracking-tight leading-[1.08] max-w-140 mx-auto mb-5 md:mb-6">
                Les 3 réponses{' '}
                <span className="text-brand">avant d'investir 1&nbsp;€</span>
              </h2>

              <p className="text-grey text-[0.95rem] md:text-[1.05rem] max-w-115 mx-auto mb-9 md:mb-11 leading-relaxed">
                Potentiel, budget, délai. En 2 minutes, sans appel.
              </p>

              <button
                onClick={() => { setPage('audit-app'); history.pushState(null, '', '/audit-app'); window.scrollTo(0, 0) }}
                className="group inline-flex items-center gap-2.5 bg-brand text-white font-semibold text-[0.95rem] md:text-base px-8 py-3.5 md:px-10 md:py-4 rounded-full cursor-pointer"
              >
                Lancer mon audit
                <svg className="transition-transform duration-300 group-hover:translate-x-1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <p className="text-grey/60 text-[0.78rem] mt-4">
                Gratuit · résultat immédiat
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="py-16 md:py-22 px-5 bg-card" id="faq">
        <div className="max-w-275 mx-auto">
          <h2 className="reveal font-jakarta text-text text-2xl md:text-[2.1rem] font-extrabold tracking-tight text-center mb-6 md:mb-12">
            <span className="text-brand">Tes questions</span>, mes réponses
          </h2>
          <FaqAccordion />
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="reveal bg-brand py-14 px-6 relative overflow-hidden">
        {/* Background big text */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 md:bottom-6 z-0 select-none text-center font-bold leading-[0.9]"
          style={{
            fontFamily: "'Inter', Arial, sans-serif",
            fontSize: 'clamp(4rem, 12vw, 10rem)',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
            backgroundImage: 'linear-gradient(rgba(255,254,252,0.1), rgba(255,255,255,0))',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            opacity: 0,
          }}
        >
          NOE CALMES.
        </div>

        <div className="relative z-10 flex flex-col items-center text-center gap-8 max-w-275 mx-auto">
          {/* Name */}
          <p className="font-jakarta text-white font-extrabold text-xl md:text-4xl tracking-tight md:pb-3">
            Noé Calmes.
          </p>

          {/* Nav links */}
          <div className="flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-8">
            <a href="/creation-application-mobile" onClick={(e) => { e.preventDefault(); document.getElementById(SECTION_ROUTES['/creation-application-mobile'].id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); history.pushState(null, '', '/creation-application-mobile') }} className="text-white text-sm font-semibold hover:text-white/60 transition-colors">Méthode</a>
            <a href="/audit-app" onClick={(e) => { e.preventDefault(); setPage('audit-app'); history.pushState(null, '', '/audit-app'); window.scrollTo(0, 0) }} className="text-white text-sm font-semibold hover:text-white/60 transition-colors">Audit gratuit</a>
            <a href="/rendez-vous" onClick={(e) => { e.preventDefault(); document.getElementById(SECTION_ROUTES['/rendez-vous'].id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); history.pushState(null, '', '/rendez-vous') }} className="text-white text-sm font-semibold hover:text-white/60 transition-colors">Discuter avec Noé</a>
            <a href="/blog" onClick={(e) => { e.preventDefault(); goBlog() }} className="text-white text-sm font-semibold hover:text-white/60 transition-colors">Blog</a>
          </div>

          {/* Nous contacter + socials */}
          <div className="flex items-center gap-6 md:pt-1">
            <p className="text-white text-sm font-semibold">Me contacter</p>
            <button onClick={() => setFooterEmailOpen(true)} aria-label="Email" className="flex items-center justify-center text-white hover:opacity-70 transition-opacity cursor-pointer">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </button>
            <a href="https://www.linkedin.com/in/noecalmes" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex items-center justify-center text-white hover:opacity-70 transition-opacity">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/noecalmes.app/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex items-center justify-center text-white hover:opacity-70 transition-opacity">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
          </div>

          {/* Copyright + legal */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-5 w-full">
            <p className="text-white/40 text-xs">
              &copy; 2026 No&eacute; Calmes. Tous droits r&eacute;serv&eacute;s.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <button onClick={() => openLegal('cgv')} className="text-white/40 text-xs hover:text-white/80 transition-colors cursor-pointer">CGV</button>
              <button onClick={() => openLegal('mentions')} className="text-white/40 text-xs hover:text-white/80 transition-colors cursor-pointer">Mentions l&eacute;gales</button>
              <button onClick={() => openLegal('privacy')} className="text-white/40 text-xs hover:text-white/80 transition-colors cursor-pointer">Politique de confidentialit&eacute;</button>
            </div>
          </div>

        </div>
      </footer>

      {/* Widget flottant : le systeme IA reste disponible dans ChatbotWidget,
          mais on teste actuellement un bouton qui ouvre WhatsApp directement. */}
      <ChatbotWidget onBookCall={goBookCall} contactMode="whatsapp" />

      {footerEmailOpen && <EmailModal onClose={() => setFooterEmailOpen(false)} />}
    </div>
  )
}

export default App
