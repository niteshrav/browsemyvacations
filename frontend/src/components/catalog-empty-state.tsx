import Link from "next/link";

type Props = {
  message: string;
  destination?: string;
  apiDown: boolean;
};

export function CatalogEmptyState({ message, destination, apiDown }: Props) {
  return (
    <div className="mt-16 flex flex-col items-center text-center">
      <div className="mb-6 text-7xl select-none" aria-hidden>
        {apiDown ? "🔌" : "🏜️"}
      </div>
      <h2 className="text-xl font-semibold text-stone-800">
        {apiDown ? "Service unavailable" : destination ? "No packages found" : "No packages yet"}
      </h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-500">{message}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {destination && (
          <Link
            href="/packages"
            className="rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
          >
            Browse all packages
          </Link>
        )}
        <Link
          href="/contact"
          className="rounded-lg border border-teal-700 px-5 py-2.5 text-sm font-semibold text-teal-800 transition hover:bg-teal-50"
        >
          Contact us
        </Link>
        <Link
          href="/"
          className="rounded-lg border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-600 transition hover:bg-stone-50"
        >
          Go to home
        </Link>
      </div>
    </div>
  );
}
