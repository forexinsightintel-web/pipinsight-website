import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import SiteHeader from '../../../../components/tf/SiteHeader';
import BuyBox from '../../../../components/tf/BuyBox';
import FilmEmbed from '../../../../components/tf/FilmEmbed';
import { COURSES, getCourse, getLessons, CLIP } from '../../../../lib/academy';
import { COOKIE, verify, canRead } from '../../../../lib/access';

export function generateStaticParams() { return COURSES.map((c) => ({ slug: c.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const c = getCourse(slug);
  return c ? { title: c.title, description: c.subtitle, openGraph: { images: [`/media/thumbs/${c.art}.webp`] } } : {};
}

const PASS: [string, string][] = [['market', 'MARKET'], ['wait_for', 'WAIT FOR'], ['trigger', 'TRIGGER'], ['stop', 'STOP'], ['target', 'TARGET'], ['avoid', 'AVOID']];

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCourse(slug); if (!c) notFound();
  const lessons = getLessons(slug);
  const access = verify((await cookies()).get(COOKIE)?.value);
  const owned = canRead(access, slug);
  const drills = lessons.reduce((n, l) => n + (l.html.match(/data-drill/g) || []).length, 0);
  const quiz = lessons.reduce((n, l) => n + l.quiz.length, 0);
  const minutes = lessons.reduce((n, l) => n + (l.minutes || 0), 0);
  const free = c.price_gbp === 0;
  const first = lessons[0]?.slug || '';
  const includes = [`${c.films.length} film${c.films.length === 1 ? '' : 's'} on YouTube`, `${lessons.length} written lessons (${c.words.toLocaleString('en-GB')} words)`, `${c.chart_count} annotated training charts`, `${drills} trade-or-wait practice drills`, `${quiz} quiz questions with answers explained`, 'One-page strategy passport', 'Course playbook PDF (the whole course, printable)', 'Lifetime access on any device'];
  return (
    <main className="tf-page">
      <SiteHeader variant="over" active="/courses" />
      <div className="chero">{CLIP[c.art] ? <video autoPlay muted loop playsInline src={CLIP[c.art]} aria-hidden="true" /> : null}<div className="wrap">
        <div className="k" style={{ color: 'var(--gold)' }}>COURSE · {c.level.toUpperCase()}</div>
        <h1 className="d">{c.title.replace(/ — .*$/, '').replace(/:.*$/, '')}<span className="g">.</span></h1><span className="bar" />
        <p>{c.subtitle}</p>
        <div className="cmeta"><span className="pill o">{lessons.length} LESSONS</span><span className="pill l" style={{ color: 'var(--paper)', boxShadow: 'inset 0 0 0 1.5px var(--paperline)' }}>ABOUT {Math.round(minutes / 6) / 10} HOURS</span><span className="pill l" style={{ color: 'var(--paper)', boxShadow: 'inset 0 0 0 1.5px var(--paperline)' }}>{c.chart_count} CHARTS</span><span className="pill l" style={{ color: 'var(--paper)', boxShadow: 'inset 0 0 0 1.5px var(--paperline)' }}>{drills} DRILLS</span></div>
      </div></div>
      <section style={{ paddingTop: 64 }}><div className="wrap cpg">
        <div style={{ minWidth: 0 }}>
          {c.films[0] ? <><div className="k" style={{ color: 'var(--ink50)', marginBottom: 14 }}>START WITH THE FILM · FREE ON YOUTUBE</div><FilmEmbed id={c.films[0].id} title={c.films[0].title} /></> : null}
          <h2 className="d" style={{ fontSize: 44, marginTop: c.films[0] ? 64 : 0 }}>What you&apos;ll be able to do<span className="g">.</span></h2>
          <div className="learn">{c.outcomes.map((o) => <div key={o}>{o}</div>)}</div>
          {c.who_for || c.prerequisites ? <div className="who">
            {c.who_for ? <div><div className="k" style={{ color: 'var(--ink50)' }}>WHO IT&apos;S FOR</div><ul>{c.who_for.map((w) => <li key={w}>{w}</li>)}</ul></div> : null}
            {c.prerequisites ? <div><div className="k" style={{ color: 'var(--ink50)' }}>BEFORE YOU START</div><ul>{c.prerequisites.map((w) => <li key={w}>{w}</li>)}</ul></div> : null}
          </div> : null}
          {c.passport ? <><h2 className="d" style={{ fontSize: 44, marginTop: 64 }}>Strategy passport<span className="g">.</span></h2>
            <div className="passport">{PASS.filter(([k]) => c.passport?.[k]).map(([k, l]) => <div key={k} className={k === 'avoid' ? 'x' : ''}><b>{l}</b>{c.passport![k]}</div>)}</div></> : null}
          <h2 className="d" style={{ fontSize: 44, marginTop: 64 }}>Curriculum<span className="g">.</span></h2>
          <div className="mods">{c.modules.map((m, mi) => (
            <details className="mod" key={mi} open={mi === 0}><summary>{m.title}</summary>
              {m.lessons.map((l) => <div className="les" key={l.slug}><a href={`/courses/${slug}/${l.slug}`}>{l.free || owned ? '▶' : <span className="lock">🔒</span>} {l.title}{l.free && !free ? <span className="pill g" style={{ marginLeft: 8 }}>FREE PREVIEW</span> : null}</a><em>{l.minutes} MIN</em></div>)}
            </details>))}</div>
          {c.films.length > 1 ? <><h2 className="d" style={{ fontSize: 44, marginTop: 64 }}>Related films<span className="g">.</span></h2>
            <div className="films-row">{c.films.map((f) => <a className="film-card" key={f.id} href={`https://www.youtube.com/watch?v=${f.id}`} target="_blank" rel="noopener"><img src={`https://i.ytimg.com/vi/${f.id}/mqdefault.jpg`} alt="" loading="lazy" /><div>{f.title}<span>WATCH ON YOUTUBE →</span></div></a>)}</div></> : null}
          <p className="disclaim">Education only, not financial advice. Every chart in this course is an illustrative training example using synthetic price data. Trading foreign exchange on margin carries a high level of risk.</p>
        </div>
        <aside className="buy"><img src={`/media/thumbs/${c.art}.webp`} alt={`${c.title} film thumbnail`} /><div className="in">
          <BuyBox slug={slug} price={c.price_gbp} free={free} owned={owned} firstLesson={first} />
          <ul>{includes.map((i) => <li key={i}>{i}</li>)}</ul>
          {free || owned ? <a className="btn btn-line" style={{ width: '100%', marginTop: 16 }} href={`/api/course/pdf?slug=${slug}`}>Download the course playbook ↓</a> : null}
          {!free && !owned ? <div className="k" style={{ color: 'var(--ink50)', marginTop: 18, fontSize: 10.5 }}>30-DAY REFUND · SECURE STRIPE CHECKOUT · <a href="/restore" style={{ textDecoration: 'underline' }}>ALREADY BOUGHT? RESTORE ACCESS</a></div> : null}
        </div></aside>
      </div></section>
    </main>
  );
}
