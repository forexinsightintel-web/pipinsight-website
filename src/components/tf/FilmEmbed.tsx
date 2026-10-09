'use client';
// YouTube film: shows the thumbnail until clicked, then loads the privacy-enhanced player.
import { useState } from 'react';

export default function FilmEmbed({ id, title }: { id: string; title: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="embed">
      {on ? <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
        : <button onClick={() => setOn(true)} aria-label={`Play ${title}`}><img src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`} alt="" /><span className="play">▶</span></button>}
    </div>
  );
}
