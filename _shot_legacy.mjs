import http from 'node:http';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port=9362;
const prof='/tmp/cr-legacy-'+port;
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const p=spawn(CHROME,['--headless=new',`--remote-debugging-port=${port}`,`--user-data-dir=${prof}`,'--no-first-run','--hide-scrollbars','--window-size=1440,1000','about:blank'],{stdio:'ignore'});
await wait(3000);
const get=u=>new Promise((res,rej)=>http.get(u,r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>res(JSON.parse(d)));}).on('error',rej));
const tabs=await get(`http://127.0.0.1:${port}/json`);
const page=tabs.find(t=>t.type==='page')||tabs[0];
const WebSocket=(await import('ws')).default;
const sock=new WebSocket(page.webSocketDebuggerUrl);
let id=0;const cbs={};
const send=(m,params={})=>new Promise(r=>{const i=++id;cbs[i]=r;sock.send(JSON.stringify({id:i,method:m,params}));});
sock.on('message',d=>{const m=JSON.parse(d);if(m.id&&cbs[m.id])cbs[m.id](m);});
await new Promise((r,j)=>{sock.on('open',r);sock.on('error',j);});
await send('Page.enable');
await send('Runtime.enable');
async function shoot(url, out, height){
  await send('Page.navigate',{url});
  await wait(4500);
  const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width:1440,height,scale:1.5}});
  fs.writeFileSync(out,Buffer.from(shot.result.data,'base64'));
  console.log('wrote',out);
}
try{
  await shoot('http://localhost:4500/p/legacy-green-solutions','/tmp/legacy_hero.png',1000);
  await shoot('http://localhost:4500/p/legacy-green-solutions/services','/tmp/legacy_svc.png',2400);
}catch(e){console.log('ERR',e.message);}
p.kill();process.exit(0);
