import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStaticDomainConfig } from "@/lib/getStaticDomainConfig";
import { getServiceConfig, getAllServiceSlugs } from "@/content/services";
import { generateServiceSchema } from "@/lib/schema-service";
import { ClientLayout } from "@/components/ClientLayout";
import { Nav } from "@/components/Nav";
import { ServiceHero } from "@/components/ServiceHero";
import { ServiceProblem } from "@/components/ServiceProblem";
import { ServiceComparison } from "@/components/SEOComparison";
import { ServiceProcess } from "@/components/ServiceProcess";
import { Portfolio } from "@/components/Portfolio";
import { Testimonials } from "@/components/Testimonials";
import { ServiceFAQ } from "@/components/ServiceFAQ";
import { CtaBanner } from "@/components/CtaBanner";
import { MobileCta } from "@/components/MobileCta";
import { Footer } from "@/components/Footer";

interface ServicePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const config = getStaticDomainConfig();
  const service = getServiceConfig(params.slug);

  if (!service) return {};

  const title = service.metaTitle(config.locality, config.region);
  const description = service.metaDescription(config.locality, config.region);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://${config.domain}/services/${service.slug}`,
      siteName: config.brandName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://${config.domain}/services/${service.slug}`,
    },
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const config = getStaticDomainConfig();
  const service = getServiceConfig(params.slug);

  if (!service) {
    notFound();
  }

  const schema = generateServiceSchema(config, service);

  return (
    <ClientLayout domain={config.domain} region={config.region}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Nav brandName={config.brandName} />
      <ServiceHero
        h1={service.heroH1(config.locality, config.region)}
        subhead={service.heroSubhead(config.locality, config.region)}
        qualifier={service.heroQualifier(config.locality, config.region)}
        region={config.region}
        eyebrow={service.eyebrow}
      />
      <ServiceProblem
        painPoints={service.painPoints}
        eyebrow={service.problemEyebrow}
        heading={service.problemHeading}
      />
      <MobileCta />
      {service.showComparison && <ServiceComparison slug={config.slug} />}
      <ServiceProcess steps={service.processSteps} heading={service.processHeading} />
      {service.showPortfolio && <Portfolio slug={config.slug} />}
      <Testimonials slug={config.slug} />
      <MobileCta />
      <ServiceFAQ
        faqs={service.faqs(config.locality, config.region)}
        serviceTitle={service.title}
      />
      <CtaBanner />
      <Footer brandName={config.brandName} />
    </ClientLayout>
  );
}
