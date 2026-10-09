import type { MetadataRoute } from "next";
import lessons from "./(legacy)/school/written.json";
import { COURSES, getLessons } from "../lib/academy";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://pip-insight.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const core: MetadataRoute.Sitemap = ["/", "/courses", "/playbooks", "/films", "/pricing", "/school", "/journal", "/free", "/glossary", "/privacy", "/terms", "/risk"]
    .map((p, i) => ({ url: `${BASE}${p}`, changeFrequency: "weekly" as const, priority: i === 0 ? 1 : 0.7 }));
  const courses = COURSES.flatMap((c) => [
    { url: `${BASE}/courses/${c.slug}`, changeFrequency: "weekly" as const, priority: 0.9 },
    // free lessons are public and indexable; paid ones are noindex
    ...getLessons(c.slug).filter((l) => l.free || c.price_gbp === 0).map((l) => ({ url: `${BASE}/courses/${c.slug}/${l.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ]);
  const school = (lessons as string[]).map((slug) => ({ url: `${BASE}/school/${slug}`, changeFrequency: "monthly" as const, priority: 0.5 }));
  return [...core, ...courses, ...school];
}
