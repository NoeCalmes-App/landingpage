import { useEffect, useState } from 'react'

// Le téléphone du bloc « Une idée banale » : un vrai cadre d'iPhone (îlot
// dynamique, boutons latéraux, coins au bon rayon), et l'écran passe d'une
// application à l'autre en fondu toutes les 1,8 seconde. Quatre écrans, pas
// plus, dessinés sur mesure dans `scripts/ecrans-telephone/ecrans.html` et
// capturés par `scripts/ecrans-telephone/capturer.cjs` : format exact d'une
// capture d'iPhone 15 (393 × 852), barre de statut comprise, servis en WebP à
// 786 × 1704 (le cadre affiche 330 px au plus, donc net en haute densité).
// Le premier se charge tout de suite, les autres en différé.
const ECRANS = [
  { src: 'smoothride-promesse.webp', alt: 'SmoothRide, le même trajet sans les secousses' },
  { src: 'smoothride-navigation.webp', alt: 'SmoothRide, navigation en mouvement' },
  { src: 'bailora-accueil.webp', alt: 'Bailora, accueil : loyers du mois et actions à traiter' },
  { src: 'sonora-lecture.webp', alt: 'Sonora, lecture d’un morceau' },
]

const DOSSIER = '/assets/images/ecrans/'
const INTERVALLE_MS = 1800

export default function TelephoneDefilant() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    // Qui a demandé moins de mouvement garde le premier écran, fixe.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setIndex((i) => (i + 1) % ECRANS.length), INTERVALLE_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="tel-cadre w-[250px] md:w-[330px]" role="img" aria-label="Écrans d'applications conçues par Noé Calmes">
      <span className="tel-bouton tel-bouton-silence" aria-hidden="true" />
      <span className="tel-bouton tel-bouton-vol-haut" aria-hidden="true" />
      <span className="tel-bouton tel-bouton-vol-bas" aria-hidden="true" />
      <span className="tel-bouton tel-bouton-marche" aria-hidden="true" />
      <div className="tel-ecran">
        {ECRANS.map((e, i) => (
          <img
            key={e.src}
            src={DOSSIER + e.src}
            alt={i === index ? e.alt : ''}
            width="540"
            height="1170"
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            aria-hidden={i !== index}
            className={i === index ? 'tel-visible' : ''}
          />
        ))}
        <span className="tel-ilot" aria-hidden="true" />
      </div>
    </div>
  )
}
