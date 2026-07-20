import { BusinessProfile } from "./businesses";

/**
 * Hand-edited touch-ups, applied ON TOP of the auto-generated data and never
 * overwritten by the pipeline. This is where per-business edits live:
 * logo, swapped photos, font, and copy tweaks. (Brand COLOR is set separately
 * via the CRM color control → stored in Convex.)
 *
 * Deep-merged: `generatedCopy` and `address` merge field-by-field; arrays
 * (photos, services) replace wholesale when provided.
 *
 * Key = business slug. Example:
 *   "acme-landscaping": {
 *     logo: "/biz-photos/acme-landscaping/logo.webp",
 *     fontKey: "serif",
 *     photos: ["/biz-photos/acme-landscaping/1.webp", "/biz-photos/acme-landscaping/2.webp"],
 *     generatedCopy: { heroH1: "Scottsdale's Premier Desert Landscapers" },
 *   },
 */
import assetOverrides from "./asset-overrides.json";

export type BusinessOverride = Partial<Omit<BusinessProfile, "generatedCopy" | "address">> & {
  generatedCopy?: Partial<BusinessProfile["generatedCopy"]>;
  address?: Partial<BusinessProfile["address"]>;
};

type OverrideService = { name: string; slug: string; blurb: string };

function pestPhotoOverride(slug: string, services: OverrideService[]): BusinessOverride {
  const imageFor = (service: OverrideService) => {
    const label = `${service.name} ${service.slug}`.toLowerCase();
    if (label.includes("termite")) return "/biz-photos/pest-shared/termite.webp";
    if (label.includes("rodent") || label.includes("gopher")) return "/biz-photos/pest-shared/rodent.webp";
    if (label.includes("scorpion")) return "/biz-photos/pest-shared/scorpion.webp";
    if (label.includes("mosquito")) return "/biz-photos/pest-shared/mosquito.webp";
    if (label.includes("weed") || label.includes("lawn")) return "/biz-photos/pest-shared/weed.webp";
    if (label.includes("bed bug")) return "/biz-photos/pest-shared/bedbug.webp";
    if (label.includes("commercial")) return "/biz-photos/pest-shared/commercial.webp";
    return "/biz-photos/pest-shared/general.webp";
  };
  const boundServices = services.map((service) => ({ ...service, image: imageFor(service) }));
  return {
    showAllServices: true,
    photos: [`/biz-photos/${slug}/hero.webp`, ...Array.from(new Set(boundServices.map((service) => service.image)))],
    services: boundServices,
  };
}

/**
 * MANUAL touch-ups (copy, font, services, name). Edit this object by hand.
 * Image/logo paths are managed automatically in asset-overrides.json by
 * scripts/process-assets.mjs — both are merged below (manual wins on conflict).
 */
const pestServiceOverrides = (slug: string): BusinessProfile["services"] => [
  { name: "General Pest Control", slug: "pest-control", image: `/biz-photos/${slug}/pest-control.webp`, blurb: "Targeted exterior and interior pest control for common household insects and spiders." },
  { name: "Scorpion Control", slug: "scorpion-control", image: `/biz-photos/${slug}/scorpion-control.webp`, blurb: "Focused inspection and treatment designed for scorpions around Arizona homes." },
  { name: "Termite Control", slug: "termite-control", image: `/biz-photos/${slug}/termite-control.webp`, blurb: "Termite inspection and treatment to address active colonies and protect the property." },
  { name: "Rodent Control", slug: "rodent-control", image: `/biz-photos/${slug}/rodent-control.webp`, blurb: "Rodent removal and exclusion work that addresses entry points and recurring activity." },
  { name: "Bed Bug Treatment", slug: "bed-bug", image: `/biz-photos/${slug}/bed-bug.webp`, blurb: "Detailed bed bug inspection and treatment for affected sleeping and living areas." },
  { name: "Weed & Bee Control", slug: "weed-bee", image: `/biz-photos/${slug}/weed-bee.webp`, blurb: "Targeted weed management and careful control of problematic bee activity around the property." },
];

const pestPhotos = (slug: string): string[] => [
  `/biz-photos/${slug}/hero.webp`,
  `/biz-photos/${slug}/pest-control.webp`,
  `/biz-photos/${slug}/scorpion-control.webp`,
  `/biz-photos/${slug}/termite-control.webp`,
  `/biz-photos/${slug}/rodent-control.webp`,
  `/biz-photos/${slug}/bed-bug.webp`,
  `/biz-photos/${slug}/weed-bee.webp`,
];

const manual: Record<string, BusinessOverride> = {
  // pc0011-pc0020 — original Arizona heroes plus a compatible pest-specialty photo library.
  "eco-valley-pest-control": {
    photos: ["/biz-photos/eco-valley-pest-control/hero-original.webp", "/biz-photos/eco-valley-pest-control/general.webp", "/biz-photos/eco-valley-pest-control/termite.webp", "/biz-photos/eco-valley-pest-control/mosquito.webp", "/biz-photos/eco-valley-pest-control/wildlife.webp"],
    services: [
      { name: "Pest Control & Exterminator", slug: "pest-control", image: "/biz-photos/eco-valley-pest-control/general.webp", blurb: "Targeted residential pest service designed around Arizona homes and common Valley invaders." },
      { name: "Termite Inspections & Treatment", slug: "termite-control", image: "/biz-photos/eco-valley-pest-control/termite.webp", blurb: "Detailed termite inspections and appropriate treatment recommendations protect vulnerable wood and foundations." },
      { name: "Mosquito Control", slug: "mosquito-control", image: "/biz-photos/eco-valley-pest-control/mosquito.webp", blurb: "Focused mosquito treatments reduce activity around patios, landscaping, and outdoor living areas." },
      { name: "Wildlife Removal & Control", slug: "wildlife-control", image: "/biz-photos/eco-valley-pest-control/wildlife.webp", blurb: "Humane wildlife removal and exclusion helps prevent animals from returning to rooflines and structures." },
      { name: "Emergency Pest Control", slug: "emergency-pest-control", image: "/biz-photos/eco-valley-pest-control/general.webp", blurb: "Responsive help for urgent pest problems that cannot wait for a routine appointment." },
    ],
  },
  "rainbow-pest-control": {
    photos: ["/biz-photos/rainbow-pest-control/hero-original.webp", "/biz-photos/rainbow-pest-control/ant.webp", "/biz-photos/rainbow-pest-control/scorpion.webp", "/biz-photos/rainbow-pest-control/rodent.webp"],
    services: [
      { name: "Ant Control", slug: "ant-control", image: "/biz-photos/rainbow-pest-control/ant.webp", blurb: "Precise ant identification and treatment addresses trails, entry points, and nesting activity." },
      { name: "Scorpion Control", slug: "scorpion-control", image: "/biz-photos/rainbow-pest-control/scorpion.webp", blurb: "Arizona-focused inspection and treatment reduces scorpion activity around the home and yard." },
      { name: "Rodent Control", slug: "rodent-control", image: "/biz-photos/rainbow-pest-control/rodent.webp", blurb: "Rodent control combines inspection, exclusion, and monitored solutions for lasting protection." },
    ],
  },
  "greenleaf-pest-control-mesa": {
    photos: ["/biz-photos/greenleaf-pest-control-mesa/hero-original.webp", "/biz-photos/greenleaf-pest-control-mesa/general.webp", "/biz-photos/greenleaf-pest-control-mesa/scorpion.webp", "/biz-photos/greenleaf-pest-control-mesa/termite.webp", "/biz-photos/greenleaf-pest-control-mesa/rodent.webp", "/biz-photos/greenleaf-pest-control-mesa/weed.webp"],
    services: [
      { name: "Pest Control", slug: "pest-control", image: "/biz-photos/greenleaf-pest-control-mesa/general.webp", blurb: "Ongoing home protection targets common Arizona pests at entry points and harborage areas." },
      { name: "Scorpion Control", slug: "scorpion-control", image: "/biz-photos/greenleaf-pest-control-mesa/scorpion.webp", blurb: "Detailed scorpion inspections and targeted service reduce activity around foundations and block walls." },
      { name: "Termite Control", slug: "termite-control", image: "/biz-photos/greenleaf-pest-control-mesa/termite.webp", blurb: "Inspection and treatment options address subterranean termite pressure around Mesa properties." },
      { name: "Rodent Control", slug: "rodent-control", image: "/biz-photos/greenleaf-pest-control-mesa/rodent.webp", blurb: "Inspection, exclusion, and monitoring help remove rodents and limit future entry." },
      { name: "Weed Control", slug: "weed-control", image: "/biz-photos/greenleaf-pest-control-mesa/weed.webp", blurb: "Precision weed service controls unwanted growth in desert gravel and landscaped areas." },
    ],
  },
  "orange-pest-control": {
    photos: ["/biz-photos/orange-pest-control/hero-original.webp", "/biz-photos/orange-pest-control/scorpion.webp", "/biz-photos/orange-pest-control/termite.webp", "/biz-photos/orange-pest-control/ant.webp", "/biz-photos/orange-pest-control/spider.webp", "/biz-photos/orange-pest-control/rodent.webp", "/biz-photos/orange-pest-control/bee-wasp.webp"],
    services: [
      { name: "Scorpion Control", slug: "scorpion-control", image: "/biz-photos/orange-pest-control/scorpion.webp", blurb: "Targeted Arizona scorpion service focuses on hiding places, access points, and exterior pressure." },
      { name: "Termite Services", slug: "termite-services", image: "/biz-photos/orange-pest-control/termite.webp", blurb: "Thorough inspections and property-appropriate termite treatments protect structures from hidden damage." },
      { name: "Ant Control", slug: "ant-control", image: "/biz-photos/orange-pest-control/ant.webp", blurb: "Focused ant treatments address active trails and colonies rather than surface activity alone." },
      { name: "Spider Control", slug: "spider-control", image: "/biz-photos/orange-pest-control/spider.webp", blurb: "Web removal and targeted service reduce spiders around eaves, patios, garages, and entryways." },
      { name: "Rodent Control", slug: "rodent-control", image: "/biz-photos/orange-pest-control/rodent.webp", blurb: "Rodent inspection, exclusion, and monitoring protect homes from recurring activity." },
      { name: "Bee & Wasp Removal", slug: "bee-wasp-removal", image: "/biz-photos/orange-pest-control/bee-wasp.webp", blurb: "Careful bee and wasp removal addresses nests around rooflines and outdoor living areas." },
    ],
  },
  "bulwark-exterminating": {
    photos: ["/biz-photos/bulwark-exterminating/hero-original.webp", "/biz-photos/bulwark-exterminating/general.webp", "/biz-photos/bulwark-exterminating/termite.webp", "/biz-photos/bulwark-exterminating/mosquito.webp", "/biz-photos/bulwark-exterminating/scorpion.webp", "/biz-photos/bulwark-exterminating/seal-wall.webp", "/biz-photos/bulwark-exterminating/rodent.webp"],
    services: [
      { name: "Pest Control", slug: "pest-control", image: "/biz-photos/bulwark-exterminating/general.webp", blurb: "Comprehensive exterior and interior pest protection for common Mesa-area invaders." },
      { name: "Termite Control", slug: "termite-control", image: "/biz-photos/bulwark-exterminating/termite.webp", blurb: "Termite inspection and treatment helps protect slabs, foundations, and structural wood." },
      { name: "Mosquito Control", slug: "mosquito-control", image: "/biz-photos/bulwark-exterminating/mosquito.webp", blurb: "Outdoor mosquito service targets shaded resting zones and breeding conditions." },
      { name: "Scorpion Control", slug: "scorpion-control", image: "/biz-photos/bulwark-exterminating/scorpion.webp", blurb: "Specialized scorpion treatment addresses the pest and conditions that support its prey." },
      { name: "Scorpion Wall", slug: "scorpion-wall", image: "/biz-photos/bulwark-exterminating/seal-wall.webp", blurb: "Physical sealing and exclusion closes common gaps scorpions use to enter the home." },
      { name: "Rodent Control", slug: "rodent-control", image: "/biz-photos/bulwark-exterminating/rodent.webp", blurb: "Rodent service combines inspection, entry-point closure, and monitored control." },
    ],
  },
  "fromms-pest-control": {
    photos: ["/biz-photos/fromms-pest-control/hero-original.webp", "/biz-photos/fromms-pest-control/general.webp", "/biz-photos/fromms-pest-control/termite.webp", "/biz-photos/fromms-pest-control/mosquito.webp", "/biz-photos/fromms-pest-control/weed.webp", "/biz-photos/fromms-pest-control/rodent.webp", "/biz-photos/fromms-pest-control/scorpion.webp"],
    services: [
      { name: "Pest Control", slug: "pest-control", image: "/biz-photos/fromms-pest-control/general.webp", blurb: "Practical home pest protection targets active problems and common entry points." },
      { name: "Termite Control", slug: "termite-control", image: "/biz-photos/fromms-pest-control/termite.webp", blurb: "Termite inspection and treatment protects Arizona properties from concealed structural damage." },
      { name: "Mosquito Control", slug: "mosquito-control", image: "/biz-photos/fromms-pest-control/mosquito.webp", blurb: "Focused outdoor treatment helps reduce mosquito activity where families relax and gather." },
      { name: "Weed Control", slug: "weed-control", image: "/biz-photos/fromms-pest-control/weed.webp", blurb: "Targeted weed applications control growth in gravel, hardscape joints, and landscaped areas." },
      { name: "Rodent Control", slug: "rodent-control", image: "/biz-photos/fromms-pest-control/rodent.webp", blurb: "Inspection, exclusion, and monitoring address rodents while limiting future access." },
      { name: "Scorpion Control", slug: "scorpion-control", image: "/biz-photos/fromms-pest-control/scorpion.webp", blurb: "Arizona-specific scorpion service focuses on hiding areas, prey pressure, and entry routes." },
    ],
  },
  "arizona-s-best-choice-pest-and-termite-services-mesa": {
    photos: ["/biz-photos/arizona-s-best-choice-pest-and-termite-services-mesa/hero-original.webp", "/biz-photos/arizona-s-best-choice-pest-and-termite-services-mesa/termite.webp", "/biz-photos/arizona-s-best-choice-pest-and-termite-services-mesa/weed.webp", "/biz-photos/arizona-s-best-choice-pest-and-termite-services-mesa/mosquito.webp", "/biz-photos/arizona-s-best-choice-pest-and-termite-services-mesa/rodent.webp", "/biz-photos/arizona-s-best-choice-pest-and-termite-services-mesa/ant.webp", "/biz-photos/arizona-s-best-choice-pest-and-termite-services-mesa/commercial.webp"],
    services: [
      { name: "Termite Control", slug: "termite-control", image: "/biz-photos/arizona-s-best-choice-pest-and-termite-services-mesa/termite.webp", blurb: "Detailed inspections and treatment options address Arizona termite activity around structures." },
      { name: "Weed Control", slug: "weed-control", image: "/biz-photos/arizona-s-best-choice-pest-and-termite-services-mesa/weed.webp", blurb: "Precision weed control keeps desert lots, gravel, and hardscape areas looking maintained." },
      { name: "Mosquito Control", slug: "mosquito-control", image: "/biz-photos/arizona-s-best-choice-pest-and-termite-services-mesa/mosquito.webp", blurb: "Outdoor mosquito treatments reduce activity around landscaping and gathering spaces." },
      { name: "Rodent Control", slug: "rodent-control", image: "/biz-photos/arizona-s-best-choice-pest-and-termite-services-mesa/rodent.webp", blurb: "Rodent inspection and exclusion address active problems and vulnerable access points." },
      { name: "Ant Control", slug: "ant-control", image: "/biz-photos/arizona-s-best-choice-pest-and-termite-services-mesa/ant.webp", blurb: "Targeted ant control treats trails and colony sources around the property." },
      { name: "Commercial Services", slug: "commercial-services", image: "/biz-photos/arizona-s-best-choice-pest-and-termite-services-mesa/commercial.webp", blurb: "Discreet, planned pest service supports clean and protected commercial environments." },
    ],
  },
  "defense-pest-control": {
    photos: ["/biz-photos/defense-pest-control/hero-original.webp", "/biz-photos/defense-pest-control/scorpion.webp", "/biz-photos/defense-pest-control/termite.webp", "/biz-photos/defense-pest-control/roach.webp", "/biz-photos/defense-pest-control/spider.webp", "/biz-photos/defense-pest-control/ant.webp", "/biz-photos/defense-pest-control/weed.webp"],
    services: [
      { name: "Scorpion Control", slug: "scorpion-control", image: "/biz-photos/defense-pest-control/scorpion.webp", blurb: "Detailed nighttime inspection and targeted barriers reduce scorpion activity around Arizona homes." },
      { name: "Termite Control", slug: "termite-control", image: "/biz-photos/defense-pest-control/termite.webp", blurb: "Property-specific termite inspection and treatment protects foundations and structural materials." },
      { name: "Roach Control", slug: "roach-control", image: "/biz-photos/defense-pest-control/roach.webp", blurb: "Focused cockroach treatment addresses hiding places, moisture sources, and interior activity." },
      { name: "Spider Control", slug: "spider-control", image: "/biz-photos/defense-pest-control/spider.webp", blurb: "Web removal and targeted service reduce spiders at eaves, patios, and entryways." },
      { name: "Ant Control", slug: "ant-control", image: "/biz-photos/defense-pest-control/ant.webp", blurb: "Ant identification and precise treatment address trails and nesting sites." },
      { name: "Weed Control", slug: "weed-control", image: "/biz-photos/defense-pest-control/weed.webp", blurb: "Controlled spot treatments manage unwanted weeds in desert landscaping." },
    ],
  },
  "ecoguard-pest-control": {
    photos: ["/biz-photos/ecoguard-pest-control/hero-original.webp", "/biz-photos/ecoguard-pest-control/termite.webp", "/biz-photos/ecoguard-pest-control/rodent.webp", "/biz-photos/ecoguard-pest-control/roach.webp", "/biz-photos/ecoguard-pest-control/mosquito.webp", "/biz-photos/ecoguard-pest-control/seal-wall.webp", "/biz-photos/ecoguard-pest-control/bed-bug.webp"],
    services: [
      { name: "Termites & Warranty", slug: "termite-control", image: "/biz-photos/ecoguard-pest-control/termite.webp", blurb: "Termite inspection, treatment, and continuing protection options help safeguard the structure." },
      { name: "Rodents", slug: "rodent-control", image: "/biz-photos/ecoguard-pest-control/rodent.webp", blurb: "Rodent control pairs removal and monitoring with careful exclusion of entry points." },
      { name: "Cockroaches", slug: "cockroach-control", image: "/biz-photos/ecoguard-pest-control/roach.webp", blurb: "Targeted cockroach service treats harborages and conditions that support indoor activity." },
      { name: "Mosquitoes", slug: "mosquito-control", image: "/biz-photos/ecoguard-pest-control/mosquito.webp", blurb: "Outdoor treatments reduce mosquito pressure around patios and landscape resting zones." },
      { name: "Scorpion Seals", slug: "scorpion-seals", image: "/biz-photos/ecoguard-pest-control/seal-wall.webp", blurb: "Detailed exclusion closes gaps and penetrations scorpions can use to enter the home." },
      { name: "Bed Bugs", slug: "bed-bug-control", image: "/biz-photos/ecoguard-pest-control/bed-bug.webp", blurb: "Careful inspection and a defined treatment plan address bed bug activity in sleeping areas." },
    ],
  },
  "varsity-termite-and-pest-control": {
    photos: ["/biz-photos/varsity-termite-and-pest-control/hero-original.webp", "/biz-photos/varsity-termite-and-pest-control/termite.webp", "/biz-photos/varsity-termite-and-pest-control/scorpion.webp", "/biz-photos/varsity-termite-and-pest-control/pigeon.webp", "/biz-photos/varsity-termite-and-pest-control/spider.webp", "/biz-photos/varsity-termite-and-pest-control/bee-wasp.webp", "/biz-photos/varsity-termite-and-pest-control/roach.webp"],
    services: [
      { name: "Termite Control", slug: "termite-control", image: "/biz-photos/varsity-termite-and-pest-control/termite.webp", blurb: "Termite inspection and treatment addresses hidden activity around slabs and structural wood." },
      { name: "Scorpion Control", slug: "scorpion-control", image: "/biz-photos/varsity-termite-and-pest-control/scorpion.webp", blurb: "Arizona-focused inspection and treatment reduces scorpions around homes and yards." },
      { name: "Pigeon Control", slug: "pigeon-control", image: "/biz-photos/varsity-termite-and-pest-control/pigeon.webp", blurb: "Humane exclusion discourages pigeons from nesting beneath roof and solar-panel edges." },
      { name: "Spider Control", slug: "spider-control", image: "/biz-photos/varsity-termite-and-pest-control/spider.webp", blurb: "Web removal and targeted treatment manage spider activity around the structure." },
      { name: "Bee & Wasp Removal", slug: "bee-wasp-removal", image: "/biz-photos/varsity-termite-and-pest-control/bee-wasp.webp", blurb: "Protected removal handles nests at eaves and outdoor living areas carefully." },
      { name: "Cockroach Extermination", slug: "cockroach-extermination", image: "/biz-photos/varsity-termite-and-pest-control/roach.webp", blurb: "Focused cockroach treatment addresses active harborages and likely access routes." },
    ],
  },
  // pc0021–pc0030 — verified pest-service lineup with a distinct hero per business.
  "aloe-pest-control": {
    photos: pestPhotos("aloe-pest-control"),
    services: pestServiceOverrides("aloe-pest-control"),
  },
  "raptor-pest-solutions": {
    photos: pestPhotos("raptor-pest-solutions"),
    services: pestServiceOverrides("raptor-pest-solutions"),
  },
  "cape-pest-control": {
    photos: pestPhotos("cape-pest-control"),
    services: pestServiceOverrides("cape-pest-control"),
  },
  "iron-mantis-pest-control": {
    photos: pestPhotos("iron-mantis-pest-control"),
    services: pestServiceOverrides("iron-mantis-pest-control"),
  },
  "simply-green-pest-control": {
    photos: pestPhotos("simply-green-pest-control"),
    services: pestServiceOverrides("simply-green-pest-control"),
  },
  "green-magic-pest-control": {
    photos: pestPhotos("green-magic-pest-control"),
    services: pestServiceOverrides("green-magic-pest-control"),
  },
  "responsible-pest-and-scorpion-control": {
    photos: pestPhotos("responsible-pest-and-scorpion-control"),
    services: pestServiceOverrides("responsible-pest-and-scorpion-control"),
  },
  "green-home-pest-control-chandler": {
    photos: pestPhotos("green-home-pest-control-chandler"),
    services: pestServiceOverrides("green-home-pest-control-chandler"),
  },
  "arizona-termite-and-pest-solutions": {
    photos: pestPhotos("arizona-termite-and-pest-solutions"),
    services: pestServiceOverrides("arizona-termite-and-pest-solutions"),
  },
  "pro-active-pest-control": {
    photos: pestPhotos("pro-active-pest-control"),
    services: pestServiceOverrides("pro-active-pest-control"),
  },
  // pc0001–pc0010 pest-control image pass: unique heroes plus a vetted, specialty-matched service library.
  "urban-desert-pest-control": {
    photos: ["/biz-photos/urban-desert-pest-control/hero.webp", "/biz-photos/urban-desert-pest-control/termite-control.webp", "/biz-photos/urban-desert-pest-control/rodent-control.webp", "/biz-photos/urban-desert-pest-control/scorpion-control.webp", "/biz-photos/urban-desert-pest-control/mosquito-control.webp", "/biz-photos/urban-desert-pest-control/weed-treatment.webp", "/biz-photos/urban-desert-pest-control/bed-bug-control.webp"],
    services: [
      { name: "Termite Control", slug: "termite-control", image: "/biz-photos/urban-desert-pest-control/termite-control.webp", blurb: "Comprehensive termite treatment designed to protect your home from hidden structural damage." },
      { name: "Rodent Control", slug: "rodent-control", image: "/biz-photos/urban-desert-pest-control/rodent-control.webp", blurb: "Rodent removal, entry-point identification, and prevention to help keep rats and mice from returning." },
      { name: "Scorpion Control", slug: "scorpion-control", image: "/biz-photos/urban-desert-pest-control/scorpion-control.webp", blurb: "Targeted Arizona scorpion control focused on harborage areas, entry points, and exterior protection." },
      { name: "Mosquito Control", slug: "mosquito-control", image: "/biz-photos/urban-desert-pest-control/mosquito-control.webp", blurb: "Outdoor mosquito treatments that target resting and breeding areas so your yard is easier to enjoy." },
      { name: "Weed Treatment", slug: "weed-treatment", image: "/biz-photos/urban-desert-pest-control/weed-treatment.webp", blurb: "Professional weed treatment for cleaner, lower-maintenance Phoenix yards and decorative gravel." },
      { name: "Bed Bug Control", slug: "bed-bug-control", image: "/biz-photos/urban-desert-pest-control/bed-bug-control.webp", blurb: "Detailed bed-bug inspection and targeted treatment for bedrooms, furniture, and hidden harborage." },
    ],
  },
  "green-home-pest-control": {
    photos: ["/biz-photos/green-home-pest-control/hero.webp", "/biz-photos/green-home-pest-control/residential-pest-control.webp", "/biz-photos/green-home-pest-control/commercial-pest-control.webp", "/biz-photos/green-home-pest-control/termite-control.webp", "/biz-photos/green-home-pest-control/bed-bug-control.webp", "/biz-photos/green-home-pest-control/bee-removal.webp", "/biz-photos/green-home-pest-control/mosquito-control.webp"],
    services: [
      { name: "Residential Pest Control", slug: "residential-pest-control", image: "/biz-photos/green-home-pest-control/residential-pest-control.webp", blurb: "Whole-home pest protection with careful interior and exterior treatments tailored to your property." },
      { name: "Commercial Pest Control", slug: "commercial-pest-control", image: "/biz-photos/green-home-pest-control/commercial-pest-control.webp", blurb: "Discreet commercial pest service for offices, retail, restaurants, and other business properties." },
      { name: "Termite Control", slug: "termite-control", image: "/biz-photos/green-home-pest-control/termite-control.webp", blurb: "Termite inspection and control that helps safeguard your property from costly structural damage." },
      { name: "Bed Bug Control", slug: "bed-bug-control", image: "/biz-photos/green-home-pest-control/bed-bug-control.webp", blurb: "Focused bed-bug inspection and treatment for homes and businesses." },
      { name: "Bee Removal", slug: "bee-removal", image: "/biz-photos/green-home-pest-control/bee-removal.webp", blurb: "Professional bee and hive removal performed with appropriate protection and careful containment." },
      { name: "Mosquito Control", slug: "mosquito-control", image: "/biz-photos/green-home-pest-control/mosquito-control.webp", blurb: "Seasonal yard treatments that reduce adult mosquitoes and target favorable breeding areas." },
    ],
  },
  "moxie-pest-control": {
    photos: ["/biz-photos/moxie-pest-control/hero.webp", "/biz-photos/moxie-pest-control/pest-control.webp", "/biz-photos/moxie-pest-control/rodent-control.webp", "/biz-photos/moxie-pest-control/termite-control.webp", "/biz-photos/moxie-pest-control/mosquito-control.webp"],
    services: [
      { name: "Pest Control", slug: "pest-control", image: "/biz-photos/moxie-pest-control/pest-control.webp", blurb: "Comprehensive home protection for common crawling insects, spiders, and other household pests." },
      { name: "Rodent Control", slug: "rodent-control", image: "/biz-photos/moxie-pest-control/rodent-control.webp", blurb: "Rodent control that addresses current activity and helps block common entry points." },
      { name: "Termite Control", slug: "termite-control", image: "/biz-photos/moxie-pest-control/termite-control.webp", blurb: "Advanced termite treatment and prevention for long-term property protection." },
      { name: "Mosquito Control", slug: "mosquito-control", image: "/biz-photos/moxie-pest-control/mosquito-control.webp", blurb: "Outdoor mosquito control designed to reduce activity around patios, shrubs, and gathering spaces." },
    ],
  },
  "action-termite-and-pest-control": {
    photos: ["/biz-photos/action-termite-and-pest-control/hero.webp", "/biz-photos/action-termite-and-pest-control/advanced-termite-treatment.webp", "/biz-photos/action-termite-and-pest-control/residential-pest-control.webp", "/biz-photos/action-termite-and-pest-control/commercial-pest-control.webp", "/biz-photos/action-termite-and-pest-control/comprehensive-pest-inspections.webp", "/biz-photos/action-termite-and-pest-control/bed-bug-extermination.webp", "/biz-photos/action-termite-and-pest-control/scorpion-control.webp"],
    services: [
      { name: "Advanced Termite Treatment", slug: "advanced-termite-treatment", image: "/biz-photos/action-termite-and-pest-control/advanced-termite-treatment.webp", blurb: "Advanced termite options including liquid treatment, bait systems, no-drill approaches, and detailed inspections." },
      { name: "Residential Pest Control", slug: "residential-pest-control", image: "/biz-photos/action-termite-and-pest-control/residential-pest-control.webp", blurb: "Customized residential protection for active infestations and recurring Arizona pest pressure." },
      { name: "Commercial Pest Control", slug: "commercial-pest-control", image: "/biz-photos/action-termite-and-pest-control/commercial-pest-control.webp", blurb: "Dependable pest management tailored to offices, restaurants, retail, warehouses, and industrial properties." },
      { name: "Comprehensive Pest Inspections", slug: "comprehensive-pest-inspections", image: "/biz-photos/action-termite-and-pest-control/comprehensive-pest-inspections.webp", blurb: "Detailed evaluation of pest activity, entry points, conducive conditions, and treatment priorities." },
      { name: "Bed Bug Extermination", slug: "bed-bug-extermination", image: "/biz-photos/action-termite-and-pest-control/bed-bug-extermination.webp", blurb: "Thorough bed-bug inspection and treatment for homes and commercial spaces." },
      { name: "Scorpion Control", slug: "scorpion-control", image: "/biz-photos/action-termite-and-pest-control/scorpion-control.webp", blurb: "Arizona scorpion control focused on inspection, exclusion points, and targeted applications." },
    ],
  },
  "greenleaf-pest-control": {
    photos: ["/biz-photos/greenleaf-pest-control/hero.webp", "/biz-photos/greenleaf-pest-control/pest-control.webp", "/biz-photos/greenleaf-pest-control/scorpion-control.webp", "/biz-photos/greenleaf-pest-control/termite-control.webp", "/biz-photos/greenleaf-pest-control/rodent-control.webp", "/biz-photos/greenleaf-pest-control/weed-control.webp"],
    services: [
      { name: "Pest Control", slug: "pest-control", image: "/biz-photos/greenleaf-pest-control/pest-control.webp", blurb: "Green-minded residential pest solutions tailored to Arizona homes and common invaders." },
      { name: "Scorpion Control", slug: "scorpion-control", image: "/biz-photos/greenleaf-pest-control/scorpion-control.webp", blurb: "Targeted scorpion inspection and control around walls, foundations, and potential entry points." },
      { name: "Termite Control", slug: "termite-control", image: "/biz-photos/greenleaf-pest-control/termite-control.webp", blurb: "Termite treatment and prevention that protects the structure of your home." },
      { name: "Rodent Control", slug: "rodent-control", image: "/biz-photos/greenleaf-pest-control/rodent-control.webp", blurb: "Rodent activity control paired with practical exterior exclusion work." },
      { name: "Weed Control", slug: "weed-control", image: "/biz-photos/greenleaf-pest-control/weed-control.webp", blurb: "Targeted weed control for gravel, beds, and other Arizona landscape areas." },
    ],
  },
  "naturzone-pest-control": {
    photos: ["/biz-photos/naturzone-pest-control/hero.webp", "/biz-photos/naturzone-pest-control/residential-pest-control.webp", "/biz-photos/naturzone-pest-control/mosquito-control.webp", "/biz-photos/naturzone-pest-control/bed-bug-extermination.webp", "/biz-photos/naturzone-pest-control/german-roach-elimination.webp", "/biz-photos/naturzone-pest-control/termite-control.webp", "/biz-photos/naturzone-pest-control/pest-and-rodent-inspection.webp"],
    services: [
      { name: "Residential Pest Control", slug: "residential-pest-control", image: "/biz-photos/naturzone-pest-control/residential-pest-control.webp", blurb: "Prescription-based residential pest service for common Phoenix insects, arachnids, and rodents." },
      { name: "Mosquito Control", slug: "mosquito-control", image: "/biz-photos/naturzone-pest-control/mosquito-control.webp", blurb: "Pet-conscious mosquito programs using targeted traps and complementary treatment methods." },
      { name: "Bed Bug Extermination", slug: "bed-bug-extermination", image: "/biz-photos/naturzone-pest-control/bed-bug-extermination.webp", blurb: "Strategy-based bed-bug programs with multiple treatment options selected for the infestation." },
      { name: "German Roach Elimination", slug: "german-roach-elimination", image: "/biz-photos/naturzone-pest-control/german-roach-elimination.webp", blurb: "Specialized dust-and-bait treatment for German cockroach activity with minimal household disruption." },
      { name: "Termite Control", slug: "termite-control", image: "/biz-photos/naturzone-pest-control/termite-control.webp", blurb: "Soil treatment designed to eliminate subterranean termite colonies and provide lasting protection." },
      { name: "Pest & Rodent Inspection", slug: "pest-and-rodent-inspection", image: "/biz-photos/naturzone-pest-control/pest-and-rodent-inspection.webp", blurb: "A detailed property evaluation used to prescribe treatment for the conditions and activity actually found." },
    ],
  },
  "west-coast-pest-control": {
    photos: ["/biz-photos/west-coast-pest-control/hero.webp", "/biz-photos/west-coast-pest-control/pest-control.webp", "/biz-photos/west-coast-pest-control/termite-control.webp", "/biz-photos/west-coast-pest-control/bird-control.webp", "/biz-photos/west-coast-pest-control/rodent-control.webp"],
    services: [
      { name: "Pest Control", slug: "pest-control", image: "/biz-photos/west-coast-pest-control/pest-control.webp", blurb: "Safe, effective pest management for homes and commercial properties." },
      { name: "Termite Control", slug: "termite-control", image: "/biz-photos/west-coast-pest-control/termite-control.webp", blurb: "Termite inspection and treatment solutions for Arizona properties." },
      { name: "Bird Control", slug: "bird-control", image: "/biz-photos/west-coast-pest-control/bird-control.webp", blurb: "Humane pigeon and nuisance-bird deterrence for rooflines, solar panels, and common roosting areas." },
      { name: "Rodent Control", slug: "rodent-control", image: "/biz-photos/west-coast-pest-control/rodent-control.webp", blurb: "Rodent management and exterior exclusion that targets activity and common access points." },
    ],
  },
  "greenway-pest-solutions": {
    photos: ["/biz-photos/greenway-pest-solutions/hero.webp", "/biz-photos/greenway-pest-solutions/home-pest-control.webp", "/biz-photos/greenway-pest-solutions/bed-bug-treatments.webp", "/biz-photos/greenway-pest-solutions/mosquito-control.webp", "/biz-photos/greenway-pest-solutions/bee-and-wasp-control.webp", "/biz-photos/greenway-pest-solutions/weed-control.webp"],
    services: [
      { name: "Home Pest Control", slug: "home-pest-control", image: "/biz-photos/greenway-pest-solutions/home-pest-control.webp", blurb: "Year-round home protection against common insects, spiders, and rodents." },
      { name: "Bed Bug Treatments", slug: "bed-bug-treatments", image: "/biz-photos/greenway-pest-solutions/bed-bug-treatments.webp", blurb: "Experienced bed-bug inspection and targeted treatment for hidden biting pests." },
      { name: "Mosquito Control", slug: "mosquito-control", image: "/biz-photos/greenway-pest-solutions/mosquito-control.webp", blurb: "Seasonal treatments that target adult mosquitoes and interrupt reproduction around your yard." },
      { name: "Bee & Wasp Control", slug: "bee-and-wasp-control", image: "/biz-photos/greenway-pest-solutions/bee-and-wasp-control.webp", blurb: "Professional bee, wasp, and nest removal around eaves and other property areas." },
      { name: "Weed Control", slug: "weed-control", image: "/biz-photos/greenway-pest-solutions/weed-control.webp", blurb: "Effective weed control for Arizona lawns, gravel, and landscape beds." },
    ],
  },
  "bills-pest-termite-control": {
    photos: ["/biz-photos/bills-pest-termite-control/hero.webp", "/biz-photos/bills-pest-termite-control/general-pest-control.webp", "/biz-photos/bills-pest-termite-control/termite-control.webp", "/biz-photos/bills-pest-termite-control/rodent-control.webp", "/biz-photos/bills-pest-termite-control/bed-bug-treatment.webp", "/biz-photos/bills-pest-termite-control/bee-wasp-removal.webp", "/biz-photos/bills-pest-termite-control/scorpion-control.webp"],
    services: [
      { name: "General Pest Control", slug: "general-pest-control", image: "/biz-photos/bills-pest-termite-control/general-pest-control.webp", blurb: "General treatment for ants, roaches, spiders, and other common Arizona household pests." },
      { name: "Termite Control", slug: "termite-control", image: "/biz-photos/bills-pest-termite-control/termite-control.webp", blurb: "Specialized termite inspections, treatment, and preventive barriers for structural protection." },
      { name: "Rodent Control", slug: "rodent-control", image: "/biz-photos/bills-pest-termite-control/rodent-control.webp", blurb: "Rodent trapping, activity control, and exclusion recommendations for rats and mice." },
      { name: "Bed Bug Treatment", slug: "bed-bug-treatment", image: "/biz-photos/bills-pest-termite-control/bed-bug-treatment.webp", blurb: "Advanced bed-bug elimination using inspection, heat, and targeted treatment as appropriate." },
      { name: "Bee & Wasp Removal", slug: "bee-wasp-removal", image: "/biz-photos/bills-pest-termite-control/bee-wasp-removal.webp", blurb: "Professional bee and wasp removal that prioritizes safety around the nest area." },
      { name: "Scorpion Control", slug: "scorpion-control", image: "/biz-photos/bills-pest-termite-control/scorpion-control.webp", blurb: "Specialized barrier, inspection, and exclusion methods for Arizona scorpion pressure." },
    ],
  },
  "phoenix-pest-and-termite-control": {
    yearsInBusiness: 59,
    photos: ["/biz-photos/phoenix-pest-and-termite-control/hero.webp", "/biz-photos/phoenix-pest-and-termite-control/general-pest-control.webp", "/biz-photos/phoenix-pest-and-termite-control/scorpion-control.webp", "/biz-photos/phoenix-pest-and-termite-control/termite-control.webp", "/biz-photos/phoenix-pest-and-termite-control/rodent-control.webp", "/biz-photos/phoenix-pest-and-termite-control/bed-bug-treatment.webp", "/biz-photos/phoenix-pest-and-termite-control/weed-bee-control.webp"],
    services: [
      { name: "General Pest Control", slug: "general-pest-control", image: "/biz-photos/phoenix-pest-and-termite-control/general-pest-control.webp", blurb: "Recurring residential and commercial control for ants, roaches, spiders, crickets, and other common pests." },
      { name: "Scorpion Control", slug: "scorpion-control", image: "/biz-photos/phoenix-pest-and-termite-control/scorpion-control.webp", blurb: "Scorpion-focused inspection, barrier treatment, dusting, and entry-point attention for Arizona homes." },
      { name: "Termite Control", slug: "termite-control", image: "/biz-photos/phoenix-pest-and-termite-control/termite-control.webp", blurb: "Termite inspection, baiting, treatment, and prevention plans for long-term structural protection." },
      { name: "Rodent Control", slug: "rodent-control", image: "/biz-photos/phoenix-pest-and-termite-control/rodent-control.webp", blurb: "Rodent inspection and control that locates activity and helps block rats, mice, and other rodents." },
      { name: "Bed Bug Treatment", slug: "bed-bug-treatment", image: "/biz-photos/phoenix-pest-and-termite-control/bed-bug-treatment.webp", blurb: "Professional bed-bug inspection and elimination solutions for your home." },
      { name: "Bee, Wasp & Weed Control", slug: "bee-wasp-weed-control", image: "/biz-photos/phoenix-pest-and-termite-control/weed-bee-control.webp", blurb: "Professional stinging-insect removal plus regular weed-control options for complete exterior care." },
    ],
  },
  // pc0031-pc0040 — unique company heroes plus a visually audited shared treatment library.
  "sun-lakes-pest-control": pestPhotoOverride("sun-lakes-pest-control", assetOverrides["sun-lakes-pest-control"].services),
  "green-mango-pest-control-chandler": pestPhotoOverride("green-mango-pest-control-chandler", assetOverrides["green-mango-pest-control-chandler"].services),
  "truly-nolen-pest-and-termite-control": pestPhotoOverride("truly-nolen-pest-and-termite-control", assetOverrides["truly-nolen-pest-and-termite-control"].services),
  "anteater-exterminating-inc": pestPhotoOverride("anteater-exterminating-inc", assetOverrides["anteater-exterminating-inc"].services),
  "lunar-pest-control": pestPhotoOverride("lunar-pest-control", assetOverrides["lunar-pest-control"].services),
  "blue-sky-pest-control": pestPhotoOverride("blue-sky-pest-control", assetOverrides["blue-sky-pest-control"].services),
  "spark-pest-control-gilbert-office": pestPhotoOverride("spark-pest-control-gilbert-office", assetOverrides["spark-pest-control-gilbert-office"].services),
  "scorpion-king-exterminating": pestPhotoOverride("scorpion-king-exterminating", assetOverrides["scorpion-king-exterminating"].services),
  "firehouse-pest-control-services": pestPhotoOverride("firehouse-pest-control-services", assetOverrides["firehouse-pest-control-services"].services),
  "magic-pest-control": pestPhotoOverride("magic-pest-control", [
    { name: "General Pest Control", slug: "pest-control", blurb: "Practical protection for common household pests with attention to entry points and the exterior perimeter." },
    { name: "Scorpion Control", slug: "scorpion-control", blurb: "Targeted inspection and treatment focused on the cracks, walls, and shelter areas scorpions use." },
    { name: "Termite Control", slug: "termite-control", blurb: "Detailed termite inspection and treatment planning designed around the property's conditions." },
    { name: "Rodent Control", slug: "rodent-control", blurb: "Rodent troubleshooting and exclusion work focused on removal and reducing future entry." },
    { name: "Bed Bug Treatment", slug: "bed-bug", blurb: "Careful inspection and treatment for bed bug activity in sleeping and living areas." },
    { name: "Weed & Bee Control", slug: "weed-bee", blurb: "Targeted outdoor control for persistent weeds and nuisance pest activity around the property." },
  ]),
  // pl0031 Blue Mountain Pool Care — official extracted service lineup.
  "blue-mountain-pool-care": {
    photos: [
      "/biz-photos/blue-mountain-pool-care/hero.webp", "/biz-photos/blue-mountain-pool-care/weekly-pool-services.webp", "/biz-photos/blue-mountain-pool-care/equipment-repair-and-replacement.webp", "/biz-photos/blue-mountain-pool-care/tile-cleaning-services.webp", "/biz-photos/blue-mountain-pool-care/acid-washing-services.webp", "/biz-photos/blue-mountain-pool-care/pool-draining-services.webp", "/biz-photos/blue-mountain-pool-care/pop-up-cleaning-module-installation.webp",
    ],
    services: [
      { name: "Weekly Pool Services", slug: "weekly-pool-services", image: "/biz-photos/blue-mountain-pool-care/weekly-pool-services.webp", blurb: "Expert care for your pool on a reliable weekly schedule." },
      { name: "Equipment Repair And Replacement", slug: "equipment-repair-and-replacement", image: "/biz-photos/blue-mountain-pool-care/equipment-repair-and-replacement.webp", blurb: "Ensure seamless pool operation with expert repairs and replacements." },
      { name: "Tile Cleaning Services", slug: "tile-cleaning-services", image: "/biz-photos/blue-mountain-pool-care/tile-cleaning-services.webp", blurb: "Restore your pool’s beauty with expert tile cleaning solutions." },
      { name: "Acid Washing Services", slug: "acid-washing-services", image: "/biz-photos/blue-mountain-pool-care/acid-washing-services.webp", blurb: "Revitalize your pool surface with deep-cleaning acid wash expertise." },
      { name: "Pool Draining Services", slug: "pool-draining-services", image: "/biz-photos/blue-mountain-pool-care/pool-draining-services.webp", blurb: "Efficient water removal for a fresh, clean pool experience." },
      { name: "Pop-Up Cleaning Module Installation", slug: "pop-up-cleaning-module-installation", image: "/biz-photos/blue-mountain-pool-care/pop-up-cleaning-module-installation.webp", blurb: "Automate your pool cleaning process for a more efficient and effective system, reducing chemical use and manual labor." },
    ],
  },
  // pl0032 Arizona Pool Service — official extracted maintenance and repair lineup.
  "arizona-pool-service": {
    photos: [
      "/biz-photos/arizona-pool-service/hero.webp", "/biz-photos/arizona-pool-service/weekly-pool-service.webp", "/biz-photos/arizona-pool-service/green-pool-cleanup.webp", "/biz-photos/arizona-pool-service/acid-washes-and-tile-cleans.webp", "/biz-photos/arizona-pool-service/equipment-installation.webp", "/biz-photos/arizona-pool-service/filter-cleaning.webp",
    ],
    services: [
      { name: "Weekly Pool Service", slug: "weekly-pool-service", image: "/biz-photos/arizona-pool-service/weekly-pool-service.webp", blurb: "Quality, affordable weekly swimming pool service for homeowners throughout the Phoenix area." },
      { name: "Green Pool Cleanup", slug: "green-pool-cleanup", image: "/biz-photos/arizona-pool-service/green-pool-cleanup.webp", blurb: "Focused scrubbing and water treatment to clear algae and restore an unsightly green pool." },
      { name: "Acid Washes and Tile Cleans", slug: "acid-washes-and-tile-cleans", image: "/biz-photos/arizona-pool-service/acid-washes-and-tile-cleans.webp", blurb: "Careful acid washing and tile cleaning to remove mineral buildup and refresh pool surfaces." },
      { name: "Equipment Installation", slug: "equipment-installation", image: "/biz-photos/arizona-pool-service/equipment-installation.webp", blurb: "Safe, professional pool equipment repair and installation completed correctly." },
      { name: "Filter Cleaning", slug: "filter-cleaning", image: "/biz-photos/arizona-pool-service/filter-cleaning.webp", blurb: "Thorough filter cleaning that supports efficient circulation and helps extend equipment life." },
    ],
  },
  // pl0033 Pool Spa Cleaner LLC — official extracted pool, spa, rental, and equipment services.
  "pool-spa-cleaner-llc": {
    photos: [
      "/biz-photos/pool-spa-cleaner-llc/hero.webp", "/biz-photos/pool-spa-cleaner-llc/airbnb-and-rental-house-pool-care.webp", "/biz-photos/pool-spa-cleaner-llc/hot-tub-services.webp", "/biz-photos/pool-spa-cleaner-llc/pool-equipment-services.webp", "/biz-photos/pool-spa-cleaner-llc/swimming-pool-service.webp",
    ],
    services: [
      { name: "Airbnb & Rental House Pool Care", slug: "airbnb-and-rental-house-pool-care", image: "/biz-photos/pool-spa-cleaner-llc/airbnb-and-rental-house-pool-care.webp", blurb: "Flexible pool care that helps keep Airbnb and rental properties clean, maintained, and guest-ready." },
      { name: "Hot Tub Services", slug: "hot-tub-services", image: "/biz-photos/pool-spa-cleaner-llc/hot-tub-services.webp", blurb: "Routine hot tub cleaning and repair to maintain a clean, safe, relaxing retreat." },
      { name: "Pool Equipment Services", slug: "pool-equipment-services", image: "/biz-photos/pool-spa-cleaner-llc/pool-equipment-services.webp", blurb: "Efficient diagnosis, repair, and replacement for pumps, filters, heaters, and other pool equipment." },
      { name: "Swimming Pool Service", slug: "swimming-pool-service", image: "/biz-photos/pool-spa-cleaner-llc/swimming-pool-service.webp", blurb: "Regular skimming, vacuuming, chemical balancing, and equipment checks to keep pools in excellent condition." },
    ],
  },
  // pl0034 Sunflower Pools — official extracted cleaning, repair, heater, and automation lineup.
  "sunflower-pools-service-and-repair": {
    photos: [
      "/biz-photos/sunflower-pools-service-and-repair/hero.webp", "/biz-photos/sunflower-pools-service-and-repair/basic-full-service-cleaning.webp", "/biz-photos/sunflower-pools-service-and-repair/tile-cleaning.webp", "/biz-photos/sunflower-pools-service-and-repair/acid-wash-chlorine-rinse.webp", "/biz-photos/sunflower-pools-service-and-repair/filters-and-pumps.webp", "/biz-photos/sunflower-pools-service-and-repair/pool-heater-installation.webp", "/biz-photos/sunflower-pools-service-and-repair/automation.webp",
    ],
    services: [
      { name: "Basic/Full Service Cleaning", slug: "basic-full-service-cleaning", image: "/biz-photos/sunflower-pools-service-and-repair/basic-full-service-cleaning.webp", blurb: "Basic and full-service packages covering chemicals, brushing, baskets, vacuuming, and skimming as needed." },
      { name: "Tile Cleaning", slug: "tile-cleaning", image: "/biz-photos/sunflower-pools-service-and-repair/tile-cleaning.webp", blurb: "Calcium-line removal for pool tile, pebble surfaces, and water features." },
      { name: "Acid Wash/Chlorine Rinse", slug: "acid-wash-chlorine-rinse", image: "/biz-photos/sunflower-pools-service-and-repair/acid-wash-chlorine-rinse.webp", blurb: "Drained-pool acid washing and chlorine rinsing to address stains and algae." },
      { name: "Filters & Pumps", slug: "filters-and-pumps", image: "/biz-photos/sunflower-pools-service-and-repair/filters-and-pumps.webp", blurb: "Installation and repair for pool filters and pumps across makes and models." },
      { name: "Pool Heater Installation", slug: "pool-heater-installation", image: "/biz-photos/sunflower-pools-service-and-repair/pool-heater-installation.webp", blurb: "Installation and maintenance for pool heat pumps and heaters." },
      { name: "Automation", slug: "automation", image: "/biz-photos/sunflower-pools-service-and-repair/automation.webp", blurb: "Pool automation installation and repair for convenient remote feature control." },
    ],
  },
  // pl0035 Sun Devil Pool Supply & Service — official extracted retail, repair, cleaning, and education lineup.
  "sun-devil-pool-supply-and-service": {
    photos: [
      "/biz-photos/sun-devil-pool-supply-and-service/hero.webp", "/biz-photos/sun-devil-pool-supply-and-service/pool-supplies.webp", "/biz-photos/sun-devil-pool-supply-and-service/pool-repairs.webp", "/biz-photos/sun-devil-pool-supply-and-service/pool-cleaning-services.webp", "/biz-photos/sun-devil-pool-supply-and-service/pool-school.webp",
    ],
    services: [
      { name: "Pool Supplies", slug: "pool-supplies", image: "/biz-photos/sun-devil-pool-supply-and-service/pool-supplies.webp", blurb: "Pool chemicals, replacement parts, equipment, and other essential supplies." },
      { name: "Pool Repairs", slug: "pool-repairs", image: "/biz-photos/sun-devil-pool-supply-and-service/pool-repairs.webp", blurb: "Professional diagnosis and repair for common swimming pool equipment and system issues." },
      { name: "Pool Cleaning Services", slug: "pool-cleaning-services", image: "/biz-photos/sun-devil-pool-supply-and-service/pool-cleaning-services.webp", blurb: "Weekly pool service, tile cleaning, and acid washing for ongoing and restorative care." },
      { name: "Pool School", slug: "pool-school", image: "/biz-photos/sun-devil-pool-supply-and-service/pool-school.webp", blurb: "Practical instruction that helps pool owners understand maintenance and everyday care." },
    ],
  },
  // pl0021 Blue Tide Pool Care — services limited to work documented consistently in customer reviews.
  "blue-tide-pool-care": {
    photos: [
      "/biz-photos/blue-tide-pool-care/hero.webp", "/biz-photos/blue-tide-pool-care/weekly-service.webp",
      "/biz-photos/blue-tide-pool-care/pool-repair.webp", "/biz-photos/blue-tide-pool-care/equipment-maintenance.webp",
      "/biz-photos/blue-tide-pool-care/green-recovery.webp",
    ],
    services: [
      { name: "Weekly Pool Service", slug: "weekly-pool-service", image: "/biz-photos/blue-tide-pool-care/weekly-service.webp", blurb: "Detailed weekly cleaning, chemical balancing, equipment checks, and responsive updates about your pool's condition." },
      { name: "Pool Repair", slug: "pool-repair", image: "/biz-photos/blue-tide-pool-care/pool-repair.webp", blurb: "Practical diagnosis and repair for circulation, plumbing, water-feature, and other pool-system problems." },
      { name: "Filter & Heater Maintenance", slug: "equipment-maintenance", image: "/biz-photos/blue-tide-pool-care/equipment-maintenance.webp", blurb: "Preventive filter and heater care that helps pool equipment operate reliably and efficiently." },
      { name: "Green Pool Recovery", slug: "green-pool-recovery", image: "/biz-photos/blue-tide-pool-care/green-recovery.webp", blurb: "Focused cleanup and water treatment to restore algae-affected pools to clear, healthy condition." },
    ],
  },
  // pl0022 ASP Mesa — official extracted cleaning, repair, remodeling, leak-detection, and build lineup.
  "asp-america-s-swimming-pool-company-of-mesa": {
    photos: [
      "/biz-photos/asp-america-s-swimming-pool-company-of-mesa/hero.webp", "/biz-photos/asp-america-s-swimming-pool-company-of-mesa/pool-cleaning.webp",
      "/biz-photos/asp-america-s-swimming-pool-company-of-mesa/pool-repairs.webp", "/biz-photos/asp-america-s-swimming-pool-company-of-mesa/equipment-repairs.webp",
      "/biz-photos/asp-america-s-swimming-pool-company-of-mesa/pool-remodeling.webp", "/biz-photos/asp-america-s-swimming-pool-company-of-mesa/leak-detection.webp",
      "/biz-photos/asp-america-s-swimming-pool-company-of-mesa/pool-installation.webp",
    ],
    services: [
      { name: "Pool Cleaning", slug: "pool-cleaning", image: "/biz-photos/asp-america-s-swimming-pool-company-of-mesa/pool-cleaning.webp", blurb: "Comprehensive recurring cleaning and water care to keep your pool sparkling, balanced, and healthy." },
      { name: "Pool Repairs", slug: "pool-repairs", image: "/biz-photos/asp-america-s-swimming-pool-company-of-mesa/pool-repairs.webp", blurb: "Professional repair for pool plumbing, surfaces, circulation, and other problems from minor fixes to larger work." },
      { name: "Pool Equipment Repairs", slug: "pool-equipment-repairs", image: "/biz-photos/asp-america-s-swimming-pool-company-of-mesa/equipment-repairs.webp", blurb: "Diagnosis and repair for pumps, filters, heaters, controls, and essential pool equipment." },
      { name: "Pool Remodeling", slug: "pool-remodeling", image: "/biz-photos/asp-america-s-swimming-pool-company-of-mesa/pool-remodeling.webp", blurb: "Pool resurfacing, replastering, retiling, and renovation that updates both appearance and performance." },
      { name: "Pool Leak Detection", slug: "pool-leak-detection", image: "/biz-photos/asp-america-s-swimming-pool-company-of-mesa/leak-detection.webp", blurb: "Accurate leak detection and repair to reduce water loss and protect your pool and surrounding property." },
      { name: "Pool Installation", slug: "pool-installation", image: "/biz-photos/asp-america-s-swimming-pool-company-of-mesa/pool-installation.webp", blurb: "Professional installation for concrete, fiberglass, vinyl, luxury, and compact plunge-pool projects." },
    ],
  },
  // pl0023 Trilogy Pools — official extracted maintenance, construction, remodeling, commercial, and tile-care lineup.
  "trilogy-pools-service-and-repair-llc": {
    yearsInBusiness: 15,
    photos: [
      "/biz-photos/trilogy-pools-service-and-repair-llc/hero.webp", "/biz-photos/trilogy-pools-service-and-repair-llc/pool-maintenance.webp",
      "/biz-photos/trilogy-pools-service-and-repair-llc/pool-installation.webp", "/biz-photos/trilogy-pools-service-and-repair-llc/pool-remodeling.webp",
      "/biz-photos/trilogy-pools-service-and-repair-llc/commercial-pools.webp", "/biz-photos/trilogy-pools-service-and-repair-llc/tile-cleaning-acid-wash.webp",
    ],
    services: [
      { name: "Pool Maintenance", slug: "pool-maintenance", image: "/biz-photos/trilogy-pools-service-and-repair-llc/pool-maintenance.webp", blurb: "Flexible weekly, monthly, or quarterly full-service maintenance to keep your pool clean throughout the year." },
      { name: "Pool Installation", slug: "pool-installation", image: "/biz-photos/trilogy-pools-service-and-repair-llc/pool-installation.webp", blurb: "Licensed custom pool design and construction for a complete Mesa backyard and outdoor-living space." },
      { name: "Pool Remodeling", slug: "pool-remodeling", image: "/biz-photos/trilogy-pools-service-and-repair-llc/pool-remodeling.webp", blurb: "Hands-on pool redesign, renovation, tile, and interior-finish work from planning through completion." },
      { name: "Commercial Pools", slug: "commercial-pools", image: "/biz-photos/trilogy-pools-service-and-repair-llc/commercial-pools.webp", blurb: "Commercial pool maintenance and construction tailored to businesses, communities, and public facilities." },
      { name: "Tile Cleaning & Acid Wash", slug: "tile-cleaning-acid-wash", image: "/biz-photos/trilogy-pools-service-and-repair-llc/tile-cleaning-acid-wash.webp", blurb: "Specialized calcium removal and acid washing for stained waterline tile and pool interiors." },
    ],
  },
  // pl0024 Four Seasons — unavailable official page; services grounded in recurring customer reports.
  "four-seasons-pool-service": {
    photos: [
      "/biz-photos/four-seasons-pool-service/hero.webp", "/biz-photos/four-seasons-pool-service/weekly-service.webp",
      "/biz-photos/four-seasons-pool-service/pool-repair.webp", "/biz-photos/four-seasons-pool-service/filter-service.webp",
      "/biz-photos/four-seasons-pool-service/acid-wash-algae.webp", "/biz-photos/four-seasons-pool-service/seasonal-care.webp",
    ],
    services: [
      { name: "Weekly Pool Service", slug: "weekly-pool-service", image: "/biz-photos/four-seasons-pool-service/weekly-service.webp", blurb: "Consistent weekly cleaning, water testing, chemical balancing, and clear service updates." },
      { name: "Pool Equipment Repair", slug: "pool-equipment-repair", image: "/biz-photos/four-seasons-pool-service/pool-repair.webp", blurb: "Responsive diagnosis, repair, and replacement for pumps, lights, controls, and other pool components." },
      { name: "Filter Cleaning & Replacement", slug: "filter-service", image: "/biz-photos/four-seasons-pool-service/filter-service.webp", blurb: "Thorough filter cleaning and practical replacement when worn equipment can no longer perform properly." },
      { name: "Acid Washing & Algae Removal", slug: "acid-wash-algae-removal", image: "/biz-photos/four-seasons-pool-service/acid-wash-algae.webp", blurb: "Focused acid washing and stubborn black-algae treatment to restore stained pool interiors." },
      { name: "Seasonal Pool Care", slug: "seasonal-pool-care", image: "/biz-photos/four-seasons-pool-service/seasonal-care.webp", blurb: "Seasonal preparation and system checks that keep water and equipment ready as Arizona conditions change." },
    ],
    generatedCopy: { aboutBody: ["Four Seasons Pool Service gives Chandler homeowners dependable weekly maintenance, prompt equipment help, and practical guidance from an experienced local team.", "Customers value Eric's quick response, careful explanations, fair pricing, and the detailed service updates that make pool ownership easier in every season."] },
  },
  // pl0025 Off the Deep End — exact official three-pillar lineup.
  "off-the-deep-end-pool-service-llc": {
    yearsInBusiness: 18,
    photos: [
      "/biz-photos/off-the-deep-end-pool-service-llc/hero.webp", "/biz-photos/off-the-deep-end-pool-service-llc/cleaning-maintenance.webp",
      "/biz-photos/off-the-deep-end-pool-service-llc/equipment-repair-install.webp", "/biz-photos/off-the-deep-end-pool-service-llc/tile-cleaning-acid-wash.webp",
    ],
    services: [
      { name: "Pool Cleaning & Maintenance", slug: "pool-cleaning-and-maintenance", image: "/biz-photos/off-the-deep-end-pool-service-llc/cleaning-maintenance.webp", blurb: "Certified weekly cleaning and maintenance that keeps East Valley pools clear, balanced, and worry-free." },
      { name: "Equipment Repair & Installation", slug: "equipment-repair-and-installation", image: "/biz-photos/off-the-deep-end-pool-service-llc/equipment-repair-install.webp", blurb: "Certified help for urgent pool-equipment repairs, planned replacements, and professional new installations." },
      { name: "Tile Cleaning & Acid Wash", slug: "tile-cleaning-and-acid-wash", image: "/biz-photos/off-the-deep-end-pool-service-llc/tile-cleaning-acid-wash.webp", blurb: "Tile blasting and acid-wash services that remove calcium and staining to refresh your pool's finish." },
    ],
  },
  // pl0026-pl0030 — verified Arizona pool services with original, explicit image bindings.
  "crystal-falls-pool-service": {
    photos: ["/biz-photos/crystal-falls-pool-service/hero.webp", "/biz-photos/crystal-falls-pool-service/maintenance.webp", "/biz-photos/crystal-falls-pool-service/cleaning.webp", "/biz-photos/crystal-falls-pool-service/repair.webp"],
    services: [
      { name: "Pool Maintenance", slug: "pool-maintenance", image: "/biz-photos/crystal-falls-pool-service/maintenance.webp", blurb: "Scheduled inspections, water balancing, and equipment checks catch issues early and keep Chandler pools swim-ready." },
      { name: "Pool Cleaning", slug: "pool-cleaning", image: "/biz-photos/crystal-falls-pool-service/cleaning.webp", blurb: "Reliable skimming, vacuuming, tile brushing, basket care, and filter service tackle Arizona dust and debris." },
      { name: "Pool Repair", slug: "pool-repair", image: "/biz-photos/crystal-falls-pool-service/repair.webp", blurb: "Prompt diagnosis and repair for filters, pumps, heaters, automation, water chemistry, and worn pool equipment." },
    ],
  },
  "aloha-desert-pools": {
    photos: ["/biz-photos/aloha-desert-pools/hero-original.webp", "/biz-photos/aloha-desert-pools/weekly-cleaning-original.webp", "/biz-photos/aloha-desert-pools/repair-original.webp", "/biz-photos/aloha-desert-pools/installation-automation-original.webp"],
    services: [
      { name: "Weekly Pool & Spa Cleaning", slug: "weekly-pool-spa-cleaning", image: "/biz-photos/aloha-desert-pools/weekly-cleaning-original.webp", blurb: "Weekly netting, brushing, basket care, equipment inspection, and chemical balancing for clear East Valley pools and spas." },
      { name: "Pool Equipment Repairs", slug: "pool-equipment-repairs", image: "/biz-photos/aloha-desert-pools/repair-original.webp", blurb: "Repair service for pumps, filters, heaters, spas, lighting, and related pool equipment." },
      { name: "Equipment Installation & Automation", slug: "equipment-installation-automation", image: "/biz-photos/aloha-desert-pools/installation-automation-original.webp", blurb: "Professional installation of pumps, filters, heaters, lights, salt systems, and pool automation controls." },
    ],
  },
  "larimar-pool-services": {
    photos: ["/biz-photos/larimar-pool-services/hero.webp", "/biz-photos/larimar-pool-services/weekly-maintenance.webp", "/biz-photos/larimar-pool-services/filter-cleaning.webp", "/biz-photos/larimar-pool-services/equipment-repair.webp"],
    services: [
      { name: "Weekly Pool Maintenance", slug: "weekly-pool-maintenance", image: "/biz-photos/larimar-pool-services/weekly-maintenance.webp", blurb: "Dependable weekly cleaning and water care keeps residential pools balanced, clear, and ready to enjoy." },
      { name: "Filter Cleaning & Repairs", slug: "filter-cleaning-repairs", image: "/biz-photos/larimar-pool-services/filter-cleaning.webp", blurb: "Thorough filter service restores circulation and addresses worn or malfunctioning filtration components." },
      { name: "Pool Equipment Upgrades & Repairs", slug: "equipment-upgrades-repairs", image: "/biz-photos/larimar-pool-services/equipment-repair.webp", blurb: "Professional equipment diagnosis, repairs, and practical upgrades for reliable pool operation." },
    ],
  },
  "az-oasis-pools": {
    photos: ["/biz-photos/az-oasis-pools/hero.webp", "/biz-photos/az-oasis-pools/maintenance.webp", "/biz-photos/az-oasis-pools/green-cleanup.webp", "/biz-photos/az-oasis-pools/equipment-repair.webp"],
    services: [
      { name: "Pool Maintenance", slug: "pool-maintenance", image: "/biz-photos/az-oasis-pools/maintenance.webp", blurb: "Cost-effective recurring service keeps water clean, clear, balanced, and safe throughout Arizona's long swim season." },
      { name: "Green Pool Cleanup", slug: "green-pool-cleanup", image: "/biz-photos/az-oasis-pools/green-cleanup.webp", blurb: "Focused algae treatment and cleaning restores neglected green water to a sparkling backyard oasis." },
      { name: "Equipment Repair", slug: "equipment-repair", image: "/biz-photos/az-oasis-pools/equipment-repair.webp", blurb: "Trained technicians diagnose and repair essential pool equipment to restore safe, dependable circulation." },
    ],
  },
  "hayden-s-pool-service-and-repair": {
    photos: ["/biz-photos/hayden-s-pool-service-and-repair/hero.webp", "/biz-photos/hayden-s-pool-service-and-repair/weekly-cleaning.webp", "/biz-photos/hayden-s-pool-service-and-repair/equipment-repair.webp", "/biz-photos/hayden-s-pool-service-and-repair/filter-restoration.webp"],
    services: [
      { name: "Weekly Pool Cleaning", slug: "weekly-pool-cleaning", image: "/biz-photos/hayden-s-pool-service-and-repair/weekly-cleaning.webp", blurb: "Weekly brushing, skimming, vacuuming, basket care, equipment checks, chemical balancing, and backwashing as needed." },
      { name: "Pool Equipment Repair", slug: "pool-equipment-repair", image: "/biz-photos/hayden-s-pool-service-and-repair/equipment-repair.webp", blurb: "Diagnosis, repair, and replacement for pumps, motors, filters, plumbing, lights, timers, valves, and autofill systems." },
      { name: "Filter Cleaning & Pool Restoration", slug: "filter-cleaning-restoration", image: "/biz-photos/hayden-s-pool-service-and-repair/filter-restoration.webp", blurb: "Filter cleaning, salt-cell care, acid washing, draining, and refill services restore performance and appearance." },
    ],
    generatedCopy: { aboutBody: ["Hayden's Pool Service & Repair is an owner-operated East Valley company focused on dependable maintenance, honest inspections, and practical repairs.", "From weekly cleaning and water care to pumps, motors, filters, plumbing, lighting, and restoration work, the goal is a safe, sparkling pool that stays ready to enjoy."] },
  },

  // pl0036-pl0040 — original East Valley pool photography with explicit service-page bindings.
  "gilbert-pool-repairs-remodels-and-weekly-service": {
    showAllServices: true,
    photos: [
      "/biz-photos/gilbert-pool-repairs-remodels-and-weekly-service/hero.webp",
      "/biz-photos/gilbert-pool-repairs-remodels-and-weekly-service/maintenance.webp",
      "/biz-photos/gilbert-pool-repairs-remodels-and-weekly-service/equipment.webp",
      "/biz-photos/gilbert-pool-repairs-remodels-and-weekly-service/remodel.webp",
    ],
    services: [
      { name: "Pool Design & Remodel", slug: "pool-design-and-remodel", image: "/biz-photos/gilbert-pool-repairs-remodels-and-weekly-service/remodel.webp", blurb: "Thoughtful pool renovation planning and construction tailored to the existing backyard and budget." },
      { name: "Residential Pool Cleaning", slug: "residential-pool-cleaning", image: "/biz-photos/gilbert-pool-repairs-remodels-and-weekly-service/maintenance.webp", blurb: "Consistent cleaning and water care that keeps residential pools clear and ready to enjoy." },
      { name: "Pool Equipment Installation & Repair", slug: "pool-equipment-installation-and-repair", image: "/biz-photos/gilbert-pool-repairs-remodels-and-weekly-service/equipment.webp", blurb: "Professional installation, troubleshooting, and repair for essential pool systems." },
      { name: "Interior Pool Surface", slug: "interior-pool-surface", image: "/biz-photos/gilbert-pool-repairs-remodels-and-weekly-service/remodel.webp", blurb: "Interior finish options selected and installed to refresh the pool's appearance and performance." },
      { name: "Pressure Wash Pool", slug: "pressure-wash-pool", image: "/biz-photos/gilbert-pool-repairs-remodels-and-weekly-service/maintenance.webp", blurb: "Detailed surface cleaning to address buildup and help restore a cleaner pool finish." },
      { name: "Pool Tile Repair", slug: "pool-tile-repair", image: "/biz-photos/gilbert-pool-repairs-remodels-and-weekly-service/remodel.webp", blurb: "Careful replacement of damaged or missing ceramic, glass, and natural pool tile." },
    ],
  },
  "pool-service-gilbert": {
    photos: [
      "/biz-photos/pool-service-gilbert/hero.webp",
      "/biz-photos/pool-service-gilbert/maintenance.webp",
      "/biz-photos/pool-service-gilbert/equipment.webp",
    ],
    services: [
      { name: "Weekly Pool Service", slug: "pool-service", image: "/biz-photos/pool-service-gilbert/maintenance.webp", blurb: "Routine cleaning, water checks, and equipment monitoring for dependable pool care." },
      { name: "Pool Equipment Checks", slug: "equipment-checks", image: "/biz-photos/pool-service-gilbert/equipment.webp", blurb: "Practical inspection of pumps, filters, and circulation components during service." },
      { name: "Water Care", slug: "water-care", image: "/biz-photos/pool-service-gilbert/maintenance.webp", blurb: "Regular testing and balancing to help keep pool water clear and comfortable." },
    ],
  },
  "valley-pool-service-llc": {
    showAllServices: true,
    photos: [
      "/biz-photos/valley-pool-service-llc/hero.webp",
      "/biz-photos/valley-pool-service-llc/maintenance.webp",
      "/biz-photos/valley-pool-service-llc/equipment.webp",
      "/biz-photos/valley-pool-service-llc/tile-cleaning.webp",
    ],
    services: [
      { name: "Pool Cleaning & Maintenance", slug: "pool-cleaning-and-maintenance", image: "/biz-photos/valley-pool-service-llc/maintenance.webp", blurb: "Scheduled cleaning and water care to keep East Valley pools clear and swim-ready." },
      { name: "Pool Equipment Repair", slug: "pool-equipment-repair", image: "/biz-photos/valley-pool-service-llc/equipment.webp", blurb: "Diagnosis and repair for leaks, pumps, filters, and related pool equipment." },
      { name: "Pool Equipment Installation", slug: "pool-equipment-installation", image: "/biz-photos/valley-pool-service-llc/equipment.webp", blurb: "Professional installation of pumps, filters, heaters, salt systems, and automation." },
      { name: "Acid Washing & Tile Cleaning", slug: "acid-washing-and-tile-cleaning", image: "/biz-photos/valley-pool-service-llc/tile-cleaning.webp", blurb: "Focused surface and tile cleaning to address visible staining and mineral scale." },
    ],
  },
  "gilbert-pool-services-llc": {
    photos: [
      "/biz-photos/gilbert-pool-services-llc/hero.webp",
      "/biz-photos/gilbert-pool-services-llc/equipment.webp",
      "/biz-photos/gilbert-pool-services-llc/maintenance.webp",
    ],
    services: [
      { name: "Pool Repair", slug: "pool-repair", image: "/biz-photos/gilbert-pool-services-llc/equipment.webp", blurb: "Responsive troubleshooting and repair for pool plumbing, circulation, and equipment issues." },
      { name: "Equipment Diagnostics", slug: "equipment-diagnostics", image: "/biz-photos/gilbert-pool-services-llc/equipment.webp", blurb: "Careful diagnosis of pumps, filters, controls, and other essential pool components." },
      { name: "Routine Pool Care", slug: "routine-pool-care", image: "/biz-photos/gilbert-pool-services-llc/maintenance.webp", blurb: "Practical cleaning and water checks that help keep residential pools in good condition." },
    ],
  },
  "pelican-pools-llc": {
    showAllServices: true,
    photos: [
      "/biz-photos/pelican-pools-llc/hero.webp",
      "/biz-photos/pelican-pools-llc/maintenance.webp",
      "/biz-photos/pelican-pools-llc/equipment.webp",
      "/biz-photos/pelican-pools-llc/remodel.webp",
    ],
    services: [
      { name: "Weekly Pool Maintenance", slug: "weekly-pool-maintenance", image: "/biz-photos/pelican-pools-llc/maintenance.webp", blurb: "Regular cleaning, water testing, balancing, and equipment checks across the East Valley." },
      { name: "Pool Remodels & Upgrades", slug: "pool-remodels-and-upgrades", image: "/biz-photos/pelican-pools-llc/remodel.webp", blurb: "Pool updates including resurfacing, tile replacement, equipment upgrades, and automation." },
      { name: "Pool Equipment Diagnostics", slug: "pool-equipment-diagnostics", image: "/biz-photos/pelican-pools-llc/equipment.webp", blurb: "Detailed troubleshooting for circulation, filtration, controls, and related pool systems." },
      { name: "Pool Pump & Filter Replacement", slug: "pool-pump-and-filter-replacement", image: "/biz-photos/pelican-pools-llc/equipment.webp", blurb: "Professional pump and filter replacement selected for dependable pool performance." },
      { name: "Green To Clean", slug: "green-to-clean", image: "/biz-photos/pelican-pools-llc/maintenance.webp", blurb: "Focused cleanup, water treatment, and filtration support for algae-affected pools." },
    ],
  },
  // pl0012–pl0015 — official-site service lineups with original Arizona portfolio imagery.
  "m-e-h-pool-services-inc": {
    photos: ["/biz-photos/m-e-h-pool-services-inc/hero.webp", "/biz-photos/m-e-h-pool-services-inc/residential-pool-service.webp", "/biz-photos/m-e-h-pool-services-inc/residential-spa-service.webp", "/biz-photos/m-e-h-pool-services-inc/commercial-services.webp", "/biz-photos/m-e-h-pool-services-inc/pool-renovations.webp", "/biz-photos/m-e-h-pool-services-inc/product-sales.webp", "/biz-photos/m-e-h-pool-services-inc/water-treatment-assistant.webp"],
    services: [
      { name: "Residential Pool Service", slug: "residential-pool-service", image: "/biz-photos/m-e-h-pool-services-inc/residential-pool-service.webp", blurb: "We can handle your maintenance and service needs from A to Z for residential pools." },
      { name: "Residential Spa Service", slug: "residential-spa-service", image: "/biz-photos/m-e-h-pool-services-inc/residential-spa-service.webp", blurb: "We can handle your maintenance and service needs from A to Z for residential spas." },
      { name: "Commercial Services", slug: "commercial-services", image: "/biz-photos/m-e-h-pool-services-inc/commercial-services.webp", blurb: "M.E.H. is licensed, bonded and insured for commercial service and repair." },
      { name: "Pool Renovations", slug: "pool-renovations", image: "/biz-photos/m-e-h-pool-services-inc/pool-renovations.webp", blurb: "Our service department also offers pool renovations." },
      { name: "Product Sales", slug: "product-sales", image: "/biz-photos/m-e-h-pool-services-inc/product-sales.webp", blurb: "We carry pool and spa products including pumps, filters, heaters, cleaners, covers, water treatment, accessories, and supplies." },
      { name: "Water Treatment Assistant", slug: "water-treatment-assistant", image: "/biz-photos/m-e-h-pool-services-inc/water-treatment-assistant.webp", blurb: "Use our virtual water treatment assistant for guidance with your pool and spa water." },
    ],
  },
  "baker-pool-maintenance-llc": {
    photos: ["/biz-photos/baker-pool-maintenance-llc/hero.webp", "/biz-photos/baker-pool-maintenance-llc/pool-drain.webp", "/biz-photos/baker-pool-maintenance-llc/chlorine-wash.webp", "/biz-photos/baker-pool-maintenance-llc/acid-wash.webp", "/biz-photos/baker-pool-maintenance-llc/filter-clean.webp", "/biz-photos/baker-pool-maintenance-llc/diagnostic-visit.webp"],
    services: [
      { name: "Pool Drain", slug: "pool-drain", image: "/biz-photos/baker-pool-maintenance-llc/pool-drain.webp", blurb: "A professional pool drain lets you start fresh with new water and properly balanced chemicals." },
      { name: "Chlorine Wash", slug: "chlorine-wash", image: "/biz-photos/baker-pool-maintenance-llc/chlorine-wash.webp", blurb: "A chlorine wash helps remove algae and thoroughly clean the pool after it has been drained." },
      { name: "Acid Wash", slug: "acid-wash", image: "/biz-photos/baker-pool-maintenance-llc/acid-wash.webp", blurb: "Acid washing can remove stubborn rust stains and brighten the finish of your pool." },
      { name: "Filter Clean", slug: "filter-clean", image: "/biz-photos/baker-pool-maintenance-llc/filter-clean.webp", blurb: "Cleaning cartridge or DE filters improves circulation and helps your pool system operate efficiently." },
      { name: "Diagnostic Visit", slug: "diagnostic-visit", image: "/biz-photos/baker-pool-maintenance-llc/diagnostic-visit.webp", blurb: "When pool equipment is not working, we identify the problem and explain your repair options." },
    ],
  },
  "octopus-pool-service-and-repair": {
    photos: ["/biz-photos/octopus-pool-service-and-repair/hero.webp", "/biz-photos/octopus-pool-service-and-repair/pool-maintenance.webp", "/biz-photos/octopus-pool-service-and-repair/equipment-repair.webp", "/biz-photos/octopus-pool-service-and-repair/pump-maintenance.webp", "/biz-photos/octopus-pool-service-and-repair/green-pool-cleanup.webp", "/biz-photos/octopus-pool-service-and-repair/pool-acid-washing.webp"],
    services: [
      { name: "Pool Maintenance", slug: "pool-maintenance", image: "/biz-photos/octopus-pool-service-and-repair/pool-maintenance.webp", blurb: "Comprehensive pool maintenance keeps your water sparkling clean and healthy." },
      { name: "Equipment Repair", slug: "equipment-repair", image: "/biz-photos/octopus-pool-service-and-repair/equipment-repair.webp", blurb: "Our technicians repair pool equipment to restore reliable, efficient operation." },
      { name: "Pump Maintenance", slug: "pump-maintenance", image: "/biz-photos/octopus-pool-service-and-repair/pump-maintenance.webp", blurb: "Expert pump maintenance helps extend equipment life and prevent costly breakdowns." },
      { name: "Green Pool Cleanup", slug: "green-pool-cleanup", image: "/biz-photos/octopus-pool-service-and-repair/green-pool-cleanup.webp", blurb: "Our green-pool cleanup process removes algae and debris to restore clear, usable water." },
      { name: "Pool Acid Washing", slug: "pool-acid-washing", image: "/biz-photos/octopus-pool-service-and-repair/pool-acid-washing.webp", blurb: "Professional acid washing removes stubborn stains and refreshes the pool surface." },
    ],
  },
  "can-you-fix-my-pool-llc-heaters-pumps-filters-repair-install": {
    name: "Can You Fix My Pool LLC",
    yearsInBusiness: 25,
    photos: ["/biz-photos/can-you-fix-my-pool-llc-heaters-pumps-filters-repair-install/hero.webp", "/biz-photos/can-you-fix-my-pool-llc-heaters-pumps-filters-repair-install/cleaning-services.webp", "/biz-photos/can-you-fix-my-pool-llc-heaters-pumps-filters-repair-install/equipment-repair.webp", "/biz-photos/can-you-fix-my-pool-llc-heaters-pumps-filters-repair-install/salt-water-conversion.webp", "/biz-photos/can-you-fix-my-pool-llc-heaters-pumps-filters-repair-install/tile-cleaning.webp", "/biz-photos/can-you-fix-my-pool-llc-heaters-pumps-filters-repair-install/green-pool-cleanup.webp"],
    services: [
      { name: "Flexible Cleaning Services", slug: "weekly-bi-weekly-and-monthly-cleaning-services", image: "/biz-photos/can-you-fix-my-pool-llc-heaters-pumps-filters-repair-install/cleaning-services.webp", blurb: "Weekly, bi-weekly, and monthly cleaning schedules keep your pool clean and ready to enjoy." },
      { name: "Pumps, Motors & Filters", slug: "repairs-and-parts-pumps-motors-filters", image: "/biz-photos/can-you-fix-my-pool-llc-heaters-pumps-filters-repair-install/equipment-repair.webp", blurb: "We repair essential pool equipment and replace parts for pumps, motors, and filters." },
      { name: "Salt Water Conversion", slug: "salt-water-conversion", image: "/biz-photos/can-you-fix-my-pool-llc-heaters-pumps-filters-repair-install/salt-water-conversion.webp", blurb: "Convert a traditional chlorine pool to a professionally installed salt-water system." },
      { name: "Tile Cleaning", slug: "tile-cleaning", image: "/biz-photos/can-you-fix-my-pool-llc-heaters-pumps-filters-repair-install/tile-cleaning.webp", blurb: "Pool tile cleaning removes scale and buildup to restore a clean waterline." },
      { name: "Green Pool Cleanup", slug: "green-pool-cleanup", image: "/biz-photos/can-you-fix-my-pool-llc-heaters-pumps-filters-repair-install/green-pool-cleanup.webp", blurb: "Specialized cleanup brings algae-filled green pools back to a clear, swimmable condition." },
    ],
  },
  // pl0002 Hollywood Pools — official extracted lineup with a dedicated original image per service.
  "phoenix-pool-service-hollywood-pools": {
    photos: [
      "/biz-photos/phoenix-pool-service-hollywood-pools/hero.webp",
      "/biz-photos/phoenix-pool-service-hollywood-pools/pool-pump-repairs.webp",
      "/biz-photos/phoenix-pool-service-hollywood-pools/filter-installations.webp",
      "/biz-photos/phoenix-pool-service-hollywood-pools/green-to-cleans.webp",
      "/biz-photos/phoenix-pool-service-hollywood-pools/pool-cleaning.webp",
    ],
    services: [
      { name: "Pool Pump Repairs", slug: "pool-pump-repairs", image: "/biz-photos/phoenix-pool-service-hollywood-pools/pool-pump-repairs.webp", blurb: "Accurate diagnosis and practical repairs for pool pumps, motors, valves, and circulation problems." },
      { name: "Filter Installations", slug: "filter-installations", image: "/biz-photos/phoenix-pool-service-hollywood-pools/filter-installations.webp", blurb: "Professional pool-filter replacement and installation with clean plumbing connections and reliable flow." },
      { name: "Green-to-Clean Service", slug: "green-to-cleans", image: "/biz-photos/phoenix-pool-service-hollywood-pools/green-to-cleans.webp", blurb: "Focused algae treatment, brushing, filtration, and water balancing to restore a neglected green pool." },
      { name: "Pool Cleaning", slug: "pool-cleaning", image: "/biz-photos/phoenix-pool-service-hollywood-pools/pool-cleaning.webp", blurb: "Dependable recurring cleaning and chemical care that keeps Phoenix pools clear, balanced, and ready to enjoy." },
    ],
  },
  // pl0005 K&K Pool Service — parked domain, so services are limited to work repeatedly documented in reviews.
  "kandk-pool-service": {
    name: "K&K Pool Service",
    photos: [
      "/biz-photos/kandk-pool-service/hero.webp",
      "/biz-photos/kandk-pool-service/weekly-service.webp",
      "/biz-photos/kandk-pool-service/pool-repair.webp",
      "/biz-photos/kandk-pool-service/equipment-installation.webp",
      "/biz-photos/kandk-pool-service/filter-cleaning.webp",
      "/biz-photos/kandk-pool-service/salt-systems.webp",
    ],
    services: [
      { name: "Weekly Pool Service", slug: "weekly-pool-service", image: "/biz-photos/kandk-pool-service/weekly-service.webp", blurb: "Reliable weekly cleaning, water balancing, equipment checks, and clear communication about your pool's condition." },
      { name: "Pool Equipment Repair", slug: "pool-equipment-repair", image: "/biz-photos/kandk-pool-service/pool-repair.webp", blurb: "Straightforward diagnosis and repair for pumps, filters, valves, timers, spa jets, and plumbing leaks." },
      { name: "Equipment Installation", slug: "equipment-installation", image: "/biz-photos/kandk-pool-service/equipment-installation.webp", blurb: "Professional pump, motor, filter, and equipment replacement without pressure to buy more than your pool needs." },
      { name: "Filter Cleaning", slug: "filter-cleaning", image: "/biz-photos/kandk-pool-service/filter-cleaning.webp", blurb: "Thorough cartridge, DE, and filter-system cleaning to restore healthy flow and efficient circulation." },
      { name: "Salt System Service", slug: "salt-system-service", image: "/biz-photos/kandk-pool-service/salt-systems.webp", blurb: "Salt-cell inspection, cleaning, and saltwater equipment service guided by the actual condition of your system." },
    ],
    generatedCopy: { aboutBody: ["K&K Pool Service gives Phoenix homeowners the honest, responsive pool care they have been looking for. Aaron and the team handle weekly maintenance, equipment repairs, and practical upgrades with clear communication and fair pricing.", "Customers value a repair-first approach: the team explains what is happening, shares useful care tips, and avoids unnecessary replacement when existing equipment can be serviced."] },
  },
  // pl0006 SwimHappy — exact official plan and upgrade lineup, with each card explicitly illustrated.
  "swimhappy-pool-service-and-repair": {
    photos: [
      "/biz-photos/swimhappy-pool-service-and-repair/hero.webp",
      "/biz-photos/swimhappy-pool-service-and-repair/essentials-weekly.webp",
      "/biz-photos/swimhappy-pool-service-and-repair/chemical-weekly.webp",
      "/biz-photos/swimhappy-pool-service-and-repair/preferred-weekly.webp",
      "/biz-photos/swimhappy-pool-service-and-repair/premier-weekly.webp",
      "/biz-photos/swimhappy-pool-service-and-repair/variable-speed-pump.webp",
      "/biz-photos/swimhappy-pool-service-and-repair/oxidation-system.webp",
    ],
    services: [
      { name: "Essentials Weekly Service", slug: "essentials-weekly-service", image: "/biz-photos/swimhappy-pool-service-and-repair/essentials-weekly.webp", blurb: "Our popular plan for the average Arizona pool includes brushing, skimming, vacuuming as needed, chemistry testing, and equipment checks." },
      { name: "Chemical Weekly Service", slug: "chemical-weekly-service", image: "/biz-photos/swimhappy-pool-service-and-repair/chemical-weekly.webp", blurb: "Affordable chemical care for well-kept pools, focused on balanced water and routine equipment checks." },
      { name: "Preferred Weekly Service", slug: "preferred-weekly-service", image: "/biz-photos/swimhappy-pool-service-and-repair/preferred-weekly.webp", blurb: "Extended service for higher-demand or heavy-debris pools, including manual vacuuming every visit." },
      { name: "Premier Weekly Service", slug: "premier-weekly-service", image: "/biz-photos/swimhappy-pool-service-and-repair/premier-weekly.webp", blurb: "White-glove maintenance for complex pools, with priority scheduling, more on-site time, and proactive checks." },
      { name: "Variable-Speed Pump Installation", slug: "variable-speed-pump-installation", image: "/biz-photos/swimhappy-pool-service-and-repair/variable-speed-pump.webp", blurb: "Professional variable-speed pump installation for efficient circulation and precise flow control." },
      { name: "Advanced Oxidation Process", slug: "advanced-oxidation-process", image: "/biz-photos/swimhappy-pool-service-and-repair/oxidation-system.webp", blurb: "Advanced oxidation upgrades designed to deliver pure-feeling water while greatly reducing chlorine demand." },
    ],
  },
  // pl0007 Desert Mesa — exact official repair/maintenance lineup with original service-specific images.
  "desert-mesa-pool-service-llc": {
    photos: [
      "/biz-photos/desert-mesa-pool-service-llc/hero.webp",
      "/biz-photos/desert-mesa-pool-service-llc/swimming-pool-repair.webp",
      "/biz-photos/desert-mesa-pool-service-llc/heater-repair.webp",
      "/biz-photos/desert-mesa-pool-service-llc/maintenance.webp",
      "/biz-photos/desert-mesa-pool-service-llc/leak-repair.webp",
    ],
    services: [
      { name: "Swimming Pool Repair", slug: "swimming-pool-repair", image: "/biz-photos/desert-mesa-pool-service-llc/swimming-pool-repair.webp", blurb: "Experienced diagnosis and repair for pumps, filters, lighting, sanitization, controls, and circulation equipment." },
      { name: "Pool Heater Installation & Repair", slug: "swimming-pool-heater-install-and-repair", image: "/biz-photos/desert-mesa-pool-service-llc/heater-repair.webp", blurb: "Pool-heater installation and repair for sensors, ignitors, control boards, weather damage, and other common faults." },
      { name: "Swimming Pool Maintenance", slug: "swimming-pool-maintenance", image: "/biz-photos/desert-mesa-pool-service-llc/maintenance.webp", blurb: "Comprehensive cleaning, debris removal, filter cleaning, and backwashing for clear water and healthy flow." },
      { name: "Pool System Leak Repair", slug: "detecting-and-fixing-pool-system-leaks", image: "/biz-photos/desert-mesa-pool-service-llc/leak-repair.webp", blurb: "Leak detection and lasting repair for pump seals, fill valves, backwash valves, and failed plumbing joints." },
    ],
  },
  // pl0016-pl0020 — original Mesa pool-service photography with explicit service-page bindings.
  "clear-water-pool-repair-llc": {
    photos: [
      "/biz-photos/clear-water-pool-repair-llc/hero.webp",
      "/biz-photos/clear-water-pool-repair-llc/maintenance.webp",
      "/biz-photos/clear-water-pool-repair-llc/repair.webp",
    ],
    services: [
      { name: "Pool Leak Detection", slug: "pool-leak-detection", image: "/biz-photos/clear-water-pool-repair-llc/repair.webp", blurb: "Careful troubleshooting to locate suspected water loss and identify the right repair path." },
      { name: "Cloudy Pool Water Fix", slug: "cloudy-pool-water-fix", image: "/biz-photos/clear-water-pool-repair-llc/maintenance.webp", blurb: "Targeted water testing, filtration checks, and treatment to restore clear, inviting water." },
      { name: "Pool Damage Prevention", slug: "pool-damage-prevention", image: "/biz-photos/clear-water-pool-repair-llc/maintenance.webp", blurb: "Practical preventive care that helps protect pool surfaces, plumbing, and equipment." },
      { name: "Weekly Pool Maintenance", slug: "weekly-pool-maintenance", image: "/biz-photos/clear-water-pool-repair-llc/maintenance.webp", blurb: "Consistent cleaning, water checks, and equipment monitoring for a swim-ready pool." },
      { name: "Cracked Pool Repair", slug: "cracked-pool-repair", image: "/biz-photos/clear-water-pool-repair-llc/repair.webp", blurb: "Assessment and repair planning for visible pool cracks and related water-loss concerns." },
      { name: "Professional Pool Repair", slug: "professional-pool-repair", image: "/biz-photos/clear-water-pool-repair-llc/repair.webp", blurb: "Professional diagnosis and repair for pool plumbing, circulation, and equipment issues." },
    ],
  },
  "good-life-pool-and-spa-care-llc": {
    photos: [
      "/biz-photos/good-life-pool-and-spa-care-llc/hero.webp",
      "/biz-photos/good-life-pool-and-spa-care-llc/maintenance.webp",
      "/biz-photos/good-life-pool-and-spa-care-llc/equipment.webp",
    ],
    services: [
      { name: "Weekly Pool Service", slug: "weekly-pool-service", image: "/biz-photos/good-life-pool-and-spa-care-llc/maintenance.webp", blurb: "Reliable weekly cleaning and water care for residential and commercial pools." },
      { name: "Green-To-Clean Service", slug: "green-to-clean-service", image: "/biz-photos/good-life-pool-and-spa-care-llc/maintenance.webp", blurb: "Focused algae treatment and cleanup to help restore neglected green water." },
      { name: "Equipment Upgrades", slug: "equipment-upgrades", image: "/biz-photos/good-life-pool-and-spa-care-llc/equipment.webp", blurb: "Professional equipment improvements that support dependable circulation and easier care." },
      { name: "Commercial Pool Maintenance", slug: "commercial-pool-maintenance", image: "/biz-photos/good-life-pool-and-spa-care-llc/maintenance.webp", blurb: "Consistent pool care for community and commercial properties across the East Valley." },
    ],
  },
  "tropical-pool-services": {
    photos: [
      "/biz-photos/tropical-pool-services/hero.webp",
      "/biz-photos/tropical-pool-services/repair.webp",
      "/biz-photos/tropical-pool-services/maintenance.webp",
    ],
    services: [
      { name: "Pool Repair", slug: "pool-repair", image: "/biz-photos/tropical-pool-services/repair.webp", blurb: "Responsive diagnosis and repair for pool plumbing, circulation, and equipment problems." },
      { name: "Equipment Service", slug: "equipment-service", image: "/biz-photos/tropical-pool-services/repair.webp", blurb: "Careful service for pumps, filters, valves, and the components that keep water moving." },
      { name: "Routine Pool Care", slug: "routine-pool-care", image: "/biz-photos/tropical-pool-services/maintenance.webp", blurb: "Practical cleaning and water care that helps keep Mesa pools clear and enjoyable." },
    ],
  },
  "blue-clover-pool-service": {
    photos: [
      "/biz-photos/blue-clover-pool-service/hero.webp",
      "/biz-photos/blue-clover-pool-service/repair.webp",
    ],
    services: [
      { name: "Weekly Pool Service", slug: "pool-service", image: "/biz-photos/blue-clover-pool-service/hero.webp", blurb: "Regular cleaning, water checks, and equipment monitoring for dependable pool care." },
      { name: "Pool Repair", slug: "pool-repair", image: "/biz-photos/blue-clover-pool-service/repair.webp", blurb: "Thorough diagnosis and practical repair solutions for common pool problems." },
      { name: "Equipment Diagnostics", slug: "equipment-diagnostics", image: "/biz-photos/blue-clover-pool-service/repair.webp", blurb: "Focused troubleshooting for pumps, filters, plumbing, and circulation equipment." },
    ],
  },
  "five-star-pool-service": {
    photos: [
      "/biz-photos/five-star-pool-service/hero.webp",
      "/biz-photos/five-star-pool-service/tile-cleaning.webp",
      "/biz-photos/five-star-pool-service/repair.webp",
    ],
    services: [
      { name: "Weekly Cleaning & Chemicals", slug: "weekly-cleaning-and-chemicals", image: "/biz-photos/five-star-pool-service/hero.webp", blurb: "Scheduled cleaning and water balancing tailored to the needs of your pool." },
      { name: "Equipment Inspections", slug: "equipment-inspections", image: "/biz-photos/five-star-pool-service/repair.webp", blurb: "Routine checks of pumps, filters, timers, and circulation equipment." },
      { name: "One-Time Cleanups", slug: "one-time-cleanups", image: "/biz-photos/five-star-pool-service/tile-cleaning.webp", blurb: "Focused cleanup options for pools that need extra attention and a fresh start." },
      { name: "Repairs", slug: "repairs", image: "/biz-photos/five-star-pool-service/repair.webp", blurb: "Experienced repair for pumps, motors, lights, and related pool equipment." },
      { name: "Pool School", slug: "pool-school", image: "/biz-photos/five-star-pool-service/hero.webp", blurb: "Hands-on guidance to help owners understand pool operation and routine care." },
      { name: "Tile Cleaning", slug: "tile-cleaning", image: "/biz-photos/five-star-pool-service/tile-cleaning.webp", blurb: "Detailed waterline tile cleaning to address visible mineral buildup." },
    ],
  },
  // hv0004 Desert Diamond Air — current official positioning includes plumbing and whole-home performance
  // alongside HVAC. Replace the single remote photo and generic six-card template with eight verified pillars,
  // each explicitly bound to a cohesive original Phoenix service image.
  "desert-diamond-air-cooling-and-heating": {
    showAllServices: true,
    yearsInBusiness: 15,
    photos: [
      "/biz-photos/desert-diamond-air-cooling-and-heating/hero.webp",
      "/biz-photos/desert-diamond-air-cooling-and-heating/cooling.webp",
      "/biz-photos/desert-diamond-air-cooling-and-heating/heating.webp",
      "/biz-photos/desert-diamond-air-cooling-and-heating/plumbing.webp",
      "/biz-photos/desert-diamond-air-cooling-and-heating/maintenance.webp",
      "/biz-photos/desert-diamond-air-cooling-and-heating/heat-pumps.webp",
      "/biz-photos/desert-diamond-air-cooling-and-heating/air-quality.webp",
      "/biz-photos/desert-diamond-air-cooling-and-heating/ductwork.webp",
      "/biz-photos/desert-diamond-air-cooling-and-heating/home-performance.webp",
    ],
    services: [
      { name: "Air Conditioning", slug: "air-conditioning", image: "/biz-photos/desert-diamond-air-cooling-and-heating/cooling.webp", blurb: "Fast AC repair plus professional installation, replacement, and maintenance for all major brands, with solutions built for reliable comfort in extreme Phoenix heat." },
      { name: "Heating Services", slug: "heating", image: "/biz-photos/desert-diamond-air-cooling-and-heating/heating.webp", blurb: "Furnace and heating repair, service, installation, and replacement to keep your home dependable and comfortable through Arizona's cooler nights." },
      { name: "Plumbing Services", slug: "plumbing", image: "/biz-photos/desert-diamond-air-cooling-and-heating/plumbing.webp", blurb: "Residential plumbing help that protects clean water, reliable drainage, and everyday comfort, backed by prompt service and clear recommendations." },
      { name: "HVAC Maintenance", slug: "hvac-maintenance", image: "/biz-photos/desert-diamond-air-cooling-and-heating/maintenance.webp", blurb: "Planned tune-ups that inspect, test, clean, and adjust your equipment to support efficiency, safety, reliability, and longer system life." },
      { name: "Heat Pumps", slug: "heat-pumps", image: "/biz-photos/desert-diamond-air-cooling-and-heating/heat-pumps.webp", blurb: "Heat pump installation, replacement, repair, and maintenance for efficient year-round heating and cooling from one versatile system." },
      { name: "Indoor Air Quality", slug: "indoor-air-quality", image: "/biz-photos/desert-diamond-air-cooling-and-heating/air-quality.webp", blurb: "Whole-home air cleaners, filtration, and tailored IAQ recommendations to help reduce desert dust, pollen, odors, and airborne contaminants." },
      { name: "Ductwork & Duct Cleaning", slug: "ductwork-cleaning", image: "/biz-photos/desert-diamond-air-cooling-and-heating/ductwork.webp", blurb: "Duct inspection, repair, professional cleaning, fogging, and Aeroseal sealing to improve airflow, reduce dust, and keep conditioned air where it belongs." },
      { name: "Insulation & Home Performance", slug: "home-performance", image: "/biz-photos/desert-diamond-air-cooling-and-heating/home-performance.webp", blurb: "Energy audits, air sealing, and attic insulation guided by whole-house performance expertise to improve comfort and reduce wasted energy." },
    ],
    generatedCopy: {
      heroH1: "Phoenix HVAC, Plumbing & Home Performance",
      heroSubhead: "Fast-response cooling, heating, plumbing, ductwork, air quality, and insulation service from local experts who understand what desert homes need.",
      aboutHeading: "Whole-Home Comfort, Built for Phoenix",
      aboutBody: [
        "Since 2011, Desert Diamond Air has helped Greater Phoenix homeowners stay comfortable through extreme summer heat, cool desert nights, and the dust and efficiency challenges unique to Arizona homes.",
        "Our licensed team handles more than heating and cooling. Plumbing, ductwork, indoor air quality, insulation, and energy audits let us look at how the entire home performs instead of treating one piece in isolation.",
        "Whether you need a fast repair, a new high-efficiency system, or a plan to improve comfort throughout the house, expect clear options, careful workmanship, and help available around the clock.",
      ],
      metaTitle: "Desert Diamond Air | Phoenix HVAC & Plumbing",
      metaDescription: "Desert Diamond Air provides 24/7 HVAC, plumbing, heat pump, ductwork, indoor air quality, insulation, and home-performance services across Greater Phoenix.",
    },
  },
  // ro0036 #1 Desert Roofing — no active first-party site remains, so the service lineup stays narrowly
  // grounded in matched historical listings and customer reports. Replace the single remote photo with
  // a cohesive Chandler roofing set and explicitly bind every card to the work it describes.
  "1-desert-roofing": {
    photos: [
      "/biz-photos/1-desert-roofing/hero.webp",
      "/biz-photos/1-desert-roofing/roof-replacement.webp",
      "/biz-photos/1-desert-roofing/roof-repair.webp",
      "/biz-photos/1-desert-roofing/tile-roofing.webp",
      "/biz-photos/1-desert-roofing/shingle-roofing.webp",
      "/biz-photos/1-desert-roofing/foam-roofing.webp",
      "/biz-photos/1-desert-roofing/roof-inspection.webp",
    ],
    services: [
      { name: "Roof Replacement", slug: "roof-replacement", image: "/biz-photos/1-desert-roofing/roof-replacement.webp", blurb: "Complete residential re-roofing with careful preparation, durable materials, and clear communication from the initial evaluation through final cleanup." },
      { name: "Roof Repair", slug: "roof-repair", image: "/biz-photos/1-desert-roofing/roof-repair.webp", blurb: "Prompt, targeted repairs for leaks, worn underlayment, flashing problems, and monsoon damage to restore your roof and help prevent further issues." },
      { name: "Tile Roofing", slug: "tile-roofing", image: "/biz-photos/1-desert-roofing/tile-roofing.webp", blurb: "Concrete and clay tile roofing repaired or replaced with close attention to underlayment, flashing, alignment, and the details Arizona roofs depend on." },
      { name: "Shingle Roofing", slug: "shingle-roofing", image: "/biz-photos/1-desert-roofing/shingle-roofing.webp", blurb: "Dependable dimensional shingle installation and repair for an efficient, attractive roofing system suited to your home and budget." },
      { name: "Flat & Foam Roofing", slug: "foam-roofing", image: "/biz-photos/1-desert-roofing/foam-roofing.webp", blurb: "Seamless foam and reflective coating solutions for residential flat and low-slope roofs, with careful attention to penetrations, parapets, and drainage." },
      { name: "Roof Inspections", slug: "roof-inspection", image: "/biz-photos/1-desert-roofing/roof-inspection.webp", blurb: "A detailed roof evaluation that identifies cracked materials, flashing concerns, underlayment wear, and other problems before repairs begin." },
    ],
  },
  // ro0029 Roofing All Stars — family-owned Chandler roofers since 1999. Original image set covers the
  // full Arizona system mix they publish: repair/replacement plus tile, shingle, foam/flat, and inspection.
  "roofing-all-stars": {
    yearsInBusiness: 27,
    photos: [
      "/biz-photos/roofing-all-stars/hero-original.webp",
      "/biz-photos/roofing-all-stars/roof-replacement-original.webp",
      "/biz-photos/roofing-all-stars/roof-repair-original.webp",
      "/biz-photos/roofing-all-stars/tile-roofing-original.webp",
      "/biz-photos/roofing-all-stars/shingle-roofing-original.webp",
      "/biz-photos/roofing-all-stars/foam-roofing-original.webp",
      "/biz-photos/roofing-all-stars/roof-inspection-original.webp",
    ],
    services: [
      { name: "Roof Replacement", slug: "roof-replacement", image: "/biz-photos/roofing-all-stars/roof-replacement-original.webp", blurb: "A complete tear-off, deck inspection, premium underlayment, and new tile, shingle, metal, foam, or flat roof built for Arizona heat and backed by our 25-year workmanship warranty." },
      { name: "Roof Repair", slug: "roof-repair", image: "/biz-photos/roofing-all-stars/roof-repair-original.webp", blurb: "We trace leaks to the real source — cracked tiles, failed flashing, valleys, storm damage, and roof transitions — then make a targeted repair designed to hold." },
      { name: "Tile Roofing", slug: "tile-roofing", image: "/biz-photos/roofing-all-stars/tile-roofing-original.webp", blurb: "Concrete and clay tile installation, lift-and-relay, underlayment replacement, and repairs performed by Certified Master Roofers who understand Arizona tile systems." },
      { name: "Shingle Roofing", slug: "shingle-roofing", image: "/biz-photos/roofing-all-stars/shingle-roofing-original.webp", blurb: "Manufacturer-certified architectural shingle systems installed with correct ventilation, flashing, and fastening for reliable protection and strong curb appeal." },
      { name: "Flat & Foam Roofing", slug: "foam-roofing", image: "/biz-photos/roofing-all-stars/foam-roofing-original.webp", blurb: "Seamless spray foam, reflective silicone coatings, modified bitumen, and flat-roof repairs that resist UV exposure, seal out monsoon water, and reduce heat gain." },
      { name: "Roof Inspections", slug: "roof-inspection", image: "/biz-photos/roofing-all-stars/roof-inspection-original.webp", blurb: "A careful roof walk, thermal imaging when appropriate, and photo documentation give you a clear written diagnosis and recommendation without sales pressure." },
    ],
    generatedCopy: {
      heroH1: "The Roof That Outlasts the House",
      heroSubhead: "Family-owned in Chandler since 1999, Roofing All Stars installs and repairs tile, shingle, metal, foam, and flat roofs across Maricopa County — backed by a 25-year workmanship warranty.",
      aboutHeading: "Family-Owned. Master-Certified. Backed in Writing.",
      aboutBody: [
        "Roofing All Stars started with one truck and one promise: install the roof correctly and stand behind it. More than 25 years later, owner Alex Simpson remains directly involved from the first inspection through final cleanup.",
        "Our Certified Master Roofer crew works across the systems Arizona homes depend on — tile, shingle, metal, foam, and flat roofing. We do not force every roof into the same solution, and we do not subcontract the work.",
        "Every estimate includes clear recommendations and photo documentation. Complete installations carry a 25-year workmanship warranty in writing, alongside the strongest available manufacturer coverage.",
      ],
      ctaHeadline: "Get a Clear Roofing Recommendation",
      ctaSubhead: "Schedule a free inspection and written estimate from Chandler roofers who have stood behind their work since 1999.",
      metaTitle: "Roofing All Stars | Chandler Roof Repair & Replacement",
      metaDescription: "Family-owned Chandler roofers for tile, shingle, metal, foam, and flat roof repair and replacement, backed by a 25-year workmanship warranty.",
    },
  },
  // az0039 Grass Kings Landscaping — official positioning is Queen Creek and East Valley design,
  // construction, and maintenance. Every verified service is bound to a matching original image.
  "grass-kings-landscaping": {
    photos: [
      "/biz-photos/grass-kings-landscaping/hero.webp",
      "/biz-photos/grass-kings-landscaping/landscape-design.webp",
      "/biz-photos/grass-kings-landscaping/landscape-construction.webp",
      "/biz-photos/grass-kings-landscaping/landscape-maintenance.webp",
      "/biz-photos/grass-kings-landscaping/artificial-turf.webp",
      "/biz-photos/grass-kings-landscaping/hardscaping-masonry.webp",
      "/biz-photos/grass-kings-landscaping/outdoor-kitchens.webp",
    ],
    services: [
      { name: "Landscape Design", slug: "landscape-design", image: "/biz-photos/grass-kings-landscaping/landscape-design.webp", blurb: "We believe the best landscapes begin with listening, and our consultants meet with you to explore your needs, assess your property, and design a tailored landscape plan that fits your aesthetic and budget." },
      { name: "Landscape Construction", slug: "landscape-construction", image: "/biz-photos/grass-kings-landscaping/landscape-construction.webp", blurb: "Professional construction for patios, turf, pavers, irrigation, planting, and hardscape features built for lasting performance in the Arizona climate." },
      { name: "Landscape Maintenance", slug: "landscape-maintenance", image: "/biz-photos/grass-kings-landscaping/landscape-maintenance.webp", blurb: "Proper plant care, seasonal maintenance, irrigation tuning, and ongoing support keep every landscape healthy, polished, and enjoyable year-round." },
      { name: "Artificial Turf", slug: "artificial-turf", image: "/biz-photos/grass-kings-landscaping/artificial-turf.webp", blurb: "Waterwise artificial turf installed with careful base preparation, precise seams, and clean edges for a lush landscape with less maintenance." },
      { name: "Hardscaping & Masonry", slug: "hardscaping-and-masonry", image: "/biz-photos/grass-kings-landscaping/hardscaping-masonry.webp", blurb: "Pavers and masonry installed with precision, durable preparation, practical layouts, and thoughtful finishing details." },
      { name: "Outdoor Kitchens", slug: "outdoor-kitchens", image: "/biz-photos/grass-kings-landscaping/outdoor-kitchens.webp", blurb: "Custom outdoor kitchens create a comfortable, functional place to cook, gather, and enjoy Arizona evenings." },
    ],
    generatedCopy: {
      heroH1: "East Valley Landscapes, Designed for Real Life",
      heroSubhead: "Thoughtful landscape design, precise construction, and dependable ongoing care for homes in Queen Creek and across Arizona's East Valley.",
      serviceAreaBlurb: "Grass Kings Landscaping serves Queen Creek and communities throughout the East Valley.",
      metaTitle: "Grass Kings Landscaping | Queen Creek & East Valley, AZ",
      metaDescription: "Grass Kings Landscaping designs, builds, and maintains outdoor spaces in Queen Creek and Arizona's East Valley, including turf, pavers, masonry, and outdoor kitchens.",
    },
  },
  // az0035 NexGen Landscaping — their actual business is commercial + HOA landscape management, not the
  // residential design/turf/patio mix in the generated record. Restore the six services published on their
  // current site and bind each to an original Phoenix commercial-property image.
  "nexgen-landscaping": {
    showAllServices: true,
    photos: [
      "/biz-photos/nexgen-landscaping/hero.webp",
      "/biz-photos/nexgen-landscaping/maintenance.webp",
      "/biz-photos/nexgen-landscaping/tree-care.webp",
      "/biz-photos/nexgen-landscaping/irrigation.webp",
      "/biz-photos/nexgen-landscaping/installs.webp",
      "/biz-photos/nexgen-landscaping/porter.webp",
      "/biz-photos/nexgen-landscaping/weed-control.webp",
    ],
    services: [
      { name: "Landscape Maintenance", slug: "landscape-maintenance", image: "/biz-photos/nexgen-landscaping/maintenance.webp", blurb: "Consistent commercial and HOA landscape care, including turf, garden upkeep, detail work, and seasonal cleanups that keep every property polished year-round." },
      { name: "Tree Care", slug: "tree-care", image: "/biz-photos/nexgen-landscaping/tree-care.webp", blurb: "Professional pruning, trimming, health management, and removal keep trees across your property attractive, structurally sound, and safe." },
      { name: "Irrigation Management", slug: "irrigation-management", image: "/biz-photos/nexgen-landscaping/irrigation.webp", blurb: "Proactive irrigation monitoring, repair, and water scheduling support healthy landscapes while reducing waste and controlling operating costs." },
      { name: "Landscape Installation", slug: "landscape-installation", image: "/biz-photos/nexgen-landscaping/installs.webp", blurb: "From hardscape and planting improvements to complete commercial installations, our crews build durable landscapes designed for Arizona properties." },
      { name: "Porter Service", slug: "porter-service", image: "/biz-photos/nexgen-landscaping/porter.webp", blurb: "Routine litter patrol, debris removal, and exterior detail service keep shopping centers, communities, and commercial grounds clean and welcoming." },
      { name: "Weed Control", slug: "weed-control", image: "/biz-photos/nexgen-landscaping/weed-control.webp", blurb: "Targeted, responsible weed-control programs remove unwanted growth and help prevent its return without compromising the landscape you want to protect." },
    ],
    generatedCopy: {
      heroH1: "Arizona's Commercial Landscaping Experts",
      heroSubhead: "NexGen installs and maintains premium landscapes for commercial properties and HOA communities across the Phoenix metro — with responsive crews, smart water management, and service that shows up on time.",
      aboutHeading: "Landscape Management Built for Better Communities",
      aboutBody: [
        "NexGen Landscaping specializes in the complex needs of commercial properties and HOA communities. From shopping centers and industrial parks to municipalities and multi-housing developments, our teams protect curb appeal across every acre.",
        "Property managers count on clear communication, proactive recommendations, and crews that arrive prepared. We combine sound horticultural practices with efficient systems to keep landscapes healthy while managing water use and long-term costs.",
        "Maintenance, tree care, irrigation, installations, porter service, and weed control all work together under one accountable partner — giving your team fewer vendors to manage and a property everyone can take pride in.",
      ],
      ctaHeadline: "Build a Better-Managed Property",
      ctaSubhead: "Tell us about your commercial property or community and request a customized landscape-management proposal.",
      metaTitle: "NexGen Landscaping | Phoenix Commercial & HOA Landscaping",
      metaDescription: "NexGen provides commercial and HOA landscape maintenance, tree care, irrigation, installations, porter service, and weed control across Phoenix.",
    },
  },
  // az0021 Goodman's Landscape Maintenance — replace the single legacy photo plus generic demo pool with
  // a cohesive Phoenix landscape set. Each generated service image shows the named work or finished result.
  "goodman-s-landscape-maintenance-llc": {
    photos: [
      "/biz-photos/goodman-s-landscape-maintenance-llc/hero.webp",
      "/biz-photos/goodman-s-landscape-maintenance-llc/landscape-design.webp",
      "/biz-photos/goodman-s-landscape-maintenance-llc/xeriscaping.webp",
      "/biz-photos/goodman-s-landscape-maintenance-llc/artificial-turf.webp",
      "/biz-photos/goodman-s-landscape-maintenance-llc/irrigation.webp",
      "/biz-photos/goodman-s-landscape-maintenance-llc/maintenance.webp",
      "/biz-photos/goodman-s-landscape-maintenance-llc/hardscaping.webp",
    ],
    services: [
      { name: "Landscape Design & Installation", slug: "landscape-design", image: "/biz-photos/goodman-s-landscape-maintenance-llc/landscape-design.webp", blurb: "We shape unique outdoor environments, turning your vision into a cohesive, beautiful landscape plan." },
      { name: "Xeriscaping & Desert Landscaping", slug: "xeriscaping", image: "/biz-photos/goodman-s-landscape-maintenance-llc/xeriscaping.webp", blurb: "Discover water-efficient xeriscaping and desert landscaping solutions that thrive in the Arizona climate while minimizing upkeep." },
      { name: "Artificial Turf Installation", slug: "artificial-turf", image: "/biz-photos/goodman-s-landscape-maintenance-llc/artificial-turf.webp", blurb: "Enjoy lush, green aesthetics year-round with our expertly installed, low-maintenance artificial turf systems." },
      { name: "Irrigation & Drip Systems", slug: "irrigation", image: "/biz-photos/goodman-s-landscape-maintenance-llc/irrigation.webp", blurb: "Our precise irrigation and drip systems ensure optimal water delivery, keeping your landscape healthy and conserving resources." },
      { name: "Lawn & Yard Maintenance", slug: "maintenance", image: "/biz-photos/goodman-s-landscape-maintenance-llc/maintenance.webp", blurb: "Keep your property pristine with our comprehensive lawn and yard maintenance services, tailored to your specific needs." },
      { name: "Paver Patios & Hardscaping", slug: "hardscaping", image: "/biz-photos/goodman-s-landscape-maintenance-llc/hardscaping.webp", blurb: "Enhance your outdoor living with custom paver patios, walkways, and other hardscaping elements that add structure and style." },
    ],
  },
  // az0033 Paradise Green Landscaping — the reviews consistently describe a long-term residential
  // maintenance company, not a design/build contractor. Replace the generic demo pool with a cohesive
  // Phoenix maintenance set and bind each grounded service to its matching original image.
  "paradise-green-landscaping-llc": {
    photos: [
      "/biz-photos/paradise-green-landscaping-llc/hero.webp",
      "/biz-photos/paradise-green-landscaping-llc/yard-maintenance.webp",
      "/biz-photos/paradise-green-landscaping-llc/tree-shrub-trimming.webp",
      "/biz-photos/paradise-green-landscaping-llc/irrigation-repair.webp",
      "/biz-photos/paradise-green-landscaping-llc/weed-control.webp",
      "/biz-photos/paradise-green-landscaping-llc/seasonal-cleanup.webp",
      "/biz-photos/paradise-green-landscaping-llc/storm-debris.webp",
    ],
    services: [
      { name: "Lawn & Yard Maintenance", slug: "maintenance", image: "/biz-photos/paradise-green-landscaping-llc/yard-maintenance.webp", blurb: "Dependable recurring care for lawns, gravel areas, walkways, and planting beds, with the consistent attention that keeps Phoenix yards looking their best." },
      { name: "Tree & Shrub Trimming", slug: "tree-shrub-trimming", image: "/biz-photos/paradise-green-landscaping-llc/tree-shrub-trimming.webp", blurb: "Thoughtful pruning and shaping for trees, hedges, and desert shrubs to maintain healthy growth, neat lines, and safe clearance around your property." },
      { name: "Irrigation & Drip Repair", slug: "irrigation-repair", image: "/biz-photos/paradise-green-landscaping-llc/irrigation-repair.webp", blurb: "Sprinkler and drip-system checks and repairs that find leaks, replace failed emitters, and help your landscape receive the water it needs without waste." },
      { name: "Weed Control", slug: "weed-control", image: "/biz-photos/paradise-green-landscaping-llc/weed-control.webp", blurb: "Detailed weed removal and ongoing control for decorative rock, beds, and hardscape edges, leaving the entire yard clean and well cared for." },
      { name: "Seasonal Yard Cleanup", slug: "seasonal-cleanup", image: "/biz-photos/paradise-green-landscaping-llc/seasonal-cleanup.webp", blurb: "One-time and seasonal cleanups for overgrown or neglected yards, including trimming, raking, debris collection, and a thorough finishing pass." },
      { name: "Storm Debris Removal", slug: "storm-debris-removal", image: "/biz-photos/paradise-green-landscaping-llc/storm-debris.webp", blurb: "Responsive cleanup after Phoenix monsoons, with fallen limbs cut down to manageable sections, collected, and hauled away from your property." },
    ],
    generatedCopy: {
      heroH1: "Reliable Phoenix Yard Care, Season After Season",
      heroSubhead: "Family-owned landscape maintenance, trimming, irrigation repair, and cleanup from a hardworking crew trusted by local homeowners for years.",
      aboutHeading: "The Crew Homeowners Keep Calling Back",
      aboutBody: [
        "Paradise Green Landscaping helps Phoenix homeowners keep their properties clean, healthy, and ready to enjoy. From the lawn and decorative rock to trees, shrubs, weeds, and watering systems, we take care of the details across the whole yard.",
        "Many of our customers have counted on the same crew for years — some across multiple homes. They value reliable scheduling, fair pricing, clear communication, and the confidence of knowing the job will be done thoroughly each visit.",
        "Whether your yard needs ongoing maintenance, irrigation attention, an overgrowth reset, or cleanup after a monsoon, Gregoria and the crew bring practical experience and genuine care to the work.",
      ],
      ctaHeadline: "Give Your Yard the Care It Deserves",
      ctaSubhead: "Call Paradise Green Landscaping to discuss recurring maintenance, trimming, irrigation repair, or a thorough cleanup.",
      metaTitle: "Phoenix Yard Maintenance | Paradise Green Landscaping",
      metaDescription: "Paradise Green Landscaping provides reliable yard maintenance, trimming, irrigation repair, weed control, and cleanup in Phoenix, Arizona.",
    },
  },
  // az0018 Descendants Landscaping — replace the shared /demo placeholder pool with a cohesive, original
  // Phoenix design/build set. The hero is a completed dusk backyard; every service is explicitly bound to
  // its matching project image so cards and service-detail pages stay semantically accurate.
  "descendants-landscaping": {
    photos: [
      "/biz-photos/descendants-landscaping/hero.webp",
      "/biz-photos/descendants-landscaping/landscape-design.webp",
      "/biz-photos/descendants-landscaping/xeriscaping.webp",
      "/biz-photos/descendants-landscaping/artificial-turf.webp",
      "/biz-photos/descendants-landscaping/maintenance.webp",
      "/biz-photos/descendants-landscaping/hardscaping.webp",
      "/biz-photos/descendants-landscaping/irrigation.webp",
    ],
    services: [
      { name: "Landscape Design & Installation", slug: "landscape-design", image: "/biz-photos/descendants-landscaping/landscape-design.webp", blurb: "We transform your ideas into comprehensive landscape plans, then meticulously install every element for a cohesive outdoor space." },
      { name: "Xeriscaping & Desert Landscaping", slug: "xeriscaping", image: "/biz-photos/descendants-landscaping/xeriscaping.webp", blurb: "Embrace the desert's beauty with our water-efficient xeriscaping and sustainable desert landscaping solutions tailored for the Phoenix climate." },
      { name: "Artificial Turf Installation", slug: "artificial-turf", image: "/biz-photos/descendants-landscaping/artificial-turf.webp", blurb: "Enjoy a perpetually green, low-maintenance lawn all year round with our professional artificial turf installation services." },
      { name: "Lawn & Yard Maintenance", slug: "maintenance", image: "/biz-photos/descendants-landscaping/maintenance.webp", blurb: "Keep your yard looking pristine with our reliable lawn and yard maintenance programs, designed to fit your property's needs." },
      { name: "Paver Patios & Hardscaping", slug: "hardscaping", image: "/biz-photos/descendants-landscaping/hardscaping.webp", blurb: "Enhance your outdoor living with custom paver patios, walkways, and other hardscaping features that add both beauty and functionality." },
      { name: "Irrigation & Drip Systems", slug: "irrigation", image: "/biz-photos/descendants-landscaping/irrigation.webp", blurb: "Ensure your landscape thrives with expertly designed and installed irrigation and drip systems for optimal water delivery." },
    ],
    generatedCopy: {
      aboutBody: [
        "From a blank canvas of dirt to a finished backyard oasis, Descendants Landscaping helps Phoenix homeowners turn their ideas into outdoor spaces built for everyday life.",
        "Our process is collaborative from the start. We listen to your goals, offer practical ideas that fit your property and budget, and bring the plan together with thoughtful planting, durable hardscaping, turf, and efficient irrigation.",
        "Lidio and the Descendants Landscaping team focus on the details that make a yard feel complete — creating welcoming patios, low-maintenance desert landscapes, and green spaces made to be enjoyed year-round.",
      ],
    },
  },
  // hv0001 Parker & Sons (parkerandsons.com — Phoenix, AZ; serving the Valley since 1974). The generated
  // profile reduced this full home-services company to six HVAC cards and reused one Google image everywhere.
  // Their current official navigation has eight residential pillars: Cooling, Heating, Plumbing, Drain & Sewer,
  // Electrical, Water Quality, Insulation, and Garage Renovation. This override restores that lineup and assigns
  // an original, consistent Arizona service image to every pillar, with a dedicated wide crew/fleet hero.
  "parker-and-sons": {
    fontKey: "bold",
    brandColor: "#d71920",
    brandColor2: "#111827",
    ctaBg: "#d71920",
    ctaFg: "#ffffff",
    showAllServices: true,
    yearsInBusiness: 52,
    photos: [
      "/biz-photos/parker-and-sons/hero.webp",
      "/biz-photos/parker-and-sons/ac-repair.webp",
      "/biz-photos/parker-and-sons/plumbing.webp",
      "/biz-photos/parker-and-sons/electrical.webp",
      "/biz-photos/parker-and-sons/drain-sewer.webp",
      "/biz-photos/parker-and-sons/water-quality.webp",
      "/biz-photos/parker-and-sons/insulation.webp",
      "/biz-photos/parker-and-sons/garage-renovation.webp",
    ],
    services: [
      { name: "Cooling", slug: "cooling", image: "/biz-photos/parker-and-sons/ac-repair.webp", blurb: "From fast AC repair and 40-point tune-ups to complete system installation, our Trust Certified technicians keep Valley homes reliably cool through the toughest Arizona heat." },
      { name: "Heating", slug: "heating", image: "/biz-photos/parker-and-sons/hero.webp", blurb: "Heating repair, seasonal tune-ups, and energy-efficient replacement for dependable warmth on cold desert nights — with help available 24 hours a day, 365 days a year." },
      { name: "Plumbing", slug: "plumbing", image: "/biz-photos/parker-and-sons/plumbing.webp", blurb: "Leaky fixtures, water heaters, repiping, and everyday plumbing repairs handled by licensed professionals with clear recommendations and careful, clean workmanship." },
      { name: "Drain & Sewer", slug: "drain-sewer", image: "/biz-photos/parker-and-sons/drain-sewer.webp", blurb: "Clear stubborn clogs and find hidden line problems with drain cleaning, hydro jetting, video inspections, line locating, and complete sewer or septic service." },
      { name: "Electrical", slug: "electrical", image: "/biz-photos/parker-and-sons/electrical.webp", blurb: "Protect and power your home with electrical repairs, panel upgrades, EV chargers, generators, lighting, safety inspections, and whole-home surge protection." },
      { name: "Water Quality", slug: "water-quality", image: "/biz-photos/parker-and-sons/water-quality.webp", blurb: "Get cleaner, better-tasting water with professional testing, whole-home water softeners, and reverse-osmosis drinking-water systems designed for Arizona's hard water." },
      { name: "Insulation", slug: "insulation", image: "/biz-photos/parker-and-sons/insulation.webp", blurb: "Improve comfort and reduce wasted energy with attic insulation, old-insulation removal, and air sealing that helps keep conditioned air inside your home." },
      { name: "Garage Renovation", slug: "garage-renovation", image: "/biz-photos/parker-and-sons/garage-renovation.webp", blurb: "Turn an unfinished garage into a cleaner, brighter, more useful extension of your home with durable flooring, organized storage, lighting, and comfort upgrades." },
    ],
    generatedCopy: {
      heroH1: "Phoenix's One-Stop Team for Total Home Comfort",
      heroSubhead: "Cooling, heating, plumbing, drains, electrical, water quality, insulation, and garage upgrades — delivered 24/7 by the home-service team Arizona has trusted since 1974.",
      aboutHeading: "Home Service Made Simple Since 1974",
      aboutBody: [
        "For more than 50 years, Parker & Sons has helped Phoenix-area homeowners take care of the systems that make a house comfortable, safe, and dependable. One experienced team handles everything from an urgent AC breakdown or plumbing leak to electrical upgrades, cleaner water, and better insulation.",
        "Every visit is built around fast response, straightforward communication, and work done with respect for your home. Our licensed, bonded, and insured technicians are available around the clock, including nights, weekends, and holidays.",
        "With tens of thousands of local reviews and service across the Valley, Parker & Sons brings the depth of a full-service company and the accountability homeowners expect from a trusted neighbor.",
      ],
      ctaHeadline: "One Call Takes Care of Your Home",
      ctaSubhead: "Tell us what is happening and schedule fast, reliable service anywhere in the Phoenix Valley.",
      metaTitle: "Parker & Sons | Phoenix HVAC, Plumbing & Electrical",
      metaDescription: "Parker & Sons provides 24/7 HVAC, plumbing, drain, electrical, water quality, insulation, and garage services across the Phoenix Valley.",
    },
  },
  // pl0003 AZ Mobile Pool Service (azmobilepoolservice.com — Anthony's mobile pool service in Phoenix, AZ since 2017;
  //   (602) 595-4586; 5★/82 reviews). Logo shipped as "logo.webp": a cartoon beach-ball mascot beside a blue "AZ MOBILE /
  //   POOL SERVICE" wordmark on a transparent bg — process-assets kept the cut-out as-is (alpha already transparent). It's a
  //   colorful, dark-blue mark that reads fine on Theme 1's default white nav pill, so nav stays default (no chromeDark). One
  //   brand swatch arrived as "Screenshot…png" → renamed Color.png (their pool blue, primary), so process-assets extracted
  //   brandColor #137ebd — auto-wired, no manual color needed. No Second Color / Font Example screenshot → secondary + font
  //   left default. 8 real photos (water-test strip, backyard pools, equipment) auto-wired to the gallery wholesale.
  //   SERVICES were the designer's explicit priority — the new site must list the SAME services as azmobilepoolservice.com.
  //   The generated record carried a generic AI lineup that invented "Pool Remodeling" (not on their site) and split
  //   Repair/Equipment in two, while MISSING their Tile Cleaning & Renovation. extract-services couldn't run (dead Gemini
  //   key), so the lineup is pinned HERE to mirror their real nav EXACTLY — Weekly Service & Maintenance, Repairs &
  //   Installations, Tile Cleaning & Renovation, Green to Clean & Acidwash, Pool Inspections. blurbs grounded in their own
  //   site copy (mobile service, brushing/skim weekly care, variable-speed pumps & salt cells, Pebble Tec & calcium, acid
  //   wash/chlorine bath, buying-or-selling inspections).
  "az-mobile-pool-service": {
    // Designer pinned imgi_24 (the wide blue pool-edge banner → p6.webp) as the HERO; BizHero uses photos[0], so p6
    // leads, then the rest of the real shots follow in the gallery. Arrays replace the asset list wholesale.
    photos: [
      "/biz-photos/az-mobile-pool-service/p6.webp",
      "/biz-photos/az-mobile-pool-service/p2.webp",
      "/biz-photos/az-mobile-pool-service/p4.webp",
      "/biz-photos/az-mobile-pool-service/p7.webp",
      "/biz-photos/az-mobile-pool-service/p8.webp",
      "/biz-photos/az-mobile-pool-service/p3.webp",
      "/biz-photos/az-mobile-pool-service/p5.webp",
      "/biz-photos/az-mobile-pool-service/p1.webp",
    ],
    services: [
      {
        name: "Weekly Service & Maintenance",
        slug: "weekly-service",
        blurb:
          "Reliable weekly pool & spa cleaning that keeps your water crystal-clear — brushing the surface, skimming debris, emptying baskets, and balancing chemicals so your Phoenix pool stays swim-ready year-round.",
      },
      {
        name: "Repairs & Installations",
        slug: "repairs-installations",
        blurb:
          "From new variable-speed pumps and salt cells to replumbing leaky pipes, in-floor cleaning systems, automation, and filter cleans — Anthony fixes and installs it all. You name it, we can fix it.",
      },
      {
        name: "Tile Cleaning & Renovation",
        slug: "tile-cleaning-renovation",
        blurb:
          "Restore the sparkle to your pool with professional tile cleaning, calcium removal, Pebble Tec repair, and acrylic decking additions and refinishing that bring tired surfaces back to life.",
      },
      {
        name: "Green to Clean & Acidwash",
        slug: "green-to-clean",
        blurb:
          "Turned green? Our green-to-clean and acid wash & chlorine bath service rescues neglected, algae-filled pools and returns them to sparkling, swimmable condition fast.",
      },
      {
        name: "Pool Inspections",
        slug: "pool-inspections",
        blurb:
          "Buying or selling a home? Ask about a thorough pool inspection — we check the equipment and surfaces and tell you exactly what you're getting before you sign.",
      },
    ],
  },
  // pl0001 Bestway Pool Service & Repair Co. (bestwaypoolservice.com — family-owned pool service in Phoenix, AZ since 1991;
  //   (602) 207-8536). Logo shipped as "…-logo-370w.webp": a blue gradient "BESTWAY" wordmark with a WHITE outline over a
  //   WHITE "Pool Service and Repair Co." tagline, on a transparent bg — process-assets kept the cut-out as-is (alpha already
  //   transparent, so no white-knockout that would have erased the white tagline). The white parts disappear on Theme 1's
  //   default white nav pill, so per the designer the nav is painted BLACK (navBg "#000000") — white-on-black makes the white
  //   tagline + outline read, and the blue wordmark stays on-brand against it. Two brand swatches arrived as "Screenshot…png"
  //   → copied to Color.png (light blue, primary) + Second Color.png (navy, secondary), so process-assets extracted brandColor
  //   #04abf2 + brandColor2 #001d3d into asset-overrides.json. extract-services couldn't run (Gemini key invalid), so the 6
  //   services are pinned HERE to mirror their live site's service nav EXACTLY — Pool Services, Pool Equipment Installs &
  //   Repairs, Pool Maintenance, Acid Wash Tile Cleaning, Interior & Cool Decks, Tile Installs — replacing the generated
  //   guesses. 15 real photos (hero-home shot p1 → theme hero, then gallery/content shots) auto-wired. No Font Example → font
  //   left default.
  "bestway-pool-service-and-repair-co": {
    navBg: "#000000",
    services: [
      {
        name: "Pool Services",
        slug: "pool-service",
        blurb:
          "Full-service pool care from a family-owned team that's kept Phoenix pools pristine since 1991 — quick scheduling, free estimates, and same-day service when you need it.",
      },
      {
        name: "Pool Equipment Installs & Repairs",
        slug: "equipment",
        blurb:
          "Installation and repair of all types of pool equipment — pumps, filters, heaters, and automation — so your system runs reliably year-round.",
      },
      {
        name: "Pool Maintenance",
        slug: "maintenance",
        blurb:
          "Comprehensive maintenance to keep your pool in top condition, from routine cleanings to chemical balancing that protects your water and equipment.",
      },
      {
        name: "Acid Wash Tile Cleaning",
        slug: "acid-wash-tile-cleaning",
        blurb:
          "An intensive acid wash that removes stubborn stains and mineral buildup, restoring the sparkle to your pool tiles and leaving them looking as good as new.",
      },
      {
        name: "Interior & Cool Decks",
        slug: "cool-decks",
        blurb:
          "Interior and cool deck resurfacing and repairs that improve both the look and feel of your pool area while keeping the surface cool and safe underfoot.",
      },
      {
        name: "Tile Installs",
        slug: "tile-installs",
        blurb:
          "Professional pool tile installation with a wide selection of stylish, durable tiles that transform your pool's appearance with a fresh new look.",
      },
    ],
  },
  // hv0100 Qual-Tech Air Conditioning and Heating (qualtechachtg.com — family-owned HVAC in Surprise, AZ). Logo shipped as
  //   "Qual-Tech-…-Logo-2.webp": the script "Qual-Tech / air conditioning heating" wordmark on a SOLID TEAL plate (plus the
  //   gold/teal fish-hook "QT" emblem). It ships on its own teal plate, so process-assets' white-knockout left it untouched —
  //   the teal badge reads fine on Theme 1's white nav pill, so nav stays default/white (no chromeDark). Two brand swatches
  //   arrived as "Screenshot…png" → renamed Color.png / Second Color.png, so process-assets extracted brandColor #005d69 (their
  //   teal) + brandColor2 #fcbc1e (their gold) — both auto-wired, no manual color needed. No Font Example screenshot → fontKey
  //   left default. Their real homepage has no background/hero video → none set.
  //   PHOTOS: 13 source files, mostly blog/infographic graphics (electric-bill savings, average-repair-cost, AZ zoning map,
  //   new-AC savings, install/repair "redirect" cards). DESIGNER PINNED imgi_14_R-32-Systems (processed → p10.webp) as the HERO,
  //   so p10 leads (BizHero uses photos[0]); then the genuinely branded/real shots follow — tech opening the branded van (p7),
  //   the family-owned Surprise AZ photo (p11), air-duct-cleaning (p6), Daikin VRV equipment (p2), and the hero-bg scene (p8).
  //   The pure infographic cards (p1,p3,p4,p5,p9,p12,p13) are dropped. Arrays replace the asset list wholesale.
  //   SERVICES were the designer's explicit priority — the new site must list the SAME services as qualtechachtg.com. The
  //   generated record carried only a generic AC-only AI lineup and extract-services couldn't run (dead Gemini key), so the
  //   lineup is pinned HERE to mirror their real nav: AC Repair, AC Installation & Replacement, AC Maintenance Plans, Ductless
  //   Mini-Splits, Indoor Air Quality (air filtration), Daikin VRV Systems (their specialty), Water Heaters, and Commercial HVAC.
  //   showAllServices so all eight render. blurbs grounded in their own copy (Surprise AZ, family-owned, honest/fast/affordable,
  //   no aggressive upsells).
  "qual-tech-air-conditioning-and-heating": {
    showAllServices: true,
    photos: [
      "/biz-photos/qual-tech-air-conditioning-and-heating/p10.webp",
      "/biz-photos/qual-tech-air-conditioning-and-heating/p7.webp",
      "/biz-photos/qual-tech-air-conditioning-and-heating/p11.webp",
      "/biz-photos/qual-tech-air-conditioning-and-heating/p6.webp",
      "/biz-photos/qual-tech-air-conditioning-and-heating/p2.webp",
      "/biz-photos/qual-tech-air-conditioning-and-heating/p8.webp",
    ],
    generatedCopy: {
      heroH1: "Surprise's Family-Owned AC & Heating Pros — Honest, Fast, Affordable",
      heroSubhead:
        "Qual-Tech Air Conditioning and Heating keeps Surprise, AZ homes comfortable with honest, fast, and affordable repairs and installations — detailed inspections, no aggressive upsells, and financing on new systems. From AC repair to Daikin VRV and water heaters, we do it right the first time.",
    },
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "When your AC quits in the Surprise heat, our technicians find the real problem and get your home cooling again fast — honest diagnostics on any make or model, with no aggressive upsells." },
      { name: "AC Installation & Replacement", slug: "ac-installation", blurb: "When a system is past saving, we install a new, energy-efficient air conditioner sized right for your home — with financing available so you're not waiting out the Arizona summer." },
      { name: "AC Maintenance Plans", slug: "ac-maintenance", blurb: "Seasonal maintenance plans keep your system running efficiently and catch small issues before they become a breakdown in the middle of a Surprise heatwave." },
      { name: "Ductless Mini-Splits", slug: "ductless-mini-splits", blurb: "Add efficient, zoned comfort to additions, garages, and hard-to-cool rooms with a ductless mini-split system professionally sized and installed for Arizona homes." },
      { name: "Indoor Air Quality", slug: "indoor-air-quality", blurb: "Breathe easier with air filtration systems that cut the dust, allergens, and pollutants the desert kicks up — keeping the air in your home cleaner and healthier year-round." },
      { name: "Daikin VRV Systems", slug: "daikin-vrv", blurb: "As a Daikin VRV specialist in Surprise, we install and service variable-refrigerant systems that deliver precise, efficient, whole-building comfort for homes and commercial spaces." },
      { name: "Water Heaters", slug: "water-heater", blurb: "Water heater repair, service, and replacement for reliable hot water on demand — honest recommendations and clean, professional installs every time." },
      { name: "Commercial HVAC", slug: "commercial-hvac", blurb: "From repairs to full installs and ongoing service, our team keeps Surprise-area businesses comfortable with dependable, code-compliant commercial air conditioning and heating." },
    ],
  },
  // hv0099 King Charles Plumbing & Air Conditioning (kingcharles.com — Surprise/Phoenix-valley AZ, (623) 888-8000; 5★/656
  //   reviews). Full-color mascot logo (a crowned Cavalier King Charles spaniel holding a wrench beside a magenta "KING CHARLES"
  //   banner, "PLUMBING • HEATING • AIR") shipped as a transparent .webp → reads cleanly on Theme 1's white nav pill, so nav stays
  //   default/white (no chromeDark). Two brand swatches shipped as "Screenshot…png" → renamed Color.png / Second Color.png so
  //   process-assets extracted brandColor #971249 (their magenta banner) + brandColor2 #05b8b0 (their teal) — auto-wired, no
  //   manual color needed. Their real site is all clean sans (Roboto / Source Sans) and no Font Example was provided → fontKey
  //   left default. No hero video on kingcharles.com.
  //   PHOTOS: 12 source files. Dropped the pre-composed wide hero GRAPHIC (imgi_36_BG_HERO_DEFAULT → p1: magenta gradient + orange
  //   swoosh + baked-in text space — would fight Theme 1's own hero overlay/H1) and the four stock shots (getty/unsplash/pexels
  //   p7–p10) plus the two solid color-swatch screenshots. Gallery curated below to the all-real, all-branded work only, leading
  //   with the three-techs-+-branded-van-+-mascot-dog team shot (p2) as the hero, then AC condenser install (p3), under-sink
  //   plumbing (p5 — shows the plumbing half of their name), ceiling duct/vent work (p4), and the branded fleet (p6).
  //   SERVICES were the designer's explicit priority — the new site must list the SAME services as kingcharles.com. The generated
  //   AI lineup was HVAC-ONLY (AC Repair/Install, Heating, Maintenance, Indoor Air Quality, Heat Pumps) — it invented "Indoor Air
  //   Quality" (NOT on their site) and completely MISSED Plumbing, which is literally half their name and a full third of their nav.
  //   extract-services couldn't run (dead Gemini key), so the lineup is pinned HERE to mirror their actual three-pillar nav crawled
  //   from kingcharles.com: Air Conditioning (/air-conditioning-phoenix: repair, installation, ac-service, ductless-mini-split),
  //   Heating (/heating-phoenix: furnace-repair, furnace-installation, heat-pumps), and Plumbing (/plumber-phoenix: water-heater,
  //   drain-repair, slab-leaks, water-treatment/softeners, kitchen-bathroom). showAllServices so all twelve render; serviceMenu
  //   groups the nav dropdown into the same three pillars. Hero copy widened from the generated AC-only line to cover BOTH air +
  //   plumbing, matching their real Phoenix-valley "Plumbing • Heating • Air" identity.
  "king-charles-plumbing-and-air-conditioning": {
    showAllServices: true,
    photos: [
      "/biz-photos/king-charles-plumbing-and-air-conditioning/p2.webp",
      "/biz-photos/king-charles-plumbing-and-air-conditioning/p3.webp",
      "/biz-photos/king-charles-plumbing-and-air-conditioning/p5.webp",
      "/biz-photos/king-charles-plumbing-and-air-conditioning/p4.webp",
      "/biz-photos/king-charles-plumbing-and-air-conditioning/p6.webp",
    ],
    generatedCopy: {
      heroH1: "Plumbing, Heating & Air You Can Count On — King Charles Treats Your Home Like Royalty",
      heroSubhead: "From AC repair to water heaters and drains, King Charles Plumbing & Air Conditioning keeps Phoenix-valley homes comfortable. Our 656 five-star reviews reflect fast scheduling and honest, professional service across the Valley.",
    },
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "When your AC quits in the Arizona heat, our techs diagnose the real problem and get your home cooling again fast — same-day service on any make or model." },
      { name: "AC Installation", slug: "ac-installation", blurb: "When a system is past saving, we install a new, energy-efficient air conditioner sized right for your home so you're not waiting out the Valley summer." },
      { name: "AC Service & Maintenance", slug: "ac-service", blurb: "Seasonal tune-ups keep your system running efficiently and catch small issues before they turn into a breakdown during a Phoenix heatwave." },
      { name: "Ductless Mini-Splits", slug: "ductless-mini-split", blurb: "Energy-efficient ductless mini-splits deliver room-by-room comfort and precise temperature control for additions, garages, and hard-to-cool spaces." },
      { name: "Furnace Repair", slug: "furnace-repair", blurb: "Desert nights get cold too. We repair furnaces and heating systems of every make so your home stays warm and safe when temperatures drop." },
      { name: "Furnace Installation", slug: "furnace-installation", blurb: "From an aging furnace to a full heating upgrade, we install reliable, efficient systems with a clean, professional install you can count on." },
      { name: "Heat Pumps", slug: "heat-pumps", blurb: "Heat pumps deliver efficient year-round comfort — cooling in summer, heating in winter — with energy savings built for Arizona homes." },
      { name: "Water Heaters", slug: "water-heater", blurb: "Tank and tankless water heater repair and replacement for reliable hot water on demand — often with a new unit on the truck and installed same-day." },
      { name: "Drain & Sewer", slug: "drain-repair", blurb: "Slow or clogged drains? We clear and repair drain and sewer lines fast, getting your home's plumbing flowing the way it should." },
      { name: "Slab Leak Repair", slug: "slab-leaks", blurb: "We locate and repair slab leaks before they damage your foundation and floors — protecting your home and your water bill." },
      { name: "Water Treatment & Softeners", slug: "water-treatment", blurb: "Water softeners, reverse osmosis, and treatment systems that protect your plumbing and give you cleaner, softer water throughout the house." },
      { name: "Plumbing Repair", slug: "kitchen-bathroom", blurb: "Kitchen and bathroom fixtures, faucets, valves, and pressure regulators repaired and installed by licensed, professional plumbers." },
    ],
    serviceMenu: [
      { label: "Air Conditioning", children: [
        { label: "AC Repair", slug: "ac-repair" },
        { label: "AC Installation", slug: "ac-installation" },
        { label: "AC Service & Maintenance", slug: "ac-service" },
        { label: "Ductless Mini-Splits", slug: "ductless-mini-split" },
      ] },
      { label: "Heating", children: [
        { label: "Furnace Repair", slug: "furnace-repair" },
        { label: "Furnace Installation", slug: "furnace-installation" },
        { label: "Heat Pumps", slug: "heat-pumps" },
      ] },
      { label: "Plumbing", children: [
        { label: "Water Heaters", slug: "water-heater" },
        { label: "Drain & Sewer", slug: "drain-repair" },
        { label: "Slab Leak Repair", slug: "slab-leaks" },
        { label: "Water Treatment & Softeners", slug: "water-treatment" },
        { label: "Plumbing Repair", slug: "kitchen-bathroom" },
      ] },
    ],
  },
  // hv0096 Grand Canyon Home Services (grandcanyonhomeservices.com → grandcanyonac.com, Surprise AZ, (623) 444-6988; 4.9★/382
  //   reviews). Logo is a self-contained hexagonal badge (amber/orange plate, purple canyon, white "GRAND CANYON HOME SERVICES"
  //   wordmark) on transparent bg → reads cleanly on Theme 1's white nav pill, so nav stays default (no chromeDark).
  //   The brand swatch arrived as "Screenshot…png" so process-assets did NOT match it as a color file — it leaked in as p3 and
  //   the primary color was never extracted. So brandColor is pinned HERE (sampled #d76f00 amber) and photos is overridden to the
  //   TWO real work photos only (p1 technician+truck as hero, p2 vans on street), dropping the swatch.
  //   SERVICES pinned to mirror grandcanyonac.com's nav exactly — 5 pillars (AC, Heating, Indoor Air Quality, Plumbing,
  //   Electrical) and their sub-pages — since extract-services couldn't run (dead Gemini key).
  "grand-canyon-home-services": {
    showAllServices: true,
    brandColor: "#d76f00",
    // Designer pinned the vans-on-street shot (imgi_82 → p2) as the hero. BizHero uses photos[0], so p2 leads.
    photos: [
      "/biz-photos/grand-canyon-home-services/p2.webp",
      "/biz-photos/grand-canyon-home-services/p1.webp",
    ],
    services: [
      { name: "Air Conditioning", slug: "air-conditioning", blurb: "AC repair, installation, and tune-ups that keep your home cool through the Arizona summer." },
      { name: "Ductless Mini-Split", slug: "ductless-mini-split", blurb: "Energy-efficient ductless mini-split systems for room-by-room comfort and precise temperature control." },
      { name: "Emergency Heating & AC", slug: "emergency-heating-ac", blurb: "Fast emergency HVAC service when your heating or cooling fails — day or night." },
      { name: "Heating", slug: "heating", blurb: "Furnace and heat pump repair, installation, and maintenance to keep your home warm and safe." },
      { name: "Gas Log Fireplace", slug: "gas-log-fireplace", blurb: "Gas log fireplace service and installation for cozy, hassle-free warmth at the flip of a switch." },
      { name: "Indoor Air Quality", slug: "indoor-air-quality", blurb: "Air purifiers, filtration, and humidity control that keep the air in your home clean and healthy." },
      { name: "Air Duct Cleaning & Repair", slug: "air-duct-cleaning-repair", blurb: "Thorough air duct cleaning and repair to improve airflow, efficiency, and indoor air quality." },
      { name: "Duct Sealing", slug: "duct-sealing", blurb: "Professional duct sealing that stops air leaks, lowers energy bills, and evens out comfort room to room." },
      { name: "Plumbing", slug: "plumbing", blurb: "Full-service plumbing repair and installation handled by licensed, professional technicians." },
      { name: "Water Heater Repair", slug: "water-heater-repair", blurb: "Water heater repair and replacement — tank and tankless — for reliable hot water on demand." },
      { name: "Water Softeners", slug: "water-softeners", blurb: "Water softener and treatment systems that protect your plumbing and give you cleaner, softer water." },
      { name: "Electrical", slug: "electrical", blurb: "Trusted electrical repair, upgrades, and installation to keep your home safe and powered." },
    ],
    serviceMenu: [
      { label: "AC Services", children: [
        { label: "Air Conditioning", slug: "air-conditioning" },
        { label: "Ductless Mini-Split", slug: "ductless-mini-split" },
        { label: "Emergency Heating & AC", slug: "emergency-heating-ac" },
      ] },
      { label: "Heating Services", children: [
        { label: "Heating", slug: "heating" },
        { label: "Gas Log Fireplace", slug: "gas-log-fireplace" },
      ] },
      { label: "Indoor Air Quality", children: [
        { label: "Indoor Air Quality", slug: "indoor-air-quality" },
        { label: "Air Duct Cleaning & Repair", slug: "air-duct-cleaning-repair" },
        { label: "Duct Sealing", slug: "duct-sealing" },
      ] },
      { label: "Plumbing Services", children: [
        { label: "Plumbing", slug: "plumbing" },
        { label: "Water Heater Repair", slug: "water-heater-repair" },
        { label: "Water Softeners", slug: "water-softeners" },
      ] },
      { label: "Electrical Services", children: [
        { label: "Electrical", slug: "electrical" },
      ] },
    ],
  },
  // hv0095 AC Repair Near Me of Peoria (acrepairnearme.services — "AC Repair Near Me LLC | ROC #337558", 16165 N 83rd Ave,
  // Peoria AZ 85382, (623) 295-1377; 5★/12 reviews, open 6 AM–10 PM with emergency service). Logo shipped as a transparent-bg
  // .webp whose name contained "Logo" → process-assets matched /logo/ and (already alpha) kept it as-is: a dark-charcoal "AC
  // REPAIR" heavy-blocky wordmark with light-gray "NEAR ME" and a sky-blue radiator/fan emblem. The dark text reads cleanly on
  // Theme 1's white nav pill → nav stays default/white (no chromeDark). The brand swatch arrived as "Screenshot…png" → renamed
  // Color.png, so process-assets extracted brandColor #96e2fe (their sky blue, matching the emblem) — auto-wired, no manual color
  // needed. It's a PALE tint; Theme 1's contrast-correction (readableAccent/darken) keeps accents legible, but flag to the designer
  // if they'd rather a deeper blue. No secondary swatch → brandColor2 falls back to Theme 1's default. No Font Example screenshot;
  // the heavy blocky "AC REPAIR" wordmark → fontKey "bold" (Archivo) as the closest match. The real homepage has no hero video.
  //   PHOTOS: 8 source files. Only ONE is a genuine local job — a crane lowering a rooftop AC unit onto an Arizona tile-roof home
  //   under blue sky (imgi_2_AC-install-2 → p1); the rest are clean stock HVAC field shots. Curated below to LEAD with p1 (the real
  //   AZ install → Theme 1 hero), then the strongest action/equipment stock (p7 manifold gauges in hand, p5 rooftop condenser bank),
  //   then the remainder. Arrays replace the asset list wholesale.
  //   SERVICES were the designer's explicit priority — the new site must list the SAME services as acrepairnearme.services. The
  //   generated AI lineup carried two offerings their real /service/ menu does NOT have (Indoor Air Quality, Heat Pumps) and was
  //   missing two it DOES feature prominently (Thermostat install/repair, Duct & Vent cleaning — their own reviews mention duct
  //   cleaning). extract-services couldn't run (dead Gemini key), so the lineup is pinned HERE to mirror their actual /service/ pages
  //   (repair-ac, air-conditioning-installation, ac-/hvac-maintenance, heating repair/install/maintenance, thermostat repair/install,
  //   clean-ducts-vents). Curated to their six headline categories; blurbs grounded in their copy (Peoria, same-day, all makes, emergency).
  "ac-repair-near-me-of-peoria": {
    fontKey: "bold",
    photos: [
      "/biz-photos/ac-repair-near-me-of-peoria/p1.webp",
      "/biz-photos/ac-repair-near-me-of-peoria/p7.webp",
      "/biz-photos/ac-repair-near-me-of-peoria/p5.webp",
      "/biz-photos/ac-repair-near-me-of-peoria/p2.webp",
      "/biz-photos/ac-repair-near-me-of-peoria/p3.webp",
      "/biz-photos/ac-repair-near-me-of-peoria/p4.webp",
      "/biz-photos/ac-repair-near-me-of-peoria/p6.webp",
      "/biz-photos/ac-repair-near-me-of-peoria/p8.webp",
    ],
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "When your AC quits in the Peoria heat, our technicians diagnose the real problem and get your home cooling again fast — same-day and emergency service on any make or model." },
      { name: "AC Installation & Replacement", slug: "ac-installation", blurb: "When a system is past saving, we install a new, energy-efficient air conditioner sized right for your home — often the same day, so you're not waiting out the Arizona summer." },
      { name: "AC Tune-Ups & Maintenance", slug: "ac-maintenance", blurb: "Seasonal tune-ups keep your system running efficiently and catch small issues before they become a breakdown in the middle of a Peoria heatwave." },
      { name: "Heating & Furnace", slug: "heating", blurb: "Desert nights get cold too. We repair, install, and maintain furnaces and heating systems of every make so your home stays warm and reliable when temperatures drop." },
      { name: "Thermostat Repair & Installation", slug: "thermostat", blurb: "From a faulty old dial to a new smart thermostat, we repair and install controls that keep your home comfortable and your energy bills in check." },
      { name: "Duct & Vent Cleaning", slug: "duct-cleaning", blurb: "Clogged ducts and vents hurt airflow, raise your bills, and circulate dust through your home. We clean and clear the whole system so the air you breathe stays clean." },
    ],
  },
  // hv0092 HilCo Air Conditioning & Heating (hilcoac.com — "HilCo Mechanical", 11780 N 91st Ave, Peoria AZ, (623) 972-5195;
  // family-owned & operated since 1989, 30+ years serving the Valley, 15,000+ clients, licensed/bonded/insured, open 24/7).
  // Logo shipped as "Hilco+.svg" → renamed logo.svg so process-assets copied it as-is (already a transparent SVG): the "HILCO
  // MECHANICAL — AIR CONDITIONING • HEATING" wordmark with a blue gradient badge behind "HIL", black "CO", and a technician
  // mascot. The dark text + blue badge read cleanly on Theme 1's white nav pill, so nav stays default/white (no chromeDark).
  // The brand swatch arrived as "Screenshot…png" → renamed Color.png, so process-assets extracted brandColor #0288b1 (their
  // teal-blue, matches the badge); no secondary swatch, so brandColor2 falls back to Theme 1's default — no manual color needed.
  // The heavy blocky condensed "HILCO" wordmark → fontKey "bold" (Archivo) as the closest match; no Font Example screenshot.
  // 11 source files; the gallery is curated below — three stock/staged shots are dropped (p1 clay-banks unsplash interior,
  // p2 an empty staged living room, p5 a Phoenix/Salt River Valley landscape) and only the real branded work is kept (the white
  // HilCo service truck, a tech at the branded van, the team lined up at the HILCO building sign, the staff group photo, rooftop
  // commercial units, and a branded graphic). Their real homepage has no hero video → none set.
  //   SERVICES were the designer's explicit priority (the new site must list the SAME services as the original). The generated
  //   record carried only a generic AC-only AI lineup and extract-services couldn't run (dead Gemini key), so the lineup is
  //   pinned HERE to mirror hilcoac.com's actual residential + commercial nav (AC Repair / Installation / Maintenance, Heating,
  //   Ductless Mini-Splits, Indoor Air Quality, Duct & Dryer-Vent Cleaning, Maintenance Plans, and Commercial HVAC). blurbs are
  //   grounded in their own copy ("When Comfort Can't Wait, Call Your Peoria HVAC Pros", since 1989, 24/7, all major brands).
  //   showAllServices so all nine render. Hero copy is set to their real Peoria-AC-&-Heating identity.
  "hilco-air-conditioning-and-heating": {
    fontKey: "bold",
    showAllServices: true,
    // Theme 1 renders photos[0] full-viewport as the hero. Designer chose imgi_31_FullSizeRender (processed → p6.webp) — the HilCo
    // team lined up at the HILCO building sign — as the HERO, so p6 is pinned first; the rest of the real branded work follows
    // (service truck, tech at the branded van, staff group, commercial units, branded graphic). Arrays replace the asset list wholesale.
    photos: [
      "/biz-photos/hilco-air-conditioning-and-heating/p6.webp",
      "/biz-photos/hilco-air-conditioning-and-heating/p8.webp",
      "/biz-photos/hilco-air-conditioning-and-heating/p3.webp",
      "/biz-photos/hilco-air-conditioning-and-heating/p7.webp",
      "/biz-photos/hilco-air-conditioning-and-heating/p9.webp",
      "/biz-photos/hilco-air-conditioning-and-heating/p4.webp",
    ],
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "When comfort can't wait, our factory-trained techs arrive fast — 24/7 — to diagnose and fix any make or model of air conditioner, so your Peoria home stays cool through the Arizona heat." },
      { name: "AC Installation & Replacement", slug: "ac-installation", blurb: "When a system is past saving, we install energy-efficient air conditioning sized right for your home, with a straightforward recommendation and a clean, professional install backed by 30+ years in the Valley." },
      { name: "AC Maintenance & Tune-Ups", slug: "ac-maintenance", blurb: "Manufacturer-recommended precision tune-ups keep your system running efficiently and catch small problems before they become costly breakdowns in the middle of summer." },
      { name: "Heating Repair & Installation", slug: "heating", blurb: "Desert nights get cold too. We repair, maintain, and install furnaces and heating systems of every make so your home stays warm and reliable when temperatures drop." },
      { name: "Ductless Mini-Splits", slug: "ductless-mini-splits", blurb: "Add efficient, zoned comfort to additions, garages, and hard-to-cool rooms with a ductless mini-split system professionally sized and installed for Arizona homes." },
      { name: "Indoor Air Quality", slug: "indoor-air-quality", blurb: "Breathe easier with air purifiers, UV systems, and indoor air quality solutions that cut the dust, allergens, and pollutants the desert kicks up throughout your home." },
      { name: "Duct & Dryer Vent Cleaning", slug: "duct-cleaning", blurb: "Clean air ducts and dryer vents improve airflow, lower energy bills, and reduce fire risk — keeping your whole system running cleaner and safer year-round." },
      { name: "Maintenance Plans", slug: "maintenance-plans", blurb: "Join a yearly maintenance plan and get priority service plus regularly scheduled tune-ups that extend the life of your equipment and protect your comfort all year." },
      { name: "Commercial HVAC", slug: "commercial-hvac", blurb: "From repairs to full installs and ongoing maintenance, our commercial HVAC team keeps Valley businesses comfortable with dependable, code-compliant rooftop and split systems." },
    ],
    generatedCopy: {
      heroH1: "Peoria's Trusted AC & Heating Experts Since 1989",
      heroSubhead:
        "HilCo Air Conditioning & Heating is a family-owned and operated team that's kept the Valley comfortable for over 30 years and 15,000+ clients. Factory-trained, licensed, bonded, and insured — and available 24/7 across Peoria, Glendale, Surprise, and the West Valley. When comfort can't wait, call your Peoria HVAC pros.",
    },
  },
  // hv0093 Worlock Air Conditioning & Heating (worlockair.com — 8386 W Park View Ct, Peoria AZ 85383, (623) 294-5409; 4.8★/290
  // reviews, open 24 hours; family-owned & family-run — owner "Bill" works with his wife and son; reviewers praise his detailed,
  // photo-documented quotes and robust installs that aren't always the lowest bid but outlast the competition). Logo shipped as
  // "Worlock-Logo-6-22-25.svg" → process-assets matched /logo/ and copied it as-is (already a transparent SVG): the navy
  // "WORLOCK" wordmark over a red "AIR CONDITIONING & HEATING" banner, with the navy/red circular emblem. The navy text + red
  // banner read cleanly on Theme 1's white nav pill, so nav stays default/white (no chromeDark). Two brand swatches arrived as
  // "Screenshot…png" → renamed Color.png / Second Color.png, so process-assets extracted brandColor #062c52 (their navy, the exact
  // emblem/wordmark hex) and brandColor2 #db2824 (their red banner) — both auto-wired, no manual color needed. No Font Example
  // screenshot was provided, so fontKey stays default. The real homepage has no background/hero video → none set.
  //   PHOTOS: 10 source files, but only ONE is genuine Worlock work — a tech on a tile roof beside ductwork on a palm-lined Peoria
  //   street (imgi_4_Professional-Rooftop → p3); the rest are clean stock HVAC field shots. Curated below to LEAD with p3 (the real
  //   local rooftop shot → Theme 1 hero), then the strongest stock service photos. Two source files were dropped before processing:
  //   an exact duplicate (imgi_49 == imgi_6) and a retail "shopping for an AC" stock scene (imgi_97), both moved to _inbox/.../­_skip/.
  //   SERVICES were the explicit priority — the new site must list the SAME services as worlockair.com. The generated AI lineup
  //   already mirrored their real nav, so it's PINNED here (locked against pipeline re-gen) as their six real offerings — AC Repair,
  //   Heating & Furnace, AC Maintenance, AC Installation & Replacement, Indoor Air Quality, and Heat Pumps — all present on their
  //   site's AC / Heating / Indoor-Air-Quality menus. blurbs are grounded in their own identity (owner Bill, photo-documented,
  //   robust right-sized installs, 24/7 Peoria service). Hero copy from the generated record is already Peoria-grounded → kept as-is.
  "worlock-air-conditioning-and-heating": {
    // Theme 1 renders photos[0] full-viewport as the hero. Lead with p3 — the only genuine Worlock photo (their tech on a Peoria
    // rooftop) — then the cleanest stock HVAC service shots. Arrays replace the asset list wholesale.
    photos: [
      "/biz-photos/worlock-air-conditioning-and-heating/p3.webp",
      "/biz-photos/worlock-air-conditioning-and-heating/p6.webp",
      "/biz-photos/worlock-air-conditioning-and-heating/p7.webp",
      "/biz-photos/worlock-air-conditioning-and-heating/p2.webp",
      "/biz-photos/worlock-air-conditioning-and-heating/p4.webp",
      "/biz-photos/worlock-air-conditioning-and-heating/p5.webp",
      "/biz-photos/worlock-air-conditioning-and-heating/p1.webp",
      "/biz-photos/worlock-air-conditioning-and-heating/p8.webp",
    ],
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "When your AC quits in the Peoria heat, our technicians diagnose the real problem — documented with photos, not guesswork — and get your home cooling again fast, day or night." },
      { name: "Heating & Furnace", slug: "heating", blurb: "Desert nights get cold, too. We repair, maintain, and replace furnaces and heating systems of every make so your home stays warm and reliable when temperatures drop." },
      { name: "AC Tune-Ups & Maintenance", slug: "maintenance", blurb: "Protect your system's lifespan and efficiency with a thorough seasonal tune-up that catches small issues before they become a breakdown in the middle of an Arizona summer." },
      { name: "AC Installation & Replacement", slug: "ac-installation", blurb: "Owner Bill walks you through the options in detail, then installs a properly sized, robust system built to outlast the cheapest bid — a clean, professional install you'll rely on for years." },
      { name: "Indoor Air Quality", slug: "air-quality", blurb: "Breathe easier with air filtration, purification, and humidity solutions that cut the dust and allergens the desert kicks up — for healthier, cleaner air throughout your home." },
      { name: "Heat Pumps", slug: "heat-pumps", blurb: "Get efficient year-round heating and cooling from a single system. We size, install, and service heat pumps for dependable comfort in every season across the West Valley." },
    ],
  },
  // hv0090 Reddi Services (reddiservices.com — "Reddi Services Plumbing & Air Conditioning", Peoria AZ at 12268 92nd Dr,
  // (602) 789-3910; 4.9★/1592 reviews, open 24 hours every day; "Home of the No-Fee Emergency"). This is NOT an AC-only shop —
  // their site is a full-service Plumbing + HVAC + Drain/Septic company (truck reads "Plumbing • Pipe Cleaning • HVAC • Liquid
  // Waste Removal"), split into HVAC and Plumbing divisions under a /phoenix/ market hub. Logo shipped as logo.svg — the red
  // "REDDI / SERVICES" badge on a silver/chrome diamond; it's already a transparent SVG so process-assets copied it as-is, and the
  // red + dark-chrome art reads cleanly on Theme 1's white nav pill, so nav stays default/white (no chromeDark). The brand swatch
  // arrived as "Screenshot…png" → renamed Color.png so process-assets extracted brandColor #d3053e (their Reddi red); no secondary
  // swatch, so brandColor2 is left to Theme 1's default. No manual color needed. The heavy bold blocky "REDDI" wordmark → fontKey
  // "bold" (Archivo) as the closest match; no Font Example screenshot. 10 files processed; the gallery is curated below — the
  // transparent vans-heritage marketing graphic (p1, looks broken on a colored bg) and two dark site-section backgrounds with the
  // red wave border baked in (p3 water softener, p4 catch basin) are dropped; the kept shots are real branded work (Reddi techs in
  // red shirts on a condenser & under a sink, the branded "DOMINATOR" septic vacuum truck, plus tankless/faucet/AC service shots).
  // Their real homepage has no hero video → none set.
  //   SERVICES were the priority (designer's explicit ask: the new site must list the SAME services as the original). The generated
  //   record carried only a generic 6-item AC-only AI lineup, which badly undersold a full Plumbing + HVAC company, and
  //   extract-services couldn't run (dead Gemini key), so the lineup is pinned HERE to mirror reddiservices.com/phoenix/'s actual
  //   two-division nav — HVAC (AC Repair, AC Installation, Heating & Furnaces, Heat Pumps, Indoor Air Quality) and Plumbing (Drain
  //   Cleaning & Sewer, Septic & Liquid Waste, Water Heaters). Curated to the eight headline services spanning both divisions; blurbs
  //   are grounded in their own copy ("No-Fee Emergency", 24/7, honest same-day service). showAllServices so all eight render. The
  //   hero copy is also broadened from AC-only to the full Plumbing + HVAC + Drain identity to stay coherent with the new lineup.
  "reddi-services": {
    fontKey: "bold",
    showAllServices: true,
    // Theme 1 renders photos[0] full-viewport as the hero. Designer chose imgi_21_septic-desktop (processed → p2.webp), the branded
    // "DOMINATOR" Reddi septic/liquid-waste vacuum truck, as the HERO, so p2 is pinned first; the real branded work shots follow
    // (condenser tech, plumber under-sink, AC service, water heater, faucet, condenser). Arrays replace the asset-overrides list wholesale.
    photos: [
      "/biz-photos/reddi-services/p2.webp",
      "/biz-photos/reddi-services/p9.webp",
      "/biz-photos/reddi-services/p10.webp",
      "/biz-photos/reddi-services/p5.webp",
      "/biz-photos/reddi-services/p7.webp",
      "/biz-photos/reddi-services/p8.webp",
      "/biz-photos/reddi-services/p6.webp",
    ],
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "When the Peoria heat takes out your air conditioner, Reddi techs arrive fast — 24/7, with no after-hours fee — to diagnose the real problem and get cool air flowing again on any make or model. As the Home of the No-Fee Emergency, you get an honest fix without the emergency markup." },
      { name: "AC Installation & Replacement", slug: "ac-installation", blurb: "When a system is past saving, we install energy-efficient air conditioning sized right for your Arizona home. You'll get a straightforward recommendation and a clean, professional installation backed by the 4.9-star service over 1,500 of your neighbors trust." },
      { name: "Heating & Furnaces", slug: "heating", blurb: "Desert nights get cold too. We repair, maintain, install, and replace furnaces and heating systems of every make — restoring reliable warmth fast, day or night, so your home stays comfortable the moment temperatures drop." },
      { name: "Heat Pumps", slug: "heat-pumps", blurb: "Get efficient heating and cooling from a single system. We install and service high-efficiency heat pumps built for Arizona homes, delivering dependable year-round comfort without inflated rates or hidden fees." },
      { name: "Indoor Air Quality", slug: "indoor-air-quality", blurb: "Breathe easier at home. From air purifiers, scrubbers, and UV systems to air duct cleaning, we cut the dust, allergens, and pollutants the desert kicks up so the air throughout your home stays clean and healthy." },
      { name: "Drain Cleaning & Sewer", slug: "drain-cleaning", blurb: "Slow drains and backed-up sewers don't wait for business hours, and neither do we. Reddi's roots run deep in drain and sewer work — we clear clogs, clean and repair lines, and get to the root of the problem so it stays fixed." },
      { name: "Septic & Liquid Waste", slug: "septic", blurb: "From septic tank pumping and repair to catch basins, grease traps, and hydro-excavation, our heavy-duty crews handle residential, commercial, and municipal liquid-waste work that most plumbers can't touch." },
      { name: "Water Heaters", slug: "water-heaters", blurb: "No hot water? We repair, install, and replace traditional tank, tankless, and water-softening systems — same-day when we can — so your home has reliable hot water from the same trusted team that keeps you comfortable year-round." },
    ],
    generatedCopy: {
      heroH1: "Peoria's 24/7 Plumbing, AC & Drain Experts",
      heroSubhead: "Reddi Services is your locally trusted, full-service team for plumbing, air conditioning, heating, and drain & septic work across Peoria, Glendale, Surprise, Phoenix, and Sun City — the Home of the No-Fee Emergency, with 4.9 stars from over 1,500 reviews.",
    },
  },
  // hv0089 Morehart Air Conditioning and Heating (morehartac.com — Peoria AZ, (623) 471-4499; locally owned & operated, 24/7
  // service across Peoria, Glendale, Surprise & the West Valley). Logo shipped as m-logo@2x-418x0.webp — a "MOREHART / AIR
  // CONDITIONING & HEATING" wordmark in heavy bold-italic blue with a green "HART", led by a blue heart mark, already a transparent
  // cut-out → process-assets detected the existing alpha and kept it as-is (no white knockout, which would have erased nothing here);
  // the blue/green art reads cleanly on Theme 1's white nav pill, so nav stays default/white (no chromeDark). Both brand swatches
  // arrived as "Screenshot…png" → renamed Color.png (blue, primary) and Second Color.png (green, secondary) so process-assets
  // extracted brandColor #234c95 (their fleet blue) and brandColor2 #91d302 (their accent green); no manual color needed. The heavy
  // bold-italic blocky sans wordmark → fontKey "bold" (Archivo) as the closest match; no Font Example screenshot. 8 provided photos
  // auto-populate the gallery in their scraped order — imgi_8_homepage-hero (their branded blue-van fleet banner) sorts first by
  // filename, so Theme 1 uses it as photos[0]/hero with no manual pin needed; the rest are real on-site work shots (manifold gauges
  // on a Morehart unit, two-tech diagnostics, the crew, rooftop/condenser service). Three styled site banners (value-prop overlay,
  // dark in-content toolbox bg, the small mobile-hero dup) were moved into _skip/ so only real work shows. Their real homepage has
  // no hero video → none set.
  //   SERVICES were the priority (designer's explicit ask: the new site must list the SAME services as the original). The generated
  //   record carried only a generic 6-item AI lineup and extract-services couldn't run (dead Gemini key), so the lineup is pinned
  //   HERE to mirror morehartac.com/services/ — their menu groups offerings under Air Conditioning (Repair, Installation, Maintenance,
  //   Ductless Mini-Splits, Evaporative Coolers), Heating & Furnaces, Heat Pumps, Indoor Air Quality, and Water Heaters. Curated to
  //   the eight headline services their site leads with; blurbs are grounded in their own copy. showAllServices so all eight render.
  "morehart-air-conditioning-and-heating": {
    fontKey: "bold",
    showAllServices: true,
    // Theme 1 renders photos[0] full-viewport as the hero. The scraped homepage-hero (p1) is a wide 2.75:1 fleet banner that
    // crops to a zoomed blue blur in a tall hero, so the crisp portrait two-tech diagnostic shot (p3) is pinned first; the van
    // banner and the rest follow in the gallery. Arrays replace the asset-overrides list wholesale.
    photos: [
      "/biz-photos/morehart-air-conditioning-and-heating/p3.webp",
      "/biz-photos/morehart-air-conditioning-and-heating/p1.webp",
      "/biz-photos/morehart-air-conditioning-and-heating/p4.webp",
      "/biz-photos/morehart-air-conditioning-and-heating/p5.webp",
      "/biz-photos/morehart-air-conditioning-and-heating/p6.webp",
      "/biz-photos/morehart-air-conditioning-and-heating/p7.webp",
      "/biz-photos/morehart-air-conditioning-and-heating/p8.webp",
      "/biz-photos/morehart-air-conditioning-and-heating/p2.webp",
    ],
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "When the Peoria heat takes out your air conditioner, our technicians arrive fast — 24/7 — to diagnose the real problem and get cool air flowing again on any make or model. Honest answers, dependable repairs, and pricing you can trust." },
      { name: "AC Installation & Replacement", slug: "ac-installation", blurb: "When a system is past its prime, we install energy-efficient air conditioning sized right for your Arizona home. You'll get an honest recommendation and a clean, professional installation done right the first time." },
      { name: "AC Maintenance & Tune-Ups", slug: "maintenance", blurb: "Beat the summer breakdown with a seasonal tune-up. Regular maintenance keeps your system running efficiently, catches small problems before they turn costly, and extends the life of your equipment before peak heat hits." },
      { name: "Heating & Furnaces", slug: "heating", blurb: "Desert nights get cold too. We repair, maintain, install, and replace furnaces and heating systems of every make — restoring reliable warmth fast so your home stays comfortable when temperatures drop." },
      { name: "Heat Pumps", slug: "heat-pumps", blurb: "Get efficient heating and cooling from a single system. We install and repair high-efficiency heat pumps built for Arizona homes, delivering dependable year-round comfort without inflated rates or hidden fees." },
      { name: "Ductless Mini-Splits", slug: "ductless-mini-splits", blurb: "Cool and heat additions, garages, and hard-to-reach rooms without ductwork. Our ductless mini-split installations give you precise, energy-efficient comfort exactly where you need it, zone by zone." },
      { name: "Indoor Air Quality", slug: "air-quality", blurb: "Breathe easier at home. From air purifiers and UV lights to duct cleaning and air scrubbers, we cut the dust, allergens, and pollutants the desert kicks up so the air throughout your home stays clean and healthy." },
      { name: "Water Heaters", slug: "water-heaters", blurb: "From traditional tanks to tankless systems and water softeners, we install and repair water heaters so your home has reliable hot water — handled by the same trusted team that keeps you comfortable year-round." },
    ],
    generatedCopy: {
      heroH1: "Peoria's Trusted Air Conditioning & Heating Team",
      heroSubhead: "Morehart Air Conditioning & Heating is your locally owned, 24/7 team for honest AC and heating repair, installation, and maintenance across Peoria, Glendale, Surprise, and the West Valley — keeping Arizona homes comfortable with workmanship you can count on.",
    },
  },
  // hv0088 Grand Canyon Refrigeration, LLC (grandcanyonref.com — Peoria AZ, (602) 326-8936; owner Martin, 5.0★/107 reviews;
  // residential AC/heating known for honesty, transparent diagnosis & fair pricing — no scare tactics; serving Peoria, Glendale,
  // Surprise, Phoenix & Sun City). Logo shipped as logo.png — an illustrated orange/red Grand Canyon mesa skyline above a red
  // banner reading "GRAND CANYON REFRIGERATION, LLC" in bold white sans, all on a white plate → process-assets' near-white knockout
  // cleared the surrounding white to transparent, leaving the colorful canyon art + red banner intact; that art reads cleanly on
  // Theme 1's white nav pill, so nav stays default/white (no chromeDark). The brand swatch arrived as "Screenshot…png" → renamed
  // Color.png so process-assets extracted brandColor #d1201f (their banner red); no secondary swatch, so brandColor2 is left to
  // Theme 1's default. No manual color needed. The bold white sans wordmark on the banner → fontKey "bold" (Archivo) as the closest
  // match; no Font Example screenshot. 6 provided photos (AC maintenance, York AC, York AC install, York furnace install, York
  // thermostats, home exterior) auto-populate the gallery; default order stands. Their real homepage has no hero video → none set.
  //   SERVICES were the priority (designer's explicit ask: the new site must list the SAME services as the original). The generated
  //   record carried only a generic AI lineup, and extract-services couldn't run (dead Gemini key), so the lineup is pinned HERE to
  //   mirror grandcanyonref.com's actual services menu exactly — Air Conditioning, Heating, Heating & Cooling Repair, HVAC
  //   Maintenance, Heating & Air Conditioning Installation, Heat Pump, Indoor Air Quality, Packaged Equipment, and Thermostats
  //   (their Financing, Warranties, and Energy Ratings menu items are support/info pages, not trade services, so excluded). Blurbs
  //   are grounded in the site's own copy. showAllServices so all nine render.
  "grand-canyon-refrigeration": {
    fontKey: "bold",
    showAllServices: true,
    // Designer chose imgi_18_home-img (processed → p6.webp) as the HERO; Theme 1 uses photos[0] for the hero, so p6 is pinned first
    // and the rest follow. Arrays replace the asset-overrides list wholesale.
    photos: [
      "/biz-photos/grand-canyon-refrigeration/p6.webp",
      "/biz-photos/grand-canyon-refrigeration/p1.webp",
      "/biz-photos/grand-canyon-refrigeration/p2.webp",
      "/biz-photos/grand-canyon-refrigeration/p3.webp",
      "/biz-photos/grand-canyon-refrigeration/p4.webp",
      "/biz-photos/grand-canyon-refrigeration/p5.webp",
    ],
    services: [
      { name: "Air Conditioning", slug: "air-conditioning", blurb: "When the Peoria heat takes out your AC, Martin and his team arrive with an honest diagnosis and a dependable fix on any make or model — no scare tactics, no overcharging, just a fair solution that keeps your home cool through the Arizona summer." },
      { name: "Heating", slug: "heating", blurb: "Desert nights get cold too. We service and repair furnaces and heating systems of every make, restoring reliable warmth fast so your home stays comfortable when temperatures drop — with the same transparent, fairly priced service our neighbors recommend us for." },
      { name: "Heating & Cooling Repair", slug: "heating-cooling-repair", blurb: "Whatever's gone wrong with your HVAC system, we'll find the real problem and explain it clearly before any work begins. You'll get a straightforward repair and an honest quote — never an inflated one — so your comfort comes back without the runaround." },
      { name: "HVAC Maintenance", slug: "hvac-maintenance", blurb: "Beat the summer breakdown with a seasonal tune-up. Regular maintenance keeps your system running efficiently, catches small problems before they turn costly, and extends the life of your equipment well before the peak Arizona heat hits." },
      { name: "Heating & Air Conditioning Installation", slug: "installation", blurb: "When a system is past saving, we install energy-efficient heating and air conditioning sized right for your home. You'll get an honest recommendation, a fair price, and a clean, professional installation done right the first time." },
      { name: "Heat Pump", slug: "heat-pump", blurb: "Get efficient heating and cooling from a single system. We install and service high-efficiency heat pumps sized for Arizona homes, delivering dependable year-round comfort without the inflated rates or hidden fees." },
      { name: "Indoor Air Quality", slug: "indoor-air-quality", blurb: "Breathe easier at home. From filtration and air purification to humidity and ventilation solutions, we help cut the dust, allergens, and pollutants the desert kicks up so the air throughout your home stays clean and healthy." },
      { name: "Packaged Equipment", slug: "packaged-equipment", blurb: "For homes that rely on all-in-one packaged units, we handle installation, repair, and replacement of rooftop and ground-mount systems — keeping your heating and cooling housed in a single efficient unit running reliably through every season." },
      { name: "Thermostats", slug: "thermostats", blurb: "Take control of your comfort and your energy bill. We install and set up modern programmable and smart thermostats, then make sure you understand exactly how to run them so your system stays efficient and your home stays comfortable." },
    ],
    generatedCopy: {
      heroH1: "Peoria's Honest AC & Heating Experts",
      heroSubhead: "Grand Canyon Refrigeration is your locally owned Peoria team for honest, fairly priced air conditioning and heating — known for clear diagnoses and no scare tactics, with 5 stars from over 100 reviews across Glendale, Surprise, Phoenix, and Sun City.",
    },
  },
  // hv0087 Total Care Heating & Cooling LLC (totalcareheatingandcoolingaz.com — Peoria AZ at 8617 W Salter Dr, (602) 550-0722;
  // owner Sammy, 5.0★/202 reviews, residential + commercial; serving Peoria, Glendale, Surprise, Phoenix & Sun City; honest, no
  // upselling/fear tactics, free estimates, often same-hour response). Logo shipped as Total-Care-Logo.png — a red bold-italic
  // "TOTAL CARE" wordmark with white "Heating & Cooling" and a red/blue arrow mark, all set on a designed BLUE OVAL badge with a red
  // outline → process-assets' near-white knockout cleared only the surrounding white to transparent, leaving the blue oval badge
  // intact; that badge reads cleanly on Theme 1's white nav pill, so nav stays default/white (no chromeDark). The brand swatch
  // arrived as "Screenshot…png" → renamed Color.png so process-assets extracted brandColor #4f5fef (their signature blue); no
  // secondary swatch, so brandColor2 is left to Theme 1's default. No manual color needed. The heavy bold-italic blocky sans
  // wordmark → fontKey "bold" (Archivo) as the closest match; no Font Example screenshot. 4 provided photos (Trane unit install, AC
  // unit, technician, repair van) auto-populate the gallery; default order stands. Their real homepage has no hero video → none set.
  //   SERVICES were the priority (designer's explicit ask: the new site must list the SAME services as the original). The generated
  //   record carried a generic AI lineup (incl. "Indoor Air Quality", which their site does NOT offer) and extract-services couldn't
  //   run (dead Gemini key), so the lineup is pinned HERE to mirror totalcareheatingandcoolingaz.com/hvac-services/ exactly — their
  //   page groups offerings under Cooling (A/C Repair, A/C Installation, A/C Seasonal Maintenance), Heating (Heating Installation &
  //   Repair, Heat Pump Installation & Repair, Gas System Installation & Repair), and Duct Work (Installation & Repair, Insulation &
  //   Sealing). Blurbs are grounded in the site's own copy. showAllServices so all seven render.
  "total-care-heating-and-cooling-llc": {
    fontKey: "bold",
    showAllServices: true,
    services: [
      { name: "A/C Repair", slug: "ac-repair", blurb: "When the Peoria heat takes out your air conditioner, we respond fast — often within the hour — with an honest diagnosis and a dependable repair on any make or model. No upselling, no fear tactics, just a fair fix at a price that'll surprise you." },
      { name: "A/C Installation", slug: "ac-installation", blurb: "When a system is past saving, we install energy-efficient air conditioning sized right for your home or business. You'll be amazed by the price — and delighted by the clean, professional installation done right the first time." },
      { name: "A/C Seasonal Maintenance", slug: "maintenance", blurb: "Beat the summer breakdown with seasonal A/C maintenance. A regular tune-up keeps your system running efficiently, catches small problems before they become costly, and extends the life of your equipment before the peak Arizona heat hits." },
      { name: "Heating Installation & Repair", slug: "heating", blurb: "Desert nights get cold too. We repair and install heating systems of every make, restoring reliable warmth fast so your home or business stays comfortable when temperatures drop — at an affordable, honest price." },
      { name: "Heat Pump Installation & Repair", slug: "heat-pumps", blurb: "Get efficient heating and cooling from a single system. We install and repair high-efficiency heat pumps sized for Arizona homes, keeping your comfort dependable year-round without inflated rates or hidden fees." },
      { name: "Gas System Installation & Repair", slug: "gas-systems", blurb: "From gas furnaces to full gas-heat systems, our technicians handle installation and repair safely and correctly — delivering warm, reliable comfort with the same honest service and fair pricing our neighbors recommend us for." },
      { name: "Duct Work", slug: "ductwork", blurb: "The air you pay to condition is only as good as the ducts that carry it. We handle duct installation and repair plus insulation and sealing — so conditioned air reaches every room, lowers your energy bills, and keeps your home evenly comfortable." },
    ],
    generatedCopy: {
      heroH1: "Total Care: Peoria's Trusted AC Experts Since 2005",
      heroSubhead: "Total Care Heating & Cooling is your locally owned Peoria team for honest, affordable air conditioning, heating, heat pump, and duct work service across Glendale, Surprise, Phoenix, and Sun City — 5 stars from over 200 reviews, with no upselling and no hidden fees.",
    },
  },
  // hv0085 J & M Cooling & Heating (jandmcoolingandheating.com — small family business at 9173 W Parkside Ln, Peoria AZ 85383,
  // (623) 283-3060; locally owned & operated, an authorized Trane Comfort Specialist serving Peoria, Phoenix, Avondale, Surprise,
  // Glendale & Wittmann; residential + commercial). Brand promise: "Making Comfort Accessible to All" — honest, affordable, no
  // hidden fees. Logo shipped as j-m-logo-2.webp — a heavy black "J&M" wordmark (red "&") under a house roofline with "COOLING &
  // HEATING LLC" beneath, on a white plate → process-assets' near-white knockout cleared it to transparent and the black art reads
  // cleanly on Theme 1's white nav pill, so nav stays default/white (no chromeDark). The brand swatch arrived as "Screenshot…png"
  // → renamed Color.png so process-assets extracted brandColor #d61801 (their signature red); no secondary swatch, so brandColor2
  // is left to Theme 1's default. No manual color needed. The heavy bold blocky sans wordmark → fontKey "bold" (Archivo) as the
  // closest match; no Font Example screenshot. 8 provided photos (owner & techs working on units, Trane installs, heat pumps,
  // CO2/IAQ, Phoenix rooftop) auto-populate the gallery; the default order stands. Their real homepage has no hero video → none set.
  //   SERVICES were the priority (designer's explicit ask: the new site must list the SAME services as the original). The generated
  //   record carried no real lineup and extract-services couldn't run (dead Gemini key), so the lineup is pinned HERE to mirror
  //   jandmcoolingandheating.com's actual services nav exactly — Air Conditioning (AC Repair & Installation), Heating, Heat Pumps,
  //   HVAC Maintenance, Ductless Mini Split, Indoor Air Quality, Commercial HVAC, Roofing, and Insulation Systems. Blurbs are
  //   grounded in the site's own copy. showAllServices so all nine render.
  "j-and-m-cooling-and-heating": {
    fontKey: "bold",
    showAllServices: true,
    services: [
      { name: "Air Conditioning", slug: "air-conditioning", blurb: "When the Arizona heat takes out your AC, our technicians arrive fast with an honest diagnosis and a dependable repair or replacement on any make or model — restoring your home's cool without inflated rates or hidden fees." },
      { name: "Heating", slug: "heating", blurb: "Desert nights get cold too. We repair and install furnaces and heating systems of every make, getting reliable warmth back on fast so your home or business stays comfortable when temperatures drop." },
      { name: "Heat Pumps", slug: "heat-pumps", blurb: "As an authorized Trane Comfort Specialist, we install, service, and repair high-efficiency heat pumps that heat and cool in one energy-saving system — sized right for Arizona homes to keep comfort accessible year-round." },
      { name: "HVAC Maintenance", slug: "hvac-maintenance", blurb: "Beat the summer breakdown with a seasonal tune-up. Regular maintenance keeps your system running efficiently, catches small problems before they become costly, and extends the life of your equipment before the peak heat hits." },
      { name: "Ductless Mini Split", slug: "ductless-mini-split", blurb: "Cool and heat additions, garages, and rooms without ductwork. Our ductless mini-split installations deliver efficient, zoned comfort exactly where you need it — quiet, flexible, and easy on your energy bill." },
      { name: "Indoor Air Quality", slug: "indoor-air-quality", blurb: "Breathe easier at home. From advanced filtration and air purification to fresh-air solutions, we help cut dust, allergens, and pollutants so the air throughout your home stays clean and healthy." },
      { name: "Commercial HVAC", slug: "commercial-hvac", blurb: "We keep Valley businesses comfortable with comprehensive commercial HVAC — repair, replacement, and maintenance on rooftop and split systems — delivered with the same honest pricing and dependable workmanship we bring to every home." },
      { name: "Roofing", slug: "roofing", blurb: "Your roof protects everything beneath it — including your HVAC system. We handle roofing repair and replacement so your home stays sealed, efficient, and protected from the Arizona sun and monsoon storms." },
      { name: "Insulation Systems", slug: "insulation-systems", blurb: "Proper insulation keeps the cool air in and the heat out, lowering your energy bills and easing the load on your AC. We install insulation systems that make your home more comfortable and far more efficient." },
    ],
    generatedCopy: {
      heroH1: "Making Comfort Accessible to All in Peoria",
      heroSubhead: "J & M Cooling & Heating is your locally owned, family-run Trane Comfort Specialist — delivering honest, affordable air conditioning, heating, and HVAC service across Peoria, Glendale, Surprise, and the West Valley, with no hidden fees and no high-pressure sales.",
    },
  },
  // hv0084 Semper Fi Heating and Cooling (semperfiheatingcooling.com — Peoria AZ at 9720 W Peoria Ave #107, (480) 885-1999;
  // Marine-themed full-service home-comfort company, 4.8★/1532 reviews, open 24/7, serving Peoria, Glendale, Surprise, Phoenix &
  // Sun City — note the company is HEATING + COOLING + PLUMBING, not AC-only). Logo shipped as a brand SVG
  // (semper-fi-heating-cooling-plumbing-logo.svg) — a cream/gold eagle-globe-anchor crest with navy + red banners → process-assets
  // copied it through as logo.svg untouched (no knockout needed); the navy/red/gold art reads cleanly on Theme 1's white nav pill,
  // so nav stays default/white (no chromeDark). Two brand swatches arrived as "Screenshot…png" → renamed Color.png / Second Color.png
  // so process-assets extracted brandColor #cd010c (their Marine red) and brandColor2 #013da3 (their Marine blue) — both match the
  // crest, no manual color needed. Their site sets headings in 'Jost' (geometric sans) → fontKey "modern" (Poppins) as the closest
  // match; no Font Example screenshot. 5 provided photos (their henderson hero still, AC repair, furnace repair, AC maintenance, and a
  // branded HVAC-contractor shot) auto-populate the gallery; p1 is a designed hero image so the default order stands. No hero video on
  // their real site → none set.
  //   SERVICES were the priority (designer's explicit ask: the new site must list the SAME services as the original). The generated
  //   record carried no real lineup. extract-services couldn't run (dead Gemini key), so the lineup is pinned HERE to mirror
  //   semperfiheatingcooling.com's actual nav (Cooling Services, Heating Services, Plumbing Services) plus the specialty offerings
  //   their site advertises on dedicated pages (Aeroseal Duct Sealing, UV/REME-Halo Air Purification) and AC Maintenance. Blurbs are
  //   grounded in the site's own copy. showAllServices so all seven render.
  "semper-fi-heating-and-cooling": {
    fontKey: "modern",
    showAllServices: true,
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "When the Arizona heat takes out your air conditioner, our technicians arrive fast — 24/7 — and get to the bottom of it with an honest diagnosis and a dependable fix on any make or model, often the same day." },
      { name: "AC Installation & Replacement", slug: "ac-installation", blurb: "When repairs no longer make sense, we replace tired systems with energy-efficient equipment sized right for your home — a clean, professional installation done right the first time, just like a Marine would." },
      { name: "AC Maintenance & Tune-Ups", slug: "maintenance", blurb: "Beat the summer breakdown with a seasonal tune-up. Regular maintenance keeps your system running efficiently, catches small problems before they become costly, and extends the life of your equipment before the peak heat hits." },
      { name: "Heating & Furnace Services", slug: "heating", blurb: "Desert nights get cold too. We repair, replace, and maintain furnaces and heat pumps of every make — restoring reliable warmth fast so your home stays comfortable when temperatures drop." },
      { name: "Plumbing Services", slug: "plumbing", blurb: "More than HVAC — our licensed plumbers handle water heaters, tankless systems, soft-water and repiping, drains, and fixtures, bringing the same honest, thorough workmanship to your home's plumbing." },
      { name: "Indoor Air Quality & Air Purification", slug: "air-quality", blurb: "Breathe easier at home. From REME HALO whole-home purifiers and UV lights to high-efficiency filtration, we install indoor air quality solutions that cut dust, allergens, and germs throughout your home." },
      { name: "Aeroseal Duct Sealing", slug: "duct-sealing", blurb: "Leaky ducts waste the air you pay to cool. Our Aeroseal process seals your ductwork from the inside out — so conditioned air reaches every room, lowering energy bills and evening out the comfort in your home." },
    ],
    generatedCopy: {
      heroH1: "Peoria AC & Heating Done Right. Semper Fi.",
      heroSubhead: "Semper Fi Heating and Cooling brings Marine-grade discipline to home comfort across Peoria, Glendale, Surprise, and the West Valley — 24/7 air conditioning, heating, and plumbing service backed by 1,532 reviews averaging 4.8 stars.",
    },
  },
  // hv0078 Freddy's A/C & Refrigeration LLC (freddysac.com — Glendale AZ, 8516 W Rancho Dr, (623) 755-7471; family-owned 20+ years,
  // recently passed father→son, 4.9★/112 reviews; residential A/C PLUS commercial refrigeration across the Valley). Logo shipped as
  // logo.png — a red cooling-fan badge ringed in blue/red with a blue "FREDDY'S" wordmark over a red "A/C & REFRIGERATION" banner.
  // It sits on its own badge, so process-assets' near-white knockout only cleared the outer background to transparent; the multicolor
  // badge reads cleanly on Theme 1's white nav pill (nav stays default/white, no chromeDark). Two brand swatches arrived as
  // "Screenshot…png" → renamed Color.png / Second Color.png so process-assets extracted brandColor #ea1c0f (their signature red) and
  // brandColor2 #1b72bf (their blue) — no manual color needed. The bold blocky sans wordmark → fontKey "bold" (Archivo) as the
  // closest match. No Font Example screenshot; 16 provided photos (real install/service/rooftop & refrigeration stills) auto-populate
  // the gallery after one md5-identical duplicate was dropped. Their real homepage has no hero video → none set.
  //   SERVICES were the priority (designer's explicit ask: the new site must list the SAME services as the original). The generated
  //   record carried a generic AI lineup (AC Repair, Heating & Furnace, AC Tune-Ups & Maintenance, AC Installation & Replacement,
  //   Indoor Air Quality, Heat Pumps) that did NOT mirror freddysac.com — it invented Indoor Air Quality + Heat Pumps and OMITTED
  //   their namesake COMMERCIAL REFRIGERATION (walk-in coolers/freezers). extract-services couldn't run (dead Gemini key), so the
  //   lineup is pinned HERE to match their actual site: AC Repair, AC Installation & Replacement, AC Tune-Ups & Maintenance, Heating
  //   & Furnace Repair, and Commercial Refrigeration Repair. Blurbs are grounded in the site's own copy. showAllServices so all five render.
  "freddy-s-a-c-and-refrigeration-llc": {
    fontKey: "bold",
    showAllServices: true,
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "When the Arizona heat takes out your air conditioner, our technicians arrive fast and get to the bottom of it — an honest diagnosis and a dependable fix on any make or model that restores your home's cool, often the same day." },
      { name: "AC Installation & Replacement", slug: "ac-installation", blurb: "When repairs no longer make sense, we replace tired systems with energy-efficient equipment sized right for your home — a clean, professional installation done correctly the first time and backed by 20+ years serving the Valley." },
      { name: "AC Tune-Ups & Maintenance", slug: "maintenance", blurb: "Beat the summer breakdown with a seasonal tune-up. Regular maintenance keeps your system running efficiently, catches small problems before they become costly, and extends the life of your equipment before the peak heat hits." },
      { name: "Heating & Furnace Repair", slug: "heating", blurb: "Desert nights get cold too. We diagnose and repair furnaces and heating systems of every make — getting your heat back on fast so your home stays comfortable when temperatures drop." },
      { name: "Commercial Refrigeration Repair", slug: "refrigeration", blurb: "Our specialty since day one. We service and repair commercial refrigeration — walk-in coolers, freezers, and cooling systems — keeping your restaurant or business running and your product protected with prompt, expert repairs." },
    ],
    generatedCopy: {
      heroH1: "Keeping Glendale Cool for Over 20 Years",
      heroSubhead: "Freddy's is a family-owned Arizona team delivering fast, honest air conditioning repair, installation, and maintenance — plus the commercial refrigeration we're named for — across Glendale, Peoria, and the Valley. Rated 4.9 stars by 112 neighbors.",
    },
  },
  // hv0083 Aire Serv of E Glendale-Peoria (aireserv.com/east-glendale-peoria — a Neighborly franchise serving East Glendale &
  // Peoria AZ from 14021 N 51st Ave Ste 115, Glendale 85306; (623) 246-1565; 24/7 dispatch, upfront pricing, "Done Right Promise").
  // Logo shipped as a multicolor brand SVG (asv_logo…svg) — red "A" mark, navy "V" mark, gray "AIRE SERV" wordmark, light-blue
  // tagline — so process-assets copied it through as logo.svg untouched (no knockout needed); the gray/colored art reads cleanly on
  // Theme 1's white nav pill, so nav stays default/white (no chromeDark). Two brand swatches arrived as "Screenshot…png" → renamed
  // Color.png / Second Color.png so process-assets extracted brandColor #da272e (Aire Serv red) and brandColor2 #0034a0 (their navy)
  // — both match the logo, no manual color needed. The clean geometric-sans wordmark → fontKey "modern" (Poppins) as the closest
  // match; no Font Example screenshot. Provided photos were franchise stock at mixed resolution — the five tiny 260px thumbnails and
  // one blog diagram were set aside (_unused/), leaving 7 solid real-work stills (vans, techs with customers, outdoor-unit & thermostat
  // service) for the gallery. Their real site has no hero video → none set.
  //   SERVICES were the priority (designer's explicit ask: the new site must list the SAME services as the original). The generated
  //   record carried a generic AI lineup (AC Repair, Heating & Furnace, AC Tune-Ups & Maintenance, Indoor Air Quality, AC Installation,
  //   Heat Pumps) that flattened Aire Serv's real catalog. extract-services couldn't run (no website on record + dead Gemini key), so the
  //   lineup is pinned HERE to mirror aireserv.com/east-glendale-peoria's actual residential service categories: AC Repair, AC
  //   Installation & Replacement, Heating & Furnace Repair, Ductless Mini-Split Systems, Heat Pumps, Tune-Ups & Maintenance, Indoor Air
  //   Quality, and Air Duct Services. Blurbs are grounded in Aire Serv's own service copy. showAllServices so all eight render.
  "aire-serv-of-e-glendale-peoria": {
    fontKey: "modern",
    showAllServices: true,
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "When your air conditioner quits in the Arizona heat, our technicians arrive fast, diagnose the real problem, and fix any make or model — with the honest, upfront pricing you approve before any work begins." },
      { name: "AC Installation & Replacement", slug: "ac-installation", blurb: "When it's time for a new system, we help you choose energy-efficient equipment sized right for your home and install it cleanly and correctly — backed by our written Done Right Promise." },
      { name: "Heating & Furnace Repair", slug: "heating", blurb: "Desert nights get cold. We service and repair furnaces, heat pumps, and heating systems of every make, restoring reliable warmth quickly so your home stays comfortable all winter." },
      { name: "Ductless Mini-Split Systems", slug: "ductless", blurb: "Cool and heat additions, garages, casitas, and hard-to-reach rooms without bulky ductwork. We design and install efficient ductless mini-split systems tailored to the spaces your central system can't reach." },
      { name: "Heat Pumps", slug: "heat-pumps", blurb: "One efficient system for year-round comfort. We install and service heat pumps that cool in summer and heat in winter, lowering energy use while keeping your home comfortable through every Arizona season." },
      { name: "Tune-Ups & Maintenance", slug: "maintenance", blurb: "Avoid breakdowns before they start. A seasonal tune-up keeps your system running efficiently, extends its life, and catches small issues early — and our Advantage Plan makes routine care effortless." },
      { name: "Indoor Air Quality", slug: "air-quality", blurb: "Breathe easier at home. From high-efficiency air filters and UV lamps to humidifiers and dehumidifiers, we offer indoor air quality solutions that reduce dust, allergens, and dryness throughout your home." },
      { name: "Air Duct Services", slug: "ductwork", blurb: "Leaky or dirty ducts waste energy and comfort. We clean, seal, repair, and insulate ductwork so conditioned air reaches every room — improving efficiency and the air you breathe." },
    ],
    generatedCopy: {
      heroH1: "East Glendale & Peoria's Trusted Heating & Cooling Pros",
      heroSubhead: "Aire Serv of East Glendale-Peoria keeps your home comfortable year-round with expert AC and heating repair, installation, and maintenance — backed by upfront pricing, 24/7 service, and our Neighborly Done Right Promise.",
    },
  },
  // hv0082 Expert HVAC Services Inc (experthvacservices.com — Glendale AZ HQ at 23650 N 35th Dr, (623) 594-2488; serving the
  // Valley of the Sun with complete air conditioning & heating SINCE 2004, residential AND commercial, 4.9★). Logo shipped as
  // expert-log.png — a royal-blue heraldic shield (stylized phoenix) beside a bold italic "EXPERT HVAC SERVICES, INC." wordmark
  // with a yellow "Air Conditioning • Heating" underline, all on a white plate → renamed logo.png so process-assets knocked out
  // the near-white background to transparent; the all-blue art reads cleanly on Theme 1's white nav pill (nav stays default/white,
  // no chromeDark). Two brand swatches arrived as "Screenshot…png" → renamed Color.png / Second Color.png so process-assets
  // extracted brandColor #0e41f9 (their royal blue) and brandColor2 #ffef02 (their accent yellow) — no manual color needed. The
  // heavy bold italic sans wordmark → fontKey "bold" (Archivo) as the closest match. No Font Example screenshot; 7 provided photos
  // (real AC units, install/service stills) auto-populate the gallery. Their real homepage has no hero video → none set.
  //   SERVICES were the priority (designer's explicit ask: the new site must list the SAME services as the original). The generated
  //   record carried a generic AI lineup (AC Repair, AC Installation, Heating & Furnace, Maintenance, Indoor Air Quality, Heat Pumps)
  //   that does NOT mirror experthvacservices.com. extract-services couldn't run (dead Gemini key), so the lineup is pinned HERE to
  //   match their actual site nav (HVAC Replacement, HVAC Repair, New Construction, Ductwork, Service Agreements) plus the standout
  //   offerings their service copy advertises (Mini Split Installation, Heating Repair). Blurbs are grounded in the site's own copy.
  //   showAllServices so all seven render.
  "expert-hvac-services-inc": {
    fontKey: "bold",
    showAllServices: true,
    // Theme 1 renders photos[0] as the hero. p1 is a dim attic-ductwork shot; the designer-grade pick is
    // p7 (a clean, bright exterior AC-condenser shot), so the order is pinned here (manual wins; array
    // replaces wholesale) with p7 first and the rest following so the gallery/cards still show real work.
    photos: [
      "/biz-photos/expert-hvac-services-inc/p7.webp",
      "/biz-photos/expert-hvac-services-inc/p1.webp",
      "/biz-photos/expert-hvac-services-inc/p2.webp",
      "/biz-photos/expert-hvac-services-inc/p3.webp",
      "/biz-photos/expert-hvac-services-inc/p4.webp",
      "/biz-photos/expert-hvac-services-inc/p5.webp",
      "/biz-photos/expert-hvac-services-inc/p6.webp",
    ],
    services: [
      { name: "HVAC Replacement", slug: "hvac-replacement", blurb: "When repairs no longer make sense, we replace aging systems with energy-efficient equipment sized right for your Valley home or business — a worthwhile upgrade in comfort, efficiency, and long-term savings, installed correctly the first time." },
      { name: "HVAC Repair", slug: "hvac-repair", blurb: "When the Phoenix heat takes out your system, our experienced technicians arrive fast and repair all makes and models of cooling and heating equipment — an honest diagnosis and a dependable fix that restores your comfort quickly." },
      { name: "Heating Repair", slug: "heating-repair", blurb: "Stay warm on cool desert nights. We diagnose and repair furnaces, heat pumps, and all heating systems of every make — getting your heat back on fast and keeping your home comfortable when temperatures drop." },
      { name: "Mini Split Installation", slug: "mini-split", blurb: "Discover efficient, all-in-one comfort with professional ductless mini split installation — a smart, energy-saving way to cool and heat additions, garages, casitas, and rooms your existing system can't reach." },
      { name: "Ductwork", slug: "ductwork", blurb: "We design, install, and reconfigure ductwork for maximum efficiency — cleaning and sealing your system so conditioned air reaches every room, lowering energy bills and keeping your whole home evenly comfortable." },
      { name: "New Construction", slug: "new-construction", blurb: "Building from the ground up? We design and install complete HVAC systems tailored to your project's plans and load — premium, properly-matched equipment engineered for efficiency and comfort that lasts for years." },
      { name: "Service Agreements", slug: "service-agreements", blurb: "Keep your system running at its best with a maintenance agreement. Regular tune-ups and inspections catch small issues early, extend equipment life, and help you avoid costly breakdowns during the hottest months." },
    ],
    generatedCopy: {
      heroH1: "Glendale's Trusted HVAC Experts Since 2004",
      heroSubhead: "Expert HVAC Services keeps homes and businesses across the Valley of the Sun comfortable with complete air conditioning and heating — fast, honest repairs, energy-efficient replacements, ductwork, and new construction from technicians you can count on.",
    },
  },
  // hv0079 The AC Team Heating & Cooling LLC (theacteam.com — Glendale AZ, (602) 200-8326, 371 five-star reviews; founded to do HVAC
  // "differently" with NON-COMMISSIONED, hourly-paid technicians and fair, no-upsell pricing). Logo is a bold black "THE AC TEAM /
  // HEATING & COOLING, LLC" wordmark with a red diagonal swoosh and small flame icons, shipped as a PNG on a white plate → renamed
  // logo.png so process-assets knocked out the near-white background to transparent; the black wordmark reads cleanly on Theme 1's
  // white nav pill (nav stays default/white, no chromeDark). One brand swatch arrived as a "Screenshot…png" → renamed Color.png so
  // process-assets extracted brandColor #ff0200 (their signature red, site uses #FF0000). Site font is Montserrat → fontKey "modern"
  // (Poppins) as the closest geometric-sans match. 7 provided photos (sunset rooftop AC techs as the hero, water-heater install,
  // attic ductwork, gauges/manifold shots, living-room thermostat, desert condenser) auto-populate the gallery; the red color swatch
  // and the logo source were moved into _src/ so only real work shows. Their site has no hero video → none.
  //   SERVICES were the priority (designer's explicit ask: the new site must list the SAME services as the original). The generated
  //   record carried a six-item AI lineup (AC Repair, Heating & Furnace, Maintenance, AC Installation, Indoor Air Quality, Heat
  //   Pumps) that did NOT match the real site — it invented Indoor Air Quality + Heat Pumps and OMITTED Water Heater Services, which
  //   theacteam.com features prominently. extract-services couldn't run (dead Gemini key), so the lineup is pinned HERE to mirror
  //   theacteam.com's actual "OUR SERVICES" section: HVAC Service, HVAC Maintenance, HVAC Installation, Water Heater Services —
  //   named as the site names them, with blurbs grounded in the site's own copy.
  "the-ac-team-heating-and-cooling-llc": {
    fontKey: "modern",
    services: [
      { name: "HVAC Service", slug: "ac-repair", blurb: "Reliable air conditioning and heating service for Glendale homes. Our non-commissioned technicians diagnose honestly and repair only what's actually broken — no upsells, no surprises, just your system running right again." },
      { name: "HVAC Maintenance", slug: "maintenance", blurb: "Keep your system reliable year-round. Our preventive tune-ups improve efficiency and catch small problems before they become expensive repairs — extending the life of your equipment through every Arizona season." },
      { name: "HVAC Installation", slug: "ac-installation", blurb: "Ready for a new system? We handle complete HVAC installations sized right for your home, with fair, upfront pricing and quality workmanship from technicians paid by the hour — never on commission." },
      { name: "Water Heater Services", slug: "water-heaters", blurb: "Professional water heater maintenance, service, and installation for your home. From rusty water and weak pressure to a full replacement, we restore dependable hot water with honest pricing every time." },
    ],
    generatedCopy: {
      heroH1: "Glendale's HVAC Team — Done Differently",
      heroSubhead: "The AC Team brings honest heating and cooling to Glendale with non-commissioned, hourly-paid technicians who repair only what's broken. Backed by 371 five-star reviews — fair pricing, quality work, no upsells.",
    },
  },
  // hv0077 Christian Brothers Plumbing, A/C, & Electrical (cbrothers.com — Phoenix Metro, AZ, family-owned & operated across three
  // generations SINCE 1976; tagline "HVAC, Plumbing & Electrical in the Phoenix Metro Area"). Logo shipped as
  // christian-brothers-logo.svg (navy #004490 "Christian BROTHERS" wordmark on transparent) → copied through as logo.svg; reads
  // cleanly on Theme 1's white nav pill (nav stays default/white, no chromeDark). One brand swatch arrived as a "Screenshot…png" →
  // renamed Color.png so process-assets extracted brandColor #074490 (their navy). No Font Example / Second Color screenshot → font
  // left default. 8 provided photos (the 4 "Section-2" service stills — Air Filters, Heating Installation, Refrigerant Leak Repair,
  // UV Air Sanitizers — plus the branded service van, electrician-at-panel, AC-tech, and plumber-at-sink shots) auto-populate the
  // gallery; the solid-blue color swatch was pulled out of the gallery so only real work shows. Their site has no hero video → none.
  //   SERVICES were the priority (designer's explicit ask: the new site must list the SAME services as the original). The generated
  //   record carried an HVAC-ONLY lineup, but Christian Brothers is a THREE-trade shop (A/C + Plumbing + Electrical). extract-services
  //   couldn't run (dead Gemini key), so the lineup is pinned HERE to mirror cbrothers.com's actual nav across all three pillars —
  //   three representative services per trade, named as the site names them. Blurbs are grounded in the site's own copy.
  //   showAllServices so all nine render.
  "christian-brothers-plumbing-a-c-and-electrical": {
    showAllServices: true,
    // Designer pick: lead the hero with the branded service-van shot (p7) instead of the default
    // first photo. Manual photos[] replaces the asset-overrides order wholesale and BizHero renders
    // photos[0], so the van goes first; the rest follow so the gallery/cards still have real work.
    photos: [
      "/biz-photos/christian-brothers-plumbing-a-c-and-electrical/p7.webp", // branded service van — hero
      "/biz-photos/christian-brothers-plumbing-a-c-and-electrical/p1.webp",
      "/biz-photos/christian-brothers-plumbing-a-c-and-electrical/p2.webp",
      "/biz-photos/christian-brothers-plumbing-a-c-and-electrical/p3.webp",
      "/biz-photos/christian-brothers-plumbing-a-c-and-electrical/p4.webp",
      "/biz-photos/christian-brothers-plumbing-a-c-and-electrical/p5.webp",
      "/biz-photos/christian-brothers-plumbing-a-c-and-electrical/p6.webp",
      "/biz-photos/christian-brothers-plumbing-a-c-and-electrical/p8.webp",
    ],
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "When the Phoenix heat takes out your AC, our technicians arrive fast and repair every make and model. You get an honest diagnosis and reliable cooling back the same day — no shortcuts, no surprises." },
      { name: "AC Installation & Replacement", slug: "ac-installation", blurb: "Ready for a new system? We size and install energy-efficient air conditioning tailored to your home and budget, so you stay comfortable through the hottest desert summers for years to come." },
      { name: "Heating & Furnace", slug: "heating", blurb: "Stay warm on cool desert nights. We repair, maintain, and replace furnaces, heat pumps, and ductless mini-splits of every make — getting your heat back on fast and keeping it reliable all winter." },
      { name: "Water Heaters", slug: "water-heaters", blurb: "Lost your hot water? We install and repair both tank and tankless water heaters quickly and affordably, restoring dependable hot water to your home with honest, upfront pricing every time." },
      { name: "Drain Cleaning & Sewer", slug: "drain-sewer", blurb: "From stubborn clogs to full sewer-line replacement, our plumbers clear and repair drains and sewer lines — including trenchless options — to keep your home flowing clean and trouble-free." },
      { name: "Leak Detection & Repair", slug: "leak-detection", blurb: "We pinpoint hidden leaks, slab leaks, and burst pipes before they damage your home, then repair them right the first time to protect your property and stop water waste fast." },
      { name: "Electrical Panels & Wiring", slug: "electrical-panels", blurb: "Our licensed electricians upgrade service panels and handle wiring, outlets, and switches safely and to code — powering your home reliably whether you're remodeling or fixing an aging system." },
      { name: "Lighting & Ceiling Fans", slug: "lighting", blurb: "Brighten and cool any room with professional installation of indoor and outdoor lighting and ceiling fans — improving comfort, efficiency, and the look of your home inside and out." },
      { name: "EV Charging & Surge Protection", slug: "ev-charging", blurb: "Future-proof your home with EV charging station installation, whole-house surge protection, and smoke and carbon-monoxide detectors — modern electrical upgrades that keep your family safe and ready." },
    ],
    generatedCopy: {
      heroH1: "Phoenix's Trusted A/C, Plumbing & Electrical Since 1976",
      heroSubhead: "Christian Brothers is a family-owned, three-generation team serving the Phoenix Metro area with expert air conditioning, plumbing, and electrical service — backed by highly trained technicians, quality parts, and red-carpet customer care.",
    },
  },
  // hv0073 Glendale HVAC Services (yourglendalehvac.com — "Your Glendale HVAC," Glendale AZ, (623) 463-7111, in the HVAC industry
  // since 1985; residential AND commercial, EPA-certified/background-checked techs, never paid on commission). Logo is a multicolor
  // emblem — a red flame + AZ state flag + blue snowflake over a chunky red/gray/blue "HVAC" wordmark — shipped as
  // Glendale-hvac-logo.png on a white plate → process-assets knocked out the near-white background to transparent; the dark
  // red/gray/blue wordmark reads cleanly on Theme 1's white nav pill (nav stays default/white, no chromeDark). One brand swatch
  // arrived as a "Screenshot…png" → renamed Color.png so process-assets extracted brandColor #1d94e3 (their AC blue). The heavy bold
  // sans "HVAC" wordmark → fontKey "bold" (Archivo) as the closest match. No Font Example / Second Color screenshot; 8 provided
  // photos (AC repair/commercial/service/water-heater shots) auto-populate the gallery. Their real site has no hero video → none set.
  //   SERVICES were the priority (designer's explicit ask: the new site must list the SAME services as the original). extract-services
  //   couldn't run (dead Gemini key), so the lineup is pinned HERE to mirror yourglendalehvac.com's actual service menu — residential
  //   AC Repair / AC Maintenance & Service / System Replacement, Heater Repair & Maintenance, Commercial HVAC Service, Water Heater
  //   Repair & Replacement, and their Indoor Air Quality nav category (air cleaners / washable filters / IAQ solutions). Blurbs are
  //   grounded in the site's own copy. showAllServices so all seven render.
  "glendale-hvac-services": {
    fontKey: "bold",
    showAllServices: true,
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "When the Glendale heat takes out your AC, our expert technicians arrive fast and repair all makes and models. You get an accurate, commission-free diagnosis and honest work — no shortcuts, no upselling." },
      { name: "AC Maintenance & Service", slug: "ac-maintenance", blurb: "Keep your system running at its best with regular maintenance. We tune up and service your air conditioner to prevent costly mid-summer breakdowns and keep your home comfortable all season long." },
      { name: "System Replacement", slug: "system-replacement", blurb: "Ready for a new HVAC system? We size and install energy-efficient equipment customized to your home, preferences, and budget — a worthwhile investment in comfort, efficiency, and lasting home value." },
      { name: "Heater Repair & Maintenance", slug: "heating", blurb: "Stay warm on cool desert nights. We repair and maintain heating systems of every make and model, getting your heat back on fast and keeping it running reliably when temperatures drop." },
      { name: "Commercial HVAC Service", slug: "commercial-hvac", blurb: "From offices to bars and restaurants, we keep commercial spaces comfortable with full HVAC service and repair — including chiller systems and ice machine repair — backed by OSHA-compliant, EPA-certified technicians." },
      { name: "Water Heater Repair & Replacement", slug: "water-heater", blurb: "Lost your hot water? We repair and replace water heaters quickly and affordably, restoring reliable hot water to your home with the same honest, transparent service we bring to every job." },
      { name: "Indoor Air Quality", slug: "air-quality", blurb: "Breathe easier with cleaner indoor air. We install electronic air cleaners, permanent washable filters, and indoor air quality solutions to keep the air in your home fresh, healthy, and comfortable." },
    ],
    generatedCopy: {
      heroH1: "Glendale's Trusted HVAC Service Since 1985",
      heroSubhead: "Your Glendale HVAC keeps homes and businesses comfortable across Glendale, AZ — fast, honest AC repair, heating, system replacement, and commercial service from EPA-certified technicians who are never paid on commission.",
    },
  },
  // hv0074 Glendale HVAC Contractor Pro LLC ("Pro HVAC of Glendale," prohvacofglendale.com, Glendale AZ, (623) 292-8992;
  // residential AND commercial cooling & heating, free quotes). Logo is a red/blue tech figure (flame + snowflake) beside a
  // "PRO HVAC CONTRACTOR of Glendale LLC" wordmark — shipped as pro-hvac_gl.png on a white plate → renamed logo.png so
  // process-assets knocked out the near-white background to transparent; the red/navy art reads cleanly on Theme 1's white nav
  // pill (nav stays default/white, no chromeDark). Two brand swatches arrived as "Screenshot…png" → renamed Color.png /
  // Second Color.png so process-assets extracted brandColor #d42f2f (their signature red) and brandColor2 #1877d3 (AC blue) —
  // no manual color needed. The heavy bold sans wordmark → fontKey "bold" (Archivo) as the closest match. No Font Example
  // screenshot; 13 provided photos (AC/furnace/heating service + technician shots) auto-populate the gallery. Their real
  // homepage has no hero video → none set.
  //   SERVICES were the priority (designer's explicit ask: the new site must list the SAME services as the original). The
  //   generated record carried a generic 6-item lineup that doesn't mirror prohvacofglendale.com. extract-services couldn't run
  //   (dead Gemini key), so the lineup is pinned HERE to match their actual site — the four nav service pages (/hvac-installation,
  //   /hvac-repair, /hvac-maintenance, /heat-pump-mini-split) plus the standout whole-home offerings their /services/ page
  //   advertises under "Other Comprehensive HVAC Services" (Indoor Air Quality, Plumbing, Electrical). Their site's leftover
  //   "Heating Oil Delivery" item is template cruft for an AZ company, so it's intentionally left out. Blurbs are grounded in the
  //   site's own copy. showAllServices so all seven render.
  "glendale-hvac-contractor-pro-llc": {
    fontKey: "bold",
    showAllServices: true,
    // Theme 1 uses photos[0] as the hero media. Designer picked imgi_13_AdobeStock_451576532 (= p4) as the hero,
    // so the order is pinned here (manual wins; array replaces wholesale) with p4 first, the rest following.
    photos: [
      "/biz-photos/glendale-hvac-contractor-pro-llc/p4.webp",
      "/biz-photos/glendale-hvac-contractor-pro-llc/p1.webp",
      "/biz-photos/glendale-hvac-contractor-pro-llc/p2.webp",
      "/biz-photos/glendale-hvac-contractor-pro-llc/p3.webp",
      "/biz-photos/glendale-hvac-contractor-pro-llc/p5.webp",
      "/biz-photos/glendale-hvac-contractor-pro-llc/p6.webp",
      "/biz-photos/glendale-hvac-contractor-pro-llc/p7.webp",
      "/biz-photos/glendale-hvac-contractor-pro-llc/p8.webp",
      "/biz-photos/glendale-hvac-contractor-pro-llc/p9.webp",
      "/biz-photos/glendale-hvac-contractor-pro-llc/p10.webp",
      "/biz-photos/glendale-hvac-contractor-pro-llc/p11.webp",
      "/biz-photos/glendale-hvac-contractor-pro-llc/p12.webp",
      "/biz-photos/glendale-hvac-contractor-pro-llc/p13.webp",
    ],
    services: [
      { name: "HVAC Installation", slug: "hvac-installation", blurb: "Upgrading or building new? We size and install energy-efficient air conditioning and heating systems for Glendale homes and businesses — premium, properly-matched equipment installed right the first time, with a free quote up front." },
      { name: "HVAC Repair", slug: "hvac-repair", blurb: "When the desert heat takes out your system, our technicians arrive fast and repair all makes and models of cooling and heating equipment — an honest diagnosis and a reliable fix that gets your comfort back quickly." },
      { name: "HVAC Maintenance", slug: "hvac-maintenance", blurb: "Keep your system running at peak efficiency with routine tune-ups and preventative maintenance. Regular service catches small issues early, extends equipment life, and helps you avoid costly mid-summer breakdowns." },
      { name: "Heat Pump & Mini Split", slug: "heat-pumps", blurb: "Discover efficient, all-in-one comfort with professional heat pump and ductless mini split installation and service — a smart, energy-saving way to cool and heat additions, garages, and whole homes alike." },
      { name: "Indoor Air Quality", slug: "air-quality", blurb: "Breathe easier indoors with air quality solutions tailored to your home. We help reduce dust, allergens, and pollutants so the air your family breathes stays fresh, clean, and healthy year-round." },
      { name: "Plumbing Services", slug: "plumbing", blurb: "Beyond heating and cooling, our team handles your plumbing needs too — dependable repairs and installations from a single trusted contractor, so you have one call to make for whole-home comfort." },
      { name: "Electrical Services", slug: "electrical", blurb: "From wiring to fixtures and system hookups, our electrical services keep your home safe and running smoothly — comprehensive, code-compliant work backed by the same honest, professional standard we bring to every job." },
    ],
    generatedCopy: {
      heroH1: "Glendale's Trusted HVAC Contractor",
      heroSubhead: "Pro HVAC of Glendale delivers premium residential and commercial cooling and heating across Glendale, AZ — expert installation, fast repairs, and reliable maintenance, all backed by a free, no-pressure quote.",
    },
  },
  // hv0071 Schiller Heating & Cooling, Inc. (schillerair.com — Tempe HQ, (480) 961-4920, serving the greater Phoenix Valley;
  // NATE-certified, technicians average 13+ years, never paid on commission). Logo is a heavy bold wordmark — navy snow-capped
  // "SCHILLER" over white "HEATING & COOLING" on a blue pill — shipped as logo.png; process-assets knocked out the near-white
  // background to transparent, and the dark navy "SCHILLER" reads cleanly on Theme 1's white nav pill (nav stays default/white, no
  // chromeDark). Two brand swatches arrived as "Screenshot…png" → renamed Color.png / Second Color.png so process-assets extracted
  // brandColor #062f54 (signature navy) and brandColor2 #289be6 (sky blue) — no manual color needed. The heavy bold sans wordmark →
  // fontKey "bold" (Archivo) as the closest match. No Font Example screenshot; 4 provided photos (branded van, rooftop/install
  // shots) auto-populate the gallery. Their real homepage uses a MetaSlider image slider, no hero video → none set.
  //   SERVICES were the priority (designer's explicit ask: the new site must list the SAME services as the original). The generated
  //   record carried a generic 6-item lineup (Heat Pumps, plus an "AC Repair/Installation/Heating/Maintenance/Air Quality" mix)
  //   that does NOT mirror schillerair.com. extract-services couldn't run (dead Gemini key), so the lineup is pinned HERE to match
  //   what their two real service pages actually present (/service/ "Our Service Department Offers" + /installs/): routine service &
  //   repair, Trane installation & replacement, annual maintenance agreements, after-hours emergency service, free second opinions
  //   on major repairs, and indoor air quality / ductwork. (Their "flat-rate pricing" and "Financing" nav item are pricing policies,
  //   not trade services, so they're intentionally left out of the service grid.) Blurbs are grounded in each page's own copy.
  //   showAllServices so all six render.
  "schiller-heating-and-cooling-inc": {
    fontKey: "bold",
    showAllServices: true,
    services: [
      { name: "AC & Heating Service", slug: "ac-repair", blurb: "When your system needs service, you get a skilled NATE-certified technician — never a salesperson. We quickly assess your heating or cooling system and give you an honest, straightforward evaluation, never paid on commission." },
      { name: "AC Installation & Replacement", slug: "ac-installation", blurb: "A smarter way to replace your system: we evaluate the correct size, your ductwork, and your comfort needs, then install premium Trane equipment — backed by 10-year parts and labor warranties on nearly all systems." },
      { name: "Annual Maintenance Agreements", slug: "maintenance", blurb: "Regular maintenance keeps your system running efficiently and reliably through Phoenix's extreme summer heat. Every visit we rinse the condenser coil and inspect the indoor coil to prevent costly mid-summer breakdowns." },
      { name: "After-Hours Emergency Service", slug: "emergency-service", blurb: "When the heat won't wait, neither do we. Our after-hours emergency service gets an experienced technician to your home to diagnose and fix the problem fast, so your home is comfortable again." },
      { name: "Free Second Opinions", slug: "second-opinions", blurb: "Facing a major repair? Get a free second opinion from a technician who isn't paid on commission. You'll get an honest assessment and never be sold unnecessary parts or services." },
      { name: "Indoor Air Quality & Ductwork", slug: "air-quality", blurb: "Comfort is more than temperature. We assess your ductwork and indoor air quality, then walk you through solutions that address hot and cold rooms, efficiency, and the air your family breathes." },
    ],
    generatedCopy: {
      heroH1: "Phoenix Valley Heating & Cooling — Service You Can Trust",
      heroSubhead: "Schiller Heating & Cooling has served the Phoenix Valley for decades with NATE-certified technicians who average 13+ years of experience — never paid on commission, just honest service and expert Trane installs.",
    },
  },
  // hv0069 All Season Plumbing And Air (allseasonsplumbingandair.com/tempe — Tempe HQ serving Tempe and the greater Phoenix Valley).
  // Logo is a serif wordmark — navy "ALL SEASON" over an italic "PLUMBING & AIR", with four seasonal tiles (green leaf / yellow sun /
  // orange autumn / blue snowflake) — shipped as All-Season-Plumbing-and-Air.webp on a white plate → renamed logo.webp so
  // process-assets knocked out the near-white background to transparent; the dark navy wordmark reads cleanly on Theme 1's white nav
  // pill (nav stays default/white, no chromeDark). The one brand swatch arrived as a "Screenshot…png" → renamed Color.png so
  // process-assets extracted brandColor #75b777 (their leaf-green). The classic serif wordmark → fontKey "elegant" (Playfair) as the
  // closest match (headings serif; body/menu stay sans). No Font Example / Second Color screenshot; 8 provided photos (AC repair,
  // install, maintenance, filter replacement, branded van) auto-populate the gallery. Their real site has no hero video → none set.
  //   SERVICES were the priority (designer's explicit ask: the new site must list the SAME services as the original). The generated
  //   record carried a generic 6-item lineup (Heating & Furnace / Indoor Air Quality / Heat Pumps) that does NOT match their site —
  //   despite the "Plumbing AND Air" name, allseasonsplumbingandair.com/services/ is branded "Our AC Services" and lists EXACTLY 4:
  //   AC Repair, AC Installation, AC Maintenance, AC Filter Replacement. extract-services couldn't run (dead Gemini key), so the
  //   lineup is pinned HERE to mirror the site EXACTLY (blurbs grounded in each service page's own copy). showAllServices so all four render.
  "all-season-plumbing-and-air-tempe": {
    fontKey: "elegant",
    showAllServices: true,
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "Arizona heat is brutal on a failing AC. Our expert technicians arrive fast, pinpoint the real problem on-site, and get your home cooling again — keeping your system running optimally when you need it most." },
      { name: "AC Installation", slug: "ac-installation", blurb: "Stay cool and stay relaxed with a flawless new AC installation. Our specialists size and install the right energy-efficient system for your home, with clean workmanship and dependable results." },
      { name: "AC Maintenance", slug: "ac-maintenance", blurb: "Avoid costly repairs with regular AC maintenance. We tune up your system to keep it running efficiently year-round, extending its life and protecting your home's comfort through every season." },
      { name: "AC Filter Replacement", slug: "ac-filter-replacement", blurb: "Filter dust and embrace comfort. Our knowledgeable team replaces your AC filters to keep your indoor air fresh and clean, helping you breathe easier while your system runs at peak efficiency." },
    ],
    generatedCopy: {
      heroH1: "Tempe's Trusted AC Repair & Installation Team",
      heroSubhead: "All Season Plumbing and Air keeps Tempe and the Phoenix Valley cool — fast, expert AC repair, installation, maintenance, and filter replacement, done right the first time.",
    },
  },
  // hv0072 All Season Plumbing And Air — GLENDALE location (allseasonsplumbingandair.com/glendale — 5008 W Glendale Ave Unit 115,
  // Glendale AZ; (623) 292-7548). Same chain as hv0069 (Tempe), so the brand kit is identical: the serif "ALL SEASON / PLUMBING &
  // AIR" wordmark with four seasonal tiles shipped as All-Season-Plumbing-and-Air.webp on a white plate → renamed logo.webp so
  // process-assets knocked out the near-white background to transparent; the navy wordmark reads cleanly on Theme 1's white nav pill
  // (nav stays default/white, no chromeDark). The one brand swatch arrived as a "Screenshot…png" → renamed Color.png so process-assets
  // extracted brandColor #61ce70 (their leaf-green). Serif wordmark → fontKey "elegant" (Playfair). No Font Example / Second Color
  // screenshot. Designer dropped 12 images, but 8 were blog illustrations (refrigeration-cycle, thermostat-settings, seer2-rating,
  // etc.) — moved to _blog-unused; the 4 REAL-work shots (branded truck + van, technician servicing a condenser) auto-populate the
  // gallery. Their real site has no hero video → none set.
  //   SERVICES were the priority (designer's explicit ask: the new site must list the SAME services as the original). The generated
  //   record carried a generic 6-item lineup (AC Installation & Replacement / Heating & Furnace / Indoor Air Quality / Heat Pumps)
  //   that does NOT match their site — despite the "Plumbing AND Air" name, allseasonsplumbingandair.com is branded "Our AC Services"
  //   and lists EXACTLY 4: AC Repair, AC Installation, AC Maintenance, AC Filter Replacement. extract-services couldn't run (dead
  //   Gemini key), so the lineup is pinned HERE to mirror the site EXACTLY (same 4 as the Tempe sibling). showAllServices so all four render.
  "all-season-plumbing-and-air-glendale": {
    fontKey: "elegant",
    showAllServices: true,
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "Arizona heat is brutal on a failing AC. Our expert technicians arrive fast, pinpoint the real problem on-site, and get your home cooling again — keeping your system running optimally when you need it most." },
      { name: "AC Installation", slug: "ac-installation", blurb: "Stay cool and stay relaxed with a flawless new AC installation. Our specialists size and install the right energy-efficient system for your home, with clean workmanship and dependable results." },
      { name: "AC Maintenance", slug: "ac-maintenance", blurb: "Avoid costly repairs with regular AC maintenance. We tune up your system to keep it running efficiently year-round, extending its life and protecting your home's comfort through every season." },
      { name: "AC Filter Replacement", slug: "ac-filter-replacement", blurb: "Filter dust and embrace comfort. Our knowledgeable team replaces your AC filters to keep your indoor air fresh and clean, helping you breathe easier while your system runs at peak efficiency." },
    ],
    generatedCopy: {
      heroH1: "Glendale's Trusted AC Repair & Installation Team",
      heroSubhead: "All Season Plumbing and Air keeps Glendale and the Phoenix Valley cool — fast, expert AC repair, installation, maintenance, and filter replacement, done right the first time.",
    },
  },
  // hv0068 A/C Experts (acexpertsaz.com — Tempe HQ, "20 Years Serving the Valley," NATE-certified, Arizona's Premier Cooling &
  // Heating). Logo "AC Experts — Cooling & Heating" shipped as Experts-Logo-1.png with real transparency (blue "AC" + red swoosh,
  // black "Experts" wordmark, blue/red "COOLING & HEATING") → process-assets kept the alpha as-is; the dark wordmark reads cleanly
  // on Theme 1's white nav pill (nav stays default/white, no chromeDark). The brand swatch arrived as a "Screenshot…png" → renamed
  // Color.png so process-assets extracted brandColor #0d71c3 (their signature blue). The heavy bold sans "Experts" wordmark →
  // fontKey "bold" (Archivo) as the closest match. No Font Example / Second Color screenshot. 4 provided photos (AC service/
  // install/maintenance shots) auto-populate the gallery. Their real site has no hero video (static graphics) → none set.
  //   SERVICES were the priority (designer's explicit ask: the new site must list the SAME services as the original). The generated
  //   record carried a generic 6-item lineup (Heat Pumps / Indoor Air Quality / Tune-Ups) that does NOT match acexpertsaz.com and
  //   DROPPED Duct Cleaning. extract-services couldn't run (dead Gemini key), so the lineup is pinned HERE to mirror their actual
  //   services menu ("What Can We Help You With Today?"): Air Conditioning Services, AC Installation, AC Repair, Heating Services,
  //   Duct Cleaning, and Residential & Commercial. (Their nav also lists "Financing" — a payment option, not a trade service — so
  //   it's intentionally left out of the service grid.) showAllServices so all six render.
  "a-c-experts": {
    fontKey: "bold",
    showAllServices: true,
    // Hero = the rooftop-condenser / hard-hat tech shot (p2, imgi_7_Depositphotos_55686487) per the designer. photos[0] drives the
    // hero, so this pins that image first while keeping the rest of the gallery — overrides the default p1-first order from
    // asset-overrides.json (manual wins; array replaces wholesale).
    photos: [
      "/biz-photos/a-c-experts/p2.webp",
      "/biz-photos/a-c-experts/p1.webp",
      "/biz-photos/a-c-experts/p3.webp",
      "/biz-photos/a-c-experts/p4.webp",
    ],
    services: [
      { name: "Air Conditioning Services", slug: "air-conditioning", blurb: "From quick fixes to full-system care, our NATE-certified technicians keep your home cool through the Arizona summer with dependable, all-around air conditioning service." },
      { name: "AC Installation", slug: "ac-installation", blurb: "Upgrade to a new, energy-efficient AC system sized right for your home. We handle complete installations and replacements with clean workmanship and honest, up-front pricing." },
      { name: "AC Repair", slug: "ac-repair", blurb: "When your AC quits in the heat, we arrive fast, diagnose the real problem on-site, and get your home cooling again — from failed capacitors and refrigerant leaks to airflow and thermostat faults." },
      { name: "Heating Services", slug: "heating", blurb: "Stay comfortable on cool desert nights with reliable heating service. We repair, maintain, and install heating systems of every make and model so your home stays warm when temperatures drop." },
      { name: "Duct Cleaning", slug: "duct-cleaning", blurb: "Clear out the dust, allergens, and buildup hiding in your ductwork. Professional duct cleaning improves airflow, freshens your indoor air, and helps your system run more efficiently." },
      { name: "Residential & Commercial", slug: "residential-commercial", blurb: "Homes and businesses alike count on us for cooling and heating that just works. We bring the same NATE-certified expertise and honest pricing to every residential and commercial project." },
    ],
    generatedCopy: {
      heroH1: "Tempe's Trusted Cooling & Heating Experts",
      heroSubhead: "A/C Experts has kept the Valley comfortable for 20 years — fast, NATE-certified AC repair, installation, heating, and duct cleaning for homes and businesses across Tempe and Phoenix.",
    },
  },
  // hv0067 Saguaro Plumbing And Air Of Tempe (saguaroplumbingandair.com — Tempe HQ serving Tempe and the wider Phoenix Valley).
  // Logo is a vintage desert badge: a dark navy shield with an orange-sunset saguaro scene and a chunky sand-colored "SAGUARO" /
  // "PLUMBING & AIR" wordmark, shipped as saguaro-logo-4-1.webp with real transparency around the badge → process-assets kept it
  // as-is (no white-knockout). The dark navy badge reads cleanly on Theme 1's white nav pill (nav stays default/white, no
  // chromeDark). The one brand swatch arrived as a "Screenshot…png" → renamed Color.png so process-assets extracted brandColor
  // #ec5d4a (the logo's terracotta sunset). The bold, slightly condensed western/badge wordmark → fontKey "bold" (Archivo) as the
  // closest match (headings bold sans; body/menu stay sans). No Font Example / Second Color screenshot; 9 provided photos (heat
  // pump, AC repair/installation, water heater, filter replacement, etc.) auto-populate the gallery.
  //   SERVICES were the priority (designer's explicit ask: the new site must list the SAME services as the original). This is a
  //   "Plumbing AND Air" company, but the generated record carried only a thin 6-item GENERIC-HVAC lineup and DROPPED every
  //   plumbing service (their own water-heater photo proves plumbing is core). A live crawl of saguaroplumbingandair.com lists
  //   EXACTLY 18 services — 6 HVAC (AC Repair, AC Installation, AC Filter Replacement, Furnace Repair, Furnace Installation, Heat
  //   Pump) and 12 plumbing (Drain Cleaning, Emergency Plumber, Faucet Repair, Garbage Disposal Repair, Leak Repair, Sewer Lines
  //   & Excavation, Shower Repair, Sink Repair & Installation, Slab Leak Repair, Sump Pump, Toilet Repair, Water Heater).
  //   extract-services couldn't run (dead Gemini key), so the full lineup is pinned HERE to mirror the site EXACTLY. showAllServices
  //   so all eighteen render.
  "saguaro-plumbing-and-air-of-tempe": {
    fontKey: "bold",
    showAllServices: true,
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "When your AC quits in the Arizona heat, our technicians arrive fast, diagnose the real problem on-site, and get your home cooling again — from failed capacitors and refrigerant leaks to airflow and thermostat faults." },
      { name: "AC Installation", slug: "ac-installation", blurb: "Upgrade to a new, energy-efficient air conditioning system sized right for your home. We handle full installations and replacements with clean, professional workmanship and honest, up-front pricing." },
      { name: "AC Filter Replacement", slug: "ac-filter-replacement", blurb: "Keep your system running efficiently and your air clean with regular filter changes. Fresh filters protect airflow, ease the load on your AC, and help your equipment last longer through the desert summer." },
      { name: "Furnace Repair", slug: "furnace-repair", blurb: "Stay comfortable on cool desert nights with dependable furnace service. We diagnose and repair heating systems of every make and model so your home stays warm when temperatures drop." },
      { name: "Furnace Installation", slug: "furnace-installation", blurb: "From sizing to start-up, we install and replace heating systems built for Arizona homes — efficient, reliable warmth backed by professional workmanship and clear, up-front pricing." },
      { name: "Heat Pump", slug: "heat-pumps", blurb: "Get year-round comfort from a single efficient system. We install, repair, and maintain heat pumps that both heat and cool your home while keeping energy bills in check." },
      { name: "Drain Cleaning", slug: "drain-cleaning", blurb: "Say goodbye to clogged drains and slow water flow. We clear stubborn blockages and restore proper drainage throughout your home — kitchen, bath, and main lines alike." },
      { name: "Emergency Plumber", slug: "emergency-plumber", blurb: "Plumbing emergencies don't wait, and neither do we. Our team responds fast to burst pipes, major leaks, and overflows to protect your home and stop the damage." },
      { name: "Faucet Repair", slug: "faucet-repair", blurb: "Stop the drip and the waste. We repair and replace leaky, worn, or malfunctioning faucets in kitchens and bathrooms — restoring smooth, reliable water flow." },
      { name: "Garbage Disposal Repair", slug: "garbage-disposal", blurb: "Jammed, leaking, or dead disposal? We repair and replace garbage disposals quickly so your kitchen sink is back in working order." },
      { name: "Leak Repair", slug: "leak-repair", blurb: "We track down and fix water leaks fast — before they drive up your bill or damage your home. From hidden pipe leaks to fixtures, we find the source and make it right." },
      { name: "Sewer Lines & Excavation", slug: "sewer-lines", blurb: "For major sewer issues, our team handles line repair, replacement, and excavation with the equipment and expertise to get it done right and restore your system." },
      { name: "Shower Repair", slug: "shower-repair", blurb: "Low pressure, leaks, or a faulty valve? We repair shower plumbing and fixtures so you get reliable hot water and steady flow every time." },
      { name: "Sink Repair & Installation", slug: "sink-repair", blurb: "From quick repairs to brand-new installs, we handle kitchen and bathroom sinks — fixtures, drains, and supply lines — with clean, professional work." },
      { name: "Slab Leak Repair", slug: "slab-leak", blurb: "Specialized detection and repair of leaks beneath your foundation. We locate slab leaks precisely and fix them with minimal disruption to protect your home's structure." },
      { name: "Sump Pump", slug: "sump-pump", blurb: "Protect your home from water intrusion with reliable sump pump installation, repair, and maintenance — keeping the lowest level of your home dry and safe." },
      { name: "Toilet Repair", slug: "toilet-repair", blurb: "Running, clogged, or leaking toilet? We repair and replace toilets quickly to stop the waste and restore a fixture you rely on every day." },
      { name: "Water Heater", slug: "water-heater", blurb: "No hot water? We repair, replace, and install water heaters — tank and tankless — so your home has dependable hot water for showers, laundry, and dishes." },
    ],
    generatedCopy: {
      heroH1: "Tempe's Trusted Plumbing & Air Experts",
      heroSubhead: "Saguaro Plumbing And Air keeps Tempe and the Phoenix Valley comfortable — fast, honest AC and heating service plus full-service plumbing, from drains and water heaters to slab leaks and emergencies.",
    },
  },
  // hv0066 Just Better Air Conditioning and Heating LLC (justbetterair.com — Tempe HQ, est. 2012, serving Tempe, Mesa, Chandler,
  // Gilbert, Phoenix, Scottsdale, Ahwatukee, Guadalupe & Dobson Ranch across the Phoenix Valley; a Bryant dealer). Logo is an
  // elegant charcoal serif wordmark "JUST BETTER" over a smaller "AIR CONDITIONING & HEATING" with a red+blue ribbon swoosh,
  // shipped as logo.avif with real transparency → process-assets kept it as-is (no white-knockout). The dark wordmark reads
  // cleanly on Theme 1's white nav pill (nav stays default/white, no chromeDark). Two brand swatches arrived as "Screenshot…png"
  // → renamed Color.png (red #d60805, primary) and Second Color.png (blue #0744a3, secondary) so process-assets extracted both —
  // the heating-red + cooling-blue of the logo ribbon. High-contrast Roman serif wordmark → fontKey "ant" (Playfair) as the
  // closest match (headings serif; body/menu stay sans). No Font Example screenshot; 7 provided photos (Bryant Evolution
  // condenser, thermostat, attic ductwork, ductless packaging, gray van) auto-populate the gallery.
  //   SERVICES were the priority (designer's explicit ask: the new site must list the SAME services as the original). A crawl of
  //   justbetterair.com's HVAC service menu shows their real offering: A/C Repair, A/C Installation, A/C Maintenance, Heating
  //   (install/repair/maintenance), Heat Pumps, Ductless Systems, Duct Cleaning & Repair, Indoor Air Quality, Smart/Wifi
  //   Thermostats, and Attic Insulation. The generated record had a thinner 6-item lineup that OMITTED ductless, ductwork,
  //   thermostats and attic insulation (all core — their own ductless, thermostat and attic-ductwork photos prove it).
  //   extract-services couldn't run (dead Gemini key), so the lineup is pinned HERE to mirror the site EXACTLY. showAllServices
  //   so all ten render.
  "just-better-air-conditioning-and-heating-llc": {
    fontKey: "ant",
    showAllServices: true,
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "When your air conditioning quits in the Arizona heat, our technicians arrive fast, diagnose the real problem on-site, and get your home cooling again — from failed capacitors and refrigerant leaks to airflow and thermostat faults." },
      { name: "AC Installation & Replacement", slug: "ac-installation", blurb: "Upgrade to a new, energy-efficient Bryant system sized right for your home. We handle full installations and replacements with clean, professional workmanship and honest, up-front pricing." },
      { name: "AC Maintenance & Tune-Ups", slug: "maintenance", blurb: "Seasonal tune-ups keep your system running efficiently through the long desert summer — catching small problems early, lowering energy bills, and extending the life of your equipment. Ask about our Maintenance Club." },
      { name: "Heating & Furnace", slug: "heating", blurb: "Stay comfortable on cool desert nights with dependable heating service — furnace and heating-system installation, repair, and maintenance for every make and model." },
      { name: "Heat Pumps", slug: "heat-pumps", blurb: "We service and install high-efficiency heat pump systems — an energy-smart solution that both heats and cools your Arizona home from a single system." },
      { name: "Ductless Mini-Split Systems", slug: "ductless", blurb: "Perfect for additions, garages, and rooms that never get comfortable, our ductless mini-split installations deliver targeted, efficient cooling and heating without the need for ductwork." },
      { name: "Duct Cleaning & Repair", slug: "ductwork", blurb: "Leaky or dirty ducts waste energy and circulate dust through your home. We clean, seal, and repair ductwork to restore airflow, comfort, and efficiency throughout the house." },
      { name: "Indoor Air Quality", slug: "air-quality", blurb: "Breathe easier with whole-home air solutions — air purifiers, filtration, and duct services that strip dust, allergens, and pollutants from the air your family breathes." },
      { name: "Smart & WiFi Thermostats", slug: "thermostats", blurb: "Take control of your comfort and energy use with a smart, programmable thermostat. We install and configure the right unit for your system and show you how to get the most from it." },
      { name: "Attic Insulation", slug: "attic-insulation", blurb: "Proper attic insulation keeps the desert heat out and your conditioned air in — easing the load on your AC, leveling out hot-and-cold rooms, and lowering your energy bills year-round." },
    ],
    generatedCopy: {
      heroH1: "Tempe's Trusted AC & Heating Experts",
      heroSubhead: "Just Better Air Conditioning & Heating keeps the Phoenix Valley comfortable — fast, honest AC repair and installation, heating, ductless systems, indoor air quality, and more. Backed by a 4.8-star average from over 2,200 reviews.",
    },
  },
  // hv0065 Savage Air Conditioning (savageac.com — Tempe HQ serving Tempe and the wider Phoenix Valley). Logo is a bold blue
  // "SAVAGE" wordmark with a light-blue "AIR CONDITIONING" + swoosh, shipped on a white plate → process-assets knocked the white
  // background out to transparent. The all-blue wordmark reads cleanly on Theme 1's white nav pill (no chromeDark). The one brand
  // swatch arrived as "Screenshot…png" → renamed Color.png so process-assets extracted brandColor #0f69ab (the logo's blue).
  // Bold, slightly condensed heavy sans wordmark → fontKey "bold" (Archivo) as the closest match. No Font Example / Second Color
  // screenshot; 9 provided photos (AC, heating, plumbing, commercial, maintenance) auto-populate the gallery.
  //   SERVICES were the priority (designer's explicit ask: the new site must list the SAME services as the original). A live DOM
  //   crawl of savageac.com shows real top-level pillars: Air Conditioning (Repair & Maintenance, Installation & Replacement),
  //   Heating Systems, Indoor Air Quality, Plumbing, Commercial Services, plus a Maintenance Plan (Wellness Club) — but the
  //   generated record invented a 6-item AC/heating lineup with Heat Pumps and OMITTED Plumbing and Commercial entirely (both are
  //   core offerings — their own plumbing & commercial photos prove it). Lineup is pinned HERE to mirror the site EXACTLY.
  //   showAllServices so all seven render.
  "savage-air-conditioning": {
    fontKey: "bold",
    showAllServices: true,
    services: [
      { name: "Air Conditioning Repair", slug: "ac-repair", blurb: "When your AC quits in the Arizona heat, our technicians arrive fast, diagnose the real problem on-site, and get your home cooling again — from refrigerant leaks and failed capacitors to airflow and thermostat issues." },
      { name: "AC Installation & Replacement", slug: "ac-installation", blurb: "Upgrade to a new, energy-efficient air conditioning system sized right for your home. We handle full installations and replacements with clean, professional work and honest, up-front pricing." },
      { name: "Heating Systems", slug: "heating", blurb: "Stay warm on cool desert nights with dependable heating service — furnaces, heat pumps, and ductless mini-splits, plus repair, installation, and replacement for every make and model." },
      { name: "Indoor Air Quality", slug: "air-quality", blurb: "Breathe easier with whole-home air solutions — air cleaners, UV purifiers, and duct services that strip dust, allergens, and pollutants from the air your family breathes." },
      { name: "Plumbing", slug: "plumbing", blurb: "Full-service plumbing for your home — water heaters, drain and sewer service, repiping, water filtration, and repairs, handled by licensed pros with up-front pricing." },
      { name: "Commercial Services", slug: "commercial", blurb: "Keep your business comfortable and running with commercial HVAC and maintenance — responsive service and reliable systems sized for offices, storefronts, and light-commercial spaces." },
      { name: "Maintenance Plan", slug: "maintenance", blurb: "Join the Wellness Club for priority service and seasonal tune-ups that keep your system running efficiently, catch small problems early, and extend the life of your equipment year-round." },
    ],
    generatedCopy: {
      heroH1: "Tempe's Trusted AC, Heating & Plumbing",
      heroSubhead: "Savage Air Conditioning keeps the Phoenix Valley comfortable — fast, honest AC repair and installation, heating, indoor air quality, plumbing, and commercial service.",
    },
  },
  // hv0063 HVAC Near Me Repair And Installation Of Tempe (hvacnearme.today — East Valley HQ serving Tempe and the wider Phoenix
  // Valley: Mesa, Chandler, Gilbert, Scottsdale, Phoenix, Ahwatukee, Queen Creek, etc.). Logo is a bold rounded sky-blue "HVAC"
  // wordmark with a snowflake-in-a-map-pin mark, over a light gray "NEAR ME" — shipped as Logo@2x.webp with real transparency,
  // so process-assets kept it as-is (no white-knockout). Blue + gray read cleanly on Theme 1's white nav pill (nav stays
  // default/white, no chromeDark). The one brand swatch arrived as "Screenshot…png" → renamed Color.png so process-assets
  // extracted brandColor #48a7e0 (the logo's sky blue). Bold rounded geometric wordmark → fontKey "modern" (Poppins) as the
  // closest match. No Font Example / Second Color screenshot; 7 provided photos auto-populate the gallery.
  //   SERVICES were the priority (designer's explicit ask: the new site must list the SAME services as the original). Live DOM
  //   crawl of hvacnearme.today — their primary "HVAC Repair and Maintenance Services" menu lists EXACTLY four real services:
  //   AC system maintenance, Heating system installation, HVAC system maintenance, Thermostat Installation. extract-services
  //   couldn't run (dead Gemini key), so the lineup is pinned HERE to mirror the site EXACTLY. showAllServices so all four render.
  "hvac-near-me-repair-and-installation-of-tempe": {
    fontKey: "modern",
    showAllServices: true,
    services: [
      { name: "AC System Maintenance", slug: "ac-system-maintenance", blurb: "Keep your air conditioning running efficiently through the long desert summer. Our preventive tune-ups catch small problems before they become costly breakdowns and extend the life of your system." },
      { name: "Heating System Installation", slug: "heating-system-installation", blurb: "From furnaces to heat pumps, we install and replace heating systems sized and tuned for Arizona homes — efficient, reliable comfort with professional workmanship and clear, up-front pricing." },
      { name: "HVAC System Maintenance", slug: "hvac-system-maintenance", blurb: "Whole-system care for both heating and cooling. Our seasonal maintenance keeps every part of your HVAC working its best, improves efficiency, and helps you avoid surprise repairs year-round." },
      { name: "Thermostat Installation", slug: "thermostat-installation", blurb: "Upgrade to a smart, programmable thermostat for better comfort and lower energy bills. We install and configure the right thermostat for your system and walk you through getting the most from it." },
    ],
    generatedCopy: {
      heroH1: "Tempe HVAC Repair & Installation, Done Right",
      heroSubhead: "Fast, honest heating and air conditioning service across Tempe and the East Valley — AC and HVAC maintenance, heating installation, and smart thermostat upgrades.",
    },
  },
  // hv0062 Bumble Bee Air Conditioning (bumblebeeairconditioning.com — East Valley HQ serving Tempe, Mesa, Chandler, Gilbert,
  // Scottsdale, Phoenix, Ahwatukee, Paradise Valley, Queen Creek, Apache Junction). Logo is the cartoon yellow/red bumble-bee
  // mascot holding a gauge beside a clean gray "BUMBLE BEE" / black "AIR CONDITIONING" wordmark, shipped on a white plate →
  // process-assets knocked the white background out to transparent. Gray + black wordmark and the colorful bee read cleanly on
  // Theme 1's white nav pill (no chromeDark). The brand swatch ("Screenshot…png" → Color.png) is the mascot's signature yellow
  // → process-assets extracted brandColor #fff700. Clean geometric wordmark → fontKey "modern" (Poppins). No hero video on
  // their site; their branded fleet shot (p1) drives the hero. No Font Example / Second Color screenshot.
  //   SERVICES were the priority (designer's explicit ask: the new site must list the SAME services as the original). A live
  //   DOM crawl of bumblebeeairconditioning.com shows real Cooling (AC Repair, AC Maintenance, AC Replacement, Air Duct
  //   Cleaning, Ductwork, Indoor Air Quality), Heating (Heating Repair, Heating Installation, Insulation), Commercial HVAC, and
  //   a signature Wine Cellar Repair line — but the generated record invented a 6-item AC/heating lineup with Heat Pumps (not on
  //   their site) and omitted ducts, insulation, commercial, and wine cellar. Lineup is pinned HERE to mirror the site EXACTLY.
  //   showAllServices so all eleven render. Provided photos populate the gallery (branded fleet/install shots first); the yellow
  //   swatch (p10) and the tiny 300x300 thumb (p8) are dropped.
  "bumble-bee-air-conditioning": {
    fontKey: "modern",
    showAllServices: true,
    photos: [
      "/biz-photos/bumble-bee-air-conditioning/p1.webp",
      "/biz-photos/bumble-bee-air-conditioning/p9.webp",
      "/biz-photos/bumble-bee-air-conditioning/p2.webp",
      "/biz-photos/bumble-bee-air-conditioning/p5.webp",
      "/biz-photos/bumble-bee-air-conditioning/p4.webp",
      "/biz-photos/bumble-bee-air-conditioning/p6.webp",
      "/biz-photos/bumble-bee-air-conditioning/p7.webp",
      "/biz-photos/bumble-bee-air-conditioning/p3.webp",
    ],
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "When your AC quits in the Arizona heat, our technicians arrive fast, diagnose the real problem on-site, and get your home cooling again — from refrigerant leaks and failed capacitors to airflow and thermostat issues." },
      { name: "AC Maintenance", slug: "ac-maintenance", blurb: "Keep your system running efficiently and catch small problems before they become costly breakdowns. Our preventive tune-ups extend equipment life and keep your home comfortable through the long desert summer." },
      { name: "AC Replacement", slug: "ac-replacement", blurb: "Upgrade to a new, energy-efficient air conditioning system sized right for your home. We handle full replacements with clean, professional work and honest, up-front pricing." },
      { name: "Heating Repair", slug: "heating-repair", blurb: "Stay warm on cool desert nights with dependable furnace and heat-pump repair for every make and model — fast diagnostics and lasting fixes so your heat is ready the moment you need it." },
      { name: "Heating Installation", slug: "heating-installation", blurb: "From furnaces to heat pumps, we install and replace heating systems sized and tuned for Arizona homes — efficient, reliable comfort with professional workmanship and clear pricing." },
      { name: "Air Duct Cleaning", slug: "air-duct-cleaning", blurb: "Remove built-up dust, allergens, and debris from your ductwork for cleaner air and better airflow — healthier, more comfortable air throughout every room in your home." },
      { name: "Indoor Air Quality", slug: "indoor-air-quality", blurb: "Breathe easier with whole-home air solutions — advanced filtration, purification, and humidity control that strip dust, allergens, and pollutants from the air your family breathes." },
      { name: "Ductwork", slug: "ductwork", blurb: "Leaky, undersized, or aging ducts waste energy and leave rooms uneven. We inspect, seal, repair, and replace ductwork so cool air actually reaches every room — efficiently and quietly." },
      { name: "Insulation", slug: "insulation", blurb: "Proper attic and home insulation keeps the desert heat out and your conditioned air in — lowering energy bills and taking strain off your AC all summer long." },
      { name: "Commercial HVAC", slug: "commercial-hvac", blurb: "Keep your business comfortable and running with commercial HVAC repair and replacement — responsive service and reliable systems sized for storefronts, offices, and light-commercial spaces." },
      { name: "Wine Cellar Repair", slug: "wine-cellar-repair", blurb: "Protect your collection with specialized wine-cellar cooling service. We repair and maintain dedicated cellar systems to hold the precise temperature and humidity your wine needs." },
    ],
    generatedCopy: {
      heroH1: "Phoenix Valley AC Repair, Heating & Indoor Air",
      heroSubhead: "Bumble Bee Air Conditioning keeps the East Valley cool — fast, honest AC repair, installation, heating, and air-quality service. We'll buzz right over.",
    },
  },
  // hv0061 Wolfgangs Cooling, Heating & Plumbing (wolfgangscooling.com — Tempe HQ, 2441 W Erie Dr, serving Tempe, Mesa,
  // Chandler, Phoenix, Gilbert, Scottsdale; 4.8★ from 3,200+ reviews). Logo is the bold black "WOLFGANGS" wordmark over a
  // blue "COOLING • HEATING • PLUMBING" line, fronted by a green-and-blue double-checkmark "W" mark and a script tagline
  // ("Doing What it Takes to Get it Right.") → shipped as wch-logo.webp on a white plate; process-assets knocked out the
  // white background to transparent. Black wordmark reads cleanly on Theme 1's white nav pill (no chromeDark). One brand
  // swatch ("Screenshot…png" → Color.png) is the logo's blue → process-assets extracted brandColor #0079c4. Heavy blocky
  // wordmark → fontKey "bold" (Archivo). No hero video on their site (grep for .mp4 = 0); their real homepage hero photo
  // (home-hero-image → p1) drives the hero. No Font Example / Second Color screenshot.
  //   SERVICES were the priority (designer's explicit ask: the new site must list the SAME services as the original). Live
  //   DOM crawl of wolfgangscooling.com shows FOUR real service pillars — Cooling (AC), Heating, Indoor Air Quality, and
  //   Plumbing — but the generated record invented a 6-item AC/heating-only lineup and OMITTED Plumbing entirely (the "P" in
  //   their own name). Lineup is pinned HERE to mirror the site EXACTLY across all four pillars: AC Repair, AC Installation
  //   & Replacement, AC Tune-Up & Maintenance, Heating & Furnace, Heat Pumps, Indoor Air Quality, Plumbing, Water Heaters.
  //   showAllServices so all eight render. The 12 provided images populate the gallery (real hero/lifestyle shots first).
  "wolfgangs-cooling-heating-and-plumbing": {
    fontKey: "bold",
    showAllServices: true,
    // Designer pick: HERO is p4 (imgi_56 heat-pump-troubleshooting-maintenance-guide) — photos[0] drives the hero + every
    // sub-page header. Their real homepage van shot (p1) and the rest of the gallery follow.
    photos: [
      "/biz-photos/wolfgangs-cooling-heating-and-plumbing/p4.webp",
      "/biz-photos/wolfgangs-cooling-heating-and-plumbing/p1.webp",
      "/biz-photos/wolfgangs-cooling-heating-and-plumbing/p2.webp",
      "/biz-photos/wolfgangs-cooling-heating-and-plumbing/p9.webp",
      "/biz-photos/wolfgangs-cooling-heating-and-plumbing/p5.webp",
      "/biz-photos/wolfgangs-cooling-heating-and-plumbing/p6.webp",
      "/biz-photos/wolfgangs-cooling-heating-and-plumbing/p10.webp",
      "/biz-photos/wolfgangs-cooling-heating-and-plumbing/p11.webp",
      "/biz-photos/wolfgangs-cooling-heating-and-plumbing/p3.webp",
      "/biz-photos/wolfgangs-cooling-heating-and-plumbing/p7.webp",
      "/biz-photos/wolfgangs-cooling-heating-and-plumbing/p8.webp",
      "/biz-photos/wolfgangs-cooling-heating-and-plumbing/p12.webp",
    ],
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "When your AC quits in the Arizona heat, our technicians arrive fast, diagnose the real problem on-site, and get your system cooling again — from refrigerant leaks and failed capacitors to airflow and thermostat issues." },
      { name: "AC Installation & Replacement", slug: "ac-installation", blurb: "Upgrade to a new, energy-efficient air conditioning system sized right for your home. We handle full installations and replacements — including ductless mini-splits — with clean, professional work and honest up-front pricing." },
      { name: "AC Tune-Up & Maintenance", slug: "maintenance", blurb: "Keep your system running efficiently and catch small problems before they become costly breakdowns. Our preventive tune-ups extend equipment life and keep your home comfortable through the long desert summer." },
      { name: "Heating & Furnace", slug: "heating", blurb: "Stay warm on cool desert nights with dependable furnace and heating service — repair, maintenance, installation, and replacement for every make and model, so your heat is ready the moment you need it." },
      { name: "Heat Pumps", slug: "heat-pumps", blurb: "Get year-round comfort from a single efficient system. Our team installs, repairs, and services heat pumps that heat and cool your home while keeping energy bills in check." },
      { name: "Indoor Air Quality", slug: "air-quality", blurb: "Breathe easier with whole-home air solutions — air duct cleaning and repair, advanced filtration, and air purification that remove dust, allergens, and pollutants from the air your family breathes." },
      { name: "Plumbing", slug: "plumbing", blurb: "From faucets and fixtures to water lines and leaks, our licensed plumbers handle residential plumbing repairs quickly and cleanly — stopping the problem at the source and protecting your home from water damage." },
      { name: "Water Heaters", slug: "water-heaters", blurb: "No hot water? We install, repair, and replace traditional and tankless water heaters, plus whole-house water filtration — reliable hot water and cleaner water throughout your home." },
    ],
  },
  // hv0060 AZ Home Services Group — AC Repair & Plumbing Services (azhomeservices.group — Tempe HQ serving the Valley). This is
  // the SAME real business as hv0054 (a second QR record; distinct slug, no key collision) on the identical site, so the setup
  // mirrors hv0054's verified build. Logo is the bold geometric "AZHOME SERVICES GROUP" wordmark (dark gray) beside a cyan-blue
  // Arizona-state-shape with a house cut into it — shipped as a transparent webp, so process-assets kept it as-is; cyan +
  // dark-gray reads cleanly on Theme 1's white nav pill (nav stays default/white, no chromeDark). Brand swatch arrived as
  // "Screenshot…png" → renamed Color.png so process-assets extracted brandColor #26a6ed (the logo's blue). Heavy geometric
  // wordmark → fontKey "bold" (Archivo).
  //   SERVICES were the priority (designer's explicit ask: the new site must list the SAME services as the original). Verified
  //   against a live DOM crawl of azhomeservices.group — four real hubs (Air Conditioning, Heating, Plumbing, Duct Cleaning).
  //   extract-services couldn't run (dead Gemini key), so the lineup is pinned HERE to mirror the site EXACTLY: AC Repair, AC
  //   Installation, AC Maintenance, Heating & Furnace Repair, Heating Installation, Plumbing Repair, Drain & Sewer Line Repair,
  //   Air Duct Cleaning. showAllServices so all eight render. The 8 provided photos auto-populate the gallery.
  "az-home-services-group-ac-repair-and-plumbing-services": {
    fontKey: "bold",
    showAllServices: true,
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "When your AC quits in the Arizona heat, our technicians arrive fast, diagnose the problem on-site, and get your system cooling again — from refrigerant leaks and failed capacitors to airflow and thermostat issues." },
      { name: "AC Installation", slug: "ac-installation", blurb: "Upgrade to a new, energy-efficient air conditioning system sized right for your home. We handle full installations and replacements with clean, professional work and honest, up-front pricing." },
      { name: "AC Maintenance", slug: "ac-maintenance", blurb: "Keep your system running efficiently and catch small problems before they become costly breakdowns. Our preventive tune-ups extend equipment life and keep your home comfortable through the long desert summer." },
      { name: "Heating & Furnace Repair", slug: "heating-repair", blurb: "Stay warm on cool desert nights with dependable furnace and heat-pump repair for every make and model — fast diagnostics and lasting fixes so your heat is ready when you need it." },
      { name: "Heating Installation", slug: "heating-installation", blurb: "From furnaces to heat pumps, we install and replace heating systems sized and tuned for Arizona homes — efficient, reliable comfort with professional workmanship and clear pricing." },
      { name: "Plumbing Repair", slug: "plumbing-repair", blurb: "Leaks, fixtures, water heaters, and more — our licensed plumbers handle residential plumbing repairs quickly and cleanly, stopping the problem at the source and protecting your home from water damage." },
      { name: "Drain & Sewer Line Repair", slug: "drain-sewer-repair", blurb: "Slow drains and backed-up sewer lines are no match for our team. We clear stubborn clogs and repair damaged sewer lines to get your home's plumbing flowing freely again." },
      { name: "Air Duct Cleaning", slug: "air-duct-cleaning", blurb: "Remove built-up dust, allergens, and debris from your ductwork for cleaner air and better airflow — healthier, more comfortable air throughout every room in your home." },
    ],
    generatedCopy: {
      heroH1: "AZ Home Services Group — AC, Heating & Plumbing",
      heroSubhead: "Tempe-based, trusted across the Valley for fast, honest AC repair, heating, and plumbing service. One call covers your whole home — installations, repairs, and emergencies.",
    },
  },
  // hv0059 All Season Plumbing And Air (allseasonsplumbingandair.com — Scottsdale HQ, 3010 N 67th Pl, serving the Phoenix
  // Valley: Phoenix, Scottsdale, Chandler, Gilbert, Glendale, Mesa, Tempe, Sun City, Surprise). Logo is a classic navy serif
  // "ALL SEASON" wordmark over an italic "PLUMBING & AIR," fronted by four seasonal icon tiles (green leaf / yellow sun /
  // orange leaves / blue snowflake) → arrived as a transparent .webp (renamed logo.webp); process-assets kept its existing
  // transparency, and the dark wordmark reads cleanly on Theme 1's white nav pill (no chromeDark). The one brand swatch
  // ("Screenshot…png" → Color.png) is the logo's leaf-tile green → process-assets extracted brandColor #75b777. Classic
  // serif wordmark → fontKey "elegant" (Playfair Display) as the closest match. No Font Example / Second Color screenshot.
  //   SERVICES were the priority (designer's explicit ask: the new site must list the SAME services as the original). Despite
  //   "Plumbing" in the name, their live site's Services menu (and every /services/ page) lists ONLY four AC services — the
  //   generated record invented a 6-item lineup with Heating & Furnace, Indoor Air Quality, and Heat Pumps (none on their
  //   site) and omitted AC Filter Replacement. Services are pinned HERE to mirror allseasonsplumbingandair.com EXACTLY —
  //   AC Repair, AC Installation, AC Maintenance, AC Filter Replacement.
  "all-season-plumbing-and-air": {
    fontKey: "elegant",
    // Designer pick: HERO is the branded fleet shot (p2 = imgi_31) — their wrapped truck + van side by side, company name,
    // phone, and the four-season logo in-frame, unmistakably theirs. photos[0] drives the hero + every sub-page header. Rest
    // of the gallery follows in default order (tech portrait, filter/repair/install/maintenance shots, emergency plumber).
    photos: [
      "/biz-photos/all-season-plumbing-and-air/p2.webp",
      "/biz-photos/all-season-plumbing-and-air/p1.webp",
      "/biz-photos/all-season-plumbing-and-air/p3.webp",
      "/biz-photos/all-season-plumbing-and-air/p4.webp",
      "/biz-photos/all-season-plumbing-and-air/p5.webp",
      "/biz-photos/all-season-plumbing-and-air/p6.webp",
      "/biz-photos/all-season-plumbing-and-air/p7.webp",
      "/biz-photos/all-season-plumbing-and-air/p8.webp",
    ],
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "Arizona's extreme heat is unbearable without a dependable AC. When your system falters, our expert technicians arrive fast, diagnose the real problem on-site, and restore cool comfort to your home." },
      { name: "AC Installation", slug: "ac-installation", blurb: "Stay cool, stay relaxed. Our specialists handle flawless installations of new, energy-efficient air conditioning systems sized right for your home — prompt, reliable, and done the right way." },
      { name: "AC Maintenance", slug: "ac-maintenance", blurb: "Avoid costly repairs with regular maintenance. Our seasonal tune-ups keep your system running efficiently, extend its lifespan, and catch small issues before they become summer breakdowns." },
      { name: "AC Filter Replacement", slug: "ac-filter-replacement", blurb: "Filter dust, embrace comfort. Fresh, clean indoor air is essential to your health — our knowledgeable team keeps your filters changed so you breathe easier and your system runs its best." },
    ],
  },
  // hv0058 AC Repair Near Me Of Scottsdale (acrepairnearme.services — "AC Repair Near Me LLC," ROC #337558, Scottsdale HQ
  // serving the Valley; 5★ / 15 reviews; honest-second-opinion positioning). Logo is a light sky-blue AC-condenser-with-fan
  // icon over a heavy condensed charcoal "AC REPAIR / NEAR ME" wordmark on a white plate → process-assets knocked out the
  // white background to transparent; the dark wordmark reads cleanly on Theme 1's white nav pill, so nav stays default/white
  // (no chromeDark). Heavy condensed display wordmark → fontKey "bold" (Archivo) as the closest match. No Font Example
  // screenshot was provided.
  //   COLOR: the one swatch dropped ("Screenshot…png") is a very pale #a4e6fe sky-blue — too washed-out to drive Theme 1's
  //   hero overlay and hover-flip service cards. Their real site uses #2b6cb0 for links/buttons (and the logo icon is that
  //   same medium sky-blue), so brandColor is pinned to #2b6cb0 (functional primary, genuinely theirs) with the pale swatch
  //   kept as brandColor2 #a4e6fe (light accent). Set here in the manual layer rather than asset-overrides because the raw
  //   swatch extraction would be unusable. The swatch landed in process-assets output as p7 — excluded from the gallery below.
  //   Designer pick: HERO is p4 (imgi "hvac-repair") — a wide shot of a blue-shirted tech working on overhead ductwork; the
  //   blue uniform matches the brand and it reads as active real work (hero + every sub-page header use photos[0]). Gallery
  //   then leads with the crane setting a condenser on a tile-roof AZ home (p1 = "AC-install-2"), refrigerant-gauge charging
  //   against a condenser row (p5 = "Hvach-repairman"), a tech servicing a heating manifold (p2 = "heating-maintenance"), and
  //   a smart-thermostat product shot (p6 = "thermostat-installation"). Dropped from the gallery: the snowy finished-condenser
  //   shot (p3 = "HEATING-SYSTEM") — snow reads wrong for Arizona — and the p7 color swatch.
  //   SERVICES were the priority (designer's explicit ask: the new site must list the SAME services as the original). The
  //   generated record invented a standalone "Heat Pumps" / "Indoor Air Quality" lineup and missed their granular menu, so
  //   services are pinned HERE to mirror acrepairnearme.services' 11 /service/ pages EXACTLY — AC Repair, AC Installation,
  //   AC Maintenance, Heating Repair, Heating Installation, Heating Maintenance, HVAC Repair, HVAC Maintenance, Thermostat
  //   Installation, Thermostat Repair, and Duct & Vent Cleaning. showAllServices so all eleven render.
  "ac-repair-near-me-of-scottsdale": {
    fontKey: "bold",
    brandColor: "#2b6cb0",
    brandColor2: "#a4e6fe",
    showAllServices: true,
    photos: [
      "/biz-photos/ac-repair-near-me-of-scottsdale/p4.webp",
      "/biz-photos/ac-repair-near-me-of-scottsdale/p1.webp",
      "/biz-photos/ac-repair-near-me-of-scottsdale/p5.webp",
      "/biz-photos/ac-repair-near-me-of-scottsdale/p2.webp",
      "/biz-photos/ac-repair-near-me-of-scottsdale/p6.webp",
    ],
    services: [
      { name: "AC Repair", slug: "repair-ac", blurb: "When your AC quits in the Arizona heat, our techs diagnose the real problem fast and fix it right — honest answers and up-front pricing, never an unnecessary upsell." },
      { name: "AC Installation", slug: "air-conditioning-installation", blurb: "Expert installation and replacement of new, energy-efficient air conditioning systems sized correctly for your home for dependable, lower-cost cooling." },
      { name: "AC Maintenance", slug: "ac-maintenance", blurb: "Seasonal AC tune-ups that keep your system running efficiently, catch small issues early, and extend the life of your unit before the summer rush." },
      { name: "Heating Repair", slug: "repair-heating-system", blurb: "Fast, reliable repairs for furnaces and heating systems so your home stays warm when the desert nights turn cold." },
      { name: "Heating Installation", slug: "heating-installation", blurb: "Professional installation of efficient heating systems matched to your home, with clean workmanship and clear, honest pricing." },
      { name: "Heating Maintenance", slug: "heating-maintenance", blurb: "Preventative heating tune-ups that keep your furnace safe, efficient, and ready for the cooler months — fewer breakdowns, lower bills." },
      { name: "HVAC Repair", slug: "repair-hvac", blurb: "Whole-system HVAC diagnostics and repair to restore comfort and efficiency, with straightforward recommendations you can trust." },
      { name: "HVAC Maintenance", slug: "hvac-maintenance", blurb: "Comprehensive maintenance plans for your complete heating and cooling system to maximize performance and protect your investment year-round." },
      { name: "Thermostat Installation", slug: "thermostat-installation", blurb: "Smart and programmable thermostat installation and setup that puts precise, energy-saving control of your comfort at your fingertips." },
      { name: "Thermostat Repair", slug: "repair-thermostat", blurb: "Thermostat troubleshooting and repair to fix faulty readings and connection issues so your system heats and cools exactly as it should." },
      { name: "Duct & Vent Cleaning", slug: "clean-ducts-vents", blurb: "Thorough cleaning of your ducts and vents to clear out dust and buildup — improving airflow, efficiency, and the air your family breathes." },
    ],
  },
  // hv0056 Larson Air Conditioning (larsonairaz.com — "Solutions built to last," Scottsdale HQ serving the Phoenix Valley:
  // Scottsdale, Phoenix, Mesa, Gilbert, Chandler, Tempe, Glendale, Peoria, Surprise, Paradise Valley, Cave Creek, Anthem +
  // more; Trane dealer; 4.9★ / 1,800+ reviews). Logo is a bold athletic "LARSON" wordmark in red with a blue star for the
  // O over "AIR CONDITIONING" in blue — reads cleanly on Theme 1's white nav pill, no chromeDark. Brand swatches arrived as
  // two "Screenshot…png" → renamed Color.png (red, primary) + Second Color.png (blue, secondary) so process-assets
  // extracted them → brandColor #9d0213 / brandColor2 #1971b8 (the logo's red + blue). Heavy italic display wordmark →
  // fontKey "bold" (Archivo) as the closest match. No Font Example screenshot was provided.
  //   Designer pick: HERO is the branded-van shot (p4 = imgi_42 "Confident") — wide, with the owner beside the Larson/Trane
  //   wrap showing the company name, phone, and exact brand colors in-frame, unmistakably theirs (hero + every sub-page
  //   header use photos[0]). Gallery then leads with the uniformed tech "Randy" by the van (p3 = imgi_41 "Thorough") for
  //   trust, then the Larson family in red shirts (p5 = imgi_49). The two decorative blue background-pattern plates
  //   (p1/p2 = imgi_33/34) are dropped — they're texture art, not real work.
  //   SERVICES were the priority (designer's explicit ask: the new site must list the SAME services as the original).
  //   The generated record invented Heat Pumps / Heating & Furnace and MISSED their duct, insulation, and commercial lines,
  //   so the lineup is pinned HERE to mirror larsonairaz.com's services menu EXACTLY — Repair, Installation, Maintenance,
  //   Air Quality, Air Duct Installation, Insulation, Commercial Services. showAllServices so all seven render.
  "larson-air-conditioning": {
    fontKey: "bold",
    showAllServices: true,
    photos: [
      "/biz-photos/larson-air-conditioning/p4.webp",
      "/biz-photos/larson-air-conditioning/p3.webp",
      "/biz-photos/larson-air-conditioning/p5.webp",
    ],
    services: [
      { name: "AC & Heating Repair", slug: "ac-repair", blurb: "When your system quits in the Arizona heat, our technicians arrive fast, diagnose the problem on-site, and get your home comfortable again — honest answers and up-front pricing on every repair." },
      { name: "AC & Heating Installation", slug: "ac-installation", blurb: "Upgrade to a new, energy-efficient Trane system sized right for your home. We handle full installations and replacements with clean, professional work and financing options to fit your budget." },
      { name: "Maintenance", slug: "maintenance", blurb: "Keep your AC and heating running efficiently and catch small problems before they become costly breakdowns. Our Cool Club tune-up plans extend equipment life and protect your comfort year-round." },
      { name: "Indoor Air Quality", slug: "air-quality", blurb: "Breathe easier with air quality solutions that cut allergens, dust, and pollutants — for healthier, cleaner, more comfortable air throughout your home." },
      { name: "Air Duct Installation", slug: "air-duct-installation", blurb: "Properly designed and installed ductwork that improves airflow, comfort, and efficiency — sealing leaks and delivering even cooling and heating to every room." },
      { name: "Insulation", slug: "insulation", blurb: "Home insulation that keeps cool air in and the desert heat out — lowering your energy bills and helping your HVAC system work less to keep you comfortable." },
      { name: "Commercial Services", slug: "commercial-services", blurb: "Reliable commercial HVAC installation, repair, and maintenance that keeps your business comfortable and your equipment running — with service plans built around your operation." },
    ],
  },
  // hv0057 Your Scottsdale HVAC (yourscottsdalehvac.com — full-service residential + commercial HVAC, Scottsdale +
  // Phoenix/Tempe/Mesa/Paradise Valley/Fountain Hills, 24-hour service). Logo is a red flame + AZ-state-flag + blue
  // snowflake over a red/gray/blue "HVAC" wordmark on a white plate → process-assets knocked out the white background to
  // transparent; the colored marks read cleanly on Theme 1's white nav pill, so nav stays default/white (no chromeDark).
  // One brand swatch provided ("Screenshot…png" → renamed Color.png) so process-assets extracted brandColor #1d94e3 (the
  // logo's snowflake blue, primary). No Second Color and no Font Example screenshot were dropped → brandColor2 left unset
  // and fontKey left default.
  //   Designer pick: HERO is p7 (imgi_14 "service-request-call") — the wall-mounted ductless mini-split with remote in a
  //   bright room (hero + every sub-page header use photos[0]). Gallery then leads with real work — the wide commercial
  //   AC-condenser row (p4), diagnostics gauge (p1), water-heater repair (p3), tankless service (p2) — and closes on a
  //   comfort lifestyle shot (p6) for trust. The "Schedule service" clipboard CTA frame (p5) is dropped from the gallery.
  //   SERVICES were the priority (designer's explicit ask: the new site must list the SAME services as the original).
  //   The generated record INVENTED a standalone "Heat Pumps" card and MISSED their prominent Commercial HVAC and Water
  //   Heater lines (both have dedicated photos on their real site — chiller/commercial AC and water-heater repair).
  //   extract-services couldn't run (dead Gemini key), so the lineup is pinned HERE to mirror yourscottsdalehvac.com:
  //   AC Repair, AC Installation & Replacement, AC Maintenance & Tune-Ups, Heating & Furnace, Indoor Air Quality,
  //   Commercial HVAC, and Water Heater Repair & Replacement. showAllServices so all seven render.
  "your-scottsdale-hvac": {
    showAllServices: true,
    photos: [
      "/biz-photos/your-scottsdale-hvac/p7.webp",
      "/biz-photos/your-scottsdale-hvac/p4.webp",
      "/biz-photos/your-scottsdale-hvac/p1.webp",
      "/biz-photos/your-scottsdale-hvac/p3.webp",
      "/biz-photos/your-scottsdale-hvac/p2.webp",
      "/biz-photos/your-scottsdale-hvac/p6.webp",
    ],
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "When your AC quits in the Scottsdale heat, our technicians arrive fast, diagnose the problem on-site, and fix it right the first time — from refrigerant leaks and failed capacitors to airflow and thermostat issues. 24-hour service when you need it." },
      { name: "AC Installation & Replacement", slug: "ac-installation", blurb: "Upgrade to a new, energy-efficient cooling system sized right for your home or business. We handle full installations and replacements with clean, professional work and honest, up-front pricing." },
      { name: "AC Maintenance & Tune-Ups", slug: "maintenance", blurb: "Keep your system running efficiently and catch small problems before they become costly breakdowns. Our preventive tune-ups extend equipment life and keep you comfortable through every Arizona summer." },
      { name: "Heating & Furnace", slug: "heating", blurb: "Stay warm on cool desert nights with dependable furnace and heater repair, maintenance, and replacement — fast, thorough service for every make and model." },
      { name: "Indoor Air Quality", slug: "air-quality", blurb: "Breathe easier indoors with air-quality solutions that reduce allergens, dust, and pollutants — for healthier, cleaner, more comfortable air throughout your home." },
      { name: "Commercial HVAC", slug: "commercial-hvac", blurb: "Complete commercial HVAC service and repair — including chiller systems, ice machines, and bar & restaurant equipment — to keep your business cool, comfortable, and running without interruption." },
      { name: "Water Heater Repair & Replacement", slug: "water-heater", blurb: "Fast, reliable water-heater repair and replacement for tank and tankless systems — restoring dependable hot water with clean, professional work and up-front pricing." },
    ],
  },
  // hv0053 Scottsdale AC Pros (scottsdaleacpros.com — "Complete HVAC Solutions For Your Home," Scottsdale + Phoenix Valley,
  // available 24/7, ROC#362677). Logo is a "SCOTTSDALE" (blue) / "AC PROS" (red) wordmark beside a flame-over-snowflake glyph
  // (blue→cyan gradient + red→gold gradient) — shipped as a horizontal SVG, copied as-is to logo.svg; its colored text reads
  // cleanly on Theme 1's white nav pill, so nav stays default/white (no chromeDark). Brand swatches arrived as two
  // "Screenshot…png" → renamed Color.png (blue, primary) + Second Color.png (orange, secondary) so process-assets extracted
  // them → brandColor #015ab0 / brandColor2 #f5920c (matches the logo's blue #0051b6 + the flame's orange exactly). Site font
  // is Outfit (geometric sans, loaded from Google Fonts) → fontKey "modern" (Poppins) as the closest match.
  //   Designer pick: HERO is the branded van shot (p1) — wide, with the company name, phone, and exact brand colors in-frame,
  //   unmistakably theirs (hero + every sub-page header use photos[0]). Gallery reordered to lead with the two authentic
  //   outdoor AC-service shots (tech with multimeter p2, tech with refrigerant gauges p4) before the two in-home consult
  //   frames (p3, p5) — work first, trust second.
  //   SERVICES were the priority: the generated record INVENTED a standalone "Heat Pumps" card and MISSED their "Emergency AC
  //   Repair" line. extract-services couldn't run (dead Gemini key), so services are pinned HERE to mirror scottsdaleacpros.com
  //   EXACTLY — their six real service lines (AC Repair, AC Installation, AC Maintenance, Emergency AC Repair, Heating &
  //   Furnace, Ductwork & Indoor Air Quality). showAllServices so all six render. Copy lightly tuned to their van tagline
  //   ("From installations to repairs, we've got your comfort covered") and their 24/7 availability.
  "scottsdale-ac-pros-ac-repair-and-ac-replacement": {
    fontKey: "modern",
    showAllServices: true,
    photos: [
      "/biz-photos/scottsdale-ac-pros-ac-repair-and-ac-replacement/p1.webp",
      "/biz-photos/scottsdale-ac-pros-ac-repair-and-ac-replacement/p2.webp",
      "/biz-photos/scottsdale-ac-pros-ac-repair-and-ac-replacement/p4.webp",
      "/biz-photos/scottsdale-ac-pros-ac-repair-and-ac-replacement/p3.webp",
      "/biz-photos/scottsdale-ac-pros-ac-repair-and-ac-replacement/p5.webp",
    ],
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "When your AC quits in the Scottsdale heat, our technicians arrive fast, diagnose the problem on-site, and fix it right the first time — from refrigerant leaks and bad capacitors to airflow and thermostat issues." },
      { name: "AC Installation", slug: "ac-installation", blurb: "Upgrade to a new, energy-efficient air conditioning system sized right for your home. We handle full installations and replacements with clean, professional work and honest, up-front pricing." },
      { name: "AC Maintenance", slug: "maintenance", blurb: "Keep your system running efficiently and catch small problems before they become costly breakdowns. Our preventive tune-ups extend the life of your equipment and keep your home comfortable year-round." },
      { name: "Emergency AC Repair", slug: "emergency-ac-repair", blurb: "Available 24/7 when the heat won't wait. Whether it's the middle of the night or the hottest day of the year, we respond quickly to get your AC running and your home cool again." },
      { name: "Heating & Furnace", slug: "heating", blurb: "Stay warm on cool desert nights with reliable furnace and heat-pump repair, installation, and tune-ups — dependable heating service for every make and model." },
      { name: "Ductwork & Indoor Air Quality", slug: "air-quality", blurb: "Improve comfort and airflow with ductwork repair and sealing plus indoor air quality solutions that reduce allergens, dust, and pollutants for healthier air throughout your home." },
    ],
    generatedCopy: {
      heroH1: "Scottsdale AC Pros — Your Comfort, Covered",
      heroSubhead: "From installations to repairs, we've got your comfort covered. Fast, respectful, 5-star HVAC service for Scottsdale homes — available 24/7 when the heat won't wait.",
    },
  },
  // hv0055 Scottsdale Air Heating & Cooling (scottsdaleair.com — "The White Glove Techs," serving Scottsdale + the Phoenix
  // Valley since 1947). A full-service HVAC + plumbing shop — their real site spans five hubs: Cooling, Heating, Plumbing,
  // Drains, and Water Treatment (plus Insulation / Indoor Air Quality under HVAC). Logo is a bold italic "SCOTTSDALE" (navy) /
  // "AIR & PLUMBING" (red) wordmark — its colored text reads cleanly on Theme 1's white nav pill, so nav stays default/white
  // (no chromeDark). Brand swatches arrived as two "Screenshot…png" → copied to Color.png (navy, primary) + Second Color.png
  // (red, secondary) so process-assets extracted them → brandColor #053b7b / brandColor2 #d30117 (the logo's navy + red).
  // Matched the heavy italic wordmark with fontKey "bold" (Archivo).
  //   Designer pick: HERO is the branded van shot (p2) — wide, with the company name "SCOTTSDALE AIR & PLUMBING," phone,
  //   "Since 1947," and the exact brand colors in-frame, unmistakably theirs (hero + every sub-page header use photos[0]).
  //   Gallery leads with real work — AC condenser diagnostics (p3) and under-sink plumbing (p4) — then the smiling uniformed
  //   tech (p1) for trust. The two faded background plates (p5 dolly, p6 luxury home) and the two color swatches (p7/p8) are
  //   dropped from the gallery.
  //   SERVICES were the priority (designer's explicit ask: match the original site EXACTLY). The generated record was
  //   HVAC-only and MISSED their entire plumbing, drain, and water-treatment business. Pinned HERE to mirror scottsdaleair.com:
  //   six hub cards covering their full real range — Cooling, Heating, Plumbing, Drains, Water Treatment, Indoor Air Quality —
  //   without inventing or dropping anything. showAllServices so all six render. Copy tuned to their "White Glove" / Since-1947
  //   positioning (clean uniforms, shoe covers, the price quoted is the price you pay).
  "scottsdale-air-heating-and-cooling-scottsdale": {
    fontKey: "bold",
    showAllServices: true,
    photos: [
      "/biz-photos/scottsdale-air-heating-and-cooling-scottsdale/p2.webp",
      "/biz-photos/scottsdale-air-heating-and-cooling-scottsdale/p3.webp",
      "/biz-photos/scottsdale-air-heating-and-cooling-scottsdale/p4.webp",
      "/biz-photos/scottsdale-air-heating-and-cooling-scottsdale/p1.webp",
    ],
    services: [
      { name: "AC Repair & Cooling", slug: "ac-repair", blurb: "Fast, expert AC repair, maintenance tune-ups, and full system replacement — plus ductwork service — to keep your home cool through every Scottsdale summer. Honest diagnostics and up-front pricing on every visit." },
      { name: "Heating & Furnace", slug: "heating", blurb: "Furnace repair, maintenance, and replacement along with energy-efficient heat pumps. Our certified technicians keep your home warm and your system running reliably on cool desert nights." },
      { name: "Plumbing", slug: "plumbing", blurb: "Complete plumbing solutions — leak detection, pipe repair and repiping, slab-leak repair, gas lines, and water heater service — with fast emergency response and the same up-front, no-surprises pricing." },
      { name: "Drain & Sewer", slug: "drain-sewer", blurb: "Drain cleaning, clog removal, and sewer line service backed by camera video inspection and hydro-jetting to clear the toughest blockages and get your plumbing flowing freely again." },
      { name: "Water Treatment", slug: "water-treatment", blurb: "Water softeners, whole-home filtration, and reverse-osmosis drinking systems — with professional water testing — for cleaner, better-tasting water and protection from Arizona's hard water." },
      { name: "Indoor Air Quality", slug: "air-quality", blurb: "Breathe easier with indoor air quality solutions and attic insulation that cut allergens, dust, and energy loss — for healthier, more comfortable, more efficient air throughout your home." },
    ],
    generatedCopy: {
      heroH1: "Scottsdale's White-Glove HVAC & Plumbing Since 1947",
      heroSubhead: "Trusted heating, cooling, and plumbing across Scottsdale and the Phoenix Valley for over 75 years. Clean uniforms, shoe covers, spotless workspaces — and the price we quote is the price you pay.",
    },
  },
  // hv0054 AZ Home Services Group (azhomeservices.group — "AC Repair & Plumbing Services," Tempe HQ serving the Valley:
  // Scottsdale, Tempe, Mesa, Chandler, Peoria, Sun City, Queen Creek, Fountain Hills). A combined HVAC + plumbing shop —
  // four real hubs on their site: Air Conditioning, Heating, Plumbing, and Duct Cleaning. Logo is a bold geometric
  // "AZHOME SERVICES GROUP" wordmark (dark gray) beside a cyan-blue Arizona-state-shape with a house cut into it — shipped as
  // a transparent webp, so process-assets kept it as-is; the cyan + dark-gray reads cleanly on Theme 1's white nav pill, so
  // nav stays default/white (no chromeDark). Brand swatch arrived as "Screenshot…png" → renamed Color.png so process-assets
  // extracted it → brandColor #2cdbf7 (the logo's cyan-blue). No web-font on the site; matched the heavy geometric wordmark
  // with fontKey "bold" (Archivo).
  //   SERVICES were the priority (designer's explicit ask: match the original site EXACTLY). extract-services couldn't run
  //   (dead Gemini key), so their real lineup is pinned HERE to mirror azhomeservices.group's four hubs — AC Repair, AC
  //   Installation, AC Maintenance, Heating & Furnace Repair, Heating Installation, Plumbing Repair, Drain & Sewer Line
  //   Repair, Air Duct Cleaning. showAllServices so all eight render. The six provided photos map 1:1 to these lines (AC
  //   install, duct cleaning, furnace repair, heating install, leaky pipe, sewer line repair) → hero leads with p1 (AC
  //   installation), fitting their AC-Repair-first name.
  "az-home-services-group-ac-repair-and-plumbing-services-of-sc": {
    fontKey: "bold",
    showAllServices: true,
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "When your AC quits in the Arizona heat, our technicians arrive fast, diagnose the problem on-site, and get your system cooling again — from refrigerant leaks and failed capacitors to airflow and thermostat issues." },
      { name: "AC Installation", slug: "ac-installation", blurb: "Upgrade to a new, energy-efficient air conditioning system sized right for your home. We handle full installations and replacements with clean, professional work and honest, up-front pricing." },
      { name: "AC Maintenance", slug: "ac-maintenance", blurb: "Keep your system running efficiently and catch small problems before they become costly breakdowns. Our preventive tune-ups extend equipment life and keep your home comfortable through the long desert summer." },
      { name: "Heating & Furnace Repair", slug: "heating-repair", blurb: "Stay warm on cool desert nights with dependable furnace and heat-pump repair for every make and model — fast diagnostics and lasting fixes so your heat is ready when you need it." },
      { name: "Heating Installation", slug: "heating-installation", blurb: "From furnaces to heat pumps, we install and replace heating systems sized and tuned for Arizona homes — efficient, reliable comfort with professional workmanship and clear pricing." },
      { name: "Plumbing Repair", slug: "plumbing-repair", blurb: "Leaks, fixtures, water heaters, and more — our licensed plumbers handle residential plumbing repairs quickly and cleanly, stopping the problem at the source and protecting your home from water damage." },
      { name: "Drain & Sewer Line Repair", slug: "drain-sewer-repair", blurb: "Slow drains and backed-up sewer lines are no match for our team. We clear stubborn clogs and repair damaged sewer lines to get your home's plumbing flowing freely again." },
      { name: "Air Duct Cleaning", slug: "air-duct-cleaning", blurb: "Remove built-up dust, allergens, and debris from your ductwork for cleaner air and better airflow — healthier, more comfortable air throughout every room in your home." },
    ],
    generatedCopy: {
      heroH1: "AZ Home Services Group — AC, Heating & Plumbing",
      heroSubhead: "Tempe-based, trusted across the Valley for fast, honest AC repair, heating, and plumbing service. One call covers your whole home — installations, repairs, and emergencies.",
    },
  },
  // hv0051 Maricopa Air Conditioning and Heating (maricopaair.com — "Maricopa Air," a single-page Webflow site; HQ at 3011 N
  // 73rd St, Scottsdale but they brand Valley-wide as "Phoenix" / "Maricopa Valley"). Their whole positioning is COMMERCIAL-
  // FIRST: "Most HVAC companies serve your home. We built our reputation keeping commercial spaces — restaurants, breweries,
  // and mission-critical facilities — running without fail. Now we bring that same precision to your living room." ~50 years in
  // business; they run the refrigeration at OHSO Brewery. Logo is a navy "MARICOPA AIR" wordmark with a crown glyph — shipped
  // on a white plate, so process-assets knocked out the white → transparent navy logo.webp that reads cleanly on Theme 1's
  // white nav pill (nav left default/white). Brand swatches arrived as two "Screenshot…png" → renamed Color.png (navy, primary)
  // + Second Color.png (red, secondary) so process-assets extracted them → brandColor #111559 / brandColor2 #ff1a09 in
  // asset-overrides.json (matches the navy+red logo and the navy-uniform/red-crown crew exactly). Site font is Montserrat
  // (geometric sans) → fontKey "modern" (Poppins) as the closest match.
  //   Designer pick: HERO is the wide full-crew shot in front of the branded "MARICOPA AIR HVAC & REFRIGERATION — Maricopa
  //   Valley HQ" building (p6) — 2.1:1, shows the company name + exact brand colors in-frame, unmistakably theirs. Gallery is
  //   curated to their strongest authentic, on-brand frames: commercial rooftop units (p3), a tech servicing a commercial RTU
  //   (p1), a tech on a ladder servicing a walk-in cooler (p4 — their commercial-refrigeration differentiator), the branded
  //   residential-comfort shot with the red crown on the uniform (p5), and a smart-thermostat close-up (p2).
  //   SERVICES were the priority: the generated record listed a generic residential lineup (AC Repair, Heating & Furnace,
  //   Tune-Ups, Install, Indoor Air Quality, Heat Pumps) that INVENTED "Indoor Air Quality" + standalone "Heat Pumps" and
  //   MISSED their two signature commercial lines entirely. extract-services couldn't run (dead Gemini key), so services are
  //   pinned HERE to mirror maricopaair.com EXACTLY — their four real service cards (AC Repair & Emergency, HVAC Maintenance &
  //   Tune-Ups, AC & Furnace Installation, Commercial Refrigeration) plus their Commercial HVAC line. showAllServices so all
  //   five render. Copy rewritten to their commercial-first voice (built for it; 50 years; OHSO Brewery; same-day emergency).
  "maricopa-air-conditioning-and-heating": {
    fontKey: "modern",
    showAllServices: true,
    photos: [
      "/biz-photos/maricopa-air-conditioning-and-heating/p6.webp",
      "/biz-photos/maricopa-air-conditioning-and-heating/p3.webp",
      "/biz-photos/maricopa-air-conditioning-and-heating/p1.webp",
      "/biz-photos/maricopa-air-conditioning-and-heating/p4.webp",
      "/biz-photos/maricopa-air-conditioning-and-heating/p5.webp",
      "/biz-photos/maricopa-air-conditioning-and-heating/p2.webp",
    ],
    services: [
      { name: "AC Repair & Emergency Service", slug: "ac-repair", blurb: "When your AC stops in the Phoenix heat, you need it fixed now — not next week. Our technicians arrive same-day for emergency repairs and handle everything from refrigerant leaks and compressor failures to thermostat and airflow problems." },
      { name: "HVAC Maintenance & Tune-Ups", slug: "maintenance", blurb: "Keep your system running at peak efficiency with seasonal tune-ups and preventive maintenance. Regular service catches small problems before they become costly breakdowns — and keeps your home comfortable year-round." },
      { name: "AC & Furnace Installation", slug: "ac-installation", blurb: "We install and replace AC units, furnaces, heat pumps, and ductless mini splits for homes across Phoenix, Scottsdale, Chandler, Mesa, Tempe, and Gilbert — sized right and installed to last by a crew that's done it for 50 years." },
      { name: "Commercial HVAC", slug: "commercial-hvac", blurb: "When your business depends on climate control, downtime isn't an option. From rooftop-unit maintenance and tenant-improvement buildouts to kitchen-exhaust repair and HVAC commissioning, our commercial team keeps Phoenix offices, restaurants, retail, and industrial spaces running." },
      { name: "Commercial Refrigeration", slug: "commercial-refrigeration", blurb: "A broken walk-in can mean thousands in lost product. We're the team behind the refrigeration at OHSO Brewery — providing 24/7 emergency repair, scheduled maintenance, and new installs for walk-in coolers, freezers, ice machines, and wine-cellar cooling." },
    ],
    generatedCopy: {
      heroH1: "Phoenix HVAC & Refrigeration — Built For It",
      heroSubhead: "The crew that keeps Phoenix's restaurants, breweries, and mission-critical spaces running now brings that same precision to your home. Straightforward pricing. No surprises.",
      aboutHeading: "50 Years Keeping the Valley Cool",
      aboutBody: [
        "Most HVAC companies serve your home. Maricopa Air built its reputation keeping commercial spaces — restaurants, breweries, and mission-critical facilities — running without fail, season after season. Now we bring that same commercial-grade precision to your living room.",
        "For 50 years we've been the team Phoenix businesses call when downtime isn't an option, from rooftop units and kitchen exhaust to the walk-in coolers behind local institutions like OHSO Brewery. That depth of experience shows up on every residential job too — fast diagnostics, honest pricing, and work done right the first time.",
        "From a same-day AC repair in Scottsdale to a full system installation in Chandler or commercial refrigeration in Phoenix, we serve homes and businesses across the Maricopa Valley with the same standard — just a different address.",
      ],
    },
  },
  // hv0050 AC by J (acbyj.com — family-owned since 1983, Scottsdale + 25 Phoenix Valley cities; "The Valley's Top Plumbing,
  // Heating & Air Conditioning Specialists, Now Offering Electrical Services"; recently joined Any Hour Services). Logo is a
  // 3D gold "AC by J" wordmark on a dark-maroon diamond crest with a ribbon reading "PLUMBING · ELECTRICAL · HEATING & AIR
  // CONDITIONING" — it ships as a real cut-out PNG (alpha bg), so process-assets kept it as-is → logo.webp. Brand swatches
  // arrived as two "Screenshot…png" files → renamed Color.png (deep maroon, primary) + Second Color.png (gold, secondary) so
  // process-assets extracted them → brandColor #831517 / brandColor2 #ffcf01 in asset-overrides.json — exactly their crest
  // colors (maroon shirts + gold-wrapped vans in the team photos confirm it). NAV stays WHITE (default): the maroon+gold
  // diamond logo reads cleanly on Theme 1's white pill, so navBg / chromeDark are left unset. No Font Example → fontKey
  // "bold" (Archivo) to echo the heavy chunky display wordmark.
  //   Designer pick: lead with the full-crew shot in front of their gold-wrapped "AC by J" van (imgi_14 team_2024 → p3) as the
  //   hero — it's wide, unmistakably real, and shows the brand colors head-on (hero + every sub-page header use photos[0]).
  //   The gallery is curated down to the five strongest authentic, on-brand frames (team/van, furnace-repair banner, tech +
  //   Daikin + truck, tech servicing AC, the owners by the van); the tiny duplicate owner thumbnail and the redundant
  //   portrait mobile page-headers were dropped so nothing low-res lands in the gallery.
  //   SERVICES were the priority here: the generated record listed HVAC ONLY (AC, heating, maintenance, install, IAQ, heat
  //   pumps) and MISSED plumbing + electrical entirely — wrong for a company whose logo literally reads "PLUMBING · ELECTRICAL
  //   · HEATING & AIR CONDITIONING." extract-services couldn't run (no website in the record + dead Gemini key), so services
  //   are pinned HERE to mirror acbyj.com EXACTLY: their four real trade pillars (Cooling, Heating, Plumbing, Electrical) plus
  //   Indoor Air Quality and their advertised Comfort Club maintenance plan — six balanced cards that fold in their full
  //   sub-service breadth (water heaters, drains, sewer/water/gas lines, panel upgrades, EV charging, generators, surge
  //   protection, duct cleaning/sealing, purifiers, smart thermostats) without inventing or dropping anything. showAllServices
  //   so all six render. Copy rewritten to their voice (full-service home comfort since 1983, family-owned, Any Hour Services).
  "ac-by-j": {
    fontKey: "bold",
    showAllServices: true,
    photos: [
      "/biz-photos/ac-by-j/p3.webp",
      "/biz-photos/ac-by-j/p7.webp",
      "/biz-photos/ac-by-j/p1.webp",
      "/biz-photos/ac-by-j/p5.webp",
      "/biz-photos/ac-by-j/p6.webp",
    ],
    services: [
      { name: "Air Conditioning", slug: "ac-repair", blurb: "AC repair, installation, and maintenance for every make and model — our technicians keep your Scottsdale home cool through the hottest Arizona summers, with fast diagnostics and high-efficiency replacements." },
      { name: "Heating & Furnace", slug: "heating", blurb: "Furnace and heat-pump repair, installation, and tune-ups that keep your home warm on cool desert nights — dependable heating service from a team that's served the Valley since 1983." },
      { name: "Plumbing", slug: "plumbing", blurb: "Full-service plumbing — repairs, water heaters and tankless systems, drain cleaning, sewer, water and gas lines, leak detection, fixtures, and 24/7 emergency service throughout the Phoenix Valley." },
      { name: "Electrical", slug: "electrical", blurb: "Licensed electrical service — panel upgrades, EV charger installation, whole-house surge protection, generators, and emergency repairs to keep your home safe, powered, and up to code." },
      { name: "Indoor Air Quality", slug: "air-quality", blurb: "Breathe easier with air purifiers and UV lights, duct cleaning and sealing, humidifiers, smart thermostats, and filtration that clears allergens and pollutants from the air your family breathes." },
      { name: "Comfort Club Maintenance", slug: "maintenance", blurb: "Join our Comfort Club for priority scheduling and seasonal tune-ups across your AC, heating, and plumbing — preventing surprise breakdowns and extending the life of every system in your home." },
    ],
    generatedCopy: {
      heroH1: "AC, Plumbing & Electrical Done Right — Since 1983",
      heroSubhead: "Family-owned and trusted across Scottsdale and the Phoenix Valley for AC, heating, plumbing, and electrical service. Now part of Any Hour Services.",
      aboutHeading: "The Valley's Full-Service Home Comfort Team",
      aboutBody: [
        "AC by J has kept Phoenix Valley homes comfortable since 1983. What started as a family-owned air conditioning company has grown into a true full-service team — AC, heating, plumbing, and now electrical — all under one roof, so you have one trusted name to call no matter what your home needs.",
        "Our licensed, background-checked technicians show up on time, explain exactly what's happening in plain language, and get the job done right the first time. From a summer AC breakdown to a water heater, a panel upgrade, or a clogged drain, we treat your home like it's our own.",
        "Now joined with Any Hour Services, we bring even deeper resources and round-the-clock availability to the Scottsdale, Phoenix, Chandler, Gilbert, Tempe, and Mesa communities we've proudly served for over 40 years.",
      ],
      serviceAreaBlurb: "Proudly serving Scottsdale, Phoenix, Chandler, Gilbert, Tempe, Mesa, and 25+ cities across the greater Phoenix Valley.",
      ctaHeadline: "One Trusted Team for AC, Plumbing & Electrical",
      ctaSubhead: "Whatever your home needs, AC by J has you covered — family-owned since 1983 and available any hour. Schedule your service today.",
      metaTitle: "AC by J | AC, Heating, Plumbing & Electrical in Scottsdale & Phoenix Valley",
      metaDescription: "Family-owned since 1983, AC by J provides AC, heating, plumbing, and electrical service across Scottsdale and the greater Phoenix Valley. Licensed, trusted, and available any hour.",
    },
  },
  // hv0052 Alaskan Air Conditioning & Heating (alaskanac.com — Scottsdale/Phoenix HVAC, "Keeping you cool since 1972," polar-bear
  // brand, 345+ five-star reviews). Logo is the blue "ALASKAN / AIR CONDITIONING & HEATING" badge — it ships on a transparent bg,
  // so process-assets kept it as-is → logo.webp. Brand swatches arrived as two "Screenshot…png" files → renamed Color.png (sky
  // blue, primary) + Second Color.png (orange, secondary) so process-assets extracted them → brandColor #03a1ec / brandColor2
  // #ff8e0a in asset-overrides.json — their blue is the dominant brand color (logo + truck wraps + polar-bear mascot are all
  // blue; orange is the warm accent). NAV stays WHITE (default): the blue badge reads cleanly on Theme 1's white pill.
  //   Designer note: real, on-brand work photos. process-assets emitted six (p1–p6); the gallery is curated down to the FIVE
  //   authentic Alaskan-branded frames — lead hero is the blue Alaskan van with the three-man crew (p4), then two techs carrying
  //   a condenser past the polar-bear truck (p3), the lone tech by the wrapped polar-bear truck (p6), a fresh condenser install
  //   beside the Alaskan trailer (p5), and a clean rooftop condenser (p2). The one generic stock furnace-tech frame (p1) was
  //   dropped so nothing un-branded lands in the gallery. A near-duplicate of p3 was sidelined in the inbox before processing.
  //   SERVICES pinned to mirror alaskanac.com's real nav pillars — the generated record was close but stacked four AC cards and
  //   MISSED Ductwork / Air Ducts entirely (a top-level section on their site: install, cleaning, sealing & repair). Re-balanced
  //   to their four real paths — Cooling (split into AC Repair, AC Installation, AC Maintenance), Heating & Furnace (repair,
  //   replacement, furnace maintenance, gas packs, heat pumps), Ductwork, and Indoor Air Quality (purifiers, UV, filters,
  //   humidity control) — six cards that cover the site's full breadth without inventing anything. showAllServices so all render.
  //   Copy rewritten to their voice (family-owned since 1972, polar-bear "keep you cool" promise); the generated heroSubhead name-
  //   dropped a random tech ("Elijah") so it was rewritten.
  "alaskan-air-conditioning-and-heating": {
    showAllServices: true,
    photos: [
      "/biz-photos/alaskan-air-conditioning-and-heating/p4.webp",
      "/biz-photos/alaskan-air-conditioning-and-heating/p3.webp",
      "/biz-photos/alaskan-air-conditioning-and-heating/p6.webp",
      "/biz-photos/alaskan-air-conditioning-and-heating/p5.webp",
      "/biz-photos/alaskan-air-conditioning-and-heating/p2.webp",
    ],
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "When the desert heat is relentless and your AC quits, our technicians arrive fast, diagnose the real problem, and get cool air flowing again — repairs done right the first time on every make and model." },
      { name: "AC Installation & Replacement", slug: "ac-installation", blurb: "Ready for a new system? We size and install high-efficiency air conditioners built for Arizona summers, with honest recommendations and financing options that keep your Scottsdale home cool for years." },
      { name: "AC Maintenance", slug: "maintenance", blurb: "Seasonal tune-ups that catch small issues before they become breakdowns — our maintenance keeps your system running efficiently, lowers your energy bills, and extends the life of your equipment." },
      { name: "Heating & Furnace", slug: "heating", blurb: "From furnace repair and replacement to heat pumps and gas-pack systems, we keep your home warm on chilly desert nights with dependable heating service and seasonal furnace maintenance." },
      { name: "Ductwork & Air Ducts", slug: "ductwork", blurb: "New duct installation, professional duct cleaning, and sealing & repair that stops the leaks wasting your conditioned air — so every room gets the comfortable, even airflow it should." },
      { name: "Indoor Air Quality", slug: "air-quality", blurb: "Breathe easier with air purifiers, UV air cleaners, whole-house filters, humidifiers and dehumidifiers — clearing allergens, dust, and pollutants from the air your family breathes every day." },
    ],
    generatedCopy: {
      heroH1: "Scottsdale's Trusted AC & Heating — Since 1972",
      heroSubhead: "Keeping Phoenix Valley homes cool since 1972. With 345+ five-star reviews, Alaskan Air Conditioning & Heating delivers honest, expert HVAC service Scottsdale families count on.",
      ctaHeadline: "Keeping You Cool Since 1972",
      ctaSubhead: "From AC repairs to new installs, heating, ductwork, and air quality — schedule your service with the team Scottsdale has trusted for over 50 years.",
    },
  },
  // hv0049 Arizona State HVAC (arizonastatehvac.com — licensed residential HVAC serving Glendale & the greater Maricopa County
  // valley, from Sun City to Apache Junction; honest pricing + flexible financing). Logo is a navy circular badge — "ARIZONA
  // STATE HVAC" wordmark wrapped around the Arizona-flag sunburst (red/gold rays) with a gold star; the badge ships with real
  // transparency (the source .avif carries an alpha channel) so process-assets kept it as-is → logo.webp. Brand swatches
  // arrived as two "Screenshot…png" files → renamed Color.png (navy, primary) + Second Color.png (red, secondary) so
  // process-assets extracted them → brandColor #042a6f / brandColor2 #be0b2c in asset-overrides.json. Navy is genuinely their
  // dominant brand color (the wrapped van + badge are navy; red is the AZ-flag accent), so navy drives the accent/CTA and the
  // red secondary tints the soft sections. NAV stays WHITE (default): the navy badge reads cleanly on Theme 1's white pill, so
  // navBg / chromeDark are left unset.
  //   Designer note: their live site has only ONE image — their navy wrapped service van. process-assets wired it as the single
  //   photo (p1.webp), which REPLACES the stale GMB photo wholesale, so it becomes the hero (photos[0]). Keeping the array at
  //   length 1 leaves the page structurally identical (the gallery + areas grid only render at ≥2 photos, so they stay hidden) —
  //   exactly "use it for the hero, leave everything else the same." Colors/logo/photo live in asset-overrides.json; only
  //   services + copy are pinned here.
  //   Services pinned to mirror arizonastatehvac.com EXACTLY — the generated record padded the list with Heating & Furnace,
  //   Indoor Air Quality & Heat Pumps the site does NOT advertise. Their real offering is three clear paths: a $89 AC tune-up /
  //   maintenance, a $109 diagnostic / troubleshooting, and a free estimate on a new system / replacement. showAllServices so
  //   all three render. Copy rewritten to the site's voice ("Uncomfortable Home? High Energy Bills? We Fix Both", honest
  //   pricing, flexible financing, licensed & insured technicians, no surprises).
  "arizona-state-hvac": {
    showAllServices: true,
    services: [
      { name: "AC Tune-Ups & HVAC Maintenance", slug: "maintenance", blurb: "Routine maintenance catches small issues early, improves airflow, supports better efficiency, and reduces the chance of a breakdown during peak Arizona summer heat. Our $89 tune-up keeps your system running its best." },
      { name: "HVAC Diagnostics & AC Troubleshooting", slug: "diagnostics", blurb: "Warm air, weak airflow, high energy bills, unusual noises, short cycling, or uneven cooling? A proper diagnostic pinpoints what's actually causing the problem before you assume a full replacement is necessary." },
      { name: "New System Installation & Replacement", slug: "installation", blurb: "When your system is older, breaking down repeatedly, or too expensive to keep repairing, our free estimate helps you compare realistic replacement options — with clear pricing, equipment guidance, available rebates, and financing." },
    ],
    generatedCopy: {
      heroH1: "Uncomfortable Home? High Energy Bills? We Fix Both.",
      heroSubhead: "Licensed HVAC professionals serving Glendale and the greater Maricopa County area with honest pricing and flexible financing.",
      aboutHeading: "Honest HVAC Service You Can Count On",
      aboutBody: [
        "Arizona State HVAC keeps Maricopa County homes comfortable with licensed, insured, and trained technicians who show up on time and explain exactly what your system needs — no surprises, no pressure.",
        "Our process is simple and built around the right next step: a technician inspects your system, explains what's happening, and helps you understand the most sensible option. If a repair or replacement makes sense, we review your choices, available rebates, and financing that keeps it affordable.",
        "From $89 tune-ups to free estimates on new high-efficiency systems, you'll know exactly what you'll pay before any work begins — professional service you can count on, trusted by local homeowners.",
      ],
      serviceAreaBlurb: "Proudly serving homeowners across Maricopa County — from Sun City to Apache Junction — with honest, reliable HVAC service.",
      ctaHeadline: "Ready to Fix Your Comfort and Your Energy Bills?",
      ctaSubhead: "Book a $89 tune-up, a diagnostic, or a free replacement estimate — whatever your system needs. Honest guidance, clear pricing, and flexible financing.",
      metaTitle: "Arizona State HVAC | AC Tune-Ups, Repair & New Systems in Maricopa County",
      metaDescription: "Licensed Arizona State HVAC serves Glendale and Maricopa County with AC tune-ups, diagnostics, and new system installs. Honest pricing, free estimates, and flexible financing.",
    },
  },
  // hv0048 Air Conditioning of Arizona (acofaz.net — NOT acofaz.com, which 301s to an unrelated animal rescue; residential &
  // commercial HVAC across the AZ valley). Logo is a vector wordmark — twin red mountain/AC arrow marks flanking a navy
  // "AC OF ARIZONA INC" block. Exact brand hex was read straight from the SVG fills (red .st0 #EB1C24, navy .st1 #043672) and
  // pinned HERE, because the swatch dominant-hex drifted (process-assets got #eb1c23 / #104079 — the navy swatch was a lighter
  // UI navy than the true logo navy). The two "Screenshot…png" swatches were renamed Color.png (red, primary) + Second Color.png
  // (navy, secondary) so process-assets excluded them from the gallery; logo.svg + 8 real photos (home-slide hero, tune-up &
  // repair service shots, duct/install work) wired via asset-overrides.json. p1 (imgi_14 home_slide_1, 1920x1080) is already
  // the hero, so default photo order stands. No Font Example → fontKey "bold" (Archivo) to echo the heavy condensed wordmark.
  //   NAV stays WHITE (designer note): the transparent navy+red logo reads cleanly on Theme 1's default white pill, so navBg /
  //   chromeDark are intentionally left unset (white is the default — a brand-colored pill would force white text and bury the
  //   navy logo). Services pinned to mirror acofaz.net EXACTLY — the generated record guessed Heat Pumps / generic IAQ they do
  //   NOT advertise. Their real offering (residential & commercial repair/tune-ups, Comfort Protection maintenance agreements,
  //   equipment replacement, residential + commercial installation, insulation, in-duct air purifier, duct sealing/Aeroseal,
  //   air-duct cleaning & video inspection) is consolidated into 6 balanced cards covering all of it — nothing invented or
  //   dropped. showAllServices so all 6 render.
  "air-conditioning-of-arizona": {
    fontKey: "bold",
    brandColor: "#eb1c24",
    brandColor2: "#043672",
    showAllServices: true,
    services: [
      { name: "AC & Heating Repair", slug: "ac-heating-repair", blurb: "When your system quits in the Arizona heat — or can't keep up on a cold desert night — our technicians diagnose and repair residential and commercial air conditioning and heating equipment of every make, fast." },
      { name: "Maintenance & Tune-Ups", slug: "maintenance", blurb: "Seasonal tune-ups and our Comfort Protection maintenance agreements keep your system running efficiently, head off surprise breakdowns, and extend the life of your equipment year-round." },
      { name: "Installation & Replacement", slug: "installation", blurb: "From a free quote on equipment replacement to a brand-new residential or commercial install, we right-size and install high-efficiency systems built for Arizona's climate." },
      { name: "Air Duct Cleaning & Aeroseal", slug: "duct-cleaning", blurb: "Professional air duct cleaning with video inspection plus Aeroseal duct sealing clears built-up dust, stops costly leaks, and restores balanced airflow throughout your home or building." },
      { name: "Indoor Air Purification", slug: "air-purifier", blurb: "Breathe easier with in-duct air purifiers that neutralize pollutants, allergens, and odors before they ever reach the rooms where your family lives and works." },
      { name: "Insulation", slug: "insulation", blurb: "Add or upgrade insulation to lock in conditioned air, ease the load on your HVAC system, and lower your energy bills through the hottest Arizona summers." },
    ],
  },
  // hv0046 Sun Valley Air Conditioning & Heating (sunvalleyac.com — brands as "Sun Valley Air Conditioning & Plumbing";
  // Gilbert, AZ; (480) 565-7408; veteran-owned, 20+ yrs; 24/7 service, 1-yr parts/labor + 10-yr system warranty). Logo is a
  // retro arched badge — a winking cartoon sun throwing a thumbs-up over a teal sky, with a white-on-navy script "Sun Valley"
  // wordmark and a heavy uppercase "AIR CONDITIONING & HEATING" block beneath. Brand colors arrived as three "Screenshot…png"
  // swatches; the navy (primary) was renamed Color.png and the gold (secondary) Second Color.png so process-assets extracted
  // them → brandColor #051934 / brandColor2 #ffc83e in asset-overrides.json. The third (teal) swatch was moved to unused/ so
  // it wouldn't land in the gallery. Logo + 6 real HVAC photos (rooftop condenser banks, a Ruud package unit, a mini-split
  // filter service, a furnace repair, residential units) wired via asset-overrides.json. No Font Example screenshot → fontKey
  // "bold" (Archivo) to echo the heavy uppercase wordmark (the script lives in the logo image). Designer pick: lead with the
  // home-hero shot of three white rooftop AC units against blue sky (imgi_25 → p4) as the hero, so the photos array is pinned
  // here with p4 first (hero + sub-page headers use photos[0]); the rest follow in order. No hero video on their site →
  // default hero media. extract-services couldn't run (Gemini key invalid), and the generated record padded the card list
  // with Indoor Air Quality & Heat Pumps that sunvalleyac.com does NOT advertise. Services are pinned HERE to mirror their
  // live site EXACTLY — two categories (Air Conditioning + Heating), each covering installation, maintenance, repair &
  // replacement → six balanced cards. showAllServices so all 6 render.
  "sun-valley-air-conditioning-and-heating": {
    fontKey: "bold",
    showAllServices: true,
    photos: [
      "/biz-photos/sun-valley-air-conditioning-and-heating/p4.webp",
      "/biz-photos/sun-valley-air-conditioning-and-heating/p1.webp",
      "/biz-photos/sun-valley-air-conditioning-and-heating/p2.webp",
      "/biz-photos/sun-valley-air-conditioning-and-heating/p3.webp",
      "/biz-photos/sun-valley-air-conditioning-and-heating/p5.webp",
      "/biz-photos/sun-valley-air-conditioning-and-heating/p6.webp",
    ],
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "When your air conditioner quits in the Arizona heat, our technicians respond fast — diagnosing and repairing any make or model to get your Gilbert home cool and comfortable again." },
      { name: "AC Installation & Replacement", slug: "ac-installation", blurb: "Upgrade to a new, energy-efficient system with professional installation right-sized for your home — plus free same-day installation estimates so you start saving from day one." },
      { name: "AC Maintenance", slug: "ac-maintenance", blurb: "Keep your system running efficiently and head off summer breakdowns with seasonal tune-ups and preventative maintenance that extend equipment life and lower your energy bills." },
      { name: "Heating Repair", slug: "heating-repair", blurb: "Stay warm on cool desert nights — we quickly diagnose and repair furnaces and heating systems of every kind, restoring reliable heat whenever the temperature drops." },
      { name: "Heating Installation & Replacement", slug: "heating-installation", blurb: "Replace an aging furnace or add efficient heating with expert installation tailored to your home, backed by our 10-year system warranty and free estimates." },
      { name: "Heating Maintenance", slug: "heating-maintenance", blurb: "Keep your heating system safe and dependable through the winter with thorough seasonal maintenance that catches small issues before they become costly repairs." },
    ],
  },
  // hv0045 Agape Air Heating & Cooling (agapeair.com; family-owned in Gilbert, AZ since 1995 — Tommy Stueland; (602) 755-6854;
  // serves Gilbert, Chandler, Mesa & the greater Phoenix valley). Logo is a dual-flame mark (orange + blue) beside an "AGAPE
  // AIR / HEATING & COOLING" wordmark; the wordmark + tagline are near-BLACK and only the flame is colored (sampled 100 dark
  // / 12 orange / 12 blue across the wordmark line). Brand swatches arrived as two "Screenshot…png" files → renamed Color.png
  // (orange, primary) + Second Color.png (blue, secondary) so process-assets extracted them → brandColor #ff6900 / brandColor2
  // #03b0ed in asset-overrides.json. Logo + 6 real photos (AC, IAQ, slider hero, heat-pumps, ductless, about) wired via
  // asset-overrides.json; the two color swatches were removed from the inbox before the second run so they didn't pollute the
  // gallery as p7/p8.
  //   Designer notes: (1) NAV must be BLACK. The default white nav can't go black with this logo as-is — the wordmark is dark
  //   and would vanish on black, and nav + footer share one logo field — so a white-wordmark variant (logo-white.webp:
  //   dark text recolored to white, flame kept) is used and chromeDark is set, which darkens BOTH the nav and footer so the
  //   white logo stays legible everywhere (Theme 1's white footer becomes dark as a consequence). Orange accents/CTA stay.
  //   (2) Services must MATCH the live site — agapeair.com advertises Air Conditioning, Heating, Heat Pumps, Ductless, Indoor
  //   Air Quality & Maintenance; the generated record padded/renamed these, so all 6 are pinned HERE to mirror the site, each
  //   mapped to its real photo, with showAllServices so every card renders. (3) Hero = the slider image (imgi_40 → p3), so the
  //   photo order is pinned with it first (hero + every sub-page header use photos[0]).
  "agape-air-heating-and-cooling": {
    chromeDark: true,
    logo: "/biz-photos/agape-air-heating-and-cooling/logo-white.webp",
    showAllServices: true,
    photos: [
      "/biz-photos/agape-air-heating-and-cooling/p3.webp",
      "/biz-photos/agape-air-heating-and-cooling/p1.webp",
      "/biz-photos/agape-air-heating-and-cooling/p4.webp",
      "/biz-photos/agape-air-heating-and-cooling/p5.webp",
      "/biz-photos/agape-air-heating-and-cooling/p2.webp",
      "/biz-photos/agape-air-heating-and-cooling/p6.webp",
    ],
    services: [
      { name: "Air Conditioning", slug: "air-conditioning", image: "/biz-photos/agape-air-heating-and-cooling/p1.webp", blurb: "When the Arizona heat is relentless, our technicians repair, replace, and install air conditioning of every make and model — with fast emergency service to get your home cool again." },
      { name: "Heating & Furnace", slug: "heating", image: "/biz-photos/agape-air-heating-and-cooling/p6.webp", blurb: "Desert nights still get cold. We install, repair, and maintain heating systems and furnaces so your home stays warm and comfortable whenever the temperature drops." },
      { name: "Heat Pumps", slug: "heat-pumps", image: "/biz-photos/agape-air-heating-and-cooling/p4.webp", blurb: "Efficient, year-round comfort from a single system — we install and service heat pumps that both cool and heat your home while keeping your energy bills in check." },
      { name: "Ductless Mini-Splits", slug: "ductless", image: "/biz-photos/agape-air-heating-and-cooling/p5.webp", blurb: "Perfect for additions, garages, and older homes without ductwork — our ductless mini-split systems deliver targeted, energy-efficient comfort to any room." },
      { name: "Indoor Air Quality", slug: "air-quality", image: "/biz-photos/agape-air-heating-and-cooling/p2.webp", blurb: "Breathe easier with air scrubbers, purifiers, humidifiers, and whole-house filtration that strip out dust, allergens, and pollutants for cleaner, healthier indoor air." },
      { name: "Maintenance & Tune-Ups", slug: "maintenance", image: "/biz-photos/agape-air-heating-and-cooling/p3.webp", blurb: "Keep your system running at peak efficiency and head off costly breakdowns with seasonal tune-ups from technicians who know every brand of equipment." },
    ],
  },
  // hv0044 A/C Rangers Heating & Cooling (acrangers.com; Gilbert, AZ — owner Bradley; (480) 818-4772; 4.9 stars / 746
  // reviews; serves Ahwatukee, Apache Junction, Chandler, Fountain Hills, Gilbert, Gold Canyon, Goodyear, Litchfield Park,
  // Mesa, Paradise Valley, Peoria, Phoenix, Queen Creek, San Tan Valley & the valley). Logo is a brick-red shield with a
  // bold block "ACR" wordmark over a half-sun / snowflake mark, shipped on a white plate → process-assets knocked out the
  // near-white background to transparency. Brand colors arrived as two "Screenshot…png" swatches, renamed Color.png (brick
  // red, primary) + Second Color.png (blue, secondary) so process-assets extracted them → brandColor #9f2821 / brandColor2
  // #3474ba in asset-overrides.json. Logo + 14 real photos (their truck, standing/working AC units, doorbell, and real job
  // shots) wired via asset-overrides.json; the two solid color swatches that had been processed as p15/p16 were deleted so
  // they don't pollute the gallery. No Font Example screenshot → fontKey "bold" (Archivo) to echo the heavy uppercase block
  // "ACR" shield lettering. Their real site's hero is a static image, not a video (--dump-dom grep found no .mp4) → default
  // hero. extract-services couldn't run (Gemini key invalid), and the generated record padded the card list with Indoor Air
  // Quality & Heat Pumps that acrangers.com does NOT advertise. Services are pinned HERE to mirror acrangers.com's live
  // "services" list EXACTLY (AC repair & replacement, Service/Maintenance, Installation, Filter replacement, Heating repair
  // & replacement). showAllServices so all 5 render as cards.
  "a-c-rangers-heating-and-cooling": {
    fontKey: "bold",
    showAllServices: true,
    services: [
      { name: "AC Repair & Replacement", slug: "ac-repair", blurb: "When the Arizona heat hits and your air conditioner quits, our team responds fast — repairing any make or model, or replacing a system that's past its prime to get your home cool again." },
      { name: "Service & Maintenance", slug: "maintenance", blurb: "Keep your system running strong and head off summer breakdowns with our seasonal service and maintenance — ask about our $39.95 cooling tune-up inspection before the hot season hits." },
      { name: "AC Installation", slug: "ac-installation", blurb: "Need a new system? We right-size and install efficient air conditioning tailored to your home and budget, so you start saving on energy from day one." },
      { name: "Filter Replacement", slug: "filter-replacement", blurb: "Protect your equipment and breathe cleaner air with regular filter replacement that keeps your system running efficiently and your indoor air fresh." },
      { name: "Heating Repair & Replacement", slug: "heating", blurb: "Stay comfortable on cool desert nights — we repair and replace heating systems of every kind, keeping your home warm whenever the temperature drops." },
    ],
  },
  // hv0042 Efficiency Heating & Cooling LLC — brands itself "Efficiency Mechanical, Heating & Cooling Specialists"
  // (effmech.com; Gilbert, AZ — 12247 S Gilbert Rd; family-owned HVAC since 1986, Carrier Factory Authorized Dealer; serves
  // Ahwatukee, Carefree, Cave Creek, Chandler, Fountain Hills, Paradise Valley, Scottsdale & Sun Lakes; (480) 267-9670).
  // Logo is a black script "Efficiency Mechanical / HEATING & COOLING SPECIALISTS" wordmark over a yellow brush stroke,
  // shipped on a transparent/white plate → process-assets handled the knockout. Their brand-yellow swatch arrived as a
  // "Screenshot…png" and was renamed Color.png so process-assets extracted it → brandColor #f5e000 in asset-overrides.json
  // (no secondary swatch). Logo + 4 real photos (their recessed-vent install, duct-cleaning before/after, and truck-mounted
  // duct-cleaning shots) wired via asset-overrides.json. No Font Example screenshot → default font (the script wordmark
  // lives in the logo image anyway). Their real site's hero is a static image, not a video → default hero. The generated
  // record padded the card list with "Heat Pumps," which effmech.com does NOT advertise, and omitted Duct Cleaning, their
  // Energy Savings Agreement maintenance plan, New Construction & Remodel, and Commercial — all prominent on the live site.
  // Services are pinned HERE to mirror effmech.com EXACTLY (Service/Repair, Installation, Furnace, Indoor Air Quality, Duct
  // Cleaning, Energy Savings Agreement, New Construction & Remodel, Commercial). showAllServices so all 8 render as cards.
  "efficiency-heating-and-cooling-llc": {
    showAllServices: true,
    // Designer pick: lead with the truck-mounted duct-cleaning shot (imgi_6 → p3) as the hero. The hero and every
    // sub-page header use photos[0], so the photo order is pinned here (duct-cleaning first) — manual wins over the
    // process-assets order in asset-overrides.json and survives re-runs.
    photos: [
      "/biz-photos/efficiency-heating-and-cooling-llc/p3.webp",
      "/biz-photos/efficiency-heating-and-cooling-llc/p1.webp",
      "/biz-photos/efficiency-heating-and-cooling-llc/p2.webp",
      "/biz-photos/efficiency-heating-and-cooling-llc/p4.webp",
    ],
    services: [
      { name: "AC Service & Repair", slug: "ac-repair", blurb: "When your air conditioner falters in the Arizona heat, our certified technicians service and repair all makes and models — and we charge by the job, not the hour, so you know the price before we start." },
      { name: "AC Installation & Replacement", slug: "ac-installation", blurb: "As a Carrier Factory Authorized Dealer, we right-size and install high-efficiency systems for your home, with free in-home estimates on new equipment so you start saving on your energy bill from day one." },
      { name: "Heating & Furnace", slug: "heating", blurb: "Stay comfortable on cool desert nights with installation, repair, and maintenance of Carrier gas and oil furnaces — innovative heating matched to whatever fuel or heat source your home runs on." },
      { name: "Indoor Air Quality", slug: "air-quality", blurb: "Breathe easier with Carrier IAQ solutions — air cleaners, humidifiers, and Air Advice monitoring that measures carbon monoxide, chemical pollutants, and particulates to bring fresh, healthy air into your home." },
      { name: "Duct Cleaning", slug: "duct-cleaning", blurb: "We're strictly HVAC — so when we clean your ducts, we truly clean them, with a truck-mounted system that cleans and sanitizes, plus camera inspection to spot tears and obstructions throughout your ductwork." },
      { name: "Energy Savings Agreement", slug: "maintenance", blurb: "Our planned service agreements keep your system running at peak efficiency and head off costly breakdowns — regular maintenance that extends equipment life and lowers your energy bills." },
      { name: "New Construction & Remodel", slug: "new-construction", blurb: "From whole-house comfort on a ground-up build to ductwork that needs to be installed or rebuilt during a remodel, we handle large-scale HVAC projects with the right design for your space." },
      { name: "Commercial HVAC", slug: "commercial", blurb: "We perform work for major valley contractors — from simple tenant improvements to ground-up buildings — with a seasoned sales and project-management team meeting engineers to condition your environment right." },
    ],
  },
  // hv0041 All Pro AC (allproacaz.com; founder David Hartman; East Valley — Gilbert, Chandler, Mesa, Queen Creek, Tempe &
  // San Tan Valley; (602) 818-0024). The business has NO logo, so per the designer there's no logo image and no colored
  // letter-badge in the nav — just the brand name written as a wordmark: logoBadge:false + logoWordmark:"AllProAC" (the
  // condensed one-word form the designer asked for, distinct from the display name "All Pro AC"). Their brand-yellow swatch
  // arrived as a "Screenshot…png" and was renamed Color.png so process-assets extracted it → brandColor #f8e71c in
  // asset-overrides.json (no secondary swatch). 7 real photos (their hero, real AC job shots, and site parallax/banner
  // imagery) wired via asset-overrides.json. No Font Example screenshot → default font. Their real site's hero is a static
  // image, not a video → default hero. extract-services couldn't run (Gemini key invalid) and the generated record padded
  // the card list with Heating/Furnace, Indoor Air Quality & Heat Pumps that this shop does NOT do — All Pro AC is a
  // RESIDENTIAL AC specialist (David's American Standard high-efficiency variable-speed inverter-drive installs, repairs,
  // and maintenance). Services are pinned HERE to mirror allproacaz.com's actual offering pulled from their live /services/
  // page (residential repair, new-unit installation/replacement, maintenance & tune-ups, high-efficiency upgrades,
  // thermostat installs, emergency service). showAllServices so all 6 render as cards.
  "all-pro-ac": {
    logoBadge: false,
    logoWordmark: "AllProAC",
    showAllServices: true,
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "When your air conditioner quits in the Arizona heat, we answer fast — diagnosing and repairing any make or model, from failed capacitors and fan motors to full system faults, to get your home cool again." },
      { name: "AC Installation & Replacement", slug: "ac-installation", blurb: "Time for a new system? With five decades of experience, David and his team size and install the right residential air conditioner for your home and budget — no pressure, no upselling." },
      { name: "AC Maintenance & Tune-Ups", slug: "ac-maintenance", blurb: "Keep your AC running strong and head off summer breakdowns with thorough seasonal maintenance and tune-ups that keep your system efficient year after year." },
      { name: "High-Efficiency Upgrades", slug: "high-efficiency-upgrades", blurb: "Lower your energy bills with a high-efficiency American Standard variable-speed inverter-drive system — All Pro AC installs more of them than any contractor in the state." },
      { name: "Thermostat Installation", slug: "thermostat-installation", blurb: "Take control of your comfort and energy use with professionally installed thermostats, expertly matched and set up to get the most from your air conditioning system." },
      { name: "Emergency AC Service", slug: "emergency-ac-service", blurb: "AC emergencies don't wait for business hours. David answers every call in mission mode — fast, dependable service when your home loses its cool." },
    ],
  },
  // hv0040 Olive Air, Heating & AC Repair (oliveairandheating.com; Gilbert, AZ + East Valley — Gilbert, Chandler, Mesa,
  // Queen Creek, Tempe & San Tan Valley). Logo is a lime-green house outline with a gray air-flow swoosh and a thin
  // geometric "OLIVE / AIR & HEATING LLC" wordmark — shipped on a white plate → process-assets knocked out the near-white
  // background to transparency (the lime + gray artwork has its own color so it survives the knockout intact). The brand
  // lime swatch arrived as a "Screenshot…png" and was renamed Color.png so process-assets extracted it → brandColor
  // #ccd939 in asset-overrides.json (no secondary swatch was provided, so the logo's gray is left unset). Logo + 13 real
  // photos (their real AC/ductwork/furnace job shots + about-us/banner imagery) wired via asset-overrides.json. No Font
  // Example screenshot in the folder → default font. Their real site's hero is a static image, not a video (--dump-dom grep
  // found no .mp4) → default hero. extract-services couldn't run (Gemini key invalid) and the generated record had only 6
  // generic services, so services are pinned HERE to mirror oliveairandheating.com EXACTLY — their site is organized into 3
  // service dropdowns (Heating, Cooling, Air Quality) spanning 20 sub-pages; pulled wholesale from that live nav and
  // consolidated into 10 clean cards in the site's own wording so EVERY one of their service pages is represented (AC
  // Repair/Install/Maintenance, Furnace, Heat Pump, Ductless Mini-Split, Thermostat, Air Ducts & Ductwork, Indoor Air
  // Quality, Maintenance Plan). showAllServices so all 10 render as cards.
  "olive-air-heating-and-ac-repair": {
    showAllServices: true,
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "When your air conditioner quits in the Arizona heat, our technicians respond fast — diagnosing and repairing any make or model to restore your home's cool comfort." },
      { name: "AC Installation & Replacement", slug: "ac-installation", blurb: "Upgrade to a new, energy-efficient air conditioning system with expert installation and replacement, sized right for your home and your budget." },
      { name: "AC Maintenance", slug: "ac-maintenance", blurb: "Keep your system running efficiently and head off costly summer breakdowns with thorough seasonal AC tune-ups and preventative maintenance." },
      { name: "Furnace Service", slug: "furnace", blurb: "Stay warm on cool desert nights with dependable furnace repair, maintenance, and installation or replacement for systems of every make and model." },
      { name: "Heat Pumps", slug: "heat-pumps", blurb: "Year-round comfort from a single versatile system — energy-efficient heat pump repair, installation, and maintenance for both heating and cooling." },
      { name: "Ductless Mini-Split", slug: "ductless-mini-split", blurb: "Efficient, room-by-room comfort for additions, garages, and spaces traditional ductwork can't reach — expert mini-split installation and repair." },
      { name: "Thermostat Repair & Installation", slug: "thermostat", blurb: "Take control of your comfort and energy bills with smart and programmable thermostat repair and installation, expertly matched to your system." },
      { name: "Air Ducts & Ductwork", slug: "ductwork", blurb: "Air duct cleaning, sealing, ductwork repair, and air-handler service that improve airflow, boost efficiency, and keep every room evenly comfortable." },
      { name: "Indoor Air Quality", slug: "air-quality", blurb: "Breathe easier with air filter replacement, UV light installation, and whole-house air purifiers that filter, purify, and balance the air your family breathes." },
      { name: "Maintenance Plan", slug: "maintenance-plan", blurb: "Stay ahead of breakdowns with a maintenance plan — priority service, seasonal tune-ups, and lasting savings on the systems your home depends on." },
    ],
  },
  // hv0039 Ellsworth Air Conditioning and Plumbing (ellsworthhomeservices.com; 700 N Neely St #1, Gilbert, AZ 85233;
  // (623) 323-4466; serving Gilbert, Chandler, Mesa, Queen Creek, Tempe & San Tan Valley; 4.8★ / 449 reviews). Logo is a
  // bold black slab-serif "ELLSWORTH" wordmark with a white outline under a red house-roof + chimney, "AIR CONDITIONING &
  // PLUMBING" in red beneath — shipped on a white plate → process-assets knocked out the near-white background to
  // transparency (the black/red artwork has dark outlines so it survives the knockout intact). The brand-red swatch arrived
  // as a "Screenshot…png" and was renamed Color.png so process-assets extracted it → brandColor #ff0200 in
  // asset-overrides.json. Logo + 7 real photos (Adobe stock comfort shots, a tech working, the team, and real job photos)
  // wired via asset-overrides.json. fontKey "elegant" (Playfair) to echo the bold serif logo wordmark. No hero video on
  // their site (--dump-dom grep found no .mp4) → default hero. The generated record was AC-ONLY (AC Repair, Heating, AC
  // Maintenance, AC Install, Indoor Air Quality, Heat Pumps) and MISSED the plumbing/insulation/water-heater/ductless side
  // of this dual-trade shop, so services are pinned HERE to mirror ellsworthhomeservices.com EXACTLY — pulled wholesale
  // from their live nav's service pages (AC Services, Heating Services, Ductless HVAC, Heat Pumps, Indoor Air Quality, Duct
  // Repair & Maintenance, Attic Insulation, Water Heaters, Plumbing Services, Maintenance Plans). showAllServices so all 10
  // render as cards.
  "ellsworth-air-conditioning-and-plumbing": {
    fontKey: "elegant",
    showAllServices: true,
    services: [
      { name: "Air Conditioning", slug: "ac-services", blurb: "When your AC falters in the Arizona heat, our technicians respond fast — repairing, replacing, and installing systems of any make or model to restore your home's cool comfort." },
      { name: "Heating Services", slug: "heating-services", blurb: "Stay warm on cooler desert nights with dependable heating repair, maintenance, and installation for furnaces and heat pumps alike." },
      { name: "Ductless HVAC", slug: "ductless-hvac", blurb: "Ductless mini-split systems deliver efficient, room-by-room comfort for additions, garages, and spaces traditional ductwork can't reach." },
      { name: "Heat Pumps", slug: "heat-pumps", blurb: "Year-round comfort from a single versatile system — energy-efficient heat pump installation, repair, and maintenance for both heating and cooling." },
      { name: "Indoor Air Quality", slug: "indoor-air-quality", blurb: "Breathe easier at home with air quality solutions that filter, purify, and balance the air your family breathes every day." },
      { name: "Duct Repair & Maintenance", slug: "duct-repair-maintenance", blurb: "Sealing, repair, and maintenance for your ductwork that improves airflow, boosts efficiency, and keeps every room evenly comfortable." },
      { name: "Attic Insulation", slug: "attic-insulation", blurb: "Upgrade your attic insulation to keep conditioned air where it belongs, lower your energy bills, and hold steady comfort through every season." },
      { name: "Water Heaters", slug: "water-heaters", blurb: "Repair, replacement, and installation for traditional and tankless water heaters so your home never runs short on hot water." },
      { name: "Plumbing Services", slug: "plumbing-services", blurb: "From leaks and drain cleaning to fixtures and repairs, our licensed plumbers handle all your home's plumbing needs with care." },
      { name: "Maintenance Plans", slug: "maintenance-plans", blurb: "Stay ahead of breakdowns with a maintenance plan — priority service, seasonal tune-ups, and lasting savings on the systems your home depends on." },
    ],
  },
  // hv0038 A/C & Plumbing Doctors (theacdoctors.com; 1394 N Farrell Ct, Gilbert, AZ 85233; (602) 767-1830; serving Gilbert,
  // Chandler, Mesa, Queen Creek, Tempe & San Tan Valley; 4.9★ / 2,780+ reviews). Playful cartoon mascot wordmark — a sick AC
  // condenser + a sick toilet flanking red/blue graffiti-style "A/C & PLUMBING DOCTORS" lettering — shipped as a webp on a
  // white plate → process-assets knocked out the near-white background to transparency (the gray AC unit + white toilet have
  // dark outlines + shading so they survived the knockout intact). Two swatches arrived as "Screenshot…png" and were renamed
  // Color.png (red, primary) + Second Color.png (blue, secondary) so process-assets extracted them → brandColor #eb332f /
  // brandColor2 #2f9bca in asset-overrides.json. Logo + 4 real work photos (sump pump, a shower-valve plumbing repair, a clean
  // bathroom, and a mini-split condenser) wired via asset-overrides.json; the designer's two website background textures (a
  // team photo and a tech shot, both with heavy gradient overlays baked in) were set aside in _skip/ so they never hit the
  // gallery. fontKey "friendly" (Nunito) to echo the rounded, playful cartoon brand personality. Their real site's hero is a
  // static image, not a video (--dump-dom grep found no .mp4) → default hero. extract-services couldn't run (Gemini key
  // invalid) and the generated record was AC-ONLY, so services are pinned HERE to mirror theacdoctors.com EXACTLY — this is a
  // dual-trade shop, so the full HVAC + plumbing lineup from their live nav/quote dropdown is represented: A/C Repair, Heating
  // Repair, AC & Heating Installation/Replacement, HVAC Maintenance, Indoor Air Quality, Water Heaters, Drain Cleaning, Water
  // Treatment, and General Plumbing. showAllServices so all 9 render as cards.
  "a-c-and-plumbing-doctors": {
    fontKey: "friendly",
    showAllServices: true,
    // Hero uses photos[0]; designer wants the mini-split condenser shot (imgi_13 → p4.webp) leading, so the
    // photo order is pinned here with p4 first (the rest follow for the gallery).
    photos: [
      "/biz-photos/a-c-and-plumbing-doctors/p4.webp",
      "/biz-photos/a-c-and-plumbing-doctors/p1.webp",
      "/biz-photos/a-c-and-plumbing-doctors/p2.webp",
      "/biz-photos/a-c-and-plumbing-doctors/p3.webp",
    ],
    services: [
      { name: "A/C Repair", slug: "ac-repair", blurb: "When your air conditioner quits in the Arizona heat, our technicians respond fast — diagnosing and repairing any make or model to restore your home's cool comfort." },
      { name: "Heating Repair", slug: "heating-repair", blurb: "Stay warm on cool desert nights with prompt, reliable repair for furnaces, heat pumps, and every part of your home heating system." },
      { name: "A/C & Heating Installation / Replacement", slug: "ac-installation", blurb: "Upgrade to a new, energy-efficient air conditioning or heating system with expert installation and replacement, sized right for your home and budget." },
      { name: "HVAC Maintenance", slug: "maintenance", blurb: "Keep your system running efficiently and head off costly breakdowns with thorough seasonal tune-ups and preventative maintenance." },
      { name: "Indoor Air Quality", slug: "air-quality", blurb: "Breathe easier at home with indoor air quality solutions that filter, purify, and balance the air your family breathes every day." },
      { name: "Water Heaters", slug: "water-heaters", blurb: "Repair, replacement, and installation for traditional and tankless water heaters so your home never runs short on hot water." },
      { name: "Drain Cleaning", slug: "drain-cleaning", blurb: "Fast, thorough drain cleaning that clears stubborn clogs and keeps your sinks, tubs, and sewer lines flowing freely." },
      { name: "Water Treatment", slug: "water-treatment", blurb: "Protect your home and family with water treatment and filtration systems that deliver cleaner, softer, better-tasting water." },
      { name: "Plumbing Service", slug: "plumbing", blurb: "From leaks and fixtures to repairs and installations, our licensed plumbers handle all your home's plumbing needs with care." },
    ],
  },
  // hv0034 Ground Zero Plumbing, AC and Electrical (groundzeroplumbingac.com; Chandler, AZ + East Valley; (480) 448-0603;
  // family-owned since 2003, "Your Service Hero"). Chrome/red/black badge wordmark "GROUND ZERO" over a red bar reading
  // "PLUMBING • AC • ELECTRICAL", shipped already cut out on transparency → logo.webp kept as-is (the source already has real
  // alpha, so process-assets skips the near-white knockout that would have erased the white "Your Service Hero" + bar text).
  // Primary brand color #ec3237 (their site red, matches the logo) extracted from the swatch the designer dropped as a
  // "Screenshot …png" → renamed to Color.png so process-assets picked it up. Logo + 2 real photos (an AC condenser wiring
  // job + a remodel kitchen) + color wired via asset-overrides.json; the designer's 4.4MB review-bg texture was set aside in
  // _skip/ so it didn't land in the gallery. fontKey "bold" (Archivo) to echo the heavy angular badge lettering. No hero
  // video on their site → default hero. extract-services couldn't run (Gemini key invalid), so services are pinned HERE to
  // mirror groundzeroplumbingac.com EXACTLY — this is a true three-trade shop, so all of Plumbing, AC/Heating, and Electrical
  // are represented. Pulled wholesale from their live nav's four pillars (Plumbing, Heating, Cooling, Electrical) and
  // consolidated into clean cards in the site's own wording. showAllServices so all 10 render as cards.
  "ground-zero-plumbing-ac-and-electrical-chandler": {
    fontKey: "bold",
    showAllServices: true,
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "When your air conditioner quits in the Arizona heat, our technicians respond fast — diagnosing and repairing any make or model to restore your home's cool comfort." },
      { name: "AC Installation & Replacement", slug: "ac-installation", blurb: "Upgrade to a new, energy-efficient air conditioner with professional installation and replacement sized right for your home and your budget." },
      { name: "AC Maintenance & Tune-Ups", slug: "ac-maintenance", blurb: "Routine AC tune-ups and maintenance that keep your system running efficiently, lower your energy bills, and head off costly breakdowns before they start." },
      { name: "Heating & Furnace", slug: "heating", blurb: "Complete heating service for cooler desert nights — furnace and heat pump installation, repair, and ductless systems to keep your home warm and comfortable." },
      { name: "Indoor Air Quality & Ductwork", slug: "air-quality", blurb: "Cleaner, healthier air with indoor air quality solutions, duct repair, and ductwork installation that improve airflow throughout your home." },
      { name: "Drain Cleaning & Hydro-Jetting", slug: "drain-cleaning", blurb: "Fast drain cleaning, hydro-jetting, and sewer camera inspection that clear stubborn clogs and keep your plumbing flowing freely." },
      { name: "Water Heaters & Tankless", slug: "water-heaters", blurb: "Repair, replacement, and installation for traditional and tankless water heaters so your home never runs short on hot water." },
      { name: "Sewer, Leak Detection & Repiping", slug: "sewer-leak-detection", blurb: "Precision leak detection, sewer line service, gas line and water line work, and whole-home repiping to protect your home's plumbing." },
      { name: "Plumbing Repair & Installation", slug: "plumbing", blurb: "From fixtures and water lines to water purification, our licensed plumbers handle repairs and installations throughout your home." },
      { name: "Electrical Services", slug: "electrical", blurb: "Licensed electrical repair, installation, and upgrades that keep your home's power safe, reliable, and up to code." },
    ],
  },
  // hv0037 True North Air Conditioning (truenorthairconditioning.com; 724 N Monterey St Suite B, Gilbert, AZ 85233;
  // (480) 378-9591; serving Gilbert, Chandler, Mesa, Queen Creek, Tempe & San Tan Valley). Logo is a black bold serif
  // wordmark "TRUE NORTH" with a red/navy compass-rose star and a blue "AIR CONDITIONING" baseline, shipped as a clean
  // transparent .webp → kept as-is by process-assets. Two swatches arrived as "Screenshot…png" and were renamed
  // Color.png (navy, primary) + Second Color.png (mauve/pink compass accent, secondary) so process-assets extracted them
  // → brandColor #2b3455 / brandColor2 #d686a1 in asset-overrides.json. Logo + 9 real photos (their R-22, A/C repair,
  // installation, heating, HVAC & maintenance hero shots; the review-screenshot + video-thumb fall last so they never
  // hit the 6-card gallery) wired via asset-overrides.json. fontKey "elegant" (Playfair) to echo the bold serif logo
  // headline. Their real site DOES have a background hero video (videos.hibustudio.com) → downloaded to
  // public/biz-photos/<slug>/hero.mp4 and set as heroVideo. extract-services couldn't run (Gemini key invalid), so the
  // services are pinned HERE to mirror their live nav's "Services" dropdown EXACTLY — A/C Repairs, A/C Installations and
  // Replacements, Mini-Splits, Heat Pumps, Furnaces (their /heating-repairs page), Maintenance Plans, and R-22
  // Refrigerant Service and Refills. showAllServices so all 7 render as cards.
  "true-north-air-conditioning": {
    fontKey: "elegant",
    heroVideo: "/biz-photos/true-north-air-conditioning/hero.mp4",
    showAllServices: true,
    services: [
      { name: "A/C Repairs", slug: "ac-repairs", blurb: "When your AC quits in the Arizona heat, our technicians arrive fast to diagnose and repair any make or model, restoring cool comfort to your home." },
      { name: "A/C Installations & Replacements", slug: "ac-installations-and-replacements", blurb: "Upgrade to a new, energy-efficient air conditioning system with expert installation and replacement, sized right for your home and budget." },
      { name: "Mini-Splits", slug: "mini-splits", blurb: "Ductless mini-split systems deliver efficient, room-by-room comfort for additions, garages, and spaces traditional ductwork can't reach." },
      { name: "Heat Pumps", slug: "heat-pumps", blurb: "Year-round comfort from a single versatile system — energy-efficient heat pump installation, repair, and service for both heating and cooling." },
      { name: "Furnaces", slug: "furnaces", blurb: "Keep your home warm through cooler desert nights with dependable furnace and heating repair, service, and installation." },
      { name: "Maintenance Plans", slug: "maintenance-plans", blurb: "Stay ahead of breakdowns with maintenance plans and seasonal tune-ups that keep your system efficient, reliable, and running longer." },
      { name: "R-22 Refrigerant Service & Refills", slug: "r-22-refrigerant-service-refills", blurb: "Professional R-22 refrigerant service and refills for older systems, plus guidance on upgrading to modern, environmentally friendly refrigerants." },
    ],
  },
  // hv0035 Hendel's Air Conditioning Inc. (hendels.com; 3434 N Arizona Ave, Chandler, AZ 85225; (480) 813-1700; long-running
  // showroom-based AC dealer/service shop). Logo shipped as a single-color SVG wordmark "HENDEL'S AIR CONDITIONING" in their
  // sage green #668e72 → copied through as logo.svg (vector, no knockout needed). Primary brand color extracted from the
  // designer's swatch (renamed Screenshot…png → Color.png so process-assets picked it up) → #597a63, a near-identical muted
  // sage that matches the logo green. Logo + 5 real photos (their Chandler showroom exterior + showroom floor shots) + color
  // wired via asset-overrides.json. No Font Example provided; the logo is a heavy bold grotesque wordmark → fontKey "bold"
  // (Archivo) to echo it. No hero video on their site → default hero. extract-services couldn't run (Gemini key invalid), so
  // services are pinned HERE to mirror hendels.com EXACTLY. Their nav/services pillars are AC Repair, new A/C installation,
  // tune-ups & maintenance, Heating & Air / Heating Repair, Heat Pumps (American Standard), and Digital Thermostats — the
  // auto-generated set was identical EXCEPT it invented "Indoor Air Quality," which appears NOWHERE on their site, so it is
  // replaced with Digital Thermostats (a featured top-nav item) to keep the new site's services matching the original. 6
  // services → all render under the default 6-card cap.
  "hendel-s-air-conditioning-inc": {
    fontKey: "bold",
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "When your AC falters in the Arizona heat, our Master technicians arrive promptly to diagnose and repair any make or model, restoring your cool quickly." },
      { name: "Heating & Furnace", slug: "heating", blurb: "Stay warm on cooler Chandler evenings with comprehensive heating and furnace repair and service that keeps your system running safely and efficiently." },
      { name: "AC Tune-Ups & Maintenance", slug: "maintenance", blurb: "Proactive AC tune-ups and regular maintenance extend your system's life and efficiency, heading off unexpected breakdowns before they happen." },
      { name: "AC Installation & Replacement", slug: "ac-installation", blurb: "Upgrade to a new, energy-efficient air conditioning system with expert installation and replacement, sized right for your home from our Chandler showroom." },
      { name: "Heat Pumps", slug: "heat-pumps", blurb: "Year-round comfort from a single, versatile system — including American Standard heat pumps installed and serviced by our experienced team." },
      { name: "Digital Thermostats", slug: "thermostats", blurb: "Take precise, energy-saving control of your home's comfort with a programmable digital thermostat, professionally installed and configured to your system." },
    ],
  },
  // hv0036 Monster Air & Mechanical LLC (azmonsterair.com; Chandler, AZ; (602) 616-0127; 4.8★ / 239 reviews). Logo shipped as
  // a multi-color SVG wordmark — script "Monster" + bold "AIR MECHANICAL" in red #ED1F24 and blue #3E69B3 → copied through as
  // logo.svg (vector). Primary brand color from the designer's navy swatch (renamed Screenshot…png → Color.png so
  // process-assets picked it up) → #1f3459, a deep navy matching the wordmark's blue. brandColor2 set to the logo red #ED1F24
  // as the accent. fontKey "bold" (Archivo) to echo the heavy uppercase "AIR MECHANICAL" wordmark. Their real site runs a
  // looping background hero video (…Revolutionary Soldier's Resolve…-transcode.mp4) → downloaded to hero.mp4 and set as
  // heroVideo. Logo + 9 real-work photos + colors wired via asset-overrides.json. extract-services couldn't run (Gemini key
  // invalid), so services are pinned HERE to mirror azmonsterair.com's nav EXACTLY — its six service pillars are Air
  // Conditioning, Heating, Heat Pump, Ductless Mini-Split, Indoor Air Quality, and HVAC/Ductwork. 6 services → all render
  // under the default 6-card cap.
  "monster-air-and-mechanical-llc": {
    fontKey: "bold",
    brandColor2: "#ED1F24",
    heroVideo: "/biz-photos/monster-air-and-mechanical-llc/hero.mp4",
    services: [
      { name: "Air Conditioning", slug: "ac-repair", blurb: "Fast AC repair, installation, replacement, and tune-ups for the Arizona heat — emergency service and inspections on every make and model to keep your home cool." },
      { name: "Heating & Furnace", slug: "heating", blurb: "Complete heating service for cooler desert nights — furnace and boiler repair, heating installation, replacement, and tune-ups that keep your home warm and safe." },
      { name: "Heat Pumps", slug: "heat-pumps", blurb: "Versatile year-round comfort from a single system, with expert heat pump installation, repair, maintenance, and service from our experienced technicians." },
      { name: "Ductless Mini-Splits", slug: "mini-split", blurb: "Zoned, energy-efficient comfort without ductwork — ductless AC and mini-split installation, repair, tune-ups, and service for additions, garages, and tricky spaces." },
      { name: "Indoor Air Quality", slug: "air-quality", blurb: "Breathe easier with duct cleaning, ventilation, and ERV/HRV solutions that reduce allergens and pollutants for a healthier home environment." },
      { name: "HVAC & Ductwork", slug: "ductwork", blurb: "Whole-system HVAC repair, duct work, refrigeration service, and maintenance plans that protect your comfort and keep everything running efficiently year-round." },
    ],
  },
  // hv0033 AC Repair Near Me (acrepairnearme.services; Chandler, AZ + East Valley — Tempe, Sun City). Logo is a light-blue
  // AC condenser-fan badge over a heavy bold dark-gray "AC REPAIR" wordmark with "NEAR ME" tagline, shipped on white →
  // logo.webp (near-white knockout makes the plate transparent, reads cleanly on the white nav pill). Primary brand color
  // #2b6cb0 (their site blue) extracted from the swatch the designer dropped as a "Screenshot …png" → renamed to Color.png
  // so process-assets picked it up. Logo + 8 real photos + color wired via asset-overrides.json. No Font Example and no hero
  // video on their site → default font, default hero. extract-services couldn't run (Gemini key invalid), so services are
  // pinned HERE to mirror acrepairnearme.services EXACTLY — the site is built on three pillars (AC; Heating; Vent & Air Duct)
  // and its body cards break those into AC repair/install/maintenance, heating repair & install, thermostat install/repair,
  // and duct/vent cleaning & installation. Consolidated into 6 clean cards in the site's own wording. showAllServices so all
  // 6 render as cards.
  "ac-repair-near-me": {
    showAllServices: true,
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "When your air conditioner quits in the Arizona heat, we respond fast — diagnosing and fixing any make or model to restore your home's cool comfort right away." },
      { name: "AC Installation & Replacement", slug: "ac-installation", blurb: "Upgrade to a new, energy-efficient air conditioner with professional installation and replacement sized right for your home and your budget." },
      { name: "AC Maintenance", slug: "ac-maintenance", blurb: "Routine maintenance and tune-ups that keep your system running efficiently, lower your energy bills, and head off costly breakdowns before they start." },
      { name: "Heating Repair & Installation", slug: "heating", blurb: "Complete heating service for cooler desert nights — we repair existing heating systems and install new ones to keep your home warm and comfortable." },
      { name: "Thermostat Installation & Repair", slug: "thermostat", blurb: "Install, upgrade, or repair your thermostat for precise, reliable control over your home's temperature and greater energy savings." },
      { name: "Vent & Air Duct Cleaning & Installation", slug: "air-duct", blurb: "Comprehensive duct and vent cleaning and installation that improves airflow, boosts system efficiency, and freshens the air throughout your home." },
    ],
  },
  // hv0032 Bruce's Air Conditioning (brucesac.com; Chandler, AZ; (480) 378-7332). Bold red comic-style "BRUCE'S" wordmark
  // over "AIR CONDITIONING, PLUMBING & HEATING" → logo.webp (white knockout makes the plate transparent, reads cleanly on
  // the white nav pill). Primary brand color #eb2228 (their site red, matches the logo) + secondary #0654be (their blue),
  // both extracted from the swatches the designer dropped as "Screenshot …png" → renamed to Color.png / Second Color.png so
  // process-assets picked them up. Logo + 10 real photos + both colors wired via asset-overrides.json. No Font Example and
  // no hero video on their site → default font, default hero. extract-services couldn't run (Gemini key invalid), so
  // services are pinned HERE to mirror brucesac.com EXACTLY — this is a true three-trade shop (the logo + their nav confirm
  // AC + Heating + Plumbing). Pulled wholesale from their live nav's four pillars (Air Conditioning, Heating, Plumbing,
  // Maintenance) and consolidated into clean cards in the site's own wording. showAllServices so all 12 render as cards.
  "bruce-s-air-conditioning": {
    showAllServices: true,
    services: [
      { name: "AC Installation & Replacement", slug: "ac-installation", blurb: "Upgrade to a new, high-efficiency air conditioner with professional installation and replacement sized right for your Arizona home." },
      { name: "AC Repair & Maintenance", slug: "ac-repair", blurb: "Beat the desert heat with fast AC repair and routine maintenance that keep your system running efficiently on any make or model." },
      { name: "Ductless Mini Splits", slug: "ductless-mini-splits", blurb: "Energy-efficient ductless mini-split systems that deliver zoned heating and cooling to additions, garages, and hard-to-reach rooms." },
      { name: "Heat Pumps", slug: "heat-pumps", blurb: "High-efficiency heat pump installation, repair, and replacement that handle both heating and cooling from a single system." },
      { name: "Heating Installation & Replacement", slug: "heating-installation", blurb: "Install or replace your furnace or heating system with the right equipment to keep your home warm through cooler desert nights." },
      { name: "Heating Repair & Maintenance", slug: "heating-repair", blurb: "Expert heating tune-ups, service, and repair for furnaces and heat systems of every type so you stay comfortable all season." },
      { name: "Thermostats & Zone Control", slug: "thermostats", blurb: "Smart thermostats and zone control systems for precise, reliable comfort in every room of your home." },
      { name: "Emergency HVAC Services", slug: "emergency-hvac", blurb: "When your heating or cooling fails, we're here with fast emergency service to get your comfort back on track." },
      { name: "Plumbing Repair & Installation", slug: "plumbing", blurb: "From bathroom and kitchen plumbing to repiping, our licensed plumbers handle repairs and installations throughout your home." },
      { name: "Drain & Sewer Services", slug: "drain-sewer", blurb: "Drain cleaning, sewer line repair, and full replacement to protect your home's most important plumbing and keep water flowing." },
      { name: "Water Heaters", slug: "water-heaters", blurb: "Repair, replacement, and installation for traditional and tankless water heaters so you never run short on hot water." },
      { name: "Leak Detection & Water Filtration", slug: "leak-detection", blurb: "Precision leak detection, water line service, and whole-home filtration for cleaner, safer water and peace of mind." },
    ],
  },
  // hv0031 Ken Muncy Air Conditioning / KMAC (kenmuncy.com; Chandler & Gilbert, AZ; "Trusted HVAC Experts Since 1994").
  // Bold black "KMAC" wordmark with a gold/black "KEN MUNCY AIR CONDITIONING" plate → logo.webp (white knockout makes the
  // plate transparent, reads cleanly on the white nav pill). Primary brand color #ebc014 (their site gold) extracted from
  // the swatch the designer dropped as "Screenshot …png" → renamed to Color.png so process-assets picked it up. Logo + 6
  // real photos + color wired via asset-overrides.json. No Font Example and no hero video on their site → default font,
  // default hero. extract-services couldn't run (Gemini key invalid), so services are pinned HERE to mirror kenmuncy.com
  // EXACTLY — the 8 primary service categories from their homepage cards (which match their contact-form Services dropdown
  // one-for-one), in the site's own wording. showAllServices so all 8 render as cards (the home grid otherwise caps at 6).
  "ken-muncy-air-conditioning": {
    showAllServices: true,
    services: [
      { name: "AC Services", slug: "ac-services", blurb: "Beat the Arizona heat with comprehensive AC service — installation, maintenance, repair, and replacement on all major brands including Trane, Goodman, and Carrier." },
      { name: "Air Quality Services", slug: "air-quality", blurb: "Breathe easier with advanced filtration systems, duct cleaning, and humidity control that create a healthier indoor environment at home or work." },
      { name: "Commercial Services", slug: "commercial", blurb: "Tailored commercial HVAC solutions that keep your business cool and your team productive — from office buildings to retail stores and warehouses." },
      { name: "Emergency Heating and Air Repair", slug: "emergency-repair", blurb: "When your system breaks down, we're here for you 24/7 with same-day appointments when available to get your comfort back on track fast." },
      { name: "Heating Services", slug: "heating", blurb: "Stay warm through chilly desert nights with complete heating service — from furnace installations to heat pump repairs on all system types." },
      { name: "High Efficiency HVAC", slug: "high-efficiency-hvac", blurb: "Reduce your energy bills and carbon footprint with high-efficiency HVAC systems that maximize performance while minimizing energy use." },
      { name: "Seasonal Maintenance", slug: "seasonal-maintenance", blurb: "Keep your system running smoothly year-round with seasonal tune-ups that prevent costly breakdowns and extend the life of your equipment." },
      { name: "Ventilation Services", slug: "ventilation", blurb: "Proper ventilation for a healthy, comfortable space — duct design, installation, and maintenance that keep fresh air circulating throughout." },
    ],
  },
  // hv0030 Precision Air & Plumbing (precisionairandplumbing.com; (602) 490-8566). Navy "Precision / AIR & PLUMBING"
  // wordmark with a gold swirl mark, shipped on white → logo.webp (near-white knockout makes the plate transparent,
  // reads cleanly on the white nav pill). Primary brand color #fabc01 (their site gold) extracted from the swatch the
  // designer dropped as "Screenshot …png" → renamed to Color.png so process-assets picked it up. Logo + 11 real photos
  // + color wired via asset-overrides.json. No Font Example and no hero video on their site → default font, default
  // hero. Services pinned HERE to mirror precisionairandplumbing.com EXACTLY — the generated catalog was WRONG: it was
  // HVAC-only and invented "Indoor Air Quality" + "Heat Pumps" (neither is offered) while MISSING their entire Plumbing
  // and Home Improvement lines. This is a true HVAC + plumbing shop (the name + their water-heater/plumbing photos
  // confirm it). Replaced wholesale with the real menu across all four nav groups — Air Conditioning, Heating, Plumbing,
  // Home Improvement — consolidated into clean cards in their own wording. showAllServices so all 12 render as cards.
  "precision-air-and-plumbing": {
    showAllServices: true,
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "When your AC falters, our technicians quickly diagnose and fix the problem to restore your cool air fast — any make or model." },
      { name: "AC Tune-Up & Inspection", slug: "ac-tune-up", blurb: "A complete A/C tune-up and inspection that keeps your system running efficiently and catches small issues before they become breakdowns." },
      { name: "New AC Units & Replacement", slug: "ac-installation", blurb: "Upgrade to a new, high-efficiency air conditioner with professional installation and replacement sized right for your home." },
      { name: "Heater Service & Repair", slug: "heating", blurb: "Stay warm when temperatures drop with expert heating tune-ups, service, and repair for furnaces and heat systems of every type." },
      { name: "Heating Installation & Replacement", slug: "heating-installation", blurb: "Install or replace your heating system with the right equipment to keep your home comfortable through the cooler months." },
      { name: "Plumbing Repair & Tune-Up", slug: "plumbing-repair", blurb: "From a complete plumbing tune-up and inspection to fast repairs, we keep the water flowing throughout your home." },
      { name: "Water Heater Repair & Installation", slug: "water-heater", blurb: "Repair, replacement, and installation for traditional and tankless water heaters so you never run short on hot water." },
      { name: "Drain Cleaning & Hydro Jetting", slug: "drain-cleaning", blurb: "Clear stubborn clogs with professional drain cleaning, hydro jetting, and camera inspection that pinpoints the problem." },
      { name: "Sewer Line Services", slug: "sewer", blurb: "Sewer cleaning, repair, and full line replacement or installation to protect your home's most important plumbing." },
      { name: "Water Treatment", slug: "water-treatment", blurb: "Water purification and water softeners that deliver cleaner, better-tasting, and gentler water at every tap." },
      { name: "Air Duct Cleaning", slug: "air-duct-cleaning", blurb: "Professional air duct cleaning that improves airflow, system efficiency, and the air quality throughout your home." },
      { name: "Attic Insulation & Ventilation", slug: "attic", blurb: "Attic insulation and ventilation that keep your home comfortable year-round and your energy bills down." },
    ],
  },
  // hv0029 HVAC Near Me (hvacnearme.today; HVAC Near Me LLC, ROC 339464; Chandler, AZ + East Valley; (602) 932-0124;
  // "fast, reliable, and honest air conditioning and heating service"). Logo is a blue "HVAC" wordmark with a blue
  // map-pin + snowflake mark and gray "NEAR ME" tagline, shipped on white → logo.webp (near-white knockout makes the
  // plate transparent, reads cleanly on the white nav pill). Primary brand color #49a7e1 (their site blue) extracted
  // from the swatch the designer dropped as a "Screenshot …png" → renamed to Color.png so process-assets picked it up.
  // Logo + 8 real photos + color wired via asset-overrides.json. No Font Example and no hero video on their site →
  // default font, default hero. extract-services couldn't run (Gemini key invalid), so services are pinned HERE to
  // mirror hvacnearme.today EXACTLY. The generated catalog was WRONG for them — it invented "Indoor Air Quality" and
  // "Heat Pumps" (neither is offered) and MISSED their thermostat, duct/vent, and ductless work. Replaced wholesale
  // with the real seven, taken from the site's "HVAC Repair and Maintenance Services" nav menu + body service grid.
  // showAllServices so all 7 render as cards (the home grid otherwise caps at 6).
  "hvac-near-me": {
    showAllServices: true,
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "Service and repair of all types of air conditioners — we diagnose and fix any make or brand fast to restore your home's cool comfort." },
      { name: "AC Installation", slug: "ac-installation", blurb: "Installation of a new air conditioner of any type or brand, sized and matched to keep your Chandler home cool through the desert heat." },
      { name: "AC & HVAC Maintenance", slug: "maintenance", blurb: "Preseason check-ups and routine maintenance that keep your system running efficiently and head off unexpected breakdowns." },
      { name: "Heating System Installation & Repair", slug: "heating", blurb: "Complete heating service — we install new heating systems and repair existing ones to keep your home warm on cooler nights." },
      { name: "Vent & Air Duct Installation, Repair & Cleaning", slug: "ducts-vents", blurb: "We install, repair, and clean ducts and vents to improve airflow, efficiency, and the air quality throughout your home." },
      { name: "Thermostat Installation & Repair", slug: "thermostat", blurb: "Install or repair your thermostat — including smart thermostats — for precise, reliable control over your home's comfort." },
      { name: "Ductless Heating & AC", slug: "ductless", blurb: "Energy-efficient ductless mini-split systems that deliver zoned heating and cooling to additions, garages, and hard-to-reach rooms." },
    ],
  },
  // hv0028 Climate Pro LLC (climateprollc.com; Chandler, AZ; (480) 485-7151; 4.9★ / 3,255+ reviews). Colorful "CLIMATE
  // PRO LLC — Air Conditioning and Heating" oval wordmark shipped as .avif, which this sharp build can't decode → converted
  // to logo.png with sips (avif set aside in _inbox/.../_orig) so process-assets could knock it out → logo.webp (dark text,
  // reads cleanly on the white nav pill, no navBg override needed). Primary brand color #fe9a02 (their site orange)
  // extracted from the swatch the designer dropped as "Screenshot …png" → renamed to Color.png so process-assets picked it
  // up. 7 real photos wired via asset-overrides.json (a generic AdobeStock image and a coupon graphic were set aside in
  // _inbox/.../_skip — not real work); p1 (technician + rooftop condenser, blue sky) leads as the hero. No Font Example
  // and no hero video on their site → default font, default hero. extract-services couldn't run (Gemini key invalid), so
  // services are pinned HERE to mirror climateprollc.com's live menu EXACTLY — every named page under their Cooling,
  // Heating, and Services (Indoor Air Quality / ductwork) nav groups, in the site's own wording. showAllServices so all
  // render as cards (the home grid otherwise caps at 6). Generated catalog (which missed ductless, ductwork, thermostats,
  // and used off-brand "Furnace") replaced wholesale.
  "climate-pro-llc": {
    showAllServices: true,
    services: [
      { name: "Cooling Repair", slug: "cooling-repair", blurb: "Fast, reliable AC repair to get your system cooling again when the Arizona heat is at its worst." },
      { name: "Cooling Installation", slug: "cooling-installation", blurb: "Professional installation of high-efficiency cooling systems sized right for your home." },
      { name: "Air Conditioning Replacement", slug: "air-conditioning-replacement", blurb: "Upgrade an aging or failing AC with a new, energy-efficient system built for the desert." },
      { name: "Air Conditioning Maintenance", slug: "air-conditioning-maintenance", blurb: "Routine AC tune-ups that protect efficiency, prevent breakdowns, and extend the life of your system." },
      { name: "Cooling Service", slug: "cooling-service", blurb: "Expert cooling service and diagnostics that keep your home comfortable all summer long." },
      { name: "Heating Repair", slug: "heating-repair", blurb: "Prompt heating repair to restore warmth fast when your system stops keeping up." },
      { name: "Heating Installation", slug: "heating-installation", blurb: "Efficient, dependable heating installation to keep your home cozy through the cooler months." },
      { name: "Heating Service", slug: "heating-service", blurb: "Seasonal heating service and tune-ups that keep your system running safely and efficiently." },
      { name: "Heat Pumps", slug: "heat-pumps", blurb: "Versatile heat pump service and installation for energy-efficient heating and cooling year-round." },
      { name: "Ductless HVAC", slug: "ductless-hvac", blurb: "Energy-efficient ductless mini-split systems that deliver zoned comfort to additions, garages, and hard-to-cool rooms." },
      { name: "Variable Refrigerant Flow", slug: "variable-refrigerant-flow", blurb: "Advanced VRF systems that deliver precise, efficient zoned comfort for larger homes and businesses." },
      { name: "Indoor Air Quality", slug: "air-quality", blurb: "Indoor air quality solutions that keep the air in your home clean, healthy, and fresh." },
      { name: "Whole House Air Purifier", slug: "whole-house-air-purifier", blurb: "Whole-house air purification that removes contaminants for cleaner air in every room." },
      { name: "Air Purification Systems", slug: "air-purification-systems", blurb: "Advanced air purification systems that reduce allergens, odors, and airborne pollutants." },
      { name: "Humidifiers", slug: "humidifiers", blurb: "Whole-home humidifiers that balance moisture for healthier, more comfortable air." },
      { name: "Air Balancing", slug: "air-balancing", blurb: "Air balancing that evens out airflow so every room reaches the right temperature." },
      { name: "WiFi Thermostats", slug: "wifi-thermostats", blurb: "Smart WiFi thermostat installation for better efficiency and control from anywhere." },
      { name: "Duct Cleaning", slug: "duct-cleaning-service", blurb: "Duct cleaning that clears out dust and debris for cleaner air and better airflow." },
      { name: "Duct Sealing", slug: "duct-sealing", blurb: "Duct sealing that stops air leaks, boosts efficiency, and lowers your energy bills." },
      { name: "Duct Repair & Maintenance", slug: "duct-repair-maintenance", blurb: "Duct repair and maintenance that restores balanced, efficient airflow throughout your home." },
      { name: "Duct Inspection", slug: "duct-inspection", blurb: "Thorough duct inspections that pinpoint leaks, blockages, and efficiency losses." },
      { name: "Aeroseal", slug: "aeroseal", blurb: "Aeroseal duct sealing that seals leaks from the inside out for measurable efficiency gains." },
      { name: "Attic Insulation", slug: "attic-insulation", blurb: "Attic insulation that improves efficiency and keeps your home comfortable year-round." },
      { name: "Maintenance Plans", slug: "maintenance", blurb: "Maintenance plans that maximize efficiency, prevent surprises, and protect your investment." },
    ],
  },
  // hv0027 Mason Pro Services (masonproservices.com; Chandler, AZ; "over 30 years"). Unlike most hv entries, this is a
  // true multi-trade home-services shop — HVAC + plumbing + electrical — confirmed by the logo, the real-work photos
  // (boiler, AC, service-panel, lighting-upgrade, EL_/PL_ jobs), and the reviews. The MPS wordmark SVG ships on
  // transparent with three brand inks (gray #505557, blue #2bc1f1, orange #f79420) → copied as-is to logo.svg. Primary
  // orange #f79523 + secondary blue #0d72f2 extracted from the two swatch screenshots the designer dropped (renamed to
  // Color.png / Second Color.png so process-assets picked them up). 7 real photos + colors wired via asset-overrides.json.
  // No Font Example and no hero video on their site → default font, default hero. extract-services couldn't run (Gemini
  // key invalid), so services are pinned HERE to mirror masonproservices.com EXACTLY — the generated catalog was
  // HVAC-only (AC Repair/Heating/Maintenance/etc.) and MISSED that they also do plumbing + electrical, so it's replaced
  // wholesale with their four real trade pillars plus the two signature add-ons (Indoor Air Quality, EV charging).
  "mason-pro-services": {
    services: [
      { name: "Cooling Services", slug: "cooling", blurb: "High-efficiency air conditioning systems and expert technicians built to handle the peak heat of the Arizona day." },
      { name: "Heating Services", slug: "heating", blurb: "We keep your home warm and comfortable with expert furnace and heat pump service all season long." },
      { name: "Plumbing Services", slug: "plumbing", blurb: "Licensed plumbers handle everything from troubleshooting hidden leaks to replacing old pipes and upgrading water heaters." },
      { name: "Electrical Services", slug: "electrical", blurb: "Comprehensive electrical work — troubleshoot problems, upgrade your circuit panel, rewire rooms, and more." },
      { name: "Indoor Air Quality", slug: "indoor-air-quality", blurb: "Air duct cleaning and zone control systems that keep the air in your home clean, balanced, and healthy." },
      { name: "EV Charging Stations", slug: "ev-charging", blurb: "Tesla Wall Connector–approved electricians install the charging infrastructure your electric vehicle needs at home." },
    ],
  },
  // hv0026 Chandler Air — Air Conditioning & Heating (chandlerair.com; Chandler/Gilbert + East Valley HVAC contractor).
  // Logo is a WHITE script wordmark ("Chandler Air") with a blue outline on transparent → a white nav pill would erase
  // the white fill, so per the designer's note → navBg = black (#0d0d0d): the nav pill goes near-black, the white logo
  // reads cleanly, footer stays white. Primary brand color #0575da (their site blue) extracted from the swatch the
  // designer dropped as a "Screenshot …png" → renamed to Color.png so process-assets picked it up. Logo + 11 real
  // photos wired via asset-overrides.json. extract-services couldn't run (Gemini key invalid), so services are pinned
  // HERE to mirror their live site EXACTLY — the 6 service categories in chandlerair.com's nav (Air Conditioning,
  // Heating, Ductless AC, Commercial HVAC, HVAC Maintenance, Indoor Air Quality). Generated catalog replaced wholesale.
  // No font example → default font.
  "chandler-air": {
    navBg: "#0d0d0d",
    services: [
      { name: "Air Conditioning", slug: "air-conditioning", blurb: "Expert AC repair, installation, and replacement to keep your home cool and comfortable through the Arizona heat." },
      { name: "Heating", slug: "heating", blurb: "Furnace and heat pump repair, installation, and replacement that keep your home warm and efficient all winter long." },
      { name: "Ductless AC", slug: "ductless-ac", blurb: "Energy-efficient ductless mini-split systems that deliver zoned comfort to additions, garages, and hard-to-cool rooms." },
      { name: "Commercial HVAC", slug: "commercial-hvac", blurb: "Reliable commercial heating and cooling service and installation that keeps your business comfortable and running." },
      { name: "HVAC Maintenance", slug: "hvac-maintenance", blurb: "Routine tune-ups and maintenance plans that maximize efficiency, prevent breakdowns, and extend the life of your system." },
      { name: "Indoor Air Quality", slug: "indoor-air-quality", blurb: "Air filtration, purification, and humidity solutions that keep the air in your home clean, healthy, and fresh." },
    ],
  },
  // hv0025 Superior Heating and Air Conditioning (shac.co; 995 S Hamilton St, Chandler, AZ 85225; (602) 610-7638;
  // "Sales · Service · Installation", licensed/bonded/insured, "Making sure you never lose your cool"). Blue "SUPERIOR"
  // wordmark with an orange flame, on transparent → logo.webp (kept as-is, real transparency). Primary brand color
  // #0258b6 (their site blue) + secondary #e64d0d (the flame orange) extracted from the two swatch screenshots the
  // designer dropped (renamed to Color.png / Second Color.png so process-assets picked them up). 4 real-work photos —
  // tech loading the van, a rooftop package unit, a Trane air-handler install, and a tech at the parts shelf — wired in
  // asset-overrides.json (stock lifestyle / overlaid-team / background-texture shots were set aside in _inbox/_skip).
  // No Font Example and no hero video on their site → default font, default hero. Services are pinned HERE to mirror
  // shac.co's live menu EXACTLY — every named service under their Air Conditioning, Heating, and HVAC Services menus,
  // in the site's own wording (the three duplicate "Emergency" links collapse to one Emergency HVAC). showAllServices
  // so all 20 render as cards (the home grid otherwise caps at 6). Generated catalog replaced wholesale.
  "superior-heating-and-air-conditioning": {
    showAllServices: true,
    services: [
      { name: "AC Installation & Replacement", slug: "ac-installation-replacement", blurb: "Professional installation and replacement of high-efficiency AC systems sized right for your home." },
      { name: "AC Repair", slug: "ac-repair", blurb: "Fast, reliable AC repair to get your system cooling again and keep you from losing your cool." },
      { name: "AC Maintenance", slug: "ac-maintenance", blurb: "Routine AC tune-ups that protect efficiency, prevent breakdowns, and extend the life of your system." },
      { name: "Ductless Mini-Split Installation", slug: "ductless-mini-split-installation", blurb: "Energy-efficient ductless mini-split installation that delivers zoned comfort to any space." },
      { name: "Ductless Mini-Split Repair", slug: "ductless-mini-split-repair", blurb: "Expert repair for ductless mini-split systems to restore quiet, efficient comfort." },
      { name: "AC Inspection", slug: "ac-inspection", blurb: "Thorough AC inspections that catch small issues before they become costly repairs." },
      { name: "Commercial AC", slug: "commercial-ac", blurb: "Commercial air conditioning service and installation that keeps your business cool and running." },
      { name: "Furnace Repair", slug: "furnace-repair", blurb: "Prompt furnace repair to get your heat back fast when your system stops keeping up." },
      { name: "Furnace Installation & Replacement", slug: "furnace-installation-replacement", blurb: "Furnace installation and replacement with efficient, dependable systems built to last." },
      { name: "Heat Pump Repair", slug: "heat-pump-repair", blurb: "Heat pump repair that restores reliable year-round heating and cooling." },
      { name: "Heat Pump Installation & Replacement", slug: "heat-pump-installation-replacement", blurb: "Heat pump installation and replacement for versatile, energy-efficient comfort all year." },
      { name: "Heat Pump Maintenance", slug: "heat-pump-maintenance", blurb: "Seasonal heat pump maintenance that keeps your system efficient and trouble-free." },
      { name: "Heater Installation & Replacement", slug: "heater-installation-replacement", blurb: "Heater installation and replacement to keep your home warm through the cooler months." },
      { name: "Commercial Heating", slug: "commercial-heating", blurb: "Commercial heating service and installation that keeps your business comfortable all winter." },
      { name: "Emergency HVAC", slug: "emergency-hvac", blurb: "Emergency heating and cooling service when you need your comfort restored right away." },
      { name: "Indoor Air Quality", slug: "indoor-air-quality", blurb: "Air quality solutions that keep the air in your home clean, healthy, and fresh." },
      { name: "Blow-In Insulation", slug: "blow-in-insulation", blurb: "Blow-in insulation that improves efficiency and keeps your home comfortable year-round." },
      { name: "Duct Installation", slug: "duct-installation", blurb: "Professional duct installation for balanced airflow and consistent comfort in every room." },
      { name: "Duct Cleaning", slug: "duct-cleaning", blurb: "Duct cleaning that clears out dust and debris for cleaner air and better airflow." },
      { name: "Thermostat Installation", slug: "thermostat-installation", blurb: "Thermostat installation, including smart upgrades, for better efficiency and control." },
    ],
  },
  // hv0024 AZ Home Services Group – AC Repair & Plumbing (azhomeservices.group; Tempe, AZ; (602) 806-7212; 1,000+
  // 5★ Google reviews; locally owned, 24/7 same-day; Trane AC dealer). Sky-blue "AZ Home Services Group" logo +
  // AZ/house icon → logo.webp; primary brand color #3ac6f7 extracted from the swatch screenshot (renamed to
  // Color.png so process-assets picked it up); 6 real photos — all wired in asset-overrides.json. No Font Example
  // and no hero video on their site → default font, default hero. extract-services couldn't run (Gemini key
  // invalid), so services are pinned HERE to mirror their live site EXACTLY — the two nav categories (AC/HVAC
  // Services + Plumber Services) enumerate all 27 services below, in the site's own wording. showAllServices so
  // every one renders as a card (the home grid otherwise caps at 6).
  "az-home-services-group-ac-repair-and-plumbing-services-of-me": {
    showAllServices: true,
    services: [
      { name: "AC Maintenance", slug: "ac-maintenance", blurb: "Routine AC tune-ups that keep your system running efficiently through the Tempe heat." },
      { name: "AC Repair", slug: "ac-repair", blurb: "Fast, affordable AC repair when your air conditioner isn't cooling — same-day and emergency service." },
      { name: "AC Installation", slug: "ac-installation", blurb: "Superior installation on all types, brands, and models — proud to install high-efficiency Trane systems." },
      { name: "Air Duct Cleaning", slug: "air-duct-cleaning", blurb: "Air duct cleaning that clears out dust and debris for cleaner air and better airflow." },
      { name: "Heating Maintenance", slug: "heating-maintenance", blurb: "Seasonal heating maintenance so your system is ready before the cold sets in." },
      { name: "Heating System Repair", slug: "heating-system-repair", blurb: "Heating repair to get your heat back fast when your system stops keeping up." },
      { name: "Heating Installation", slug: "heating-installation", blurb: "Professional heating installation sized and set up right for your home." },
      { name: "HVAC Maintenance", slug: "hvac-maintenance", blurb: "Comprehensive HVAC maintenance to keep heating and cooling performing year-round." },
      { name: "HVAC Repair", slug: "hvac-repair", blurb: "Top-rated HVAC repair for all brands and models across the Valley." },
      { name: "Repair, Replace & Install Air Ducts & Vents", slug: "air-ducts-and-vents", blurb: "Repair, replacement, and installation of air ducts and vents for balanced, efficient airflow." },
      { name: "Thermostat Repair", slug: "thermostat-repair", blurb: "Thermostat repair to restore accurate control over your home's comfort." },
      { name: "Thermostat Installation", slug: "thermostat-installation", blurb: "Thermostat installation, including smart upgrades, for better efficiency and control." },
      { name: "Water Heater Repair", slug: "water-heater-repair", blurb: "Water heater repair to bring back reliable hot water fast." },
      { name: "Water Heater Installation & Replacement", slug: "water-heater-installation", blurb: "Water heater installation and replacement, tank or tankless, done right." },
      { name: "Drain Unclogging", slug: "drain-unclogging", blurb: "Fast drain unclogging that clears stubborn blockages and keeps things flowing." },
      { name: "Leak Repair", slug: "leak-repair", blurb: "Leak detection and repair to stop water damage before it spreads." },
      { name: "Toilet Repair", slug: "toilet-repair", blurb: "Toilet repair for running, clogged, or leaking toilets." },
      { name: "Toilet Installation & Replacement", slug: "toilet-installation", blurb: "Toilet installation and replacement with clean, leak-free setup." },
      { name: "Shower Repair", slug: "shower-repair", blurb: "Shower repair for leaks, low pressure, and faulty fixtures." },
      { name: "Shower Installation", slug: "shower-installation", blurb: "Shower installation handled start to finish by our plumbing team." },
      { name: "Sewer Line Repair", slug: "sewer-line-repair", blurb: "Sewer line repair to resolve backups and protect your home's main line." },
      { name: "Pipe Repair", slug: "pipe-repair", blurb: "Pipe repair for leaks, breaks, and aging plumbing." },
      { name: "Garbage Disposal Repair", slug: "garbage-disposal-repair", blurb: "Garbage disposal repair to get your kitchen back up and running." },
      { name: "Garbage Disposal Installation", slug: "garbage-disposal-installation", blurb: "Garbage disposal installation and replacement, professionally fitted." },
      { name: "Faucet Repair Service", slug: "faucet-repair", blurb: "Faucet repair to fix drips, leaks, and worn fixtures." },
      { name: "Faucet Installation", slug: "faucet-installation", blurb: "Faucet installation for kitchens and baths, done clean and leak-free." },
      { name: "Outdoor Plumbing Repair", slug: "outdoor-plumbing-repair", blurb: "Outdoor plumbing repair for hose bibs, irrigation lines, and exterior fixtures." },
    ],
  },

  // hv0020 JMAC Heating & Cooling — Mesa HVAC contractor (crycool.com; 1843 S Old Greenfield Rd, Mesa AZ 85206;
  // (480) 360-3909; 5★ / 789 reviews; serves the whole valley + MRI/CT chiller service nationwide). Blue "JMAC"
  // wordmark logo → logo.webp (already transparent, reads on the default white nav pill). Primary brand color
  // #213178 (their navy) extracted from the single swatch the designer dropped as "Screenshot …png" → copied to
  // Color.png so process-assets picked it up; written to asset-overrides.json. No second swatch → theme auto-derives
  // the secondary. 6 real photos wired via asset-overrides.json (the swatch screenshot was removed from the gallery).
  // extract-services couldn't run (Gemini key invalid), so services are pinned HERE to mirror their live site EXACTLY:
  // crycool.com is an elite American Standard Customer Care Dealer and a Mitsubishi Diamond Contractor (ductless), and
  // they "service and repair it all" plus a distinctive Medical Chillers line (MRI/CT cooling — new/refurbished, service,
  // controls & monitoring). Pinned to those six, replacing the generated guesses (which had generic Heat Pumps and
  // missed both mini-splits and the chiller business). Blurbs condensed from their site copy. No font example → default
  // font.
  "jmac-heating-and-cooling": {
    // Designer picked imgi_45 (M-Series black family room → p5.webp) as the hero; the theme uses
    // photos[0] as the hero media, so pin the order here (manual wins) with p5 first, rest follow.
    photos: [
      "/biz-photos/jmac-heating-and-cooling/p5.webp",
      "/biz-photos/jmac-heating-and-cooling/p1.webp",
      "/biz-photos/jmac-heating-and-cooling/p2.webp",
      "/biz-photos/jmac-heating-and-cooling/p3.webp",
      "/biz-photos/jmac-heating-and-cooling/p4.webp",
      "/biz-photos/jmac-heating-and-cooling/p6.webp",
    ],
    services: [
      {
        name: "AC & Heating Repair",
        slug: "repair",
        blurb:
          "From multi-million-dollar facilities to homes and mobile homes, we service and repair it all — every brand, new or old — and get your comfort back fast.",
      },
      {
        name: "AC & Heating Installation",
        slug: "installation",
        blurb:
          "When it's time for replacement, no one does it better. As an elite American Standard Customer Care Dealer we install the #1-rated, most reliable systems, sized right for your home.",
      },
      {
        name: "Ductless Mini-Splits",
        slug: "mini-splits",
        blurb:
          "A Mitsubishi Diamond Contractor with factory-trained technicians — precise design and installation of ductless Zoned Comfort Solutions backed by an industry-leading 12-year warranty.",
      },
      {
        name: "Indoor Air Quality",
        slug: "air-quality",
        blurb:
          "Keep your air clean and your family healthy with advanced filtration, including Platinum Deodorizing filters that use nanotechnology to neutralize the worst odors.",
      },
      {
        name: "AC & Heating Maintenance",
        slug: "maintenance",
        blurb:
          "Old-fashioned work ethic and pride in workmanship on every visit. Maintenance plans keep your system running at peak efficiency and head off breakdowns before they start.",
      },
      {
        name: "Medical Chillers",
        slug: "medical-chillers",
        blurb:
          "MRI and CT cooling systems nationwide — new or JMAC-refurbished chillers, expert service of all brands plus piping, controls, and remote monitoring that predicts failures before downtime.",
      },
    ],
  },
  // hv0023 Arizona's Dukes of Air & Plumbing — East Valley (Gilbert/Mesa) HVAC + plumbing contractor, now a
  // Service Experts company (serviceexperts.com/gilbert-az; 24/7; "HVAC, Plumbing & Electrical"). Logo is the
  // Service Experts wordmark with the red-house/blue-snowflake mark → logo.webp (sits on the white nav pill).
  // Designer dropped TWO color swatches as "Screenshot …png": red + blue → copied to Color.png (red, primary)
  // and Second Color.png (blue, secondary) so process-assets picked both up → brandColor #c41230 / brandColor2
  // #007ac2 in asset-overrides.json (matches the logo mark). 8 images processed; p3 and p8 are mobile/tablet
  // crops of the SAME electrical-panel shot as p7, so they're dropped here — gallery pinned to 6 clean, varied
  // Service Experts brand photos. Designer asked for imgi_13_closingcta-bg (→ p6, wide residential home) as the
  // hero; the theme uses photos[0] as the hero media, so p6 is pinned first. extract-services couldn't run
  // (Gemini key invalid), so services are pinned HERE to mirror their live site menu EXACTLY — six parent
  // categories: AC, Heating, Heat Pumps, Indoor Air Quality, Plumbing, and Water Treatment (the menu's
  // energy-efficient/ductwork/emergency items fold into AC & Heating; water heaters fold into Plumbing).
  // Replaces the generated guesses. Blurbs condensed from their site copy. No font example → default font.
  "arizona-s-dukes-of-air-and-plumbing": {
    photos: [
      "/biz-photos/arizona-s-dukes-of-air-and-plumbing/p6.webp",
      "/biz-photos/arizona-s-dukes-of-air-and-plumbing/p1.webp",
      "/biz-photos/arizona-s-dukes-of-air-and-plumbing/p2.webp",
      "/biz-photos/arizona-s-dukes-of-air-and-plumbing/p4.webp",
      "/biz-photos/arizona-s-dukes-of-air-and-plumbing/p5.webp",
      "/biz-photos/arizona-s-dukes-of-air-and-plumbing/p7.webp",
    ],
    services: [
      {
        name: "AC Services",
        slug: "air-conditioning",
        blurb:
          "Repair, maintenance, replacement, and emergency air conditioning service across the East Valley — energy-efficient cooling that holds up to Arizona summers, with 24/7 help when it counts.",
      },
      {
        name: "Heating Services",
        slug: "heating",
        blurb:
          "Furnace and heat-system repair, tune-ups, and installation to keep your home warm all winter — plus emergency heating service whenever you need it.",
      },
      {
        name: "Heat Pumps",
        slug: "heat-pumps",
        blurb:
          "Expert heat pump installation, repair, and maintenance for efficient year-round comfort that both heats and cools your home from a single system.",
      },
      {
        name: "Indoor Air Quality",
        slug: "air-quality",
        blurb:
          "Filtration, purification, and ductwork solutions that cut down on dust, allergens, and odors so the air in your home is cleaner and healthier to breathe.",
      },
      {
        name: "Plumbing Services",
        slug: "plumbing",
        blurb:
          "Full-service plumbing from leak repairs to new installations, including water heater repair and replacement — one trusted team for your home's HVAC and plumbing.",
      },
      {
        name: "Water Treatment",
        slug: "water-treatment",
        blurb:
          "Whole-home water treatment and softening that protects your fixtures and appliances and gives you cleaner, better-tasting water at every tap.",
      },
    ],
  },
  // hv0022 Rusty's Air Conditioning And Heating — Mesa HVAC contractor (rustysairaz.com; (480) 631-4244;
  // 4.9★ / 662 reviews; "the #1 HVAC contractor in Mesa"). Circular red/navy badge logo with white "Rusty's"
  // script → logo.svg (reads on the white nav pill — the badge is a filled red disc). Designer dropped TWO color
  // swatches as "Screenshot …png": red + navy. Copied to Color.png (red, primary) and Second Color.png (navy,
  // secondary) so process-assets picked both up → brandColor #b23635 / brandColor2 #17415e in asset-overrides.json.
  // (Red chosen as primary to match the logo's bold outer ring; flip if the designer wants navy-forward.) 6 photos
  // processed; p5 (imgi_11_Mask-Group-18) had a corrupted gray/noise band across the top from its transparent-PNG
  // source, so it's dropped here — gallery pinned to the 5 clean ones (two branded-van shots, two tech-with-customer
  // shots, child on a Lennox install box). p1 (desert van hero) stays first → theme hero. extract-services couldn't
  // run (Gemini key invalid), so services are pinned HERE to mirror their live site nav EXACTLY: Air Conditioning,
  // Heating, AC Maintenance/Tune-Ups, Ductless Mini-Splits, Duct Cleaning, and Commercial HVAC (their AC + Heating
  // pages each cover repair AND install/replacement; ductless and duct cleaning live under Air Conditioning on the
  // site). Replaces the generated guesses. Their /water-treatment page exists as a 7th offering — left off to keep
  // the card grid HVAC-core (swap in if wanted). Blurbs condensed from their site copy. No font example → default font.
  "rusty-s-air-conditioning-and-heating": {
    photos: [
      "/biz-photos/rusty-s-air-conditioning-and-heating/p1.webp",
      "/biz-photos/rusty-s-air-conditioning-and-heating/p2.webp",
      "/biz-photos/rusty-s-air-conditioning-and-heating/p3.webp",
      "/biz-photos/rusty-s-air-conditioning-and-heating/p4.webp",
      "/biz-photos/rusty-s-air-conditioning-and-heating/p6.webp",
    ],
    services: [
      {
        name: "Air Conditioning",
        slug: "air-conditioning",
        blurb:
          "Fast, honest AC repair plus expert installation and replacement — we promptly diagnose the issue and give you transparent options, not a hard sell.",
      },
      {
        name: "Heating",
        slug: "heating",
        blurb:
          "Furnace and heat pump repair, installation, and replacement to keep your home comfortable through every Arizona winter.",
      },
      {
        name: "AC Maintenance & Tune-Ups",
        slug: "maintenance",
        blurb:
          "Seasonal tune-ups and our maintenance plan keep your system running efficiently and reliably year after year.",
      },
      {
        name: "Ductless Mini-Splits",
        slug: "ductless",
        blurb:
          "Ductless mini-split installation and repair for flexible, energy-efficient comfort in additions, garages, and hard-to-cool rooms.",
      },
      {
        name: "Duct Cleaning",
        slug: "duct-cleaning",
        blurb:
          "Professional duct cleaning that clears out dust and buildup for cleaner indoor air and better airflow throughout your home.",
      },
      {
        name: "Commercial HVAC",
        slug: "commercial",
        blurb:
          "Dependable commercial heating and cooling that keeps your Mesa business comfortable and your equipment running.",
      },
    ],
  },
  // hv0019 Alan's Air — Mesa HVAC contractor (alansairplumbingaz.com; 2451 W Birchwood Ave, Mesa AZ 85202;
  // (602) 469-1824; License #214834; 4.9★ / 169 reviews). Red script "Alan's Air" cloud wordmark logo → logo.webp.
  // Primary brand color #db281c (their red) extracted from the single swatch the designer dropped as "Screenshot …png"
  // → copied to Color.png so process-assets picked it up; written to asset-overrides.json. No second swatch → theme
  // auto-derives the secondary. 11 real photos wired via asset-overrides.json (the swatch screenshot was removed from
  // the gallery). extract-services couldn't run (Gemini key invalid), so services are pinned HERE to mirror their live
  // /services page EXACTLY and in order — the site's "Our HVAC Services" lists four: Custom System Design &
  // Installation, Fast & Reliable HVAC Repairs, Comprehensive Preventative Maintenance, and Retrofit & System
  // Replacement, replacing the six generated guesses. Blurbs condensed from their site copy. No font example → default
  // font.
  "alan-s-air": {
    services: [
      {
        name: "Custom System Design & Installation",
        slug: "system-design-and-installation",
        blurb:
          "We evaluate your square footage, insulation, and airflow to recommend and install the perfect unit — done right the first time for reduced energy bills and consistent temperatures.",
      },
      {
        name: "Fast & Reliable HVAC Repairs",
        slug: "hvac-repairs",
        blurb:
          "Our technicians arrive fully stocked to troubleshoot and repair all makes and models quickly, diagnosing the root cause to prevent recurring breakdowns and extend the life of your equipment.",
      },
      {
        name: "Comprehensive Preventative Maintenance",
        slug: "preventative-maintenance",
        blurb:
          "Seasonal tune-ups — coil cleaning, filter replacement, and system recalibration — that keep your unit running at peak performance and maintain your warranty status.",
      },
      {
        name: "Retrofit & System Replacement",
        slug: "retrofit-and-replacement",
        blurb:
          "We seamlessly replace aging, inefficient units with modern high-efficiency models, retrofitting ductwork as needed for superior, quieter climate control.",
      },
    ],
  },
  // hv0016 HVAC Mesa — Mesa HVAC contractor (hvacmesa.net; 1818 E Southern Ave, Mesa AZ 85204; (602) 962-7901).
  // They have NO logo, so the nav shows just their name: logoBadge:false drops the initials chip and renders the
  // "HVAC Mesa" wordmark alone (per designer's note). Primary brand color #4683b4 (their steel blue) extracted from
  // the single swatch the designer dropped as "Screenshot …png" → renamed to Color.png so process-assets picked it up;
  // written to asset-overrides.json. No second swatch → theme auto-derives the secondary. 4 real photos wired via
  // asset-overrides.json. extract-services couldn't run (Gemini key invalid), so services are pinned HERE to mirror
  // their live site EXACTLY — the homepage frames their offering as "heating, ventilation, and air conditioning" and
  // names two service cards (Heating Solutions, Cooling Services); pinned as those three pillars, replacing the
  // generated guesses. Heating/Cooling blurbs are lifted verbatim from their site. No years founded stated → default.
  // No font example → default font.
  "hvac-mesa": {
    logoBadge: false,
    photos: [
      "/biz-photos/hvac-mesa/hero.webp",
      "/biz-photos/hvac-mesa/heating-solutions.webp",
      "/biz-photos/hvac-mesa/cooling-services.webp",
      "/biz-photos/hvac-mesa/ventilation.webp",
    ],
    services: [
      {
        name: "Heating Solutions",
        slug: "heating-solutions",
        image: "/biz-photos/hvac-mesa/heating-solutions.webp",
        blurb:
          "Reliable heating services to keep your home warm during the cold months in Mesa, AZ.",
      },
      {
        name: "Cooling Services",
        slug: "cooling-services",
        image: "/biz-photos/hvac-mesa/cooling-services.webp",
        blurb:
          "Efficient air conditioning solutions to ensure your comfort during the hot Arizona summers.",
      },
      {
        name: "Ventilation",
        slug: "ventilation",
        image: "/biz-photos/hvac-mesa/ventilation.webp",
        blurb:
          "Complete ventilation services that keep air moving and your indoor environment comfortable year-round.",
      },
    ],
  },
  // hv0017 Honest Air Inc. — Mesa HVAC contractor (honestairconditioning.net; 2942 N Greenfield Rd STE 147,
  // Mesa AZ 85215; (480) 934-0407; 4.8★ / 146 reviews). Logo wordmark has WHITE inner letters + a white tagline,
  // so per the designer the nav pill is painted BLACK (navBg "#000000") — white-on-black makes the white logo parts
  // read; the blue logo strokes stay on-brand against it. Primary brand color #005c9b (their blue) extracted from the
  // single swatch the designer dropped as "Screenshot …png" → renamed to Color.png so process-assets picked it up;
  // written to asset-overrides.json. No second swatch → theme auto-derives the secondary. extract-services couldn't
  // run (Gemini key invalid), so services are pinned HERE to mirror their live site's service nav EXACTLY — Air
  // Conditioning broken into Repair / Installation / Maintenance / Mini Split, plus Heating, Heat Pumps, Duct Sealing,
  // and Indoor Air Quality — replacing the generated guesses. Designer picked p5 (their desert footer backdrop) as the
  // HERO; the theme uses photos[0] as the hero media, so it's pinned first with the 4 real HVAC shots (p1–p4) following
  // for the recent-work gallery. No font example → default font.
  "honest-air-inc": {
    navBg: "#000000",
    photos: [
      "/biz-photos/honest-air-inc/p5.webp",
      "/biz-photos/honest-air-inc/p1.webp",
      "/biz-photos/honest-air-inc/p2.webp",
      "/biz-photos/honest-air-inc/p3.webp",
      "/biz-photos/honest-air-inc/p4.webp",
    ],
    services: [
      {
        name: "AC Repair",
        slug: "ac-repair",
        blurb:
          "Fast, accurate diagnosis and repair to get your air conditioning cooling again on Mesa's hottest days.",
      },
      {
        name: "AC Installation",
        slug: "ac-installation",
        blurb:
          "Professional installation and replacement of high-efficiency AC systems sized right for your home.",
      },
      {
        name: "AC Maintenance",
        slug: "ac-maintenance",
        blurb:
          "Routine tune-ups that prevent breakdowns, lower energy bills, and extend the life of your system.",
      },
      {
        name: "Mini Split AC",
        slug: "mini-splits",
        blurb:
          "Ductless mini split installation and service for room-by-room comfort and efficient zoned cooling.",
      },
      {
        name: "Heating",
        slug: "heating",
        blurb:
          "Repair, installation, and maintenance to keep your furnace and heating system running through the winter.",
      },
      {
        name: "Heat Pumps",
        slug: "heat-pumps",
        blurb:
          "Energy-efficient heat pump installation and service delivering reliable heating and cooling year-round.",
      },
      {
        name: "Duct Sealing",
        slug: "duct-sealing",
        blurb:
          "Sealing leaky ductwork to improve airflow, boost efficiency, and keep every room evenly comfortable.",
      },
      {
        name: "Indoor Air Quality",
        slug: "indoor-air-quality",
        blurb:
          "Air purifiers and IAQ solutions that cut allergens, dust, and pollutants for healthier indoor air.",
      },
    ],
  },
  // hv0007 Scottsdale Air Heating & Cooling — designer asked to swap the soft section washes from the
  // pink auto-tinted off the red secondary (#db011c) to a very light blue. bgOverride sets softBg and
  // auto-lightens heroBg; the red logo + icon-chip accents stay on-brand.
  "scottsdale-air-heating-and-cooling": {
    bgOverride: "#E8F1FB", // very light blue — replaces the pink wash auto-tinted from the red secondary; heroBg auto-tints lighter
  },
  // hv0013 John's Heating, Cooling, and Plumbing — Mesa HVAC + plumbing contractor (justcalljohns.com; serves
  // Mesa, Chandler, Gilbert, Queen Creek, Tempe, Scottsdale, Phoenix and the wider Maricopa County; Trane Comfort
  // Specialist, 2,397+ Google reviews). Logo is an SVG wordmark on transparent → reads on the default white nav
  // pill. Primary brand color #1f428c (their navy) extracted from the single swatch the designer dropped as
  // "Screenshot …png" → renamed to Color.png so process-assets picked it up; written to asset-overrides.json. No
  // second swatch → theme auto-derives the secondary. 7 real photos wired via asset-overrides.json. extract-services
  // couldn't run (Gemini key invalid + malformed crawl URL), so services are pinned here mirroring their live site's
  // mega-menu top-level categories EXACTLY and in order — Air Conditioning, Heating, Plumbing, Water Heater Services,
  // Indoor Air Quality, Water Treatment — replacing the generated guesses. Company name's three pillars (AC, Heating,
  // Plumbing) lead so they fill the home-page cards; the full set shows on /services + the marquee. yearsInBusiness 56
  // ("trusted since 1970" / "56 Years in Business" stated on the homepage). about copy lifted from their live
  // homepage intro. No font example → default font.
  "john-s-heating-cooling-and-plumbing": {
    yearsInBusiness: 56,
    // Designer picked imgi_4_GetImage.jpg (processed → p6.webp) as the hero; the theme uses
    // photos[0] as the hero media, so pin the order here (manual wins) with p6 first, rest follow.
    photos: [
      "/biz-photos/john-s-heating-cooling-and-plumbing/p6.webp",
      "/biz-photos/john-s-heating-cooling-and-plumbing/p1.webp",
      "/biz-photos/john-s-heating-cooling-and-plumbing/p2.webp",
      "/biz-photos/john-s-heating-cooling-and-plumbing/p3.webp",
      "/biz-photos/john-s-heating-cooling-and-plumbing/p4.webp",
      "/biz-photos/john-s-heating-cooling-and-plumbing/p5.webp",
      "/biz-photos/john-s-heating-cooling-and-plumbing/p7.webp",
    ],
    services: [
      {
        name: "Air Conditioning",
        slug: "air-conditioning",
        blurb:
          "AC service, repair, replacement, and installation on most makes and models — from troubleshooting and maintenance to ductless mini-splits — to keep you cool through the Valley summer.",
      },
      {
        name: "Heating",
        slug: "heating",
        blurb:
          "Furnace and heater repair, replacement, and maintenance plus full heat pump service, so your home stays warm and efficient all winter long.",
      },
      {
        name: "Plumbing",
        slug: "plumbing",
        blurb:
          "Licensed plumbers for drain cleaning, sewer line and leak detection, garbage disposal repair, and everyday plumbing service throughout Maricopa County.",
      },
      {
        name: "Water Heater Services",
        slug: "water-heater-services",
        blurb:
          "Repair, replacement, and tankless water heater installation that brings reliable hot water back to your home.",
      },
      {
        name: "Indoor Air Quality",
        slug: "indoor-air-quality",
        blurb:
          "High-efficiency filters, duct and dryer-vent cleaning, air purification, whole-house humidifiers, and HVAC zoning for cleaner, healthier air.",
      },
      {
        name: "Water Treatment",
        slug: "water-treatment",
        blurb:
          "Whole-home water filtration, purification, and water softener systems for cleaner, better-tasting water at every tap.",
      },
    ],
    generatedCopy: {
      aboutBody: [
        "When your home's comfort is at stake, John's Heating, Cooling, and Plumbing has been the trusted name for reliable HVAC and plumbing service in Mesa, Chandler, and the surrounding Valley since 1970. Our professionally trained, certified technicians and licensed plumbers are experts in their field, ready to work on most makes and models.",
        "We diagnose the situation, explain your options, and back everything we do with written guarantees that outshine the competition. Whether you're looking to stay cool in the summer, warm in the winter, or prevent costly plumbing issues, Just Call John's for expert solutions and lasting peace of mind.",
      ],
    },
  },
  // hv0015 Norris Air — Mesa HVAC contractor (norrisair.com; 3841 E Main St, Mesa AZ 85205; (480) 832-3330;
  // same-family-owned "Since 1973" / "over 50 years" → yearsInBusiness 53). Red script logo with a navy accent on a
  // white plate → reads on the default white nav pill. Primary brand color #de2929 (their red) + secondary #112855
  // (their navy) extracted from the two swatches the designer dropped as "Screenshot …png" → renamed to Color.png /
  // Second Color.png so process-assets picked them up; written to asset-overrides.json. 7 real photos wired via
  // asset-overrides.json. extract-services couldn't run (Gemini key invalid), so services are pinned HERE to mirror
  // their live site's top-level mega-menu categories EXACTLY and in order — AC, Heating, Indoor Air Quality, Ductless,
  // Mobile Home, Heat Pump, Maintenance Plan — replacing the generated guesses. Core categories lead so they fill the
  // home-page cards; the full set shows on /services + the marquee. about copy lifted from their live homepage. No
  // font example → default font.
  "norris-air": {
    yearsInBusiness: 53,
    services: [
      {
        name: "Air Conditioning",
        slug: "air-conditioning",
        blurb:
          "AC repair, emergency repair, tune-ups, installation, and replacement on most makes and models — keeping you cool through the Valley summer.",
      },
      {
        name: "Heating",
        slug: "heating",
        blurb:
          "Furnace and heater repair, installation, and replacement so your home stays warm and efficient through the winter.",
      },
      {
        name: "Indoor Air Quality",
        slug: "indoor-air-quality",
        blurb:
          "Solutions that filter, freshen, and purify the air in your home for healthier, cleaner indoor comfort year-round.",
      },
      {
        name: "Ductless",
        slug: "ductless",
        blurb:
          "Ductless mini-split installation and AC repair, plus commercial ductless HVAC service — efficient comfort for spaces without ductwork.",
      },
      {
        name: "Mobile Home",
        slug: "mobile-home",
        blurb:
          "Specialized heating and cooling for mobile and park-model homes, sized and installed for their unique HVAC requirements.",
      },
      {
        name: "Heat Pump",
        slug: "heat-pump",
        blurb:
          "Heat pump repair, installation, replacement, maintenance, and tune-ups for energy-efficient heating and cooling all year.",
      },
      {
        name: "Maintenance Plan",
        slug: "maintenance-plan",
        blurb:
          "Routine maintenance plans that keep your system running efficiently, extend its life, and head off costly breakdowns before they start.",
      },
    ],
    generatedCopy: {
      aboutBody: [
        "Norris Air is a same-family-owned and operated business serving Mesa and the surrounding Valley for over 50 years. By choosing Norris Air for your air conditioning and heating needs, you can be sure you are getting quality, reliable service every time.",
        "Our qualified, professional heating and cooling technicians are required to pass a background check and are committed to delivering complete satisfaction while exceeding our customers' expectations on every job.",
      ],
    },
  },
  // hv0014 ASAP Air Conditioning And Heating — Mesa HVAC contractor (asapairconditioningandheating.com; serves Mesa,
  // Gilbert, Tempe, Chandler, Apache Junction, Scottsdale; Trane Authorized Dealer, AZ ROC 104266, BBB A+, family
  // owned "since 1984" per their van graphic → yearsInBusiness 42). NO LOGO supplied → designer asked to write the
  // company name in the nav instead of a mark: logoBadge:false drops the "AA" initials chip and logoWordmark pins the
  // full name. Primary brand color #ff0200 (their red) extracted from the swatch the designer dropped as
  // "Screenshot …png" → renamed to Color.png so process-assets picked it up; written to asset-overrides.json. 4 real
  // photos wired via asset-overrides.json (p1 van-in-driveway hero, p2 tech at door, p3 AC unit repair, p4 storefront).
  // extract-services couldn't run (Gemini key invalid), so services are pinned HERE to mirror their live site EXACTLY:
  // their two service pages are titled "Air Conditioning And Heating Repair" and "Air Conditioning And Heating
  // Installation" (heating folded into both per the company name), plus "24/7 Emergency Service" advertised in their
  // homepage "Services We Offer" list. This REPLACES the generated guesses, which invented Indoor Air Quality, Heat
  // Pumps, and standalone Tune-Ups that their site never breaks out. No font example → default font.
  "asap-air-conditioning-and-heating": {
    logoBadge: false,
    logoWordmark: "ASAP Air Conditioning & Heating",
    yearsInBusiness: 42,
    photos: [
      "/biz-photos/asap-air-conditioning-and-heating/hero-original.webp",
      "/biz-photos/asap-air-conditioning-and-heating/ac-heating-repair.webp",
      "/biz-photos/asap-air-conditioning-and-heating/ac-heating-installation.webp",
      "/biz-photos/asap-air-conditioning-and-heating/emergency-service.webp",
    ],
    services: [
      {
        name: "A/C & Heating Repair",
        slug: "ac-repair",
        image: "/biz-photos/asap-air-conditioning-and-heating/ac-heating-repair.webp",
        blurb:
          "Fast, dependable air conditioning and heating repair for all makes and models. We provide a flat-rate, upfront quote after diagnostics and complete 99% of repairs on the spot to bring cool comfort back to your home or business.",
      },
      {
        name: "A/C & Heating Installation",
        slug: "ac-installation",
        image: "/biz-photos/asap-air-conditioning-and-heating/ac-heating-installation.webp",
        blurb:
          "Energy-efficient A/C, heat pump, and heating system installation and replacement. As a Trane Authorized Dealer — and Sales & Service for Goodman, Ruud, Day & Night and more — we offer same-day replacement and systems that lower your energy costs.",
      },
      {
        name: "24/7 Emergency Service",
        slug: "emergency-service",
        image: "/biz-photos/asap-air-conditioning-and-heating/emergency-service.webp",
        blurb:
          "When the Arizona heat won't wait, neither do we. Our technicians are ready to roll 24/7, with a free service call on any repair and flat-rate pricing so there are never any surprises.",
      },
    ],
  },
  // hv0005 Ideal Air Conditioning and Insulation — Phoenix HVAC + insulation contractor (idealairaz.com; serves
  // Ahwatukee, Chandler, Gilbert, Glendale, Mesa, Scottsdale, Tempe and the wider Valley; whole-home approach).
  // Logo is a green "ideal" wordmark with a yellow house mark + green leaf on transparent → reads on the default
  // white nav pill (no chromeDark). Primary brand color #4ebc4a (their green) + secondary #ffc333 (their yellow)
  // extracted from the two swatches the designer dropped as "Screenshot …png" → renamed to Color.png / Second
  // Color.png so process-assets picked them up; written to asset-overrides.json. 8 real photos wired via
  // asset-overrides.json. Hero: their live homepage runs a background video
  // (Ideal-Air-Conditioning-and-Insulation-BG-1.mp4) → downloaded to hero.mp4 and set as heroVideo.
  // extract-services couldn't run (Gemini key invalid), so services are pinned here mirroring their live site's
  // six top-level service categories EXACTLY and in order — Air Conditioning, Heating, Energy Audits, Insulation,
  // Ductwork, Indoor Air Quality — replacing the generated guesses, which omitted Insulation (in the company
  // name!), Energy Audits, and Ductwork. No font example → default font.
  "ideal-air-conditioning-and-insulation": {
    heroVideo: "/biz-photos/ideal-air-conditioning-and-insulation/hero.mp4",
    services: [
      {
        name: "Air Conditioning",
        slug: "air-conditioning",
        blurb:
          "AC installation, repair, maintenance, and replacement for every major brand — including ductless mini-splits and heat pumps — to keep your home cool through the Phoenix heat.",
      },
      {
        name: "Heating",
        slug: "heating",
        blurb:
          "Furnace and heat pump installation, repair, and maintenance so your home stays comfortable when desert nights turn cold.",
      },
      {
        name: "Energy Audits",
        slug: "energy-audits",
        blurb:
          "Blower door testing and infrared diagnostics pinpoint exactly where your home is losing energy — the first step to a more efficient, comfortable home.",
      },
      {
        name: "Insulation",
        slug: "insulation",
        blurb:
          "Blown-in cellulose, blown fiberglass, air sealing, and attic insulation removal that lock in comfort and lower your energy bills year-round.",
      },
      {
        name: "Ductwork",
        slug: "ductwork",
        blurb:
          "Custom duct design and professional duct sealing to balance airflow, boost efficiency, and deliver conditioned air to every room.",
      },
      {
        name: "Indoor Air Quality",
        slug: "indoor-air-quality",
        blurb:
          "MERV 13 filtration, ERV/HRV fresh-air systems, and CO detectors that keep the air in your home cleaner and healthier.",
      },
    ],
  },
  // hv0011 Cool Zone Air Conditioning & Heating — Phoenix HVAC contractor (coolzoneair.com; serves Phoenix,
  // Scottsdale, Glendale, Tempe, Peoria, Paradise Valley; 4.9★ / 606 reviews). Logo is a navy + cyan-gradient
  // "Cool Zone" wordmark on transparent SVG → reads cleanly on the default white nav pill (no chromeDark). Primary
  // brand color #123579 (their navy) extracted from the single swatch the designer dropped as "Screenshot …png" →
  // renamed to Color.png so process-assets picked it up; written to asset-overrides.json. No second swatch → theme
  // auto-derives the secondary. 7 real photos (service page-headers + site backgrounds) wired via
  // asset-overrides.json. extract-services couldn't run (Gemini key invalid), so services are pinned here mirroring
  // their live site's mega-menu EXACTLY — Air Conditioning (Repair / Installation / Maintenance / Ductless) +
  // Heating (Repair / Installation / Maintenance / Heat Pumps) + Indoor Air Quality, Whole-Home Air Purifiers,
  // Ductwork, Commercial Services, Preventative Maintenance — replacing the generated guesses (which collapsed
  // their split repair/install/maintenance pages and omitted Ductless AC, Air Purifiers, Ductwork, Commercial, and
  // Preventative Maintenance). Core six lead so they fill the home-page cards; the full catalog shows on /services
  // + the marquee. No font example → default font.
  "cool-zone-air-conditioning-and-heating": {
    services: [
      {
        name: "AC Repair",
        slug: "ac-repair",
        blurb:
          "Fast, accurate diagnosis and repair for every make and model — we get your home cool again and stand behind the fix.",
      },
      {
        name: "AC Installation",
        slug: "ac-installation",
        blurb:
          "Expertly sized, energy-efficient air conditioning systems installed by our team, with a detailed proposal and clean, professional workmanship.",
      },
      {
        name: "AC Maintenance",
        slug: "ac-maintenance",
        blurb:
          "Seasonal tune-ups that catch small problems early, protect your warranty, and keep your system running efficiently through Phoenix summers.",
      },
      {
        name: "Heating Repair",
        slug: "heating-repair",
        blurb:
          "Prompt repair of furnaces and heat pumps so your home stays warm when desert nights turn cold.",
      },
      {
        name: "Heating Installation",
        slug: "heating-installation",
        blurb:
          "Furnace and heating system installations matched to your home for dependable, efficient comfort all winter long.",
      },
      {
        name: "Heat Pumps",
        slug: "heat-pumps",
        blurb:
          "Efficient year-round heating and cooling from a single system — expert heat pump installation, repair, and replacement.",
      },
      {
        name: "Ductless AC",
        slug: "ductless-ac",
        blurb:
          "Mini-split systems that deliver targeted comfort to additions, garages, and rooms without existing ductwork.",
      },
      {
        name: "Heating Maintenance",
        slug: "heating-maintenance",
        blurb:
          "Preventative furnace and heat pump tune-ups that keep your heating safe, reliable, and running at peak efficiency.",
      },
      {
        name: "Indoor Air Quality",
        slug: "indoor-air-quality",
        blurb:
          "Solutions that reduce dust, allergens, and pollutants so the air throughout your home is cleaner and healthier.",
      },
      {
        name: "Whole-Home Air Purifiers",
        slug: "whole-home-air-purifiers",
        blurb:
          "Whole-house purification integrated into your HVAC to filter contaminants from every room, not just one.",
      },
      {
        name: "Ductwork",
        slug: "ductwork",
        blurb:
          "Duct inspection, sealing, repair, and replacement to eliminate leaks, balance airflow, and lower your energy bills.",
      },
      {
        name: "Commercial Services",
        slug: "commercial-services",
        blurb:
          "Reliable commercial HVAC installation, repair, and maintenance that keeps your business comfortable and running.",
      },
      {
        name: "Preventative Maintenance",
        slug: "preventative-maintenance",
        blurb:
          "Membership maintenance plans with priority service and regular checkups to maximize the life of your equipment.",
      },
    ],
  },
  // hv0012 Benefit Air Conditioning — Phoenix AZ HVAC contractor (benefitair.com). Logo is a red+blue twin-wave mark
  // over a black "BENEFITAIR" wordmark on white → process-assets knocks out the white so the dark wordmark reads on
  // the default white nav pill. Primary brand color #428ee2 (their site blue) extracted from the swatch the designer
  // dropped as a "Screenshot …png" → copied to Color.png so process-assets picked it up; written to asset-overrides.json.
  // 5 photos wired via asset-overrides.json — one plain Trane product render (imgi_7) was sidelined to _inbox/.../_skip/
  // since it isn't Benefit's own work, but the designer asked for the dramatic "Trane Specials" render (p5) as the hero.
  // No font example → default font. Photo order pinned here so that Trane Specials render leads as the hero (BizHero uses
  // photos[0]), then the 4 real photos follow with the busy 3-panel church/school collage (p1) parked last. services pinned HERE
  // to mirror their live site EXACTLY — the designer confirmed only the two service categories the site organizes
  // around: Residential and Commercial; blurbs distilled from each page's real copy (free SEER-rated system
  // replacement quotes, ductwork/air-distribution fixes, bi-annual planned maintenance / commercial equipment sales).
  "benefit-air-conditioning": {
    photos: [
      "/biz-photos/benefit-air-conditioning/p5.webp",
      "/biz-photos/benefit-air-conditioning/p2.webp",
      "/biz-photos/benefit-air-conditioning/p4.webp",
      "/biz-photos/benefit-air-conditioning/p3.webp",
      "/biz-photos/benefit-air-conditioning/p1.webp",
    ],
    services: [
      {
        name: "Residential Services",
        slug: "residential-services",
        blurb:
          "Home HVAC done right — free, SEER-rated quotes on high-efficiency system replacements, air-distribution fixes for hot and cold spots, and bi-annual planned maintenance to keep your equipment running in the Phoenix heat.",
      },
      {
        name: "Commercial Services",
        slug: "commercial-services",
        blurb:
          "Keeping offices, schools, churches, stores, and restaurants comfortable with planned equipment care, seasonal check-ups, and honest commercial equipment sales and replacement quotes.",
      },
    ],
  },
  // ro0098 Desert Sands Contracting — "Family Owned & Operated Roofing in Surprise" (desertsandsroofing.com,
  // Surprise AZ; also serves Peoria, Glendale, El Mirage, Sun City West; 3 generations). Logo is a sunrise-over-
  // rooftops mark in orange→gold with a DARK-NAVY "DESERT SANDS / ROOFING CONTRACTORS" wordmark on white →
  // process-assets knocks out the white so the dark wordmark reads cleanly on the default white nav pill (no
  // chromeDark needed). Primary brand color #ec703a (their orange) + secondary #dd9934 (their gold) extracted from
  // the two swatches the designer dropped as "Screenshot …png" → renamed to Color.png / Second Color.png so
  // process-assets picked them up; written to asset-overrides.json. 15 real photos wired via asset-overrides.json
  // (one exact-duplicate screenshot was removed from the inbox before processing). Services are pinned in
  // asset-overrides.json mirroring their live "Our Comprehensive Roofing Services" section EXACTLY and in order —
  // Residential Roofing, Mobile Home Roofing, Tile Roofs, Flat Roofs, Foam Roofs, Roof Inspection — replacing the
  // generic generated guesses (incl. a bogus "Shingle Roofing" the real site never mentions). No font example →
  // default font. Designer-chosen hero: imgi_41_close-up-roof-tiles → process-assets wrote it as p12.webp; BizHero
  // uses photos[0], so the gallery order is pinned here with p12 first, the rest following in original order.
  "desert-sands-contracting": {
    photos: [
      "/biz-photos/desert-sands-contracting/p12.webp",
      "/biz-photos/desert-sands-contracting/p1.webp",
      "/biz-photos/desert-sands-contracting/p2.webp",
      "/biz-photos/desert-sands-contracting/p3.webp",
      "/biz-photos/desert-sands-contracting/p4.webp",
      "/biz-photos/desert-sands-contracting/p5.webp",
      "/biz-photos/desert-sands-contracting/p6.webp",
      "/biz-photos/desert-sands-contracting/p7.webp",
      "/biz-photos/desert-sands-contracting/p8.webp",
      "/biz-photos/desert-sands-contracting/p9.webp",
      "/biz-photos/desert-sands-contracting/p10.webp",
      "/biz-photos/desert-sands-contracting/p11.webp",
      "/biz-photos/desert-sands-contracting/p13.webp",
      "/biz-photos/desert-sands-contracting/p14.webp",
      "/biz-photos/desert-sands-contracting/p15.webp",
    ],
  },
  // ro0097 Koala-T Roofing — female/family-owned roofer in Surprise, AZ serving the West Valley (koalatroofing.com,
  // 20+ yrs). Logo is a koala mascot (hard hat + hammer) beside gold diamonds, with a WHITE "Koala-T Roofing"
  // wordmark that ships on a transparent background → invisible on the default white nav pill. So chromeDark pins
  // the nav + footer near-black so the white wordmark stays visible (designer's note: "change the nav bar to black
  // so you can see the white parts of the logo"). Primary brand color #fbac07 (their gold) + secondary #00281b
  // (their dark green) extracted from the two swatches the designer dropped as "Screenshot …png" → renamed to
  // Color.png / Second Color.png so process-assets picked them up; written to asset-overrides.json. 14 real photos
  // wired via asset-overrides.json. extract-services couldn't run (Gemini key invalid), but asset-overrides.json
  // already carries their 5 real services in order — Roof Repair, Roof Replacement, New Roof Installation, Roof
  // Maintenance, Roof Inspections — matching their live site, so no manual services pin needed. No font example →
  // default font.
  "koala-t-roofing": {
    chromeDark: true,
  },
  // ro0096 All About Roofing LLC — "Protect what matters most!" (allaboutroofing.com, Surprise AZ; also serves Mesa,
  // Prescott, Tucson; 10+ years). Logo is a WHITE chevron/roof mark + white "ALL ABOUT ROOFING LLC" wordmark with a
  // red tagline, shipped on a TRANSPARENT background (.webp) → process-assets keeps it as-is rather than knocking out
  // white. Because the artwork is WHITE, chromeDark pins the nav + footer near-black so the light logo stays visible
  // (designer's note: "make the menu bar black so you can see the light parts of the logo"). Primary brand color
  // #e02c1f (their red) extracted from the swatch the designer dropped as a "Screenshot …png" → renamed to Color.png
  // so process-assets picked it up; written to asset-overrides.json. 11 real photos wired via asset-overrides.json.
  // extract-services couldn't run (Gemini key invalid), so services are pinned HERE to mirror their live "Our Services"
  // section EXACTLY and in order — Residential, Commercial, Demolition, Sealing, Foam, Shingle, Tile Refelt, Tile
  // Replacement, Metal, Flat; blurbs distilled from their real site copy. No font example → default font.
  "all-about-roofing-llc": {
    chromeDark: true,
    services: [
      { name: "Residential Roofing", slug: "residential-roofing", blurb: "Full-service roofing for Arizona homes — repairs, replacements, and new installs across tile, shingle, foam, and flat roofs." },
      { name: "Commercial Roofing", slug: "commercial-roofing", blurb: "Dependable flat, foam, and metal roof systems for commercial buildings, built to stand up to the desert sun." },
      { name: "Roof Demolition", slug: "roof-demolition", blurb: "Clean, complete tear-off and removal of your old roof to prepare the deck for a fresh, watertight system." },
      { name: "Roof Sealing", slug: "roof-sealing", blurb: "Protective sealing and coatings that lock out moisture and extend the life of your existing roof." },
      { name: "Foam Roof Installation", slug: "foam-roof-installation", blurb: "Seamless spray-foam roofing that insulates and waterproofs flat and low-slope roofs in one durable layer." },
      { name: "Shingle Roof Replacement", slug: "shingle-roof-replacement", blurb: "Quality asphalt shingle replacement for residential homes, installed to last and boost curb appeal." },
      { name: "Tile Roof Refelt", slug: "tile-roof-refelt", blurb: "Underlayment replacement that renews the waterproof layer beneath your existing tile without a full tear-off." },
      { name: "Tile Roof Replacement", slug: "tile-roof-replacement", blurb: "Complete tile roof system replacement using premium materials built for long-term Arizona performance." },
      { name: "Metal Roof Installation", slug: "metal-roof-installation", blurb: "Long-lasting metal roofing that delivers enhanced durability and energy efficiency for any property." },
      { name: "Flat Roof Replacement", slug: "flat-roof-replacement", blurb: "Reliable flat-roof replacement for commercial and residential buildings, engineered against heat and monsoon storms." },
    ],
  },
  // ro0094 Gen2Roofing, LLC — "Phoenix Commercial and Residential Roof Repair" (gen2roofing.com, Phoenix AZ,
  // ROC #345482). Second-generation family roofer: tile, shingles, flat/foam, patio roofs. Logo is a multi-color
  // "GEN2ROOFING LLC" wordmark (black + blue + green, saw-blade/roof figure) that ships on white → process-assets
  // knocks out the white so it reads on the default white nav pill; the dark text stays legible so no chromeDark.
  // Primary brand color #1c80ac (their site blue) extracted from the swatch the designer dropped as a "Screenshot
  // …png" → renamed to Color.png so process-assets picked it up; written to asset-overrides.json. 6 real photos wired
  // via asset-overrides.json. extract-services couldn't run (Gemini key invalid), so services are pinned HERE to
  // mirror their live "Our Services" section EXACTLY and in order — Residential Roofing, Commercial Roofing,
  // Additional Services; blurbs distilled from their real site copy. No font example → default font.
  "gen2roofing": {
    services: [
      { name: "Residential Roofing", slug: "residential-roofing", blurb: "We repair or install all types of residential roofs — including tile, shingle, flat/foam, and patio roofs — across the entire Phoenix valley area." },
      { name: "Commercial Roofing", slug: "commercial-roofing", blurb: "Expert service for commercial flat and foam roofs, including expansion cracks, ponding water, roof jacks, blisters, and elastomeric coatings." },
      { name: "Additional Services", slug: "additional-services", blurb: "Beyond roofing, we handle other home projects too — plumbing, electrical, BINSR items, water heaters, and interior and exterior remodel work." },
    ],
  },
  // ro0092 Amax Roofing Inc. — "The Experts On Top" (amaxroofinginc.squarespace.com, Peoria AZ). Logo is a white
  // "AMAX ROOFING INC." wordmark + orange hammer/rooftop badge that ships on a TRANSPARENT background (alpha mean 48),
  // so process-assets keeps it as-is rather than knocking out white. Because the logo is WHITE, chromeDark pins the
  // nav + footer near-black so it stays visible (designer's note: "make the navbar black"). Primary brand color
  // #ff914d (their orange) extracted from the swatch the designer dropped as a "Screenshot …png" → renamed to
  // Color.png so process-assets picked it up; written to asset-overrides.json. 7 real roof photos wired via
  // asset-overrides.json. extract-services couldn't run (Gemini key invalid), so services are pinned HERE to mirror
  // their live "Services We Offer" accordion EXACTLY and in order — Tile, Shingle, Foam, Metal, Flat, Roof Coatings,
  // Single Ply, Roof Repairs (their on-site descriptions were placeholders, so blurbs are distilled for each). This
  // services override REPLACES the AI-generated guesses cached in asset-overrides.json. No font example → default font.
  "amax-roofing-inc": {
    chromeDark: true,
    services: [
      { name: "Tile Roofs", slug: "tile-roofs", blurb: "Expert tile roof installation, repair, and replacement built to last in the Arizona sun." },
      { name: "Shingle Roofs", slug: "shingle-roofs", blurb: "Durable, cost-effective shingle roofing for standard sloped homes across the Valley." },
      { name: "Foam Roofs", slug: "foam-roofs", blurb: "Seamless spray-foam roof systems that insulate and protect flat and low-slope roofs." },
      { name: "Metal Roofs", slug: "metal-roofs", blurb: "Long-lasting metal roofing for residential and commercial properties that stands up to the heat." },
      { name: "Flat Roofs", slug: "flat-roofs", blurb: "Reliable flat-roof solutions engineered for desert heat and monsoon storms." },
      { name: "Roof Coatings", slug: "roof-coatings", blurb: "Energy-efficient cool-roof coatings that extend roof life and lower your cooling bills." },
      { name: "Single Ply Roofs", slug: "single-ply-roofs", blurb: "TPO and single-ply membrane systems for dependable, watertight commercial roofs." },
      { name: "Roof Repairs", slug: "roof-repairs", blurb: "Fast leak detection and repair to permanently resolve urgent moisture problems." },
    ],
  },
  // ro0089 Allstate Roofing Inc. — "AZ Roofing Contractors Serving The Entire Phoenix Valley"
  // (allstateroofingaz.com, Peoria AZ). Logo is a two-tone "ALLSTATE ROOFING" wordmark with an AR monogram in
  // olive-gold + copper on white → process-assets knocks out the white so it reads on the default white nav pill.
  // Heavy squared/blocky sans wordmark → fontKey "bold" (Archivo). Primary brand color #88781e (olive-gold)
  // extracted from the swatch the designer dropped as a "Screenshot …png" → renamed to Color.png so process-assets
  // picked it up (written to asset-overrides.json). No second-color swatch was supplied, so the logo's copper accent
  // is pinned here as brandColor2 so the service flip-cards stay two-tone on-brand. 7 real roof photos wired via
  // asset-overrides.json; gallery order pinned here with the cinematic luxury-home shot (p6, their site's hero bg)
  // first since BizHero uses photos[0], then the branded install photo and finished-roof work — the generic aerial
  // stadium filler (p2) is dropped. services pinned HERE to mirror their live site EXACTLY: Tile, Shingle, Foam,
  // Flat Roof, Re-Roofing, Roof Repair (also in asset-overrides.json via the manual services I wrote when the
  // extract-services Gemini step was unavailable; blurbs distilled from their real site copy).
  "allstate-roofing-inc-peoria": {
    fontKey: "bold",
    brandColor2: "#a06a3c",
    photos: [
      "/biz-photos/allstate-roofing-inc-peoria/p6.webp",
      "/biz-photos/allstate-roofing-inc-peoria/p7.webp",
      "/biz-photos/allstate-roofing-inc-peoria/p4.webp",
      "/biz-photos/allstate-roofing-inc-peoria/p3.webp",
      "/biz-photos/allstate-roofing-inc-peoria/p5.webp",
      "/biz-photos/allstate-roofing-inc-peoria/p1.webp",
    ],
    services: [
      { name: "Tile Roofing", slug: "tile-roofing", blurb: "Expert tile roof installation and repair built to last in the Arizona sun." },
      { name: "Shingle Roofing", slug: "shingle-roofing", blurb: "Durable, cost-effective shingle roofs for standard sloped homes." },
      { name: "Foam Roofing", slug: "foam-roofing", blurb: "Seamless foam roof systems that insulate and protect flat and low-slope roofs." },
      { name: "Flat Roof Systems", slug: "flat-roof-systems", blurb: "Reliable flat roof solutions engineered for desert heat and monsoon storms." },
      { name: "Re-Roofing", slug: "re-roofing", blurb: "Full re-roofs that replace worn roofing with a fresh, long-lasting system." },
      { name: "Roof Repair", slug: "roof-repair", blurb: "Fast leak detection and repair to permanently resolve urgent moisture problems." },
    ],
  },
  // ro0081 Select Roofing — "Professional Roofers in Glendale, Arizona" (selectroofingaz.com, (602) 525-4738,
  // Glendale AZ). Logo is a red+blue "SELECT ROOFING" wordmark (rooftop figures) on white → process-assets knocks
  // out the white so it reads on the default white nav pill. Heavy bold sans wordmark → fontKey "bold" (Archivo).
  // Primary brand color #4683b4 (their site blue) extracted from the swatch the designer dropped as a
  // "Screenshot …png" → renamed to Color.png so process-assets picked it up; written to asset-overrides.json.
  // 6 real roof photos wired via asset-overrides.json. Designer-chosen hero: imgi_21 → process-assets wrote it as
  // p5.webp; BizHero uses photos[0], so the gallery order is pinned here with p5 first, the rest in original order.
  // services pinned HERE to mirror their live site EXACTLY and in order — Residential, Commercial, Emergency,
  // Gutter, Roof Inspections, Hail & Storm Damage; blurbs distilled from each service's site copy.
  "select-roofing": {
    fontKey: "bold",
    photos: [
      "/biz-photos/select-roofing/p5.webp",
      "/biz-photos/select-roofing/p1.webp",
      "/biz-photos/select-roofing/p2.webp",
      "/biz-photos/select-roofing/p3.webp",
      "/biz-photos/select-roofing/p4.webp",
      "/biz-photos/select-roofing/p6.webp",
    ],
    services: [
      { name: "Residential Roofing", slug: "residential-roofing", blurb: "A full range of residential roofing services — repairs, replacements, and new installations — for shingle and tile roofs across Glendale." },
      { name: "Commercial Roofing", slug: "commercial-roofing", blurb: "Repairs, replacements, and maintenance for businesses of any size, with quality craftsmanship and dependable service." },
      { name: "Emergency Services", slug: "emergency-services", blurb: "24/7 emergency roofing to make sure your roof is repaired quickly and efficiently when you need it most." },
      { name: "Gutter Services", slug: "gutter-services", blurb: "Gutter cleaning, repair, and installation to keep your gutters flowing and protect your home from water damage." },
      { name: "Roof Inspections", slug: "roof-inspections", blurb: "Our team inspects your roof and provides a detailed report on its condition, along with any necessary repairs." },
      { name: "Hail and Storm Damage", slug: "hail-and-storm-damage", blurb: "Expert repair of hail and storm damage — and we coordinate directly with your insurance company to make it painless." },
    ],
  },
  // ro0090 Phoenix Pro Roofing — "Roofers in Phoenix, AZ" (phoenixproroofing.com, Peoria/Phoenix AZ). Logo is a bold
  // all-caps "PHOENIX PRO ROOFING" wordmark with a red+black roof-peak figure on white → process-assets knocks out the
  // white so it reads on the default white nav pill. Heavy bold sans wordmark → fontKey "bold" (Archivo). Primary brand
  // color #9a0000 (their site red) extracted from the swatch the designer dropped as a "Screenshot …png" → renamed to
  // Color.png so process-assets picked it up; written to asset-overrides.json. 8 real roof photos wired via
  // asset-overrides.json. extract-services captured 6 of their services but their live Services menu markets 9
  // residential lines, so services are pinned HERE to mirror the site EXACTLY and in order — Roof Repair, Roof
  // Replacement, Roof Inspection, Architectural Shingle, Tile, Foam, Metal, Flat, Roof Coatings; blurbs reuse the
  // extracted copy where present and are distilled from the site for the three the extractor missed.
  "phoenix-pro-roofing": {
    fontKey: "bold",
    // Designer-chosen hero: imgi_6_IMG_7002 → process-assets wrote it as p4.webp; BizHero uses photos[0], so the
    // gallery order is pinned here with p4 first, the rest in original order.
    photos: [
      "/biz-photos/phoenix-pro-roofing/p4.webp",
      "/biz-photos/phoenix-pro-roofing/p1.webp",
      "/biz-photos/phoenix-pro-roofing/p2.webp",
      "/biz-photos/phoenix-pro-roofing/p3.webp",
      "/biz-photos/phoenix-pro-roofing/p5.webp",
      "/biz-photos/phoenix-pro-roofing/p6.webp",
      "/biz-photos/phoenix-pro-roofing/p7.webp",
      "/biz-photos/phoenix-pro-roofing/p8.webp",
    ],
    services: [
      { name: "Roof Repair", slug: "roof-repair", blurb: "Our roofing contractor provides roof repairs that are often the right move when damage is limited and the surrounding system still has useful life left." },
      { name: "Roof Replacement", slug: "roof-replacement", blurb: "We offer full roof installation for Valley homeowners, resolving recurring leaks and restoring confidence in your roof." },
      { name: "Roof Inspection", slug: "roof-inspection", blurb: "A detailed inspection report can be a negotiation asset for sellers, documenting roof condition, maintenance, or a recent replacement." },
      { name: "Architectural Shingle Roofing", slug: "architectural-shingle-roofing", blurb: "Our services include work with architectural shingles, tailored to local property types and neighborhood appearance standards." },
      { name: "Tile Roofing", slug: "tile-roofing", blurb: "We provide residential roofing covering concrete and clay tile, including broken tile replacement and fixing faded or mismatched tiles." },
      { name: "Foam Roofing", slug: "foam-roofing", blurb: "We offer foam roofing systems, suitable for a wide range of Valley properties and Arizona's intense sun and heat." },
      { name: "Metal Roofing", slug: "metal-roofing", blurb: "Durable, energy-efficient metal roofing built to stand up to Arizona sun and monsoon storms — a long-lasting option for Valley homes and businesses." },
      { name: "Flat Roofing", slug: "flat-roofing", blurb: "Specialized flat and low-slope roofing for homes and commercial buildings, sealed to handle ponding water and intense desert heat." },
      { name: "Roof Coatings", slug: "roof-coatings", blurb: "Protective roof coatings that extend the life of your existing roof, reflect heat, and seal out leaks before they start." },
    ],
  },
  // ro0091 Castile Roofing — Peoria (castileroofing.com/peoria, Peoria AZ). Logo is a light-blue "castile ROOFING"
  // castle wordmark on white → process-assets keeps it transparent for the white nav pill. Primary brand color
  // #6ebcd9 (their site light blue) extracted from the swatch the designer dropped as a "Screenshot …png" → renamed
  // to Color.png so process-assets picked it up; written to asset-overrides.json. 6 real roof photos wired via
  // asset-overrides.json. Designer-chosen hero: imgi_20_MainSlider1 (their site's slider — tile-roofed estate) →
  // process-assets wrote it as p5.webp; BizHero uses photos[0], so the gallery order is pinned here with p5 first,
  // the rest in original order. services match the live site exactly and stay in asset-overrides.json.
  "castile-roofing-peoria": {
    photos: [
      "/biz-photos/castile-roofing-peoria/p5.webp",
      "/biz-photos/castile-roofing-peoria/p1.webp",
      "/biz-photos/castile-roofing-peoria/p2.webp",
      "/biz-photos/castile-roofing-peoria/p3.webp",
      "/biz-photos/castile-roofing-peoria/p4.webp",
      "/biz-photos/castile-roofing-peoria/p6.webp",
    ],
  },
  // ro0083 Glendale Roofing Pros — Roof Repair & Replacement (glendaleazroofing.com, (602) 753-5333, Glendale AZ).
  // NO logo provided by the designer → render the brand as a plain text wordmark "Glendale Roofing Pros" in place of
  // a logo: logoBadge:false drops the little square badge and logoWordmark pins the clean name (the generated `name`
  // is the long "… - Roof Repair & Replacement", which would truncate). Primary brand color #0170ba (their site blue)
  // extracted from the swatch the designer dropped as a "Screenshot …png" → renamed to Color.png so process-assets
  // picked it up; written to asset-overrides.json. 12 real roof photos wired via asset-overrides.json (the swatch
  // file was removed from _inbox so it wasn't processed as a gallery photo). extract-services couldn't run (Gemini
  // key invalid), so services are pinned HERE to mirror their live Services menu EXACTLY and in order — Residential,
  // Commercial, Roof Replacement, Roof Inspection, Roof Leak Repair, Concrete Tile, Flat, Metal, Roof Maintenance —
  // blurbs distilled from each service page's meta description. No font example → default font.
  "glendale-roofing-pros-roof-repair-and-replacement": {
    logoBadge: false,
    logoWordmark: "Glendale Roofing Pros",
    services: [
      { name: "Residential Roofing", slug: "residential-roofing", blurb: "A licensed company with years of experience and a commitment to quality and high working standards on every Glendale home we protect." },
      { name: "Commercial Roofing", slug: "commercial-roofing", blurb: "Businesses across Glendale trust us with their commercial roofing — voted Best in Glendale for quick, professional service." },
      { name: "Roof Replacement", slug: "roof-replacement", blurb: "Our replacement experts walk you through the most cost-effective way to get it done. Call for your free estimate." },
      { name: "Roof Inspection", slug: "roof-inspection", blurb: "Inspections are key to avoiding costly repairs — ask about our 50-point inspection for Glendale homeowners." },
      { name: "Roof Leak Repair", slug: "roof-leak-repair", blurb: "Repairing a roof leak quickly is key to avoiding costly future damage. We make the process quick and painless." },
      { name: "Concrete Tile Roofing", slug: "concrete-tile-roofing", blurb: "One of the most crucial aspects of any home is the roof. We install and replace concrete tile roof systems built for Arizona." },
      { name: "Flat Roofing", slug: "flat-roofing", blurb: "Many buildings in Glendale have a flat roof — including commercial and industrial properties — and we keep them sealed and protected." },
      { name: "Metal Roofing", slug: "metal-roofing", blurb: "Metal roofing offers durability and energy efficiency that make it the perfect fit for many Glendale roofing projects." },
      { name: "Roof Maintenance", slug: "roof-maintenance", blurb: "Routine maintenance is key to avoiding costly repairs down the line. Ask about our 50-point inspection — call today for a free estimate." },
    ],
  },
  // ro0088 Peoria Roofing — Roof Repair & Replacement (roofing-peoria.com, Peoria AZ). NO logo provided by the
  // designer → render the brand as a plain text wordmark in place of a logo: logoBadge:false drops the little square
  // initials badge and logoWordmark pins the clean name (the generated `name` is the long "… - Roof Repair &
  // Replacement", which would truncate). Per the designer's note the wordmark is spelled "Piera Roofing" (NOT the
  // generated "Peoria Roofing") — flagged with the designer in case it's a typo. Primary brand color #0170ba (their
  // site blue) extracted from the swatch the designer dropped as a "Screenshot …png" → renamed to Color.png so
  // process-assets picked it up; written to asset-overrides.json. 10 real roof photos wired via asset-overrides.json
  // (the swatch file was removed from _inbox so it wasn't processed as a gallery photo). extract-services couldn't
  // reach their live site, so the originally generated services flow through unchanged. No font example → default font.
  "peoria-roofing-roof-repair-and-replacement": {
    logoBadge: false,
    logoWordmark: "Piera Roofing",
  },
  // ro0100 Surprise Roofing Repair & Replacement (roofing-surprise.com, Surprise AZ). NO logo provided by the
  // designer → render the brand as a plain text wordmark "Surprise Roofing" in place of a logo: logoBadge:false drops
  // the little square initials badge and logoWordmark pins the clean name (the generated `name` is the long "…
  // Repair & Replacement", which would truncate). Primary brand color #0170ba (their site blue) extracted from the
  // swatch the designer dropped as a "Screenshot …png" → renamed to Color.png so process-assets picked it up; written
  // to asset-overrides.json. 11 real roof photos wired via asset-overrides.json. Their services were re-pinned in
  // asset-overrides.json to exactly match their live site's service menu (Residential, Commercial, Roof Replacement,
  // Roof Inspection, Roof Leak Repair, Concrete Tile, Flat, Metal, Roof Maintenance). No font example → default font.
  "surprise-roofing-repair-and-replacement": {
    logoBadge: false,
    logoWordmark: "Surprise Roofing",
  },
  // ro0086 Precision Roofing LLC (founded by John Mosley, full-service AZ roofer, services the whole valley). NO
  // logo provided by the designer → render the brand as a plain text wordmark "Precision Roofing AZ" in place of a
  // logo: logoBadge:false drops the little square initials badge and logoWordmark pins the clean name (the generated
  // `name` is "Precision Roofing LLC"). Primary brand color #102148 (their navy) extracted from the swatch the
  // designer dropped as a "Screenshot …png" → renamed to Color.png so process-assets picked it up; written to
  // asset-overrides.json. 6 real roof photos wired via asset-overrides.json (the swatch + a duplicate/stock aerial
  // were moved out of _inbox so they weren't processed as gallery photos). Their 6 real services (Roof Repair, Roof
  // Installation, Tile Roofing, Metal Roofing, Roof Coating, Roof Maintenance) were already extracted from their
  // live site into asset-overrides.json, so they flow through unchanged. No font example → default font.
  // Designer-chosen hero: imgi_8 (cedar-shake re-roof with stone chimneys) → process-assets wrote it as p6.webp;
  // BizHero uses photos[0], so the gallery order is pinned here with p6 first, the rest following in original order.
  "precision-roofing-llc": {
    logoBadge: false,
    logoWordmark: "Precision Roofing AZ",
    photos: [
      "/biz-photos/precision-roofing-llc/p6.webp",
      "/biz-photos/precision-roofing-llc/p1.webp",
      "/biz-photos/precision-roofing-llc/p2.webp",
      "/biz-photos/precision-roofing-llc/p3.webp",
      "/biz-photos/precision-roofing-llc/p4.webp",
      "/biz-photos/precision-roofing-llc/p5.webp",
    ],
  },
  // ro0079 Allstate Roofing Inc (allstateroofingaz.com — "Arizona's Top Rated Roofing Company Since 2001", est.
  // 2001 / 25 yrs). NOTE: distinct campaign from ro0006 (slug phoenix-roofers-by-allstate-roofing-contractors),
  // same underlying company. Logo is a bold squared "ALLSTATE ROOFING" wordmark with an olive/gold + copper "AR"
  // mark; process-assets knocks out the white so it reads on the default white nav pill. Primary brand color
  // #88781e (olive/gold from the logo) extracted from the swatch the designer dropped as a "Screenshot …png" →
  // renamed to Color.png so process-assets picked it up. Logo + 6 real roof photos wired via asset-overrides.json.
  // extract-services couldn't run (Gemini key invalid), so services are pinned HERE to mirror their live Services
  // dropdown EXACTLY and in order — Tile Roofing, Shingle Roofing, Roof Repair, Foam Roofing. Blurbs carried over
  // verbatim from the prior Allstate extract. Logo font is a heavy industrial geometric sans → fontKey "bold".
  // Designer-chosen hero: imgi_101_Shingle-roof-lp → process-assets wrote it as p4.webp; BizHero uses photos[0], so
  // the gallery order is pinned here with p4 first, the rest following in their original order.
  "allstate-roofing-inc": {
    fontKey: "bold",
    photos: [
      "/biz-photos/allstate-roofing-inc/p4.webp",
      "/biz-photos/allstate-roofing-inc/p1.webp",
      "/biz-photos/allstate-roofing-inc/p2.webp",
      "/biz-photos/allstate-roofing-inc/p3.webp",
      "/biz-photos/allstate-roofing-inc/p5.webp",
      "/biz-photos/allstate-roofing-inc/p6.webp",
    ],
    services: [
      {
        name: "Tile Roofing",
        slug: "tile-roofing",
        blurb:
          "Our licensed team specializes in tile systems designed specifically to withstand the Valley’s unique climate.",
      },
      {
        name: "Shingle Roofing",
        slug: "shingle-roofing",
        blurb:
          "Our licensed team specializes in shingle systems designed specifically to withstand the Valley’s unique climate.",
      },
      {
        name: "Roof Repair",
        slug: "roof-repair",
        blurb:
          "Whether you need emergency roof repair in Phoenix or a complete residential roof replacement, our licensed team specializes in tile, shingle, and foam systems designed specifically to withstand the Valley’s unique climate.",
      },
      {
        name: "Foam Roofing",
        slug: "foam-roofing",
        blurb:
          "Our licensed team specializes in foam systems designed specifically to withstand the Valley’s unique climate.",
      },
    ],
  },
  // ro0078 Simply Roofing Co — Glendale (simplyroofingco.com/glendale-az, (623) 303-8767). Logo is a green/blue
  // "SIMPLY ROOFING CO" wordmark with a green roof-peak mark; process-assets knocks out the white so it reads on
  // the default white nav pill (no navBg override needed). Primary brand color #61ce70 (their site green) extracted
  // from the swatch the designer dropped as a "Screenshot …png" → renamed to Color.png so process-assets picked it
  // up. Logo + 6 real roof photos wired via asset-overrides.json. extract-services couldn't run (Gemini key
  // invalid), but the services already cached in asset-overrides.json mirror their live Services menu EXACTLY —
  // Roofing Repair, Roofing Maintenance, Roof Replacement, Roof Installation, Emergency Roofing Services,
  // Commercial Roofing, with verbatim blurbs — so no services override is needed here. Logo is a heavy industrial
  // geometric sans → fontKey "bold" (Archivo).
  "simply-roofing-glendale": {
    fontKey: "bold",
  },
  // ro0077 Jim Brown and Sons Roofing / JBS Roofing (jbsroofingaz.com, Glendale AZ — family-run, 42 yrs). Logo is a
  // navy "JBS ROOFING" wordmark on a white plate → process-assets knocks out the white so the navy mark reads cleanly
  // on the default white nav pill (no navBg override needed). Primary brand color #0a4b73 (their site navy) extracted
  // from the swatch the designer dropped as a "Screenshot …png" → renamed to Color.png so process-assets picked it up.
  // Logo + 9 real roof photos wired via asset-overrides.json. extract-services couldn't run (Gemini key invalid), so
  // services are pinned here to mirror their live Services menu EXACTLY — the 7 residential services they list (Foam,
  // Tile, Shingle, Flat, Roof Repair, Attic Insulation, Rain Gutters) plus Commercial Roofing as its own category.
  // The 6 roof-type/repair/commercial blurbs are verbatim from JBS's site (carried over from the prior extract);
  // Attic Insulation + Rain Gutters added to complete the match. Generated catalog replaced wholesale. No font
  // example → default. Designer-chosen hero: imgi_65_roofing_contractor_phoenix → process-assets wrote it as
  // p6.webp; BizHero uses photos[0], so the gallery order is pinned here with p6 first, the rest following in
  // their original order.
  "jim-brown-and-sons-roofing": {
    photos: [
      "/biz-photos/jim-brown-and-sons-roofing/p6.webp",
      "/biz-photos/jim-brown-and-sons-roofing/p1.webp",
      "/biz-photos/jim-brown-and-sons-roofing/p2.webp",
      "/biz-photos/jim-brown-and-sons-roofing/p3.webp",
      "/biz-photos/jim-brown-and-sons-roofing/p4.webp",
      "/biz-photos/jim-brown-and-sons-roofing/p5.webp",
      "/biz-photos/jim-brown-and-sons-roofing/p7.webp",
      "/biz-photos/jim-brown-and-sons-roofing/p8.webp",
      "/biz-photos/jim-brown-and-sons-roofing/p9.webp",
    ],
    services: [
      { name: "Shingle Roofs", slug: "shingle-roofs", blurb: "Shingle roofs are one of the most popular roof types in Phoenix. They’re affordable, durable and offer a variety of styles, colors and material types, lending great opportunity to add curb appeal to your home." },
      { name: "Tile Roofs", slug: "tile-roofs", blurb: "Tile Roofs define many communities in Phoenix, as well as the unique feel of the Southwest. Tiles come in a variety of materials like concrete, clay and sandcast, with concrete being the most popular." },
      { name: "Foam Roofs", slug: "foam-roofs", blurb: "Foam Roofs are a popular choice for their reflective nature and natural cool roof properties due to their white color. The main material used by Phoenix roofers in foam roofs is polyurethane, which is then coated." },
      { name: "Flat Roofs", slug: "flat-roofs", blurb: "Flat Roofs are another roof type that give Phoenix its unique feel. Flat roofs are a durable and cost-effective roofing solution." },
      { name: "Roof Repair", slug: "roof-repair", blurb: "Our highly experienced roof inspectors will locate the source of your leak(s) and perform a thorough inspection to determine next steps. Most roof repairs are straight forward." },
      { name: "Attic Insulation", slug: "attic-insulation", blurb: "Proper attic insulation keeps your home cooler in the Arizona heat, lowers energy bills, and protects your roof system — a smart upgrade that pays for itself over time." },
      { name: "Rain Gutters", slug: "rain-gutters", blurb: "Professionally installed rain gutters channel water away from your roof, walls and foundation, preventing erosion and water damage during monsoon season." },
      { name: "Commercial Roofing", slug: "commercial-roofing", blurb: "JBS has worked closely with property managers, owners, as well as state and government agencies to design, build and repair commercial roofing systems that are built to last, protecting your assets." },
    ],
  },
  // ro0087 Essential Roofing Guys Peoria (essentialroofingguys.com/peoria-az, Peoria AZ). Logo is a bright-yellow
  // "ESSENTIAL ROOFING GUYS" wordmark on a TRANSPARENT bg (alpha mean ~60) — yellow on the default white nav pill
  // is unreadable, so chromeDark paints the nav + footer near-black and the yellow wordmark pops. Primary brand
  // color #ece700 (their yellow) extracted from the swatch the designer dropped as a "Screenshot …png" → renamed to
  // Color.png so process-assets read it as a color, not a gallery photo. Logo + 6 real roof photos wired via
  // asset-overrides.json. Services already in asset-overrides (extract-services) and VERIFIED against the live
  // /peoria-az page — the exact 6 they list (Emergency Roof Repair, Leak Detection, Shingle, Flashing, Gutter,
  // Skylight), so no services override needed here. No font example → default font.
  "essential-roofing-guys-peoria": {
    chromeDark: true,
  },
  // ro0076 Glendale Roofing & Construction LLC (glendaleroofing.com, Peoria/Glendale AZ — locally owned since 1961).
  // Logo is a WHITE mark on transparent → a white nav pill would erase it, so per designer note → navBg = black
  // (#0d0d0d): the nav pill goes near-black, the white logo reads cleanly, footer stays white. Primary brand color
  // #f6061a (their site red) extracted from the swatch the designer dropped as a "Screenshot …png" → renamed to
  // Color.png so process-assets picked it up. Logo + 6 real roof photos wired via asset-overrides.json. Services
  // pinned here to mirror their live site EXACTLY — the 7 services listed on glendaleroofing.com (Residential,
  // Commercial, Roof Repair, Insurance Claims, Ventilation, Fascia/Wood Replacement, Flat Roofs). Generated catalog
  // replaced wholesale. No font example → default.
  "glendale-roofing-and-construction-llc": {
    navBg: "#0d0d0d",
    // Designer pinned imgi_34 (→ p3.webp) as the hero, so the photos array is reordered to lead with it
    // (hero = photos[0]); the rest follow for the gallery.
    photos: [
      "/biz-photos/glendale-roofing-and-construction-llc/p3.webp",
      "/biz-photos/glendale-roofing-and-construction-llc/p1.webp",
      "/biz-photos/glendale-roofing-and-construction-llc/p2.webp",
      "/biz-photos/glendale-roofing-and-construction-llc/p4.webp",
      "/biz-photos/glendale-roofing-and-construction-llc/p5.webp",
      "/biz-photos/glendale-roofing-and-construction-llc/p6.webp",
    ],
    services: [
      { name: "Residential Roofing", slug: "residential-roofing", blurb: "Expert residential roofing — installation, replacement, and re-roofs built to protect your home and stand up to the Arizona sun." },
      { name: "Commercial Roofing", slug: "commercial-roofing", blurb: "Reliable commercial roofing systems for businesses across the West Valley, completed with minimal disruption to your operations." },
      { name: "Roof Repair", slug: "roof-repair", blurb: "Fast, precise roof repairs that stop leaks and damage before minor issues turn into major expenses." },
      { name: "Insurance Claims", slug: "insurance-claims", blurb: "We help you navigate the insurance claims process from inspection to completed repair, making storm and damage recovery simple." },
      { name: "Ventilation Solutions", slug: "ventilation-solutions", blurb: "Proper attic and roof ventilation to keep your home cooler, lower energy costs, and extend the life of your roof." },
      { name: "Fascia/Wood Replacement", slug: "fascia-wood-replacement", blurb: "Replacement of damaged fascia and wood to restore your roof's structure, edge, and clean finished look." },
      { name: "Flat Roofs", slug: "flat-roofs", blurb: "Durable flat and low-slope roofing solutions engineered for seamless waterproofing through Arizona's heat and monsoon season." },
    ],
  },
  // ro0075 Essential Roofing Guys (essentialroofingguys.com/glendale-az, Glendale AZ). Per the designer's note:
  // change only the logo, brand color, and copy — KEEP the stock gallery (their real site is image-light, no good
  // photos), so no photos were dropped and process-assets wired photos:0 (gallery untouched). Logo is a YELLOW
  // wordmark ("ESSENTIAL ROOFING GUYS") on transparent → a white nav pill would make yellow-on-white nearly
  // invisible, so navBg = near-black (#0d0d0d): the pill goes dark, the yellow logo reads cleanly, footer stays
  // white. Primary brand color #ece700 (their site yellow) extracted from the swatch dropped as a "Screenshot …png"
  // → renamed to Color.png so process-assets picked it up. Copy + services pinned here to mirror their live site,
  // which is repair-focused: the 6 repair services they list, plus their "experience / customer service / affordable
  // pricing" differentiators and "free on-site inspection & estimate" CTA. Generated list replaced wholesale. No
  // font example → default.
  "essential-roofing-guys": {
    navBg: "#0d0d0d",
    // Designer dropped 4 Unsplash roofing photos (replacing the low-res 300×300 Google thumbnail) and asked
    // for image 9 (→ p4.webp) as the hero, so the order is pinned here with p4 first; the rest follow. The
    // manual layer replaces the asset-overrides photos array wholesale.
    photos: [
      "/biz-photos/essential-roofing-guys/p4.webp",
      "/biz-photos/essential-roofing-guys/p1.webp",
      "/biz-photos/essential-roofing-guys/p2.webp",
      "/biz-photos/essential-roofing-guys/p3.webp",
    ],
    generatedCopy: {
      heroH1: "Glendale's Trusted Roofing Contractor",
      heroSubhead:
        "A safe, secure roof over your head is essential. Essential Roofing Guys offers a full range of roofing repair services across Glendale to keep your roof in top condition — backed by exceptional customer service and affordable pricing.",
      aboutHeading: "Why Choose Essential Roofing Guys",
      aboutBody: [
        "Experience matters. Our team has years of experience providing roofing repair services throughout Glendale and the West Valley, so every job is done right the first time.",
        "We pride ourselves on exceptional customer service to all of our clients. From your first call to the final inspection, we keep communication clear and treat your home with respect.",
        "And we keep it affordable. We offer fair, honest pricing on all of our roofing repair services — no surprises, no pressure, just a roof you can rely on.",
      ],
      ctaHeadline: "Free On-Site Inspection & Estimate",
      ctaSubhead: "Contact us today for a free, no-obligation on-site inspection and estimate. Call (623) 633-7267.",
    },
    services: [
      { name: "Emergency Roof Repair", slug: "emergency-roof-repair", blurb: "24/7 emergency roof repair when you need it most — fast response to stop leaks and protect your home from further damage." },
      { name: "Leak Detection & Repair", slug: "leak-detection-repair", blurb: "Thorough leak detection that pinpoints the source, followed by a lasting repair to keep water out for good." },
      { name: "Shingle Repair & Replacement", slug: "shingle-repair-replacement", blurb: "Repair or replace damaged, missing, and worn shingles to restore your roof's protection and curb appeal." },
      { name: "Flashing Repair & Replacement", slug: "flashing-repair-replacement", blurb: "Expert flashing repair and replacement around chimneys, vents, and valleys to seal out water at the most vulnerable spots." },
      { name: "Gutter Repair & Replacement", slug: "gutter-repair-replacement", blurb: "Keep water flowing away from your home with professional gutter repair and replacement services." },
      { name: "Skylight Repair & Replacement", slug: "skylight-repair-replacement", blurb: "Stop skylight leaks and restore natural light with reliable skylight repair and replacement." },
    ],
  },
  // ro0099 Priority Roofing (priorityroofingaz.com). Logo is a WHITE wordmark on transparent → a white nav pill would
  // erase it, so per designer note → navBg = black (#0d0d0d): the nav pill goes near-black, the white logo reads
  // cleanly, footer stays white. Primary brand color #2296e7 (their site blue) extracted from the swatch the designer
  // dropped as a "Screenshot …png" → renamed to Color.png so process-assets picked it up. Logo + 8 real photos wired
  // via asset-overrides.json. Services + aboutBody already mirror their live site (Residential, Commercial, Inspection,
  // Financing) via a prior extract-services run — left in asset-overrides as-is. No font example → default font.
  "priority-roofing": {
    navBg: "#0d0d0d",
  },
  // ro0074 Priority Roofing Company (priorityroofingaz.com, Glendale AZ). Logo is a WHITE wordmark on transparent
  // → a white nav pill would erase it, so per designer note → navBg = black (#0d0d0d): the nav pill goes near-black,
  // the white logo reads cleanly, and the footer stays white. Primary brand color #1e96ea (their site blue)
  // extracted from the swatch the designer dropped as a "Screenshot …png" → renamed to Color.png so process-assets
  // picked it up. (Designer's note said "brown," but every asset — swatch, live logo, website — is blue; confirmed
  // blue.) Logo + 7 real roof photos wired via asset-overrides.json. Services pinned here to mirror their live
  // /services/ page EXACTLY — the 6 roofing systems they list (Shingle, Tile, Foam, Coating, Metal, TPO), so the
  // home grid (caps at 6) renders all of them. Generated list replaced wholesale. No font example → default.
  "priority-roofing-company": {
    navBg: "#0d0d0d",
    services: [
      { name: "Shingle Roofing", slug: "shingle-roofing", blurb: "Quality asphalt shingle roofing — a versatile, cost-effective choice installed to stand up to the Arizona sun and monsoon season." },
      { name: "Tile Roofing", slug: "tile-roofing", blurb: "Expert installation and repair of elegant, long-lasting tile roofing, perfectly suited to the desert climate." },
      { name: "Foam Roofing", slug: "foam-roofing", blurb: "Specialized spray-foam roofing for flat and low-slope roofs, delivering seamless waterproofing and excellent insulation." },
      { name: "Roof Coating", slug: "roof-coating", blurb: "Protective roof coatings that restore and waterproof your existing roof while reflecting the desert heat to extend its life." },
      { name: "Metal Roofing", slug: "metal-roofing", blurb: "Durable, energy-efficient metal roofing built to last for decades with minimal maintenance and superior weather resistance." },
      { name: "TPO Roofing", slug: "tpo-roofing", blurb: "Energy-efficient TPO membrane roofing that delivers a seamless, reflective, watertight surface for low-slope and flat roofs." },
    ],
  },
  // ro0072 Healthy Structures Roofing And Construction (healthystructuresinc.com). Per the designer's note: change
  // only the logo, colors, and copy — KEEP the stock gallery (their real site is image-light), so no photos were
  // dropped and process-assets wired photos:0 (gallery untouched). Logo is black "HEALTHY · STRUCTURES INC" wordmark
  // on transparent → reads cleanly on the default white nav pill, so light chrome kept (no navBg). Primary brand
  // color #99ca3d (the logo's green accent) extracted from the swatch the designer dropped as a "Screenshot …png" →
  // renamed to Color.png so process-assets picked it up. Services + aboutBody already mirror the live site (Roofing,
  // General Contracting, Additions, Remodeling) via a prior extract-services run — left in asset-overrides as-is.
  // Hero copy added here to match their live tagline ("we provide roofs you can rely on"). No font example → default.
  "healthy-structures-roofing-and-construction": {
    generatedCopy: {
      heroH1: "Roofs You Can Rely On",
      heroSubhead: "Full-service roofing and general contracting across the Valley — quality craftsmanship at an incredible price. Licensed, bonded, and insured.",
    },
  },
  // ro0070 Aspire Contracting (aspirecontractingandroofing.com, Tempe + North Phoenix). Logo is a grey/olive "A"
  // monogram over "ASPIRE CONTRACTING" on white — reads fine on the default white nav pill, so light chrome kept.
  // Primary brand color #4e533d (the logo's dark olive) extracted from the swatch the designer dropped as a
  // "Screenshot …png" → renamed to Color.png so process-assets picked it up. Logo + 10 real roof photos wired via
  // asset-overrides.json. Their homepage hero is a self-hosted autoplay drone reel
  // (dji_fly…video-1-1-1-1.mp4) → downloaded to hero.mp4 and set as heroVideo. extract-services couldn't run
  // (Gemini key invalid), so services are pinned here to mirror their live Services menu EXACTLY — the 9 items
  // they list in order (Residential, Multi-Family, Commercial, Shingle, Tile, Flat, Roof Coating, Exotic, TPO),
  // blurbs in their words; the generated list was replaced wholesale. showAllServices so all 9 render as cards
  // (the home grid otherwise caps at 6). Hero copy lifted from the live homepage. No font example → default.
  "aspire-contracting": {
    heroVideo: "/biz-photos/aspire-contracting/hero.mp4",
    showAllServices: true,
    generatedCopy: {
      heroH1: "Professional Roofing Contractor",
      heroSubhead: "Trusted and skilled contractors dedicated to providing exceptional service you can count on.",
      aboutBody: [
        "At Aspire Contracting, we understand the importance of trust when it comes to your property. That's why property owners across Tempe, North Phoenix, and the surrounding Valley rely on us for their roofing needs.",
        "With our commitment to excellence and dedication to customer satisfaction, we've earned a reputation as a trusted partner in the community — handling every detail from the first call to the final inspection.",
      ],
    },
    services: [
      { name: "Residential Roofing", slug: "residential-roofing", blurb: "Complete residential roofing for homeowners — installation, replacement, and repair built to protect your home and stand up to the Arizona sun." },
      { name: "Multi-Family Roofing", slug: "multi-family-roofing", blurb: "Roofing for apartments, condos, and multi-family properties, managed end to end with minimal disruption to your residents." },
      { name: "Commercial Roofing", slug: "commercial-roofing", blurb: "Durable commercial roofing systems engineered for businesses and built to withstand the test of time and weather." },
      { name: "Shingle Roofs", slug: "shingle-roofs", blurb: "Quality asphalt shingle roofing — a versatile, cost-effective choice installed to last through Arizona heat and monsoon season." },
      { name: "Tile Roofs", slug: "tile-roofs", blurb: "Expert installation and repair of elegant, long-lasting tile roofing, perfectly suited to the desert climate." },
      { name: "Flat Roofs", slug: "flat-roofs", blurb: "Practical flat-roof solutions for residential and commercial properties, with proper drainage and seamless waterproofing." },
      { name: "Roof Coating", slug: "roof-coating", blurb: "Protective roof coatings that restore and waterproof your existing roof while reflecting the desert heat to extend its life." },
      { name: "Exotic Roofs", slug: "exotic-roofs", blurb: "Specialty and exotic roofing systems for unique architectural needs, installed with precision and craftsmanship." },
      { name: "TPO Roofing", slug: "tpo-roofing", blurb: "Energy-efficient TPO membrane roofing that delivers a seamless, reflective, watertight surface for low-slope and flat roofs." },
    ],
  },
  // ro0069 Dreamers Roofing — the logo is a blue hummingbird + "DREAMERS ROOFING" lockup baked onto a black
  // plate, so on a white nav pill it would read as a black box. Per designer note → navBg = black (#0d0d0d):
  // the nav-only pill goes near-black, the logo plate blends seamlessly, and the footer stays white (chromeDark
  // would have darkened it too). Primary brand color #0092b8 (teal) extracted from the swatch the designer
  // dropped as a "Screenshot …png" → renamed to Color.png so process-assets picked it up. No real photos
  // supplied → stock gallery kept as-is (photos:0). No font example → default.
  "dreamers-roofing": {
    navBg: "#0d0d0d",
  },
  // ro0068 Ultimate Roofing Tempe (Google name) — same brand as ro0057: real site is essentialroofingguys.com
  // and the logo the designer dropped is the bright-yellow "ESSENTIAL ROOFING GUYS" wordmark on transparent.
  // A white nav pill would erase the yellow mark → navBg = black (#0d0d0d) so it reads. Primary brand color
  // #ece700 (yellow) extracted from the swatch the designer dropped as a "Screenshot …png" → renamed to
  // Color.png so process-assets picked it up. Logo + 5 photos wired via asset-overrides.json. Services already
  // in asset-overrides mirror the live site's "Roofing Repair Services" section EXACTLY (the 6 repair services),
  // matching the designer's note — left as-is. Gallery uses the 3 high-res shots only; the two 300x200 stock
  // thumbnails (roof-coating, home-construction) are dropped so they don't render blurry. Hero pinned to p5
  // (imgi_10 zohair — worker carrying shingles, same hero pick as ro0057); BizHero uses photos[0], so p5 leads,
  // then the red-tile close-up (p1) and the crew-on-roof shot (p4). aboutBody fixed: the crawled copy said
  // "Liberty, MI" (template artifact) — corrected to Tempe, AZ. No font example → default.
  "ultimate-roofing-tempe": {
    navBg: "#0d0d0d",
    photos: [
      "/biz-photos/ultimate-roofing-tempe/p5.webp",
      "/biz-photos/ultimate-roofing-tempe/p1.webp",
      "/biz-photos/ultimate-roofing-tempe/p4.webp",
    ],
    generatedCopy: {
      aboutBody: [
        "Essential Roofing Guys is a leading provider of roofing repair services in Tempe, AZ. We understand how important it is to have a safe and secure roof over your head, which is why we offer a wide range of roofing repair services to ensure your roof is in top condition. Our team of expert roofing contractors has the experience and knowledge needed to handle all types of roofing repairs, no matter how big or small.",
        "When it comes to choosing a roofing company, it's important to choose a company that you can trust. Essential Roofing Guys has built a reputation for providing high-quality roofing services to homeowners and businesses in Tempe and the surrounding Valley. We pride ourselves on providing exceptional customer service to all of our clients, working closely with you throughout the entire roofing repair process to ensure your needs are met and you are completely satisfied with our services. We also offer affordable pricing for all of our roofing repair services.",
      ],
    },
  },
  // ro0061 Tempe Roofing (roofing-tempe.com). No logo supplied by the designer, so per their note we render
  // the business name "Tempe Roofing" as a plain text wordmark where the logo would go → logoBadge:false drops
  // the default initials badge so it reads as a clean name lockup. Primary brand color blue #0170ba extracted
  // from the swatch screenshot (renamed to Color.png so process-assets picked it up). 9 real roof photos +
  // services/about/25-years pulled from their live site, all wired via asset-overrides.json. No font example → default.
  // ro0062 Roof Pros (Tempe) — real site arizonaroofpros.co ("Arizona Roof Pros"). The logo is a two-tone
  // wordmark: "ARIZONA" in cornflower blue + "ROOF PROS" in WHITE on transparent, so the default white nav pill
  // hides the white half → navBg = black (#0d0d0d) so the full lockup reads (per designer note). Primary brand
  // color #2678ac (their site blue) extracted from the swatch the designer dropped as a "Screenshot …png" →
  // renamed to Color.png so process-assets picked it up. Logo + 12 real roof photos wired via
  // asset-overrides.json. extract-services couldn't run (Gemini key invalid), so services are set here to mirror
  // their live site's Services menu EXACTLY — the 8 roofing systems they list (Single Ply, Mod Bit, Foam,
  // Shingle, Tile, Elastomeric Coatings, Thermal Inspections, Metal), in site order; the generated
  // replacement/repair/inspection list was replaced wholesale. No hero video on their site. No font example → default.
  "roof-pros": {
    navBg: "#0d0d0d",
    services: [
      { name: "Single Ply Roofing", slug: "single-ply-roofing", blurb: "Durable single-ply membrane systems that deliver seamless, energy-efficient protection for low-slope and flat roofs across the Valley." },
      { name: "Mod Bit Roofing", slug: "mod-bit-roofing", blurb: "Modified bitumen roofing built in tough, layered plies — a proven, long-lasting choice for flat and low-slope Arizona roofs." },
      { name: "Foam Roofing", slug: "foam-roofing", blurb: "Spray polyurethane foam roofing that seals every seam and reflects the desert heat, cutting energy bills while keeping water out." },
      { name: "Shingle Roofing", slug: "shingle-roofing", blurb: "High-quality asphalt shingle roofing — a cost-effective, versatile option installed to stand up to Arizona sun and monsoons." },
      { name: "Tile Roofing", slug: "tile-roofing", blurb: "Expert installation and repair of elegant, enduring tile roofing, perfectly suited to the Arizona climate and built to last decades." },
      { name: "Elastomeric Coatings Roofing", slug: "elastomeric-coatings-roofing", blurb: "Elastomeric roof coatings that restore and waterproof your existing roof while reflecting UV to extend its service life." },
      { name: "Thermal Inspections", slug: "thermal-inspections", blurb: "Infrared thermal inspections that pinpoint hidden moisture and trouble spots early, so problems are fixed before they spread." },
      { name: "Metal Roofing", slug: "metal-roofing", blurb: "Strong, low-maintenance metal roofing systems engineered for lasting performance and a clean, modern look on any property." },
    ],
  },
  "tempe-roofing": {
    logoBadge: false,
  },
  // ro0066 Roman Roofing Solutions (roman-roofing.com) — logo is a navy "Roman" script over a rust/orange roof
  // mark with "ROOFING / SOLUTIONS" bars on white; default white-knockout + light chrome read fine (both the navy
  // and orange are dark enough to show on the white nav pill). Primary brand color #06346e (navy) extracted from
  // the swatch the designer dropped as a "Screenshot …png" → renamed to Color.png so process-assets picked it up;
  // designer confirmed navy primary over the logo's orange. Secondary #c05c23 (the logo's rust/orange, sampled
  // from the ROOFING bar) added here. Logo + 7 real roof photos wired via asset-overrides.json by process-assets.
  // extract-services couldn't run (Gemini key invalid), so services are pinned here to mirror their live Services
  // menu EXACTLY — the 5 pages they list in order (Slate, Flat, Roof Installation, Roof Replacement, Roofing
  // Repair), blurbs carried from asset-overrides; the auto list's extra "Storm Damage Repair" (not a menu item)
  // was dropped to match the original site exactly. Manual layer wins and replaces the array wholesale. No hero
  // video on their WordPress/Divi site. No font example → default.
  "roman-roofing-solutions": {
    brandColor2: "#c05c23",
    services: [
      { name: "Slate Roofing", slug: "slate-roofing", blurb: "When it comes to long-lasting elegance, slate roofing is an exceptional choice for homeowners seeking durability and timeless beauty, ideal for addressing issues like weather damage or aging shingles." },
      { name: "Flat Roofing", slug: "flat-roofing", blurb: "A flat roof can offer a practical solution for both residential and commercial properties, especially when space utilization is a priority, addressing common concerns like drainage inefficiencies and premature wear." },
      { name: "Roof Installation", slug: "roof-installation", blurb: "A professional roof installation is crucial for safeguarding your investment in new construction projects or extensive renovations, ensuring proper alignment, vent placement, and material application." },
      { name: "Roof Replacement", slug: "roof-replacement", blurb: "If your existing roof has seen better days, a full roof replacement may be the best way to restore its functionality and appearance, including removing old materials, inspecting underlying structures, and installing high-quality components." },
      { name: "Roofing Repair", slug: "roofing-repair", blurb: "Our roofing repair services address common problems like missing shingles or water intrusion, preventing escalation and restoring your roof's integrity." },
    ],
  },
  // ro0065 NuRoof (nuroofaz.com, Phoenix; phone matches). Logo is a two-tone wordmark — "nu" in RED + "roof"
  // and the "Seamless protection." tagline in WHITE on transparent (built for dark backgrounds, "TM" mark).
  // The designer's logo.avif uses an AV1 profile sharp/libheif can't decode, so it was rendered to a clean
  // transparent PNG (Chrome render → dark-bg knockout) and dropped in as logo.png for process-assets. Because
  // half the lockup is white, the default white nav pill AND the white footer would both swallow it → chromeDark
  // flips both to near-black chrome so the full logo reads top and bottom. Primary brand color #de1d1c (the
  // logo's red, matching their site) extracted from the swatch the designer dropped as a "Screenshot …png" →
  // renamed to Color.png so process-assets picked it up. Logo + 7 real roof photos wired via asset-overrides.json.
  // Designer-chosen hero: imgi_8_dji_0702 (aerial of a hillside luxury re-roof) → process-assets wrote it as
  // p2.webp; BizHero uses photos[0], so the gallery order is pinned here with p2 first, the rest following.
  // Services mirror their live site EXACTLY — the catalog lists Residential Roofing, Commercial Roofing, and
  // Roof Inspection (tile/metal/foam appear only in testimonials, not as listed services), blurbs verbatim from
  // the site; the generated 6-item list was replaced wholesale. No hero video on their site. No font example → default.
  "nuroof": {
    chromeDark: true,
    photos: [
      "/biz-photos/nuroof/p2.webp",
      "/biz-photos/nuroof/p1.webp",
      "/biz-photos/nuroof/p3.webp",
      "/biz-photos/nuroof/p4.webp",
      "/biz-photos/nuroof/p5.webp",
      "/biz-photos/nuroof/p7.webp",
      "/biz-photos/nuroof/p6.webp",
    ],
    services: [
      { name: "Residential Roofing", slug: "residential-roofing", blurb: "Quality roofing installations and repairs for your home, ensuring safety and durability." },
      { name: "Commercial Roofing", slug: "commercial-roofing", blurb: "Tailored roofing services for businesses, designed to withstand the test of time and weather." },
      { name: "Roof Inspection", slug: "roof-inspection", blurb: "Ensure your home is protected with our expert roof inspection — book your free courtesy inspection today." },
    ],
  },
  // ro0064 Boost Roofing (boostroofing.com, Tempe/Scottsdale; phone 480-602-4277 matches). Logo is the orange
  // house/arrow mark over a "BOOST" wordmark in WHITE + "ROOFING" in an orange banner on transparent, so the
  // default white nav pill would swallow the white "BOOST" → navBg set to black #0d0d0d so the full logo reads
  // (per designer note). Primary brand color #f24802 (their site orange) extracted from the swatch the designer
  // dropped as a "Screenshot …png" → renamed to Color.png so process-assets picked it up. Logo + 13 real roof
  // photos wired via asset-overrides.json. extract-services couldn't run (Gemini key invalid), so services are
  // set here to mirror their live site's Services menu EXACTLY — the 4 offerings they list (Roof Repair, Roof
  // Replacement, Roof Inspection, Emergency Roof Repair), in site order with blurbs drawn from each service
  // page's own tagline; the generated 6-item tile/shingle/foam list was replaced wholesale. No hero video on
  // their site. No font example → default.
  "boost-roofing": {
    navBg: "#0d0d0d",
    // Designer-chosen hero: imgi_21_Roofing-in-Scottsdale-AZ.jpg (their branded truck in front of a re-roof),
    // which process-assets wrote as p9.webp. BizHero uses photos[0], so the gallery order is set here with p9
    // first; the rest follow in their original order. Survives process-assets re-runs (manual wins).
    photos: [
      "/biz-photos/boost-roofing/p9.webp",
      "/biz-photos/boost-roofing/p1.webp",
      "/biz-photos/boost-roofing/p2.webp",
      "/biz-photos/boost-roofing/p3.webp",
      "/biz-photos/boost-roofing/p4.webp",
      "/biz-photos/boost-roofing/p5.webp",
      "/biz-photos/boost-roofing/p6.webp",
      "/biz-photos/boost-roofing/p7.webp",
      "/biz-photos/boost-roofing/p8.webp",
      "/biz-photos/boost-roofing/p10.webp",
      "/biz-photos/boost-roofing/p11.webp",
      "/biz-photos/boost-roofing/p12.webp",
      "/biz-photos/boost-roofing/p13.webp",
    ],
    services: [
      { name: "Roof Repair", slug: "roof-repair", blurb: "Expert roof repairs for lasting protection — fast, reliable fixes that keep your home strong and safe." },
      { name: "Roof Replacement", slug: "roof-replacement", blurb: "Upgrade your home with a durable roof replacement built for new, long-lasting protection against the Arizona elements." },
      { name: "Roof Inspection", slug: "roof-inspection", blurb: "Detailed inspections you can trust to show you exactly what's going on up there before small issues become big ones." },
      { name: "Emergency Roof Repair", slug: "emergency-roof-repair", blurb: "When your roof can't wait, neither do we — fast emergency response when it matters most." },
    ],
  },
  // ro0059 United Roofing and General Contracting (unitedcontractinggroup.com — "United Contracting Group" /
  // UCG bird brand; phone 602-962-8428 matches). Logo is an all-white eagle mark + "UNITED ROOFING /
  // +GENERAL CONTRACTING" wordmark on transparent, so the default white nav pill would hide it entirely →
  // navBg set to their brand navy #11283d (white logo + white text + white CTA read cleanly, and it mirrors
  // their real navy site chrome). Brand color is navy #11283d ONLY — the designer asked to drop the red
  // entirely, so brandColor2 (#cd2236) was removed from asset-overrides.json and the red "Second Color.png"
  // swatch pulled from the inbox so a process-assets re-run won't reintroduce it; customTheme's single-color
  // path now derives every section wash, accent2, and icon chip from the navy. Logo + 12 real photos (their
  // own DJI drone roof shots) wired via
  // asset-overrides.json. Their homepage hero is a self-hosted autoplay/loop sizzle reel
  // (Homepage_Sizzle_1080-2.mp4) → downloaded to hero.mp4 and set as heroVideo. extract-services couldn't run
  // (Gemini key invalid), so services are set here to mirror their live site's Services menu EXACTLY — the 6
  // roofing offerings they list (Residential Roofing, Commercial Roofing, Roof Replacement, New Roof,
  // Roof Repair, Restoration); the generated tile/shingle/foam/inspection list was replaced. Their tagline is
  // "Arizona's Most Trusted Residential & Commercial Roofers" (Scottsdale). No font example → default.
  "united-roofing-and-general-contracting": {
    navBg: "#11283d",
    heroVideo: "/biz-photos/united-roofing-and-general-contracting/hero.mp4",
    services: [
      { name: "Residential Roofing", slug: "residential-roofing", blurb: "Trusted residential roofing for Scottsdale-area homes — tile, shingle, and flat systems installed to stand up to the Arizona sun." },
      { name: "Commercial Roofing", slug: "commercial-roofing", blurb: "Durable commercial roofing for businesses across the Valley, from new installs to large-scale re-roofs and ongoing maintenance." },
      { name: "Roof Replacement", slug: "roof-replacement", blurb: "Full roof replacements that protect your biggest investment, built with quality materials and a clean, on-schedule install." },
      { name: "New Roof", slug: "new-roof", blurb: "Brand-new roof systems for new construction and full tear-offs, engineered for Arizona's heat, monsoons, and UV." },
      { name: "Roof Repair", slug: "roof-repair", blurb: "Fast, reliable repairs for leaks, storm damage, and worn roofing — we find the real problem and fix it right." },
      { name: "Restoration", slug: "restoration", blurb: "Roof restoration and storm/insurance work that brings an aging or damaged roof back to full, dependable protection." },
    ],
  },
  // ro0057 Ultimate Roofing Scottsdale (Google name) — their real website is essentialroofingguys.com and
  // the logo the designer dropped is the "ESSENTIAL ROOFING GUYS" wordmark (same business; phone matches
  // 602-671-0566). The wordmark is bright yellow on transparent, so it would vanish on the default white nav
  // pill → navBg = black (#0d0d0d) so the yellow mark reads. Brand color #ece700 (yellow) extracted from the
  // swatch the designer dropped as a "Screenshot …png" → renamed to Color.png so process-assets picked it up.
  // Logo + 4 real photos wired via asset-overrides.json. extract-services couldn't run (Gemini key invalid),
  // so services are set here to mirror the live site's "Roofing Repair Services" section EXACTLY — it's a
  // repair-focused contractor, so the generated install/tile/foam list was replaced with their 6 real repair
  // services. No hero video on their site. No font example → default. Hero pinned to p4 (imgi_10_zohair-mirza
  // — the shot the designer chose); BizHero uses photos[0], so p4 leads, the other 3 follow in natural order.
  "ultimate-roofing-scottsdale": {
    navBg: "#0d0d0d",
    photos: [
      "/biz-photos/ultimate-roofing-scottsdale/p4.webp",
      "/biz-photos/ultimate-roofing-scottsdale/p1.webp",
      "/biz-photos/ultimate-roofing-scottsdale/p2.webp",
      "/biz-photos/ultimate-roofing-scottsdale/p3.webp",
    ],
    services: [
      { name: "Emergency Roof Repair", slug: "emergency-roof-repair", blurb: "Fast emergency response when leaks or storm damage strike — we secure your roof and stop further damage to your home." },
      { name: "Leak Detection and Repair", slug: "leak-detection-and-repair", blurb: "We track down the true source of a leak and repair it properly, protecting your roof and everything beneath it." },
      { name: "Shingle Repair and Replacement", slug: "shingle-repair-and-replacement", blurb: "Damaged or missing shingles repaired and replaced to restore your roof's protection and curb appeal." },
      { name: "Flashing Repair and Replacement", slug: "flashing-repair-and-replacement", blurb: "Worn or failing flashing repaired and replaced to seal out water around chimneys, vents, and roof joints." },
      { name: "Gutter Repair and Replacement", slug: "gutter-repair-and-replacement", blurb: "Keep water moving away from your home with expert gutter, downspout, and eave repair and replacement." },
      { name: "Skylight Repair and Replacement", slug: "skylight-repair-and-replacement", blurb: "Leaking or damaged skylights repaired and replaced for a watertight seal and clear, natural light." },
    ],
  },
  // ro0056 Acclaimed Roofing Scottsdale (acclaimedroofingaz.com) — logo is a dark navy/purple "ACCLAIMED
  // ROOFING" wordmark under a gold mountain mark on transparent; it reads cleanly on the default white nav
  // pill, so no navBg override. Brand color #0877ee (blue) extracted from the swatch the designer dropped as
  // a "Screenshot …png" — renamed to Color.png so process-assets picked it up. Logo + 9 real photos wired via
  // asset-overrides.json by process-assets. extract-services couldn't run (Gemini key invalid), but the 6
  // services already in asset-overrides (Residential Roofing, Commercial Roofing, Roof Repair, Roof
  // Replacement, New Roof Installation, Roof Inspection and Maintenance) mirror their live site's offerings
  // exactly, so left as-is per the designer. No hero video on their site. No font example → default. Hero
  // pinned to p6 (imgi_29 — the wide Scottsdale homes-and-mountains shot, their actual site hero); BizHero
  // uses photos[0], so p6 leads. The rest are roof-detail/work shots and follow in natural order; p1 (a
  // square roof-damage close-up) trails so it never leads the gallery.
  "acclaimed-roofing-scottsdale-residential-and-commercial-roof": {
    photos: [
      "/biz-photos/acclaimed-roofing-scottsdale-residential-and-commercial-roof/p6.webp",
      "/biz-photos/acclaimed-roofing-scottsdale-residential-and-commercial-roof/p2.webp",
      "/biz-photos/acclaimed-roofing-scottsdale-residential-and-commercial-roof/p3.webp",
      "/biz-photos/acclaimed-roofing-scottsdale-residential-and-commercial-roof/p4.webp",
      "/biz-photos/acclaimed-roofing-scottsdale-residential-and-commercial-roof/p5.webp",
      "/biz-photos/acclaimed-roofing-scottsdale-residential-and-commercial-roof/p7.webp",
      "/biz-photos/acclaimed-roofing-scottsdale-residential-and-commercial-roof/p8.webp",
      "/biz-photos/acclaimed-roofing-scottsdale-residential-and-commercial-roof/p9.webp",
      "/biz-photos/acclaimed-roofing-scottsdale-residential-and-commercial-roof/p1.webp",
    ],
  },
  // ro0052 Irish Roofing Company (irishroofingcompany.com) — logo is an all-white circular Celtic emblem,
  // so a white nav pill would hide it entirely. navBg = black paints the nav pill #0d0d0d (white text +
  // white CTA) so the full white mark reads — same treatment as kore-roofing. Brand color #224602 (dark
  // green) extracted from the swatch the designer dropped as a "Screenshot …png" → renamed to Color.png so
  // process-assets picked it up. Logo + 8 real photos wired via asset-overrides.json. extract-services
  // couldn't run (Gemini key invalid), so the generated services stand. No font example provided → default.
  "irish-roofing-company": {
    navBg: "#0d0d0d",
  },
  // ro0051 Kore Roofing — logo (green "K" mark + cream/white "KORE ROOFING" wordmark) + 8 real photos +
  // brand colors green #4c7f4e / orange #db5f23 wired via asset-overrides.json by process-assets. Designer
  // pinned imgi_3_tile-roofing-hero (→ p1.webp) as the hero; BizHero uses photos[0], so tile leads.
  // navBg = black: the wordmark is cream/white, so a white pill would hide it — a black backdrop shows the
  // full mark (green K + white text).
  "kore-roofing": {
    navBg: "#0d0d0d",
  },
  // ro0050 Scottsdale Roofing (roofing-scottsdale.com) — NO logo asset provided, so logoBadge:false hides the
  // colored "SR" letter-badge and the nav simply writes out the full name "Scottsdale Roofing" (wordmark =
  // name) per the designer. Brand color #0170ba (blue) extracted from the swatch the designer dropped as a
  // "Screenshot …png" — renamed to Color.png so process-assets picked it up. 10 real photos wired via
  // asset-overrides.json by process-assets (no logo). extract-services captured their homepage's 6 headline
  // services EXACTLY with the site's own copy (Residential Roofing, Roof Replacement, Roof Leak Repair,
  // Commercial Roofing, Industrial Roofing, 24 Hour Emergency Service) → in asset-overrides.json; the
  // designer asked the new site carry the same services as the original, and those 6 fill the home grid
  // exactly, so left as-is. No hero video on their WordPress site. Default font.
  "scottsdale-roofing": {
    logoBadge: false,
  },
  // ro0048 Monsoon Roofing Inc (monsoonroofinginc.com) — logo is a red "M" roof-truss mark over
  // "MONSOON ROOFING INC." on white; default white-knockout + light chrome are correct. Brand colors
  // #d23925 (red, primary) + #d9d9d9 (gray, secondary) extracted from the two swatches the designer
  // dropped as "Screenshot …png" — renamed to Color.png / Second Color.png so process-assets picked them
  // up. Logo + 9 real photos wired via asset-overrides.json by process-assets. The 5 real services (Roof
  // Inspection, Roof Repair, Roof Replacement, Roof Upgrades, Deck Waterproofing) + aboutBody in
  // asset-overrides.json mirror their live site (Residential/Commercial roofing + walking-deck PLI-Deck
  // waterproofing) and were kept exactly as-is per the designer. yearsInBusiness corrected to 30 — their
  // About page states "30+ Years of Experience" (extract had left 20). fontKey "elegant" (Playfair serif)
  // matches their site's Playfair Display headings. No hero video on their GoDaddy-built site. Hero pinned
  // to p3 (imgi_10 — the crisp architectural-shingle roof detail) per the designer; BizHero uses photos[0],
  // so p3 leads, then p2 (gabled rooftops), p9 (their branded company truck), and the rest. p4 is a tiny
  // low-res rain photo so it trails last.
  "monsoon-roofing-inc": {
    fontKey: "elegant",
    yearsInBusiness: 30,
    photos: [
      "/biz-photos/monsoon-roofing-inc/p3.webp",
      "/biz-photos/monsoon-roofing-inc/p2.webp",
      "/biz-photos/monsoon-roofing-inc/p9.webp",
      "/biz-photos/monsoon-roofing-inc/p1.webp",
      "/biz-photos/monsoon-roofing-inc/p5.webp",
      "/biz-photos/monsoon-roofing-inc/p6.webp",
      "/biz-photos/monsoon-roofing-inc/p7.webp",
      "/biz-photos/monsoon-roofing-inc/p8.webp",
      "/biz-photos/monsoon-roofing-inc/p4.webp",
    ],
  },
  // ro0045 State 48 Roofing (state48roofing.com) — logo (webp) + 4 real photos + brand color #58ba45 (their
  // green, from the swatch the designer dropped as a "Screenshot …png" — renamed to Color.png so process-assets
  // picked it up) auto-wired via asset-overrides.json by process-assets. The 6 real services (Maintenance,
  // Replacements, Repairs, Refelts, Complimentary Inspections, Restore & Recoat Systems) + aboutBody in
  // asset-overrides.json match their live site and were kept exactly as-is per the designer. Designer pinned p2
  // (imgi_8 — the ranch-home exterior) as the hero; BizHero uses photos[0], so p2 leads and the rest follow.
  "state-48-roofing": {
    photos: [
      "/biz-photos/state-48-roofing/p2.webp",
      "/biz-photos/state-48-roofing/p1.webp",
      "/biz-photos/state-48-roofing/p3.webp",
      "/biz-photos/state-48-roofing/p4.webp",
    ],
  },
  // ro0047 Canyon State Roofing & Consulting (canyonstateroofs.com) — extract-services rendered the site
  // but Gemini is dead, so it left a partial 6-item list in asset-overrides that missed several real
  // offerings. Services pinned here by hand to mirror their live "Services Offered" section EXACTLY: the
  // ten residential + commercial offerings — Shingle, Tile, Foam, Flat, and Metal Roofing, Single-Ply
  // Duro-Last, Hail Damage, Storm Damage, Emergency Roof Tarp Service, and Property Managers & Maintenance.
  // Manual layer wins on conflict and replaces the array wholesale. showAllServices so all 10 render as
  // cards (the home grid otherwise caps at 6). Logo (webp) + 5 real photos + brand color #ea7521 (orange,
  // from the swatch the designer dropped as "Screenshot …png" — renamed to Color.png so process-assets
  // picked it up) auto-wired via asset-overrides.json by process-assets. No hero video on their site.
  "canyon-state-roofing-and-consulting": {
    showAllServices: true,
    services: [
      { name: "Shingle Roofing", slug: "shingle-roofing", blurb: "Quality shingle roofing in Gilbert from our dedicated shingle roofers — installations and replacements done with craftsmanship and professionalism." },
      { name: "Tile Roofing", slug: "tile-roofing", blurb: "Experience the timeless beauty and durability of tile roofs with our Gilbert roofing specialists, delivering flawless installations and professional repairs." },
      { name: "Foam Roofing", slug: "foam-roofing", blurb: "Energy-efficient foam roofing built for the desert climate — a seamless, insulating seal that holds up to Arizona heat and monsoon rains." },
      { name: "Flat Roofing", slug: "flat-roofing", blurb: "Expert flat roof installation and repair, sealing out leaks and standing water on residential and commercial properties for the long haul." },
      { name: "Metal Roofing", slug: "metal-roofing", blurb: "Durable, low-maintenance metal roofing, including standing-seam systems, designed to stand up to the harshest Arizona weather." },
      { name: "Single-Ply Duro-Last Roofing", slug: "single-ply-duro-last-roofing", blurb: "As certified Duro-Last experts, we install durable, reliable, energy-efficient single-ply commercial roofing systems with unmatched precision." },
      { name: "Hail Damage", slug: "hail-damage", blurb: "Honest hail-damage assessments and repairs — we restore your roof's integrity and work with you through the insurance process." },
      { name: "Storm Damage", slug: "storm-damage", blurb: "From monsoon winds to driving rain, our storm-damage team repairs and restores roofs quickly to protect your property." },
      { name: "Emergency Roof Tarp Service", slug: "emergency-roof-tarp-service", blurb: "When sudden roof damage strikes, we respond fast to tarp and secure your roof, stopping leaks and preventing further damage." },
      { name: "Property Managers & Maintenance", slug: "property-managers-and-maintenance", blurb: "Re-roofing, maintenance, and full-service repairs for property managers — inspecting, repairing, and restoring roofing systems to keep them performing at their best." },
    ],
  },
  // ro0043 Integrity Roofing Inc (integrityroofingaz.com) — logo is an orange/black "INTEGRITY ROOFING"
  // wordmark with a black roof-peaks mark on a white plate, so default white-knockout + light chrome are
  // correct. Brand color #e5a435 (gold) extracted from a swatch the designer dropped as "Screenshot …png" —
  // renamed to Color.png so process-assets picked it up. Logo + 8 real photos wired via asset-overrides.json
  // by process-assets. The 6 real services (Roof Replacement, Roof Repair, Inspections, Maintenance,
  // Commercial, Residential) + aboutBody in asset-overrides.json match their live site, so left as-is.
  // No hero video on their site. Designer pinned p7 (imgi_30_wooden-gable-roof — the battened gable roof)
  // as the hero; BizHero uses photos[0], so p7 leads and the rest follow in order.
  "integrity-roofing-inc": {
    photos: [
      "/biz-photos/integrity-roofing-inc/p7.webp",
      "/biz-photos/integrity-roofing-inc/p1.webp",
      "/biz-photos/integrity-roofing-inc/p2.webp",
      "/biz-photos/integrity-roofing-inc/p3.webp",
      "/biz-photos/integrity-roofing-inc/p4.webp",
      "/biz-photos/integrity-roofing-inc/p5.webp",
      "/biz-photos/integrity-roofing-inc/p6.webp",
      "/biz-photos/integrity-roofing-inc/p8.webp",
    ],
  },
  // ro0041 All Storm Roofing and Construction (allstormroofing.com) — logo is a navy mountain/roof scene
  // with white "ALL STORM / ROOFING & CONSTRUCTION" lettering on a transparent bg; default white-knockout
  // + light chrome are correct. Brand color #0078e8 (the bright blue of the logo) extracted from a swatch
  // the designer dropped as "Screenshot …png" — renamed to Color.png so process-assets picked it up. Logo +
  // 7 photos wired via asset-overrides.json by process-assets. The 6 real services (Roofing, HVAC Service,
  // Windows, Home Remodel, Outdoor Living Space, Permanent Holiday Lights) + aboutBody were extracted from
  // their live site and kept as-is. Designer pinned p6 (imgi_105_Rectangle 1664 — two roofers laying tile
  // under a blue sky) as the hero; BizHero uses photos[0]. p4 (a generic Unsplash downtown-street stock photo, not
  // their work) dropped from the gallery; the rest are real work and follow.
  "all-storm-roofing-and-construction": {
    photos: [
      "/biz-photos/all-storm-roofing-and-construction/p6.webp",
      "/biz-photos/all-storm-roofing-and-construction/p7.webp",
      "/biz-photos/all-storm-roofing-and-construction/p2.webp",
      "/biz-photos/all-storm-roofing-and-construction/p5.webp",
      "/biz-photos/all-storm-roofing-and-construction/p3.webp",
      "/biz-photos/all-storm-roofing-and-construction/p1.webp",
    ],
  },
  // ro0042 First Response Roofing (firstresponseroofingaz.com) — logo is a red/black "FIRST RESPONSE /
  // ROOFING" wordmark with red roof-peaks + EKG heartbeat line on a white plate, so default white-knockout
  // + light chrome are correct (NO chromeDark). Brand color #ed2127 (their signature red) extracted from a
  // swatch the designer dropped as "Screenshot …png" — renamed to Color.png so process-assets picked it up.
  // Logo + 9 real photos wired via asset-overrides.json by process-assets. Gemini key is dead, so an earlier
  // extract-services crawl had only captured 6 of their services; their live "What We Do" section lists 8.
  // The designer asked that the new site carry the EXACT same services as the original, so all 8 are pinned
  // here in the site's order (added Roof Maintenance + Roof Installation, which the auto-crawl had dropped).
  // Arrays replace wholesale, so this supersedes the 6-service list in asset-overrides.json. No hero video.
  // Hero pinned to p9 (imgi_98_annie-spratt — designer's pick; BizHero uses photos[0]); rest follow in order.
  "first-response-roofing": {
    photos: [
      "/biz-photos/first-response-roofing/p9.webp",
      "/biz-photos/first-response-roofing/p1.webp",
      "/biz-photos/first-response-roofing/p2.webp",
      "/biz-photos/first-response-roofing/p3.webp",
      "/biz-photos/first-response-roofing/p4.webp",
      "/biz-photos/first-response-roofing/p5.webp",
      "/biz-photos/first-response-roofing/p6.webp",
      "/biz-photos/first-response-roofing/p7.webp",
      "/biz-photos/first-response-roofing/p8.webp",
    ],
    services: [
      { name: "Shingle Roofing", slug: "shingle-roofing", blurb: "We offer comprehensive shingle roofing services, including installation and repair, to protect your home." },
      { name: "Roof Repair", slug: "roof-repair", blurb: "We provide prompt and effective roof repair services for all types of roofing issues, addressing leaks and damage efficiently." },
      { name: "Flat Roofing", slug: "flat-roofing", blurb: "Our expertise includes flat roofing solutions, from installation to maintenance, suitable for both residential and commercial properties." },
      { name: "Roof Coating", slug: "roof-coating", blurb: "We apply high-quality roof coatings to extend the life of your roof, improve energy efficiency, and provide an extra layer of protection." },
      { name: "Tile Roofing", slug: "tile-roofing", blurb: "Our tile roofing services cover installation, repair, and maintenance for various tile types, ensuring durability and aesthetic appeal." },
      { name: "Roof Maintenance", slug: "roof-maintenance", blurb: "Routine inspections and upkeep that catch small problems early and keep your roof performing through every Arizona season." },
      { name: "Roof Replacement", slug: "roof-replacement", blurb: "When repairs are not enough, we offer complete roof replacement services, ensuring a new, long-lasting roof for your property." },
      { name: "Roof Installation", slug: "roof-installation", blurb: "From new builds to full tear-offs, we install durable, code-compliant roof systems built to protect your property for decades." },
    ],
  },
  // ro0039 Maverick Roofing And Exteriors | Gilbert, AZ (maverickroofingaz.com) — logo is a rust/copper
  // roof-peak mark + a WHITE "MAVERICK / ROOFING AND EXTERIORS" wordmark, built for dark backgrounds, so
  // chromeDark makes the nav + footer near-black to keep the white logo visible. Their real site lists
  // exactly 3 services (New Roof Installation, Roof Repairs & Restoration, Tile Underlayment Replacement) —
  // already correct in asset-overrides.json, so left untouched. Logo (webp) + 10 real photos wired via
  // asset-overrides.json by process-assets. The designer dropped their brand color as a screenshot named
  // "Screenshot …png" (not "Color.png"), so process-assets didn't extract it — brandColor #a95624 (the
  // rust/copper of the roof mark) set here by hand from that swatch. That swatch had landed as p11.webp;
  // dropped from the gallery (photos pinned p1–p10, all real roofing work). No hero video on their site.
  "maverick-roofing-and-exteriors-gilbert-az": {
    chromeDark: true,
    brandColor: "#a95624",
    photos: [
      "/biz-photos/maverick-roofing-and-exteriors-gilbert-az/hero-original.webp",
      "/biz-photos/maverick-roofing-and-exteriors-gilbert-az/new-roof-installation-original.webp",
      "/biz-photos/maverick-roofing-and-exteriors-gilbert-az/roof-repair-restoration-original.webp",
      "/biz-photos/maverick-roofing-and-exteriors-gilbert-az/tile-underlayment-original.webp",
    ],
    services: [
      { name: "New Roof Installation", slug: "new-roof-installation", image: "/biz-photos/maverick-roofing-and-exteriors-gilbert-az/new-roof-installation-original.webp", blurb: "New construction and full replacement roofs installed with durable tile, shingle, metal, foam, or built-up systems selected for your home and budget." },
      { name: "Roof Repairs & Restoration", slug: "roof-repair-restoration", image: "/biz-photos/maverick-roofing-and-exteriors-gilbert-az/roof-repair-restoration-original.webp", blurb: "Fast, dependable repairs for leaks, cracked tiles, aging shingles, and storm or wind damage, finished with a thorough cleanup and quality check." },
      { name: "Tile Underlayment Replacement", slug: "tile-underlayment-replacement", image: "/biz-photos/maverick-roofing-and-exteriors-gilbert-az/tile-underlayment-original.webp", blurb: "We carefully lift and preserve existing tiles, install high-quality waterproof underlayment, and reset the roof to extend its service life without a full replacement." },
    ],
  },
  // ro0055 Ironwood Roofing | Scottsdale, AZ (ironwoodroofing.com) — logo is a thin WHITE "IRONWOOD
  // ROOFING" wordmark built for dark backgrounds, so chromeDark makes the nav + footer near-black to
  // keep it visible. Their real GoDaddy site lists exactly what they offer in prose — residential &
  // commercial roofing, repair, and replacement — so the 4 services in asset-overrides.json (Residential
  // Roofing, Commercial Roofing, Roofing Repair, Roof Replacement) match the original site and replace
  // the 6 AI-generated catalog items (Tile/Shingle/Foam/Inspection) the original site never mentions.
  // Logo (webp) + 9 real photos + brand color #ff6900 (their orange) wired via asset-overrides.json by
  // process-assets. No hero video on their site. Photos pinned here with p4 (the aerial tile-roof drone
  // shot, imgi_4) first so it becomes the hero (BizHero uses photos[0]); the rest follow in original
  // order. Manual layer replaces the asset-overrides photos array wholesale.
  "ironwood-roofing": {
    chromeDark: true,
    photos: [
      "/biz-photos/ironwood-roofing/p4.webp",
      "/biz-photos/ironwood-roofing/p1.webp",
      "/biz-photos/ironwood-roofing/p2.webp",
      "/biz-photos/ironwood-roofing/p3.webp",
      "/biz-photos/ironwood-roofing/p5.webp",
      "/biz-photos/ironwood-roofing/p6.webp",
      "/biz-photos/ironwood-roofing/p7.webp",
      "/biz-photos/ironwood-roofing/p8.webp",
      "/biz-photos/ironwood-roofing/p9.webp",
    ],
  },
  // ro0038 Weather-Tite Roofing & Construction (roofweathertite.com) — logo is a navy "Weather-Tite"
  // wordmark + gray roof-peak/"ROOFING & CONSTRUCTION" on a white plate, so default white-knockout +
  // light chrome are correct (NO chromeDark). Brand colors navy #1f2153 / tan #947541 + 15 real photos
  // wired via asset-overrides.json by process-assets. fontKey "bold" (Archivo) matches the heavy
  // grotesque sans of the wordmark. Gemini key is dead, so extract-services couldn't run — the 6
  // services + aboutBody in asset-overrides.json were lifted by hand from their live residential/home
  // pages (Residential, Commercial, Tile, Asphalt Shingles, Flat/Low-Slope, Repair & Inspections).
  // Hero is p1 (a sunset tile-roof shot — BizHero uses photos[0]); p14 (a "Residential Window
  // Blueprints" stock graphic, not real work) is dropped from the gallery, rest follow in order.
  "weather-tite-roofing-and-construction": {
    fontKey: "bold",
    photos: [
      "/biz-photos/weather-tite-roofing-and-construction/p1.webp",
      "/biz-photos/weather-tite-roofing-and-construction/p2.webp",
      "/biz-photos/weather-tite-roofing-and-construction/p3.webp",
      "/biz-photos/weather-tite-roofing-and-construction/p4.webp",
      "/biz-photos/weather-tite-roofing-and-construction/p5.webp",
      "/biz-photos/weather-tite-roofing-and-construction/p6.webp",
      "/biz-photos/weather-tite-roofing-and-construction/p7.webp",
      "/biz-photos/weather-tite-roofing-and-construction/p8.webp",
      "/biz-photos/weather-tite-roofing-and-construction/p9.webp",
      "/biz-photos/weather-tite-roofing-and-construction/p10.webp",
      "/biz-photos/weather-tite-roofing-and-construction/p11.webp",
      "/biz-photos/weather-tite-roofing-and-construction/p12.webp",
      "/biz-photos/weather-tite-roofing-and-construction/p13.webp",
      "/biz-photos/weather-tite-roofing-and-construction/p15.webp",
    ],
  },
  // ro0032 Champion Metal Roofing Chandler (metalroofingchandler.com) — logo (orange/red/black
  // roof-peak mark) + 10 real photos + brand colors orange #f29e22 / red #be1e2e wired via
  // asset-overrides.json by process-assets; their 6 real featured services + aboutBody also live
  // there. Designer pinned imgi_22_Metal-Roofing-Peoria (→ p7.webp) as the hero; BizHero uses
  // photos[0], so p7 leads and the rest follow for the gallery. Designer override: secondary brand
  // color set to a very light yellow (replaces the extracted red #be1e2e).
  "champion-metal-roofing-chandler": {
    brandColor2: "#faf0c2",
    photos: [
      "/biz-photos/champion-metal-roofing-chandler/p7.webp",
      "/biz-photos/champion-metal-roofing-chandler/p1.webp",
      "/biz-photos/champion-metal-roofing-chandler/p2.webp",
      "/biz-photos/champion-metal-roofing-chandler/p3.webp",
      "/biz-photos/champion-metal-roofing-chandler/p4.webp",
      "/biz-photos/champion-metal-roofing-chandler/p5.webp",
      "/biz-photos/champion-metal-roofing-chandler/p6.webp",
      "/biz-photos/champion-metal-roofing-chandler/p8.webp",
      "/biz-photos/champion-metal-roofing-chandler/p9.webp",
      "/biz-photos/champion-metal-roofing-chandler/p10.webp",
    ],
  },
  // ro0033 Horn & Sons Roofing & Painting, LLC (hornandsonsroofing.com) — logo is a BLACK
  // "HORN & SONS ROOFING" wordmark + gold sun-arc roof mark on a white plate, so default
  // white-knockout + light chrome are correct (NO chromeDark). Brand color #f8be1e (gold) and
  // 6 real photos wired via asset-overrides.json by process-assets. The 6 services in
  // asset-overrides were checked against their live site and match its core offerings
  // (Roof Repair, Roof Replacement, Tile Roofs, Spray Foam, Roof Coating, Exterior Painting).
  // fontKey "bold" (Archivo) matches the heavy geometric sans of the wordmark.
  "horn-and-sons-roofing-and-painting-llc": {
    fontKey: "bold",
  },
  // ro0030 Power Peak Roofing (powerpeakroofing.com) — logo is a WHITE "POWER PEAK" wordmark + orange
  // peak mark on a BLACK plate, so process-assets' white-knockout erased the wordmark. Generated a
  // transparent logo-dark.webp by knocking out the BLACK background instead (keeps white text + orange
  // mark), and set chromeDark so the near-black nav pill + footer keep it visible. Brand color #fb5e14
  // (orange) + 12 real photos wired via asset-overrides.json by process-assets (hero = their hero-roof
  // shot, p1). Services pinned by hand to the SIX their live homepage actually features (Gemini key is
  // dead, so extract-services couldn't run) — names + blurbs lifted verbatim from their "What We Do"
  // section so they carry over as-is.
  "power-peak-roofing": {
    chromeDark: true,
    logo: "/biz-photos/power-peak-roofing/logo-dark.webp",
    logoScale: 1.6, // stacked mark + wordmark reads tiny at default h-11; scale up so "POWER PEAK" is legible
    services: [
      { name: "Roof Repair", slug: "roof-repair", blurb: "Leaky valley, cracked tiles, lifted shingles, or a stain on the ceiling? We diagnose the source on the first visit and quote the actual fix, not a full re-roof." },
      { name: "Roof Replacement", slug: "roof-replacement", blurb: "Full tile, shingle, and foam replacements built for Arizona heat. Premium underlayment, manufacturer warranties, and a finished job most homes complete in 2 to 5 days." },
      { name: "Tile Roofing", slug: "tile-roofing", blurb: "Concrete and clay tile install, lift-and-relay underlayment replacement, and color-matched tile repair across every Phoenix-area neighborhood." },
      { name: "Storm Damage Repair", slug: "storm-damage-repair", blurb: "Monsoon, hail, or microburst damage? We document the damage on-site, meet your adjuster, and write a scope that matches the actual repair. Most owners pay only their deductible." },
      { name: "Roof Maintenance", slug: "roof-maintenance", blurb: "Free, no-obligation roof inspections — with an optional in-depth 17-point inspection available, plus sealant refresh, debris clearing, and minor repairs that add years to your roof." },
      { name: "Commercial Roofing", slug: "commercial-roofing", blurb: "Flat, foam (SPF), TPO, and modified bitumen systems for Phoenix-area businesses. We work after hours when needed and protect your operations during the install." },
    ],
  },
  // ro0021 Stout Roofing, Inc. | Mesa — process-assets had NOT been run, so the page fell back to
  // placeholder photos that 404'd (black hero, broken-image icon). Ran process-assets: logo + 12 photos
  // (p1–p12) now wired via asset-overrides.json. Their logo is a DARK "STOUT ROOFING INC." wordmark, so
  // default light chrome is correct (NO chromeDark). No colour.png swatch was provided — brand color is
  // still the generated default; awaiting a swatch or a hex from the designer. Hero pinned to p7
  // (imgi_21_tile2 → p7.webp, the estate tile-roof home) per the designer; BizHero uses photos[0], so
  // p7 leads and the rest follow — residential roof shots first, commercial/flat after.
  "stout-roofing-inc-mesa": {
    photos: [
      "/biz-photos/stout-roofing-inc-mesa/hero-original.webp",
      "/biz-photos/stout-roofing-inc-mesa/roof-repair-original.webp",
      "/biz-photos/stout-roofing-inc-mesa/reroof-original.webp",
      "/biz-photos/stout-roofing-inc-mesa/tile-roofing-original.webp",
      "/biz-photos/stout-roofing-inc-mesa/shingle-roofing-original.webp",
      "/biz-photos/stout-roofing-inc-mesa/spray-foam-coating-original.webp",
      "/biz-photos/stout-roofing-inc-mesa/commercial-roofing-original.webp",
    ],
    services: [
      { name: "Residential Roof Repair", slug: "roof-repair", image: "/biz-photos/stout-roofing-inc-mesa/roof-repair-original.webp", blurb: "Targeted repairs for leaks, broken tiles, damaged flashing, and other trouble spots, backed by clear guidance and long-term fixes." },
      { name: "Re-Roofing & Roof Replacement", slug: "roof-replacement", image: "/biz-photos/stout-roofing-inc-mesa/reroof-original.webp", blurb: "Complete re-roofing and new roof systems installed with quality materials and proven craftsmanship for lasting Arizona protection." },
      { name: "Tile Roofing", slug: "tile-roofing", image: "/biz-photos/stout-roofing-inc-mesa/tile-roofing-original.webp", blurb: "Concrete tile installation, repair, and underlayment solutions that preserve curb appeal and perform in the Phoenix Valley climate." },
      { name: "Shingle Roofing", slug: "shingle-roofing", image: "/biz-photos/stout-roofing-inc-mesa/shingle-roofing-original.webp", blurb: "Professionally installed composition shingles in a range of styles and performance levels for an attractive, dependable roof." },
      { name: "Spray Foam & Roof Coating", slug: "spray-foam-roof-coating", image: "/biz-photos/stout-roofing-inc-mesa/spray-foam-coating-original.webp", blurb: "Seamless spray foam and reflective roof coatings add insulation value and create an efficient cool-roof system for flat roofs." },
      { name: "Commercial Roofing", slug: "commercial-roofing", image: "/biz-photos/stout-roofing-inc-mesa/commercial-roofing-original.webp", blurb: "Commercial roof repair, re-roofing, and flat-roof systems planned around the needs of Phoenix Valley businesses." },
    ],
  },
  // ro0027 — QR record name is "Next Level Roofers Chandler", but every real asset the designer
  // dropped is the rebrand "Chandler Roofing Solutions": the logo wordmark, the source site
  // (chandlerroofingsolutions.com), and the extracted services + aboutBody. Designer confirmed
  // (2026-06-10): render as Chandler Roofing Solutions. The `name` override flips the nav, footer,
  // page title, and the services heading ("Everything {name.split[0]} does" → "Everything Chandler
  // does"). The generated copy baked "Next Level" into three fields (heroH1, ctaHeadline, metaTitle)
  // — rebranded here; they merge over the asset layer's real aboutBody (field-by-field). Logo (black
  // wordmark + gold roof, white knocked out), brand color #ba7c2d (gold swatch), 8 real photos, and
  // the 6 real services (Roof Installation, Roof Repair, Roof Replacement, Roof Maintenance, Storm
  // Damage Restoration, Commercial Roof) are wired via asset-overrides.json. Logo is dark on the
  // white nav pill, so no chromeDark needed.
  "next-level-roofers-chandler": {
    name: "Chandler Roofing Solutions",
    generatedCopy: {
      heroH1: "Exceptional Roofing for Lasting Results",
      ctaHeadline: "Ready for a Roof Built to Last?",
      metaTitle: "Chandler Roofing Solutions | Expert Roofing in Chandler, AZ",
    },
  },
  // ro0026 Chandler Roofing - Roof Repair & Replacement (roofing-chandler.com) — extract-services
  // rendered the site but Gemini is dead, so it wrote a generic 6-item list into asset-overrides
  // that didn't match their real site (it dropped Inspection, Concrete Tile, Flat, Metal, and
  // Maintenance, and invented a "24 Hour Emergency Service"). Services pinned here by hand to mirror
  // their real "Services" nav EXACTLY — the nine pages in their menu, in menu order: Residential,
  // Commercial, Roof Replacement, Roof Inspection, Roof Leak Repair, Concrete Tile, Flat, Metal,
  // Roof Maintenance. Manual layer wins on conflict and replaces the array wholesale; blurbs are
  // lifted from each service page's real copy. showAllServices so all 9 render as cards (the home
  // grid otherwise caps at 6). No logo provided, so per the designer we show their name as a plain
  // text wordmark: name shortened to "Chandler Roofing" (drops the GMB "- Roof Repair & Replacement"
  // suffix) and logoBadge:false hides the letter-badge for a text-only treatment. 9 photos + brand
  // color #0170ba (blue, from colour.png) + aboutBody (over 25 yrs, BBB-accredited) wired via
  // asset-overrides.json by process-assets.
  "chandler-roofing-roof-repair-and-replacement": {
    name: "Chandler Roofing",
    logoBadge: false,
    showAllServices: true,
    // Cohesive original Arizona portfolio: a dedicated finished-roof hero and one image per service.
    photos: [
      "/biz-photos/chandler-roofing-roof-repair-and-replacement/hero-original.webp",
      "/biz-photos/chandler-roofing-roof-repair-and-replacement/residential-roofing.webp",
      "/biz-photos/chandler-roofing-roof-repair-and-replacement/commercial-roofing.webp",
      "/biz-photos/chandler-roofing-roof-repair-and-replacement/roof-replacement.webp",
      "/biz-photos/chandler-roofing-roof-repair-and-replacement/roof-inspection.webp",
      "/biz-photos/chandler-roofing-roof-repair-and-replacement/roof-leak-repair.webp",
      "/biz-photos/chandler-roofing-roof-repair-and-replacement/concrete-tile-roofing.webp",
      "/biz-photos/chandler-roofing-roof-repair-and-replacement/flat-roofing.webp",
      "/biz-photos/chandler-roofing-roof-repair-and-replacement/metal-roofing.webp",
      "/biz-photos/chandler-roofing-roof-repair-and-replacement/roof-maintenance.webp",
    ],
    services: [
      { name: "Residential Roofing", slug: "residential-roofing", image: "/biz-photos/chandler-roofing-roof-repair-and-replacement/residential-roofing.webp", blurb: "From new roof construction and roof replacement to roofing maintenance and roof leak repair — Chandler Roofing has all your residential roofing needs covered." },
      { name: "Commercial Roofing", slug: "commercial-roofing", image: "/biz-photos/chandler-roofing-roof-repair-and-replacement/commercial-roofing.webp", blurb: "Expert commercial roofing for warehouses, strip malls, hospitals, office buildings, schools, and government projects — we work within your budget to maximize your ROI." },
      { name: "Roof Replacement", slug: "roof-replacement", image: "/biz-photos/chandler-roofing-roof-repair-and-replacement/roof-replacement.webp", blurb: "We make replacing your roof effortless, helping you select the best roofing materials within your budget so your roof is worry-free for years to come." },
      { name: "Roof Inspection", slug: "roof-inspection", image: "/biz-photos/chandler-roofing-roof-repair-and-replacement/roof-inspection.webp", blurb: "Our professionals know instantly what can cause problems and what the remedy will be, evaluating your roof with a detailed maintenance checklist." },
      { name: "Roof Leak Repair", slug: "roof-leak-repair", image: "/biz-photos/chandler-roofing-roof-repair-and-replacement/roof-leak-repair.webp", blurb: "Our dedicated leak-repair team responds quickly to evaluate the problem and fix your leaking roof before a small leak turns into a larger one." },
      { name: "Concrete Tile Roofing", slug: "concrete-tile-roofing", image: "/biz-photos/chandler-roofing-roof-repair-and-replacement/concrete-tile-roofing.webp", blurb: "The same great benefits of clay tiles at a fraction of the cost — from repairing individual damaged tiles to complete roof replacements." },
      { name: "Flat Roofing", slug: "flat-roofing", image: "/biz-photos/chandler-roofing-roof-repair-and-replacement/flat-roofing.webp", blurb: "We specialize in single-ply flat roofs — the most practical, modern, and reliable flat roofing option available." },
      { name: "Metal Roofing", slug: "metal-roofing", image: "/biz-photos/chandler-roofing-roof-repair-and-replacement/metal-roofing.webp", blurb: "Lightweight and requiring less structural support, our highly durable metal roofs are designed to fight the harshest weather conditions." },
      { name: "Roof Maintenance", slug: "roof-maintenance", image: "/biz-photos/chandler-roofing-roof-repair-and-replacement/roof-maintenance.webp", blurb: "It's the little things we see that will soon be big things that we aim to prevent — proactive maintenance that protects your roof." },
    ],
  },
  // ro0028 Discount Roofing LLC (discountroofingllcaz.com) — extract-services scraped the site but
  // dropped "Roof" from each name and missed "Inspections & Reports", landing a 6-item list in
  // asset-overrides. Services pinned here by hand to mirror their real site EXACTLY: the seven entries
  // in their services section — Asphalt Shingle Roof Repairs & Replacements, Tile Roof Repairs &
  // Replacements, Flat Roof Repairs & Replacements, Flat Roof Coatings, Foam Roof Installations &
  // Repairs, Inspections & Reports, Emergency Repairs. Manual layer wins on conflict and replaces the
  // array wholesale. showAllServices so all 7 render as cards (the home grid otherwise caps at 6).
  // Logo (webp) + 7 photos + brand color #8a0303 (deep maroon, from the Color.png swatch) auto-wired
  // via asset-overrides.json by process-assets.
  "discount-roofing-llc": {
    showAllServices: true,
    services: [
      { name: "Asphalt Shingle Roof Repairs & Replacements", slug: "asphalt-shingle-roof-repairs-and-replacements", blurb: "Comprehensive repair and replacement services for asphalt shingle roofs — restoring protection and curb appeal at a fair price." },
      { name: "Tile Roof Repairs & Replacements", slug: "tile-roof-repairs-and-replacements", blurb: "Expert repairs and full replacements for tile roofs, matching your home's existing profile and built to last in the Arizona sun." },
      { name: "Flat Roof Repairs & Replacements", slug: "flat-roof-repairs-and-replacements", blurb: "Specialized repair and replacement of flat roofing systems, sealing out leaks and standing water for the long haul." },
      { name: "Flat Roof Coatings", slug: "flat-roof-coatings", blurb: "Protective coatings applied to flat roofs to extend their lifespan, reflect heat, and guard against UV and weather damage." },
      { name: "Foam Roof Installations & Repairs", slug: "foam-roof-installations-and-repairs", blurb: "New foam roof installations and repairs — an energy-efficient, seamless seal that's ideal for Arizona's climate." },
      { name: "Inspections & Reports", slug: "inspections-and-reports", blurb: "Thorough roof inspections with honest, detailed reports and drone imagery, so you know exactly what your roof needs — no upselling." },
      { name: "Emergency Repairs", slug: "emergency-repairs", blurb: "Fast, professional response to urgent roof issues — leaks, storm damage, and broken tiles handled quickly to protect your home." },
    ],
  },
  // ro0024 Titan Roofing & Construction (titanroofingaz.com) — extract-services found the site but Gemini
  // is dead, so it wrote a generic 6-item list into asset-overrides that didn't match their real site.
  // Services pinned here by hand to mirror their site EXACTLY: the five service pages in their nav —
  // Roof Installation, Roof Inspections, Emergency Roofing, Commercial Roofing, Insurance Claims. Manual
  // layer wins on conflict and replaces the array wholesale. Blurbs lifted from their real page copy
  // (residential shingle/tile/foam installs; free no-pressure inspections; 24/7 emergency; commercial
  // TPO/EPDM/metal/SPF/elastomeric; in-house insurance adjuster). aboutBody = their real story (locally
  // owned, GAF Certified Partner, "Building Relationships One Roof at a Time", serves Mesa + Tucson).
  // Logo (svg) + 12 photos + brand color #ff6c02 (orange, from the colour.png swatch) wired via
  // asset-overrides.json by process-assets. Their hero-cover.jpg lands at p1, and BizHero uses photos[0],
  // so the real site hero leads; the rest (DJI aerials + tile/shingle/foam/metal shots) follow for the
  // gallery, so photos are left unpinned and the asset-layer order applies.
  "titan-roofing-and-construction": {
    services: [
      { name: "Roof Installation", slug: "roof-installation", blurb: "We install new roofs built to last in the Arizona sun, specializing in a wide range of materials including shingle, tile, and foam roofs to fit your home and budget." },
      { name: "Roof Inspections", slug: "roof-inspections", blurb: "Schedule a free, no-pressure roof inspection — our team catches small problems early and gives you an honest assessment of exactly what your roof needs." },
      { name: "Emergency Roofing", slug: "emergency-roofing", blurb: "Storm damage or a sudden leak? We're available 24/7 to respond fast, protect your property, and get your roof back to weather-tight." },
      { name: "Commercial Roofing", slug: "commercial-roofing", blurb: "Arizona's best choice in commercial roofing — TPO, EPDM, metal, SPF, and elastomeric coating systems backed by free drone inspections and maintenance packages." },
      { name: "Insurance Claims", slug: "insurance-claims", blurb: "Insurance claims can be overwhelming. Our in-house adjuster works with you every step of the way to secure the maximum coverage you're entitled to." },
    ],
    generatedCopy: {
      heroH1: "Residential & Commercial Roofing Contractors in Arizona",
      heroSubhead: "Titan Roofing is Arizona's premium roofing contractor for homes and businesses — serving Mesa, Tucson, and the surrounding Valley.",
      aboutHeading: "About Titan Roofing",
      aboutBody: [
        "Titan Roofing believes building strong client relationships is just as essential as building world-class roofs. We understand that your roof protects everything you value — which is why we go the distance, every time, to complete your project with care, professionalism, and relentless attention to detail.",
        "With years of experience, we know that no two projects are the same, and we offer an array of roofing solutions to serve a wide range of clients. As a GAF Certified Partner, we have access to the latest roofing materials and technologies, plus the industry's most rigorous training and support programs.",
        "Titan Roofing is locally owned and operated, and serving our neighbors is at the heart of our business. When you choose Titan, you can trust you're getting the best possible roofing services and a promise of durability and workmanship for years to come.",
      ],
    },
  },
  // ro0022 Icon Roofing (iconroofingaz.com) — extract-services crawled the site but Gemini is dead, so
  // it wrote an empty services array + placeholder aboutBody into asset-overrides. Services pinned here
  // by hand to mirror their real site EXACTLY: the six top-level categories in their "Roofing Services"
  // nav (Residential, Roof Repairs, Roof Replacement, Commercial, Multi-Family, Roof Inspections) — the
  // theme's services section shows the first 6 cards, so these map 1:1. Manual layer wins on conflict
  // and replaces the array wholesale, masking the empty crawl. aboutBody overridden with their real story
  // (family-owned Mesa roofer, GAF Master Elite® — top 2% in North America, licensed/bonded/insured
  // ROC# 333889 CR-42, $1M+ insurance, serves Metro Phoenix). Logo + 9 photos + brand color #bf854d
  // (copper/tan, from the Color.png swatch) wired via asset-overrides.json by process-assets. Designer
  // picked imgi_28 (→ p4.webp) as the hero; BizHero uses photos[0], so p4 leads and the rest follow.
  "icon-roofing": {
    photos: [
      "/biz-photos/icon-roofing/p4.webp",
      "/biz-photos/icon-roofing/p1.webp",
      "/biz-photos/icon-roofing/p2.webp",
      "/biz-photos/icon-roofing/p3.webp",
      "/biz-photos/icon-roofing/p5.webp",
      "/biz-photos/icon-roofing/p6.webp",
      "/biz-photos/icon-roofing/p7.webp",
      "/biz-photos/icon-roofing/p8.webp",
      "/biz-photos/icon-roofing/p9.webp",
    ],
    services: [
      { name: "Residential Roofing", slug: "residential-roofing", blurb: "Icon Roofing installs and repairs residential roofs with the best shingle, tile, and flat foam materials — every job backed by our satisfaction guarantee." },
      { name: "Roof Repairs", slug: "roof-repairs", blurb: "From shingle and tile to flat foam and metal, we repair damaged and storm-hit roofs fast to keep your home protected." },
      { name: "Roof Replacement", slug: "roof-replacement", blurb: "When a roof is past repair, we replace it with durable shingle, tile, flat foam, or metal systems — including new-construction installs." },
      { name: "Commercial Roofing", slug: "commercial-roofing", blurb: "We serve commercial and industrial property owners with metal and flat roof repair and replacement built to last in the Arizona sun." },
      { name: "Multi-Family Roofing", slug: "multi-family-roofing", blurb: "Roof repair, replacement, and maintenance for townhomes, condos, duplexes, and HOA communities across Metro Phoenix." },
      { name: "Roof Inspections", slug: "roof-inspections", blurb: "Our thorough roof inspections catch small problems before they become costly repairs — for homes, commercial buildings, and multi-family properties." },
    ],
    generatedCopy: {
      heroH1: "Your Trusted Roofing Company in Arizona",
      heroSubhead: "Family-owned, GAF Master Elite® roofers serving Mesa and the entire Metro Phoenix area.",
      aboutHeading: "About Icon Roofing",
      aboutBody: [
        "Icon Roofing is a family-owned and operated roofing company in Mesa, AZ, proudly serving the entire Metro Phoenix area. We repair damaged roofs and replace or install new roofs on existing homes and new construction.",
        "We're a GAF Master Elite® Contractor — an honor extended to only 2% of roofers in North America — offering competitive pricing, unmatched expertise, and high-quality, durable materials.",
        "Icon Roofing is licensed, bonded, and insured (ROC# 333889 CR-42) with over $1 million in insurance coverage. We back our work with a satisfaction guarantee. Stay Icon Dry!",
      ],
    },
  },
  // ro0019 Overson Roofing (oversonroofing.com) — extract-services ran against the GMB tracking URL
  // (params got URL-encoded into the path) and Gemini is dead anyway, so the crawl's 6-item list in
  // asset-overrides was wrong: it broke Roof Installation's sub-types (Shingle/Tile/Spray Foam) out as
  // standalone services and dropped Roof Installation, Hail Storm Damage, Attic Ventilation, and the
  // commercial line. Services pinned here by hand to mirror their real site EXACTLY — the Residential
  // nav (Replacement, Installation, Repair, Hail Storm Damage, Attic Ventilation) plus Commercial
  // (built-up, foam, inspection) — so the manual layer wins and replaces the array wholesale. aboutBody
  // overridden with their real story (Phoenix roofer founded 2005, 40+ yrs experience, licensed/bonded/
  // insured, NRCA + ARCA members). Logo + 10 photos + brand color #de282c (red) wired via
  // asset-overrides.json by process-assets. Designer pinned imgi_23 (→ p4.webp) as the hero; BizHero
  // uses photos[0], so p4 leads and the other nine follow for the gallery.
  "overson-roofing": {
    photos: [
      "/biz-photos/overson-roofing/p4.webp",
      "/biz-photos/overson-roofing/p1.webp",
      "/biz-photos/overson-roofing/p2.webp",
      "/biz-photos/overson-roofing/p3.webp",
      "/biz-photos/overson-roofing/p5.webp",
      "/biz-photos/overson-roofing/p6.webp",
      "/biz-photos/overson-roofing/p7.webp",
      "/biz-photos/overson-roofing/p8.webp",
      "/biz-photos/overson-roofing/p9.webp",
      "/biz-photos/overson-roofing/p10.webp",
    ],
    services: [
      { name: "Roof Replacement", slug: "roof-replacement", blurb: "When repairs are no longer enough, we replace worn and aging roofs with durable systems engineered to stand up to the Arizona sun." },
      { name: "Roof Installation", slug: "roof-installation", blurb: "We install new roofs built to last — shingle, tile, and spray foam systems chosen to fit your home and protect it for decades." },
      { name: "Roof Repair", slug: "roof-repair", blurb: "From leaks to worn flashing, we repair residential and commercial roofs quickly and correctly to keep your property protected." },
      { name: "Hail Storm Damage", slug: "hail-storm-damage", blurb: "After a storm, we assess and restore hail-damaged roofs, helping you get back to a roof that's whole and weather-tight." },
      { name: "Attic Ventilation", slug: "attic-ventilation", blurb: "Proper attic ventilation protects your roof and lowers cooling costs — we install and improve systems built for Arizona's heat." },
      { name: "Commercial Roofing", slug: "commercial-roofing", blurb: "Built-up roofing, foam roofing, and thorough roof inspections for businesses that need a roof that lasts." },
    ],
    generatedCopy: {
      aboutBody: [
        "Overson Roofing provides quality roofing work in Phoenix, AZ and the surrounding areas, backed by over 40 years of professional experience. Founded in 2005, we understand what it takes to build a roof that withstands the heat and weather of the Arizona sun.",
        "As a fully licensed, bonded, and insured roofing company, we work with only the highest integrity and service. We hold a flawless record with the Arizona Registrar of Contractors and are proud members of the National Roofing Contractors Association (NRCA) and the Arizona Roofing Contractors Association (ARCA).",
      ],
    },
  },
  // ro0037 Skylux Builders LLC (skyluxbuilders.com) — Gilbert roofer. Logo + 9 photos + brand colors
  // #fd4a37 (red) / #0c1928 (navy) wired via asset-overrides.json by process-assets; services already
  // match the live "Our Services" exactly (Flat Roofs, Metal Roofing, Roof Installation, Roof Repair,
  // Roof Replacement, Tile Roof). Designer picked imgi_15_banner-21.jpg (→ p4.webp, the shingle-nailing
  // close-up) as the hero; BizHero uses photos[0], so p4 leads and the rest follow for the gallery —
  // the manual layer replaces the asset-overrides photos array wholesale.
  "skylux-builders-llc-roofing-and-roof-repair-gilbert": {
    photos: [
      "/biz-photos/skylux-builders-llc-roofing-and-roof-repair-gilbert/p4.webp",
      "/biz-photos/skylux-builders-llc-roofing-and-roof-repair-gilbert/p1.webp",
      "/biz-photos/skylux-builders-llc-roofing-and-roof-repair-gilbert/p2.webp",
      "/biz-photos/skylux-builders-llc-roofing-and-roof-repair-gilbert/p3.webp",
      "/biz-photos/skylux-builders-llc-roofing-and-roof-repair-gilbert/p5.webp",
      "/biz-photos/skylux-builders-llc-roofing-and-roof-repair-gilbert/p6.webp",
      "/biz-photos/skylux-builders-llc-roofing-and-roof-repair-gilbert/p7.webp",
      "/biz-photos/skylux-builders-llc-roofing-and-roof-repair-gilbert/p8.webp",
      "/biz-photos/skylux-builders-llc-roofing-and-roof-repair-gilbert/p9.webp",
    ],
  },
  // ro0016 Mesa Roofing LLC (mesaroofingaz.com) — designer's call: dark (near-black) nav +
  // footer so the white logo stays visible. Services locked by hand to match the live site
  // exactly (Residential menu pages + "Types of Roofs" section): Tile Roof Repair, Shingle
  // Roofing, Flat Roofs, Attic Ventilation — wired via asset-overrides.json.
  "mesa-roofing-llc": {
    chromeDark: true,
  },
  // ro0020 Mesa Roofing - Roof Repair & Replacement (roofing-mesa.com) — no logo provided, so per the
  // designer we show their name as a plain text wordmark instead. name shortened to "Mesa Roofing"
  // (drops the GMB "- Roof Repair & Replacement" SEO suffix) so nav, footer, and © all read cleanly,
  // and logoBadge:false hides the letter-badge for a text-only treatment. Services already match the
  // live site exactly (Residential, Roof Replacement, Roof Leak Repair, Commercial, Industrial, 24hr
  // Emergency) — verified against roofing-mesa.com. Brand color #0170ba (blue) remains wired via
  // asset-overrides.json; the manual layer now binds a cohesive original Arizona photo to every service.
  "mesa-roofing-roof-repair-and-replacement": {
    name: "Mesa Roofing",
    logoBadge: false,
    photos: [
      "/biz-photos/mesa-roofing-roof-repair-and-replacement/hero.webp",
      "/biz-photos/mesa-roofing-roof-repair-and-replacement/residential-roofing.webp",
      "/biz-photos/mesa-roofing-roof-repair-and-replacement/roof-replacement.webp",
      "/biz-photos/mesa-roofing-roof-repair-and-replacement/roof-leak-repair.webp",
      "/biz-photos/mesa-roofing-roof-repair-and-replacement/commercial-roofing.webp",
      "/biz-photos/mesa-roofing-roof-repair-and-replacement/industrial-roofing.webp",
      "/biz-photos/mesa-roofing-roof-repair-and-replacement/emergency-service.webp",
    ],
    services: [
      { name: "Residential Roofing", slug: "residential-roofing", image: "/biz-photos/mesa-roofing-roof-repair-and-replacement/residential-roofing.webp", blurb: "New construction, replacement, maintenance, and leak repair for Mesa homes, delivered with experienced craftsmanship and careful attention to your property." },
      { name: "Mesa Roof Replacement", slug: "mesa-roof-replacement", image: "/biz-photos/mesa-roofing-roof-repair-and-replacement/roof-replacement.webp", blurb: "A straightforward replacement process with a detailed assessment and practical material guidance to help you choose a durable roof that fits your budget." },
      { name: "Mesa Roof Leak Repair", slug: "mesa-roof-leak-repair", image: "/biz-photos/mesa-roofing-roof-repair-and-replacement/roof-leak-repair.webp", blurb: "Prompt diagnosis and lasting repair for roof leaks, missing materials, damaged flashing, and other trouble spots before minor damage becomes a major problem." },
      { name: "Commercial Roofing", slug: "commercial-roofing", image: "/biz-photos/mesa-roofing-roof-repair-and-replacement/commercial-roofing.webp", blurb: "Commercial roof construction, maintenance, re-roofing, and leak repair for buildings of every size, planned around code, budget, and long-term return on investment." },
      { name: "Industrial Roofing", slug: "industrial-roofing", image: "/biz-photos/mesa-roofing-roof-repair-and-replacement/industrial-roofing.webp", blurb: "Flat and low-slope industrial roofing expertise for warehouses and facilities, including TPO, PVC, modified bitumen, built-up, foam, metal, and restoration coatings." },
      { name: "24 Hour Emergency Service", slug: "24-hour-emergency-service", image: "/biz-photos/mesa-roofing-roof-repair-and-replacement/emergency-service.webp", blurb: "A 24/7 response team ready to secure storm or leak damage quickly and help make your home or business safely watertight in an urgent situation." },
    ],
  },
  // ro0017 Right Way Roofing, Inc. (azroof.com) — extract-services couldn't run (dead Gemini key +
  // headless Chrome crashed on a full temp disk), so it wrote an empty services array and a
  // redirect-error aboutBody into asset-overrides. Services pinned here by hand to match the live
  // site exactly (Residential menu + materials + Commercial + Emergency), and aboutBody overridden
  // with their real story (family-owned Phoenix roofer since 1963). Manual layer wins on conflict,
  // masking the garbage. Logo + 10 photos + brand color #ffce04 (gold) wired via asset-overrides.json.
  "right-way-roofing-inc": {
    services: [
      { name: "Roof Installation", slug: "roof-installation", blurb: "We install new roofs built to last, using quality materials and proven techniques to protect your home or business for decades." },
      { name: "Roof Replacement", slug: "roof-replacement", blurb: "When repairs are no longer enough, we replace worn and aging roofs with durable systems engineered for Arizona's climate." },
      { name: "Roof Repair & Restoration", slug: "roof-repair-restoration", blurb: "From leaks to storm damage, we repair and restore roofs quickly and correctly to keep your property protected." },
      { name: "Roof Inspections", slug: "roof-inspections", blurb: "Our thorough roof inspections catch problems early and give you a clear, honest picture of your roof's condition." },
      { name: "Tile Roofing", slug: "tile-roofing", blurb: "We specialize in concrete and clay tile roofing — installation, repair, and replacement done the right way." },
      { name: "Shingle Roofing", slug: "shingle-roofing", blurb: "Reliable, cost-effective shingle roofing systems installed and repaired by our experienced crews." },
      { name: "Foam & Flat Roofing", slug: "foam-flat-roofing", blurb: "Energy-efficient foam, elastomeric, and built-up flat roofing solutions for low-slope residential and commercial roofs." },
      { name: "Commercial Roofing", slug: "commercial-roofing", blurb: "Full-service commercial roof installation and repair, managed efficiently to minimize downtime for your business." },
      { name: "Skylight Roofing", slug: "skylight-roofing", blurb: "Expert skylight installation and sealing that brings in natural light without compromising your roof's integrity." },
      { name: "Emergency Roof Repairs", slug: "emergency-roof-repairs", blurb: "24/7 emergency roof repair to stop leaks and damage fast when storms or accidents strike." },
    ],
    generatedCopy: {
      aboutBody: [
        "There's only one way — the right way. That's been the promise behind Right Way Roofing since 1963, when we set out to become a roofing company Phoenix-area homeowners and businesses could truly trust.",
        "As a family-owned company with more than 60 years serving Arizona, we bring deep experience to every project — from tile and shingle installations to foam, flat, and commercial roofing. We do the job right the first time, with honest guidance and craftsmanship that lasts.",
      ],
    },
  },
  // ro0015 Johnson Roofing Llc (johnsonroofingaz.com) — designer pinned the roofer-nailing-shingles
  // screenshot (→ p5.webp) as the hero; BizHero uses photos[0], so p5 leads and the other four follow
  // for the gallery. Logo + 5 photos + brand color #1e3869 (navy) + site-matched services wired via
  // asset-overrides.json by process-assets.
  "johnson-roofing-llc": {
    photos: [
      "/biz-photos/johnson-roofing-llc/p5.webp",
      "/biz-photos/johnson-roofing-llc/p1.webp",
      "/biz-photos/johnson-roofing-llc/p2.webp",
      "/biz-photos/johnson-roofing-llc/p3.webp",
      "/biz-photos/johnson-roofing-llc/p4.webp",
    ],
  },
  // ro0014 A1 Roofing Solutions (a1roofingaz.com) — extract-services rendered the site but Gemini
  // failed (dead API key), leaving a 6-item list in asset-overrides that was missing Installation,
  // Inspection/Maintenance, and Shingle & Flat. Designer dictated the real site's eight services;
  // pinned here by hand so the manual layer wins (replaces the array wholesale) in the site's exact
  // order. Overlapping blurbs reuse the crawl's voice; the three new ones are written to match.
  // Logo + 12 photos + brand color #16928c wired via asset-overrides.json by process-assets.
  // Designer pinned imgi_59 (→ p12.webp) as the hero; BizHero uses photos[0], so p12 leads and
  // the other eleven follow for the gallery.
  "a1-roofing-solutions": {
    photos: [
      "/biz-photos/a1-roofing-solutions/p12.webp",
      "/biz-photos/a1-roofing-solutions/p1.webp",
      "/biz-photos/a1-roofing-solutions/p2.webp",
      "/biz-photos/a1-roofing-solutions/p3.webp",
      "/biz-photos/a1-roofing-solutions/p4.webp",
      "/biz-photos/a1-roofing-solutions/p5.webp",
      "/biz-photos/a1-roofing-solutions/p6.webp",
      "/biz-photos/a1-roofing-solutions/p7.webp",
      "/biz-photos/a1-roofing-solutions/p8.webp",
      "/biz-photos/a1-roofing-solutions/p9.webp",
      "/biz-photos/a1-roofing-solutions/p10.webp",
      "/biz-photos/a1-roofing-solutions/p11.webp",
    ],
    services: [
      { name: "Residential Roofing Service", slug: "residential-roofing-service", blurb: "Our team provides expert residential roofing services, handling repairs, replacements, and new roof installations with care, ensuring your home is safe, functional, and visually appealing." },
      { name: "Commercial Roofing Contractors", slug: "commercial-roofing-contractors", blurb: "We provide professional commercial roofing services for businesses of all sizes, managing projects efficiently using durable materials and advanced techniques to ensure your property is well-protected." },
      { name: "Roof Repair Service", slug: "roof-repair-service", blurb: "We deliver comprehensive roof repair services, inspecting for leaks, damage, or structural issues, and providing high-quality repairs to restore your roof’s integrity, extend its lifespan, and prevent further problems." },
      { name: "Roof Replacement Service", slug: "roof-replacement-service", blurb: "When a roof replacement is needed, our team handles every step with expertise, removing the old roof safely and installing a durable new one to ensure your property receives reliable protection, enhanced aesthetics, and long-lasting performance." },
      { name: "Roof Installation Service", slug: "roof-installation-service", blurb: "We specialize in new roof installations for residential and commercial properties, guiding you through material selection, design, and installation, ensuring your new roof is durable, weather-resistant, and visually appealing." },
      { name: "Storm Damage Roof Repair", slug: "storm-damage-roof-repair", blurb: "After storms, trust us for efficient storm damage roof repairs; our team assesses damage, provides accurate estimates, and completes repairs quickly to restore your roof’s strength and appearance." },
      { name: "Roof Inspection and Maintenance Service", slug: "roof-inspection-and-maintenance-service", blurb: "Regular roof inspections and maintenance catch small issues before they become costly problems, and our thorough assessments keep your roof performing and protected season after season." },
      { name: "Shingle and Flat Roofing Service", slug: "shingle-and-flat-roofing-service", blurb: "From durable shingle roofs to low-slope flat roofing systems, we install and service both with quality materials and proven techniques built to withstand Arizona’s climate." },
    ],
  },

  // ro0013 Arizona Sky Roofing Consultants (azskyroofing.com) — Gemini key is dead, so the crawl's
  // 6-item list (in asset-overrides) was wrong: it included "Insurance Claim Assistance" and dropped
  // Roof Shingles + Residential Roofing. Designer dictated the real site's seven services; pinned
  // here by hand so the manual layer wins, in this order: Roof Installation, Roof Repair, Commercial
  // Roofing, Storm Damage Repair, Roof Shingles, Roof Replacement, Residential Roofing. Blurbs for
  // the five overlapping services are kept verbatim from the site's service cards (via the crawl);
  // Shingles + Residential are written to match that voice. Designer pinned imgi_10 (→ p2.webp) as
  // the hero; BizHero uses photos[0], so p2 leads and the other eight follow for the gallery. Logo +
  // 9 photos + brand colors #8d5217 / #d79933 wired via asset-overrides.json by process-assets.
  "arizona-sky-roofing-consultants-roofing-contractor-and-roof-": {
    photos: [
      "/biz-photos/arizona-sky-roofing-consultants-roofing-contractor-and-roof-/p2.webp",
      "/biz-photos/arizona-sky-roofing-consultants-roofing-contractor-and-roof-/p1.webp",
      "/biz-photos/arizona-sky-roofing-consultants-roofing-contractor-and-roof-/p3.webp",
      "/biz-photos/arizona-sky-roofing-consultants-roofing-contractor-and-roof-/p4.webp",
      "/biz-photos/arizona-sky-roofing-consultants-roofing-contractor-and-roof-/p5.webp",
      "/biz-photos/arizona-sky-roofing-consultants-roofing-contractor-and-roof-/p6.webp",
      "/biz-photos/arizona-sky-roofing-consultants-roofing-contractor-and-roof-/p7.webp",
      "/biz-photos/arizona-sky-roofing-consultants-roofing-contractor-and-roof-/p8.webp",
      "/biz-photos/arizona-sky-roofing-consultants-roofing-contractor-and-roof-/p9.webp",
    ],
    services: [
      { name: "Roof Installation", slug: "roof-installation", blurb: "Whether you’re building a new home or replacing your current roof, Arizona Sky Roofing has you covered with professional, dependable roofing solutions." },
      { name: "Roof Repair", slug: "roof-repair", blurb: "Your roof is your first line of defense against the elements, and we provide expert roof repair services for minor and major problems." },
      { name: "Commercial Roofing", slug: "commercial-roofing", blurb: "Your business deserves a roof that’s strong, reliable, and built to last, and we provide commercial roofing solutions for installation or repair services." },
      { name: "Storm Damage Repair", slug: "storm-damage-repair", blurb: "Severe weather can wreak havoc on your roof, and we offer roof storm damage repairs to get your roof back to perfect condition." },
      { name: "Roof Shingles", slug: "roof-shingles", blurb: "From asphalt to architectural shingles, we install durable, great-looking shingle roofs built to stand up to Arizona’s sun and seasonal storms." },
      { name: "Roof Replacement", slug: "roof-replacement", blurb: "When it’s time to say goodbye to your old, worn-out roof, trust us to deliver a seamless roof replacement that protects your home for years to come." },
      { name: "Residential Roofing", slug: "residential-roofing", blurb: "Your home deserves a roof you can count on, and we deliver quality residential roofing built to protect your family for years to come." },
    ],
  },
  // ro0008 Brown Roofing LLC (brownroofingaz.com) — Gemini key is dead, so the services list is
  // pinned here by hand to mirror their real site EXACTLY. Their nav + "What We Do Best" section
  // list seven offerings, in this order: Tile, Flat, Shingle, Foam Roofing, Reroofing, Roof Repairs,
  // and Walk Deck Coating (the crawl's earlier 6-item list dropped Walk Deck Coating). Blurbs are
  // taken verbatim from the site's service cards. Family-owned, protecting AZ roofs since 1974
  // (50+ yrs), GAF + Malarkey certified, A+ BBB. Logo + 12 photos + brand color #7d0a24 (maroon)
  // wired via asset-overrides.json by process-assets; aboutBody also lives there. Designer pinned
  // imgi_12_clay-tile-residential-home (→ p2.webp) as the hero; BizHero uses photos[0], so p2 leads
  // and the other 11 follow for the gallery.
  "brown-roofing-llc": {
    photos: [
      "/biz-photos/brown-roofing-llc/p2.webp",
      "/biz-photos/brown-roofing-llc/p1.webp",
      "/biz-photos/brown-roofing-llc/p3.webp",
      "/biz-photos/brown-roofing-llc/p4.webp",
      "/biz-photos/brown-roofing-llc/p5.webp",
      "/biz-photos/brown-roofing-llc/p6.webp",
      "/biz-photos/brown-roofing-llc/p7.webp",
      "/biz-photos/brown-roofing-llc/p8.webp",
      "/biz-photos/brown-roofing-llc/p9.webp",
      "/biz-photos/brown-roofing-llc/p10.webp",
      "/biz-photos/brown-roofing-llc/p11.webp",
      "/biz-photos/brown-roofing-llc/p12.webp",
    ],
    services: [
      { name: "Tile Roofing", slug: "tile-roofing", blurb: "Classic desert style with long-lasting performance." },
      { name: "Flat Roofing", slug: "flat-roofing", blurb: "Sleek, durable systems for homes and businesses." },
      { name: "Shingle Roofing", slug: "shingle-roofing", blurb: "Versatile, budget-friendly protection for any home." },
      { name: "Foam Roofing", slug: "foam-roofing", blurb: "Lightweight, energy-efficient coverage for flat roofs." },
      { name: "Reroofing", slug: "reroofing", blurb: "Restore your roof's strength without a full tear-off." },
      { name: "Roof Repairs", slug: "roof-repairs", blurb: "Stop leaks fast and prevent future damage." },
      { name: "Walk Deck Coating", slug: "walk-deck-coating", blurb: "Waterproof your outdoor spaces with clean, seamless coatings." },
    ],
  },
  // ro0011 Reyes Roofing LLC (reyesroofingllc.co) — Gemini key is dead, so the crawl's partial
  // 5-item list (in asset-overrides) was missing Maintenance and used inconsistent names
  // ("Shingle Roofs"/"Foam Roofs"). Designer dictated six services; pinned here by hand so the
  // manual layer wins: Tile, Shingle, Foam, Commercial, Leak Repair, Maintenance. Logo + 7 photos
  // + brand color #bfa025 (gold) wired via asset-overrides.json by process-assets.
  "reyes-roofing-llc": {
    chromeDark: true, // logo is white — near-black nav pill (and footer) so it stays visible
    // process-assets' white-background removal erased the all-white logotype (446-byte empty webp),
    // so point at logo-white.webp — the original re-encoded WITHOUT background removal (alpha kept).
    logo: "/biz-photos/reyes-roofing-llc/logo-white.webp",
    // Designer pinned imgi_43_rf-bg-1 (→ p7.webp) as the hero; BizHero uses photos[0], so p7 leads
    // and the other six follow for the gallery.
    photos: [
      "/biz-photos/reyes-roofing-llc/p7.webp",
      "/biz-photos/reyes-roofing-llc/p1.webp",
      "/biz-photos/reyes-roofing-llc/p2.webp",
      "/biz-photos/reyes-roofing-llc/p3.webp",
      "/biz-photos/reyes-roofing-llc/p4.webp",
      "/biz-photos/reyes-roofing-llc/p5.webp",
      "/biz-photos/reyes-roofing-llc/p6.webp",
    ],
    services: [
      { name: "Tile Roofing", slug: "tile-roofing", blurb: "Classic desert style with long-lasting performance." },
      { name: "Shingle Roofing", slug: "shingle-roofing", blurb: "Versatile, budget-friendly protection for any home." },
      { name: "Foam Roofing", slug: "foam-roofing", blurb: "Lightweight, energy-efficient coverage for flat roofs." },
      { name: "Commercial Roofing", slug: "commercial-roofing", blurb: "Reliable, long-lasting systems for businesses and properties." },
      { name: "Leak Repair", slug: "leak-repair", blurb: "Stop leaks fast and prevent future water damage." },
      { name: "Maintenance", slug: "maintenance", blurb: "Routine care that keeps your roof protecting you for years." },
    ],
  },
  // ro0012 Valley Roofing and Repair (valleyroofingandrepair.com) — Gemini key is dead, so the
  // services are pinned here by hand to mirror their real site EXACTLY. Their "Our Services" nav
  // lists eight offerings, in this order: Commercial & Industrial Roofing, Residential Roofing,
  // Roof Inspection, Roof Installation, Roof Repair, Storm & Roof Damage Repair, Real Estate
  // Roofing Services, and Roofing for Property Management. Slugs match the script's slugify rules.
  // Logo (mid-tone mark, reads fine on the default white nav) + 16 photos + brand color #f1811b
  // (orange) wired via asset-overrides.json by process-assets; real aboutBody also lives there.
  // Designer pinned imgi_142_About-Valley-roofing (→ p2.webp) as the hero; BizHero uses photos[0],
  // so p2 leads and the other 15 follow for the gallery.
  "valley-roofing-and-repair": {
    photos: [
      "/biz-photos/valley-roofing-and-repair/p2.webp",
      "/biz-photos/valley-roofing-and-repair/p1.webp",
      "/biz-photos/valley-roofing-and-repair/p3.webp",
      "/biz-photos/valley-roofing-and-repair/p4.webp",
      "/biz-photos/valley-roofing-and-repair/p5.webp",
      "/biz-photos/valley-roofing-and-repair/p6.webp",
      "/biz-photos/valley-roofing-and-repair/p7.webp",
      "/biz-photos/valley-roofing-and-repair/p8.webp",
      "/biz-photos/valley-roofing-and-repair/p9.webp",
      "/biz-photos/valley-roofing-and-repair/p10.webp",
      "/biz-photos/valley-roofing-and-repair/p11.webp",
      "/biz-photos/valley-roofing-and-repair/p12.webp",
      "/biz-photos/valley-roofing-and-repair/p13.webp",
      "/biz-photos/valley-roofing-and-repair/p14.webp",
      "/biz-photos/valley-roofing-and-repair/p15.webp",
      "/biz-photos/valley-roofing-and-repair/p16.webp",
    ],
    services: [
      { name: "Commercial & Industrial Roofing", slug: "commercial-and-industrial-roofing", blurb: "Expert roofing solutions built for commercial and industrial properties." },
      { name: "Residential Roofing", slug: "residential-roofing", blurb: "High-quality roofing systems that protect and beautify your home." },
      { name: "Roof Inspection", slug: "roof-inspection", blurb: "Thorough assessments that catch leaks, storm damage, and wear early." },
      { name: "Roof Installation", slug: "roof-installation", blurb: "Professional installation of durable new roofing systems." },
      { name: "Roof Repair", slug: "roof-repair", blurb: "Fast, reliable repairs that keep your existing roof performing." },
      { name: "Storm & Roof Damage Repair", slug: "storm-and-roof-damage-repair", blurb: "Insurance-savvy restoration after monsoons, wind, and storm damage." },
      { name: "Real Estate Roofing Services", slug: "real-estate-roofing-services", blurb: "Roof certifications and repairs that keep real estate deals on track." },
      { name: "Roofing for Property Management", slug: "roofing-for-property-management", blurb: "Ongoing roofing support and maintenance for managed properties." },
    ],
  },
  // ro0009 Reimagine Roofing (reimagineroofing.com) — the stored existingWebsite had encoded UTM
  // junk so the crawl hit a 404, and the Gemini key is dead, so extract-services wrote an empty
  // services list + an error-text aboutBody. Services pinned here by hand to mirror the real site's
  // IA: their top-level offerings are Roofing, Siding, Windows, and Gutters, with Commercial Roofing
  // and Free Roof Inspections (incl. emergency tarping) called out. Founded 2020, veteran-operated,
  // 50+ crew, 4,000+ roofs, "happiest roofing company in America." Logo + 9 photos + brand color
  // #01497c (navy) wired via asset-overrides.json by process-assets. Manual services replace the
  // (empty) asset-overrides array wholesale; aboutBody here overrides the crawl's error text.
  // ro0046 Black Wolf Roofing (blackwolfroofingco.com) — logo is an all-white wordmark on a
  // transparent bg, so it vanishes on Theme 1's default white chrome. chromeDark renders the nav
  // pill (and footer) near-black so the white logo reads — designer's explicit ask. Logo + 11 real
  // photos + brand color #988880 (taupe swatch dropped as "Screenshot …png", renamed to Color.png so
  // process-assets picked it up) wired via asset-overrides.json. Services left as-is: the generated
  // 6-line catalog already matches their site, and the designer asked to keep them unchanged.
  "black-wolf-roofing": {
    chromeDark: true,
  },
  // ro0010 Phoenix Roofing Replacement Pros (roofreplacementphoenixaz.com) — extract-services
  // rendered the site but Gemini failed (dead API key), so it left a 6-item services list. Designer
  // confirmed the real site offers exactly THREE service lines: Residential, Commercial, and
  // Specialty roofing — pinned here so the manual 3-item array replaces the asset-overrides 6-item
  // one wholesale. navBg = their brand orange (#f26327): the logo has BOTH white and dark (#222222)
  // artwork, so neither a white nor a black pill shows the whole mark — the orange backdrop does.
  // Logo + 5 photos + brand color wired via asset-overrides.json by process-assets.
  "phoenix-roofing-replacement-pros": {
    navBg: "#f26327",
    services: [
      { name: "Residential Roofing", slug: "residential-roofing", blurb: "Protect your home with durable, beautiful roofing built for the Arizona climate — asphalt shingle, metal, and tile installs that boost curb appeal and stand up to extreme heat and monsoon storms." },
      { name: "Commercial Roofing", slug: "commercial-roofing", blurb: "Reliable roofing systems for retail spaces, offices, schools, and more, using commercial-grade materials for long-term durability and a polished, professional appearance." },
      { name: "Specialty Roofing", slug: "specialty-roofing", blurb: "High-end roofing in slate, shake, and Spanish tile — premium options that combine lasting performance with timeless style and custom installs tailored to your architecture." },
    ],
  },
  "reimagine-roofing": {
    services: [
      { name: "Roofing", slug: "roofing", blurb: "Expert roof installation and replacement for new construction and re-roofs — shingle, tile, metal, stone-coated steel, and flat & foam." },
      { name: "Siding", slug: "siding", blurb: "Professional siding installation in vinyl, wood, fiber cement, and more to protect and refresh your home's exterior." },
      { name: "Windows", slug: "windows", blurb: "Installation of a full range of window types — double-hung, casement, bay, and sliding — for better efficiency and curb appeal." },
      { name: "Gutters", slug: "gutters", blurb: "Seamless gutter installation that channels Arizona's monsoon rain safely away from your roof and foundation." },
      { name: "Commercial Roofing", slug: "commercial-roofing", blurb: "Durable flat and foam roofing systems for commercial properties, built to handle the desert sun and seal out the rain." },
      { name: "Free Roof Inspections", slug: "free-roof-inspections", blurb: "Free, no-pressure roof inspections plus emergency tarping to protect your home the moment damage strikes." },
    ],
    generatedCopy: {
      aboutBody: [
        "Reimagine Roofing started in 2020 with a couple of people, a single truck, and a small office — and a simple idea: make buying a roof the easiest, friendliest experience in the business. Today we're a 50-plus person, veteran-operated team that has installed over 4,000 roofs across the Valley, backed by more than 700 five-star reviews.",
        "We call ourselves the happiest roofing company in America, and we mean it. From free inspections and emergency tarping to full roof, siding, window, and gutter installs, we guarantee our start and completion dates — or we pay you — and offer financing as low as $99/month with industry-leading warranties on every job.",
      ],
    },
  },
  // ro0006 Phoenix Roofers by Allstate Roofing Contractors (allstateroofingaz.com) —
  // extract-services rendered the site but Gemini failed (bad API key), so services are pinned by
  // hand to mirror the real site's IA. Their menu/services center on the roof TYPES they install plus
  // repair and full re-roof: Tile, Foam, Shingle, Roof Repair, and Complete Re-Roof. Residential
  // specialists, 10+ years in business. Logo + 10 photos + brand color #88781e wired via
  // asset-overrides.json by process-assets.
  "phoenix-roofers-by-allstate-roofing-contractors": {
    // Hero = the roofer-on-tile-roof shot (imgi_151, processed to p10.webp) per designer note.
    // photos[0] drives the hero; reordered so it leads, the other 9 follow for the gallery.
    photos: [
      "/biz-photos/phoenix-roofers-by-allstate-roofing-contractors/p10.webp",
      "/biz-photos/phoenix-roofers-by-allstate-roofing-contractors/p1.webp",
      "/biz-photos/phoenix-roofers-by-allstate-roofing-contractors/p2.webp",
      "/biz-photos/phoenix-roofers-by-allstate-roofing-contractors/p3.webp",
      "/biz-photos/phoenix-roofers-by-allstate-roofing-contractors/p4.webp",
      "/biz-photos/phoenix-roofers-by-allstate-roofing-contractors/p5.webp",
      "/biz-photos/phoenix-roofers-by-allstate-roofing-contractors/p6.webp",
      "/biz-photos/phoenix-roofers-by-allstate-roofing-contractors/p7.webp",
      "/biz-photos/phoenix-roofers-by-allstate-roofing-contractors/p8.webp",
      "/biz-photos/phoenix-roofers-by-allstate-roofing-contractors/p9.webp",
    ],
    services: [
      { name: "Tile Roofing", slug: "tile-roofing", blurb: "Expert installation and repair of tile roof systems, built to stand up to the Arizona desert sun and last for decades." },
      { name: "Foam Roofing", slug: "foam-roofing", blurb: "Flat foam roof installation and recoating that seals your roof tight against the heat and monsoon rain." },
      { name: "Shingle Roofing", slug: "shingle-roofing", blurb: "Quality asphalt shingle installation and maintenance for lasting protection and curb appeal." },
      { name: "Roof Repair", slug: "roof-repair", blurb: "Fast, reliable repairs for leaks, weather damage, and aging roofs — restoring your roof to top condition." },
      { name: "Complete Re-Roof", slug: "complete-re-roof", blurb: "Full re-roofing and replacement services for shingle, foam, and tile roofs when it's time to start fresh." },
    ],
  },
  // ro0005 Arizona Roofers (arizonaroofers.com) — extract-services skipped (no existingWebsite on
  // record + Gemini key is dead), so services are pinned by hand to mirror the real site's IA. Their
  // nav organizes services by ROOF TYPE under Residential/Commercial flyouts: Tile, Shingle, Metal,
  // Foam, Modified Bitumen, and Elastomeric Coatings. GAF Master Elite, 12+ years. Logo + 9 photos +
  // brand color #fe0000 wired via asset-overrides.json by process-assets.
  "arizona-roofers": {
    bgOverride: "#F2F2F2", // light grey — replaces the red-tinted (blush pink) section washes; red stays the accent
    // Designer pinned imgi_61_IMG_2018-scaled (→ p6.webp) as the hero; BizHero uses photos[0], so p6
    // leads and the other 8 follow for the gallery.
    photos: [
      "/biz-photos/arizona-roofers/p6.webp",
      "/biz-photos/arizona-roofers/p1.webp",
      "/biz-photos/arizona-roofers/p2.webp",
      "/biz-photos/arizona-roofers/p3.webp",
      "/biz-photos/arizona-roofers/p4.webp",
      "/biz-photos/arizona-roofers/p5.webp",
      "/biz-photos/arizona-roofers/p7.webp",
      "/biz-photos/arizona-roofers/p8.webp",
      "/biz-photos/arizona-roofers/p9.webp",
    ],
    services: [
      { name: "Tile Roofing", slug: "tile-roofing", blurb: "Durable, classic tile roofing installed and repaired to stand up to the Arizona sun and last for decades." },
      { name: "Shingle Roofing", slug: "shingle-roofing", blurb: "Quality asphalt shingle roofing that balances lasting protection, value, and curb appeal for your home." },
      { name: "Metal Roofing", slug: "metal-roofing", blurb: "Long-lasting, energy-efficient metal roofing built to reflect heat and weather every Arizona season." },
      { name: "Foam Roofing", slug: "foam-roofing", blurb: "Seamless spray-foam roofing that insulates and waterproofs flat and low-slope roofs against the desert heat." },
      { name: "Modified Bitumen Roofing", slug: "modified-bitumen-roofing", blurb: "Tough, multi-layer modified bitumen systems engineered to protect flat and low-slope roofs for the long haul." },
      { name: "Elastomeric Coatings", slug: "elastomeric-coatings", blurb: "Reflective elastomeric roof coatings that seal, cool, and extend the life of your existing roof." },
    ],
  },
  // ro0082 Arizona Roof Rescue (Glendale; owner Alan Monzon) — designer dropped logo + a red Color
  // swatch (renamed from a Screenshot so process-assets read it) + 8 real roof photos; logo, p1–p8, and
  // brand red #d63127 wired via asset-overrides.json. Designer note: KEEP the existing homepage hero —
  // BizHero uses photos[0], so the original stock GMB hero URL is pinned first here and the 8 real photos
  // follow for the gallery / Why-Us / marquee. Replaces the asset photos array wholesale.
  "arizona-roof-rescue": {
    photos: [
      "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEUlXQz-pU9evFlhOXZU1CF2gT1uH9vlWLj9kvR7rza-WwEcRJikif9Bw7buEM1vBf3gGdSjCTlIgYzvpoTR0fPzVo3EiJ_1AvvhoYLfKA3_vluDxRDIVk7lACprWgyEuqlMiyQ=w800-h500-k-no",
      "/biz-photos/arizona-roof-rescue/p8.webp",
      "/biz-photos/arizona-roof-rescue/p1.webp",
      "/biz-photos/arizona-roof-rescue/p2.webp",
      "/biz-photos/arizona-roof-rescue/p3.webp",
      "/biz-photos/arizona-roof-rescue/p7.webp",
      "/biz-photos/arizona-roof-rescue/p4.webp",
      "/biz-photos/arizona-roof-rescue/p5.webp",
      "/biz-photos/arizona-roof-rescue/p6.webp",
    ],
  },
  // ro0002 Lyons Roofing (lyonsroofing.com) — extract-services rendered the site but Gemini failed
  // (bad API key), so services are pinned by hand to mirror the real site's IA. The auto version had
  // only 6 cards and dropped Replacement, Maintenance, the roof types, and Solar Tubular Lights. The
  // real lyonsroofing.com menu splits everything under two headers — Residential Roofing and
  // Commercial Roofing — each a flyout of services (Installation / Replacement / Repair / Maintenance
  // / Drone Inspections, plus roof types residential-side and the solar add-ons commercial-side).
  // `serviceMenu` reproduces those two headers; drone-inspections is shared by both (single card,
  // referenced in both flyouts). showAllServices so all 12 render as cards. Brand red #c73033 +
  // logo/9 photos wired via asset-overrides.json by process-assets.
  "lyons-roofing": {
    showAllServices: true,
    services: [
      { name: "Residential Installation", slug: "residential-installation", blurb: "Expert installation for every residential roof type — done right the first time to protect your home for decades." },
      { name: "Residential Replacement", slug: "residential-replacement", blurb: "Full tear-off and roof replacement with good, better, and best options, so you get the right system for your home and budget." },
      { name: "Residential Repair", slug: "residential-repair", blurb: "Fast, reliable repairs for leaks, storm damage, and worn roofing — restoring your roof's protection and peace of mind." },
      { name: "Residential Maintenance", slug: "residential-maintenance", blurb: "Proactive maintenance that catches small issues early and extends the life of your roof year after year." },
      { name: "Drone Roof Inspections", slug: "drone-inspections", blurb: "Detailed drone-assisted inspections that assess every plane and valley of your roof safely and thoroughly." },
      { name: "Tile, Shingle & Shake Roofs", slug: "pitched-roofs", blurb: "Specialists in pitched roofing systems — tile, shingle, and shake — installed and repaired to last in the Arizona climate." },
      { name: "Flat & Foam Roofs", slug: "flat-and-foam-roofs", blurb: "Flat and foam roofing systems engineered to shed water and stand up to the desert sun and monsoon season." },
      { name: "Commercial Installation", slug: "commercial-installation", blurb: "Reliable, long-lasting commercial roof installation that protects your business and minimizes disruption." },
      { name: "Commercial Repair", slug: "commercial-repair", blurb: "Comprehensive commercial roof repair for flat, foam, and pitched systems — keeping your building watertight." },
      { name: "Commercial Maintenance", slug: "commercial-maintenance", blurb: "Scheduled commercial maintenance programs that protect your investment and avoid costly emergency repairs." },
      { name: "Solar Attic Fans", slug: "solar-attic-fans", blurb: "Solar attic fans that improve ventilation and energy efficiency in residential and commercial properties." },
      { name: "Solar Tubular Lights", slug: "solar-tubular-lights", blurb: "Solar tubular skylights that bring natural daylight into your space without adding to your energy bill." },
    ],
    serviceMenu: [
      { label: "Residential Roofing", children: [
        { label: "Installation", slug: "residential-installation" },
        { label: "Replacement", slug: "residential-replacement" },
        { label: "Repair", slug: "residential-repair" },
        { label: "Maintenance", slug: "residential-maintenance" },
        { label: "Drone Inspections", slug: "drone-inspections" },
        { label: "Tile, Shingle & Shake Roofs", slug: "pitched-roofs" },
        { label: "Flat & Foam Roofs", slug: "flat-and-foam-roofs" },
      ] },
      { label: "Commercial Roofing", children: [
        { label: "Installation", slug: "commercial-installation" },
        { label: "Repair", slug: "commercial-repair" },
        { label: "Maintenance", slug: "commercial-maintenance" },
        { label: "Drone Inspections", slug: "drone-inspections" },
        { label: "Solar Attic Fans", slug: "solar-attic-fans" },
        { label: "Solar Tubular Lights", slug: "solar-tubular-lights" },
      ] },
    ],
  },
  // ro0040 Panda Roofing and Construction (roofpanda.com) — designer dropped logo + 10 photos;
  // process-assets wired logo (dark-teal panda mascot, reads on the white nav — no chromeDark) + p1–p10.
  // p10 is the tiny blank screenshot the designer left in the folder, so photos are pinned p1–p9 here to
  // drop it from the gallery. Brand colours sampled live from roofpanda.com: primary teal #03998E (their
  // button/accent, 18×) + deep teal #034254 (headings). Fonts are Outfit/Figtree (geometric sans) → modern.
  // SERVICES + serviceMenu mirror their real nav EXACTLY: a "Roofing" flyout of 12 services in site order
  // (Retrofit → Storm Damage → Siding → Insulation → Replacement → Residential → Commercial → Foam → Flat →
  // Shingle → Tile → Metal) and a "Remodeling" flyout (Kitchen, Bathroom). showAllServices so all 14 render
  // as cards. Manual layer wins and replaces the asset-layer 6-item crawl wholesale.
  "panda-roofing-and-construction": {
    brandColor: "#03998E",
    brandColor2: "#034254",
    fontKey: "modern",
    showAllServices: true,
    photos: [
      "/biz-photos/panda-roofing-and-construction/hero-original.webp",
      "/biz-photos/panda-roofing-and-construction/retrofit-roof.webp",
      "/biz-photos/panda-roofing-and-construction/storm-damage-restoration.webp",
      "/biz-photos/panda-roofing-and-construction/roofing-siding.webp",
      "/biz-photos/panda-roofing-and-construction/roof-insulation.webp",
      "/biz-photos/panda-roofing-and-construction/roof-replacement.webp",
      "/biz-photos/panda-roofing-and-construction/residential-roofing.webp",
      "/biz-photos/panda-roofing-and-construction/commercial-roofing.webp",
      "/biz-photos/panda-roofing-and-construction/foam-roofing.webp",
      "/biz-photos/panda-roofing-and-construction/flat-roofing.webp",
      "/biz-photos/panda-roofing-and-construction/shingle-roofing.webp",
      "/biz-photos/panda-roofing-and-construction/tile-roofing.webp",
      "/biz-photos/panda-roofing-and-construction/metal-roofing.webp",
      "/biz-photos/panda-roofing-and-construction/kitchen-remodel.webp",
      "/biz-photos/panda-roofing-and-construction/bathroom-remodel.webp",
    ],
    services: [
      { name: "Retrofit Roof", slug: "retrofit-roof", image: "/biz-photos/panda-roofing-and-construction/retrofit-roof.webp", blurb: "Retrofit roofing solutions that upgrade and reinforce your existing roof system for better performance and longevity without a full tear-off." },
      { name: "Storm Damage Restoration", slug: "storm-damage-restoration", image: "/biz-photos/panda-roofing-and-construction/storm-damage-restoration.webp", blurb: "Fast, reliable repairs for roofing issues and other damage caused by storms, ensuring your home is protected and restored." },
      { name: "Roofing Siding", slug: "roofing-siding", image: "/biz-photos/panda-roofing-and-construction/roofing-siding.webp", blurb: "Roofing siding services that enhance your property's curb appeal while safeguarding what matters most." },
      { name: "Roof Insulation", slug: "roof-insulation", image: "/biz-photos/panda-roofing-and-construction/roof-insulation.webp", blurb: "Roof insulation that improves energy efficiency and comfort, keeping your home cooler in the Arizona heat and lowering utility bills." },
      { name: "Roof Replacement", slug: "roof-replacement", image: "/biz-photos/panda-roofing-and-construction/roof-replacement.webp", blurb: "Upgrade your home's protection and curb appeal with a complete, expertly installed roof replacement built to last." },
      { name: "Residential Roofing", slug: "residential-roofing", image: "/biz-photos/panda-roofing-and-construction/residential-roofing.webp", blurb: "Complete residential roofing — installation, replacement, and repair — handled with precision and clear communication start to finish." },
      { name: "Commercial Roofing", slug: "commercial-roofing", image: "/biz-photos/panda-roofing-and-construction/commercial-roofing.webp", blurb: "Durable commercial roofing systems installed and maintained to protect your business and minimize disruption." },
      { name: "Foam Roofing", slug: "foam-roofing", image: "/biz-photos/panda-roofing-and-construction/foam-roofing.webp", blurb: "Discover the energy-efficient benefits of foam roofing, providing a seamless, long-lasting barrier for your property." },
      { name: "Flat Roofing", slug: "flat-roofing", image: "/biz-photos/panda-roofing-and-construction/flat-roofing.webp", blurb: "Flat roofing systems engineered to shed water and stand up to the desert sun and monsoon season." },
      { name: "Shingle Roofing", slug: "shingle-roofing", image: "/biz-photos/panda-roofing-and-construction/shingle-roofing.webp", blurb: "Choose from a variety of durable, stylish shingle options for a classic look and reliable protection." },
      { name: "Tile Roofing", slug: "tile-roofing", image: "/biz-photos/panda-roofing-and-construction/tile-roofing.webp", blurb: "Enhance your home's aesthetic and durability with our specialized tile roofing installation and maintenance." },
      { name: "Metal Roofing", slug: "metal-roofing", image: "/biz-photos/panda-roofing-and-construction/metal-roofing.webp", blurb: "Strong, modern metal roofing built for decades of low-maintenance protection and standout curb appeal." },
      { name: "Kitchen Remodel", slug: "kitchen-remodel", image: "/biz-photos/panda-roofing-and-construction/kitchen-remodel.webp", blurb: "Your kitchen is where family gathers and traditions are made. We bring your vision to life with thoughtful, expertly built remodels." },
      { name: "Bathroom Remodel", slug: "bathroom-remodel", image: "/biz-photos/panda-roofing-and-construction/bathroom-remodel.webp", blurb: "Your bathroom should offer comfort, calm, and a place to recharge. We craft remodels that reflect your lifestyle and personal taste." },
    ],
    serviceMenu: [
      { label: "Roofing", children: [
        { label: "Retrofit Roof", slug: "retrofit-roof" },
        { label: "Storm Damage Restoration", slug: "storm-damage-restoration" },
        { label: "Roofing Siding", slug: "roofing-siding" },
        { label: "Roof Insulation", slug: "roof-insulation" },
        { label: "Roof Replacement", slug: "roof-replacement" },
        { label: "Residential Roofing", slug: "residential-roofing" },
        { label: "Commercial Roofing", slug: "commercial-roofing" },
        { label: "Foam Roofing", slug: "foam-roofing" },
        { label: "Flat Roofing", slug: "flat-roofing" },
        { label: "Shingle Roofing", slug: "shingle-roofing" },
        { label: "Tile Roofing", slug: "tile-roofing" },
        { label: "Metal Roofing", slug: "metal-roofing" },
      ] },
      { label: "Remodeling", children: [
        { label: "Kitchen Remodel", slug: "kitchen-remodel" },
        { label: "Bathroom Remodel", slug: "bathroom-remodel" },
      ] },
    ],
  },
  // ro0001 Phoenix Roofing & Repair (phoenixroofingandrepair.com) — designer dropped logo, colour
  // swatch, and 12 photos; process-assets wired logo + p1–p12 + orange #fd7305 into asset-overrides.
  // chromeDark → near-black nav so the white parts of their logo read (also darkens the footer —
  // the two share one flag). The logo is WHITE ("PHOENIX ROOFING & REPAIR" + orange "BEST IN CLASS"
  // tagline + ROC#340941) on a transparent bg; process-assets kept the alpha (no knockout), so
  // logo.webp is intact and only needs the dark chrome to read. Services already match their real
  // site exactly (verified live): Roof Repair, Roof Replacement, Roof Inspections, Storm Damage &
  // Insurance, Commercial Roofing — left in the asset layer. Hero pinned to p8 (residential home +
  // branded truck); BizHero uses photos[0], so the people shots (p1 training room, p2 owners) drop to
  // the end and the real roof work leads the gallery. Manual photos replace the asset-layer order.
  "phoenix-roofing-and-repair": {
    chromeDark: true,
    photos: [
      "/biz-photos/phoenix-roofing-and-repair/p8.webp",
      "/biz-photos/phoenix-roofing-and-repair/p11.webp",
      "/biz-photos/phoenix-roofing-and-repair/p5.webp",
      "/biz-photos/phoenix-roofing-and-repair/p7.webp",
      "/biz-photos/phoenix-roofing-and-repair/p6.webp",
      "/biz-photos/phoenix-roofing-and-repair/p9.webp",
      "/biz-photos/phoenix-roofing-and-repair/p4.webp",
      "/biz-photos/phoenix-roofing-and-repair/p10.webp",
      "/biz-photos/phoenix-roofing-and-repair/p12.webp",
      "/biz-photos/phoenix-roofing-and-repair/p3.webp",
      "/biz-photos/phoenix-roofing-and-repair/p1.webp",
      "/biz-photos/phoenix-roofing-and-repair/p2.webp",
    ],
  },
  // ro0025 Real Roofing (realroofingofficial.com) — extract-services crawled the site but Gemini is
  // dead, so it left an empty services array + a "This page may not exist anymore." placeholder
  // aboutBody in asset-overrides. Services pinned here by hand to mirror their real "SERVICES" nav
  // EXACTLY (Residential Roofing, Roof Repair, Roof Replacement, Roof Installation, Freedom
  // Maintenance, Real Estate Partnership) — the theme shows the first 6 cards, so these map 1:1. The
  // manual layer wins on conflict and replaces the array wholesale, masking the empty crawl. aboutBody
  // overridden with their real story (AZ/UT/Southern CA roofer, residential + commercial, licensed
  // ROC 339597). Logo is WHITE → chromeDark for a near-black nav + footer so it stays legible. Logo +
  // 9 photos + brand color #323f42 (slate, from colour.png) wired via asset-overrides by process-assets.
  "real-roofing": {
    chromeDark: true,
    generatedCopy: {
      heroH1: "Arizona, Utah & California's Premier Roofing Solution",
      heroSubhead: "Expert craftsmanship for your home or business — decades of experience and guaranteed workmanship.",
      aboutHeading: "About Real Roofing",
      aboutBody: [
        "Real Roofing is Arizona, Utah, and Southern California's leading provider of top-tier roofing solutions for both residential and commercial properties. We believe every project is a chance to showcase our dedication to craftsmanship, our commitment to our clients, and our unmatched communication.",
        "From asphalt shingles and tile to foam, metal, and TPO systems, we bring decades of experience and exceptional, guaranteed workmanship to every roof. When you choose Real Roofing, you're not just getting a roofing service — you're becoming part of a family that values excellence and efficiency in everything we do.",
        "Licensed and insured (ROC 339597), we have the experience and craftsmanship to protect your home or business before storm season arrives.",
      ],
    },
    services: [
      { name: "Residential Roofing", slug: "residential-roofing", blurb: "Tailored roofing solutions for your home — shingle, tile, foam, metal, and more — backed by decades of experience and guaranteed workmanship." },
      { name: "Roof Repair", slug: "roof-repair", blurb: "From leaks to storm damage, we repair tile, shingle, foam, and metal roofs fast to protect your home before monsoon season hits." },
      { name: "Roof Replacement", slug: "roof-replacement", blurb: "When a roof is past its prime, we replace it with a durable new system built to handle Arizona's extreme heat and weather." },
      { name: "Roof Installation", slug: "roof-installation", blurb: "Expert installation of new roofs on existing homes and new construction, using premium materials and superior underlayment suited for the Arizona climate." },
      { name: "Freedom Maintenance", slug: "freedom-maintenance", blurb: "Our Freedom Maintenance program keeps your roof in peak condition year-round with proactive inspections and upkeep." },
      { name: "Real Estate Partnership", slug: "real-estate-partnership", blurb: "We partner with realtors and property owners to deliver fast, reliable roof inspections and repairs that keep deals on track." },
    ],
  },
  // az0100 TotalScape Pros (totalscapepros.com) — extract-services rendered the site but Gemini
  // failed (bad API key), so services are pinned by hand to the designer's exact brief: 9 distinct
  // services in their stated order. The auto-extract had only 6 (collapsed Pavers + Travertine into
  // one card, dropped Putting Greens and Tree & Palm Services). showAllServices so all 9 render as
  // cards (default caps at 6). Blurbs reused from asset-overrides where they mapped; new on-voice
  // blurbs written for the split/added cards. Brand green #288339 + logo/12 photos via
  // asset-overrides. Designer pinned imgi_53 (→ p8.webp) as the hero; BizHero uses photos[0], so p8
  // leads and the rest follow for the gallery/marquee. Replaces the asset photos array wholesale.
  "totalscape-pros": {
    showAllServices: true,
    photos: [
      "/biz-photos/totalscape-pros/p8.webp",
      "/biz-photos/totalscape-pros/p1.webp",
      "/biz-photos/totalscape-pros/p2.webp",
      "/biz-photos/totalscape-pros/p3.webp",
      "/biz-photos/totalscape-pros/p4.webp",
      "/biz-photos/totalscape-pros/p5.webp",
      "/biz-photos/totalscape-pros/p6.webp",
      "/biz-photos/totalscape-pros/p7.webp",
      "/biz-photos/totalscape-pros/p9.webp",
      "/biz-photos/totalscape-pros/p10.webp",
      "/biz-photos/totalscape-pros/p11.webp",
      "/biz-photos/totalscape-pros/p12.webp",
    ],
    services: [
      { name: "Pavers", slug: "pavers", blurb: "Precision-laid paver patios, walkways, and driveways, engineered to withstand the Arizona heat while adding massive property value and curb appeal." },
      { name: "Travertine", slug: "travertine", blurb: "Premium travertine decking and patios that stay cool underfoot, bringing a clean, high-end finish to pool surrounds and outdoor living spaces." },
      { name: "Masonry and Concrete", slug: "masonry-and-concrete", blurb: "Custom block walls, retaining walls, outdoor kitchens, rock waterfalls, fire pits, pool slides, and concrete structures — built right the first time for Arizona's demanding desert conditions." },
      { name: "Artificial Turf", slug: "artificial-turf", blurb: "Premium, heat-resistant synthetic grass and smart, low-maintenance turf solutions tailored for year-round beauty and water conservation." },
      { name: "Putting Greens", slug: "putting-greens", blurb: "Custom-built backyard putting greens with true roll and pro-grade turf, designed to bring the course home and elevate your outdoor space." },
      { name: "Retractable Batting Cages", slug: "retractable-batting-cages", blurb: "Professional-grade, custom-installed training systems for the home athlete, engineered for durability and seamless operation within your outdoor space." },
      { name: "Irrigation and Drainage", slug: "irrigation-and-drainage", blurb: "Expert site preparation including precision grading and smart irrigation, with engineered water management systems and yard drainage solutions to protect your home's foundation." },
      { name: "Tree and Palm Services", slug: "tree-and-palm-services", blurb: "Expert tree and palm trimming, shaping, and removal that keeps your landscape healthy, clean, and safely maintained year-round." },
      { name: "Landscape Lighting", slug: "landscape-lighting", blurb: "Custom landscape lighting design and installation to highlight your home's best features, with energy-efficient systems that improve nighttime visibility, safety, and curb appeal." },
    ],
  },
  // az0099 JNK Landscaping and Pools — extract-services rendered the site but Gemini failed (bad
  // API key), so services are pinned by hand to the designer's exact brief: 5 distinct services.
  // The auto-extract had collapsed "Pool" + "Build and remodel" into one card and dropped to 4;
  // this restores all 5. Manual `services` replaces the asset-overrides array wholesale. Existing
  // blurbs reused where they mapped; new on-voice blurbs written for the split Pool/Build cards.
  // Brand black #000000 (primary) / olive #4c3b0a (secondary) + logo/12 photos via asset-overrides.
  "jnk-landscaping-and-pools": {
    services: [
      { name: "Pool", slug: "pool", blurb: "We design and build custom pools that turn your backyard into a private resort, built to last in the Arizona climate." },
      { name: "Build and Remodel", slug: "build-and-remodel", blurb: "From new construction to full backyard remodels, we rebuild and refresh outdoor spaces to bring your vision to life." },
      { name: "Masonry Work", slug: "masonry-work", blurb: "Our masonry services include building BBQs, bars, fire pits, fireplaces, and other stone work." },
      { name: "Turf and Hardscape", slug: "turf-and-hardscape", blurb: "We install artificial turf and various hardscape elements like travertine, pavers, and concrete." },
      { name: "Full Landscape", slug: "full-landscape", blurb: "We provide complete landscaping solutions, including irrigation, plants, and lighting, to transform your outdoor area." },
    ],
  },
  // az0096 CGL Landscaping (creativegreenaz.com) — extract-services rendered the site but Gemini
  // failed (bad API key), so services + the grouped nav are locked by hand to the designer's exact
  // brief. `serviceMenu` mirrors their real IA: four category headers (Landscaping / Tree Services /
  // Lawn Care / Hardscape) each opening a flyout of sub-services; every menu slug exists in `services`
  // below. showAllServices so all 14 real services render as cards. Brand green #19884e (primary) /
  // blue #32aad7 (secondary) + logo/13 photos auto-wired via asset-overrides.json.
  "cgl-landscaping": {
    showAllServices: true,
    // Designer pinned imgi_42_geo-pages-primary-hero-desktop (→ p9.webp) as the hero. BizHero uses
    // photos[0], so p9 leads; the rest follow for the gallery/marquee. Replaces the asset array.
    photos: [
      "/biz-photos/cgl-landscaping/p9.webp",
      "/biz-photos/cgl-landscaping/p1.webp",
      "/biz-photos/cgl-landscaping/p2.webp",
      "/biz-photos/cgl-landscaping/p3.webp",
      "/biz-photos/cgl-landscaping/p4.webp",
      "/biz-photos/cgl-landscaping/p5.webp",
      "/biz-photos/cgl-landscaping/p6.webp",
      "/biz-photos/cgl-landscaping/p7.webp",
      "/biz-photos/cgl-landscaping/p8.webp",
      "/biz-photos/cgl-landscaping/p10.webp",
      "/biz-photos/cgl-landscaping/p11.webp",
      "/biz-photos/cgl-landscaping/p12.webp",
      "/biz-photos/cgl-landscaping/p13.webp",
    ],
    services: [
      { name: "Residential Landscape and Maintenance", slug: "residential-landscape-maintenance", blurb: "Complete residential landscape design, installation, and ongoing maintenance to keep your yard beautiful year-round." },
      { name: "Commercial Landscape and Maintenance", slug: "commercial-landscape-maintenance", blurb: "Professional landscape construction and maintenance for commercial properties that make a strong first impression." },
      { name: "Pavers", slug: "pavers", blurb: "Custom paver patios, walkways, and driveways that add lasting style and value to your outdoor space." },
      { name: "Artificial Grass", slug: "artificial-grass", blurb: "Low-maintenance artificial grass that stays lush and green year-round while saving water in the desert heat." },
      { name: "Tree Trimming", slug: "tree-trimming", blurb: "Expert tree trimming that keeps your trees healthy, shaped, and safely clear of your home and power lines." },
      { name: "Irrigation", slug: "irrigation", blurb: "Irrigation design, installation, and repair that keeps your landscape watered efficiently in the Arizona climate." },
      { name: "Tree Removal", slug: "tree-removal", blurb: "Safe, efficient removal of dead, damaged, or unwanted trees — with full cleanup when we're done." },
      { name: "Tree Planting Services", slug: "tree-planting", blurb: "Professional tree planting with the right species placed to thrive and flourish in the Arizona climate." },
      { name: "Mowing and Edging", slug: "mowing-and-edging", blurb: "Reliable mowing and crisp edging that keeps your lawn clean, healthy, and looking its best." },
      { name: "Over Seeding", slug: "over-seeding", blurb: "Winter overseeding that keeps your lawn green and vibrant through the cooler Arizona months." },
      { name: "Weeding", slug: "weeding", blurb: "Thorough weed control and removal to keep your beds, rock, and lawn clean and tidy." },
      { name: "Sod Installation", slug: "sod-installation", blurb: "Fresh sod installation for an instant, lush green lawn that's ready to enjoy from day one." },
      { name: "Trex", slug: "trex", blurb: "Durable, low-maintenance Trex composite decking built for beauty and years of outdoor living." },
      { name: "Timber", slug: "timber", blurb: "Custom timber work and wood structures that bring warmth and natural character to your landscape." },
    ],
    serviceMenu: [
      { label: "Landscaping", children: [
        { label: "Residential Landscape and Maintenance", slug: "residential-landscape-maintenance" },
        { label: "Commercial Landscape and Maintenance", slug: "commercial-landscape-maintenance" },
      ] },
      { label: "Tree Services", children: [
        { label: "Tree Trimming", slug: "tree-trimming" },
        { label: "Tree Removal", slug: "tree-removal" },
        { label: "Tree Planting Services", slug: "tree-planting" },
      ] },
      { label: "Lawn Care", children: [
        { label: "Mowing and Edging", slug: "mowing-and-edging" },
        { label: "Artificial Grass", slug: "artificial-grass" },
        { label: "Over Seeding", slug: "over-seeding" },
        { label: "Weeding", slug: "weeding" },
        { label: "Irrigation", slug: "irrigation" },
        { label: "Sod Installation", slug: "sod-installation" },
      ] },
      { label: "Hardscape", children: [
        { label: "Pavers", slug: "pavers" },
        { label: "Trex", slug: "trex" },
        { label: "Timber", slug: "timber" },
      ] },
    ],
  },
  // az0098 AZ NativeScapes (aznativescapes.com) — their real site lists exactly TWO services:
  // Complete Installations & Renovations. Kept as the two service cards (faithful to their site);
  // each service page body lists the full bullet offering. serviceMenu mirrors their IA — two
  // category headers, each opening a flyout of the real sub-services (every sub-item links to its
  // parent service page). chromeDark → near-black nav per the designer (also darkens the footer —
  // the two share one flag). Logo / 13 photos / green #46b33d auto-wired in asset-overrides.json.
  "aznativescapes": {
    chromeDark: true,
    services: [
      {
        name: "Complete Installations",
        slug: "complete-installations",
        blurb: "Full custom landscape builds — hardscape, irrigation, outdoor living, and planting, all owner-supervised from design to done.",
        body: "From the first sketch to the final plant, our complete installations cover every element of a new landscape. We handle custom designs and installs; time clocks, sprinkler and drip systems; travertine, flagstone, pavers, and stacked stone; granite, boulders, concrete, and block walls; outdoor kitchens, BBQs, fire pits, and benches; and lawns, plants, trees, and golf putting greens. Every project is owner-supervised, so it's done fast and done right.",
      },
      {
        name: "Renovations",
        slug: "renovations",
        blurb: "Redesigns, removals, drainage fixes, xeriscaping, turf, and hardscapes that bring a tired yard back to life.",
        body: "Already have a yard that needs new life? Our renovation work covers redesigns, removals, and replants; land contouring, faux rivers, and mounds; fixing drainage and irrigation issues; xeriscaping, native plants, and accent lighting; and artificial turf, sod, and hardscapes — transforming tired outdoor spaces into something you'll love.",
      },
    ],
    serviceMenu: [
      { label: "Complete Installations", slug: "complete-installations", children: [
        { label: "Custom Designs and Installs", slug: "complete-installations" },
        { label: "Time Clocks, Sprinkler and Drip Systems", slug: "complete-installations" },
        { label: "Travertine, Flagstone, Pavers, Stacked Stone", slug: "complete-installations" },
        { label: "Granite, Boulders, Concrete and Block Walls", slug: "complete-installations" },
        { label: "Outdoor Kitchens, BBQs, Fire Pits, Benches", slug: "complete-installations" },
        { label: "Lawns, Plants, Trees, Golf Putting Greens", slug: "complete-installations" },
      ] },
      { label: "Renovations", slug: "renovations", children: [
        { label: "Redesigns, Removals, Replants", slug: "renovations" },
        { label: "Land Contouring, Faux Rivers, Mounds", slug: "renovations" },
        { label: "Fix Drainage and Irrigation Issues", slug: "renovations" },
        { label: "Xeriscaping, Native Plants, Accent Lighting", slug: "renovations" },
        { label: "Artificial Turf, Sod, Hardscapes", slug: "renovations" },
      ] },
    ],
  },
  // az0095 Phillip's Landscaping Services — no logo provided, so the nav writes out the business
  // name as a wordmark (logoBadge:false drops the initials chip, logoWordmark sets the clean text).
  // extract-services rendered phillipslandscapingaz.com but Gemini failed (bad API key), so services
  // locked by hand to the EXACT 14 listed on their homepage, in site order. Auto-extract only had 6.
  // showAllServices so every real service renders a card. Brand green #15a413 + 12 photos auto-wired
  // via asset-overrides.json.
  "phillip-s-landscaping-services": {
    logoBadge: false,
    logoWordmark: "Phillip's Landscaping",
    showAllServices: true,
    services: [
      { name: "Yard Cleanup", slug: "yard-cleanup", blurb: "Full yard cleanups that clear out weeds, debris, and overgrowth — leaving your property tidy and ready to enjoy." },
      { name: "Yard Maintenance", slug: "yard-maintenance", blurb: "Reliable ongoing maintenance to keep your yard trimmed, clean, and looking its best all year round." },
      { name: "Tree Trimming", slug: "tree-trimming", blurb: "Professional tree trimming that keeps your trees healthy, shaped, and safely away from your home." },
      { name: "Palm Trimming", slug: "palm-trimming", blurb: "Expert palm trimming to remove dead fronds and keep your palms clean, tidy, and looking great." },
      { name: "Tree Pruning or Removal", slug: "tree-pruning-or-removal", blurb: "From careful pruning to full removal, we handle your trees safely and clean up every bit of the mess." },
      { name: "Irrigation System", slug: "irrigation-system", blurb: "We install and repair irrigation systems to keep your landscape watered efficiently in the desert climate." },
      { name: "Junk Hauling", slug: "junk-hauling", blurb: "Fast junk and debris hauling to clear out your yard and haul everything away in one trip." },
      { name: "Timer and Valves Installation", slug: "timer-and-valves-installation", blurb: "Install and replace irrigation timers and valves so your watering schedule runs reliably and on time." },
      { name: "Pavers Installation", slug: "pavers-installation", blurb: "Paver patios, walkways, and driveways installed to add lasting style and value to your outdoor space." },
      { name: "Artificial Grass Installation", slug: "artificial-grass-installation", blurb: "Low-maintenance artificial grass that stays green year-round — no watering, mowing, or upkeep required." },
      { name: "Rocks Installation or Removal", slug: "rocks-installation-or-removal", blurb: "We install fresh decorative rock or haul out old rock to refresh and define your landscape." },
      { name: "Concrete and Dirt Removal", slug: "concrete-and-dirt-removal", blurb: "Concrete and dirt removal with full haul-away to prep your yard for whatever comes next." },
      { name: "Curbing Installation and Grade Work", slug: "curbing-installation-and-grade-work", blurb: "Clean curbing installation paired with proper grade work to shape and define your landscape beds." },
      { name: "Grading Work", slug: "grading-work", blurb: "Precise grading to level and prep your yard for drainage, pavers, turf, or new landscaping." },
    ],
  },
  // az0094 Arizona Home and Landscape, Inc. — no logo provided, so the nav writes out the
  // business name as a wordmark (logoBadge:false drops the initials chip, logoWordmark sets the
  // clean text). extract-services rendered azhlandscapeinc.com but Gemini failed (bad API key),
  // so services locked by hand to the EXACT 10 cards in their homepage #services section, in
  // site order. Auto-extract only had 6 (missing Concrete & Masonry, Professional Landscape
  // Design, Plants & Trellises). Blurbs are verbatim from their site copy. showAllServices so
  // all 10 render as cards. Blue brand #2baed4 + 14 photos auto-wired via asset-overrides.
  "arizona-home-and-landscape-inc": {
    logoBadge: false,
    logoWordmark: "Arizona Home and Landscape",
    // Designer-picked hero = imgi_11_Pavers1.jpg (→ p8). Moved to front so it's photos[0] (the
    // hero); rest keep their order behind it for the gallery.
    photos: [
      "/biz-photos/arizona-home-and-landscape-inc/p8.webp",
      "/biz-photos/arizona-home-and-landscape-inc/p1.webp",
      "/biz-photos/arizona-home-and-landscape-inc/p2.webp",
      "/biz-photos/arizona-home-and-landscape-inc/p3.webp",
      "/biz-photos/arizona-home-and-landscape-inc/p4.webp",
      "/biz-photos/arizona-home-and-landscape-inc/p5.webp",
      "/biz-photos/arizona-home-and-landscape-inc/p6.webp",
      "/biz-photos/arizona-home-and-landscape-inc/p7.webp",
      "/biz-photos/arizona-home-and-landscape-inc/p9.webp",
      "/biz-photos/arizona-home-and-landscape-inc/p10.webp",
      "/biz-photos/arizona-home-and-landscape-inc/p11.webp",
      "/biz-photos/arizona-home-and-landscape-inc/p12.webp",
      "/biz-photos/arizona-home-and-landscape-inc/p13.webp",
      "/biz-photos/arizona-home-and-landscape-inc/p14.webp",
    ],
    showAllServices: true,
    services: [
      { name: "Pergolas & Shade Structures", slug: "pergolas-and-shade-structures", blurb: "We install solid patio covers and open-lattice pergolas — built to shade your outdoor space and hold up for years." },
      { name: "Outdoor Kitchens", slug: "outdoor-kitchens", blurb: "Built-in BBQ islands with stone veneer, stainless appliances, and durable countertops — great for entertaining." },
      { name: "Fire Pits & Fire Features", slug: "fire-pits-and-fire-features", blurb: "Custom masonry fire pits and gas fireplaces — a great centerpiece for any backyard patio setup." },
      { name: "Travertine", slug: "travertine", blurb: "Travertine patios, pool decks, and walkways — clean, timeless, and stays cool underfoot even on the hottest days." },
      { name: "Pavers", slug: "pavers", blurb: "Paver patios, driveways, and walkways — tons of styles and colors to match any home." },
      { name: "Concrete & Masonry", slug: "concrete-and-masonry", blurb: "Concrete slabs, block walls, retaining walls, and custom masonry — solid work that stands the test of time." },
      { name: "Artificial Turf", slug: "artificial-turf", blurb: "Premium synthetic grass that looks great, feels soft underfoot, and never needs watering or mowing." },
      { name: "Putting Greens", slug: "putting-greens", blurb: "Custom backyard putting greens built with professional-grade turf — practice your short game without leaving home." },
      { name: "Professional Landscape Design", slug: "professional-landscape-design", blurb: "We offer both digital 3D renderings and hand-drawn traditional design plans — see exactly what your yard will look like before we break ground." },
      { name: "Plants & Trellises", slug: "plants-and-trellises", blurb: "Plant installation and custom metal trellis work — a simple way to add color, life, and character to any wall or fence." },
    ],
  },
  // az0093 AZ Edge Landscaping — extract-services crawl rendered the page but Gemini failed
  // (bad API key), so services locked by hand to the EXACT catalog in the azedgelandscaping.com
  // nav. The auto-extracted set only had 6 (Turf/Paver/Rock/Sod/Outdoor Kitchen/Landscape
  // Lighting) and was missing 11 of their real services. Replaced wholesale with all 17, grouped
  // via serviceMenu to mirror their site IA exactly: two top-level (Paver, Turf) + Hardscaping ▸,
  // Masonry ▸, Other Services ▸ folders. Blurbs reuse their homepage service copy for the four
  // they card on-site (Turf/Paver/Rock/Sod); the rest written on-voice. showAllServices so every
  // real service renders a card. Brand green #83c17f + logo/16 photos auto-wired via asset-overrides.
  "az-edge-landscaping": {
    showAllServices: true,
    services: [
      { name: "Paver Installation", slug: "paver-installation", blurb: "Design elegant and functional patios, paths, and driveways with high-quality paver installation. This service combines style and durability, adding value and visual appeal to any property." },
      { name: "Turf Installation", slug: "turf-installation", blurb: "Enjoy the benefits of a green space with minimal maintenance through turf installation. Ideal for various applications, turf provides a practical and visually pleasing alternative to natural grass." },
      { name: "Rock Installation", slug: "rock-installation", blurb: "Transform outdoor spaces with professional rock installation. This service enhances the natural beauty of gardens, walkways, and driveways, providing a durable and attractive landscaping solution." },
      { name: "Travertine Pavers", slug: "travertine-pavers", blurb: "Premium travertine paver patios, decks, and pool surrounds that stay cool underfoot and bring a refined, natural-stone finish to your outdoor living space." },
      { name: "Concrete Installation", slug: "concrete-installation", blurb: "Durable, cleanly finished concrete for patios, walkways, driveways, and slabs — poured and finished to complement your home and stand up to the Arizona sun." },
      { name: "Desertscapes", slug: "desertscapes", blurb: "Low-water desert landscaping that pairs native and drought-tolerant plantings with rock and hardscape for a beautiful, low-maintenance yard built for the Arizona climate." },
      { name: "Outdoor Kitchen Installation", slug: "outdoor-kitchen-installation", blurb: "We specialize in outdoor kitchen installation, creating functional and beautiful spaces for cooking and entertaining right in your backyard." },
      { name: "Planter Bed Installation", slug: "planter-bed-installation", blurb: "Custom planter beds that frame your home and define your landscape, built and prepped for healthy, thriving plantings." },
      { name: "Block Walls", slug: "block-walls", blurb: "Solid, professionally built block walls for privacy, security, and clean property definition, finished to match your home and landscape." },
      { name: "Retaining Walls", slug: "retaining-walls", blurb: "Engineered retaining walls that manage slopes and elevation changes while adding structure and lasting curb appeal to your property." },
      { name: "Masonry Column Construction", slug: "masonry-column-construction", blurb: "Custom masonry columns that add stature and a finished, architectural look to entries, gates, and walls." },
      { name: "Property Line Wall", slug: "property-line-wall", blurb: "Durable property line walls that clearly define your boundaries while adding privacy and a polished, cohesive look to your property." },
      { name: "Landscape Lighting", slug: "landscape-lighting", blurb: "Landscape lighting that highlights your home, plantings, and hardscape — extending the beauty and usability of your yard well after sunset." },
      { name: "Irrigation Systems", slug: "irrigation-systems", blurb: "Efficient irrigation systems designed and installed to keep your landscape healthy and green while conserving water in the desert climate." },
      { name: "Sod Installation", slug: "sod-installation", blurb: "Create lush, green lawns with expert sod installation. Perfect for residential and commercial properties, sod offers a quick and effective way to achieve a beautiful, low-maintenance lawn." },
      { name: "Tree Removal", slug: "tree-removal", blurb: "Safe, efficient tree removal that clears the way for new landscaping or eliminates hazardous and unwanted trees from your property." },
      { name: "Concrete Removal", slug: "concrete-removal", blurb: "Professional concrete removal and haul-away to prep your yard for new pavers, turf, or landscaping — clean demo with no mess left behind." },
    ],
    serviceMenu: [
      { label: "Paver Installation", slug: "paver-installation" },
      { label: "Turf Installation", slug: "turf-installation" },
      { label: "Hardscaping", children: [
        { label: "Rock Installation", slug: "rock-installation" },
        { label: "Travertine Pavers", slug: "travertine-pavers" },
        { label: "Concrete Installation", slug: "concrete-installation" },
        { label: "Desertscapes", slug: "desertscapes" },
      ] },
      { label: "Masonry", children: [
        { label: "Outdoor Kitchen Installation", slug: "outdoor-kitchen-installation" },
        { label: "Planter Bed Installation", slug: "planter-bed-installation" },
        { label: "Block Walls", slug: "block-walls" },
        { label: "Retaining Walls", slug: "retaining-walls" },
        { label: "Masonry Column Construction", slug: "masonry-column-construction" },
        { label: "Property Line Wall", slug: "property-line-wall" },
      ] },
      { label: "Other Services", children: [
        { label: "Landscape Lighting", slug: "landscape-lighting" },
        { label: "Irrigation Systems", slug: "irrigation-systems" },
        { label: "Sod Installation", slug: "sod-installation" },
        { label: "Tree Removal", slug: "tree-removal" },
        { label: "Concrete Removal", slug: "concrete-removal" },
      ] },
    ],
  },
  // az0091 Silver Fern Landscaping — per designer, they sell ONE thing: yard maintenance.
  // Collapsed the auto-extracted 6-service list to a single "Yard Maintenance" card so the
  // services section reflects their real focus. Copy mirrored from their maintenance page
  // (silverfernaz.com/maintenance): weekly/biweekly/monthly plans + the 48-hour guarantee
  // and the "next service free if we no-show" promise. Card image = p4 (mower-on-lawn shot).
  // Green brand #427c4e + logo/photos auto-wired via asset-overrides.
  "silver-fern-landscaping": {
    services: [
      {
        name: "Yard Maintenance",
        slug: "yard-maintenance",
        image: "/biz-photos/silver-fern-landscaping/p4.webp",
        blurb:
          "Weekly, biweekly, or monthly maintenance that keeps your property consistently sharp — mowing & edging, bush trimming, weed control in rock & hardscapes, blowing & debris removal, and irrigation checks, all backed by our 48-hour satisfaction guarantee.",
        body:
          "At Silver Fern Landscaping we offer weekly, biweekly, or monthly maintenance built to keep your yard looking its best year-round. Every regular service includes lawn mowing & edging (where there's a lawn), trimming bushes as needed up to 6 feet, cutting & spraying weeds in your rock and hardscapes, blowing and then removing the debris, checking your irrigation for leaks, and setting the timer for seasonal changes. We fertilize grass twice a year and keep tree and palm canopies lifted to around 6 feet so you can walk comfortably underneath. Every visit is backed by our 48-hour satisfaction guarantee — and if we don't show up the day we say we will, your next maintenance is free (up to $100).",
      },
    ],
  },
  // az0090 Rogers Landscaping — designer-picked hero = imgi_20_slide1-1-1.jpg (→ p7).
  // Moved to front so it's photos[0] (the hero); rest keep order behind it for the gallery.
  // Manual photos replace the asset-overrides array wholesale.
  "rogers-landscaping": {
    photos: [
      "/biz-photos/rogers-landscaping/p7.webp",
      "/biz-photos/rogers-landscaping/p1.webp",
      "/biz-photos/rogers-landscaping/p2.webp",
      "/biz-photos/rogers-landscaping/p3.webp",
      "/biz-photos/rogers-landscaping/p4.webp",
      "/biz-photos/rogers-landscaping/p5.webp",
      "/biz-photos/rogers-landscaping/p6.webp",
      "/biz-photos/rogers-landscaping/p8.webp",
    ],
  },
  // az0089 Pool & Landscape AZ — their real site (poolandlandscapeaz.com) sells via ONE
  // "Pool Packages" page that holds exactly two priced tiers (the-splash-swim-pool-package +
  // the-ultimate-pool-package, slugs/prices verbatim from /new-pool-deal/). Mirrored here:
  // serviceMenu groups both tiers under a single "Pool Packages" header so the nav reads like
  // their site, and `services` is just those two tiers so the services section renders two
  // package cards (price in each blurb) — no generic trade services. showAllServices so both
  // cards show. Hero is their New-Pool-11 shot (photos[0] below). Curated photos drop the CTA
  // banner graphics (CTA-New-Pools/Remodel/Awning, Pool_Banner) the script ingested as p1/p3/p5/
  // p10 and keep only real backyard/pool work. Teal brand #259e9a auto-wired via asset-overrides.
  "pool-and-landscape-az": {
    showAllServices: true,
    photos: [
      "/biz-photos/pool-and-landscape-az/p2.webp", // New-Pool-11 — HERO
      "/biz-photos/pool-and-landscape-az/p4.webp", // Vera-Cruz-Grigio
      "/biz-photos/pool-and-landscape-az/p6.webp", // Eastmark
      "/biz-photos/pool-and-landscape-az/p7.webp", // Gilbert project
      "/biz-photos/pool-and-landscape-az/p8.webp", // Estrella Mountain Ranch
      "/biz-photos/pool-and-landscape-az/p9.webp", // Backyard
    ],
    services: [
      {
        name: "The Splash & Swim Pool Package",
        slug: "the-splash-swim-pool-package",
        image: "/biz-photos/pool-and-landscape-az/p4.webp",
        blurb: "Our most popular new-pool deal — an inground play pool with 250 sq ft of premium travertine decking & coping, a suction cleaner, and a free 3D virtual design. From $37,995 (reg. $39,995), as low as $257/mo.",
        body: "The Splash & Swim Pool Package is the easiest way into a brand-new backyard pool. It starts with a free state-of-the-art 3D virtual rendering so you can see your pool before we break ground, then delivers an inground play pool finished with 250 sq ft of premium travertine decking & coping (170 sq ft of pavers plus 80 linear ft of coping) and a suction cleaner to keep it spotless. Priced at $37,995 (regularly $39,995) — financing available as low as $257/month.",
      },
      {
        name: "The Ultimate Pool Package",
        slug: "the-ultimate-pool-package",
        image: "/biz-photos/pool-and-landscape-az/p8.webp",
        blurb: "Our top-tier self-cleaning package: up to an 80' perimeter play pool, Turkish travertine deck, Paramount in-floor cleaning, plus a FREE sheer descent & stack-stone wall. From $43,995 (reg. $45,995), as low as $298/mo.",
        body: "The Ultimate Pool Package is our fully-loaded, self-cleaning build. You get an up-to-80'-perimeter play pool (up to 400 sq ft, up to 5' deep) with a FREE 2-foot sheer descent and 8-foot stack-stone wall, 250 sq ft of Turkish travertine pavers & coping, 6\"x6\" waterline tile, and a mini-pebble interior. Under the hood: a Paramount PV3 in-floor cleaning system with 12 heads (99% cleaning guarantee and limited lifetime warranty), Pentair IntelliBrite color LED lighting, a variable-speed pump, and a cartridge filter — plus startup chemicals, a maintenance kit, and an automatic water leveler. Priced at $43,995 (regularly $45,995) — financing available as low as $298/month.",
      },
    ],
    serviceMenu: [
      { label: "Pool Packages", children: [
        { label: "The Splash & Swim Pool Package", slug: "the-splash-swim-pool-package" },
        { label: "The Ultimate Pool Package", slug: "the-ultimate-pool-package" },
      ] },
    ],
  },
  // az0087 AZ Landscape Pros — extract-services crawl rendered the page but Gemini failed
  // (bad API key), so services locked by hand to the real ones on azlandscapepros.com/services
  // ("Description of Services"). The auto-extracted set invented "New Build Home Landscape & Pool
  // Design" (the site never mentions pools — their ROC licenses are Landscape Installations CR21 +
  // Awnings/Pergolas/Patio Covers CR3) and missed the pavers, outdoor-kitchen, and turf services
  // the site actually lists. Replaced wholesale with their 6 real services in the site's wording —
  // Landscape Lighting (#6) is explicitly listed in their Description of Services and lands on their
  // own lighting-kit photo (p7); an earlier "Xeriscape & Water Conservation" card was dropped
  // because the site lists no such service (it came from their "Help Conserve Arizona's Water" tag).
  // aboutBody first paragraph re-pointed off "pool design" onto their real specialty for the same
  // reason. chromeDark: their logo is white/green lettering on a BLACK plate (process-assets only
  // knocks out near-white, so the black backing stays) — a near-black nav + footer keeps the
  // wordmark readable instead of a black box on white chrome. Brand green #288925 + 10 real photos
  // auto-wired via asset-overrides.
  "az-landscape-pros": {
    chromeDark: true,
    services: [
      { name: "Complete Landscape Design & Installation", slug: "complete-landscape-design-and-installation", blurb: "We specialize in full-service landscape design and construction — from demo to completion — on new build homes, dirt lots, and complete yard remodels." },
      { name: "Pergolas, Awnings & Patio Covers", slug: "pergolas-awnings-and-patio-covers", blurb: "Custom awnings, pergolas, canopies, and patio covers to shade and extend your outdoor living space." },
      { name: "Pavers, Walkways & Patios", slug: "pavers-walkways-and-patios", blurb: "Paver patios, walkways, and trash pads built to last and finished to complement your home." },
      { name: "Outdoor Kitchens", slug: "outdoor-kitchens", blurb: "Bring your backyard to life with a custom outdoor kitchen built for cooking and entertaining." },
      { name: "Turf, Grass & Putting Greens", slug: "turf-grass-and-putting-greens", blurb: "Grass, artificial turf, and putting greens for a lush, low-maintenance yard year-round." },
      { name: "Landscape Lighting", slug: "landscape-lighting", blurb: "Low-voltage and accent landscape lighting that brings your yard, paths, and outdoor living spaces to life after dark." },
    ],
    generatedCopy: {
      aboutBody: [
        "AZ Landscape Pros is a family-owned and operated, duly licensed, bonded, and insured landscape and pergola contracting company in Arizona. We specialize in full landscape design and installation on new build homes, dirt lots, and complete yard remodels, along with pergolas, awnings, and patio covers — handling every project from demo to completion.",
        "With more than 18 years of experience, we guarantee all of our work with a comprehensive warranty. We proudly support our veterans and offer discounts to veterans, health, and public service workers. We are also a member of NABA and have been voted Best of The East Valley for 6 consecutive years in the Business Services and Family Owned Businesses categories.",
      ],
    },
  },
  // az0086 Castillo Landscaping — extract-services crawl rendered the page but Gemini failed
  // (bad API key), so services locked by hand to the EXACT 7 in the castillolandscapingaz.com
  // Services dropdown, in their site's order: Landscaping, Hardscaping, Palm Care, Tree Care,
  // Irrigation, Lawn Care & Maintenance, Gazebos & Pergolas. The homepage only cards 5 of these,
  // so the auto-extracted set was missing Palm Care and Gazebos & Pergolas and used the wrong
  // labels (Tree Services, Lawn Care). Blurbs reuse their real homepage service copy where it
  // exists; Palm Care + Gazebos & Pergolas written on-voice. Manual services replace the
  // asset-overrides array wholesale. Brand greens (#2b7d2f primary / #0b3d2c secondary) + 9 real
  // photos auto-wired via asset-overrides (the secondary swatch was renamed to "Second Colour.png"
  // so process-assets read it as a color, not a gallery photo).
  "castillo-landscaping": {
    services: [
      { name: "Landscaping", slug: "landscaping", blurb: "We meticulously design and install landscapes that transform your outdoor space, drawing on years of experience creating beautiful, functional yards across the Phoenix metro." },
      { name: "Hardscaping", slug: "hardscaping", blurb: "With a focus on craftsmanship and attention to detail, our team of hardscaping professionals is dedicated to bringing your vision to life and enhancing the beauty and functionality of your outdoor spaces." },
      { name: "Palm Care", slug: "palm-care", blurb: "From trimming and skinning to disease treatment and removal, we keep your palms healthy, clean, and looking their best in the Arizona climate." },
      { name: "Tree Care", slug: "tree-care", blurb: "We are dedicated to the health and beauty of your trees, with our team of certified arborists and skilled tree care professionals committed to providing top-tier service." },
      { name: "Irrigation", slug: "irrigation", blurb: "We specialize in creating sustainable, water-efficient landscapes that flourish year-round, with our team of irrigation specialists dedicated to providing top-tier services tailored to your needs." },
      { name: "Lawn Care & Maintenance", slug: "lawn-care-and-maintenance", blurb: "We take pride in transforming ordinary lawns into lush, vibrant landscapes, with a deep-rooted passion for greenery and a commitment to excellence." },
      { name: "Gazebos & Pergolas", slug: "gazebos-and-pergolas", blurb: "We design and build custom gazebos and pergolas that add shade, structure, and a true outdoor living space to your backyard." },
    ],
  },
  // az0085 blooming - landscape architecture + pools — boutique design/build portfolio firm
  // (blooming.com). Their real site has NO services menu: nav is just View Work / Purpose /
  // About / Contact. Per designer, the Services dropdown is hidden rather than fabricating a
  // list, so the nav matches their real site.
  "blooming-landscape-architecture-pools": {
    hideServicesNav: true,
  },
  // az0084 Bigtree Landscaping — extract-services crawl failed (bad Gemini key), so services
  // locked by hand to the EXACT 4 commercial categories on bigtreeaz.com/services, in their
  // site's order: Commercial Landscaping Construction, Commercial Landscaping Maintenance,
  // Irrigation & Water Management, Commercial Tree Management. Blurbs written on-voice from
  // their real services copy. Manual services replace the asset-overrides array wholesale.
  "bigtree-landscaping": {
    // Designer's call: imgi_109 (= p4) pinned as the hero by leading the photos array
    // (BizHero uses photos[0]). Manual photos replace the asset-overrides array wholesale.
    photos: [
      "/biz-photos/bigtree-landscaping/p4.webp",
      "/biz-photos/bigtree-landscaping/p1.webp",
      "/biz-photos/bigtree-landscaping/p2.webp",
      "/biz-photos/bigtree-landscaping/p3.webp",
      "/biz-photos/bigtree-landscaping/p5.webp",
      "/biz-photos/bigtree-landscaping/p6.webp",
    ],
    services: [
      { name: "Commercial Landscaping Construction", slug: "commercial-landscaping-construction", blurb: "From the ground up or as an enhancement, our all-inclusive, budget-conscious construction crews handle tree and shrub planting, hardscape installation, and irrigation and drainage solutions." },
      { name: "Commercial Landscaping Maintenance", slug: "commercial-landscaping-maintenance", blurb: "Routine, detail-driven care — mowing, edging and blowing, pesticide and fertilizer treatments, and integrated pest management — to keep your property clean, thriving, and functioning as intended." },
      { name: "Irrigation & Water Management", slug: "irrigation-and-water-management", blurb: "From smart controllers and remote site management to rain sensors and drip systems, we maintain your landscape sustainably while lowering utility costs and reducing water waste." },
      { name: "Commercial Tree Management", slug: "commercial-tree-management", blurb: "Our ISA Certified Arborists assess, plan, and care for the trees on your property — protecting their value, safety, and beauty with long-term wellness and risk-management programs." },
    ],
  },
  // az0083 Sonoran Landscape Design — extract-services crawl failed (bad Gemini key), so services
  // locked by hand to the EXACT 8 in the sonoranlandscapedesigninc.com nav, in their site's order:
  // Fireplaces & Fire Pits, Pools & Water Features, Outdoor Kitchens, Ramadas & Pergolas, Artificial
  // Turf, Landscape Lighting, Irrigation Systems, Landscape Pavers (set in asset-overrides.json;
  // blurbs written on-voice from their real service-page copy).
  "sonoran-landscape-design": {
    // Designer's call: imgi_48 (custom-built ramadas = p9) pinned as the hero by leading the photos
    // array (BizHero uses photos[0]). Manual photos replace the asset-overrides array wholesale.
    photos: [
      "/biz-photos/sonoran-landscape-design/p9.webp",
      "/biz-photos/sonoran-landscape-design/p1.webp",
      "/biz-photos/sonoran-landscape-design/p2.webp",
      "/biz-photos/sonoran-landscape-design/p3.webp",
      "/biz-photos/sonoran-landscape-design/p4.webp",
      "/biz-photos/sonoran-landscape-design/p5.webp",
      "/biz-photos/sonoran-landscape-design/p6.webp",
      "/biz-photos/sonoran-landscape-design/p7.webp",
      "/biz-photos/sonoran-landscape-design/p8.webp",
    ],
  },
  // az0082 Genesis Landscape Solutions — extract-services crawl failed (bad Gemini key), so
  // services locked by hand to the EXACT 5 in the genesisaz.com nav (same names & order as
  // their site). The auto-extracted set had #4 as "Landscape Enhancements"; the live label is
  // just "Enhancements". Manual services replace the asset-overrides array wholesale; existing
  // extracted blurbs kept verbatim.
  "genesis-landscape-solutions": {
    // Designer's call: dark nav + footer so the white parts of the logo stay visible,
    // and imgi_21 (Maricopa Meadows = p6) pinned as the hero by leading the photos array
    // (BizHero uses photos[0]). Manual photos replace the asset-overrides array wholesale.
    chromeDark: true,
    photos: [
      "/biz-photos/genesis-landscape-solutions/p6.webp",
      "/biz-photos/genesis-landscape-solutions/p1.webp",
      "/biz-photos/genesis-landscape-solutions/p2.webp",
      "/biz-photos/genesis-landscape-solutions/p3.webp",
      "/biz-photos/genesis-landscape-solutions/p4.webp",
      "/biz-photos/genesis-landscape-solutions/p5.webp",
    ],
    services: [
      { name: "Landscape Maintenance", slug: "landscape-maintenance", blurb: "From routine maintenance to complex landscape design and enhancement, we offer the full spectrum of landscape services." },
      { name: "Irrigation & Water Management", slug: "irrigation-and-water-management", blurb: "We offer comprehensive irrigation and water management services to ensure the health and vitality of your landscape." },
      { name: "Tree Care", slug: "tree-care", blurb: "Our team provides expert tree care to maintain the beauty and health of the trees on your property." },
      { name: "Enhancements", slug: "enhancements", blurb: "We don’t just maintain landscapes – we enhance them, working to maximize curb appeal while ensuring the health and value of your landscape are protected." },
      { name: "Pest & Plant Health Services", slug: "pest-and-plant-health-services", blurb: "We provide pest and plant health services to keep your landscape thriving and free from damaging issues." },
    ],
  },
  // az0079 Scape Tech Landscape & Design — logo has white lettering → near-black nav +
  // footer so the wordmark stays visible on the light chrome (designer's call). Brand
  // colors (green #2e6a1f primary / orange #d96b10 secondary) + 9 real photos auto-wired
  // via asset-overrides (the two swatches were renamed to Color.png / Second Color.png so
  // process-assets read them as colors, not gallery photos). Services locked to the EXACT 4
  // categories in their site's Services dropdown (designer screenshot), in order: Landscape
  // Design, Hardscaping, Outdoor Living, Artificial Turf. Live site is Cloudflare-walled, so
  // blurbs written on-voice from their real sub-pages (pavers/hardscape, bbq/outdoor-
  // construction/waterfalls, artificial turf). Manual services replace the asset array wholesale.
  "scape-tech-landscape-and-design": {
    chromeDark: true,
    bgOverride: "#E7F8EF", // very light green — replaces the peach wash auto-tinted from the orange secondary; on-brand with the green primary (heroBg auto-tints lighter)
    services: [
      { name: "Landscape Design", slug: "landscape-design", blurb: "Custom landscape design that turns your outdoor vision into a beautiful, functional space built for Arizona living." },
      { name: "Hardscaping", slug: "hardscaping", blurb: "Paver patios, walkways, and hardscape features built to add lasting structure, durability, and curb appeal to your property." },
      { name: "Outdoor Living", slug: "outdoor-living", blurb: "Outdoor kitchens, BBQs, fire features, and water features that turn your backyard into the ultimate space for entertaining." },
      { name: "Artificial Turf", slug: "artificial-turf", blurb: "Premium artificial turf for a lush, low-maintenance lawn that stays green year-round while saving water in the desert heat." },
    ],
  },
  // az0072 Legacy Green Solutions — extract-services crawl failed (bad Gemini key), so
  // services locked by hand to the full distinct set on legacygreensolutions.com. The
  // prior crawl had 6 and was missing Pavers/Patios/Driveways, which the site features as
  // its own category (travertine pavers, patios, driveways). Manual services replace the
  // asset-overrides array wholesale; existing extracted blurbs kept verbatim.
  "legacy-green-solutions": {
    services: [
      { name: "Artificial Grass", slug: "artificial-grass", blurb: "Artificial grass solutions for every application and budget, complete with a 15-year warranty and professional installation support." },
      { name: "Putting Greens", slug: "putting-greens", blurb: "As an 8-year putting green manufacturer, we create custom practice greens that bring the golf course experience to your backyard." },
      { name: "Pavers, Patios & Driveways", slug: "pavers-patios-and-driveways", blurb: "Custom paver patios, driveways, and travertine installations that add lasting structure, durability, and curb appeal to your property." },
      { name: "Hardscaping", slug: "hardscaping", blurb: "Hardscape designs that add structure and visual interest to your property while creating functional outdoor spaces for relaxing and entertaining." },
      { name: "Landscape Services", slug: "landscape-services", blurb: "Complete landscape solutions tailored to your vision, delivered with professional guidance from consultation through completion." },
      { name: "Outdoor Lighting", slug: "outdoor-lighting", blurb: "Illuminate your outdoor spaces with custom lighting designs to enhance aesthetics and security." },
      { name: "Outdoor BBQ Installations", slug: "outdoor-bbq-installations", blurb: "Create the perfect outdoor entertaining area with our custom outdoor BBQ installations." },
    ],
  },
  // az0066 CYC Landscaping — logo is white-on-transparent → near-black nav + footer
  // so the white lettering stays visible on the light chrome.
  "cyc-landscaping": {
    chromeDark: true,
  },
  // az0065 Crafted Outdoor Living — extract-services crawl failed (bad Gemini key), so
  // services locked by hand to the EXACT 7 in the "Luxury Outdoor Living Services" section
  // on craftedoutdoorlivingaz.com — same names, order, and blurbs as their site. The crawl
  // had 6 and was missing Swimming Pools & Spas. Manual services replace the asset-overrides
  // array wholesale.
  "crafted-outdoor-living": {
    // Designer-picked hero = imgi_22_homepage-header1.jpg (→ p8). Moved to front so it's
    // photos[0] (the hero); rest keep order behind it for the gallery.
    photos: [
      "/biz-photos/crafted-outdoor-living/p8.webp",
      "/biz-photos/crafted-outdoor-living/p1.webp",
      "/biz-photos/crafted-outdoor-living/p2.webp",
      "/biz-photos/crafted-outdoor-living/p3.webp",
      "/biz-photos/crafted-outdoor-living/p4.webp",
      "/biz-photos/crafted-outdoor-living/p5.webp",
      "/biz-photos/crafted-outdoor-living/p6.webp",
      "/biz-photos/crafted-outdoor-living/p7.webp",
      "/biz-photos/crafted-outdoor-living/p9.webp",
      "/biz-photos/crafted-outdoor-living/p10.webp",
      "/biz-photos/crafted-outdoor-living/p11.webp",
    ],
    services: [
      { name: "Backyard Remodel & Design", slug: "backyard-remodel-and-design", blurb: "Transform your outdoor space with custom backyard remodels designed around entertaining, relaxation, and modern Arizona living." },
      { name: "Swimming Pools & Spas", slug: "swimming-pools-and-spas", blurb: "Luxury swimming pools and spas designed to elevate your backyard into a private resort-style retreat." },
      { name: "Patio Design & Hardscaping", slug: "patio-design-and-hardscaping", blurb: "Designer patios, travertine pavers, porcelain surfaces, and custom hardscape features crafted for long-lasting beauty and function." },
      { name: "Outdoor Kitchens & Fire Features", slug: "outdoor-kitchens-and-fire-features", blurb: "Create the ultimate outdoor living patio with custom kitchens, BBQ stations, fireplaces, and fire pits built for entertaining." },
      { name: "Shade Structures", slug: "shade-structures", blurb: "Architectural pergolas and shade structures designed to enhance comfort while complementing your outdoor lifestyle landscape." },
      { name: "Landscape & Outdoor Lighting", slug: "landscape-and-outdoor-lighting", blurb: "Thoughtful landscape design and LED lighting solutions that bring warmth, ambiance, and usability to your outdoor living space." },
      { name: "Artificial Turf", slug: "artificial-turf", blurb: "When it comes to selecting the perfect turf, our premium options offer both aesthetic appeal and lasting durability." },
    ],
  },
  // az0061 Always Green Turf AZ — logo is white-on-transparent → near-black nav + footer
  // so the white lettering stays visible on the light chrome. Services already match the
  // real site's "Our Services" section (Artificial Lawns, Putting Greens, Pet Turf,
  // Playground Turf, Pavers & Pergolas) via asset-overrides.json.
  "always-green-turf-az": {
    chromeDark: true,
    // Designer-picked hero = imgi_51_hero-bg (→ p11). Moved to front so it's photos[0]
    // (the hero); rest keep order behind it for the gallery.
    photos: [
      "/biz-photos/always-green-turf-az/p11.webp",
      "/biz-photos/always-green-turf-az/p1.webp",
      "/biz-photos/always-green-turf-az/p2.webp",
      "/biz-photos/always-green-turf-az/p3.webp",
      "/biz-photos/always-green-turf-az/p4.webp",
      "/biz-photos/always-green-turf-az/p5.webp",
      "/biz-photos/always-green-turf-az/p6.webp",
      "/biz-photos/always-green-turf-az/p7.webp",
      "/biz-photos/always-green-turf-az/p8.webp",
      "/biz-photos/always-green-turf-az/p9.webp",
      "/biz-photos/always-green-turf-az/p10.webp",
    ],
  },
  // az0058 Falcon Landscapes Pavers & Masonry LLC — designer-picked hero = imgi_118
  // (Outdoor Environments wide shot) → p15. Moved to front so it's photos[0] (the hero);
  // rest keep order behind it for the gallery.
  "falcon-landscapes-pavers-and-masonry-llc": {
    // Logo wordmark is white → dark nav + footer so it stays legible on light chrome.
    chromeDark: true,
    // onColor() lands their blue (#046cd6) just over the light threshold → near-black CTA
    // text. Force white so the blue CTAs read cleanly.
    ctaFg: "#ffffff",
    photos: [
      "/biz-photos/falcon-landscapes-pavers-and-masonry-llc/p15.webp",
      "/biz-photos/falcon-landscapes-pavers-and-masonry-llc/p1.webp",
      "/biz-photos/falcon-landscapes-pavers-and-masonry-llc/p2.webp",
      "/biz-photos/falcon-landscapes-pavers-and-masonry-llc/p3.webp",
      "/biz-photos/falcon-landscapes-pavers-and-masonry-llc/p4.webp",
      "/biz-photos/falcon-landscapes-pavers-and-masonry-llc/p5.webp",
      "/biz-photos/falcon-landscapes-pavers-and-masonry-llc/p6.webp",
      "/biz-photos/falcon-landscapes-pavers-and-masonry-llc/p7.webp",
      "/biz-photos/falcon-landscapes-pavers-and-masonry-llc/p8.webp",
      "/biz-photos/falcon-landscapes-pavers-and-masonry-llc/p9.webp",
      "/biz-photos/falcon-landscapes-pavers-and-masonry-llc/p10.webp",
      "/biz-photos/falcon-landscapes-pavers-and-masonry-llc/p11.webp",
      "/biz-photos/falcon-landscapes-pavers-and-masonry-llc/p12.webp",
      "/biz-photos/falcon-landscapes-pavers-and-masonry-llc/p13.webp",
      "/biz-photos/falcon-landscapes-pavers-and-masonry-llc/p14.webp",
    ],
  },
  // az0057 Alpha Landscape LLC — logo has light/white lettering that washed out on the
  // light chrome → near-black nav + footer so the full wordmark stays legible.
  "alpha-landscape-llc": {
    chromeDark: true,
  },
  // az0056 Cactus Landscaping LLC — designer-picked hero = imgi_10_irrigation-system-1 (→ p2),
  // moved to front so it's photos[0]; rest keep order behind it for the gallery. (imgi_10 is
  // only 1024w, so it reads a touch softer full-bleed than the 1829w grass shot — designer's call.)
  // Services: the crawl only caught 6; the real site menu lists 9. Full list pinned here (manual
  // replaces the asset-overrides array wholesale) — existing 6 blurbs kept, new 3 written on-voice.
  "cactus-landscaping-llc": {
    photos: [
      "/biz-photos/cactus-landscaping-llc/p2.webp",
      "/biz-photos/cactus-landscaping-llc/p1.webp",
      "/biz-photos/cactus-landscaping-llc/p3.webp",
      "/biz-photos/cactus-landscaping-llc/p4.webp",
      "/biz-photos/cactus-landscaping-llc/p5.webp",
      "/biz-photos/cactus-landscaping-llc/p6.webp",
      "/biz-photos/cactus-landscaping-llc/p7.webp",
    ],
    services: [
      { name: "Tree Maintenance and Remodeling", slug: "tree-maintenance-and-remodeling", blurb: "Our skilled team is passionate about every detail, from designing and installing vibrant landscapes to providing routine maintenance, irrigation system repairs, and full property cleanups." },
      { name: "Modern Irrigation System and Repairs", slug: "modern-irrigation-system-and-repairs", blurb: "From regular lawn care and landscape design to irrigation system repairs and complete property cleanup, we handle every detail with precision." },
      { name: "Artificial Grass Repairs", slug: "artificial-grass-repairs", blurb: "Our top-quality tools and expertise ensure that your property, whether residential or commercial, stays in pristine condition year-round." },
      { name: "Lawn Maintenance", slug: "lawn-maintenance", blurb: "We provide exceptional residential and commercial maintenance services tailored to your specific needs." },
      { name: "Pavers", slug: "pavers", blurb: "We design and install paver patios, walkways, and driveways that add lasting curb appeal and function to your property." },
      { name: "Junk Removal", slug: "junk-removal", blurb: "We haul away yard waste, debris, and unwanted material, leaving your residential or commercial property clean and clear." },
      { name: "Full Cleanup", slug: "full-cleanup", blurb: "From seasonal yard cleanups to post-project debris removal, we get your property looking pristine from corner to corner." },
      { name: "Planting Services", slug: "planting-services", blurb: "We select and plant trees, shrubs, and desert-friendly greenery to bring lasting life and color to your landscape." },
      { name: "Construction Service", slug: "construction-service", blurb: "We handle hardscape and landscape construction from the ground up, building durable outdoor spaces built to last in the Arizona climate." },
    ],
  },
  // az0055 Green Forever Arizona — designer: site sells just two things, so trim the
  // 6 auto-extracted services down to the two real headliners (turf + patio covers).
  // Blurbs kept from the crawl. Manual services replace the asset-overrides array wholesale.
  "green-forever-arizona": {
    services: [
      { name: "Artificial Turf Systems", slug: "artificial-turf-systems", blurb: "We install premium artificial turf systems, including specialized pet turf and PGA putting greens, using 100% American-made materials and Microban antimicrobial infill." },
      { name: "Patio Covers & Pergolas", slug: "patio-covers-and-pergolas", blurb: "We provide and install a variety of patio covers and pergolas, including SunGuard Patio Covers, to enhance your outdoor comfort and provide essential shade." },
    ],
  },
  // az0054 Better Life Landscape and Design — designer-picked hero = imgi_111 (custom travertine
  // fire pit, turf, flooring, lighting & tree install) → p16. Moved to front so it's photos[0]
  // (the hero); rest keep order behind it for the gallery.
  "better-life-landscape-and-design": {
    // Each service card pinned to a photo that actually depicts that service (no fire pit
    // behind "Paver Install"). Blurbs copied from the crawl so the deep-merge keeps them.
    services: [
      { name: "Turf Install", slug: "turf-install", image: "/biz-photos/better-life-landscape-and-design/p4.webp", blurb: "We offer turf installation to elevate your outdoor space with a refined, cohesive look that’s built to last." },
      { name: "Paver Install", slug: "paver-install", image: "/biz-photos/better-life-landscape-and-design/p7.webp", blurb: "We install paver walkways and driveways to enhance the aesthetic and functionality of your property." },
      { name: "Trees & Plants", slug: "trees-and-plants", image: "/biz-photos/better-life-landscape-and-design/p5.webp", blurb: "Our team provides tree planting and plant installation to bring life and natural beauty to your landscape." },
      { name: "Outdoor Lighting", slug: "outdoor-lighting", image: "/biz-photos/better-life-landscape-and-design/p2.webp", blurb: "We offer outdoor lighting solutions to illuminate your property, creating a warm and inviting atmosphere in the evening." },
      { name: "Custom Fire Pits", slug: "custom-fire-pits", image: "/biz-photos/better-life-landscape-and-design/p3.webp", blurb: "We design and install custom fire pits, such as travertine-style, to create a gorgeous outdoor retreat." },
      { name: "Pergola Install", slug: "pergola-install", image: "/biz-photos/better-life-landscape-and-design/p13.webp", blurb: "We install pergolas to add a stylish and functional feature to your outdoor living space." },
    ],
    photos: [
      "/biz-photos/better-life-landscape-and-design/p16.webp",
      "/biz-photos/better-life-landscape-and-design/p1.webp",
      "/biz-photos/better-life-landscape-and-design/p2.webp",
      "/biz-photos/better-life-landscape-and-design/p3.webp",
      "/biz-photos/better-life-landscape-and-design/p4.webp",
      "/biz-photos/better-life-landscape-and-design/p5.webp",
      "/biz-photos/better-life-landscape-and-design/p6.webp",
      "/biz-photos/better-life-landscape-and-design/p7.webp",
      "/biz-photos/better-life-landscape-and-design/p8.webp",
      "/biz-photos/better-life-landscape-and-design/p9.webp",
      "/biz-photos/better-life-landscape-and-design/p10.webp",
      "/biz-photos/better-life-landscape-and-design/p11.webp",
      "/biz-photos/better-life-landscape-and-design/p12.webp",
      "/biz-photos/better-life-landscape-and-design/p13.webp",
      "/biz-photos/better-life-landscape-and-design/p14.webp",
      "/biz-photos/better-life-landscape-and-design/p15.webp",
      "/biz-photos/better-life-landscape-and-design/p17.webp",
      "/biz-photos/better-life-landscape-and-design/p18.webp",
    ],
  },
  // az0053 EZ Landscape & Maintenance Inc. — deep-green primary (#0a3e2c) + gold secondary (#f4bb2a).
  // Designer art direction: the gold-tinted section washes read cream/yellow — swap to a
  // very light green wash that's on-brand with the green primary (heroBg auto-tints lighter).
  // Gold stays as the icon-chip accent.
  "ez-landscape-and-maintenance-inc-mesa-landscaping-service": {
    bgOverride: "#E7F8EF", // very light green — replaces the gold-tinted (cream) section washes; heroBg auto-tints lighter
    logoScale: 1.7, // designer: scale nav logo up well past the CTA button (padded square mark reads small at default)
    // Designer: service-card images were cycling the photo pool arbitrarily (pavers→shrubs,
    // synthetic grass→flowers, sprinkler→pavement). Pin each card to a context-matching photo.
    // Same names/slugs/blurbs as the asset-overrides crawl; only `image` is added.
    services: [
      { name: "Pavers Installation", slug: "pavers-installation", image: "/biz-photos/ez-landscape-and-maintenance-inc-mesa-landscaping-service/p8.webp", blurb: "Elevate your Arizona outdoor space with our expert Mesa paver installation services. From pathways to patios, we’ll pave the way to a beautiful landscape." },
      { name: "H.O.A. Service", slug: "h-o-a-service", image: "/biz-photos/ez-landscape-and-maintenance-inc-mesa-landscaping-service/p3.webp", blurb: "We cater to HOA needs with professional Mesa landscaping service in Maricopa County. Maintain curb appeal, and green spaces, and create a welcoming community atmosphere." },
      { name: "Lawn Maintenance", slug: "lawn-maintenance", image: "/biz-photos/ez-landscape-and-maintenance-inc-mesa-landscaping-service/p10.webp", blurb: "Achieve the picture-perfect Mesa lawn and keep your lawn looking its best with our top-notch mesa landscaping services, making your yard the envy of the neighborhood." },
      { name: "Sprinkler System", slug: "sprinkler-system", image: "/biz-photos/ez-landscape-and-maintenance-inc-mesa-landscaping-service/p11.webp", blurb: "Our advanced sprinkler systems are designed to provide your landscape with the precise care it needs. They ensure your outdoor space stays green and vibrant while conserving water." },
      { name: "Synthetic Grass", slug: "synthetic-grass", image: "/biz-photos/ez-landscape-and-maintenance-inc-mesa-landscaping-service/p13.webp", blurb: "Enjoy the luxury of a beautiful, evergreen lawn without the hassle of upkeep. Our high-quality synthetic grass solutions offer a natural look and feel, transforming your space into a low-maintenance paradise." },
      { name: "Commercial Service", slug: "commercial-service", image: "/biz-photos/ez-landscape-and-maintenance-inc-mesa-landscaping-service/p4.webp", blurb: "Make a memorable impression on your clients and customers with our Mesa commercial landscaping services. We’ll enhance your property’s curb appeal, creating an inviting atmosphere that reflects your business’s professionalism and attention to detail." },
    ],
  },
  // az0050 Coastal Landscaping Solutions — green primary (#00c064) + navy secondary (#0d1b2a).
  // Designer art direction: the navy-tinted section washes read grey/cool — swap to a
  // really light green wash that's on-brand with the green primary (heroBg auto-tints lighter).
  "coastal-landscaping-solutions": {
    bgOverride: "#E7F8EF", // really light green — replaces the navy-tinted (grey) section washes; heroBg auto-tints lighter
    // Designer-supplied service list (extract-services crawl failed on a bad Gemini key) —
    // the EXACT 10 on their real site, same names & order.
    services: [
      { name: "Landscape Design", slug: "landscape-design", blurb: "Custom landscape plans built around your space, style, and budget — from a front-yard refresh to a full backyard transformation." },
      { name: "Sod Installation", slug: "sod-installation", blurb: "Fresh, healthy sod laid for an instant lush lawn that's ready to enjoy from day one." },
      { name: "Mulch Installation", slug: "mulch-installation", blurb: "Quality mulch installed to retain moisture, suppress weeds, and give your beds a clean, finished look." },
      { name: "Planting and Bed Design", slug: "planting-and-bed-design", blurb: "Thoughtfully designed planting beds with the right plants for your climate, color, and seasonal interest." },
      { name: "Retaining Wall Construction", slug: "retaining-wall-construction", blurb: "Durable retaining walls that control slopes, prevent erosion, and define your outdoor space." },
      { name: "Landscape Lighting", slug: "landscape-lighting", blurb: "Accent and pathway lighting that highlights your landscape and keeps your property safe after dark." },
      { name: "Irrigation Installation", slug: "irrigation-installation", blurb: "Efficient irrigation systems that keep every zone watered right while saving water and money." },
      { name: "Lawn Grading", slug: "lawn-grading", blurb: "Precise grading to level your yard, direct drainage, and create the perfect base for sod or planting." },
      { name: "Hardscape Installation", slug: "hardscape-installation", blurb: "Patios, walkways, and outdoor living features built to combine lasting durability with style." },
      { name: "Seasonal Cleanup", slug: "seasonal-cleanup", blurb: "Thorough seasonal cleanups that keep your landscape healthy, tidy, and looking its best year-round." },
    ],
  },
  // az0049 The Desert Root — logo + terracotta #904525 (from swatch) + 13 real photos
  // auto-wired via asset-overrides. extract-services failed (bad Gemini key), so services
  // locked by hand to the EXACT 9 on thedesertroot.com/services — same names & order as their site.
  // chromeDark: their logo is white → near-black nav/footer chrome so it stays visible.
  "the-desert-root": {
    chromeDark: true,
    services: [
      { name: "Landscape Design", slug: "landscape-design", blurb: "It all begins with an idea — a front-yard refresh, a full backyard remodel, or just a vision you need help bringing to life. Our design process starts with your goals, budget, and how you want to use your space, then we create a custom plan that brings it all together." },
      { name: "Custom Planting", slug: "custom-planting", blurb: "Desertscape, Mediterranean, tropical, low-water and low-maintenance, or lush and natural — whatever your style, we'll bring it to life. We select plants that thrive in Arizona's climate, complement your home, and deliver the color, texture, and seasonal interest you're after." },
      { name: "Outdoor Kitchens", slug: "outdoor-kitchens", blurb: "Need a space for grilling and entertaining? From a simple built-in grill station to a full kitchen with countertops, storage, and a bar, we design and build outdoor cooking spaces that make entertaining easy and enjoyable year-round." },
      { name: "Fire Features", slug: "fire-features", blurb: "A cool Arizona evening outside is one of life's simple pleasures. From cozy fire pits perfect for gathering with friends to elegant outdoor fireplaces that anchor your patio, we'll design a feature that adds warmth and ambience to your outdoor living space." },
      { name: "Landscape Lighting", slug: "landscape-lighting", blurb: "Landscape lighting transforms your yard and extends your enjoyment into the evening. Thoughtfully placed path lights, uplighting, and accent fixtures highlight your landscaping, improve safety, and create a welcoming atmosphere usable long after sunset." },
      { name: "Hardscapes", slug: "hardscapes", blurb: "Envisioning a new paver walkway, travertine decking, or a patio extension? From pavers and travertine to decorative concrete, we'll guide you through material options that work in Arizona's climate and match your home's aesthetic — in your color, style, and budget." },
      { name: "Pergolas and More", slug: "pergolas-and-more", blurb: "Beat the summer heat with a shade structure. Whether it's a classic wood pergola, a modern aluminum ramada, or a custom shade sail, we'll design and build a structure that provides relief from the sun while adding architectural interest and defining your outdoor living area." },
      { name: "Artificial Turf", slug: "artificial-turf", blurb: "Need an area for the kids to play or the pets to run — or just greenery without the maintenance and water bill? Today's synthetic grass looks natural, stays green year-round, and holds up beautifully in Arizona's heat, with no mowing, fertilizing, or constant watering." },
      { name: "Seasonal Porch Decorating", slug: "seasonal-porch-decorating", blurb: "Bring warmth and charm to your home with our NEW seasonal porch decorating service. From fall harvest displays to festive holiday arrangements, we handle the design, installation, and seasonal refresh — so your front porch always looks welcoming, with no effort on your part." },
    ],
  },
  // az0048 AC Macias Landscaping LLC — designer-picked hero = imgi_70_12448.jpg
  // (→ p11). Moved to front so it's photos[0] (the hero); rest keep order behind it.
  "ac-macias-landscaping-llc": {
    photos: [
      "/biz-photos/ac-macias-landscaping-llc/p11.webp",
      "/biz-photos/ac-macias-landscaping-llc/p1.webp",
      "/biz-photos/ac-macias-landscaping-llc/p2.webp",
      "/biz-photos/ac-macias-landscaping-llc/p3.webp",
      "/biz-photos/ac-macias-landscaping-llc/p4.webp",
      "/biz-photos/ac-macias-landscaping-llc/p5.webp",
      "/biz-photos/ac-macias-landscaping-llc/p6.webp",
      "/biz-photos/ac-macias-landscaping-llc/p7.webp",
      "/biz-photos/ac-macias-landscaping-llc/p8.webp",
      "/biz-photos/ac-macias-landscaping-llc/p9.webp",
      "/biz-photos/ac-macias-landscaping-llc/p10.webp",
    ],
  },
  // az0045 ZTA Landscape — logo wordmark "Landscape" is a classic serif → Playfair headings.
  // Brand colors (#163c25 deep green / #cea449 gold) + about come from asset-overrides.
  // chromeDark: white "ZTA" half of the logo vanished on the light nav/footer → near-black chrome.
  // Services locked to the EXACT 7 on ztalandscape.com/services (crawl had only 6 — missing
  // Custom Metal Work). Manual services replace the asset-overrides array wholesale.
  "zta-landscape": {
    fontKey: "elegant",
    chromeDark: true,
    services: [
      { name: "Landscaping Design & Installation", slug: "landscaping-design-and-installation", blurb: "From the first sketch to the final plant placement, ZTA Landscape brings your outdoor vision to life." },
      { name: "Irrigation & Drainage", slug: "irrigation-and-drainage", blurb: "A beautiful landscape needs smart water management. We design and install irrigation systems that keep every plant perfectly watered while conserving resources." },
      { name: "Stone & Hardscaping", slug: "stone-and-hardscaping", blurb: "Add structure, beauty, and value to your outdoor space with professional hardscaping." },
      { name: "Lawn Fertilization", slug: "lawn-fertilization", blurb: "A lush green lawn does not happen by accident. Our professional fertilization programs keep your grass healthy, vibrant, and beautiful all year long." },
      { name: "Spring Cleanup", slug: "spring-cleanup", blurb: "After a long winter your landscape needs refreshing. Our spring cleanup services clear away debris, prune overgrown plants, and prepare your yard to look its absolute best." },
      { name: "Gardening & Maintenance", slug: "gardening-and-maintenance", blurb: "Consistent maintenance is the key to a beautiful landscape all year round. Our maintenance crew puts in the time and attention that other companies simply do not." },
      { name: "Custom Metal Work & Fabrication", slug: "custom-metal-work-and-fabrication", blurb: "Hand-welded iron gates, fences, railings, and garden trellises crafted in-house. Every piece is built to last in the Arizona sun." },
    ],
  },
  // az0042 Diaz Tree and Landscape Management — designer-picked hero = imgi_20_hero-bg-desktop
  // (→ p10). Moved to front so it's photos[0] (the hero). p1 was the colour2.png swatch (named
  // off-pattern so it got picked up as a photo, not the secondary color) — dropped from the
  // gallery. Rest keep order behind the hero.
  "diaz-tree-and-landscape-management": {
    photos: [
      "/biz-photos/diaz-tree-and-landscape-management/p10.webp",
      "/biz-photos/diaz-tree-and-landscape-management/p2.webp",
      "/biz-photos/diaz-tree-and-landscape-management/p3.webp",
      "/biz-photos/diaz-tree-and-landscape-management/p4.webp",
      "/biz-photos/diaz-tree-and-landscape-management/p5.webp",
      "/biz-photos/diaz-tree-and-landscape-management/p6.webp",
      "/biz-photos/diaz-tree-and-landscape-management/p7.webp",
      "/biz-photos/diaz-tree-and-landscape-management/p8.webp",
      "/biz-photos/diaz-tree-and-landscape-management/p9.webp",
    ],
  },
  // az0041 AJ'S Landscaping and Demo LLC — designer-picked hero = imgi_11_background.jpg
  // (→ p6). Moved to front so it's photos[0] (the hero); rest keep order behind it.
  "aj-s-landscaping-and-demo-llc": {
    photos: [
      "/biz-photos/aj-s-landscaping-and-demo-llc/p6.webp",
      "/biz-photos/aj-s-landscaping-and-demo-llc/p1.webp",
      "/biz-photos/aj-s-landscaping-and-demo-llc/p2.webp",
      "/biz-photos/aj-s-landscaping-and-demo-llc/p3.webp",
      "/biz-photos/aj-s-landscaping-and-demo-llc/p4.webp",
      "/biz-photos/aj-s-landscaping-and-demo-llc/p5.webp",
    ],
  },
  // az0040 Triple "J" Service, LLC — services locked to the EXACT list on
  // triplejlawnservice.com (two buckets: water systems + trees). The extract crawl
  // split "Sprinklers" into install/repair and dropped "Tree Removal" — corrected here.
  // Manual services replace the asset-overrides array wholesale, so this is the full set.
  "triple-j-service-llc": {
    services: [
      { name: "Plant Drips", slug: "plant-drips", blurb: "Repair and full installation of plant drip systems to keep your landscaping watered and healthy." },
      { name: "Sprinklers", slug: "sprinklers", blurb: "New sprinkler installations and repairs to keep your lawn and yard green year-round." },
      { name: "Vacuum Breakers / Backflow Preventers", slug: "vacuum-breakers-backflow-preventers", blurb: "Repair and full installation of vacuum breakers and backflow preventers for your water system." },
      { name: "Tree Trimming / Thinning / Cutbacks", slug: "tree-trimming-thinning-cutbacks", blurb: "Professional tree trimming, thinning, and cutbacks to keep your trees healthy and shaped." },
      { name: "Tree Removal", slug: "tree-removal", blurb: "Safe, complete tree removal for trees that need to come down." },
      { name: "Stump Grinding", slug: "stump-grinding", blurb: "Stump grinding to clear away leftover stumps and reclaim your yard." },
    ],
  },
  // az0038 Desert Crest, LLC — deep forest green primary (#005538).
  // Designer-picked hero = imgi_36 (→ p10). Moved to front so it's photos[0] (the hero);
  // the rest keep their order behind it for the gallery.
  "desert-crest-llc": {
    photos: [
      "/biz-photos/desert-crest-llc/p10.webp",
      "/biz-photos/desert-crest-llc/p1.webp",
      "/biz-photos/desert-crest-llc/p2.webp",
      "/biz-photos/desert-crest-llc/p3.webp",
      "/biz-photos/desert-crest-llc/p4.webp",
      "/biz-photos/desert-crest-llc/p5.webp",
      "/biz-photos/desert-crest-llc/p6.webp",
      "/biz-photos/desert-crest-llc/p7.webp",
      "/biz-photos/desert-crest-llc/p8.webp",
      "/biz-photos/desert-crest-llc/p9.webp",
      "/biz-photos/desert-crest-llc/p11.webp",
      "/biz-photos/desert-crest-llc/p12.webp",
      "/biz-photos/desert-crest-llc/p13.webp",
      "/biz-photos/desert-crest-llc/p14.webp",
      "/biz-photos/desert-crest-llc/p15.webp",
      "/biz-photos/desert-crest-llc/p16.webp",
      "/biz-photos/desert-crest-llc/p17.webp",
      "/biz-photos/desert-crest-llc/p18.webp",
      "/biz-photos/desert-crest-llc/p19.webp",
      "/biz-photos/desert-crest-llc/p20.webp",
      "/biz-photos/desert-crest-llc/p21.webp",
    ],
  },
  // az0036 Golden Landscaping LLC — golden primary (#fba51b) + deep green secondary (#304421).
  // Designer art direction: the green-tinted section washes read too cool/grey — swap to a
  // light orange wash on-brand with their golden primary (green stays as the icon-chip accent).
  // Services re-checked against goldenlandscape.net — their site lists exactly FOUR (the
  // extract crawl had inflated it with Yard Maintenance + Tree/Bush Removal, which aren't real).
  "golden-landscaping-llc": {
    bgOverride: "#FCE6CE", // light orange — replaces the green-tinted (grey-green) section washes; heroBg auto-tints lighter
    services: [
      { name: "Landscaping Services", slug: "landscaping-services", blurb: "Enhance your property's appeal with our innovative hardscaping and sustainable landscaping techniques." },
      { name: "Hardscaping", slug: "hardscaping", blurb: "Elevate your outdoor spaces with our expert hardscaping services that combine durability and style." },
      { name: "Tree Planting", slug: "tree-planting", blurb: "Our tree planting expertise ensures a robust and vibrant landscape through meticulous planning and professional soil and species assessments." },
      { name: "Fencing Services", slug: "fencing-services", blurb: "Delivering comprehensive fence maintenance services to keep your fencing in optimal condition." },
    ],
  },
  // az0037 Bermuda Landscape — purple primary + orange secondary.
  // Designer-picked hero = imgi_26_Hero-banner-bg.jpg (→ p18). Moved to front so it's
  // photos[0] (the hero); the rest keep their order behind it for the gallery.
  "bermuda-landscape": {
    bgOverride: "#F1EBFB", // really light purple wash — tint of the purple primary; replaces the peach auto-tinted from the orange secondary (heroBg auto-tints lighter)
    // Designer-supplied service list (replaces the auto-extracted crawl) — the 12 from their site.
    services: [
      { name: "Travertine", slug: "travertine", blurb: "Elevate patios and walkways with beautiful, heat-resistant travertine that's built for the desert." },
      { name: "Rock Install", slug: "rock-install", blurb: "Clean, low-water rock groundcover and accents installed for a crisp, finished desert look." },
      { name: "Weed Control & Pre-Emergent", slug: "weed-control-and-pre-emergent", blurb: "Stop weeds before they start with targeted treatment and pre-emergent applications." },
      { name: "Lawn Maintenance", slug: "lawn-maintenance", blurb: "Keep your yard pristine and healthy with dependable, scheduled lawn care." },
      { name: "Turf", slug: "turf", blurb: "Lush, always-green artificial turf that looks real and never needs watering." },
      { name: "Hardscaping", slug: "hardscaping", blurb: "Custom patios, walkways, and outdoor living features that combine durability and style." },
      { name: "Tree Trimming", slug: "tree-trimming", blurb: "Protect the health and shape of your trees with expert, well-timed trimming." },
      { name: "Sprinkler Install & Repair", slug: "sprinkler-install-and-repair", blurb: "Efficient irrigation systems installed and repaired to keep every zone watering right." },
      { name: "Pavers", slug: "pavers", blurb: "Durable, designer paver surfaces for driveways, patios, and pool decks." },
      { name: "Wall Construction", slug: "wall-construction", blurb: "Retaining and seat walls built to define your space and stand up to the elements." },
      { name: "Shrub & Bush Trimming", slug: "shrub-and-bush-trimming", blurb: "Crisp, shaped shrubs and bushes that keep your landscape looking maintained year-round." },
      { name: "Pergolas", slug: "pergolas", blurb: "Custom-built pergolas that add shade, structure, and a true outdoor-living centerpiece." },
    ],
    photos: [
      "/biz-photos/bermuda-landscape/p18.webp",
      "/biz-photos/bermuda-landscape/p1.webp",
      "/biz-photos/bermuda-landscape/p2.webp",
      "/biz-photos/bermuda-landscape/p3.webp",
      "/biz-photos/bermuda-landscape/p4.webp",
      "/biz-photos/bermuda-landscape/p5.webp",
      "/biz-photos/bermuda-landscape/p6.webp",
      "/biz-photos/bermuda-landscape/p7.webp",
      "/biz-photos/bermuda-landscape/p8.webp",
      "/biz-photos/bermuda-landscape/p9.webp",
      "/biz-photos/bermuda-landscape/p10.webp",
      "/biz-photos/bermuda-landscape/p11.webp",
      "/biz-photos/bermuda-landscape/p12.webp",
      "/biz-photos/bermuda-landscape/p13.webp",
      "/biz-photos/bermuda-landscape/p14.webp",
      "/biz-photos/bermuda-landscape/p15.webp",
      "/biz-photos/bermuda-landscape/p16.webp",
      "/biz-photos/bermuda-landscape/p17.webp",
      "/biz-photos/bermuda-landscape/p19.webp",
      "/biz-photos/bermuda-landscape/p20.webp",
    ],
  },
  // az0034 Ersland Touch Landscape — green primary + navy secondary. Designer art
  // direction: the leaf/heart feature + contact icon chips drop the navy for a
  // light blue-grey; the icon auto-derives to dark for contrast.
  "ersland-touch-landscape": {
    chromeDark: true, // logo is white → black nav + black footer so it stays visible
    iconChipBg: "#cbd4dc", // light blue-grey chip behind the feature/contact icons (was navy; dark icon auto-derives)
  },
  // az0031 Landscaping Contractors CRG — green primary + navy secondary.
  // Designer art direction: feature/service/contact icon tiles drop the dark navy
  // for a soft blue-grey; the icon auto-derives to dark for contrast.
  // Services pinned by hand to the THREE their live homepage "What We Do" section
  // actually features (Gemini key is dead, so extract-services couldn't run; the site
  // itemizes exactly these). Names + blurbs lifted from landscapingcontractorsaz.com.
  "landscaping-contractors": {
    services: [
      { name: "Landscaping", slug: "landscaping", blurb: "The most reliable landscaping company across the valley. Tired of the same old desert landscape? We add some curves, some lines, and a dash of color to finally finish your project." },
      { name: "Sod and Pavement", slug: "sod-and-pavement", blurb: "Can't find the best grass or sift through thousands of different pavement types? Let us jump into the action and handle the sod and paving for you." },
      { name: "New Projects", slug: "new-projects", blurb: "Starting from scratch? Have a plan that's sat around unfinished? Let us help you finish your blueprint-of-a-yard, start to finish." },
    ],
    iconChipBg: "#d9dfe6", // light blue-grey chip behind the leaf/heart feature + contact icons (was navy; dark icon auto-derives)
    bgOverride: "#e5e9ee", // very light blue-grey for the soft section washes (was #bfc9d5 from the navy secondary); heroBg auto-tints lighter
    // Designer-picked hero = imgi_89 (→ p16). Moved to front so it's photos[0] (the hero);
    // the rest keep their order behind it for the gallery.
    photos: [
      "/biz-photos/landscaping-contractors/p16.webp",
      "/biz-photos/landscaping-contractors/p1.webp",
      "/biz-photos/landscaping-contractors/p2.webp",
      "/biz-photos/landscaping-contractors/p3.webp",
      "/biz-photos/landscaping-contractors/p4.webp",
      "/biz-photos/landscaping-contractors/p5.webp",
      "/biz-photos/landscaping-contractors/p6.webp",
      "/biz-photos/landscaping-contractors/p7.webp",
      "/biz-photos/landscaping-contractors/p8.webp",
      "/biz-photos/landscaping-contractors/p9.webp",
      "/biz-photos/landscaping-contractors/p10.webp",
      "/biz-photos/landscaping-contractors/p11.webp",
      "/biz-photos/landscaping-contractors/p12.webp",
      "/biz-photos/landscaping-contractors/p13.webp",
      "/biz-photos/landscaping-contractors/p14.webp",
      "/biz-photos/landscaping-contractors/p15.webp",
    ],
  },
  // az0029 Phoenix Landscaping Company — two-color brand (teal #1a3d45 + orange #fe4f2d).
  // Designer art direction: CTA buttons pop in the secondary orange, while the feature/
  // service/contact icon tiles take the deep teal. Accent (eyebrows, links, stars) stays teal.
  "phoenix-landscaping-company": {
    ctaBg: "#fe4f2d", // secondary orange on the primary CTA buttons (white text auto-derives)
    iconChipBg: "#1a3d45", // primary teal tile behind the leaf/heart feature + contact icons (white icon auto-derives)
    bgOverride: "#DCE4E6", // light tint of the teal/blue primary for the soft section washes (was blush pink from the orange secondary)
  },
  // az0030 Organic Landscape Services (OLS) — no logo. Nav wordmark only: "OLS" pill +
  // "Landscape Design & Construction". Real `name` stays "Organic Landscape Services" so
  // body copy ("…choose Organic", "About Organic Landscape Services") reads right.
  "organic-landscape-services": {
    logoBadge: false,
    logoWordmark: "OLS Landscape Design & Construction",
    photos: [
      "/biz-photos/organic-landscape-services/hero.webp",
      "/biz-photos/organic-landscape-services/landscape-design.webp",
      "/biz-photos/organic-landscape-services/xeriscaping.webp",
      "/biz-photos/organic-landscape-services/artificial-turf.webp",
      "/biz-photos/organic-landscape-services/hardscaping.webp",
      "/biz-photos/organic-landscape-services/irrigation.webp",
      "/biz-photos/organic-landscape-services/maintenance.webp",
    ],
    services: [
      { name: "Landscape Design & Installation", slug: "landscape-design", image: "/biz-photos/organic-landscape-services/landscape-design.webp", blurb: "We craft custom landscape designs and manage the full installation, bringing your outdoor vision to life with precision and creativity." },
      { name: "Xeriscaping & Desert Landscaping", slug: "xeriscaping", image: "/biz-photos/organic-landscape-services/xeriscaping.webp", blurb: "Embrace the beauty of the desert with our water-efficient xeriscaping and desert landscaping solutions, perfectly suited for Arizona's climate." },
      { name: "Artificial Turf Installation", slug: "artificial-turf", image: "/biz-photos/organic-landscape-services/artificial-turf.webp", blurb: "Enjoy a perpetually green, low-maintenance lawn with our professional artificial turf installation services." },
      { name: "Paver Patios & Hardscaping", slug: "hardscaping", image: "/biz-photos/organic-landscape-services/hardscaping.webp", blurb: "Enhance your outdoor living with custom paver patios, walkways, and other hardscaping elements that add structure and appeal." },
      { name: "Irrigation & Drip Systems", slug: "irrigation", image: "/biz-photos/organic-landscape-services/irrigation.webp", blurb: "Ensure your plants thrive with expertly designed and installed irrigation and drip systems for optimal water delivery." },
      { name: "Lawn & Yard Maintenance", slug: "maintenance", image: "/biz-photos/organic-landscape-services/maintenance.webp", blurb: "Keep your outdoor space pristine and healthy with our comprehensive lawn and yard maintenance programs." },
    ],
  },
  // az0067 M&N Complete Landscaping LLC — no logo. Nav = wordmark only, "M and N Complete
  // Landscaping" (designer's spelling, no badge). Live site (mnlandscapingaz.com) is down/parked,
  // so services locked by hand to the EXACT 6 cards on their last live homepage (recovered via
  // Wayback 2025-02-06): Landscaping Design, Lawn Mowing & Cleanups, Irrigation, Tree & Palm
  // Trimming, Gravel Spreading, Paver Installation. Manual services replace the asset array wholesale.
  "mandn-complete-landscaping-llc": {
    logoBadge: false,
    logoWordmark: "M and N Complete Landscaping",
    services: [
      { name: "Landscaping Design", slug: "landscaping-design", blurb: "We craft custom landscapes that combine beauty and functionality, designing outdoor spaces that fit the way you live." },
      { name: "Lawn Mowing & Cleanups", slug: "lawn-mowing-cleanups", blurb: "Neat, trimmed lawns and thorough seasonal cleanups keep your yard looking its best all year long." },
      { name: "Irrigation System Installation", slug: "irrigation", blurb: "We design and install efficient irrigation systems that deliver the right water to the right place for lush, healthy landscapes." },
      { name: "Tree & Palm Trimming", slug: "tree-palm-trimming", blurb: "Our trimming keeps your trees and palms healthy, well-shaped, and looking their best." },
      { name: "Gravel Spreading", slug: "gravel-spreading", blurb: "We install durable, stylish gravel and ground-cover solutions that add low-maintenance desert appeal to your property." },
      { name: "Paver Installation", slug: "paver-installation", blurb: "Stylish, durable paver walkways and patios that bring lasting form and function to your outdoor living space." },
    ],
  },
  // Designer-picked hero = imgi_3 (high-res _c crop). p6 was the same shot (low-res), so it's dropped.
  // Hero shot repeated at index 6 so it's also the CTA-band background (pick(photos, 6)).
  "jim-s-paradise-creations-landscaping": {
    photos: [
      "/biz-photos/jim-s-paradise-creations-landscaping/hero.webp",
      "/biz-photos/jim-s-paradise-creations-landscaping/p1.webp",
      "/biz-photos/jim-s-paradise-creations-landscaping/p2.webp",
      "/biz-photos/jim-s-paradise-creations-landscaping/p3.webp",
      "/biz-photos/jim-s-paradise-creations-landscaping/p4.webp",
      "/biz-photos/jim-s-paradise-creations-landscaping/p5.webp",
      "/biz-photos/jim-s-paradise-creations-landscaping/hero.webp",
      "/biz-photos/jim-s-paradise-creations-landscaping/p7.webp",
      "/biz-photos/jim-s-paradise-creations-landscaping/p8.webp",
      "/biz-photos/jim-s-paradise-creations-landscaping/p9.webp",
    ],
  },
  // Wide "BIG NICK'S" wordmark — shrink it a touch in the nav so it doesn't dominate the pill.
  "big-nick-s-landscaping-and-maintenance": {
    logoScale: 0.82,
  },
  // az0029's inbox assets were actually Phoenix LANDSCAPERS' brand (logo wordmark +
  // "Phoenix-Landscapers" photos), dropped under the wrong QR. Relocated here to az0027.
  // Designer picked imgi_34 (→ p20) as the home hero. Each service gets an on-topic hero
  // so the rotating gallery never drops a mismatched shot onto the wrong page. The four
  // pet/dog turf photos (p4/p15/p18/p21) live ONLY on the Artificial Grass page — they're
  // pulled from the shared `photos` pool below so they can't rotate into other pages.
  "phoenix-landscapers-landscaping-design-and-tree-services": {
    services: [
      { name: "Artificial Grass Installation", slug: "artificial-grass-installation", blurb: "We install artificial grass that fits Phoenix living perfectly. It’s clean, realistic, and built to handle desert heat.", image: "/biz-photos/phoenix-landscapers-landscaping-design-and-tree-services/p4.webp" },
      { name: "Synthetic Putting Greens", slug: "synthetic-putting-greens", blurb: "We design and install synthetic grass putting greens that roll smooth and true, just like a course.", image: "/biz-photos/phoenix-landscapers-landscaping-design-and-tree-services/p14.webp" },
      { name: "Paver Installation", slug: "paver-installation", blurb: "Paver driveways, walkways, patios, and pool decks bring strength and style to your home, installed on a compact base that prevents shifting or cracking.", image: "/biz-photos/phoenix-landscapers-landscaping-design-and-tree-services/p24.webp" },
      { name: "Retaining Walls", slug: "retaining-walls", blurb: "We build retaining walls from stone or block that manage slopes, prevent erosion, and add structure to your design.", image: "/biz-photos/phoenix-landscapers-landscaping-design-and-tree-services/p10.webp" },
      { name: "Fire Pits", slug: "fire-pits", blurb: "We build custom fire pit designs using pavers or natural stone, with gas or wood-burning setups to fit your space and style.", image: "/biz-photos/phoenix-landscapers-landscaping-design-and-tree-services/p23.webp" },
      { name: "Landscape Rock and Xeriscaping", slug: "landscape-rock-and-xeriscaping", blurb: "We install decorative rock, gravel, and boulders, combining desert plants with water-efficient landscaping to create low-maintenance and visually appealing yards." },
    ],
    photos: [
      "/biz-photos/phoenix-landscapers-landscaping-design-and-tree-services/p20.webp",
      "/biz-photos/phoenix-landscapers-landscaping-design-and-tree-services/p1.webp",
      "/biz-photos/phoenix-landscapers-landscaping-design-and-tree-services/p2.webp",
      "/biz-photos/phoenix-landscapers-landscaping-design-and-tree-services/p3.webp",
      "/biz-photos/phoenix-landscapers-landscaping-design-and-tree-services/p5.webp",
      "/biz-photos/phoenix-landscapers-landscaping-design-and-tree-services/p6.webp",
      "/biz-photos/phoenix-landscapers-landscaping-design-and-tree-services/p7.webp",
      "/biz-photos/phoenix-landscapers-landscaping-design-and-tree-services/p8.webp",
      "/biz-photos/phoenix-landscapers-landscaping-design-and-tree-services/p9.webp",
      "/biz-photos/phoenix-landscapers-landscaping-design-and-tree-services/p10.webp",
      "/biz-photos/phoenix-landscapers-landscaping-design-and-tree-services/p11.webp",
      "/biz-photos/phoenix-landscapers-landscaping-design-and-tree-services/p12.webp",
      "/biz-photos/phoenix-landscapers-landscaping-design-and-tree-services/p13.webp",
      "/biz-photos/phoenix-landscapers-landscaping-design-and-tree-services/p14.webp",
      "/biz-photos/phoenix-landscapers-landscaping-design-and-tree-services/p16.webp",
      "/biz-photos/phoenix-landscapers-landscaping-design-and-tree-services/p17.webp",
      "/biz-photos/phoenix-landscapers-landscaping-design-and-tree-services/p19.webp",
      "/biz-photos/phoenix-landscapers-landscaping-design-and-tree-services/p22.webp",
      "/biz-photos/phoenix-landscapers-landscaping-design-and-tree-services/p23.webp",
      "/biz-photos/phoenix-landscapers-landscaping-design-and-tree-services/p24.webp",
    ],
  },
  // Designer picked the backyard-patio shot (p9) as the hero.
  "arizona-creations-landscaping": {
    photos: [
      "/biz-photos/arizona-creations-landscaping/p9.webp",
      "/biz-photos/arizona-creations-landscaping/p1.webp",
      "/biz-photos/arizona-creations-landscaping/p2.webp",
      "/biz-photos/arizona-creations-landscaping/p3.webp",
      "/biz-photos/arizona-creations-landscaping/p4.webp",
      "/biz-photos/arizona-creations-landscaping/p5.webp",
      "/biz-photos/arizona-creations-landscaping/p6.webp",
      "/biz-photos/arizona-creations-landscaping/p7.webp",
      "/biz-photos/arizona-creations-landscaping/p8.webp",
      "/biz-photos/arizona-creations-landscaping/p10.webp",
    ],
  },
  "straight-line-landscape": {
    bgOverride: "#F2F2F2", // light grey — replaces the red-tinted (blush pink) section washes; red stays the accent
    iconChipBg: "#E6E6E6", // matching grey chip behind service/feature icons (was blush); red icon auto-derives
  },
  // The real site (unwindlandscapes.com) lists exactly three services — extract-services
  // had pulled five generic ones. Order mirrors their site.
  "landscape-design-phoenix-landscaping-architect-unwind-landsc": {
    iconChipBg: "#d2d9cb", // light sage chip behind the feature/service/contact icons (was dark green); dark icon auto-derives
    services: [
      { name: "Landscaping Design", slug: "landscaping-design", blurb: "Our landscape designers work closely with you to turn your ideas into a beautiful, functional plan — whether a modern desert landscape, a lush resort-style backyard, or a family-friendly outdoor space." },
      { name: "Landscaping Construction", slug: "landscaping-construction", blurb: "Our experienced team brings your design to life with professional landscape construction — hardscapes, planting areas, irrigation, and custom outdoor features built for the Arizona climate." },
      { name: "Landscaping Maintenance", slug: "landscaping-maintenance", blurb: "Ongoing maintenance that protects your investment and keeps your outdoor space looking its best year-round, with plant trimming, lawn care, and irrigation monitoring." },
    ],
    // Designer picked imgi_5 (→ p3) as the hero — the auto-pick (p1) was grainy.
    photos: [
      "/biz-photos/landscape-design-phoenix-landscaping-architect-unwind-landsc/p3.webp",
      "/biz-photos/landscape-design-phoenix-landscaping-architect-unwind-landsc/p1.webp",
      "/biz-photos/landscape-design-phoenix-landscaping-architect-unwind-landsc/p2.webp",
      "/biz-photos/landscape-design-phoenix-landscaping-architect-unwind-landsc/p4.webp",
      "/biz-photos/landscape-design-phoenix-landscaping-architect-unwind-landsc/p5.webp",
      "/biz-photos/landscape-design-phoenix-landscaping-architect-unwind-landsc/p6.webp",
      "/biz-photos/landscape-design-phoenix-landscaping-architect-unwind-landsc/p7.webp",
      "/biz-photos/landscape-design-phoenix-landscaping-architect-unwind-landsc/p8.webp",
      "/biz-photos/landscape-design-phoenix-landscaping-architect-unwind-landsc/p9.webp",
      "/biz-photos/landscape-design-phoenix-landscaping-architect-unwind-landsc/p10.webp",
      "/biz-photos/landscape-design-phoenix-landscaping-architect-unwind-landsc/p11.webp",
      "/biz-photos/landscape-design-phoenix-landscaping-architect-unwind-landsc/p12.webp",
      "/biz-photos/landscape-design-phoenix-landscaping-architect-unwind-landsc/p13.webp",
      "/biz-photos/landscape-design-phoenix-landscaping-architect-unwind-landsc/p14.webp",
      "/biz-photos/landscape-design-phoenix-landscaping-architect-unwind-landsc/p15.webp",
    ],
  },
  // The real site lists exactly three services (mariposa-az.com). Replaces the
  // generic boilerplate extract-services had pulled. Order mirrors their site.
  "redwood-landscaping-services": {
    iconChipFg: "#000000", // black leaf/heart on the green chip (was redwood-red, too heavy)
    showAllServices: true, // their real site lists 9 services — show all as cards, not the 6-card teaser
    // Services locked to the EXACT list + order on their real site nav (crawl returned
    // only 6 and reordered). Manual services replace the asset-overrides array wholesale.
    services: [
      { name: "Hardscape Installation", slug: "hardscape-installation", blurb: "Whether you're looking to add a stylish patio, a charming walkway, or a sturdy retaining wall, we have the expertise to bring your vision to life." },
      { name: "Landscape Design & Installation", slug: "landscape-design-and-installation", blurb: "Comprehensive landscape design that covers everything from the initial concept on paper to flawless installation on your property." },
      { name: "Tree Trimming & Removal", slug: "tree-trimming-and-removal", blurb: "Professional tree trimming and removal that keeps your trees healthy, safe, and looking their best." },
      { name: "Artificial Grass Installation", slug: "artificial-grass-installation", blurb: "Top-notch artificial grass for a lush, green yard all year round — without the hassle of constant maintenance." },
      { name: "Cleanup Services", slug: "cleanup-services", blurb: "Seasonal and one-time cleanups that clear debris, refresh beds, and get your yard looking its best again." },
      { name: "Outdoor Lighting", slug: "outdoor-lighting", blurb: "Enhance the beauty and safety of your property with expert outdoor lighting design and installation." },
      { name: "Outdoor BBQ Installation", slug: "outdoor-bbq-installation", blurb: "Custom built-in BBQ islands and outdoor kitchens designed for Arizona entertaining and built to last." },
      { name: "Irrigation & Sprinkler Installation", slug: "irrigation-and-sprinkler-installation", blurb: "Efficient irrigation and sprinkler systems installed and maintained to keep your landscape perfectly watered." },
      { name: "Lawn Maintenance", slug: "lawn-maintenance", blurb: "Reliable, detail-driven lawn and landscape maintenance that keeps your property healthy and sharp year-round." },
    ],
  },
  "mariposa-landscape-arizona-inc-phoenix-az": {
    services: [
      { name: "Landscape Maintenance", slug: "landscape-maintenance", blurb: "Reliable, detail-driven maintenance that keeps commercial and residential properties healthy, clean, and looking their best year-round." },
      { name: "Landscape Construction", slug: "landscape-construction", blurb: "Award-winning landscape construction that brings designs to life — built to last and crafted for Arizona's climate." },
      { name: "Tree Care", slug: "tree-care", blurb: "Expert tree care, trimming, and health management to keep your trees safe, thriving, and beautiful." },
    ],
  },
  // Services pulled by hand from the real site menu (extract-services had returned
  // generic boilerplate). Order mirrors their site nav.
  "sal-s-landscape-construction": {
    iconChipBg: "#ffad1a", // brand yellow tile behind the small feature/contact icons
    iconChipFg: "#000000", // black icon on the yellow chip (was gold-on-green)
    services: [
      { name: "Irrigation Service", slug: "irrigation-service", blurb: "Efficient irrigation installation and repair that keeps your landscape healthy while conserving water in the Arizona climate." },
      { name: "Artificial Turf Installation", slug: "artificial-turf-installation", blurb: "Premium artificial turf for a lush, low-maintenance, water-saving yard that looks great year-round." },
      { name: "Landscape Design", slug: "landscape-design", blurb: "Custom landscape design that transforms your outdoor space into a beautiful, functional environment built around how you live." },
      { name: "Commercial Landscaping", slug: "commercial-landscaping", blurb: "Professional landscape construction and maintenance for commercial properties that make a lasting first impression." },
      { name: "Pavers/Travertine Installation", slug: "pavers-travertine-installation", blurb: "Durable, elegant paver and travertine patios, walkways, and driveways built to last and elevate any outdoor space." },
    ],
  },
  // Services + nav mirror hawkeyecustomlandscaping.com exactly. First 6 = the
  // headliner cards (real site blurbs); the rest feed the scrolling marquee.
  // `serviceMenu` reproduces their mega-menu IA: Hardscapes ▸ / Softscapes ▸
  // flyouts plus the standalone items. Every menu slug exists in `services` below.
  "hawkeye-landscaping-inc": {
    services: [
      { name: "3D Landscape Design", slug: "3d-landscape-design", blurb: "Our team of experienced landscape professionals will design and build the front and back yard you've always wanted." },
      { name: "Outdoor Kitchens", slug: "outdoor-kitchens", blurb: "We have a particularly large selection of outdoor kitchens that include grills, smokers, flat tops, refrigerators, and more, with solutions for all backyards no matter the size." },
      { name: "Water Features", slug: "water-features", blurb: "Whether you want a stone waterfall for your pool or a focal piece for your backyard, our team can design and create the water feature you desire." },
      { name: "Outdoor Fire Pit", slug: "outdoor-fire-pit", blurb: "Custom firepits are popular for backyard spaces where homeowners want to entertain friends and family, serving as an amazing addition or main feature." },
      { name: "Artificial Grass", slug: "artificial-grass", blurb: "Turf or artificial grass is perfect for homeowners who want a low-maintenance yard, save water, and is also great for mini golf courses." },
      { name: "Outdoor Lighting", slug: "outdoor-lighting", blurb: "Keeping your outdoors illuminated in the evening gives your home and landscape a beautiful addition to the neighborhood, making your yard stand out at night." },
      // ── remaining services (feed the marquee + power their nav sub-menus) ──
      { name: "Travertine", slug: "travertine", blurb: "Premium travertine pavers and stonework for patios, pool decks, and walkways — timeless and built for the Arizona climate." },
      { name: "Desert Landscape", slug: "desert-landscape", blurb: "Striking low-water desert designs that pair native plantings with rock, boulders, and hardscape for year-round curb appeal." },
      { name: "Outdoor Entertainment Areas", slug: "outdoor-entertainment-areas", blurb: "Ramadas, pergolas, and built-in seating that turn your backyard into the ultimate space for hosting friends and family." },
      { name: "Outdoor BBQ", slug: "outdoor-bbq", blurb: "Built-in BBQ islands and grilling stations designed for backyard entertaining all year round." },
      { name: "Outdoor Pavers", slug: "outdoor-pavers", blurb: "Custom paver patios, driveways, and walkways that add durable, elegant hardscape to any outdoor space." },
      { name: "Plants/Trees", slug: "plants-trees", blurb: "Cacti, trees, bushes, and other desert-friendly plants hand-selected to thrive in the local climate." },
      { name: "Front Yard Landscaping", slug: "front-yard-landscaping", blurb: "Boost your curb appeal with a custom front yard designed to make your home stand out in the neighborhood." },
      { name: "Back Yard Landscaping", slug: "back-yard-landscaping", blurb: "Transform your back yard into a private retreat built around how you actually want to live and entertain outdoors." },
      { name: "Desert Landscaping", slug: "desert-landscaping", blurb: "Low-water desert landscapes that stay beautiful through the Arizona heat with minimal maintenance." },
      { name: "Irrigation System & Sprinkler Repair", slug: "irrigation", blurb: "Irrigation installation and sprinkler repair that keeps your landscape healthy while conserving water." },
      { name: "Irrigation System Replacement", slug: "irrigation-replacement", blurb: "Full irrigation system replacements that upgrade aging lines and valves for efficient, reliable watering." },
      { name: "Turf Cleaning & Turf Maintenance", slug: "turf-maintenance", blurb: "Turf cleaning and maintenance services that keep your artificial grass clean, fresh, and looking like new." },
    ],
    serviceMenu: [
      { label: "Hardscapes", children: [
        { label: "Travertine", slug: "travertine" },
        { label: "Desert Landscape", slug: "desert-landscape" },
        { label: "Outdoor Entertainment Areas", slug: "outdoor-entertainment-areas" },
        { label: "Outdoor BBQ", slug: "outdoor-bbq" },
        { label: "Outdoor Fire Pit", slug: "outdoor-fire-pit" },
        { label: "Outdoor Lighting", slug: "outdoor-lighting" },
        { label: "Outdoor Kitchens", slug: "outdoor-kitchens" },
        { label: "Outdoor Pavers", slug: "outdoor-pavers" },
      ] },
      { label: "Softscapes", children: [
        { label: "Artificial Grass", slug: "artificial-grass" },
        { label: "Plants/Trees", slug: "plants-trees" },
      ] },
      { label: "Front Yard Landscaping", slug: "front-yard-landscaping" },
      { label: "Back Yard Landscaping", slug: "back-yard-landscaping" },
      { label: "Desert Landscaping", slug: "desert-landscaping" },
      { label: "Water Features", slug: "water-features" },
      { label: "Irrigation System & Sprinkler Repair", slug: "irrigation" },
      { label: "Irrigation System Replacement", slug: "irrigation-replacement" },
      { label: "3D Landscape Design Services", slug: "3d-landscape-design" },
      { label: "Turf Cleaning & Turf Maintenance", slug: "turf-maintenance" },
    ],
    chromeDark: true, // logo is white → near-black nav + footer so it stays visible
  },
  // RENCO Roofing (ro0007). Logo is pure-white lettering → chromeDark so it reads
  // on the nav + footer. Services/colors come from process-assets (asset-overrides).
  "renco-roofing": {
    chromeDark: true, // logo is white → near-black nav + footer so it stays visible
    // Designer-picked hero = the grey-shingle rooftop shot (imgi_50 → p6). Rest of
    // gallery follows. `photos` here replaces the process-assets list (manual wins).
    photos: [
      "/biz-photos/renco-roofing/p6.webp",
      "/biz-photos/renco-roofing/p1.webp",
      "/biz-photos/renco-roofing/p2.webp",
      "/biz-photos/renco-roofing/p3.webp",
      "/biz-photos/renco-roofing/p4.webp",
      "/biz-photos/renco-roofing/p5.webp",
      "/biz-photos/renco-roofing/p7.webp",
      "/biz-photos/renco-roofing/p8.webp",
      "/biz-photos/renco-roofing/p9.webp",
      "/biz-photos/renco-roofing/p10.webp",
      "/biz-photos/renco-roofing/p11.webp",
      "/biz-photos/renco-roofing/p12.webp",
    ],
  },
  // Services + nav mirror enchantedgardenlandscape.com exactly. Their real IA is
  // Design (standalone) / Build ▸ / Maintenance ▸. First 6 services = headliner
  // cards; the rest feed the marquee. Every menu slug exists in `services` below.
  "enchanted-garden-landscape": {
    services: [
      // ── headliner cards ──
      { name: "Design", slug: "design", blurb: "Our designers work closely with you to craft a custom landscape plan that turns your outdoor vision into a beautiful, functional reality." },
      { name: "Custom Outdoor Fire Features", slug: "custom-outdoor-fire-features", blurb: "Custom fire pits, fireplaces, and fire features that become the warm, inviting centerpiece of your outdoor living space." },
      { name: "Decks and Patios", slug: "decks-and-patios", blurb: "Beautifully built decks and patios that extend your living space outdoors and set the stage for years of entertaining." },
      { name: "Landscape Lighting", slug: "landscape-lighting", blurb: "Architectural and landscape lighting that highlights your home's best features and keeps your yard stunning after dark." },
      { name: "Water Features", slug: "water-features", blurb: "Custom waterfalls, fountains, and ponds that bring movement, sound, and tranquility to your garden." },
      { name: "Masonry Design", slug: "masonry-design", blurb: "Expert stone and masonry work — seat walls, planters, walkways, and custom hardscape built to last in the Arizona climate." },
      // ── remaining services (feed the marquee + power the nav sub-menus) ──
      { name: "Planting", slug: "planting", blurb: "Thoughtful planting design with trees, shrubs, and desert-adapted greenery selected to thrive and flourish year-round." },
      { name: "Irrigation and Drainage Systems", slug: "irrigation-and-drainage-systems", blurb: "Efficient irrigation and drainage systems that keep your landscape healthy while protecting your property and conserving water." },
      { name: "Tree and Shrub Maintenance", slug: "tree-and-shrub-maintenance", blurb: "Expert pruning, trimming, and health care that keeps your trees and shrubs safe, thriving, and beautiful." },
      { name: "Firewise Landscaping Services", slug: "firewise-landscaping-services", blurb: "Firewise landscaping that reduces wildfire risk around your home with defensible-space planning and fire-resistant design." },
    ],
    serviceMenu: [
      { label: "Design", slug: "design" },
      { label: "Build", children: [
        { label: "Custom Outdoor Fire Features", slug: "custom-outdoor-fire-features" },
        { label: "Decks and Patios", slug: "decks-and-patios" },
        { label: "Landscape Lighting", slug: "landscape-lighting" },
        { label: "Irrigation and Drainage Systems", slug: "irrigation-and-drainage-systems" },
        { label: "Masonry Design", slug: "masonry-design" },
        { label: "Planting", slug: "planting" },
        { label: "Water Features", slug: "water-features" },
      ] },
      { label: "Maintenance", children: [
        { label: "Tree and Shrub Maintenance", slug: "tree-and-shrub-maintenance" },
        { label: "Firewise Landscaping Services", slug: "firewise-landscaping-services" },
      ] },
    ],
  },
  // Services + about mirror lonestaraz.com (Gemini key was down → pulled by hand).
  // Luxury design-build firm for high-end estates in North Scottsdale / Paradise Valley.
  "lone-star-landscaping": {
    fontKey: "elegant", // logo is a classic serif → Playfair headings
    services: [
      // First 6 = headliner cards, ordered to mirror lonestaraz.com/our-services EXACTLY. The rest feed the marquee.
      { name: "Artificial Turf", slug: "artificial-turf", blurb: "Lush, low-maintenance artificial turf that stays green year-round while saving water in the Arizona heat." },
      { name: "Fireplaces & Fire Pits", slug: "fireplaces-fire-pits", blurb: "Enhance your outdoor living with custom fireplaces and fire pits, designed to create warmth and gathering space." },
      { name: "Low Voltage Outdoor Lighting", slug: "outdoor-lighting", blurb: "Illuminate your outdoor spaces with low voltage lighting, offering both energy efficiency and ambiance." },
      { name: "Landscape Design", slug: "landscaping-design", blurb: "Transform your outdoor area with innovative landscape design, tailored to create a harmonious and functional space." },
      { name: "Misting Systems", slug: "misting-systems", blurb: "High-pressure misting systems that keep your patios and ramadas comfortable through the desert summer." },
      { name: "Outdoor Kitchens & Barbecues", slug: "outdoor-kitchens", blurb: "Create the ultimate outdoor entertaining space with custom kitchens and barbecues built for how you live." },
      // ── remaining services in their Our Services / menu order (feed the scrolling marquee) ──
      { name: "Outdoor Courts", slug: "outdoor-courts", blurb: "Custom sport and game courts designed and built to fit your space and how your family plays." },
      { name: "Pavers", slug: "pavers", blurb: "Enhance your landscape with durable and stylish pavers, ideal for creating elegant walkways and patios." },
      { name: "Putting Greens", slug: "putting-greens", blurb: "Custom putting greens designed for true roll and year-round play right in your own backyard." },
      { name: "Ramadas & Pergolas", slug: "ramadas-pergolas", blurb: "Custom ramadas and pergolas that add shade, structure, and a striking focal point to your outdoor living space." },
      { name: "Water Features", slug: "water-features", blurb: "Discover the serene beauty of custom water features designed to bring tranquility and elegance to your yard." },
      { name: "Natural Stone", slug: "natural-stone", blurb: "Premium natural stone for patios, walls, and accents that bring timeless texture and durability to your landscape." },
      { name: "Pickleball Courts", slug: "pickleball-courts", blurb: "Professional-grade pickleball courts built to spec for play and entertaining at home." },
      { name: "Lawn Design & Irrigation Systems", slug: "lawn-irrigation", blurb: "Smart lawn design paired with efficient irrigation that keeps your landscape healthy while conserving water." },
      { name: "Landscaping Consulting", slug: "landscaping-consulting", blurb: "Expert landscaping consulting to plan, budget, and guide your project from vision to finished design." },
    ],
    generatedCopy: {
      aboutBody: [
        "Lone Star Landscaping is a full-service design-build firm specializing in luxury landscape and hardscape projects for high-end residential properties across the Phoenix area. We serve prestigious estates throughout North Scottsdale and Paradise Valley — including communities like DC Ranch, Silverleaf, and Desert Mountain — with expertise spanning architectural hardscape and resort-style pools to bespoke water features, outdoor kitchens, and custom putting greens.",
        "We manage every project from the initial 3D design concept through final installation, paired with deep knowledge of local codes and permitting. Our team of landscape designers, pool builders, and architects works together to deliver landscapes that surpass our clients' expectations.",
      ],
    },
  },
  "diamond-cut-landscaping": {
    heroVideo: "/biz-photos/diamond-cut-landscaping/hero.mp4", // from diamondcutaz.com/services hero
  },
  "viva-landscape-and-design": {
    heroVideo: "/biz-photos/viva-landscape-and-design/hero.mp4", // from vivalandscapeanddesign.com hero
  },
  "divine-design-landscaping": {
    fontKey: "elegant",
    heroVideo: "/biz-photos/divine-design-landscaping/hero.mp4",
  },
  "core-landscape": {
    heroVideo: "/biz-photos/core-landscape/hero.mp4", // from corelandscape.com homepage bg (core-landscape-valley.mp4)
  },
  "desert-canyon-roofing-llc": {
    // Designer pinned imgi_2 (→ p1.webp) as the hero, so the photos array leads with it
    // (hero = photos[0]); the rest follow for the gallery. Pinned so it survives process-assets re-runs.
    photos: [
      "/biz-photos/desert-canyon-roofing-llc/p1.webp",
      "/biz-photos/desert-canyon-roofing-llc/p2.webp",
      "/biz-photos/desert-canyon-roofing-llc/p3.webp",
      "/biz-photos/desert-canyon-roofing-llc/p4.webp",
      "/biz-photos/desert-canyon-roofing-llc/p5.webp",
      "/biz-photos/desert-canyon-roofing-llc/p6.webp",
      "/biz-photos/desert-canyon-roofing-llc/p7.webp",
    ],
  },
  "ams-landscaping": {
    bgOverride: "#F6F4EF", // cream — their secondary (blue) read too strong as a section bg; kept as accent only
  },
  // Services re-checked against dssggogreen.com/service/ — extract-services had pulled
  // default-catalog filler blurbs; these names + blurbs are their real site wording.
  "diamond-stone-and-synthetic-grass": {
    chromeDark: true, // their logo is white → black nav + black footer so it stays visible
    services: [
      { name: "Synthetic Grass", slug: "synthetic-grass", blurb: "High-quality synthetic grass with a natural look and soft feel — ideal for backyards, play areas, pet-friendly spaces, and commercial properties." },
      { name: "Concrete Pavers", slug: "concrete-pavers", blurb: "Elegant, durable concrete pavers that enhance any outdoor space with style and strength." },
      { name: "Travertine & Porcelain Tile", slug: "travertine-porcelain-tile", blurb: "Premium travertine and porcelain tile for patios, walkways, and pool decks — timeless beauty built to last." },
      { name: "Outdoor Kitchens", slug: "outdoor-kitchens", blurb: "Custom outdoor kitchens that turn your backyard into a chef's paradise — perfect for entertaining in Arizona's weather." },
      { name: "Alumawood Pergolas", slug: "alumawood-pergolas", blurb: "Durable, low-maintenance Alumawood pergolas with the classic look of wood, the resilience of aluminum, and welcome shade." },
      { name: "Landscape Lighting", slug: "landscape-lighting", blurb: "Illuminate your outdoors with stunning landscape lighting that enhances safety, ambiance, and curb appeal." },
      // extra entries below feed the scrolling marquee (cards show the first 6)
      { name: "Putting Greens", slug: "putting-greens", blurb: "Custom putting greens for golf lovers — a fun, low-maintenance feature that adds value and play to any yard." },
      { name: "Decorative Rock", slug: "decorative-rock", blurb: "High-quality decorative rock for xeriscaping, pathways, and garden accents — low-maintenance and eco-friendly." },
      { name: "Irrigation Install & Repair", slug: "irrigation", blurb: "Professionally installed and repaired irrigation systems that keep your landscape green while conserving water." },
      { name: "Turf Cleaning", slug: "turf-cleaning", blurb: "Professional turf cleaning and subscription maintenance to keep your artificial grass clean, odor-free, and like new." },
    ],
  },
  "masterazscapes-llc": {
    chromeDark: true, // white-only logo → near-black nav + footer so it stays visible
    bgOverride: "#FBF4DE", // light yellow cream — replaces the navy-tinted (blue) section washes; navy stays an accent
    iconChipBg: "#001747", // their secondary navy — icon chips go true navy (white icon auto-derives)
    // Designer-picked hero = their real home-hero (imgi_49 → p15). Rest of gallery follows.
    photos: [
      "/biz-photos/masterazscapes-llc/p15.webp",
      "/biz-photos/masterazscapes-llc/p1.webp",
      "/biz-photos/masterazscapes-llc/p2.webp",
      "/biz-photos/masterazscapes-llc/p3.webp",
      "/biz-photos/masterazscapes-llc/p4.webp",
      "/biz-photos/masterazscapes-llc/p5.webp",
      "/biz-photos/masterazscapes-llc/p6.webp",
      "/biz-photos/masterazscapes-llc/p7.webp",
      "/biz-photos/masterazscapes-llc/p8.webp",
      "/biz-photos/masterazscapes-llc/p9.webp",
      "/biz-photos/masterazscapes-llc/p10.webp",
      "/biz-photos/masterazscapes-llc/p11.webp",
      "/biz-photos/masterazscapes-llc/p12.webp",
      "/biz-photos/masterazscapes-llc/p13.webp",
      "/biz-photos/masterazscapes-llc/p14.webp",
    ],
  },
  "phoenix-pavers-and-turf": {
    // Designer-assigned image per service card (extracted names/blurbs kept).
    services: [
      { name: "Artificial Grass Turf", slug: "artificial-grass-turf", blurb: "We install artificial grass turf for a beautiful, low-maintenance lawn.", image: "/biz-photos/phoenix-pavers-and-turf/svc-turf.webp" },
      { name: "Pavers & Travertine", slug: "pavers-and-travertine", blurb: "We specialize in the installation of pavers and travertine for patios, walkways, and driveways.", image: "/biz-photos/phoenix-pavers-and-turf/svc-pavers.webp" },
      { name: "Irrigation Systems", slug: "irrigation-systems", blurb: "We design and install efficient irrigation systems to keep your landscape healthy.", image: "/biz-photos/phoenix-pavers-and-turf/svc-irrigation.webp" },
      { name: "Landscape Design", slug: "landscape-design", blurb: "We offer comprehensive landscape design services to create your ideal outdoor living space.", image: "/biz-photos/phoenix-pavers-and-turf/svc-design.webp" },
    ],
    // Designer-curated gallery. hero = FB 259692744 (p6 was the same shot).
    // Dropped p1/p2/p3 (download shots) + p13 + duplicate p10 — their sources were
    // pulled from the inbox folder.
    photos: [
      "/biz-photos/phoenix-pavers-and-turf/hero.webp",
      "/biz-photos/phoenix-pavers-and-turf/p4.webp",
      "/biz-photos/phoenix-pavers-and-turf/p5.webp",
      "/biz-photos/phoenix-pavers-and-turf/p7.webp",
      "/biz-photos/phoenix-pavers-and-turf/p8.webp",
      "/biz-photos/phoenix-pavers-and-turf/p9.webp",
      "/biz-photos/phoenix-pavers-and-turf/p11.webp",
      "/biz-photos/phoenix-pavers-and-turf/p12.webp",
    ],
  },
  // az0044 BJ's Landscaping LLC — no logo. Nav: orange "BJ" badge + "BJ's Landscaping"
  // wordmark. Designer-picked hero = imgi_9 (1920w → p4), moved to front so it's the hero.
  "bj-s-landscaping-llc": {
    logoBadge: false, // no badge square — just the wordmark text
    logoWordmark: "BJ's Landscaping",
    // Real services from their site. Images assigned by context (mowing→grass,
    // maintenance→hedges, trimming→pole-saw, consultation→designed garden) so cards
    // don't pull off-topic shots from the auto-pick fallback (was getting the couch render).
    services: [
      { name: "Lawn Mowing", slug: "lawn-mowing", blurb: "We specialize in lawn maintenance. Our team will mow and edge the grass, blow for leaves or cuttings, and leave your yard clear of debris.", image: "/biz-photos/bj-s-landscaping-llc/p11.webp" },
      { name: "Yard Maintenance", slug: "yard-maintenance", blurb: "It takes time for the living elements of your landscape to mature. Our team will trim bushes to grow strong! We also take care of weeds in rocks and hardscapes.", image: "/biz-photos/bj-s-landscaping-llc/p2.webp" },
      { name: "Tree Trimming", slug: "tree-trimming", blurb: "We offer expert tree trimming with high quality equipment, saving you time and energy to make your trees look perfect.", image: "/biz-photos/bj-s-landscaping-llc/p8.webp" },
      { name: "Consultation Services", slug: "consultation-services", blurb: "Ready to change your landscape but unsure where to start? A consultation will let you ask questions and develop a plan.", image: "/biz-photos/bj-s-landscaping-llc/p5.webp" },
    ],
    // Gallery: hero (p4) first. Dropped p10 (water-bottle/scrabble junk) and p1
    // (indoor couch render) — neither is real landscaping work.
    photos: [
      "/biz-photos/bj-s-landscaping-llc/p4.webp",
      "/biz-photos/bj-s-landscaping-llc/p2.webp",
      "/biz-photos/bj-s-landscaping-llc/p3.webp", // Why-Us image (pick(photos,2)) — designer swap to imgi_3
      "/biz-photos/bj-s-landscaping-llc/p13.webp",
      "/biz-photos/bj-s-landscaping-llc/p5.webp",
      "/biz-photos/bj-s-landscaping-llc/p6.webp",
      "/biz-photos/bj-s-landscaping-llc/p7.webp",
      "/biz-photos/bj-s-landscaping-llc/p8.webp",
      "/biz-photos/bj-s-landscaping-llc/p9.webp",
      "/biz-photos/bj-s-landscaping-llc/p11.webp",
      "/biz-photos/bj-s-landscaping-llc/p12.webp",
      "/biz-photos/bj-s-landscaping-llc/p14.webp",
    ],
  },
  // az0047 Valley Of The Sun Landscape — no logo. Designer note: just the wordmark
  // "Valley of the Sun Landscaping" where the logo goes, no badge square.
  "valley-of-the-sun-landscape": {
    logoBadge: false, // no badge square — text-only wordmark
    logoWordmark: "Valley of the Sun Landscaping",
    // Services locked to the EXACT 6 on valleyofthesunlandscape.com/services, in
    // their order. The auto-crawl missed Junk Removal — added here. Manual services
    // replace the asset-overrides array wholesale.
    services: [
      { name: "Tree Removal & Trimming", slug: "tree-removal-and-trimming", blurb: "Safe, controlled removals and precision trimming to keep your property safe and looking its best." },
      { name: "Stump Grinding & Removal", slug: "stump-grinding-and-removal", blurb: "Clean, efficient stump grinding that restores your yard and leaves it ready for new landscaping." },
      { name: "Complete Yard Cleanups", slug: "complete-yard-cleanups", blurb: "Storm debris, overgrowth, full property refresh — cleared quickly and thoroughly." },
      { name: "Junk Removal", slug: "junk-removal", blurb: "Unwanted yard debris, old furniture, or bulky outdoor items hauled away — no heavy lifting on your end." },
      { name: "Irrigation Installation & Repair", slug: "irrigation-installation-and-repair", blurb: "Systems that keep your landscape thriving in the Arizona heat while conserving water." },
      { name: "Custom Paver Installation", slug: "custom-paver-installation", blurb: "Walkways, patios, and hardscapes built to last and designed to enhance your home." },
    ],
  },
  // az0051 Julio Tree Care & Landscaping — services locked to the EXACT 6 in their site nav
  // (Tree Trimming, Tree Removal, Stump Grinding, Emergency Storm Damage, General Landscaping,
  // Tree Pruning). The crawl had only 5 (missing Tree Pruning); manual services replace the
  // asset-overrides array wholesale, so this is the full set in their order.
  "julio-tree-care-and-landscaping": {
    services: [
      { name: "Tree Trimming", slug: "tree-trimming", blurb: "Expert trimming to shape your trees, clear hazards, and keep your canopy looking clean and well-maintained year-round." },
      { name: "Tree Removal", slug: "tree-removal", blurb: "We offer safe and efficient tree removal services, ensuring your property is free of hazardous or unwanted trees." },
      { name: "Stump Grinding", slug: "stump-grinding", blurb: "Our stump grinding services effectively remove tree stumps, leaving your landscape clean and ready for new growth." },
      { name: "Emergency Storm Damage", slug: "emergency-storm-damage", blurb: "Fast, reliable emergency response for storm damage, ensuring the safety of your property after adverse weather conditions." },
      { name: "General Landscaping", slug: "general-landscaping", blurb: "Our general landscaping services enhance the beauty of your outdoor spaces, providing customized solutions for your property." },
      { name: "Tree Pruning", slug: "tree-pruning", blurb: "Targeted pruning promotes healthy growth and improves the appearance of your trees, ensuring their long-term vitality." },
    ],
  },

  // hv0003 — Goettl Air Conditioning and Plumbing (Phoenix AZ). Logo, 9 real photos, and brand colors
  // (red #cd173f primary, navy #013763 secondary, both from swatch screenshots) wired via asset-overrides.json.
  // extract-services couldn't run (Gemini key invalid) and goettl.com is behind Cloudflare, so services are pinned
  // HERE to mirror their live service pillars EXACTLY and in order — Air Conditioning, Heating, Plumbing, Indoor Air
  // Quality, Insulation, Water Treatment (each backed by a provided real photo). No font example → default font.
  "goettl-air-conditioning-and-plumbing-phoenix-az": {
    services: [
      { name: "Air Conditioning", slug: "air-conditioning", blurb: "AC repair, installation, and our six-step Rejuuuvenation® maintenance — plus 24/7 emergency service to keep your home cool through every Phoenix summer." },
      { name: "Heating", slug: "heating", blurb: "Furnace and heat pump repair, replacement, and tune-ups to keep your home warm and your system running efficiently all winter long." },
      { name: "Plumbing", slug: "plumbing", blurb: "Full-service plumbing — re-piping, water heaters, sewer and drain service, hydro jetting, and emergency repairs done right the first time." },
      { name: "Indoor Air Quality", slug: "indoor-air-quality", blurb: "Duct cleaning, sealing, and replacement plus air purification solutions that clear out dust and allergens for healthier air at home." },
      { name: "Insulation", slug: "insulation", blurb: "Blown-in attic insulation that seals your home against the desert heat, lowers energy bills, and keeps every room comfortable." },
      { name: "Water Treatment", slug: "water-treatment", blurb: "Water purity testing, softening, and filtration solutions for cleaner, better-tasting water throughout your entire home." },
    ],
  },

  // hv0018 Comfort Experts — Mesa AC & heating contractor (azcomfortexperts.com; 1610 N Rosemont STE 113, Mesa AZ
  // 85205; (480) 351-5672; est. 2011; 4.9★/490). Shield logo wired via asset-overrides.json. Brand colors pulled from
  // the two swatches the designer dropped as "Screenshot …png" → renamed to Color.png / Second Color.png so
  // process-assets extracted them: primary navy #103c6e, secondary orange #cd791d (in asset-overrides.json). 7 real
  // photos wired there too. extract-services couldn't run (Gemini key invalid), so services are pinned HERE to mirror
  // their live site EXACTLY — their nav organizes the offering into Cooling, Heating, and Indoor Air Quality, and these
  // 12 cards are their actual service-page leaves (cooling/*, heating/*, indoor-air-quality/*), replacing the generated
  // guesses. Commercial (B2B) pages left off the residential card grid. No font example dropped → default font.
  "comfort-experts": {
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "Fast, accurate AC repair to get cool air flowing again in your Mesa home — same-day diagnosis and honest fixes." },
      { name: "AC Installation & Replacement", slug: "ac-installation", blurb: "Upgrade to a high-efficiency air conditioning system with seamless installation and replacement sized right for your home." },
      { name: "AC Maintenance & Tune-Ups", slug: "ac-maintenance", blurb: "Seasonal tune-ups that catch small problems early, lower energy bills, and extend the life of your cooling system." },
      { name: "Ductless Mini-Split AC", slug: "ductless-ac", blurb: "Flexible ductless cooling and heating for additions, garages, and rooms that never quite get comfortable." },
      { name: "Thermostat Installation", slug: "thermostat-installation", blurb: "Smart thermostat installation and setup for precise comfort control and smarter energy use throughout your home." },
      { name: "Furnace Repair", slug: "furnace-repair", blurb: "Expert furnace repair to restore safe, reliable heat fast when an Arizona cold snap catches you off guard." },
      { name: "Furnace Installation & Replacement", slug: "furnace-installation", blurb: "Energy-efficient furnace installation and replacement, professionally sized and installed for years of dependable warmth." },
      { name: "Heating Maintenance & Tune-Ups", slug: "heating-maintenance", blurb: "Keep your heating system safe and efficient with thorough seasonal maintenance and tune-ups before winter hits." },
      { name: "Heat Pump Service", slug: "heat-pumps", blurb: "Heat pump repair, maintenance, and installation for efficient year-round heating and cooling from a single system." },
      { name: "Duct Cleaning", slug: "duct-cleaning", blurb: "Professional air duct cleaning to clear dust and allergens, improving airflow and the air your family breathes." },
      { name: "Duct Sealing & Repair", slug: "duct-sealing", blurb: "Aeroseal duct sealing and repair that stops costly leaks, balances airflow, and boosts whole-home efficiency." },
      { name: "Whole-Home Air Purifiers", slug: "air-purifiers", blurb: "Whole-home air purification that filters out pollutants, allergens, and odors for healthier indoor air quality." },
    ],
  },

  // hv0075 Ufirst Heating & Cooling — Glendale AC/heating contractor (ufirstheatingandcooling.com; 7820 N 70th Ave,
  // Glendale AZ 85303; (480) 757-6234; AZ ROC 244760 / 360881; 4.9★/117; American Standard Customer Care dealer; now
  // part of the Way Cool family). Logo is a chunky bold-italic "UFIRST / HEATING AND COOLING" wordmark in their lime
  // green — shipped already-transparent → wired via asset-overrides.json. One brand swatch arrived as a "Screenshot…png"
  // → renamed Color.png so process-assets extracted brandColor #97d423 (their lime green). The heavy bold sans wordmark
  // → fontKey "bold" (Archivo), closest match. No Font Example / Second Color screenshot; 6 provided photos auto-populate
  // the gallery. Real site has no hero video → none set.
  //   SERVICES were the designer's explicit priority (new site must list the SAME services as ufirstheatingandcooling.com).
  //   extract-services couldn't run (dead Gemini key), so the lineup is pinned HERE to mirror their live site EXACTLY —
  //   the home page organizes the offering into AC & Heating (repair/install/replace, same-day diagnostics), Heat Pumps
  //   (their specialty — conversions, repair, right-sizing), and Energy Efficiency (duct sealing, insulation, energy
  //   audits), plus the Indoor Air Quality / duct-cleaning leaf from their service dropdown. Blurbs are grounded in the
  //   site's own copy (right-sizing to actual heat load, heat-pump specialist, "fighting global warming one house at a
  //   time"). showAllServices so all six render.
  "ufirst-heating-and-cooling": {
    fontKey: "bold",
    showAllServices: true,
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "When the Glendale heat takes out your AC, we diagnose fast — same-day in most cases — and repair all makes and models. Honest fixes sized to your home, not guesswork." },
      { name: "AC Installation & Replacement", slug: "ac-installation", blurb: "New high-efficiency cooling, right-sized to your home's actual heat load rather than square footage — for even comfort, lower bills, and a system built to last through Arizona summers." },
      { name: "Heating Repair & Replacement", slug: "heating", blurb: "Reliable heat for cool desert nights. We repair and replace heating systems of every make and model, restoring warmth fast and keeping it running dependably when temperatures drop." },
      { name: "Heat Pumps", slug: "heat-pumps", blurb: "UFirst is a heat pump specialist — clean electric efficiency replacing gas furnaces. Expert heat pump conversions, repair, and right-sizing for year-round comfort from a single system." },
      { name: "Energy Efficiency", slug: "energy-efficiency", blurb: "Duct sealing, insulation upgrades, and energy audits that cut your bill while you stay comfortable. Fighting global warming one house at a time — and saving you money as we do it." },
      { name: "Indoor Air Quality", slug: "air-quality", blurb: "Cleaner, healthier air inside your home. Duct cleaning and indoor air quality solutions that clear out dust and allergens for fresher air your family can breathe easier." },
    ],
  },
  // hv0076 ChillTek AC Repair (chilltekacrepairglendale.com — Glendale AZ, 5★/58 reviews; residential AND commercial AC).
  // Logo is a deep-navy minimalist mini-split AC unit with airflow lines over a heavy bold sans "CHILLTEK / AC REPAIR
  // GLENDALE" wordmark — shipped as Add-a-heading…png on a white/transparent plate → renamed logo.png so process-assets
  // knocked out the near-white background to transparent; the navy art reads cleanly on Theme 1's white nav pill (nav stays
  // default/white, no chromeDark). One brand swatch arrived as a "Screenshot…png" → renamed Color.png so process-assets
  // extracted brandColor #010080 (their deep navy). The heavy bold sans wordmark → fontKey "bold" (Archivo), closest match.
  // No Font Example / Second Color screenshot; 12 provided AC service/install/condenser photos auto-populate the gallery.
  // Real site has no hero video → none set.
  //   SERVICES were the designer's explicit priority (new site must list the SAME services as chilltekacrepairglendale.com).
  //   extract-services couldn't run (dead Gemini key), so the lineup is pinned HERE to mirror their live site EXACTLY — the
  //   four offerings their site advertises: AC Repair, AC Service & Maintenance, AC Replacement & New Installation, and
  //   Commercial Services. Blurbs are grounded in the site's own copy. showAllServices so all four render.
  "chilltek-ac-repair": {
    fontKey: "bold",
    showAllServices: true,
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "When the Glendale heat takes out your AC, our technicians arrive fast and repair all makes and models — keeping your home comfortable and your energy bills low with an honest diagnosis and a reliable fix." },
      { name: "AC Service & Maintenance", slug: "ac-maintenance", blurb: "AC units are complex machines that need regular maintenance to run efficiently. Our tune-ups keep your system operating at its best and head off costly mid-summer breakdowns before they start." },
      { name: "AC Replacement & New Installation", slug: "ac-installation", blurb: "When a major repair isn't the most cost-effective fix, we size and install energy-efficient cooling built for Arizona summers — the right system for your home, your comfort, and your budget." },
      { name: "Commercial Services", slug: "commercial", blurb: "A full range of commercial services to keep your business's air conditioning in top shape all year round — dependable cooling that keeps your space comfortable and your operation running." },
    ],
  },

  // hv0094 Hunter Brothers Heating & AC (hunterhvac.homes — Peoria AZ, 4.9★/73). The business has only ONE real image, so the
  // designer's directive is narrow: use that one photo (a tech servicing a rooftop AC unit, processed → p1.webp) as the HERO and
  // leave everything else on the existing stock. The brand swatch arrived as "Screenshot…png" → renamed Color.png, so
  // process-assets extracted brandColor #ed1125 (their signature red); no logo, no secondary swatch, no Font Example → font and
  // brandColor2 stay Theme 1 defaults. No hero video on their real site.
  //   Theme 1 renders photos[0] full-viewport as the hero, but the SAME photo pool also backs the service cards / sections via a
  //   wrapping pick(). To swap the hero while keeping the rest on the stock image, photos is pinned here as [real, stockGoogle]:
  //   the real photo leads (hero), and the original generated Google listing photo is retained so the body keeps drawing on the
  //   stock imagery already on the site. Manual array replaces the process-assets [p1] list wholesale.
  //   No logo image exists, so the nav uses the business NAME as the wordmark: logoBadge:false drops the red "HB" letter-badge
  //   and logoWordmark prints "Hunter Brothers Heating" as the brand text.
  "hunter-brothers-heating-and-ac": {
    logoBadge: false,
    logoWordmark: "Hunter Brothers Heating",
    photos: [
      "/biz-photos/hunter-brothers-heating-and-ac/p1.webp",
      "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFvU9E-_8xAW8yUBPmq18-Y-I9WcdqbaIcWdkVctr66ilGIruBsrB2M4kNGDz_Xe8nbIGUgFcNPTlvMB0GbeZ9M2w5tkbEZ3Z8hvI3_WboK_YMUYRaBL_GjIK94XgnMpoRpl2bI=w800-h500-k-no",
    ],
  },

  // pl0008–pl0011 — verified Arizona pool-service lineups with original, explicitly bound imagery.
  "aqua-harmony-pools": {
    photos: ["/biz-photos/aqua-harmony-pools/hero.webp", "/biz-photos/aqua-harmony-pools/weekly-maintenance.webp", "/biz-photos/aqua-harmony-pools/equipment-repair.webp", "/biz-photos/aqua-harmony-pools/green-to-blue.webp", "/biz-photos/aqua-harmony-pools/filter-restoration.webp"],
    services: [
      { name: "Weekly Pool Maintenance", slug: "weekly-pool-maintenance", image: "/biz-photos/aqua-harmony-pools/weekly-maintenance.webp", blurb: "Scheduled cleaning, water testing and balancing, filter care, and equipment checks keep your pool swim-ready throughout the year." },
      { name: "Pool Equipment Repairs", slug: "pool-equipment-repairs", image: "/biz-photos/aqua-harmony-pools/equipment-repair.webp", blurb: "Professional diagnosis and repair for pool pumps, filters, heaters, and other essential circulation equipment." },
      { name: "Green-to-Blue Recovery", slug: "green-to-blue", image: "/biz-photos/aqua-harmony-pools/green-to-blue.webp", blurb: "Targeted treatment and thorough cleaning restore algae-affected water to a clear, healthy, inviting pool." },
      { name: "Filter Cleaning & Pool Restoration", slug: "filter-cleaning-restoration", image: "/biz-photos/aqua-harmony-pools/filter-restoration.webp", blurb: "Detailed filter cleaning, tile care, and acid-wash restoration address buildup and refresh tired pool surfaces." },
    ],
  },
  "aaa-pool-services": {
    photos: ["/biz-photos/aaa-pool-services/hero.webp", "/biz-photos/aaa-pool-services/weekly-cleaning.webp", "/biz-photos/aaa-pool-services/equipment-install.webp", "/biz-photos/aaa-pool-services/green-cleanup.webp", "/biz-photos/aaa-pool-services/pool-inspection.webp"],
    services: [
      { name: "Weekly Full-Service Cleaning", slug: "weekly-pool-cleaning", image: "/biz-photos/aaa-pool-services/weekly-cleaning.webp", blurb: "Consistent cleaning and chemical care from certified technicians keeps Phoenix and Scottsdale pools clear and balanced." },
      { name: "Pool Repair & Equipment Installation", slug: "pool-repair-equipment", image: "/biz-photos/aaa-pool-services/equipment-install.webp", blurb: "Repairs and new equipment installations for pumps, filters, heaters, and pool systems across brands and models." },
      { name: "Green Pool Cleanup", slug: "green-pool-cleanup", image: "/biz-photos/aaa-pool-services/green-cleanup.webp", blurb: "An aggressive, carefully managed cleanup plan eliminates algae and restores neglected water to safe swimming condition." },
      { name: "Pool Inspections", slug: "pool-inspections", image: "/biz-photos/aaa-pool-services/pool-inspection.webp", blurb: "Detailed equipment and condition inspections help prospective homeowners understand a pool before they buy." },
    ],
  },
  "jstarr-pool-service-and-repair": {
    photos: ["/biz-photos/jstarr-pool-service-and-repair/hero.webp", "/biz-photos/jstarr-pool-service-and-repair/monthly-service.webp", "/biz-photos/jstarr-pool-service-and-repair/green-to-clean.webp", "/biz-photos/jstarr-pool-service-and-repair/equipment-repair.webp", "/biz-photos/jstarr-pool-service-and-repair/tile-cleaning.webp"],
    services: [
      { name: "Monthly Pool Service", slug: "monthly-pool-service", image: "/biz-photos/jstarr-pool-service-and-repair/monthly-service.webp", blurb: "Customized maintenance includes cleaning, chemical balancing, and equipment checks for dependable Arizona pool care." },
      { name: "Green to Clean", slug: "green-to-clean", image: "/biz-photos/jstarr-pool-service-and-repair/green-to-clean.webp", blurb: "Pool-recovery treatments remove algae and restore water clarity so your backyard oasis is ready to enjoy again." },
      { name: "Equipment Maintenance, Repair & Upgrades", slug: "pool-equipment", image: "/biz-photos/jstarr-pool-service-and-repair/equipment-repair.webp", blurb: "Diagnosis, maintenance, repair, and upgrades keep pumps, filters, heaters, and related equipment working reliably." },
      { name: "Calcium Removal & Tile Cleaning", slug: "calcium-tile-cleaning", image: "/biz-photos/jstarr-pool-service-and-repair/tile-cleaning.webp", blurb: "Specialized cleaning removes Arizona mineral buildup and refreshes the appearance of pool tile and waterlines." },
    ],
  },
  "swimming-pool-service-and-repair": {
    photos: ["/biz-photos/swimming-pool-service-and-repair/hero.webp", "/biz-photos/swimming-pool-service-and-repair/resurfacing-remodel.webp", "/biz-photos/swimming-pool-service-and-repair/equipment-pump.webp", "/biz-photos/swimming-pool-service-and-repair/plumbing-lighting.webp", "/biz-photos/swimming-pool-service-and-repair/heater-safety.webp"],
    services: [
      { name: "Pool Resurfacing & Remodeling", slug: "pool-resurfacing-remodeling", image: "/biz-photos/swimming-pool-service-and-repair/resurfacing-remodel.webp", blurb: "Resurfacing, tile work, and thoughtful renovations restore aging Phoenix pools and update their appearance." },
      { name: "Pool Equipment & Pump Repair", slug: "pool-equipment-pump-repair", image: "/biz-photos/swimming-pool-service-and-repair/equipment-pump.webp", blurb: "Expert repair and replacement keeps pumps, filters, and essential pool equipment circulating efficiently." },
      { name: "Pool Plumbing & Lighting", slug: "pool-plumbing-lighting", image: "/biz-photos/swimming-pool-service-and-repair/plumbing-lighting.webp", blurb: "Pool-specific plumbing repairs and lighting upgrades improve reliability, visibility, and enjoyment." },
      { name: "Pool Heaters & Safety Equipment", slug: "pool-heaters-safety", image: "/biz-photos/swimming-pool-service-and-repair/heater-safety.webp", blurb: "Heater repair plus professionally installed handrails and safety equipment make the pool more comfortable and accessible." },
    ],
  },

  // hv0010 Hobaica Services — Phoenix home-comfort company serving the Valley since 1952.
  // Official Phoenix service lineup: air conditioning, heating, plumbing, drain/sewer,
  // electrical, and water treatment. Original Arizona-specific imagery is explicitly bound.
  "hobaica-services": {
    photos: [
      "/biz-photos/hobaica-services/hero.webp",
      "/biz-photos/hobaica-services/air-conditioning.webp",
      "/biz-photos/hobaica-services/heating.webp",
      "/biz-photos/hobaica-services/plumbing.webp",
      "/biz-photos/hobaica-services/drain-sewer.webp",
      "/biz-photos/hobaica-services/electrical.webp",
      "/biz-photos/hobaica-services/water-treatment.webp",
    ],
    services: [
      { name: "Air Conditioning", slug: "air-conditioning", image: "/biz-photos/hobaica-services/air-conditioning.webp", blurb: "Emergency AC repair, preventive tune-ups, complete replacements, and ductwork services that keep Phoenix homes cool and efficient." },
      { name: "Heating Services", slug: "heating-services", image: "/biz-photos/hobaica-services/heating.webp", blurb: "Furnace repair and maintenance, heating system replacement, and heat-pump service for dependable comfort on cool desert nights." },
      { name: "Plumbing Services", slug: "plumbing-services", image: "/biz-photos/hobaica-services/plumbing.webp", blurb: "Licensed help for emergency plumbing, water heaters, and kitchen or bathroom plumbing, with same-day service available." },
      { name: "Drain & Sewer", slug: "drain-sewer", image: "/biz-photos/hobaica-services/drain-sewer.webp", blurb: "Drain cleaning, sewer-line repair, camera inspections, and hydro-jetting that diagnose problems accurately and restore proper flow." },
      { name: "Electrical Services", slug: "electrical-services", image: "/biz-photos/hobaica-services/electrical.webp", blurb: "Safe, code-compliant panel work, lighting, outlets, switches, ceiling fans, and other residential electrical solutions." },
      { name: "Water Treatment", slug: "water-treatment", image: "/biz-photos/hobaica-services/water-treatment.webp", blurb: "Water softeners, filtration, reverse osmosis, and testing designed around Phoenix hard-water conditions and your family's needs." },
    ],
    generatedCopy: {
      heroH1: "Phoenix Home Comfort, Covered Since 1952",
      heroSubhead: "Cooling, heating, plumbing, drains, electrical, and water treatment from one family-operated Phoenix team available 24/7.",
      aboutHeading: "The Most Likable People You'll Ever Meet",
      aboutBody: [
        "Hobaica Services has served Phoenix families since 1952, growing from a one-person refrigeration shop into a full home-comfort team while keeping the personal care of a family-operated business.",
        "Our licensed professionals provide straightforward recommendations and upfront pricing across air conditioning, heating, plumbing, drain and sewer, electrical, and water-treatment work.",
        "With same-day service available and 24/7 response, we are ready to protect the systems your home depends on through every Arizona season.",
      ],
      metaTitle: "Hobaica Services | Phoenix HVAC, Plumbing & Electrical",
      metaDescription: "Hobaica Services provides 24/7 AC, heating, plumbing, drain, electrical, and water-treatment service across Phoenix, AZ. Serving the Valley since 1952.",
    },
  },

  // hv0097 Bradford Heating and Cooling (bradfordheatcool.com — Surprise AZ, 4.8★/283). Same narrow directive as Hunter Brothers:
  // the designer supplied only ONE real image, so it leads as the HERO and everything else stays on the existing stock. The real
  // photo (an aerial Surprise neighborhood with cooling mist over the homes) processed → p1.webp; the brand swatch arrived as a
  // "Screenshot…png" → renamed Color.png, so process-assets extracted brandColor #1c2a6b (Bradford's signature navy). The cartoon
  // mascot logo processed cleanly to a transparent logo.webp (nav uses the image — no wordmark needed). No secondary swatch and no
  // Font Example → brandColor2 and fontKey stay Theme 1 defaults. Their real site has no background/hero video → none set.
  //   Theme 1 renders photos[0] full-viewport as the hero, but the same photo pool also backs the service cards / sections via a
  //   wrapping pick(). To swap the hero while keeping the rest on stock, photos is pinned [real, stockGoogle]: the real aerial leads
  //   (hero) and the original generated Google listing photo is retained so the body keeps drawing on the stock imagery.
  //   SERVICES were the designer's explicit priority — the new site must list the SAME services as bradfordheatcool.com/services.
  //   The generated record carried a generic AC-only AI lineup (Heating & Furnace, Heat Pumps lumped), so the lineup is pinned HERE
  //   to mirror their actual /services menu: AC Repair, HVAC Tune-Up, AC Installation, Heat Pump Repair, Heat Pump Installation,
  //   Mini-Split Installation, Garage AC, Indoor Air Quality, Emergency HVAC. (extract-services not run — Gemini key dead.)
  "bradford-heating-and-cooling": {
    photos: [
      "/biz-photos/bradford-heating-and-cooling/p1.webp",
      "https://lh3.googleusercontent.com/gps-cs-s/APNQkAH4Ckn9xt9HPdYo6E-cCMjTzHCUyF6QE6AsXbfdALssOvkT4GmJ_OCRmActb1jw62Gg3Gg2riDhQk1j2PgzcUlVmUGuG9l_STRSI4FdP1w20rBf5bbXXsPn1EIwVV6xGwGJASdn_A=w800-h500-k-no",
    ],
    services: [
      { name: "AC Repair", slug: "ac-repair", blurb: "When your AC quits in the middle of an Arizona summer, we respond fast — same-day diagnosis and repair on all major brands, with upfront quotes and a $0 service call on any approved repair." },
      { name: "HVAC Tune-Up", slug: "maintenance", blurb: "Our $59 20-point tune-up covers thermostat calibration, refrigerant check, coil cleaning, filter replacement, and a full written A–F report — catching small issues before they become expensive failures." },
      { name: "AC Installation", slug: "ac-installation", blurb: "As an authorized Trane dealer, we handle full system replacements start to finish — correct sizing, permits, and a manufacturer warranty, with 0% financing available." },
      { name: "Heat Pump Repair", slug: "heat-pump-repair", blurb: "Heat pumps take specialized knowledge, and our technicians are trained on all major brands — whether your system is stuck in heating or cooling mode, we diagnose and repair it fast." },
      { name: "Heat Pump Installation", slug: "heat-pump-installation", blurb: "We install Trane and RunTru heat pumps — one system that both cools and heats at up to 22 SEER2 efficiency, with 0% financing for 60 months on qualifying systems." },
      { name: "Mini-Split Installation", slug: "mini-split", blurb: "Ductless mini-splits are ideal for garages, room additions, casitas, and sunrooms with no existing ductwork — we install single- and multi-zone Mitsubishi and Trane systems." },
      { name: "Garage AC", slug: "garage-ac", blurb: "An unventilated Arizona garage can hit 140–160°F — we install ductless mini-splits for garages, workshops, and casitas with no ductwork required, starting at $2,500 installed." },
      { name: "Indoor Air Quality", slug: "air-quality", blurb: "Arizona dust and allergens can make indoor air worse than outside — we install whole-home air purifiers, UV germicidal lights, high-efficiency filtration, and professional duct cleaning." },
      { name: "Emergency HVAC", slug: "emergency", blurb: "AC failure at 10pm in July? We answer 24/7 with no after-hours surcharge, prioritizing emergency calls to get a technician at your door — typically within two hours." },
    ],
  },
};

const assets = assetOverrides as Record<string, BusinessOverride>;

export const overrides: Record<string, BusinessOverride> = (() => {
  const out: Record<string, BusinessOverride> = {};
  for (const slug of Array.from(new Set([...Object.keys(assets), ...Object.keys(manual)]))) {
    out[slug] = {
      ...assets[slug],
      ...manual[slug],
      generatedCopy: { ...assets[slug]?.generatedCopy, ...manual[slug]?.generatedCopy },
      address: { ...assets[slug]?.address, ...manual[slug]?.address },
    };
  }
  return out;
})();
