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
  gold: "from-amber-500/20 border-amber-500/40 text-amber-400",
  green: "from-emerald-500/20 border-emerald-500/40 text-emerald-400",
  cyan: "from-cyan-500/20 border-cyan-500/40 text-cyan-400",
  amber: "from-orange-500/20 border-orange-500/40 text-orange-400",
  magenta: "from-fuchsia-500/20 border-fuchsia-500/40 text-fuchsia-400",
  blue: "from-sky-500/20 border-sky-500/40 text-sky-400",
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
      else alert(d.error || "Checkout unavailable — launching very soon.");
    } finally { setBusy(""); }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/"><Image src="/logo.png" alt="PIP:Insight" width={140} height={38} className="h-9 w-auto" /></Link>
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="px-3 py-1.5 rounded-lg text-slate-400 hover:bg-slate-800">Today&apos;s Analysis</Link>
            <span className="px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 font-semibold">Courses</span>
            <Link href="/journal" className="px-3 py-1.5 rounded-lg text-slate-400 hover:bg-slate-800">Journal</Link>
          </div>
        </div>
      </nav>

      <header className="max-w-7xl mx-auto px-4 pt-12 pb-6 text-center">
        <h1 className="text-4xl font-black text-white">The Forex School Course Library</h1>
        <p className="text-slate-400 mt-3 max-w-2xl mx-auto">
          Every major trading strategy, taught properly. Each course is a complete ebook
          with a matching free video series on the PIP:Insight YouTube channel — start
          with the videos, own the book.
        </p>
        <p className="text-[11px] text-slate-600 mt-2">Educational content only. Not financial advice. Capital at risk.</p>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-16 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(catalog as Course[]).map((c) => {
          const acc = ACCENT[c.accent_theme] ?? ACCENT.gold;
          const expanded = open === c.slug;
          return (
            <div key={c.slug}
              className={`bg-gradient-to-b ${acc.split(" ")[0]} to-slate-900/60 border ${acc.split(" ")[1]} rounded-2xl p-5 flex flex-col`}>
              <div className="flex items-center justify-between text-[11px] font-bold tracking-widest uppercase">
                <span className={acc.split(" ")[2]}>Course {c.course_no} · {c.level}</span>
                <span className="text-slate-400">£{c.ebook_price_gbp.toFixed(2)}</span>
              </div>
              <h2 className="text-xl font-black text-white mt-2">{c.title}</h2>
              <p className="text-sm text-slate-400 mt-2 flex-1">{c.pitch}</p>
              <button onClick={() => setOpen(expanded ? "" : c.slug)}
                className="text-left text-xs text-slate-500 hover:text-slate-300 mt-3">
                {expanded ? "▾ Hide contents" : `▸ ${c.chapters.length} chapters · ${c.video_lessons.length} video lessons`}
              </button>
              {expanded && (
                <ol className="text-xs text-slate-400 mt-2 space-y-1 list-decimal list-inside">
                  {c.chapters.map((ch) => <li key={ch}>{ch}</li>)}
                </ol>
              )}
              <div className="flex gap-2 mt-4">
                <button onClick={() => buy(c.slug)} disabled={busy === c.slug}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold py-2.5 rounded-xl text-sm">
                  {busy === c.slug ? "Opening checkout…" : `Buy the ebook — £${c.ebook_price_gbp.toFixed(2)}`}
                </button>
                <a href="https://www.youtube.com/@PIPInsightForexAnalysis" target="_blank"
                  className="px-3 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-sm hover:bg-slate-800">
                  ▶ Free videos
                </a>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
