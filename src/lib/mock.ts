import type { BrandBrief, Business, Script, VideoBreakdown, VideoMeta } from "./types";
import type { ScriptDraft } from "./agents/scripts";

/** Sample output for demo mode (no ANTHROPIC_API_KEY). Clearly generic so nobody mistakes it for real analysis. */
export function mockBrief(b: Business): BrandBrief {
  const owner = b.owner.name || "the owner";
  return {
    oneLiner: `${b.name} ${b.offer ? `sells ${b.offer.toLowerCase()}` : "is a local business"} to ${b.audience || "customers who care about quality"}.`,
    whoTheyServe: b.audience || "[FILL: who your best customers are]",
    whatTheySell: b.offer || "[FILL: what you sell]",
    coreAssociation: `${owner}: the owner who shows you exactly how it's done`,
    voice: { traits: ["Direct", "Warm", "No fluff"], phrases: ["Here's the thing", "Let me show you"], avoid: ["Corporate jargon", "Hype"] },
    originStory: "",
    proofPoints: ["[FILL: years in business]", "[FILL: customers served]"],
    stories: [
      { title: "The first customer", summary: "Demo story. Run real analysis to pull stories from the owner's words.", pillar: "believe" },
      { title: "The process nobody sees", summary: "Demo story about the behind-the-scenes work.", pillar: "show" },
      { title: "The question everyone asks", summary: "Demo story built on a common customer question.", pillar: "teach" },
    ],
    beliefs: ["Quality over speed", "Customers deserve to see how it's made"],
    expertiseTopics: ["How to choose the right option", "Common mistakes customers make"],
    customerQuestions: ["How much does it cost?", "How long does it take?", "What makes you different?"],
    trustGaps: [
      { gap: "Nobody knows who runs the business", fix: "Put the owner on camera every week" },
      { gap: "No visible proof of the work", fix: "Behind-the-scenes and receipt-style videos" },
    ],
    pillarStrategy: [
      { pillar: "teach", weight: 35, angle: "Answer the questions customers already ask", examples: ["3 mistakes to avoid", "Myth vs. truth", "Your question, answered"] },
      { pillar: "show", weight: 30, angle: "Show the work and the numbers", examples: ["A day on the floor", "The receipt", "Before and after"] },
      { pillar: "believe", weight: 20, angle: "Say what the business stands for", examples: ["Why I started", "Why we said no", "The hill I'll die on"] },
      { pillar: "entertain", weight: 15, angle: "Borrow formats from outside the niche", examples: ["Street interview", "Day in the life", "Trend twist"] },
    ],
    missingInfo: ["Add your ANTHROPIC_API_KEY to run the real analysis.", "What was the moment you decided to start this business?"],
  };
}

export function mockScripts(b: Business, count: number): ScriptDraft[] {
  const base: ScriptDraft[] = [
    {
      pillar: "teach",
      formatId: "myth-vs-truth",
      title: "The myth that costs customers money",
      hooks: ["Everyone believes this, and it's costing you.", "Stop doing this today.", "This myth needs to die."],
      body: `Most people think [FILL: common myth in your industry]. It sounds right. It isn't.\n\nHere's what actually happens: [FILL: what really happens]. I've seen it [FILL: how many times] at ${b.name}.\n\nSo do this instead: [FILL: the better way]. That's it.`,
      shotNotes: ["Shoot at your counter or workspace", "Hold up the product when you say 'do this instead'"],
      cta: "Comment the next myth you want me to bust.",
      platforms: ["instagram", "tiktok", "youtube_shorts"],
      estSeconds: 35,
      whyItBuildsTrust: "Proves the owner knows more than the internet does.",
    },
    {
      pillar: "show",
      formatId: "the-receipt",
      title: "Where your money actually goes",
      hooks: ["Here's where every dollar goes.", "Let me show you our receipt.", "Nobody in my industry will show you this."],
      body: `When you pay us [FILL: price], here's where it goes. [FILL: cost 1]. [FILL: cost 2]. [FILL: cost 3].\n\nThe one thing we'll never cut is [FILL: what you protect]. That's why it costs what it costs.`,
      shotNotes: ["Write the numbers on paper or a whiteboard", "Point to each line as you say it"],
      cta: "Follow for more behind the counter.",
      platforms: ["instagram", "tiktok", "youtube_shorts", "linkedin"],
      estSeconds: 40,
      whyItBuildsTrust: "Radical transparency about money proves honesty.",
    },
    {
      pillar: "believe",
      formatId: "hill-to-die-on",
      title: "The hill I'll die on",
      hooks: ["I'll die on this hill.", "Most of my industry disagrees with me.", "Unpopular opinion from an owner."],
      body: `Here's my unpopular opinion: [FILL: your strong belief].\n\nMost people in this business do [FILL: the common way]. I get why. It's easier.\n\nBut it's not what our customers deserve. So we do [FILL: your way], even when it costs us.`,
      shotNotes: ["Straight to camera, tight framing", "No music under the first line"],
      cta: "Agree or disagree? Tell me below.",
      platforms: ["instagram", "tiktok", "linkedin"],
      estSeconds: 35,
      whyItBuildsTrust: "Shows the owner has values that cost them something.",
    },
    {
      pillar: "entertain",
      formatId: "day-in-the-life",
      title: "A day running " + b.name,
      hooks: ["5:30 AM. Here's my day.", "What owning a business actually looks like.", "Nobody posts this part."],
      body: `[FILL: start time]. First thing I do is [FILL: first task].\n\n[FILL: mid-morning moment].\n\n[FILL: the surprising moment of the day].\n\nAnd that's a day. Tomorrow we do it again.`,
      shotNotes: ["Shoot 6-10 short clips across the day", "Add a clock overlay in the edit"],
      cta: "Follow to see tomorrow.",
      platforms: ["instagram", "tiktok", "youtube_shorts"],
      estSeconds: 45,
      whyItBuildsTrust: "Makes the owner a person, not a logo.",
    },
  ];
  return Array.from({ length: count }, (_, i) => {
    const s = base[i % base.length];
    return i < base.length ? s : { ...s, title: `${s.title} (${Math.floor(i / base.length) + 1})` };
  });
}

/** Demo-mode breakdown: only what the inputs show, everything else left for the owner to fill. */
export function mockBreakdown(meta: VideoMeta | null, note: string): VideoBreakdown {
  return {
    name: "Saved format (demo)",
    hook: meta?.title ? `Opens like the caption: "${meta.title.slice(0, 80)}"` : "[FILL: how it opens]",
    structure: ["[FILL: opening beat]", "[FILL: middle beat]", "[FILL: payoff]"],
    pillar: "entertain",
    length: "[FILL: length]",
    whyItWorks: note ? `Demo mode. You said: "${note.slice(0, 160)}". Add an API key for a real breakdown.` : "Demo mode. Add an API key for a real breakdown.",
  };
}

export function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export type { Script };
