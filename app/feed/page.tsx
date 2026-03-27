"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp, TrendingDown, Minus, Clock, Bookmark, Share2,
  MessageSquare, Heart, RefreshCw, Zap, ChevronUp, Filter,
  BarChart2, Flame, Star, ArrowRight, X
} from "lucide-react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FeedCard {
  id: string;
  headline: string;
  summary: string;
  category: string;
  subcategory: string;
  sentiment: "positive" | "negative" | "neutral";
  urgency: "breaking" | "today" | "this-week";
  readTime: string;
  publishedAt: string;
  keyNumber: { value: string; label: string };
  tags: string[];
  author: string;
  hasChart: boolean;
  chartData: number[];
  chartTrend: "up" | "down" | "flat";
  imageEmoji: string;
  depth: "quick" | "deep";
  relatedTopics: string[];
}

// ─── Static seed cards shown instantly ────────────────────────────────────────
const SEED_CARDS: FeedCard[] = [
  {
    id: "seed_1",
    headline: "Nifty 50 crosses 26,000 for first time as FII inflows surge ₹18,400 Cr",
    summary: "Foreign institutional investors pumped ₹18,400 crore into Indian equities in a single week — the highest since March 2023. IT and banking stocks led the rally. Analysts say the move is driven by expectations of a Fed rate cut and India's inclusion in global bond indices.",
    category: "Markets", subcategory: "Nifty 50",
    sentiment: "positive", urgency: "breaking",
    readTime: "2 min", publishedAt: "12 mins ago",
    keyNumber: { value: "₹18,400 Cr", label: "FII Inflow" },
    tags: ["Nifty", "FII", "Bull Run"],
    author: "ET Markets",
    hasChart: true,
    chartData: [142, 148, 145, 152, 158, 165],
    chartTrend: "up",
    imageEmoji: "📈",
    depth: "quick",
    relatedTopics: ["Sensex", "FII Activity"],
  },
  {
    id: "seed_2",
    headline: "Zepto raises $350M at $5B valuation, eyes IPO by Q3 2026",
    summary: "Quick-commerce startup Zepto has closed a $350 million Series G round led by General Atlantic and Motilal Oswal, valuing the company at $5 billion — up from $3.6B just 8 months ago. The company claims profitability in 12 of its 17 cities. An IPO filing is expected by September 2026.",
    category: "Startups", subcategory: "Series G",
    sentiment: "positive", urgency: "today",
    readTime: "3 min", publishedAt: "45 mins ago",
    keyNumber: { value: "$5B", label: "Valuation" },
    tags: ["Zepto", "Quick Commerce", "IPO"],
    author: "ET Startups",
    hasChart: false, chartData: [], chartTrend: "up",
    imageEmoji: "🚀",
    depth: "deep",
    relatedTopics: ["Blinkit", "Swiggy Instamart"],
  },
  {
    id: "seed_3",
    headline: "RBI flags 3 mid-size NBFCs for excessive unsecured lending",
    summary: "The Reserve Bank of India has issued show-cause notices to three unnamed mid-size NBFCs for breaching the 25% cap on unsecured personal loans. The regulator found loan-to-income ratios exceeding 8x in some portfolios. Shares of NBFC sector fell 2.3% on the news.",
    category: "Banking", subcategory: "RBI Regulation",
    sentiment: "negative", urgency: "breaking",
    readTime: "2 min", publishedAt: "1 hr ago",
    keyNumber: { value: "2.3%", label: "NBFC Sector Fall" },
    tags: ["RBI", "NBFC", "Regulation"],
    author: "ET Bureau",
    hasChart: true,
    chartData: [180, 175, 172, 168, 162, 158],
    chartTrend: "down",
    imageEmoji: "🏦",
    depth: "quick",
    relatedTopics: ["Bajaj Finance", "Muthoot"],
  },
  {
    id: "seed_4",
    headline: "India's AI startup funding hits $2.1B in 2025 — 3x jump from 2024",
    summary: "Indian AI startups raised $2.1 billion across 340 deals in 2025, a 3x increase from $680 million in 2024. Infrastructure and enterprise AI led with 60% of capital. Bengaluru accounts for 58% of deals, followed by Delhi NCR at 22%. Global VCs including Sequoia, Lightspeed, and a16z have all opened India-specific AI funds.",
    category: "Tech", subcategory: "AI Funding",
    sentiment: "positive", urgency: "this-week",
    readTime: "4 min", publishedAt: "3 hrs ago",
    keyNumber: { value: "$2.1B", label: "AI Funding 2025" },
    tags: ["AI", "Startups", "VC"],
    author: "ET Tech",
    hasChart: true,
    chartData: [40, 55, 68, 90, 120, 165],
    chartTrend: "up",
    imageEmoji: "🤖",
    depth: "deep",
    relatedTopics: ["Krutrim", "Sarvam AI"],
  },
  {
    id: "seed_5",
    headline: "Adani Green Energy wins 8 GW solar tender — largest in Indian history",
    summary: "Adani Green Energy has won a ₹45,000 crore solar power tender from SECI for 8 gigawatts of capacity — the single largest renewable energy award in India's history. The project will be spread across Rajasthan and Gujarat, with commissioning by 2028. The win pushes Adani Green's total order book to 28 GW.",
    category: "Corporate", subcategory: "Renewable Energy",
    sentiment: "positive", urgency: "today",
    readTime: "3 min", publishedAt: "5 hrs ago",
    keyNumber: { value: "8 GW", label: "Solar Capacity" },
    tags: ["Adani", "Solar", "Green Energy"],
    author: "ET Bureau",
    hasChart: false, chartData: [], chartTrend: "up",
    imageEmoji: "☀️",
    depth: "quick",
    relatedTopics: ["SECI", "Renewable India"],
  },
];

// ─── Mini sparkline SVG ────────────────────────────────────────────────────────
function Sparkline({ data, trend }: { data: number[]; trend: string }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 80, h = 32;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");
  const color = trend === "up" ? "#22c55e" : trend === "down" ? "#ef4444" : "#eab308";
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <polyline points={pts} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={`0,${h} ${pts} ${w},${h}`} fill={`${color}18`} stroke="none" />
    </svg>
  );
}

// ─── Category pill colors ──────────────────────────────────────────────────────
const CAT_COLORS: Record<string, { color: string; bg: string }> = {
  Markets:          { color: "#60a5fa", bg: "rgba(59,130,246,0.12)" },
  Startups:         { color: "#c084fc", bg: "rgba(168,85,247,0.12)" },
  Economy:          { color: "#4ade80", bg: "rgba(34,197,94,0.12)" },
  Banking:          { color: "#fb923c", bg: "rgba(249,115,22,0.12)" },
  Tech:             { color: "#22d3ee", bg: "rgba(6,182,212,0.12)" },
  Global:           { color: "#f87171", bg: "rgba(239,68,68,0.12)" },
  Realty:           { color: "#a78bfa", bg: "rgba(139,92,246,0.12)" },
  Commodities:      { color: "#fbbf24", bg: "rgba(245,158,11,0.12)" },
  Corporate:        { color: "#34d399", bg: "rgba(52,211,153,0.12)" },
  "Personal Finance":{ color: "#f9a8d4", bg: "rgba(244,114,182,0.12)" },
};

const URGENCY: Record<string, { label: string; color: string }> = {
  breaking:    { label: "LIVE", color: "#ef4444" },
  today:       { label: "TODAY", color: "#f97316" },
  "this-week": { label: "TRENDING", color: "#6b7280" },
};

const FILTERS = ["All", "Markets", "Startups", "Economy", "Banking", "Tech", "Global", "Corporate"];

// ─── Single Feed Card ──────────────────────────────────────────────────────────
function NewsCard({ card, index }: { card: FeedCard; index: number }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [likeCount] = useState(() => Math.floor(Math.random() * 800) + 50);
  const catStyle = CAT_COLORS[card.category] || { color: "#9ca3af", bg: "rgba(156,163,175,0.12)" };
  const urgStyle = URGENCY[card.urgency] || URGENCY["this-week"];
  const sentColor = card.sentiment === "positive" ? "#22c55e" : card.sentiment === "negative" ? "#ef4444" : "#eab308";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.25) }}
      className="relative w-full max-w-[520px] mx-auto overflow-hidden flex flex-col"
      style={{ background: "#fff", border: "1px solid #e2e2e2", borderTop: `3px solid ${catStyle.color}`, borderRadius: "3px", minHeight: 420 }}
    >
      {/* Top color bar */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${catStyle.color}, transparent)` }} />

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Row 1: category + urgency + author */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="badge" style={{ background: catStyle.bg, color: catStyle.color }}>
              {card.category}
            </span>
            {card.urgency !== "this-week" && (
              <span className="flex items-center gap-1 text-xs font-bold" style={{ color: urgStyle.color }}>
                {card.urgency === "breaking" && (
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: urgStyle.color }} />
                )}
                {urgStyle.label}
              </span>
            )}
          </div>
          <span className="text-xs" style={{ color: "var(--faint)" }}>{card.author}</span>
        </div>

        {/* Emoji + subcategory */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-3xl">{card.imageEmoji}</span>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--surface2)", color: "var(--faint)" }}>
            {card.subcategory}
          </span>
        </div>

        {/* Headline */}
        <h2 className="et-headline text-base leading-snug mb-3" style={{ color: "#1a2744" }}>{card.headline}</h2>

        {/* Key number highlight */}
        <div className="flex items-center gap-3 mb-3 p-3" style={{ background: "#f8f8f8", border: "1px solid #f0f0f0", borderRadius: "3px" }}>
          <div>
            <div className="et-headline text-xl" style={{ color: catStyle.color }}>{card.keyNumber.value}</div>
            <div className="sans text-xs" style={{ color: "#999" }}>{card.keyNumber.label}</div>
          </div>
          {card.hasChart && card.chartData.length > 1 && (
            <div className="ml-auto">
              <Sparkline data={card.chartData} trend={card.chartTrend} />
            </div>
          )}
          {!card.hasChart && (
            <div className="ml-auto flex items-center gap-1 text-xs" style={{ color: sentColor }}>
              {card.sentiment === "positive" ? <TrendingUp size={14} /> : card.sentiment === "negative" ? <TrendingDown size={14} /> : <Minus size={14} />}
              {card.sentiment}
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="flex-1">
          <p className="sans text-sm leading-relaxed" style={{ color: "#555" }}>
            {expanded ? card.summary : card.summary.slice(0, 120) + (card.summary.length > 120 ? "…" : "")}
          </p>
          {card.summary.length > 120 && (
            <button onClick={() => setExpanded(!expanded)}
              className="sans text-xs font-semibold mt-1 transition-all hover:opacity-80"
              style={{ color: "#C8102E" }}>
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {card.tags.map((tag) => (
            <span key={tag} className="sans text-xs px-2 py-0.5"
              style={{ background: "#f5f5f5", color: "#777", border: "1px solid #e2e2e2", borderRadius: "2px" }}>
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 flex items-center justify-between" style={{ borderTop: "1px solid #f0f0f0" }}>
        <div className="sans flex items-center gap-1" style={{ color: "#999" }}>
          <Clock size={11} />
          <span className="text-xs">{card.readTime}</span>
          <span className="mx-1.5 text-xs">·</span>
          <span className="text-xs">{card.publishedAt}</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setLiked(!liked)} className="sans flex items-center gap-1 transition-all active:scale-90"
            style={{ color: liked ? "#C8102E" : "#bbb" }}>
            <Heart size={15} fill={liked ? "#C8102E" : "none"} />
            <span className="text-xs">{liked ? likeCount + 1 : likeCount}</span>
          </button>
          <button onClick={() => setSaved(!saved)} className="transition-all active:scale-90"
            style={{ color: saved ? "#b45309" : "#bbb" }}>
            <Bookmark size={15} fill={saved ? "#b45309" : "none"} />
          </button>
          <button className="transition-all active:scale-90 hover:opacity-70" style={{ color: "#bbb" }}>
            <Share2 size={15} />
          </button>
          {card.depth === "deep" && (
            <Link href="/navigator"
              className="sans flex items-center gap-1 text-xs font-bold px-2.5 py-1 transition-all hover:opacity-80"
              style={{ background: "#fce8e8", color: "#C8102E", borderRadius: "3px" }}>
              Deep dive <ArrowRight size={10} />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Skeleton card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="w-full max-w-[520px] mx-auto overflow-hidden p-5 space-y-4"
      style={{ background: "#fff", border: "1px solid #e2e2e2", borderTop: "3px solid #e2e2e2", borderRadius: "3px", minHeight: 380 }}>
      <div className="flex gap-2"><div className="skeleton h-5 w-20" /><div className="skeleton h-5 w-14" /></div>
      <div className="skeleton h-6 w-full" /><div className="skeleton h-5 w-4/5" />
      <div className="skeleton h-16 w-full" />
      <div className="skeleton h-4 w-full" /><div className="skeleton h-4 w-3/4" />
    </div>
  );
}

// ─── Main Feed Page ────────────────────────────────────────────────────────────
export default function FeedPage() {
  const [cards, setCards] = useState<FeedCard[]>(SEED_CARDS);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [newCount, setNewCount] = useState(0);
  const [pendingCards, setPendingCards] = useState<FeedCard[]>([]);
  const loaderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch next batch
  const fetchBatch = useCallback(async (currentOffset: number, category?: string) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/feed-batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offset: currentOffset, category: category !== "All" ? category : undefined }),
      });
      const data = await res.json();
      if (data.cards) {
        setCards((prev) => [...prev, ...data.cards]);
        setOffset(data.nextOffset);
      }
    } catch { /* silent */ }
    setLoading(false);
  }, [loading]);

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) fetchBatch(offset, activeFilter); },
      { rootMargin: "400px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [offset, activeFilter, fetchBatch]);

  // Scroll-to-top visibility
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => setShowScrollTop(el.scrollTop > 600);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Simulate live "new stories" notification every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      setNewCount((n) => n + Math.floor(Math.random() * 3) + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Filter change — reset feed
  function handleFilter(f: string) {
    setActiveFilter(f);
    setCards(SEED_CARDS.filter(c => f === "All" || c.category === f));
    setOffset(0);
    setNewCount(0);
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Load new stories
  function loadNewStories() {
    setNewCount(0);
    fetchBatch(offset, activeFilter);
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }

  const visibleCards = activeFilter === "All" ? cards : cards.filter(c => c.category === activeFilter);

  return (
    <div className="flex flex-col" style={{ minHeight: "calc(100vh - 120px)", background: "#f5f5f5" }}>
      {/* Sticky filter bar */}
      <div className="sticky top-0 z-30 px-4 py-3" style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e2e2e2" }}>
        <div className="max-w-[520px] mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-0.5">
            {FILTERS.map((f) => (
              <button key={f} onClick={() => handleFilter(f)}
                className="sans shrink-0 text-xs font-bold px-3 py-1.5 transition-all"
                style={{
                  background: activeFilter === f ? "#C8102E" : "#fff",
                  color: activeFilter === f ? "white" : "#555",
                  border: `1px solid ${activeFilter === f ? "#C8102E" : "#e2e2e2"}`,
                  borderRadius: "3px",
                }}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* New stories pill */}
      <AnimatePresence>
        {newCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="sticky top-14 z-20 flex justify-center pt-3 pointer-events-none"
          >
            <button
              onClick={loadNewStories}
              className="pointer-events-auto sans flex items-center gap-2 px-4 py-2 text-xs font-bold text-white shadow-md transition-all hover:opacity-90 active:scale-95"
              style={{ background: "#C8102E", borderRadius: "3px" }}>
              <Zap size={12} />
              {newCount} new {newCount === 1 ? "story" : "stories"} — tap to load
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scrollable feed */}
      <div ref={containerRef} className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="max-w-[520px] mx-auto px-4 py-6 space-y-4">
          {/* Feed header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#C8102E" }} />
              <span className="sans text-sm font-bold" style={{ color: "#1a2744" }}>Live Feed</span>
            </div>
            <span className="sans text-xs" style={{ color: "#999" }}>{visibleCards.length} stories</span>
          </div>

          {/* Cards */}
          {visibleCards.map((card, i) => (
            <NewsCard key={card.id} card={card} index={i} />
          ))}

          {/* Loading skeletons */}
          {loading && (
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
          )}

          {/* Infinite scroll trigger */}
          <div ref={loaderRef} className="h-4" />

          {/* Bottom padding */}
          <div className="h-16" />
        </div>
      </div>

      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-40 w-10 h-10 flex items-center justify-center shadow-md transition-all hover:shadow-lg active:scale-95"
            style={{ background: "#C8102E", color: "#fff", borderRadius: "3px" }}>
            <ChevronUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
