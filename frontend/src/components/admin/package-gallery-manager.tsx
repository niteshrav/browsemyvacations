"use client";

import { useState } from "react";
import { adminFetch } from "@/lib/admin-auth";
import { adminInputClassName, adminLabelClassName } from "@/lib/admin-ui";

type Props = {
  packageId: string;
  images: string[];
  coverImage?: string | null;
  onChanged: () => void;
};

export function PackageGalleryManager({ packageId, images, coverImage, onChanged }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState<string | null>(null);
  const [settingCover, setSettingCover] = useState<string | null>(null);

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      for (const file of files) {
        const body = new FormData();
        body.append("file", file);
        const res = await adminFetch(`/admin/packages/${packageId}/images`, {
          method: "POST",
          body,
        });
        if (!res.ok) {
          const data = (await res.json().catch(() => ({}))) as {
            message?: string | string[];
          };
          const message = Array.isArray(data.message)
            ? data.message.join(", ")
            : data.message;
          throw new Error(message ?? `Upload failed (${res.status})`);
        }
      }
      onChanged();
      e.target.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function removeImage(url: string) {
    setRemoving(url);
    setError(null);
    try {
      const res = await adminFetch(`/admin/packages/${packageId}/images`, {
        method: "DELETE",
        body: JSON.stringify({ url }),
      });
      if (!res.ok) throw new Error("Failed to delete image");
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete image");
    } finally {
      setRemoving(null);
    }
  }

  async function setAsCover(url: string) {
    setSettingCover(url);
    setError(null);
    try {
      const res = await adminFetch(`/admin/packages/${packageId}`, {
        method: "PATCH",
        body: JSON.stringify({ coverImage: url }),
      });
      if (!res.ok) throw new Error("Failed to set cover image");
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to set cover");
    } finally {
      setSettingCover(null);
    }
  }

  return (
    <div className="mt-4 space-y-3 rounded-xl border border-dashed border-stone-300 bg-white p-4">
      <div>
        <label className={adminLabelClassName()}>Cover & gallery images</label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          disabled={uploading}
          onChange={onUpload}
          className={`${adminInputClassName()} file:mr-3 file:rounded-md file:border-0 file:bg-teal-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-teal-800`}
        />
        <p className="mt-1 text-xs text-stone-500">JPEG, PNG, or WebP · max 5MB each · multiple allowed</p>
      </div>
      {uploading ? <p className="text-xs font-medium text-teal-700">Uploading…</p> : null}
      {error ? <p className="text-xs text-red-600">{error}</p> : null}

      {images.length > 0 ? (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((url) => {
            const isCover = coverImage === url || (!coverImage && images[0] === url);
            return (
              <li key={url} className="overflow-hidden rounded-lg border border-stone-200 bg-stone-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="aspect-[4/3] w-full object-cover" />
                <div className="flex flex-wrap items-center gap-2 p-2">
                  {isCover ? (
                    <span className="rounded bg-teal-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-teal-800">
                      Cover
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="text-[11px] font-medium text-teal-800 hover:underline"
                      disabled={settingCover === url}
                      onClick={() => setAsCover(url)}
                    >
                      {settingCover === url ? "Setting…" : "Set cover"}
                    </button>
                  )}
                  <button
                    type="button"
                    className="ml-auto text-[11px] font-medium text-red-600 hover:underline"
                    disabled={removing === url}
                    onClick={() => removeImage(url)}
                  >
                    {removing === url ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-xs text-stone-500">No images yet. Upload a cover and gallery photos.</p>
      )}
    </div>
  );
}
