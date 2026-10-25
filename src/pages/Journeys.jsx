import { Link } from "react-router-dom";
import { inr, journeys } from "../data";

export default function Journeys() {
  return (
    <>
      <header className="page-hero">
        <img
          src="https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=2000&q=80"
          alt="Two people walking a high trail"
        />
        <div className="shade" />
        <div className="wrap">
          <div className="crumbs">Journeys</div>
          <h1>Eight ways into the mountains</h1>
          <p>
            Fixed departures with real prices, real pickups, and room to make one of them yours.
            Day-by-day lines are a sample flow — the final plan is written with you.
          </p>
        </div>
      </header>
      <section>
        <div className="wrap journey-grid">
          {journeys.map((j) => (
            <article className="j-card" key={j.slug}>
              <Link to={`/journeys/${j.slug}`} className="j-photo">
                <img src={j.image} alt="" />
                <div className="price-flag">
                  <s>{inr(j.was)}</s>
                  <b>From {inr(j.price)}</b>
                </div>
              </Link>
              <div className="j-body">
                <div className="j-top">
                  <span className="kind">{j.destination} · {j.kind}</span>
                  <span>{j.nights}</span>
                </div>
                <h3>{j.title}</h3>
                <p>{j.summary}</p>
                <p style={{ fontSize: 14 }}>Pickup · {j.pickup}</p>
                <div className="j-actions">
                  <Link className="btn" to={`/journeys/${j.slug}`}>Open the journey</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
