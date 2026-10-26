const CDP = require('/data/data/com.termux/files/home/projetos/browser-tests/node_modules/chrome-remote-interface');
const fs = require('node:fs');
const out = __dirname;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const viewports = [
  ['phone-320',320,720,true],['phone-360',360,800,true],['phone-390',390,844,true],['phone-430',430,932,true],
  ['landscape-720',720,320,true],['landscape-800',800,360,true],['landscape-844',844,390,true],['landscape-932',932,430,true],
  ['tablet-768',768,1024,true],['tablet-1024',1024,768,true],
  ['pc-1280',1280,800,false],['pc-1440',1440,900,false],['pc-1920',1920,1080,false]
];
const markup = `<div class="modal-back" role="presentation"><div class="modal modal-presence-qr" role="dialog" aria-modal="true" aria-labelledby="fixture-title" tabindex="-1"><section class="presence-qr-dialog" data-presence-qr-dialog><header class="presence-qr-header"><span class="eyebrow">Presença no restaurante</span><h2 id="fixture-title">QR de check-in</h2><p>Peça ao motoboy para escanear o código no aplicativo RotaMoto.</p></header><div class="presence-qr-code"><canvas id="presenceQrCanvas" aria-label="QR assinado de check-in"></canvas></div><div class="presence-qr-validity" role="group" aria-label="Validade do QR"><p class="presence-qr-duration"><span class="presence-qr-clock" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></span><span class="presence-qr-duration-copy"><b>Válido por 60 segundos</b><small>Uso único · Sem dados pessoais</small></span></p><div class="presence-qr-expiry"><span>Expira em</span><time datetime="2026-10-25T19:02:00.000Z">19:02</time></div></div><div class="actions presence-qr-actions"><button class="btn primary">Gerar novo QR</button><button class="btn">Fechar</button></div></section></div>`;
(async () => {
  const target = await CDP.New({port:9230});
  const client = await CDP({target,port:9230});
  const {Page,Runtime,Network,Emulation}=client;
  const exceptions=[],httpErrors=[],measurements=[];
  await Promise.all([Page.enable(),Runtime.enable(),Network.enable()]);
  await Network.setCacheDisabled({cacheDisabled:true});
  await Network.setBypassServiceWorker({bypass:true});
  Runtime.exceptionThrown(event=>exceptions.push(event.exceptionDetails?.text||'exception'));
  Network.responseReceived(event=>{if(event.response.status>=400)httpErrors.push({status:event.response.status,path:new URL(event.response.url).pathname})});
  await Page.navigate({url:'http://127.0.0.1:8083/'});
  for(let i=0;i<40;i++){
    const ready=await Runtime.evaluate({expression:`!!document.querySelector('[data-login]')&&!!document.querySelector('link[href*="presence-qr.css?v=0304.1"]')`,returnByValue:true});
    if(ready.result.value)break;
    if(i===39)throw new Error('current login page or QR stylesheet did not load');
    await sleep(150);
  }
  for(const theme of ['light','dark']){
    await Runtime.evaluate({expression:`localStorage.setItem('rotamoto.appearance.boot',JSON.stringify({theme:'${theme}',accent:'#2563eb'}))`});
    await Page.reload({ignoreCache:true});
    for(let attempt=0;attempt<40;attempt++){
      const ready=await Runtime.evaluate({expression:`!!document.body&&!!document.querySelector('[data-login]')&&!!document.querySelector('link[href*="presence-qr.css?v=0304.1"]')`,returnByValue:true});
      if(ready.result.value)break;
      if(attempt===39)throw new Error(`login fixture did not reload for ${theme}`);
      await sleep(100);
    }
    for(const[name,width,height,mobile]of viewports){console.log('fixture viewport',name,width,height,Math.max(220,Math.min(width<=640?244:width<=1024?280:300,width-100)));
    await Emulation.setDeviceMetricsOverride({width,height,deviceScaleFactor:1,mobile});
    for(let attempt=0;attempt<20;attempt++){
      const applied=await Runtime.evaluate({expression:`window.innerWidth===${width}&&window.innerHeight===${height}`,returnByValue:true});
      if(applied.result.value)break;
      if(attempt===19)throw new Error(`viewport ${name} did not settle: ${JSON.stringify((await Runtime.evaluate({expression:'({width:innerWidth,height:innerHeight})',returnByValue:true})).result.value)}`);
      await sleep(50);
    }
    await Runtime.evaluate({expression:'new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))',awaitPromise:true});
    await Runtime.evaluate({expression:`(()=>{document.documentElement.dataset.theme='${theme}';document.documentElement.dataset.resolvedTheme='${theme}';document.documentElement.style.colorScheme='${theme}';document.querySelector('#rmIdentityRoot')?.style.setProperty('display','none','important');document.querySelector('.modal-back')?.remove();document.body.insertAdjacentHTML('beforeend',${JSON.stringify(markup)});const d=document.querySelector('.modal-presence-qr'),c=document.querySelector('#presenceQrCanvas');const cap=${Math.max(220,Math.min(width<=640?244:width<=1024?280:300,width-100))};d.dataset.fixtureCap=String(cap);d.style.setProperty('--presence-qr-size',cap+'px');c.width=cap;c.height=cap;c.getContext('2d').fillStyle='#fff';c.getContext('2d').fillRect(0,0,cap,cap)})()`});
    await sleep(80);
    const sample=await Runtime.evaluate({expression:`(()=>{const rect=e=>{const r=e.getBoundingClientRect();return{x:+r.x.toFixed(2),y:+r.y.toFixed(2),width:+r.width.toFixed(2),height:+r.height.toFixed(2),right:+r.right.toFixed(2),bottom:+r.bottom.toFixed(2)}};const m=document.querySelector('.modal-presence-qr'),canvas=m.querySelector('canvas'),code=m.querySelector('.presence-qr-code'),validity=m.querySelector('.presence-qr-validity'),expiry=m.querySelector('.presence-qr-expiry'),actions=m.querySelector('.presence-qr-actions');return{theme:'${theme}',resolvedTheme:document.documentElement.dataset.resolvedTheme,surface:getComputedStyle(document.documentElement).getPropertyValue('--surface').trim(),bodyBackground:getComputedStyle(document.body).backgroundColor,dialogBackground:getComputedStyle(m).backgroundColor,name:'${name}',viewport:{innerWidth,clientWidth:document.documentElement.clientWidth,visualWidth:visualViewport?.width,innerHeight},requestedQrSize:m.style.getPropertyValue('--presence-qr-size'),fixtureCap:m.dataset.fixtureCap,computedQrSize:getComputedStyle(m).getPropertyValue('--presence-qr-size').trim(),canvasStyle:getComputedStyle(canvas).width,modal:rect(m),qrBox:rect(code),canvas:rect(canvas),validity:rect(validity),expiry:rect(expiry),actions:rect(actions),buttons:[...actions.querySelectorAll('button')].map(rect),modalOverflow:{scrollWidth:m.scrollWidth,clientWidth:m.clientWidth,scrollHeight:m.scrollHeight,clientHeight:m.clientHeight,overflowY:getComputedStyle(m).overflowY},pageOverflow:{scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth},square:Math.abs(canvas.getBoundingClientRect().width-canvas.getBoundingClientRect().height)<1,heading:m.getAttribute('aria-labelledby'),buttonOrder:[...actions.querySelectorAll('button')].map(x=>x.textContent.trim())}})()`,returnByValue:true});
    if(!sample.result.value)throw new Error(`missing geometry for ${theme}/${name}: ${JSON.stringify(sample.exceptionDetails||sample.result)}`);
    measurements.push(sample.result.value);
    const shot=await Page.captureScreenshot({format:'png',captureBeyondViewport:false});
    fs.writeFileSync(`${out}/${theme}-${name}.png`,Buffer.from(shot.data,'base64'));
    }
  }
  const geometry={fixture:'blank QR canvas for layout only; no encoded token or live QR payload',measurements,exceptions,httpErrors};
  fs.writeFileSync(`${out}/geometry.json`,JSON.stringify(geometry,null,2));
  console.log(JSON.stringify({measurements:measurements.length,exceptions,httpErrors,allSquare:measurements.every(x=>x.square),allNoHorizontalOverflow:measurements.every(x=>x.pageOverflow.scrollWidth<=x.pageOverflow.clientWidth&&x.modalOverflow.scrollWidth<=x.modalOverflow.clientWidth),output:out},null,2));
  await client.close();await CDP.Close({id:target.id,port:9230});
})().catch(error=>{console.error(error);process.exit(1)});
