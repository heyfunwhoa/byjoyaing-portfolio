/**
 * Recraft orbit drawings in public/brand/orbits.
 * Decoration only. Pillar labels and evidence stay in CapabilityOrbit.
 * No SVG is checked in here. If one is added, review it before use.
 */
export const orbitArtwork = {
  transparent: {
    src: "/brand/orbits/orbit-filled-nodes.png",
    file: "public/brand/orbits/orbit-filled-nodes.png",
    width: 1024,
    height: 1024,
    surfaces: ["ivory", "charcoal"],
  },
  charcoal: {
    src: "/brand/orbits/orbit-outlined-nodes-on-charcoal.png",
    file: "public/brand/orbits/orbit-outlined-nodes-on-charcoal.png",
    width: 1024,
    height: 1024,
    surfaces: ["charcoal"],
  },
} as const;

export type OrbitTreatment = keyof typeof orbitArtwork;
export type OrbitSurface = "ivory" | "charcoal";

export function orbitArtFor(treatment: OrbitTreatment, surface: OrbitSurface) {
  const art = orbitArtwork[treatment];
  if (!(art.surfaces as readonly OrbitSurface[]).includes(surface)) {
    throw new Error(
      `The ${treatment} orbit stays on ${art.surfaces.join(" or ")}.`,
    );
  }
  return art;
}
