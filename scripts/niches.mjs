// Per-trade ("niche") config for the 5-pillar campaign.
//
// The template is trade-agnostic because extract-services.mjs reads each
// business's OWN website for real services + about. This config only supplies:
//   • the GMB search term (scrape-gmb.mjs)
//   • the default category label
//   • a FALLBACK service catalog + copy (only used for businesses with NO website)
//
// Pillars (100 each), in order: landscaping → roofing → hvac → pool → pest.
// Pass --niche=<key> to scrape-gmb.mjs / normalize.mjs (defaults to landscaping).

export const NICHES = {
  landscaping: {
    key: "landscaping",
    query: "landscaping",            // → "landscaping {city} AZ"
    category: "Landscaper",
    qrPrefix: "az",                  // existing batch uses az0001–az0500
    // fallback service catalog (no-website businesses only)
    catalog: [
      { name: "Landscape Design & Installation", slug: "landscape-design", image: "/demo/gardenbench.jpg", match: ["design", "architect", "landscaper"], blurb: "Custom desert landscape design and full installation built for the Arizona climate." },
      { name: "Xeriscaping & Desert Landscaping", slug: "xeriscaping", image: "/demo/cactus.jpg", match: ["landscaper", "rock", "desert", "artificial plant"], blurb: "Water-wise xeriscape designs that cut your water bill and survive the heat." },
      { name: "Artificial Turf Installation", slug: "artificial-turf", image: "/demo/grass.jpg", match: ["turf", "artificial", "lawn"], blurb: "Pet- and kid-friendly synthetic turf that stays green through every AZ summer." },
      { name: "Paver Patios & Hardscaping", slug: "hardscaping", image: "/demo/walkway.jpg", match: ["paver", "concrete", "mason", "hardscap", "pool"], blurb: "Paver patios, walkways, retaining walls, and outdoor living spaces." },
      { name: "Irrigation & Drip Systems", slug: "irrigation", image: "/demo/sprinkler.jpg", match: ["irrigation", "sprinkler"], blurb: "Smart irrigation install and repair to keep plants healthy and bills low." },
      { name: "Lawn & Yard Maintenance", slug: "maintenance", image: "/demo/lawn.jpg", match: ["lawn", "maintenance", "gardener", "tree"], blurb: "Reliable weekly and monthly maintenance to keep your property pristine." },
    ],
    stockPool: ["/demo/flowers.jpg", "/demo/walkway.jpg", "/demo/cactus.jpg", "/demo/paverpath.jpg", "/demo/agave.jpg", "/demo/grass.jpg", "/demo/gardenbench.jpg", "/demo/lawn.jpg", "/demo/hero.jpg"],
    copy: {
      tagline: "Landscaping & Lawn Experts",
      h1: (loc) => `${loc}'s Trusted Landscaping & Lawn Experts`,
      subhead: (name, loc, rating, rc) => `${name} designs, installs, and maintains beautiful, water-wise outdoor spaces across ${loc} — backed by ${rc} reviews and a ${rating}-star reputation.`,
      aboutHeading: (loc) => `Locally trusted landscaping in ${loc}`,
      aboutBody: (name, loc) => [
        `${name} helps ${loc} homeowners turn ordinary yards into outdoor spaces they love. We specialize in low-water, high-impact landscaping built for the Arizona climate.`,
        `Every project starts with listening — we learn how you want to use your space and your budget, then design something that fits. Honest work from a crew that shows up when they say they will.`,
      ],
      areaBlurb: (loc) => `Proudly serving ${loc} and the surrounding area with full-service landscaping, xeriscaping, artificial turf, and yard maintenance.`,
      ctaHeadline: "Ready for a yard you'll love coming home to?",
      ctaSubhead: "Get a free, no-pressure quote. We'll walk your property, listen to what you want, and give you an honest estimate.",
      metaTitle: (name, loc) => `${name} | Landscaping in ${loc}, AZ`,
      metaDescription: (loc, rating, rc) => `Professional landscaping, xeriscaping & artificial turf in ${loc}, AZ. ${rating}★ from ${rc} reviews. Free quotes.`,
    },
  },

  roofing: {
    key: "roofing",
    query: "roofing contractor",
    category: "Roofing Contractor",
    qrPrefix: "ro",
    catalog: [
      { name: "Roof Replacement", slug: "roof-replacement", match: ["replac", "install", "new roof"], blurb: "Full tear-off and replacement with shingle, tile, or foam roofing built for the desert sun." },
      { name: "Roof Repair", slug: "roof-repair", match: ["repair", "leak"], blurb: "Fast leak detection and lasting repairs that protect your home from monsoon damage." },
      { name: "Tile Roofing", slug: "tile-roofing", match: ["tile"], blurb: "Concrete and clay tile roofing — the Arizona standard for durability and curb appeal." },
      { name: "Shingle Roofing", slug: "shingle-roofing", match: ["shingle", "asphalt"], blurb: "Architectural asphalt shingles installed to last decades in extreme heat." },
      { name: "Flat & Foam Roofing", slug: "foam-roofing", match: ["flat", "foam", "coating"], blurb: "Spray-foam and coated flat roofs that reflect heat and seal out leaks." },
      { name: "Roof Inspections", slug: "roof-inspection", match: ["inspect", "maintenance"], blurb: "Free, no-obligation inspections with honest photo documentation of every issue." },
    ],
    stockPool: [],
    copy: {
      tagline: "Roofing Contractors",
      h1: (loc) => `${loc}'s Trusted Roofing Contractors`,
      subhead: (name, loc, rating, rc) => `${name} repairs, replaces, and protects roofs across ${loc} — built to survive Arizona heat and monsoons, backed by ${rc} reviews and a ${rating}-star reputation.`,
      aboutHeading: (loc) => `Locally trusted roofing in ${loc}`,
      aboutBody: (name, loc) => [
        `${name} protects ${loc} homes with roofing built for the harshest climate in the country — relentless sun, monsoon storms, and triple-digit summers. From tile and shingle to flat foam roofs, we install and repair it right the first time.`,
        `We start with an honest inspection and a clear, written estimate — no scare tactics, no surprises. Licensed, insured, and backed by a crew that stands behind every roof we touch.`,
      ],
      areaBlurb: (loc) => `Proudly serving ${loc} and the surrounding area with roof replacement, repair, tile, shingle, and flat-roof services.`,
      ctaHeadline: "Worried about your roof? Let's take a look.",
      ctaSubhead: "Get a free roof inspection and honest estimate. We'll document every issue with photos — no pressure, no scare tactics.",
      metaTitle: (name, loc) => `${name} | Roofing Contractor in ${loc}, AZ`,
      metaDescription: (loc, rating, rc) => `Roof replacement, repair, tile & shingle roofing in ${loc}, AZ. ${rating}★ from ${rc} reviews. Free inspections.`,
    },
  },

  hvac: {
    key: "hvac",
    query: "hvac contractor",
    category: "HVAC Contractor",
    qrPrefix: "hv",
    catalog: [
      { name: "AC Repair", slug: "ac-repair", match: ["repair", "air condition"], blurb: "Same-day AC repair to get your home cool again fast when the desert heat hits." },
      { name: "AC Installation & Replacement", slug: "ac-installation", match: ["install", "replac"], blurb: "High-efficiency AC systems sized and installed right to slash your summer bills." },
      { name: "Heating & Furnace", slug: "heating", match: ["heat", "furnace"], blurb: "Heating install, repair, and tune-ups to keep you comfortable on cold desert nights." },
      { name: "AC Tune-Ups & Maintenance", slug: "maintenance", match: ["maintenance", "tune", "service"], blurb: "Seasonal maintenance plans that prevent breakdowns and extend system life." },
      { name: "Indoor Air Quality", slug: "air-quality", match: ["air quality", "duct", "filter"], blurb: "Air purification, duct cleaning, and filtration for a healthier home." },
      { name: "Heat Pumps", slug: "heat-pumps", match: ["heat pump", "mini split", "ductless"], blurb: "Energy-efficient heat pumps and ductless mini-splits for year-round comfort." },
    ],
    stockPool: [],
    copy: {
      tagline: "Heating & Cooling Experts",
      h1: (loc) => `${loc}'s Trusted Heating & Cooling Experts`,
      subhead: (name, loc, rating, rc) => `${name} keeps ${loc} homes cool through brutal summers and comfortable year-round — fast AC repair, install, and maintenance, backed by ${rc} reviews and a ${rating}-star reputation.`,
      aboutHeading: (loc) => `Locally trusted heating & cooling in ${loc}`,
      aboutBody: (name, loc) => [
        `In ${loc}, your AC isn't a luxury — it's survival. ${name} keeps homes cool through 115° summers with fast, reliable repair and high-efficiency installs that cut energy bills instead of inflating them.`,
        `We show up on time, diagnose honestly, and quote upfront — no overselling a new system when a repair will do. Licensed, insured, and ready when you need us most.`,
      ],
      areaBlurb: (loc) => `Proudly serving ${loc} and the surrounding area with AC repair, installation, heating, and maintenance.`,
      ctaHeadline: "AC trouble? We'll get you cool — fast.",
      ctaSubhead: "Get a free estimate or same-day service. Honest diagnosis, upfront pricing, no upselling.",
      metaTitle: (name, loc) => `${name} | HVAC & AC Repair in ${loc}, AZ`,
      metaDescription: (loc, rating, rc) => `AC repair, installation & heating in ${loc}, AZ. ${rating}★ from ${rc} reviews. Same-day service, free estimates.`,
    },
  },

  pool: {
    key: "pool",
    query: "pool service and repair",
    category: "Swimming Pool Contractor",
    qrPrefix: "pl",
    catalog: [
      { name: "Weekly Pool Service", slug: "pool-service", match: ["service", "cleaning", "maintenance"], blurb: "Reliable weekly cleaning and chemical balancing so your pool is always swim-ready." },
      { name: "Pool Repair", slug: "pool-repair", match: ["repair"], blurb: "Pumps, filters, heaters, and plumbing repaired fast by certified technicians." },
      { name: "Equipment Installation", slug: "equipment", match: ["equipment", "pump", "filter", "heater"], blurb: "Energy-efficient pumps, filters, and heaters installed to lower your costs." },
      { name: "Pool Remodeling", slug: "remodeling", match: ["remodel", "resurfac", "renovat"], blurb: "Resurfacing, tile, and deck remodels that make an old pool look brand new." },
      { name: "Green-to-Clean", slug: "green-to-clean", match: ["green", "acid", "drain"], blurb: "Green, neglected pools restored to crystal clear — fast." },
      { name: "Pool Inspections", slug: "inspection", match: ["inspect"], blurb: "Thorough pre-purchase and seasonal inspections with a clear written report." },
    ],
    stockPool: [],
    copy: {
      tagline: "Pool Service & Repair Experts",
      h1: (loc) => `${loc}'s Trusted Pool Service & Repair`,
      subhead: (name, loc, rating, rc) => `${name} keeps ${loc} pools crystal clear and swim-ready all year — weekly service, repair, and remodels, backed by ${rc} reviews and a ${rating}-star reputation.`,
      aboutHeading: (loc) => `Locally trusted pool care in ${loc}`,
      aboutBody: (name, loc) => [
        `A pool is the heart of an Arizona backyard — when it's running right. ${name} keeps ${loc} pools clean, balanced, and swim-ready year-round, with honest repair and maintenance you can set and forget.`,
        `No skipped visits, no mystery charges — just dependable techs who treat your pool like their own. Weekly service, equipment repair, and full remodels, all under one trusted local team.`,
      ],
      areaBlurb: (loc) => `Proudly serving ${loc} and the surrounding area with weekly pool service, repair, equipment, and remodeling.`,
      ctaHeadline: "Ready for a pool that's always swim-ready?",
      ctaSubhead: "Get a free quote on weekly service or repair. Dependable techs, upfront pricing, no skipped visits.",
      metaTitle: (name, loc) => `${name} | Pool Service & Repair in ${loc}, AZ`,
      metaDescription: (loc, rating, rc) => `Weekly pool service, repair & remodeling in ${loc}, AZ. ${rating}★ from ${rc} reviews. Free quotes.`,
    },
  },

  pest: {
    key: "pest",
    query: "pest control",
    category: "Pest Control Service",
    qrPrefix: "pc",
    catalog: [
      { name: "General Pest Control", slug: "pest-control", match: ["pest", "general", "insect"], blurb: "Recurring treatment that keeps ants, roaches, crickets, and spiders out for good." },
      { name: "Scorpion Control", slug: "scorpion-control", match: ["scorpion"], blurb: "Specialized scorpion treatment and sealing — the Arizona homeowner's #1 worry, solved." },
      { name: "Termite Control", slug: "termite-control", match: ["termite"], blurb: "Inspections, treatment, and prevention that protect your biggest investment." },
      { name: "Rodent Control", slug: "rodent-control", match: ["rodent", "mice", "rat"], blurb: "Humane trapping, exclusion, and sealing to keep rodents out of your home." },
      { name: "Bed Bug Treatment", slug: "bed-bug", match: ["bed bug", "bedbug"], blurb: "Discreet, thorough bed-bug elimination with guaranteed follow-up." },
      { name: "Weed & Bee Control", slug: "weed-bee", match: ["weed", "bee", "wasp"], blurb: "Weed control and safe bee/wasp removal to keep your yard usable." },
    ],
    stockPool: [],
    copy: {
      tagline: "Pest Control Experts",
      h1: (loc) => `${loc}'s Trusted Pest Control Experts`,
      subhead: (name, loc, rating, rc) => `${name} keeps ${loc} homes free of scorpions, ants, termites, and rodents — safe, effective treatment backed by ${rc} reviews and a ${rating}-star reputation.`,
      aboutHeading: (loc) => `Locally trusted pest control in ${loc}`,
      aboutBody: (name, loc) => [
        `Arizona pests are relentless — scorpions, ants, crickets, termites, and rodents all want into your home. ${name} keeps ${loc} families protected with safe, effective treatment that actually works, season after season.`,
        `We use family- and pet-safe products, show up on schedule, and stand behind every treatment with free re-services between visits. Honest local pros who get rid of the problem and keep it gone.`,
      ],
      areaBlurb: (loc) => `Proudly serving ${loc} and the surrounding area with general pest, scorpion, termite, and rodent control.`,
      ctaHeadline: "Pests taking over? Take your home back.",
      ctaSubhead: "Get a free quote on a treatment plan. Family- and pet-safe, with free re-services between visits.",
      metaTitle: (name, loc) => `${name} | Pest Control in ${loc}, AZ`,
      metaDescription: (loc, rating, rc) => `Scorpion, ant, termite & rodent control in ${loc}, AZ. ${rating}★ from ${rc} reviews. Free quotes, safe treatment.`,
    },
  },
};

export function getNiche(key) {
  const n = NICHES[(key || "landscaping").toLowerCase()];
  if (!n) {
    console.error(`Unknown niche "${key}". Options: ${Object.keys(NICHES).join(", ")}`);
    process.exit(1);
  }
  return n;
}

export function nicheArg(argv, name = "niche", def = "landscaping") {
  const hit = argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=")[1] : def;
}
