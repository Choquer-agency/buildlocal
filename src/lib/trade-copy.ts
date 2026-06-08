import type { BusinessProfile } from "@/content/businesses";

/**
 * Per-trade wording for the shared template's hardcoded UI strings (section
 * headings, area/service page intros, the "Why us" point, etc.). The bulk of a
 * site's copy is AI-written per business; this just keeps the structural strings
 * trade-correct across the 5 pillars. Falls back to landscaping when `trade` is
 * absent (the original landscaping batch has no `trade` field).
 */
export type TradeKey = "landscaping" | "roofing" | "hvac" | "pool" | "pest";

export interface TradeWords {
  /** lowercase service noun, e.g. "landscaping", "roofing", "HVAC service" */
  noun: string;
  /** Title-case lead word for the services marquee, e.g. "Landscaping" */
  lead: string;
  /** Services-section heading. */
  servicesHeading: (city: string) => string;
  /** Services-page intro sentence. */
  servicesIntro: (name: string, az: string) => string;
  /** About-page one-liner describing what they do. */
  aboutLine: (name: string, az: string) => string;
  /** Area-page H1 prefix, e.g. "Landscaping in {area}". */
  areaH1: (area: string, region: string) => string;
  /** Area-page body. */
  areaBody: (name: string, area: string, az: string) => string;
  /** Two "Why us" points (climate/quality + reliability). */
  whyPoints: (az: string) => { title: string; desc: string }[];
  /** Service-detail "Built for {az}" feature description. */
  builtForDesc: string;
}

const TRADES: Record<TradeKey, TradeWords> = {
  landscaping: {
    noun: "landscaping",
    lead: "Landscaping",
    servicesHeading: (city) => `Professional landscaping solutions for ${city} homes and businesses`,
    servicesIntro: (name, az) => `From design and installation to ongoing care, ${name} handles every part of your outdoor space — built for the ${az} climate.`,
    aboutLine: (name, az) => `${name} designs, installs, and maintains beautiful outdoor spaces built for the ${az} climate.`,
    areaH1: (area, region) => `Landscaping in ${area}, ${region}`,
    areaBody: (name, area, az) => `${name} proudly serves ${area} and the surrounding area with full-service landscaping — design, installation, and maintenance built for the ${az} climate.`,
    whyPoints: (az) => [
      { title: "Water-wise & built to last", desc: `Designs made for the ${az} climate that thrive year-round.` },
      { title: "Treated like our own yard", desc: "Honest, reliable crews who show up and take real pride in the work." },
    ],
    builtForDesc: "Materials and methods chosen to handle the desert heat and look great year-round.",
  },
  roofing: {
    noun: "roofing",
    lead: "Roofing",
    servicesHeading: (city) => `Trusted roofing solutions for ${city} homes and businesses`,
    servicesIntro: (name, az) => `From repairs and re-roofs to full replacements, ${name} protects every part of your roof — built to survive ${az} sun and monsoons.`,
    aboutLine: (name, az) => `${name} repairs, replaces, and protects roofs built to withstand the ${az} climate.`,
    areaH1: (area, region) => `Roofing in ${area}, ${region}`,
    areaBody: (name, area, az) => `${name} proudly serves ${area} and the surrounding area with roof repair, replacement, and re-roofing — built to survive ${az} heat and monsoon storms.`,
    whyPoints: (az) => [
      { title: "Built to survive AZ storms", desc: `Roofs engineered for the ${az} climate — relentless sun and monsoon season.` },
      { title: "Treated like our own home", desc: "Honest, reliable crews who show up, clean up, and stand behind every roof." },
    ],
    builtForDesc: "Materials and methods chosen to handle relentless sun, heat, and monsoon storms.",
  },
  hvac: {
    noun: "heating & cooling",
    lead: "Cooling",
    servicesHeading: (city) => `Reliable heating & cooling for ${city} homes and businesses`,
    servicesIntro: (name, az) => `From emergency AC repair to high-efficiency installs, ${name} keeps your home comfortable through every ${az} season.`,
    aboutLine: (name, az) => `${name} installs, repairs, and maintains heating and cooling systems built for ${az} extremes.`,
    areaH1: (area, region) => `HVAC & AC Repair in ${area}, ${region}`,
    areaBody: (name, area, az) => `${name} proudly serves ${area} and the surrounding area with AC repair, installation, and heating — keeping homes cool through brutal ${az} summers.`,
    whyPoints: (az) => [
      { title: "Comfort through AZ extremes", desc: `Systems sized for the ${az} climate to keep you cool in summer and warm at night.` },
      { title: "Treated like our own home", desc: "Honest techs who show up fast, diagnose straight, and never oversell." },
    ],
    builtForDesc: "Systems sized and installed to handle 115° summers while cutting energy bills.",
  },
  pool: {
    noun: "pool service",
    lead: "Pool",
    servicesHeading: (city) => `Dependable pool service & repair for ${city} homes`,
    servicesIntro: (name, az) => `From weekly service to equipment repair and remodels, ${name} keeps your pool crystal clear all ${az} year.`,
    aboutLine: (name, az) => `${name} keeps pools clean, balanced, and swim-ready through the ${az} season.`,
    areaH1: (area, region) => `Pool Service in ${area}, ${region}`,
    areaBody: (name, area, az) => `${name} proudly serves ${area} and the surrounding area with weekly pool service, repair, and remodeling — keeping pools swim-ready all ${az} year.`,
    whyPoints: (az) => [
      { title: "Swim-ready all season", desc: `Service dialed in for the ${az} climate — balanced water through the hottest months.` },
      { title: "Treated like our own pool", desc: "Dependable techs who never skip a visit and treat your pool like their own." },
    ],
    builtForDesc: "Service and equipment chosen to handle hard water, heat, and heavy desert use.",
  },
  pest: {
    noun: "pest control",
    lead: "Pest",
    servicesHeading: (city) => `Effective pest control for ${city} homes and businesses`,
    servicesIntro: (name, az) => `From scorpions and ants to termites and rodents, ${name} keeps your home protected through every ${az} season.`,
    aboutLine: (name, az) => `${name} keeps homes free of scorpions, ants, termites, and rodents across the ${az} desert.`,
    areaH1: (area, region) => `Pest Control in ${area}, ${region}`,
    areaBody: (name, area, az) => `${name} proudly serves ${area} and the surrounding area with general pest, scorpion, termite, and rodent control — safe, effective treatment for the ${az} desert.`,
    whyPoints: (az) => [
      { title: "Built for AZ pests", desc: `Treatment plans tuned to the ${az} desert — scorpions, ants, termites, and rodents.` },
      { title: "Family- & pet-safe", desc: "Family- and pet-safe treatment from pros who actually get rid of the problem." },
    ],
    builtForDesc: "Treatments chosen to handle the desert's relentless scorpions, ants, and rodents.",
  },
};

export function tradeWords(b: Pick<BusinessProfile, "trade">): TradeWords {
  return TRADES[(b.trade as TradeKey) || "landscaping"] || TRADES.landscaping;
}
