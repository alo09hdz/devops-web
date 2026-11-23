import { addTask, toggleTask, removeTask, summary } from './tasks.js';

const KEY = 'devops-web:tasks';
let tasks = [];
try { tasks = JSON.parse(localStorage.getItem(KEY)) ?? []; } catch { tasks = []; }

const $ = s => document.querySelector(s);
const form = $('#form'), input = $('#title'), list = $('#list'), stats = $('#stats'), err = $('#error');

function render() {
  list.innerHTML = '';
  if (!tasks.length) list.innerHTML = '<li class="empty">Aún no hay tareas. Escribe la primera arriba.</li>';
  for (const t of tasks) {
    const li = document.createElement('li');
    li.dataset.testid = 'task';
    li.className = t.done ? 'done' : '';
    const label = document.createElement('label');
    const cb = document.createElement('input');
    cb.type = 'checkbox'; cb.checked = t.done;
    cb.addEventListener('change', () => { tasks = toggleTask(tasks, t.id); save(); });
    label.append(cb, document.createTextNode(' ' + t.title));
    const del = document.createElement('button');
    del.type = 'button'; del.textContent = 'Eliminar';
    del.addEventListener('click', () => { tasks = removeTask(tasks, t.id); save(); });
    li.append(label, del);
    list.append(li);
  }
  const s = summary(tasks);
  stats.textContent = `${s.pending} pendientes · ${s.done} completadas`;
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(tasks)); } catch {} render(); }

form.addEventListener('submit', e => {
  e.preventDefault();
  try { tasks = addTask(tasks, input.value); err.textContent = ''; input.value = ''; save(); }
  catch (ex) { err.textContent = ex.message; }
});

fetch('./version.json').then(r => r.json()).then(v => {
  $('#version').textContent = `v${v.version} · ${v.commit} · ${v.env}`;
}).catch(() => {});

if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => {});
render();
