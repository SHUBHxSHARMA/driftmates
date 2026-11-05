import { useLayoutEffect, useRef, useState } from "react";

const palette = ["#1a4731", "#123524", "#9a7340", "#5c5348", "#2f6a4a", "#6e5430"];

function colorFor(name) {
  let n = 0;
  for (let i = 0; i < name.length; i += 1) n = (n + name.charCodeAt(i) * (i + 3)) % palette.length;
  return palette[n];
}

function GoogleMark() {
  return (
    <svg className="g-mark" viewBox="0 0 48 48" role="img" aria-label="Google">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
  );
}

function Stars() {
  return (
    <div className="g-stars" aria-label="Rated 5 out of 5 on Google">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
      <span className="g-verified" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" d="M6 12.5 10.2 16.5 18 8" />
        </svg>
      </span>
    </div>
  );
}

function ReviewCard({ review, clone }) {
  const textRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const initial = review.name.trim()[0]?.toUpperCase() || "D";

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el || open) return;
    setOverflows(el.scrollHeight > el.clientHeight + 1);
  }, [open, review.text]);

  return (
    <article className={`g-card${open ? " open" : ""}`} inert={clone ? true : undefined}>
      <header className="g-card-top">
        <span className="g-avatar" style={{ background: colorFor(review.name) }} aria-hidden="true">
          {initial}
        </span>
        <h3>{review.name}</h3>
        <GoogleMark />
      </header>
      <Stars />
      <p ref={textRef} className={open ? "g-text full" : "g-text"}>{review.text}</p>
      {(overflows || open) && (
        <button type="button" className="g-more" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {open ? "Read less" : "Read more"}
        </button>
      )}
    </article>
  );
}

function ReviewSet({ items, clone }) {
  return (
    <div className="g-set" aria-hidden={clone ? "true" : undefined}>
      {items.map((review) => (
        <ReviewCard clone={clone} key={clone ? `${review.name}-loop` : review.name} review={review} />
      ))}
    </div>
  );
}

function ReviewLine({ items, reverse }) {
  return (
    <div className="g-marquee">
      <div className={`g-track${reverse ? " back" : ""}`}>
        <ReviewSet items={items} />
        <ReviewSet items={items} clone />
      </div>
    </div>
  );
}

export default function GoogleReviews({ items }) {
  return (
    <div className="g-band">
      <ul className="sr-only">
        {items.map((review) => (
          <li key={review.name}>{review.name}. {review.text}</li>
        ))}
      </ul>
      <ReviewLine items={items} />
      <ReviewLine items={[...items].reverse()} reverse />
    </div>
  );
}
