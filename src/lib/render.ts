/**
 * Rendering: turns an edit plan into a 1080x1920 MP4 with Creatomate (RenderScript JSON via POST /v2/renders),
 * then copies the finished file into our storage so it outlives Creatomate's hosting.
 * Caption styles come from the Terminal's style library (the prototype's STYLE_LIB entries).
 */
import type { EditPlan } from "./agents/edit";

export function renderReady(): boolean {
  return !!process.env.CREATOMATE_API_KEY;
}

export interface CaptionStyle {
  font?: string;
  w?: number;
  color?: string;
  hl?: string;
  hlbg?: string;
  bg?: string;
  upper?: number;
  lower?: number;
  ital?: number;
}

function fontFamily(css = ""): string {
  if (/bricolage/i.test(css)) return "Bricolage Grotesque";
  if (/fraunces/i.test(css)) return "Fraunces";
  if (/instrument/i.test(css)) return "Instrument Serif";
  if (/georgia|serif/i.test(css) && !/sans/i.test(css)) return "Lora";
  if (/courier/i.test(css)) return "Courier Prime";
  if (/mono/i.test(css)) return "JetBrains Mono";
  return "Inter";
}

function hex(c: string | undefined, fallback: string): string {
  if (!c) return fallback;
  if (/^#[0-9a-f]{3,8}$/i.test(c)) return c;
  const m = c.match(/rgba?\(([^)]+)\)/i);
  if (m) {
    const [r, g, b, a] = m[1].split(",").map((x) => parseFloat(x));
    const h = (n: number) => Math.round(n).toString(16).padStart(2, "0");
    return `#${h(r)}${h(g)}${h(b)}${a != null && !Number.isNaN(a) ? h(a * 255) : ""}`;
  }
  return fallback;
}

export function buildRenderScript(input: {
  videoUrl: string;
  plan: EditPlan;
  words: { w: string; s: number; e: number }[];
  style: CaptionStyle;
}): Record<string, unknown> {
  const { plan, words, style } = input;
  const elements: Record<string, unknown>[] = [];
  const caption: { time: number; duration: number; value: string; sentence: number }[] = [];
  let at = 0;
  let wordIndex = 0;
  for (const k of plan.keep) {
    const len = k.end - k.start;
    elements.push({ type: "video", track: 1, source: input.videoUrl, trim_start: Number(k.start.toFixed(3)), trim_duration: Number(len.toFixed(3)), fit: "cover" });
    for (const w of words) {
      if (w.s >= k.start - 0.01 && w.e <= k.end + 0.05) {
        const value = style.upper ? w.w.toUpperCase() : style.lower ? w.w.toLowerCase() : w.w;
        caption.push({ time: Number((at + (w.s - k.start)).toFixed(3)), duration: Number(Math.max(0.08, w.e - w.s).toFixed(3)), value, sentence: Math.floor(wordIndex / plan.wordsPerCaption) + 1 });
        wordIndex++;
      }
    }
    at += len;
  }
  const total = Number(at.toFixed(3));
  if (caption.length) {
    elements.push({
      type: "text",
      track: 2,
      time: 0,
      duration: total,
      y: "72%",
      width: "86%",
      height: "18%",
      x_alignment: "50%",
      y_alignment: "50%",
      font_family: fontFamily(style.font),
      font_weight: String(style.w ?? 800),
      font_style: style.ital ? "italic" : "normal",
      font_size: "7 vmin",
      fill_color: hex(style.color, "#FFFFFF"),
      transcript_source: caption,
      transcript_effect: style.hlbg ? "highlight" : "color",
      transcript_color: hex(style.hlbg ?? style.hl, "#FFD60A"),
      ...(style.bg ? { background_color: hex(style.bg, "#00000073"), background_x_padding: "20%", background_y_padding: "12%", background_border_radius: "20%" } : { shadow_color: "#00000099", shadow_blur: "1.5 vmin" }),
    });
  }
  if (plan.hookText) {
    elements.push({
      type: "text",
      track: 3,
      time: 0,
      duration: Math.min(plan.hookSeconds, total),
      text: plan.hookText,
      y: "20%",
      width: "84%",
      x_alignment: "50%",
      y_alignment: "50%",
      font_family: fontFamily(style.font),
      font_weight: "800",
      font_size: "8 vmin",
      fill_color: "#111111",
      background_color: "#FFFFFF",
      background_x_padding: "18%",
      background_y_padding: "10%",
      background_border_radius: "18%",
    });
  }
  return { output_format: "mp4", width: 1080, height: 1920, frame_rate: 30, duration: total, elements };
}

type CreatomateRender = { id: string; status: string; url?: string; error_message?: string };

async function cm(path: string, init?: RequestInit): Promise<CreatomateRender> {
  const res = await fetch(`https://api.creatomate.com/v2${path}`, {
    ...init,
    headers: { authorization: `Bearer ${process.env.CREATOMATE_API_KEY}`, "content-type": "application/json", ...(init?.headers ?? {}) },
  });
  const j = (await res.json().catch(() => null)) as CreatomateRender | CreatomateRender[] | { message?: string } | null;
  if (!res.ok) throw new Error(`The renderer said no (${res.status}): ${(j as { message?: string })?.message ?? "check CREATOMATE_API_KEY"}.`);
  return Array.isArray(j) ? j[0] : (j as CreatomateRender);
}

export function startCreatomate(script: Record<string, unknown>): Promise<CreatomateRender> {
  return cm("/renders", { method: "POST", body: JSON.stringify(script) });
}

export function getCreatomate(id: string): Promise<CreatomateRender> {
  return cm(`/renders/${encodeURIComponent(id)}`);
}
