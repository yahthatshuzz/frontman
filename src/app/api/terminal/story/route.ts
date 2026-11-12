import { NextResponse } from "next/server";
import { requireCtx } from "@/lib/session";
import { tellMyStory } from "@/lib/terminal/state";
import { fail, str } from "../../_util";

export const maxDuration = 120;

export async function POST(req: Request) {
  try {
    const ctx = await requireCtx();
    const body = await req.json().catch(() => ({}));
    const id = str(body.businessId, 100);
    const transcript = str(body.transcript, 12000);
    if (!id) return fail(new Error("Finish the company questions first."), 400);
    if (transcript.split(/\s+/).length < 15) return fail(new Error("Tell a little more first: a few sentences is enough."), 400);
    return NextResponse.json({ category: await tellMyStory(ctx, id, str(body.title, 120), transcript) });
  } catch (e) {
    return fail(e);
  }
}
