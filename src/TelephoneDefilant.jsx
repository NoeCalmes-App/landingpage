import { useEffect, useState } from 'react'

// Le téléphone du bloc « Une idée banale » : un vrai cadre d'iPhone (îlot
// dynamique, boutons latéraux, coins au bon rayon), et l'écran passe d'une
// application à l'autre en fondu toutes les 1,8 seconde. Un écran par
// application, le plus parlant de chacune, tous au même format que le
// téléphone (ratio 393 × 852, comme une capture d'iPhone 15), barre de statut
// comprise : chaque image a l'heure et les icônes, comme une capture réelle.
//
// Les écrans viennent des pages /maquette/... de ce dépôt (captures des
// maquettes clients, sans nom affiché), de Calorie, et sont servis en WebP à
// 540 × 1170 (le cadre affiche 330 px au plus, donc net en haute densité).
// Le premier se charge tout de suite, les autres en différé.
const ECRANS = [
  { src: 'calorie.webp', alt: 'Calorie, suivi du parcours alimentaire' },
  { src: 'smoothride-promesse.webp', alt: 'SmoothRide, écran de promesse' },
  { src: 'kingfit-onboarding.webp', alt: 'Application de coaching, premier écran' },
  { src: 'bailora-tableau-de-bord.webp', alt: 'Bailora, tableau de bord' },
  { src: 'sonora-ouverture.webp', alt: 'Application musicale, écran d’ouverture' },
  { src: 'immomatch-tableau-de-bord.webp', alt: 'Application immobilière, tableau de bord' },
  { src: 'blush-match.webp', alt: 'Application de rencontre, écran de match' },
  { src: 'aretha-tableau-de-bord.webp', alt: 'Application pour artistes, tableau de bord' },
  { src: 'convoipilote-navigation.webp', alt: 'Application de navigation, vue conduite' },
  { src: 'pet-solidarite-ouverture.webp', alt: 'Application d’entraide animale, ouverture' },
  { src: 'bagsitter-garde.webp', alt: 'Application de garde de bagages, garde en cours' },
  { src: 'juridik-ouverture.webp', alt: 'Application juridique, ouverture' },
  { src: 'vietcollab-accueil.webp', alt: 'Application de collaborations, accueil' },
  { src: 'guestride-course.webp', alt: 'Application de VTC, proposition de course' },
  { src: 'colocool-tableau-de-bord.webp', alt: 'Application de colocation, tableau de bord' },
  { src: 'pac-assist-onboarding.webp', alt: 'Application pour techniciens, premier écran' },
  { src: 'moovye-scanner.webp', alt: 'Application logistique, scan d’un bagage' },
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
