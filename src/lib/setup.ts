/** Settings a hosted deployment can't run without. Local development falls back to .data/ and demo mode instead. */
export interface MissingSetting {
  key: string;
  why: string;
}

export function hosted(): boolean {
  return !!process.env.VERCEL;
}

export function missingSetup(): MissingSetting[] {
  if (!hosted()) return [];
  const out: MissingSetting[] = [];
  if (!process.env.SUPABASE_URL) out.push({ key: "SUPABASE_URL", why: "Where your data and videos live." });
  if (!process.env.SUPABASE_PUBLISHABLE_KEY) out.push({ key: "SUPABASE_PUBLISHABLE_KEY", why: "Lets people sign in." });
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY)
    out.push({ key: "SUPABASE_SERVICE_ROLE_KEY", why: "Lets the server save businesses, scripts and takes. Supabase → Project Settings → API keys → service_role (secret)." });
  return out;
}

export class SetupError extends Error {
  status = 503;
  constructor() {
    super(`Frontman isn't finished setting up. Add ${missingSetup().map((m) => m.key).join(", ")} in Vercel → Settings → Environment Variables, then redeploy.`);
  }
}
