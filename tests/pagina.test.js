import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderPage } from '../src/pagina.js';
import { contenido } from '../src/contenido/index.js';

const SECCIONES = ['inicio', 'sobre-mi', 'experiencia', 'formacion', 'skills', 'stack', 'proyectos', 'personales', 'contacto'];

for (const lang of ['es', 'en']) {
  const html = renderPage(contenido, lang);

  test(`PF-05 [${lang}] tiene las nueve secciones en orden`, () => {
    let last = -1;
    for (const id of SECCIONES) {
      const i = html.indexOf(`id="${id}"`);
      assert.ok(i > last, `falta o está fuera de orden: ${id}`);
      last = i;
    }
  });

  test(`PF-05b [${lang}] SEO: lang, título, descripción, canonical, hreflang y JSON-LD`, () => {
    assert.match(html, new RegExp(`<html lang="${lang}">`));
    assert.match(html, /<title>[^<]{10,}<\/title>/);
    assert.match(html, /<meta name="description" content="[^"]{50,}">/);
    assert.match(html, /<link rel="canonical" href="https:\/\/maxitorrez\.github\.io\//);
    assert.match(html, /hreflang="es"/);
    assert.match(html, /hreflang="en"/);
    const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    assert.ok(ld, 'falta JSON-LD');
    assert.equal(JSON.parse(ld[1])['@type'], 'Person');
  });

  test(`PF-05c [${lang}] accesibilidad básica: un h1, imágenes con alt, salto al contenido`, () => {
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
    for (const img of html.match(/<img[^>]*>/g) || []) assert.match(img, /alt="/, img);
    assert.match(html, /class="skip"/);
    assert.match(html, /<main id="contenido"/);
  });

  test(`PF-05d [${lang}] no se filtran valores vacíos`, () => {
    assert.doesNotMatch(html, /undefined|null|\[object Object\]/);
  });
}

test('PF-07 honestidad: no aparecen tecnologías sin confirmar', () => {
  const html = renderPage(contenido, 'es');
  const stack = html.slice(html.indexOf('id="stack"'), html.indexOf('id="proyectos"'));
  for (const g of contenido.stack) for (const t of g.items) {
    if (!t.confirmed) assert.doesNotMatch(stack, new RegExp(`>${t.name.replace(/[.+]/g, '\\$&')}<`), t.name);
  }
});

test('PF-08 confidencialidad: el contenido no contiene URLs internas ni credenciales', () => {
  const texto = JSON.stringify(contenido);
  assert.doesNotMatch(texto, /(api[_-]?key|password|token|secret|localhost|192\.168|\.internal)/i);
});

test('PF-09 los proyectos laborales no muestran métricas inventadas', () => {
  for (const p of contenido.proyectos) {
    assert.doesNotMatch(`${p.result.es} ${p.result.en}`, /\d+\s?%/, p.id);
  }
});
