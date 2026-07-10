"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AdminErrorAlert } from "@/components/admin/admin-alerts";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPanel } from "@/components/admin/admin-panel";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { adminFetch } from "@/lib/admin-auth";
import { adminInputClassName, adminLabelClassName } from "@/lib/admin-ui";

type LeadDetail = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  status: string;
  source: string;
  message: string | null;
  travelDate: string | null;
  startCity: string | null;
  endCity: string | null;
  persons: number | null;
  rooms: number | null;
  vehiclePreference: string | null;
  createdAt: string;
  package: { title: string; slug: string } | null;
  notes: Array<{ id: string; author: string; content: string; createdAt: string }>;
};

export default function AdminLeadDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [lead, setLead] = useState<LeadDetail | null>(null);
  const [noteAuthor, setNoteAuthor] = useState("Sales");
  const [noteContent, setNoteContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    adminFetch(`/admin/leads/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("load failed");
        setLead(await res.json());
        setError(null);
      })
      .catch(() => setError("Failed to load lead"));
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  async function addNote(e: React.FormEvent) {
    e.preventDefault();
    const res = await adminFetch(`/admin/leads/${id}/notes`, {
      method: "POST",
      body: JSON.stringify({ author: noteAuthor, content: noteContent }),
    });
    if (res.ok) {
      setNoteContent("");
      load();
    }
  }

  if (error) {
    return <AdminErrorAlert message={error} />;
  }

  if (!lead) {
    return <p className="text-sm text-stone-500">Loading lead…</p>;
  }

  const details = [
    { label: "Email", value: lead.email },
    { label: "Phone", value: lead.phone },
    { label: "Source", value: lead.source.replace(/_/g, " ") },
    { label: "Created", value: new Date(lead.createdAt).toLocaleString() },
    lead.travelDate ? { label: "Travel date", value: lead.travelDate.slice(0, 10) } : null,
    lead.startCity ? { label: "Start city", value: lead.startCity } : null,
    lead.endCity ? { label: "End city", value: lead.endCity } : null,
    lead.persons ? { label: "Persons", value: String(lead.persons) } : null,
    lead.rooms ? { label: "Rooms", value: String(lead.rooms) } : null,
    lead.vehiclePreference ? { label: "Vehicle", value: lead.vehiclePreference } : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  return (
    <div className="space-y-6">
      <Link href="/admin/leads" className="inline-flex text-sm font-medium text-teal-700 hover:underline">
        ← Back to leads
      </Link>

      <AdminPageHeader
        title={lead.fullName}
        description="Review inquiry details and add internal follow-up notes."
        actions={<AdminStatusBadge label={lead.status} />}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminPanel title="Contact details">
          <dl className="grid gap-4 sm:grid-cols-2">
            {details.map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">{item.label}</dt>
                <dd className="mt-1 text-sm text-stone-800">{item.value}</dd>
              </div>
            ))}
          </dl>
          {lead.package ? (
            <div className="mt-5 rounded-xl border border-teal-100 bg-teal-50/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">Package</p>
              <Link href={`/packages/${lead.package.slug}`} className="mt-1 inline-block font-medium text-teal-800 hover:underline">
                {lead.package.title}
              </Link>
            </div>
          ) : null}
          {lead.message ? (
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Message</p>
              <p className="mt-2 rounded-xl bg-stone-50 p-4 text-sm leading-relaxed text-stone-700">{lead.message}</p>
            </div>
          ) : null}
        </AdminPanel>

        <AdminPanel title="Internal notes" description="Visible only to your team.">
          <ul className="space-y-3">
            {lead.notes.length === 0 ? (
              <li className="text-sm text-stone-500">No notes yet.</li>
            ) : (
              lead.notes.map((n) => (
                <li key={n.id} className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-stone-900">{n.author}</p>
                    <p className="text-xs text-stone-400">{new Date(n.createdAt).toLocaleString()}</p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-stone-700">{n.content}</p>
                </li>
              ))
            )}
          </ul>

          <form onSubmit={addNote} className="mt-5 space-y-3 border-t border-stone-100 pt-5">
            <div>
              <label htmlFor="note-author" className={adminLabelClassName()}>
                Author
              </label>
              <input
                id="note-author"
                value={noteAuthor}
                onChange={(e) => setNoteAuthor(e.target.value)}
                className={adminInputClassName()}
              />
            </div>
            <div>
              <label htmlFor="note-content" className={adminLabelClassName()}>
                Note
              </label>
              <textarea
                id="note-content"
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                required
                rows={4}
                placeholder="Add follow-up details, quote sent, customer preference…"
                className={adminInputClassName()}
              />
            </div>
            <button type="submit" className="btn-primary">
              Save note
            </button>
          </form>
        </AdminPanel>
      </div>
    </div>
  );
}
