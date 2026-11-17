import { Link } from "react-router-dom";
import { inr, stayLabel } from "../data";

export default function TripCard({ journey }) {
  const priced = Number.isFinite(journey.price);
  return (
    <article className="trip-card">
      <Link to={`/journeys/${journey.slug}`} className="trip-photo">
        <img src={journey.image} alt={`${journey.title} in ${journey.destination}`} />
        {priced && <span className="price-chip">From {inr(journey.price)}</span>}
      </Link>
      <div className="trip-body">
        <p className="trip-meta">
          {journey.nights && <span>{stayLabel(journey.nights)}</span>}
          <span>{journey.destination}</span>
        </p>
        <h3>{journey.title}</h3>
        <p>{journey.summary}</p>
        <Link className="btn block" to={`/journeys/${journey.slug}`}>View the journey</Link>
      </div>
    </article>
  );
}
