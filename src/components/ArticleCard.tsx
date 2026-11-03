import { useState } from "react";
import { formatArticleDate, type Article } from "../content/articles.ts";
import { ExternalLink } from "./ExternalLink.tsx";

export function ArticleCard({ article, loading = "lazy" }: { article: Article; loading?: "eager" | "lazy" }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <li>
      <ExternalLink className="article-card" href={article.url}>
        <span className="article-card-media">
          {imageFailed ? null : (
            <img
              src={article.imageSrc}
              alt={article.imageAlt}
              width={article.imageWidth}
              height={article.imageHeight}
              loading={loading}
              decoding="async"
              style={{ objectPosition: article.imagePosition }}
              onError={() => setImageFailed(true)}
            />
          )}
        </span>
        <span className="article-card-body">
          <span className="article-card-title">{article.title}</span>
          <time dateTime={article.publishedDate}>{formatArticleDate(article.publishedDate)}</time>
          <span className="article-card-action">
            Read on Medium
            <svg className="article-card-icon" viewBox="0 0 20 20" aria-hidden="true">
              <path
                d="M6 14 14 6M8 6h6v6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </span>
      </ExternalLink>
    </li>
  );
}
