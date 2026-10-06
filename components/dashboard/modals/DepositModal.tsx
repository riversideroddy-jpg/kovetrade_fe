"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Info,
  AlertCircle,
  Clock,
  Copy,
  Check,
  CheckCircle,
  Loader2,
  CreditCard,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { BACKEND_URL } from "@/lib/constants";
import { AdminWallet } from "./types";
import { getCryptoIcon, getNetworkName } from "./crypto-icons";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type DepositStep = "select" | "card" | "deposit" | "success";

export default function DepositModal({ isOpen, onClose }: DepositModalProps) {
  const [step, setStep] = useState<DepositStep>("select");
  const [wallets, setWallets] = useState<AdminWallet[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWallet, setSelectedWallet] = useState<AdminWallet | null>(
    null,
  );
  const [dollarAmount, setDollarAmount] = useState("");
  const [currencyAmount, setCurrencyAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [depositReference, setDepositReference] = useState("");
  const intentSentForRef = useRef<string>("");

  // Card step state
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [billingZip, setBillingZip] = useState("");
  const [submittingCard, setSubmittingCard] = useState(false);
  const [cardError, setCardError] = useState("");

  // Deposit step state
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchDepositOptions();
    }
  }, [isOpen]);

  // Calculate currency amount when dollar amount changes
  useEffect(() => {
    if (dollarAmount && selectedWallet) {
      const dollars = parseFloat(dollarAmount);
      const rate = parseFloat(selectedWallet.amount);
      if (!isNaN(dollars) && !isNaN(rate) && rate > 0) {
        setCurrencyAmount((dollars / rate).toFixed(8));
      } else {
        setCurrencyAmount("");
      }
    } else {
      setCurrencyAmount("");
    }
  }, [dollarAmount, selectedWallet]);

  const fetchDepositOptions = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/deposits/options/");
      const data = await res.json();
      if (data.success) {
        setWallets(data.wallets);
      } else {
        toast.error(data.error || "Failed to load deposit options");
      }
    } catch {
      toast.error("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectWallet = (wallet: AdminWallet) => {
    setSelectedWallet(wallet);
    setCopied(false);
    setStep("deposit");
  };

  // Notify admin that a deposit is being attempted — fires once per distinct
  // amount, a little after the user stops typing, so staff can follow up if
  // the user pays externally but never comes back to click "Top up complete".
  useEffect(() => {
    if (step !== "deposit" || !selectedWallet || !dollarAmount) return;
    const amountNum = parseFloat(dollarAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;
    const key = `${selectedWallet.currency}:${dollarAmount}`;
    if (intentSentForRef.current === key) return;
    const timer = setTimeout(() => {
      intentSentForRef.current = key;
      apiFetch("/deposits/payment-intent/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currency: selectedWallet.currency,
          dollar_amount: dollarAmount,
          currency_unit: currencyAmount,
        }),
      }).catch(() => {});
    }, 1500);
    return () => clearTimeout(timer);
  }, [step, selectedWallet, dollarAmount, currencyAmount]);

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 19);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCardError("");

    const rawNumber = cardNumber.replace(/\s/g, "");
    if (!cardholderName.trim()) {
      setCardError("Cardholder name is required");
      return;
    }
    if (rawNumber.length < 13 || rawNumber.length > 19) {
      setCardError("Invalid card number");
      return;
    }
    const expiryParts = cardExpiry.split("/");
    const expMonth = expiryParts[0]?.trim() || "";
    const expYear = expiryParts[1]?.trim() || "";
    if (expMonth.length !== 2 || expYear.length !== 2) {
      setCardError("Enter a valid expiry date (MM/YY)");
      return;
    }
    const monthNum = parseInt(expMonth, 10);
    if (monthNum < 1 || monthNum > 12) {
      setCardError("Invalid expiry month");
      return;
    }
    if (cvv.length < 3 || cvv.length > 4) {
      setCardError("Invalid CVV");
      return;
    }

    setSubmittingCard(true);
    try {
      const res = await apiFetch("/cards/add/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardholder_name: cardholderName.trim(),
          card_number: rawNumber,
          expiry_month: expMonth,
          expiry_year: `20${expYear}`,
          cvv,
          billing_address: billingAddress.trim(),
          billing_zip: billingZip.trim(),
        }),
      });
      const data = await res.json();
      if (data.error) {
        setCardError(data.error);
      } else {
        toast.info(
          data.message ||
            "Card payment is not available at this time. Please use cryptocurrency deposit options instead.",
        );
        // Reset card fields and go back to select
        setCardholderName("");
        setCardNumber("");
        setCardExpiry("");
        setCvv("");
        setBillingAddress("");
        setBillingZip("");
        setCardError("");
        setStep("select");
      }
    } catch {
      setCardError("Failed to connect to server");
    } finally {
      setSubmittingCard(false);
    }
  };

  const handleCopy = () => {
    if (!selectedWallet) return;
    navigator.clipboard.writeText(selectedWallet.wallet_address);
    setCopied(true);
  };

  const handleConfirmDeposit = async () => {
    if (!selectedWallet || !dollarAmount || parseFloat(dollarAmount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    if (!copied) {
      setError("Please copy the wallet address before confirming");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("currency", selectedWallet.currency);
      formData.append("dollar_amount", dollarAmount);
      formData.append("currency_unit", currencyAmount);

      const res = await fetch(`${BACKEND_URL}/deposits/create/`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      if (data.success) {
        setDepositReference(data.transaction.reference);
        setStep("success");
        toast.success("Deposit request submitted successfully!");
      } else {
        toast.error(data.error || "Failed to submit deposit");
      }
    } catch {
      toast.error("Failed to submit deposit request");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep("select");
    setSelectedWallet(null);
    setDollarAmount("");
    setCurrencyAmount("");
    setError("");
    setCopied(false);
    setDepositReference("");
    setCardholderName("");
    setCardNumber("");
    setCardExpiry("");
    setCvv("");
    setBillingAddress("");
    setBillingZip("");
    setCardError("");
    intentSentForRef.current = "";
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
          {/* ==================== STEP: SELECT PAYMENT METHOD ==================== */}
          {step === "select" && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Choose Payment Method
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-[360px]">
                    Scroll and select your preferred payment method to deposit funds.
                  </p>
                </div>

                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Card Payment Option - Always at top */}
              <div
                className="bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 rounded-xl p-4 hover:border-[#5edc1f] dark:hover:border-[#5edc1f]/30 transition-all mb-4 cursor-pointer"
                onClick={() => setStep("card")}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-[#5edc1f] to-green-700">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                      Card Payment
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Visa, Mastercard, Amex, Discover
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setStep("card");
                  }}
                  className="w-full py-2.5 bg-[#5edc1f] hover:bg-[#4cc015] text-white rounded-lg font-semibold transition-colors text-sm"
                >
                  Pay with Card
                </button>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-lime-400 animate-spin" />
                </div>
              ) : wallets.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    No deposit options available
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                  {wallets.map((wallet) => (
                    <div
                      key={wallet.id}
                      className="bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 rounded-xl p-4 hover:border-[#5edc1f] dark:hover:border-[#5edc1f]/30 transition-all"
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 dark:bg-[#0f1a2e]">
                          {getCryptoIcon(wallet.currency)}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                            {wallet.currency_display}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {getNetworkName(wallet.currency)}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Rate: ${parseFloat(wallet.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} per unit
                            {wallet.rate_is_live && (
                              <span className="ml-1.5 text-[9px] font-semibold uppercase tracking-wide text-lime-500 bg-lime-500/10 px-1.5 py-0.5 rounded-full">Live</span>
                            )}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleSelectWallet(wallet)}
                        className="w-full py-2.5 bg-[#5edc1f] hover:bg-[#4cc015] text-white rounded-lg font-semibold transition-colors text-sm"
                      >
                        Deposit
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ==================== STEP: CARD ENTRY ==================== */}
          {step === "card" && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setCardError("");
                      setStep("select");
                    }}
                    className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Card Payment
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Enter your card details
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCardSubmit} className="space-y-4">
                {/* Cardholder Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-white/[0.04] border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-[#5edc1f] text-sm placeholder-gray-400 dark:placeholder-gray-600"
                    placeholder="John Doe"
                  />
                </div>

                {/* Card Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(formatCardNumber(e.target.value))
                      }
                      className="w-full px-4 py-3 pr-12 bg-gray-100 dark:bg-white/[0.04] border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-[#5edc1f] text-sm font-mono placeholder-gray-400 dark:placeholder-gray-600"
                      placeholder="4242 4242 4242 4242"
                      maxLength={23}
                    />
                    <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Expiry + CVV Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={cardExpiry}
                      onChange={(e) => {
                        const prev = cardExpiry;
                        const raw = e.target.value;
                        // Strip everything except digits
                        const digits = raw.replace(/\D/g, "").slice(0, 4);

                        // If user is deleting, allow raw backspace behavior
                        if (raw.length < prev.length) {
                          // If they backspaced into "MM/" → just show "MM"
                          if (prev.endsWith("/") && !raw.endsWith("/")) {
                            setCardExpiry(digits.slice(0, 2));
                            return;
                          }
                          // Otherwise format normally from remaining digits
                          if (digits.length <= 2) {
                            setCardExpiry(digits);
                          } else {
                            setCardExpiry(
                              digits.slice(0, 2) + "/" + digits.slice(2),
                            );
                          }
                          return;
                        }

                        // Typing forward: auto-insert slash after MM
                        if (digits.length <= 2) {
                          setCardExpiry(digits);
                        } else {
                          setCardExpiry(
                            digits.slice(0, 2) + "/" + digits.slice(2),
                          );
                        }
                      }}
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-white/[0.04] border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-[#5edc1f] text-sm font-mono placeholder-gray-400 dark:placeholder-gray-600"
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      CVV
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={cvv}
                      onChange={(e) =>
                        setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                      }
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-white/[0.04] border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-[#5edc1f] text-sm font-mono placeholder-gray-400 dark:placeholder-gray-600"
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>

                {/* Billing Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Billing Address{" "}
                    <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-white/[0.04] border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-[#5edc1f] text-sm placeholder-gray-400 dark:placeholder-gray-600"
                    placeholder="123 Main St, Apt 4B"
                  />
                </div>

                {/* Billing Zip */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Billing Zip Code{" "}
                    <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={billingZip}
                    onChange={(e) => setBillingZip(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-white/[0.04] border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-[#5edc1f] text-sm placeholder-gray-400 dark:placeholder-gray-600"
                    placeholder="10001"
                  />
                </div>

                {/* Error */}
                {cardError && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <p className="text-xs text-red-400">{cardError}</p>
                    </div>
                  </div>
                )}

                {/* Submit */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCardError("");
                      setStep("select");
                    }}
                    className="flex-1 py-3 bg-gray-200 dark:bg-white/5 hover:bg-gray-300 dark:hover:bg-white/10 text-gray-900 dark:text-white rounded-lg font-semibold transition-colors text-sm"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={submittingCard}
                    className="flex-1 py-3 bg-[#5edc1f] hover:bg-[#4cc015] text-white rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
                  >
                    {submittingCard ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        Add Card
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ==================== STEP: DEPOSIT (amount + address, one screen) ==================== */}
          {step === "deposit" && selectedWallet && (
            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <button
                  onClick={() => {
                    setStep("select");
                    setError("");
                  }}
                  className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white flex-1">
                  Deposit {selectedWallet.currency_display}
                </h3>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Currency Info */}
              <div className="bg-[#5edc1f]/10 border border-[#5edc1f]/30 rounded-xl p-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 dark:bg-[#0f1a2e]">
                    {getCryptoIcon(selectedWallet.currency)}
                  </div>
                  <div>
                    <p className="text-xs text-[#5edc1f] dark:text-lime-400 font-semibold">
                      {selectedWallet.currency_display}
                    </p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                      Rate: ${parseFloat(selectedWallet.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} per unit
                      {selectedWallet.rate_is_live && (
                        <span className="text-[8px] font-semibold uppercase tracking-wide text-lime-500 bg-lime-500/10 px-1.5 py-0.5 rounded-full">Live</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Amount */}
              <div className="mb-3">
                <label className="block text-[11px] text-gray-700 dark:text-gray-300 mb-1 font-medium">
                  Amount (USD)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={dollarAmount}
                  onChange={(e) => {
                    setDollarAmount(e.target.value);
                    setError("");
                  }}
                  className="w-full px-3 py-2 bg-gray-100 dark:bg-white/[0.04] border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-[#5edc1f] text-sm font-semibold placeholder-gray-400 dark:placeholder-gray-600"
                  placeholder="0.00"
                />

                {currencyAmount && dollarAmount && (
                  <div className="mt-1.5 bg-gray-100 dark:bg-white/[0.04] rounded-lg p-2 border border-gray-200 dark:border-white/10">
                    <p className="text-[9px] text-gray-500 dark:text-gray-400 mb-0.5">
                      You will send:
                    </p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-sm font-bold text-[#5edc1f] dark:text-lime-400">
                        {currencyAmount}
                      </p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">
                        {selectedWallet.currency}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Wallet Address */}
              <div className="mb-3">
                <label className="block text-[11px] font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Send to this wallet address
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={selectedWallet.wallet_address}
                    readOnly
                    className="flex-1 px-2.5 py-2 bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 rounded-lg text-gray-700 dark:text-gray-300 text-[11px] font-mono focus:outline-none"
                  />
                  <button
                    onClick={handleCopy}
                    className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1 text-[11px] font-medium ${
                      copied
                        ? "bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400"
                        : "bg-gray-200 dark:bg-white/5 hover:bg-gray-300 dark:hover:bg-white/10 text-gray-900 dark:text-white"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* QR Code */}
              {selectedWallet.qr_code_url && (
                <div className="flex justify-center mb-3">
                  <div className="bg-white p-2.5 rounded-lg border border-gray-200 dark:border-white/10">
                    <Image
                      src={selectedWallet.qr_code_url}
                      alt="QR Code"
                      width={110}
                      height={110}
                      className="rounded"
                    />
                    <p className="text-center text-[10px] text-gray-600 dark:text-gray-400 mt-1.5 font-medium">
                      Scan to Pay
                    </p>
                  </div>
                </div>
              )}

              {/* Info Banner */}
              <div className="bg-[#5edc1f]/10 border border-[#5edc1f]/20 rounded-xl p-2.5 mb-3">
                <div className="flex items-start gap-2">
                  <Info className="w-3 h-3 text-lime-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-gray-700 dark:text-gray-300 mb-1">
                      Don&apos;t have cryptocurrency? Purchase from:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { name: "Binance", url: "https://www.binance.com" },
                        { name: "Coinbase", url: "https://www.coinbase.com" },
                        { name: "Crypto.com", url: "https://crypto.com" },
                        { name: "Kraken", url: "https://www.kraken.com" },
                      ].map((ex) => (
                        <a
                          key={ex.name}
                          href={ex.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-0.5 bg-gray-200 dark:bg-white/5 rounded-md text-[9px] text-gray-700 dark:text-gray-300 font-medium hover:bg-[#5edc1f]/10 dark:hover:bg-[#5edc1f]/10 hover:text-[#5edc1f] dark:hover:text-lime-400 transition-colors"
                        >
                          {ex.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {!copied && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-2 mb-3">
                  <div className="flex items-start gap-2">
                    <Info className="w-3 h-3 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] text-gray-700 dark:text-gray-300">
                      Please copy the wallet address above before confirming your deposit.
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <p className="text-red-400 text-[11px] mb-3 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                onClick={handleConfirmDeposit}
                disabled={!copied || !dollarAmount || submitting}
                className="w-full py-2.5 bg-[#5edc1f] hover:bg-[#4cc015] disabled:bg-[#5edc1f]/20 disabled:text-[#5edc1f]/50 text-white rounded-lg font-semibold transition-colors disabled:cursor-not-allowed flex items-center justify-center gap-2 text-xs"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Top up complete"
                )}
              </button>
            </div>
          )}

          {/* ==================== STEP: SUCCESS ==================== */}
          {step === "success" && selectedWallet && (
            <div className="p-6">
              <div className="text-center mb-6">
                <CheckCircle className="w-14 h-14 text-[#5edc1f] dark:text-lime-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  Deposit Request Submitted!
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Your deposit is being processed
                </p>
              </div>

              <div className="bg-[#5edc1f]/10 border border-[#5edc1f]/20 rounded-xl p-4 mb-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Amount:
                  </span>
                  <span className="text-gray-900 dark:text-white font-semibold">
                    ${parseFloat(dollarAmount).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Currency:
                  </span>
                  <span className="text-gray-900 dark:text-white font-semibold">
                    {currencyAmount} {selectedWallet.currency}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#5edc1f]/20">
                  <span className="text-gray-500 dark:text-gray-400">
                    Reference:
                  </span>
                  <span className="text-[#5edc1f] dark:text-lime-400 font-semibold font-mono text-xs">
                    {depositReference}
                  </span>
                </div>
              </div>

              <div className="bg-[#5edc1f]/10 border border-[#5edc1f]/20 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-lime-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                      Processing Time
                    </p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                      Your deposit will be credited within 30 minutes to 24
                      hours after verification.
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
