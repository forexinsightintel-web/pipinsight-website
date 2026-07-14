import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import InstrumentCharts from "../../../components/InstrumentCharts";

type Zone = { level: number; side: string; touches: number; label: string };
type CalEvent = { time_utc: string; currency: string; title: string; impact: string };
type Detail = {
  symbol: string; slug: string; date_str: string; bias: string; price: number;
  zones: Zone[]; d1: { time: string; open: number; high: number; low: number; close: number }[];
  h1: { time: string; open: number; high: number; low: number; close: number }[];
  calendar: CalEvent[]; editorial: string; sample?: boolean;
};

const DIR = path.join(process.cwd(), "content", "analysis");

export function generateStaticParams() {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR)
    .filter((f) => f.endsWith(".json") && f !== "index.json")
    .map((f) => ({ slug: f.replace(".json", "") }));
}

export default async function InstrumentPage({ params }: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const file = path.join(DIR, `${slug}.json`);
  if (!/^[a-z0-9-]+$/.test(slug) || !fs.existsSync(file)) notFound();
  const d: Detail = JSON.parse(fs.readFileSync(file, "utf8"));
  const pill = d.bias === "BULLISH" ? "bull" : d.bias === "BEARISH" ? "bear" : "neu";
  const arrow = d.bias === "BULLISH" ? "▲" : d.bias === "BEARISH" ? "▼" : "◆";
  const fmt = (p: number) => p >= 100 ? p.toFixed(2) : p >= 10 ? p.toFixed(3) : p.toFixed(4);

  return (
    <div>
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/"><Image src="/logo.png" alt="PIP:Insight" width={160} height={44} className="logo-img" /></Link>
          <div className="nav-links">
            <Link href="/#analysis">Today&apos;s Analysis</Link>
            <Link href="/courses">Courses</Link>
            <Link href="/journal">Journal</Link>
            <Link href="/#pricing" className="btn btn-primary btn-sm">Full Access — £9.99/mo</Link>
          </div>
        </div>
      </nav>

      <header className="inst-hero">
        <div className="container">
          <div className="eyebrow">DAILY DESK ANALYSIS · {d.date_str.toUpperCase()}</div>
          <div className="inst-head">
            <h1>{d.symbol}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span className="inst-price">{fmt(d.price)}</span>
              <span className={`bias-pill ${pill}`}>{arrow} {d.bias}</span>
            </div>
          </div>
        </div>
      </header>

      <section className="inst-section">
        <div className="container">
          {d.sample && (
            <div className="inst-sample-banner">
              ⚠ Illustrative sample page — the live desk analysis, generated from real
              market data, publishes every trading morning at 06:30 UK.
            </div>
          )}

          <InstrumentCharts d1={d.d1} h1={d.h1} zones={d.zones} />

          <div className="inst-grid">
            <article className="inst-editorial">
              <h2>The Desk Note</h2>
              <div className="inst-byline">
                PIP:Insight Analysis Desk · {d.date_str} · editorial market analysis
              </div>
              {d.editorial
                ? d.editorial.split(/\n\n+/).map((p, i) => <p key={i}>{p}</p>)
                : <p>Today&apos;s desk note publishes with the morning analysis run.</p>}
            </article>

            <aside>
              <div className="inst-cal">
                <div className="jr-card-title">Today&apos;s calendar for {d.symbol}</div>
                {d.calendar.length === 0 && (
                  <p style={{ fontSize: 13, color: "var(--muted)" }}>
                    No scheduled releases directly touch this instrument today.
                  </p>
                )}
                {d.calendar.map((e, i) => (
                  <div key={i} className="inst-cal-row">
                    <span className="inst-cal-time">{e.time_utc}</span>
                    <span className="inst-cal-ccy">{e.currency}</span>
                    <span>{e.title}</span>
                    <span className={`inst-cal-impact ${e.impact}`}>{e.impact.toUpperCase()}</span>
                  </div>
                ))}
                <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 10 }}>Times UTC.</p>
              </div>
              <div className="hub-unlock-bar" style={{ marginTop: 16 }}>
                <b>Want every instrument?</b><br />
                <span style={{ fontSize: 13, color: "var(--muted)" }}>
                  Full Access unlocks the complete universe + Journal Pro.
                </span><br />
                <Link href="/#pricing" className="btn btn-primary btn-sm" style={{ marginTop: 10 }}>
                  Full Access — £9.99/mo
                </Link>
              </div>
            </aside>
          </div>

          <p className="jr-disclaimer">
            The zones marked on these charts are areas where price has previously reacted —
            reference points for reading market behaviour, never instructions to trade.
            This page is editorial analysis, not financial advice. Trading involves
            substantial risk of loss.
          </p>
        </div>
      </section>
    </div>
  );
}
