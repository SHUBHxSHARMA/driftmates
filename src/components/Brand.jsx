export default function Brand({ light = false }) {
  return (
    <span className="brand">
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="14" fill={light ? "#f6f3ee" : "#1a4731"} />
        <path d="M8 46 L22 24 L31 36 L40 18 L56 46 Z" fill={light ? "#1a4731" : "#f4efe6"} />
        <circle cx="46" cy="18" r="3" fill="#c6a15b" />
      </svg>
      <span>
        <strong>DRIFTMATES</strong>
        <em>Explore beyond ordinary</em>
      </span>
    </span>
  );
}
