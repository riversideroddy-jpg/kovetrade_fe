"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

const E = [0.16, 1, 0.3, 1] as const;

function Reveal({
  children,
  delay = 0,
  className = "",
  dir = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  dir?: "up" | "left" | "right";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const from =
    dir === "left"
      ? { opacity: 0, x: -30 }
      : dir === "right"
      ? { opacity: 0, x: 30 }
      : { opacity: 0, y: 28 };
  const to = { opacity: 1, x: 0, y: 0 };
  return (
    <motion.div
      ref={ref}
      initial={from}
      animate={inView ? to : from}
      transition={{ duration: 0.72, delay, ease: E }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated Signature / Pen SVG ────────────────────────────────
function ConsentSeal() {
  return (
    <motion.div
      className="flex flex-col items-center select-none"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: E }}
    >
      <svg viewBox="0 0 200 200" className="w-52 h-52" fill="none">
        {/* Outer ring */}
        <motion.circle
          cx="100" cy="100" r="85"
          stroke="rgba(94,220,31,0.25)"
          strokeWidth="2"
          strokeDasharray="8 4"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          style={{ transformOrigin: "100px 100px" }}
        />
        {/* Inner ring */}
        <circle cx="100" cy="100" r="68" stroke="rgba(94,220,31,0.15)" strokeWidth="1.5" />

        {/* Seal background glow */}
        <circle cx="100" cy="100" r="60" fill="rgba(22,101,52,0.12)" />

        {/* Checkmark shield */}
        <motion.path
          d="M100 42 L130 56 L130 90 Q130 118 100 132 Q70 118 70 90 L70 56 Z"
          fill="rgba(22,101,52,0.2)"
          stroke="rgba(94,220,31,0.5)"
          strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6, ease: E }}
          style={{ transformOrigin: "100px 87px" }}
        />

        {/* Check mark */}
        <motion.path
          d="M85 88 L95 99 L116 76"
          stroke="#5edc1f"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
        />

        {/* Pen tip decoration */}
        <motion.g
          animate={{ y: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <path
            d="M138 148 L152 134 L158 140 L144 154 Z"
            fill="rgba(94,220,31,0.6)"
          />
          <path
            d="M138 148 L134 158 L144 154 Z"
            fill="rgba(94,220,31,0.4)"
          />
          <line x1="152" y1="134" x2="168" y2="118" stroke="rgba(94,220,31,0.5)" strokeWidth="3" strokeLinecap="round" />
        </motion.g>

        {/* Signature line */}
        <motion.path
          d="M52 162 Q70 155 85 162 Q100 170 115 160 Q130 150 148 162"
          stroke="rgba(94,220,31,0.5)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.2, duration: 1.2, ease: "easeOut" }}
        />

        {/* Stars */}
        {[{ cx: 40, cy: 55 }, { cx: 160, cy: 55 }, { cx: 35, cy: 145 }, { cx: 165, cy: 145 }].map((p, i) => (
          <motion.circle
            key={i} cx={p.cx} cy={p.cy} r="3"
            fill="#5edc1f"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ repeat: Infinity, duration: 2 + i * 0.4, delay: i * 0.3, ease: "easeInOut" }}
            style={{ transformOrigin: `${p.cx}px ${p.cy}px` }}
          />
        ))}
      </svg>
    </motion.div>
  );
}

// ─── Consent Check item ──────────────────────────────────────────
function ConsentCheck({ label, delay = 0 }: { label: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      className="flex items-start gap-3"
      initial={{ opacity: 0, x: -18 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }}
      transition={{ duration: 0.5, delay, ease: E }}
    >
      <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#5edc1f]/20 border border-[#5edc1f]/40 flex items-center justify-center">
        <svg className="w-3 h-3 text-lime-400" fill="none" viewBox="0 0 12 12">
          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{label}</p>
    </motion.div>
  );
}

// ─── Accordion section ───────────────────────────────────────────
function ConsentSection({
  num,
  title,
  accent,
  children,
}: {
  num: number;
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  const accentMap: Record<string, { badge: string; border: string; glow: string }> = {
    violet: {
      badge: "bg-[#5edc1f]/20 text-lime-300 border border-[#5edc1f]/30",
      border: "border-[#5edc1f]/20 hover:border-[#5edc1f]/40",
      glow: "from-[#5edc1f]/5 to-transparent",
    },
    purple: {
      badge: "bg-teal-500/20 text-teal-300 border border-teal-500/30",
      border: "border-teal-500/20 hover:border-teal-500/40",
      glow: "from-teal-500/5 to-transparent",
    },
    emerald: {
      badge: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
      border: "border-emerald-500/20 hover:border-emerald-500/40",
      glow: "from-emerald-500/5 to-transparent",
    },
    blue: {
      badge: "bg-[#5edc1f]/20 text-green-300 border border-[#5edc1f]/30",
      border: "border-[#5edc1f]/20 hover:border-[#5edc1f]/40",
      glow: "from-[#5edc1f]/5 to-transparent",
    },
    rose: {
      badge: "bg-[#5edc1f]/20 text-lime-300 border border-[#5edc1f]/30",
      border: "border-rose-500/20 hover:border-rose-500/40",
      glow: "from-[#5edc1f]/5 to-transparent",
    },
    amber: {
      badge: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
      border: "border-amber-500/20 hover:border-amber-500/40",
      glow: "from-amber-500/5 to-transparent",
    },
    teal: {
      badge: "bg-teal-500/20 text-teal-300 border border-teal-500/30",
      border: "border-teal-500/20 hover:border-teal-500/40",
      glow: "from-teal-500/5 to-transparent",
    },
    cyan: {
      badge: "bg-lime-400/20 text-lime-300 border border-lime-400/30",
      border: "border-lime-400/20 hover:border-lime-400/40",
      glow: "from-lime-400/5 to-transparent",
    },
    indigo: {
      badge: "bg-[#5edc1f]/20 text-lime-300 border border-[#5edc1f]/30",
      border: "border-[#5edc1f]/20 hover:border-[#5edc1f]/40",
      glow: "from-[#5edc1f]/5 to-transparent",
    },
  };

  const a = accentMap[accent] ?? accentMap.violet;

  return (
    <motion.div
      ref={ref}
      id={`section-${num}`}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.65, ease: E }}
      className={`rounded-2xl border bg-gray-50 dark:bg-white/3 backdrop-blur-sm transition-colors duration-300 overflow-hidden ${a.border}`}
    >
      {/* Gradient top bar */}
      <div className={`h-px w-full bg-gradient-to-r ${a.glow.replace("to-transparent", "to-transparent").replace("from-", "from-")} opacity-60`} />

      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <div className="flex items-center gap-3">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full font-mono ${a.badge}`}>
            §{num}
          </span>
          <span className="text-base font-semibold text-gray-900 dark:text-white">{title}</span>
        </div>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="w-4 h-4 text-gray-600 dark:text-gray-400 flex-shrink-0"
          fill="none" viewBox="0 0 16 16"
        >
          <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: E }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{children}</p>
  );
}

// ─── Nav items ───────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 1, label: "Your Consent" },
  { id: 2, label: "Terms & Policies" },
  { id: 3, label: "Data Processing" },
  { id: 4, label: "Communications" },
  { id: 5, label: "Electronic Signatures" },
  { id: 6, label: "Cookies & Tracking" },
  { id: 7, label: "Identity Verification" },
  { id: 8, label: "Recording" },
  { id: 9, label: "Withdrawal" },
  { id: 10, label: "Age Requirement" },
  { id: 11, label: "Updates" },
];

const SECTION_ACCENTS = [
  "violet", "purple", "blue", "emerald", "teal",
  "cyan", "indigo", "rose", "amber", "violet", "purple",
];

// ─── Page ────────────────────────────────────────────────────────
export default function ConsentPage() {
  return (
    <div
      className="min-h-screen bg-white dark:bg-[#070f08] text-gray-900 dark:text-white"
    >
      {/* Aurora blobs */}
      <style>{`
        @keyframes blob-a { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-30px) scale(1.08)} 66%{transform:translate(-20px,20px) scale(0.95)} }
        @keyframes blob-b { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-35px,25px) scale(1.05)} 66%{transform:translate(25px,-15px) scale(0.97)} }
        @keyframes blob-c { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,30px) scale(1.06)} }
        .blob-a{animation:blob-a 14s ease-in-out infinite}
        .blob-b{animation:blob-b 18s ease-in-out infinite}
        .blob-c{animation:blob-c 22s ease-in-out infinite}
      `}</style>

      <div className="fixed inset-0 overflow-hidden pointer-events-none hidden dark:block">
        <div className="blob-a absolute top-[-10%] left-[-5%] w-[55vw] h-[55vw] rounded-full bg-green-900/10 blur-[100px]" />
        <div className="blob-b absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-green-900/10 blur-[90px]" />
        <div className="blob-c absolute top-[40%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-green-700/8 blur-[110px]" />
      </div>

      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <Reveal delay={0.05}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#5edc1f]/30 bg-[#5edc1f]/10 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                  <span className="text-xs text-lime-300 font-medium">Legal Document</span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                  Declaration{" "}
                  <span className="bg-gradient-to-r from-lime-400 via-[#5edc1f] to-emerald-400 bg-clip-text text-transparent">
                    of Consent
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.18}>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
                  At KoveTrade, we believe in transparency and informed consent. This declaration
                  outlines the specific consents you provide when you register and use our platform.
                </p>
              </Reveal>

              <Reveal delay={0.25}>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5">
                    <span className="text-lime-400">📅</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Last Updated: February 2026</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5">
                    <span className="text-teal-400">📋</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">11 Consent Areas</span>
                  </div>
                </div>
              </Reveal>

              {/* Consent status indicator */}
              <Reveal delay={0.32}>
                <div className="mt-8 p-4 rounded-2xl border border-[#5edc1f]/20 bg-[#5edc1f]/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#5edc1f]/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-lime-400" fill="none" viewBox="0 0 16 16">
                        <path d="M3 8l4 4 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-lime-300">Consent Framework Active</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    By creating an account with KoveTrade, you acknowledge reading and agreeing to
                    all consents described in this declaration.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Right — seal */}
            <div className="flex justify-center items-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#5edc1f]/15 to-green-900/10 blur-2xl scale-110" />
                <div className="relative rounded-3xl border border-[#5edc1f]/20 bg-gray-50 dark:bg-white/3 p-10">
                  <ConsentSeal />
                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-widest">KoveTrade</p>
                    <p className="text-sm font-semibold text-lime-300">Official Consent Declaration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky quick-nav ─────────────────────────────────────── */}
      <div className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-100 dark:border-white/5 bg-white/95 dark:bg-[#070f08]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {NAV_ITEMS.map((n) => (
              <a
                key={n.id}
                href={`#section-${n.id}`}
                className="text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-lime-300 hover:border-[#5edc1f]/40 hover:bg-[#5edc1f]/10 transition-all whitespace-nowrap"
              >
                §{n.id} {n.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Consent highlights strip ──────────────────────────────── */}
      <section className="py-10 px-4 border-b border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: "🔐", label: "Data Protected", sub: "GDPR compliant processing" },
                { icon: "✍️", label: "E-Signatures Valid", sub: "Legal equivalence assured" },
                { icon: "🔞", label: "18+ Only", sub: "Age-verified access" },
                { icon: "↩️", label: "Withdraw Anytime", sub: "Subject to legal limits" },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="flex flex-col items-center text-center p-4 rounded-2xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/3 hover:bg-[#5edc1f]/10 hover:border-[#5edc1f]/20 transition-all">
                    <span className="text-2xl mb-2">{item.icon}</span>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.sub}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Sections ─────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-5">

          {/* §1 */}
          <ConsentSection num={1} title="Your Consent Matters" accent={SECTION_ACCENTS[0]}>
            <Body>
              At KoveTrade, we believe in transparency and informed consent. This Declaration of
              Consent outlines the specific consents you provide when you register for an account,
              use our services, and interact with our platform.
            </Body>
            <Body>
              By using KoveTrade, you acknowledge and agree to the consents described below. We
              encourage you to read this document carefully and contact us if you have any questions.
            </Body>
          </ConsentSection>

          {/* §2 */}
          <ConsentSection num={2} title="Consent to Terms and Policies" accent={SECTION_ACCENTS[1]}>
            <Body>
              By creating an account with KoveTrade, you confirm that you have read, understood, and
              agree to be bound by our Terms of Service, Privacy Policy, Cookies Policy, Risk
              Disclaimer, and all other applicable policies and agreements.
            </Body>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
              {[
                { label: "Terms of Service", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Cookies Policy", href: "/cookies" },
                { label: "Risk Disclaimer", href: "/risk-disclaimer" },
                { label: "Conflict of Interest", href: "/conflict-of-interest" },
              ].map((doc, i) => (
                <Link
                  key={i}
                  href={doc.href}
                  className="text-xs px-3 py-2 rounded-xl border border-teal-500/20 bg-teal-500/5 text-teal-300 hover:border-teal-500/40 hover:bg-teal-500/10 transition-all text-center"
                >
                  {doc.label} →
                </Link>
              ))}
            </div>
            <Body>
              You acknowledge that these documents form a legally binding agreement between you and
              KoveTrade.
            </Body>
          </ConsentSection>

          {/* §3 */}
          <ConsentSection num={3} title="Consent to Data Processing" accent={SECTION_ACCENTS[2]}>
            <Body>
              You consent to the collection, processing, storage, and use of your personal data by
              KoveTrade as described in our Privacy Policy. This includes but is not limited to:
            </Body>
            <div className="space-y-2.5 mt-2">
              {[
                "Processing your personal information for account creation and management",
                "Using your data to provide, maintain, and improve our services",
                "Sharing your data with regulated third parties as necessary to deliver our services",
                "Transferring your data internationally where required for service delivery or regulatory compliance",
                "Retaining your data for the periods required by applicable laws and regulations",
              ].map((item, i) => (
                <ConsentCheck key={i} label={item} delay={i * 0.06} />
              ))}
            </div>
          </ConsentSection>

          {/* §4 */}
          <ConsentSection num={4} title="Consent to Communications" accent={SECTION_ACCENTS[3]}>
            <Body>
              You consent to receiving communications from KoveTrade, including but not limited to:
              account notifications, transaction confirmations, security alerts, service updates,
              regulatory notices, and marketing communications.
            </Body>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                <p className="text-xs font-semibold text-emerald-300 mb-1.5">✅ Can Opt Out</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Non-essential marketing communications — unsubscribe at any time via email link or support request.</p>
              </div>
              <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5">
                <p className="text-xs font-semibold text-lime-300 mb-1.5">⚠️ Cannot Opt Out</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Transactional and regulatory communications required while your account remains active.</p>
              </div>
            </div>
          </ConsentSection>

          {/* §5 */}
          <ConsentSection num={5} title="Electronic Signatures and Records" accent={SECTION_ACCENTS[4]}>
            <Body>
              You consent to the use of electronic signatures, records, and communications in
              connection with your account and transactions with KoveTrade. You agree that electronic
              signatures and records shall have the same legal effect, validity, and enforceability
              as manually executed signatures and paper-based records.
            </Body>
            <div className="mt-3 p-4 rounded-xl border border-teal-500/20 bg-teal-500/5">
              <p className="text-xs font-semibold text-teal-300 mb-2">Electronic Format Agreement</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                You also agree to receive all account statements, confirmations, disclosures, and
                other communications in electronic format, in lieu of paper-based equivalents.
              </p>
            </div>
          </ConsentSection>

          {/* §6 */}
          <ConsentSection num={6} title="Consent to Cookies and Tracking" accent={SECTION_ACCENTS[5]}>
            <Body>
              You consent to the use of cookies and similar tracking technologies as described in
              our Cookies Policy. This includes:
            </Body>
            <div className="space-y-2 mt-2">
              {[
                { label: "Essential cookies", desc: "Required for platform operation", color: "text-lime-300" },
                { label: "Analytical cookies", desc: "Help us improve our services", color: "text-lime-400" },
                { label: "Marketing cookies", desc: "Enable relevant content delivery", color: "text-teal-400" },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/3">
                  <span className={`text-xs font-bold mt-0.5 ${c.color}`}>🍪</span>
                  <div>
                    <p className={`text-xs font-semibold ${c.color}`}>{c.label}</p>
                    <p className="text-xs text-gray-500">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Body>
              You may manage your cookie preferences through your browser settings.
            </Body>
          </ConsentSection>

          {/* §7 */}
          <ConsentSection num={7} title="Consent to Identity Verification" accent={SECTION_ACCENTS[6]}>
            <Body>
              You consent to KoveTrade conducting identity verification checks as required by
              anti-money laundering (AML) and know-your-customer (KYC) regulations. This may include:
            </Body>
            <div className="space-y-2.5 mt-2">
              {[
                "Verifying your identity through government-issued identification documents",
                "Conducting background checks through third-party verification services",
                "Verifying your source of funds and wealth",
                "Performing ongoing monitoring of your account activity for suspicious transactions",
              ].map((item, i) => (
                <ConsentCheck key={i} label={item} delay={i * 0.06} />
              ))}
            </div>
            <div className="mt-3 p-3 rounded-xl border border-[#5edc1f]/20 bg-[#5edc1f]/5">
              <p className="text-xs text-lime-300">
                You agree to provide all requested documentation promptly and accurately to support
                the completion of required regulatory checks.
              </p>
            </div>
          </ConsentSection>

          {/* §8 */}
          <ConsentSection num={8} title="Consent to Recording" accent={SECTION_ACCENTS[7]}>
            <Body>
              You consent to KoveTrade recording and monitoring telephone conversations, electronic
              communications, and other interactions between you and KoveTrade. These recordings may
              be used to:
            </Body>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              {[
                { icon: "📝", label: "Verify Instructions", desc: "Confirm legitimacy of orders and requests" },
                { icon: "⚖️", label: "Resolve Disputes", desc: "Provide clear evidence in disagreements" },
                { icon: "🏛️", label: "Regulatory Compliance", desc: "Meet our legal and supervisory obligations" },
                { icon: "⭐", label: "Quality Improvement", desc: "Enhance the standard of our client services" },
              ].map((r, i) => (
                <div key={i} className="p-3 rounded-xl border border-rose-500/15 bg-rose-500/5">
                  <p className="text-base mb-1">{r.icon}</p>
                  <p className="text-xs font-semibold text-lime-300">{r.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{r.desc}</p>
                </div>
              ))}
            </div>
            <Body>
              Recordings will be retained in accordance with applicable regulatory requirements and
              may serve as evidence in legal or regulatory proceedings.
            </Body>
          </ConsentSection>

          {/* §9 */}
          <ConsentSection num={9} title="Withdrawal of Consent" accent={SECTION_ACCENTS[8]}>
            <div className="p-4 rounded-xl border border-amber-500/25 bg-amber-500/8 mb-3">
              <div className="flex items-start gap-2">
                <span className="text-amber-400 flex-shrink-0 text-lg">⚠️</span>
                <p className="text-xs text-amber-200 leading-relaxed">
                  Withdrawing certain consents may affect our ability to provide services to you and
                  may result in the closure of your account. Please review consequences carefully
                  before proceeding.
                </p>
              </div>
            </div>
            <Body>
              You have the right to withdraw your consent at any time, subject to legal and
              contractual restrictions. To withdraw your consent, please contact our support team.
              We will process your request in accordance with applicable laws and inform you of any
              consequences of the withdrawal.
            </Body>
            <a
              href="mailto:support@kovetrade.com"
              className="inline-flex items-center gap-2 mt-3 px-4 py-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300 text-sm font-medium hover:bg-amber-500/20 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                <path d="M2 4h12v9a1 1 0 01-1 1H3a1 1 0 01-1-1V4zm0 0l6 5 6-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              support@kovetrade.com
            </a>
          </ConsentSection>

          {/* §10 */}
          <ConsentSection num={10} title="Consent for Minors" accent={SECTION_ACCENTS[9]}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#5edc1f]/15 border border-[#5edc1f]/30 flex items-center justify-center">
                <span className="text-2xl font-black text-lime-300">18+</span>
              </div>
              <div className="space-y-2">
                <Body>
                  KoveTrade services are only available to individuals who are at least 18 years of
                  age (or the age of legal majority in your jurisdiction).
                </Body>
                <Body>
                  By creating an account, you confirm that you meet this age requirement. If we
                  become aware that we have collected personal information from a minor without
                  appropriate parental or guardian consent, we will take steps to delete such
                  information and close the associated account.
                </Body>
              </div>
            </div>
          </ConsentSection>

          {/* §11 */}
          <ConsentSection num={11} title="Updates to This Declaration" accent={SECTION_ACCENTS[10]}>
            <Body>
              KoveTrade may update this Declaration of Consent from time to time to reflect changes
              in our practices, services, or legal requirements.
            </Body>
            <div className="mt-3 space-y-2">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0 text-teal-400 text-xs font-bold">1</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">We will notify you of material changes by posting the updated declaration on our website.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0 text-teal-400 text-xs font-bold">2</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">Where appropriate, we will send you a direct notification of significant updates.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0 text-teal-400 text-xs font-bold">3</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your continued use of our services after changes constitutes acceptance of the updated declaration.</p>
              </div>
            </div>
          </ConsentSection>

        </div>
      </section>

      {/* ── Questions CTA ────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden border border-[#5edc1f]/20">
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 via-green-950/30 to-green-900/40" />
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#5edc1f]/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-teal-500/10 blur-3xl" />

              <div className="relative p-10 text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#5edc1f]/20 border border-[#5edc1f]/30 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-7 h-7 text-lime-400" fill="none" viewBox="0 0 24 24">
                    <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093M12 21h.01M12 3a9 9 0 110 18A9 9 0 0112 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  Have{" "}
                  <span className="bg-gradient-to-r from-[#5edc1f] to-emerald-400 bg-clip-text text-transparent">
                    Questions?
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
                  If you have any questions about this Declaration of Consent or wish to exercise
                  any of your rights, please contact our support team. We are committed to ensuring
                  that your consent is informed and that your rights are fully respected.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="mailto:support@kovetrade.com"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#4cc015] to-green-700 text-white font-semibold text-sm hover:from-[#5edc1f] hover:to-green-600 transition-all shadow-lg shadow-green-900/30"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                      <path d="M2 4h12v9a1 1 0 01-1 1H3a1 1 0 01-1-1V4zm0 0l6 5 6-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Contact Support
                  </a>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-white/15 text-gray-900 dark:text-white font-semibold text-sm hover:bg-white/8 transition-all"
                  >
                    ← Go Back Home
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
