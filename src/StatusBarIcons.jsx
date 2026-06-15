// Icônes de barre de statut façon iPhone (réseau, wifi, batterie).
// Partagé par toutes les maquettes. Couleur héritée via currentColor.
export default function StatusBarIcons() {
  return (
    <>
      <svg width="16" height="11" viewBox="0 0 18 12" fill="currentColor" aria-hidden="true">
        <rect x="0" y="8" width="3" height="4" rx="1" />
        <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
        <rect x="10" y="3" width="3" height="9" rx="1" />
        <rect x="15" y="0" width="3" height="12" rx="1" />
      </svg>
      <svg width="14" height="11" viewBox="0 0 16 12" fill="currentColor" aria-hidden="true">
        <path d="M8 2.4c2.4 0 4.6 1 6.2 2.5l-1.4 1.5C11.6 5.2 9.9 4.5 8 4.5s-3.6.7-4.8 1.9L1.8 4.9C3.4 3.4 5.6 2.4 8 2.4Z" />
        <path d="M8 6.2c1.3 0 2.6.5 3.5 1.4l-1.5 1.5c-.5-.5-1.2-.8-2-.8s-1.5.3-2 .8L4.5 7.6C5.4 6.7 6.7 6.2 8 6.2Z" />
        <circle cx="8" cy="10.1" r="1.3" />
      </svg>
      <svg width="23" height="11" viewBox="0 0 26 13" aria-hidden="true">
        <rect x="0.6" y="0.6" width="21.8" height="11.8" rx="3" fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.2" />
        <rect x="2.2" y="2.2" width="16.5" height="8.6" rx="1.6" fill="currentColor" />
        <path d="M24 4.6c.8.3 1.3 1 1.3 1.9s-.5 1.6-1.3 1.9V4.6Z" fill="currentColor" fillOpacity="0.5" />
      </svg>
    </>
  )
}
