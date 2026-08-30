"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }

    router.push(searchParams.get("redirectTo") || "/player");
    router.refresh();
  };

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-5 px-6 py-16">
      <h1 className="brand-word text-2xl font-bold">Welcome back</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm text-muted">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-white/10 bg-panel px-3 py-2 text-white outline-none focus:border-brand"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-muted">
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border border-white/10 bg-panel px-3 py-2 text-white outline-none focus:border-brand"
          />
        </label>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-brand py-2 font-semibold text-[#04121f] hover:bg-[#63cfff] disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
      <p className="text-sm text-muted">
        New to Singeetam?{" "}
        <Link href="/signup" className="text-brand hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
