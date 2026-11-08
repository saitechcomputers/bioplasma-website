// usage: node render-greeting.js poster out.png | node render-greeting.js video framesDir [seconds] [tl=photo,title,m1,m2,en,brand]
const { chromium } = require('playwright');
(async () => {
  const [,, mode, out, secs, tl] = process.argv;
  const h = mode === 'poster' ? 1350 : 1920;
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: h }, deviceScaleFactor: 1 });
  await p.goto('file://' + __dirname + '/greeting.html?h=' + h + (tl ? '&tl=' + tl : ''), { waitUntil: 'networkidle' });
  await p.evaluate(() => window.ready);
  const stage = await p.$('#stage');
  if (mode === 'poster') {
    await p.evaluate(() => setT(10)); await stage.screenshot({ path: out });
  } else {
    const fps = 30, n = Math.round((+secs || 10) * fps);
    for (let i = 0; i < n; i++) {
      await p.evaluate(t => setT(t), i / fps);
      await stage.screenshot({ path: `${out}/f${String(i).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 92 });
    }
  }
  await b.close();
})();
