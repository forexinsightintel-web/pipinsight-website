'use client';
// Homepage: films → courses → playbooks. All motion is driven by one scroll handler so it
// stays smooth; on phones/tablets (<1060px) the scroll scenes fall back to plain layouts.
import { useEffect, useRef } from 'react';
import SiteHeader from './SiteHeader';

type CourseCard = { slug: string; title: string; subtitle: string; level: string; lessons: number; price: string; art: string; clip?: string; tag?: string; tagClass?: string };
type Book = { cover: string; title: string; price: string };
type Props = { courses: CourseCard[]; wall: string[]; books: Book[]; totals: { courses: number; lessons: number; charts: number }; bookCount: number };

const cl = (v: number) => Math.max(0, Math.min(1, v));
const seg = (p: number, a: number, b: number) => cl((p - a) / (b - a));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// ---------- synthetic training chart for the "inside a course" scene ----------
function rng(seed: number) { return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
type Bar = { o: number; c: number; h: number; l: number };
function build(wps: number[][], n: number, seed: number, noise: number): Bar[] {
  const r = rng(seed); const g = () => { let u = 0, v = 0; while (!u) u = r(); while (!v) v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
  const xs = wps.map((w) => w[0]), ys = wps.map((w) => w[1]); const path: number[] = [];
  for (let i = 0; i <= n; i++) { let k = 0; while (k < xs.length - 2 && i > xs[k + 1]) k++; const t = (i - xs[k]) / (xs[k + 1] - xs[k]); path.push(ys[k] + (ys[k + 1] - ys[k]) * cl(t)); }
  const span = Math.max(...ys) - Math.min(...ys); const sig = noise * span * 0.045; let dev = 0, prev = path[0]; const B: Bar[] = [];
  for (let i = 0; i < n; i++) { dev = 0.45 * dev + g() * sig; const o = prev, c = path[i + 1] + dev, body = Math.abs(c - o), wk = (Math.abs(g() * sig * 0.6) + body * 0.2) * 0.6; B.push({ o, c, h: Math.max(o, c) + wk * (0.25 + 0.75 * r()), l: Math.min(o, c) - wk * (0.25 + 0.75 * r()) }); prev = c; }
  return B;
}
const WIN = build([[0, 0], [18, 90], [26, 62], [40, 150], [48, 118], [69, 210]], 70, 4, 0.45);
WIN[48] = { o: WIN[47].c, h: 127, l: 104, c: 125 };
const LOSS: Bar[] = (() => { const tail = build([[0, 125], [8, 104], [21, 40]], 21, 11, 0.45); const off = 125 - tail[0].o; return WIN.slice(0, 49).concat(tail.map((b) => ({ o: b.o + off, c: b.c + off, h: b.h + off, l: b.l + off }))); })();
const ema = (B: Bar[], p: number) => { const a = 2 / (p + 1); let e = B[0].c; return B.map((b) => (e = a * b.c + (1 - a) * e)); };

function drawStory(cv: HTMLCanvasElement, p: number, lossMode: number) {
  const sx = cv.getContext('2d'); if (!sx) return; const dp = window.devicePixelRatio || 1;
  if (cv.width !== cv.offsetWidth * dp) { cv.width = cv.offsetWidth * dp; cv.height = cv.offsetHeight * dp; }
  const W = cv.width, H = cv.height; sx.clearRect(0, 0, W, H);
  const B = WIN.map((b, i) => (i < 49 ? b : { o: lerp(b.o, LOSS[i].o, lossMode), c: lerp(b.c, LOSS[i].c, lossMode), h: lerp(b.h, LOSS[i].h, lossMode), l: lerp(b.l, LOSS[i].l, lossMode) }));
  const lo = Math.min(...WIN.map((b) => b.l), ...LOSS.map((b) => b.l)) - 12, hi = Math.max(...WIN.map((b) => b.h)) + 18;
  const L = 10 * dp, R = W - 70 * dp, T = 14 * dp, Bt = H - 26 * dp; const X = (i: number) => L + ((i + 0.5) * (R - L)) / 72; const Y = (v: number) => Bt - ((v - lo) / (hi - lo)) * (Bt - T);
  const tag = (x: number, y: number, t: string, bg: string, fg: string, al: number, ha?: string) => { sx.globalAlpha = al; sx.font = `800 ${11 * dp}px "JetBrains Mono", monospace`; const w = sx.measureText(t).width + 14 * dp, h = 20 * dp; const x0 = ha === 'r' ? x - w : ha === 'c' ? x - w / 2 : x; sx.fillStyle = bg; sx.beginPath(); sx.roundRect(x0, y - h / 2, w, h, 4 * dp); sx.fill(); sx.fillStyle = fg; sx.fillText(t, x0 + 7 * dp, y + 4 * dp); sx.globalAlpha = 1; };
  sx.lineWidth = dp;
  for (let g = 0; g < 6; g++) { const y = T + ((Bt - T) * g) / 5; sx.strokeStyle = 'rgba(11,13,16,.07)'; sx.beginPath(); sx.moveTo(L, y); sx.lineTo(R, y); sx.stroke(); sx.fillStyle = 'rgba(11,13,16,.45)'; sx.font = `600 ${10.5 * dp}px "JetBrains Mono", monospace`; sx.fillText((1.27 + (hi - ((hi - lo) * g) / 5) * 0.0001).toFixed(4), R + 8 * dp, y + 4 * dp); }
  const nTrend = lerp(6, 49, seg(p, 0, 0.17)), sw = seg(p, 0.15, 0.26), zn = seg(p, 0.26, 0.38), rg = seg(p, 0.38, 0.5), tr = seg(p, 0.5, 0.62), fut = seg(p, 0.64, 0.84), hit = seg(p, 0.84, 0.92);
  const nVis = p < 0.64 ? nTrend : 49 + fut * 21;
  if (zn > 0) { const x1 = X(30) - 4 * dp, x2 = lerp(x1, X(48) + 4 * dp, zn); sx.fillStyle = 'rgba(18,163,110,.14)'; sx.fillRect(x1, Y(124), x2 - x1, Y(106) - Y(124)); sx.strokeStyle = 'rgba(18,163,110,.6)'; sx.strokeRect(x1, Y(124), x2 - x1, Y(106) - Y(124)); tag(X(30), Y(106) + 16 * dp, 'PULLBACK ZONE', '#12A36E', '#fff', zn); }
  if (tr > 0) { const x0 = X(49) - 4 * dp, x2 = lerp(x0, X(67), tr); sx.fillStyle = 'rgba(18,163,110,.16)'; sx.fillRect(x0, Y(173), x2 - x0, Y(125) - Y(173)); sx.fillStyle = 'rgba(224,65,58,.16)'; sx.fillRect(x0, Y(125), x2 - x0, Y(101) - Y(125)); sx.strokeStyle = '#0B0D10'; sx.lineWidth = 2 * dp; sx.beginPath(); sx.moveTo(x0, Y(125)); sx.lineTo(x2, Y(125)); sx.stroke(); sx.lineWidth = dp;
    if (tr > 0.8) { const a = seg(tr, 0.8, 1); tag(X(67), Y(173), 'TARGET 2R', '#12A36E', '#fff', a, 'r'); tag(X(67), Y(101), 'STOP', '#E0413A', '#fff', a, 'r'); tag(X(67), Y(125), 'ENTRY', '#0B0D10', '#F4F1EA', a, 'r'); } }
  const bw = ((R - L) / 72) * 0.62;
  for (let i = 0; i < Math.min(70, Math.ceil(nVis)); i++) { const b = B[i]; const part = Math.min(1, nVis - i); const c = lerp(b.o, b.c, part); const up = c >= b.o; sx.strokeStyle = sx.fillStyle = up ? '#12A36E' : '#E0413A'; sx.globalAlpha = Math.min(1, part * 1.5); sx.lineWidth = 1.4 * dp; sx.beginPath(); sx.moveTo(X(i), Y(lerp((b.o + c) / 2, b.h, part))); sx.lineTo(X(i), Y(lerp((b.o + c) / 2, b.l, part))); sx.stroke(); const y1 = Y(Math.max(b.o, c)), y2 = Y(Math.min(b.o, c)); sx.fillRect(X(i) - bw / 2, y1, bw, Math.max(1.5 * dp, y2 - y1)); sx.globalAlpha = 1; }
  ([[20, '#E8B04A', 2.6], [50, '#2F6FEB', 2]] as [number, string, number][]).forEach(([n, col, w]) => { const e = ema(B, n); sx.strokeStyle = col; sx.lineWidth = w * dp; sx.beginPath(); for (let i = 0; i < Math.floor(nVis); i++) { if (i) sx.lineTo(X(i), Y(e[i])); else sx.moveTo(X(i), Y(e[i])); } sx.stroke(); });
  if (p < 0.5 && p > 0.02) { sx.fillStyle = 'rgba(232,228,218,.85)'; sx.fillRect(X(49) - 6 * dp, T, R - X(49) + 6 * dp, Bt - T); sx.fillStyle = 'rgba(11,13,16,.85)'; sx.font = `italic 400 ${110 * dp}px "Instrument Serif", serif`; sx.textAlign = 'center'; sx.fillText('?', (X(49) + R) / 2, (T + Bt) / 2 + 34 * dp); sx.textAlign = 'left'; }
  if (sw > 0) { sx.globalAlpha = sw; sx.fillStyle = '#0B0D10'; sx.font = `600 ${14 * dp}px "Inter Tight", Inter, sans-serif`; sx.textAlign = 'center'; ([[18, 'HH', 1], [26, 'HL', 0], [40, 'HH', 1]] as [number, string, number][]).forEach(([i, t, up]) => sx.fillText(t, X(i), up ? Y(WIN[i].h) - 10 * dp : Y(WIN[i].l) + 22 * dp)); sx.textAlign = 'left'; sx.globalAlpha = 1; }
  if (rg > 0) { sx.strokeStyle = '#E8B04A'; sx.lineWidth = 3.4 * dp; sx.beginPath(); sx.ellipse(X(48), Y(115), 12 * dp, (Y(104) - Y(127)) / 2 + 12 * dp, 0, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * rg); sx.stroke(); if (rg > 0.6) tag(X(48), Y(104) + 40 * dp, 'CLOSE BACK UP', '#12A36E', '#fff', seg(rg, 0.6, 1), 'c'); }
  if (hit > 0) { const loss = lossMode > 0.5; tag((X(49) + X(67)) / 2, loss ? Y(92) : Y(186), loss ? 'STOPPED OUT' : 'TARGET HIT', loss ? '#E0413A' : '#12A36E', '#fff', hit, 'c'); }
  sx.fillStyle = 'rgba(11,13,16,.4)'; sx.font = `700 ${9.5 * dp}px "JetBrains Mono", monospace`; sx.fillText('ILLUSTRATIVE EXAMPLE · SYNTHETIC PRICE DATA · NOT FINANCIAL ADVICE', L, H - 6 * dp);
}

export default function Home({ courses, wall, books, totals, bookCount }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const $ = <T extends Element>(s: string) => root.current!.querySelector(s) as T;
    const $$ = (s: string) => Array.from(root.current!.querySelectorAll(s)) as HTMLElement[];
    const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desk = () => window.innerWidth > 1060;
    let alive = true;

    // hero tape
    const tape = $<HTMLCanvasElement>('#tape'); const tx = tape.getContext('2d')!; let bars: Bar[] = [], ph = 0, t = 0;
    const add = () => { const o = bars.length ? bars[bars.length - 1].c : 0; t++; const c = o + Math.sin(t / 15) * 1.7 + 0.25 + (Math.random() - 0.5) * 2.6; bars.push({ o, c, h: Math.max(o, c) + Math.random() * 1.2, l: Math.min(o, c) - Math.random() * 1.2 }); };
    for (let i = 0; i < 160; i++) add();
    const drawTape = () => { const dp = window.devicePixelRatio || 1; if (tape.width !== tape.offsetWidth * dp) { tape.width = tape.offsetWidth * dp; tape.height = tape.offsetHeight * dp; } const W = tape.width, H = tape.height, bw = 9 * dp, n = Math.ceil(W / bw) + 1; while (bars.length > n + 4) bars.shift(); const v = bars.slice(-n); let mn = 1e9, mx = -1e9; v.forEach((b) => { mn = Math.min(mn, b.l); mx = Math.max(mx, b.h); }); const sy = (y: number) => H * 0.92 - ((y - mn) / (mx - mn || 1)) * H * 0.62; tx.clearRect(0, 0, W, H); let e: number | null = null; const pts: number[][] = [];
      v.forEach((b, i) => { const x = i * bw - ph * bw + bw / 2; const col = b.c >= b.o ? '18,163,110' : '224,65,58'; const a = Math.min(1, i / (n * 0.35)); tx.strokeStyle = `rgba(${col},${a})`; tx.fillStyle = `rgba(${col},${a})`; tx.lineWidth = dp; tx.beginPath(); tx.moveTo(x, sy(b.h)); tx.lineTo(x, sy(b.l)); tx.stroke(); const y1 = sy(Math.max(b.o, b.c)), y2 = sy(Math.min(b.o, b.c)); tx.fillRect(x - bw * 0.3, y1, bw * 0.6, Math.max(dp, y2 - y1)); e = e === null ? b.c : e + (b.c - e) * 0.1; pts.push([x, sy(e)]); });
      tx.strokeStyle = '#E8B04A'; tx.lineWidth = 2.2 * dp; tx.beginPath(); pts.forEach((q, i) => (i ? tx.lineTo(q[0], q[1]) : tx.moveTo(q[0], q[1]))); tx.stroke(); };

    // scenes
    const zs = $<HTMLElement>('#zs'), zov = $<HTMLElement>('.zover'), zhead = $<HTMLElement>('.zhead'), zsec = $<HTMLElement>('.zoom');
    const hz = $<HTMLElement>('.hz'), ht = $<HTMLElement>('#ht'), hbi = $<HTMLElement>('#hbi'), hcs = $$('.hc');
    const ins = $<HTMLElement>('.inside'), story = $<HTMLCanvasElement>('#story'), iss = $$('.is'), ipi = $<HTMLElement>('#ipi');
    const bk = $<HTMLElement>('.books5'), leaves = $$('.leaf'), book = $<HTMLElement>('#book');
    const kin = $<HTMLElement>('.kin'), k1 = $<HTMLElement>('#k1'), k2 = $<HTMLElement>('#k2');
    const prog = (el: HTMLElement) => { const r = el.getBoundingClientRect(); return cl(-r.top / (r.height - window.innerHeight)); };
    let lossMode = 0, lastSp = 0;
    const setStep = (p: number) => { const k = p < 0.26 ? 0 : p < 0.38 ? 1 : p < 0.5 ? 2 : p < 0.64 ? 3 : p < 0.92 ? 4 : 5; iss.forEach((s, i) => s.classList.toggle('on', i === k)); ipi.style.width = p * 100 + '%'; const target = k === 5 ? 1 : 0; lossMode += (target - lossMode) * 0.18; if (Math.abs(target - lossMode) < 0.002) lossMode = target; };
    const onScroll = () => {
      if (desk()) {
        const zp = prog(zsec); const s = lerp(0.42, 1, seg(zp, 0, 0.6)); zs.style.transform = `scale(${s}) translateY(${lerp(30, 0, seg(zp, 0, 0.6))}%)`; zs.style.borderRadius = lerp(40, 0, seg(zp, 0.3, 0.6)) + 'px'; zov.style.opacity = String(seg(zp, 0.55, 0.75)); zhead.style.opacity = String(1 - seg(zp, 0.12, 0.32));
        const hp = prog(hz); const max = ht.scrollWidth - window.innerWidth + 80; ht.style.transform = `translateX(${-hp * max}px)`; hbi.style.width = hp * 100 + '%';
        const mid = window.innerWidth / 2; hcs.forEach((c) => { const r = c.getBoundingClientRect(); const live = r.left < mid && r.right > mid; if (live !== c.classList.contains('live')) { c.classList.toggle('live', live); const v = c.querySelector('video') as HTMLVideoElement | null; if (v) { if (live) { if (!v.src) v.src = v.dataset.src || ''; v.play().catch(() => {}); } else v.pause(); } } });
        lastSp = prog(ins);
        const bp = prog(bk); leaves.forEach((l, i) => { const tt = seg(bp, 0.08 + i * 0.2, 0.24 + i * 0.2); l.style.transform = `rotateY(${-tt * 178}deg)`; l.style.zIndex = String(tt > 0.5 ? 10 + i : 6 - i); });
        book.style.transform = `rotateX(${lerp(14, 6, bp)}deg) rotateY(${lerp(-22, -8, bp)}deg) translateX(${lerp(18, 50, seg(bp, 0, 0.15))}%)`;
      }
      const kr = kin.getBoundingClientRect(); const kp = (window.innerHeight - kr.top) / (window.innerHeight + kr.height); k1.style.transform = `translateX(${-kp * 40}%)`; k2.style.transform = `translateX(${-40 + kp * 40}%)`;
    };
    let tick = false; const sc = () => { if (!tick) { tick = true; requestAnimationFrame(() => { onScroll(); tick = false; }); } };
    window.addEventListener('scroll', sc, { passive: true }); window.addEventListener('resize', sc);
    const loop = () => {
      if (!alive) return;
      if (!RM) { ph += 0.035; if (ph >= 1) { ph = 0; add(); } }
      drawTape();
      if (desk()) { const r = ins.getBoundingClientRect(); if (r.top < window.innerHeight && r.bottom > 0) { setStep(lastSp); drawStory(story, lastSp, lossMode); } }
      requestAnimationFrame(loop);
    };
    if (!desk()) { drawStory(story, 0.92, 0); iss.forEach((s) => s.classList.add('on')); }
    onScroll(); loop();
    if (document.fonts) document.fonts.ready.then(() => { onScroll(); drawStory(story, desk() ? lastSp : 0.92, 0); });
    const deck = $<HTMLElement>('#deck'); const hero = $<HTMLElement>('.hero');
    const mm = (e: MouseEvent) => { if (RM) return; const x = e.clientX / window.innerWidth - 0.5, y = e.clientY / window.innerHeight - 0.5; deck.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`; };
    hero.addEventListener('mousemove', mm);
    return () => { alive = false; window.removeEventListener('scroll', sc); window.removeEventListener('resize', sc); hero.removeEventListener('mousemove', mm); };
  }, []);

  const half = Math.ceil(wall.length / 2);
  return (
    <div ref={root}>
      <SiteHeader variant="over" />
      <section className="hero h5" style={{ padding: 0 }}>
        <video autoPlay muted loop playsInline preload="auto" src="/media/hero_broll.mp4" aria-hidden="true" />
        <div className="shade" /><div className="grain" />
        <div className="wrap" style={{ width: '100%' }}>
          <div className="hero-in">
            <div>
              <div className="k">Films · Courses · Playbooks</div>
              <h1 className="d mask"><span className="ln"><span>Learn forex</span></span><span className="ln"><span><em className="g">properly.</em></span></span></h1>
              <span className="bar grow" />
              <p className="lead"><b>Watch the film free on YouTube.</b> Then go deeper with the full course and the playbook: every rule drawn on a chart, every trade shown with its losing version.</p>
              <div className="row"><a className="btn btn-gold" href="/courses">Explore the courses <span className="arr">→</span></a><a className="btn btn-ghost" href="https://www.youtube.com/@thetradingfoundry"><span className="yt">▶</span> Watch on YouTube</a></div>
            </div>
            <div className="deck" id="deck" aria-hidden="true">
              <div className="dk dk1"><img src="/media/thumbs/breakout.webp" alt="" /><div className="dkb"><span className="yt">▶</span><span>FILM · 15:54</span></div></div>
              <div className="dk dk2"><div className="dkc"><span className="pill o">COURSE</span><b className="d">Trend<br />pullback<span className="g">.</span></b><span className="mono">11 LESSONS · £39</span><div className="pb"><i /></div></div></div>
              <div className="dk dk3"><img src="/media/pages/p1.webp" alt="" /></div>
            </div>
          </div>
          <div className="tick"><div className="lbl"><span className="pill o">TRAINING TAPE</span><span className="pill l" style={{ color: 'var(--paper)', boxShadow: 'inset 0 0 0 1.5px var(--paperline)' }}>ILLUSTRATIVE · SYNTHETIC DATA</span></div><canvas id="tape" /></div>
        </div>
      </section>
      <div className="trust"><div className="wrap"><span><b>@TheTradingFoundry</b> on YouTube</span><span><b>{totals.courses}</b> full courses</span><span><b>{totals.lessons}</b> lessons</span><span><b>{bookCount}</b> playbooks</span><span>No signals. Ever.</span></div></div>

      <section className="zoom" id="channel"><div className="zstick">
        <div className="zhead"><div className="k" style={{ color: 'var(--ink50)' }}>01 · THE CHANNEL</div><h2 className="d">Every film<span className="g">.</span><br />Free<span className="g">.</span></h2></div>
        <div className="zscreen" id="zs"><video autoPlay muted loop playsInline src="/media/clip_rules.mp4" />
          <div className="zover"><div className="k" style={{ color: 'var(--gold)' }}>ON YOUTUBE · @THETRADINGFOUNDRY</div><div className="d" style={{ fontSize: 'clamp(34px,5vw,84px)', marginTop: 14 }}>Word-timed<br />graphics<span className="g">.</span> No<br />slideshow<span className="g">.</span></div><a className="btn btn-gold" style={{ marginTop: 28 }} href="https://www.youtube.com/@thetradingfoundry?sub_confirmation=1"><span className="yt dark">▶</span> Subscribe on YouTube</a></div>
        </div>
      </div></section>
      <section className="wall" aria-label="Films on the channel">
        <div className="row1">{[...wall.slice(0, half), ...wall.slice(0, half)].map((s, i) => <img key={i} src={s} alt="" loading="lazy" />)}</div>
        <div className="row2">{[...wall.slice(half), ...wall.slice(half)].map((s, i) => <img key={i} src={s} alt="" loading="lazy" />)}</div>
        <div className="wrap wallcta"><p>Every course starts with one of these films. Watch it free, then take the course when you want the full method.</p><a className="btn btn-ink" href="/films">See every film <span className="arr">→</span></a></div>
      </section>

      <section className="hz" id="courses"><div className="hstick">
        <div className="wrap hhead"><div><div className="k" style={{ color: 'var(--gold)' }}>02 · THE COURSES</div><h2 className="d">Then learn<br />it properly<span className="g">.</span></h2></div><p>One strategy per course: the film, 10–12 written lessons, annotated charts, practice drills, quizzes, a strategy passport and the playbook.</p></div>
        <div className="htrack" id="ht">{courses.map((c) => (
          <a className="hc" key={c.slug} href={`/courses/${c.slug}`}><div className="art"><img src={`/media/thumbs/${c.art}.webp`} alt={c.title} />{c.clip ? <video muted loop playsInline preload="none" data-src={c.clip} /> : null}{c.tag ? <span className={`pill ${c.tagClass} tag`}>{c.tag}</span> : null}</div>
            <div className="b"><div className="mono" style={{ color: 'var(--paper56)' }}>{c.level} · {c.lessons} lessons · film + playbook</div><h3>{c.title}<span style={{ color: 'var(--gold)' }}>.</span></h3><p>{c.subtitle}</p><div className="foot"><span className="price">{c.price}</span><span className="go">View course →</span></div></div></a>))}</div>
        <div className="wrap"><div className="hbar"><i id="hbi" /></div></div>
      </div></section>

      <section className="inside" id="inside"><div className="istick"><div className="wrap igrid">
        <div className="itext">
          <div className="k" style={{ color: 'var(--ink50)' }}>INSIDE A COURSE · TREND PULLBACK</div>
          <div className="isteps">
            <div className="is on"><span className="mono">STEP 01</span><h3 className="d">Read the trend<span className="g">.</span></h3><p>Two higher highs, two higher lows, the 20 EMA rising.</p></div>
            <div className="is"><span className="mono">STEP 02</span><h3 className="d">Mark the zone<span className="g">.</span></h3><p>Price pulls back into value: the 20 EMA band.</p></div>
            <div className="is"><span className="mono">STEP 03</span><h3 className="d">Wait for the close<span className="g">.</span></h3><p>The zone says where. The close back up says when.</p></div>
            <div className="is"><span className="mono">STEP 04</span><h3 className="d">Plan the trade<span className="g">.</span></h3><p>Entry, stop beyond the pullback low, target at 2R. Before you click.</p></div>
            <div className="is"><span className="mono">STEP 05</span><h3 className="d">Let it play out<span className="g">.</span></h3><p>The future is revealed only after the decision is made.</p></div>
            <div className="is"><span className="mono">STEP 06</span><h3 className="d">Now the losing version<span className="r">!</span></h3><p>Same setup, the higher low breaks, the stop is hit. Every course shows both.</p></div>
          </div>
          <div className="iprog"><i id="ipi" /></div>
        </div>
        <div className="ichart"><div className="ihead"><span className="mono">GBP/USD · 1H</span><span className="mono" style={{ opacity: 0.6 }}>ILLUSTRATIVE · SYNTHETIC DATA</span></div><canvas id="story" /></div>
      </div></div></section>

      <section className="books5" id="playbooks"><div className="bstick"><div className="wrap bgrid">
        <div><div className="k" style={{ color: 'var(--gold)' }}>03 · THE PLAYBOOKS</div><h2 className="d" style={{ fontSize: 'clamp(52px,7vw,116px)', marginTop: 16 }}>Keep it<span className="g">.</span><br />Print it<span className="g">.</span></h2><span className="bar" />
          <p className="bl">{bookCount} illustrated strategy playbooks, 37–42 pages each, designed like the films. Every course includes its playbook, or buy them on their own.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}><a className="btn btn-gold" href="/playbooks">Browse the playbooks <span className="arr">→</span></a></div></div>
        <div className="stage3d"><div className="book3d" id="book">
          {[[1, 2], [3, 4], [5, 6], [7, 8]].map(([f, b], i) => <div className="leaf" key={i} style={{ zIndex: 6 - i }}><div className="f"><img src={`/media/pages/p${f}.webp`} alt="" /></div><div className="bk"><img src={`/media/pages/p${b}.webp`} alt="" /></div></div>)}
          <div className="base"><img src="/media/pages/p9.webp" alt="" /></div>
        </div></div>
      </div></div></section>
      <section className="shelf5"><div className="wrap"><div className="srow">{books.slice(0, 7).map((b) => <a className="sb" key={b.title} href="/playbooks"><img src={b.cover} alt={`${b.title} cover`} loading="lazy" /><b>{b.title}</b><span>{b.price}</span></a>)}</div></div></section>

      <section className="cream" id="pricing"><div className="wrap">
        <div className="sechead"><h2 className="d">Pay once<span className="g">.</span><br />Keep it<span className="g">.</span></h2><p>No subscriptions, no countdown timers, no fake discounts. One-off prices with lifetime access.</p></div>
        <div className="tiers">
          <div className="tier"><div className="k" style={{ color: 'var(--ink50)' }}>PLAYBOOK</div><div className="price">{books[0]?.price}<span style={{ fontSize: 22, color: 'var(--ink50)' }}>+</span></div><ul><li>One illustrated playbook</li><li>37–42 pages, PDF</li><li>Companion film QR codes</li><li>Yours to keep and print</li></ul><a className="btn btn-line" href="/playbooks">Browse playbooks</a></div>
          <div className="tier best"><div className="k" style={{ color: 'var(--gold)' }}>ALL-ACCESS PASS · BEST VALUE</div><div className="price">£149</div><ul><li>All {totals.courses - 1} paid courses + the free one</li><li>All {bookCount} playbooks</li><li>Every future course</li><li>Drills, quizzes &amp; passports</li></ul><a className="btn btn-gold" href="/pricing">Get all access <span className="arr">→</span></a></div>
          <div className="tier"><div className="k" style={{ color: 'var(--ink50)' }}>SINGLE COURSE</div><div className="price">£39<span style={{ fontSize: 22, color: 'var(--ink50)' }}> –£49</span></div><ul><li>The film + 10–12 lessons</li><li>Drills, quizzes &amp; passport</li><li>Lifetime access</li><li>Read on any device</li></ul><a className="btn btn-line" href="/courses">Choose a course</a></div>
        </div>
        <div className="guar"><span>30-day refund</span><span>Secure checkout by Stripe</span><span>Forex From Zero is free</span></div>
      </div></section>

      <section className="night kin">
        <div className="kr" id="k1">WATCH<span className="g">.</span> LEARN<span className="g">.</span> PRACTISE<span className="g">.</span> REPEAT<span className="g">.</span> WATCH<span className="g">.</span> LEARN<span className="g">.</span> PRACTISE<span className="g">.</span> REPEAT<span className="g">.</span></div>
        <div className="kr out" id="k2">FILMS<span className="g">.</span> COURSES<span className="g">.</span> PLAYBOOKS<span className="g">.</span> FILMS<span className="g">.</span> COURSES<span className="g">.</span> PLAYBOOKS<span className="g">.</span></div>
        <div className="wrap" style={{ textAlign: 'center', marginTop: 70 }}><p style={{ color: 'var(--paper56)', fontSize: 20, margin: '0 auto', maxWidth: 560 }}>Built for traders who want to understand what they&apos;re doing.</p>
          <div style={{ marginTop: 36, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}><a className="btn btn-gold" href="/courses/forex-from-zero">Start Forex From Zero, free <span className="arr">→</span></a><a className="btn btn-ghost" href="https://www.youtube.com/@thetradingfoundry?sub_confirmation=1"><span className="yt">▶</span> Subscribe</a></div></div>
      </section>
    </div>
  );
}
