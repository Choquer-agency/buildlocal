import { Metadata } from "next";
import { getStaticDomainConfig } from "@/lib/getStaticDomainConfig";
import { ClientLayout } from "@/components/ClientLayout";
import { Nav } from "@/components/Nav";
import { CtaBanner } from "@/components/CtaBanner";
import { MobileCta } from "@/components/MobileCta";
import { Footer } from "@/components/Footer";
import { PortfolioContent } from "./PortfolioContent";

export async function generateMetadata(): Promise<Metadata> {
  const config = getStaticDomainConfig();
  const title = `Our Work | ${config.brandName} — 175+ Websites Built`;
  const description = `See the websites we've built for small businesses and trades companies. 175+ sites launched, real results, and affordable managed websites from $99/month.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://${config.domain}/portfolio`,
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
      canonical: `https://${config.domain}/portfolio`,
    },
  };
}

export default function PortfolioPage() {
  const config = getStaticDomainConfig();

  return (
    <ClientLayout domain={config.domain} region={config.region}>
      <Nav brandName={config.brandName} />
      <PortfolioContent slug={config.slug} />
      <MobileCta />
      <CtaBanner />
      <Footer brandName={config.brandName} />
    </ClientLayout>
  );
}
