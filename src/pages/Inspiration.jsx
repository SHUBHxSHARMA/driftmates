import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { photos } from "../data";
import { articles, collections, gallery } from "../guides";

function Stamp({ id }) {
  const pathId = `stamp-${id}`;
  return (
    <svg className="hand-stamp" viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="52" fill="rgba(255,252,248,0.16)" />
      <circle cx="60" cy="60" r="46" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <defs>
        <path id={pathId} d="M60,60 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
      </defs>
      <text fill="currentColor" fontSize="8.5" letterSpacing="1.6">
        <textPath href={`#${pathId}`}>HANDPICKED · 2027 · HANDPICKED · 2027 ·</textPath>
      </text>
      <text x="60" y="64" textAnchor="middle" fontSize="13" fontFamily="var(--serif)" fill="currentColor">
        2027
      </text>
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 3.5v4M16 3.5v4M3.5 10h17" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function Inspiration() {
  const featured = articles.filter((article) => article.kind === "journey");
  const seasonal = articles.filter((article) => article.kind === "season");
  const mosaic = gallery.slice(0, 5);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (open === null) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(null);
      if (event.key === "ArrowRight") setOpen((index) => (index + 1) % gallery.length);
      if (event.key === "ArrowLeft") setOpen((index) => (index - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <Seo
        title="Inspiration & planning | Driftmates"
        description="Three Driftmates journeys for 2027 — Munsiyari, Adi Kailash, and Darma Valley — with notes on why they matter and when to go."
        path="/inspiration"
        image={photos.hero}
      />
      <header className="page-hero">
        <img src={photos.hero} alt="A Driftmates road in the Himalaya" />
        <div className="shade" />
        <div className="wrap">
          <div className="crumbs">Inspiration & planning</div>
          <h1>Choose the state first. The route follows.</h1>
          <p>
            The useful way to plan is not a long list of trips. Pick the region, read what we
            actually run there, then tell the desk the season and the pace.
          </p>
        </div>
      </header>

      <section className="journal-block">
        <div className="wrap">
          <div className="section-head center">
            <p className="kicker">Handpicked trip ideas</p>
            <h2>For 2027</h2>
          </div>
          <div className="collect-grid">
            {collections.map((item) => (
              <Link className="collect-card" to={`/journeys/${item.journey}`} key={item.journey}>
                <span className="collect-photo">
                  <img src={item.image} alt={item.alt} />
                  <Stamp id={item.journey} />
                </span>
                <span className="collect-copy">
                  <span className="collect-kicker">{item.kicker}</span>
                  <span className="collect-title">{item.title}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="band journal-block">
        <div className="wrap">
          <div className="section-head center">
            <h2>Why these three</h2>
            <p>A short argument for each journey, written from the weeks we have already run.</p>
          </div>
          <div className="note-grid">
            {featured.map((article) => (
              <article className="note-card" key={article.slug}>
                <Link className="note-photo" to={`/inspiration/${article.slug}`}>
                  <img src={article.image} alt={article.alt} />
                </Link>
                <div className="note-body">
                  <p className="note-date">
                    <CalendarIcon />
                    {article.dateLabel}
                  </p>
                  <h3>
                    <Link to={`/inspiration/${article.slug}`}>{article.title}</Link>
                  </h3>
                  <Link className="btn block" to={`/inspiration/${article.slug}`}>Read more</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="journal-block">
        <div className="wrap">
          <div className="section-head center">
            <p className="kicker">Visual journey</p>
            <h2>Field gallery</h2>
            <p>A glimpse of the roads, villages, and ridgelines these journeys actually cross.</p>
            <button className="btn line gallery-open" type="button" onClick={() => setOpen(0)}>
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <rect x="14" y="3" width="7" height="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <rect x="3" y="14" width="7" height="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <rect x="14" y="14" width="7" height="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              View all photos ({gallery.length})
            </button>
          </div>
          <div className="mosaic">
            {mosaic.map((shot, index) => (
              <button
                className={`shot${index === 0 ? " shot-wide" : ""}${index === 1 ? " shot-side" : ""}`}
                type="button"
                key={shot.src}
                onClick={() => setOpen(index)}
              >
                <img src={shot.src} alt={shot.alt} />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="band journal-block">
        <div className="wrap">
          <div className="section-head center">
            <p className="guide-count">Showing 1–{seasonal.length} of {seasonal.length} guides</p>
            <h2>Seasonal articles</h2>
            <p>When a journey is worth taking, and when we would rather you waited.</p>
          </div>
          <div className="guide-grid">
            {seasonal.map((article) => (
              <article className="guide-card" key={article.slug}>
                <Link className="guide-photo" to={`/inspiration/${article.slug}`}>
                  <img src={article.image} alt={article.alt} />
                </Link>
                <div className="guide-copy">
                  <h3>
                    <Link to={`/inspiration/${article.slug}`}>{article.title}</Link>
                  </h3>
                  <p>{article.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={gallery[open].alt}>
          <button className="lightbox-close" type="button" onClick={() => setOpen(null)} aria-label="Close gallery">
            Close
          </button>
          <button
            className="lightbox-nav prev"
            type="button"
            onClick={() => setOpen((open - 1 + gallery.length) % gallery.length)}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <figure>
            <img src={gallery[open].src} alt={gallery[open].alt} />
            <figcaption>{gallery[open].alt}</figcaption>
          </figure>
          <button
            className="lightbox-nav next"
            type="button"
            onClick={() => setOpen((open + 1) % gallery.length)}
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
