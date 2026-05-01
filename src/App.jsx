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
  '/etapes': {
    id: 'offre',
    title: 'Comment créer une application mobile en 3 étapes | Noé Calmes',
    description: 'Créer votre application mobile simplement : un échange pour cadrer votre projet, le développement, puis le lancement sur l\'App Store et Google Play.',
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
  '/rendez-vous': {
    id: 'calendly-section',
    title: 'Réserver un appel gratuit — Application mobile | Noé Calmes',
    description: 'Vous avez un projet d\'application mobile ? Réservez un appel gratuit de 30 minutes pour en discuter. Création, reprise ou évolution — sans engagement.',
  },
}

const NAV_LINKS = [
  { href: '/expertise', label: 'Expertise' },
  { href: '/etapes', label: 'Étapes' },
  { href: '/avis', label: 'Avis' },
  { href: '/faq', label: 'FAQ' },
]

function useScrollReveal() {
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
  }, [])

  return ref
}

const REVIEWS = [
  {
    name: 'Sophie M.',
    role: 'Fondatrice',
    text: 'Noé a livré notre MVP en 6 semaines. Communication fluide, code propre, et il a su challenger nos idées pour aller à l\'essentiel. Je recommande à 100%.',
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
  { q: 'Combien de temps faut-il pour avoir une application mobile ?', a: 'Pour un MVP, comptez environ 45 jours. Pour une application complète, le délai dépend du projet et de vos besoins — on définit ça ensemble.' },
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
    if (path === '/blog') return 'blog'
    if (path.startsWith('/blog/')) return 'blog-article'
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
  const scrollRef = useScrollReveal()

  // Auto-scroll vers la section et mise à jour des meta tags si on arrive sur une route de section
  useEffect(() => {
    const path = window.location.pathname.replace(/\/$/, '') || '/'
    const section = SECTION_ROUTES[path]
    if (section) {
      document.title = section.title
      document.querySelector('meta[name="description"]')?.setAttribute('content', section.description)
      document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://noecalmes.fr${path}`)
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', section.title)
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', section.description)
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', `https://noecalmes.fr${path}`)
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
    // Charge le script Calendly :
    //   - immédiatement si on arrive sur /rendez-vous (le widget est forcément vu)
    //   - sinon quand la section approche du viewport (rootMargin 600px)
    const loadCalendlyScript = () => {
      if (window.Calendly || document.querySelector('script[data-calendly]')) return
      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      script.dataset.calendly = '1'
      document.head.appendChild(script)
    }

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
  }, [])

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

  const goBookCall = () => { setPage('home'); history.pushState(null, '', '/rendez-vous'); setTimeout(() => document.getElementById('calendly-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100) }

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
  if (page === 'contact') return <ContactNoe />
  if (page === 'legal') return <Legales />
  if (page === 'privacy') return <PolitiqueConfidentialite onBack={goHome} />
  if (page === 'mentions') return <MentionsLegales onBack={goHome} />
  if (page === 'cgv') return <CGV onBack={goHome} />
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
        <div className="w-full max-w-230">
          <div
            className={`backdrop-blur-[12px] border border-[#70707029] shadow-[0_1px_3px_#00000017] overflow-hidden rounded-[40px] transition-[background-color] duration-300 ease-in-out ${
              menuOpen ? 'bg-[#ffffffee]' : 'bg-[#fffefc3d]'
            }`}
          >
            {/* Bar — 80px */}
            <div className="flex items-center justify-between h-20 px-6 md:px-7">
              {/* Brand */}
              <a href="#" className="flex flex-col">
                <span className="text-text font-bold text-xl md:text-1xl leading-tight tracking-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Noé Calmes
                </span>
                <span className="text-grey text-sm md:text-md leading-tight font-normal">
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
                  className="hidden min-[480px]:inline-block bg-[#131313] text-white text-md font-medium px-8 py-3 rounded-full hover:bg-black transition-colors cursor-pointer"
                >
                  Discuter de mon projet
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
                    Discuter de mon projet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ========== HERO (plein écran avec gradient) ========== */}
      <section
        className="min-h-screen flex items-center justify-center text-center px-5 md:px-10 lg:px-16 pt-40 pb-16 md:pt-44 md:pb-20"
        style={{ backgroundImage: 'radial-gradient(circle farthest-side at 50% 0%, var(--color-surface) 50%, transparent), linear-gradient(0deg, #f9f9f9, #867ffe 23%, var(--color-brand) 75%, white)' }}
      >
        <div className="anim-hero max-w-275 mx-auto w-full">
          {/* App stack proof */}
          <div className="flex items-center justify-center gap-2 mb-7 md:mb-8">
            <div className="flex items-center">
              {[snapIcon, calorieIcon, purgeIcon, hushIcon].map((icon, i) => (
                <img
                  key={i}
                  src={icon}
                  alt=""
                  width="28"
                  height="28"
                  className="w-7 h-7 md:w-8 md:h-8 rounded-[28%] shadow-sm border border-white/40 object-cover"
                  style={{ marginLeft: i === 0 ? 0 : '-7px', zIndex: i }}
                />
              ))}
            </div>
            <p className="text-text text-[0.8rem] md:text-[0.88rem] font-medium">
              <span className="text-brand font-bold">+20 applications</span> publiées sur les stores
            </p>
          </div>

          <h1 className="font-heading text-[2.275rem] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem] font-extrabold text-text tracking-tight leading-[1.15] mb-8">
            Je transforme votre idée <br className="hidden sm:block" />
            en app mobile en <span className="text-brand relative">45 jours.
              <svg
                className="absolute md:-bottom-4 -bottom-3.5 left-1/2 -translate-x-[60%] md:-translate-x-[60%] w-[70%] md:w-[70%] h-4.5 -rotate-1"
                viewBox="0 0 180 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 11 C55 4 120 4 178 7" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="text-grey text-[0.95rem] md:text-base lg:text-lg leading-relaxed max-w-155 mx-auto mb-10">
            Votre application pensée pour générer des revenus,<br className="hidden sm:block" />
            de la stratégie au lancement.
          </p>

          <button
            onClick={scrollToCalendly}
            className="group inline-flex items-center gap-2.5 bg-brand text-surface font-semibold text-[0.95rem] md:text-base px-8 py-3.5 md:px-10 md:py-4 rounded-full cursor-pointer"
          >
            Obtenir mes premières maquettes
            <svg className="transition-transform duration-300 group-hover:translate-x-1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>

          {/* Proof */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-14 md:mt-14">
            {['Tarif fixe, zéro surprise', 'Publication App Store & Google Play', 'Suivi après mise en ligne'].map((text) => (
              <div key={text} className="flex items-center gap-2.5 text-text text-[0.85rem] md:text-[0.9rem] font-medium">
                <span className="shrink-0 w-5 h-5 rounded-full bg-brand flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </span>
                {text}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========== LA DIFFÉRENCE ========== */}
      <section className="py-16 md:py-22 px-5" id="difference">
        <div className="max-w-275 mx-auto">
          <p className="reveal text-brand font-semibold text-[0.78rem] tracking-widest uppercase text-center mb-3">
            La différence
          </p>
          <h2 className="reveal font-heading text-text text-2xl md:text-[2.1rem] font-bold tracking-tight text-center mb-8 md:mb-12">
            Pourquoi me faire <span className="text-brand">confiance ?</span>
          </h2>
          <div className="reveal max-w-[860px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-10 md:mb-14">
            {/* Agences */}
            <div className="bg-card border border-card-border rounded-[15px] p-7 md:p-8">
              <div className="mb-6">
                <p className="text-text font-bold text-[1.05rem]">Agences traditionnelles</p>
                <p className="text-grey text-[0.82rem] mt-1">L'ancienne méthode</p>
              </div>
              <ul className="space-y-4">
                {[
                  '3 à 6 mois de développement',
                  'Budget à partir de 15 000 €',
                  'Processus complexe et chronophage',
                  'Jamais disponible, difficile à joindre',
                  'Code livré — bonne chance pour le lancement',
                  'Pas de réponse avant 48h minimum',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-grey text-[0.9rem] md:text-[0.93rem]">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-red-bg text-red-text flex items-center justify-center text-xs font-bold">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Noé */}
            <div className="bg-brand rounded-[15px] p-7 md:p-8">
              <div className="mb-6">
                <p className="text-white font-bold text-[1.05rem]">Noé Calmes</p>
                <p className="text-white/60 text-[0.82rem] mt-1">Mon approche</p>
              </div>
              <ul className="space-y-4">
                {[
                  'Livraison en 6 à 8 semaines',
                  'À partir de 3 500 €',
                  'Process simple et transparent',
                  'Un seul expert, joignable directement 6j/7',
                  'Pensé business pour générer des revenus',
                  'Spécialisé Flutter (iOS & Android)',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white text-[0.9rem] md:text-[0.93rem]">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center text-xs font-bold">✓</span>
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
              Discuter de mon projet
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
          <h2 className="reveal font-heading text-text text-2xl md:text-[2.1rem] font-bold tracking-tight text-center mb-4">
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
          <h2 className="reveal font-heading text-text text-2xl md:text-[2.1rem] font-bold tracking-tight text-center mb-10 md:mb-12">
            Comment <span className="text-brand">ça se passe ?</span>
          </h2>

          <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 max-w-230 mx-auto">
            {[
              { num: '1', title: 'On échange', desc: 'Vous me présentez votre idée. On voit ensemble si c\'est le bon moment et la bonne approche. Vous repartez avec un devis gratuit.', img: meetingSvg },
              { num: '2', title: 'Je construis', desc: 'Votre projet est ma seule priorité. Avancement concret, échanges réguliers. Vous voyez l\'app prendre forme, pas juste des slides.', img: devSvg },
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
          <h2 className="reveal font-heading text-text text-2xl md:text-[2.1rem] font-bold tracking-tight mb-3 md:mb-4">
            Parlons de <span className="text-brand">votre application</span> 📞
          </h2>
          <p className="reveal text-grey text-[0.95rem] md:text-[1.05rem] leading-relaxed max-w-130 mx-auto mb-4">
            Vous avez une idée&nbsp;? Une app mobile déjà en ligne&nbsp;?
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
            data-url="https://calendly.com/noecalmes-pro/appel-app-mobile?primary_color=645cff"
          />
        </div>
      </section>

      {/* ========== REVIEWS ========== */}
      <section className="py-16 md:py-22 px-5" id="avis">
        <div className="max-w-275 mx-auto">
          <h2 className="reveal font-heading text-text text-2xl md:text-[2.1rem] font-bold tracking-tight text-center mb-10 md:mb-12">
            Ce qu'ils <span className="text-brand">disent</span> 💬
          </h2>
          <ReviewsCarousel />
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="py-16 md:py-22 px-5 bg-card" id="faq">
        <div className="max-w-275 mx-auto">
          <h2 className="reveal font-heading text-text text-2xl md:text-[2.1rem] font-bold tracking-tight text-center mb-6 md:mb-12">
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
          <p className="text-white font-bold text-xl md:text-4xl tracking-tight md:pb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Noé Calmes.
          </p>

          {/* Nav links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <a href="/etapes" onClick={(e) => { e.preventDefault(); document.getElementById(SECTION_ROUTES['/etapes'].id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); history.pushState(null, '', '/etapes') }} className="text-white text-sm font-semibold hover:text-white/60 transition-colors">Étapes</a>
            <a href="/etapes" onClick={(e) => { e.preventDefault(); document.getElementById(SECTION_ROUTES['/etapes'].id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); history.pushState(null, '', '/etapes') }} className="text-white text-sm font-semibold hover:text-white/60 transition-colors">Étapes</a>
            <a href="/faq" onClick={(e) => { e.preventDefault(); document.getElementById(SECTION_ROUTES['/faq'].id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); history.pushState(null, '', '/faq') }} className="text-white text-sm font-semibold hover:text-white/60 transition-colors">FAQ</a>
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
            <button onClick={() => { setPage('cgv'); window.scrollTo(0, 0) }} className="text-white/40 text-xs hover:text-white/80 transition-colors cursor-pointer">CGV</button>
            <button onClick={() => { setPage('mentions'); window.scrollTo(0, 0) }} className="text-white/40 text-xs hover:text-white/80 transition-colors cursor-pointer">Mentions l&eacute;gales</button>
            <button onClick={() => { setPage('privacy'); window.scrollTo(0, 0) }} className="text-white/40 text-xs hover:text-white/80 transition-colors cursor-pointer">Politique de confidentialit&eacute;</button>
          </div>
        </div>
      </footer>

      {/* Chatbot IA flottant — remplace l'ancien bouton WhatsApp */}
      <ChatbotWidget />

      {footerEmailOpen && <EmailModal onClose={() => setFooterEmailOpen(false)} />}
    </div>
  )
}

export default App
