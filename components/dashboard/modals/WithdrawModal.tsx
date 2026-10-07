"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  AlertCircle,
  ChevronDown,
  Loader2,
  CheckCircle,
  Clock,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { UserProfile } from "./types";
import { getCryptoIcon, getNetworkName } from "./crypto-icons";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type WithdrawStep = "form" | "success";

// Hardcoded crypto types for withdrawal — no dependency on saved payment
// methods. The user always types their own destination address manually.
const CRYPTO_TYPES = ["BTC", "ETH", "USDT", "BNB", "TRX", "USDC", "XRP", "SOL"];

export default function WithdrawModal({ isOpen, onClose }: WithdrawModalProps) {
  const [step, setStep] = useState<WithdrawStep>("form");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [withdrawSource, setWithdrawSource] = useState<"balance" | "profit">("balance");
  const [amount, setAmount] = useState("");
  const [withdrawalAddress, setWithdrawalAddress] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSourceDropdownOpen, setIsSourceDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [withdrawRef, setWithdrawRef] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const profileRes = await apiFetch("/withdrawals/profile/");
      const profileData = await profileRes.json();
      if (profileData.success) setProfile(profileData.user);
    } catch {
      toast.error("Failed to load withdrawal data");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmWithdrawal = async () => {
    setError("");

    if (!selectedCurrency) { setError("Please select a currency type"); return; }
    if (!amount || parseFloat(amount) <= 0) { setError("Please enter a valid amount"); return; }
    if (!withdrawalAddress.trim()) { setError("Please enter your wallet address"); return; }
    if (profile) {
      const available = withdrawSource === "profit"
        ? parseFloat(profile.profit)
        : parseFloat(profile.balance);
      const label = withdrawSource === "profit" ? profile.formatted_profit : profile.formatted_balance;
      if (parseFloat(amount) > available) {
        setError(`Insufficient ${withdrawSource === "profit" ? "profit" : "balance"}. Available: ${label}`);
        return;
      }
    }

    // Notify admin that a withdrawal is being attempted — non-blocking, so a
    // failure here never stops the actual submission below.
    apiFetch("/withdrawals/payment-intent/", {
      method: "POST",
      body: JSON.stringify({
        method_type: selectedCurrency,
        amount: amount,
        source: withdrawSource,
        withdrawal_address: withdrawalAddress.trim(),
      }),
    }).catch(() => {});

    setSubmitting(true);
    try {
      const res = await apiFetch("/withdrawals/create/", {
        method: "POST",
        body: JSON.stringify({
          method_type: selectedCurrency,
          amount: amount,
          withdrawal_address: withdrawalAddress.trim(),
          source: withdrawSource,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setWithdrawRef(data.transaction.reference);
        setWithdrawAmount(amount);
        setProfile((p) =>
          p ? {
            ...p,
            balance: data.transaction.new_balance,
            formatted_balance: data.transaction.formatted_new_balance,
            profit: data.transaction.new_profit,
            formatted_profit: data.transaction.formatted_new_profit,
          } : p
        );
        setStep("success");
        toast.success("Withdrawal request submitted!");
      } else {
        setError(data.error || "Failed to submit withdrawal request");
      }
    } catch {
      setError("Failed to submit withdrawal request");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep("form");
    setSelectedCurrency("");
    setWithdrawSource("balance");
    setAmount("");
    setWithdrawalAddress("");
    setError("");
    setIsDropdownOpen(false);
    setIsSourceDropdownOpen(false);
    setWithdrawRef("");
    setWithdrawAmount("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={handleClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#0f1a2e] border border-gray-200 dark:border-white/10 shadow-2xl"
        >
          {/* ==================== FORM STEP ==================== */}
          {step === "form" && (
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Withdrawal</h3>
                <button onClick={handleClose} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-[#5edc1f] animate-spin" />
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Balance + Profit side by side */}
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-0.5">Main Balance</p>
                      <p className="text-base font-bold text-gray-900 dark:text-white">
                        {profile ? profile.formatted_balance : "$0.00"}
                      </p>
                    </div>
                    <div className="w-px bg-gray-200 dark:bg-white/10" />
                    <div className="flex-1">
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-0.5">Profit</p>
                      <p className="text-base font-bold text-[#5edc1f]">
                        {profile ? profile.formatted_profit : "$0.00"}
                      </p>
                    </div>
                  </div>

                  <hr className="border-gray-200 dark:border-white/10" />

                  {/* Source Dropdown */}
                  <div>
                    <label className="block text-[11px] font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Withdraw From:
                    </label>
                    <div className="relative">
                      <button
                        onClick={() => setIsSourceDropdownOpen(!isSourceDropdownOpen)}
                        className={`w-full px-3 py-2 rounded-lg text-left flex items-center justify-between transition-all bg-gray-100 dark:bg-white/4 border text-xs ${
                          isSourceDropdownOpen ? "border-[#5edc1f]" : "border-gray-300 dark:border-white/10"
                        } text-gray-900 dark:text-white`}
                      >
                        <span>{withdrawSource === "profit" ? "Profit" : "Main Balance"}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isSourceDropdownOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isSourceDropdownOpen && (
                        <div className="absolute z-10 w-full mt-1.5 bg-white dark:bg-[#1a2742] border border-gray-200 dark:border-white/10 rounded-lg shadow-lg overflow-hidden">
                          {(["balance", "profit"] as const).map((src) => (
                            <button
                              key={src}
                              onClick={() => {
                                setWithdrawSource(src);
                                setIsSourceDropdownOpen(false);
                                setError("");
                                setAmount("");
                              }}
                              className={`w-full px-3 py-1.5 text-left text-[11px] transition-colors hover:bg-gray-100 dark:hover:bg-white/5 ${
                                withdrawSource === src
                                  ? "text-[#5edc1f] font-semibold"
                                  : "text-gray-900 dark:text-white"
                              }`}
                            >
                              {src === "profit" ? "Profit" : "Main Balance"}
                              {profile && (
                                <span className="ml-2 text-[10px] text-gray-500">
                                  ({src === "profit" ? profile.formatted_profit : profile.formatted_balance})
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Type Dropdown */}
                  <div>
                    <label className="block text-[11px] font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Type:
                    </label>
                    <div className="relative">
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`w-full px-3 py-2 rounded-lg text-left flex items-center justify-between gap-2 transition-all bg-gray-100 dark:bg-white/4 border text-xs ${
                          isDropdownOpen ? "border-[#5edc1f]" : "border-gray-300 dark:border-white/10"
                        }`}
                      >
                        <span className="flex items-center gap-2 min-w-0">
                          {selectedCurrency && (
                            <span className="shrink-0 [&_svg]:!w-4 [&_svg]:!h-4">{getCryptoIcon(selectedCurrency)}</span>
                          )}
                          <span className={`truncate ${selectedCurrency ? "text-gray-900 dark:text-white" : "text-gray-500"}`}>
                            {selectedCurrency
                              ? `${selectedCurrency} (${getNetworkName(selectedCurrency)})`
                              : "Select currency"}
                          </span>
                        </span>
                        <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                      </button>

                      {isDropdownOpen && (
                        <div className="absolute z-10 w-full mt-1.5 bg-white dark:bg-[#1a2742] border border-gray-200 dark:border-white/10 rounded-lg shadow-lg overflow-hidden">
                          <div className="max-h-48 overflow-y-auto">
                            {CRYPTO_TYPES.map((currency) => (
                              <button
                                key={currency}
                                onClick={() => {
                                  setSelectedCurrency(currency);
                                  setIsDropdownOpen(false);
                                  setError("");
                                }}
                                className="w-full px-3 py-2.5 flex items-center gap-2.5 text-left text-[11px] text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                              >
                                <span className="shrink-0 [&_svg]:!w-5 [&_svg]:!h-5">{getCryptoIcon(currency)}</span>
                                <span className="flex-1 truncate">{currency}</span>
                                {selectedCurrency === currency && (
                                  <Check className="w-3.5 h-3.5 shrink-0 text-[#5edc1f]" />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Amount Input */}
                  <div>
                    <label className="block text-[11px] font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Amount (USD):
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => { setAmount(e.target.value); setError(""); }}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 bg-gray-100 dark:bg-white/4 border border-gray-300 dark:border-white/10 rounded-lg text-xs text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-[#5edc1f] transition-all"
                    />
                    {profile && amount && parseFloat(amount) > parseFloat(withdrawSource === "profit" ? profile.profit : profile.balance) && (
                      <p className="mt-1 text-[10px] text-red-500 dark:text-red-400">
                        Amount exceeds your {withdrawSource === "profit" ? "profit" : "balance"} of{" "}
                        {withdrawSource === "profit" ? profile.formatted_profit : profile.formatted_balance}
                      </p>
                    )}
                  </div>

                  {/* Withdrawal Address — manually typed */}
                  <div>
                    <label className="block text-[11px] font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Address:
                    </label>
                    <input
                      type="text"
                      value={withdrawalAddress}
                      onChange={(e) => { setWithdrawalAddress(e.target.value); setError(""); }}
                      placeholder="Your wallet address"
                      className="w-full px-3 py-2 bg-gray-100 dark:bg-white/4 border border-gray-300 dark:border-white/10 rounded-lg text-xs text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-[#5edc1f] transition-all"
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                        <p className="text-[10px] text-red-500 dark:text-red-300">{error}</p>
                      </div>
                    </div>
                  )}

                  {/* Note */}
                  <div className="p-2 bg-[#5edc1f]/10 border border-[#5edc1f]/20 rounded-lg">
                    <p className="text-[10px] text-[#5edc1f] dark:text-lime-300">
                      <strong>Note:</strong> Withdrawals are processed within 24-48 hours. Your balance will not change until the admin approves.
                    </p>
                  </div>

                  {/* Buttons — last in the flow */}
                  <div className="flex gap-3 pt-2 border-t border-gray-200 dark:border-white/10">
                    <button
                      onClick={handleClose}
                      disabled={submitting}
                      className="flex-1 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-semibold transition-colors disabled:opacity-50 text-[11px]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmWithdrawal}
                      disabled={submitting || !selectedCurrency || !amount || !withdrawalAddress.trim()}
                      className="flex-1 py-2 bg-[#5edc1f] hover:bg-[#4cc015] text-white rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-[11px]"
                    >
                      {submitting ? (
                        <><Loader2 className="w-3.5 h-3.5 animate-spin" />Processing...</>
                      ) : (
                        "Confirm Withdrawal"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== SUCCESS STEP ==================== */}
          {step === "success" && (
            <div className="p-6">
              <div className="text-center mb-6">
                <CheckCircle className="w-14 h-14 text-[#5edc1f] dark:text-lime-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  Withdrawal Submitted!
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Your withdrawal is being processed</p>
              </div>

              <div className="bg-[#5edc1f]/10 border border-[#5edc1f]/20 rounded-xl p-4 mb-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Amount:</span>
                  <span className="text-gray-900 dark:text-white font-semibold">${parseFloat(withdrawAmount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Source:</span>
                  <span className="text-gray-900 dark:text-white font-semibold capitalize">
                    {withdrawSource === "profit" ? "Profit" : "Main Balance"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Type:</span>
                  <span className="text-gray-900 dark:text-white font-semibold">{selectedCurrency}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#5edc1f]/20">
                  <span className="text-gray-500 dark:text-gray-400">Reference:</span>
                  <span className="text-[#5edc1f] dark:text-lime-400 font-semibold font-mono text-xs">{withdrawRef}</span>
                </div>
              </div>

              <div className="bg-[#5edc1f]/10 border border-[#5edc1f]/20 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 font-medium">Processing Time</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                      Withdrawals are processed within 24-48 hours after admin approval. Your balance remains unchanged until approved.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3 bg-[#5edc1f] hover:bg-[#4cc015] text-white rounded-lg font-semibold transition-colors text-sm"
              >
                Got It!
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
