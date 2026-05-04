import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leader Guide — Grow Your Copier Base",
  description:
    "Everything you need to know about becoming a successful KoveTrade Leader. Tips on strategy, risk management, communication, and growing your copier base.",
  alternates: { canonical: "https://kovetrade.com/leader-guide" },
  openGraph: {
    title: "KoveTrade Leader Guide — Grow Your Copier Base",
    description:
      "Tips on strategy, risk management, and growing your copier base as a KoveTrade Leader.",
    url: "https://kovetrade.com/leader-guide",
  },
};

export default function LeaderGuideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
