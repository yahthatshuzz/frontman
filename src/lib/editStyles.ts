import type { EditStyleStep } from "./types";

/**
 * Raw ↔ Polished. Keeps videos feeling human: most owners should sit at 1-2.
 * The Edit stage (roadmap step 4) passes `editStyleBrief(step)` into the edit-decision-list prompt.
 */
export interface EditStyle {
  step: EditStyleStep;
  name: string;
  /** Plain words for the owner. */
  description: string;
  /** Average seconds between cuts. Raw only cuts dead air and mistakes. */
  avgShotSeconds: number;
  captions: string;
  zoomsPerMinute: number;
  /** Share of runtime that may be B-roll, 0-1. */
  brollShare: number;
  hookOverlay: string;
  effects: string;
}

export const EDIT_STYLES: EditStyle[] = [
  {
    step: 1,
    name: "Raw",
    description: "Jump cuts only, plain captions, no effects. Feels like a FaceTime.",
    avgShotSeconds: 0,
    captions: "Plain white sentence-case captions, one line, no highlights or animation.",
    zoomsPerMinute: 0,
    brollShare: 0,
    hookOverlay: "None. The spoken hook carries it.",
    effects: "None. No music, sound effects, or transitions.",
  },
  {
    step: 2,
    name: "Natural",
    description: "Tight cuts, clean captions, the hook on screen for two seconds. Nothing flashy.",
    avgShotSeconds: 6,
    captions: "Clean captions, one line, at most one emphasized word per caption.",
    zoomsPerMinute: 1,
    brollShare: 0.1,
    hookOverlay: "The hook as plain text for the first two seconds.",
    effects: "Optional quiet music bed. No sound effects.",
  },
  {
    step: 3,
    name: "Balanced",
    description: "A steady pace, captions with a highlighted word, a few zooms and some B-roll.",
    avgShotSeconds: 4,
    captions: "Captions 3-5 words at a time with one highlighted word.",
    zoomsPerMinute: 3,
    brollShare: 0.2,
    hookOverlay: "Hook text with a simple entrance.",
    effects: "Music bed and a soft sound on hook loops.",
  },
  {
    step: 4,
    name: "Produced",
    description: "Fast cuts, bold captions, zooms on key lines, regular B-roll, a designed hook.",
    avgShotSeconds: 2.5,
    captions: "Bold animated captions, 2-4 words at a time, keyword highlights.",
    zoomsPerMinute: 6,
    brollShare: 0.3,
    hookOverlay: "A designed visual hook (big number, headline card, or callout).",
    effects: "Music, sound effects on cuts and zooms, simple transitions.",
  },
  {
    step: 5,
    name: "Polished",
    description: "Every second edited: rapid cuts, animated captions, zooms, sound effects, lots of B-roll and graphics.",
    avgShotSeconds: 1.5,
    captions: "Fully animated captions with emphasis, color and motion on key words.",
    zoomsPerMinute: 10,
    brollShare: 0.4,
    hookOverlay: "A full motion-graphics hook.",
    effects: "Layered sound design, graphics, and transitions throughout.",
  },
];

export const DEFAULT_EDIT_STYLE: EditStyleStep = 2;

export function isEditStyle(v: unknown): v is EditStyleStep {
  return v === 1 || v === 2 || v === 3 || v === 4 || v === 5;
}

export function editStyle(step: EditStyleStep | undefined | null): EditStyle {
  return EDIT_STYLES[(isEditStyle(step) ? step : DEFAULT_EDIT_STYLE) - 1];
}

/** The script's own setting wins; otherwise the business default. */
export function effectiveEditStyle(business: { settings: { editStyle: EditStyleStep } }, script?: { editStyle?: EditStyleStep | null }): EditStyle {
  return editStyle(script?.editStyle ?? business.settings.editStyle);
}

/** Instructions for the Edit stage's edit-decision-list prompt. */
export function editStyleBrief(s: EditStyle): string {
  return `Edit style: ${s.name} (${s.step} of 5, where 1 is raw and 5 is polished). ${s.description}
- Cuts: ${s.avgShotSeconds ? `about one every ${s.avgShotSeconds} seconds` : "only remove dead air, restarts and mistakes; keep natural pauses"}.
- Captions: ${s.captions}
- Zoom punch-ins: ${s.zoomsPerMinute ? `at most ${s.zoomsPerMinute} per minute, on key lines` : "none"}.
- B-roll: ${s.brollShare ? `at most ${Math.round(s.brollShare * 100)}% of the runtime, only real footage of the business` : "none"}.
- Hook overlay: ${s.hookOverlay}
- Music and effects: ${s.effects}
Keep the owner's face on screen most of the time. When in doubt, choose the less produced option: the goal is a video that feels human.`;
}
