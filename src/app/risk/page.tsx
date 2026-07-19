import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Risk Disclosure — PIP:Insight",
  alternates: { canonical: "/risk" },
};

export default function Risk() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "44px 20px 60px" }}>
      <Link href="/" style={{ fontSize: 13, fontWeight: 700 }}>← PIP:Insight</Link>
      <h1 style={{ fontSize: 32, fontWeight: 900, margin: "14px 0 6px" }}>Risk Disclosure</h1>
      <p style={{ fontSize: 15, lineHeight: 1.75, color: "#334155", marginTop: 14 }}>
        Trading foreign exchange, metals and other leveraged products carries a
        substantial risk of loss and is not suitable for everyone. The majority
        of retail traders lose money. Leverage magnifies losses as well as
        gains, and you can lose more than you expect in fast markets.
      </p>
      <p style={{ fontSize: 15, lineHeight: 1.75, color: "#334155" }}>
        Everything published by PIP:Insight — analysis, levels, commentary,
        courses, tools, the public Tape — is educational opinion about how we
        read markets. It is never a personal recommendation, a signal, or an
        instruction to place any trade. Past performance, including anything
        shown on our public record, is no guide to future results.
      </p>
      <p style={{ fontSize: 15, lineHeight: 1.75, color: "#334155" }}>
        Never trade with money you cannot afford to lose. If you are unsure
        whether trading is appropriate for your circumstances, seek advice
        from an independent, regulated financial adviser. If gambling-style
        behaviour around trading is affecting you, support is available at
        BeGambleAware.org. 18+ only.
      </p>
    </main>
  );
}
