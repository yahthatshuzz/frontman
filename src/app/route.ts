import { NextResponse } from "next/server";
import { demoMode } from "@/lib/claude";
import { getCtx } from "@/lib/session";
import { missingSetup } from "@/lib/setup";
import { TERMINAL_BODY } from "@/lib/terminal/body";
import { terminalBusiness } from "@/lib/terminal/state";

/**
 * The Terminal app (the design prototype, wired to the backend). Served as one HTML page; public/terminal/app.js
 * renders every section client-side and talks to /api/terminal/*. Older admin pages live under /workspace.
 */
export const dynamic = "force-dynamic";

const FONTS =
  "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Fraunces:ital,opsz,wght@0,9..144,600;1,9..144,500&family=Instrument+Serif:ital@0;1&display=swap";

function page(head: string, body: string): Response {
  return new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">${head}</head><body>${body}</body></html>`, {
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
  });
}

function json(v: unknown): string {
  return JSON.stringify(v).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}

export async function GET(req: Request) {
  const missing = missingSetup();
  if (missing.length) {
    return page(
      "<title>Frontman · Almost live</title>",
      `<main style="font:16px -apple-system,system-ui,sans-serif;max-width:520px;margin:12vh auto;padding:0 16px"><h1>Almost live</h1><p>Add these in Vercel → Settings → Environment Variables, then redeploy:</p><ul>${missing
        .map((m) => `<li><code>${m.key}</code>: ${m.why}</li>`)
        .join("")}</ul></main>`,
    );
  }
  const ctx = await getCtx();
  if (!ctx) return NextResponse.redirect(new URL("/login", req.url));
  const b = await terminalBusiness(ctx, new URL(req.url).searchParams.get("b"));
  const boot = {
    email: ctx.email,
    operator: ctx.operator,
    local: ctx.local,
    demo: demoMode(),
    businessId: b?.id ?? null,
    hasBrief: !!b?.brief,
    state: b?.terminal ?? null,
  };
  const v = (process.env.VERCEL_GIT_COMMIT_SHA ?? "dev").slice(0, 8);
  return page(
    `<title>Frontman Terminal</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="${FONTS}"><link rel="stylesheet" href="/terminal/terminal.css?v=${v}"><style id="look-css"></style>`,
    `${TERMINAL_BODY}<script>window.FM_BOOT=${json(boot)};</script><script src="/terminal/app.js?v=${v}"></script>`,
  );
}
