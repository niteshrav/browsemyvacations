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
import { adminInputClassName, adminTableClassName, adminTableHeadClassName, adminTableWrapClassName, type AdminLeadStatus } from "@/lib/admin-ui";

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
          <div className={adminTableWrapClassName()}>
            <table className={adminTableClassName()}>
              <thead className={adminTableHeadClassName()}>
                <tr>
                  <th className="px-4 py-3">Lead</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Source</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {items.map((lead) => (
                  <tr key={lead.id} className="align-top hover:bg-stone-50/80">
                    <td className="px-4 py-4">
                      <Link href={`/admin/leads/${lead.id}`} className="font-semibold text-teal-800 hover:underline">
                        {lead.fullName}
                      </Link>
                      {lead.package ? (
                        <p className="mt-1 text-xs text-stone-500">{lead.package.title}</p>
                      ) : null}
                      <p className="mt-1 text-xs text-stone-400">{new Date(lead.createdAt).toLocaleString()}</p>
                    </td>
                    <td className="px-4 py-4 text-stone-600">
                      <p>{lead.email}</p>
                      <p className="mt-1">{lead.phone}</p>
                    </td>
                    <td className="px-4 py-4 capitalize text-stone-600">{lead.source.replace(/_/g, " ")}</td>
                    <td className="px-4 py-4">
                      <div className="space-y-2">
                        <AdminStatusBadge label={lead.status} />
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
  );
}
