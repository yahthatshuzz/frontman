import Anthropic from "@anthropic-ai/sdk";
import type { ContentBlock, ContentBlockParam, MessageParam } from "@anthropic-ai/sdk/resources/messages/messages";
import { urlKey } from "./sourcing";

export { urlKey };

export const MODEL = process.env.FRONTMAN_MODEL || "claude-opus-5-5";

/** Without an API key the app runs in demo mode and returns sample output. */
export function demoMode(): boolean {
  return !process.env.ANTHROPIC_API_KEY;
}

let client: Anthropic | null = null;
function anthropic(): Anthropic {
  if (!client) client = new Anthropic();
  return client;
}

interface StructuredRequest {
  system: string;
  prompt: string;
  schema: Record<string, unknown>;
  maxTokens: number;
  effort?: "low" | "medium" | "high" | "xhigh" | "max";
}

/**
 * Ask Claude for JSON that matches `schema` (structured outputs).
 * Streams under the hood so long generations don't hit request timeouts.
 */
export async function structured<T>({ system, prompt, schema, maxTokens, effort = "high" }: StructuredRequest): Promise<T> {
  const stream = anthropic().messages.stream({
    model: MODEL,
    max_tokens: maxTokens,
    system,
    messages: [{ role: "user", content: prompt }],
    output_config: { format: { type: "json_schema", schema }, effort },
  });
  const msg = await stream.finalMessage();
  if (msg.stop_reason === "max_tokens") {
    throw new Error("The response ran past its length limit. Try again, or ask for fewer scripts.");
  }
  const text = msg.content
    .map((b) => (b.type === "text" ? b.text : ""))
    .join("")
    .trim();
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error("Claude returned something that wasn't valid JSON. Try again.");
  }
}

export interface WebResearch {
  /** Claude's research notes, written while searching. */
  notes: string;
  /** Every URL that actually came back from a search or was cited. Use this to drop anything unsourced. */
  sources: Map<string, string>;
  searches: number;
}

function collectSources(blocks: ContentBlock[], into: Map<string, string>) {
  for (const b of blocks) {
    if (b.type === "web_search_tool_result" && Array.isArray(b.content)) {
      for (const r of b.content) into.set(urlKey(r.url), r.title);
    }
    if (b.type === "text" && b.citations) {
      for (const c of b.citations) if (c.type === "web_search_result_location") into.set(urlKey(c.url), c.title ?? c.url);
    }
  }
}

/**
 * Let Claude research with the web search tool (server-side, with dynamic filtering), then return its notes plus
 * the set of URLs the searches really returned. Structured output comes from a follow-up `structured()` call,
 * because web search citations can't be combined with a JSON output format in one request.
 */
export async function webResearch({
  system,
  prompt,
  maxSearches = 8,
  maxTokens = 16000,
  effort = "high",
}: {
  system: string;
  prompt: string;
  maxSearches?: number;
  maxTokens?: number;
  effort?: StructuredRequest["effort"];
}): Promise<WebResearch> {
  const messages: MessageParam[] = [{ role: "user", content: prompt }];
  const sources = new Map<string, string>();
  let notes = "";
  let searches = 0;
  // A long research turn can pause; send the paused message back unchanged to continue (at most a few times).
  for (let round = 0; round < 5; round++) {
    const stream = anthropic().messages.stream({
      model: MODEL,
      max_tokens: maxTokens,
      system,
      messages,
      tools: [{ type: "web_search_20260318", name: "web_search", max_uses: maxSearches }],
      output_config: { effort },
    });
    const msg = await stream.finalMessage();
    collectSources(msg.content, sources);
    searches += msg.usage.server_tool_use?.web_search_requests ?? 0;
    notes += msg.content.map((b) => (b.type === "text" ? b.text : "")).join("");
    if (msg.stop_reason !== "pause_turn") break;
    messages.push({ role: "assistant", content: msg.content as unknown as ContentBlockParam[] });
  }
  return { notes: notes.trim(), sources, searches };
}

/** Shared system prompt: the Frontman method every agent works from. */
export const FRONTMAN_METHOD = `You work inside Frontman, software that turns business owners into the trusted face of their business through short-form video.

The thesis: AI can now generate any ad, so audiences stop trusting ads and start trusting people. The one thing AI cannot fake is the real owner. Every video exists to build trust in the person behind the business and in where the business is going.

The method (trust over virality):
- Give real value away for free. The best content answers a real problem and gives the real solution.
- Borrow "wrappers": formats that are working outside the niche, with this business placed inside them.
- Accordion: one core idea can be expanded into a long piece or compressed into a 15-second clip.
- Width vs depth: some videos reach new people (wide), others deepen trust with people who already follow (deep). Keep both.
- One core association: the owner should become known for one clear thing.

The four pillars, each tied to how people decide to trust someone:
- Teach (ability and goodwill): expertise given away, answers to real customer questions, myths busted.
- Show (honesty and proof): behind the scenes, real numbers, process, customers, mistakes.
- Believe (shared values and vision): why they started, what they refuse to do, where it is going.
- Entertain (likability and reach): proven formats from outside the niche with the business wrapped inside.

Hard rules:
- Never invent facts, numbers, customers, awards, or stories. Use only what the owner said or what the sources contain.
- When a script needs a specific detail you don't have, write a placeholder like [FILL: last month's best-selling item] so the owner can fill it in.
- Write the way this owner talks: plain, spoken, short sentences. No corporate language, no hashtags, no emoji.`;
