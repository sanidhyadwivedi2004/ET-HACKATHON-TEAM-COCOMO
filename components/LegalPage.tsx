interface Section { heading: string; body: string; }

export default function LegalPage({ title, subtitle, sections }: { title: string; subtitle: string; sections: Section[] }) {
  return (
    <div className="max-w-4xl mx-auto px-5 py-12">
      {/* Header */}
      <div className="mb-8 pb-6" style={{ borderBottom: "3px solid #C8102E" }}>
        <div className="sans text-xs font-bold tracking-widest mb-2" style={{ color: "#C8102E", letterSpacing: "0.12em" }}>
          LEGAL
        </div>
        <h1 className="et-headline text-3xl mb-2">{title}</h1>
        <p className="sans text-sm" style={{ color: "#777" }}>{subtitle}</p>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {sections.map((s, i) => (
          <div key={i}>
            <h2 className="sans font-bold text-base mb-3" style={{ color: "#1a2744" }}>
              {i + 1}. {s.heading}
            </h2>
            <p className="sans text-sm leading-relaxed" style={{ color: "#444", lineHeight: "1.8" }}>
              {s.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 pt-6 sans text-xs" style={{ borderTop: "1px solid #e2e2e2", color: "#999" }}>
        © 2026 Bennett, Coleman & Co. Ltd. All rights reserved. The Economic Times.
      </div>
    </div>
  );
}
