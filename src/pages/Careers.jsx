import { useState } from "react";
import Seo from "../components/Seo";
import { photos } from "../data";
import { saveEnquiry } from "../saveEnquiry";

export default function Careers() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  return (
    <>
      <Seo
        title="Careers | Driftmates Adventure"
        description="Apply to Driftmates. Graphic Designer, listed for Noida and Delhi."
        path="/careers"
        image={photos.about}
      />
      <header className="page-hero">
        <img src={photos.about} alt="Driftmates gathered over a map" />
        <div className="shade" />
        <div className="wrap">
          <div className="crumbs">Careers</div>
          <h1>One open role. The rest is the road.</h1>
          <p>Driftmates is a small desk in Haldwani and the people who lead the journeys.</p>
        </div>
      </header>
      <section className="plan-desk">
        <div className="wrap careers-form">
          {sent ? (
            <div className="success">
              <h3 className="serif" style={{ marginTop: 0 }}>We’ve got this.</h3>
              <p>The desk in Haldwani has your note and will write back.</p>
            </div>
          ) : (
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const name = String(data.get("name") || "").trim();
                const phoneValue = String(data.get("phone") || "").trim();
                const emailValue = String(data.get("email") || "").trim();
                const role = String(data.get("role") || "").trim();
                const experience = String(data.get("experience") || "").trim();
                if (experience && !/^\d+$/.test(experience)) return;
                if (phoneValue && !/^\d+$/.test(phoneValue)) return;
                const location = String(data.get("location") || "").trim();
                const linkedin = String(data.get("linkedin") || "").trim();
                const about = String(data.get("about") || "").trim();
                if (!name || !phoneValue || !emailValue || !role || sending) return;
                setSending(true);
                saveEnquiry({
                  kind: "career",
                  name,
                  phone: phoneValue,
                  email: emailValue,
                  role,
                  experience,
                  place: location,
                  portfolio: linkedin,
                  note: about,
                  journey: `Career · ${role}`,
                  group: experience,
                  when: location,
                }).finally(() => {
                  setSending(false);
                  setSent(true);
                });
              }}
            >
              <div className="form-grid">
                <label>
                  <span>Name <span className="req">*</span></span>
                  <input name="name" required autoComplete="name" placeholder="Your name" />
                </label>
                <label>
                  <span>Email <span className="req">*</span></span>
                  <input type="email" name="email" required autoComplete="email" placeholder="you@email.com" />
                </label>
              </div>
              <label>
                <span>Phone <span className="req">*</span></span>
                <input
                  name="phone"
                  type="text"
                  inputMode="numeric"
                  required
                  autoComplete="tel"
                  pattern="[0-9]*"
                  placeholder="9876543210"
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
                  }}
                />
              </label>
              <div className="form-grid">
                <label>
                  <span>Role <span className="req">*</span></span>
                  <input name="role" required placeholder="Graphic designer, guide" />
                </label>
                <label>
                  Experience
                  <input
                    name="experience"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="2"
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
                    }}
                  />
                </label>
              </div>
              <label>
                Location
                <input name="location" placeholder="City" />
              </label>
              <label>
                LinkedIn
                <input name="linkedin" placeholder="https://linkedin.com/in/" />
              </label>
              <label>
                About you
                <textarea name="about" placeholder="A little about the work you do." />
              </label>
              <button className="btn" type="submit" disabled={sending}>
                {sending ? "Sending…" : "Send to Driftmates"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
