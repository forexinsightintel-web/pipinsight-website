import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import TapeLedger from "../../components/TapeLedger";

export const metadata: Metadata = {
  title: "The Tape — every call settled in public | PIP:Insight",
  description:
    "Two mechanical strategies on majors and gold, checked hourly. Every " +
    "signal logged the hour it fires, publicised only once concluded — " +
    "wins and losses both. No advance calls, ever.",
};

export default function TapePage() {
  return (
    <main style={{ background: "#fff", minHeight: "100vh" }}>
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/">
            <Image src="/logo.png" alt="PIP:Insight" width={160} height={44} className="logo-img" />
          </Link>
          <div className="nav-links">
            <Link href="/">Today&apos;s Analysis</Link>
            <Link href="/journal">Journal</Link>
            <Link href="/school">School</Link>
            <Link href="/courses">Courses</Link>
            <Link href="/tape" style={{ color: "var(--teal)", fontWeight: 700 }}>The Tape</Link>
            <Link href="/free">Free Tools</Link>
          </div>
        </div>
      </nav>
      <div className="container" style={{ maxWidth: 1000, margin: "0 auto",
        padding: "110px 22px 60px" }}>
        <div style={{ fontSize: 12, letterSpacing: ".14em", fontWeight: 800,
          color: "#1AAF8B" }}>THE TAPE</div>
        <h1 style={{ fontSize: 42, fontWeight: 900, margin: "10px 0 14px",
          color: "#0A0F1A" }}>Logged Live. Shown After.</h1>
        <p style={{ fontSize: 16.5, color: "#475569", maxWidth: 720, lineHeight: 1.6 }}>
          Our head analyst runs two mechanical plays — the London break and
          the prior-day sweep — across the majors and gold on the hourly
          chart. Every time a signal fires it is logged and committed to the
          record <strong>that hour</strong>. Nothing is publicised while a
          trade is running: you only ever see a signal here once it has
          concluded, win or lose. No advance calls, no hindsight, no editing
          the tape.
        </p>
        <p style={{ fontSize: 14, color: "#64748B", maxWidth: 720, lineHeight: 1.6 }}>
          Settlement is mechanical: a 15-pip target, a structural stop never
          larger than the target, and a 24-hour timeout. Roughly half of all
          signals reach the target — the record works because winners run
          and losers are capped. The strategies are explained end-to-end on
          the{" "}
          <Link href="/courses" style={{ color: "#1AAF8B", fontWeight: 700 }}>
          Forex School</Link> and the YouTube channel.
        </p>
        <div style={{ marginTop: 34 }}>
          <TapeLedger limit={120} />
        </div>
        <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 14 }}>
          For the auditors: across the full record above, level-stakes net
          is approximately breakeven before costs — the running record
          updates hourly and every row is checkable against the chart. The
          product here is the discipline and the transparency; treat any
          service selling certainty with suspicion.
        </p>
      </div>
    </main>
  );
}
