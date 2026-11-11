// Skills y stack. En el stack, `confirmed: false` deja la tecnología preparada pero oculta
// hasta que el titular confirme su experiencia. `level`: inicial | junior | intermedio | avanzado | null.

export const skills = [
  {
    icon: 'analisis',
    title: { es: 'Análisis funcional y gestión', en: 'Functional analysis and management' },
    items: {
      es: ['Análisis funcional', 'Relevamiento de requerimientos', 'Historias de usuario', 'Documentación funcional y técnica', 'Modelado de procesos', 'Diseño de soluciones', 'Gestión de proyectos', 'Metodologías ágiles'],
      en: ['Functional analysis', 'Requirements gathering', 'User stories', 'Functional and technical documentation', 'Process modeling', 'Solution design', 'Project management', 'Agile methodologies'],
    },
  },
  {
    icon: 'integracion',
    title: { es: 'Integración y sistemas', en: 'Integration and systems' },
    items: {
      es: ['Magento / Adobe Commerce', 'APIs REST', 'Integración de servicios', 'JSON', 'XML', 'OAuth 2.0', 'Automatización RPA', 'Integraciones B2B'],
      en: ['Magento / Adobe Commerce', 'REST APIs', 'Service integration', 'JSON', 'XML', 'OAuth 2.0', 'RPA automation', 'B2B integrations'],
    },
  },
  {
    icon: 'calidad',
    title: { es: 'Testing y calidad', en: 'Testing and quality' },
    items: {
      es: ['Testing funcional', 'Testing de integración', 'Testing de regresión', 'Validación de APIs', 'Postman', 'Análisis de logs', 'Seguimiento de incidencias', 'Control de calidad de software', 'TDD'],
      en: ['Functional testing', 'Integration testing', 'Regression testing', 'API validation', 'Postman', 'Log analysis', 'Issue tracking', 'Software quality control', 'TDD'],
    },
  },
  {
    icon: 'herramientas',
    title: { es: 'Herramientas', en: 'Tools' },
    items: {
      es: ['Jira', 'Postman', 'SQL', 'Magento Admin', 'Figma', 'Scrum'],
      en: ['Jira', 'Postman', 'SQL', 'Magento Admin', 'Figma', 'Scrum'],
    },
  },
];

export const habilidades = {
  es: ['Pensamiento analítico', 'Resolución de problemas', 'Investigación y aprendizaje continuo', 'Comunicación entre equipos técnicos y funcionales', 'Organización y planificación', 'Gestión de prioridades', 'Trabajo en equipo', 'Autonomía', 'Responsabilidad', 'Adaptabilidad', 'Atención al detalle', 'Orientación a resultados', 'Comprensión de procesos complejos', 'Transformar necesidades de negocio en soluciones tecnológicas'],
  en: ['Analytical thinking', 'Problem solving', 'Research and continuous learning', 'Communication between technical and business teams', 'Organization and planning', 'Priority management', 'Teamwork', 'Autonomy', 'Accountability', 'Adaptability', 'Attention to detail', 'Results orientation', 'Understanding complex processes', 'Turning business needs into technology solutions'],
};

const pend = (name) => ({ name, confirmed: false, level: null });
const ok = (name, level = null) => ({ name, confirmed: true, level });

export const stack = [
  { id: 'lenguajes', title: { es: 'Lenguajes de programación', en: 'Programming languages' }, items: [ok('SQL'), pend('JavaScript'), pend('TypeScript'), pend('Python'), pend('PHP'), pend('Java'), pend('C#')] },
  { id: 'frontend', title: { es: 'Frontend', en: 'Frontend' }, items: [pend('HTML'), pend('CSS'), pend('React'), pend('Bootstrap')] },
  { id: 'backend', title: { es: 'Backend', en: 'Backend' }, items: [pend('Node.js'), pend('.NET')] },
  { id: 'datos', title: { es: 'Bases de datos', en: 'Databases' }, items: [pend('MySQL'), pend('PostgreSQL'), pend('SQLite')] },
  { id: 'apis', title: { es: 'APIs e integraciones', en: 'APIs and integrations' }, items: [ok('APIs REST'), ok('JSON'), ok('XML'), ok('OAuth 2.0'), ok('Postman'), ok('Magento / Adobe Commerce')] },
  { id: 'herramientas', title: { es: 'Herramientas de desarrollo', en: 'Development tools' }, items: [ok('Jira'), ok('Figma'), ok('Magento Admin'), pend('Git')] },
  { id: 'devops', title: { es: 'Infraestructura y DevOps', en: 'Infrastructure and DevOps' }, items: [pend('Docker')] },
];
