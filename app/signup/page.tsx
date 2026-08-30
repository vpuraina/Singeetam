"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } },
    });

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <div className="mx-auto max-w-sm px-6 py-16 text-center">
        <h1 className="brand-word text-2xl font-bold">Check your inbox</h1>
        <p className="mt-3 text-muted">
          We sent a confirmation link to {email}. Confirm it, then log in.
        </p>
        <Link href="/login" className="mt-6 inline-block text-brand hover:underline">
          Go to login
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-5 px-6 py-16">
      <h1 className="brand-word text-2xl font-bold">Create your account</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm text-muted">
          Display name
          <input
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="rounded-lg border border-white/10 bg-panel px-3 py-2 text-white outline-none focus:border-brand"
          />
        </label>
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
            minLength={6}
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
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>
      <p className="text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="text-brand hover:underline">
          Log in
        </Link>
      </p>
      <p className="text-xs text-muted/70">
        By signing up you agree to our{" "}
        <Link href="/terms" className="underline">
          Terms &amp; Conditions
        </Link>
        .
      </p>
    </div>
  );
}
