import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStaticDomainConfig } from "@/lib/getStaticDomainConfig";
import { getIndustryConfig, getAllIndustrySlugs } from "@/content/industries";
import { generateIndustrySchema } from "@/lib/schema-industry";
import { ClientLayout } from "@/components/ClientLayout";
import { Nav } from "@/components/Nav";
import { ServiceHero } from "@/components/ServiceHero";
import { ServiceProblem } from "@/components/ServiceProblem";
import { IndustryWhySEO } from "@/components/IndustryWhySEO";
import { ServiceProcess } from "@/components/ServiceProcess";
import { Portfolio } from "@/components/Portfolio";
import { Testimonials } from "@/components/Testimonials";
import { ServiceFAQ } from "@/components/ServiceFAQ";
import { CtaBanner } from "@/components/CtaBanner";
import { MobileCta } from "@/components/MobileCta";
import { Footer } from "@/components/Footer";

interface IndustryPageProps {
  params: { trade: string };
}

export function generateStaticParams() {
  return getAllIndustrySlugs().map((trade) => ({ trade }));
}

export async function generateMetadata({
  params,
}: IndustryPageProps): Promise<Metadata> {
  const config = getStaticDomainConfig();
  const industry = getIndustryConfig(params.trade);

  if (!industry) return {};

  const title = industry.metaTitle(config.locality, config.region);
  const description = industry.metaDescription(config.locality, config.region);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://${config.domain}/industries/${industry.slug}`,
      siteName: config.brandName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://${config.domain}/industries/${industry.slug}`,
    },
  };
}

export default function IndustryPage({ params }: IndustryPageProps) {
  const config = getStaticDomainConfig();
  const industry = getIndustryConfig(params.trade);

  if (!industry) {
    notFound();
  }

  const schema = generateIndustrySchema(config, industry);
  const slug = config.slug || "buildlocal";

  return (
    <ClientLayout domain={config.domain} region={config.region}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Nav brandName={config.brandName} />
      <ServiceHero
        h1={industry.heroH1(config.locality, config.region)}
        subhead={industry.heroSubhead(config.locality, config.region)}
        qualifier={industry.heroQualifier(config.locality, config.region)}
        region={config.region}
        eyebrow={industry.eyebrow}
      />
      <ServiceProblem
        painPoints={industry.painPoints(config.locality, config.region, slug)}
        eyebrow="The Problem"
        heading={`Why ${industry.title.toLowerCase()} businesses need a professional website.`}
      />
      <MobileCta />
      <IndustryWhySEO
        items={industry.whySEO(config.locality, config.region, slug)}
        industryTitle={industry.title}
        color={industry.color}
      />
      <ServiceProcess
        steps={industry.processSteps}
        heading={`From strategy to launch in four steps.`}
      />
      <Portfolio slug={config.slug} />
      <Testimonials slug={config.slug} />
      <MobileCta />
      <ServiceFAQ
        faqs={industry.faqs(config.locality, config.region, slug)}
        serviceTitle={industry.title}
      />
      <CtaBanner />
      <Footer brandName={config.brandName} />
    </ClientLayout>
  );
}
