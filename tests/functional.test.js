// Pruebas funcionales del sistema construido (dist/): estructura, PWA y versión.
import test, { before } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';

before(() => { execFileSync(process.execPath, ['scripts/build.js'], { stdio: 'ignore' }); });

test('FUNC-01 el build genera los archivos esperados', () => {
  for (const f of ['index.html', 'app.js', 'tasks.js', 'styles.css', 'sw.js', 'manifest.webmanifest', 'version.json'])
    assert.ok(existsSync(`dist/${f}`), `falta dist/${f}`);
});
test('FUNC-02 la página es responsive y contiene el formulario', () => {
  const html = readFileSync('dist/index.html', 'utf8');
  assert.match(html, /name="viewport"/);
  assert.match(html, /id="form"/);
  assert.match(html, /id="list"/);
});
test('FUNC-03 el manifiesto PWA es válido (instalable en móvil y escritorio)', () => {
  const m = JSON.parse(readFileSync('dist/manifest.webmanifest', 'utf8'));
  assert.equal(m.display, 'standalone');
  assert.ok(m.icons.length > 0);
});
test('FUNC-04 version.json identifica la versión construida', () => {
  const v = JSON.parse(readFileSync('dist/version.json', 'utf8'));
  assert.ok(v.version && v.commit && v.builtAt);
});
test('FUNC-05 las rutas son relativas (funciona bajo /staging/)', () => {
  const html = readFileSync('dist/index.html', 'utf8');
  assert.doesNotMatch(html, /(href|src)="\//);
});
