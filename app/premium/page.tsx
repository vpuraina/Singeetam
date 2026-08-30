import { createClient } from "@/lib/supabase/server";
import UpgradeButton from "@/components/UpgradeButton";

export const metadata = { title: "Premium — Singeetam" };

export default async function PremiumPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isPremium = false;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_premium")
      .eq("id", user.id)
      .single();
    isPremium = !!profile?.is_premium;
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <h1 className="brand-word text-3xl font-bold">Singeetam Premium</h1>
      <p className="mt-2 text-muted">Higher quality streams, unlimited uploads, no limits.</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-panel p-6">
          <h2 className="text-lg font-semibold">Free</h2>
          <p className="mt-1 text-3xl font-bold">₹0</p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-muted">
            <li>Standard streaming quality</li>
            <li>Up to 10 uploads</li>
            <li>Ads between tracks</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-brand/60 bg-panel p-6 shadow-[0_0_40px_rgba(56,189,248,0.15)]">
          <h2 className="text-lg font-semibold text-brand">Premium</h2>
          <p className="mt-1 text-3xl font-bold">₹99 / mo</p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-muted">
            <li>High-fidelity streaming</li>
            <li>Unlimited uploads</li>
            <li>Ad-free listening</li>
            <li>Offline downloads</li>
          </ul>
          <div className="mt-5">
            {user ? (
              <UpgradeButton isPremium={isPremium} />
            ) : (
              <a
                href="/login?redirectTo=/premium"
                className="block rounded-full bg-brand py-2 text-center font-semibold text-[#04121f] hover:bg-[#63cfff]"
              >
                Log in to upgrade
              </a>
            )}
          </div>
        </div>
      </div>

      <p className="mt-8 text-xs text-muted/70">
        This page currently toggles premium status directly for demo purposes. Wire it up to a
        real payment provider (Stripe or Razorpay work well and integrate cleanly with Next.js +
        Supabase) before charging real users.
      </p>
    </div>
  );
}
