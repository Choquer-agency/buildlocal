import { notFound } from "next/navigation";
import { getBusinessConfig } from "@/content/businesses";
import { resolveTheme } from "@/lib/crm-store";
import { generateBusinessSchema } from "@/lib/schema-business";
import {
  BizHero, BizServicesGrid, BizGallery, BizWhyChooseUs, BizReviews, BizAreas, BizCta,
} from "@/components/biz/BizSections";

interface PageProps {
  params: { business: string };
}


export const dynamic = "force-dynamic";

export default async function BusinessHome({ params }: PageProps) {
  const b = getBusinessConfig(params.business);
  if (!b) notFound();
  const theme = await resolveTheme(b);
  const schema = generateBusinessSchema(b);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BizHero b={b} theme={theme} />
      <BizServicesGrid b={b} theme={theme} />
      <BizWhyChooseUs b={b} theme={theme} />
      <BizGallery b={b} theme={theme} />
      <BizReviews b={b} theme={theme} />
      <BizAreas b={b} theme={theme} />
      <BizCta b={b} theme={theme} />
    </>
  );
}
