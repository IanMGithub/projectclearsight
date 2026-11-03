import { mission } from "../content/site.ts";

export function Mission() {
  return (
    <section className="section mission" id={mission.id} aria-labelledby="mission-heading">
      <div className="wrap">
        <h2 className="section-heading" id="mission-heading">
          {mission.heading}
        </h2>
        <p className="mission-statement">{mission.statement}</p>
      </div>
    </section>
  );
}
