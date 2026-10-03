import NewsletterSignup from "../components/NewsletterSignup";

// Trading Foundry homepage. Films come from the @thetradingfoundry YouTube channel;
// to feature a new film, add its YouTube ID + title to FILMS below.
const YT = "https://www.youtube.com/@thetradingfoundry";
const FILMS = [
  { id: "6oFfFTEb2TI", title: "5-Minute Scalping Explained: A 4-Step Trading Plan", level: "Strategy" },
  { id: "qiVimu89ZFI", title: "Why You're Losing Trades (And How the Pullback Fixes It)", level: "Strategy" },
  { id: "2apjbmGOojk", title: "The Only RSI Divergence Strategy You Need", level: "Indicators" },
  { id: "Xg87CHilEkQ", title: "The MACD Is Not What You Were Told", level: "Indicators" },
  { id: "UaiFiQ9l6jE", title: "The Complete Guide to Trend Lines", level: "Price Action" },
  { id: "Z8A_opIBLmY", title: "Forex Trading For Beginners: Everything You Need In 13 Minutes", level: "Foundation" },
];
const PATHS = [
  { h: "I'm brand new", p: "What a pip is, how a chart works, how to size a trade. Start at the first lesson.", cta: "Start the School", href: "/school" },
  { h: "I know the basics", p: "Complete strategy films and illustrated playbooks: pullbacks, breakouts, divergence, zones.", cta: "Browse the playbooks", href: "/courses" },
  { h: "I'm already trading", p: "Log every trade in the free Foundry Journal and see what your own record says.", cta: "Open the Journal", href: "/journal" },
];

export default function Home() {
  return (
    <main className="tf">
      <style>{`
        .tf{font-family:'Montserrat',system-ui,sans-serif;color:#131722;background:#fff}
        .tf a{color:inherit;text-decoration:none}
        .tf-wrap{max-width:1120px;margin:0 auto;padding:0 20px}
        .tf-nav{position:sticky;top:0;z-index:20;background:rgba(255,255,255,.96);border-bottom:1px solid #E2E8F0}
        .tf-nav .tf-wrap{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:64px;flex-wrap:wrap}
        .tf-mark{font-weight:900;letter-spacing:.08em;font-size:15px;white-space:nowrap}
        .tf-mark span{color:#26A69A}
        .tf-links{display:flex;gap:18px;flex-wrap:wrap;font-size:14px;font-weight:600}
        .tf-links a:hover{color:#26A69A}
        .tf-hero{padding:72px 0 56px;background:#131722;color:#fff}
        .tf-kicker{font-size:12px;font-weight:700;letter-spacing:.18em;color:#26A69A;text-transform:uppercase}
        .tf-hero h1{font-size:clamp(40px,7vw,80px);line-height:1;font-weight:900;margin:14px 0 18px;letter-spacing:-.02em}
        .tf-hero p{font-size:clamp(17px,2.2vw,21px);color:#D1D4DC;max-width:640px;line-height:1.5}
        .tf-btns{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}
        .tf-btn{display:inline-block;padding:14px 22px;border-radius:8px;font-weight:800;font-size:15px}
        .tf-btn-p{background:#26A69A;color:#fff!important}
        .tf-btn-g{border:2px solid #fff;color:#fff!important}
        .tf-btn-d{background:#131722;color:#fff!important}
        .tf-trust{margin-top:22px;font-size:13px;color:#787B86}
        .tf-hero-film{margin-top:44px;aspect-ratio:16/9;width:100%;max-width:880px;border-radius:12px;overflow:hidden;background:#000}
        .tf-hero-film iframe{width:100%;height:100%;border:0;display:block}
        .tf-sec{padding:64px 0}
        .tf-sec.alt{background:#F8FAFC}
        .tf-sec h2{font-size:clamp(28px,4vw,42px);font-weight:900;margin:0 0 10px;letter-spacing:-.01em}
        .tf-sub{color:#64748B;font-size:17px;margin:0 0 32px;max-width:640px;line-height:1.5}
        .tf-grid{display:grid;gap:20px;grid-template-columns:repeat(auto-fill,minmax(280px,1fr))}
        .tf-card{display:block;border:1px solid #E2E8F0;border-radius:12px;background:#fff;overflow:hidden}
        .tf-card img{width:100%;aspect-ratio:16/9;object-fit:cover;display:block}
        .tf-card .b{padding:16px 18px 20px}
        .tf-tag{font-size:11px;font-weight:800;letter-spacing:.14em;color:#26A69A;text-transform:uppercase}
        .tf-card h3{font-size:17px;font-weight:800;margin:6px 0 0;line-height:1.35}
        .tf-path{padding:26px;border:1px solid #E2E8F0;border-radius:12px;background:#fff}
        .tf-path h3{font-size:22px;font-weight:900;margin:0 0 10px}
        .tf-path p{color:#475569;line-height:1.55;margin:0 0 20px}
        .tf-path .go{font-weight:800;color:#26A69A}
        .tf-band{background:#131722;color:#fff;text-align:center}
        .tf-band h2{font-size:clamp(30px,6vw,60px);line-height:1.05}
        .tf-band p{color:#D1D4DC}
        @media(max-width:640px){.tf-links{gap:12px;font-size:13px}.tf-hero{padding:48px 0 40px}}
      `}</style>

      <nav className="tf-nav"><div className="tf-wrap">
        <a href="/" className="tf-mark">THE TRADING <span>FOUNDRY</span></a>
        <div className="tf-links">
          <a href="/school">School</a><a href="/courses">Playbooks</a><a href="/journal">Journal</a>
          <a href="/free">Tools</a><a href="/glossary">Glossary</a><a href={YT} target="_blank" rel="noopener">YouTube</a>
        </div>
      </div></nav>

      <section className="tf-hero"><div className="tf-wrap">
        <div className="tf-kicker">Trading Foundry University</div>
        <h1>Learn forex properly.</h1>
        <p>From your first candle to advanced execution. Complete strategy films, illustrated playbooks and free tools, taught without the guru nonsense.</p>
        <div className="tf-btns">
          <a className="tf-btn tf-btn-p" href="/school">Start free</a>
          <a className="tf-btn tf-btn-g" href="/courses">See the playbooks</a>
        </div>
        <div className="tf-trust">No signals. No promises. Just trading education, taught properly.</div>
        <div className="tf-hero-film">
          <iframe src={`https://www.youtube-nocookie.com/embed/${FILMS[0].id}`} title={FILMS[0].title} loading="lazy"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        </div>
      </div></section>

      <section className="tf-sec"><div className="tf-wrap">
        <h2>Choose your level.</h2>
        <p className="tf-sub">Whoever you are, there is a sensible place to start.</p>
        <div className="tf-grid">{PATHS.map(p => (
          <a key={p.h} href={p.href} className="tf-path"><h3>{p.h}</h3><p>{p.p}</p><span className="go">{p.cta} →</span></a>
        ))}</div>
      </div></section>

      <section className="tf-sec alt"><div className="tf-wrap">
        <h2>Learn by watching.</h2>
        <p className="tf-sub">Full start-to-finish films from the channel. Watch the method, then go deeper with the playbook.</p>
        <div className="tf-grid">{FILMS.map(f => (
          <a key={f.id} className="tf-card" href={`https://www.youtube.com/watch?v=${f.id}`} target="_blank" rel="noopener">
            <img src={`https://i.ytimg.com/vi/${f.id}/hqdefault.jpg`} alt="" loading="lazy" />
            <div className="b"><div className="tf-tag">{f.level}</div><h3>{f.title}</h3></div>
          </a>
        ))}</div>
        <div className="tf-btns"><a className="tf-btn tf-btn-d" href={YT} target="_blank" rel="noopener">Subscribe on YouTube</a></div>
      </div></section>

      <section className="tf-sec"><div className="tf-wrap">
        <h2>Then own the playbook.</h2>
        <p className="tf-sub">Illustrated strategy ebooks that go deeper than any video can: the rules, the failure conditions, the worked examples. Yours to keep.</p>
        <div className="tf-btns"><a className="tf-btn tf-btn-p" href="/courses">Browse the playbooks</a></div>
      </div></section>

      <section className="tf-sec alt"><div className="tf-wrap">
        <h2>Free tools that stay free.</h2>
        <div className="tf-grid">
          <a className="tf-path" href="/journal"><h3>Foundry Journal</h3><p>Log trades, track your equity curve and discipline. Stored privately on your device.</p><span className="go">Open →</span></a>
          <a className="tf-path" href="/free"><h3>Calculators</h3><p>Position size, risk and pip value, worked out before you click buy.</p><span className="go">Open →</span></a>
          <a className="tf-path" href="/glossary"><h3>Glossary</h3><p>Every term you will meet, explained in plain English.</p><span className="go">Open →</span></a>
        </div>
      </div></section>

      <section className="tf-sec"><div className="tf-wrap" style={{maxWidth:720}}>
        <h2>Get the next lesson first.</h2>
        <p className="tf-sub">New films and playbooks, straight to your inbox. No spam, no signals.</p>
        <NewsletterSignup />
      </div></section>

      <section className="tf-sec tf-band"><div className="tf-wrap">
        <h2>Watch. Understand.<br/>Practise. Review. Repeat.</h2>
        <p>Trading Foundry University. Built for traders who want to understand what they&apos;re doing.</p>
      </div></section>
    </main>
  );
}
