import { notFound } from "next/navigation";
import { getBusinessConfig } from "@/content/businesses";
import { resolveTheme } from "@/lib/crm-store";
import { BizAreas, BizCta } from "@/components/biz/BizSections";

interface PageProps {
  params: { business: string };
}


export const dynamic = "force-dynamic";

export default async function AreasPage({ params }: PageProps) {
  const b = getBusinessConfig(params.business);
  if (!b) notFound();
  const theme = await resolveTheme(b);

  return (
    <>
      <section className="section-space-small" style={{ background: theme.heroBg }}>
        <div className="u-container">
          <p className="font-mono text-xs uppercase tracking-wider mb-4" style={{ color: theme.accentOnHero ?? theme.accent }}>
            Where we work
          </p>
          <h1 className="font-head font-medium text-fluid-h1 leading-[1.1] text-dark max-w-[22ch]">
            Areas {b.name.split(/\s+/)[0]} proudly serves
          </h1>
        </div>
      </section>
      <BizAreas b={b} theme={theme} />
      <BizCta b={b} theme={theme} />
    </>
  );
}
