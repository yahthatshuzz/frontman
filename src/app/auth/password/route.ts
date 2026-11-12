import { NextResponse } from "next/server";
import { authClient } from "@/lib/supabase/server";
import { fail } from "../../api/_util";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const password = String(body.password ?? "");
    if (password.length < 8) return fail(new Error("Use a password with at least 8 characters."), 400);
    const supabase = await authClient();
    const { data } = await supabase.auth.getUser();
    if (!data.user) return fail(new Error("Your reset link expired. Ask for a new one."), 401);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) return fail(new Error(error.message), 400);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return fail(e);
  }
}
