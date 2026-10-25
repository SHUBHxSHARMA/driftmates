import { useState } from "react";
import { Link } from "react-router-dom";
import EnquiryForm from "../components/EnquiryForm";
import {
  beliefs,
  destinations,
  faqs,
  inr,
  journeys,
  reviews,
  steps,
} from "../data";

const places = [
  "Ladakh",
  "Umling La",
  "Turtuk",
  "Munsiyari",
  "Darma Valley",
  "Adi Kailash",
  "Tungnath",
  "Manali",
  "Jibhi",
  "Bhutan",
  "Annapurna",
  "Kumaon",
];

export default function Home() {
  const [open, setOpen] = useState(0);
  const featured = journeys.slice(0, 4);

  return (
    <>
      <section className="hero">
        <img
          className="hero-img"
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2400&q=80"
          alt="Sun breaking over a high mountain ridge"
        />
        <div className="hero-shade" />
        <div className="hero-copy">
          <div className="pill reveal">✦ This isn’t just a trip</div>
          <h1 className="reveal d1">
            Small-group adventures
            <br /> across the Himalaya
          </h1>
          <p className="lede reveal d2">
            Motorcycle expeditions, backpacking trips, and treks through Ladakh, Uttarakhand,
            Himachal, Nepal, and Bhutan. Planned on the ground by a team that has spent a decade
            on these trails.
          </p>
          <div className="hero-actions reveal d3">
            <Link className="btn" to="/plan">Plan my journey</Link>
            <Link className="btn ghost" to="/journeys">See the routes</Link>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...places, ...places].map((p, i) => (
            <span key={i}>✦ {p}</span>
          ))}
        </div>
      </div>

      <section className="statement">
        <div className="wrap narrow center">
          <h2>Small groups. Deeper trails. Real connection.</h2>
          <p>
            We don’t believe in rushed itineraries or checklist tourism. Every Driftmates
            adventure is paced for thrill, culture, and the quiet in between — so the journey
            feels considered, not commercial.
          </p>
          <div style={{ marginTop: 28 }}>
            <Link className="btn" to="/about">How we travel</Link>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="section-head center">
            <div className="dots">Ladakh · Uttarakhand · Himachal · Bhutan · Nepal</div>
            <h2>Places we actually know</h2>
            <p>
              Discover what sits past the usual trail. Local guides and expedition leads who
              know the passes, the villages, and the days worth protecting.
            </p>
          </div>
          <div className="dest-grid">
            {destinations.map((d) => (
              <article className="dest-card" key={d.slug} id={d.slug}>
                <Link to={`/destinations#${d.slug}`} className="dest-photo">
                  <img src={d.image} alt={d.name} />
                </Link>
                <div className="dest-body">
                  <h3>{d.name}</h3>
                  <p className="kicker">Highlights</p>
                  <ul>
                    {d.highlights.map((h) => <li key={h}>{h}</li>)}
                  </ul>
                  <div className="meta-row">
                    <span>Ideal · {d.ideal}</span>
                    <span>Routes shaped around you</span>
                  </div>
                  <Link className="btn" to={`/plan?journey=${d.slug}`}>Plan {d.name}</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">Departures</p>
            <h2>Journeys with a name and a price</h2>
            <p>
              These are routes already walked and ridden. Dates flex. The feeling of the trip does not.
            </p>
          </div>
          <div className="journey-grid">
            {featured.map((j) => (
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
                    <span className="kind">{j.kind}</span>
                    <span>{j.nights}</span>
                  </div>
                  <h3>{j.title}</h3>
                  <p>{j.summary}</p>
                  <div className="j-actions">
                    <Link className="btn" to={`/journeys/${j.slug}`}>View journey</Link>
                    <Link className="btn line" to={`/plan?journey=${j.slug}`}>Ask for dates</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="center" style={{ marginTop: 28 }}>
            <Link className="btn line" to="/journeys">All eight journeys</Link>
          </div>
        </div>
      </section>

      <section className="band" style={{ paddingBottom: 40 }}>
        <div className="wrap belief-grid">
          {beliefs.map((b) => (
            <article className="belief" key={b.title}>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="wrap steps-wrap">
          <div>
            <p className="kicker">From first call to the last pass</p>
            <h2 className="serif" style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 400, margin: "0 0 12px" }}>
              How a Driftmates journey comes together
            </h2>
            <p style={{ color: "var(--ink-soft)" }}>
              From your first hello to the morning you actually leave, planning should feel as
              unforced as the trip.
            </p>
          </div>
          <div className="step-list">
            {steps.map((s) => (
              <article className="step" key={s.n}>
                <div className="num">{s.n}</div>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <figure className="quote-band">
        <img
          src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=2000&q=80"
          alt=""
        />
        <div className="shade" />
        <div>
          <blockquote>
            “We don’t take people to places. We help them feel the spirit of the place.”
          </blockquote>
          <figcaption>Driftmates · Haldwani</figcaption>
        </div>
      </figure>

      <section className="band">
        <div className="wrap">
          <div className="section-head center">
            <p className="kicker">Guest notes</p>
            <h2>Stories from the trail</h2>
            <p>Firsthand words from people who rode, walked, and came back.</p>
          </div>
          <div className="review-grid">
            {reviews.map((r) => (
              <article className="review" key={r.name}>
                <div className="avatar" aria-hidden="true">{r.name[0]}</div>
                <p>“{r.text}”</p>
                <div className="who">
                  <strong>{r.name}</strong>
                  <span>{r.place}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap duo">
          <div className="faq-col">
            <p className="kicker">Questions</p>
            <h2 className="serif" style={{ fontSize: "clamp(34px, 4vw, 48px)", fontWeight: 400, marginTop: 0 }}>
              Before you pack
            </h2>
            <p style={{ color: "var(--ink-soft)" }}>The practical things people ask before a Himalayan week.</p>
            <div className="faq-list">
              {faqs.map((f, i) => (
                <div className="faq-item" key={f.q}>
                  <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                    {f.q}
                    <span className="plus">{open === i ? "–" : "+"}</span>
                  </button>
                  {open === i && <div className="a">{f.a}</div>}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="kicker">Write to the desk</p>
            <h2 className="serif" style={{ fontSize: 36, fontWeight: 400, marginTop: 0 }}>
              Tell us the season. We’ll tell you the road.
            </h2>
            <EnquiryForm compact />
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-band">
            <div>
              <h2>Top of the map for 2027 is already being walked.</h2>
              <p>If a departure speaks to you, claim a conversation before the group fills.</p>
            </div>
            <Link className="btn light" to="/plan">Begin with a call</Link>
          </div>
        </div>
      </section>
    </>
  );
}
