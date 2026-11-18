import Home, { type HomeCard } from '../../components/tf/Home';
import SiteHeader from '../../components/tf/SiteHeader';
import { COURSES, price } from '../../lib/academy';
import ART from '../../../content/course-art.json';

const ORDER = ['forex-from-zero', 'scalping-mastery', 'trend-pullback', 'breakout-retest', 'rsi-divergence', 'macd-masterclass', 'support-resistance-zones', 'smart-money-concepts', 'risk-management'];
type Art = { top: string; bottom: string; ink: string; dark: boolean; svg: string };

export default function Page() {
  const cards: HomeCard[] = ORDER.map((s) => COURSES.find((c) => c.slug === s)).filter((c) => !!c).map((c) => {
    const a = (ART as Record<string, Art>)[c!.slug];
    return { slug: c!.slug, title: c!.title.replace(/:.*$/, '').replace(/ — .*$/, ''), level: c!.level, lessons: c!.lesson_count, price: price(c!) === 'Free' ? 'Free' : `£${c!.price_gbp.toFixed(2)}`, ...a };
  });
  return <main><SiteHeader variant="over" /><Home cards={cards} /></main>;
}
