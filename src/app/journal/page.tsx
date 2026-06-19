import Image from "next/image";
import Link from "next/link";

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.png" alt="PIP:Insight" width={160} height={44} className="h-10 w-auto" />
          </Link>
          <div className="flex items-center gap-3">
            <button className="text-sm text-gray-500 font-medium px-4 py-2 rounded-lg hover:bg-gray-100">Today's Analysis</button>
            <button className="text-sm text-emerald-600 font-semibold px-4 py-2 rounded-lg bg-emerald-50">My Journal</button>
            <button className="text-sm text-gray-500 font-medium px-4 py-2 rounded-lg hover:bg-gray-100">PIP Feed</button>
            <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">+ Upload CSV</button>
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">J</div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16 min-h-screen">

        {/* SIDEBAR */}
        <div className="w-56 bg-white border-r border-gray-100 fixed top-16 bottom-0 p-4 overflow-y-auto">
          <div className="mb-6">
            <div className="text-[10px] font-bold text-gray-400 tracking-widest uppercase px-2 mb-2">Overview</div>
            <a className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-emerald-50 text-emerald-700 font-semibold text-sm mb-1 cursor-pointer">
              <span>📊</span> Dashboard
            </a>
            <a className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 text-sm mb-1 cursor-pointer">
              <span>📅</span> PIP Feed
              <span className="ml-auto bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">9</span>
            </a>
            <a className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 text-sm mb-1 cursor-pointer">
              <span>🤖</span> AI Insights
              <span className="ml-auto bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">3</span>
            </a>
          </div>
          <div className="mb-6">
            <div className="text-[10px] font-bold text-gray-400 tracking-widest uppercase px-2 mb-2">My Trades</div>
            {[["📋", "Trade Log"], ["📈", "Performance"], ["🧠", "Psychology"], ["⚠️", "Mistakes"]].map(([icon, label]) => (
              <a key={label} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 text-sm mb-1 cursor-pointer">
                <span>{icon}</span> {label}
                {label === "Mistakes" && <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">5</span>}
              </a>
            ))}
          </div>
          <div>
            <div className="text-[10px] font-bold text-gray-400 tracking-widest uppercase px-2 mb-2">Analysis</div>
            {[["💱", "By Pair"], ["🕐", "By Session"], ["📆", "By Day"]].map(([icon, label]) => (
              <a key={label} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 text-sm mb-1 cursor-pointer">
                <span>{icon}</span> {label}
              </a>
            ))}
          </div>
        </div>

        {/* MAIN */}
        <div className="ml-56 flex-1 p-8">

          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">My Trading Dashboard</h1>
              <p className="text-sm text-gray-400 mt-1">847 trades analysed · Last updated 19 Jun 2026</p>
            </div>
            <button className="bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-600 transition-colors">
              + Upload New CSV
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            {[
              { label: "Win Rate", value: "58.4%", color: "text-emerald-600", change: "↑ +3.2% vs last month", up: true, highlight: true },
              { label: "Total Pips", value: "+847", color: "text-emerald-600", change: "↑ This month", up: true },
              { label: "Avg R:R", value: "1 : 1.8", color: "text-amber-600", change: "Target: 1:2.0", up: null },
              { label: "Trades Taken", value: "47", color: "text-gray-900", change: "↑ 12 vs target", up: false },
              { label: "Profit Factor", value: "1.94", color: "text-emerald-600", change: "↑ Good", up: true },
            ].map(stat => (
              <div key={stat.label} className={`rounded-2xl p-5 border ${stat.highlight ? 'border-emerald-200 bg-emerald-50' : 'border-gray-200 bg-white'}`}>
                <div className="text-[10px] font-bold text-gray-400 tracking-widest uppercase font-mono mb-2">{stat.label}</div>
                <div className={`text-3xl font-extrabold tracking-tight ${stat.color}`}>{stat.value}</div>
                <div className={`text-xs mt-1 font-mono ${stat.up === true ? 'text-emerald-500' : stat.up === false ? 'text-red-400' : 'text-gray-400'}`}>{stat.change}</div>
              </div>
            ))}
          </div>

          {/* AI INSIGHT */}
          <div className="rounded-2xl p-6 mb-6 border border-emerald-200" style={{background: 'linear-gradient(135deg, #EBF8F3, #F0F8FF)'}}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🤖</span>
              <div>
                <div className="font-bold text-emerald-700">Claude's Analysis of Your Last 30 Days</div>
                <div className="text-xs text-gray-400 font-mono">Based on 47 trades · Updated 19 Jun 2026</div>
              </div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              Your overall performance is <strong className="text-emerald-600">improving</strong> — win rate up 3.2% and profit factor above 1.9 is solid. However, three clear patterns are costing you money every month.
            </p>
            <div className="space-y-3">
              {[
                { color: "bg-red-500", text: <><strong className="text-red-600">Friday Overtrading:</strong> You place 31% of your trades on Fridays but your Friday win rate is only 38%. Avoiding trades after 14:00 UK on Fridays would have saved you 124 pips this month.</> },
                { color: "bg-red-500", text: <><strong className="text-red-600">Cutting Winners Early:</strong> Your average winner closes at 1.4R despite setting 2.0R targets. You're manually closing 67% of winning trades before TP. Letting winners run would add ~200 pips/month.</> },
                { color: "bg-amber-500", text: <><strong className="text-amber-600">Revenge Trading:</strong> After a losing trade, you re-enter within 45 minutes in 71% of cases. These revenge trades have a 29% win rate. A 2-hour cooling off rule is strongly recommended.</> },
                { color: "bg-emerald-500", text: <><strong className="text-emerald-600">Strength:</strong> Your London session trades (08:00–12:00 UK) have a 71% win rate — significantly above your average. Consider concentrating your trading here only.</> },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className={`w-1.5 h-1.5 rounded-full ${item.color} mt-2 flex-shrink-0`}></div>
                  <p className="text-sm text-gray-700 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* TRADE TABLE + BREAKDOWN */}
          <div className="grid grid-cols-3 gap-5 mb-6">
            <div className="col-span-2 bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-900">Recent Trades</h3>
                <a className="text-sm text-emerald-600 font-semibold cursor-pointer">View all 47 →</a>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    {["Pair", "Dir", "Entry", "Exit", "Pips", "Result", "AI"].map(h => (
                      <th key={h} className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest pb-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { pair: "GBP/USD", dir: "SHORT", bull: false, entry: "1.33500", exit: "1.32600", pips: "+90", result: "WIN" },
                    { pair: "EUR/USD", dir: "SHORT", bull: false, entry: "1.14800", exit: "1.14900", pips: "-10", result: "LOSS" },
                    { pair: "XAU/USD", dir: "LONG", bull: true, entry: "2318.00", exit: "2341.50", pips: "+235", result: "WIN" },
                    { pair: "USD/JPY", dir: "LONG", bull: true, entry: "160.950", exit: "—", pips: "+40", result: "OPEN" },
                    { pair: "GBP/JPY", dir: "LONG", bull: true, entry: "212.500", exit: "211.800", pips: "-70", result: "LOSS" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 font-mono font-bold text-gray-900">{row.pair}</td>
                      <td className="py-3"><span className={`text-xs font-bold font-mono ${row.bull ? 'text-emerald-600' : 'text-red-500'}`}>{row.bull ? '▲' : '▼'} {row.dir}</span></td>
                      <td className="py-3 font-mono text-xs text-gray-600">{row.entry}</td>
                      <td className="py-3 font-mono text-xs text-gray-600">{row.exit}</td>
                      <td className={`py-3 font-mono font-bold text-xs ${row.pips.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>{row.pips}</td>
                      <td className="py-3">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded font-mono ${
                          row.result === 'WIN' ? 'bg-emerald-50 text-emerald-700' :
                          row.result === 'LOSS' ? 'bg-red-50 text-red-600' :
                          'bg-amber-50 text-amber-600'
                        }`}>{row.result}</span>
                      </td>
                      <td className="py-3"><button className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded font-mono hover:bg-emerald-100">View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-2xl p-5">
                <h3 className="font-bold text-gray-900 mb-4 text-sm">Win Rate by Pair</h3>
                <div className="space-y-3">
                  {[
                    { pair: "XAU/USD", pct: 78, color: "bg-emerald-500" },
                    { pair: "USD/CHF", pct: 71, color: "bg-emerald-500" },
                    { pair: "GBP/USD", pct: 64, color: "bg-emerald-500" },
                    { pair: "USD/JPY", pct: 58, color: "bg-amber-500" },
                    { pair: "EUR/USD", pct: 51, color: "bg-amber-500" },
                    { pair: "GBP/JPY", pct: 38, color: "bg-red-500" },
                    { pair: "NZD/USD", pct: 33, color: "bg-red-500" },
                  ].map(item => (
                    <div key={item.pair} className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-gray-600 w-16 flex-shrink-0">{item.pair}</span>
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{width: `${item.pct}%`}}></div>
                      </div>
                      <span className={`text-xs font-mono font-bold w-8 text-right ${item.pct >= 60 ? 'text-emerald-600' : item.pct >= 50 ? 'text-amber-600' : 'text-red-500'}`}>{item.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-5">
                <h3 className="font-bold text-gray-900 mb-4 text-sm">Best Sessions</h3>
                <div className="space-y-3">
                  {[
                    { session: "London AM", pct: 71, color: "bg-emerald-500" },
                    { session: "NY Open", pct: 62, color: "bg-emerald-500" },
                    { session: "London PM", pct: 48, color: "bg-amber-500" },
                    { session: "Asia", pct: 31, color: "bg-red-500" },
                  ].map(item => (
                    <div key={item.session} className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-gray-600 w-20 flex-shrink-0">{item.session}</span>
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{width: `${item.pct}%`}}></div>
                      </div>
                      <span className={`text-xs font-mono font-bold w-8 text-right ${item.pct >= 60 ? 'text-emerald-600' : item.pct >= 50 ? 'text-amber-600' : 'text-red-500'}`}>{item.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* UPLOAD */}
          <div className="grid grid-cols-2 gap-5">
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center hover:border-emerald-400 hover:bg-emerald-50 transition-all cursor-pointer">
              <div className="text-4xl mb-4">📂</div>
              <h3 className="font-bold text-gray-900 mb-2">Drop your broker CSV here</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">Claude will analyse every trade — win rate, patterns, psychology, best pairs, worst habits and exactly what to fix.</p>
              <div className="flex gap-2 justify-center flex-wrap">
                {["MT4 CSV", "MT5 CSV", "cTrader", "TradingView", "FTMO"].map(f => (
                  <span key={f} className="text-xs font-mono bg-gray-100 text-gray-500 px-2.5 py-1 rounded">{f}</span>
                ))}
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">What Claude analyses</h3>
              <div className="space-y-3">
                {[
                  "Win rate by pair, session, day and time of day",
                  "Average winner vs loser — are you cutting early?",
                  "Revenge trading detection after losses",
                  "Overtrading patterns within sessions",
                  "Your best and worst pairs — where to focus",
                  "Specific rule recommendations from your data",
                ].map(item => (
                  <div key={item} className="flex gap-2.5 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
