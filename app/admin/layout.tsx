import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirectTo=/admin");

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  // Fallback: env-listed emails always count as admin, even before the
  // profiles row has been flagged manually - useful for bootstrapping
  // your own account as the first admin.
  const adminEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  const isEnvAdmin = adminEmails.includes((user.email || "").toLowerCase());

  if (!profile?.is_admin && !isEnvAdmin) {
    redirect("/player");
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="brand-word text-2xl font-bold">Admin</h1>
      <nav className="mt-4 flex gap-4 border-b border-white/10 pb-3 text-sm text-muted">
        <Link href="/admin" className="hover:text-white">
          Overview
        </Link>
        <Link href="/admin/users" className="hover:text-white">
          Users
        </Link>
        <Link href="/admin/tracks" className="hover:text-white">
          Tracks
        </Link>
      </nav>
      <div className="mt-6">{children}</div>
    </div>
  );
}
