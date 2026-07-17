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
      `Custom website design for small businesses in ${locality}, ${region}. Mobile-friendly, fast-loading sites that turn visitors into customers. Buy outright for $3,500 or free with a marketing plan.`,
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
      `Managed website hosting and maintenance for ${region} businesses. Uptime monitoring, updates, backups, and security — all handled for you. Included free with any marketing plan from $300/month in ${locality}.`,
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
        answer: `GBP optimization is included in our marketing plans starting at $300/month. For businesses that want standalone GBP management, we offer dedicated plans as well. Either way, the ROI is hard to beat — a single new customer from Google Maps pays for months of management.`,
      },
    ],
    showComparison: false,
    showPortfolio: true,
  },

  /* ════════════════════════════════════════════════════════════
     MARKETING SERVICES — SEO, Google Ads, Facebook Ads, AEO
     ════════════════════════════════════════════════════════════ */

  seo: {
    slug: "seo",
    title: "Search Engine Optimization",
    eyebrow: "SEO Services",
    problemEyebrow: "Why You're Not Showing Up on Google",
    problemHeading: "If you're not on page one, you don't exist.",
    processHeading: "How we get you ranking in four steps.",
    metaTitle: (locality, region) =>
      `SEO Services ${locality} | Local SEO for ${region} Businesses — BuildLocal`,
    metaDescription: (locality, region) =>
      `Local SEO that gets ${region} businesses found on Google. Rank for the searches your customers actually use and turn organic traffic into booked jobs. Included with marketing plans from $300/month. No contracts.`,
    heroH1: (_locality, region) =>
      `SEO That Gets ${region} Businesses to the Top of Google`,
    heroSubhead: (_locality, region) =>
      `When someone searches for what you do, you need to be the first name they see. We build local SEO campaigns that get ${region} businesses ranking, drive qualified traffic, and turn searches into booked jobs.`,
    heroQualifier: (_locality, region) =>
      `For ${region} businesses that want steady, compounding leads from Google instead of paying for every single click.`,
    painPoints: [
      {
        title: "You're buried on page two or worse",
        description:
          "Three-quarters of people never scroll past the first page of Google. If you're not in the top results for your services, your competitors are getting the calls that should be yours.",
      },
      {
        title: "You're paying for every lead",
        description:
          "Shared lead platforms and paid ads charge you again and again. SEO builds an asset that keeps generating leads long after the work is done — at a lower cost per lead every month.",
      },
      {
        title: "Your site isn't built for search",
        description:
          "Missing title tags, slow pages, no local content, no schema. Google can't tell what you do or where you do it, so it ranks someone else ahead of you.",
      },
      {
        title: "You have no Google Maps presence",
        description:
          "The local map pack is where local searches convert. Without an optimized Google Business Profile, reviews, and consistent listings, you're invisible in local search.",
      },
      {
        title: "You don't know what's working",
        description:
          "No tracking, no reporting, no idea which keywords bring calls. You're flying blind and can't tell whether your marketing is actually paying off.",
      },
    ],
    processSteps: [
      {
        step: 1,
        title: "Audit & Research",
        description:
          "We audit your website, analyze your competitors, and identify the exact keywords your customers are actually searching for.",
      },
      {
        step: 2,
        title: "On-Page & Technical",
        description:
          "We optimize titles, meta, headings, schema, site speed, and content so Google clearly understands and trusts your site.",
      },
      {
        step: 3,
        title: "Local & Off-Page",
        description:
          "We optimize your Google Business Profile, build local citations, and earn quality links that grow your authority.",
      },
      {
        step: 4,
        title: "Content & Reporting",
        description:
          "We publish targeted content every month and send you clear reports showing your rankings, traffic, and leads.",
      },
    ],
    faqs: (locality, region) => [
      {
        category: "process",
        question: "How long does SEO take to work?",
        answer: `SEO is a long-term investment. Most ${region} businesses see meaningful movement within 3-4 months and significant results by 6-12 months. Unlike ads, those results compound and keep paying off after you stop spending.`,
      },
      {
        category: "pricing",
        question: "How much does SEO cost?",
        answer: `SEO is included in our marketing plans starting at $300/month, with more aggressive campaigns in our $500-$1,500/month tiers. There are no setup fees and no contracts — you can cancel anytime.`,
      },
      {
        category: "service",
        question: "Do you guarantee #1 rankings?",
        answer: `No honest SEO company guarantees a specific position — Google's algorithm changes constantly. What we guarantee is proven, white-hat work: technical fixes, quality content, and local optimization that reliably moves your rankings up over time.`,
      },
      {
        category: "service",
        question: "What's the difference between SEO and Google Ads?",
        answer: `Google Ads put you at the top instantly but stop the moment you stop paying. SEO takes longer but builds lasting visibility at a declining cost per lead. Most ${locality} businesses do best running both together — we can manage that for you.`,
      },
      {
        category: "general",
        question: "Will SEO work for my industry?",
        answer: `Local SEO works for virtually any business that serves a geographic area — trades, home services, professional services, retail, and more. The less your competitors invest in SEO, the faster you can win.`,
      },
    ],
    showComparison: false,
    showPortfolio: true,
  },

  "google-ads": {
    slug: "google-ads",
    title: "Google Ads Management",
    eyebrow: "Google Ads (PPC)",
    problemEyebrow: "Why Most Google Ads Waste Money",
    problemHeading: "Most businesses light their ad budget on fire.",
    processHeading: "How we turn clicks into customers in four steps.",
    metaTitle: (locality, region) =>
      `Google Ads Management ${locality} | PPC for ${region} Businesses — BuildLocal`,
    metaDescription: (locality, region) =>
      `Google Ads management that turns clicks into calls for ${region} businesses. Show up at the top of Google instantly, stop wasting spend, and track every lead. Managed in our marketing plans from $300/month.`,
    heroH1: (_locality, region) =>
      `Google Ads That Bring ${region} Customers Calling Today`,
    heroSubhead: (_locality, region) =>
      `SEO is a marathon — Google Ads is the sprint. We build and manage high-converting search campaigns that put your ${region} business at the very top of Google the moment customers search, so the phone starts ringing now.`,
    heroQualifier: (_locality, region) =>
      `For ${region} businesses that want qualified leads immediately, with a managed campaign that doesn't waste a single dollar.`,
    painPoints: [
      {
        title: "You're bidding on the wrong keywords",
        description:
          "Broad, untargeted keywords burn through your budget on clicks that never convert. We target high-intent searches from people who are ready to buy.",
      },
      {
        title: "No negative keywords, wasted spend",
        description:
          "Without a tight negative keyword list, you pay for irrelevant clicks all day long. Most DIY accounts waste 30-50% of their budget right here.",
      },
      {
        title: "Your ads send people to a weak page",
        description:
          "Sending paid traffic to a generic homepage kills conversions. The right landing page can double or triple the leads you get from the same spend.",
      },
      {
        title: "You can't tell which ads make money",
        description:
          "No call tracking, no conversion tracking, no idea what your cost per lead is. You can't optimize what you don't measure.",
      },
      {
        title: "You set it and forgot it",
        description:
          "Google Ads needs constant tuning — bids, keywords, ad copy, and budgets shift every week. An unmanaged account quietly bleeds money.",
      },
    ],
    processSteps: [
      {
        step: 1,
        title: "Strategy & Setup",
        description:
          "We research your market, build a tightly targeted keyword list, and structure campaigns around the searches most likely to become customers.",
      },
      {
        step: 2,
        title: "Ads & Landing Pages",
        description:
          "We write compelling ad copy and build conversion-focused landing pages so every click has the best chance to become a lead.",
      },
      {
        step: 3,
        title: "Tracking & Launch",
        description:
          "We set up call and conversion tracking, then launch with controlled budgets and scale what works.",
      },
      {
        step: 4,
        title: "Optimize & Report",
        description:
          "We tune bids, keywords, and copy continuously, and send you clear reports showing spend, leads, and cost per lead.",
      },
    ],
    faqs: (locality, region) => [
      {
        category: "pricing",
        question: "How much should I spend on Google Ads?",
        answer: `Ad spend is separate from our management fee and goes directly to Google. Most ${region} small businesses start with $500-$2,000/month in ad spend depending on their market and goals. We'll recommend a budget based on your industry and the cost per lead in your area.`,
      },
      {
        category: "pricing",
        question: "Is management included in my plan?",
        answer: `Google Ads management is available in our Premium and Dominate marketing plans. The monthly plan covers our management; your ad spend is billed separately by Google so you stay in full control of your budget.`,
      },
      {
        category: "process",
        question: "How fast will I see leads?",
        answer: `Fast — that's the whole point of paid ads. Campaigns typically start generating clicks within 24-48 hours of launch and qualified leads within the first week or two as we optimize.`,
      },
      {
        category: "service",
        question: "Google Ads or SEO — which should I do?",
        answer: `Ads deliver leads immediately but stop when you stop paying. SEO builds lasting visibility over months. The smartest play for most ${locality} businesses is both: ads for immediate leads while SEO compounds in the background.`,
      },
      {
        category: "billing",
        question: "Do you manage the budget so I don't overspend?",
        answer: `Yes. We set daily and monthly caps, monitor spend closely, and you'll never be charged more than your agreed budget. You see exactly where every dollar goes.`,
      },
    ],
    showComparison: false,
    showPortfolio: true,
  },

  "facebook-ads": {
    slug: "facebook-ads",
    title: "Facebook & Instagram Ads",
    eyebrow: "Meta Ads (Facebook & Instagram)",
    problemEyebrow: "Why Boosting Posts Doesn't Work",
    problemHeading: "Boosting a post is not a marketing strategy.",
    processHeading: "How we build a Meta ad engine in four steps.",
    metaTitle: (locality, region) =>
      `Facebook & Instagram Ads ${locality} | Meta Ads for ${region} Businesses — BuildLocal`,
    metaDescription: (locality, region) =>
      `Facebook and Instagram ads that fill the pipeline for ${region} businesses. Reach local customers, generate leads, and retarget visitors who didn't convert. Managed in our marketing plans from $300/month.`,
    heroH1: (_locality, region) =>
      `Facebook & Instagram Ads That Put Your ${region} Business in Front of Local Customers`,
    heroSubhead: (_locality, region) =>
      `Your future customers are scrolling right now. We build and manage Facebook and Instagram ad campaigns that get ${region} businesses in front of the right local audience — with thumb-stopping creative and offers that convert.`,
    heroQualifier: (_locality, region) =>
      `For ${region} businesses that want to generate demand, not just wait for it, with social ads that actually drive leads.`,
    painPoints: [
      {
        title: "Boosting posts wastes money",
        description:
          "The 'Boost' button optimizes for likes, not customers. Real campaigns use proper targeting, objectives, and creative built to generate leads.",
      },
      {
        title: "You're targeting the wrong people",
        description:
          "Showing your ads to everyone means wasting budget on people who'll never buy. We target by location, interests, and behavior to reach ready buyers.",
      },
      {
        title: "Your creative gets scrolled past",
        description:
          "On social, the creative is the campaign. Weak images and generic copy get ignored. We build scroll-stopping ads designed for your audience.",
      },
      {
        title: "No follow-up, no retargeting",
        description:
          "97% of visitors don't convert the first time. Without retargeting, you lose them forever. We bring them back with the right message at the right time.",
      },
      {
        title: "You can't tell if it's working",
        description:
          "Vanity metrics like reach and likes don't pay the bills. We track leads and cost per lead so you know exactly what your ads return.",
      },
    ],
    processSteps: [
      {
        step: 1,
        title: "Audience & Offer",
        description:
          "We define your ideal local audience and craft an offer compelling enough to stop the scroll and drive action.",
      },
      {
        step: 2,
        title: "Creative & Copy",
        description:
          "We design thumb-stopping images and video with copy written to generate clicks, leads, and messages.",
      },
      {
        step: 3,
        title: "Launch & Pixel",
        description:
          "We install the Meta Pixel, set up lead tracking, and launch campaigns with audiences built to convert.",
      },
      {
        step: 4,
        title: "Optimize & Retarget",
        description:
          "We test creative, scale the winners, and retarget people who engaged but didn't convert — then report on every lead.",
      },
    ],
    faqs: (locality, region) => [
      {
        category: "pricing",
        question: "How much do Facebook ads cost?",
        answer: `Like Google Ads, your ad spend is separate from our management fee and goes directly to Meta. Most ${region} businesses start around $400-$1,500/month in ad spend. We'll recommend a budget based on your goals and audience size.`,
      },
      {
        category: "pricing",
        question: "Is Facebook ads management in my plan?",
        answer: `Meta ads management is available in our Premium and Dominate plans. Your monthly plan covers strategy, creative, and management; ad spend is billed separately by Meta.`,
      },
      {
        category: "service",
        question: "Do Facebook ads work for trades and local businesses?",
        answer: `Absolutely. Facebook and Instagram are powerful for local lead generation, brand awareness, and retargeting — especially for home services, contractors, and any business with strong before-and-after visuals.`,
      },
      {
        category: "service",
        question: "Will you make the ad creative?",
        answer: `Yes. We design the images, write the copy, and can produce simple video ads. If you have project photos or job-site footage, even better — authentic local creative often outperforms polished stock.`,
      },
      {
        category: "general",
        question: "Facebook ads or Google ads?",
        answer: `Google Ads capture people actively searching for your service. Facebook and Instagram create demand by putting you in front of local people before they search. Many ${locality} businesses run both to both capture and create demand.`,
      },
    ],
    showComparison: false,
    showPortfolio: true,
  },

  aeo: {
    slug: "aeo",
    title: "Answer Engine Optimization (AEO)",
    eyebrow: "AEO & AI Search",
    problemEyebrow: "Why AI Search Changes Everything",
    problemHeading: "Your customers are asking AI — not just Google — now.",
    processHeading: "How we get you cited by AI in four steps.",
    metaTitle: (locality, region) =>
      `AEO Services ${locality} | AI Search Optimization for ${region} Businesses — BuildLocal`,
    metaDescription: (locality, region) =>
      `Get your ${region} business recommended by ChatGPT, Google AI Overviews, and Perplexity. Answer Engine Optimization (AEO) for the new era of AI search. Included with marketing plans from $300/month.`,
    heroH1: (_locality, region) =>
      `Get Your ${region} Business Recommended by AI Search`,
    heroSubhead: (_locality, region) =>
      `More people are asking ChatGPT, Perplexity, and Google's AI Overviews for recommendations instead of scrolling search results. We optimize your ${region} business so it's the one AI cites and recommends when customers ask.`,
    heroQualifier: (_locality, region) =>
      `For forward-thinking ${region} businesses that want to win the next era of search before their competitors even know it exists.`,
    painPoints: [
      {
        title: "AI is answering instead of linking",
        description:
          "Google AI Overviews and ChatGPT now answer questions directly, often without a single click to a website. If you're not the source they cite, you're invisible in AI search.",
      },
      {
        title: "Your content isn't AI-readable",
        description:
          "AI engines pull from clear, well-structured, factual content. If your site is thin, vague, or poorly structured, AI skips you for a competitor it can understand.",
      },
      {
        title: "No structured data or entity signals",
        description:
          "AI relies on schema markup, consistent business info, and authority signals to know who you are and trust you. Without them, you never make the shortlist.",
      },
      {
        title: "Competitors are getting cited, not you",
        description:
          "When someone asks AI for the best option near them, a name comes up. Make sure it's yours — not the competitor who optimized for AI first.",
      },
      {
        title: "You have no idea if AI mentions you",
        description:
          "Most businesses have never checked whether ChatGPT or Perplexity recommends them. We track your AI visibility so you know where you stand and how to improve.",
      },
    ],
    processSteps: [
      {
        step: 1,
        title: "AI Visibility Audit",
        description:
          "We check whether ChatGPT, Perplexity, and Google AI Overviews currently mention your business — and what they say about your competitors.",
      },
      {
        step: 2,
        title: "Content & Structure",
        description:
          "We create clear, question-and-answer style content and passages built to be quoted and cited by AI engines.",
      },
      {
        step: 3,
        title: "Schema & Entity Signals",
        description:
          "We add structured data, tighten your business information across the web, and build the authority signals AI trusts.",
      },
      {
        step: 4,
        title: "Track & Improve",
        description:
          "We monitor your citations and visibility across AI platforms and refine continuously as the engines evolve.",
      },
    ],
    faqs: (locality, region) => [
      {
        category: "service",
        question: "What is AEO (Answer Engine Optimization)?",
        answer: `AEO is the practice of optimizing your business to be recommended and cited by AI answer engines like ChatGPT, Google AI Overviews, Perplexity, and Copilot. It's the natural evolution of SEO for a world where AI answers questions directly.`,
      },
      {
        category: "service",
        question: "Is AEO different from SEO?",
        answer: `They overlap but aren't the same. SEO aims to rank your pages in search results; AEO aims to make your business the answer AI gives. Strong SEO foundations help, but AEO adds the structured content, entity signals, and citability that AI engines specifically reward. We do both together.`,
      },
      {
        category: "general",
        question: "Does AEO actually drive customers?",
        answer: `Increasingly, yes. A growing share of searches now end with an AI answer instead of a click. Being the business AI recommends puts you in front of high-intent ${region} customers at the exact moment they're deciding — often before they ever reach a traditional search result.`,
      },
      {
        category: "pricing",
        question: "How much does AEO cost?",
        answer: `AEO is built into our marketing plans starting at $300/month and is a core focus of our higher tiers. There are no setup fees and no contracts.`,
      },
      {
        category: "general",
        question: "Is it too early to invest in AI search?",
        answer: `It's exactly the right time. AI search is growing fast and most local businesses haven't optimized for it at all. Getting in early means you become the cited source before your competitors — an advantage that's hard for them to claw back later.`,
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
