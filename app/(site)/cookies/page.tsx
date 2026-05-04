"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

const E = [0.16, 1, 0.3, 1] as const;

function Reveal({
  children, delay = 0, className = "",
}: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.7, delay, ease: E }} className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Cookie browser mockup ──────────────────────────────────────
function BrowserMockup() {
  const [accepted, setAccepted] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: E }}
      className="w-full max-w-sm mx-auto select-none"
    >
      {/* Browser chrome */}
      <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/30 border border-white/[0.12] bg-[#1a1d27]">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#13151e] border-b border-white/[0.07]">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-amber-400/80" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <div className="flex-1 mx-3 rounded-md bg-white/[0.06] border border-white/[0.08] px-3 py-1.5 flex items-center gap-2">
            <svg className="w-3 h-3 text-gray-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-[10px] text-gray-500 font-mono">kovetrade.com</span>
          </div>
        </div>

        {/* Page content area */}
        <div className="p-4 space-y-2 min-h-[180px]">
          {/* Fake content lines */}
          {[80, 65, 90, 55, 75].map((w, i) => (
            <div key={i} className="h-2.5 rounded-full bg-white/[0.06]" style={{ width: `${w}%` }} />
          ))}
          <div className="h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 mt-4" />
        </div>

        {/* Cookie consent banner */}
        <AnimatePresence>
          {!accepted && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.4, ease: E }}
              className="mx-3 mb-3 rounded-xl bg-[#0f1117] border border-teal-500/25 p-4"
            >
              <div className="flex items-start gap-2.5 mb-3">
                <span className="text-lg shrink-0">🍪</span>
                <div>
                  <p className="text-[12px] font-bold text-white mb-1">We use cookies</p>
                  <p className="text-[10px] text-gray-500 leading-snug">
                    We use cookies to improve your experience and analyze site usage.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setAccepted(true)}
                  className="flex-1 py-2 rounded-lg bg-teal-500 text-white text-[11px] font-bold hover:bg-teal-400 transition-colors duration-200"
                >
                  Accept All
                </button>
                <button className="flex-1 py-2 rounded-lg bg-white/[0.06] border border-white/[0.1] text-gray-400 text-[11px] font-bold hover:bg-white/[0.1] transition-colors duration-200">
                  Manage
                </button>
              </div>
            </motion.div>
          )}
          {accepted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-3 mb-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 px-4 py-3 flex items-center gap-2.5"
            >
              <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <p className="text-[11px] text-emerald-400 font-semibold">Preferences saved — thank you!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating cookie chips */}
      <motion.div
        className="absolute -top-4 -right-4 flex items-center gap-2 rounded-2xl bg-teal-500 px-3.5 py-2 shadow-xl shadow-teal-500/30"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5, ease: E }}
      >
        <span className="text-sm">🍪</span>
        <p className="text-white text-[11px] font-bold">6 cookies active</p>
      </motion.div>
    </motion.div>
  );
}

// ─── Cookie type comparison ─────────────────────────────────────
const SESSION_USES = [
  "Maintain your login state during the session",
  "Remember preferences within a single visit",
  "Ensure account security while logged in",
  "Enable real-time trading platform functionality",
];

const PERSISTENT_USES = [
  "Remember login credentials with \"Remember Me\"",
  "Store language and display preferences",
  "Analyse platform usage for continuous improvement",
  "Deliver relevant content based on your interests",
];

// ─── Third-party providers ─────────────────────────────────────
const THIRD_PARTIES = [
  { name: "Google Analytics",  purpose: "Traffic & user behaviour analysis",       icon: "GA",  color: "from-orange-500 to-amber-500"   },
  { name: "Google Ads",        purpose: "Targeted advertising & remarketing",      icon: "Ads", color: "from-[#5edc1f] to-lime-400"      },
  { name: "Hotjar",            purpose: "Heatmaps & session recordings",           icon: "HJ",  color: "from-[#5edc1f] to-green-700"      },
  { name: "Intercom",          purpose: "Live chat & customer support",            icon: "IC",  color: "from-[#5edc1f] to-green-700"  },
  { name: "Cloudflare",        purpose: "Security, fraud detection & CDN",         icon: "CF",  color: "from-amber-500 to-orange-600"   },
  { name: "Meta Pixel",        purpose: "Social advertising & conversion tracking", icon: "FB", color: "from-[#4cc015] to-green-700"    },
];

// ─── Web beacon steps ──────────────────────────────────────────
const BEACON_USES = [
  { icon: "📊", t: "Campaign measurement",     b: "Track effectiveness of our marketing campaigns across channels" },
  { icon: "📧", t: "Email engagement",          b: "See which emails are opened and which links are clicked"        },
  { icon: "🔍", t: "Traffic analysis",          b: "Understand user navigation and behaviour on our platform"       },
];

// ─── Accordion section ─────────────────────────────────────────
function AccordionSection({
  n, label, title, accentClass, borderClass, bgClass, iconBg, icon, children, delay = 0,
}: {
  n: number; label: string; title: string;
  accentClass: string; borderClass: string; bgClass: string; iconBg: string;
  icon: React.ReactNode; children: React.ReactNode; delay?: number;
}) {
  const [open, setOpen] = useState(true);
  return (
    <Reveal delay={delay}>
      <div id={`s${n}`} className={`scroll-mt-20 rounded-3xl border ${borderClass} overflow-hidden`}>
        <button
          onClick={() => setOpen(v => !v)}
          className={`w-full flex items-center gap-4 px-6 sm:px-8 py-5 text-left ${bgClass} hover:brightness-[0.98] dark:hover:brightness-110 transition-all duration-200`}
        >
          <div className={`w-10 h-10 rounded-2xl ${iconBg} flex items-center justify-center text-white shadow-lg shrink-0`}>
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-0.5 ${accentClass}`}>{label}</p>
            <h2 className="text-base sm:text-[17px] font-black text-gray-900 dark:text-white leading-snug truncate pr-4">{title}</h2>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden sm:flex w-7 h-7 rounded-xl bg-gray-100 dark:bg-white/[0.07] items-center justify-center text-[11px] font-black text-gray-500 dark:text-gray-500">
              {n}
            </span>
            <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </div>
        </button>

        <motion.div
          animate={{ height: open ? "auto" : 0 }}
          initial={false}
          transition={{ duration: 0.35, ease: E }}
          className="overflow-hidden"
        >
          <div className="px-6 sm:px-8 pt-2 pb-7 bg-white dark:bg-[#0c0d0f]">
            {children}
          </div>
        </motion.div>
      </div>
    </Reveal>
  );
}

// ─── Page ──────────────────────────────────────────────────────
export default function CookiesPolicy() {
  return (
    <div className="overflow-x-hidden bg-white dark:bg-[#070809] text-gray-900 dark:text-white">
      <Navbar />

      {/* ── Hero — dark, technical feel ── */}
      <section className="relative overflow-hidden bg-gray-100 dark:bg-[#0d0f16] pt-28 pb-24 sm:pt-36 sm:pb-32">
        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        {/* Glow */}
        <div className="aurora-a absolute -top-[20%] -left-[5%] w-[600px] h-[600px] rounded-full opacity-30 hidden dark:block"
          style={{ background: "radial-gradient(circle, #0d9488 0%, transparent 65%)" }} />
        <div className="aurora-b absolute -bottom-[15%] right-[5%] w-[500px] h-[500px] rounded-full opacity-20 hidden dark:block"
          style={{ background: "radial-gradient(circle, #4cc015 0%, transparent 65%)" }} />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left copy */}
            <div>
              <motion.div
                className="inline-flex items-center gap-2 rounded-full border border-teal-500/25 bg-teal-500/[0.08] px-4 py-2 mb-7"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: E }}
              >
                <span className="text-base">🍪</span>
                <span className="text-[11px] font-semibold text-teal-700 dark:text-teal-300 tracking-wide">Cookie Management · KoveTrade</span>
              </motion.div>

              <motion.h1
                className="font-black tracking-tight leading-[1.04] mb-5 text-gray-900 dark:text-white"
                style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.6rem)" }}
                initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08, ease: E }}
              >
                Cookies{" "}
                <span className="bg-gradient-to-r from-teal-400 via-lime-300 to-[#5edc1f] bg-clip-text text-transparent">
                  Policy
                </span>
              </motion.h1>

              <motion.p
                className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-md"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.15, ease: E }}
              >
                We use cookies to make KoveTrade work better for you. Here&apos;s a plain-English guide to
                exactly what we place on your device and how you stay in control.
              </motion.p>

              {/* Meta chips */}
              <motion.div
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.26 }}
              >
                {[
                  { label: "Last Updated",   val: "February 2026" },
                  { label: "Cookie Types",   val: "3 Categories"  },
                  { label: "Opt-Out",        val: "Always Free"   },
                ].map(({ label, val }) => (
                  <div key={label} className="rounded-2xl border border-gray-300 dark:border-white/[0.09] bg-gray-100 dark:bg-white/[0.04] px-4 py-2.5">
                    <p className="text-[10px] text-gray-600 font-medium">{label}</p>
                    <p className="text-[13px] text-gray-900 dark:text-white font-bold">{val}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — interactive browser mockup */}
            <div className="relative flex justify-center lg:justify-end">
              <BrowserMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky nav ── */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-[#070809]/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/[0.06]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex items-center gap-2 py-3 overflow-x-auto no-scrollbar">
            <span className="text-[11px] text-gray-400 dark:text-gray-600 font-medium shrink-0 mr-1">Jump:</span>
            {[
              { n: 1, l: "Intro"        },
              { n: 2, l: "What is a Cookie?" },
              { n: 3, l: "Manage"       },
              { n: 4, l: "Consent"      },
              { n: 5, l: "Session"      },
              { n: 6, l: "Persistent"   },
              { n: 7, l: "Third-Party"  },
              { n: 8, l: "Web Beacons"  },
              { n: 9, l: "Opt Out"      },
            ].map(({ n, l }) => (
              <a key={n} href={`#s${n}`}
                className="shrink-0 rounded-full bg-gray-100 dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.07] hover:border-teal-400 dark:hover:border-teal-500/50 hover:text-teal-700 dark:hover:text-teal-300 px-3.5 py-1.5 text-[11px] font-semibold text-gray-500 dark:text-gray-500 transition-all duration-200"
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

          {/* §1 Introduction */}
          <AccordionSection n={1} label="Overview" title="Introduction" delay={0}
            accentClass="text-teal-600 dark:text-teal-400"
            borderClass="border-teal-100 dark:border-teal-500/[0.15]"
            bgClass="bg-teal-50/60 dark:bg-teal-500/[0.04]"
            iconBg="bg-gradient-to-br from-teal-500 to-cyan-600"
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>}
          >
            <p className="text-[14px] sm:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed">
              This Cookies Policy explains how KoveTrade uses cookies and similar tracking technologies when you visit
              our website and use our platform. By continuing to browse or use our services, you agree to the use of
              cookies as described in this policy. We encourage you to read it carefully to understand what cookies are,
              how we use them, and how you can manage your preferences.
            </p>
          </AccordionSection>

          {/* §2 What is a Cookie */}
          <AccordionSection n={2} label="Definition" title="What is a Cookie?" delay={0.04}
            accentClass="text-[#4cc015] dark:text-lime-400"
            borderClass="border-green-100 dark:border-[#5edc1f]/[0.15]"
            bgClass="bg-green-50/60 dark:bg-[#5edc1f]/[0.04]"
            iconBg="bg-gradient-to-br from-[#5edc1f] to-green-700"
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>}
          >
            <p className="text-[14px] sm:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              A cookie is a small text file placed on your computer, smartphone, or other device when you visit a website.
              They make websites work more efficiently and provide a better user experience.
            </p>
            {/* Two-column key attributes */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  label: "By duration", icon: "⏱️",
                  items: [
                    { name: "Session cookies",    desc: "Deleted when you close your browser" },
                    { name: "Persistent cookies", desc: "Remain until expiry or manual deletion" },
                  ],
                },
                {
                  label: "By origin", icon: "🌐",
                  items: [
                    { name: "First-party",  desc: "Set by the website you are visiting (us)" },
                    { name: "Third-party",  desc: "Set by external services on our pages" },
                  ],
                },
              ].map(({ label, icon, items }) => (
                <div key={label} className="rounded-2xl border border-green-100 dark:border-[#5edc1f]/[0.15] bg-green-50/50 dark:bg-[#5edc1f]/[0.04] p-5">
                  <p className="text-[11px] font-bold text-[#4cc015] dark:text-lime-400 tracking-widest uppercase mb-3 flex items-center gap-2">
                    <span>{icon}</span>{label}
                  </p>
                  {items.map(({ name, desc }) => (
                    <div key={name} className="flex items-start gap-2.5 mb-2.5 last:mb-0">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-lime-400 dark:bg-[#5edc1f] shrink-0" />
                      <div>
                        <span className="text-[13px] font-bold text-gray-800 dark:text-gray-200">{name} — </span>
                        <span className="text-[13px] text-gray-500 dark:text-gray-500">{desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </AccordionSection>

          {/* §3 How to Delete / Block */}
          <AccordionSection n={3} label="Browser Controls" title="How to Delete and Block Cookies" delay={0.06}
            accentClass="text-[#4cc015] dark:text-lime-400"
            borderClass="border-green-100 dark:border-[#5edc1f]/[0.15]"
            bgClass="bg-green-50/60 dark:bg-[#5edc1f]/[0.04]"
            iconBg="bg-gradient-to-br from-[#5edc1f] to-green-700"
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" /></svg>}
          >
            <p className="text-[14px] sm:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
              Most web browsers allow you to control cookies through their settings. Please note that blocking or
              deleting cookies may impact your experience on our platform and some features may not function properly.
            </p>
            {/* Browser quick-links */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              {[
                { name: "Chrome",  path: "Settings → Privacy → Cookies", color: "from-[#5edc1f] to-[#5edc1f]" },
                { name: "Firefox", path: "Settings → Privacy & Security", color: "from-orange-500 to-amber-500" },
                { name: "Safari",  path: "Preferences → Privacy",         color: "from-lime-400 to-lime-400" },
                { name: "Edge",    path: "Settings → Cookies & data",     color: "from-teal-500 to-lime-400" },
              ].map(({ name, path, color }) => (
                <div key={name} className="rounded-2xl border border-gray-100 dark:border-white/[0.07] bg-white dark:bg-white/[0.03] p-4 text-center">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-[11px] font-black mx-auto mb-2`}>
                    {name.slice(0, 2)}
                  </div>
                  <p className="text-[12px] font-bold text-gray-800 dark:text-white mb-0.5">{name}</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-snug">{path}</p>
                </div>
              ))}
            </div>
            <p className="text-[13px] text-gray-500 dark:text-gray-500">
              For a comprehensive guide on managing cookies, visit{" "}
              <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer"
                className="text-[#4cc015] dark:text-lime-400 font-semibold hover:underline">
                allaboutcookies.org
              </a>
            </p>
          </AccordionSection>

          {/* §4 Consent */}
          <AccordionSection n={4} label="Your Agreement" title="Your Consent" delay={0.08}
            accentClass="text-emerald-600 dark:text-emerald-400"
            borderClass="border-emerald-100 dark:border-emerald-500/[0.15]"
            bgClass="bg-emerald-50/60 dark:bg-emerald-500/[0.04]"
            iconBg="bg-gradient-to-br from-emerald-500 to-teal-600"
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>}
          >
            <p className="text-[14px] sm:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
              By using the KoveTrade website and platform, you consent to the placement of cookies on your device as
              described in this policy. When you first visit our website, you will be presented with a cookie consent
              banner that allows you to accept or customise your preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {[
                { icon: "🎛️", t: "Customise on arrival", b: "On your first visit, choose exactly which categories of cookies to allow" },
                { icon: "🔄", t: "Withdraw anytime",     b: "Adjust your preferences through browser settings or by contacting us" },
                { icon: "🛡️", t: "Essential only mode",  b: "Decline all non-essential cookies without losing core platform access" },
              ].map(({ icon, t, b }) => (
                <div key={t} className="flex-1 rounded-2xl bg-emerald-50 dark:bg-emerald-500/[0.05] border border-emerald-100 dark:border-emerald-500/[0.15] p-4 flex items-start gap-3">
                  <span className="text-xl shrink-0">{icon}</span>
                  <div>
                    <p className="text-[13px] font-bold text-gray-900 dark:text-white mb-0.5">{t}</p>
                    <p className="text-[12px] text-gray-500 dark:text-gray-500 leading-snug">{b}</p>
                  </div>
                </div>
              ))}
            </div>
          </AccordionSection>

          {/* §5 + §6 Session vs Persistent — combined visual comparison */}
          <Reveal delay={0.1}>
            <div id="s5" className="scroll-mt-20 rounded-3xl border border-gray-100 dark:border-white/[0.06] overflow-hidden bg-white dark:bg-[#0c0d0f]">
              {/* Header */}
              <div className="flex items-center justify-between px-6 sm:px-8 py-5 bg-gray-50/80 dark:bg-white/[0.02] border-b border-gray-100 dark:border-white/[0.06]">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 dark:text-gray-500 mb-0.5">Sections 5 & 6</p>
                  <h2 className="text-base sm:text-[17px] font-black text-gray-900 dark:text-white">Cookie Types: Session vs Persistent</h2>
                </div>
                <span className="text-2xl">🔄</span>
              </div>

              <div id="s6" className="scroll-mt-20 grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 dark:divide-white/[0.06]">
                {/* Session */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#5edc1f] to-[#4cc015] flex items-center justify-center text-white shadow-lg shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[#4cc015] dark:text-lime-400 uppercase tracking-widest">§5 · Temporary</p>
                      <p className="text-[15px] font-black text-gray-900 dark:text-white">Session Cookies</p>
                    </div>
                  </div>
                  <div className="mb-4 flex items-center gap-2 rounded-xl bg-green-50 dark:bg-[#5edc1f]/[0.08] border border-green-100 dark:border-[#5edc1f]/[0.2] px-3 py-2">
                    <svg className="w-3.5 h-3.5 text-[#5edc1f] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span className="text-[11px] text-green-700 dark:text-lime-400 font-semibold">Auto-deleted when browser closes</span>
                  </div>
                  <ul className="space-y-2.5">
                    {SESSION_USES.map((u) => (
                      <li key={u} className="flex items-start gap-2.5">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#5edc1f] shrink-0" />
                        <span className="text-[13px] text-gray-600 dark:text-gray-400 leading-snug">{u}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Persistent */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">§6 · Stored</p>
                      <p className="text-[15px] font-black text-gray-900 dark:text-white">Persistent Cookies</p>
                    </div>
                  </div>
                  <div className="mb-4 flex items-center gap-2 rounded-xl bg-amber-50 dark:bg-amber-500/[0.08] border border-amber-100 dark:border-amber-500/[0.2] px-3 py-2">
                    <svg className="w-3.5 h-3.5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                    <span className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold">Remain until expiry or manually deleted</span>
                  </div>
                  <ul className="space-y-2.5">
                    {PERSISTENT_USES.map((u) => (
                      <li key={u} className="flex items-start gap-2.5">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span className="text-[13px] text-gray-600 dark:text-gray-400 leading-snug">{u}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          {/* §7 Third-party */}
          <AccordionSection n={7} label="External Providers" title="Third-Party Cookies" delay={0.12}
            accentClass="text-rose-600 dark:text-lime-400"
            borderClass="border-green-100 dark:border-rose-500/[0.15]"
            bgClass="bg-rose-50/60 dark:bg-rose-500/[0.04]"
            iconBg="bg-gradient-to-br from-[#5edc1f] to-green-700"
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>}
          >
            <p className="text-[14px] sm:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
              In addition to our own cookies, KoveTrade may allow third-party service providers to place cookies on
              your device. We do not control these cookies — their use is governed by the respective provider&apos;s privacy policy.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {THIRD_PARTIES.map(({ name, purpose, icon, color }) => (
                <div key={name} className="flex items-start gap-3 rounded-2xl border border-gray-100 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] p-4 hover:border-rose-200 dark:hover:border-rose-500/20 transition-colors duration-200">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-[10px] font-black shrink-0 shadow-md`}>
                    {icon}
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-gray-900 dark:text-white leading-none mb-1">{name}</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-500 leading-snug">{purpose}</p>
                  </div>
                </div>
              ))}
            </div>
          </AccordionSection>

          {/* §8 Web Beacons */}
          <AccordionSection n={8} label="Tracking Pixels" title="Use of Web Beacons" delay={0.14}
            accentClass="text-green-700 dark:text-lime-400"
            borderClass="border-green-100 dark:border-[#5edc1f]/[0.15]"
            bgClass="bg-lime-50/60 dark:bg-[#5edc1f]/[0.04]"
            iconBg="bg-gradient-to-br from-[#5edc1f] to-green-700"
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
          >
            <p className="text-[14px] sm:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
              In addition to cookies, KoveTrade may use web beacons (also known as pixel tags, clear GIFs, or tracking pixels)
              — tiny, invisible graphic images — on our website and in our emails to understand user engagement.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {BEACON_USES.map(({ icon, t, b }) => (
                <div key={t} className="relative rounded-2xl border border-green-100 dark:border-[#5edc1f]/[0.15] bg-lime-50/50 dark:bg-[#5edc1f]/[0.04] p-5 overflow-hidden">
                  <div className="absolute top-3 right-3 text-green-200 dark:text-green-900/60 text-4xl font-black select-none pointer-events-none leading-none">
                    {icon}
                  </div>
                  <p className="text-[13px] font-bold text-gray-900 dark:text-white mb-1.5">{t}</p>
                  <p className="text-[12px] text-gray-500 dark:text-gray-500 leading-relaxed">{b}</p>
                </div>
              ))}
            </div>
          </AccordionSection>

          {/* §9 Opt Out */}
          <AccordionSection n={9} label="Your Control" title="Opt Out" delay={0.16}
            accentClass="text-teal-600 dark:text-teal-400"
            borderClass="border-teal-100 dark:border-teal-500/[0.15]"
            bgClass="bg-teal-50/60 dark:bg-teal-500/[0.04]"
            iconBg="bg-gradient-to-br from-teal-500 to-cyan-600"
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>}
          >
            <p className="text-[14px] sm:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
              If you wish to opt out of non-essential cookies and tracking technologies, you can adjust your
              preferences through your browser settings or contact us directly. Disabling certain cookies may
              affect the functionality of our platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 rounded-2xl border border-teal-200 dark:border-teal-500/25 bg-teal-50 dark:bg-teal-500/[0.06] p-5">
              <div className="flex-1">
                <p className="text-[14px] font-bold text-gray-900 dark:text-white mb-1">To update your cookie preferences</p>
                <p className="text-[13px] text-gray-500 dark:text-gray-400">Email our team and we&apos;ll update your settings within 24 hours.</p>
              </div>
              <a
                href="mailto:support@kovetrade.com"
                className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-bold text-[13px] px-5 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-500/30"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                support@kovetrade.com
              </a>
            </div>
          </AccordionSection>

          {/* ── Footer CTA ── */}
          <Reveal delay={0.18}>
            <div
              className="relative rounded-3xl overflow-hidden text-center p-8 sm:p-10 shadow-2xl shadow-teal-900/20"
              style={{ background: "linear-gradient(135deg, #0f766e 0%, #0891b2 55%, #2d6a0a 100%)" }}
            >
              <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
              <div className="absolute -top-[30%] right-[20%] w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)" }} />

              <div className="relative z-10">
                <span className="text-4xl block mb-4">🍪</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-3">Questions about cookies?</h3>
                <p className="text-teal-100 text-[14px] max-w-sm mx-auto leading-relaxed mb-8">
                  Our support team is happy to explain exactly what is stored on your device and how to manage it.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="mailto:support@kovetrade.com"
                    className="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-teal-700 hover:bg-teal-50 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20 transition-all duration-300"
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
