import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../../components/tf/SiteHeader";

export const metadata: Metadata = {
  title: "Terms of Use — The Trading Foundry",
  alternates: { canonical: "/terms" },
};

const S = { h: { fontSize: 19, fontWeight: 900 as const, margin: "26px 0 8px" },
  p: { fontSize: 15, lineHeight: 1.7, color: "#334155", margin: "0 0 12px" } };

export default function Terms() {
  return (
    <main className="tf-page"><SiteHeader variant="light" /><article className="legal">
      <div className="k" style={{ color: "var(--ink50)" }}>LEGAL · TERMS</div>
            <h1 style={{ fontSize: 32, fontWeight: 900, margin: "14px 0 6px" }}>Terms of Use</h1>
      <p style={{ fontSize: 13, color: "#94A3B8" }}>Last updated: 10 October 2026</p>

      <h2 style={S.h}>What this site is</h2>
      <p style={S.p}>The Trading Foundry is a trading name of Mansell Media Limited,
      registered in England &amp; Wales, company no. 17335820, registered
      office Whitfield Buildings, 192–200 Pensby Road, Heswall, Wirral,
      CH60 7RJ. The Trading Foundry publishes educational
      films, courses, playbooks and tools. Nothing on this site is financial advice, a personal
      recommendation, or an instruction to trade. We are not authorised or
      regulated by the Financial Conduct Authority, and nothing here should be
      read as regulated investment advice. Decisions you make in the markets
      are yours alone. See our <Link href="/risk">Risk Disclosure</Link>.</p>

      <h2 style={S.h}>Subscriptions and purchases</h2>
      <p style={S.p}><b>Courses and the All-Access Pass</b> — one-off purchases
      billed by Stripe, with no subscription and nothing to cancel. Access
      unlocks in the browser you paid in and can be restored on any device from
      the Restore access page using the email you paid with. Courses are
      education only: they teach methods using illustrative training charts
      built from synthetic price data and make no promise of results.</p>
      <p style={S.p}><b>Playbooks, courses and the pass</b> — one-off purchases; playbooks are delivered as PDF
      downloads and courses are read online. By purchasing you consent to immediate delivery and
      acknowledge that the statutory 14-day cooling-off period for digital
      content ends when the download begins. We then go further than the law
      requires: every purchase carries a <b>30-day no-quibble refund</b> — if
      you don&apos;t think it was worth what you paid, tell us within 30 days
      and we&apos;ll refund it in full, no forms, no argument. Your statutory
      rights are unaffected.</p>
      <p style={S.p}><b>Refund fair use</b> — the no-quibble promise exists
      for genuine buyers. Where a pattern of purchasing and refunding
      suggests the promise is being used as a free-copy scheme, we may
      decline future purchases from that customer. Refunds already promised
      are always honoured.</p>

      <h2 style={S.h}>Fair use</h2>
      <p style={S.p}>Content and purchased materials are for your personal use;
      redistribution or resale is not permitted. The free tools are provided
      as-is, with no warranty of availability or fitness for purpose.</p>

      <h2 style={S.h}>Age</h2>
      <p style={S.p}>This site is for adults: 18+ only.</p>
    </article></main>
  );
}
