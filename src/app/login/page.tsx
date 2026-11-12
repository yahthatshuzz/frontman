import { redirect } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";
import { authEnabled } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const NOTICES: Record<string, string> = {
  confirmed: "Your email is confirmed. Sign in to continue.",
  expired: "That link has expired or was already used. Sign in, or reset your password to get a new one.",
  reset: "Your password is updated. Sign in with the new one.",
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; mode?: string; notice?: string }> }) {
  if (!authEnabled()) redirect("/");
  const { next, mode, notice } = await searchParams;
  return <AuthForm mode={mode === "forgot" ? "forgot" : "login"} next={next} notice={notice ? NOTICES[notice] : undefined} />;
}
