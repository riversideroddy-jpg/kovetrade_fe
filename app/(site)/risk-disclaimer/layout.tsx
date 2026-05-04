import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Risk Disclaimer",
  description: "Important risk disclosures for KoveTrade users. Copy trading and investing in financial markets involves substantial risk of loss.",
  alternates: { canonical: "https://kovetrade.com/risk-disclaimer" },
  robots: { index: true, follow: false },
  openGraph: { title: "Risk Disclaimer | KoveTrade", url: "https://kovetrade.com/risk-disclaimer" },
};

export default function RiskDisclaimerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
