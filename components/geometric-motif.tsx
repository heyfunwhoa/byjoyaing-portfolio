/**
 * Decorative orbits. They orient a tile; they do not encode data.
 */
export function GeometricMotif({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute text-[#8B9387] ${className}`}>
      <span className="absolute -bottom-14 -right-14 h-52 w-52 rounded-full border border-current opacity-30 sm:h-72 sm:w-72" />
      <span className="absolute -bottom-7 -right-7 h-36 w-36 rounded-full border border-current opacity-25 sm:h-56 sm:w-56" />
    </span>
  );
}
