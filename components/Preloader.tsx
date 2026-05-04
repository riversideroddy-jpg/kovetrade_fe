"use client";

export default function Preloader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#070f08]">
      {/* Logo */}
      <div className="mb-12">
        <span className="inline-flex items-baseline gap-0.5">
          <span className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">Kove</span>
          <span className="text-4xl font-black tracking-tight text-[#5edc1f]">Trade</span>
        </span>
      </div>

      {/* Circular Loading Spinner */}
      <div className="relative w-14 h-14 mb-8">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700/50"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#5edc1f] animate-spin"></div>
      </div>

      {/* Loading Text */}
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 animate-pulse tracking-widest uppercase">
        Loading...
      </p>
    </div>
  );
}
