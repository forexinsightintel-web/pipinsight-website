import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — PIP:Insight",
  alternates: { canonical: "/privacy" },
};

const S = { h: { fontSize: 19, fontWeight: 900 as const, margin: "26px 0 8px" },
  p: { fontSize: 15, lineHeight: 1.7, color: "#334155", margin: "0 0 12px" } };

export default function Privacy() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "44px 20px 60px" }}>
      <Link href="/" style={{ fontSize: 13, fontWeight: 700 }}>← PIP:Insight</Link>
      <h1 style={{ fontSize: 32, fontWeight: 900, margin: "14px 0 6px" }}>Privacy Policy</h1>
      <p style={{ fontSize: 13, color: "#94A3B8" }}>Last updated: 20 July 2026</p>

      <h2 style={S.h}>Who we are</h2>
      <p style={S.p}>PIP:Insight is a trading name of Mansell Media Limited,
      a company registered in England &amp; Wales (company no. 17335820),
      registered office Whitfield Buildings, 192–200 Pensby Road, Heswall,
      Wirral, CH60 7RJ, which is the data controller for any personal data
      described below.</p>

      <h2 style={S.h}>The short version</h2>
      <p style={S.p}>We collect as little as possible, we never sell it, and the
      most personal thing on this site — your trading journal — never leaves
      your device at all.</p>

      <h2 style={S.h}>What we collect and why</h2>
      <p style={S.p}><b>Email address</b> — only if you give it to us for the
      free toolkit or updates. Used to send you what you asked for. Every email
      includes a one-click unsubscribe, and unsubscribing is permanent.</p>
      <p style={S.p}><b>Journal data</b> — your trades, notes and emotions are
      stored in your browser&apos;s local storage on your own device. We cannot
      see them. If you use the Pro AI analysis, the trades you submit are sent
      to our server and on to our AI provider (Anthropic) solely to generate
      your analysis; they are not stored by us afterwards.</p>
      <p style={S.p}><b>Payments</b> — handled entirely by Stripe. We never see
      or store card details. Stripe shares with us only what is needed to
      deliver what you bought (payment status and a reference). When you
      download purchased content or use a paid feature, we record delivery
      and usage details (time, IP address, device type) against the payment
      record held by Stripe — our legitimate interest in proving delivery
      and preventing payment fraud. These records are kept only as long as
      payment-dispute rules require.</p>

      <h2 style={S.h}>What we don&apos;t do</h2>
      <p style={S.p}>No selling or renting of personal data, ever. No
      third-party advertising trackers. No marketing emails without consent.</p>

      <h2 style={S.h}>Your rights</h2>
      <p style={S.p}>Under UK GDPR you can request a copy of the personal data
      we hold about you (usually just your email address), or ask for it to be
      deleted. Contact us via any of our official social profiles or the
      contact address on our About information, and we&apos;ll action it
      within 30 days.</p>
    </main>
  );
}
