"use client";

import { Menu } from "@/components/icons/menu";
import { X } from "@/components/icons/x";
import { Mark } from "@/components/mark";
import { SocialLinks } from "@/components/social-links";
import { menuPanelClass, navCurrent, primaryNav } from "@/lib/site-nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const desktopNav = "(min-width: 1024px)";

export function SiteHeader() {
  const pathname = usePathname();
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [tucked, setTucked] = useState(false);
  const open = openOnPath === pathname;
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLAnchorElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [underline, setUnderline] = useState<{ left: number; width: number } | null>(null);
  const openRef = useRef(open);
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // Slim after a little scroll; tuck away on scroll down and return on scroll up.
  // Never tucks while the menu is open, focus is inside the header, or motion is reduced.
  useEffect(() => {
    // Distances are accumulated per direction so the small scroll adjustment the browser
    // makes when the header slims (scroll anchoring) never reads as "scrolling up".
    let lastY = window.scrollY;
    let upTravel = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      setScrolled(y > 8);
      const focusInside = headerRef.current?.contains(document.activeElement) ?? false;
      if (reduce.matches || openRef.current || focusInside || y < 120) {
        upTravel = 0;
        setTucked(false);
        return;
      }
      if (delta > 0) {
        upTravel = 0;
        if (delta > 6) setTucked(true);
      } else if (delta < 0) {
        upTravel -= delta;
        if (upTravel >= 40) setTucked(false);
      }
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  // Sticky in-page navigation reads this to sit directly under the header.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const publish = () => {
      const height = tucked ? 0 : header.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--site-header-offset", `${Math.round(height)}px`);
    };
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(header);
    return () => observer.disconnect();
  }, [tucked]);

  const currentIndex = primaryNav.findIndex((link) => navCurrent(pathname, link.href) !== undefined);
  const underlineIndex = hoverIndex ?? (currentIndex >= 0 ? currentIndex : null);

  const measureUnderline = useCallback(() => {
    const list = listRef.current;
    const target = underlineIndex === null ? null : linkRefs.current[underlineIndex];
    if (!list || !target || target.offsetParent === null) {
      setUnderline(null);
      return;
    }
    const listBox = list.getBoundingClientRect();
    const box = target.getBoundingClientRect();
    setUnderline({ left: box.left - listBox.left + 12, width: Math.max(box.width - 24, 0) });
  }, [underlineIndex]);

  useLayoutEffect(() => {
    measureUnderline();
    window.addEventListener("resize", measureUnderline);
    return () => window.removeEventListener("resize", measureUnderline);
  }, [measureUnderline, pathname]);

  useEffect(() => {
    if (!open) return;
    const media = window.matchMedia(desktopNav);
    if (media.matches) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const inertTargets = [
      document.querySelector(".skip-link"),
      document.getElementById("main-content"),
      document.querySelector("footer"),
      brandRef.current,
    ].filter((node): node is HTMLElement => node instanceof HTMLElement);
    for (const node of inertTargets) node.setAttribute("inert", "");

    menuRef.current?.querySelector<HTMLAnchorElement>("a[href]")?.focus();

    function closeFromKeyboard(event: KeyboardEvent) {
      if (event.key === "Tab") {
        const targets = [
          menuButtonRef.current,
          ...Array.from(
            menuRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]") ??
              [],
          ),
        ].filter(
          (node): node is HTMLButtonElement | HTMLAnchorElement =>
            node !== null,
        );
        const first = targets[0];
        const last = targets[targets.length - 1];
        if (!first || !last) return;
        const active = document.activeElement;
        if (!targets.some((node) => node === active)) {
          event.preventDefault();
          first.focus();
        } else if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
        return;
      }
      if (event.key !== "Escape") return;
      event.preventDefault();
      setOpenOnPath(null);
      menuButtonRef.current?.focus();
    }
    function closeOnDesktop(event: MediaQueryListEvent) {
      if (event.matches) setOpenOnPath(null);
    }

    document.addEventListener("keydown", closeFromKeyboard);
    media.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      for (const node of inertTargets) node.removeAttribute("inert");
      document.removeEventListener("keydown", closeFromKeyboard);
      media.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  function closeMenu() {
    setOpenOnPath(null);
  }
  function dismissMenu() {
    setOpenOnPath(null);
    menuButtonRef.current?.focus();
  }

  return (
    <>
      <header
        ref={headerRef}
        data-site-chrome
        data-tucked={tucked ? "true" : undefined}
        className={`site-header-motion sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm ${scrolled ? "shadow-[0_5px_20px_-16px_#1B211D]" : ""} ${tucked ? "-translate-y-full" : ""}`}
      >
        <nav className={`relative mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-5 sm:gap-4 sm:px-8 ${scrolled ? "py-1.5 sm:py-2" : "py-2.5 sm:py-4"}`} aria-label="Primary">
          <Link
            ref={brandRef}
            href="/" className="group/brand relative flex min-w-0 items-center gap-2.5 rounded-md text-foreground transition-colors duration-200 hover:text-accent">
            <span className="nav-brand-mark relative shrink-0">
              <Mark className="text-accent" />
              <span className="pointer-events-none absolute top-[calc(100%+0.4rem)] left-0 z-40 hidden w-max rounded-md border border-border bg-card px-2 py-1 text-xs font-medium text-foreground group-hover/brand:block group-focus-visible/brand:block">
                joy.
              </span>
            </span>
            <span className="min-w-0 font-display text-base tracking-tight sm:text-lg">Kristen Aing</span>
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="min-h-11 min-w-11 shrink-0 rounded-md border border-border px-3 py-2 text-sm font-medium transition-colors duration-200 hover:border-accent hover:bg-card lg:hidden"
            aria-expanded={open}
            aria-controls="primary-menu"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpenOnPath(open ? null : pathname)}
          >
            <span className="inline-flex items-center gap-2">
              {open ? (
                <X size={16} className="nav-toggle-enter size-4" />
              ) : (
                <Menu size={16} className="nav-toggle-enter size-4" />
              )}
              {open ? "Close" : "Menu"}
            </span>
          </button>
          <div id="primary-menu" ref={menuRef} className={`${menuPanelClass(open)} ${open ? "nav-panel-enter" : ""}`}>
            <ul
              ref={listRef}
              onMouseLeave={() => setHoverIndex(null)}
              className="relative flex flex-col gap-1 text-base lg:flex-row lg:flex-wrap lg:items-center lg:justify-end lg:gap-x-1 lg:gap-y-1 lg:text-sm"
            >
              {primaryNav.map((link, index) => {
                const current = navCurrent(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      ref={(node) => { linkRefs.current[index] = node; }}
                      href={link.href}
                      onClick={closeMenu}
                      onMouseEnter={() => setHoverIndex(index)}
                      onFocus={() => setHoverIndex(index)}
                      onBlur={() => setHoverIndex(null)}
                      aria-current={current}
                      className={`nav-interactive relative flex min-h-12 items-center rounded-md px-3 py-2 transition-colors duration-200 lg:inline-flex lg:min-h-11 ${current ? "bg-accent/10 font-semibold text-accent lg:bg-transparent" : "text-muted hover:bg-background hover:text-foreground lg:hover:bg-transparent"}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <span
                aria-hidden="true"
                data-nav-underline
                className="nav-underline pointer-events-none absolute bottom-0.5 left-0 hidden h-0.5 rounded-full bg-accent lg:block"
                style={{
                  width: underline?.width ?? 0,
                  transform: `translateX(${underline?.left ?? 0}px)`,
                  opacity: underline ? 1 : 0,
                }}
              />
            </ul>
            <div className="mt-auto border-t border-border pt-3 lg:mt-0 lg:ml-3 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-3">
              <SocialLinks placement="header" />
            </div>
          </div>
        </nav>
      </header>
      {open ? (
        <div
          aria-hidden="true"
          onClick={dismissMenu}
          className="nav-backdrop-enter fixed inset-0 z-30 bg-black/50 lg:hidden"
        />
      ) : null}
    </>
  );
}
