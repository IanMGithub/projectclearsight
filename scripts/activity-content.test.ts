import assert from "node:assert/strict";
import { activities, activityById } from "../src/content/activities.ts";
import { scoreAnswers, submitChoice, type ActivityQuestion } from "../src/content/activity-logic.ts";
import { contactEmail, progressCheckEmbedUrl, progressCheckUrl } from "../src/content/contact.ts";

assert.equal(activities.length, 3);
assert.deepEqual(
  activities.map((activity) => activity.title),
  ["Spot the Red Flag", "Pick the Best Next Step", "Fact, Opinion, or Not Enough Information?"],
);

for (const activity of activities) {
  assert.equal(activity.questions.length, 5, activity.id);
  const ids = new Set<string>();
  for (const question of activity.questions) {
    assert.equal(question.choices.length, 3, question.id);
    assert.equal(ids.has(question.id), false, question.id);
    ids.add(question.id);
    assert.ok(question.choices.some((choice) => choice.id === question.correctId), question.id);
    assert.ok(question.explanation.length > 0, question.id);
    assert.ok(question.prompt.length > 0, question.id);
  }
}

const sample = activities[0].questions[0] as ActivityQuestion;
const first = submitChoice(null, sample, sample.correctId);
assert.ok(first?.correct);
const repeat = submitChoice(first, sample, sample.choices[1].id);
assert.equal(repeat, first);
assert.equal(submitChoice(null, sample, "missing"), null);

const scored = scoreAnswers([
  { questionId: "a", choiceId: "1", correct: true },
  { questionId: "a", choiceId: "2", correct: false },
  { questionId: "b", choiceId: "1", correct: false },
]);
assert.deepEqual(scored, { correct: 1, answered: 2 });

assert.equal(activityById("spot-the-red-flag")?.title, "Spot the Red Flag");
assert.equal(activityById("missing"), null);
assert.equal(activityById(null), null);

assert.equal(contactEmail, "clearsight.initiative@gmail.com");
assert.equal(
  progressCheckUrl,
  "https://docs.google.com/forms/d/e/1FAIpQLSeIdoqNMeng1ggHpcD_J-AJ6TJ9cEzb182iFVscW_J9jiI2LQ/viewform",
);
assert.equal(progressCheckEmbedUrl, `${progressCheckUrl}?embedded=true`);

console.log("activity content ok");
