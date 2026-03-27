content = '''"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Languages, Loader2, BookOpen, MapPin, AlertCircle, ArrowLeftRight, Star } from "lucide-react";

const LANGUAGES = [
  { code: "hi", name: "Hindi",   native: "हिंदी",   region: "North India · UP · Bihar · Delhi NCR" },
  { code: "ta", name: "Tamil",   native: "தமிழ்",   region: "Tamil Nadu · Chennai" },
  { code: "te", name: "Telugu",  native: "తెలుగు",  region: "Andhra Pradesh · Telangana · Hyderabad" },
  { code: "bn", name: "Bengali", native: "বাংলা",   region: "West Bengal · Kolkata" },
];

const SAMPLES = [
  { label: "RBI Rate Decision", text: "The Reserve Bank of India has kept the repo rate unchanged at 6.5% for the eighth consecutive time, citing persistent food inflation and global uncertainty. The Monetary Policy Committee voted 4-2 in favor of the decision. Governor Shaktikanta Das signaled that rate cuts could begin in Q2 FY2027 if inflation sustainably falls below 4.5%. The decision disappointed equity markets, with Nifty falling 0.8% intraday." },
  { label: "India GDP Growth", text: "India GDP growth rate for Q3 FY2026 came in at 7.2%, beating analyst estimates of 6.8% and cementing India position as the world fastest-growing major economy. The strong performance was driven by robust manufacturing output under the PLI scheme, a 23% surge in services exports, and record GST collections of Rs2.1 lakh crore. However, rural consumption remains a concern, with FMCG companies reporting volume growth of only 3-4% in rural markets." },
  { label: "Startup Funding", text: "India startup ecosystem raised $8.2 billion in Q1 2026, a 34% jump from Q1 2025. Fintech led with $2.1 billion across 89 deals. However, the funding is increasingly concentrated - the top 10 deals accounted for 67% of total capital. Early-stage funding has dried up, with seed-stage deals falling 40% YoY. Investors are demanding profitability metrics even at Series A." },
];

const LEVEL: Record<string, { color: string; bg: string; label: string }> = {
  basic:        { color: "#1a7a3c", bg: "#e8f5e9", label: "Easy Read" },
  intermediate: { color: "#b45309", bg: "#fff8e1", label: "Moderate" },
  advanced:     { color: "#C8102E", bg: "#fce8e8", label: "Advanced" },
};

export default function Vernacular() {
  const [article, setArticle] = useState("");
  const [language, setLanguage] = useState("hi");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showOriginal, setShowOriginal] = useState(false);

  async function translate() {
    if (!article.trim()) return;
    setLoading(true); setResult(null); setError(null); setShowOriginal(false);
    try {
      const res = await fetch("/api/vernacular", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ article, language }) });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data.result);
    } catch (e: any) { setError(e.message || "Translation failed"); }
    setLoading(false);
  }

  const lang = LANGUAGES.find(l => l.code === language)!;
  const levelConf = result ? (LEVEL[result.readingLevel] || LEVEL.intermediate) : null;

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      <div className="mb-8 pb-5" style={{ borderBottom: "3px solid #C8102E" }}>
        <div className="section-label mb-2">CULTURAL ADAPTATION</div>
        <h1 className="et-headline text-3xl mb-2" style={{ color: "#1a2744" }}>Vernacular Engine</h1>
        <p className="sans text-sm leading-relaxed" style={{ color: "#555" }}>
          Business news adapted for regional audiences — with local analogies, cultural context, and simplified jargon. Not literal translation.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {LANGUAGES.map(l => {
          const active = language === l.code;
          return (
            <button key={l.code} onClick={() => setLanguage(l.code)}
              className="text-left p-4 transition-all hover:shadow-sm"
              style={{ background: active ? "#fef2f2" : "#fff", border: `1px solid ${active ? "#C8102E" : "#e2e2e2"}`, borderTop: active ? "3px solid #C8102E" : "3px solid transparent", borderRadius: "3px" }}>
              <div className="flex items-center justify-between mb-2">
                <span className="sans text-xs font-black px-2 py-0.5 rounded-sm" style={{ background: active ? "#C8102E" : "#f0f0f0", color: active ? "#fff" : "#555" }}>IN</span>
                {active && <Star size={12} style={{ color: "#C8102E" }} />}
              </div>
              <div className="sans text-sm font-bold" style={{ color: "#1a2744" }}>{l.name}</div>
              <div className="font-bold text-base" style={{ color: active ? "#C8102E" : "#777", fontFamily: "system-ui, sans-serif" }}>{l.native}</div>
              <div className="sans text-xs mt-1" style={{ color: "#999" }}>{l.region}</div>
            </button>
          );
        })}
      </div>

      <div style={{ background: "#fff", border: "1px solid #e2e2e2", borderRadius: "3px", padding: "20px", marginBottom: "24px" }}>
        <div className="flex items-center justify-between mb-3">
          <span className="sans text-xs font-semibold" style={{ color: "#777" }}>English Article</span>
          <span className="sans text-xs" style={{ color: "#bbb" }}>{article.length} chars</span>
        </div>
        <textarea value={article} onChange={e => setArticle(e.target.value)}
          placeholder="Paste any English business news article here..."
          rows={5} className="sans w-full bg-transparent text-sm outline-none resize-none leading-relaxed" style={{ color: "#1a1a1a" }} />
        <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: "1px solid #f0f0f0" }}>
          <div className="flex gap-2 flex-wrap">
            {SAMPLES.map(s => (
              <button key={s.label} onClick={() => setArticle(s.text)}
                className="sans text-xs px-3 py-1.5 transition-all hover:border-red-300"
                style={{ background: "#f8f8f8", border: "1px solid #e2e2e2", color: "#555", borderRadius: "3px" }}>
                {s.label}
              </button>
            ))}
          </div>
          <button onClick={translate} disabled={!article.trim() || loading}
            className="sans flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-all disabled:opacity-40"
            style={{ background: "#C8102E", borderRadius: "3px" }}>
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Languages size={14} />}
            Adapt to {lang.name}
          </button>
        </div>
      </div>

      {loading && (
        <div style={{ background: "#fff", border: "1px solid #e2e2e2", borderRadius: "3px", padding: "32px", textAlign: "center" }}>
          <div className="progress-bar mb-5 mx-auto w-48"><div className="progress-bar-fill" /></div>
          <p className="sans text-sm font-semibold" style={{ color: "#1a2744" }}>Culturally adapting for {lang.name} audience</p>
          <p className="sans text-xs mt-1" style={{ color: "#777" }}>Adding local context, analogies, and regional relevance...</p>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 p-4" style={{ background: "#fce8e8", border: "1px solid #fecaca", borderRadius: "3px" }}>
          <AlertCircle size={16} style={{ color: "#C8102E" }} />
          <span className="sans text-sm" style={{ color: "#991b1b" }}>{error}</span>
        </div>
      )}

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div style={{ background: "#fff", border: "1px solid #e2e2e2", borderTop: "3px solid #C8102E", borderRadius: "3px", overflow: "hidden" }}>
              <div className="flex items-center justify-between p-5" style={{ borderBottom: "1px solid #f0f0f0" }}>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="sans text-xs font-semibold" style={{ color: "#777" }}>{lang.name} · {lang.region}</div>
                    {levelConf && <span className="sans badge mt-1" style={{ background: levelConf.bg, color: levelConf.color }}>{levelConf.label}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {result.audienceRelevanceScore && (
                    <div className="text-right">
                      <div className="sans text-xs" style={{ color: "#999" }}>Relevance</div>
                      <div className="et-headline text-lg" style={{ color: "#C8102E" }}>{result.audienceRelevanceScore}%</div>
                    </div>
                  )}
                  <button onClick={() => setShowOriginal(!showOriginal)}
                    className="sans flex items-center gap-1.5 text-xs px-3 py-1.5 transition-all hover:border-gray-400"
                    style={{ background: "#f8f8f8", border: "1px solid #e2e2e2", color: "#555", borderRadius: "3px" }}>
                    <ArrowLeftRight size={11} /> {showOriginal ? "Adapted" : "Original"}
                  </button>
                </div>
              </div>
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {showOriginal ? (
                    <motion.div key="orig" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="sans text-xs font-bold mb-3 uppercase tracking-wider" style={{ color: "#999" }}>Original English</div>
                      <p className="sans text-sm leading-relaxed" style={{ color: "#555" }}>{article}</p>
                    </motion.div>
                  ) : (
                    <motion.div key="trans" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h2 className="et-headline text-lg mb-4" style={{ color: "#1a2744" }}>{result.translatedTitle}</h2>
                      <p className="text-base leading-loose" style={{ color: "#333", fontFamily: "system-ui, sans-serif", lineHeight: "2" }}>{result.translatedContent}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {result.localAngle && (
              <div style={{ background: "#fff", border: "1px solid #e2e2e2", borderLeft: "3px solid #C8102E", padding: "20px" }}>
                <div className="sans flex items-center gap-2 mb-3">
                  <MapPin size={14} style={{ color: "#C8102E" }} />
                  <span className="font-bold text-sm" style={{ color: "#1a2744" }}>Local Angle</span>
                  <span className="text-xs" style={{ color: "#999" }}>— {lang.region}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#444", fontFamily: "system-ui, sans-serif" }}>{result.localAngle}</p>
                {result.localCompaniesAffected?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3 pt-3" style={{ borderTop: "1px solid #f0f0f0" }}>
                    <span className="sans text-xs font-semibold" style={{ color: "#999" }}>Local impact:</span>
                    {result.localCompaniesAffected.map((c: string, i: number) => (
                      <span key={i} className="sans badge" style={{ background: "#fce8e8", color: "#C8102E" }}>{c}</span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {result.keyTermsGlossary && (
              <div style={{ background: "#fff", border: "1px solid #e2e2e2", borderRadius: "3px", padding: "20px" }}>
                <div className="sans flex items-center gap-2 mb-4">
                  <BookOpen size={14} style={{ color: "#C8102E" }} />
                  <span className="font-bold text-sm" style={{ color: "#1a2744" }}>Financial Terms Glossary</span>
                  <span className="text-xs" style={{ color: "#999" }}>with local analogies</span>
                </div>
                <div className="space-y-3">
                  {result.keyTermsGlossary.map((term: any, i: number) => (
                    <div key={i} className="flex gap-4 p-4" style={{ background: "#f8f8f8", borderRadius: "3px" }}>
                      <div className="shrink-0 w-32">
                        <div className="sans text-sm font-bold" style={{ color: "#1a2744" }}>{term.englishTerm}</div>
                        <div className="text-sm font-bold mt-0.5" style={{ color: "#C8102E", fontFamily: "system-ui, sans-serif" }}>{term.localTerm}</div>
                      </div>
                      <div className="flex-1 text-sm leading-relaxed" style={{ color: "#555", fontFamily: "system-ui, sans-serif" }}>{term.simpleExplanation}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
'''

with open("app/vernacular/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("vernacular written:", len(content), "chars")
