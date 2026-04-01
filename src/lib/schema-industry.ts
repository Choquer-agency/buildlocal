import { DomainConfig } from "@/content/config";
import { IndustryPageConfig } from "@/content/industries";

export function generateIndustrySchema(
  config: DomainConfig,
  industry: IndustryPageConfig
) {
  const domain = `https://${config.domain}`;
  const locality = config.locality;
  const region = config.region;
  const slug = config.slug || "arizona";
  const industryFaqs = industry.faqs(locality, region, slug);

  return {
    "@context": "https://schema.org",
    "@graph": [
      // Service
      {
        "@type": "Service",
        "@id": `${domain}/industries/${industry.slug}/#service`,
        name: `${industry.title} Web Design`,
        description: industry.metaDescription(locality, region),
        provider: {
          "@type": ["LocalBusiness", "ProfessionalService"],
          "@id": `${domain}/#business`,
          name: `${config.brandName} — ${region}`,
          url: domain,
          ...(config.telephone && { telephone: config.telephone }),
          ...(config.email && { email: config.email }),
        },
        areaServed: [
          { "@type": "City", name: locality },
          {
            "@type": config.country === "US" ? "State" : "Country",
            name: region,
          },
        ],
        serviceType: `${industry.title} Website Design`,
      },

      // WebPage with speakable (AEO)
      {
        "@type": "WebPage",
        "@id": `${domain}/industries/${industry.slug}/#webpage`,
        url: `${domain}/industries/${industry.slug}`,
        name: industry.metaTitle(locality, region),
        description: industry.metaDescription(locality, region),
        isPartOf: { "@id": `${domain}/#website` },
        about: { "@id": `${domain}/industries/${industry.slug}/#service` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [
            ".industry-hero h1",
            ".industry-hero p",
            "#why-website h2",
            "#faq",
          ],
        },
      },

      // FAQPage
      {
        "@type": "FAQPage",
        "@id": `${domain}/industries/${industry.slug}/#faq`,
        mainEntity: industryFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },

      // HowTo (Process)
      {
        "@type": "HowTo",
        name: `How We Build ${industry.title} Websites`,
        description: `Our step-by-step process for building ${industry.title.toLowerCase()} websites for ${region} businesses.`,
        step: industry.processSteps.map((s) => ({
          "@type": "HowToStep",
          position: s.step,
          name: s.title,
          text: s.description,
        })),
      },

      // BreadcrumbList
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: domain,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: industry.title,
            item: `${domain}/industries/${industry.slug}`,
          },
        ],
      },
    ],
  };
}
