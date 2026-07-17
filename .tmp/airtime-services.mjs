import fs from "node:fs";
const p = "src/content/asset-overrides.json";
const j = JSON.parse(fs.readFileSync(p, "utf8"));
const slug = "airtime-cooling-and-heating";
const services = [
  { name: "AC Repair & Installation", slug: "ac-repair-and-installation", blurb: "Trust AirTime to restore cool, refreshing comfort to your home with expert AC repair and replacement you can count on." },
  { name: "Heating & Furnace Repair", slug: "heating-and-furnace-repair", blurb: "Fast, reliable furnace and heat pump repair to keep your home warm and your family comfortable all season." },
  { name: "Ductless Mini Splits", slug: "ductless-mini-splits", blurb: "Quick, efficient ductless mini split installation and repair for flexible, room-by-room comfort." },
  { name: "Air Duct Cleaning", slug: "air-duct-cleaning", blurb: "Improve your indoor air with professional air duct cleaning and sealing so you can breathe cleaner, healthier air." },
  { name: "Plumbing Services", slug: "plumbing-services", blurb: "Full-service plumbing including water heaters, drains, leaks, and whole-home solutions, done right the first time." },
  { name: "Thermostat Repair & Installation", slug: "thermostat-repair-and-installation", blurb: "Thermostat repair and installation to improve cooling efficiency and keep your home perfectly comfortable." },
];
const aboutBody = [
  "At AirTime Cooling & Heating, we're committed to keeping your home comfortable year-round with reliable, high-quality HVAC and plumbing services. Whether you need a quick AC repair or a full system installation, our team brings years of experience and a genuine passion for service to every job.",
  "We don't just fix HVAC and plumbing issues — we build relationships. Our locally trusted team takes pride in transparent communication, prompt service, and doing the job right the first time, proudly serving Mesa and surrounding Arizona communities.",
];
const cur = j[slug] || {};
j[slug] = { ...cur, services, generatedCopy: { ...(cur.generatedCopy || {}), aboutBody } };
fs.writeFileSync(p, JSON.stringify(j, null, 2) + "\n");
console.log("wrote", services.length, "services + about");
