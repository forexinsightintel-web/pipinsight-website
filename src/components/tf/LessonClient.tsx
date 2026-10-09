'use client';
// Lesson interactivity: drill reveal buttons, the quiz, and progress saved on this device.
import { useEffect, useState } from 'react';
import type { Quiz } from '../../lib/academy';

const KEY = 'tf_progress_v1';
const load = (): Record<string, boolean> => { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; } };
const save = (p: Record<string, boolean>) => { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* storage unavailable */ } };

export function DrillsAndProgress({ course, lesson }: { course: string; lesson: string }) {
  useEffect(() => {
    const figs = Array.from(document.querySelectorAll('figure[data-drill]')) as HTMLElement[];
    const offs = figs.map((f) => {
      const img = f.querySelector('img') as HTMLImageElement; const ans = f.querySelector('.ans') as HTMLElement;
      const h = (e: Event) => { const b = (e.target as HTMLElement).closest('.opt') as HTMLElement | null; if (!b) return;
        f.querySelectorAll('.opt').forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
        if (img.dataset.reveal) img.src = img.dataset.reveal; ans.hidden = false; };
      f.addEventListener('click', h); return () => f.removeEventListener('click', h);
    });
    const p = load();
    document.querySelectorAll('[data-lesson-tick]').forEach((el) => { if (p[`${course}/${(el as HTMLElement).dataset.lessonTick}`]) el.classList.add('ok'); });
    return () => offs.forEach((o) => o());
  }, [course, lesson]);
  return null;
}

export function LessonQuiz({ quiz }: { quiz: Quiz[] }) {
  const [picked, setPicked] = useState<Record<number, number>>({});
  if (!quiz.length) return null;
  const done = Object.keys(picked).length; const right = Object.entries(picked).filter(([i, a]) => quiz[+i].answer === a).length;
  return (
    <section className="lquiz" aria-label="Lesson quiz">
      <div className="k" style={{ color: 'var(--gold)' }}>CHECK YOUR UNDERSTANDING</div>
      <h3 className="d" style={{ marginTop: 10 }}>Quick quiz<span className="g">.</span></h3>
      {quiz.map((q, i) => (
        <div key={i}>
          <div className="qn">QUESTION {i + 1} OF {quiz.length}</div>
          <div className="qq">{q.q}</div>
          {q.options.map((o, j) => {
            const has = picked[i] !== undefined; const cls = has ? (j === q.answer ? ' right' : j === picked[i] ? ' wrong' : '') : '';
            return <button key={j} className={`qo${cls}`} disabled={has} onClick={() => setPicked({ ...picked, [i]: j })}>{o}</button>;
          })}
          {picked[i] !== undefined && q.why ? <p className="why">{q.why}</p> : null}
        </div>
      ))}
      <div className="score">{done === quiz.length ? `YOU SCORED ${right} / ${quiz.length}` : `${done} OF ${quiz.length} ANSWERED`}</div>
    </section>
  );
}

export function CompleteButton({ course, lesson, next }: { course: string; lesson: string; next?: { href: string; title: string } }) {
  const mark = () => { const p = load(); p[`${course}/${lesson}`] = true; save(p); };
  return (
    <div className="lnext">
      <div><div className="k">{next ? 'NEXT LESSON' : 'COURSE COMPLETE'}</div><div className="d" style={{ marginTop: 8 }}>{next ? next.title : 'Well done'}<span style={{ color: 'var(--ink)' }}>.</span></div></div>
      <a className="btn btn-ink" href={next ? next.href : `/courses/${course}`} onClick={mark}>{next ? 'Complete & continue' : 'Back to the course'} <span className="arr">→</span></a>
    </div>
  );
}
