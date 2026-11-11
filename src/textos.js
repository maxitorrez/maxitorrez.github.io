// Etiquetas fijas de la interfaz, en los dos idiomas.

export const LEVELS = {
  inicial: { es: 'Inicial', en: 'Beginner' },
  junior: { es: 'Junior', en: 'Junior' },
  intermedio: { es: 'Intermedio', en: 'Intermediate' },
  avanzado: { es: 'Avanzado', en: 'Advanced' },
};

// Distingue claramente lo terminado de lo que está en marcha.
export const STATUSES = {
  finalizado: { es: 'Finalizado', en: 'Completed' },
  'en-uso': { es: 'En uso', en: 'In use' },
  prototipo: { es: 'Prototipo funcional', en: 'Working prototype' },
  'en-desarrollo': { es: 'En desarrollo', en: 'In development' },
  idea: { es: 'Idea', en: 'Idea' },
  laboral: { es: 'Experiencia laboral · confidencial', en: 'Work experience · confidential' },
};

const UI = {
  'nav.about': { es: 'Sobre mí', en: 'About' },
  'nav.experience': { es: 'Experiencia', en: 'Experience' },
  'nav.skills': { es: 'Skills', en: 'Skills' },
  'nav.projects': { es: 'Proyectos', en: 'Projects' },
  'nav.contact': { es: 'Contacto', en: 'Contact' },
  'skip': { es: 'Saltar al contenido', en: 'Skip to content' },
  's.about': { es: 'Sobre mí', en: 'About me' },
  's.experience': { es: 'Experiencia laboral', en: 'Work experience' },
  's.education': { es: 'Formación', en: 'Education' },
  's.skills': { es: 'Skills', en: 'Skills' },
  's.stack': { es: 'Stack tecnológico', en: 'Tech stack' },
  's.projects': { es: 'Proyectos y casos de uso', en: 'Projects and use cases' },
  's.personal': { es: 'Proyectos personales', en: 'Personal projects' },
  's.contact': { es: 'Contacto', en: 'Contact' },
  'exp.responsibilities': { es: 'Responsabilidades', en: 'Responsibilities' },
  'exp.areas': { es: 'Áreas de experiencia', en: 'Areas of expertise' },
  'skills.soft': { es: 'Habilidades profesionales', en: 'Professional skills' },
  'f.problem': { es: 'Problemática', en: 'Problem' },
  'f.goal': { es: 'Objetivo', en: 'Goal' },
  'f.solution': { es: 'Solución', en: 'Solution' },
  'f.role': { es: 'Mi participación', en: 'My role' },
  'f.flow': { es: 'Flujo', en: 'Flow' },
  'f.result': { es: 'Resultado', en: 'Outcome' },
  'f.tech': { es: 'Tecnologías y herramientas', en: 'Technologies and tools' },
  'c.email': { es: 'Escribirme', en: 'Email me' },
  'cta.projects': { es: 'Ver proyectos', en: 'See projects' },
  'cta.contact': { es: 'Contactar', en: 'Get in touch' },
  'lang.switch': { es: 'English', en: 'Español' },
  'lang.switchLabel': { es: 'Ver en inglés', en: 'Ver en español' },
};

export function t(key, lang) {
  const v = UI[key];
  if (!v) throw new Error(`Texto sin definir: ${key}`);
  return v[lang];
}
