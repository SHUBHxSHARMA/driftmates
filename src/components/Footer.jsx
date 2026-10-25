import { Link } from "react-router-dom";
import { address, destinations, email, journeys, phone, phoneHref } from "../data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="foot-brand">
          <Link to="/" className="foot-logo">
            Driftmates
          </Link>
          <p>
            Small-group motorcycle expeditions, backpacking trips, and treks across the Himalaya.
            Every route is planned and recce’d on the ground.
          </p>
          <p>{address}</p>
        </div>
        <div>
          <h3>Journeys</h3>
          <ul>
            {journeys.slice(0, 5).map((j) => (
              <li key={j.slug}>
                <Link to={`/journeys/${j.slug}`}>{j.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Destinations</h3>
          <ul>
            {destinations.map((d) => (
              <li key={d.slug}>
                <Link to={`/destinations#${d.slug}`}>{d.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Contact</h3>
          <ul>
            <li><a href={phoneHref}>{phone}</a></li>
            <li><a href={`mailto:${email}`}>{email}</a></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/plan">Plan a journey</Link></li>
          </ul>
        </div>
      </div>
      <div className="wrap legal">
        <span>© {new Date().getFullYear()} Driftmates Adventure. All rights reserved.</span>
        <span>Haldwani · Uttarakhand</span>
      </div>
    </footer>
  );
}
