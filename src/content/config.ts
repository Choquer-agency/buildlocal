export interface DomainConfig {
  slug: string;
  domain: string;
  region: string;
  regionAdjective: string;
  country: "US";

  // Domain type
  domainType: "agency";
  targetIndustry?: string;

  // Branding
  brandName: string;

  // SEO
  metaTitle: string;
  metaDescription: string;
  ogImage?: string;

  // Copy
  heroH1: string;
  heroSubhead: string;

  // Location details
  locality: string;
  stateCode: string;
  nearbyAreas: string;

  // Schema.org
  schemaAddress?: {
    locality: string;
    region: string;
    country: string;
  };

  // Contact
  telephone?: string;
  email?: string;

  // Geo
  geoCoordinates?: {
    latitude: number;
    longitude: number;
  };

  geoRegionCode?: string;

  // Google Tag Manager
  gtmId?: string;

  // Optional per-region accent override
  accentColor?: string;

  // Market cluster for differentiated content
  cluster?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "service" | "pricing" | "process" | "billing" | "website" | "general";
}

export interface AgencyService {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
}

export interface ComparisonRow {
  feature: string;
  buildLocal: string | boolean;
  diyBuilder: string | boolean;
  freelancer: string | boolean;
}

export interface IndustryItem {
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface PricingTier {
  name: string;
  priceRange: string;
  monthlyPrice: number;
  description: string;
  includes: string[];
  color: string;
  featured?: boolean;
  popular?: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  avatar?: string;
  featured?: boolean;
}

export interface PortfolioProject {
  name: string;
  category: string;
  image: string;
  url?: string;
  description?: string;
  caseStudy?: {
    challenge: string;
    approach: string;
    result: string;
  };
}

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export const defaultConfig: DomainConfig = {
  slug: "buildlocal",
  domain: "buildlocal.agency",
  region: "Arizona",
  regionAdjective: "Arizona-based",
  country: "US",
  domainType: "agency",
  brandName: "BuildLocal",
  metaTitle: "BuildLocal | Websites & Local Marketing for Trades & Small Businesses",
  metaDescription:
    "We build trades and small businesses a website that gets found — buy outright for $3,500 or get it free with a marketing plan from $300/mo. SEO, content & local search. 175+ websites built.",
  locality: "Phoenix",
  stateCode: "AZ",
  nearbyAreas: "Phoenix, Scottsdale, Mesa, Tempe, Chandler, Gilbert, and cities across Arizona",
  heroH1: "A brand new website built to get you more customers.",
  heroSubhead:
    "We design and build your custom website — buy it outright for $3,500, or get it free with a monthly marketing plan that drives leads through SEO, content, and local search. Built for trades and small businesses.",
  schemaAddress: {
    locality: "Phoenix",
    region: "AZ",
    country: "US",
  },
  // telephone removed
  email: "hello@buildlocal.agency",
  geoCoordinates: {
    latitude: 33.4484,
    longitude: -112.074,
  },
  geoRegionCode: "US-AZ",
  gtmId: "GTM-N33FLLHL",
};
