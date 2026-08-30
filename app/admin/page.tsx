import { createAdminClient } from "@/lib/supabase/server";

export const metadata = { title: "Admin — Singeetam" };

export default async function AdminOverview() {
  const admin = createAdminClient();

  const [{ count: userCount }, { count: premiumCount }, { count: trackCount }, { count: blockedCount }] =
    await Promise.all([
      admin.from("profiles").select("id", { count: "exact", head: true }),
      admin.from("profiles").select("id", { count: "exact", head: true }).eq("is_premium", true),
      admin.from("tracks").select("id", { count: "exact", head: true }),
      admin.from("tracks").select("id", { count: "exact", head: true }).eq("status", "blocked"),
    ]);

  const stats = [
    { label: "Total users", value: userCount || 0 },
    { label: "Premium users", value: premiumCount || 0 },
    { label: "Uploaded tracks", value: trackCount || 0 },
    { label: "Blocked tracks", value: blockedCount || 0 },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl border border-white/10 bg-panel p-5">
          <p className="text-2xl font-bold">{s.value}</p>
          <p className="mt-1 text-xs text-muted">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
