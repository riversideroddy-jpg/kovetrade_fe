"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

const E = [0.16, 1, 0.3, 1] as const;

function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.7, delay, ease: E }}
      className={className}
    >{children}</motion.div>
  );
}

// ─── Animated risk gauge ────────────────────────────────────────
function RiskGauge() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => {
      let v = 0;
      const interval = setInterval(() => {
        v += 2;
        setPct(v);
        if (v >= 78) clearInterval(interval);
      }, 18);
      return () => clearInterval(interval);
    }, 300);
    return () => clearTimeout(timeout);
  }, [inView]);

  // SVG arc math
  const R = 80;
  const cx = 100;
  const cy = 100;
  const startAngle = 210;
  const totalArc = 120;
  const angle = startAngle + (totalArc * pct) / 100;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const arcX = (a: number) => cx + R * Math.cos(toRad(a));
  const arcY = (a: number) => cy + R * Math.sin(toRad(a));

  const trackPath = `M ${arcX(startAngle)} ${arcY(startAngle)} A ${R} ${R} 0 1 1 ${arcX(startAngle + totalArc)} ${arcY(startAngle + totalArc)}`;
  const fillPath  = pct > 0 ? `M ${arcX(startAngle)} ${arcY(startAngle)} A ${R} ${R} 0 ${pct > 50 ? 1 : 0} 1 ${arcX(angle)} ${arcY(angle)}` : "";

  const needleX = cx + (R - 10) * Math.cos(toRad(angle));
  const needleY = cy + (R - 10) * Math.sin(toRad(angle));

  return (
    <div ref={ref} className="flex flex-col items-center select-none">
      <svg viewBox="0 0 200 140" className="w-48 h-36">
        {/* Track */}
        <path d={trackPath} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="14" strokeLinecap="round" />
        {/* Zone colours */}
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#22c55e" />
            <stop offset="40%"  stopColor="#f59e0b" />
            <stop offset="75%"  stopColor="#ef4444" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>
        {fillPath && (
          <path d={fillPath} fill="none" stroke="url(#gaugeGrad)" strokeWidth="14" strokeLinecap="round" />
        )}
        {/* Needle */}
        {pct > 0 && (
          <motion.circle
            cx={needleX} cy={needleY} r="7"
            fill="#ef4444" stroke="white" strokeWidth="2.5"
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          />
        )}
        {/* Centre label */}
        <text x={cx} y={cy + 10} textAnchor="middle" fill="white" fontSize="22" fontWeight="900" fontFamily="sans-serif">
          {pct}%
        </text>
        <text x={cx} y={cy + 28} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontWeight="700" fontFamily="sans-serif" letterSpacing="1.5">
          RISK LEVEL
        </text>
        {/* Low / High labels */}
        <text x={arcX(startAngle) - 6} y={arcY(startAngle) + 14} fill="rgba(255,255,255,0.3)" fontSize="7" fontWeight="700" fontFamily="sans-serif">LOW</text>
        <text x={arcX(startAngle + totalArc) - 10} y={arcY(startAngle + totalArc) + 14} fill="rgba(255,255,255,0.3)" fontSize="7" fontWeight="700" fontFamily="sans-serif">HIGH</text>
      </svg>
      <p className="text-[11px] text-red-400 font-bold tracking-widest uppercase mt-1">High Risk Instrument</p>
    </div>
  );
}

// ─── Pulse warning dot ─────────────────────────────────────────
function WarnDot() {
  return (
    <span className="relative flex w-3 h-3 shrink-0">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-50" />
      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
    </span>
  );
}

// ─── Regulated entities ────────────────────────────────────────
const ENTITIES = [
  { region: "Europe",         entity: "KoveTrade (Europe) Ltd.",  reg: "CySEC", license: "License #109/10"       },
  { region: "United Kingdom", entity: "KoveTrade (UK) Ltd.",      reg: "FCA",   license: "FRN 583263"            },
  { region: "United States",  entity: "KoveTrade (USA) Ltd.",     reg: "SEC",   license: "CRD 298461"            },
  { region: "Middle East",    entity: "KoveTrade (ME) Limited",   reg: "FSRA",  license: "Permission No. 220073" },
];

// ─── Risk bullets ──────────────────────────────────────────────
const RISK_BULLETS = [
  { icon: "💸", t: "Total capital loss",      b: "You may lose all of your invested capital. Never invest money you cannot afford to lose." },
  { icon: "⚡", t: "Leverage amplification",  b: "Leveraged trading amplifies both gains and losses. A small move can cause proportionally larger losses." },
  { icon: "🌪️", t: "Market volatility",       b: "Market conditions, volatility, liquidity, and geopolitical events can change rapidly and without warning." },
  { icon: "🛑", t: "Stop-loss slippage",      b: "Stop-loss orders may not execute at the specified price due to market gaps or slippage." },
  { icon: "🖥️", t: "Technology failures",     b: "System outages and connectivity issues may affect your ability to manage open positions." },
  { icon: "📋", t: "Copy trading risk",        b: "Past performance of copied traders is not a guarantee of future results." },
];

// ─── Page ──────────────────────────────────────────────────────
export default function RiskDisclaimer() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  return (
    <div className="overflow-x-hidden bg-white dark:bg-[#070809] text-gray-900 dark:text-white">
      <Navbar />

      {/* ── Hero — dark red/amber palette ── */}
      <section ref={heroRef} className="relative overflow-hidden bg-gray-100 dark:bg-[#0e0a08] pt-28 pb-24 sm:pt-36 sm:pb-32">
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        {/* Glow blobs */}
        <div className="aurora-a absolute -top-[20%] right-[10%] w-[700px] h-[700px] rounded-full opacity-25 hidden dark:block"
          style={{ background: "radial-gradient(circle, #dc2626 0%, transparent 60%)" }} />
        <div className="aurora-b absolute -bottom-[15%] left-[5%] w-[500px] h-[500px] rounded-full opacity-15 hidden dark:block"
          style={{ background: "radial-gradient(circle, #d97706 0%, transparent 60%)" }} />

        <motion.div style={{ y: heroY }} className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left */}
            <div>
              <motion.div
                className="inline-flex items-center gap-2.5 rounded-full border border-red-500/25 bg-red-500/[0.08] px-4 py-2 mb-7"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: E }}
              >
                <WarnDot />
                <span className="text-[11px] font-semibold text-red-600 dark:text-red-300 tracking-wide">Important Legal Notice · KoveTrade</span>
              </motion.div>

              <motion.h1
                className="font-black tracking-tight leading-[1.04] mb-5 text-gray-900 dark:text-white"
                style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.6rem)" }}
                initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08, ease: E }}
              >
                Risk{" "}
                <span className="bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                  Disclaimer
                </span>
              </motion.h1>

              <motion.p
                className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-md"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.15, ease: E }}
              >
                Trading financial instruments carries significant risk and may not be suitable for all investors.
                Please read this disclaimer carefully before engaging in any trading activity on our platform.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.26 }}
              >
                {[
                  { label: "Last Updated", val: "February 2026" },
                  { label: "Regulation",   val: "4 Jurisdictions" },
                  { label: "Applies To",   val: "All Users"       },
                ].map(({ label, val }) => (
                  <div key={label} className="rounded-2xl border border-gray-300 dark:border-white/[0.08] bg-gray-100 dark:bg-white/[0.04] px-4 py-2.5">
                    <p className="text-[10px] text-gray-600 font-medium">{label}</p>
                    <p className="text-[13px] text-gray-900 dark:text-white font-bold">{val}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — risk gauge */}
            <motion.div
              className="flex flex-col items-center justify-center gap-8"
              initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.28, ease: E }}
            >
              <RiskGauge />

              {/* CFD regulatory warning box */}
              <div className="w-full max-w-sm rounded-2xl border border-red-500/25 bg-red-500/[0.08] p-5">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-red-400 mb-2">CFD Warning</p>
                <p className="text-[12px] text-gray-600 dark:text-gray-300 leading-relaxed">
                  CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage.
                  A significant percentage of retail investor accounts lose money when trading CFDs.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── Quick-nav ── */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-[#070809]/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/[0.06]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex items-center gap-2 py-3 overflow-x-auto no-scrollbar">
            <span className="text-[11px] text-gray-400 dark:text-gray-600 font-medium shrink-0 mr-1">Sections:</span>
            {[
              { n: 1, l: "About KoveTrade"    },
              { n: 2, l: "Full Disclaimer"    },
              { n: 3, l: "Performance"        },
              { n: 4, l: "Risk Warnings"      },
              { n: 5, l: "Important Notice"   },
            ].map(({ n, l }) => (
              <a key={n} href={`#rd${n}`}
                className="shrink-0 rounded-full bg-gray-100 dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.07] hover:border-red-300 dark:hover:border-red-500/40 hover:text-red-700 dark:hover:text-red-400 px-3.5 py-1.5 text-[11px] font-semibold text-gray-500 dark:text-gray-500 transition-all duration-200"
              >
                <span className="font-black opacity-50 mr-0.5">{n}.</span>{l}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <main className="py-16 sm:py-24 bg-gray-50 dark:bg-[#080909]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-5">

          {/* §1 About KoveTrade */}
          <Reveal delay={0}>
            <div id="rd1" className="scroll-mt-20 rounded-3xl border border-gray-100 dark:border-white/[0.06] overflow-hidden bg-white dark:bg-[#0c0d0f]">
              <div className="flex items-center gap-4 px-7 py-5 bg-gray-50/80 dark:bg-white/[0.02] border-b border-gray-100 dark:border-white/[0.05]">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-white shadow-lg shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 dark:text-gray-400 mb-0.5">Section 1 · Global Regulator</p>
                  <h2 className="text-base sm:text-[17px] font-black text-gray-900 dark:text-white">About KoveTrade</h2>
                </div>
              </div>
              <div className="px-7 py-6">
                <p className="text-[14px] sm:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  KoveTrade is a globally recognised financial services provider offering access to a wide range of
                  trading instruments and investment services, operating through several regulated entities:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {ENTITIES.map(({ region, entity, reg, license }) => (
                    <div key={region} className="flex items-start gap-3 rounded-2xl border border-gray-100 dark:border-white/[0.06] bg-gray-50 dark:bg-white/[0.02] p-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5edc1f] to-green-700 flex items-center justify-center text-white text-[10px] font-black shrink-0 shadow-md">
                        {reg}
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

          {/* §2 Full Disclaimer */}
          <Reveal delay={0.05}>
            <div id="rd2" className="scroll-mt-20 rounded-3xl border border-orange-100 dark:border-orange-500/[0.15] overflow-hidden bg-white dark:bg-[#0c0d0f]">
              <div className="flex items-center gap-4 px-7 py-5 bg-orange-50/60 dark:bg-orange-500/[0.04] border-b border-orange-100 dark:border-orange-500/[0.12]">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white shadow-lg shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-orange-600 dark:text-orange-400 mb-0.5">Section 2 · Legal Notice</p>
                  <h2 className="text-base sm:text-[17px] font-black text-gray-900 dark:text-white">Full Disclaimer</h2>
                </div>
              </div>
              <div className="px-7 py-6 space-y-4">
                {[
                  'The information and services provided by KoveTrade are intended for educational and informational purposes only and should not be construed as investment advice, financial advice, trading advice, or any other type of advice. KoveTrade does not recommend that any financial instrument should be bought, sold, or held by you.',
                  'Trading in financial instruments involves substantial risk and is not appropriate for every investor. The high degree of leverage that is often obtainable in financial trading can work against you as well as for you. The use of leverage can lead to large losses as well as gains.',
                  'Before deciding to trade any financial instrument, you should carefully consider your investment objectives, level of experience, and risk appetite. You should seek advice from an independent financial advisor if you have any doubts.',
                ].map((p, i) => (
                  <p key={i} className="text-[14px] sm:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed">{p}</p>
                ))}
                <div className="mt-2 flex items-start gap-3 rounded-2xl bg-orange-50 dark:bg-orange-500/[0.06] border border-orange-200 dark:border-orange-500/20 p-4">
                  <svg className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  <p className="text-[13px] text-orange-700 dark:text-orange-300 font-medium leading-relaxed">
                    The possibility exists that you could sustain a loss of some or all of your initial investment.
                    Only invest capital you can afford to lose entirely.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* §3 Performance Results */}
          <Reveal delay={0.07}>
            <div id="rd3" className="scroll-mt-20 rounded-3xl border border-amber-100 dark:border-amber-500/[0.15] overflow-hidden bg-white dark:bg-[#0c0d0f]">
              <div className="flex items-center gap-4 px-7 py-5 bg-amber-50/60 dark:bg-amber-500/[0.04] border-b border-amber-100 dark:border-amber-500/[0.12]">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-white shadow-lg shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-amber-600 dark:text-amber-400 mb-0.5">Section 3 · Limitations</p>
                  <h2 className="text-base sm:text-[17px] font-black text-gray-900 dark:text-white">Performance Results & Limitations</h2>
                </div>
              </div>
              <div className="px-7 py-6">
                {/* Large callout */}
                <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 p-5 mb-6">
                  <p className="text-white text-lg sm:text-xl font-black leading-snug mb-1">
                    &ldquo;Past performance is not necessarily indicative of future results.&rdquo;
                  </p>
                  <p className="text-amber-100 text-[12px]">— KoveTrade Risk Disclaimer, applicable to all displayed statistics</p>
                </div>
                <div className="space-y-4">
                  {[
                    { title: "Informational only", body: "Any performance data, statistics, or results presented on the KoveTrade platform are provided for informational purposes only and should not be relied upon as a guarantee of future performance." },
                    { title: "Simulated results", body: "Hypothetical or simulated performance results have inherent limitations. Unlike actual trading records, simulated results do not represent actual trading and may under- or over-compensate for the impact of certain market factors such as lack of liquidity." },
                    { title: "No profit guarantee", body: "No representation is being made that any account will or is likely to achieve profits or losses similar to those shown. Numerous factors related to the markets cannot be fully accounted for in the preparation of hypothetical performance results." },
                  ].map(({ title, body }) => (
                    <div key={title} className="flex gap-4">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                      <div>
                        <p className="text-[14px] font-bold text-gray-900 dark:text-white mb-1">{title}</p>
                        <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* §4 Risk Warnings */}
          <Reveal delay={0.09}>
            <div id="rd4" className="scroll-mt-20 rounded-3xl border border-red-100 dark:border-red-500/[0.18] overflow-hidden bg-white dark:bg-[#0c0d0f]">
              <div className="flex items-center gap-4 px-7 py-5 bg-red-50/70 dark:bg-red-500/[0.05] border-b border-red-100 dark:border-red-500/[0.14]">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white shadow-lg shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-red-600 dark:text-red-400 mb-0.5">Section 4 · Read Carefully</p>
                  <h2 className="text-base sm:text-[17px] font-black text-gray-900 dark:text-white">Risk Warnings</h2>
                </div>
                <WarnDot />
              </div>

              <div className="px-7 py-6">
                <p className="text-[14px] sm:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  Trading foreign exchange, CFDs, futures, options, and other leveraged products carries a significant
                  level of risk and may not be suitable for all investors. Be aware of the following:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {RISK_BULLETS.map(({ icon, t, b }) => (
                    <div
                      key={t}
                      className="relative flex items-start gap-4 rounded-2xl border border-red-100 dark:border-red-500/[0.14] bg-red-50/40 dark:bg-red-500/[0.04] p-5 overflow-hidden"
                    >
                      {/* Watermark */}
                      <span className="absolute top-2 right-3 text-4xl opacity-[0.08] select-none pointer-events-none">{icon}</span>
                      <span className="text-2xl shrink-0 mt-0.5">{icon}</span>
                      <div>
                        <p className="text-[13px] font-bold text-gray-900 dark:text-white mb-1">{t}</p>
                        <p className="text-[12px] text-gray-500 dark:text-gray-500 leading-relaxed">{b}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* §5 Important Notice */}
          <Reveal delay={0.11}>
            <div id="rd5" className="scroll-mt-20 rounded-3xl border border-green-100 dark:border-rose-500/[0.15] overflow-hidden bg-white dark:bg-[#0c0d0f]">
              <div className="flex items-center gap-4 px-7 py-5 bg-rose-50/60 dark:bg-rose-500/[0.04] border-b border-green-100 dark:border-rose-500/[0.12]">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#5edc1f] to-green-700 flex items-center justify-center text-white shadow-lg shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-rose-600 dark:text-lime-400 mb-0.5">Section 5 · Mandatory Disclosure</p>
                  <h2 className="text-base sm:text-[17px] font-black text-gray-900 dark:text-white">Important Notice</h2>
                </div>
              </div>
              <div className="px-7 py-6 space-y-5">
                {/* Mandatory CFD warning */}
                <div className="rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 p-5">
                  <p className="text-[11px] font-black text-red-200 uppercase tracking-widest mb-2">Mandatory Regulatory Warning</p>
                  <p className="text-white text-[14px] leading-relaxed font-medium">
                    CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage.
                    A significant percentage of retail investor accounts lose money when trading CFDs.
                    You should consider whether you understand how CFDs work and whether you can afford to take
                    the high risk of losing your money.
                  </p>
                </div>

                {[
                  'The content on the KoveTrade platform is not directed at residents of any country or jurisdiction where such distribution or use would be contrary to local law or regulation. It is your responsibility to ensure that your use of the KoveTrade platform complies with all applicable laws and regulations in your jurisdiction.',
                  'KoveTrade does not accept liability for any loss or damage, including without limitation any loss of profit, which may arise directly or indirectly from use of or reliance on the information provided on our platform. You are solely responsible for evaluating the merits and risks associated with any information, products, or services provided through KoveTrade.',
                ].map((p, i) => (
                  <p key={i} className="text-[14px] sm:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ── Acknowledgement strip ── */}
          <Reveal delay={0.13}>
            <div className="rounded-3xl border border-gray-200 dark:border-white/[0.07] bg-gray-100 dark:bg-white/[0.03] px-7 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-2xl bg-gray-200 dark:bg-white/[0.07] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-snug">
                  By using KoveTrade services you confirm you have read, understood, and accepted this Risk Disclaimer in its entirety.
                </p>
              </div>
              <Link
                href="/register"
                className="shrink-0 rounded-full bg-gray-900 dark:bg-white px-6 py-2.5 text-[12px] font-bold text-white dark:text-gray-900 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
              >
                I Understand — Get Started
              </Link>
            </div>
          </Reveal>

          {/* ── CTA ── */}
          <Reveal delay={0.15}>
            <div
              className="relative rounded-3xl overflow-hidden text-center p-8 sm:p-10 shadow-2xl"
              style={{ background: "linear-gradient(135deg, #7f1d1d 0%, #991b1b 40%, #b45309 100%)" }}
            >
              <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
              <div className="absolute -top-[30%] left-[20%] w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)" }} />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-3">Have questions about risk?</h3>
                <p className="text-red-200 text-[14px] max-w-sm mx-auto leading-relaxed mb-8">
                  We strongly encourage all users to understand the risks fully before engaging in any trading activity.
                  Our support team is here to help clarify any concerns.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="mailto:support@kovetrade.com"
                    className="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-red-800 hover:bg-red-50 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20 transition-all duration-300"
                  >
                    Contact Support
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
