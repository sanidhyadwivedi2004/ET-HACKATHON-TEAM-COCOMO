"use client";
import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="sans fixed bottom-6 right-6 z-50 flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95 shadow-md"
      style={{ background: "#C8102E", borderRadius: "3px" }}
    >
      <ChevronUp size={14} />
      TOP
    </button>
  );
}
