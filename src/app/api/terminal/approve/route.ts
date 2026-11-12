import { NextResponse } from "next/server";
import { requireCtx } from "@/lib/session";
import { approveFromStudio } from "@/lib/terminal/state";
import { fail, str } from "../../_util";

export async function POST(req: Request) {
  try {
    const ctx = await requireCtx();
    const body = await req.json().catch(() => ({}));
    const id = str(body.businessId, 100);
    if (!id) return fail(new Error("Finish the company questions first."), 400);
    const it = body.item ?? {};
    const scriptId = await approveFromStudio(ctx, id, {
      title: str(it.title, 200),
      pillar: str(it.pillar, 20),
      hook: str(it.hook, 300),
      text: str(it.text, 8000),
      secs: Number(it.secs) || 45,
      sid: str(it.sid, 100) || undefined,
    });
    return NextResponse.json({ scriptId });
  } catch (e) {
    return fail(e);
  }
}
