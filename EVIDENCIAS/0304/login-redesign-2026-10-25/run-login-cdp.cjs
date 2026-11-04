const CDP = require('/data/data/com.termux/files/home/projetos/browser-tests/node_modules/chrome-remote-interface');
const fs = require('node:fs');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const out = __dirname;
(async () => {
  const target = await CDP.New({ port: 9230 });
  const client = await CDP({ target, port: 9230 });
  const { Page, Runtime, Network, Emulation } = client;
  const errors = [], responses = [], loginPosts = [];
  await Promise.all([Page.enable(), Runtime.enable(), Network.enable()]);
  await Network.setCacheDisabled({ cacheDisabled: true });
  await Network.setBypassServiceWorker({ bypass: true });
  Runtime.exceptionThrown(event => errors.push(event.exceptionDetails?.text || 'exception'));
  Network.responseReceived(event => { if (event.response.status >= 400) responses.push({ status: event.response.status, url: event.response.url }); });
  Network.requestWillBeSent(event => { if (event.request.url.endsWith('/identity/login') && event.request.method === 'POST') loginPosts.push(event.request.method); });
  await Page.navigate({ url: 'http://127.0.0.1:8083/' });
  let loginReady = false;
  for (let attempt = 0; attempt < 30 && !loginReady; attempt += 1) {
    const result = await Runtime.evaluate({ expression: `!!document.querySelector('[data-login]')`, returnByValue: true });
    loginReady = result.result.value === true;
    if (!loginReady) await sleep(200);
  }
  if (!loginReady) throw new Error('login UI did not become ready');
  const initial = await Runtime.evaluate({ expression: `({title:document.title,login:!!document.querySelector('[data-login]'),appHidden:document.querySelector('#app')?.hidden,mapScripts:[...document.scripts].filter(s=>s.src.includes('map-runtime')).length,stylesheet:document.querySelector('link[href*="identity-ui.css"]')?.href})`, returnByValue: true });
  const cases = [
    ['phone-320',320,720,true], ['phone-360',360,800,true], ['phone-390',390,844,true], ['phone-430',430,932,true],
    ['phone-landscape-720',720,320,true], ['phone-landscape-800',800,360,true], ['phone-landscape-844',844,390,true], ['phone-landscape-932',932,430,true],
    ['tablet-portrait',768,1024,true], ['tablet-portrait-820',820,1180,true], ['tablet-landscape',1024,768,true], ['pc-1280',1280,800,false], ['pc-1440',1440,900,false], ['pc-1920',1920,1080,false]
  ];
  const measurements = [];
  for (const theme of ['light','dark']) {
    await Runtime.evaluate({ expression: `localStorage.setItem('rotamoto.appearance.boot', JSON.stringify({theme:'${theme}',accent:'#2563eb'})); document.documentElement.dataset.theme='${theme}'; document.documentElement.dataset.resolvedTheme='${theme}'; document.documentElement.style.colorScheme='${theme}'` });
    for (const [name,width,height,mobile] of cases) {
      await Emulation.setDeviceMetricsOverride({ width, height, deviceScaleFactor: 1, mobile });
      await sleep(180);
      const evaluation = await Runtime.evaluate({ expression: `(()=>{const rect=s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return {x:+r.x.toFixed(2),y:+r.y.toFixed(2),width:+r.width.toFixed(2),height:+r.height.toFixed(2),visible:!!e.getClientRects().length}};const f=document.querySelector('[data-login]'),p=document.querySelector('.rm-identity-panel');return {viewport:{innerWidth,clientWidth:document.documentElement.clientWidth,visualWidth:visualViewport?.width,innerHeight},theme:document.documentElement.dataset.resolvedTheme,loginVisible:!!f?.getClientRects().length,presentation:rect('.rm-login-presentation'),mobileBrand:rect('.rm-login-mobile-brand'),form:rect('[data-login]'),content:rect('.rm-identity-content'),panel:rect('.rm-identity-panel'),panelScroll:{scrollHeight:p.scrollHeight,clientHeight:p.clientHeight,overflowY:getComputedStyle(p).overflowY},scroll:{doc:document.documentElement.scrollWidth,body:document.body.scrollWidth,client:document.documentElement.clientWidth,docHeight:document.documentElement.scrollHeight,clientHeight:document.documentElement.clientHeight},hasRememberMe:!!document.querySelector('[name="rememberMe"],[data-remember-me]'),heavyMapRuntimeRequested:performance.getEntriesByType('resource').some(x=>x.name.includes('rotamoto-map-runtime.js'))}})()`, returnByValue: true });
      const result = evaluation.result.value;
      measurements.push({ theme, name, ...result });
      const screenshot = await Page.captureScreenshot({ format: 'png', captureBeyondViewport: false });
      fs.writeFileSync(`${out}/${theme}-${name}.png`, Buffer.from(screenshot.data, 'base64'));
    }
  }
  await Emulation.setDeviceMetricsOverride({ width: 720, height: 320, deviceScaleFactor: 1, mobile: true });
  const landscapeScroll = await Runtime.evaluate({ expression: `(()=>{const panel=document.querySelector('.rm-identity-panel'),target=document.querySelector('[data-recovery] summary');panel.scrollTop=panel.scrollHeight;const r=target.getBoundingClientRect();return {scrollTop:panel.scrollTop,scrollHeight:panel.scrollHeight,clientHeight:panel.clientHeight,overflowY:getComputedStyle(panel).overflowY,recoveryVisible:r.top>=0&&r.bottom<=innerHeight,recoveryRect:{top:+r.top.toFixed(2),bottom:+r.bottom.toFixed(2)}}})()`, returnByValue: true });
  measurements.push({ theme: 'dark', name: 'landscape-scroll-end', ...landscapeScroll.result.value });
  await Emulation.setDeviceMetricsOverride({ width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await Runtime.evaluate({ expression: `document.querySelector('[data-login] [name="password"]').value='synthetic-only'; document.querySelector('[data-toggle-password]').click()` });
  const toggle = await Runtime.evaluate({ expression: `({type:document.querySelector('[data-login] [name="password"]').type,pressed:document.querySelector('[data-toggle-password]').getAttribute('aria-pressed'),label:document.querySelector('[data-toggle-password]').getAttribute('aria-label')})`, returnByValue: true });
  measurements.push({ theme: 'dark', name: 'password-toggle', ...toggle.result.value });
  await Runtime.evaluate({ expression: `document.querySelector('[data-login] [name="password"]').value=''; document.querySelector('[data-toggle-password]').click(); document.querySelector('[data-login]').requestSubmit()` });
  await sleep(100);
  const emptySubmit = await Runtime.evaluate({ expression: `({valid:document.querySelector('[data-login]').checkValidity(),loginError:document.querySelector('[data-login-error]').textContent,submitEnabled:!document.querySelector('[data-login] [type="submit"]').disabled})`, returnByValue: true });
  measurements.push({ theme: 'dark', name: 'empty-submit', ...emptySubmit.result.value, loginPosts: loginPosts.length });
  fs.writeFileSync(`${out}/measurements.json`, JSON.stringify({ initial: initial.result.value, measurements, exceptions: errors, httpErrors: responses, loginPosts }, null, 2));
  console.log(JSON.stringify({ initial: initial.result.value, measurementCount: measurements.length, exceptions: errors, httpErrors: responses, loginPosts, output: out }, null, 2));
  await client.close(); await CDP.Close({ id: target.id, port: 9230 });
})().catch(error => { console.error(error); process.exit(1); });
