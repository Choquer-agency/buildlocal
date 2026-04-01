import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStaticDomainConfig } from "@/lib/getStaticDomainConfig";
import { getIndustryConfig } from "@/content/industries";
import { getCityConfig, getAllCitySlugs } from "@/content/cities";
import { getAllTradeSlugs } from "@/content/trades";
import { ClientLayout } from "@/components/ClientLayout";
import { Nav } from "@/components/Nav";
import { ServiceHero } from "@/components/ServiceHero";
import { ServiceProblem } from "@/components/ServiceProblem";
import { ServiceProcess } from "@/components/ServiceProcess";
import { Portfolio } from "@/components/Portfolio";
import { Testimonials } from "@/components/Testimonials";
import { ServiceFAQ } from "@/components/ServiceFAQ";
import { CtaBanner } from "@/components/CtaBanner";
import { MobileCta } from "@/components/MobileCta";
import { Footer } from "@/components/Footer";

interface IndustryCityPageProps {
  params: { trade: string; city: string };
}

export function generateStaticParams() {
  const tradeSlugs = getAllTradeSlugs();
  const citySlugs = getAllCitySlugs();

  const params: { trade: string; city: string }[] = [];
  for (const trade of tradeSlugs) {
    for (const city of citySlugs) {
      params.push({ trade, city });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: IndustryCityPageProps): Promise<Metadata> {
  const config = getStaticDomainConfig();
  const industry = getIndustryConfig(params.trade);
  const city = getCityConfig(params.city);

  if (!industry || !city) return {};

  const title = `${industry.title} ${city.name} ${city.stateCode} | Websites for ${city.name} — BuildLocal`;
  const description = `Professional ${industry.title.toLowerCase()} for ${city.name}, ${city.state}. We build high-performance websites that get ${city.name} trades businesses more calls. Starting at $195/mo. No contracts.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://${config.domain}/industries/${industry.slug}/${city.slug}`,
      siteName: config.brandName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://${config.domain}/industries/${industry.slug}/${city.slug}`,
    },
    other: {
      "geo.region": `US-${city.stateCode}`,
      "geo.placename": city.name,
      "geo.position": `${city.latitude};${city.longitude}`,
      ICBM: `${city.latitude}, ${city.longitude}`,
    },
  };
}

export default function IndustryCityPage({ params }: IndustryCityPageProps) {
  const config = getStaticDomainConfig();
  const industry = getIndustryConfig(params.trade);
  const city = getCityConfig(params.city);

  if (!industry || !city) {
    notFound();
  }

  const cityLocality = city.name;
  const cityRegion = `${city.name}, ${city.stateCode}`;
  const slug = config.slug || "buildlocal";

  const schema = generateIndustryCitySchema(config, industry, city);

  return (
    <ClientLayout domain={config.domain} region={config.region}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Nav brandName={config.brandName} />

      {/* Hero */}
      <ServiceHero
        h1={`${industry.title} in ${city.name}, ${city.stateCode}`}
        subhead={`${city.name} has ${city.population} residents and growing. If your ${industry.title.toLowerCase().replace("website design", "").trim()} business doesn't have a professional website, you're invisible to homeowners searching online. We build websites that make ${city.name} trades businesses the first call.`}
        qualifier={`For ${city.name} ${industry.title.toLowerCase().replace("website design", "").trim()} companies that want more calls, more jobs, and a professional online presence. Starting at $195/month.`}
        region={cityRegion}
        eyebrow={`${industry.eyebrow} · ${city.name}`}
      />

      {/* Quick Stats */}
      <section className="bg-dark text-white">
        <div className="section-space-small">
          <div className="u-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="font-sans font-medium text-fluid-h3 text-brand">{city.population}</p>
                <p className="font-sans text-fluid-small opacity-60">Population</p>
              </div>
              <div>
                <p className="font-sans font-medium text-fluid-h3 text-brand">97%</p>
                <p className="font-sans text-fluid-small opacity-60">Search online before hiring</p>
              </div>
              <div>
                <p className="font-sans font-medium text-fluid-h3 text-brand">$195</p>
                <p className="font-sans text-fluid-small opacity-60">Per month, no contracts</p>
              </div>
              <div>
                <p className="font-sans font-medium text-fluid-h3 text-brand">175+</p>
                <p className="font-sans text-fluid-small opacity-60">Websites built</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <ServiceProblem
        painPoints={industry.painPoints(cityLocality, city.state, slug)}
        eyebrow={`The Problem in ${city.name}`}
        heading={`Why ${city.name} ${industry.title.toLowerCase().replace("website design", "").trim()} companies need a professional website.`}
      />

      <MobileCta />

      {/* Local Market Context */}
      <section style={{ backgroundColor: "#FFF9F0" }}>
        <div className="section-space-main">
          <div className="u-container max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-wider text-brand mb-6">
              {city.name} Market
            </p>
            <h2 className="font-sans font-medium text-fluid-h3 leading-[1.15] text-dark mb-6">
              The {city.name} market for {industry.title.toLowerCase().replace("website design", "").trim()} businesses
            </h2>
            <div className="space-y-4 font-sans text-fluid-main text-dark opacity-70 leading-relaxed">
              <p>{city.marketContext}</p>
              <p>{city.housingNote}</p>
              <p>{city.growthNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <ServiceProcess
        steps={industry.processSteps}
        heading={`How we build your ${city.name} website in four steps.`}
      />

      <Portfolio slug={config.slug} />
      <Testimonials slug={config.slug} />

      <MobileCta />

      {/* Nearby Cities */}
      <section style={{ backgroundColor: "white" }}>
        <div className="section-space-main">
          <div className="u-container">
            <h2 className="font-sans font-medium text-fluid-h3 leading-[1.15] text-dark mb-8">
              {industry.title} near {city.name}
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
                    href={`/industries/${industry.slug}/${areaSlug}`}
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

      {/* Breadcrumb Nav */}
      <nav className="bg-white border-t border-dark/5">
        <div className="u-container py-4">
          <ol className="flex items-center gap-2 font-mono text-xs text-dark opacity-40">
            <li><Link href="/" className="hover:text-brand transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link href={`/industries/${industry.slug}`} className="hover:text-brand transition-colors">{industry.title}</Link></li>
            <li>/</li>
            <li className="opacity-60">{city.name}</li>
          </ol>
        </div>
      </nav>

      {/* FAQ */}
      <ServiceFAQ
        faqs={industry.faqs(cityLocality, city.state, slug)}
        serviceTitle={`${industry.title} in ${city.name}`}
      />

      <CtaBanner />
      <Footer brandName={config.brandName} />
    </ClientLayout>
  );
}

/* ─── Schema Generator ─── */

import { DomainConfig } from "@/content/config";
import { IndustryPageConfig } from "@/content/industries";
import { CityConfig } from "@/content/cities";

function generateIndustryCitySchema(
  config: DomainConfig,
  industry: IndustryPageConfig,
  city: CityConfig
) {
  const domain = `https://${config.domain}`;
  const pageUrl = `${domain}/industries/${industry.slug}/${city.slug}`;
  const cityFaqs = industry.faqs(city.name, city.state, config.slug || "buildlocal");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": `${pageUrl}/#business`,
        name: `${config.brandName} — ${city.name}`,
        description: `Professional ${industry.title.toLowerCase()} for businesses in ${city.name}, ${city.stateCode}.`,
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
        "@type": "Service",
        "@id": `${pageUrl}/#service`,
        name: `${industry.title} in ${city.name}`,
        description: `We design, build, and manage professional websites for ${industry.title.toLowerCase().replace("website design", "").trim()} businesses in ${city.name}, ${city.stateCode}.`,
        provider: { "@id": `${pageUrl}/#business` },
        areaServed: {
          "@type": "City",
          name: city.name,
        },
        serviceType: industry.title,
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: `${industry.title} ${city.name} ${city.stateCode}`,
        description: `Professional ${industry.title.toLowerCase()} for ${city.name} businesses.`,
        isPartOf: { "@id": `${domain}/#website` },
        about: { "@id": `${pageUrl}/#service` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".service-hero h1", ".service-hero p", "#faq"],
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}/#faq`,
        mainEntity: cityFaqs.map((faq) => ({
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
            name: industry.title,
            item: `${domain}/industries/${industry.slug}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: city.name,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
