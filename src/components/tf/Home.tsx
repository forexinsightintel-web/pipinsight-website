'use client';
// Homepage: the approved dark 3D design. The markup is generated (homeMarkup.ts); this component
// drops in the course cards, then wires up the 3D hero and all the scroll/hover behaviour.
import { useEffect, useMemo, useRef } from 'react';
import { HOME_HTML } from './homeMarkup';

export type HomeCard = { slug: string; title: string; level: string; lessons: number; price: string; top: string; bottom: string; ink: string; dark: boolean; svg: string };

const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function cardsHtml(cards: HomeCard[]) {
  return cards.map((c) =>
    `<a class="x-cc${c.dark ? ' x-dk' : ''}" href="/courses/${c.slug}" style="background:linear-gradient(165deg,${c.top} 0%,${c.bottom} 100%);color:${c.ink}">` +
    `<div class="x-lv"><span>${esc(c.level)}</span><span>${c.lessons} lessons</span></div>` +
    `<h3>${esc(c.title)}</h3><div class="x-art"><svg viewBox="0 0 360 220" preserveAspectRatio="xMidYMid meet">${c.svg}</svg></div>` +
    `<div class="x-ft"><div class="x-cp x-tnum">${c.price}</div><span class="x-go">View <span class="x-ar">→</span></span></div></a>`).join('');
}

export default function Home({ cards }: { cards: HomeCard[] }) {
  const root = useRef<HTMLDivElement>(null);
  const html = useMemo(() => HOME_HTML.replace('__CARDS__', cardsHtml(cards)), [cards]);

  useEffect(() => {
    const el = root.current!;
    const q = <T extends Element = HTMLElement>(s: string) => el.querySelector<T>(s)!;
    const qa = <T extends Element = HTMLElement>(s: string) => [...el.querySelectorAll<T>(s)];
    const offs: (() => void)[] = [];
    let alive = true;

    requestAnimationFrame(() => el.classList.add('ready'));

    // 3D hero (three.js loads only on this page)
    let stopHero: (() => void) | undefined;
    Promise.all([import('./heroScene.js'), fetch('/data/hero-eurusd-20261014.json').then((r) => r.json())])
      .then(([m, data]) => { if (alive) stopHero = m.startHero(data); })
      .catch(() => { /* no WebGL: the copy still shows over the dark background */ });

    // reveals + number counters
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in'); io.unobserve(e.target);
      e.target.querySelectorAll<HTMLElement>('[data-n]').forEach((n) => {
        const to = +(n.dataset.n || 0), s = performance.now();
        const f = (t: number) => { const k = Math.min(1, (t - s) / 1600); n.textContent = Math.round(to * (1 - Math.pow(1 - k, 4))).toLocaleString('en-GB'); if (k < 1) requestAnimationFrame(f); };
        requestAnimationFrame(f);
      });
    }), { threshold: 0, rootMargin: '0px 0px -12% 0px' });
    qa('.x-rv,#stage').forEach((e) => io.observe(e));
    offs.push(() => io.disconnect());

    // cursor spotlight on cards
    qa('[data-spot],.x-cc').forEach((c) => {
      const h = (e: PointerEvent) => { const r = c.getBoundingClientRect(); c.style.setProperty('--mx', `${e.clientX - r.left}px`); c.style.setProperty('--my', `${e.clientY - r.top}px`); };
      c.addEventListener('pointermove', h); offs.push(() => c.removeEventListener('pointermove', h));
    });

    // floating phones
    const st = q('#stage'), p1 = q('#p1'), p2 = q('#p2'), toast = q('#toast');
    const loop = () => {
      if (!alive) return;
      const r = st.getBoundingClientRect(), k = Math.max(-1, Math.min(1, (r.top + r.height / 2 - innerHeight / 2) / innerHeight)), f = Math.sin(performance.now() / 1500);
      p1.style.transform = `translateY(${k * 70 + f * 6}px) rotateY(${20 - k * 10}deg) rotateX(${7 + k * 5}deg) rotateZ(-5deg)`;
      p2.style.transform = `translateY(${k * -50 - f * 6}px) rotateY(${-17 + k * 9}deg) rotateX(${5 - k * 4}deg) rotateZ(3deg)`;
      toast.style.transform = `translateY(${k * -110 + f * 4}px) translateZ(80px)`;
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    // cinema parallax
    const cin = q('#cinema'), cvid = cin.querySelector('video')!;
    const onScroll = () => { const r = cin.getBoundingClientRect(), k = (r.top + r.height / 2 - innerHeight / 2) / innerHeight; cvid.style.transform = `scale(1.12) translateY(${k * -40}px)`; };
    addEventListener('scroll', onScroll, { passive: true }); offs.push(() => removeEventListener('scroll', onScroll));

    // course rail: arrows, mouse drag, tilt
    const rail = q('#rail');
    q('#rl').onclick = () => rail.scrollBy({ left: -380, behavior: 'smooth' });
    q('#rr').onclick = () => rail.scrollBy({ left: 380, behavior: 'smooth' });
    let down = false, x0 = 0, l0 = 0, moved = 0;
    const pd = (e: PointerEvent) => { if (e.pointerType !== 'mouse') return; down = true; moved = 0; x0 = e.clientX; l0 = rail.scrollLeft; rail.classList.add('drag'); };
    const pu = () => { down = false; rail.classList.remove('drag'); };
    const pm = (e: PointerEvent) => { if (!down) return; moved = Math.abs(e.clientX - x0); rail.scrollLeft = l0 - (e.clientX - x0); };
    rail.addEventListener('pointerdown', pd); addEventListener('pointerup', pu); addEventListener('pointermove', pm);
    offs.push(() => { rail.removeEventListener('pointerdown', pd); removeEventListener('pointerup', pu); removeEventListener('pointermove', pm); });
    qa('.x-cc').forEach((c) => {
      c.addEventListener('click', (e) => { if (moved > 6) e.preventDefault(); });
      c.addEventListener('pointermove', (e) => { if (down) return; const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; c.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-8px)`; });
      c.addEventListener('pointerleave', () => { c.style.transform = ''; });
    });

    return () => { alive = false; offs.forEach((f) => f()); stopHero?.(); };
  }, [html]);

  return <div className="tfh" ref={root} dangerouslySetInnerHTML={{ __html: html }} />;
}
