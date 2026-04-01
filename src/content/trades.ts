/* eslint-disable @typescript-eslint/no-unused-vars */
import { FAQItem, ProcessStep } from "./config";
import { IndustryPageConfig } from "./industries";

/* ─── Trade-Specific Page Configs ─── */

export const tradeMap: Record<string, IndustryPageConfig> = {

  /* ════════════════════════════════════════════════════════════
     P1 TRADES — Full detailed configs
     ════════════════════════════════════════════════════════════ */

  roofing: {
    slug: "roofing",
    title: "Roofing Website Design",
    eyebrow: "Roofing Websites",
    color: "#C4EF7A",
    icon: "Wrench",
    ctaLabel: "Get Your Website Started",

    metaTitle: (locality, region) =>
      `Roofing Website Design ${locality} | Websites for Roofers — BuildLocal`,
    metaDescription: (locality, region) =>
      `Custom websites for roofing companies in ${locality}, ${region}. Get found after every storm, beat the storm chasers, and generate exclusive leads. Managed sites from $195/mo.`,

    heroH1: (_locality, region) =>
      `Roofing Website Design That Gets ${region} Roofers More Jobs`,
    heroSubhead: (_locality, region) =>
      `After every storm, homeowners search "roofer near me" — and they pick whoever shows up first. If that's not you, it's a storm chaser who won't be around next year. We build websites that establish ${region} roofing companies as the trusted local choice, so you win jobs before and after the storm.`,
    heroQualifier: (_locality, region) =>
      `For ${region} roofing contractors — residential, commercial, storm restoration, and specialty roofers who want a steady pipeline of exclusive leads instead of paying for shared ones.`,

    painPoints: (_locality, _region, _slug) => [
      {
        title: "Storm chasers are stealing your leads",
        description:
          "After every hailstorm or hurricane, out-of-town crews flood your market with ads and door-knocking. A professional website with local reviews, your license info, and years of community presence is the only way homeowners can tell you apart from the fly-by-night operations.",
      },
      {
        title: "Seasonal demand swings crush your cash flow",
        description:
          "Roofing is feast or famine — slammed after storms, dead in winter. A website with year-round SEO brings in steady leads for maintenance, inspections, and planned re-roofs so you're not completely dependent on weather events.",
      },
      {
        title: "You're paying $50-$150 per shared lead on Angi or HomeAdvisor",
        description:
          "Those leads go to 3-5 other roofers simultaneously. Your close rate on shared leads is maybe 15-20%. Your own website generates exclusive leads — people who call you and only you — at a fraction of the cost over time.",
      },
      {
        title: "Insurance companies and adjusters can't verify you online",
        description:
          "When an adjuster or insurance rep looks you up and finds no website, no reviews, no portfolio — they recommend someone else. A professional online presence makes you the contractor adjusters feel comfortable recommending.",
      },
    ],

    whySEO: (_locality, _region, _slug) => [
      {
        title: "93% of home service decisions start with a Google search",
        description:
          "According to BrightLocal, nearly all consumers search online before hiring a contractor. For roofing — where the average job is $8,000-$15,000 — homeowners do extensive research. If you don't show up in that search, you're invisible to your best prospects.",
      },
      {
        title: "\"Roofer near me\" searches spike 300-400% after storms",
        description:
          "Google Trends data shows massive search volume spikes after major weather events. If your website is already optimized and ranking, you capture that surge instantly. If you're starting from scratch, you're too late — the storm chasers with established sites win.",
      },
      {
        title: "A portfolio website closes jobs faster",
        description:
          "Homeowners want to see before-and-after photos, read reviews from neighbors, and verify your license. A website with project galleries, video testimonials, and manufacturer certifications shortens your sales cycle dramatically.",
      },
    ],

    processSteps: [
      { step: 1, title: "Discover", description: "We learn your roofing specialties (shingle, tile, metal, flat, commercial), your service area, your certifications (GAF, Owens Corning, CertainTeed), and what types of jobs you want more of." },
      { step: 2, title: "Design", description: "We create a layout built around before-and-after project galleries, prominent review sections, your certifications, and clear storm-damage CTAs that convert worried homeowners into calls." },
      { step: 3, title: "Build", description: "We develop your site with fast load times, mobile-first design (homeowners search from their phones during storms), click-to-call, and local SEO targeting your specific service cities." },
      { step: 4, title: "Launch", description: "Your site goes live with tracking set up. We handle hosting, updates, seasonal content (storm prep, maintenance tips), and ongoing optimization so you rank higher month after month." },
    ],

    faqs: (locality, region, _slug) => [
      {
        category: "service",
        question: `What makes a roofing website different from a general contractor site?`,
        answer: `Roofing sites need storm-damage CTAs, before-and-after galleries, manufacturer certification badges (GAF Master Elite, Owens Corning Preferred), insurance claim guidance content, and emergency contact options. We build all of this in because we understand what ${region} homeowners look for when their roof is damaged.`,
      },
      {
        category: "pricing",
        question: `How much does a roofing website cost?`,
        answer: `Our managed roofing websites start at $195/month — no massive upfront fee. Most roofing companies choose our $295-$395/month plans which include project galleries, review integration, and local SEO content. Compare that to the $40-$80 per lead you're paying on shared lead platforms.`,
      },
      {
        category: "website",
        question: `Will my website help me rank for "roofer near me" in ${locality}?`,
        answer: `Yes. Every site we build includes local SEO fundamentals — location-specific pages, proper schema markup, optimized title tags, and mobile performance. These are the foundations that help you rank in ${locality} and surrounding areas. For competitive markets, we also offer content and SEO add-ons.`,
      },
      {
        category: "process",
        question: "Can you add my before-and-after project photos?",
        answer: "Absolutely — and you should. Project galleries are the single most persuasive element on a roofing website. We'll organize your photos into a professional portfolio sorted by roof type, material, or city. If you don't have great photos yet, we'll advise you on how to capture them on your next job.",
      },
      {
        category: "general",
        question: "I already get most of my work from storm chasing and door-knocking. Why do I need a website?",
        answer: "Because 70% of homeowners who get a door-knock immediately Google the company name. If they find nothing, they don't call you back. A website validates your legitimacy, shows your work history, and gives homeowners confidence that you'll be around to honor your warranty.",
      },
    ],
  },

  "foundation-repair": {
    slug: "foundation-repair",
    title: "Foundation Repair Website Design",
    eyebrow: "Foundation Repair Websites",
    color: "#BCEFFF",
    icon: "Hammer",
    ctaLabel: "Get Your Website Started",

    metaTitle: (locality, region) =>
      `Foundation Repair Website Design ${locality} | Websites for Foundation Companies — BuildLocal`,
    metaDescription: (locality, region) =>
      `Websites for foundation repair companies in ${locality}, ${region}. Build trust with anxious homeowners, showcase your expertise, and generate exclusive leads. From $195/mo.`,

    heroH1: (_locality, region) =>
      `Foundation Repair Websites That Win Trust and Close Jobs in ${region}`,
    heroSubhead: (_locality, region) =>
      `Foundation problems terrify homeowners — and terrified homeowners do a lot of research before spending $5,000-$30,000 on repairs. Your website is where they decide if you're trustworthy. We build sites for ${region} foundation companies that educate, reassure, and convert high-value leads.`,
    heroQualifier: (_locality, region) =>
      `For ${region} foundation repair contractors — pier and beam, slab repair, basement waterproofing, crawl space encapsulation, and structural repair specialists who need homeowners to trust them with their biggest investment.`,

    painPoints: (_locality, _region, _slug) => [
      {
        title: "Homeowners are scared and skeptical",
        description:
          "A cracked foundation triggers panic. Homeowners get 3-5 quotes and research every company obsessively before choosing. If your website doesn't educate them, show credentials, and build confidence, they'll pick the competitor whose site does.",
      },
      {
        title: "Your high-ticket service demands high-trust content",
        description:
          "Foundation repair is a $5,000-$30,000+ decision. Nobody spends that on a company with no website or a one-page template. You need detailed service pages, educational content about their specific problem, and visible proof of your expertise.",
      },
      {
        title: "National franchises are outranking you online",
        description:
          "Companies like Ram Jack, Olshan, and Foundation Supportworks spend millions on SEO and content marketing. Without a professional website targeting your local service area, you're invisible next to their massive digital presence.",
      },
      {
        title: "You can't show your work easily",
        description:
          "Foundation work is underground and invisible once it's done. Without before-and-after documentation, engineering diagrams, and clear explanations of your methods on your website, homeowners can't visualize the value of what you do.",
      },
    ],

    whySEO: (_locality, _region, _slug) => [
      {
        title: "Foundation repair has some of the highest CPCs in home services",
        description:
          "Google Ads for \"foundation repair\" cost $30-$80+ per click in most markets. Organic search rankings through a well-built website deliver the same high-intent traffic without the per-click cost. Over time, your website pays for itself many times over.",
      },
      {
        title: "Homeowners spend 2-4 weeks researching before choosing",
        description:
          "Unlike emergency services, foundation repair is a considered purchase. Homeowners read articles, watch videos, and compare companies for weeks. A content-rich website with educational resources keeps you top-of-mind throughout their research journey.",
      },
      {
        title: "Local trust signals close high-ticket jobs",
        description:
          "BBB ratings, local reviews, structural engineer partnerships, and manufacturer warranties displayed prominently on your website are what push a homeowner from \"getting quotes\" to \"hiring you.\" Your website is your most powerful sales tool for jobs over $10,000.",
      },
    ],

    processSteps: [
      { step: 1, title: "Discover", description: "We learn your repair methods (push piers, helical piers, mudjacking, wall anchors), your service area, your engineering partnerships, and the types of foundation problems most common in your region." },
      { step: 2, title: "Design", description: "We create a layout that educates and reassures — with problem/solution pages, method explanations, warranty information, and trust signals like engineering credentials and manufacturer certifications." },
      { step: 3, title: "Build", description: "We develop your site with educational content that ranks for symptoms homeowners search (cracked walls, sticking doors, uneven floors), mobile optimization, and strong calls to action for free inspections." },
      { step: 4, title: "Launch", description: "Your site goes live targeting your specific service area. We manage hosting, content updates, seasonal pages (spring settling, drought effects), and ongoing SEO improvements." },
    ],

    faqs: (locality, region, _slug) => [
      {
        category: "service",
        question: "Why does a foundation repair company need a specialized website?",
        answer: `Foundation repair is a high-trust, high-ticket service. Homeowners in ${region} spend weeks researching before they call. Your website needs educational content about their specific problem, clear explanations of your methods, warranties, engineering credentials, and before-and-after documentation. A generic template won't cut it.`,
      },
      {
        category: "pricing",
        question: "How much does a foundation repair website cost?",
        answer: "Our managed plans start at $195/month. Most foundation companies invest $295-$595/month for comprehensive sites with educational content, problem/solution pages, and local SEO. Given that a single foundation job can be $10,000-$30,000+, one new lead from your website pays for years of service.",
      },
      {
        category: "website",
        question: `Can my website rank for foundation repair searches in ${locality}?`,
        answer: `Yes. We build pages targeting the specific symptoms homeowners search — "cracked foundation ${locality}," "foundation settling," "basement wall bowing." Combined with proper local SEO, schema markup, and content strategy, your site will compete with the national franchises for ${region} searches.`,
      },
      {
        category: "process",
        question: "Can you create content that explains our repair methods?",
        answer: "Absolutely. We write detailed service pages for each repair method — push piers, helical piers, slab piers, wall anchors, carbon fiber straps, mudjacking, crawl space encapsulation. Educational content builds trust AND ranks well in search engines. It's a win-win.",
      },
      {
        category: "general",
        question: "How do I compete with big national foundation companies online?",
        answer: "National franchises have big sites but generic content. Your advantage is local expertise — you know the soil conditions, the common foundation types, and the specific problems in your area. We build that local authority into your website so you outrank the nationals for the searches that matter most.",
      },
    ],
  },

  hvac: {
    slug: "hvac",
    title: "HVAC Website Design",
    eyebrow: "HVAC Websites",
    color: "#FFD6E0",
    icon: "Thermometer",
    ctaLabel: "Get Your Website Started",

    metaTitle: (locality, region) =>
      `HVAC Website Design ${locality} | Websites for HVAC Companies — BuildLocal`,
    metaDescription: (locality, region) =>
      `Custom websites for HVAC companies in ${locality}, ${region}. Capture emergency calls, book seasonal tune-ups, and dominate local search. Managed sites from $195/mo.`,

    heroH1: (_locality, region) =>
      `HVAC Website Design That Keeps ${region} HVAC Companies Booked Year-Round`,
    heroSubhead: (_locality, region) =>
      `When someone's AC dies in July or their furnace quits in January, they grab their phone and call the first HVAC company they find. If your website isn't showing up — or doesn't have a click-to-call button front and center — that emergency call goes to your competitor. We build HVAC websites for ${region} companies that capture emergency leads and fill your maintenance schedule.`,
    heroQualifier: (_locality, region) =>
      `For ${region} HVAC contractors — residential and commercial heating, cooling, ventilation, ductwork, and indoor air quality companies that need a website generating leads 24/7.`,

    painPoints: (_locality, _region, _slug) => [
      {
        title: "You're missing emergency calls after hours",
        description:
          "HVAC emergencies don't happen during business hours. They happen at 2 AM when the heat goes out. If your website doesn't have prominent emergency contact options, after-hours messaging, and mobile click-to-call, those panicked homeowners call whoever shows up first on Google.",
      },
      {
        title: "Seasonal peaks and valleys wreck your revenue",
        description:
          "You're slammed in summer and winter, dead in spring and fall. A website that promotes maintenance plans, seasonal tune-ups, and IAQ services fills the gaps. Without one, you're riding the seasonal rollercoaster with no way to smooth it out.",
      },
      {
        title: "Big brands like Carrier and Trane dealers dominate search",
        description:
          "Manufacturer-backed dealers have corporate websites and marketing budgets behind them. Independent HVAC companies need a professional website with local SEO to compete — otherwise you're invisible in search results next to their polished sites.",
      },
      {
        title: "You have no system for converting website visitors into booked jobs",
        description:
          "Getting traffic isn't enough. Your website needs online scheduling for tune-ups, emergency call CTAs, maintenance plan sign-ups, and financing options displayed prominently. Most HVAC sites have a phone number and hope for the best.",
      },
    ],

    whySEO: (_locality, _region, _slug) => [
      {
        title: "\"AC repair near me\" is searched 450,000+ times monthly in the US",
        description:
          "According to Google Keyword Planner data, HVAC-related searches are among the highest-volume in home services. Every month, hundreds of thousands of people search for heating and cooling help. A well-optimized website puts you in front of this massive demand.",
      },
      {
        title: "Emergency searches convert at 2-3x the rate of planned services",
        description:
          "Someone whose AC just died isn't comparison shopping — they're calling the first company that looks legit. A mobile-optimized website with fast load times and prominent phone numbers converts these high-urgency searches into immediate booked calls.",
      },
      {
        title: "Maintenance agreements are your most profitable revenue — and websites sell them",
        description:
          "The best HVAC businesses build recurring revenue through maintenance plans. Your website is the perfect place to explain plan benefits, show pricing tiers, and let customers sign up online. This turns one-time repair calls into lifetime customers.",
      },
    ],

    processSteps: [
      { step: 1, title: "Discover", description: "We learn your HVAC specialties (residential, commercial, new construction), your brands and certifications (NATE, EPA, manufacturer authorizations), your service area, and what types of jobs drive the most revenue." },
      { step: 2, title: "Design", description: "We design around conversion — emergency CTAs above the fold, maintenance plan promotions, financing badges, manufacturer logos, and a layout that makes booking a service call effortless on any device." },
      { step: 3, title: "Build", description: "We build your site for speed (critical for emergency searches), mobile-first functionality, click-to-call, online scheduling integration, and location pages targeting every city you serve." },
      { step: 4, title: "Launch", description: "We launch with analytics tracking, call tracking integration, and start managing seasonal content — summer cooling tips, winter heating prep, IAQ promotions — to keep your site fresh and ranking." },
    ],

    faqs: (locality, region, _slug) => [
      {
        category: "service",
        question: "What makes an HVAC website different from other contractor sites?",
        answer: `HVAC websites need emergency-focused design — prominent phone numbers, after-hours messaging, and fast mobile load times. They also need seasonal content strategy, maintenance plan promotion, financing displays, and manufacturer certification badges. We build all of this specifically for ${region} HVAC companies.`,
      },
      {
        category: "pricing",
        question: "How much does an HVAC website cost?",
        answer: "Our managed HVAC websites start at $195/month. Most HVAC companies choose our $295-$395/month plans which include online scheduling integration, maintenance plan pages, financing displays, and multi-city SEO targeting. One emergency call from your website covers months of service.",
      },
      {
        category: "website",
        question: "Can customers book service calls directly from my website?",
        answer: `Yes. We integrate with popular scheduling tools like ServiceTitan, Housecall Pro, Jobber, and others. Customers in ${locality} can book tune-ups, request quotes, or submit emergency service requests directly from your site — 24/7, even when you're not answering the phone.`,
      },
      {
        category: "process",
        question: "How quickly can my HVAC website be ready?",
        answer: "Most HVAC sites are live within 2-3 weeks. If you need a site urgently before a seasonal peak (summer cooling season or winter heating season), we can expedite to get you online faster. We know timing matters in this industry.",
      },
      {
        category: "general",
        question: "Should I invest in a website or just use Google Ads?",
        answer: `Both, ideally — but a website comes first. Google Ads send traffic somewhere, and if that somewhere is a weak or nonexistent website, you're burning money. A strong website converts organic traffic AND makes your paid ads more effective. Our ${region} HVAC clients typically see 3-5x better ROI on ads after upgrading their site.`,
      },
    ],
  },

  plumbing: {
    slug: "plumbing",
    title: "Plumbing Website Design",
    eyebrow: "Plumbing Websites",
    color: "#E8D5FF",
    icon: "Droplets",
    ctaLabel: "Get Your Website Started",

    metaTitle: (locality, region) =>
      `Plumbing Website Design ${locality} | Websites for Plumbers — BuildLocal`,
    metaDescription: (locality, region) =>
      `Professional websites for plumbing companies in ${locality}, ${region}. Capture emergency calls, build trust, and stop paying for shared leads. Managed sites from $195/mo.`,

    heroH1: (_locality, region) =>
      `Plumbing Website Design That Makes ${region} Plumbers the First Call`,
    heroSubhead: (_locality, region) =>
      `A burst pipe doesn't wait until morning. When water is flooding a ${region} homeowner's kitchen at midnight, they call whoever shows up first on Google with a professional-looking site and a phone number they can tap. We build plumbing websites that capture those emergency calls and convert them into loyal customers.`,
    heroQualifier: (_locality, region) =>
      `For ${region} plumbing companies — residential, commercial, emergency, drain cleaning, water heater, sewer line, and repiping specialists who need their phone ringing with exclusive leads.`,

    painPoints: (_locality, _region, _slug) => [
      {
        title: "Emergency calls go to whoever shows up first",
        description:
          "Plumbing emergencies — burst pipes, sewage backups, no hot water — are urgent. The homeowner isn't reading reviews or comparing three companies. They're calling the first plumber with a professional website and a phone number. If that's not you, you lost a $300-$2,000 job in 30 seconds.",
      },
      {
        title: "You need to look legitimate for 24/7 service",
        description:
          "Advertising 24/7 emergency service without a professional website is a contradiction. If someone Googles your company at 2 AM and finds a Facebook page with no hours listed, they won't trust you to show up. Your website is proof you're a real, reliable operation.",
      },
      {
        title: "Lead gen platforms are eating your margins",
        description:
          "Shared plumbing leads cost $25-$75 each and go to multiple plumbers. Your close rate might be 10-15%. Your own website generates exclusive calls where the homeowner has already chosen you — dramatically better conversion and zero per-lead fees.",
      },
      {
        title: "You can't showcase the full range of what you do",
        description:
          "Most people think plumbers just fix leaks. Without a website showing your drain cleaning, water heater installation, repiping, gas line, and sewer services, you're missing higher-ticket jobs from customers who didn't know you offered those services.",
      },
    ],

    whySEO: (_locality, _region, _slug) => [
      {
        title: "\"Plumber near me\" is the #1 searched home service term",
        description:
          "According to Google Trends, plumbing-related searches consistently rank among the top local service searches in every US market. \"Plumber near me,\" \"emergency plumber,\" and \"24 hour plumber\" represent an enormous volume of high-intent, ready-to-hire traffic.",
      },
      {
        title: "Emergency plumbing searches convert within minutes",
        description:
          "A homeowner with water pouring from a ceiling doesn't shop around. They call the first plumber with a real website and a visible phone number. Mobile-optimized sites with click-to-call convert these emergency searches at rates above 30% — the highest in home services.",
      },
      {
        title: "Service pages expand your revenue per customer",
        description:
          "A website with dedicated pages for drain cleaning, water heaters, sewer repair, gas lines, and bathroom remodels shows customers the full scope of your capabilities. Plumbing companies with comprehensive sites report 40%+ increases in average job size because customers discover services they didn't know were available.",
      },
    ],

    processSteps: [
      { step: 1, title: "Discover", description: "We learn your plumbing specialties (residential, commercial, new construction), your licensing and certifications, service area, hours of operation, and what types of calls make you the most money." },
      { step: 2, title: "Design", description: "We build a design that screams reliability — emergency phone numbers impossible to miss, service pages for every offering, trust badges, license numbers, and a clean layout that works on any phone at any hour." },
      { step: 3, title: "Build", description: "We develop your site with lightning-fast load times (every second costs you emergency callers), mobile click-to-call, service area pages for every city you cover, and structured data that helps Google show your info in search results." },
      { step: 4, title: "Launch", description: "Your site goes live with call tracking, Google Business Profile optimization guidance, and ongoing management. We keep your site updated with seasonal content — winterization tips, water heater maintenance, and more." },
    ],

    faqs: (locality, region, _slug) => [
      {
        category: "service",
        question: "Do you build websites specifically for plumbing companies?",
        answer: `Yes. Plumbing websites have unique needs — emergency CTAs, 24/7 availability messaging, service-specific pages (drain cleaning, water heaters, sewer lines, repiping), license displays, and mobile-first design for urgent searches. We've built these for plumbers across ${region} and know what converts.`,
      },
      {
        category: "pricing",
        question: "What does a plumbing website cost per month?",
        answer: "Plans start at $195/month with no large upfront fee. Most plumbing companies are on our $295-$395/month plans with multi-service pages, city-specific landing pages, and emergency call features. One emergency call from your website — a $500+ job — pays for two months.",
      },
      {
        category: "website",
        question: `Will my site rank for "emergency plumber ${locality}"?`,
        answer: `We build your site with local SEO targeting emergency and service-specific searches in ${locality} and surrounding ${region} communities. Proper schema markup, location pages, fast load times, and quality content are the foundations. Most of our plumbing clients see meaningful ranking improvements within 60-90 days.`,
      },
      {
        category: "process",
        question: "Can I update my service hours or add new services later?",
        answer: "Of course. All our plans include ongoing updates. Need to add a new service, change your emergency hours, update pricing, or add a new service area? Just let us know and we handle it — usually within 24-48 hours.",
      },
      {
        category: "billing",
        question: "Is there a contract or can I cancel anytime?",
        answer: "No long-term contracts. You pay month to month and can cancel anytime. We keep our plumbing clients because the website generates ROI, not because of a contract. Most clients stay for years because the leads keep coming.",
      },
    ],
  },

  electrical: {
    slug: "electrical",
    title: "Electrical Website Design",
    eyebrow: "Electrician Websites",
    color: "#F79C42",
    icon: "Zap",
    ctaLabel: "Get Your Website Started",

    metaTitle: (locality, region) =>
      `Electrician Website Design ${locality} | Websites for Electrical Contractors — BuildLocal`,
    metaDescription: (locality, region) =>
      `Websites for electricians and electrical contractors in ${locality}, ${region}. Showcase your license, win commercial bids, and capture residential leads. From $195/mo.`,

    heroH1: (_locality, region) =>
      `Electrician Website Design That Powers ${region} Electrical Contractors' Growth`,
    heroSubhead: (_locality, region) =>
      `Electrical work requires trust — homeowners and general contractors need to know you're licensed, insured, and capable before they hand over the keys. Your website is where that trust is built. We create professional sites for ${region} electricians that win residential calls, commercial bids, and GC referrals.`,
    heroQualifier: (_locality, region) =>
      `For ${region} electrical contractors — residential, commercial, industrial, EV charger installers, solar electricians, and panel upgrade specialists who need a website that reflects their professionalism and generates qualified leads.`,

    painPoints: (_locality, _region, _slug) => [
      {
        title: "General contractors can't find you or verify your credentials online",
        description:
          "GCs looking for reliable electrical subs check websites before making a call. If you don't have a professional site showing your license, insurance, certifications, and commercial project history, you're losing sub work to electricians who do.",
      },
      {
        title: "You're missing the EV charger and solar boom",
        description:
          "EV charger installations and solar electrical work are the fastest-growing segments in electrical contracting. Homeowners searching for these services are tech-savvy and research-heavy. Without a website targeting these keywords, you're invisible to this lucrative market.",
      },
      {
        title: "Homeowners don't understand your full range of services",
        description:
          "Most people call an electrician for outlets and light fixtures. They don't realize you do panel upgrades, whole-home rewiring, generator installations, smart home wiring, and commercial work. A comprehensive website shows your full capabilities and increases average job value.",
      },
      {
        title: "You look identical to every other electrician on Yelp",
        description:
          "On listing sites, you're one of 20 electricians with a star rating and a phone number. Your own website lets you tell your story — your experience, your specialties, your craftsmanship — in a way that no directory listing ever can.",
      },
    ],

    whySEO: (_locality, _region, _slug) => [
      {
        title: "\"Electrician near me\" generates 300,000+ monthly searches nationally",
        description:
          "Electrical services are consistently in the top 5 most-searched home services on Google. A well-optimized website captures this demand in your local market, bringing you calls from homeowners who are ready to hire right now.",
      },
      {
        title: "EV and solar searches are growing 40% year-over-year",
        description:
          "As electric vehicle adoption accelerates, searches for EV charger installation are exploding. Electricians with websites targeting these emerging services are capturing a high-value, growing market that most competitors haven't addressed yet.",
      },
      {
        title: "Licensed credentials on your website outperform generic ads",
        description:
          "Electrical work is life-safety work. Homeowners want to see your license number, insurance, and certifications before they let you touch their wiring. A website that prominently displays these credentials converts at much higher rates than competitors who bury this information.",
      },
    ],

    processSteps: [
      { step: 1, title: "Discover", description: "We learn your electrical specialties (residential, commercial, industrial, EV, solar), your licenses and certifications, your target customer, and which services drive the highest revenue for your business." },
      { step: 2, title: "Design", description: "We create a professional design that puts your credentials front and center — license numbers, manufacturer certifications, insurance info — alongside service pages and project galleries that showcase your expertise." },
      { step: 3, title: "Build", description: "We build a fast, mobile-optimized site with service-specific pages, city-targeted landing pages, click-to-call, estimate request forms, and structured data that helps Google display your license info in search results." },
      { step: 4, title: "Launch", description: "We launch your site, set up lead tracking, and manage it ongoing. As you add services (EV chargers, generators, smart home), we add pages. Your site grows with your business." },
    ],

    faqs: (locality, region, _slug) => [
      {
        category: "service",
        question: "What should an electrician's website include?",
        answer: `At minimum: your license number and state, insurance verification, service pages for each specialty, your service area, and clear contact information. For ${region} electricians, we also recommend project galleries, GC/builder referral pages, and dedicated EV charger and panel upgrade pages — these are high-growth search categories.`,
      },
      {
        category: "pricing",
        question: `How much does a website cost for a ${region} electrician?`,
        answer: "Our managed plans start at $195/month. Electrical contractors who want commercial project galleries, GC-focused content, and multi-service SEO targeting typically invest $295-$495/month. A single panel upgrade lead ($2,000-$4,000 job) from your website covers months of service.",
      },
      {
        category: "website",
        question: "Can my website help me get commercial and GC work?",
        answer: "Absolutely. We build dedicated pages for commercial services and general contractor partnerships — showcasing commercial project portfolios, bonding capacity, safety records, and the specific credentials GCs look for when selecting an electrical sub. This positions you as a serious commercial player.",
      },
      {
        category: "process",
        question: "Can you add EV charger and solar content to my site?",
        answer: `Yes — and these are some of the highest-value pages we can build. EV charger and solar electrical searches are growing rapidly in ${region}. Dedicated service pages targeting these terms position you to capture this emerging demand before your competitors catch on.`,
      },
      {
        category: "general",
        question: "Do I need a website if I get all my work from GC relationships?",
        answer: "Yes. Even GCs Google their subs. A professional website validates your credibility, shows your capabilities, and makes it easy for GCs to send your link to property managers and project owners for approval. Plus, a website opens the door to direct residential and commercial leads you're currently missing entirely.",
      },
    ],
  },

  "concrete-hardscaping": {
    slug: "concrete-hardscaping",
    title: "Concrete & Hardscaping Website Design",
    eyebrow: "Concrete & Hardscaping Websites",
    color: "#FFDF40",
    icon: "Blocks",
    ctaLabel: "Get Your Website Started",

    metaTitle: (locality, region) =>
      `Concrete & Hardscaping Website Design ${locality} | Websites for Concrete Contractors — BuildLocal`,
    metaDescription: (locality, region) =>
      `Websites for concrete and hardscaping contractors in ${locality}, ${region}. Showcase your work, win bigger projects, and stop relying on word-of-mouth alone. From $195/mo.`,

    heroH1: (_locality, region) =>
      `Concrete & Hardscaping Websites That Sell Your Craftsmanship in ${region}`,
    heroSubhead: (_locality, region) =>
      `Concrete and hardscaping work is visual — homeowners want to see what you can do before they invest $5,000-$50,000 in their outdoor space. Your website is your portfolio, your reputation, and your best salesperson all in one. We build sites for ${region} concrete contractors that let your work speak for itself and turn browsers into booked jobs.`,
    heroQualifier: (_locality, region) =>
      `For ${region} concrete contractors and hardscaping companies — driveways, patios, stamped concrete, retaining walls, pavers, outdoor kitchens, and decorative concrete specialists who need a website that showcases their craftsmanship.`,

    painPoints: (_locality, _region, _slug) => [
      {
        title: "Your best work is invisible",
        description:
          "You've done stunning stamped concrete patios, beautiful retaining walls, and flawless driveways — but nobody can see them. Without a website with professional photo galleries, your portfolio is trapped on your phone or in a Facebook album that nobody scrolls back to find.",
      },
      {
        title: "Homeowners can't tell quality apart from a listing",
        description:
          "On Yelp or Google Maps, a master concrete finisher looks the same as a guy with a mixer and a day laborer. Your website is where you differentiate — showing the precision of your work, the quality of your materials, and the design options you offer.",
      },
      {
        title: "You're leaving money on the table with basic services",
        description:
          "You can do stamped concrete, exposed aggregate, acid staining, custom pavers, and outdoor living spaces. But if your website only says \"concrete contractor,\" homeowners call you for a basic slab and never ask about the premium services that could triple the job value.",
      },
      {
        title: "You're competing on price instead of quality",
        description:
          "Without a website that demonstrates your superior craftsmanship, you get lumped in with the cheapest bidder. A portfolio-driven website positions you as the premium choice — attracting customers who value quality over the lowest price.",
      },
    ],

    whySEO: (_locality, _region, _slug) => [
      {
        title: "Visual searches for outdoor projects are exploding",
        description:
          "Pinterest, Houzz, and Google Images drive millions of searches for patio ideas, driveway designs, and outdoor living inspiration. A website with rich, image-heavy content captures homeowners during the inspiration phase — before they even start getting quotes.",
      },
      {
        title: "Outdoor living is a $10B+ industry growing 8% annually",
        description:
          "According to the American Society of Landscape Architects, outdoor living projects are among the most requested home improvements. Homeowners are investing more than ever in patios, outdoor kitchens, fire pits, and hardscaped entertainment areas. Your website puts you in front of this spending surge.",
      },
      {
        title: "Before-and-after galleries are the highest-converting content",
        description:
          "For visual trades like concrete and hardscaping, project photo galleries generate more leads than any other page type. Homeowners want to see transformations, design options, and proof of quality. A website built around your portfolio is your most effective sales tool.",
      },
    ],

    processSteps: [
      { step: 1, title: "Discover", description: "We learn your concrete and hardscaping specialties — decorative, stamped, pavers, retaining walls, outdoor kitchens — and identify the project types and price points that drive your best revenue." },
      { step: 2, title: "Design", description: "We create a visual-first layout built around your project galleries — large, high-quality photos organized by project type, with descriptions of materials and techniques that educate homeowners on the value of quality work." },
      { step: 3, title: "Build", description: "We build a fast-loading, image-optimized site with service pages for every offering, location targeting for your service area, and an easy quote request process that captures leads while they're inspired by your portfolio." },
      { step: 4, title: "Launch", description: "We launch your site and help you build the habit of photographing every project. As your portfolio grows, we add new projects to your galleries. Your website becomes a living showcase of your best work." },
    ],

    faqs: (locality, region, _slug) => [
      {
        category: "service",
        question: "What makes a concrete contractor's website different?",
        answer: `Concrete and hardscaping is inherently visual. Your website needs to be built around project galleries with large, high-quality photos — organized by type (driveways, patios, retaining walls, decorative). For ${region} contractors, we also build content around the specific materials and techniques popular in your climate and market.`,
      },
      {
        category: "pricing",
        question: "How much does a concrete contractor website cost?",
        answer: "Our managed plans start at $195/month. Concrete and hardscaping companies that want premium portfolio galleries, multiple service pages, and local SEO targeting typically invest $295-$495/month. A single patio or outdoor kitchen lead ($8,000-$25,000+ job) makes the investment obvious.",
      },
      {
        category: "website",
        question: "Can customers see examples of specific project types?",
        answer: `Yes. We organize your galleries by project type — stamped concrete patios, paver driveways, retaining walls, outdoor kitchens, pool decks, and more. ${locality} homeowners can browse exactly the type of project they're considering, see your quality, and request a quote directly from the gallery page.`,
      },
      {
        category: "process",
        question: "I don't have professional photos of my work. Can you still build a great site?",
        answer: "We can start with whatever photos you have — even phone photos from job sites look good when properly formatted. We also provide guidance on how to take great before-and-after photos with your phone. As you complete new projects, we continuously update your portfolio.",
      },
      {
        category: "general",
        question: "Will a website really help me get bigger, more profitable jobs?",
        answer: "Absolutely. Homeowners planning a $15,000+ outdoor project do extensive online research. They want to see portfolios, read reviews, and understand their options. A comprehensive website positions you as the premium, professional choice — attracting the customers who value quality and are willing to pay for it.",
      },
    ],
  },


  /* ════════════════════════════════════════════════════════════
     P2 & P3 TRADES — Unique but slightly more concise
     ════════════════════════════════════════════════════════════ */

  fencing: {
    slug: "fencing",
    title: "Fencing Website Design",
    eyebrow: "Fencing Websites",
    color: "#71CFA3",
    icon: "Fence",
    ctaLabel: "Get Your Website Started",

    metaTitle: (locality, region) =>
      `Fencing Website Design ${locality} | Websites for Fence Companies — BuildLocal`,
    metaDescription: (locality, region) =>
      `Custom websites for fence companies in ${locality}, ${region}. Showcase materials, win more bids, and generate exclusive leads. Managed sites from $195/mo.`,

    heroH1: (_locality, region) =>
      `Fencing Websites That Help ${region} Fence Companies Win More Bids`,
    heroSubhead: (_locality, region) =>
      `Homeowners shopping for a fence compare 3-5 companies online before requesting a single quote. Your website is your first impression — and it needs to showcase your materials, your workmanship, and your reliability. We build fence company websites for ${region} that turn browsers into booked estimates.`,
    heroQualifier: (_locality, region) =>
      `For ${region} fence contractors — wood, vinyl, chain link, aluminum, iron, and composite fence installers who want a website that generates a steady stream of estimate requests.`,

    painPoints: (_locality, _region, _slug) => [
      {
        title: "Homeowners can't compare your materials and options",
        description:
          "Fence buyers want to see wood vs. vinyl vs. aluminum options, compare styles, and understand pricing tiers. Without a website that displays your material options with photos and descriptions, you're losing the comparison shopper to the company whose site educates them.",
      },
      {
        title: "You're invisible to new homeowners and subdivisions",
        description:
          "New construction neighborhoods are fencing goldmines — dozens of homeowners all needing fences at once. These buyers search online first. A website with neighborhood-specific landing pages can help you lock down entire subdivisions.",
      },
      {
        title: "Lead gen sites send you tire-kickers, not real buyers",
        description:
          "Shared leads from HomeAdvisor go to 4-5 fence companies. By the time you call, they've already picked someone. Your website attracts people who've chosen you specifically — higher close rate, less wasted time.",
      },
      {
        title: "Your quotes are competing on price alone",
        description:
          "When homeowners can't see your work quality online, they default to choosing the cheapest bid. A website with project photos, review highlights, and warranty information helps justify your pricing and win jobs at better margins.",
      },
    ],

    whySEO: (_locality, _region, _slug) => [
      {
        title: "Fence searches peak in spring — and it's a race",
        description:
          "Google Trends shows fence-related searches spike 200%+ between March and June. Companies with established websites capture that demand. If you wait until spring to build your site, you've missed the peak.",
      },
      {
        title: "Photo galleries close fence jobs faster than any salesperson",
        description:
          "Homeowners want to see exactly what their fence will look like. A gallery showing your completed wood privacy fences, ornamental iron gates, and vinyl installations lets them envision the end result before you even show up to measure.",
      },
      {
        title: "Repeat neighborhood referrals multiply from a single website",
        description:
          "One happy customer in a new subdivision tells their neighbor, who Googles you. A professional website validates the referral and generates the next call. This referral-plus-website effect can fill your schedule from a single neighborhood.",
      },
    ],

    processSteps: [
      { step: 1, title: "Discover", description: "We learn your fencing specialties — wood, vinyl, chain link, aluminum, iron — your service area, your ideal job size, and what sets your installations apart." },
      { step: 2, title: "Design", description: "We build a visual layout with material comparison sections, project galleries organized by fence type, and prominent estimate request forms." },
      { step: 3, title: "Build", description: "We develop a fast, mobile-optimized site with material-specific service pages, neighborhood and city targeting, and gallery functionality that makes your work shine." },
      { step: 4, title: "Launch", description: "Your site goes live with tracking. We manage seasonal content (spring fence campaigns) and add new project photos as you complete jobs." },
    ],

    faqs: (locality, region, _slug) => [
      {
        category: "service",
        question: "What should a fence company's website include?",
        answer: `Material comparison pages (wood, vinyl, chain link, iron), project galleries organized by type, a clear estimate request process, and service area information. For ${region} fence companies, we also include content about local regulations, HOA considerations, and climate-appropriate material recommendations.`,
      },
      {
        category: "pricing",
        question: "How much is a fence company website?",
        answer: "Managed plans start at $195/month. Most fence companies invest $295-$395/month for material galleries, multi-city targeting, and estimate request functionality. A single fence installation lead ($3,000-$10,000) more than covers the investment.",
      },
      {
        category: "website",
        question: `Can my site rank for fence searches in ${locality}?`,
        answer: `Yes. We build service pages for each material type and create location-specific content targeting ${locality} and surrounding ${region} communities. Combined with proper local SEO, your site will appear when homeowners search for fence installation in your area.`,
      },
      {
        category: "process",
        question: "Can customers request a free estimate through the website?",
        answer: "Absolutely. We build easy-to-use estimate request forms that capture the customer's fence type preference, approximate linear footage, property details, and timeline. This gives you qualified leads ready for an on-site visit.",
      },
      {
        category: "general",
        question: "Will you help me showcase different fence materials?",
        answer: "Yes. We create dedicated pages for each material you offer — complete with photos, pros and cons, durability information, and price ranges. This educates homeowners and helps them self-select the option that fits their budget and preferences before you even arrive.",
      },
    ],
  },

  "water-damage-restoration": {
    slug: "water-damage-restoration",
    title: "Water Damage Restoration Website Design",
    eyebrow: "Restoration Websites",
    color: "#FF9F9F",
    icon: "CloudRain",
    ctaLabel: "Get Your Website Started",

    metaTitle: (locality, region) =>
      `Water Damage Restoration Website Design ${locality} | Websites for Restoration Companies — BuildLocal`,
    metaDescription: (locality, region) =>
      `Websites for water damage restoration companies in ${locality}, ${region}. Capture emergency calls 24/7, build insurance trust, and generate exclusive leads. From $195/mo.`,

    heroH1: (_locality, region) =>
      `Restoration Websites That Capture Emergency Calls Across ${region}`,
    heroSubhead: (_locality, region) =>
      `When a pipe bursts or a storm floods a basement, homeowners panic. They need someone NOW. If your website isn't the first thing they see — with a giant phone number and "24/7 Emergency" messaging — that call goes to your competitor. We build restoration websites for ${region} that capture emergency leads and build insurance-company trust.`,
    heroQualifier: (_locality, region) =>
      `For ${region} water damage, fire damage, mold remediation, and storm restoration companies that depend on capturing emergency calls and maintaining insurance company relationships.`,

    painPoints: (_locality, _region, _slug) => [
      {
        title: "Emergency calls go to whoever shows up first on Google",
        description:
          "Restoration is the most time-sensitive service in home improvement. A flooded basement at 3 AM means the homeowner calls the first company they find. Without a mobile-optimized website that loads fast and displays your emergency number prominently, you lose that call.",
      },
      {
        title: "Insurance adjusters need to verify you online",
        description:
          "Insurance companies and adjusters refer restoration companies they trust. They check your website for IICRC certification, insurance documentation, and professional presentation. No website means no insurance referrals.",
      },
      {
        title: "You're competing with franchise operations like SERVPRO and ServiceMaster",
        description:
          "National franchises have polished corporate websites and massive ad budgets. Your advantage is local presence and faster response times — but you need a professional website to prove it.",
      },
      {
        title: "Your services extend beyond water damage, but nobody knows",
        description:
          "You do fire restoration, mold remediation, storm damage, contents cleaning, and reconstruction — but if your website doesn't showcase these services, customers call different companies for each one instead of keeping all that revenue with you.",
      },
    ],

    whySEO: (_locality, _region, _slug) => [
      {
        title: "Restoration searches are almost 100% emergency-driven",
        description:
          "Nobody searches for water damage restoration casually. Every search represents an active emergency and a job worth $3,000-$50,000+. A well-ranked website captures these high-value, high-urgency leads.",
      },
      {
        title: "Speed to first call wins in restoration",
        description:
          "Industry data shows the first company to respond gets the job 78% of the time in restoration. Your website's job is to make your phone ring first — with fast load times, prominent emergency numbers, and 24/7 availability messaging.",
      },
      {
        title: "IICRC and insurance credentials convert searchers into callers",
        description:
          "Homeowners dealing with insurance claims want a certified professional. Displaying IICRC certifications, insurance partnerships, and claims assistance on your website immediately establishes credibility that generic competitors can't match.",
      },
    ],

    processSteps: [
      { step: 1, title: "Discover", description: "We learn your restoration specialties (water, fire, mold, storm), your certifications (IICRC, RIA), insurance partnerships, and response capabilities." },
      { step: 2, title: "Design", description: "We design for emergencies — massive phone numbers, 24/7 banners, service-type pages, certification badges, and insurance claim assistance prominently displayed." },
      { step: 3, title: "Build", description: "We build the fastest-loading site possible (seconds matter in emergencies), with mobile click-to-call, emergency forms, and location pages for every city in your response area." },
      { step: 4, title: "Launch", description: "We launch with call tracking and manage ongoing content — storm prep guides, mold prevention tips, and seasonal emergency content to keep your site relevant year-round." },
    ],

    faqs: (locality, region, _slug) => [
      {
        category: "service",
        question: "Why does a restoration company need a specialized website?",
        answer: `Restoration is emergency-driven. Your website needs to load in under 2 seconds, display your phone number at the top of every page, show 24/7 availability, and feature IICRC certifications prominently. For ${region} restoration companies, we also target storm-specific and seasonal content.`,
      },
      {
        category: "pricing",
        question: "How much does a restoration company website cost?",
        answer: "Plans start at $195/month. Most restoration companies invest $295-$495/month for multi-service pages, emergency features, and local SEO. One water damage job ($5,000-$20,000+) from your website covers a year or more of service.",
      },
      {
        category: "website",
        question: "Can my website help with insurance company referrals?",
        answer: `Yes. We build credential pages that showcase your IICRC certifications, insurance company partnerships, and claims process. Insurance adjusters in ${locality} will reference your website when deciding whether to add you to their preferred vendor list.`,
      },
      {
        category: "process",
        question: "How fast can you build my restoration website?",
        answer: "We can have your site live in 10-14 days. For restoration companies entering storm season, we offer expedited builds. Getting your emergency-optimized site live quickly can mean the difference between capturing storm leads and missing them entirely.",
      },
      {
        category: "general",
        question: "How do I compete with SERVPRO and ServiceMaster online?",
        answer: "Franchises have big sites but slow, corporate response processes. Your advantages are faster response times, local reputation, and personal service. We build your website to emphasize these differentiators — local reviews, response time guarantees, and community involvement that franchise operations can't match.",
      },
    ],
  },

  landscaping: {
    slug: "landscaping",
    title: "Landscaping Website Design",
    eyebrow: "Landscaping Websites",
    color: "#B8D4E3",
    icon: "Leaf",
    ctaLabel: "Get Your Website Started",

    metaTitle: (locality, region) =>
      `Landscaping Website Design ${locality} | Websites for Landscapers — BuildLocal`,
    metaDescription: (locality, region) =>
      `Websites for landscaping companies in ${locality}, ${region}. Showcase your designs, book recurring maintenance, and grow your client base. Managed sites from $195/mo.`,

    heroH1: (_locality, region) =>
      `Landscaping Websites That Grow ${region} Landscaping Companies`,
    heroSubhead: (_locality, region) =>
      `Landscaping is visual, seasonal, and relationship-driven. Your website needs to showcase beautiful project photos, promote recurring maintenance plans, and make booking effortless. We build landscaping websites for ${region} companies that attract design clients and fill weekly maintenance routes.`,
    heroQualifier: (_locality, region) =>
      `For ${region} landscaping companies — design/build, lawn maintenance, hardscaping, irrigation, tree service, and full-service landscape firms.`,

    painPoints: (_locality, _region, _slug) => [
      {
        title: "Your best work is hidden in your phone's camera roll",
        description:
          "You've created beautiful landscapes, but potential clients can't see them. A website with organized, professional galleries of your design/build projects is the single most effective sales tool in landscaping.",
      },
      {
        title: "You can't fill maintenance routes consistently",
        description:
          "Recurring maintenance contracts are your bread and butter, but finding new weekly clients is unpredictable. A website promoting your maintenance plans, seasonal services, and easy sign-up process fills routes faster than door hangers.",
      },
      {
        title: "Seasonal revenue swings make cash flow unpredictable",
        description:
          "Without year-round service promotion — snow removal, holiday lighting, spring cleanups, irrigation winterization — your revenue drops to near zero in off-months. A website promotes the full annual cycle of services.",
      },
      {
        title: "You're competing with lowballers on price alone",
        description:
          "Without a professional website showing your design skills and project quality, homeowners see you as interchangeable with the cheapest crew. A portfolio-driven site positions you as a design professional, not just a mow-and-blow operation.",
      },
    ],

    whySEO: (_locality, _region, _slug) => [
      {
        title: "Image search drives landscaping leads",
        description:
          "Homeowners search Google Images and Pinterest for \"backyard landscaping ideas\" before they ever search for a company. A website rich with project photos captures these inspiration-phase searchers early in their decision process.",
      },
      {
        title: "Recurring maintenance creates predictable revenue",
        description:
          "A website that promotes and sells maintenance plans converts one-time project clients into recurring monthly revenue. Dedicated maintenance pages with service descriptions and seasonal schedules make sign-up easy.",
      },
      {
        title: "Local SEO puts you in front of nearby homeowners",
        description:
          "Landscaping is hyper-local — you serve a tight radius. Local SEO targeting your specific neighborhoods and cities ensures that nearby homeowners find you first, not a company across town.",
      },
    ],

    processSteps: [
      { step: 1, title: "Discover", description: "We learn your services — design/build, maintenance, irrigation, tree care — your service area, your ideal project size, and the types of clients that drive the most revenue." },
      { step: 2, title: "Design", description: "We create a visually rich layout with large project galleries, service breakdowns, maintenance plan pages, and seasonal service promotions." },
      { step: 3, title: "Build", description: "We develop a fast, image-optimized site with service pages, location targeting, easy quote requests, and maintenance plan sign-up functionality." },
      { step: 4, title: "Launch", description: "We launch and manage ongoing seasonal updates — spring cleanup promotions, summer design features, fall aeration specials, winter snow removal pages." },
    ],

    faqs: (locality, region, _slug) => [
      {
        category: "service",
        question: "What should a landscaping website include?",
        answer: `Project galleries organized by type (patios, plantings, full designs), service pages for every offering, maintenance plan details, and seasonal service information. For ${region} landscapers, we also include climate-specific content and plant/material recommendations.`,
      },
      {
        category: "pricing",
        question: "How much does a landscaping website cost?",
        answer: "Plans start at $195/month. Most landscaping companies invest $295-$395/month for premium galleries, seasonal content management, and local SEO. One design/build project lead ($5,000-$30,000+) covers years of website investment.",
      },
      {
        category: "website",
        question: "Can customers sign up for maintenance plans online?",
        answer: `Yes. We build maintenance plan pages with service descriptions, pricing tiers, and online sign-up forms. ${locality} homeowners can browse your plans and sign up directly, filling your weekly route without a single sales call.`,
      },
      {
        category: "process",
        question: "How do you handle seasonal content changes?",
        answer: "All our plans include ongoing updates. We rotate seasonal promotions, update service pages for the current season, and add new project photos throughout the year. Your site always reflects what you're offering right now.",
      },
      {
        category: "general",
        question: "I mostly do maintenance. Do I still need a website?",
        answer: "Especially if you do maintenance. A website with clear service descriptions, pricing guidance, service area maps, and easy sign-up is the most efficient way to fill maintenance routes. It works while you're on the mower — capturing leads from homeowners searching for weekly lawn care.",
      },
    ],
  },

  painting: {
    slug: "painting",
    title: "Painting Website Design",
    eyebrow: "Painting Websites",
    color: "#FFE0B2",
    icon: "Paintbrush",
    ctaLabel: "Get Your Website Started",

    metaTitle: (locality, region) =>
      `Painting Website Design ${locality} | Websites for Painters — BuildLocal`,
    metaDescription: (locality, region) =>
      `Websites for painting contractors in ${locality}, ${region}. Showcase your transformations, build trust, and generate exclusive leads. Managed sites from $195/mo.`,

    heroH1: (_locality, region) =>
      `Painting Websites That Help ${region} Painters Book More Jobs`,
    heroSubhead: (_locality, region) =>
      `Painting is one of the most searched home services — and one of the most competitive. Homeowners compare multiple painters online before requesting a single estimate. A professional website with stunning before-and-after photos, clear pricing guidance, and strong reviews is what separates the painter who gets the call from the one who doesn't. We build that site for ${region} painting companies.`,
    heroQualifier: (_locality, region) =>
      `For ${region} painting contractors — interior, exterior, residential, commercial, cabinet refinishing, and specialty coating professionals.`,

    painPoints: (_locality, _region, _slug) => [
      {
        title: "Before-and-after transformations are your best sales tool — and they're stuck on your phone",
        description:
          "A dramatic color transformation photo convinces homeowners faster than any sales pitch. Without a website gallery, those powerful images are buried in your camera roll doing nothing for your business.",
      },
      {
        title: "Homeowners think all painters are the same",
        description:
          "Without a website differentiating your prep work, your paint quality, and your attention to detail, you're just another guy with a brush competing on price. A professional site shows why your results last longer and look better.",
      },
      {
        title: "You're leaving commercial and specialty work on the table",
        description:
          "Many painters can do commercial repaints, cabinet refinishing, and specialty coatings — but without dedicated pages for these services, property managers and homeowners don't know to ask.",
      },
      {
        title: "Seasonal demand drops leave you scrambling",
        description:
          "Exterior painting dies in winter in most markets. A website promoting interior painting, cabinet refinishing, and commercial work during cold months keeps revenue flowing year-round.",
      },
    ],

    whySEO: (_locality, _region, _slug) => [
      {
        title: "\"Painter near me\" is searched 200,000+ times monthly",
        description:
          "Painting is one of the highest-volume home service searches on Google. A well-optimized website captures this demand in your local market, putting you in front of homeowners ready to hire.",
      },
      {
        title: "Color visualization content drives engagement",
        description:
          "Homeowners spend hours browsing color ideas and room transformations. Websites with before-and-after galleries, color trend content, and portfolio photos keep visitors engaged and build trust.",
      },
      {
        title: "Reviews and portfolio close painting jobs",
        description:
          "In a service where the final product is purely visual, a website showing your work and displaying customer reviews is the most powerful sales tool you can have. It pre-sells your quality before the estimate.",
      },
    ],

    processSteps: [
      { step: 1, title: "Discover", description: "We learn your painting specialties — interior, exterior, commercial, cabinets, specialty coatings — your service area, and the job types that drive the best revenue." },
      { step: 2, title: "Design", description: "We create a visually compelling layout with before-and-after sliders, color galleries organized by room type, and clear service descriptions for every offering." },
      { step: 3, title: "Build", description: "We develop a fast, mobile-optimized site with service pages, location targeting, project portfolios, and easy estimate request forms." },
      { step: 4, title: "Launch", description: "We launch with tracking and manage seasonal content — exterior painting promotions in spring, interior specials in winter, cabinet refinishing year-round." },
    ],

    faqs: (locality, region, _slug) => [
      {
        category: "service",
        question: "What should a painting company website include?",
        answer: `Before-and-after galleries, service pages for interior, exterior, and specialty work (cabinets, commercial), clear coverage area info, and estimate request forms. For ${region} painters, we also include seasonal content targeting the services most in demand throughout the year.`,
      },
      {
        category: "pricing",
        question: "How much is a painting company website?",
        answer: "Plans start at $195/month. Most painters invest $245-$395/month for premium galleries, multi-service pages, and local SEO. One interior or exterior painting job from your website ($2,000-$8,000) covers months of service.",
      },
      {
        category: "website",
        question: `Can my website rank for painting searches in ${locality}?`,
        answer: `Yes. We build service-specific and location-specific pages targeting searches like "interior painter ${locality}" and "exterior painting near me." Local SEO, proper schema markup, and quality content help you rank in ${region} search results.`,
      },
      {
        category: "process",
        question: "Can you create before-and-after photo sliders?",
        answer: "Yes. Interactive before-and-after sliders are one of the most engaging elements on a painting website. Homeowners love dragging the slider to see the transformation. We build these for your best projects to maximize impact.",
      },
      {
        category: "general",
        question: "How do I stand out from other painters in my area?",
        answer: "Through differentiation. We highlight what makes you different — your prep process, your premium materials, your warranties, your crew's experience. When every other painter has a basic site or no site at all, a professional website with detailed content puts you in a completely different category.",
      },
    ],
  },

  "general-contracting": {
    slug: "general-contracting",
    title: "General Contracting Website Design",
    eyebrow: "General Contractor Websites",
    color: "#C5CAE9",
    icon: "HardHat",
    ctaLabel: "Get Your Website Started",

    metaTitle: (locality, region) =>
      `General Contractor Website Design ${locality} | Websites for GCs — BuildLocal`,
    metaDescription: (locality, region) =>
      `Websites for general contractors in ${locality}, ${region}. Showcase projects, win bigger bids, and build credibility with clients and subs. Managed from $195/mo.`,

    heroH1: (_locality, region) =>
      `General Contractor Websites That Win Bigger Projects in ${region}`,
    heroSubhead: (_locality, region) =>
      `General contractors live and die by reputation and referrals. But when a potential client Googles your company name and finds nothing — or a dated template — they question your legitimacy. We build websites for ${region} GCs that showcase completed projects, establish credibility, and generate leads for the jobs you actually want.`,
    heroQualifier: (_locality, region) =>
      `For ${region} general contractors — residential remodelers, commercial builders, design-build firms, and custom home builders.`,

    painPoints: (_locality, _region, _slug) => [
      {
        title: "Potential clients and architects Google you before the first meeting",
        description:
          "Before a client signs a contract or an architect recommends you, they check your online presence. A professional website with completed project portfolios, credentials, and testimonials passes the credibility check. No website fails it.",
      },
      {
        title: "You want bigger, more profitable projects",
        description:
          "Kitchen remodels are fine, but custom homes and commercial builds are where the real money is. A website targeting higher-end projects with premium portfolio content attracts the clients who spend $100K+ and are willing to pay for quality.",
      },
      {
        title: "Your project portfolio is scattered across social media",
        description:
          "You have amazing completed projects, but they're spread across Instagram, Facebook, and Houzz with no organization. A website gives you a permanent, professional portfolio you control.",
      },
      {
        title: "Subcontractors can't verify your operation",
        description:
          "Quality subs want to work with established GCs. A professional website showing your project history, insurance, and licensing makes recruiting top subs easier and strengthens your team.",
      },
    ],

    whySEO: (_locality, _region, _slug) => [
      {
        title: "Remodeling searches exceed 500,000 monthly nationally",
        description:
          "Homeowners planning kitchen remodels, bathroom renovations, and additions research extensively online. A GC website with relevant project photos and service descriptions captures these high-value, research-heavy leads.",
      },
      {
        title: "Project portfolios build trust for high-ticket decisions",
        description:
          "A $50,000-$500,000 construction project requires significant trust. A website with detailed project case studies — scope, timeline, photos, client testimonials — builds that trust before the first phone call.",
      },
      {
        title: "Architect and designer referrals check your website first",
        description:
          "When an architect recommends you to their client, the client immediately Googles your company. A professional website validates the referral and seals the deal. A weak or missing site kills it.",
      },
    ],

    processSteps: [
      { step: 1, title: "Discover", description: "We learn your contracting specialties — remodeling, new construction, commercial, design-build — your licensing, your ideal project size, and the jobs that drive the best margins." },
      { step: 2, title: "Design", description: "We create a premium layout with project case studies, process explanations, team pages, and credential displays that position you as a top-tier GC." },
      { step: 3, title: "Build", description: "We develop a professional site with project portfolios, service pages, location targeting, and inquiry forms designed to attract qualified project leads." },
      { step: 4, title: "Launch", description: "We launch and manage ongoing updates — new project additions, team changes, service expansions — keeping your site current as your business grows." },
    ],

    faqs: (locality, region, _slug) => [
      {
        category: "service",
        question: "What should a general contractor's website include?",
        answer: `Project portfolios with photos and descriptions, service pages for each specialty (remodeling, additions, new construction), licensing and insurance info, team bios, and clear contact forms. For ${region} GCs, we also build content targeting the specific project types most in demand.`,
      },
      {
        category: "pricing",
        question: "How much does a GC website cost?",
        answer: "Plans start at $195/month. Most general contractors invest $295-$595/month for premium project portfolios, multi-service pages, and local SEO. One qualified project lead ($25,000-$200,000+) represents extraordinary ROI.",
      },
      {
        category: "website",
        question: "Can I showcase completed projects with detailed case studies?",
        answer: `Absolutely. We build detailed project pages with before-and-after photos, scope descriptions, timelines, and client testimonials. These case studies are the most persuasive content on any GC website — ${locality} homeowners want to see exactly what working with you looks like.`,
      },
      {
        category: "process",
        question: "Will you write content about my construction process?",
        answer: "Yes. We create content that explains your design-build process, your project management approach, and your quality standards. This transparency builds trust with homeowners who are anxious about hiring a contractor for a major project.",
      },
      {
        category: "general",
        question: "I get all my work from referrals. Why do I need a website?",
        answer: "Because 80% of referred clients Google you before they call. A professional website confirms the referral and often turns a warm lead into a signed contract. Without one, you're losing referred clients to GCs who have an impressive online presence.",
      },
    ],
  },

  "pressure-washing": {
    slug: "pressure-washing",
    title: "Pressure Washing Website Design",
    eyebrow: "Pressure Washing Websites",
    color: "#DCEDC8",
    icon: "Waves",
    ctaLabel: "Get Your Website Started",

    metaTitle: (locality, region) =>
      `Pressure Washing Website Design ${locality} | Websites for Pressure Washers — BuildLocal`,
    metaDescription: (locality, region) =>
      `Websites for pressure washing companies in ${locality}, ${region}. Show dramatic transformations, book recurring cleans, and grow your client base. From $195/mo.`,

    heroH1: (_locality, region) =>
      `Pressure Washing Websites That Make ${region} Phones Ring`,
    heroSubhead: (_locality, region) =>
      `Pressure washing has the most dramatic before-and-after results in home services. A website that showcases those transformations sells your service better than any flyer or door hanger. We build pressure washing websites for ${region} companies that turn jaw-dropping photos into booked jobs.`,
    heroQualifier: (_locality, region) =>
      `For ${region} pressure washing and soft washing companies — residential, commercial, fleet washing, and property management services.`,

    painPoints: (_locality, _region, _slug) => [
      {
        title: "Before-and-afters are your best marketing — and they're on Facebook",
        description:
          "Pressure washing has the most visually striking transformations in home services. But if those photos only live on social media, most potential customers never see them. A website puts your best work in front of every searcher.",
      },
      {
        title: "You're dependent on seasonal demand spikes",
        description:
          "Spring and summer are busy, winter is dead. A website promoting commercial contracts, property management services, and recurring residential plans creates steady year-round revenue.",
      },
      {
        title: "Low barrier to entry means maximum competition",
        description:
          "Anyone with a pressure washer can call themselves a company. A professional website with insurance info, soft wash certifications, and customer reviews separates you from the $99 weekend warriors.",
      },
      {
        title: "You can't scale with flyers and door-knocking alone",
        description:
          "Physical marketing hits one neighborhood at a time. A website reaches your entire service area 24/7, generating leads while you're on the job.",
      },
    ],

    whySEO: (_locality, _region, _slug) => [
      {
        title: "Visual content converts at the highest rate in this industry",
        description:
          "Before-and-after photos of dirty driveways, grimy siding, and stained decks made sparkling clean are irresistible. A website built around these transformations converts viewers into callers at rates that dwarf other marketing channels.",
      },
      {
        title: "Recurring contracts build business value",
        description:
          "Property managers, HOAs, and commercial properties need regular pressure washing. A website that targets these clients and promotes recurring service plans builds predictable, scalable revenue.",
      },
      {
        title: "Local search captures homeowners at the moment of need",
        description:
          "When a homeowner looks at their grimy driveway and thinks \"I should get this cleaned,\" they Google it. A well-ranked website captures that intent instantly.",
      },
    ],

    processSteps: [
      { step: 1, title: "Discover", description: "We learn your services — residential, commercial, soft wash, fleet — your service area, your ideal job types, and your pricing structure." },
      { step: 2, title: "Design", description: "We create a transformation-focused layout with dramatic before-and-after galleries, service descriptions, and booking functionality." },
      { step: 3, title: "Build", description: "We develop a fast, mobile-first site with service pages, location targeting, instant quote tools, and gallery features that showcase your results." },
      { step: 4, title: "Launch", description: "We launch with tracking and manage seasonal promotions — spring deck cleaning, summer driveway specials, fall gutter cleaning, and commercial contract pages." },
    ],

    faqs: (locality, region, _slug) => [
      {
        category: "service",
        question: "What should a pressure washing website include?",
        answer: `Dramatic before-and-after galleries, service pages for residential and commercial, soft wash vs. pressure wash explanations, and easy booking forms. For ${region} companies, we include climate-specific content about mold, algae, and weather-related cleaning needs.`,
      },
      {
        category: "pricing",
        question: "How much does a pressure washing website cost?",
        answer: "Plans start at $195/month. Most pressure washing companies invest $245-$345/month for transformation galleries, multi-service pages, and local SEO. A few residential jobs from your website ($300-$800 each) cover months of service.",
      },
      {
        category: "website",
        question: "Can customers book or request quotes online?",
        answer: `Yes. We build easy quote request forms and can integrate online booking. ${locality} customers can describe their project, upload photos, and get a response — making it easy for them and efficient for you.`,
      },
      {
        category: "process",
        question: "How do you make my photos look professional?",
        answer: "We format your before-and-after photos into professional interactive sliders, optimize them for web performance, and organize them by service type. Even phone photos look impressive when properly presented on a well-designed site.",
      },
      {
        category: "general",
        question: "Can a website help me land commercial contracts?",
        answer: "Absolutely. We build dedicated commercial pages targeting property managers, HOAs, and business owners. Showcasing commercial project history, insurance coverage, and recurring service plans positions you for the larger, more consistent commercial contracts.",
      },
    ],
  },

  handyman: {
    slug: "handyman",
    title: "Handyman Website Design",
    eyebrow: "Handyman Websites",
    color: "#F0F4C3",
    icon: "Tool",
    ctaLabel: "Get Your Website Started",

    metaTitle: (locality, region) =>
      `Handyman Website Design ${locality} | Websites for Handymen — BuildLocal`,
    metaDescription: (locality, region) =>
      `Websites for handyman services in ${locality}, ${region}. Show your range, build trust, and become the go-to handyman in your area. Managed sites from $195/mo.`,

    heroH1: (_locality, region) =>
      `Handyman Websites That Make You the Go-To in ${region}`,
    heroSubhead: (_locality, region) =>
      `Handyman work thrives on trust and convenience. Homeowners want someone reliable they can call for any small project. A professional website establishes you as that trusted go-to person in ${region} — not just another guy on Craigslist or Nextdoor.`,
    heroQualifier: (_locality, region) =>
      `For ${region} handymen and handyman services — home repairs, maintenance, installations, honey-do lists, and property maintenance professionals.`,

    painPoints: (_locality, _region, _slug) => [
      {
        title: "Homeowners don't trust handymen they find online — unless they look professional",
        description:
          "Handyman services have a trust problem. Too many bad experiences with unreliable workers make homeowners cautious. A professional website with reviews, photos of your work, and insurance information instantly separates you from the flaky competition.",
      },
      {
        title: "You're listed on Craigslist and Nextdoor competing with uninsured hobbyists",
        description:
          "On community boards, a licensed, insured handyman looks the same as someone doing odd jobs for beer money. Your own website positions you as a professional business, not a side hustle.",
      },
      {
        title: "Customers don't know everything you can do",
        description:
          "You can handle drywall, plumbing repairs, electrical fixes, furniture assembly, door installations, and more. Without a comprehensive service list on your website, customers only call you for the one thing they know about.",
      },
      {
        title: "You have no system for repeat customers",
        description:
          "Your best customers call you once and save your number — maybe. A website with a service list, booking form, and email capture turns one-time callers into lifelong clients who refer their friends.",
      },
    ],

    whySEO: (_locality, _region, _slug) => [
      {
        title: "\"Handyman near me\" is searched 450,000+ times monthly",
        description:
          "Handyman searches are among the top home service queries on Google. A professional website puts you in front of homeowners actively looking for reliable help with their to-do list.",
      },
      {
        title: "Trust signals overcome the industry's biggest barrier",
        description:
          "Insurance verification, background check badges, reviews, and professional presentation on your website overcome the trust hesitation that keeps homeowners from hiring handymen they find online.",
      },
      {
        title: "A comprehensive service list increases calls per customer",
        description:
          "A website showing your full range of capabilities turns a customer who called about a leaky faucet into a customer who also books drywall repair, door installation, and deck staining.",
      },
    ],

    processSteps: [
      { step: 1, title: "Discover", description: "We learn your full range of services, your service area, your availability, and the types of jobs you enjoy and profit from most." },
      { step: 2, title: "Design", description: "We create a clean, trustworthy layout with comprehensive service lists, customer reviews, insurance/license badges, and simple booking functionality." },
      { step: 3, title: "Build", description: "We develop a mobile-optimized site with service categories, location pages, click-to-call, online booking, and content that positions you as the reliable local pro." },
      { step: 4, title: "Launch", description: "We launch with tracking and manage ongoing updates. As you add services or expand your area, your website grows with you." },
    ],

    faqs: (locality, region, _slug) => [
      {
        category: "service",
        question: "Can a handyman really benefit from a professional website?",
        answer: `Absolutely. Handyman services are one of the most searched home service categories. A professional website separates you from the unlicensed, uninsured competition and positions you as the trusted go-to handyman in ${region}. The ROI is immediate for most of our handyman clients.`,
      },
      {
        category: "pricing",
        question: "How much does a handyman website cost?",
        answer: "Plans start at $195/month. Most handymen invest $195-$295/month for a professional site with comprehensive service listings, booking functionality, and local SEO. Even one or two extra jobs per month ($200-$500 each) makes the investment obvious.",
      },
      {
        category: "website",
        question: "Can customers book handyman services online?",
        answer: `Yes. We build easy-to-use booking or request forms where ${locality} homeowners can describe their project, choose from your service categories, and request availability. You get a qualified lead with project details before you even call them back.`,
      },
      {
        category: "process",
        question: "How do I list all my services without looking cluttered?",
        answer: "We organize your services into clean categories — home repairs, installations, maintenance, outdoor work — with clear descriptions and photos. The result is a comprehensive but well-organized presentation that helps homeowners find exactly what they need.",
      },
      {
        category: "general",
        question: "How do I stand out from other handymen in my area?",
        answer: "Professionalism. Most handymen have no website or a terrible one. A clean, professional site with reviews, insurance info, a comprehensive service list, and easy booking immediately puts you in a different league. You'll be the handyman that homeowners trust and recommend.",
      },
    ],
  },

  flooring: {
    slug: "flooring",
    title: "Flooring Website Design",
    eyebrow: "Flooring Websites",
    color: "#CFD8DC",
    icon: "Layers",
    ctaLabel: "Get Your Website Started",

    metaTitle: (locality, region) =>
      `Flooring Website Design ${locality} | Websites for Flooring Companies — BuildLocal`,
    metaDescription: (locality, region) =>
      `Websites for flooring companies in ${locality}, ${region}. Showcase installations, display material options, and generate exclusive leads. Managed sites from $195/mo.`,

    heroH1: (_locality, region) =>
      `Flooring Websites That Help ${region} Flooring Companies Win More Installs`,
    heroSubhead: (_locality, region) =>
      `Homeowners replacing flooring research materials, styles, and installers extensively before committing. Your website is where they compare your work, your material options, and your pricing to the competition. We build flooring websites for ${region} companies that educate buyers and convert them into booked installations.`,
    heroQualifier: (_locality, region) =>
      `For ${region} flooring companies — hardwood, LVP, tile, carpet, laminate, and specialty flooring installers and retailers.`,

    painPoints: (_locality, _region, _slug) => [
      {
        title: "Homeowners can't visualize their options on your current site",
        description:
          "Flooring is a visual, tactile decision. Without a website showing room-by-room installations in different materials, colors, and styles, customers default to the big box store where they can see displays in person.",
      },
      {
        title: "Big box stores are stealing your installation business",
        description:
          "Home Depot and Lowe's offer flooring installation as a commodity. Your advantage is expertise, quality materials, and superior craftsmanship — but you need a website that communicates that advantage clearly.",
      },
      {
        title: "You're not capturing the full project value",
        description:
          "A customer calling about LVP for one room could become a whole-house flooring project if they see your full range of materials and capabilities on your website.",
      },
      {
        title: "Your showroom traffic has declined",
        description:
          "Fewer homeowners browse showrooms cold. They research online first, then visit only the 1-2 companies they've pre-selected. A strong website gets you on that short list.",
      },
    ],

    whySEO: (_locality, _region, _slug) => [
      {
        title: "Flooring is a $30B industry and growing",
        description:
          "The US flooring market continues to expand as homeowners prioritize interior upgrades. A professional website positions your company to capture your share of this massive market in your local area.",
      },
      {
        title: "Material-specific searches drive qualified leads",
        description:
          "Homeowners searching \"hardwood floor installation\" or \"LVP flooring near me\" have already decided on their material. Dedicated pages for each flooring type capture these high-intent, ready-to-buy searchers.",
      },
      {
        title: "Room galleries inspire larger projects",
        description:
          "A website showing beautiful flooring installations in kitchens, living rooms, basements, and commercial spaces inspires homeowners to think bigger. Many upgrade from a single room to a whole-house project after browsing a great portfolio.",
      },
    ],

    processSteps: [
      { step: 1, title: "Discover", description: "We learn your flooring specialties — hardwood, LVP, tile, carpet, commercial — your material brands, your service area, and the project types that drive the most revenue." },
      { step: 2, title: "Design", description: "We create a visual layout with material-specific galleries, room inspiration photos, and clear paths from browsing to requesting a quote." },
      { step: 3, title: "Build", description: "We develop a fast, mobile-optimized site with material pages, installation galleries, location targeting, and easy quote request forms." },
      { step: 4, title: "Launch", description: "We launch with tracking and manage ongoing updates — new installation photos, material additions, and seasonal promotions to keep your pipeline full." },
    ],

    faqs: (locality, region, _slug) => [
      {
        category: "service",
        question: "What should a flooring company website include?",
        answer: `Material-specific pages (hardwood, LVP, tile, carpet), installation galleries organized by room type, brand partnerships, and easy quote request forms. For ${region} flooring companies, we also include content about climate considerations and material recommendations.`,
      },
      {
        category: "pricing",
        question: "How much does a flooring website cost?",
        answer: "Plans start at $195/month. Most flooring companies invest $295-$395/month for material galleries, multi-product pages, and local SEO. One flooring installation lead ($3,000-$15,000+) covers months of website investment.",
      },
      {
        category: "website",
        question: "Can I showcase different flooring materials on my site?",
        answer: `Absolutely. We build dedicated pages for each material type with installation photos, material comparisons, and pricing guidance. ${locality} homeowners can browse options and self-select before requesting a quote, giving you more qualified leads.`,
      },
      {
        category: "process",
        question: "Can customers request free estimates through my website?",
        answer: "Yes. We build estimate request forms that capture room dimensions, material preferences, and project timeline. This gives you all the information you need to provide an accurate quote quickly and efficiently.",
      },
      {
        category: "general",
        question: "How do I compete with Home Depot and Lowe's for installation?",
        answer: "By emphasizing what they can't offer — expert material guidance, superior installation quality, personalized service, and a warranty backed by a local company. We build your website to highlight these advantages and position you as the premium, expert alternative to big-box commodity installation.",
      },
    ],
  },

  "siding-gutters": {
    slug: "siding-gutters",
    title: "Siding & Gutters Website Design",
    eyebrow: "Siding & Gutter Websites",
    color: "#D7CCC8",
    icon: "Home",
    ctaLabel: "Get Your Website Started",

    metaTitle: (locality, region) =>
      `Siding & Gutter Website Design ${locality} | Websites for Siding Contractors — BuildLocal`,
    metaDescription: (locality, region) =>
      `Websites for siding and gutter companies in ${locality}, ${region}. Showcase transformations, build trust, and capture leads from homeowners upgrading their exteriors. From $195/mo.`,

    heroH1: (_locality, region) =>
      `Siding & Gutter Websites That Drive Exterior Project Leads in ${region}`,
    heroSubhead: (_locality, region) =>
      `Siding replacement and gutter installation are high-value exterior projects that homeowners research extensively. Your website needs to showcase dramatic exterior transformations, display material options, and make it easy to request an estimate. We build sites for ${region} siding and gutter companies that convert research-heavy buyers into booked projects.`,
    heroQualifier: (_locality, region) =>
      `For ${region} siding contractors and gutter installers — vinyl, fiber cement, wood, metal siding, seamless gutters, gutter guards, and soffit/fascia specialists.`,

    painPoints: (_locality, _region, _slug) => [
      {
        title: "Exterior transformations are your biggest selling point — but nobody can see them",
        description:
          "A full siding replacement transforms a home's entire appearance. Without before-and-after photos on a website, you can't show potential customers the dramatic impact of your work.",
      },
      {
        title: "Homeowners don't understand material differences",
        description:
          "Vinyl, fiber cement, engineered wood, and metal siding all have different benefits, lifespans, and price points. Without educational content on your website, homeowners default to the cheapest option or choose a competitor who explains it better.",
      },
      {
        title: "Storm-driven demand comes in unpredictable waves",
        description:
          "Hail and wind damage drive siding replacement demand, but you can't build a business on storms alone. A website promotes planned upgrades, energy efficiency improvements, and curb appeal projects year-round.",
      },
      {
        title: "Gutter work is seen as a commodity",
        description:
          "Homeowners think all gutter installers are the same. A website showcasing your seamless gutter systems, leaf guard options, and quality installation process differentiates you from the cheapest quote.",
      },
    ],

    whySEO: (_locality, _region, _slug) => [
      {
        title: "Siding replacement is a $10,000-$30,000+ decision",
        description:
          "Homeowners investing this much research extensively online. A professional website with material comparisons, project galleries, and warranty information captures these high-value leads during their extended research phase.",
      },
      {
        title: "Material comparison content ranks well and converts",
        description:
          "Content comparing vinyl vs. fiber cement vs. wood siding ranks highly in search and provides genuine value to homeowners. This educational approach positions you as the knowledgeable expert, not just another bidder.",
      },
      {
        title: "Gutter searches are consistent year-round",
        description:
          "Unlike siding (which spikes after storms), gutter installation and repair searches stay steady throughout the year. A website targeting gutter services provides consistent lead flow that smooths seasonal revenue.",
      },
    ],

    processSteps: [
      { step: 1, title: "Discover", description: "We learn your siding and gutter specialties — materials, brands, manufacturer certifications — your service area, and the project types that drive the best margins." },
      { step: 2, title: "Design", description: "We create a transformation-focused layout with before-and-after galleries, material comparison pages, and clear paths to estimate requests." },
      { step: 3, title: "Build", description: "We develop a fast, mobile-optimized site with material pages, project galleries, location targeting, and manufacturer certification displays." },
      { step: 4, title: "Launch", description: "We launch with tracking and manage storm-response content, seasonal promotions, and ongoing portfolio additions as you complete projects." },
    ],

    faqs: (locality, region, _slug) => [
      {
        category: "service",
        question: "What should a siding and gutter website include?",
        answer: `Before-and-after exterior galleries, material comparison pages (vinyl, fiber cement, metal), manufacturer certification badges, and gutter system options. For ${region} contractors, we include content about local weather considerations and material durability in your climate.`,
      },
      {
        category: "pricing",
        question: "How much does a siding company website cost?",
        answer: "Plans start at $195/month. Most siding and gutter companies invest $295-$395/month for material galleries, comparison content, and local SEO. One siding replacement lead ($10,000-$30,000+) makes the monthly investment insignificant.",
      },
      {
        category: "website",
        question: `Can my website rank for siding searches in ${locality}?`,
        answer: `Yes. We build material-specific and location-specific pages targeting searches like "siding replacement ${locality}" and "seamless gutters near me." Combined with local SEO and quality content, your site will compete for the searches that matter most in ${region}.`,
      },
      {
        category: "process",
        question: "Can you create material comparison content?",
        answer: "Yes. We write detailed material comparison pages — vinyl vs. fiber cement, seamless vs. sectional gutters, different siding profiles and colors. This educational content ranks well in search, builds your expertise, and helps homeowners make informed decisions.",
      },
      {
        category: "general",
        question: "Should I have separate pages for siding and gutters?",
        answer: "Yes. Homeowners search for these services separately. Dedicated siding pages and dedicated gutter pages each target different search queries, doubling your visibility. We also create combo pages for full exterior renovation projects to capture that audience too.",
      },
    ],
  },
};

/* ─── Helper Functions ─── */

export function getTradeConfig(slug: string): IndustryPageConfig | undefined {
  return tradeMap[slug];
}

export function getAllTradeSlugs(): string[] {
  return Object.keys(tradeMap);
}

export function getAllTrades(): IndustryPageConfig[] {
  return Object.values(tradeMap);
}
