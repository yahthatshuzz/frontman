import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/** Login is on when the Supabase URL and publishable key are set. Without them the app runs in local mode (no login). */
export function authEnabled(): boolean {
  return !!(process.env.SUPABASE_URL && process.env.SUPABASE_PUBLISHABLE_KEY);
}

/** Supabase Auth client bound to the request's cookies. Only used for sign-in and reading the session; data goes through the Store. */
export async function authClient() {
  const jar = await cookies();
  return createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    cookies: {
      getAll: () => jar.getAll(),
      setAll: (list) => {
        try {
          for (const c of list) jar.set(c.name, c.value, c.options);
        } catch {
          // Called from a Server Component, where cookies are read-only. The proxy refreshes the session instead.
        }
      },
    },
  });
}
