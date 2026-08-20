import { useEffect, useMemo, useState } from 'react'

const NOWORK_BASE_PATH = '/nowork'

function normalizePublicPath(pathname, publicBasePath) {
  const cleanPath = (pathname || publicBasePath).replace(/\/+$/, '') || publicBasePath
  return cleanPath === publicBasePath || cleanPath.startsWith(`${publicBasePath}/`)
    ? cleanPath
    : publicBasePath
}

function segmentCount(pathname, publicBasePath) {
  const path = normalizePublicPath(pathname, publicBasePath)
  return path.replace(new RegExp(`^${publicBasePath}/?`), '').split('/').filter(Boolean).length
}

function buildNoworkSrc(publicBasePath) {
  const path = normalizePublicPath(window.location.pathname, publicBasePath)
  return `${NOWORK_BASE_PATH}${path}${window.location.search}${window.location.hash}`
}

export default function AppRouteBridge({
  publicBasePath,
  minSegments = 1,
  title,
  description,
  incompleteTitle,
  incompleteText,
  loadingText,
}) {
  const [loaded, setLoaded] = useState(false)
  const iframeSrc = useMemo(() => buildNoworkSrc(publicBasePath), [publicBasePath])
  const routeIsComplete = segmentCount(window.location.pathname, publicBasePath) >= minSegments

  // Exception assumee a la regle de la barre finale (src/seo.js) : ces routes
  // (/espace-client, /maquette-visuel) sont passees en `noindex, nofollow`
  // quelques lignes plus bas. Elles ne sont ni indexees ni au sitemap, donc la
  // forme de leur canonique n'a aucun effet SEO. Ne pas « corriger » ca sans
  // verifier le pont vers Nowork, qui depend du chemin exact.
  useEffect(() => {
    const canonicalPath = normalizePublicPath(window.location.pathname, publicBasePath)
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://noecalmes.fr${canonicalPath}`)

    let robots = document.querySelector('meta[name="robots"]')
    if (!robots) {
      robots = document.createElement('meta')
      robots.setAttribute('name', 'robots')
      document.head.appendChild(robots)
    }
    robots.setAttribute('content', 'noindex, nofollow')
  }, [description, publicBasePath, title])

  if (!routeIsComplete) {
    return (
      <main className="min-h-screen bg-[#fafafa] flex items-center justify-center px-6 text-center">
        <div>
          <p className="text-[16px] font-semibold text-[#111827] mb-2">{incompleteTitle}</p>
          <p className="text-[13px] text-[#6b7280]">{incompleteText}</p>
        </div>
      </main>
    )
  }

  return (
    <main className="fixed inset-0 z-[9999] bg-[#fafafa]">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#fafafa] text-[13px] font-medium text-[#6b7280]">
          {loadingText}
        </div>
      )}
      <iframe
        src={iframeSrc}
        title={title}
        className="block h-full w-full border-0"
        onLoad={() => setLoaded(true)}
        allow="clipboard-read; clipboard-write"
      />
    </main>
  )
}
