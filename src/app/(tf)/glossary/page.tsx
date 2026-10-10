import type { Metadata } from 'next';
import SiteHeader from '../../../components/tf/SiteHeader';
import GlossarySearch from '../../../components/tf/GlossarySearch';
import glossary from '../../../../content/glossary.json';

export const metadata: Metadata = { title: 'Forex glossary in plain English', description: 'Every trading term explained in plain English: pips, spreads, leverage, margin, R multiples and more.', alternates: { canonical: '/glossary' } };

export default function Glossary() {
  const entries = Object.entries(glossary as Record<string, string>).sort(([a], [b]) => a.localeCompare(b));
  return (
    <main className="tf-page">
      <SiteHeader variant="over" />
      <section className="phero"><video autoPlay muted loop playsInline src="/media/hero_broll.mp4" aria-hidden="true" /><div className="wrap">
        <div className="k" style={{ color: 'var(--gold)' }}>FREE · {entries.length} TERMS</div>
        <h1 className="d">The glossary<span className="g">.</span></h1><span className="bar" />
        <p>Every term you&apos;ll meet in the films and courses, in plain English.</p>
      </div></section>
      <section className="cream" style={{ paddingTop: 56 }}><div className="wrap" style={{ maxWidth: 960 }}><GlossarySearch entries={entries} />
        <div className="paywall" style={{ marginTop: 56 }}><div className="k" style={{ color: 'var(--gold)' }}>START HERE</div><h2 className="d" style={{ marginTop: 12 }}>Forex From Zero<span className="g">.</span></h2><p>Twelve free lessons that use every one of these terms on a real chart.</p><div className="row"><a className="btn btn-gold" href="/courses/forex-from-zero">Start the free course <span className="arr">→</span></a></div></div>
      </div></section>
    </main>
  );
}
