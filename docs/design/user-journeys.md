# Provisional user journeys

These are planning scenarios. They describe a plausible goal for a kind of visitor, then the path that exists on the deployed site today. They are not interviews, analytics, or quotes. Where a step says the person is likely to hesitate, that is an **assumption**.

The site they are walking is the current one: Home, About, Projects, Contact, and `/work/[slug]`. Work and Side Quests are not pages yet.

Shared entry points that are facts: the nav contains About, Projects, and Contact. The logo goes Home. `/experience` redirects to `/about`. A case-study URL does not need the index.

## 1. Startup founder, evaluating a Head of Sales

**Scenario goal.** Decide whether Kristen can lead revenue at an early company, and whether to write to her.

**Assumption.** This person cares about commercial judgment, coaching, and how she talks about customers. They did not come to inspect a detector catalog first. Untested.

| Step | What the site does now | Gap |
| --- | --- | --- |
| Lands on Home | `h1` is the systems sentence. Eyebrow is "Technical GTM systems." Actions are "View Projects" and "Skills, tools & experience." | The job they are hiring for is not named. "Head of Sales" is not a title she has held, and the page should not invent one. It also does not say Commercial Leader. |
| Looks for proof of selling | Proof counts say "1 prototype", "1 field system", "5 designed". Roles are not on this page. | The numbers describe portfolio artifacts. An assumption: a founder may read them as business results. The labels argue against that, lower than the numerals. |
| Opens About from the secondary button | Same `h1`. Bio. A negation paragraph. Two roles visible, with quota language in the first bullets. Older roles behind "Earlier roles." | The commercial career is present and partly hidden. The figures conflict with the decision to keep them off the public site. |
| Opens Projects | Lifecycle groups. Status legend is clear. | Independent systems and field systems are mixed. Hard to see "how she runs a team" as its own story. |
| Contact | Headline offers product GTM, commercialization, and technical systems. Form works. Resume is requested, not published. | A reasonable exit. The headline still does not say commercial leadership. |

**What would have to be true.** Home names the commercial positioning in the first screen. Work is a door to roles without quota theater. Side Quests are available and labeled independent. Contact accepts a leadership conversation. No page claims a Head of Sales title.

## 2. Recruiter, reviewing professional experience

**Scenario goal.** Confirm titles, dates, companies, and scope, then request a resume.

**Assumption.** Recruiters scan titles and dates before paragraphs. Untested, and consistent with how the timeline is structured.

| Step | What the site does now | Gap |
| --- | --- | --- |
| Searches the name | Title tag is "Kristen Joy Aing — Technical GTM & Product". | The name is there. The role frame may not match the search they were given. |
| Looks for Experience | `/experience` redirects to About. Nav has no Experience item. | The word they expect is a redirect, not a page. |
| Scans roles | Truffle and Darktrace render first, with dates, titles, and one or more bullets. A button reveals the rest. | Companies before Darktrace are undiscoverable until that click. **Needs a browser** to judge how visible the button is. |
| Checks claims | First bullets include a quota, a rank, and a ramp percentage. | Those claims are specific. You have already chosen not to lead with them. A recruiter who copies them into notes is copying something you do not want in market. |
| Wants a resume | Contact has a Resume mode. Copy says a PDF is not posted publicly. | This is an honest flow. Keep it. |

**What would have to be true.** A Work page lists every role, title, company, and dates without a disclosure hiding half the career. Bullets stay qualitative unless you deliberately publish a number. The resume request stays a request.

## 3. Technical or product leader, exploring capabilities

**Scenario goal.** See whether Kristen can turn a commercial problem into a system, and whether the system is real.

**Assumption.** This person will forgive a quiet visual design if status is honest. They will not forgive a designed workflow described as a deployed product. Untested.

| Step | What the site does now | Gap |
| --- | --- | --- |
| Lands on Home | The systems sentence matches this visitor more than it matches the founder. | It still does not say Curious Builder, and it buries the only running prototype under several sections. |
| Reaches the atlas | Caption says independent research, not an official Truffle product. Search and filters work. Gray means not evaluated. | This is the strongest evidence on the site. Status is Prototype. That honesty should stay. |
| Opens another case study | Template includes status, problem, evidence, and system. Several are Designed or Next. | "Next" is defined as sequenced, not claimed. Good. The nav still calls all of this Projects, so a designed operating model and a prototype look like one shelf. |
| Looks for how she works with a team | Strengths and the field-system project talk about briefs a team can run. | Capabilities are a list of skill phrases, not a page. Pull request #1 adds capability routes. Those routes are not on this tree, and they are not the same thing as Side Quests. |

**What would have to be true.** Side Quests show status first. The atlas stays inspectable. Designed and Next work cannot sit under a heading that implies it shipped. Work can point at field systems that ran with a team, without calling them products.

## 4. Visitor exploring independent software

**Scenario goal.** Find things Kristen built on her own, and tell them from her job.

**Assumption.** "Independent" matters to this person. The site rarely uses that word. Untested.

| Step | What the site does now | Gap |
| --- | --- | --- |
| Nav | Projects is the only building-shaped label. | No Side Quests. |
| Projects page | Grouped by lifecycle phase. The intro defines status, not authorship. | A prototype at Truffle's domain and a personal catalog can share a phase. The reader has to open each study. |
| Atlas | Says it is not an official Truffle product. | One project is explicit. The others are not. |
| A direct link to `/work/[slug]` | Renders the study and links back to all projects. | Good deep link. The back link still dumps them into the mixed index. |

**What would have to be true.** Side Quests is a list of independent work only. Each card keeps its status. Cards still open the existing `/work/[slug]` URL until you deliberately move one. The Joy Index is not in this list and has no route.

## What you should learn

A journey without research is a design tool for coverage: did every audience you care about have a door? It becomes fiction when you write "founders told us" or invent a drop-off rate.

When you next change the homepage, walk these four tables again and mark each gap **closed**, **still open**, or **rejected** (you decided that visitor is out of scope). That is the reflection. It is still not a study.
