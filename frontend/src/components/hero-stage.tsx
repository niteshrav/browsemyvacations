import { getHeroFlankImages } from "@/lib/hero-flank-images";
import { HeroStageClient } from "./hero-stage-client";

type Props = {
  anchor: string;
  children: React.ReactNode;
};

export function HeroStage({ anchor, children }: Props) {
  const initialImages = getHeroFlankImages(anchor);

  return (
    <HeroStageClient anchor={anchor} initialImages={initialImages}>
      {children}
    </HeroStageClient>
  );
}
