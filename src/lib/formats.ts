import type { PillarId } from "./types";

/**
 * The format library: proven video structures, stored as patterns rather than other creators' videos.
 * The script agent picks one per script; the Terminal shows them as templates.
 */
export interface Format {
  id: string;
  name: string;
  pillars: PillarId[];
  structure: string[];
  whyItWorks: string;
  seconds: [number, number];
  /** Formats the owner saved from a reference or audience research. Stored per business, not in this file. */
  custom?: boolean;
  businessId?: string;
  sourceUrl?: string;
  createdAt?: string;
}

export const FORMATS: Format[] = [
  {
    id: "myth-vs-truth",
    name: "Myth vs. truth",
    pillars: ["teach"],
    structure: ["State the myth customers believe", "Say plainly that it's wrong", "Give the truth with one concrete example", "One-line takeaway"],
    whyItWorks: "Pattern interrupt in the first line, and the viewer leaves smarter.",
    seconds: [25, 45],
  },
  {
    id: "three-things",
    name: "3 things I'd tell you",
    pillars: ["teach"],
    structure: ["Name who this is for", "Thing 1, fast", "Thing 2, with a story", "Thing 3, the surprising one", "Close"],
    whyItWorks: "Numbered lists hold attention; the third item rewards watching to the end.",
    seconds: [35, 60],
  },
  {
    id: "customer-question",
    name: "Your question, answered",
    pillars: ["teach"],
    structure: ["Read a real customer question out loud", "Answer it straight", "Show or demonstrate", "Invite the next question"],
    whyItWorks: "Proves the owner listens and turns comments into a content engine.",
    seconds: [20, 45],
  },
  {
    id: "the-receipt",
    name: "The receipt",
    pillars: ["show", "teach"],
    structure: ["Hold up the product or service", "Break down where the money goes, line by line", "Name what you refuse to cut", "Close on value"],
    whyItWorks: "Radical transparency about money is rare and builds trust fast.",
    seconds: [30, 55],
  },
  {
    id: "behind-the-scenes",
    name: "Behind the curtain",
    pillars: ["show"],
    structure: ["Hook on something people never see", "Walk through the process", "Point out the detail that matters", "Tie it to the customer"],
    whyItWorks: "Curiosity plus proof that the work is real.",
    seconds: [25, 50],
  },
  {
    id: "the-mistake",
    name: "The mistake that almost sank us",
    pillars: ["show", "believe"],
    structure: ["Open on the low point", "What happened", "What we changed", "What it means for customers now"],
    whyItWorks: "Vulnerability earns trust; competitors never admit mistakes.",
    seconds: [35, 60],
  },
  {
    id: "hill-to-die-on",
    name: "The hill I'll die on",
    pillars: ["believe"],
    structure: ["State the strong opinion in one line", "Why most of the industry disagrees", "Why we do it anyway", "What that means for you"],
    whyItWorks: "A clear stance attracts the right customers and repels the wrong ones.",
    seconds: [25, 45],
  },
  {
    id: "why-we-said-no",
    name: "Why we said no",
    pillars: ["believe"],
    structure: ["Name the easy money we turned down", "The value it would have broken", "What we did instead"],
    whyItWorks: "Values only count when they cost something.",
    seconds: [25, 45],
  },
  {
    id: "origin",
    name: "Why I started this",
    pillars: ["believe", "show"],
    structure: ["Open on the moment it started", "The problem I couldn't ignore", "The first ugly version", "Where it is now"],
    whyItWorks: "The origin story is marketing nobody can copy.",
    seconds: [40, 60],
  },
  {
    id: "street-interview",
    name: "Street-interview wrapper",
    pillars: ["entertain", "teach"],
    structure: ["Owner with a mic stops people", "Ask a question about the industry", "React to answers", "Owner gives the real answer"],
    whyItWorks: "A format borrowed from comedy creators that keeps the owner as the expert.",
    seconds: [30, 60],
  },
  {
    id: "day-in-the-life",
    name: "Day in the life, on the clock",
    pillars: ["entertain", "show"],
    structure: ["Timestamp overlay from opening", "Quick cuts of real moments", "One surprising moment", "End-of-day line"],
    whyItWorks: "Borrowed from fitness and creator content; makes the owner a person, not a logo.",
    seconds: [30, 60],
  },
  {
    id: "trend-twist",
    name: "Trend with a business twist",
    pillars: ["entertain"],
    structure: ["Use a format that is working this week", "Swap in a real situation from the business", "Land the punchline", "Owner on camera at the end"],
    whyItWorks: "Rides existing attention while staying on-brand.",
    seconds: [10, 30],
  },
];

export const FORMAT_BY_ID: Record<string, Format> = Object.fromEntries(FORMATS.map((f) => [f.id, f]));

/** Built-in formats plus the ones this business saved. */
export function allFormats(custom: Format[]): Format[] {
  return [...FORMATS, ...custom];
}

/** Turn a breakdown's length ("45s", "0:45", "about 1 minute") into a seconds range. Unknown lengths get a broad default. */
export function secondsRange(length: string): [number, number] {
  if (!length || /FILL/i.test(length)) return [20, 60];
  const mmss = length.match(/(\d+):(\d{2})/);
  let secs = 0;
  if (mmss) secs = Number(mmss[1]) * 60 + Number(mmss[2]);
  else {
    const min = length.match(/(\d+(?:\.\d+)?)\s*(?:m|min|minute)/i);
    const sec = length.match(/(\d+)\s*(?:s|sec|second)/i);
    secs = (min ? Number(min[1]) * 60 : 0) + (sec ? Number(sec[1]) : 0);
  }
  if (!secs) return [20, 60];
  return [Math.max(5, Math.round(secs * 0.8)), Math.round(secs * 1.2)];
}
