"use client";

import { BMV_CONTACT, normalizeWhatsAppNumber } from "@bmv/shared";
import { FormEvent, useEffect, useState } from "react";
import { AdminErrorAlert, AdminSuccessAlert } from "@/components/admin/admin-alerts";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPanel } from "@/components/admin/admin-panel";
import { adminFetch } from "@/lib/admin-auth";
import { GENERAL_WHATSAPP_MESSAGE } from "@/lib/whatsapp";
import { adminInputClassName, adminLabelClassName } from "@/lib/admin-ui";

type ContentRow = {
  key: string;
  title: string | null;
  body: string;
};

export default function AdminWhatsAppSettingsPage() {
  const [number, setNumber] = useState<string>(BMV_CONTACT.whatsappDisplay);
  const [message, setMessage] = useState<string>(GENERAL_WHATSAPP_MESSAGE);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    adminFetch("/admin/content")
      .then(async (res) => {
        if (!res.ok) throw new Error("load failed");
        const rows = (await res.json()) as ContentRow[];
        const numberRow = rows.find((r) => r.key === "settings.whatsapp.number");
        const messageRow = rows.find((r) => r.key === "settings.whatsapp.default_message");
        if (numberRow?.body) setNumber(numberRow.body);
        if (messageRow?.body) setMessage(messageRow.body);
        setError(null);
      })
      .catch(() => setError("Failed to load WhatsApp settings"))
      .finally(() => setLoading(false));
  }, []);

  async function onSave(e: FormEvent) {
    e.preventDefault();
    setSaved(false);
    const normalized = normalizeWhatsAppNumber(number);
    if (!normalized) {
      setError("Enter a valid WhatsApp number (10-digit mobile or with country code, e.g. +91…).");
      return;
    }
    if (!message.trim()) {
      setError("Default message cannot be empty.");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const [numRes, msgRes] = await Promise.all([
        adminFetch(`/admin/content/${encodeURIComponent("settings.whatsapp.number")}`, {
          method: "PATCH",
          body: JSON.stringify({ body: normalized }),
        }),
        adminFetch(`/admin/content/${encodeURIComponent("settings.whatsapp.default_message")}`, {
          method: "PATCH",
          body: JSON.stringify({ body: message.trim() }),
        }),
      ]);
      if (!numRes.ok || !msgRes.ok) throw new Error("save failed");
      setNumber(normalized);
      setSaved(true);
    } catch {
      setError("Failed to save WhatsApp settings");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="WhatsApp Settings"
        description="Update the number used by the floating WhatsApp button across the public site. Changes apply without a code deploy."
      />

      {error ? <AdminErrorAlert message={error} /> : null}
      {saved ? <AdminSuccessAlert message="WhatsApp settings saved." /> : null}

      <AdminPanel
        title="Floating button contact"
        description={`Default fallback number: ${BMV_CONTACT.whatsappDisplay} (${BMV_CONTACT.whatsappNumber}).`}
      >
        {loading ? (
          <p className="text-sm text-stone-500">Loading settings…</p>
        ) : (
          <form onSubmit={onSave} className="max-w-xl space-y-4">
            <div>
              <label htmlFor="wa-number" className={adminLabelClassName()}>
                WhatsApp number
              </label>
              <input
                id="wa-number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className={adminInputClassName()}
                placeholder="+91 98765 43210"
                autoComplete="tel"
                required
              />
              <p className="mt-1 text-xs text-stone-500">
                Use country code. Indian 10-digit numbers are saved as 91XXXXXXXXXX for wa.me links.
              </p>
            </div>
            <div>
              <label htmlFor="wa-message" className={adminLabelClassName()}>
                Default message (optional override)
              </label>
              <textarea
                id="wa-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className={adminInputClassName()}
                required
              />
            </div>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? "Saving…" : "Save WhatsApp settings"}
            </button>
          </form>
        )}
      </AdminPanel>
    </div>
  );
}
