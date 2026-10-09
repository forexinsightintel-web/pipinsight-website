// The playbook (ebook) store, driven by content/catalog.json. Playbook 1 is held back until it
// has been rebuilt in the Trading Foundry style (its PDF still carries the old branding).
import catalog from "../../content/catalog.json";

export type Playbook = { no: number; slug: string; title: string; strategy: string; pitch: string; level: string; price: number; cover: string; available: boolean };
const HIDDEN = new Set(["support-resistance-mastery"]);
const coverFile = (no: number, slug: string) => `/media/covers/course${no}_${slug}.webp`;

export const PLAYBOOKS: Playbook[] = (catalog as Array<Record<string, unknown>>)
  .map((c) => ({
    no: c.course_no as number, slug: c.slug as string, title: c.title as string, strategy: c.strategy as string,
    pitch: c.pitch as string, level: c.level as string, price: c.ebook_price_gbp as number,
    cover: coverFile(c.course_no as number, c.slug as string), available: Boolean(c.ebook_available) && !HIDDEN.has(c.slug as string),
  }))
  .filter((p) => p.available);

export const gbp = (n: number) => `£${n.toFixed(2)}`;
export const MIN_PRICE = Math.min(...PLAYBOOKS.map((p) => p.price));
