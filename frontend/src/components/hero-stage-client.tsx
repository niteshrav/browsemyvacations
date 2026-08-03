"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { HeroFlankSwapImage } from "@/components/hero-flank-swap-image";
import {
  HERO_COLLAGE_COUNT,
  HERO_COLLAGE_ROWS,
  getHeroImagePool,
  heroBackgroundBottomFadeClassName,
  heroBackgroundOverlayClassName,
  heroCollageCanvasClassName,
  heroCollageDecorClassName,
  heroCollageImageClassName,
  heroCollageRowClassName,
  heroCollageTileClassName,
  heroFeaturedImageClassName,
  heroFlankPanelClassName,
  heroHalfBackgroundClassName,
  heroStageClassName,
  pickNextHeroImage,
  type HeroFlankImages,
} from "@/lib/hero-flank-images";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const AUTO_ROTATE_INTERVAL_MS = 4000;

type Props = {
  anchor: string;
  initialImages: HeroFlankImages;
  children: React.ReactNode;
};

function HeroCollageDecor() {
  return (
    <div className={heroCollageDecorClassName()} aria-hidden>
      <span className="absolute left-1/2 top-0 z-0 h-4 w-4 -translate-x-[5.25rem] -translate-y-1 rounded-[3px] bg-teal-700 shadow-sm xl:-translate-x-[5.75rem]" />
      <span className="absolute left-1/2 top-0 z-0 grid translate-x-[3.1rem] -translate-y-1 grid-cols-4 gap-[3px] opacity-90 xl:translate-x-[3.5rem]">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="h-[3px] w-[3px] rounded-full bg-amber-600/90" />
        ))}
      </span>
    </div>
  );
}

function HeroCollagePanel({
  images,
  activeIndex,
  onHoverSlot,
  onPause,
  onResume,
}: {
  images: string[];
  activeIndex: number;
  onHoverSlot: (index: number) => void;
  onPause: () => void;
  onResume: () => void;
}) {
  if (images.length === 0) return null;

  return (
    <aside
      className={heroFlankPanelClassName("left")}
      data-testid="hero-flank-left"
      onMouseLeave={onResume}
      onBlur={onResume}
    >
      <div className={heroCollageCanvasClassName()}>
        <HeroCollageDecor />
        {HERO_COLLAGE_ROWS.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className={heroCollageRowClassName()}>
            {row.map((i) => {
              const src = images[i];
              if (!src) return null;
              return (
                <button
                  key={`collage-${i}`}
                  type="button"
                  className={`${heroCollageTileClassName()} ${heroCollageImageClassName()} cursor-pointer ${
                    i === activeIndex
                      ? "z-20 scale-[1.05] ring-2 ring-teal-800/25 shadow-[0_16px_36px_rgba(15,23,42,0.2)]"
                      : "opacity-95 hover:opacity-100"
                  }`}
                  onMouseEnter={() => {
                    onPause();
                    onHoverSlot(i);
                  }}
                  onFocus={() => {
                    onPause();
                    onHoverSlot(i);
                  }}
                  aria-label={`Browse inspiration image ${i + 1}`}
                  aria-pressed={i === activeIndex}
                >
                  <HeroFlankSwapImage src={src} zoomed={i === activeIndex} />
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </aside>
  );
}

function HeroFullBleedBackground({
  src,
  onPause,
  onResume,
}: {
  src: string;
  onPause: () => void;
  onResume: () => void;
}) {
  if (!src) return null;

  return (
    <div
      className={heroHalfBackgroundClassName()}
      data-testid="hero-flank-right"
      onMouseEnter={onPause}
      onMouseLeave={onResume}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Lake Palace on Lake Pichola in Udaipur, Rajasthan"
        className={heroFeaturedImageClassName()}
        fetchPriority="high"
        loading="eager"
        decoding="async"
      />
      <div className={heroBackgroundOverlayClassName()} />
      <div className={heroBackgroundBottomFadeClassName()} />
    </div>
  );
}

function HeroMobileStrip({
  images,
  activeIndex,
  onHoverSlot,
  onPause,
  onResume,
}: {
  images: string[];
  activeIndex: number;
  onHoverSlot: (index: number) => void;
  onPause: () => void;
  onResume: () => void;
}) {
  if (images.length === 0) return null;

  return (
    <div
      className="mt-8 flex justify-center gap-3 overflow-x-auto px-1 pb-2 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      data-testid="hero-mobile-strip"
      onMouseLeave={onResume}
      onTouchEnd={onResume}
    >
      {images.slice(0, HERO_COLLAGE_COUNT).map((src, i) => (
        <button
          key={`mobile-${i}`}
          type="button"
          className={`group relative h-28 w-24 shrink-0 overflow-hidden rounded-2xl border-2 border-white bg-stone-100 shadow-md ring-1 ring-stone-900/5 transition-all duration-500 sm:h-32 sm:w-28 ${
            i === activeIndex
              ? "z-10 scale-105 shadow-lg ring-2 ring-teal-800/30"
              : "opacity-85 hover:opacity-100 hover:scale-105"
          }`}
          onMouseEnter={() => {
            onPause();
            onHoverSlot(i);
          }}
          onTouchStart={() => {
            onPause();
            onHoverSlot(i);
          }}
          aria-label={`Browse inspiration image ${i + 1}`}
          aria-pressed={i === activeIndex}
        >
          <HeroFlankSwapImage src={src} zoomed={i === activeIndex} />
        </button>
      ))}
    </div>
  );
}

export function HeroStageClient({ anchor, initialImages, children }: Props) {
  const [images, setImages] = useState(initialImages);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slotSalts, setSlotSalts] = useState<Record<string, number>>({});
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const imagePool = useMemo(() => getHeroImagePool(), []);
  const collageCount = Math.max(images.left.length, HERO_COLLAGE_COUNT);
  const mobileImages = images.left;
  const rotateCount = Math.max(collageCount, mobileImages.length, 1);
  const desktopActiveIndex = activeIndex % Math.max(images.left.length, 1);
  const mobileActiveIndex = activeIndex % Math.max(mobileImages.length, 1);
  const featuredSrc = images.right[0] ?? "";

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % rotateCount);
    }, AUTO_ROTATE_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, prefersReducedMotion, rotateCount]);

  function swapCollageImage(index: number) {
    const key = `left-${index}`;
    const nextSalt = (slotSalts[key] ?? 0) + 1;
    setSlotSalts((prev) => ({ ...prev, [key]: nextSalt }));
    setImages((prev) => {
      const current = prev.left[index];
      const next = pickNextHeroImage(imagePool, current, `${anchor}:${key}:${nextSalt}`);
      const updatedLeft = [...prev.left];
      updatedLeft[index] = next;
      return { ...prev, left: updatedLeft };
    });
    setActiveIndex(index);
  }

  return (
    <div className={heroStageClassName()} data-testid="hero-stage">
      <HeroFullBleedBackground
        src={featuredSrc}
        onPause={() => setIsPaused(true)}
        onResume={() => setIsPaused(false)}
      />

      <div className="site-container relative z-10 grid w-full items-start gap-8 pt-4 pb-8 sm:pt-5 sm:pb-10 lg:grid-cols-[minmax(20rem,27rem)_minmax(0,1fr)] lg:gap-10 lg:pt-6 lg:pb-12 xl:grid-cols-[minmax(22rem,30rem)_minmax(0,1fr)] xl:gap-12">
        <HeroCollagePanel
          images={images.left}
          activeIndex={desktopActiveIndex}
          onHoverSlot={swapCollageImage}
          onPause={() => setIsPaused(true)}
          onResume={() => setIsPaused(false)}
        />
        <div className="relative z-10 flex min-w-0 flex-col justify-start pt-1 sm:pt-2 lg:pt-3">
          {children}
          <HeroMobileStrip
            images={mobileImages}
            activeIndex={mobileActiveIndex}
            onHoverSlot={swapCollageImage}
            onPause={() => setIsPaused(true)}
            onResume={() => setIsPaused(false)}
          />
        </div>
      </div>
    </div>
  );
}
