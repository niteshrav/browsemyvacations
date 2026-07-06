"use client";

import { useEffect, useState } from "react";
import { TourismImage } from "@/components/tourism-image";
import {
  heroFlankImageClassName,
  heroFlankPanelClassName,
  heroFlankPanelHiddenClassName,
  heroStageClassName,
  shuffleHeroFlankImages,
  type HeroFlankImages,
} from "@/lib/hero-flank-images";
import {
  HERO_FLANK_SHUFFLE_LABEL,
  HERO_FLANK_TOGGLE_HIDE_LABEL,
  HERO_FLANK_TOGGLE_SHOW_LABEL,
  HERO_FLANK_TOGGLE_STORAGE_KEY,
  heroFlankToggleButtonClassName,
  readHeroFlankVisiblePreference,
  serializeHeroFlankVisiblePreference,
} from "@/lib/hero-flank-toggle";

type Props = {
  anchor: string;
  initialImages: HeroFlankImages;
  children: React.ReactNode;
};

type FlankPanelProps = {
  side: "left" | "right";
  images: string[];
  testId: string;
  visible: boolean;
};

function HeroFlankPanel({ side, images, testId, visible }: FlankPanelProps) {
  if (images.length === 0) return null;

  return (
    <aside
      className={visible ? heroFlankPanelClassName(side) : heroFlankPanelHiddenClassName()}
      data-testid={testId}
      aria-hidden={!visible}
    >
      {images.map((src) => (
        <div key={`${side}-${src}`} className={heroFlankImageClassName()}>
          <TourismImage src={src} alt="" />
        </div>
      ))}
    </aside>
  );
}

export function HeroStageClient({ anchor, initialImages, children }: Props) {
  const [visible, setVisible] = useState(true);
  const [images, setImages] = useState(initialImages);
  const [shuffleSalt, setShuffleSalt] = useState(0);

  useEffect(() => {
    const stored = sessionStorage.getItem(HERO_FLANK_TOGGLE_STORAGE_KEY);
    setVisible(readHeroFlankVisiblePreference(stored));
  }, []);

  function toggleVisible() {
    const next = !visible;
    setVisible(next);
    sessionStorage.setItem(HERO_FLANK_TOGGLE_STORAGE_KEY, serializeHeroFlankVisiblePreference(next));
  }

  function shuffleImages() {
    const nextSalt = shuffleSalt + 1;
    setShuffleSalt(nextSalt);
    setImages(shuffleHeroFlankImages(anchor, nextSalt));
    if (!visible) {
      setVisible(true);
      sessionStorage.setItem(HERO_FLANK_TOGGLE_STORAGE_KEY, "1");
    }
  }

  return (
    <div className={heroStageClassName()} data-testid="hero-stage">
      <HeroFlankPanel
        side="left"
        images={images.left}
        testId="hero-flank-left"
        visible={visible}
      />
      <div className="min-w-0 flex-1">
        {children}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            className={heroFlankToggleButtonClassName()}
            onClick={toggleVisible}
            aria-pressed={visible}
            data-testid="hero-flank-toggle"
          >
            {visible ? HERO_FLANK_TOGGLE_HIDE_LABEL : HERO_FLANK_TOGGLE_SHOW_LABEL}
          </button>
          <button
            type="button"
            className={heroFlankToggleButtonClassName()}
            onClick={shuffleImages}
            data-testid="hero-flank-shuffle"
          >
            {HERO_FLANK_SHUFFLE_LABEL}
          </button>
        </div>
      </div>
      <HeroFlankPanel
        side="right"
        images={images.right}
        testId="hero-flank-right"
        visible={visible}
      />
    </div>
  );
}
