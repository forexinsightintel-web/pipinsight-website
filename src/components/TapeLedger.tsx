import tape from "../../content/daily/tape.json";

type Row = { symbol: string; dir: string; strat: string; trigger?: string;
  ts: string; entry: number; result: string; pips: number | null;
  banked?: number | null; runner?: number | null;
  mfe: number | null; unit: string; phase?: string };

const GREEN = "#22C55E", RED = "#F87171", AMBER = "#FBBF24", DIM = "#5B6B84";
const MONO = "'SF Mono', 'Roboto Mono', 'Courier New', monospace";

function Stat({ value, label, color }: { value: string; label: string; color?: string }) {
  return (
    <td style={{ padding: "26px 30px", textAlign: "center",
      borderRight: "1px solid #1B2740" }}>
      <div style={{ fontSize: 52, fontWeight: 900, lineHeight: 1,
        fontFamily: MONO, color: color || "#E5EDF8",
        textShadow: color ? `0 0 24px ${color}44` : "none" }}>{value}</div>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".16em",
        color: DIM, marginTop: 10, textTransform: "uppercase" }}>{label}</div>
    </td>
  );
}

function outcome(r: Row) {
  if (r.result === "win") {
    if (r.banked && r.runner && r.runner > 1)
      return { text: `BANKED 15 · RUNNER +${Math.round(r.runner)}`, color: GREEN };
    if (r.banked)
      return { text: "BANKED 15 · RUNNER BE", color: GREEN };
    return { text: `TOOK THE LEVEL +${r.pips}${r.mfe ? ` · RAN ${Math.round(r.mfe)}` : ""}`, color: GREEN };
  }
  if (r.result === "loss") return { text: `STOPPED ${r.pips}`, color: RED };
  return { text: `FLAT ${r.pips && r.pips > 0 ? "+" : ""}${r.pips}`, color: DIM };
}

export default function TapeLedger({ limit = 10, winnersOnly = false }:
  { limit?: number; winnersOnly?: boolean }) {
  const all = tape.rows as Row[];
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
    <div style={{ background: "#0B1220", borderRadius: 16, padding: "26px 26px 18px",
      border: "1px solid #1B2740", boxShadow: "0 12px 44px rgba(2,8,23,.45)" }}>
      {/* terminal header strip */}
      <div style={{ display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: 20 }}>
        <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: ".12em",
          color: GREEN, fontWeight: 700 }}>
          ● THE TAPE <span style={{ color: DIM }}>· SETTLED SIGNALS · H1 · UPDATED {tape.updated}</span>
        </div>
        <div style={{ fontFamily: MONO, fontSize: 12, color: DIM }}>
          EUR/USD · GBP/USD · USD/JPY · GBP/JPY · XAU/USD</div>
      </div>

      {/* the authority board */}
      <table style={{ margin: "0 auto 24px", borderCollapse: "collapse",
        border: "1px solid #1B2740", borderRadius: 12, overflow: "hidden",
        background: "#0E1729" }}>
        <tbody>
          <tr>
            <Stat value={String(s.wins)} label="Winners settled" color={GREEN} />
            <Stat value={`${s.win_pct}%`} label="Hit the target" color={GREEN} />
            <Stat value={`${Math.round(s.avg_run || 0)}p`} label="Avg winner run" color={AMBER} />
            <Stat value={`${Math.round(s.best_run || 0)}p`} label="Best run" color={AMBER} />
          </tr>
        </tbody>
      </table>

      {winnersOnly && (
        <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: ".14em",
          color: AMBER, fontWeight: 700, marginBottom: 8 }}>
          RECENT WINNERS — FULL TAPE BELOW</div>
      )}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse",
          fontSize: 13, fontFamily: MONO }}>
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
                <tr key={i} style={{ borderTop: "1px solid #16203A" }}>
                  <td style={{ padding: "8px", whiteSpace: "nowrap", color: DIM }}>{r.ts}</td>
                  <td style={{ padding: "8px", fontWeight: 700, color: "#E5EDF8" }}>
                    {r.dir.toUpperCase()} {r.symbol} @ {r.entry}</td>
                  <td style={{ padding: "8px" }}>
                    <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: ".06em",
                      padding: "2px 8px", borderRadius: 4,
                      background: "rgba(34,197,94,.12)", color: GREEN }}>
                      {r.strat}</span></td>
                  <td style={{ padding: "8px", color: "#9FB0CB" }}>{r.trigger || "—"}</td>
                  <td style={{ padding: "8px", fontWeight: 800, color: o.color }}>{o.text}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 11, color: DIM, marginTop: 14, fontFamily: MONO }}>
        {tape.note}{" "}Educational only — not financial advice. Capital at risk.</p>
    </div>
  );
}
