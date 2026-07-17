import sharp from "sharp";
const f=".tmp/pp_full.png";
const m=await sharp(f).metadata();
// nav strip (top), scaled up 2x for readability
await sharp(f).extract({left:0,top:0,width:m.width,height:60}).resize({width:m.width*2}).png().toFile(".tmp/pp_nav.png");
console.log("nav",m.width,m.height);
