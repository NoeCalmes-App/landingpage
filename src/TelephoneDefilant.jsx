import { useEffect, useState } from 'react'

// Le téléphone du bloc « Une idée banale » : un seul cadre, et l'écran change
// tout seul, un écran par application, toutes les 1,8 seconde. Pas de
// défilement, un fondu : on passe d'une application à l'autre.
//
// ⚠️ CE QUI PEUT Y FIGURER. Les CGV (article 10.6) n'autorisent à montrer que ce
// qui est déjà public après mise en ligne : visuels de la fiche store ou du
// site public du client. Calorie est déjà sur la page ; SmoothRide et Bailora
// viennent de leurs sites publics. Une maquette de projet non publié n'entre
// pas ici, même belle, sauf accord écrit du client.
//
// Les écrans sont servis sans coque, à 540 px de large (le cadre affiche 270 px
// au plus, donc net sur les écrans haute densité), tous au même ratio.
const ECRANS = [
  { src: '/assets/images/ecrans/calorie-ecran.webp', app: 'Calorie', alt: 'Calorie, suivi du parcours alimentaire' },
  { src: '/assets/images/ecrans/smoothride-onboarding.webp', app: 'SmoothRide', alt: 'SmoothRide, le même trajet sans les secousses' },
  { src: '/assets/images/ecrans/bailora-accueil.webp', app: 'Bailora', alt: 'Bailora, accueil' },
  { src: '/assets/images/ecrans/smoothride-carte.webp', app: 'SmoothRide', alt: 'SmoothRide, carte du trajet' },
  { src: '/assets/images/ecrans/bailora-tableau-de-bord.webp', app: 'Bailora', alt: 'Bailora, tableau de bord' },
  { src: '/assets/images/ecrans/smoothride-comparatif.webp', app: 'SmoothRide', alt: 'SmoothRide, comparatif des trajets' },
  { src: '/assets/images/ecrans/bailora-loyers.webp', app: 'Bailora', alt: 'Bailora, suivi des loyers' },
]

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
    <div className="flex flex-col items-center gap-3">
      <div className="tel-cadre w-[195px] md:w-[270px]">
        <div className="tel-ecran">
          {ECRANS.map((e, i) => (
            <img
              key={e.src}
              src={e.src}
              alt={i === index ? e.alt : ''}
              width="540"
              height="1161"
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              aria-hidden={i !== index}
              className={i === index ? 'tel-visible' : ''}
            />
          ))}
        </div>
      </div>
      <p className="text-grey text-[0.8rem] font-medium" aria-live="polite">{ECRANS[index].app}</p>
    </div>
  )
}
