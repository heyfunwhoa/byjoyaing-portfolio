import assert from 'node:assert/strict';
import test from 'node:test';
import { emptyMission, missionSteps, reviewedCount, reviewArtifact, updateArtifact } from './mission.ts';
test('blank artifacts cannot count as reviewed', () => {
  const empty = emptyMission();
  assert.equal(reviewedCount(reviewArtifact(empty, 'discovery', true)), 0);
  assert.equal(reviewedCount(reviewArtifact(updateArtifact(empty, 'discovery', '  '), 'discovery', true)), 0);
});
test('editing completed work invalidates its review without changing other artifacts', () => {
  let state = emptyMission();
  for (const step of missionSteps) state = reviewArtifact(updateArtifact(state, step.id, 'Fictional draft'), step.id, true);
  assert.equal(reviewedCount(state), 4);
  const edited = updateArtifact(state, 'value', 'Revised assumption');
  assert.equal(reviewedCount(edited), 3);
  assert.equal(state.value.reviewed, true);
  assert.equal(edited.poc.reviewed, true);
  assert.equal(reviewedCount(reviewArtifact(edited, 'value', true)), 4);
  assert.equal(reviewedCount(emptyMission()), 0);
});
