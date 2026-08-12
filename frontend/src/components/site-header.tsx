import Link from "next/link";
import { AdminLoginDialog } from "@/components/admin-login-dialog";
import { BrandLogo } from "@/components/brand-logo";
import {
  brandLogoHeaderClassName,
  brandLogoHeaderLinkClassName,
  siteHeaderClassName,
  siteHeaderInnerClassName,
} from "@/lib/brand-logo";

const nav = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Packages" },
  { href: "/vacation-meter", label: "Vacation Meter" },
  { href: "/mice", label: "MICE" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className={siteHeaderClassName()} data-site-chrome="header">
      <div className={siteHeaderInnerClassName()}>
        <Link
          href="/"
          className={`${brandLogoHeaderLinkClassName()} shrink-0 transition hover:opacity-95`}
        >
          <BrandLogo priority className={brandLogoHeaderClassName()} />
        </Link>
        <nav
          className="flex flex-wrap items-center gap-0.5 sm:justify-end sm:gap-1.5"
          aria-label="Main navigation"
        >
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link site-header-nav-link">
              {item.label}
            </Link>
          ))}
          <AdminLoginDialog />
        </nav>
      </div>
    </header>
  );
}
