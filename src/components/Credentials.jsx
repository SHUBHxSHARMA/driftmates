function TripAdvisorMark() {
  return (
    <svg viewBox="0 0 72 72" aria-hidden="true">
      <circle cx="36" cy="36" r="36" fill="#00AA6C" />
      <path fill="#fff" d="M36 16c-1.4 2.2-2.2 3.6-2.6 5.2 2.4-.4 4.8.2 6.6 1.6-1.2-2.6-2.4-4.4-4-6.8zM22 22c1.6 2.4 2.2 4.2 2.2 6.4-2.8-.2-5.2.6-7.2 2.2 1.4-3.4 2.8-5.8 5-8.6z" />
      <ellipse cx="36" cy="42" rx="18" ry="16" fill="#fff" />
      <circle cx="28.5" cy="40" r="7.2" fill="#00AA6C" />
      <circle cx="43.5" cy="40" r="7.2" fill="#00AA6C" />
      <circle cx="28.5" cy="40" r="3.1" fill="#241e18" />
      <circle cx="43.5" cy="40" r="3.1" fill="#241e18" />
      <path fill="#00AA6C" d="M33.2 46.5h5.6L36 51.2z" />
    </svg>
  );
}

function UdyamMark() {
  return (
    <svg viewBox="0 0 72 72" aria-hidden="true">
      <rect x="1" y="1" width="70" height="70" rx="10" fill="#fffcf8" stroke="#0a3d62" strokeWidth="2" />
      <rect x="12" y="14" width="48" height="3.2" fill="#FF9933" />
      <rect x="12" y="17.2" width="48" height="3.2" fill="#f4f1ea" />
      <rect x="12" y="20.4" width="48" height="3.2" fill="#138808" />
      <text x="36" y="44" textAnchor="middle" fill="#0a3d62" fontFamily="Mulish, sans-serif" fontSize="13" fontWeight="800" letterSpacing="0.5">
        UDYAM
      </text>
      <text x="36" y="56" textAnchor="middle" fill="#0a3d62" fontFamily="Mulish, sans-serif" fontSize="6.5" fontWeight="700" letterSpacing="1.1">
        REGISTRATION
      </text>
    </svg>
  );
}

function TourismMark() {
  return (
    <svg viewBox="0 0 72 72" aria-hidden="true">
      <circle cx="36" cy="36" r="34" fill="none" stroke="#1a4731" strokeWidth="2" />
      <circle cx="36" cy="36" r="28" fill="none" stroke="#1a4731" strokeWidth="1" />
      <path fill="#1a4731" d="M14 46h44v3H14z" />
      <path fill="#1a4731" d="M18 46 30 28l8 12 6-8 12 14H18z" />
      <circle cx="48" cy="26" r="3" fill="#9a7340" />
    </svg>
  );
}

function InstitutesMark() {
  return (
    <svg viewBox="0 0 72 72" aria-hidden="true">
      <rect x="1" y="1" width="70" height="70" rx="36" fill="#1a4731" />
      <path fill="#fffcf8" d="M36 16 52 48H20z" />
      <path fill="#1a4731" d="M36 28 44 48H28z" />
      <path stroke="#9a7340" strokeWidth="2" strokeLinecap="round" d="M24 52h24" />
    </svg>
  );
}

const marks = [
  { name: "TripAdvisor", note: "Certified", logo: <TripAdvisorMark /> },
  { name: "Udyam", note: "Registered", logo: <UdyamMark /> },
  { name: "Tourism department", note: "Certified", logo: <TourismMark /> },
  { name: "Mountaineering institutes", note: "NIM · HMI · ABVIMAS", logo: <InstitutesMark /> },
];

export default function Credentials() {
  return (
    <section className="marks" id="credentials">
      <div className="wrap">
        <div className="section-head center">
          <p className="kicker">Credentials</p>
          <h2>The certificates we carry.</h2>
          <p>TripAdvisor, Udyam, the tourism department, and the mountaineering institutes.</p>
        </div>
        <ul className="mark-row">
          {marks.map((mark) => (
            <li key={mark.name}>
              <span className="mark-logo">{mark.logo}</span>
              <strong>{mark.name}</strong>
              <span>{mark.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
