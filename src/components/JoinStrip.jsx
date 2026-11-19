import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { inr, stayLabel } from "../data";

function kindPill(kind) {
  const parts = String(kind || "")
    .split("·")
    .map((part) => part.trim())
    .filter(Boolean);
  const hasBike = parts.some((part) => /bik/i.test(part));
  const hasPack = parts.some((part) => /backpack/i.test(part));
  if (hasBike && hasPack) return "Bike / Backpacking";
  return parts[0] || "Journey";
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
            {journey.nights && <span>{stayLabel(journey.nights)}</span>}
            <span>{journey.kind}</span>
          </p>
          <p className="join-price">
            {Number.isFinite(journey.price) ? `From ${inr(journey.price)}` : "Ask the desk"}
          </p>
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
    let tracking = false;
    let dragging = false;

    const onClick = (event) => {
      if (!dragging) return;
      event.preventDefault();
      event.stopPropagation();
    };

    const onDown = (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      tracking = true;
      dragging = false;
      pointerId = e.pointerId;
      startX = e.clientX;
      startScroll = root.scrollLeft;
      moved = 0;
    };

    const onMove = (e) => {
      if (!tracking || e.pointerId !== pointerId) return;
      const dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      if (moved <= 8) return;
      if (!dragging) {
        dragging = true;
        root.classList.add("is-dragging");
        root.setPointerCapture(e.pointerId);
      }
      root.scrollLeft = startScroll - dx;
    };

    const finish = (e) => {
      if (!tracking || e.pointerId !== pointerId) return;
      tracking = false;
      pointerId = null;
      root.classList.remove("is-dragging");
      if (root.hasPointerCapture?.(e.pointerId)) root.releasePointerCapture(e.pointerId);
      window.setTimeout(() => {
        dragging = false;
      }, 0);
      return wasDrag;
    };

    root.addEventListener("pointerdown", onDown);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerup", finish);
    root.addEventListener("pointercancel", finish);
    root.addEventListener("click", onClick, true);

    return () => {
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerup", finish);
      root.removeEventListener("pointercancel", finish);
      root.removeEventListener("click", onClick, true);
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
