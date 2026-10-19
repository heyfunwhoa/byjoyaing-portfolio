import Image from "next/image";

const orbitStudySources = {
  "field-notes": "/brand/orbits/studies/orbit-study-03.svg",
  "side-quests": "/brand/orbits/studies/orbit-study-02.svg",
} as const;

export type OrbitStudyVariant = keyof typeof orbitStudySources;

type OrbitStudyIllustrationProps = {
  variant: OrbitStudyVariant;
  className?: string;
};

/** Decorative orbital artwork for the Field Notes and Side Quests collection headers. */
export function OrbitStudyIllustration({
  variant,
  className = "",
}: OrbitStudyIllustrationProps) {
  return (
    <Image
      src={orbitStudySources[variant]}
      alt=""
      aria-hidden="true"
      width={1024}
      height={1024}
      unoptimized
      className={`block h-auto w-full ${className}`}
    />
  );
}
