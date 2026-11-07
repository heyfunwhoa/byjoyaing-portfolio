export const missionSteps = [
  { id: 'discovery', title: 'Discovery brief', prompt: 'Name the fictional buyer, problem, current workaround and business consequence. Separate evidence from assumptions.' },
  { id: 'stakeholders', title: 'Stakeholder map', prompt: 'Name the operator, technical evaluator and economic buyer roles. State which authority remains unknown.' },
  { id: 'value', title: 'Business value', prompt: 'Define the baseline, desired outcome, measurement method and assumptions. Use fictional numbers only.' },
  { id: 'poc', title: 'POC scope', prompt: 'Define one use case, success criteria, owner, time box, exclusions and the decision after the evaluation.' },
] as const;
export type StepId = typeof missionSteps[number]['id'];
export type Artifact = { note: string; reviewed: boolean };
export type Mission = Record<StepId, Artifact>;
export function emptyMission(): Mission {
  return Object.fromEntries(missionSteps.map(({ id }) => [id, { note: '', reviewed: false }])) as Mission;
}
export function updateArtifact(state: Mission, id: StepId, note: string): Mission {
  return { ...state, [id]: { note, reviewed: false } };
}
export function reviewArtifact(state: Mission, id: StepId, reviewed: boolean): Mission {
  return { ...state, [id]: { ...state[id], reviewed: reviewed && state[id].note.trim().length > 0 } };
}
export function reviewedCount(state: Mission): number {
  return missionSteps.filter(({ id }) => state[id].reviewed && state[id].note.trim().length > 0).length;
}
