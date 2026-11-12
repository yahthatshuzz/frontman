import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { requestOrigin } from "@/lib/origin";
import { businessFor, requireCtx } from "@/lib/session";
import { shootLinkFor } from "@/lib/shoot";
import { fail, str } from "../../../_util";

/** The QR code for the phone recorder, starting on one script. */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const b = await businessFor(await requireCtx(), id);
    const body = await req.json().catch(() => ({}));
    const link = await shootLinkFor(b, str(body.scriptId, 100));
    const url = `${await requestOrigin()}/r/${link.token}`;
    const qr = await QRCode.toString(url, { type: "svg", margin: 0, errorCorrectionLevel: "M" });
    return NextResponse.json({ url, qr, expiresAt: link.expiresAt, openedAt: link.openedAt ?? null, scriptId: link.scriptId });
  } catch (e) {
    return fail(e);
  }
}
