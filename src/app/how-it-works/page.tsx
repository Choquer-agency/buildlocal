import { Metadata } from "next";
import { getStaticDomainConfig } from "@/lib/getStaticDomainConfig";
import { ClientLayout } from "@/components/ClientLayout";
import { Nav } from "@/components/Nav";
import { Process } from "@/components/Process";
import { FAQ } from "@/components/FAQ";
import { CtaBanner } from "@/components/CtaBanner";
import { MobileCta } from "@/components/MobileCta";
import { Footer } from "@/components/Footer";

export async function generateMetadata(): Promise<Metadata> {
  const config = getStaticDomainConfig();
  const title = "How It Works | BuildLocal";
  const description =
    "See exactly how BuildLocal builds your managed website — from picking a plan to going live in under a week. No tech skills needed.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://${config.domain}/how-it-works`,
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
      canonical: `https://${config.domain}/how-it-works`,
    },
  };
}

const detailedSteps = [
  {
    num: "01",
    title: "Pick Your Plan",
    subtitle: "Choose from 4 tiers",
    description:
      "Browse our four straightforward plans — from a single-page starter at $99/month to a full multi-page site with advanced features at $495/month. Every plan includes hosting, SSL, and monthly updates. No setup fees, no contracts.",
    color: "#F79C42",
  },
  {
    num: "02",
    title: "We Build Your Site",
    subtitle: "Custom site in days, not weeks",
    description:
      "Once you pick your plan, we get to work immediately. Send us your logo, photos, and content — or we can write it for you. Our team designs and builds a custom site tailored to your business. Most sites are ready for review within 3-5 business days.",
    color: "#BCEFFF",
  },
  {
    num: "03",
    title: "Review & Go Live",
    subtitle: "Your feedback, then launch",
    description:
      "We send you a preview link so you can review everything before it goes live. Request changes, tweak the copy, adjust colors — whatever you need. Once you approve, we launch your site and connect your domain. You are live.",
    color: "#C4EF7A",
  },
  {
    num: "04",
    title: "We Manage Everything",
    subtitle: "Hosting, updates, and support",
    description:
      "After launch, we handle it all. Hosting, security, backups, performance monitoring, and monthly content updates are all included. Need a change? Just send us a message. No ticketing systems, no support queues — just real people who respond fast.",
    color: "#71CFA3",
  },
];

const timeline = [
  { label: "Day 1", description: "Pick your plan and send us your details" },
  { label: "Day 2-4", description: "We design and build your custom site" },
  { label: "Day 5", description: "You review and request any changes" },
  { label: "Day 6-7", description: "Final tweaks and go live" },
];

export default function HowItWorksPage() {
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
                How It Works
              </span>
            </div>

            <h1 className="font-sans font-medium text-fluid-h1 leading-[1.1] tracking-tight text-dark max-w-[20ch] mb-6">
              Your website, live in under a week.
            </h1>

            <p className="font-sans text-fluid-large text-dark opacity-60 leading-relaxed max-w-[48ch]">
              Here&apos;s exactly how it works — from first contact to go-live.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed 4-step process */}
      <section style={{ backgroundColor: "#FFF9F0" }}>
        <div className="section-space-main">
          <div className="u-container">
            <h2 className="font-sans font-medium text-fluid-h2 leading-[1.15] tracking-tight text-dark mb-4">
              Four steps to a live website
            </h2>
            <p className="font-sans text-fluid-main text-dark opacity-50 leading-relaxed max-w-[52ch] mb-12">
              We keep the process simple so you can focus on running your
              business while we handle the rest.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {detailedSteps.map((step) => (
                <div
                  key={step.num}
                  className="rounded-2xl border border-dark/8 p-8 flex flex-col"
                  style={{ backgroundColor: "white" }}
                >
                  <div
                    className="w-12 h-12 rounded-xl mb-5 flex items-center justify-center font-mono text-sm font-semibold text-dark"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.num}
                  </div>
                  <h3 className="font-sans font-medium text-fluid-large text-dark mb-1">
                    {step.title}
                  </h3>
                  <p className="font-sans text-fluid-small text-brand font-medium mb-3">
                    {step.subtitle}
                  </p>
                  <p className="font-sans text-fluid-small text-dark opacity-50 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MobileCta />

      {/* Timeline expectations */}
      <section style={{ backgroundColor: "white" }}>
        <div className="section-space-main">
          <div className="u-container">
            <h2 className="font-sans font-medium text-fluid-h2 leading-[1.15] tracking-tight text-dark mb-4">
              What to expect, day by day
            </h2>
            <p className="font-sans text-fluid-main text-dark opacity-50 leading-relaxed max-w-[52ch] mb-12">
              Most projects go from kickoff to live in under a week. Here&apos;s
              a typical timeline.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {timeline.map((item, i) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-dark/8 p-6"
                  style={{ backgroundColor: "#FFF9F0" }}
                >
                  <span className="font-mono text-xs uppercase tracking-wider text-brand mb-2 block">
                    {item.label}
                  </span>
                  <p className="font-sans text-fluid-main text-dark opacity-70 leading-relaxed">
                    {item.description}
                  </p>
                  {i < timeline.length - 1 && (
                    <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process component (existing) */}
      <Process slug={config.slug} />

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
