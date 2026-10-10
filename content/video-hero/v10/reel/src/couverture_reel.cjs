// Couverture du Reel (1080x1920), dans le style de la miniature du site : le fond blanc du film,
// « Ton app va décoller. » et une courbe qui monte jusqu'à un point violet.
// Tout tient dans le 3:4 du milieu (y 240 à 1680), ce que montre la grille du profil Instagram.
// usage : node couverture_reel.cjs reel.html sortie.png
const { chromium } = require('playwright');

const CSS = `
#cam > :not(#bg) { display: none !important; }
#subs { display: none !important; }
#mini { position: absolute; inset: 0; z-index: 100; font-family: 'PJS', sans-serif; font-weight: 800; color: #033475; }
#mini .tt { position: absolute; left: 0; width: 1080px; text-align: center; white-space: nowrap; font-size: 152px; letter-spacing: -0.045em; line-height: 1.04; }
#mini .grad { padding-right: 0.04em; }
#mini svg { position: absolute; left: 0; top: 0; overflow: visible; }
`;
const C = 'M -80 1318 C 250 1318, 470 1306, 610 1252 C 760 1194, 860 1090, 930 930';
const HTML = `
<svg width="1080" height="1920" viewBox="0 0 1080 1920">
  <defs>
    <filter id="flou" x="-30%" y="-50%" width="160%" height="200%"><feGaussianBlur stdDeviation="14"/></filter>
    <filter id="ombre" x="-100%" y="-100%" width="300%" height="300%"><feDropShadow dx="0" dy="8" stdDeviation="9" flood-color="#3b2fd0" flood-opacity="0.35"/></filter>
    <linearGradient id="trait" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="930" y2="0">
      <stop offset="0" stop-color="#cfcaff" stop-opacity="0"/><stop offset="0.2" stop-color="#c3bdff"/>
      <stop offset="0.62" stop-color="#8f88ff"/><stop offset="1" stop-color="#5a50f5"/></linearGradient>
    <linearGradient id="halo" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="930" y2="0">
      <stop offset="0.3" stop-color="#665dff" stop-opacity="0"/><stop offset="1" stop-color="#665dff" stop-opacity="0.45"/></linearGradient>
    <linearGradient id="aire" gradientUnits="userSpaceOnUse" x1="0" y1="900" x2="0" y2="1640">
      <stop offset="0" stop-color="#665dff" stop-opacity="0.17"/><stop offset="1" stop-color="#665dff" stop-opacity="0"/></linearGradient>
    <linearGradient id="aireX" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="930" y2="0">
      <stop offset="0.04" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#fff" stop-opacity="1"/>
      <stop offset="0.9" stop-color="#fff" stop-opacity="1"/><stop offset="1" stop-color="#fff" stop-opacity="0.25"/></linearGradient>
    <mask id="mAire"><rect x="-100" y="0" width="1300" height="1920" fill="url(#aireX)"/></mask>
  </defs>
  <path d="${C} L 930 1700 L -80 1700 Z" fill="url(#aire)" mask="url(#mAire)"/>
  <path d="${C}" fill="none" stroke="url(#halo)" stroke-width="38" stroke-linecap="round" filter="url(#flou)"/>
  <path d="${C}" fill="none" stroke="url(#trait)" stroke-width="14" stroke-linecap="round"/>
  <circle cx="930" cy="930" r="69" fill="#665dff" fill-opacity="0.07"/>
  <circle cx="930" cy="930" r="42" fill="#665dff" fill-opacity="0.13"/>
  <circle cx="930" cy="930" r="19" fill="#665dff" stroke="#fffefc" stroke-width="7.4" filter="url(#ombre)"/>
</svg>
<div class="tt" style="top: 470px">Ton app va</div>
<div class="tt" style="top: 632px"><span class="grad">décoller.</span></div>`;

(async () => {
  const [html, out] = process.argv.slice(2);
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + require('path').resolve(html));
  await p.evaluate(() => window.__ready);
  await p.evaluate(() => window.__seek(3.76));
  await p.addStyleTag({ content: CSS });
  await p.evaluate((h) => { const m = document.createElement('div'); m.id = 'mini'; m.innerHTML = h; document.getElementById('stage').appendChild(m); }, HTML);
  await p.evaluate(async () => { await document.fonts.ready; return 1; });
  await p.waitForTimeout(300);
  await p.screenshot({ path: out, clip: { x: 0, y: 0, width: 1080, height: 1920 } });
  await b.close();
})();
