import { NextResponse } from "next/server";
import { requestOrigin } from "@/lib/origin";
import { requireCtx } from "@/lib/session";
import { PLATFORM_NAMES } from "@/lib/social/platforms";
import { connectFinish, isPlatform } from "@/lib/social/service";

export async function GET(req: Request, { params }: { params: Promise<{ platform: string }> }) {
  const url = new URL(req.url);
  const { platform } = await params;
  const back = (msg: string, b?: string) => NextResponse.redirect(new URL(`/?${b ? `b=${b}&` : ""}msg=${encodeURIComponent(msg)}#post`, req.url));
  if (!isPlatform(platform)) return back("Unknown platform.");
  if (url.searchParams.get("error")) return back(`${PLATFORM_NAMES[platform]} wasn't connected: ${url.searchParams.get("error_description") ?? url.searchParams.get("error")}.`);
  try {
    const b = await connectFinish(await requireCtx(), platform, url.searchParams.get("code") ?? "", url.searchParams.get("state") ?? "", await requestOrigin());
    return back(`${PLATFORM_NAMES[platform]} connected`, b);
  } catch (e) {
    return back(e instanceof Error ? e.message : "Couldn't connect. Try again.");
  }
}
