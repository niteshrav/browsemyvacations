"use client";

import { useEffect, useState } from "react";
import { tourismImageClassName } from "@/lib/tourism-image";

type Props = {
  src: string;
  zoomed?: boolean;
};

export function HeroFlankSwapImage({ src, zoomed = false }: Props) {
  const [shown, setShown] = useState(src);
  const [leaving, setLeaving] = useState<string | null>(null);

  useEffect(() => {
    if (src === shown) return;
    setLeaving(shown);
    setShown(src);
    const timer = setTimeout(() => setLeaving(null), 520);
    return () => clearTimeout(timer);
  }, [src, shown]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {leaving ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={leaving}
          alt=""
          aria-hidden
          className={`${tourismImageClassName()} absolute inset-0 transition-opacity duration-500`}
        />
      ) : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={shown}
        src={shown}
        alt=""
        className={`${tourismImageClassName()} absolute inset-0 transition-transform duration-700 ease-out ${
          leaving ? "hero-image-reveal" : ""
        } ${zoomed ? "scale-110" : "scale-100 group-hover:scale-105"}`}
      />
    </div>
  );
}
