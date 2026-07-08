import { useEffect } from 'react'

/*
 * Page /projets — portfolio envoyé après un échange (l'audience a déjà le WhatsApp).
 * Objectif : conversion par la preuve. En 5 secondes : « il est fort, il fait du
 * sur-mesure, il génère des revenus et des utilisateurs. »
 *
 * Ton NEUTRE (ni tu ni vous) : page de présentation, évite l'incohérence
 * tutoiement landing / vouvoiement brief.
 *
 * Pas de dates, pas de CTA, pas de label de catégorie (le chiffre parle seul).
 * Icône contextuelle : flèche ↑ = croissance, minuteur = vitesse,
 * puce = technicité, bouclier = confidentialité produit.
 *
 * Design aligné sur la landing : pill à icônes d'apps superposées (hero home),
 * surligneur violet signature, ombres teintées brand, carte Calorie en vedette.
 *
 * Données réelles :
 *   - Calorie  : 13 000 €/mois, 2 mois après le lancement (client) — carte vedette
 *   - Hush     : 300 000 utilisateurs sur la 1ʳᵉ version — messagerie anonyme (client)
 *   - Plouff Habitudes : plouff-habitudes.com — suivi d'habitudes, conçue en ~30 jours
 *   - Wake Up Alarme   : wakeupalarm.app — réveil à missions, sonne hors-ligne
 *   - Purge : tri de photos 100 % on-device (apps.apple.com/app/id6762089158)
 *
 * ⚠️ À CONFIRMER : Hush 300k · Plouff 30 jours · la liste « Des applications pour… ».
 */

const ICON = {
  calorie: '/assets/images/apps/calorie.webp',
  hush: '/assets/images/apps/hushapp.webp',
  plouff: '/assets/images/app-icons/plouffhabitudes.webp',
  wakeup: '/assets/images/app-icons/wackupalarme.webp',
  purge: '/assets/images/apps/purge.webp',
  snap: '/assets/images/apps/snapmaster.png',
}

const FEATURED = {
  icon: ICON.calorie,
  name: 'Calorie',
  tagline: 'Suivi nutrition & calories',
  highlight: '13 000 €',
  unit: '/ mois',
  note: '2 mois après le lancement',
  badge: 'trend',
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
    highlight: '30 jours',
    unit: '',
    note: 'Du design au lancement',
    badge: 'timer',
  },
  {
    icon: ICON.wakeup,
    name: 'Wake Up Alarme',
    tagline: 'Réveil à missions',
    highlight: 'Sonne hors-ligne',
    unit: '',
    note: 'Audio en arrière-plan — ce que très peu d\'applications savent faire',
    badge: 'chip',
  },
  {
    icon: ICON.purge,
    name: 'Purge',
    tagline: 'Tri & rangement de photos',
    highlight: '100 % privé',
    unit: '',
    note: 'Analyse des photos sur l\'appareil — rien ne quitte le téléphone',
    badge: 'shield',
  },
]

// « Des applications pour… » — l'étendue, sans rien révéler (confidentialité).
// Usages réels + placeholders à ajuster. Purge est devenue une carte (retirée d'ici).
const OTHERS = [
  'Le coaching en salle de sport',
  'La gestion d\'entreprise & la logistique',
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
    chip: (
      <>
        <rect x="8" y="8" width="8" height="8" rx="1" />
        <path d="M10 2v3M14 2v3M10 19v3M14 19v3M2 10h3M2 14h3M19 10h3M19 14h3" />
      </>
    ),
    shield: (
      <>
        <path d="M12 2l8 4v6c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10V6l8-4z" />
        <polyline points="9 12 11 14 15 10" />
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
      <p className={`font-heading text-text font-bold leading-tight truncate ${size === 'lg' ? 'text-[1.15rem] sm:text-[1.3rem]' : 'text-[1.05rem]'}`}>{p.name}</p>
      <p className="text-grey text-[0.78rem] font-medium mt-0.5">{p.tagline}</p>
    </div>
  </div>
)

function FeaturedCard({ p }) {
  return (
    <div className="relative overflow-hidden bg-white border border-card-border rounded-[18px] p-5 sm:p-7 shadow-[0_4px_24px_rgba(102,93,255,0.09)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(115deg,rgba(102,93,255,0.09),rgba(102,93,255,0.03)_45%,rgba(255,255,255,0)_70%)]"
      />
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <AppIdentity p={p} size="lg" />
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <Badge type={p.badge} />
            <span className="font-heading text-text font-extrabold text-[2rem] sm:text-[2.5rem] tracking-tight leading-none">
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
      <div className="mt-auto flex items-center gap-2 flex-wrap">
        <Badge type={p.badge} />
        <span className="font-heading text-text font-extrabold text-[1.4rem] sm:text-[1.6rem] tracking-tight leading-none">
          {p.highlight}
        </span>
        {p.unit && <span className="text-text text-[0.85rem] font-semibold">{p.unit}</span>}
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
      ?.setAttribute('content', 'Applications conçues 100% sur-mesure : 13 000 € générés par mois, 300 000 utilisateurs, lancement en 30 jours. +20 applications publiées sur iOS et Android.')
    window.scrollTo(0, 0)
    return () => {
      document.title = prevTitle
    }
  }, [])

  return (
    <div className="min-h-screen bg-surface text-text">
      <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-3xl mx-auto flex items-center justify-between px-5 h-14">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-text text-sm font-medium cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Retour
          </button>
          <span className="font-heading font-bold text-text">Noé Calmes</span>
        </div>
      </header>

      <main className="relative max-w-3xl mx-auto px-5 pt-10 pb-16">
        {/* Wash violet discret, écho du hero landing */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[380px] pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(102,93,255,0.10),rgba(255,254,252,0)_65%)]"
        />

        <div className="relative text-center mb-9">
          {/* Pill preuve — même langage visuel que le hero de la landing */}
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-2.5 rounded-full bg-white/70 backdrop-blur-sm border border-brand-pale pl-1.5 pr-3.5 py-1 shadow-[0_2px_14px_rgba(102,93,255,0.13)]">
              <div className="flex items-center">
                {[ICON.snap, ICON.calorie, ICON.purge, ICON.hush].map((icon, i) => (
                  <img
                    key={icon}
                    src={icon}
                    alt=""
                    width="26"
                    height="26"
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-[28%] border border-white object-cover"
                    style={{ marginLeft: i === 0 ? 0 : '-7px', zIndex: i }}
                  />
                ))}
              </div>
              <p className="text-text text-[0.74rem] sm:text-[0.82rem] font-medium">
                <span className="text-brand font-bold">+20 applications</span> publiées · iOS &amp; Android
              </p>
            </div>
          </div>

          <h1 className="font-heading text-[1.9rem] sm:text-[2.3rem] font-extrabold text-text tracking-tight leading-[1.15] text-balance">
            Les applications que j'ai{' '}
            <span className="relative z-0 inline-block whitespace-nowrap text-brand after:content-[''] after:absolute after:-left-2 after:-right-2 after:bottom-[-1px] after:h-[26%] after:rounded after:bg-[rgba(102,93,255,0.22)] after:z-[-1]">
              conçues
            </span>
          </h1>
          <p className="text-grey text-[0.92rem] sm:text-base mt-4 max-w-[46ch] mx-auto text-balance">
            Chaque application part d'une idée. Je la cadre, je la conçois 100&nbsp;% sur-mesure — de la stratégie au lancement. Voici ce que ça donne.
          </p>
        </div>

        {/* Carte vedette — la preuve revenus d'abord */}
        <div className="relative mb-4">
          <FeaturedCard p={FEATURED} />
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.name} p={p} />
          ))}
        </div>

        {/* Étendue — sans rien révéler */}
        <div className="relative mt-12 bg-card border border-card-border rounded-[18px] p-6 sm:p-8">
          <h2 className="font-heading text-text font-bold text-[1.15rem] text-center mb-1">
            Des applications pour…
          </h2>
          <p className="text-grey text-[0.85rem] text-center max-w-[42ch] mx-auto mb-6">
            Des secteurs très différents, une même exigence de conception.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5 max-w-[540px] mx-auto mb-7">
            {OTHERS.map((o) => (
              <li key={o} className="flex items-center gap-2.5 text-text text-[0.9rem] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                {o}
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-center gap-2 text-grey text-[0.8rem] max-w-[48ch] mx-auto text-center">
            <svg className="shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="4" y="11" width="16" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            <span className="text-left leading-relaxed">
              Ces projets restent confidentiels : je n'affiche ni le nom du client, ni les chiffres, ni les écrans.
            </span>
          </div>
        </div>

        <p className="relative text-center text-grey text-[0.8rem] mt-10 font-medium">
          Noé Calmes · Expert en application mobile · iOS &amp; Android
        </p>
      </main>
    </div>
  )
}
