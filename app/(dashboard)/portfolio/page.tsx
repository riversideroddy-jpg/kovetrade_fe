"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { apiFetch } from "@/lib/api";
import BalanceCard from "@/components/dashboard/portfolio/BalanceCard";
import {
  AssetAllocationCard,
  LiveTradingCard,
} from "@/components/dashboard/portfolio/DashboardCards";
import {
  FollowingSection,
  TradeCopiedSection,
} from "@/components/dashboard/portfolio/TradingSections";
import DepositModal from "@/components/dashboard/modals/DepositModal";
import WithdrawModal from "@/components/dashboard/modals/WithdrawModal";
import TransactionHistoryModal from "@/components/dashboard/modals/TransactionHistoryModal";

interface DashboardData {
  balance: number;
  availableBalance: number;
  totalDeposits: number;
  totalWithdrawals: number;
  totalProfits: number;
  isVerified: boolean;
  firstName: string;
  target: number;
}

export default function PortfolioPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    balance: 0,
    availableBalance: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
    totalProfits: 0,
    isVerified: false,
    firstName: "",
    target: 50000,
  });

  // Modal states
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Re-fetch when modals close (to update balance display)
  const handleDepositClose = () => {
    setShowDeposit(false);
    fetchDashboardData();
  };

  const handleWithdrawClose = () => {
    setShowWithdraw(false);
    fetchDashboardData();
  };

  const handleHistoryClose = () => {
    setShowHistory(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const fetchDashboardData = async () => {
    try {
      // Fetch user profile for balance info
      const profileRes = await apiFetch("/profile/");
      const profileData = await profileRes.json();

      if (profileData.success) {
        const user = profileData.user;
        setDashboardData((prev) => ({
          ...prev,
          balance: parseFloat(user.balance) || 0,
          availableBalance: parseFloat(user.balance) || 0,
          totalProfits: parseFloat(user.profit) || 0,
          isVerified: user.is_verified || false,
          firstName: user.first_name || "",
          target: parseFloat(user.target) || 50000,
        }));
      }

      // Fetch transaction totals
      const [depositRes, withdrawalRes] = await Promise.all([
        apiFetch("/deposits/history/?limit=100"),
        apiFetch("/withdrawals/history/?limit=100"),
      ]);

      const depositData = await depositRes.json();
      const withdrawalData = await withdrawalRes.json();

      let totalDeposits = 0;
      let totalWithdrawals = 0;

      if (depositData.success) {
        totalDeposits = depositData.transactions
          .filter((t: { status: string }) => t.status === "completed")
          .reduce((sum: number, t: { amount: string }) => sum + parseFloat(t.amount), 0);
      }

      if (withdrawalData.success) {
        totalWithdrawals = withdrawalData.transactions
          .filter((t: { status: string }) => t.status === "completed")
          .reduce((sum: number, t: { amount: string }) => sum + parseFloat(t.amount), 0);
      }

      setDashboardData((prev) => ({
        ...prev,
        totalDeposits,
        totalWithdrawals,
      }));
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  return (
    <div className="space-y-4">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          {getGreeting()}, {dashboardData.firstName || "Trader"}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Here&apos;s an overview of your portfolio and trading activity
        </p>
      </motion.div>

      {/* ROW 1: Balance Card (2/3) + Right Sidebar (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <BalanceCard
            balance={dashboardData.balance}
            availableBalance={dashboardData.availableBalance}
            totalDeposits={dashboardData.totalDeposits}
            totalWithdrawals={dashboardData.totalWithdrawals}
            totalProfits={dashboardData.totalProfits}
            isVerified={dashboardData.isVerified}
            onDeposit={() => setShowDeposit(true)}
            onWithdraw={() => setShowWithdraw(true)}
            onHistory={() => setShowHistory(true)}
          />
        </div>

        <div className="flex flex-col gap-4">
          {/* Portfolio Growth target progress bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl px-4 pt-3 pb-3 bg-white/80 dark:bg-white/3 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-[12px] font-semibold text-gray-500 dark:text-gray-400">Portfolio Growth</span>
              <span className="text-[12px] font-bold text-[#5edc1f]">
                ${dashboardData.target.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} target
              </span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden bg-gray-100 dark:bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${dashboardData.target > 0 ? Math.min((dashboardData.totalDeposits / dashboardData.target) * 100, 100) : 0}%`,
                }}
                transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="h-full rounded-full bg-[#5edc1f]"
              />
            </div>
            <div className="mt-1.5 text-[10px] text-gray-400 dark:text-gray-500">
              ${dashboardData.totalDeposits.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} deposited of ${dashboardData.target.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </motion.div>

          <LiveTradingCard />
          <AssetAllocationCard
            balance={dashboardData.balance}
            totalDeposits={dashboardData.totalDeposits}
            totalWithdrawals={dashboardData.totalWithdrawals}
            totalProfits={dashboardData.totalProfits}
          />
        </div>
      </div>

      {/* ROW 2: Trade Copied (2/3) + Following (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <TradeCopiedSection />
        </div>
        <div>
          <FollowingSection />
        </div>
      </div>

      {/* Modals */}
      <DepositModal isOpen={showDeposit} onClose={handleDepositClose} />
      <WithdrawModal isOpen={showWithdraw} onClose={handleWithdrawClose} />
      <TransactionHistoryModal isOpen={showHistory} onClose={handleHistoryClose} />
    </div>
  );
}
