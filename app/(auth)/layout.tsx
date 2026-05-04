"use client";

import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-white dark:bg-[#070f08] text-gray-900 dark:text-white overflow-hidden">
      {/* ── Aurora blobs — dark mode only ──────────────────────── */}
      <style>{`
        @keyframes auth-a { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-30px) scale(1.08)} 66%{transform:translate(-20px,20px) scale(0.95)} }
        @keyframes auth-b { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-35px,25px) scale(1.05)} 66%{transform:translate(25px,-15px) scale(0.97)} }
        @keyframes auth-c { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,30px) scale(1.06)} }
        .auth-a { animation: auth-a 16s ease-in-out infinite }
        .auth-b { animation: auth-b 20s ease-in-out infinite }
        .auth-c { animation: auth-c 24s ease-in-out infinite }
      `}</style>

      <div className="pointer-events-none fixed inset-0 hidden dark:block overflow-hidden">
        <div className="auth-a absolute top-[-10%] left-[-5%] w-[55vw] h-[55vw] rounded-full bg-green-900/10 blur-[100px]" />
        <div className="auth-b absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-green-900/10 blur-[90px]" />
        <div className="auth-c absolute top-[40%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-[#5edc1f]/5 blur-[110px]" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(94,220,31,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(94,220,31,.4) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Page content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
