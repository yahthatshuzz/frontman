import { NextResponse } from "next/server";
import { requestOrigin } from "@/lib/origin";
import { requireCtx } from "@/lib/session";
import { connectUrl, isPlatform } from "@/lib/social/service";
import { fail } from "../../_util";

/** Starts the official sign-in for a platform. The Terminal opens this in the same tab. */
export async function GET(req: Request, { params }: { params: Promise<{ platform: string }> }) {
  try {
    const { platform } = await params;
    if (!isPlatform(platform)) return fail(new Error("Unknown platform."), 404);
    const b = new URL(req.url).searchParams.get("b") ?? "";
    return NextResponse.redirect(await connectUrl(await requireCtx(), b, platform, await requestOrigin()));
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Couldn't start connecting.";
    return NextResponse.redirect(new URL(`/?msg=${encodeURIComponent(msg)}#post`, req.url));
  }
}
