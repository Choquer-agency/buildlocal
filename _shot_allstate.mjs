import http from 'node:http';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port=9351;
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const p=spawn(CHROME,['--headless=new','--disable-gpu',`--remote-debugging-port=${port}`,'--hide-scrollbars','--window-size=1440,1000','about:blank'],{stdio:'ignore'});
try{
  await wait(2500);
  const get=u=>new Promise((res,rej)=>http.get(u,r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>res(JSON.parse(d)));}).on('error',rej));
  const tabs=await get(`http://127.0.0.1:${port}/json`);
  const target=tabs.find(t=>t.type==='page')||tabs[0];
  const WebSocket=(await import('ws')).default;
  const sock=new WebSocket(target.webSocketDebuggerUrl);
  let id=0;const cbs={};
  const send=(m,params={})=>new Promise(r=>{const i=++id;cbs[i]=r;sock.send(JSON.stringify({id:i,method:m,params}));});
  sock.on('message',d=>{const m=JSON.parse(d);if(m.id&&cbs[m.id])cbs[m.id](m);});
  await new Promise((r,j)=>{sock.on('open',r);sock.on('error',j);});
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Page.navigate',{url:'http://localhost:4500/p/phoenix-roofers-by-allstate-roofing-contractors'});
  await wait(4000);
  // scroll to first services card and grab its Y
  const ev=await send('Runtime.evaluate',{expression:`(()=>{const a=[...document.querySelectorAll('a[href*="/services/"]')].find(e=>e.querySelector('img'))||[...document.querySelectorAll('a[href*="/services/"]')][0]; if(!a) return JSON.stringify({y:1100}); const r=a.getBoundingClientRect(); return JSON.stringify({y:Math.max(0,r.top+window.scrollY-100)});})()`,returnByValue:true});
  const {y}=JSON.parse(ev.result.result.value);
  const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y,width:1440,height:1300,scale:1}});
  fs.writeFileSync('/tmp/allstate_svc.png',Buffer.from(shot.result.data,'base64'));
  console.log('OK services y='+y);
  sock.close();
}catch(e){console.error('ERR',e.message);}finally{p.kill();process.exit(0);}
