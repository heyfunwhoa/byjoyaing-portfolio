import {
  BrandAvatar,
  type BrandAvatarVariant,
} from "@/components/brand-avatar";
import { OrbitArtwork } from "@/components/orbit-artwork";
import type { OrbitSurface } from "@/lib/orbit-artwork";

type OrbitPortraitProps = {
  surface: OrbitSurface;
  variant?: BrandAvatarVariant;
  decorative?: boolean;
};

/**
 * Transparent orbit around the approved portrait. The portrait stays /avatar.png.
 * The drawing is decoration and does not replace CelestialFrame on the homepage.
 */
export function OrbitPortrait({
  surface,
  variant = "leader",
  decorative = false,
}: OrbitPortraitProps) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[22rem]">
      <OrbitArtwork
        treatment="transparent"
        surface={surface}
        fill
        sizes="(min-width: 1024px) 22rem, 88vw"
      />
      <div className="absolute top-1/2 left-1/2 w-[38%] -translate-x-1/2 -translate-y-1/2">
        <BrandAvatar variant={variant} decorative={decorative} />
      </div>
    </div>
  );
}
