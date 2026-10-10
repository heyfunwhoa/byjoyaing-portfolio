# Homepage prototype — design review & usability checklist

Date: 2026-10-09
Status: testing protocol prepared; no usability or browser testing performed yet.

## Design hypothesis
Leadership-first homepage improves clarity for founders/recruiters compared with split-focus hero. This is a hypothesis, not a validated finding.

## Before testing
1. Review the brand copy: `Curious by nature. Builder by instinct.` (hero), `Enterprise Cybersecurity · GTM Strategy · Leadership` (descriptor), `People first. Problem-driven. Systems-minded.` (leadership approach), `Learn → Build → Iterate` (working method).
2. Ensure private Joy Index does not appear in public navigation.
3. Draft 2 low-fidelity variants in Figma or a code-free wireframe; compare hierarchy.
4. Mark the illustrative portrait as a placeholder; do not misrepresent the subject.
5. Use verified work outcomes only; label demos/prototypes honestly.
6. Review earlier portfolio PRs and current main before any implementation branch.

## Five-minute usability task script
Show the page without describing it. Ask:
- Who is this person professionally?
- Find one example showing impact on a team or business.
- Find a technical Side Quest; is it real, prototype or planned?
- Where would you find the career story?
- How would you contact this person?

Record per visitor: task success, first-click destination, friction/confusion, device, unsolicited observations. No invented data. Treat 3–5 participants as qualitative exploration only.

## Expert UX checklist
- [ ] One unambiguous primary h1 and logical headings
- [ ] About / Work / Side Quests / Contact are discoverable
- [ ] Work receives priority over independent builds for leadership visitors
- [ ] Primary/secondary CTAs are visually and semantically distinct
- [ ] Reading order is coherent at 375px, 768px and 1280px
- [ ] Contrast verified for specific foreground/background pairs
- [ ] Keyboard navigation and focus-visible behavior tested
- [ ] Real imagery/artifacts prioritized over generic stock images
- [ ] Reduced-motion setting respected
- [ ] All links and external destinations verified
- [ ] No inaccurate product claims, confidential facts or exaggerated outcomes

## Record results (fill after real review)
Variant A results: Not tested.
Variant B results: Not tested.
Chosen design: A is provisional, pending evidence.
What surprised me: TBD.
Next smallest iteration: TBD.

## Engineering handoff
Only after review: scope first implementation PR to responsive header + hero, with acceptance criteria and screenshots, lint/typecheck/build and Vercel preview. Keep content-route migration as a separate PR.
