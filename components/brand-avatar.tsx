import Image from "next/image";
import { CropFrame } from "@/components/crop-frame";

export type BrandAvatarVariant = "leader" | "explorer" | "builder";

type BrandAvatarProps = {
  className?: string;
  variant?: BrandAvatarVariant;
  decorative?: boolean;
};

/**
 * Shared illustration until the master character and its variations are approved.
 * Do not reference variant-specific assets before they are committed.
 */
export function BrandAvatar({
  className = "",
  variant = "leader",
  decorative = false,
}: BrandAvatarProps) {
  return (
    <CropFrame>
      <Image
        src="/avatar.png"
        alt={decorative ? "" : "Illustrated portrait of Kristen Joy Aing"}
        width={640}
        height={640}
        data-avatar-variant={variant}
        className={`aspect-square w-full bg-card object-cover ${className}`}
      />
    </CropFrame>
  );
}
