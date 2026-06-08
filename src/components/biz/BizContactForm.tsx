"use client";

import { useState } from "react";
import { submitForm } from "@/lib/form";
import { Theme } from "@/lib/themes";

interface BizContactFormProps {
  businessName: string;
  businessSlug: string;
  locality: string;
  services: { name: string; slug: string }[];
  theme: Theme;
}

export function BizContactForm({
  businessName,
  businessSlug,
  locality,
  services,
  theme,
}: BizContactFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      await submitForm({
        ...data,
        // Attribution so leads route back to the right business (mirrors Lead shape)
        websiteSource: businessSlug,
        websiteRegion: locality,
        _subject: `New lead for ${businessName}`,
      });
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputCls =
    "w-full rounded-md border border-dark/12 bg-white px-4 py-3 font-biz text-fluid-main text-dark placeholder:text-dark/35 focus:outline-none focus:ring-2";

  if (status === "done") {
    return (
      <div
        className="rounded-lg p-8 text-center"
        style={{ background: theme.softBg }}
      >
        <div
          className="mx-auto mb-4 grid place-items-center rounded-full"
          style={{ width: 56, height: 56, background: theme.accent, color: theme.onAccent }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-head font-medium text-fluid-h4 text-dark mb-2">Thanks — we got it!</h3>
        <p className="font-biz text-fluid-main text-dark/60">
          {businessName} will reach out shortly. For anything urgent, just give us a call.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input name="name" required placeholder="Your name" className={inputCls} style={{ "--tw-ring-color": theme.accent } as React.CSSProperties} />
        <input name="phone" required placeholder="Phone number" className={inputCls} style={{ "--tw-ring-color": theme.accent } as React.CSSProperties} />
      </div>
      <input name="email" type="email" placeholder="Email (optional)" className={inputCls} style={{ "--tw-ring-color": theme.accent } as React.CSSProperties} />
      <select name="service" className={inputCls} style={{ "--tw-ring-color": theme.accent } as React.CSSProperties} defaultValue="">
        <option value="" disabled>What do you need help with?</option>
        {services.map((s) => (
          <option key={s.slug} value={s.name}>{s.name}</option>
        ))}
        <option value="Other">Something else</option>
      </select>
      <textarea name="message" rows={4} placeholder="Tell us about your project (optional)" className={inputCls} style={{ "--tw-ring-color": theme.accent } as React.CSSProperties} />
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center rounded-md py-3.5 font-biz font-medium text-fluid-main disabled:opacity-60 transition-opacity"
        style={{ background: theme.accent, color: theme.onAccent }}
      >
        {status === "sending" ? "Sending…" : "Get My Free Quote"}
      </button>
      {status === "error" && (
        <p className="font-biz text-sm text-red-600 text-center">
          Something went wrong. Please call us instead — we&apos;d love to help.
        </p>
      )}
    </form>
  );
}
