import { createServer } from "vite";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const KEEP_TAG = /<title>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*rel="canonical"[^>]*>|<script\b[^>]*type="application\/ld\+json"[\s\S]*?<\/script>/g;
const DROP_TAG = /<link\b[^>]*rel="preload"[^>]*>/g;

function routeFile(route) {
  if (route === "/") return "index.html";
  return join(route.replace(/^\//, ""), "index.html");
}

const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  ssr: {
    external: ["react", "react-dom", "react-router", "react-router-dom"],
    resolve: {
      conditions: ["module-sync", "import", "default"],
      externalConditions: ["module-sync", "import", "node", "default"],
    },
  },
});

try {
  const { render } = await vite.ssrLoadModule("/src/entry-server.jsx");
  const { journeys, destinations } = await vite.ssrLoadModule("/src/data.js");
  const { articles } = await vite.ssrLoadModule("/src/guides.js");
  const routes = [
    "/",
    "/journeys",
    ...journeys.map((journey) => `/journeys/${journey.slug}`),
    "/destinations",
    ...destinations.map((destination) => `/destinations/${destination.slug}`),
    "/about",
    "/inspiration",
    ...articles.map((article) => `/inspiration/${article.slug}`),
    "/plan",
    "/careers",
    "/policies",
  ];

  const template = readFileSync("dist/index.html", "utf8").replace(DROP_TAG, "");
  if (!template.includes('<div id="root"></div>')) {
    throw new Error("dist/index.html is already rendered. Run vite build first.");
  }
  let failed = 0;

  for (const route of routes) {
    const rendered = render(route).replace(DROP_TAG, "");
    const head = [];
    const body = rendered.replace(KEEP_TAG, (tag) => {
      head.push(tag);
      return "";
    });
    if (!head.some((tag) => tag.startsWith("<title>"))) {
      console.error("MISSING TITLE", route);
      failed += 1;
    }
    if (!head.some((tag) => tag.includes('rel="canonical"'))) {
      console.error("MISSING CANONICAL", route);
      failed += 1;
    }
    let html = template
      .replace(/<title>[\s\S]*?<\/title>\s*/gi, "")
      .replace(/<meta\s+(?:name="description"|property="og:[^"]+"|name="twitter:[^"]+")[^>]*>\s*/gi, "")
      .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, "");
    html = html.replace("</head>", `    ${head.join("\n    ")}\n  </head>`);
    html = html.replace(DROP_TAG, "");
    html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
    const file = join("dist", routeFile(route));
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
    console.log("rendered", route);
  }

  if (failed) process.exitCode = 1;
} finally {
  await vite.close();
}
