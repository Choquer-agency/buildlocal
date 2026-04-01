import { Metadata } from "next";
import { getStaticDomainConfig } from "@/lib/getStaticDomainConfig";
import { ClientLayout } from "@/components/ClientLayout";
import { Nav } from "@/components/Nav";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { CtaBanner } from "@/components/CtaBanner";
import { MobileCta } from "@/components/MobileCta";
import { Footer } from "@/components/Footer";

export async function generateMetadata(): Promise<Metadata> {
  const config = getStaticDomainConfig();
  const title = "Pricing | BuildLocal";
  const description =
    "Simple, transparent monthly pricing for managed websites. No setup fees, no contracts, no hidden costs. Plans from $99 to $495/month — everything included.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://${config.domain}/pricing`,
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
      canonical: `https://${config.domain}/pricing`,
    },
  };
}

const includedFeatures = [
  {
    title: "Custom Design",
    description:
      "A unique, professionally designed website tailored to your brand — no templates.",
    color: "#F79C42",
  },
  {
    title: "Hosting & SSL",
    description:
      "Fast, reliable hosting with a free SSL certificate included in every plan.",
    color: "#BCEFFF",
  },
  {
    title: "Mobile Responsive",
    description:
      "Your site looks and works great on every device — phones, tablets, and desktops.",
    color: "#C4EF7A",
  },
  {
    title: "Contact Forms",
    description:
      "Built-in contact forms so customers can reach you directly from your website.",
    color: "#71CFA3",
  },
  {
    title: "Basic SEO",
    description:
      "On-page SEO fundamentals so your business can be found on Google from day one.",
    color: "#FFDF40",
  },
  {
    title: "Monthly Updates",
    description:
      "Need something changed? We handle content and design updates every month.",
    color: "#F79C42",
  },
];

export default function PricingPage() {
  const config = getStaticDomainConfig();

  return (
    <ClientLayout domain={config.domain} region={config.region}>
      <Nav brandName={config.brandName} />

      {/* Hero */}
      <section style={{ backgroundColor: "#FFF9F0" }}>
        <div className="section-space-hero">
          <div className="u-container">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="font-mono text-xs uppercase tracking-wider text-brand">
                Pricing
              </span>
            </div>

            <h1 className="font-sans font-medium text-fluid-h1 leading-[1.1] tracking-tight text-dark max-w-[20ch] mb-6">
              Simple, transparent pricing.
            </h1>

            <p className="font-sans text-fluid-large text-dark opacity-60 leading-relaxed max-w-[48ch]">
              No setup fees. No contracts. No hidden costs. Just a monthly plan
              that covers everything.
            </p>
          </div>
        </div>
      </section>

      {/* What's included in every plan */}
      <section style={{ backgroundColor: "#FFF9F0" }}>
        <div className="section-space-main">
          <div className="u-container">
            <h2 className="font-sans font-medium text-fluid-h2 leading-[1.15] tracking-tight text-dark mb-4">
              What&apos;s included in every plan
            </h2>
            <p className="font-sans text-fluid-main text-dark opacity-50 leading-relaxed max-w-[52ch] mb-12">
              Every plan comes with the essentials your business needs to
              succeed online — no add-ons or upsells required.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {includedFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-dark/8 p-6"
                  style={{ backgroundColor: "white" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center"
                    style={{ backgroundColor: feature.color }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M5 10L9 14L15 6"
                        stroke="#1A1A1A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="font-sans font-medium text-fluid-large text-dark mb-1">
                    {feature.title}
                  </h3>
                  <p className="font-sans text-fluid-small text-dark opacity-50 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MobileCta />

      {/* Pricing tiers */}
      <Pricing region={config.region} slug={config.slug} />

      {/* FAQ */}
      <FAQ
        locality={config.locality}
        region={config.region}
        slug={config.slug}
      />

      <CtaBanner />
      <Footer brandName={config.brandName} />
    </ClientLayout>
  );
}
