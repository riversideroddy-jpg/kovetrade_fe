"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { motion } from "framer-motion";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";
import { PulseLoader } from "react-spinners";
import PagePreloader from "@/components/PagePreloader";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const emailValue = watch("email");

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setLoading(true);

    try {
      const response = await apiFetch("/password-reset/request/", {
        method: "POST",
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result?.error || "Failed to send reset email");
        return;
      }

      setEmailSent(true);
      toast.success("Password reset link sent! Check your email.");
    } catch (error) {
      console.error(error);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <PagePreloader>
        <div className="min-h-screen flex items-center justify-center px-0 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md text-center space-y-6"
        >
          <div className="w-20 h-20 bg-[#5edc1f]/15 dark:bg-[#5edc1f]/20 rounded-full flex items-center justify-center mx-auto">
            <Mail className="w-10 h-10 text-[#5edc1f]" />
          </div>

          <h1 className="text-2xl font-bold text-black dark:text-white">
            Check Your Email
          </h1>

          <p className="text-gray-600 dark:text-gray-300">
            We&apos;ve sent a password reset link to{" "}
            <strong>{emailValue}</strong>. Please check your inbox and spam
            folder.
          </p>

          <div className="pt-4">
            <Link href="/login">
              <Button className="w-full p-5 bg-[#5edc1f] hover:bg-[#4cc015] text-gray-900 font-bold">
                Back to Login
              </Button>
            </Link>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Didn&apos;t receive the email?{" "}
            <button
              onClick={() => setEmailSent(false)}
              className="text-[#5edc1f] hover:underline"
            >
              Try again
            </button>
          </p>
        </motion.div>
        </div>
      </PagePreloader>
    );
  }

  return (
    <PagePreloader>
      <div className="min-h-screen flex items-center justify-center px-0 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md space-y-6 p-8 rounded-3xl bg-white dark:bg-white/[0.025] backdrop-blur-sm border border-gray-100/80 dark:border-[#5edc1f]/10 shadow-sm dark:shadow-2xl dark:shadow-black/40"
      >
        {/* Logo */}
        <Link href="/" className="inline-flex items-baseline gap-0.5 justify-center mb-2">
          <span className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">Kove</span>
          <span className="text-3xl font-black tracking-tight text-[#5edc1f]">Trade</span>
        </Link>

        <div className="space-y-2">
          <Link
            href="/login"
            className="inline-flex items-center text-sm text-[#5edc1f] hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Login
          </Link>

          <h1 className="text-3xl font-bold text-black dark:text-white">
            Forgot Password?
          </h1>

          <p className="text-gray-600 dark:text-gray-300">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <input
              id="email"
              type="email"
              {...register("email")}
              className={`peer w-full border rounded-md px-3 pt-5 pb-2 bg-white dark:bg-white/[0.04] text-black dark:text-white focus:outline-none transition-all ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 dark:border-[#5edc1f]/15"
              }`}
              placeholder=" "
            />
            <label
              htmlFor="email"
              className={`absolute left-3 text-gray-500 dark:text-gray-400 transition-all pointer-events-none ${
                emailValue
                  ? "text-xs top-1"
                  : "peer-focus:text-xs peer-focus:top-1 top-3"
              }`}
            >
              Email Address
            </label>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <Button
            disabled={loading}
            type="submit"
            className="w-full py-6 bg-[#5edc1f] hover:bg-[#4cc015] text-gray-900 font-bold rounded-md"
          >
            {!loading ? (
              <span>Send Reset Link</span>
            ) : (
              <PulseLoader color="#fff" size={15} />
            )}
          </Button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Remember your password?{" "}
            <Link href="/login" className="text-[#5edc1f] hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </motion.div>
      </div>
    </PagePreloader>
  );
}
