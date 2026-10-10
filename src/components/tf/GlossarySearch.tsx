'use client';
import { useState } from 'react';

export default function GlossarySearch({ entries }: { entries: [string, string][] }) {
  const [q, setQ] = useState('');
  const list = entries.filter(([k, v]) => !q || (k + ' ' + v).toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <div className="formcard" style={{ maxWidth: 'none', padding: 18 }}><label htmlFor="gq">Search the glossary<input id="gq" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. spread, pip, leverage" /></label></div>
      <dl className="gloss">{list.map(([k, v]) => <div key={k} id={k.toLowerCase().replace(/[^a-z0-9]+/g, '-')}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      {!list.length ? <p style={{ color: 'var(--ink50)' }}>No term matches that yet.</p> : null}
    </>
  );
}
