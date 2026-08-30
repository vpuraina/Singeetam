import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { createAdminClient } from "@/lib/supabase/server";

export async function PATCH(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const userId = typeof body?.userId === "string" ? body.userId : "";
  const field = body?.field === "is_premium" || body?.field === "is_admin" ? body.field : null;
  const value = typeof body?.value === "boolean" ? body.value : null;

  if (!userId || !field || value === null) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const adminClient = createAdminClient();
  const { error } = await adminClient
    .from("profiles")
    .update({ [field]: value })
    .eq("id", userId);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
