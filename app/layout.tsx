import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "@/components/SignOutButton";

export const metadata: Metadata = {
  title: "Singeetam — Divine Music, Infinite Beats",
  description:
    "Singeetam is a web music player where you can stream, upload, and share your own tracks.",
  icons: { icon: "/logo.png" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isAdmin = false;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single();
    isAdmin = !!profile?.is_admin;
  }

  return (
    <html lang="en">
      <body className="min-h-screen bg-bg text-white">
        <header className="flex items-center justify-between px-6 py-3 border-b border-white/10">
          <Link href="/player" className="flex items-center gap-2">
            <Image src="/logo.png" alt="" width={32} height={32} className="rounded-full" />
            <span className="brand-word text-xl font-bold">Singeetam</span>
          </Link>
          <nav className="flex items-center gap-5 text-sm text-muted">
            <Link href="/player" className="hover:text-white">
              Player
            </Link>
            <Link href="/premium" className="hover:text-white">
              Premium
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
            {isAdmin && (
              <Link href="/admin" className="hover:text-white">
                Admin
              </Link>
            )}
            {user ? (
              <SignOutButton />
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-brand px-4 py-1.5 font-semibold text-[#04121f] hover:bg-[#63cfff]"
              >
                Log in
              </Link>
            )}
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
