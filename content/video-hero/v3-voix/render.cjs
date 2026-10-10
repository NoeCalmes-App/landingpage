// node render.cjs film.html outDir cues.json fps sub shutter workerIndex workerCount [scale]
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const [html, outDir, cuesPath, fps, sub, shutter, wi, wc, scaleArg] = process.argv.slice(2);
  const F = +fps, SUB = +sub, SH = +shutter, W = +wi, WC = +wc, SCALE = scaleArg ? +scaleArg : 1;
  const cues = JSON.parse(fs.readFileSync(cuesPath, 'utf8'));
  fs.mkdirSync(outDir, { recursive: true });
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: SCALE });
  p.on('pageerror', (e) => console.log('pageerror', e.message));
  await p.addInitScript(`window.__CUES = ${JSON.stringify(cues)};`);
  await p.goto('file://' + html);
  await p.evaluate(() => window.__ready);
  const total = Math.round(cues.end * F);
  let done = 0; const t0 = Date.now();
  const F0 = process.env.F0 ? +process.env.F0 : 0, F1 = process.env.F1 ? +process.env.F1 : total;
  for (let f = W; f < total; f += WC) {
    if (f < F0 || f >= F1) continue;
    for (let j = 0; j < SUB; j++) {
      const t = (f + (j * SH) / SUB) / F;
      await p.evaluate((t) => window.__seek(t), t);
      const idx = String(f * SUB + j).padStart(6, '0');
      await p.screenshot({ path: `${outDir}/${idx}.jpg`, type: 'jpeg', quality: 95, clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    }
    done++;
    if (done % 60 === 0) console.log(`w${W}: ${done} frames, ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  await b.close();
  console.log(`w${W} finished ${done} frames in ${((Date.now() - t0) / 1000).toFixed(0)}s`);
})();
