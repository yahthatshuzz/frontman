import { PillarChip, WithFills } from "./Pillar";
import type { VideoBreakdown } from "@/lib/types";

/** Shows a video breakdown. [FILL: ...] marks what couldn't be seen from the link and note. */
export function Breakdown({ b }: { b: VideoBreakdown }) {
  return (
    <div className="bd">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <b>
          <WithFills text={b.name} />
        </b>
        <span className="row" style={{ gap: 6 }}>
          <PillarChip id={b.pillar} />
          <span className="chip neutral">
            <WithFills text={b.length} />
          </span>
        </span>
      </div>
      <p className="bd-k">Hook</p>
      <p className="bd-v">
        <WithFills text={b.hook} />
      </p>
      <p className="bd-k">Structure</p>
      <ol className="bd-beats">
        {b.structure.map((s, i) => (
          <li key={i}>
            <WithFills text={s} />
          </li>
        ))}
      </ol>
      <p className="bd-k">Why it works</p>
      <p className="bd-v muted">
        <WithFills text={b.whyItWorks} />
      </p>
    </div>
  );
}
