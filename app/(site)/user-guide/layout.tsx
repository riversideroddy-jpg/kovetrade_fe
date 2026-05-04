import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Guide — Learn How to Copy Trade",
  description:
    "Step-by-step guide to getting started on KoveTrade. Learn how to find top traders, set up copy trading, manage risk, and grow your portfolio.",
  alternates: { canonical: "https://kovetrade.com/user-guide" },
  openGraph: {
    title: "KoveTrade User Guide — Learn How to Copy Trade",
    description:
      "Step-by-step guide to finding top traders, setting up copy trading, and managing risk on KoveTrade.",
    url: "https://kovetrade.com/user-guide",
  },
};

export default function UserGuideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
