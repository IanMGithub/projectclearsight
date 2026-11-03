/**
 * Editable image-challenge dataset.
 *
 * This is a low-stakes practice activity. The answers live in this file and
 * can be inspected in the browser. Do not describe them as hidden or secure.
 *
 * Image files:
 *   public/challenge/
 *   Reference them as /challenge/pair-01-a.jpg (lowercase extension, actual format).
 *   The current files are JPEG bytes. Do not rename them back to the original
 *   Real/Fake filenames.
 *
 * Answer mapping for review, outside the site bundle:
 *   data/challenge-image-mapping.json
 *
 * Add a pair by appending an object below. Each pair needs exactly two images,
 * one `kind: "photo"` and one `kind: "ai"`. Leave source fields, explanation,
 * and verificationTakeaway empty until those details are known. Do not invent them.
 */

export type ImageKind = "photo" | "ai";

export type ChallengeImage = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  kind: ImageKind;
  sourceName: string;
  sourceUrl: string;
  creator: string;
  generationTool: string;
};

export type ChallengePair = {
  id: string;
  subject: string;
  images: readonly [ChallengeImage, ChallengeImage];
  explanation: string;
  verificationTakeaway: string;
};

const blankCredit = {
  sourceName: "",
  sourceUrl: "",
  creator: "",
  generationTool: "",
} as const;

export const challengePairs = [
  {
    id: "pair-01",
    subject: "Burger",
    explanation: "",
    verificationTakeaway: "",
    images: [
      {
        id: "pair-01-a",
        src: "/challenge/pair-01-a.jpg",
        width: 1050,
        height: 1050,
        alt: "Image of a burger.",
        kind: "photo",
        ...blankCredit,
      },
      {
        id: "pair-01-b",
        src: "/challenge/pair-01-b.jpg",
        width: 1182,
        height: 1182,
        alt: "Image of a burger.",
        kind: "ai",
        ...blankCredit,
      },
    ],
  },
  {
    id: "pair-02",
    subject: "Cake",
    explanation: "",
    verificationTakeaway: "",
    images: [
      {
        id: "pair-02-a",
        src: "/challenge/pair-02-a.jpg",
        width: 1199,
        height: 1199,
        alt: "Image of a cake.",
        kind: "ai",
        ...blankCredit,
      },
      {
        id: "pair-02-b",
        src: "/challenge/pair-02-b.jpg",
        width: 1138,
        height: 1138,
        alt: "Image of a cake.",
        kind: "photo",
        ...blankCredit,
      },
    ],
  },
  {
    id: "pair-03",
    subject: "Cat",
    explanation: "",
    verificationTakeaway: "",
    images: [
      {
        id: "pair-03-a",
        src: "/challenge/pair-03-a.jpg",
        width: 1212,
        height: 1212,
        alt: "Image of a cat.",
        kind: "ai",
        ...blankCredit,
      },
      {
        id: "pair-03-b",
        src: "/challenge/pair-03-b.jpg",
        width: 1106,
        height: 1106,
        alt: "Image of a cat.",
        kind: "photo",
        ...blankCredit,
      },
    ],
  },
  {
    id: "pair-04",
    subject: "Clock",
    explanation: "",
    verificationTakeaway: "",
    images: [
      {
        id: "pair-04-a",
        src: "/challenge/pair-04-a.jpg",
        width: 1102,
        height: 1102,
        alt: "Image of a clock.",
        kind: "photo",
        ...blankCredit,
      },
      {
        id: "pair-04-b",
        src: "/challenge/pair-04-b.jpg",
        width: 1210,
        height: 1210,
        alt: "Image of a clock.",
        kind: "ai",
        ...blankCredit,
      },
    ],
  },
  {
    id: "pair-05",
    subject: "Cup",
    explanation: "",
    verificationTakeaway: "",
    images: [
      {
        id: "pair-05-a",
        src: "/challenge/pair-05-a.jpg",
        width: 1163,
        height: 1163,
        alt: "Image of a cup.",
        kind: "ai",
        ...blankCredit,
      },
      {
        id: "pair-05-b",
        src: "/challenge/pair-05-b.jpg",
        width: 1104,
        height: 1104,
        alt: "Image of a cup.",
        kind: "photo",
        ...blankCredit,
      },
    ],
  },
  {
    id: "pair-06",
    subject: "Dog",
    explanation: "",
    verificationTakeaway: "",
    images: [
      {
        id: "pair-06-a",
        src: "/challenge/pair-06-a.jpg",
        width: 647,
        height: 647,
        alt: "Image of a dog.",
        kind: "photo",
        ...blankCredit,
      },
      {
        id: "pair-06-b",
        src: "/challenge/pair-06-b.jpg",
        width: 1217,
        height: 1217,
        alt: "Image of a dog.",
        kind: "ai",
        ...blankCredit,
      },
    ],
  },
  {
    id: "pair-07",
    subject: "Flower",
    explanation: "",
    verificationTakeaway: "",
    images: [
      {
        id: "pair-07-a",
        src: "/challenge/pair-07-a.jpg",
        width: 1140,
        height: 1140,
        alt: "Image of a flower.",
        kind: "photo",
        ...blankCredit,
      },
      {
        id: "pair-07-b",
        src: "/challenge/pair-07-b.jpg",
        width: 1196,
        height: 1196,
        alt: "Image of a flower.",
        kind: "ai",
        ...blankCredit,
      },
    ],
  },
  {
    id: "pair-08",
    subject: "Pizza",
    explanation: "",
    verificationTakeaway: "",
    images: [
      {
        id: "pair-08-a",
        src: "/challenge/pair-08-a.jpg",
        width: 1088,
        height: 1088,
        alt: "Image of a pizza.",
        kind: "ai",
        ...blankCredit,
      },
      {
        id: "pair-08-b",
        src: "/challenge/pair-08-b.jpg",
        width: 1107,
        height: 1107,
        alt: "Image of a pizza.",
        kind: "photo",
        ...blankCredit,
      },
    ],
  },
  {
    id: "pair-09",
    subject: "Plant",
    explanation: "",
    verificationTakeaway: "",
    images: [
      {
        id: "pair-09-a",
        src: "/challenge/pair-09-a.jpg",
        width: 1000,
        height: 1000,
        alt: "Image of a plant.",
        kind: "photo",
        ...blankCredit,
      },
      {
        id: "pair-09-b",
        src: "/challenge/pair-09-b.jpg",
        width: 1233,
        height: 1233,
        alt: "Image of a plant.",
        kind: "ai",
        ...blankCredit,
      },
    ],
  },
  {
    id: "pair-10",
    subject: "Tree",
    explanation: "",
    verificationTakeaway: "",
    images: [
      {
        id: "pair-10-a",
        src: "/challenge/pair-10-a.jpg",
        width: 1214,
        height: 1214,
        alt: "Image of a tree.",
        kind: "ai",
        ...blankCredit,
      },
      {
        id: "pair-10-b",
        src: "/challenge/pair-10-b.jpg",
        width: 767,
        height: 767,
        alt: "Image of a tree.",
        kind: "photo",
        ...blankCredit,
      },
    ],
  },
] as const satisfies readonly ChallengePair[];
