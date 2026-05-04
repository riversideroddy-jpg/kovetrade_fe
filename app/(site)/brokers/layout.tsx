import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Supported Brokers — Connect Your Brokerage",
  description:
    "KoveTrade integrates with leading brokers worldwide. Connect your existing brokerage account and start copy trading in minutes.",
  alternates: { canonical: "https://kovetrade.com/brokers" },
  openGraph: {
    title: "Supported Brokers | KoveTrade",
    description:
      "Connect your existing brokerage account and start copy trading in minutes with KoveTrade's broker integrations.",
    url: "https://kovetrade.com/brokers",
  },
};

export default function BrokersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
