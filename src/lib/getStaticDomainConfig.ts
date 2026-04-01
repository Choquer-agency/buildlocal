import { defaultConfig, DomainConfig } from "@/content/config";
import { domainMap } from "@/content/domains";

/**
 * Returns the domain config without reading request headers.
 * Use this in page components to enable static generation (SSG).
 * For dynamic routes that need runtime domain resolution (API routes, sitemap),
 * continue using getDomainConfig() from ./getDomainConfig.
 */
export function getStaticDomainConfig(): DomainConfig {
  const devDomain = process.env.NEXT_PUBLIC_DEV_DOMAIN;
  if (devDomain) {
    return domainMap[devDomain] || defaultConfig;
  }
  return defaultConfig;
}
