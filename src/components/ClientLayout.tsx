"use client";

import { ReactNode } from "react";
import { ContactFormProvider } from "@/context/ContactFormContext";
import { ContactFormModal } from "@/components/ContactForm";
import { StickyMobileCta } from "@/components/StickyMobileCta";

interface ClientLayoutProps {
  children: ReactNode;
  domain: string;
  region: string;
}

export function ClientLayout({ children, domain, region }: ClientLayoutProps) {
  return (
    <ContactFormProvider>
      {children}
      <ContactFormModal domain={domain} region={region} />
      <StickyMobileCta />
    </ContactFormProvider>
  );
}
