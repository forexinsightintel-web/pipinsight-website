import type { Metadata } from "next";
import Link from "next/link";
import board from "../../../content/leaderboard.json";

export const metadata: Metadata = {
  title: "The Leaderboard — PIP:Insight",
  description: "Pro traders, ranked by journalled wins. Screen names only — opt-in, aggregate stats, no personal data.",
  alternates: { canonical: "/leaderboard" },
};

type Row = { screen: string; trades: number; wins: number; netR: number; at: string };

export default function Leaderboard() {
  const data = board as { updated: string | null; rows: Row[] };
  const rows = [...(data.rows || [])].sort((a, b) => b.wins - a.wins).slice(0, 50);
  return (
    <main style={{ maxWidth: 860, margin: "0 auto", padding: "44px 20px 80px" }}>
      <Link href="/" style={{ fontSize: 13, fontWeight: 700 }}>← PIP:Insight</Link>
      <h1 style={{ fontSize: 34, fontWeight: 900, margin: "16px 0 6px" }}>
        The Leaderboard</h1>
      <p style={{ fontSize: 15, color: "#64748B", margin: "0 0 6px" }}>
        Pro members, ranked by journalled wins. Every entry is <b>opt-in</b> —
        traders choose to post their record. Screen names only; no personal
        information is ever shown.</p>
      <p style={{ fontSize: 12.5, color: "#94A3B8", margin: "0 0 26px" }}>
        {data.updated ? `Updated ${data.updated}` : "The board opens with its first Pro entry — yours?"}
      </p>
      {rows.length === 0 ? (
        <div style={{ background: "#F8FAFC", border: "1.5px dashed #CBD5E1",
          borderRadius: 16, padding: "44px 24px", textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>🏆</div>
          <div style={{ fontWeight: 900, fontSize: 19, marginBottom: 6 }}>
            No entries yet — the top spot is going cheap.</div>
          <div style={{ color: "#64748B", fontSize: 14.5 }}>
            Log 10+ trades in the <Link href="/journal" style={{ fontWeight: 700 }}>Journal</Link>,
            go Pro, and hit &ldquo;Post my record&rdquo;.</div>
        </div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14.5 }}>
          <thead><tr style={{ textAlign: "left", color: "#94A3B8", fontSize: 11.5,
            letterSpacing: ".08em" }}>
            <th style={{ padding: "8px 10px" }}>#</th>
            <th style={{ padding: "8px 10px" }}>TRADER</th>
            <th style={{ padding: "8px 10px" }}>WINS</th>
            <th style={{ padding: "8px 10px" }}>TRADES</th>
            <th style={{ padding: "8px 10px" }}>WIN %</th>
            <th style={{ padding: "8px 10px" }}>NET R</th>
          </tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.screen} style={{ borderTop: "1px solid #F1F5F9",
                background: i === 0 ? "#FFFBEB" : "transparent" }}>
                <td style={{ padding: "10px", fontWeight: 900,
                  color: i < 3 ? "#B45309" : "#94A3B8" }}>{i + 1}</td>
                <td style={{ padding: "10px", fontWeight: 800 }}>
                  {i === 0 ? "👑 " : ""}{r.screen}
                  <span style={{ marginLeft: 8, fontSize: 10.5, fontWeight: 800,
                    color: "#0E9F6E", background: "#ECFDF5", padding: "2px 8px",
                    borderRadius: 999 }}>PRO</span></td>
                <td style={{ padding: "10px", fontWeight: 900, color: "#0E9F6E" }}>{r.wins}</td>
                <td style={{ padding: "10px" }}>{r.trades}</td>
                <td style={{ padding: "10px" }}>{r.trades ? Math.round(100 * r.wins / r.trades) : 0}%</td>
                <td style={{ padding: "10px", fontWeight: 700,
                  color: r.netR >= 0 ? "#0E9F6E" : "#DC2626" }}>
                  {r.netR >= 0 ? "+" : ""}{r.netR}R</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 28 }}>
        Self-reported journal statistics from consenting Pro members, shown under
        chosen screen names. Not verified account results · not a performance
        promise · educational community feature. Capital at risk.</p>
    </main>
  );
}
