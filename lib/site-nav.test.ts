import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { officialToolWebsites, socialProfiles } from "./portfolio/external-links.ts";
import { isActive, menuPanelClass, navCurrent, primaryNav } from "./site-nav.ts";

test("primary navigation keeps the six public destinations", () => {
  assert.deepEqual(
    primaryNav.map((link) => link.href),
    ["/", "/about", "/work", "/field-notes", "/side-quests", "/contact"],
  );
});

test("case-study URLs highlight the registry kind and leave unclassified paths quiet", () => {
  assert.equal(isActive("/", "/"), true);
  assert.equal(isActive("/about", "/"), false);
  assert.equal(isActive("/work", "/work"), true);
  assert.equal(isActive("/work/detector-coverage-atlas", "/work"), false);
  assert.equal(isActive("/work/detector-coverage-atlas", "/side-quests"), true);
  assert.equal(isActive("/work/competitive-intelligence-engine", "/work"), true);
  assert.equal(isActive("/work/competitive-intelligence-engine", "/side-quests"), false);
  assert.equal(isActive("/work/storytelling-guide", "/work"), false);
  assert.equal(isActive("/work/storytelling-guide", "/side-quests"), false);
  assert.equal(isActive("/side-quests", "/side-quests"), true);
  assert.equal(isActive("/projects", "/side-quests"), false);
  assert.equal(isActive("/field-notes/multithreading", "/field-notes"), true);
  assert.equal(isActive("/contact", "/contact"), true);
  assert.equal(navCurrent("/work", "/work"), "page");
  assert.equal(navCurrent("/work/competitive-intelligence-engine", "/work"), "true");
  assert.equal(navCurrent("/work/detector-coverage-atlas", "/work"), undefined);
  assert.equal(navCurrent("/field-notes/multithreading", "/field-notes"), "true");
});

test("a closed mobile menu is hidden and an open menu hangs from the header", () => {
  const closed = menuPanelClass(false);
  assert.match(closed, /\bhidden\b/);
  assert.equal(closed.includes("fixed"), false);
  assert.equal(closed.includes("absolute"), false);
  assert.match(closed, /lg:flex/);
  const open = menuPanelClass(true);
  assert.match(open, /\babsolute\b/);
  assert.match(open, /\btop-full\b/);
  assert.equal(open.includes("fixed"), false);
  assert.equal(open.includes("hidden"), false);
  assert.equal(open.includes("4.75rem"), false);
  assert.match(open, /\blg:static\b/);
  assert.match(open, /lg:flex/);
});

test("public profile icons use known destinations and clear accessible names", () => {
  assert.deepEqual(socialProfiles.map((item) => item.id), ["linkedin", "github"]);
  assert.equal(socialProfiles[0].href, "https://www.linkedin.com/in/kristenaing");
  assert.equal(socialProfiles[1].href, "https://github.com/heyfunwhoa");
  const links = readFileSync(new URL("../components/social-links.tsx", import.meta.url), "utf8");
  assert.match(links, /aria-label=\{/);
  assert.match(links, /rel="noopener noreferrer"/);
  assert.match(links, /min-h-11 min-w-11/);
  assert.match(links, /logos\/social\/linkedin\.svg/);
  assert.match(links, /logos\/technology\/github\.svg/);
  assert.doesNotMatch(links, /from "lucide-react"/);
  const linkedinSvg = readFileSync(new URL("../public/logos/social/linkedin.svg", import.meta.url), "utf8");
  assert.doesNotMatch(linkedinSvg.toLowerCase(), /<script|javascript:|onload=|foreignobject/);
  const contact = readFileSync(new URL("../app/contact/page.tsx", import.meta.url), "utf8");
  assert.match(contact, /<SocialLinks placement="contact"/);
  assert.match(contact, /mailto:kristen\.aing@gmail\.com/);
  const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.match(layout, /<SocialLinks placement="footer"/);
  assert.match(layout, /sameAs: socialProfiles\.map/);
});

test("nav motion does not replace the mobile menu's focus, Escape, or current-page behavior", () => {
  const nav = readFileSync(new URL("../components/site-header.tsx", import.meta.url), "utf8");
  assert.match(nav, /<SocialLinks placement="header"/);
  assert.match(nav, /nav-panel-enter/);
  assert.match(nav, /nav-interactive/);
  assert.match(nav, /navCurrent\(pathname, link\.href\)/);
  assert.match(nav, /closeFromKeyboard/);
  assert.match(nav, /setAttribute\("inert"/);
  assert.match(nav, /aria-expanded=\{open\}/);
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.nav-interactive\[aria-current\]::after/);
  assert.match(css, /prefers-reduced-motion: reduce/);
});

test("outbound tool icons are restricted to recognized product destinations", () => {
  for (const [id, url] of Object.entries(officialToolWebsites)) {
    assert.match(id, /^[a-z]+$/);
    assert.match(url, /^https:\/\//);
    assert.equal(url.includes("localhost"), false);
  }
  assert.equal("schema" in officialToolWebsites, false);
  assert.equal("ingest" in officialToolWebsites, false);
  const tools = readFileSync(new URL("../components/tools-map.tsx", import.meta.url), "utf8");
  assert.match(tools, /officialToolWebsites\[item\.id\]/);
  assert.match(tools, /rel="noopener noreferrer"/);
});
