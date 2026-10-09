# Design learning log

Notes for Kristen, from the audit on 9 October 2026. This is coaching, not a diary written in your voice, and not a research report.

The public site was not changed. The notes live beside [the design process](../design-process.md). That process is how you will use this audit: Discover and Define are done well enough to start, Structure and Explore are the sitemap and the two homepage directions, and Build has not started.

## What each step was for

**Fundamentals.** [../design/design-principles.md](../design/design-principles.md) attaches a word to something already on the site. You learn a principle by finding it, not by memorizing a poster. The distinction that matters: a principle can fail a task, a preference can be swapped. The paper color passed a contrast check. The 10px "Next" badge is still hard to read. Both can be true.

**Audit.** [../design/ux-audit.md](../design/ux-audit.md) ranks evidence. A redirect loop on the branded domain outranks a footer you dislike. Quota figures on the deployed About page outrank a new typeface. Severity is how you keep taste from jumping the queue.

**Journeys.** [../design/user-journeys.md](../design/user-journeys.md) is a coverage tool. Four scenarios, each with a goal you can explain from the role, not from a quote. The moment you write "users want" without a source, you have left this method. Mark assumptions as assumptions. Later, a real conversation can confirm or kill one.

**Information architecture.** [../design/information-architecture.md](../design/information-architecture.md) separates the job of a page from the look of a page. Work and Side Quests are doors. Status (Prototype, Field system, Designed, Next) is honesty inside either door. Mixing those two ideas is why the current Projects page is hard to use for more than one kind of visitor.

**Wireframes.** [../design/wireframes.md](../design/wireframes.md) forces a choice of hierarchy before CSS. Direction A makes the positioning line the `h1`. Direction B makes the atlas the first thing. You cannot maximize both. Choosing A, with the atlas still on the page, is a judgment. Say that when you implement it.

## Concepts worth keeping

- **Hierarchy** is what the largest, highest thing claims. Your current `h1` claims a systems sentence. The brief asks it to claim Commercial Leader. Curious Builder.
- **Alignment** is a shared edge. The `max-w-5xl` column is why the site feels orderly.
- **Proximity** is why "1 prototype" reads wrong when it sits apart from the atlas.
- **A signifier** shows that something can be used. A tab role that is really a toggle teaches the wrong interaction.
- **A journey** without research still has to be labeled as a scenario.
- **A redirect** keeps a promise. `/experience` currently keeps the URL and breaks the expectation.

## What this audit must not become

- A claim that founders, recruiters, or anyone else has reviewed the site.
- A second copy of pull request #1's homepage, or a merge of #2 or #3.
- New revenue figures, a Head of Sales title, or a production claim for a designed system.
- Any page, folder, or paragraph from The Joy Index.

## Suggested practice

Before the first hero pull request, fill the six-line note from the design process in your own words, using Direction A as the chosen option. If your reason is only "it looks more executive," label it a preference and look again at the founder scenario. If your reason is "the `h1` should be the line I want repeated," that is hierarchy.
