import { useEffect } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Euro, FileCheck2, Handshake, MessageCircle, Phone } from 'lucide-react'
import { appliquerMeta, retirerPrerender } from './seo.js'
import { trackDirectWhatsAppLead } from './metaTracking.js'
import { AvisClients } from './AvisClients.jsx'
import './projets.css'

// Cette page sert aussi de support après un premier appel.
const WHATSAPP_URL = `https://wa.me/33658308210?text=${encodeURIComponent(
  "Bonjour Noé, j’ai une question après avoir consulté la page des réalisations."
)}`

const REALISATIONS = [
  { name: 'Calorie', type: 'Suivi nutritionnel avec l’IA', icon: '/assets/images/apps/calorie.webp', metric: '13 000 €', unit: 'par mois environ', detail: "Une application que j’ai conçue pour un client, sur un marché déjà très concurrentiel." },
  { name: 'Plouff Habitudes', type: "Suivi d'habitudes", icon: '/assets/images/app-icons/plouffhabitudes.webp', metric: '30 jours', unit: 'du design au lancement', detail: "Ma propre application : une routine quotidienne, une mascotte et une offre d’abonnement." },
  { name: 'SmoothRide', type: 'Navigation GPS', icon: '/assets/images/apps/smoothride.svg', metric: 'Téléphone + CarPlay', unit: '', detail: 'Une navigation complète qui évite les ralentisseurs, et qui s’affiche aussi sur l’écran de la voiture avec CarPlay.' },
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

export default function Projets({ onBack }) {
  useEffect(() => {
    appliquerMeta({
      path: '/projets',
      title: "Réalisations et méthode | Noé Calmes",
      description: "Les réalisations de Noé Calmes : applications publiées, résultats, méthode de travail et tarif défini avant le démarrage du projet.",
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
        <nav aria-label="Navigation de la page"><a href="#realisations">Réalisations</a><a href="#methode">Ma méthode</a></nav>
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

      <section id="avis" className="projets-reviews projets-section"><div className="projets-container"><SectionIntro label="Avis clients" title="Ce que disent mes clients" /><AvisClients /></div></section>

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
  </div>
}
