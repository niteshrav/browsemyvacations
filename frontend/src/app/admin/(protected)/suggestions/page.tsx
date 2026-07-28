"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { AdminErrorAlert, AdminSuccessAlert } from "@/components/admin/admin-alerts";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPanel } from "@/components/admin/admin-panel";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { adminFetch } from "@/lib/admin-auth";
import {
  adminInputClassName,
  adminLabelClassName,
  adminTableClassName,
  adminTableHeadClassName,
  adminTableWrapClassName,
} from "@/lib/admin-ui";

type SuggestionRow = {
  id: string;
  label: string;
  type: "destination" | "package";
  action: "filter" | "scroll";
  imageUrl?: string | null;
  displayOrder: number;
  active: boolean;
  destinationId: string | null;
  packageId: string | null;
  destination?: { id: string; name: string; slug: string } | null;
  package?: { id: string; title: string; slug: string } | null;
};

export default function AdminSuggestionsPage() {
  const [items, setItems] = useState<SuggestionRow[]>([]);
  const [destinations, setDestinations] = useState<Array<{ id: string; name: string }>>([]);
  const [packages, setPackages] = useState<Array<{ id: string; title: string }>>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [type, setType] = useState<"destination" | "package">("destination");

  const load = useCallback(() => {
    setLoading(true);
    adminFetch("/admin/suggestions")
      .then(async (res) => {
        if (!res.ok) throw new Error("load failed");
        setItems(await res.json());
        setError(null);
      })
      .catch(() => setError("Failed to load quick picks"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
    adminFetch("/admin/destinations")
      .then(async (res) => {
        if (!res.ok) return;
        setDestinations(await res.json());
      })
      .catch(() => undefined);
    adminFetch("/admin/packages")
      .then(async (res) => {
        if (!res.ok) return;
        const data = (await res.json()) as Array<{ id: string; title: string }>;
        setPackages(data.map((p) => ({ id: p.id, title: p.title })));
      })
      .catch(() => undefined);
  }, [load]);

  async function onCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    setError(null);
    setSuccess(null);
    const form = new FormData(formEl);
    const payload = {
      label: String(form.get("label") ?? "").trim(),
      type,
      action: String(form.get("action") ?? "filter"),
      imageUrl: imageUrl.trim() || null,
      displayOrder: Number(form.get("displayOrder") ?? 0),
      active: true,
      destinationId: type === "destination" ? String(form.get("destinationId") ?? "") : undefined,
      packageId: type === "package" ? String(form.get("packageId") ?? "") : undefined,
    };
    const res = await adminFetch("/admin/suggestions", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      setError("Failed to create quick pick");
      return;
    }
    formEl.reset();
    setImageUrl("");
    setSuccess("Quick pick created.");
    await load();
  }

  async function uploadSuggestionImage(file: File | null) {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await adminFetch("/admin/suggestions/images", { method: "POST", body });
      if (!res.ok) {
        throw new Error("upload failed");
      }
      const data = (await res.json()) as { url: string };
      setImageUrl(data.url);
      setSuccess("Image uploaded. Now create quick pick.");
    } catch {
      setError("Failed to upload image");
    } finally {
      setUploading(false);
    }
  }

  async function toggleActive(row: SuggestionRow) {
    setSuccess(null);
    const res = await adminFetch(`/admin/suggestions/${row.id}`, {
      method: "PATCH",
      body: JSON.stringify({ active: !row.active }),
    });
    if (!res.ok) {
      setError("Failed to update quick pick");
      return;
    }
    setSuccess(row.active ? "Quick pick hidden." : "Quick pick published.");
    await load();
  }

  async function remove(row: SuggestionRow) {
    if (!window.confirm(`Delete quick pick “${row.label}”?`)) return;
    setSuccess(null);
    const res = await adminFetch(`/admin/suggestions/${row.id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Failed to delete quick pick");
      return;
    }
    setSuccess("Quick pick deleted.");
    await load();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Quick Picks"
        description="Manage homepage suggestion chips — add, hide, or delete destinations and packages."
      />

      {error ? <AdminErrorAlert message={error} /> : null}
      {success ? <AdminSuccessAlert message={success} /> : null}

      <div className="grid gap-6 xl:grid-cols-[22rem_1fr]">
        <AdminPanel title="Add quick pick" description="Shown in the homepage suggestion bar.">
          <form onSubmit={onCreate} className="space-y-4">
            <div>
              <label className={adminLabelClassName()}>Label</label>
              <input name="label" required placeholder="Udaipur" className={adminInputClassName()} />
            </div>
            <div>
              <label className={adminLabelClassName()}>Type</label>
              <select
                className={adminInputClassName()}
                value={type}
                onChange={(e) => setType(e.target.value as "destination" | "package")}
              >
                <option value="destination">Destination</option>
                <option value="package">Package</option>
              </select>
            </div>
            {type === "destination" ? (
              <div>
                <label className={adminLabelClassName()}>Destination</label>
                <select name="destinationId" required className={adminInputClassName()} defaultValue="">
                  <option value="" disabled>
                    Select destination
                  </option>
                  {destinations.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label className={adminLabelClassName()}>Package</label>
                <select name="packageId" required className={adminInputClassName()} defaultValue="">
                  <option value="" disabled>
                    Select package
                  </option>
                  {packages.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <label className={adminLabelClassName()}>Quick pick image (file upload)</label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => void uploadSuggestionImage(e.target.files?.[0] ?? null)}
                disabled={uploading}
                className={`${adminInputClassName()} file:mr-3 file:rounded-md file:border-0 file:bg-teal-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-teal-800`}
              />
              <p className="mt-1 text-xs text-stone-500">
                {uploading ? "Uploading..." : "Optional. If not uploaded, default city image will be used."}
              </p>
              {imageUrl ? (
                <div className="mt-2 overflow-hidden rounded-lg border border-stone-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageUrl} alt="Quick pick preview" className="h-20 w-full object-cover" />
                </div>
              ) : null}
            </div>
            <div>
              <label className={adminLabelClassName()}>Action</label>
              <select name="action" className={adminInputClassName()} defaultValue="filter">
                <option value="filter">Filter / search</option>
                <option value="scroll">Scroll to section</option>
              </select>
            </div>
            <div>
              <label className={adminLabelClassName()}>Display order</label>
              <input name="displayOrder" type="number" defaultValue={0} className={adminInputClassName()} />
            </div>
            <button type="submit" className="btn-primary w-full">
              Create quick pick
            </button>
          </form>
        </AdminPanel>

        <AdminPanel title="All quick picks" description={`${items.length} item(s)`}>
          {loading ? (
            <p className="text-sm text-stone-500">Loading…</p>
          ) : items.length === 0 ? (
            <AdminEmptyState title="No quick picks" description="Add your first homepage suggestion." />
          ) : (
            <div className={adminTableWrapClassName()}>
              <table className={adminTableClassName()}>
                <thead className={adminTableHeadClassName()}>
                  <tr>
                    <th className="px-4 py-3">Label</th>
                    <th className="px-4 py-3">Image</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Linked</th>
                    <th className="px-4 py-3">Order</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {items.map((row) => (
                    <tr key={row.id} className="hover:bg-stone-50/80">
                      <td className="px-4 py-3 font-medium text-stone-900">{row.label}</td>
                      <td className="px-4 py-3">
                        {row.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={row.imageUrl} alt="" className="h-10 w-14 rounded border border-stone-200 object-cover" />
                        ) : (
                          <span className="text-xs text-stone-400">Default</span>
                        )}
                      </td>
                      <td className="px-4 py-3 capitalize text-stone-600">{row.type}</td>
                      <td className="px-4 py-3 text-stone-500">
                        {row.destination?.name ?? row.package?.title ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-stone-600">{row.displayOrder}</td>
                      <td className="px-4 py-3">
                        <AdminStatusBadge label={row.active ? "Active" : "Inactive"} active={row.active} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <button type="button" className="btn-secondary px-3 py-1.5 text-xs" onClick={() => toggleActive(row)}>
                            {row.active ? "Hide" : "Show"}
                          </button>
                          <button type="button" className="btn-secondary px-3 py-1.5 text-xs" onClick={() => remove(row)}>
                            Delete
                          </button>
                        </div>
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
