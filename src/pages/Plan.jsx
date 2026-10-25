import EnquiryForm from "../components/EnquiryForm";
import Reveal from "../components/Reveal";
import { address, email, phone, phoneHref, photos, steps, whatsapp } from "../data";

export default function Plan() {
  return (
    <>
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
      <section>
        <div className="wrap split">
          <div>
            <EnquiryForm />
          </div>
          <aside>
            <div className="step-list">
              {steps.map((s, i) => (
                <Reveal as="article" className="step" delay={i * 70} key={s.n}>
                  <div className="num">{s.n}</div>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="info-card" style={{ marginTop: 18 }}>
              <h3>Or reach us directly</h3>
              <p><a href={phoneHref}>{phone}</a></p>
              <p><a href={`mailto:${email}`}>{email}</a></p>
              <p><a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp the desk</a></p>
              <p>{address}</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
