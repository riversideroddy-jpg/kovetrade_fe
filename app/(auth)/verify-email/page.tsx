"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";
import { PulseLoader } from "react-spinners";
import Link from "next/link";
import PagePreloader from "@/components/PagePreloader";

function VerifyEmailContent() {
  const [code, setCode] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    const fullCode = code.join("");
    if (fullCode.length !== 4) {
      toast.error("Please enter the full 4-digit code");
      return;
    }

    setLoading(true);
    try {
      const response = await apiFetch("/verify-email/", {
        method: "POST",
        body: JSON.stringify({ code: fullCode }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result?.error || "Verification failed");
        return;
      }

      toast.success("Email verified successfully!");
      setTimeout(() => router.push("/portfolio"), 1000);
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      const response = await apiFetch("/resend-verification/", {
        method: "POST",
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result?.error || "Failed to resend code");
        return;
      }

      toast.success("Verification code sent!");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <PagePreloader>
      <div className="min-h-screen flex items-center justify-center px-0 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md space-y-6 text-center p-8 rounded-3xl bg-white dark:bg-white/[0.025] backdrop-blur-sm border border-gray-100/80 dark:border-[#5edc1f]/10 shadow-sm dark:shadow-2xl dark:shadow-black/40"
      >
        {/* Logo */}
        <Link href="/" className="inline-flex items-baseline gap-0.5 justify-center mb-4">
          <span className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">Kove</span>
          <span className="text-3xl font-black tracking-tight text-[#5edc1f]">Trade</span>
        </Link>

        <div className="w-20 h-20 bg-[#5edc1f]/15 dark:bg-[#5edc1f]/20 rounded-full flex items-center justify-center mx-auto">
          <Mail className="w-10 h-10 text-[#5edc1f] dark:text-lime-400" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Verify Your Email
        </h1>

        <p className="text-gray-600 dark:text-gray-300 text-sm">
          We&apos;ve sent a 4-digit verification code to{" "}
          <strong>{email || "your email"}</strong>
        </p>

        {/* Code Input */}
        <div className="flex justify-center gap-3 my-6">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-14 h-14 text-center text-2xl font-bold border-2 rounded-lg bg-white dark:bg-white/[0.04] border-gray-300 dark:border-[#5edc1f]/15 text-gray-900 dark:text-white focus:outline-none focus:border-[#5edc1f] focus:ring-2 focus:ring-[#5edc1f]/30 transition-all"
            />
          ))}
        </div>

        <Button
          onClick={handleVerify}
          disabled={loading}
          className="w-full py-6 bg-[#5edc1f] hover:bg-[#4cc015] text-gray-900 font-bold rounded-md"
        >
          {!loading ? (
            <span>Verify Email</span>
          ) : (
            <PulseLoader color="#fff" size={15} />
          )}
        </Button>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Didn&apos;t receive the code?{" "}
          <button
            onClick={handleResend}
            disabled={resending}
            className="text-[#5edc1f] hover:underline disabled:opacity-50"
          >
            {resending ? "Sending..." : "Resend code"}
          </button>
        </p>

        <Link
          href="/login"
          className="inline-flex items-center text-sm text-[#5edc1f] hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Login
        </Link>
      </motion.div>
      </div>
    </PagePreloader>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <PulseLoader color="#5edc1f" size={15} />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
