"use client";

import { useState } from "react";
import { Breakdown } from "./Breakdown";
import type { Format } from "@/lib/formats";
import type { ReferenceVideo, VideoPlatform } from "@/lib/types";

const PLATFORM: Record<VideoPlatform, string> = { tiktok: "TikTok", instagram: "Instagram", youtube: "YouTube", linkedin: "LinkedIn" };

export function ReferencesView({
  businessId,
  references,
  onChange,
  onFormatSaved,
}: {
  businessId: string;
  references: ReferenceVideo[];
  onChange: (refs: ReferenceVideo[]) => void;
  onFormatSaved: (f: Format) => void;
}) {
  const [url, setUrl] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState<string>("");
  const [error, setError] = useState("");

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setBusy("add");
    setError("");
    try {
      const res = await fetch(`/api/businesses/${businessId}/references`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url, note }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Couldn't add that video.");
      onChange([json.reference, ...references]);
      setUrl("");
      setNote("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't add that video.");
    } finally {
      setBusy("");
    }
  }

  async function saveFormat(r: ReferenceVideo) {
    setBusy(r.id);
    setError("");
    try {
      const res = await fetch(`/api/references/${r.id}/format`, { method: "POST" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Couldn't save the format.");
      onChange(references.map((x) => (x.id === r.id ? json.reference : x)));
      onFormatSaved(json.format);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't save the format.");
    } finally {
      setBusy("");
    }
  }

  async function remove(r: ReferenceVideo) {
    setBusy(r.id);
    setError("");
    try {
      const res = await fetch(`/api/references/${r.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error((await res.json()).error || "Couldn't remove it.");
      onChange(references.filter((x) => x.id !== r.id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't remove it.");
    } finally {
      setBusy("");
    }
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 16 }}>
      <form className="panel ref-form" onSubmit={add}>
        <h3 style={{ margin: 0 }}>Add a reference video</h3>
        <p className="muted" style={{ margin: 0, fontSize: 14 }}>
          Paste a TikTok, Instagram, YouTube or LinkedIn link to a video you like. Claude breaks down the structure and uses it as a style signal
          when writing your scripts. We save the link and the breakdown, never the video.
        </p>
        <div className="field">
          <label htmlFor="ref-url">Link</label>
          <input id="ref-url" className="input" type="url" inputMode="url" placeholder="https://www.tiktok.com/@creator/video/…" value={url} onChange={(e) => setUrl(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="ref-note">What do you like about it? (optional)</label>
          <textarea id="ref-note" className="textarea" rows={2} placeholder="The cold open, the way she counts down three mistakes, how fast it moves…" value={note} onChange={(e) => setNote(e.target.value)} />
          <span className="hint">The more you say, the less Claude has to leave blank. It can&apos;t watch the video, only read its public caption.</span>
        </div>
        <div>
          <button className="btn primary" type="submit" disabled={busy === "add" || !url.trim()}>
            {busy === "add" ? "Breaking it down…" : "Add reference"}
          </button>
        </div>
      </form>

      {error && (
        <p className="err" role="alert">
          {error}
        </p>
      )}

      {references.length === 0 ? (
        <div className="panel empty">
          <h2>No references yet</h2>
          <p>Add a few videos you wish you&apos;d made. Your scripts will start to borrow their hooks, pacing and structure.</p>
        </div>
      ) : (
        <div className="grid-2">
          {references.map((r) => (
            <article key={r.id} className="panel ref">
              <div className="row" style={{ justifyContent: "space-between" }}>
                <span className="chip neutral">{PLATFORM[r.platform]}</span>
                <a className="ref-link" href={r.url} target="_blank" rel="noopener noreferrer">
                  Open the original ↗
                </a>
              </div>
              {r.meta?.title && (
                <p className="ref-title">
                  “{r.meta.title.slice(0, 180)}
                  {r.meta.title.length > 180 ? "…" : ""}”{r.meta.author ? <span className="faint"> · {r.meta.author}</span> : null}
                </p>
              )}
              {r.note && <p className="ref-note">You said: {r.note}</p>}
              <Breakdown b={r.breakdown} />
              <div className="actions">
                {r.formatId ? (
                  <span className="chip good">Saved as a format</span>
                ) : (
                  <button className="btn sm" onClick={() => saveFormat(r)} disabled={busy === r.id}>
                    {busy === r.id ? "Saving…" : "Save as format"}
                  </button>
                )}
                <button className="btn ghost sm" onClick={() => remove(r)} disabled={busy === r.id}>
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
