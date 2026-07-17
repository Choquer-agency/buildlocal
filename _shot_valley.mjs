import http from 'node:http';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port=9347;
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const p=spawn(CHROME,['--headless=new',`--remote-debugging-port=${port}`,'--hide-scrollbars','--window-size=1440,1000','about:blank'],{stdio:'ignore'});
await wait(2000);
const get=u=>new Promise((res,rej)=>http.get(u,r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>res(JSON.parse(d)));}).on('error',rej));
const tabs=await get(`http://127.0.0.1:${port}/json`);
const WebSocket=(await import('ws')).default;
const sock=new WebSocket(tabs[0].webSocketDebuggerUrl);
let id=0;const cbs={};
const send=(m,params={})=>new Promise(r=>{const i=++id;cbs[i]=r;sock.send(JSON.stringify({id:i,method:m,params}));});
sock.on('message',d=>{const m=JSON.parse(d);if(m.id&&cbs[m.id])cbs[m.id](m);});
await new Promise(r=>sock.on('open',r));
await send('Page.enable');
await send('Page.navigate',{url:'http://localhost:4500/p/valley-roofing-and-repair'});
await wait(4000);
// hero
let shot=await send('Page.captureScreenshot',{format:'png',clip:{x:0,y:0,width:1440,height:1000,scale:1.5}});
fs.writeFileSync('/tmp/valley_hero.png',Buffer.from(shot.result.data,'base64'));
// services grid
const ev=await send('Runtime.evaluate',{expression:`(()=>{const a=[...document.querySelectorAll('a[href*="/services/"]')].find(e=>e.querySelector('img')); if(!a) return JSON.stringify({y:1100,h:1400}); const r=a.getBoundingClientRect(); return JSON.stringify({y:Math.max(0,r.top+window.scrollY-90), h:1300});})()`,returnByValue:true});
const {y,h}=JSON.parse(ev.result.result.value);
shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y,width:1440,height:h,scale:1.5}});
fs.writeFileSync('/tmp/valley_svc.png',Buffer.from(shot.result.data,'base64'));
console.log('grid y',y,'h',h);
p.kill();process.exit(0);
