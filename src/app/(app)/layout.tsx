import { Sidebar } from "@/components/Sidebar";
import { demoMode } from "@/lib/claude";
import { getCtx } from "@/lib/session";
import { missingSetup } from "@/lib/setup";

// Rendered per request so the demo banner and the signed-in user are always current.
export const dynamic = "force-dynamic";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const missing = missingSetup();
  if (missing.length) {
    return (
      <main className="auth">
        <div className="auth-card panel">
          <h1>Almost live</h1>
          <p className="muted" style={{ margin: 0 }}>
            Frontman is deployed. Add these in Vercel → your project → Settings → Environment Variables, then redeploy:
          </p>
          <ul className="list" style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
            {missing.map((m) => (
              <li key={m.key}>
                <code>{m.key}</code>
                <br />
                <span className="muted" style={{ fontSize: 14 }}>
                  {m.why}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    );
  }
  const ctx = await getCtx();
  return (
    <div className="shell">
      <Sidebar email={ctx?.email ?? null} local={ctx?.local ?? true} />
      <main className="main">
        {demoMode() && (
          <div className="demo-banner" role="status">
            Demo mode: no Claude API key is set, so analysis and scripts use sample output. Add ANTHROPIC_API_KEY to run the real agents.
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
