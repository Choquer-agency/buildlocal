import { notFound } from "next/navigation";
import { Phone, Mail, MapPin } from "lucide-react";
import { getBusinessConfig } from "@/content/businesses";
import { resolveTheme } from "@/lib/crm-store";
import { telHref } from "@/lib/schema-business";
import { BizHours } from "@/components/biz/BizSections";
import { BizContactForm } from "@/components/biz/BizContactForm";

interface PageProps {
  params: { business: string };
}

export const dynamic = "force-dynamic";

export default async function ContactPage({ params }: PageProps) {
  const b = getBusinessConfig(params.business);
  if (!b) notFound();
  const theme = await resolveTheme(b);
  const photo = b.photos[0];

  return (
    <>
      {/* Hero: heading left, body right, then a full-width photo (services style) */}
      <section className="bg-white">
        <div className="u-container pt-32 md:pt-44 pb-14 md:pb-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 lg:items-end">
            <h1 className="font-head font-medium leading-[1.04] text-dark" style={{ fontSize: "clamp(2.3rem, 4.2vw, 4.4rem)" }}>
              Let&apos;s talk about your project
            </h1>
            <div className="lg:pb-2">
              <p className="font-biz text-fluid-main text-dark/60 leading-relaxed max-w-[46ch]">
                Call, email, or send a note below — {b.name} will get back to you fast with a free, no-pressure quote.
              </p>
            </div>
          </div>
        </div>
        {photo && (
          <div className="w-full overflow-hidden" style={{ height: "60vh" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt={`${b.name} work`} className="w-full h-full object-cover" />
          </div>
        )}
      </section>

      {/* Contact details (left: phone/email/location/hours) + form (right) */}
      <section className="bg-white">
        <div className="section-space-main">
          <div className="u-container grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: details + hours */}
            <div>
              <p className="font-mono text-xs uppercase tracking-wider mb-4" style={{ color: theme.accent }}>Get in touch</p>
              <h2 className="font-head font-medium text-fluid-h3 text-dark mb-6">Reach {b.name}</h2>
              <div className="grid gap-4 mb-8">
                <a href={telHref(b.phone)} className="flex items-center gap-4">
                  <span className="grid place-items-center rounded-xl flex-shrink-0" style={{ width: 48, height: 48, background: theme.softBg, color: theme.accent }}><Phone size={20} /></span>
                  <span>
                    <span className="block font-mono text-xs uppercase tracking-wider text-dark/45">Call</span>
                    <span className="block font-biz font-semibold text-fluid-large text-dark">{b.phone}</span>
                  </span>
                </a>
                {b.email && (
                  <a href={`mailto:${b.email}`} className="flex items-center gap-4">
                    <span className="grid place-items-center rounded-xl flex-shrink-0" style={{ width: 48, height: 48, background: theme.softBg, color: theme.accent }}><Mail size={20} /></span>
                    <span>
                      <span className="block font-mono text-xs uppercase tracking-wider text-dark/45">Email</span>
                      <span className="block font-biz font-semibold text-fluid-main text-dark">{b.email}</span>
                    </span>
                  </a>
                )}
                <div className="flex items-center gap-4">
                  <span className="grid place-items-center rounded-xl flex-shrink-0" style={{ width: 48, height: 48, background: theme.softBg, color: theme.accent }}><MapPin size={20} /></span>
                  <span>
                    <span className="block font-mono text-xs uppercase tracking-wider text-dark/45">Service area</span>
                    <span className="block font-biz font-semibold text-fluid-main text-dark">{b.address.locality}, {b.address.region}</span>
                  </span>
                </div>
              </div>
              <BizHours b={b} theme={theme} />
            </div>

            {/* Right: form */}
            <div className="rounded-2xl bg-white border border-dark/10 p-6 sm:p-8 shadow-sm">
              <BizContactForm
                businessName={b.name}
                businessSlug={b.slug}
                locality={b.address.locality}
                services={b.services.map((s) => ({ name: s.name, slug: s.slug }))}
                theme={theme}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
