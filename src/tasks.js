// Lógica de negocio pura: se prueba en Node y se usa en el navegador.
export function addTask(list, title) {
  const clean = String(title ?? '').trim();
  if (!clean) throw new Error('El título no puede estar vacío');
  return [...list, { id: Date.now() + Math.random(), title: clean, done: false }];
}
export function toggleTask(list, id) {
  return list.map(t => (t.id === id ? { ...t, done: !t.done } : t));
}
export function removeTask(list, id) {
  return list.filter(t => t.id !== id);
}
export function summary(list) {
  const done = list.filter(t => t.done).length;
  return { total: list.length, done, pending: list.length - done };
}
