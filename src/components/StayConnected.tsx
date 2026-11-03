import { activeSocialLinks, stayConnected } from "../content/site.ts";
import { ExternalLink } from "./ExternalLink.tsx";

export function StayConnected() {
  const links = activeSocialLinks(stayConnected.links);

  return (
    <section className="section stay-connected" aria-labelledby="stay-connected-heading">
      <div className="wrap">
        <h2 className="section-heading" id="stay-connected-heading">
          {stayConnected.heading}
        </h2>
        <p className="stay-body">{stayConnected.body}</p>
        {links.length > 0 ? (
          <ul className="social-list">
            {links.map((link) => (
              <li key={link.id}>
                <ExternalLink href={link.url}>{link.name}</ExternalLink>
              </li>
            ))}
          </ul>
        ) : (
          <p className="social-pending">{stayConnected.pendingLabel}</p>
        )}
      </div>
    </section>
  );
}
