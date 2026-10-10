import type { ReactNode } from "react";

export function PageMain({ children }: { children: ReactNode }) {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 sm:px-8">
      {children}
    </main>
  );
}
