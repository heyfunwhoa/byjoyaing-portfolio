"use client";
import { useId, useState } from 'react';
import { emptyMission, missionSteps, reviewedCount, reviewArtifact, updateArtifact } from '../../lib/gameful/mission';
import styles from './mission-workspace.module.css';

/** Session-only practice. No account, CRM, finance, telemetry or storage adapter. */
export function MissionWorkspace() {
  const id = useId();
  const [mission, setMission] = useState(emptyMission);
  const [resetting, setResetting] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [motion, setMotion] = useState(false);
  const count = reviewedCount(mission);
  return <section aria-labelledby={id} className={styles.workspace}>
    <p className={styles.eyebrow}>Synthetic practice mission</p>
    <h2 id={id}>Build an opportunity brief</h2>
    <p>Prepare four fictional deliverables. Review each yourself, then revisit anything you change. This is practice completion, not verified qualification or buyer approval.</p>
    <p>Notes stay in this page session. Reloading or leaving clears them. Use fictional information only.</p>
    <label htmlFor={id + '-progress'}>{count} of {missionSteps.length} deliverables self-reviewed</label>
    <progress id={id + '-progress'} max={missionSteps.length} value={count} />
    <p role="status">{count === missionSteps.length ? 'Practice packet complete. Bring your assumptions to a reviewer.' : 'Your next step: ' + missionSteps.find(({ id: step }) => !mission[step].reviewed)?.title}</p>
    <ol className={styles.steps}>{missionSteps.map(step => <li key={step.id}>
      <h3>{step.title}</h3>
      <label htmlFor={id + step.id}>{step.prompt}</label>
      <textarea id={id + step.id} rows={4} maxLength={3000} value={mission[step.id].note} onChange={event => { setMission(current => updateArtifact(current, step.id, event.target.value)); setCelebrate(false); }} />
      <label className={styles.control}><input type="checkbox" checked={mission[step.id].reviewed} disabled={!mission[step.id].note.trim()} onChange={event => { setMission(current => reviewArtifact(current, step.id, event.target.checked)); setCelebrate(false); }} /> I reviewed this fictional deliverable</label>
      <small>{mission[step.id].reviewed ? 'Self-reviewed' : 'Not reviewed'} · Editing clears this review.</small>
    </li>)}</ol>
    <div className={styles.actions}>
      <label className={styles.control}><input type="checkbox" checked={motion} onChange={event => setMotion(event.target.checked)} /> Enable a brief completion animation</label>
      <button type="button" disabled={count !== missionSteps.length || celebrate} onClick={() => setCelebrate(true)}>Celebrate practice completion</button>
      <button type="button" onClick={() => setResetting(true)}>Reset mission</button>
    </div>
    {celebrate && <p role="status" className={motion ? styles.celebration : undefined}>✓ Four deliverables reviewed. Ready for a coaching conversation.</p>}
    {resetting && <fieldset className={styles.confirm}><legend>Clear all fictional notes and reviews?</legend><button type="button" onClick={() => setResetting(false)}>Keep my work</button> <button type="button" onClick={() => { setMission(emptyMission()); setCelebrate(false); setResetting(false); }}>Clear mission</button></fieldset>}
  </section>;
}
