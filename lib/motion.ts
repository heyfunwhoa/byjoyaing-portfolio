import type { CSSProperties } from "react";

/** Position in a staggered `.rise-in` group (globals.css, KRU-311). */
export function riseIndex(index: number): CSSProperties {
  return { "--rise-i": index } as CSSProperties;
}
