// LA PRISE DE RENDEZ-VOUS : le widget en ligne de Cal.com (sur l'accueil depuis le 27/11/2026, construit sur la page test le 26/11/2026).
//
// TOUT PASSE PAR CAL.COM (Noé, 26/11/2026) : la page affiche le calendrier, le visiteur choisit son créneau, puis
// Cal.com lui demande ses coordonnées et ses questions. Pas de tri par le budget : tout le monde réserve.
// Réglages et couleur : `reserverAppel.js`.
//
// LE WIDGET est le code d'intégration officiel de Cal.com (`embed.js`), chargé quand ce bloc s'affiche. Il règle
// lui-même sa hauteur. La page écoute la réservation faite (`bookingSuccessfulV2`) pour afficher « C'est réservé ».
//
// APRÈS LA RÉSERVATION, le visiteur RESTE SUR LA PAGE : Cal.com affiche sa confirmation dans le cadre (date, lien pour
// déplacer ou annuler), et la page ajoute « C'est réservé ». Pas de page de remerciement : la redirection de Cal.com
// est payante, et la mesure n'en a pas besoin.
// LA MESURE META : `trackCallBooked` envoie l'événement « Schedule » à la confirmation (metaTracking.js).
//
// ⚠️ CE QUI MANQUE AVANT LA MISE EN LIGNE :
//   - la fiche du prospect dans Nowork à chaque réservation : par le WEBHOOK de Cal.com (gratuit), côté Nowork.
//     Le site n'envoie rien lui-même.
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, CalendarCheck } from 'lucide-react'
import './reserver-appel.css'
import { lienInterne } from './seo.js'
import { CAL_ESPACE, CAL_LIEN, CAL_ORIGINE, CAL_SCRIPT, UI_CAL, configCal } from './reserverAppel.js'
import { trackBookingStep, trackCallBooked } from './metaTracking.js'

// Le chargeur officiel de Cal.com (code d'intégration « en ligne »), tel que Cal.com le donne : il crée `window.Cal`
// et met les appels en file jusqu'à ce que `embed.js` soit chargé.
function preparerCal() {
  ;(function (C, A, L) { let p = function (a, ar) { a.q.push(ar) }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement('script')).src = A; cal.loaded = true } if (ar[0] === L) { const api = function () { p(api, arguments) }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === 'string') { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ['initNamespace', namespace]) } else p(cal, ar); return } p(cal, ar) } })(window, CAL_SCRIPT, 'init')
  return window.Cal
}

export default function ReserverAppel() {
  const [reserve, setReserve] = useState(false)
  const carte = useRef(null)

  useEffect(() => {
    const Cal = preparerCal()
    Cal('init', CAL_ESPACE, { origin: CAL_ORIGINE })
    Cal.ns[CAL_ESPACE]('inline', {
      elementOrSelector: '#ra-cal',
      config: configCal(window.location.href),
      calLink: CAL_LIEN,
    })
    Cal.ns[CAL_ESPACE]('ui', UI_CAL)
    // Les étapes mesurées pour Meta (metaTracking.js).
    Cal.ns[CAL_ESPACE]('on', { action: 'rescheduleBookingSuccessfulV2', callback: () => trackBookingStep('deplace', 'accueil') })
    Cal.ns[CAL_ESPACE]('on', { action: 'bookingCancelled', callback: () => trackBookingStep('annule', 'accueil') })
    Cal.ns[CAL_ESPACE]('on', {
      action: 'bookingSuccessfulV2',
      callback: () => {
        trackCallBooked('accueil')
        setReserve(true)
        carte.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      },
    })
  }, [])

  // Le calendrier est « vu » quand son haut a dépassé le tiers bas de l'écran. Pas « la moitié du bloc à l'écran » :
  // sur téléphone le calendrier fait 2 400 px de haut, plus de trois écrans, et la moitié n'y est jamais visible
  // (défaut trouvé à la vérification du 26/11/2026 : l'étape ne partait jamais sur téléphone).
  useEffect(() => {
    const bloc = carte.current
    if (!bloc || typeof IntersectionObserver === 'undefined') return undefined
    const observateur = new IntersectionObserver((entrees) => {
      if (!entrees.some((entree) => entree.isIntersecting)) return
      trackBookingStep('calendrier', 'accueil')
      observateur.disconnect()
    }, { threshold: 0, rootMargin: '0px 0px -33% 0px' })
    observateur.observe(bloc)
    return () => observateur.disconnect()
  }, [])

  // « Calendrier utilisé » = un vrai clic DANS le calendrier (un jour, un mois, un créneau). La page ne voit pas ce
  // qui se passe dans le cadre de Cal.com, mais elle sait quand il prend la main : la fenêtre perd le focus et
  // l'élément actif devient ce cadre. Essayé d'abord, puis retiré le 26/11/2026 à la vérification : le signal
  // `__routeChanged` de Cal.com, qui partait aussi tout seul au chargement, dans un ordre qui change d'une fois à
  // l'autre (l'étape était comptée sans que personne ne touche au calendrier).
  useEffect(() => {
    const surPerteDeFocus = () => {
      const actif = document.activeElement
      if (actif?.tagName !== 'IFRAME' || !carte.current?.contains(actif)) return
      trackBookingStep('usage', 'accueil')
      window.removeEventListener('blur', surPerteDeFocus)
    }
    window.addEventListener('blur', surPerteDeFocus)
    return () => window.removeEventListener('blur', surPerteDeFocus)
  }, [])

  return (
    <div ref={carte} className="ra-bloc" id="reserver">
      {reserve && (
        <div className="ra-reserve" role="status">
          <span className="ra-reserve-icone" aria-hidden="true"><CalendarCheck size={20} strokeWidth={2.2} /></span>
          <p>
            <b>C&apos;est réservé.</b> Je t&apos;appelle à l&apos;heure choisie, au numéro que tu m&apos;as donné. La confirmation arrive par e-mail.
            <a href={lienInterne('/projets')}>Voir ce que j&apos;ai déjà construit<ArrowRight size={15} strokeWidth={2.5} aria-hidden="true" /></a>
          </p>
        </div>
      )}
      <div id="ra-cal" className="ra-widget" />
    </div>
  )
}
