"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

const legalLinks = [
  { label: "Terms of Service",        href: "/terms" },
  { label: "Privacy Policy",          href: "/privacy" },
  { label: "Cookies Policy",          href: "/cookies" },
  { label: "Risk Disclaimer",         href: "/risk-disclaimer" },
  { label: "Conflict of Interest",    href: "/conflict-of-interest" },
  { label: "Declaration of Consent",  href: "/consent" },
  { label: "EULA",                    href: "/eula" },
];

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [legalOpen, setLegalOpen] = React.useState(false);
  const [mobileLegalOpen, setMobileLegalOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const legalRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close Legal dropdown when clicking outside
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (legalRef.current && !legalRef.current.contains(e.target as Node)) {
        setLegalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-[#070f08]/95 backdrop-blur-xl shadow-lg shadow-black/[0.03] dark:shadow-black/30 border-b border-gray-200/60 dark:border-[#5edc1f]/[0.08]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">

          {/* Logo */}
          <Link href="/" className="inline-flex items-baseline gap-0.5 shrink-0">
            <span className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Kove</span>
            <span className="text-2xl font-black tracking-tight text-[#5edc1f]">Trade</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors hover:text-[#5edc1f] dark:hover:text-lime-400"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors hover:text-[#5edc1f] dark:hover:text-lime-400"
            >
              About
            </Link>

            {/* Legal Dropdown */}
            <div className="relative" ref={legalRef}>
              <button
                onClick={() => setLegalOpen((v) => !v)}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors hover:text-[#5edc1f] dark:hover:text-lime-400"
              >
                Legal
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${legalOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown panel */}
              <div
                className={`absolute top-full right-0 mt-2 w-56 rounded-2xl border border-gray-200 dark:border-[#5edc1f]/[0.12] bg-white dark:bg-[#070f08] shadow-xl shadow-black/10 dark:shadow-black/50 overflow-hidden transition-all duration-200 origin-top ${
                  legalOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
                }`}
              >
                {/* Green top accent line */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-[#5edc1f]/50 to-transparent" />
                <div className="py-1.5">
                  {legalLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setLegalOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-[#5edc1f]/8 hover:text-[#5edc1f] dark:hover:text-lime-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/login"
              className="rounded-full border border-gray-300 dark:border-white/20 bg-transparent px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 transition-all hover:border-[#5edc1f] hover:text-[#5edc1f] dark:hover:border-lime-400 dark:hover:text-lime-400"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-[var(--primary)] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[var(--primary-hover)] hover:shadow-lg hover:shadow-[#5edc1f]/25 hover:-translate-y-0.5"
            >
              Get Started
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 dark:border-white/15 text-gray-500 dark:text-gray-400 transition-all hover:border-[#5edc1f]/50 hover:text-[#5edc1f] dark:hover:border-lime-400/50 dark:hover:text-lime-400"
              aria-label="Toggle theme"
            >
              {mounted && (
                theme === "dark" ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Mobile right-side controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/register"
              className="rounded-full bg-[var(--primary)] px-4 py-2 text-[11px] font-semibold text-white transition-all hover:bg-[var(--primary-hover)] whitespace-nowrap"
            >
              Get Started
            </Link>
            <button
              onClick={toggleTheme}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 dark:border-white/15 text-gray-500 dark:text-gray-400 shrink-0 hover:border-[#5edc1f]/50 hover:text-[#5edc1f] dark:hover:text-lime-400 transition-all"
              aria-label="Toggle theme"
            >
              {mounted && (
                theme === "dark" ? <SunIcon className="h-3.5 w-3.5" /> : <MoonIcon className="h-3.5 w-3.5" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 shrink-0"
              aria-label="Toggle menu"
            >
              <span className={`h-0.5 w-5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${mobileMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`h-0.5 w-5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute left-0 right-0 top-full overflow-hidden transition-all duration-300 lg:hidden ${
          mobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white/97 dark:bg-[#070f08]/97 backdrop-blur-xl px-4 py-4 shadow-xl border-b border-gray-200/50 dark:border-[#5edc1f]/[0.08]">
          <div className="flex flex-col gap-0.5">
            <Link
              href="/"
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors hover:bg-[#5edc1f]/8 hover:text-[#5edc1f] dark:hover:text-lime-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors hover:bg-[#5edc1f]/8 hover:text-[#5edc1f] dark:hover:text-lime-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>

            {/* Mobile Legal accordion */}
            <button
              onClick={() => setMobileLegalOpen((v) => !v)}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors hover:bg-[#5edc1f]/8 hover:text-[#5edc1f] dark:hover:text-lime-400 w-full text-left"
            >
              <span>Legal</span>
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${mobileLegalOpen ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {mobileLegalOpen && (
              <div className="ml-3 pl-3 border-l-2 border-[#5edc1f]/20 flex flex-col gap-0.5 mb-1">
                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-3 py-2 text-sm text-gray-600 dark:text-gray-400 transition-colors hover:bg-[#5edc1f]/8 hover:text-[#5edc1f] dark:hover:text-lime-400"
                    onClick={() => { setMobileMenuOpen(false); setMobileLegalOpen(false); }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-2 border-t border-gray-200 dark:border-white/10 pt-3">
              <Link
                href="/login"
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors hover:bg-[#5edc1f]/8 hover:text-[#5edc1f] dark:hover:text-lime-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const MoonIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const SunIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

export default Navbar;
