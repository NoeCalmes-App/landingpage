import { useEffect, useMemo, useState } from 'react'

function normalizeClientSpacePath(pathname) {
  const cleanPath = (pathname || '/espace-client').replace(/\/+$/, '') || '/espace-client'
  return cleanPath.startsWith('/espace-client') ? cleanPath : '/espace-client'
}

function hasToken(pathname) {
  const path = normalizeClientSpacePath(pathname)
  return path.replace(/^\/espace-client\/?/, '').split('/').filter(Boolean).length > 0
}

function buildAppDevisSrc() {
  const path = normalizeClientSpacePath(window.location.pathname)
  return `/app-devis${path}${window.location.search}${window.location.hash}`
}

export default function ClientSpaceBridge() {
  const [loaded, setLoaded] = useState(false)
  const iframeSrc = useMemo(() => buildAppDevisSrc(), [])
  const tokenPresent = hasToken(window.location.pathname)

  useEffect(() => {
    document.title = 'Espace client — Noé Calmes'
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      'Espace client prive pour echanger avec Noe Calmes, consulter les documents partages et transmettre un devis signe.'
    )
    document.querySelector('link[rel="canonical"]')?.setAttribute(
      'href',
      `https://noecalmes.fr${normalizeClientSpacePath(window.location.pathname)}`
    )

    let robots = document.querySelector('meta[name="robots"]')
    if (!robots) {
      robots = document.createElement('meta')
      robots.setAttribute('name', 'robots')
      document.head.appendChild(robots)
    }
    robots.setAttribute('content', 'noindex, nofollow')
  }, [])

  if (!tokenPresent) {
    return (
      <main className="min-h-screen bg-[#fafafa] flex items-center justify-center px-6 text-center">
        <div>
          <p className="text-[16px] font-semibold text-[#111827] mb-2">Lien espace client incomplet</p>
          <p className="text-[13px] text-[#6b7280]">Utilise le lien complet transmis par Noé pour ouvrir ton espace client.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="fixed inset-0 z-[9999] bg-[#fafafa]">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#fafafa] text-[13px] font-medium text-[#6b7280]">
          Chargement de votre espace client...
        </div>
      )}
      <iframe
        src={iframeSrc}
        title="Espace client Noé Calmes"
        className="block h-full w-full border-0"
        onLoad={() => setLoaded(true)}
        allow="clipboard-read; clipboard-write"
      />
    </main>
  )
}
