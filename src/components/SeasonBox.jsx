import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { inr, stayLabel } from "../data";
import { seasonsFor } from "../journeySeasons";

export default function SeasonBox({ journey }) {
  const seasons = useMemo(
    () =>
      seasonsFor(journey.slug) || [
        {
          id: "departure",
          label: "This departure",
          when: journey.season || "",
          note: "",
          open: true,
        },
      ],
    [journey]
  );
  const firstId = seasons.find((season) => season.open)?.id || seasons[0].id;
  const [id, setId] = useState(firstId);

  useEffect(() => {
    setId(firstId);
  }, [firstId, journey.slug]);

  const active = seasons.find((season) => season.id === id) || seasons[0];
  const query = new URLSearchParams({ journey: journey.slug });
  if (active.when) query.set("when", active.when);
  const named = seasons.length > 1 || active.id !== "departure";
  const frames = [journey.image, ...(journey.gallery || [])].filter(Boolean);
  const seasonIndex = Math.max(0, seasons.findIndex((season) => season.id === active.id));
  const photo = frames[seasonIndex % Math.max(frames.length, 1)];
  const lines = (active.note || "").split("\n").filter((line) => line.trim());
  const titled = lines.length > 1 && !/^(The Experience|What to Expect)\b/.test(lines[0]);
  const title = titled ? lines[0] : "";
  const body = titled ? lines.slice(1) : lines;

  return (
    <aside className="season-card">
      {seasons.length > 1 && (
        <div className="season-tabs" role="tablist" aria-label="Season">
          {seasons.map((season) => (
            <button
              key={season.id}
              type="button"
              role="tab"
              aria-selected={season.id === active.id}
              className={season.id === active.id ? "is-on" : ""}
              onClick={() => setId(season.id)}
            >
              {season.label}
            </button>
          ))}
        </div>
      )}
      <div className="season-panel">
      {photo && <img key={photo} className="season-photo" src={photo} alt={journey.title} />}
      <div className="season-body">
        <div className="season-head">
          {named && <p className="kicker">{active.label}</p>}
          {active.when && <p className="season-when">{active.when}</p>}
        </div>
        {title && <p className="season-title">{title}</p>}
        {body.length > 0 && (
          <div className="season-note">
            {body.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        )}
        <ul className="facts">
          {(active.details || []).map(([label, value]) => (
            <li key={label}>
              <b>{label}</b>
              <span>{value}</span>
            </li>
          ))}
          {journey.nights && (
            <li>
              <b>Duration</b>
              <span>{stayLabel(journey.nights)}</span>
            </li>
          )}
          {journey.group && (
            <li>
              <b>Group</b>
              <span>{journey.group}</span>
            </li>
          )}
          <li>
            <b>Style</b>
            <span>{journey.kind}</span>
          </li>
        </ul>
        {active.open && Number.isFinite(journey.price) ? (
          <div className="season-fare">
            <p className="kicker">From</p>
            <p className="price">{inr(journey.price)}</p>
            {journey.was > journey.price && (
              <p className="sub">
                <s>{inr(journey.was)}</s> per person
              </p>
            )}
          </div>
        ) : (
          <p className="season-closed">No printed fare for this window.</p>
        )}
        <Link className="btn block season-book" to={`/plan?${query}`}>
          {active.open && Number.isFinite(journey.price) ? "Plan this journey" : "Ask the desk"}
        </Link>
      </div>
      </div>
    </aside>
  );
}
