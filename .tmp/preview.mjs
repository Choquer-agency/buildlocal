import sharp from "sharp";
const logo = "public/biz-photos/power-peak-roofing/logo-dark.webp";
const meta = await sharp(logo).metadata();
await sharp({ create: { width: meta.width+80, height: meta.height+80, channels: 4, background: "#0d0d0d" } })
  .composite([{ input: logo, top: 40, left: 40 }])
  .png().toFile(".tmp/logo_on_dark.png");
console.log("ok", meta.width, meta.height);
