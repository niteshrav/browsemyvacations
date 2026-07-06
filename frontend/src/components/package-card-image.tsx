"use client";

import { useState } from "react";
import { resolvePackageImage } from "@/lib/package-images";
import type { PackageCard as PackageCardType } from "@/types/catalog";

type Props = {
  pkg: Pick<PackageCardType, "images" | "title" | "slug">;
  alt: string;
};

function ImagePlaceholder({ alt }: { alt: string }) {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-teal-50 via-stone-50 to-stone-100 p-4 text-center"
      role="img"
      aria-label={alt}
    >
      <svg
        aria-hidden
        className="h-10 w-10 text-teal-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
        />
      </svg>
      <span className="text-xs font-medium text-stone-500">Photo unavailable</span>
    </div>
  );
}

export function PackageCardImage({ pkg, alt }: Props) {
  const primary = resolvePackageImage(pkg);
  const fallback = resolvePackageImage({ ...pkg, images: [] });
  const [src, setSrc] = useState(primary);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <ImagePlaceholder alt={alt} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover"
      onError={() => {
        if (src !== fallback) {
          setSrc(fallback);
          return;
        }
        setFailed(true);
      }}
    />
  );
}
