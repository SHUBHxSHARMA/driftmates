import { useEffect, useLayoutEffect, useRef, useState } from "react";

const STORAGE_KEY = "dm-intro-seen";

function shouldPlay() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("intro") === "1") return true;
  try {
    return sessionStorage.getItem(STORAGE_KEY) !== "1";
  } catch {
    return true;
  }
}

function releaseHero() {
  const root = document.documentElement;
  root.classList.remove("hero-hold");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  root.classList.add("hero-go");
  window.setTimeout(() => root.classList.remove("hero-go"), 1800);
}

export default function Intro() {
  const [phase, setPhase] = useState(() => {
    if (typeof window === "undefined") return "gone";
    return shouldPlay() ? "in" : "gone";
  });
  const play = useRef(phase === "in");

  useLayoutEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!play.current || reduce) {
      root.classList.remove("show-intro", "hero-hold");
      return undefined;
    }
    root.classList.remove("show-intro");
    root.classList.add("hero-hold");
    return undefined;
  }, []);

  useEffect(() => {
    if (!play.current) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const started = window.__dmIntroStart || Date.now();
    const fade = reduce ? 0 : 500;
    const leaveAt = Math.max(0, 2000 - (Date.now() - started));
    const leaveTimer = window.setTimeout(() => setPhase("out"), leaveAt);
    const doneTimer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* private browsing */
      }
      setPhase("gone");
      releaseHero();
    }, leaveAt + fade);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div className={`intro settled${phase === "out" ? " out" : ""}`} aria-hidden={phase === "out"}>
      <p className="intro-name">Driftmates</p>
    </div>
  );
}
