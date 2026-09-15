// FABRIQUE LES GUIDES CLIENTS « NOM DE DOMAINE » EN PDF.
//
//   node scripts/generer-guides.mjs
//
// ⚠️ POURQUOI PASSER PAR CHROME. Les anciens guides sortaient d'un outil de
// mise en page, sans source : illisibles depuis le dépôt, incorrigibles sans
// rouvrir l'outil. Chrome imprime du HTML en PDF avec les mêmes polices et le
// même rendu qu'à l'écran, et le HTML, lui, se relit et se compare en clair.
//
// ⚠️ LES POLICES SONT CELLES DES ANCIENS PDF : Plus Jakarta Sans pour les
// titres, Lato pour le texte. Un guide refait dans une autre typographie se
// lit comme un document étranger à côté des cinq autres de l'espace client.

import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { GUIDES } from './guides/contenu.mjs'

const ici = dirname(fileURLToPath(import.meta.url))
const racine = join(ici, '..')
const sortie = join(racine, 'public/assets/documents/guides')
const travail = join(ici, '.guides-build')

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const echapper = (s) => s

function liste(items, ordonnee = true) {
  const balise = ordonnee ? 'ol' : 'ul'
  return `<${balise}>${items.map(i => `<li>${echapper(i)}</li>`).join('')}</${balise}>`
}

function section(s) {
  let html = `<section class="bloc"><h2>${s.titre}</h2>`
  if (s.intro) html += `<p class="intro">${s.intro}</p>`
  if (s.liste) html += liste(s.liste)
  for (const sous of s.sousSections ?? []) {
    html += `<h3>${sous.titre}</h3>`
    if (sous.texte) html += `<p>${sous.texte}</p>`
    if (sous.liste) html += liste(sous.liste)
    if (sous.note) html += `<p class="note">${sous.note}</p>`
  }
  if (s.encadre) {
    html += `<div class="encadre"><p class="encadre-titre">${s.encadre.titre}</p><p>${s.encadre.texte}</p></div>`
  }
  return html + '</section>'
}

function page(guide) {
  return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
<style>
  @page { size: A4; margin: 17mm 16mm 15mm; }
  * { box-sizing: border-box; }
  body {
    margin: 0; font-family: 'Lato', system-ui, sans-serif;
    font-size: 10.5pt; line-height: 1.55; color: #1c2430;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  /* L'en-tête se répète sur chaque page : « position: fixed » est reproduit par
     l'imprimante de Chrome sur toutes les feuilles. C'est la seule façon
     d'avoir un bandeau courant sans passer par le protocole de débogage. */
  .bandeau {
    position: fixed; top: -11mm; left: 0; right: 0;
    text-align: right; font-size: 8pt; color: #8b93a1; letter-spacing: .01em;
  }
  h1 {
    font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800;
    font-size: 22pt; line-height: 1.15; color: #033475;
    text-align: center; margin: 1mm 0 5.5mm;
  }
  h2 {
    font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800;
    font-size: 13pt; color: #033475; margin: 5.5mm 0 1.8mm;
    break-after: avoid;
  }
  h3 {
    font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700;
    font-size: 11pt; color: #665dff; margin: 5mm 0 1.5mm;
    break-after: avoid;
  }
  p { margin: 0 0 2.5mm; }
  .intro { color: #4a5464; }
  ol, ul { margin: 0 0 3mm; padding-left: 5.5mm; }
  li { margin-bottom: 1.6mm; }
  li::marker { color: #665dff; font-weight: 700; }
  b { font-weight: 700; color: #0f1720; }
  /* ⚠️ « white-space: nowrap », ET C'EST UNE CORRECTION DE BOGUE RÉEL.
     Sans lui, « cn440614-ovh » se coupait en fin de ligne sur le trait
     d'union, et le trait DISPARAISSAIT à l'extraction du texte : un client
     qui copie collait « cn440614ovh », un identifiant qui n'existe pas. La
     procédure entière échouait sans que personne comprenne pourquoi. */
  .mono {
    font-family: 'Liberation Mono', 'SFMono-Regular', Menlo, monospace;
    font-size: 10pt; background: #f0eeff; color: #3b31c9;
    padding: .4mm 1.4mm; border-radius: 1mm; font-weight: 700;
    white-space: nowrap;
  }
  /* La mise en garde : discrète mais impossible à sauter. Barre à gauche
     plutôt que fond plein, qui ferait un pavé au milieu d'une liste. */
  .note {
    border-left: 2.2pt solid #ffb020; background: #fff8ec;
    padding: 2mm 3mm; margin: 0 0 3mm; font-size: 9.5pt; color: #6b4b12;
    break-inside: avoid;
  }
  .encadre {
    border: .8pt solid #ccd2ff; background: #f6f5ff;
    border-radius: 2.5mm; padding: 3.5mm 4mm; margin: 4mm 0 2mm;
    font-size: 9.8pt; color: #33405c; break-inside: avoid;
  }
  .encadre-titre {
    font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700;
    color: #033475; font-size: 10.2pt; margin-bottom: 1.5mm;
  }
  .bloc { break-inside: auto; }
  .fin {
    border-top: .8pt solid #e3e6ee; margin-top: 5mm; padding-top: 3.5mm;
    break-inside: avoid;
  }
  .fin h2 { margin-top: 0; }
  .attente {
    background: #eef6ff; border-radius: 2.5mm; padding: 3.5mm 4mm;
    font-size: 9.8pt; color: #12365f; margin-top: 1mm;
  }
</style></head>
<body>
  <div class="bandeau">Entreprise &middot; Temps estimé : ${guide.minutes} min</div>
  <h1>${guide.titre}</h1>

  <section class="bloc">
    <h2>Le nom de domaine, c’est quoi ?</h2>
    <p>${guide.quoi}</p>
  </section>

  <section class="bloc">
    <h2>Prérequis</h2>
    <p>${guide.prerequis}</p>
  </section>

  <section class="bloc">
    <h2>À retenir</h2>
    ${liste(guide.retenir, false)}
  </section>

  ${guide.sections.map(section).join('\n')}

  <section class="fin">
    <h2>${guide.fin.titre}</h2>
    ${liste(guide.fin.liste)}
    <p class="attente">${guide.fin.attente}</p>
  </section>
</body></html>`
}

if (!existsSync(CHROME)) {
  console.error(`Chrome introuvable : ${CHROME}`)
  process.exit(1)
}
mkdirSync(travail, { recursive: true })

for (const guide of GUIDES) {
  const html = join(travail, guide.fichier.replace(/\.pdf$/, '.html'))
  const pdf = join(sortie, guide.fichier)
  writeFileSync(html, page(guide), 'utf8')
  execFileSync(CHROME, [
    '--headless',
    '--disable-gpu',
    '--no-pdf-header-footer',
    // Les polices viennent de Google Fonts : sans ce délai, Chrome imprime
    // avant de les avoir chargées et sort le document en Times.
    '--virtual-time-budget=8000',
    `--print-to-pdf=${pdf}`,
    `file://${html}`,
  ], { stdio: 'ignore' })
  console.log(`✔ ${guide.fichier}`)
}
