import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import glossary from "../../../content/glossary.json";

/* The Glossary — every trading term in pub English. The forexpedia play:
   each term is an SEO landing surface and an internal-link hub. */

export const metadata: Metadata = {
  title: "Forex Glossary in Plain English — PIP:Insight",
  description: "Every trading term translated into plain English: pips, " +
    "spreads, leverage, margin, R-multiples and more. Part of the free " +
    "Trading School.",
  alternates: { canonical: "/glossary" },
};

const DIM = "#64748B", INK = "#0F172A";

export default function GlossaryPage() {
  const entries = Object.entries(glossary as Record<string, string>)
    .sort(([a], [b]) => a.localeCompare(b));
  let lastLetter = "";
  return (
    <div>
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/">
            <Image src="/logo.png" alt="PIP:Insight" width={160} height={44} className="logo-img" />
          </Link>
          <div className="nav-links">
            <Link href="/school">School</Link>
            <Link href="/glossary" style={{ color: "var(--teal)", fontWeight: 700 }}>Glossary</Link>
            <Link href="/journal">Journal</Link>
          </div>
        </div>
      </nav>
      <main className="container" style={{ maxWidth: 760, padding: "40px 20px 70px" }}>
        <div className="eyebrow">THE GLOSSARY</div>
        <h1 style={{ fontSize: "clamp(28px, 6vw, 40px)", fontWeight: 900,
          margin: "8px 0 8px" }}>Trading jargon, translated.</h1>
        <p style={{ fontSize: 15.5, color: "#475569", maxWidth: 600, lineHeight: 1.6 }}>
          Every term you&apos;ll meet in the{" "}
          <Link href="/school" style={{ color: "#13896D", fontWeight: 700 }}>
          Trading School</Link> and beyond — in the plain English the textbooks
          refuse to use. {entries.length} terms and growing.
        </p>
        <div style={{ marginTop: 22 }}>
          {entries.map(([term, def]) => {
            const letter = term[0].toUpperCase();
            const head = letter !== lastLetter;
            lastLetter = letter;
            return (
              <div key={term}>
                {head && <div style={{ fontSize: 14, fontWeight: 900,
                  color: "#B45309", letterSpacing: ".14em",
                  margin: "22px 0 8px" }}>{letter}</div>}
                <div style={{ background: "#fff", border: "1px solid #E5E7EB",
                  borderRadius: 12, padding: "12px 16px", marginBottom: 8 }}>
                  <b style={{ fontSize: 15.5, color: INK }}>{term}</b>
                  <div style={{ fontSize: 14, color: DIM, marginTop: 3,
                    lineHeight: 1.55 }}>{def}</div>
                </div>
              </div>
            );
          })}
        </div>
        <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 26 }}>
          Educational content only — never financial advice. Capital at risk. 18+.
        </p>
      </main>
    </div>
  );
}
