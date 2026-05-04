"use client";

import React, { useRef, useEffect, useState } from "react";
import { Zap, Shield, BarChart2, Globe, Rocket, Monitor, Eye, SlidersHorizontal, Layers, Headphones, BookOpen, Sparkles } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

// ─────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────
const E = [0.16, 1, 0.3, 1] as const; // ease‑out expo

// ─────────────────────────────────────────
// PRIMITIVES
// ─────────────────────────────────────────

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
  const from = {
    up:    { opacity: 0, y: 40, x: 0  },
    left:  { opacity: 0, x: -52, y: 0 },
    right: { opacity: 0, x: 52,  y: 0 },
    none:  { opacity: 0, y: 0,   x: 0 },
  }[dir];
  return (
    <motion.div
      ref={ref}
      initial={from}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : from}
      transition={{ duration: 0.82, delay, ease: E }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GsapNum({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const obj = { v: 0 };
    gsap.to(obj, {
      v: to,
      duration: 2.4,
      ease: "power3.out",
      onUpdate: () => setN(Math.round(obj.v)),
    });
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

/** SVG sparkline chart with animated draw-in */
function Sparkline({
  data,
  positive = true,
  w = 160,
  h = 52,
}: {
  data: number[];
  positive?: boolean;
  w?: number;
  h?: number;
}) {
  const color = positive ? "#10b981" : "#ef4444";
  const min = Math.min(...data);
  const max = Math.max(...data);
  const rng = max - min || 1;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * w,
    h - ((v - min) / rng) * (h - 6) - 3,
  ] as [number, number]);
  const d = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${d} L${w},${h} L0,${h} Z`;
  const uid = positive ? "sp" : "sn";
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <defs>
        <linearGradient id={uid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${uid})`} />
      <motion.path
        d={d}
        stroke={color}
        strokeWidth="1.75"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.4 }}
      />
    </svg>
  );
}

// ─────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────
export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <div className="overflow-x-hidden bg-white dark:bg-[#070809] text-gray-900 dark:text-white">
      <Navbar />
      <HeroSection />
      <MarqueeTicker />
      <AboutSection />
      <UniqueSection />
      <PlatformSection />
      <HowItWorksSection />
      <TopTradersSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <TrustedBrandsSection />
      <Footer />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// §1  HERO
// ═══════════════════════════════════════════════════════════════

/** The hero trading card — built entirely in JSX, no images */
function HeroCard() {
  const [copied, setCopied] = useState(false);

  const RECENT_TRADES = [
    { symbol: "NVDA", side: "BUY",  gain: "+4.7%", time: "2m ago" },
    { symbol: "AAPL", side: "BUY",  gain: "+1.2%", time: "18m ago" },
    { symbol: "TSLA", side: "SELL", gain: "+3.1%", time: "1h ago" },
  ];

  return (
    <div className="relative select-none">
      {/* ── Main card ── */}
      <motion.div
        className="relative w-[290px] md:w-[320px] lg:w-[340px] rounded-3xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/[0.07] shadow-[0_32px_72px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_72px_rgba(0,0,0,0.7)] overflow-hidden"
        initial={{ opacity: 0, y: 48, scale: 0.94 }}
        animate={{ opacity: 1, y: 0,  scale: 1     }}
        transition={{ duration: 1.1, delay: 0.55, ease: E }}
      >
        {/* ── Premium header band ── */}
        <div className="relative px-5 pt-5 pb-4 bg-gradient-to-br from-[#1a4d1b] via-[#0f3010] to-[#071a08]">
          {/* Subtle grid on header */}
          <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "linear-gradient(rgba(94,220,31,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(94,220,31,.5) 1px,transparent 1px)", backgroundSize: "20px 20px" }} />
          {/* Glow blob */}
          <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-[#5edc1f]/20 blur-2xl pointer-events-none" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Avatar with live pulse ring */}
              <div className="relative shrink-0">
                <div className="w-11 h-11 rounded-2xl overflow-hidden ring-2 ring-[#5edc1f]/50">
                  <Image src="https://i.pravatar.cc/150?img=11" alt="Alex Thompson" width={44} height={44} className="w-full h-full object-cover" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0f3010]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <p className="text-sm font-bold text-white leading-none">Alex Thompson</p>
                  {/* Verified checkmark */}
                  <svg className="w-3.5 h-3.5 text-[#5edc1f] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#5edc1f] bg-[#5edc1f]/15 border border-[#5edc1f]/25 rounded-full px-2 py-0.5">
                  <span className="w-1 h-1 rounded-full bg-[#5edc1f] animate-pulse" />
                  Elite Trader
                </span>
              </div>
            </div>
            {/* 12M return hero number */}
            <div className="text-right">
              <p className="text-[22px] font-black text-[#5edc1f] leading-none">+127.4%</p>
              <p className="text-[9px] text-white/50 uppercase tracking-widest mt-0.5">12M Return</p>
            </div>
          </div>

          {/* Two key metrics */}
          <div className="relative mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-white/[0.07] border border-white/[0.08] px-3 py-2">
              <p className="text-[10px] text-white/50 uppercase tracking-wide mb-0.5">Copiers</p>
              <p className="text-sm font-black text-white">4,291</p>
            </div>
            <div className="rounded-xl bg-white/[0.07] border border-white/[0.08] px-3 py-2">
              <p className="text-[10px] text-white/50 uppercase tracking-wide mb-0.5">Risk Score</p>
              <p className="text-sm font-black text-[#5edc1f]">Low 2/10</p>
            </div>
          </div>
        </div>

        {/* ── Live trade feed ── */}
        <div className="px-5 py-4">
          <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Recent Trades
          </p>
          <div className="space-y-2">
            {RECENT_TRADES.map(({ symbol, side, gain, time }) => (
              <div key={symbol + time} className="flex items-center justify-between rounded-xl bg-gray-50 dark:bg-zinc-800/60 border border-gray-100/80 dark:border-white/[0.05] px-3 py-2">
                <div className="flex items-center gap-2.5">
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${side === "BUY" ? "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" : "bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400"}`}>
                    {side}
                  </span>
                  <span className="text-xs font-bold text-gray-900 dark:text-white">{symbol}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">{gain}</span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-600">{time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Copy button */}
          <motion.button
            onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2500); }}
            className={`mt-4 w-full rounded-2xl py-3.5 text-sm font-bold transition-all duration-300 ${
              copied
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                : "bg-[#5edc1f] hover:bg-[#4cc015] text-gray-900 shadow-lg shadow-[#5edc1f]/30 hover:shadow-[#4cc015]/40 hover:-translate-y-0.5"
            }`}
            whileTap={{ scale: 0.97 }}
          >
            {copied ? "✓  Copying Now" : "Copy This Trader"}
          </motion.button>
        </div>
      </motion.div>

      {/* ── Floating notification: profit ── */}
      <motion.div
        className="absolute -top-5 -right-3 rounded-2xl bg-emerald-500 px-4 py-2.5 shadow-xl shadow-emerald-500/30"
        initial={{ opacity: 0, scale: 0.6, y: 12 }}
        animate={{ opacity: 1, scale: 1,   y: 0  }}
        transition={{ delay: 1.7, duration: 0.5, ease: E }}
      >
        <p className="text-white text-[12px] font-bold leading-none">+$1,247 profit</p>
        <p className="text-emerald-200 text-[10px] mt-0.5">Last 30 days</p>
      </motion.div>

      {/* ── Floating NVDA mini card ── */}
      <motion.div
        className="absolute -bottom-6 -left-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/[0.08] px-4 py-3 shadow-2xl shadow-black/10 dark:shadow-black/60"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1,  x: 0  }}
        transition={{ delay: 2, duration: 0.6, ease: E }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#5edc1f]/10 dark:bg-[#5edc1f]/15 flex items-center justify-center shrink-0">
            <span className="text-[10px] font-black text-[#5edc1f]">NVDA</span>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 mb-0.5">NVDA · Copied</p>
            <p className="text-sm font-black text-gray-900 dark:text-white leading-none">$875.40</p>
          </div>
          <span className="ml-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">+4.7%</span>
        </div>
      </motion.div>

      {/* ── Floating second trader card ── */}
      <motion.div
        className="absolute top-[45%] -right-16 hidden xl:flex items-center gap-3 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/[0.07] px-4 py-3 shadow-xl shadow-black/8 dark:shadow-black/50"
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1,  x: 0  }}
        transition={{ delay: 2.2, duration: 0.6, ease: E }}
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#5edc1f] to-green-700 flex items-center justify-center text-white text-xs font-black shrink-0">
          SL
        </div>
        <div>
          <p className="text-[11px] font-bold text-gray-900 dark:text-white leading-none mb-0.5">Sophie Laurent</p>
          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">+89.2% this year</p>
        </div>
      </motion.div>
    </div>
  );
}

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* ── Light mode background ── */}
      <div className="absolute inset-0 pointer-events-none dark:hidden">
        <div
          className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-[0.10]"
          style={{ background: "radial-gradient(circle, #5edc1f 0%, transparent 62%)" }}
        />
        <div
          className="absolute bottom-[0%] left-[5%] w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #4cc015 0%, transparent 62%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* ── Dark mode background ── */}
      <div className="absolute inset-0 pointer-events-none hidden dark:block">
        <div
          className="aurora-a absolute -top-[25%] -left-[5%] w-[800px] h-[800px] rounded-full"
          style={{ background: "radial-gradient(circle, #2d6a0a 0%, transparent 60%)" }}
        />
        <div
          className="aurora-b absolute -bottom-[15%] right-[5%] w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, #166534 0%, transparent 60%)" }}
        />
        <div
          className="aurora-c absolute top-[35%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, #14532d 0%, transparent 60%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl w-full px-4 sm:px-6 lg:px-8 pt-28 pb-20 sm:pt-36 sm:pb-24 lg:pt-44 lg:pb-28">
        <motion.div style={{ y: yText }} className="flex flex-col items-center text-center">

          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-green-200 dark:border-[#5edc1f]/20 bg-green-50 dark:bg-[#5edc1f]/[0.08] px-3 sm:px-4 py-2 mb-8 whitespace-nowrap max-w-full overflow-hidden"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: E }}
          >
            <span className="relative flex w-2 h-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-50" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-green-700 dark:text-green-300 tracking-wide whitespace-nowrap">
              Copy Trading Platform · Trusted by 50M+ Traders
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-black leading-[1.06] tracking-tight mb-6 text-gray-900 dark:text-white"
            style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.2rem)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.82, delay: 0.1, ease: E }}
          >
            Invest Like the{" "}
            <span className="text-gradient-animate">World&apos;s Best</span>
            <br className="hidden sm:block" />
            {" "}Traders.
          </motion.h1>

          {/* Sub */}
          <motion.p
            className="text-base sm:text-lg lg:text-xl text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: E }}
          >
            Copy real trades automatically from top-performing investors.
            Start in minutes — no experience required. Your portfolio grows
            while they trade.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14 sm:mb-16"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease: E }}
          >
            <Link
              href="/register"
              className="group relative overflow-hidden rounded-full bg-[#4cc015] px-10 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#4cc015]/35 min-w-[180px] text-center"
            >
              <span className="relative z-10">Get Started Free</span>
              <span className="absolute inset-0 bg-gradient-to-r from-green-700 to-[#5edc1f] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.03] px-10 py-4 text-sm font-bold text-gray-700 dark:text-white transition-all duration-300 hover:border-green-300 dark:hover:border-[#5edc1f]/40 hover:-translate-y-0.5 min-w-[180px]"
            >
              Explore Traders
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-y-5 gap-x-8 sm:gap-x-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.42 }}
          >
            {[
              { v: "4.8★", l: "App Store Rating" },
              { v: "50M+", l: "Active Users"      },
              { v: "40+",  l: "Countries"          },
              { v: "$2.4B", l: "Volume Copied"    },
            ].map(({ v, l }, i) => (
              <React.Fragment key={l}>
                <div className="text-center">
                  <p className="text-2xl font-black text-gray-900 dark:text-white leading-none mb-1">{v}</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-500 uppercase tracking-wide">{l}</p>
                </div>
                {i < 3 && <div className="hidden sm:block w-px h-8 bg-gray-200 dark:bg-white/[0.08]" />}
              </React.Fragment>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// §2  MARQUEE TICKER
// ═══════════════════════════════════════════════════════════════
const TICKS = [
  { s: "AAPL",  p: "$213.49",  c: "+0.9%",  up: true  },
  { s: "TSLA",  p: "$412.23",  c: "+3.2%",  up: true  },
  { s: "MSFT",  p: "$421.80",  c: "+1.1%",  up: true  },
  { s: "NVDA",  p: "$875.40",  c: "+4.7%",  up: true  },
  { s: "AMZN",  p: "$185.62",  c: "+1.4%",  up: true  },
  { s: "GOOGL", p: "$174.30",  c: "−0.3%",  up: false },
  { s: "META",  p: "$517.91",  c: "+2.1%",  up: true  },
  { s: "NFLX",  p: "$648.20",  c: "+0.8%",  up: true  },
  { s: "AMD",   p: "$162.45",  c: "−0.7%",  up: false },
  { s: "V",     p: "$276.88",  c: "+0.5%",  up: true  },
  { s: "JPM",   p: "$198.34",  c: "+0.3%",  up: true  },
  { s: "WMT",   p: "$68.15",   c: "+0.4%",  up: true  },
  { s: "DIS",   p: "$111.72",  c: "−0.6%",  up: false },
  { s: "UBER",  p: "$74.30",   c: "+1.9%",  up: true  },
  { s: "SPOT",  p: "$312.50",  c: "+2.5%",  up: true  },
];

function MarqueeTicker() {
  return (
    <div className="relative overflow-hidden bg-gray-950 border-y border-gray-800 py-3.5">
      <div className="absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-gray-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-gray-950 to-transparent z-10 pointer-events-none" />
      <div className="flex marquee-left">
        {[...TICKS, ...TICKS].map(({ s, p, c, up }, i) => (
          <div key={i} className="flex items-center gap-2.5 shrink-0 px-6">
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${up ? "bg-emerald-500" : "bg-red-500"}`} />
            <span className="text-[12px] font-semibold text-gray-400 tracking-wide">{s}</span>
            <span className="text-[12px] font-black text-white">{p}</span>
            <span className={`text-[11px] font-bold ${up ? "text-emerald-400" : "text-red-400"}`}>{c}</span>
            <span className="w-px h-3.5 bg-gray-700 ml-3" />
          </div>
        ))}
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════
// §  LIQUIDITY PROVIDERS
// ═══════════════════════════════════════════════════════════════

const LP_ROW_1 = ["Alfa_bank","Banco_de_brazil","Bank_of_ireland","Bank_of_montreal","Bank_of_america","Bank_of_china","Bank_of_scotland","Bawag","Bayern_LB","BBVA","BCV","BNP_Paribas","Citibank","Barclays","HSBC","JP_morgan","Basler_kantonalbank","The_royal_bank_of_scotland","UBS","Westpac_australia_first_bank","merrill","Abbey","ABN_mro","ADCB"];
const LP_ROW_2 = ["DNB_asa","DZ_bank","Eco_bank","Erste_bank","Fifth_third_bank","Fortis","Goldman_sachs","Handelsbanken","Helaba","Berenberg","BHF_bank","CIBC","Citizens_bank_logo","Commerzbank","Credit_agricole","Credit_europe_bank","Credit_suisse","Danske_bank","DBS_bank","Dexia_banque"];
const LP_ROW_3 = ["Societe_generale","HSH_nordbank","ING","Intesa_san_paolo","Investec","Itau","LGT","Mizuho","MUFG","Nedbank","Nomura","Nordea","Oberbank","Post_finance","Postbank","Rabobank","Raiffeisen_bank_russia","RBC","Scotia_bank","SEB"];

const LP_POSITIONS: Record<string, string> = {
  Abbey:"0 0",ABN_mro:"0 -2.5625rem",ADCB:"0 -5.125rem",Alfa_bank:"0 -7.6875rem",
  Banco_de_brazil:"-13.1875rem 0",Bank_of_america:"-13.1875rem -2.5625rem",Bank_of_china:"-13.1875rem -5.125rem",Bank_of_ireland:"-13.1875rem -7.6875rem",Bank_of_montreal:"-13.1875rem -10.25rem",
  Bank_of_scotland:"0 -12.8125rem",Barclays:"-13.1875rem -12.8125rem",Basler_kantonalbank:"0 -15.375rem",Bawag:"-13.1875rem -15.375rem",Bayern_LB:"0 -17.9375rem",BBVA:"-13.1875rem -17.9375rem",BCV:"0 -20.5rem",
  Berenberg:"-13.1875rem -20.5rem",BHF_bank:"0 -23.0625rem",BNP_Paribas:"-13.1875rem -23.0625rem",
  CIBC:"-26.375rem 0",Citibank:"-26.375rem -2.5625rem",Citizens_bank_logo:"-26.375rem -5.125rem",Commerzbank:"-26.375rem -7.6875rem",Credit_agricole:"-26.375rem -10.25rem",Credit_europe_bank:"-26.375rem -12.8125rem",Credit_suisse:"-26.375rem -15.375rem",Danske_bank:"-26.375rem -17.9375rem",DBS_bank:"-26.375rem -20.5rem",Dexia_banque:"-26.375rem -23.0625rem",
  DNB_asa:"0 -25.625rem",DZ_bank:"-13.1875rem -25.625rem",Eco_bank:"-26.375rem -25.625rem",Erste_bank:"0 -28.1875rem",Fifth_third_bank:"-13.1875rem -28.1875rem",Fortis:"-26.375rem -28.1875rem",Goldman_sachs:"0 -30.75rem",Handelsbanken:"-13.1875rem -30.75rem",Helaba:"-26.375rem -30.75rem",
  HSBC:"0 -33.3125rem",HSH_nordbank:"-13.1875rem -33.3125rem",ING:"-26.375rem -33.3125rem",Intesa_san_paolo:"0 -35.875rem",Investec:"-13.1875rem -35.875rem",Itau:"-26.375rem -35.875rem",
  JP_morgan:"-39.5625rem 0",LGT:"-39.5625rem -2.5625rem",merrill:"-39.5625rem -5.125rem",Mizuho:"-39.5625rem -7.6875rem",MUFG:"-39.5625rem -10.25rem",Nedbank:"-39.5625rem -12.8125rem",Nomura:"-39.5625rem -15.375rem",Nordea:"-39.5625rem -17.9375rem",Oberbank:"-39.5625rem -20.5rem",Post_finance:"-39.5625rem -25.625rem",Postbank:"-39.5625rem -28.1875rem",Rabobank:"-39.5625rem -30.75rem",Raiffeisen_bank_russia:"-39.5625rem -33.3125rem",RBC:"-39.5625rem -35.875rem",
  Scotia_bank:"0 -38.4375rem",SEB:"-13.1875rem -38.4375rem",Societe_generale:"-26.375rem -38.4375rem",The_royal_bank_of_scotland:"-39.5625rem -38.4375rem",UBS:"0 -41rem",Westpac_australia_first_bank:"-13.1875rem -41rem",
};

function LpLogo({ name }: { name: string }) {
  return (
    <div className="flex-shrink-0 px-3 py-4">
      <div className="w-[160px] md:w-[220px] h-[48px] md:h-[70px] bg-white rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 w-[210px] h-[40px] -translate-x-1/2 -translate-y-1/2 scale-[0.58] md:scale-[0.78]"
          style={{
            backgroundImage: "url(/logos_au.png)",
            backgroundSize: "52.75rem 43.5625rem",
            backgroundPosition: LP_POSITIONS[name] ?? "0 0",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
    </div>
  );
}

function TrustedBrandsSection() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animateRow = (el: HTMLDivElement, speed: number, dir: "ltr" | "rtl") => {
      let x = 0;
      let prev: number;
      const tick = (ts: number) => {
        const dt = prev ? ts - prev : 0;
        prev = ts;
        const firstChild = el.children[0] as HTMLElement | null;
        if (!firstChild) return;
        if (x > firstChild.getBoundingClientRect().width) {
          dir === "ltr" ? el.appendChild(firstChild) : el.insertBefore(el.lastElementChild!, el.firstElementChild);
          x = 0;
        } else {
          x += (speed / 1000) * dt;
        }
        el.style.transform = `translateX(${dir === "rtl" ? x : -x}px)`;
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if (row1Ref.current) animateRow(row1Ref.current, 50, "ltr");
    if (row2Ref.current) animateRow(row2Ref.current, 45, "rtl");
    if (row3Ref.current) animateRow(row3Ref.current, 40, "ltr");
  }, []);

  return (
    <section className="py-12 sm:py-20 bg-gray-950 relative overflow-hidden">
      {/* Subtle blue glow blobs */}
      <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-[#4cc015]/[0.06] blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-[400px] h-[400px] rounded-full bg-lime-400/[0.05] blur-[100px] pointer-events-none" />
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center mb-10 sm:mb-14">
        <Reveal>
          <p className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-lime-400 mb-4">
            <span className="w-5 h-px bg-lime-400" />
            Institutional Grade
          </p>
          <h2
            className="font-black tracking-tight leading-[1.08] bg-gradient-to-r from-lime-400 via-lime-300 to-[#5edc1f] bg-clip-text text-transparent"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            Liquidity Providers
          </h2>
          <p className="mt-4 text-[15px] text-gray-400 max-w-xl mx-auto leading-relaxed">
            KoveTrade connects to a deep pool of tier-1 banks and prime brokers,
            keeping spreads ultra-tight around the clock.
          </p>
        </Reveal>
      </div>

      {/* Logo rows */}
      <div
        className="overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent 0%, white 12%, white 88%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, white 12%, white 88%, transparent 100%)",
        }}
      >
        <div className="overflow-hidden mb-1">
          <div ref={row1Ref} className="flex">
            {[...LP_ROW_1, ...LP_ROW_1].map((n, i) => <LpLogo key={`r1-${i}`} name={n} />)}
          </div>
        </div>
        <div className="overflow-hidden mb-1">
          <div ref={row2Ref} className="flex flex-row-reverse">
            {[...LP_ROW_2, ...LP_ROW_2].map((n, i) => <LpLogo key={`r2-${i}`} name={n} />)}
          </div>
        </div>
        <div className="overflow-hidden">
          <div ref={row3Ref} className="flex">
            {[...LP_ROW_3, ...LP_ROW_3].map((n, i) => <LpLogo key={`r3-${i}`} name={n} />)}
          </div>
        </div>
      </div>

      {/* CTA */}
      <Reveal className="relative z-10 mt-12 sm:mt-16 text-center px-4">
        <h3
          className="font-black text-white leading-tight mb-2"
          style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)" }}
        >
          Instant account opening &amp; funding
        </h3>
        <p className="text-gray-400 text-base mb-8">Trade within minutes.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/register"
            className="rounded-full bg-gradient-to-r from-[#4cc015] to-[#5edc1f] px-9 py-3.5 text-sm font-bold text-white hover:from-[#5edc1f] hover:to-lime-400 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#5edc1f]/30 transition-all duration-300"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-white/20 px-9 py-3.5 text-sm font-bold text-white hover:bg-white/[0.07] hover:border-white/35 hover:-translate-y-0.5 transition-all duration-300"
          >
            Trade Now
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// §  WHAT MAKES US UNIQUE
// ═══════════════════════════════════════════════════════════════

const UNIQUE_PILLARS = [
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Transparent Options Copying",
    body: "See exactly what you're mirroring—ticker, strategy, side (call/put), strike, expiry, entry/exit premium, size, and timestamps—plus a clear history of each leader's performance and drawdowns.",
    accent: "from-[#5edc1f] to-green-700",
    glow: "bg-[#5edc1f]/10",
  },
  {
    icon: <SlidersHorizontal className="w-6 h-6" />,
    title: "Advanced Tools for Contracts",
    body: "Dial in risk before you copy: per-trade caps, %-of-equity allocation, max contracts, slippage guard, chain filters, and auto-hedge toggles for volatile names.",
    accent: "from-[#5edc1f] to-green-700",
    glow: "bg-[#5edc1f]/10",
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Innovative Execution for Multi-Legs",
    body: "Copy complex structures as a unit: verticals, calendars, iron condors, butterflies. We sync legs, preserve ratios, and apply best-effort routing.",
    accent: "from-emerald-500 to-teal-600",
    glow: "bg-emerald-500/10",
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: "Trader-Centric Support",
    body: "Human help when it matters—real people on chat, phone, and email for account linking, order settings, and contract-specific questions.",
    accent: "from-amber-500 to-orange-500",
    glow: "bg-amber-500/10",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Learn While You Copy",
    body: "Leaders attach notes, rationale, and risk context to each trade. Use strategy tags and post-trade debriefs to sharpen your own playbook.",
    accent: "from-[#5edc1f] to-green-700",
    glow: "bg-[#5edc1f]/10",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Unique Options Features",
    body: "AutoGuard™: optional auto-TP/SL by premium, % move, or delta. Smart protections built right into every trade you copy.",
    accent: "from-lime-400 to-[#5edc1f]",
    glow: "bg-lime-400/10",
  },
];

function UniqueSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gray-950 overflow-hidden relative">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Glow blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#4cc015]/[0.07] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-green-900/[0.07] blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <Reveal className="text-center mb-14 lg:mb-20">
          <h2
            className="font-black tracking-tight text-white leading-[1.08]"
            style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.4rem)" }}
          >
            What makes{" "}
            <span className="bg-gradient-to-r from-lime-400 via-lime-300 to-[#5edc1f] bg-clip-text text-transparent">
              US
            </span>{" "}
            different?
          </h2>
          <p className="mt-4 text-[15px] text-gray-400 max-w-xl mx-auto leading-relaxed">
            The most advanced copy trading platform with enterprise-grade security and lightning-fast execution.
          </p>
        </Reveal>

        {/* 4 pillars grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {UNIQUE_PILLARS.map(({ icon, title, body, accent, glow }, i) => (
            <Reveal key={title} delay={0.1 * i}>
              <div className="group relative flex flex-col h-full rounded-3xl border border-white/[0.07] bg-white/[0.03] p-7 overflow-hidden transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.06] hover:-translate-y-2 cursor-default">
                {/* Hover gradient wash */}
                <div className={`absolute inset-0 ${glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                {/* Icon */}
                <div className={`relative z-10 w-12 h-12 rounded-2xl bg-gradient-to-br ${accent} flex items-center justify-center text-white shadow-lg mb-6 shrink-0`}>
                  {icon}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-[15px] font-bold text-white leading-snug mb-3">{title}</h3>
                  <p className="text-[13px] text-gray-400 leading-relaxed">{body}</p>
                </div>

                {/* Decorative number watermark */}
                <span className="absolute bottom-4 right-5 text-[5rem] font-black leading-none text-white/[0.03] select-none pointer-events-none">
                  {i + 1}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// §4  HOW IT WORKS
// ═══════════════════════════════════════════════════════════════
const ACCOUNT_STEPS = [
  {
    n: 1,
    title: "Register",
    body: "Select your preferred account type and swiftly complete our secure registration form.",
    video: "/videos/video-1.mp4",
  },
  {
    n: 2,
    title: "Verify Account",
    body: "Utilize our digital onboarding system for swift and secure verification.",
    video: "/videos/video-2.mp4",
  },
  {
    n: 3,
    title: "Fund Account",
    body: "Deposit funds into your trading account through an extensive array of funding methods.",
    video: "/videos/video-3.mp4",
  },
  {
    n: 4,
    title: "Copy Traders",
    body: "Choose a plan, start copying top traders and mirror their moves while they trade.",
    video: "/videos/video-4.mp4",
  },
];

// ═══════════════════════════════════════════════════════════════
// §X  ABOUT
// ═══════════════════════════════════════════════════════════════

const ABOUT_PERKS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    text: "Raw spreads from 0.0 pips",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    text: "Diverse and proprietary liquidity mix keeps spreads tight 24/5",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    text: "Fastest trade execution speed under 25ms",
  },
];

/** Phone mockups using the real trade-duplicate screenshot */
function PhoneMockups() {
  return (
    <div className="relative flex items-center justify-center select-none">
      {/* Glow blob behind the image */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="w-80 h-80 bg-[#5edc1f]/10 dark:bg-[#5edc1f]/20 rounded-full blur-[100px]" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="/images/trade-duplicate.png"
          alt="KoveTrade platform — trading chart and Buy/Sell interface"
          width={640}
          height={720}
          className="w-full max-w-sm lg:max-w-md object-contain drop-shadow-2xl"
        />
      </motion.div>
    </div>
  );
}

function AboutSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-36 bg-white dark:bg-[#070809]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">

          {/* Left — stacked phone mockups */}
          {/* <Reveal dir="left">
            <PhoneMockups />
          </Reveal> */}

          {/* Right — copy */}
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#4cc015] dark:text-lime-400 mb-6">
                <span className="w-5 h-px bg-[#4cc015] dark:bg-lime-400" />
                About Us
              </p>
              <h2
                className="font-black tracking-tight text-gray-900 dark:text-white leading-[1.08] mb-6"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.6rem)" }}
              >
                Unleash Potentials.{" "}
                <span className="bg-gradient-to-r from-[#4cc015] via-[#5edc1f] to-lime-400 bg-clip-text text-transparent">
                  Lock in profits.
                </span>
              </h2>
              <p className="text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed mb-10">
                While conventional copy trading platforms remain static, the KoveTrade team pioneers
                innovation. KoveTrade was crafted with you in mind — whether you&apos;re a trader seeking
                to leverage technology or a broker striving to offer top-notch tools for traders at every stage.
              </p>
            </Reveal>

            <div className="space-y-5 mb-10">
              {ABOUT_PERKS.map(({ icon, text }, i) => (
                <Reveal key={text} delay={0.08 * (i + 1)}>
                  <div className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-11 h-11 rounded-2xl bg-green-50 dark:bg-[#5edc1f]/10 border border-green-100 dark:border-[#5edc1f]/20 flex items-center justify-center text-[#4cc015] dark:text-lime-400 group-hover:bg-[#4cc015] group-hover:text-white group-hover:border-[#4cc015] dark:group-hover:bg-[#5edc1f] dark:group-hover:border-[#5edc1f] transition-all duration-300">
                      {icon}
                    </div>
                    <p className="text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed pt-2.5">{text}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.35}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 rounded-full bg-gray-900 dark:bg-white px-8 py-3.5 text-sm font-bold text-white dark:text-gray-900 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20 dark:hover:shadow-white/10"
              >
                About Us
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// §X  PLATFORM
// ═══════════════════════════════════════════════════════════════

/** Circular rotating "MORE ABOUT" badge (inspired by image5) */
function RotatingBadge() {
  const text = "KOVETRADE · MORE ABOUT · KOVETRADE · MORE ABOUT · ";
  return (
    <div className="relative w-28 h-28 flex items-center justify-center group cursor-pointer shrink-0">
      <svg
        viewBox="0 0 120 120"
        className="absolute inset-0 w-full h-full animate-[spin_14s_linear_infinite]"
        aria-hidden="true"
      >
        <defs>
          <path
            id="rotCircle"
            d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
          />
        </defs>
        <text
          className="fill-gray-900 dark:fill-white"
          fontSize="9"
          letterSpacing="2.4"
          fontWeight="700"
        >
          <textPath href="#rotCircle">{text}</textPath>
        </text>
      </svg>
      {/* Centre green arrow */}
      <div className="relative z-10 w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 group-hover:bg-emerald-400 transition-all duration-300">
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
}

const PLATFORM_BARS = [55, 70, 50, 85, 60, 75, 45, 90, 65, 80, 55, 95, 70, 85, 60, 100, 75, 90, 65, 80, 95, 70, 85, 60, 75];

function PlatformSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-36 bg-gray-50 dark:bg-[#0a0b0d] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12 lg:mb-16">
          <Reveal>
            <p className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#4cc015] dark:text-lime-400 mb-4">
              <span className="w-5 h-px bg-[#4cc015] dark:bg-lime-400" />
              Our Platform
            </p>
            <h2
              className="font-black  tracking-tight text-gray-900 dark:text-white leading-[1.08]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              Trade smarter,
              <br />
              <span className="bg-gradient-to-r from-[#4cc015] to-lime-400 bg-clip-text text-transparent">
                not harder.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.15} className="hidden sm:block">
            <RotatingBadge />
          </Reveal>
        </div>

        {/* Two platform UI cards */}
        <div className="grid md:grid-cols-2 gap-6">

          

          {/* Platform feature text card */}
          <Reveal className="md:col-span-2">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  icon: <Zap className="w-5 h-5 text-white" />,
                  accent: "from-[#5edc1f] to-green-700",
                  glow: "bg-[#5edc1f]/8 dark:bg-[#5edc1f]/10",
                  border: "border-green-100 dark:border-[#5edc1f]/20",
                  title: "Instant Trade Mirroring",
                  body: "Every move a top trader makes is copied to your account in real time — with zero delay and full transparency on every position.",
                },
                {
                  icon: <Shield className="w-5 h-5 text-white" />,
                  accent: "from-emerald-500 to-teal-600",
                  glow: "bg-emerald-500/8 dark:bg-emerald-500/10",
                  border: "border-emerald-100 dark:border-emerald-500/20",
                  title: "AutoGuard™ Protection",
                  body: "Set a maximum drawdown per trader and AutoGuard™ automatically closes all positions the moment your limit is hit — so you never lose more than you choose.",
                },
                {
                  icon: <BarChart2 className="w-5 h-5 text-white" />,
                  accent: "from-[#5edc1f] to-green-700",
                  glow: "bg-[#5edc1f]/10 dark:bg-[#5edc1f]/10",
                  border: "border-green-100 dark:border-[#5edc1f]/20",
                  title: "Live Portfolio Dashboard",
                  body: "Track every copied trade, monitor real-time P&L across multiple strategies, and switch or stop copying any trader with a single tap.",
                },
                {
                  icon: <Globe className="w-5 h-5 text-white" />,
                  accent: "from-amber-500 to-orange-500",
                  glow: "bg-amber-500/8 dark:bg-amber-500/10",
                  border: "border-amber-100 dark:border-amber-500/20",
                  title: "100+ Tradeable Assets",
                  body: "Crypto, forex pairs, indices, commodities and equities — all available from one account with raw spreads from 0.0 pips.",
                },
                {
                  icon: <Rocket className="w-5 h-5 text-white" />,
                  accent: "from-[#5edc1f] to-green-700",
                  glow: "bg-rose-500/8 dark:bg-[#5edc1f]/10",
                  border: "border-green-100 dark:border-rose-500/20",
                  title: "Sub-25ms Execution",
                  body: "Our engine is co-located in NY4 — the same data centre used by institutional desks. Every order executes in under 25 milliseconds, guaranteed.",
                },
                
              ].map(({ icon, accent, glow, border, title, body }) => (
                <div
                  key={title}
                  className={`group rounded-2xl border ${border} ${glow} p-6 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/30 transition-all duration-300`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${accent} flex items-center justify-center mb-4 shadow-md`}>
                    {icon}
                  </div>
                  <h3 className="text-[15px] font-bold text-gray-900 dark:text-white mb-2 leading-snug">{title}</h3>
                  <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// §4  HOW IT WORKS
// ═══════════════════════════════════════════════════════════════

function HowItWorksSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-36 bg-[#0d0e14]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <Reveal className="text-center mb-12 lg:mb-20">
          <h2
            className="font-black tracking-tight text-white leading-[1.08]"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            Open an account in{" "}
            <span className="bg-gradient-to-r from-lime-400 to-lime-300 bg-clip-text text-transparent">
              4 simple steps
            </span>
          </h2>
          <p className="mt-4 text-[15px] text-gray-400 max-w-xl mx-auto leading-relaxed">
            Get started in minutes. No prior trading experience needed.
          </p>
        </Reveal>

        {/* 4 step cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {ACCOUNT_STEPS.map(({ n, title, body, video }, i) => (
            <Reveal key={n} delay={0.1 * i}>
              <div className="group relative flex flex-col sm:flex-col rounded-3xl bg-white/[0.04] border border-white/[0.08] overflow-hidden h-full transition-all duration-500 hover:bg-gradient-to-b hover:from-[#5edc1f]/[0.08] hover:via-lime-400/[0.04] hover:to-transparent hover:border-[#5edc1f]/30">

                {/* Top content */}
                <div className="p-6 flex-1">
                  {/* Step number — big gradient */}
                  <span
                    className="block font-black leading-none mb-4 bg-gradient-to-br from-lime-400 via-lime-300 to-[#4cc015] bg-clip-text text-transparent select-none"
                    style={{ fontSize: "clamp(3.5rem, 6vw, 5rem)" }}
                  >
                    {n}
                  </span>
                  <h3 className="text-[17px] font-bold text-white mb-2.5 leading-snug">{title}</h3>
                  <p className="text-[13px] text-gray-400 leading-relaxed">{body}</p>
                </div>

                {/* Video at bottom */}
                <div className="relative w-full h-36 sm:h-40 lg:h-36 overflow-hidden shrink-0 flex items-center justify-center">
                  <video
                    src={video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain mix-blend-screen"
                  />
                </div>

              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0.5}>
          <div className="mt-14 text-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#4cc015] to-[#5edc1f] px-10 py-4 text-sm font-bold text-white hover:from-[#5edc1f] hover:to-lime-400 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#5edc1f]/30 transition-all duration-300"
            >
              Get Started
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// §5  TOP TRADERS
// ═══════════════════════════════════════════════════════════════
const TRADERS = [
  {
    img: "https://i.pravatar.cc/150?img=11",
    grad: "from-[#5edc1f] to-green-700",
    glow: "shadow-[#5edc1f]/25",
    name: "Alex Thompson",
    tag: "Expert",
    ret: "+127.4%",
    profit1m: "+14.2%",
    total: "$4.8M",
    risk: "Low",
    riskColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10",
    copiers: 4291,
  },
  {
    img: "https://i.pravatar.cc/150?img=49",
    grad: "from-[#5edc1f] to-green-700",
    glow: "shadow-[#5edc1f]/25",
    name: "Sophie Laurent",
    tag: "Expert",
    ret: "+89.2%",
    profit1m: "+8.6%",
    total: "$2.1M",
    risk: "Medium",
    riskColor: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10",
    copiers: 6847,
  },
  {
    img: "https://i.pravatar.cc/150?img=15",
    grad: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/25",
    name: "Marcus Rivera",
    tag: "Expert",
    ret: "+214.7%",
    profit1m: "+22.1%",
    total: "$9.3M",
    risk: "High",
    riskColor: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10",
    copiers: 2156,
  },
];

function TraderCard({ trader, delay }: { trader: (typeof TRADERS)[0]; delay: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={delay}>
      <motion.div
        className="rounded-3xl bg-white dark:bg-zinc-900/60 border border-gray-100 dark:border-white/[0.07] p-6 h-full transition-all duration-300 hover:shadow-2xl hover:shadow-black/8 dark:hover:shadow-black/50 hover:-translate-y-2 cursor-default"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 ring-2 ring-[#5edc1f]/30">
            <Image src={trader.img} alt={trader.name} width={48} height={48} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900 dark:text-white text-sm leading-none mb-1">{trader.name}</p>
            <p className="text-[11px] text-[#5edc1f] dark:text-lime-400 font-semibold">{trader.tag}</p>
          </div>
          {/* <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${trader.riskColor}`}>
            {trader.risk}
          </span> */}
        </div>

        {/* 4-stat grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="rounded-xl bg-gray-50 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.06] px-3 py-2.5">
            <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Copiers</p>
            <p className="text-base font-black text-gray-900 dark:text-white">{trader.copiers.toLocaleString()}</p>
          </div>
          <div className="rounded-xl bg-gray-50 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.06] px-3 py-2.5">
            <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Profit (1M)</p>
            <p className="text-base font-black text-emerald-600 dark:text-emerald-400">{trader.profit1m}</p>
          </div>
          <div className="rounded-xl bg-gray-50 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.06] px-3 py-2.5">
            <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Total</p>
            <p className="text-base font-black text-gray-900 dark:text-white">{trader.total}</p>
          </div>
          <div className="rounded-xl bg-gray-50 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.06] px-3 py-2.5">
            <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">12M Return</p>
            <p className="text-base font-black text-emerald-600 dark:text-emerald-400">{trader.ret}</p>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/register"
          className={`block w-full rounded-2xl py-3 text-sm font-bold text-center transition-all duration-300 ${
            hovered
              ? `bg-gradient-to-r ${trader.grad} text-white shadow-lg`
              : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300"
          }`}
        >
          Copy Trader
        </Link>
      </motion.div>
    </Reveal>
  );
}

function TopTradersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <section ref={ref} className="py-16 sm:py-24 lg:py-36 bg-gray-50 dark:bg-[#0a0b0d] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10 lg:mb-14 gap-6">
          <Reveal>
            <p className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#4cc015] dark:text-lime-400 mb-4">
              <span className="w-5 h-px bg-[#4cc015] dark:bg-lime-400" />
              Top Performers
            </p>
            <h2
              className="font-black tracking-tight text-gray-900 dark:text-white leading-[1.08]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
            >
              Browse the world&apos;s best traders.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#4cc015] dark:text-lime-400 hover:gap-3 transition-all duration-200 shrink-0"
            >
              View all traders
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </Reveal>
        </div>

        <motion.div style={{ y }} className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5">
          {TRADERS.map((t, i) => (
            <TraderCard key={t.name} trader={t} delay={0.1 * i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// §6  FEATURES — BENTO GRID
// ═══════════════════════════════════════════════════════════════
const FEATURES = [
  {
    size: "lg:col-span-2 lg:row-span-1",
    icon: "⚡",
    tag: "Raw Spreads",
    title: "Trade at 0.0 pips. Every time.",
    body: "No markup, no requotes. Our raw spread pricing gives you direct market access with the tightest possible bid-ask spread — starting from absolute zero.",
    accent: "bg-gradient-to-br from-green-50 to-lime-50 dark:from-green-950/30 dark:to-green-950/20",
    border: "border-green-100 dark:border-green-900/40",
    stat: "0.0 pips",
    statLabel: "starting spread",
  },
  {
    size: "lg:col-span-1 lg:row-span-1",
    icon: "🌍",
    tag: "Asset Classes",
    title: "100+ assets across every market.",
    body: "Crypto, equities, forex, commodities, indices. One account, every market.",
    accent: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/20",
    border: "border-green-100 dark:border-green-900/40",
    stat: "100+",
    statLabel: "instruments",
  },
  {
    size: "lg:col-span-1 lg:row-span-1",
    icon: "🛡️",
    tag: "Risk Tools",
    title: "Smart risk management built in.",
    body: "Set stop-loss, take-profit, and copy limits per trader. AutoGuard closes positions automatically to protect your downside.",
    accent: "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20",
    border: "border-emerald-100 dark:border-emerald-900/40",
    stat: "AutoGuard™",
    statLabel: "proprietary tech",
  },
  {
    size: "lg:col-span-2 lg:row-span-1",
    icon: "🚀",
    tag: "Execution",
    title: "Under 25ms execution. No excuses.",
    body: "Our matching engine sits in the New York Equinix NY4 data center — the same co-location used by institutional trading desks. Sub-25ms average execution, 99.9% uptime guarantee.",
    accent: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20",
    border: "border-amber-100 dark:border-amber-900/40",
    stat: "<25ms",
    statLabel: "avg. execution",
  },
];

function FeaturesSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-36 bg-white dark:bg-[#070809]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-10 lg:mb-16">
          <p className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#4cc015] dark:text-lime-400 mb-4">
            <span className="w-5 h-px bg-[#4cc015] dark:bg-lime-400" />
            The Platform
          </p>
          <h2
            className="font-black tracking-tight text-gray-900 dark:text-white leading-[1.08]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
          >
            Built for traders who demand more.
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4">
          {FEATURES.map(({ size, icon, tag, title, body, accent, border, stat, statLabel }, i) => (
            <Reveal key={tag} delay={0.08 * i} className={size}>
              <motion.div
                className={`relative rounded-3xl border ${border} ${accent} p-6 sm:p-8 h-full min-h-[180px] overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30`}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#4cc015] dark:text-lime-400 mb-2">{tag}</p>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-snug max-w-xs">{title}</h3>
                  </div>
                  <div className="text-3xl ml-4 shrink-0">{icon}</div>
                </div>
                <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed mb-5 max-w-md">{body}</p>

                {/* Stat callout */}
                <div className="inline-flex items-baseline gap-1.5">
                  <span className="text-2xl font-black text-gray-900 dark:text-white">{stat}</span>
                  <span className="text-[11px] text-gray-400 dark:text-gray-600">{statLabel}</span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// §7  TESTIMONIALS
// ═══════════════════════════════════════════════════════════════
const REVIEWS = [
  {
    img: "https://i.pravatar.cc/150?img=3",
    name: "Mark Villomas",
    handle: "@marktrades",
    stars: 5,
    text: "Following three months of engaging in copy trading with KoveTrade, my returns have surpassed my total earnings from the entirety of my previous year's independent trading activities. The platform demonstrates exceptional transparency and speed, and the support team consistently provides invaluable assistance.",
  },
  {
    img: "https://i.pravatar.cc/150?img=8",
    name: "Ufqad Warraich",
    handle: "@ufqad_w",
    stars: 5,
    text: "The risk management tools are what sold me. I can set a maximum drawdown per trader and the system handles everything automatically. I sleep better knowing AutoGuard is watching my portfolio.",
  },
  {
    img: "https://i.pravatar.cc/150?img=47",
    name: "Sarah Thompson",
    handle: "@sarahtrades",
    stars: 5,
    text: "Switching between traders is seamless. I've been running three different copy strategies simultaneously and the portfolio view makes it crystal clear how each one is performing. Couldn't be simpler.",
  },
];

function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);

  return (
    <section ref={ref} className="py-16 sm:py-24 lg:py-36 bg-gray-50 dark:bg-[#0a0b0d] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 lg:mb-14 gap-6">
          <Reveal>
            <p className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#4cc015] dark:text-lime-400 mb-4">
              <span className="w-5 h-px bg-[#4cc015] dark:bg-lime-400" />
              Testimonials
            </p>
            <h2
              className="font-black tracking-tight text-gray-900 dark:text-white leading-[1.08]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
            >
              Loved by traders worldwide.
            </h2>
          </Reveal>
          {/* Trust badges */}
          <Reveal delay={0.1}>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-gray-200 dark:border-white/[0.07] bg-white dark:bg-zinc-900/60 px-5 py-3">
                <p className="text-xs text-gray-500 mb-0.5">Trustpilot</p>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 fill-emerald-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                  <span className="text-sm font-bold text-gray-900 dark:text-white ml-1">4.8</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <motion.div style={{ y }} className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5">
          {REVIEWS.map(({ img, name, handle, stars, text }, i) => (
            <Reveal key={name} delay={0.1 * i}>
              <div className="relative rounded-3xl bg-white dark:bg-zinc-900/60 border border-gray-100 dark:border-white/[0.06] p-7 h-full flex flex-col hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/40">
                {/* Large quote */}
                <span className="absolute top-5 right-6 text-[5rem] font-black leading-none text-gray-900/[0.04] dark:text-white/[0.04] select-none">
                  &ldquo;
                </span>

                {/* Stars */}
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: stars }).map((_, j) => (
                    <svg key={j} className="w-3.5 h-3.5 fill-amber-400" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                <p className="text-[14px] text-gray-600 dark:text-gray-400 leading-relaxed flex-1 mb-7 relative z-10">
                  &ldquo;{text}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-[#5edc1f]/25">
                    <Image src={img} alt={name} width={40} height={40} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white leading-none mb-0.5">{name}</p>
                    <p className="text-[11px] text-gray-400 dark:text-gray-600">{handle}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// §8  CTA
// ═══════════════════════════════════════════════════════════════
function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 0.7], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-white dark:bg-[#070809] overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ scale, opacity }}
          className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#4cc015] via-green-700 to-green-800 p-8 sm:p-12 lg:p-20 text-center shadow-2xl shadow-green-900/30"
        >
          {/* Interior glow spots */}
          <div className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 65%)" }} />
          <div className="absolute -bottom-[20%] -right-[10%] w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 65%)" }} />
          {/* Fine dot grid overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.08]"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }} />

          <div className="relative z-10">
            <p className="text-green-200 text-[11px] font-bold tracking-[0.25em] uppercase mb-5">
              Ready to get started?
            </p>
            <h2
              className="font-black text-white leading-[1.06] tracking-tight mb-5"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              Copy the best traders.
              <br />
              Build your future.
            </h2>
            <p className="text-green-200 text-base lg:text-lg max-w-lg mx-auto leading-relaxed mb-10">
              Join 50 million traders and investors who chose KoveTrade. No
              credit card required. Start copying in under 3 minutes.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center mb-10">
              <Link
                href="/register"
                className="rounded-full bg-white px-10 py-4 text-sm font-bold text-green-700 transition-all duration-300 hover:bg-green-50 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20 text-center"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-white/25 bg-white/[0.08] px-10 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.14] hover:border-white/40 hover:-translate-y-0.5 text-center"
              >
                Sign In
              </Link>
            </div>

            {/* Trust line */}
            <div className="flex items-center justify-center gap-x-4 gap-y-3 flex-wrap">
              {["Regulated by CySEC", "FCA Authorised", "SEC Registered", "256-bit SSL"].map((t, i) => (
                <React.Fragment key={t}>
                  <span className="text-[11px] text-green-300 font-medium flex items-center gap-1.5 whitespace-nowrap">
                    <svg className="w-3 h-3 fill-green-300 shrink-0" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {t}
                  </span>
                  {i < 3 && <span className="hidden sm:block w-px h-3 bg-[#5edc1f]/50" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
