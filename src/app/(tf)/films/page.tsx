import type { Metadata } from 'next';
import SiteHeader from '../../../components/tf/SiteHeader';
import films from '../../../../content/films.json';
import { COURSES } from '../../../lib/academy';

export const metadata: Metadata = { title: 'Films', description: 'Every Trading Foundry film: complete forex strategy guides, free on YouTube, each linked to its full course.' };

// New uploads appear automatically: the channel's RSS feed (latest ~15 videos) is read at most once an hour
// and merged on top of the saved list in content/films.json.
export const revalidate = 3600;
const CHANNEL = 'UCt9YkJMeULV09DunfIEWGUA';

async function latest(): Promise<[string, string][]> {
  try {
    const r = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL}`, { next: { revalidate: 3600 } });
    if (!r.ok) return [];
    const x = await r.text();
    const dec = (t: string) => t.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    return [...x.matchAll(/<entry>[\s\S]*?<yt:videoId>([^<]+)<\/yt:videoId>[\s\S]*?<title>([^<]*)<\/title>/g)].map((m) => [m[1], dec(m[2])]);
  } catch { return []; }
}

export default async function Films() {
  const saved = Object.entries(films as unknown as Record<string, [string, string | null, string | null]>).map(([id, [t]]) => [id, t] as [string, string]);
  const fresh = await latest();
  const seen = new Set<string>();
  const list = [...fresh, ...saved].filter(([id]) => (seen.has(id) ? false : (seen.add(id), true)));
  const courseFor = (id: string) => COURSES.find((c) => c.films.some((f) => f.id === id));
  return (
    <main className="tf-page">
      <SiteHeader variant="over" active="/films" />
      <section className="phero"><video autoPlay muted loop playsInline src="/media/clip_rules.mp4" aria-hidden="true" /><div className="wrap">
        <div className="k" style={{ color: 'var(--gold)' }}>THE CHANNEL · @THETRADINGFOUNDRY</div>
        <h1 className="d">Every film<span className="g">.</span> Free<span className="g">.</span></h1><span className="bar" />
        <p>Word-timed graphics, a calm voice and every trade shown with its losing version. Watch free on YouTube; each film links to the course that goes deeper.</p>
        <div className="row" style={{ display: 'flex', gap: 12, marginTop: 30, flexWrap: 'wrap' }}><a className="btn btn-gold" href="https://www.youtube.com/@thetradingfoundry?sub_confirmation=1"><span className="yt dark">▶</span> Subscribe on YouTube</a></div>
      </div></section>
      <section className="cream" style={{ paddingTop: 60 }}><div className="wrap"><div className="fgrid">
        {list.map(([id, title]) => { const c = courseFor(id); return (
          <a className="fcard" key={id} href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener">
            <img src={`https://i.ytimg.com/vi/${id}/mqdefault.jpg`} alt="" loading="lazy" />
            <div className="b"><h3>{title}</h3><span className="mono">WATCH ON YOUTUBE →{c ? <> · <b>COURSE: {c.title.replace(/ — .*$/, '').replace(/:.*$/, '').toUpperCase()}</b></> : null}</span></div>
          </a>); })}
      </div></div></section>
    </main>
  );
}
