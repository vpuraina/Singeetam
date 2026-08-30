"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function UpgradeButton({ isPremium }: { isPremium: boolean }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const toggle = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    // Demo-only: flips is_premium directly. Replace this with a real
    // checkout flow (Stripe/Razorpay webhook setting is_premium) before
    // launch, so people can't grant themselves premium for free.
    await supabase.from("profiles").update({ is_premium: !isPremium }).eq("id", user.id);

    setLoading(false);
    router.refresh();
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className="block w-full rounded-full bg-brand py-2 text-center font-semibold text-[#04121f] hover:bg-[#63cfff] disabled:opacity-50"
    >
      {loading ? "Updating..." : isPremium ? "Cancel Premium" : "Upgrade to Premium"}
    </button>
  );
}
