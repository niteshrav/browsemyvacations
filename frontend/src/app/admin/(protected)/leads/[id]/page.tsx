"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-auth";

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

  if (error) return <p className="text-red-600">{error}</p>;
  if (!lead) return <p className="text-stone-600">Loading…</p>;

  return (
    <div>
      <Link href="/admin/leads" className="text-sm text-teal-700 hover:underline">
        ← All leads
      </Link>
      <h1 className="mt-4 text-2xl font-bold">{lead.fullName}</h1>
      <p className="mt-1 capitalize text-stone-600">
        {lead.status} · {lead.source}
      </p>

      <dl className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-medium text-stone-500">Email</dt>
          <dd>{lead.email}</dd>
        </div>
        <div>
          <dt className="font-medium text-stone-500">Phone</dt>
          <dd>{lead.phone}</dd>
        </div>
        {lead.package && (
          <div className="sm:col-span-2">
            <dt className="font-medium text-stone-500">Package</dt>
            <dd>
              <a href={`/packages/${lead.package.slug}`} className="text-teal-800 hover:underline">
                {lead.package.title}
              </a>
            </dd>
          </div>
        )}
        {lead.travelDate && (
          <div>
            <dt className="font-medium text-stone-500">Travel date</dt>
            <dd>{lead.travelDate.slice(0, 10)}</dd>
          </div>
        )}
        {lead.message && (
          <div className="sm:col-span-2">
            <dt className="font-medium text-stone-500">Message</dt>
            <dd>{lead.message}</dd>
          </div>
        )}
      </dl>

      <section className="mt-10">
        <h2 className="font-semibold">Internal notes</h2>
        <ul className="mt-4 space-y-3">
          {lead.notes.map((n) => (
            <li key={n.id} className="rounded border border-stone-200 p-3 text-sm">
              <p className="font-medium">{n.author}</p>
              <p className="mt-1 text-stone-700">{n.content}</p>
              <p className="mt-1 text-xs text-stone-400">{new Date(n.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
        <form onSubmit={addNote} className="mt-4 space-y-2">
          <input
            value={noteAuthor}
            onChange={(e) => setNoteAuthor(e.target.value)}
            className="w-full rounded border px-3 py-2 text-sm"
            placeholder="Author"
          />
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            required
            rows={3}
            className="w-full rounded border px-3 py-2 text-sm"
            placeholder="Add a note…"
          />
          <button type="submit" className="rounded-lg bg-teal-700 px-4 py-2 text-sm text-white">
            Save note
          </button>
        </form>
      </section>
    </div>
  );
}
