import tape from "../../content/daily/tape.json";

type Row = { symbol: string; dir: string; strat: string; trigger?: string;
  ts: string; entry: number; result: string; pips: number | null;
  mfe: number | null; unit: string; phase?: string };

const TEAL = "#1AAF8B", TEAL_DK = "#0F6E56", RED = "#E8476A";

function StatCell({ value, label, color }: { value: string; label: string; color?: string }) {
  return (
    <td style={{ padding: "22px 18px", textAlign: "center",
      borderRight: "1px solid #E2E8F0" }}>
      <div style={{ fontSize: 44, fontWeight: 900, lineHeight: 1,
        color: color || "#0A0F1A", letterSpacing: "-1px" }}>{value}</div>
      <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".1em",
        color: "#64748B", marginTop: 8, textTransform: "uppercase" }}>{label}</div>
    </td>
  );
}

export default function TapeLedger({ limit = 10 }: { limit?: number }) {
  const rows = (tape.rows as Row[]).slice(0, limit);
  const s = tape.summary as { n: number; wins: number; win_pct: number;
    pips: number; avg_run?: number };
  if (!rows.length) {
    return <p style={{ color: "#64748B", fontSize: 14 }}>
      The Tape is warming up — the first settled signals publish here within
      hours of concluding.</p>;
  }
  return (
    <div>
      {/* the authority board — big, centred, tabled */}
      <table style={{ margin: "0 auto 26px", borderCollapse: "collapse",
        border: "1px solid #E2E8F0", borderRadius: 12, overflow: "hidden",
        background: "#FBFDFC", boxShadow: "0 2px 10px rgba(10,15,26,.05)" }}>
        <tbody>
          <tr>
            <StatCell value={String(s.n)} label="Signals settled" />
            <StatCell value={`${s.win_pct}%`} label="Hit target" color={TEAL} />
            <StatCell value={`${s.pips >= 0 ? "+" : ""}${s.pips}`}
              label="Net pips" color={s.pips >= 0 ? TEAL : RED} />
            {s.avg_run ? (
              <StatCell value={`${Math.round(s.avg_run)}p`}
                label="Avg winner run" color={TEAL_DK} />
            ) : null}
          </tr>
        </tbody>
      </table>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
          <thead><tr style={{ textAlign: "left", color: "#64748B" }}>
            <th style={{ padding: "6px 8px" }}>Fired (UTC)</th>
            <th style={{ padding: "6px 8px" }}>Signal</th>
            <th style={{ padding: "6px 8px" }}>Strat</th>
            <th style={{ padding: "6px 8px" }}>Trigger</th>
            <th style={{ padding: "6px 8px" }}>Outcome</th>
          </tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderTop: "1px solid #E2E8F0" }}>
                <td style={{ padding: "7px 8px", whiteSpace: "nowrap", color: "#64748B" }}>{r.ts}</td>
                <td style={{ padding: "7px 8px", fontWeight: 700 }}>
                  {r.dir.toUpperCase()} {r.symbol} @ {r.entry}</td>
                <td style={{ padding: "7px 8px" }}>
                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".05em",
                    padding: "2px 8px", borderRadius: 6,
                    background: "rgba(26,175,139,.1)", color: TEAL_DK }}>
                    {r.strat}</span></td>
                <td style={{ padding: "7px 8px", color: "#475569" }}>{r.trigger || "—"}</td>
                <td style={{ padding: "7px 8px", fontWeight: 800,
                  color: r.result === "win" ? TEAL : r.result === "loss" ? RED : "#64748B" }}>
                  {r.result === "win"
                    ? `WON +${r.pips}${r.mfe ? ` (ran ${Math.round(r.mfe)} ${r.unit})` : ""}`
                    : r.result === "loss" ? `LOST ${r.pips}` : `FLAT ${r.pips && r.pips > 0 ? "+" : ""}${r.pips}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 11.5, color: "#94A3B8", marginTop: 12 }}>{tape.note}{" "}
        Educational only — not financial advice. Capital at risk. Updated {tape.updated}.</p>
    </div>
  );
}
