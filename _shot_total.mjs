import http from 'node:http';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port=9361;
const UDD=process.cwd()+'/_shots/cpX';
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const p=spawn(CHROME,['--headless=new','--disable-gpu',`--remote-debugging-port=${port}`,`--user-data-dir=${UDD}`,'--no-first-run','--hide-scrollbars','--window-size=1440,1000','about:blank'],{stdio:'ignore'});
const get=u=>new Promise((res,rej)=>http.get(u,r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>res(JSON.parse(d)));}).on('error',rej));
let tabs;
for(let i=0;i<40;i++){ await wait(400); try{ tabs=await get(`http://127.0.0.1:${port}/json`); if(tabs&&tabs.length&&tabs[0].webSocketDebuggerUrl)break; }catch(e){} }
if(!tabs){ console.log('CHROME_FAILED'); process.exit(1); }
const WebSocket=(await import('ws')).default;
const sock=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);
let id=0;const cbs={};
const send=(m,params={})=>new Promise(r=>{const i=++id;cbs[i]=r;sock.send(JSON.stringify({id:i,method:m,params}));});
sock.on('message',d=>{const m=JSON.parse(d);if(m.id&&cbs[m.id])cbs[m.id](m);});
await new Promise(r=>sock.on('open',r));
await send('Page.enable');await send('Runtime.enable');
await send('Page.navigate',{url:'http://localhost:4500/p/totalscape-pros'});
await wait(4000);
// scroll through to trigger in-view animations
for(let yy=0; yy<6000; yy+=600){ await send('Runtime.evaluate',{expression:`window.scrollTo(0,${yy})`}); await wait(180); }
await send('Runtime.evaluate',{expression:`window.scrollTo(0,0)`}); await wait(600);
// services grid region
const ev=await send('Runtime.evaluate',{expression:`(()=>{const a=[...document.querySelectorAll('a[href*="/services/"]')].find(e=>e.querySelector('img')); if(!a) return JSON.stringify({y:1000,h:1700}); const r=a.getBoundingClientRect(); return JSON.stringify({y:Math.max(0,r.top+window.scrollY-100), h:1750});})()`,returnByValue:true});
const {y,h}=JSON.parse(ev.result.result.value);
const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y,width:1440,height:h,scale:1}});
fs.writeFileSync('_shots/total_svc.png',Buffer.from(shot.result.data,'base64'));
console.log('OK y',y,'h',h);
p.kill();process.exit(0);
