import { FAQItem, ProcessStep } from "./config";

export interface ServicePageConfig {
  slug: string;
  title: string;
  eyebrow: string;
  problemEyebrow: string;
  problemHeading: string;
  processHeading: string;
  metaTitle: (locality: string, region: string) => string;
  metaDescription: (locality: string, region: string) => string;
  heroH1: (locality: string, region: string) => string;
  heroSubhead: (locality: string, region: string) => string;
  heroQualifier: (locality: string, region: string) => string;
  painPoints: { title: string; description: string }[];
  processSteps: ProcessStep[];
  faqs: (locality: string, region: string) => FAQItem[];
  showComparison: boolean;
  showPortfolio: boolean;
}

/* ─── Service Page Configs ─── */

export const serviceMap: Record<string, ServicePageConfig> = {
  "website-design": {
    slug: "website-design",
    title: "Website Design & Development",
    eyebrow: "Custom Website Design",
    problemEyebrow: "Why Your Current Site Isn't Working",
    problemHeading: "An outdated website is worse than no website at all.",
    processHeading: "How we build your website in four steps.",
    metaTitle: (locality, region) =>
      `Website Design ${locality} | Affordable ${region} Web Design`,
    metaDescription: (locality, region) =>
      `Custom website design for small businesses in ${locality}, ${region}. Mobile-friendly, fast-loading sites that turn visitors into customers. Starting at $99/month.`,
    heroH1: (_locality, region) =>
      `Website Design That Actually Works for ${region} Small Businesses`,
    heroSubhead: (_locality, region) =>
      `Your website is your hardest-working employee — it should look the part. We build custom, mobile-first websites for ${region} businesses that load fast, look sharp, and turn visitors into paying customers.`,
    heroQualifier: (_locality, region) =>
      `For ${region} small businesses that want a professional website without the $10,000 price tag.`,
    painPoints: [
      {
        title: "Your outdated design is losing trust",
        description:
          "75% of people judge a business's credibility based on their website. If yours looks like it was built in 2015, visitors bounce before they ever pick up the phone.",
      },
      {
        title: "Your site isn't mobile-friendly",
        description:
          "Over 60% of web traffic comes from phones. If your site is hard to read, slow to load, or impossible to navigate on mobile, you're turning away most of your visitors.",
      },
      {
        title: "Slow loading is killing your leads",
        description:
          "Every second of load time costs you 7% in conversions. If your site takes 4+ seconds, more than half your visitors leave before they see a single word.",
      },
      {
        title: "No clear calls to action",
        description:
          "Visitors land on your site and have no idea what to do next. No obvious phone number, no contact form above the fold, no reason to reach out. They leave and call someone else.",
      },
      {
        title: "Your site looks like every other template",
        description:
          "Cookie-cutter templates make your business look generic. Customers can't tell you apart from the next company. A custom design reflects what makes your business different.",
      },
    ],
    processSteps: [
      {
        step: 1,
        title: "Discovery",
        description:
          "We learn your business inside and out — your customers, your services, what makes you different, and what you need your website to accomplish.",
      },
      {
        step: 2,
        title: "Design",
        description:
          "We create a custom layout tailored to your brand and audience. You review the design and we refine it until it's exactly right.",
      },
      {
        step: 3,
        title: "Build",
        description:
          "We develop your site with clean code, fast loading speeds, mobile responsiveness, and SEO fundamentals baked in from the start.",
      },
      {
        step: 4,
        title: "Launch",
        description:
          "We go live, set up analytics, and walk you through everything. You'll know how to make basic updates and we're always a call away.",
      },
    ],
    faqs: (locality, region) => [
      {
        category: "process",
        question: "How long does it take to build a website?",
        answer: `Most websites for ${region} small businesses are designed, built, and launched within 2-3 weeks. Larger or more complex sites may take 4-6 weeks. We keep you in the loop at every stage so there are no surprises.`,
      },
      {
        category: "website",
        question: "How many revisions do I get on the design?",
        answer: `All of our plans include two rounds of revisions on the initial design. In practice, we nail it on the first or second round because we spend so much time on the discovery phase upfront. Additional revision rounds are available if needed.`,
      },
      {
        category: "website",
        question: "Will my website be mobile-friendly?",
        answer: `Absolutely. Every website we build is mobile-first — meaning we design for phones first and scale up to desktop. Over 60% of your ${locality} customers are browsing on their phone, so mobile performance is non-negotiable.`,
      },
      {
        category: "service",
        question: "Do you build custom designs or use templates?",
        answer: `Every site we build starts with a custom layout designed specifically for your business. We don't use off-the-shelf templates. That said, we use proven design patterns that convert visitors into customers — so your site is unique AND effective.`,
      },
      {
        category: "general",
        question: "What if I already have a website that just needs a refresh?",
        answer: `We handle redesigns all the time. We'll audit your current site, keep what's working, and rebuild the rest. If your existing site has good SEO authority or content, we preserve that during the migration so you don't lose any ground in search rankings.`,
      },
    ],
    showComparison: true,
    showPortfolio: true,
  },

  "website-management": {
    slug: "website-management",
    title: "Website Management & Hosting",
    eyebrow: "Managed Website Services",
    problemEyebrow: "Why Managing Your Own Site Is a Headache",
    problemHeading: "You didn't start a business to manage a website.",
    processHeading: "How we keep your site running perfectly.",
    metaTitle: (locality, region) =>
      `Website Management ${locality} | ${region} Managed Hosting`,
    metaDescription: (locality, region) =>
      `Managed website hosting and maintenance for ${region} businesses. Uptime monitoring, monthly updates, backups, and security — all handled for you. Plans from $99/month in ${locality}.`,
    heroH1: (_locality, region) =>
      `Website Management & Hosting for ${region} Businesses`,
    heroSubhead: (_locality, region) =>
      `Your website should work for you, not the other way around. We handle the hosting, updates, backups, and security so you can focus on running your ${region} business.`,
    heroQualifier: (_locality, region) =>
      `For ${region} business owners who are tired of worrying about their website breaking, going down, or getting hacked.`,
    painPoints: [
      {
        title: "Your site goes down and you don't know",
        description:
          "Your website has been offline for 3 hours and the only reason you found out is because a customer told you. Every hour of downtime is lost revenue and lost trust.",
      },
      {
        title: "You can't make updates yourself",
        description:
          "Need to change your hours, add a new service, or update a photo? You either can't figure out how or you're terrified of breaking something.",
      },
      {
        title: "No backups means one mistake away from disaster",
        description:
          "If your site gets hacked, your hosting crashes, or someone accidentally deletes a page, you could lose everything. Most small business sites have zero backup strategy.",
      },
      {
        title: "Security vulnerabilities are stacking up",
        description:
          "Outdated plugins, expired SSL certificates, and unpatched software leave your site wide open to hackers. A compromised site can destroy customer trust overnight.",
      },
      {
        title: "Paying a developer $150/hr for small changes",
        description:
          "You need a quick text change or a new photo and your freelancer charges $150 for 15 minutes of work. Small updates shouldn't cost a fortune.",
      },
    ],
    processSteps: [
      {
        step: 1,
        title: "Onboard",
        description:
          "We migrate your existing site to our managed hosting or set up your new site. Everything is configured for speed, security, and reliability from day one.",
      },
      {
        step: 2,
        title: "Monitor",
        description:
          "We monitor your site 24/7 for uptime, performance, and security threats. If something goes wrong, we catch it and fix it before you even notice.",
      },
      {
        step: 3,
        title: "Update",
        description:
          "Need changes? Send us a text, email, or quick request. We handle monthly content updates, software patches, and plugin updates so your site stays fresh and secure.",
      },
      {
        step: 4,
        title: "Report",
        description:
          "Every month you get a clear report: uptime stats, what we updated, traffic overview, and recommendations for what's working and what to improve.",
      },
    ],
    faqs: (locality, region) => [
      {
        category: "service",
        question: "What does managed website hosting include?",
        answer: `Our managed hosting includes fast, secure hosting on premium servers, 24/7 uptime monitoring, daily backups, SSL certificates, software and plugin updates, and security scanning. Everything a ${region} small business needs to keep their site running without lifting a finger.`,
      },
      {
        category: "service",
        question: "What kind of uptime can I expect?",
        answer: `We guarantee 99.9% uptime. Our hosting infrastructure is built for reliability, and we monitor every site around the clock. If your site goes down, we're alerted instantly and start fixing it — usually before you even know there's an issue.`,
      },
      {
        category: "billing",
        question: "How many updates are included each month?",
        answer: `Our standard plan includes up to 2 hours of content updates per month — that covers things like text changes, new photos, adding a staff member, updating hours, or tweaking a page layout. Most ${locality} businesses find that's more than enough for their needs.`,
      },
      {
        category: "process",
        question: "What if I need a bigger change or a new page?",
        answer: `Larger changes like adding new pages, building out a new section, or redesigning a page are handled as mini-projects. We'll scope it, give you a flat quote, and get it done quickly. No surprise hourly bills.`,
      },
      {
        category: "website",
        question: "Are backups included? How often do you back up my site?",
        answer: `Yes, daily backups are included with every plan. We keep 30 days of backup history, so if anything ever goes wrong — a bad update, accidental deletion, or security issue — we can restore your site to any point in the last month.`,
      },
    ],
    showComparison: false,
    showPortfolio: true,
  },

  "seo-local-search": {
    slug: "seo-local-search",
    title: "SEO & Local Search",
    eyebrow: "Local SEO Services",
    problemEyebrow: "Why Your Customers Can't Find You",
    problemHeading: "If you're not on page 1, you don't exist.",
    processHeading: "How we get your business found online.",
    metaTitle: (locality, region) =>
      `Local SEO Services ${locality} | Get Found in ${region}`,
    metaDescription: (locality, region) =>
      `Local SEO for small businesses in ${locality}, ${region}. Google Business Profile optimization, local search rankings, and more customers finding you online. Free audit.`,
    heroH1: (_locality, region) =>
      `Local SEO That Gets ${region} Businesses Found`,
    heroSubhead: (_locality, region) =>
      `46% of all Google searches have local intent. When someone in ${region} searches for what you do, they should find you — not your competitor down the street. We make that happen.`,
    heroQualifier: (_locality, region) =>
      `For ${region} small businesses that want to show up when local customers are searching.`,
    painPoints: [
      {
        title: "You're invisible on Google",
        description:
          "You search for your own service in your own city and you can't even find yourself. If you can't find you, your customers definitely can't either.",
      },
      {
        title: "Competitors are showing up first",
        description:
          "Your competitors rank above you for every important search. They're not better at what they do — they just have better SEO. That's fixable.",
      },
      {
        title: "No Google Business Profile strategy",
        description:
          "Your GBP is either unclaimed, incomplete, or hasn't been touched in months. It's the single biggest factor in local search visibility and you're leaving it on the table.",
      },
      {
        title: "No reviews strategy",
        description:
          "Your competitors have 200+ reviews and a 4.8 rating. You have a handful of old reviews. Google uses review quantity and quality as a major ranking factor.",
      },
      {
        title: "Your website has zero SEO",
        description:
          "No meta titles, no local keywords, no schema markup, no internal linking strategy. Your website looks fine but Google has no idea what it's about or where you serve.",
      },
    ],
    processSteps: [
      {
        step: 1,
        title: "Audit",
        description:
          "We analyze your current visibility — where you rank, where you don't, what your competitors are doing, and exactly what's holding you back.",
      },
      {
        step: 2,
        title: "Optimize",
        description:
          "We optimize your website with local keywords, meta tags, schema markup, and location-specific content so Google knows what you do and where you do it.",
      },
      {
        step: 3,
        title: "Build",
        description:
          "We optimize your Google Business Profile, build local citations across directories, and ensure your business info is consistent everywhere online.",
      },
      {
        step: 4,
        title: "Grow",
        description:
          "We create ongoing content, build local authority, implement a review strategy, and continuously improve your rankings month over month.",
      },
    ],
    faqs: (locality, region) => [
      {
        category: "process",
        question: "How long does SEO take to show results?",
        answer: `Most ${region} businesses see noticeable improvements in local search rankings within 60-90 days. Significant traffic and lead increases typically happen in the 4-6 month range. SEO is a long game, but it compounds — the longer you invest, the bigger the returns.`,
      },
      {
        category: "service",
        question: "What's included in your local SEO service?",
        answer: `Our local SEO service includes Google Business Profile optimization, on-page SEO for your website, local citation building, review strategy, monthly content updates, and regular reporting. Everything a ${locality} business needs to climb the local search rankings.`,
      },
      {
        category: "general",
        question: "What's the difference between local SEO and national SEO?",
        answer: `Local SEO focuses on ranking for searches in your specific area — things like "plumber in ${locality}" or "best restaurant near me." National SEO targets broader keywords without a geographic focus. For most small businesses, local SEO delivers the best ROI because you're reaching people who can actually walk through your door.`,
      },
      {
        category: "service",
        question: "Do you manage our Google Business Profile?",
        answer: `Yes. GBP management is a core part of our local SEO service. We optimize every field, add photos, post regular updates, manage Q&A, and help you build a review acquisition strategy. For ${region} businesses, your GBP is often the first thing customers see — we make sure it looks great.`,
      },
      {
        category: "website",
        question: "How does SEO work together with my website?",
        answer: `Your website is the foundation of your SEO. We optimize your site's content, structure, and technical performance so Google can understand and rank it. A great website without SEO is invisible. Good SEO without a solid website sends people to a dead end. They work best together.`,
      },
    ],
    showComparison: false,
    showPortfolio: true,
  },

  "google-business-profile": {
    slug: "google-business-profile",
    title: "Google Business Profile Optimization",
    eyebrow: "Google Business Profile",
    problemEyebrow: "Why You're Missing the Map Pack",
    problemHeading:
      "42% of local clicks go to the top 3 Map Pack results.",
    processHeading: "How we optimize your Google presence.",
    metaTitle: (locality, region) =>
      `Google Business Profile ${locality} | ${region} GBP Optimization`,
    metaDescription: (locality, region) =>
      `Google Business Profile optimization for ${region} businesses. Get into the Map Pack, earn more reviews, and turn Google searches into phone calls. Serving ${locality}.`,
    heroH1: (_locality, region) =>
      `Google Business Profile Optimization for ${region} Businesses`,
    heroSubhead: (_locality, region) =>
      `The Map Pack is the most valuable real estate on Google — and 42% of local clicks go to the top 3 results. We get your ${region} business into that top spot.`,
    heroQualifier: (_locality, region) =>
      `For ${region} businesses that want more calls, more directions requests, and more customers from Google Maps.`,
    painPoints: [
      {
        title: "Your profile is unclaimed or incomplete",
        description:
          "If you haven't claimed your Google Business Profile — or if half the fields are empty — Google has no reason to show you over a competitor who has a fully optimized listing.",
      },
      {
        title: "You have few or no reviews",
        description:
          "Reviews are the second biggest ranking factor for the Map Pack. Your competitors have hundreds. You have a handful. Every missing review is a missed opportunity to rank higher.",
      },
      {
        title: "Your business info is outdated",
        description:
          "Wrong hours, old phone number, missing services, no photos. Customers see an incomplete profile and assume you're not a serious business — or worse, that you're closed.",
      },
      {
        title: "You're not showing up in the Map Pack",
        description:
          "When customers search for your service in your area, the top 3 Map Pack results get the lion's share of clicks. If you're not there, you're handing those customers to competitors.",
      },
      {
        title: "Competitors have better profiles than you",
        description:
          "They have professional photos, hundreds of reviews, weekly posts, and complete service listings. Their profile looks like a thriving business. Yours looks like an afterthought.",
      },
    ],
    processSteps: [
      {
        step: 1,
        title: "Claim & Verify",
        description:
          "We claim your Google Business Profile (or take over management of your existing one) and verify ownership so you have full control of your listing.",
      },
      {
        step: 2,
        title: "Optimize",
        description:
          "We complete every single field — categories, services, attributes, business description, photos, and more. A fully optimized profile signals to Google that you're a legit, active business.",
      },
      {
        step: 3,
        title: "Reviews",
        description:
          "We implement a review acquisition strategy that makes it easy for happy customers to leave reviews. More reviews, better ratings, higher rankings.",
      },
      {
        step: 4,
        title: "Maintain",
        description:
          "We post weekly updates, manage Q&A, add new photos, and keep your profile active. Google rewards businesses that actively maintain their profiles.",
      },
    ],
    faqs: (locality, region) => [
      {
        category: "general",
        question: "Why is Google Business Profile so important?",
        answer: `Your Google Business Profile is often the very first thing customers see when they search for your type of business in ${region}. It shows up in the Map Pack, in Google Maps, and in the knowledge panel. For most local businesses, GBP drives more calls and visits than the website itself.`,
      },
      {
        category: "process",
        question: "How do you help us get more reviews?",
        answer: `We set up a simple, repeatable review system — think a follow-up text or email with a direct link to your Google review page. We make it so easy for happy customers that leaving a review takes 30 seconds. We also coach you on when and how to ask.`,
      },
      {
        category: "process",
        question: `How long does it take to rank in the Map Pack in ${locality}?`,
        answer: `It depends on your competition, but most ${region} businesses see meaningful Map Pack improvements within 60-90 days of full optimization. Some less competitive markets see results even faster. Consistency is key — the businesses that maintain their profiles monthly see the best long-term results.`,
      },
      {
        category: "service",
        question: "What exactly do you manage on our profile?",
        answer: `Everything. We manage your business info, categories, services, photos, Google Posts, Q&A, review responses, and performance tracking. You don't have to touch it — but you'll always have full access and visibility into what we're doing.`,
      },
      {
        category: "pricing",
        question: "How much does GBP optimization cost?",
        answer: `GBP optimization is included in our website management plans starting at $99/month. For businesses that want standalone GBP management without a website, we offer dedicated plans as well. Either way, the ROI is hard to beat — a single new customer from Google Maps pays for months of management.`,
      },
    ],
    showComparison: false,
    showPortfolio: true,
  },
};

export function getServiceConfig(slug: string): ServicePageConfig | undefined {
  return serviceMap[slug];
}

export function getAllServiceSlugs(): string[] {
  return Object.keys(serviceMap);
}
