const CDP = require('/data/data/com.termux/files/home/projetos/browser-tests/node_modules/chrome-remote-interface');
const fs = require('node:fs');
const path = require('node:path');
const out = __dirname;
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const oldBreakpoint = `@media (max-width:980px){#rmIdentityRoot[data-gated="true"] .rm-identity-panel{grid-template-columns:minmax(0,1fr)!important;grid-template-rows:auto minmax(0,1fr)!important;gap:18px!important}#rmIdentityRoot[data-gated="true"] .rm-login-presentation{min-height:0!important;gap:15px!important;padding:22px 28px!important;border-radius:18px!important;box-shadow:none!important}#rmIdentityRoot[data-gated="true"] .rm-login-brand img{width:38px!important;height:38px!important}#rmIdentityRoot[data-gated="true"] .rm-login-brand{font-size:1.2rem!important}#rmIdentityRoot[data-gated="true"] .rm-login-intro h1{max-width:28ch!important;font-size:clamp(1.55rem,3.5vw,2.15rem)!important}#rmIdentityRoot[data-gated="true"] .rm-login-benefits{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:10px!important}#rmIdentityRoot[data-gated="true"] .rm-identity-content{width:min(100%,520px)!important;max-height:none!important}}`;
(async () => {
  const target = await CDP.New({ port: 9230 });
  const client = await CDP({ target, port: 9230 });
  const { Page, Runtime, Emulation, Network } = client;
  await Promise.all([Page.enable(), Runtime.enable(), Network.enable()]);
  await Network.setCacheDisabled({ cacheDisabled: true });
  await Network.setBypassServiceWorker({ bypass: true });
  await Page.navigate({ url: 'http://127.0.0.1:8083/' });
  for (let i = 0; i < 40; i += 1) {
    const ready = await Runtime.evaluate({ expression: `!!document.querySelector('[data-login]')`, returnByValue: true });
    if (ready.result.value) break;
    if (i === 39) throw new Error('Unauthenticated login fixture unavailable');
    await wait(100);
  }
  await Runtime.evaluate({ expression: `localStorage.setItem('rotamoto.appearance.boot',JSON.stringify({theme:'dark',accent:'#2563eb'}));document.documentElement.dataset.theme='dark';document.documentElement.dataset.resolvedTheme='dark';document.documentElement.style.colorScheme='dark'` });
  await Emulation.setDeviceMetricsOverride({ width: 980, height: 720, deviceScaleFactor: 1, mobile: true });
  await wait(300);
  await Runtime.evaluate({ expression: `(()=>{const style=document.createElement('style');style.id='old-breakpoint-reproduction';style.textContent=${JSON.stringify(oldBreakpoint)};document.head.appendChild(style)})()` });
  await wait(100);
  const measure = async label => {
    const result = await Runtime.evaluate({ expression: `(()=>{const r=s=>{const e=document.querySelector(s),b=e.getBoundingClientRect();return{x:+b.x.toFixed(2),y:+b.y.toFixed(2),width:+b.width.toFixed(2),height:+b.height.toFixed(2),right:+b.right.toFixed(2),bottom:+b.bottom.toFixed(2)}};const p=document.querySelector('.rm-identity-panel'),a=r('.rm-login-presentation'),f=r('[data-login]'),c=r('.rm-identity-content');return{label:'${label}',viewport:{innerWidth,clientWidth:document.documentElement.clientWidth,visualWidth:visualViewport?.width,innerHeight,devicePixelRatio},presentation:a,form:f,content:c,layout:f.x>=a.right-1&&a.y<f.bottom&&f.y<a.bottom?'two-column':'stacked',gap:f.x>=a.right-1?+(f.x-a.right).toFixed(2):null,scroll:{width:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth,panelHeight:p.scrollHeight,panelClientHeight:p.clientHeight,formScrollHeight:document.querySelector('.rm-identity-content').scrollHeight,formClientHeight:document.querySelector('.rm-identity-content').clientHeight,formOverflow:getComputedStyle(document.querySelector('.rm-identity-content')).overflowY}}})()`, returnByValue: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || 'measurement failed');
    return result.result.value;
  };
  const before = await measure('old 980px stack breakpoint reproduced');
  const beforePng = await Page.captureScreenshot({ format: 'png', captureBeyondViewport: false });
  fs.writeFileSync(path.join(out, 'dark-980-before-breakpoint-reproduction.png'), Buffer.from(beforePng.data, 'base64'));
  await Runtime.evaluate({ expression: `document.querySelector('[data-login]')?.closest('.rm-identity-panel')?.style.removeProperty('grid-template-columns')` });
  await Runtime.evaluate({ expression: `document.querySelector('#old-breakpoint-reproduction')?.remove()` });
  await wait(150);
  const after = await measure('effective 860px two-column breakpoint');
  const afterPng = await Page.captureScreenshot({ format: 'png', captureBeyondViewport: false });
  fs.writeFileSync(path.join(out, 'dark-980-after.png'), Buffer.from(afterPng.data, 'base64'));
  fs.writeFileSync(path.join(out, 'desktop-mode-comparison.json'), JSON.stringify({ method: 'before is a controlled reproduction of the previous max-width:980px stacking rule, not an owner-provided screenshot; after is the current CSS served on 127.0.0.1:8083', before, after }, null, 2));
  console.log(JSON.stringify({ before, after }, null, 2));
  await client.close();
  await CDP.Close({ id: target.id, port: 9230 });
})().catch(error => { console.error(error); process.exit(1); });
