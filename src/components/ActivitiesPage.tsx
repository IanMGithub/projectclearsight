import { useEffect } from "react";
import { activities, activitiesMeta, activityById } from "../content/activities.ts";
import { ActivityRunner } from "./ActivityRunner.tsx";

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const descriptionTag = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const previous = {
      title: document.title,
      description: descriptionTag?.getAttribute("content") ?? null,
      ogTitle: ogTitle?.getAttribute("content") ?? null,
      ogDescription: ogDescription?.getAttribute("content") ?? null,
    };

    document.title = title;
    descriptionTag?.setAttribute("content", description);
    ogTitle?.setAttribute("content", title);
    ogDescription?.setAttribute("content", description);

    return () => {
      document.title = previous.title;
      if (previous.description) descriptionTag?.setAttribute("content", previous.description);
      if (previous.ogTitle) ogTitle?.setAttribute("content", previous.ogTitle);
      if (previous.ogDescription) ogDescription?.setAttribute("content", previous.ogDescription);
    };
  }, [title, description]);
}

export function ActivitiesPage() {
  const selected = activityById(new URLSearchParams(window.location.search).get("activity"));
  usePageMeta(
    selected ? `${selected.title} | ClearSight` : activitiesMeta.title,
    selected ? selected.description : activitiesMeta.description,
  );

  if (selected) return <ActivityRunner key={selected.id} activity={selected} />;

  return (
    <article className="section learn">
      <div className="wrap">
        <h1 className="section-heading">Activities</h1>
        <p className="learn-intro">
          Practice looking beyond first impressions. Try these quick activities to build better habits for
          checking information and deciding what to trust and share.
        </p>
        <ul className="activity-list">
          {activities.map((activity) => (
            <li key={activity.id}>
              <a className="activity-card" href={`/activities?activity=${activity.id}`}>
                <h2>{activity.title}</h2>
                <p>{activity.description}</p>
                <span className="article-card-action">Start</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
