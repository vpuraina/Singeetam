import { createAdminClient } from "@/lib/supabase/server";
import TrackRowActions from "@/components/admin/TrackRowActions";

export const metadata = { title: "Admin · Tracks — Singeetam" };

export default async function AdminTracksPage() {
  const admin = createAdminClient();
  const { data: tracks } = await admin
    .from("tracks")
    .select("id, title, artist_name, status, owner_id, created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <table className="w-full text-left text-sm">
      <thead className="text-muted">
        <tr className="border-b border-white/10">
          <th className="py-2 font-medium">Title</th>
          <th className="py-2 font-medium">Artist</th>
          <th className="py-2 font-medium">Status</th>
          <th className="py-2 font-medium">Uploaded</th>
          <th className="py-2 font-medium">Actions</th>
        </tr>
      </thead>
      <tbody>
        {(tracks || []).map((t) => (
          <tr key={t.id} className="border-b border-white/5">
            <td className="py-2">{t.title}</td>
            <td className="py-2">{t.artist_name}</td>
            <td className="py-2 capitalize">{t.status}</td>
            <td className="py-2 text-muted">{new Date(t.created_at).toLocaleDateString()}</td>
            <td className="py-2">
              <TrackRowActions trackId={t.id} status={t.status} />
            </td>
          </tr>
        ))}
        {!tracks?.length && (
          <tr>
            <td colSpan={5} className="py-6 text-center text-muted">
              No tracks uploaded yet.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
