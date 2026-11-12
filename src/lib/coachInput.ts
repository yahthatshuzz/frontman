/** Parse the browser's coach payload: sampled JPEG frames (base64), loudness per half second, and duration. */
export function coachInput(body: unknown): { frames: { t: number; data: string }[]; loudness: number[]; duration: number } {
  const b = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const frames = Array.isArray(b.frames)
    ? b.frames
        .map((f) => (f && typeof f === "object" ? (f as Record<string, unknown>) : {}))
        .filter((f) => typeof f.data === "string" && typeof f.t === "number")
        .map((f) => ({ t: f.t as number, data: (f.data as string).replace(/^data:image\/jpeg;base64,/, "") }))
    : [];
  const loudness = Array.isArray(b.loudness) ? b.loudness.map(Number).filter(Number.isFinite) : [];
  return { frames, loudness, duration: Number(b.duration) || 0 };
}
