# joy. — Character and avatar system

**Status:** Design specification. The homepage portrait at `/brand/avatar/home-portrait.webp` has been separately approved by the subject; this document does not approve additional character variants.

## Intent
The illustrated character supports a real person's professional identity; it must not replace evidence, commercial outcomes, full-name attribution or readable interface content. One master identity, three contextual expressions. This is not a mascot brand.

## Contextual variants

These are character concepts, not a requirement to put portraits on the named pages. Current placements follow the component rules and [inventory](../design/component-inventory.md).

| Variant | Placement | Expression/props | Relative emphasis |
| --- | --- | --- | --- |
| Leader (default) | Approved homepage and connection-card placements | Open, confident, welcoming editorial portrait; no gimmicky props | Secondary to evidence and headline |
| Explorer | Optional personal research or reflection | Curious; notebook, map, optional binoculars | Supporting editorial motif |
| Builder | Optional personal building or learning reflection | Creating or arranging modules, components and diagrams | Supporting learning/lab motif |

## Character continuity
- All variants must share the same facial characteristics, hairstyle, adult proportions, line quality, shading and illustration style.
- Do not infer exact facial characteristics from a text brief. Review master likeness with the person represented before shipping derivatives.
- Editorial vector aesthetic with restrained geometry and tactile detail; personable, not childish, photorealistic, anime, stock, robot-like, or a generic tech mascot.
- Use the existing CSS tokens as the source of truth: warm ivory `#F3EFE6`, charcoal `#1B211D`, copper `#8A4B2A`, card `#FBF8F2`, muted `#4A504B`, border `#CFC3B3`. Existing sage, mist, and clay surface tokens may support the composition as documented in [Brand System v1](brand-system-v1.md). A new forest or other action accent requires an explicit brand and accessibility review.
- Use spacious crop-safe compositions and consistent gaze/face scale across variants. Avoid visually overstating role, authority or technical production work.

## Planned asset contract
- Master source: a separately reviewed editable vector source stored in an approved design workflow; do not commit fonts or personal reference photos.
- Export optimized SVG when safe and supported; use raster WebP/PNG fallbacks for complex illustration or unsupported features.
- Approved future variants: `/avatar-leader.webp`, `/avatar-explorer.webp`, `/avatar-builder.webp`. Optional circular crop `/avatar-icon.webp`.
- The existing shared portrait is `/brand/avatar/illustrated-portrait.png`, retained for approved personal and connection-card placements. The homepage uses `/brand/avatar/home-portrait.webp` through an explicit per-instance source. About uses transparent orbit artwork without a portrait, and Work is text first. Other collection and learning headers use the existing geometric illustrations in the [component inventory](../design/component-inventory.md); individual guides and project detail pages retain their own treatment. Leader, Explorer, and Builder remain contextual labels, not separate files. Never point production markup at hypothetical `/avatar-leader.webp`, `/avatar-explorer.webp`, or `/avatar-builder.webp` files.
- Do not embed scripts, remote resources, event handlers, or untrusted markup in SVG. Review SVG before inclusion.
- Preserve natural aspect ratio; avoid face clipping at 375, 768 and 1280px and at 200% zoom. Ensure optimized image dimensions and no layout shift.
- Simple static illustration by default. Do not animate facial movement. A hover or focus state may move the crop marks around the shared portrait. It may not swap the face, tilt the portrait, or point at an unapproved file. Respect `prefers-reduced-motion`.
- The homepage hero may wrap that same file in static orbital lines. The lines are the celestial geometry in [brand-guidelines.md](./brand-guidelines.md). They are not a new illustration, they do not spin, and they are not a Leader, Explorer, or Builder variant.

## Component rules
`<BrandAvatar variant="leader" />`, `variant="explorer"`, and `variant="builder"` are valid. The default is Leader. About uses `OrbitArtwork` with the transparent treatment on ivory, empty alt text and no portrait overlay. The collection and learning headers listed in the inventory use `OrbitStudyIllustration`, whose source map selects page-specific geometric SVGs, instead of `BrandAvatar`.
- The shared portrait remains the default. Home explicitly passes its separately approved portrait source. Other variant props remain contextual labels, not distinct image files.
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

