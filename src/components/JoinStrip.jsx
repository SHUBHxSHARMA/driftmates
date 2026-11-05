import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { inr, stayLabel } from "../data";

function kindPill(kind) {
  const first = String(kind || "").split("·")[0].trim();
  return first || "Journey";
}

function Card({ journey, clone }) {
  return (
    <article className="join-card">
      <Link
        to={`/journeys/${journey.slug}`}
        tabIndex={clone ? -1 : undefined}
        aria-hidden={clone ? "true" : undefined}
      >
        <div className="join-photo">
          <img src={journey.image} alt={clone ? "" : journey.title} draggable="false" />
          <span className="join-pill">{kindPill(journey.kind)}</span>
        </div>
        <div className="join-body">
          <p className="join-place">{journey.destination}</p>
          <h3>{journey.title}</h3>
          <p className="join-meta">
            <span>{stayLabel(journey.nights)}</span>
            <span>{journey.kind}</span>
          </p>
          <p className="join-price">From {inr(journey.price)}</p>
        </div>
      </Link>
    </article>
  );
}

export default function JoinStrip({ items }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    let pointerId = null;
    let startX = 0;
    let startScroll = 0;
    let moved = 0;
    let dragging = false;

    const onDown = (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      dragging = true;
      pointerId = e.pointerId;
      startX = e.clientX;
      startScroll = root.scrollLeft;
      moved = 0;
      root.classList.add("is-dragging");
      root.setPointerCapture(e.pointerId);
    };

    const onMove = (e) => {
      if (!dragging || e.pointerId !== pointerId) return;
      const dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      root.scrollLeft = startScroll - dx;
    };

    const onUp = (e) => {
      if (!dragging || e.pointerId !== pointerId) return;
      dragging = false;
      pointerId = null;
      root.classList.remove("is-dragging");
      if (moved <= 8) return;
      const stop = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        root.removeEventListener("click", stop, true);
      };
      root.addEventListener("click", stop, true);
    };

    root.addEventListener("pointerdown", onDown);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerup", onUp);
    root.addEventListener("pointercancel", onUp);

    return () => {
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div className="join-marquee" ref={rootRef}>
      <div className="join-track">
        <div className="join-set">
          {items.map((journey) => (
            <Card key={journey.slug} journey={journey} />
          ))}
        </div>
      </div>
    </div>
  );
}
