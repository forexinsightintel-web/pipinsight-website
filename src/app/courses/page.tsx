"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import catalog from "../../../content/catalog.json";

type Bonus = { key: string; title: string; blurb: string };
type Course = {
  course_no: number; slug: string; title: string; strategy: string;
  pitch: string; level: string; ebook_price_gbp: number;
  chapters: string[]; video_lessons: string[]; accent_theme: string;
  ebook_available?: boolean; bonuses?: Bonus[];
};

const ACCENT: Record<string, string> = {
  gold: "#D4A017",
  green: "#1AAF8B",
  cyan: "#0891B2",
  amber: "#EA580C",
  magenta: "#C026D3",
  blue: "#2563EB",
};

export default function CoursesPage() {
  const [busy, setBusy] = useState("");
  const [open, setOpen] = useState("");
  const [bought, setBought] = useState<{ slug: string; sid: string } | null>(null);
  useEffect(() => {
    try {
      const u = new URL(window.location.href);
      const slug = u.searchParams.get("purchased");
      const sid = u.searchParams.get("session_id");
      if (slug && sid) setBought({ slug, sid });
    } catch {}
  }, []);

  const buy = async (slug: string) => {
    setBusy(slug);
    try {
      const r = await fetch("/api/checkout", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ kind: "ebook", slug }),
      });
      const d = await r.json();
      if (d.url) window.location.href = d.url;
      else alert(d.error || "Checkout is launching very soon — check back shortly.");
    } finally { setBusy(""); }
  };

  return (
    <div>
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/">
            <Image src="/logo.png" alt="PIP:Insight" width={160} height={44} className="logo-img" />
          </Link>
          <div className="nav-links">
            <Link href="/">Today&apos;s Analysis</Link>
            <Link href="/school">School</Link>
            <Link href="/courses" style={{ color: "var(--teal)", fontWeight: 700 }}>Courses</Link>
            <Link href="/journal">Journal</Link>
            <Link href="/journal" className="btn btn-primary btn-sm">Trade Journal →</Link>
          </div>
        </div>
      </nav>

      {bought && (
        <div style={{ background: "#F0FDF9", borderBottom: "1.5px solid #1AAF8B",
          padding: "16px 20px", textAlign: "center", fontSize: 15 }}>
          <b>Payment received — thank you.</b>{" "}
          <a href={`/api/ebook/download?session_id=${bought.sid}`}
            style={{ fontWeight: 800, color: "#13896D" }}>
            Download your ebook (PDF) →</a>
          <div style={{ fontSize: 13.5, marginTop: 8, display: "flex", gap: 14,
            justifyContent: "center", flexWrap: "wrap" }}>
            <span style={{ color: "#64748B", fontWeight: 700 }}>Your bonuses:</span>
            <a href={`/api/ebook/download?session_id=${bought.sid}&bonus=glossary`}
              style={{ color: "#13896D", fontWeight: 700 }}>Glossary</a>
            <a href={`/api/ebook/download?session_id=${bought.sid}&bonus=cheatsheet`}
              style={{ color: "#13896D", fontWeight: 700 }}>Levels Cheat Sheet</a>
            <a href={`/api/ebook/download?session_id=${bought.sid}&bonus=quickstart`}
              style={{ color: "#13896D", fontWeight: 700 }}>Journal Quick-Start</a>
            <a href="/downloads/pip-insight-discipline-tracker.xlsx"
              style={{ color: "#13896D", fontWeight: 700 }}>Discipline Tracker</a>
          </div>
          <div style={{ color: "#64748B", fontSize: 12.5, marginTop: 6 }}>
            Keep this page's link — everything re-downloads any time.</div>
        </div>
      )}

      <header className="courses-hero">
        <div className="container">
          <div className="eyebrow">FOREX SCHOOL · 15 COMPLETE COURSES</div>
          <h1>Every Strategy. <span>Taught Properly.</span></h1>
          <p className="courses-sub">
            Each course is a complete ebook with a matching free video series on the
            PIP:Insight YouTube channel — start with the videos, own the book when
            you want the full depth. Every book is priced at a pint, not a
            mentorship: no upsells waiting behind the last chapter.
          </p>
          <p className="courses-note">
            Educational content only · Not financial advice · Trading involves substantial risk of loss
          </p>
        </div>
      </header>

      <section className="courses-section">
        <div className="container">
          <div className="courses-grid">
            {(catalog as Course[]).map((c) => {
              const accent = ACCENT[c.accent_theme] ?? ACCENT.green;
              const expanded = open === c.slug;
              return (
                <article key={c.slug} className="course-card"
                  style={{ ["--accent" as string]: accent }}>
                  <div className="course-meta">
                    <span className="course-level">Course {c.course_no} · {c.level}</span>
                    <span className="course-price">£{c.ebook_price_gbp.toFixed(2)}</span>
                  </div>
                  <h2>{c.title}</h2>
                  <p className="course-pitch">{c.pitch}</p>
                  <button className="course-toggle"
                    onClick={() => setOpen(expanded ? "" : c.slug)}>
                    {expanded
                      ? "▾ Hide course contents"
                      : `▸ ${c.chapters.length} chapters · ${c.video_lessons.length} free video lessons`}
                  </button>
                  {expanded && (
                    <ul className="course-chapters">
                      {c.chapters.map((ch) => <li key={ch}>{ch}</li>)}
                    </ul>
                  )}
                  {c.bonuses && c.ebook_available && (
                    <div className="course-bonuses">
                      <div className="course-bonuses-head">
                        INCLUDED FREE WITH THE BOOK
                      </div>
                      {c.bonuses.map((b) => (
                        <div key={b.key} className="course-bonus">
                          <b>{b.title}</b> — {b.blurb}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="course-actions">
                    {c.ebook_available ? (
                      <button className="btn btn-primary" disabled={busy === c.slug}
                        onClick={() => buy(c.slug)}>
                        {busy === c.slug ? "Opening checkout…" : `Buy the ebook — £${c.ebook_price_gbp.toFixed(2)}`}
                      </button>
                    ) : (
                      <span className="btn btn-ghost" style={{ cursor: "default",
                        opacity: .75 }}>
                        Ebook in production — £{c.ebook_price_gbp.toFixed(2)} at launch
                      </span>
                    )}
                    <a className="btn btn-ghost" target="_blank" rel="noreferrer"
                      href="https://www.youtube.com/@PIPInsightForexAnalysis">
                      ▶ Videos
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
