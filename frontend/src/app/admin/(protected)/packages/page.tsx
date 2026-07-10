"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AdminErrorAlert } from "@/components/admin/admin-alerts";
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
};

type DestinationOption = {
  id: string;
  name: string;
};

export default function AdminPackagesPage() {
  const [items, setItems] = useState<AdminPackage[]>([]);
  const [destinations, setDestinations] = useState<DestinationOption[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [creating, setCreating] = useState(false);
  const [createMessage, setCreateMessage] = useState<string | null>(null);

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
    setCreateMessage(null);
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
      setCreateMessage("New package created successfully.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create package");
    } finally {
      setCreating(false);
    }
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
        description="Upload hero and card images for each package. JPEG, PNG, or WebP up to 5MB."
      />

      {error ? <AdminErrorAlert message={error} /> : null}
      {createMessage ? (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800">
          {createMessage}
        </p>
      ) : null}

      <AdminPanel title="Add new package" description="Create a basic package entry and then upload image/details.">
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
          <p className="text-sm text-stone-500">{filtered.length} of {items.length} packages</p>
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
