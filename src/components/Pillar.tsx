import { PILLAR_BY_ID } from "@/lib/pillars";
import type { PillarId } from "@/lib/types";

export function PillarChip({ id }: { id: PillarId }) {
  return <span className={`chip ${id}`}>{PILLAR_BY_ID[id]?.name ?? id}</span>;
}

/** Highlights [FILL: ...] placeholders so the owner can see what to fill in. */
export function WithFills({ text }: { text: string }) {
  const parts = text.split(/(\[FILL:[^\]]*\])/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("[FILL:") ? (
          <mark key={i} className="fill">
            {p.slice(1, -1)}
          </mark>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}
