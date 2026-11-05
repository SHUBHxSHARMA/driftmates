import EnquiryForm from "../components/EnquiryForm";
import Seo from "../components/Seo";
import { photos } from "../data";

export default function Plan() {
  return (
    <>
      <Seo
        title="Plan a Himalayan trip | Driftmates, Haldwani"
        description="Tell Driftmates who is coming. Ladakh, Spiti, Kumaon, Manali, Bhutan, or Annapurna. The desk in Haldwani answers on WhatsApp."
        path="/plan"
        image={photos.route}
      />
      <header className="page-hero">
        <img
          src={photos.route}
          alt="A Driftmates route through the mountains"
        />
        <div className="shade" />
        <div className="wrap">
          <div className="crumbs">Plan</div>
          <h1>Tell us who’s coming.</h1>
          <p>
            A departure from the list, or a private week with your own pace. The desk in Haldwani
            answers with a route, not a brochure.
          </p>
        </div>
      </header>
      <section className="plan-desk">
        <div className="wrap plan-desk-grid">
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
