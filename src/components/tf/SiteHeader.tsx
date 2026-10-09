'use client';
// Site header. "over" floats on a dark hero and turns solid once you scroll; "light" is for white pages.
import { useEffect, useState } from 'react';

const LINKS = [
  { href: '/films', label: 'Films' },
  { href: '/courses', label: 'Courses' },
  { href: '/playbooks', label: 'Playbooks' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/school', label: 'Free School' },
];

export default function SiteHeader({ variant = 'over', active }: { variant?: 'over' | 'light'; active?: string }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (variant !== 'over') return;
    const on = () => setSolid(window.scrollY > 40);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [variant]);
  const cls = variant === 'light' ? 'nav light' : solid ? 'nav fixed' : 'nav over';
  return (
    <header className={cls}><div className="wrap">
      <a className="logo" href="/"><img src="/media/mark.png" alt="" width={30} height={30} />TRADING FOUNDRY</a>
      <nav className={`links${open ? ' open' : ''}`} aria-label="Site">
        {LINKS.map((l) => <a key={l.href} href={l.href} aria-current={active === l.href ? 'page' : undefined}>{l.label}</a>)}
      </nav>
      <div className="navr">
        <a className="btn btn-ghost" href="/restore">Restore access</a>
        <a className="btn btn-gold" href="/courses/forex-from-zero">Start free</a>
        <button className="menu-btn" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'CLOSE' : 'MENU'}</button>
      </div>
    </div></header>
  );
}
