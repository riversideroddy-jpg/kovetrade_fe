import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://kovetrade.com" },
  openGraph: {
    url: "https://kovetrade.com",
  },
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
