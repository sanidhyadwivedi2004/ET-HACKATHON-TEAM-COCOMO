"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, TrendingUp, TrendingDown, Minus, MessageSquare, AlertCircle, ChevronRight, Layers, Users, Clock } from "lucide-react";

const TOPICS = [
  "Union Budget 2026 Impact on Markets",
  "RBI Rate Cut Cycle",
  "Adani Group Controversy",
  "India AI Regulation",
  "Startup Funding Trends 2026",
];

const SENTIMENT: Record<string, { label: string; color: string; bg: string }> = {
  bullish:   { label: "Bullish",   color: "#1a7a3c", bg: "#e8f5e9" },
  bearish:   { label: "Bearish",   color: "#C8102E", bg: "#fce8e8" },
  mixed:     { label: "Mixed",     color: "#b45309", bg: "#fff8e1" },
  uncertain: { label: "Uncertain", color: "#555",    bg: "#f5f5f5" },
};

const IMPACT: Record<string, { color: string; bg: string }> = {
  critical: { color: "#C8102E", bg: "#fce8e8" },
  high:     { color: "#b45309", bg: "#fff8e1" },
  medium:   { color: "#1a4fa0", bg: "#e8f0fe" },
  low:      { color: "#1a7a3c", bg: "#e8f5e9" },
};

function Skeleton() {
  return (
    <div className="space-y-4">
      <div style={{ background: "#fff", border: "1px solid #e2e2e2", borderRadius: "3px", padding: "24px" }} className="space-y-3">
        <div className="skeleton h-6 w-3/4" /><div className="skeleton h-4 w-full" /><div className="skeleton h-4 w-5/6" />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #e2e2e2", borderRadius: "3px", padding: "16px" }} className="space-y-2">
            <div className="skeleton h-3 w-16" /><div className="skeleton h-7 w-20" /><div className="skeleton h-3 w-12" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Navigator() {
  const [topicInput, setTopicInput] = useState("");
  const [activeTopic, setActiveTopic] = useState("");
  const [briefing, setBriefing] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [qaLoading, setQaLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ q: string; a: string }[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "timeline" | "stakeholders" | "qa">("overview");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatHistory]);

  async function loadBriefing(t: string) {
    const topic = t.trim(); if (!topic) return;
    setActiveTopic(topic); setTopicInput(topic); setLoading(true);
    setBriefing(null); setError(null); setChatHistory([]); setActiveTab("overview");
    try {
      const res = await fetch("/api/news-navigator", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ topic }) });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setBriefing(data.briefing);
    } catch (e: any) { setError(e.message || "Failed to generate briefing"); }
    setLoading(false);
  }

  async function askQuestion() {
    if (!question.trim() || !activeTopic) return;
    const q = question.trim(); setQuestion(""); setQaLoading(true); setActiveTab("qa");
    try {
      const res = await fetch("/api/news-navigator", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ topic: activeTopic, question: q, briefingContext: briefing?.executiveSummary }) });
      const data = await res.json();
      setChatHistory(prev => [...prev, { q, a: data.answer || "No answer received." }]);
    } catch { setChatHistory(prev => [...prev, { q, a: "Failed to get answer. Please try again." }]); }
    setQaLoading(false);
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: Layers },
    { id: "timeline", label: "Timeline", icon: Clock },
    { id: "stakeholders", label: "Stakeholders", icon: Users },
    { id: "qa", label: `Q&A${chatHistory.length > 0 ? ` (${chatHistory.length})` : ""}`, icon: MessageSquare },
  ] as const;

  const S = (style: React.CSSProperties) => style;

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      {/* Header */}
      <div className="mb-8 pb-5" style={{ borderBottom: "3px solid #C8102E" }}>
        <div className="section-label mb-2">INTELLIGENCE BRIEFINGS</div>
        <h1 className="et-headline text-3xl mb-2" style={{ color: "#1a2744" }}>News Navigator</h1>
        <p className="sans text-sm leading-relaxed" style={{ color: "#555" }}>
          Enter any business topic. AI synthesises a comprehensive briefing — then ask follow-up questions like you&apos;re talking to a senior analyst.
        </p>
      </div>

      {/* Search */}
      <div style={{ background: "#fff", border: "1px solid #e2e2e2", borderRadius: "3px", padding: "16px", marginBottom: "24px" }}>
        <div className="flex gap-3">
          <input value={topicInput} onChange={e => setTopicInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && loadBriefing(topicInput)}
            placeholder="Enter any business topic, company, or policy..."
            className="sans flex-1 bg-transparent text-sm outline-none" style={{ color: "#1a1a1a" }} />
          <button onClick={() => loadBriefing(topicInput)} disabled={!topicInput.trim() || loading}
            className="sans flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-all disabled:opacity-40"
            style={{ background: "#C8102E", borderRadius: "3px" }}>
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />} Briefing
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3 pt-3" style={{ borderTop: "1px solid #f0f0f0" }}>
          {TOPICS.map(t => (
            <button key={t} onClick={() => loadBriefing(t)}
              className="sans text-xs px-3 py-1.5 transition-all hover:border-red-300"
              style={{ background: "#f8f8f8", border: "1px solid #e2e2e2", color: "#555", borderRadius: "3px" }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {loading && <Skeleton />}

      {error && (
        <div className="flex items-center gap-3 p-4" style={{ background: "#fce8e8", border: "1px solid #fecaca", borderRadius: "3px" }}>
          <AlertCircle size={16} style={{ color: "#C8102E" }} />
          <span className="sans text-sm" style={{ color: "#991b1b" }}>{error}</span>
        </div>
      )}

      <AnimatePresence>
        {briefing && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {/* Hero */}
            <div style={{ background: "#fff", border: "1px solid #e2e2e2", borderTop: "3px solid #C8102E", borderRadius: "3px", padding: "24px" }}>
              <div className="flex items-start justify-between gap-4 mb-4">
                <h2 className="et-headline text-xl flex-1" style={{ color: "#1a2744" }}>{briefing.headline}</h2>
                <div className="flex gap-2 shrink-0 flex-wrap justify-end">
                  {briefing.sentiment && SENTIMENT[briefing.sentiment] && (
                    <span className="sans badge" style={{ background: SENTIMENT[briefing.sentiment].bg, color: SENTIMENT[briefing.sentiment].color }}>
                      {SENTIMENT[briefing.sentiment].label}
                    </span>
                  )}
                  {briefing.impactLevel && IMPACT[briefing.impactLevel] && (
                    <span className="sans badge" style={{ background: IMPACT[briefing.impactLevel].bg, color: IMPACT[briefing.impactLevel].color }}>
                      {briefing.impactLevel.toUpperCase()} IMPACT
                    </span>
                  )}
                </div>
              </div>
              <p className="sans text-sm leading-relaxed" style={{ color: "#444", lineHeight: "1.8" }}>{briefing.executiveSummary}</p>
              {briefing.marketImplications && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4" style={{ borderTop: "1px solid #f0f0f0" }}>
                  <span className="sans text-xs font-semibold" style={{ color: "#999" }}>Affected sectors:</span>
                  {briefing.marketImplications.map((m: string, i: number) => (
                    <span key={i} className="sans badge" style={{ background: "#e8f0fe", color: "#1a4fa0" }}>{m}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Data highlights */}
            {briefing.dataHighlights && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {briefing.dataHighlights.map((d: any, i: number) => (
                  <div key={i} style={{ background: "#fff", border: "1px solid #e2e2e2", borderRadius: "3px", padding: "16px" }}>
                    <div className="sans text-xs mb-1 truncate" style={{ color: "#999" }}>{d.metric}</div>
                    <div className="et-headline text-xl mb-1" style={{ color: "#1a2744" }}>{d.value}</div>
                    <div className="sans flex items-center gap-1 text-xs">
                      {d.trend === "up" ? <TrendingUp size={11} style={{ color: "#1a7a3c" }} /> : d.trend === "down" ? <TrendingDown size={11} style={{ color: "#C8102E" }} /> : <Minus size={11} style={{ color: "#b45309" }} />}
                      <span style={{ color: d.trend === "up" ? "#1a7a3c" : d.trend === "down" ? "#C8102E" : "#b45309" }}>{d.change}</span>
                    </div>
                    {d.context && <div className="sans text-xs mt-1" style={{ color: "#bbb" }}>{d.context}</div>}
                  </div>
                ))}
              </div>
            )}

            {/* Tabs */}
            <div className="flex" style={{ background: "#f5f5f5", border: "1px solid #e2e2e2", borderRadius: "3px", padding: "4px", gap: "4px" }}>
              {tabs.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => setActiveTab(id as any)}
                  className="sans flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold transition-all"
                  style={{
                    background: activeTab === id ? "#fff" : "transparent",
                    color: activeTab === id ? "#C8102E" : "#666",
                    border: activeTab === id ? "1px solid #e2e2e2" : "1px solid transparent",
                    borderRadius: "2px",
                  }}>
                  <Icon size={12} /> {label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "overview" && briefing.keyPoints && (
                <motion.div key="ov" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                  {briefing.keyPoints.map((kp: any, i: number) => (
                    <div key={i} style={{ background: "#fff", border: "1px solid #e2e2e2", borderRadius: "3px", padding: "16px" }} className="flex gap-4">
                      <div className="sans w-6 h-6 flex items-center justify-center shrink-0 text-xs font-black text-white"
                        style={{ background: "#C8102E", borderRadius: "2px" }}>{i + 1}</div>
                      <div className="flex-1">
                        <div className="sans text-sm font-bold mb-1" style={{ color: "#1a2744" }}>{kp.point}</div>
                        <div className="sans text-xs leading-relaxed" style={{ color: "#666" }}>{kp.detail}</div>
                      </div>
                      <span className="sans badge shrink-0" style={{
                        background: kp.significance === "high" ? "#fce8e8" : kp.significance === "medium" ? "#fff8e1" : "#e8f5e9",
                        color: kp.significance === "high" ? "#C8102E" : kp.significance === "medium" ? "#b45309" : "#1a7a3c",
                      }}>{kp.significance}</span>
                    </div>
                  ))}
                  {briefing.riskFactors && (
                    <div style={{ background: "#fce8e8", border: "1px solid #fecaca", borderRadius: "3px", padding: "16px" }}>
                      <div className="sans flex items-center gap-2 mb-3">
                        <AlertCircle size={14} style={{ color: "#C8102E" }} />
                        <span className="font-bold text-sm" style={{ color: "#991b1b" }}>Risk Factors</span>
                      </div>
                      {briefing.riskFactors.map((r: string, i: number) => (
                        <div key={i} className="sans flex items-start gap-2 text-xs mb-1.5" style={{ color: "#666" }}>
                          <span style={{ color: "#C8102E" }}>•</span> {r}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "timeline" && briefing.timeline && (
                <motion.div key="tl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ background: "#fff", border: "1px solid #e2e2e2", borderRadius: "3px", padding: "20px" }}>
                  {briefing.timeline.map((t: any, i: number) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full mt-1.5 shrink-0"
                          style={{ background: t.impact === "high" ? "#C8102E" : t.impact === "medium" ? "#b45309" : "#1a7a3c" }} />
                        {i < briefing.timeline.length - 1 && <div className="timeline-line" />}
                      </div>
                      <div className="pb-5 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="sans text-xs font-bold" style={{ color: "#C8102E" }}>{t.date}</span>
                          <span className="sans badge" style={{
                            background: t.sentiment === "positive" ? "#e8f5e9" : t.sentiment === "negative" ? "#fce8e8" : "#fff8e1",
                            color: t.sentiment === "positive" ? "#1a7a3c" : t.sentiment === "negative" ? "#C8102E" : "#b45309",
                          }}>{t.sentiment}</span>
                        </div>
                        <div className="sans text-sm font-semibold" style={{ color: "#1a2744" }}>{t.event}</div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === "stakeholders" && briefing.stakeholders && (
                <motion.div key="st" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid sm:grid-cols-2 gap-3">
                  {briefing.stakeholders.map((s: any, i: number) => (
                    <div key={i} style={{ background: "#fff", border: "1px solid #e2e2e2", borderRadius: "3px", padding: "16px" }}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="sans text-sm font-bold" style={{ color: "#1a2744" }}>{s.name}</div>
                          <div className="sans text-xs" style={{ color: "#777" }}>{s.role}</div>
                        </div>
                        <span className="sans badge" style={{
                          background: s.influence === "high" ? "#fce8e8" : "#f5f5f5",
                          color: s.influence === "high" ? "#C8102E" : "#666",
                        }}>{s.influence}</span>
                      </div>
                      <p className="sans text-xs leading-relaxed" style={{ color: "#555" }}>{s.position}</p>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === "qa" && (
                <motion.div key="qa" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ background: "#fff", border: "1px solid #e2e2e2", borderRadius: "3px", padding: "20px" }}>
                  {briefing.suggestedQuestions && chatHistory.length === 0 && (
                    <div className="mb-5">
                      <p className="sans text-xs font-bold mb-3 uppercase tracking-wider" style={{ color: "#999" }}>Suggested questions</p>
                      <div className="space-y-2">
                        {briefing.suggestedQuestions.map((q: string, i: number) => (
                          <button key={i} onClick={() => setQuestion(q)}
                            className="sans w-full text-left flex items-center gap-2 p-3 text-xs transition-all hover:border-red-300"
                            style={{ background: "#f8f8f8", border: "1px solid #e2e2e2", color: "#444", borderRadius: "3px" }}>
                            <ChevronRight size={12} style={{ color: "#C8102E", flexShrink: 0 }} />{q}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {chatHistory.length > 0 && (
                    <div className="space-y-4 mb-5 max-h-96 overflow-y-auto">
                      {chatHistory.map((item, i) => (
                        <div key={i} className="space-y-3">
                          <div className="flex justify-end">
                            <div className="sans max-w-[80%] px-4 py-2.5 text-sm" style={{ background: "#fce8e8", color: "#991b1b", borderRadius: "3px" }}>{item.q}</div>
                          </div>
                          <div className="flex justify-start">
                            <div className="sans max-w-[90%] px-4 py-3 text-sm leading-relaxed" style={{ background: "#f8f8f8", color: "#444", border: "1px solid #e2e2e2", borderRadius: "3px" }}>{item.a}</div>
                          </div>
                        </div>
                      ))}
                      {qaLoading && (
                        <div className="flex justify-start">
                          <div className="px-4 py-3" style={{ background: "#f8f8f8", border: "1px solid #e2e2e2", borderRadius: "3px" }}>
                            <div className="flex gap-1">{[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "#C8102E", animationDelay: `${i*0.15}s` }} />)}</div>
                          </div>
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input value={question} onChange={e => setQuestion(e.target.value)} onKeyDown={e => e.key === "Enter" && askQuestion()}
                      placeholder="Ask anything about this topic..."
                      className="sans flex-1 input-base px-4 py-2.5 text-sm" />
                    <button onClick={askQuestion} disabled={!question.trim() || qaLoading}
                      className="px-4 py-2 text-white transition-all disabled:opacity-40"
                      style={{ background: "#C8102E", borderRadius: "3px" }}>
                      {qaLoading ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
