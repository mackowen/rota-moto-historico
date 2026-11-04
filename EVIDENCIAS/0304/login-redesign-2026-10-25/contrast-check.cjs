const CDP = require('/data/data/com.termux/files/home/projetos/browser-tests/node_modules/chrome-remote-interface');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
(async () => {
  const target = await CDP.New({ port: 9230 });
  const client = await CDP({ target, port: 9230 });
  await client.Page.enable(); await client.Runtime.enable();
  await client.Page.navigate({ url: 'http://127.0.0.1:8083/' });
  for (let i=0;i<30;i+=1) { const r=await client.Runtime.evaluate({expression:`!!document.querySelector('[data-login]')`,returnByValue:true}); if(r.result.value) break; await sleep(200); }
  const results=[];
  for(const theme of ['light','dark']){
    await client.Runtime.evaluate({expression:`document.documentElement.dataset.resolvedTheme='${theme}';document.documentElement.dataset.theme='${theme}';document.documentElement.style.colorScheme='${theme}'`});
    const r=await client.Runtime.evaluate({expression:`JSON.stringify({theme:'${theme}',heading:{fg:getComputedStyle(document.querySelector('.rm-login-form-heading h2')).color,bg:getComputedStyle(document.querySelector('[data-login]')).backgroundColor},label:{fg:getComputedStyle(document.querySelector('[data-login] label')).color,bg:getComputedStyle(document.querySelector('[data-login]')).backgroundColor},helper:{fg:getComputedStyle(document.querySelector('#companyHelp')).color,bg:getComputedStyle(document.querySelector('[data-login]')).backgroundColor},privacy:{fg:getComputedStyle(document.querySelector('.rm-privacy')).color,bg:getComputedStyle(document.querySelector('.rm-identity-panel')).backgroundColor},button:{fg:getComputedStyle(document.querySelector('.rm-login-submit')).color,bg:getComputedStyle(document.querySelector('.rm-login-submit')).backgroundColor},icon:{fg:getComputedStyle(document.querySelector('.rm-login-input-wrap > svg')).stroke,bg:getComputedStyle(document.querySelector('.rm-login-input-wrap > input')).backgroundColor},link:{fg:getComputedStyle(document.querySelector('[data-recovery] summary')).color,bg:getComputedStyle(document.body).backgroundColor},eyebrow:{fg:getComputedStyle(document.querySelector('.rm-login-eyebrow')).color,bg:getComputedStyle(document.querySelector('.rm-login-presentation')).backgroundColor},benefitIcon:{fg:getComputedStyle(document.querySelector('.rm-login-benefit-icon')).color,bg:getComputedStyle(document.querySelector('.rm-login-benefit-icon')).backgroundColor}})`,returnByValue:true});
    results.push(JSON.parse(r.result.value));
  }
  const channels=s=>{const m=s.match(/[0-9.]+/g)||[];return m.slice(0,3).map(Number)};
  const luminance=s=>channels(s).map(value=>{const c=value/255;return c<=.04045?c/12.92:((c+.055)/1.055)**2.4}).reduce((sum,value,index)=>sum+value*[.2126,.7152,.0722][index],0);
  const ratio=(a,b)=>{const x=luminance(a),y=luminance(b);return +((Math.max(x,y)+.05)/(Math.min(x,y)+.05)).toFixed(2)};
  for(const item of results) {
    item.eyebrow.bg=item.theme==='light'?'rgb(238,243,253)':'rgb(38,56,79)';
    for(const key of ['heading','label','helper','privacy','button','icon','link','eyebrow','benefitIcon']) item[key].ratio=ratio(item[key].fg,item[key].bg);
  }
  console.log(JSON.stringify(results,null,2));
  await client.close(); await CDP.Close({id:target.id,port:9230});
})().catch(e=>{console.error(e);process.exit(1)});
