import { businessFor, requireCtx } from "@/lib/session";
import { isCloudStorage, readLocal } from "@/lib/storage";
import { store } from "@/lib/store";
import { fail } from "../../../_util";

/** Local mode only: plays a take from .data/takes. In production the dashboard gets a signed Supabase URL instead. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (isCloudStorage()) return fail(new Error("Not found."), 404);
    const { id } = await params;
    const take = await store().getTake(id);
    if (!take) return fail(new Error("Take not found."), 404);
    await businessFor(await requireCtx(), take.businessId);
    const buf = await readLocal(take.path);
    return new Response(new Uint8Array(buf), { headers: { "content-type": take.mime, "content-length": String(buf.length) } });
  } catch (e) {
    return fail(e);
  }
}
