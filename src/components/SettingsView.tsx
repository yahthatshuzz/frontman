"use client";

import { useState } from "react";
import { EDIT_STYLES, editStyle } from "@/lib/editStyles";
import { readingText, TARGET_PRESETS, timedPace } from "@/lib/teleprompter";
import type { SettingsPatch } from "@/lib/settings";
import type { Business, BusinessSettings, Script, TeleprompterMode, TeleprompterSettings } from "@/lib/types";

const MODES: { id: TeleprompterMode; name: string; desc: string }[] = [
  { id: "voice", name: "Voice", desc: "Follows what you say and scrolls with you. Skip a line and it keeps up." },
  { id: "timed", name: "Timed", desc: "Scrolls so the read lands on the length you pick." },
  { id: "manual", name: "Manual", desc: "A steady speed you set yourself." },
];

const NARRATION: { id: TeleprompterSettings["narration"]; name: string }[] = [
  { id: "full", name: "Full script" },
  { id: "bullets", name: "Bullet points" },
  { id: "hook", name: "Hook only" },
  { id: "off", name: "No text" },
];

export function SettingsView({
  business,
  scripts,
  onSaved,
}: {
  business: Business;
  scripts: Script[];
  onSaved: (b: Business) => void;
}) {
  const [settings, setSettings] = useState<BusinessSettings>(business.settings);
  const [status, setStatus] = useState<"" | "saving" | "saved">("");
  const [error, setError] = useState("");
  const t = settings.teleprompter;
  const es = editStyle(settings.editStyle);
  const custom = !TARGET_PRESETS.includes(t.targetSeconds as (typeof TARGET_PRESETS)[number]);

  async function save(patch: SettingsPatch) {
    const next: BusinessSettings = {
      ...settings,
      teleprompter: { ...settings.teleprompter, ...(patch.teleprompter ?? {}) },
      editStyle: patch.editStyle ?? settings.editStyle,
    };
    setSettings(next);
    setStatus("saving");
    setError("");
    try {
      const res = await fetch(`/api/businesses/${business.id}/settings`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(patch),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Couldn't save.");
      setSettings(json.business.settings);
      onSaved(json.business);
      setStatus("saved");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't save. Try again.");
      setStatus("");
    }
  }

  const ready = scripts.filter((s) => s.status !== "draft").slice(0, 3);
  const examples = (ready.length ? ready : scripts.slice(0, 3)).map((s) => ({ title: s.title, ...timedPace(readingText(s), t.targetSeconds) }));

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 16 }}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <p className="muted" style={{ margin: 0 }}>
          Defaults for shooting and editing. You can change them for any single video later.
        </p>
        <span className="faint" style={{ fontSize: 13 }} aria-live="polite">
          {status === "saving" ? "Saving…" : status === "saved" ? "Saved" : ""}
        </span>
      </div>

      <section className="panel settings" aria-labelledby="tp-h">
        <h3 id="tp-h">Teleprompter</h3>

        <div className="field">
          <span className="label">How it scrolls</span>
          <div className="choice" role="radiogroup" aria-label="How the teleprompter scrolls">
            {MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                role="radio"
                aria-checked={t.mode === m.id}
                className={t.mode === m.id ? "on" : ""}
                onClick={() => save({ teleprompter: { mode: m.id } })}
              >
                <b>{m.name}</b>
                <span>{m.desc}</span>
              </button>
            ))}
          </div>
          <p className="hint">If a browser can&apos;t listen (some phones), Voice switches to Timed and says so. iPhone support is limited.</p>
        </div>

        <div className="field">
          <span className="label">Target length for Timed</span>
          <div className="row">
            {TARGET_PRESETS.map((s) => (
              <button key={s} type="button" className={`btn sm ${t.targetSeconds === s ? "primary" : ""}`} onClick={() => save({ teleprompter: { targetSeconds: s } })}>
                {s}s
              </button>
            ))}
            <label className="row" style={{ gap: 6, fontSize: 13 }}>
              <span className={custom ? "" : "faint"}>Custom</span>
              <input
                className="input"
                type="number"
                min={10}
                max={300}
                style={{ width: 86, padding: "6px 10px" }}
                defaultValue={custom ? t.targetSeconds : ""}
                placeholder="sec"
                aria-label="Custom target length in seconds"
                onBlur={(e) => {
                  const v = Number(e.target.value);
                  if (v) save({ teleprompter: { targetSeconds: v } });
                }}
              />
            </label>
          </div>
          {examples.length > 0 ? (
            <ul className="pace">
              {examples.map((x) => (
                <li key={x.title}>
                  <span>{x.title}</span>
                  <span className={x.wpm > 175 ? "warn" : ""}>
                    {x.words} words → {x.wpm} wpm{x.wpm > 175 ? " · fast, try a longer target" : ""}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="hint">Once you have scripts, you&apos;ll see the speaking pace each target length works out to.</p>
          )}
        </div>

        <div className="grid-3">
          <label className="field">
            <span className="label">On screen</span>
            <select className="select" value={t.narration} onChange={(e) => save({ teleprompter: { narration: e.target.value as TeleprompterSettings["narration"] } })}>
              {NARRATION.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.name}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="label">Text size · {t.textSize}px</span>
            <input type="range" min={16} max={72} value={t.textSize} onChange={(e) => setSettings({ ...settings, teleprompter: { ...t, textSize: Number(e.target.value) } })} onPointerUp={(e) => save({ teleprompter: { textSize: Number((e.target as HTMLInputElement).value) } })} onKeyUp={(e) => save({ teleprompter: { textSize: Number((e.target as HTMLInputElement).value) } })} />
          </label>
          <label className="field">
            <span className="label">Manual speed · {t.manualWpm} wpm</span>
            <input type="range" min={60} max={260} step={5} value={t.manualWpm} onChange={(e) => setSettings({ ...settings, teleprompter: { ...t, manualWpm: Number(e.target.value) } })} onPointerUp={(e) => save({ teleprompter: { manualWpm: Number((e.target as HTMLInputElement).value) } })} onKeyUp={(e) => save({ teleprompter: { manualWpm: Number((e.target as HTMLInputElement).value) } })} />
          </label>
        </div>
      </section>

      <section className="panel settings" aria-labelledby="es-h">
        <div>
          <h3 id="es-h" style={{ marginBottom: 4 }}>
            Edit style
          </h3>
          <p className="muted" style={{ margin: 0, fontSize: 14 }}>
            How produced your videos feel. Most owners look most trustworthy at Raw or Natural. You can change it for a single video on its script.
          </p>
        </div>
        <div className="scale" role="radiogroup" aria-label="Edit style, from raw to polished">
          {EDIT_STYLES.map((x) => (
            <button
              key={x.step}
              type="button"
              role="radio"
              aria-checked={settings.editStyle === x.step}
              className={settings.editStyle === x.step ? "on" : ""}
              onClick={() => save({ editStyle: x.step })}
            >
              <i aria-hidden="true">{x.step}</i>
              {x.name}
            </button>
          ))}
        </div>
        <div className="scale-ends" aria-hidden="true">
          <span>Raw</span>
          <span>Polished</span>
        </div>
        <div className="es-detail">
          <p style={{ margin: 0, fontWeight: 600 }}>
            {es.name}: {es.description}
          </p>
          <dl>
            <dt>Cuts</dt>
            <dd>{es.avgShotSeconds ? `About one every ${es.avgShotSeconds} seconds` : "Only dead air, restarts and mistakes"}</dd>
            <dt>Captions</dt>
            <dd>{es.captions}</dd>
            <dt>Zooms</dt>
            <dd>{es.zoomsPerMinute ? `Up to ${es.zoomsPerMinute} a minute, on key lines` : "None"}</dd>
            <dt>B-roll</dt>
            <dd>{es.brollShare ? `Up to ${Math.round(es.brollShare * 100)}% of the video` : "None"}</dd>
            <dt>Hook</dt>
            <dd>{es.hookOverlay}</dd>
          </dl>
          <p className="faint" style={{ margin: 0, fontSize: 12.5 }}>
            Used when the Edit stage cuts your takes.
          </p>
        </div>
      </section>

      {error && (
        <p className="err" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
