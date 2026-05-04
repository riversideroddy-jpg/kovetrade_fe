import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Program — Refer & Earn",
  description:
    "Join the KoveTrade affiliate program. Refer traders, earn commissions, and grow your passive income by promoting the world's leading copy trading platform.",
  alternates: { canonical: "https://kovetrade.com/affiliate" },
  openGraph: {
    title: "KoveTrade Affiliate Program — Refer & Earn",
    description:
      "Refer traders, earn commissions, and grow your passive income with the KoveTrade affiliate program.",
    url: "https://kovetrade.com/affiliate",
  },
};

export default function AffiliateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
