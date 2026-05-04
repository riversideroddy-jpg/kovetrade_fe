"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
  const from =
    dir === "left"
      ? { opacity: 0, x: -30 }
      : dir === "right"
      ? { opacity: 0, x: 30 }
      : { opacity: 0, y: 28 };
  const to = { opacity: 1, x: 0, y: 0 };
  return (
    <motion.div
      ref={ref}
      initial={from}
      animate={inView ? to : from}
      transition={{ duration: 0.72, delay, ease: E }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated App / Software Icon ───────────────────────────────
function SoftwareIcon() {
  return (
    <motion.div
      className="flex flex-col items-center select-none"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: E }}
    >
      <svg viewBox="0 0 200 200" className="w-52 h-52" fill="none">
        {/* Outer orbit ring */}
        <motion.circle
          cx="100" cy="100" r="88"
          stroke="rgba(52,211,153,0.12)"
          strokeWidth="1"
          strokeDasharray="5 8"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          style={{ transformOrigin: "100px 100px" }}
        />

        {/* Mid ring */}
        <motion.circle
          cx="100" cy="100" r="70"
          stroke="rgba(52,211,153,0.18)"
          strokeWidth="1.5"
          strokeDasharray="3 6"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          style={{ transformOrigin: "100px 100px" }}
        />

        {/* App window base */}
        <rect x="42" y="48" width="116" height="90" rx="10" fill="rgba(16,32,24,0.7)" stroke="rgba(52,211,153,0.3)" strokeWidth="1.5" />

        {/* Title bar */}
        <rect x="42" y="48" width="116" height="20" rx="10" fill="rgba(52,211,153,0.12)" />
        <rect x="42" y="58" width="116" height="10" fill="rgba(52,211,153,0.08)" />

        {/* Traffic lights */}
        <circle cx="55" cy="58" r="3.5" fill="rgba(255,100,100,0.6)" />
        <circle cx="65" cy="58" r="3.5" fill="rgba(255,190,60,0.6)" />
        <circle cx="75" cy="58" r="3.5" fill="rgba(52,211,153,0.7)" />

        {/* Code lines — animated */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.rect
            key={i}
            x="54" y={80 + i * 11}
            height="5" rx="2.5"
            fill="rgba(52,211,153,0.35)"
            initial={{ width: 0 }}
            animate={{ width: [0, 40 + (i % 3) * 25, 40 + (i % 3) * 25] }}
            transition={{ delay: 1 + i * 0.15, duration: 0.6, ease: "easeOut" }}
          />
        ))}
        {/* Accent line */}
        <motion.rect
          x="54" y="80" height="5" rx="2.5"
          fill="rgba(52,211,153,0.7)"
          initial={{ width: 0 }}
          animate={{ width: 55 }}
          transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
        />

        {/* Key badge */}
        <motion.g
          animate={{ y: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
        >
          <circle cx="148" cy="52" r="18" fill="rgba(16,24,18,0.9)" stroke="rgba(52,211,153,0.5)" strokeWidth="1.5" />
          {/* Key icon */}
          <circle cx="145" cy="50" r="5" stroke="rgba(52,211,153,0.9)" strokeWidth="1.8" />
          <line x1="149" y1="53" x2="155" y2="59" stroke="rgba(52,211,153,0.9)" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="153" y1="57" x2="155" y2="55" stroke="rgba(52,211,153,0.9)" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="155" y1="59" x2="157" y2="57" stroke="rgba(52,211,153,0.9)" strokeWidth="1.8" strokeLinecap="round" />
        </motion.g>

        {/* Shield overlay bottom */}
        <motion.g
          animate={{ y: [2, -2, 2] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <path
            d="M100 148 L115 140 L115 158 Q115 168 100 174 Q85 168 85 158 L85 140 Z"
            fill="rgba(52,211,153,0.15)"
            stroke="rgba(52,211,153,0.45)"
            strokeWidth="1.5"
          />
          <path
            d="M93 157 L98 163 L108 151"
            stroke="rgba(52,211,153,0.9)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>

        {/* Orbiting dots */}
        {[0, 120, 240].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const cx = 100 + 70 * Math.cos(rad);
          const cy = 100 + 70 * Math.sin(rad);
          return (
            <motion.circle
              key={i} cx={cx} cy={cy} r="4"
              fill="rgba(52,211,153,0.6)"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.8, ease: "easeInOut" }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />
          );
        })}
      </svg>
    </motion.div>
  );
}

// ─── License key display ─────────────────────────────────────────
function LicenseKey() {
  const segments = ["KT-2026", "EULA-STD", "USER-LTD", "PERS-USE"];
  return (
    <Reveal delay={0.4}>
      <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
        <span className="text-gray-500 mr-1">License:</span>
        {segments.map((seg, i) => (
          <React.Fragment key={i}>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-300">
              {seg}
            </span>
            {i < segments.length - 1 && <span className="text-gray-600">—</span>}
          </React.Fragment>
        ))}
      </div>
    </Reveal>
  );
}

// ─── Restriction item ─────────────────────────────────────────────
function Restriction({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      className="flex items-start gap-3"
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
      transition={{ duration: 0.5, delay, ease: E }}
    >
      <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-rose-500/15 border border-[#5edc1f]/30 flex items-center justify-center">
        <svg className="w-2.5 h-2.5 text-lime-400" fill="none" viewBox="0 0 10 10">
          <path d="M2 2l6 6M8 2L2 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{text}</p>
    </motion.div>
  );
}

// ─── Section accordion ───────────────────────────────────────────
const ACCENT_MAP: Record<string, { badge: string; border: string; top: string }> = {
  emerald: { badge: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30", border: "border-emerald-500/15 hover:border-emerald-500/35", top: "from-emerald-500/20 to-transparent" },
  green:   { badge: "bg-green-500/15 text-green-300 border border-green-500/30",     border: "border-green-500/15 hover:border-green-500/35",   top: "from-green-500/20 to-transparent" },
  teal:    { badge: "bg-teal-500/15 text-teal-300 border border-teal-500/30",       border: "border-teal-500/15 hover:border-teal-500/35",     top: "from-teal-500/20 to-transparent" },
  cyan:    { badge: "bg-lime-400/15 text-lime-300 border border-lime-400/30",       border: "border-lime-400/15 hover:border-lime-400/35",     top: "from-lime-400/20 to-transparent" },
  blue:    { badge: "bg-[#5edc1f]/15 text-green-300 border border-[#5edc1f]/30",       border: "border-[#5edc1f]/15 hover:border-[#5edc1f]/35",     top: "from-[#5edc1f]/20 to-transparent" },
  violet:  { badge: "bg-[#5edc1f]/15 text-lime-300 border border-[#5edc1f]/30", border: "border-[#5edc1f]/15 hover:border-[#5edc1f]/35", top: "from-[#5edc1f]/20 to-transparent" },
  amber:   { badge: "bg-amber-500/15 text-amber-300 border border-amber-500/30",   border: "border-amber-500/15 hover:border-amber-500/35",   top: "from-amber-500/20 to-transparent" },
  rose:    { badge: "bg-rose-500/15 text-lime-300 border border-[#5edc1f]/30",       border: "border-[#5edc1f]/15 hover:border-[#5edc1f]/35",     top: "from-[#5edc1f]/20 to-transparent" },
  orange:  { badge: "bg-orange-500/15 text-orange-300 border border-orange-500/30", border: "border-orange-500/15 hover:border-orange-500/35", top: "from-orange-500/20 to-transparent" },
  indigo:  { badge: "bg-[#5edc1f]/15 text-lime-300 border border-[#5edc1f]/30", border: "border-[#5edc1f]/15 hover:border-[#5edc1f]/35", top: "from-[#5edc1f]/20 to-transparent" },
  slate:   { badge: "bg-slate-500/15 text-slate-300 border border-slate-500/30",   border: "border-slate-500/15 hover:border-slate-500/35",   top: "from-slate-500/20 to-transparent" },
};

function Section({
  num,
  title,
  accent,
  children,
}: {
  num: number;
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const a = ACCENT_MAP[accent] ?? ACCENT_MAP.emerald;

  return (
    <motion.div
      ref={ref}
      id={`s${num}`}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.65, ease: E }}
      className={`rounded-2xl border bg-gray-50 dark:bg-white/[0.025] backdrop-blur-sm transition-colors duration-300 overflow-hidden ${a.border}`}
    >
      {/* top gradient line */}
      <div className={`h-px w-full bg-gradient-to-r ${a.top}`} />

      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <div className="flex items-center gap-3">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full font-mono ${a.badge}`}>
            §{num}
          </span>
          <span className="text-base font-semibold text-gray-900 dark:text-white">{title}</span>
        </div>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="w-4 h-4 text-gray-500 flex-shrink-0"
          fill="none" viewBox="0 0 16 16"
        >
          <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: E }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{children}</p>;
}

function Legal({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
      <div className="flex items-start gap-2 mb-2">
        <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Legal Notice</span>
      </div>
      <p className="text-xs text-amber-200/70 leading-relaxed font-mono">{children}</p>
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────
const NAV = [
  { id: 1, label: "Overview" },
  { id: 2, label: "License Grant" },
  { id: 3, label: "Restrictions" },
  { id: 4, label: "IP Rights" },
  { id: 5, label: "Updates" },
  { id: 6, label: "Data Collection" },
  { id: 7, label: "Third-Party" },
  { id: 8, label: "Warranty" },
  { id: 9, label: "Liability" },
  { id: 10, label: "Indemnification" },
  { id: 11, label: "Termination" },
  { id: 12, label: "Export Controls" },
  { id: 13, label: "Governing Law" },
  { id: 14, label: "Severability" },
];

const ACCENTS = [
  "emerald","green","rose","teal","cyan","blue","violet",
  "amber","orange","indigo","slate","emerald","green","teal",
];

// ─── Page ────────────────────────────────────────────────────────
export default function EulaPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#07100e] text-gray-900 dark:text-white">
      <style>{`
        @keyframes blob-a { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(35px,-25px) scale(1.07)} 66%{transform:translate(-18px,18px) scale(0.96)} }
        @keyframes blob-b { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-30px,22px) scale(1.04)} 66%{transform:translate(22px,-12px) scale(0.98)} }
        @keyframes blob-c { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(18px,26px) scale(1.05)} }
        .ba{animation:blob-a 15s ease-in-out infinite}
        .bb{animation:blob-b 20s ease-in-out infinite}
        .bc{animation:blob-c 24s ease-in-out infinite}
      `}</style>

      <div className="fixed inset-0 overflow-hidden pointer-events-none hidden dark:block">
        <div className="ba absolute top-[-8%] left-[-4%] w-[50vw] h-[50vw] rounded-full bg-emerald-700/12 blur-[110px]" />
        <div className="bb absolute bottom-[-10%] right-[-5%] w-[48vw] h-[48vw] rounded-full bg-teal-700/10 blur-[95px]" />
        <div className="bc absolute top-[35%] left-[28%] w-[38vw] h-[38vw] rounded-full bg-green-800/8 blur-[120px]" />
      </div>

      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <Reveal delay={0.05}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-emerald-300 font-medium">Legal Document · Software License</span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                  End User{" "}
                  <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-lime-300 bg-clip-text text-transparent">
                    License
                  </span>{" "}
                  Agreement
                </h1>
              </Reveal>

              <Reveal delay={0.18}>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6 max-w-lg">
                  This EULA governs your use of KoveTrade software applications, including our web
                  platform, mobile apps, desktop applications, APIs, and related services.
                </p>
              </Reveal>

              <LicenseKey />

              <Reveal delay={0.5}>
                <div className="flex flex-wrap gap-3 mt-6">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5">
                    <span className="text-emerald-400">📅</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Last Updated: February 2026</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5">
                    <span className="text-teal-400">📜</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">14 Sections</span>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.58}>
                <div className="mt-6 p-4 rounded-2xl border border-rose-500/20 bg-rose-500/5">
                  <div className="flex items-start gap-3">
                    <span className="text-lime-400 text-lg flex-shrink-0">⚠️</span>
                    <p className="text-xs text-rose-200/80 leading-relaxed">
                      By downloading, installing, accessing, or using the Software, you agree to be
                      bound by the terms of this EULA. If you do not agree, you must not use the
                      Software.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-600/12 to-teal-900/10 blur-2xl scale-110" />
                <div className="relative rounded-3xl border border-emerald-500/20 bg-gray-50 dark:bg-white/[0.025] p-8">
                  <SoftwareIcon />
                  <div className="mt-4 text-center space-y-1">
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-mono">KoveTrade</p>
                    <p className="text-sm font-semibold text-emerald-300">Software License Agreement</p>
                    <div className="flex justify-center gap-1.5 mt-2">
                      {["Personal", "Non-Commercial", "Revocable"].map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky nav ───────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-100 dark:border-white/5 bg-white/95 dark:bg-[#07100e]/85 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#s${n.id}`}
                className="text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-emerald-300 hover:border-emerald-500/40 hover:bg-emerald-500/8 transition-all whitespace-nowrap"
              >
                §{n.id} {n.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Key facts strip ──────────────────────────────────────── */}
      <section className="py-10 px-4 border-b border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "💻", label: "Software License", sub: "Web, mobile & desktop apps" },
              { icon: "🚫", label: "No Reverse Engineering", sub: "Source code is protected" },
              { icon: "©️",  label: "IP Protected", sub: "All rights reserved by KoveTrade" },
              { icon: "📤", label: "Export Compliant", sub: "Follows OFAC & EAR rules" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="flex flex-col items-center text-center p-4 rounded-2xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/[0.025] hover:bg-emerald-500/5 hover:border-emerald-500/20 transition-all">
                  <span className="text-2xl mb-2">{item.icon}</span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sections ─────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-5">

          {/* §1 */}
          <Section num={1} title="Agreement Overview" accent={ACCENTS[0]}>
            <P>
              This End User License Agreement ("EULA") is a legal agreement between you ("User,"
              "you," or "your") and KoveTrade ("Company," "we," "us," or "our") governing your use
              of the KoveTrade software applications, including our web platform, mobile applications,
              desktop applications, APIs, and any related software and services (collectively, the
              "Software").
            </P>
            <P>
              By downloading, installing, accessing, or using the Software, you acknowledge that you
              have read, understood, and agree to be bound by the terms and conditions of this EULA.
              If you do not agree to these terms, you must not download, install, or use the Software.
            </P>
          </Section>

          {/* §2 */}
          <Section num={2} title="License Grant" accent={ACCENTS[1]}>
            <P>
              Subject to the terms and conditions of this EULA, KoveTrade grants you a limited,
              non-exclusive, non-transferable, revocable license to download, install, and use the
              Software on devices that you own or control, solely for your personal, non-commercial
              use in connection with the trading services provided by KoveTrade.
            </P>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
              {[
                { label: "Limited", icon: "🔒", color: "text-lime-400" },
                { label: "Non-Exclusive", icon: "👥", color: "text-lime-400" },
                { label: "Non-Transferable", icon: "🚫", color: "text-orange-400" },
                { label: "Revocable", icon: "↩️", color: "text-amber-400" },
              ].map((l, i) => (
                <div key={i} className="flex flex-col items-center text-center p-3 rounded-xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/[0.02]">
                  <span className="text-xl mb-1">{l.icon}</span>
                  <p className={`text-xs font-semibold ${l.color}`}>{l.label}</p>
                </div>
              ))}
            </div>
            <P>
              This license does not grant you any ownership rights in the Software and is subject
              to the restrictions set forth in this EULA.
            </P>
          </Section>

          {/* §3 */}
          <Section num={3} title="License Restrictions" accent={ACCENTS[2]}>
            <P>You agree not to, and you will not permit others to:</P>
            <div className="space-y-2.5 mt-2">
              {[
                "Copy, modify, adapt, translate, or create derivative works based on the Software",
                "Reverse engineer, disassemble, decompile, or attempt to derive the source code of the Software",
                "Rent, lease, lend, sell, sublicense, or distribute the Software to any third party",
                "Remove, alter, or obscure any proprietary notices, labels, or marks on the Software",
                "Use the Software for any purpose that is unlawful or prohibited by this EULA",
                "Use the Software to develop competing products or services",
                "Circumvent or attempt to circumvent any security features or access controls of the Software",
                "Use automated systems, bots, or scripts to interact with the Software without prior written authorization",
              ].map((r, i) => (
                <Restriction key={i} text={r} delay={i * 0.05} />
              ))}
            </div>
          </Section>

          {/* §4 */}
          <Section num={4} title="Intellectual Property Rights" accent={ACCENTS[3]}>
            <P>
              The Software and all copies thereof are the intellectual property of KoveTrade and are
              protected by copyright, trademark, patent, and other intellectual property laws.
              KoveTrade retains all right, title, and interest in and to the Software, including all
              intellectual property rights therein.
            </P>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
              {[
                { label: "Copyright", icon: "©️" },
                { label: "Trademark", icon: "™️" },
                { label: "Patent", icon: "🏛️" },
                { label: "Trade Secret", icon: "🔐" },
              ].map((ip, i) => (
                <div key={i} className="flex flex-col items-center text-center p-3 rounded-xl border border-teal-500/15 bg-teal-500/5">
                  <span className="text-lg mb-1">{ip.icon}</span>
                  <p className="text-xs font-semibold text-teal-300">{ip.label}</p>
                </div>
              ))}
            </div>
            <P>
              This EULA does not convey to you any rights of ownership in or related to the Software,
              and nothing in this EULA should be construed as granting any license or right to use
              any trademarks, service marks, or logos of KoveTrade without prior written consent.
            </P>
          </Section>

          {/* §5 */}
          <Section num={5} title="Software Updates and Modifications" accent={ACCENTS[4]}>
            <P>
              KoveTrade may from time to time release updates, patches, bug fixes, enhancements, or
              new versions of the Software. Such updates may be installed automatically or may require
              your action.
            </P>
            <div className="space-y-2 mt-2">
              {[
                { icon: "🔄", label: "Automatic updates", desc: "May be applied without prior notice to ensure security and performance" },
                { icon: "🛠️", label: "Patches & bug fixes", desc: "Deployed at our discretion to maintain Software integrity" },
                { icon: "⏸️", label: "Suspension rights", desc: "KoveTrade may suspend or discontinue the Software at any time" },
              ].map((u, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/[0.02]">
                  <span className="text-xl flex-shrink-0">{u.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-lime-300">{u.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{u.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <P>
              You acknowledge that this EULA applies to all such updates and modifications. KoveTrade
              reserves the right to modify, suspend, or discontinue the Software or any part thereof
              at any time without prior notice.
            </P>
          </Section>

          {/* §6 */}
          <Section num={6} title="Data Collection and Usage" accent={ACCENTS[5]}>
            <P>
              The Software may collect certain data from your device and usage, including but not
              limited to:
            </P>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
              {[
                { label: "Device Info", icon: "📱" },
                { label: "Usage Statistics", icon: "📊" },
                { label: "Crash Reports", icon: "💥" },
                { label: "Performance Data", icon: "⚡" },
                { label: "Log Files", icon: "📋" },
                { label: "Diagnostics", icon: "🔍" },
              ].map((d, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl border border-[#5edc1f]/15 bg-[#5edc1f]/5">
                  <span className="text-base">{d.icon}</span>
                  <p className="text-xs font-medium text-green-300">{d.label}</p>
                </div>
              ))}
            </div>
            <P>
              This data is collected to improve the Software, provide technical support, and enhance
              the user experience. All data collection is governed by our{" "}
              <Link href="/privacy" className="text-emerald-400 hover:underline">Privacy Policy</Link>,
              which forms an integral part of this EULA.
            </P>
          </Section>

          {/* §7 */}
          <Section num={7} title="Third-Party Software and Services" accent={ACCENTS[6]}>
            <P>
              The Software may include or integrate with third-party software components, libraries,
              or services. Such third-party components are subject to their own license agreements
              and terms of use.
            </P>
            <div className="mt-3 p-4 rounded-xl border border-[#5edc1f]/20 bg-[#5edc1f]/10">
              <p className="text-xs font-semibold text-lime-300 mb-2">Important Disclaimer</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                KoveTrade does not assume any responsibility or liability for any third-party software
                or services, and your use of such components is at your own risk. The inclusion of
                third-party components does not imply endorsement by KoveTrade.
              </p>
            </div>
          </Section>

          {/* §8 */}
          <Section num={8} title="Warranty Disclaimer" accent={ACCENTS[7]}>
            <div className="p-4 rounded-xl border border-amber-500/25 bg-amber-500/8 mb-3">
              <p className="text-xs font-bold text-amber-400 mb-2 uppercase tracking-wide">⚠️ No Warranty</p>
              <p className="text-xs text-amber-200/70 leading-relaxed">
                The Software is provided without warranty of any kind, express or implied, including
                warranties of merchantability, fitness for a particular purpose, or non-infringement.
              </p>
            </div>
            <Legal>
              THE SOFTWARE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF ANY KIND,
              EXPRESS OR IMPLIED. KOVETRADE DOES NOT WARRANT THAT THE SOFTWARE WILL BE UNINTERRUPTED,
              ERROR-FREE, SECURE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. KOVETRADE DOES
              NOT WARRANT THE ACCURACY, COMPLETENESS, OR RELIABILITY OF ANY CONTENT, DATA, OR
              INFORMATION PROVIDED THROUGH THE SOFTWARE. YOUR USE OF THE SOFTWARE IS AT YOUR SOLE
              RISK. NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM
              KOVETRADE SHALL CREATE ANY WARRANTY NOT EXPRESSLY STATED IN THIS EULA.
            </Legal>
          </Section>

          {/* §9 */}
          <Section num={9} title="Limitation of Liability" accent={ACCENTS[8]}>
            <Legal>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL KOVETRADE, ITS
              DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO
              DAMAGES FOR LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING
              OUT OF OR IN CONNECTION WITH YOUR USE OF OR INABILITY TO USE THE SOFTWARE, EVEN IF
              KOVETRADE HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </Legal>
            <div className="mt-3 p-4 rounded-xl border border-orange-500/20 bg-orange-500/5">
              <p className="text-xs font-semibold text-orange-300 mb-1">Liability Cap</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                KoveTrade's total aggregate liability to you for all claims arising out of or
                relating to this EULA or the Software shall not exceed the amount paid by you, if
                any, for the Software during the twelve (12) months preceding the claim.
              </p>
            </div>
          </Section>

          {/* §10 */}
          <Section num={10} title="Indemnification" accent={ACCENTS[9]}>
            <P>
              You agree to indemnify, defend, and hold harmless KoveTrade, its directors, officers,
              employees, agents, and affiliates from and against any and all claims, damages, losses,
              liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of
              or in connection with:
            </P>
            <div className="space-y-2 mt-2">
              {[
                "Your use of the Software",
                "Your violation of this EULA",
                "Your violation of any applicable law or regulation",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#5edc1f]/20 border border-[#5edc1f]/40 flex items-center justify-center text-xs font-bold text-lime-400">
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <P>This indemnification obligation shall survive the termination of this EULA.</P>
          </Section>

          {/* §11 */}
          <Section num={11} title="Termination" accent={ACCENTS[10]}>
            <div className="grid sm:grid-cols-2 gap-4 mt-1">
              <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5">
                <p className="text-xs font-semibold text-lime-300 mb-2">KoveTrade May Terminate</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  At any time, with or without cause and with or without notice, if you violate this
                  EULA or applicable law.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                <p className="text-xs font-semibold text-emerald-300 mb-2">You May Terminate</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  At any time by uninstalling the Software and deleting all copies from your devices.
                </p>
              </div>
            </div>
            <P>
              Upon termination, all rights granted to you under this EULA shall immediately cease,
              and you must stop using the Software and destroy all copies in your possession.
            </P>
            <div className="p-3 rounded-xl border border-slate-500/20 bg-slate-500/5">
              <p className="text-xs text-slate-300 font-semibold mb-1">Surviving Provisions</p>
              <p className="text-xs text-gray-500">
                IP rights, warranty disclaimers, limitations of liability, and indemnification
                obligations survive termination and remain in full force and effect.
              </p>
            </div>
          </Section>

          {/* §12 */}
          <Section num={12} title="Export Controls" accent={ACCENTS[11]}>
            <P>
              The Software may be subject to export control laws and regulations. You agree to
              comply with all applicable export and re-export control laws, including:
            </P>
            <div className="space-y-2.5 mt-2">
              {[
                { label: "Export Administration Regulations (EAR)", body: "Maintained by the U.S. Department of Commerce", icon: "🏛️" },
                { label: "OFAC Sanctions", body: "Trade and economic sanctions maintained by the Treasury Department", icon: "🚫" },
                { label: "ITAR", body: "International Traffic in Arms Regulations by the Department of State", icon: "⚖️" },
              ].map((e, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-emerald-500/15 bg-emerald-500/5">
                  <span className="text-lg flex-shrink-0">{e.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-emerald-300">{e.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{e.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <P>
              You represent and warrant that you are not located in, under the control of, or a
              national or resident of any restricted country or on any government restricted party
              list.
            </P>
          </Section>

          {/* §13 */}
          <Section num={13} title="Governing Law and Jurisdiction" accent={ACCENTS[12]}>
            <P>
              This EULA shall be governed by and construed in accordance with the laws of the
              jurisdiction in which the applicable KoveTrade entity is incorporated, without regard
              to its conflict of law provisions.
            </P>
            <div className="mt-3 p-4 rounded-xl border border-green-500/20 bg-green-500/5">
              <p className="text-xs font-semibold text-green-300 mb-2">Jurisdiction & Consent</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Any disputes arising out of or in connection with this EULA shall be submitted to
                the exclusive jurisdiction of the courts in the relevant jurisdiction. You consent
                to the personal jurisdiction of such courts and waive any objections to the exercise
                of jurisdiction by such courts.
              </p>
            </div>
          </Section>

          {/* §14 */}
          <Section num={14} title="Severability and Entire Agreement" accent={ACCENTS[13]}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-teal-500/20 bg-teal-500/5">
                <p className="text-xs font-semibold text-teal-300 mb-2">🔧 Severability</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  If any provision is held invalid or unenforceable, it shall be modified to the
                  minimum extent necessary. Remaining provisions continue in full force.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-lime-400/20 bg-lime-400/5">
                <p className="text-xs font-semibold text-lime-300 mb-2">📄 Entire Agreement</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  This EULA constitutes the entire agreement between you and KoveTrade regarding
                  the Software, superseding all prior communications and agreements.
                </p>
              </div>
            </div>
            <P>
              No amendment or modification of this EULA shall be binding unless made in writing and
              signed by an authorized representative of KoveTrade.
            </P>
          </Section>

        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden border border-emerald-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/60 via-teal-950/40 to-green-950/40" />
              <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-emerald-500/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-teal-500/10 blur-3xl" />

              <div className="relative p-10 text-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24">
                    <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093M12 21h.01M12 3a9 9 0 110 18A9 9 0 0112 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  Have{" "}
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    Questions?
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
                  If you have any questions about this End User License Agreement, our team is
                  available to assist you with any inquiries regarding your rights and obligations
                  under this agreement.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="mailto:support@kovetrade.com"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-sm hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg shadow-emerald-900/30"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                      <path d="M2 4h12v9a1 1 0 01-1 1H3a1 1 0 01-1-1V4zm0 0l6 5 6-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Contact Support
                  </a>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-white/15 text-gray-900 dark:text-white font-semibold text-sm hover:bg-white/8 transition-all"
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
