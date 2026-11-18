'use client';
// Site header: the floating glass pill with the YouTube channel's emblem and wordmark.
// "light" pages get a spacer so their content starts below the pill.
import { useEffect, useState } from 'react';

const LINKS = [
  { href: '/courses', label: 'Courses' },
  { href: '/films', label: 'Films' },
  { href: '/playbooks', label: 'Playbooks' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/glossary', label: 'Glossary' },
];

export default function SiteHeader({ variant = 'over', active }: { variant?: 'over' | 'light'; active?: string }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <>
      <header className={`tn${solid ? ' tn-solid' : ''}${open ? ' tn-open' : ''}`}>
        <a className="tn-logo" href="/" aria-label="The Trading Foundry, home">
          <img src="/media/brand/mark-96.png" alt="" width={30} height={30} />
          <span className="tn-wm">THE <b>TRADING</b> <em>FOUNDRY</em></span>
        </a>
        <nav className="tn-links" aria-label="Site">
          {LINKS.map((l) => <a key={l.href} href={l.href} className={active === l.href ? 'on' : undefined} aria-current={active === l.href ? 'page' : undefined}>{l.label}</a>)}
          <a href="/restore" className="tn-mob">Restore access</a>
        </nav>
        <a className="tn-ghost" href="/restore">Restore access</a>
        <a className="tn-cta" href="/courses/forex-from-zero">Start free</a>
        <button className="tn-menu" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(!open)}><i /><i /></button>
      </header>
      {variant === 'light' ? <div className="tn-space" aria-hidden="true" /> : null}
    </>
  );
}
