import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getUploadUrl, publicUrlFor, buildTrackKey } from "@/lib/r2";

const ALLOWED_TYPES = new Set([
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/x-wav",
  "audio/ogg",
  "audio/mp4",
  "audio/aac",
  "audio/flac",
]);

const MAX_TITLE_LENGTH = 200;

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not logged in." }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const fileName = typeof body?.fileName === "string" ? body.fileName : "";
    const contentType = typeof body?.contentType === "string" ? body.contentType : "";

    if (!fileName || fileName.length > MAX_TITLE_LENGTH) {
      return NextResponse.json({ error: "Invalid file name." }, { status: 400 });
    }
    if (!ALLOWED_TYPES.has(contentType)) {
      return NextResponse.json(
        { error: "Unsupported audio format. Use mp3, wav, ogg, m4a, aac, or flac." },
        { status: 400 }
      );
    }

    // Basic per-user upload cap for the free tier - premium users skip it.
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_premium")
      .eq("id", user.id)
      .single();

    if (!profile?.is_premium) {
      const { count } = await supabase
        .from("tracks")
        .select("id", { count: "exact", head: true })
        .eq("owner_id", user.id);

      if ((count || 0) >= 10) {
        return NextResponse.json(
          { error: "Free plan is limited to 10 uploads. Upgrade to Premium for unlimited uploads." },
          { status: 403 }
        );
      }
    }

    const key = buildTrackKey(user.id, fileName);
    const uploadUrl = await getUploadUrl(key, contentType);

    return NextResponse.json({ uploadUrl, key, publicUrl: publicUrlFor(key) });
  } catch (error: any) {
    console.error("Upload route error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error during upload preparation." },
      { status: 500 }
    );
  }
}