import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EnquiryForm from "../components/EnquiryForm";
import RouteTraveller from "../components/RouteTraveller";
import RouteOverview from "../components/RouteOverview";
import SeasonBox from "../components/SeasonBox";
import Seo from "../components/Seo";
import TripCard from "../components/TripCard";
import { getJourney, journeys } from "../data";
import { breadcrumb, journeyDescription, organization } from "../seo";

function Lines({ text }) {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  return (
    <div className="day-copy">
      {lines.map((line, i) => (
        <p key={i}>{line.replace(/^[-–]\s*/, "")}</p>
      ))}
    </div>
  );
}

function stopName(title) {
  const clean = title.replace(/\(.*?\)/g, "").replace(/\|/g, " – ").trim();
  const parts = clean.split(/\s+(?:to|→)\s+/i);
  return (parts.at(-1) || clean).trim();
}

function RouteTrack({ days }) {
  const [progress, setProgress] = useState(0);
  const [compact, setCompact] = useState(false);
  const trackRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const measure = () => {
      const track = trackRef.current;
      if (track) {
        const stickyTop = parseFloat(getComputedStyle(track).top) || 0;
        const stuck = track.getBoundingClientRect().top <= stickyTop + 2;
        setCompact(stuck);
      }
      if (reduce) return;
      const nodes = [...document.querySelectorAll("[data-day]")];
      if (!nodes.length) return;
      const start = nodes[0].getBoundingClientRect().top + window.scrollY;
      const end = nodes.at(-1).getBoundingClientRect().bottom + window.scrollY;
      const y = window.scrollY + window.innerHeight * 0.42;
      const next = Math.min(1, Math.max(0, (y - start) / Math.max(1, end - start)));
      setProgress(next);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [days]);

  const active = Math.min(days.length - 1, Math.floor(progress * days.length));

  return (
    <div ref={trackRef} className={`route-track${compact ? " is-compact" : ""}`} aria-hidden="true">
      <div className="route-line">
        <span className="route-line-fill" style={{ width: `${progress * 100}%` }} />
        <span className="route-vehicle" style={{ left: `${progress * 100}%` }}>
          <RouteTraveller />
        </span>
      </div>
      <div className="route-stops">
        {days.map((day, i) => (
          <span key={`${day.n}-${day.t}`} className={i === active ? "is-active" : ""}>
            {stopName(day.t)}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Journey() {
  const { slug } = useParams();
  const journey = getJourney(slug);
  const [open, setOpen] = useState(-1);
  const description = journey ? journeyDescription(journey) : "";
  const jsonLd = useMemo(() => {
    if (!journey) return null;
    const path = `/journeys/${journey.slug}`;
    const graph = [
      organization,
      breadcrumb([
        { name: "Home", path: "/" },
        { name: journey.destination, path: `/destinations/${journey.place}` },
        { name: journey.title, path },
      ]),
      {
        "@type": "TouristTrip",
        name: journey.title,
        description: journey.summary,
        image: journey.image,
        url: `https://driftmates.com/journeys/${journey.slug}`,
        provider: { "@id": "https://driftmates.com/#organization" },
        itinerary: {
          "@type": "ItemList",
          itemListElement: journey.days.map((day, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `${day.n}: ${day.t}`,
          })),
        },
        offers: {
          "@type": "Offer",
          price: String(journey.price),
          priceCurrency: "INR",
          url: `https://driftmates.com/journeys/${journey.slug}`,
        },
      },
    ];
    if (journey.faqs?.length) {
      graph.push({
        "@type": "FAQPage",
        mainEntity: journey.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      });
    }
    return { "@context": "https://schema.org", "@graph": graph };
  }, [journey]);

  if (!journey) {
    return (
      <section>
        <div className="wrap">
          <h1>That route isn’t on the map yet.</h1>
          <Link className="btn" to="/destinations">Back to the states</Link>
        </div>
      </section>
    );
  }

  const photos = [journey.image, ...(journey.gallery || [])];
  const more = journeys.filter((j) => j.place === journey.place && j.slug !== journey.slug);

  return (
    <>
      <Seo
        title={`${journey.title} | ${journey.destination} | Driftmates`}
        description={description}
        path={`/journeys/${journey.slug}`}
        image={journey.image}
        jsonLd={jsonLd}
      />
      <header className="page-hero journey-hero">
        <img src={journey.image} alt={`${journey.title} in ${journey.destination}`} />
        <div className="shade" />
        <div className="wrap">
          <div className="crumbs">
            <Link to={`/destinations/${journey.place}`}>{journey.destination}</Link>
            <span> · {journey.kind}</span>
          </div>
          <h1>{journey.title}</h1>
          <p>{journey.summary}</p>
          <Link className="btn" to={`/plan?journey=${journey.slug}`}>Plan this journey</Link>
        </div>
      </header>

      <nav className="section-nav" aria-label="On this journey">
        <div className="wrap section-nav-inner">
          <a href="#overview">Overview</a>
          <a href="#itinerary">Itinerary</a>
          <a href="#included">Included</a>
          <a href="#questions">Questions</a>
          <Link className="btn" to={`/plan?journey=${journey.slug}`}>Request a plan</Link>
        </div>
      </nav>

      <section id="overview">
        <div className="wrap split overview-split">
          <div className="prose">
            <p className="kicker">Overview</p>
            <h2>The shape of this journey</h2>
            <Lines text={journey.overview} />
          </div>
          <SeasonBox journey={journey} />
        </div>
      </section>

      <RouteOverview journey={journey} />

      <section id="itinerary" className="band">
        <div className="wrap">
          <div className="section-head center">
            <p className="kicker">Day by day</p>
            <h2>{journey.days.length} days on the road</h2>
          </div>
          <RouteTrack days={journey.days} />
          <div className="day-list">
            {journey.days.map((day, i) => (
              <article className="day-block" data-day key={`${day.n}-${day.t}`}>
                <div>
                  <p className="kicker">{day.n}</p>
                  <h3>{day.t}</h3>
                  <Lines text={day.d} />
                </div>
                {photos[i] && (
                  <div className="day-photo">
                    <img src={photos[i]} alt={`${day.t}, ${journey.destination}`} />
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="included">
        <div className="wrap split">
          <div>
            {journey.included?.length > 0 && (
              <div className="policy">
                <h2>Included</h2>
                <ul className="check">
                  {journey.included.map((item, i) => <li key={`in-${i}`}>{item}</li>)}
                </ul>
              </div>
            )}
            {journey.notIncluded?.length > 0 && (
              <div className="policy">
                <h2>Not included</h2>
                <ul className="check">
                  {journey.notIncluded.map((item, i) => <li key={`out-${i}`}>{item}</li>)}
                </ul>
              </div>
            )}
          </div>
          <div>
            {journey.payment?.length > 0 && (
              <div className="policy">
                <h2>Payment</h2>
                <ul className="check">
                  {journey.payment.map((item, i) => <li key={`pay-${i}`}>{item}</li>)}
                </ul>
              </div>
            )}
            {journey.cancellation?.length > 0 && (
              <div className="policy">
                <h2>Cancellation</h2>
                <ul className="check">
                  {journey.cancellation.map((item, i) => <li key={`can-${i}`}>{item}</li>)}
                </ul>
              </div>
            )}
            {journey.terms?.length > 0 && (
              <div className="policy">
                <h2>Terms</h2>
                <ul className="check">
                  {journey.terms.map((item, i) => <li key={`term-${i}`}>{item}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {journey.faqs?.length > 0 && (
        <section id="questions" className="band">
          <div className="wrap narrow">
            <div className="section-head center">
              <p className="kicker">Questions</p>
              <h2>Before you pack</h2>
            </div>
            <div className="faq-rows">
              {journey.faqs.map((faq, i) => (
                <div className={`faq-row${open === i ? " open" : ""}`} key={faq.q}>
                  <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                    {faq.q}
                    <span>{open === i ? "–" : "+"}</span>
                  </button>
                  {open === i && <p>{faq.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {journey.altitude?.length > 0 && (
        <section>
          <div className="wrap narrow">
            <h2>Altitude</h2>
            <ul className="check">
              {journey.altitude.map((row) => <li key={row}>{row}</li>)}
            </ul>
          </div>
        </section>
      )}

      <section id="ask">
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

      {more.length > 0 && (
        <section className="band">
          <div className="wrap">
            <div className="section-head">
              <p className="kicker">More in {journey.destination}</p>
              <h2>Other journeys</h2>
            </div>
            <div className="trip-grid">
              {more.map((j) => <TripCard key={j.slug} journey={j} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
