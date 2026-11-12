import Link from "next/link";
import { PillarChip, WithFills } from "@/components/Pillar";
import { FORMATS, type Format } from "@/lib/formats";
import { PILLARS } from "@/lib/pillars";
import { redirect } from "next/navigation";
import { store } from "@/lib/store";
import { getCtx, visibleBusinesses } from "@/lib/session";

export const dynamic = "force-dynamic";

function FormatCard({ f, business }: { f: Format; business?: { id: string; name: string } }) {
  return (
    <div className="panel format">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h2>
          <WithFills text={f.name} />
        </h2>
        <span className="faint" style={{ fontSize: 12.5 }}>
          {f.seconds[0]}–{f.seconds[1]}s
        </span>
      </div>
      <div className="row">
        {f.pillars.map((p) => (
          <PillarChip key={p} id={p} />
        ))}
        {business && (
          <Link className="chip neutral" href={`/b/${business.id}`}>
            {business.name}
          </Link>
        )}
      </div>
      <ol>
        {f.structure.map((s, i) => (
          <li key={i}>
            <WithFills text={s} />
          </li>
        ))}
      </ol>
      <p className="muted" style={{ margin: 0, fontSize: 13.5 }}>
        <WithFills text={f.whyItWorks} />
      </p>
      {f.sourceUrl && (
        <a className="ref-link" href={f.sourceUrl} target="_blank" rel="noopener noreferrer">
          Based on this video ↗
        </a>
      )}
    </div>
  );
}

export default async function Formats() {
  const ctx = await getCtx();
  if (!ctx) redirect("/login");
  const s = store();
  const businesses = await visibleBusinesses(ctx);
  const saved = (await Promise.all(businesses.map(async (b) => (await s.listFormats(b.id)).map((f) => ({ f, business: { id: b.id, name: b.name } }))))).flat();
  return (
    <>
      <div className="page-head">
        <div>
          <p className="eyebrow">Format library</p>
          <h1>Proven structures</h1>
          <p className="sub">
            Patterns that work across top creators, stored as structures rather than their videos. The script agent picks one for every script.
          </p>
        </div>
      </div>

      <div className="grid-4" style={{ marginBottom: 28 }}>
        {PILLARS.map((p) => (
          <div key={p.id} className="panel" style={{ display: "grid", gap: 8, alignContent: "start" }}>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <PillarChip id={p.id} />
              <span className="faint" style={{ fontSize: 12.5 }}>
                Builds: {p.builds}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: 14 }}>{p.definition}</p>
          </div>
        ))}
      </div>

      {saved.length > 0 && (
        <>
          <p className="batch">Saved by your businesses</p>
          <div className="grid-3" style={{ marginBottom: 28 }}>
            {saved.map(({ f, business }) => (
              <FormatCard key={f.id} f={f} business={business} />
            ))}
          </div>
          <p className="batch">Built in</p>
        </>
      )}
      <div className="grid-3">
        {FORMATS.map((f) => (
          <FormatCard key={f.id} f={f} />
        ))}
      </div>
    </>
  );
}
