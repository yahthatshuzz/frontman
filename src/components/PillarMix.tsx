import { PILLARS } from "@/lib/pillars";
import type { PillarId, PillarPlan, Script } from "@/lib/types";

/** Scripts count toward the owner's actual mix once approved (and after, when shot or posted). */
const COUNTED: Script["status"][] = ["approved", "shot", "posted"];

export function actualMix(scripts: Script[]): { total: number; share: Record<PillarId, number> } {
  const counted = scripts.filter((s) => COUNTED.includes(s.status));
  const share = Object.fromEntries(PILLARS.map((p) => [p.id, 0])) as Record<PillarId, number>;
  for (const s of counted) share[s.pillar] += 1;
  if (counted.length) for (const p of PILLARS) share[p.id] = Math.round((share[p.id] / counted.length) * 100);
  return { total: counted.length, share };
}

function Bar({ shares, label }: { shares: Record<PillarId, number>; label: string }) {
  return (
    <div className="mix-bar" role="img" aria-label={label}>
      {PILLARS.map((p) => (
        <i key={p.id} className={p.id} style={{ width: `${shares[p.id]}%` }} />
      ))}
    </div>
  );
}

/**
 * Target mix (from the Brand Brief) next to the owner's actual mix (approved scripts),
 * with a legend that says what each pillar builds.
 */
export function PillarMix({ target, scripts }: { target: PillarPlan[]; scripts: Script[] }) {
  const targetShare = Object.fromEntries(
    PILLARS.map((p) => [p.id, target.find((t) => t.pillar === p.id)?.weight ?? 25]),
  ) as Record<PillarId, number>;
  const actual = actualMix(scripts);
  const none = actual.total === 0;
  const emptyLabel = scripts.length ? "No approved scripts yet" : "No scripts yet";
  const describe = (s: Record<PillarId, number>) => PILLARS.map((p) => `${p.name} ${s[p.id]}%`).join(", ");

  return (
    <section className="panel mix" aria-labelledby="mix-h">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h3 id="mix-h" style={{ margin: 0 }}>
          Pillar mix
        </h3>
        <span className="faint" style={{ fontSize: 13 }}>
          {none ? emptyLabel : `Counted from ${actual.total} approved script${actual.total === 1 ? "" : "s"}`}
        </span>
      </div>

      <div className="mix-row">
        <span className="mix-name">Target mix</span>
        <Bar shares={targetShare} label={`Target mix: ${describe(targetShare)}`} />
      </div>
      <p className="mix-note">Based on how today&apos;s top personal brands split their content.</p>

      <div className="mix-row">
        <span className="mix-name">Your mix</span>
        {none ? <span className="mix-empty">{emptyLabel}</span> : <Bar shares={actual.share} label={`Your mix: ${describe(actual.share)}`} />}
      </div>

      <table className="mix-table">
        <thead>
          <tr>
            <th scope="col">Pillar</th>
            <th scope="col">What it builds</th>
            <th scope="col">Target</th>
            <th scope="col">Yours</th>
          </tr>
        </thead>
        <tbody>
          {PILLARS.map((p) => (
            <tr key={p.id}>
              <td>
                <span className={`mix-dot ${p.id}`} aria-hidden="true" />
                <b>{p.name}</b>
              </td>
              <td className="muted">{p.builds}</td>
              <td className="num">{targetShare[p.id]}%</td>
              <td className="num">{none ? "—" : `${actual.share[p.id]}%`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
