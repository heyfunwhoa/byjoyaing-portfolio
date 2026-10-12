import Image from "next/image";
import { CropFrame } from "@/components/crop-frame";

export type BrandAvatarVariant = "leader" | "explorer" | "builder";

/** One shared portrait for every variant until separate exports are approved. */
export const brandAvatarSrc = "/brand/avatar/illustrated-portrait.png";

type BrandAvatarProps = {
  className?: string;
  variant?: BrandAvatarVariant;
  decorative?: boolean;
};

/**
 * Shared illustration for Leader, Explorer, and Builder until separate files are approved.
 */
export function BrandAvatar({
  className = "",
  variant = "leader",
  decorative = false,
}: BrandAvatarProps) {
  return (
    <CropFrame>
      <Image
        src={brandAvatarSrc}
        alt={decorative ? "" : "Illustrated portrait of Kristen Aing"}
        width={824}
        height={1024}
        data-avatar-variant={variant}
        className={`aspect-square w-full bg-card object-cover ${className}`}
      />
    </CropFrame>
  );
}
