'use client';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { readDiscovery } from '../../lib/gameful/discovery';
import styles from './discovery-scenario.module.css';

export function DiscoveryScenario() {
  const id = useId();
  const [path, setPath] = useState<number[]>([]);
  const heading = useRef<HTMLHeadingElement>(null);
  const result = useMemo(() => readDiscovery(path), [path]);
  useEffect(() => {
    // The start button unmounts while the scenario loads. Preserve focus
    // if the learner has already moved to another control.
    if (document.activeElement === document.body) {
      heading.current?.focus();
    }
  }, []);

  function choose(index: number) {
    setPath(current => [...current, index]);
    heading.current?.focus();
  }
  return <section aria-labelledby={id} className={styles.scenario}>
    <h3 id={id} ref={heading} tabIndex={-1}>Practice a discovery conversation</h3>
    <p>Fictional buyer, scripted responses. Choose your questions, inspect the consequences, then draft the next step. This is practice, not buyer evidence or deal qualification. Choices reset when you leave.</p>
    <ol aria-label="Conversation transcript">{result.transcript.map((line, index) => <li key={index}>{line}</li>)}</ol>
    <p role="status">{result.choices.length ? 'Choose your next response.' : 'Conversation complete. Review the coaching notes and try another approach.'}</p>
    <div className={styles.choices}>{result.choices.map(choice => <button key={`${path.length}-${choice.index}`} onClick={() => choose(choice.index)}>{choice.text}</button>)}</div>
    <button onClick={() => { setPath([]); heading.current?.focus(); }}>Restart conversation</button>
  </section>;
}
