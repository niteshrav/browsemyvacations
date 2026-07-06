import Link from "next/link";
import { AdminLoginDialog } from "@/components/admin-login-dialog";
import { BrandLogo } from "@/components/brand-logo";
import { siteHeaderClassName } from "@/lib/brand-logo";

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
    <header className={siteHeaderClassName()}>
      <div className="site-container flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="inline-flex shrink-0 items-center transition hover:opacity-95">
          <BrandLogo priority />
        </Link>
        <nav className="flex flex-wrap items-center gap-1 sm:justify-end" aria-label="Main navigation">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
          <AdminLoginDialog />
        </nav>
      </div>
    </header>
  );
}
