import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStaticDomainConfig } from "@/lib/getStaticDomainConfig";
import { getCityConfig, getAllCitySlugs } from "@/content/cities";
import { getAllTrades } from "@/content/trades";
import { DomainConfig } from "@/content/config";
import { CityConfig } from "@/content/cities";
import { ClientLayout } from "@/components/ClientLayout";
import { Nav } from "@/components/Nav";
import { Testimonials } from "@/components/Testimonials";
import { ServiceFAQ } from "@/components/ServiceFAQ";
import { CtaBanner } from "@/components/CtaBanner";
import { MobileCta } from "@/components/MobileCta";
import { Footer } from "@/components/Footer";

interface CityPageProps {
  params: { city: string };
}

export function generateStaticParams() {
  return getAllCitySlugs().map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const config = getStaticDomainConfig();
  const city = getCityConfig(params.city);

  if (!city) return {};

  const title = `Web Design ${city.name} ${city.stateCode} | Websites for ${city.name} Businesses — BuildLocal`;
  const description = `Professional website design for small businesses and trades companies in ${city.name}, ${city.state}. Managed websites from $195/month. No setup fees, no contracts. 175+ websites built.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://${config.domain}/locations/${city.slug}`,
      siteName: config.brandName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://${config.domain}/locations/${city.slug}`,
    },
    other: {
      "geo.region": `US-${city.stateCode}`,
      "geo.placename": city.name,
      "geo.position": `${city.latitude};${city.longitude}`,
      ICBM: `${city.latitude}, ${city.longitude}`,
    },
  };
}

export default function CityPage({ params }: CityPageProps) {
  const config = getStaticDomainConfig();
  const city = getCityConfig(params.city);

  if (!city) {
    notFound();
  }

  const trades = getAllTrades();
  const schema = generateCitySchema(config, city);
  const cityFaqs = getCityFaqs(city);

  return (
    <ClientLayout domain={config.domain} region={config.region}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Nav brandName={config.brandName} />

      {/* Hero */}
      <section style={{ backgroundColor: "#FFF9F0" }}>
        <div className="section-space-hero">
          <div className="u-container">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="font-mono text-xs uppercase tracking-wider text-brand">
                {city.name}, {city.stateCode}
              </span>
            </div>
            <h1 className="font-sans font-medium text-fluid-h1 leading-[1.1] tracking-tight text-dark max-w-[22ch] mb-6">
              Website Design for {city.name} Businesses
            </h1>
            <p className="font-sans text-fluid-large text-dark opacity-60 leading-relaxed max-w-[52ch] mb-8">
              {city.name} is home to {city.population} residents and thousands of small businesses.
              We build professional, managed websites that help {city.name} trades companies and
              local businesses get found online and generate more leads.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={`tel:${config.telephone}`}
                className="inline-flex items-center gap-3 bg-dark text-white rounded-sm px-8 py-4 font-sans font-medium text-fluid-main transition-all hover:opacity-90"
              >
                Call (778) 237-4700
              </a>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-3 bg-brand text-dark rounded-sm px-8 py-4 font-sans font-medium text-fluid-main transition-all hover:brightness-110"
              >
                See Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* City Stats */}
      <section className="bg-dark text-white">
        <div className="section-space-small">
          <div className="u-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="font-sans font-medium text-fluid-h3 text-brand">{city.population}</p>
                <p className="font-sans text-fluid-small opacity-60">Population</p>
              </div>
              <div>
                <p className="font-sans font-medium text-fluid-h3 text-brand">15</p>
                <p className="font-sans text-fluid-small opacity-60">Industries we serve</p>
              </div>
              <div>
                <p className="font-sans font-medium text-fluid-h3 text-brand">$195</p>
                <p className="font-sans text-fluid-small opacity-60">Per month starting</p>
              </div>
              <div>
                <p className="font-sans font-medium text-fluid-h3 text-brand">175+</p>
                <p className="font-sans text-fluid-small opacity-60">Websites built</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Context */}
      <section style={{ backgroundColor: "white" }}>
        <div className="section-space-main">
          <div className="u-container max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-wider text-brand mb-6">
              About {city.name}
            </p>
            <h2 className="font-sans font-medium text-fluid-h3 leading-[1.15] text-dark mb-6">
              Why {city.name} businesses need a professional website
            </h2>
            <div className="space-y-4 font-sans text-fluid-main text-dark opacity-70 leading-relaxed">
              <p>{city.marketContext}</p>
              <p>{city.housingNote}</p>
              <p>{city.growthNote}</p>
              <p>
                97% of consumers search online before hiring a local business (BrightLocal). If your
                {city.name} company doesn&apos;t have a professional website, you&apos;re invisible
                to the majority of potential customers in your area.
              </p>
            </div>
          </div>
        </div>
      </section>

      <MobileCta />

      {/* Industries Grid */}
      <section style={{ backgroundColor: "#FFF9F0" }}>
        <div className="section-space-main">
          <div className="u-container">
            <h2 className="font-sans font-medium text-fluid-h3 leading-[1.15] text-dark mb-4">
              Website design for {city.name} trades & businesses
            </h2>
            <p className="font-sans text-fluid-main text-dark opacity-50 leading-relaxed max-w-[52ch] mb-12">
              We build websites for every type of trades and service business in {city.name}.
              Click your industry to see how we can help.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {trades.map((trade) => (
                <Link
                  key={trade.slug}
                  href={`/industries/${trade.slug}/${city.slug}`}
                  className="group flex items-center gap-4 p-5 rounded-xl border border-dark/8 bg-white hover:border-brand transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: trade.color }}
                  >
                    <span className="text-dark text-sm font-medium">
                      {trade.title.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-sans font-medium text-dark group-hover:text-brand transition-colors">
                      {trade.title}
                    </p>
                    <p className="font-sans text-xs text-dark opacity-40">
                      {city.name}, {city.stateCode}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Cities */}
      <section style={{ backgroundColor: "white" }}>
        <div className="section-space-main">
          <div className="u-container">
            <h2 className="font-sans font-medium text-fluid-h3 leading-[1.15] text-dark mb-8">
              We also serve businesses near {city.name}
            </h2>
            <div className="flex flex-wrap gap-3">
              {city.nearbyAreas.split(", ").map((area) => {
                const areaSlug = area
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9-]/g, "");
                return (
                  <Link
                    key={area}
                    href={`/locations/${areaSlug}`}
                    className="inline-flex items-center px-4 py-2 rounded-full border border-dark/10 font-sans text-fluid-small text-dark hover:border-brand hover:text-brand transition-colors"
                  >
                    {area}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Testimonials slug={config.slug} />

      {/* Breadcrumb */}
      <nav className="bg-white border-t border-dark/5">
        <div className="u-container py-4">
          <ol className="flex items-center gap-2 font-mono text-xs text-dark opacity-40">
            <li><Link href="/" className="hover:text-brand transition-colors">Home</Link></li>
            <li>/</li>
            <li className="opacity-60">{city.name}</li>
          </ol>
        </div>
      </nav>

      <MobileCta />

      <ServiceFAQ
        faqs={cityFaqs}
        serviceTitle={`Web Design in ${city.name}`}
      />

      <CtaBanner />
      <Footer brandName={config.brandName} />
    </ClientLayout>
  );
}

/* ─── City FAQs ─── */

import { FAQItem } from "@/content/config";

function getCityFaqs(city: CityConfig): FAQItem[] {
  return [
    {
      category: "service",
      question: `Do you build websites for businesses in ${city.name}?`,
      answer: `Yes! We build and manage professional websites for trades businesses and small companies throughout ${city.name} and the surrounding ${city.nearbyAreas} area. Whether you're a roofer, plumber, HVAC company, or any other local business — we've got you covered.`,
    },
    {
      category: "pricing",
      question: `How much does a website cost for a ${city.name} business?`,
      answer: `Our managed website plans start at $195/month with no setup fees and no contracts. That includes custom design, hosting, SSL, SEO fundamentals, and ongoing updates. Most ${city.name} trades businesses choose our Growth plan at $295/month for additional pages and features.`,
    },
    {
      category: "process",
      question: `How long does it take to build a website for my ${city.name} business?`,
      answer: `Most websites are designed, built, and live within 2-3 weeks. We move fast because we know you need leads coming in — not a months-long design process. You'll review and approve everything before we launch.`,
    },
    {
      category: "website",
      question: `Will my website help me rank on Google in ${city.name}?`,
      answer: `Every site we build includes local SEO fundamentals — ${city.name}-specific content, proper title tags, meta descriptions, mobile optimization, and fast load times. These are the building blocks that help you show up when ${city.name} homeowners search for your services.`,
    },
    {
      category: "general",
      question: `What makes BuildLocal different from other ${city.name} web designers?`,
      answer: `We specialize in trades and local businesses — not everyone. We've built 175+ websites and understand what makes a roofer's site convert differently from a plumber's. Plus, we manage everything month-to-month. No contracts, no surprise fees, cancel anytime.`,
    },
    {
      category: "billing",
      question: "What if I want to cancel?",
      answer: "Cancel anytime — no penalties, no long-term contracts. We keep customers by doing great work, not by locking you in. If you leave, we'll help you transition smoothly.",
    },
  ];
}

/* ─── Schema Generator ─── */

function generateCitySchema(config: DomainConfig, city: CityConfig) {
  const domain = `https://${config.domain}`;
  const pageUrl = `${domain}/locations/${city.slug}`;
  const trades = getAllTrades();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": `${pageUrl}/#business`,
        name: `${config.brandName} — ${city.name}`,
        description: `Professional website design for trades businesses and small companies in ${city.name}, ${city.stateCode}.`,
        url: pageUrl,
        ...(config.telephone && { telephone: config.telephone }),
        ...(config.email && { email: config.email }),
        areaServed: {
          "@type": "City",
          name: city.name,
          containedInPlace: {
            "@type": "State",
            name: city.state,
          },
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: city.latitude,
          longitude: city.longitude,
        },
        priceRange: "$195 - $595/mo",
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}/#industries`,
        name: `Website Design Services in ${city.name}`,
        numberOfItems: trades.length,
        itemListElement: trades.map((trade, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: `${trade.title} in ${city.name}`,
          url: `${domain}/industries/${trade.slug}/${city.slug}`,
        })),
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: `Web Design ${city.name} ${city.stateCode}`,
        description: `Professional website design for businesses in ${city.name}, ${city.state}.`,
        isPartOf: { "@id": `${domain}/#website` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", ".section-space-hero p"],
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}/#faq`,
        mainEntity: getCityFaqs(city).map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: domain,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: city.name,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
