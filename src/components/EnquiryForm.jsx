import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { destinations, journeys } from "../data";

export default function EnquiryForm({ compact = false, journey = "" }) {
  const [params] = useSearchParams();
  const preset = journey || params.get("journey") || "";
  const [sent, setSent] = useState(false);
  const options = useMemo(
    () => [
      ...journeys.map((j) => ({ value: j.slug, label: j.title })),
      ...destinations.map((d) => ({ value: d.slug, label: `${d.name} — shape a private trip` })),
    ],
    []
  );

  if (sent) {
    return (
      <div className="success">
        <h3 className="serif" style={{ marginTop: 0 }}>We’ve got this.</h3>
        <p>
          This is a design preview, so the note stays on your screen. On the live site it will land
          with the Driftmates desk in Haldwani — usually answered within the day.
        </p>
      </div>
    );
  }

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="form-grid">
        <label>
          Name
          <input name="name" required placeholder="Your name" />
        </label>
        <label>
          Phone
          <input name="phone" required placeholder="+91" />
        </label>
      </div>
      <label>
        Email
        <input type="email" name="email" required placeholder="you@email.com" />
      </label>
      <div className="form-grid">
        <label>
          Journey
          <select name="journey" defaultValue={preset}>
            <option value="">Not sure yet</option>
            {options.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </label>
        <label>
          Group size
          <input name="group" placeholder="2" />
        </label>
      </div>
      {!compact && (
        <label>
          When are you thinking?
          <input name="when" placeholder="June, or a flexible window" />
        </label>
      )}
      <label>
        What kind of trip
        <textarea name="note" placeholder="Riding, trekking, a family pace, a first Himalayan trip…" />
      </label>
      <button className="btn" type="submit">Send to Driftmates</button>
    </form>
  );
}
