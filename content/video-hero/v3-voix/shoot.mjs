import { chromium } from 'playwright';
import fs from 'fs';
const [,, html, outDir, timesArg, cuesArg] = process.argv;
const times = timesArg.split(',').map(Number);
fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--disable-web-security', '--allow-file-access-from-files'] }).catch(async () => chromium.launch());
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
page.on('console', m => { if (m.type() === 'error') console.log('console:', m.text()); });
page.on('pageerror', e => console.log('pageerror:', e.message));
if (cuesArg) await page.addInitScript(`window.__CUES = ${cuesArg};`);
await page.goto('file://' + html);
await page.evaluate(() => window.__ready);
const stage = await page.$('#stage');
for (const t of times) {
  await page.evaluate((t) => window.__seek(t), t);
  await stage.screenshot({ path: `${outDir}/t_${t.toFixed(2)}.png` });
}
await browser.close();
console.log('shot', times.length);
