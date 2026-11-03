import { pillars } from "../content/site.ts";
import { openDestination } from "../content/links.ts";
import { ExternalLink } from "./ExternalLink.tsx";

export function Pillars() {
  return (
    <section className="section pillars" id={pillars.id} aria-labelledby="pillars-heading">
      <div className="wrap">
        <h2 className="section-heading" id="pillars-heading">
          {pillars.heading}
        </h2>
        <p className="pillars-intro">{pillars.intro}</p>
        <ul className="pillar-grid">
          {pillars.items.map((item, index) => {
            const href = openDestination(item);
            return (
              <li className="pillar" key={item.id}>
                <p className="pillar-index">{index + 1}</p>
                <p className="pillar-label">{item.label}</p>
                <h3>{item.title}</h3>
                <p className="pillar-description">{item.description}</p>
                {item.internalPath ? (
                  <a className="text-link" href={item.internalPath}>
                    {item.ctaLabel || "Learn more"}
                  </a>
                ) : href ? (
                  <ExternalLink className="text-link" href={href}>
                    {item.ctaLabel || "Learn more"}
                  </ExternalLink>
                ) : (
                  <p className="availability">Coming soon</p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
