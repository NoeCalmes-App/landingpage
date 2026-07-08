import { useEffect } from 'react'

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
 * Données réelles :
 *   - Calorie  : 13 000 €/mois, 2 mois après le lancement (client) — carte vedette. IA intégrée.
 *   - Hush     : 300 000 utilisateurs sur la 1ʳᵉ version — messagerie anonyme (client) — CONFIRMÉ
 *   - Plouff Habitudes : plouff-habitudes.com — suivi d'habitudes, conçue en 45 jours — CONFIRMÉ
 *   - Wake Up Alarme   : wakeupalarm.app — réveil à missions, sonne hors-ligne / verrouillé
 *     (peu de téléchargements : ne pas utiliser ce chiffre)
 *   - Purge : tri de photos, accessible web + mobile synchronisés — CONFIRMÉ par Noé
 *
 * ⚠️ À CONFIRMER : la liste « Des applications pour… » (usages réels sans détail client).
 */

const ME_PHOTO = '/assets/images/profile/me.webp'
const WHATSAPP_URL = 'https://wa.me/33658308210'

const ICON = {
  calorie: '/assets/images/apps/calorie.webp',
  hush: '/assets/images/apps/hushapp.webp',
  plouff: '/assets/images/app-icons/plouffhabitudes.webp',
  purge: '/assets/images/apps/purge.webp',
}

const TESTIMONIALS = [
  {
    src: '/assets/images/projets/temoignage-delais.webp',
    alt: 'Témoignage client WhatsApp : livré dans les délais, 100 % satisfait',
    rotate: 'sm:-rotate-2',
  },
  {
    src: '/assets/images/projets/temoignage-refonte.webp',
    alt: 'Témoignage client WhatsApp : une application qui existait mais ne rapportait pas, remise sur pied',
    rotate: 'sm:rotate-2',
  },
]

const FEATURED = {
  icon: ICON.calorie,
  name: 'Calorie',
  tagline: 'Suivi nutrition par IA',
  highlight: '13 000 €',
  unit: '/ mois',
  note: '2 mois après le lancement',
  badge: 'euro',
}

const PROJECTS = [
  {
    icon: ICON.hush,
    name: 'Hush',
    tagline: 'Messagerie anonyme',
    highlight: '300 000',
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
    highlight: 'Web + mobile',
    unit: '',
    note: 'La même application sur téléphone et ordinateur',
    badge: 'devices',
  },
]

// « Des applications pour… » — l'étendue, sans rien révéler (confidentialité).
const OTHERS = [
  'Le coaching en salle de sport',
  'La gestion d\'entreprise & la logistique',
  'Les devis d\'artisans créés à la voix, avec l\'IA',
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
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand text-white shrink-0">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {paths[type]}
      </svg>
    </span>
  )
}

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

function FeaturedCard({ p }) {
  return (
    <div className="relative overflow-hidden bg-white border border-card-border rounded-[18px] p-5 sm:p-7 lg:p-9 shadow-[0_4px_24px_rgba(102,93,255,0.09)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(115deg,rgba(102,93,255,0.09),rgba(102,93,255,0.03)_45%,rgba(255,255,255,0)_70%)]"
      />
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <AppIdentity p={p} size="lg" />
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <Badge type={p.badge} />
            <span className="font-heading text-text font-extrabold text-[2rem] sm:text-[2.5rem] lg:text-[2.8rem] tracking-tight leading-none">
              {p.highlight}
            </span>
            {p.unit && <span className="text-text text-[0.95rem] font-semibold">{p.unit}</span>}
          </div>
          <p className="text-grey text-[0.78rem] mt-2">{p.note}</p>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ p }) {
  return (
    <div className="bg-white border border-card-border rounded-[18px] p-5 sm:p-6 flex flex-col shadow-[0_2px_16px_rgba(102,93,255,0.06)]">
      <div className="mb-5">
        <AppIdentity p={p} />
      </div>
      <div className="mt-auto flex items-center gap-2">
        <Badge type={p.badge} />
        <p className="flex-1 min-w-0 leading-tight">
          <span className="font-heading text-text font-extrabold text-[1.4rem] sm:text-[1.5rem] tracking-tight leading-none">
            {p.highlight}
          </span>
          {p.unit && <span className="text-text text-[0.85rem] font-semibold"> {p.unit}</span>}
        </p>
      </div>
      <p className="text-grey text-[0.75rem] mt-2">{p.note}</p>
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

  return (
    <div className="min-h-screen bg-surface text-text">
      {/* Navbar flottante — même langage que la landing et l'audit */}
      <header className="fixed inset-x-0 top-2.5 md:top-[18px] z-50 flex justify-center px-4 md:px-6">
        <div className="w-full max-w-210">
          <div className="backdrop-blur-[12px] border border-[#70707029] shadow-[0_1px_3px_#00000017] bg-[#fffefc99] rounded-[40px]">
            <div className="flex items-center justify-between h-[64px] md:h-[68px] pl-3 pr-2.5 md:pl-4 md:pr-3">
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
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#131313] text-white text-sm font-medium px-4 md:px-5 py-2.5 rounded-full hover:bg-black transition-colors shrink-0"
              >
                <span className="sm:hidden">Discuter</span>
                <span className="hidden sm:inline">Discuter avec Noé</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="relative max-w-210 mx-auto px-5 pt-28 md:pt-32 pb-16">
        {/* Wash violet discret, écho du hero landing */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[380px] pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(102,93,255,0.10),rgba(255,254,252,0)_65%)]"
        />

        <div className="relative text-center mb-9">
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center rounded-full bg-white/70 backdrop-blur-sm border border-brand-pale px-3.5 py-1.5 shadow-[0_2px_14px_rgba(102,93,255,0.13)]">
              <p className="text-text text-[0.74rem] sm:text-[0.82rem] font-medium">
                <span className="text-brand font-bold">+20 applications</span> publiées · iOS &amp; Android
              </p>
            </div>
          </div>
          <h1 className="font-heading text-[1.9rem] sm:text-[2.3rem] lg:text-[2.6rem] font-extrabold text-text tracking-tight leading-[1.15] text-balance">
            Les applications que{' '}
            <span className="inline-block whitespace-nowrap bg-[linear-gradient(90deg,#6760ff,#7b73ef,#9e94ff)] bg-clip-text text-transparent py-1 -my-1">
              j'ai conçues
            </span>
          </h1>
          <p className="text-grey text-[0.92rem] sm:text-base mt-4 max-w-[46ch] sm:max-w-[62ch] mx-auto text-balance">
            Chaque application part d'une idée. Je la cadre, je la conçois 100&nbsp;% sur-mesure, de la stratégie au lancement. Voici ce que ça donne.
          </p>
        </div>

        {/* Carte vedette — la preuve revenus d'abord */}
        <div className="relative mb-4">
          <FeaturedCard p={FEATURED} />
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.name} p={p} />
          ))}
        </div>

        {/* Étendue — sans rien révéler */}
        <div className="relative mt-12 bg-card border border-card-border rounded-[18px] p-6 sm:p-8">
          <h2 className="font-heading text-text font-bold text-[1.15rem] text-center mb-1">
            Des applications pour…
          </h2>
          <p className="text-grey text-[0.85rem] text-center max-w-[46ch] mx-auto mb-6">
            Des secteurs très différents, un même objectif : générer des revenus ou automatiser des heures de travail.
          </p>
          <div className="max-w-[540px] lg:max-w-[720px] mx-auto">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5">
              {OTHERS.map((o) => (
                <li key={o} className="flex items-center gap-2.5 text-text text-[0.9rem] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                  {o}
                </li>
              ))}
            </ul>
            <p className="text-grey text-[0.9rem] font-medium text-center mt-4">Et d'autres encore…</p>
            <div className="flex items-center gap-2 text-grey text-[0.8rem] mt-6">
              <svg className="shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="4" y="11" width="16" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
              <span className="text-left leading-relaxed">
                Ces projets restent confidentiels : je n'affiche ni le nom du client, ni les chiffres, ni les écrans.
              </span>
            </div>
          </div>
        </div>

        {/* Témoignages — captures réelles, format story */}
        <div className="relative mt-12">
          <h2 className="font-heading text-text font-bold text-[1.15rem] text-center mb-1">
            Ce qu'en disent mes clients
          </h2>
          <p className="text-grey text-[0.85rem] text-center mb-7">
            Des messages reçus, tels quels.
          </p>
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-6 sm:gap-8">
            {TESTIMONIALS.map((t) => (
              <img
                key={t.src}
                src={t.src}
                alt={t.alt}
                loading="lazy"
                className={`w-full max-w-[330px] sm:max-w-[315px] rounded-[18px] border border-card-border shadow-[0_6px_28px_rgba(102,93,255,0.12)] ${t.rotate}`}
              />
            ))}
          </div>
        </div>

        {/* Signature d'expert — les projets complexes */}
        <div className="relative mt-4 overflow-hidden bg-white border border-card-border rounded-[18px] p-6 sm:p-8 text-center shadow-[0_2px_16px_rgba(102,93,255,0.06)]">
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none bg-[linear-gradient(115deg,rgba(102,93,255,0.06),rgba(255,255,255,0)_60%)]"
          />
          <h2 className="relative font-heading text-text font-bold text-[1.15rem] mb-2">
            Ma spécialité : les projets complexes
          </h2>
          <p className="relative text-grey text-[0.9rem] max-w-[52ch] mx-auto leading-relaxed">
            IA intégrée, automatisations, applications connectées entre web et mobile. Plus le projet est ambitieux, plus il m'intéresse.
          </p>
        </div>

        {/* Instagram — teaser du post épinglé, seul lien sortant de la page */}
        <a
          href="https://www.instagram.com/noecalmes.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative mt-4 flex items-center gap-4 bg-white border border-card-border rounded-[18px] p-5 sm:p-6 shadow-[0_2px_16px_rgba(102,93,255,0.06)] transition-shadow hover:shadow-[0_4px_24px_rgba(102,93,255,0.12)]"
        >
          <span className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-[24%] bg-brand-wash text-brand shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4.5" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-heading text-text font-bold text-[1rem] leading-snug">
              « Pourquoi 90&nbsp;% des applications ne rapportent rien »
            </span>
            <span className="block text-grey text-[0.78rem] font-medium mt-0.5">
              L'analyse est épinglée sur mon profil · @noecalmes.app
            </span>
          </span>
          <svg className="text-grey shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="8 7 17 7 17 16" />
          </svg>
        </a>

        <p className="relative text-center text-grey text-[0.8rem] mt-10 font-medium">
          Noé Calmes · Expert en application mobile · iOS &amp; Android
        </p>
      </main>
    </div>
  )
}
