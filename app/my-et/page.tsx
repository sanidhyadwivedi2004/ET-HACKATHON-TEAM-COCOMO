"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Clock, ChevronDown, RefreshCw, AlertCircle } from "lucide-react";

const profiles = [
  { id: "investor", label: "Mutual Fund Investor", icon: "MF", desc: "Portfolio-relevant stories, market moves, fund performance" },
  { id: "founder",  label: "Startup Founder",      icon: "SF", desc: "Funding rounds, competitor moves, regulatory changes" },
  { id: "student",  label: "Business Student",     icon: "BS", desc: "Explainer-first content, simplified jargon, learning-focused" },
  { id: "executive",label: "Corporate Executive",  icon: "CE", desc: "M&A, board-level strategy, competitive intelligence" },
];

const CAT_STYLE: Record<string, { bg: string; color: string }> = {
  Markets:    { bg: "#e8f0fe", color: "#1a4fa0" },
  Startups:   { bg: "#f3e8ff", color: "#6b21a8" },
  Economy:    { bg: "#e8f5e9", color: "#1a7a3c" },
  Policy:     { bg: "#fff8e1", color: "#b45309" },
  Banking:    { bg: "#fff3e0", color: "#c2410c" },
  Tech:       { bg: "#e0f7fa", color: "#0e7490" },
  Global:     { bg: "#fce8e8", color: "#991b1b" },
  Commodities:{ bg: "#f5f5f5", color: "#444" },
};

const URGENCY: Record<string, { label: string; color: string; bg: string }> = {
  breaking:    { label: "BREAKING", color: "#C8102E", bg: "#fce8e8" },
  today:       { label: "TODAY",    color: "#b45309", bg: "#fff8e1" },
  "this-week": { label: "",         color: "#777",    bg: "#f5f5f5" },
};

function Skeleton() {
  return (
    <div className="card p-5 space-y-3">
      <div className="flex gap-2"><div className="skeleton h-5 w-20" /><div className="skeleton h-5 w-14" /></div>
      <div className="skeleton h-5 w-full" /><div className="skeleton h-4 w-3/4" /><div className="skeleton h-3 w-1/2" />
    </div>
  );
}

export default function MyET() {
  const [selected, setSelected] = useState<string | null>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function loadFeed(id: string) {
    setSelected(id);
    setLoading(true);
    setArticles([]);
    setError(null);
    setExpanded(null);
    try {
      const res = await fetch("/api/personalized-feed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile: profiles.find(p => p.id === id) }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setArticles(data.articles || []);
    } catch (e: any) { setError(e.message || "Failed to load feed"); }
    setLoading(false);
  }

  const activeProfile = profiles.find(p => p.id === selected);

  return (
    <div className="max-w-4xl mx-auto px-5 py-10">
      {/* Page header */}
      <div className="mb-8 pb-5" style={{ borderBottom: "3px solid #C8102E" }}>
        <div className="section-label mb-2">PERSONALISED NEWSROOM</div>
        <h1 className="et-headline text-3xl mb-2" style={{ color: "#1a2744" }}>My ET</h1>
        <p className="sans text-sm leading-relaxed" style={{ color: "#555" }}>
          Select your profile. The AI generates a completely different news experience — different stories, different framing, different depth — for each role.
        </p>
      </div>

      {/* Profile selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {profiles.map((p) => {
          const active = selected === p.id;
          return (
            <button key={p.id} onClick={() => loadFeed(p.id)} disabled={loading}
              className="text-left transition-all disabled:opacity-60 hover:shadow-sm"
              style={{
                background: active ? "#fef2f2" : "#fff",
                border: `1px solid ${active ? "#C8102E" : "#e2e2e2"}`,
                borderRadius: "3px",
                borderTop: `3px solid ${active ? "#C8102E" : "transparent"}`,
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                minHeight: "140px",
              }}>
              {/* Icon — fixed size, always top */}
              <div className="sans text-xs font-black mb-3 shrink-0"
                style={{
                  width: "32px", height: "32px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: active ? "#C8102E" : "#f0f0f0",
                  color: active ? "#fff" : "#555",
                  borderRadius: "3px",
                  fontSize: "11px",
                  letterSpacing: "0.02em",
                }}>
                {p.icon}
              </div>
              {/* Label */}
              <div className="sans text-sm font-bold mb-1" style={{ color: "#1a2744", lineHeight: "1.3" }}>{p.label}</div>
              {/* Desc */}
              <div className="sans text-xs leading-relaxed flex-1" style={{ color: "#777" }}>{p.desc}</div>
              {/* Active indicator */}
              {active && (
                <div className="sans mt-2 text-xs font-bold shrink-0" style={{ color: "#C8102E" }}>● Active</div>
              )}
            </button>
          );
        })}
      </div>

      {/* Loading */}
      {loading && (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-4">
            <div className="skeleton h-5 w-48" /><div className="skeleton h-4 w-20" />
          </div>
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} />)}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 flex items-center gap-3" style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "3px" }}>
          <AlertCircle size={16} style={{ color: "#C8102E" }} />
          <span className="sans text-sm" style={{ color: "#991b1b" }}>{error}</span>
          <button onClick={() => selected && loadFeed(selected)}
            className="sans ml-auto text-xs font-semibold px-3 py-1.5 transition-all"
            style={{ background: "#C8102E", color: "#fff", borderRadius: "3px" }}>
            <RefreshCw size={11} className="inline mr-1" />Retry
          </button>
        </div>
      )}

      {/* Feed */}
      <AnimatePresence>
        {articles.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: "#C8102E" }} />
                <span className="sans text-sm font-bold" style={{ color: "#1a2744" }}>{activeProfile?.label} Feed</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="sans text-xs" style={{ color: "#777" }}>{articles.length} stories</span>
                <button onClick={() => selected && loadFeed(selected)}
                  className="sans flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 transition-all hover:opacity-80"
                  style={{ background: "#f5f5f5", border: "1px solid #e2e2e2", color: "#555", borderRadius: "3px" }}>
                  <RefreshCw size={11} /> Refresh
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {articles.map((article, i) => {
                const cat = CAT_STYLE[article.category] || { bg: "#f5f5f5", color: "#444" };
                const urg = URGENCY[article.urgency] || URGENCY["this-week"];
                const isExp = expanded === (article.id || String(i));
                const aid = article.id || String(i);

                return (
                  <motion.div key={aid} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    style={{ background: "#fff", border: "1px solid #e2e2e2", borderRadius: "3px", overflow: "hidden" }}>
                    <button className="w-full p-4 text-left" onClick={() => setExpanded(isExp ? null : aid)}>
                      <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                          {/* Meta */}
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className="sans badge" style={{ background: cat.bg, color: cat.color }}>{article.category}</span>
                            {article.urgency !== "this-week" && (
                              <span className="sans badge" style={{ background: urg.bg, color: urg.color }}>{urg.label}</span>
                            )}
                            <span className="sans flex items-center gap-1 text-xs" style={{ color: "#999" }}>
                              {article.sentiment === "positive" ? <TrendingUp size={10} style={{ color: "#1a7a3c" }} /> :
                               article.sentiment === "negative" ? <TrendingDown size={10} style={{ color: "#C8102E" }} /> :
                               <Minus size={10} style={{ color: "#b45309" }} />}
                              {article.sentiment}
                            </span>
                            <span className="sans flex items-center gap-1 text-xs" style={{ color: "#999" }}>
                              <Clock size={9} /> {article.readTime}
                            </span>
                            <span className="sans text-xs" style={{ color: "#bbb" }}>{article.publishedAt}</span>
                          </div>
                          {/* Title */}
                          <h3 className="et-headline text-sm leading-snug" style={{ color: "#1a2744" }}>{article.title}</h3>
                          {/* Why it matters */}
                          {article.whyItMatters && (
                            <p className="sans text-xs mt-1.5 leading-relaxed" style={{ color: "#C8102E" }}>
                              → {article.whyItMatters}
                            </p>
                          )}
                        </div>
                        {/* Right */}
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <div className="sans text-xs font-bold px-2 py-0.5"
                            style={{ background: "#fef2f2", color: "#C8102E", borderRadius: "2px" }}>
                            {article.relevanceScore}% match
                          </div>
                          {article.keyMetric && (
                            <div className="text-right">
                              <div className="sans text-sm font-black" style={{ color: "#1a2744" }}>{article.keyMetric.value}</div>
                              <div className="sans text-xs" style={{ color: "#999" }}>{article.keyMetric.label}</div>
                            </div>
                          )}
                          <ChevronDown size={14} style={{ color: "#bbb", transform: isExp ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                        </div>
                      </div>
                    </button>

                    <AnimatePresence>
                      {isExp && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                          <div className="px-4 pb-4 pt-3" style={{ borderTop: "1px solid #f0f0f0", background: "#fafafa" }}>
                            <p className="sans text-sm leading-relaxed mb-3" style={{ color: "#444" }}>{article.summary}</p>
                            {article.tags && (
                              <div className="flex flex-wrap gap-1.5">
                                {article.tags.map((tag: string) => (
                                  <span key={tag} className="sans text-xs px-2 py-0.5"
                                    style={{ background: "#f0f0f0", color: "#666", border: "1px solid #e2e2e2", borderRadius: "2px" }}>
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {!loading && !error && articles.length === 0 && !selected && (
        <div className="text-center py-16" style={{ color: "#999" }}>
          <div className="sans text-4xl mb-4 font-black" style={{ color: "#e2e2e2" }}>ET</div>
          <p className="sans text-sm font-semibold mb-1" style={{ color: "#444" }}>Select your profile above</p>
          <p className="sans text-xs" style={{ color: "#999" }}>AI will curate a personalised feed in seconds</p>
        </div>
      )}
    </div>
  );
}
