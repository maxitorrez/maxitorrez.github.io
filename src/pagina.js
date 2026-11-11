// Arma la página completa de un idioma a partir del contenido.
// es → raíz del sitio; en → /en/ (los recursos se resuelven con `base`).

import { esc, chips, stackGroup, projectCard, contactLinks, educationItem, section } from './componentes.js';
import { t } from './textos.js';
import { ICONS } from './iconos.js';

const PATHS = { es: '', en: 'en/' };

export function renderPage(c, lang) {
  const { perfil: p } = c;
  const base = lang === 'es' ? '' : '../';
  const other = lang === 'es' ? 'en' : 'es';
  const url = (l) => `${p.site}${PATHS[l]}`;
  const withBase = (list) => list.map((x) => (x.image ? { ...x, image: base + x.image } : x));

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Person', name: p.name, url: url(lang),
    jobTitle: p.role[lang], description: p.seoDescription[lang],
    sameAs: [p.contact.github, p.contact.linkedin].filter(Boolean),
    knowsAbout: c.skills.flatMap((s) => s.items[lang]),
  };

  const hero = `<section id="inicio" class="hero" aria-labelledby="hero-t">
  <div class="hero-text">
    <p class="eyebrow">${esc(p.role[lang])}</p>
    <h1 id="hero-t">${esc(p.name)}</h1>
    <p class="concept">${esc(p.concept[lang])}</p>
    <ul class="positioning">${p.positioning[lang].map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
    <div class="cta"><a class="btn primary" href="#proyectos">${esc(t('cta.projects', lang))}</a><a class="btn" href="#contacto">${esc(t('cta.contact', lang))}</a></div>
  </div>
  <ol class="hero-flow" aria-label="${lang === 'es' ? 'Cómo trabajo' : 'How I work'}">
    ${(lang === 'es' ? ['Necesidad', 'Análisis', 'Diseño', 'Validación', 'Producto'] : ['Need', 'Analysis', 'Design', 'Validation', 'Product']).map((s, i) => `<li style="--i:${i}"><span class="n">0${i + 1}</span>${esc(s)}</li>`).join('')}
  </ol>
</section>`;

  const about = section('sobre-mi', t('s.about', lang), `<div class="about">${p.about[lang].map((x) => `<p>${esc(x)}</p>`).join('')}</div>`);

  const experience = section('experiencia', t('s.experience', lang), c.experiencia.map((e) => `<article class="card job">
  <header class="job-head"><h3>${esc(e.role[lang])}</h3><p class="period">${esc(e.period[lang])}</p>${e.company ? `<p class="inst">${esc(e.company)}</p>` : ''}</header>
  <div class="job-body">
    <div><h4>${esc(t('exp.responsibilities', lang))}</h4><ul class="checks">${e.responsibilities[lang].map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
    <div><h4>${esc(t('exp.areas', lang))}</h4>${chips(e.areas[lang])}</div>
  </div>
</article>`).join(''));

  const education = section('formacion', t('s.education', lang), `<ul class="grid edu-list">${c.formacion.map((e) => educationItem(e, lang)).join('')}</ul>`);

  const skills = section('skills', t('s.skills', lang), `<div class="grid skills">${c.skills.map((s) => `<div class="card skill-group">${ICONS[s.icon] || ''}<h3>${esc(s.title[lang])}</h3>${chips(s.items[lang])}</div>`).join('')}</div>
<h3 class="sub">${esc(t('skills.soft', lang))}</h3>${chips(c.habilidades[lang], 'chip soft')}`);

  const stack = section('stack', t('s.stack', lang), `<div class="grid stack">${c.stack.map((g) => stackGroup(g, lang)).join('')}</div>`);

  const projects = section('proyectos', t('s.projects', lang), `<div class="projects">${withBase(c.proyectos).map((x) => projectCard(x, lang)).join('')}</div>`);

  const personal = section('personales', t('s.personal', lang), `<div class="projects">${withBase(c.personales).map((x) => projectCard(x, lang)).join('')}</div>`);

  const contact = section('contacto', t('s.contact', lang), `<p class="contact-text">${esc(p.contactText[lang])}</p>${contactLinks(p.contact, lang)}`, 'contact');

  const nav = [['sobre-mi', 'nav.about'], ['experiencia', 'nav.experience'], ['skills', 'nav.skills'], ['proyectos', 'nav.projects'], ['contacto', 'nav.contact']]
    .map(([id, k]) => `<a href="#${id}">${esc(t(k, lang))}</a>`).join('');

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.name)} — ${esc(p.role[lang])}</title>
<meta name="description" content="${esc(p.seoDescription[lang])}">
<link rel="canonical" href="${url(lang)}">
<link rel="alternate" hreflang="es" href="${url('es')}">
<link rel="alternate" hreflang="en" href="${url('en')}">
<link rel="alternate" hreflang="x-default" href="${url('es')}">
<meta property="og:type" content="profile">
<meta property="og:title" content="${esc(p.name)} — ${esc(p.role[lang])}">
<meta property="og:description" content="${esc(p.seoDescription[lang])}">
<meta property="og:url" content="${url(lang)}">
<meta property="og:locale" content="${lang === 'es' ? 'es_AR' : 'en_US'}">
<meta name="theme-color" content="#0b0f14">
<link rel="icon" href="${base}assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${base}styles.css">
<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>
</head>
<body>
<a class="skip" href="#contenido">${esc(t('skip', lang))}</a>
<header class="top">
  <a class="brand" href="#inicio" aria-label="${esc(p.name)}"><span class="br">&lt;</span>MT<span class="br">/&gt;</span></a>
  <nav aria-label="${lang === 'es' ? 'Principal' : 'Main'}">${nav}<a class="lang" href="${base}${PATHS[other]}" hreflang="${other}" lang="${other}" aria-label="${esc(t('lang.switchLabel', lang))}">${other.toUpperCase()}</a></nav>
</header>
<main id="contenido">
${hero}
${about}
${experience}
${education}
${skills}
${stack}
${projects}
${personal}
${contact}
</main>
<footer><p>© ${new Date().getFullYear()} ${esc(p.name)}</p></footer>
<script src="${base}reveal.js" defer></script>
</body>
</html>
`;
}
