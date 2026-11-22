import { Story } from 'inkjs';
import { discoveryStory } from './discovery-story.ts';

/** Replay choices into a fresh runtime. No shared mutable story or persistence. */
export function readDiscovery(path: readonly number[]) {
  const story = new Story(discoveryStory);
  const transcript: string[] = [];
  const drain = () => {
    while (story.canContinue) {
      const line = story.Continue()?.trim();
      if (line) transcript.push(line);
    }
  };
  drain();
  for (const index of path) {
    const choice = story.currentChoices[index];
    if (!choice) throw new Error('Invalid discovery choice');
    transcript.push(`You: ${choice.text}`);
    story.ChooseChoiceIndex(index);
    drain();
  }
  return { transcript, choices: story.currentChoices.map(choice => ({ index: choice.index, text: choice.text })) };
}
