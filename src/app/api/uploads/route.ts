import { isCloudStorage, localSigOk, writeLocal } from "@/lib/storage";
import { fail } from "../_util";

/** Local mode only: stands in for Supabase's signed upload URL. */
export async function PUT(req: Request) {
  try {
    if (isCloudStorage()) return fail(new Error("Not found."), 404);
    const url = new URL(req.url);
    const p = url.searchParams.get("path") ?? "";
    if (!localSigOk(p, url.searchParams.get("sig") ?? "")) return fail(new Error("This upload link isn't valid."), 403);
    await writeLocal(p, await req.arrayBuffer());
    return Response.json({ ok: true });
  } catch (e) {
    return fail(e);
  }
}
