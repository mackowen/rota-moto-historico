'use strict';
const CDP = require('/data/data/com.termux/files/home/projetos/browser-tests/node_modules/chrome-remote-interface');
const fs = require('node:fs');
const path = require('node:path');

const out = __dirname;
const origin = 'http://127.0.0.1:8083';
const cases = [
  { name: 'phone-320', width: 320, height: 720, mobile: true },
  { name: 'phone-390-short-viewport', width: 390, height: 560, mobile: true },
  { name: 'phone-390', width: 390, height: 844, mobile: true },
  { name: 'tablet-portrait', width: 768, height: 1024, mobile: true },
  { name: 'tablet-landscape', width: 1024, height: 768, mobile: true },
  { name: 'pc-1280', width: 1280, height: 800, mobile: false },
  { name: 'pc-1440', width: 1440, height: 900, mobile: false },
  { name: 'android-desktop-mode-980', width: 980, height: 720, mobile: true }
];
const errors = [];
const httpErrors = [];
const postRequests = [];
const shortViewportChecks = [];
const results = [];

async function once(client, event) {
  return new Promise(resolve => client.once(event, resolve));
}
async function evaluate(Runtime, expression) {
  const result = await Runtime.evaluate({ expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || 'Browser evaluate failed');
  return result.result.value;
}
async function capture(Page, name) {
  const shot = await Page.captureScreenshot({ format: 'png', fromSurface: true, captureBeyondViewport: false });
  fs.writeFileSync(path.join(out, `${name}.png`), Buffer.from(shot.data, 'base64'));
}
async function visibleState(Runtime) {
  return evaluate(Runtime, `(() => {
    const visible = el => Boolean(el && !el.closest('[hidden]') && el.getClientRects().length);
    const flow = document.querySelector('[data-recovery]');
    const invite = document.querySelector('[data-invitation]');
    const login = document.querySelector('[data-login]');
    const menu = document.querySelector('[data-recovery-menu]');
    const screens = [...document.querySelectorAll('[data-recovery-screen]')].filter(visible).map(el => el.dataset.recoveryScreen);
    const panel = document.querySelector('.rm-identity-content');
    const rect = el => { const r = el.getBoundingClientRect(); return {x:r.x,y:r.y,width:r.width,height:r.height}; };
    return { loginVisible:visible(login), recoveryVisible:visible(flow), invitationVisible:visible(invite), menuVisible:visible(menu), visibleScreens:screens, activeElementHidden:Boolean(document.activeElement?.closest('[hidden]')), activeElement:document.activeElement?.getAttribute('data-recovery-choice') || document.activeElement?.name || document.activeElement?.tagName, root:{innerWidth,clientWidth:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,scrollHeight:document.documentElement.scrollHeight}, content:{...rect(panel),clientHeight:panel.clientHeight,scrollHeight:panel.scrollHeight,overflowY:getComputedStyle(panel).overflowY}, recovery:rect(flow), invitation:rect(invite) };
  })()`);
}
async function click(Runtime, selector) {
  const clicked = await evaluate(Runtime, `(() => { const el=document.querySelector(${JSON.stringify(selector)}); if(!el) return false; el.click(); return true; })()`);
  if (!clicked) throw new Error(`Missing control ${selector}`);
  await new Promise(resolve => setTimeout(resolve, 80));
}
async function assertActionReachable(Runtime, selector) {
  return evaluate(Runtime, `(() => {
    const panel=document.querySelector('.rm-identity-panel');
    const action=document.querySelector(${JSON.stringify(selector)});
    if(!panel||!action)return {found:false};
    panel.scrollTop=panel.scrollHeight;
    const rect=action.getBoundingClientRect();
    return {found:true,bottom:rect.bottom,viewport:innerHeight,scrollTop:panel.scrollTop,scrollHeight:panel.scrollHeight,clientHeight:panel.clientHeight,overflowY:getComputedStyle(panel).overflowY};
  })()`);
}

(async () => {
  const browser = await CDP.Version({ host: '127.0.0.1', port: 9234 });
  const targets = await CDP.List({ host: '127.0.0.1', port: 9234 });
  const target = targets.find(item => item.type === 'page') || await CDP.New({ host: '127.0.0.1', port: 9234, url: 'about:blank' });
  const client = await CDP({ target, host: '127.0.0.1', port: 9234 });
  const { Page, Runtime, Network, Emulation } = client;
  await Promise.all([Page.enable(), Runtime.enable(), Network.enable()]);
  Runtime.exceptionThrown(({exceptionDetails}) => errors.push(exceptionDetails.exception?.description || exceptionDetails.text));
  Network.responseReceived(({response}) => { if (response.status >= 400) httpErrors.push({status:response.status,url:response.url.split('?')[0]}); });
  Network.requestWillBeSent(({request}) => { if (request.method === 'POST') postRequests.push(request.url.split('?')[0]); });
  const all = [];
  for (const theme of ['dark', 'light']) {
    for (const testCase of cases) {
      await Emulation.setDeviceMetricsOverride({width:testCase.width,height:testCase.height,deviceScaleFactor:1,mobile:testCase.mobile});
      await Page.addScriptToEvaluateOnNewDocument({source:`localStorage.setItem('rotamoto.appearance.boot',JSON.stringify({theme:${JSON.stringify(theme)}}));`});
      const loaded = once(client, 'Page.loadEventFired');
      await Page.navigate({url:`${origin}/?authFlowVisual=${theme}-${testCase.name}`});
      await loaded;
      await new Promise(resolve => setTimeout(resolve, 500));
      const state = await visibleState(Runtime);
      if (!state.loginVisible) throw new Error(`${theme}/${testCase.name}: login unavailable after expected unauthenticated session`);
      if (state.root.scrollWidth > state.root.clientWidth) throw new Error(`${theme}/${testCase.name}: horizontal overflow at login`);
      all.push({theme,viewport:testCase.name,stage:'login',state});

      await click(Runtime, '[data-open-recovery]');
      let view = await visibleState(Runtime);
      if (view.loginVisible || !view.recoveryVisible || view.invitationVisible || !view.menuVisible || view.visibleScreens.length) throw new Error(`${theme}/${testCase.name}: recovery menu is not exclusive`);
      if (view.activeElementHidden) throw new Error(`${theme}/${testCase.name}: focus landed in hidden recovery content`);
      if (testCase.name === 'phone-390-short-viewport') {
        const reachable = await assertActionReachable(Runtime, '[data-recovery-choice="recover-mfa"]');
        if (!reachable.found || reachable.bottom > reachable.viewport + 1) throw new Error(`${theme}: recovery menu is not scroll-reachable with the short viewport`);
        shortViewportChecks.push({theme,stage:'recovery-menu',...reachable});
      }
      all.push({theme,viewport:testCase.name,stage:'recovery-menu',state:view});
      const captureFlows = ['phone-390','tablet-landscape','pc-1280','android-desktop-mode-980'];
      if (captureFlows.includes(testCase.name)) await capture(Page, `${theme}-${testCase.name}-recovery-menu`);
      for (const [choice, expected] of [['request-code','request-code'],['reset-password','reset-password'],['recover-mfa','recover-mfa']]) {
        await click(Runtime, `[data-recovery-choice="${choice}"]`);
        view = await visibleState(Runtime);
        if (!view.recoveryVisible || view.loginVisible || view.invitationVisible || view.visibleScreens.length !== 1 || view.visibleScreens[0] !== expected) throw new Error(`${theme}/${testCase.name}: ${choice} did not select one form`);
        if (view.activeElementHidden) throw new Error(`${theme}/${testCase.name}: focus landed in a hidden ${choice} form`);
        if (view.root.scrollWidth > view.root.clientWidth) throw new Error(`${theme}/${testCase.name}: horizontal overflow in ${choice}`);
        if (testCase.name === 'phone-390-short-viewport') {
          const target = choice === 'recover-mfa' && view.visibleScreens[0] === 'recover-mfa'
            ? '[data-mfa-recovery-stage="request"] button[type="submit"]'
            : `[data-recovery-screen="${choice}"] button[type="submit"]`;
          const reachable = await assertActionReachable(Runtime, target);
          if (!reachable.found || reachable.bottom > reachable.viewport + 1) throw new Error(`${theme}: ${choice} action is not scroll-reachable with the short viewport`);
          shortViewportChecks.push({theme,stage:choice,...reachable});
        }
        all.push({theme,viewport:testCase.name,stage:choice,state:view});
        if (captureFlows.includes(testCase.name)) await capture(Page, `${theme}-${testCase.name}-${choice}`);
        await click(Runtime, '[data-recovery-back]');
        view = await visibleState(Runtime);
        if (!view.menuVisible || view.visibleScreens.length) throw new Error(`${theme}/${testCase.name}: contextual back did not return to recovery menu`);
        all.push({theme,viewport:testCase.name,stage:`back-to-menu-${choice}`,state:view});
      }
      await click(Runtime, '[data-recovery-back]');
      view = await visibleState(Runtime);
      if (!view.loginVisible || view.recoveryVisible || view.invitationVisible) throw new Error(`${theme}/${testCase.name}: recovery back did not return to login`);
      all.push({theme,viewport:testCase.name,stage:'recovery-back-to-login',state:view});
      await click(Runtime, '[data-open-invitation]');
      view = await visibleState(Runtime);
      if (view.loginVisible || view.recoveryVisible || !view.invitationVisible) throw new Error(`${theme}/${testCase.name}: invitation is not exclusive`);
      if (view.activeElementHidden || view.root.scrollWidth > view.root.clientWidth) throw new Error(`${theme}/${testCase.name}: invitation focus/overflow issue`);
      if (testCase.name === 'phone-390-short-viewport') {
        const reachable = await assertActionReachable(Runtime, '[data-accept-invitation] button[type="submit"]');
        if (!reachable.found || reachable.bottom > reachable.viewport + 1) throw new Error(`${theme}: invitation action is not scroll-reachable with the short viewport`);
        shortViewportChecks.push({theme,stage:'invitation',...reachable});
      }
      all.push({theme,viewport:testCase.name,stage:'invitation',state:view});
      if (captureFlows.includes(testCase.name)) await capture(Page, `${theme}-${testCase.name}-invitation`);
      await click(Runtime, '[data-invitation-back]');
      view = await visibleState(Runtime);
      if (!view.loginVisible || view.recoveryVisible || view.invitationVisible) throw new Error(`${theme}/${testCase.name}: invitation back did not return to login`);
      all.push({theme,viewport:testCase.name,stage:'invitation-back-to-login',state:view});
    }
    for (const [action, expected, selector] of [
      ['password_recovery','reset-password','[data-recovery-consume] [name="token"]'],
      ['mfa_recovery','recover-mfa','[data-mfa-recovery-confirm] [name="token"]'],
      ['membership_invitation','invitation','[data-accept-invitation] [name="token"]']
    ]) {
      const syntheticToken = `synthetic-${action}-visual-only`;
      const loaded = once(client, 'Page.loadEventFired');
      await Page.navigate({url:`${origin}/?emailLinkCase=${action}#action=${action}&token=${syntheticToken}`});
      await loaded;
      await new Promise(resolve => setTimeout(resolve, 350));
      const view = await visibleState(Runtime);
      const tokenReady = await evaluate(Runtime, `Boolean(document.querySelector(${JSON.stringify(selector)})?.value)`);
      const stateReady = expected === 'invitation' ? view.invitationVisible && !view.recoveryVisible && !view.loginVisible
        : view.recoveryVisible && !view.invitationVisible && !view.loginVisible && view.visibleScreens.length === 1 && view.visibleScreens[0] === expected;
      if (!stateReady || !tokenReady || view.activeElementHidden) throw new Error(`${theme}/email-link/${action}: token link did not open its exclusive screen`);
      all.push({theme,viewport:'email-link',stage:action,state:{...view,tokenPrefilled:tokenReady}});
    }
    const loaded = once(client, 'Page.loadEventFired');
    await Page.navigate({url:`${origin}/?invalidEmailVisual=${theme}`});
    await loaded;
    await new Promise(resolve => setTimeout(resolve, 300));
    await click(Runtime, '[data-open-recovery]');
    await click(Runtime, '[data-recovery-choice="request-code"]');
    await evaluate(Runtime, `(() => { const input=document.querySelector('[data-recovery-request] [name="email"]'); input.value='email-invalido'; input.dispatchEvent(new Event('input',{bubbles:true})); })()`);
    await click(Runtime, '[data-recovery-request] button[type="submit"]');
    const invalidEmail = await evaluate(Runtime, `(() => ({valid:document.querySelector('[data-recovery-request] [name="email"]').validity.valid,status:document.querySelector('[data-recovery-status]').textContent}))()`);
    if (invalidEmail.valid || invalidEmail.status) throw new Error(`${theme}: invalid email was not stopped by browser validation`);
    all.push({theme,viewport:'phone-390',stage:'invalid-email-native-validation',state:invalidEmail});
  }
  results.push(...all);
  fs.writeFileSync(path.join(out,'measurements.json'), JSON.stringify({browser:{product:browser.Browser,protocol:browser['Protocol-Version']},cases:all,exceptions:errors,httpErrors,postRequests,shortViewportChecks},null,2)+'\n');
  if (errors.length) throw new Error(`Browser exceptions: ${errors.length}`);
  if (httpErrors.some(item => item.status >= 500)) throw new Error(`HTTP 5xx observed: ${httpErrors.map(item=>item.status+' '+item.url).join(', ')}`);
  console.log(JSON.stringify({cases:all.length, screenshots:fs.readdirSync(out).filter(file=>file.endsWith('.png')).length,exceptions:errors.length,postRequests,shortViewportChecks,httpErrors},null,2));
  await client.close();
})().catch(error => { console.error(error.stack || error.message); process.exitCode=1; });
