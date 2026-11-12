import { NextResponse } from "next/server";
import type { RefProfile } from "@/lib/agents/edit";
import type { CaptionStyle } from "@/lib/render";
import { requireCtx } from "@/lib/session";
import { startEdit } from "@/lib/terminal/edit";
import { fail, str } from "../../_util";

export const maxDuration = 300;

export async function POST(req: Request) {
  try {
    const ctx = await requireCtx();
    const b = await req.json().catch(() => ({}));
    const id = str(b.businessId, 100);
    if (!id) return fail(new Error("Finish the company questions first."), 400);
    const rec = await startEdit(ctx, id, {
      takeIds: Array.isArray(b.takeIds) ? b.takeIds.map((x: unknown) => str(x, 100)).filter(Boolean) : [],
      scriptId: str(b.scriptId, 100) || undefined,
      title: str(b.title, 200),
      hook: str(b.hook, 300),
      text: str(b.text, 8000),
      style: (b.style && typeof b.style === "object" ? b.style : {}) as CaptionStyle,
      note: str(b.note, 1000),
      reference: (b.reference && typeof b.reference === "object" ? b.reference : null) as RefProfile | null,
    });
    return NextResponse.json({ render: rec });
  } catch (e) {
    return fail(e);
  }
}
