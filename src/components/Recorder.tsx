"use client";

/**
 * The phone recorder at /r/[token]: camera preview, teleprompter overlay, takes uploaded straight to storage.
 * Teleprompter modes come from src/lib/teleprompter.ts (Voice follows speech, Timed hits a target length, Manual is a set speed).
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PhoneSession } from "@/lib/shoot";
import { createTracker, effectiveMode, FALLBACK_NOTE, prepare, speechSupported, TARGET_PRESETS, timedPace } from "@/lib/teleprompter";
import type { TeleprompterMode, TeleprompterSettings } from "@/lib/types";
import { sampleTake } from "@/lib/coachSample";
import { putFile, videoSeconds } from "@/lib/uploadClient";

type Phase = "start" | "ready" | "countdown" | "recording" | "review" | "sending";
type Narration = TeleprompterSettings["narration"];

const MIMES = ["video/mp4;codecs=avc1.42E01E,mp4a.40.2", "video/mp4", "video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm"];
const VIDEO_BPS = 4_500_000;
const NARRATION: { id: Narration; name: string }[] = [
  { id: "full", name: "Full script" },
  { id: "bullets", name: "Bullets" },
  { id: "hook", name: "Hook only" },
  { id: "off", name: "Off" },
];
const MODES: { id: TeleprompterMode; name: string }[] = [
  { id: "voice", name: "Voice" },
  { id: "timed", name: "Timed" },
  { id: "manual", name: "Manual" },
];

// Minimal Web Speech API types (not in the DOM lib).
interface SpeechResultList {
  length: number;
  [i: number]: { 0: { transcript: string } };
}
interface Recognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((e: { results: SpeechResultList }) => void) | null;
  onend: (() => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

function pickMime(): string {
  if (typeof MediaRecorder === "undefined") return "";
  return MIMES.find((m) => MediaRecorder.isTypeSupported(m)) ?? "";
}

function bullet(line: string): string {
  const words = line.split(/\s+/);
  return words.length > 7 ? `${words.slice(0, 6).join(" ")}…` : line;
}

function clock(s: number): string {
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

export function Recorder({ token, session }: { token: string; session: PhoneSession }) {
  const [scripts, setScripts] = useState(session.scripts);
  const [scriptId, setScriptId] = useState(session.scriptId);
  const script = scripts.find((s) => s.id === scriptId) ?? scripts[0];
  const [tp, setTp] = useState<TeleprompterSettings>(session.teleprompter);
  const [mode, setMode] = useState<TeleprompterMode>(session.teleprompter.mode);
  const [note, setNote] = useState("");
  const [phase, setPhase] = useState<Phase>("start");
  const [count, setCount] = useState(3);
  const [elapsed, setElapsed] = useState(0);
  const [line, setLine] = useState(0);
  const [sheet, setSheet] = useState<"" | "scripts" | "settings">("");
  const [facing, setFacing] = useState<"user" | "environment">("user");
  const [camErr, setCamErr] = useState("");
  const [review, setReview] = useState<{ blob: Blob; url: string; seconds: number; mime: string } | null>(null);
  const [progress, setProgress] = useState(0);
  const [sendErr, setSendErr] = useState("");
  const [toast, setToast] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const bytes = useRef(0);
  const startedAt = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognition = useRef<Recognition | null>(null);
  const listening = useRef(false);
  const restarts = useRef<number[]>([]);
  const offsetWords = useRef(0);
  const raf = useRef(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const autoStopped = useRef(false);

  // What's on screen. Voice tracking always matches against the words of what's shown (or the full script for bullets).
  const text = script ? (tp.narration === "hook" ? script.hook : script.text) : "";
  const prepared = useMemo(() => prepare(text), [text]);
  const tracker = useMemo(() => createTracker(prepared), [prepared]);
  const pace = useMemo(() => timedPace(text, tp.targetSeconds), [text, tp.targetSeconds]);

  useEffect(() => {
    const pick = effectiveMode(session.teleprompter.mode, speechSupported());
    setMode(pick.mode);
    if (pick.note) setNote(pick.note);
  }, [session.teleprompter.mode]);

  // Reset the prompter when the script or narration changes.
  useEffect(() => {
    tracker.reset();
    offsetWords.current = 0;
    setLine(0);
    scrollRef.current?.scrollTo({ top: 0 });
  }, [tracker]);

  // Keep the current line near the top, just under the lens.
  useEffect(() => {
    const box = scrollRef.current;
    const el = box?.querySelector<HTMLElement>(`[data-line="${line}"]`);
    if (box && el) box.scrollTo({ top: Math.max(0, el.offsetTop - 8), behavior: "smooth" });
  }, [line]);

  const startCamera = useCallback(async (face: "user" | "environment") => {
    setCamErr("");
    streamRef.current?.getTracks().forEach((t) => t.stop());
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: face, width: { ideal: 1080 }, height: { ideal: 1920 }, frameRate: { ideal: 30 } },
        audio: { echoCancellation: true, noiseSuppression: true },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => undefined);
      }
      setPhase("ready");
    } catch (e) {
      const name = e instanceof Error ? e.name : "";
      setCamErr(
        name === "NotAllowedError"
          ? "Frontman needs your camera and microphone. In Safari, tap aA in the address bar, then Website Settings, and allow both. Then tap Start camera again."
          : !window.isSecureContext
            ? "The camera only works over a secure (https) link. Open the link from your QR code."
            : "Couldn't start the camera. Close other apps using it and try again, or use your camera app below.",
      );
    }
  }, []);

  // Keep the screen awake while the recorder is open.
  useEffect(() => {
    let lock: { release(): Promise<void> } | null = null;
    const nav = navigator as Navigator & { wakeLock?: { request(t: "screen"): Promise<{ release(): Promise<void> }> } };
    nav.wakeLock?.request("screen").then((l) => (lock = l)).catch(() => undefined);
    return () => {
      lock?.release().catch(() => undefined);
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // ---- Teleprompter drivers ----
  function stopListening() {
    listening.current = false;
    try {
      recognition.current?.abort();
    } catch {}
    recognition.current = null;
  }

  function fallbackToTimed() {
    stopListening();
    setMode("timed");
    setNote(FALLBACK_NOTE);
    offsetWords.current = tracker.state.word;
    startedAt.current = performance.now();
    runTimer("timed");
  }

  function startListening() {
    const w = window as unknown as Record<string, new () => Recognition>;
    const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!Ctor) return fallbackToTimed();
    const rec = new Ctor();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = navigator.language || "en-US";
    rec.onresult = (e) => {
      let heard = "";
      for (let i = 0; i < e.results.length; i++) heard += ` ${e.results[i][0].transcript}`;
      setLine(tracker.update(heard).line);
    };
    rec.onerror = (e) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed" || e.error === "audio-capture") fallbackToTimed();
    };
    // iOS Safari stops after short pauses and ignores `continuous`, so restart. Too many restarts means it isn't working.
    rec.onend = () => {
      if (!listening.current) return;
      const now = Date.now();
      restarts.current = [...restarts.current.filter((t) => now - t < 15000), now];
      if (restarts.current.length > 10) return fallbackToTimed();
      try {
        rec.start();
      } catch {
        fallbackToTimed();
      }
    };
    recognition.current = rec;
    listening.current = true;
    restarts.current = [];
    try {
      rec.start();
    } catch {
      fallbackToTimed();
    }
  }

  function runTimer(m: TeleprompterMode) {
    cancelAnimationFrame(raf.current);
    const rate = m === "manual" ? tp.manualWpm / 60 : pace.wordsPerSecond;
    const tick = () => {
      const secs = (performance.now() - startedAt.current) / 1000;
      const i = Math.min(prepared.tokens.length - 1, Math.floor(offsetWords.current + secs * rate));
      if (i >= 0 && prepared.tokens[i]) setLine(prepared.tokens[i].line);
      setElapsed((performance.now() - recStart.current) / 1000);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }
  const recStart = useRef(0);

  function seek(l: number) {
    setLine(l);
    tracker.seekLine(l);
    const i = prepared.tokens.findIndex((t) => t.line >= l);
    if (phase === "recording" && mode !== "voice" && i >= 0) {
      offsetWords.current = i;
      startedAt.current = performance.now();
    }
  }

  // ---- Recording ----
  function begin() {
    if (!streamRef.current) return;
    setSendErr("");
    setPhase("countdown");
    setCount(3);
    let n = 3;
    const t = setInterval(() => {
      n -= 1;
      if (n > 0) setCount(n);
      else {
        clearInterval(t);
        record();
      }
    }, 800);
  }

  function record() {
    const stream = streamRef.current;
    if (!stream) return;
    const mime = pickMime();
    let mr: MediaRecorder;
    try {
      mr = new MediaRecorder(stream, { ...(mime ? { mimeType: mime } : {}), videoBitsPerSecond: VIDEO_BPS, audioBitsPerSecond: 128_000 });
    } catch {
      setCamErr("This browser can't record video here. Use your camera app below instead.");
      setPhase("ready");
      return;
    }
    chunks.current = [];
    bytes.current = 0;
    autoStopped.current = false;
    const limit = session.maxUploadMb * 1024 * 1024 * 0.95;
    mr.ondataavailable = (e) => {
      if (!e.data.size) return;
      chunks.current.push(e.data);
      bytes.current += e.data.size;
      if (bytes.current > limit && mr.state === "recording") {
        autoStopped.current = true;
        mr.stop();
      }
    };
    mr.onstop = () => {
      cancelAnimationFrame(raf.current);
      stopListening();
      const type = (mr.mimeType || mime || "video/mp4").split(";")[0];
      const blob = new Blob(chunks.current, { type });
      const seconds = (performance.now() - recStart.current) / 1000;
      setReview({ blob, url: URL.createObjectURL(blob), seconds, mime: type });
      setPhase("review");
      if (autoStopped.current) setSendErr("Recording stopped at the upload size limit. Send this take, then keep going in a new one.");
    };
    recRef.current = mr;
    mr.start(1000);
    recStart.current = performance.now();
    startedAt.current = performance.now();
    offsetWords.current = tracker.state.word;
    setElapsed(0);
    setPhase("recording");
    if (tp.narration === "off") runTimer("manual");
    else if (mode === "voice") {
      startListening();
      runClockOnly();
    } else runTimer(mode);
  }

  function runClockOnly() {
    cancelAnimationFrame(raf.current);
    const tick = () => {
      setElapsed((performance.now() - recStart.current) / 1000);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }

  function stop() {
    if (recRef.current?.state === "recording") recRef.current.stop();
  }

  function retake() {
    if (review) URL.revokeObjectURL(review.url);
    setReview(null);
    setSendErr("");
    tracker.reset();
    offsetWords.current = 0;
    setLine(0);
    setPhase(streamRef.current ? "ready" : "start");
    // The preview element was hidden during review; reattach the live camera.
    if (videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(() => undefined);
    }
  }

  async function send(blob: Blob, mime: string, seconds: number, after?: () => void) {
    if (!script) return;
    setSendErr("");
    setProgress(0);
    setPhase("sending");
    try {
      const res = await fetch(`/api/r/${token}/takes`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ scriptId: script.id, mime, bytes: blob.size, seconds }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Couldn't start the upload.");
      await putFile(j.upload, blob, setProgress);
      const done = await fetch(`/api/r/${token}/takes/${j.take.id}/done`, { method: "POST" });
      const dj = await done.json();
      if (!done.ok) throw new Error(dj.error || "The upload didn't finish.");
      // Score the take in the background: sample frames and loudness here, the server does the rest.
      sampleTake(blob)
        .then((p) => fetch(`/api/r/${token}/takes/${j.take.id}/coach`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(p) }))
        .catch(() => undefined);
      setScripts((cur) => cur.map((s) => (s.id === script.id ? { ...s, takes: s.takes + 1 } : s)));
      setToast(`Take ${script.takes + 1} saved to your dashboard`);
      setTimeout(() => setToast(""), 3000);
      after?.();
      retake();
    } catch (e) {
      setSendErr(e instanceof Error ? e.message : "The upload failed. Try again.");
      setPhase(review ? "review" : streamRef.current ? "ready" : "start");
    }
  }

  async function fromCameraApp(file: File) {
    const seconds = await videoSeconds(file);
    await send(file, file.type || "video/mp4", seconds, () => {
      if (fileRef.current) fileRef.current.value = "";
    });
  }

  if (!script) {
    return (
      <main className="rec rec-msg">
        <div>
          <p className="rec-brand">Frontman · {session.businessName}</p>
          <h1>No approved scripts yet</h1>
          <p>Approve a script on your dashboard, then scan the QR code again.</p>
        </div>
      </main>
    );
  }

  const recording = phase === "recording";
  const showPrompter = tp.narration !== "off" && phase !== "review" && phase !== "sending";

  return (
    <main className={`rec ${recording ? "is-rec" : ""}`}>
      <video ref={videoRef} className={`rec-cam ${facing === "user" ? "mirror" : ""}`} playsInline muted autoPlay hidden={phase === "review" || phase === "sending"} />
      {review && (phase === "review" || phase === "sending") && <video className="rec-cam" src={review.url} playsInline controls autoPlay />}

      {showPrompter && (
        <div className="rec-prompter" ref={scrollRef} style={{ fontSize: tp.textSize }} aria-live="off">
          {prepared.lines.map((l, i) => (
            <p key={i} data-line={i} className={i === line ? "on" : i < line ? "past" : ""} onClick={() => seek(i)}>
              {tp.narration === "bullets" ? `• ${bullet(l)}` : l}
            </p>
          ))}
          <div style={{ height: "60%" }} />
        </div>
      )}

      <header className="rec-top">
        <button type="button" className="rec-pill" onClick={() => !recording && setSheet("scripts")} disabled={recording}>
          <span className="rec-dim">{session.businessName}</span>
          <b>{script.title}</b>
        </button>
        {recording ? (
          <span className="rec-time" role="timer">
            <i aria-hidden="true" /> {clock(elapsed)}
          </span>
        ) : (
          <button type="button" className="rec-icon" onClick={() => setSheet("settings")} aria-label="Teleprompter settings">
            Aa
          </button>
        )}
      </header>

      {phase === "start" && (
        <div className="rec-center">
          <p className="rec-brand">Frontman</p>
          <h1>{script.title}</h1>
          <p className="rec-dim">
            {scripts.length} approved script{scripts.length > 1 ? "s" : ""} · {script.takes ? `${script.takes} take${script.takes > 1 ? "s" : ""} so far` : "no takes yet"}
          </p>
          <button className="rec-btn primary" type="button" onClick={() => startCamera(facing)}>
            Start camera
          </button>
          {camErr && <p className="rec-err">{camErr}</p>}
          <button className="rec-link" type="button" onClick={() => fileRef.current?.click()}>
            Use my camera app instead
          </button>
        </div>
      )}

      {phase === "countdown" && (
        <div className="rec-count" aria-live="assertive">
          {count}
        </div>
      )}

      {toast && (
        <div className="rec-toast" role="status">
          {toast}
        </div>
      )}

      <footer className="rec-bottom">
        {note && phase !== "start" && <p className="rec-note">{note}</p>}
        {sendErr && <p className="rec-err">{sendErr}</p>}

        {(phase === "ready" || phase === "recording" || phase === "countdown") && (
          <>
            <p className="rec-dim rec-mode">
              {tp.narration === "off" ? "Teleprompter off" : mode === "voice" ? "Voice: scrolls as you talk" : mode === "timed" ? `Timed: ${tp.targetSeconds}s · ${pace.wpm} wpm` : `Manual: ${tp.manualWpm} wpm`}
            </p>
            <div className="rec-controls">
              <button type="button" className="rec-icon" onClick={() => fileRef.current?.click()} disabled={recording} aria-label="Use my camera app">
                ⤒
              </button>
              <button
                type="button"
                className={`rec-shutter ${recording ? "on" : ""}`}
                onClick={recording ? stop : begin}
                disabled={phase === "countdown"}
                aria-label={recording ? "Stop recording" : "Start recording"}
              >
                <i />
              </button>
              <button
                type="button"
                className="rec-icon"
                disabled={recording}
                aria-label="Flip camera"
                onClick={() => {
                  const next = facing === "user" ? "environment" : "user";
                  setFacing(next);
                  startCamera(next);
                }}
              >
                ⟲
              </button>
            </div>
          </>
        )}

        {phase === "review" && review && (
          <div className="rec-review">
            <p>
              {clock(review.seconds)} · {(review.blob.size / 1048576).toFixed(1)} MB
            </p>
            <div className="rec-row">
              <button className="rec-btn" type="button" onClick={retake}>
                Retake
              </button>
              <button className="rec-btn primary" type="button" onClick={() => send(review.blob, review.mime, review.seconds)}>
                Send take
              </button>
            </div>
          </div>
        )}

        {phase === "sending" && (
          <div className="rec-review" aria-live="polite">
            <p>Sending… {Math.round(progress * 100)}%</p>
            <span className="rec-bar">
              <i style={{ width: `${Math.round(progress * 100)}%` }} />
            </span>
            <p className="rec-dim">Keep this page open until it finishes.</p>
          </div>
        )}
      </footer>

      <input ref={fileRef} type="file" accept="video/*" capture="user" hidden onChange={(e) => e.target.files?.[0] && fromCameraApp(e.target.files[0])} />

      {sheet && (
        <div className="rec-sheet-wrap" onClick={() => setSheet("")}>
          <div className="rec-sheet" role="dialog" aria-label={sheet === "scripts" ? "Choose a script" : "Teleprompter settings"} onClick={(e) => e.stopPropagation()}>
            <div className="rec-grab" aria-hidden="true" />
            {sheet === "scripts" ? (
              <>
                <h2>Scripts in this shoot</h2>
                <div className="rec-list">
                  {scripts.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      className={s.id === script.id ? "on" : ""}
                      onClick={() => {
                        setScriptId(s.id);
                        setSheet("");
                      }}
                    >
                      <b>{s.title}</b>
                      <span className="rec-dim">
                        {s.pillar[0].toUpperCase() + s.pillar.slice(1)} · {s.takes ? `${s.takes} take${s.takes > 1 ? "s" : ""}` : "not shot yet"}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2>Teleprompter</h2>
                <span className="rec-label">On screen</span>
                <div className="rec-seg">
                  {NARRATION.map((n) => (
                    <button key={n.id} type="button" className={tp.narration === n.id ? "on" : ""} onClick={() => setTp({ ...tp, narration: n.id })}>
                      {n.name}
                    </button>
                  ))}
                </div>
                <span className="rec-label">How it scrolls</span>
                <div className="rec-seg">
                  {MODES.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      className={mode === m.id ? "on" : ""}
                      onClick={() => {
                        if (m.id === "voice" && !speechSupported()) return setNote(FALLBACK_NOTE);
                        setNote("");
                        setMode(m.id);
                      }}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
                {mode === "timed" && (
                  <>
                    <span className="rec-label">Target length · {pace.wpm} wpm</span>
                    <div className="rec-seg">
                      {TARGET_PRESETS.map((s) => (
                        <button key={s} type="button" className={tp.targetSeconds === s ? "on" : ""} onClick={() => setTp({ ...tp, targetSeconds: s })}>
                          {s}s
                        </button>
                      ))}
                    </div>
                  </>
                )}
                {mode === "manual" && (
                  <label className="rec-range">
                    <span className="rec-label">Speed · {tp.manualWpm} wpm</span>
                    <input type="range" min={60} max={260} step={5} value={tp.manualWpm} onChange={(e) => setTp({ ...tp, manualWpm: Number(e.target.value) })} />
                  </label>
                )}
                <label className="rec-range">
                  <span className="rec-label">Text size · {tp.textSize}px</span>
                  <input type="range" min={16} max={56} value={tp.textSize} onChange={(e) => setTp({ ...tp, textSize: Number(e.target.value) })} />
                </label>
                <p className="rec-dim" style={{ fontSize: 13 }}>
                  Voice listens while you record and keeps your line at the top. If your phone can&apos;t listen, it switches to Timed. Tap any line to jump to it.
                </p>
              </>
            )}
            <button className="rec-btn" type="button" onClick={() => setSheet("")}>
              Done
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
