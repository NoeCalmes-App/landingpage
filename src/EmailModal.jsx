// La fenêtre « Envoyer un email » — Gmail, Outlook, Yahoo, application mail.
//
// EXTRAITE DE `ContactNoe.jsx` LE 18 AOÛT 2026. La barre de navigation
// (`NavDocuments`) doit l'ouvrir depuis son icône e-mail, mais `ContactNoe`
// importe déjà `NavDocuments` : l'importer en retour aurait créé un cycle
// d'imports, fragile et silencieux jusqu'au jour où il casse.
//
// Elle vit donc dans son propre fichier, et les trois appelants (la barre,
// la page Contact, le pied de page) importent la MÊME définition. `EMAIL` est
// exporté avec elle : c'est l'adresse de référence.

import { useState } from 'react'
import { createPortal } from 'react-dom'
import { ICONES, IconeMarque } from './iconesDocument.jsx'

export const EMAIL = 'contact@noecalmes.fr'

const EMAIL_OPTIONS = [
  {
    label: 'Gmail',
    sublabel: 'Ouvrir dans Gmail',
    href: `https://mail.google.com/mail/?view=cm&to=${EMAIL}`,
    icone: ICONES.gmail,
  },
  {
    label: 'Outlook',
    sublabel: 'Ouvrir dans Outlook',
    href: `https://outlook.live.com/mail/0/deeplink/compose?to=${EMAIL}`,
    icone: ICONES.outlook,
  },
  {
    label: 'Yahoo Mail',
    sublabel: 'Ouvrir dans Yahoo',
    href: `https://compose.mail.yahoo.com/?to=${EMAIL}`,
    icone: ICONES.yahoo,
  },
  {
    label: 'Application mail',
    sublabel: 'Mac Mail, Outlook desktop…',
    href: `mailto:${EMAIL}`,
    icone: ICONES.appMail,
  },
]

export function EmailModal({ onClose }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // RENDUE DANS <body> PAR UN PORTAIL, et ce n'est pas cosmétique. La barre
  // de navigation porte `backdrop-blur`, donc un `backdrop-filter` : d'après la
  // spec CSS, un filtre crée un CONTEXTE DE POSITIONNEMENT pour ses descendants
  // `fixed`. La fenêtre était donc calée sur la barre, pas sur l'écran — elle
  // apparaissait rognée en haut, et le voile qui doit fermer au clic extérieur
  // ne couvrait que la hauteur de la barre. Le portail la sort de là.
  return createPortal(
    // CENTRÉE PARTOUT, téléphone comme ordinateur. Elle arrivait collée en bas
    // sur mobile (`items-end`) : lisible, mais pas ce que Noé veut.
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-[22px] p-6 w-full max-w-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-heading text-[#131313] font-bold text-base">Envoyer un email</h3>
            <p className="text-grey text-[0.8rem] mt-0.5">{EMAIL}</p>
          </div>
          <button onClick={onClose} className="text-grey hover:text-[#131313] transition-colors cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          {EMAIL_OPTIONS.map(({ label, sublabel, href, icone }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              onClick={onClose}
              className="flex items-center gap-4 px-4 py-3 rounded-[14px] hover:bg-[#f5f5f5] transition-colors"
            >
              <div className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 border border-[#e8e8e8] bg-white">
                <IconeMarque icone={icone} taille={21} />
              </div>
              <div>
                <p className="text-[#131313] font-semibold text-[0.88rem]">{label}</p>
                <p className="text-grey text-[0.78rem]">{sublabel}</p>
              </div>
            </a>
          ))}
        </div>

        <button
          onClick={copy}
          className="w-full flex items-center justify-center gap-2 border border-[#e5e5e5] rounded-[14px] py-3 text-[#131313] text-[0.88rem] font-semibold hover:bg-[#f5f5f5] transition-colors cursor-pointer"
        >
          {copied ? (
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
              Copier l'adresse
            </>
          )}
        </button>
      </div>
    </div>,
    document.body,
  )
}

export default EmailModal
