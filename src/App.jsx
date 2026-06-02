import { useState, useEffect, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import './App.css'
import PolitiqueConfidentialite from './PolitiqueConfidentialite.jsx'
import MentionsLegales from './MentionsLegales.jsx'
import CGV from './CGV.jsx'
import Document from './Document.jsx'
import Documents, { DOCUMENTS } from './Documents.jsx'
import ContactNoe, { EmailModal } from './ContactNoe.jsx'
import Legales from './Legales.jsx'
import Merci from './Merci.jsx'
import { BlogList, BlogArticlePage, BLOG_ARTICLES } from './Blog.jsx'
import AuditApp from './audit-app/AuditApp.jsx'
import SmoothRideMockups from './SmoothRideMockups.jsx'
import ArethaMockups from './ArethaMockups.jsx'
import PacAssistMockups from './PacAssistMockups.jsx'
import trustpilotStar from './assets/trustpilot.svg'
import meetingSvg from './assets/lib/meetingdev.svg'
import plouffIcon from './assets/appicon/plouffhabitudes.webp'
import wackupIcon from './assets/appicon/wackupalarme.webp'
import devSvg from './assets/lib/devmobile.svg'
import postSvg from './assets/lib/post.svg'
import mePhoto from './assets/lib/me.webp'
import calorieIcon from './assets/app/calorie.webp'
import hushIcon from './assets/app/hushapp.webp'
import purgeIcon from './assets/app/purge.webp'
import snapIcon from './assets/app/snapmaster.png'
import sophiePhoto from './assets/person/fille.jpeg'
import thomasPhoto from './assets/person/gars.jpeg'
import medhiPhoto from './assets/person/chefprojet.jpeg'
import ChatbotWidget from './chatbot/Widget'

const SECTION_ROUTES = {
  '/expertise': {
    id: 'why',
    title: 'Pourquoi travailler avec Noé Calmes — Expert en applications mobiles',
    description: 'Expert en applications mobiles indépendant. Création, reprise et évolution d\'applications iOS et Android — de la stratégie au lancement, pour les entreprises en France.',
  },
  '/creation-application-mobile': {
    id: 'offre',
    title: 'Méthode de création d\'application mobile | Noé Calmes',
    description: 'Découvrez ma méthode pour créer votre application mobile : cadrage clair, développement, puis lancement sur l\'App Store et Google Play.',
  },
  '/etapes': {
    id: 'offre',
    title: 'Méthode de création d\'application mobile | Noé Calmes',
    description: 'Découvrez ma méthode pour créer votre application mobile : cadrage clair, développement, puis lancement sur l\'App Store et Google Play.',
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
    title: 'Audit gratuit de votre application mobile | Noé Calmes',
    description: 'Faites auditer votre application mobile : analyse rapide et recommandations concrètes pour repartir sur de bonnes bases.',
  },
  '/rendez-vous': {
    id: 'calendly-section',
    title: 'Réserver un appel gratuit — Application mobile | Noé Calmes',
    description: 'Vous avez un projet d\'application mobile ? Réservez un appel gratuit de 30 minutes pour en discuter. Création, reprise ou évolution — sans engagement.',
  },
}

const NAV_LINKS = [
  { href: '/expertise', label: 'Expertise' },
  { href: '/creation-application-mobile', label: 'Méthode' },
  { href: '/audit', label: 'Audit' },
  { href: '/avis', label: 'Avis' },
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

const REVIEWS = [
  {
    name: 'Sophie M.',
    role: 'Fondatrice',
    text: 'Noé a livré notre MVP en 6 semaines. Communication fluide il a su challenger nos idées pour aller à l\'essentiel. Je recommande à 100%.',
    photo: sophiePhoto,
  },
  {
    name: 'Thomas R.',
    role: 'Co-fondateur',
    text: 'On avait déjà travaillé avec une agence sans résultat. Noé a repris le projet et nous a livré une app stable et performante, dans les temps et un budget très raisonnable.',
    photo: thomasPhoto,
  },
  {
    name: 'Medhi D.',
    role: 'Chef de projet',
    text: 'Un vrai plaisir de travailler avec quelqu\'un qui comprend autant la technique que le produit. Il ne se contente pas de coder, il pense business.',
    photo: medhiPhoto,
  },
]

function ReviewCard({ name, role, text, photo }) {
  return (
    <div className="bg-surface border border-card-border rounded-[15px] p-7 md:p-8 flex flex-col text-left h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.05)]">
      <p className="text-brand font-bold text-5xl leading-none mb-4 select-none">&ldquo;</p>
      <p className="text-text text-[0.93rem] leading-relaxed flex-1 mb-6 italic">{text}</p>
      <div className="flex items-center gap-3">
        <img
          src={photo}
          alt={name}
          loading="lazy"
          className="w-10 h-10 rounded-full object-cover shrink-0"
        />
        <div>
          <p className="text-text font-semibold text-[0.9rem]">{name}</p>
          <p className="text-grey text-[0.8rem]">{role}</p>
        </div>
      </div>
    </div>
  )
}

function ReviewsCarousel() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: true },
    [Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })]
  )

  return (
    <>
      {/* Mobile: Embla infinite carousel */}
      <div className="md:hidden overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {REVIEWS.map(({ name, role, text, photo }) => (
            <div key={name} className="flex-none w-[80vw] pr-4">
              <ReviewCard name={name} role={role} text={text} photo={photo} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {REVIEWS.map(({ name, role, text, photo }) => (
          <ReviewCard key={name} name={name} role={role} text={text} photo={photo} />
        ))}
      </div>
    </>
  )
}

const faqItems = [
  { q: 'Comment fonctionne la tarification ?', a: 'Tarif fixe, défini avant de commencer. Je ne suis pas une agence qui facture 20 000 € une appli — ma conviction, c\'est la transparence et l\'honnêteté. Vous savez exactement ce que vous payez, sans compteur qui tourne.' },
  { q: 'Combien de temps faut-il pour avoir une application mobile ?', a: 'Pour une première version, comptez environ 45 jours. Pour une application complète, le délai dépend du projet et de vos besoins — on définit ça ensemble.' },
  { q: 'Après la livraison de l\'application ?', a: 'Je ne disparais pas après la mise en ligne. Je reste disponible pour les corrections, les mises à jour, les nouvelles fonctionnalités et l\'accompagnement technique. Le suivi fait partie de mon approche — on définit ensemble ce qui est nécessaire selon l\'évolution de votre produit.' },
]

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
    if (path === '/merci') return 'merci'
    if (path === '/documents') return 'documents'
    if (path === '/contactnoe') return 'contact'
    if (path === '/legal') return 'legal'
    if (path === '/audit-app') return 'audit-app'
    if (path === '/cgv') return 'cgv'
    if (path === '/mentions') return 'mentions'
    if (path === '/privacy') return 'privacy'
    if (path === '/blog') return 'blog'
    if (path.startsWith('/blog/')) return 'blog-article'
    // Maquettes SmoothRide — page autonome (sans navbar/footer landing-page).
    // Restreint à /maquette/smoothride (case-insensitive) uniquement. Toute
    // autre URL /maquette/xxx retombe sur la home (pas de leak vers SmoothRide
    // pour un slug inconnu).
    if (path.toLowerCase() === '/maquette/smoothride') return 'smoothride-mockups'
    if (path.toLowerCase() === '/maquette/aretha') return 'aretha-mockups'
    if (['/maquette/pac-assist', '/maquette/cvc-assist', '/maquette/pacassist', '/maquette/cvcassist'].includes(path.toLowerCase())) return 'pac-assist-mockups'
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

  // Charge le script Calendly une seule fois (idempotent).
  // Extrait hors du useEffect pour pouvoir etre appele par goBookCall quand
  // on bascule depuis une autre page (audit-app, blog, etc.) — le useEffect
  // de mount ne suffit pas car au boot la section #calendly-section n'existe
  // pas encore dans le DOM si on n'est pas sur la home.
  const loadCalendlyScript = () => {
    if (window.Calendly || document.querySelector('script[data-calendly]')) return
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    script.dataset.calendly = '1'
    document.head.appendChild(script)
  }

  useEffect(() => {
    // Charge le script Calendly :
    //   - immédiatement si on arrive sur /rendez-vous (le widget est forcément vu)
    //   - sinon quand la section approche du viewport (rootMargin 600px)
    // Re-run quand `page` change : si l'utilisateur bascule sur la home depuis
    // une autre page, on a besoin de remonter l'observer car la section
    // #calendly-section n'existait pas au mount initial.
    if (page !== 'home') return

    if (window.location.pathname.replace(/\/$/, '') === '/rendez-vous') {
      loadCalendlyScript()
      setTimeout(() => setSpotsLoaded(true), 1200)
      return
    }

    const target = document.getElementById('calendly-section')
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadCalendlyScript()
          setTimeout(() => setSpotsLoaded(true), 1200)
          observer.disconnect()
        }
      },
      { rootMargin: '600px' }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [page])

  useEffect(() => {
    const handleCalendlyEvent = (e) => {
      if (e.data?.event === 'calendly.event_scheduled') {
        setPage('merci')
        history.pushState(null, '', '/merci')
      }
    }
    window.addEventListener('message', handleCalendlyEvent)
    return () => window.removeEventListener('message', handleCalendlyEvent)
  }, [])

  const scrollToCalendly = () => {
    document.getElementById('calendly-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    history.pushState(null, '', '/rendez-vous')
  }

  const goHome = () => { setPage('home'); history.pushState(null, '', '/'); window.scrollTo(0, 0) }

  const goDocuments = () => { setPage('documents'); history.pushState(null, '', '/documents'); window.scrollTo(0, 0) }

  const goBlog = () => { setPage('blog'); history.pushState(null, '', '/blog'); window.scrollTo(0, 0) }

  // Bascule sur la home + scroll vers la section Calendly + force le
  // chargement du script Calendly (sinon le widget reste vide quand on
  // bascule depuis /audit-app ou /blog — la section serait rendue avec sa
  // hauteur reservee mais sans contenu visible).
  // Retry du scroll avec backoff pour attendre que React rende la home.
  const goBookCall = () => {
    setPage('home')
    history.pushState(null, '', '/rendez-vous')
    loadCalendlyScript()
    setSpotsLoaded(true)
    const tryScroll = (attempts = 0) => {
      const el = document.getElementById('calendly-section')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      if (attempts >= 12) return
      setTimeout(() => tryScroll(attempts + 1), 80)
    }
    requestAnimationFrame(() => tryScroll())
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
    />
  )
  if (page === 'merci') return <Merci onBack={goHome} />
  if (page === 'smoothride-mockups') return <SmoothRideMockups />
  if (page === 'aretha-mockups') return <ArethaMockups />
  if (page === 'pac-assist-mockups') return <PacAssistMockups />
  if (page === 'contact') return <ContactNoe />
  if (page === 'legal') return <Legales />
  if (page === 'audit-app') return <AuditApp onBack={goHome} onBookCall={goBookCall} onLegal={(p) => openLegal(p, '/audit-app')} />
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
              <a href="#" className="flex flex-col gap-[7px]">
                <span className="font-jakarta text-text font-extrabold text-xl md:text-1xl leading-none tracking-tight">
                  Noé Calmes
                </span>
                <span className="text-grey text-[0.7rem] md:text-[0.75rem] leading-none font-normal">
                  Expert en applications mobiles
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
                <button
                  onClick={scrollToCalendly}
                  className="hidden min-[480px]:inline-block bg-[#131313] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-black transition-colors cursor-pointer"
                >
                  Réserver un créneau
                </button>

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
                  <button
                    className="min-[480px]:hidden text-center bg-[#131313] text-white font-medium text-sm px-5 py-2.5 rounded-full mt-1 cursor-pointer"
                    onClick={() => { setMenuOpen(false); scrollToCalendly() }}
                  >
                    Discuter de ton projet
                  </button>
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
                <span className="text-brand font-bold">+20 applications</span> publiées
              </p>
            </div>
          </div>

          {/* Titre — même direction desktop/mobile, avec des retours adaptés aux petits écrans */}
          <h1 className="font-heading text-[1.56rem] min-[375px]:text-[1.62rem] min-[414px]:text-[1.78rem] min-[430px]:text-[1.9rem] min-[480px]:text-[2.08rem] sm:text-[2.34rem] md:text-[2.72rem] lg:text-[3.08rem] font-extrabold text-text tracking-tight leading-[1.15] sm:leading-[1.16] text-balance sm:text-pretty w-full max-w-none sm:w-auto sm:max-w-none mx-auto mb-9 md:mb-11">
            <span className="sm:hidden text-text font-bold" style={{ fontFamily: "'Plus Jakarta Sans Local', 'Plus Jakarta Sans', sans-serif" }}>
              Je <span className="inline-block mx-1 text-[#828282] italic font-bold tracking-normal" style={{ fontFamily: "'Libre Baskerville', serif" }}>transforme</span> votre<br />
              idée en application qui<br />
              <span className="inline-block whitespace-nowrap bg-[linear-gradient(90deg,#6760ff,#7b73ef,#9e94ff)] bg-clip-text text-transparent py-1 -my-1">
                génère des revenus
              </span>
            </span>
            <span className="hidden sm:inline text-text font-bold" style={{ fontFamily: "'Plus Jakarta Sans Local', 'Plus Jakarta Sans', sans-serif" }}>
              Je <span className="inline-block mx-1.5 text-[#828282] italic font-bold tracking-normal" style={{ fontFamily: "'Libre Baskerville', serif" }}>transforme</span> votre idée en<br />
              app qui{' '}
              <span className="inline-block whitespace-nowrap bg-[linear-gradient(90deg,#6760ff,#7b73ef,#9e94ff)] bg-clip-text text-transparent py-1 -my-1">
                génère des revenus
              </span>
            </span>
          </h1>

          {/* CTA mobile */}
          <div className="flex justify-center mb-3 sm:hidden">
            <button
              onClick={scrollToCalendly}
              className="group inline-flex items-center gap-2 md:gap-3 bg-brand text-surface font-semibold text-[0.9rem] md:text-base px-7 py-3 md:px-9 md:py-4 rounded-full cursor-pointer"
            >
              <span className="pr-0.5 md:pr-1">Discuter de ton projet</span>
              <svg className="w-[18px] h-[18px] md:w-[22px] md:h-[22px] transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          {/* Proof mobile — ordre inchange */}
          <div className="flex flex-col items-center justify-center gap-5 mt-10 sm:hidden">
            {['Tarif fixe, zéro surprise', 'Publication sur les stores', 'Suivi après mise en ligne'].map((text) => (
              <div key={text} className="flex items-center gap-2.5 text-text text-[0.85rem] font-medium">
                <span className="shrink-0 w-5 h-5 rounded-full bg-brand flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </span>
                {text}
              </div>
            ))}
          </div>

          {/* Proof desktop — au-dessus du bouton */}
          <div className="hidden sm:flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mt-10 md:mt-14">
            {['Tarif fixe, zéro surprise', 'Publication sur les stores', 'Suivi après mise en ligne'].map((text) => (
              <div key={text} className="flex items-center gap-2.5 text-text text-[0.85rem] md:text-[0.9rem] font-medium">
                <span className="shrink-0 w-5 h-5 rounded-full bg-brand flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </span>
                {text}
              </div>
            ))}
          </div>

          {/* CTA desktop */}
          <div className="hidden sm:flex justify-center mt-8 md:mt-10 mb-3 md:mb-5">
            <button
              onClick={scrollToCalendly}
              className="group inline-flex items-center gap-2 md:gap-3 bg-brand text-surface font-semibold text-[0.9rem] md:text-base px-7 py-3 md:px-9 md:py-4 rounded-full cursor-pointer"
            >
              <span className="pr-0.5 md:pr-1">Discuter de ton projet</span>
              <svg className="w-[18px] h-[18px] md:w-[22px] md:h-[22px] transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

        </div>
      </section>

      {/* ========== LA DIFFÉRENCE ========== */}
      <section className="py-16 md:py-22 px-5" id="difference">
        <div className="max-w-275 mx-auto">
          <p className="reveal text-brand font-semibold text-[0.78rem] tracking-widest uppercase text-center mb-3">
            La différence
          </p>
          <h2 className="reveal font-jakarta text-text text-2xl md:text-[2.1rem] font-extrabold tracking-tight text-center mb-8 md:mb-12">
            Pourquoi me faire <span className="text-brand">confiance ?</span>
          </h2>
          <div className="reveal max-w-[780px] mx-auto grid grid-cols-1 sm:grid-cols-2 rounded-2xl border border-card-border overflow-hidden mb-10 md:mb-14">
            {/* Agences */}
            <div className="p-8 md:p-10 bg-card">
              <p className="text-text font-bold text-[1.1rem] mb-7">Agences</p>
              <ul className="space-y-5">
                {[
                  '3 à 6 mois de développement',
                  'À partir de 15 000 €',
                  'Difficile à joindre',
                  'Projet livré, débrouillez-vous',
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
                  'Livraison en 6 à 8 semaines',
                  'À partir de 3 500 €',
                  'Joignable directement 6j/7',
                  'Pensé pour générer des revenus',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3.5 text-text text-[0.95rem] font-semibold leading-relaxed">
                    <svg className="shrink-0 text-brand" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="reveal text-center mt-6 md:mt-4">
            <button
              onClick={scrollToCalendly}
              className="group inline-flex items-center gap-2.5 bg-brand text-surface font-semibold text-[0.95rem] md:text-base px-8 py-3.5 md:px-10 md:py-4 rounded-full cursor-pointer"
            >
               Réserver mon appel avec Noé
              <svg className="transition-transform duration-300 group-hover:translate-x-1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <p className="text-grey/60 text-[0.8rem] mt-3">30 min · 100% gratuit</p>
          </div>
        </div>
      </section>

      {/* ========== AUTORITÉ ========== */}
      <section className="pt-18  pb-16 md:pt-28 md:pb-22 px-5 bg-card" id="why">
        <div className="max-w-275 mx-auto">
          <h2 className="reveal font-jakarta text-text text-2xl md:text-[2.1rem] font-extrabold tracking-tight text-center mb-4">
            Pourquoi travailler <span className="text-brand">avec moi</span>
          </h2>

          <p className="reveal text-grey text-[0.95rem] md:text-[1.05rem] leading-relaxed max-w-160 mx-auto text-center mb-10 md:mb-10">
            Pas d'interm&eacute;diaire. Vous travaillez directement avec <strong>quelqu'un qui conçoit, structure et livre votre application.</strong>
          </p>

          <p className="reveal text-grey text-[0.95rem] md:text-[1.05rem] leading-relaxed max-w-160 mx-auto text-center mb-5 mt-[-8px] md:mt-[-16px]">
            J'ai lanc&eacute; mes propres applications :
          </p>

          {/* Apps */}
          <div className="reveal flex items-center justify-center gap-5 mb-5">
            {[
              { icon: wackupIcon, name: 'Wake Up Alarme', url: 'https://wakeupalarm.app/' },
              { icon: plouffIcon, name: 'Plouff Habitudes', url: 'http://plouff-habitudes.com/' },
            ].map(({ icon, name, url }) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
                <img src={icon} alt={name} loading="lazy" width="96" height="96" className="w-20 h-20 md:w-24 md:h-24 rounded-[22%] shadow-md transition-transform duration-300 group-hover:scale-110" />
                <span className="text-grey text-[0.75rem] md:text-[0.8rem] font-medium mt-1 transition-colors duration-300 group-hover:text-brand">{name}</span>
              </a>
            ))}
          </div>

          <p className="reveal text-brand font-semibold text-center text-[0.95rem] md:text-[1.05rem] mt-11 mb-4 md:mb-6">
            <mark style={{background:'#e8e5ff', color:'#665dff', borderRadius:'4px', padding:'2px 6px'}}>Pas de devis &agrave; 20&nbsp;000&nbsp;€.</mark> Tarif honn&ecirc;te, z&eacute;ro zone grise.
          </p>


          {/* Photo + Bio */}
          <div className="reveal max-w-180 mx-auto px-5 md:px-6 md:bg-white md:rounded-2xl pt-6  md:p-10">
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-10">
              <img
                src={mePhoto}
                alt="Noé Calmes"
                loading="lazy"
                width="144"
                height="144"
                className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover shadow-lg shrink-0"
              />
              <div className="text-center md:text-left">
                <h3 className="font-heading text-text text-lg md:text-xl font-bold mb-1">
                  No&eacute; Calmes
                </h3>
                <p className="text-grey text-[0.9rem] md:text-[0.95rem] leading-relaxed">
                  <strong>J'aide les entreprises &agrave; concevoir et lancer leur application mobile.</strong> Avec plus de 5 ans d'exp&eacute;rience en d&eacute;veloppement, j'interviens de la <strong>strat&eacute;gie produit</strong> au d&eacute;veloppement et &agrave; la <strong>mise en ligne.</strong>
                </p>
              </div>
            </div>
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
              { num: '1', title: 'On échange', desc: 'Vous me présentez votre idée. Je vous offre et rédige votre cahier des charges, puis vous transmets le devis.', img: meetingSvg },
              { num: '2', title: 'Je construis', desc: 'Votre projet est ma seule priorité. Avancement concret, échanges réguliers. Vous voyez votre application prendre forme.', img: devSvg },
              { num: '3', title: 'Vous lancez', desc: 'Application prête, sur l\'App Store et Google Play. Je reste disponible après la mise en ligne.', img: postSvg },
            ].map(({ num, title, desc, img }) => (
              <div key={num} className="group bg-surface border border-card-border rounded-[15px] p-8 md:p-10 text-left flex flex-col transition-colors duration-300 hover:bg-brand hover:border-brand cursor-default">
                <img src={img} alt={title} loading="lazy" width="280" height="160" className="w-full h-40 object-contain mb-6" />
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

      {/* ========== CALENDLY ========== */}
      <section className="pt-16 md:pt-22 pb-0 md:pb-0 px-5 bg-card" id="calendly-section">
        <div className="max-w-275 mx-auto text-center">
          <h2 className="reveal font-jakarta text-text text-2xl md:text-[2.1rem] font-extrabold tracking-tight mb-3 md:mb-4">
            Parlons de <span className="text-brand">votre application</span>
          </h2>
          <p className="reveal text-grey text-[0.95rem] md:text-[1.05rem] leading-relaxed max-w-130 mx-auto mb-4">
            Vous avez une idée&nbsp;? Une application déjà en ligne&nbsp;?
          </p>
          <p className="reveal flex items-center justify-center gap-2 text-xs md:text-sm text-grey mb-6 md:mb-0 -mt-2 min-h-[1.5rem]">
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
          <div
            className="calendly-inline-widget min-w-[320px] h-[980px] md:h-[950px]"
            data-url="https://calendly.com/noecalmes-app/appel-app-mobile?primary_color=645cff"
          />
        </div>
      </section>

      {/* ========== REVIEWS ========== */}
      <section className="py-16 md:py-22 px-5" id="avis">
        <div className="max-w-275 mx-auto">
          <h2 className="reveal font-jakarta text-text text-2xl md:text-[2.1rem] font-extrabold tracking-tight text-center mb-10 md:mb-12">
            Ce qu'ils <span className="text-brand">disent...</span> 
          </h2>
          <ReviewsCarousel />
        </div>
      </section>

      {/* ========== AUDIT GRATUIT ========== */}
      {/* CTA card contenue, palette 100% brand : bg-brand + glows brand-light
          + dot pattern + glassmorphism. Volontairement court, la pédagogie
          complète est sur /audit-app. */}
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
                <span className="font-jakarta text-brand text-[0.72rem] font-extrabold tracking-widest uppercase">
                  Audit express · 2 min
                </span>
              </div>

              <h2 className="font-jakarta text-text text-[1.95rem] sm:text-[2.35rem] md:text-[2.85rem] font-extrabold tracking-tight leading-[1.08] max-w-140 mx-auto mb-5 md:mb-6">
                Les 3 réponses{' '}
                <span className="text-brand">avant d'investir 1&nbsp;€</span>
              </h2>

              <p className="text-grey text-[0.95rem] md:text-[1.05rem] max-w-115 mx-auto mb-9 md:mb-11 leading-relaxed">
                Marché, budget, délai. En 2 minutes, sans appel.
              </p>

              <button
                onClick={() => { setPage('audit-app'); history.pushState(null, '', '/audit-app'); window.scrollTo(0, 0) }}
                className="group inline-flex items-center gap-2.5 bg-brand text-white font-semibold text-[0.95rem] md:text-base px-8 py-3.5 md:px-10 md:py-4 rounded-full cursor-pointer shadow-[0_16px_38px_-20px_rgba(102,93,255,0.85)]"
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
            <span className="text-brand">Vos questions</span>, nos réponses
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <a href="/creation-application-mobile" onClick={(e) => { e.preventDefault(); document.getElementById(SECTION_ROUTES['/creation-application-mobile'].id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); history.pushState(null, '', '/creation-application-mobile') }} className="text-white text-sm font-semibold hover:text-white/60 transition-colors">Méthode</a>
            <a href="/audit-app" onClick={(e) => { e.preventDefault(); setPage('audit-app'); history.pushState(null, '', '/audit-app'); window.scrollTo(0, 0) }} className="text-white text-sm font-semibold hover:text-white/60 transition-colors">Audit gratuit</a>
            <a href="/rendez-vous" onClick={(e) => { e.preventDefault(); document.getElementById(SECTION_ROUTES['/rendez-vous'].id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); history.pushState(null, '', '/rendez-vous') }} className="text-white text-sm font-semibold hover:text-white/60 transition-colors">Rendez-vous</a>
            <a href="/blog" onClick={(e) => { e.preventDefault(); goBlog() }} className="text-white text-sm font-semibold hover:text-white/60 transition-colors">Blog</a>
          </div>

          {/* Nous contacter + socials */}
          <div className="flex items-center gap-6 md:pt-1">
            <p className="text-white text-sm font-semibold">Me contacter</p>
            <button onClick={() => setFooterEmailOpen(true)} aria-label="Email" className="w-9 h-9 flex items-center justify-center rounded-[8px] bg-white text-brand hover:opacity-80 transition-opacity cursor-pointer">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </button>
            <a href="https://www.linkedin.com/in/noecalmes" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 flex items-center justify-center rounded-[8px] bg-white text-brand hover:opacity-80 transition-opacity">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/noecalmes.app/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 flex items-center justify-center rounded-[8px] bg-white text-brand hover:opacity-80 transition-opacity">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
          </div>

          {/* Copyright + legal */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 w-full">
            <p className="text-white/40 text-xs">
              &copy; 2026 No&eacute; Calmes. Tous droits r&eacute;serv&eacute;s.
            </p>
            <button onClick={() => openLegal('cgv')} className="text-white/40 text-xs hover:text-white/80 transition-colors cursor-pointer">CGV</button>
            <button onClick={() => openLegal('mentions')} className="text-white/40 text-xs hover:text-white/80 transition-colors cursor-pointer">Mentions l&eacute;gales</button>
            <button onClick={() => openLegal('privacy')} className="text-white/40 text-xs hover:text-white/80 transition-colors cursor-pointer">Politique de confidentialit&eacute;</button>
          </div>

          <p className="text-white/40 text-xs leading-relaxed max-w-200 mx-auto">
            Audit gratuit : les informations que vous transmettez sont conservées de façon sécurisée et utilisées uniquement par Noé pour analyser votre projet, vous conseiller et rédiger votre cahier des charges. Aucune donnée n&apos;est partagée avec des tiers — secret professionnel garanti.
          </p>
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
