import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read KoveTrade's Terms of Service. Understand the rules, rights, and responsibilities governing use of the KoveTrade platform.",
  alternates: { canonical: "https://kovetrade.com/terms" },
  robots: { index: true, follow: false },
  openGraph: { title: "Terms of Service | KoveTrade", url: "https://kovetrade.com/terms" },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
