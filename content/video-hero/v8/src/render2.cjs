// node render2.cjs film.html outDir endSeconds fps sub shutter workerIndex workerCount
// env FAST="a-b,c-d" (seconds) FASTSUB=32 : more sub-frames where the motion is fast.
// Writes outDir/FFFFF_JJ.jpg (frame, sub-frame).
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const [html, outDir, endS, fps, sub, shutter, wi, wc] = process.argv.slice(2);
  const F = +fps, SUB = +sub, SH = +shutter, W = +wi, WC = +wc;
  const FASTSUB = +(process.env.FASTSUB || SUB);
  const FAST = (process.env.FAST || '').split(',').filter(Boolean).map((r) => r.split('-').map(Number));
  const subsFor = (f) => (FAST.some(([a, b]) => f / F >= a - 1 / F && f / F <= b) ? FASTSUB : SUB);
  fs.mkdirSync(outDir, { recursive: true });
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  p.on('pageerror', (e) => console.log('pageerror', e.message));
  await p.goto('file://' + html);
  await p.evaluate(() => window.__ready);
  const total = Math.round(+endS * F);
  const F0 = process.env.F0 ? +process.env.F0 : 0, F1 = process.env.F1 ? +process.env.F1 : total;
  let done = 0; const t0 = Date.now();
  for (let f = W; f < total; f += WC) {
    if (f < F0 || f >= F1) continue;
    const n = subsFor(f);
    for (let j = 0; j < n; j++) {
      const t = (f + (j * SH) / n) / F;
      await p.evaluate((t) => window.__seek(t), t);
      await p.screenshot({ path: `${outDir}/${String(f).padStart(5, '0')}_${String(j).padStart(2, '0')}.jpg`, type: 'jpeg', quality: 94, clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    }
    done++;
    if (done % 60 === 0) console.log(`w${W}: ${done} frames, ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  await b.close();
  console.log(`w${W} finished ${done} frames in ${((Date.now() - t0) / 1000).toFixed(0)}s`);
})();
