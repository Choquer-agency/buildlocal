import { Metadata } from "next";
import { FinalCta } from "./FinalCta";
import { LpNav } from "@/components/lp/LpNav";
import { LpHero } from "@/components/lp/LpHero";
import { MockupPreview } from "@/components/lp/MockupPreview";
import { LpSocialProof } from "@/components/lp/LpSocialProof";
import { LpTestimonialsCompact } from "@/components/lp/LpTestimonialsCompact";
import { LpInlineForm } from "@/components/lp/LpInlineForm";
import { LpProblemAgitate } from "@/components/lp/LpProblemAgitate";
import { LpOffer } from "@/components/lp/LpOffer";
import { LpFaqCompact } from "@/components/lp/LpFaqCompact";
import { LpFooterMinimal } from "@/components/lp/LpFooterMinimal";
import { LpDataLayer } from "./LpDataLayer";

export const metadata: Metadata = {
  title: "Get a Free Call — BuildLocal",
  description:
    "Skip the research. Drop your name and number and our team will call you within 24 hours. We build websites for trades businesses — $0 setup, no contracts.",
};

const painPoints = [
  {
    title: "Your current website is costing you customers",
    description:
      "An outdated or missing website tells potential customers you're not serious. Every day without a professional site is money left on the table.",
  },
  {
    title: "You've been burned by agencies before",
    description:
      "You paid thousands upfront, waited months, and got a site that doesn't generate a single lead. We get it — and that's exactly why we do things differently.",
  },
  {
    title: "You don't have time to figure it out yourself",
    description:
      "You're running a business, not learning web design. You need someone who handles everything so you can focus on what you do best.",
  },
];

const offerFeatures = [
  "Custom website designed for your trade",
  "Mobile-first — looks great on every device",
  "Built to show up on Google in your area",
  "Fast, secure hosting — we handle everything",
  "We keep your site updated every month",
  "No setup fees, no contracts",
];

const faqs = [
  {
    question: "What happens after I submit my info?",
    answer:
      "Someone from our team will call you within 24 hours. We'll ask about your business, what you need, and walk you through how we can help. No pressure, no hard sell — just a real conversation.",
  },
  {
    question: "Is the call really free?",
    answer:
      "Yes, 100% free. No credit card, no commitment. We just want to learn about your business and see if we're a good fit.",
  },
  {
    question: "How long is the call?",
    answer:
      "About 10-15 minutes. We respect your time — we'll keep it quick and focused on what matters to you.",
  },
  {
    question: "Do I have to commit to anything?",
    answer:
      "No. The call is completely free with zero obligation. If you decide to move forward, plans start at $195/mo with no setup fees and no contracts.",
  },
];

export default function FreeCallPage() {
  return (
    <>
      <LpDataLayer variant="free-call" />
      <LpNav ctaLabel="Get a Free Call" ctaAction="scroll" scrollTarget="#callback-form" />
      <LpHero
        eyebrow="Skip the research"
        h1="We'll call you. No pitch, no pressure — just answers."
        subhead="Drop your name and number. Our team will reach out within 24 hours to talk about your business and how a new website can get you more calls."
        ctaLabel="Have Our Team Call Me"
        ctaAction="scroll"
        scrollTarget="#callback-form"
        microCopy="Takes 10 seconds. We'll call you within 24 hours."
        badges={["100% Free", "No Commitment", "Real Person, Not a Bot"]}
      />
      <MockupPreview />
      <LpSocialProof />
      <LpTestimonialsCompact />
      <LpInlineForm />
      <LpProblemAgitate
        title="Don't let your website hold you back"
        subtitle="The reality"
        painPoints={painPoints}
      />
      <LpOffer
        title="When you're ready, here's what's included"
        features={offerFeatures}
        priceAnchor="Plans start at $195/mo — no setup fees, no contracts."
        ctaLabel="Have Our Team Call Me"
        ctaAction="scroll"
        scrollTarget="#callback-form"
      />
      <LpFaqCompact faqs={faqs} />
      <FinalCta />
      <LpFooterMinimal />
    </>
  );
}
