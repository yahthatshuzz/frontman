import { NextResponse } from "next/server";
import { linkFromToken, startTake } from "@/lib/shoot";
import { fail, str } from "../../../_util";

export async function POST(req: Request, { params }: { params: Promise<{ token: string }> }) {
  try {
    const { token } = await params;
    const { business } = await linkFromToken(token);
    const body = await req.json().catch(() => ({}));
    const source = body.source === "upload" ? "upload" : "phone";
    return NextResponse.json(
      await startTake(business, { scriptId: str(body.scriptId, 100), mime: str(body.mime, 100), bytes: Number(body.bytes) || 0, seconds: Number(body.seconds) || 0, source }),
    );
  } catch (e) {
    return fail(e);
  }
}
