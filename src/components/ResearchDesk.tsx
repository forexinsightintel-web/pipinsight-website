import research from "../../content/daily/research.json";

const GREEN = "#0E9F6E", DIM = "#6B7280";
const MONO = "'Inter', 'SF Pro Display', -apple-system, 'Segoe UI', sans-serif";
const NUM = "'SF Mono', 'Roboto Mono', 'Courier New', monospace";

type Stats = { backtests: number; markets: number; timeframes: number;
  strategies: number; oos_survivors: number; forex_1h_plus: number };
type Setup = { pair: string; tf: string; strategy: string; win: number; trades: number };

export default function ResearchDesk() {
  const s = research.stats as Stats;
  const rows = research.proven_forex as Setup[];
  const stat = (v: string, l: string) => (
    <div style={{ textAlign: "center", padding: "0 14px" }}>
      <div style={{ fontFamily: NUM, fontSize: 30, fontWeight: 900, color: GREEN, lineHeight: 1 }}>{v}</div>
      <div style={{ fontSize: 10.5, letterSpacing: ".12em", color: DIM, fontWeight: 700, marginTop: 6, textTransform: "uppercase" }}>{l}</div>
    </div>
  );
  return (
    <div style={{ background: "#0A0F1A", borderRadius: 16, padding: "26px 26px 20px",
      border: "1px solid #1E293B", boxShadow: "0 10px 36px rgba(15,23,42,.18)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
        <div style={{ fontFamily: MONO, fontSize: 13.5, letterSpacing: ".08em", color: GREEN, fontWeight: 800 }}>
          ● THE RESEARCH DESK <span style={{ color: "#94A3B8", fontWeight: 600 }}>· EVERY PLAY, VALIDATED ON A YEAR OF DATA</span>
        </div>
        <div style={{ fontFamily: MONO, fontSize: 11, color: "#94A3B8", fontWeight: 700 }}>OUT-OF-SAMPLE TESTED</div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap",
        gap: 14, padding: "14px 0 20px", borderBottom: "1px solid #1E293B", marginBottom: 18 }}>
        {stat(s.backtests.toLocaleString(), "Backtests run")}
        {stat(String(s.markets), "Markets")}
        {stat(String(s.strategies), "Strategies tested")}
        {stat(s.oos_survivors.toLocaleString(), "Survived out-of-sample")}
      </div>

      <div style={{ fontSize: 13, color: "#C7D2E0", marginBottom: 12, lineHeight: 1.5 }}>
        We didn&apos;t guess our edge — we tested it. {s.backtests.toLocaleString()} backtests
        across {s.markets} markets and six timeframes, then re-run on data the rules had
        never seen. These forex setups earned their place and <b style={{ color: "#fff" }}>held
        up out-of-sample</b> — the only test that counts:
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: MONO }}>
          <thead><tr style={{ textAlign: "left", color: "#94A3B8", fontSize: 11, letterSpacing: ".06em" }}>
            <th style={{ padding: "6px 8px" }}>PAIR</th>
            <th style={{ padding: "6px 8px" }}>TIMEFRAME</th>
            <th style={{ padding: "6px 8px" }}>STRATEGY</th>
            <th style={{ padding: "6px 8px", textAlign: "right" }}>OOS WIN RATE</th>
            <th style={{ padding: "6px 8px", textAlign: "right" }}>SAMPLE</th>
          </tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderTop: "1px solid #172033" }}>
                <td style={{ padding: "8px", fontWeight: 700, color: "#F5F7FA" }}>{r.pair}</td>
                <td style={{ padding: "8px", color: "#94A3B8" }}>{r.tf}</td>
                <td style={{ padding: "8px", color: "#C7D2E0" }}>{r.strategy}</td>
                <td style={{ padding: "8px", textAlign: "right", fontWeight: 800, color: GREEN }}>{r.win}%</td>
                <td style={{ padding: "8px", textAlign: "right", color: "#64748B" }}>{r.trades} trades</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 11, color: "#64748B", marginTop: 14 }}>
        Backtested and out-of-sample validated on {s.markets} markets · {s.forex_1h_plus} forex
        setups cleared the bar · past performance is not a guarantee · educational only, not advice · 18+
      </p>
    </div>
  );
}
