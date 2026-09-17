import { useEffect, useRef, useState } from 'react'
import { EmailModal } from './ContactNoe.jsx'
import { lienInterne } from './seo.js'

/**
 * LE PIED DE PAGE, PARTOUT.
 *
 * ⚠️ POURQUOI IL EST DEVENU UN COMPOSANT. Il vivait en dur au fond du rendu
 * principal d'App.jsx. Les pages qui sortent AVANT ce rendu — /blog et chaque
 * /blog/article — n'en avaient donc aucun : ni navigation, ni contact, ni
 * mentions légales, ni CGV. Un lecteur arrivé sur un article depuis Google
 * tombait au bout du texte sur du vide, sans un lien pour aller ailleurs, et
 * sans les mentions qu'un site professionnel doit servir sur chaque page.
 *
 * ⚠️ IL EMPORTE SA PROPRE FENÊTRE D'E-MAIL. Elle vivait dans l'état d'App, donc
 * elle n'était pas rendue sur les pages à sortie anticipée : le bouton aurait
 * été mort sur le blog. Le pied de page se suffit à lui-même, c'est ce qui le
 * rend posable n'importe où.
 */
export default function Footer({ allerVers, onLegal }) {
  const [emailOuvert, setEmailOuvert] = useState(false)
  const racine = useRef(null)

  /**
   * ⚠️ LE PIED DE PAGE SE RÉVÈLE TOUT SEUL, ET C'EST UNE CORRECTION DE BOGUE.
   *
   * Il porte la classe `reveal`, dont le CSS est `opacity: 0`. Sur l'accueil,
   * un IntersectionObserver attaché au conteneur d'App lui ajoute `visible`.
   * Mais /blog et /blog/article sortent AVANT ce conteneur : l'observateur ne
   * les voit jamais, et le pied de page restait donc RIGOUREUSEMENT INVISIBLE.
   * Présent dans le DOM, lisible par un robot, invisible à l'œil.
   *
   * ⚠️ ET IL NE DOIT PAS DÉPENDRE DE JAVASCRIPT POUR EXISTER. Si l'observateur
   * manque, on montre sans animer : un pied de page qui porte les mentions
   * légales ne peut pas disparaître parce qu'une API du navigateur manque.
   */
  useEffect(() => {
    const noeud = racine.current
    if (!noeud) return
    if (typeof IntersectionObserver !== 'function') {
      noeud.classList.add('visible')
      return
    }
    const observateur = new IntersectionObserver(([entree]) => {
      if (!entree.isIntersecting) return
      entree.target.classList.add('visible')
      observateur.disconnect()
    }, { threshold: 0.15 })
    observateur.observe(noeud)
    return () => observateur.disconnect()
  }, [])

  /**
   * ⚠️ LA SECTION CONTACT N'EXISTE QUE SUR L'ACCUEIL. Le lien faisait un
   * scrollIntoView sur un identifiant absent des autres pages : le clic ne
   * faisait RIEN, et l'adresse changeait quand même. On repart donc à l'accueil
   * quand la section n'est pas là.
   */
  const allerAuContact = () => {
    const section = document.getElementById('contact-section')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      history.pushState(null, '', lienInterne('/rendez-vous'))
      return
    }
    // ⚠️ ON REVIENT À L'ACCUEIL, PUIS ON DESCEND — et le « puis » compte. La
    // section n'est pas encore montée au moment du clic : un scroll immédiat
    // ne trouve rien et l'utilisateur atterrit en haut de l'accueil, sans
    // comprendre ce qu'on lui a fait. On attend donc qu'elle apparaisse, sans
    // s'acharner : dix essais, un par image, puis on abandonne en silence.
    allerVers('/rendez-vous')
    let essais = 0
    const descendre = () => {
      const cible = document.getElementById('contact-section')
      if (cible) return cible.scrollIntoView({ behavior: 'smooth', block: 'start' })
      if (++essais < 10) requestAnimationFrame(descendre)
    }
    requestAnimationFrame(descendre)
  }

  return (
    <>
  <footer ref={racine} className="reveal bg-brand py-14 px-6 relative overflow-hidden">
    {/* Background big text */}
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 md:bottom-6 z-0 select-none text-center font-bold leading-[0.9]"
      style={{
        fontFamily: "'Inter', Arial, sans-serif",
        fontSize: 'clamp(4rem, 12vw, 10rem)',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        backgroundImage: 'linear-gradient(rgba(255,254,252,0.1), rgba(255,255,255,0))',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        opacity: 0,
      }}
    >
      NOE CALMES.
    </div>

    <div className="relative z-10 flex flex-col items-center text-center gap-8 max-w-275 mx-auto">
      {/* Name */}
      <p className="font-jakarta text-white font-extrabold text-xl md:text-4xl tracking-tight md:pb-3">
        Noé Calmes.
      </p>

      {/* Nav links */}
      <div className="flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-8">
        {[
          { href: '/expertise', label: 'Expertise' },
          { href: '/creation-application-mobile', label: 'Méthode' },
          { href: '/projets', label: 'Projets' },
          { href: '/blog', label: 'Blog' },
          { href: '/quiz', label: 'Tests' },
          { href: '/faq', label: 'FAQ' },
          { href: '/audit-app', label: 'Audit gratuit' },
        ].map(({ href, label }) => (
          <a
            key={href}
            href={lienInterne(href)}
            onClick={(e) => { e.preventDefault(); allerVers(href) }}
            className="text-white text-sm font-semibold hover:text-white/60 transition-colors"
          >
            {label}
          </a>
        ))}
        <a href={lienInterne('/rendez-vous')} onClick={(e) => { e.preventDefault(); allerAuContact() }} className="text-white text-sm font-semibold hover:text-white/60 transition-colors">Discuter avec Noé</a>
      </div>

      {/* Nous contacter + socials */}
      <div className="flex items-center gap-6 md:pt-1">
        <p className="text-white text-sm font-semibold">Me contacter</p>
        <button onClick={() => setEmailOuvert(true)} aria-label="Email" className="flex items-center justify-center text-white hover:opacity-70 transition-opacity cursor-pointer">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
        </button>
        <a href="https://www.linkedin.com/in/noecalmes" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex items-center justify-center text-white hover:opacity-70 transition-opacity">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        <a href="https://www.instagram.com/noecalmes.app/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex items-center justify-center text-white hover:opacity-70 transition-opacity">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
          </svg>
        </a>
      </div>

      {/* Copyright + legal */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-5 w-full">
        <p className="text-white/40 text-xs">
          &copy; 2026 No&eacute; Calmes. Tous droits r&eacute;serv&eacute;s.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <button onClick={() => openLegal('cgv')} className="text-white/40 text-xs hover:text-white/80 transition-colors cursor-pointer">CGV</button>
          <button onClick={() => openLegal('mentions')} className="text-white/40 text-xs hover:text-white/80 transition-colors cursor-pointer">Mentions l&eacute;gales</button>
          <button onClick={() => openLegal('privacy')} className="text-white/40 text-xs hover:text-white/80 transition-colors cursor-pointer">Politique de confidentialit&eacute;</button>
        </div>
      </div>

    </div>
  </footer>
      {emailOuvert && <EmailModal onClose={() => setEmailOuvert(false)} />}
    </>
  )
}
