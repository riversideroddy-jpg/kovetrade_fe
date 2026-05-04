import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read KoveTrade's Privacy Policy. Learn how we collect, use, and protect your personal data in compliance with GDPR and global privacy standards.",
  alternates: { canonical: "https://kovetrade.com/privacy" },
  robots: { index: true, follow: false },
  openGraph: { title: "Privacy Policy | KoveTrade", url: "https://kovetrade.com/privacy" },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
