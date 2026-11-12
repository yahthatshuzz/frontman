import { NextResponse } from "next/server";
import { businessFor, requireCtx } from "@/lib/session";
import { startTake, takesWithUrls } from "@/lib/shoot";
import { store } from "@/lib/store";
import { fail, str } from "../../../_util";

/** Takes for the Shoot tab, plus whether the phone has opened the current link. The tab polls this. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await businessFor(await requireCtx(), id);
    const [takes, link, scripts] = await Promise.all([takesWithUrls(id), store().latestShootLink(id), store().listScripts(id)]);
    return NextResponse.json({ takes, phoneOpenedAt: link?.openedAt ?? null, scripts });
  } catch (e) {
    return fail(e);
  }
}

/** Upload from the dashboard: start a take and get the URL to send the file to. */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const b = await businessFor(await requireCtx(), id);
    const body = await req.json().catch(() => ({}));
    return NextResponse.json(
      await startTake(b, { scriptId: str(body.scriptId, 100), mime: str(body.mime, 100), bytes: Number(body.bytes) || 0, seconds: Number(body.seconds) || 0, source: "upload" }),
    );
  } catch (e) {
    return fail(e);
  }
}
