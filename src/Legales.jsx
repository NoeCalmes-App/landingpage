import { useState } from 'react'

const LEGAL_INFO = [
  { label: 'SIREN', value: '922 623 814' },
  { label: 'SIRET (siège)', value: '922 623 814 00030' },
  { label: 'Forme juridique', value: 'Entrepreneur individuel' },
  { label: 'Micro-entreprise', value: 'Oui' },
  { label: 'Numéro de TVA', value: 'FR25922623814' },
  { label: 'Numéro RCS', value: '922 623 814 R.C.S. Rodez' },
  { label: 'Code NAF / APE', value: '62.01Z — Programmation informatique' },
  { label: 'Activité', value: 'Conception, développement et maintenance de sites internet, réseaux intranets et tout système informatique pour le compte de tiers' },
]

const COPY_TEXT = `Informations juridiques de CALMES NOÉ
SIREN : 922 623 814
SIRET (siège) : 922 623 814 00030
Forme juridique : Entrepreneur individuel
Micro-entreprise : Oui
Numéro de TVA : FR25922623814
Numéro RCS : 922 623 814 R.C.S. Rodez
Code NAF / APE : 62.01Z — Programmation informatique`

function LegalRow({ label, value }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-start justify-between gap-4 py-4 border-b border-[#e8e8e8] last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-[#888] text-[0.78rem] font-medium mb-0.5">{label}</p>
        <p className="text-[#131313] text-[0.92rem] font-semibold leading-snug">{value}</p>
      </div>
      <button
        onClick={copy}
        title="Copier"
        className="shrink-0 mt-1 w-8 h-8 rounded-[10px] border border-[#e5e5e5] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors cursor-pointer"
      >
        {copied ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>
    </div>
  )
}

function Legales() {
  const [allCopied, setAllCopied] = useState(false)

  const copyAll = () => {
    navigator.clipboard.writeText(COPY_TEXT)
    setAllCopied(true)
    setTimeout(() => setAllCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-[#e5e5e5] px-5 py-4 flex items-center justify-center gap-2">
        <a
          href="/documents"
          className="px-5 py-2 rounded-full bg-[#f3f3f3] text-[#131313] font-semibold text-sm transition-colors hover:bg-[#e8e8e8]"
        >
          Documents
        </a>
        <a
          href="/contactnoe"
          className="px-5 py-2 rounded-full bg-[#f3f3f3] text-[#131313] font-semibold text-sm transition-colors hover:bg-[#e8e8e8]"
        >
          Contact
        </a>
        <a
          href="/legal"
          className="px-5 py-2 rounded-full bg-[#665dff] text-white font-semibold text-sm transition-opacity hover:opacity-80"
        >
          Légal
        </a>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pt-12 pb-20 max-w-lg mx-auto w-full">
        {/* Title */}
        <div className="mb-10">
          <h1 className="font-heading text-[#131313] text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
            Informations légales
          </h1>
          <p className="text-grey text-[0.95rem]">
            Informations légales de Noé Calmes
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#e8e8e8] rounded-[22px] px-6 pt-2 pb-4 mb-4">
          {LEGAL_INFO.map(({ label, value }) => (
            <LegalRow key={label} label={label} value={value} />
          ))}
        </div>

        {/* Copy all button */}
        <button
          onClick={copyAll}
          className="w-full flex items-center justify-center gap-2 border border-[#e5e5e5] bg-white rounded-[18px] py-3.5 text-[#131313] text-[0.88rem] font-semibold hover:bg-[#f5f5f5] transition-colors cursor-pointer"
        >
          {allCopied ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-[#22c55e]">Copié !</span>
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copier toutes les informations
            </>
          )}
        </button>
      </div>

      {/* Footer */}
      <div className="text-center py-6 border-t border-[#e5e5e5]">
        <p className="text-grey text-[0.8rem]">
          &copy; 2026 Noé Calmes
        </p>
      </div>
    </div>
  )
}

export default Legales
