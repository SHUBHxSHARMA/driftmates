import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { destinations, journeys } from "../data";
import { saveEnquiry } from "../saveEnquiry";

const NAME_MAX = 40;
const SENTENCE_MAX = 120;
const GROUP_MAX = 3;

function lettersOnly(value) {
  return value.replace(/[^\p{L}\s.'’-]/gu, "").slice(0, NAME_MAX);
}

function digitsOnly(value, max) {
  return value.replace(/\D/g, "").slice(0, max);
}

function phoneDigits(value) {
  let digits = value.replace(/\D/g, "");
  if (digits.length > 10 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length > 10 && digits.startsWith("0")) digits = digits.slice(1);
  return digits.slice(0, 10);
}

function sentence(value) {
  return value.slice(0, SENTENCE_MAX);
}

export default function EnquiryForm({ compact = false, journey = "" }) {
  const [params] = useSearchParams();
  const preset = journey || params.get("journey") || "";
  const presetWhen = sentence(params.get("when") || "");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [group, setGroup] = useState("");
  const [when, setWhen] = useState(presetWhen);
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const options = useMemo(
    () => [
      ...journeys.map((j) => ({ value: j.slug, label: j.title })),
      ...destinations.map((d) => ({ value: d.slug, label: `${d.name} — shape a private trip` })),
    ],
    []
  );

  function clearError(field) {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  if (sent) {
    return (
      <div className="success">
        <h3 className="serif" style={{ marginTop: 0 }}>We’ve got this.</h3>
        <p>
          The desk in Haldwani has your note and will write back.
        </p>
      </div>
    );
  }

  return (
    <form
      className="form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (sending) return;
        const cleanName = name.trim();
        const cleanEmail = email.trim();
        const next = {};
        if (!cleanName) next.name = "Enter a name using letters only.";
        if (phone.length !== 10) next.phone = "Enter a 10-digit phone number.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
          next.email = "Enter an email that includes @.";
        }
        setErrors(next);
        if (Object.keys(next).length) return;
        const chosen = options.find((o) => o.value === new FormData(e.currentTarget).get("journey"));
        setSending(true);
        saveEnquiry({
          name: cleanName,
          phone,
          email: cleanEmail,
          journey: chosen?.label || "Not sure yet",
          group,
          when: when.trim(),
          note: note.trim(),
        }).finally(() => {
          setSending(false);
          setSent(true);
        });
      }}
    >
      <div className="form-grid">
        <label>
          <span>Name <span className="req">*</span></span>
          <input
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            maxLength={NAME_MAX}
            value={name}
            aria-invalid={errors.name ? "true" : undefined}
            onChange={(e) => {
              setName(lettersOnly(e.target.value));
              clearError("name");
            }}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </label>
        <label>
          <span>Phone <span className="req">*</span></span>
          <input
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            required
            placeholder="10-digit number"
            maxLength={10}
            value={phone}
            aria-invalid={errors.phone ? "true" : undefined}
            onChange={(e) => {
              setPhone(phoneDigits(e.target.value));
              clearError("phone");
            }}
          />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </label>
      </div>
      <label>
        <span>Email <span className="req">*</span></span>
        <input
          type="email"
          name="email"
          inputMode="email"
          required
          autoComplete="email"
          placeholder="you@email.com"
          maxLength={80}
          value={email}
          aria-invalid={errors.email ? "true" : undefined}
          onChange={(e) => {
            setEmail(e.target.value.replace(/\s/g, "").slice(0, 80));
            clearError("email");
          }}
        />
        {errors.email && <span className="field-error">{errors.email}</span>}
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
          <input
            name="group"
            inputMode="numeric"
            placeholder="2"
            maxLength={GROUP_MAX}
            value={group}
            onChange={(e) => setGroup(digitsOnly(e.target.value, GROUP_MAX))}
          />
        </label>
      </div>
      {!compact && (
        <label>
          When are you thinking?
          <input
            name="when"
            maxLength={SENTENCE_MAX}
            value={when}
            placeholder="June, or a flexible window"
            onChange={(e) => setWhen(sentence(e.target.value))}
          />
        </label>
      )}
      <label>
        What kind of trip
        <textarea
          name="note"
          maxLength={SENTENCE_MAX}
          value={note}
          placeholder="Riding, trekking, a family pace, a first Himalayan trip…"
          onChange={(e) => setNote(sentence(e.target.value))}
        />
      </label>
      <button className="btn" type="submit" disabled={sending}>
        {sending ? "Sending…" : "Send to Driftmates"}
      </button>
    </form>
  );
}
