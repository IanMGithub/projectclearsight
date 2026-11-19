/**
 * ClearSight Medium articles.
 * Add a future article by appending one object. The Learn page renders this list.
 * publishedDate is a date-only ISO string so the displayed day does not shift by timezone.
 */

export type Article = {
  id: string;
  title: string;
  publishedDate: string;
  url: string;
  imageSrc: string;
  /** Empty when the thumbnail only illustrates the title. */
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  /** CSS object-position so the cover crop keeps the subject. */
  imagePosition: string;
  imageSourceUrl: string;
  imageCreator: string;
  imageLicense: string;
  /** Recorded for editors. These CC0 images do not require an on-page credit. */
  imageAttribution: string;
};

export const articles = [
  {
    id: "spot-ai-images",
    title: "How to Spot AI-Generated Images",
    publishedDate: "2026-10-31",
    url: "https://medium.com/@clearsight.initiative/how-to-spot-ai-generated-images-f932abf4fb59?sharedUserId=clearsight.initiative",
    imageSrc: "/articles/spot-ai.jpg",
    imageAlt: "",
    imageWidth: 960,
    imageHeight: 631,
    imagePosition: "center",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Textured_mirror_photo_(Unsplash).jpg",
    imageCreator: "Ludomil Sawicki",
    imageLicense: "CC0 1.0",
    imageAttribution: "Ludomil Sawicki, via Wikimedia Commons (CC0 1.0). No attribution required.",
  },
  {
    id: "verify-claims",
    title: "Before You Believe It: How to Verify Claims Online",
    publishedDate: "2026-10-31",
    url: "https://medium.com/@clearsight.initiative/before-you-believe-it-how-to-verify-claims-online-3a2c46fc97f9?sharedUserId=clearsight.initiative",
    imageSrc: "/articles/verify-claims.jpg",
    imageAlt: "",
    imageWidth: 960,
    imageHeight: 640,
    imagePosition: "center",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Getting_cozy_with_a_book_(Unsplash).jpg",
    imageCreator: "Alice Hampson",
    imageLicense: "CC0 1.0",
    imageAttribution: "Alice Hampson, via Wikimedia Commons (CC0 1.0). No attribution required.",
  },
  {
    id: "believe",
    title: "Why We Believe What We Want to Believe",
    publishedDate: "2026-10-31",
    url: "https://medium.com/@clearsight.initiative/why-we-believe-what-we-want-to-believe-df6b4c2c3c06",
    imageSrc: "/articles/believe.jpg",
    imageAlt: "",
    imageWidth: 960,
    imageHeight: 540,
    imagePosition: "center",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Mirror_Mirror_(Unsplash).jpg",
    imageCreator: "Antoine Barrès",
    imageLicense: "CC0 1.0",
    imageAttribution: "Antoine Barrès, via Wikimedia Commons (CC0 1.0). No attribution required.",
  },
  {
    id: "before-you-share",
    title: "Before You Share: Your Role in the Information Chain",
    publishedDate: "2026-10-31",
    url: "https://medium.com/@clearsight.initiative/before-you-share-your-role-in-the-information-chain-662f3259020b",
    imageSrc: "/articles/before-you-share.jpg",
    imageAlt: "",
    imageWidth: 960,
    imageHeight: 626,
    imagePosition: "72% center",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Backpacker_waiting_for_the_train_(Unsplash).jpg",
    imageCreator: "Clem Onojeghuo",
    imageLicense: "CC0 1.0",
    imageAttribution: "Clem Onojeghuo, via Wikimedia Commons (CC0 1.0). No attribution required.",
  },
  {
    id: "correct-misinformation",
    title: "How to Correct Misinformation Without Starting an Argument",
    publishedDate: "2026-10-31",
    url: "https://medium.com/@clearsight.initiative/how-to-correct-misinformation-without-starting-an-argument-2ce451856e55",
    imageSrc: "/articles/correct-misinformation.jpg",
    imageAlt: "",
    imageWidth: 960,
    imageHeight: 541,
    imagePosition: "58% center",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Old_people_conversing_(Unsplash).jpg",
    imageCreator: "Cristina Gottardi",
    imageLicense: "CC0 1.0",
    imageAttribution: "Cristina Gottardi, via Wikimedia Commons (CC0 1.0). No attribution required.",
  },
  {
    id: "ai-image-problem",
    title: "The AI Image Problem: Why You Can’t Always Trust What You See",
    publishedDate: "2026-11-15",
    url: "https://medium.com/@clearsight.initiative/the-ai-image-problem-why-you-cant-always-trust-what-you-see-ac2ee42713da",
    imageSrc: "/articles/ai-image-problem.jpg",
    imageAlt: "",
    imageWidth: 960,
    imageHeight: 1445,
    imagePosition: "center 58%",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Photographer_on_a_dirt_road_(Unsplash).jpg",
    imageCreator: "Ezra Jeffrey",
    imageLicense: "CC0 1.0",
    imageAttribution: "Ezra Jeffrey, via Wikimedia Commons (CC0 1.0). No attribution required.",
  },
  {
    id: "think-before-you-share",
    title: "Think Before You Share: The 60-Second Habit That Can Stop Misinformation",
    publishedDate: "2026-11-15",
    url: "https://medium.com/@clearsight.initiative/think-before-you-share-the-60-second-habit-that-can-stop-misinformation-c2cd14d8f1d8",
    imageSrc: "/articles/think-before-you-share.jpg",
    imageAlt: "",
    imageWidth: 960,
    imageHeight: 640,
    imagePosition: "center",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Man_with_smartphone_and_laptop_(Unsplash).jpg",
    imageCreator: "Alejandro Escamilla",
    imageLicense: "CC0 1.0",
    imageAttribution: "Alejandro Escamilla, via Wikimedia Commons (CC0 1.0). No attribution required.",
  },
  {
    id: "manipulating-emotions",
    title: "Why Misinformation Is So Good at Manipulating Your Emotions",
    publishedDate: "2026-11-15",
    url: "https://medium.com/@clearsight.initiative/why-misinformation-is-so-good-at-manipulating-your-emotions-38989c642ab6",
    imageSrc: "/articles/emotions.jpg",
    imageAlt: "",
    imageWidth: 960,
    imageHeight: 640,
    imagePosition: "center",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Laughing_woman_in_jean_jacket_(Unsplash).jpg",
    imageCreator: "Brooke Cagle",
    imageLicense: "CC0 1.0",
    imageAttribution: "Brooke Cagle, via Wikimedia Commons (CC0 1.0). No attribution required.",
  },
  {
    id: "deepfakes",
    title: "Deepfakes and Digital Trust: When Seeing and Hearing Aren’t Believing",
    publishedDate: "2026-11-15",
    url: "https://medium.com/@clearsight.initiative/deepfakes-and-digital-trust-when-seeing-and-hearing-arent-believing-29ce82b520b7",
    imageSrc: "/articles/deepfakes.jpg",
    imageAlt: "",
    imageWidth: 960,
    imageHeight: 641,
    imagePosition: "center",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Headphones_on_wood_in_black_and_white_(Unsplash).jpg",
    imageCreator: "Corey Blaz",
    imageLicense: "CC0 1.0",
    imageAttribution: "Corey Blaz, via Wikimedia Commons (CC0 1.0). No attribution required.",
  },
  {
    id: "correct-without-argument",
    title: "How to Correct Misinformation Without Starting an Argument",
    publishedDate: "2026-11-15",
    url: "https://medium.com/@clearsight.initiative/how-to-correct-misinformation-without-starting-an-argument-f48f8778a58d",
    imageSrc: "/articles/correct-without-argument.jpg",
    imageAlt: "",
    imageWidth: 960,
    imageHeight: 640,
    imagePosition: "center",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Men_laughing_by_green_valley_(Unsplash).jpg",
    imageCreator: "Matheus Ferrero",
    imageLicense: "CC0 1.0",
    imageAttribution: "Matheus Ferrero, via Wikimedia Commons (CC0 1.0). No attribution required.",
  },
] as const satisfies readonly Article[];

/** Newest publication date first. Equal dates keep the order they were supplied. */
export function articlesNewestFirst(items: readonly Article[]): Article[] {
  return items
    .map((article, index) => ({ article, index }))
    .sort((left, right) => {
      if (left.article.publishedDate === right.article.publishedDate) return left.index - right.index;
      return left.article.publishedDate < right.article.publishedDate ? 1 : -1;
    })
    .map(({ article }) => article);
}

export function formatArticleDate(iso: string): string {
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
