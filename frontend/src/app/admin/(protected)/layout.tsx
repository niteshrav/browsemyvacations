"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminProfileMenu } from "@/components/admin/admin-profile-menu";
import { getAdminProfileFromToken, getAdminToken } from "@/lib/admin-auth";
import { ADMIN_LOGIN_PATH } from "@/lib/admin-routes";
import {
  ADMIN_NAV_ITEMS,
  adminContainerClassName,
  adminContentClassName,
  adminNavLinkClassName,
  adminShellClassName,
  adminTopBarClassName,
  isAdminNavActive,
} from "@/lib/admin-ui";

export default function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const profile = getAdminProfileFromToken();
  const profileEmail = profile?.email ?? "admin@browsemyvacations.com";
  const profileRole = (profile?.role ?? "admin").toUpperCase();

  useEffect(() => {
    if (!getAdminToken()) {
      router.replace(ADMIN_LOGIN_PATH);
    }
  }, [pathname, router]);

  return (
    <div className={adminShellClassName()}>
      <style jsx global>{`
        [data-site-chrome="header"],
        [data-site-chrome="footer"] {
          display: none !important;
        }
      `}</style>
      <div className={adminContainerClassName()}>
        <header className={adminTopBarClassName()}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">Admin panel</p>
              <p className="mt-1 text-lg font-semibold text-stone-900">Browse My Vacations</p>
            </div>
            <AdminProfileMenu email={profileEmail} role={profileRole} />
          </div>

          <nav className="mt-5 flex flex-wrap gap-2 border-t border-stone-100 pt-4" aria-label="Admin navigation">
            {ADMIN_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={adminNavLinkClassName(isAdminNavActive(pathname, item.href))}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        <div className={adminContentClassName()}>{children}</div>
      </div>
    </div>
  );
}
