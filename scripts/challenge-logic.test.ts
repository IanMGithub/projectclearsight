import assert from "node:assert/strict";
import {
  createChallengeSession,
  datasetIssues,
  scoreSession,
  submitAnswer,
  validChallengePairs,
  type ChallengePair,
  type SessionRound,
} from "../src/content/challenge.ts";

const photo = image("photo-a", "photo");
const ai = image("ai-b", "ai");
const pair: ChallengePair = {
  id: "pair-cup",
  subject: "Cup",
  explanation: "Leave blank in production until a real note exists.",
  verificationTakeaway: "",
  images: [photo, ai],
};

const originalFirst = pair.images[0];
const session = createChallengeSession([pair], sequence(0));
assert.equal(session.length, 1);
assert.equal(pair.images[0], originalFirst, "session creation must not mutate the dataset");
assert.equal(session[0]?.images[0].kind, "ai");
assert.equal(session[0]?.images[1].kind, "photo");

const photoOnRight = session[0] as SessionRound;
const scoredRight = submitAnswer([], photoOnRight, photo.id);
assert.equal(scoredRight[0]?.correct, true);
assert.equal(submitAnswer(scoredRight, photoOnRight, photo.id).length, 1, "repeat submit must not double-score");
assert.equal(submitAnswer([], photoOnRight, "missing").length, 0);

const photoOnLeft = submitAnswer(
  [],
  { ...photoOnRight, images: [photo, ai] },
  photo.id,
);
assert.equal(photoOnLeft[0]?.correct, true);
const missed = submitAnswer([], { ...photoOnRight, images: [photo, ai] }, ai.id);
assert.equal(missed[0]?.correct, false);
assert.deepEqual(
  missed[0]?.images.map((item) => item.id),
  ["photo-a", "ai-b"],
  "review keeps the displayed A/B order",
);

assert.equal(createChallengeSession([]).length, 0);
assert.equal(scoreSession([], 0).percentage, null);
assert.deepEqual(scoreSession(scoredRight, 2), { correct: 1, scored: 1, skipped: 2, percentage: 100 });
assert.equal(scoreSession([], 3).scored, 0);

const only = createChallengeSession([pair], () => 0);
assert.equal(only.length, 1);

const broken: ChallengePair = {
  id: "broken",
  subject: "Broken",
  explanation: "",
  verificationTakeaway: "",
  images: [photo, { ...ai, id: "also-photo", kind: "photo" }],
};
assert.ok(datasetIssues([broken]).length > 0);
assert.equal(validChallengePairs([pair, broken]).length, 1);
assert.equal(createChallengeSession([pair, broken], () => 0).length, 1);

const many = [pair, secondPair()];
for (let trial = 0; trial < 30; trial += 1) {
  const rounds = createChallengeSession(many);
  assert.equal(rounds.length, 2);
  assert.equal(new Set(rounds.map((round) => round.pairId)).size, 2);
  for (const round of rounds) {
    const kinds = round.images.map((item) => item.kind).sort();
    assert.deepEqual(kinds, ["ai", "photo"]);
  }
}

const realIssues = datasetIssues(
  (await import("../src/content/challenge-pairs.ts")).challengePairs,
);
assert.deepEqual(realIssues, []);

console.log("challenge logic ok");

function image(id: string, kind: "photo" | "ai"): ChallengePair["images"][number] {
  return {
    id,
    src: `/challenge/${id}.jpg`,
    width: 100,
    height: 100,
    alt: "Image of a cup.",
    kind,
    sourceName: "",
    sourceUrl: "",
    creator: "",
    generationTool: "",
  };
}

function secondPair(): ChallengePair {
  return {
    id: "pair-tree",
    subject: "Tree",
    explanation: "",
    verificationTakeaway: "",
    images: [
      { ...image("tree-ai", "ai"), alt: "Image of a tree." },
      { ...image("tree-photo", "photo"), alt: "Image of a tree." },
    ],
  };
}

function sequence(value: number): () => number {
  return () => value;
}
