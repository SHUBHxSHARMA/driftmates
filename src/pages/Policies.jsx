import Seo from "../components/Seo";
import { policySections } from "../policies";

function Blocks({ paragraphs }) {
  if (!paragraphs?.length) return null;
  return paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>);
}

function Item({ item }) {
  return (
    <div>
      {item.title && <h4>{item.title}</h4>}
      <Blocks paragraphs={item.text} />
      {item.list && (
        <ul>
          {item.list.map((line) => <li key={line}>{line}</li>)}
        </ul>
      )}
      <Blocks paragraphs={item.after} />
      {item.afterList && (
        <ul>
          {item.afterList.map((line) => <li key={line}>{line}</li>)}
        </ul>
      )}
      <Blocks paragraphs={item.close} />
    </div>
  );
}

export default function Policies() {
  return (
    <>
      <Seo
        title="Policies | Driftmates Adventure"
        description="Terms, privacy, payment, and cancellation policies for Driftmates journeys."
        path="/policies"
      />
      <section className="policies">
        <div className="wrap narrow">
          <p className="kicker">Driftmates</p>
          <h1>Policies</h1>
          <nav className="policy-jump" aria-label="Policies">
            {policySections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>{section.title}</a>
            ))}
          </nav>
          {policySections.map((section) => (
            <article className="policy-block" id={section.id} key={section.id}>
              <h2>{section.title}</h2>
              {section.groups.map((group) => (
                <div key={group.title || section.id}>
                  {group.title && <h3>{group.title}</h3>}
                  {group.items.map((item) => (
                    <Item item={item} key={item.title || item.text?.[0]} />
                  ))}
                </div>
              ))}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
