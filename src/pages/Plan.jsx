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
          <h1>Tell us a little about you.</h1>
          <p>We reply within a day. A real person, not a bot.</p>
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
