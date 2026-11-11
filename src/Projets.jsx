import { useEffect } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Euro, FileCheck2, Handshake, MessageCircle, Phone, X } from 'lucide-react'
import { appliquerMeta, retirerPrerender } from './seo.js'
import { trackDirectWhatsAppLead } from './metaTracking.js'
import { AvisClients } from './AvisClients.jsx'
import './projets.css'

// Cette page sert aussi de support après un premier appel.
const WHATSAPP_URL = `https://wa.me/33658308210?text=${encodeURIComponent(
  "Bonjour Noé, j’ai une question après avoir consulté la page des réalisations."
)}`

// Annuaires qui référencent Noé et demandent un lien retour. Une seule ligne,
// discrète, au pied de cette page : jamais dans le pied de page global du site.
// Lu aussi par scripts/generate-routes.js pour le pré-rendu de /projets.
export const ANNUAIRES = [
  { nom: 'jesuisnumerique.fr', url: 'https://www.jesuisnumerique.fr' },
]

const REALISATIONS = [
  { name: 'Calorie', type: 'Suivi nutritionnel avec l’IA', icon: '/assets/images/apps/calorie.webp', metric: '13 000 €', unit: 'par mois environ', detail: "Une application que j’ai conçue pour un client, sur un marché déjà très concurrentiel." },
  { name: 'Plouff Habitudes', type: "Suivi d'habitudes", icon: '/assets/images/app-icons/plouffhabitudes.webp', metric: '30 jours', unit: 'du design au lancement', detail: "Ma propre application : une routine quotidienne, une mascotte et une offre d’abonnement." },
  { name: 'SmoothRide', type: 'Navigation GPS', icon: '/assets/images/apps/smoothride.svg', metric: 'App mobile + CarPlay', unit: '', detail: 'Une navigation complète qui évite les ralentisseurs, et qui s’affiche aussi sur l’écran de la voiture avec CarPlay.' },
]

const METHODE = [
  { number: '01', title: 'La stratégie fait partie du projet', text: "Je réfléchis au modèle de revenus, aux premiers écrans et au moment où proposer une offre payante. Je définis les fonctionnalités utiles avant de commencer le développement." },
  { number: '02', title: 'Je prends en charge la réalisation', text: "Design, développement et mise en ligne : je m’occupe de la réalisation, avec des explications claires et des étapes à valider ensemble." },
  { number: '03', title: 'Je reste présent après le lancement', text: "Les corrections de bugs sont incluses pendant 30 jours après la mise en ligne. Ensuite, je reste disponible pour accompagner les évolutions de l’application." },
]

function SectionIntro({ label, title, children }) {
  return <div className="projets-section-intro">
    <p className="projets-eyebrow">{label}</p>
    <h2>{title}</h2>
    {children && <p>{children}</p>}
  </div>
}

// Études de cas : chaque carte ouvre une fenêtre <dialog> native. Le texte
// reste écrit dans le JSX du composant, donc dans le pré-rendu de /projets.
function ouvrirCas(id) {
  const modale = document.getElementById(id)
  if (modale && !modale.open) modale.showModal()
}

// Un clic sur le fond (le <dialog> lui-même, hors de la boîte) ferme la fenêtre.
function fermerSiFond(e) {
  if (e.target === e.currentTarget) e.currentTarget.close()
}

export default function Projets({ onBack }) {
  useEffect(() => {
    appliquerMeta({
      path: '/projets',
      title: "Réalisations : applications mobiles et web | Noé Calmes",
      description: "SmoothRide, Bailora, Wake Up Alarme, Plouff Habitudes, Hush : les applications conçues par Noé Calmes, le besoin de départ et le résultat.",
      ogImage: 'https://noecalmes.fr/assets/images/meta/projets-og.jpg',
      ogImageAlt: "Mes réalisations : des applications conçues de l’idée au lancement par Noé Calmes.",
    })
    retirerPrerender()
    window.scrollTo(0, 0)
  }, [])

  return <div className="projets-page">
    <header className="projets-nav-wrap">
      <div className="projets-nav">
        <button type="button" onClick={onBack} className="projets-brand" aria-label="Retour à l'accueil">
          <img src="/assets/images/profile/me.webp" alt="" width="44" height="44" />
          <span><strong>Noé Calmes</strong><small>Applications mobiles &amp; web</small></span>
        </button>
        <nav aria-label="Navigation de la page"><a href="#realisations">Réalisations</a><a href="#etudes-de-cas">Études de cas</a><a href="#methode">Ma méthode</a></nav>
        <a className="projets-nav-avis" href="#avis">Les avis <ArrowDown size={15} aria-hidden="true" /></a>
      </div>
    </header>

    <main>
      <section className="projets-hero projets-container" aria-labelledby="projets-title">
        <div className="projets-hero-copy">
          <p className="projets-eyebrow"><span className="projets-eyebrow-line" /> Expertise &amp; réalisations</p>
          <h1 id="projets-title">Je crée chaque application <em>comme si c’était la mienne.</em></h1>
          <p className="projets-hero-lead"><strong>Plus de 20 applications publiées.</strong> Stratégie, design, développement : je prends en charge chaque projet pour créer une application utile, pensée pour rapporter.</p>
          <div className="projets-hero-actions">
            <a href="#realisations" className="projets-discover">Voir les réalisations <ArrowDown size={17} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="projets-hero-visual" aria-label="Aperçus d'applications conçues par Noé Calmes">
          <div className="projets-visual-orbit" aria-hidden="true" />
          <figure className="projets-screen projets-screen-primary"><div className="projets-phone"><img src="/assets/images/apps/captures/smoothride-navigation.webp" alt="SmoothRide : navigation et signalement des dos-d’âne sur le trajet" width="660" height="1431" /></div><figcaption>SmoothRide</figcaption></figure>
          <figure className="projets-screen projets-screen-secondary"><div className="projets-phone"><img src="/assets/images/apps/captures/wakeup-alarme.webp" alt="WakeUp Alarme : réveil à missions" width="660" height="1431" /></div><figcaption>WakeUp Alarme</figcaption></figure>
        </div>
      </section>

      <section id="realisations" className="projets-container projets-section projets-results">
        <SectionIntro label="Réalisations" title="Des applications utilisées. Des résultats concrets." />
        <article className="projets-feature">
          <div className="projets-feature-copy">
            <div className="projets-app-id"><img src="/assets/images/apps/hushapp.webp" alt="" width="56" height="56" /><span><strong>Hush</strong><small>Messagerie anonyme · iOS et Android</small></span></div>
            <p className="projets-feature-metric">+1 million <span>de téléchargements au total</span></p>
            <p className="projets-feature-text">J’ai conçu la première version de cette messagerie, qui a réuni 300 000 utilisateurs.</p>
          </div>
        </article>
        <div className="projets-project-grid">{REALISATIONS.map((project) => <article className="projets-project-card" key={project.name}>
          <div className="projets-app-id"><img src={project.icon} alt="" width="48" height="48" loading="lazy" /><span><strong>{project.name}</strong><small>{project.type}</small></span></div>
          <div className="projets-project-result"><strong>{project.metric}</strong>{project.unit && <span>{project.unit}</span>}</div>
          <p>{project.detail}</p>
        </article>)}</div>
      </section>

      <section id="etudes-de-cas" className="projets-container projets-section projets-cases" aria-labelledby="projets-cases-title">
        <div className="projets-section-intro">
          <p className="projets-eyebrow">Études de cas</p>
          <h2 id="projets-cases-title">Le besoin de départ, ce que j’ai fait, le résultat</h2>
        </div>
        <div className="projets-cases-grid">
          <article className="projets-case">
            <button type="button" className="projets-case-ouvrir" onClick={() => ouvrirCas('cas-smoothride')} aria-haspopup="dialog">
              <img className="projets-case-visuel" src="/assets/images/projets/smoothride.webp" alt="SmoothRide : écran de choix du trajet, le plus rapide ou le plus doux, avec le nombre de dos-d’âne" width="960" height="540" loading="lazy" />
            </button>
            <div className="projets-case-corps">
              <div className="projets-app-id"><img src="/assets/images/apps/smoothride.svg" alt="" width="48" height="48" loading="lazy" /><span><h3>SmoothRide</h3><small>Navigation GPS · application client</small></span></div>
              <p className="projets-case-accroche">La navigation GPS qui évite les dos-d’âne, guidée à la voix, avec CarPlay et Android Auto.</p>
              <button type="button" className="projets-case-lire" onClick={() => ouvrirCas('cas-smoothride')} aria-haspopup="dialog">Lire l’étude de cas <ArrowRight size={15} aria-hidden="true" /></button>
            </div>
            <dialog id="cas-smoothride" className="projets-cas-modale" aria-labelledby="cas-smoothride-titre" onClick={fermerSiFond}>
              <div className="projets-cas-modale-boite">
                <form method="dialog" className="projets-cas-fermer-form"><button className="projets-cas-fermer" aria-label="Fermer l’étude de cas"><X size={20} aria-hidden="true" /></button></form>
                <img className="projets-cas-modale-visuel" src="/assets/images/projets/smoothride.webp" alt="" width="960" height="540" loading="lazy" />
                <div className="projets-cas-modale-corps">
                  <div className="projets-app-id"><img src="/assets/images/apps/smoothride.svg" alt="" width="48" height="48" loading="lazy" /><span><h4 id="cas-smoothride-titre">SmoothRide</h4><small>Navigation GPS · application client</small></span></div>
                  <p className="projets-cas-modale-accroche">La navigation GPS qui évite les dos-d’âne, guidée à la voix, avec CarPlay et Android Auto.</p>
                  <div className="projets-cas-etapes">
                    <div><span>Le besoin</span><p>Les GPS cherchent le trajet le plus rapide, jamais le plus doux. Pour un dos fragile, un véhicule chargé ou un professionnel qui roule toute la journée, les dos-d’âne ont un vrai coût.</p></div>
                    <div><span>Ce que j’ai fait</span><p>Une navigation complète qui compare deux trajets et compte les ralentisseurs sur chacun, à partir de plus de 120 000 ralentisseurs référencés en France. Elle s’affiche sur l’écran de la voiture avec CarPlay et Android Auto, et un abonnement Pro lève la limite d’itinéraires.</p></div>
                    <div><span>Le résultat</span><p>En ligne sur l’App Store et Google Play.</p></div>
                  </div>
                </div>
              </div>
            </dialog>
          </article>
          <article className="projets-case">
            <button type="button" className="projets-case-ouvrir" onClick={() => ouvrirCas('cas-bailora')} aria-haspopup="dialog">
              <img className="projets-case-visuel" src="/assets/images/projets/bailora.webp" alt="Bailora : tableau de bord avec les loyers du mois et les actions à traiter" width="960" height="540" loading="lazy" />
            </button>
            <div className="projets-case-corps">
              <div className="projets-app-id"><img src="/assets/images/apps/bailora.webp" alt="" width="48" height="48" loading="lazy" /><span><h3>Bailora</h3><small>Gestion locative · application client</small></span></div>
              <p className="projets-case-accroche">La gestion locative sur téléphone : loyers, quittances, états des lieux et un assistant à qui l’on parle.</p>
              <button type="button" className="projets-case-lire" onClick={() => ouvrirCas('cas-bailora')} aria-haspopup="dialog">Lire l’étude de cas <ArrowRight size={15} aria-hidden="true" /></button>
            </div>
            <dialog id="cas-bailora" className="projets-cas-modale" aria-labelledby="cas-bailora-titre" onClick={fermerSiFond}>
              <div className="projets-cas-modale-boite">
                <form method="dialog" className="projets-cas-fermer-form"><button className="projets-cas-fermer" aria-label="Fermer l’étude de cas"><X size={20} aria-hidden="true" /></button></form>
                <img className="projets-cas-modale-visuel" src="/assets/images/projets/bailora.webp" alt="" width="960" height="540" loading="lazy" />
                <div className="projets-cas-modale-corps">
                  <div className="projets-app-id"><img src="/assets/images/apps/bailora.webp" alt="" width="48" height="48" loading="lazy" /><span><h4 id="cas-bailora-titre">Bailora</h4><small>Gestion locative · application client</small></span></div>
                  <p className="projets-cas-modale-accroche">La gestion locative sur téléphone : loyers, quittances, états des lieux et un assistant à qui l’on parle.</p>
                  <div className="projets-cas-etapes">
                    <div><span>Le besoin</span><p>Les propriétaires, seuls ou en SCI familiale, suivent leurs loyers, leurs quittances et leurs états des lieux entre un tableur, des courriers et des photos dispersées.</p></div>
                    <div><span>Ce que j’ai fait</span><p>Une application qui suit les loyers, prépare les quittances et les courriers, guide l’état des lieux pièce par pièce jusqu’à la signature, et range chaque document. Un assistant intelligent répond aux questions sur les biens, à l’écrit comme à la voix.</p></div>
                    <div><span>Le résultat</span><p>Une application iOS et Android, conçue de la stratégie à la mise en ligne.</p></div>
                  </div>
                </div>
              </div>
            </dialog>
          </article>
          <article className="projets-case">
            <button type="button" className="projets-case-ouvrir" onClick={() => ouvrirCas('cas-wakeup')} aria-haspopup="dialog">
              <img className="projets-case-visuel" src="/assets/images/projets/wakeup-alarme.webp" alt="Wake Up Alarme : mission de calcul à réussir pour couper l’alarme" width="960" height="540" loading="lazy" />
            </button>
            <div className="projets-case-corps">
              <div className="projets-app-id"><img src="/assets/images/app-icons/wackupalarme.webp" alt="" width="48" height="48" loading="lazy" /><span><h3>Wake Up Alarme</h3><small>Réveil · ma propre application</small></span></div>
              <p className="projets-case-accroche">Le réveil qu’on ne peut pas éteindre sans se lever : il faut réussir une mission pour le couper.</p>
              <button type="button" className="projets-case-lire" onClick={() => ouvrirCas('cas-wakeup')} aria-haspopup="dialog">Lire l’étude de cas <ArrowRight size={15} aria-hidden="true" /></button>
            </div>
            <dialog id="cas-wakeup" className="projets-cas-modale" aria-labelledby="cas-wakeup-titre" onClick={fermerSiFond}>
              <div className="projets-cas-modale-boite">
                <form method="dialog" className="projets-cas-fermer-form"><button className="projets-cas-fermer" aria-label="Fermer l’étude de cas"><X size={20} aria-hidden="true" /></button></form>
                <img className="projets-cas-modale-visuel" src="/assets/images/projets/wakeup-alarme.webp" alt="" width="960" height="540" loading="lazy" />
                <div className="projets-cas-modale-corps">
                  <div className="projets-app-id"><img src="/assets/images/app-icons/wackupalarme.webp" alt="" width="48" height="48" loading="lazy" /><span><h4 id="cas-wakeup-titre">Wake Up Alarme</h4><small>Réveil · ma propre application</small></span></div>
                  <p className="projets-cas-modale-accroche">Le réveil qu’on ne peut pas éteindre sans se lever : il faut réussir une mission pour le couper.</p>
                  <div className="projets-cas-etapes">
                    <div><span>Le besoin</span><p>On coupe l’alarme sans même ouvrir les yeux, et on se rendort.</p></div>
                    <div><span>Ce que j’ai fait</span><p>Pour couper l’alarme, il faut réussir une mission : résoudre un calcul, scanner un QR code posé dans une autre pièce, secouer son téléphone ou faire quelques pas. Sa musique Spotify comme sonnerie, et un abonnement mensuel ou annuel avec une semaine d’essai gratuite.</p></div>
                    <div><span>Le résultat</span><p>En ligne sur l’App Store et Google Play, sur abonnement.</p></div>
                  </div>
                </div>
              </div>
            </dialog>
          </article>
          <article className="projets-case">
            <button type="button" className="projets-case-ouvrir" onClick={() => ouvrirCas('cas-plouff')} aria-haspopup="dialog">
              <img className="projets-case-visuel" src="/assets/images/projets/plouff-habitudes.webp" alt="Plouff Habitudes : écran du jour avec la loutre Plouf et les habitudes à cocher" width="960" height="540" loading="lazy" />
            </button>
            <div className="projets-case-corps">
              <div className="projets-app-id"><img src="/assets/images/app-icons/plouffhabitudes.webp" alt="" width="48" height="48" loading="lazy" /><span><h3>Plouff Habitudes</h3><small>Habitudes et bien-être · ma propre application</small></span></div>
              <p className="projets-case-accroche">De bonnes habitudes sans pression, avec Plouf, une loutre qui évolue à mesure qu’on avance.</p>
              <button type="button" className="projets-case-lire" onClick={() => ouvrirCas('cas-plouff')} aria-haspopup="dialog">Lire l’étude de cas <ArrowRight size={15} aria-hidden="true" /></button>
            </div>
            <dialog id="cas-plouff" className="projets-cas-modale" aria-labelledby="cas-plouff-titre" onClick={fermerSiFond}>
              <div className="projets-cas-modale-boite">
                <form method="dialog" className="projets-cas-fermer-form"><button className="projets-cas-fermer" aria-label="Fermer l’étude de cas"><X size={20} aria-hidden="true" /></button></form>
                <img className="projets-cas-modale-visuel" src="/assets/images/projets/plouff-habitudes.webp" alt="" width="960" height="540" loading="lazy" />
                <div className="projets-cas-modale-corps">
                  <div className="projets-app-id"><img src="/assets/images/app-icons/plouffhabitudes.webp" alt="" width="48" height="48" loading="lazy" /><span><h4 id="cas-plouff-titre">Plouff Habitudes</h4><small>Habitudes et bien-être · ma propre application</small></span></div>
                  <p className="projets-cas-modale-accroche">De bonnes habitudes sans pression, avec Plouf, une loutre qui évolue à mesure qu’on avance.</p>
                  <div className="projets-cas-etapes">
                    <div><span>Le besoin</span><p>Les applications d’habitudes misent sur la pression et les séries à ne pas casser : on rate un jour, on culpabilise, on abandonne.</p></div>
                    <div><span>Ce que j’ai fait</span><p>Une application douce : on planifie ses habitudes à son rythme, avec des citations, un exercice de respiration guidé, un suivi de l’humeur et des statistiques. Une offre premium par abonnement.</p></div>
                    <div><span>Le résultat</span><p>Du design au lancement en 30 jours, en ligne sur l’App Store et Google Play.</p></div>
                  </div>
                </div>
              </div>
            </dialog>
          </article>
        </div>
      </section>
      <section id="avis" className="projets-reviews projets-section"><div className="projets-container"><SectionIntro label="Avis clients" title={<>Ce que disent <span className="projets-accent">mes clients</span></>} /><AvisClients /></div></section>

      <section id="methode" className="projets-method"><div className="projets-container projets-section">
        <SectionIntro label="Ma façon de travailler" title="Un projet pris en charge de bout en bout" />
        <div className="projets-method-grid">{METHODE.map((item) => <article key={item.number} className="projets-method-card"><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </div></section>

      <section className="projets-container projets-section projets-budget" aria-labelledby="projets-budget-title">
        <div className="projets-budget-panel">
          <div className="projets-budget-heading">
            <span className="projets-budget-emblem" aria-hidden="true"><Euro size={30} strokeWidth={1.8} /></span>
            <p className="projets-eyebrow">Budget &amp; collaboration</p>
            <h2 id="projets-budget-title">Un prix défini avant de commencer.</h2>
          </div>
          <div className="projets-budget-points">
            <article className="projets-budget-point">
              <FileCheck2 size={22} strokeWidth={1.7} aria-hidden="true" />
              <div><h3>Un devis clair</h3><p>Le contenu du projet, le délai et le montant sont définis par écrit avant tout engagement.</p></div>
            </article>
            <article className="projets-budget-point">
              <Handshake size={22} strokeWidth={1.7} aria-hidden="true" />
              <div><h3>Travailler ensemble dans la durée</h3><p>Une réduction est proposée sur les devis suivants, pour accompagner les prochaines évolutions.</p></div>
            </article>
          </div>
        </div>
      </section>

      <section id="contact" className="projets-container projets-contact"><h2>Une question après l’échange ?</h2><p>Je réponds directement, par message ou par téléphone.</p>
        <div className="projets-contact-links"><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackDirectWhatsAppLead('projets_contact')}><MessageCircle size={17} aria-hidden="true" /> M’écrire <ArrowUpRight size={15} aria-hidden="true" /></a><a href="tel:+33658308210"><Phone size={16} aria-hidden="true" /> M’appeler</a></div>
      </section>
    </main>
    <footer className="projets-footer projets-container"><span>Noé Calmes · Expert en applications mobiles &amp; web</span><button type="button" onClick={onBack}>Retour à l'accueil <ArrowRight size={15} aria-hidden="true" /></button></footer>
    <p className="projets-annuaires projets-container">Référencé sur {ANNUAIRES.map((a, i) => <span key={a.url}>{i > 0 && ' · '}<a href={a.url} target="_blank" rel="noopener">{a.nom}</a></span>)}</p>
  </div>
}
