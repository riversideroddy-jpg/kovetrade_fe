import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AutoGuard™ — Smart Trade Protection",
  description:
    "AutoGuard™ by KoveTrade automatically protects every copied trade with intelligent take-profit, stop-loss, and delta-based guardrails. Trade smarter, not harder.",
  alternates: { canonical: "https://kovetrade.com/autoguard" },
  openGraph: {
    title: "AutoGuard™ — Smart Trade Protection | KoveTrade",
    description:
      "Automatically protect every copied trade with intelligent take-profit, stop-loss, and delta-based guardrails.",
    url: "https://kovetrade.com/autoguard",
  },
};

export default function AutoguardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
