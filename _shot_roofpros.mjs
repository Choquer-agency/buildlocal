import http from 'node:http';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port=9351;
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const p=spawn(CHROME,['--headless=new',`--remote-debugging-port=${port}`,'--user-data-dir='+process.cwd()+'/.tmp/chromeprofile','--no-first-run','--remote-allow-origins=*','--hide-scrollbars','--window-size=1440,1000','about:blank'],{stdio:'ignore'});
await wait(3500);
const get=u=>new Promise((res,rej)=>http.get(u,r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>res(JSON.parse(d)));}).on('error',rej));
const tabs=await get(`http://127.0.0.1:${port}/json`);
const WebSocket=(await import('ws')).default;
const sock=new WebSocket(tabs[0].webSocketDebuggerUrl);
let id=0;const cbs={};
const send=(m,params={})=>new Promise(r=>{const i=++id;cbs[i]=r;sock.send(JSON.stringify({id:i,method:m,params}));});
sock.on('message',d=>{const m=JSON.parse(d);if(m.id&&cbs[m.id])cbs[m.id](m);});
await new Promise(r=>sock.on('open',r));
await send('Page.enable');
fs.mkdirSync('_shots',{recursive:true});
async function shot(url,file,h){
  await send('Page.navigate',{url});
  await wait(4500);
  const s=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width:1440,height:h,scale:1}});
  fs.writeFileSync(file,Buffer.from(s.result.data,'base64'));
  console.log('saved',file,fs.statSync(file).size,'bytes');
}
await shot('http://localhost:4500/p/roof-pros','_shots/roofpros-home.png',1000);
await shot('http://localhost:4500/p/roof-pros/services','_shots/roofpros-services.png',2200);
p.kill();process.exit(0);
