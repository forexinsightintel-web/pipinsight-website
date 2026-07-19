"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  computeStats, equityWithDates, groupBy, rHistogram, netRByWeekday,
  rollingWinRate, longShortSplit, DEMO_TRADES, PAIRS, SETUPS, type Trade,
} from "../../lib/journal";

const LS_KEY = "pipinsight_journal_v1";
const TEAL = "#1AAF8B", TEAL_DK = "#13896D", RED = "#E8476A";
const GRID = "#EDF1F6", AXIS = "#94A3B8";

type Insight = { title: string; severity: "info" | "warning" | "critical"; body: string };
type Group = Record<string, { n: number; netR: number; winRate: number }>;

function useTrades(): [Trade[], (t: Trade[]) => void] {
  const [trades, setTrades] = useState<Trade[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      setTrades(raw ? JSON.parse(raw) : DEMO_TRADES);
    } catch { setTrades(DEMO_TRADES); }
  }, []);
  const save = (t: Trade[]) => {
    setTrades(t);
    try { localStorage.setItem(LS_KEY, JSON.stringify(t)); } catch {}
  };
  return [trades, save];
}

/* ── Equity curve: area + 2px line, gridlines, crosshair hover ── */
function EquityChart({ trades }: { trades: Trade[] }) {
  const pts = useMemo(() => equityWithDates(trades), [trades]);
  const [hover, setHover] = useState<number | null>(null);
  const ref = useRef<SVGSVGElement>(null);
  const W = 760, H = 240, L = 44, R = 12, T = 14, B = 26;
  if (pts.length < 2) return <div style={{ color: AXIS, fontSize: 13, padding: 40, textAlign: "center" }}>Log trades to draw your equity curve.</div>;

  const min = Math.min(0, ...pts.map((p) => p.eq));
  const max = Math.max(0.5, ...pts.map((p) => p.eq));
  const x = (i: number) => L + (i / (pts.length - 1)) * (W - L - R);
  const y = (v: number) => T + (1 - (v - min) / (max - min)) * (H - T - B);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.eq).toFixed(1)}`).join(" ");
  const last = pts[pts.length - 1].eq;
  const col = last >= 0 ? TEAL : RED;

  // y gridlines at nice steps
  const step = (max - min) / 4;
  const ticks = [0, 1, 2, 3, 4].map((k) => +(min + k * step).toFixed(1));

  const onMove = (e: React.MouseEvent) => {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    const px = ((e.clientX - box.left) / box.width) * W;
    const i = Math.round(((px - L) / (W - L - R)) * (pts.length - 1));
    setHover(Math.max(0, Math.min(pts.length - 1, i)));
  };
  const h = hover !== null ? pts[hover] : null;

  return (
    <div style={{ position: "relative" }}>
      {h && (
        <div className="jr-tooltip"
          style={{ left: `${(x(h.i) / W) * 100}%`, top: `${(y(h.eq) / H) * 100}%` }}>
          {h.eq >= 0 ? "+" : ""}{h.eq.toFixed(1)}R
          <small>{h.date || "start"} · trade {h.i}</small>
        </div>
      )}
      <svg ref={ref} viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}
        onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
        {ticks.map((tv) => (
          <g key={tv}>
            <line x1={L} x2={W - R} y1={y(tv)} y2={y(tv)} stroke={GRID} strokeWidth="1" />
            <text x={L - 8} y={y(tv) + 4} textAnchor="end" fontSize="11" fill={AXIS}>
              {tv > 0 ? "+" : ""}{tv}R
            </text>
          </g>
        ))}
        <line x1={L} x2={W - R} y1={y(0)} y2={y(0)} stroke={AXIS} strokeWidth="1" strokeDasharray="4 4" opacity="0.55" />
        <path d={`${line} L${x(pts.length - 1).toFixed(1)},${y(0).toFixed(1)} L${x(0).toFixed(1)},${y(0).toFixed(1)} Z`}
          fill={col} opacity="0.09" />
        <path d={line} fill="none" stroke={col} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={x(pts.length - 1)} cy={y(last)} r="4" fill={col} />
        <text x={x(pts.length - 1) - 6} y={y(last) - 8} textAnchor="end" fontSize="12" fontWeight="800" fill={col === TEAL ? TEAL_DK : RED}>
          {last >= 0 ? "+" : ""}{last.toFixed(1)}R
        </text>
        {h && (
          <g>
            <line x1={x(h.i)} x2={x(h.i)} y1={T} y2={H - B} stroke={AXIS} strokeWidth="1" strokeDasharray="3 3" />
            <circle cx={x(h.i)} cy={y(h.eq)} r="5" fill={col} stroke="#fff" strokeWidth="2" />
          </g>
        )}
        <text x={L} y={H - 8} fontSize="11" fill={AXIS}>trade 1</text>
        <text x={W - R} y={H - 8} textAnchor="end" fontSize="11" fill={AXIS}>trade {pts.length - 1}</text>
      </svg>
    </div>
  );
}

/* ── R-multiple distribution histogram ── */
function RHistogram({ trades }: { trades: Trade[] }) {
  const bins = useMemo(() => rHistogram(trades), [trades]);
  const W = 360, H = 190, L = 10, R = 10, T = 16, B = 26;
  if (!bins.length) return null;
  const maxN = Math.max(...bins.map((b) => b.n), 1);
  const bw = (W - L - R) / bins.length;
  const y = (n: number) => T + (1 - n / maxN) * (H - T - B);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}>
      {bins.map((b, i) => {
        const bx = L + i * bw;
        const isLoss = b.x0 < 0;
        return (
          <g key={i}>
            <title>{`${b.x0}R to ${b.x1}R — ${b.n} trade${b.n === 1 ? "" : "s"}`}</title>
            {b.n > 0 && (
              <>
                <rect x={bx + 1} y={y(b.n)} width={Math.max(bw - 2, 2)} height={H - B - y(b.n)}
                  rx="4" fill={isLoss ? RED : TEAL} opacity="0.92" />
                <text x={bx + bw / 2} y={y(b.n) - 5} textAnchor="middle" fontSize="10.5"
                  fontWeight="700" fill={AXIS}>{b.n}</text>
              </>
            )}
            {Number.isInteger(b.x0) && (
              <text x={bx} y={H - 8} textAnchor="middle" fontSize="10" fill={AXIS}>{b.x0}</text>
            )}
          </g>
        );
      })}
      <line x1={L} x2={W - R} y1={H - B} y2={H - B} stroke={GRID} strokeWidth="1.5" />
    </svg>
  );
}

/* ── Net R by weekday ── */
function WeekdayChart({ trades }: { trades: Trade[] }) {
  const days = useMemo(() => netRByWeekday(trades), [trades]);
  const W = 360, H = 190, L = 12, R = 12, T = 18, B = 26;
  const maxAbs = Math.max(...days.map((d) => Math.abs(d.netR)), 1);
  const y0 = T + (H - T - B) / 2;
  const scale = ((H - T - B) / 2 - 6) / maxAbs;
  const bw = (W - L - R) / days.length;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}>
      <line x1={L} x2={W - R} y1={y0} y2={y0} stroke={AXIS} strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
      {days.map((d, i) => {
        const bx = L + i * bw + bw * 0.22;
        const h = Math.abs(d.netR) * scale;
        const up = d.netR >= 0;
        return (
          <g key={d.day}>
            <title>{`${d.day}: ${d.netR >= 0 ? "+" : ""}${d.netR.toFixed(1)}R over ${d.n} trades (${d.winRate.toFixed(0)}% win)`}</title>
            {d.n > 0 && (
              <>
                <rect x={bx} y={up ? y0 - h : y0} width={bw * 0.56} height={Math.max(h, 2)}
                  rx="4" fill={up ? TEAL : RED} opacity="0.92" />
                <text x={bx + bw * 0.28} y={up ? y0 - h - 6 : y0 + h + 13} textAnchor="middle"
                  fontSize="10.5" fontWeight="700" fill={AXIS}>
                  {d.netR >= 0 ? "+" : ""}{d.netR.toFixed(1)}
                </text>
              </>
            )}
            <text x={bx + bw * 0.28} y={H - 8} textAnchor="middle" fontSize="11" fill={AXIS}>{d.day}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ── Rolling 10-trade win rate ── */
function RollingChart({ trades }: { trades: Trade[] }) {
  const data = useMemo(() => rollingWinRate(trades), [trades]);
  const W = 360, H = 190, L = 34, R = 10, T = 14, B = 26;
  if (data.length < 2) {
    return <div style={{ color: AXIS, fontSize: 12.5, padding: "48px 12px", textAlign: "center" }}>
      Needs 10+ trades — keep logging and your rolling win rate appears here.
    </div>;
  }
  const x = (k: number) => L + (k / (data.length - 1)) * (W - L - R);
  const y = (v: number) => T + (1 - v / 100) * (H - T - B);
  const line = data.map((p, k) => `${k ? "L" : "M"}${x(k).toFixed(1)},${y(p.rate).toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}>
      {[0, 50, 100].map((v) => (
        <g key={v}>
          <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke={v === 50 ? AXIS : GRID}
            strokeWidth="1" strokeDasharray={v === 50 ? "4 4" : undefined} opacity={v === 50 ? 0.5 : 1} />
          <text x={L - 6} y={y(v) + 4} textAnchor="end" fontSize="10.5" fill={AXIS}>{v}%</text>
        </g>
      ))}
      <path d={line} fill="none" stroke={TEAL} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={x(data.length - 1)} cy={y(data[data.length - 1].rate)} r="4" fill={TEAL} />
      <text x={x(data.length - 1) - 6} y={y(data[data.length - 1].rate) - 8} textAnchor="end"
        fontSize="12" fontWeight="800" fill={TEAL_DK}>{data[data.length - 1].rate.toFixed(0)}%</text>
    </svg>
  );
}

function HBars({ data }: { data: Group }) {
  const entries = Object.entries(data).sort((a, b) => b[1].netR - a[1].netR).slice(0, 6);
  if (!entries.length) return <div style={{ color: AXIS, fontSize: 12.5 }}>No data yet.</div>;
  const maxAbs = Math.max(...entries.map(([, v]) => Math.abs(v.netR)), 0.1);
  return (
    <div>
      {entries.map(([k, v]) => (
        <div key={k} className="jr-hbar-row" title={`${k}: ${v.netR >= 0 ? "+" : ""}${v.netR.toFixed(1)}R · ${v.n} trades · ${v.winRate.toFixed(0)}% win`}>
          <div className="jr-hbar-label">{k}</div>
          <div className="jr-hbar-track">
            <div className="jr-hbar-fill" style={{
              width: `${(Math.abs(v.netR) / maxAbs) * 100}%`,
              background: v.netR >= 0 ? TEAL : RED,
            }} />
          </div>
          <div className="jr-hbar-val" style={{ color: v.netR >= 0 ? TEAL_DK : RED }}>
            {v.netR >= 0 ? "+" : ""}{v.netR.toFixed(1)}R
          </div>
          <div className="jr-hbar-wr">{v.winRate.toFixed(0)}%</div>
        </div>
      ))}
    </div>
  );
}

const EMPTY: Omit<Trade, "id"> = {
  date: "", pair: "EUR/USD", direction: "long", session: "London",
  setup: SETUPS[0], riskR: 1, resultR: 0, emotion: "calm", planned: true, notes: "",
};

export default function JournalPage() {
  const [trades, save] = useTrades();
  const [form, setForm] = useState<Omit<Trade, "id">>(EMPTY);
  const [insights, setInsights] = useState<Insight[] | null>(null);
  const [headline, setHeadline] = useState("");
  const [aiBusy, setAiBusy] = useState(false);
  const [aiErr, setAiErr] = useState("");

  useEffect(() => {
    setForm((f) => f.date ? f : { ...f, date: new Date().toISOString().slice(0, 10) });
  }, []);

  const stats = useMemo(() => computeStats(trades), [trades]);
  const bySetup = useMemo(() => groupBy(trades, (t) => t.setup), [trades]);
  const bySession = useMemo(() => groupBy(trades, (t) => t.session), [trades]);
  const byEmotion = useMemo(() => groupBy(trades, (t) => t.emotion), [trades]);
  const ls = useMemo(() => longShortSplit(trades), [trades]);

  const addTrade = () => {
    save([...trades, { ...form, id: crypto.randomUUID(), riskR: Number(form.riskR) || 1, resultR: Number(form.resultR) || 0 }]);
    setForm({ ...EMPTY, date: form.date });
  };

  const PRO_KEY = "pipinsight_pro_session_v1";
  const [proSession, setProSession] = useState<string | null>(null);
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const sid = url.searchParams.get("session_id");
      if (sid) {
        localStorage.setItem(PRO_KEY, sid);
        url.searchParams.delete("session_id");
        window.history.replaceState({}, "", url.toString());
      }
      setProSession(localStorage.getItem(PRO_KEY));
    } catch {}
  }, []);

  const analyze = async () => {
    setAiBusy(true); setAiErr(""); setInsights(null);
    try {
      const r = await fetch("/api/journal/analyze", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ trades, proSession }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Analysis failed");
      setInsights(d.insights); setHeadline(d.headline || "");
    } catch (e) { setAiErr(e instanceof Error ? e.message : "Analysis failed"); }
    setAiBusy(false);
  };

  const upgrade = async () => {
    const r = await fetch("/api/checkout", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ kind: "journal" }),
    });
    const d = await r.json();
    if (d.url) window.location.href = d.url;
    else alert(d.error || "Checkout is launching very soon.");
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
            <Link href="/courses">Courses</Link>
            <Link href="/journal" style={{ color: "var(--teal)", fontWeight: 700 }}>Journal</Link>
            <button onClick={upgrade} className="btn btn-primary btn-sm">Go Pro — £9.99/mo</button>
          </div>
        </div>
      </nav>

      <header className="jr-hero">
        <div className="container">
          <div className="jr-hero-row">
            <div>
              <div className="eyebrow">PIP:INSIGHT TRADE JOURNAL</div>
              <h1>Your Trading, <span style={{ color: "var(--teal)" }}>Measured.</span></h1>
              <p className="jr-hero-sub">
                The journal is free forever on this device. Pro adds the AI analyst — your trading, read back to you.
              </p>
            </div>
            <button className="btn btn-primary btn-lg"
              onClick={proSession ? analyze : upgrade}
              disabled={aiBusy || (proSession !== null && trades.length === 0)}>
              {aiBusy ? "Analysing…"
                : proSession ? "🤖 Run AI Analysis"
                : "🤖 AI Analysis — Pro, £9.99/mo"}
            </button>
          </div>
        </div>
      </header>

      <section className="jr-section">
        <div className="container">

          <div className="jr-tiles">
            <div className="jr-tile"><div className="jr-tile-label">Trades</div><div className="jr-tile-value">{stats.n}</div><div className="jr-tile-sub">{stats.wins}W / {stats.losses}L / {stats.breakeven}BE</div></div>
            <div className="jr-tile"><div className="jr-tile-label">Win rate</div><div className="jr-tile-value">{stats.winRate.toFixed(0)}%</div></div>
            <div className="jr-tile"><div className="jr-tile-label">Net R</div><div className={`jr-tile-value ${stats.netR >= 0 ? "up" : "down"}`}>{stats.netR >= 0 ? "+" : ""}{stats.netR.toFixed(1)}R</div></div>
            <div className="jr-tile"><div className="jr-tile-label">Expectancy</div><div className={`jr-tile-value ${stats.expectancy >= 0 ? "up" : "down"}`}>{stats.expectancy >= 0 ? "+" : ""}{stats.expectancy.toFixed(2)}R</div><div className="jr-tile-sub">per trade</div></div>
            <div className="jr-tile"><div className="jr-tile-label">Profit factor</div><div className="jr-tile-value">{Number.isFinite(stats.profitFactor) ? stats.profitFactor.toFixed(2) : "∞"}</div></div>
            <div className="jr-tile"><div className="jr-tile-label">Max drawdown</div><div className="jr-tile-value down">{stats.maxDrawdownR.toFixed(1)}R</div></div>
            <div className="jr-tile"><div className="jr-tile-label">Streaks</div><div className="jr-tile-value">{stats.bestStreak}W/{stats.worstStreak}L</div><div className="jr-tile-sub">best / worst</div></div>
            <div className="jr-tile"><div className="jr-tile-label">Plan adherence</div><div className={`jr-tile-value ${stats.planAdherence >= 80 ? "up" : "down"}`}>{stats.planAdherence.toFixed(0)}%</div></div>
          </div>

          <div className="jr-grid two">
            <div className="jr-card">
              <div className="jr-card-title">Equity curve <span>cumulative R, hover for detail</span></div>
              <EquityChart trades={trades} />
            </div>
            <div className="jr-card">
              <div className="jr-card-title">AI insights</div>
              <div style={{ maxHeight: 250, overflowY: "auto" }}>
                {aiErr && <div className="jr-insight critical"><b>Analysis unavailable</b>{aiErr}</div>}
                {!insights && !aiErr && (
                  <p style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.65 }}>
                    Run AI Analysis and the model reads your actual history — which setups
                    carry you, which sessions bleed, what your emotions cost — quoting your
                    own numbers back at you.
                  </p>
                )}
                {headline && <p style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>{headline}</p>}
                {insights?.map((i, k) => (
                  <div key={k} className={`jr-insight ${i.severity}`}>
                    <b>{i.title}</b>{i.body}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="jr-grid three">
            <div className="jr-card">
              <div className="jr-card-title">R distribution <span>per 0.5R bin</span></div>
              <RHistogram trades={trades} />
            </div>
            <div className="jr-card">
              <div className="jr-card-title">Net R by weekday</div>
              <WeekdayChart trades={trades} />
            </div>
            <div className="jr-card">
              <div className="jr-card-title">Rolling win rate <span>last 10 trades</span></div>
              <RollingChart trades={trades} />
            </div>
          </div>

          <div className="jr-grid three">
            <div className="jr-card"><div className="jr-card-title">By setup</div><HBars data={bySetup} /></div>
            <div className="jr-card"><div className="jr-card-title">By session</div><HBars data={bySession} /></div>
            <div className="jr-card"><div className="jr-card-title">By emotion</div><HBars data={byEmotion} /></div>
          </div>

          <div className="jr-grid half">
            <div className="jr-card">
              <div className="jr-card-title">Long vs short</div>
              <div style={{ display: "flex", gap: 14 }}>
                {(["long", "short"] as const).map((dir) => {
                  const d = ls[dir];
                  return (
                    <div key={dir} style={{ flex: 1, background: "var(--bg3)", borderRadius: 12, padding: "14px 16px" }}>
                      <div className="jr-tile-label">{dir === "long" ? "▲ Long" : "▼ Short"} · {d.n} trades</div>
                      <div className={`jr-tile-value ${d.netR >= 0 ? "up" : "down"}`} style={{ fontSize: 21 }}>
                        {d.netR >= 0 ? "+" : ""}{d.netR.toFixed(1)}R
                      </div>
                      <div className="jr-tile-sub">{d.winRate.toFixed(0)}% win rate</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="jr-card">
              <div className="jr-card-title">Log a trade</div>
              <div className="jr-form">
                <input type="date" className="jr-input" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                <select className="jr-select" value={form.pair} onChange={(e) => setForm({ ...form, pair: e.target.value })}>
                  {PAIRS.map((p) => <option key={p}>{p}</option>)}
                </select>
                <select className="jr-select" value={form.direction} onChange={(e) => setForm({ ...form, direction: e.target.value as Trade["direction"] })}>
                  <option value="long">Long</option><option value="short">Short</option>
                </select>
                <select className="jr-select" value={form.session} onChange={(e) => setForm({ ...form, session: e.target.value as Trade["session"] })}>
                  {["Asian", "London", "New York", "Other"].map((s) => <option key={s}>{s}</option>)}
                </select>
                <select className="jr-select" value={form.setup} onChange={(e) => setForm({ ...form, setup: e.target.value })}>
                  {SETUPS.map((s) => <option key={s}>{s}</option>)}
                </select>
                <input type="number" step="0.1" className="jr-input" placeholder="Result (R)" value={form.resultR}
                  onChange={(e) => setForm({ ...form, resultR: Number(e.target.value) })} />
                <select className="jr-select" value={form.emotion} onChange={(e) => setForm({ ...form, emotion: e.target.value as Trade["emotion"] })}>
                  {["calm", "confident", "fomo", "revenge", "anxious", "bored"].map((s) => <option key={s}>{s}</option>)}
                </select>
                <label className="jr-check">
                  <input type="checkbox" checked={form.planned} onChange={(e) => setForm({ ...form, planned: e.target.checked })} />
                  In plan
                </label>
              </div>
              <div className="jr-notes-row">
                <input className="jr-input" placeholder="Notes — what did you see, do, feel?"
                  value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                <button className="btn btn-primary" onClick={addTrade}>Add</button>
              </div>
            </div>
          </div>

          <div className="jr-card">
            <div className="jr-card-title">
              Trade log <span>{trades.length} records · stored on this device</span>
              <button onClick={() => { if (confirm("Clear all trades on this device?")) save([]); }}
                style={{ float: "right", background: "none", border: "none", color: RED, fontWeight: 700, cursor: "pointer", fontSize: 12 }}>
                clear all
              </button>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table className="jr-table">
                <thead>
                  <tr>{["Date", "Pair", "Dir", "Session", "Setup", "R", "Emotion", "Plan", "Notes", ""].map((h, i) => <th key={i}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {[...trades].sort((a, b) => b.date.localeCompare(a.date)).map((t) => (
                    <tr key={t.id}>
                      <td style={{ color: "var(--muted)" }}>{t.date}</td>
                      <td style={{ fontWeight: 700 }}>{t.pair}</td>
                      <td className={t.direction === "long" ? "pos" : "neg"}>{t.direction.toUpperCase()}</td>
                      <td style={{ color: "var(--muted)" }}>{t.session}</td>
                      <td style={{ color: "var(--muted)" }}>{t.setup}</td>
                      <td className={t.resultR > 0 ? "pos" : t.resultR < 0 ? "neg" : ""}>
                        {t.resultR > 0 ? "+" : ""}{t.resultR.toFixed(1)}
                      </td>
                      <td style={{ color: "var(--muted)" }}>{t.emotion}</td>
                      <td>{t.planned ? "✓" : <span style={{ color: "#d97706" }}>✗</span>}</td>
                      <td style={{ color: "#94a3b8", maxWidth: 240, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.notes}</td>
                      <td><button onClick={() => save(trades.filter((x) => x.id !== t.id))}
                        style={{ background: "none", border: "none", color: "#cbd5e1", cursor: "pointer" }}>✕</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="jr-disclaimer">
            The journal describes your own trading history. It never provides trade instructions
            or financial advice. Trading involves substantial risk of loss.
          </p>
        </div>
      </section>
    </div>
  );
}
