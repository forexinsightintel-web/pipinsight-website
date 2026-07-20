"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import school from "../../../content/school.json";
import fs from "./written.json";

/* The Trading School hub — the free structured curriculum (the BabyPips
   architecture, our content and voice). All free forever: the school is
   the SEO engine and the top of the funnel. Progress lives on-device. */

const TEAL = "#1AAF8B", DIM = "#64748B", INK = "#0F172A";
const PROG_KEY = "pipinsight_school_v1";

type Lesson = { slug: string; title: string; mins: number };
type Level = { no: number; slug: string; name: string; blurb: string; lessons: Lesson[] };

export default function SchoolPage() {
  const [done, setDone] = useState<string[]>([]);
  useEffect(() => {
    try { setDone(JSON.parse(localStorage.getItem(PROG_KEY) || "[]")); } catch {}
  }, []);
  const levels = school.levels as Level[];
  const total = levels.reduce((n, l) => n + l.lessons.length, 0);
  const written = new Set(fs as string[]);
  const pct = Math.round((done.length / total) * 100);

  return (
    <div>
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/">
            <Image src="/logo.png" alt="PIP:Insight" width={160} height={44} className="logo-img" />
          </Link>
          <div className="nav-links">
            <Link href="/#analysis">Today&apos;s Analysis</Link>
            <Link href="/journal">Journal</Link>
            <Link href="/school" style={{ color: "var(--teal)", fontWeight: 700 }}>School</Link>
            <Link href="/courses">Courses</Link>
            <Link href="/tape">The Tape</Link>
            <Link href="/glossary">Glossary</Link>
            <Link href="/free">Free Tools</Link>
            <Link href="/#pricing">Pricing</Link>
          </div>
        </div>
      </nav>

      <main className="container" style={{ maxWidth: 860, padding: "40px 20px 70px" }}>
        <div className="eyebrow">THE TRADING SCHOOL — FREE, FOREVER</div>
        <h1 style={{ fontSize: "clamp(30px, 6.5vw, 44px)", lineHeight: 1.1,
          margin: "10px 0 10px", fontWeight: 900 }}>
          From absolute zero to a<br />
          <span style={{ color: TEAL }}>written trading plan.</span>
        </h1>
        <p style={{ fontSize: 16, color: "#475569", maxWidth: 620, lineHeight: 1.6 }}>
          {school.strap} Six levels, {total} lessons, a quiz at the end of every
          one. No account needed — your progress saves on this device.
        </p>

        <div style={{ margin: "18px 0 30px", maxWidth: 620 }}>
          <div style={{ display: "flex", justifyContent: "space-between",
            fontSize: 12.5, fontWeight: 700, color: DIM, marginBottom: 6 }}>
            <span>Your progress</span><span>{done.length}/{total} lessons · {pct}%</span>
          </div>
          <div style={{ height: 10, borderRadius: 6, background: "#E8EEF4" }}>
            <div style={{ height: "100%", width: `${pct}%`, borderRadius: 6,
              background: `linear-gradient(90deg, ${TEAL}, #13896D)`,
              transition: "width .4s" }} />
          </div>
        </div>

        {levels.map(level => {
          const levelDone = level.lessons.filter(l => done.includes(l.slug)).length;
          return (
            <section key={level.slug} style={{ marginBottom: 26 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12,
                flexWrap: "wrap" }}>
                <span style={{ fontSize: 13, fontWeight: 900, color: "#fff",
                  background: INK, borderRadius: 8, padding: "4px 10px" }}>
                  LEVEL {level.no}</span>
                <h2 style={{ fontSize: 21, fontWeight: 900, margin: 0 }}>{level.name}</h2>
                <span style={{ fontSize: 12.5, color: DIM, fontWeight: 700 }}>
                  {levelDone}/{level.lessons.length}</span>
              </div>
              <p style={{ fontSize: 14, color: DIM, margin: "6px 0 12px",
                maxWidth: 620 }}>{level.blurb}</p>
              <div style={{ background: "#fff", border: "1px solid #E5E7EB",
                borderRadius: 14, overflow: "hidden" }}>
                {level.lessons.map((l, i) => {
                  const isDone = done.includes(l.slug);
                  const ready = written.has(l.slug);
                  const row = (
                    <div style={{ display: "flex", alignItems: "center", gap: 12,
                      padding: "13px 16px",
                      borderTop: i ? "1px solid #F1F5F9" : "none" }}>
                      <span style={{ width: 26, height: 26, borderRadius: 8,
                        flex: "0 0 26px", display: "inline-flex",
                        alignItems: "center", justifyContent: "center",
                        fontSize: 13, fontWeight: 900,
                        background: isDone ? TEAL : "#F1F5F9",
                        color: isDone ? "#fff" : DIM }}>
                        {isDone ? "✓" : level.no + "." + (i + 1)}</span>
                      <span style={{ flex: 1, fontWeight: 700, fontSize: 15,
                        color: ready ? INK : "#A6B3C4" }}>{l.title}</span>
                      <span style={{ fontSize: 12, color: DIM, whiteSpace: "nowrap" }}>
                        {ready ? `${l.mins} min` : "coming soon"}</span>
                    </div>
                  );
                  return ready ? (
                    <Link key={l.slug} href={`/school/${l.slug}`}
                      style={{ textDecoration: "none", color: "inherit",
                        display: "block" }}>{row}</Link>
                  ) : <div key={l.slug}>{row}</div>;
                })}
              </div>
            </section>
          );
        })}

        <div style={{ background: "#F0FDF9", border: `1.5px solid ${TEAL}`,
          borderRadius: 14, padding: "16px 20px", marginTop: 8 }}>
          <b>Finished a level?</b> <span style={{ color: "#475569", fontSize: 14.5 }}>
          The <Link href="/journal" style={{ color: "#13896D", fontWeight: 700 }}>free
          journal</Link> is where the theory meets your own numbers, and the{" "}
          <Link href="/glossary" style={{ color: "#13896D", fontWeight: 700 }}>glossary</Link>{" "}
          translates any jargon we missed.</span>
        </div>

        <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 30, lineHeight: 1.6 }}>
          Educational content only — never financial advice, never an instruction
          to trade. Most retail traders lose money. Capital at risk. 18+.
        </p>
      </main>
    </div>
  );
}
