"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

// ─── ease ───────────────────────────────────────────────────────
const E = [0.16, 1, 0.3, 1] as const;

// ─── Reveal primitive ────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-4% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.7, delay, ease: E }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Section number badge ─────────────────────────────────────────
function SectionBadge({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-[#5edc1f] to-green-700 text-white text-xs font-black shadow-lg shadow-[#5edc1f]/25 shrink-0 mt-0.5">
      {n}
    </span>
  );
}

// ─── Data ─────────────────────────────────────────────────────────
const SECTIONS = [
  {
    n: 1,
    title: "Acceptance of Terms",
    content: [
      'By accessing or using the KoveTrade platform, website, mobile applications, and any associated services (collectively, the "Services"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you must not access or use our Services.',
      'These Terms constitute a legally binding agreement between you ("User," "you," or "your") and KoveTrade and its affiliated entities ("KoveTrade," "we," "us," or "our"). By using our Services, you represent and warrant that you are at least 18 years of age and have the legal capacity to enter into this agreement.',
    ],
  },
  {
    n: 2,
    title: "Account Registration & Security",
    content: [
      "To access certain features of our Services, you must register for an account. When registering, you agree to provide accurate, current, and complete information and to update such information as necessary to maintain its accuracy.",
      "You are solely responsible for maintaining the confidentiality of your account credentials, including your username and password. You agree to notify KoveTrade immediately of any unauthorized use of your account or any other breach of security. KoveTrade will not be liable for any loss or damage arising from your failure to protect your account information.",
      "You may not transfer, sell, or otherwise assign your account to any third party without prior written consent from KoveTrade. We reserve the right to suspend or terminate any account that we reasonably believe has been compromised or is being used in violation of these Terms.",
    ],
  },
  {
    n: 3,
    title: "Trading Services",
    content: [
      'KoveTrade provides access to a range of financial trading services, including but not limited to copy trading, futures trading, options trading, and contracts for difference (CFDs). These services are provided on an "as available" basis and may be subject to market conditions, regulatory requirements, and system availability.',
      "Copy trading allows users to automatically replicate the trading strategies of other traders on the platform. By using copy trading features, you acknowledge that past performance is not indicative of future results and that you bear full responsibility for any trades executed on your behalf.",
      "KoveTrade does not provide investment advice, and no content on our platform should be construed as such. All trading decisions are made at your own discretion and risk. You should consult with a qualified financial advisor before making any investment decisions.",
    ],
  },
  {
    n: 4,
    title: "Risk Disclosure",
    content: [
      "Trading in financial instruments, including futures, options, and contracts, carries a high level of risk and may not be suitable for all investors. You may sustain a total loss of your initial investment and, in some cases, may be required to deposit additional funds to cover margin requirements.",
      "The value of your investments can go down as well as up, and you should only trade with funds you can afford to lose. KoveTrade strongly recommends that you seek independent financial advice before engaging in any trading activity on our platform. For full details, please review our Risk Disclaimer.",
    ],
    highlight: true,
  },
  {
    n: 5,
    title: "Prohibited Activities",
    content: [
      "You agree not to engage in any of the following activities while using our Services:",
    ],
    list: [
      "Market manipulation, including spoofing, layering, or wash trading",
      "Using automated systems, bots, or scripts to exploit the platform without prior authorization",
      "Engaging in money laundering, terrorist financing, or any other financial crime",
      "Accessing or attempting to access another user's account without authorization",
      "Interfering with or disrupting the integrity or performance of the Services",
      "Violating any applicable local, national, or international law or regulation",
      "Reverse engineering, decompiling, or disassembling any part of the platform",
      "Distributing malware, viruses, or any other harmful software through the platform",
    ],
  },
  {
    n: 6,
    title: "Intellectual Property",
    content: [
      "All content, features, and functionality of the KoveTrade platform — including text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software — are the exclusive property of KoveTrade or its licensors and are protected by international copyright, trademark, patent, and other intellectual property laws.",
      "You are granted a limited, non-exclusive, non-transferable, and revocable license to access and use the Services for personal, non-commercial purposes. You may not reproduce, distribute, modify, create derivative works from, publicly display, or otherwise exploit any content from the platform without prior written permission from KoveTrade.",
    ],
  },
  {
    n: 7,
    title: "Limitation of Liability",
    content: [
      "To the fullest extent permitted by applicable law, KoveTrade and its directors, officers, employees, agents, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of the Services.",
      "KoveTrade shall not be liable for any losses arising from market volatility, system failures, third-party service interruptions, or any other circumstances beyond our reasonable control. Our total aggregate liability to you for any claims shall not exceed the amount of fees paid by you to KoveTrade in the twelve (12) months preceding the claim.",
    ],
    highlight: true,
  },
  {
    n: 8,
    title: "Termination",
    content: [
      "KoveTrade reserves the right to suspend or terminate your access to the Services at any time, with or without cause and with or without notice. You may also terminate your account at any time by contacting our support team.",
      "Upon termination, your right to use the Services will immediately cease. Any provisions of these Terms that by their nature should survive termination shall continue in full force and effect, including intellectual property provisions, warranty disclaimers, indemnity obligations, and limitations of liability.",
    ],
  },
  {
    n: 9,
    title: "Modifications to Terms",
    content: [
      'KoveTrade reserves the right to modify these Terms at any time. We will notify you of any material changes by posting the updated Terms on our website and updating the "Last Updated" date at the top of this page.',
      "Your continued use of the Services after any changes constitutes your acceptance of the revised Terms. We encourage you to review these Terms periodically to stay informed of any updates.",
    ],
  },
  {
    n: 10,
    title: "Governing Law",
    content: [
      "These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the applicable KoveTrade entity is incorporated, without regard to its conflict of law provisions.",
    ],
  },
];

const ENTITIES = [
  { region: "Europe",        entity: "KoveTrade (Europe) Ltd.",   reg: "CySEC",  license: "License #109/10"          },
  { region: "United Kingdom",entity: "KoveTrade (UK) Ltd.",       reg: "FCA",    license: "FRN 583263"               },
  { region: "United States", entity: "KoveTrade (USA) Ltd.",      reg: "SEC",    license: "CRD 298461"               },
  { region: "Middle East",   entity: "KoveTrade (ME) Limited",    reg: "FSRA",   license: "Permission No. 220073"    },
];

// ─── Page ─────────────────────────────────────────────────────────
export default function TermsOfService() {
  return (
    <div className="overflow-x-hidden bg-white dark:bg-[#070809] text-gray-900 dark:text-white">
      <Navbar />

      {/* ── Hero banner ── */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        {/* Light bg */}
        <div className="absolute inset-0 dark:hidden pointer-events-none">
          <div
            className="absolute -top-[10%] left-[20%] w-[600px] h-[600px] rounded-full opacity-[0.1]"
            style={{ background: "radial-gradient(circle, #5edc1f 0%, transparent 65%)" }}
          />
          <div
            className="absolute inset-0 opacity-[0.2]"
            style={{
              backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          />
        </div>
        {/* Dark bg */}
        <div className="absolute inset-0 hidden dark:block pointer-events-none">
          <div
            className="aurora-a absolute -top-[20%] left-[10%] w-[700px] h-[700px] rounded-full"
            style={{ background: "radial-gradient(circle, #2d6a0a 0%, transparent 60%)" }}
          />
          <div
            className="aurora-b absolute bottom-0 right-[5%] w-[400px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, #166534 0%, transparent 60%)" }}
          />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: E }}
            className="inline-flex items-center gap-2.5 rounded-full border border-green-200 dark:border-[#5edc1f]/20 bg-green-50 dark:bg-[#5edc1f]/[0.08] px-4 py-2 mb-8"
          >
            <svg className="w-3.5 h-3.5 text-[#4cc015] dark:text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <span className="text-[11px] font-semibold text-green-700 dark:text-green-300 tracking-wide">
              Legal Agreement · KoveTrade
            </span>
          </motion.div>

          <motion.h1
            className="font-black tracking-tight text-gray-900 dark:text-white leading-[1.06] mb-5"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: E }}
          >
            Terms of{" "}
            <span className="text-gradient-animate">Service</span>
          </motion.h1>

          <motion.p
            className="text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16, ease: E }}
          >
            Please read these terms carefully before using the KoveTrade platform.
            By accessing our services you agree to be bound by this agreement.
          </motion.p>

          <motion.div
            className="inline-flex items-center gap-2 rounded-full bg-gray-100 dark:bg-white/[0.06] border border-gray-200 dark:border-white/[0.08] px-5 py-2.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.26 }}
          >
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[12px] text-gray-500 dark:text-gray-400 font-medium">
              Last Updated: <strong className="text-gray-700 dark:text-gray-200">February 2026</strong>
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── Quick-nav pill row ── */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-[#070809]/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/[0.06]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-center gap-2 py-3 overflow-x-auto no-scrollbar">
            <span className="text-[11px] text-gray-400 dark:text-gray-600 font-medium shrink-0 mr-1">Jump to:</span>
            {SECTIONS.slice(0, 6).map(({ n, title }) => (
              <a
                key={n}
                href={`#section-${n}`}
                className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.07] hover:border-green-300 dark:hover:border-[#5edc1f]/40 hover:bg-green-50 dark:hover:bg-[#5edc1f]/[0.08] px-3.5 py-1.5 text-[11px] font-semibold text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-300 transition-all duration-200"
              >
                <span className="text-[#5edc1f] font-black">{n}.</span>
                {title.split(" ").slice(0, 2).join(" ")}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <main className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
          {SECTIONS.map(({ n, title, content, list, highlight }, idx) => (
            <Reveal key={n} delay={0.04 * Math.min(idx, 4)}>
              <div
                id={`section-${n}`}
                className={`relative rounded-3xl border overflow-hidden scroll-mt-20 ${
                  highlight
                    ? "border-amber-200 dark:border-amber-500/20 bg-amber-50/60 dark:bg-amber-500/[0.04]"
                    : "border-gray-100 dark:border-white/[0.06] bg-gray-50/60 dark:bg-white/[0.02]"
                }`}
              >
                {/* Left accent bar */}
                <div
                  className={`absolute left-0 inset-y-0 w-1 rounded-l-3xl ${
                    highlight
                      ? "bg-gradient-to-b from-amber-400 to-orange-500"
                      : "bg-gradient-to-b from-[#5edc1f] to-green-700"
                  }`}
                />

                <div className="pl-8 pr-7 py-8">
                  {/* Title row */}
                  <div className="flex items-start gap-4 mb-5">
                    <SectionBadge n={n} />
                    <h2 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white leading-snug pt-0.5">
                      {title}
                    </h2>
                  </div>

                  {/* Body paragraphs */}
                  <div className="space-y-4 ml-12">
                    {content.map((p, i) => (
                      <p key={i} className="text-[14px] sm:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed">
                        {p}
                      </p>
                    ))}

                    {/* Bullet list */}
                    {list && (
                      <ul className="mt-4 space-y-2.5">
                        {list.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#5edc1f] shrink-0" />
                            <span className="text-[14px] text-gray-600 dark:text-gray-400 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Warning chip for risk section */}
                  {highlight && (
                    <div className="mt-6 ml-12 inline-flex items-center gap-2 rounded-full bg-amber-100 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 px-4 py-2">
                      <svg className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                      <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                        High risk — only trade with funds you can afford to lose
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}

          {/* ── Regulated entities ── */}
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-green-100 dark:border-[#5edc1f]/20 bg-gradient-to-br from-green-50 to-lime-50 dark:from-green-950/20 dark:to-green-950/10 overflow-hidden">
              <div className="px-7 pt-8 pb-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#5edc1f] to-green-700 flex items-center justify-center text-white shrink-0 shadow-lg shadow-[#5edc1f]/25">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#4cc015] dark:text-lime-400 mb-0.5">Governing Law</p>
                    <h3 className="text-base font-black text-gray-900 dark:text-white">Regulated Entities Worldwide</h3>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  {ENTITIES.map(({ region, entity, reg, license }) => (
                    <div
                      key={region}
                      className="flex items-start gap-3 rounded-2xl bg-white dark:bg-white/[0.04] border border-green-100 dark:border-white/[0.07] p-4"
                    >
                      <div className="w-8 h-8 rounded-xl bg-green-100 dark:bg-[#5edc1f]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[#4cc015] dark:text-lime-400 text-[10px] font-black">{reg}</span>
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-gray-900 dark:text-white leading-none mb-1">{entity}</p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-500 mb-0.5">{region}</p>
                        <p className="text-[11px] text-[#4cc015] dark:text-lime-400 font-semibold">{license}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── Questions / CTA ── */}
          <Reveal delay={0.12}>
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#4cc015] via-green-700 to-green-800 p-8 sm:p-10 text-center shadow-2xl shadow-green-900/20">
              <div
                className="absolute inset-0 opacity-[0.07] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />
              <div className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 65%)" }} />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-3">Have questions?</h3>
                <p className="text-green-200 text-[14px] max-w-sm mx-auto leading-relaxed mb-8">
                  If you have any questions or concerns about these Terms of Service, our support team is here to help and will respond as soon as possible.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="mailto:support@kovetrade.com"
                    className="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-green-700 hover:bg-green-50 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20 transition-all duration-300"
                  >
                    Contact Support
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/[0.08] px-8 py-3.5 text-sm font-bold text-white hover:bg-white/[0.15] hover:border-white/40 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Go Back Home
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
