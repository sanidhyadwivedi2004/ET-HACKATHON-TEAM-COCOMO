import Link from "next/link";

const footerLinks = {
  "AI Features": [
    { label: "Live Feed", href: "/feed" },
    { label: "My ET — Personalized News", href: "/my-et" },
    { label: "News Navigator", href: "/navigator" },
    { label: "Story Arc Tracker", href: "/story-arc" },
    { label: "Vernacular Engine", href: "/vernacular" },
  ],
  "Economic Times": [
    { label: "About ET", href: "/about" },
    { label: "ET Markets", href: "#" },
    { label: "ET Tech", href: "#" },
    { label: "ET Startups", href: "#" },
    { label: "ET Now", href: "#" },
  ],
  "Legal": [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "Advertise with Us", href: "#" },
  ],
  "Support": [
    { label: "Help Centre", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Feedback", href: "#" },
    { label: "Sitemap", href: "#" },
    { label: "RSS Feeds", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: "#1a2744", color: "#ccc", marginTop: "48px" }}>
      {/* Red top border */}
      <div style={{ height: "3px", background: "#C8102E" }} />

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-5 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 flex items-center justify-center font-black text-white text-base rounded-sm"
                style={{ background: "#C8102E", fontFamily: "Georgia, serif" }}>
                ET
              </div>
              <div>
                <div className="font-bold text-white text-sm" style={{ fontFamily: "Georgia, serif" }}>
                  The Economic Times
                </div>
                <div className="sans text-xs tracking-widest" style={{ color: "#C8102E", fontSize: "8px", letterSpacing: "0.15em" }}>
                  AI NEWS EXPERIENCE
                </div>
              </div>
            </div>
            <p className="sans text-xs leading-relaxed" style={{ color: "#8899aa", maxWidth: "200px" }}>
              India&apos;s most trusted business news platform, now powered by artificial intelligence.
            </p>
            <div className="flex gap-3 mt-4">
              {["X", "LinkedIn", "YouTube"].map(s => (
                <a key={s} href="#"
                  className="sans text-xs px-2.5 py-1 rounded-sm transition-colors hover:bg-white/10"
                  style={{ border: "1px solid #334466", color: "#8899aa" }}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="sans font-bold text-white mb-4 text-xs tracking-widest uppercase"
                style={{ letterSpacing: "0.1em", fontSize: "10px" }}>
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href}
                      className="sans text-xs transition-colors hover:text-white"
                      style={{ color: "#8899aa" }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-10 pt-6" style={{ borderTop: "1px solid #2a3a5a" }}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="sans text-xs" style={{ color: "#556677" }}>
              © 2026 Bennett, Coleman & Co. Ltd. All rights reserved. | The Economic Times AI News Experience is a prototype built for demonstration purposes.
            </p>
            <div className="flex items-center gap-4">
              {[
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms", href: "/terms" },
                { label: "Disclaimer", href: "/disclaimer" },
              ].map(l => (
                <Link key={l.label} href={l.href}
                  className="sans text-xs transition-colors hover:text-white"
                  style={{ color: "#556677" }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
