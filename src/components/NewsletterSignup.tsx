"use client";
import { useState } from "react";

/* The London Open capture — top of the fold, one field, one promise. */
export default function NewsletterSignup({ source = "homepage" }:
  { source?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("busy");
    try {
      const r = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      if (!r.ok) throw new Error();
      setState("done");
    } catch { setState("error"); }
  };

  if (state === "done") {
    return (
      <div className="nl-bar nl-done">
        <b>In.</b> Check your inbox — The London Open&apos;s welcome is on its way.
      </div>
    );
  }
  return (
    <form className="nl-bar" onSubmit={submit}>
      <div className="nl-copy">
        <span className="nl-name">THE LONDON OPEN</span>
        <span className="nl-tag">Forex · Crypto · Stocks — the free weekly
        letter that shows its losses.</span>
      </div>
      <div className="nl-controls">
        <input type="email" required value={email} placeholder="your@email.com"
          aria-label="Email address" onChange={(e) => setEmail(e.target.value)} />
        <button type="submit" disabled={state === "busy"} className="btn btn-primary">
          {state === "busy" ? "…" : "Join free"}
        </button>
      </div>
      {state === "error" && (
        <span className="nl-err">Didn&apos;t save — try once more?</span>
      )}
    </form>
  );
}
