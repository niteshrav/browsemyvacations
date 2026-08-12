import Link from "next/link";
import { AdminLoginDialog } from "@/components/admin-login-dialog";
import { BrandLogo } from "@/components/brand-logo";
import { siteHeaderClassName, siteHeaderInnerClassName } from "@/lib/brand-logo";

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
        <Link href="/" className="inline-flex shrink-0 items-center transition hover:opacity-95">
          <BrandLogo priority />
        </Link>
        <nav
          className="flex flex-wrap items-center gap-0.5 sm:justify-end sm:gap-1"
          aria-label="Main navigation"
        >
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link !py-0.5 !text-[13px]">
              {item.label}
            </Link>
          ))}
          <AdminLoginDialog />
        </nav>
      </div>
    </header>
  );
}
