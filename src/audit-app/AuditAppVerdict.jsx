// Page de verdict /audit-app — V3 multi-sections.
//
// Rend le JSON enrichi en sections distinctes :
//   - Bandeau "a prendre avec des pincettes" (top)
//   - Reformulation du projet
//   - Ce qui est solide / Ce qui manque
//   - Concurrents (cards individuelles : positionnement, force, faille, angle)
//   - La ou vous pouvez creuser (differenciation)
//   - Le defi principal
//   - Plan d'action concret (numerote)
//   - Prix non chiffre + delai indicatif
//   - CTA selon branche A (appel Calendly) ou C (lien noecalmes.fr)
//
// Chaque section masquee si son contenu est vide — l'UI s'adapte aux
// reponses de l'IA (cas idee precise vs idee vague).

export default function AuditAppVerdict({
  firstName,
  appType,
  verdict,
  onBookCall,
}) {
  const isHotLead = verdict.branch === 'A'
  const waUrl = buildWhatsAppUrl(firstName, appType)

  const hasSolide = (verdict.ce_qui_est_solide || []).length > 0
  const hasManque = (verdict.ce_qui_manque || []).length > 0
  const concurrentsCount = (verdict.concurrents || []).length
  const hasConcurrents = concurrentsCount > 0
  const hasDiff = (verdict.differenciation || []).length > 0
  // plan_action retire de l'UI volontairement : l'audit donne des reperes,
  // le chiffrage complet passe par l'appel puis le devis.
  const hasDefi = Boolean(verdict.defi_principal)
  const hasDelai = Boolean(verdict.delai_indicatif)

  // Densité de la zone "middle right" (défi / différenciation / chiffrage).
  // On compte les blocs distincts qui rempliraient la colonne droite.
  const midRightCount =
    (hasDefi ? 1 : 0) + (hasDiff ? 1 : 0) + 1

  // Mode Bento desktop = on a assez de matière pour équilibrer 2 colonnes :
  // au moins 2 concurrents à gauche, au moins 2 blocs à droite.
  // Sinon on retombe en flux linéaire (max-w réduit) pour éviter les blancs.
  const useBento = concurrentsCount >= 2 && midRightCount >= 2

  // Largeur du container : adaptative au contenu réel.
  const containerMaxW = useBento ? 'lg:max-w-6xl' : 'lg:max-w-3xl'

  return (
    <div className="bg-card">
      {/* En-tete : titre du verdict */}
      <section className="pt-28 pb-8 md:pt-32 md:pb-10 lg:pt-36 lg:pb-12 px-5 md:px-10 bg-surface">
        <div className="max-w-180 lg:max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 mb-5">
            <CheckIcon className="text-brand" />
            <p className="text-brand text-[0.78rem] md:text-[0.82rem] font-semibold tracking-wide">
              Votre audit est prêt
            </p>
          </div>
          <h1 className="font-heading text-text text-2xl md:text-[2.1rem] lg:text-[2.4rem] font-bold tracking-tight leading-tight mb-3">
            {firstName ? `${firstName}, voici ` : 'Voici '}
            <span className="text-brand">mon analyse</span> de votre projet
          </h1>
        </div>
      </section>

      {/* Contenu — layout adaptatif. */}
      <section className="px-5 md:px-10 pt-4 pb-16 md:pt-6 md:pb-20 lg:pb-24 bg-surface">
        <div
          className={`max-w-180 md:max-w-200 ${containerMaxW} mx-auto space-y-5 md:space-y-6 lg:space-y-7`}
        >
          {/* Pitch + Solide cote a cote sur md+. */}
          {(verdict.pitch_reformule || hasSolide) && (
            <div
              className={`grid gap-5 md:gap-6 ${
                verdict.pitch_reformule && hasSolide ? 'md:grid-cols-2' : ''
              }`}
            >
              {verdict.pitch_reformule && (
                <SectionCard
                  label="Votre projet"
                  icon={<PitchIcon />}
                  accent="neutral"
                >
                  <p className="text-text/90 text-[0.98rem] md:text-[1.05rem] leading-relaxed italic">
                    {verdict.pitch_reformule}
                  </p>
                </SectionCard>
              )}
              {hasSolide && (
                <SectionCard
                  label="Ce qui est solide"
                  icon={<CheckCircleIcon />}
                  accent="positive"
                >
                  <BulletList items={verdict.ce_qui_est_solide} bulletAccent="positive" />
                </SectionCard>
              )}
            </div>
          )}

          {/* Ce qui manque — pleine largeur */}
          {hasManque && (
            <SectionCard
              label="Ce qu'il me manque pour répondre vraiment"
              icon={<HelpCircleIcon />}
              accent="warning"
            >
              <BulletList items={verdict.ce_qui_manque} bulletAccent="warning" />
            </SectionCard>
          )}

          {/* === MIDDLE === Bento si dense, flux linéaire sinon. */}
          {useBento ? (
            <div className="space-y-5 md:space-y-6 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-6 lg:items-start">
              <div className="lg:col-span-7">
                <SectionCard
                  label="Concurrents à connaître"
                  icon={<TargetIcon />}
                  accent="neutral"
                >
                  <p className="text-grey text-[0.85rem] leading-relaxed mb-4 -mt-1">
                    Pour chaque app : ce qu'elle fait · ce qu'elle gagne · sa faille ·
                    votre angle d'attaque.
                  </p>
                  <div className="space-y-3.5">
                    {verdict.concurrents.map((c, i) => (
                      <CompetitorCard key={i} competitor={c} />
                    ))}
                  </div>
                </SectionCard>
              </div>

              <div className="lg:col-span-5 space-y-5 md:space-y-6 lg:space-y-6">
                {hasDefi && (
                  <SectionCard
                    label="Le défi principal"
                    icon={<AlertIcon />}
                    accent="warning"
                  >
                    <p className="text-text/90 text-[0.95rem] md:text-[1rem] leading-relaxed">
                      {verdict.defi_principal}
                    </p>
                  </SectionCard>
                )}
                {hasDiff && (
                  <SectionCard
                    label="Là où vous pouvez creuser"
                    icon={<SparkIcon />}
                    accent="brand"
                  >
                    <BulletList items={verdict.differenciation} bulletAccent="brand" />
                  </SectionCard>
                )}
                <PriceTimingCard
                  prix={verdict.prix_indicatif}
                  delai={hasDelai ? verdict.delai_indicatif : ''}
                  waUrl={waUrl}
                />
              </div>
            </div>
          ) : (
            <>
              {hasConcurrents && (
                <SectionCard
                  label={
                    concurrentsCount === 1
                      ? 'Le concurrent à connaître'
                      : 'Concurrents à connaître'
                  }
                  icon={<TargetIcon />}
                  accent="neutral"
                >
                  <p className="text-grey text-[0.85rem] leading-relaxed mb-4 -mt-1">
                    Pour chaque app : ce qu'elle fait · ce qu'elle gagne · sa faille ·
                    votre angle d'attaque.
                  </p>
                  <div className="space-y-3.5">
                    {verdict.concurrents.map((c, i) => (
                      <CompetitorCard key={i} competitor={c} />
                    ))}
                  </div>
                </SectionCard>
              )}
              {hasDefi && (
                <SectionCard
                  label="Le défi principal"
                  icon={<AlertIcon />}
                  accent="warning"
                >
                  <p className="text-text/90 text-[0.95rem] md:text-[1rem] leading-relaxed">
                    {verdict.defi_principal}
                  </p>
                </SectionCard>
              )}
              {hasDiff && (
                <SectionCard
                  label="Là où vous pouvez creuser"
                  icon={<SparkIcon />}
                  accent="brand"
                >
                  <BulletList items={verdict.differenciation} bulletAccent="brand" />
                </SectionCard>
              )}
              <PriceTimingCard
                prix={verdict.prix_indicatif}
                delai={hasDelai ? verdict.delai_indicatif : ''}
                waUrl={waUrl}
              />
            </>
          )}

          {/* Plan d'action RETIRE de l'UI :
              Donnait au prospect le chemin pour executer sans Noe.
              L'audit doit lui faire comprendre son marche et le pousser vers
              la conversation pour transformer son idee en projet concret. */}

          {/* Closing — full width.
              Tonalite : Noe parle, c'est la suite naturelle de son audit. */}
          {verdict.cta_message && (
            isHotLead ? (
              <ClosingHotLead
                ctaMessage={verdict.cta_message}
                waUrl={waUrl}
                onBookCall={onBookCall}
              />
            ) : (
              <ClosingColdLead ctaMessage={verdict.cta_message} />
            )
          )}
        </div>
      </section>
    </div>
  )
}

// =====================================================================
// SectionCard — wrapper standard pour chaque section
// =====================================================================

function SectionCard({ label, icon, accent = 'neutral', children }) {
  const accentRing = {
    neutral: 'bg-card border-card-border',
    positive: 'bg-green-bg/30 border-green-text/20',
    warning: 'bg-brand/[0.04] border-brand/15',
    brand: 'bg-brand/[0.06] border-brand/20',
  }[accent]

  const iconBg = {
    neutral: 'bg-brand/10 text-brand',
    positive: 'bg-green-bg text-green-text',
    warning: 'bg-brand/12 text-brand',
    brand: 'bg-brand text-white',
  }[accent]

  return (
    <article
      className={`border rounded-2xl p-5 md:p-7 lg:p-8 shadow-sm ${accentRing}`}
    >
      <div className="flex items-center gap-3 mb-4 lg:mb-5">
        <span
          className={`shrink-0 w-9 h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center ${iconBg}`}
        >
          {icon}
        </span>
        <h2 className="font-heading text-text text-[1.02rem] md:text-[1.12rem] lg:text-[1.18rem] font-bold leading-tight">
          {label}
        </h2>
      </div>
      <div>{children}</div>
    </article>
  )
}

function PriceTimingCard({ prix, delai, waUrl }) {
  const prixText =
    prix ||
    "Pour une première version sérieuse, comptez une estimation large. La fourchette est large parce que c'est une estimation sans cadrage précis. Pour un vrai prix et un délai exact, le plus simple c'est qu'on en parle directement."
  return (
    <SectionCard
      label="Prix et délai"
      icon={<EuroIcon />}
      accent="neutral"
    >
      <div className="space-y-4">
        <div>
          <p className="text-text font-semibold text-[0.88rem] md:text-[0.9rem] mb-1">
            Le prix (estimation)
          </p>
          <p className="text-text/85 text-[0.92rem] md:text-[0.95rem] leading-relaxed">
            {prixText}
          </p>
        </div>

        {delai && (
          <div className="pt-3.5 border-t border-card-border">
            <p className="text-text font-semibold text-[0.88rem] md:text-[0.9rem] mb-1">
              Le délai
            </p>
            <p className="text-text/85 text-[0.92rem] md:text-[0.95rem] leading-relaxed">
              {delai}
            </p>
          </div>
        )}

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 font-semibold text-[0.9rem] hover:text-blue-700 transition-colors cursor-pointer"
        >
          Avoir le vrai prix de mon application
        </a>
      </div>
    </SectionCard>
  )
}

// Construit le lien WhatsApp avec un message pre-rempli (le prospect n'a qu'a
// envoyer). Numero : cf. ChatbotWidget (wa.me/33658308210).
function buildWhatsAppUrl(firstName, appType) {
  const name = (firstName || '').trim()
  const intro = name ? `Salut Noé, c'est ${name} 👋` : 'Salut Noé 👋'
  const t = (appType || '').toLowerCase()
  let typeWord = 'application'
  if (t.includes('mobile') && t.includes('web')) typeWord = 'application mobile et web'
  else if (t.includes('web')) typeWord = 'application web'
  else if (t.includes('mobile')) typeWord = 'application mobile'
  const msg = `${intro} Je viens de faire l'audit pour mon idée d'${typeWord} et j'aimerais avoir votre avis pour avancer.`
  return `https://wa.me/33658308210?text=${encodeURIComponent(msg)}`
}

// =====================================================================
// BulletList & NumberedList
// =====================================================================

function BulletList({ items, bulletAccent = 'neutral' }) {
  const dotClass = {
    neutral: 'bg-brand',
    positive: 'bg-green-text',
    warning: 'bg-brand',
    brand: 'bg-brand',
  }[bulletAccent]

  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span
            className={`shrink-0 mt-2 w-1.5 h-1.5 rounded-full ${dotClass}`}
          />
          <p className="text-text/90 text-[0.93rem] md:text-[0.98rem] leading-relaxed">
            {item}
          </p>
        </li>
      ))}
    </ul>
  )
}

function NumberedList({ items }) {
  return (
    <ol className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3.5">
          <span className="shrink-0 w-7 h-7 rounded-full bg-brand text-white font-heading font-bold text-[0.82rem] flex items-center justify-center">
            {i + 1}
          </span>
          <p className="text-text/90 text-[0.93rem] md:text-[0.98rem] leading-relaxed pt-0.5">
            {item}
          </p>
        </li>
      ))}
    </ol>
  )
}

// =====================================================================
// CompetitorCard — 4 dimensions par concurrent
// =====================================================================

function CompetitorCard({ competitor }) {
  return (
    <div className="rounded-xl border border-card-border bg-surface p-4 md:p-5 lg:p-6">
      <h3 className="font-heading text-text text-[1.02rem] md:text-[1.08rem] lg:text-[1.14rem] font-bold mb-1.5">
        {competitor.nom}
      </h3>
      {competitor.positionnement && (
        <p className="text-grey text-[0.88rem] md:text-[0.92rem] lg:text-[0.95rem] leading-relaxed mb-3">
          {competitor.positionnement}
        </p>
      )}

      <div className="space-y-2 text-[0.9rem] md:text-[0.93rem] leading-relaxed">
        {competitor.force && (
          <div className="flex items-start gap-2.5">
            <span className="shrink-0 inline-flex items-center justify-center w-5 h-5 mt-0.5 rounded-full bg-green-bg text-green-text">
              <PlusIcon size={11} />
            </span>
            <p className="text-text/85">
              <span className="font-semibold text-green-text">Force : </span>
              {competitor.force}
            </p>
          </div>
        )}
        {competitor.faille && (
          <div className="flex items-start gap-2.5">
            <span className="shrink-0 inline-flex items-center justify-center w-5 h-5 mt-0.5 rounded-full bg-red-bg text-red-text">
              <MinusIcon size={11} />
            </span>
            <p className="text-text/85">
              <span className="font-semibold text-red-text">Faille : </span>
              {competitor.faille}
            </p>
          </div>
        )}
        {competitor.votre_angle && (
          <div className="flex items-start gap-2.5">
            <span className="shrink-0 inline-flex items-center justify-center w-5 h-5 mt-0.5 rounded-full bg-brand text-white">
              <ArrowRightIcon size={11} />
            </span>
            <p className="text-text/85">
              <span className="font-semibold text-brand">Votre angle : </span>
              {competitor.votre_angle}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// =====================================================================
// Closing — section integree au flux, pas un bloc salesy
// =====================================================================

function ClosingHotLead({ ctaMessage, waUrl, onBookCall }) {
  return (
    <article className="rounded-2xl p-5 md:p-7 lg:p-9 border border-brand/25 bg-brand/[0.06] shadow-sm">
      <div className="flex items-center gap-3 mb-4 lg:mb-5">
        <span className="shrink-0 w-9 h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center bg-brand text-white">
          <ArrowRightIcon size={16} />
        </span>
        <h2 className="font-heading text-text text-[1.02rem] md:text-[1.12rem] lg:text-[1.18rem] font-bold leading-tight">
          Pour aller plus loin
        </h2>
      </div>

      <p className="text-text/90 text-[0.95rem] md:text-[1rem] lg:text-[1.05rem] leading-relaxed mb-5 lg:mb-6 whitespace-pre-line">
        {ctaMessage}
      </p>

      <div className="flex flex-col items-start gap-3">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center bg-text text-surface font-semibold text-[0.92rem] md:text-[0.95rem] lg:text-[1rem] px-6 py-3 lg:px-7 lg:py-3.5 rounded-full cursor-pointer hover:bg-brand transition-colors"
        >
          Écrire à Noé sur WhatsApp
        </a>

        {typeof onBookCall === 'function' && (
          <button
            onClick={onBookCall}
            className="text-grey text-[0.85rem] hover:text-brand transition-colors cursor-pointer underline underline-offset-2"
          >
            ou réserver un appel de 30 min
          </button>
        )}
      </div>
    </article>
  )
}

function ClosingColdLead({ ctaMessage }) {
  return (
    <article className="rounded-2xl p-5 md:p-7 border border-card-border bg-card shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <span className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-brand/12 text-brand">
          <InfoIcon />
        </span>
        <h2 className="font-heading text-text text-[1.02rem] md:text-[1.12rem] font-bold leading-tight">
          Avant de continuer
        </h2>
      </div>

      <p className="text-text/90 text-[0.95rem] leading-relaxed mb-5 whitespace-pre-line">
        {ctaMessage}
      </p>

      <a
        href="https://noecalmes.fr"
        className="inline-flex items-center gap-2 text-brand font-semibold text-[0.92rem] hover:opacity-80 transition-opacity"
      >
        Découvrir ma démarche sur noecalmes.fr
        <ArrowRightIcon size={14} />
      </a>
    </article>
  )
}

// =====================================================================
// Icons (inline SVG pour eviter une dependance)
// =====================================================================

function CheckIcon({ className = '' }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

function HelpCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

function PitchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="13" y2="17" />
    </svg>
  )
}

function TargetIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2z" />
    </svg>
  )
}

function AlertIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

function ZapIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" strokeWidth="0.5" stroke="currentColor" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}

function EuroIcon() {
  // Icone euro Lucide-style — proprement contenue dans le viewBox 24x24
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 10h12" />
      <path d="M4 14h9" />
      <path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12a7.9 7.9 0 0 0 7.8 8 7.7 7.7 0 0 0 5.2-2" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function InfoIcon({ className = '' }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  )
}

function PlusIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function MinusIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function ArrowRightIcon({ size = 14, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}
