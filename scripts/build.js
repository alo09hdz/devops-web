import { cpSync, rmSync, writeFileSync, readFileSync } from 'node:fs';
const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
rmSync('dist', { recursive: true, force: true });
cpSync('src', 'dist', { recursive: true });
const version = {
  version: pkg.version,
  commit: (process.env.GITHUB_SHA || 'local').slice(0, 7),
  env: process.env.DEPLOY_ENV || 'local',
  run: process.env.GITHUB_RUN_NUMBER || '0',
  builtAt: new Date().toISOString()
};
writeFileSync('dist/version.json', JSON.stringify(version, null, 2));
console.log('Build OK ->', version);
