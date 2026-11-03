// Guided content for the single frontend-building-blocks pilot.
// Choices are checked locally. Nothing here is stored, submitted, or treated as mastery.

export const frontendLessonSlug = "frontend-building-blocks" as const;

export type FrontendChoice = {
  id: string;
  label: string;
  correct: boolean;
  feedback: string;
};

export type FrontendChoiceGroup = {
  id: string;
  resetLabel: string;
  prompt: string;
  choices: readonly FrontendChoice[];
};

export type FrontendNextStep = {
  slug: "storybook-visual-regression" | "cms-fundamentals";
  keepPath: boolean;
  label: string;
  reason: string;
};

export const frontendLessonSections = [
  { id: "understand", label: "Understand" },
  { id: "example", label: "Worked example" },
  { id: "practice", label: "Practice" },
  { id: "checks", label: "Check understanding" },
  { id: "apply", label: "Apply independently" },
  { id: "next", label: "Next" },
] as const;

export const frontendLessonObjective =
  "You will trace a project card through its content, component, styling and link, then choose where to investigate a problem.";

export const frontendLessonAnalogy =
  "A card is like a labeled display: the content supplies the words, the component organizes them, styling controls appearance, and links or controls determine what happens. The analogy does not describe data fetching or server authorization.";

export const frontendVocabulary = [
  {
    term: "Component",
    meaning: "A reusable piece of interface that renders content.",
  },
  {
    term: "Props",
    meaning: "Values passed into a component.",
  },
  {
    term: "Styling",
    meaning: "Rules for spacing, color, wrapping and responsive layout.",
  },
  {
    term: "Route",
    meaning: "The application location reached by a URL.",
  },
  {
    term: "Verification",
    meaning:
      "A specific check that provides evidence about the intended behavior.",
  },
] as const;

export const projectCardExample = {
  title: "Harbor lights recap",
  summary: "A fictional evening event used only for this lesson.",
  linkLabel: "Read the project",
  href: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/builder-academy/frontend-building-blocks.md",
  code: `type ProjectCardProps = {
  title: string;
  summary: string;
  href: string;
};

export function ProjectCard({ title, summary, href }: ProjectCardProps) {
  return (
    <article className="rounded-xl border p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm">{summary}</p>
      <a className="mt-4 inline-block underline focus-visible:outline-2" href={href}>
        Read the project
      </a>
    </article>
  );
}`,
  annotations: [
    "Title and summary props supply the content.",
    "Article, heading and anchor supply semantic structure.",
    "Existing Tailwind utilities supply layout and visual styling.",
    "The href supplies the destination. A correct-looking card does not prove the route exists.",
    "Focus styles and keyboard operation help make navigation usable.",
  ],
  plainLanguage:
    "The words come from props. The component chooses the article, heading and link. Styling classes control the box. The address in href is where the link goes. On this page the sample heading is a lower level because the lesson title is already the page heading. The code sample shows h2 for a card that is the top heading of its own view.",
} as const;

export const frontendPractice: FrontendChoiceGroup = {
  id: "overflow",
  resetLabel: "Reset practice",
  prompt:
    "A card shows the expected title and summary on a desktop, but a long title runs outside its boundary on a phone. Where do you investigate first?",
  choices: [
    {
      id: "content",
      label: "Content source and props",
      correct: false,
      feedback:
        "The scenario says the words are correct. Inspect content when the words themselves are wrong.",
    },
    {
      id: "styling",
      label: "Styling and responsive layout",
      correct: true,
      feedback:
        "This is the first investigation. Inspect wrapping, minimum widths and layout at the failing viewport.",
    },
    {
      id: "framework",
      label: "Replace the application framework",
      correct: false,
      feedback:
        "This evidence does not justify a framework change. First isolate the local layout rule.",
    },
  ],
};

export const frontendVerificationExample =
  "Check long and short titles at narrow widths and at 200% zoom. Text should stay readable without unintended page-level horizontal scroll. A viewport check alone does not prove all accessibility requirements.";

export const frontendChecks: readonly FrontendChoiceGroup[] = [
  {
    id: "missing-page",
    resetLabel: "Reset destination check",
    prompt:
      "A card is readable and correctly styled, but “Read the project” opens a missing page. Where should you investigate first?",
    choices: [
      {
        id: "href",
        label: "The href, matching route and deployed revision",
        correct: true,
        feedback:
          "Inspect the navigation chain and test the actual destination.",
      },
      {
        id: "padding",
        label: "Increase padding",
        correct: false,
        feedback: "Spacing does not create a route.",
      },
      {
        id: "animation",
        label: "Add an animation library",
        correct: false,
        feedback: "Motion does not fix the destination.",
      },
    ],
  },
  {
    id: "keyboard",
    resetLabel: "Reset keyboard check",
    prompt:
      "A clickable div works with a mouse but cannot be reached by keyboard. What is the best first repair for navigation?",
    choices: [
      {
        id: "anchor",
        label:
          "Use a semantic anchor with a valid href, descriptive text and visible focus, then test keyboard activation",
        correct: true,
        feedback: "Navigation should be a link.",
      },
      {
        id: "hover",
        label: "Add a hover effect",
        correct: false,
        feedback: "Hover does not provide keyboard operation.",
      },
      {
        id: "reviewed",
        label: "Mark the lesson reviewed",
        correct: false,
        feedback: "Review tracking is not a repair or an accessibility test.",
      },
    ],
  },
];

export const frontendTransfer = {
  prompt:
    "An event card has correct text, fits a phone, and opens the right page, but several links all say “Click here.” Identify the concern, propose a better label, and explain how you would verify it.",
  rubric: [
    "Identifies link purpose, accessibility and clarity rather than framework choice.",
    "Proposes a contextual label such as “Read the fictional event agenda.”",
    "Checks the rendered accessible name, keyboard focus and activation, and the destination.",
    "States a limit: passing this check does not prove complete accessibility or learner mastery.",
  ],
} as const;

export const frontendNextSteps: readonly FrontendNextStep[] = [
  {
    slug: "storybook-visual-regression",
    keepPath: true,
    label: "Build and test your Design Lab",
    reason:
      "Continue with component-state inspection in the existing Storybook and visual regression lesson.",
  },
  {
    slug: "cms-fundamentals",
    keepPath: false,
    label: "CMS fundamentals: architecture, modeling, and selection",
    reason:
      "Alternatively, learn content authoring. This leaves the frontend path and uses the normal lesson selector.",
  },
];

const choiceGroups = [frontendPractice, ...frontendChecks];

export function getFrontendChoiceGroup(id: string) {
  return choiceGroups.find((group) => group.id === id);
}

export function feedbackForFrontendChoice(groupId: string, choiceId: string) {
  const choice = getFrontendChoiceGroup(groupId)?.choices.find(
    (item) => item.id === choiceId,
  );
  if (!choice) return null;
  return { correct: choice.correct, feedback: choice.feedback };
}
