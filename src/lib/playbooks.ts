// The playbook (ebook) store, driven by content/catalog.json.
// Hidden from the store: playbook 1 (old branding) and the original single SMC playbook, which the
// six episode-matched SMC books replace. Hidden books still download for anyone who already bought them.
import catalog from "../../content/catalog.json";

export type Playbook = { no: number; slug: string; title: string; strategy: string; pitch: string; level: string; price: number; cover: string; available: boolean; series?: string; films?: string[] };
const HIDDEN = new Set(["support-resistance-mastery", "smart-money-concepts"]);
const coverFile = (no: number, slug: string) => `/media/covers/course${no}_${slug}.webp`;

export const ALL_BOOKS: Playbook[] = (catalog as Array<Record<string, unknown>>)
  .map((c) => ({
    no: c.course_no as number, slug: c.slug as string, title: c.title as string, strategy: c.strategy as string,
    pitch: c.pitch as string, level: c.level as string, price: c.ebook_price_gbp as number,
    cover: coverFile(c.course_no as number, c.slug as string), available: Boolean(c.ebook_available) && !HIDDEN.has(c.slug as string),
    series: (c.series as string) || undefined, films: (c.films as string[]) || undefined,
  }));

// Store order: the SMC series first (newest films), then the rest.
export const PLAYBOOKS: Playbook[] = ALL_BOOKS.filter((p) => p.available)
  .sort((a, b) => (a.series === "smc" ? 0 : 1) - (b.series === "smc" ? 0 : 1) || a.no - b.no);

export const gbp = (n: number) => `£${n.toFixed(2)}`;
export const MIN_PRICE = Math.min(...PLAYBOOKS.map((p) => p.price));
