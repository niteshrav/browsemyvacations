"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AdminErrorAlert, AdminSuccessAlert } from "@/components/admin/admin-alerts";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPanel } from "@/components/admin/admin-panel";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { PackageImageUpload } from "@/components/package-image-upload";
import { adminFetch } from "@/lib/admin-auth";
import { adminInputClassName, adminLabelClassName } from "@/lib/admin-ui";

type AdminPackage = {
  id: string;
  title: string;
  slug: string;
  active: boolean;
  images: string[];
  shortDescription?: string;
  priceFrom?: string | number;
  durationDays?: number;
  durationNights?: number;
  destinations?: Array<{ destination: { id: string; name: string } }>;
};

type DestinationOption = {
  id: string;
  name: string;
};

export default function AdminPackagesPage() {
  const [items, setItems] = useState<AdminPackage[]>([]);
  const [destinations, setDestinations] = useState<DestinationOption[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<AdminPackage | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    adminFetch("/admin/packages")
      .then(async (res) => {
        if (!res.ok) throw new Error("load failed");
        setItems(await res.json());
        setError(null);
      })
      .catch(() => setError("Failed to load packages"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
    adminFetch("/admin/destinations")
      .then(async (res) => {
        if (!res.ok) return;
        const data = (await res.json()) as Array<{ id: string; name: string }>;
        setDestinations(data.map((d) => ({ id: d.id, name: d.name })));
      })
      .catch(() => {
        // keep package list usable even if destination options fail
      });
  }, [load]);

  async function onCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setCreating(true);

    try {
      const form = new FormData(e.currentTarget);
      const destinationId = String(form.get("destinationId") ?? "");
      const destinationName = destinations.find((d) => d.id === destinationId)?.name ?? "Destination";
      const durationDays = Number(form.get("durationDays") ?? 2);
      const durationNights = Number(form.get("durationNights") ?? Math.max(durationDays - 1, 1));
      const shortDescription = String(form.get("shortDescription") ?? "").trim();

      const payload = {
        title: String(form.get("title") ?? "").trim(),
        slug: String(form.get("slug") ?? "").trim(),
        durationDays,
        durationNights,
        shortDescription,
        priceFrom: Number(form.get("priceFrom") ?? 0),
        destinationIds: [destinationId],
        itineraryDays: [
          {
            dayNumber: 1,
            title: "Arrival and local exploration",
            cities: [destinationName],
            summary: shortDescription,
          },
        ],
      };

      const res = await adminFetch("/admin/packages", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { message?: string };
        throw new Error(err.message ?? "Failed to create package");
      }

      e.currentTarget.reset();
      setSuccess("New package created successfully.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create package");
    } finally {
      setCreating(false);
    }
  }

  async function onSaveEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    const form = new FormData(e.currentTarget);
    const destinationId = String(form.get("destinationId") ?? "");
    const res = await adminFetch(`/admin/packages/${editing.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: String(form.get("title") ?? "").trim(),
        slug: String(form.get("slug") ?? "").trim(),
        shortDescription: String(form.get("shortDescription") ?? "").trim(),
        priceFrom: Number(form.get("priceFrom") ?? 0),
        durationDays: Number(form.get("durationDays") ?? 2),
        durationNights: Number(form.get("durationNights") ?? 1),
        ...(destinationId ? { destinationIds: [destinationId] } : {}),
      }),
    });
    setSaving(false);
    if (!res.ok) {
      setError("Failed to update package");
      return;
    }
    setEditing(null);
    setSuccess("Package updated.");
    await load();
  }

  async function toggleActive(pkg: AdminPackage) {
    setError(null);
    setSuccess(null);
    const res = await adminFetch(`/admin/packages/${pkg.id}`, {
      method: "PATCH",
      body: JSON.stringify({ active: !pkg.active }),
    });
    if (!res.ok) {
      setError("Failed to update package status");
      return;
    }
    setSuccess(pkg.active ? "Package hidden from the website." : "Package published on the website.");
    await load();
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((p) => p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q));
  }, [items, query]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Packages"
        description="Create, edit, hide, and upload images for package cards shown across the website."
      />

      {error ? <AdminErrorAlert message={error} /> : null}
      {success ? <AdminSuccessAlert message={success} /> : null}

      <AdminPanel title="Add new package" description="Create a package, then upload images and refine details.">
        <form onSubmit={onCreate} className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="pkg-title" className={adminLabelClassName()}>
              Title
            </label>
            <input id="pkg-title" name="title" required className={adminInputClassName()} />
          </div>
          <div>
            <label htmlFor="pkg-slug" className={adminLabelClassName()}>
              Slug
            </label>
            <input
              id="pkg-slug"
              name="slug"
              required
              pattern="[a-z0-9-]+"
              placeholder="new-package-slug"
              className={adminInputClassName()}
            />
          </div>
          <div>
            <label htmlFor="pkg-destination" className={adminLabelClassName()}>
              Destination
            </label>
            <select id="pkg-destination" name="destinationId" required className={adminInputClassName()} defaultValue="">
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
          <div>
            <label htmlFor="pkg-price" className={adminLabelClassName()}>
              Price from (INR)
            </label>
            <input id="pkg-price" name="priceFrom" type="number" min={1} required className={adminInputClassName()} />
          </div>
          <div>
            <label htmlFor="pkg-days" className={adminLabelClassName()}>
              Duration days
            </label>
            <input id="pkg-days" name="durationDays" type="number" min={1} defaultValue={2} required className={adminInputClassName()} />
          </div>
          <div>
            <label htmlFor="pkg-nights" className={adminLabelClassName()}>
              Duration nights
            </label>
            <input id="pkg-nights" name="durationNights" type="number" min={0} defaultValue={1} required className={adminInputClassName()} />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="pkg-short-description" className={adminLabelClassName()}>
              Short description
            </label>
            <textarea
              id="pkg-short-description"
              name="shortDescription"
              rows={3}
              required
              className={adminInputClassName()}
            />
          </div>
          <div className="md:col-span-2">
            <button type="submit" disabled={creating} className="btn-primary">
              {creating ? "Creating…" : "Create package"}
            </button>
          </div>
        </form>
      </AdminPanel>

      {editing ? (
        <AdminPanel title={`Edit: ${editing.title}`} description="Update package details shown on the website.">
          <form onSubmit={onSaveEdit} className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={adminLabelClassName()}>Title</label>
              <input name="title" required defaultValue={editing.title} className={adminInputClassName()} />
            </div>
            <div>
              <label className={adminLabelClassName()}>Slug</label>
              <input name="slug" required pattern="[a-z0-9-]+" defaultValue={editing.slug} className={adminInputClassName()} />
            </div>
            <div>
              <label className={adminLabelClassName()}>Destination</label>
              <select
                name="destinationId"
                className={adminInputClassName()}
                defaultValue={editing.destinations?.[0]?.destination.id ?? ""}
              >
                <option value="">Keep current</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={adminLabelClassName()}>Price from (INR)</label>
              <input
                name="priceFrom"
                type="number"
                min={1}
                required
                defaultValue={Number(editing.priceFrom ?? 0)}
                className={adminInputClassName()}
              />
            </div>
            <div>
              <label className={adminLabelClassName()}>Duration days</label>
              <input
                name="durationDays"
                type="number"
                min={1}
                defaultValue={editing.durationDays ?? 2}
                className={adminInputClassName()}
              />
            </div>
            <div>
              <label className={adminLabelClassName()}>Duration nights</label>
              <input
                name="durationNights"
                type="number"
                min={0}
                defaultValue={editing.durationNights ?? 1}
                className={adminInputClassName()}
              />
            </div>
            <div className="md:col-span-2">
              <label className={adminLabelClassName()}>Short description</label>
              <textarea
                name="shortDescription"
                rows={3}
                required
                defaultValue={editing.shortDescription ?? ""}
                className={adminInputClassName()}
              />
            </div>
            <div className="flex flex-wrap gap-2 md:col-span-2">
              <button type="submit" disabled={saving} className="btn-primary">
                {saving ? "Saving…" : "Save changes"}
              </button>
              <button type="button" className="btn-secondary" onClick={() => setEditing(null)}>
                Cancel
              </button>
            </div>
          </form>
        </AdminPanel>
      ) : null}

      <AdminPanel>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="w-full sm:max-w-md">
            <label htmlFor="package-search" className={adminLabelClassName()}>
              Search packages
            </label>
            <input
              id="package-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or slug…"
              className={adminInputClassName()}
            />
          </div>
          <p className="text-sm text-stone-500">
            {filtered.length} of {items.length} packages
          </p>
        </div>

        {loading ? (
          <p className="text-sm text-stone-500">Loading packages…</p>
        ) : filtered.length === 0 ? (
          <AdminEmptyState title="No packages found" description="Try a different search term." />
        ) : (
          <ul className="space-y-4">
            {filtered.map((p) => (
              <li key={p.id} className="rounded-xl border border-stone-200 bg-stone-50/60 p-4 sm:p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link href={`/packages/${p.slug}`} className="font-semibold text-teal-800 hover:underline">
                        {p.title}
                      </Link>
                      <AdminStatusBadge label={p.active ? "Active" : "Inactive"} active={p.active} />
                    </div>
                    <p className="mt-1 text-sm text-stone-500">{p.slug}</p>
                    <p className="mt-2 text-sm text-stone-600">{p.images.length} image(s) uploaded</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button type="button" className="btn-secondary px-3 py-1.5 text-xs" onClick={() => setEditing(p)}>
                        Edit
                      </button>
                      <button type="button" className="btn-secondary px-3 py-1.5 text-xs" onClick={() => toggleActive(p)}>
                        {p.active ? "Delete / Hide" : "Restore"}
                      </button>
                    </div>
                  </div>
                  {p.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.images[0]}
                      alt=""
                      className="h-20 w-28 rounded-lg border border-stone-200 object-cover"
                    />
                  ) : null}
                </div>
                <PackageImageUpload packageId={p.id} onUploaded={load} />
              </li>
            ))}
          </ul>
        )}
      </AdminPanel>
    </div>
  );
}
