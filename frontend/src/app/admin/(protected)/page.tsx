"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPanel } from "@/components/admin/admin-panel";
import { adminFetch } from "@/lib/admin-auth";

const QUICK_ACTIONS = [
  {
    title: "Destinations",
    description: "Add, edit, hide, or restore destination sections on the website.",
    href: "/admin/destinations",
  },
  {
    title: "Packages",
    description: "Create packages, edit details, upload images, and publish/hide.",
    href: "/admin/packages",
  },
  {
    title: "Quick Picks",
    description: "Manage homepage suggestion chips linked to destinations or packages.",
    href: "/admin/suggestions",
  },
  {
    title: "Page Content",
    description: "Edit Home, About, Contact, and MICE hero copy from one place.",
    href: "/admin/content",
  },
  {
    title: "Leads",
    description: "Track incoming leads, statuses, and follow-up notes.",
    href: "/admin/leads",
  },
  {
    title: "Vacation Meter",
    description: "Control disclaimer, destination rates, and vehicle multipliers.",
    href: "/admin/meter",
  },
] as const;

type PackageStats = {
  total: number;
  published: number;
  draft: number;
  featured: number;
  recent: Array<{
    id: string;
    title: string;
    slug: string;
    status: string;
    active: boolean;
    featured: boolean;
    updatedAt: string;
  }>;
};

export default function AdminIndexPage() {
  const [stats, setStats] = useState<PackageStats | null>(null);
  const [statsError, setStatsError] = useState<string | null>(null);

  useEffect(() => {
    adminFetch("/admin/packages/stats")
      .then(async (res) => {
        if (!res.ok) throw new Error("failed");
        setStats(await res.json());
      })
      .catch(() => setStatsError("Could not load package stats."));
  }, []);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Super Admin Dashboard"
        description="Manage every public catalog surface and key page content from this panel — add, edit, and delete/hide."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total packages", value: stats?.total },
          { label: "Published", value: stats?.published },
          { label: "Draft", value: stats?.draft },
          { label: "Featured", value: stats?.featured },
        ].map((card) => (
          <div key={card.label} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-stone-500">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold text-teal-900">
              {statsError ? "—" : (card.value ?? "…")}
            </p>
          </div>
        ))}
      </div>

      <AdminPanel title="Recent packages" description="Latest package updates from the catalog.">
        {statsError ? (
          <p className="text-sm text-stone-500">{statsError}</p>
        ) : !stats ? (
          <p className="text-sm text-stone-500">Loading recent packages…</p>
        ) : stats.recent.length === 0 ? (
          <p className="text-sm text-stone-500">No packages yet.</p>
        ) : (
          <ul className="divide-y divide-stone-100">
            {stats.recent.map((pkg) => (
              <li key={pkg.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                <div>
                  <Link href={`/admin/packages`} className="font-medium text-teal-800 hover:underline">
                    {pkg.title}
                  </Link>
                  <p className="text-xs text-stone-500">
                    {pkg.status}
                    {pkg.featured ? " · featured" : ""}
                    {pkg.active ? "" : " · inactive"} · {new Date(pkg.updatedAt).toLocaleString()}
                  </p>
                </div>
                <Link href={`/packages/${pkg.slug}`} className="text-xs text-stone-500 hover:underline">
                  View public
                </Link>
              </li>
            ))}
          </ul>
        )}
      </AdminPanel>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {QUICK_ACTIONS.map((item) => (
          <AdminPanel key={item.href} title={item.title} description={item.description}>
            <Link href={item.href} className="btn-secondary text-sm">
              Open {item.title}
            </Link>
          </AdminPanel>
        ))}
      </div>
    </div>
  );
}
