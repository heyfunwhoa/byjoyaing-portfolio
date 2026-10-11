# Page wireframes

**Status:** Proposed for review. Not built.  
**Date:** 2026-10-11  
**Constraints:** Geist Sans and Geist Mono, the shipped palette, Leader / Explorer / Builder avatars using `/avatar.png`, editorial hierarchy. No new font, no dashboard, no equal-card grid as the default.  
**Order on every page:** the DOM order is the mobile order. Desktop may place a portrait beside a headline. It may not pull a later section above an earlier one.

Shared chrome, both widths:

```text
[Skip to content]
joy.  Kristen Joy Aing          Home About Work Field Notes Side Quests Contact
```

Below `lg`, the six links sit in a button menu. Escape closes it and focus returns to the button. The name and the menu button stay on one row.

Calls to action are text links or the existing accent button. One primary action per screen. A second action is a text link.

## Home — Why explore

**Purpose.** Say who she is, show enterprise selling first, then leadership, then independent building, then a way to write.  
**Primary audience.** Enterprise AE hiring manager. A revenue-leadership reader is the second pass.  
**Owns.** The positioning sentence and the current-role excerpt.  
**Does not own.** The full timeline, the essays, or the project directory.

**Section order**

1. Hero. Eyebrow: Enterprise cybersecurity · Revenue & GTM. Headline: Revenue & GTM Leader. Curious Builder. Philosophy. Two actions: Explore Work, Explore Side Quests. Leader portrait. Caption: Curious by nature. Builder by instinct.
2. Credibility. One line each for People, problem-driven, systems-minded. Beside or under that, the Truffle Security record from `roles`. Link: Read the experience timeline.
3. Bento. Work is the large tile. Then Field Notes, Side Quests, the private invitation, the pull quote. Existing `EditorialBento`.
4. Selected selling. One line for Rapid7 and one line for Forcepoint, each linking to `/experience`. Not the full bullet list.
5. Leadership glimpse. One sentence and a link to Work → People & Leadership. No second copy of the enablement story.
6. One Field Note link, labeled illustrative.
7. One Side Quest lead with its status, plus a link to all Side Quests.
8. One sentence of personal story and a link to About.
9. Connect. Get in touch. Optional text link to `/private-work`.

**Visual hierarchy.** The headline is the only `h1`. The Truffle record is the largest proof block. The bento is navigation, smaller than the proof. Side Quests are a single lead, not a gallery.

**Mobile (375)**

```text
joy. Kristen Joy Aing          [Menu]
Enterprise cybersecurity · Revenue & GTM
Revenue & GTM Leader.
Curious Builder.
People first. Problem-driven. Systems-minded.
[ Explore Work ]
[ Explore Side Quests ]
[ Leader portrait ]
Curious by nature. Builder by instinct.
01  Credibility
The selling comes first.
People / Problem-driven / Systems   (one line each)
Truffle Security
Senior Enterprise Account Executive
three existing points
Read the experience timeline
[Bento stacks: Work, Field Notes, Side Quests, private, quote]
Selected selling
Rapid7          one line → Experience
Forcepoint      one line → Experience
People & Leadership
one sentence → Work
Field Notes
one illustrative guide →
Side Quests
one project, status, limits →
About
one sentence →
Connect
[ Get in touch ]
```

**Desktop (1280).** Hero is type left, portrait right. Credibility is principles left, Truffle record right. Later sections are full width, one story each. The bento may use the existing asymmetric spans from `lg` up.

## About — Who I am

**Purpose.** Career origin, philosophy, the arc, and curated interests.  
**Primary audience.** Recruiter. General reader second.  
**Owns.** Advertising origin, philosophy paragraphs, values, `personalInterests`.  
**Does not own.** Deal bullets, project case studies, the toolkit as the headline.

**Section order**

1. Hero. Leader portrait. H1 is the name's story, not a second positioning line. Approved supporting line: Strategist. Leader. Builder. Body: advertising origin, then one sentence that the career is enterprise cybersecurity selling plus coaching and tools. Link: Work.
2. Philosophy. People first. Problem-driven. Systems-minded. Three short paragraphs. This is the long version Home only points to.
3. Arc. One paragraph from advertising sales through cybersecurity. Link: Experience. No four-row duplicate of the timeline.
4. Leadership, as philosophy, not a title. One paragraph. Link: Work → People & Leadership.
5. Interests and values. Existing public cards only.
6. Toolkit, after the story, with the existing separation of used, built, and learning.
7. Close. Contact.

**Mobile.** Portrait, then headline, then sections stacked. Philosophy cards stack. Interest cards stack.  
**Desktop.** Portrait beside the hero only. Philosophy can be three columns. Interests can be three columns. The arc stays one column.

## Work — What I have done

**Purpose.** Professional evidence in three collections, selling first.  
**Primary audience.** Enterprise AE hiring manager, then a revenue-leadership hiring manager.  
**Owns.** Collection framing and links into `roles`, `publicStories`, and the one `kind: "work"` case study.  
**Does not own.** The year-by-year timeline (`/experience`) or Side Quest writeups.

**Section order**

1. Hero. Leader portrait. Eyebrow: Work. H1 states enterprise selling, not "People. Strategy. Systems." as the only headline. One sentence: independent software is under Side Quests. In-page links: Enterprise Sales, People & Leadership, GTM Strategy.
2. Enterprise Sales. Truffle, Rapid7, and Forcepoint as the lead rows, using existing points. Link to the full timeline. No new figures.
3. People & Leadership. The enablement story from `publicStories`. Label coaching and hiring support as contribution, not as a Head of Sales role. Hold any detail the story itself marks for review.
4. GTM Strategy. Competitive-intelligence field approach only, plus the caveat that the monitor is a design. Other GTM software stays off this list.
5. Close. Experience timeline. Contact.

**Visual hierarchy.** Enterprise Sales is the long section. The other two are shorter. Do not give the three collections equal cards at the top and then hide the selling record.

**Mobile**

```text
Work
Enterprise cybersecurity sales, then the leadership around it.
Enterprise Sales · People & Leadership · GTM Strategy
Enterprise Sales
Truffle Security
  existing points
Rapid7
  existing points
Forcepoint
  existing points
Full timeline →
People & Leadership
Helping teams ramp
  context, contribution, evidence limit, takeaway
GTM Strategy
Competitive briefs
  field practice, not a deployed monitor
Contact →
```

**Desktop.** The three in-page links can sit in a row under the hero. Each collection is full width. A row is period and company on the left, points on the right, as `/experience` already does.

## Field Notes — How I think

**Purpose.** Show methods without mistaking them for deal records.  
**Primary audience.** A reader who wants the operating judgment.  
**Owns.** Collection labels, the two published guides, and the unpublished state of every other title.  
**Does not own.** Employment outcomes.

**Section order**

1. Hero. Explorer portrait. H1. One sentence: these are methods. Evidence labels are part of the title row.
2. Featured. The two live guides, with Illustrative framework and Interactive playbook. Link to Work under them so a method is not the only proof.
3. Collections. Playbooks, Frameworks, Operating Systems, Lessons Learned. Each lists a real href or the words "Not yet published."
4. Related. Link to Work and Side Quests. The private-access note stays one block, not a second essay.
5. Contact link.

**Mobile.** Portrait under the headline or above it, but before the guides. Guides stack. Collections stack.  
**Desktop.** Portrait beside the hero. Featured guides may be two columns. Collections may be two columns. Unpublished titles are text, not links.

## Side Quests — What I am building

**Purpose.** Independent work, with subject and maturity both visible.  
**Primary audience.** Technical or product collaborator.  
**Owns.** The selected set and the subject groups.  
**Does not own.** Employer results. `/projects` remains the full filter until a later review.

**Section order**

1. Hero. Builder portrait. H1. One sentence: stages differ, and none of this is an employer deployment.
2. Subject links: GTM & Revenue Systems, Security Research & Intelligence, Learning & Developer Tools, Creative Experiments. Creative Experiments states that nothing is filed there yet. The other three deep-link to the current `/projects` category only when the mapping in the taxonomy is direct. Where the mapping says "needs a per-project choice," the link is the unfiltered directory until that choice is made.
3. Selected. Existing four: account intelligence, detector coverage atlas, truffle camp, customer feedback. Each shows status and one limitation sentence already in the registry.
4. Other explorations. Title and status only.
5. Roadmap repositories stay labeled "not finished applications."
6. Link: full directory at `/projects`.

**Mobile.** Subjects stack as full-width links. Selected projects stack. Status is text, not color alone.  
**Desktop.** Subjects can be four columns. Selected can be two columns. The first selected project may be larger. Do not make every project the same size as the lead.

## Contact — How to connect

**Purpose.** A direct, working way to write.  
**Primary audience.** Anyone who finished another page.  
**Owns.** Email, LinkedIn, GitHub, and `InquiryForm`.  
**Does not own.** A résumé download or a second biography.

**Section order**

1. H1: Let's connect.
2. One sentence aligned with the homepage: strategic enterprise selling and revenue leadership. Product marketing may stay only if it remains secondary to that sentence. The current contact sentence leads with sales-leadership and product-marketing. Proposed: lead with enterprise selling and revenue leadership, and keep product marketing as a clause.
3. Email, LinkedIn, GitHub.
4. The form. Tabs remain Message and Selected Work. No resume tab.

**Mobile.** Headline, links, then the form, full width.  
**Desktop.** Copy and links on the left. Form on the right. The form does not jump above the headline in the DOM.

## Supporting pages (not in the header)

These keep their URLs. Wireframes do not promote them into the six.

| Page | Role in the structure | Wireframe note |
| --- | --- | --- |
| `/experience` | Timeline owned by roles | Keep the current row pattern. Eyebrow should say Experience, not compete with the Work index. Related links must keep saying which projects are not employer deployments. |
| `/projects` | Filterable directory | Keep filters. The H1 should not say the directory is the Side Quests introduction if `/side-quests` already does that. One sentence and a link up is enough. |
| `/work/[slug]` | Case study | Professional pages follow `work-story-template`. Independent pages follow `build-story-template`. |
| `/field-notes/[guide]` | Article | Title, evidence label, then the interactive body. A contents list is optional and only for a long guide. |
| `/capabilities` | Lens, not a destination | Stay unlinked from the header. |
| `/private-work` | How to ask for more | One screen. No Joy Index. |

## Review checklist for these wireframes

- [ ] Enterprise selling is the first evidence on Home and on Work.
- [ ] Leadership copy does not say Head of Sales.
- [ ] Side Quests are after professional evidence on Home.
- [ ] No section is an equal-card grid unless the wireframe says columns are allowed.
- [ ] Mobile order matches the numbered sections.
- [ ] No new font, palette, or avatar file is required to build this.
