// Branded 404: any address that doesn't exist lands here, in the site's own design, with a way back.
import './(tf)/base.css';
import './(tf)/site.css';
import './(tf)/theme.css';
import './(tf)/polish.css';
import SiteHeader from '../components/tf/SiteHeader';
import TfFooter from '../components/tf/TfFooter';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <>
      <main className="tf-page">
        <SiteHeader variant="over" />
        <section className="phero nf"><div className="wrap">
          <div className="k" style={{ color: 'var(--gold)' }}>404 · PAGE NOT FOUND</div>
          <h1 className="d">Off the chart<span className="g">.</span></h1><span className="bar" />
          <p>That page doesn&apos;t exist, or it has moved. Everything on the site is one click from here.</p>
          <div className="row">
            <a className="btn btn-gold" href="/courses/forex-from-zero">Start Forex From Zero</a>
            <a className="btn btn-line" href="/courses">Browse courses</a>
            <a className="btn btn-line" href="/">Home</a>
          </div>
        </div></section>
      </main>
      <TfFooter />
    </>
  );
}
