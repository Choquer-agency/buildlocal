import { MetadataRoute } from "next";
import { headers } from "next/headers";
import { domainMap } from "@/content/domains";
import { defaultConfig } from "@/content/config";
import { getAllServiceSlugs } from "@/content/services";
import { getAllIndustrySlugs } from "@/content/industries";
import { getAllTradeSlugs } from "@/content/trades";
import { getAllCitySlugs } from "@/content/cities";
import { getAllComparisonSlugs } from "@/content/comparisons";
import blogManifest from "@/content/blog/manifest.json";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const hostname = host.replace(/:\d+$/, "").replace(/^www\./, "");
  const config = domainMap[hostname] || defaultConfig;
  const domain = config.domain;

  const posts = blogManifest.filter((p) => p.region === config.region);
  const serviceSlugs = getAllServiceSlugs();
  const industrySlugs = getAllIndustrySlugs();
  const tradeSlugs = getAllTradeSlugs();
  const citySlugs = getAllCitySlugs();

  // Blog entries
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://${domain}/blog/${post.slug}`,
    lastModified: new Date(post.modifiedDate),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Service entries
  const serviceEntries: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `https://${domain}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // Industry hub entries (broad categories + specific trades)
  const industryEntries: MetadataRoute.Sitemap = industrySlugs.map((slug) => ({
    url: `https://${domain}/industries/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // Industry + City entries (255 pages)
  const industryCityEntries: MetadataRoute.Sitemap = [];
  for (const trade of tradeSlugs) {
    for (const city of citySlugs) {
      industryCityEntries.push({
        url: `https://${domain}/industries/${trade}/${city}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.85,
      });
    }
  }

  // City hub entries
  const cityEntries: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: `https://${domain}/locations/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // Comparison entries
  const comparisonSlugs = getAllComparisonSlugs();
  const comparisonEntries: MetadataRoute.Sitemap = comparisonSlugs.map((slug) => ({
    url: `https://${domain}/compare/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // Tools entries
  const toolsEntries: MetadataRoute.Sitemap = [
    {
      url: `https://${domain}/tools/seo-roi-calculator`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  return [
    // Homepage
    {
      url: `https://${domain}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // Core pages
    {
      url: `https://${domain}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `https://${domain}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `https://${domain}/how-it-works`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `https://${domain}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `https://${domain}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Services
    ...serviceEntries,
    // Industry hubs
    ...industryEntries,
    // City hubs
    ...cityEntries,
    // Industry + City pages
    ...industryCityEntries,
    // Comparisons
    ...comparisonEntries,
    // Tools
    ...toolsEntries,
    // Blog
    ...(posts.length > 0
      ? [
          {
            url: `https://${domain}/blog`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.9,
          },
          ...blogEntries,
        ]
      : []),
  ];
}
