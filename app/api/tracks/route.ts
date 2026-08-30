import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const title = typeof body?.title === "string" ? body.title.slice(0, 200).trim() : "";
  const artistName =
    typeof body?.artistName === "string" ? body.artistName.slice(0, 200).trim() : "";
  const storageKey = typeof body?.storageKey === "string" ? body.storageKey : "";
  const publicUrl = typeof body?.publicUrl === "string" ? body.publicUrl : "";
  const durationSeconds = Number.isFinite(body?.durationSeconds)
    ? Math.max(0, Math.round(body.durationSeconds))
    : 0;

  if (!title || !storageKey || !publicUrl) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  // Insert using the user's own session (not the admin client), so Row
  // Level Security enforces owner_id = auth.uid() automatically.
  const { data, error } = await supabase
    .from("tracks")
    .insert({
      owner_id: user.id,
      title,
      artist_name: artistName || "Unknown Artist",
      storage_key: storageKey,
      public_url: publicUrl,
      duration_seconds: durationSeconds,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ track: data });
}
