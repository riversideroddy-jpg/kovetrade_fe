"use client";

import React, { useRef, useState } from "react";
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
    dir === "left"  ? { opacity: 0, x: -36, y: 0 }
    : dir === "right" ? { opacity: 0, x: 36, y: 0 }
    : dir === "none"  ? { opacity: 0 }
    : { opacity: 0, y: 38 };
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

// ─── Network Growth SVG ───────────────────────────────────────────
function BrokerNetwork() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  // Hub = broker, spokes = traders
  const traders = [0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return { cx: 130 + 80 * Math.cos(rad), cy: 130 + 80 * Math.sin(rad) };
  });

  return (
    <motion.div
      ref={ref}
      className="select-none flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: E }}
    >
      <svg viewBox="0 0 260 260" className="w-64 h-64 md:w-80 md:h-80" fill="none">
        {/* Outer ring */}
        <motion.circle cx="130" cy="130" r="118"
          stroke="rgba(94, 220, 31,0.12)" strokeWidth="1" strokeDasharray="5 8"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 38, ease: "linear" }}
          style={{ transformOrigin: "130px 130px" }}
        />

        {/* Spoke lines */}
        {traders.map((t, i) => (
          <motion.line key={i}
            x1="130" y1="130" x2={t.cx} y2={t.cy}
            stroke="rgba(94, 220, 31,0.2)" strokeWidth="1.5" strokeDasharray="4 3"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={inView ? { opacity: 1, pathLength: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8 + i * 0.08, duration: 0.5 }}
          />
        ))}

        {/* Data flow dots */}
        {traders.slice(0, 5).map((t, i) => (
          <motion.circle key={`flow-${i}`} r="4"
            fill="rgba(94, 220, 31,0.85)"
            animate={{
              cx: [130, t.cx, 130],
              cy: [130, t.cy, 130],
              opacity: [0, 1, 0],
            }}
            transition={{
              repeat: Infinity, duration: 2.5,
              delay: 1.5 + i * 0.55, ease: "easeInOut",
            }}
          />
        ))}

        {/* Trader nodes */}
        {traders.map((t, i) => (
          <motion.g key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ delay: 0.6 + i * 0.08, duration: 0.4, ease: E }}
            style={{ transformOrigin: `${t.cx}px ${t.cy}px` }}
          >
            <circle cx={t.cx} cy={t.cy} r="14"
              fill="rgba(94, 220, 31,0.08)" stroke="rgba(94, 220, 31,0.35)" strokeWidth="1.5"
            />
            <circle cx={t.cx} cy={t.cy} r="6" fill="rgba(94, 220, 31,0.5)" />
          </motion.g>
        ))}

        {/* Hub — broker */}
        <circle cx="130" cy="130" r="38" fill="rgba(4,6,18,0.9)" stroke="rgba(94, 220, 31,0.5)" strokeWidth="2" />
        <motion.circle cx="130" cy="130" r="44"
          stroke="rgba(94, 220, 31,0.15)" strokeWidth="1.5"
          animate={{ r: [38, 52, 38], opacity: [0.4, 0, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
        />

        {/* Hub icon — building */}
        <text x="130" y="126" fill="rgba(94, 220, 31,0.9)" fontSize="18" textAnchor="middle">🏦</text>
        <text x="130" y="143" fill="rgba(94, 220, 31,0.7)" fontSize="7.5" fontWeight="700" textAnchor="middle" fontFamily="monospace">BROKER</text>

        {/* KoveTrade badge top */}
        <motion.g
          animate={{ y: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
        >
          <rect x="87" y="30" width="86" height="20" rx="10"
            fill="rgba(4,6,18,0.95)" stroke="rgba(94, 220, 31,0.5)" strokeWidth="1.5"
          />
          <text x="130" y="44" fill="rgba(94, 220, 31,0.9)" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="monospace">KOVETRADE B2B</text>
        </motion.g>

        {/* Stats floating */}
        {[
          { x: 210, y: 80, v: "+100%", l: "Volume" },
          { x: 210, y: 185, v: "-60%",  l: "Churn" },
          { x: 45,  y: 185, v: "-40%",  l: "Acq. Cost" },
        ].map((s, i) => (
          <motion.g key={i}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
            transition={{ delay: 1.4 + i * 0.15, duration: 0.5, ease: E }}
            style={{ transformOrigin: `${s.x}px ${s.y}px` }}
          >
            <rect x={s.x - 28} y={s.y - 14} width="56" height="26" rx="8"
              fill="rgba(4,6,18,0.9)" stroke="rgba(94, 220, 31,0.35)" strokeWidth="1"
            />
            <text x={s.x} y={s.y - 2} fill="rgba(94, 220, 31,0.9)" fontSize="8" fontWeight="800" textAnchor="middle" fontFamily="monospace">{s.v}</text>
            <text x={s.x} y={s.y + 8} fill="rgba(94, 220, 31,0.5)" fontSize="5.5" textAnchor="middle" fontFamily="sans-serif">{s.l}</text>
          </motion.g>
        ))}
      </svg>
    </motion.div>
  );
}

// ─── Animated stat counter ────────────────────────────────────────
function StatBadge({ value, label, sub, delay = 0 }: {
  value: string; label: string; sub: string; delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="text-center p-5 rounded-2xl border border-[#5edc1f]/15 bg-[#5edc1f]/5 hover:border-[#5edc1f]/30 hover:bg-[#5edc1f]/10 transition-all">
        <p className="text-4xl font-black bg-gradient-to-r from-lime-400 to-lime-300 bg-clip-text text-transparent">{value}</p>
        <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
      </div>
    </Reveal>
  );
}

// ─── Timeline step ────────────────────────────────────────────────
function TimelineStep({ num, title, timing, body, icon, delay = 0, last = false }: {
  num: string; title: string; timing?: string; body: string; icon: string; delay?: number; last?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <div ref={ref} className="flex gap-5">
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          className="w-12 h-12 rounded-2xl border-2 border-[#5edc1f]/40 bg-[#5edc1f]/10 flex items-center justify-center text-xl"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.5, delay, ease: E }}
        >
          {icon}
        </motion.div>
        {!last && (
          <motion.div
            className="w-0.5 flex-1 mt-2 rounded-full bg-gradient-to-b from-[#5edc1f]/40 to-transparent min-h-[40px]"
            initial={{ scaleY: 0, transformOrigin: "top" }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.5, delay: delay + 0.25, ease: E }}
          />
        )}
      </div>
      <motion.div
        className="pb-10"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.6, delay: delay + 0.1, ease: E }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-black text-lime-400 font-mono">Step {num}</span>
          {timing && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#5edc1f]/15 text-green-300 border border-[#5edc1f]/25">{timing}</span>
          )}
        </div>
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">{body}</p>
      </motion.div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────
export default function BrokersPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 55]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#040610] text-gray-900 dark:text-white">
      <style>{`
        @keyframes br-a { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.06)} 66%{transform:translate(-14px,16px) scale(0.96)} }
        @keyframes br-b { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-22px,24px) scale(1.05)} }
        .br-a{animation:br-a 18s ease-in-out infinite}
        .br-b{animation:br-b 24s ease-in-out infinite}
      `}</style>

      {/* Aurora */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none hidden dark:block">
        <div className="br-a absolute top-[-10%] left-[-4%] w-[55vw] h-[55vw] rounded-full bg-green-700/12 blur-[130px]" />
        <div className="br-b absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-green-900/10 blur-[120px]" />
        <div className="br-a absolute top-[42%] left-[28%] w-[38vw] h-[38vw] rounded-full bg-green-900/7 blur-[140px]" style={{ animationDelay: "7s" }} />
      </div>

      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative pt-28 pb-24 px-4 overflow-hidden">
        {/* Circuit-board line texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025] hidden dark:block"
          style={{
            backgroundImage: `
              linear-gradient(rgba(94, 220, 31,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(94, 220, 31,1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial fade over grid */}
        <div className="absolute inset-0 pointer-events-none hidden dark:block"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, #040610 80%)" }}
        />

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left */}
            <motion.div style={{ y: heroY }}>
              <Reveal delay={0.05}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#5edc1f]/35 bg-[#5edc1f]/10 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                  <span className="text-xs text-green-300 font-medium tracking-wide">Broker Partnership Program</span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] mb-6">
                  Rewrite the Rules
                  <br />
                  of{" "}
                  <span className="bg-gradient-to-r from-lime-400 via-lime-300 to-green-300 bg-clip-text text-transparent">
                    Brokerage.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.18}>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8 max-w-md">
                  Be the first in your market to offer full copy trading capabilities. Partner with
                  KoveTrade, bring your traders on board, and restart your profits manifold.
                </p>
              </Reveal>

              {/* KPIs */}
              <Reveal delay={0.26}>
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {[
                    { v: "+100%", l: "Volume Boost" },
                    { v: "−60%",  l: "Client Churn" },
                    { v: "−40%",  l: "Acq. Cost" },
                  ].map((s, i) => (
                    <div key={i} className="text-center p-3 rounded-xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/[0.025]">
                      <p className="text-lg font-black bg-gradient-to-r from-lime-400 to-lime-300 bg-clip-text text-transparent">{s.v}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">{s.l}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.32}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-[#5edc1f] to-lime-400 text-gray-900 dark:text-white font-bold text-sm hover:from-lime-400 hover:to-lime-400 transition-all shadow-lg shadow-green-900/30"
                  >
                    Book a meeting with us
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <a
                    href="#why"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-gray-200 dark:border-white/12 text-white/80 font-semibold text-sm hover:bg-gray-100 dark:bg-white/6 transition-all"
                  >
                    See the benefits ↓
                  </a>
                </div>
              </Reveal>
            </motion.div>

            {/* Right */}
            <Reveal delay={0.2} dir="right">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#4cc015]/12 to-green-900/8 blur-2xl scale-110" />
                  <div className="relative rounded-3xl border border-[#5edc1f]/20 bg-gray-50 dark:bg-white/[0.02] p-8">
                    <BrokerNetwork />
                    <div className="mt-4 text-center">
                      <p className="text-xs text-gray-500 uppercase tracking-widest font-mono">B2B Infrastructure</p>
                      <p className="text-sm font-semibold text-green-300">Your Broker × KoveTrade Network</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Why Partner ──────────────────────────────────────────── */}
      <section id="why" className="py-20 px-4 border-t border-gray-100 dark:border-white/5 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className="text-xs text-lime-400 font-mono uppercase tracking-widest mb-3">Partnership Benefits</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Why Partner With{" "}
              <span className="bg-gradient-to-r from-lime-400 to-lime-300 bg-clip-text text-transparent">
                KoveTrade?
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xl mx-auto">
              Adaptation and acquisition are the best formula for automated growth.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: "📊",
                stat: "+100%",
                title: "Boost Trading Volume",
                body: "Increase trading volume by up to 100% and tap into entirely new revenue streams through social and copy trading.",
                color: "blue",
              },
              {
                icon: "🔗",
                stat: "−60%",
                title: "Enhance Client Retention",
                body: "Reduce client churn by 60% with our platform. Social trading builds loyalty and long-term engagement.",
                color: "cyan",
              },
              {
                icon: "🚀",
                stat: "New",
                title: "Expand Your Offerings",
                body: "Add social and signals trading alongside your existing capabilities — zero disruption to current infrastructure.",
                color: "blue",
              },
              {
                icon: "💡",
                stat: "−40%",
                title: "Lower Acquisition Cost",
                body: "Cut down client acquisition expenses by up to 40% through organic growth driven by copy trading communities.",
                color: "cyan",
              },
            ].map((c, i) => {
              const col = c.color === "blue"
                ? { border: "border-[#5edc1f]/20", bg: "bg-[#5edc1f]/5", glow: "bg-[#5edc1f]/15", stat: "from-lime-400 to-lime-300" }
                : { border: "border-lime-400/20", bg: "bg-lime-400/5", glow: "bg-lime-400/12", stat: "from-lime-300 to-lime-400" };
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className={`relative rounded-3xl border ${col.border} ${col.bg} p-7 h-full overflow-hidden group hover:scale-[1.02] transition-transform`}>
                    <div className={`absolute top-0 right-0 w-28 h-28 rounded-full ${col.glow} blur-2xl opacity-50 group-hover:opacity-100 transition-opacity`} />
                    <div className="relative">
                      <span className="text-3xl block mb-3">{c.icon}</span>
                      <p className={`text-3xl font-black bg-gradient-to-r ${col.stat} bg-clip-text text-transparent mb-2`}>{c.stat}</p>
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{c.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{c.body}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────── */}
      <section className="py-20 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-14 items-start">

            {/* Steps */}
            <div>
              <Reveal>
                <p className="text-xs text-lime-400 font-mono uppercase tracking-widest mb-3">Process</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-10">
                  How it{" "}
                  <span className="bg-gradient-to-r from-lime-400 to-lime-300 bg-clip-text text-transparent">
                    works.
                  </span>
                </h2>
              </Reveal>

              <TimelineStep
                num="1" icon="⚙️"
                title="Technical Setup"
                timing="7–9 days"
                body="Our integration team handles the full technical setup — API connections, white-label configuration, and platform testing. You're live in under two weeks."
                delay={0.05}
              />
              <TimelineStep
                num="2" icon="🎯"
                title="Launch Preparation"
                body="We work alongside your team on onboarding flows, marketing assets, and go-to-market strategy to ensure a successful launch with strong day-one adoption."
                delay={0.15}
              />
              <TimelineStep
                num="3" icon="🟢"
                title="Go Live"
                body="Your platform launches with full copy trading capabilities active. Our team provides continuous support, monitoring, and optimisation from day one."
                delay={0.25}
                last
              />

              <Reveal delay={0.35}>
                <Link
                  href="/affiliate"
                  className="inline-flex items-center gap-2 mt-2 text-sm font-semibold text-lime-400 hover:text-green-300 transition-colors"
                >
                  Become an affiliate →
                </Link>
              </Reveal>
            </div>

            {/* Timeline visual panel */}
            <Reveal delay={0.15} dir="right">
              <div className="sticky top-24 space-y-4">
                {/* Timeline visual card */}
                <div className="rounded-3xl border border-[#5edc1f]/20 bg-gradient-to-br from-green-950/40 to-green-950/20 p-8">
                  <p className="text-xs text-lime-400 font-mono uppercase tracking-widest mb-6">Onboarding Timeline</p>

                  <div className="space-y-4">
                    {[
                      { label: "Agreement & Kickoff",      days: "Day 1",    fill: 10 },
                      { label: "API Integration",          days: "Day 2–5",  fill: 45 },
                      { label: "QA & Testing",             days: "Day 6–9",  fill: 75 },
                      { label: "Launch Preparation",       days: "Day 10–12",fill: 88 },
                      { label: "Go Live 🟢",               days: "Day 14",   fill: 100 },
                    ].map((row, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-gray-700 dark:text-gray-300">{row.label}</span>
                          <span className="text-lime-400 font-mono">{row.days}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-white/6 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-[#5edc1f] to-lime-300"
                            initial={{ width: "0%" }}
                            whileInView={{ width: `${row.fill}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + i * 0.1, duration: 0.9, ease: E }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 rounded-2xl border border-[#5edc1f]/15 bg-[#5edc1f]/5">
                    <p className="text-xs font-semibold text-green-300 mb-1">⚡ Fastest in the industry</p>
                    <p className="text-xs text-gray-500">Full onboarding completed in as little as 14 days — from signed agreement to live platform.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── B2B Solutions ────────────────────────────────────────── */}
      <section className="py-20 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className="text-xs text-lime-400 font-mono uppercase tracking-widest mb-3">Solutions</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Our{" "}
              <span className="bg-gradient-to-r from-lime-400 to-lime-300 bg-clip-text text-transparent">
                B2B Solutions
              </span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🔌",
                title: "API Integration",
                body: "Seamlessly incorporate our copy trading technology into your existing trading infrastructure. Full REST and WebSocket API support with comprehensive documentation.",
                features: ["REST & WebSocket APIs", "Sandbox environment", "Dedicated tech support", "99.9% uptime SLA"],
                color: "blue",
              },
              {
                icon: "🛠️",
                title: "Custom Development",
                body: "We tailor our solutions specifically to your business needs, providing you with the freedom and flexibility to achieve your unique goals.",
                features: ["White-label branding", "Custom UI/UX design", "Feature customisation", "Regulatory compliance"],
                color: "cyan",
                highlight: true,
              },
              {
                icon: "📣",
                title: "Marketing & Sales Support",
                body: "Benefit from our expertise in social trader acquisition and retention to help you maximize your customer base and revenue effectively.",
                features: ["Go-to-market strategy", "Creative assets library", "Co-branded campaigns", "Conversion optimisation"],
                color: "blue",
              },
            ].map((s, i) => {
              const col = s.color === "blue"
                ? { border: "border-[#5edc1f]/20", bg: "bg-[#5edc1f]/5", pill: "bg-[#5edc1f]/15 text-green-300 border-[#5edc1f]/25" }
                : { border: "border-lime-400/25", bg: "bg-lime-400/8", pill: "bg-lime-400/15 text-lime-300 border-lime-400/25" };
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className={`relative rounded-3xl border p-8 h-full ${s.highlight ? "border-lime-400/30 bg-gradient-to-br from-green-950/50 to-green-950/30" : `${col.border} ${col.bg}`}`}>
                    {s.highlight && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#5edc1f] to-lime-400 text-gray-900 dark:text-white text-[10px] font-bold uppercase tracking-wider">
                        Most Popular
                      </div>
                    )}
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#5edc1f]/8 blur-3xl pointer-events-none" />
                    <div className="relative">
                      <span className="text-3xl block mb-4">{s.icon}</span>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{s.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">{s.body}</p>
                      <div className="space-y-2">
                        {s.features.map((f, j) => (
                          <div key={j} className="flex items-center gap-2">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${col.pill} font-medium`}>✓</span>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{f}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────── */}
      <section className="py-16 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <StatBadge value="14"    label="Days to Go Live"     sub="From signed agreement"       delay={0.05} />
            <StatBadge value="99.9%" label="Platform Uptime SLA" sub="Guaranteed availability"     delay={0.12} />
            <StatBadge value="24/7"  label="Partner Support"     sub="Dedicated partner desk"      delay={0.19} />
            <StatBadge value="4+"    label="Regulated Markets"   sub="EU, UK, USA, Middle East"    delay={0.26} />
          </div>
        </div>
      </section>

      {/* ── Transform CTA ────────────────────────────────────────── */}
      <section className="py-16 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">

            {/* Main CTA */}
            <Reveal dir="left">
              <div className="relative rounded-3xl overflow-hidden border border-[#5edc1f]/25 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-green-950/80 via-green-950/60 to-green-950/50" />
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#5edc1f]/12 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-lime-400/10 blur-3xl" />

                {/* Animated connection lines */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[20, 50, 80].map((left, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-px bg-gradient-to-b from-transparent via-lime-400/30 to-transparent"
                      style={{ left: `${left}%`, height: "100%" }}
                      animate={{ y: ["-100%", "100%"] }}
                      transition={{ repeat: Infinity, duration: 4 + i * 0.8, delay: i * 1.2, ease: "linear" }}
                    />
                  ))}
                </div>

                <div className="relative p-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#5edc1f]/15 border border-[#5edc1f]/30 flex items-center justify-center mx-auto mb-5 text-2xl">
                    🏦
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
                    Ready to transform your{" "}
                    <span className="bg-gradient-to-r from-lime-400 to-lime-300 bg-clip-text text-transparent">
                      Brokerage?
                    </span>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 text-center">
                    Join the leading brokers who have already partnered with KoveTrade.
                    Let's grow together.
                  </p>
                  <div className="flex justify-center">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#5edc1f] to-lime-400 text-gray-900 dark:text-white font-bold text-sm hover:from-lime-400 hover:to-lime-400 transition-all shadow-lg shadow-green-900/30"
                    >
                      Get started now →
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Contact card */}
            <Reveal delay={0.1} dir="right">
              <div className="rounded-3xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/[0.025] p-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-white/6 border border-gray-200 dark:border-white/10 flex items-center justify-center text-xl mb-6">
                    📬
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Contact Us</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                    Have questions about our broker partnership program? Reach out to our partnerships
                    team and we'll get back to you within 24 hours.
                  </p>
                </div>

                <div className="space-y-3">
                  <a
                    href="mailto:support@kovetrade.com"
                    className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-[#5edc1f]/20 bg-[#5edc1f]/6 hover:bg-[#5edc1f]/12 hover:border-[#5edc1f]/35 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#5edc1f]/15 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-lime-400" fill="none" viewBox="0 0 20 20">
                        <path d="M3 5h14v11a1 1 0 01-1 1H4a1 1 0 01-1-1V5zm0 0l7 6 7-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email our team</p>
                      <p className="text-sm font-semibold text-green-300 group-hover:text-green-200 transition-colors">support@kovetrade.com</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-600 group-hover:text-lime-400 transition-colors ml-auto" fill="none" viewBox="0 0 16 16">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>

                  <Link
                    href="/contact"
                    className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/[0.02] hover:bg-gray-100 dark:bg-white/6 hover:border-white/15 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/8 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 20 20">
                        <path d="M4 5h12M4 10h12M4 15h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Book a meeting</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-gray-200 transition-colors">Schedule a call with our team</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors ml-auto" fill="none" viewBox="0 0 16 16">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>

                  <div className="pt-2 text-center">
                    <p className="text-xs text-gray-600">We respond within <span className="text-lime-400 font-semibold">24 hours</span> on business days.</p>
                  </div>
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
