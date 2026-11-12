import { NextResponse } from "next/server";
import { requireCtx } from "@/lib/session";
import { accounts, disconnect, isPlatform } from "@/lib/social/service";
import { fail } from "../../_util";

export async function GET(req: Request) {
  try {
    const b = new URL(req.url).searchParams.get("b") ?? "";
    return NextResponse.json({ accounts: await accounts(await requireCtx(), b) }, { headers: { "cache-control": "no-store" } });
  } catch (e) {
    return fail(e);
  }
}

export async function DELETE(req: Request) {
  try {
    const u = new URL(req.url);
    const p = u.searchParams.get("p") ?? "";
    if (!isPlatform(p)) return fail(new Error("Unknown platform."), 400);
    await disconnect(await requireCtx(), u.searchParams.get("b") ?? "", p);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return fail(e);
  }
}
