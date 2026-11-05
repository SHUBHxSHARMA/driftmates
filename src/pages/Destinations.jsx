import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { destinations, journeys, photos } from "../data";

export default function Destinations() {
  return (
    <>
      <Seo
        title="Destinations | Ladakh, Uttarakhand, Himachal, Bhutan, Nepal, Africa | Driftmates"
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
        const count = journeys.filter((j) => j.place === d.slug).length || d.safaris?.length || 0;
        const journeyLabel = count === 1 ? `Journey in ${d.name}` : `Journeys in ${d.name}`;
        const reverse = i % 2 === 1;
        return (
          <section key={d.slug} id={d.slug} className={i % 2 ? "band" : ""}>
            <Reveal className={`wrap story ${reverse ? "reverse" : ""}`}>
              <Link className="story-photo" to={`/destinations/${d.slug}`}>
                <img src={d.portrait || d.image} alt="" />
                <span className="enter-tag">Enter {d.name}</span>
              </Link>
              <div>
                <p className="kicker">{d.region}</p>
                <h2>
                  <Link to={`/destinations/${d.slug}`}>{d.name}</Link>
                </h2>
                <p>{d.blurb}</p>
                <ul>
                  {d.highlights.map((h) => <li key={h}>{h}</li>)}
                </ul>
                <p>Ideal length · {d.ideal}</p>
                <div className="j-actions">
                  <Link className="btn" to={`/plan?journey=${d.slug}`}>Plan {d.name}</Link>
                  <Link className="btn line" to={`/destinations/${d.slug}`}>
                    {journeyLabel}
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
