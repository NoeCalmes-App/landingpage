// Hero /audit-app — question-first.
//
// Le bon hook est simple : les 3 questions qu'un porteur de projet se pose
// avant de payer le developpement d'une app. On garde ce miroir, mais avec
// une mise en page differente de la home pour eviter l'effet "meme hero".

import { HERO_QUESTIONS } from './config'

// Styles de "papier desordonné" : rotation legere visible sur mobile,
// rotation un poil plus discrete sur desktop pour ne pas attirer trop
// l'attention sur l'effet (le contenu prime). La carte du milieu reste
// droite pour ancrer la grille.
const QUESTION_CARD_STYLES = [
  'rotate-[1deg] translate-x-[3px] translate-y-[1px] md:rotate-[0.8deg] md:translate-x-1 md:translate-y-0.5',
  'rotate-0',
  '-rotate-[1deg] -translate-x-[3px] translate-y-[1px] md:-rotate-[0.8deg] md:-translate-x-1 md:translate-y-0.5',
]

export default function AuditAppHero({ onStart, onLegal }) {
  const goLegal = (target) => {
    if (typeof onLegal === 'function') onLegal(target)
  }

  return (
    <section
      className="relative flex-1 h-[100svh] px-5 md:px-10 pt-[108px] pb-17 md:pt-[120px] md:pb-18 bg-surface overflow-hidden flex items-center justify-center text-center"
      style={{
        backgroundImage:
          'linear-gradient(180deg, #fffefc 0%, #f8f9ff 58%, #f9f9f9 100%)',
      }}
    >
      <div className="anim-hero w-full max-w-170 mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-card-border shadow-sm mb-6 md:mb-7">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
          </span>
          <p className="text-text text-[0.76rem] md:text-[0.8rem] font-semibold tracking-wide uppercase">
            Audit express · 2 minutes
          </p>
        </div>

        <h1 className="font-heading text-[2.05rem] sm:text-[2.45rem] md:text-[2.9rem] lg:text-[3.2rem] font-extrabold text-text tracking-tight leading-[1.08] mb-10 md:mb-14">
          Vous vous posez
          <br />
          ces{' '}
          <span className="text-brand relative inline-block whitespace-nowrap">
            3 questions
            <svg
              className="absolute -bottom-2 md:-bottom-3 left-0 w-full h-4"
              viewBox="0 0 220 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M2 11 C70 4 150 4 218 7"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </span>{' '}
          ?
        </h1>

        <div className="grid grid-cols-1 gap-2.5 md:gap-3 w-full max-w-132 mb-12 md:mb-16">
          {HERO_QUESTIONS.map((q, i) => (
            <div
              key={q}
              className={`bg-white border border-card-border rounded-2xl px-4 py-3.5 md:px-6 md:py-4.5 shadow-[0_10px_30px_-24px_rgba(3,52,117,0.35)] flex items-center gap-3 md:gap-4 text-left transition-transform duration-300 hover:rotate-0 hover:translate-x-0 hover:translate-y-0 ${QUESTION_CARD_STYLES[i] || ''}`}
            >
              <span className="shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-full bg-brand/12 text-brand flex items-center justify-center font-heading font-bold text-[0.92rem]">
                {i + 1}
              </span>
              <p className="text-text text-[0.95rem] md:text-[1.04rem] font-semibold leading-snug">
                {`« ${q} »`}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          className="group inline-flex items-center justify-center gap-2.5 bg-brand text-surface font-semibold text-[0.95rem] md:text-base px-8 py-3.5 md:px-10 md:py-4 rounded-full cursor-pointer hover:bg-text transition-colors"
        >
          Lancer mon audit gratuit
          <svg
            className="transition-transform duration-300 group-hover:translate-x-1"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-4 md:bottom-5 px-5">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <button onClick={() => goLegal('cgv')} className="text-grey/60 text-xs hover:text-text transition-colors cursor-pointer">CGV</button>
          <button onClick={() => goLegal('mentions')} className="text-grey/60 text-xs hover:text-text transition-colors cursor-pointer">Mentions légales</button>
          <button onClick={() => goLegal('privacy')} className="text-grey/60 text-xs hover:text-text transition-colors cursor-pointer">Politique de confidentialité</button>
        </div>
      </div>
    </section>
  )
}
