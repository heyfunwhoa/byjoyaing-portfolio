import Image from "next/image";

const orbitStudySources = {
  projects: "/brand/page-art/connected-nodes.svg",
  "field-notes": "/brand/page-art/stacked-shapes.svg",
  "side-quests": "/brand/page-art/branching-path.svg",
} as const;

export type OrbitStudyVariant = keyof typeof orbitStudySources;

type OrbitStudyIllustrationProps = {
  variant: OrbitStudyVariant;
  className?: string;
};

/** Decorative geometric artwork for the Projects, Field Notes and Side Quests collection headers. */
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
