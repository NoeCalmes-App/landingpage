// « PAS ENCORE PRÊT À ÉCRIRE ? » : le lien vers le test de l'idée (/audit-app), en bas de l'accueil.
// MASQUÉ le 27/11/2026 (Noé : « masque la section audit gratuit à la fin de la landing page, juste masque, peut-être
// plus tard je rajoute »). Il vit dans ce fichier à part pour que le texte servi aux robots (scripts/generate-routes.js
// lit Accueil.jsx) ne contienne pas une section que la page n'affiche plus.
// POUR LE REMETTRE : dans Accueil.jsx, importer ce composant et poser <AccueilAudit /> juste avant <Footer />.
import { lienInterne } from './seo.js'

export default function AccueilAudit() {
  return (
    <section className="py-14 md:py-20 px-5 bg-card" id="audit">
      <div className="reveal max-w-150 mx-auto text-center">
        <p className="font-jakarta text-text font-extrabold text-[1.15rem] md:text-[1.3rem] tracking-tight leading-tight mb-2">Pas encore prêt à écrire&nbsp;?</p>
        <p className="text-grey text-[0.92rem] md:text-[0.98rem] leading-relaxed mb-5">Teste ton idée&nbsp;: potentiel, budget et délai, en 2&nbsp;minutes.</p>
        <a href={lienInterne('/audit-app')} className="group inline-flex items-center gap-2 font-semibold text-brand text-[0.92rem] md:text-[0.95rem] border border-brand/35 rounded-full px-6 py-3 hover:bg-brand/5 transition-colors">
          Tester mon idée
          <svg className="transition-transform duration-300 group-hover:translate-x-1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </section>
  )
}
