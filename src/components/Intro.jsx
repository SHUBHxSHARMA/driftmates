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
  const [phase, setPhase] = useState(() => (shouldPlay() ? "in" : "gone"));
  const play = useRef(phase === "in");

  useLayoutEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!play.current || reduce) {
      root.classList.remove("hero-hold");
      return undefined;
    }
    root.classList.add("hero-hold");
    return undefined;
  }, []);

  useEffect(() => {
    if (!play.current) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hold = reduce ? 600 : 2000;
    const fade = reduce ? 0 : 500;
    const leaveTimer = window.setTimeout(() => setPhase("out"), hold);
    const doneTimer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* private browsing */
      }
      setPhase("gone");
      releaseHero();
    }, hold + fade);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div className={`intro${phase === "out" ? " out" : ""}`} aria-hidden={phase === "out"}>
      <p className="intro-name">Driftmates</p>
    </div>
  );
}
