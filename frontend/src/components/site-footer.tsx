import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-white py-10">
      <div className="site-container text-center text-sm text-stone-600">
        <p className="font-medium text-stone-800">
          Vacations You&apos;ll Love. Memories You&apos;ll Keep.
        </p>
        <p className="mt-2">
          © {new Date().getFullYear()} Browse My Vacations. All rights reserved.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Link href="/about" className="nav-link">
            About
          </Link>
          <Link href="/contact" className="nav-link">
            Contact
          </Link>
          <Link href="/vacation-meter" className="nav-link">
            Vacation Meter
          </Link>
          <Link href="/privacy" className="nav-link">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
