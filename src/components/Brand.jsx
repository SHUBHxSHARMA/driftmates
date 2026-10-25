export default function Brand({ light = false }) {
  return (
    <span className={`brand${light ? " brand-light" : ""}`}>Driftmates</span>
  );
}
