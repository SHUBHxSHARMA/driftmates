import { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import EnquiryForm from "../components/EnquiryForm";
import OfficeMap from "../components/OfficeMap";
import GoogleReviews from "../components/GoogleReviews";
import {
  address,
  beliefs,
  email,
  faqs,
  phone,
  phoneHref,
  photos,
  reviews,
  steps,
  whatsapp,
  whatsappNumber,
} from "../data";
import { organization } from "../seo";

function Face({ n, label }) {
  return <img className="face" src={`/faces/${n}.jpg?v=5`} alt={label} />;
}

const ideas = [
  { title: "Small groups. Bigger connections.", text: beliefs[0].text },
  { title: "Challenge, nature, growth.", text: beliefs[1].text },
  { title: "Thoughtfully curated.", text: beliefs[2].text },
  { title: "Certified adventure leaders.", text: beliefs[3].text },
];

const knowledge = [
  "Experienced local guides who know the destinations inside-out",
  "Handpicked adventures, treks and road journeys",
  "Hidden places and the local way of spending a day",
  "Small groups, and the connections that outlast the week",
];

const figures = [
  {
    n: "10+",
    label: "Years of adventure leadership",
    text: "A decade of high-altitude expeditions, with the safety, navigation, and mountain judgment that only comes from being out there. Trained trek leaders. Every journey is planned, then led.",
  },
  {
    n: "10+",
    label: "Handpicked places",
    text: "Each place is kept because someone from the desk has been there. We stay with landscapes that repay the days: a real route, a village worth the evening, a view that is not a checklist stop.",
  },
  {
    n: "4+",
    label: "Recognitions",
    text: "The expedition team holds recognitions such as Best Expedition Planner and Best Trainee, with certifications in basic and advanced mountaineering, and time on high-altitude summits.",
  },
  {
    n: "2,000+",
    label: "Travellers",
    text: "More than 2,000 people have travelled with Driftmates across these mountains. Many come back, or send someone else. The week is meant to feel like a journey, and a little like a group you already know.",
  },
];

export default function About() {
  const [open, setOpen] = useState(0);

  return (
    <>
      <Seo
        title="How we work | Driftmates Adventure"
        description="How Driftmates plans a journey: small groups, local guides, a desk in Haldwani, and routes that have already been walked."
        path="/about"
        image={photos.about}
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            organization,
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: { "@type": "Answer", text: faq.a },
              })),
            },
          ],
        }}
      />

      <header className="page-hero">
        <img src={photos.johar} alt="Munsiyari and the Johar Valley" />
        <div className="shade" />
        <div className="wrap">
          <div className="crumbs">How we work</div>
          <h1>Not the biggest company. The one you remember.</h1>
          <p>
            In a world that treats destinations like checklists, Driftmates slows the journey down
            until a place can actually be felt.
          </p>
        </div>
      </header>

      <section>
        <Reveal className="wrap story story-beside">
          <div className="story-photo">
            <img src={photos.about} alt="Driftmates gathered over a map on the trail" />
          </div>
          <div className="story-copy">
            <p className="kicker">About Driftmates</p>
            <h2>Built on Experience. Driven by Exploration.</h2>
            <p>Driftmates started with a simple thought: travel deserves more than a good itinerary.</p>
            <p>
              After spending years exploring the outdoors and leading travellers across different
              landscapes, our founder had seen both sides of adventure travel — the incredible
              experiences that bring people to new places, and the ground-level challenges that can
              make or break a trip.
            </p>
            <p>
              From high-altitude treks and remote Himalayan valleys to motorcycle expeditions,
              mountain road trips and journeys across Nepal and Bhutan, those years taught us what
              it actually takes to organise and lead an adventure.
            </p>
            <p>
              Our team brings together different backgrounds and experiences in travel, outdoor
              exploration and ground operations. Together, we understand that every kind of journey
              comes with its own demands, and that knowing a destination goes far beyond what is
              written in a brochure.
            </p>
            <p>
              We also saw what was often missing in the travel industry — proper preparation,
              realistic planning, experienced leadership and people who understand what happens on
              the ground.
            </p>
            <p>That is why we started Driftmates.</p>
            <h3>Our Approach to Travel</h3>
            <p>
              We don’t see travel as simply taking people from one place to another. We believe the
              real experience lies in discovering the places, meeting their people, understanding
              different cultures and exploring beyond the usual routes.
            </p>
            <p>
              A well-planned trip should leave room for discovery without leaving important things
              to chance. We pay attention to routes, local coordination, accommodation, group
              management and safety because these details matter just as much as the destination
              itself.
            </p>
            <p>
              We believe in honest communication, practical planning and responsible decisions,
              especially when things don’t go according to plan.
            </p>
            <h3>What Makes Driftmates Different</h3>
            <p>Our approach comes from actual experience, not just research or attractive itineraries.</p>
            <p><strong>First-hand knowledge:</strong> Experience across different regions, terrains and styles of travel.</p>
            <p><strong>Practical planning:</strong> Trips built around real conditions, realistic schedules and proper ground coordination.</p>
            <p><strong>Experienced leadership:</strong> People who understand outdoor challenges, group management and responsible decision-making.</p>
            <p><strong>Local connections:</strong> Working with people who know their regions, cultures and communities.</p>
            <p><strong>Honest communication:</strong> Clear expectations, transparent planning and no unnecessary promises.</p>
            <p>
              From trekking and backpacking to motorcycle expeditions, road trips, 4x4 adventures
              and wildlife exploration, we bring together different ways of discovering the world.
            </p>
            <p>
              Our experiences extend across India, Nepal, Bhutan and beyond. Each destination and
              style of travel brings something different, and we approach it with the knowledge and
              preparation it deserves.
            </p>
            <h3>Why We Do It</h3>
            <p>
              For us, the best part of this work is seeing people experience something they might
              have only imagined before — their first Himalayan trek, a long-awaited motorcycle
              expedition, a road through an unfamiliar country or a place that stays with them long
              after they return.
            </p>
            <p>
              Driftmates brings together years of individual experience, different perspectives and
              a shared interest in exploring the world responsibly.
            </p>
            <p>
              We are explorers ourselves. There are more roads to take, more places to discover and
              plenty more stories to be part of.
            </p>
            <p>And that is exactly how we want to keep it.</p>
            <p className="story-sign">Driftmates</p>
          </div>
        </Reveal>
      </section>

      <section className="band">
        <div className="wrap">
          <Reveal className="section-head">
            <p className="kicker">What we hold to</p>
            <h2>Four ideas. The rest follows.</h2>
          </Reveal>
          <div className="idea-grid">
            {ideas.map((idea, i) => (
              <Reveal as="article" className="idea" delay={i * 70} key={idea.title}>
                <span>0{i + 1}</span>
                <h3>{idea.title}</h3>
                <p>{idea.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="section-head">
            <p className="kicker">A week, in three moves</p>
            <h2>How a journey actually starts</h2>
          </Reveal>
          <div className="move-grid">
            {steps.map((step) => (
              <Reveal as="article" key={step.n}>
                <span>{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <Reveal className="center">
            <p className="lede know-line">
              The people on the ground are the journey. Guides, drivers, and the desk that picks up
              the phone.
            </p>
            <div className="face-row" aria-hidden="true">
              {[1, 4, 3, 5, 7, 6].map((n) => <Face key={n} n={n} label="" />)}
            </div>
          </Reveal>
          <div className="know-grid">
            <Reveal>
              <p className="kicker">The desk and the trail</p>
              <h2>Your journey. Our local knowledge.</h2>
              <p>
                Past the usual stop. Local guides and expedition leads who know the passes, the
                villages, and the hour that is worth protecting.
              </p>
              <ul className="gold-list">
                {knowledge.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </Reveal>
            <Reveal className="desk-chat" delay={80}>
              <div className="bubble-row">
                <span className="who">
                  <Face n={5} label="Divya" />
                  <b>Divya</b>
                  <small>Driftmates</small>
                </span>
                <p className="bubble us">
                  Hi Shubh, welcome to Driftmates. What are you hoping to experience in the Himalayas?
                </p>
              </div>
              <div className="bubble-row them-row">
                <p className="bubble them">
                  I’d really love to catch a proper sunset over the peaks, with some waterfalls and hiking mixed in.
                </p>
                <span className="who">
                  <Face n={2} label="Shubh" />
                  <b>Shubh</b>
                  <small>Traveller</small>
                </span>
              </div>
              <article className="chat-card">
                <div className="polaroids">
                  <img src="/sunset-thatch.jpg?v=1" alt="Sunset under a thatched roof" />
                  <img src={photos.munsiyari} alt="Munsiyari" />
                  <img src={photos.johar} alt="" />
                </div>
                <p className="kicker">Next batch</p>
                <h3>Munsiyari</h3>
                <p className="chat-meta">Uttarakhand · 7 days / 6 nights</p>
                <p>
                  A good match. Munsiyari for the nature, the air, and the Panchachuli sitting there
                  at the end of the valley.
                </p>
                <Link to="/journeys/munsiyari-johar">See the journey</Link>
              </article>
              <div className="bubble-row them-row">
                <p className="bubble them">Sounds good. Let’s go with Munsiyari.</p>
                <span className="who">
                  <Face n={2} label="Shubh" />
                  <b>Shubh</b>
                  <small>Traveller</small>
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap host-panel">
          <div className="host-grid">
            <Reveal className="host-quote">
              <p>“Straight to the <em>people who host you</em>”</p>
            </Reveal>
            <Reveal className="host-rail">
              <ol>
                <li>Jobs for local people</li>
                <li>More sustainable tourism</li>
                <li>Supporting independent businesses</li>
              </ol>
            </Reveal>
          </div>
          <Reveal className="host-honest">
            <div>
              <p className="kicker">How the money moves</p>
              <h2>A more honest way to travel</h2>
              <p>
                Trips run on relationships, not a chain of commissions. We work with the guides,
                drivers, and homestays who actually make the mountains what they are.
              </p>
              <Link className="btn" to="#contact">Talk to the desk</Link>
            </div>
            <ul className="gold-list">
              <li>What you pay reaches the guide, the homestay, and the driver.</li>
              <li>Villages decide how tourism sits in their own place.</li>
              <li>Small groups, so the impact on a valley stays light.</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="night">
        <img src={photos.leh} alt="" />
        <div className="night-shade" />
        <div className="wrap">
          <Reveal className="center">
            <h2>Find your next real adventure</h2>
            <p>Departures shaped by people who have already done the route.</p>
          </Reveal>
          <div className="figure-row">
            {figures.map((item) => (
              <div key={item.label}>
                <strong>{item.n}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <div className="figure-notes">
            {figures.map((item) => (
              <p key={item.label}>{item.text}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="guest-notes" id="reviews">
        <div className="wrap">
          <div className="section-head center">
            <p className="kicker">From the road</p>
            <h2>What travellers write back</h2>
          </div>
        </div>
        <GoogleReviews items={reviews} />
      </section>

      <section className="band" id="questions">
        <div className="wrap narrow">
          <div className="section-head center">
            <p className="kicker">Questions</p>
            <h2>Before you write</h2>
          </div>
          <div className="faq-rows">
            {faqs.map((faq, i) => (
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
    </>
  );
}
