import { NextResponse } from "next/server";
import { coachInput } from "@/lib/coachInput";
import { requireCtx } from "@/lib/session";
import { studyReference } from "@/lib/terminal/edit";
import { fail, str } from "../../_util";

export const maxDuration = 300;

/** A reference edit: sampled frames from a video the owner loves (never stored), or a written description. */
export async function POST(req: Request) {
  try {
    const ctx = await requireCtx();
    const body = await req.json().catch(() => ({}));
    const id = str(body.businessId, 100);
    if (!id) return fail(new Error("Finish the company questions first."), 400);
    const media = coachInput(body);
    return NextResponse.json({ profile: await studyReference(ctx, id, { name: str(body.name, 120) || "Your reference", note: str(body.note, 1000), ...media }) });
  } catch (e) {
    return fail(e);
  }
}
