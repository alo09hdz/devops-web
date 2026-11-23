// Prueba de humo contra un ambiente desplegado: node scripts/smoke.js <url> [commit]
const base = (process.argv[2] || '').replace(/\/?$/, '/');
const expected = process.argv[3];
if (!process.argv[2]) { console.error('Uso: node scripts/smoke.js <url> [commit]'); process.exit(2); }
const sleep = ms => new Promise(r => setTimeout(r, ms));
for (let i = 1; i <= 12; i++) {
  try {
    const home = await fetch(base);
    const ver = await fetch(base + 'version.json');
    const v = ver.ok ? await ver.json() : null;
    const html = home.ok ? await home.text() : '';
    const okCommit = !expected || (v && v.commit === expected.slice(0, 7));
    if (home.ok && html.includes('<title>Pendientes</title>') && v && okCommit) {
      console.log(`SMOKE OK (${base}) versión desplegada:`, v);
      process.exit(0);
    }
    console.log(`Intento ${i}: aún no disponible (home=${home.status}, version=${ver.status})`);
  } catch (e) { console.log(`Intento ${i}: ${e.message}`); }
  await sleep(15000);
}
console.error('SMOKE FALLÓ: el ambiente no respondió con la versión esperada');
process.exit(1);
