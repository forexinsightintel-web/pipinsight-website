"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  computeStats, equityCurve, groupBy, DEMO_TRADES, PAIRS, SETUPS,
  type Trade,
} from "../../lib/journal";

const LS_KEY = "pipinsight_journal_v1";

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

function Tile({ label, value, sub, tone }: {
  label: string; value: string; sub?: string; tone?: "up" | "down";
}) {
  const col = tone === "up" ? "text-emerald-400" : tone === "down" ? "text-rose-400" : "text-slate-100";
  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
      <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">{label}</div>
      <div className={`text-2xl font-black mt-1 ${col}`}>{value}</div>
      {sub && <div className="text-[11px] text-slate-500 mt-0.5">{sub}</div>}
    </div>
  );
}

function Equity({ trades }: { trades: Trade[] }) {
  const pts = equityCurve(trades);
  if (pts.length < 2) return <div className="text-slate-600 text-sm p-8 text-center">Log trades to draw your equity curve.</div>;
  const w = 720, h = 180, pad = 8;
  const min = Math.min(...pts), max = Math.max(...pts);
  const span = max - min || 1;
  const x = (i: number) => pad + (i / (pts.length - 1)) * (w - 2 * pad);
  const y = (v: number) => h - pad - ((v - min) / span) * (h - 2 * pad);
  const d = pts.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const up = pts[pts.length - 1] >= 0;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      <line x1={pad} x2={w - pad} y1={y(0)} y2={y(0)} stroke="#334155" strokeDasharray="4 4" strokeWidth="1" />
      <path d={`${d} L${x(pts.length - 1).toFixed(1)},${h - pad} L${x(0).toFixed(1)},${h - pad} Z`}
        fill={up ? "rgba(52,211,153,0.08)" : "rgba(251,113,133,0.08)"} />
      <path d={d} fill="none" stroke={up ? "#34d399" : "#fb7185"} strokeWidth="2.5"
        strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function Bars({ data }: { data: Group }) {
  const entries = Object.entries(data).sort((a, b) => b[1].netR - a[1].netR).slice(0, 6);
  if (!entries.length) return <div className="text-slate-600 text-xs">No data yet.</div>;
  const maxAbs = Math.max(...entries.map(([, v]) => Math.abs(v.netR)), 0.1);
  return (
    <div className="space-y-2">
      {entries.map(([k, v]) => (
        <div key={k} className="flex items-center gap-2 text-xs">
          <div className="w-28 truncate text-slate-400">{k}</div>
          <div className="flex-1 h-4 bg-slate-800/80 rounded overflow-hidden flex">
            <div className={`h-full ${v.netR >= 0 ? "bg-emerald-500/80" : "bg-rose-500/80"}`}
              style={{ width: `${(Math.abs(v.netR) / maxAbs) * 100}%` }} />
          </div>
          <div className={`w-14 text-right font-bold ${v.netR >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
            {v.netR >= 0 ? "+" : ""}{v.netR.toFixed(1)}R
          </div>
          <div className="w-12 text-right text-slate-500">{v.winRate.toFixed(0)}%</div>
        </div>
      ))}
    </div>
  );
}

const EMPTY: Omit<Trade, "id"> = {
  date: "", pair: "EUR/USD",
  direction: "long", session: "London", setup: SETUPS[0], riskR: 1,
  resultR: 0, emotion: "calm", planned: true, notes: "",
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

  const addTrade = () => {
    save([...trades, { ...form, id: crypto.randomUUID(), riskR: Number(form.riskR) || 1, resultR: Number(form.resultR) || 0 }]);
    setForm({ ...EMPTY, date: form.date });
  };

  const analyze = async () => {
    setAiBusy(true); setAiErr(""); setInsights(null);
    try {
      const r = await fetch("/api/journal/analyze", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ trades }),
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
    else alert(d.error || "Checkout unavailable");
  };

  const sevStyle: Record<string, string> = {
    critical: "border-rose-500/50 bg-rose-500/10",
    warning: "border-amber-500/50 bg-amber-500/10",
    info: "border-sky-500/40 bg-sky-500/10",
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/"><Image src="/logo.png" alt="PIP:Insight" width={140} height={38} className="h-9 w-auto" /></Link>
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="px-3 py-1.5 rounded-lg text-slate-400 hover:bg-slate-800">Today&apos;s Analysis</Link>
            <Link href="/courses" className="px-3 py-1.5 rounded-lg text-slate-400 hover:bg-slate-800">Courses</Link>
            <span className="px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 font-semibold">Journal</span>
            <button onClick={upgrade} className="ml-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-1.5 rounded-lg">
              Go Pro — £9.99/mo
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-white">Trade Journal</h1>
            <p className="text-sm text-slate-500">Free on this device. Pro adds AI analysis history, cloud sync and unlimited records.</p>
          </div>
          <button onClick={analyze} disabled={aiBusy || trades.length === 0}
            className="bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 text-white font-bold px-5 py-2.5 rounded-xl">
            {aiBusy ? "Analysing…" : "🤖 AI Analysis"}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          <Tile label="Trades" value={`${stats.n}`} />
          <Tile label="Win rate" value={`${stats.winRate.toFixed(0)}%`} sub={`${stats.wins}W / ${stats.losses}L / ${stats.breakeven}BE`} />
          <Tile label="Net R" value={`${stats.netR >= 0 ? "+" : ""}${stats.netR.toFixed(1)}R`} tone={stats.netR >= 0 ? "up" : "down"} />
          <Tile label="Expectancy" value={`${stats.expectancy >= 0 ? "+" : ""}${stats.expectancy.toFixed(2)}R`} sub="per trade" tone={stats.expectancy >= 0 ? "up" : "down"} />
          <Tile label="Profit factor" value={Number.isFinite(stats.profitFactor) ? stats.profitFactor.toFixed(2) : "∞"} />
          <Tile label="Max drawdown" value={`${stats.maxDrawdownR.toFixed(1)}R`} tone="down" />
          <Tile label="Streaks" value={`${stats.bestStreak}W / ${stats.worstStreak}L`} sub="best / worst" />
          <Tile label="Plan adherence" value={`${stats.planAdherence.toFixed(0)}%`} tone={stats.planAdherence >= 80 ? "up" : "down"} />
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-slate-900/70 border border-slate-800 rounded-xl p-4">
            <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2">Equity curve (R)</div>
            <Equity trades={trades} />
          </div>
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 space-y-2 overflow-y-auto max-h-72">
            <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">AI insights</div>
            {aiErr && <div className="text-rose-400 text-sm">{aiErr}</div>}
            {!insights && !aiErr && <div className="text-slate-600 text-sm">Run AI Analysis to read the patterns in your trading — setups, sessions, psychology, plan adherence.</div>}
            {headline && <div className="text-slate-200 text-sm font-semibold">{headline}</div>}
            {insights?.map((i, k) => (
              <div key={k} className={`border rounded-lg p-2.5 text-xs ${sevStyle[i.severity] ?? sevStyle.info}`}>
                <div className="font-bold text-slate-100">{i.title}</div>
                <div className="text-slate-300 mt-0.5">{i.body}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
            <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-3">By setup</div>
            <Bars data={bySetup} />
          </div>
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
            <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-3">By session</div>
            <Bars data={bySession} />
          </div>
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
            <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-3">By emotion</div>
            <Bars data={byEmotion} />
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
          <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-3">Log a trade</div>
          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2 text-sm">
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-2 col-span-2 lg:col-span-2" />
            <select value={form.pair} onChange={(e) => setForm({ ...form, pair: e.target.value })}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-2">
              {PAIRS.map((p) => <option key={p}>{p}</option>)}
            </select>
            <select value={form.direction} onChange={(e) => setForm({ ...form, direction: e.target.value as Trade["direction"] })}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-2">
              <option value="long">Long</option><option value="short">Short</option>
            </select>
            <select value={form.session} onChange={(e) => setForm({ ...form, session: e.target.value as Trade["session"] })}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-2">
              {["Asian", "London", "New York", "Other"].map((s) => <option key={s}>{s}</option>)}
            </select>
            <select value={form.setup} onChange={(e) => setForm({ ...form, setup: e.target.value })}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-2 col-span-2">
              {SETUPS.map((s) => <option key={s}>{s}</option>)}
            </select>
            <input type="number" step="0.1" placeholder="Result (R)" value={form.resultR}
              onChange={(e) => setForm({ ...form, resultR: Number(e.target.value) })}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-2" />
            <select value={form.emotion} onChange={(e) => setForm({ ...form, emotion: e.target.value as Trade["emotion"] })}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-2">
              {["calm", "confident", "fomo", "revenge", "anxious", "bored"].map((s) => <option key={s}>{s}</option>)}
            </select>
            <label className="flex items-center gap-1.5 px-2 text-slate-400">
              <input type="checkbox" checked={form.planned}
                onChange={(e) => setForm({ ...form, planned: e.target.checked })} /> In plan
            </label>
          </div>
          <div className="flex gap-2 mt-2">
            <input placeholder="Notes — what did you see, what did you do, what did you feel?"
              value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm" />
            <button onClick={addTrade} className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 rounded-lg">Add</button>
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 overflow-x-auto">
          <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-3">
            Trade log ({trades.length})
            <button onClick={() => { if (confirm("Clear all trades on this device?")) save([]); }}
              className="float-right text-rose-500/70 hover:text-rose-400 normal-case font-semibold">clear</button>
          </div>
          <table className="w-full text-xs">
            <thead className="text-slate-500 text-left">
              <tr>{["Date", "Pair", "Dir", "Session", "Setup", "R", "Emotion", "Plan", "Notes", ""].map((h, i) => <th key={i} className="py-1.5 pr-3 font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody>
              {[...trades].sort((a, b) => b.date.localeCompare(a.date)).map((t) => (
                <tr key={t.id} className="border-t border-slate-800/70">
                  <td className="py-1.5 pr-3 text-slate-400">{t.date}</td>
                  <td className="pr-3 font-semibold text-slate-200">{t.pair}</td>
                  <td className={`pr-3 font-bold ${t.direction === "long" ? "text-emerald-400" : "text-rose-400"}`}>{t.direction.toUpperCase()}</td>
                  <td className="pr-3 text-slate-400">{t.session}</td>
                  <td className="pr-3 text-slate-400">{t.setup}</td>
                  <td className={`pr-3 font-black ${t.resultR > 0 ? "text-emerald-400" : t.resultR < 0 ? "text-rose-400" : "text-slate-400"}`}>
                    {t.resultR > 0 ? "+" : ""}{t.resultR.toFixed(1)}
                  </td>
                  <td className="pr-3 text-slate-400">{t.emotion}</td>
                  <td className="pr-3">{t.planned ? "✓" : <span className="text-amber-400">✗</span>}</td>
                  <td className="pr-3 text-slate-500 max-w-[260px] truncate">{t.notes}</td>
                  <td><button onClick={() => save(trades.filter((x) => x.id !== t.id))} className="text-slate-600 hover:text-rose-400">✕</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[11px] text-slate-600 text-center pb-6">
          The journal describes your own trading history. It never provides trade instructions or financial advice.
          Trading involves substantial risk of loss.
        </p>
      </main>
    </div>
  );
}
