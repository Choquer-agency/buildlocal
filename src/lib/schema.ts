import { DomainConfig } from "@/content/config";
import { getExpandedFaqs } from "@/content/shared";
import { processSteps, agencyServices } from "@/content/shared";

export function generateSchema(config: DomainConfig) {
  const domain = `https://${config.domain}`;
  const locality = config.locality;
  const region = config.region;
  const expandedFaqs = getExpandedFaqs(locality, region, config.slug);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": `${domain}/#business`,
        name: config.brandName,
        description: config.metaDescription,
        url: domain,
        foundingDate: "2024",
        logo: `${domain}/images/logo.png`,
        ...(config.telephone && { telephone: config.telephone }),
        ...(config.email && { email: config.email }),
        areaServed: [
          { "@type": "City", name: locality },
          { "@type": "State", name: region },
        ],
        ...(config.schemaAddress && {
          address: {
            "@type": "PostalAddress",
            addressLocality: config.schemaAddress.locality,
            addressRegion: config.schemaAddress.region,
            addressCountry: config.schemaAddress.country,
          },
        }),
        ...(config.geoCoordinates && {
          geo: {
            "@type": "GeoCoordinates",
            latitude: config.geoCoordinates.latitude,
            longitude: config.geoCoordinates.longitude,
          },
        }),
        priceRange: "$195 - $595/mo",
        serviceType: [
          "Website Design",
          "Website Development",
          "Web Hosting",
          "SEO",
          "Google Business Profile Management",
        ],
        knowsAbout: [
          "Website Design",
          "Website Development",
          "Web Hosting",
          "Search Engine Optimization",
          "Google Business Profile Management",
          "Responsive Web Design",
          "Conversion Rate Optimization",
        ],
      },

      {
        "@type": "WebPage",
        "@id": `${domain}/#webpage`,
        url: domain,
        name: config.metaTitle,
        description: config.metaDescription,
        isPartOf: { "@id": `${domain}/#website` },
        about: { "@id": `${domain}/#business` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["#hero h1", "#hero p", "#why-buildlocal h2", "#faq"],
        },
      },

      {
        "@type": "WebSite",
        "@id": `${domain}/#website`,
        url: domain,
        name: config.brandName,
        publisher: { "@id": `${domain}/#business` },
      },

      {
        "@type": "FAQPage",
        "@id": `${domain}/#faq`,
        mainEntity: expandedFaqs.map((faq) => ({
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
        name: "Our Web Development Process",
        description:
          `Our four-step process for designing and building websites for ${region} businesses.`,
        step: processSteps.map((s) => ({
          "@type": "HowToStep",
          position: s.step,
          name: s.title,
          text: s.description,
        })),
      },

      ...agencyServices.map((service: { title: string; description: string }) => ({
        "@type": "Service",
        serviceType: service.title,
        description: service.description,
        provider: { "@id": `${domain}/#business` },
        areaServed: { "@type": "State", name: region },
      })),

    ],
  };
}
