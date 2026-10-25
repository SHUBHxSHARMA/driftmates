import { Link } from "react-router-dom";
import { address, beliefs, email, phone, phoneHref } from "../data";

export default function About() {
  return (
    <>
      <header className="page-hero">
        <img
          src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=2000&q=80"
          alt="A tent pitched with mountains behind it"
        />
        <div className="shade" />
        <div className="wrap">
          <div className="crumbs">The idea</div>
          <h1>Not the biggest company. The one you remember.</h1>
          <p>
            In a world that treats destinations like checklists, Driftmates slows the journey down
            until a place can actually be felt.
          </p>
        </div>
      </header>

      <section>
        <div className="wrap story">
          <div className="story-photo">
            <img
              src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1400&q=80"
              alt="People on a mountain trail"
            />
          </div>
          <div>
            <p className="kicker">Haldwani · since the trails became a practice</p>
            <h2>A decade on the ground</h2>
            <p>
              Riding a high pass. Walking a quiet village. Sitting by a river because the itinerary
              had the sense to leave an hour empty. The journeys are written from on-ground
              exploration, not from a catalogue.
            </p>
            <p>
              We don’t try to offer everywhere. We stay with regions that still have something
              specific to give: Ladakh’s high roads, Kumaon’s inner valleys, a Bhutan week with air
              in it, the Annapurna sanctuary walked properly.
            </p>
            <p>
              Leadership here is responsibility. Certified adventure leaders, trained trek leads,
              and local experts who know which weather to respect. Travellers often mention Pankaj
              on the mountain and Ritvik while the plan is still forming — the work is shared, and
              it shows.
            </p>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap duo">
          <article>
            <p className="kicker">Vision</p>
            <h2 className="serif" style={{ fontWeight: 400, fontSize: 40, marginTop: 0 }}>
              Journeys that stay alive after the photos.
            </h2>
            <p style={{ color: "var(--ink-soft)" }}>
              Travel should be more than a list. Feel the mountains, meet a culture without rushing
              it, push a limit that is yours, and come home with a story you can actually tell.
            </p>
          </article>
          <article>
            <p className="kicker">Mission</p>
            <h2 className="serif" style={{ fontWeight: 400, fontSize: 40, marginTop: 0 }}>
              Meaningful, safe, and specific.
            </h2>
            <p style={{ color: "var(--ink-soft)" }}>
              Lead journeys people trust. The goal is simple: every traveller returns with more
              confidence, a few real connections, and a reason to come back for a different valley.
            </p>
          </article>
        </div>
      </section>

      <section>
        <div className="wrap belief-grid">
          {beliefs.map((b) => (
            <article className="belief" key={b.title}>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </article>
          ))}
        </div>
        <div className="wrap" style={{ marginTop: 18 }}>
          <div className="two">
            <article className="info-card">
              <h3>Responsible travel</h3>
              <p>
                Explore with care. Smaller groups, local knowledge, and a bias toward leaving the
                mountains, villages, and cultures able to host the next person.
              </p>
            </article>
            <article className="info-card">
              <h3>A community, not a counter</h3>
              <p>
                Thousands of travellers have come through. Plenty return. Shared weather, long
                drives, and a camp conversation do what a brochure can’t.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap info-grid">
          <article className="info-card">
            <h3>Write</h3>
            <a href={`mailto:${email}`}>{email}</a>
          </article>
          <article className="info-card">
            <h3>Call</h3>
            <a href={phoneHref}>{phone}</a>
            <p>A second line the team uses: +91 86790 33487</p>
          </article>
          <article className="info-card">
            <h3>Find the desk</h3>
            <p>{address}</p>
          </article>
        </div>
        <div className="wrap center" style={{ marginTop: 28 }}>
          <Link className="btn" to="/plan">Talk about a journey</Link>
        </div>
      </section>
    </>
  );
}
