"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
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
    dir === "left"  ? { opacity: 0, x: -36, y: 0 }
    : dir === "right" ? { opacity: 0, x: 36, y: 0 }
    : dir === "none"  ? { opacity: 0 }
    : { opacity: 0, y: 40 };
  return (
    <motion.div
      ref={ref}
      initial={from}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : from}
      transition={{ duration: 0.78, delay, ease: E }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated Leader Badge SVG ────────────────────────────────────
function LeaderBadge() {
  return (
    <motion.div
      className="select-none flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: E }}
    >
      <svg viewBox="0 0 260 260" className="w-64 h-64 md:w-72 md:h-72" fill="none">
        {/* Outer orbit */}
        <motion.circle cx="130" cy="130" r="118"
          stroke="rgba(249,115,22,0.12)" strokeWidth="1" strokeDasharray="6 8"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
          style={{ transformOrigin: "130px 130px" }}
        />
        {/* Middle ring */}
        <motion.circle cx="130" cy="130" r="95"
          stroke="rgba(249,115,22,0.18)" strokeWidth="1.5" strokeDasharray="3 5"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
          style={{ transformOrigin: "130px 130px" }}
        />
        {/* Inner glow disc */}
        <circle cx="130" cy="130" r="72" fill="rgba(249,115,22,0.06)" stroke="rgba(249,115,22,0.2)" strokeWidth="1.5" />

        {/* Upward arrow / podium shape */}
        <motion.path
          d="M130 58 L155 96 L143 96 L143 148 L117 148 L117 96 L105 96 Z"
          fill="url(#leaderGrad)"
          stroke="rgba(249,115,22,0.7)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          initial={{ opacity: 0, y: 16, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: E }}
          style={{ transformOrigin: "130px 103px" }}
        />

        {/* Podium base */}
        <motion.rect x="88" y="148" width="84" height="14" rx="4"
          fill="rgba(249,115,22,0.15)" stroke="rgba(249,115,22,0.45)" strokeWidth="1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        />
        <motion.rect x="100" y="162" width="60" height="10" rx="3"
          fill="rgba(249,115,22,0.08)" stroke="rgba(249,115,22,0.25)" strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        />

        {/* Crown on top of arrow */}
        <motion.g
          animate={{ y: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
        >
          <path d="M115 72 L118 60 L130 70 L142 60 L145 72 Z"
            fill="rgba(249,115,22,0.5)" stroke="rgba(249,115,22,0.9)" strokeWidth="1.5" strokeLinejoin="round"
          />
          <circle cx="118" cy="60" r="3.5" fill="rgba(249,115,22,0.9)" />
          <circle cx="130" cy="55" r="4"   fill="rgba(249,115,22,0.9)" />
          <circle cx="142" cy="60" r="3.5" fill="rgba(249,115,22,0.9)" />
        </motion.g>

        {/* Orbiting user dots */}
        {[0, 72, 144, 216, 288].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const cx = 130 + 95 * Math.cos(rad);
          const cy = 130 + 95 * Math.sin(rad);
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="5"
              fill="rgba(249,115,22,0.55)"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.5, ease: "easeInOut" }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />
          );
        })}

        {/* 30% commission badge */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5, ease: E }}
          style={{ transformOrigin: "195px 195px" }}
        >
          <circle cx="195" cy="195" r="28" fill="rgba(10,8,4,0.95)" stroke="rgba(249,115,22,0.55)" strokeWidth="2" />
          <text x="195" y="193" fill="rgba(249,115,22,0.95)" fontSize="12" fontWeight="900" textAnchor="middle" fontFamily="monospace">30%</text>
          <text x="195" y="205" fill="rgba(249,115,22,0.6)" fontSize="6.5" textAnchor="middle" fontFamily="sans-serif">commission</text>
        </motion.g>

        {/* Sparkles */}
        {[{ x: 50, y: 65 }, { x: 210, y: 60 }, { x: 45, y: 200 }].map((s, i) => (
          <motion.text key={i} x={s.x} y={s.y} fill="rgba(249,115,22,0.5)"
            fontSize="11" textAnchor="middle"
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
            transition={{ repeat: Infinity, duration: 2.5 + i * 0.4, delay: i * 0.6 }}
            style={{ transformOrigin: `${s.x}px ${s.y}px` }}
          >✦</motion.text>
        ))}

        <defs>
          <linearGradient id="leaderGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(249,115,22,0.4)" />
            <stop offset="100%" stopColor="rgba(249,115,22,0.1)" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

// ─── What does a leader do — tabs ────────────────────────────────
const LEADER_TABS = [
  {
    id: "research", label: "Research",
    icon: "🔭",
    heading: "Oversee markets. Stay ahead.",
    body: "Leaders are always researching their preferred products, historical performance, and news daily. They need to understand the risks and investment required before moving forward with any action.",
    bullets: [
      "Monitor markets and instruments daily",
      "Research news, updates, and economic events",
      "Analyse historical performance and risk profiles",
    ],
  },
  {
    id: "interact", label: "Interact",
    icon: "💬",
    heading: "Engage your community.",
    body: "Successful leaders communicate openly with their followers — explaining their rationale, sharing market insights, and building trust through consistent dialogue and transparency.",
    bullets: [
      "Post market commentary and trade reasoning",
      "Respond to follower questions and feedback",
      "Build a loyal, engaged trading community",
    ],
  },
  {
    id: "broadcast", label: "Broadcast",
    icon: "📡",
    heading: "Share signals. Grow together.",
    body: "Every trade you execute is broadcast in real time to your followers. Your signals power their portfolios, and their success translates directly into your commission earnings.",
    bullets: [
      "Trades replicated instantly across follower accounts",
      "Real-time signal broadcasting with full transparency",
      "Earn 30% commission on every successful trade",
    ],
  },
];

function WhatLeadersDo() {
  const [active, setActive] = useState("research");
  const tab = LEADER_TABS.find((t) => t.id === active)!;

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex gap-2 mb-8 p-1.5 rounded-2xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/[0.025] w-fit">
        {LEADER_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              active === t.id
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-lg shadow-orange-900/30"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: E }}
          className="rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-950/40 to-amber-950/20 p-8"
        >
          <div className="flex items-start gap-4 mb-5">
            <span className="text-4xl">{tab.icon}</span>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{tab.heading}</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">{tab.body}</p>
          <div className="space-y-2.5">
            {tab.bullets.map((b, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <span className="w-5 h-5 rounded-full bg-orange-500/20 border border-orange-400/40 flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-orange-400" fill="none" viewBox="0 0 10 10">
                    <path d="M2 5l2.5 2.5L8 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <p className="text-sm text-gray-700 dark:text-gray-300">{b}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Platform card ────────────────────────────────────────────────
function PlatformCard({ img, name, short, body, delay = 0 }: {
  img: string; name: string; short: string; body: string; delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="rounded-3xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/[0.025] overflow-hidden hover:border-orange-500/25 hover:bg-orange-500/5 transition-all group">
        {/* Logo area */}
        <div className="relative h-48 bg-gradient-to-br from-white/4 to-white/[0.01] flex items-center justify-center border-b border-white/6 p-6">
          <Image
            src={`/images/${img}`}
            alt={name}
            width={220}
            height={120}
            className="object-contain max-h-28 w-auto"
          />
        </div>
        <div className="p-6">
          <p className="text-xs text-orange-400 font-mono uppercase tracking-wider mb-1">{short}</p>
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{name}</h3>
          <p className="text-xs text-gray-500 leading-relaxed">{body}</p>
        </div>
      </div>
    </Reveal>
  );
}

// ─── FAQ accordion ────────────────────────────────────────────────
function FAQ({ q, a, delay = 0 }: { q: string; a: string; delay?: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.55, delay, ease: E }}
      className="rounded-2xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/[0.025] overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4.5 text-left"
      >
        <span className="text-sm font-medium text-gray-900 dark:text-white py-0.5">{q}</span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.22 }}
          className="flex-shrink-0 w-7 h-7 rounded-full border border-orange-500/30 bg-orange-500/10 flex items-center justify-center"
        >
          <svg className="w-3 h-3 text-orange-400" fill="none" viewBox="0 0 12 12">
            <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="ans"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: E }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-white/5 pt-3">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────
export default function BecomeALeaderPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 55]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#090700] text-gray-900 dark:text-white">
      <style>{`
        @keyframes bl-a { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(28px,-18px) scale(1.06)} 66%{transform:translate(-14px,16px) scale(0.96)} }
        @keyframes bl-b { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-20px,24px) scale(1.05)} }
        .bl-a{animation:bl-a 17s ease-in-out infinite}
        .bl-b{animation:bl-b 23s ease-in-out infinite}
      `}</style>

      {/* Aurora */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none hidden dark:block">
        <div className="bl-a absolute top-[-10%] left-[-4%] w-[55vw] h-[55vw] rounded-full bg-orange-700/10 blur-[130px]" />
        <div className="bl-b absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-amber-800/8 blur-[120px]" />
        <div className="bl-a absolute top-[40%] left-[28%] w-[38vw] h-[38vw] rounded-full bg-red-900/6 blur-[140px]" style={{ animationDelay: "7s" }} />
      </div>

      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative pt-28 pb-24 px-4 overflow-hidden">
        {/* Radial grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035] hidden dark:block"
          style={{
            backgroundImage: "radial-gradient(ellipse at center, rgba(249,115,22,0.6) 0%, transparent 70%)",
            backgroundSize: "100% 100%",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] hidden dark:block"
          style={{
            backgroundImage: "linear-gradient(rgba(249,115,22,1) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,1) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <motion.div style={{ y: heroY }}>
              <Reveal delay={0.05}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/35 bg-orange-500/10 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                  <span className="text-xs text-orange-300 font-medium tracking-wide">Leader Program · KoveTrade</span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] mb-6">
                  Become a{" "}
                  <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                    Leader
                  </span>
                  <br />
                  with KoveTrade.
                </h1>
              </Reveal>

              <Reveal delay={0.18}>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8 max-w-md">
                  KoveTrade is one of the most transparent social trading platforms in the world.
                  Our Leader Program is open for individual traders who possess real trading skills.
                  Share profitable signals and earn additional income.
                </p>
              </Reveal>

              {/* Key highlights */}
              <Reveal delay={0.26}>
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {[
                    { v: "30%", l: "Commission" },
                    { v: "Free", l: "To Join" },
                    { v: "Global", l: "Reach" },
                  ].map((s, i) => (
                    <div key={i} className="text-center p-3 rounded-xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/[0.025]">
                      <p className="text-lg font-black bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">{s.v}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">{s.l}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.32}>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-bold text-sm hover:from-orange-400 hover:to-amber-400 transition-all shadow-lg shadow-orange-900/30"
                >
                  Create account
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </Reveal>
            </motion.div>

            {/* Right */}
            <Reveal delay={0.2} dir="right">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-600/12 to-amber-900/8 blur-2xl scale-110" />
                  <div className="relative rounded-3xl border border-orange-500/20 bg-gray-50 dark:bg-white/[0.02] p-8">
                    <LeaderBadge />
                    <div className="mt-4 text-center space-y-1">
                      <p className="text-xs text-gray-500 uppercase tracking-widest font-mono">KoveTrade</p>
                      <p className="text-sm font-semibold text-orange-300">Signal Leader Program</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── What Does a Leader Do ────────────────────────────────── */}
      <section className="py-20 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* Left — tabs */}
            <div>
              <Reveal>
                <p className="text-xs text-orange-400 font-mono uppercase tracking-widest mb-3">The Role</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-8">
                  What Does a{" "}
                  <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                    Leader
                  </span>{" "}
                  Do?
                </h2>
              </Reveal>
              <WhatLeadersDo />
              <Reveal delay={0.2} className="mt-6">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors"
                >
                  Open account →
                </Link>
              </Reveal>
            </div>

            {/* Right — stats / visual */}
            <Reveal delay={0.15} dir="right">
              <div className="space-y-4">
                {/* Income projection card */}
                <div className="rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-950/50 to-amber-950/30 p-8">
                  <p className="text-xs text-orange-400 font-mono uppercase tracking-widest mb-5">Income Snapshot</p>
                  <div className="space-y-4">
                    {[
                      { followers: "10", vol: "$50k", commission: "$1,500" },
                      { followers: "50", vol: "$250k", commission: "$7,500" },
                      { followers: "200", vol: "$1M", commission: "$30,000" },
                    ].map((row, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-xl border border-orange-500/10 bg-orange-500/5"
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: E }}
                      >
                        <div>
                          <p className="text-xs text-gray-500">{row.followers} followers · ${row.vol.replace("$", "")} vol</p>
                        </div>
                        <p className="text-base font-black bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                          {row.commission}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-600 mt-3">*Illustrative estimates based on 30% commission structure</p>
                </div>

                {/* Quote */}
                <div className="rounded-2xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/[0.025] p-5">
                  <p className="text-sm text-gray-700 dark:text-gray-300 italic leading-relaxed">
                    "Share profitable signals and strategies with investors, let them follow, and earn additional income — all from your existing trading."
                  </p>
                  <p className="text-xs text-orange-400 font-semibold mt-3">— KoveTrade Leader Program</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 3 Steps ──────────────────────────────────────────────── */}
      <section className="py-20 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className="text-xs text-orange-400 font-mono uppercase tracking-widest mb-3">Simple Process</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Become a Leader in{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                3 Simple Steps
              </span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Connector lines on desktop */}
            <div className="hidden md:block absolute top-12 left-[33%] right-[33%] h-px bg-gradient-to-r from-orange-500/30 via-orange-500/60 to-orange-500/30 pointer-events-none" />

            {[
              {
                num: "01",
                icon: "🚀",
                title: "Join KoveTrade as a Leader",
                body: "Access the Leaders Program page and sign up using our free form to fast-track your approval process.",
              },
              {
                num: "02",
                icon: "📝",
                title: "Complete Registration & Start Trading",
                body: 'Fill in your information on the Online Application Form, gain access to the system, and choose "Become a Leader" to start trading.',
              },
              {
                num: "03",
                icon: "💰",
                title: "Investors Copy You & You Get Rewarded",
                body: "Investors copy your signals according to their capital and risk management. You earn 30% commission for every successful transaction.",
              },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div className="relative rounded-3xl border border-orange-500/15 bg-gray-50 dark:bg-white/[0.025] p-8 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all text-center">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
                    <span className="text-black text-xs font-black">{i + 1}</span>
                  </div>
                  <span className="text-3xl block mb-4 mt-3">{s.icon}</span>
                  <p className="text-xs text-orange-400 font-mono mb-2">{s.num}</p>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">{s.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3} className="text-center mt-8">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-bold text-sm hover:from-orange-400 hover:to-amber-400 transition-all"
            >
              Open account →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Trading Platforms ────────────────────────────────────── */}
      <section className="py-20 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className="text-xs text-orange-400 font-mono uppercase tracking-widest mb-3">Technology</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Trading{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                Platforms
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-3 max-w-lg mx-auto">
              Trade and broadcast your signals across our supported platforms.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <PlatformCard
              img="mt4.png"
              name="MetaTrader 4 Platform"
              short="MT4"
              body="Powerful Forex and CFD platform with superior charting, Expert Advisors for automated trading, and a user-friendly interface trusted by millions worldwide."
              delay={0.05}
            />
            <PlatformCard
              img="mt5.png"
              name="MetaTrader 5 Platform"
              short="MT5"
              body="The evolution of MT4 — offering advanced trading functionality, expanded asset classes, and enhanced tools for sophisticated traders."
              delay={0.12}
            />
            <PlatformCard
              img="xoh.png"
              name="XOH Trading Platform"
              short="XOH"
              body="Our proprietary web-based platform designed specifically for social and copy trading — with portfolio management, risk controls, and real-time replication."
              delay={0.19}
            />
            <PlatformCard
              img="actrader.png"
              name="ActTrader Platform"
              short="ActTrader"
              body="Modern copy trading platform with fast execution, an intuitive interface, and comprehensive charting tools built for online trading needs."
              delay={0.26}
            />
          </div>
        </div>
      </section>

      {/* ── Reasons ──────────────────────────────────────────────── */}
      <section className="py-20 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className="text-xs text-orange-400 font-mono uppercase tracking-widest mb-3">Why KoveTrade</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Reasons to Become a{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                Leader
              </span>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {[
              {
                icon: "🚫",
                title: "No Hidden Costs",
                body: "No costs when you become a Leader and no limits on payout. You only pay commission on what you earn.",
                color: "orange",
              },
              {
                icon: "🔄",
                title: "Broker-Agnostic Platform",
                body: "Our platform works with multiple regulated brokers worldwide. Choose the one that suits you most.",
                color: "amber",
              },
              {
                icon: "✅",
                title: "Verified Track Record",
                body: "All Leaders are verified and all trading strategies are monitored in real time to ensure integrity.",
                color: "orange",
              },
              {
                icon: "🎯",
                title: "Dedicated Leaders Desk",
                body: "Live chat for traders, a dedicated VIP support line, and a Leaders Desk team ready to assist you.",
                color: "amber",
              },
            ].map((r, i) => {
              const col = r.color === "orange"
                ? "border-orange-500/20 bg-orange-500/5 text-orange-400"
                : "border-amber-500/20 bg-amber-500/5 text-amber-400";
              return (
                <Reveal key={i} delay={i * 0.09}>
                  <div className={`rounded-3xl border p-6 h-full hover:scale-[1.02] transition-transform ${col}`}>
                    <span className="text-3xl block mb-4">{r.icon}</span>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{r.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{r.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="text-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-bold text-sm hover:from-orange-400 hover:to-amber-400 transition-all"
            >
              Open account →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="py-20 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="text-xs text-orange-400 font-mono uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-3xl font-bold">
              Your Questions,{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                answered.
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-3 max-w-md mx-auto">
              Find answers to the most common questions our members ask about the Leader program.
            </p>
          </Reveal>

          <div className="space-y-3">
            <FAQ
              q="Can anyone become a KoveTrade Leader?"
              a="To become a Leader, you must have a verified KoveTrade account with completed KYC, a demonstrated positive trading history, and agree to the Leader Terms and Conditions. Our team reviews each application individually."
              delay={0.05}
            />
            <FAQ
              q="Can I become a Leader without already being a KoveTrade client?"
              a="You will need to create a KoveTrade account first and complete the verification process before applying to the Leaders Program. The registration is free and typically takes just a few minutes."
              delay={0.1}
            />
            <FAQ
              q="What are the general trading hours for all instruments?"
              a="Trading hours vary by instrument. Forex markets are open 24 hours a day, 5 days a week. Indices, commodities, and other instruments follow their respective exchange hours. Full trading hours are available in your dashboard."
              delay={0.15}
            />
            <FAQ
              q="How will I become a successful Leader?"
              a="Successful Leaders combine consistent performance with clear communication. Trade regularly, maintain disciplined risk management, use stop-losses, and keep your followers informed about your strategy and market outlook."
              delay={0.2}
            />
            <FAQ
              q="What are the charges for me as a new Leader?"
              a="There are no upfront costs or monthly fees to become a Leader. You earn a 30% commission on every successful investor payment linked to your signals — your earnings are directly tied to your performance."
              delay={0.25}
            />
            <FAQ
              q="Is there a minimum amount for me to start trading with KoveTrade?"
              a="Minimum funding requirements are specified in the current program terms available in your dashboard. These may vary based on your account type and the broker you select."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden border border-orange-500/25">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-950/70 via-amber-950/50 to-yellow-950/30" />
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-orange-500/12 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl" />

              {/* Floating crowns */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {["👑", "⭐", "👑", "⭐"].map((s, i) => (
                  <motion.span
                    key={i}
                    className="absolute text-xl"
                    style={{ left: `${18 + i * 22}%`, top: "12%" }}
                    animate={{ y: [0, -28, 0], opacity: [0.2, 0.7, 0.2] }}
                    transition={{ repeat: Infinity, duration: 3.5 + i * 0.6, delay: i * 0.8 }}
                  >
                    {s}
                  </motion.span>
                ))}
              </div>

              <div className="relative p-10 text-center">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center mx-auto mb-5 text-2xl">
                  👑
                </div>
                <h2 className="text-2xl md:text-4xl font-bold mb-3">
                  Ready to{" "}
                  <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                    Lead?
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
                  Join the KoveTrade Leader Program today. Share your trading expertise, build a
                  following, and earn from every signal you broadcast.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-bold text-sm hover:from-orange-400 hover:to-amber-400 transition-all shadow-lg shadow-orange-900/30"
                  >
                    Get Started →
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-gray-300 dark:border-white/15 text-gray-900 dark:text-white font-semibold text-sm hover:bg-white/8 transition-all"
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
