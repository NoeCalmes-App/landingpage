import { useState, useEffect, useRef } from 'react'
import './App.css'
import PolitiqueConfidentialite from './PolitiqueConfidentialite.jsx'
import MentionsLegales from './MentionsLegales.jsx'
import CGV from './CGV.jsx'
import meetingSvg from './assets/lib/meetingdev.svg'
import plouffIcon from './assets/appicon/plouffhabitudes.png'
import wackupIcon from './assets/appicon/wackupalarme.png'
import devSvg from './assets/lib/devmobile.svg'
import postSvg from './assets/lib/post.svg'
import mePhoto from './assets/lib/me.png'

const NAV_LINKS = [
  { href: '#why', label: 'À propos' },
  { href: '#process', label: 'Process' },
  { href: '#deliverables', label: 'Ce que je fais' },
  { href: '#faq', label: 'FAQ' },
  { href: '#booking', label: 'Contact' },
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

const WHATSAPP_URL = 'https://wa.me/33658308210?text=Bonjour%2C%20je%20souhaite%20discuter%20d%27un%20projet%20d%27application.'

function WhatsAppModal({ open, onClose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-5" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl p-8 md:p-10 text-center max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-grey hover:text-text transition-colors cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="w-20 h-20 rounded-full bg-[#25D366] flex items-center justify-center mx-auto mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </div>

        <h3 className="font-heading text-text text-xl font-bold mb-2">Discutons de votre projet</h3>
        <p className="text-grey text-[0.9rem] leading-relaxed mb-6">
          Je vous r&eacute;ponds g&eacute;n&eacute;ralement sous 24h.
        </p>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 w-full bg-[#25D366] text-white font-semibold text-base px-8 py-4 rounded-full hover:bg-[#1ebe5d] transition-colors"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Me contacter sur WhatsApp
        </a>

        <p className="text-grey text-[0.8rem] mt-4">
          Vous &ecirc;tes sur ordinateur ? WhatsApp : <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-text font-medium hover:text-brand transition-colors">06 58 30 82 10</a>
        </p>
      </div>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [page, setPage] = useState('home')
  const [whatsappOpen, setWhatsappOpen] = useState(false)
  const scrollRef = useScrollReveal()

  const goHome = () => { setPage('home'); window.scrollTo(0, 0) }

  if (page === 'privacy') return <PolitiqueConfidentialite onBack={goHome} />
  if (page === 'mentions') return <MentionsLegales onBack={goHome} />
  if (page === 'cgv') return <CGV onBack={goHome} />

  return (
    <div ref={scrollRef}>
      {/* ========== NAVBAR ========== */}
      <nav className="anim-nav fixed inset-[18px_0_auto] z-50 flex justify-center px-4 md:px-6">
        <div className="w-full max-w-230">
          <div
            className={`backdrop-blur-[12px] border border-[#70707029] shadow-[0_1px_3px_#00000017] overflow-hidden rounded-[40px] transition-[background-color] duration-300 ease-in-out ${
              menuOpen ? 'bg-[#ffffffee]' : 'bg-[#fffefc3d]'
            }`}
          >
            {/* Bar — 80px */}
            <div className="flex items-center justify-between h-20 px-6 md:px-8">
              {/* Brand */}
              <a href="#" className="flex flex-col">
                <span className="text-text font-bold text-xl md:text-1xl leading-tight tracking-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Noé Calmes
                </span>
                <span className="text-grey text-sm md:text-md leading-tight font-normal">
                  Développeur Mobile Flutter
                </span>
              </a>

              {/* Desktop links (lg+) */}
              <div className="hidden lg:flex items-center gap-8">
                {NAV_LINKS.map(({ href, label }) => (
                  <a key={label} href={href} className="text-text text-[0.95rem] font-semibold hover:text-brand transition-colors">
                    {label}
                  </a>
                ))}
              </div>

              {/* Right — CTA + Hamburger */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setWhatsappOpen(true)}
                  className="hidden min-[480px]:inline-block bg-[#131313] text-white text-md font-medium px-8 py-3 rounded-full hover:bg-black transition-colors cursor-pointer"
                >
                  Réserver un appel
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
                      onClick={() => setMenuOpen(false)}
                    >
                      {label}
                    </a>
                  ))}
                  <button
                    className="min-[480px]:hidden text-center bg-[#131313] text-white font-medium text-sm px-5 py-2.5 rounded-full mt-1 cursor-pointer"
                    onClick={() => { setMenuOpen(false); setWhatsappOpen(true) }}
                  >
                    Réserver un appel
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
          <h1 className="font-heading text-[2.275rem] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem] font-extrabold text-text tracking-tight leading-[1.15] mb-8">
            Vous avez une idée d'application.<br />
            Je la transforme en <span className="text-brand relative">produit réel !
              <span className="absolute -bottom-3 rounded-sm left-1/2 -translate-x-1/2 w-[65%] h-2.5 bg-brand -rotate-1" />
            </span>
          </h1>

          <p className="text-grey text-[0.95rem] md:text-base lg:text-lg leading-relaxed max-w-155 mx-auto mb-10">
            Un seul développeur, de la conception au déploiement sur les stores.
          </p>

          <button
            onClick={() => setWhatsappOpen(true)}
            className="group inline-flex items-center gap-2.5 bg-brand text-surface font-semibold text-[0.95rem] md:text-base px-8 py-3.5 md:px-10 md:py-4 rounded-full cursor-pointer"
          >
            Discuter de mon projet
            <svg className="transition-transform duration-300 group-hover:translate-x-1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>

          <p className="text-grey text-[0.8rem] md:text-[0.85rem] mt-2.5">
            15 min &bull; Gratuit &bull; Sans engagement
          </p>

          {/* Proof */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-8 mt-7 md:mt-18">
            {['MVP livré en 45 jours', 'Applications complètes prêtes à scaler', 'Suivi après mise en ligne'].map((text) => (
              <div key={text} className="flex items-center gap-2.5 text-text text-[0.85rem] md:text-[0.9rem] font-medium">
                <span className="shrink-0 w-5 h-5 rounded-full bg-brand flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </span>
                {text}
              </div>
            ))}
          </div>

          {/* Qualification cards — desktop only (inside hero) */}
          <div className="hidden md:grid grid-cols-2 gap-6 mt-10 text-left max-w-230 mx-auto">
            <div className="bg-card border border-card-border rounded-[15px] p-8 md:p-9">
              <h2 className="font-heading text-text text-lg md:text-xl font-bold mb-7">
                C'est pour vous si :
              </h2>
              <ul className="space-y-4">
                {[
                  'Vous souhaitez créer une app MVP en 45 jours',
                  'Vous souhaitez créer une application complète prête à scaler',
                  'Vous avez des maquettes d\'une app et cherchez un développeur',
                  'Vous souhaitez une refonte de votre application',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3.5 text-text text-[0.93rem] leading-snug">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-green-bg text-green-text flex items-center justify-center text-sm font-bold">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-card-border rounded-[15px] p-8 md:p-9">
              <h2 className="font-heading text-text text-lg md:text-xl font-bold mb-7">
                Ce n'est pas pour vous si :
              </h2>
              <ul className="space-y-4">
                {[
                  'Votre projet est encore au stade d\'idée vague, sans direction claire',
                  'L\'application n\'est pas une priorité dans les prochains mois',
                  'Vous avez besoin d\'une grande équipe ou d\'une structure type agence',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3.5 text-text text-[0.93rem] leading-snug">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-red-bg text-red-text flex items-center justify-center text-sm font-bold">&#10007;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========== QUALIFICATION — mobile only ========== */}
      <section className="reveal md:hidden px-5 py-10" id="fit">
        <div className="grid grid-cols-1 gap-5">
          <div className="bg-card border border-card-border rounded-[15px] p-8">
            <h2 className="font-heading text-text text-lg font-bold mb-7">
              C'est pour vous si :
            </h2>
            <ul className="space-y-4">
              {[
                'Vous avez une idée d\'application déjà élaborée',
                'Vous souhaitez créer une app MVP en 45 jours',
                'Vous souhaitez créer une application complète prête à scaler',
                'Vous avez des maquettes d\'une app et cherchez un développeur',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3.5 text-text text-[0.93rem] leading-snug">
                  <span className="shrink-0 w-6.5 h-6.5 rounded-full bg-green-bg text-green-text flex items-center justify-center text-xs font-bold">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card border border-card-border rounded-[15px] p-8">
            <h2 className="font-heading text-text text-lg font-bold mb-7">
              Ce n'est pas pour vous si :
            </h2>
            <ul className="space-y-4">
              {[
                'Vous n\'avez pas encore de budget alloué',
                'Vous cherchez uniquement le prix le plus bas',
                'Vous avez besoin d\'une équipe de 5+ développeurs',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3.5 text-text text-[0.93rem] leading-snug">
                  <span className="shrink-0 w-6.5 h-6.5 rounded-full bg-red-bg text-red-text flex items-center justify-center text-xs font-bold">&#10007;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ========== AUTORITÉ ========== */}
      <section className="pt-16 pb-16 md:pt-22 md:pb-22 px-5 bg-card" id="why">
        <div className="max-w-275 mx-auto">
          <h2 className="reveal font-heading text-text text-2xl md:text-[2.1rem] font-bold tracking-tight text-center mb-4">
            Pourquoi moi et pas une agence
          </h2>

          <p className="reveal text-grey text-[0.95rem] md:text-[1.05rem] leading-relaxed max-w-160 mx-auto text-center mb-10 md:mb-12">
            J'ai lanc&eacute; mes propres applications — Wake Up Alarme, Plouff Habitudes.<br />
            Je connais les vrais probl&egrave;mes : <strong>prioriser, trancher, livrer.</strong><br />
            Pas de chef de projet, pas d'interm&eacute;diaire. Vous parlez directement &agrave; <strong>celui qui construit.</strong>
          </p>

          {/* Apps */}
          <div className="reveal flex items-center justify-center gap-5 mb-5">
            {[
              { icon: wackupIcon, name: 'Wake Up Alarme', url: 'https://wakeupalarm.app/' },
              { icon: plouffIcon, name: 'Plouff Habitudes', url: 'https://apps.apple.com/app/plouf-habitudes/id6758303032' },
            ].map(({ icon, name, url }) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
                <img src={icon} alt={name} className="w-20 h-20 md:w-24 md:h-24 rounded-[22%] shadow-md transition-transform duration-300 group-hover:scale-110" />
                <span className="text-grey text-[0.75rem] md:text-[0.8rem] font-medium mt-1 transition-colors duration-300 group-hover:text-brand">{name}</span>
              </a>
            ))}
          </div>

          <p className="reveal text-brand font-semibold text-[0.95rem] md:text-[1.05rem] text-center mb-10 md:mb-12">
            Un seul interlocuteur, <span className="underline decoration-2 underline-offset-4">responsable de A &agrave; Z.</span>
          </p>

          <div className="reveal-stagger flex flex-wrap justify-center gap-2.5 md:gap-4 max-w-230 mx-auto mb-10 md:mb-18">
            {[
              'J\'ai lancé mes propres apps',
              'Zéro intermédiaire',
              'Vision produit + technique',
              'Communication directe',
              'Engagement total',
            ].map((skill) => (
              <div
                key={skill}
                className="flex items-center gap-2.5 bg-surface border border-card-border rounded-xl px-4 py-2.5 md:px-5 md:py-3.5 text-text text-[0.85rem] md:text-[0.93rem] font-medium"
              >
                <span className="w-2 h-2 rounded-full bg-brand shrink-0" />
                {skill}
              </div>
            ))}
          </div>

          {/* Photo + Bio */}
          <div className="reveal max-w-180 mx-auto px-5 md:px-6 md:bg-white md:rounded-2xl md:p-10">
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-10">
              <img
                src={mePhoto}
                alt="Noé Calmes"
                className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover shadow-lg shrink-0"
              />
              <div className="text-center md:text-left">
                <h3 className="font-heading text-text text-lg md:text-xl font-bold mb-1">
                  No&eacute; Calmes
                </h3>
                <p className="text-grey text-[0.9rem] md:text-[0.95rem] leading-relaxed">
                  Je code <strong>depuis plus de 5 ans</strong> et je suis dans le d&eacute;veloppement mobile depuis un bon moment, <strong>expert Flutter &amp; Dart</strong>.
                  Strat&eacute;gie produit, d&eacute;veloppement et mise en ligne.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CE QUE JE LIVRE ========== */}
      <section className="py-16 md:py-22 px-5" id="deliverables">
        <div className="max-w-275 mx-auto">
          <h2 className="reveal font-heading text-text text-2xl md:text-[2.1rem] font-bold tracking-tight text-center mb-10 md:mb-12">
            Ce que vous obtenez concrètement
          </h2>

          <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-230 mx-auto">
            {[
              {
                title: 'Une app iOS & Android qui fonctionne',
                icon: <><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></>,
              },
              {
                title: 'Une expérience utilisateur pensée',
                icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
              },
              {
                title: 'Les bons choix techniques dès le départ',
                icon: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
              },
              {
                title: 'Un produit solide, pas un prototype jetable',
                icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
              },
              {
                title: 'Un code propre qui peut évoluer avec documentation',
                icon: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>,
              },
              {
                title: 'Un accompagnement jusqu\'au lancement',
                icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
              },
            ].map(({ title, icon }) => (
              <div
                key={title}
                className="bg-card border border-card-border rounded-[15px] p-7 md:p-8 text-center hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.05)] transition-all"
              >
                <div className="w-13 h-13 rounded-[14px] bg-[#665dff] flex items-center justify-center text-white mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {icon}
                  </svg>
                </div>
                <h3 className="font-heading text-text text-[0.95rem] md:text-[0.98rem] font-semibold leading-snug">
                  {title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PROCESS ========== */}
      <section className="py-16 md:py-22 px-5 bg-card" id="process">
        <div className="max-w-275 mx-auto">
          <h2 className="reveal font-heading text-text text-2xl md:text-[2.1rem] font-bold tracking-tight text-center mb-10 md:mb-12">
            Comment ça se passe ?
          </h2>

          <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 max-w-230 mx-auto">
            {[
              { num: '1', title: 'On échange', desc: 'Vous me présentez votre idée. On voit ensemble si c\'est le bon moment et la bonne approche.', img: meetingSvg },
              { num: '2', title: 'Je construis', desc: 'Avancement concret, échanges réguliers. Vous voyez l\'app prendre forme, pas juste des slides.', img: devSvg },
              { num: '3', title: 'Vous lancez', desc: 'Application prête, sur l\'App Store et Google Play. Je reste disponible après la mise en ligne.', img: postSvg },
            ].map(({ num, title, desc, img }) => (
              <div key={num} className="group bg-surface border border-card-border rounded-[15px] p-8 md:p-10 text-left flex flex-col transition-colors duration-300 hover:bg-brand hover:border-brand cursor-default">
                <img src={img} alt={title} className="w-full h-40 object-contain mb-6" />
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

      {/* ========== FAQ ========== */}
      <section className="py-16 md:py-22 px-5" id="faq">
        <div className="max-w-275 mx-auto">
          <h2 className="reveal font-heading text-text text-2xl md:text-[2.1rem] font-bold tracking-tight text-center mb-10 md:mb-12">
            Questions fréquentes
          </h2>

          <div className="reveal max-w-170 mx-auto divide-y divide-card-border border-t border-card-border">
            {[
              { q: 'Comment fonctionne la tarification ?', a: 'Je ne facture ni à l\'heure, ni à la journée. Le tarif est défini dès le départ, en fonction du projet. Pas de mauvaise surprise, pas de compteur qui tourne — vous savez exactement ce que vous payez avant de commencer.' },
              { q: 'Combien de temps faut-il pour avoir une application mobile ?', a: 'Pour un MVP, comptez environ 45 jours. Pour une application complète, le délai dépend du projet et de vos besoins — on définit ça ensemble.' },
              { q: 'Après la livraison de l\'application ?', a: 'Je ne disparais pas après la mise en ligne. Je reste disponible pour les corrections, les mises à jour, les nouvelles fonctionnalités et l\'accompagnement technique. Le suivi fait partie de mon approche — on définit ensemble ce qui est nécessaire selon l\'évolution de votre produit.' },
            ].map(({ q, a }) => (
              <details key={q} className="group">
                <summary className="flex items-center justify-between gap-4 py-5 md:py-6 cursor-pointer text-text font-semibold text-[0.95rem] md:text-base">
                  {q}
                  <span className="text-brand text-xl shrink-0 w-6 text-center group-open:hidden">+</span>
                  <span className="text-brand text-xl shrink-0 w-6 text-center hidden group-open:block">&minus;</span>
                </summary>
                <p className="pb-5 md:pb-6 text-grey text-[0.9rem] md:text-[0.93rem] leading-relaxed">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section className="py-20 md:py-24 lg:py-28 px-5 text-center rounded-tl-[70px] rounded-tr-[70px] border border-[#0000001c]" style={{ backgroundColor: '#f9f9f9' }} id="booking">
        <div className="max-w-275 mx-auto">
          <h2 className="reveal font-heading text-text text-2xl md:text-[2.1rem] font-bold tracking-tight mb-5">
            Passez de l'idée à l'application.<br />On commence par un appel.
          </h2>

          <p className="reveal text-grey text-[0.95rem] md:text-[1.05rem] leading-relaxed max-w-140 mx-auto mb-8">
            15 minutes pour discuter de votre projet, comprendre vos besoins<br className="hidden md:block" />
            et voir comment je pourrais y contribuer.
          </p>

          <button
            onClick={() => setWhatsappOpen(true)}
            className="reveal group inline-flex items-center gap-2.5 bg-brand text-surface font-semibold text-[0.95rem] md:text-base px-8 py-3.5 md:px-10 md:py-4 rounded-full cursor-pointer"
          >
            Réserver mon appel gratuit
            <svg className="transition-transform duration-300 group-hover:translate-x-1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>

          <p className="reveal text-light-grey text-[0.85rem] mt-3">
            Sans engagement &bull; Réponse sous 24h &bull; Places limitées
          </p>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="reveal bg-brand py-14 px-6">
        <div className="flex flex-col items-center text-center gap-8 max-w-275 mx-auto">
          {/* Name */}
          <p className="text-white font-bold text-xl md:text-4xl tracking-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Noé Calmes.
          </p>

          {/* Nav links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <a href="#process" className="text-white text-sm font-semibold hover:text-white/60 transition-colors">Process</a>
            <a href="#deliverables" className="text-white text-sm font-semibold hover:text-white/60 transition-colors">Ce que je fais</a>
            <a href="#faq" className="text-white text-sm font-semibold hover:text-white/60 transition-colors">FAQ</a>
            <button onClick={() => setWhatsappOpen(true)} className="text-white text-sm font-semibold hover:text-white/60 transition-colors cursor-pointer">Contact</button>
          </div>

          {/* Nous contacter + socials */}
          <div className="flex items-center gap-4">
            <p className="text-white text-sm font-semibold">Me contacter</p>
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
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-8 border-t border-white/10 w-full">
            <p className="text-white/40 text-xs">
              &copy; 2026 No&eacute; Calmes. Tous droits r&eacute;serv&eacute;s.
            </p>
            <button onClick={() => { setPage('cgv'); window.scrollTo(0, 0) }} className="text-white/40 text-xs hover:text-white/80 transition-colors cursor-pointer">CGV</button>
            <button onClick={() => { setPage('mentions'); window.scrollTo(0, 0) }} className="text-white/40 text-xs hover:text-white/80 transition-colors cursor-pointer">Mentions l&eacute;gales</button>
            <button onClick={() => { setPage('privacy'); window.scrollTo(0, 0) }} className="text-white/40 text-xs hover:text-white/80 transition-colors cursor-pointer">Politique de confidentialit&eacute;</button>
          </div>
        </div>
      </footer>

      <WhatsAppModal open={whatsappOpen} onClose={() => setWhatsappOpen(false)} />
    </div>
  )
}

export default App
