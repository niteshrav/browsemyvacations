"use client";

import { FormEvent, useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-auth";
import type { Destination } from "@/types/catalog";

export default function AdminDestinationsPage() {
  const [items, setItems] = useState<Destination[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const res = await adminFetch("/admin/destinations");
    if (!res.ok) {
      setError("Failed to load destinations");
      return;
    }
    setItems(await res.json());
  }

  useEffect(() => {
    load().catch(() => setError("Failed to load"));
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
    <div>
      <h1 className="text-2xl font-bold">Destinations</h1>
      {error && <p className="mt-2 text-red-600">{error}</p>}

      <form onSubmit={onCreate} className="mt-8 grid max-w-lg gap-3 rounded-lg border p-4">
        <h2 className="font-semibold">Add destination</h2>
        <input name="name" placeholder="Name" required className="rounded border px-3 py-2" />
        <input name="slug" placeholder="slug" required pattern="[a-z0-9-]+" className="rounded border px-3 py-2" />
        <input name="displayOrder" type="number" defaultValue={0} className="rounded border px-3 py-2" />
        <button type="submit" className="rounded bg-teal-700 py-2 text-white">
          Create
        </button>
      </form>

      <ul className="mt-8 divide-y rounded-lg border">
        {items.map((d) => (
          <li key={d.id} className="flex justify-between px-4 py-3">
            <span>
              {d.name} <span className="text-stone-500">({d.slug})</span>
            </span>
            <span className={d.active ? "text-green-700" : "text-stone-400"}>
              {d.active ? "Active" : "Inactive"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
