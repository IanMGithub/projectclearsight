import {
  challengePairs,
  type ChallengeImage,
  type ChallengePair,
  type ImageKind,
} from "./challenge-pairs.ts";

export type { ChallengeImage, ChallengePair, ImageKind };
export { challengePairs };

export const learningReminder =
  "Visual judgment is only one part of verification. Sources, context, and supporting evidence matter too.";

export const resultsReminder =
  "This score reflects your choices in this image challenge—not your overall ability to verify online information. Checking sources and context still matters.";

export type SessionRound = {
  pairId: string;
  subject: string;
  explanation: string;
  verificationTakeaway: string;
  /** Display order for this session. Index 0 is Image A and index 1 is Image B. */
  images: readonly [ChallengeImage, ChallengeImage];
};

export type SubmittedAnswer = {
  pairId: string;
  subject: string;
  selectedId: string;
  correct: boolean;
  explanation: string;
  verificationTakeaway: string;
  images: readonly [ChallengeImage, ChallengeImage];
};

export type ScoreSummary = {
  correct: number;
  scored: number;
  skipped: number;
  /** Null when no rounds were scored, so callers do not divide by zero. */
  percentage: number | null;
};

export function datasetIssues(pairs: readonly ChallengePair[]): string[] {
  const issues: string[] = [];
  const pairIds = new Set<string>();
  const imageIds = new Set<string>();

  for (const pair of pairs) {
    if (!pair.id.trim()) issues.push("A pair is missing an id.");
    if (pairIds.has(pair.id)) issues.push(`Duplicate pair id ${pair.id}.`);
    pairIds.add(pair.id);

    if (pair.images.length !== 2) {
      issues.push(`${pair.id || "A pair"} must contain exactly two images.`);
    }

    let photos = 0;
    let generated = 0;
    for (const image of pair.images) {
      if (!image.id.trim()) issues.push(`${pair.id} has an image without an id.`);
      if (imageIds.has(image.id)) issues.push(`Duplicate image id ${image.id}.`);
      imageIds.add(image.id);
      if (!image.src.trim()) issues.push(`${image.id || pair.id} is missing an image path.`);
      if (image.kind === "photo") photos += 1;
      else if (image.kind === "ai") generated += 1;
      else issues.push(`${image.id} has an unknown kind.`);
    }

    if (pair.images.length === 2 && (photos !== 1 || generated !== 1)) {
      issues.push(`${pair.id} must contain exactly one photo and one AI image.`);
    }
  }

  return issues;
}

export function validChallengePairs(pairs: readonly ChallengePair[]): ChallengePair[] {
  const imageIds = new Set<string>();
  const valid: ChallengePair[] = [];

  for (const pair of pairs) {
    if (datasetIssues([pair]).length > 0) continue;
    if (valid.some((item) => item.id === pair.id)) continue;
    if (pair.images.some((image) => imageIds.has(image.id))) continue;
    valid.push(pair);
    for (const image of pair.images) imageIds.add(image.id);
  }

  return valid;
}

/**
 * One session: each valid pair once, in shuffled order, with A/B placement
 * shuffled independently. The returned rounds are copies; the dataset is not mutated.
 * `random` must return a number in [0, 1), like Math.random.
 */
export function createChallengeSession(
  pairs: readonly ChallengePair[] = challengePairs,
  random: () => number = Math.random,
): SessionRound[] {
  return shuffle(validChallengePairs(pairs), random).map((pair) => {
    const [first, second] = shuffle(pair.images, random);
    return {
      pairId: pair.id,
      subject: pair.subject,
      explanation: pair.explanation,
      verificationTakeaway: pair.verificationTakeaway,
      images: [first, second],
    };
  });
}

/** Records an answer once. A second call for the same pair returns the same list. */
export function submitAnswer(
  answers: readonly SubmittedAnswer[],
  round: SessionRound,
  selectedId: string,
): SubmittedAnswer[] {
  if (answers.some((answer) => answer.pairId === round.pairId)) return [...answers];
  const selected = round.images.find((image) => image.id === selectedId);
  if (!selected) return [...answers];

  return [
    ...answers,
    {
      pairId: round.pairId,
      subject: round.subject,
      selectedId,
      correct: selected.kind === "photo",
      explanation: round.explanation,
      verificationTakeaway: round.verificationTakeaway,
      images: round.images,
    },
  ];
}

export function scoreSession(answers: readonly SubmittedAnswer[], skipped: number): ScoreSummary {
  const scored = answers.length;
  const correct = answers.filter((answer) => answer.correct).length;
  return {
    correct,
    scored,
    skipped,
    percentage: scored === 0 ? null : Math.round((correct / scored) * 100),
  };
}

function shuffle<T>(items: readonly T[], random: () => number): T[] {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swap = Math.min(index, Math.floor(random() * (index + 1)));
    const current = next[index];
    next[index] = next[swap];
    next[swap] = current;
  }
  return next;
}
