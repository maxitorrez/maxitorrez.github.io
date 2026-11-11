// Genera el sitio estático en docs/ (carpeta que publica GitHub Pages).
// Uso: npm run build

import { mkdirSync, writeFileSync, cpSync, rmSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { renderPage } from './pagina.js';
import { contenido } from './contenido/index.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export function build(out = join(ROOT, 'docs')) {
  rmSync(out, { recursive: true, force: true });
  mkdirSync(join(out, 'en'), { recursive: true });
  cpSync(join(ROOT, 'public'), out, { recursive: true });
  writeFileSync(join(out, 'index.html'), renderPage(contenido, 'es'));
  writeFileSync(join(out, 'en', 'index.html'), renderPage(contenido, 'en'));
  writeFileSync(join(out, '.nojekyll'), '');
  const site = contenido.perfil.site;
  const today = new Date().toISOString().slice(0, 10);
  writeFileSync(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${site}</loc><lastmod>${today}</lastmod></url>
  <url><loc>${site}en/</loc><lastmod>${today}</lastmod></url>
</urlset>
`);
  writeFileSync(join(out, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site}sitemap.xml\n`);
  return out;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(`Sitio generado en ${build()}`);
}
