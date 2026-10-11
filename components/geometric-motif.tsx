/**
 * Decorative orbits and a few nodes. They orient the Work tile.
 * They do not encode data, and they do not move.
 */
export function GeometricMotif({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute text-[#8B9387] ${className}`}>
      <span className="absolute -bottom-14 -right-14 h-52 w-52 rounded-full border border-current opacity-30 sm:h-72 sm:w-72" />
      <span className="absolute -bottom-7 -right-7 h-36 w-36 rounded-full border border-current opacity-25 sm:h-56 sm:w-56" />
      <span className="absolute right-8 -bottom-1 h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      <span className="absolute -right-1 bottom-12 h-1 w-1 rounded-full bg-current opacity-70" />
      <span className="absolute right-16 -bottom-16 h-1 w-1 rounded-full bg-current opacity-60 sm:-bottom-20" />
    </span>
  );
}
