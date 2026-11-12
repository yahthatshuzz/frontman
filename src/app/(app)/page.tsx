import Link from "next/link";
import { redirect } from "next/navigation";
import { store } from "@/lib/store";
import { getCtx, visibleBusinesses } from "@/lib/session";

export const dynamic = "force-dynamic";

const STATUS: Record<string, { label: string; cls: string }> = {
  new: { label: "Not analyzed", cls: "neutral" },
  analyzing: { label: "Analyzing", cls: "warn" },
  ready: { label: "Ready", cls: "good" },
  error: { label: "Needs attention", cls: "bad" },
};

export default async function Dashboard() {
  const ctx = await getCtx();
  if (!ctx) redirect("/login");
  const s = store();
  const businesses = await visibleBusinesses(ctx);
  const counts = await Promise.all(businesses.map((b) => s.listScripts(b.id)));

  return (
    <>
      <div className="page-head">
        <div>
          <p className="eyebrow">Workspace</p>
          <h1>Businesses</h1>
          <p className="sub">Each business gets a Brand Brief and a weekly script bank written in the owner&apos;s voice.</p>
        </div>
        <Link className="btn primary" href="/new">
          Add a business
        </Link>
      </div>

      {businesses.length === 0 ? (
        <div className="panel empty">
          <h2>No businesses yet</h2>
          <p>Add your first pilot. The agent reads their website and the owner&apos;s own words, then writes their Brand Brief.</p>
          <Link className="btn primary" href="/new">
            Add a business
          </Link>
        </div>
      ) : (
        <div className="grid-3">
          {businesses.map((b, i) => {
            const scripts = counts[i];
            const approved = scripts.filter((x) => x.status === "approved").length;
            const st = STATUS[b.status] ?? STATUS.new;
            return (
              <Link key={b.id} href={`/b/${b.id}`} className="panel biz-card">
                <div className="row" style={{ justifyContent: "space-between" }}>
                  <h2>{b.name}</h2>
                  <span className={`chip ${st.cls}`}>{st.label}</span>
                </div>
                <p className="muted" style={{ margin: 0 }}>
                  {b.owner.name || "Owner not set"}
                  {b.owner.role ? `, ${b.owner.role}` : ""}
                </p>
                {b.brief?.oneLiner && <p style={{ margin: 0 }}>{b.brief.oneLiner}</p>}
                <div className="biz-stats">
                  <span>
                    <b>{scripts.length}</b> scripts
                  </span>
                  <span>
                    <b>{approved}</b> approved
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
