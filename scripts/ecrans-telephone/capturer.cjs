// Capture les quatre écrans de `ecrans.html` et les range en WebP dans
// `public/assets/images/ecrans/`, à 2x (786 × 1704) : le cadre de l'accueil
// les affiche à 330 px au plus, ils restent nets sur les écrans haute densité.
//
//   node scripts/ecrans-telephone/capturer.cjs
//
// Demande Playwright (`npm i -D playwright && npx playwright install chromium`
// la première fois) ; sharp est déjà là, c'est une dépendance de Vite.
const { chromium } = require('playwright')
const sharp = require('sharp')
const { join } = require('node:path')

const sortie = join(__dirname, '..', '..', 'public', 'assets', 'images', 'ecrans')

;(async () => {
  const navigateur = await chromium.launch()
  const page = await navigateur.newPage({ viewport: { width: 1000, height: 1000 }, deviceScaleFactor: 2 })
  await page.goto('file://' + join(__dirname, 'ecrans.html'), { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(600)
  for (const ecran of await page.locator('.ecran').all()) {
    const nom = await ecran.getAttribute('data-nom')
    const png = await ecran.screenshot()
    const info = await sharp(png).webp({ quality: 84 }).toFile(join(sortie, `${nom}.webp`))
    console.log(`${nom}.webp`, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)} Ko`)
  }
  await navigateur.close()
})().catch((e) => { console.error(e); process.exit(1) })
