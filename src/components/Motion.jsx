import { cloneElement, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

function reduceMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ScrollProgress() {
  const ref = useRef(null);
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const bar = ref.current;
    if (!bar) return undefined;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.width = `${progress * 100}%`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return <div className="scroll-progress" ref={ref} aria-hidden="true" />;
}

export function PageTransition({ children }) {
  const location = useLocation();
  const [current, setCurrent] = useState(location);
  const [leaving, setLeaving] = useState(null);

  if (location.pathname !== current.pathname) {
    setLeaving(reduceMotion() ? null : current);
    setCurrent(location);
  }

  useLayoutEffect(() => {
    if (!leaving) return undefined;
    if (!location.hash) window.scrollTo(0, 0);
    const timer = window.setTimeout(() => setLeaving(null), 760);
    return () => window.clearTimeout(timer);
  }, [leaving, location.hash, location.pathname]);

  return (
    <>
      {leaving && (
        <div className="page-shell page-leave" aria-hidden="true">
          {cloneElement(children, { location: leaving })}
        </div>
      )}
      <div key={current.pathname} className={leaving ? "page-shell page-enter" : "page-shell"}>
        {children}
      </div>
    </>
  );
}
