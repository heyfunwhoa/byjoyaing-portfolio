import { kindForPathname } from "./portfolio-kind.ts";

export const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/field-notes", label: "Field Notes" },
  { href: "/side-quests", label: "Side Quests" },
  { href: "/contact", label: "Contact" },
] as const;

export function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  // /work/[slug] serves both collections. Highlight the registry kind, not the prefix.
  const kind = kindForPathname(pathname);
  if (href === "/work") {
    if (pathname === "/work" || pathname === "/experience" || pathname === "/work/storytelling-guide" || pathname.startsWith("/capabilities")) return true;
    return kind === "work";
  }
  if (href === "/side-quests") {
    if (
      pathname === "/side-quests" ||
      pathname === "/projects" ||
      pathname === "/account-signal" ||
      pathname.startsWith("/ai-academy") ||
      pathname.startsWith("/builder-academy")
    ) {
      return true;
    }
    return kind === "side-quest";
  }
  if (href === "/field-notes" && pathname === "/private-work") return true;
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Exact routes are the current page. A matching collection is current in the set. */
export function navCurrent(pathname: string, href: string): "page" | "true" | undefined {
  if (!isActive(pathname, href)) return undefined;
  return pathname === href ? "page" : "true";
}

/**
 * Closed menu is display:none, so it leaves no layout space and no focusable links.
 * Open menu hangs from the header (`top-full`) instead of a fixed offset.
 */
export function menuPanelClass(open: boolean) {
  if (open) {
    // Phone: a right-hand sheet below the header that slides in (globals.css .nav-panel-enter).
    return "absolute right-0 top-full z-30 flex h-[calc(100dvh-4rem)] w-[min(20rem,88vw)] flex-col overflow-y-auto border-b border-l border-border bg-card px-5 py-5 shadow-[-16px_0_32px_-24px_var(--surface-dark)] lg:static lg:h-auto lg:w-auto lg:flex-row lg:items-center lg:z-auto lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none";
  }
  return "hidden lg:flex lg:items-center";
}
