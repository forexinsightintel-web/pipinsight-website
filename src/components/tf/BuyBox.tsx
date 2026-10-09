'use client';
// Buy buttons: start a Stripe Checkout session for one course or the All-Access Pass.
import { useState } from 'react';

export default function BuyBox({ slug, price, free, owned, firstLesson }: { slug: string; price: number; free: boolean; owned: boolean; firstLesson: string }) {
  const [busy, setBusy] = useState<string | null>(null);
  const [err, setErr] = useState('');
  const go = async (kind: 'course' | 'pass') => {
    setBusy(kind); setErr('');
    try {
      const r = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind, slug }) });
      const j = await r.json();
      if (j.url) window.location.href = j.url; else throw new Error(j.error || 'Checkout is not available right now.');
    } catch (e) { setErr((e as Error).message); setBusy(null); }
  };
  if (free || owned) return (
    <>
      <div className="price" style={{ fontSize: 54 }}>{free ? 'Free' : 'Unlocked'}</div>
      <div className="k" style={{ color: 'var(--ink50)', marginTop: 4 }}>{free ? 'EVERY LESSON · NO SIGN-UP' : 'THANK YOU · LIFETIME ACCESS'}</div>
      <a className="btn btn-gold" style={{ width: '100%', marginTop: 20 }} href={`/courses/${slug}/${firstLesson}`}>Start lesson 1 <span className="arr">→</span></a>
    </>
  );
  return (
    <>
      <div className="price" style={{ fontSize: 54 }}>£{price}</div>
      <div className="k" style={{ color: 'var(--ink50)', marginTop: 4 }}>ONE-OFF · LIFETIME ACCESS</div>
      <button className="btn btn-gold" style={{ width: '100%', marginTop: 20 }} disabled={!!busy} onClick={() => go('course')}>{busy === 'course' ? 'Opening secure checkout…' : <>Buy the course <span className="arr">→</span></>}</button>
      <a className="btn btn-line" style={{ width: '100%', marginTop: 10 }} href={`/courses/${slug}/${firstLesson}`}>Read lesson 1 free</a>
      <button className="btn btn-ink" style={{ width: '100%', marginTop: 10 }} disabled={!!busy} onClick={() => go('pass')}>{busy === 'pass' ? 'Opening secure checkout…' : 'All 9 courses + playbooks · £149'}</button>
      {err ? <div className="err">{err}</div> : null}
    </>
  );
}
