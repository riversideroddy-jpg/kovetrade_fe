"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
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
  const variants = {
    up:    { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0 } },
    left:  { hidden: { opacity: 0, x: -32 }, show: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 32 }, show: { opacity: 1, x: 0 } },
  }[dir];
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={variants}
      transition={{ duration: 0.72, delay, ease: E }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Color map per section ─────────────────────────────────────
const SECTION_COLORS: Record<string, {
  tag: string; badge: string; bar: string; glow: string; icon: string;
}> = {
  collect: {
    tag:   "text-[#4cc015] dark:text-lime-400",
    badge: "bg-[#5edc1f]/10 border-[#5edc1f]/20 text-[#4cc015] dark:text-lime-400",
    bar:   "from-[#5edc1f] to-lime-400",
    glow:  "bg-[#5edc1f]/[0.05]",
    icon:  "bg-[#5edc1f]",
  },
  security: {
    tag:   "text-emerald-600 dark:text-emerald-400",
    badge: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
    bar:   "from-emerald-500 to-teal-500",
    glow:  "bg-emerald-500/[0.05]",
    icon:  "bg-emerald-500",
  },
  affiliates: {
    tag:   "text-[#4cc015] dark:text-lime-400",
    badge: "bg-[#5edc1f]/10 border-[#5edc1f]/20 text-[#4cc015] dark:text-lime-400",
    bar:   "from-[#5edc1f] to-green-700",
    glow:  "bg-[#5edc1f]/[0.05]",
    icon:  "bg-[#5edc1f]",
  },
  third: {
    tag:   "text-rose-600 dark:text-lime-400",
    badge: "bg-[#5edc1f]/10 border-rose-500/20 text-rose-600 dark:text-lime-400",
    bar:   "from-[#5edc1f] to-green-700",
    glow:  "bg-rose-500/[0.05]",
    icon:  "bg-rose-500",
  },
  regulatory: {
    tag:   "text-amber-600 dark:text-amber-400",
    badge: "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400",
    bar:   "from-amber-500 to-orange-500",
    glow:  "bg-amber-500/[0.05]",
    icon:  "bg-amber-500",
  },
  optout: {
    tag:   "text-[#4cc015] dark:text-lime-300",
    badge: "bg-lime-400/10 border-lime-400/20 text-[#4cc015] dark:text-lime-300",
    bar:   "from-lime-400 to-[#5edc1f]",
    glow:  "bg-lime-400/[0.05]",
    icon:  "bg-lime-400",
  },
};

// ─── Data ──────────────────────────────────────────────────────

const APP_INFO_FIELDS = [
  "Full name & date of birth",
  "Residential address & nationality",
  "Email address & phone number",
  "Employment status & annual income",
  "Net worth & trading experience",
];

const TXN_FIELDS = [
  "Deposits & withdrawals history",
  "Trade history & account balances",
  "Payment methods on file",
  "Financial records for compliance",
];

const VERIFY_FIELDS = [
  "Government-issued photo ID",
  "Proof of address (utility bill, etc.)",
  "Proof of income or source of funds",
  "Selfie photograph for identity check",
  "Additional documents per jurisdiction",
];

const SECURITY_MEASURES = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: "256-bit SSL/TLS encryption",
    sub: "All data in transit between your device and our servers",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    label: "Advanced firewalls & IDS",
    sub: "Intrusion detection and prevention systems 24/7",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    label: "Independent security audits",
    sub: "Regular penetration testing by certified third parties",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3m-3 3.75h3m-3 3.75h3" />
      </svg>
    ),
    label: "Multi-factor authentication",
    sub: "MFA options for every account access point",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    label: "Encrypted data storage",
    sub: "Sensitive data encrypted at rest with strict access controls",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    label: "Staff training programs",
    sub: "Data protection and security best practices for all employees",
  },
];

const THIRD_PARTY_TYPES = [
  { label: "Payment processors & banking partners",       desc: "To facilitate deposits and withdrawals securely" },
  { label: "Identity verification providers",             desc: "KYC/AML compliance and fraud prevention" },
  { label: "Cloud hosting & infrastructure",              desc: "Secure, redundant data storage and delivery" },
  { label: "Professional advisors",                       desc: "Lawyers, auditors, and compliance consultants" },
  { label: "Analytics & marketing platforms",             desc: "To improve platform performance and communications" },
];

const OPT_OUT_RIGHTS = [
  "Unsubscribe from marketing emails via the unsubscribe link in any promotional message",
  "Request deletion of your personal data, subject to regulatory retention requirements",
  "Disable non-essential cookies through browser settings or our cookie preferences panel",
  "Request access to, correction of, or restriction of processing of your personal data",
];

// ─── Sub-component: Info Type Card ─────────────────────────────
function DataTypeCard({
  label, fields, color,
}: {
  label: string;
  fields: string[];
  color: string;
}) {
  return (
    <div className={`rounded-2xl border border-gray-100 dark:border-white/[0.06] bg-white dark:bg-white/[0.03] p-5`}>
      <p className={`text-[10px] font-black tracking-[0.18em] uppercase mb-3 ${color}`}>{label}</p>
      <ul className="space-y-2">
        {fields.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-600 shrink-0" />
            <span className="text-[13px] text-gray-600 dark:text-gray-400 leading-snug">{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Sub-component: Section Block ──────────────────────────────
function PolicySection({
  n, colorKey, tagLabel, icon, title, children, delay = 0,
}: {
  n: number;
  colorKey: keyof typeof SECTION_COLORS;
  tagLabel: string;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const c = SECTION_COLORS[colorKey];
  const [open, setOpen] = useState(true);

  return (
    <Reveal delay={delay}>
      <div id={`section-${n}`} className="scroll-mt-20 rounded-3xl border border-gray-100 dark:border-white/[0.06] overflow-hidden bg-white dark:bg-[#0c0d0f]">
        {/* Header bar */}
        <button
          onClick={() => setOpen((v) => !v)}
          className={`w-full flex items-center gap-4 px-7 py-5 text-left transition-colors duration-200 ${c.glow} hover:bg-gray-50 dark:hover:bg-white/[0.03]`}
        >
          {/* Icon bubble */}
          <div className={`w-10 h-10 rounded-2xl ${c.icon} flex items-center justify-center text-white shrink-0 shadow-lg`}>
            {icon}
          </div>

          <div className="flex-1 min-w-0">
            <p className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-0.5 ${c.tag}`}>{tagLabel}</p>
            <h2 className="text-base sm:text-lg font-black text-gray-900 dark:text-white leading-snug truncate">{title}</h2>
          </div>

          {/* Section number */}
          <span className="hidden sm:flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-white/[0.06] dark:to-white/[0.02] text-gray-500 dark:text-gray-500 text-xs font-black shrink-0">
            {n}
          </span>

          {/* Toggle chevron */}
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="shrink-0"
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </button>

        {/* Left accent line */}
        <motion.div
          animate={{ height: open ? "auto" : 0 }}
          initial={false}
          transition={{ duration: 0.35, ease: E }}
          className="overflow-hidden"
        >
          <div className="relative">
            <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b ${c.bar} opacity-60`} />
            <div className="pl-7 pr-7 pt-2 pb-7">
              {children}
            </div>
          </div>
        </motion.div>
      </div>
    </Reveal>
  );
}

// ─── Page ──────────────────────────────────────────────────────
export default function PrivacyPolicy() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <div className="overflow-x-hidden bg-white dark:bg-[#070809] text-gray-900 dark:text-white">
      <Navbar />

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative overflow-hidden pt-28 pb-24 sm:pt-36 sm:pb-32">
        {/* BG — light */}
        <div className="absolute inset-0 dark:hidden pointer-events-none">
          <div className="absolute inset-0 opacity-[0.18]" style={{ backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)", backgroundSize: "26px 26px" }} />
          <div className="absolute -top-[5%] right-[15%] w-[600px] h-[600px] rounded-full opacity-[0.09]" style={{ background: "radial-gradient(circle, #2d6a0a 0%, transparent 65%)" }} />
          <div className="absolute bottom-0 left-[10%] w-[400px] h-[400px] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, #5edc1f 0%, transparent 65%)" }} />
        </div>
        {/* BG — dark */}
        <div className="absolute inset-0 hidden dark:block pointer-events-none">
          <div className="aurora-b absolute -top-[20%] right-[5%] w-[700px] h-[700px] rounded-full" style={{ background: "radial-gradient(circle, #4f46e5 0%, transparent 60%)" }} />
          <div className="aurora-a absolute bottom-[-10%] left-[10%] w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, #0891b2 0%, transparent 60%)" }} />
          <div className="absolute inset-0 opacity-[0.022]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <motion.div style={{ y: heroY }} className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left */}
            <div>
              <motion.div
                className="inline-flex items-center gap-2 rounded-full border border-green-200 dark:border-[#5edc1f]/20 bg-green-50 dark:bg-[#5edc1f]/[0.08] px-4 py-2 mb-7"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: E }}
              >
                <svg className="w-3.5 h-3.5 text-[#4cc015] dark:text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <span className="text-[11px] font-semibold text-[#4cc015] dark:text-lime-300 tracking-wide">Data Protection · KoveTrade</span>
              </motion.div>

              <motion.h1
                className="font-black tracking-tight leading-[1.05] mb-5 text-gray-900 dark:text-white"
                style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.8rem)" }}
                initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08, ease: E }}
              >
                Your Privacy,{" "}
                <span className="bg-gradient-to-r from-[#4cc015] via-[#5edc1f] to-lime-400 bg-clip-text text-transparent">
                  Our Priority.
                </span>
              </motion.h1>

              <motion.p
                className="text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed mb-8 max-w-md"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.16, ease: E }}
              >
                We believe in radical transparency. This policy explains exactly what data we collect, how we protect it,
                and the controls you have over your personal information.
              </motion.p>

              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.28 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 dark:bg-white/[0.06] border border-gray-200 dark:border-white/[0.08] px-4 py-2">
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[12px] text-gray-500 dark:text-gray-400 font-medium">
                    Last Updated: <strong className="text-gray-700 dark:text-gray-200">February 2026</strong>
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right — stat pills */}
            <motion.div
              className="hidden lg:grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: E }}
            >
              {[
                { icon: "🔒", stat: "256-bit",     label: "SSL Encryption",         c: "from-[#5edc1f] to-lime-400"    },
                { icon: "🛡️", stat: "ISO 27001",   label: "Security Certified",     c: "from-emerald-500 to-teal-500" },
                { icon: "🌍", stat: "GDPR",        label: "Compliant",              c: "from-[#5edc1f] to-green-700"},
                { icon: "⚡", stat: "<24h",        label: "Data Request Response",  c: "from-amber-500 to-orange-500" },
              ].map(({ icon, stat, label, c }, i) => (
                <motion.div
                  key={label}
                  className="rounded-3xl border border-gray-100 dark:border-white/[0.07] bg-gray-50 dark:bg-white/[0.03] p-5 flex flex-col gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.38 + i * 0.08, ease: E }}
                >
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <p className={`text-xl font-black bg-gradient-to-r ${c} bg-clip-text text-transparent`}>{stat}</p>
                    <p className="text-[12px] text-gray-500 dark:text-gray-500">{label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── Sticky nav ── */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-[#070809]/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/[0.06]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex items-center gap-2 py-3 overflow-x-auto no-scrollbar">
            <span className="text-[11px] text-gray-400 dark:text-gray-600 font-medium shrink-0 mr-1">Sections:</span>
            {[
              { n: 1, label: "Data Collected",   col: "hover:text-[#4cc015] dark:hover:text-lime-400"    },
              { n: 2, label: "Security",         col: "hover:text-emerald-600 dark:hover:text-emerald-400" },
              { n: 3, label: "Affiliates",       col: "hover:text-[#4cc015] dark:hover:text-lime-400" },
              { n: 4, label: "Third Parties",    col: "hover:text-rose-600 dark:hover:text-lime-400"    },
              { n: 5, label: "Regulatory",       col: "hover:text-amber-600 dark:hover:text-amber-400"  },
              { n: 6, label: "Your Rights",      col: "hover:text-[#4cc015] dark:hover:text-lime-300"    },
            ].map(({ n, label, col }) => (
              <a
                key={n}
                href={`#section-${n}`}
                className={`shrink-0 inline-flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.07] px-3.5 py-1.5 text-[11px] font-semibold text-gray-500 dark:text-gray-500 transition-all duration-200 ${col}`}
              >
                <span className="font-black opacity-60">{n}.</span>{label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <main className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-5">

          {/* §1 — Personal Information */}
          <PolicySection
            n={1} colorKey="collect" delay={0}
            tagLabel="Data Collection"
            title="Personal Information We Collect"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            }
          >
            <p className="text-[14px] sm:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              KoveTrade is committed to protecting your privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you use our platform and services.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              <DataTypeCard label="Application Info"    fields={APP_INFO_FIELDS}  color="text-[#4cc015] dark:text-lime-400"    />
              <DataTypeCard label="Transaction Info"    fields={TXN_FIELDS}       color="text-[#4cc015] dark:text-lime-300"    />
              <DataTypeCard label="Verification (KYC)"  fields={VERIFY_FIELDS}    color="text-green-700 dark:text-lime-400" />
            </div>
          </PolicySection>

          {/* §2 — Security */}
          <PolicySection
            n={2} colorKey="security" delay={0.05}
            tagLabel="Data Security"
            title="Security Technology"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            }
          >
            <p className="text-[14px] sm:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              KoveTrade employs industry-standard security measures to protect your personal information from
              unauthorized access, alteration, disclosure, or destruction.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {SECURITY_MEASURES.map(({ icon, label, sub }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 rounded-2xl bg-emerald-50 dark:bg-emerald-500/[0.04] border border-emerald-100 dark:border-emerald-500/[0.12] p-4"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-gray-900 dark:text-white leading-snug mb-0.5">{label}</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-500 leading-snug">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </PolicySection>

          {/* §3 — Affiliates */}
          <PolicySection
            n={3} colorKey="affiliates" delay={0.07}
            tagLabel="Affiliated Companies"
            title="Sharing with Our Affiliates"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
              </svg>
            }
          >
            <p className="text-[14px] sm:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
              KoveTrade may share your personal information with our affiliated companies and subsidiaries for the
              following purposes. All affiliates are bound by the same privacy and data protection standards.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { t: "Service Improvement",         b: "Providing and continuously improving our trading services" },
                { t: "Regulatory Compliance",        b: "Ensuring compliance across all global jurisdictions" },
                { t: "Internal Analytics",           b: "Conducting research and analytics across our group" },
                { t: "Risk Management",              b: "Managing risk holistically across our group of companies" },
              ].map(({ t, b }) => (
                <div key={t} className="flex items-start gap-3 rounded-2xl border border-green-100 dark:border-[#5edc1f]/[0.12] bg-green-50 dark:bg-[#5edc1f]/[0.04] p-4">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-[#5edc1f] flex items-center justify-center shrink-0">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  </span>
                  <div>
                    <p className="text-[13px] font-bold text-gray-900 dark:text-white mb-0.5">{t}</p>
                    <p className="text-[12px] text-gray-500 dark:text-gray-500">{b}</p>
                  </div>
                </div>
              ))}
            </div>
          </PolicySection>

          {/* §4 — Third Parties */}
          <PolicySection
            n={4} colorKey="third" delay={0.09}
            tagLabel="External Partners"
            title="Sharing with Third Parties"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
            }
          >
            <p className="text-[14px] sm:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
              We may share your personal information with third parties in the following circumstances. All service
              providers are contractually obligated to protect your information.
            </p>
            <div className="space-y-2.5">
              {THIRD_PARTY_TYPES.map(({ label, desc }, i) => (
                <div key={label} className="flex items-center gap-4 rounded-2xl border border-green-100 dark:border-rose-500/[0.12] bg-rose-50/50 dark:bg-rose-500/[0.03] px-5 py-4">
                  <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#5edc1f] to-green-700 flex items-center justify-center text-white text-[11px] font-black shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-gray-900 dark:text-white leading-none mb-0.5">{label}</p>
                    <p className="text-[12px] text-gray-500 dark:text-gray-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </PolicySection>

          {/* §5 — Regulatory */}
          <PolicySection
            n={5} colorKey="regulatory" delay={0.11}
            tagLabel="Legal Obligation"
            title="Regulatory Disclosure"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
              </svg>
            }
          >
            <p className="text-[14px] sm:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
              KoveTrade may be required to disclose your personal information to regulatory authorities, law enforcement
              agencies, or other governmental bodies in response to lawful requests, subpoenas, or court orders.
            </p>
            <div className="rounded-2xl border border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/[0.05] p-5">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <div>
                  <p className="text-[13px] font-bold text-amber-800 dark:text-amber-300 mb-1">Our commitment in such cases:</p>
                  <ul className="space-y-1">
                    {[
                      "We disclose only the minimum information necessary to comply",
                      "We will notify you of such disclosures where legally permitted",
                      "We challenge requests we believe are unlawful or overly broad",
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-2 text-[13px] text-amber-700 dark:text-amber-400/80">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-500 shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </PolicySection>

          {/* §6 — Opt Out / Your Rights */}
          <PolicySection
            n={6} colorKey="optout" delay={0.13}
            tagLabel="Your Rights"
            title="Opt Out & Data Controls"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
              </svg>
            }
          >
            <p className="text-[14px] sm:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
              You have the right to opt out of certain data collection and communication practices.
              Opting out of some activities may limit features available to you.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-5">
              {OPT_OUT_RIGHTS.map((right, i) => (
                <div key={i} className="flex items-start gap-3 rounded-2xl border border-green-100 dark:border-lime-400/[0.15] bg-cyan-50 dark:bg-lime-400/[0.04] p-4">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-lime-400 to-[#5edc1f] flex items-center justify-center text-white shrink-0 mt-0.5">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  </div>
                  <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed">{right}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="text-[13px] text-gray-500 dark:text-gray-500">To exercise any right:</span>
              <a
                href="mailto:support@kovetrade.com"
                className="inline-flex items-center gap-1.5 rounded-full bg-lime-400/10 border border-lime-400/20 px-4 py-2 text-[12px] font-bold text-[#4cc015] dark:text-lime-300 hover:bg-lime-400/20 transition-colors duration-200"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                support@kovetrade.com
              </a>
            </div>
          </PolicySection>

          {/* ── Bottom CTA ── */}
          <Reveal delay={0.15}>
            <div className="relative rounded-3xl overflow-hidden p-8 sm:p-10 text-center shadow-2xl shadow-green-900/15"
              style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #4cc015 100%)" }}
            >
              <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 65%)" }} />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-3">Questions about your privacy?</h3>
                <p className="text-lime-200 text-[14px] max-w-sm mx-auto leading-relaxed mb-8">
                  Our data protection team takes your privacy seriously. We commit to responding to any inquiry within 24 hours.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="mailto:privacy@kovetrade.com"
                    className="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#4cc015] hover:bg-green-50 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20 transition-all duration-300"
                  >
                    Contact Privacy Team
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/[0.08] px-8 py-3.5 text-sm font-bold text-white hover:bg-white/[0.15] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
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
