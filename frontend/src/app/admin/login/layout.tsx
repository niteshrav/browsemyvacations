"use client";

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-container flex min-h-[60vh] items-center justify-center py-12">
      <div className="w-full max-w-md rounded-xl border border-stone-200 bg-white p-8 shadow-sm">
        {children}
      </div>
    </div>
  );
}
