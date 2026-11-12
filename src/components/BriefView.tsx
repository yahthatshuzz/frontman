import { PillarChip } from "./Pillar";
import { PILLAR_BY_ID } from "@/lib/pillars";
import type { Business } from "@/lib/types";

const BAR: Record<string, string> = { teach: "var(--teach)", show: "var(--show)", believe: "var(--believe)", entertain: "var(--entertain)" };

function List({ items, empty = "Nothing found yet." }: { items: string[]; empty?: string }) {
  if (!items.length) return <p className="faint" style={{ margin: 0 }}>{empty}</p>;
  return (
    <ul className="list">
      {items.map((x, i) => (
        <li key={i}>{x}</li>
      ))}
    </ul>
  );
}

export function BriefView({ business, onRerun }: { business: Business; onRerun: () => void }) {
  const b = business.brief!;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 16 }}>
      <div className="panel brief-hero">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <p className="eyebrow" style={{ margin: 0 }}>
            Brand Brief
          </p>
          <button className="btn ghost sm" onClick={onRerun}>
            Re-run analysis
          </button>
        </div>
        <p className="one" style={{ margin: 0 }}>
          {b.oneLiner}
        </p>
        <p className="muted" style={{ margin: 0 }}>
          Core association: <strong style={{ color: "var(--ink)" }}>{b.coreAssociation}</strong>
        </p>
      </div>

      <p className="mix-note" style={{ margin: "4px 0 -6px" }}>
        Target mix: based on how today&apos;s top personal brands split their content. Your actual mix is on the Scripts tab.
      </p>
      <div className="grid-4">
        {b.pillarStrategy.map((p) => (
          <div key={p.pillar} className="panel pillar-card">
            <div className="row" style={{ justifyContent: "space-between" }}>
              <PillarChip id={p.pillar} />
              <span className="faint" style={{ fontSize: 12 }}>
                {PILLAR_BY_ID[p.pillar].builds}
              </span>
            </div>
            <div className="weight">
              <b>{p.weight}%</b>
              <span className="faint" style={{ fontSize: 13 }}>
                target mix
              </span>
            </div>
            <div className="wbar">
              <i style={{ width: `${p.weight}%`, background: BAR[p.pillar] }} />
            </div>
            <p style={{ margin: 0, fontSize: 14 }}>{p.angle}</p>
            <List items={p.examples} />
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="panel kv">
          <span>Who they serve</span>
          <p style={{ margin: 0 }}>{b.whoTheyServe}</p>
        </div>
        <div className="panel kv">
          <span>What they sell</span>
          <p style={{ margin: 0 }}>{b.whatTheySell}</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="panel">
          <h3>Origin story</h3>
          <p style={{ margin: 0 }}>{b.originStory || <span className="faint">Not found yet. Ask the owner (see below).</span>}</p>
        </div>
        <div className="panel">
          <h3>Voice</h3>
          <div className="row" style={{ marginBottom: 10 }}>
            {b.voice.traits.map((t) => (
              <span key={t} className="chip neutral">
                {t}
              </span>
            ))}
          </div>
          <p className="muted" style={{ margin: "0 0 4px", fontSize: 13 }}>
            Sounds like
          </p>
          <List items={b.voice.phrases.map((p) => `“${p}”`)} />
          <p className="muted" style={{ margin: "10px 0 4px", fontSize: 13 }}>
            Avoid
          </p>
          <List items={b.voice.avoid} />
        </div>
      </div>

      <div className="panel">
        <h3>Stories</h3>
        {b.stories.length ? (
          <div style={{ overflowX: "auto" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Story</th>
                  <th>Summary</th>
                  <th>Pillar</th>
                </tr>
              </thead>
              <tbody>
                {b.stories.map((s, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600, minWidth: 140 }}>{s.title}</td>
                    <td>{s.summary}</td>
                    <td>
                      <PillarChip id={s.pillar} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="faint">No stories found yet. The brain dump is where they come from.</p>
        )}
      </div>

      <div className="grid-3">
        <div className="panel">
          <h3>Beliefs</h3>
          <List items={b.beliefs} />
        </div>
        <div className="panel">
          <h3>Can teach</h3>
          <List items={b.expertiseTopics} />
        </div>
        <div className="panel">
          <h3>Proof points</h3>
          <List items={b.proofPoints} />
        </div>
      </div>

      <div className="grid-2">
        <div className="panel">
          <h3>Customer questions</h3>
          <List items={b.customerQuestions} />
        </div>
        <div className="panel">
          <h3>Trust gaps</h3>
          {b.trustGaps.length ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Why a stranger hesitates</th>
                  <th>Content fix</th>
                </tr>
              </thead>
              <tbody>
                {b.trustGaps.map((t, i) => (
                  <tr key={i}>
                    <td>{t.gap}</td>
                    <td>{t.fix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="faint">None found.</p>
          )}
        </div>
      </div>

      <div className="grid-2">
        <div className="panel">
          <h3>Ask the owner next</h3>
          {b.missingInfo.length ? (
            <ul className="ask">
              {b.missingInfo.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          ) : (
            <p className="faint">Nothing missing.</p>
          )}
        </div>
        <div className="panel sources">
          <h3>Sources read</h3>
          {business.sources.length ? (
            <ul className="list">
              {business.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="faint" style={{ margin: 0 }}>
              No website pages were read. The brief is built from the owner&apos;s words.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
