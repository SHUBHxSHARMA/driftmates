import https from "node:https";

const ORIGIN = "145.79.213.49";

function imageType(headerType, head) {
  const declared = String(headerType).split(";")[0].trim().toLowerCase();
  if (declared.startsWith("image/")) return declared;
  if (!head || head.length < 12) return "";
  if (head[0] === 0xff && head[1] === 0xd8) return "image/jpeg";
  if (head[0] === 0x89 && head[1] === 0x50 && head[2] === 0x4e && head[3] === 0x47) return "image/png";
  if (head.toString("ascii", 0, 4) === "GIF8") return "image/gif";
  if (head.toString("ascii", 0, 4) === "RIFF" && head.toString("ascii", 8, 12) === "WEBP") return "image/webp";
  if (head.toString("ascii", 4, 8) === "ftyp") {
    const brand = head.toString("ascii", 8, 12);
    if (brand === "avif" || brand === "avis") return "image/avif";
  }
  return "";
}

export default function handler(req, res) {
  const file = String(req.query.file || "");
  if (!file || file.includes("..") || file.startsWith("/") || file.includes("\\")) {
    res.statusCode = 400;
    res.end("Bad path");
    return;
  }

  const filePath = `/wp-content/${file.split("/").map((part) => encodeURIComponent(part)).join("/")}`;
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
      if (origin.statusCode !== 200) {
        res.statusCode = 404;
        res.end("Image not found");
        origin.resume();
        return;
      }
      origin.pause();
      const chunks = [];
      let got = 0;
      const take = (chunk) => {
        chunks.push(chunk);
        got += chunk.length;
        if (got < 16) return;
        origin.pause();
        origin.off("data", take);
        const head = Buffer.concat(chunks);
        const type = imageType(origin.headers["content-type"] || "", head);
        if (!type) {
          res.statusCode = 404;
          res.end("Image not found");
          origin.resume();
          return;
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", type);
        res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
        res.write(head);
        origin.pipe(res);
      };
      origin.on("data", take);
      origin.resume();
      origin.once("end", () => {
        if (!res.headersSent) {
          res.statusCode = 404;
          res.end("Image not found");
        }
      });
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
