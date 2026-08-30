import { createAdminClient } from "@/lib/supabase/server";
import UserRowActions from "@/components/admin/UserRowActions";

export const metadata = { title: "Admin · Users — Singeetam" };

export default async function AdminUsersPage() {
  const admin = createAdminClient();
  const { data: users } = await admin
    .from("profiles")
    .select("id, display_name, is_premium, is_admin, created_at")
    .order("created_at", { ascending: false });

  return (
    <table className="w-full text-left text-sm">
      <thead className="text-muted">
        <tr className="border-b border-white/10">
          <th className="py-2 font-medium">Name</th>
          <th className="py-2 font-medium">Premium</th>
          <th className="py-2 font-medium">Admin</th>
          <th className="py-2 font-medium">Joined</th>
          <th className="py-2 font-medium">Actions</th>
        </tr>
      </thead>
      <tbody>
        {(users || []).map((u) => (
          <tr key={u.id} className="border-b border-white/5">
            <td className="py-2">{u.display_name}</td>
            <td className="py-2">{u.is_premium ? "Yes" : "No"}</td>
            <td className="py-2">{u.is_admin ? "Yes" : "No"}</td>
            <td className="py-2 text-muted">{new Date(u.created_at).toLocaleDateString()}</td>
            <td className="py-2">
              <UserRowActions userId={u.id} isPremium={u.is_premium} isAdmin={u.is_admin} />
            </td>
          </tr>
        ))}
        {!users?.length && (
          <tr>
            <td colSpan={5} className="py-6 text-center text-muted">
              No users yet.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
