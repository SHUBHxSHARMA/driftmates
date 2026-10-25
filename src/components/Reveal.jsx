import { useLayoutEffect, useRef } from "react";

export default function Reveal({
  as: Tag = "div",
  className = "",
  delay = 0,
  children,
  style,
  ...rest
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in", "is-set");
      return undefined;
    }

    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("is-in");
        const wait = delay + 900;
        timer = window.setTimeout(() => el.classList.add("is-set"), wait);
        io.disconnect();
      },
      { threshold: 0, rootMargin: "0px 0px -24px 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, [delay]);

  return (
    <Tag
      ref={ref}
      className={className ? `reveal-on ${className}` : "reveal-on"}
      style={{ ...style, "--d": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
