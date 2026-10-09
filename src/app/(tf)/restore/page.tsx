import type { Metadata } from 'next';
import SiteHeader from '../../../components/tf/SiteHeader';
import RestoreForm from '../../../components/tf/RestoreForm';

export const metadata: Metadata = { title: 'Restore access', robots: { index: false } };

export default function Restore() {
  return (
    <main className="tf-page">
      <SiteHeader variant="light" />
      <section className="cream" style={{ paddingBlock: 100 }}><div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: 40 }}><div className="k" style={{ color: 'var(--ink50)' }}>NEW DEVICE OR BROWSER?</div><h1 className="d" style={{ fontSize: 'clamp(44px,6vw,84px)', marginTop: 12 }}>Restore access<span className="g">.</span></h1></div>
        <RestoreForm />
      </div></section>
    </main>
  );
}
