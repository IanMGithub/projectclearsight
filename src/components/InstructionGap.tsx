import {
  instructionGapCopy,
  instructionGapDisclosure,
  survey,
  surveyUpdateNote,
} from "../content/site.ts";

export function InstructionGap() {
  const disclosure = instructionGapDisclosure(survey);
  const note = surveyUpdateNote(survey);

  return (
    <>
      <section className="instruction-gap" aria-labelledby="instruction-gap-heading">
        <div className="instruction-gap-inner">
          <h2 id="instruction-gap-heading">{instructionGapCopy.heading}</h2>
          <p className="gap-figure">
            <span className="gap-only">{survey.instructionGap.lead}</span>
            <span className="gap-percent">{survey.instructionGap.value}</span>
          </p>
          <p className="gap-support">{survey.instructionGap.label}</p>
          <p className="gap-close">{instructionGapCopy.closing}</p>
          {disclosure ? <p className="gap-disclosure">{disclosure}</p> : null}
          {survey.status !== "draft" ? (
            <p className="gap-disclosure">{survey.instructionGap.context}</p>
          ) : null}
        </div>
      </section>
      {note ? (
        <div className="survey-note-wrap">
          <p className="survey-note">{note}</p>
        </div>
      ) : null}
    </>
  );
}
