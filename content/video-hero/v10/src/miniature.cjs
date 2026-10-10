// Miniature de la vidéo du hero (public/assets/videos/hero-v10-miniature.webp), choisie par Noé le 10/10/2026.
// Le fond blanc du film, pris à l'image de « En 2026, un vrai pari » (t = 3,76 s) sans les dés ni le texte,
// « Ton app va décoller. » centré en haut, et une courbe qui reste à plat puis monte jusqu'à un point violet.
// Tout tient dans les deux tiers du haut : sur ordinateur, le bas de l'écran coupe la vidéo à l'arrivée ; sur
// téléphone, la barre du lecteur couvre le dernier tiers. La phrase reste plus petite que le titre du hero.
//
// node miniature.cjs [sortie.png]   (polices dans node_modules à côté de film-v10.html, comme pour le film)
// puis : python3 miniature-webp.py sortie.png ../../../../public/assets/videos/hero-v10-miniature
const { chromium } = require('playwright');

const CSS = `
#cam > :not(#bg) { display: none !important; }
#mini { position: absolute; inset: 0; z-index: 100; font-family: 'PJS', sans-serif; font-weight: 800; color: #033475; }
#mini .tt { position: absolute; left: 0; top: 146px; width: 1920px; text-align: center; white-space: nowrap;
  font-size: 88px; letter-spacing: -0.045em; line-height: 1.08; }
#mini .grad { padding-right: 0.04em; }
#mini svg { position: absolute; left: 0; top: 0; overflow: visible; }
`;

const COURBE = 'M -80 676 C 380 676, 700 668, 940 624 C 1200 576, 1420 470, 1700 262';
const HTML = `
<svg width="1920" height="1080" viewBox="0 0 1920 1080">
  <defs>
    <filter id="flou" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="14"/></filter>
    <filter id="ombre" x="-100%" y="-100%" width="300%" height="300%"><feDropShadow dx="0" dy="8" stdDeviation="9" flood-color="#3b2fd0" flood-opacity="0.35"/></filter>
    <linearGradient id="trait" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1700" y2="0">
      <stop offset="0" stop-color="#cfcaff" stop-opacity="0"/><stop offset="0.18" stop-color="#c3bdff"/>
      <stop offset="0.6" stop-color="#8f88ff"/><stop offset="1" stop-color="#5a50f5"/></linearGradient>
    <linearGradient id="halo" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1700" y2="0">
      <stop offset="0.3" stop-color="#665dff" stop-opacity="0"/><stop offset="1" stop-color="#665dff" stop-opacity="0.45"/></linearGradient>
    <linearGradient id="aire" gradientUnits="userSpaceOnUse" x1="0" y1="240" x2="0" y2="1000">
      <stop offset="0" stop-color="#665dff" stop-opacity="0.17"/><stop offset="1" stop-color="#665dff" stop-opacity="0"/></linearGradient>
    <linearGradient id="aireX" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1700" y2="0">
      <stop offset="0.04" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#fff" stop-opacity="1"/>
      <stop offset="0.9" stop-color="#fff" stop-opacity="1"/><stop offset="1" stop-color="#fff" stop-opacity="0.25"/></linearGradient>
    <mask id="mAire"><rect x="-100" y="0" width="2200" height="1080" fill="url(#aireX)"/></mask>
  </defs>
  <path d="${COURBE} L 1700 1080 L -80 1080 Z" fill="url(#aire)" mask="url(#mAire)"/>
  <path d="${COURBE}" fill="none" stroke="url(#halo)" stroke-width="38" stroke-linecap="round" filter="url(#flou)"/>
  <path d="${COURBE}" fill="none" stroke="url(#trait)" stroke-width="14" stroke-linecap="round"/>
  <circle cx="1700" cy="262" r="69.3" fill="#665dff" fill-opacity="0.07"/>
  <circle cx="1700" cy="262" r="42" fill="#665dff" fill-opacity="0.13"/>
  <circle cx="1700" cy="262" r="18.9" fill="#665dff" stroke="#fffefc" stroke-width="7.35" filter="url(#ombre)"/>
</svg>
<div class="tt">Ton app va <span class="grad">décoller.</span></div>`;

(async () => {
  const out = process.argv[2] || 'miniature.png';
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto('file://' + __dirname + '/film-v10.html');
  await p.evaluate(() => window.__ready);
  await p.evaluate(() => window.__seek(3.76));   // le fond de « En 2026, un vrai pari »
  await p.addStyleTag({ content: CSS });
  await p.evaluate((html) => { const m = document.createElement('div'); m.id = 'mini'; m.innerHTML = html; document.getElementById('stage').appendChild(m); }, HTML);
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  await p.screenshot({ path: out, clip: { x: 0, y: 0, width: 1920, height: 1080 } });
  await b.close();
})();
