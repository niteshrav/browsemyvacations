"use client";

import { BMV_CONTACT, buildOfficeVisitDescription, buildOfficeVisitHeading } from "@bmv/shared";
import { FormEvent, useEffect, useState } from "react";
import { AdminErrorAlert, AdminSuccessAlert } from "@/components/admin/admin-alerts";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPanel } from "@/components/admin/admin-panel";
import { adminFetch } from "@/lib/admin-auth";
import { adminInputClassName, adminLabelClassName } from "@/lib/admin-ui";

type ContentRow = {
  key: string;
  title: string | null;
  body: string;
};

type ContactFormState = {
  address: string;
  phone: string;
  email: string;
  hours: string;
  website: string;
};

const DEFAULTS: ContactFormState = {
  address: BMV_CONTACT.address,
  phone: BMV_CONTACT.phoneDisplay,
  email: BMV_CONTACT.email,
  hours: BMV_CONTACT.hours,
  website: BMV_CONTACT.websiteDisplay,
};

export default function AdminContactSettingsPage() {
  const [form, setForm] = useState<ContactFormState>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    adminFetch("/admin/content")
      .then(async (res) => {
        if (!res.ok) throw new Error("load failed");
        const rows = (await res.json()) as ContentRow[];
        const byKey = Object.fromEntries(rows.map((row) => [row.key, row.body]));
        setForm({
          address: byKey["settings.contact.address"]?.trim() || DEFAULTS.address,
          phone: byKey["settings.contact.phone"]?.trim() || DEFAULTS.phone,
          email: byKey["settings.contact.email"]?.trim() || DEFAULTS.email,
          hours: byKey["settings.contact.hours"]?.trim() || DEFAULTS.hours,
          website: byKey["settings.contact.website"]?.trim() || DEFAULTS.website,
        });
        setError(null);
      })
      .catch(() => setError("Failed to load contact settings"))
      .finally(() => setLoading(false));
  }, []);

  function patch<K extends keyof ContactFormState>(key: K, value: ContactFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSave(e: FormEvent) {
    e.preventDefault();
    setSaved(false);

    const address = form.address.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();
    const hours = form.hours.trim();
    const website = form.website.trim();

    if (!address || !phone || !email || !hours || !website) {
      setError("All contact fields are required.");
      return;
    }
    if (!email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const payloads = [
        ["settings.contact.address", address],
        ["settings.contact.phone", phone],
        ["settings.contact.email", email],
        ["settings.contact.hours", hours],
        ["settings.contact.website", website],
        // Keep the Visit Us / map copy in sync with Contact Settings address.
        ["contact.map.heading", buildOfficeVisitHeading(address)],
        ["contact.map.description", buildOfficeVisitDescription(address)],
      ] as const;

      const results = await Promise.all(
        payloads.map(([key, body]) =>
          adminFetch(`/admin/content/${encodeURIComponent(key)}`, {
            method: "PATCH",
            body: JSON.stringify({ body }),
          }),
        ),
      );
      if (results.some((res) => !res.ok)) throw new Error("save failed");
      setForm({ address, phone, email, hours, website });
      setSaved(true);
    } catch {
      setError("Failed to save contact settings");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Contact Settings"
        description="Update the address, phone, email, hours, and website shown on the public Contact page. Changes apply without a code deploy."
      />

      {error ? <AdminErrorAlert message={error} /> : null}
      {saved ? <AdminSuccessAlert message="Contact settings saved." /> : null}

      <AdminPanel
        title="Contact page details"
        description="These values power the contact cards, Visit Us copy, and Google Map on /contact."
      >
        {loading ? (
          <p className="text-sm text-stone-500">Loading settings…</p>
        ) : (
          <form onSubmit={onSave} className="max-w-xl space-y-4">
            <div>
              <label htmlFor="contact-address" className={adminLabelClassName()}>
                Office address
              </label>
              <textarea
                id="contact-address"
                value={form.address}
                onChange={(e) => patch("address", e.target.value)}
                rows={3}
                className={adminInputClassName()}
                required
              />
            </div>
            <div>
              <label htmlFor="contact-phone" className={adminLabelClassName()}>
                Phone number
              </label>
              <input
                id="contact-phone"
                value={form.phone}
                onChange={(e) => patch("phone", e.target.value)}
                className={adminInputClassName()}
                placeholder="+91 141 400 1234"
                autoComplete="tel"
                required
              />
            </div>
            <div>
              <label htmlFor="contact-email" className={adminLabelClassName()}>
                Email address
              </label>
              <input
                id="contact-email"
                type="email"
                value={form.email}
                onChange={(e) => patch("email", e.target.value)}
                className={adminInputClassName()}
                placeholder="hello@browsemyvacations.com"
                autoComplete="email"
                required
              />
            </div>
            <div>
              <label htmlFor="contact-hours" className={adminLabelClassName()}>
                Working hours
              </label>
              <input
                id="contact-hours"
                value={form.hours}
                onChange={(e) => patch("hours", e.target.value)}
                className={adminInputClassName()}
                placeholder="Monday – Saturday, 10:00 AM – 7:00 PM IST"
                required
              />
            </div>
            <div>
              <label htmlFor="contact-website" className={adminLabelClassName()}>
                Website
              </label>
              <input
                id="contact-website"
                value={form.website}
                onChange={(e) => patch("website", e.target.value)}
                className={adminInputClassName()}
                placeholder="browsemyvacations.com"
                required
              />
              <p className="mt-1 text-xs text-stone-500">
                Display text or full URL. Cards link to https:// when no protocol is given.
              </p>
            </div>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? "Saving…" : "Save contact settings"}
            </button>
          </form>
        )}
      </AdminPanel>
    </div>
  );
}
