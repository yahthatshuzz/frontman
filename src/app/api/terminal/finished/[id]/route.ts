import { NextResponse } from "next/server";
import { requireCtx } from "@/lib/session";
import { finishFinishedUpload } from "@/lib/terminal/edit";
import { fail, str } from "../../../_util";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const b = await req.json().catch(() => ({}));
    return NextResponse.json({ render: await finishFinishedUpload(await requireCtx(), str(b.businessId, 100), id) });
  } catch (e) {
    return fail(e);
  }
}
