"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/* /free — the funnel landing page every social promo points at.
   One email in exchange for the free toolkit: the web journal (software,
   not a spreadsheet), the discipline tracker download, and the daily
   analysis. Email goes to /api/subscribe -> the leads database. */

const TEAL = "#1AAF8B";

const GETS = [
  ["The Trade Journal", "Not a spreadsheet — software. Log trades, get your equity curve, win rates by setup, session and emotion. The AI analyst layer is the Pro upgrade (\u00a39.99/mo).", "Free forever"],
  ["The Discipline Tracker", "A 31-day habit scoreboard for the trading behaviours that actually decide outcomes. Downloadable spreadsheet — works in Excel and Google Sheets.", "Instant download"],
  ["The Daily Analysis", "27 instruments mapped every morning before the London open — majors, metals, crosses, exotics. Levels, bias, context.", "Every morning"],
  ["The Tape", "Every settled call on the public record, wins and losses, timestamped. Check the ledger before you trust a word we say.", "Always public"],
];

export default function FreePage() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("busy");
    try {
      const r = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "free-toolkit" }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Something went wrong.");
      setState("done");
    } catch (err) {
      setState("error");
      setMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <div>
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/">
            <Image src="/logo.png" alt="PIP:Insight" width={160} height={44} className="logo-img" />
          </Link>
          <div className="nav-links">
            <Link href="/">Today&apos;s Analysis</Link>
            <Link href="/school">School</Link>
            <Link href="/journal">Journal</Link>
            <Link href="/free" style={{ color: "var(--teal)", fontWeight: 700 }}>Free Tools</Link>
          </div>
        </div>
      </nav>

      <main className="container" style={{ maxWidth: 760, padding: "44px 20px 70px" }}>
        <div className="eyebrow">THE FREE TOOLKIT</div>
        <h1 style={{ fontSize: "clamp(30px, 7vw, 44px)", lineHeight: 1.1, margin: "10px 0 12px", fontWeight: 900 }}>
          Most traders don&apos;t lose to the market.<br />
          <span style={{ color: TEAL }}>They lose to themselves.</span>
        </h1>
        <p style={{ fontSize: 16.5, color: "#475569", lineHeight: 1.6, maxWidth: 620 }}>
          Discipline is measurable — so measure it. One email gets you the
          full toolkit: a proper trade journal, the 31-day
          discipline tracker, and the analysis we publish every morning
          before London opens. No card, no trial, no catch.
        </p>

        {state !== "done" ? (
          <form onSubmit={submit} style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "22px 0 8px" }}>
            <input
              type="email" required value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              aria-label="Email address"
              style={{ flex: "1 1 240px", fontSize: 16, padding: "13px 16px",
                borderRadius: 12, border: "1.5px solid #CBD5E1", outline: "none" }}
            />
            {/* honeypot — humans never see or fill this */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off"
              style={{ position: "absolute", left: -9999, opacity: 0, height: 0 }}
              aria-hidden="true" />
            <button type="submit" disabled={state === "busy"} className="btn btn-primary"
              style={{ fontSize: 16, fontWeight: 800, padding: "13px 26px", borderRadius: 12 }}>
              {state === "busy" ? "One second…" : "Get the toolkit — free"}
            </button>
          </form>
        ) : (
          <div style={{ background: "#F0FDF9", border: `1.5px solid ${TEAL}`, borderRadius: 14,
            padding: "18px 20px", margin: "22px 0 8px" }}>
            <div style={{ fontWeight: 900, fontSize: 17, marginBottom: 6 }}>In. Here&apos;s everything —</div>
            <div style={{ fontSize: 15, lineHeight: 2 }}>
              → <Link href="/journal" style={{ color: "#13896D", fontWeight: 700 }}>Open the Trade Journal</Link><br />
              → <a href="/downloads/pip-insight-discipline-tracker.xlsx" style={{ color: "#13896D", fontWeight: 700 }}>Download the Discipline Tracker</a><br />
              → <Link href="/" style={{ color: "#13896D", fontWeight: 700 }}>Read this morning&apos;s analysis</Link>
            </div>
          </div>
        )}
        {state === "error" && (
          <p style={{ color: "#E8476A", fontSize: 13.5, fontWeight: 600 }}>{msg}</p>
        )}
        <p style={{ fontSize: 12, color: "#94A3B8", margin: "6px 0 0" }}>
          We send trading process and analysis, never spam. Unsubscribe in one
          click, any time, forever.
        </p>

        <div style={{ display: "grid", gap: 14, margin: "36px 0 0",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
          {GETS.map(([name, blurb, badge]) => (
            <div key={name} style={{ background: "#fff", border: "1px solid #E5E7EB",
              borderRadius: 14, padding: "18px 18px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                <div style={{ fontWeight: 900, fontSize: 16.5 }}>{name}</div>
                <div style={{ fontSize: 10.5, fontWeight: 800, color: "#13896D",
                  background: "#F0FDF9", border: "1px solid #BBE5D5",
                  borderRadius: 999, padding: "3px 9px", whiteSpace: "nowrap" }}>{badge}</div>
              </div>
              <div style={{ fontSize: 13.5, color: "#64748B", marginTop: 7, lineHeight: 1.55 }}>{blurb}</div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 36, lineHeight: 1.6 }}>
          Educational content only — never financial advice, never an
          instruction to trade. Trading involves substantial risk of loss.
          Capital at risk. 18+.
        </p>
      </main>
    </div>
  );
}
