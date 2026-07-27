"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AdminErrorAlert, AdminSuccessAlert } from "@/components/admin/admin-alerts";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPanel } from "@/components/admin/admin-panel";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import {
  PackageEditorForm,
  emptyPackageForm,
  formValuesToPayload,
  packageToFormValues,
  type PackageFormValues,
} from "@/components/admin/package-editor-form";
import { PackageGalleryManager } from "@/components/admin/package-gallery-manager";
import { adminFetch } from "@/lib/admin-auth";
import { adminInputClassName, adminLabelClassName } from "@/lib/admin-ui";

type AdminPackage = {
  id: string;
  title: string;
  slug: string;
  categorySlug?: string;
  categoryName?: string;
  active: boolean;
  status?: "draft" | "published";
  featured?: boolean;
  popular?: boolean;
  images: string[];
  coverImage?: string | null;
  shortDescription?: string;
  priceFrom?: string | number;
  discountPrice?: string | number | null;
  durationDays?: number;
  durationNights?: number;
  pickupLocation?: string | null;
  dropLocation?: string | null;
  whyBook?: unknown;
  inclusions?: unknown;
  exclusions?: unknown;
  hotelDetails?: string | null;
  mealPlan?: string | null;
  transportDetails?: string | null;
  activities?: unknown;
  cancellationPolicy?: string | null;
  termsAndConditions?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  faq?: unknown;
  destinations?: Array<{ destination: { id: string; name: string; slug?: string } }>;
  itineraryDays?: Array<{
    dayNumber: number;
    title: string;
    cities: unknown;
    summary: string;
  }>;
};

type DestinationOption = { id: string; name: string };

const PAGE_SIZE = 8;

export default function AdminPackagesPage() {
  const [items, setItems] = useState<AdminPackage[]>([]);
  const [destinations, setDestinations] = useState<DestinationOption[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [destinationFilter, setDestinationFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [featuredFilter, setFeaturedFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<AdminPackage | null>(null);
  const [viewing, setViewing] = useState<AdminPackage | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

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
      .catch(() => undefined);
  }, [load]);

  async function onCreate(values: PackageFormValues) {
    setCreating(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await adminFetch("/admin/packages", {
        method: "POST",
        body: JSON.stringify(formValuesToPayload(values)),
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { message?: string };
        throw new Error(err.message ?? "Failed to create package");
      }
      setShowCreate(false);
      setSuccess("Package created. Upload images and publish when ready.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create package");
    } finally {
      setCreating(false);
    }
  }

  async function onSaveEdit(values: PackageFormValues) {
    if (!editing) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await adminFetch(`/admin/packages/${editing.id}`, {
        method: "PATCH",
        body: JSON.stringify(formValuesToPayload(values)),
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { message?: string };
        throw new Error(err.message ?? "Failed to update package");
      }
      setEditing(null);
      setSuccess("Package updated.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update package");
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(pkg: AdminPackage) {
    setBusyId(pkg.id);
    setError(null);
    const res = await adminFetch(`/admin/packages/${pkg.id}`, {
      method: "PATCH",
      body: JSON.stringify({ active: !pkg.active }),
    });
    setBusyId(null);
    if (!res.ok) {
      setError("Failed to update active status");
      return;
    }
    setSuccess(pkg.active ? "Package set inactive." : "Package set active.");
    await load();
  }

  async function setStatus(pkg: AdminPackage, status: "draft" | "published") {
    setBusyId(pkg.id);
    setError(null);
    const res = await adminFetch(`/admin/packages/${pkg.id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    setBusyId(null);
    if (!res.ok) {
      setError("Failed to change publish status");
      return;
    }
    setSuccess(status === "published" ? "Package published." : "Package moved to draft.");
    await load();
  }

  async function duplicatePackage(pkg: AdminPackage) {
    setBusyId(pkg.id);
    setError(null);
    const res = await adminFetch(`/admin/packages/${pkg.id}/duplicate`, { method: "POST" });
    setBusyId(null);
    if (!res.ok) {
      setError("Failed to duplicate package");
      return;
    }
    setSuccess("Package duplicated as draft.");
    await load();
  }

  const categories = useMemo(() => {
    const names = new Set(items.map((p) => p.categoryName || "Custom Packages"));
    return [...names].sort();
  }, [items]);

  const durations = useMemo(() => {
    const values = new Set(
      items.map((p) => `${p.durationNights ?? 0}N/${p.durationDays ?? 0}D`),
    );
    return [...values].sort();
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((p) => {
      if (q && !p.title.toLowerCase().includes(q) && !p.slug.toLowerCase().includes(q)) return false;
      if (categoryFilter !== "all" && (p.categoryName || "Custom Packages") !== categoryFilter) return false;
      if (destinationFilter !== "all") {
        const hasDest = (p.destinations ?? []).some((d) => d.destination.id === destinationFilter);
        if (!hasDest) return false;
      }
      if (durationFilter !== "all") {
        const label = `${p.durationNights ?? 0}N/${p.durationDays ?? 0}D`;
        if (label !== durationFilter) return false;
      }
      if (statusFilter === "draft" && p.status !== "draft") return false;
      if (statusFilter === "published" && p.status !== "published") return false;
      if (statusFilter === "active" && !p.active) return false;
      if (statusFilter === "inactive" && p.active) return false;
      if (featuredFilter === "yes" && !p.featured) return false;
      if (featuredFilter === "no" && p.featured) return false;
      return true;
    });
  }, [items, query, categoryFilter, destinationFilter, durationFilter, statusFilter, featuredFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [query, categoryFilter, destinationFilter, durationFilter, statusFilter, featuredFilter]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Packages"
        description="Full package management — create, edit, duplicate, publish, and manage itineraries & images."
      />

      {error ? <AdminErrorAlert message={error} /> : null}
      {success ? <AdminSuccessAlert message={success} /> : null}

      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn-primary" onClick={() => setShowCreate((v) => !v)}>
          {showCreate ? "Hide create form" : "Add package"}
        </button>
      </div>

      {showCreate ? (
        <AdminPanel title="Add new package" description="Fill all package details. Images can be uploaded after create.">
          <PackageEditorForm
            mode="create"
            destinations={destinations}
            initial={emptyPackageForm(destinations[0]?.id)}
            submitting={creating}
            onSubmit={onCreate}
            onCancel={() => setShowCreate(false)}
          />
        </AdminPanel>
      ) : null}

      {editing ? (
        <AdminPanel title={`Edit: ${editing.title}`} description="Update package content shown on the website.">
          <PackageEditorForm
            mode="edit"
            destinations={destinations}
            initial={packageToFormValues(editing)}
            submitting={saving}
            onSubmit={onSaveEdit}
            onCancel={() => setEditing(null)}
          />
          <PackageGalleryManager
            packageId={editing.id}
            images={Array.isArray(editing.images) ? editing.images : []}
            coverImage={editing.coverImage}
            onChanged={async () => {
              await load();
              const res = await adminFetch(`/admin/packages/${editing.id}`);
              if (res.ok) setEditing(await res.json());
            }}
          />
        </AdminPanel>
      ) : null}

      {viewing ? (
        <AdminPanel title={`Details: ${viewing.title}`} description="Read-only package overview.">
          <div className="grid gap-3 text-sm text-stone-700 md:grid-cols-2">
            <p>
              <span className="font-medium text-stone-900">Slug:</span> {viewing.slug}
            </p>
            <p>
              <span className="font-medium text-stone-900">Category:</span>{" "}
              {viewing.categoryName ?? "Custom Packages"}
            </p>
            <p>
              <span className="font-medium text-stone-900">Duration:</span>{" "}
              {viewing.durationNights ?? 0}N / {viewing.durationDays ?? 0}D
            </p>
            <p>
              <span className="font-medium text-stone-900">Price:</span> ₹{Number(viewing.priceFrom ?? 0)}
              {viewing.discountPrice ? ` (discount ₹${Number(viewing.discountPrice)})` : ""}
            </p>
            <p>
              <span className="font-medium text-stone-900">Status:</span> {viewing.status ?? "published"} /{" "}
              {viewing.active ? "Active" : "Inactive"}
            </p>
            <p>
              <span className="font-medium text-stone-900">Flags:</span>{" "}
              {[viewing.featured ? "Featured" : null, viewing.popular ? "Popular" : null]
                .filter(Boolean)
                .join(", ") || "—"}
            </p>
            <p className="md:col-span-2">
              <span className="font-medium text-stone-900">Destinations:</span>{" "}
              {(viewing.destinations ?? []).map((d) => d.destination.name).join(", ") || "—"}
            </p>
            <p className="md:col-span-2">{viewing.shortDescription}</p>
          </div>
          <div className="mt-4">
            <button type="button" className="btn-secondary" onClick={() => setViewing(null)}>
              Close
            </button>
          </div>
        </AdminPanel>
      ) : null}

      <AdminPanel>
        <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <div className="xl:col-span-2">
            <label htmlFor="package-search" className={adminLabelClassName()}>
              Search by name
            </label>
            <input
              id="package-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Package title or slug…"
              className={adminInputClassName()}
            />
          </div>
          <div>
            <label className={adminLabelClassName()}>Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={adminInputClassName()}
            >
              <option value="all">All</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={adminLabelClassName()}>Destination</label>
            <select
              value={destinationFilter}
              onChange={(e) => setDestinationFilter(e.target.value)}
              className={adminInputClassName()}
            >
              <option value="all">All</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={adminLabelClassName()}>Duration</label>
            <select
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value)}
              className={adminInputClassName()}
            >
              <option value="all">All</option>
              {durations.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={adminLabelClassName()}>Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={adminInputClassName()}
            >
              <option value="all">All</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label className={adminLabelClassName()}>Featured</label>
            <select
              value={featuredFilter}
              onChange={(e) => setFeaturedFilter(e.target.value)}
              className={adminInputClassName()}
            >
              <option value="all">All</option>
              <option value="yes">Featured only</option>
              <option value="no">Not featured</option>
            </select>
          </div>
        </div>

        <p className="mb-4 text-sm text-stone-500">
          {filtered.length} of {items.length} packages · page {page} / {totalPages}
        </p>

        {loading ? (
          <p className="text-sm text-stone-500">Loading packages…</p>
        ) : filtered.length === 0 ? (
          <AdminEmptyState title="No packages found" description="Try different filters or create a new package." />
        ) : (
          <ul className="space-y-4">
            {pageItems.map((p) => {
              const images = Array.isArray(p.images) ? p.images : [];
              const busy = busyId === p.id;
              return (
                <li key={p.id} className="rounded-xl border border-stone-200 bg-stone-50/60 p-4 sm:p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link href={`/packages/${p.slug}`} className="font-semibold text-teal-800 hover:underline">
                          {p.title}
                        </Link>
                        <AdminStatusBadge
                          label={p.status === "draft" ? "Draft" : "Published"}
                          active={p.status !== "draft"}
                        />
                        <AdminStatusBadge label={p.active ? "Active" : "Inactive"} active={p.active} />
                        {p.featured ? <AdminStatusBadge label="Featured" active /> : null}
                        {p.popular ? <AdminStatusBadge label="Popular" active /> : null}
                      </div>
                      <p className="mt-1 text-sm text-stone-500">{p.slug}</p>
                      <p className="mt-1 text-sm text-stone-600">
                        {(p.categoryName ?? "Custom")} · {p.durationNights ?? 0}N/{p.durationDays ?? 0}D · ₹
                        {Number(p.priceFrom ?? 0)} · {images.length} image(s)
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button type="button" className="btn-secondary px-3 py-1.5 text-xs" onClick={() => setViewing(p)}>
                          View
                        </button>
                        <button
                          type="button"
                          className="btn-secondary px-3 py-1.5 text-xs"
                          onClick={() => {
                            setEditing(p);
                            setShowCreate(false);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn-secondary px-3 py-1.5 text-xs"
                          disabled={busy}
                          onClick={() => duplicatePackage(p)}
                        >
                          Duplicate
                        </button>
                        <button
                          type="button"
                          className="btn-secondary px-3 py-1.5 text-xs"
                          disabled={busy}
                          onClick={() => setStatus(p, p.status === "published" ? "draft" : "published")}
                        >
                          {p.status === "published" ? "Unpublish" : "Publish"}
                        </button>
                        <button
                          type="button"
                          className="btn-secondary px-3 py-1.5 text-xs"
                          disabled={busy}
                          onClick={() => toggleActive(p)}
                        >
                          {p.active ? "Deactivate" : "Activate"}
                        </button>
                      </div>
                    </div>
                    {images[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.coverImage || images[0]}
                        alt=""
                        className="h-20 w-28 rounded-lg border border-stone-200 object-cover"
                      />
                    ) : null}
                  </div>
                  <PackageGalleryManager packageId={p.id} images={images} coverImage={p.coverImage} onChanged={load} />
                </li>
              );
            })}
          </ul>
        )}

        {totalPages > 1 ? (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="btn-secondary px-3 py-1.5 text-xs"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </button>
            <span className="text-sm text-stone-500">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              className="btn-secondary px-3 py-1.5 text-xs"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        ) : null}
      </AdminPanel>
    </div>
  );
}
