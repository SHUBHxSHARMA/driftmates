import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <section className="missing">
      <Seo title="Page not found | Driftmates" description="That page is not on the Driftmates site." path="/404" />
      <div className="wrap narrow">
        <p className="kicker">404</p>
        <h1>That page isn’t on the map.</h1>
        <p>The address may have changed. The journeys are still here.</p>
        <Link className="btn" to="/journeys">See the journeys</Link>
      </div>
    </section>
  );
}
