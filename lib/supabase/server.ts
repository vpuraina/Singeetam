import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { CookieOptions } from "@supabase/ssr";

// Used inside Server Components, Server Actions, and Route Handlers.
// Reads/writes the session via cookies so auth persists across requests.
// Next.js 15+ made cookies() async, so this must be awaited by callers.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(
          cookiesToSet: { name: string; value: string; options: CookieOptions }[]
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll is called from a Server Component sometimes, which can't
            // set cookies. Safe to ignore if you have middleware refreshing
            // the session (see middleware.ts).
          }
        },
      },
    }
  );
}

// Admin client: uses the service role key, bypasses Row Level Security.
// ONLY import this in server-side code that has already verified the
// caller is an admin. Never expose this client or its key to the browser.
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
