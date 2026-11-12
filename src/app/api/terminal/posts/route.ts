import { NextResponse } from "next/server";
import { requireCtx } from "@/lib/session";
import { isPlatform, posts, schedule } from "@/lib/social/service";
import { fail, str } from "../../_util";

export async function GET(req: Request) {
  try {
    return NextResponse.json({ posts: await posts(await requireCtx(), new URL(req.url).searchParams.get("b") ?? "") }, { headers: { "cache-control": "no-store" } });
  } catch (e) {
    return fail(e);
  }
}

export async function POST(req: Request) {
  try {
    const b = await req.json().catch(() => ({}));
    const caps = b.captions && typeof b.captions === "object" ? (b.captions as Record<string, unknown>) : {};
    const out = await schedule(await requireCtx(), str(b.businessId, 100), {
      renderId: str(b.renderId, 100),
      title: str(b.title, 200),
      pillar: str(b.pillar, 20),
      when: str(b.when, 40),
      captions: Object.fromEntries(Object.entries(caps).filter(([k]) => isPlatform(k)).map(([k, v]) => [k, str(v, 5000)])),
      platforms: Array.isArray(b.platforms) ? b.platforms.filter((p: unknown) => typeof p === "string" && isPlatform(p)) : [],
    });
    return NextResponse.json({ posts: out });
  } catch (e) {
    return fail(e);
  }
}
