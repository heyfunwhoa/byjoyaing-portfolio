import { readFileSync, writeFileSync } from 'node:fs';
import { Compiler } from 'inkjs/full';
const source = readFileSync('content/practice/discovery.ink', 'utf8');
const story = new Compiler(source).Compile();
writeFileSync('lib/gameful/discovery-story.ts', '// Generated from content/practice/discovery.ink with inkjs 2.4.0.\nexport const discoveryStory = ' + JSON.stringify(story.ToJson()) + ';\n');
