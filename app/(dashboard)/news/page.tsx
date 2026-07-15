"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { apiFetch } from "@/lib/api";

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  content: string;
  category: string;
  source: string;
  author: string;
  published_at: string;
  image_url: string | null;
  tags: string[];
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

interface NewsResponse {
  results: NewsItem[];
  total: number;
  page: number;
  pages: number;
  page_size: number;
}

const CATEGORIES = ["All", "Stocks", "Technology", "Economy", "Cryptocurrency", "Commodities", "Forex"];

export default function NewsPage() {
  const [newsData, setNewsData]       = useState<NewsItem[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage]               = useState(1);
  const [totalPages, setTotalPages]   = useState(1);
  const [total, setTotal]             = useState(0);

  const fetchNews = useCallback(async (p = page) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (selectedCategory !== "All") params.append("category", selectedCategory);
      if (searchQuery.trim())         params.append("search", searchQuery.trim());
      params.append("page", String(p));

      const url = `/news/?${params.toString()}`;
      const response = await apiFetch(url);

      if (!response.ok) throw new Error("Failed to fetch news");

      const data: NewsResponse = await response.json();
      setNewsData(data.results);
      setTotal(data.total);
      setTotalPages(data.pages);
      setPage(data.page);
    } catch {
      setError("Failed to load news. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchQuery, page]);

  // Reset to page 1 when filter/search changes
  useEffect(() => {
    setPage(1);
    fetchNews(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, searchQuery]);

  // Fetch when page changes (but not on filter change, handled above)
  useEffect(() => {
    fetchNews(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages || p === page) return;
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  const getImageUrl = (imageUrl: string | null) =>
    imageUrl || "https://via.placeholder.com/400x200/3b82f6/ffffff?text=News";

  // Page number range to show (max 5 buttons)
  const pageButtons = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const delta = 2;
    const range: (number | "…")[] = [];
    const left  = Math.max(2, page - delta);
    const right = Math.min(totalPages - 1, page + delta);
    range.push(1);
    if (left > 2) range.push("…");
    for (let i = left; i <= right; i++) range.push(i);
    if (right < totalPages - 1) range.push("…");
    range.push(totalPages);
    return range;
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
            Market News
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Stay updated with the latest financial news and market insights
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-white dark:bg-white/[0.04] text-gray-900 dark:text-white border-2 border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:border-[#5edc1f] dark:focus:border-[#5edc1f] transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-[#5edc1f] text-white"
                    : "bg-white dark:bg-white/[0.04] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/[0.06]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-5 h-5 border-2 border-[#5edc1f] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button
              onClick={() => fetchNews(page)}
              className="px-6 py-2 bg-[#5edc1f] hover:bg-[#4cc015] text-white rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && newsData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No news found matching your criteria
            </p>
          </div>
        )}

        {/* News Grid */}
        {!loading && !error && newsData.length > 0 && (
          <>
            {/* Result count */}
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              Showing {(page - 1) * 12 + 1}–{Math.min(page * 12, total)} of {total} articles
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsData.map((news) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setSelectedNews(news)}
                  className="bg-white dark:bg-white/[0.04] rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 hover:border-[#5edc1f] dark:hover:border-[#5edc1f] transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-[#5edc1f]/10"
                >
                  <div className="relative h-48 bg-gray-100 dark:bg-white/5">
                    <Image
                      src={getImageUrl(news.image_url)}
                      alt={news.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#5edc1f] text-white text-xs font-semibold rounded-full">
                        {news.category}
                      </span>
                    </div>
                    {news.is_featured && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                      {news.summary}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                      <span>{news.source}</span>
                      <span>{formatDate(news.published_at)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-10">
                {/* Prev */}
                <button
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.04] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Page numbers */}
                {pageButtons().map((btn, i) =>
                  btn === "…" ? (
                    <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">
                      …
                    </span>
                  ) : (
                    <button
                      key={btn}
                      onClick={() => goToPage(btn as number)}
                      className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition ${
                        page === btn
                          ? "bg-[#5edc1f] text-white"
                          : "border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.04] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/[0.08]"
                      }`}
                    >
                      {btn}
                    </button>
                  )
                )}

                {/* Next */}
                <button
                  onClick={() => goToPage(page + 1)}
                  disabled={page === totalPages}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.04] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedNews && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNews(null)}
              className="fixed inset-0 bg-black/70 dark:bg-black/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedNews(null)}
            >
              <div
                className="bg-white dark:bg-white/[0.04] rounded-2xl max-w-4xl w-full h-[95vh] flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedNews(null)}
                  className="absolute top-4 right-4 w-12 h-12 bg-black/80 dark:bg-white/90 hover:bg-black dark:hover:bg-white text-white dark:text-gray-900 rounded-full flex items-center justify-center transition-all shadow-lg z-10"
                >
                  <X className="w-6 h-6" strokeWidth={3} />
                </button>

                <div className="overflow-y-auto flex-1">
                  <div className="relative h-64 sm:h-80 bg-gray-100 dark:bg-white/5">
                    <Image
                      src={getImageUrl(selectedNews.image_url)}
                      alt={selectedNews.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <span className="px-3 py-1 bg-[#5edc1f] text-white text-sm font-semibold rounded-full">
                        {selectedNews.category}
                      </span>
                      {selectedNews.is_featured && (
                        <span className="px-3 py-1 bg-yellow-500 text-white text-sm font-semibold rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4">
                      {selectedNews.title}
                    </h2>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6 pb-6 border-b border-gray-200 dark:border-white/10">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>{selectedNews.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        <span>{selectedNews.source}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{formatDate(selectedNews.published_at)}</span>
                      </div>
                    </div>

                    <div className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 space-y-4">
                      {selectedNews.content.split("\n").map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>

                    {selectedNews.tags && selectedNews.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedNews.tags.map((tag, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <button
                      onClick={() => setSelectedNews(null)}
                      className="w-full py-3 bg-[#5edc1f] hover:bg-[#4cc015] text-white font-semibold rounded-lg transition-colors"
                    >
                      Close
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
