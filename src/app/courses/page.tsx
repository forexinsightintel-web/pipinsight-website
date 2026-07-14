"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import catalog from "../../../content/catalog.json";

type Course = {
  course_no: number; slug: string; title: string; strategy: string;
  pitch: string; level: string; ebook_price_gbp: number;
  chapters: string[]; video_lessons: string[]; accent_theme: string;
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
            <Link href="/courses" style={{ color: "var(--teal)", fontWeight: 700 }}>Courses</Link>
            <Link href="/journal">Journal</Link>
            <Link href="/journal" className="btn btn-primary btn-sm">Trade Journal →</Link>
          </div>
        </div>
      </nav>

      <header className="courses-hero">
        <div className="container">
          <div className="eyebrow">FOREX SCHOOL · 15 COMPLETE COURSES</div>
          <h1>Every Strategy. <span>Taught Properly.</span></h1>
          <p className="courses-sub">
            Each course is a complete ebook with a matching free video series on the
            PIP:Insight YouTube channel — start with the videos, own the book when
            you want the full depth.
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
                  <div className="course-actions">
                    <button className="btn btn-primary" disabled={busy === c.slug}
                      onClick={() => buy(c.slug)}>
                      {busy === c.slug ? "Opening checkout…" : `Buy the ebook — £${c.ebook_price_gbp.toFixed(2)}`}
                    </button>
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
