import Link from "next/link";

/* Site-wide footer — legal links (Stripe + GDPR want these findable),
   the compliance line, and the honest one-liner about journal data. */
export default function SiteFooter() {
  return (
    <footer style={{ borderTop: "1px solid #E5E7EB", background: "#FAFBFC",
      padding: "28px 20px 34px", marginTop: 40 }}>
      <div style={{ maxWidth: 980, margin: "0 auto", display: "flex",
        flexWrap: "wrap", gap: "10px 26px", alignItems: "baseline" }}>
        <b style={{ fontSize: 14 }}>PIP:Insight</b>
        <Link href="/school" style={{ fontSize: 13 }}>School</Link>
        <Link href="/courses" style={{ fontSize: 13 }}>Courses</Link>
        <Link href="/journal" style={{ fontSize: 13 }}>Journal</Link>
        <Link href="/glossary" style={{ fontSize: 13 }}>Glossary</Link>
        <Link href="/free" style={{ fontSize: 13 }}>Free Tools</Link>
        <Link href="/tape" style={{ fontSize: 13 }}>The Tape</Link>
        <span style={{ flex: 1 }} />
        <Link href="/privacy" style={{ fontSize: 13 }}>Privacy</Link>
        <Link href="/terms" style={{ fontSize: 13 }}>Terms</Link>
        <Link href="/risk" style={{ fontSize: 13 }}>Risk Disclosure</Link>
      </div>
      <p style={{ maxWidth: 980, margin: "14px auto 0", fontSize: 12,
        color: "#94A3B8", lineHeight: 1.6 }}>
        Educational content only — never financial advice, never an instruction
        to trade. Trading involves substantial risk of loss; most retail traders
        lose money. Capital at risk. 18+. Your journal entries are stored on
        your own device, not our servers.
        © {new Date().getFullYear()} PIP:Insight · pip-insight.co.uk
      </p>
    </footer>
  );
}
