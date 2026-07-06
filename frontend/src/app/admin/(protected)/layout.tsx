"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { clearAdminToken, getAdminToken } from "@/lib/admin-auth";
import { ADMIN_LOGIN_PATH } from "@/lib/admin-routes";

export default function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!getAdminToken()) {
      router.replace(ADMIN_LOGIN_PATH);
    }
  }, [pathname, router]);

  return (
    <div className="site-container py-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <nav className="flex flex-wrap gap-2 text-sm font-medium" aria-label="Admin navigation">
          <Link href="/admin/destinations" className="nav-link">
            Destinations
          </Link>
          <Link href="/admin/packages" className="nav-link">
            Packages
          </Link>
          <Link href="/admin/leads" className="nav-link">
            Leads
          </Link>
          <Link href="/admin/meter" className="nav-link">
            Meter
          </Link>
          <Link href="/" className="nav-link text-stone-500">
            View site
          </Link>
        </nav>
        <button
          type="button"
          className="nav-link text-stone-500"
          onClick={() => {
            clearAdminToken();
            router.push(ADMIN_LOGIN_PATH);
          }}
        >
          Sign out
        </button>
      </div>
      {children}
    </div>
  );
}
