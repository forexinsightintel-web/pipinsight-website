import type { MetadataRoute } from "next";
import idx from "../../content/analysis/index.json";
import lessons from "./school/written.json";

const BASE = "https://pip-insight.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const core: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "hourly", priority: 1 },
    { url: `${BASE}/tape`, changeFrequency: "hourly", priority: 0.9 },
    { url: `${BASE}/journal`, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE}/courses`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/free`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/school`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/glossary`, changeFrequency: "weekly", priority: 0.8 },
  ];
  const cats = (idx as { categories: Record<string, { slug: string }[]> })
    .categories;
  const instruments = Object.values(cats).flat().map((i) => ({
    url: `${BASE}/analysis/${i.slug}`,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));
  const school = (lessons as string[]).map((slug) => ({
    url: `${BASE}/school/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...core, ...instruments, ...school];
}
