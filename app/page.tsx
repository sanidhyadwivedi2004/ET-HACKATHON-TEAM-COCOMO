"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Rss, Brain, Compass, GitBranch, Languages, ArrowRight, TrendingUp, TrendingDown, Users, Globe, BarChart2, ChevronRight, Video } from "lucide-react";

const TICKER = [
  { label: "SENSEX", value: "89,247.34", change: "+0.82%", up: true },
  { label: "NIFTY 50", value: "26,277.15", change: "+0.61%", up: true },
  { label: "NIFTY BANK", value: "55,432.80", change: "+1.12%", up: true },
  { label: "RELIANCE", value: "₹2,780.45", change: "+1.4%", up: true },
  { label: "TCS", value: "₹3,920.10", change: "-0.3%", up: false },
  { label: "HDFC BANK", value: "₹1,645.70", change: "+0.9%", up: true },
  { label: "INFOSYS", value: "₹1,820.55", change: "-0.5%", up: false },
  { label: "GOLD", value: "₹72,450/10g", change: "+0.4%", up: true },
  { label: "USD/INR", value: "₹82.45", change: "-0.1%", up: false },
  { label: "CRUDE OIL", value: "$87.20/bbl", change: "+1.2%", up: true },
  { label: "NIFTY IT", value: "38,120.40", change: "-0.7%", up: false },
  { label: "ADANI ENT", value: "₹2,940.00", change: "+2.1%", up: true },
];

const features = [
  { href: "/feed", icon: Rss, title: "Live Feed", tag: "Infinite Scroll", desc: "A never-ending stream of AI-curated business news. Filter by sector, save stories, and deep-dive into any topic — updated continuously.", stat: "Always fresh · Never repeats" },
  { href: "/my-et", icon: Brain, title: "My ET", tag: "Personalised Newsroom", desc: "Not a filtered feed — a fundamentally different news experience. A mutual fund investor, a startup founder, and a student each see a completely different ET.", stat: "8 curated stories per profile" },
  { href: "/navigator", icon: Compass, title: "News Navigator", tag: "Intelligence Briefings", desc: "Instead of reading 8 separate articles on the Union Budget, interact with one AI-powered deep briefing that synthesises all ET coverage. Ask follow-up questions.", stat: "Interactive Q&A · Data highlights" },
  { href: "/story-arc", icon: GitBranch, title: "Story Arc Tracker", tag: "Narrative Intelligence", desc: "Pick any ongoing business story — Adani, Paytm, EV revolution. AI builds a complete visual narrative: timeline, key players, sentiment shifts, and predictions.", stat: "Sentiment charts · Contrarian views" },
  { href: "/vernacular", icon: Languages, title: "Vernacular Engine", tag: "Cultural Adaptation", desc: "Real-time, context-aware adaptation of ET's English business news into Hindi, Tamil, Telugu, and Bengali — with local analogies, not literal translation.", stat: "4 Indian languages" },
];

const stats = [
  { value: "63M+", label: "Monthly Readers" },
  { value: "60+", label: "Years of Journalism" },
  { value: "500+", label: "Journalists Nationwide" },
  { value: "5", label: "AI-Powered Features" },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: "#fff", borderBottom: "1px solid #e2e2e2" }}>
        <div className="max-w-7xl mx-auto px-5 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="sans text-xs font-bold tracking-widest mb-4" style={{ color: "#C8102E", letterSpacing: "0.12em" }}>
                THE ECONOMIC TIMES · AI NEWS EXPERIENCE
              </div>
              <h1 className="et-headline mb-5" style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: "1.2", color: "#1a2744" }}>
                Business news that understands<br />
                <span style={{ color: "#C8102E" }}>who you are.</span>
              </h1>
              <p className="sans text-base leading-relaxed mb-8" style={{ color: "#555", maxWidth: "480px" }}>
                India&apos;s most trusted business newspaper, now powered by AI. Five features that transform how you consume, understand, and act on business news.
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <Link href="/feed"
                  className="sans inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: "#C8102E", borderRadius: "3px" }}>
                  <Rss size={14} /> Open Live Feed
                </Link>
                <Link href="/my-et"
                  className="sans inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all hover:opacity-80"
                  style={{ background: "#fff", border: "1px solid #C8102E", color: "#C8102E", borderRadius: "3px" }}>
                  My ET <ArrowRight size={14} />
                </Link>
              </div>

              {/* Marquee ticker */}
              <div className="mt-6 overflow-hidden" style={{ borderTop: "1px solid #e2e2e2", paddingTop: "16px" }}>
                <div className="sans text-xs font-bold mb-2 tracking-widest" style={{ color: "#999", letterSpacing: "0.1em" }}>LIVE MARKETS</div>
                <div className="overflow-hidden relative" style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}>
                  <div className="flex gap-6 animate-marquee whitespace-nowrap" style={{ animation: "marquee 30s linear infinite" }}>
                    {[...TICKER, ...TICKER].map((t, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 text-xs shrink-0">
                        <span className="font-bold" style={{ color: "#1a2744" }}>{t.label}</span>
                        <span style={{ color: "#444" }}>{t.value}</span>
                        <span className="font-semibold flex items-center gap-0.5" style={{ color: t.up ? "#1a7a3c" : "#C8102E" }}>
                          {t.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}{t.change}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats panel */}
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s, i) => (
                  <div key={i} className="p-6" style={{ background: i === 0 ? "#C8102E" : "#f8f8f8", border: "1px solid #e2e2e2", borderRadius: "3px" }}>
                    <div className="et-headline text-3xl mb-1" style={{ color: i === 0 ? "#fff" : "#1a2744" }}>{s.value}</div>
                    <div className="sans text-xs font-semibold tracking-wide" style={{ color: i === 0 ? "rgba(255,255,255,0.8)" : "#777", letterSpacing: "0.05em" }}>
                      {s.label.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-5 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="section-label mb-1">AI FEATURES</div>
            <h2 className="et-headline text-2xl" style={{ color: "#1a2744" }}>Five ways AI transforms your news experience</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div key={f.href} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 + 0.1 }}>
              <Link href={f.href} className="block group h-full">
                <div className="card card-hover h-full flex flex-col" style={{ borderRadius: "3px" }}>
                  <div style={{ height: "3px", background: "#C8102E", borderRadius: "3px 3px 0 0" }} />
                  <div className="p-6 flex flex-col gap-4 flex-1">
                    <div className="flex items-start justify-between">
                      <div className="w-9 h-9 flex items-center justify-center rounded-sm"
                        style={{ background: "#fef2f2", border: "1px solid #fecaca" }}>
                        <f.icon size={16} style={{ color: "#C8102E" }} />
                      </div>
                      <span className="badge" style={{ background: "#fef2f2", color: "#C8102E", border: "1px solid #fecaca" }}>
                        {f.tag}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="sans font-bold text-base mb-2" style={{ color: "#1a2744" }}>{f.title}</h3>
                      <p className="sans text-sm leading-relaxed" style={{ color: "#666", lineHeight: "1.7" }}>{f.desc}</p>
                    </div>
                    <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid #f0f0f0" }}>
                      <span className="sans text-xs" style={{ color: "#999" }}>{f.stat}</span>
                      <span className="sans flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2"
                        style={{ color: "#C8102E" }}>
                        Explore <ChevronRight size={12} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Video Studio — Coming Soon */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Link href="/video-studio" className="block group h-full">
              <div className="card card-hover h-full flex flex-col" style={{ borderRadius: "3px" }}>
                <div style={{ height: "3px", background: "#C8102E", borderRadius: "3px 3px 0 0" }} />
                <div className="p-6 flex flex-col gap-4 flex-1">
                  <div className="flex items-start justify-between">
                    <div className="w-9 h-9 flex items-center justify-center rounded-sm"
                      style={{ background: "#fef2f2", border: "1px solid #fecaca" }}>
                      <Video size={16} style={{ color: "#C8102E" }} />
                    </div>
                    <span className="badge" style={{ background: "#1a2744", color: "#fff" }}>
                      COMING SOON
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="sans font-bold text-base mb-2" style={{ color: "#1a2744" }}>AI Video Studio</h3>
                    <p className="sans text-sm leading-relaxed" style={{ color: "#666", lineHeight: "1.7" }}>
                      Automatically transform any ET article into a broadcast-quality 60–120 second video — AI-generated narration, animated data visuals, and contextual overlays. Ready for ET Now.
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid #f0f0f0" }}>
                    <span className="sans text-xs" style={{ color: "#999" }}>Launching Q3 2026</span>
                    <span className="sans flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2"
                      style={{ color: "#C8102E" }}>
                      Learn more <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ET Trust bar */}
      <section style={{ background: "#1a2744", borderTop: "3px solid #C8102E" }}>
        <div className="max-w-7xl mx-auto px-5 py-10">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <div className="sans text-xs font-bold tracking-widest mb-3" style={{ color: "#C8102E", letterSpacing: "0.12em" }}>
                TRUSTED BY INDIA&apos;S DECISION-MAKERS
              </div>
              <h3 className="et-headline text-xl mb-3" style={{ color: "#ffffff" }}>
                Six decades of business journalism, now supercharged with AI
              </h3>
              <p className="sans text-sm leading-relaxed" style={{ color: "#8899aa" }}>
                The Economic Times has been India&apos;s definitive source of business intelligence since 1961. Our AI features are built on this editorial foundation — combining machine speed with human expertise.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {[
                "AI-powered, editorially grounded",
                "DPDP Act 2023 compliant",
                "No hallucinations — demo data verified",
                "Built for Indian business context",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 sans text-sm" style={{ color: "#aabbcc" }}>
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#C8102E" }} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
