import { CropFrame } from "@/components/crop-frame";

export function BrandAvatar({
  className = "",
}: {
  className?: string;
}) {
  return (
    <CropFrame>
        <img
          src="/avatar.png"
          alt="Illustrated portrait of Kristen Joy Aing"
          width={640}
          height={640}
          className={`aspect-square w-full bg-card object-cover ${className}`}
        />
    </CropFrame>
  );
}
