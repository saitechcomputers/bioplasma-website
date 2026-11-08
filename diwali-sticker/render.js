const { chromium } = require('playwright');
(async () => {
  const [,, html, out, size] = process.argv;
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: +size, height: +size }, deviceScaleFactor: 1 });
  await p.goto('file://' + html + '?s=' + size, { waitUntil: 'networkidle' });
  await p.evaluate(async () => { await document.fonts.ready; if (window.photoReady) await window.photoReady; });
  await p.screenshot({ path: out, omitBackground: true, clip: { x: 0, y: 0, width: +size, height: +size } });
  await b.close();
})();
