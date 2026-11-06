"use client";
import { lazy, Suspense, useId, useState } from 'react';
import { DiscoveryPilot } from '@/components/gameful/discovery-pilot';
const LearningChallenge = lazy(() => import('./learning-challenge').then(module => ({ default: module.LearningChallenge })));
import { Controls, ReactFlow, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { BentoGrid } from '@/components/ui/bento-grid';
import { Card } from '@/components/ui/card';
import { ProjectStatusPill } from '@/components/project-status-pill';
import { MissionWorkspace } from '@/components/gameful/mission-workspace';
import { learningPaths } from '@/lib/academy/learning-paths';
import { lessons } from '@/lib/ai-academy';
import { labProjects } from '@/lib/design-lab-catalog';

const control = 'min-h-11 rounded-lg border border-border px-3 py-2 text-sm';
const projects = labProjects();

function ProjectExploration() {
  const id = useId();
  const [explored, setExplored] = useState<string[]>([]);
  return <section aria-labelledby={id} className="space-y-4">
    <h3 id={id} className="text-2xl font-semibold">Explore the work behind a project</h3>
    <p className="text-sm text-muted">A personal reading checklist for this session. Marking a card explored does not change its project status. Professional Work comes first.</p>
    <p role="status">{explored.length} of {projects.length} project summaries marked explored</p>
    <button className={control} onClick={() => setExplored([])}>Reset exploration checklist</button>
    <BentoGrid className="auto-rows-auto md:auto-rows-auto md:grid-cols-2">
      {projects.map(project => <Card key={project.slug} className="min-w-0 p-5">
        <p className="text-xs text-muted">{project.kind === 'work' ? 'Professional Work' : 'Independent Side Quest'}</p>
        <h4 className="text-xl font-semibold">{project.title}</h4>
        <ProjectStatusPill status={project.status} />
        <p className="text-sm leading-6">{project.summary}</p>
        <details><summary className="min-h-11 cursor-pointer py-2">Inspect the implementation context</summary><p className="mt-2 text-sm leading-6">{project.technologies}</p></details>
        <a href={project.href} target="_blank" rel="noopener noreferrer" className="min-h-11 py-2 underline">Open the full project and evidence (new tab)</a>
        <label className="flex min-h-11 items-center gap-2 text-sm"><input type="checkbox" checked={explored.includes(project.slug)} onChange={event => setExplored(current => event.target.checked ? [...current, project.slug] : current.filter(slug => slug !== project.slug))} /> I explored this summary</label>
      </Card>)}
    </BentoGrid>
  </section>;
}

function LearningPath({ pathIndex }: { pathIndex: number }) {
  const id = useId();
  const path = learningPaths[pathIndex];
  const pathLessons = path.slugs.map(slug => lessons.find(lesson => lesson.slug === slug)).filter(lesson => lesson !== undefined);
  const [active, setActive] = useState(pathLessons[0].slug);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const lesson = pathLessons.find(item => item.slug === active)!;
  const passed = pathLessons.filter(item => answers[item.slug] === item.check.answer);
  const nodes = pathLessons.map((item, index) => ({ id: item.slug, position: { x: 40, y: index * 110 }, data: { label: `${index + 1}. ${item.title} (${answers[item.slug] === item.check.answer ? 'check passed' : 'practice available'})` }, sourcePosition: Position.Bottom, targetPosition: Position.Top, style: { width: 290, background: 'var(--card)', color: 'var(--foreground)', borderColor: 'var(--border)' } }));
  const edges = pathLessons.slice(1).map((item, index) => ({ id: pathLessons[index].slug + item.slug, source: pathLessons[index].slug, target: item.slug }));
  return <div className="space-y-4">
    <p>{path.outcome}</p><p className="text-sm text-muted">Suggested preparation: {path.prerequisite}. Connections show reading order, not locked access. These practice answers stay in this session and reset when changing paths. They do not update Academy progress or certify mastery.</p>
    <p role="status">{passed.length} of {pathLessons.length} practice checks passed</p>
    <button className={control} onClick={() => setAnswers({})}>Reset practice answers</button>
    <details><summary className="min-h-11 cursor-pointer py-2">Show the optional path map</summary>
      <p className="mb-3 text-sm text-muted">Use zoom buttons or drag the background. The lesson buttons below offer the same reading order without a canvas.</p>
      <div className="h-96 overflow-hidden rounded-xl border border-border" aria-label="Suggested lesson order">
        <ReactFlow key={path.id} nodes={nodes} edges={edges} fitView nodesDraggable={false} nodesConnectable={false} elementsSelectable={false} nodesFocusable={false} edgesFocusable={false} zoomOnScroll={false} panOnScroll={false} zoomOnDoubleClick={false} preventScrolling={false}><Controls showInteractive={false} /></ReactFlow>
      </div>
    </details>
    <ol className="grid gap-2 sm:grid-cols-2">{pathLessons.map((item, index) => <li key={item.slug}><button className={control + ' w-full text-left'} aria-pressed={active === item.slug} onClick={() => setActive(item.slug)}>{index + 1}. {item.title}{answers[item.slug] === item.check.answer ? ' · Check passed' : ''}</button></li>)}</ol>
    <Card className="p-5"><h4 className="text-xl font-semibold">{lesson.title}</h4><p>{lesson.summary}</p><p className="text-sm leading-6">Practice: {lesson.exercise}</p>
      <fieldset key={lesson.slug}><legend className="font-semibold">{lesson.check.question}</legend>{lesson.check.choices.map((choice, index) => <label key={choice} className="my-2 flex min-h-11 items-center gap-3 text-sm"><input type="radio" name={id + lesson.slug} checked={answers[lesson.slug] === index} onChange={() => setAnswers(current => ({ ...current, [lesson.slug]: index }))} />{choice}</label>)}</fieldset>
      <p role="status">{answers[lesson.slug] === undefined ? 'Choose an answer to see feedback.' : (answers[lesson.slug] === lesson.check.answer ? 'Practice check passed. ' : 'Try again. ') + lesson.check.explanation}</p>
      <ul>{lesson.sources.map(source => <li key={source.url}><a className="inline-block min-h-11 py-2 underline" href={source.url} target="_blank" rel="noopener noreferrer">{source.label} (new tab)</a></li>)}</ul>
      <a href="/ai-academy" target="_blank" rel="noopener noreferrer" className="min-h-11 py-2 underline">Open Builder Academy (new tab)</a>
    </Card>
  </div>;
}

export function GamefulWorkbench() {
  const id = useId();
  const [pathIndex, setPathIndex] = useState(1);
  const [showChallenge, setShowChallenge] = useState(false);
  return <section aria-labelledby={id} className="space-y-8">
    <header><p className="editorial-eyebrow text-accent">Game-like interactions · local prototypes</p><h2 id={id} className="mt-2 text-3xl font-semibold">Make progress visible</h2><p className="mt-3 text-muted">Three compositions to try before adopting them in a workflow. No points, rankings, saved accounts or live deal updates.</p></header>
    <MissionWorkspace />
    <DiscoveryPilot />
    {showChallenge ? <Suspense fallback={<p role="status">Loading learning territories…</p>}><LearningChallenge /></Suspense> : <button className={control} onClick={() => setShowChallenge(true)}>Explore learning territories and quizzes</button>}
    <ProjectExploration />
    <section aria-labelledby={id + '-learning'} className="space-y-4"><h3 id={id + '-learning'} className="text-2xl font-semibold">Follow a learning path</h3>
      <label className="block" htmlFor={id + '-path'}>Choose a path (changing paths clears practice answers)</label>
      <select className={control + ' w-full'} id={id + '-path'} value={pathIndex} onChange={event => setPathIndex(Number(event.target.value))}>{learningPaths.map((path, index) => <option key={path.id} value={index}>{path.title}</option>)}</select>
      <LearningPath key={pathIndex} pathIndex={pathIndex} />
    </section>
  </section>;
}
