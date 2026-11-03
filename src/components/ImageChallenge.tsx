import { useEffect, useId, useRef, useState, type FormEvent, type RefObject } from "react";
import { isHttpUrl } from "../content/links.ts";
import {
  challengePairs,
  createChallengeSession,
  learningReminder,
  resultsReminder,
  scoreSession,
  submitAnswer,
  validChallengePairs,
  type ChallengeImage,
  type SessionRound,
  type SubmittedAnswer,
} from "../content/challenge.ts";
import { ExternalLink } from "./ExternalLink.tsx";

type Phase = "intro" | "answering" | "feedback" | "results";
type LoadState = "loading" | "ready" | "error";

const readyPairs = validChallengePairs(challengePairs);

export function ImageChallenge() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [rounds, setRounds] = useState<SessionRound[]>([]);
  const [index, setIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<SubmittedAnswer[]>([]);
  const [skipped, setSkipped] = useState(0);
  const [reviewing, setReviewing] = useState(false);
  const [loads, setLoads] = useState<Record<string, LoadState>>({});
  const [attempt, setAttempt] = useState(0);
  const roundHeadingRef = useRef<HTMLHeadingElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLHeadingElement>(null);
  const submitting = useRef(false);

  const round = rounds[index];
  const total = rounds.length;
  const score = scoreSession(answers, skipped);

  useEffect(() => {
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const previousTitle = document.title;
    const previousOgTitle = ogTitle?.getAttribute("content") ?? null;
    document.title = "Test | ClearSight";
    ogTitle?.setAttribute("content", "Test | ClearSight");
    return () => {
      document.title = previousTitle;
      if (previousOgTitle) ogTitle?.setAttribute("content", previousOgTitle);
    };
  }, []);

  useEffect(() => {
    submitting.current = false;
  }, [index, phase]);

  useEffect(() => {
    const next = rounds[index + 1];
    if (!next) return;
    for (const image of next.images) {
      const preload = new Image();
      preload.src = image.src;
    }
  }, [rounds, index]);

  useEffect(() => {
    if (phase === "answering") roundHeadingRef.current?.focus();
    if (phase === "feedback") feedbackRef.current?.focus();
    if (phase === "results") resultsRef.current?.focus();
  }, [phase, index, reviewing]);

  function start() {
    const session = createChallengeSession(readyPairs);
    setRounds(session);
    setIndex(0);
    setSelectedId(null);
    setAnswers([]);
    setSkipped(0);
    setReviewing(false);
    setLoads({});
    setAttempt(0);
    setPhase(session.length === 0 ? "intro" : "answering");
  }

  function markLoad(id: string, state: LoadState) {
    setLoads((current) => (current[id] === state ? current : { ...current, [id]: state }));
  }

  function retryImages() {
    if (!round) return;
    setLoads((current) => {
      const next = { ...current };
      for (const image of round.images) delete next[image.id];
      return next;
    });
    setAttempt((current) => current + 1);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!round || phase !== "answering" || submitting.current) return;
    if (!selectedId || !imagesReady(round, loads)) return;
    submitting.current = true;
    setAnswers((current) => submitAnswer(current, round, selectedId));
    setPhase("feedback");
  }

  function skipPair() {
    if (!round || phase !== "answering" || submitting.current) return;
    submitting.current = true;
    setSkipped((current) => current + 1);
    setSelectedId(null);
    if (index + 1 >= rounds.length) setPhase("results");
    else setIndex((current) => current + 1);
  }

  function continueRound() {
    if (submitting.current) return;
    submitting.current = true;
    setSelectedId(null);
    if (index + 1 >= rounds.length) setPhase("results");
    else {
      setIndex((current) => current + 1);
      setPhase("answering");
    }
  }

  return (
    <article className="section challenge">
      <div className="wrap">
        {phase === "results" ? (
          <Results
            headingRef={resultsRef}
            score={score}
            answers={answers}
            reviewing={reviewing}
            onReview={() => setReviewing(true)}
            onBack={() => setReviewing(false)}
            onRestart={start}
          />
        ) : (
          <>
            <h1 className="section-heading" id="challenge-heading">
              Can you spot the real photograph?
            </h1>
            {phase === "intro" ? (
              <Intro hasPairs={readyPairs.length > 0} onStart={start} />
            ) : null}
            {round && (phase === "answering" || phase === "feedback") ? (
              <Round
                round={round}
                index={index}
                total={total}
                phase={phase}
                selectedId={selectedId}
                loads={loads}
                attempt={attempt}
                headingRef={roundHeadingRef}
                feedbackRef={feedbackRef}
                answer={answers.find((item) => item.pairId === round.pairId)}
                onSelect={setSelectedId}
                onSubmit={submit}
                onRetry={retryImages}
                onSkip={skipPair}
                onContinue={continueRound}
                onLoad={markLoad}
              />
            ) : null}
          </>
        )}
      </div>
    </article>
  );
}

function Intro({ hasPairs, onStart }: { hasPairs: boolean; onStart: () => void }) {
  return (
    <>
      <p className="challenge-intro">
        Two images. One real photograph. Choose the one you think is real, then check your answer
        and explore what you can learn.
      </p>
      <p className="challenge-note">
        Each pair contains one real photograph and one AI-generated image. Outside this challenge,
        images may also be edited, staged, or shared out of context.
      </p>
      {hasPairs ? (
        <button className="button challenge-start" type="button" onClick={onStart}>
          Start Challenge
        </button>
      ) : (
        <p className="challenge-note" role="status">
          No image pairs are ready for this challenge yet. Add image files to public/challenge and
          describe each pair in the local challenge dataset.
        </p>
      )}
      <p className="challenge-reminder">{learningReminder}</p>
    </>
  );
}

function Round({
  round,
  index,
  total,
  phase,
  selectedId,
  loads,
  attempt,
  headingRef,
  feedbackRef,
  answer,
  onSelect,
  onSubmit,
  onRetry,
  onSkip,
  onContinue,
  onLoad,
}: {
  round: SessionRound;
  index: number;
  total: number;
  phase: "answering" | "feedback";
  selectedId: string | null;
  loads: Record<string, LoadState>;
  attempt: number;
  headingRef: RefObject<HTMLHeadingElement | null>;
  feedbackRef: RefObject<HTMLDivElement | null>;
  answer: SubmittedAnswer | undefined;
  onSelect: (id: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onRetry: () => void;
  onSkip: () => void;
  onContinue: () => void;
  onLoad: (id: string, state: LoadState) => void;
}) {
  const legendId = useId();
  const locked = phase === "feedback";
  const failed = round.images.some((image) => loads[image.id] === "error");
  const ready = imagesReady(round, loads);
  const progress = `${((index + 1) / total) * 100}%`;

  return (
    <div className="challenge-round">
      <h2 ref={headingRef} tabIndex={-1}>
        Round {index + 1} of {total}
      </h2>
      <p className="challenge-subject">{round.subject}</p>
      <div
        className="challenge-progress"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={index + 1}
        aria-valuetext={`Round ${index + 1} of ${total}`}
      >
        <span style={{ width: progress }} />
      </div>
      <form onSubmit={onSubmit}>
        <fieldset>
          <legend className="challenge-question" id={legendId}>
            Which image is the real photograph?
          </legend>
          <div className="challenge-choices">
            {round.images.map((image, imageIndex) => {
              const letter = imageIndex === 0 ? "A" : "B";
              const selected = selectedId === image.id;
              return (
                <label
                  key={image.id}
                  className={selected ? "challenge-choice is-selected" : "challenge-choice"}
                >
                  <span className="challenge-frame">
                    <img
                      key={`${image.id}-${attempt}`}
                      src={image.src}
                      width={image.width}
                      height={image.height}
                      alt={image.alt}
                      decoding="async"
                      onLoad={() => onLoad(image.id, "ready")}
                      onError={() => onLoad(image.id, "error")}
                    />
                  </span>
                  <span className="challenge-choice-label">
                    <input
                      type="radio"
                      name={`round-${round.pairId}`}
                      value={image.id}
                      checked={selected}
                      disabled={locked}
                      onChange={() => onSelect(image.id)}
                    />
                    Image {letter}
                  </span>
                  <span className="challenge-choice-status">{!locked && selected ? "Selected" : "\u00a0"}</span>
                  <span className="challenge-choice-kind">
                    {locked ? (
                      <>
                        {image.kind === "photo" ? "Real photograph" : "AI-generated image"}
                        {selected ? " · Your choice" : ""}
                      </>
                    ) : (
                      "\u00a0"
                    )}
                  </span>
                  {locked ? <ImageCredit image={image} /> : null}
                </label>
              );
            })}
          </div>
        </fieldset>
        {failed ? (
          <p className="challenge-error" role="alert">
            One of these images didn’t load, so this pair can’t be scored yet.
          </p>
        ) : null}
        {locked && answer ? <Feedback answer={answer} feedbackRef={feedbackRef} /> : null}
        <div className="challenge-actions">
          {phase === "answering" ? (
            <button className="button" type="submit" disabled={!selectedId || !ready || failed}>
              Check Answer
            </button>
          ) : (
            <button className="button" type="button" onClick={onContinue}>
              {index + 1 === total ? "See Results" : "Next Pair"}
            </button>
          )}
          {phase === "answering" && failed ? (
            <>
              <button className="button button-secondary" type="button" onClick={onRetry}>
                Retry
              </button>
              <button className="button button-secondary" type="button" onClick={onSkip}>
                Skip this pair
              </button>
            </>
          ) : null}
        </div>
      </form>
    </div>
  );
}

function Feedback({
  answer,
  feedbackRef,
}: {
  answer: SubmittedAnswer;
  feedbackRef: RefObject<HTMLDivElement | null>;
}) {
  const takeaway = answer.verificationTakeaway.trim() || learningReminder;
  const explanation = answer.explanation.trim();

  return (
    <div className="challenge-feedback" ref={feedbackRef} tabIndex={-1} role="status">
      <h3>
        <ResultIcon correct={answer.correct} />
        {answer.correct ? "Correct" : "Not quite"}
      </h3>
      <p>
        {answer.correct
          ? "You selected the real photograph."
          : "You selected the AI-generated image. The other image is the real photograph."}
      </p>
      {explanation ? <p>{explanation}</p> : null}
      <p>{takeaway}</p>
    </div>
  );
}

function Results({
  headingRef,
  score,
  answers,
  reviewing,
  onReview,
  onBack,
  onRestart,
}: {
  headingRef: RefObject<HTMLHeadingElement | null>;
  score: ReturnType<typeof scoreSession>;
  answers: readonly SubmittedAnswer[];
  reviewing: boolean;
  onReview: () => void;
  onBack: () => void;
  onRestart: () => void;
}) {
  return (
    <>
      <h1 className="section-heading" ref={headingRef} tabIndex={-1}>
        Your Results
      </h1>
      {score.scored === 0 ? (
        <p className="challenge-intro">No pairs were scored in this session.</p>
      ) : (
        <>
          <p className="challenge-score">
            {score.correct} of {score.scored} correct
          </p>
          <p className="challenge-intro">{score.percentage}% of scored rounds.</p>
          <p className="challenge-note">
            {score.correct === score.scored
              ? "You identified every scored photograph in this session."
              : "You can look back at each choice and see which image was the photograph."}
          </p>
        </>
      )}
      {score.skipped > 0 ? (
        <p className="challenge-note">
          {score.skipped === 1 ? "1 pair was skipped" : `${score.skipped} pairs were skipped`} because
          an image didn’t load. Skipped pairs are not part of the score.
        </p>
      ) : null}
      <p className="challenge-reminder">{resultsReminder}</p>
      <div className="challenge-actions">
        <button className="button" type="button" onClick={onRestart}>
          Try Again
        </button>
        {answers.length > 0 && !reviewing ? (
          <button className="button button-secondary" type="button" onClick={onReview}>
            Review Answers
          </button>
        ) : null}
        {reviewing ? (
          <button className="button button-secondary" type="button" onClick={onBack}>
            Back to results
          </button>
        ) : null}
      </div>
      {reviewing ? <Review answers={answers} /> : null}
    </>
  );
}

function Review({ answers }: { answers: readonly SubmittedAnswer[] }) {
  return (
    <ol className="challenge-review">
      {answers.map((answer, answerIndex) => (
        <li key={answer.pairId}>
          <h2>
            {answerIndex + 1}. {answer.subject}
          </h2>
          <p>
            <ResultIcon correct={answer.correct} />
            {answer.correct ? "Correct" : "Not quite"}
          </p>
          <div className="challenge-choices">
            {answer.images.map((image, imageIndex) => (
              <figure key={image.id} className="challenge-choice">
                <span className="challenge-frame">
                  <img src={image.src} width={image.width} height={image.height} alt={image.alt} />
                </span>
                <figcaption>
                  <span className="challenge-choice-label">Image {imageIndex === 0 ? "A" : "B"}</span>
                  <KindLabel image={image} selected={image.id === answer.selectedId} />
                  <ImageCredit image={image} />
                </figcaption>
              </figure>
            ))}
          </div>
          {answer.explanation.trim() ? <p>{answer.explanation}</p> : null}
        </li>
      ))}
    </ol>
  );
}

function KindLabel({ image, selected }: { image: ChallengeImage; selected: boolean }) {
  return (
    <span className="challenge-choice-kind">
      {image.kind === "photo" ? "Real photograph" : "AI-generated image"}
      {selected ? " · Your choice" : ""}
    </span>
  );
}

function ImageCredit({ image }: { image: ChallengeImage }) {
  const details = [image.creator, image.generationTool].map((value) => value.trim()).filter(Boolean);
  const sourceName = image.sourceName.trim();
  const sourceUrl = image.sourceUrl.trim();
  if (details.length === 0 && !sourceName && !sourceUrl) return null;

  return (
    <span className="challenge-credit">
      {details.join(" · ")}
      {details.length > 0 && (sourceName || sourceUrl) ? " · " : null}
      {isHttpUrl(sourceUrl) ? (
        <ExternalLink href={sourceUrl}>{sourceName || sourceUrl}</ExternalLink>
      ) : (
        sourceName || sourceUrl
      )}
    </span>
  );
}

function ResultIcon({ correct }: { correct: boolean }) {
  return correct ? (
    <svg className="challenge-icon" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M4 10.5 8 14.5 16 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg className="challenge-icon" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M6 6 14 14M14 6 6 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function imagesReady(round: SessionRound, loads: Record<string, LoadState>): boolean {
  return round.images.every((image) => loads[image.id] === "ready");
};
