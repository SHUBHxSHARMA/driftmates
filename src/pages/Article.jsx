import { Link, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import { getJourney } from "../data";
import { articles, getArticle } from "../guides";
import { breadcrumb, organization } from "../seo";

export default function Article() {
  const { slug } = useParams();
  const article = getArticle(slug);

  if (!article) {
    return (
      <section>
        <div className="wrap">
          <h1>That note is not on the desk.</h1>
          <Link className="btn" to="/inspiration">Back to inspiration</Link>
        </div>
      </section>
    );
  }

  const journey = article.journey ? getJourney(article.journey) : null;
  const more = articles.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <>
      <Seo
        title={`${article.title} | Driftmates`}
        description={article.excerpt}
        path={`/inspiration/${article.slug}`}
        image={article.image}
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            organization,
            breadcrumb([
              { name: "Home", path: "/" },
              { name: "Inspiration & planning", path: "/inspiration" },
              { name: article.title, path: `/inspiration/${article.slug}` },
            ]),
            {
              "@type": "Article",
              headline: article.title,
              datePublished: article.date,
              image: article.image,
              author: { "@id": "https://driftmates.com/#organization" },
              publisher: { "@id": "https://driftmates.com/#organization" },
              description: article.excerpt,
            },
          ],
        }}
      />
      <article className="essay">
        <header className="wrap essay-head">
          <p className="crumbs">
            <Link to="/inspiration">Inspiration & planning</Link>
            {" · "}
            {article.kicker}
          </p>
          <h1>{article.title}</h1>
          <p className="note-date">{article.dateLabel}</p>
        </header>
        <div className="wrap essay-photo">
          <img src={article.image} alt={article.alt} />
        </div>
        <div className="wrap narrow essay-body">
          {article.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {journey && (
            <p className="essay-next">
              <Link className="btn" to={`/journeys/${journey.slug}`}>
                See the full itinerary
              </Link>
            </p>
          )}
        </div>
      </article>
      <section className="band">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">Keep reading</p>
            <h2>More from the desk</h2>
          </div>
          <div className="guide-grid">
            {more.map((item) => (
              <article className="guide-card" key={item.slug}>
                <Link className="guide-photo" to={`/inspiration/${item.slug}`}>
                  <img src={item.image} alt={item.alt} />
                </Link>
                <div className="guide-copy">
                  <h3>
                    <Link to={`/inspiration/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <p>{item.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
