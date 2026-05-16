// Hero /audit-app — conversion-first.
//
// Le prospect arrive sans me connaitre. Il s'en fout de mes +20 apps.
// Ce qu'il veut savoir : est-ce que JE comprends ses doutes.
//
// Donc on le confronte a SES 3 questions des qu'il arrive. Effet miroir =
// "ce mec a capte exactement ce que je me dis dans ma tete". Une fois ce
// hook pose, on lui propose la resolution : un test 2 min.
//
// Inspiration : landing-page style Hormozi/Brunson — peu de texte, pain
// point en avant, CTA dominant, risk reversal en microcopy.

import { HERO_QUESTIONS } from './config'

export default function AuditAppHero({ onStart }) {
  return (
    <section
      className="flex-1 flex items-center justify-center text-center px-5 md:px-10"
      style={{
        backgroundImage:
          'radial-gradient(circle farthest-side at 50% 0%, var(--color-surface) 50%, transparent), linear-gradient(0deg, #f9f9f9, #867ffe 23%, var(--color-brand) 75%, white)',
      }}
    >
      <div className="anim-hero max-w-170 mx-auto w-full pt-28 pb-12 md:pt-32 md:pb-16">
        {/* Badge pre-headline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-sm border border-white/60 shadow-sm mb-7 md:mb-8">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
          </span>
          <p className="text-text text-[0.78rem] md:text-[0.82rem] font-semibold tracking-wide uppercase">
            Audit gratuit · 2 minutes
          </p>
        </div>

        {/* H1 — introduit les 3 questions */}
        <h1 className="font-heading text-[2rem] sm:text-[2.4rem] md:text-[2.9rem] lg:text-[3.2rem] font-extrabold text-text tracking-tight leading-[1.08] mb-9 md:mb-10">
          Vous vous posez
          <br />
          ces{' '}
          <span className="text-brand relative whitespace-nowrap">
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

        {/* Les 3 questions — heart of the hero */}
        <div className="grid grid-cols-1 gap-2.5 md:gap-3 max-w-130 mx-auto mb-10 md:mb-12">
          {HERO_QUESTIONS.map((q, i) => (
            <div
              key={q}
              className="bg-white/85 backdrop-blur-sm border border-white/60 rounded-2xl px-5 py-4 md:px-6 md:py-5 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] flex items-center gap-3 md:gap-4 text-left"
            >
              <span className="shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-full bg-brand/12 text-brand flex items-center justify-center font-heading font-bold text-[0.92rem]">
                {i + 1}
              </span>
              <p className="text-text text-[0.97rem] md:text-[1.05rem] font-semibold leading-snug">
                {`« ${q} »`}
              </p>
            </div>
          ))}
        </div>

        {/* CTA dominant */}
        <button
          onClick={onStart}
          className="group inline-flex items-center gap-2.5 bg-brand text-surface font-semibold text-[0.95rem] md:text-base px-8 py-3.5 md:px-10 md:py-4 rounded-full cursor-pointer"
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
    </section>
  )
}
