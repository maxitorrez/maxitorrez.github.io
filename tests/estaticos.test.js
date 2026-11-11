import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const reveal = readFileSync(new URL('../public/reveal.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('../public/styles.css', import.meta.url), 'utf8');

test('PF-14 reveal.js usa Motion (inView + stagger) y es mejora progresiva', () => {
  assert.match(reveal, /window\.Motion/, 'debe comprobar que Motion cargó');
  assert.match(reveal, /prefers-reduced-motion: reduce/, 'debe respetar reducir movimiento');
  assert.match(reveal, /inView\(/);
  assert.match(reveal, /stagger\(/);
  // la clase que oculta el contenido se pone solo después de esas comprobaciones
  const guard = reveal.indexOf('prefers-reduced-motion');
  const hide = reveal.indexOf("classList.add('js-reveal')");
  assert.ok(guard > -1 && hide > guard, 'js-reveal debe agregarse después de las comprobaciones');
});

test('PF-16 la paleta no conserva colores fríos de la versión anterior', () => {
  for (const viejo of ['11, 15, 20', '79, 209, 165', '108, 182, 255', '242, 184, 75']) {
    assert.ok(!css.includes(viejo), `queda el color viejo rgba(${viejo})`);
  }
});

test('PF-17 el texto en carmesí usa el tono legible (contraste ≥ 4.5 sobre las tarjetas)', () => {
  assert.match(css, /--crimson-text:\s*#[0-9a-f]{6}/i);
  assert.match(css, /\.hero-flow \.n \{[^}]*color: var\(--crimson-text\)/);
  assert.match(css, /\.brand \.br \{[^}]*color: var\(--crimson-text\)/);
});
