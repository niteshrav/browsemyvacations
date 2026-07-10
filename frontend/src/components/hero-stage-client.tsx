"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { HeroFlankSwapImage } from "@/components/hero-flank-swap-image";
import {
  HERO_FLANK_IMAGE_COUNT_PER_SIDE,
  getHeroImagePool,
  heroFlankImageClassName,
  heroFlankImageOffsetClassName,
  heroFlankPanelClassName,
  heroStageClassName,
  pickNextHeroImage,
  type HeroFlankImages,
} from "@/lib/hero-flank-images";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const AUTO_ROTATE_INTERVAL_MS = 4000;

type FlankSide = "left" | "right";

type Props = {
  anchor: string;
  initialImages: HeroFlankImages;
  children: React.ReactNode;
};

type FlankPanelProps = {
  side: FlankSide;
  images: string[];
  testId: string;
  activeIndex: number;
  onHoverSlot: (side: FlankSide, index: number) => void;
  onPause: () => void;
  onResume: () => void;
};

function HeroFlankPanel({
  side,
  images,
  testId,
  activeIndex,
  onHoverSlot,
  onPause,
  onResume,
}: FlankPanelProps) {
  if (images.length === 0) return null;

  return (
    <aside
      className={heroFlankPanelClassName(side)}
      data-testid={testId}
      onMouseLeave={onResume}
      onBlur={onResume}
    >
      {images.map((src, i) => (
        <button
          key={`${side}-${i}`}
          type="button"
          className={`${heroFlankImageClassName()} ${heroFlankImageOffsetClassName(i, side)} cursor-pointer transition-all duration-500 ${
            i === activeIndex
              ? "z-10 scale-[1.04] ring-2 ring-teal-300/70 shadow-xl"
              : "opacity-85 hover:opacity-100"
          }`}
          onMouseEnter={() => {
            onPause();
            onHoverSlot(side, i);
          }}
          onFocus={() => {
            onPause();
            onHoverSlot(side, i);
          }}
          aria-label={`Browse ${side} inspiration image ${i + 1}`}
          aria-pressed={i === activeIndex}
        >
          <HeroFlankSwapImage src={src} zoomed={i === activeIndex} />
        </button>
      ))}
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
      {images.map((src, i) => (
        <button
          key={`mobile-${i}`}
          type="button"
          className={`group relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-stone-200/80 shadow-md transition-all duration-500 ${
            i === activeIndex
              ? "scale-105 ring-2 ring-teal-300/60 shadow-lg"
              : "opacity-75"
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
  const imageCount = HERO_FLANK_IMAGE_COUNT_PER_SIDE;
  const mobileImages = [...new Set([...images.left, ...images.right])];
  const rotateCount = Math.max(imageCount, mobileImages.length);
  const desktopActiveIndex = activeIndex % imageCount;
  const mobileActiveIndex = activeIndex % Math.max(mobileImages.length, 1);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % rotateCount);
    }, AUTO_ROTATE_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, prefersReducedMotion, rotateCount]);

  function slotKey(side: FlankSide | "mobile", index: number) {
    return `${side}-${index}`;
  }

  function swapSlotImage(side: FlankSide, index: number) {
    const key = slotKey(side, index);
    const nextSalt = (slotSalts[key] ?? 0) + 1;
    setSlotSalts((prev) => ({ ...prev, [key]: nextSalt }));
    setImages((prev) => {
      const current = prev[side][index];
      const next = pickNextHeroImage(imagePool, current, `${anchor}:${key}:${nextSalt}`);
      const updatedSide = [...prev[side]];
      updatedSide[index] = next;
      return { ...prev, [side]: updatedSide };
    });
    setActiveIndex(index);
  }

  function swapMobileImage(index: number) {
    const key = slotKey("mobile", index);
    const nextSalt = (slotSalts[key] ?? 0) + 1;
    setSlotSalts((prev) => ({ ...prev, [key]: nextSalt }));
    const current = mobileImages[index];
    const next = pickNextHeroImage(imagePool, current, `${anchor}:${key}:${nextSalt}`);
    setImages((prev) => {
      const leftIndex = prev.left.indexOf(current);
      const rightIndex = prev.right.indexOf(current);
      const nextImages = { ...prev, left: [...prev.left], right: [...prev.right] };
      if (leftIndex >= 0) nextImages.left[leftIndex] = next;
      if (rightIndex >= 0) nextImages.right[rightIndex] = next;
      if (leftIndex < 0 && rightIndex < 0) {
        const targetSide = index % 2 === 0 ? "left" : "right";
        const targetIndex = Math.floor(index / 2) % imageCount;
        nextImages[targetSide][targetIndex] = next;
      }
      return nextImages;
    });
    setActiveIndex(index);
  }

  return (
    <div className={heroStageClassName()} data-testid="hero-stage">
      <HeroFlankPanel
        side="left"
        images={images.left}
        testId="hero-flank-left"
        activeIndex={desktopActiveIndex}
        onHoverSlot={swapSlotImage}
        onPause={() => setIsPaused(true)}
        onResume={() => setIsPaused(false)}
      />
      <div className="min-w-0 flex-1">
        {children}
        <HeroMobileStrip
          images={mobileImages}
          activeIndex={mobileActiveIndex}
          onHoverSlot={swapMobileImage}
          onPause={() => setIsPaused(true)}
          onResume={() => setIsPaused(false)}
        />
      </div>
      <HeroFlankPanel
        side="right"
        images={images.right}
        testId="hero-flank-right"
        activeIndex={desktopActiveIndex}
        onHoverSlot={swapSlotImage}
        onPause={() => setIsPaused(true)}
        onResume={() => setIsPaused(false)}
      />
    </div>
  );
}
