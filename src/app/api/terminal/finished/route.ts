import { NextResponse } from "next/server";
import { requireCtx } from "@/lib/session";
import { startFinishedUpload } from "@/lib/terminal/edit";
import { fail, str } from "../../_util";

export async function POST(req: Request) {
  try {
    const b = await req.json().catch(() => ({}));
    return NextResponse.json(await startFinishedUpload(await requireCtx(), str(b.businessId, 100), { title: str(b.title, 200), mime: str(b.mime, 100), bytes: Number(b.bytes) || 0 }));
  } catch (e) {
    return fail(e);
  }
}
