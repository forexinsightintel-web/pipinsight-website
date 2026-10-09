import type { Metadata } from 'next';
import SiteHeader from '../../../components/tf/SiteHeader';
import CourseGrid from '../../../components/tf/CourseGrid';
import { COURSES, TOTALS, CLIP, LEVEL_KEY, price } from '../../../lib/academy';

export const metadata: Metadata = { title: 'Courses', description: 'Full forex strategy courses built from the Trading Foundry films: written lessons, annotated charts, practice drills, quizzes and a strategy passport.' };
const TAG: Record<string, [string, string]> = { 'scalping-mastery': ['MOST WATCHED', 'g'], 'forex-from-zero': ['FREE', 'g'], 'breakout-retest': ['NEW FILM', 'o'] };

export default function Courses() {
  const cards = COURSES.map((c) => ({ slug: c.slug, title: c.title.replace(/ — .*$/, ''), subtitle: c.subtitle, level: c.level, lk: LEVEL_KEY(c.level), lessons: c.lesson_count, charts: c.chart_count, price: price(c), art: c.art, clip: CLIP[c.art], tag: TAG[c.slug]?.[0], tagClass: TAG[c.slug]?.[1] }));
  return (
    <main className="tf-page">
      <SiteHeader variant="over" active="/courses" />
      <section className="phero"><video autoPlay muted loop playsInline src="/media/hero_broll.mp4" aria-hidden="true" /><div className="wrap">
        <div className="k" style={{ color: 'var(--gold)' }}>TRADING FOUNDRY UNIVERSITY · COURSES</div>
        <h1 className="d">The courses<span className="g">.</span></h1><span className="bar" />
        <p>One strategy per course, taught start to finish: the film, written lessons, annotated charts, practice drills that hide the future, quizzes and a one-page strategy passport.</p>
        <div className="stats"><div><b>{TOTALS.courses}</b>courses</div><div><b>{TOTALS.lessons}</b>lessons</div><div><b>{TOTALS.charts}</b>annotated charts</div><div><b>1</b>free beginner course</div></div>
      </div></section>
      <section className="catalog cream"><div className="wrap"><CourseGrid cards={cards} /></div></section>
    </main>
  );
}
