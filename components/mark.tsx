/**
 * Compact open-orbit signature. The geometry is decorative; the surrounding
 * brand link supplies the accessible name and the visible Kristen Aing wordmark.
 * Inherit color from the surface so the same mark works on light/dark panels.
 */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
      height="16"
      viewBox="0 0 24 24"
      width="16"
    >
      <path
        d="M19.2 5.6A9 9 0 1 0 20.9 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="19.2" cy="5.6" r="1.75" fill="currentColor" />
    </svg>
  );
}
