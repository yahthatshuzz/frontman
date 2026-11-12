import type { PillarId } from "./types";

/**
 * The four Frontman pillars. Each maps to a part of how people decide to trust someone:
 * ability, integrity, shared values, and likability.
 */
export interface Pillar {
  id: PillarId;
  name: string;
  builds: string;
  definition: string;
  examples: string[];
}

export const PILLARS: Pillar[] = [
  {
    id: "teach",
    name: "Teach",
    builds: "Ability and goodwill",
    definition:
      "Give real expertise away for free. Answer the questions customers actually ask, bust myths, show how. Proves the owner knows their craft and wants the viewer to win.",
    examples: ["Myth vs. truth", "3 things I'd tell anyone starting", "A customer's question, answered"],
  },
  {
    id: "show",
    name: "Show",
    builds: "Honesty and proof",
    definition:
      "Pull back the curtain. Real numbers, real process, real customers, real mistakes. Proves the business is what it says it is.",
    examples: ["Behind the scenes", "The receipt: where your money goes", "The mistake that almost sank us"],
  },
  {
    id: "believe",
    name: "Believe",
    builds: "Shared values and vision",
    definition:
      "Say what the owner stands for: why they started, what they refuse to do, where this is going. People buy from people who share their values.",
    examples: ["The hill I'll die on", "Why we said no", "Where we'll be in 5 years"],
  },
  {
    id: "entertain",
    name: "Entertain",
    builds: "Likability and reach",
    definition:
      "Borrow formats that are working outside the niche and wrap the business inside them. Earns attention and makes the owner someone people enjoy watching.",
    examples: ["Street-interview wrapper", "Day in the life with a clock", "Trend with a business twist"],
  },
];

export const PILLAR_BY_ID: Record<PillarId, Pillar> = Object.fromEntries(
  PILLARS.map((p) => [p.id, p]),
) as Record<PillarId, Pillar>;

export const PILLAR_IDS: PillarId[] = PILLARS.map((p) => p.id);
