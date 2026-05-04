import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Read KoveTrade's Cookie Policy to understand how we use cookies and similar tracking technologies on our platform.",
  alternates: { canonical: "https://kovetrade.com/cookies" },
  robots: { index: true, follow: false },
  openGraph: { title: "Cookie Policy | KoveTrade", url: "https://kovetrade.com/cookies" },
};

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
