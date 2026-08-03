"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { SITE_CONTENT_DEFAULTS, type SiteContentKey } from "@bmv/shared";
import { AdminErrorAlert, AdminSuccessAlert } from "@/components/admin/admin-alerts";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPanel } from "@/components/admin/admin-panel";
import { adminFetch } from "@/lib/admin-auth";
import { adminInputClassName, adminLabelClassName } from "@/lib/admin-ui";

type ContentRow = {
  id: string;
  key: SiteContentKey;
  title: string | null;
  body: string;
  updatedAt: string;
};

const PAGE_GROUPS = [
  {
    id: "home",
    title: "Home page",
    keys: ["home.hero.headline_primary", "home.hero.headline_accent", "home.hero.support"] as SiteContentKey[],
  },
  {
    id: "about",
    title: "About page",
    keys: ["about.hero.heading", "about.hero.description"] as SiteContentKey[],
  },
  {
    id: "contact",
    title: "Contact page",
    keys: [
      "contact.hero.heading",
      "contact.hero.description",
      "contact.map.eyebrow",
      "contact.map.heading",
      "contact.map.description",
    ] as SiteContentKey[],
  },
  {
    id: "mice",
    title: "MICE page",
    keys: ["mice.hero.heading", "mice.hero.description"] as SiteContentKey[],
  },
] as const;

export default function AdminContentPage() {
  const [items, setItems] = useState<ContentRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    adminFetch("/admin/content")
      .then(async (res) => {
        if (!res.ok) throw new Error("load failed");
        setItems(await res.json());
        setError(null);
      })
      .catch(() => setError("Failed to load page content"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function rowFor(key: SiteContentKey): ContentRow | undefined {
    return items.find((item) => item.key === key);
  }

  async function onSave(e: FormEvent<HTMLFormElement>, key: SiteContentKey) {
    e.preventDefault();
    setSavingKey(key);
    setSuccess(null);
    const form = new FormData(e.currentTarget);
    const body = String(form.get("body") ?? "").trim();
    const res = await adminFetch(`/admin/content/${encodeURIComponent(key)}`, {
      method: "PATCH",
      body: JSON.stringify({ body }),
    });
    setSavingKey(null);
    if (!res.ok) {
      setError(`Failed to save ${key}`);
      return;
    }
    setSuccess(`${SITE_CONTENT_DEFAULTS[key].title} updated.`);
    await load();
  }

  async function onReset(key: SiteContentKey) {
    setSuccess(null);
    const res = await adminFetch(`/admin/content/${encodeURIComponent(key)}/reset`, { method: "POST" });
    if (!res.ok) {
      setError(`Failed to reset ${key}`);
      return;
    }
    setSuccess(`${SITE_CONTENT_DEFAULTS[key].title} reset to default.`);
    await load();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Page Content"
        description="Edit hero copy for Home, About, Contact, and MICE. Catalog pages are managed under Destinations, Packages, and Quick Picks."
      />

      {error ? <AdminErrorAlert message={error} /> : null}
      {success ? <AdminSuccessAlert message={success} /> : null}

      {loading ? (
        <p className="text-sm text-stone-500">Loading page content…</p>
      ) : (
        PAGE_GROUPS.map((group) => (
          <AdminPanel key={group.id} title={group.title} description={`Editable fields for /${group.id === "home" ? "" : group.id}`}>
            <div className="space-y-5">
              {group.keys.map((key) => {
                const row = rowFor(key);
                const meta = SITE_CONTENT_DEFAULTS[key];
                return (
                  <form key={key} onSubmit={(e) => onSave(e, key)} className="rounded-xl border border-stone-200 bg-stone-50/50 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-stone-900">{meta.title}</p>
                        <p className="mt-0.5 font-mono text-xs text-stone-400">{key}</p>
                      </div>
                      <button type="button" className="btn-secondary px-3 py-1.5 text-xs" onClick={() => onReset(key)}>
                        Reset default
                      </button>
                    </div>
                    <label className={`${adminLabelClassName()} mt-3`}>Content</label>
                    <textarea
                      name="body"
                      rows={key.includes("description") || key.includes("support") ? 4 : 2}
                      required
                      defaultValue={row?.body ?? meta.body}
                      key={`${key}-${row?.updatedAt ?? "new"}`}
                      className={adminInputClassName()}
                    />
                    <button type="submit" disabled={savingKey === key} className="btn-primary mt-3">
                      {savingKey === key ? "Saving…" : "Save"}
                    </button>
                  </form>
                );
              })}
            </div>
          </AdminPanel>
        ))
      )}
    </div>
  );
}
