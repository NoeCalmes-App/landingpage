import { useState } from 'react'
import qrcode from './assets/contact/qrcode.png'
import { FaWhatsapp } from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'
import { FaYahoo } from 'react-icons/fa'
import { PiMicrosoftOutlookLogoFill } from 'react-icons/pi'
import { BsMicrosoftTeams } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'

const WHATSAPP_URL = 'https://wa.me/33658308210'
const TEAMS_URL = 'https://teams.live.com/l/invite/FEAC7bmID--_ZezkAE?v=g1'
const EMAIL = 'contact@noecalmes.fr'

const EMAIL_OPTIONS = [
  {
    label: 'Gmail',
    sublabel: 'Ouvrir dans Gmail',
    href: `https://mail.google.com/mail/?view=cm&to=${EMAIL}`,
    iconBg: '#fff',
    icon: <SiGmail size={22} color="#EA4335" />,
  },
  {
    label: 'Outlook',
    sublabel: 'Ouvrir dans Outlook',
    href: `https://outlook.live.com/mail/0/deeplink/compose?to=${EMAIL}`,
    iconBg: '#fff',
    icon: <PiMicrosoftOutlookLogoFill size={22} color="#0078D4" />,
  },
  {
    label: 'Yahoo Mail',
    sublabel: 'Ouvrir dans Yahoo',
    href: `https://compose.mail.yahoo.com/?to=${EMAIL}`,
    iconBg: '#fff',
    icon: <FaYahoo size={22} color="#6001D2" />,
  },
  {
    label: 'Application mail',
    sublabel: 'Mac Mail, Outlook desktop…',
    href: `mailto:${EMAIL}`,
    iconBg: '#f3f3f3',
    icon: <MdEmail size={24} color="#131313" />,
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
          {EMAIL_OPTIONS.map(({ label, sublabel, href, iconBg, icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              onClick={onClose}
              className="flex items-center gap-4 px-4 py-3 rounded-[14px] hover:bg-[#f5f5f5] transition-colors"
            >
              <div className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 border border-[#e8e8e8]" style={{ backgroundColor: iconBg }}>
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

function ContactItem({ href, icon, label, sublabel, iconBg = '#f3f3f3', onClick }) {
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
        className="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 border border-[#e8e8e8]"
        style={{ backgroundColor: iconBg }}
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
            iconBg="#fff"
            icon={<MdEmail size={26} color="#665dff" />}
          />

          <ContactItem
            href={WHATSAPP_URL}
            label="+33 6 58 30 82 10"
            sublabel="WhatsApp"
            iconBg="#fff"
            icon={<FaWhatsapp size={26} color="#25D366" />}
          />

          <ContactItem
            href={TEAMS_URL}
            label="Noé Calmes"
            sublabel="Microsoft Teams"
            iconBg="#fff"
            icon={<BsMicrosoftTeams size={24} color="#5558AF" />}
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
