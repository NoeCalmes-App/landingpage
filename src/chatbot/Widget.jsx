import { useState, useEffect, useRef, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import { initSession, persistMessage, sendMessage } from './client'
import './styles.css'

const mePhoto = '/assets/images/profile/me.webp'

const WELCOME_MESSAGE = {
  role: 'assistant',
  text: "Bonjour 👋 Je suis l'assistant de Noé. Posez-moi vos questions sur votre projet d'application mobile.",
}

const DEFAULT_WHATSAPP_URL = `https://wa.me/33658308210?${new URLSearchParams({
  text: "Bonjour Noé, j'aimerais discuter de mon projet d'application.",
})}`

// Construit les composants markdown avec un callback pour fermer le chatbot
// quand l'utilisateur clique sur le lien /rendez-vous (redirection Calendly).
const buildMdComponents = (onCalendlyClick) => ({
  a: ({ href, children, ...props }) => {
    if (href === '/rendez-vous') {
      return (
        <button
          type="button"
          onClick={onCalendlyClick}
          className="inline text-brand font-semibold underline underline-offset-2 hover:text-brand-dark cursor-pointer"
        >
          {children}
        </button>
      )
    }
    return (
      <a
        {...props}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand font-semibold underline underline-offset-2 hover:text-brand-dark"
      >
        {children}
      </a>
    )
  },
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  ul: ({ children }) => <ul className="list-disc pl-5 mb-2 last:mb-0 space-y-1">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-5 mb-2 last:mb-0 space-y-1">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  h1: ({ children }) => <p className="font-heading font-bold text-text mb-1.5 mt-1.5 first:mt-0">{children}</p>,
  h2: ({ children }) => <p className="font-heading font-bold text-text mb-1.5 mt-1.5 first:mt-0">{children}</p>,
  h3: ({ children }) => <p className="font-heading font-bold text-text mb-1.5 mt-1.5 first:mt-0">{children}</p>,
  code: ({ children }) => (
    <code className="bg-card-border/30 px-1 py-0.5 rounded text-[0.8em]">{children}</code>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-brand-light pl-3 italic text-grey">{children}</blockquote>
  ),
  table: ({ children }) => <div className="overflow-x-auto text-[0.82rem] my-1.5">{children}</div>,
  thead: ({ children }) => <div className="font-semibold mb-1">{children}</div>,
  tbody: ({ children }) => <div className="space-y-0.5">{children}</div>,
  tr: ({ children }) => <div className="flex flex-wrap gap-2">{children}</div>,
  th: ({ children }) => <span className="font-semibold">{children}</span>,
  td: ({ children }) => <span>{children}</span>,
  hr: () => <hr className="my-2 border-card-border" />,
})

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-3 py-2.5">
      <span className="w-1.5 h-1.5 rounded-full bg-grey/60 animate-[bounce_1.2s_ease-in-out_infinite]" style={{ animationDelay: '0s' }} />
      <span className="w-1.5 h-1.5 rounded-full bg-grey/60 animate-[bounce_1.2s_ease-in-out_infinite]" style={{ animationDelay: '0.2s' }} />
      <span className="w-1.5 h-1.5 rounded-full bg-grey/60 animate-[bounce_1.2s_ease-in-out_infinite]" style={{ animationDelay: '0.4s' }} />
    </div>
  )
}

// Props :
//   onBookCall (optionnel) — callback fourni par le parent pour basculer
//   sur la home + scroller vers Calendly sans full reload. Si absent, on
//   utilise un fallback `history.pushState` + scroll (qui peut donner une
//   page blanche en production si la home n'est pas deja chargee).
//   contactMode: 'chatbot' garde le comportement IA, 'whatsapp' redirige le
//   bouton flottant vers WhatsApp sans supprimer le systeme IA.
export default function ChatbotWidget({ onBookCall, contactMode = 'chatbot', whatsappUrl = DEFAULT_WHATSAPP_URL }) {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [sessionId, setSessionId] = useState('')
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const [error, setError] = useState('')

  const scrollRef = useRef(null)
  const inputRef = useRef(null)
  const lastAssistantRef = useRef(null)

  // Apparition du bouton flottant après le 1er scroll (mirror du WhatsApp existant)
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) setHasScrolled(true)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Init session + restaure historique localStorage
  useEffect(() => {
    const { sessionId, history } = initSession()
    setSessionId(sessionId)
    if (history && history.length > 0) {
      setMessages([WELCOME_MESSAGE, ...history])
    }
  }, [])

  // Auto-scroll : bas si loading (indicateur typing), début du message assistant sinon
  useEffect(() => {
    if (loading) {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    } else {
      if (lastAssistantRef.current) {
        lastAssistantRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [messages, loading])

  // Focus input à l'ouverture
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [open])

  // Fermer modal sur Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const handleSend = useCallback(async () => {
    const trimmed = input.trim()
    if (!trimmed || loading || blocked) return

    setError('')
    const userMsg = { role: 'user', text: trimmed }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    persistMessage(sessionId, userMsg)

    try {
      // On envoie l'historique sans le message de bienvenue (côté bot, c'est le system prompt qui le gère)
      const historyToSend = newMessages
        .filter((m) => m !== WELCOME_MESSAGE)
        .slice(0, -1) // exclure le message qu'on vient d'ajouter (envoyé séparément)

      const data = await sendMessage({
        sessionId,
        message: trimmed,
        history: historyToSend,
      })

      const reply = { role: 'assistant', text: data.reply || '' }
      setMessages((prev) => [...prev, reply])
      persistMessage(sessionId, reply)

      if (data.blocked) {
        setBlocked(true)
      }
    } catch (err) {
      setError(true)
      console.warn('[chatbot]', err)
    } finally {
      setLoading(false)
    }
  }, [input, loading, blocked, messages, sessionId])

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Quand le visiteur clique sur "Réserver un appel" dans une réponse du bot
  // ou sur le bandeau CTA quand la conversation est bloquée : on ferme le
  // chatbot et on scrolle vers le widget Calendly intégré dans la landing.
  //
  // 3 strategies, dans l'ordre :
  //   1. Section Calendly deja dans le DOM → scroll direct (pas de reload)
  //   2. onBookCall fourni par le parent → basculer sur la home en React state
  //      (transition sans full reload, scroll declenche apres le render)
  //   3. Fallback dernier recours → window.location.href (full reload, peut
  //      donner un flash blanc en prod)
  const handleCalendlyClick = useCallback(() => {
    setOpen(false)
    const el = document.getElementById('calendly-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      history.pushState(null, '', '/rendez-vous')
      return
    }
    if (typeof onBookCall === 'function') {
      onBookCall()
      return
    }
    window.location.href = '/rendez-vous'
  }, [onBookCall])

  const mdComponents = buildMdComponents(handleCalendlyClick)
  const usesWhatsApp = contactMode === 'whatsapp'

  const handleFloatingClick = () => {
    if (!usesWhatsApp) {
      setOpen((v) => !v)
      return
    }

    const opened = window.open(whatsappUrl, '_blank')
    if (opened) {
      opened.opener = null
      return
    }
    window.location.href = whatsappUrl
  }

  return (
    <>
      {/* Bouton flottant — icône WhatsApp en violet brand */}
      <button
        type="button"
        onClick={handleFloatingClick}
        aria-label={usesWhatsApp ? 'Discuter avec Noé sur WhatsApp' : open ? 'Fermer le chat' : 'Ouvrir le chat avec Noé'}
        className="fixed bottom-2 right-6 md:bottom-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-500 hover:scale-110 cursor-pointer flex items-center justify-center bg-brand"
        style={{
          opacity: hasScrolled ? 1 : 0,
          transform: hasScrolled ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(16px)',
          pointerEvents: hasScrolled ? 'auto' : 'none',
          boxShadow: '0 8px 24px rgba(102, 93, 255, 0.35)',
        }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        )}
        {/* Pulsation discrète quand fermé */}
        {!open && hasScrolled && (
          <span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: '0 0 0 0 rgba(102, 93, 255, 0.5)',
              animation: 'chatbot-pulse 2.5s ease-out infinite',
            }}
          />
        )}
      </button>

      {/* Modal chat */}
      {open && !usesWhatsApp && (
        <div
          className="fixed bottom-18 right-6 md:bottom-24 z-[100] flex flex-col bg-white rounded-3xl shadow-2xl border border-card-border overflow-hidden"
          style={{
            width: 'min(380px, calc(100vw - 3rem))',
            height: 'min(560px, calc(100vh - 7rem))',
            animation: 'chatbot-slide-up 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-card-border bg-surface">
            <img src={mePhoto} alt="" className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <div className="font-heading font-bold text-text text-sm">Noé Calmes</div>
              <div className="text-grey text-[0.7rem] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-text" />
                Expert mobile · En ligne
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer"
              className="text-grey hover:text-text transition-colors cursor-pointer p-1"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-card/40">
            {messages.map((msg, i) => {
              const isLastAssistant = msg.role === 'assistant' && messages.slice(i + 1).every(m => m.role !== 'assistant')
              return (
                <div
                  key={i}
                  ref={isLastAssistant ? lastAssistantRef : null}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={
                      msg.role === 'user'
                        ? 'max-w-[85%] bg-brand text-white px-3.5 py-2.5 rounded-2xl rounded-br-md text-[0.875rem] leading-relaxed shadow-sm'
                        : 'max-w-[85%] bg-white text-text border border-card-border px-3.5 py-2.5 rounded-2xl rounded-bl-md text-[0.875rem] leading-relaxed shadow-sm'
                    }
                  >
                    {msg.role === 'user' ? (
                      msg.text
                    ) : (
                      <ReactMarkdown components={mdComponents}>{msg.text}</ReactMarkdown>
                    )}
                  </div>
                </div>
              )
            })}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-card-border rounded-2xl rounded-bl-md shadow-sm">
                  <TypingDots />
                </div>
              </div>
            )}
            {error && !loading && (
              <div className="text-center text-[0.8rem] text-orange-600 bg-orange-50 rounded-xl py-2 px-3 leading-relaxed">
                L'assistant de Noé est en maintenance.{' '}
                <button
                  type="button"
                  onClick={handleCalendlyClick}
                  className="underline underline-offset-2 font-semibold cursor-pointer hover:text-orange-700"
                >
                  Prenez rendez-vous avec Noé
                </button>
                {' '}pour répondre à vos questions.
              </div>
            )}
          </div>

          {/* CTA bandeau si bloqué */}
          {blocked && (
            <div className="px-4 py-3 bg-brand-wash border-t border-card-border">
              <button
                type="button"
                onClick={handleCalendlyClick}
                className="w-full bg-brand text-white font-semibold text-[0.875rem] px-4 py-2.5 rounded-full hover:bg-brand-dark transition-colors cursor-pointer"
              >
                Réserver un appel gratuit →
              </button>
            </div>
          )}

          {/* Input */}
          {!blocked && (
            <div className="px-3 py-3 border-t border-card-border bg-white">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Posez votre question…"
                  rows={1}
                  maxLength={500}
                  disabled={loading}
                  className="chatbot-textarea flex-1 resize-none bg-card border border-card-border rounded-2xl px-3.5 py-2.5 text-[0.875rem] text-text placeholder:text-grey/70 focus:outline-none focus:border-brand-light transition-colors max-h-24"
                  style={{ fontFamily: 'inherit' }}
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  aria-label="Envoyer"
                  className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center hover:bg-brand-dark disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer flex-shrink-0"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="px-4 py-2 border-t border-card-border bg-surface text-center">
            <span className="text-grey text-[0.65rem]">
              Powered by <span className="font-medium text-text">Noé Calmes</span>
            </span>
          </div>
        </div>
      )}
    </>
  )
}
