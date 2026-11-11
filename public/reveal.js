// Aparición sutil de las tarjetas al hacer scroll. Sin JS, todo se ve igual (mejora progresiva).
(() => {
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const items = document.querySelectorAll('.card, .section-title');
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -8% 0px' });
  document.documentElement.classList.add('js-reveal');
  items.forEach((el) => io.observe(el));
})();
