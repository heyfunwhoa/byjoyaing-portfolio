import assert from 'node:assert/strict';
import test from 'node:test';
import { readDiscovery } from './discovery.ts';
test('all branches terminate and retain missing evidence in coaching', () => {
  let endings = 0;
  function visit(path: number[]) {
    assert.ok(path.length < 7);
    const scene = readDiscovery(path);
    if (!scene.choices.length) { endings++; assert.match(scene.transcript.join(' '), /Debrief:/); return; }
    for (const choice of scene.choices) visit([...path, choice.index]);
  }
  visit([]);
  assert.equal(endings, 16);
  const skipped = readDiscovery([0, 1, 1, 0]).transcript.join(' ');
  assert.match(skipped, /baseline is still missing/);
  assert.match(skipped, /Ownership is still unconfirmed/);
  assert.match(readDiscovery([0, 0, 0, 0]).transcript.join(' '), /approval is still unconfirmed/);
  assert.equal(readDiscovery([]).transcript.length, 1);
  assert.throws(() => readDiscovery([99]), /Invalid discovery choice/);
});
