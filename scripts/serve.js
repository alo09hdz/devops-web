import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
const types = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.svg':'image/svg+xml', '.webmanifest':'application/manifest+json' };
createServer(async (req, res) => {
  const p = normalize(req.url.split('?')[0]).replace(/^(\.\.[/\\])+/, '');
  const file = join('dist', p.endsWith('/') ? p + 'index.html' : p);
  try { res.writeHead(200, { 'Content-Type': types[extname(file)] || 'text/plain' }); res.end(await readFile(file)); }
  catch { res.writeHead(404); res.end('No encontrado'); }
}).listen(8080, () => console.log('http://localhost:8080'));
