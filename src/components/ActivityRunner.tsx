import { useEffect, useRef, useState } from "react";
import type { PracticeActivity } from "../content/activities.ts";
import { scoreAnswers, submitChoice, type SubmittedChoice } from "../content/activity-logic.ts";

export function ActivityRunner({ activity }: { activity: PracticeActivity }) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [answers, setAnswers] = useState<SubmittedChoice[]>([]);
  const [phase, setPhase] = useState<"question" | "results">("question");
  const started = useRef(false);
  const locked = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const feedbackRef = useRef<HTMLParagraphElement>(null);

  const question = activity.questions[index];
  const total = activity.questions.length;
  const score = scoreAnswers(answers);
  const last = index === total - 1;

  useEffect(() => {
    if (!started.current) {
      started.current = true;
      return;
    }
    if (phase === "results") headingRef.current?.focus();
    else if (picked) feedbackRef.current?.focus();
    else headingRef.current?.focus();
  }, [phase, index, picked]);

  function choose(choiceId: string) {
    if (!question || locked.current) return;
    const record = submitChoice(null, question, choiceId);
    if (!record) return;
    locked.current = true;
    setPicked(choiceId);
    setAnswers((current) =>
      current.some((item) => item.questionId === record.questionId) ? current : [...current, record],
    );
  }

  function next() {
    if (!locked.current) return;
    if (last) {
      setPhase("results");
      return;
    }
    locked.current = false;
    setIndex((current) => current + 1);
    setPicked(null);
  }

  function retry() {
    locked.current = false;
    setIndex(0);
    setPicked(null);
    setAnswers([]);
    setPhase("question");
  }

  if (phase === "results") {
    return (
      <article className="section activity-run">
        <div className="wrap">
          <p className="activity-kicker">{activity.title}</p>
          <h1 className="section-heading" ref={headingRef} tabIndex={-1}>
            Practice score
          </h1>
          <p className="activity-score">
            You matched the marked answer on {score.correct} of {total} questions.
          </p>
          <p className="learn-support">{activity.takeaway}</p>
          <p className="activity-note">
            This score stays in this session only. A higher score does not certify that someone can detect
            misinformation.
          </p>
          <div className="activity-actions">
            <button type="button" className="button" onClick={retry}>
              Try again
            </button>
            <a className="button button-secondary" href="/activities">
              Back to activities
            </a>
          </div>
        </div>
      </article>
    );
  }

  if (!question) return null;

  const selected = question.choices.find((choice) => choice.id === picked);
  const correct = picked !== null && picked === question.correctId;

  return (
    <article className="section activity-run">
      <div className="wrap">
        <p className="activity-kicker">{activity.title}</p>
        {activity.before ? <p className="learn-support">{activity.before}</p> : null}
        <p className="activity-progress">
          Question {index + 1} of {total}
        </p>
        {question.instruction ? <p className="activity-instruction">{question.instruction}</p> : null}
        <h1 className="section-heading activity-prompt" ref={headingRef} tabIndex={-1}>
          {question.prompt}
        </h1>
        <div className="activity-choices" role="group" aria-label="Answer choices">
          {question.choices.map((choice) => {
            const isSelected = picked === choice.id;
            const isCorrect = picked !== null && choice.id === question.correctId;
            const state = isCorrect ? "correct" : isSelected ? "incorrect" : undefined;
            return (
              <button
                key={choice.id}
                type="button"
                className={state ? `activity-choice is-${state}` : "activity-choice"}
                disabled={picked !== null}
                aria-pressed={isSelected}
                onClick={() => choose(choice.id)}
              >
                <span>{choice.label}</span>
                {picked !== null && isCorrect ? <span className="activity-mark">Marked answer</span> : null}
                {picked !== null && isSelected && !isCorrect ? (
                  <span className="activity-mark">Your choice</span>
                ) : null}
              </button>
            );
          })}
        </div>
        {picked && selected ? (
          <p className="activity-feedback" ref={feedbackRef} tabIndex={-1} role="status">
            <strong>{correct ? activity.correctLead : activity.incorrectLead}</strong> {question.explanation}
          </p>
        ) : null}
        <div className="activity-actions">
          <button type="button" className="button" onClick={next} disabled={picked === null}>
            {last ? "See results" : "Next question"}
          </button>
          <a className="button button-secondary" href="/activities">
            Back to activities
          </a>
        </div>
      </div>
    </article>
  );
}
