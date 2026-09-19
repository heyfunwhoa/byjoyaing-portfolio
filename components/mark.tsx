export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height="12"
      viewBox="0 0 12 12"
      width="12"
    >
      <rect
        height="10"
        stroke="currentColor"
        strokeWidth="1.25"
        width="10"
        x="1"
        y="1"
      />
    </svg>
  );
}
