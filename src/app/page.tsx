import Image from "next/image";
import Link from "next/link";

// This would be fetched from Supabase in production
const todayAnalysis = [
  { pair: "EUR/USD", bias: "Bearish", strength: "Strong", price: "1.14611", direction: "SHORT", trend: "Downtrend", free: true },
  { pair: "GBP/USD", bias: "Bearish", strength: "Moderate", price: "1.32308", direction: "SHORT", trend: "H4 Structure", free: true },
  { pair: "USD/JPY", bias: "Bullish", strength: "Strong", price: "161.350", direction: "LONG", trend: "Uptrend", free: true },
  { pair: "USD/CHF", bias: "Bullish", strength: "Moderate", price: "0.80452", direction: "LONG", trend: "Breakout", free: true },
  { pair: "AUD/USD", bias: "Neutral", strength: "Weak", price: "0.64120", direction: "NO TRADE", trend: "Ranging", free: false },
  { pair: "USD/CAD", bias: "Bearish", strength: "Moderate", price: "1.38240", direction: "SHORT", trend: "Downtrend", free: false },
  { pair: "NZD/USD", bias: "Neutral", strength: "Weak", price: "0.59840", direction: "NO TRADE", trend: "Ranging", free: false },
  { pair: "GBP/JPY", bias: "Bullish", strength: "Strong", price: "213.190", direction: "LONG", trend: "Uptrend", free: false },
  { pair: "XAU/USD", bias: "Bullish", strength: "Moderate", price: "2,341.50", direction: "LONG", trend: "Safe Haven", free: false },
];

const tickerData = [
  { pair: "EUR/USD", bias: "BEARISH", bull: false },
  { pair: "GBP/USD", bias: "BEARISH", bull: false },
  { pair: "USD/JPY", bias: "BULLISH", bull: true },
  { pair: "USD/CHF", bias: "BULLISH", bull: true },
  { pair: "AUD/USD", bias: "NEUTRAL", bull: null },
  { pair: "USD/CAD", bias: "BEARISH", bull: false },
  { pair: "NZD/USD", bias: "NEUTRAL", bull: null },
  { pair: "GBP/JPY", bias: "BULLISH", bull: true },
  { pair: "XAU/USD", bias: "BULLISH · GOLD", bull: true },
];

function BiasColor(bias: string) {
  if (bias.includes("Bear") || bias.includes("BEAR")) return "text-red-500";
  if (bias.includes("Bull") || bias.includes("BULL")) return "text-emerald-500";
  return "text-amber-500";
}

function BadgeColor(bias: string) {
  if (bias.includes("Bear") || bias.includes("BEAR")) return "bg-red-50 text-red-600 border border-red-200";
  if (bias.includes("Bull") || bias.includes("BULL")) return "bg-emerald-50 text-emerald-700 border border-emerald-200";
  return "bg-amber-50 text-amber-600 border border-amber-200";
}

function CardBorder(bias: string) {
  if (bias.includes("Bear")) return "border-t-[3px] border-t-red-500";
  if (bias.includes("Bull")) return "border-t-[3px] border-t-emerald-500";
  return "border-t-[3px] border-t-amber-500";
}

export default function Home() {
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <main className="min-h-screen bg-white">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.png" alt="PIP:Insight" width={160} height={44} className="h-10 w-auto" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#analysis" className="text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors">Today's Analysis</a>
            <a href="#how" className="text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors">How It Works</a>
            <a href="#pricing" className="text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors">Pricing</a>
            <a href="https://x.com/Forexxinsight" target="_blank" className="text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors">@Forexxinsight</a>
          </div>
          <a href="#pricing" className="bg-emerald-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-emerald-600 transition-all hover:-translate-y-0.5">
            Get Full Access
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-28 pb-20 px-6" style={{background: 'linear-gradient(135deg, #F0FDF9 0%, #FFFFFF 50%, #FFFBEB 100%)'}}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live every weekday · 06:30 UK
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6 text-gray-900">
              My Daily Forex<br />
              Analysis. <span className="text-emerald-500">9 Pairs.</span><br />
              <span className="text-amber-600">Every Morning.</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
              Real technical and macro analysis across 9 major currency pairs 
              including Gold — published automatically every weekday before 
              the London open. Free.
            </p>
            <div className="flex gap-4 flex-wrap mb-10">
              <a href="#analysis" className="bg-emerald-500 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-emerald-600 transition-all hover:-translate-y-0.5 shadow-lg shadow-emerald-200">
                See Today's Analysis
              </a>
              <a href="https://x.com/Forexxinsight" target="_blank" className="border border-gray-200 text-gray-700 px-7 py-3.5 rounded-xl font-semibold hover:border-emerald-500 hover:text-emerald-600 transition-all">
                Follow on X
              </a>
            </div>
            <div className="flex gap-10 pt-8 border-t border-gray-100">
              {[["9", "Pairs daily"], ["06:30", "Every weekday"], ["Free", "Always"]].map(([num, label]) => (
                <div key={label}>
                  <div className="text-3xl font-extrabold text-gray-900 tracking-tight">{num}</div>
                  <div className="text-sm text-gray-400 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mini pair cards */}
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            <div className="col-span-2 bg-white border-2 border-emerald-500 rounded-2xl p-5 shadow-lg shadow-emerald-50">
              <div className="text-xs font-bold text-gray-400 tracking-widest mb-2 font-mono">XAU/USD · GOLD</div>
              <div className="text-3xl font-extrabold text-gray-900 font-mono mb-3">2,341.50</div>
              <span className="inline-block text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-md">▲ BULLISH</span>
            </div>
            {[
              { pair: "EUR/USD", price: "1.14611", bias: false },
              { pair: "GBP/USD", price: "1.32308", bias: false },
              { pair: "USD/JPY", price: "161.350", bias: true },
              { pair: "GBP/JPY", price: "213.190", bias: true },
            ].map(card => (
              <div key={card.pair} className={`bg-white border rounded-xl p-4 ${card.bias ? 'border-emerald-200' : 'border-red-200'}`}>
                <div className="text-xs font-bold text-gray-400 tracking-widest mb-1 font-mono">{card.pair}</div>
                <div className="text-xl font-extrabold text-gray-900 font-mono mb-2">{card.price}</div>
                <span className={`text-xs font-bold px-2 py-1 rounded ${card.bias ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                  {card.bias ? '▲ BULLISH' : '▼ BEARISH'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="bg-gray-900 py-3 overflow-hidden">
        <div className="flex gap-12 ticker-track whitespace-nowrap">
          {[...tickerData, ...tickerData].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm font-mono">
              <span className="text-gray-400 font-bold">{item.pair}</span>
              <span className="text-gray-600">·</span>
              <span className={item.bull === true ? 'text-emerald-400 font-bold' : item.bull === false ? 'text-red-400 font-bold' : 'text-amber-400 font-bold'}>
                {item.bull === true ? '▲' : item.bull === false ? '▼' : '◆'} {item.bias}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ANALYSIS GRID */}
      <section className="py-20 px-6" id="analysis">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-bold text-emerald-600 tracking-widest uppercase font-mono mb-3">Today's Analysis · {today}</div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-gray-900">9 Pairs. Real Analysis.</h2>
          <p className="text-gray-500 text-lg mb-12 max-w-xl">
            Bias and direction are free for all 9 pairs. Subscribe for full entry, stop loss, take profit and the economic calendar.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {todayAnalysis.map(item => (
              <div key={item.pair} className={`bg-white border border-gray-200 rounded-2xl p-6 relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg ${CardBorder(item.bias)}`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono font-bold text-gray-900">{item.pair}</span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md font-mono ${BadgeColor(item.bias)}`}>
                    {item.bias.includes("Bear") ? "▼" : item.bias.includes("Bull") ? "▲" : "◆"} {item.bias.toUpperCase()}
                  </span>
                </div>
                <div className="font-mono text-3xl font-bold text-gray-900 mb-4">{item.price}</div>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded font-mono">{item.strength}</span>
                  <span className={`text-xs px-2.5 py-1 rounded font-mono font-bold ${
                    item.direction === "LONG" ? "bg-emerald-50 text-emerald-700" :
                    item.direction === "SHORT" ? "bg-red-50 text-red-600" :
                    "bg-gray-100 text-gray-500"
                  }`}>{item.direction}</span>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded font-mono">{item.trend}</span>
                </div>

                {!item.free && (
                  <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3 rounded-2xl">
                    <span className="text-2xl">🔒</span>
                    <span className="text-sm text-gray-500 text-center">Entry · SL · TP · Full Analysis</span>
                    <a href="#pricing" className="text-sm font-bold text-white bg-emerald-500 px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors">
                      Unlock — £9.99/mo
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6 bg-gray-50 border-y border-gray-100" id="how">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-bold text-emerald-600 tracking-widest uppercase font-mono mb-3">The Process</div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-16 text-gray-900">Automated. Accurate. Every Morning.</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "📡", step: "01", title: "Live Market Data", desc: "Every weekday at 06:25 UTC, live price and candle data is pulled for all 9 pairs from real-time market feeds." },
              { icon: "🤖", step: "02", title: "AI-Powered Analysis", desc: "Each pair is analysed for trend, structure, key levels, macro context and a clear trade idea with entry, SL and TP." },
              { icon: "📊", step: "03", title: "PDF Report Generated", desc: "A branded PDF report is generated for each pair with candlestick charts, trade ideas and the economic calendar." },
              { icon: "🚀", step: "04", title: "Live at 06:30", desc: "All 9 reports post automatically to X @Forexxinsight and update this page — before the London session opens." },
            ].map(s => (
              <div key={s.step}>
                <div className="text-3xl mb-4">{s.icon}</div>
                <div className="text-xs font-bold text-emerald-600 font-mono tracking-widest mb-2">{s.step}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 px-6" id="pricing">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-bold text-emerald-600 tracking-widest uppercase font-mono mb-3">Simple Pricing</div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-gray-900">Free or Premium</h2>
          <p className="text-gray-500 text-lg mb-16 max-w-lg">Start free. Upgrade when you want the full picture.</p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl">
            {/* Free */}
            <div className="border border-gray-200 rounded-2xl p-8">
              <div className="text-xs font-bold text-gray-400 tracking-widest uppercase font-mono mb-4">Free</div>
              <div className="text-5xl font-extrabold text-gray-900 mb-1">£0</div>
              <div className="text-sm text-gray-400 mb-8">Forever free · no card</div>
              <ul className="space-y-3 mb-8 text-sm">
                {["Daily bias for all 9 pairs", "Bull / Bear / Neutral direction", "Live prices updated daily", "Follow on X @Forexxinsight"].map(f => (
                  <li key={f} className="flex items-center gap-2 text-gray-600"><span className="text-emerald-500 font-bold">✓</span>{f}</li>
                ))}
                {["Entry & exit levels", "Stop loss & take profit", "Economic calendar", "Trade journal"].map(f => (
                  <li key={f} className="flex items-center gap-2 text-gray-300"><span className="font-bold">—</span>{f}</li>
                ))}
              </ul>
              <a href="https://x.com/Forexxinsight" target="_blank" className="block text-center border border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:border-emerald-500 hover:text-emerald-600 transition-colors">
                Follow on X — Free
              </a>
            </div>

            {/* Analysis - Featured */}
            <div className="border-2 border-emerald-500 rounded-2xl p-8 relative shadow-xl shadow-emerald-50">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase">Most Popular</div>
              <div className="text-xs font-bold text-emerald-600 tracking-widest uppercase font-mono mb-4">Analysis Pro</div>
              <div className="text-5xl font-extrabold text-gray-900 mb-1"><sup className="text-2xl">£</sup>9.99</div>
              <div className="text-sm text-gray-400 mb-8">per month · cancel anytime</div>
              <ul className="space-y-3 mb-8 text-sm">
                {[
                  "Everything in Free",
                  "Full entry, SL & TP — all 9 pairs",
                  "Risk : Reward on every trade",
                  "Full economic calendar",
                  "Multi-timeframe analysis",
                  "PDF download for every report",
                  "Daily email at 06:30",
                ].map(f => (
                  <li key={f} className="flex items-center gap-2 text-gray-600"><span className="text-emerald-500 font-bold">✓</span>{f}</li>
                ))}
              </ul>
              <a href="/subscribe?plan=analysis" className="block text-center bg-emerald-500 text-white py-3 rounded-xl font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-200">
                Get Analysis Pro — £9.99/mo
              </a>
            </div>

            {/* Journal Pro */}
            <div className="border border-gray-200 rounded-2xl p-8">
              <div className="text-xs font-bold text-gray-400 tracking-widest uppercase font-mono mb-4">Journal Pro</div>
              <div className="text-5xl font-extrabold text-gray-900 mb-1"><sup className="text-2xl">£</sup>24.99</div>
              <div className="text-sm text-gray-400 mb-8">per month · cancel anytime</div>
              <ul className="space-y-3 mb-8 text-sm">
                {[
                  "Everything in Analysis Pro",
                  "AI trade journal dashboard",
                  "Upload your broker CSV",
                  "Win rate by pair & session",
                  "Revenge trading detection",
                  "Psychology pattern analysis",
                  "Personalised rule recommendations",
                ].map(f => (
                  <li key={f} className="flex items-center gap-2 text-gray-600"><span className="text-emerald-500 font-bold">✓</span>{f}</li>
                ))}
              </ul>
              <a href="/subscribe?plan=journal" className="block text-center border border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:border-emerald-500 hover:text-emerald-600 transition-colors">
                Get Journal Pro — £24.99/mo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <Image src="/logo.png" alt="PIP:Insight" width={160} height={44} className="h-10 w-auto mx-auto mb-6 opacity-80" />
          <div className="flex justify-center gap-8 mb-6 text-sm flex-wrap">
            <a href="#analysis" className="hover:text-emerald-400 transition-colors">Analysis</a>
            <a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</a>
            <Link href="/journal" className="hover:text-emerald-400 transition-colors">Journal</Link>
            <a href="https://x.com/Forexxinsight" target="_blank" className="hover:text-emerald-400 transition-colors">X @Forexxinsight</a>
          </div>
          <p className="text-xs text-gray-600 max-w-2xl mx-auto leading-relaxed mb-4">
            PIP:Insight provides educational forex analysis for informational purposes only. 
            This is not financial advice. Forex trading involves significant risk of loss. 
            Always use a stop loss. Trade at your own risk.
          </p>
          <p className="text-xs text-gray-700">© 2026 PIP:Insight · pip-insight.co.uk · United Kingdom</p>
        </div>
      </footer>

    </main>
  );
}
