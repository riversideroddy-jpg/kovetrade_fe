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

// ─── Animated Crown / Leaderboard SVG ────────────────────────────
function CrownHero() {
  return (
    <motion.div
      className="select-none flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: E }}
    >
      <svg viewBox="0 0 240 260" className="w-64 h-64 md:w-80 md:h-80" fill="none">
        {/* Glow rings */}
        {[1, 2].map((i) => (
          <motion.circle
            key={i}
            cx="120" cy="120" r={72 + i * 24}
            stroke={`rgba(250,204,21,${0.1 - i * 0.04})`}
            strokeWidth="1"
            animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.97, 1.03, 0.97] }}
            transition={{ repeat: Infinity, duration: 4 + i, ease: "easeInOut" }}
            style={{ transformOrigin: "120px 120px" }}
          />
        ))}

        {/* Podium base */}
        <motion.rect
          x="50" y="188" width="140" height="14" rx="7"
          fill="rgba(250,204,21,0.08)"
          stroke="rgba(250,204,21,0.25)"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />

        {/* Crown body */}
        <motion.path
          d="M60 175 L60 110 L80 145 L120 90 L160 145 L180 110 L180 175 Z"
          fill="url(#crownFill)"
          stroke="rgba(250,204,21,0.6)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: E }}
          style={{ transformOrigin: "120px 140px" }}
        />

        {/* Crown inner highlight */}
        <motion.path
          d="M68 170 L68 118 L84 148 L120 98 L156 148 L172 118 L172 170 Z"
          fill="rgba(250,204,21,0.06)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        />

        {/* Crown peak gems */}
        {[
          { cx: 120, cy: 90, r: 9, main: true },
          { cx: 60,  cy: 110, r: 6, main: false },
          { cx: 180, cy: 110, r: 6, main: false },
        ].map((g, i) => (
          <motion.g key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + i * 0.12, duration: 0.4, ease: E }}
            style={{ transformOrigin: `${g.cx}px ${g.cy}px` }}
          >
            <circle cx={g.cx} cy={g.cy} r={g.r}
              fill={g.main ? "rgba(250,204,21,0.4)" : "rgba(250,204,21,0.25)"}
              stroke="rgba(250,204,21,0.8)" strokeWidth={g.main ? 2 : 1.5}
            />
            <motion.circle
              cx={g.cx} cy={g.cy} r={g.r + 4}
              stroke="rgba(250,204,21,0.25)"
              strokeWidth="1"
              animate={{ r: [g.r + 3, g.r + 8, g.r + 3], opacity: [0.4, 0, 0.4] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.5 }}
            />
          </motion.g>
        ))}

        {/* Chart bars inside crown */}
        {[
          { x: 76, h: 28, delay: 1.0 },
          { x: 92, h: 40, delay: 1.1 },
          { x: 108, h: 55, delay: 1.2 },
          { x: 124, h: 45, delay: 1.15 },
          { x: 140, h: 35, delay: 1.05 },
          { x: 156, h: 50, delay: 1.25 },
        ].map((b, i) => (
          <motion.rect
            key={i}
            x={b.x} width="10" rx="3"
            y={175 - b.h}
            fill={`rgba(250,204,21,${0.2 + (i % 3) * 0.08})`}
            stroke="rgba(250,204,21,0.4)" strokeWidth="0.5"
            initial={{ height: 0, y: 175 }}
            animate={{ height: b.h, y: 175 - b.h }}
            transition={{ delay: b.delay, duration: 0.6, ease: E }}
            clipPath="url(#crownClip)"
          />
        ))}

        {/* Trend line over bars */}
        <motion.polyline
          points="81,148 97,138 113,125 129,131 145,140 161,126"
          stroke="rgba(250,204,21,0.8)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 1.4, duration: 1, ease: "easeOut" }}
          clipPath="url(#crownClip)"
        />

        {/* Floating rank badge */}
        <motion.g
          animate={{ y: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
        >
          <rect x="155" y="58" width="44" height="22" rx="11"
            fill="rgba(13,12,4,0.9)" stroke="rgba(250,204,21,0.5)" strokeWidth="1.5"
          />
          <text x="177" y="73" fill="rgba(250,204,21,0.95)" fontSize="9" fontWeight="800" textAnchor="middle" fontFamily="monospace">#LEADER</text>
        </motion.g>

        {/* Star sparkles */}
        {[{ x: 40, y: 88 }, { x: 200, y: 80 }, { x: 38, y: 170 }, { x: 202, y: 165 }].map((s, i) => (
          <motion.text
            key={i} x={s.x} y={s.y}
            fill="rgba(250,204,21,0.6)"
            fontSize="10" textAnchor="middle"
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
            transition={{ repeat: Infinity, duration: 2.5 + i * 0.4, delay: i * 0.5 }}
            style={{ transformOrigin: `${s.x}px ${s.y}px` }}
          >
            ✦
          </motion.text>
        ))}

        <defs>
          <linearGradient id="crownFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(250,204,21,0.18)" />
            <stop offset="100%" stopColor="rgba(250,204,21,0.04)" />
          </linearGradient>
          <clipPath id="crownClip">
            <path d="M60 175 L60 110 L80 145 L120 90 L160 145 L180 110 L180 175 Z" />
          </clipPath>
        </defs>
      </svg>
    </motion.div>
  );
}

// ─── Metric card with animated counter ───────────────────────────
function MetricCard({
  label, value, sub, icon, color, delay = 0,
}: {
  label: string; value: string; sub: string; icon: string;
  color: "yellow" | "emerald" | "rose" | "blue"; delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const colors = {
    yellow:  { ring: "border-yellow-500/30",  bg: "bg-yellow-500/8",  glow: "bg-yellow-500/10",  text: "text-yellow-400"  },
    emerald: { ring: "border-emerald-500/30", bg: "bg-emerald-500/8", glow: "bg-emerald-500/10", text: "text-emerald-400" },
    rose:    { ring: "border-[#5edc1f]/30",    bg: "bg-rose-500/8",    glow: "bg-[#5edc1f]/10",    text: "text-lime-400"    },
    blue:    { ring: "border-[#5edc1f]/30",    bg: "bg-[#5edc1f]/8",    glow: "bg-[#5edc1f]/10",    text: "text-lime-400"    },
  };
  const c = colors[color];
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: E }}
      className={`relative rounded-2xl border ${c.ring} ${c.bg} p-5 overflow-hidden`}
    >
      <div className={`absolute top-0 right-0 w-24 h-24 rounded-full ${c.glow} blur-2xl`} />
      <div className="relative">
        <span className="text-2xl block mb-3">{icon}</span>
        <p className={`text-2xl font-black ${c.text} mb-1`}>{value}</p>
        <p className="text-xs font-semibold text-gray-900 dark:text-white mb-0.5">{label}</p>
        <p className="text-[10px] text-gray-500 leading-tight">{sub}</p>
      </div>
    </motion.div>
  );
}

// ─── Animated follower graph ──────────────────────────────────────
function FollowerGraph() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const pts = [10, 14, 12, 20, 18, 28, 25, 38, 42, 55, 52, 68, 72, 88, 95];
  const maxV = 100;
  const w = 260, h = 100;
  const xs = pts.map((_, i) => (i / (pts.length - 1)) * w);
  const ys = pts.map((v) => h - (v / maxV) * h);
  const pathD = pts.map((_, i) => `${i === 0 ? "M" : "L"} ${xs[i]} ${ys[i]}`).join(" ");
  const areaD = `${pathD} L ${w} ${h} L 0 ${h} Z`;

  return (
    <div ref={ref} className="rounded-2xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/[0.025] p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-bold text-gray-900 dark:text-white">Follower Growth</p>
          <p className="text-xs text-gray-500">Consistent performance attracts followers</p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 font-medium">+850%</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: 80 }}>
        <defs>
          <linearGradient id="followerGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(250,204,21,0.25)" />
            <stop offset="100%" stopColor="rgba(250,204,21,0)" />
          </linearGradient>
        </defs>
        <motion.path
          d={areaD} fill="url(#followerGrad)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
        <motion.path
          d={pathD}
          stroke="rgba(250,204,21,0.8)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.3, duration: 1.5, ease: "easeOut" }}
        />
        <motion.circle
          cx={xs[pts.length - 1]} cy={ys[pts.length - 1]} r="5"
          fill="rgba(250,204,21,0.9)"
          stroke="rgba(250,204,21,0.3)" strokeWidth="4"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ delay: 1.6, duration: 0.4 }}
          style={{ transformOrigin: `${xs[pts.length - 1]}px ${ys[pts.length - 1]}px` }}
        />
      </svg>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────
export default function LeaderGuidePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#090810] text-gray-900 dark:text-white">
      <style>{`
        @keyframes lg-a { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(28px,-18px) scale(1.06)} 66%{transform:translate(-14px,14px) scale(0.95)} }
        @keyframes lg-b { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-20px,22px) scale(1.04)} }
        .lg-a{animation:lg-a 17s ease-in-out infinite}
        .lg-b{animation:lg-b 23s ease-in-out infinite}
      `}</style>

      {/* Aurora */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none hidden dark:block">
        <div className="lg-a absolute top-[-10%] left-[-4%] w-[55vw] h-[55vw] rounded-full bg-yellow-700/10 blur-[120px]" />
        <div className="lg-b absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-green-900/10 blur-[110px]" />
        <div className="lg-a absolute top-[40%] left-[28%] w-[38vw] h-[38vw] rounded-full bg-amber-800/6 blur-[130px]" style={{ animationDelay: "6s" }} />
      </div>

      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative pt-28 pb-24 px-4 overflow-hidden">
        {/* Diagonal lines texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] hidden dark:block"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, rgba(250,204,21,1) 0, rgba(250,204,21,1) 1px, transparent 0, transparent 50%)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left */}
            <motion.div style={{ y: heroY }}>
              <Reveal delay={0.05}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-yellow-500/35 bg-yellow-500/10 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                  <span className="text-xs text-yellow-300 font-medium tracking-wide">Leader Guide · KoveTrade</span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
                  Your complete
                  <br />
                  guide to becoming
                  <br />
                  a{" "}
                  <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                    signal leader.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.18}>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8 max-w-md">
                  Share your trading expertise, build a following, and earn commissions from every
                  trade your followers copy. KoveTrade gives you the tools to lead.
                </p>
              </Reveal>

              <Reveal delay={0.26}>
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {[
                    { v: "3", l: "Earning Channels" },
                    { v: "Public", l: "Performance" },
                    { v: "AutoGuard™", l: "Risk Rating" },
                  ].map((s, i) => (
                    <div key={i} className="text-center p-3 rounded-xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/[0.025]">
                      <p className="text-sm font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">{s.v}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">{s.l}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.32}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold text-sm hover:from-yellow-400 hover:to-amber-400 transition-all shadow-lg shadow-yellow-900/30"
                  >
                    Start Leading Today
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <a
                    href="#what-is"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-gray-200 dark:border-white/12 text-white/80 font-semibold text-sm hover:bg-gray-100 dark:bg-white/6 transition-all"
                  >
                    Learn more ↓
                  </a>
                </div>
              </Reveal>
            </motion.div>

            {/* Right */}
            <Reveal delay={0.2} dir="right">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-600/10 to-amber-900/8 blur-2xl scale-110" />
                  <div className="relative rounded-3xl border border-yellow-500/20 bg-gray-50 dark:bg-white/[0.02] p-8">
                    <CrownHero />
                    <div className="mt-3 text-center space-y-1">
                      <p className="text-xs text-gray-500 uppercase tracking-widest font-mono">KoveTrade</p>
                      <p className="text-sm font-semibold text-yellow-300">Signal Leader Program</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── What is a Leader ─────────────────────────────────────── */}
      <section id="what-is" className="py-20 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-start">

            <Reveal dir="left">
              <div>
                <p className="text-xs text-yellow-400 font-mono uppercase tracking-widest mb-3">Role Overview</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  What is a{" "}
                  <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">Leader?</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  A Leader on KoveTrade is an experienced trader who shares their trading signals
                  with the community. When other users (followers) copy your trades, you earn
                  commissions based on their activity.
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                  As a Leader, your trading performance is publicly visible, and your reputation
                  grows as you demonstrate consistent results. Leaders are the backbone of the
                  KoveTrade copy trading ecosystem.
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    { icon: "📡", label: "Share trading signals", desc: "Your trades broadcast to all followers automatically" },
                    { icon: "💰", label: "Earn commissions", desc: "Paid on every trade your followers copy" },
                    { icon: "🌟", label: "Build a reputation", desc: "Public metrics grow your trusted follower base" },
                  ].map((p, i) => (
                    <Reveal key={i} delay={i * 0.1}>
                      <div className="flex items-start gap-3 p-3.5 rounded-xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/[0.025]">
                        <span className="text-xl flex-shrink-0">{p.icon}</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">{p.label}</p>
                          <p className="text-xs text-gray-500">{p.desc}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Requirements */}
            <Reveal delay={0.1} dir="right">
              <div className="rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-950/40 to-amber-950/20 p-8">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-5">Requirements to Become a Leader</h3>
                <div className="space-y-3">
                  {[
                    "A verified KoveTrade account with completed KYC",
                    "Minimum account balance as specified in the current program terms",
                    "Demonstrated trading history with a positive track record",
                    "Agreement to the Leader Terms and Conditions",
                    "Commitment to maintaining responsible trading practices",
                  ].map((r, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.5, ease: E }}
                    >
                      <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-yellow-500/20 border border-yellow-400/40 flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-yellow-400" fill="none" viewBox="0 0 10 10">
                          <path d="M2 5l2.5 2.5L8 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{r}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-2xl border border-yellow-500/15 bg-yellow-500/5">
                  <p className="text-xs text-yellow-300 font-semibold mb-1">Already qualified?</p>
                  <p className="text-xs text-gray-500">Apply directly from your dashboard under the Leaders section.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Profile setup ────────────────────────────────────────── */}
      <section className="py-20 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-xs text-yellow-400 font-mono uppercase tracking-widest mb-3">Identity</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Setting Up Your{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">Profile</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm max-w-lg mx-auto">
                Your Leader profile is your public identity on KoveTrade. A well-crafted profile
                attracts more followers and builds trust.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { num: "1", icon: "📸", label: "Profile Photo", desc: "Upload a professional photo or avatar that represents you" },
              { num: "2", icon: "🏷️", label: "Display Name", desc: "Choose a recognizable name or trading alias" },
              { num: "3", icon: "✍️", label: "Bio", desc: "Describe your trading style, experience, and strategy focus" },
              { num: "4", icon: "⚖️", label: "Risk Level", desc: "Set your risk classification so followers know what to expect" },
              { num: "5", icon: "📊", label: "Instruments", desc: "Specify the markets and instruments you primarily trade" },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="rounded-2xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/[0.025] p-5 hover:border-yellow-500/25 hover:bg-yellow-500/5 transition-all text-center">
                  <span className="text-3xl font-black bg-gradient-to-b from-yellow-400 to-amber-400 bg-clip-text text-transparent block mb-2">{s.num}</span>
                  <span className="text-2xl block mb-2">{s.icon}</span>
                  <p className="text-xs font-bold text-gray-900 dark:text-white mb-1.5">{s.label}</p>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Performance metrics ──────────────────────────────────── */}
      <section className="py-20 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-xs text-yellow-400 font-mono uppercase tracking-widest mb-3">Transparency</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Your Trading{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">Performance</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm max-w-lg mx-auto">
                Your performance metrics are displayed publicly and are the primary factor followers
                consider when choosing who to copy.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <MetricCard label="Win Rate" value="74.2%" sub="Percentage of profitable trades" icon="🎯" color="emerald" delay={0.05} />
            <MetricCard label="Total Return" value="+212%" sub="Overall portfolio performance over time" icon="📈" color="yellow" delay={0.1} />
            <MetricCard label="Max Drawdown" value="-8.4%" sub="Largest peak-to-trough decline" icon="📉" color="rose" delay={0.15} />
            <MetricCard label="Risk Score" value="Low" sub="AutoGuard™ risk assessment rating" icon="🛡️" color="blue" delay={0.2} />
          </div>

          {/* Follower graph */}
          <Reveal delay={0.25}>
            <FollowerGraph />
          </Reveal>
        </div>
      </section>

      {/* ── Building follower base ───────────────────────────────── */}
      <section className="py-20 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">

          {/* Tips */}
          <Reveal dir="left">
            <div>
              <p className="text-xs text-yellow-400 font-mono uppercase tracking-widest mb-3">Growth</p>
              <h2 className="text-3xl font-bold mb-4">
                Building Your{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">Follower Base</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                Growing your follower count is key to maximizing your earnings. Here are proven
                strategies used by top leaders.
              </p>
              <div className="space-y-3">
                {[
                  { icon: "🔄", label: "Consistency", body: "Trade regularly and maintain a steady performance. Followers value reliability above all." },
                  { icon: "🪟", label: "Transparency", body: "Be open about your strategy, risk tolerance, and expected drawdowns before they happen." },
                  { icon: "💬", label: "Communication", body: "Post updates about your market outlook and reasoning behind key trades." },
                  { icon: "📣", label: "External promotion", body: "Share your KoveTrade profile on social media and trading communities." },
                ].map((t, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <div className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/[0.025] hover:border-yellow-500/20 hover:bg-yellow-500/5 transition-all">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-center text-xs text-yellow-400 font-bold">✓</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">{t.label} <span className="text-base">{t.icon}</span></p>
                        <p className="text-xs text-gray-500 leading-relaxed">{t.body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Earning channels */}
          <Reveal delay={0.1} dir="right">
            <div>
              <p className="text-xs text-yellow-400 font-mono uppercase tracking-widest mb-3">Revenue</p>
              <h2 className="text-3xl font-bold mb-4">
                Earning as a{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">Leader</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                Leaders earn money through multiple channels on KoveTrade.
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: "🏆", label: "Performance fees",
                    desc: "Earn a percentage of profits generated for your followers. The better you trade, the more you earn.",
                    color: "yellow",
                  },
                  {
                    icon: "📊", label: "Volume-based commissions",
                    desc: "Earn based on the trading volume your followers generate — every trade they copy contributes.",
                    color: "blue",
                  },
                  {
                    icon: "💹", label: "Your own trading",
                    desc: "Continue to profit from your own successful trades alongside your follower earnings.",
                    color: "emerald",
                  },
                ].map((ch, i) => {
                  const cols: Record<string, string> = {
                    yellow: "border-yellow-500/25 bg-yellow-500/8",
                    blue: "border-[#5edc1f]/20 bg-[#5edc1f]/6",
                    emerald: "border-emerald-500/20 bg-emerald-500/6",
                  };
                  const texts: Record<string, string> = {
                    yellow: "text-yellow-400", blue: "text-lime-400", emerald: "text-emerald-400",
                  };
                  return (
                    <Reveal key={i} delay={i * 0.1}>
                      <div className={`rounded-2xl border p-5 ${cols[ch.color]}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">{ch.icon}</span>
                          <p className={`text-sm font-bold ${texts[ch.color]}`}>{ch.label}</p>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{ch.desc}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Best Practices & Risk Management ────────────────────── */}
      <section className="py-20 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

          {/* Best Practices */}
          <Reveal dir="left">
            <div className="rounded-3xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/[0.025] p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center text-xl">⭐</div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Best Practices</h2>
              </div>
              <div className="space-y-3">
                {[
                  "Always use stop-losses on your trades to protect both your capital and your followers' capital",
                  "Avoid over-leveraging — high-risk strategies may yield short-term gains but damage long-term trust",
                  "Diversify your portfolio across instruments and time frames",
                  "Keep a trading journal and share insights with your followers",
                ].map((p, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-yellow-500/20 border border-yellow-400/40 flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-yellow-400" fill="none" viewBox="0 0 10 10">
                        <path d="M2 5l2.5 2.5L8 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{p}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Risk Management */}
          <Reveal delay={0.1} dir="right">
            <div className="rounded-3xl border border-rose-500/20 bg-rose-500/5 p-8 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/15 border border-[#5edc1f]/25 flex items-center justify-center text-xl">⚠️</div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Risk Management</h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                As a Leader, responsible risk management is not just good practice — it is your
                responsibility. Your followers trust you with their capital, and KoveTrade monitors
                leader behavior to protect the community.
              </p>
              <div className="space-y-3">
                {[
                  "Never risk more than 2–5% of your account on a single trade",
                  "Always set stop-losses and take-profit levels",
                  "Monitor your AutoGuard™ risk score and keep it within acceptable levels",
                  "Be mindful of correlated positions that increase overall portfolio risk",
                ].map((r, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[#5edc1f]/20 border border-rose-400/40 flex items-center justify-center text-lime-400 text-[10px] font-bold">
                      !
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{r}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 p-3 rounded-xl border border-rose-500/20 bg-rose-500/5 flex items-center gap-2">
                <span className="text-sm">🛡️</span>
                <p className="text-xs text-lime-300">
                  AutoGuard™ continuously monitors your risk profile and will notify you if thresholds are approached.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden border border-yellow-500/25">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-950/70 via-amber-950/50 to-orange-950/30" />
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-yellow-500/12 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl" />

              {/* Animated stars */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {["✦", "★", "✦", "★"].map((s, i) => (
                  <motion.span
                    key={i}
                    className="absolute text-yellow-400/40 text-xl"
                    style={{ left: `${20 + i * 22}%`, top: "10%" }}
                    animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
                    transition={{ repeat: Infinity, duration: 3 + i, delay: i * 0.8 }}
                  >
                    {s}
                  </motion.span>
                ))}
              </div>

              <div className="relative p-10 text-center">
                <div className="w-14 h-14 rounded-2xl bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-center mx-auto mb-5 text-2xl">
                  👑
                </div>

                <h2 className="text-2xl md:text-4xl font-bold mb-3">
                  Start{" "}
                  <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                    Leading Today
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
                  Ready to share your trading expertise and earn from your skills? Apply to become
                  a KoveTrade Leader and start building your following today.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold text-sm hover:from-yellow-400 hover:to-amber-400 transition-all shadow-lg shadow-yellow-900/30"
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
