import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import WhatsApp from "./components/WhatsApp";
import Home from "./pages/Home";
import Journeys from "./pages/Journeys";
import Journey from "./pages/Journey";
import Destinations from "./pages/Destinations";
import About from "./pages/About";
import Plan from "./pages/Plan";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <div className="app">
      <a className="skip" href="#main">Skip to content</a>
      <ScrollToTop />
      <Nav />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journeys" element={<Journeys />} />
          <Route path="/journeys/:slug" element={<Journey />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/about" element={<About />} />
          <Route path="/plan" element={<Plan />} />
        </Routes>
      </main>
      <Footer />
      <WhatsApp />
    </div>
  );
}
