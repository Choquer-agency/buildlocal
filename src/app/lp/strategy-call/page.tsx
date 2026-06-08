import { Metadata } from "next";
import { LpNav } from "@/components/lp/LpNav";
import { LpHero } from "@/components/lp/LpHero";
import { LpSocialProof } from "@/components/lp/LpSocialProof";
import { LpProblemAgitate } from "@/components/lp/LpProblemAgitate";
import { LpTestimonialsCompact } from "@/components/lp/LpTestimonialsCompact";
import { LpOffer } from "@/components/lp/LpOffer";
import { CtaBanner } from "@/components/CtaBanner";
import { LpFaqCompact } from "@/components/lp/LpFaqCompact";
import { LpFooterMinimal } from "@/components/lp/LpFooterMinimal";
import { LpDataLayer } from "./LpDataLayer";

export const metadata: Metadata = {
  title: "Free Strategy Call — BuildLocal",
  description:
    "Book a free 15-minute strategy call. We build websites for trades businesses — buy outright for $3,500 or free with a marketing plan. No contracts, live in 7 days.",
};

const painPoints = [
  {
    title: "Your website doesn't show up on Google",
    description:
      "Customers are searching for your services right now. If your site isn't on page one, you're invisible — and your competitors are getting those calls instead.",
  },
  {
    title: "You paid too much for a site that doesn't convert",
    description:
      "You dropped $5K-$15K on a website years ago and it just sits there. No leads, no calls, no updates. You're paying for hosting and getting nothing back.",
  },
  {
    title: "Your agency doesn't understand trades businesses",
    description:
      "Generic agencies build generic sites. They don't know how roofers get jobs or how HVAC techs book calls. You need someone who speaks your language.",
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
    question: "Is there really no setup fee?",
    answer:
      "Correct. $0 setup fee on every marketing plan — we design, build, and launch your website at no upfront cost, and your first monthly payment is due when the site goes live. Prefer to own the site outright? That's a one-time $3,500 with nothing recurring.",
  },
  {
    question: "How long does it take to get my site live?",
    answer:
      "Most websites are designed, built, and live within 3-5 business days. From signup to live site is typically under one week.",
  },
  {
    question: "What if I want to cancel?",
    answer:
      "Cancel anytime. No contracts, no cancellation fees. You own your domain and content — we'll help you transition everything.",
  },
  {
    question: "What's included in my plan?",
    answer:
      "Every marketing plan starts with a free custom website — mobile-responsive design, managed hosting, SSL, on-page SEO, monthly content changes, and ongoing support. Higher tiers add service-area pages, blog content, link building, and paid ads management to drive more leads.",
  },
];

export default function StrategyCallPage() {
  return (
    <>
      <LpDataLayer variant="strategy-call" />
      <LpNav ctaLabel="Book My Free Call" ctaAction="modal" />
      <LpHero
        eyebrow="Trusted by 175+ businesses"
        h1="Your website should be your best salesperson. Is it?"
        subhead="We build and manage websites that get trades businesses more calls, more leads, and more booked jobs. Buy outright for $3,500 or free with a marketing plan. No contracts, live in 7 days."
        ctaLabel="Book Your Free Strategy Call"
        ctaAction="modal"
        microCopy="15-min call. No pressure. No obligation."
        badges={["$0 Setup", "No Contracts", "Live in 1 Week"]}
      />
      <LpSocialProof />
      <LpProblemAgitate
        title="Sound familiar?"
        subtitle="The problem"
        painPoints={painPoints}
      />
      <LpTestimonialsCompact />
      <LpOffer
        title="Here's what you get on every plan"
        features={offerFeatures}
        priceAnchor="Marketing plans from $300/mo — that's one new job paying for months of growth."
        ctaLabel="Book Your Free Strategy Call"
        ctaAction="modal"
      />
      <CtaBanner />
      <LpFaqCompact faqs={faqs} />
      <LpFooterMinimal />
    </>
  );
}
