import http from 'node:http';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port=9374;
const wait=ms=>new Promise(r=>setTimeout(r,ms));
// hard watchdog — never hang
const watchdog=setTimeout(()=>{console.error('WATCHDOG timeout');process.exit(2);},25000);
const p=spawn(CHROME,['--headless=new',`--remote-debugging-port=${port}`,'--hide-scrollbars','--window-size=1440,1000',`--user-data-dir=/tmp/cgl-chrome-${port}`,'about:blank'],{stdio:'ignore'});
await wait(3500);
const L=m=>process.stderr.write(`[step] ${m}\n`);
const get=u=>new Promise((res,rej)=>http.get(u,r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>res(JSON.parse(d)));}).on('error',rej));
L('fetching /json');
const tabs=await get(`http://127.0.0.1:${port}/json`);
L('got tabs '+tabs.length);
const tab=tabs.find(t=>t.type==='page'&&t.webSocketDebuggerUrl)||tabs.find(t=>t.webSocketDebuggerUrl);
L('using tab '+tab.type+' '+tab.title);
const WebSocket=(await import('ws')).default;
const sock=new WebSocket(tab.webSocketDebuggerUrl);
let id=0;const cbs={};
const send=(m,params={})=>new Promise(r=>{const i=++id;cbs[i]=r;sock.send(JSON.stringify({id:i,method:m,params}));});
sock.on('message',d=>{const m=JSON.parse(d);if(m.id&&cbs[m.id])cbs[m.id](m);});
sock.on('error',e=>{L('ws error '+e.message);});
await new Promise(r=>sock.on('open',r));
L('ws open');
await send('Page.enable');await send('Runtime.enable');
L('navigating');
await send('Page.navigate',{url:'http://localhost:4500/p/cgl-landscaping'});
await wait(4000);
L('captured wait done');
// 1) hero + nav
let shot=await send('Page.captureScreenshot',{format:'png',clip:{x:0,y:0,width:1440,height:1000,scale:1.25}});
fs.writeFileSync('/tmp/cgl_hero.png',Buffer.from(shot.result.data,'base64'));
// 2) open Services dropdown via a REAL mouse move (CSS :hover)
const move=async(x,y)=>{await send('Input.dispatchMouseEvent',{type:'mouseMoved',x,y});};
const rectOf=async sel=>{const r=await send('Runtime.evaluate',{expression:`(()=>{${sel};return el?JSON.stringify(el.getBoundingClientRect()):'null';})()`,returnByValue:true});return JSON.parse(r.result.result.value);};
// Services trigger
let rb=await rectOf(`const el=[...document.querySelectorAll('nav a,header a')].find(e=>/^services/i.test(e.textContent.trim()))`);
await move(rb.x+rb.width/2, rb.y+rb.height/2);
await wait(500);
// hover the "Landscaping" category row to open its flyout
let lr=await rectOf(`const el=[...document.querySelectorAll('div')].find(e=>e.children.length<=2&&/^Landscaping/.test(e.textContent.trim())&&e.querySelector('svg'))`);
if(lr) await move(lr.x+lr.width/2, lr.y+lr.height/2);
await wait(600);
shot=await send('Page.captureScreenshot',{format:'png',clip:{x:0,y:0,width:1440,height:680,scale:1.25}});
fs.writeFileSync('/tmp/cgl_menu.png',Buffer.from(shot.result.data,'base64'));
// 3) services section
const ev=await send('Runtime.evaluate',{expression:`(()=>{const a=[...document.querySelectorAll('a[href*="/services/"]')].find(e=>e.querySelector('img'));if(!a)return JSON.stringify({y:1100,h:1500});const r=a.getBoundingClientRect();return JSON.stringify({y:Math.max(0,r.top+window.scrollY-90),h:1500});})()`,returnByValue:true});
const {y,h}=JSON.parse(ev.result.result.value);
shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y,width:1440,height:h,scale:1.25}});
fs.writeFileSync('/tmp/cgl_svc.png',Buffer.from(shot.result.data,'base64'));
console.log('done, svc y',y);
clearTimeout(watchdog);
p.kill();process.exit(0);
