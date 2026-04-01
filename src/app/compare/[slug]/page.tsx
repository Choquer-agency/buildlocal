import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, X as XIcon, Minus } from "lucide-react";
import { getStaticDomainConfig } from "@/lib/getStaticDomainConfig";
import {
  getComparisonConfig,
  getAllComparisonSlugs,
  ComparisonRow,
} from "@/content/comparisons";
import { Nav } from "@/components/Nav";
import { ServiceFAQ } from "@/components/ServiceFAQ";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";

interface ComparePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllComparisonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ComparePageProps): Promise<Metadata> {
  const config = getStaticDomainConfig();
  const comparison = getComparisonConfig(params.slug);

  if (!comparison) return {};

  return {
    title: comparison.metaTitle,
    description: comparison.metaDescription,
    openGraph: {
      title: comparison.metaTitle,
      description: comparison.metaDescription,
      url: `https://${config.domain}/compare/${comparison.slug}`,
      siteName: config.brandName,
      type: "website",
    },
    alternates: {
      canonical: `https://${config.domain}/compare/${comparison.slug}`,
    },
  };
}

function WinnerIcon({ winner }: { winner: ComparisonRow["winner"] }) {
  if (winner === "buildlocal")
    return <Check size={16} className="text-green-600" />;
  if (winner === "competitor")
    return <XIcon size={16} className="text-red-500" />;
  return <Minus size={16} className="text-dark opacity-30" />;
}

export default function ComparePage({ params }: ComparePageProps) {
  const config = getStaticDomainConfig();
  const comparison = getComparisonConfig(params.slug);

  if (!comparison) {
    notFound();
  }

  const domain = `https://${config.domain}`;
  const pageUrl = `${domain}/compare/${comparison.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: comparison.metaTitle,
        description: comparison.metaDescription,
        isPartOf: { "@id": `${domain}/#website` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", ".verdict"],
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}/#faq`,
        mainEntity: comparison.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: domain },
          {
            "@type": "ListItem",
            position: 2,
            name: `BuildLocal vs ${comparison.competitorName}`,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Nav brandName={config.brandName} />

      {/* Hero */}
      <section style={{ backgroundColor: "#FFF9F0" }}>
        <div className="section-space-hero">
          <div className="u-container">
            <nav className="mb-8">
              <ol className="flex items-center gap-2 font-mono text-xs text-dark opacity-40">
                <li>
                  <Link href="/" className="hover:text-brand transition-colors">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li className="opacity-60">
                  BuildLocal vs {comparison.competitorName}
                </li>
              </ol>
            </nav>

            <span className="font-mono text-xs uppercase tracking-wider text-brand mb-4 block">
              Comparison
            </span>
            <h1 className="font-sans font-medium text-fluid-h1 leading-[1.1] tracking-tight text-dark max-w-[24ch] mb-6">
              {comparison.heroH1}
            </h1>
            <p className="font-sans text-fluid-large text-dark opacity-60 leading-relaxed max-w-[56ch]">
              {comparison.heroSubhead}
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section style={{ backgroundColor: "white" }}>
        <div className="section-space-main">
          <div className="u-container max-w-4xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-dark/10">
                    <th className="text-left font-sans font-medium text-fluid-small text-dark py-4 pr-4 w-1/3">
                      Feature
                    </th>
                    <th className="text-left font-sans font-medium text-fluid-small py-4 px-4 w-1/3">
                      <span className="text-brand">BuildLocal</span>
                    </th>
                    <th className="text-left font-sans font-medium text-fluid-small text-dark opacity-50 py-4 pl-4 w-1/3">
                      {comparison.competitorName}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.rows.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={
                        i % 2 === 0 ? "bg-white" : "bg-dark/[0.02]"
                      }
                    >
                      <td className="font-sans text-fluid-small font-medium text-dark py-4 pr-4">
                        {row.feature}
                      </td>
                      <td className="font-sans text-fluid-small text-dark py-4 px-4">
                        <div className="flex items-center gap-2">
                          <WinnerIcon winner={row.winner} />
                          <span
                            className={
                              row.winner === "buildlocal"
                                ? "font-medium"
                                : "opacity-70"
                            }
                          >
                            {row.buildLocal}
                          </span>
                        </div>
                      </td>
                      <td className="font-sans text-fluid-small text-dark opacity-60 py-4 pl-4">
                        {row.competitor}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Verdict */}
      <section style={{ backgroundColor: "#FFF9F0" }}>
        <div className="section-space-main">
          <div className="u-container max-w-3xl">
            <h2 className="font-sans font-medium text-fluid-h3 leading-[1.15] text-dark mb-6">
              The Bottom Line
            </h2>
            <p className="verdict font-sans text-fluid-main text-dark opacity-70 leading-relaxed mb-8">
              {comparison.verdict}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-3 bg-brand text-dark rounded-sm px-8 py-4 font-sans font-medium text-fluid-main hover:brightness-110 transition-all"
              >
                See Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <ServiceFAQ
        faqs={comparison.faqs}
        serviceTitle={`BuildLocal vs ${comparison.competitorName}`}
      />

      <CtaBanner />
      <Footer brandName={config.brandName} />
    </>
  );
}
