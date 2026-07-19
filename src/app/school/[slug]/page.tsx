import fs from "fs";
import path from "path";
import Link from "next/link";
import type { Metadata } from "next";
import school from "../../../../content/school.json";
import LessonBody from "./LessonBody";

/* Lesson pages — statically generated from content/school/<slug>.json.
   Each lesson: pub-English body, a three-question quiz, mark-complete
   progress, and next-lesson navigation. */

type Lesson = { slug: string; title: string; mins: number };
type Level = { no: number; slug: string; name: string; blurb: string; lessons: Lesson[] };

function allLessons(): { lesson: Lesson; level: Level }[] {
  const out: { lesson: Lesson; level: Level }[] = [];
  for (const level of school.levels as Level[])
    for (const lesson of level.lessons) out.push({ lesson, level });
  return out;
}

function lessonFile(slug: string) {
  const p = path.join(process.cwd(), "content/school", `${slug}.json`);
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : null;
}

export function generateStaticParams() {
  return allLessons()
    .filter(({ lesson }) => lessonFile(lesson.slug))
    .map(({ lesson }) => ({ slug: lesson.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = lessonFile(slug);
  const meta = allLessons().find(x => x.lesson.slug === slug);
  return {
    title: `${data?.title ?? "Lesson"} — The Trading School | PIP:Insight`,
    description: `Free forex education, level ${meta?.level.no}: ${data?.title}. ` +
      "Plain-English lessons with quizzes — from zero to a written trading plan.",
    alternates: { canonical: `/school/${slug}` },
  };
}

export default async function LessonPage(
  { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = lessonFile(slug);
  const list = allLessons();
  const idx = list.findIndex(x => x.lesson.slug === slug);
  const here = list[idx];
  const next = list.slice(idx + 1).find(x => lessonFile(x.lesson.slug));
  return (
    <LessonBody
      slug={slug}
      title={data.title}
      body={data.body}
      quiz={data.quiz}
      levelNo={here.level.no}
      levelName={here.level.name}
      mins={here.lesson.mins}
      nextSlug={next?.lesson.slug ?? null}
      nextTitle={next?.lesson.title ?? null}
    />
  );
}
