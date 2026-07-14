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
];
