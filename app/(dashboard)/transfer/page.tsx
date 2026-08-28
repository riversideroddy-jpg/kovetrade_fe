"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDownUp, Loader2, ArrowLeft, ArrowUpRight, ArrowDownRight, Info } from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import Link from "next/link";

type Direction = "balance_to_profit" | "profit_to_balance";

type TransferRecord = {
  id: number;
  direction: Direction;
  direction_display: string;
  amount: string;
  balance_after: string;
  profit_after: string;
  currency: string;
  created_at: string;
};

export default function TransferPage() {
  const [balance, setBalance] = useState("0.00");
  const [profit, setProfit] = useState("0.00");
  const [canTransfer, setCanTransfer] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [transferLimitEnabled, setTransferLimitEnabled] = useState(false);
  const [transferLimit, setTransferLimit] = useState("500.00");
  const [direction, setDirection] = useState<Direction>("balance_to_profit");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [history, setHistory] = useState<TransferRecord[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  const fromLabel = direction === "balance_to_profit" ? "Balance" : "Profit";
  const toLabel = direction === "balance_to_profit" ? "Profit" : "Balance";
  const fromValue = direction === "balance_to_profit" ? balance : profit;
  const toValue = direction === "balance_to_profit" ? profit : balance;

  useEffect(() => {
    fetchInfo();
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setHistoryLoading(true);
    try {
      const res = await apiFetch("/transfer/history/");
      const data = await res.json();
      if (res.ok) {
        setHistory(data.results || []);
      }
    } catch (err) {
      console.error("Transfer history fetch error:", err);
    } finally {
      setHistoryLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit",
    });
  };

  const fetchInfo = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/transfer/info/");
      const data = await res.json();
      if (res.ok) {
        setBalance(data.balance);
        setProfit(data.profit);
        setCanTransfer(data.can_transfer);
        setCurrency(data.currency || "USD");
        setTransferLimitEnabled(data.transfer_limit_enabled || false);
        setTransferLimit(data.transfer_limit || "500.00");
      } else {
        console.error("Transfer info error:", res.status, data);
        toast.error(data?.detail || data?.error || "Failed to load transfer info");
      }
    } catch (err) {
      console.error("Transfer info fetch error:", err);
      toast.error("Failed to load transfer info");
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    setDirection((prev) =>
      prev === "balance_to_profit" ? "profit_to_balance" : "balance_to_profit"
    );
    setAmount("");
  };

  const handleMax = () => {
    setAmount(fromValue);
  };

  const handleConfirm = async () => {
    if (!canTransfer) {
      toast.error("You do not have this option yet. You have not reached the minimum threshold.");
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (transferLimitEnabled && parseFloat(amount) > parseFloat(transferLimit)) {
      toast.error(
        `This transfer exceeds your limit of $${parseFloat(transferLimit).toLocaleString(undefined, { minimumFractionDigits: 2 })} per transaction. Please enter a smaller amount.`
      );
      return;
    }
    if (parseFloat(amount) > parseFloat(fromValue)) {
      toast.error(`Insufficient ${fromLabel.toLowerCase()}. Available: $${parseFloat(fromValue).toLocaleString(undefined, { minimumFractionDigits: 2 })}`);
      return;
    }

    setSubmitting(true);
    try {
      const res = await apiFetch("/transfer/", {
        method: "POST",
        body: JSON.stringify({ direction, amount }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Transfer successful");
        setBalance(data.balance);
        setProfit(data.profit);
        setAmount("");
        fetchHistory();
      } else {
        toast.error(data.error || "Transfer failed");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#5edc1f]" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-md mx-auto pb-10"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/portfolio"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </Link>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          Transfer
        </h1>
      </div>

      {/* From */}
      <div className="mb-1">
        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1.5 block">
          From
        </label>
        <div className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/8">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {fromLabel} Account
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ${parseFloat(fromValue).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Swap Button */}
      <div className="flex justify-center -my-2 relative z-10">
        <button
          onClick={handleSwap}
          className="w-10 h-10 rounded-full bg-white dark:bg-[#1a2332] border-2 border-gray-200 dark:border-white/10 flex items-center justify-center hover:border-[#5edc1f] dark:hover:border-[#5edc1f] hover:bg-[#5edc1f]/8 dark:hover:bg-[#5edc1f]/10 transition-all shadow-sm"
        >
          <ArrowDownUp className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Transfer limit — only shown when the account has one enabled */}
      {transferLimitEnabled && (
        <div className="flex justify-center relative z-10 mt-1 mb-1">
          <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-[#1a2332] px-2.5 py-1 rounded-full border border-gray-200 dark:border-white/10">
            Limit: ${parseFloat(transferLimit).toLocaleString(undefined, { minimumFractionDigits: 2 })} per transfer
          </span>
        </div>
      )}

      {/* To */}
      <div className="mt-1 mb-6">
        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1.5 block">
          To
        </label>
        <div className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/8">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {toLabel} Account
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ${parseFloat(toValue).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Amount */}
      <div className="mb-4">
        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1.5 block">
          Amount
        </label>
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/8 focus-within:border-[#5edc1f] dark:focus-within:border-[#5edc1f] transition-colors">
          <input
            type="number"
            inputMode="decimal"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            onClick={handleMax}
            className="text-xs font-semibold text-[#5edc1f] dark:text-lime-400 hover:text-[#4cc015] dark:hover:text-lime-300 transition-colors"
          >
            Max
          </button>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            {currency}
          </span>
        </div>
      </div>

      {/* Available / In Use */}
      <div className="space-y-2 mb-8">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Available
          </span>
          <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">
            ${parseFloat(fromValue).toLocaleString(undefined, { minimumFractionDigits: 2 })} {currency}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Transfer to {toLabel}
          </span>
          <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">
            {amount ? `$${parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}` : "$0.00"} {currency}
          </span>
        </div>
      </div>

      {/* Confirm Button */}
      <button
        onClick={handleConfirm}
        disabled={submitting || !amount || parseFloat(amount) <= 0}
        className="w-full py-3.5 rounded-xl bg-[#4cc015] hover:bg-[#4cc015] disabled:bg-gray-300 dark:disabled:bg-white/10 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
      >
        {submitting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          "Confirm"
        )}
      </button>

      {/* Transfer History */}
      <div className="mt-10">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Transfer History
        </h2>
        <div className="bg-white/90 dark:bg-white/[0.04] backdrop-blur-xl border border-gray-200/50 dark:border-white/8 rounded-2xl shadow-sm overflow-hidden">
          {historyLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 text-lime-400 animate-spin" />
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-12 px-4">
              <Info className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">No transfers yet</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Your transfer history will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-white/5">
              {history.map((h) => {
                const isToProfit = h.direction === "balance_to_profit";
                return (
                  <div
                    key={h.id}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center ${
                          isToProfit ? "bg-green-500/15" : "bg-blue-500/15"
                        }`}
                      >
                        {isToProfit ? (
                          <ArrowUpRight className="w-4 h-4 text-green-400" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-blue-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {h.direction_display}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(h.created_at)}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      ${parseFloat(h.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
