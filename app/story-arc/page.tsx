"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, Loader2, AlertTriangle, Eye, Users, AlertCircle, Newspaper } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, CartesianGrid } from "recharts";

const STORIES = ["Adani Group Controversy", "Paytm Banking Crisis", "India-China Trade Relations", "EV Revolution in India", "HDFC-HDFC Bank Merger"];

const PHASE: Record<string, { color: string; bg: string }> = {
  emerging:        { color: "#1a4fa0", bg: "#e8f0fe" },
  escalating:      { color: "#b45309", bg: "#fff8e1" },
  peak:            { color: "#C8102E", bg: "#fce8e8" },
  "de-escalating": { color: "#b45309", bg: "#fff8e1" },
  resolved:        { color: "#1a7a3c", bg: "#e8f5e9" },
  cyclical:        { color: "#6b21a8", bg: "#f3e8ff" },
};

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const score = payload[0]?.value;
  return (
    <div style={{ background: "#fff", border: "1px solid #e2e2e2", borderRadius: "3px", padding: "10px 14px", fontSize: "12px" }}>
      <div className="sans font-bold mb-1" style={{ color: "#1a2744" }}>{label}</div>
      <div className="sans" style={{ color: score > 0 ? "#1a7a3c" : score < 0 ? "#C8102E" : "#b45309" }}>
        {score > 0 ? "+" : ""}{score}
      </div>
    </div>
  );
}

export default function StoryArc() {
  const [storyInput, setStoryInput] = useState("");
  const [arc, setArc] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<"timeline" | "players" | "contrarian" | "watchnext">("timeline");

  async function loadArc(s: string) {
    const story = s.trim(); if (!story) return;
    setStoryInput(story); setLoading(true); setArc(null); setError(null); setView("timeline");
    try {
      const res = await fetch("/api/story-arc", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ story }) });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setArc(data.arc);
    } catch (e: any) { setError(e.message || "Failed to build story arc"); }
    setLoading(false);
  }

  const phase = arc ? (PHASE[arc.currentPhase] || PHASE.emerging) : null;
  const score = arc?.overallSentiment || 0;

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <div className="mb-8 pb-5" style={{ borderBottom: "3px solid #C8102E" }}>
        <div className="section-label mb-2">NARRATIVE INTELLIGENCE</div>
        <h1 className="et-headline text-3xl mb-2" style={{ color: "#1a2744" }}>Story Arc Tracker</h1>
        <p className="sans text-sm leading-relaxed" style={{ color: "#555" }}>
          Enter any ongoing business story. AI builds a complete visual narrative with timeline, key players, sentiment trajectory, contrarian perspectives, and forward-looking signals.
        </p>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e2e2e2", borderRadius: "3px", padding: "16px", marginBottom: "24px" }}>
        <div className="flex gap-3">
          <input value={storyInput} onChange={e => setStoryInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && loadArc(storyInput)}
            placeholder="Enter any ongoing business story or company..."
            className="sans flex-1 bg-transparent text-sm outline-none" style={{ color: "#1a1a1a" }} />
          <button onClick={() => loadArc(storyInput)} disabled={!storyInput.trim() || loading}
            className="sans flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-all disabled:opacity-40"
            style={{ background: "#C8102E", borderRadius: "3px" }}>
            {loading ? <Loader2 size={14} className="animate-spin" /> : <GitBranch size={14} />} Track
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3 pt-3" style={{ borderTop: "1px solid #f0f0f0" }}>
          {STORIES.map(s => (
            <button key={s} onClick={() => loadArc(s)}
              className="sans text-xs px-3 py-1.5 transition-all hover:border-red-300"
              style={{ background: "#f8f8f8", border: "1px solid #e2e2e2", color: "#555", borderRadius: "3px" }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div style={{ background: "#fff", border: "1px solid #e2e2e2", borderRadius: "3px", padding: "32px", textAlign: "center" }}>
          <div className="progress-bar mb-5 mx-auto w-48"><div className="progress-bar-fill" /></div>
          <p className="sans text-sm font-semibold" style={{ color: "#1a2744" }}>Building story arc</p>
          <p className="sans text-xs mt-1" style={{ color: "#777" }}>Analysing timeline, players, and sentiment...</p>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 p-4" style={{ background: "#fce8e8", border: "1px solid #fecaca", borderRadius: "3px" }}>
          <AlertCircle size={16} style={{ color: "#C8102E" }} />
          <span className="sans text-sm" style={{ color: "#991b1b" }}>{error}</span>
        </div>
      )}

      <AnimatePresence>
        {arc && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div style={{ background: "#fff", border: "1px solid #e2e2e2", borderTop: "3px solid #C8102E", borderRadius: "3px", padding: "24px" }}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <h2 className="et-headline text-xl mb-2" style={{ color: "#1a2744" }}>{arc.title}</h2>
                  <p className="sans text-sm leading-relaxed" style={{ color: "#555" }}>{arc.description}</p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  {phase && <span className="sans badge" style={{ background: phase.bg, color: phase.color }}>{arc.currentPhase?.toUpperCase()}</span>}
                  <div className="text-right">
                    <div className="sans text-xs" style={{ color: "#999" }}>Sentiment</div>
                    <div className="et-headline text-xl" style={{ color: score > 20 ? "#1a7a3c" : score < -20 ? "#C8102E" : "#b45309" }}>
                      {score > 0 ? "+" : ""}{score}
                    </div>
                  </div>
                </div>
              </div>
              {arc.affectedSectors && (
                <div className="flex flex-wrap gap-2 pt-3" style={{ borderTop: "1px solid #f0f0f0" }}>
                  <span className="sans text-xs font-semibold" style={{ color: "#999" }}>Sectors:</span>
                  {arc.affectedSectors.map((s: string, i: number) => (
                    <span key={i} className="sans badge" style={{ background: "#e8f5e9", color: "#1a7a3c" }}>{s}</span>
                  ))}
                </div>
              )}
              {arc.mediaAngle && (
                <div className="mt-3 p-3" style={{ background: "#f8f8f8", borderLeft: "3px solid #C8102E" }}>
                  <div className="sans flex items-center gap-1.5 mb-1">
                    <Newspaper size={12} style={{ color: "#C8102E" }} />
                    <span className="text-xs font-bold" style={{ color: "#C8102E" }}>What media is missing</span>
                  </div>
                  <p className="sans text-xs" style={{ color: "#555" }}>{arc.mediaAngle}</p>
                </div>
              )}
            </div>

            {arc.sentimentData && (
              <div style={{ background: "#fff", border: "1px solid #e2e2e2", borderRadius: "3px", padding: "20px" }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="sans font-bold text-sm" style={{ color: "#1a2744" }}>Sentiment Trajectory</span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={arc.sentimentData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                    <defs>
                      <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1a7a3c" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#1a7a3c" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="period" tick={{ fill: "#999", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[-100, 100]} tick={{ fill: "#999", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<ChartTooltip />} />
                    <ReferenceLine y={0} stroke="#e2e2e2" strokeDasharray="4 4" />
                    <Area type="monotone" dataKey="score" stroke="#1a7a3c" strokeWidth={2} fill="url(#sg)"
                      dot={(props: any) => {
                        const { cx, cy, payload } = props;
                        const c = payload.score > 0 ? "#1a7a3c" : payload.score < 0 ? "#C8102E" : "#b45309";
                        return <circle key={`d-${cx}-${cy}`} cx={cx} cy={cy} r={4} fill={c} stroke="#fff" strokeWidth={2} />;
                      }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}

            <div className="flex" style={{ background: "#f5f5f5", border: "1px solid #e2e2e2", borderRadius: "3px", padding: "4px", gap: "4px" }}>
              {[
                { id: "timeline", label: "Timeline", icon: GitBranch },
                { id: "players", label: "Key Players", icon: Users },
                { id: "contrarian", label: "Contrarian", icon: AlertTriangle },
                { id: "watchnext", label: "Watch Next", icon: Eye },
              ].map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => setView(id as any)}
                  className="sans flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold transition-all"
                  style={{ background: view === id ? "#fff" : "transparent", color: view === id ? "#C8102E" : "#666", border: view === id ? "1px solid #e2e2e2" : "1px solid transparent", borderRadius: "2px" }}>
                  <Icon size={12} /> {label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {view === "timeline" && arc.timeline && (
                <motion.div key="tl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ background: "#fff", border: "1px solid #e2e2e2", borderRadius: "3px", padding: "20px" }}>
                  {arc.timeline.map((t: any, i: number) => {
                    const dc = t.significance === "high" ? "#C8102E" : t.significance === "medium" ? "#b45309" : "#1a7a3c";
                    const sc = t.sentiment === "positive" ? "#1a7a3c" : t.sentiment === "negative" ? "#C8102E" : "#b45309";
                    return (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full mt-1.5 shrink-0" style={{ background: dc }} />
                          {i < arc.timeline.length - 1 && <div className="timeline-line" />}
                        </div>
                        <div className="pb-5 flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="sans text-xs font-bold" style={{ color: "#C8102E" }}>{t.date}</span>
                            <span className="sans badge" style={{ background: `${sc}18`, color: sc }}>{t.sentiment}</span>
                            <span className="sans badge" style={{ background: "#f5f5f5", color: "#777" }}>{t.significance}</span>
                          </div>
                          <div className="sans text-sm font-semibold mb-0.5" style={{ color: "#1a2744" }}>{t.event}</div>
                          {t.details && <div className="sans text-xs" style={{ color: "#777" }}>{t.details}</div>}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}

              {view === "players" && arc.keyPlayers && (
                <motion.div key="pl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                  {arc.keyPlayers.map((p: any, i: number) => {
                    const iw = p.influence === "high" ? "100%" : p.influence === "medium" ? "65%" : "35%";
                    const ic = p.influence === "high" ? "#C8102E" : p.influence === "medium" ? "#b45309" : "#1a7a3c";
                    return (
                      <div key={i} style={{ background: "#fff", border: "1px solid #e2e2e2", borderRadius: "3px", padding: "20px" }}>
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <div className="sans text-sm font-bold" style={{ color: "#1a2744" }}>{p.name}</div>
                            <div className="sans text-xs mt-0.5" style={{ color: "#777" }}>{p.role}</div>
                          </div>
                          <span className="sans badge shrink-0" style={{ background: `${ic}15`, color: ic }}>{p.influence} influence</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden mb-3" style={{ background: "#f0f0f0" }}>
                          <div className="h-full rounded-full" style={{ width: iw, background: ic }} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div><div className="sans text-xs font-semibold mb-1" style={{ color: "#999" }}>Position</div><div className="sans text-xs" style={{ color: "#555" }}>{p.stance}</div></div>
                          {p.recentAction && <div><div className="sans text-xs font-semibold mb-1" style={{ color: "#999" }}>Recent Action</div><div className="sans text-xs" style={{ color: "#555" }}>{p.recentAction}</div></div>}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}

              {view === "contrarian" && arc.contrarian && (
                <motion.div key="ct" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div style={{ background: "#fff", border: "1px solid #e2e2e2", borderLeft: "3px solid #b45309", padding: "24px" }}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="sans flex items-center gap-2">
                        <AlertTriangle size={16} style={{ color: "#b45309" }} />
                        <span className="font-bold text-sm" style={{ color: "#1a2744" }}>Contrarian Perspective</span>
                      </div>
                      <span className="sans badge" style={{ background: arc.contrarian.credibility === "high" ? "#fce8e8" : "#fff8e1", color: arc.contrarian.credibility === "high" ? "#C8102E" : "#b45309" }}>
                        {arc.contrarian.credibility} credibility
                      </span>
                    </div>
                    <h3 className="sans font-bold text-base mb-3" style={{ color: "#b45309" }}>{arc.contrarian.title}</h3>
                    <p className="sans text-sm leading-relaxed mb-5" style={{ color: "#444" }}>{arc.contrarian.argument}</p>
                    <div className="sans text-xs font-bold mb-3 uppercase tracking-wider" style={{ color: "#999" }}>Supporting Evidence</div>
                    <div className="space-y-2">
                      {arc.contrarian.evidence?.map((e: string, i: number) => (
                        <div key={i} className="flex items-start gap-3 p-3" style={{ background: "#fff8e1", borderRadius: "3px" }}>
                          <span className="sans text-xs font-black" style={{ color: "#b45309" }}>{i + 1}</span>
                          <span className="sans text-sm" style={{ color: "#555" }}>{e}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {view === "watchnext" && arc.watchNext && (
                <motion.div key="wn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid sm:grid-cols-2 gap-4">
                  {arc.watchNext.map((w: any, i: number) => {
                    const pc = w.probability === "high" ? "#C8102E" : w.probability === "medium" ? "#b45309" : "#1a7a3c";
                    return (
                      <div key={i} style={{ background: "#fff", border: "1px solid #e2e2e2", borderRadius: "3px", padding: "20px" }}>
                        <div className="flex items-center justify-between mb-3">
                          <span className="sans badge" style={{ background: `${pc}15`, color: pc }}>{w.probability} probability</span>
                          <span className="sans text-xs" style={{ color: "#999" }}>{w.timeframe}</span>
                        </div>
                        <div className="sans text-sm font-bold mb-2" style={{ color: "#1a2744" }}>{w.signal}</div>
                        {w.implication && <div className="sans text-xs leading-relaxed" style={{ color: "#666" }}><span style={{ color: pc }}>If this happens: </span>{w.implication}</div>}
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
