import Home from '../../components/tf/Home';
import { COURSES, TOTALS, CLIP, price } from '../../lib/academy';
import { PLAYBOOKS, gbp } from '../../lib/playbooks';

const TAG: Record<string, [string, string]> = { 'scalping-mastery': ['MOST WATCHED', 'g'], 'forex-from-zero': ['FREE', 'g'], 'breakout-retest': ['NEW FILM', 'o'] };
const WALL = ['breakout', 'rsi', 'pullback', 'scalp', 'smc', 'scalp1m', 'smc2', 'smc3', 'range', 'readchart', 'trendlines', 'daytrading', 'vwap', 'openingrange', 'fvg'];

export default function Page() {
  const order = ['scalping-mastery', 'trend-pullback', 'breakout-retest', 'rsi-divergence', 'smart-money-concepts', 'macd-masterclass', 'support-resistance-zones', 'risk-management', 'forex-from-zero'];
  const courses = order.map((s) => COURSES.find((c) => c.slug === s)!).filter(Boolean).map((c) => ({
    slug: c.slug, title: c.title.replace(/:.*$/, '').replace(/ — .*$/, ''), subtitle: c.subtitle, level: c.level, lessons: c.lesson_count,
    price: price(c), art: c.art, clip: CLIP[c.art], tag: TAG[c.slug]?.[0], tagClass: TAG[c.slug]?.[1],
  }));
  const books = PLAYBOOKS.map((p) => ({ cover: p.cover, title: p.title, price: gbp(p.price) }));
  return <main className="tf-page"><Home courses={courses} wall={WALL.map((w) => `/media/thumbs/${w}.webp`)} books={books} totals={TOTALS} bookCount={PLAYBOOKS.length} /></main>;
}
