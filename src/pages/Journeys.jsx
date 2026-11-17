import Seo from "../components/Seo";
import TripCard from "../components/TripCard";
import { journeys, photos } from "../data";
import { absolute, organization } from "../seo";

export default function Journeys() {
  return (
    <>
      <Seo
        title="Himalayan trips | Ladakh, Spiti, Kumaon, Bhutan, Annapurna | Driftmates"
        description="Driftmates departures. Ladakh, Winter Spiti, Munsyari, Darma Valley, Adi Kailash by bike, Adi Kailash & Om Parvat, Bhutan, and Annapurna Base Camp."
        path="/journeys"
        image={photos.og}
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            organization,
            {
              "@type": "ItemList",
              name: "Driftmates journeys",
              itemListElement: journeys.map((j, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: j.title,
                url: absolute(`/journeys/${j.slug}`),
              })),
            },
          ],
        }}
      />
      <header className="page-hero">
        <img
          src={photos.og}
          alt="Driftmates on the road"
        />
        <div className="shade" />
        <div className="wrap">
          <div className="crumbs">Journeys</div>
          <h1>The departures</h1>
          <p>
            The routes Driftmates runs, with the published price and the day-by-day plan from the trip itself.
          </p>
        </div>
      </header>
      <section>
        <div className="wrap trip-grid">
          {journeys.map((j) => <TripCard key={j.slug} journey={j} />)}
        </div>
      </section>
    </>
  );
}
