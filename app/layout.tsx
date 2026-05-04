import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import Script from "next/script";
import Livechat from "@/components/Livechat";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const BASE_URL = "https://kovetrade.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "KoveTrade — Copy Top Traders. Grow Your Portfolio.",
    template: "%s | KoveTrade",
  },
  description:
    "Mirror real-time stock and options trades from the world's top-performing traders. Start in minutes — no experience required. Trusted by 50M+ investors.",
  keywords: [
    "copy trading",
    "social investing",
    "options trading",
    "stock copy trading",
    "futures trading",
    "trade copying platform",
    "automated trading",
    "copy trader",
    "KoveTrade",
    "investment platform",
    "portfolio growth",
    "mirror trading",
  ],
  authors: [{ name: "KoveTrade", url: BASE_URL }],
  creator: "KoveTrade",
  publisher: "KoveTrade",
  category: "Finance",
  applicationName: "KoveTrade",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "KoveTrade",
    title: "KoveTrade — Copy Top Traders. Grow Your Portfolio.",
    description:
      "Mirror real-time stock and options trades from the world's top-performing traders. Start in minutes — no experience required. Trusted by 50M+ investors.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "KoveTrade — Copy Top Traders. Grow Your Portfolio.",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@KoveTrade",
    creator: "@KoveTrade",
    title: "KoveTrade — Copy Top Traders. Grow Your Portfolio.",
    description:
      "Mirror real-time stock and options trades from the world's top-performing traders. Start in minutes — no experience required.",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body
        className={`${poppins.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="top-right" />
          <Livechat />
        </ThemeProvider>

        {/* LiveChat - Jovo */}

        {/* <Script
          src="//code.jivosite.com/widget/jZikVtEDhl"
          strategy="afterInteractive"
        /> */}
      </body>
    </html>
  );
}
