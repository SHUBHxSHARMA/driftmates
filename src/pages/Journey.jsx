import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EnquiryForm from "../components/EnquiryForm";
import RouteTraveller from "../components/RouteTraveller";
import RouteOverview from "../components/RouteOverview";
import SeasonBox from "../components/SeasonBox";
import Seo from "../components/Seo";
import TripCard from "../components/TripCard";
import { getJourney, journeys } from "../data";
import { routeFor } from "../routeStops";
import { breadcrumb, journeyDescription, organization } from "../seo";

function Lines({ text }) {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  return (
    <div className="day-copy">
      {lines.map((line, i) => (
        <p key={i}>{line.replace(/^[-–]\s*/, "")}</p>
      ))}
    </div>
  );
}

function cleanLine(raw) {
  return raw.trim().replace(/^[*#]\s*/, "").replace(/^[-–]\s*/, "").trim();
}

function bareTitle(text) {
  return text.length > 0 && text.length <= 46 && !text.includes(":") && !text.endsWith(".");
}

function labelSplit(text) {
  const cut = text.indexOf(":");
  if (cut < 2 || cut > 72) return null;
  return {
    label: text.slice(0, cut).trim(),
    value: text.slice(cut + 1).trim().replace(/^[-–]\s*/, ""),
  };
}

function policyBlocks(items) {
  const lines = items.map(cleanLine).filter(Boolean);
  const isPair = (text) => Boolean(labelSplit(text)?.value);
  const isLabel = (text) => Boolean(text) && text.endsWith(":") && text.length <= 72;
  const isWindowTitle = (index) => {
    const text = lines[index];
    if (!bareTitle(text) || text.includes("(")) return false;
    if (/^\d/.test(text) && !/before|days/i.test(text)) return false;
    const next = lines[index + 1] || "";
    if (isPair(next)) return true;
    const words = text.split(/\s+/).length;
    if (words > 4) return false;
    const after = lines[index + 2] || "";
    if (bareTitle(next) && isPair(after)) return true;
    return words <= 3 && isLabel(next);
  };

  const blocks = [];
  let bullets = [];
  let windowGroup = null;
  let notes = null;
  const flushBullets = () => {
    if (!bullets.length) return;
    blocks.push({ type: "bullets", items: bullets });
    bullets = [];
  };
  const flushWindow = () => {
    if (!windowGroup) return;
    if (windowGroup.rows.length) blocks.push(windowGroup);
    else blocks.push({ type: "title", label: windowGroup.label });
    windowGroup = null;
  };
  const flushNotes = () => {
    if (!notes) return;
    blocks.push(notes);
    notes = null;
  };

  lines.forEach((text, index) => {
    if (isLabel(text)) {
      flushBullets();
      flushWindow();
      flushNotes();
      notes = { type: "notes", label: text.slice(0, -1).trim(), items: [], open: true };
      return;
    }
    const pair = labelSplit(text);
    if (pair?.value) {
      flushBullets();
      if (notes && !notes.items.length) {
        windowGroup = { type: "window", label: notes.label, rows: [pair] };
        notes = null;
        return;
      }
      flushNotes();
      if (windowGroup) windowGroup.rows.push(pair);
      else blocks.push({ type: "row", ...pair });
      return;
    }
    if (isWindowTitle(index)) {
      flushBullets();
      flushNotes();
      flushWindow();
      windowGroup = { type: "window", label: text, rows: [] };
      return;
    }
    if (windowGroup && !windowGroup.rows.length) {
      notes = { type: "notes", label: windowGroup.label, items: [text] };
      windowGroup = null;
      return;
    }
    if (windowGroup && !text.endsWith(".") && text.length <= 90) {
      windowGroup.rows.push({ label: "", value: text });
      return;
    }
    flushWindow();
    const words = text.split(/\s+/).length;
    const next = lines[index + 1] || "";
    const sectionTitle = bareTitle(text) && words <= 6 && (next.endsWith(".") || next.length > 80);
    if (notes?.open && sectionTitle) {
      flushNotes();
      notes = { type: "notes", label: text, items: [], open: true };
      return;
    }
    const continues = !text.endsWith(".") && text.length <= 90;
    if (notes && (notes.open || continues)) {
      notes.items.push(text);
      return;
    }
    if (notes) flushNotes();
    if (sectionTitle) {
      flushBullets();
      notes = { type: "notes", label: text, items: [], open: true };
      return;
    }
    const last = blocks[blocks.length - 1];
    if (last?.type === "row" && continues) {
      blocks.pop();
      notes = { type: "notes", label: last.label, items: [last.value, text].filter(Boolean) };
      return;
    }
    bullets.push(text);
  });
  flushBullets();
  flushWindow();
  flushNotes();
  return blocks;
}

function PolicyList({ items }) {
  const blocks = policyBlocks(items);
  const nodes = [];
  let windows = [];
  const flushWindows = () => {
    if (!windows.length) return;
    nodes.push(
      <div className="policy-windows inclusion-block is-wide" key={`windows-${nodes.length}`}>
        {windows.map((group) => (
          <div className="policy-window" key={group.label}>
            <h3>{group.label}</h3>
            {group.rows.map((row, i) => (
              <p key={`${row.label}-${i}`}>
                {row.label ? <b>{row.label}</b> : null}
                <span>{row.value}</span>
              </p>
            ))}
          </div>
        ))}
      </div>
    );
    windows = [];
  };

  blocks.forEach((block, index) => {
    if (block.type === "window") {
      const card = /before departure/i.test(block.label);
      if (card) {
        windows.push(block);
        return;
      }
      flushWindows();
      const longRows = block.rows.length > 4 || block.rows.some((row) => row.value.length > 80);
      nodes.push(
        <div className={longRows ? "inclusion-block is-wide" : "inclusion-block"} key={`window-${index}`}>
          <h3>{block.label}</h3>
          {block.rows.map((row, i) => (
            <p className="policy-row" key={`${row.label}-${i}`}>
              {row.label ? <b>{row.label}</b> : null}
              <span>{row.value}</span>
            </p>
          ))}
        </div>
      );
      return;
    }
    flushWindows();
    if (block.type === "title") {
      nodes.push(<h3 className="inclusion-block" key={`title-${index}`}>{block.label}</h3>);
      return;
    }
    if (block.type === "row") {
      nodes.push(
        <p className={block.value.length > 90 ? "policy-row inclusion-block is-wide" : "policy-row inclusion-block"} key={`row-${index}`}>
          <b>{block.label}</b>
          <span>{block.value}</span>
        </p>
      );
      return;
    }
    const list = block.items || [];
    const columns = list.length > 4;
    nodes.push(
      <div className={columns ? "inclusion-block is-wide" : "inclusion-block"} key={`list-${index}`}>
        {block.label && <h3>{block.label}</h3>}
        {list.length > 0 && (
          <ul className={columns ? "check check-cols" : "check"}>
            {list.map((item, i) => <li key={`${item}-${i}`}>{item}</li>)}
          </ul>
        )}
      </div>
    );
  });
  flushWindows();
  return nodes;
}

function policyRows(journey) {
  const rows = [];
  const facts = [];
  if (journey.included?.length) facts.push({ title: "Included", items: journey.included });
  if (journey.notIncluded?.length) facts.push({ title: "Not included", items: journey.notIncluded });
  if (facts.length) rows.push(facts);

  const payment = journey.payment?.length ? { title: "Payment", items: journey.payment } : null;
  const cancellation = journey.cancellation?.length ? { title: "Cancellation", items: journey.cancellation } : null;
  if (payment && cancellation && journey.cancellation.length <= 8) rows.push([payment, cancellation]);
  else {
    if (payment) rows.push([payment]);
    if (cancellation) rows.push([cancellation]);
  }
  if (journey.terms?.length) rows.push([{ title: "Terms", items: journey.terms }]);
  return rows;
}

function PolicyBoard({ rows }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const fit = () => {
      root.querySelectorAll(".policy-boxes").forEach((row) => {
        const scrolls = [...row.querySelectorAll(".policy-scroll")];
        if (!scrolls.length) return;
        scrolls.forEach((el) => { el.style.height = "auto"; });
        const stacked = getComputedStyle(row).gridTemplateColumns.split(" ").length < 2;
        if (stacked) {
          scrolls.forEach((el) => { el.style.height = `${Math.min(340, el.scrollHeight)}px`; });
          return;
        }
        const height = Math.min(340, Math.max(...scrolls.map((el) => el.scrollHeight)));
        scrolls.forEach((el) => { el.style.height = `${height}px`; });
      });
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [rows]);

  if (!rows.length) return null;

  return (
    <div ref={ref}>
      {rows.map((row) => (
        <div className={`policy-boxes${row.length === 1 ? " is-single" : ""}`} key={row.map((box) => box.title).join("-")}>
          {row.map((box) => (
            <article className="policy-box" key={box.title}>
              <h2>{box.title}</h2>
              <div className="policy-scroll">
                <PolicyList items={box.items} />
              </div>
            </article>
          ))}
        </div>
      ))}
    </div>
  );
}

function stopName(title) {
  const clean = title.replace(/\(.*?\)/g, "").replace(/\|/g, " – ").trim();
  const parts = clean.split(/\s+(?:to|→)\s+/i);
  return (parts.at(-1) || clean).trim();
}

function RouteTrack({ days }) {
  const [progress, setProgress] = useState(0);
  const [compact, setCompact] = useState(false);
  const trackRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const measure = () => {
      const track = trackRef.current;
      if (track) {
        const stickyTop = parseFloat(getComputedStyle(track).top) || 0;
        const stuck = track.getBoundingClientRect().top <= stickyTop + 2;
        setCompact(stuck);
      }
      if (reduce) return;
      const nodes = [...document.querySelectorAll("[data-day]")];
      if (!nodes.length) return;
      const start = nodes[0].getBoundingClientRect().top + window.scrollY;
      const end = nodes.at(-1).getBoundingClientRect().bottom + window.scrollY;
      const y = window.scrollY + window.innerHeight * 0.42;
      const next = Math.min(1, Math.max(0, (y - start) / Math.max(1, end - start)));
      setProgress(next);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [days]);

  const active = Math.min(days.length - 1, Math.floor(progress * days.length));

  return (
    <div ref={trackRef} className={`route-track${compact ? " is-compact" : ""}`} aria-hidden="true">
      <div className="route-line">
        <span className="route-line-fill" style={{ width: `${progress * 100}%` }} />
        <span className="route-vehicle" style={{ left: `${progress * 100}%` }}>
          <RouteTraveller />
        </span>
      </div>
      <div className="route-stops">
        {days.map((day, i) => (
          <span key={`${day.n}-${day.t}`} className={i === active ? "is-active" : ""}>
            {stopName(day.t)}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Journey() {
  const { slug } = useParams();
  const journey = getJourney(slug);
  const [open, setOpen] = useState(-1);
  const description = journey ? journeyDescription(journey) : "";
  const jsonLd = useMemo(() => {
    if (!journey) return null;
    const path = `/journeys/${journey.slug}`;
    const graph = [
      organization,
      breadcrumb([
        { name: "Home", path: "/" },
        { name: journey.destination, path: `/destinations/${journey.place}` },
        { name: journey.title, path },
      ]),
      {
        "@type": "TouristTrip",
        name: journey.title,
        description: journey.summary,
        image: journey.image,
        url: `https://driftmates.com/journeys/${journey.slug}`,
        provider: { "@id": "https://driftmates.com/#organization" },
        itinerary: {
          "@type": "ItemList",
          itemListElement: journey.days.map((day, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `${day.n}: ${day.t}`,
          })),
        },
        offers: {
          "@type": "Offer",
          price: String(journey.price),
          priceCurrency: "INR",
          url: `https://driftmates.com/journeys/${journey.slug}`,
        },
      },
    ];
    if (journey.faqs?.length) {
      graph.push({
        "@type": "FAQPage",
        mainEntity: journey.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      });
    }
    return { "@context": "https://schema.org", "@graph": graph };
  }, [journey]);

  if (!journey) {
    return (
      <section>
        <div className="wrap">
          <h1>That route isn’t on the map yet.</h1>
          <Link className="btn" to="/destinations">Back to the states</Link>
        </div>
      </section>
    );
  }

  const photos = [journey.image, ...(journey.gallery || [])].filter(Boolean);
  const more = journeys.filter((j) => j.place === journey.place && j.slug !== journey.slug);

  return (
    <>
      <Seo
        title={`${journey.title} | ${journey.destination} | Driftmates`}
        description={description}
        path={`/journeys/${journey.slug}`}
        image={journey.image}
        jsonLd={jsonLd}
      />
      <header className="page-hero journey-hero">
        <img src={journey.image} alt={`${journey.title} in ${journey.destination}`} />
        <div className="shade" />
        <div className="wrap">
          <div className="crumbs">
            <Link to={`/destinations/${journey.place}`}>{journey.destination}</Link>
            <span> · {journey.kind}</span>
          </div>
          <h1>{journey.title}</h1>
          <p>{journey.summary}</p>
          <Link className="btn" to={`/plan?journey=${journey.slug}`}>Plan this journey</Link>
        </div>
      </header>

      <nav className="section-nav" aria-label="On this journey">
        <div className="wrap section-nav-inner">
          <a href="#overview">Overview</a>
          {routeFor(journey.slug).length >= 2 && <a href="#short-itinerary">Short itinerary</a>}
          <a href="#itinerary">Itinerary</a>
          <a href="#included">Included</a>
          <a href="#questions">Questions</a>
          <Link className="btn" to={`/plan?journey=${journey.slug}`}>Request a plan</Link>
        </div>
      </nav>

      <section id="overview">
        <div className="wrap split overview-split">
          <div className="prose">
            <p className="kicker">Overview</p>
            <h2>The shape of this journey</h2>
            <Lines text={journey.overview} />
          </div>
          <SeasonBox journey={journey} />
        </div>
      </section>

      <RouteOverview journey={journey} />

      <section id="itinerary" className="band">
        <div className="wrap">
          <div className="section-head center">
            <p className="kicker">Day by day</p>
            <h2>{journey.days.length} days on the road</h2>
          </div>
          <RouteTrack days={journey.days} />
          <div className="day-list">
            {journey.days.map((day, i) => (
              <article className="day-block" data-day key={`${day.n}-${day.t}`}>
                <div>
                  <p className="kicker">{day.n}</p>
                  <h3>{day.t}</h3>
                  <Lines text={day.d} />
                </div>
                {photos.length > 0 && (
                  <div className="day-photo">
                    <img src={photos[i % photos.length]} alt={`${day.t}, ${journey.destination}`} />
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="included">
        <div className="wrap">
          <PolicyBoard rows={policyRows(journey)} />
          {journey.altitude?.length > 0 && (
            <div className="altitude policy-box">
              <h2>Altitude</h2>
              <div className="altitude-table">
                {journey.altitude.map((row) => {
                  const match = row.match(/^Day\s+(\d+)\s+(.+?)\s+([\d,]+)\s*m\s+(.+)$/);
                  const day = match ? `Day ${match[1]}` : "";
                  const place = match ? match[2] : row;
                  const height = match ? `${match[3]} m` : "";
                  const change = match ? match[4] : "";
                  return (
                    <p className="altitude-row" key={row}>
                      <b>{day}</b>
                      <span>{place}</span>
                      <span>{height}</span>
                      <span>{change}</span>
                    </p>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {journey.faqs?.length > 0 && (
        <section id="questions" className="band">
          <div className="wrap narrow">
            <div className="section-head center">
              <p className="kicker">Questions</p>
              <h2>Before you pack</h2>
            </div>
            <div className="faq-rows">
              {journey.faqs.map((faq, i) => (
                <div className={`faq-row${open === i ? " open" : ""}`} key={faq.q}>
                  <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                    {faq.q}
                    <span>{open === i ? "–" : "+"}</span>
                  </button>
                  {open === i && <p>{faq.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="ask">
        <div className="wrap duo">
          <div>
            <p className="kicker">Ask the desk</p>
            <h2 className="serif" style={{ fontWeight: 400, fontSize: 42, marginTop: 0 }}>
              Dates, a private version, or a question about fitness.
            </h2>
          </div>
          <EnquiryForm compact journey={journey.slug} />
        </div>
      </section>

      {more.length > 0 && (
        <section className="band">
          <div className="wrap">
            <div className="section-head">
              <p className="kicker">More in {journey.destination}</p>
              <h2>Other journeys</h2>
            </div>
            <div className="trip-grid">
              {more.map((j) => <TripCard key={j.slug} journey={j} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
