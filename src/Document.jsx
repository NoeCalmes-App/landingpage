function Document({ onBack }) {
  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#e5e5e5] px-5 py-4 flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#665dff] font-semibold text-sm hover:opacity-70 transition-opacity cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Retour
        </button>
        <span className="text-[#131313] font-semibold text-sm md:text-base truncate">
          Doc Explicatif — Flutter &amp; Firebase
        </span>
        <a
          href="/document.pdf"
          download
          className="ml-auto flex items-center gap-1.5 text-[#665dff] font-semibold text-sm hover:opacity-70 transition-opacity"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Télécharger
        </a>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 w-full">
        <iframe
          src="/document.pdf"
          title="Doc Explicatif Flutter et Firebase"
          className="w-full h-full min-h-[calc(100vh-65px)]"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  )
}

export default Document
