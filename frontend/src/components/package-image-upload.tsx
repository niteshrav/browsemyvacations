"use client";

import { useState } from "react";
import { adminFetch } from "@/lib/admin-auth";

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
    <div className="mt-2">
      <label className="block text-xs text-stone-500">
        Upload image
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={uploading}
          onChange={onChange}
          className="mt-1 block w-full text-xs"
        />
      </label>
      {uploading && <p className="text-xs text-stone-500">Uploading…</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
