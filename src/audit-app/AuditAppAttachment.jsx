// Composant d'attachement de documents pour le step idea_text.
//
// V3 : multi-fichier (3 max), OCR Tesseract pour PDFs scannes,
// messages compris par les non-tech.
//
// Roles :
//   - Bouton "Joindre un document" + file picker
//   - Formats : .pdf, .md, .markdown, .txt (rejet propre sinon)
//   - Extraction :
//       .pdf -> pdfjs (couche texte) + fallback Tesseract si scan
//       .md/.txt -> file.text()
//   - 3 fichiers max, 15 Mo par fichier, 8000 chars total a l'IA
//   - Progress message dynamique pendant l'extraction
//
// Lazy imports : pdfjs ET tesseract ne sont charges qu'a la 1ere utilisation
// effective (pas dans le bundle initial).

import { forwardRef, useImperativeHandle, useRef, useState } from 'react'

const MAX_FILES = 3
const MAX_FILE_BYTES = 15 * 1024 * 1024 // 15 Mo par fichier
// Total envoye a l'IA, tous fichiers confondus. Aligne sur la limite backend
// (150 000 chars dans attached_content via Zod). Marge de securite de 10 000
// pour le wrap des separateurs et le nom de chaque document.
const MAX_CHARS_TOTAL = 140000

// Couche texte : ~10 ms par page. On peut etre genereux.
const MAX_TEXT_PAGES = 100
// OCR Tesseract : 10-30 secondes par page. Limite stricte pour tenir
// la promesse "audit en 2 minutes" UX cote prospect.
const MAX_OCR_PAGES = 8

const ACCEPTED_EXTENSIONS = ['pdf', 'md', 'markdown', 'txt']
const EXTENSIONS_LABEL = 'pdf · md · txt'

const ACCEPTED_MIME = new Set([
  'application/pdf',
  'text/markdown',
  'text/x-markdown',
  'text/plain',
])

// forwardRef + useImperativeHandle : la trigger du file picker est expose
// au parent (TextareaStep) qui place le bouton paperclip a l'interieur du
// container du textarea, pattern ChatGPT/Claude.
const AuditAppAttachment = forwardRef(function AuditAppAttachment({ onChange }, ref) {
  const inputRef = useRef(null)
  // [{ id, name, size, status:'loading'|'loaded'|'error', text, error, progressMessage }]
  const [files, setFiles] = useState([])
  const [topError, setTopError] = useState('')

  const filesRef = useRef(files)
  filesRef.current = files

  // Map<fileId, AbortController> — permet de tuer l'extraction si le user
  // retire le fichier en plein OCR (cas critique : PDF scanne de 30 pages
  // qui prend 3 minutes a traiter, on doit pouvoir l'arreter instantanement).
  const abortMapRef = useRef(new Map())

  const updateFile = (id, patch) => {
    const next = filesRef.current.map((f) => (f.id === id ? { ...f, ...patch } : f))
    setFiles(next)
    return next
  }

  const recompute = (nextFiles) => {
    let concat = nextFiles
      .filter((f) => f.status === 'loaded' && f.text)
      .map((f) => `[Document : ${f.name}]\n${f.text}`)
      .join('\n\n---\n\n')

    if (concat.length > MAX_CHARS_TOTAL) {
      concat = concat.slice(0, MAX_CHARS_TOTAL)
    }
    onChange(concat)
  }

  const handlePick = () => {
    setTopError('')
    if (files.length >= MAX_FILES) {
      setTopError('Maximum 3 documents joints. Retirez l\'un d\'eux pour en ajouter un autre.')
      return
    }
    inputRef.current?.click()
  }

  const handleClearOne = (id) => {
    // Abort une extraction en cours si elle existe (libere CPU/memoire,
    // termine le worker Tesseract immediatement).
    const ac = abortMapRef.current.get(id)
    if (ac) {
      ac.abort()
      abortMapRef.current.delete(id)
    }

    const next = filesRef.current.filter((f) => f.id !== id)
    setFiles(next)
    recompute(next)
    if (inputRef.current) inputRef.current.value = ''
    setTopError('')
  }

  const handleFileChange = async (e) => {
    const picked = e.target.files
    if (!picked || picked.length === 0) return
    setTopError('')

    for (const file of Array.from(picked)) {
      if (filesRef.current.length >= MAX_FILES) {
        setTopError('Maximum 3 documents joints. Retirez l\'un d\'eux pour en ajouter un autre.')
        break
      }

      const ext = (file.name.split('.').pop() || '').toLowerCase()
      const isAcceptedExt = ACCEPTED_EXTENSIONS.includes(ext)
      const isAcceptedMime = ACCEPTED_MIME.has(file.type)

      if (!isAcceptedExt && !isAcceptedMime) {
        setTopError('Format non supporté. Acceptés : PDF, Markdown (.md), Texte (.txt).')
        continue
      }

      if (file.size > MAX_FILE_BYTES) {
        setTopError(
          `« ${file.name} » dépasse la taille autorisée (15 Mo maximum par fichier).`
        )
        continue
      }

      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
      const loadingEntry = {
        id,
        name: file.name,
        size: file.size,
        status: 'loading',
        text: '',
        error: '',
        progressMessage: 'Lecture du document…',
      }
      setFiles([...filesRef.current, loadingEntry])

      // Cree un AbortController dedie a ce fichier — permet l'annulation
      // si le prospect retire le fichier en plein OCR.
      const abortController = new AbortController()
      abortMapRef.current.set(id, abortController)

      try {
        const isPdf = ext === 'pdf' || file.type === 'application/pdf'
        let text = ''
        let totalPages = null
        let processedPages = null
        let method = null

        if (isPdf) {
          const result = await extractPdfText(
            file,
            (msg) => updateFile(id, { progressMessage: msg }),
            abortController.signal
          )
          text = result.text
          totalPages = result.totalPages
          processedPages = result.processedPages
          method = result.method
        } else {
          text = await file.text()
        }

        // Si entre-temps le user a annule, on sort en silence
        if (abortController.signal.aborted) {
          continue
        }

        text = sanitizeText(text)

        if (text.length === 0) {
          const errMsg = isPdf
            ? "Aucun texte n'a pu être lu dans ce PDF, même en reconnaissance optique. Essayez avec un autre fichier ou décrivez directement votre projet dans le champ."
            : "Document vide."
          const next = updateFile(id, { status: 'error', error: errMsg })
          recompute(next)
          continue
        }

        const next = updateFile(id, {
          status: 'loaded',
          text,
          progressMessage: '',
          totalPages,
          processedPages,
          method,
        })
        recompute(next)
      } catch (err) {
        // Si annulation explicite par le user : pas un vrai echec, silence
        if (abortController.signal.aborted || err?.name === 'AbortError') {
          continue
        }
        console.error('Extraction document echec', err)
        const next = updateFile(id, {
          status: 'error',
          error: "Lecture du document impossible. Essayez avec un autre fichier.",
        })
        recompute(next)
      } finally {
        abortMapRef.current.delete(id)
      }
    }

    if (inputRef.current) inputRef.current.value = ''
  }

  const totalLoaded = files
    .filter((f) => f.status === 'loaded' && f.text)
    .reduce((sum, f) => sum + f.text.length, 0)

  const canAddMore = files.length < MAX_FILES

  // Expose la trigger du file picker au parent — le bouton paperclip vit
  // dans le container du textarea (TextareaStep), pas ici.
  useImperativeHandle(ref, () => ({
    triggerPicker: handlePick,
  }), [files.length])

  // ============= Rendu : input cache + erreurs + liste de fichiers =============

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.md,.markdown,.txt,application/pdf,text/markdown,text/plain"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {topError && (
        <div className="mt-3 rounded-lg bg-red-bg/50 border border-red-text/20 px-3.5 py-2.5">
          <p className="text-red-text text-[0.85rem] font-semibold mb-0.5">
            {topError}
          </p>
          <p className="text-red-text/85 text-[0.78rem]">
            Formats acceptés : {EXTENSIONS_LABEL} · 15 Mo max · 3 fichiers maximum
          </p>
        </div>
      )}

      {/* Liste des fichiers */}
      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((f) => (
            <FileChip key={f.id} file={f} onRemove={() => handleClearOne(f.id)} />
          ))}
        </div>
      )}

      {totalLoaded > 0 && files.length > 1 && (
        <p className="mt-2 text-grey text-[0.78rem]">
          {totalLoaded > MAX_CHARS_TOTAL ? (
            <span className="text-brand">
              Documents volumineux. L'analyse se concentre sur les sections
              les plus importantes.
            </span>
          ) : (
            <>
              {totalLoaded.toLocaleString('fr-FR')} caractères au total, bien
              dans la zone analysable.
            </>
          )}
        </p>
      )}
    </>
  )
})

export default AuditAppAttachment

// =====================================================================
// FileChip
// =====================================================================

function FileChip({ file, onRemove }) {
  const isLoading = file.status === 'loading'
  const isLoaded = file.status === 'loaded'
  const isError = file.status === 'error'

  const containerCls = isError
    ? 'rounded-lg border border-red-text/25 bg-red-bg/30 px-3 py-2.5 md:px-4 md:py-3'
    : isLoaded
      ? 'rounded-lg border border-brand/25 bg-brand/[0.05] px-3 py-2.5 md:px-4 md:py-3'
      : 'rounded-lg border border-card-border bg-card/60 px-3 py-2.5 md:px-4 md:py-3'

  return (
    <div className={containerCls}>
      <div className="flex items-start gap-3">
        <span
          className={`shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg ${
            isError
              ? 'bg-red-text/15 text-red-text'
              : isLoaded
                ? 'bg-brand/15 text-brand'
                : 'bg-grey/15 text-grey'
          }`}
        >
          {isLoading ? (
            <span className="animate-spin inline-block w-4 h-4 rounded-full border-2 border-brand/30 border-t-brand" />
          ) : (
            <FileIcon />
          )}
        </span>

        <div className="flex-1 min-w-0">
          <p className="text-text font-semibold text-[0.88rem] truncate">
            {file.name}
          </p>
          <p className="text-grey text-[0.76rem] leading-tight mt-0.5">
            {formatBytes(file.size)}
            {isLoading && file.progressMessage && (
              <> · {file.progressMessage}</>
            )}
            {isLoaded && file.text && (
              <>
                {' · '}
                {file.text.length.toLocaleString('fr-FR')} caractères
              </>
            )}
          </p>
          {isError && file.error && (
            <p className="text-red-text text-[0.78rem] leading-snug mt-1">
              {file.error}
            </p>
          )}
          {isLoaded &&
            file.totalPages &&
            file.processedPages &&
            file.totalPages > file.processedPages && (
              <p className="text-brand/85 text-[0.78rem] leading-snug mt-1">
                {file.method === 'ocr'
                  ? `PDF scanné de ${file.totalPages} pages — j'ai analysé les ${file.processedPages} premières.`
                  : `Document de ${file.totalPages} pages — j'ai analysé les ${file.processedPages} premières.`}
              </p>
            )}
        </div>

        <button
          type="button"
          onClick={onRemove}
          aria-label="Retirer le document"
          className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full text-grey hover:text-red-text hover:bg-red-bg/40 transition-colors cursor-pointer"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  )
}

// =====================================================================
// Helpers — chargement pdfjs + tesseract
// =====================================================================

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} o`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`
}

function sanitizeText(text) {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/ /g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

let pdfjsCache = null
async function loadPdfjs() {
  if (pdfjsCache) return pdfjsCache
  const mod = await import('pdfjs-dist')
  if (!mod.GlobalWorkerOptions.workerSrc) {
    const workerUrl = new URL(
      'pdfjs-dist/build/pdf.worker.min.mjs',
      import.meta.url
    ).toString()
    mod.GlobalWorkerOptions.workerSrc = workerUrl
  }
  pdfjsCache = mod
  return mod
}

/**
 * Strategie d'extraction PDF :
 *   1. Tente la couche texte (rapide, ~10ms/page) — jusqu'a MAX_TEXT_PAGES
 *   2. Si texte vide ou < 50 chars cumules, bascule sur OCR Tesseract
 *      (lent, ~10-30s/page) — limite a MAX_OCR_PAGES pour tenir l'UX
 *
 * Retourne { text, totalPages, processedPages, method } pour permettre a
 * l'UI d'informer le prospect si le PDF a ete partiellement analyse.
 */
async function extractPdfText(file, onProgress, signal) {
  if (signal?.aborted) throwAbort()
  onProgress?.('Lecture du PDF…')
  const pdfjsLib = await loadPdfjs()

  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

  const totalPages = pdf.numPages

  // 1. Couche texte — limite a MAX_TEXT_PAGES (genereux)
  const textPageCount = Math.min(totalPages, MAX_TEXT_PAGES)
  let textLayer = ''
  let textProcessedPages = 0
  for (let i = 1; i <= textPageCount; i++) {
    if (signal?.aborted) throwAbort()
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    const pageText = content.items
      .map((item) => (typeof item.str === 'string' ? item.str : ''))
      .join(' ')
    textLayer += pageText + '\n\n'
    textProcessedPages = i
    if (textLayer.length > MAX_CHARS_TOTAL * 1.3) break
  }

  if (textLayer.trim().length >= 50) {
    return {
      text: textLayer,
      totalPages,
      processedPages: textProcessedPages,
      method: 'text',
    }
  }

  // 2. Fallback OCR — limite stricte + check abort entre chaque page
  const ocrResult = await ocrPdf(pdf, onProgress, signal)
  return {
    text: ocrResult.text,
    totalPages,
    processedPages: ocrResult.processedPages,
    method: 'ocr',
  }
}

function throwAbort() {
  const err = new Error('Extraction abandonnee par l\'utilisateur')
  err.name = 'AbortError'
  throw err
}

/**
 * OCR Tesseract sur les pages d'un PDF deja charge par pdfjs.
 * Lent : ~10-30s par page. Limite a MAX_OCR_PAGES (8) pour rester dans
 * la promesse UX "audit en 2 minutes" cote prospect.
 */
async function ocrPdf(pdf, onProgress, signal) {
  if (signal?.aborted) throwAbort()
  onProgress?.('Préparation de la reconnaissance optique…')

  const { createWorker } = await import('tesseract.js')

  const worker = await createWorker('fra', 1, {
    workerBlobURL: false,
  })

  // Si le signal abort est emis pendant l'OCR, on termine immediatement
  // le worker pour liberer CPU/memoire (sinon Tesseract continue silencieusement).
  const abortListener = () => {
    worker.terminate().catch(() => {
      /* worker deja termine, ignore */
    })
  }
  signal?.addEventListener('abort', abortListener)

  const totalPages = Math.min(pdf.numPages, MAX_OCR_PAGES)
  let fullText = ''
  let processedPages = 0

  try {
    for (let i = 1; i <= totalPages; i++) {
      if (signal?.aborted) throwAbort()
      onProgress?.(`Reconnaissance optique — page ${i}/${totalPages}…`)

      const page = await pdf.getPage(i)
      const viewport = page.getViewport({ scale: 2.0 })
      const canvas = document.createElement('canvas')
      canvas.width = viewport.width
      canvas.height = viewport.height
      const ctx = canvas.getContext('2d')
      await page.render({ canvasContext: ctx, viewport }).promise

      const result = await worker.recognize(canvas)
      const pageText = (result?.data?.text || '').trim()
      if (pageText) fullText += pageText + '\n\n'
      processedPages = i

      // Libere la memoire canvas
      canvas.width = 0
      canvas.height = 0

      if (fullText.length > MAX_CHARS_TOTAL * 1.3) break
    }
  } finally {
    signal?.removeEventListener('abort', abortListener)
    await worker.terminate().catch(() => {
      /* deja termine via abort listener */
    })
  }

  return { text: fullText, processedPages }
}

// =====================================================================
// Icons
// =====================================================================

function PaperclipIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  )
}

function FileIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}
