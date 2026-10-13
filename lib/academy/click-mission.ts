/** The pilot is a practice activity for an existing Academy lesson, not a second course registry. */
export const clickMission = {
  lessonId: "mcp-vs-rest-api",
  activityId: "follow-one-click",
  title: "Follow one click",
  steps: ["Understand", "See", "Try", "Explain"],
} as const;
export const progressKey = `academy:practice:${clickMission.lessonId}:${clickMission.activityId}:v1`;
export const checks = [
  {
    id: "denied-message",
    question:
      "Blair is signed in. The server returns 403, but the screen says ‘No evidence found.’ What should you fix?",
    choices: [
      "Remove the server’s access check",
      "Explain that access was refused",
      "Keep trying until the account opens",
    ],
    answer: 1,
    explanation:
      "The access check worked: no private brief was sent. The screen should say access was refused. A retry does not give Blair permission.",
    hint: "A missing result and a result you may not access are different situations.",
  },
  {
    id: "hidden-data",
    question:
      "A private brief has already reached the browser. Does collapsing its panel protect that data?",
    choices: [
      "Yes, because the text is hidden",
      "Yes, if the button is disabled",
      "No. The server must check permission before sending it",
    ],
    answer: 2,
    explanation:
      "Collapsing a panel only changes what is visible. Data already sent to the browser remains there. Server-side authorization controls whether it is sent.",
    hint: "Hiding a delivered letter does not undo its delivery.",
  },
] as const;
export type MissionProgress = {
  version: 1;
  lessonId: typeof clickMission.lessonId;
  activityId: typeof clickMission.activityId;
  step: number;
  reviewed: boolean;
  practiced: boolean;
  passedCheckIds: string[];
};
export function emptyProgress(): MissionProgress {
  return {
    version: 1,
    lessonId: clickMission.lessonId,
    activityId: clickMission.activityId,
    step: 0,
    reviewed: false,
    practiced: false,
    passedCheckIds: [],
  };
}
/** Browser storage is untrusted. Never use this record for access or a credential. */
export function parseProgress(raw: string | null): MissionProgress {
  if (!raw || raw.length > 4096) return emptyProgress();
  try {
    const p = JSON.parse(raw);
    if (
      !p ||
      p.version !== 1 ||
      p.lessonId !== clickMission.lessonId ||
      p.activityId !== clickMission.activityId
    )
      return emptyProgress();
    return {
      ...emptyProgress(),
      step:
        Number.isInteger(p.step) &&
        p.step >= 0 &&
        p.step < clickMission.steps.length
          ? p.step
          : 0,
      reviewed: p.reviewed === true,
      practiced: p.practiced === true,
      passedCheckIds:
        p.practiced === true && Array.isArray(p.passedCheckIds)
          ? checks
              .filter((c) => p.passedCheckIds.includes(c.id))
              .map((c) => c.id)
          : [],
    };
  } catch {
    return emptyProgress();
  }
}
export function recordAnswer(
  progress: MissionProgress,
  checkId: string,
  answer: number,
): MissionProgress {
  const check = checks.find((c) => c.id === checkId);
  if (
    !check ||
    !Number.isInteger(answer) ||
    answer < 0 ||
    answer >= check.choices.length
  )
    return progress;
  const passed = progress.passedCheckIds.filter((id) => id !== checkId);
  if (answer === check.answer) passed.push(checkId);
  return { ...progress, practiced: true, passedCheckIds: passed };
}
