// usage: node render-greeting.js poster out.png   |   node render-greeting.js video framesDir
const { chromium } = require('playwright');
(async () => {
  const [,, mode, out] = process.argv;
  const h = mode === 'poster' ? 1350 : 1920;
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: h }, deviceScaleFactor: 1 });
  await p.goto('file://' + __dirname + '/greeting.html?h=' + h, { waitUntil: 'networkidle' });
  await p.evaluate(() => window.ready);
  const stage = await p.$('#stage');
  if (mode === 'poster') {
    await p.evaluate(() => setT(10)); await stage.screenshot({ path: out });
  } else {
    const fps = 30, n = 10 * fps;
    for (let i = 0; i < n; i++) {
      await p.evaluate(t => setT(t), i / fps);
      await stage.screenshot({ path: `${out}/f${String(i).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 92 });
    }
  }
  await b.close();
})();
