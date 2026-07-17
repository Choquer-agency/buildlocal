import { Phone, MapPin, Mail } from "lucide-react";
import { BusinessProfile } from "@/content/businesses";
import { Theme } from "@/lib/themes";
import { telHref } from "@/lib/schema-business";

export function BizFooter({ b, theme, dark }: { b: BusinessProfile; theme: Theme; dark?: boolean }) {
  const base = `/p/${b.slug}`;
  const explore = [
    { label: "Services", path: "services" },
    { label: "Service Areas", path: "areas" },
    { label: "Reviews", path: "reviews" },
    { label: "About", path: "about" },
    { label: "Contact", path: "contact" },
  ];
  // Dark chrome (for white logos): near-black footer + light text.
  const txt = dark ? "text-white" : "text-dark";
  const muted = dark ? "text-white/65" : "text-dark/70";
  const faint = dark ? "text-white/45" : "text-dark/55";
  const dim = dark ? "text-white/40" : "text-dark/45";
  const borderC = dark ? "border-white/10" : "border-dark/10";
  return (
    <footer style={{ background: dark ? "#0d0d0d" : "#fff", ["--biz-accent" as string]: theme.accent } as React.CSSProperties} className={`font-sans border-t ${txt} ${borderC}`}>
      <div className="u-container py-16 md:py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Brand + NAP */}
          <div className="lg:col-span-4">
            <div className="mb-4">
              {b.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={b.logo} alt={b.name} className="h-[90px] w-auto max-w-[300px] object-contain" style={{ mixBlendMode: (b.logoBlend as React.CSSProperties["mixBlendMode"]) || undefined }} />
              ) : (
                <span className="font-semibold text-xl">{b.name}</span>
              )}
            </div>
            <p className={`text-sm leading-relaxed mb-6 max-w-sm ${faint}`}>{b.generatedCopy.serviceAreaBlurb}</p>
            <div className="flex flex-col gap-2.5 text-sm">
              <a href={telHref(b.phone)} className="link-accent inline-flex items-center gap-2.5">
                <Phone size={15} style={{ color: dark ? theme.accent : (theme.accentOnWhite ?? theme.accent) }} /> {b.phone}
              </a>
              {b.email && (
                <a href={`mailto:${b.email}`} className="link-accent inline-flex items-center gap-2.5">
                  <Mail size={15} style={{ color: dark ? theme.accent : (theme.accentOnWhite ?? theme.accent) }} /> {b.email}
                </a>
              )}
              <span className={`inline-flex items-start gap-2.5 ${muted}`}>
                <MapPin size={15} style={{ color: dark ? theme.accent : (theme.accentOnWhite ?? theme.accent) }} className="mt-0.5" />
                {b.address.street ? `${b.address.street}, ` : ""}{b.address.locality}, {b.address.region} {b.address.postalCode ?? ""}
              </span>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className={`space-y-2.5 text-sm ${muted}`}>
              {b.services.slice(0, 6).map((s) => (
                <li key={s.slug}><a href={`${base}/services/${s.slug}`} className="link-accent">{s.name}</a></li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className={`space-y-2.5 text-sm ${muted}`}>
              {explore.map((l) => (
                <li key={l.path}><a href={`${base}/${l.path}`} className="link-accent">{l.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div className="lg:col-span-3">
            <h3 className="font-semibold mb-4">Hours</h3>
            <ul className={`space-y-2 text-sm ${muted}`}>
              {b.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4 max-w-[220px]">
                  <span>{h.day}</span>
                  <span className={h.hours.toLowerCase() === "closed" ? (dark ? "text-white/30" : "text-dark/35") : ""}>{h.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`mt-12 pt-6 border-t flex flex-wrap items-center justify-between gap-4 text-xs ${borderC} ${dim}`}>
          <p>© {b.name}. Serving {b.address.locality}, {b.address.region}.</p>
          <a href="https://buildlocal.agency" target="_blank" rel="noreferrer" className="link-accent">Site by BuildLocal</a>
        </div>
      </div>
    </footer>
  );
}
