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

/** Closed menu is display:none, so it leaves no layout space and no focusable links. */
export function menuPanelClass(open: boolean) {
  if (open) {
    return "fixed inset-x-0 top-[4.75rem] z-30 max-h-[calc(100dvh-4.75rem)] overflow-y-auto border-b border-border bg-background px-5 py-5 shadow-lg lg:static lg:max-h-none lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none";
  }
  return "hidden lg:block";
}
