import {
  ServiceItem,
  ProcessStep,
  Testimonial,
  PortfolioProject,
  FAQItem,
  AgencyService,
  ComparisonRow,
  IndustryItem,
  PricingTier,
} from "./config";
import { getCluster } from "./clusters";

/* ─── Services (static) ─── */

export const services: ServiceItem[] = [
  {
    icon: "Palette",
    title: "Custom Website Design",
    description:
      "Professionally designed websites tailored to your brand. No cookie-cutter templates — every site is built to reflect your business and convert visitors into customers.",
  },
  {
    icon: "Smartphone",
    title: "Mobile-First Development",
    description:
      "Every site we build is fully responsive and optimized for phones, tablets, and desktops. Over 60% of your visitors are on mobile — your site needs to look great on every screen.",
  },
  {
    icon: "Search",
    title: "SEO & Local Search",
    description:
      "Get found on Google by the customers searching for your services. We build SEO into every site with optimized content, local keywords, and Google Business Profile setup.",
  },
  {
    icon: "Cloud",
    title: "Managed Hosting",
    description:
      "Fast, reliable hosting with SSL certificates and 99.9% uptime — all included in your monthly plan. No extra fees, no server headaches.",
  },
  {
    icon: "FileEdit",
    title: "Content Updates",
    description:
      "Need to change your hours, add a new service, or update photos? Every plan includes a monthly change allowance so your site stays current without extra charges.",
  },
  {
    icon: "BarChart3",
    title: "Analytics & Reporting",
    description:
      "Track how your website is performing with visitor analytics, lead tracking, and monthly performance summaries. Know exactly how your site is working for you.",
  },
];

/* ─── Process Steps (cluster-aware) ─── */

export function getProcessSteps(slug: string = "buildlocal"): ProcessStep[] {
  const cluster = getCluster(slug);
  return cluster.processSteps;
}

export const processSteps: ProcessStep[] = getProcessSteps("buildlocal");

/* ─── Testimonials (static) ─── */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getTestimonials(_locality?: string): Testimonial[] {
  return [
    {
      quote:
        "Before BuildLocal, I had no website at all. Now I'm getting 3x more calls than I was from word of mouth alone. The site paid for itself in the first week.",
      name: "Marcus Delgado",
      title: "Owner",
      company: "Delgado Roofing",
      featured: true,
    },
    {
      quote:
        "We went from zero online presence to being booked solid within two months. I can't believe how fast they got us up and running. Best $195 I spend every month.",
      name: "Sarah Mitchell",
      title: "Owner",
      company: "Spotless Cleaning Co.",
    },
    {
      quote:
        "The website literally paid for itself in the first month. We got four new service calls the first week it went live. Should have done this years ago.",
      name: "James Kowalski",
      title: "Operations Manager",
      company: "Summit HVAC Services",
    },
    {
      quote:
        "I'm not a tech person at all, and that's what I love about BuildLocal. They handle everything — I just run my salon and the website brings in new clients on its own.",
      name: "Priya Anand",
      title: "Owner",
      company: "Luxe Hair Studio",
    },
  ];
}

export const testimonials = getTestimonials();

/* ─── Portfolio ─── */

const generalPortfolio: PortfolioProject[] = [
  {
    name: "Pinnacle Fertility",
    category: "Healthcare",
    image: "/images/portfolio/project-2.webp",
    description:
      "Built a multi-location website for Pinnacle Fertility with location-specific landing pages, driving an average 221% increase in organic traffic across all clinic sites.",
    caseStudy: {
      challenge:
        "Pinnacle Fertility had multiple clinic locations but no cohesive web presence. Each location had inconsistent branding and poor mobile experiences.",
      approach:
        "We designed and built a unified, mobile-first website with location-specific pages, optimized content for each clinic, and integrated appointment booking across all locations.",
      result:
        "221% average organic traffic growth across all locations. Multiple clinics now rank on page one for high-intent fertility keywords, driving steady appointment bookings.",
    },
  },
  {
    name: "Pedigree Painting",
    category: "Home Services",
    image: "/images/portfolio/project-3.webp",
    description:
      "Built the website for a brand-new painting company that went on to generate $1.3 million in revenue over three years.",
    caseStudy: {
      challenge:
        "Brand-new painting company with no website and no online presence in a competitive local market.",
      approach:
        "We built a professional website with service area pages, a project gallery, click-to-call CTAs, and built-in local SEO to start generating leads from day one.",
      result:
        "$0 to $1.3 million in revenue over three years. The website became their primary lead source, delivering consistent inbound calls every week.",
    },
  },
  {
    name: "DFI Forensics",
    category: "Digital Forensics",
    image: "/images/portfolio/project-7.webp",
    description:
      "Designed and developed a conversion-focused website that ranks #1 locally for digital forensics and drives 60% of their qualified leads.",
    caseStudy: {
      challenge:
        "Niche industry with very specific search terms. Their previous site was outdated, slow, and invisible in search results.",
      approach:
        "We built a modern, fast-loading website with service-specific pages, schema markup, and content optimized for high-intent forensics keywords.",
      result:
        "Ranked #1 locally within three months and has held that position for over two years. Organic search now drives 60% of qualified leads.",
    },
  },
  {
    name: "Far North Crane",
    category: "Crane & Rigging",
    image: "/images/portfolio/project-5.webp",
    description:
      "Built a professional website showcasing their fleet and services, resulting in a 180% increase in organic traffic and a steady pipeline of commercial inquiries.",
    caseStudy: {
      challenge:
        "Outdated website that didn't reflect the scale of their commercial operations. Contractors couldn't find their services online.",
      approach:
        "We designed a modern site with dedicated fleet and service pages, project galleries, and mobile-optimized layouts built for the construction industry.",
      result:
        "Organic traffic increased 180% within six months. The new site delivers a steady pipeline of commercial project inquiries from contractors and developers.",
    },
  },
  {
    name: "LC Notary",
    category: "Notary Services",
    image: "/images/portfolio/project-1.webp",
    description:
      "Built a clean, conversion-optimized website that ranks #1 locally for notary services and generates over 70% of their new business.",
    caseStudy: {
      challenge:
        "Competing against dozens of established notary services with no website and no online visibility.",
      approach:
        "We built a fast, mobile-friendly website with service area pages, click-to-call functionality, and local SEO baked into every page.",
      result:
        "Ranked #1 in Google within four months. Organic leads now account for over 70% of new business.",
    },
  },
  {
    name: "JDG Interior Design",
    category: "Interior Design",
    image: "/images/portfolio/project-8.webp",
    description:
      "Designed a visually stunning portfolio website that tripled consultation requests within two months.",
    caseStudy: {
      challenge:
        "Had a stunning portfolio but their old website was slow, hard to navigate, and failed to convert visitors into consultation requests.",
      approach:
        "We built a visually rich, fast-loading website that showcases their portfolio beautifully while making it easy for visitors to book a consultation.",
      result:
        "Page load times dropped 60%, session duration up 45%, and consultation requests tripled in two months.",
    },
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getPortfolioProjects(_slug?: string): PortfolioProject[] {
  return generalPortfolio;
}

export const portfolioProjects = generalPortfolio;

/* ─── Stats (static) ─── */

export const stats = {
  sitesBuilt: 175,
  sitesManaged: 60,
  yearsExperience: 8,
  avgTrafficIncrease: 47,
};

/* ─── Pain Points (cluster-aware) ─── */

export function getPainPoints(
  slug: string = "buildlocal"
): { title: string; description: string }[] {
  const cluster = getCluster(slug);
  return cluster.painPoints;
}

export const painPoints = getPainPoints("buildlocal");

/* ─── Solution Cards (static) ─── */

export const solutionCards = [
  {
    icon: "Target",
    title: "Built to\nConvert",
    description:
      "Every site is designed to turn visitors into calls, form fills, and paying customers. No fluff — just clear messaging and strong calls to action.",
  },
  {
    icon: "Zap",
    title: "No Upfront\nCost",
    description:
      "$0 setup fee. Your custom website, hosting, SSL, and ongoing support are all included in one simple monthly plan. Start for as little as $99/month.",
  },
  {
    icon: "Handshake",
    title: "We Handle\nEverything",
    description:
      "Hosting, updates, SEO, security, and support — all managed by our team. You focus on your business, we keep your website fast, secure, and generating leads.",
  },
];

/* ─── Expanded FAQs ─── */

export function getExpandedFaqs(
  locality?: string,
  region?: string,
  slug?: string
): FAQItem[] {
  const baseFaqs: FAQItem[] = [
    {
      category: "billing",
      question: "Are there any contracts or long-term commitments?",
      answer:
        "No. BuildLocal is month-to-month with no contracts and no cancellation fees. You can cancel anytime. We believe in earning your business every month, not locking you in.",
    },
    {
      category: "billing",
      question: "What happens to my website if I cancel?",
      answer:
        "You own your domain name and all of your content. If you cancel, we'll help you transition your domain and provide all your content and images. The website itself is built on our managed platform, so you'd need a new host, but you'll never lose your domain or content.",
    },
    {
      category: "billing",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, Amex) and ACH bank transfers. Payments are processed securely on a monthly billing cycle. No invoices to chase — it's automatic.",
    },
    {
      category: "billing",
      question: "Is there really no setup fee?",
      answer:
        "Correct. $0 setup fee on every plan. We design, build, and launch your website at no upfront cost. Your first monthly payment is due when the site goes live.",
    },
    {
      category: "service",
      question: "What's included in my monthly plan?",
      answer:
        "Every plan includes custom website design, mobile-responsive development, managed hosting, SSL certificate, basic SEO, a monthly content change allowance, and ongoing support. Higher tiers add more pages, service area pages, blog content, and advanced SEO.",
    },
    {
      category: "service",
      question: "How long does it take to build my website?",
      answer:
        "Most websites are designed, built, and ready for review within 3-5 business days. After you approve the design, we go live the same day. From signup to live site is typically under one week.",
    },
    {
      category: "service",
      question: "Is my website custom designed or a template?",
      answer:
        "Every BuildLocal site is custom designed for your business. We don't use off-the-shelf templates. Your site is built to match your brand, showcase your services, and convert visitors into customers.",
    },
    {
      category: "service",
      question: "Will my website be mobile-friendly?",
      answer:
        "Absolutely. Every site is built mobile-first, meaning it's designed for phones and tablets before scaling up to desktop. Over 60% of web traffic comes from mobile devices, and Google prioritizes mobile-friendly sites in search results.",
    },
    {
      category: "website",
      question: "Do I own my domain name?",
      answer:
        "Yes, you own your domain name. If you already have one, we'll connect it to your new site. If you need one, we'll help you register it in your name. Your domain is always yours.",
    },
    {
      category: "website",
      question: "What platform are the websites built on?",
      answer:
        "We build on modern, high-performance platforms optimized for speed, security, and SEO. You don't need to learn any CMS or software — we handle all updates and changes for you as part of your plan.",
    },
    {
      category: "website",
      question: "Can I request changes to my website after it's live?",
      answer:
        "Yes. Every plan includes a monthly change allowance (30 minutes to 2 hours depending on your tier). Need to update your hours, add a new service, swap out photos, or tweak copy? Just send us an email and we'll handle it.",
    },
    {
      category: "pricing",
      question: "How much does a BuildLocal website cost?",
      answer:
        "Plans range from $99 to $495 per month depending on the size and features you need. Starter is $99/mo for a single-page site, Professional is $195/mo for a multi-page site, Growth is $295/mo with advanced SEO and service area pages, and Premium is $495/mo with ongoing SEO and blog content. No setup fees on any plan.",
    },
    {
      category: "pricing",
      question: "What's the difference between the tiers?",
      answer:
        "Starter ($99/mo) is a single-page scrolling site — great for getting online fast. Professional ($195/mo) adds multiple pages for your services. Growth ($295/mo) includes service area pages, StoryBrand messaging, and blog-ready structure. Premium ($495/mo) adds monthly blog content, Google Business Profile optimization, local SEO, and quarterly performance reviews.",
    },
    {
      category: "pricing",
      question: "Are there any hidden fees?",
      answer:
        "None. Your monthly price covers everything: design, development, hosting, SSL, support, and your change allowance. The only additional cost would be your domain registration (~$12-15/year) if you don't already have one.",
    },
    {
      category: "process",
      question: "How does the process work from start to finish?",
      answer:
        "Step 1: Pick your plan and sign up. Step 2: We gather your business info, logo, photos, and preferences in a simple onboarding form. Step 3: We design and build your site in 3-5 days. Step 4: You review and request any changes. Step 5: We go live. After launch, we manage everything — hosting, updates, support, and SEO.",
    },
    {
      category: "process",
      question: "What do I need to provide to get started?",
      answer:
        "Your logo (if you have one), photos of your work or team, a list of your services, and your contact info. Don't have professional photos? No problem — we can source high-quality stock imagery that fits your industry. We'll write all the content for you.",
    },
    {
      category: "process",
      question: "How many revisions do I get before launch?",
      answer:
        "We include up to two rounds of revisions before launch at no extra cost. Most clients are happy after the first review. We want you to love your site before it goes live.",
    },
    {
      category: "general",
      question: "Who is BuildLocal?",
      answer:
        "BuildLocal is a productized web development agency that builds affordable, professionally managed websites for small businesses and trades companies. With 175+ websites built, 60+ sites under active management, and 8+ years of experience, we help local businesses get online and start generating leads without the headaches of DIY builders or expensive agencies.",
    },
    {
      category: "general",
      question: "What industries do you work with?",
      answer:
        "We work with trades and home services (plumbers, roofers, electricians, HVAC, painters), local service businesses (cleaning companies, landscapers, auto shops), salons and barbershops, professional services (accountants, consultants), restaurants, and health and wellness businesses. If you're a small business that serves local customers, we can help.",
    },
    {
      category: "general",
      question: "Do you only work with businesses in one area?",
      answer:
        "No. While we specialize in helping local businesses, we work with clients across the United States. Your website is built and managed remotely, so your location doesn't matter — our process works the same whether you're in Phoenix, Atlanta, or anywhere in between.",
    },
  ];

  const cluster = getCluster(slug || "buildlocal");
  const clusterFaqs = cluster.faqAdditions(locality || "", region || "");

  return [...baseFaqs, ...clusterFaqs];
}

export const expandedFaqs = getExpandedFaqs("Phoenix", "Arizona", "buildlocal");

/* ─── Agency Services Breakdown (cluster-aware) ─── */

const baseAgencyServices: AgencyService[] = [
  {
    slug: "website-design",
    title: "Website Design & Development",
    description:
      "Custom-designed, mobile-responsive websites built to convert visitors into leads and customers.",
    longDescription:
      "Every website we build is custom designed for your business — no templates, no cookie-cutter layouts. We focus on clean design, fast load times, clear messaging, and strong calls to action that drive phone calls, form submissions, and bookings. Your site is built mobile-first and optimized for every screen size.",
    icon: "Palette",
  },
  {
    slug: "website-management",
    title: "Website Management & Hosting",
    description:
      "Reliable hosting, SSL, backups, security monitoring, and ongoing maintenance — all included in your plan.",
    longDescription:
      "Your website is hosted on fast, secure infrastructure with SSL certificates, daily backups, uptime monitoring, and security patches — all managed by our team. You never need to worry about hosting bills, plugin updates, or security vulnerabilities. Everything is included in your monthly plan so your site stays fast, secure, and online 24/7.",
    icon: "Cloud",
  },
  {
    slug: "seo-local-search",
    title: "SEO & Local Search",
    description:
      "On-page SEO, local keyword targeting, and Google optimization so customers in your area can find you.",
    longDescription:
      "We build SEO into every site from the ground up. That includes optimized page titles, meta descriptions, header tags, image alt text, and locally targeted content. For higher-tier plans, we add service area pages, Google Business Profile optimization, and local citation building so you show up when customers search for your services nearby.",
    icon: "Search",
  },
  {
    slug: "google-business-profile",
    title: "Google Business Profile",
    description:
      "Claim, optimize, and manage your Google Business Profile to appear in Maps and local search results.",
    longDescription:
      "Your Google Business Profile is one of the most important assets for local visibility. We claim and verify your listing, optimize every field (categories, services, hours, photos, Q&A), and ensure your NAP (name, address, phone) is consistent across the web. Available with Growth and Premium plans to help you show up in the Map Pack.",
    icon: "MapPin",
  },
  {
    slug: "content-updates",
    title: "Content & Blog Writing",
    description:
      "Monthly content updates and SEO-optimized blog posts that keep your site fresh and drive organic traffic.",
    longDescription:
      "Fresh content tells Google your site is active and relevant. Every plan includes a monthly change allowance for updating your site. Premium plans include a monthly SEO-optimized blog post written by our team, targeting keywords your customers are searching for. More content means more pages ranking, more traffic, and more leads.",
    icon: "FileEdit",
  },
  {
    slug: "analytics-reporting",
    title: "Analytics & Performance",
    description:
      "Track visitors, leads, and performance with analytics and monthly reporting so you know your site is working.",
    longDescription:
      "We install analytics tracking on every site so you can see how many people visit, where they come from, and what actions they take. Premium plans include quarterly performance reviews where we walk you through the numbers and recommend improvements. Data-driven decisions help your site get better over time.",
    icon: "BarChart3",
  },
];

export function getAgencyServices(slug: string = "buildlocal"): AgencyService[] {
  const cluster = getCluster(slug);
  const overrides = cluster.seoServiceOverrides;

  return baseAgencyServices.map((svc) => {
    if (overrides[svc.slug]) {
      return { ...svc, longDescription: overrides[svc.slug] };
    }
    return svc;
  });
}

export const agencyServices: AgencyService[] = getAgencyServices("buildlocal");

/* ─── Comparison Table (cluster-aware) ─── */

const baseComparison: ComparisonRow[] = [
  {
    feature: "Custom design",
    buildLocal: "Professionally designed",
    diyBuilder: "Template-based",
    freelancer: "Varies wildly",
  },
  {
    feature: "Mobile optimization",
    buildLocal: true,
    diyBuilder: "Basic",
    freelancer: "Usually",
  },
  {
    feature: "SEO included",
    buildLocal: true,
    diyBuilder: "Minimal",
    freelancer: "Rarely",
  },
  {
    feature: "Hosting included",
    buildLocal: true,
    diyBuilder: "Extra cost",
    freelancer: false,
  },
  {
    feature: "Ongoing updates",
    buildLocal: "Included monthly",
    diyBuilder: "You do it yourself",
    freelancer: "$75-150/hr",
  },
  {
    feature: "Monthly cost",
    buildLocal: "$99-$495/mo",
    diyBuilder: "$15-40/mo + your time",
    freelancer: "$0 + hourly fees",
  },
  {
    feature: "Time to launch",
    buildLocal: "Under 1 week",
    diyBuilder: "Weeks to months",
    freelancer: "4-12 weeks",
  },
  {
    feature: "Support",
    buildLocal: "Dedicated team",
    diyBuilder: "Help docs only",
    freelancer: "Email if lucky",
  },
  {
    feature: "Content updates",
    buildLocal: "We handle it",
    diyBuilder: "DIY",
    freelancer: "$75-150/hr",
  },
  {
    feature: "Lead generation",
    buildLocal: "Built-in CTAs & forms",
    diyBuilder: "Basic contact form",
    freelancer: "Depends",
  },
  {
    feature: "SSL & security",
    buildLocal: true,
    diyBuilder: true,
    freelancer: "Sometimes",
  },
  {
    feature: "Performance monitoring",
    buildLocal: true,
    diyBuilder: false,
    freelancer: false,
  },
];

export function getComparison(slug: string = "buildlocal"): ComparisonRow[] {
  const cluster = getCluster(slug);
  const extras = cluster.platformComparisonExtras;
  if (extras.length === 0) return baseComparison;
  return [...baseComparison, ...extras];
}

export const comparison: ComparisonRow[] = getComparison("buildlocal");

/* ─── Industries Served (cluster-aware) ─── */

export function getIndustriesServed(
  locality: string,
  region: string,
  slug?: string
): IndustryItem[] {
  const cluster = getCluster(slug || "buildlocal");
  return cluster.industries(locality, region);
}

export const industriesServed = getIndustriesServed(
  "Phoenix",
  "Arizona",
  "buildlocal"
);

/* ─── Pricing Tiers (cluster-aware) ─── */

export function getPricingTiers(slug: string = "buildlocal"): PricingTier[] {
  const cluster = getCluster(slug);
  return cluster.pricingTiers;
}

export const pricingTiers: PricingTier[] = getPricingTiers("buildlocal");
