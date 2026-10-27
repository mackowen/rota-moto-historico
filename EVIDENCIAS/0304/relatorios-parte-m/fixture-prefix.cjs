'use strict';
const fs=require('node:fs');
const path=require('node:path');
const CDP=require('/data/data/com.termux/files/home/projetos/browser-tests/node_modules/chrome-remote-interface');
const out='/data/data/com.termux/files/home/projetos/browser-tests/.temporarias/0304-relatorios-parte-m-20261027T143016Z';
const appRoot='/data/data/com.termux/files/home/projetos/repos/rota-moto-restaurante';
const appSource=fs.readFileSync(path.join(appRoot,'app.js'),'utf8');
const appNavigation=appSource.slice(appSource.indexOf('function activateReportMainView('),appSource.indexOf('function orderSources()'));
fs.mkdirSync(out,{recursive:true});
const logoData="data:image/svg+xml,"+encodeURIComponent(fs.readFileSync(path.join(appRoot,"favicon.svg"),"utf8"));
const cases=[[320,800],[360,800],[390,844],[430,932],[720,360],[800,360],[844,390],[932,430],[768,1024],[1024,768],[1280,800],[1440,900],[1920,1080]];
const fixture=`(()=>{window.state={tab:'reports',report:{period:'26',fromDate:'2026-10-01',toDate:'2026-10-26',bike:'',status:'',type:'',source:'',mainView:'executive',executiveCategory:'overview',operationalSection:'report-overview-details'}};const now=Date.parse('2026-10-26T15:00:00Z');const orders=[
{id:'o1',deliveryId:'d1',createdAt:'2026-10-06T13:00:00Z',status:'FINALIZADA',type:'NORMAL',sourceId:'manual',bikeId:'b1',bike:'Ana QA',customer:'Cliente A QA',address:'Rua A 10'},
{id:'o2',deliveryId:'d2',createdAt:'2026-10-06T16:00:00Z',status:'CANCELADA',type:'NORMAL',sourceId:'ifood',bikeId:'b1',bike:'Ana QA',customer:'Cliente B QA',address:'Rua B 20'},
{id:'o3',deliveryId:'d3',createdAt:'2026-10-07T18:00:00Z',status:'FAILED',type:'NORMAL',sourceId:'manual',bikeId:'b2',bike:'Bia QA',customer:'Cliente A QA',address:'Rua A 10'},
{id:'o4',deliveryId:'d4',createdAt:'2026-10-08T19:00:00Z',status:'EM ROTA',type:'NORMAL',sourceId:'ifood',bikeId:'b2',bike:'Bia QA',customer:'Cliente C QA',address:'Rua C 30'}];
const deliveries=[
{id:'d1',orderId:'o1',driverId:'b1',status:'DELIVERED',assignedAt:now-90*60000,completedAt:now,estimatedDistanceM:4000,actualDistanceM:4200},
{id:'d2',orderId:'o2',driverId:'b1',status:'CANCELLED'},
{id:'d3',orderId:'o3',driverId:'b2',status:'FAILED'},
{id:'d4',orderId:'o4',driverId:'b2',status:'OUT_FOR_DELIVERY'}];
const report=RotaMotoAnalytics.aggregate({orders,deliveries,bikes:[{id:'b1',name:'Ana QA'},{id:'b2',name:'Bia QA'}]},{fromDate:'2026-10-01',toDate:'2026-10-26',driver:'',now,timeZone:'America/Sao_Paulo'});
const statusLabel=x=>({DELIVERED:'Concluída',CANCELLED:'Cancelada',FAILED:'Com falha',OUT_FOR_DELIVERY:'Em andamento'})[x]||'Outro';
const html=RotaMotoAnalyticsView.render({report,filters:window.state.report,statusLabel,typeLabel:x=>x==='NORMAL'?'Entrega':'Outro',sources:{manual:'Manual',ifood:'iFood'},bikes:[{id:'b1',name:'Ana QA'},{id:'b2',name:'Bia QA'}],types:['NORMAL'],freshNote:'Visualização de fixture de teste',emptyState:null});
const header=RotaMotoDashboardV2.renderHeader({title:'',subtitle:'',eyebrow:'Restaurante',actions:'<button class="btn" aria-label="Notificações">♧</button>',compactTitle:false}).replace('src="favicon.svg"','src="${logoData}"');
const side='<aside class="sidebar"><div class="brand"><span class="brandmark">RM</span><span><strong>RotaMoto</strong><small>Restaurante</small></span></div><nav class="side-nav"><button class="nav-item">Início</button><button class="nav-item">Pedidos</button><button class="nav-item">Entregas</button><button class="nav-item">Rotas</button><button class="nav-item active">Relatórios</button></nav></aside>';
const bottom='<nav class="bottom-nav"><button class="nav-item">Início</button><button class="nav-item">Pedidos</button><button class="nav-item">Entregas</button><button class="nav-item">Rotas</button><button class="nav-item active">Relatórios</button></nav>';
document.documentElement.dataset.theme='light';document.documentElement.dataset.resolvedTheme='light';document.documentElement.style.colorScheme='light';const app=document.querySelector('#app');app.hidden=false;app.inert=false;app.removeAttribute('aria-hidden');app.innerHTML='<div class="shell">'+side+'<main class="main" id="main">'+header+html+'</main></div>'+bottom;bindReportNavigation();
return {ready:true,report:{total:report.total,deliveries:report.deliveryTotal,statuses:report.deliveryStatusCounts},kpis:document.querySelectorAll('.report-v2-kpis .report-metric').length};})()`;
const escapeScript=text=>text.replace(/<\/script/giu,'<\\/script');
const pageHtml=`<!doctype html><html lang="pt-BR" data-theme="light" data-resolved-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>${fs.readFileSync(path.join(appRoot,'styles.css'),'utf8')}</style><style>${fs.readFileSync(path.join(appRoot,'design-system.css'),'utf8')}</style><style>${fs.readFileSync(path.join(appRoot,'dashboard-v2.css'),'utf8')}</style>${['order-money.js','analytics.js','analytics-view.js','dashboard-v2.js','logistics-ui.js'].map(file=>`<script>${escapeScript(fs.readFileSync(path.join(appRoot,file),'utf8'))}</script>`).join('')}<script>${escapeScript(appNavigation)}</script></head><body><div id="app"></div><script>${escapeScript(fixture)}</script></body></html>`;
