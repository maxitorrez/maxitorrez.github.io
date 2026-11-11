// Componentes reutilizables: funciones puras que devuelven HTML.
// Todo texto que viene de los datos pasa por esc().

import { LEVELS, STATUSES, t } from './textos.js';

const ENT = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (s) => (s == null ? '' : String(s).replace(/[&<>"']/g, (c) => ENT[c]));

export const chips = (list, cls = 'chip') =>
  `<ul class="chips">${list.map((x) => `<li class="${cls}">${esc(x)}</li>`).join('')}</ul>`;

export function levelLabel(level, lang) {
  if (level == null || level === '') return '';
  if (!LEVELS[level]) throw new Error(`Nivel desconocido: "${level}" (válidos: ${Object.keys(LEVELS).join(', ')})`);
  return LEVELS[level][lang];
}

export function stackGroup(group, lang) {
  const items = group.items.filter((i) => i.confirmed);
  if (!items.length) return '';
  const lis = items.map((i) => {
    const lv = levelLabel(i.level, lang);
    return `<li class="tech"><span class="tech-name">${esc(i.name)}</span>${lv ? `<span class="level level-${esc(i.level)}">${esc(lv)}</span>` : ''}</li>`;
  }).join('');
  return `<div class="card stack-group"><h3>${esc(group.title[lang])}</h3><ul class="tech-list">${lis}</ul></div>`;
}

export function statusBadge(status, lang) {
  if (!STATUSES[status]) throw new Error(`Estado desconocido: "${status}" (válidos: ${Object.keys(STATUSES).join(', ')})`);
  return `<span class="badge badge-${esc(status)}">${esc(STATUSES[status][lang])}</span>`;
}

const REQUIRED = ['name', 'status', 'problem', 'goal', 'solution', 'role', 'tech', 'flow', 'result'];

export function projectCard(p, lang) {
  for (const k of REQUIRED) if (p[k] == null) throw new Error(`Proyecto "${p.id}": falta el campo ${k}`);
  const field = (key, body) => `<div class="field"><dt>${esc(t(key, lang))}</dt><dd>${body}</dd></div>`;
  const img = p.image ? `<img class="project-img" src="${esc(p.image)}" alt="" width="96" height="96" loading="lazy">` : '';
  return `<article class="card project" id="p-${esc(p.id)}">
  <header class="project-head">${img}<div><h3>${esc(p.name)}</h3>${p.category ? `<p class="category">${esc(p.category[lang])}</p>` : ''}</div>${statusBadge(p.status, lang)}</header>
  <dl class="fields">
    ${field('f.problem', esc(p.problem[lang]))}
    ${field('f.goal', esc(p.goal[lang]))}
    ${field('f.solution', esc(p.solution[lang]))}
    ${field('f.role', esc(p.role[lang]))}
    ${field('f.flow', `<ol class="flow">${p.flow[lang].map((s) => `<li>${esc(s)}</li>`).join('')}</ol>`)}
    ${field('f.result', esc(p.result[lang]))}
    ${field('f.tech', chips(p.tech))}
  </dl>
</article>`;
}

export function contactLinks(c, lang) {
  const links = [];
  if (c.linkedin) links.push(`<a class="btn" href="${esc(c.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`);
  if (c.email) links.push(`<a class="btn primary" href="mailto:${esc(c.email)}">${esc(t('c.email', lang))}</a>`);
  if (c.github) links.push(`<a class="btn" href="${esc(c.github)}" target="_blank" rel="noopener">GitHub</a>`);
  return `<div class="cta">${links.join('')}</div>`;
}

export function educationItem(e, lang) {
  const period = e.period && typeof e.period === 'object' ? e.period[lang] : e.period;
  return `<li class="card edu"><h3>${esc(e.title[lang])}</h3>${e.institution ? `<p class="inst">${esc(e.institution)}</p>` : ''}${period ? `<p class="period">${esc(period)}</p>` : ''}</li>`;
}

export const section = (id, title, body, extra = '') =>
  `<section id="${id}" class="section${extra ? ` ${extra}` : ''}" aria-labelledby="${id}-t"><h2 id="${id}-t" class="section-title">${esc(title)}</h2>${body}</section>`;
