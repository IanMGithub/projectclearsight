/**
 * Editable homepage content.
 *
 * Logo: public/logo.png
 *   Replace that file directly, or replace brand/logo-source.png and run `npm run logo`.
 * Colors: src/styles/theme.css
 * Survey figures, draft status, dates, pillar availability, and social links: this file.
 */

import { isHttpUrl } from "./links.ts";

export const brand = {
  name: "ClearSight",
  catchphrase: "Strengthening digital literacy in an AI-driven world.",
  heroSupport:
    "Helping you question what you see, evaluate sources, and verify information before trusting or sharing it.",
  logo: {
    src: "/logo.png",
    width: 379,
    height: 379,
  },
} as const;

export const navigation = [
  { id: "home", href: "/", label: "Home" },
  { id: "learn", href: "/learn", label: "Learn" },
  { id: "challenge", href: "/challenge", label: "Test" },
] as const;

export type SitePage = (typeof navigation)[number]["id"];

/** Match a pathname to a site page. Unknown paths stay on the homepage. */
export function currentPage(pathname: string): SitePage {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const match = navigation.find((item) => item.href === path);
  return match?.id ?? "home";
}

export const heroActions = {
  primary: { href: "#the-problem", label: "Explore the Issue" },
  secondary: { href: "#our-mission", label: "Our Mission" },
} as const;

export type SurveyStatus = "draft" | "reported";

export type SurveyStatistic = {
  id: string;
  percent: number;
  label: string;
};

export type HighlightFigure = {
  id: string;
  lead: string;
  value: string;
  label: string;
  /** Source and interpretation. Not an audit or a scored-test result. */
  context: string;
};

export type SurveyDetails = {
  /** "draft" shows placeholder disclosures. "reported" uses paper-draft figures. */
  status: SurveyStatus;
  sampleSize: number;
  /** ISO date (YYYY-MM-DD). Leave null until collection dates are known. */
  collectionStart: string | null;
  /** ISO date (YYYY-MM-DD). Leave null until collection dates are known. */
  collectionEnd: string | null;
  /** Quoted question wording. Leave null until it can be stated accurately. */
  questionWording: string | null;
  statistics: SurveyStatistic[];
  instructionGap: HighlightFigure;
};

/**
 * Community-survey figures from the ClearSight paper draft.
 * They are not independently audited. Do not add a percentage the draft
 * does not state, and do not turn "about eight in ten" into a scored-test result.
 * The draft does not give a geography, collection dates, or question wording.
 */
export const survey: SurveyDetails = {
  status: "reported",
  sampleSize: 283,
  collectionStart: null,
  collectionEnd: null,
  questionWording: null,
  statistics: [
    {
      id: "misleading-content",
      percent: 64,
      label: "of respondents reported regularly encountering misleading content online.",
    },
    {
      id: "online-daily",
      percent: 96,
      label: "of respondents reported going online daily.",
    },
  ],
  instructionGap: {
    id: "cannot-distinguish",
    lead: "About",
    value: "8 in 10",
    label:
      "respondents reported being unable to distinguish a genuine image from an AI-generated one.",
    context:
      "ClearSight community survey, 283 responses. This is what people reported about their own ability, not the result of a scored test.",
  },
};

export const draftSurveyNotice =
  "Draft survey preview — all percentages and the sample size below are placeholders, not finalized findings.";

export const surveyReportingNote =
  "Survey results will be updated after responses are collected and reviewed. Final reporting will include the sample size, collection dates, and relevant question wording.";

export function surveyFraming(details: SurveyDetails): string {
  const summary = `ClearSight community survey, ${details.sampleSize} responses`;
  if (details.status === "draft") {
    return `Placeholder survey summary: ${summary}`;
  }
  return summary;
}

export function instructionGapDisclosure(details: SurveyDetails): string | null {
  if (details.status !== "draft") return null;
  return "Draft placeholder — not a finalized survey finding.";
}

function formatIsoDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function surveyUpdateNote(details: SurveyDetails): string | null {
  if (details.status === "draft") return surveyReportingNote;
  if (!details.collectionStart || !details.collectionEnd) return null;

  const wording = details.questionWording?.trim();
  const wordingSentence = wording ? ` Question wording: ${wording}` : "";
  return `Collected ${formatIsoDate(details.collectionStart)}–${formatIsoDate(details.collectionEnd)}. ClearSight community survey, ${details.sampleSize} responses.${wordingSentence}`;
}

export const problem = {
  id: "the-problem",
  heading:
    "Online information is everywhere. Knowing what to trust isn’t always easy.",
  emphasis:
    "A convincing post can leave you wondering what to trust—and what to share. Recognizing that something might be misleading is only the beginning; knowing how to check it is the next step.",
} as const;

export const mission = {
  id: "our-mission",
  heading: "Our Mission",
  statement:
    "ClearSight’s mission is to raise awareness of misleading online information and empower community members to make thoughtful, evidence-based decisions about what they trust and share.",
} as const;

/**
 * Canonical purpose statement. The site has no separate purpose section.
 * Keep introductory copy consistent with this statement instead of adding a new section.
 */
export const purpose =
  "ClearSight’s purpose is to raise awareness of misleading online information and help community members develop practical verification skills. Through educational videos, linked articles, interactive website activities, and an in-person workshop, the project introduces strategies for investigating sources, checking context, and comparing supporting evidence. By pairing explanations with opportunities for practice, ClearSight aims to turn awareness into action and make verification a more deliberate part of participants’ everyday online decisions.";

export type Pillar = {
  id: string;
  label: string;
  title: string;
  description: string;
  /** True only when this offering is actually available. */
  available: boolean;
  /** http(s) destination. A link renders only when available is true and this is a real URL. */
  url: string | null;
  /** In-site path. Renders as a normal link and does not mark unrelated offerings as available. */
  internalPath: string | null;
  ctaLabel: string;
};

export const pillars = {
  id: "how-you-can-learn",
  heading: "Three ways to build a clearer perspective.",
  intro:
    "ClearSight is built around short videos, hands-on learning, and opportunities to keep practicing.",
  reach:
    "Recorded by the end of the Grow phase: 300,000 cumulative video views and 500 website visits. Project figures reported in the ClearSight paper draft. These are recorded counts, not unique people reached, current live analytics, or evidence that verification skills improved.",
  items: [
    {
      id: "watch",
      label: "Watch & Learn",
      title: "Small videos. Thoughtful questions.",
      description:
        "More than 100 educational videos have been published on Instagram, TikTok, and YouTube, the platforms survey respondents most commonly reported using. This page does not yet link to those accounts.",
      available: false,
      url: null,
      internalPath: null,
      ctaLabel: "Watch the videos",
    },
    {
      id: "workshop",
      label: "Learn Together",
      title: "Put your thinking into practice.",
      description:
        "An in-person workshop had more than 25 registrations and approximately 25 participants. Those counts are separate, so this is not an exact attendance total. Details for another session are not posted yet.",
      available: false,
      url: null,
      internalPath: null,
      ctaLabel: "Workshop details",
    },
    {
      id: "practice",
      label: "Keep Practicing",
      title: "Build skills beyond the first lesson.",
      description:
        "Compare a photograph with an AI-generated image, then decide what else you would check.",
      available: false,
      url: null,
      internalPath: "/challenge",
      ctaLabel: "Test",
    },
  ] satisfies Pillar[],
};

export const takeaway = {
  heading: "Pause. Investigate. Verify.",
  steps: [
    {
      id: "pause",
      title: "Pause",
      description: "Before trusting or sharing a post, take a moment to question the claim.",
    },
    {
      id: "investigate",
      title: "Investigate",
      description:
        "Look for the original source, check the context, and consider what evidence is available.",
    },
    {
      id: "verify",
      title: "Verify",
      description:
        "Compare reliable sources—and recognize when there isn’t enough evidence to reach a conclusion.",
    },
  ],
} as const;

export const instructionGapCopy = {
  heading: "Telling a real image from an AI-generated one was not easy.",
  closing: "That’s the gap ClearSight aims to help close.",
} as const;

export type SocialLink = {
  id: "instagram" | "tiktok" | "youtube";
  name: string;
  /** Full profile URL. Leave null until a real URL exists. Do not invent a handle. */
  url: string | null;
};

export const stayConnected = {
  heading: "Stay Connected",
  body: "Follow ClearSight for project updates, educational content, and opportunities to get involved.",
  pendingLabel: "Social links coming soon.",
  links: [
    { id: "instagram", name: "Instagram", url: null },
    { id: "tiktok", name: "TikTok", url: null },
    { id: "youtube", name: "YouTube", url: null },
  ] satisfies SocialLink[],
};

export function activeSocialLinks(links: readonly SocialLink[]): Array<SocialLink & { url: string }> {
  return links.flatMap((link) => (isHttpUrl(link.url) ? [{ ...link, url: link.url }] : []));
}

export const footer = {
  tagline:
    "A student-led initiative helping people build more informed, responsible digital habits.",
} as const;
