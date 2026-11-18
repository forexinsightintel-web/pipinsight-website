export default function TfFooter() {
  return (
    <footer className="tf-foot"><div className="wrap">
      <div className="tf-fc">
        <div>
          <a className="tn-logo" href="/"><img src="/media/brand/mark-96.png" alt="" width={44} height={44} style={{ width: 44, height: 44 }} /><span className="tn-wm" style={{ fontSize: 15 }}>THE <b>TRADING</b> <em>FOUNDRY</em></span></a>
          <p>Forex education from your first chart to advanced execution, built from the films on YouTube.</p>
          <div className="tf-tag">Learn<i>|</i>Plan<i>|</i>Execute<i>|</i>Improve</div>
        </div>
        <div><b>Learn</b><a href="/courses/forex-from-zero">Forex From Zero</a><a href="/courses">Courses</a><a href="/films">Films</a><a href="/glossary">Glossary</a></div>
        <div><b>Shop</b><a href="/playbooks">Playbooks</a><a href="/pricing">All-Access Pass</a><a href="/restore">Restore access</a></div>
        <div><b>Company</b><a href="https://www.youtube.com/@thetradingfoundry">YouTube</a><a href="/terms">Terms and refunds</a><a href="/privacy">Privacy</a><a href="/risk">Risk disclosure</a></div>
      </div>
      <div className="tf-legal">
        <p>Risk warning: trading foreign exchange on margin carries a high level of risk and may not be suitable for everyone. Everything here is general education, not financial advice or a recommendation to trade. Charts are past market data, labelled as such, or illustrative training examples.</p>
        <p className="nw">© {new Date().getFullYear()} Trading Foundry, a trading name of Mansell Media Limited</p>
      </div>
    </div></footer>
  );
}
