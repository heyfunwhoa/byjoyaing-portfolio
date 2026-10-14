export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height="16"
      viewBox="0 0 24 24"
      width="16"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="44 13"
        transform="rotate(-48 12 12)"
      />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <circle cx="19.5" cy="7" r="1.6" fill="currentColor" />
    </svg>
  );
}
