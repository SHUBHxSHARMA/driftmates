import { Link, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import TripCard from "../components/TripCard";
import { destinations, getDestination, journeys, stayLabel } from "../data";
import { RouteBox } from "../components/RouteOverview";
import { kenyaCircuit } from "../routeStops";
import { absolute, breadcrumb, clip, organization } from "../seo";

export default function Destination() {
  const { slug } = useParams();
  const destination = getDestination(slug);

  if (!destination) {
    return (
      <section>
        <div className="wrap">
          <h1>That region isn’t on our map.</h1>
          <Link className="btn" to="/destinations">All destinations</Link>
        </div>
      </section>
    );
  }

  const related = journeys.filter((j) => j.place === destination.slug);
  const safaris = destination.safaris || [];
  const path = `/destinations/${destination.slug}`;
  const countries = [...new Set(safaris.map((s) => s.country))];

  return (
    <>
      <Seo
        title={`${destination.seoTitle} | Driftmates`}
        description={destination.seoDescription}
        path={path}
        image={destination.image}
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            organization,
            breadcrumb([
              { name: "Home", path: "/" },
              { name: "Destinations", path: "/destinations" },
              { name: destination.name, path },
            ]),
            {
              "@type": "TouristDestination",
              name: destination.name,
              description: clip(destination.blurb, 300),
              url: absolute(path),
              image: destination.image,
            },
            {
              "@type": "ItemList",
              name: safaris.length ? `${destination.name} safaris` : `${destination.name} journeys`,
              itemListElement: (safaris.length ? safaris : related).map((item, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: item.title,
                url: absolute(safaris.length ? `${path}#safaris` : `/journeys/${item.slug}`),
              })),
            },
          ],
        }}
      />
      <header className="page-hero journey-hero welcome-cover">
        <img src={destination.image} alt={`${destination.name} with Driftmates`} />
        <div className="shade" />
        <div className="wrap">
          <div className="crumbs">
            <Link to="/destinations">Destinations</Link> · {destination.region}
          </div>
          <h1>{destination.name}</h1>
          <p>{destination.blurb}</p>
        </div>
      </header>

      <section>
        <div className="wrap split">
          <div className="prose">
            <p className="kicker">{destination.region}</p>
            <h2>About {destination.name}</h2>
            <p>{destination.blurb}</p>
            <ul>
              {destination.highlights.map((h) => <li key={h}>{h}</li>)}
            </ul>
            <p>A good length here is {destination.ideal}.</p>
          </div>
          <aside className="book-card">
            <p className="kicker">
              {safaris.length
                ? `${safaris.length} safaris`
                : `${related.length} ${related.length === 1 ? "journey" : "journeys"}`}
            </p>
            <h2>{safaris.length ? `Safaris in ${destination.name}` : `Trips we run in ${destination.name}`}</h2>
            <p>
              {safaris.length
                ? "Camps and park fees change with the month. Ask the desk for a quote — nothing here is a fixed fare."
                : "Each departure below has its own price, pickup, and day-by-day plan."}
            </p>
            <Link className="btn block" to={`/plan?journey=${destination.slug}`}>Plan {destination.name}</Link>
          </aside>
        </div>
      </section>

      {destination.slug === "africa" && (
        <RouteBox
          title="Kenya safari route overview"
          lede="The 5-day grand circuit. A boat safari on Naivasha, rhinos at Nakuru, then longer drives in the Mara. Camps and park fees are quoted for the month."
          chain="Nairobi → Lake Naivasha → Lake Nakuru → Masai Mara → Nairobi"
          lines={[
            "Nairobi to Lake Naivasha",
            "Lake Naivasha to Lake Nakuru",
            "Lake Nakuru to Masai Mara",
            "Masai Mara to Nairobi",
          ]}
          stops={kenyaCircuit}
        />
      )}

      {related.length > 0 && (
        <section className="band">
          <div className="wrap">
            <div className="section-head">
              <p className="kicker">{related.length} itineraries</p>
              <h2>Journeys in {destination.name}</h2>
            </div>
            <div className="trip-grid">
              {related.map((j) => <TripCard key={j.slug} journey={j} />)}
            </div>
          </div>
        </section>
      )}

      {safaris.length > 0 && (
        <section className="band" id="safaris">
          <div className="wrap">
            <div className="section-head">
              <p className="kicker">Quoted for the season</p>
              <h2>Signature safaris</h2>
              <p>The departures published on Driftmates. Park fees and camps are quoted once you name the month.</p>
            </div>
            {countries.map((country) => (
              <div key={country} className="safari-group">
                <h3 className="serif">{country}</h3>
                <div className="trip-grid">
                  {safaris.filter((s) => s.country === country).map((s) => (
                    <article className="trip-card" key={s.title}>
                      <div className="trip-photo">
                        <img src={s.image} alt={s.title} />
                      </div>
                      <div className="trip-body">
                        <p className="trip-meta">
                          <span>{stayLabel(s.nights)}</span>
                          <span>{s.country}</span>
                        </p>
                        <h3>{s.title}</h3>
                        <p>{s.route}</p>
                        <p>{s.note}</p>
                        <Link className="btn" to={`/plan?journey=${destination.slug}`}>Request a quote</Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="wrap">
          <p className="kicker">Other places</p>
          <div className="j-actions">
            {destinations.filter((d) => d.slug !== destination.slug).map((d) => (
              <Link className="btn line" key={d.slug} to={`/destinations/${d.slug}`}>{d.name}</Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
