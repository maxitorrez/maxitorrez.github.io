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
