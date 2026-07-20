"use client";
import { useState } from "react";

/* The London Open capture — the letter's own shop window. */
export default function NewsletterSignup({ source = "homepage" }:
  { source?: string }) {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("busy");
    try {
      const r = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, mobile, source }),
      });
      if (!r.ok) throw new Error();
      setState("done");
    } catch { setState("error"); }
  };

  return (
    <div className="nl-card" id="join">
      <div className="nl-deco" aria-hidden="true" />
      {state === "done" ? (
        <div className="nl-inner nl-done-wrap">
          <div className="nl-kicker">YOU&apos;RE IN — FREE TIER ACTIVE</div>
          <div className="nl-headline"><em>In.</em> Two things right now:</div>
          <div className="nl-sub" style={{ marginBottom: 14 }}>The welcome
          letter&apos;s on its way with the full toolkit. Meanwhile:</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="https://t.me/pipinsight_free" target="_blank"
              rel="noopener" className="btn btn-primary"
              style={{ fontSize: 14.5 }}>
              &#9993; Join the free Telegram &mdash; winner tiles + honest tally</a>
            <a href="/journal" className="btn btn-outline"
              style={{ fontSize: 14.5 }}>Open your free Journal &rarr;</a>
          </div>
        </div>
      ) : (
        <div className="nl-inner">
          <div className="nl-kicker">THE LONDON OPEN · FREE WEEKLY</div>
          <div className="nl-headline">
            The market letter that <em>shows its losses.</em>
          </div>
          <div className="nl-sub">Forex · Crypto · Stocks — the bias board,
          the week&apos;s receipts and one lesson worth your coffee. Every
          call checkable on the public Tape.</div>
          <form className="nl-form" onSubmit={submit}>
            <input type="email" required value={email}
              placeholder="your@email.com" aria-label="Email address"
              onChange={(e) => setEmail(e.target.value)} />
            <input type="tel" value={mobile}
              placeholder="mobile (optional — for Telegram)"
              aria-label="Mobile number (optional, for Telegram)"
              onChange={(e) => setMobile(e.target.value)} />
            <button type="submit" disabled={state === "busy"}>
              {state === "busy" ? "One sec…" : "Join free →"}
            </button>
          </form>
          {state === "error"
            ? <div className="nl-fine nl-err-line">Didn&apos;t save — try once more?</div>
            : <div className="nl-fine">No spam, no signals, unsubscribe in one
              click. {`We'd`} rather you audit us than trust us.</div>}
        </div>
      )}
    </div>
  );
}
