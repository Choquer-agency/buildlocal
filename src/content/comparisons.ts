import { FAQItem } from "./config";

export interface ComparisonRow {
  feature: string;
  buildLocal: string;
  competitor: string;
  winner: "buildlocal" | "competitor" | "tie";
}

export interface ComparisonConfig {
  slug: string;
  competitorName: string;
  competitorType: "platform" | "agency";
  metaTitle: string;
  metaDescription: string;
  heroH1: string;
  heroSubhead: string;
  verdict: string;
  rows: ComparisonRow[];
  faqs: FAQItem[];
}

export const comparisonMap: Record<string, ComparisonConfig> = {
  "buildlocal-vs-squarespace": {
    slug: "buildlocal-vs-squarespace",
    competitorName: "Squarespace",
    competitorType: "platform",
    metaTitle:
      "BuildLocal vs Squarespace | Which Is Better for Trades Businesses?",
    metaDescription:
      "Comparing BuildLocal and Squarespace for trades and small business websites. See pricing, features, and support side by side. Find out which is better for your business.",
    heroH1: "BuildLocal vs Squarespace: Which Is Right for Your Business?",
    heroSubhead:
      "Squarespace gives you a DIY website builder. BuildLocal gives you a done-for-you website with SEO, hosting, and ongoing management included. Here's how they compare for trades businesses.",
    verdict:
      "Squarespace is a solid DIY builder — but for busy trades business owners who don't have time to design, write content, and manage a website, BuildLocal is the better choice. You get a professional site without doing any of the work.",
    rows: [
      { feature: "Custom design", buildLocal: "Fully custom, built for you", competitor: "Template-based, you customize", winner: "buildlocal" },
      { feature: "Monthly price", buildLocal: "$195-$595/mo", competitor: "$16-$49/mo + your time", winner: "tie" },
      { feature: "Setup required", buildLocal: "None — we do everything", competitor: "You build it yourself", winner: "buildlocal" },
      { feature: "SEO included", buildLocal: "Yes — local SEO built in", competitor: "Basic tools, you configure", winner: "buildlocal" },
      { feature: "Content writing", buildLocal: "Written for you", competitor: "You write it", winner: "buildlocal" },
      { feature: "Hosting included", buildLocal: "Yes", competitor: "Yes", winner: "tie" },
      { feature: "Ongoing updates", buildLocal: "Included monthly", competitor: "You do it yourself", winner: "buildlocal" },
      { feature: "Phone support", buildLocal: "Direct phone + email", competitor: "Email + chat only", winner: "buildlocal" },
      { feature: "Trades specialization", buildLocal: "Built specifically for trades", competitor: "Generic for all businesses", winner: "buildlocal" },
      { feature: "Time investment", buildLocal: "~1 hour (discovery call)", competitor: "20-40+ hours to build", winner: "buildlocal" },
    ],
    faqs: [
      { category: "general", question: "Is Squarespace cheaper than BuildLocal?", answer: "Squarespace plans start at $16/month, but that doesn't include your time. Most business owners spend 20-40 hours building their Squarespace site. At even $50/hour for your time, that's $1,000-$2,000 in hidden cost — plus ongoing time for updates and SEO. BuildLocal costs more monthly but includes everything done for you." },
      { category: "service", question: "Can I switch from Squarespace to BuildLocal?", answer: "Yes. We migrate businesses from Squarespace all the time. We'll transfer your content, preserve your domain, and build you a new custom site. The transition is seamless with no downtime." },
      { category: "website", question: "Will a BuildLocal website rank better than Squarespace?", answer: "Generally yes, for local businesses. BuildLocal sites are built with local SEO fundamentals from day one — location-specific content, proper schema markup, and optimized page structure. Squarespace gives you SEO tools, but you have to know how to use them." },
      { category: "pricing", question: "Why would I pay more for BuildLocal?", answer: "You're paying for done-for-you expertise, not a tool. BuildLocal includes custom design, content writing, SEO setup, hosting, and monthly updates. Squarespace gives you a tool and says 'figure it out.' If you're a busy trades business owner, your time is worth more than the price difference." },
      { category: "general", question: "What if I already have a Squarespace site?", answer: "If your Squarespace site isn't generating leads, we can help. We'll audit what's not working, build you a conversion-optimized replacement, and handle the migration. Many of our best clients came from Squarespace sites that looked fine but didn't convert." },
    ],
  },

  "buildlocal-vs-wix": {
    slug: "buildlocal-vs-wix",
    competitorName: "Wix",
    competitorType: "platform",
    metaTitle: "BuildLocal vs Wix | Which Is Better for Small Businesses?",
    metaDescription:
      "BuildLocal vs Wix comparison for trades and small business websites. Professional managed sites vs DIY builder. See which is the better fit.",
    heroH1: "BuildLocal vs Wix: Which Is Better for Your Business?",
    heroSubhead:
      "Wix is a drag-and-drop website builder. BuildLocal is a done-for-you managed website service. For trades business owners who want results without the work, here's how they compare.",
    verdict:
      "Wix is fine for personal projects and hobby sites. But for a trades business that needs to generate leads, look professional, and rank on Google — a professionally built and managed site from BuildLocal delivers better results with zero effort from you.",
    rows: [
      { feature: "Custom design", buildLocal: "Fully custom, built for you", competitor: "Template-based, drag-and-drop", winner: "buildlocal" },
      { feature: "Monthly price", buildLocal: "$195-$595/mo", competitor: "$17-$36/mo + your time", winner: "tie" },
      { feature: "Setup required", buildLocal: "None — we do everything", competitor: "You build it yourself", winner: "buildlocal" },
      { feature: "SEO included", buildLocal: "Local SEO built in", competitor: "Basic SEO tools included", winner: "buildlocal" },
      { feature: "Content writing", buildLocal: "Written for you", competitor: "You write or use AI", winner: "buildlocal" },
      { feature: "Hosting included", buildLocal: "Yes — fast CDN hosting", competitor: "Yes", winner: "tie" },
      { feature: "Ads on your site", buildLocal: "Never", competitor: "On free/basic plans", winner: "buildlocal" },
      { feature: "Page speed", buildLocal: "Optimized — fast loading", competitor: "Often slow due to bloat", winner: "buildlocal" },
      { feature: "Ongoing support", buildLocal: "Direct phone + email", competitor: "Help center + chat", winner: "buildlocal" },
      { feature: "Trades specialization", buildLocal: "Built specifically for trades", competitor: "Generic for all businesses", winner: "buildlocal" },
    ],
    faqs: [
      { category: "general", question: "Is Wix good for a contractor website?", answer: "Wix can work for a basic contractor website, but it has limitations. The drag-and-drop editor creates heavy pages that load slowly, the SEO tools are basic, and you're doing all the work yourself. For a trades business that needs to generate leads and rank on Google, a professionally built site is a better investment." },
      { category: "pricing", question: "Why is BuildLocal more expensive than Wix?", answer: "Wix gives you a tool. BuildLocal gives you a result. Our price includes custom design, professional content writing, local SEO, hosting, and monthly updates — all done for you. With Wix, you pay less monthly but invest dozens of hours building and maintaining it yourself." },
      { category: "website", question: "Are Wix sites slow?", answer: "Wix sites tend to load slower than custom-built sites due to the platform's JavaScript overhead and template bloat. Page speed directly affects Google rankings and conversion rates. BuildLocal sites are built on Next.js with optimized performance from the start." },
      { category: "service", question: "Can you move my Wix site to BuildLocal?", answer: "Absolutely. We migrate businesses off Wix regularly. We'll recreate your site with a custom design, move your content, connect your domain, and handle everything. No downtime, no hassle." },
      { category: "general", question: "What does BuildLocal include that Wix doesn't?", answer: "Content writing, custom design (not templates), local SEO setup, monthly updates, phone support, and trades-specific expertise. With Wix, you get a builder tool and support articles. With BuildLocal, you get a team that builds and manages your entire web presence." },
    ],
  },

  "buildlocal-vs-godaddy": {
    slug: "buildlocal-vs-godaddy",
    competitorName: "GoDaddy",
    competitorType: "platform",
    metaTitle:
      "BuildLocal vs GoDaddy Website Builder | Which Is Better?",
    metaDescription:
      "Comparing BuildLocal's managed websites with GoDaddy's website builder for trades and small businesses. Done-for-you vs DIY. See the full comparison.",
    heroH1: "BuildLocal vs GoDaddy: Which Gets You More Leads?",
    heroSubhead:
      "GoDaddy sells you a domain and a basic website builder. BuildLocal builds you a professional, SEO-optimized website and manages it month to month. Here's the real comparison for trades businesses.",
    verdict:
      "GoDaddy is a domain registrar that added a website builder as an upsell. BuildLocal is a web design agency that builds conversion-focused sites for trades businesses. If you want results, not just a website, the choice is clear.",
    rows: [
      { feature: "Custom design", buildLocal: "Fully custom, built for you", competitor: "Basic templates, limited customization", winner: "buildlocal" },
      { feature: "Monthly price", buildLocal: "$195-$595/mo", competitor: "$10-$25/mo + your time", winner: "tie" },
      { feature: "Setup required", buildLocal: "None", competitor: "You build it yourself", winner: "buildlocal" },
      { feature: "SEO", buildLocal: "Local SEO built in by experts", competitor: "Basic SEO wizard", winner: "buildlocal" },
      { feature: "Content quality", buildLocal: "Professionally written", competitor: "AI-generated or self-written", winner: "buildlocal" },
      { feature: "Upselling", buildLocal: "Flat monthly price, everything included", competitor: "Constant upsells for email, SSL, SEO tools", winner: "buildlocal" },
      { feature: "Phone support", buildLocal: "Direct access to your team", competitor: "Generic call center", winner: "buildlocal" },
      { feature: "Design quality", buildLocal: "Agency-quality design", competitor: "Basic cookie-cutter look", winner: "buildlocal" },
    ],
    faqs: [
      { category: "general", question: "Is GoDaddy good for a contractor website?", answer: "GoDaddy's website builder is extremely basic. It works for a placeholder page, but it won't help you rank on Google or convert visitors into leads. For a trades business that depends on local customers finding you online, you need more than what GoDaddy offers." },
      { category: "pricing", question: "GoDaddy is much cheaper — is it worth the savings?", answer: "GoDaddy's headline price is low, but they nickel-and-dime you for everything: SSL certificates, email, SEO tools, premium templates. Add up the real cost plus your time, and the gap shrinks fast. BuildLocal's flat monthly price includes everything with no surprises." },
      { category: "service", question: "Can I keep my GoDaddy domain and switch to BuildLocal?", answer: "Yes. Your domain stays with GoDaddy (or we can help you transfer it). We'll point your domain to your new BuildLocal website. You keep your domain, email, and everything else — just with a much better website." },
    ],
  },

  "buildlocal-vs-scorpion": {
    slug: "buildlocal-vs-scorpion",
    competitorName: "Scorpion",
    competitorType: "agency",
    metaTitle:
      "BuildLocal vs Scorpion | Affordable Alternative for Trades Businesses",
    metaDescription:
      "BuildLocal vs Scorpion comparison for contractor and home service websites. Same results, fraction of the cost. See how we compare.",
    heroH1: "BuildLocal vs Scorpion: Better Websites at a Fraction of the Cost",
    heroSubhead:
      "Scorpion charges $2,000-$5,000/month for marketing packages that lock you into long contracts. BuildLocal delivers professional websites for trades businesses starting at $195/month with no contracts. Here's the full comparison.",
    verdict:
      "Scorpion is a full-service marketing agency with enterprise pricing. If you're a large home service company spending $10K+/month on marketing, Scorpion might make sense. But for most trades businesses, BuildLocal delivers the website and SEO foundation you need at 1/10th the cost.",
    rows: [
      { feature: "Monthly cost", buildLocal: "$195-$595/mo", competitor: "$2,000-$5,000+/mo", winner: "buildlocal" },
      { feature: "Contracts", buildLocal: "No contracts, cancel anytime", competitor: "12-24 month contracts typical", winner: "buildlocal" },
      { feature: "Custom website", buildLocal: "Yes — fully custom", competitor: "Yes — but cookie-cutter for their clients", winner: "tie" },
      { feature: "SEO included", buildLocal: "Local SEO fundamentals", competitor: "Full SEO + PPC packages", winner: "competitor" },
      { feature: "You own your website", buildLocal: "Yes", competitor: "Often no — locked to their platform", winner: "buildlocal" },
      { feature: "Setup fees", buildLocal: "None", competitor: "$1,000-$3,000 typical", winner: "buildlocal" },
      { feature: "Account manager", buildLocal: "Direct team access", competitor: "Dedicated account manager", winner: "tie" },
      { feature: "Best for", buildLocal: "Small-mid trades businesses", competitor: "Large home service companies", winner: "tie" },
    ],
    faqs: [
      { category: "pricing", question: "How much does Scorpion cost compared to BuildLocal?", answer: "Scorpion typically charges $2,000-$5,000/month with 12-24 month contracts and setup fees of $1,000-$3,000. BuildLocal starts at $195/month with no contracts and no setup fees. For a small trades business, that's the difference between a manageable expense and a major financial commitment." },
      { category: "general", question: "Is Scorpion worth the higher price?", answer: "Scorpion includes more services — paid advertising management, reputation management, and full SEO campaigns. If you need all of that and have the budget, it can be worth it. But if you primarily need a great website with SEO basics and don't want to spend $3K+/month, BuildLocal is the smarter choice." },
      { category: "service", question: "Do I own my website with Scorpion?", answer: "This varies, but many Scorpion clients report that their websites are built on Scorpion's proprietary platform and are difficult or impossible to take with you when you leave. With BuildLocal, you always own your website and can take it with you if you cancel." },
      { category: "general", question: "Can BuildLocal compete with Scorpion's SEO results?", answer: "For local SEO — showing up when people in your city search for your trade — BuildLocal websites are built with the same fundamentals. We don't run paid ad campaigns or large-scale link building like Scorpion, but our sites are optimized to rank locally right out of the box." },
    ],
  },

  "buildlocal-vs-wordpress": {
    slug: "buildlocal-vs-wordpress",
    competitorName: "WordPress",
    competitorType: "platform",
    metaTitle:
      "BuildLocal vs WordPress | Managed Websites vs DIY",
    metaDescription:
      "BuildLocal vs WordPress for trades business websites. Professional managed sites vs self-hosted WordPress. See which approach gets better results.",
    heroH1: "BuildLocal vs WordPress: Skip the Headaches, Get Results",
    heroSubhead:
      "WordPress powers 40% of the web — but that doesn't mean it's the right choice for your trades business. Between plugins, security updates, hosting, and the learning curve, most WordPress sites end up outdated and vulnerable. Here's a better way.",
    verdict:
      "WordPress is powerful but demands technical knowledge, ongoing maintenance, and security vigilance. For trades business owners who want a website that works without constant attention, BuildLocal eliminates the complexity while delivering better results.",
    rows: [
      { feature: "Setup difficulty", buildLocal: "None — fully done for you", competitor: "High — hosting, themes, plugins, configuration", winner: "buildlocal" },
      { feature: "Monthly cost", buildLocal: "$195-$595/mo all-inclusive", competitor: "$30-$100/mo hosting + $2K-$10K build", winner: "buildlocal" },
      { feature: "Security", buildLocal: "Managed — always secure", competitor: "You manage updates, patches, plugins", winner: "buildlocal" },
      { feature: "Speed", buildLocal: "Fast — optimized builds", competitor: "Often slow due to plugin bloat", winner: "buildlocal" },
      { feature: "Customization", buildLocal: "Custom design within our system", competitor: "Unlimited with right developer", winner: "competitor" },
      { feature: "SEO capability", buildLocal: "Local SEO built in", competitor: "Strong with Yoast/RankMath plugins", winner: "tie" },
      { feature: "Ongoing maintenance", buildLocal: "All included", competitor: "You handle or pay someone $100-$300/mo", winner: "buildlocal" },
      { feature: "Plugin conflicts", buildLocal: "N/A — no plugins", competitor: "Common — breaks sites regularly", winner: "buildlocal" },
    ],
    faqs: [
      { category: "general", question: "Is WordPress free?", answer: "WordPress.org software is free, but you need hosting ($10-$50/mo), a premium theme ($50-$200), plugins ($100-$500/year), and either your time or a developer ($2,000-$10,000) to build the site. The 'free' label is misleading — a good WordPress site costs real money." },
      { category: "website", question: "Is WordPress or BuildLocal better for SEO?", answer: "Both can rank well. WordPress with Yoast or RankMath is powerful for SEO — if you know how to configure it. BuildLocal builds SEO into every site from the start with local-specific optimizations. For trades businesses, we consistently deliver strong local rankings without requiring you to learn SEO." },
      { category: "service", question: "Can you migrate my WordPress site to BuildLocal?", answer: "Yes. We migrate WordPress sites regularly. We'll preserve your content, SEO value, and domain while building you a faster, more secure, professionally managed site. No more plugin updates, security patches, or WordPress headaches." },
      { category: "general", question: "What about WordPress.com vs WordPress.org?", answer: "WordPress.com is a hosted platform (like Squarespace) with limited control. WordPress.org is self-hosted with full control but full responsibility. Neither gives you a done-for-you experience. BuildLocal handles everything — design, hosting, security, updates, and SEO — so you focus on your business." },
    ],
  },
};

export function getComparisonConfig(slug: string): ComparisonConfig | undefined {
  return comparisonMap[slug];
}

export function getAllComparisonSlugs(): string[] {
  return Object.keys(comparisonMap);
}
