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
  // Legacy /work/[slug] contains both professional and independent projects.
  // Do not guess the collection from the URL alone.
  if (href === "/work") return pathname === "/work";
  if (href === "/side-quests") return pathname === "/side-quests";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Closed menu is display:none, so it leaves no layout space and no focusable links.
 * Open menu hangs from the header (`top-full`) instead of a fixed offset.
 */
export function menuPanelClass(open: boolean) {
  if (open) {
    return "absolute inset-x-0 top-full z-30 max-h-[70dvh] overflow-y-auto border-b border-border bg-background px-5 py-5 shadow-lg lg:static lg:z-auto lg:max-h-none lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none";
  }
  return "hidden lg:block";
}
