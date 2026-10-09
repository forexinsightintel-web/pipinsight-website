export default function TfFooter() {
  return (
    <footer><div className="wrap">
      <div className="fcols">
        <div><a className="logo" href="/" style={{ color: 'var(--paper)' }}><img src="/media/mark.png" alt="" width={30} height={30} />TRADING FOUNDRY</a>
          <p style={{ maxWidth: 320, marginTop: 16 }}>Forex education from your first chart to advanced execution. Built from the films on YouTube.</p></div>
        <div><b>Learn</b><a href="/courses/forex-from-zero">Forex From Zero</a><a href="/courses">Courses</a><a href="/films">Films</a><a href="/school">Free School</a><a href="/glossary">Glossary</a></div>
        <div><b>Shop</b><a href="/playbooks">Playbooks</a><a href="/pricing">All-Access Pass</a><a href="/restore">Restore access</a></div>
        <div><b>Tools</b><a href="/journal">Foundry Journal</a><a href="/free">Calculators</a></div>
        <div><b>Company</b><a href="https://www.youtube.com/@thetradingfoundry">YouTube</a><a href="/terms">Terms &amp; refunds</a><a href="/privacy">Privacy</a><a href="/risk">Risk disclosure</a></div>
      </div>
      <div className="disc">Risk warning: trading foreign exchange on margin carries a high level of risk and may not be suitable for everyone. All content is general education, not financial advice or a recommendation to trade. Training charts are illustrative examples using synthetic price data. © 2026 Trading Foundry, a trading name of Mansell Media Limited, registered in England &amp; Wales.</div>
    </div></footer>
  );
}
