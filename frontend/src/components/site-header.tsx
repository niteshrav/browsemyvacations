"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminLoginDialog } from "@/components/admin-login-dialog";
import { BrandLogo } from "@/components/brand-logo";
import {
  brandLogoHeaderClassName,
  brandLogoHeaderLinkClassName,
  siteHeaderClassName,
  siteHeaderInnerClassName,
  siteHeaderMenuButtonClassName,
  siteHeaderMobileNavClassName,
  siteHeaderMobileNavLinkClassName,
  siteHeaderNavClassName,
} from "@/lib/brand-logo-ui";

const nav = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Packages" },
  { href: "/vacation-meter", label: "Vacation Meter" },
  { href: "/mice", label: "MICE" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
] as const;

function MenuIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
        <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className={siteHeaderClassName()} data-site-chrome="header">
      <div className={siteHeaderInnerClassName()}>
        <Link
          href="/"
          className={`${brandLogoHeaderLinkClassName()} shrink-0 transition hover:opacity-95`}
        >
          <BrandLogo priority className={brandLogoHeaderClassName()} />
        </Link>

        <nav className={siteHeaderNavClassName()} aria-label="Main navigation">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link site-header-nav-link">
              {item.label}
            </Link>
          ))}
          <AdminLoginDialog />
        </nav>

        <button
          type="button"
          className={siteHeaderMenuButtonClassName()}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="site-mobile-nav"
          data-testid="site-mobile-menu-button"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      {menuOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 top-14 z-40 bg-stone-900/30 md:hidden"
            aria-label="Close menu"
            onClick={closeMenu}
          />
          <nav
            id="site-mobile-nav"
            className={siteHeaderMobileNavClassName()}
            aria-label="Mobile navigation"
            data-testid="site-mobile-nav"
          >
            <ul className="flex flex-col gap-1">
              {nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`${siteHeaderMobileNavLinkClassName()} ${
                        active ? "bg-teal-50 font-semibold text-teal-800" : ""
                      }`}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-2 border-t border-stone-100 pt-2">
              <AdminLoginDialog
                triggerClassName={`${siteHeaderMobileNavLinkClassName()} font-semibold text-teal-800`}
                onTriggerClick={closeMenu}
              />
            </div>
          </nav>
        </>
      ) : null}
    </header>
  );
}
