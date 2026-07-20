"use client";
import { useState } from "react";
import tape from "../../content/daily/tape.json";
import TradeHoverChart, { type ChartData } from "./TradeHoverChart";
import analysisIndex from "../../content/analysis/index.json";

type Row = { symbol: string; dir: string; strat: string; trigger?: string;
  ts: string; entry: number; result: string; pips: number | null;
  banked?: number | null; runner?: number | null;
  mfe: number | null; unit: string; phase?: string; chart?: ChartData };

const GREEN = "#0E9F6E", RED = "#E02424", AMBER = "#B45309", DIM = "#6B7280";
const MONO = "'Inter', 'SF Pro Display', -apple-system, 'Segoe UI', sans-serif";
const NUM = "'SF Mono', 'Roboto Mono', 'Courier New', monospace";

type Card = { slug: string; price: number; change_pct: number };
const _cards: Card[] = Object.values(
  (analysisIndex as unknown as { categories: Record<string, Card[]> }).categories).flat();
const TAPE_TICKER = _cards
  .filter(c => c.price)
  .slice(0, 14)
  .map(c => ({
    sym: c.slug.toUpperCase().replace("-", "/"),
    price: c.price >= 100 ? c.price.toFixed(2) : c.price.toFixed(4),
    chg: `${c.change_pct >= 0 ? "+" : ""}${c.change_pct}%`,
    arrow: c.change_pct >= 0 ? "▲" : "▼",
    cls: c.change_pct >= 0 ? "up" : "down",
  }));

function Stat({ value, label, color }: { value: string; label: string; color?: string }) {
  return (
    <td className="tape-stat" style={{ padding: "26px 30px", textAlign: "center",
      borderRight: "1px solid #E5E7EB" }}>
      <div className="tape-stat-num" style={{ fontSize: 52, fontWeight: 900,
        lineHeight: 1, fontFamily: NUM, color: color || "#0A0F1A",
        letterSpacing: "-1px" }}>{value}</div>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".16em",
        color: DIM, marginTop: 10, textTransform: "uppercase" }}>{label}</div>
    </td>
  );
}

function outcome(r: Row) {
  if (r.result === "win") {
    if (r.banked && r.runner && r.runner > 1)
      return { text: `BANKED 15 · RUNNER +${Math.round(r.runner)} PIPS`, color: GREEN };
    if (r.banked)
      return { text: "BANKED 15 · RUNNER BE", color: GREEN };
    return { text: `TOOK THE LEVEL +${r.pips}${r.mfe ? ` · RAN ${Math.round(r.mfe)} PIPS` : ""}`, color: GREEN };
  }
  if (r.result === "loss") return { text: `STOPPED ${r.pips} PIPS`, color: RED };
  return { text: `FLAT ${r.pips && r.pips > 0 ? "+" : ""}${r.pips}`, color: DIM };
}

export default function TapeLedger({ limit = 10, winnersOnly = false }:
  { limit?: number; winnersOnly?: boolean }) {
  const [hover, setHover] = useState<number | null>(null);
  const all = [...(tape.rows as unknown as Row[])]
    .sort((a, b) => (a.ts < b.ts ? 1 : -1));   // newest first, always
  const rows = (winnersOnly ? all.filter(r => r.result === "win") : all)
    .slice(0, limit);
  const s = tape.summary as { n: number; wins: number; win_pct: number;
    pips: number; avg_win?: number; best_run?: number; avg_run?: number };
  if (!rows.length) {
    return <p style={{ color: DIM, fontSize: 14 }}>
      The Tape is warming up — the first settled signals publish here within
      hours of concluding.</p>;
  }
  return (
    <div style={{ background: "#FFFFFF", borderRadius: 16, padding: "26px 26px 18px",
      border: "1px solid #E5E7EB", boxShadow: "0 10px 36px rgba(15,23,42,.08)" }}>
      {/* terminal header strip */}
      <div style={{ display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: 20 }}>
        <div style={{ fontFamily: MONO, fontSize: 13.5, letterSpacing: ".08em",
          color: GREEN, fontWeight: 800 }}>
          ● THE TAPE <span style={{ color: DIM, fontWeight: 600 }}>· SETTLED SIGNALS · H1 · UPDATED {tape.updated}</span>
        </div>
        <div style={{ fontFamily: MONO, fontSize: 12, color: DIM, fontWeight: 600 }}>
          MAJORS · YEN CROSSES · GOLD</div>
      </div>

      {/* NYSE-style pair ticker */}
      <div className="tape-ticker">
        <div className="ticker-track">
          {[...TAPE_TICKER, ...TAPE_TICKER].map((x, i) => (
            <span key={i} className={`tape-tick ${x.cls}`}>
              <b>{x.sym}</b>{x.price} {x.arrow} {x.chg}
            </span>
          ))}
        </div>
      </div>

      {/* the authority board */}
      <table className="tape-board" style={{ margin: "0 auto 24px",
        borderCollapse: "collapse",
        border: "1px solid #E5E7EB", borderRadius: 12, overflow: "hidden",
        background: "#F9FAFB" }}>
        <tbody>
          <tr>
            <Stat value={String(s.wins)} label="Winners settled" color={GREEN} />
            <Stat value={`${s.win_pct}%`} label="Hit the target" color={GREEN} />
            <Stat value={`${Math.round(s.avg_run || 0)} Pips`} label="Avg winner run" color={AMBER} />
            <Stat value={`${Math.round(s.best_run || 0)} Pips`} label="Best run" color={AMBER} />
          </tr>
        </tbody>
      </table>

      {winnersOnly && (
        <div style={{ fontFamily: NUM, fontSize: 11.5, letterSpacing: ".14em",
          color: AMBER, fontWeight: 800, marginBottom: 8 }}>
          RECENT WINNERS — FULL TAPE ONE CLICK AWAY</div>
      )}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse",
          fontSize: 13.5, fontFamily: MONO }}>
          <thead><tr style={{ textAlign: "left", color: DIM, fontSize: 11,
            letterSpacing: ".08em" }}>
            <th style={{ padding: "6px 8px" }}>FIRED (UTC)</th>
            <th style={{ padding: "6px 8px" }}>SIGNAL</th>
            <th style={{ padding: "6px 8px" }}>STRAT</th>
            <th style={{ padding: "6px 8px" }}>TRIGGER</th>
            <th style={{ padding: "6px 8px" }}>OUTCOME</th>
          </tr></thead>
          <tbody>
            {rows.map((r, i) => {
              const o = outcome(r);
              return (
                <tr key={i}
                  onMouseEnter={() => r.chart && setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  style={{ borderTop: "1px solid #F3F4F6", position: "relative",
                    cursor: r.chart ? "pointer" : "default",
                    background: hover === i ? "#F9FAFB" : "transparent" }}>
                  <td style={{ padding: "8px", whiteSpace: "nowrap", color: DIM }}>{r.ts}</td>
                  <td style={{ padding: "8px", fontWeight: 700, color: "#0A0F1A" }}>
                    {r.dir.toUpperCase()} {r.symbol} @ {r.entry}</td>
                  <td style={{ padding: "8px" }}>
                    <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: ".06em",
                      padding: "2px 8px", borderRadius: 4,
                      background: "rgba(14,159,110,.1)", color: GREEN }}>
                      {r.strat}</span></td>
                  <td style={{ padding: "8px", color: "#4B5563" }}>{r.trigger || "—"}</td>
                  <td style={{ padding: "8px", fontWeight: 800, color: o.color,
                    position: "relative" }}>
                    {o.text}{r.chart && <span style={{ marginLeft: 8,
                      fontSize: 10, color: "#9CA3AF" }}>▦ chart</span>}
                    {hover === i && r.chart && (
                      <TradeHoverChart data={r.chart} symbol={r.symbol} />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 14 }}>
        {tape.note}{" "}Educational only — not financial advice. Capital at risk.</p>
    </div>
  );
}
