import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import SiteHeader from '../../../components/tf/SiteHeader';
import BuyButton from '../../../components/tf/BuyButton';
import { COURSES, TOTALS } from '../../../lib/academy';
import { PLAYBOOKS, gbp, MIN_PRICE } from '../../../lib/playbooks';
import { COOKIE, verify } from '../../../lib/access';

export const metadata: Metadata = { title: 'Pricing', description: 'Pay once, keep it. Single courses, playbooks, or the All-Access Pass. No subscriptions.' };
export const dynamic = 'force-dynamic';

export default async function Pricing() {
  const access = verify((await cookies()).get(COOKIE)?.value);
  const paid = COURSES.filter((c) => c.price_gbp > 0);
  return (
    <main className="tf-page">
      <SiteHeader variant="over" active="/pricing" />
      <section className="phero"><video autoPlay muted loop playsInline src="/media/hero_broll.mp4" aria-hidden="true" /><div className="wrap">
        <div className="k" style={{ color: 'var(--gold)' }}>PRICING</div>
        <h1 className="d">Pay once<span className="g">.</span> Keep it<span className="g">.</span></h1><span className="bar" />
        <p>No subscriptions, no countdown timers, no fake discounts. One-off prices with lifetime access, and a 30-day refund if it isn&apos;t for you.</p>
      </div></section>
      <section className="cream"><div className="wrap">
        <div className="tiers">
          <div className="tier"><div className="k" style={{ color: 'var(--ink50)' }}>PLAYBOOK</div><div className="price">{gbp(MIN_PRICE)}</div><ul><li>One illustrated playbook (PDF)</li><li>37–42 pages</li><li>Companion film QR codes</li><li>{PLAYBOOKS.length} to choose from</li></ul><a className="btn btn-line" href="/playbooks">Browse playbooks</a></div>
          <div className="tier best"><div className="k" style={{ color: 'var(--gold)' }}>ALL-ACCESS PASS · BEST VALUE</div><div className="price">£149</div><ul><li>All {paid.length} paid courses ({TOTALS.lessons} lessons in total)</li><li>All {PLAYBOOKS.length} playbooks</li><li>Every future course and playbook</li><li>{TOTALS.charts} annotated charts, drills and quizzes</li></ul>{access.s.includes('all') ? <span className="pill g">YOU HAVE THE PASS</span> : <BuyButton kind="pass" label={<>Get all access <span className="arr">→</span></>} />}</div>
          <div className="tier"><div className="k" style={{ color: 'var(--ink50)' }}>SINGLE COURSE</div><div className="price">£{Math.min(...paid.map((c) => c.price_gbp))}<span style={{ fontSize: 22, color: 'var(--ink50)' }}> –£{Math.max(...paid.map((c) => c.price_gbp))}</span></div><ul><li>The film + 10–12 written lessons</li><li>Practice drills and quizzes</li><li>Strategy passport</li><li>Lifetime access</li></ul><a className="btn btn-line" href="/courses">Choose a course</a></div>
        </div>
        <div className="guar"><span>30-day refund</span><span>Secure checkout by Stripe</span><span>Forex From Zero is free</span></div>
      </div></section>
    </main>
  );
}
