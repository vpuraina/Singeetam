import { createClient } from "@/lib/supabase/server";

// Call at the top of any admin-only API route. Returns the user if they're
// an admin, or null if they should be rejected with a 403.
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  const adminEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  const isEnvAdmin = adminEmails.includes((user.email || "").toLowerCase());

  if (!profile?.is_admin && !isEnvAdmin) return null;
  return user;
}
