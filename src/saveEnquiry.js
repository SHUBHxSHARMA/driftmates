export function saveEnquiry(entry) {
  const url = import.meta.env.VITE_SHEETS_URL;
  if (!url) return Promise.resolve(false);

  return fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      kind: entry.kind || "enquiry",
      name: entry.name,
      phone: entry.phone,
      email: entry.email,
      journey: entry.journey || "",
      group: entry.group || "",
      when: entry.when || "",
      note: entry.note || "",
      role: entry.role || "",
      experience: entry.experience || "",
      place: entry.place || "",
      portfolio: entry.portfolio || "",
      page: window.location.pathname,
    }),
  })
    .then(() => true)
    .catch(() => false);
}
