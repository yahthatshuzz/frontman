import { NextResponse } from "next/server";
import { authClient } from "@/lib/supabase/server";
import { fail, str } from "../../api/_util";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { error } = await (await authClient()).auth.signInWithPassword({ email: str(body.email, 320), password: String(body.password ?? "") });
    if (error) {
      const msg = /confirm/i.test(error.message)
        ? "Confirm your email first. Check your inbox for the link."
        : "That email and password don't match. Try again or reset your password.";
      return fail(new Error(msg), 400);
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return fail(e);
  }
}
