import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, existsSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { build } from '../src/build.js';

test('PF-10 build genera ambos idiomas y todos los recursos locales existen', () => {
  const out = mkdtempSync(join(tmpdir(), 'portfolio-'));
  try {
    build(out);
    for (const page of ['index.html', 'en/index.html']) {
      const file = join(out, page);
      assert.ok(existsSync(file), `falta ${page}`);
      const html = readFileSync(file, 'utf8');
      const refs = [...html.matchAll(/(?:src|href)="([^"#:]+)"/g)].map((m) => m[1]).filter((r) => !r.startsWith('//'));
      assert.ok(refs.length > 3, 'se esperaban referencias locales');
      for (const r of refs) {
        const target = resolve(dirname(file), r.endsWith('/') ? `${r}index.html` : r);
        assert.ok(existsSync(target), `${page}: no existe ${r}`);
      }
    }
    assert.ok(existsSync(join(out, '.nojekyll')), 'falta .nojekyll');
    assert.ok(existsSync(join(out, 'sitemap.xml')), 'falta sitemap.xml');
    assert.match(readFileSync(join(out, 'robots.txt'), 'utf8'), /Sitemap: https:\/\/maxitorrez\.github\.io\/sitemap\.xml/);
  } finally {
    rmSync(out, { recursive: true, force: true });
  }
});

test('PF-12 build publica la librería motion (UMD, global Motion) con la versión del package.json', () => {
  const out = mkdtempSync(join(tmpdir(), 'portfolio-'));
  try {
    build(out);
    const file = join(out, 'vendor', 'motion.js');
    assert.ok(existsSync(file), 'falta vendor/motion.js');
    const code = readFileSync(file, 'utf8');
    assert.match(code, /\.Motion=\{\}/, 'no es el build UMD que expone window.Motion');
    const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
    const installed = JSON.parse(readFileSync(new URL('../node_modules/motion/package.json', import.meta.url), 'utf8'));
    assert.equal(installed.version, pkg.dependencies.motion, 'la versión instalada no coincide con la fijada');
  } finally {
    rmSync(out, { recursive: true, force: true });
  }
});
