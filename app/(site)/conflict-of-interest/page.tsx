"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

const E = [0.16, 1, 0.3, 1] as const;

function Reveal({ children, delay = 0, className = "", dir = "up" }: {
  children: React.ReactNode; delay?: number; className?: string;
  dir?: "up" | "left" | "right";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const from = dir === "left" ? { opacity: 0, x: -30 } : dir === "right" ? { opacity: 0, x: 30 } : { opacity: 0, y: 28 };
  const to = { opacity: 1, x: 0, y: 0 };
  return (
    <motion.div ref={ref} initial={from} animate={inView ? to : from}
      transition={{ duration: 0.72, delay, ease: E }} className={className}
    >{children}</motion.div>
  );
}

// ─── Animated balance scales ────────────────────────────────────
function BalanceScales() {
  return (
    <motion.div
      className="flex flex-col items-center select-none"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: E }}
    >
      <svg viewBox="0 0 200 180" className="w-52 h-44" fill="none">
        {/* Pole */}
        <line x1="100" y1="20" x2="100" y2="150" stroke="rgba(255,255,255,0.15)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="100" cy="18" r="5" fill="#f59e0b" />

        {/* Beam — gently rocking */}
        <motion.g
          animate={{ rotate: [-4, 4, -4] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          style={{ transformOrigin: "100px 30px" }}
        >
          <line x1="30" y1="30" x2="170" y2="30" stroke="rgba(255,255,255,0.2)" strokeWidth="3" strokeLinecap="round" />

          {/* Left chain */}
          <line x1="38" y1="30" x2="38" y2="72" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Left pan */}
          <ellipse cx="38" cy="80" rx="22" ry="9" fill="rgba(245,158,11,0.15)" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="38" y="84" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="800" fontFamily="sans-serif">CLIENT</text>

          {/* Right chain */}
          <line x1="162" y1="30" x2="162" y2="72" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Right pan */}
          <ellipse cx="162" cy="80" rx="22" ry="9" fill="rgba(99,102,241,0.15)" stroke="#a3e635" strokeWidth="1.5" />
          <text x="162" y="84" textAnchor="middle" fill="#a3e635" fontSize="8" fontWeight="800" fontFamily="sans-serif">FIRM</text>
        </motion.g>

        {/* Base */}
        <path d="M 80 150 Q 100 145 120 150" stroke="rgba(255,255,255,0.15)" strokeWidth="3" strokeLinecap="round" fill="none" />
        <line x1="85" y1="160" x2="115" y2="160" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <p className="text-[11px] text-amber-400/70 font-bold tracking-widest uppercase mt-1">
        Balanced & Fair
      </p>
    </motion.div>
  );
}

// ─── Conflict management cycle ──────────────────────────────────
const CYCLE_STEPS = [
  { n: "01", label: "Identify",  body: "Employees spot potential conflicts and report to compliance",      color: "from-[#5edc1f] to-green-700",    dot: "#2d6a0a" },
  { n: "02", label: "Assess",    body: "Compliance evaluates severity and potential client impact",         color: "from-amber-500 to-orange-500",   dot: "#f59e0b" },
  { n: "03", label: "Manage",    body: "Apply barriers, disclosures, or segregation of duties",            color: "from-emerald-500 to-teal-600",   dot: "#10b981" },
  { n: "04", label: "Disclose",  body: "Inform affected clients clearly before proceeding",                color: "from-[#5edc1f] to-green-700",  dot: "#8b5cf6" },
];

// ─── CoI Types ─────────────────────────────────────────────────
const COI_TYPES = [
  { icon: "💰", label: "Financial Interests",      desc: "Where KoveTrade or its employees may benefit financially at the expense of a client" },
  { icon: "🤝", label: "Personal Relationships",   desc: "Where personal connections between employees and clients may influence decision-making" },
  { icon: "⚖️", label: "Competing Interests",      desc: "Where KoveTrade provides services to multiple clients whose interests may conflict" },
  { icon: "🔗", label: "Third-Party Arrangements", desc: "Where relationships with third parties create incentives conflicting with client interests" },
];

// ─── Management measures ───────────────────────────────────────
const MEASURES = [
  {
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>,
    label: "Disclosure",
    body: "We disclose conflicts to affected clients clearly, enabling informed decisions.",
    color: "from-[#5edc1f] to-green-700",
    bg: "bg-green-50 dark:bg-[#5edc1f]/[0.06]",
    border: "border-green-100 dark:border-[#5edc1f]/[0.15]",
  },
  {
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>,
    label: "Information Barriers",
    body: "Chinese walls prevent inappropriate sharing of confidential information between departments.",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50 dark:bg-amber-500/[0.06]",
    border: "border-amber-100 dark:border-amber-500/[0.15]",
  },
  {
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
    label: "Segregation of Duties",
    body: "Roles and responsibilities are separated to prevent undue influence over client outcomes.",
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50 dark:bg-emerald-500/[0.06]",
    border: "border-emerald-100 dark:border-emerald-500/[0.15]",
  },
  {
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>,
    label: "Declining to Act",
    body: "Where a conflict cannot be adequately managed, we may decline to provide services entirely.",
    color: "from-[#5edc1f] to-green-700",
    bg: "bg-rose-50 dark:bg-rose-500/[0.06]",
    border: "border-green-100 dark:border-rose-500/[0.15]",
  },
];

// ─── Regulatory frameworks ─────────────────────────────────────
const REGULATORS = [
  { name: "MiFID II",   full: "Markets in Financial Instruments Directive II", region: "EU",           color: "from-[#5edc1f] to-green-700" },
  { name: "FCA",        full: "Financial Conduct Authority",                    region: "UK",           color: "from-red-500 to-rose-600"    },
  { name: "CySEC",      full: "Cyprus Securities & Exchange Commission",        region: "Cyprus",       color: "from-amber-500 to-orange-500"},
  { name: "SEC",        full: "Securities and Exchange Commission",             region: "USA",          color: "from-emerald-500 to-teal-600"},
  { name: "ADGM FSRA",  full: "Financial Services Regulatory Authority",        region: "Middle East",  color: "from-[#5edc1f] to-green-700"},
];

// ─── Simple section card ────────────────────────────────────────
function Section({ id, n, label, title, iconEl, accentTw, borderTw, bgTw, children, delay = 0 }: {
  id: string; n: number; label: string; title: string; iconEl: React.ReactNode;
  accentTw: string; borderTw: string; bgTw: string;
  children: React.ReactNode; delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div id={id} className={`scroll-mt-20 rounded-3xl border ${borderTw} overflow-hidden bg-white dark:bg-[#0c0d0f]`}>
        <div className={`flex items-center gap-4 px-7 py-5 ${bgTw} border-b ${borderTw}`}>
          <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${accentTw} flex items-center justify-center text-white shadow-lg shrink-0`}>
            {iconEl}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-0.5`} style={{ color: "currentColor", opacity: 0.55 }}>{label} · §{n}</p>
            <h2 className="text-base sm:text-[17px] font-black text-gray-900 dark:text-white leading-snug">{title}</h2>
          </div>
          <span className="hidden sm:flex w-8 h-8 rounded-xl bg-white/60 dark:bg-white/[0.06] items-center justify-center text-[11px] font-black text-gray-500 dark:text-gray-500 shrink-0">
            {n}
          </span>
        </div>
        <div className="px-7 py-6">{children}</div>
      </div>
    </Reveal>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="text-[14px] sm:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed">{children}</p>;
}

// ─── Page ──────────────────────────────────────────────────────
export default function ConflictOfInterestPolicy() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  return (
    <div className="overflow-x-hidden bg-white dark:bg-[#070809] text-gray-900 dark:text-white">
      <Navbar />

      {/* ── Hero — deep navy + gold ── */}
      <section ref={heroRef} className="relative overflow-hidden bg-gray-100 dark:bg-[#080c18] pt-28 pb-24 sm:pt-36 sm:pb-32">
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
        {/* Glow */}
        <div className="aurora-b absolute -top-[20%] right-[0%] w-[700px] h-[700px] rounded-full opacity-20 hidden dark:block"
          style={{ background: "radial-gradient(circle, #f59e0b 0%, transparent 60%)" }} />
        <div className="aurora-a absolute -bottom-[15%] left-[5%] w-[550px] h-[550px] rounded-full opacity-15 hidden dark:block"
          style={{ background: "radial-gradient(circle, #2d6a0a 0%, transparent 60%)" }} />

        <motion.div style={{ y: heroY }} className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left */}
            <div>
              <motion.div
                className="inline-flex items-center gap-2.5 rounded-full border border-amber-500/25 bg-amber-500/[0.08] px-4 py-2 mb-7"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: E }}
              >
                <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
                </svg>
                <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-300 tracking-wide">Compliance Framework · KoveTrade</span>
              </motion.div>

              <motion.h1
                className="font-black tracking-tight leading-[1.04] mb-5 text-gray-900 dark:text-white"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4.4rem)" }}
                initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08, ease: E }}
              >
                Conflict of{" "}
                <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
                  Interest
                </span>{" "}
                Policy
              </motion.h1>

              <motion.p
                className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-md"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.15, ease: E }}
              >
                We recognise that conflicts of interest may arise in the ordinary course of business.
                This policy explains how KoveTrade identifies, prevents, and manages them — always
                putting client interests first.
              </motion.p>

              <motion.div className="flex flex-wrap gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.26 }}>
                {[
                  { label: "Last Updated",  val: "February 2026" },
                  { label: "Sections",      val: "13 Clauses"    },
                  { label: "Regulators",    val: "5 Frameworks"  },
                ].map(({ label, val }) => (
                  <div key={label} className="rounded-2xl border border-gray-300 dark:border-white/[0.08] bg-gray-100 dark:bg-white/[0.04] px-4 py-2.5">
                    <p className="text-[10px] text-gray-600 font-medium">{label}</p>
                    <p className="text-[13px] text-gray-900 dark:text-white font-bold">{val}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — animated scales */}
            <motion.div
              className="hidden lg:flex flex-col items-center justify-center gap-6"
              initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.28, ease: E }}
            >
              <BalanceScales />
              <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                {[
                  { icon: "🛡️", t: "Client-first",  c: "from-amber-500 to-yellow-400"   },
                  { icon: "🔍", t: "Full transparency", c: "from-[#5edc1f] to-green-700" },
                  { icon: "⚖️", t: "Fair practice",  c: "from-[#5edc1f] to-green-700" },
                  { icon: "📋", t: "Fully regulated", c: "from-emerald-500 to-teal-500" },
                ].map(({ icon, t, c }) => (
                  <div key={t} className="flex items-center gap-2.5 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5">
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${c} flex items-center justify-center text-sm shrink-0`}>{icon}</div>
                    <span className="text-[11px] font-bold text-gray-300">{t}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── Sticky nav ── */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-[#070809]/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/[0.06]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex items-center gap-2 py-3 overflow-x-auto no-scrollbar">
            <span className="text-[11px] text-gray-400 dark:text-gray-600 font-medium shrink-0 mr-1">Jump:</span>
            {[
              { n: 1, l: "Commitment"   }, { n: 2, l: "Definition"   }, { n: 3, l: "Identifying" },
              { n: 4, l: "Managing"     }, { n: 5, l: "Execution"    }, { n: 6, l: "Employees"   },
              { n: 7, l: "Inducements" }, { n: 8, l: "Third-Party"  }, { n: 9, l: "Monitoring"  },
              { n: 10, l: "Records"    }, { n: 11, l: "Disclosure"  }, { n: 12, l: "Reporting"  },
              { n: 13, l: "Regulation" },
            ].map(({ n, l }) => (
              <a key={n} href={`#coi${n}`}
                className="shrink-0 rounded-full bg-gray-100 dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.07] hover:border-amber-300 dark:hover:border-amber-500/40 hover:text-amber-700 dark:hover:text-amber-400 px-3 py-1.5 text-[11px] font-semibold text-gray-500 dark:text-gray-500 transition-all duration-200 whitespace-nowrap"
              >
                <span className="font-black opacity-50 mr-0.5">{n}.</span>{l}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <main className="py-16 sm:py-24 bg-gray-50 dark:bg-[#080909]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-4">

          {/* §1 Commitment */}
          <Section id="coi1" n={1} label="Our Promise" title="Our Commitment to Fair Practice" delay={0}
            accentTw="from-amber-500 to-yellow-600" borderTw="border-amber-100 dark:border-amber-500/[0.15]"
            bgTw="bg-amber-50/60 dark:bg-amber-500/[0.04]"
            iconEl={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>}
          >
            <Body>
              KoveTrade is committed to maintaining the highest standards of integrity and fairness in all our business
              dealings. We recognise that conflicts of interest may arise in the normal course of our business and have
              established this policy to identify, prevent, and manage such conflicts effectively. Our goal is to ensure
              that the interests of our clients are always protected and that we operate in a transparent and ethical manner.
            </Body>
          </Section>

          {/* §2 Definition */}
          <Section id="coi2" n={2} label="Definition" title="What is a Conflict of Interest?" delay={0.04}
            accentTw="from-[#5edc1f] to-green-700" borderTw="border-green-100 dark:border-[#5edc1f]/[0.15]"
            bgTw="bg-green-50/60 dark:bg-[#5edc1f]/[0.04]"
            iconEl={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>}
          >
            <Body>
              A conflict of interest arises when the interests of KoveTrade, its employees, or its affiliates may
              conflict with the interests of our clients. Conflicts can take many forms, including but not limited to:
            </Body>
            <div className="grid sm:grid-cols-2 gap-3 mt-5">
              {COI_TYPES.map(({ icon, label, desc }) => (
                <div key={label} className="flex items-start gap-3 rounded-2xl border border-green-100 dark:border-[#5edc1f]/[0.14] bg-green-50/40 dark:bg-[#5edc1f]/[0.04] p-4">
                  <span className="text-xl shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <p className="text-[13px] font-bold text-gray-900 dark:text-white mb-1">{label}</p>
                    <p className="text-[12px] text-gray-500 dark:text-gray-500 leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* §3 Identifying */}
          <Section id="coi3" n={3} label="Detection" title="Identifying Conflicts of Interest" delay={0.06}
            accentTw="from-[#5edc1f] to-green-700" borderTw="border-green-100 dark:border-[#5edc1f]/[0.15]"
            bgTw="bg-green-50/60 dark:bg-[#5edc1f]/[0.04]"
            iconEl={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z" /></svg>}
          >
            <Body>
              KoveTrade maintains robust processes for identifying potential and actual conflicts of interest. All
              employees are required to be vigilant in recognising situations where conflicts may arise and to report
              them promptly to the compliance department. We conduct regular assessments of our business activities,
              organisational structure, and service offerings to proactively identify areas where conflicts may occur.
            </Body>
          </Section>

          {/* §4 Managing — with cycle diagram */}
          <Reveal delay={0.08}>
            <div id="coi4" className="scroll-mt-20 rounded-3xl border border-gray-100 dark:border-white/[0.06] overflow-hidden bg-white dark:bg-[#0c0d0f]">
              <div className="flex items-center gap-4 px-7 py-5 bg-gray-50/80 dark:bg-white/[0.02] border-b border-gray-100 dark:border-white/[0.05]">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 tracking-[0.2em] uppercase mb-0.5">Section 4 · Resolution</p>
                  <h2 className="text-base sm:text-[17px] font-black text-gray-900 dark:text-white">Managing Conflicts of Interest</h2>
                </div>
              </div>
              <div className="px-7 py-6">
                {/* 4-step cycle */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-7">
                  {CYCLE_STEPS.map(({ n, label, body, color }, i) => (
                    <div key={n} className="relative flex flex-col items-center text-center rounded-2xl border border-gray-100 dark:border-white/[0.06] bg-gray-50 dark:bg-white/[0.02] p-5">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-lg font-black mb-3 shadow-lg`}>
                        {n}
                      </div>
                      <p className="text-[13px] font-bold text-gray-900 dark:text-white mb-1.5">{label}</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-500 leading-snug">{body}</p>
                      {/* Connector arrow */}
                      {i < 3 && (
                        <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                          <svg className="w-5 h-5 text-gray-300 dark:text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {/* 4 measure cards */}
                <div className="grid sm:grid-cols-2 gap-3">
                  {MEASURES.map(({ icon, label, body, color, bg, border }) => (
                    <div key={label} className={`flex items-start gap-3 rounded-2xl border ${border} ${bg} p-4`}>
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shrink-0 shadow-md`}>
                        {icon}
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-gray-900 dark:text-white mb-0.5">{label}</p>
                        <p className="text-[12px] text-gray-500 dark:text-gray-500 leading-relaxed">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* §5 Order Execution */}
          <Section id="coi5" n={5} label="Best Execution" title="Order Execution and Best Execution" delay={0.09}
            accentTw="from-lime-400 to-[#4cc015]" borderTw="border-green-100 dark:border-lime-400/[0.15]"
            bgTw="bg-cyan-50/60 dark:bg-lime-400/[0.04]"
            iconEl={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" /></svg>}
          >
            <Body>
              KoveTrade is committed to achieving the best possible result for our clients when executing orders.
              Our execution policy takes into account price, costs, speed, likelihood of execution and settlement,
              order size, and nature. We regularly monitor the effectiveness of our execution arrangements and make
              improvements as needed.
            </Body>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Price", "Costs", "Speed", "Execution likelihood", "Settlement", "Order size", "Order nature"].map((f) => (
                <span key={f} className="rounded-full border border-cyan-200 dark:border-lime-400/25 bg-cyan-50 dark:bg-lime-400/[0.08] px-3.5 py-1.5 text-[12px] font-semibold text-cyan-700 dark:text-lime-300">
                  {f}
                </span>
              ))}
            </div>
          </Section>

          {/* §6 Employee Trading */}
          <Section id="coi6" n={6} label="Internal Controls" title="Employee Trading & Personal Account Dealing" delay={0.1}
            accentTw="from-slate-600 to-gray-800" borderTw="border-gray-100 dark:border-white/[0.06]"
            bgTw="bg-gray-50/80 dark:bg-white/[0.02]"
            iconEl={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>}
          >
            <Body>
              All KoveTrade employees are subject to strict personal account dealing policies designed to prevent
              front-running or exploitation of their position to the detriment of clients.
            </Body>
            <div className="mt-5 space-y-2.5">
              {[
                "Employees must obtain prior approval before executing personal trades in financial instruments",
                "All personal trading accounts must be fully disclosed to the compliance department",
                "Trading ahead of client orders (front-running) is strictly prohibited",
                "Violations are subject to disciplinary action including termination",
              ].map((r, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center shrink-0">
                    <svg className="w-2.5 h-2.5 text-white dark:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  </span>
                  <p className="text-[14px] text-gray-600 dark:text-gray-400 leading-relaxed">{r}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* §7 Inducements */}
          <Section id="coi7" n={7} label="Remuneration" title="Inducements and Remuneration" delay={0.11}
            accentTw="from-amber-500 to-yellow-600" borderTw="border-amber-100 dark:border-amber-500/[0.15]"
            bgTw="bg-amber-50/60 dark:bg-amber-500/[0.04]"
            iconEl={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          >
            <Body>
              KoveTrade has policies in place to ensure that remuneration and incentive structures do not create
              conflicts that could adversely affect the quality of service provided to clients. We do not accept or
              pay inducements that would conflict with our duty to act in the best interests of our clients. Any fees,
              commissions, or non-monetary benefits received or paid to third parties are disclosed to clients and are
              designed to enhance the quality of the service provided.
            </Body>
          </Section>

          {/* §8 Third-Party */}
          <Section id="coi8" n={8} label="External Partners" title="Third-Party Relationships" delay={0.12}
            accentTw="from-[#5edc1f] to-green-700" borderTw="border-green-100 dark:border-rose-500/[0.15]"
            bgTw="bg-rose-50/60 dark:bg-rose-500/[0.04]"
            iconEl={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>}
          >
            <Body>
              KoveTrade maintains various relationships with third-party service providers, liquidity providers, and
              business partners. We carefully manage these relationships to ensure they do not create conflicts of
              interest that could disadvantage our clients. All third-party arrangements are subject to due diligence
              and ongoing monitoring by our compliance team.
            </Body>
          </Section>

          {/* §9 + §10 — Monitoring & Records side by side */}
          <Reveal delay={0.13}>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  id: "coi9", n: 9, label: "Oversight", title: "Monitoring & Review",
                  grad: "from-teal-500 to-cyan-600",
                  body: "Our compliance department conducts periodic reviews of business activities, employee conduct, and organisational structure. This policy is reviewed and updated at least annually to reflect regulatory changes and best practices.",
                  extra: (
                    <div className="mt-4 flex items-center gap-2 rounded-xl bg-teal-50 dark:bg-teal-500/[0.07] border border-teal-100 dark:border-teal-500/20 px-4 py-3">
                      <svg className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
                      <span className="text-[12px] font-semibold text-teal-700 dark:text-teal-400">Reviewed at least annually</span>
                    </div>
                  ),
                },
                {
                  id: "coi10", n: 10, label: "Documentation", title: "Record Keeping",
                  grad: "from-[#5edc1f] to-green-700",
                  body: "KoveTrade maintains comprehensive records of all identified conflicts, measures taken to manage them, and any disclosures made to clients. Records are retained per regulatory requirements and are available for inspection by relevant authorities.",
                  extra: (
                    <div className="mt-4 flex items-center gap-2 rounded-xl bg-lime-50 dark:bg-[#5edc1f]/[0.07] border border-green-100 dark:border-[#5edc1f]/20 px-4 py-3">
                      <svg className="w-4 h-4 text-green-700 dark:text-lime-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" /></svg>
                      <span className="text-[12px] font-semibold text-green-800 dark:text-lime-400">Available to regulators on request</span>
                    </div>
                  ),
                },
              ].map(({ id, n, label, title, grad, body, extra }) => (
                <div key={id} id={id} className="scroll-mt-20 rounded-3xl border border-gray-100 dark:border-white/[0.06] bg-white dark:bg-[#0c0d0f] p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center text-white text-[11px] font-black shadow-md shrink-0`}>{n}</div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 tracking-widest uppercase">{label}</p>
                      <p className="text-[14px] font-black text-gray-900 dark:text-white">{title}</p>
                    </div>
                  </div>
                  <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed">{body}</p>
                  {extra}
                </div>
              ))}
            </div>
          </Reveal>

          {/* §11 Disclosure */}
          <Section id="coi11" n={11} label="Transparency" title="Disclosure to Clients" delay={0.14}
            accentTw="from-[#5edc1f] to-cyan-600" borderTw="border-green-100 dark:border-[#5edc1f]/[0.15]"
            bgTw="bg-green-50/60 dark:bg-[#5edc1f]/[0.04]"
            iconEl={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
          >
            <Body>
              Where KoveTrade identifies a conflict of interest that cannot be adequately managed through our internal
              procedures, we will disclose the nature and source of the conflict to affected clients before undertaking
              any business with them. This disclosure will be made in sufficient detail to enable clients to make an
              informed decision about whether to proceed with the relevant service or transaction.
            </Body>
          </Section>

          {/* §12 Reporting */}
          <Section id="coi12" n={12} label="Escalation" title="Reporting Concerns and Complaints" delay={0.15}
            accentTw="from-emerald-500 to-teal-600" borderTw="border-emerald-100 dark:border-emerald-500/[0.15]"
            bgTw="bg-emerald-50/60 dark:bg-emerald-500/[0.04]"
            iconEl={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>}
          >
            <Body>
              If you believe that a conflict of interest has adversely affected you, or if you have any concerns about
              how KoveTrade manages conflicts of interest, we encourage you to report your concerns to our compliance
              department. All reports will be investigated promptly and thoroughly, and appropriate corrective action
              will be taken where necessary. You may also file a complaint through our formal complaints process.
            </Body>
            <div className="mt-5 flex flex-col sm:flex-row items-center gap-4 rounded-2xl border border-emerald-200 dark:border-emerald-500/25 bg-emerald-50 dark:bg-emerald-500/[0.06] p-4">
              <div className="flex-1">
                <p className="text-[13px] font-bold text-gray-900 dark:text-white mb-0.5">Contact our Compliance Department</p>
                <p className="text-[12px] text-gray-500 dark:text-gray-400">All reports investigated within 5 business days</p>
              </div>
              <a href="mailto:compliance@kovetrade.com"
                className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-[12px] px-5 py-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/25"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                compliance@kovetrade.com
              </a>
            </div>
          </Section>

          {/* §13 Regulatory */}
          <Reveal delay={0.16}>
            <div id="coi13" className="scroll-mt-20 rounded-3xl border border-amber-100 dark:border-amber-500/[0.15] overflow-hidden bg-white dark:bg-[#0c0d0f]">
              <div className="flex items-center gap-4 px-7 py-5 bg-amber-50/60 dark:bg-amber-500/[0.04] border-b border-amber-100 dark:border-amber-500/[0.12]">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-white shadow-lg shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" /></svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400 tracking-[0.2em] uppercase mb-0.5">Section 13 · Compliance</p>
                  <h2 className="text-base sm:text-[17px] font-black text-gray-900 dark:text-white">Regulatory Compliance</h2>
                </div>
              </div>
              <div className="px-7 py-6">
                <p className="text-[14px] sm:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  This policy has been developed in accordance with applicable regulatory requirements across all
                  jurisdictions in which KoveTrade operates. We are committed to full compliance with all regulatory
                  obligations relating to the management of conflicts of interest.
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {REGULATORS.map(({ name, full, region, color }) => (
                    <div key={name} className="flex items-start gap-3 rounded-2xl border border-gray-100 dark:border-white/[0.06] bg-gray-50 dark:bg-white/[0.02] p-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-[10px] font-black shrink-0 shadow-md`}>
                        {name.split(" ")[0]}
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-gray-900 dark:text-white leading-none mb-1">{name}</p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-500 leading-snug">{full}</p>
                        <p className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold mt-0.5">{region}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── CTA ── */}
          <Reveal delay={0.18}>
            <div
              className="relative rounded-3xl overflow-hidden text-center p-8 sm:p-10 shadow-2xl"
              style={{ background: "linear-gradient(135deg, #1e1a08 0%, #292107 40%, #1a1f08 70%, #080c18 100%)" }}
            >
              <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
              {/* Gold glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-48 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(ellipse, rgba(245,158,11,0.15) 0%, transparent 70%)" }} />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-3">Questions about our compliance?</h3>
                <p className="text-amber-200/70 text-[14px] max-w-sm mx-auto leading-relaxed mb-8">
                  Our compliance department is committed to maintaining the highest standards of transparency
                  and fairness in all dealings with clients.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link href="mailto:compliance@kovetrade.com"
                    className="rounded-full bg-amber-400 hover:bg-amber-300 px-8 py-3.5 text-sm font-bold text-amber-900 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-300"
                  >
                    Contact Compliance Team
                  </Link>
                  <Link href="/"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-8 py-3.5 text-sm font-bold text-white hover:bg-white/[0.12] hover:-translate-y-0.5 transition-all duration-300"
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
