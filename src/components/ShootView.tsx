"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PillarChip } from "./Pillar";
import { putFile, videoSeconds } from "@/lib/uploadClient";
import type { Business, Script, Take } from "@/lib/types";

type TakeView = Take & { url: string };
interface Link {
  url: string;
  qr: string;
  expiresAt: string;
  openedAt: string | null;
}

const ready = (s: Script) => s.status === "approved" || s.status === "shot" || s.status === "posted";

export function ShootView({ business, scripts, onScripts }: { business: Business; scripts: Script[]; onScripts: (s: Script[]) => void }) {
  const shootable = scripts.filter(ready);
  const [scriptId, setScriptId] = useState(shootable[0]?.id ?? "");
  const [link, setLink] = useState<Link | null>(null);
  const [linkErr, setLinkErr] = useState("");
  const [takes, setTakes] = useState<TakeView[]>([]);
  const [phoneOpened, setPhoneOpened] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [upload, setUpload] = useState<{ name: string; share: number } | null>(null);
  const [uploadErr, setUploadErr] = useState("");
  const [drag, setDrag] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const seen = useRef<Set<string>>(new Set());
  const loaded = useRef(false);
  const [fresh, setFresh] = useState<Set<string>>(new Set());

  const refresh = useCallback(async () => {
    const res = await fetch(`/api/businesses/${business.id}/takes`, { cache: "no-store" });
    if (!res.ok) return;
    const json = await res.json();
    const list: TakeView[] = json.takes;
    const newOnes = loaded.current ? list.filter((t) => !seen.current.has(t.id)).map((t) => t.id) : [];
    list.forEach((t) => seen.current.add(t.id));
    loaded.current = true;
    if (newOnes.length) setFresh(new Set(newOnes));
    setTakes(list);
    setPhoneOpened(json.phoneOpenedAt);
    if (newOnes.length) onScripts(json.scripts);
  }, [business.id, onScripts]);

  useEffect(() => {
    seen.current = new Set();
    loaded.current = false;
    refresh();
    const t = setInterval(() => document.visibilityState === "visible" && refresh(), 4000);
    return () => clearInterval(t);
  }, [refresh]);

  useEffect(() => {
    if (!scriptId) return;
    setLinkErr("");
    fetch(`/api/businesses/${business.id}/shoot-link`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ scriptId }) })
      .then(async (r) => {
        const j = await r.json();
        if (!r.ok) throw new Error(j.error || "Couldn't make the QR code.");
        setLink(j);
      })
      .catch((e) => setLinkErr(e instanceof Error ? e.message : "Couldn't make the QR code."));
  }, [business.id, scriptId]);

  async function sendFile(file: File) {
    setUploadErr("");
    if (!scriptId) return setUploadErr("Pick the script this video is for first.");
    if (!file.type.startsWith("video/")) return setUploadErr("That isn't a video file. Upload an MP4 or MOV.");
    setUpload({ name: file.name, share: 0 });
    try {
      const seconds = await videoSeconds(file);
      const start = await fetch(`/api/businesses/${business.id}/takes`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ scriptId, mime: file.type || "video/mp4", bytes: file.size, seconds }),
      });
      const sj = await start.json();
      if (!start.ok) throw new Error(sj.error || "Couldn't start the upload.");
      await putFile(sj.upload, file, (share) => setUpload({ name: file.name, share }));
      const done = await fetch(`/api/takes/${sj.take.id}/done`, { method: "POST" });
      const dj = await done.json();
      if (!done.ok) throw new Error(dj.error || "The upload didn't finish.");
      await refresh();
    } catch (e) {
      setUploadErr(e instanceof Error ? e.message : "The upload failed. Try again.");
    } finally {
      setUpload(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this take? This can't be undone.")) return;
    const res = await fetch(`/api/takes/${id}`, { method: "DELETE" });
    if (res.ok) setTakes((cur) => cur.filter((t) => t.id !== id));
  }

  if (!shootable.length) {
    return (
      <div className="panel empty">
        <h2>Approve a script to start shooting</h2>
        <p>Open Scripts, pick a hook, and approve one. Then come back here for the QR code that opens your teleprompter on your phone.</p>
      </div>
    );
  }

  const current = shootable.find((s) => s.id === scriptId);
  const mine = takes.filter((t) => t.scriptId === scriptId);
  const countFor = (id: string) => takes.filter((t) => t.scriptId === id).length;

  return (
    <div className="shoot">
      <div className="shoot-scripts" role="radiogroup" aria-label="Script to shoot">
        {shootable.map((s) => (
          <button key={s.id} type="button" role="radio" aria-checked={s.id === scriptId} className={s.id === scriptId ? "on" : ""} onClick={() => setScriptId(s.id)}>
            <span className="row" style={{ gap: 6, justifyContent: "space-between" }}>
              <PillarChip id={s.pillar} />
              <span className="faint" style={{ fontSize: 12 }}>
                {countFor(s.id) ? `${countFor(s.id)} take${countFor(s.id) > 1 ? "s" : ""}` : "Not shot"}
              </span>
            </span>
            <b>{s.title}</b>
          </button>
        ))}
      </div>

      <div className="shoot-one">
        <section className="panel shoot-in" aria-labelledby="phone-h">
          <div className="row" style={{ justifyContent: "space-between" }}>
            <h3 id="phone-h" style={{ margin: 0 }}>
              Record on your phone
            </h3>
            <span className={`chip ${phoneOpened ? "good" : "neutral"}`} aria-live="polite">
              {phoneOpened ? "Phone connected" : "Waiting for your phone"}
            </span>
          </div>
          <div className="qr-row">
            <div className="qr" aria-label="QR code that opens the recorder on your phone">
              {link ? <span dangerouslySetInnerHTML={{ __html: link.qr }} /> : <span className="faint">{linkErr || "Making your code…"}</span>}
            </div>
            <ol className="qr-steps">
              <li>Open your iPhone camera and point it at the code.</li>
              <li>Allow camera and microphone. Your script scrolls as you talk.</li>
              <li>Tap record. Each take shows up here as soon as it uploads.</li>
            </ol>
          </div>
          {link && (
            <div className="link-row">
              <input className="input" readOnly value={link.url} aria-label="Recorder link" onFocus={(e) => e.target.select()} />
              <button
                className="btn sm"
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(link.url);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
              >
                {copied ? "Copied" : "Copy link"}
              </button>
            </div>
          )}
          <p className="hint" style={{ margin: 0 }}>
            The link works for 24 hours and only opens this business&apos;s approved scripts. Anyone with it can record, so only send it to yourself.
          </p>

          <div className="or" aria-hidden="true">
            <span>or upload a video you already shot</span>
          </div>

          <label
            className={`drop ${drag ? "over" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDrag(false);
              const f = e.dataTransfer.files?.[0];
              if (f) sendFile(f);
            }}
          >
            <input ref={fileRef} type="file" accept="video/*" hidden onChange={(e) => e.target.files?.[0] && sendFile(e.target.files[0])} disabled={!!upload} />
            {upload ? (
              <span style={{ display: "grid", gap: 8, width: "100%" }}>
                <span>Uploading {upload.name}…</span>
                <span className="bar" aria-hidden="true">
                  <i style={{ width: `${Math.round(upload.share * 100)}%` }} />
                </span>
                <span className="faint">{Math.round(upload.share * 100)}%</span>
              </span>
            ) : (
              <span>
                <b>Drop a video here</b> or click to choose one
                <br />
                <span className="faint">MP4 or MOV, saved as a take for &ldquo;{current?.title}&rdquo;</span>
              </span>
            )}
          </label>
          {uploadErr && (
            <p className="err" role="alert">
              {uploadErr}
            </p>
          )}
        </section>

        <section className="panel" aria-labelledby="takes-h">
          <h3 id="takes-h" style={{ marginTop: 0 }}>
            Takes for this script
          </h3>
          {mine.length === 0 ? (
            <p className="muted" style={{ margin: 0 }}>
              No takes yet. Record a few: the Edit stage picks the strongest one.
            </p>
          ) : (
            <div className="takes">
              {mine.map((t, i) => (
                <figure key={t.id} className={`take ${fresh.has(t.id) ? "fresh" : ""}`}>
                  <video src={t.url} controls playsInline preload="metadata" />
                  <figcaption>
                    <span>
                      Take {mine.length - i}
                      <span className="faint">
                        {" "}
                        · {t.source === "phone" ? "Phone" : "Upload"}
                        {t.seconds ? ` · ${Math.round(t.seconds)}s` : ""}
                        {" · "}
                        {new Date(t.createdAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                      </span>
                    </span>
                    <button className="btn sm ghost" type="button" onClick={() => remove(t.id)}>
                      Delete
                    </button>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
