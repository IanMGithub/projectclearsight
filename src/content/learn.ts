/**
 * Editable Learn page copy.
 * Article links live in src/content/articles.ts.
 */

export const learnPage = {
  title: "Learn to look beyond the first impression.",
  support:
    "Explore practical ways to investigate AI-generated content, check online claims, and make more informed decisions about what you trust and share.",
  guide: {
    id: "checking-guide",
    heading: "A quick guide to checking what you see",
    intro:
      "No single clue can tell you the whole story. Use these checks together, and recognize when there isn’t enough evidence to reach a conclusion.",
    clarification:
      "Missing provenance records do not prove AI use. A file’s creation history also does not, by itself, establish whether the claims attached to it are true.",
    items: [
      {
        id: "source",
        title: "Source",
        description:
          "Find the original creator or publisher. Check whether they disclose using AI and whether their identity is verifiable.",
      },
      {
        id: "claims",
        title: "Claims",
        description:
          "Check quotes, statistics, and references against their original sources. Inaccuracies matter, but don’t by themselves prove AI use.",
      },
      {
        id: "images",
        title: "Images",
        description:
          "Look for inconsistent reflections, repeated textures, or distorted details. Treat these as reasons to investigate—not proof; real photos can also contain artifacts.",
      },
      {
        id: "earlier-versions",
        title: "Earlier versions",
        description:
          "Run a reverse-image search to find the original context or altered versions. No match does not establish that an image is AI-generated.",
      },
      {
        id: "file-history",
        title: "File history",
        description:
          "Look for Content Credentials or other provenance records showing how the file was created or edited.",
      },
      {
        id: "detectors",
        title: "Detectors",
        description:
          "Treat results as supporting clues, never as a verdict or grounds for an accusation.",
      },
    ],
  },
  articles: {
    id: "articles",
    heading: "Explore our articles",
    support:
      "More than 10 educational articles are published on Medium. The cards below link a selection, not the full set. ClearSight also worked with TheKairosTimes to publish a paper on digital literacy and media safety.",
  },
  practice: {
    heading: "Ready to practice?",
    support:
      "Put your visual judgment to the test. Remember: checking sources and context still matters.",
    cta: "Test",
    href: "/challenge",
  },
} as const;

export const learnMeta = {
  title: "Learn | ClearSight",
  description:
    "Explore ClearSight’s practical guide and articles on AI-generated content, online claims, and responsible sharing.",
} as const;
