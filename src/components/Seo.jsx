import { useEffect } from "react";
import { absolute, clip } from "../seo";

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function Seo({ title, description, path = "/", image, jsonLd }) {
  const payload = jsonLd ? JSON.stringify(jsonLd) : "";
  useEffect(() => {
    const desc = clip(description);
    const url = absolute(path);
    document.title = title;
    upsertMeta("name", "description", desc);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", desc);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", "website");
    upsertMeta("name", "twitter:card", image ? "summary_large_image" : "summary");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", desc);
    if (image) {
      upsertMeta("property", "og:image", image);
      upsertMeta("name", "twitter:image", image);
    }
    upsertLink("canonical", url);

    let script = document.getElementById("dm-jsonld");
    if (payload) {
      if (!script) {
        script = document.createElement("script");
        script.id = "dm-jsonld";
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = payload;
    } else if (script) {
      script.remove();
    }
  }, [title, description, path, image, payload]);

  return null;
}
