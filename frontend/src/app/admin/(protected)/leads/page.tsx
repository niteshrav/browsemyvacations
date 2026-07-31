"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AdminErrorAlert } from "@/components/admin/admin-alerts";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPanel } from "@/components/admin/admin-panel";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { adminFetch } from "@/lib/admin-auth";
import { adminLeadsPipelineNote } from "@/lib/admin-leads-ui";
import { adminInputClassName, type AdminLeadStatus } from "@/lib/admin-ui";

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

const STATUSES: AdminLeadStatus[] = ["new", "contacted", "quoted", "won", "lost"];

export default function AdminLeadsPage() {
  const [items, setItems] = useState<LeadRow[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    const qs = filter ? `?status=${encodeURIComponent(filter)}` : "";
    adminFetch(`/admin/leads${qs}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("load failed");
        setItems(await res.json());
        setError(null);
      })
      .catch(() => setError("Failed to load leads"))
      .finally(() => setLoading(false));
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
    <div className="space-y-6">
      <AdminPageHeader
        title="Leads"
        description={adminLeadsPipelineNote()}
        actions={
          <button type="button" onClick={exportCsv} className="btn-secondary">
            Export CSV
          </button>
        }
      />

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter("")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${!filter ? "bg-teal-700 text-white" : "bg-white text-stone-600 ring-1 ring-stone-200 hover:bg-stone-50"}`}
        >
          All
        </button>
        {STATUSES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition ${filter === s ? "bg-teal-700 text-white" : "bg-white text-stone-600 ring-1 ring-stone-200 hover:bg-stone-50"}`}
          >
            {s}
          </button>
        ))}
      </div>

      {error ? <AdminErrorAlert message={error} /> : null}

      <AdminPanel title="Lead pipeline" description={`${items.length} lead(s) in current view`}>
        {loading ? (
          <p className="text-sm text-stone-500">Loading leads…</p>
        ) : items.length === 0 ? (
          <AdminEmptyState title="No leads yet" description="New quote and contact requests will appear here." />
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((lead) => (
              <li
                key={lead.id}
                className="flex flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <Link
                    href={`/admin/leads/${lead.id}`}
                    className="text-lg font-semibold text-teal-900 hover:underline"
                  >
                    {lead.fullName}
                  </Link>
                  <AdminStatusBadge label={lead.status} />
                </div>

                <dl className="mt-4 space-y-2 text-sm">
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide text-stone-400">Email</dt>
                    <dd className="mt-0.5 break-all text-stone-700">{lead.email}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide text-stone-400">Phone</dt>
                    <dd className="mt-0.5 text-stone-700">{lead.phone}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide text-stone-400">Source</dt>
                    <dd className="mt-0.5 capitalize text-stone-700">{lead.source.replace(/_/g, " ")}</dd>
                  </div>
                  {lead.package ? (
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-wide text-stone-400">Package</dt>
                      <dd className="mt-0.5 text-stone-700">{lead.package.title}</dd>
                    </div>
                  ) : null}
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide text-stone-400">Date & time</dt>
                    <dd className="mt-0.5 text-stone-700">{new Date(lead.createdAt).toLocaleString()}</dd>
                  </div>
                </dl>

                <label className="mt-4 block text-xs font-medium uppercase tracking-wide text-stone-400">
                  Status
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value)}
                    className={adminInputClassName()}
                    aria-label={`Update status for ${lead.fullName}`}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>

                <Link
                  href={`/admin/leads/${lead.id}`}
                  className="mt-4 text-sm font-medium text-teal-800 hover:underline"
                >
                  Open details →
                </Link>
              </li>
            ))}
          </ul>
        )}
      </AdminPanel>
    </div>
  );
}
