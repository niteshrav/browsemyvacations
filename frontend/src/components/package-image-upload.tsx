"use client";

import { useState } from "react";
import { adminFetch } from "@/lib/admin-auth";
import { adminInputClassName } from "@/lib/admin-ui";

type Props = {
  packageId: string;
  onUploaded?: () => void;
};

export function PackageImageUpload({ packageId, onUploaded }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await adminFetch(`/admin/packages/${packageId}/images`, {
        method: "POST",
        body,
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { message?: string };
        throw new Error(data.message ?? "Upload failed");
      }
      onUploaded?.();
      e.target.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="mt-4 rounded-xl border border-dashed border-stone-300 bg-white p-4">
      <label className="block text-sm font-medium text-stone-700">
        Upload package image
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={uploading}
          onChange={onChange}
          className={`${adminInputClassName()} file:mr-3 file:rounded-md file:border-0 file:bg-teal-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-teal-800`}
        />
      </label>
      <p className="mt-2 text-xs text-stone-500">JPEG, PNG, or WebP · max 5MB</p>
      {uploading ? <p className="mt-2 text-xs font-medium text-teal-700">Uploading…</p> : null}
      {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
