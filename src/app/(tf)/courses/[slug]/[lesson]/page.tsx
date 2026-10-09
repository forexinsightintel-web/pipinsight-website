import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import SiteHeader from '../../../../../components/tf/SiteHeader';
import { DrillsAndProgress, LessonQuiz, CompleteButton } from '../../../../../components/tf/LessonClient';
import { getCourse, getLessons } from '../../../../../lib/academy';
import { COOKIE, verify, canRead } from '../../../../../lib/access';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string; lesson: string }> }): Promise<Metadata> {
  const { slug, lesson } = await params; const l = getLessons(slug).find((x) => x.slug === lesson); const c = getCourse(slug);
  return l && c ? { title: `${l.title} · ${c.title.replace(/ — .*$/, '')}`, description: l.summary, robots: l.free ? undefined : { index: false } } : {};
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string; lesson: string }> }) {
  const { slug, lesson } = await params;
  const c = getCourse(slug); const lessons = getLessons(slug); const i = lessons.findIndex((l) => l.slug === lesson);
  if (!c || i < 0) notFound();
  const L = lessons[i]; const next = lessons[i + 1];
  const access = verify((await cookies()).get(COOKIE)?.value);
  const open = L.free || c.price_gbp === 0 || canRead(access, slug);
  const teaser = open ? '' : (L.html.match(/<p>[\s\S]*?<\/p>/) || [''])[0];
  return (
    <main className="tf-page" style={{ background: 'var(--white)' }}>
      <SiteHeader variant="light" active="/courses" />
      <div className="wrap lwrap">
        <nav className="ltoc" aria-label="Lessons in this course">
          <a href={`/courses/${slug}`} style={{ borderTop: 0, paddingTop: 0 }}><span className="k">← {c.title.replace(/ — .*$/, '').replace(/:.*$/, '').toUpperCase()}</span></a>
          {c.modules.map((m, mi) => <div key={mi}><div className="mt">{m.title}</div>
            {m.lessons.map((x) => <a key={x.slug} href={`/courses/${slug}/${x.slug}`} aria-current={x.slug === lesson ? 'page' : undefined}><i data-lesson-tick={x.slug} className={!(x.free || c.price_gbp === 0 || canRead(access, slug)) ? 'lk' : ''} />{x.title}</a>)}</div>)}
        </nav>
        <article className="lbody">
          <div className="k" style={{ color: 'var(--ink50)' }}>{L.module_title.toUpperCase()} · LESSON {L.n} OF {lessons.length} · {L.minutes} MIN</div>
          <h1 className="d">{L.title}<span className="g">.</span></h1><span className="bar" />
          <p className="lsum">{L.summary}</p>
          {open ? <>
            <div className="prose" dangerouslySetInnerHTML={{ __html: L.html }} />
            <LessonQuiz quiz={L.quiz} />
            <CompleteButton course={slug} lesson={lesson} next={next ? { href: `/courses/${slug}/${next.slug}`, title: next.title } : undefined} />
            <DrillsAndProgress course={slug} lesson={lesson} />
          </> : <>
            <div className="prose teaser" dangerouslySetInnerHTML={{ __html: teaser }} />
            <div className="paywall"><div className="k" style={{ color: 'var(--gold)' }}>THIS LESSON IS PART OF THE FULL COURSE</div>
              <h2 className="d" style={{ marginTop: 12 }}>Unlock {c.title.replace(/ — .*$/, '').replace(/:.*$/, '')}<span className="g">.</span></h2>
              <p>{lessons.length} lessons, {c.chart_count} annotated charts, practice drills and quizzes. One payment of £{c.price_gbp}, yours for good. Lesson 1 is free to read.</p>
              <div className="row"><a className="btn btn-gold" href={`/courses/${slug}`}>See the course <span className="arr">→</span></a><a className="btn btn-ghost" href={`/courses/${slug}/${lessons[0].slug}`}>Read lesson 1 free</a><a className="btn btn-ghost" href="/restore">Restore access</a></div></div>
          </>}
          <p className="disclaim">Education only, not financial advice. Charts are illustrative training examples using synthetic price data, not real market history or results.</p>
        </article>
      </div>
    </main>
  );
}
