export const siteUrl = "https://driftmates.com";

export const sameAs = [
  "https://www.instagram.com/thedriftmates",
  "https://youtube.com/@thedriftmates",
  "https://www.linkedin.com/company/driftmates/",
];

export function clip(text, max = 158) {
  const clean = String(text || "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trim()}…`;
}

export function absolute(path = "/") {
  if (!path || path === "/") return `${siteUrl}/`;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export const organization = {
  "@type": "TravelAgency",
  "@id": `${siteUrl}/#organization`,
  name: "Driftmates Adventure",
  url: siteUrl,
  telephone: "+918273722456",
  email: "info@driftmates.com",
  image: "https://driftmates.com/wp-content/uploads/2026/02/IMG_7060-2048x1152.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Krishna Colony, Dahariya Road, near Government ITI",
    addressLocality: "Haldwani",
    addressRegion: "Uttarakhand",
    postalCode: "263139",
    addressCountry: "IN",
  },
  areaServed: ["Ladakh", "Uttarakhand", "Himachal Pradesh", "Bhutan", "Nepal", "Kenya", "Tanzania"],
  sameAs,
};

export function breadcrumb(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

export function journeyDescription(journey) {
  return clip(
    `${journey.summary} ${journey.nights}. Pickup at ${journey.pickup}. From ₹${Number(journey.price).toLocaleString("en-IN")} per person.`
  );
}
