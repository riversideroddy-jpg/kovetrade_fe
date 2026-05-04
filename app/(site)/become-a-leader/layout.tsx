import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become a Leader — Earn by Sharing Your Trades",
  description:
    "Turn your trading expertise into income. Become a KoveTrade Leader, build a following of copiers, and earn performance fees as your strategies grow.",
  alternates: { canonical: "https://kovetrade.com/become-a-leader" },
  openGraph: {
    title: "Become a Leader on KoveTrade — Earn by Sharing Your Trades",
    description:
      "Turn your trading expertise into income. Build a following and earn performance fees as your strategies grow.",
    url: "https://kovetrade.com/become-a-leader",
  },
};

export default function BecomeALeaderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
