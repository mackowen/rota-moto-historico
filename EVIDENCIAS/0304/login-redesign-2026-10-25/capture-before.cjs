const CDP=require('/data/data/com.termux/files/home/projetos/browser-tests/node_modules/chrome-remote-interface');
const fs=require('node:fs');
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
(async()=>{
  const target=await CDP.New({port:9230}),client=await CDP({target,port:9230});
  await client.Page.enable();await client.Runtime.enable();
  const out=__dirname;
  for(const item of [{theme:'light',name:'mobile',w:390,h:844,mobile:true},{theme:'dark',name:'desktop',w:1440,h:900,mobile:false}]){
    await client.Emulation.setDeviceMetricsOverride({width:item.w,height:item.h,deviceScaleFactor:1,mobile:item.mobile});
    await client.Page.navigate({url:'http://127.0.0.1:8085/'});
    for(let i=0;i<30;i+=1){const ready=await client.Runtime.evaluate({expression:`!!document.querySelector('[data-login]')`,returnByValue:true});if(ready.result.value)break;await sleep(200)}
    await client.Runtime.evaluate({expression:`localStorage.setItem('rotamoto.appearance.boot',JSON.stringify({theme:'${item.theme}',accent:'#2563eb'}));document.documentElement.dataset.theme='${item.theme}';document.documentElement.dataset.resolvedTheme='${item.theme}';document.documentElement.style.colorScheme='${item.theme}'`});
    await sleep(200);
    const png=await client.Page.captureScreenshot({format:'png',captureBeyondViewport:false});
    fs.writeFileSync(`${out}/before-${item.theme}-${item.name}.png`,Buffer.from(png.data,'base64'));
  }
  await client.close();await CDP.Close({id:target.id,port:9230});
})().catch(error=>{console.error(error);process.exit(1)});
