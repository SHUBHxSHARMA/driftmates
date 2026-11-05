import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { routeFor } from "../routeStops";

function RouteMap({ stops }) {
  const node = useRef(null);

  useEffect(() => {
    const el = node.current;
    if (!el || stops.length < 2) return undefined;
    const map = L.map(el, {
      scrollWheelZoom: false,
      zoomControl: true,
    });
    const tiles = {
      attribution: "Tiles &copy; Esri &mdash; Esri, HERE, Garmin, &copy; OpenStreetMap",
      maxZoom: 16,
    };
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      tiles
    ).addTo(map);
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}",
      { ...tiles, attribution: "" }
    ).addTo(map);

    const latlngs = stops.map((stop) => [stop.lat, stop.lng]);
    const line = L.polyline(latlngs, {
      color: "#241e18",
      weight: 2,
      opacity: 0.85,
      dashArray: "2 7",
    }).addTo(map);

    const markers = [];
    const seen = new Set();
    stops.forEach((stop) => {
      if (seen.has(stop.name)) return;
      seen.add(stop.name);
      const icon = L.divIcon({
        className: "route-pin-wrap",
        html: `<span class="route-pin">${stop.name}</span>`,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });
      markers.push(L.marker([stop.lat, stop.lng], { icon, keyboard: false }).addTo(map));
    });

    map.fitBounds(line.getBounds(), { padding: [48, 48], maxZoom: 9 });

    const nudge = () => {
      const placed = [];
      markers.forEach((marker) => {
        const pin = marker.getElement()?.querySelector(".route-pin");
        if (!pin) return;
        const point = map.latLngToContainerPoint(marker.getLatLng());
        const w = Math.max(pin.offsetWidth, Math.ceil(pin.textContent.length * 7.4) + 20);
        const h = Math.max(pin.offsetHeight, 28);
        const shifts = [
          [0, -18],
          [0, 22],
          [0, -42],
          [0, 44],
          [30, -18],
          [-30, 22],
          [36, 6],
          [-36, -6],
        ];
        let shift = shifts[0];
        for (const next of shifts) {
          const box = {
            l: point.x - w / 2 + next[0] - 6,
            t: point.y - h / 2 + next[1] - 6,
            r: point.x + w / 2 + next[0] + 6,
            b: point.y + h / 2 + next[1] + 6,
          };
          const hit = placed.some((item) => !(box.r < item.l || box.l > item.r || box.b < item.t || box.t > item.b));
          if (!hit) {
            shift = next;
            break;
          }
        }
        pin.style.setProperty("--nudge-x", `${shift[0]}px`);
        pin.style.setProperty("--nudge-y", `${shift[1]}px`);
        placed.push({
          l: point.x - w / 2 + shift[0] - 6,
          t: point.y - h / 2 + shift[1] - 6,
          r: point.x + w / 2 + shift[0] + 6,
          b: point.y + h / 2 + shift[1] + 6,
        });
      });
    };

    map.on("zoomend moveend", nudge);
    const frame = requestAnimationFrame(() => {
      map.invalidateSize();
      nudge();
    });
    const later = window.setTimeout(nudge, 400);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(later);
      map.off("zoomend moveend", nudge);
      map.remove();
    };
  }, [stops]);

  return <div className="route-map" ref={node} />;
}

export function RouteBox({ title, lede, chain, days, lines, stops }) {
  if (!stops || stops.length < 2) return null;
  return (
    <section className="route-brief">
      <div className="wrap route-brief-grid">
        <RouteMap stops={stops} />
        <div className="route-panel">
          <h2>{title}</h2>
          {lede && <p>{lede}</p>}
          {chain && (
            <p className="route-chain">
              <b>Route: </b>
              {chain}
            </p>
          )}
          {days?.length > 0 && (
            <div className="route-days">
              {days.map((day) => (
                <p key={`${day.n}-${day.t}`}>
                  <b>{day.n}: </b>
                  {day.t}
                </p>
              ))}
            </div>
          )}
          {lines?.length > 0 && (
            <div className="route-days">
              {lines.map((line) => <p key={line}>{line}</p>)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function RouteOverview({ journey }) {
  const stops = useMemo(() => routeFor(journey.slug), [journey.slug]);
  if (stops.length < 2) return null;

  return (
    <RouteBox
      title={`${journey.destination} route`}
      days={journey.days}
      stops={stops}
    />
  );
}
