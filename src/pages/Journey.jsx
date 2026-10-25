import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import EnquiryForm from "../components/EnquiryForm";
import { getJourney, inr, journeys } from "../data";

export default function Journey() {
  const { slug } = useParams();
  const journey = getJourney(slug);

  useEffect(() => {
    document.title = journey
      ? `${journey.title} | Driftmates Adventure`
      : "Driftmates Adventure";
  }, [journey]);

  if (!journey) {
    return (
      <section>
        <div className="wrap">
          <h1>That route isn’t on the map yet.</h1>
          <Link className="btn" to="/journeys">Back to journeys</Link>
        </div>
      </section>
    );
  }

  const more = journeys.filter((j) => j.slug !== journey.slug).slice(0, 2);

  return (
    <>
      <header className="page-hero">
        <img src={journey.image} alt="" />
        <div className="shade" />
        <div className="wrap">
          <div className="crumbs">
            <Link to="/journeys">Journeys</Link> · {journey.destination}
          </div>
          <h1>{journey.title}</h1>
          <p>{journey.summary}</p>
        </div>
      </header>

      <section>
        <div className="wrap split">
          <div className="prose">
            <p className="kicker">{journey.kind}</p>
            <h2>The shape of the week</h2>
            <p>
              An indicative flow, the way we like this route to feel. Weather, road closures, and
              your pace still get a vote. Nothing here is a locked script.
            </p>
            {journey.days.map((day, i) => (
              <div className="day" key={day.t}>
                <b>0{i + 1}</b>
                <div>
                  <strong>{day.t}</strong>
                  <span>{day.d}</span>
                </div>
              </div>
            ))}

            <div className="two" style={{ marginTop: 28 }}>
              <div>
                <h3>Included</h3>
                <ul className="check">
                  {journey.included.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div>
                <h3>You arrange</h3>
                <ul className="check">
                  {journey.notIncluded.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>

            <div className="gallery">
              {journey.gallery.map((src) => (
                <img key={src} src={src} alt="" />
              ))}
            </div>
          </div>

          <aside className="side-card">
            <p className="kicker">From</p>
            <p className="price">{inr(journey.price)}</p>
            <p className="sub"><s>{inr(journey.was)}</s> · per person</p>
            <ul className="facts">
              <li><b>Duration</b>{journey.nights}</li>
              <li><b>Pickup</b>{journey.pickup}</li>
              <li><b>Season</b>{journey.season}</li>
              <li><b>Style</b>{journey.kind}</li>
            </ul>
            <ul>
              {journey.highlights.map((h) => <li key={h}>{h}</li>)}
            </ul>
            <Link className="btn block" to={`/plan?journey=${journey.slug}`}>Plan this journey</Link>
          </aside>
        </div>
      </section>

      <section className="band">
        <div className="wrap duo">
          <div>
            <p className="kicker">Ask the desk</p>
            <h2 className="serif" style={{ fontWeight: 400, fontSize: 42, marginTop: 0 }}>
              Dates, a private version, or a question about fitness.
            </h2>
          </div>
          <EnquiryForm compact journey={journey.slug} />
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2 className="serif" style={{ fontWeight: 400, fontSize: 40 }}>Other roads</h2>
          <div className="journey-grid">
            {more.map((j) => (
              <article className="j-card" key={j.slug}>
                <Link to={`/journeys/${j.slug}`} className="j-photo">
                  <img src={j.image} alt="" />
                </Link>
                <div className="j-body">
                  <span className="kind">{j.nights}</span>
                  <h3>{j.title}</h3>
                  <Link className="btn line" to={`/journeys/${j.slug}`}>View</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
