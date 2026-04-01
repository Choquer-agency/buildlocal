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
  title: "Free Website Mockup — BuildLocal",
  description:
    "See what your new website could look like — for free. Tell us about your business and we'll design a custom homepage mockup within 48 hours.",
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
    question: "Is the mockup really free?",
    answer:
      "Yes, 100% free. We'll design a custom homepage mockup for your business at no cost. No credit card, no commitment, no strings attached.",
  },
  {
    question: "What happens after I get my mockup?",
    answer:
      "You'll review the mockup and if you love it, we can have your full site live within a week. If it's not for you, no hard feelings — the mockup is yours to keep.",
  },
  {
    question: "How long does the mockup take?",
    answer:
      "We'll send your custom mockup within 48 hours of receiving your submission. Most are delivered within 24 hours.",
  },
  {
    question: "Do I have to commit to anything?",
    answer:
      "No. The mockup is completely free with zero obligation. If you decide to move forward, plans start at $195/mo with no setup fees and no contracts.",
  },
];

export default function FreeMockupPage() {
  return (
    <>
      <LpDataLayer variant="free-mockup" />
      <LpNav ctaLabel="See Your Free Mockup" ctaAction="scroll" scrollTarget="#mockup-form" />
      <LpHero
        eyebrow="Free custom mockup"
        h1="See what your new website could look like — for free."
        subhead="Tell us about your business and we'll design a custom homepage mockup. No cost, no commitment."
        ctaLabel="Get My Free Mockup"
        ctaAction="scroll"
        scrollTarget="#mockup-form"
        microCopy="Takes 30 seconds. We'll send your mockup within 48 hours."
        badges={["100% Free", "No Commitment", "48-Hour Delivery"]}
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
        title="When you're ready to go live, here's what's included"
        features={offerFeatures}
        priceAnchor="Plans start at $195/mo — no setup fees, no contracts."
        ctaLabel="Get My Free Mockup"
        ctaAction="scroll"
        scrollTarget="#mockup-form"
      />
      <LpFaqCompact faqs={faqs} />
      <FinalCta />
      <LpFooterMinimal />
    </>
  );
}
