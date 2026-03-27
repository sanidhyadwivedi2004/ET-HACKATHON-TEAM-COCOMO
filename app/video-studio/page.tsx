"use client";
import { useState } from "react";
import { Video, Clock, Mic, BarChart2, Layers, Bell, CheckCircle, Sparkles, Film } from "lucide-react";
import { motion } from "framer-motion";

const capabilities = [
  { icon: Mic,      title: "AI Anchor Script",            desc: "Paste any ET article and AI writes a broadcast-ready anchor script — punchy, factual, and timed to the second." },
  { icon: BarChart2,title: "Animated Data Overlays",      desc: "Key numbers and market data are automatically formatted as broadcast-quality lower-thirds and full-screen graphics." },
  { icon: Layers,   title: "Segment-by-Segment Storyboard",desc: "Every 90-second video is broken into Hook → Context → Data → Analysis → CTA with visual treatment for each." },
  { icon: Film,     title: "B-Roll Suggestions",          desc: "AI suggests relevant b-roll footage, stock imagery, and contextual visuals for each segment of the script." },
  { icon: Sparkles, title: "Social Media Cuts",           desc: "Automatically generates 30-second Instagram Reels and 60-second YouTube Shorts from the same article." },
  { icon: Clock,    title: "30-Second Production",        desc: "From article to production-ready script in under 30 seconds. What takes a producer 2 hours, AI does instantly." },
];

const steps = [
  { step: "01", label: "Paste Article",  desc: "Drop any ET article URL or text" },
  { step: "02", label: "AI Produces",    desc: "Script, visuals, data overlays generated" },
  { step: "03", label: "Review & Edit",  desc: "Fine-tune narration and visuals" },
  { step: "04", label: "Export",         desc: "Production-ready package for ET Now" },
];

const sampleSegments = [
  { seg: "HOOK · 10s",     script: "India's biggest company just posted its highest-ever quarterly profit — and the number will surprise you.", visual: "Animated counter: ₹21,243 Cr" },
  { seg: "CONTEXT · 20s",  script: "Reliance Industries reported revenue of ₹2.6 lakh crore for Q4 FY26, a 14% jump from last year...", visual: "Split screen: Jio tower + Retail store" },
  { seg: "DATA · 20s",     script: "Let's break down where the money came from. Oil-to-chemicals: 42%. Jio: 28%. Retail: 22%...", visual: "Animated pie chart building live" },
  { seg: "ANALYSIS · 25s", script: "What does this mean for investors? Analysts at Morgan Stanley have a target of ₹3,200...", visual: "Stock chart vs Nifty benchmark" },
  { seg: "CTA · 15s",      script: "For the full analysis, head to ET Markets. I'm Priya Sharma, and this is ET Now.", visual: "ET Now logo + QR code overlay" },
];

export default function VideoStudio() {
  const [email, setEmail] = useState("");
  const [notified, setNotified] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">

      {/* Page header */}
      <div className="mb-10 pb-6" style={{ borderBottom: "3px solid #C8102E" }}>
        <div className="section-label mb-2">BROADCAST PRODUCTION</div>
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <h1 className="et-headline text-3xl mb-3" style={{ color: "#1a2744" }}>AI Video Studio</h1>
            <p className="sans text-base leading-relaxed" style={{ color: "#555", maxWidth: "560px" }}>
              Automatically transform any ET article into a broadcast-quality 60–120 second video — AI-generated narration, animated data visuals, and contextual overlays. Built for ET Now.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2 px-4 py-2"
            style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "3px" }}>
            <Clock size={13} style={{ color: "#C8102E" }} />
            <span className="sans text-xs font-bold" style={{ color: "#C8102E" }}>LAUNCHING Q3 2026</span>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="mb-10">
        <div className="section-label mb-4">HOW IT WORKS</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              style={{ background: "#fff", border: "1px solid #e2e2e2", borderTop: "3px solid #C8102E", borderRadius: "3px", padding: "20px" }}>
              <div className="sans text-lg font-black mb-3" style={{ color: "#C8102E" }}>{s.step}</div>
              <div className="sans text-sm font-bold mb-1" style={{ color: "#1a2744" }}>{s.label}</div>
              <div className="sans text-xs leading-relaxed" style={{ color: "#777" }}>{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Capabilities */}
      <div className="mb-10">
        <div className="section-label mb-4">WHAT IT WILL DO</div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 + 0.2 }}
              style={{ background: "#fff", border: "1px solid #e2e2e2", borderTop: "3px solid #C8102E", borderRadius: "3px", padding: "20px" }}>
              <div className="w-8 h-8 flex items-center justify-center mb-3"
                style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "3px" }}>
                <c.icon size={15} style={{ color: "#C8102E" }} />
              </div>
              <h3 className="sans font-bold text-sm mb-2" style={{ color: "#1a2744" }}>{c.title}</h3>
              <p className="sans text-xs leading-relaxed" style={{ color: "#666", lineHeight: "1.7" }}>{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sample output */}
      <div className="mb-10" style={{ background: "#fff", border: "1px solid #e2e2e2", borderRadius: "3px", overflow: "hidden" }}>
        <div className="px-6 py-4" style={{ borderBottom: "1px solid #f0f0f0", background: "#fafafa" }}>
          <div className="section-label mb-1">SAMPLE OUTPUT PREVIEW</div>
          <div className="sans text-sm font-semibold" style={{ color: "#1a2744" }}>
            Article: &ldquo;Reliance Q4 FY26: Record ₹21,243 Cr Profit, Jio Crosses 200M 5G Users&rdquo;
          </div>
        </div>
        <div className="divide-y" style={{ borderColor: "#f0f0f0" }}>
          {sampleSegments.map((row, i) => (
            <div key={i} className="flex gap-4 px-6 py-4">
              <span className="sans text-xs font-black shrink-0 w-28 pt-0.5" style={{ color: "#C8102E" }}>{row.seg}</span>
              <div className="flex-1">
                <div className="sans text-sm mb-1.5" style={{ color: "#333" }}>&ldquo;{row.script}&rdquo;</div>
                <div className="sans text-xs" style={{ color: "#999" }}>Visual: {row.visual}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notify me */}
      <div style={{ background: "#fff", border: "1px solid #e2e2e2", borderTop: "3px solid #C8102E", borderRadius: "3px", padding: "32px", textAlign: "center" }}>
        <div className="w-10 h-10 mx-auto mb-4 flex items-center justify-center"
          style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "3px" }}>
          <Video size={20} style={{ color: "#C8102E" }} />
        </div>
        <h3 className="et-headline text-xl mb-2" style={{ color: "#1a2744" }}>Be the first to know when it launches</h3>
        <p className="sans text-sm mb-6" style={{ color: "#777" }}>
          Launching Q3 2026. Leave your email and we&apos;ll notify you the moment AI Video Studio goes live.
        </p>
        {notified ? (
          <div className="sans inline-flex items-center gap-2 text-sm font-semibold px-5 py-3"
            style={{ background: "#e8f5e9", color: "#1a7a3c", borderRadius: "3px" }}>
            <CheckCircle size={16} /> You&apos;re on the list. We&apos;ll notify you at launch.
          </div>
        ) : (
          <div className="flex gap-3 max-w-sm mx-auto">
            <input value={email} onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && email.includes("@") && setNotified(true)}
              placeholder="your@email.com"
              className="sans flex-1 input-base px-4 py-2.5 text-sm" />
            <button onClick={() => email.includes("@") && setNotified(true)}
              className="sans flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "#C8102E", borderRadius: "3px" }}>
              <Bell size={14} /> Notify Me
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
