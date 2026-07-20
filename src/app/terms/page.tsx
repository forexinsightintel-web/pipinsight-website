import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use — PIP:Insight",
  alternates: { canonical: "/terms" },
};

const S = { h: { fontSize: 19, fontWeight: 900 as const, margin: "26px 0 8px" },
  p: { fontSize: 15, lineHeight: 1.7, color: "#334155", margin: "0 0 12px" } };

export default function Terms() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "44px 20px 60px" }}>
      <Link href="/" style={{ fontSize: 13, fontWeight: 700 }}>← PIP:Insight</Link>
      <h1 style={{ fontSize: 32, fontWeight: 900, margin: "14px 0 6px" }}>Terms of Use</h1>
      <p style={{ fontSize: 13, color: "#94A3B8" }}>Last updated: 20 July 2026</p>

      <h2 style={S.h}>What this site is</h2>
      <p style={S.p}>PIP:Insight is a trading name of Mansell Media Limited,
      registered in England &amp; Wales, company no. 17335820, registered
      office Whitfield Buildings, 192–200 Pensby Road, Heswall, Wirral,
      CH60 7RJ. PIP:Insight publishes educational
      market analysis, tools and courses. Nothing on this site is financial advice, a personal
      recommendation, or an instruction to trade. We are not authorised or
      regulated by the Financial Conduct Authority, and nothing here should be
      read as regulated investment advice. Decisions you make in the markets
      are yours alone. See our <Link href="/risk">Risk Disclosure</Link>.</p>

      <h2 style={S.h}>Subscriptions and purchases</h2>
      <p style={S.p}><b>Pro subscription</b> — billed by Stripe, monthly or
      annually. Cancel any time from your Stripe receipt email or by
      contacting us; access continues to the end of the paid period. No
      tie-ins, no cancellation fees.</p>
      <p style={S.p}><b>Ebooks</b> — one-off purchases delivered as PDF
      downloads. By purchasing you consent to immediate delivery and
      acknowledge that the statutory 14-day cooling-off period for digital
      content ends when the download begins. We then go further than the law
      requires: every ebook carries a <b>30-day no-quibble refund</b> — if
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
    </main>
  );
}
