import type { Metadata } from "next";
import { neueMontreal, neueBit, ibmPlexMono } from "./fonts";
import { getStaticDomainConfig } from "@/lib/getStaticDomainConfig";

import { GoogleTagManager, GoogleTagManagerNoscript } from "@/components/GoogleTagManager";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const config = getStaticDomainConfig();
  return {
    title: config.metaTitle,
    description: config.metaDescription,
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      url: `https://${config.domain}`,
      siteName: config.brandName,
      images: [
        {
          url: config.ogImage || `https://${config.domain}/images/og-default.jpg`,
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.metaTitle,
      description: config.metaDescription,
    },
    other: {
      "geo.region": config.geoRegionCode || "US-AZ",
      "geo.placename": config.schemaAddress?.locality || "Phoenix",
      "geo.position": config.geoCoordinates
        ? `${config.geoCoordinates.latitude};${config.geoCoordinates.longitude}`
        : "33.4484;-112.0740",
      ICBM: config.geoCoordinates
        ? `${config.geoCoordinates.latitude}, ${config.geoCoordinates.longitude}`
        : "33.4484, -112.0740",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = getStaticDomainConfig();

  return (
    <html
      lang="en"
      className={`w-mod-js lenis ${neueMontreal.variable} ${neueBit.variable} ${ibmPlexMono.variable}`}
      data-scroll-orientation="vertical"
      style={{ '--page-color': config.accentColor || '#c4ef7a' } as React.CSSProperties}
    >
      <head>
        {config.gtmId && <GoogleTagManager gtmId={config.gtmId} />}
      </head>
      <body className="font-sans">
        {config.gtmId && <GoogleTagManagerNoscript gtmId={config.gtmId} />}
        {children}
      </body>
    </html>
  );
}
