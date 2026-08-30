import { createClient } from "@/lib/supabase/server";
import LegacyPlayerMount from "@/components/LegacyPlayerMount";

export const metadata = { title: "Singeetam — Player" };

export default async function PlayerPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Pull every ready, public track plus the current user's own private ones,
  // and shape them into the exact object the legacy player expects
  // (see addLocalFiles() in app.js for the reference shape).
  const { data: tracks } = await supabase
    .from("tracks")
    .select("id, title, artist_name, duration_seconds, public_url, cover_url, owner_id")
    .eq("status", "ready")
    .or(user ? `is_public.eq.true,owner_id.eq.${user.id}` : "is_public.eq.true");

  const userTracks = (tracks || []).map((t) => ({
    id: `db-${t.id}`,
    title: t.title,
    artist: t.artist_name,
    artistId: `db-artist-${t.owner_id}`,
    album: "Uploads",
    albumId: "db-uploads",
    duration: t.duration_seconds || 180,
    cover: "cover-k",
    genre: "Uploaded",
    year: new Date().getFullYear(),
    explicit: false,
    hasVideo: false,
    localUrl: t.public_url,
    lyrics: [],
  }));

  return (
    <div>
      <div className="flex items-center justify-between px-6 py-3 text-sm text-muted">
        <span>
          {user
            ? "Your uploads are mixed into Local Files."
            : "Log in to upload your own tracks."}
        </span>
        {user && (
          <a href="/player/upload" className="text-brand hover:underline">
            Upload a track →
          </a>
        )}
      </div>
      <LegacyPlayerMount userTracks={userTracks} />
    </div>
  );
}
