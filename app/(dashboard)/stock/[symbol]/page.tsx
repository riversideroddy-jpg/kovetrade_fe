"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Loader2, X, TrendingUp, TrendingDown,
  BarChart2, Info, Globe,
} from "lucide-react";
import { apiFetch } from "@/lib/api";

interface StockData {
  symbol: string;
  name: string;
  logo_url: string;
  price: string;
  change: string;
  change_percent: string;
  is_positive_change: boolean;
  open: number;
  previous_close: number;
  day_high: number;
  day_low: number;
  year_high: number;
  year_low: number;
  market_cap: number | null;
  volume: number | null;
  avg_volume: number | null;
  eps: number | null;
  pe: number | null;
  exchange: string | null;
  sector: string | null;
  industry: string | null;
  description: string | null;
  website: string | null;
  ceo: string | null;
}

interface UserPosition {
  id: number;
  shares: string;
  average_buy_price: string;
  total_invested: string;
  current_value: string;
  profit_loss: string;
  profit_loss_percent: string;
}

function fmt(n: number | string | null | undefined, decimals = 2): string {
  const v = parseFloat(String(n ?? 0));
  if (!v) return "—";
  return v.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function fmtLarge(n: number | null | undefined): string {
  if (!n) return "—";
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9)  return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6)  return `$${(n / 1e6).toFixed(2)}M`;
  return `$${n.toLocaleString()}`;
}

function fmtVol(n: number | null | undefined): string {
  if (!n) return "—";
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)}K`;
  return String(n);
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-white/5 last:border-0">
      <span className="text-gray-500 dark:text-gray-400 text-sm">{label}</span>
      <span className="text-gray-900 dark:text-white text-sm font-medium">{value}</span>
    </div>
  );
}

export default function StockDetailPage() {
  const router = useRouter();
  const params = useParams();
  const symbol = params?.symbol as string;

  const [stock, setStock] = useState<StockData | null>(null);
  const [userPosition, setUserPosition] = useState<UserPosition | null>(null);
  const [userBalance, setUserBalance] = useState<string>("0.00");
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [shares, setShares] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (symbol) {
      fetchStockData();
      fetchUserProfile();
    }
  }, [symbol]);

  const fetchStockData = async () => {
    try {
      setLoading(true);
      const response = await apiFetch(`/stocks/${symbol}/`);
      const data = await response.json();
      if (data.success) {
        setStock(data.stock);
        setUserPosition(data.user_position ?? null);
      }
    } catch (err) {
      console.error("Error fetching stock:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await apiFetch("/profile/");
      const data = await response.json();
      if (data.success) setUserBalance(data.user.balance);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const handleBuyClick = async () => {
    if (!stock || parseFloat(shares) <= 0) { setError("Please enter a valid number of shares"); return; }
    setProcessing(true); setError(null);
    try {
      const res = await apiFetch("/stocks/buy/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol: stock.symbol, shares }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(data.message);
        fetchStockData(); fetchUserProfile(); setShares("");
        setTimeout(() => { setIsBuyModalOpen(false); setSuccess(null); }, 2000);
      } else { setError(data.error || "Failed to buy stock"); }
    } catch { setError("An error occurred while buying stock"); }
    finally { setProcessing(false); }
  };

  const handleSellClick = async () => {
    if (!stock || parseFloat(shares) <= 0) { setError("Please enter a valid number of shares"); return; }
    if (!userPosition) { setError("You don't own any shares of this stock"); return; }
    setProcessing(true); setError(null);
    try {
      const res = await apiFetch("/stocks/sell/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol: stock.symbol, shares }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(data.message);
        fetchStockData(); fetchUserProfile(); setShares("");
        setTimeout(() => { setIsSellModalOpen(false); setSuccess(null); }, 2000);
      } else { setError(data.error || "Failed to sell stock"); }
    } catch { setError("An error occurred while selling stock"); }
    finally { setProcessing(false); }
  };

  function openModal(type: "buy" | "sell") {
    setShares(""); setError(null); setSuccess(null);
    type === "buy" ? setIsBuyModalOpen(true) : setIsSellModalOpen(true);
  }
  function closeModal(type: "buy" | "sell") {
    setShares(""); setError(null); setSuccess(null);
    type === "buy" ? setIsBuyModalOpen(false) : setIsSellModalOpen(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#5edc1f] animate-spin" />
      </div>
    );
  }

  if (!stock) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Stock not found</p>
      </div>
    );
  }

  const price = parseFloat(stock.price);
  const estimatedCost = parseFloat(shares || "0") * price;
  const availableShares = userPosition ? parseFloat(userPosition.shares) : 0;

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="mb-6 px-4 py-2 flex items-center gap-2 bg-white dark:bg-white/[0.04] text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-white/[0.06] transition-colors border border-gray-200 dark:border-white/10"
        >
          <ArrowLeft className="w-5 h-5" />
          Go Back
        </button>

        {/* Hero */}
        <div className="bg-white dark:bg-white/[0.04] rounded-2xl p-6 mb-5 border border-gray-200 dark:border-white/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 relative rounded-full overflow-hidden bg-white flex-shrink-0 flex items-center justify-center">
                {stock.logo_url && !imgError ? (
                  <Image
                    src={stock.logo_url}
                    alt={stock.name}
                    fill
                    className="object-contain p-1.5"
                    unoptimized
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 font-bold text-2xl">
                    {stock.symbol.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    {stock.symbol}
                  </h1>
                  {stock.exchange && (
                    <span className="px-2 py-0.5 bg-[#5edc1f]/10 text-[#5edc1f] text-xs rounded font-medium">
                      {stock.exchange}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-400">{stock.name}</p>
                {stock.sector && (
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-0.5">{stock.sector}</p>
                )}
              </div>
            </div>

            <div className="text-left md:text-right">
              <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {price > 0
                  ? `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  : <span className="text-gray-400 text-base">Price unavailable</span>
                }
              </div>
              {price > 0 && (
                <div className="flex items-center gap-1 justify-start md:justify-end">
                  {stock.is_positive_change
                    ? <TrendingUp className="w-4 h-4 text-green-500" />
                    : <TrendingDown className="w-4 h-4 text-red-500" />
                  }
                  <span className={`text-sm font-medium ${stock.is_positive_change ? "text-green-500" : "text-red-500"}`}>
                    {stock.is_positive_change ? "+" : ""}
                    {parseFloat(stock.change).toFixed(2)} ({parseFloat(stock.change_percent).toFixed(2)}%)
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          {/* Market Data */}
          <div className="bg-white dark:bg-white/[0.04] rounded-2xl p-6 border border-gray-200 dark:border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 className="w-4 h-4 text-[#5edc1f]" />
              <h2 className="font-semibold text-gray-900 dark:text-white text-sm">Market Data</h2>
            </div>
            <StatRow label="Open" value={stock.open > 0 ? `$${fmt(stock.open)}` : "—"} />
            <StatRow label="Previous Close" value={stock.previous_close > 0 ? `$${fmt(stock.previous_close)}` : "—"} />
            <StatRow label="Day High" value={stock.day_high > 0 ? `$${fmt(stock.day_high)}` : "—"} />
            <StatRow label="Day Low" value={stock.day_low > 0 ? `$${fmt(stock.day_low)}` : "—"} />
            <StatRow label="52-Week High" value={stock.year_high > 0 ? `$${fmt(stock.year_high)}` : "—"} />
            <StatRow label="52-Week Low" value={stock.year_low > 0 ? `$${fmt(stock.year_low)}` : "—"} />
          </div>

          {/* Key Statistics */}
          <div className="bg-white dark:bg-white/[0.04] rounded-2xl p-6 border border-gray-200 dark:border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-4 h-4 text-[#5edc1f]" />
              <h2 className="font-semibold text-gray-900 dark:text-white text-sm">Key Statistics</h2>
            </div>
            <StatRow label="Market Cap" value={fmtLarge(stock.market_cap)} />
            <StatRow label="Volume" value={fmtVol(stock.volume)} />
            <StatRow label="Avg Volume" value={fmtVol(stock.avg_volume)} />
            <StatRow label="EPS" value={stock.eps != null ? `$${fmt(stock.eps)}` : "—"} />
            <StatRow label="P/E Ratio" value={stock.pe != null ? fmt(stock.pe) : "—"} />
            {stock.sector && <StatRow label="Sector" value={stock.sector} />}
            {stock.industry && <StatRow label="Industry" value={stock.industry} />}
          </div>
        </div>

        {/* About */}
        {stock.description && (
          <div className="bg-white dark:bg-white/[0.04] rounded-2xl p-6 mb-5 border border-gray-200 dark:border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900 dark:text-white text-sm">About</h2>
              {stock.website && (
                <a
                  href={stock.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#5edc1f] text-xs hover:opacity-80 transition-opacity"
                >
                  <Globe className="w-3.5 h-3.5" />
                  Website
                </a>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-6">
              {stock.description}
            </p>
            {stock.ceo && (
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-3">CEO: {stock.ceo}</p>
            )}
          </div>
        )}

        {/* Position Details */}
        {userPosition && (
          <div className="bg-white dark:bg-white/[0.04] rounded-2xl p-6 mb-5 border border-gray-200 dark:border-white/10">
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">Your Position</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Shares Held", value: parseFloat(userPosition.shares).toFixed(4) },
                { label: "Avg. Buy Price", value: `$${parseFloat(userPosition.average_buy_price).toFixed(2)}` },
                { label: "Total Invested", value: `$${parseFloat(userPosition.total_invested).toFixed(2)}` },
                { label: "Current Value", value: `$${parseFloat(userPosition.current_value).toFixed(2)}` },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-white/5">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Profit / Loss</p>
              <p className={`text-base font-semibold ${parseFloat(userPosition.profit_loss) >= 0 ? "text-green-500" : "text-red-500"}`}>
                {parseFloat(userPosition.profit_loss) >= 0 ? "+" : ""}$
                {parseFloat(userPosition.profit_loss).toFixed(2)} ({parseFloat(userPosition.profit_loss_percent).toFixed(2)}%)
              </p>
            </div>
          </div>
        )}

        {/* Buy / Sell Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => openModal("buy")}
            className="flex-1 bg-[#5edc1f] hover:bg-[#4cc015] text-white font-semibold py-4 rounded-lg transition-colors"
          >
            Buy {stock.symbol}
          </button>
          <button
            onClick={() => openModal("sell")}
            disabled={!userPosition || availableShares <= 0}
            className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-colors"
          >
            Sell {stock.symbol}
          </button>
        </div>
      </div>

      {/* Buy Modal */}
      <AnimatePresence>
        {isBuyModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => closeModal("buy")} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => closeModal("buy")}
            >
              <div className="bg-white dark:bg-white/[0.04] rounded-2xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">Buy {stock.symbol}</h2>
                  <button onClick={() => closeModal("buy")} className="w-10 h-10 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 rounded-full flex items-center justify-center">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">Number of Shares</label>
                    <input type="number" value={shares} onChange={(e) => setShares(e.target.value)}
                      placeholder="Enter shares"
                      className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:border-[#5edc1f]" />
                  </div>
                  <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Price per share</span>
                      <span className="text-gray-900 dark:text-white font-medium">${price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Estimated Cost</span>
                      <span className="text-gray-900 dark:text-white font-medium">${estimatedCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-white/10">
                      <span className="text-gray-500 dark:text-gray-400">Your Balance</span>
                      <span className="text-gray-900 dark:text-white font-medium">${parseFloat(userBalance).toFixed(2)}</span>
                    </div>
                  </div>
                  {error && <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"><p className="text-sm text-red-500">{error}</p></div>}
                  {success && <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3"><p className="text-sm text-green-500">{success}</p></div>}
                  <div className="flex gap-3 pt-4">
                    <button onClick={handleBuyClick} disabled={processing || !shares || parseFloat(shares) <= 0}
                      className="flex-1 py-3 bg-[#5edc1f] hover:bg-[#4cc015] text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                      {processing ? <><Loader2 className="w-5 h-5 animate-spin" />Processing...</> : "Confirm Buy"}
                    </button>
                    <button onClick={() => closeModal("buy")} disabled={processing}
                      className="flex-1 py-3 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-gray-900 dark:text-white font-semibold rounded-lg transition-all">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sell Modal */}
      <AnimatePresence>
        {isSellModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => closeModal("sell")} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => closeModal("sell")}
            >
              <div className="bg-white dark:bg-white/[0.04] rounded-2xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">Sell {stock.symbol}</h2>
                  <button onClick={() => closeModal("sell")} className="w-10 h-10 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 rounded-full flex items-center justify-center">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">Number of Shares</label>
                    <input type="number" value={shares} onChange={(e) => setShares(e.target.value)}
                      max={availableShares} placeholder="Enter shares"
                      className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500" />
                  </div>
                  <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Available shares</span>
                      <span className="text-gray-900 dark:text-white font-medium">{availableShares.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Price per share</span>
                      <span className="text-gray-900 dark:text-white font-medium">${price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-white/10">
                      <span className="text-gray-500 dark:text-gray-400">Estimated Proceeds</span>
                      <span className="text-gray-900 dark:text-white font-medium">${estimatedCost.toFixed(2)}</span>
                    </div>
                  </div>
                  {error && <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"><p className="text-sm text-red-500">{error}</p></div>}
                  {success && <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3"><p className="text-sm text-green-500">{success}</p></div>}
                  <div className="flex gap-3 pt-4">
                    <button onClick={handleSellClick}
                      disabled={processing || !shares || parseFloat(shares) <= 0 || parseFloat(shares) > availableShares}
                      className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                      {processing ? <><Loader2 className="w-5 h-5 animate-spin" />Processing...</> : "Confirm Sell"}
                    </button>
                    <button onClick={() => closeModal("sell")} disabled={processing}
                      className="flex-1 py-3 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-gray-900 dark:text-white font-semibold rounded-lg transition-all">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
