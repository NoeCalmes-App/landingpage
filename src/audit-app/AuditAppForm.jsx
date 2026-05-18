// Formulaire multi-etapes pour /audit-app.
//
// Structure :
//   - Step 0 (prenom)  : input texte
//   - Step 1 (idee)    : textarea + saisie vocale
//   - Step 2-5         : multi-choice qui auto-avance au clic
//
// Tonalite vouvoiement (site formel). Pas d'affichage "Etape X/Y", pas de
// compteur caracteres, pas de mention "appel" (gardee pour la fin du tunnel).
// Une bande "Secret professionnel" rappelle la confidentialite.
//
// Quand submitting=true, on rend AnalysisLoading plein ecran a la place.

import { useEffect, useRef, useState } from 'react'
import { FORM_STEPS, FIRST_NAME_MIN_LENGTH } from './config'
import { loadAuditState, saveAuditState } from './storage'
import AuditAppAttachment from './AuditAppAttachment'

const TOTAL_STEPS = FORM_STEPS.length + 1 // +1 pour l'etape prenom

export default function AuditAppForm({
  initialFirstName,
  onSubmit,
  submitting,
  error,
}) {
  // Si on est en train de soumettre, on remplace l'UI form par l'ecran d'analyse
  if (submitting) {
    return <AnalysisLoading />
  }

  return (
    <FormTunnel
      initialFirstName={initialFirstName}
      onSubmit={onSubmit}
      error={error}
    />
  )
}

// ===================================================================
// Tunnel principal
// ===================================================================

function FormTunnel({ initialFirstName, onSubmit, error }) {
  // Restauration depuis localStorage : si le prospect a deja commence
  // un audit, on lui rend ses reponses et le step ou il s'etait arrete.
  const restored = loadAuditState() || {}

  const [stepIndex, setStepIndex] = useState(
    () => (typeof restored.stepIndex === 'number' ? restored.stepIndex : 0)
  )
  const [firstName, setFirstName] = useState(
    () => initialFirstName || restored.firstName || ''
  )
  const [answers, setAnswers] = useState(() => {
    const blank = Object.fromEntries(FORM_STEPS.map((s) => [s.field, '']))
    return { ...blank, ...(restored.answers || {}) }
  })
  // Contenu extrait d'un fichier eventuellement joint a l'etape idea_text.
  // Stocke a part car ce n'est pas une "reponse" du formulaire mais un
  // contexte additionnel envoye au LLM.
  const [attachedContent, setAttachedContent] = useState(
    () => restored.attachedContent || ''
  )
  const [touched, setTouched] = useState(false)

  // Sauvegarde a chaque changement — pas besoin de debounce, l'utilisateur
  // ne fait pas 100 changements / sec.
  useEffect(() => {
    saveAuditState({ stepIndex, firstName, answers, attachedContent })
  }, [stepIndex, firstName, answers, attachedContent])

  const isFirstNameStep = stepIndex === 0
  const currentStep = isFirstNameStep ? null : FORM_STEPS[stepIndex - 1]

  // Trouve l'index du prochain step a afficher en sautant ceux qui ont
  // un skipIf(answers) vrai. Retourne TOTAL_STEPS si on a fini.
  const findNextVisibleStep = (fromIndex, currentAnswers) => {
    let i = fromIndex
    while (i < TOTAL_STEPS) {
      if (i === 0) return i // prenom toujours visible
      const step = FORM_STEPS[i - 1]
      if (step?.skipIf?.(currentAnswers)) {
        i++
      } else {
        return i
      }
    }
    return TOTAL_STEPS
  }

  const findPrevVisibleStep = (fromIndex, currentAnswers) => {
    let i = fromIndex
    while (i > 0) {
      if (i === 0) return 0
      const step = FORM_STEPS[i - 1]
      if (step?.skipIf?.(currentAnswers)) {
        i--
      } else {
        return i
      }
    }
    return 0
  }

  // isLastStep : il n'y a plus aucun step visible apres stepIndex
  const nextVisibleIdx = findNextVisibleStep(stepIndex + 1, answers)
  const isLastStep = nextVisibleIdx >= TOTAL_STEPS

  const goToNext = (overrideAnswers = null) => {
    setTouched(false)
    const currentAnswers = overrideAnswers || answers
    const next = findNextVisibleStep(stepIndex + 1, currentAnswers)
    if (next >= TOTAL_STEPS) {
      onSubmit({
        first_name: firstName.trim(),
        ...currentAnswers,
        attached_content: attachedContent || '',
      })
      return
    }
    setStepIndex(next)
  }

  const handleBack = () => {
    setTouched(false)
    const prev = findPrevVisibleStep(stepIndex - 1, answers)
    setStepIndex(prev)
  }

  const handleFirstNameSubmit = () => {
    if (firstName.trim().length < FIRST_NAME_MIN_LENGTH) {
      setTouched(true)
      return
    }
    goToNext()
  }

  const handleTextareaSubmit = () => {
    const val = (answers[currentStep.field] || '').trim()
    if (val.length < currentStep.minLength) {
      setTouched(true)
      return
    }
    goToNext()
  }

  const handleChoiceClick = (option) => {
    let newAnswers = { ...answers, [currentStep.field]: option.value }
    // Si Q1 bascule sur "Aucune solution existante", on clear la reponse
    // known_competitors pour eviter une incoherence (le step sera skip).
    if (
      currentStep.field === 'q1_answer' &&
      option.value.toLowerCase().includes('aucune solution')
    ) {
      newAnswers = { ...newAnswers, known_competitors: '' }
    }
    setAnswers(newAnswers)
    // Auto-avance avec les nouvelles reponses
    setTimeout(() => goToNext(newAnswers), 180)
  }

  const handleTextareaChange = (val) => {
    setAnswers({ ...answers, [currentStep.field]: val })
  }

  const progressPct = Math.round(((stepIndex + 1) / TOTAL_STEPS) * 100)

  return (
    <section className="flex-1 flex flex-col px-8 md:px-10 pt-10 pb-10 md:pt-12 md:pb-14 bg-card">
      <div className="w-full max-w-160 mx-auto">
        {/* Header du tunnel : label "Votre audit" + pourcentage */}
        <div className="flex items-baseline justify-between mb-3 md:mb-4">
          <p
            className="text-text font-bold text-[0.95rem] md:text-[1.02rem] tracking-tight"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Votre audit
          </p>
          <p className="text-brand font-heading font-bold text-[0.95rem] md:text-[1.05rem] tabular-nums">
            {progressPct}%
          </p>
        </div>

        {/* Barre de progression — reste pinnee en haut */}
        <div>
          <div className="h-2 w-full rounded-full bg-brand/10 overflow-hidden">
            <div
              className="h-full bg-brand rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Zone centrale qui prend tout l'espace restant et centre verticalement la carte */}
      <div className="flex-1 w-full max-w-160 mx-auto flex flex-col justify-center py-8">
        {/* Carte question */}
        <div className="bg-surface border border-card-border rounded-2xl p-6 md:p-9 shadow-sm">
          {isFirstNameStep ? (
            <FirstNameStep
              value={firstName}
              onChange={setFirstName}
              onSubmit={handleFirstNameSubmit}
              touched={touched}
            />
          ) : currentStep.type === 'textarea' ? (
            <TextareaStep
              step={currentStep}
              value={answers[currentStep.field] || ''}
              onChange={handleTextareaChange}
              onSubmit={handleTextareaSubmit}
              touched={touched}
              attachedContent={attachedContent}
              onAttachmentChange={setAttachedContent}
            />
          ) : (
            <ChoiceStep
              step={currentStep}
              selectedValue={answers[currentStep.field]}
              onSelect={handleChoiceClick}
            />
          )}

          {error && (
            <div className="mt-5 rounded-lg bg-red-bg/50 border border-red-text/20 px-4 py-3 text-red-text text-[0.88rem]">
              {error}
            </div>
          )}

          {/* Actions — uniquement pour les etapes qui ont un bouton (input/textarea) */}
          {(isFirstNameStep || currentStep?.type === 'textarea') && (
            <div
              className={`mt-7 flex items-center gap-3 ${
                stepIndex === 0 ? 'justify-end' : 'justify-between'
              }`}
            >
              {stepIndex > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 text-grey font-semibold text-[0.92rem] hover:text-text transition-colors cursor-pointer"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  Retour
                </button>
              )}

              <button
                type="button"
                onClick={
                  isFirstNameStep ? handleFirstNameSubmit : handleTextareaSubmit
                }
                className="group inline-flex items-center gap-2 bg-brand text-surface font-semibold text-[0.95rem] px-7 py-3 rounded-full cursor-pointer shadow-sm hover:shadow-md transition-shadow"
              >
                {!isFirstNameStep &&
                currentStep?.optional &&
                !(answers[currentStep.field] || '').trim()
                  ? 'Passer'
                  : 'Continuer'}
                <svg
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  width="18"
                  height="18"
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
          )}

          {/* Lien Retour discret sur les etapes multi-choice */}
          {!isFirstNameStep && currentStep?.type === 'choice' && (
            <div className="mt-6 flex justify-start">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-grey font-semibold text-[0.88rem] hover:text-text transition-colors cursor-pointer"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Retour
              </button>
            </div>
          )}
        </div>

        {/* Reassurance discrete sous le formulaire */}
        <div className="flex items-center justify-center gap-1.5 mt-5 text-grey/70 text-[0.78rem] md:text-[0.82rem] leading-none">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="shrink-0 block"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="font-medium tracking-wide leading-none">
            Audit 100% confidentiel
          </span>
        </div>
      </div>
    </section>
  )
}

// ===================================================================
// Step prenom
// ===================================================================

// Capitalise la 1ere lettre des mots (Jean-Pierre -> Jean-Pierre,
// jean pierre -> Jean Pierre, JEAN -> Jean). Preserve les separateurs.
function capitalizeFirstName(raw) {
  if (!raw) return ''
  return raw
    .toLowerCase()
    .replace(/(^|[\s\-'])(\p{L})/gu, (_, sep, ch) => sep + ch.toUpperCase())
}

function FirstNameStep({ value, onChange, onSubmit, touched }) {
  const inputRef = useRef(null)
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const showError = touched && value.trim().length < FIRST_NAME_MIN_LENGTH

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <div>
      <p className="text-brand font-semibold text-[0.78rem] tracking-widest uppercase mb-2">
        Pour commencer
      </p>
      <h2 className="font-heading text-text text-xl md:text-2xl font-bold leading-tight mb-3">
        Comment vous appelez-vous ?
      </h2>
      <p className="text-grey text-[0.92rem] leading-relaxed mb-5">
        Juste votre prénom, pour personnaliser votre audit.
      </p>
      <input
        ref={inputRef}
        type="text"
        autoComplete="given-name"
        value={value}
        onChange={(e) => onChange(capitalizeFirstName(e.target.value))}
        onKeyDown={handleKeyDown}
        placeholder="Votre prénom"
        className={`w-full px-4 py-3 rounded-xl bg-card border ${
          showError ? 'border-red-text/40' : 'border-card-border'
        } text-text text-[0.95rem] placeholder:text-light-grey focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/15 transition-colors`}
      />
      {showError && (
        <p className="text-red-text text-[0.82rem] mt-2">
          Merci d'indiquer votre prénom.
        </p>
      )}
    </div>
  )
}

// ===================================================================
// Step textarea + saisie vocale
// ===================================================================

function TextareaStep({
  step,
  value,
  onChange,
  onSubmit,
  touched,
  attachedContent,
  onAttachmentChange,
}) {
  const showError = touched && value.trim().length < step.minLength
  const taRef = useRef(null)
  // Expose la trigger du file picker (qui vit dans AuditAppAttachment)
  // au bouton paperclip qu'on place dans le container du textarea.
  const attachmentRef = useRef(null)
  const maxLength = step.maxLength || 2000
  const remaining = maxLength - value.length
  const nearLimit = remaining <= 100

  // Autofocus uniquement sur desktop : sur mobile, ouvrir le clavier
  // immediatement masque le titre de la question. Laisser l'user tapper
  // le champ quand il a lu.
  useEffect(() => {
    const isDesktop =
      typeof window !== 'undefined' &&
      window.matchMedia('(min-width: 768px)').matches
    if (isDesktop) {
      taRef.current?.focus()
    }
  }, [])

  // Capture la value en respectant le plafond (utile pour coller un gros
  // bloc OU pour la dictee vocale qui peut depasser).
  const safeOnChange = (val) => {
    if (val.length <= maxLength) {
      onChange(val)
    } else {
      onChange(val.slice(0, maxLength))
    }
  }

  // Saisie vocale (SpeechRecognition natif fr-FR)
  const [voiceActive, setVoiceActive] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(false)
  const recognitionRef = useRef(null)
  const baseTextRef = useRef('')

  useEffect(() => {
    const SR =
      typeof window !== 'undefined' &&
      (window.SpeechRecognition || window.webkitSpeechRecognition)
    if (!SR) return
    setVoiceSupported(true)
  }, [])

  const startVoice = () => {
    const SR =
      window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) return

    // Arret eventuel d'une session precedente
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch {
        /* ignore */
      }
    }

    const rec = new SR()
    rec.lang = 'fr-FR'
    rec.continuous = true
    rec.interimResults = true
    baseTextRef.current = value ? value.trimEnd() + ' ' : ''

    rec.onresult = (event) => {
      let finalT = ''
      let interimT = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const r = event.results[i]
        if (r.isFinal) finalT += r[0].transcript
        else interimT += r[0].transcript
      }
      const combined = baseTextRef.current + finalT + interimT
      const capped =
        combined.length > maxLength ? combined.slice(0, maxLength) : combined
      onChange(capped)
      if (finalT) {
        baseTextRef.current += finalT
        // Stop auto si on a atteint le plafond
        if (baseTextRef.current.length >= maxLength) {
          try {
            rec.stop()
          } catch {
            /* ignore */
          }
        }
      }
    }
    rec.onerror = () => {
      setVoiceActive(false)
    }
    rec.onend = () => {
      setVoiceActive(false)
    }

    recognitionRef.current = rec
    try {
      rec.start()
      setVoiceActive(true)
    } catch {
      setVoiceActive(false)
    }
  }

  const stopVoice = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch {
        /* ignore */
      }
    }
    setVoiceActive(false)
  }

  const toggleVoice = () => {
    if (voiceActive) stopVoice()
    else startVoice()
  }

  // Nettoyage
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch {
          /* ignore */
        }
      }
    }
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <div>
      <p className="text-brand font-semibold text-[0.78rem] tracking-widest uppercase mb-2">
        {step.label}
        {step.optional && (
          <span className="text-grey/70 font-medium ml-2 normal-case tracking-normal">
            · optionnel
          </span>
        )}
      </p>
      <h2 className="font-heading text-text text-xl md:text-2xl font-bold leading-tight mb-3">
        {step.question}
      </h2>
      {step.helper && (
        <p className="text-grey text-[0.96rem] md:text-[0.96rem] leading-relaxed mb-5">
          {step.helper}
        </p>
      )}

      {/* Container ChatGPT-style : textarea EN HAUT + barre d'actions EN BAS,
          tous deux en flux (pas absolute). Le textarea scrolle naturellement
          si trop de texte, les icones restent toujours en dessous. */}
      <div
        className={`rounded-xl bg-card border transition-colors ${
          showError
            ? 'border-red-text/40'
            : 'border-card-border focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/15'
        }`}
      >
        <textarea
          ref={taRef}
          value={value}
          onChange={(e) => safeOnChange(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={step.optional ? 3 : 6}
          maxLength={maxLength}
          placeholder={step.placeholder}
          className="block w-full px-4 pt-3 pb-2 bg-transparent border-0 outline-none text-text text-[0.95rem] placeholder:text-light-grey resize-none"
        />

        {/* Barre d'actions au fond, dans le flux (paperclip a gauche + mic a droite) */}
        <div className="flex items-center justify-between gap-2 px-2 pb-2 pt-1">
          {/* Gauche : paperclip + extensions */}
          {step.allowAttachment ? (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => attachmentRef.current?.triggerPicker()}
                aria-label="Joindre un document"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full text-grey hover:text-brand hover:bg-brand/10 transition-colors cursor-pointer"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                </svg>
              </button>
              <span className="text-grey/70 text-[0.72rem] tracking-wide select-none">
                pdf · md · txt
              </span>
            </div>
          ) : (
            <span />
          )}

          {/* Droite : mic */}
          {step.voiceInput && voiceSupported && (
            <button
              type="button"
              onClick={toggleVoice}
              aria-label={voiceActive ? 'Arrêter la dictée' : 'Dicter ma réponse'}
              className={`relative inline-flex items-center justify-center w-9 h-9 rounded-full transition-colors cursor-pointer ${
                voiceActive
                  ? 'bg-red-text/15 text-red-text hover:bg-red-text/20'
                  : 'bg-brand/12 text-brand hover:bg-brand/20'
              }`}
            >
              {voiceActive && (
                <span className="absolute inset-0 rounded-full bg-red-text/20 animate-ping" />
              )}
              {voiceActive ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="relative"
                >
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
              ) : (
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Statut dictee, erreur minimum, ou approche du plafond */}
      {voiceActive ? (
        <p className="text-brand text-[0.82rem] mt-2 flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
          </span>
          Je vous écoute…
        </p>
      ) : showError ? (
        <p className="text-red-text text-[0.82rem] mt-2">
          Encore quelques mots, minimum {step.minLength} caractères.
        </p>
      ) : nearLimit ? (
        <p className="text-grey/80 text-[0.78rem] mt-2 text-right">
          {remaining} caractères restants
        </p>
      ) : null}

      {step.allowAttachment && (
        <AuditAppAttachment
          ref={attachmentRef}
          value={attachedContent || ''}
          onChange={onAttachmentChange}
        />
      )}
    </div>
  )
}

// ===================================================================
// Step multi-choice (auto-advance)
// ===================================================================

function ChoiceStep({ step, selectedValue, onSelect }) {
  return (
    <div>
      <p className="text-brand font-semibold text-[0.78rem] tracking-widest uppercase mb-2">
        {step.label}
      </p>
      <h2 className="font-heading text-text text-xl md:text-2xl font-bold leading-tight mb-5">
        {step.question}
      </h2>

      <div className="flex flex-col gap-2.5">
        {step.options.map((opt) => {
          const selected = opt.value === selectedValue
          return (
            <button
              key={opt.label}
              type="button"
              onClick={() => onSelect(opt)}
              className={`group flex items-center gap-3.5 md:gap-4 text-left px-4 py-3.5 md:px-5 md:py-4 rounded-xl border transition-all cursor-pointer ${
                selected
                  ? 'border-brand bg-brand/10 shadow-sm'
                  : 'border-card-border bg-card hover:border-brand/40 hover:bg-brand/5'
              }`}
            >
              {/* Radio circle a gauche — vide par defaut, rempli au clic */}
              <span
                className={`shrink-0 inline-flex items-center justify-center w-6 h-6 md:w-[26px] md:h-[26px] rounded-full border-2 transition-all ${
                  selected
                    ? 'bg-brand border-brand'
                    : 'bg-white border-card-border group-hover:border-brand/50'
                }`}
              >
                {selected && (
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </span>

              {/* Label de l'option */}
              <span
                className={`text-[0.94rem] md:text-[1rem] font-semibold leading-snug ${
                  selected ? 'text-brand' : 'text-text'
                }`}
              >
                {opt.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ===================================================================
// Ecran d'analyse plein ecran (submitting)
// ===================================================================

function AnalysisLoading() {
  // 4 phases de ~2s chacune, defilent en boucle tant qu'on attend l'API
  const PHASES = [
    {
      label: 'Lecture de vos réponses',
      detail: 'Idée, marché, validation, modèle, budget — tout est sur la table.',
    },
    {
      label: 'Croisement avec le marché',
      detail: 'Identification des acteurs existants et des angles de différenciation.',
    },
    {
      label: 'Analyse des leviers business',
      detail: 'Modèle économique, validation client, viabilité globale.',
    },
    {
      label: 'Rédaction de votre audit',
      detail: 'Format clair, 3 observations clés, conseils concrets.',
    },
  ]

  const [phaseIndex, setPhaseIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const startedAt = useRef(Date.now())

  // Phase qui defile toutes les 3000ms (4 phases x 3s = 12s total)
  useEffect(() => {
    const id = setInterval(() => {
      setPhaseIndex((i) => (i + 1) % PHASES.length)
    }, 3000)
    return () => clearInterval(id)
  }, [PHASES.length])

  // Barre de progression : monte progressivement de 0 a ~92% sur les 12
  // premieres secondes, puis ralentit fortement pour "attendre" la reponse
  // API sans atteindre 100% (le 100% n'arrive qu'au moment ou on quitte
  // l'ecran avec le verdict).
  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        const elapsed = Date.now() - startedAt.current
        const target = elapsed < 12000 ? (elapsed / 12000) * 92 : 92
        // Approche douce vers la target
        return p + (target - p) * 0.15
      })
    }, 120)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      className="flex-1 flex items-center justify-center text-center px-5 md:px-10"
      style={{
        backgroundImage:
          'radial-gradient(circle farthest-side at 50% 0%, var(--color-surface) 50%, transparent), linear-gradient(0deg, #f9f9f9, #867ffe 23%, var(--color-brand) 75%, white)',
      }}
    >
      <div className="max-w-150 mx-auto w-full">
        <div className="bg-white/85 backdrop-blur-sm border border-white/60 rounded-3xl px-7 py-10 md:px-10 md:py-12 shadow-[0_8px_28px_-6px_rgba(0,0,0,0.08)]">
          {/* Spinner brand */}
          <div className="relative inline-block mb-7">
            <div className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-full border-[5px] border-brand/15" />
            <div className="absolute inset-0 w-16 h-16 md:w-[72px] md:h-[72px] rounded-full border-[5px] border-brand border-t-transparent animate-spin" />
            {/* Mini icone IA au centre du spinner */}
            <div className="absolute inset-0 flex items-center justify-center text-brand">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
          </div>

          <h2 className="font-heading text-text text-2xl md:text-[1.85rem] font-bold tracking-tight mb-2 leading-tight">
            Analyse en cours
          </h2>
          <p className="text-grey text-[0.92rem] md:text-[1rem] leading-relaxed mb-7">
            Votre audit personnalisé est en cours de rédaction.
          </p>

          {/* Barre de progression numerique */}
          <div className="max-w-100 mx-auto mb-7">
            <div className="flex items-baseline justify-between mb-2">
              <p className="text-text font-semibold text-[0.78rem] tracking-wide uppercase">
                Progression
              </p>
              <p className="text-brand font-heading font-bold text-[0.95rem] tabular-nums">
                {Math.round(progress)}%
              </p>
            </div>
            <div className="h-2 w-full rounded-full bg-brand/10 overflow-hidden">
              <div
                className="h-full bg-brand rounded-full transition-[width] duration-200 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Phase courante */}
          <div className="max-w-100 mx-auto text-left" key={phaseIndex}>
            <div className="flex items-start gap-3 animate-fadeIn">
              <span className="shrink-0 w-7 h-7 mt-0.5 rounded-full bg-brand/12 text-brand flex items-center justify-center">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                </span>
              </span>
              <div>
                <p className="text-text font-heading font-bold text-[0.95rem] md:text-[1rem] mb-1 leading-tight">
                  {PHASES[phaseIndex].label}
                </p>
                <p className="text-grey text-[0.85rem] md:text-[0.9rem] leading-relaxed">
                  {PHASES[phaseIndex].detail}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
