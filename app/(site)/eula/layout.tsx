import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "End User License Agreement (EULA)",
  description: "KoveTrade's End User License Agreement governing the use of our software and trading platform.",
  alternates: { canonical: "https://kovetrade.com/eula" },
  robots: { index: true, follow: false },
  openGraph: { title: "EULA | KoveTrade", url: "https://kovetrade.com/eula" },
};

export default function EulaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
