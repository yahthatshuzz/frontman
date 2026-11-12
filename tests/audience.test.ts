// Run: node --experimental-strip-types tests/audience.test.ts
// keepSourced is the guard that stops made-up posts from reaching the owner.
import assert from "node:assert/strict";
import { keepSourced, urlKey } from "../src/lib/sourcing.ts";

const bd = { name: "x", hook: "x", structure: [], pillar: "teach" as const, length: "30s", whyItWorks: "x" };
const sources = new Map([
  [urlKey("https://www.example.com/trends/college-creators/"), "College creators to watch"],
  [urlKey("https://www.tiktok.com/@realcreator/video/123"), "TikTok post"],
]);
const out = keepSourced(
  [
    { title: "Real, found", url: "https://www.tiktok.com/@realcreator/video/123", sourceUrl: "https://example.com/trends/college-creators", creator: "a", platform: "TikTok", breakdown: bd },
    { title: "Source ok, post link invented", url: "https://www.tiktok.com/@made/up/999", sourceUrl: "https://www.example.com/trends/college-creators/#top", creator: "b", platform: "TikTok", breakdown: bd },
    { title: "Invented source", url: "https://fake.com/x", sourceUrl: "https://fake.com/x", creator: "c", platform: "IG", breakdown: bd },
  ],
  sources,
);
assert.equal(out.length, 2, "drops the item with an unsourced URL");
assert.equal(out[0].url, "https://www.tiktok.com/@realcreator/video/123", "keeps a post link the search returned");
assert.equal(out[1].url, out[1].sourceUrl, "replaces an invented post link with the source");
assert.equal(out[0].sourceTitle, "College creators to watch");
console.log("audience: all checks passed");
