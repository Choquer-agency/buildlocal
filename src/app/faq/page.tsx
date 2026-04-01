import { Metadata } from "next";
import { getStaticDomainConfig } from "@/lib/getStaticDomainConfig";
import { ClientLayout } from "@/components/ClientLayout";
import { Nav } from "@/components/Nav";
import { CtaBanner } from "@/components/CtaBanner";
import { MobileCta } from "@/components/MobileCta";
import { Footer } from "@/components/Footer";
import { FAQContent } from "./FAQContent";

export async function generateMetadata(): Promise<Metadata> {
  const config = getStaticDomainConfig();
  const title = `FAQ | ${config.brandName} — Frequently Asked Questions`;
  const description = `Common questions about ${config.brandName}'s affordable managed websites for small businesses. Learn about pricing, plans, process, and what's included from $99/month.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://${config.domain}/faq`,
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
      canonical: `https://${config.domain}/faq`,
    },
  };
}

export default function FAQPage() {
  const config = getStaticDomainConfig();

  return (
    <ClientLayout domain={config.domain} region={config.region}>
      <Nav brandName={config.brandName} />
      <FAQContent
        locality={config.locality}
        region={config.region}
        slug={config.slug}
      />
      <MobileCta />
      <CtaBanner />
      <Footer brandName={config.brandName} />
    </ClientLayout>
  );
}
