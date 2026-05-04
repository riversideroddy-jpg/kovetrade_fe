"use client";

import React, { useRef, useEffect, useState } from "react";
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
    dir === "left" ? { opacity: 0, x: -32, y: 0 }
    : dir === "right" ? { opacity: 0, x: 32, y: 0 }
    : dir === "none" ? { opacity: 0, y: 0 }
    : { opacity: 0, y: 36, x: 0 };
  const to = { opacity: 1, x: 0, y: 0 };
  return (
    <motion.div
      ref={ref}
      initial={from}
      animate={inView ? to : from}
      transition={{ duration: 0.75, delay, ease: E }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated Shield ─────────────────────────────────────────────
function ShieldHero() {
  const [scanY, setScanY] = useState(20);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setActive(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setScanY((y) => (y >= 150 ? 20 : y + 1.5));
    }, 16);
    return () => clearInterval(id);
  }, [active]);

  return (
    <div className="relative flex items-center justify-center">
      {/* Glow behind shield */}
      <div className="absolute w-72 h-72 rounded-full bg-lime-400/10 blur-3xl" />
      <div className="absolute w-48 h-48 rounded-full bg-[#4cc015]/15 blur-2xl" />

      <svg viewBox="0 0 240 270" className="relative w-64 h-72 md:w-80 md:h-96" fill="none">
        {/* Pulse rings */}
        {[1, 2, 3].map((i) => (
          <motion.ellipse
            key={i}
            cx="120" cy="135" rx={70 + i * 22} ry={80 + i * 25}
            stroke={`rgba(52,211,153,${0.12 - i * 0.03})`}
            strokeWidth="1"
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.97, 1.03, 0.97] }}
            transition={{ repeat: Infinity, duration: 3 + i, delay: i * 0.6, ease: "easeInOut" }}
            style={{ transformOrigin: "120px 135px" }}
          />
        ))}

        {/* Shield outer glow path */}
        <motion.path
          d="M120 18 L200 52 L200 130 Q200 198 120 235 Q40 198 40 130 L40 52 Z"
          fill="rgba(10,24,12,0.85)"
          stroke="rgba(52,211,153,0.4)"
          strokeWidth="1.5"
          filter="url(#shieldGlow)"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: E }}
          style={{ transformOrigin: "120px 130px" }}
        />

        {/* Shield inner gradient fill */}
        <motion.path
          d="M120 28 L193 58 L193 130 Q193 192 120 226 Q47 192 47 130 L47 58 Z"
          fill="url(#shieldFill)"
          stroke="rgba(52,211,153,0.25)"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        />

        {/* Scanning line */}
        <AnimatePresence>
          {active && (
            <motion.line
              x1="60" y1={scanY + 20}
              x2="180" y2={scanY + 20}
              stroke="rgba(52,211,153,0.55)"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.9, 0.3] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              clipPath="url(#shieldClip)"
            />
          )}
        </AnimatePresence>

        {/* Grid lines inside shield */}
        {[60, 80, 100, 120, 140, 160].map((y, i) => (
          <line
            key={i} x1="55" y1={y} x2="185" y2={y}
            stroke="rgba(52,211,153,0.06)" strokeWidth="0.8"
            clipPath="url(#shieldClip)"
          />
        ))}
        {[70, 90, 110, 130, 150, 170].map((x, i) => (
          <line
            key={i} x1={x} y1="35" x2={x} y2="215"
            stroke="rgba(52,211,153,0.06)" strokeWidth="0.8"
            clipPath="url(#shieldClip)"
          />
        ))}

        {/* Lock icon */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.6, ease: E }}
          style={{ transformOrigin: "120px 128px" }}
        >
          {/* Lock body */}
          <rect x="100" y="118" width="40" height="32" rx="6" fill="rgba(52,211,153,0.15)" stroke="rgba(52,211,153,0.7)" strokeWidth="2" />
          {/* Lock shackle */}
          <path d="M109 118 L109 110 Q109 100 120 100 Q131 100 131 110 L131 118" stroke="rgba(52,211,153,0.7)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          {/* Keyhole */}
          <circle cx="120" cy="132" r="5" fill="rgba(52,211,153,0.5)" />
          <rect x="118" y="133" width="4" height="8" rx="2" fill="rgba(52,211,153,0.5)" />
        </motion.g>

        {/* TM badge */}
        <motion.g
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <rect x="155" y="45" width="38" height="18" rx="9" fill="rgba(52,211,153,0.15)" stroke="rgba(52,211,153,0.4)" strokeWidth="1" />
          <text x="174" y="57.5" fill="rgba(52,211,153,0.9)" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="monospace">TM</text>
        </motion.g>

        {/* Status dot */}
        <motion.circle
          cx="120" cy="195"
          r="5"
          fill="rgba(52,211,153,0.9)"
          animate={{ opacity: [0.5, 1, 0.5], r: [4, 6, 4] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        />
        <text x="120" y="213" fill="rgba(52,211,153,0.6)" fontSize="7.5" textAnchor="middle" fontFamily="monospace">ACTIVE</text>

        <defs>
          <radialGradient id="shieldFill" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="rgba(10,28,14,0.9)" />
            <stop offset="100%" stopColor="rgba(6,16,8,0.95)" />
          </radialGradient>
          <filter id="shieldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <clipPath id="shieldClip">
            <path d="M120 28 L193 58 L193 130 Q193 192 120 226 Q47 192 47 130 L47 58 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Floating stat chips */}
      {[
        { label: "24/7 Monitoring", icon: "👁️", pos: "top-4 -left-2 md:-left-10" },
        { label: "Auto-Protect", icon: "🛡️", pos: "top-1/2 -right-2 md:-right-12" },
        { label: "EU Compliant", icon: "🇪🇺", pos: "bottom-8 -left-2 md:-left-14" },
      ].map((chip, i) => (
        <motion.div
          key={i}
          className={`absolute ${chip.pos} flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-lime-400/30 bg-[#030d0a]/90 backdrop-blur-sm text-xs text-lime-300 whitespace-nowrap`}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
          transition={{
            opacity: { delay: 1.2 + i * 0.15, duration: 0.5 },
            scale: { delay: 1.2 + i * 0.15, duration: 0.5 },
            y: { delay: 1.5 + i * 0.2, duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <span>{chip.icon}</span>
          <span className="font-medium">{chip.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Stat counter ─────────────────────────────────────────────────
function StatPill({
  value,
  label,
  delay = 0,
}: {
  value: string;
  label: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="flex flex-col items-center text-center p-4 rounded-2xl border border-lime-400/15 bg-lime-400/5 hover:border-lime-400/30 hover:bg-lime-400/10 transition-all">
        <p className="text-2xl font-bold bg-gradient-to-r from-lime-300 to-lime-400 bg-clip-text text-transparent">
          {value}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">{label}</p>
      </div>
    </Reveal>
  );
}

// ─── How-it-works step ───────────────────────────────────────────
function Step({
  num,
  icon,
  title,
  body,
  accent,
  delay = 0,
  last = false,
}: {
  num: number;
  icon: string;
  title: string;
  body: string;
  accent: string;
  delay?: number;
  last?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  const colors: Record<string, { ring: string; bg: string; text: string; connector: string }> = {
    cyan:    { ring: "border-lime-400/40",    bg: "bg-lime-400/10",    text: "text-lime-300",    connector: "bg-lime-400/20" },
    blue:    { ring: "border-[#5edc1f]/40",    bg: "bg-[#5edc1f]/10",    text: "text-lime-400",    connector: "bg-[#5edc1f]/20" },
    violet:  { ring: "border-[#5edc1f]/40",  bg: "bg-[#5edc1f]/10",  text: "text-lime-400",  connector: "bg-[#5edc1f]/20" },
    emerald: { ring: "border-emerald-500/40", bg: "bg-emerald-500/10", text: "text-emerald-400", connector: "bg-emerald-500/20" },
  };
  const c = colors[accent] ?? colors.cyan;

  return (
    <div ref={ref} className="flex gap-5">
      {/* Spine */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          className={`w-12 h-12 rounded-2xl border-2 ${c.ring} ${c.bg} flex items-center justify-center text-xl`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.5, delay, ease: E }}
        >
          {icon}
        </motion.div>
        {!last && (
          <motion.div
            className={`w-0.5 flex-1 mt-2 rounded-full ${c.connector} min-h-[32px]`}
            initial={{ scaleY: 0, transformOrigin: "top" }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.5, delay: delay + 0.2, ease: E }}
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        className="pb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.6, delay: delay + 0.1, ease: E }}
      >
        <div className={`text-xs font-bold font-mono ${c.text} mb-1`}>Step {num}</div>
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1.5">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">{body}</p>
      </motion.div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────
export default function AutoGuardPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#030d0a] text-gray-900 dark:text-white">
      <style>{`
        @keyframes ag-pulse { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:0.8;transform:scale(1.04)} }
        @keyframes ag-scan  { 0%{transform:translateY(-10px);opacity:0} 50%{opacity:1} 100%{transform:translateY(200px);opacity:0} }
        .ag-pulse { animation: ag-pulse 4s ease-in-out infinite }
      `}</style>

      {/* Aurora */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none hidden dark:block">
        <div className="ag-pulse absolute top-[-15%] left-[-5%] w-[60vw] h-[60vw] rounded-full bg-green-800/12 blur-[130px]" />
        <div className="ag-pulse absolute bottom-[-10%] right-[-5%] w-[55vw] h-[55vw] rounded-full bg-green-900/10 blur-[120px]" style={{ animationDelay: "2s" }} />
        <div className="ag-pulse absolute top-[40%] left-[25%] w-[40vw] h-[40vw] rounded-full bg-green-900/8 blur-[140px]" style={{ animationDelay: "1s" }} />
      </div>

      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative pt-28 pb-24 px-4 overflow-hidden">
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035] hidden dark:block"
          style={{
            backgroundImage: "linear-gradient(rgba(52,211,153,1) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left */}
            <motion.div style={{ y: heroY }}>
              <Reveal delay={0.05}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-lime-400/35 bg-lime-400/10 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-300 animate-pulse" />
                  <span className="text-xs text-lime-300 font-medium tracking-wide">Account Protection Feature</span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-2">
                  Auto
                  <span className="bg-gradient-to-r from-lime-300 via-lime-400 to-lime-300 bg-clip-text text-transparent">
                    protect
                  </span>
                </h1>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 text-gray-800 dark:text-white/90">
                  your account.
                </h1>
              </Reveal>

              <Reveal delay={0.18}>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8 max-w-md">
                  AutoGuard™ monitors every trade in real time and automatically steps in the
                  moment your capital protection threshold is reached — so you never have to.
                </p>
              </Reveal>

              <Reveal delay={0.26}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-lime-400 to-[#4cc015] text-white font-semibold text-sm hover:from-lime-300 hover:to-[#5edc1f] transition-all shadow-lg shadow-green-900/30"
                  >
                    Create account
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <a
                    href="#how-it-works"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-gray-200 dark:border-white/12 text-gray-700 dark:text-white/80 font-semibold text-sm hover:bg-white/6 hover:text-white transition-all"
                  >
                    See how it works ↓
                  </a>
                </div>
              </Reveal>

              {/* Stats row */}
              <Reveal delay={0.35}>
                <div className="grid grid-cols-3 gap-3 mt-10">
                  {[
                    { v: "24/7", l: "Monitoring" },
                    { v: "Auto", l: "Risk Exit" },
                    { v: "EU", l: "Mandatory" },
                  ].map((s, i) => (
                    <div key={i} className="text-center p-3 rounded-xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/[0.025]">
                      <p className="text-lg font-bold bg-gradient-to-r from-lime-300 to-lime-400 bg-clip-text text-transparent">{s.v}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">{s.l}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </motion.div>

            {/* Right — animated shield */}
            <Reveal delay={0.2} dir="right">
              <div className="flex justify-center">
                <ShieldHero />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Meet AutoGuard ───────────────────────────────────────── */}
      <section className="py-20 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-xs text-lime-300 font-mono uppercase tracking-widest mb-3">AutoGuard™</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Meet{" "}
                <span className="bg-gradient-to-r from-lime-300 to-lime-400 bg-clip-text text-transparent">
                  AutoGuard™
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                AutoGuard™ is an account protection feature that monitors each Trader's behavior
                and automatically removes a Trader when detecting a trading strategy has deviated
                from its expected loss profile.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1 — description */}
            <Reveal delay={0.1} dir="left">
              <div className="h-full rounded-3xl border border-lime-400/20 bg-gradient-to-br from-green-950/40 to-green-950/30 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-lime-400/8 blur-3xl pointer-events-none" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-lime-400/15 border border-lime-400/30 flex items-center justify-center text-2xl mb-5">🛡️</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Capital Protection Shield</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    AutoGuard™ Capital Protection is available for all investors, and it's mandatory
                    for users residing in the EU using the EU SignalSync platform. It creates a
                    protection shield for your investment capital.
                  </p>
                  <div className="mt-6 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#5edc1f]/20 bg-[#5edc1f]/8 w-fit">
                    <span className="text-lime-400 text-sm">🇪🇺</span>
                    <span className="text-xs text-green-300 font-medium">EU SignalSync — Mandatory</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Card 2 — features grid */}
            <Reveal delay={0.2} dir="right">
              <div className="h-full rounded-3xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/[0.025] p-8">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-5">What AutoGuard™ covers</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: "📊", label: "Behavior Monitoring", desc: "Tracks every open trade in real time" },
                    { icon: "🎯", label: "Loss Profile Check", desc: "Detects strategy deviation instantly" },
                    { icon: "⚡", label: "Instant Exit", desc: "Stops all trading at threshold hit" },
                    { icon: "🔒", label: "Leader Disable", desc: "Disconnects leader immediately" },
                    { icon: "📈", label: "All Account Types", desc: "Available for every investor tier" },
                    { icon: "🌍", label: "Global Coverage", desc: "Operates across all regions" },
                  ].map((f, i) => (
                    <Reveal key={i} delay={0.25 + i * 0.06}>
                      <div className="p-3 rounded-2xl border border-gray-200 dark:border-white/6 bg-gray-50 dark:bg-white/[0.02] hover:border-lime-400/25 hover:bg-lime-400/5 transition-all">
                        <span className="text-lg mb-1.5 block">{f.icon}</span>
                        <p className="text-xs font-semibold text-gray-900 dark:text-white mb-0.5">{f.label}</p>
                        <p className="text-[10px] text-gray-500 leading-relaxed">{f.desc}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── How does it work ─────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-xs text-lime-300 font-mono uppercase tracking-widest mb-3">Process</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How does it{" "}
                <span className="bg-gradient-to-r from-lime-300 to-lime-400 bg-clip-text text-transparent">
                  work?
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
                AutoGuard™ automatically calculates a trading exit value for trades opened in your
                account based on your specified capital protection amount.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Steps */}
            <div className="space-y-0">
              <Step
                num={1} icon="⚙️" accent="cyan" delay={0.05}
                title="You set your capital protection amount"
                body="Configure your threshold — the maximum drawdown you are willing to accept before AutoGuard™ intervenes on your behalf."
              />
              <Step
                num={2} icon="👁️" accent="blue" delay={0.15}
                title="AutoGuard™ monitors all open positions"
                body="Every trade in your account is tracked continuously. AutoGuard™ calculates the exit value in real time based on your protection settings."
              />
              <Step
                num={3} icon="📉" accent="violet" delay={0.25}
                title="Threshold detected"
                body="The moment your account equity hits the calculated exit value, AutoGuard™ triggers automatically — no manual action required."
              />
              <Step
                num={4} icon="🔐" accent="emerald" delay={0.35}
                title="Trading stopped & leader disabled"
                body="All open positions are closed and the copy-trading leader is instantly disconnected, locking in your remaining capital."
                last
              />
            </div>

            {/* Visual panel */}
            <Reveal delay={0.2} dir="right">
              <div className="sticky top-24">
                {/* Terminal mockup */}
                <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-[#060f0a] overflow-hidden shadow-2xl shadow-green-900/20">
                  {/* Bar */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 dark:border-white/6 bg-[#04090f]">
                    <span className="w-3 h-3 rounded-full bg-rose-500/60" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/60" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
                    <span className="ml-3 text-xs text-gray-500 font-mono">autoguard — monitor</span>
                  </div>

                  <div className="p-5 font-mono text-xs space-y-2.5">
                    {[
                      { label: "Account Balance", value: "$10,000.00", color: "text-emerald-400" },
                      { label: "Protection Threshold", value: "$8,500.00 (15%)", color: "text-lime-300" },
                      { label: "Current Equity", value: "$8,512.44", color: "text-lime-400" },
                      { label: "Status", value: "MONITORING", color: "text-lime-300 animate-pulse" },
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between items-center py-1.5 border-b border-white/4">
                        <span className="text-gray-500">{row.label}</span>
                        <span className={`font-bold ${row.color}`}>{row.value}</span>
                      </div>
                    ))}

                    <div className="pt-2">
                      <div className="text-gray-600 mb-1.5">Drawdown progress</div>
                      <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-white/8 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500"
                          initial={{ width: "0%" }}
                          animate={{ width: "82%" }}
                          transition={{ delay: 1, duration: 1.5, ease: E }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                        <span>0%</span>
                        <span className="text-amber-400">82% to threshold</span>
                        <span>100%</span>
                      </div>
                    </div>

                    {/* Log */}
                    <div className="pt-2 space-y-1">
                      {[
                        { t: "09:14:03", msg: "Monitoring active — 3 open positions", c: "text-gray-500" },
                        { t: "09:18:41", msg: "Equity drop detected — recalculating", c: "text-amber-400" },
                        { t: "09:19:00", msg: "Threshold not yet reached — continue", c: "text-gray-500" },
                      ].map((log, i) => (
                        <motion.div
                          key={i}
                          className={`flex gap-2 ${log.c}`}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.5 + i * 0.3 }}
                        >
                          <span className="text-gray-600">[{log.t}]</span>
                          <span>{log.msg}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Guide link */}
                <Reveal delay={0.4}>
                  <div className="mt-4 p-4 rounded-2xl border border-[#5edc1f]/20 bg-[#5edc1f]/5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">AutoGuard Guide</p>
                      <p className="text-xs text-gray-500">Detailed documentation & settings</p>
                    </div>
                    <Link href="/autoguard/guide" className="text-xs px-4 py-2 rounded-xl border border-lime-400/30 bg-lime-400/10 text-lime-300 hover:bg-lime-400/20 transition-all font-medium">
                      Read guide →
                    </Link>
                  </div>
                </Reveal>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Bottom 3 CTA cards ───────────────────────────────────── */}
      <section className="py-20 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-5">

            {/* Card 1 — Invest Smarter */}
            <Reveal delay={0.05}>
              <div className="relative h-full rounded-3xl overflow-hidden border border-lime-400/25 group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-950/70 via-green-950/50 to-green-950/50" />
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-lime-400/12 blur-3xl group-hover:bg-lime-400/20 transition-all duration-500" />
                <div className="relative p-7 flex flex-col h-full min-h-[260px]">
                  <div className="text-3xl mb-4">🚀</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Ready to Invest Smarter?</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1">
                    Create your account and unlock options-focused copy trading with AutoGuard™
                    protection built in from day one.
                  </p>
                  <Link
                    href="/register"
                    className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-lime-400 to-[#4cc015] text-white font-semibold text-sm hover:from-lime-300 hover:to-[#5edc1f] transition-all w-fit"
                  >
                    Create your account
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 14 14">
                      <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Card 2 — Find Your Match */}
            <Reveal delay={0.15}>
              <div className="relative h-full rounded-3xl overflow-hidden border border-[#5edc1f]/20 group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-950/60 via-green-950/40 to-emerald-950/40" />
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[#5edc1f]/10 blur-3xl group-hover:bg-[#5edc1f]/10 transition-all duration-500" />
                <div className="relative p-7 flex flex-col h-full min-h-[260px]">
                  <div className="text-3xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Find Your Match</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1">
                    Explore leaders known for success in options — contracts, spreads, tickers —
                    you name it. Our curated marketplace has a leader for every style.
                  </p>
                  <Link
                    href="/leaders"
                    className="mt-6 inline-flex items-center gap-2 text-sm text-lime-300 font-semibold hover:text-lime-200 transition-colors"
                  >
                    Explore leaders
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 14 14">
                      <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Card 3 — Copy and Grow */}
            <Reveal delay={0.25}>
              <div className="relative h-full rounded-3xl overflow-hidden border border-emerald-500/20 group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/60 via-teal-950/40 to-green-950/40" />
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-emerald-500/10 blur-3xl group-hover:bg-emerald-500/18 transition-all duration-500" />
                <div className="relative p-7 flex flex-col h-full min-h-[260px]">
                  <div className="text-3xl mb-4">📈</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Copy and Grow</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1">
                    Replicate trades, refine strategies, and learn — all while staying in control.
                    AutoGuard™ keeps your capital safe every step of the way.
                  </p>
                  <Link
                    href="/register"
                    className="mt-6 inline-flex items-center gap-2 text-sm text-emerald-300 font-semibold hover:text-emerald-200 transition-colors"
                  >
                    Get started now
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 14 14">
                      <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
