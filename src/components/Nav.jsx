import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Brand from "./Brand";
import { destinations } from "../data";

export default function Nav() {
  const { pathname } = useLocation();
  const [solid, setSolid] = useState(pathname !== "/");
  const [open, setOpen] = useState(false);
  const onHero = pathname === "/" && !solid;

  useEffect(() => {
    setOpen(false);
    const onScroll = () => setSolid(pathname !== "/" || window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <header className={`nav ${onHero ? "" : "solid"}`}>
      <div className="nav-inner">
        <Link to="/" aria-label="Driftmates home">
          <Brand light={onHero} />
        </Link>
        <nav className="nav-links" aria-label="Primary">
          <NavLink to="/inspiration">Inspiration & planning</NavLink>
          <div className="drop">
            <NavLink to="/destinations">Destinations</NavLink>
            <div className="drop-panel">
              {destinations.map((d) => (
                <Link key={d.slug} to={`/destinations/${d.slug}`}>
                  {d.name}
                  <span>{d.region}</span>
                </Link>
              ))}
            </div>
          </div>
          <NavLink to="/about">How we work</NavLink>
        </nav>
        <Link className="btn nav-cta" to="/plan">
          Plan my journey
        </Link>
        <button className="menu-btn" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((v) => !v)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
      <div className={`mobile-panel ${open ? "open" : ""}`}>
        <Link to="/inspiration" onClick={() => setOpen(false)}>Inspiration & planning</Link>
        <Link to="/destinations" onClick={() => setOpen(false)}>Destinations</Link>
        <Link to="/about" onClick={() => setOpen(false)}>How we work</Link>
        <Link to="/plan" onClick={() => setOpen(false)}>Plan my journey</Link>
      </div>
    </header>
  );
}
