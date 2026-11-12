import { NextResponse } from "next/server";
import { businessFor, requireCtx } from "@/lib/session";
import { addReference } from "@/lib/service";
import { store } from "@/lib/store";
import { fail, str } from "../../../_util";

export const maxDuration = 60;

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await businessFor(await requireCtx(), id);
    return NextResponse.json({ references: await store().listReferences(id) });
  } catch (e) {
    return fail(e);
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await businessFor(await requireCtx(), id);
    const body = await req.json().catch(() => ({}));
    const url = str(body.url, 2000);
    if (!url) return fail(new Error("Paste a link to the video."), 400);
    return NextResponse.json({ reference: await addReference(id, url, str(body.note, 1000)) });
  } catch (e) {
    return fail(e, e instanceof Error && /link|https|TikTok/.test(e.message) ? 400 : 500);
  }
}
