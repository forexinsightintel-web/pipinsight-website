import tape from "../../content/daily/tape.json";

type Row = { symbol: string; dir: string; strat: string; ts: string;
  entry: number; result: string; pips: number | null; mfe: number | null;
  unit: string; phase: string };

const STRAT_NAME: Record<string, string> = {
  LDN_BREAK: "London break", PDH_SWEEP: "Prior-day sweep",
  TREND_PULL: "Trend pullback",
};

export default function TapeLedger({ limit = 10 }: { limit?: number }) {
  const rows = (tape.rows as Row[]).slice(0, limit);
  const s = tape.summary;
  if (!rows.length) {
    return <p style={{ color: "#64748B", fontSize: 14 }}>
      The Tape is warming up — the first settled signals publish here within
      hours of concluding.</p>;
  }
  return (
    <div>
      <div style={{ display: "flex", gap: 26, flexWrap: "wrap", marginBottom: 18 }}>
        <div><div style={{ fontSize: 30, fontWeight: 900, color: "#1AAF8B" }}>{s.n}</div>
          <div style={{ fontSize: 12, color: "#64748B" }}>signals settled</div></div>
        <div><div style={{ fontSize: 30, fontWeight: 900, color: "#1AAF8B" }}>{s.win_pct}%</div>
          <div style={{ fontSize: 12, color: "#64748B" }}>reached +15 before the stop</div></div>
        <div><div style={{ fontSize: 30, fontWeight: 900,
          color: s.pips >= 0 ? "#1AAF8B" : "#E8476A" }}>{s.pips >= 0 ? "+" : ""}{s.pips}</div>
          <div style={{ fontSize: 12, color: "#64748B" }}>net pips, all signals</div></div>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
          <thead><tr style={{ textAlign: "left", color: "#64748B" }}>
            <th style={{ padding: "6px 8px" }}>Fired (UTC)</th>
            <th style={{ padding: "6px 8px" }}>Signal</th>
            <th style={{ padding: "6px 8px" }}>Strategy</th>
            <th style={{ padding: "6px 8px" }}>Outcome</th>
            <th style={{ padding: "6px 8px" }}>Phase</th>
          </tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderTop: "1px solid #E2E8F0" }}>
                <td style={{ padding: "7px 8px", whiteSpace: "nowrap", color: "#64748B" }}>{r.ts}</td>
                <td style={{ padding: "7px 8px", fontWeight: 700 }}>
                  {r.dir.toUpperCase()} {r.symbol} @ {r.entry}</td>
                <td style={{ padding: "7px 8px" }}>{STRAT_NAME[r.strat] || r.strat}</td>
                <td style={{ padding: "7px 8px", fontWeight: 800,
                  color: r.result === "win" ? "#1AAF8B" : r.result === "loss" ? "#E8476A" : "#64748B" }}>
                  {r.result === "win"
                    ? `WON +${r.pips}${r.mfe ? ` (ran ${Math.round(r.mfe)} ${r.unit})` : ""}`
                    : r.result === "loss" ? `LOST ${r.pips}` : `FLAT ${r.pips && r.pips > 0 ? "+" : ""}${r.pips}`}
                </td>
                <td style={{ padding: "7px 8px" }}>
                  <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: ".06em",
                    padding: "2px 8px", borderRadius: 20,
                    background: r.phase === "live" ? "rgba(26,175,139,.12)" : "rgba(100,116,139,.12)",
                    color: r.phase === "live" ? "#0F6E56" : "#475569" }}>
                    {r.phase === "live" ? "LIVE" : "BACKTEST"}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 11.5, color: "#94A3B8", marginTop: 12 }}>{tape.note}{" "}
        Historical reporting of a mechanical system. Educational only — not
        financial advice. Capital at risk. Updated {tape.updated}.</p>
    </div>
  );
}
