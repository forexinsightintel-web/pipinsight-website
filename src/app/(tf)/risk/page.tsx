import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../../components/tf/SiteHeader";

export const metadata: Metadata = {
  title: "Risk Disclosure — The Trading Foundry",
  alternates: { canonical: "/risk" },
};

export default function Risk() {
  return (
    <main className="tf-page"><SiteHeader variant="light" /><article className="legal">
      <div className="k" style={{ color: "var(--ink50)" }}>LEGAL · RISK</div>
            <h1 style={{ fontSize: 32, fontWeight: 900, margin: "14px 0 6px" }}>Risk Disclosure</h1>
      <p style={{ fontSize: 15, lineHeight: 1.75, color: "#334155", marginTop: 14 }}>
        Trading foreign exchange, metals and other leveraged products carries a
        substantial risk of loss and is not suitable for everyone. The majority
        of retail traders lose money. Leverage magnifies losses as well as
        gains, and you can lose more than you expect in fast markets.
      </p>
      <p style={{ fontSize: 15, lineHeight: 1.75, color: "#334155" }}>
        Everything published by The Trading Foundry — films, courses, playbooks,
        tools — is educational material about how we
        read markets. It is never a personal recommendation, a signal, or an
        instruction to place any trade. Training charts are illustrative and built from synthetic price data; they
        are not records of real trades or results. Past performance is no guide to future results.
      </p>
      <p style={{ fontSize: 15, lineHeight: 1.75, color: "#334155" }}>
        Never trade with money you cannot afford to lose. If you are unsure
        whether trading is appropriate for your circumstances, seek advice
        from an independent, regulated financial adviser. If gambling-style
        behaviour around trading is affecting you, support is available at
        BeGambleAware.org. 18+ only.
      </p>
    </article></main>
  );
}
