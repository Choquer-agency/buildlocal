import { DomainConfig } from "@/content/config";
import { ServicePageConfig } from "@/content/services";

export function generateServiceSchema(
  config: DomainConfig,
  service: ServicePageConfig
) {
  const domain = `https://${config.domain}`;
  const locality = config.locality;
  const region = config.region;
  const serviceFaqs = service.faqs(locality, region);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${domain}/services/${service.slug}/#service`,
        name: service.title,
        description: service.metaDescription(locality, region),
        provider: {
          "@type": ["LocalBusiness", "ProfessionalService"],
          "@id": `${domain}/#business`,
          name: config.brandName,
          url: domain,
          ...(config.telephone && { telephone: config.telephone }),
          ...(config.email && { email: config.email }),
        },
        areaServed: [
          { "@type": "City", name: locality },
          { "@type": "State", name: region },
        ],
        serviceType: service.title,
      },

      {
        "@type": "WebPage",
        "@id": `${domain}/services/${service.slug}/#webpage`,
        url: `${domain}/services/${service.slug}`,
        name: service.metaTitle(locality, region),
        description: service.metaDescription(locality, region),
        isPartOf: { "@id": `${domain}/#website` },
        about: { "@id": `${domain}/services/${service.slug}/#service` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".service-hero h1", ".service-hero p", "#faq"],
        },
      },

      {
        "@type": "FAQPage",
        "@id": `${domain}/services/${service.slug}/#faq`,
        mainEntity: serviceFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },

      {
        "@type": "HowTo",
        name: `How We Handle ${service.title}`,
        description: `Our step-by-step process for ${service.title.toLowerCase()} for ${region} businesses.`,
        step: service.processSteps.map((s) => ({
          "@type": "HowToStep",
          position: s.step,
          name: s.title,
          text: s.description,
        })),
      },

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
            name: service.title,
            item: `${domain}/services/${service.slug}`,
          },
        ],
      },
    ],
  };
}
