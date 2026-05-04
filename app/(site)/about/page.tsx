"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
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
      transition={{ duration: 0.8, delay, ease: E }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Stat pill ────────────────────────────────────────────────────
function Stat({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className="text-center">
        <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[#5edc1f] via-lime-300 to-emerald-400 bg-clip-text text-transparent">
          {value}
        </p>
        <p className="text-xs text-gray-500 mt-1">{label}</p>
      </div>
    </Reveal>
  );
}

// ─── Value card ───────────────────────────────────────────────────
function ValueCard({ icon, title, body, accent, delay = 0 }: {
  icon: string; title: string; body: string; accent: string; delay?: number;
}) {
  const accentMap: Record<string, { border: string; bg: string; glow: string }> = {
    indigo:  { border: "border-[#5edc1f]/25",  bg: "bg-[#5edc1f]/6",  glow: "bg-[#5edc1f]/15" },
    rose:    { border: "border-[#5edc1f]/25",    bg: "bg-[#5edc1f]/6",    glow: "bg-[#5edc1f]/15" },
    violet:  { border: "border-[#5edc1f]/25",  bg: "bg-[#5edc1f]/10",  glow: "bg-[#5edc1f]/15" },
    emerald: { border: "border-emerald-500/25", bg: "bg-emerald-500/6", glow: "bg-emerald-500/15" },
  };
  const a = accentMap[accent] ?? accentMap.indigo;
  return (
    <Reveal delay={delay}>
      <div className={`relative rounded-3xl border ${a.border} ${a.bg} p-7 h-full overflow-hidden group hover:scale-[1.02] transition-transform duration-300`}>
        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full ${a.glow} blur-3xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity`} />
        <div className="relative">
          <span className="text-3xl block mb-4">{icon}</span>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{body}</p>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Regulator card ───────────────────────────────────────────────
function RegCard({ flag, region, entity, regulator, license, delay = 0 }: {
  flag: string; region: string; entity: string;
  regulator: string; license: string; delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="flex items-start gap-4 p-5 rounded-2xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/[0.025] hover:border-[#5edc1f]/20 hover:bg-[#5edc1f]/5 transition-all">
        <span className="text-3xl flex-shrink-0">{flag}</span>
        <div>
          <p className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-0.5">{region}</p>
          <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">{entity}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">{regulator}</p>
          <p className="text-xs text-lime-400 font-mono mt-0.5">{license}</p>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Page ────────────────────────────────────────────────────────
export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#070f08] text-gray-900 dark:text-white">
      <style>{`
        @keyframes ab-a { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.06)} 66%{transform:translate(-14px,16px) scale(0.96)} }
        @keyframes ab-b { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-22px,24px) scale(1.05)} }
        .ab-a{animation:ab-a 18s ease-in-out infinite}
        .ab-b{animation:ab-b 24s ease-in-out infinite}
      `}</style>

      {/* Aurora */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none hidden dark:block">
        <div className="ab-a absolute top-[-8%] left-[-4%] w-[55vw] h-[55vw] rounded-full bg-green-900/10 blur-[130px]" />
        <div className="ab-b absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-green-900/12 blur-[120px]" />
        <div className="ab-a absolute top-[45%] left-[25%] w-[38vw] h-[38vw] rounded-full bg-green-900/7 blur-[140px]" style={{ animationDelay: "8s" }} />
      </div>

      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center pt-28 pb-20 px-4 overflow-hidden">
        {/* Background image with parallax */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ y: heroY, scale: heroScale }}
        >
          <Image
            src="/images/about_1.jpg"
            alt="KoveTrade team"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07070f]/80 via-[#07070f]/70 to-[#07070f]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07070f]/60 via-transparent to-[#07070f]/60" />
        </motion.div>

        <div className="relative max-w-6xl mx-auto w-full">
          <Reveal delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#5edc1f]/35 bg-[#5edc1f]/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
              <span className="text-xs text-lime-300 font-medium tracking-wide">About KoveTrade</span>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-5 max-w-3xl text-white">
              Democratizing
              <br />
              <span className="bg-gradient-to-r from-[#5edc1f] via-lime-300 to-emerald-400 bg-clip-text text-transparent">
                copy trading
              </span>
              <br />
              for everyone.
            </h1>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="text-white/80 text-xl leading-relaxed max-w-xl">
              We believe every investor deserves access to professional-grade trading strategies
              — regardless of experience or background.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────────── */}
      <section className="py-12 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-x-0 md:divide-x divide-gray-200 dark:divide-white/8">
            <Stat value="150k+"  label="Global Traders"       delay={0.05} />
            <Stat value="4"      label="Regulated Entities"   delay={0.12} />
            <Stat value="$2.4B+" label="Volume Copied"        delay={0.19} />
            <Stat value="99.9%"  label="Platform Uptime"      delay={0.26} />
          </div>
        </div>
      </section>

      {/* ── Our Story ────────────────────────────────────────────── */}
      <section className="py-24 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Text */}
            <Reveal dir="left">
              <div>
                <p className="text-xs text-lime-400 font-mono uppercase tracking-widest mb-4">Our Story</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-snug">
                  Built to bridge{" "}
                  <span className="bg-gradient-to-r from-[#5edc1f] to-emerald-400 bg-clip-text text-transparent">
                    the gap.
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                  KoveTrade was founded with a clear mission: to make professional-grade copy trading
                  accessible to everyone. We believe that every investor, regardless of experience
                  level, should have the ability to mirror the strategies of top-performing traders
                  with precision, flexibility, and transparency.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  From our early days, we set out to build a platform that bridges the gap between
                  experienced traders and those looking to learn and grow their portfolios. Today,
                  KoveTrade serves a global community of traders across futures, options, and
                  contracts.
                </p>
              </div>
            </Reveal>

            {/* Images — stacked collage */}
            <Reveal delay={0.15} dir="right">
              <div className="relative">
                {/* Main large image */}
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl shadow-black/40">
                  <Image
                    src="/images/about_2.jpg"
                    alt="KoveTrade annual report presentation"
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Floating smaller image bottom-left */}
                <motion.div
                  className="absolute -bottom-8 -left-8 w-44 h-32 rounded-2xl overflow-hidden border-4 border-white dark:border-[#07070f] shadow-xl shadow-black/50 hidden sm:block"
                  initial={{ opacity: 0, x: -20, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8, ease: E }}
                >
                  <Image
                    src="/images/about_1.jpg"
                    alt="KoveTrade team discussion"
                    fill
                    className="object-cover object-center"
                  />
                </motion.div>

                {/* Stat chip top-right */}
                <motion.div
                  className="absolute -top-5 -right-5 px-4 py-3 rounded-2xl border border-[#5edc1f]/30 bg-[#070f08]/95 backdrop-blur-sm hidden sm:block"
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6, ease: E }}
                >
                  <p className="text-2xl font-black text-lime-400">150k+</p>
                  <p className="text-[10px] text-gray-500">Active traders</p>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────────────── */}
      <section className="py-24 px-4 border-t border-gray-100 dark:border-white/5 relative overflow-hidden">
        {/* Background tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-950/10 to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto relative">
          <Reveal className="text-center mb-16">
            <p className="text-xs text-lime-400 font-mono uppercase tracking-widest mb-4">Our Mission</p>
            <h2 className="text-3xl md:text-5xl font-bold max-w-3xl mx-auto leading-tight">
              Empowering individuals{" "}
              <span className="bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">
                worldwide
              </span>{" "}
              to participate in financial markets.
            </h2>
          </Reveal>

          <Reveal delay={0.15} className="max-w-3xl mx-auto text-center">
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              We provide intuitive copy trading tools, real-time trade mirroring, and a transparent
              community of traders. We are committed to removing barriers to entry and ensuring
              that every user has the resources they need to make informed investment decisions.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────── */}
      <section className="py-24 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className="text-xs text-lime-400 font-mono uppercase tracking-widest mb-4">What drives us</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Our{" "}
              <span className="bg-gradient-to-r from-[#5edc1f] to-emerald-400 bg-clip-text text-transparent">
                Values
              </span>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <ValueCard
              icon="🔭"
              title="Transparency"
              body="Every trader's performance, fees, and risk metrics are openly available so you can make informed decisions at every step."
              accent="indigo"
              delay={0.05}
            />
            <ValueCard
              icon="⚡"
              title="Innovation"
              body="From AutoGuard™ risk protection to real-time trade mirroring, we continuously build cutting-edge tools that keep you ahead."
              accent="violet"
              delay={0.12}
            />
            <ValueCard
              icon="🔐"
              title="Security"
              body="Your funds and data are protected with enterprise-grade encryption, segregated accounts, and multi-layered security protocols."
              accent="rose"
              delay={0.19}
            />
            <ValueCard
              icon="🌐"
              title="Community"
              body="We foster a global network of traders who learn from each other, share strategies, and grow together every day."
              accent="emerald"
              delay={0.26}
            />
          </div>
        </div>
      </section>

      {/* ── Our Team ─────────────────────────────────────────────── */}
      <section className="py-24 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Images — side by side mosaic */}
            <Reveal dir="left">
              <div className="grid grid-cols-2 gap-4">
                {/* Tall left image */}
                <div className="relative rounded-3xl overflow-hidden row-span-2" style={{ aspectRatio: "3/4" }}>
                  <Image
                    src="/images/about_3.jpg"
                    alt="KoveTrade team collaborating"
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Top right */}
                <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: "1/1" }}>
                  <Image
                    src="/images/about_4.jpg"
                    alt="KoveTrade team meeting"
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Bottom right — stat card */}
                <motion.div
                  className="rounded-3xl border border-[#5edc1f]/25 bg-gradient-to-br from-green-950/60 to-emerald-950/40 p-6 flex flex-col justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.7, ease: E }}
                >
                  <p className="text-4xl font-black bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">50+</p>
                  <p className="text-sm text-gray-900 dark:text-white font-semibold mt-1">Team members</p>
                  <p className="text-xs text-gray-500 mt-1">Across 12 countries</p>
                </motion.div>
              </div>
            </Reveal>

            {/* Text */}
            <Reveal delay={0.15} dir="right">
              <div>
                <p className="text-xs text-lime-400 font-mono uppercase tracking-widest mb-4">The People</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-snug">
                  Built by a{" "}
                  <span className="bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">
                    diverse team
                  </span>{" "}
                  of experts.
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  Behind KoveTrade is a diverse team of financial professionals, technologists, and
                  compliance experts united by a shared passion for making copy trading better. Our
                  team brings decades of combined experience in financial services, fintech
                  development, and regulatory compliance.
                </p>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { v: "30+", l: "Years combined experience" },
                    { v: "12",  l: "Countries represented" },
                    { v: "4",   l: "Regulated jurisdictions" },
                  ].map((s, i) => (
                    <Reveal key={i} delay={0.25 + i * 0.08}>
                      <div className="p-4 rounded-2xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/[0.025] text-center">
                        <p className="text-2xl font-black bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">{s.v}</p>
                        <p className="text-[10px] text-gray-500 mt-1 leading-tight">{s.l}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Global Presence ──────────────────────────────────────── */}
      <section className="py-24 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className="text-xs text-lime-400 font-mono uppercase tracking-widest mb-4">Regulation</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Global{" "}
              <span className="bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">
                Presence
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xl mx-auto">
              KoveTrade operates under strict regulatory oversight across multiple jurisdictions,
              ensuring the highest standards of compliance and client protection.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-4">
            <RegCard
              flag="🇪🇺" region="Europe"
              entity="KoveTrade (Europe) Ltd."
              regulator="Cyprus Securities Exchange Commission (CySEC)"
              license="License #109/10"
              delay={0.05}
            />
            <RegCard
              flag="🇬🇧" region="United Kingdom"
              entity="KoveTrade (UK) Ltd."
              regulator="Financial Conduct Authority (FCA)"
              license="FRN 583263"
              delay={0.12}
            />
            <RegCard
              flag="🇺🇸" region="United States"
              entity="KoveTrade (USA) Ltd."
              regulator="Securities and Exchange Commission (SEC)"
              license="CRD 298461"
              delay={0.19}
            />
            <RegCard
              flag="🇦🇪" region="Middle East"
              entity="KoveTrade (ME) Limited"
              regulator="ADGM Financial Services Regulatory Authority (FSRA)"
              license="Permission Number 220073"
              delay={0.26}
            />
          </div>
        </div>
      </section>

      {/* ── Get in Touch / CTA ───────────────────────────────────── */}
      <section className="py-16 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6">

            {/* Get in touch */}
            <Reveal dir="left">
              <div className="relative rounded-3xl overflow-hidden border border-gray-200 dark:border-white/8 h-full min-h-[220px]">
                <Image
                  src="/images/about_1.jpg"
                  alt="KoveTrade support"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#07070f]/85 via-[#07070f]/70 to-[#07070f]/85" />
                <div className="relative p-8 flex flex-col justify-end h-full">
                  <p className="text-xs text-lime-400 font-mono uppercase tracking-widest mb-2">Get in Touch</p>
                  <h3 className="text-2xl font-bold text-white mb-2">We'd love to hear from you.</h3>
                  <p className="text-sm text-white/70 mb-5">
                    Have questions about KoveTrade? Reach out to our team — we are always happy to help.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="mailto:support@kovetrade.com"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5edc1f]/20 border border-[#5edc1f]/30 text-lime-300 text-sm font-medium hover:bg-[#5edc1f]/30 transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                        <path d="M2 4h12v9a1 1 0 01-1 1H3a1 1 0 01-1-1V4zm0 0l6 5 6-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      support@kovetrade.com
                    </a>
                    <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-white/15 text-gray-900 dark:text-white text-sm font-medium hover:bg-white/8 transition-all">
                      💬 Live Chat
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Get started */}
            <Reveal delay={0.1} dir="right">
              <div className="relative rounded-3xl overflow-hidden border border-[#5edc1f]/25 h-full min-h-[220px]">
                <div className="absolute inset-0 bg-gradient-to-br from-green-950/80 via-green-900/60 to-emerald-950/50" />
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#5edc1f]/12 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#5edc1f]/10 blur-3xl" />

                <div className="relative p-8 flex flex-col justify-between h-full">
                  <div>
                    <p className="text-xs text-lime-400 font-mono uppercase tracking-widest mb-2">Ready?</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Start your{" "}
                      <span className="bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">
                        copy trading
                      </span>{" "}
                      journey today.
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Join over 150,000 traders already growing their portfolios with KoveTrade.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <Link
                      href="/register"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#5edc1f] to-green-700 text-gray-900 dark:text-white font-bold text-sm hover:from-[#5edc1f] hover:to-green-600 transition-all shadow-lg shadow-green-900/30"
                    >
                      Get Started →
                    </Link>
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
        </div>
      </section>

      <Footer />
    </div>
  );
}
