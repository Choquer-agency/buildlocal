/* eslint-disable @typescript-eslint/no-unused-vars */
/* ─── Market Cluster System ───
 * Defines the market cluster for BuildLocal.
 * Contains pain points, industries, process steps,
 * pricing, and FAQ additions.
 */

export type MarketClusterId = "productized-agency";

export interface CurrencyConfig {
  code: string;
  symbol: string;
  locale: string;
  exchangeRate: number;
}

export interface ClusterPainPoint {
  title: string;
  description: string;
}

export interface ClusterProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ClusterPricingTier {
  name: string;
  priceRange: string;
  monthlyPrice: number;
  description: string;
  includes: string[];
  color: string;
  featured?: boolean;
  popular?: boolean;
}

export interface ClusterIndustry {
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface ClusterFAQ {
  category: "service" | "pricing" | "process" | "billing" | "website" | "general";
  question: string;
  answer: string;
}

export interface ClusterComparisonExtra {
  feature: string;
  buildLocal: string | boolean;
  diyBuilder: string | boolean;
  freelancer: string | boolean;
}

export interface MarketCluster {
  id: MarketClusterId;
  defaultCurrency: CurrencyConfig;
  painPoints: ClusterPainPoint[];
  processSteps: ClusterProcessStep[];
  pricingTiers: ClusterPricingTier[];
  industries: (locality: string, region: string) => ClusterIndustry[];
  faqAdditions: (locality: string, region: string) => ClusterFAQ[];
  platformComparisonExtras: ClusterComparisonExtra[];
  seoServiceOverrides: Record<string, string>;
}

/* ─── Slug → Cluster Mapping ─── */

export const slugToCluster: Record<string, MarketClusterId> = {
  buildlocal: "productized-agency",
};

export function getClusterId(slug: string): MarketClusterId {
  return slugToCluster[slug] || "productized-agency";
}

export function getCluster(slug: string): MarketCluster {
  const id = getClusterId(slug);
  return clusterDefinitions[id];
}

/* ─── Currency Config ─── */

const currencies: Record<string, CurrencyConfig> = {
  USD: { code: "USD", symbol: "$", locale: "en-US", exchangeRate: 1 },
};

export function getCurrency(_slug: string): CurrencyConfig {
  return currencies.USD;
}

/* ─── Cluster Definitions ─── */

export const clusterDefinitions: Record<MarketClusterId, MarketCluster> = {
  /* ════════════════════════════════════════════════════
   * PRODUCTIZED-AGENCY — BuildLocal
   * ════════════════════════════════════════════════════ */
  "productized-agency": {
    id: "productized-agency",
    defaultCurrency: currencies.USD,
    painPoints: [
      {
        title: "You don't have a website",
        description:
          "40% of small businesses still don't have a website. If you're one of them, you're invisible to every potential customer searching online for the services you offer.",
      },
      {
        title: "Your website looks outdated",
        description:
          "That DIY site you built in 2018 is losing you trust and customers. Visitors judge your business in seconds, and an outdated website tells them to look elsewhere.",
      },
      {
        title: "You paid too much for something that doesn't work",
        description:
          "You spent $5K–$15K on a one-time website build that nobody maintains. It's slow, broken on mobile, and hasn't been updated in years — and the agency that built it moved on.",
      },
      {
        title: "You can't update your own site",
        description:
          "You're locked into a developer who charges $150/hour for small changes, or stuck with a complex CMS you never learned. Every tweak becomes a project.",
      },
      {
        title: "Your website doesn't generate leads",
        description:
          "No SEO, no traffic, no calls. Your website exists but does nothing for your business. It's a digital brochure collecting dust instead of a tool that brings in customers.",
      },
    ],
    processSteps: [
      {
        step: 1,
        title: "Pick Your Plan",
        description:
          "Choose the tier that fits your business. No setup fees, no contracts — just a simple monthly price that covers everything.",
      },
      {
        step: 2,
        title: "We Build Your Site",
        description:
          "Our team builds your custom website in days, not months. We handle design, content, and development so you can focus on running your business.",
      },
      {
        step: 3,
        title: "Review & Go Live",
        description:
          "You review your site, request any changes, and we go live within the week. Fast, simple, and stress-free.",
      },
      {
        step: 4,
        title: "We Manage Everything",
        description:
          "Hosting, updates, SEO, and support are all included. You never have to worry about your website again — we keep it fast, secure, and working for you.",
      },
    ],
    pricingTiers: [
      {
        name: "Professional",
        priceRange: "$195/mo",
        monthlyPrice: 195,
        description:
          "A multi-page website that showcases your services and builds credibility with customers.",
        includes: [
          "Multi-page website (Home, About, Services, Contact)",
          "Up to 4 individual service pages",
          "Google review integration",
          "Photo gallery or project showcase",
          "Mobile-responsive design",
          "Hosting & SSL included",
          "Basic SEO (meta titles, descriptions)",
          "Contact form + click-to-call",
          "45 minutes of changes per month",
        ],
        color: "#C4EF7A",
      },
      {
        name: "Growth",
        priceRange: "$295/mo",
        monthlyPrice: 295,
        description:
          "A full website built to generate leads — with SEO-ready structure, service area pages, and a monthly blog post to keep you ranking.",
        includes: [
          "Full website (Home, About, Services, Areas, Reviews, Contact)",
          "Up to 8 service pages + 3 service area pages",
          "Google review showcase",
          "StoryBrand-structured homepage",
          "1 SEO-optimized blog post per month",
          "Blog-ready structure",
          "1 hour of changes per month",
          "Priority support",
        ],
        color: "#F79C42",
        featured: true,
        popular: true,
      },
      {
        name: "Scale",
        priceRange: "$595/mo",
        monthlyPrice: 595,
        description:
          "The full package — up to 15 pages, ongoing SEO, 3 monthly blog posts, and everything you need to dominate your market online.",
        includes: [
          "Up to 15 pages (service, area, landing pages)",
          "3 SEO-optimized blog posts per month",
          "Google Business Profile optimization",
          "Local SEO (citations, NAP consistency)",
          "Quarterly performance review",
          "Monthly analytics report",
          "2 hours of changes per month",
          "Dedicated account manager",
        ],
        color: "#E8D5FF",
      },
    ],
    industries: (locality: string, region: string) => [
      {
        name: "Trades & Home Services",
        icon: "Wrench",
        description: `Websites for plumbers, electricians, HVAC techs, roofers, and contractors in ${locality} and ${region}.`,
        color: "#C4EF7A",
      },
      {
        name: "Local Service Businesses",
        icon: "Car",
        description: `Websites for auto shops, cleaning companies, landscapers, and mobile services across ${region}.`,
        color: "#BCEFFF",
      },
      {
        name: "Small Retail & Lifestyle",
        icon: "Scissors",
        description: `Websites for salons, barbershops, boutiques, and lifestyle businesses in ${locality}.`,
        color: "#FFD6E0",
      },
      {
        name: "Professional Services",
        icon: "Briefcase",
        description: `Websites for accountants, consultants, coaches, and professional firms in ${locality}.`,
        color: "#E8D5FF",
      },
      {
        name: "Restaurants & Hospitality",
        icon: "UtensilsCrossed",
        description: `Websites for restaurants, cafes, caterers, and hospitality businesses in ${region}.`,
        color: "#F79C42",
      },
      {
        name: "Health & Wellness",
        icon: "Heart",
        description: `Websites for chiropractors, therapists, fitness studios, and wellness practices in ${region}.`,
        color: "#D4F5D4",
      },
    ],
    faqAdditions: (locality: string, region: string) => [
      {
        category: "billing" as const,
        question: "Is there a contract or setup fee?",
        answer:
          "No contracts and no setup fees. You pay a simple monthly price that covers your website, hosting, updates, and support. You can cancel anytime — no penalties, no hassle.",
      },
      {
        category: "website" as const,
        question: "Do I own my website?",
        answer:
          "You own your domain name and all of your content. We host and manage the site for you as part of your monthly plan. If you ever cancel, we'll help you transition your domain and provide your content so you're never locked in.",
      },
    ],
    platformComparisonExtras: [],
    seoServiceOverrides: {},
  },
};
