import { Metadata } from "next";
import { getStaticDomainConfig } from "@/lib/getStaticDomainConfig";
import { generateSchema } from "@/lib/schema";
import { ClientLayout } from "@/components/ClientLayout";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Problem } from "@/components/Problem";
import { WhyWebsite } from "@/components/WhySEO";
import { ServicesBreakdown } from "@/components/SEOServicesBreakdown";
import { ServiceComparison } from "@/components/SEOComparison";
import { Services } from "@/components/Services";
import { Industries } from "@/components/Industries";
import { Portfolio } from "@/components/Portfolio";
import { Process } from "@/components/Process";
import { Pricing } from "@/components/Pricing";
import { Testimonials } from "@/components/Testimonials";
import { CtaBanner } from "@/components/CtaBanner";
import { MobileCta } from "@/components/MobileCta";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export async function generateMetadata(): Promise<Metadata> {
  const config = getStaticDomainConfig();
  return {
    title: config.metaTitle,
    description: config.metaDescription,
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      url: `https://${config.domain}`,
      siteName: config.brandName,
      images: [
        {
          url: `https://${config.domain}/images/og-default.jpg`,
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
    alternates: {
      canonical: `https://${config.domain}`,
    },
  };
}

export default function Home() {
  const config = getStaticDomainConfig();
  const schema = generateSchema(config);

  return (
    <ClientLayout domain={config.domain} region={config.region}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Nav brandName={config.brandName} />
      <Hero
        h1={config.heroH1}
        subhead={config.heroSubhead}
        region={config.region}
      />
      <Problem slug={config.slug} />
      <MobileCta />
      <Portfolio slug={config.slug} />
      <Testimonials slug={config.slug} />
      <CtaBanner />
      <Stats />
      <WhyWebsite />
      <MobileCta />
      <ServicesBreakdown slug={config.slug} />
      <ServiceComparison slug={config.slug} />
      <Services />
      <Industries locality={config.locality} region={config.region} slug={config.slug} />
      <Process slug={config.slug} />
      <MobileCta />
      <Pricing region={config.region} slug={config.slug} />
      <FAQ locality={config.locality} region={config.region} slug={config.slug} />
      <Footer brandName={config.brandName} />
    </ClientLayout>
  );
}
