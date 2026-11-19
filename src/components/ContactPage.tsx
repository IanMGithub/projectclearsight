import { useEffect } from "react";
import {
  contactEmail,
  contactMeta,
  contactPage,
  progressCheckEmbedUrl,
  progressCheckUrl,
} from "../content/contact.ts";

export function ContactPage() {
  useEffect(() => {
    const description = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const previous = {
      title: document.title,
      description: description?.getAttribute("content") ?? null,
      ogTitle: ogTitle?.getAttribute("content") ?? null,
      ogDescription: ogDescription?.getAttribute("content") ?? null,
    };

    document.title = contactMeta.title;
    description?.setAttribute("content", contactMeta.description);
    ogTitle?.setAttribute("content", contactMeta.title);
    ogDescription?.setAttribute("content", contactMeta.description);

    return () => {
      document.title = previous.title;
      if (previous.description) description?.setAttribute("content", previous.description);
      if (previous.ogTitle) ogTitle?.setAttribute("content", previous.ogTitle);
      if (previous.ogDescription) ogDescription?.setAttribute("content", previous.ogDescription);
    };
  }, []);

  return (
    <article className="section learn">
      <div className="wrap">
        <h1 className="section-heading">{contactPage.title}</h1>
        <p className="learn-intro">{contactPage.intro}</p>

        <section className="contact-block" aria-labelledby="contact-email-heading">
          <h2 id="contact-email-heading">{contactPage.emailHeading}</h2>
          <p className="learn-support">{contactPage.emailSupport}</p>
          <p className="contact-address">
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </p>
          <p className="contact-actions">
            <a className="button" href={`mailto:${contactEmail}`}>
              {contactPage.emailButton}
            </a>
          </p>
          <p className="activity-note">{contactPage.privacy}</p>
        </section>

        <section className="contact-block" aria-labelledby="contact-form-heading">
          <h2 id="contact-form-heading">{contactPage.formHeading}</h2>
          <p className="learn-support">{contactPage.formBody}</p>
          <p className="learn-support">{contactPage.formHost}</p>
          <div className="contact-frame">
            <iframe title="ClearSight progress check, hosted on Google Forms" src={progressCheckEmbedUrl} />
          </div>
          <p className="contact-fallback">
            <a href={progressCheckUrl} target="_blank" rel="noopener noreferrer">
              {contactPage.formFallback}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </section>
      </div>
    </article>
  );
}
