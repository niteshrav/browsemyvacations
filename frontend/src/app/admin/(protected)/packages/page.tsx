"use client";

import { useCallback, useEffect, useState } from "react";
import { PackageImageUpload } from "@/components/package-image-upload";
import { adminFetch } from "@/lib/admin-auth";

type AdminPackage = {
  id: string;
  title: string;
  slug: string;
  active: boolean;
  images: string[];
};

export default function AdminPackagesPage() {
  const [items, setItems] = useState<AdminPackage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    adminFetch("/admin/packages")
      .then(async (res) => {
        if (!res.ok) throw new Error("load failed");
        setItems(await res.json());
      })
      .catch(() => setError("Failed to load packages"));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Packages</h1>
      <p className="mt-2 text-sm text-stone-600">
        Upload hero/card images for each package (JPEG, PNG, or WebP, max 5MB).
      </p>
      {error && <p className="mt-2 text-red-600">{error}</p>}
      <ul className="mt-8 divide-y rounded-lg border">
        {items.map((p) => (
          <li key={p.id} className="px-4 py-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <a href={`/packages/${p.slug}`} className="font-medium text-teal-800 hover:underline">
                  {p.title}
                </a>
                <p className="text-sm text-stone-500">{p.images.length} image(s)</p>
              </div>
              <span className={p.active ? "text-green-700" : "text-stone-400"}>
                {p.active ? "Active" : "Inactive"}
              </span>
            </div>
            <PackageImageUpload packageId={p.id} onUploaded={load} />
          </li>
        ))}
      </ul>
    </div>
  );
}
