'use client';

import { useEffect, useRef, useState } from 'react';

const PAIRS = [
  { pair: 'EUR/USD', price: '1.0812', bias: 'BEARISH', direction: '▼', strength: 'Strong', locked: false },
  { pair: 'GBP/USD', price: '1.2734', bias: 'BULLISH', direction: '▲', strength: 'Moderate', locked: false },
  { pair: 'USD/JPY', price: '157.42', bias: 'BULLISH', direction: '▲', strength: 'Strong', locked: false },
  { pair: 'XAU/USD', price: '2,341.50', bias: 'BULLISH', direction: '▲', strength: 'Strong', locked: false },
  { pair: 'USD/CHF', price: '0.9021', bias: 'BEARISH', direction: '▼', strength: 'Weak', locked: true },
  { pair: 'AUD/USD', price: '0.6612', bias: 'NEUTRAL', direction: '◆', strength: 'Neutral', locked: true },
  { pair: 'USD/CAD', price: '1.3698', bias: 'BEARISH', direction: '▼', strength: 'Moderate', locked: true },
  { pair: 'NZD/USD', price: '0.6041', bias: 'NEUTRAL', direction: '◆', strength: 'Weak', locked: true },
  { pair: 'GBP/JPY', price: '200.31', bias: 'BULLISH', direction: '▲', strength: 'Moderate', locked: true },
];

const TICKER_ITEMS = [
  'EUR/USD ▼ BEARISH',
  'GBP/USD ▲ BULLISH',
  'USD/JPY ▲ BULLISH',
  'USD/CHF ▲ BULLISH',
  'AUD/USD ◆ NEUTRAL',
  'USD/CAD ▼ BEARISH',
  'NZD/USD ◆ NEUTRAL',
  'GBP/JPY ▲ BULLISH',
  'XAU/USD ▲ BULLISH · GOLD',
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="site">

      {/* TICKER */}
      <div className="ticker-bar">
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="ticker-item">{item}</span>
          ))}
        </div>
      </div>

      {/* NAV */}
      <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav-inner">
          <div className="logo">
            <span className="logo-pip">PIP</span>
            <span className="logo-colon">:</span>
            <span className="logo-insight">Insight</span>
            <span className="logo-tag">FOREX ANALYSIS</span>
          </div>
          <div className="nav-links">
            <a href="#analysis">Today&apos;s Analysis</a>
            <a href="#pricing">Pricing</a>
            <a href="https://x.com/Forexxinsight" target="_blank" rel="noopener" className="nav-x">Follow on X</a>
            <a href="#pricing" className="btn btn--sm">Get Full Access</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-eyebrow">Every weekday · 06:30 UK</div>
          <h1 className="hero-headline">
            Daily Forex Analysis.<br />
            <span className="hero-highlight">9 Pairs. Every Morning.</span>
          </h1>
          <p className="hero-sub">
            Real technical and macro analysis across 9 major currency pairs including Gold —
            published automatically before the London open. Free.
          </p>
          <div className="hero-ctas">
            <a href="#analysis" className="btn btn--primary">See Today&apos;s Analysis</a>
            <a href="https://x.com/Forexxinsight" target="_blank" rel="noopener" className="btn btn--ghost">Follow on X →</a>
          </div>
          <div className="hero-stats">
            <div className="stat"><span className="stat-num">9</span><span className="stat-label">Pairs daily</span></div>
            <div className="stat-divider" />
            <div className="stat"><span className="stat-num">06:30</span><span className="stat-label">Every weekday</span></div>
            <div className="stat-divider" />
            <div className="stat"><span className="stat-num">Free</span><span className="stat-label">Always</span></div>
          </div>
        </div>
      </section>

      {/* TODAY'S ANALYSIS */}
      <section className="analysis" id="analysis">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">TODAY&apos;S ANALYSIS · {today.toUpperCase()}</div>
            <h2>9 Pairs. Real Analysis.</h2>
            <p className="section-sub">Bias and direction are free for all 9 pairs. Subscribe for full entry, stop loss, take profit and the economic calendar.</p>
          </div>

          {/* Gold — full width */}
          <div className="pair-gold">
            <div className="pair-gold-inner">
              <div className="pair-header">
                <div>
                  <div className="pair-name">XAU/USD <span className="pair-tag gold-tag">GOLD</span></div>
                  <div className="pair-price">2,341.50</div>
                </div>
                <div className="bias-badge bias--bull">▲ BULLISH</div>
              </div>
              <div className="pair-meta">
                <span>Strength: <strong>Strong</strong></span>
                <span>Session: <strong>London Open</strong></span>
                <span>Timeframe: <strong>4H / Daily</strong></span>
              </div>
              <div className="pair-free-data">
                <div className="free-item"><span className="free-label">Bias</span><span className="free-val bull">Bullish</span></div>
                <div className="free-item"><span className="free-label">Direction</span><span className="free-val">Long setups only</span></div>
                <div className="free-item"><span className="free-label">Macro</span><span className="free-val">Safe haven demand elevated</span></div>
              </div>
              <div className="pair-locked-strip">
                <span className="lock-icon">🔒</span>
                <span>Full levels, entry, SL &amp; TP — <a href="#pricing">Premium only</a></span>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="pairs-grid">
            {PAIRS.filter(p => p.pair !== 'XAU/USD').map((p) => (
              <div key={p.pair} className={`pair-card ${p.locked ? 'pair-card--locked' : ''}`}>
                {p.locked && <div className="lock-overlay"><span>🔒</span><span>Premium</span><a href="#pricing" className="btn btn--xs">Unlock</a></div>}
                <div className="pair-card-inner">
                  <div className="pair-card-header">
                    <div className="pair-name">{p.pair}</div>
                    <div className={`bias-badge ${p.bias === 'BULLISH' ? 'bias--bull' : p.bias === 'BEARISH' ? 'bias--bear' : 'bias--neutral'}`}>
                      {p.direction} {p.bias}
                    </div>
                  </div>
                  <div className="pair-price">{p.price}</div>
                  <div className="pair-strength">Strength: <strong>{p.strength}</strong></div>
                  {!p.locked && (
                    <div className="pair-free-mini">
                      <div className="free-item-sm"><span className="free-label">Bias</span><span className={`free-val ${p.bias === 'BULLISH' ? 'bull' : p.bias === 'BEARISH' ? 'bear' : ''}`}>{p.bias}</span></div>
                      <div className="free-item-sm"><span className="free-label">Direction</span><span className="free-val">{p.bias === 'BULLISH' ? 'Long setups' : p.bias === 'BEARISH' ? 'Short setups' : 'Wait for signal'}</span></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how" id="how">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">THE PROCESS</div>
            <h2>Built for the Trading Layman.</h2>
            <p className="section-sub">No jargon. No noise. Just clear direction before the market opens.</p>
          </div>
          <div className="steps">
            {[
              { n: '1', title: 'Live Data Fetched', body: '9 currency pairs pulled automatically before 06:30. Price, indicators and macro data all in.' },
              { n: '2', title: 'AI Analysis Runs', body: 'Claude AI analyses multi-timeframe structure, key levels, and economic calendar events for each pair.' },
              { n: '3', title: 'PDF Report Generated', body: 'A branded two-page report is built per pair — charts, trade idea, key levels, and plain-English explanation.' },
              { n: '4', title: 'Posted to X by 06:30', body: 'All 9 analysis PDFs are published to @Forexxinsight before the London open, every weekday.' },
            ].map(s => (
              <div key={s.n} className="step">
                <div className="step-num">{s.n}</div>
                <div className="step-body">
                  <div className="step-title">{s.title}</div>
                  <div className="step-text">{s.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing" id="pricing">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">PRICING</div>
            <h2>Start Free. Go Deeper When Ready.</h2>
          </div>
          <div className="plans">
            {/* Free */}
            <div className="plan">
              <div className="plan-name">Free</div>
              <div className="plan-price">£0<span>/month</span></div>
              <div className="plan-desc">Everything you need to follow the market each morning.</div>
              <ul className="plan-features">
                <li>✓ Daily bias for all 9 pairs</li>
                <li>✓ Market direction signals</li>
                <li>✓ PDF reports on X @Forexxinsight</li>
                <li>✓ Economic calendar highlights</li>
              </ul>
              <a href="https://x.com/Forexxinsight" target="_blank" rel="noopener" className="btn btn--outline btn--full">Follow on X</a>
            </div>

            {/* Premium */}
            <div className="plan plan--featured">
              <div className="plan-badge">MOST POPULAR</div>
              <div className="plan-name">Premium</div>
              <div className="plan-price">£9.99<span>/month</span></div>
              <div className="plan-desc">Full trade ideas with entry, stop loss, take profit and more.</div>
              <ul className="plan-features">
                <li>✓ Everything in Free</li>
                <li>✓ Entry price for every pair</li>
                <li>✓ Stop loss &amp; take profit levels</li>
                <li>✓ Full economic calendar with impact</li>
                <li>✓ Multi-timeframe chart analysis</li>
                <li>✓ Key resistance &amp; support levels</li>
                <li>✓ AI trade journal (coming soon)</li>
              </ul>
              <a href="#" className="btn btn--primary btn--full">Get Full Access</a>
              <div className="plan-note">Cancel anytime · No commitment</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-logo">
            <span className="logo-pip">PIP</span>
            <span className="logo-colon">:</span>
            <span className="logo-insight">Insight</span>
          </div>
          <div className="footer-links">
            <a href="https://x.com/Forexxinsight" target="_blank" rel="noopener">@Forexxinsight on X</a>
            <a href="#analysis">Today&apos;s Analysis</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div className="footer-disclaimer">
            Forex trading involves significant risk of loss. Past analysis does not guarantee future results.
            Always use a stop loss. Trade at your own risk.
          </div>
          <div className="footer-copy">© 2026 PIP:Insight · pip-insight.co.uk · United Kingdom</div>
        </div>
      </footer>

    </div>
  );
}
