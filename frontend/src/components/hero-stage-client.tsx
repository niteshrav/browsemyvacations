"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { HeroFlankSwapImage } from "@/components/hero-flank-swap-image";
import {
  HERO_COLLAGE_COUNT,
  getHeroImagePool,
  heroCollageImageClassName,
  heroFlankImageOffsetClassName,
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
      <div className="grid grid-cols-2 gap-2 xl:gap-2.5">
        {images.map((src, i) => (
          <button
            key={`collage-${i}`}
            type="button"
            className={`${heroCollageImageClassName()} ${heroFlankImageOffsetClassName(i, "left")} cursor-pointer ${
              i === activeIndex
                ? "z-10 scale-[1.02] ring-1 ring-teal-800/25 shadow-[0_12px_28px_rgba(28,25,23,0.16)]"
                : "opacity-90 hover:opacity-100"
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
        ))}
      </div>
    </aside>
  );
}

function HeroFeaturedPanel({
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
    <aside
      className={heroHalfBackgroundClassName()}
      data-testid="hero-flank-right"
      onMouseEnter={onPause}
      onMouseLeave={onResume}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Lake palace destination inspiration"
        className="absolute inset-0 h-full w-full object-cover object-[58%_38%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-teal-950/25 via-transparent to-transparent" />
    </aside>
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
      className="mt-6 flex justify-center gap-3 overflow-x-auto px-2 pb-2 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      data-testid="hero-mobile-strip"
      onMouseLeave={onResume}
      onTouchEnd={onResume}
    >
      {images.slice(0, 8).map((src, i) => (
        <button
          key={`mobile-${i}`}
          type="button"
          className={`group relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-stone-200/80 shadow-md transition-all duration-500 ${
            i === activeIndex ? "scale-105 ring-2 ring-teal-800/30 shadow-lg" : "opacity-75"
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
      {/* collage | text (clean) | short right photo — image never under copy */}
      <div className="site-container relative z-10 grid w-full items-center gap-6 py-12 sm:py-14 lg:grid-cols-[minmax(9rem,12rem)_minmax(0,1fr)_minmax(15rem,22rem)] lg:gap-8 lg:py-16 xl:grid-cols-[minmax(10rem,13.5rem)_minmax(0,1fr)_minmax(17rem,24rem)] xl:gap-10">
        <HeroCollagePanel
          images={images.left}
          activeIndex={desktopActiveIndex}
          onHoverSlot={swapCollageImage}
          onPause={() => setIsPaused(true)}
          onResume={() => setIsPaused(false)}
        />
        <div className="relative flex min-w-0 flex-col justify-center">
          {children}
          <HeroMobileStrip
            images={mobileImages}
            activeIndex={mobileActiveIndex}
            onHoverSlot={swapCollageImage}
            onPause={() => setIsPaused(true)}
            onResume={() => setIsPaused(false)}
          />
          {featuredSrc ? (
            <div
              className="relative mt-8 min-h-[16rem] overflow-hidden rounded-2xl lg:hidden"
              data-testid="hero-flank-right-mobile"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featuredSrc}
                alt="Lake palace destination inspiration"
                className="absolute inset-0 h-full w-full object-cover object-[55%_40%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-950/35 via-transparent to-transparent" />
            </div>
          ) : null}
        </div>
        <HeroFeaturedPanel
          src={featuredSrc}
          onPause={() => setIsPaused(true)}
          onResume={() => setIsPaused(false)}
        />
      </div>
    </div>
  );
}
