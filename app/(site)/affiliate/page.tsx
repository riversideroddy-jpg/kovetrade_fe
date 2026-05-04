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

// ─── Animated Referral Network SVG ───────────────────────────────
function ReferralNetwork() {
  const nodes = [
    { cx: 120, cy: 80,  r: 22, label: "YOU", main: true  },
    { cx: 42,  cy: 160, r: 16, label: "A",   main: false },
    { cx: 120, cy: 170, r: 16, label: "B",   main: false },
    { cx: 200, cy: 160, r: 16, label: "C",   main: false },
    { cx: 22,  cy: 235, r: 11, label: "",    main: false },
    { cx: 68,  cy: 240, r: 11, label: "",    main: false },
    { cx: 105, cy: 238, r: 11, label: "",    main: false },
    { cx: 138, cy: 238, r: 11, label: "",    main: false },
    { cx: 185, cy: 235, r: 11, label: "",    main: false },
    { cx: 218, cy: 238, r: 11, label: "",    main: false },
  ];
  const edges = [
    [0, 1], [0, 2], [0, 3],
    [1, 4], [1, 5],
    [2, 6], [2, 7],
    [3, 8], [3, 9],
  ] as [number, number][];

  return (
    <motion.div
      className="flex flex-col items-center select-none"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: E }}
    >
      <svg viewBox="0 0 240 270" className="w-60 h-64 md:w-72 md:h-80" fill="none">
        {/* Glow behind center node */}
        <circle cx="120" cy="80" r="40" fill="rgba(251,191,36,0.08)" />

        {/* Edges */}
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].cx} y1={nodes[a].cy}
            x2={nodes[b].cx} y2={nodes[b].cy}
            stroke="rgba(251,191,36,0.25)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.8 + i * 0.12, duration: 0.5, ease: "easeOut" }}
          />
        ))}

        {/* Coin flow dots */}
        {edges.slice(0, 3).map(([a, b], i) => {
          const x1 = nodes[a].cx, y1 = nodes[a].cy;
          const x2 = nodes[b].cx, y2 = nodes[b].cy;
          return (
            <motion.circle
              key={`flow-${i}`}
              r="4"
              fill="rgba(251,191,36,0.8)"
              animate={{
                cx: [x1, x2],
                cy: [y1, y2],
                opacity: [0, 1, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                delay: 1.5 + i * 0.65,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((n, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.08, duration: 0.4, ease: E }}
            style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
          >
            <circle
              cx={n.cx} cy={n.cy} r={n.r}
              fill={n.main ? "rgba(251,191,36,0.15)" : "rgba(251,191,36,0.06)"}
              stroke={n.main ? "rgba(251,191,36,0.7)" : "rgba(251,191,36,0.3)"}
              strokeWidth={n.main ? 2 : 1.5}
            />
            {n.main && (
              <>
                <motion.circle
                  cx={n.cx} cy={n.cy} r={n.r + 6}
                  stroke="rgba(251,191,36,0.2)"
                  strokeWidth="1"
                  animate={{ r: [n.r + 4, n.r + 12, n.r + 4], opacity: [0.4, 0, 0.4] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                />
                <text x={n.cx} y={n.cy + 4} fill="rgba(251,191,36,0.95)" fontSize="8" fontWeight="800" textAnchor="middle" fontFamily="monospace">YOU</text>
              </>
            )}
            {n.label && !n.main && (
              <text x={n.cx} y={n.cy + 4} fill="rgba(251,191,36,0.7)" fontSize="7" fontWeight="700" textAnchor="middle" fontFamily="monospace">{n.label}</text>
            )}
            {!n.label && (
              <circle cx={n.cx} cy={n.cy} r={3} fill="rgba(251,191,36,0.5)" />
            )}
          </motion.g>
        ))}

        {/* Commission labels */}
        {[
          { x: 68,  y: 118, label: "+10%" },
          { x: 120, y: 130, label: "+10%" },
          { x: 172, y: 118, label: "+10%" },
        ].map((l, i) => (
          <motion.text
            key={i}
            x={l.x} y={l.y}
            fill="rgba(251,191,36,0.55)"
            fontSize="7.5"
            fontWeight="700"
            textAnchor="middle"
            fontFamily="monospace"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: 2 + i * 0.4 }}
          >
            {l.label}
          </motion.text>
        ))}
      </svg>
    </motion.div>
  );
}

// ─── Earnings calculator ──────────────────────────────────────────
function EarningsCalc() {
  const [refs, setRefs] = useState(5);
  const [deposit, setDeposit] = useState(500);
  const commission = refs * deposit * 0.1;

  return (
    <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
      <p className="text-sm font-semibold text-amber-300 mb-4">💰 Earnings Calculator</p>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1.5">
            <span>Referrals per month</span>
            <span className="font-bold text-gray-900 dark:text-white">{refs}</span>
          </div>
          <input
            type="range" min={1} max={50} value={refs}
            onChange={(e) => setRefs(Number(e.target.value))}
            className="w-full h-1.5 rounded-full accent-amber-400 cursor-pointer"
          />
        </div>
        <div>
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1.5">
            <span>Avg. first deposit</span>
            <span className="font-bold text-gray-900 dark:text-white">${deposit.toLocaleString()}</span>
          </div>
          <input
            type="range" min={100} max={5000} step={100} value={deposit}
            onChange={(e) => setDeposit(Number(e.target.value))}
            className="w-full h-1.5 rounded-full accent-amber-400 cursor-pointer"
          />
        </div>
        <div className="pt-3 border-t border-amber-500/15">
          <p className="text-xs text-gray-500 mb-0.5">Estimated monthly earnings</p>
          <motion.p
            key={commission}
            initial={{ scale: 0.85, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="text-3xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent"
          >
            ${commission.toLocaleString()}
          </motion.p>
          <p className="text-xs text-gray-600 mt-0.5">10% × {refs} referrals × ${deposit.toLocaleString()}</p>
        </div>
      </div>
    </div>
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
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-medium text-gray-900 dark:text-white">{q}</span>
        <motion.svg
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.22 }}
          className="w-4 h-4 text-amber-400 flex-shrink-0"
          fill="none" viewBox="0 0 16 16"
        >
          <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </motion.svg>
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
            <p className="px-5 pb-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-200 dark:border-white/6 pt-3">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────
export default function AffiliatePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0c0900] text-gray-900 dark:text-white">
      <style>{`
        @keyframes af-a { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.06)} 66%{transform:translate(-15px,15px) scale(0.96)} }
        @keyframes af-b { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-25px,20px) scale(1.04)} 66%{transform:translate(20px,-10px) scale(0.98)} }
        .af-a{animation:af-a 16s ease-in-out infinite}
        .af-b{animation:af-b 22s ease-in-out infinite}
      `}</style>

      {/* Aurora */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none hidden dark:block">
        <div className="af-a absolute top-[-12%] left-[-6%] w-[58vw] h-[58vw] rounded-full bg-amber-700/10 blur-[120px]" />
        <div className="af-b absolute bottom-[-10%] right-[-5%] w-[52vw] h-[52vw] rounded-full bg-orange-800/8 blur-[110px]" />
        <div className="af-a absolute top-[38%] left-[32%] w-[36vw] h-[36vw] rounded-full bg-yellow-800/6 blur-[130px]" style={{ animationDelay: "5s" }} />
      </div>

      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative pt-28 pb-24 px-4 overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04] hidden dark:block"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(251,191,36,1) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <motion.div style={{ y: heroY }}>
              <Reveal delay={0.05}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/35 bg-amber-500/10 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-xs text-amber-300 font-medium tracking-wide">KoveTrade Affiliate Program</span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
                  Everything you need{" "}
                  <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    to succeed.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.18}>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8 max-w-md">
                  Our program is designed to be simple, transparent, and rewarding. Earn a commission
                  on every qualified referral — with all the tools you need to grow.
                </p>
              </Reveal>

              {/* Big commission badge */}
              <Reveal delay={0.26}>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex flex-col px-6 py-4 rounded-2xl border border-amber-500/30 bg-amber-500/8">
                    <span className="text-4xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">10%</span>
                    <span className="text-xs text-gray-500 mt-0.5">of First Deposit</span>
                  </div>
                  <div className="flex flex-col px-6 py-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.025]">
                    <span className="text-4xl font-black text-gray-900 dark:text-white">90</span>
                    <span className="text-xs text-gray-500 mt-0.5">Day Cookie</span>
                  </div>
                  <div className="flex flex-col px-6 py-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.025]">
                    <span className="text-4xl font-black text-gray-900 dark:text-white">∞</span>
                    <span className="text-xs text-gray-500 mt-0.5">No Referral Cap</span>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.34}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-sm hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-amber-900/30"
                  >
                    Get Started
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <a
                    href="#how"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-gray-200 dark:border-white/12 text-white/80 font-semibold text-sm hover:bg-gray-100 dark:bg-white/6 transition-all"
                  >
                    How it works ↓
                  </a>
                </div>
              </Reveal>
            </motion.div>

            {/* Right */}
            <Reveal delay={0.2} dir="right">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-600/10 to-orange-900/8 blur-2xl scale-110" />
                  <div className="relative rounded-3xl border border-amber-500/20 bg-gray-50 dark:bg-white/[0.02] p-8">
                    <ReferralNetwork />
                    <div className="mt-3 text-center">
                      <p className="text-xs text-gray-500 uppercase tracking-widest">Referral Network</p>
                      <p className="text-sm font-semibold text-amber-300">Every node earns you 10%</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Welcome strip ────────────────────────────────────────── */}
      <section className="py-10 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Welcome to the Affiliate Program</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Thank you for joining the KoveTrade Affiliate Program. As an affiliate, you play a
              crucial role in growing our community of traders. This guide will walk you through
              everything you need to know — from setting up your account to maximizing your earnings.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Getting Started ──────────────────────────────────────── */}
      <section id="how" className="py-20 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-xs text-amber-400 font-mono uppercase tracking-widest mb-3">Step by Step</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Getting{" "}
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Started
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm max-w-lg mx-auto">
                Follow these steps to begin earning as a KoveTrade affiliate.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { num: "1", icon: "👤", title: "Create your account", body: "Sign up at KoveTrade and complete the identity verification process.", accent: "amber" },
              { num: "2", icon: "📋", title: "Apply for the program", body: "Navigate to the Affiliate section in your dashboard and submit your application.", accent: "orange" },
              { num: "3", icon: "🔗", title: "Get your referral link", body: "Once approved, receive a personalized referral link and unique tracking code.", accent: "yellow" },
              { num: "4", icon: "📣", title: "Start promoting", body: "Share your link across your channels and earn commissions on every qualified referral.", accent: "amber" },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="relative rounded-2xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/[0.025] p-6 hover:border-amber-500/25 hover:bg-amber-500/5 transition-all group">
                  {/* Connector arrow */}
                  {i < 3 && (
                    <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full border border-amber-500/30 bg-[#0c0900] items-center justify-center">
                      <svg className="w-3 h-3 text-amber-500" fill="none" viewBox="0 0 12 12">
                        <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-2xl">{s.icon}</span>
                    <span className="text-3xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent leading-none">{s.num}</span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{s.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dashboard & Commission (split) ────────────────────────── */}
      <section className="py-20 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-start">

          {/* Dashboard */}
          <Reveal dir="left">
            <div className="rounded-3xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/[0.025] p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-xl">📊</div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Dashboard</h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">
                Your affiliate dashboard is your command center. From here you can:
              </p>
              <div className="space-y-3">
                {[
                  { icon: "🔗", label: "Referral link & custom tracking URLs" },
                  { icon: "📈", label: "Real-time clicks, sign-ups & conversions" },
                  { icon: "💵", label: "Commission earnings & payment history" },
                  { icon: "🎨", label: "Banners, copy & landing page assets" },
                  { icon: "💸", label: "Request withdrawals instantly" },
                ].map((f, i) => (
                  <Reveal key={i} delay={i * 0.07}>
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-white/6 bg-gray-50 dark:bg-white/[0.02] hover:border-amber-500/20 hover:bg-amber-500/5 transition-all">
                      <span className="text-lg flex-shrink-0">{f.icon}</span>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{f.label}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Commission */}
          <div className="space-y-5">
            <Reveal dir="right">
              <div className="rounded-3xl overflow-hidden border border-amber-500/25">
                <div className="relative p-8 bg-gradient-to-br from-amber-950/60 to-orange-950/40">
                  <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
                  <div className="relative">
                    <p className="text-xs text-amber-400 font-mono uppercase tracking-widest mb-2">Commission Structure</p>
                    <div className="flex items-end gap-3 mb-4">
                      <span className="text-7xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">10%</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400 mb-2 leading-tight">of every<br />First Deposit</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                      No cap on referrals. Commissions credited instantly once the deposit is confirmed.
                    </p>
                    <div className="p-4 rounded-2xl border border-amber-500/15 bg-amber-500/5">
                      <p className="text-xs text-gray-500 mb-1.5">Quick example</p>
                      <div className="flex items-center gap-2 text-sm font-mono">
                        <span className="text-gray-600 dark:text-gray-400">User deposits</span>
                        <span className="text-amber-300 font-bold">$1,000</span>
                        <span className="text-gray-600">→</span>
                        <span className="text-emerald-400 font-bold">You earn $100</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15} dir="right">
              <EarningsCalc />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Promoting tips ───────────────────────────────────────── */}
      <section className="py-20 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-xs text-amber-400 font-mono uppercase tracking-widest mb-3">Best Practices</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Promoting{" "}
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  KoveTrade
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm max-w-lg mx-auto">
                Tips and best practices to maximize your referral earnings.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "💬", title: "Be authentic", body: "Share your own experience with KoveTrade. Genuine recommendations convert better than generic pitches." },
              { icon: "🎓", title: "Educate your audience", body: "Create content that explains how copy trading works and how KoveTrade makes it accessible to everyone." },
              { icon: "📡", title: "Use multiple channels", body: "Promote on social media, blogs, YouTube, email newsletters, and trading communities." },
              { icon: "🎨", title: "Leverage our materials", body: "Use the banners, landing pages, and copy we provide in your dashboard for professional promotion." },
              { icon: "⚖️", title: "Stay compliant", body: "Always disclose your affiliate relationship and never make guarantees about trading profits." },
              { icon: "📊", title: "Track & optimize", body: "Use sub-IDs to test different messages and channels, then double down on what converts." },
            ].map((tip, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="relative rounded-2xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/[0.02] p-6 hover:border-amber-500/25 hover:bg-amber-500/5 transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-xs text-emerald-400 font-bold">✓</span>
                    <span className="text-xl">{tip.icon}</span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{tip.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{tip.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tracking & Withdrawals ───────────────────────────────── */}
      <section className="py-20 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

          {/* Tracking */}
          <Reveal dir="left">
            <div className="rounded-3xl border border-[#5edc1f]/15 bg-gray-50 dark:bg-white/[0.02] p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-[#5edc1f]/15 border border-[#5edc1f]/25 flex items-center justify-center text-xl">📡</div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tracking & Analytics</h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">
                We provide comprehensive tracking so you always know how your campaigns are performing.
              </p>
              <div className="space-y-3">
                {[
                  { icon: "🖱️", label: "Click tracking", desc: "See exactly how many people click your referral links" },
                  { icon: "🔄", label: "Conversion tracking", desc: "Monitor sign-ups, verifications, and first deposits" },
                  { icon: "🏷️", label: "Sub-ID tracking", desc: "Use custom sub-IDs to track different campaigns and channels" },
                  { icon: "📅", label: "Historical reports", desc: "Access detailed reports for any date range" },
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 dark:border-white/6 bg-gray-50 dark:bg-white/[0.018]">
                    <span className="text-base flex-shrink-0 mt-0.5">{t.icon}</span>
                    <div>
                      <p className="text-xs font-semibold text-gray-900 dark:text-white mb-0.5">{t.label}</p>
                      <p className="text-xs text-gray-500">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Withdrawals */}
          <Reveal dir="right">
            <div className="rounded-3xl border border-emerald-500/15 bg-gray-50 dark:bg-white/[0.02] p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-xl">💸</div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Withdrawal of Earnings</h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">
                Withdrawing your affiliate earnings is simple and flexible.
              </p>
              <div className="space-y-3 mb-5">
                {[
                  { icon: "⚡", label: "Fast availability", desc: "Commissions available within 24–48 hours of confirmation" },
                  { icon: "🏦", label: "Bank transfer", desc: "Standard wire transfer to any bank account" },
                  { icon: "₿",  label: "Cryptocurrency", desc: "Withdraw to BTC, ETH, USDT and more" },
                  { icon: "📊", label: "Trading account", desc: "Transfer directly to your KoveTrade trading balance" },
                ].map((w, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 dark:border-white/6 bg-gray-50 dark:bg-white/[0.018]">
                    <span className="text-base flex-shrink-0 mt-0.5">{w.icon}</span>
                    <div>
                      <p className="text-xs font-semibold text-gray-900 dark:text-white mb-0.5">{w.label}</p>
                      <p className="text-xs text-gray-500">{w.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
                <p className="text-xs font-semibold text-emerald-300 mb-1">No minimum threshold</p>
                <p className="text-xs text-gray-500">Withdraw any amount at any time. Processing times vary by method (1–5 business days).</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="py-20 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-xs text-amber-400 font-mono uppercase tracking-widest mb-3">FAQs</p>
              <h2 className="text-3xl font-bold">
                Frequently Asked{" "}
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Questions
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="space-y-3">
            <FAQ
              q="How long does the referral cookie last?"
              a="Our tracking cookies last for 90 days. If a user clicks your link and registers within 90 days, you receive credit for the referral."
              delay={0.05}
            />
            <FAQ
              q="Can I refer myself or my own accounts?"
              a="No. Self-referrals are not permitted and will result in removal from the affiliate program. Our systems automatically detect and flag self-referral activity."
              delay={0.1}
            />
            <FAQ
              q="Is there a limit to how many people I can refer?"
              a="There is no limit. Refer as many users as you can and earn commissions on every qualified referral. The more you refer, the more you earn."
              delay={0.15}
            />
            <FAQ
              q="What counts as a qualified referral?"
              a="A qualified referral is a new user who registers through your unique link, completes account verification (KYC), and makes their first deposit into their KoveTrade account."
              delay={0.2}
            />
            <FAQ
              q="When are commissions credited?"
              a="Commissions are credited instantly once the referred user's first deposit is confirmed by our system — typically within minutes of the deposit being processed."
              delay={0.25}
            />
            <FAQ
              q="What promotional materials are available?"
              a="Your dashboard provides banners in multiple sizes, pre-written copy, dedicated landing pages, and custom UTM-tagged links — everything you need to promote across any channel."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/25">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-950/70 via-orange-950/50 to-yellow-950/30" />
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-amber-500/12 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-orange-500/10 blur-3xl" />

              {/* Animated coins */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[10, 35, 60, 80].map((left, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-lg"
                    style={{ left: `${left}%` }}
                    animate={{ y: [-10, -80, -10], opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 4 + i, delay: i * 1.2, ease: "easeInOut" }}
                  >
                    💰
                  </motion.div>
                ))}
              </div>

              <div className="relative p-10 text-center">
                <h2 className="text-2xl md:text-4xl font-bold mb-3">
                  Ready to Start{" "}
                  <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                    Earning?
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
                  Join the KoveTrade Affiliate Program today and start earning commissions on every
                  referral. It only takes a few minutes to get set up.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-sm hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-amber-900/30"
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
