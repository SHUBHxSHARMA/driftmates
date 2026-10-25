import EnquiryForm from "../components/EnquiryForm";
import { address, email, phone, phoneHref, steps, whatsapp } from "../data";

export default function Plan() {
  return (
    <>
      <header className="page-hero">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=80"
          alt="An open road toward distant mountains"
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
              {steps.map((s) => (
                <article className="step" key={s.n}>
                  <div className="num">{s.n}</div>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </article>
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
