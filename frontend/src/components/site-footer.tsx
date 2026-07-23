import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

const EXPLORE_LINKS = [
  { href: "/packages", label: "Packages" },
  { href: "/vacation-meter", label: "Vacation Meter" },
  { href: "/mice", label: "MICE" },
  { href: "/about", label: "About Us" },
] as const;

const PLAN_LINKS = [
  { href: "/search?q=Jaipur", label: "Jaipur" },
  { href: "/search?q=Udaipur", label: "Udaipur" },
  { href: "/search?q=Jodhpur", label: "Jodhpur" },
  { href: "/search?q=Jaisalmer", label: "Jaisalmer" },
] as const;

const SUPPORT_LINKS = [
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/vacation-meter", label: "Custom request" },
] as const;

export function SiteFooter() {
  return (
    <footer
      className="mt-auto border-t border-teal-900/20 bg-teal-950 text-teal-50"
      data-site-chrome="footer"
    >
      <div className="site-container py-12 sm:py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex rounded-md bg-white/95 px-2 py-1.5">
              <BrandLogo className="h-10 w-auto max-w-[220px] object-contain object-left" />
            </Link>
            <p className="mt-4 font-serif text-lg font-medium text-white">
              Vacations You&apos;ll Love.
              <br />
              Memories You&apos;ll Keep.
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-teal-100/75">
              Curated Rajasthan journeys — packages, custom routes, and seamless travel support.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-200/80">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-teal-50/85 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-200/80">
              Popular cities
            </p>
            <ul className="mt-4 space-y-2.5">
              {PLAN_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-teal-50/85 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-200/80">
              Support
            </p>
            <ul className="mt-4 space-y-2.5">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-teal-50/85 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-5 inline-flex rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-600"
            >
              Plan with us
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-teal-100/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Browse My Vacations. All rights reserved.</p>
          <p className="text-teal-100/55">Curated holidays across Rajasthan & beyond.</p>
        </div>
      </div>
    </footer>
  );
}
