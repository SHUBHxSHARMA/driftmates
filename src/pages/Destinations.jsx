import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { destinations, photos } from "../data";

export default function Destinations() {
  return (
    <>
      <Seo
        title="Destinations | Uttarakhand, Himachal, Ladakh, Bhutan, Nepal, Africa | Driftmates"
        description="The regions Driftmates actually runs: Ladakh, Kumaon and Garhwal, Himachal and Spiti, Bhutan, the Annapurna region of Nepal, and safaris in Kenya and Tanzania."
        path="/destinations"
        image={photos.leh}
      />
      <header className="page-hero">
        <img src={photos.leh} alt="Leh Ladakh" />
        <div className="shade" />
        <div className="wrap">
          <div className="crumbs">Destinations</div>
          <h1>The map, kept small on purpose</h1>
          <p>
            We’d rather know a few regions deeply than list fifty we haven’t walked. These are the ones.
          </p>
        </div>
      </header>

      {destinations.map((d, i) => {
        const reverse = i % 2 === 1;
        return (
          <section key={d.slug} id={d.slug} className={i % 2 ? "band" : ""}>
            <Reveal className={`wrap story dest-row ${reverse ? "reverse" : ""}`}>
              <Link className="story-photo" to={`/destinations/${d.slug}`}>
                <img src={d.portrait || d.image} alt={`${d.name}, ${d.region}`} />
                <span className="enter-tag">Enter {d.name}</span>
              </Link>
              <div className="dest-copy">
                <p className="kicker">{d.region}</p>
                <h2>
                  <Link to={`/destinations/${d.slug}`}>{d.name}</Link>
                </h2>
                <p>{d.blurb}</p>
                <ul className="dest-points">
                  {d.highlights.map((h) => <li key={h}>{h}</li>)}
                </ul>
                <p>Ideal length · {d.ideal}</p>
                <div className="j-actions">
                  <Link className="btn" to={`/plan?journey=${d.slug}`}>Talk to team</Link>
                  <Link className="btn line" to={`/destinations/${d.slug}`}>
                    Itinerary in {d.name}
                  </Link>
                </div>
              </div>
            </Reveal>
          </section>
        );
      })}
    </>
  );
}
