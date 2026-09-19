import type { ReactNode } from "react";

export function CropFrame({ children }: { children: ReactNode }) {
  const mark =
    "pointer-events-none absolute h-2 w-2 border-accent";

  return (
    <div className="relative">
      <span className={`${mark} -top-px -left-px border-t border-l`} />
      <span className={`${mark} -top-px -right-px border-t border-r`} />
      <span className={`${mark} -bottom-px -left-px border-b border-l`} />
      <span className={`${mark} -right-px -bottom-px border-b border-r`} />
      {children}
    </div>
  );
}
