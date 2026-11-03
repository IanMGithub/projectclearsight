import assert from "node:assert/strict";
import { articles, articlesNewestFirst, formatArticleDate } from "../src/content/articles.ts";
import { currentPage, mission, navigation, purpose } from "../src/content/site.ts";

assert.equal(formatArticleDate("2026-10-31"), "October 31, 2026");
assert.equal(articles.length, 5);
assert.deepEqual(
  articles.map((article) => article.publishedDate),
  ["2026-10-31", "2026-10-31", "2026-10-31", "2026-10-31", "2026-10-31"],
);

const ordered = articlesNewestFirst(articles);
assert.deepEqual(
  ordered.map((article) => article.id),
  articles.map((article) => article.id),
  "equal dates keep the supplied order",
);

const newer = {
  id: "newer",
  title: "A later article",
  publishedDate: "2026-11-02",
  url: "https://medium.com/@clearsight.initiative/example",
  imageSrc: "/articles/example.jpg",
  imageAlt: "",
  imageWidth: 960,
  imageHeight: 640,
  imagePosition: "center",
  imageSourceUrl: "https://example.com/source",
  imageCreator: "Example",
  imageLicense: "CC0 1.0",
  imageAttribution: "Example credit",
};
const sorted = articlesNewestFirst([articles[0], newer, articles[1]]);
assert.deepEqual(
  sorted.map((article) => article.id),
  ["newer", articles[0].id, articles[1].id],
);
assert.equal(articlesNewestFirst([...articles, newer]).length, articles.length + 1);

assert.equal(currentPage("/"), "home");
assert.equal(currentPage("/learn"), "learn");
assert.equal(currentPage("/learn/"), "learn");
assert.equal(currentPage("/challenge"), "challenge");
assert.equal(currentPage("/challenge/"), "challenge");
assert.equal(currentPage("/unknown"), "home");
assert.deepEqual(
  navigation.map((item) => item.label),
  ["Home", "Learn", "Test"],
);
assert.equal(navigation.find((item) => item.label === "Test")?.href, "/challenge");
assert.equal(
  mission.statement,
  "ClearSight’s mission is to raise awareness of misleading online information and empower community members to make thoughtful, evidence-based decisions about what they trust and share.",
);
assert.ok(purpose.startsWith("ClearSight’s purpose is to raise awareness"));
for (const article of articles) {
  assert.ok(article.imageSrc.startsWith("/articles/"));
  assert.equal(article.imageAlt, "");
  assert.ok(article.imageSourceUrl.startsWith("https://commons.wikimedia.org/"));
  assert.equal(article.imageLicense, "CC0 1.0");
}

console.log("learn content ok");
