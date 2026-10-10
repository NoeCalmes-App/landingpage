// Small product illustrations, kept as vectors for crisp rendering at any size.
export default function DeliverableVisual({ type }) {
  return (
    <div className={`deliverable-visual deliverable-visual-${type}`} aria-hidden="true">
      <svg viewBox="0 0 112 96" fill="none">
        <circle cx="56" cy="48" r="41" fill="currentColor" opacity=".08" />
        {type === 'brief' && <>
          <rect x="31" y="17" width="52" height="66" rx="8" fill="currentColor" opacity=".13" transform="rotate(-10 57 50)" />
          <rect x="29" y="12" width="52" height="66" rx="8" fill="white" stroke="currentColor" strokeWidth="1.5" />
          <rect x="40" y="25" width="26" height="4" rx="2" fill="currentColor" />
          {[41, 53, 65].map(y => <g key={y}><path d={`M39 ${y}l2 2 4-4`} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d={`M51 ${y}h17`} stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".3" /></g>)}
          <circle cx="80" cy="72" r="14" fill="var(--color-text, #033475)" stroke="white" strokeWidth="1.5" />
          <path d="m74 72 4 4 8-9" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        </>}
        {type === 'quote' && <>
          <rect x="29" y="16" width="52" height="67" rx="8" fill="currentColor" opacity=".13" transform="rotate(8 55 50)" />
          <path d="M33 12h43a5 5 0 0 1 5 5v63l-7-4-7 4-7-4-7 4-7-4-7 4-7-4V17a5 5 0 0 1 1-5Z" fill="white" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M42 27h25M42 35h17M42 48h11M63 48h7M42 57h11M63 57h7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity=".3" />
          <path d="M42 67h28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <circle cx="80" cy="31" r="16" fill="var(--color-text, #033475)" stroke="white" strokeWidth="1.5" />
          <path d="M85 24a8 8 0 1 0 0 14M72 29h10M72 33h9" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </>}
        {type === 'launch' && <>
          {/* L'application en ligne (étape 3 de l'accueil) : un téléphone, une courbe qui monte, la pastille qui décolle */}
          <rect x="27" y="19" width="38" height="65" rx="9" fill="currentColor" opacity=".13" transform="rotate(-12 46 51)" />
          <rect x="37" y="9" width="40" height="74" rx="10" fill="white" stroke="currentColor" strokeWidth="2" />
          <rect x="49" y="14" width="16" height="4" rx="2" fill="currentColor" />
          <rect x="43" y="25" width="28" height="26" rx="5" fill="currentColor" opacity=".1" />
          <path d="m46 45 7-6 5 3 9-10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="67" cy="32" r="2.4" fill="currentColor" />
          <path d="M44 59h25M44 65h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".3" />
          <circle cx="80" cy="70" r="15" fill="var(--color-text, #033475)" stroke="white" strokeWidth="1.5" />
          <path d="M80 77V63m-6 6 6-6 6 6" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        </>}
        {type === 'mockup' && <>
          <rect x="27" y="19" width="38" height="65" rx="9" fill="currentColor" opacity=".13" transform="rotate(-12 46 51)" />
          <rect x="39" y="9" width="40" height="74" rx="10" fill="white" stroke="currentColor" strokeWidth="2" />
          <rect x="51" y="14" width="16" height="4" rx="2" fill="currentColor" />
          <rect x="45" y="25" width="28" height="22" rx="5" fill="currentColor" opacity=".15" />
          <circle cx="53" cy="32" r="3" fill="currentColor" opacity=".55" />
          <path d="m46 43 8-7 6 5 6-5 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M46 54h25M46 59h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".3" />
          <rect x="45" y="66" width="28" height="8" rx="4" fill="currentColor" />
          <path d="m76 51 21 17-10 2-5 10-6-29Z" fill="var(--color-text, #033475)" stroke="white" strokeWidth="2.5" strokeLinejoin="round" />
        </>}
      </svg>
    </div>
  )
}
