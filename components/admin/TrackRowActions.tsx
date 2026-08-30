"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TrackRowActions({
  trackId,
  status,
}: {
  trackId: string;
  status: string;
}) {
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const setStatus = async (next: "ready" | "blocked") => {
    setBusy(true);
    await fetch("/api/admin/tracks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trackId, status: next }),
    });
    setBusy(false);
    router.refresh();
  };

  const remove = async () => {
    if (!confirm("Permanently delete this track and its file?")) return;
    setBusy(true);
    await fetch("/api/admin/tracks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trackId }),
    });
    setBusy(false);
    router.refresh();
  };

  return (
    <div className="flex gap-2">
      <button
        disabled={busy}
        onClick={() => setStatus(status === "blocked" ? "ready" : "blocked")}
        className="rounded-full border border-white/10 px-3 py-1 text-xs hover:border-brand disabled:opacity-50"
      >
        {status === "blocked" ? "Unblock" : "Block"}
      </button>
      <button
        disabled={busy}
        onClick={remove}
        className="rounded-full border border-red-400/40 px-3 py-1 text-xs text-red-300 hover:border-red-400 disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}
