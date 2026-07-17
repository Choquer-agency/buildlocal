import http from 'node:http';
import { spawn } from 'node:child_process';
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
await send('Page.navigate',{url:'http://localhost:4500/p/rockwell-landscape-maintenance'});
await wait(4000);
const fs=await import('node:fs');
for (const [name,y,h] of [['hero',0,1000],['services',1000,1300]]){
  const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y,width:1440,height:h,scale:1.5}});
  fs.writeFileSync(`/tmp/rock_${name}.png`,Buffer.from(shot.result.data,'base64'));
}
console.log('done');
p.kill();process.exit(0);
