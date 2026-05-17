"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();

  const pathname = usePathname();

  // HIDE NAVBAR ON HOME PAGE
  if (pathname === "/") {
    return null;
  }

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600"
        >
          FundMan
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {!session ? (
  <>
    <Link
      href="/vendor/register"
      className="border border-blue-600 text-blue-600 px-5 py-2 rounded-xl font-medium hover:bg-blue-50 transition"
    >
      Become a Vendor
    </Link>

    <Link
      href="/login"
      className="bg-blue-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-blue-700 transition"
    >
      Login
    </Link>
  </>
) : (
            <>
              <Link
                href="/admin"
                className="text-sm font-medium"
              >
                Dashboard
              </Link>

              <div className="text-sm text-gray-600">
                {session.user?.email}
              </div>

              <button
                onClick={() => signOut()}
                className="bg-red-500 text-white px-4 py-2 rounded-xl"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </header>
  );
}