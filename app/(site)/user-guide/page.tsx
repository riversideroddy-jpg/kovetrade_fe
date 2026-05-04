"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
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
  dir?: "up" | "left" | "right" | "none";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });
  const from =
    dir === "left"  ? { opacity: 0, x: -32, y: 0 }
    : dir === "right" ? { opacity: 0, x: 32, y: 0 }
    : dir === "none"  ? { opacity: 0, y: 0 }
    : { opacity: 0, y: 36, x: 0 };
  return (
    <motion.div
      ref={ref}
      initial={from}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : from}
      transition={{ duration: 0.75, delay, ease: E }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated Copy-Trade Flow SVG ────────────────────────────────
function CopyFlowHero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const traderBars = [38, 55, 42, 68, 52, 74, 60, 80];
  const followerBars = [0, 0, 0, 0, 0, 0, 0, 0];

  return (
    <motion.div
      ref={ref}
      className="select-none flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: E }}
    >
      <svg viewBox="0 0 280 240" className="w-72 h-64 md:w-96 md:h-80" fill="none">
        {/* Leader card */}
        <motion.rect
          x="10" y="20" width="110" height="90" rx="12"
          fill="rgba(56,189,248,0.06)" stroke="rgba(56,189,248,0.35)" strokeWidth="1.5"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ delay: 0.4, duration: 0.6, ease: E }}
        />
        <text x="65" y="40" fill="rgba(56,189,248,0.8)" fontSize="7" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">LEADER</text>
        <circle cx="65" cy="52" r="10" fill="rgba(56,189,248,0.15)" stroke="rgba(56,189,248,0.5)" strokeWidth="1.5" />
        <text x="65" y="56" fill="rgba(56,189,248,0.9)" fontSize="8" textAnchor="middle">👤</text>
        {/* Leader mini chart */}
        {traderBars.map((h, i) => (
          <motion.rect
            key={i}
            x={20 + i * 12} y={105 - h * 0.35} width="9" rx="2"
            fill={`rgba(56,189,248,${0.3 + (i % 2) * 0.15})`}
            initial={{ height: 0, y: 105 }}
            animate={inView ? { height: h * 0.35, y: 105 - h * 0.35 } : { height: 0, y: 105 }}
            transition={{ delay: 0.7 + i * 0.07, duration: 0.5, ease: E }}
          />
        ))}
        <text x="65" y="118" fill="rgba(56,189,248,0.5)" fontSize="6" textAnchor="middle" fontFamily="sans-serif">+74.2% return</text>

        {/* Arrow / copy signal */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.5 }}
        >
          <line x1="122" y1="65" x2="158" y2="65" stroke="rgba(129,140,248,0.6)" strokeWidth="2" strokeDasharray="4 3" />
          <polygon points="160,60 170,65 160,70" fill="rgba(129,140,248,0.7)" />
          <motion.circle
            cx="130" cy="65" r="4" fill="rgba(129,140,248,0.9)"
            animate={{ cx: [122, 158], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, delay: 2 }}
          />
          <text x="146" y="58" fill="rgba(129,140,248,0.7)" fontSize="6" textAnchor="middle" fontFamily="sans-serif">COPY</text>
        </motion.g>

        {/* Follower card */}
        <motion.rect
          x="162" y="20" width="110" height="90" rx="12"
          fill="rgba(129,140,248,0.06)" stroke="rgba(129,140,248,0.35)" strokeWidth="1.5"
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ delay: 0.4, duration: 0.6, ease: E }}
        />
        <text x="217" y="40" fill="rgba(129,140,248,0.8)" fontSize="7" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">YOU</text>
        <circle cx="217" cy="52" r="10" fill="rgba(129,140,248,0.15)" stroke="rgba(129,140,248,0.5)" strokeWidth="1.5" />
        <text x="217" y="56" fill="rgba(129,140,248,0.9)" fontSize="8" textAnchor="middle">🧑</text>
        {/* Follower chart — reveals with delay */}
        {traderBars.map((h, i) => (
          <motion.rect
            key={i}
            x={172 + i * 12} y={105 - h * 0.35} width="9" rx="2"
            fill={`rgba(129,140,248,${0.3 + (i % 2) * 0.15})`}
            initial={{ height: 0, y: 105 }}
            animate={inView ? { height: h * 0.35, y: 105 - h * 0.35 } : { height: 0, y: 105 }}
            transition={{ delay: 1.8 + i * 0.07, duration: 0.5, ease: E }}
          />
        ))}
        <text x="217" y="118" fill="rgba(129,140,248,0.5)" fontSize="6" textAnchor="middle" fontFamily="sans-serif">replicated automatically</text>

        {/* Dashboard panel bottom */}
        <motion.rect
          x="10" y="130" width="262" height="100" rx="12"
          fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1, duration: 0.6, ease: E }}
        />
        {/* Dashboard rows */}
        {[
          { label: "Total Balance", value: "$12,840", color: "rgba(56,189,248,0.9)",  x: 30  },
          { label: "P&L Today",     value: "+$248",   color: "rgba(74,222,128,0.9)",  x: 108 },
          { label: "Active Copies", value: "3",       color: "rgba(250,204,21,0.9)",  x: 186 },
        ].map((row, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.4 + i * 0.15 }}
          >
            <text x={row.x + 25} y="152" fill="rgba(255,255,255,0.35)" fontSize="5.5" textAnchor="middle" fontFamily="sans-serif">{row.label}</text>
            <text x={row.x + 25} y="168" fill={row.color} fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">{row.value}</text>
          </motion.g>
        ))}
        {/* Dividers */}
        <line x1="103" y1="140" x2="103" y2="195" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <line x1="181" y1="140" x2="181" y2="195" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

        {/* Progress bar */}
        <rect x="30" y="185" width="222" height="5" rx="2.5" fill="rgba(255,255,255,0.06)" />
        <motion.rect
          x="30" y="185" height="5" rx="2.5"
          fill="url(#dashGrad)"
          initial={{ width: 0 }}
          animate={inView ? { width: 155 } : { width: 0 }}
          transition={{ delay: 1.8, duration: 1, ease: E }}
        />
        <text x="141" y="204" fill="rgba(255,255,255,0.3)" fontSize="5.5" textAnchor="middle" fontFamily="sans-serif">Portfolio health: 70%</text>

        {/* Status pill */}
        <rect x="100" y="213" width="82" height="14" rx="7" fill="rgba(56,189,248,0.12)" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
        <motion.circle cx="111" cy="220" r="3" fill="rgba(56,189,248,0.9)"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
        <text x="148" y="223.5" fill="rgba(56,189,248,0.8)" fontSize="6" textAnchor="middle" fontFamily="sans-serif" fontWeight="600">COPY ACTIVE</text>

        <defs>
          <linearGradient id="dashGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(56,189,248,0.8)" />
            <stop offset="100%" stopColor="rgba(129,140,248,0.8)" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

// ─── Step card ───────────────────────────────────────────────────
function StepCard({ num, title, body, delay = 0 }: { num: number; title: string; body: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <motion.div
      ref={ref}
      className="flex gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.55, delay, ease: E }}
    >
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-9 h-9 rounded-xl bg-[#5edc1f]/15 border border-[#5edc1f]/35 flex items-center justify-center">
          <span className="text-sm font-black bg-gradient-to-b from-lime-400 to-emerald-400 bg-clip-text text-transparent">{num}</span>
        </div>
        {num < 5 && <div className="w-px flex-1 bg-gradient-to-b from-[#5edc1f]/30 to-transparent mt-1.5 min-h-[20px]" />}
      </div>
      <div className="pb-5">
        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{title}</p>
        <p className="text-xs text-gray-500 leading-relaxed">{body}</p>
      </div>
    </motion.div>
  );
}

// ─── Check item ──────────────────────────────────────────────────
function CheckItem({ text, delay = 0, color = "sky" }: { text: string; delay?: number; color?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const clrs: Record<string, string> = {
    sky:    "bg-[#5edc1f]/15 border-lime-400/35 text-lime-400",
    indigo: "bg-[#5edc1f]/15 border-[#5edc1f]/35 text-lime-400",
    emerald:"bg-emerald-500/15 border-emerald-400/35 text-emerald-400",
    violet: "bg-[#5edc1f]/15 border-[#5edc1f]/35 text-lime-400",
  };
  return (
    <motion.div
      ref={ref}
      className="flex items-start gap-3"
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
      transition={{ duration: 0.5, delay, ease: E }}
    >
      <span className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center ${clrs[color] ?? clrs.sky}`}>
        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 10 10">
          <path d="M2 5l2.5 2.5L8 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{text}</p>
    </motion.div>
  );
}

// ─── Section wrapper ─────────────────────────────────────────────
function GuideSection({ id, icon, title, accent = "sky", children }: {
  id: string; icon: string; title: string; accent?: string; children: React.ReactNode;
}) {
  const accentMap: Record<string, string> = {
    sky:    "text-lime-400 border-[#5edc1f]/20 bg-[#5edc1f]/8",
    indigo: "text-lime-400 border-[#5edc1f]/20 bg-[#5edc1f]/8",
    violet: "text-lime-400 border-[#5edc1f]/20 bg-[#5edc1f]/10",
    emerald:"text-emerald-400 border-emerald-500/20 bg-emerald-500/8",
    amber:  "text-amber-400 border-amber-500/20 bg-amber-500/8",
    rose:   "text-lime-400 border-rose-500/20 bg-rose-500/8",
    cyan:   "text-lime-300 border-lime-400/20 bg-lime-400/8",
    blue:   "text-lime-400 border-[#5edc1f]/20 bg-[#5edc1f]/8",
  };
  const a = accentMap[accent] ?? accentMap.sky;
  return (
    <section id={id} className="py-16 px-4 border-t border-gray-100 dark:border-white/5 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-10">
          <div className="flex items-center gap-3 mb-1">
            <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center text-xl ${a}`}>
              {icon}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

// ─── Nav items ───────────────────────────────────────────────────
const NAV = [
  { id: "start",    label: "Getting Started"   },
  { id: "account",  label: "Create Account"    },
  { id: "dash",     label: "Dashboard"         },
  { id: "find",     label: "Find Traders"      },
  { id: "copy",     label: "Copy Trading"      },
  { id: "manage",   label: "Manage Portfolio"  },
  { id: "funds",    label: "Deposits"          },
  { id: "security", label: "Security"          },
  { id: "help",     label: "Get Help"          },
];

// ─── Page ────────────────────────────────────────────────────────
export default function UserGuidePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#060b14] text-gray-900 dark:text-white">
      <style>{`
        @keyframes ug-a { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(25px,-18px) scale(1.05)} 66%{transform:translate(-12px,14px) scale(0.96)} }
        @keyframes ug-b { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-18px,20px) scale(1.04)} }
        .ug-a{animation:ug-a 16s ease-in-out infinite}
        .ug-b{animation:ug-b 22s ease-in-out infinite}
      `}</style>

      {/* Aurora */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none hidden dark:block">
        <div className="ug-a absolute top-[-10%] left-[-4%] w-[55vw] h-[55vw] rounded-full bg-green-700/10 blur-[120px]" />
        <div className="ug-b absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-green-800/10 blur-[110px]" />
        <div className="ug-a absolute top-[42%] left-[30%] w-[36vw] h-[36vw] rounded-full bg-green-800/7 blur-[130px]" style={{ animationDelay: "7s" }} />
      </div>

      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative pt-28 pb-24 px-4 overflow-hidden">
        {/* Blueprint grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04] hidden dark:block"
          style={{
            backgroundImage: "linear-gradient(rgba(56,189,248,1) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left */}
            <motion.div style={{ y: heroY }}>
              <Reveal delay={0.05}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#5edc1f]/35 bg-[#5edc1f]/10 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                  <span className="text-xs text-lime-300 font-medium tracking-wide">KoveTrade User Guide</span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
                  Everything you need
                  <br />
                  to{" "}
                  <span className="bg-gradient-to-r from-lime-400 via-lime-400 to-emerald-400 bg-clip-text text-transparent">
                    get started
                  </span>
                  <br />
                  with copy trading.
                </h1>
              </Reveal>

              <Reveal delay={0.18}>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8 max-w-md">
                  Whether you are a complete beginner or an experienced trader looking to diversify,
                  KoveTrade makes it easy to follow top performers and replicate their success.
                </p>
              </Reveal>

              {/* Progress steps */}
              <Reveal delay={0.26}>
                <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
                  {["Create", "Find", "Copy", "Earn"].map((s, i) => (
                    <React.Fragment key={i}>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <div className="w-6 h-6 rounded-full bg-[#5edc1f]/20 border border-[#5edc1f]/40 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-lime-400">{i + 1}</span>
                        </div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{s}</span>
                      </div>
                      {i < 3 && <div className="w-6 h-px bg-[#5edc1f]/25 flex-shrink-0" />}
                    </React.Fragment>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.32}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#5edc1f] to-green-700 text-white font-bold text-sm hover:from-lime-400 hover:to-green-600 transition-all shadow-lg shadow-green-900/30"
                  >
                    Get Started
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <a
                    href="#start"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-gray-200 dark:border-white/12 text-white/80 font-semibold text-sm hover:bg-gray-100 dark:bg-white/6 transition-all"
                  >
                    Read the guide ↓
                  </a>
                </div>
              </Reveal>
            </motion.div>

            {/* Right */}
            <Reveal delay={0.2} dir="right">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#4cc015]/10 to-green-900/8 blur-2xl scale-110" />
                  <div className="relative rounded-3xl border border-[#5edc1f]/20 bg-gray-50 dark:bg-white/[0.02] p-8">
                    <CopyFlowHero />
                    <div className="mt-4 text-center">
                      <p className="text-xs text-gray-500 uppercase tracking-widest font-mono">Live replication</p>
                      <p className="text-sm font-semibold text-lime-300">Leader trades → Your account</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Quick-nav ────────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 border-b border-gray-200 dark:border-white/5 bg-white/95 dark:bg-[#060b14]/85 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`}
                className="text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-lime-300 hover:border-[#5edc1f]/40 hover:bg-[#5edc1f]/8 transition-all whitespace-nowrap"
              >
                {n.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Welcome ──────────────────────────────────────────────── */}
      <section id="start" className="py-14 px-4 border-t border-gray-100 dark:border-white/5 scroll-mt-20">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Getting Started</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
              Welcome to KoveTrade! By the end of this guide, you will know how to create your
              account, find traders to copy, set up copy trading, and manage your portfolio
              effectively.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: "🧑‍💻", label: "Create Account" },
                { icon: "🔍", label: "Find Leaders" },
                { icon: "📋", label: "Copy Trades" },
                { icon: "📈", label: "Grow Portfolio" },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center p-4 rounded-2xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/[0.025]">
                  <span className="text-2xl mb-2">{s.icon}</span>
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Create Account ───────────────────────────────────────── */}
      <GuideSection id="account" icon="🧑‍💻" title="Creating Your Account" accent="sky">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-0">
            <StepCard num={1} title="Register" body="Visit the KoveTrade registration page and enter your email address and a strong password." delay={0.05} />
            <StepCard num={2} title="Verify Email" body="Check your inbox and click the verification link we send you to activate your account." delay={0.12} />
            <StepCard num={3} title="Complete KYC" body="Upload your government-issued identification documents to complete identity verification." delay={0.19} />
            <StepCard num={4} title="Fund Account" body="Deposit funds using your preferred method — bank transfer, card, crypto, or e-wallet." delay={0.26} />
            <StepCard num={5} title="Start Copy Trading!" body="You are fully set up. Browse leaders and start replicating trades in seconds." delay={0.33} />
          </div>
          <Reveal delay={0.1} dir="right">
            <div className="rounded-3xl border border-[#5edc1f]/20 bg-gradient-to-br from-green-950/40 to-green-950/30 p-7">
              <p className="text-xs text-lime-400 font-mono uppercase tracking-widest mb-4">Quick Tips</p>
              <div className="space-y-3">
                {[
                  { icon: "🔐", tip: "Use a strong unique password — at least 12 characters with symbols" },
                  { icon: "📄", tip: "Have your ID document ready before starting KYC — it takes under 5 minutes" },
                  { icon: "⚡", tip: "Card and crypto deposits are instant; bank transfers may take 1–2 days" },
                  { icon: "🛡️", tip: "Enable 2FA immediately after account creation for maximum security" },
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-base flex-shrink-0">{t.icon}</span>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{t.tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </GuideSection>

      {/* ── Dashboard ────────────────────────────────────────────── */}
      <GuideSection id="dash" icon="📊" title="Navigating the Dashboard" accent="indigo">
        <Reveal>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-2xl">
            Your dashboard is the central hub for all your trading activity.
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: "💼", label: "Portfolio Overview", desc: "See your total balance, profit/loss, and active copy trades at a glance", color: "sky" },
            { icon: "🏆", label: "Leader Board", desc: "Browse and discover top-performing traders to copy, filtered by performance metrics", color: "yellow" },
            { icon: "⚡", label: "Active Trades", desc: "Monitor all currently open positions across all your copied leaders in real time", color: "emerald" },
            { icon: "📋", label: "Trade History", desc: "Review past trades including closed positions and their final outcomes", color: "violet" },
            { icon: "⚙️", label: "Settings", desc: "Manage your account, security preferences, notification settings, and AutoGuard™ config", color: "indigo" },
          ].map((item, i) => {
            const clrs: Record<string, string> = {
              sky:    "border-[#5edc1f]/20 bg-[#5edc1f]/5 text-lime-400",
              yellow: "border-yellow-500/20 bg-yellow-500/5 text-yellow-400",
              emerald:"border-emerald-500/20 bg-emerald-500/5 text-emerald-400",
              violet: "border-[#5edc1f]/20 bg-[#5edc1f]/10 text-lime-400",
              indigo: "border-[#5edc1f]/20 bg-[#5edc1f]/5 text-lime-400",
            };
            return (
              <Reveal key={i} delay={i * 0.08}>
                <div className={`p-5 rounded-2xl border hover:scale-[1.02] transition-all ${clrs[item.color]}`}>
                  <span className="text-2xl block mb-3">{item.icon}</span>
                  <p className="text-sm font-bold text-gray-900 dark:text-white mb-1.5">{item.label}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </GuideSection>

      {/* ── Finding Traders ──────────────────────────────────────── */}
      <GuideSection id="find" icon="🔍" title="Finding Traders to Copy" accent="violet">
        <Reveal>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-2xl">
            KoveTrade provides powerful tools to help you find the right traders to copy.
          </p>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <CheckItem text="Filter by performance — sort leaders by return, win rate, drawdown, and risk score" delay={0.05} color="indigo" />
            <CheckItem text="Review trading history — examine a leader's past trades and performance charts in detail" delay={0.1} color="indigo" />
            <CheckItem text="Check the risk score — AutoGuard™ assigns ratings to help you choose appropriate leaders" delay={0.15} color="indigo" />
            <CheckItem text="Read profiles — understand each leader's strategy, preferred instruments, and trading style" delay={0.2} color="indigo" />
          </div>
          <Reveal delay={0.15} dir="right">
            <div className="rounded-2xl border border-[#5edc1f]/20 bg-[#5edc1f]/5 p-6">
              <p className="text-xs text-lime-400 font-mono uppercase tracking-widest mb-4">Key Metrics to Compare</p>
              <div className="space-y-2.5">
                {[
                  { label: "Total Return",   value: "+212%",  bar: 80,  c: "bg-emerald-500" },
                  { label: "Win Rate",       value: "74.2%",  bar: 74,  c: "bg-[#5edc1f]" },
                  { label: "Max Drawdown",   value: "-8.4%",  bar: 15,  c: "bg-rose-500" },
                  { label: "Risk Score",     value: "Low",    bar: 25,  c: "bg-[#5edc1f]" },
                ].map((m, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">{m.label}</span>
                      <span className="text-white font-semibold">{m.value}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-white/8">
                      <motion.div
                        className={`h-full rounded-full ${m.c}`}
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${m.bar}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: E }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </GuideSection>

      {/* ── Copy Trading Setup ───────────────────────────────────── */}
      <GuideSection id="copy" icon="📋" title="Setting Up Copy Trading" accent="cyan">
        <Reveal>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
            Once you have found a leader you want to copy, here is how to set it up in four simple steps.
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { num: "1", icon: "👆", label: 'Click "Copy"', desc: "Hit the Copy button on the leader's profile page to begin the setup flow" },
            { num: "2", icon: "💵", label: "Set Allocation", desc: "Choose the amount of capital you want to allocate to copying this leader" },
            { num: "3", icon: "🛡️", label: "Configure AutoGuard™", desc: "Set your stop-loss, max drawdown threshold, and position sizing preferences" },
            { num: "4", icon: "✅", label: "Confirm & Go", desc: "Confirm your settings — all future trades by this leader will replicate in your account" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="relative rounded-2xl border border-[#5edc1f]/15 bg-[#5edc1f]/5 p-5 hover:border-[#5edc1f]/30 hover:bg-[#5edc1f]/10 transition-all">
                {i < 3 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full border border-[#5edc1f]/30 bg-[#060b14] items-center justify-center">
                    <svg className="w-3 h-3 text-[#5edc1f]" fill="none" viewBox="0 0 12 12">
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-black bg-gradient-to-b from-lime-400 to-emerald-400 bg-clip-text text-transparent">{s.num}</span>
                  <span className="text-xl">{s.icon}</span>
                </div>
                <p className="text-sm font-bold text-gray-900 dark:text-white mb-1.5">{s.label}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </GuideSection>

      {/* ── Manage Portfolio ─────────────────────────────────────── */}
      <GuideSection id="manage" icon="💼" title="Managing Your Portfolio" accent="emerald">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            {[
              { icon: "📊", text: "Monitor overall performance from your dashboard in real time" },
              { icon: "⚖️", text: "Adjust allocation amounts for individual leaders at any time" },
              { icon: "⏸️", text: "Pause or stop copying a leader without affecting open positions" },
              { icon: "🌐", text: "Diversify by copying multiple leaders with different strategies" },
              { icon: "✋", text: "Close individual copied trades manually if needed at any time" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="flex items-start gap-3 p-3.5 rounded-xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/[0.02] hover:border-emerald-500/20 hover:bg-emerald-500/5 transition-all">
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} dir="right">
            <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/40 to-teal-950/20 p-7">
              <p className="text-sm font-bold text-gray-900 dark:text-white mb-5">Sample Diversified Portfolio</p>
              <div className="space-y-3">
                {[
                  { leader: "AlphaWave",   alloc: 40, ret: "+28.4%", risk: "Low",    color: "bg-emerald-500" },
                  { leader: "FX_Titan",    alloc: 30, ret: "+51.2%", risk: "Med",    color: "bg-[#5edc1f]" },
                  { leader: "OptionsEdge", alloc: 20, ret: "+19.7%", risk: "Low",    color: "bg-[#5edc1f]" },
                  { leader: "SwingMaster", alloc: 10, ret: "+8.1%",  risk: "Low",    color: "bg-amber-500" },
                ].map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white font-medium">{p.leader}</span>
                      <div className="flex gap-2 items-center">
                        <span className="text-emerald-400 font-bold">{p.ret}</span>
                        <span className="text-gray-600">{p.alloc}%</span>
                      </div>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-white/8">
                      <motion.div
                        className={`h-full rounded-full ${p.color}`}
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${p.alloc}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: E }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </GuideSection>

      {/* ── Deposits & Withdrawals ───────────────────────────────── */}
      <GuideSection id="funds" icon="💳" title="Deposits and Withdrawals" accent="blue">
        <Reveal>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-2xl">
            KoveTrade supports multiple funding methods for your convenience.
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { icon: "🏦", label: "Bank Transfer",    desc: "Wire transfer — 1–2 business days", speed: "Standard" },
            { icon: "💳", label: "Credit/Debit Card", desc: "Visa & Mastercard — instant", speed: "Instant" },
            { icon: "₿",  label: "Cryptocurrency",   desc: "BTC, ETH, USDT & more", speed: "Fast" },
            { icon: "📱", label: "E-Wallets",         desc: "Popular e-wallet services", speed: "Instant" },
          ].map((m, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="rounded-2xl border border-[#5edc1f]/15 bg-[#5edc1f]/5 p-5 hover:border-[#5edc1f]/30 transition-all">
                <span className="text-2xl block mb-3">{m.icon}</span>
                <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">{m.label}</p>
                <p className="text-xs text-gray-500 mb-2">{m.desc}</p>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#5edc1f]/15 text-lime-400 border border-[#5edc1f]/25">{m.speed}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="p-4 rounded-2xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/[0.025] flex flex-wrap gap-6">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Deposit Processing</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Typically instant</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Withdrawal Processing</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">1–5 business days (by method)</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Minimum Deposit</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">See current program terms</p>
            </div>
          </div>
        </Reveal>
      </GuideSection>

      {/* ── Security ─────────────────────────────────────────────── */}
      <GuideSection id="security" icon="🔐" title="Account Security" accent="violet">
        <Reveal>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-2xl">
            Protecting your account is our top priority. Here are our security features and recommendations.
          </p>
        </Reveal>
        <div className="space-y-3 max-w-2xl">
          <CheckItem text="Enable two-factor authentication (2FA) for an extra layer of security" delay={0.05} color="violet" />
          <CheckItem text="Use a strong, unique password that you do not reuse on any other site" delay={0.1} color="violet" />
          <CheckItem text="Review your login history regularly for any unfamiliar or suspicious activity" delay={0.15} color="violet" />
          <CheckItem text="Never share your login credentials or 2FA codes with anyone — KoveTrade staff will never ask" delay={0.2} color="violet" />
        </div>
      </GuideSection>

      {/* ── Help ─────────────────────────────────────────────────── */}
      <GuideSection id="help" icon="🙋" title="Getting Help" accent="sky">
        <Reveal>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-2xl">
            If you need assistance at any point, KoveTrade offers multiple support channels.
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: "💬", label: "Live Chat",      desc: "Available 24/7 from your dashboard — fastest response", cta: "Open chat",    href: "#" },
            { icon: "📧", label: "Email Support",  desc: "Reach us at support@kovetrade.com for detailed queries", cta: "Send email",   href: "mailto:support@kovetrade.com" },
            { icon: "📚", label: "Help Center",    desc: "Browse our comprehensive FAQ and knowledge base articles", cta: "Browse FAQ",  href: "#" },
            { icon: "🌐", label: "Community",      desc: "Join our trading community for peer support and strategy discussions", cta: "Join now", href: "#" },
          ].map((ch, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="rounded-2xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/[0.025] p-5 hover:border-[#5edc1f]/20 hover:bg-[#5edc1f]/5 transition-all flex flex-col">
                <span className="text-2xl mb-3">{ch.icon}</span>
                <p className="text-sm font-bold text-gray-900 dark:text-white mb-1.5">{ch.label}</p>
                <p className="text-xs text-gray-500 leading-relaxed flex-1 mb-4">{ch.desc}</p>
                <a href={ch.href} className="text-xs text-lime-400 font-semibold hover:text-lime-300 transition-colors">
                  {ch.cta} →
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </GuideSection>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-16 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden border border-[#5edc1f]/20">
              <div className="absolute inset-0 bg-gradient-to-br from-green-950/70 via-green-950/50 to-green-950/40" />
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#5edc1f]/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#5edc1f]/10 blur-3xl" />

              {/* Animated dots */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[15, 40, 65, 85].map((left, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-lime-400/50"
                    style={{ left: `${left}%`, top: "20%" }}
                    animate={{ y: [0, -40, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 3.5 + i * 0.5, delay: i * 0.9 }}
                  />
                ))}
              </div>

              <div className="relative p-10 text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#5edc1f]/15 border border-[#5edc1f]/30 flex items-center justify-center mx-auto mb-5 text-2xl">
                  🚀
                </div>

                <h2 className="text-2xl md:text-4xl font-bold mb-3">
                  Ready to Start{" "}
                  <span className="bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">
                    Copy Trading?
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
                  Create your KoveTrade account today and start copying top-performing traders. It
                  only takes a few minutes to get started.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#5edc1f] to-green-700 text-white font-bold text-sm hover:from-lime-400 hover:to-green-600 transition-all shadow-lg shadow-green-900/30"
                  >
                    Get Started →
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-gray-300 dark:border-white/15 text-gray-900 dark:text-white font-semibold text-sm hover:bg-gray-100 dark:bg-white/8 transition-all"
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
