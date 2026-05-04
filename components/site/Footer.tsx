"use client";

import React from "react";
import Link from "next/link";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Become a Leader", href: "/become-a-leader" },
      { label: "Brokers", href: "/brokers" },
    ],
  },
  {
    title: "Features",
    links: [
      { label: "AutoGuard™", href: "/autoguard" },
      { label: "Affiliate Program", href: "/affiliate" },
      { label: "Leader Guide", href: "/leader-guide" },
      { label: "User Guide", href: "/user-guide" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookies Policy", href: "/cookies" },
      { label: "Risk Disclaimer", href: "/risk-disclaimer" },
      { label: "Conflict of Interest", href: "/conflict-of-interest" },
      { label: "Declaration of Consent", href: "/consent" },
      { label: "EULA", href: "/eula" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "+1 (929) 512-0241", href: "tel:+19295120241" },
      { label: "support@kovetrade.com", href: "mailto:support@kovetrade.com" },
    ],
  },
];

const regulators = [
  { code: "CySEC", label: "Cyprus", license: "#109/10" },
  { code: "FCA", label: "United Kingdom", license: "FRN 583263" },
  { code: "SEC", label: "United States", license: "CRD 298461" },
  { code: "FSRA", label: "Abu Dhabi", license: "FSP 220073" },
];

const socialLinks = [
  {
    label: "X / Twitter",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-gray-100 dark:border-[#5edc1f]/[0.08] bg-white dark:bg-[#070f08] text-gray-900 dark:text-white overflow-hidden">
      {/* Top gradient bar */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5edc1f]/60 to-transparent" />

      {/* Subtle grid texture — dark mode only */}
      <div
        className="pointer-events-none absolute inset-0 hidden dark:block opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(94,220,31,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(94,220,31,.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Subtle green glow top-left */}
      <div className="pointer-events-none absolute top-0 left-0 w-[500px] h-[300px] rounded-full bg-[#5edc1f]/[0.04] blur-[100px] hidden dark:block" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Main grid ── */}
        <div className="pt-14 pb-10 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Logo */}
            <div>
              <Link href="/" className="inline-flex items-baseline gap-0.5">
                <span className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
                  Kove
                </span>
                <span className="text-3xl font-black tracking-tight text-[#5edc1f]">
                  Trade
                </span>
              </Link>
              <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400 max-w-xs">
                The world's leading social investment network. Copy top traders,
                share your strategies, and grow your portfolio together.
              </p>
            </div>

            {/* Regulator badges */}
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Regulated by
              </p>
              <div className="grid grid-cols-2 gap-2">
                {regulators.map((r) => (
                  <div
                    key={r.code}
                    className="flex flex-col rounded-lg border border-gray-200 dark:border-[#5edc1f]/[0.1] bg-gray-50 dark:bg-[#5edc1f]/[0.03] px-3 py-2 hover:border-[#5edc1f]/30 dark:hover:border-[#5edc1f]/25 transition-colors"
                  >
                    <span className="text-xs font-bold text-[#5edc1f]">
                      {r.code}
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">
                      {r.label}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500">
                      {r.license}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-8 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  {col.title}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-600 dark:text-gray-400 transition-colors hover:text-[#5edc1f] dark:hover:text-lime-400"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Disclaimer ── */}
        <div className="border-t border-gray-100 dark:border-[#5edc1f]/[0.06] py-8 space-y-4 text-[11px] leading-relaxed text-gray-400 dark:text-gray-500">
          <p>
            <span className="font-semibold text-gray-500 dark:text-gray-400">Disclaimer:</span>{" "}
            KoveTrade (Europe) Ltd., authorised and regulated by the Cyprus
            Securities Exchange Commission (CySEC) under license #109/10.
            Registered in Cyprus, Company No. HE 200595. Registered Office: 4
            Profiti Ilia Str., Kanika Business Centre, 7th floor, Germasogeia,
            4046, Limassol, Cyprus. KoveTrade (UK) Ltd, authorised and regulated
            by the Financial Conduct Authority (FCA) under FRN 583263. Registered
            Office: 24th floor, One Canada Square, Canary Wharf, London E14 5AB.
            KoveTrade (USA) Ltd, authorised and regulated by the SEC; CRD 298461.
            KoveTrade (ME) Limited, licensed and regulated by the Abu Dhabi Global
            Market (ADGM) Financial Services Regulatory Authority (FSRA) under
            Financial Services Permission Number 220073.
          </p>
          <p>
            Past performance is not an indication of future results. Trading with
            KoveTrade by following and/or copying the trades of other traders
            involves a high level of risk, even when following top-performing
            traders. You should seek advice from an independent and suitably
            licensed financial advisor and ensure that you have the risk appetite,
            relevant experience and knowledge before you decide to trade.
          </p>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-gray-100 dark:border-[#5edc1f]/[0.06] py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            &copy; 2006–2026 KoveTrade — Your Social Investment Network. All
            rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
            <Link href="/terms" className="hover:text-[#5edc1f] transition-colors">
              Terms
            </Link>
            <span className="text-gray-300 dark:text-gray-700">·</span>
            <Link href="/privacy" className="hover:text-[#5edc1f] transition-colors">
              Privacy
            </Link>
            <span className="text-gray-300 dark:text-gray-700">·</span>
            <Link href="/cookies" className="hover:text-[#5edc1f] transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
