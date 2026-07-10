"use client";

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-t border-stone-200 bg-gradient-to-b from-stone-100/80 to-stone-50">
      <style jsx global>{`
        [data-site-chrome="header"],
        [data-site-chrome="footer"] {
          display: none !important;
        }
      `}</style>
      <div className="site-container flex min-h-[65vh] items-center justify-center py-12">
        <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="mb-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">Admin</p>
            <p className="mt-1 text-lg font-semibold text-stone-900">Browse My Vacations</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
