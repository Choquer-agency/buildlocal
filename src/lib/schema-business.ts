import { BusinessProfile } from "@/content/businesses";

const CAMPAIGN_DOMAIN =
  process.env.NEXT_PUBLIC_CAMPAIGN_DOMAIN || "https://sites.buildlocal.agency";

/** LocalBusiness + Service + Review schema for one business site. */
export function generateBusinessSchema(b: BusinessProfile) {
  const base = `${CAMPAIGN_DOMAIN}/p/${b.slug}`;
  const telDigits = b.phone.replace(/[^\d]/g, "");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${base}/#business`,
        name: b.name,
        description: b.generatedCopy.metaDescription,
        url: base,
        telephone: `+1${telDigits}`,
        ...(b.email && { email: b.email }),
        address: {
          "@type": "PostalAddress",
          ...(b.address.street && { streetAddress: b.address.street }),
          addressLocality: b.address.locality,
          addressRegion: b.address.region,
          ...(b.address.postalCode && { postalCode: b.address.postalCode }),
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: b.lat,
          longitude: b.lng,
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: b.rating,
          reviewCount: b.reviewCount,
        },
        areaServed: b.serviceAreas.map((area) => ({
          "@type": "City",
          name: area,
        })),
        openingHoursSpecification: b.hours
          .filter((h) => h.hours.toLowerCase() !== "closed")
          .map((h) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: h.day,
            description: h.hours,
          })),
        image: b.photos,
      },
      ...b.reviews.slice(0, 5).map((r) => ({
        "@type": "Review",
        itemReviewed: { "@id": `${base}/#business` },
        author: { "@type": "Person", name: r.author },
        reviewRating: {
          "@type": "Rating",
          ratingValue: r.rating,
          bestRating: 5,
        },
        reviewBody: r.text,
      })),
      ...b.services.map((s) => ({
        "@type": "Service",
        name: s.name,
        description: s.blurb,
        provider: { "@id": `${base}/#business` },
        areaServed: b.serviceAreas.map((area) => ({ "@type": "City", name: area })),
      })),
    ],
  };
}

export function telHref(phone: string): string {
  return `tel:+1${phone.replace(/[^\d]/g, "")}`;
}

export function areaSlug(area: string): string {
  return area.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
