// Traducciones: el español está en el HTML; aquí solo el inglés.
const EN = {
  'nav.projects': 'Projects',
  'nav.skills': 'Skills',
  'nav.contact': 'Contact',
  'hero.eyebrow': 'Software developer',
  'hero.lead': 'I build tools that do the work for you: AI-powered desktop apps, data extractors and websites. Tests first, clear code and documented decisions.',
  'hero.cta': 'See projects',
  'projects.title': 'Projects',
  'ares.kind': 'AI desktop assistant',
  'ares.desc': 'An animated Windows desktop pet connected to Claude Code. It talks by text and voice, runs actions with the user’s approval and shows how much of the plan has been used. Small talk is answered by a local Ollama model, at no plan cost.',
  'ares.p1': 'Local voice: "Hey Ares" wake word (Vosk), Whisper transcription and spoken replies with Piper.',
  'ares.p2': 'Hybrid router: Ollama for chat, Claude for work, with automatic escalation.',
  'ares.p3': 'Permission policy: every action that changes something asks for approval.',
  'ares.p4': '341 automated tests plus smoke tests against the real services.',
  'ss.kind': 'Online store catalog extractor',
  'ss.desc': 'Crawls an online store and saves its full catalog to SQLite: name, SKU, brand, category, price, stock, images and variants, with price history. Includes a command-line tool and a web interface with preview.',
  'ss.p1': 'Adapters for Shopify, VTEX, WooCommerce and the official Mercado Libre API; without an API it falls back to JSON-LD, microdata or a real browser.',
  'ss.p2': 'Honors robots.txt, paces its requests and guards against SSRF.',
  'ss.p3': 'Exports to CSV and JSON safe from formula injection.',
  'ss.p4': 'Unit tests, integration tests against fake stores and E2E with Chromium.',
  'private': 'Private source code: available on request.',
  'skills.title': 'Skills',
  'skills.lang': 'Languages',
  'skills.tools': 'Technologies',
  'skills.ai': 'Artificial intelligence',
  'skills.method': 'Practices',
  'skills.methodText': 'TDD · E2E testing · functional documentation · Git',
  'contact.title': 'Contact',
  'contact.text': 'Have a project or an offer? Reach me on GitHub.',
};

const nodes = document.querySelectorAll('[data-i18n]');
const ES = {};
nodes.forEach((n) => { ES[n.dataset.i18n] = n.textContent; });

function apply(lang) {
  const dict = lang === 'en' ? EN : ES;
  nodes.forEach((n) => { const t = dict[n.dataset.i18n]; if (t) n.textContent = t; });
  document.documentElement.lang = lang;
  document.getElementById('lang').textContent = lang === 'en' ? 'ES' : 'EN';
  try { localStorage.setItem('lang', lang); } catch { /* sin almacenamiento */ }
}

let saved = null;
try { saved = localStorage.getItem('lang'); } catch { /* sin almacenamiento */ }
const initial = saved || (navigator.language.startsWith('es') ? 'es' : 'en');
if (initial === 'en') apply('en');

document.getElementById('lang').addEventListener('click', () => {
  apply(document.documentElement.lang === 'en' ? 'es' : 'en');
});

document.getElementById('year').textContent = new Date().getFullYear();
