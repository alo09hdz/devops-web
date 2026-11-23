import test from 'node:test';
import assert from 'node:assert/strict';
import { addTask, toggleTask, removeTask, summary } from '../src/tasks.js';

test('agrega una tarea válida', () => {
  const l = addTask([], '  Probar CI  ');
  assert.equal(l.length, 1);
  assert.equal(l[0].title, 'Probar CI');
  assert.equal(l[0].done, false);
});
test('rechaza tareas vacías', () => {
  assert.throws(() => addTask([], '   '), /vacío/);
});
test('marca y desmarca una tarea', () => {
  let l = addTask([], 'A');
  l = toggleTask(l, l[0].id);
  assert.equal(l[0].done, true);
  l = toggleTask(l, l[0].id);
  assert.equal(l[0].done, false);
});
test('elimina una tarea', () => {
  let l = addTask(addTask([], 'A'), 'B');
  l = removeTask(l, l[0].id);
  assert.deepEqual(l.map(t => t.title), ['B']);
});
test('resume pendientes y completadas', () => {
  let l = addTask(addTask([], 'A'), 'B');
  l = toggleTask(l, l[0].id);
  assert.deepEqual(summary(l), { total: 2, done: 1, pending: 1 });
});
