import { useEffect } from "react";
import { articles, articlesNewestFirst } from "../content/articles.ts";
import { learnMeta, learnPage } from "../content/learn.ts";
import { ArticleCard } from "./ArticleCard.tsx";

const orderedArticles = articlesNewestFirst(articles);

export function LearnPage() {
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

    document.title = learnMeta.title;
    description?.setAttribute("content", learnMeta.description);
    ogTitle?.setAttribute("content", learnMeta.title);
    ogDescription?.setAttribute("content", learnMeta.description);

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
        <h1 className="section-heading">{learnPage.title}</h1>
        <p className="learn-intro">{learnPage.support}</p>

        <details className="learn-disclosure">
          <summary>
            <span className="learn-disclosure-label">
              <span className="learn-disclosure-closed">Show guide</span>
              <span className="learn-disclosure-open">Hide guide</span>
            </span>
            <span className="learn-disclosure-chevron" aria-hidden="true" />
          </summary>
          <section className="learn-guide" aria-labelledby="guide-heading">
            <h2 id="guide-heading">{learnPage.guide.heading}</h2>
            <p className="learn-support">{learnPage.guide.intro}</p>
            <ul className="guide-grid">
              {learnPage.guide.items.map((item) => (
                <li key={item.id}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
            <p className="learn-clarification">{learnPage.guide.clarification}</p>
          </section>
        </details>

        <section className="learn-articles" aria-labelledby="articles-heading">
          <h2 id="articles-heading">{learnPage.articles.heading}</h2>
          <p className="learn-support">{learnPage.articles.support}</p>
          <ul className="article-grid">
            {orderedArticles.map((article, index) => (
              <ArticleCard key={article.id} article={article} loading={index < 3 ? "eager" : "lazy"} />
            ))}
          </ul>
        </section>

        <section className="learn-practice" aria-labelledby="practice-heading">
          <h2 id="practice-heading">{learnPage.practice.heading}</h2>
          <p className="learn-support">{learnPage.practice.support}</p>
          <a className="button" href={learnPage.practice.href}>
            {learnPage.practice.cta}
          </a>
        </section>
      </div>
    </article>
  );
}
