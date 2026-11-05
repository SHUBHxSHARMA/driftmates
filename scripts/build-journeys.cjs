const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const tripsDir = path.join(root, "_source", "trips");
const outFile = path.join(root, "src", "officialJourneys.js");

const dm = (p) => `https://driftmates.com/wp-content/uploads/${p}`;
const photos = {
  leh: dm("2024/08/IMG_8386-scaled.jpg"),
  shey: dm("2026/02/shey-palace.webp"),
  og: dm("2026/02/IMG_7060-2048x1152.jpg"),
  moto: dm("2026/09/IMG_0659-scaled.jpg"),
  adi: dm("2024/08/IMG_0736-scaled.jpg"),
  darma: dm("2026/09/184f2d02-243b-4188-83a9-c6ec7d8312be-scaled.jpg"),
  munsiyari: dm("2026/09/c52fcc8f-35ed-411f-80de-f597473f7af2-scaled.jpg"),
  johar: dm("2026/09/IMG_8840-scaled.jpg"),
  tungnath: dm("2026/02/1747812183272-chopta-tungnath.webp"),
  kainchi: dm("2026/04/IMG_5763-scaled.jpg"),
  bir: dm("2026/02/bir-billing.webp"),
  himachal: dm("2016/11/9403133.jpg"),
  bhutan: dm("2026/03/IMG_4682.jpg"),
  chelela: dm("2026/04/IMG_5566.jpg"),
  annapurna: dm("2026/04/IMG_5663-scaled.jpg"),
  route: dm("2026/09/IMG_6219-scaled.jpg"),
  routePortrait: dm("2026/09/IMG_5970-scaled.jpg"),
  trips: dm("2026/09/d9cbd1d5-0e2a-46d4-82ce-ad740feeb6d1-scaled.jpg"),
  wide: dm("2026/09/IMG_9844-scaled.jpg"),
  camp: dm("2024/08/IMG_5529-scaled.jpg"),
};

const catalog = [
  ["leh-ladakh-trip-with-umling-la-tour-package", "leh-ladakh-umling-la", "Ladakh", "ladakh", "Backpacking · Biking", "leh", ["shey", "og", "camp"]],
  ["bhutan-tour-package", "bhutan", "Bhutan", "bhutan", "Backpacking · Biking", "bhutan", ["chelela", "route", "trips"]],
  ["himachal-backpacking-manali-kasol-jibhi-trip-package", "himachal-backpacking", "Himachal", "himachal", "Backpacking", "himachal", ["bir", "route", "trips"]],
  ["adi-kailash-tour-package", "adi-kailash", "Uttarakhand", "uttarakhand", "Pilgrimage · Trek", "adi", ["darma", "munsiyari", "johar"]],
  ["leh-ladakh-with-turtuk-bike-trip-package", "turtuk-bike", "Ladakh", "ladakh", "Bike trip", "moto", ["leh", "shey", "og"]],
  ["darma-valley-panchachuli-base-camp-tour-package", "darma-panchachuli", "Uttarakhand", "uttarakhand", "Backpacking · Biking", "darma", ["johar", "munsiyari", "adi"]],
  ["annapurna-base-camp-trek-package", "annapurna-base-camp", "Nepal", "nepal", "Trek", "annapurna", ["routePortrait", "wide", "camp"]],
  ["tungnath-chandrashila-trek-package", "tungnath-chandrashila", "Uttarakhand", "uttarakhand", "Trek", "tungnath", ["kainchi", "johar", "munsiyari"]],
  ["munsiyari-johar-valley-tour-package", "munsiyari-johar", "Uttarakhand", "uttarakhand", "Backpacking", "munsiyari", ["johar", "darma", "kainchi"]],
  ["winter-spiti-trip-package", "winter-spiti", "Himachal", "himachal", "Backpacking", "camp", ["wide", "route", "himachal"]],
  ["delhi-to-kumaon-escape-5-nights-6-days-tour-package", "kumaon-escape", "Uttarakhand", "uttarakhand", "Backpacking", "kainchi", ["munsiyari", "johar", "tungnath"]],
  ["delhi-to-kainchi-dham-1-night-2-days-spiritual-escape-tour-package", "kainchi-dham", "Uttarakhand", "uttarakhand", "Backpacking", "kainchi", ["munsiyari", "tungnath", "johar"]],
];

const HEADINGS = [
  "overview",
  "itinerary",
  "inclusions",
  "exclusions",
  "payment policy",
  "cancellation policy",
  "map",
  "frequently asked questions",
  "faqs",
  "batches",
  "highlights",
  "altitude gain chart (day-wise)",
  "do's & don'ts",
  "do’s & don’ts",
  "safety notes",
  "pro tips (from trek leader perspective)",
  "fitness benchmark (mandatory)",
  "prerequisite skills",
  "terrain & trek overview",
  "what to expect:",
  "brs level requirement",
  "best time to visit",
  "temperature range",
  "accommodation",
  "connectivity & facilities",
  "travel information",
  "health & safety",
  "important notes",
  "driftmates trek experience",
  "terms & conditions",
];

function decode(s) {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#8211;|&#8212;|&ndash;|&mdash;/g, "–")
    .replace(/&#8217;|&rsquo;|&#0?39;|&apos;/g, "'")
    .replace(/&#215;/g, "×")
    .replace(/&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"')
    .replace(/&#8377;/g, "₹")
    .replace(/&hellip;/g, "…");
}

function htmlToText(html) {
  const cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|h1|h2|h3|h4|li|tr|section|article)>/gi, "\n")
    .replace(/<li[^>]*>/gi, "\n- ")
    .replace(/<\/?(span|strong|b|em|i|a|font|u|small|sup|sub)[^>]*>/gi, "")
    .replace(/<[^>]+>/g, "\n");
  return decode(cleaned)
    .split("\n")
    .map((line) => line.replace(/[ \t]+/g, " ").trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function isHeading(line) {
  return HEADINGS.includes(line.toLowerCase().replace(/[:.]+$/, ""));
}

function money(text, label) {
  const re = new RegExp(`${label}:\\s*Rs\\s*([\\d,]+)`, "i");
  const m = text.match(re);
  return m ? Number(m[1].replace(/,/g, "")) : null;
}

function field(text, label) {
  const m = text.match(new RegExp(`${label}\\s*:\\s*([^\\n]+)`, "i"));
  return m ? m[1].trim() : "";
}

function titleCasePickup(raw) {
  const stripped = raw
    .replace(/pickup\s*point/i, "")
    .replace(/,\s*india,\s*leh/i, "")
    .replace(/,\s*$/, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!stripped) return raw.trim();
  if (/[A-Z]/.test(stripped.slice(1))) return stripped;
  return stripped.replace(/\b\w/g, (c) => c.toUpperCase());
}

function sectionsAfter(text, marker) {
  const at = text.toLowerCase().indexOf(marker.toLowerCase());
  const body = at === -1 ? text : text.slice(at);
  const end = body.search(/\nSimilar experiences\b|\nNot Just Travel\b|\nInquiry\n|\nCheck availability\n/i);
  const slice = end === -1 ? body : body.slice(0, end);
  const lines = slice.split("\n").map((line) => line.trim());
  const sections = {};
  let current = "preamble";
  sections[current] = [];
  for (const line of lines) {
    if (isHeading(line)) {
      current = line.toLowerCase().replace(/[:.]+$/, "");
      sections[current] = [];
      continue;
    }
    sections[current].push(line);
  }
  const joined = {};
  for (const [key, value] of Object.entries(sections)) {
    joined[key] = value.join("\n").replace(/\n{3,}/g, "\n\n").trim();
  }
  return joined;
}

function bullets(block) {
  if (!block) return [];
  const items = [];
  for (const raw of block.split("\n")) {
    const line = raw.replace(/^[✔✘•\-–]\s*/, "").trim();
    if (!line || line === "-" || /^share:?$/i.test(line)) continue;
    if (/^from rs\b/i.test(line)) continue;
    items.push(line);
  }
  return items;
}

const DAY_HEAD = /^(?:DAY|Day)\s*0*\d+\s*(?:[:|–—-]|\s{2,})\s*\S/;

function parseDays(block) {
  if (!block) return { days: [], altitude: [] };
  const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
  const days = [];
  const altitude = [];
  let current = null;
  const push = () => {
    if (!current) return;
    const body = current.lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
    days.push({ n: current.n, t: current.t, d: body });
  };
  for (const line of lines) {
    if (/^Day\s+\d+\s+\S.*\d[\d,]*\s*m\b/i.test(line) && !DAY_HEAD.test(line)) {
      altitude.push(line.replace(/\s+/g, " ").trim());
      continue;
    }
    if (DAY_HEAD.test(line)) {
      push();
      const cleaned = line.replace(/\s+/g, " ").trim();
      const num = cleaned.match(/(\d+)/);
      const title = cleaned.replace(/^(?:DAY|Day)\s*0*\d+\s*[:|–—-]*\s*/i, "").trim();
      current = { n: num ? `Day ${Number(num[1])}` : "", t: title, lines: [] };
      continue;
    }
    if (current) current.lines.push(line);
  }
  push();
  return { days, altitude };
}

function parseFaqs(block) {
  if (!block) return [];
  const lines = block.split("\n").map((l) => l.trim()).filter((l) => l && l !== "-");
  const faqs = [];
  let q = "";
  let a = [];
  const flush = () => {
    if (q && a.length) faqs.push({ q, a: a.join(" ").replace(/\s+/g, " ").trim() });
    q = "";
    a = [];
  };
  for (const line of lines) {
    if (line.endsWith("?") && line.length < 220) {
      flush();
      q = line;
      continue;
    }
    if (q) a.push(line);
  }
  flush();
  return faqs;
}

function summaryOf(overview) {
  const text = overview.replace(/\s+/g, " ").trim();
  if (text.length <= 280) return text;
  const cut = text.slice(0, 280);
  const stop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "));
  return (stop > 140 ? cut.slice(0, stop + 1) : cut.trim()) + (stop > 140 ? "" : "…");
}

function tidySeason(value) {
  const text = value.replace(/\s+/g, " ").replace(/^[-*]\s*/, "").trim();
  if (!text || text.length < 18 || text.endsWith(":")) return "";
  return text.length > 160 ? `${text.slice(0, 157).trim()}…` : text;
}

function seasonFrom(faqs) {
  const hit = faqs.find((f) => /best time|when (to|is|should)|which month/i.test(f.q));
  if (!hit) return "";
  const sentence = hit.a.split(/(?<=\.)\s/)[0];
  return sentence.length > 160 ? `${sentence.slice(0, 157).trim()}…` : sentence;
}

function build(raw, meta) {
  const text = decode(raw).replace(/\bJ ibhi\b/g, "Jibhi");
  const [file, slug, destination, place, kind, image, gallery] = meta;
  const beforeDuration = text
    .slice(0, text.toLowerCase().indexOf("duration:"))
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && l !== "-" && !l.startsWith("-"));
  const pickupRaw = beforeDuration.filter((l) => /pickup/i.test(l)).pop()
    || beforeDuration[beforeDuration.length - 1]
    || "";
  const sections = sectionsAfter(text, "duration:");
  const cleanBlock = (block) => (block || "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && line !== "-" && !/^(share|all|batches):?$/i.test(line) && !/^(duration|group size):/i.test(line))
    .join("\n")
    .trim();
  const overview = cleanBlock(sections.overview).length > 80
    ? cleanBlock(sections.overview)
    : cleanBlock(sections.preamble);
  const parsedDays = parseDays(sections.itinerary || "");
  const chart = (sections["altitude gain chart (day-wise)"] || "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^Day\s+\d+/i.test(line));
  const days = parsedDays.days;
  const altitude = [...parsedDays.altitude, ...chart];
  const included = bullets(sections.inclusions);
  const notIncluded = bullets(sections.exclusions);
  const payment = bullets(sections["payment policy"]);
  const cancellation = bullets(sections["cancellation policy"]);
  const seenFaq = new Set();
  const faqs = parseFaqs([
    sections["frequently asked questions"],
    sections.faqs,
    sections.map,
  ].filter(Boolean).join("\n")).filter((faq) => {
    const key = faq.q.toLowerCase();
    if (seenFaq.has(key)) return false;
    seenFaq.add(key);
    return true;
  });
  const bestTime = cleanBlock(sections["best time to visit"]);
  const price = money(text, "Current price is");
  const was = money(text, "Original price was");
  let season = tidySeason(seasonFrom(faqs) || (bestTime ? bestTime.replace(/\s+/g, " ").trim() : ""));
  let pickup = titleCasePickup(pickupRaw);
  if (slug === "annapurna-base-camp") {
    pickup = "Pokhara Bus Station";
    season = "Spring (March–May) and autumn (September–November).";
  }
  if (slug === "tungnath-chandrashila") {
    season = "March–June, September–November, and December–February for snow.";
  }
  return {
    slug,
    source: file,
    title: text.match(/^TITLE:\s*(.+?)\s+-\s+Driftmates/m)?.[1]?.trim() || slug,
    destination,
    place,
    kind,
    nights: field(text, "Duration"),
    group: field(text, "Group size").replace(/^group size:\s*/i, ""),
    price,
    was,
    pickup,
    season,
    terms: bullets(sections["terms & conditions"]),
    image: photos[image],
    gallery: gallery.map((key) => photos[key]),
    summary: summaryOf(overview),
    overview,
    highlights: (included.length ? included : days.map((d) => d.t))
      .filter((item) => !item.endsWith(":") && item.length > 24)
      .slice(0, 3)
      .map((item) => (item.length > 120 ? `${item.slice(0, 117).trim()}…` : item)),
    included,
    notIncluded,
    payment,
    cancellation,
    altitude,
    faqs,
    days,
  };
}

const journeys = catalog.map((meta) => {
  const text = fs.readFileSync(path.join(tripsDir, `${meta[0]}.txt`), "utf8");
  return build(text, meta);
});

const banner = `/* Generated from the Driftmates tour pages archived in _source/trips. */\n`;
fs.writeFileSync(outFile, `${banner}export const journeys = ${JSON.stringify(journeys, null, 2)};\n`);

for (const j of journeys) {
  console.log(
    `${j.slug} | ${j.price} | days ${j.days.length} | in ${j.included.length} | ex ${j.notIncluded.length} | pay ${j.payment.length} | cancel ${j.cancellation.length} | faq ${j.faqs.length} | ${j.pickup}`
  );
  if (!j.days.length || !j.price || !j.summary) console.log("  PROBLEM", j.slug);
}
