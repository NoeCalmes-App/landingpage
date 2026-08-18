import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { BsMicrosoftTeams } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import NavDocuments from './NavDocuments.jsx'
// Réexportée pour ne casser aucun import existant (`App.jsx`).
import EmailModal, { EMAIL } from './EmailModal.jsx'
export { EmailModal }

const qrcode = '/assets/images/contact/qrcode.webp'
// Message pré-rempli : aucune question posée, il part en un tap. Cf. le
// commentaire de WHATSAPP_PREFILL dans App.jsx.
const WHATSAPP_URL = `https://wa.me/33658308210?text=${encodeURIComponent(
  "Bonjour Noé, j'ai un projet d'application, on peut en parler ?"
)}`
const TEAMS_URL = 'https://teams.live.com/l/invite/FEAC7bmID--_ZezkAE?v=g1'

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
      <NavDocuments />

      {/* Content */}
      <div className="flex-1 px-5 pt-12 pb-20 max-w-lg mx-auto w-full">
        {/* Title */}
        <div className="mb-10">
          <h1 className="font-heading text-[#131313] text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
            Contact
          </h1>
          <p className="text-grey text-[0.95rem]">
            Noé Calmes — Expert mobile spécialisé Flutter
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
