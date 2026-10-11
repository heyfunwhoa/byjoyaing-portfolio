# Accessibility audit

**Target:** WCAG 2.2 AA, as named by the brand and engineering checklists.  
**This pass:** source and HTML structure only. It is not a conformance claim.

## Evidence recorded

| Test | Result |
| --- | --- |
| Skip link | Present, `href="#main-content"`, class `skip-link` |
| Homepage h1 | One h1 in the fetched HTML |
| Sitemap pages | One h1 parsed on each 200 |
| Contact names | Email, LinkedIn, and GitHub are text links. Icons supplement the text |
| Contact target size | `min-h-11` on the link class in source |
| Homepage actions | `min-h-12` |
| Mobile menu | Closed state uses `hidden`, which removes layout and, in CSS, the box. Focus behavior when open was not tested |
| Reduced motion | A `prefers-reduced-motion` block in `globals.css` sets `transform: none` for the editorial nudge. Not tested with the OS setting |
| 200% zoom | Not run |
| Keyboard walk | Not run |
| Screen reader | Not run |
| Contrast measurement | Not run with a picker |

## Known risks to test, not assumed failures

- Copper `#8A4B2A` on ivory or on charcoal. The brand guide already warns that charcoal needs `#E6B59A` or ivory. The homepage italic line uses `#E6B59A`. Eyebrows on ivory use `text-accent`. Those pairs need a measured check.
- Muted text `#4A504B` on ivory `#F3EFE6` and on card `#FBF8F2`. Likely intended to pass. Unmeasured here.
- Work anchor cards are `<a>` elements that contain multiple lines. They have an accessible name from their text. Hit area looks like the whole card. Unmeasured at 320px.
- Dialog and Sheet exist under `components/ui` and in the unmounted design-lab demo. They are not a public-page defect until mounted.
- 404 h1 is the text "404". A custom not-found page should use a real heading such as "Page not found" and keep the skip link.
- `generateMetadata` returns `title: "Project"` when a slug is missing. The page calls `notFound()` in that case, so the title may not matter. Unverified.
- Academy playgrounds include interactive controls. They were not tabbed through.

## Acceptance for a later implementation pull request

- Keyboard path through header, mobile menu open and close, and contact form, with a visible focus ring.
- No horizontal overflow at 320, 375, 768, and 1280.
- 200% zoom on Home, Work, and one project page.
- Contrast pairs listed above recorded with a tool.
- Reduced motion: celestial geometry stays static; hover transforms do not run.
- Kind badge, if added, is text.

Passing a component-library primitive is not evidence that the page passes.
