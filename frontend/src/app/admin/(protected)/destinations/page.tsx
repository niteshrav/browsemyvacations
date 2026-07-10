"use client";

import { FormEvent, useEffect, useState } from "react";
import { AdminErrorAlert } from "@/components/admin/admin-alerts";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPanel } from "@/components/admin/admin-panel";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { adminFetch } from "@/lib/admin-auth";
import { adminInputClassName, adminLabelClassName, adminTableClassName, adminTableHeadClassName, adminTableWrapClassName } from "@/lib/admin-ui";
import type { Destination } from "@/types/catalog";

export default function AdminDestinationsPage() {
  const [items, setItems] = useState<Destination[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await adminFetch("/admin/destinations");
    if (!res.ok) {
      setError("Failed to load destinations");
      setLoading(false);
      return;
    }
    setItems(await res.json());
    setError(null);
    setLoading(false);
  }

  useEffect(() => {
    load().catch(() => {
      setError("Failed to load");
      setLoading(false);
    });
  }, []);

  async function onCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await adminFetch("/admin/destinations", {
      method: "POST",
      body: JSON.stringify({
        name: String(form.get("name")),
        slug: String(form.get("slug")),
        displayOrder: Number(form.get("displayOrder") ?? 0),
        active: true,
      }),
    });
    if (!res.ok) {
      setError("Create failed");
      return;
    }
    e.currentTarget.reset();
    await load();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Destinations"
        description="Manage Rajasthan cities shown in search, packages, and quick picks."
      />

      {error ? <AdminErrorAlert message={error} /> : null}

      <div className="grid gap-6 xl:grid-cols-[22rem_1fr]">
        <AdminPanel title="Add destination" description="Create a new destination for the catalog.">
          <form onSubmit={onCreate} className="space-y-4">
            <div>
              <label htmlFor="dest-name" className={adminLabelClassName()}>
                Name
              </label>
              <input id="dest-name" name="name" required placeholder="Jaipur" className={adminInputClassName()} />
            </div>
            <div>
              <label htmlFor="dest-slug" className={adminLabelClassName()}>
                Slug
              </label>
              <input
                id="dest-slug"
                name="slug"
                required
                pattern="[a-z0-9-]+"
                placeholder="jaipur"
                className={adminInputClassName()}
              />
            </div>
            <div>
              <label htmlFor="dest-order" className={adminLabelClassName()}>
                Display order
              </label>
              <input id="dest-order" name="displayOrder" type="number" defaultValue={0} className={adminInputClassName()} />
            </div>
            <button type="submit" className="btn-primary w-full">
              Create destination
            </button>
          </form>
        </AdminPanel>

        <AdminPanel title="All destinations" description={`${items.length} destination(s) in catalog`}>
          {loading ? (
            <p className="text-sm text-stone-500">Loading destinations…</p>
          ) : items.length === 0 ? (
            <AdminEmptyState title="No destinations yet" description="Add your first destination using the form." />
          ) : (
            <div className={adminTableWrapClassName()}>
              <table className={adminTableClassName()}>
                <thead className={adminTableHeadClassName()}>
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Slug</th>
                    <th className="px-4 py-3">Order</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {items.map((d) => (
                    <tr key={d.id} className="hover:bg-stone-50/80">
                      <td className="px-4 py-3 font-medium text-stone-900">{d.name}</td>
                      <td className="px-4 py-3 text-stone-500">{d.slug}</td>
                      <td className="px-4 py-3 text-stone-600">{d.displayOrder}</td>
                      <td className="px-4 py-3">
                        <AdminStatusBadge label={d.active ? "Active" : "Inactive"} active={d.active} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </AdminPanel>
      </div>
    </div>
  );
}
