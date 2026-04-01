import { Metadata } from "next";
import { getStaticDomainConfig } from "@/lib/getStaticDomainConfig";
import { ClientLayout } from "@/components/ClientLayout";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function LpLayout({ children }: { children: React.ReactNode }) {
  const config = getStaticDomainConfig();

  return (
    <ClientLayout domain={config.domain} region={config.region}>
      {children}
    </ClientLayout>
  );
}
