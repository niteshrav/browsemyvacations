"use client";

import { useState } from "react";
import { resolveTourismImageSrc, tourismImageClassName } from "@/lib/tourism-image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** Prefer for above-the-fold heroes (eager + high fetch priority). */
  priority?: boolean;
};

function TourismImagePlaceholder({ alt }: { alt: string }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center bg-gradient-to-br from-teal-50 via-stone-50 to-stone-100"
      role="img"
      aria-label={alt}
    />
  );
}

export function TourismImage({ src, alt, className, priority = false }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <TourismImagePlaceholder alt={alt} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resolveTourismImageSrc(src)}
      alt={alt}
      className={className ?? tourismImageClassName()}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      onError={() => setFailed(true)}
    />
  );
}
