const CDP=require('/data/data/com.termux/files/home/projetos/browser-tests/node_modules/chrome-remote-interface');
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
(async()=>{
  const target=await CDP.New({port:9230}),client=await CDP({target,port:9230});
  await client.Page.enable();await client.Runtime.enable();await client.Network.enable();
  const failures=[];client.Network.responseReceived(e=>{if(e.response.status>=400)failures.push({status:e.response.status,url:e.response.url})});
  await client.Page.navigate({url:'http://127.0.0.1:8083/'});
  for(let i=0;i<30;i+=1){const r=await client.Runtime.evaluate({expression:`!!document.querySelector('[data-login]')`,returnByValue:true});if(r.result.value)break;await sleep(200)}
  const before=await client.Runtime.evaluate({expression:`({loaded:typeof window.L==='object'&&typeof window.RotaMotoMapTheme==='object',runtimeRequests:performance.getEntriesByType('resource').filter(x=>x.name.includes('rotamoto-map-runtime.js')).length})`,returnByValue:true});
  const loaded=await client.Runtime.evaluate({expression:`ensureMapRuntime().then(()=>({leaflet:typeof window.L,mapThemeApi:typeof window.RotaMotoMapTheme,loginPanelVisible:!!document.querySelector('[data-login]')?.getClientRects().length}))`,awaitPromise:true,returnByValue:true});
  const after=await client.Runtime.evaluate({expression:`performance.getEntriesByType('resource').filter(x=>x.name.includes('rotamoto-map-runtime.js')).length`,returnByValue:true});
  const result={before:before.result.value,afterRuntimeRequests:after.result.value,loaded:loaded.result.value,errors:failures};
  require('node:fs').writeFileSync(`${__dirname}/map-loader.json`,JSON.stringify(result,null,2));
  console.log(JSON.stringify(result,null,2));
  await client.close();await CDP.Close({id:target.id,port:9230});
})().catch(error=>{console.error(error);process.exit(1)});
