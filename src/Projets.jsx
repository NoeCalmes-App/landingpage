import { useEffect, useState } from 'react'

/*
 * Page /projets — portfolio envoyé après un échange (l'audience a déjà le WhatsApp).
 * Objectif : conversion par la preuve. En 5 secondes : « il est fort, il fait du
 * sur-mesure, il génère des revenus et des utilisateurs. »
 *
 * Ton NEUTRE (ni tu ni vous). Pas de tirets cadratins dans la copy (fait « IA »).
 * Pas de dates, pas de CTA contact, pas de label de catégorie (le chiffre parle seul).
 * Icône contextuelle : flèche ↑ = croissance, minuteur = vitesse,
 * cloche = fiabilité, écrans = multi-plateforme.
 *
 * Mise en page pensée mobile-first ET desktop (grille éditoriale large, showpiece Calorie).
 *
 * Données réelles :
 *   - Calorie  : 13 000 €/mois, 2 mois après le lancement (client) — carte vedette. IA intégrée.
 *   - Hush     : 300 000 utilisateurs sur la 1ʳᵉ version — messagerie anonyme (client) — CONFIRMÉ
 *   - Plouff Habitudes : plouff-habitudes.com — suivi d'habitudes, conçue en 45 jours — CONFIRMÉ
 *   - Wake Up Alarme   : wakeupalarm.app — réveil à missions, sonne hors-ligne / verrouillé
 *     (peu de téléchargements : ne pas utiliser ce chiffre)
 *   - Purge : tri de photos, accessible web + mobile synchronisés — CONFIRMÉ par Noé
 *
 * ⚠️ À CONFIRMER : la liste « Projets clients confidentiels » (usages réels sans détail client).
 */

const ME_PHOTO = '/assets/images/profile/me.webp'

const ICON = {
  calorie: '/assets/images/apps/calorie.webp',
  hush: '/assets/images/apps/hushapp.webp',
  plouff: '/assets/images/app-icons/plouffhabitudes.webp',
  purge: '/assets/images/apps/purge.webp',
}

const TESTIMONIALS = [
  {
    src: '/assets/images/projets/temoignage-idee.webp',
    alt: 'Témoignage client WhatsApp : d\'une simple idée à une application qui tourne',
    rotate: 'lg:-rotate-2',
  },
  {
    src: '/assets/images/projets/temoignage-refonte.webp',
    alt: 'Témoignage client WhatsApp : une application qui existait mais ne rapportait pas, remise sur pied',
    rotate: '',
  },
  {
    src: '/assets/images/projets/temoignage-delais.webp',
    alt: 'Témoignage client WhatsApp : livré dans les délais, 100 % satisfait',
    rotate: 'lg:rotate-2',
  },
]

const FEATURED = {
  icon: ICON.calorie,
  name: 'Calorie',
  tagline: 'Suivi nutrition par IA',
  highlight: '13 000 €',
  unit: '/ mois',
  note: 'Première version, 2 mois après le lancement',
  badge: 'euro',
}

const PROJECTS = [
  {
    icon: ICON.hush,
    name: 'Hush',
    tagline: 'Messagerie anonyme',
    highlight: '300K',
    unit: 'utilisateurs',
    note: 'Sur la première version',
    badge: 'trend',
  },
  {
    icon: ICON.plouff,
    name: 'Plouff Habitudes',
    tagline: 'Suivi d\'habitudes',
    highlight: '45 jours',
    unit: '',
    note: 'Du design au lancement',
    badge: 'timer',
  },
  {
    icon: ICON.purge,
    name: 'Purge',
    tagline: 'Tri & rangement de photos',
    highlight: 'Mobile + web',
    unit: '',
    note: 'Sur téléphone et ordinateur',
    badge: 'devices',
  },
]

// « Projets clients confidentiels » — l'étendue, sans rien révéler (confidentialité).
const OTHERS = [
  'Le coaching en salle de sport',
  'La gestion d\'entreprise & la logistique',
  'Une application pour faciliter le quotidien des artisans',
  'La finance personnelle',
  'Une communauté de passionnés',
  'La réservation de services',
]

const Badge = ({ type }) => {
  const paths = {
    trend: (
      <>
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="8 7 17 7 17 16" />
      </>
    ),
    timer: (
      <>
        <line x1="10" y1="2" x2="14" y2="2" />
        <circle cx="12" cy="14" r="7" />
        <line x1="12" y1="14" x2="12" y2="10" />
      </>
    ),
    euro: (
      <>
        <path d="M4 10h11" />
        <path d="M4 14h9" />
        <path d="M19 6a8 8 0 1 0 0 12" />
      </>
    ),
    devices: (
      <>
        <rect x="2" y="4" width="13" height="9" rx="1.5" />
        <path d="M6 17h4" />
        <rect x="15" y="9" width="7" height="11" rx="1.5" />
      </>
    ),
  }
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 text-brand shrink-0">
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.45" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {paths[type]}
      </svg>
    </span>
  )
}

const MetricLine = ({ p }) => (
  <div className="grid grid-cols-[1.75rem_minmax(0,1fr)] items-center gap-x-2.5">
    <Badge type={p.badge} />
    <p className="min-w-0 leading-tight">
      <span className="font-heading text-text font-extrabold tracking-tight leading-none text-[1.4rem] sm:text-[1.5rem]">
        {p.highlight}
      </span>
      {p.unit && <span className="text-text font-semibold text-[0.85rem]"> {p.unit}</span>}
    </p>
  </div>
)

const AppIdentity = ({ p, size = 'sm' }) => (
  <div className="flex items-center gap-3.5">
    <img
      src={p.icon}
      alt={p.name}
      loading="lazy"
      className={`${size === 'lg' ? 'w-14 h-14 sm:w-16 sm:h-16' : 'w-12 h-12 sm:w-14 sm:h-14'} rounded-[24%] object-cover shrink-0 border border-black/5 shadow-[0_2px_10px_rgba(3,52,117,0.08)]`}
    />
    <div className="min-w-0">
      <p className={`font-heading text-text font-bold leading-tight ${size === 'lg' ? 'text-[1.15rem] sm:text-[1.3rem]' : 'text-[1.05rem]'}`}>{p.name}</p>
      <p className="text-grey text-[0.78rem] font-medium mt-0.5">{p.tagline}</p>
    </div>
  </div>
)

const SectionHead = ({ eyebrow, title, sub }) => (
  <div className="text-center mb-8 lg:mb-12">
    {eyebrow && (
      <span className="inline-block text-brand text-[0.7rem] font-semibold uppercase tracking-[0.16em] mb-3">
        {eyebrow}
      </span>
    )}
    <h2 className="font-heading text-text font-bold text-[1.4rem] sm:text-[1.7rem] lg:text-[1.9rem] tracking-tight leading-tight">
      {title}
    </h2>
    {sub && <p className="text-grey text-[0.9rem] lg:text-[0.98rem] mt-3 max-w-[54ch] mx-auto">{sub}</p>}
  </div>
)

// Carte vedette : le showpiece de la page (la preuve revenus, sans visuel).
function FeaturedCard({ p }) {
  return (
    <div className="relative overflow-hidden bg-white border border-card-border rounded-[24px] shadow-[0_14px_60px_rgba(102,93,255,0.15)] p-7 sm:p-10 lg:p-12">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(120deg,rgba(102,93,255,0.10),rgba(102,93,255,0.02)_46%,rgba(255,255,255,0)_72%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-28 -right-24 w-[420px] h-[420px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(102,93,255,0.16),transparent_68%)]"
      />
      <div className="relative flex flex-col gap-9 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        {/* Texte */}
        <div className="lg:max-w-[36rem]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-block text-brand bg-brand-wash text-[0.68rem] font-semibold uppercase tracking-[0.16em] px-3 py-1.5 rounded-full">
              2025
            </span>
            <span className="inline-flex items-center gap-1.5 text-brand bg-brand-wash text-[0.68rem] font-semibold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full whitespace-nowrap">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2l1.7 5.5L19 9l-5.3 1.5L12 16l-1.7-5.5L5 9l5.3-1.5z" />
              </svg>
              IA intégrée
            </span>
          </div>
          <div className="mt-5">
            <AppIdentity p={p} size="lg" />
          </div>
          <p className="mt-5 max-w-[38ch] text-text/80 text-[0.98rem] sm:text-[1.05rem] leading-relaxed">
            Une idée banale, une petite application. Et pourtant, elle rapporte chaque mois.
          </p>
        </div>

        {/* Chiffre — l'ancre visuelle */}
        <div className="shrink-0">
          <div className="flex items-end gap-2">
            <span className="font-heading text-text font-extrabold text-[3rem] sm:text-[3.6rem] lg:text-[4rem] tracking-tight leading-none">
              {p.highlight}
            </span>
            <span className="text-text font-semibold text-[1.1rem] mb-2">{p.unit}</span>
          </div>
          <p className="mt-3 text-grey text-[0.85rem]">{p.note}</p>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ p }) {
  return (
    <div className="group bg-white border border-card-border rounded-[18px] p-5 sm:p-6 flex flex-col shadow-[0_2px_16px_rgba(102,93,255,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_34px_rgba(102,93,255,0.14)]">
      <div className="mb-6">
        <AppIdentity p={p} />
      </div>
      <div className="mt-auto">
        <MetricLine p={p} />
      </div>
      <p className="text-grey text-[0.75rem] mt-2 pl-[2.375rem]">{p.note}</p>
    </div>
  )
}

export default function Projets({ onBack }) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'Les applications que j\'ai conçues | Noé Calmes'
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', 'Applications conçues 100% sur-mesure : 13 000 € générés par mois, 300 000 utilisateurs, lancement en 45 jours. +20 applications publiées sur iOS et Android.')
    window.scrollTo(0, 0)
    return () => {
      document.title = prevTitle
    }
  }, [])

  const [zoom, setZoom] = useState(false)

  return (
    <div className="min-h-screen bg-surface text-text">
      {/* Navbar flottante — même langage que la landing et l'audit */}
      <header className="fixed inset-x-0 top-2.5 md:top-[18px] z-50 flex justify-center px-4 md:px-6">
        <div className="w-full max-w-210">
          <div className="backdrop-blur-[12px] border border-[#70707029] shadow-[0_1px_3px_#00000017] bg-[#fffefc99] rounded-[40px]">
            <div className="flex items-center h-[64px] md:h-[68px] pl-3 pr-4 md:pl-3.5">
              <button
                onClick={onBack}
                className="flex items-center gap-3 cursor-pointer group min-w-0"
                aria-label="Retour à l'accueil"
              >
                <img
                  src={ME_PHOTO}
                  alt="Noé Calmes"
                  loading="eager"
                  className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover shrink-0 border-2 border-white shadow-sm group-hover:scale-105 transition-transform"
                />
                <span className="flex flex-col items-start text-left min-w-0">
                  <span className="font-jakarta text-text font-extrabold text-[1rem] md:text-[1.05rem] leading-tight tracking-tight truncate group-hover:text-brand transition-colors">
                    Noé Calmes
                  </span>
                  <span className="text-grey text-[0.68rem] md:text-[0.75rem] leading-tight font-normal truncate">
                    Expert en applications mobiles
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative max-w-[1080px] mx-auto px-5 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-20">
        {/* Wash violet discret, écho du hero landing */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[440px] pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(102,93,255,0.12),rgba(255,254,252,0)_62%)]"
        />

        {/* HERO */}
        <div className="relative text-center mb-10 lg:mb-14">
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center rounded-full bg-white/70 backdrop-blur-sm border border-brand-pale px-3.5 py-1.5 shadow-[0_2px_14px_rgba(102,93,255,0.13)]">
              <p className="text-text text-[0.74rem] sm:text-[0.82rem] font-medium">
                <span className="text-brand font-bold">+20 applications</span> publiées · iOS &amp; Android
              </p>
            </div>
          </div>
          <h1 className="font-heading text-[1.95rem] sm:text-[2.4rem] lg:text-[3rem] font-extrabold text-text tracking-tight leading-[1.12] text-balance">
            Les applications que{' '}
            <span className="inline-block whitespace-nowrap bg-[linear-gradient(90deg,#6760ff,#7b73ef,#9e94ff)] bg-clip-text text-transparent py-1 -my-1">
              j'ai conçues
            </span>
          </h1>
          <p className="text-grey text-[0.95rem] sm:text-base lg:text-[1.05rem] mt-5 max-w-[46ch] sm:max-w-[60ch] mx-auto text-balance leading-relaxed">
            Chaque application part d'une idée. Je la cadre, je la conçois 100&nbsp;% sur-mesure, de la stratégie au lancement.
          </p>
        </div>

        {/* SHOWPIECE — la preuve revenus d'abord */}
        <div className="relative">
          <FeaturedCard p={FEATURED} />
        </div>

        {/* TROIS AUTRES APPS */}
        <div className="relative mt-16 lg:mt-24">
          <SectionHead
            eyebrow="Réalisations"
            title="Trois autres applications, trois preuves"
            sub="Des utilisateurs, de la vitesse d'exécution, du multi-plateforme."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.name} p={p} />
            ))}
          </div>
        </div>

        {/* PROJETS CONFIDENTIELS — l'étendue, sans détail sensible */}
        <div className="relative mt-16 lg:mt-24 overflow-hidden bg-card border border-card-border rounded-[24px] p-7 sm:p-10 lg:p-14">
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -left-20 w-[360px] h-[360px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(102,93,255,0.10),transparent_70%)]"
          />
          <div className="relative">
            <SectionHead
              title="Projets clients confidentiels"
              sub="Des secteurs différents, présentés sans noms, sans écrans et sans détails sensibles."
            />
            <div className="max-w-[760px] mx-auto">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
                {OTHERS.map((o) => (
                  <li key={o} className="flex items-center gap-3 text-text text-[0.92rem] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                    {o}
                  </li>
                ))}
              </ul>
              <p className="text-grey text-[0.9rem] font-medium mt-5">Et d'autres encore…</p>
              <div className="flex items-center gap-2.5 text-grey text-[0.8rem] mt-6">
                <svg className="shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="4" y="11" width="16" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
                <span className="text-left leading-relaxed">
                  Chaque projet reste confidentiel : les noms, les chiffres et les écrans restent côté client.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* TÉMOIGNAGES — captures réelles, format story */}
        <div className="relative mt-16 lg:mt-24">
          <SectionHead eyebrow="Retours clients" title="Ce qu'en disent mes clients" />
          <div className="mt-2 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 lg:gap-6">
            {TESTIMONIALS.map((t) => (
              <img
                key={t.src}
                src={t.src}
                alt={t.alt}
                loading="lazy"
                className={`w-full max-w-[330px] lg:max-w-[300px] rounded-[18px] border border-card-border shadow-[0_10px_36px_rgba(102,93,255,0.14)] transition-transform duration-300 hover:-translate-y-1 hover:rotate-0 ${t.rotate}`}
              />
            ))}
          </div>
        </div>

        {/* SPÉCIALITÉ + INSTAGRAM — deux colonnes sur desktop */}
        <div className="relative mt-16 lg:mt-24 grid gap-4 lg:grid-cols-2 lg:gap-6 items-stretch">
          {/* Spécialité */}
          <div className="relative overflow-hidden bg-white border border-card-border rounded-[24px] p-7 sm:p-9 flex flex-col justify-center shadow-[0_2px_16px_rgba(102,93,255,0.06)]">
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none bg-[linear-gradient(115deg,rgba(102,93,255,0.07),rgba(255,255,255,0)_62%)]"
            />
            <span className="relative inline-block text-brand text-[0.7rem] font-semibold uppercase tracking-[0.16em] mb-3">
              Ma spécialité
            </span>
            <h2 className="relative font-heading text-text font-bold text-[1.3rem] lg:text-[1.5rem] tracking-tight mb-3">
              Les projets complexes
            </h2>
            <p className="relative text-grey text-[0.92rem] lg:text-[0.98rem] max-w-[46ch] leading-relaxed">
              IA intégrée, automatisations, applications connectées entre mobile et web. Plus le projet est ambitieux, plus il m'intéresse.
            </p>
          </div>

          {/* Instagram — post épinglé, miniature agrandissable */}
          <div className="relative flex items-center gap-4 sm:gap-5 bg-white border border-card-border rounded-[24px] p-6 sm:p-8 shadow-[0_2px_16px_rgba(102,93,255,0.06)] transition-shadow hover:shadow-[0_10px_30px_rgba(102,93,255,0.13)]">
            <button
              type="button"
              onClick={() => setZoom(true)}
              className="group relative shrink-0 cursor-zoom-in rounded-[16px] border-0 bg-transparent p-0"
              aria-label="Agrandir l'image du post Instagram"
            >
              <img
                src="/assets/images/projets/ig-post-90.webp"
                alt="Publication Instagram : pourquoi 90 % des applications ne rapportent rien"
                loading="lazy"
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-[16px] object-cover shrink-0 border border-black/5 shadow-[0_4px_18px_rgba(3,52,117,0.14)] transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <span className="absolute bottom-2 right-2 inline-flex items-center justify-center w-7 h-7 rounded-full bg-black/55 text-white backdrop-blur-sm">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </span>
            </button>
            <div className="min-w-0 flex-1">
              <span className="inline-flex items-center gap-1.5 text-brand text-[0.7rem] font-semibold uppercase tracking-wide mb-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
                </svg>
                Instagram
              </span>
              <a
                href="https://www.instagram.com/noecalmes.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-heading text-text font-bold text-[1rem] leading-snug hover:text-brand transition-colors"
              >
                « Pourquoi 90&nbsp;% des applications ne rapportent rien »
              </a>
              <a
                href="https://www.instagram.com/noecalmes.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-2.5 text-grey text-[0.8rem] font-medium hover:text-brand transition-colors"
              >
                Voir sur @noecalmes.app
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="8 7 17 7 17 16" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Lightbox — zoom plein écran de l'image */}
        {zoom && (
          <div
            onClick={() => setZoom(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out"
            role="dialog"
            aria-modal="true"
          >
            <img
              src="/assets/images/projets/ig-post-90.webp"
              alt="Publication Instagram : pourquoi 90 % des applications ne rapportent rien"
              className="max-h-[82vh] max-w-[88vw] sm:max-h-[74vh] sm:max-w-[560px] w-auto rounded-[16px] shadow-2xl"
            />
            <button
              type="button"
              onClick={() => setZoom(false)}
              aria-label="Fermer"
              className="absolute top-5 right-5 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors cursor-pointer"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}

        <p className="relative text-center text-grey text-[0.8rem] mt-16 lg:mt-20 font-medium">
          Noé Calmes · Expert en application mobile · iOS &amp; Android
        </p>
      </main>
    </div>
  )
}
