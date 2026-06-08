import { Metadata } from "next";
import { getBusinessConfig } from "@/content/businesses";
import { resolveTheme } from "@/lib/crm-store";
import { getBizFont } from "@/lib/biz-fonts";
import { BizNav } from "@/components/biz/BizNav";
import { BizFooter } from "@/components/biz/BizFooter";
import { BuildLocalPromo } from "@/components/biz/BuildLocalPromo";

export const dynamic = "force-dynamic";

interface LayoutProps {
  children: React.ReactNode;
  params: { business: string };
}

export function generateMetadata({ params }: LayoutProps): Metadata {
  const b = getBusinessConfig(params.business);
  if (!b) return { robots: { index: false, follow: false } };
  return {
    // Campaign/demo sites must NEVER be indexed — protects buildlocal.agency SEO.
    robots: { index: false, follow: false },
    title: b.generatedCopy.metaTitle,
    description: b.generatedCopy.metaDescription,
  };
}

export default async function BusinessLayout({ children, params }: LayoutProps) {
  const b = getBusinessConfig(params.business);
  if (!b) return <>{children}</>;
  const theme = await resolveTheme(b);
  const font = getBizFont(b.fontKey);

  return (
    <div className="font-biz" style={{ ["--biz-heading" as string]: font.stack } as React.CSSProperties}>
      {font.googleHref && <link rel="stylesheet" href={font.googleHref} />}
      <BizNav slug={b.slug} name={b.name} logo={b.logo} logoBlend={b.logoBlend} logoText={b.logoText} phone={b.phone} theme={theme}
        dark={b.chromeDark} services={b.services.map((s) => ({ name: s.name, slug: s.slug }))} areas={b.serviceAreas} />
      {children}
      <BizFooter b={b} theme={theme} dark={b.chromeDark} />
      <BuildLocalPromo slug={b.slug} businessName={b.name} />
    </div>
  );
}
