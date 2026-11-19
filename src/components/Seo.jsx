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
  const desc = clip(description);
  const url = absolute(path);
  const payload = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
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
  }, [title, desc, url, image, payload]);

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      {image ? <meta property="og:image" content={image} /> : null}
      <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      {image ? <meta name="twitter:image" content={image} /> : null}
      {payload ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: payload }} />
      ) : null}
    </>
  );
}
