import { headers } from "next/headers";
import { ApiKeys } from "@/components/ApiKeys";
import { publicKey } from "@/lib/apiKeys";
import { redirect } from "next/navigation";
import { getCtx } from "@/lib/session";
import { store } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function ApiKeysPage() {
  const ctx = await getCtx();
  if (!ctx) redirect("/login");
  const keys = (await store().listApiKeys(ctx.workspaceId)).map(publicKey);
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return (
    <>
      <div className="page-head">
        <div>
          <p className="eyebrow">Workspace</p>
          <h1>API keys</h1>
          <p className="sub">Run Frontman from Claude and other agent tools. Each key can see and change only this workspace&apos;s businesses.</p>
        </div>
      </div>
      <ApiKeys initialKeys={keys} endpoint={`${proto}://${host}/api/mcp`} />
    </>
  );
}
