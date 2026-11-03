import { takeaway } from "../content/site.ts";

export function Takeaway() {
  return (
    <section className="section takeaway" aria-labelledby="takeaway-heading">
      <div className="wrap">
        <h2 className="section-heading" id="takeaway-heading">
          {takeaway.heading}
        </h2>
        <ul className="takeaway-grid">
          {takeaway.steps.map((step) => (
            <li className="takeaway-step" key={step.id}>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
