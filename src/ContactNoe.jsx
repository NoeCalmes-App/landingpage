import { useState } from 'react'
import qrcode from './assets/contact/qrcode.png'

const WHATSAPP_URL = 'https://wa.me/33658308210'
const TEAMS_URL = 'https://teams.live.com/l/invite/FEAC7bmID--_ZezkAE?v=g1'
const EMAIL = 'contact@noecalmes.fr'

const EMAIL_OPTIONS = [
  {
    label: 'Gmail',
    sublabel: 'Ouvrir dans Gmail',
    href: `https://mail.google.com/mail/?view=cm&to=${EMAIL}`,
    color: '#EA4335',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
      </svg>
    ),
  },
  {
    label: 'Outlook',
    sublabel: 'Ouvrir dans Outlook',
    href: `https://outlook.live.com/mail/0/deeplink/compose?to=${EMAIL}`,
    color: '#0078D4',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86t.1-.87q.1-.43.34-.76.22-.34.59-.54.36-.2.87-.2t.86.2q.35.21.57.55.22.34.31.77.1.43.1.88zM24 12v9.38q0 .46-.33.8-.33.32-.8.32H7.13q-.46 0-.8-.33-.32-.33-.32-.8V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h6.5V2.55q0-.44.3-.75.3-.3.75-.3h12.9q.44 0 .75.3.3.3.3.75V10.85l1.24.72h.01q.1.07.18.18.07.12.07.25zm-6-8.25v3h3l-3-3zm4.5 11.99l-3.75-2.61V15l3.75 2.61v-1.87zM12 8.5H8.5V12H12V8.5zm0 4.5H8.5v3.5H12V13zm-5-4.5H3.5V12H7V8.5zm0 4.5H3.5v3.5H7V13zm13.5-2.09V7.5H14v2.91l-2.75-1.91H7.13V17H7v.5l5.25-3.63 5.25 3.63V7.5h6.5v3.91l-2.5-1.5z" />
      </svg>
    ),
  },
  {
    label: 'Yahoo Mail',
    sublabel: 'Ouvrir dans Yahoo',
    href: `https://compose.mail.yahoo.com/?to=${EMAIL}`,
    color: '#6001D2',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M19.7 2.9L14.5 11l5.2 8.1H24v2.1h-8.3v-2.1h2.8l-3.9-6.1-3.9 6.1H13v2.1H4.8v-2.1h3.9L0 2.9h3.8l6.1 9.5 6.1-9.5z" />
      </svg>
    ),
  },
  {
    label: 'Application mail',
    sublabel: 'Mac Mail, Outlook desktop…',
    href: `mailto:${EMAIL}`,
    color: '#131313',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
]

function EmailModal({ onClose }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0" onClick={onClose}>
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
          {EMAIL_OPTIONS.map(({ label, sublabel, href, color, icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              onClick={onClose}
              className="flex items-center gap-4 px-4 py-3 rounded-[14px] hover:bg-[#f5f5f5] transition-colors"
            >
              <div className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0" style={{ backgroundColor: color }}>
                {icon}
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
    </div>
  )
}

function ContactItem({ href, icon, label, sublabel, color, onClick }) {
  const Tag = onClick ? 'button' : 'a'
  const props = onClick
    ? { onClick, type: 'button' }
    : { href, target: '_blank', rel: 'noopener noreferrer' }

  return (
    <Tag
      {...props}
      className="group w-full flex items-center gap-5 bg-card border border-card-border rounded-[18px] px-6 py-5 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.07)] transition-all duration-200 cursor-pointer text-left"
    >
      <div
        className="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-text font-semibold text-[0.95rem] truncate">{label}</p>
        {sublabel && <p className="text-grey text-[0.82rem] mt-0.5 truncate">{sublabel}</p>}
      </div>
      <svg
        className="text-grey group-hover:text-brand transition-colors shrink-0"
        width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </Tag>
  )
}

function ContactNoe() {
  const [emailOpen, setEmailOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-[#e5e5e5] px-5 py-4 flex items-center gap-3">
        <a
          href="/"
          className="flex items-center gap-1.5 text-brand font-semibold text-sm hover:opacity-70 transition-opacity shrink-0"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Retour
        </a>
        <span className="text-text font-bold text-sm md:text-base">
          noecalmes.fr
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pt-12 pb-20 max-w-lg mx-auto w-full">
        {/* Title */}
        <div className="mb-10">
          <h1 className="font-heading text-[#131313] text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
            Contact
          </h1>
          <p className="text-grey text-[0.95rem]">
            Noé Calmes — Développeur Mobile
          </p>
        </div>

        {/* Contact items */}
        <div className="flex flex-col gap-3 mb-10">
          <ContactItem
            onClick={() => setEmailOpen(true)}
            label={EMAIL}
            sublabel="Email"
            color="#665dff"
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            }
          />

          <ContactItem
            href={WHATSAPP_URL}
            label="+33 6 58 30 82 10"
            sublabel="WhatsApp"
            color="#25D366"
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            }
          />

          <ContactItem
            href={TEAMS_URL}
            label="Noé Calmes"
            sublabel="Microsoft Teams"
            color="#5558AF"
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M20.25 7.5a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5z" />
                <path d="M14.625 8.25a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75z" />
                <path d="M17.25 9h-5.25A1.5 1.5 0 0 0 10.5 10.5v5.25a3.75 3.75 0 0 0 7.5 0V10.5A1.5 1.5 0 0 0 17.25 9z" />
                <path d="M20.25 9h-1.5v6.75a4.5 4.5 0 0 1-4.5 4.5h-.75A3.75 3.75 0 0 0 17.25 24h.75A3.75 3.75 0 0 0 21.75 20.25V10.5A1.5 1.5 0 0 0 20.25 9z" />
              </svg>
            }
          />
        </div>

        {/* QR Code section */}
        <div className="bg-card border border-card-border rounded-[18px] p-6 flex flex-col items-center gap-4">
          <p className="text-grey text-[0.82rem] font-medium uppercase tracking-widest">
            Scanner pour WhatsApp
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group block transition-transform duration-200 hover:scale-[1.02]"
          >
            <img
              src={qrcode}
              alt="QR Code WhatsApp Noé Calmes"
              className="w-48 h-48 md:w-56 md:h-56 rounded-xl"
            />
          </a>
          <p className="text-grey text-[0.82rem] text-center">
            Scannez ou{' '}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand font-semibold hover:underline"
            >
              cliquez ici
            </a>{' '}
            pour ouvrir WhatsApp
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 border-t border-[#e5e5e5]">
        <p className="text-grey text-[0.8rem]">
          &copy; 2026 Noé Calmes
        </p>
      </div>

      {emailOpen && <EmailModal onClose={() => setEmailOpen(false)} />}
    </div>
  )
}

export default ContactNoe
