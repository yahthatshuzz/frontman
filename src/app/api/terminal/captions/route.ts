import { NextResponse } from "next/server";
import { requireCtx } from "@/lib/session";
import { captionsFor } from "@/lib/social/service";
import { fail, str } from "../../_util";

export const maxDuration = 120;

export async function POST(req: Request) {
  try {
    const b = await req.json().catch(() => ({}));
    return NextResponse.json({ captions: await captionsFor(await requireCtx(), str(b.businessId, 100), { title: str(b.title, 200), hook: str(b.hook, 300), said: str(b.said, 8000) }) });
  } catch (e) {
    return fail(e);
  }
}
