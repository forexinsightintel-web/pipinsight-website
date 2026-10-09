import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import SiteHeader from '../../../components/tf/SiteHeader';
import BuyButton from '../../../components/tf/BuyButton';
import { PLAYBOOKS, gbp } from '../../../lib/playbooks';
import { COOKIE, verify } from '../../../lib/access';

export const metadata: Metadata = { title: 'Playbooks', description: 'Illustrated forex strategy playbooks from Trading Foundry: 37–42 pages each, with companion film QR codes. Instant PDF download.' };
export const dynamic = 'force-dynamic';

export default async function Playbooks({ searchParams }: { searchParams: Promise<{ purchased?: string; session_id?: string }> }) {
  const sp = await searchParams;
  const access = verify((await cookies()).get(COOKIE)?.value);
  const bought = sp.purchased && sp.session_id ? PLAYBOOKS.find((p) => p.slug === sp.purchased) : undefined;
  return (
    <main className="tf-page">
      <SiteHeader variant="over" active="/playbooks" />
      <section className="phero"><video autoPlay muted loop playsInline src="/media/hero_broll.mp4" aria-hidden="true" /><div className="wrap">
        <div className="k" style={{ color: 'var(--gold)' }}>THE PLAYBOOKS · INSTANT PDF</div>
        <h1 className="d">Keep it<span className="g">.</span> Print it<span className="g">.</span></h1><span className="bar" />
        <p>{PLAYBOOKS.length} illustrated strategy playbooks, 37–42 pages each, designed like the films: annotated charts, takeaways, a glossary and QR codes to the companion films.</p>
      </div></section>
      {bought ? <section className="cream" style={{ paddingBlock: 56 }}><div className="wrap">
        <div className="paywall" style={{ marginTop: 0 }}><div className="k" style={{ color: 'var(--gold)' }}>THANK YOU · PAYMENT RECEIVED</div>
          <h2 className="d" style={{ marginTop: 12 }}>{bought.title}<span className="g">.</span></h2>
          <p>Your playbook is ready. Bookmark this page: the download link works again any time.</p>
          <div className="row"><a className="btn btn-gold" href={`/api/ebook/download?session_id=${encodeURIComponent(sp.session_id!)}`}>Download the PDF <span className="arr">↓</span></a></div></div>
      </div></section> : null}
      {access.p ? <section className="cream" style={{ paddingBlock: 40 }}><div className="wrap"><div className="k" style={{ color: 'var(--green)' }}>ALL-ACCESS PASS · EVERY PLAYBOOK IS INCLUDED · DOWNLOAD ANY OF THEM BELOW</div></div></section> : null}
      <section className="cream" style={{ paddingTop: 40 }}><div className="wrap">
        <div className="pbgrid">{PLAYBOOKS.map((p) => (
          <div className="pbk" key={p.slug}>
            <div className="cv"><img src={p.cover} alt={`${p.title} cover`} loading="lazy" /></div>
            <div className="k" style={{ color: 'var(--ink50)' }}>PLAYBOOK {String(p.no).padStart(2, '0')} · {p.level.toUpperCase()}</div>
            <h3>{p.title}</h3>
            <p>{p.strategy}</p>
            <div className="foot"><span className="price" style={{ fontSize: 24 }}>{gbp(p.price)}</span>
              {access.p ? <a className="btn btn-ink" href={`/api/ebook/download?session_id=${encodeURIComponent(access.p)}&book=${p.slug}`}>Download ↓</a> : <BuyButton kind="ebook" slug={p.slug} label="Buy & download" className="btn btn-ink" />}</div>
          </div>))}</div>
        <div className="tiers" style={{ gridTemplateColumns: '1fr', maxWidth: 760, margin: '90px auto 0' }}>
          <div className="tier best" style={{ transform: 'none' }}><div className="k" style={{ color: 'var(--gold)' }}>ALL-ACCESS PASS</div><div className="price">£149</div>
            <ul><li>Every playbook here, plus every future one</li><li>All 9 Trading Foundry courses</li><li>Lifetime access, one payment</li></ul>
            {access.s.includes('all') ? <span className="pill g">YOU HAVE THE PASS</span> : <BuyButton kind="pass" label={<>Get the All-Access Pass <span className="arr">→</span></>} />}</div>
        </div>
        <p className="disclaim">Education only, not financial advice. Instant digital delivery; 30-day no-quibble refund. Playbook downloads can be re-opened from the link on this page or in your Stripe receipt.</p>
      </div></section>
    </main>
  );
}
