"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Rss, Brain, Compass, GitBranch, Languages, Video } from "lucide-react";

const nav = [
  { href: "/feed",         label: "Live Feed",    icon: Rss },
  { href: "/my-et",        label: "My ET",        icon: Brain },
  { href: "/navigator",    label: "Navigator",    icon: Compass },
  { href: "/story-arc",    label: "Story Arc",    icon: GitBranch },
  { href: "/vernacular",   label: "Vernacular",   icon: Languages },
  { href: "/video-studio", label: "Video Studio", icon: Video },
];

export default function Navbar() {
  const path = usePathname();
  return (
    <header style={{ background: "#fff", borderBottom: "1px solid #e2e2e2" }}>
      {/* Top bar */}
      <div style={{ background: "#C8102E" }}>
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-8">
          <span className="sans text-xs text-white font-bold tracking-widest" style={{ letterSpacing: "0.12em" }}>
            AI-POWERED NEWS EXPERIENCE
          </span>
          <span className="sans text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>
            Thursday, 26 March 2026 &nbsp;·&nbsp; 09:42 IST
          </span>
        </div>
      </div>

      {/* Logo bar */}
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="flex items-center justify-center w-10 h-10 rounded-sm font-black text-white text-lg select-none"
            style={{ background: "#C8102E", fontFamily: "Georgia, serif", letterSpacing: "-1px" }}>
            ET
          </div>
          <div>
            <div className="font-bold tracking-widest" style={{ fontFamily: "Georgia, serif", fontSize: "16px", color: "#1a2744", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              The Economic Times
            </div>
            <div className="sans text-xs font-semibold tracking-widest" style={{ color: "#C8102E", fontSize: "9px", letterSpacing: "0.15em" }}>
              AI NEWS EXPERIENCE
            </div>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = path === href || (href !== "/" && path.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className="sans flex items-center gap-1.5 px-3 py-2 text-xs font-semibold tracking-wide transition-all duration-150 relative"
                style={{
                  color: active ? "#C8102E" : "#444",
                  borderBottom: active ? "2px solid #C8102E" : "2px solid transparent",
                  letterSpacing: "0.04em",
                }}
              >
                <Icon size={12} />
                {label.toUpperCase()}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
