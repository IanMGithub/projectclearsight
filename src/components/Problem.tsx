import { draftSurveyNotice, problem, survey, surveyFraming } from "../content/site.ts";

export function Problem() {
  return (
    <section className="section problem" id={problem.id} aria-labelledby="problem-heading">
      <div className="wrap">
        <h2 className="section-heading" id="problem-heading">
          {problem.heading}
        </h2>
        {survey.status === "draft" ? <p className="draft-notice">{draftSurveyNotice}</p> : null}
        <p className="survey-framing">{surveyFraming(survey)}</p>
        <ul className="stat-grid">
          {survey.statistics.map((item) => (
            <li key={item.id}>
              <p className="stat-value">{item.percent}%</p>
              <p className="stat-label">{item.label}</p>
            </li>
          ))}
        </ul>
        <p className="problem-emphasis">{problem.emphasis}</p>
      </div>
    </section>
  );
}
