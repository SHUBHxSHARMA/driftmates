import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import EnquiryForm from "../components/EnquiryForm";
import OfficeMap from "../components/OfficeMap";
import GoogleReviews from "../components/GoogleReviews";
import Credentials from "../components/Credentials";
import JoinStrip from "../components/JoinStrip";
import { organization } from "../seo";
import {
  address,
  beliefs,
  destinations,
  email,
  journeys,
  phone,
  phoneHref,
  photos,
  reviews,
  steps,
  whatsapp,
  whatsappNumber,
} from "../data";

const leadSlugs = ["leh-ladakh-umling-la", "munsiyari-johar", "bhutan", "turtuk-bike"];
const joining = [
  ...leadSlugs.map((slug) => journeys.find((item) => item.slug === slug)),
  ...journeys.filter((item) => !leadSlugs.includes(item.slug)),
].filter(Boolean);

const thoughts = [
  { title: "Small groups. Bigger connections.", text: beliefs[0].text },
  { title: "Challenge, nature, growth.", text: beliefs[1].text },
  { title: "Thoughtfully curated.", text: beliefs[2].text },
  { title: "Certified adventure leaders.", text: beliefs[3].text },
];

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
  "Masai Mara",
  "Serengeti",
  "Kilimanjaro",
];

export default function Home() {
  return (
    <div className="home">
      <Seo
        title="Driftmates Adventure | Ladakh, Spiti, Kumaon, Bhutan and Annapurna"
        description="Motorcycle, backpacking, and trek departures in Ladakh, Spiti, Kumaon, Manali, Bhutan, and Annapurna. Driftmates, Haldwani."
        path="/"
        image={photos.hero}
        jsonLd={{ "@context": "https://schema.org", "@graph": [organization] }}
      />
      <section className="hero">
        <img
          className="hero-img"
          src={photos.hero}
          alt="Driftmates journey in the Himalaya"
        />
        <div className="hero-shade" />
        <div className="hero-copy">
          <div className="pill">✦ This isn’t just a trip</div>
          <h1>
            Small-group adventures
            <br /> across the Himalaya
          </h1>
          <p className="lede">
            Motorcycle expeditions, backpacking trips, and treks through Ladakh, Uttarakhand,
            Himachal, Nepal, and Bhutan — and safari weeks in Kenya and Tanzania. Planned on
            the ground by a team that has spent a decade on these trails.
          </p>
          <div className="hero-actions">
            <Link className="btn" to="/#states">Choose a state</Link>
            <Link className="btn ghost" to="/plan">Plan my journey</Link>
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
        <div className="wrap hold">
          <Reveal className="hold-photo">
            <img src="/route-briefing.jpg?v=3" alt="A Driftmates lead going over the route map with the group" />
          </Reveal>
          <div className="hold-copy">
            <div className="hold-grid">
              {thoughts.map((idea, i) => (
                <Reveal as="article" delay={i * 70} key={idea.title}>
                  <span>0{i + 1}</span>
                  <h3>{idea.title}</h3>
                  <p>{idea.text}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className="hold-action">
              <Link className="btn" to="/about">How we travel</Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="departures">
        <div className="wrap">
          <div className="join-head">
            <Reveal>
              <p className="kicker">Departures</p>
              <h2>Trips people are joining</h2>
              <p>The length and the price, as printed on the trip.</p>
            </Reveal>
          </div>
          <JoinStrip items={joining} />
        </div>
      </section>

      <section className="band" id="states">
        <div className="wrap">
          <Reveal className="section-head center">
            <div className="dots">Ladakh · Uttarakhand · Himachal · Bhutan · Nepal · Africa</div>
            <h2>Places we actually know</h2>
            <p>
              Discover what sits past the usual trail. Local guides and expedition leads who
              know the passes, the villages, and the days worth protecting.
            </p>
          </Reveal>
          <div className="dest-grid">
            {destinations.map((d, i) => (
              <Reveal as="article" className="dest-card" delay={(i % 3) * 90} key={d.slug} id={d.slug}>
                <Link to={`/destinations/${d.slug}`} className="dest-photo">
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
                  <Link className="btn" to={`/destinations/${d.slug}`}>See the trips</Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="guest-notes" id="reviews">
        <div className="wrap">
          <div className="section-head center">
            <p className="kicker">Guest notes</p>
            <h2>Stories from the trail</h2>
          </div>
        </div>
        <GoogleReviews items={reviews} />
      </section>

      <Credentials />

      <section className="plan-how">
        <div className="wrap plan-split">
          <Reveal>
            <p className="kicker">From first call to the last pass</p>
            <h2>How we plan your journey</h2>
            <p>
              From your first hello to the last evening on the trail, we make planning feel as
              effortless as the journey itself.
            </p>
            <Link className="btn" to="/plan">Let’s begin</Link>
          </Reveal>
          <ol className="plan-steps">
            {steps.map((step, i) => (
              <Reveal as="li" delay={i * 80} key={step.n}>
                <span>{step.n}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="contact">
        <div className="wrap contact-grid">
          <Reveal>
            <p className="kicker">Contact</p>
            <h2>Tell us who’s coming.</h2>
            <p>
              A departure from the list, or a private week at your own pace. The desk in Haldwani
              answers with a route.
            </p>
            <EnquiryForm />
          </Reveal>
          <Reveal delay={80}>
            <div className="desk-card">
              <h3>Or reach the desk directly</h3>
              <p><a href={phoneHref}>{phone}</a></p>
              <p><a href={`mailto:${email}`}>{email}</a></p>
              <p>
                <a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp {whatsappNumber}</a>
              </p>
              <p>{address}</p>
            </div>
            <OfficeMap />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
