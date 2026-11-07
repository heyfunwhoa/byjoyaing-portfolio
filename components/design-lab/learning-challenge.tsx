'use client';
import { useId, useRef, useState } from 'react';
import { useQuiz, type Quiz } from 'react-quiz-component';

import { learningPaths } from '@/lib/academy/learning-paths';
import { lessons } from '@/lib/ai-academy';
import styles from './learning-challenge.module.css';
const control = 'min-h-11 rounded-lg border border-border px-3 py-2 text-left';

function PracticeQuiz({ pathIndex }: { pathIndex: number }) {
  const id = useId();
  const heading = useRef<HTMLHeadingElement>(null);
  const path = learningPaths[pathIndex];
  const pathLessons = path.slugs.flatMap(slug => lessons.find(lesson => lesson.slug === slug) ?? []);
  const [quiz] = useState<Quiz>(() => ({ quizTitle: path.title, questions: pathLessons.map(lesson => ({ question: lesson.check.question, questionType: 'text', answerSelectionType: 'single', answers: lesson.check.choices, correctAnswer: String(lesson.check.answer + 1), explanation: lesson.check.explanation, point: 1 })) }));
  const { state, actions } = useQuiz({ quiz, autoStart: true, continueTillCorrect: false });
  const current = pathLessons[state.currentQuestionIndex];
  if (state.status === 'invalid' || !current) return <p role="alert">This path has no available practice questions. Choose another path.</p>;
  return <section aria-labelledby={id} className="space-y-4 rounded-xl border border-border p-5">
    <h4 id={id} ref={heading} tabIndex={-1} className="text-xl font-semibold">{path.title}: practice challenge</h4>
    <p>Answers are for this attempt only. This does not update Academy progress or certify mastery.</p>
    {state.status === 'completed' ? <div role="status"><p>Attempt complete: {state.summary.numberOfCorrectAnswers} of {state.summary.numberOfQuestions} correct.</p><p>Review the lesson sources, then try again.</p></div> : <>
      <p>Question {state.currentQuestionIndex + 1} of {quiz.questions.length}</p>
      <fieldset key={current.slug}><legend className="font-semibold">{state.currentQuestion?.question}</legend>{state.answers.map(answer => <label key={answer.answerNumber} className="my-2 flex min-h-11 items-center gap-3"><input type="radio" name={id} checked={answer.selected} disabled={answer.disabled} onChange={() => actions.selectAnswer(answer.answerNumber)} />{answer.value}</label>)}</fieldset>
      <p role="status">{state.feedback ? `${state.feedback === 'correct' ? 'Correct.' : 'Not quite.'} ${current.check.explanation}` : 'Choose one answer to see feedback.'}</p>
      <button className={control} disabled={state.currentQuestionIndex === quiz.questions.length - 1 ? !state.canSubmit : !state.canGoNext} onClick={() => { if (state.currentQuestionIndex === quiz.questions.length - 1) actions.submitQuiz(); else actions.nextQuestion(); heading.current?.focus(); }}>{state.currentQuestionIndex === quiz.questions.length - 1 ? 'Finish challenge' : 'Next question'}</button>
    </>}
    <button className={control} onClick={() => { actions.reset(); heading.current?.focus(); }}>Restart challenge</button>
    <details><summary className="min-h-11 cursor-pointer py-2">Read the lesson sources</summary><ul>{pathLessons.map(lesson => <li key={lesson.slug}><p className="font-semibold">{lesson.title}</p>{lesson.sources.map(source => <a className="block min-h-11 py-2 underline" key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.label} (new tab)</a>)}</li>)}</ul></details>
  </section>;
}

export function LearningChallenge() {
  const id = useId();
  const [selected, setSelected] = useState(1);
  return <section aria-labelledby={id} className={styles.challenge + ' space-y-4'}>
    <h3 id={id} className="text-2xl font-semibold">Explore a learning territory</h3>
    <p>Select a numbered tile or use the path buttons below. All paths are open; position does not imply prerequisites. Changing paths starts a new quiz attempt.</p>
    <div role="group" aria-label="Learning territories" className={styles.territories}>
      {learningPaths.map((path, index) => (
        <button
          key={path.id}
          type="button"
          aria-label={`Territory ${index + 1}: ${path.title}`}
          aria-pressed={selected === index}
          className={`${styles.territoryButton} ${selected === index ? styles.selected : ''}`}
          onClick={() => setSelected(index)}
        >
          <span aria-hidden="true" className={styles.territoryShape}>
            {index + 1}
          </span>
        </button>
      ))}
    </div>
    <ol className="grid gap-2 sm:grid-cols-2">{learningPaths.map((path, index) => <li key={path.id}><button className={control + ' w-full'} aria-pressed={selected === index} onClick={() => setSelected(index)}>{index + 1}. {path.title}</button></li>)}</ol>
    <p>{learningPaths[selected].outcome}</p><p>Suggested preparation: {learningPaths[selected].prerequisite}</p>
    <PracticeQuiz key={selected} pathIndex={selected} />
  </section>;
}
