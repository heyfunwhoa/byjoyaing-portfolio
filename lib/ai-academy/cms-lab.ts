// Teaching decisions for the CMS Fundamentals card. Scenarios are public or fictional.
// Evaluating a choice checks it against this lesson's guidance. It does not grade a written answer,
// write learner progress, or prove a production CMS is configured.

export type CmsExerciseId = "architecture" | "schema" | "publishing";

export type CmsSource = {
  label: string;
  url: string;
  supports: string;
  doesNotProve: string;
};

export type CmsChoice = {
  text: string;
  explanation: string;
};

export type CmsExercise = {
  id: CmsExerciseId;
  title: string;
  objective: string;
  scenario: string;
  question: string;
  choices: readonly [CmsChoice, CmsChoice, CmsChoice];
  answer: 0 | 1 | 2;
  verifies: string;
  sources: readonly CmsSource[];
};

export const cmsExercises: readonly CmsExercise[] = [
  {
    id: "architecture",
    title: "A. Architecture decision",
    objective:
      "Match an editing need to a proportionate architecture, and keep operational data out of the public content store.",
    scenario:
      "Portfolio example, as implemented on 2026-10-14. This public site reviews changes in Git. A local Keystatic editor can change the public verification lesson and the About page sentences when a developer opts in on loopback. Hosted GitHub editing is not configured. Interactive checks and learner progress stay in application code. The author now wants a form for public lesson wording. Confidential notes and completion records must stay out.",
    question: "Which next step fits that stated need?",
    choices: [
      {
        text: "Keep public lesson text in reviewed Git files, and use a Git-backed editor only for that public text. Leave progress, checks, and private notes in their existing systems.",
        explanation:
          "The need is an editing form for public wording. A Git-backed editor can sit on the files this site already reviews. It does not have to become the store for progress or private notes, and turning the editor on in production is a separate access decision.",
      },
      {
        text: "Move lessons, learner progress, and private notes into a public hosted dataset, then hide the page URL.",
        explanation:
          "A hidden URL is not reader authorization. A public dataset or repository exposes the records to anyone who can request them. Progress and private notes are not editorial content.",
      },
      {
        text: "Stand up a self-hosted database CMS for the whole site before checking whether a form for public wording is enough.",
        explanation:
          "A self-hosted CMS can be a sound later choice when you need its database, APIs, and access control and can operate them. It is extra infrastructure for a wording form on one reviewed site.",
      },
    ],
    answer: 0,
    verifies:
      "Whether you can separate a public editorial store from progress and private data, and avoid treating a hidden URL as access control. It does not verify this site's Keystatic configuration.",
    sources: [
      {
        label: "Keystatic: local mode and GitHub mode",
        url: "https://keystatic.com/docs/github-mode",
        supports:
          "Keystatic can store content as project files locally, or write them to a GitHub repository after GitHub authentication is configured.",
        doesNotProve:
          "That this portfolio has hosted editing, or that a file editor enforces branch protection.",
      },
    ],
  },
  {
    id: "schema",
    title: "B. Content-schema design",
    objective:
      "Choose fields and a stable identifier that can serve more than one presentation without copying the article.",
    scenario:
      "Fictional example: Harbor Notes publishes the same public article on a website and in a newsletter. Editors change the title often. Each channel has its own layout. The article credits one author record that other articles also use.",
    question: "Which model fits that editorial need?",
    choices: [
      {
        text: "Paste a separate HTML blob into each channel and put the title inside the HTML.",
        explanation:
          "Each channel then owns a divergent copy. A title change has to be repeated, and the title is trapped in presentation.",
      },
      {
        text: "Give the article a stable id, a changeable title and summary, a structured body, and a reference to the author. Let each channel render the same record.",
        explanation:
          "The id survives a title or slug change. A reference points at one author record instead of copying the name. Presentation stays in each channel.",
      },
      {
        text: "Store the article only as a component in each frontend so editors publish by editing the interface code.",
        explanation:
          "That couples wording to presentation and makes every copy change an interface change. It also duplicates the article once per channel.",
      },
    ],
    answer: 1,
    verifies:
      "Whether you can pick a stable id, a reference, and shared structured fields for a fictional two-channel article. It does not validate a real schema file or a vendor's rich-text format.",
    sources: [
      {
        label: "Sanity: content modeling",
        url: "https://www.sanity.io/content-modeling",
        supports:
          "Structured content is modeled as types and fields so more than one presentation can read it.",
        doesNotProve:
          "That Harbor Notes exists, or that an API-first CMS is required whenever two channels exist.",
      },
    ],
  },
  {
    id: "publishing",
    title: "C. Publishing and rollback",
    objective:
      "Trace a bad publish through cache and history, and keep collected evidence out of the editorial body.",
    scenario:
      "Fictional example: Field Ledger keeps collected source rows in a research store. Editors publish a separate explainer from a CMS. After they mark the explainer Published, the public page still shows the old title. The evidence table must keep its own identifiers and history.",
    question: "What should the team do?",
    choices: [
      {
        text: "Treat Published as proof every cache and static page updated, and paste the evidence table into the explainer so there is one copy.",
        explanation:
          "A CMS publish status does not guarantee that a CDN, static build, or application cache has refreshed. Copying evidence into the explainer creates a second source that can drift from the research store.",
      },
      {
        text: "Compare the published record with the page, then revalidate or rebuild as that app requires. Roll back the explainer revision or content commit and verify the reader view. Leave source rows in the research store.",
        explanation:
          "Delivery can lag a publish. Rollback restores the explainer only after someone checks the page readers actually get. Evidence stays in the system that owns its history.",
      },
      {
        text: "Delete the CMS and the research database together so rollback is unnecessary.",
        explanation:
          "Deleting both systems removes the explainer and the evidence. Rollback is a scoped restore of the bad editorial change, not a wipe of operational data.",
      },
    ],
    answer: 1,
    verifies:
      "Whether you separate publish status from reader delivery, and editorial copy from source evidence. It does not prove a webhook, cache rule, or backup restore works.",
    sources: [
      {
        label: "Next.js: caching and revalidating",
        url: "https://nextjs.org/docs/app/getting-started/revalidating",
        supports:
          "A cached result can outlive a content change until something revalidates it or the app rebuilds.",
        doesNotProve:
          "Which caching options this portfolio enables, or that every CMS sends a webhook.",
      },
    ],
  },
];

export function findCmsExercise(id: string): CmsExercise | undefined {
  return cmsExercises.find((exercise) => exercise.id === id);
}

export function evaluateCmsChoice(
  id: string,
  choice: number | null,
): { correct: boolean; explanation: string } | null {
  const exercise = findCmsExercise(id);
  if (!exercise || choice === null || !Number.isInteger(choice)) return null;
  if (choice < 0 || choice >= exercise.choices.length) return null;
  return {
    correct: choice === exercise.answer,
    explanation: exercise.choices[choice].explanation,
  };
}
