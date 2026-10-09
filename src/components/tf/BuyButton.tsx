'use client';
// One-click Stripe checkout for a playbook (kind "ebook") or the All-Access Pass (kind "pass").
import { useState } from 'react';

export default function BuyButton({ kind, slug, label, className = 'btn btn-gold' }: { kind: 'ebook' | 'pass' | 'course'; slug?: string; label: React.ReactNode; className?: string }) {
  const [busy, setBusy] = useState(false); const [err, setErr] = useState('');
  return (
    <>
      <button className={className} disabled={busy} onClick={async () => {
        setBusy(true); setErr('');
        try { const r = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind, slug }) }); const j = await r.json(); if (j.url) window.location.href = j.url; else throw new Error(j.error || 'Checkout unavailable.'); }
        catch (e) { setErr((e as Error).message); setBusy(false); }
      }}>{busy ? 'Opening checkout…' : label}</button>
      {err ? <div style={{ color: 'var(--red)', fontSize: 13, marginTop: 6 }}>{err}</div> : null}
    </>
  );
}
