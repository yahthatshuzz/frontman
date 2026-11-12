import { NextResponse } from "next/server";
import { requireCtx } from "@/lib/session";
import { cancelPost } from "@/lib/social/service";
import { fail } from "../../../_util";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await cancelPost(await requireCtx(), new URL(req.url).searchParams.get("b") ?? "", id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return fail(e);
  }
}
