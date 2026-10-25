import { Route, Routes, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import WhatsApp from "./components/WhatsApp";
import Intro from "./components/Intro";
import { PageTransition, ScrollProgress } from "./components/Motion";
import Home from "./pages/Home";
import Journeys from "./pages/Journeys";
import Journey from "./pages/Journey";
import Destinations from "./pages/Destinations";
import About from "./pages/About";
import Plan from "./pages/Plan";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (!el) {
      window.scrollTo(0, 0);
      return;
    }
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <div className="app">
      <ScrollProgress />
      <Intro />
      <a className="skip" href="#main">Skip to content</a>
      <ScrollToTop />
      <Nav />
      <main id="main">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/journeys" element={<Journeys />} />
            <Route path="/journeys/:slug" element={<Journey />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/about" element={<About />} />
            <Route path="/plan" element={<Plan />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
      <WhatsApp />
    </div>
  );
}
