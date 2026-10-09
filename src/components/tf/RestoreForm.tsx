'use client';
import { useState } from 'react';

export default function RestoreForm() {
  const [email, setEmail] = useState(''); const [msg, setMsg] = useState(''); const [ok, setOk] = useState(false); const [busy, setBusy] = useState(false);
  return (
    <form className="formcard" onSubmit={async (e) => {
      e.preventDefault(); setBusy(true); setMsg('');
      const r = await fetch('/api/access/restore', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      const j = await r.json(); setBusy(false);
      if (j.ok) { setOk(true); setMsg(`Done. ${j.unlocked.includes('all') ? 'Your All-Access Pass' : `${j.unlocked.length} course${j.unlocked.length > 1 ? 's' : ''}`} unlocked on this device.`); } else setMsg(j.error || 'Something went wrong.');
    }}>
      <label htmlFor="em">Email used at checkout<input id="em" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" /></label>
      <button className="btn btn-gold" style={{ width: '100%', marginTop: 18 }} disabled={busy}>{busy ? 'Checking…' : 'Restore my courses'}</button>
      {msg ? <p className="msg" style={{ color: ok ? 'var(--green)' : 'var(--red)' }}>{msg}{ok ? <> <a href="/courses" style={{ textDecoration: 'underline' }}>Go to your courses →</a></> : null}</p> : null}
    </form>
  );
}
