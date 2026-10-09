'use client';
// Course cards with level filters; hovering a card plays its film clip where one exists.
import { useState } from 'react';

export type Card = { slug: string; title: string; subtitle: string; level: string; lk: string; lessons: number; charts: number; price: string; art: string; clip?: string; tag?: string; tagClass?: string };

export default function CourseGrid({ cards }: { cards: Card[] }) {
  const [f, setF] = useState('all');
  const F = [['all', 'All'], ['beg', 'Beginner'], ['int', 'Strategies'], ['adv', 'Advanced']];
  return (
    <>
      <div className="filters" role="group" aria-label="Filter courses">
        {F.map(([k, l]) => <button key={k} className="ft" aria-pressed={f === k} onClick={() => setF(k)}>{l}</button>)}
      </div>
      <div className="grid">
        {cards.filter((c) => f === 'all' || c.lk === f || (f === 'beg' && c.lk === 'all')).map((c) => (
          <a key={c.slug} className="card" href={`/courses/${c.slug}`}
            onMouseEnter={(e) => { const v = e.currentTarget.querySelector('video'); if (v) { if (!v.src && c.clip) v.src = c.clip; v.play().catch(() => {}); } }}
            onMouseLeave={(e) => { const v = e.currentTarget.querySelector('video'); if (v) v.pause(); }}>
            <div className="art">{c.tag ? <span className={`pill ${c.tagClass} tag`}>{c.tag}</span> : null}<img src={`/media/thumbs/${c.art}.webp`} alt={`${c.title} film thumbnail`} loading="lazy" />{c.clip ? <video muted loop playsInline preload="none" /> : null}</div>
            <div className="b"><div className="meta"><span>{c.level}</span><span>{c.lessons} lessons</span><span>{c.charts} charts</span></div><h3>{c.title}</h3><p>{c.subtitle}</p>
              <div className="foot"><span className="price">{c.price}</span><span className="go">View course →</span></div></div>
          </a>))}
      </div>
    </>
  );
}
