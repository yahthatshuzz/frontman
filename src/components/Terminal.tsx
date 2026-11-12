"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AudienceView } from "./AudienceView";
import { BriefView } from "./BriefView";
import { PillarMix } from "./PillarMix";
import { ReferencesView } from "./ReferencesView";
import { ScriptCard } from "./ScriptCard";
import { SettingsView } from "./SettingsView";
import { ShootView } from "./ShootView";
import { allFormats, type Format } from "@/lib/formats";
import { PILLARS } from "@/lib/pillars";
import type { Business, PillarId, ReferenceVideo, Script } from "@/lib/types";

type Tab = "scripts" | "shoot" | "brief" | "audience" | "references" | "settings";
type Filter = "all" | "draft" | "approved";

const STEPS = ["Reading the website", "Studying the owner's own words", "Finding stories and beliefs", "Mapping content to the four pillars", "Writing the Brand Brief"];

export function Terminal({
  initialBusiness,
  initialScripts,
  initialReferences,
  initialFormats,
  autoAnalyze,
}: {
  initialBusiness: Business;
  initialScripts: Script[];
  initialReferences: ReferenceVideo[];
  initialFormats: Format[];
  autoAnalyze: boolean;
}) {
  const router = useRouter();
  const [business, setBusiness] = useState(initialBusiness);
  const [scripts, setScripts] = useState(initialScripts);
  const [references, setReferences] = useState(initialReferences);
  const [customFormats, setCustomFormats] = useState(initialFormats);
  const formatNames = useMemo(() => Object.fromEntries(allFormats(customFormats).map((f) => [f.id, f.name])), [customFormats]);
  const [tab, setTab] = useState<Tab>(initialBusiness.brief ? "scripts" : "brief");
  const [analyzing, setAnalyzing] = useState(false);
  const [step, setStep] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [count, setCount] = useState(8);
  const [error, setError] = useState("");
  const [pillar, setPillar] = useState<PillarId | "all">("all");
  const [filter, setFilter] = useState<Filter>("all");
  const started = useRef(false);

  async function analyze() {
    setError("");
    setAnalyzing(true);
    setStep(0);
    const timer = setInterval(() => setStep((s) => Math.min(STEPS.length - 1, s + 1)), 9000);
    try {
      const res = await fetch(`/api/businesses/${business.id}/analyze`, { method: "POST" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Analysis failed.");
      setBusiness(json.business);
      setTab("brief");
      router.replace(`/b/${business.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Analysis failed.");
      setBusiness((b) => ({ ...b, status: "error" }));
    } finally {
      clearInterval(timer);
      setAnalyzing(false);
    }
  }

  useEffect(() => {
    if (started.current) return;
    if (autoAnalyze || business.status === "new") {
      started.current = true;
      analyze();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function generate() {
    setError("");
    setGenerating(true);
    try {
      const res = await fetch(`/api/businesses/${business.id}/scripts`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ count }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Couldn't write scripts.");
      setScripts((cur) => [...json.scripts, ...cur]);
      setTab("scripts");
      setPillar("all");
      setFilter("all");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't write scripts.");
    } finally {
      setGenerating(false);
    }
  }

  const syncScripts = useCallback((list: Script[]) => setScripts(list), []);

  function replace(s: Script) {
    setScripts((cur) => cur.map((x) => (x.id === s.id ? s : x)));
  }

  const visible = scripts.filter((s) => (pillar === "all" || s.pillar === pillar) && (filter === "all" || s.status === filter));
  const batches = useMemo(() => {
    const m = new Map<string, Script[]>();
    for (const s of visible) m.set(s.batch, [...(m.get(s.batch) ?? []), s]);
    return [...m.entries()];
  }, [visible]);

  const byPillar = (id: PillarId) => scripts.filter((s) => s.pillar === id).length;
  const ready = !!business.brief && !analyzing;

  return (
    <>
      <div className="page-head" style={{ marginBottom: 8 }}>
        <div>
          <p className="eyebrow">{business.owner.name ? `${business.owner.name}${business.owner.role ? `, ${business.owner.role}` : ""}` : "Business"}</p>
          <h1>{business.name}</h1>
          {business.brief?.coreAssociation && <p className="sub">Known for: {business.brief.coreAssociation}</p>}
        </div>
        {ready && (
          <div className="row">
            <label className="faint" htmlFor="count" style={{ fontSize: 13 }}>
              Scripts
            </label>
            <select id="count" className="select" style={{ width: 76, padding: "7px 10px" }} value={count} onChange={(e) => setCount(Number(e.target.value))}>
              {[4, 6, 8, 10, 12].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <button className="btn primary" onClick={generate} disabled={generating}>
              {generating ? "Writing scripts…" : "Write this week's scripts"}
            </button>
          </div>
        )}
      </div>

      <div className="tabs" role="tablist">
        <button role="tab" aria-selected={tab === "scripts"} className={tab === "scripts" ? "on" : ""} onClick={() => setTab("scripts")} disabled={!business.brief}>
          Scripts <span className="chip neutral">{scripts.length}</span>
        </button>
        <button role="tab" aria-selected={tab === "shoot"} className={tab === "shoot" ? "on" : ""} onClick={() => setTab("shoot")} disabled={!business.brief}>
          Shoot
        </button>
        <button role="tab" aria-selected={tab === "brief"} className={tab === "brief" ? "on" : ""} onClick={() => setTab("brief")}>
          Brand Brief
        </button>
        <button role="tab" aria-selected={tab === "audience"} className={tab === "audience" ? "on" : ""} onClick={() => setTab("audience")} disabled={!business.brief}>
          Audience
        </button>
        <button role="tab" aria-selected={tab === "references"} className={tab === "references" ? "on" : ""} onClick={() => setTab("references")}>
          References {references.length > 0 && <span className="chip neutral">{references.length}</span>}
        </button>
        <button role="tab" aria-selected={tab === "settings"} className={tab === "settings" ? "on" : ""} onClick={() => setTab("settings")}>
          Settings
        </button>
        <button disabled>
          Edit <span className="tag">Next</span>
        </button>
        <button disabled>
          Post <span className="tag">Next</span>
        </button>
      </div>

      {error && (
        <p className="err" role="alert" style={{ marginBottom: 16 }}>
          {error}
        </p>
      )}

      {analyzing ? (
        <div className="panel progress" aria-live="polite">
          <h2>Studying {business.name}</h2>
          <p className="muted" style={{ margin: 0 }}>
            The analysis agent is reading everything you gave it. This usually takes about a minute.
          </p>
          <div className="steps">
            {STEPS.map((s, i) => (
              <div key={s} className={`step ${i < step ? "done" : i === step ? "on" : ""}`}>
                <i aria-hidden="true" />
                {s}
              </div>
            ))}
          </div>
        </div>
      ) : !business.brief ? (
        <div className="panel empty">
          <h2>{business.status === "error" ? "The analysis didn't finish" : "Not analyzed yet"}</h2>
          <p>{business.error || "Run the analysis to build this business's Brand Brief."}</p>
          <button className="btn primary" onClick={analyze}>
            {business.status === "error" ? "Try again" : "Run the analysis"}
          </button>
        </div>
      ) : tab === "shoot" ? (
        <ShootView business={business} scripts={scripts} onScripts={syncScripts} />
      ) : tab === "brief" ? (
        <BriefView business={business} onRerun={analyze} />
      ) : tab === "audience" ? (
        <AudienceView business={business} onChange={setBusiness} onFormatSaved={(f) => setCustomFormats((cur) => [f, ...cur])} />
      ) : tab === "references" ? (
        <ReferencesView
          businessId={business.id}
          references={references}
          onChange={setReferences}
          onFormatSaved={(f) => setCustomFormats((cur) => [f, ...cur])}
        />
      ) : tab === "settings" ? (
        <SettingsView business={business} scripts={scripts} onSaved={setBusiness} />
      ) : (
        <>
          <PillarMix target={business.brief.pillarStrategy} scripts={scripts} />

          {scripts.length === 0 ? (
            <div className="panel empty">
              <h2>No scripts yet</h2>
              <p>Write this week&apos;s script bank. Each script is tagged with a pillar and comes with three hooks to choose from.</p>
              <button className="btn primary" onClick={generate} disabled={generating}>
                {generating ? "Writing scripts…" : "Write this week's scripts"}
              </button>
            </div>
          ) : (
            <>
              <div className="toolbar">
                <div className="row">
                  <button className={`chip neutral filter ${pillar === "all" ? "" : "off"}`} onClick={() => setPillar("all")}>
                    All {scripts.length}
                  </button>
                  {PILLARS.map((p) => (
                    <button key={p.id} className={`chip ${p.id} filter ${pillar === p.id ? "" : "off"}`} onClick={() => setPillar(p.id)}>
                      {p.name} {byPillar(p.id)}
                    </button>
                  ))}
                </div>
                <div className="row">
                  {(["all", "draft", "approved"] as Filter[]).map((f) => (
                    <button key={f} className={`btn sm ${filter === f ? "" : "ghost"}`} onClick={() => setFilter(f)}>
                      {f === "all" ? "All" : f === "draft" ? "Needs review" : "Approved"}
                    </button>
                  ))}
                </div>
              </div>
              {visible.length === 0 && <p className="muted">Nothing matches these filters.</p>}
              {batches.map(([batch, list]) => (
                <section key={batch}>
                  <p className="batch">{batch}</p>
                  <div className="scripts">
                    {list.map((s) => (
                      <ScriptCard key={s.id} script={s} formatName={formatNames[s.formatId]} onChange={replace} />
                    ))}
                  </div>
                </section>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
}
