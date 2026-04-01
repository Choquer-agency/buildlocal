import { Metadata } from "next";
import { getStaticDomainConfig } from "@/lib/getStaticDomainConfig";
import { ClientLayout } from "@/components/ClientLayout";
import { Nav } from "@/components/Nav";
import { CostCalculator } from "@/components/CostCalculator";
import { ServiceFAQ } from "@/components/ServiceFAQ";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";
import { FAQItem } from "@/content/config";

function getCalculatorFaqs(region: string): FAQItem[] {
  return [
    {
      category: "pricing",
      question: `How much does SEO cost in ${region}?`,
      answer: `Professional SEO services in ${region} typically range from $1,500 to $10,000+ per month depending on competition, scope, and business goals. Local SEO for a single-location business starts around $1,500-$3,000/month. Growth campaigns run $3,000-$5,000/month. Enterprise SEO with aggressive content and link building starts at $5,000/month. Use the calculator above to see what SEO could be worth to your business.`,
    },
    {
      category: "process",
      question: "How long does SEO take to show ROI?",
      answer: "Most businesses see measurable ranking improvements within 60-90 days. Significant traffic and lead increases typically happen within 4-6 months. SEO is a compounding investment — the ROI grows month over month as your rankings strengthen, your content library expands, and your domain authority increases.",
    },
    {
      category: "service",
      question: "How do you calculate SEO ROI?",
      answer: "SEO ROI is calculated by comparing the revenue generated from organic search leads against your SEO investment. The key metrics are: organic traffic volume, conversion rate (traffic to leads), close rate (leads to customers), and average customer value. Our calculator above models these exact variables for your business.",
    },
    {
      category: "general",
      question: "Is SEO worth the investment for small businesses?",
      answer: "For most small businesses, SEO delivers the highest long-term ROI of any marketing channel. Unlike paid ads where costs increase over time, SEO builds an asset that generates leads with decreasing cost per acquisition. A $3,000/month SEO investment generating 20 leads at a 20% close rate can easily produce $50,000+ in monthly revenue for many businesses.",
    },
    {
      category: "process",
      question: "What if I stop doing SEO?",
      answer: "Unlike paid ads that stop immediately, SEO has momentum. However, without ongoing optimization, rankings will gradually decline as competitors continue investing and Google's algorithm evolves. Most businesses that pause SEO see noticeable drops within 3-6 months. SEO works best as a continuous investment with compounding returns.",
    },
  ];
}

export async function generateMetadata(): Promise<Metadata> {
  const config = getStaticDomainConfig();
  const title = `SEO ROI Calculator | ${config.brandName}`;
  const description = `Calculate the potential ROI of SEO for your ${config.region} business. See how organic traffic translates into leads, customers, and revenue.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://${config.domain}/tools/seo-roi-calculator`,
      siteName: config.brandName,
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical: `https://${config.domain}/tools/seo-roi-calculator` },
  };
}

export default function SEOROICalculatorPage() {
  const config = getStaticDomainConfig();
  const faqs = getCalculatorFaqs(config.region);

  return (
    <ClientLayout domain={config.domain} region={config.region}>
      <Nav brandName={config.brandName} />
      <CostCalculator
        slug={config.slug}
        region={config.region}
        locality={config.locality}
      />
      <ServiceFAQ faqs={faqs} serviceTitle="SEO ROI" />
      <CtaBanner />
      <Footer brandName={config.brandName} />
    </ClientLayout>
  );
}
