import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { createAdminClient } from "@/lib/supabase/server";
import { deleteObject } from "@/lib/r2";

export async function PATCH(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const trackId = typeof body?.trackId === "string" ? body.trackId : "";
  const status = body?.status === "ready" || body?.status === "blocked" ? body.status : null;

  if (!trackId || !status) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const adminClient = createAdminClient();
  const { error } = await adminClient.from("tracks").update({ status }).eq("id", trackId);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const trackId = typeof body?.trackId === "string" ? body.trackId : "";
  if (!trackId) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const adminClient = createAdminClient();
  const { data: track } = await adminClient
    .from("tracks")
    .select("storage_key")
    .eq("id", trackId)
    .single();

  if (track?.storage_key) {
    await deleteObject(track.storage_key).catch(() => {
      /* Object may already be gone - still proceed to remove the DB row. */
    });
  }

  const { error } = await adminClient.from("tracks").delete().eq("id", trackId);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
