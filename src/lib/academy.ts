// Course content loader. index.json is public course metadata; <slug>.json holds the
// full lesson HTML and is only ever read on the server (lesson pages gate it per request).
import fs from "fs";
import path from "path";
import indexData from "../../content/academy/index.json";

export type LessonMeta = { slug: string; n: number; title: string; summary: string; minutes: number; free: boolean };
export type Module = { title: string; lessons: LessonMeta[] };
export type Film = { id: string; title: string };
export type Course = {
  slug: string; title: string; subtitle: string; level: string; price_gbp: number; hours?: number;
  films: Film[]; outcomes: string[]; who_for?: string[]; prerequisites?: string[]; includes?: string[];
  passport?: Record<string, string>; art: string; lesson_count: number; chart_count: number; words: number; modules: Module[];
};
export type Quiz = { q: string; options: string[]; answer: number; why?: string };
export type Lesson = LessonMeta & { module: number; module_title: string; html: string; quiz: Quiz[] };

const idx = indexData as unknown as { courses: Course[]; totals: { courses: number; lessons: number; charts: number; words: number } };
export const COURSES: Course[] = idx.courses;
export const TOTALS = idx.totals;
export const getCourse = (slug: string) => COURSES.find((c) => c.slug === slug);

export function getLessons(slug: string): Lesson[] {
  const p = path.join(process.cwd(), "content", "academy", `${slug}.json`);
  if (!/^[a-z0-9-]+$/.test(slug) || !fs.existsSync(p)) return [];
  return JSON.parse(fs.readFileSync(p, "utf8")).lessons as Lesson[];
}

export const ART_THUMB = (art: string) => `/media/thumbs/${art}.webp`;
export const CLIP: Record<string, string> = {
  scalp: "/media/clip_scalp.mp4", pullback: "/media/clip_pullback.mp4", breakout: "/media/clip_breakout.mp4", rsi: "/media/clip_rsi.mp4",
};
export const LEVEL_KEY = (l: string) => (/beginner/i.test(l) && !/intermediate/i.test(l) ? "beg" : /advanced/i.test(l) ? "adv" : /all/i.test(l) ? "all" : "int");
export const price = (c: Course) => (c.price_gbp ? `£${c.price_gbp}` : "Free");
export const PASS_PRICE = 149;
