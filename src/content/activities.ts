import type { ActivityQuestion } from "./activity-logic.ts";

export type PracticeActivity = {
  id: string;
  title: string;
  description: string;
  /** Extra guidance shown before the first question. */
  before?: string;
  correctLead: string;
  incorrectLead: string;
  takeaway: string;
  questions: readonly ActivityQuestion[];
};

const fact = "Checkable factual claim";
const opinion = "Opinion";
const insufficient = "Not enough information";

export const activities = [
  {
    id: "spot-the-red-flag",
    title: "Spot the Red Flag",
    description: "Look at a fictional post and identify the strongest reason to pause and investigate.",
    correctLead: "Correct.",
    incorrectLead: "Not the strongest reason to pause.",
    takeaway:
      "A red flag is a reason to investigate. It is not proof that the entire claim is false.",
    questions: [
      {
        id: "unsupported-number",
        prompt:
          "A fictional neighborhood post says: “9 out of 10 local shoppers switched stores last month.” It names no survey, organization, or method.",
        choices: [
          { id: "source", label: "The number is presented with no identifiable source." },
          { id: "length", label: "The post is only two sentences long." },
          { id: "wording", label: "The message uses everyday language." },
        ],
        correctId: "source",
        explanation:
          "A specific figure with no identifiable source is a reason to pause and look for the original evidence. That red flag does not prove the claim is false. The “9 out of 10” figure is only what this fictional post says.",
      },
      {
        id: "share-pressure",
        prompt:
          "A fictional post says: “Send this to five people before midnight or the warning will not reach them.” It gives no report, date, or source for the warning.",
        choices: [
          { id: "pressure", label: "It pressures you to share immediately instead of checking." },
          { id: "short", label: "It is written as a short message." },
          { id: "word", label: "It uses the word “warning.”" },
        ],
        correctId: "pressure",
        explanation:
          "Pressure to share before you can check is a reason to slow down. It is not proof that the warning itself is false.",
      },
      {
        id: "old-as-current",
        prompt:
          "A fictional post says “Happening now: the harbor bridge is closed.” Under that line is a news clipping dated May 12, 2021, about a closure after a storm that week.",
        choices: [
          { id: "old", label: "An old report is being presented as if it is happening now." },
          { id: "bridge", label: "The post mentions a bridge." },
          { id: "layout", label: "The clipping is shown underneath the new line." },
        ],
        correctId: "old",
        explanation:
          "When an older report is framed as current, check the date and whether the situation changed. The clipping may have been accurate in 2021. The mismatch is a reason to investigate, not proof that nothing in it was ever true.",
      },
      {
        id: "headline-gap",
        prompt:
          "A fictional article headline says “City bans all weekend markets.” The paragraph under it says a committee will discuss moving one market to a different street.",
        choices: [
          { id: "stronger", label: "The headline makes a stronger claim than the text supports." },
          { id: "committee", label: "The paragraph mentions a committee." },
          { id: "shorter", label: "The headline is shorter than the paragraph." },
        ],
        correctId: "stronger",
        explanation:
          "Read the text before accepting the headline’s broader claim. The gap is a reason to pause. It does not prove that the meeting, or every detail in the paragraph, is false.",
      },
      {
        id: "popularity",
        prompt:
          "A fictional post says: “This must be true — 40,000 people liked it.” The post never states a source or what, exactly, those people liked.",
        choices: [
          { id: "likes", label: "Popularity is offered as the main reason to believe it." },
          { id: "round", label: "The like count is a round number." },
          { id: "reader", label: "The post speaks directly to the reader." },
        ],
        correctId: "likes",
        explanation:
          "A large reaction is not evidence that a claim is accurate. Treat popularity as a reason to ask what was shown and where it came from, not as proof the claim is false. The like count is part of this fictional example.",
      },
    ],
  },
  {
    id: "best-next-step",
    title: "Pick the Best Next Step",
    description: "A questionable claim appears in your feed. What is the most useful thing to do next?",
    correctLead: "Correct.",
    incorrectLead: "Not the most useful next step.",
    takeaway:
      "A useful next step checks a source, date, full text, independent evidence, or original context. Popularity, appearance, and comments do not establish that a claim is accurate.",
    questions: [
      {
        id: "trace-quote",
        prompt:
          "A fictional post says a hospital director told a reporter, “We turned away half of our patients yesterday.” The post does not link to an interview, statement, or recording.",
        choices: [
          { id: "original", label: "Search for the original interview or statement and compare the wording." },
          { id: "share", label: "Share the post so more people can say whether it sounds right." },
          { id: "comments", label: "Use the number of agreeing comments as your check." },
        ],
        correctId: "original",
        explanation:
          "The original source shows whether those words were said and in what context. Comments and resharing do not establish the quote. “Half of our patients” is the post’s claim, not a confirmed figure.",
      },
      {
        id: "check-date",
        prompt:
          "Someone reposts a fictional article labeled “New warning today.” The article page shows a publication date from six years ago and no note that it was updated.",
        choices: [
          { id: "date", label: "Check the publication date and whether the page says it was updated." },
          { id: "layout", label: "Trust it because the page uses a formal layout." },
          { id: "tone", label: "Decide from how alarming the title sounds." },
        ],
        correctId: "date",
        explanation:
          "Checking the date tells you whether “today” matches when the piece was published. A formal look and a dramatic title do not establish that the warning is current.",
      },
      {
        id: "beyond-headline",
        prompt:
          "You see a fictional headline: “School lunches found unsafe.” You have not opened the article, and the headline is all that appears in the feed.",
        choices: [
          { id: "open", label: "Open the article and read what was examined, where, and by whom." },
          { id: "headline", label: "Treat the headline as the complete finding." },
          { id: "friends", label: "See whether friends reposted it before you read further." },
        ],
        correctId: "open",
        explanation:
          "The article may describe a narrower result than the headline. Reading it is the useful next step. A headline, or a friend’s repost, does not establish what was found.",
      },
      {
        id: "compare-evidence",
        prompt:
          "A fictional product page for “Northline Bottle” says the bottle “removes 99% of kitchen germs.” The page shows no study, lab, or method. This 99% figure is the ad’s claim, not a verified result.",
        choices: [
          {
            id: "independent",
            label: "Look for an independent test and compare what it measured with the ad’s claim.",
          },
          { id: "charts", label: "Rely on the scientific-looking charts drawn on the page." },
          { id: "stars", label: "Use the star rating as the evidence." },
        ],
        correctId: "independent",
        explanation:
          "An independent test can show whether that result was measured, and under what conditions. Charts in the ad and star ratings do not establish the 99% claim.",
      },
      {
        id: "image-context",
        prompt:
          "A fictional post shows a photo of a crowded train platform captioned “This station today, after the new rule.” It gives no date, place, or link to where the photo first appeared.",
        choices: [
          { id: "earlier", label: "Look for an earlier copy of the photo or its original caption." },
          { id: "recent", label: "Accept the caption because the photo looks recent." },
          { id: "thread", label: "Choose the comment thread’s most popular explanation." },
        ],
        correctId: "earlier",
        explanation:
          "An earlier copy or the original caption can show when and where the photo was taken. How new it looks, and which comment is popular, does not establish the “today” claim.",
      },
    ],
  },
  {
    id: "fact-opinion-or-gap",
    title: "Fact, Opinion, or Not Enough Information?",
    description:
      "Decide whether you are looking at a checkable claim, an opinion, or a scenario that does not support the conclusion you were asked about.",
    before:
      "In this activity, “fact” means a factual claim that can be checked—not a guarantee that the statement is true. Opinions express preferences or judgments. Choose “Not enough information” when the scenario does not provide what you need to reach the requested conclusion.",
    correctLead: "Correct.",
    incorrectLead: "Not the matching label.",
    takeaway:
      "A checkable claim stays a factual claim even when it is unsupported or false. An opinion is a preference or a judgment. “Not enough information” means this scenario does not give what you need for the conclusion you were asked about.",
    questions: [
      {
        id: "library-hours",
        instruction: "Classify the statement. Do not decide whether it has already been verified.",
        prompt: "A fictional library notice says, “The reading room opens at 9 a.m. on Monday.”",
        choices: [
          { id: "fact", label: fact },
          { id: "opinion", label: opinion },
          { id: "gap", label: insufficient },
        ],
        correctId: "fact",
        explanation:
          "An opening time is a factual claim you could check against the notice or by observing the room. Calling it checkable does not mean this activity has confirmed it.",
      },
      {
        id: "unsupported-ad",
        instruction:
          "Classify the statement itself. The ad does not supply evidence, and the number is the ad’s claim, not a verified result.",
        prompt: "A fictional ad says, “Northline soap cuts colds in half.”",
        choices: [
          { id: "fact", label: fact },
          { id: "opinion", label: opinion },
          { id: "gap", label: insufficient },
        ],
        correctId: "fact",
        explanation:
          "“Cuts colds in half” is a claim someone could test, so it is still a checkable factual claim. Missing proof does not turn the statement into “not enough information” about what kind of claim it is, and it does not make the number true.",
      },
      {
        id: "map-preference",
        instruction: "Classify the statement.",
        prompt: "“I prefer the paper map, and I think its design is more pleasant than the new app.”",
        choices: [
          { id: "fact", label: fact },
          { id: "opinion", label: opinion },
          { id: "gap", label: insufficient },
        ],
        correctId: "opinion",
        explanation:
          "This states a personal preference and a judgment about what is pleasant. Preferences and value judgments are opinions, not claims you settle by checking a source.",
      },
      {
        id: "unnamed-quote",
        instruction: "Can you conclude from this scenario that a particular person said this?",
        prompt:
          "A fictional post says a coach promised every player a scholarship. It does not name the coach, the team, or where the promise was made.",
        choices: [
          { id: "fact", label: fact },
          { id: "opinion", label: opinion },
          { id: "gap", label: insufficient },
        ],
        correctId: "gap",
        explanation:
          "The scenario does not identify a source you could check, so you cannot conclude that a particular person said this. That limit is about the missing source, not a judgment that every scholarship claim is an opinion.",
      },
      {
        id: "undated-photo",
        instruction: "Can you conclude that this photo shows an event from today?",
        prompt:
          "A fictional post shows a photo of a flooded street and says it happened today. The post includes no date stamp, place, or original caption.",
        choices: [
          { id: "fact", label: fact },
          { id: "opinion", label: opinion },
          { id: "gap", label: insufficient },
        ],
        correctId: "gap",
        explanation:
          "Without a date, place, or original context, the scenario does not give what you need to conclude the photo shows today.",
      },
    ],
  },
] as const satisfies readonly PracticeActivity[];

export type ActivityId = (typeof activities)[number]["id"];

export function activityById(id: string | null): PracticeActivity | null {
  if (!id) return null;
  return activities.find((activity) => activity.id === id) ?? null;
}

export const activitiesMeta = {
  title: "Activities | ClearSight",
  description:
    "Practice checking fictional posts, choosing a useful next step, and telling a checkable claim from an opinion or a missing piece of context.",
} as const;
