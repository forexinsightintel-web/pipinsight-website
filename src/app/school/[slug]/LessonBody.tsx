"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/* Client half of a lesson: renders the markdown-lite body, runs the
   quiz with instant feedback, saves completion to device progress. */

const TEAL = "#1AAF8B", DIM = "#64748B", INK = "#0F172A", RED = "#E8476A";
const PROG_KEY = "pipinsight_school_v1";

type Q = { q: string; opts: string[]; a: number };

function render(body: string) {
  return body.split(/\n\n+/).map((block, i) => {
    if (block.startsWith("## "))
      return <h2 key={i} style={{ fontSize: 19, fontWeight: 900,
        margin: "26px 0 8px", color: INK }}>{block.slice(3)}</h2>;
    return <p key={i} style={{ fontSize: 16, lineHeight: 1.7,
      color: "#334155", margin: "0 0 14px" }}>{block}</p>;
  });
}

export default function LessonBody(props: {
  slug: string; title: string; body: string; quiz: Q[];
  levelNo: number; levelName: string; mins: number;
  nextSlug: string | null; nextTitle: string | null;
}) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [saved, setSaved] = useState(false);
  const allRight = props.quiz.every((q, i) => answers[i] === q.a);
  const answeredAll = props.quiz.every((_, i) => answers[i] !== undefined);

  const complete = () => {
    try {
      const done: string[] = JSON.parse(localStorage.getItem(PROG_KEY) || "[]");
      if (!done.includes(props.slug)) done.push(props.slug);
      localStorage.setItem(PROG_KEY, JSON.stringify(done));
    } catch {}
    setSaved(true);
  };

  return (
    <div>
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/">
            <Image src="/logo.png" alt="PIP:Insight" width={160} height={44} className="logo-img" />
          </Link>
          <div className="nav-links">
            <Link href="/school" style={{ color: "var(--teal)", fontWeight: 700 }}>School</Link>
            <Link href="/journal">Journal</Link>
            <Link href="/glossary">Glossary</Link>
          </div>
        </div>
      </nav>

      <main className="container" style={{ maxWidth: 700, padding: "36px 20px 70px" }}>
        <Link href="/school" style={{ fontSize: 13, fontWeight: 700,
          color: "#13896D", textDecoration: "none" }}>← The Trading School</Link>
        <div className="eyebrow" style={{ marginTop: 14 }}>
          LEVEL {props.levelNo} · {props.levelName.toUpperCase()} · {props.mins} MIN READ</div>
        <h1 style={{ fontSize: "clamp(26px, 6vw, 36px)", lineHeight: 1.15,
          margin: "8px 0 18px", fontWeight: 900 }}>{props.title}</h1>

        {render(props.body)}

        <div style={{ background: "#fff", border: "1px solid #E5E7EB",
          borderRadius: 14, padding: "20px 22px", marginTop: 30 }}>
          <div style={{ fontWeight: 900, fontSize: 15, letterSpacing: ".08em",
            color: "#B45309", marginBottom: 4 }}>PROVE IT — {props.quiz.length} QUESTIONS</div>
          {props.quiz.map((q, i) => (
            <div key={i} style={{ margin: "16px 0 0" }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>
                {i + 1}. {q.q}</div>
              <div style={{ display: "grid", gap: 6 }}>
                {q.opts.map((opt, j) => {
                  const picked = answers[i] === j;
                  const showState = answers[i] !== undefined;
                  const right = j === q.a;
                  return (
                    <button key={j}
                      onClick={() => setAnswers({ ...answers, [i]: j })}
                      style={{ textAlign: "left", fontSize: 14.5, fontWeight: 600,
                        padding: "10px 14px", borderRadius: 10, cursor: "pointer",
                        border: `1.5px solid ${picked ? (right ? TEAL : RED) : "#E2E8F0"}`,
                        background: picked ? (right ? "#F0FDF9" : "#FEF1F4")
                          : showState && right ? "#F8FDF9" : "#fff",
                        color: INK }}>
                      {opt}{picked && (right ? "  ✓" : "  ✗")}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          {answeredAll && (
            <div style={{ marginTop: 18 }}>
              {allRight ? (
                !saved ? (
                  <button onClick={complete} className="btn btn-primary"
                    style={{ fontWeight: 800, fontSize: 15, padding: "11px 22px",
                      borderRadius: 10 }}>
                    Full marks — mark lesson complete</button>
                ) : (
                  <div style={{ fontWeight: 800, color: "#13896D", fontSize: 15 }}>
                    ✓ Saved to your progress
                    {props.nextSlug && (
                      <div style={{ marginTop: 10 }}>
                        <Link href={`/school/${props.nextSlug}`}
                          style={{ color: "#13896D" }}>
                          Next: {props.nextTitle} →</Link>
                      </div>
                    )}
                  </div>
                )
              ) : (
                <div style={{ fontWeight: 700, color: RED, fontSize: 14 }}>
                  Not quite — the red ones want another look.</div>
              )}
            </div>
          )}
        </div>

        <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 26, lineHeight: 1.6 }}>
          Educational content only — never financial advice. Most retail traders
          lose money. Capital at risk. 18+.
        </p>
      </main>
    </div>
  );
}
