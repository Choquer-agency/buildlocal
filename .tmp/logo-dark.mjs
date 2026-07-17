import sharp from "sharp";
const inP = "_inbox/roofing/ro0030 - Power Peak Roofing/logo.jpg";
const outP = "public/biz-photos/power-peak-roofing/logo-dark.webp";
const img = sharp(inP).resize({ width: 400, withoutEnlargement: true }).ensureAlpha();
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
const ch = info.channels;
let cleared = 0;
for (let i = 0; i < data.length; i += ch) {
  const r = data[i], g = data[i+1], b = data[i+2];
  const max = Math.max(r, g, b);
  // near-black background → fully transparent; soft ramp on the dark fringe
  if (max < 30) { data[i+3] = 0; cleared++; }
  else if (max < 70) { data[i+3] = Math.round(((max - 30) / 40) * 255); }
}
await sharp(data, { raw: { width: info.width, height: info.height, channels: ch } })
  .webp({ quality: 92 }).toFile(outP);
console.log(`wrote ${outP} — cleared ${cleared} px of ${data.length/ch}`);
