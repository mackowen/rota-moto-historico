'use strict';
const root=require('fs').readFileSync('/data/data/com.termux/files/home/rotamoto-data/maintenance/active-0304-m','utf8');
const fs=require('fs'),path=require('path'),CDP=require('/data/data/com.termux/files/home/projetos/browser-tests/node_modules/chrome-remote-interface');
const vm=require('vm');const prefix=fs.readFileSync(path.join(root,'fixture-prefix.cjs'),'utf8');
let pageHtml;const ctx={require,console};vm.createContext(ctx);vm.runInContext(prefix+';globalThis.generatedHtml=pageHtml;',ctx);pageHtml=ctx.generatedHtml;
const phase=process.argv[2]||'before';const out=path.join(root,phase);fs.mkdirSync(out,{recursive:true});
const setup=()=>{
 const shell=document.querySelector('.sidebar').outerHTML,header=document.querySelector('.topbar').outerHTML,bottom=document.querySelector('.bottom-nav').outerHTML;
 const modeCost={allocations:4,completed:3,estimatedCount:4,estimatedCoverage:1,realizedCount:3,realizedCoverage:1,estimatedByCurrency:[{currency:'BRL',amountMinor:4000,averageAmountMinor:1000}],realizedByCurrency:[{currency:'BRL',amountMinor:3000,averageAmountMinor:1000}]};
 window.fetch=async url=>{
  if(window.testMode==='loading')return new Promise(()=>{});
  if(['error','offline'].includes(window.testMode))return{ok:false,json:async()=>({error:{code:window.testMode==='offline'?'NETWORK_UNAVAILABLE':'LOGISTICS_REQUEST_FAILED'}})};
  const empty=window.testMode==='empty';let body={};
  if(url.includes('/analytics/territorial'))body={cells:empty?[]:[{latitude:-23.5,longitude:-46.6,intensity:2,countBand:'5–9',completed:6,cancelled:1,failed:0}],totalEligible:empty?0:14,withLocation:empty?0:7,withoutLocation:empty?0:7,minimumSample:5,coverage:empty?null:.5,unknownPrecision:0,lowPrecision:0,excessiveImprecision:0,suppressedCells:0,maximumMapAccuracyM:100,metric:'volume'};
  else if(url.includes('/decision-quality'))body={metrics:{outcomes:{total:4,succeeded:3,failed:1}},decisions:[]};
  else if(url.includes('/intelligence/analytics'))body={ownFleet:modeCost,external:modeCost,capacity:{activeDrivers:2,assignedDeliveries:4,inProgressDeliveries:2,availability:'available',capacityStatus:'known',remainingSlots:6},driverPayout:{deliveriesWithEarning:3,totalEligibleDeliveries:3,coverage:1,byCurrency:[{currency:'BRL',amountMinor:3000}],note:'Amostra de valores registrados.'},routeCoverage:{evaluated:4,originKnown:4,fullRouteCalculated:4,coverage:1},comparisonNote:'Amostra visual de custos por modalidade.'};
  else if(url.includes('/route-settings'))body={settings:{originMode:'establishment',returnToOrigin:true}};
  else body={providers:empty?[]:[{displayName:'Frota de teste',class:'internal_fleet',allocations:14,completed:6,estimatedCosts:[{currency:'BRL',amountMinor:4000}],reconciledCosts:[],estimatedCostCount:4,reconciledCostCount:0}],integrations:empty?[]:[{code:'iFood de teste',quotesReceived:4,quoteRequests:4,dispatchConfirmed:3,dispatchRequested:4,dispatchFailed:1}]};
  return{ok:true,json:async()=>body};
 };
 const baseFilters={period:'26',fromDate:'2026-10-01',toDate:'2026-10-26',bike:'',status:'',type:'',source:'',mainView:'executive',executiveCategory:'overview',operationalSection:'report-overview-details'};
 const bikes=[{id:'b1',name:'Motoboy de teste com nome comprido para conferência'},{id:'b2',name:'Entregadora de teste'}];
 const orders=Array.from({length:14},(_,i)=>({id:'o'+i,deliveryId:'d'+i,createdAt:`2026-10-${String(i+1).padStart(2,'0')}T13:00:00Z`,status:'FINALIZADA',type:'NORMAL',sourceId:i%2?'ifood':'manual',bikeId:'b1',bike:bikes[0].name,customer:'Cliente de teste '+i,address:'Rua de teste com identificação extensa número '+i,money:{completeness:'complete',currency:'BRL',provenance:{kind:'manual'},components:{itemsSubtotalMinor:12345600,discountMinor:100,deliveryFeeMinor:500,serviceFeeMinor:0,otherFeeMinor:0,totalMinor:12346000}}}));
 const deliveries=orders.map((o,i)=>({id:'d'+i,orderId:o.id,driverId:'b1',status:i%4===0?'OUT_FOR_DELIVERY':i%4===1?'CANCELLED':'DELIVERED',assignedAt:'2026-10-14T12:00:00Z',completedAt:'2026-10-14T13:00:00Z',estimatedDistanceM:4000,actualDistanceM:4200}));
 window.paint=(mode='data',area='executive',section='report-overview-details',category='overview')=>{
  window.testMode=mode;state.report={...baseFilters,...state.report,mainView:area,operationalSection:section,executiveCategory:category};
  const useOrders=mode==='empty'?[]:orders;
  const report=RotaMotoAnalytics.aggregate({orders:useOrders,deliveries:mode==='empty'?[]:deliveries,bikes,financialEvents:mode==='data'?[]:undefined},{...state.report,driver:state.report.bike,now:Date.parse('2026-10-26T15:00:00Z'),timeZone:'America/Sao_Paulo'});
  const render=RotaMotoAnalyticsView.render({report,filters:state.report,statusLabel:x=>({DELIVERED:'Concluída',CANCELLED:'Cancelada',OUT_FOR_DELIVERY:'Em andamento'})[x]||'Outro',typeLabel:()=> 'Entrega',sources:{manual:'Manual',ifood:'iFood'},bikes,types:['NORMAL'],freshNote:'Amostra visual sintética. Sem autenticação.',financialState:mode==='error'?'FINANCE_READ_FAILED':mode==='loading'?'loading':mode==='offline'?'offline':'unverified',emptyState:(title,description,_icon,variant)=>`<div class="empty emptyState--${variant}" role="status"><strong>${title}</strong><span>${description}</span></div>`});
  document.querySelector('#app').innerHTML='<div class="shell">'+shell+'<main class="main" id="main">'+header+render+'</main></div>'+bottom;
  bindReportNavigation();
  window.RotaMotoLogisticsUI.bind({state});
  document.querySelectorAll('#rb,#rs,#rt,#ro,#rfrom,#rto').forEach(input=>input.addEventListener('change',()=>{const q=state.report;const field={rb:'bike',rs:'status',rt:'type',ro:'source',rfrom:'fromDate',rto:'toDate'}[input.id];q[field]=input.value;window.paint(mode,q.mainView,q.operationalSection,q.executiveCategory);}));
  scrollTo({top:0,behavior:"instant"});return{mode,total:report.total};
 };
 window.metrics=()=>{
  const visible=e=>e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden'&&!e.closest('[hidden]');
  const b=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height,right:r.right,bottom:r.bottom}};
  const cards=[...document.querySelectorAll('.report-card,.report-metric,.report-logistics-panel,.report-driver-card')].filter(visible);
  const overflow=cards.filter(e=>e.scrollWidth>e.clientWidth+2).map(e=>({selector:e.className,title:e.textContent.slice(0,55),extra:e.scrollWidth-e.clientWidth}));
  const escaping=[...document.querySelectorAll('.report-metric>*:not(.report-metric-help),.report-card-heading>*,.report-unavailable>*,.report-list-row>*')].filter(visible).filter(e=>{const a=b(e),p=b(e.parentElement);return a.x<p.x-2||a.right>p.right+2||a.bottom>p.bottom+2}).map(e=>({class:e.className,text:e.textContent.slice(0,65)}));
  const siblings=[];for(const grid of document.querySelectorAll('.report-v2-grid,.report-v2-kpis,.report-card-grid,.report-metric-grid,.report-kpi-grid')){if(!visible(grid))continue;const items=[...grid.children].filter(visible);for(let i=0;i<items.length;i++)for(let j=i+1;j<items.length;j++){const a=b(items[i]),z=b(items[j]);if(Math.min(a.right,z.right)-Math.max(a.x,z.x)>1&&Math.min(a.bottom,z.bottom)-Math.max(a.y,z.y)>1)siblings.push(grid.className);}}
  const clipping=[...document.querySelectorAll('.report-metric-note')].filter(visible).filter(e=>e.scrollHeight>e.clientHeight+2).map(e=>e.textContent.slice(0,80));
  const groupGaps=[];for(const panel of document.querySelectorAll('[data-report-executive-panel]')){if(!visible(panel))continue;const parts=[...panel.children].filter(visible);for(let i=1;i<parts.length;i++)groupGaps.push(b(parts[i]).y-b(parts[i-1]).bottom);}
  const sticky=[...document.querySelectorAll('.report-dashboard *')].filter(visible).filter(e=>!e.closest('table')&&['fixed','sticky'].includes(getComputedStyle(e).position)).map(e=>e.className);
  return{groupGaps,width:innerWidth,documentWidth:document.documentElement.scrollWidth,overflow,escaping,siblingOverlaps:siblings,clipping,sticky,scrollHeight:document.documentElement.scrollHeight};
 };
};
(async()=>{const c=await CDP({port:19222});const {Page,Runtime,Emulation,Network}=c;await Promise.all([Page.enable(),Runtime.enable(),Network.enable()]);const errors=[];c.on('Runtime.exceptionThrown',e=>errors.push(e.exceptionDetails.text));const evaluate=async expression=>{const r=await Runtime.evaluate({expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value};
 const authTarget=await CDP.New({port:19222,url:'http://127.0.0.1:8083/'});const a=await CDP({port:19222,target:authTarget});await a.Runtime.enable();await new Promise(r=>setTimeout(r,1200));const auth=(await a.Runtime.evaluate({expression:'({loginVisible:!!document.querySelector("#identity-root:not([hidden])"),authenticatedAppReady:window.RotaMotoAppReady===true})',returnByValue:true})).result.value;fs.writeFileSync(path.join(out,'auth.json'),JSON.stringify({result:auth?.authenticatedAppReady?'available':'BLOCKED',observed:auth,reason:'No active authorized browser session or recoverable test credentials found. No account/credential provisioning performed.'},null,2));await a.close();await CDP.Close({port:19222,id:authTarget.id});
 await Emulation.setEmulatedMedia({features:[{name:'prefers-reduced-motion',value:'reduce'}]});await Page.navigate({url:'data:text/html;charset=utf-8,'+encodeURIComponent(pageHtml)});await new Promise(r=>setTimeout(r,200));await evaluate('('+setup.toString()+')()');
 const cases=phase==='final-layout'?[[390,844],[980,720],[1440,900]]:phase.startsWith('before')?[[390,844],[1440,900]]:[[320,700],[390,844],[768,1024],[980,720],[1440,900]];
 const rows=[];let shotCount=0;
 for(const [w,h]of cases){await Emulation.setDeviceMetricsOverride({width:w,height:h,deviceScaleFactor:1,mobile:false});for(const theme of ['light','dark']){await evaluate(`document.documentElement.dataset.theme='${theme}';document.documentElement.dataset.resolvedTheme='${theme}';document.documentElement.style.colorScheme='${theme}'`);
  for(const mode of phase==='final-layout'?['data','empty','error']:phase==='before-money'?['data']:phase.startsWith('before')?['empty','data']:['data','empty','loading','error','offline']){
   const scenes=[...['overview','deliveries','finance','drivers','hours','customers','addresses'].map(category=>({area:'executive',category,section:'report-overview-details'})),...['report-overview-details','report-deliveries','report-fleet','report-costs','report-intelligence','report-quality','report-territory','report-export'].map(section=>({area:'operational',category:'overview',section}))];
   for(const scene of scenes.filter(x=>phase!=='before-money'||(x.area==='executive'&&['overview','finance'].includes(x.category))||(x.area==='operational'&&x.section==='report-costs'))){await evaluate(`paint('${mode}','${scene.area}','${scene.section}','${scene.category}')`);await new Promise(r=>setTimeout(r,12));const before=await evaluate('metrics()');await evaluate(`for(const d of document.querySelectorAll('details'))if(d.getClientRects().length&&!d.closest('[hidden]')&&!d.open)d.querySelector('summary')?.click()`);await new Promise(r=>setTimeout(r,10));const opened=await evaluate('metrics()');const full=await evaluate(`(async()=>{let steps=0;const step=Math.max(100,innerHeight-100);for(let y=0;y<document.documentElement.scrollHeight;y+=step){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,0));steps++;}const end=scrollY;scrollTo({top:0,behavior:"instant"});return{steps,scrolledTo:end,maximum:Math.max(0,document.documentElement.scrollHeight-innerHeight)};})()`);
    const item={w,h,theme,mode,...scene,closed:before,opened,scroll:full};rows.push(item);
    if((phase==='final-layout'&&mode==='data')||((phase.startsWith('before')||(w===390||w===1440))&&['data','empty'].includes(mode)&&((scene.area==='executive'&&['overview','finance'].includes(scene.category))||(scene.area==='operational'&&['report-deliveries','report-costs','report-intelligence','report-territory'].includes(scene.section))))){
     const id=[w,theme,mode,scene.area==='executive'?scene.category:scene.section].join('-');
     const shot=await Page.captureScreenshot({format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width:w,height:Math.min(opened.scrollHeight,11000),scale:1}});fs.writeFileSync(path.join(out,id+'.png'),Buffer.from(shot.data,'base64'));shotCount++;
    }
    await evaluate(`for(const d of document.querySelectorAll('details'))if(d.open)d.querySelector('summary')?.click()`);
   }
  }
 }}
 fs.writeFileSync(path.join(out,'audit.json'),JSON.stringify({phase,states:rows.length,shotCount,errors,rows},null,2));console.log(JSON.stringify({phase,states:rows.length,shotCount,errors,overflow:rows.filter(x=>x.opened.documentWidth>x.w||x.opened.overflow.length||x.opened.escaping.length||x.opened.siblingOverlaps.length).map(x=>({w:x.w,mode:x.mode,area:x.area,category:x.category,section:x.section,issues:x.opened})).slice(0,12),clippedStates:rows.filter(x=>x.opened.clipping.length).length,stickyStates:rows.filter(x=>x.opened.sticky.length).length}));await c.close();})().catch(e=>{console.error(e);process.exitCode=1});
