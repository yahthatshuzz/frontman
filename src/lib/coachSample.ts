/**
 * Browser-side sampling for the delivery coach: about 1 JPEG frame per second (max 40, 320px wide) and loudness per
 * half second. Runs on the phone right after a take uploads, so the full video never has to be decoded on a server.
 * Mirrors sampleTake() in public/terminal/app.js.
 */
export interface CoachPayload {
  frames: { t: number; data: string }[];
  loudness: number[];
  duration: number;
}

export async function sampleTake(blob: Blob, maxFrames = 40): Promise<CoachPayload> {
  const out: CoachPayload = { frames: [], loudness: [], duration: 0 };
  const url = URL.createObjectURL(blob);
  const v = document.createElement("video");
  v.muted = true;
  v.playsInline = true;
  v.preload = "auto";
  const seek = (t: number) =>
    new Promise<void>((ok) => {
      const h = () => {
        v.removeEventListener("seeked", h);
        ok();
      };
      v.addEventListener("seeked", h);
      v.currentTime = t;
    });
  try {
    await new Promise<void>((ok, no) => {
      v.onloadedmetadata = () => ok();
      v.onerror = () => no(new Error("Couldn't read the video"));
      v.src = url;
    });
    // MediaRecorder WebM reports Infinity until you seek to the end.
    if (!isFinite(v.duration) || v.duration <= 0) {
      await seek(1e7);
      await seek(0);
    }
    const d = isFinite(v.duration) && v.duration > 0 ? v.duration : 0;
    out.duration = d;
    if (d) {
      const step = Math.max(1, d / maxFrames);
      const w = 320;
      const h = Math.round((320 * (v.videoHeight || 16)) / (v.videoWidth || 9));
      const cv = document.createElement("canvas");
      cv.width = w;
      cv.height = h;
      const cx = cv.getContext("2d");
      for (let t = Math.min(0.5, d / 2); t < d; t += step) {
        await seek(t);
        if (!cx) break;
        cx.drawImage(v, 0, 0, w, h);
        out.frames.push({ t: Math.round(t * 10) / 10, data: cv.toDataURL("image/jpeg", 0.6).split(",")[1] });
      }
    }
  } finally {
    URL.revokeObjectURL(url);
  }
  try {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ac = new AC();
    const buf = await ac.decodeAudioData(await blob.arrayBuffer());
    const ch = buf.getChannelData(0);
    const win = Math.floor(buf.sampleRate / 2);
    for (let i = 0; i + win <= ch.length; i += win) {
      let s = 0;
      for (let j = i; j < i + win; j += 4) s += ch[j] * ch[j];
      out.loudness.push(Math.round(Math.sqrt(s / (win / 4)) * 10000) / 10000);
    }
    await ac.close();
  } catch {
    // No audio track or the browser can't decode this container; the coach works without it.
  }
  return out;
}
