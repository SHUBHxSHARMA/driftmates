import { Link } from "react-router-dom";
import { destinations, journeys } from "../data";

export default function Destinations() {
  return (
    <>
      <header className="page-hero">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80"
          alt="A mountain lake under steep peaks"
        />
        <div className="shade" />
        <div className="wrap">
          <div className="crumbs">Destinations</div>
          <h1>The map, kept small on purpose</h1>
          <p>
            We’d rather know five regions deeply than list fifty we haven’t walked. These are the ones.
          </p>
        </div>
      </header>

      {destinations.map((d, i) => {
        const related = journeys.filter((j) => j.place === d.slug);
        const reverse = i % 2 === 1;
        return (
          <section key={d.slug} id={d.slug} className={i % 2 ? "band" : ""}>
            <div className={`wrap story ${reverse ? "reverse" : ""}`}>
              <div className="story-photo">
                <img src={d.portrait || d.image} alt={d.name} />
              </div>
              <div>
                <p className="kicker">{d.region}</p>
                <h2>{d.name}</h2>
                <p>{d.blurb}</p>
                <ul>
                  {d.highlights.map((h) => <li key={h}>{h}</li>)}
                </ul>
                <p>Ideal length · {d.ideal}</p>
                <div className="j-actions">
                  <Link className="btn" to={`/plan?journey=${d.slug}`}>Plan {d.name}</Link>
                  {related[0] && (
                    <Link className="btn line" to={`/journeys/${related[0].slug}`}>
                      See {related[0].title}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
