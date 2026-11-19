import https from "node:https";

const ORIGIN = "145.79.213.49";

export default function handler(req, res) {
  const parts = [].concat(req.query.path || []);
  if (!parts.length || parts.some((part) => part === ".." || part.includes("\\") || part.includes("/"))) {
    res.statusCode = 400;
    res.end("Bad path");
    return;
  }

  const filePath = `/wp-content/${parts.map((part) => encodeURIComponent(part)).join("/")}`;
  const upstream = https.request(
    {
      host: ORIGIN,
      servername: "driftmates.com",
      method: "GET",
      path: filePath,
      headers: {
        host: "driftmates.com",
        "user-agent": "Driftmates",
      },
    },
    (origin) => {
      const type = origin.headers["content-type"] || "";
      if (origin.statusCode !== 200 || !type.startsWith("image/")) {
        res.statusCode = 404;
        res.end("Image not found");
        origin.resume();
        return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", type);
      res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
      origin.pipe(res);
    }
  );

  upstream.setTimeout(15000, () => {
    upstream.destroy();
    if (!res.headersSent) {
      res.statusCode = 504;
      res.end("Image timed out");
    }
  });
  upstream.on("error", () => {
    if (!res.headersSent) {
      res.statusCode = 502;
      res.end("Image unavailable");
    }
  });
  upstream.end();
}
