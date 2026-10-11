import type { ReactNode } from "react";

export function CropFrame({ children }: { children: ReactNode }) {
  const mark = "crop-corner pointer-events-none absolute h-2 w-2 border-accent";

  return (
    <div className="avatar-frame relative">
      <span className={`${mark} crop-corner-tl -top-px -left-px border-t border-l`} />
      <span className={`${mark} crop-corner-tr -top-px -right-px border-t border-r`} />
      <span className={`${mark} crop-corner-bl -bottom-px -left-px border-b border-l`} />
      <span className={`${mark} crop-corner-br -right-px -bottom-px border-b border-r`} />
      {children}
    </div>
  );
}
