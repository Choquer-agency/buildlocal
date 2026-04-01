import { Metadata } from "next";
import { getStaticDomainConfig } from "@/lib/getStaticDomainConfig";
import { ClientLayout } from "@/components/ClientLayout";
import { Nav } from "@/components/Nav";
import { About } from "@/components/About";
import { Stats } from "@/components/Stats";
import { Portfolio } from "@/components/Portfolio";
import { Testimonials } from "@/components/Testimonials";
import { CtaBanner } from "@/components/CtaBanner";
import { MobileCta } from "@/components/MobileCta";
import { Footer } from "@/components/Footer";

export async function generateMetadata(): Promise<Metadata> {
  const config = getStaticDomainConfig();
  const title = `About ${config.brandName} | Our Story`;
  const description = `Learn about ${config.brandName}. 8+ years, 175+ websites built, and affordable managed websites helping small businesses and trades companies get online.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://${config.domain}/about`,
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
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://${config.domain}/about`,
    },
  };
}

export default function AboutPage() {
  const config = getStaticDomainConfig();

  return (
    <ClientLayout domain={config.domain} region={config.region}>
      <Nav brandName={config.brandName} />
      <About locality={config.locality} region={config.region} />
      <MobileCta />
      <Stats />
      <Portfolio slug={config.slug} />
      <Testimonials slug={config.slug} />
      <CtaBanner />
      <Footer brandName={config.brandName} />
    </ClientLayout>
  );
}
