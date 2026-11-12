"use client";

import { useState } from "react";
import { Breakdown } from "./Breakdown";
import type { Format } from "@/lib/formats";
import type { Business } from "@/lib/types";

const WEEK = 7 * 24 * 3600 * 1000;

function when(iso: string): string {
  return new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

export function AudienceView({
  business,
  onChange,
  onFormatSaved,
}: {
  business: Business;
  onChange: (b: Business) => void;
  onFormatSaved: (f: Format) => void;
}) {
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const r = business.audienceResearch;
  const stale = r ? Date.now() - new Date(r.ranAt).getTime() > WEEK : false;
  const audience = business.brief?.whoTheyServe || business.audience;

  async function run() {
    setBusy("run");
    setError("");
    try {
      const res = await fetch(`/api/businesses/${business.id}/audience`, { method: "POST" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "The research didn't finish. Try again.");
      onChange(json.business);
    } catch (e) {
      setError(e instanceof Error ? e.message : "The research didn't finish. Try again.");
    } finally {
      setBusy("");
    }
  }

  async function save(itemId: string) {
    setBusy(itemId);
    setError("");
    try {
      const res = await fetch(`/api/businesses/${business.id}/audience/${itemId}/format`, { method: "POST" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Couldn't save the format.");
      onChange(json.business);
      onFormatSaved(json.format);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't save the format.");
    } finally {
      setBusy("");
    }
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 16 }}>
      <section className="panel aud-head">
        <div style={{ display: "grid", gap: 6, minWidth: 0 }}>
          <h3 style={{ margin: 0 }}>What your audience is watching</h3>
          <p className="muted" style={{ margin: 0, fontSize: 14 }}>
            Claude searches the web for content popular with your buyers, not with you, so you don&apos;t have to scroll. Every item links to where it was found.
          </p>
          <p className="faint" style={{ margin: 0, fontSize: 13 }}>
            Audience: {audience || "not set yet"}
          </p>
        </div>
        <div className="aud-run">
          <button className="btn primary" onClick={run} disabled={busy === "run"}>
            {busy === "run" ? "Researching… about a minute" : r ? "Refresh" : "Research now"}
          </button>
          <span className={`faint ${stale ? "stale" : ""}`} style={{ fontSize: 12.5 }}>
            {r ? `Last researched ${when(r.ranAt)}${stale ? " · over a week old" : ""}` : "Not researched yet"}
          </span>
          <span className="faint" style={{ fontSize: 12.5 }}>
            Worth rerunning weekly.
          </span>
        </div>
      </section>

      {error && (
        <p className="err" role="alert">
          {error}
        </p>
      )}

      {r && (
        <>
          {r.summary && <p className="aud-summary">{r.summary}</p>}
          {r.items.length === 0 ? (
            <div className="panel empty">
              <h2>Nothing with a solid source this time</h2>
              <p>We only show content we can link to. Refresh to search again.</p>
            </div>
          ) : (
            <div className="grid-2">
              {r.items.map((it) => (
                <article key={it.id} className="panel ref">
                  <div className="row" style={{ justifyContent: "space-between" }}>
                    <span className="row" style={{ gap: 6 }}>
                      {it.platform && <span className="chip neutral">{it.platform}</span>}
                      {it.creator && <span className="faint" style={{ fontSize: 13 }}>{it.creator}</span>}
                    </span>
                    {it.url !== it.sourceUrl && (
                      <a className="ref-link" href={it.url} target="_blank" rel="noopener noreferrer">
                        Open the post ↗
                      </a>
                    )}
                  </div>
                  <p className="ref-title" style={{ fontWeight: 600 }}>
                    {it.title}
                  </p>
                  <Breakdown b={it.breakdown} />
                  <p className="faint" style={{ margin: 0, fontSize: 12.5 }}>
                    Source:{" "}
                    <a className="ref-link" href={it.sourceUrl} target="_blank" rel="noopener noreferrer">
                      {it.sourceTitle}
                    </a>
                  </p>
                  <div className="actions">
                    {it.formatId ? (
                      <span className="chip good">Saved as a format</span>
                    ) : (
                      <button className="btn sm" onClick={() => save(it.id)} disabled={busy === it.id}>
                        {busy === it.id ? "Saving…" : "Save as format"}
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
          <p className="faint" style={{ fontSize: 12.5, margin: 0 }}>
            {r.searches} searches · {r.items.length} items kept{r.dropped ? ` · ${r.dropped} dropped because their source couldn't be confirmed` : ""}
          </p>
        </>
      )}
    </div>
  );
}
