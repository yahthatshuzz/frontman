/** Platform-native captions written from what the owner actually said (narration transcript or script). */
import { demoMode, FRONTMAN_METHOD, modelFor, structured } from "../claude";

export interface Captions {
  ig: string;
  tt: string;
  yt: string;
  ytTitle: string;
  li: string;
}

const s = { type: "string" };
const SCHEMA = { type: "object", additionalProperties: false, required: ["ig", "tt", "yt", "ytTitle", "li"], properties: { ig: s, tt: s, yt: s, ytTitle: s, li: s } };

export async function writeCaptions(input: { title: string; hook: string; said: string; business: string; voice: string; offer: string }): Promise<Captions> {
  if (demoMode()) {
    const base = `${input.title}.`;
    return { ig: `${base}\n\n(sample caption: add ANTHROPIC_API_KEY)`, tt: base, yt: base, ytTitle: input.title.slice(0, 90), li: `${base}\n\nWhat would you add?` };
  }
  return structured<Captions>({
    model: modelFor("captions"),
    system: `${FRONTMAN_METHOD}\n\nYou write post captions in the owner's voice. Use only what they said in the video and the facts given. Never invent numbers, names or claims.`,
    prompt: `Business: ${input.business}
Voice: ${input.voice || "plain, direct, warm"}
Offer (only mention if it fits): ${input.offer || "none"}
Video title: ${input.title}
Opening line: ${input.hook}
What they say in the video:
${input.said.slice(0, 6000)}

Write one caption per platform, native to how people write there:
- ig: Instagram Reels. A first line that makes people stop, 2-4 short lines, one clear ask, 3-5 relevant hashtags at the end.
- tt: TikTok. One or two punchy lines plus 3-4 hashtags. Under 300 characters.
- yt: YouTube Shorts description. Two sentences.
- ytTitle: YouTube Shorts title, under 70 characters, no clickbait the video can't pay off.
- li: LinkedIn. A first line that earns the "see more", 3-6 short lines with a real takeaway, a question at the end. No hashtag walls (2 max).`,
    schema: SCHEMA,
    maxTokens: 2000,
    effort: "medium",
  });
}
