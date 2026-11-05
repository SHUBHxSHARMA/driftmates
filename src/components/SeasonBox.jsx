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
      <img className="season-photo" src={journey.image} alt={journey.title} />
      <div className="season-body">
        {named && <p className="kicker">{active.label}</p>}
        {active.when && <p className="season-when">{active.when}</p>}
        {active.note && <p>{active.note}</p>}
        <ul className="facts">
          {(active.details || []).map(([label, value]) => (
            <li key={label}>
              <b>{label}</b>
              {value}
            </li>
          ))}
          <li>
            <b>Duration</b>
            {stayLabel(journey.nights)}
          </li>
          <li>
            <b>Pickup</b>
            {journey.pickup}
          </li>
          {journey.group && (
            <li>
              <b>Group</b>
              {journey.group}
            </li>
          )}
          <li>
            <b>Style</b>
            {journey.kind}
          </li>
        </ul>
        {active.open ? (
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
        <Link className="btn block" to={`/plan?${query}`}>
          {active.open ? "Plan this journey" : "Ask the desk"}
        </Link>
      </div>
    </aside>
  );
}
