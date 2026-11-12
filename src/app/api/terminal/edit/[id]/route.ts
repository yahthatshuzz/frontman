import { NextResponse } from "next/server";
import { requireCtx } from "@/lib/session";
import { renderStatus } from "@/lib/terminal/edit";
import { fail } from "../../../_util";

export const maxDuration = 120;

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const b = new URL(req.url).searchParams.get("b") ?? "";
    return NextResponse.json({ render: await renderStatus(await requireCtx(), b, id) }, { headers: { "cache-control": "no-store" } });
  } catch (e) {
    return fail(e);
  }
}
