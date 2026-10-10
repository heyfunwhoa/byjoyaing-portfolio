export type Strategy = "rebase" | "merge" | "squash";
export type CaseId = "lint" | "build" | "audit";

export const scenarios: Record<CaseId, {
  name: string;
  symptom: string;
  choices: string[];
  correct: number;
  explanation: string;
}> = {
  lint: {
    name: "Lint failed",
    symptom: "The Vercel preview succeeded, but GitHub CI reports: app/inquiry-form.tsx — Cannot call Date.now() during render. Build: skipped.",
    choices: [
      "Merge anyway because the preview deployed",
      "Inspect the lint error, incorporate the shared fix, then rerun CI",
      "Delete the entire inquiry form",
    ],
    correct: 1,
    explanation: "Preview deployment and CI evaluate different things. The build step was skipped because lint failed earlier; fixing lint and rerunning checks is the safe next step.",
  },
  build: {
    name: "Build failed",
    symptom: "Lint passed. The build step reports: Type error — Property 'title' does not exist on the given project type.",
    choices: [
      "Fix the property/type mismatch and rerun build",
      "Disable TypeScript across the project",
      "Assume lint success means the build is optional",
    ],
    correct: 0,
    explanation: "Lint checks code patterns; the build also checks whether the app can compile and whether types line up.",
  },
  audit: {
    name: "Dependency audit failed",
    symptom: "Lint and build passed. npm audit reports a high-severity advisory in a production dependency.",
    choices: [
      "Apply every available dependency upgrade without review",
      "Ignore it because the homepage still works",
      "Inspect affected versions and paths, choose a compatible fix, and rerun all checks",
    ],
    correct: 2,
    explanation: "A security advisory needs triage: confirm affected package, version, exposure and a compatible remediation before updating and retesting.",
  },
};

export const quiz = [
  { question: "Your feature branch is behind main. What does rebase do?", options: ["Deletes your changes", "Replays your commits on the newer base", "Immediately deploys the feature"], correct: 1, why: "Rebase recreates your feature commits after the updated base. It changes commit IDs, not the intended work." },
  { question: "What does squash and merge do?", options: ["Combines a PR's changes into one main-branch commit", "Removes all code review history", "Copies secrets from local files"], correct: 0, why: "The approved changes become one commit on main. The PR still shows the development history." },
  { question: "CI says 'build skipped' after lint failed. What can you conclude?", options: ["Build definitely passed", "Build definitely failed", "Build did not run in that workflow"], correct: 2, why: "A skipped step was never evaluated. Separate jobs help reveal independent results." },
];


export function quizScore(answers: Record<number, number>): number {
  return quiz.reduce((count, item, index) => count + (answers[index] === item.correct ? 1 : 0), 0);
}

export function quizComplete(answers: Record<number, number>): boolean {
  return quiz.every((_, index) => answers[index] !== undefined);
}

export function isCorrectScenarioAnswer(id: CaseId, answer: number): boolean {
  return scenarios[id].correct === answer;
}
