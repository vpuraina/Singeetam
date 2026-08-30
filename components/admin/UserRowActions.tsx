"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserRowActions({
  userId,
  isPremium,
  isAdmin,
}: {
  userId: string;
  isPremium: boolean;
  isAdmin: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const toggle = async (field: "is_premium" | "is_admin", value: boolean) => {
    setBusy(true);
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, field, value }),
    });
    setBusy(false);
    router.refresh();
  };

  return (
    <div className="flex gap-2">
      <button
        disabled={busy}
        onClick={() => toggle("is_premium", !isPremium)}
        className="rounded-full border border-white/10 px-3 py-1 text-xs hover:border-brand disabled:opacity-50"
      >
        {isPremium ? "Revoke premium" : "Grant premium"}
      </button>
      <button
        disabled={busy}
        onClick={() => toggle("is_admin", !isAdmin)}
        className="rounded-full border border-white/10 px-3 py-1 text-xs hover:border-brand disabled:opacity-50"
      >
        {isAdmin ? "Remove admin" : "Make admin"}
      </button>
    </div>
  );
}
