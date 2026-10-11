# Portfolio user journeys

**Status:** Design hypotheses. None of these paths has been observed in a usability session or in analytics.  
**Date:** 2026-10-11  
**Canonical product:** [portfolio-experience-v2-prd.md](portfolio-experience-v2-prd.md)

Journeys describe what a prepared visitor is trying to do. They are acceptance scenarios for later implementation, not research findings.

## Shared entry

Every journey starts at https://www.byjoyaing.com/ with the header Home / About / Work / Field Notes / Side Quests / Contact. The first screen states Kristen Joy Aing, **Revenue & GTM Leader. Curious Builder.**, and the philosophy **People first. Problem-driven. Systems-minded.**

Professional evidence appears before independent software. That order is a requirement, not a finding about what visitors already understand.

## J1 — Enterprise seller credibility

**Persona:** Hiring manager for a strategic enterprise account executive role.  
**Job:** Confirm hands-on cybersecurity selling before reading about leadership or software.

1. Land on Home and read the hero and the current-role credibility block.
2. Open Work.
3. Find an Enterprise Sales collection that is distinct from People & Leadership and from GTM Strategy.
4. Open one example that states context, contribution, and the limit of the evidence.
5. Reach Contact without passing through a software prototype.

**Current gap (verified in code):** Home and `/experience` carry role narrative. On `/work`, the Enterprise Sales anchor is two links. The narrative cards sit under People & Leadership. See FEAT-001.

## J2 — Revenue leadership progression

**Persona:** Founder or hiring leader considering broader revenue responsibility.  
**Job:** See coaching, hiring support, enablement, and operating judgment, and see that these are contributions rather than a Head of Sales title.

1. Land on Home and see leadership named as a trajectory, after selling credibility.
2. Open Work → People & Leadership.
3. Read a story that separates personal contribution from team results.
4. Optionally open Field Notes and see a method labeled illustrative when it is not a field record.
5. Reach Contact.

**Current state:** `lib/public-stories.ts` has a qualitative enablement story (SDRs into closing roles, seven GTM hires onboarded, shared resources). It does not claim a management title. The story asks for further verification before more detail is published. That caution stays.

## J3 — How she thinks

**Persona:** A reader who already accepts the commercial background and wants operating judgment.  
**Job:** Distinguish a playbook, a framework, an operating system, and a lesson, and know which articles exist.

1. Open Field Notes.
2. See four collections: Playbooks, Frameworks, Operating Systems, Lessons Learned.
3. Open a published article and see its evidence label.
4. See related Work or Side Quests as links, not duplicated essays.
5. Titles with no article are marked not yet published.

**Current gap:** The four collections render as descriptions plus example titles. Two guides exist (`/field-notes/enterprise-deal`, `/field-notes/multithreading`) and are labeled illustrative or interactive. The other example titles are not URLs.

## J4 — Builder as differentiator

**Persona:** A technical or product collaborator.  
**Job:** Inspect an independent project, its maturity, and its limits, without mistaking it for employer software.

1. From Home, pass the professional sections before the independent-project preview.
2. Open Side Quests.
3. Filter or browse by subject, and read status separately from subject.
4. Open a case study and find limitations in the same view as the description.
5. Do not encounter a claim that the project is a live integration with another portfolio system.

**Current state:** Side Quests lists selected projects with `statusCopy`. Groups link to `/projects?category=`. The group names do not yet match the approved four collections exactly. Maturity and kind are already separate fields.

## J5 — Recruiter path

**Persona:** Recruiter.  
**Job:** Identify the person, the career sequence, and a way to write.

1. Home → About or Experience.
2. Read the advertising origin, cybersecurity progression, and education without private notes.
3. Contact. The form offers a message and a selected-work inquiry. It does not offer a resume download.

## J6 — Personal story

**Persona:** General visitor.  
**Job:** Understand values and a few public interests without entering a private knowledge base.

1. About.
2. Career origin, philosophy, milestones, curiosity.
3. No Joy Index route, link, or excerpt.

## Journey rules

- Do not add a step that depends on analytics, login, or a private repository.
- A journey is done for planning when the pages it names exist and the gap is written down. It is done for the product when a person can complete it, which has not been tested.
