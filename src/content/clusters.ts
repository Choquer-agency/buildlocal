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
        name: "Starter",
        priceRange: "$300/mo",
        monthlyPrice: 300,
        description:
          "Get found. Your website, Google Maps presence, and SEO foundation so customers can find you the moment they search.",
        includes: [
          "Free custom website included ($3,500 value)",
          "Google Business Profile + Maps optimization",
          "Managed hosting, SSL & security",
          "On-page SEO foundation (titles, meta, schema)",
          "Local directory listings & citations",
          "1 hour of website updates per month",
          "Monthly performance snapshot",
        ],
        color: "#BCEFFF",
      },
      {
        name: "Growth",
        priceRange: "$500/mo",
        monthlyPrice: 500,
        description:
          "Get ranked. Adds an ongoing SEO engine and monthly content to climb Google's organic results and pull in steady, free leads.",
        includes: [
          "Everything in Starter",
          "+ Ongoing local SEO campaign (expanded keyword targeting)",
          "Add up to 3 service pages per month",
          "Monthly SEO content (blog post or page)",
          "Google review generation system",
          "Monthly ranking & traffic report",
          "2 hours of website updates per month",
        ],
        color: "#C4EF7A",
        featured: true,
        popular: true,
      },
      {
        name: "Pro",
        priceRange: "$750/mo",
        monthlyPrice: 750,
        description:
          "Add Google Ads + AI search. Everything in Growth plus managed paid search and AEO, so you're at the top of Google instantly — and recommended by ChatGPT — while your SEO compounds.",
        includes: [
          "Everything in Growth",
          "+ Google Ads management (ad spend separate)",
          "+ AEO / AI search optimization (ChatGPT, AI Overviews)",
          "Conversion-optimized landing pages",
          "Call & lead tracking",
          "Add up to 6 service pages per month",
          "Quarterly strategy review",
        ],
        color: "#F79C42",
      },
      {
        name: "Premium",
        priceRange: "$1,000/mo",
        monthlyPrice: 1000,
        description:
          "Add Facebook & Instagram. Everything in Pro plus managed Meta ads and retargeting to create demand and win back visitors who didn't convert.",
        includes: [
          "Everything in Pro",
          "+ Facebook & Instagram ads (ad spend separate)",
          "Retargeting to win back site visitors",
          "Ad creative production (images + video)",
          "4 content pieces per month",
          "Dedicated account manager",
          "Bi-weekly reporting & priority support",
        ],
        color: "#E8D5FF",
      },
      {
        name: "Dominate",
        priceRange: "$1,500/mo",
        monthlyPrice: 1500,
        description:
          "Own every channel. Everything in Premium, scaled — maximum coverage across SEO, Google Ads, Meta, and AI search, plus multi-location expansion.",
        includes: [
          "Everything in Premium",
          "+ Aggressive multi-channel scale (SEO + Google + Meta)",
          "Expanded AEO / AI search coverage",
          "Multi-location / multi-service expansion",
          "Landing pages + A/B testing",
          "Weekly reporting + monthly strategy call",
          "Unlimited reasonable website changes",
        ],
        color: "#FFD6E0",
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
          "No contracts and no setup fees on our marketing plans. You pay a simple monthly price that covers your website, hosting, SEO, content, and support — and you can cancel anytime. Prefer to just own your site outright? You can buy a custom website for a one-time $3,500 with no monthly commitment.",
      },
      {
        category: "website" as const,
        question: "Do I own my website?",
        answer:
          "Yes. If you buy your website outright for $3,500, it's yours to keep — full ownership of the site, domain, and content. If you get your website free as part of a monthly marketing plan, we host and manage it for you, and you always own your domain and content. Either way, you're never locked in.",
      },
    ],
    platformComparisonExtras: [],
    seoServiceOverrides: {},
  },
};
