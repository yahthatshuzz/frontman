import { NextResponse } from "next/server";
import { requestOrigin } from "@/lib/origin";
import { authClient } from "@/lib/supabase/server";
import { fail, str } from "../../api/_util";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const code = process.env.FRONTMAN_INVITE_CODE;
    if (code && str(body.invite, 200) !== code) return fail(new Error("That invite code isn't right. Check your invite and try again."), 400);
    const password = String(body.password ?? "");
    if (password.length < 8) return fail(new Error("Use a password with at least 8 characters."), 400);
    const { data, error } = await (await authClient()).auth.signUp({
      email: str(body.email, 320),
      password,
      options: { emailRedirectTo: `${await requestOrigin()}/auth/callback?next=/login%3Fnotice%3Dconfirmed` },
    });
    if (error) return fail(new Error(error.message), 400);
    if (data.session) return NextResponse.json({ ok: true });
    return NextResponse.json({ message: "Check your email. We sent a link to confirm your account; it opens Frontman when you tap it." });
  } catch (e) {
    return fail(e);
  }
}
