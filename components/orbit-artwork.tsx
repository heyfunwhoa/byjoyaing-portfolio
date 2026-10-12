import Image from "next/image";
import {
  orbitArtFor,
  type OrbitSurface,
  type OrbitTreatment,
} from "@/lib/orbit-artwork";

type OrbitArtworkProps = {
  className?: string;
  sizes?: string;
  /** Fill a positioned parent. The parent reserves the box so the image does not shift layout. */
  fill?: boolean;
} & (
  | { treatment: "transparent"; surface: OrbitSurface }
  | { treatment: "charcoal"; surface: "charcoal" }
);

/**
 * Decorative orbit drawing. Empty alt text: the picture does not add a fact.
 * Rings do not animate.
 */
export function OrbitArtwork({
  className = "",
  sizes = "18rem",
  fill = false,
  treatment,
  surface,
}: OrbitArtworkProps) {
  const art = orbitArtFor(treatment as OrbitTreatment, surface);
  const imageClass = fill
    ? `object-contain ${className}`
    : `h-auto w-full ${className}`;

  return (
    <span
      aria-hidden="true"
      className={
        fill
          ? "pointer-events-none absolute inset-0 block"
          : "pointer-events-none block"
      }
    >
      {fill ? (
        <Image src={art.src} alt="" fill sizes={sizes} className={imageClass} />
      ) : (
        <Image
          src={art.src}
          alt=""
          width={art.width}
          height={art.height}
          sizes={sizes}
          className={imageClass}
        />
      )}
    </span>
  );
}
