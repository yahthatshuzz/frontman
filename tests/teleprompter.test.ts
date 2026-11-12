// Run: node --experimental-strip-types tests/teleprompter.test.ts
import assert from "node:assert/strict";
import { createTracker, effectiveMode, prepare, readingText, similarity, timedPace } from "../src/lib/teleprompter.ts";

const text = readingText({
  hooks: ["Four of us had never built anything together.", "x"],
  selectedHook: 0,
  body: "Sandlot started at the Ohio State hackathon. We had eight hours.\n\nSam wrote code nonstop. AJ and Wyatt worked out the marketplace. I worked on the pitch.\n\nThen we pitched it to investors, and people leaned in. [FILL: what happened next]",
});
const p = prepare(text);
assert.ok(p.lines.length >= 6, "splits into sentence lines");
assert.ok(!p.tokens.some((t) => t.word.includes("fill")), "drops FILL placeholders");

// Timed mode
const pace = timedPace(text, 45);
assert.equal(pace.words, p.tokens.length);
assert.equal(pace.wpm, Math.round((p.tokens.length / 45) * 60));

// Clean read moves forward line by line
let t = createTracker(p);
t.update("four of us had never built anything together");
assert.equal(t.state.line, 0);
t.update("four of us had never built anything together sandlot started at the ohio state");
assert.equal(t.state.line, 1, "reached line 2");

// Misheard words ("sandlock", "hacker thon") still track
t = createTracker(p);
t.update("four of us had never built anything together sandlock started at the ohio state hacker thon we had eight hours");
assert.equal(t.state.line, 2, `misheard words still tracked (got line ${t.state.line})`);

// Skipping a whole line jumps ahead
t = createTracker(p);
t.update("four of us had never built anything together");
t.update("sam wrote code nonstop");
assert.equal(p.lines[t.state.line].startsWith("Sam wrote"), true, `skipped ahead (line ${t.state.line}: ${p.lines[t.state.line]})`);

// Never jumps back more than one line, even if earlier words are repeated
t = createTracker(p);
t.update("then we pitched it to investors and people leaned");
const far = t.state.line;
// owner repeats the opening words from line 0 — tracker may not jump that far back
t.update("four of us had never built anything together");
assert.ok(t.state.line >= far - 1, `no big backward jump (was ${far}, now ${t.state.line})`);

// Noise doesn't move it
t = createTracker(p);
t.update("four of us had never built anything together");
const before = t.state.word;
t.update("uh okay hold on let me restart the camera");
assert.equal(t.state.word, before, "noise ignored");

assert.ok(similarity("sandlot", "sandlock") > 0.72);
assert.deepEqual(effectiveMode("voice", false).mode, "timed");
assert.ok(effectiveMode("voice", false).note);
assert.deepEqual(effectiveMode("voice", true).mode, "voice");
console.log("teleprompter: all checks passed");
