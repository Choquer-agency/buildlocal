/* eslint-disable @typescript-eslint/no-unused-vars */
import { FAQItem, ProcessStep } from "./config";
import { getCluster } from "./clusters";

/* ─── Industry Page Config ─── */

export interface IndustryPageConfig {
  slug: string;
  title: string;
  eyebrow: string;
  metaTitle: (locality: string, region: string) => string;
  metaDescription: (locality: string, region: string) => string;
  heroH1: (locality: string, region: string) => string;
  heroSubhead: (locality: string, region: string) => string;
  heroQualifier: (locality: string, region: string) => string;
  painPoints: (locality: string, region: string, slug: string) => { title: string; description: string }[];
  whySEO: (locality: string, region: string, slug: string) => { title: string; description: string }[];
  processSteps: ProcessStep[];
  faqs: (locality: string, region: string, slug: string) => FAQItem[];
  ctaLabel: string;
  color: string;
  icon: string;
}

/* ─── Industry Page Configs ─── */

export const industryMap: Record<string, IndustryPageConfig> = {
  "trades-home-services": {
    slug: "trades-home-services",
    title: "Websites for Trades & Home Services",
    eyebrow: "Trades & Home Services Websites",
    color: "#C4EF7A",
    icon: "Wrench",
    ctaLabel: "Get Your Website Started",
    metaTitle: (locality, region) =>
      `Websites for Contractors ${locality} | ${region} Trades Web Design`,
    metaDescription: (locality, region) =>
      `Professional websites for roofers, HVAC, plumbers, electricians, and contractors in ${locality}, ${region}. Affordable managed sites starting at $99/month. Get more calls.`,
    heroH1: (_locality, region) =>
      `Websites That Get ${region} Trades Companies More Jobs`,
    heroSubhead: (_locality, region) =>
      `97% of customers search online before hiring a contractor. If you don't have a professional website, you're losing jobs to competitors who do. We build sites that make the phone ring for ${region} trades businesses.`,
    heroQualifier: (_locality, region) =>
      `For ${region} roofers, HVAC companies, plumbers, electricians, painters, landscapers, and contractors who need a website that works as hard as they do.`,
    painPoints: (_locality, _region, _slug) => [
      {
        title: "You don't have a website at all",
        description:
          "You're running a legit business with no online presence. Customers Google you, find nothing, and call the competitor who has a professional site. It's that simple.",
      },
      {
        title: "You're losing jobs to competitors who show up on Google",
        description:
          "The company down the road isn't better than you — they just have a website that shows up when people search. That's the only difference, and it's costing you thousands in lost work.",
      },
      {
        title: "You're relying only on word of mouth",
        description:
          "Referrals are great, but they don't scale. A website works 24/7 bringing in new leads from people who've never heard of you but need exactly what you offer.",
      },
      {
        title: "You're paying too much for lead gen sites",
        description:
          "HomeAdvisor, Angi, and Thumbtack charge you for shared leads that go to 5 other contractors. Your own website generates exclusive leads — people who call you and only you.",
      },
    ],
    whySEO: (_locality, _region, _slug) => [
      {
        title: "97% of consumers search online before hiring",
        description:
          "Before they call anyone, homeowners Google it. If you don't have a website, you don't exist to most potential customers. A professional site puts you in front of them at the moment they need help.",
      },
      {
        title: "Mobile-first customers want to call right now",
        description:
          "Someone's AC just broke. They're on their phone searching for help. A mobile-friendly website with a click-to-call button turns that emergency into your next job.",
      },
      {
        title: "A website builds credibility and trust",
        description:
          "Photos of your work, customer reviews, your license info, and a professional design tell customers you're the real deal. People hire businesses they trust, and your website is where that trust starts.",
      },
    ],
    processSteps: [
      { step: 1, title: "Discover", description: "We learn your trade, your service area, what jobs you want more of, and what makes your company the best choice." },
      { step: 2, title: "Design", description: "We create a custom layout that showcases your work, highlights your services, and makes it dead simple for customers to contact you." },
      { step: 3, title: "Build", description: "We develop your site with fast load times, mobile-first design, click-to-call buttons, and local SEO fundamentals built in." },
      { step: 4, title: "Launch", description: "Your site goes live, we set up tracking, and you start getting found online. We handle hosting and updates so you can focus on the work." },
    ],
    faqs: (locality, region, _slug) => [
      {
        category: "service",
        question: "What kind of trades companies do you build websites for?",
        answer: `We build websites for all trades and home service businesses in ${region} — roofers, HVAC companies, plumbers, electricians, painters, landscapers, concrete contractors, fencing companies, and more. If you work with your hands and serve local customers, we've built a site for someone like you.`,
      },
      {
        category: "process",
        question: "I don't have any content or photos. Can you still build my site?",
        answer: `Absolutely. Most contractors we work with don't have polished photos or pre-written content ready to go. We'll write all the content for you based on our discovery call, and we can use professional stock photos or help you take quick job-site photos that look great.`,
      },
      {
        category: "pricing",
        question: `How much does a website cost for a ${region} contractor?`,
        answer: `Our managed website plans start at $99/month with no big upfront cost. That includes custom design, hosting, security, and ongoing support. Compare that to the $5,000-$15,000 other agencies charge upfront — and then leave you on your own.`,
      },
      {
        category: "website",
        question: "Will my website help me show up on Google?",
        answer: `Yes. Every site we build includes local SEO fundamentals — proper title tags, meta descriptions, location-specific content, mobile optimization, and fast load times. These are the building blocks that help you rank in ${locality} search results.`,
      },
      {
        category: "general",
        question: "What if I already have a website but it looks terrible?",
        answer: "We redesign existing sites all the time. We'll migrate your content, preserve any SEO value you've built, and give you a modern, professional site that actually converts visitors into calls. The transition is seamless.",
      },
    ],
  },

  "local-services": {
    slug: "local-services",
    title: "Websites for Local Service Businesses",
    eyebrow: "Local Service Business Websites",
    color: "#BCEFFF",
    icon: "MapPin",
    ctaLabel: "Get Your Website Started",
    metaTitle: (locality, region) =>
      `Websites for Local Businesses ${locality} | ${region} Web Design`,
    metaDescription: (locality, region) =>
      `Professional websites for auto repair, cleaning, pest control, moving companies, and local service businesses in ${locality}, ${region}. Managed sites from $99/month.`,
    heroH1: (_locality, region) =>
      `Websites That Bring ${region} Service Businesses More Customers`,
    heroSubhead: (_locality, region) =>
      `Your customers are searching online right now for the exact service you offer. Without a professional website, they'll never find you. We build affordable, managed websites that put ${region} service businesses on the map.`,
    heroQualifier: (_locality, region) =>
      `For ${region} auto repair shops, cleaning services, pest control companies, movers, locksmiths, and other local service businesses.`,
    painPoints: (_locality, _region, _slug) => [
      {
        title: "Customers can't find you online",
        description:
          "Someone needs exactly what you offer, but they search Google and find your competitor instead. No website means no visibility — and no visibility means no new customers.",
      },
      {
        title: "Your current site looks unprofessional",
        description:
          "A dated, clunky website makes your business look like it's stuck in the past. Customers judge your service quality by your online presence — fair or not.",
      },
      {
        title: "You're only getting customers through referrals",
        description:
          "Referrals are great, but they're inconsistent. A website brings in steady leads from people who are actively searching for your service right now.",
      },
      {
        title: "You've been quoted $5,000+ for a website",
        description:
          "Traditional agencies charge a fortune upfront, then disappear. You need an affordable website that's professionally managed month after month — not a one-time project that goes stale.",
      },
    ],
    whySEO: (_locality, _region, _slug) => [
      {
        title: "Local search is your biggest growth channel",
        description:
          "When someone searches 'auto repair near me' or 'cleaning service in [city],' they're ready to buy right now. A professional website puts you in front of those high-intent customers.",
      },
      {
        title: "A website works for you around the clock",
        description:
          "Your website doesn't take days off. It's out there at midnight when someone's furnace breaks, at 6am when they're planning a move, and every moment in between — capturing leads while you sleep.",
      },
      {
        title: "Professional presence beats word of mouth",
        description:
          "Even referrals Google you before they call. A clean, professional website confirms what their friend told them — that you're trustworthy, established, and the right choice.",
      },
    ],
    processSteps: [
      { step: 1, title: "Discover", description: "We learn your services, your service area, your ideal customer, and what sets your business apart from the competition." },
      { step: 2, title: "Design", description: "We create a custom design that highlights your services, shows off your reviews, and makes contacting you effortless." },
      { step: 3, title: "Build", description: "We build a fast, mobile-friendly website with clear calls to action, click-to-call, and local SEO fundamentals baked in." },
      { step: 4, title: "Launch", description: "We launch your site, set up analytics, and start managing it month to month. Updates, hosting, and support are all included." },
    ],
    faqs: (locality, region, _slug) => [
      {
        category: "service",
        question: "What types of local service businesses do you work with?",
        answer: `We build websites for all kinds of local service businesses in ${region} — auto repair shops, cleaning services, pest control, moving companies, locksmiths, junk removal, tutoring services, pet groomers, and more. If you serve local customers, we can build you a great website.`,
      },
      {
        category: "pricing",
        question: "Is there a big upfront cost?",
        answer: `No. Our managed website plans start at $99/month with little to no upfront cost. We spread the investment over time because we're in it with you for the long haul — not just a one-time build and goodbye.`,
      },
      {
        category: "website",
        question: "Can customers book or contact me directly from the website?",
        answer: `Absolutely. We build in contact forms, click-to-call buttons, and can integrate booking or scheduling tools if your business uses them. The goal is to make it as easy as possible for ${locality} customers to reach you.`,
      },
      {
        category: "process",
        question: "How long does it take to get my website live?",
        answer: "Most sites are designed, built, and launched within 2-3 weeks. We move fast because we know you need leads coming in, not a months-long design process.",
      },
      {
        category: "billing",
        question: "What happens if I want to cancel?",
        answer: "You can cancel anytime — no long-term contracts. If you leave, we'll help you transition your site and domain smoothly. We keep customers by doing great work, not by locking you in.",
      },
    ],
  },

  "retail-lifestyle": {
    slug: "retail-lifestyle",
    title: "Websites for Small Retail & Lifestyle",
    eyebrow: "Retail & Lifestyle Websites",
    color: "#FFD6E0",
    icon: "Scissors",
    ctaLabel: "Get Your Website Started",
    metaTitle: (locality, region) =>
      `Websites for Salons & Retail ${locality} | ${region} Web Design`,
    metaDescription: (locality, region) =>
      `Beautiful websites for salons, restaurants, fitness studios, and boutiques in ${locality}, ${region}. Booking-ready, mobile-friendly, and managed for you. From $99/month.`,
    heroH1: (_locality, region) =>
      `Beautiful Websites for ${region} Retail & Lifestyle Businesses`,
    heroSubhead: (_locality, region) =>
      `Your brand is visual. Your website should be too. We build stunning, mobile-first websites for ${region} salons, restaurants, fitness studios, and boutiques — designed to look amazing and keep your chairs, tables, and classes full.`,
    heroQualifier: (_locality, region) =>
      `For ${region} salons, barbershops, restaurants, cafes, fitness studios, yoga studios, and boutique shops.`,
    painPoints: (_locality, _region, _slug) => [
      {
        title: "Your Instagram is your only online presence",
        description:
          "Social media is rented land — the algorithm changes and your reach disappears overnight. A website is home base that you own and control, and it shows up when people Google you.",
      },
      {
        title: "Customers can't book online",
        description:
          "If booking requires a phone call during business hours, you're losing the customers who want to book at 10pm from their couch. Online booking isn't a luxury anymore — it's expected.",
      },
      {
        title: "Your brand looks different everywhere",
        description:
          "Your Instagram looks great, but your website (if you have one) looks nothing like it. Inconsistent branding confuses customers and weakens trust.",
      },
      {
        title: "You're invisible to new customers nearby",
        description:
          "Someone new to the neighborhood searches for a salon, a coffee shop, or a gym. Without a website, you won't show up — and they'll become a regular at the place that did.",
      },
    ],
    whySEO: (_locality, _region, _slug) => [
      {
        title: "Visual businesses need visual websites",
        description:
          "Your work speaks for itself — but only if people can see it. A beautifully designed website showcases your space, your work, and your vibe in a way that social media alone can't.",
      },
      {
        title: "Online booking fills your schedule",
        description:
          "Integrated booking lets customers schedule appointments, reserve tables, or sign up for classes anytime. It reduces no-shows, fills empty slots, and makes life easier for you and your customers.",
      },
      {
        title: "Local search drives foot traffic",
        description:
          "When someone searches 'best salon near me' or 'yoga studio in [city],' Google shows businesses with websites and strong local presence first. That foot traffic starts with being found online.",
      },
    ],
    processSteps: [
      { step: 1, title: "Discover", description: "We learn your brand, your vibe, your services, and your ideal customer. We look at your social presence and figure out how to bring that energy to your website." },
      { step: 2, title: "Design", description: "We create a visually stunning custom layout that matches your brand — menus, portfolios, photo galleries, and booking integration all woven into a design that feels like you." },
      { step: 3, title: "Build", description: "We build your site for speed and mobile — because your customers are browsing on their phones. We integrate booking tools, social feeds, and everything you need." },
      { step: 4, title: "Launch", description: "We go live, connect your domain, and start managing your site. Menu updates, new photos, seasonal promotions — we handle it all so you can focus on your craft." },
    ],
    faqs: (locality, region, _slug) => [
      {
        category: "service",
        question: "Can you integrate online booking into my website?",
        answer: `Yes. We integrate with popular booking platforms like Square Appointments, Vagaro, Mindbody, Acuity, and others. If you already use a booking system, we'll connect it to your ${locality} website. If you don't have one yet, we'll help you pick the right one.`,
      },
      {
        category: "website",
        question: "Can I show my menu, services, or class schedule on the site?",
        answer: "Absolutely. We build in menus, service lists with pricing, class schedules, photo galleries — whatever your business needs. And when your menu or schedule changes, just send us the update and we'll handle it.",
      },
      {
        category: "website",
        question: "Can you connect my Instagram or social media?",
        answer: "Yes. We can embed your Instagram feed directly on your website so visitors see your latest posts. We can also add links to all your social profiles and make it easy for customers to follow you across platforms.",
      },
      {
        category: "pricing",
        question: `How much does a website cost for a ${region} salon or restaurant?`,
        answer: `Our managed plans start at $99/month — no massive upfront cost. For businesses that need booking integration, menus, or e-commerce, our mid-tier plans cover everything you need. Every plan includes hosting, updates, and support.`,
      },
      {
        category: "general",
        question: "Will my website match my brand and aesthetic?",
        answer: "That's the whole point. We design every site from scratch to match your brand — your colors, your fonts, your vibe. We'll pull from your existing branding, your social media, and your space to create something that feels authentically you.",
      },
    ],
  },

  "professional-services": {
    slug: "professional-services",
    title: "Websites for Professional Services",
    eyebrow: "Professional Services Websites",
    color: "#E8D5FF",
    icon: "Briefcase",
    ctaLabel: "Get Your Website Started",
    metaTitle: (locality, region) =>
      `Websites for Professional Services ${locality} | ${region} Web Design`,
    metaDescription: (locality, region) =>
      `Professional websites for accountants, consultants, insurance agents, and advisors in ${locality}, ${region}. Credible, lead-generating sites managed for you. From $99/month.`,
    heroH1: (_locality, region) =>
      `Professional Websites for ${region} Service Firms`,
    heroSubhead: (_locality, region) =>
      `Your clients need to trust you before they hire you. A professional, polished website builds that trust from the first click. We build lead-generating websites for ${region} professional service firms — managed month to month.`,
    heroQualifier: (_locality, region) =>
      `For ${region} accountants, consultants, insurance agents, financial advisors, real estate agents, and professional service firms.`,
    painPoints: (_locality, _region, _slug) => [
      {
        title: "Your website doesn't look as professional as you are",
        description:
          "You're great at what you do, but your website tells a different story. A dated or amateurish site undermines your credibility before a prospect even talks to you.",
      },
      {
        title: "You're not generating leads online",
        description:
          "Your website exists, but nobody fills out the contact form. No clear value proposition, no compelling reason to reach out, no trust signals that make prospects feel confident.",
      },
      {
        title: "You're relying entirely on referrals and networking",
        description:
          "Referrals are your best leads, but they're unpredictable. A strong website creates a steady pipeline of qualified prospects who find you through search and convert on their own.",
      },
      {
        title: "Prospects Google you and aren't impressed",
        description:
          "After a networking event or referral, the first thing people do is look you up online. If your website is weak — or nonexistent — they question your legitimacy.",
      },
    ],
    whySEO: (_locality, _region, _slug) => [
      {
        title: "Credibility starts online",
        description:
          "Before a prospect picks up the phone, they've already visited your website and formed an opinion. A polished, professional site with clear expertise, credentials, and testimonials sets the tone for the entire relationship.",
      },
      {
        title: "Trust signals convert browsers into clients",
        description:
          "Certifications, testimonials, case studies, and professional photography aren't just nice to have — they're what make a visitor feel confident enough to fill out your contact form or pick up the phone.",
      },
      {
        title: "Your website is a 24/7 lead generation machine",
        description:
          "A well-built website with strong calls to action, valuable content, and clear next steps captures leads while you're in meetings, on calls, or off the clock.",
      },
    ],
    processSteps: [
      { step: 1, title: "Discover", description: "We learn your services, your ideal client, your competitive advantages, and how you want to be perceived in the market." },
      { step: 2, title: "Design", description: "We create a clean, professional layout that builds trust — highlighting your expertise, credentials, testimonials, and a clear path to contact you." },
      { step: 3, title: "Build", description: "We develop your site with fast load times, mobile responsiveness, lead capture forms, and content that positions you as the authority in your field." },
      { step: 4, title: "Launch", description: "We launch, connect analytics, and start managing your site. Need to add a new team member, update services, or publish a blog post? We handle it." },
    ],
    faqs: (locality, region, _slug) => [
      {
        category: "service",
        question: "What types of professional service businesses do you work with?",
        answer: `We build websites for accountants, CPAs, consultants, insurance agents, financial advisors, real estate agents, attorneys, and other professional service firms across ${region}. If your business runs on trust and expertise, we know how to build a site that communicates both.`,
      },
      {
        category: "website",
        question: "Can you include testimonials, case studies, and credentials?",
        answer: "Absolutely — and you should. We build dedicated sections for testimonials, case studies, certifications, awards, and team bios. These trust signals are critical for professional service businesses and we make them a focal point of your site.",
      },
      {
        category: "website",
        question: "Will my website generate leads?",
        answer: `Every site we build is designed to convert visitors into inquiries. That means clear calls to action, strategically placed contact forms, compelling value propositions, and content that answers the questions your ${locality} prospects are already asking.`,
      },
      {
        category: "pricing",
        question: `How much does a professional services website cost in ${region}?`,
        answer: `Our managed plans start at $99/month with no large upfront cost. Most professional service firms land in the $199-$349/month range for a fully custom site with lead generation features, blog capability, and ongoing management.`,
      },
      {
        category: "general",
        question: "Do you help with content or do I need to write everything?",
        answer: "We write all the content for you. During our discovery call, we learn enough about your business to craft compelling, professional copy that speaks to your ideal clients. You review and approve everything before it goes live.",
      },
    ],
  },
};

import { tradeMap } from "./trades";

/** Combined map: broad categories + specific trades */
const combinedMap: Record<string, IndustryPageConfig> = {
  ...industryMap,
  ...tradeMap,
};

export function getIndustryConfig(slug: string): IndustryPageConfig | undefined {
  return combinedMap[slug];
}

export function getAllIndustrySlugs(): string[] {
  return Object.keys(combinedMap);
}
