// PIP:Insight Journal — core types + statistics engine (client-safe)

export type Trade = {
  id: string;
  date: string;          // ISO date
  pair: string;
  direction: "long" | "short";
  session: "Asian" | "London" | "New York" | "Other";
  setup: string;         // e.g. "S/R bounce", "Break & retest"
  riskR: number;         // planned risk in R (usually 1)
  resultR: number;       // outcome in R multiples (+2.1, -1, 0)
  emotion: "calm" | "confident" | "fomo" | "revenge" | "anxious" | "bored";
  planned: boolean;      // was this trade in the plan?
  notes: string;
};

export type Stats = {
  n: number;
  wins: number;
  losses: number;
  breakeven: number;
  winRate: number;       // %
  netR: number;
  avgWinR: number;
  avgLossR: number;
  profitFactor: number;
  expectancy: number;    // R per trade
  maxDrawdownR: number;
  bestStreak: number;
  worstStreak: number;
  planAdherence: number; // %
};

export function computeStats(trades: Trade[]): Stats {
  const n = trades.length;
  const wins = trades.filter((t) => t.resultR > 0);
  const losses = trades.filter((t) => t.resultR < 0);
  const be = n - wins.length - losses.length;
  const grossWin = wins.reduce((s, t) => s + t.resultR, 0);
  const grossLoss = Math.abs(losses.reduce((s, t) => s + t.resultR, 0));
  const netR = grossWin - grossLoss;

  // equity path for drawdown
  let eq = 0, peak = 0, maxDD = 0;
  let cur = 0, best = 0, worst = 0;
  for (const t of [...trades].sort((a, b) => a.date.localeCompare(b.date))) {
    eq += t.resultR;
    peak = Math.max(peak, eq);
    maxDD = Math.max(maxDD, peak - eq);
    if (t.resultR > 0) { cur = cur > 0 ? cur + 1 : 1; best = Math.max(best, cur); }
    else if (t.resultR < 0) { cur = cur < 0 ? cur - 1 : -1; worst = Math.min(worst, cur); }
  }

  return {
    n,
    wins: wins.length,
    losses: losses.length,
    breakeven: be,
    winRate: n ? (wins.length / n) * 100 : 0,
    netR,
    avgWinR: wins.length ? grossWin / wins.length : 0,
    avgLossR: losses.length ? -grossLoss / losses.length : 0,
    profitFactor: grossLoss > 0 ? grossWin / grossLoss : grossWin > 0 ? Infinity : 0,
    expectancy: n ? netR / n : 0,
    maxDrawdownR: maxDD,
    bestStreak: best,
    worstStreak: Math.abs(worst),
    planAdherence: n ? (trades.filter((t) => t.planned).length / n) * 100 : 0,
  };
}

export function equityCurve(trades: Trade[]): number[] {
  let eq = 0;
  return [0, ...[...trades]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((t) => (eq += t.resultR))];
}

export function groupBy<K extends string>(
  trades: Trade[], key: (t: Trade) => K
): Record<K, { n: number; netR: number; winRate: number }> {
  const out = {} as Record<K, { n: number; netR: number; winRate: number }>;
  for (const t of trades) {
    const k = key(t);
    out[k] ??= { n: 0, netR: 0, winRate: 0 };
    out[k].n += 1;
    out[k].netR += t.resultR;
  }
  for (const k in out) {
    const g = trades.filter((t) => key(t) === (k as K));
    out[k as K].winRate = (g.filter((t) => t.resultR > 0).length / g.length) * 100;
  }
  return out;
}

export const SETUPS = [
  "S/R bounce", "Break & retest", "Trend pullback", "Range fade",
  "News momentum", "Supply/Demand zone", "Other",
];

export const PAIRS = [
  "EUR/USD", "GBP/USD", "USD/JPY", "GBP/JPY", "AUD/USD", "NZD/USD",
  "USD/CAD", "USD/CHF", "XAU/USD",
];

export const DEMO_TRADES: Trade[] = [
  { id: "d1", date: "2026-07-06", pair: "EUR/USD", direction: "short", session: "London", setup: "Break & retest", riskR: 1, resultR: 2.1, emotion: "calm", planned: true, notes: "Clean retest of broken support." },
  { id: "d2", date: "2026-07-07", pair: "XAU/USD", direction: "long", session: "New York", setup: "S/R bounce", riskR: 1, resultR: -1, emotion: "confident", planned: true, notes: "Level held on first touch, stopped on spike." },
  { id: "d3", date: "2026-07-08", pair: "GBP/USD", direction: "long", session: "London", setup: "Trend pullback", riskR: 1, resultR: 1.6, emotion: "calm", planned: true, notes: "HL in uptrend, took partials at 1R." },
  { id: "d4", date: "2026-07-09", pair: "USD/JPY", direction: "short", session: "Asian", setup: "Range fade", riskR: 1, resultR: -1, emotion: "bored", planned: false, notes: "Wasn't in the plan. Chop." },
  { id: "d5", date: "2026-07-10", pair: "EUR/USD", direction: "long", session: "New York", setup: "S/R bounce", riskR: 1, resultR: 2.8, emotion: "calm", planned: true, notes: "News flush into weekly support." },
  { id: "d6", date: "2026-06-29", pair: "GBP/JPY", direction: "short", session: "London", setup: "Break & retest", riskR: 1, resultR: 1.9, emotion: "calm", planned: true, notes: "Retest of broken range low." },
  { id: "d7", date: "2026-06-30", pair: "EUR/USD", direction: "long", session: "London", setup: "Trend pullback", riskR: 1, resultR: -1, emotion: "confident", planned: true, notes: "HL failed, structure broke against." },
  { id: "d8", date: "2026-07-01", pair: "XAU/USD", direction: "long", session: "New York", setup: "Supply/Demand zone", riskR: 1, resultR: 3.2, emotion: "calm", planned: true, notes: "Fresh demand zone, first return." },
  { id: "d9", date: "2026-07-01", pair: "USD/CAD", direction: "short", session: "New York", setup: "Range fade", riskR: 1, resultR: -1, emotion: "fomo", planned: false, notes: "Chased after missing the entry." },
  { id: "d10", date: "2026-07-02", pair: "GBP/USD", direction: "short", session: "London", setup: "Break & retest", riskR: 1, resultR: 0, emotion: "calm", planned: true, notes: "Scratched at breakeven, momentum faded." },
  { id: "d11", date: "2026-07-03", pair: "USD/JPY", direction: "long", session: "Asian", setup: "Trend pullback", riskR: 1, resultR: 1.4, emotion: "calm", planned: true, notes: "Clean HL in Tokyo session." },
  { id: "d12", date: "2026-07-03", pair: "EUR/USD", direction: "short", session: "New York", setup: "News momentum", riskR: 1, resultR: -1, emotion: "anxious", planned: false, notes: "NFP chop, shouldn't have been in it." },
  { id: "d13", date: "2026-07-07", pair: "GBP/JPY", direction: "long", session: "London", setup: "S/R bounce", riskR: 1, resultR: 2.4, emotion: "calm", planned: true, notes: "Weekly support held, textbook." },
  { id: "d14", date: "2026-07-09", pair: "XAU/USD", direction: "short", session: "London", setup: "Supply/Demand zone", riskR: 1, resultR: 1.1, emotion: "confident", planned: true, notes: "Supply zone rejection, partials early." },
];

// ── chart data helpers ──────────────────────────────────────────────────────
export function rHistogram(trades: Trade[], binSize = 0.5) {
  if (!trades.length) return [] as { x0: number; x1: number; n: number }[];
  const rs = trades.map((t) => t.resultR);
  const lo = Math.floor(Math.min(...rs, -1) / binSize) * binSize;
  const hi = Math.ceil(Math.max(...rs, 1) / binSize) * binSize;
  const bins: { x0: number; x1: number; n: number }[] = [];
  for (let x = lo; x < hi; x += binSize) {
    bins.push({
      x0: +x.toFixed(2), x1: +(x + binSize).toFixed(2),
      n: rs.filter((r) => r >= x && r < x + binSize).length,
    });
  }
  return bins;
}

export function netRByWeekday(trades: Trade[]) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  return days.map((d, i) => {
    const g = trades.filter((t) => {
      const wd = new Date(t.date + "T12:00:00Z").getUTCDay();
      return wd === i + 1;
    });
    return {
      day: d, n: g.length,
      netR: g.reduce((s, t) => s + t.resultR, 0),
      winRate: g.length ? (g.filter((t) => t.resultR > 0).length / g.length) * 100 : 0,
    };
  });
}

export function rollingWinRate(trades: Trade[], window = 10) {
  const sorted = [...trades].sort((a, b) => a.date.localeCompare(b.date));
  const out: { i: number; rate: number }[] = [];
  for (let i = window - 1; i < sorted.length; i++) {
    const slice = sorted.slice(i - window + 1, i + 1);
    out.push({ i: i + 1, rate: (slice.filter((t) => t.resultR > 0).length / window) * 100 });
  }
  return out;
}

export function longShortSplit(trades: Trade[]) {
  const mk = (dir: Trade["direction"]) => {
    const g = trades.filter((t) => t.direction === dir);
    return {
      n: g.length,
      netR: g.reduce((s, t) => s + t.resultR, 0),
      winRate: g.length ? (g.filter((t) => t.resultR > 0).length / g.length) * 100 : 0,
    };
  };
  return { long: mk("long"), short: mk("short") };
}

export function equityWithDates(trades: Trade[]) {
  let eq = 0;
  const sorted = [...trades].sort((a, b) => a.date.localeCompare(b.date));
  return [{ i: 0, date: "", eq: 0 },
    ...sorted.map((t, i) => ({ i: i + 1, date: t.date, eq: +(eq += t.resultR).toFixed(2) }))];
}

/* ── v2 additions: heatmap, discipline engine, playbook ── */

export function dayNet(trades: Trade[]): Record<string, { netR: number; n: number }> {
  const out: Record<string, { netR: number; n: number }> = {};
  for (const t of trades) {
    const d = (out[t.date] ||= { netR: 0, n: 0 });
    d.netR += t.resultR;
    d.n += 1;
  }
  return out;
}

export type Discipline = {
  score: number;
  components: { label: string; pct: number; weight: number; detail: string }[];
  insights: string[];
};

export function discipline(trades: Trade[]): Discipline {
  if (!trades.length) return { score: 0, components: [], insights: [] };
  const n = trades.length;
  const planned = trades.filter(t => t.planned).length / n;
  const calm = trades.filter(t => !["fomo", "revenge"].includes(t.emotion)).length / n;
  const days = dayNet(trades);
  const overDays = Object.values(days).filter(d => d.n > 5).length;
  const overtrading = Math.max(0, 1 - overDays / Math.max(1, Object.keys(days).length) * 2);
  const risks = trades.map(t => t.riskR || 1);
  const mean = risks.reduce((a, b) => a + b, 0) / n;
  const sd = Math.sqrt(risks.reduce((a, b) => a + (b - mean) ** 2, 0) / n);
  const riskConsistency = sd <= 0.15 ? 1 : sd <= 0.4 ? 0.6 : 0.25;
  // reaction to losses: of trades taken same day AFTER a loss, share planned
  const byDay: Record<string, Trade[]> = {};
  for (const t of trades) (byDay[t.date] ||= []).push(t);
  let after = 0, afterPlanned = 0;
  for (const list of Object.values(byDay)) {
    for (let i = 1; i < list.length; i++) {
      if (list[i - 1].resultR < 0) {
        after++;
        if (list[i].planned && list[i].emotion !== "revenge") afterPlanned++;
      }
    }
  }
  const lossReaction = after ? afterPlanned / after : 1;
  const comps = [
    { label: "Planned trades", pct: planned, weight: 35,
      detail: `${Math.round(planned * 100)}% of trades were in the plan` },
    { label: "Emotional control", pct: calm, weight: 25,
      detail: `${Math.round((1 - calm) * 100)}% tagged FOMO or revenge` },
    { label: "Reaction to losses", pct: lossReaction, weight: 20,
      detail: after ? `${afterPlanned}/${after} post-loss trades stayed disciplined`
                    : "no post-loss trades logged" },
    { label: "Overtrading", pct: overtrading, weight: 10,
      detail: overDays ? `${overDays} day(s) over 5 trades` : "no overtraded days" },
    { label: "Risk consistency", pct: riskConsistency, weight: 10,
      detail: `risk size deviation ${sd.toFixed(2)}R` },
  ];
  const score = Math.round(comps.reduce((a, c) => a + c.pct * c.weight, 0));
  const insights: string[] = [];
  const unplanned = trades.filter(t => !t.planned);
  if (unplanned.length) {
    const upR = unplanned.reduce((a, t) => a + t.resultR, 0);
    insights.push(`Unplanned trades: ${unplanned.length}, net ${upR >= 0 ? "+" : ""}${upR.toFixed(1)}R — ${upR < 0 ? "the leak is real" : "lucky, not good"}.`);
  }
  const rev = trades.filter(t => t.emotion === "revenge");
  if (rev.length) {
    const rr = rev.reduce((a, t) => a + t.resultR, 0);
    insights.push(`Revenge-tagged trades: ${rev.length} for ${rr >= 0 ? "+" : ""}${rr.toFixed(1)}R.`);
  }
  if (overDays) insights.push(`Heaviest days hurt: check the calendar's busiest squares.`);
  return { score, components: comps, insights };
}

export type PlaySetup = { setup: string; n: number; winRate: number;
  netR: number; expectancy: number };

export function playbook(trades: Trade[]): PlaySetup[] {
  const by: Record<string, Trade[]> = {};
  for (const t of trades) (by[t.setup] ||= []).push(t);
  return Object.entries(by).map(([setup, list]) => {
    const wins = list.filter(t => t.resultR > 0).length;
    const netR = list.reduce((a, t) => a + t.resultR, 0);
    return { setup, n: list.length, winRate: wins / list.length * 100,
             netR, expectancy: netR / list.length };
  }).sort((a, b) => b.netR - a.netR);
}
