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

  // Forex traders talk in pips; metals in dollars; stocks (later) in percent.
  const isMetal = /^X(AU|AG|PT|PD)\//.test(d.symbol);
  const pipSize = /^[A-Z]{3}\/[A-Z]{3}$/.test(d.symbol) && !isMetal
    ? (d.symbol.endsWith("/JPY") ? 0.01 : 0.0001)
    : null;
  const distance = (level: number) => {
    const diff = level - d.price;
    const above = diff >= 0;
    const dir = above ? "above" : "below";
    if (pipSize) {
      const pips = Math.abs(diff) / pipSize;
      const n = pips >= 100 ? Math.round(pips) : Math.round(pips * 10) / 10;
      return { above, text: `${n.toLocaleString("en-GB")} pips ${dir}` };
    }
    if (isMetal) {
      const usd = Math.abs(diff);
      return { above, text: `$${usd >= 100 ? Math.round(usd).toLocaleString("en-GB") : usd.toFixed(2)} ${dir}` };
    }
    return { above, text: `${Math.abs((diff / d.price) * 100).toFixed(2)}% ${dir}` };
  };

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

          {d.zones.length > 0 && (
            <div className="inst-levels">
              <div className="jr-card-title">Significant levels on the radar</div>
              <table className="inst-levels-table">
                <thead>
                  <tr>
                    <th>Level</th><th>Character</th><th>Prior reactions</th>
                    <th>Versus current price</th>
                  </tr>
                </thead>
                <tbody>
                  {[...d.zones].sort((a, b) => b.level - a.level).map((z, i) => {
                    const { above, text } = distance(z.level);
                    return (
                      <tr key={i}>
                        <td className="inst-lv-price">
                          <span className="inst-zone-dot" style={{
                            background: z.side === "resistance" ? "#E8476A" : "#1AAF8B",
                          }} />
                          {fmt(z.level)}
                        </td>
                        <td style={{ textTransform: "capitalize" }}>{z.label}</td>
                        <td>{z.touches} {z.touches === 1 ? "touch" : "touches"}
                          {z.touches >= 3 ? " · well-tested" : ""}</td>
                        <td className={above ? "inst-lv-above" : "inst-lv-below"}>
                          {text}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p className="inst-levels-note">
                Zones where price has repeatedly reacted in prior sessions — context
                for reading today&apos;s behaviour, not instructions to trade.
              </p>
            </div>
          )}

          <div className="inst-grid">
            <article className="inst-editorial">
              <h2>The Trading Desk</h2>
              <div className="inst-byline">
                PIP:Insight Analysis Desk · {d.date_str} · editorial market analysis
              </div>
              {d.editorial
                ? d.editorial.split(/\n\n+/).map((p, i) => <p key={i}>{p}</p>)
                : <p>Today&apos;s trading desk analysis publishes with the morning run.</p>}
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
