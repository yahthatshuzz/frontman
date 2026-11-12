"use client";

import { useState } from "react";
import { PillarChip, WithFills } from "./Pillar";
import { EDIT_STYLES } from "@/lib/editStyles";
import type { EditStyleStep, Platform, Script } from "@/lib/types";

const PLATFORM: Record<Platform, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube_shorts: "Shorts",
  linkedin: "LinkedIn",
};

export function ScriptCard({ script, formatName, onChange }: { script: Script; formatName?: string; onChange: (s: Script) => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ title: script.title, hooks: script.hooks, body: script.body, cta: script.cta });
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState<"" | "save" | "revise" | "status">("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function patch(body: Record<string, unknown>, kind: "save" | "status") {
    setBusy(kind);
    setError("");
    try {
      const res = await fetch(`/api/scripts/${script.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Couldn't save.");
      onChange(json.script);
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't save.");
      return false;
    } finally {
      setBusy("");
    }
  }

  async function revise(e: React.FormEvent) {
    e.preventDefault();
    if (!note.trim()) return;
    setBusy("revise");
    setError("");
    try {
      const res = await fetch(`/api/scripts/${script.id}/revise`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ note }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Couldn't revise.");
      onChange(json.script);
      setDraft({ title: json.script.title, hooks: json.script.hooks, body: json.script.body, cta: json.script.cta });
      setNote("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't revise.");
    } finally {
      setBusy("");
    }
  }

  async function save() {
    const ok = await patch({ ...draft, hooks: draft.hooks.map((h) => h.trim()).filter(Boolean) }, "save");
    if (ok) setEditing(false);
  }

  async function copy() {
    const text = `${script.hooks[script.selectedHook] ?? ""}\n\n${script.body}\n\n${script.cta}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setError("Couldn't copy. Select the text and copy it instead.");
    }
  }

  const approved = script.status === "approved";

  return (
    <article className={`panel script ${approved ? "approved" : ""}`}>
      <div className="script-top">
        <div className="script-meta">
          <PillarChip id={script.pillar} />
          {formatName && <span className="chip neutral">{formatName}</span>}
          <span>~{script.estSeconds}s</span>
          {script.editStyle ? <span>· {EDIT_STYLES[script.editStyle - 1].name} edit</span> : null}
          <span>· {script.platforms.map((p) => PLATFORM[p]).join(", ")}</span>
        </div>
        {approved && <span className="chip good">Approved</span>}
      </div>

      {editing ? (
        <div style={{ display: "grid", gap: 12 }}>
          <div className="field">
            <label htmlFor={`t-${script.id}`}>Title</label>
            <input id={`t-${script.id}`} className="input" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          </div>
          <div className="field">
            <label>Hooks</label>
            {draft.hooks.map((h, i) => (
              <input
                key={i}
                aria-label={`Hook ${i + 1}`}
                className="input"
                value={h}
                onChange={(e) => setDraft({ ...draft, hooks: draft.hooks.map((x, j) => (j === i ? e.target.value : x)) })}
              />
            ))}
          </div>
          <div className="field">
            <label htmlFor={`b-${script.id}`}>Script</label>
            <textarea id={`b-${script.id}`} className="textarea" rows={9} value={draft.body} onChange={(e) => setDraft({ ...draft, body: e.target.value })} />
          </div>
          <div className="field">
            <label htmlFor={`c-${script.id}`}>Call to action</label>
            <input id={`c-${script.id}`} className="input" value={draft.cta} onChange={(e) => setDraft({ ...draft, cta: e.target.value })} />
          </div>
          <div className="field">
            <label htmlFor={`e-${script.id}`}>Edit style for this video</label>
            <select
              id={`e-${script.id}`}
              className="select"
              value={script.editStyle ?? ""}
              onChange={(e) => patch({ editStyle: e.target.value ? (Number(e.target.value) as EditStyleStep) : null }, "status")}
            >
              <option value="">Use the business default</option>
              {EDIT_STYLES.map((x) => (
                <option key={x.step} value={x.step}>
                  {x.step}. {x.name}: {x.description}
                </option>
              ))}
            </select>
          </div>
          <div className="actions">
            <button className="btn primary sm" onClick={save} disabled={busy !== ""}>
              {busy === "save" ? "Saving…" : "Save changes"}
            </button>
            <button
              className="btn ghost sm"
              onClick={() => {
                setDraft({ title: script.title, hooks: script.hooks, body: script.body, cta: script.cta });
                setEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2>{script.title}</h2>
          <div className="hooks" role="radiogroup" aria-label="Choose a hook">
            {script.hooks.map((h, i) => (
              <label key={i} className={`hook ${i === script.selectedHook ? "sel" : ""}`}>
                <input
                  type="radio"
                  name={`hook-${script.id}`}
                  checked={i === script.selectedHook}
                  onChange={() => patch({ selectedHook: i }, "status")}
                />
                <span>
                  <WithFills text={h} />
                </span>
              </label>
            ))}
          </div>
          <p className="body">
            <WithFills text={script.body} />
          </p>
          <p style={{ margin: 0, fontWeight: 500 }}>
            <WithFills text={script.cta} />
          </p>
          {script.shotNotes.length > 0 && (
            <div>
              <p className="eyebrow" style={{ marginBottom: 4 }}>
                Shot notes
              </p>
              <ul className="notes">
                {script.shotNotes.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            </div>
          )}
          <p className="why">{script.whyItBuildsTrust}</p>
          {script.revisionNote && <p className="revised">Last tweak: “{script.revisionNote}”</p>}

          <div className="actions">
            {approved ? (
              <button className="btn sm" onClick={() => patch({ status: "draft" }, "status")} disabled={busy !== ""}>
                Move back to review
              </button>
            ) : (
              <button className="btn good sm" onClick={() => patch({ status: "approved" }, "status")} disabled={busy !== ""}>
                Approve
              </button>
            )}
            <button className="btn sm" onClick={() => setEditing(true)}>
              Edit
            </button>
            <button className="btn ghost sm" onClick={copy}>
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <form className="tweak" onSubmit={revise}>
            <input
              className="input"
              aria-label="Tell Claude what to change"
              placeholder="Tweak with Claude: shorter, punchier, mention the new location…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              disabled={busy === "revise"}
            />
            <button className="btn sm" type="submit" disabled={busy === "revise" || !note.trim()}>
              {busy === "revise" ? "Rewriting…" : "Rewrite"}
            </button>
          </form>
        </>
      )}
      {error && <p className="err">{error}</p>}
    </article>
  );
}
