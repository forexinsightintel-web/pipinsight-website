"use client";

import Link from "next/link";
import { useState } from "react";
import index from "../../content/analysis/index.json";

type Card = { symbol: string; slug: string; free: boolean; bias: string; price: number; change_pct: number };
type Index = { date_str: string; sample?: boolean; categories: Record<string, Card[]> };

const TABS: { key: string; label: string; soon?: boolean }[] = [
  { key: "majors", label: "Majors" },
  { key: "crosses", label: "Cross Pairs" },
  { key: "exotics", label: "Exotics" },
  { key: "uk-stocks", label: "UK Stocks", soon: true },
  { key: "us-stocks", label: "US Stocks", soon: true },
];

const fmt = (p: number) => p >= 100 ? p.toFixed(2) : p >= 10 ? p.toFixed(3) : p.toFixed(4);

export default function AnalysisHub() {
  const idx = index as Index;
  const [tab, setTab] = useState("majors");
  const active = TABS.find((t) => t.key === tab)!;
  const cards = idx.categories[tab] ?? [];
  const pill = (b: string) => b === "BULLISH" ? "bull" : b === "BEARISH" ? "bear" : "neu";
  const arrow = (b: string) => b === "BULLISH" ? "▲" : b === "BEARISH" ? "▼" : "◆";

  return (
    <div>
      {idx.sample && <div className="hub-sample-note">⚠ {idx.date_str}</div>}
      <div className="hub-tabs">
        {TABS.map((t) => (
          <button key={t.key}
            className={`hub-tab ${tab === t.key ? "active" : ""} ${t.soon ? "soon" : ""}`}
            onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      {active.soon ? (
        <div className="hub-soon-panel">
          <h3 style={{ fontSize: 20, fontWeight: 900, color: "var(--ink)", marginBottom: 8 }}>
            {active.label} — unlocking soon
          </h3>
          <p>Full daily desk analysis for the top {active.label.toLowerCase()} is on its way.<br />
            Full Access members get them the day they land.</p>
        </div>
      ) : (
        <>
          <div className="hub-grid">
            {cards.map((c) => c.free ? (
              <Link key={c.slug} href={`/analysis/${c.slug}`} className="hub-card">
                <span className={`bias-pill ${pill(c.bias)}`}>{arrow(c.bias)} {c.bias}</span>
                <div className="hub-sym">{c.symbol}</div>
                <div className="hub-price">{fmt(c.price)}</div>
                <div className="hub-chg" style={{ color: c.change_pct >= 0 ? "var(--teal-dk)" : "var(--red)" }}>
                  {c.change_pct >= 0 ? "+" : ""}{c.change_pct}% today · Read the desk note →
                </div>
              </Link>
            ) : (
              <div key={c.slug} className="hub-card hub-locked">
                <span className={`bias-pill ${pill(c.bias)}`}>{arrow(c.bias)} {c.bias}</span>
                <div className="hub-sym">{c.symbol}</div>
                <div className="hub-price">{fmt(c.price)}</div>
                <div className="hub-chg">{c.change_pct >= 0 ? "+" : ""}{c.change_pct}% today</div>
                <div className="hub-lock-overlay">
                  <span style={{ fontSize: 18 }}>🔒</span>
                  {c.symbol}
                </div>
              </div>
            ))}
          </div>
          <div className="hub-unlock-bar">
            <b>Full Access — £9.99/month.</b> Every instrument unlocked, full desk
            analysis daily, plus Journal Pro included.&nbsp;
            <a href="#pricing" className="btn btn-primary btn-sm">Unlock everything</a>
          </div>
        </>
      )}
    </div>
  );
}
