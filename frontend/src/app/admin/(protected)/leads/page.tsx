"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-auth";
import { adminLeadsPipelineNote } from "@/lib/admin-leads-ui";

type LeadRow = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  status: string;
  source: string;
  createdAt: string;
  package: { title: string; slug: string } | null;
};

const STATUSES = ["new", "contacted", "quoted", "won", "lost"] as const;

export default function AdminLeadsPage() {
  const [items, setItems] = useState<LeadRow[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    const qs = filter ? `?status=${encodeURIComponent(filter)}` : "";
    adminFetch(`/admin/leads${qs}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("load failed");
        setItems(await res.json());
      })
      .catch(() => setError("Failed to load leads"));
  }, [filter]);

  useEffect(() => {
    load();
  }, [load]);

  async function updateStatus(id: string, status: string) {
    const res = await adminFetch(`/admin/leads/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    if (res.ok) load();
  }

  async function exportCsv() {
    const res = await adminFetch("/admin/leads/export");
    if (!res.ok) return;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Leads</h1>
        <button
          type="button"
          onClick={exportCsv}
          className="rounded-lg border border-teal-700 px-4 py-2 text-sm font-medium text-teal-800 hover:bg-teal-50"
        >
          Export CSV
        </button>
      </div>

      <p className="mt-2 text-sm text-stone-600">{adminLeadsPipelineNote()}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter("")}
          className={`rounded-full px-3 py-1 text-sm ${!filter ? "bg-teal-700 text-white" : "bg-stone-100"}`}
        >
          All
        </button>
        {STATUSES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={`rounded-full px-3 py-1 text-sm capitalize ${filter === s ? "bg-teal-700 text-white" : "bg-stone-100"}`}
          >
            {s}
          </button>
        ))}
      </div>

      {error && <p className="mt-2 text-red-600">{error}</p>}

      <ul className="mt-8 divide-y rounded-lg border">
        {items.map((lead) => (
          <li key={lead.id} className="px-4 py-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <Link href={`/admin/leads/${lead.id}`} className="font-medium text-teal-800 hover:underline">
                  {lead.fullName}
                </Link>
                <p className="text-sm text-stone-600">
                  {lead.email} · {lead.phone}
                </p>
                <p className="text-sm text-stone-500">
                  {lead.source}
                  {lead.package ? ` · ${lead.package.title}` : ""} ·{" "}
                  {new Date(lead.createdAt).toLocaleString()}
                </p>
              </div>
              <select
                value={lead.status}
                onChange={(e) => updateStatus(lead.id, e.target.value)}
                className="rounded border border-stone-300 px-2 py-1 text-sm capitalize"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </li>
        ))}
      </ul>
      {items.length === 0 && !error && (
        <p className="mt-8 text-center text-stone-500">No leads yet.</p>
      )}
    </div>
  );
}
