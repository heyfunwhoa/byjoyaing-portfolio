# joy. — Character and avatar system

**Status:** Design specification. No new character illustrations approved or deployed by this document.

## Intent
The illustrated character supports a real person's professional identity; it must not replace evidence, commercial outcomes, full-name attribution or readable interface content. One master identity, three contextual expressions. This is not a mascot brand.

## Variants
| Variant | Placement | Expression/props | Relative emphasis |
| --- | --- | --- | --- |
| Leader (default) | Home, About, Work | Open, confident, welcoming editorial portrait; no gimmicky props | Secondary to evidence and headline |
| Explorer | Field Notes, research, security market maps | Curious; notebook, map, optional binoculars | Supporting editorial motif |
| Builder | Side Quests, Builder Academy | Creating or arranging modules, components and diagrams | Supporting learning/lab motif |

## Character continuity
- All variants must share the same facial characteristics, hairstyle, adult proportions, line quality, shading and illustration style.
- Do not infer exact facial characteristics from a text brief. Review master likeness with the person represented before shipping derivatives.
- Editorial vector aesthetic with restrained geometry and tactile detail; personable, not childish, photorealistic, anime, stock, robot-like, or a generic tech mascot.
- Use the existing CSS tokens as the source of truth: warm ivory `#F3EFE6`, charcoal `#1B211D`, copper `#8A4B2A`, card `#FBF8F2`, muted `#4A504B`, border `#CFC3B3`. A proposed forest or sage accent is *not* part of the canonical shipped tokens and requires a separate accessibility review.
- Use spacious crop-safe compositions and consistent gaze/face scale across variants. Avoid visually overstating role, authority or technical production work.

## Planned asset contract
- Master source: a separately reviewed editable vector source stored in an approved design workflow; do not commit fonts or personal reference photos.
- Export optimized SVG when safe and supported; use raster WebP/PNG fallbacks for complex illustration or unsupported features.
- Approved future variants: `/avatar-leader.webp`, `/avatar-explorer.webp`, `/avatar-builder.webp`. Optional circular crop `/avatar-icon.webp`.
- Until approved assets exist, **all component variants render the existing `/avatar.png`**. Never point production markup at hypothetical assets.
- Do not embed scripts, remote resources, event handlers, or untrusted markup in SVG. Review SVG before inclusion.
- Preserve natural aspect ratio; avoid face clipping at 375, 768 and 1280px and at 200% zoom. Ensure optimized image dimensions and no layout shift.
- Simple static illustration by default. Do not animate facial movement; respect `prefers-reduced-motion` for any subsequent motion.

## Component rules
`<BrandAvatar variant="leader" />`, `variant="explorer"`, `variant="builder"` are valid. The default is Leader.
- Current implementation intentionally uses the shared approved-in-code asset for all variants; variant prop is future-facing, not a claim that imagery has shipped.
- Provide a meaningful description when the portrait establishes identity. For repeat purely decorative illustrations, pass `decorative` to use empty alt text.
- The full name must remain visible in text where required; image alt is not a substitute for identifying copy.
- Avatar must not act as the only CTA or convey essential information unavailable elsewhere.

## Approval and release criteria
1. Approve the master portrait's identity/likeness, vector treatment and tone before designing Explorer/Builder derivatives.
2. Review consistency and crops at avatar, card and hero sizes on mobile/desktop.
3. Confirm no copyright or third-party licensing conflicts; do not copy a reference illustration.
4. Export and optimize assets; keep a documented source and attribution/ownership trail.
5. Replace fallback mapping with real file paths only after assets are committed and tests confirm they exist.
6. Check accessibility (alt/decoration, contrast of surroundings, visible focus, reduced motion), lint, test, build, security scans and browser QA before merge.
7. Coordinate with PR #33 for copy/navigation. This document does not silently merge that PR or change the live hero.
