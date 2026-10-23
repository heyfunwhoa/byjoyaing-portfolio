import Image from "next/image";
import { CropFrame } from "@/components/crop-frame";

export type BrandAvatarVariant = "leader" | "explorer" | "builder";

/** Shared portrait for About, Work, Explorer, and Builder contexts. */
export const brandAvatarSrc = "/brand/avatar/illustrated-portrait.png";

/** User-approved, homepage-only portrait. */
export const homeBrandAvatarPortrait = {
  src: "/brand/avatar/home-portrait.webp",
  width: 928,
  height: 1152,
} as const;

type BrandAvatarProps = {
  className?: string;
  variant?: BrandAvatarVariant;
  decorative?: boolean;
  portrait?: { src: string; width: number; height: number };
};

/**
 * The shared portrait is the default. The homepage passes its own approved portrait.
 */
export function BrandAvatar({
  className = "",
  variant = "leader",
  decorative = false,
  portrait = { src: brandAvatarSrc, width: 824, height: 1024 },
}: BrandAvatarProps) {
  return (
    <CropFrame>
      <Image
        src={portrait.src}
        alt={decorative ? "" : "Illustrated portrait of Kristen Aing"}
        width={portrait.width}
        height={portrait.height}
        data-avatar-variant={variant}
        className={`aspect-square w-full bg-card object-cover ${className}`}
      />
    </CropFrame>
  );
}
